// Self-contained test suite (no test framework or Node imports, so it can live inside the
// space source tree without affecting the bundle). Run with tests/runTests.ts.

import { CATALOG_GROUPS, CATALOG_SUB_INDUSTRIES, COMING_SOON_IDS, IMPLEMENTED_CURRICULUM_IDS, subIndustryById } from '../catalog/catalogSnapshot';
import { evaluateFormula, FORMULA_IDS, FORMULAS } from '../core/formulas';
import type { FormulaSpec, KernelId } from '../core/formulaEngine';
import { assessMetric } from '../core/readiness';
import { EVIDENCE_SOURCES } from '../core/sources';
import { METRIC_CATEGORIES } from '../core/types';
import { UNITS } from '../core/units';
import { buildCoverageManifest } from '../content/coverage';
import { HYPOTHETICAL_LABEL } from '../content/define';
import { ALL_LINKS, ALL_METRICS, METRIC_BY_ID, MISSING_HIGH_PRIORITY, SHARED_METRICS, curriculaForMetric, metricsForCurriculum } from '../content/library';
import { approxEqual, CHECK_TOLERANCE, EXAMPLE_TOLERANCE, FORMULA_CHECKS } from './formulaChecks';
import { METRIC_ID_SNAPSHOT } from './idSnapshot';

export interface TestResult {
  name: string;
  passed: boolean;
  assertions: number;
  failures: string[];
}

class Collector {
  assertions = 0;
  failures: string[] = [];
  check(condition: boolean, message: string): void {
    this.assertions += 1;
    if (!condition) this.failures.push(message);
  }
}

/** The 41 curriculum keys listed in reports/domain-knowledge-assessment-inventory-2026-11-05.json. */
const INVENTORY_CURRICULUM_KEYS = [
  'agri-commodities', 'agri-crop', 'agri-livestock', 'banking-commercial', 'banking-consumer-finance', 'banking-fintech', 'banking-insurance',
  'fmcg-beverages-alc', 'fmcg-beverages-na', 'fmcg-dairy', 'fmcg-packaged-food', 'healthcare-products', 'hospitality-hotels', 'hospitality-restaurants',
  'logistics-contract', 'logistics-distribution', 'logistics-express', 'logistics-freight', 'mfg-building', 'mfg-electrical', 'mfg-electronics',
  'mfg-machinery', 'mfg-packaging', 'mfg-textiles', 'professional-advisory', 'professional-audit', 'professional-consulting', 'realestate-advisory',
  'realestate-development', 'realestate-proptech', 'retail-coffee', 'retail-fashion', 'retail-grocery', 'retail-pharmacy', 'tech-adtech',
  'tech-ecommerce', 'tech-electronics', 'tech-enterprise-sw', 'tech-gaming', 'tech-social', 'tech-telecom',
];

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function baseInputs(spec: FormulaSpec): Record<string, number> {
  const numeric = FORMULA_CHECKS.find((check) => check.formulaId === spec.id && check.expected !== undefined);
  return { ...(numeric?.inputs ?? {}) };
}

function run(name: string, body: (t: Collector) => void): TestResult {
  const t = new Collector();
  try {
    body(t);
  } catch (error) {
    t.failures.push(`Threw: ${error instanceof Error ? error.message : String(error)}`);
  }
  return { name, passed: t.failures.length === 0, assertions: t.assertions, failures: t.failures };
}

export function runMetricsTests(): TestResult[] {
  return [
    run('Catalog snapshot matches the actual catalog (11 groups, 44 sub-industries, 44 implemented, 0 Coming Soon)', (t) => {
      t.check(CATALOG_GROUPS.length === 11, `Expected 11 groups, found ${CATALOG_GROUPS.length}.`);
      t.check(CATALOG_SUB_INDUSTRIES.length === 44, `Expected 44 sub-industries, found ${CATALOG_SUB_INDUSTRIES.length}.`);
      t.check(IMPLEMENTED_CURRICULUM_IDS.length === 44, `Expected 44 implemented, found ${IMPLEMENTED_CURRICULUM_IDS.length}.`);
      t.check(COMING_SOON_IDS.length === 0, `Expected 0 Coming Soon, found ${COMING_SOON_IDS.length}.`);
      t.check(new Set(CATALOG_SUB_INDUSTRIES.map((s) => s.id)).size === 44, 'Sub-industry ids are not unique.');
      const implemented = new Set(IMPLEMENTED_CURRICULUM_IDS);
      for (const key of INVENTORY_CURRICULUM_KEYS) t.check(implemented.has(key), `Inventory curriculum ${key} missing from snapshot.`);
      t.check(INVENTORY_CURRICULUM_KEYS.length === 41, 'Inventory key list should hold 41 curricula.');
      for (const s of CATALOG_SUB_INDUSTRIES) t.check(CATALOG_GROUPS.some((g) => g.id === s.groupId), `${s.id} has unknown group ${s.groupId}.`);
    }),

    run('Every metric uses a registered formula and every formula is used', (t) => {
      for (const metric of ALL_METRICS) t.check(Boolean(FORMULAS[metric.formulaId]), `${metric.metricId}: formula ${metric.formulaId} missing.`);
      const used = new Set(ALL_METRICS.map((m) => m.formulaId));
      for (const id of FORMULA_IDS) t.check(used.has(id), `Formula ${id} is not used by any metric.`);
    }),

    run('Independent calculation checks (mathematical correctness)', (t) => {
      for (const id of FORMULA_IDS) {
        t.check(FORMULA_CHECKS.some((c) => c.formulaId === id && c.expected !== undefined), `${id}: no independent numeric check.`);
      }
      for (const check of FORMULA_CHECKS) {
        const result = evaluateFormula(check.formulaId, check.inputs);
        if (check.expectError) {
          t.check(!result.ok && result.error === check.expectError, `${check.formulaId}: expected ${check.expectError}, got ${JSON.stringify(result)}.`);
        } else {
          t.check(result.ok && approxEqual(result.value, check.expected as number, CHECK_TOLERANCE), `${check.formulaId}: expected ${check.expected}, got ${JSON.stringify(result)}.`);
        }
      }
    }),

    run('Every hypothetical worked example recalculates to its stated output', (t) => {
      for (const metric of ALL_METRICS) {
        const result = evaluateFormula(metric.formulaId, metric.example.inputs);
        t.check(result.ok, `${metric.metricId}: example failed to evaluate (${JSON.stringify(result)}).`);
        if (result.ok) t.check(approxEqual(result.value, metric.example.output, EXAMPLE_TOLERANCE), `${metric.metricId}: example output ${metric.example.output} ≠ computed ${result.value}.`);
      }
    }),

    run('Variable completeness (example inputs match formula variables; variables fully specified)', (t) => {
      for (const metric of ALL_METRICS) {
        const spec = FORMULAS[metric.formulaId];
        if (!spec) continue;
        const expected = spec.variables.map((v) => v.id).sort().join(',');
        const actual = Object.keys(metric.example.inputs).sort().join(',');
        t.check(expected === actual, `${metric.metricId}: example inputs [${actual}] ≠ variables [${expected}].`);
      }
      for (const spec of Object.values(FORMULAS)) {
        t.check(spec.variables.length > 0, `${spec.id}: no variables.`);
        t.check(new Set(spec.variables.map((v) => v.id)).size === spec.variables.length, `${spec.id}: duplicate variable ids.`);
        for (const v of spec.variables) {
          t.check(Boolean(v.label && v.rangeNote && UNITS[v.unit]), `${spec.id}.${v.id}: label, unit or range note missing.`);
        }
        t.check(spec.expression.length > 0, `${spec.id}: empty expression.`);
      }
    }),

    run('Unit consistency', (t) => {
      for (const metric of ALL_METRICS) {
        const spec = FORMULAS[metric.formulaId];
        if (spec) t.check(spec.outputUnit === metric.unit, `${metric.metricId}: metric unit ${metric.unit} ≠ formula output ${spec.outputUnit}.`);
      }
      for (const spec of Object.values(FORMULAS)) {
        const units = spec.variables.map((v) => v.unit);
        switch (spec.unitRule) {
          case 'share':
            t.check(new Set(units).size === 1, `${spec.id}: share rule needs one input unit, found ${units.join(', ')}.`);
            t.check(spec.outputUnit === 'percent' || spec.outputUnit === 'times', `${spec.id}: share output must be percent or times.`);
            break;
          case 'change':
            t.check(spec.variables.length === 2 && units[0] === units[1] && spec.outputUnit === 'percent', `${spec.id}: change rule violated.`);
            break;
          case 'days':
            t.check(units[0] === units[1] && spec.outputUnit === 'days', `${spec.id}: days rule violated.`);
            break;
          case 'additive':
            t.check(units.every((u) => u === spec.outputUnit), `${spec.id}: additive terms must share the output unit.`);
            break;
          case 'product-of-percents':
            t.check(units.every((u) => u === 'percent') && spec.outputUnit === 'percent', `${spec.id}: product-of-percents rule violated.`);
            break;
          case 'rate': {
            const per = UNITS[spec.outputUnit].per;
            t.check(Boolean(per), `${spec.id}: rate output unit ${spec.outputUnit} is not compound.`);
            if (!per) break;
            const unitOf = (id: string) => spec.variables.find((v) => v.id === id)?.unit;
            for (const id of spec.numeratorVars ?? []) t.check(unitOf(id) === per.numerator, `${spec.id}: numerator ${id} should be ${per.numerator}.`);
            for (const id of spec.denominatorVars ?? []) t.check(unitOf(id) === per.denominator, `${spec.id}: denominator ${id} should be ${per.denominator}.`);
            t.check((spec.numeratorVars?.length ?? 0) > 0 && (spec.denominatorVars?.length ?? 0) > 0, `${spec.id}: rate rule needs numerator and denominator vars.`);
            break;
          }
          case 'custom':
            t.check(Boolean(spec.unitNote), `${spec.id}: custom unit rule needs a unit note.`);
            break;
        }
      }
    }),

    run('Division by zero is caught for every denominator', (t) => {
      for (const spec of Object.values(FORMULAS)) {
        const dens = spec.variables.filter((v) => v.denominator);
        const exempt = spec.kernel === 'npv' || spec.kernel === 'irr';
        if (spec.expression.includes('÷') && !exempt) {
          t.check(dens.length > 0 || (spec.constraints ?? []).some((c) => c.code === 'DIVISION_BY_ZERO'), `${spec.id}: divides but declares no denominator guard.`);
        }
        for (const den of dens) {
          const inputs = baseInputs(spec);
          inputs[den.id] = 0;
          const result = evaluateFormula(spec.id, inputs);
          t.check(!result.ok && result.error === 'DIVISION_BY_ZERO', `${spec.id}.${den.id}=0 should be DIVISION_BY_ZERO, got ${JSON.stringify(result)}.`);
        }
      }
    }),

    run('Missing, invalid and out-of-range inputs are rejected', (t) => {
      t.check(evaluateFormula('no-such-formula', {}).ok === false, 'Unknown formula should fail.');
      const unknown = evaluateFormula('no-such-formula', {});
      t.check(!unknown.ok && unknown.error === 'UNKNOWN_FORMULA', 'Unknown formula should return UNKNOWN_FORMULA.');
      for (const spec of Object.values(FORMULAS)) {
        const nullResult = evaluateFormula(spec.id, null);
        t.check(!nullResult.ok && nullResult.error === 'MISSING_INPUT', `${spec.id}: null inputs should be MISSING_INPUT.`);
        for (const v of spec.variables) {
          const missing = baseInputs(spec);
          delete missing[v.id];
          const r1 = evaluateFormula(spec.id, missing);
          t.check(!r1.ok && r1.error === 'MISSING_INPUT', `${spec.id}: missing ${v.id} should be MISSING_INPUT.`);
          for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, '5' as unknown as number]) {
            const inputs: Record<string, unknown> = baseInputs(spec);
            inputs[v.id] = bad;
            const r2 = evaluateFormula(spec.id, inputs);
            t.check(!r2.ok && r2.error === 'INVALID_INPUT', `${spec.id}: ${v.id}=${String(bad)} should be INVALID_INPUT.`);
          }
          if (v.min !== undefined) {
            const inputs = baseInputs(spec);
            inputs[v.id] = v.min - 1;
            const r3 = evaluateFormula(spec.id, inputs);
            t.check(!r3.ok && r3.error === 'OUT_OF_RANGE', `${spec.id}: ${v.id} below min should be OUT_OF_RANGE, got ${JSON.stringify(r3)}.`);
          }
          if (v.max !== undefined) {
            const inputs = baseInputs(spec);
            inputs[v.id] = v.max + 1;
            const r4 = evaluateFormula(spec.id, inputs);
            t.check(!r4.ok && r4.error === 'OUT_OF_RANGE', `${spec.id}: ${v.id} above max should be OUT_OF_RANGE, got ${JSON.stringify(r4)}.`);
          }
        }
      }
    }),

    run('Shared formulas are defined once and reused across industries', (t) => {
      const ids = ALL_METRICS.map((m) => m.metricId);
      t.check(new Set(ids).size === ids.length, 'Duplicate metric ids across shared layer and packs.');
      for (const metric of SHARED_METRICS) {
        t.check(metric.shared, `${metric.metricId} in shared layer must be flagged shared.`);
        const groups = new Set(curriculaForMetric(metric.metricId).map((id) => subIndustryById(id)?.groupId));
        t.check(groups.size >= 2, `${metric.metricId}: shared metric linked to only ${groups.size} industry group(s).`);
      }
      const grossMarginGroups = new Set(curriculaForMetric('gross-margin').map((id) => subIndustryById(id)?.groupId));
      t.check(grossMarginGroups.size >= 5, `gross-margin should be reused across ≥5 groups, found ${grossMarginGroups.size}.`);
      const kernelUse = new Map<KernelId, number>();
      for (const spec of Object.values(FORMULAS)) kernelUse.set(spec.kernel, (kernelUse.get(spec.kernel) ?? 0) + 1);
      for (const kernel of ['ratio', 'percent-change', 'margin', 'sum', 'product', 'stock-days'] as KernelId[]) {
        t.check((kernelUse.get(kernel) ?? 0) >= 2, `Kernel ${kernel} used by fewer than 2 formulas.`);
      }
    }),

    run('Stable, unique, well-formed ids', (t) => {
      for (const metric of ALL_METRICS) t.check(ID_PATTERN.test(metric.metricId), `Bad metric id ${metric.metricId}.`);
      for (const id of FORMULA_IDS) t.check(ID_PATTERN.test(id), `Bad formula id ${id}.`);
      t.check(new Set(FORMULA_IDS).size === FORMULA_IDS.length, 'Duplicate formula ids.');
      for (const id of METRIC_ID_SNAPSHOT) t.check(METRIC_BY_ID.has(id), `Snapshot id ${id} disappeared (ids must stay stable).`);
      for (const source of Object.values(EVIDENCE_SOURCES)) t.check(ID_PATTERN.test(source.id), `Bad source id ${source.id}.`);
    }),

    run('Industry associations are valid against the catalog; no Coming Soon associations', (t) => {
      const implemented = new Set(IMPLEMENTED_CURRICULUM_IDS);
      const comingSoon = new Set(COMING_SOON_IDS);
      for (const link of ALL_LINKS) {
        t.check(METRIC_BY_ID.has(link.metricId), `Link to unknown metric ${link.metricId}.`);
        t.check(link.curriculumIds.length > 0 && link.interpretation.length > 0, `${link.metricId}: link without curricula or interpretation.`);
        for (const id of link.curriculumIds) {
          t.check(implemented.has(id), `${link.metricId}: ${id} is not an implemented curriculum.`);
          t.check(!comingSoon.has(id), `${link.metricId}: linked to Coming Soon entry ${id}.`);
        }
      }
      for (const note of MISSING_HIGH_PRIORITY) t.check(implemented.has(note.curriculumId), `Missing-metric note for unknown curriculum ${note.curriculumId}.`);
      for (const id of IMPLEMENTED_CURRICULUM_IDS) {
        const count = metricsForCurriculum(id).length;
        t.check(count >= 4, `${id}: only ${count} metrics linked.`);
      }
      for (const id of COMING_SOON_IDS) t.check(metricsForCurriculum(id).length === 0, `${id}: Coming Soon entry has metrics.`);
    }),

    run('Related metrics exist and are not self-references', (t) => {
      for (const metric of ALL_METRICS) {
        t.check(metric.relatedMetricIds.length > 0, `${metric.metricId}: no related metrics.`);
        t.check(new Set(metric.relatedMetricIds).size === metric.relatedMetricIds.length, `${metric.metricId}: duplicate related ids.`);
        for (const id of metric.relatedMetricIds) {
          t.check(METRIC_BY_ID.has(id), `${metric.metricId}: related ${id} does not exist.`);
          t.check(id !== metric.metricId, `${metric.metricId}: relates to itself.`);
        }
      }
    }),

    run('Every authored metric has definition, unit, formula, variables, interpretation and a labelled hypothetical example', (t) => {
      const categories = new Set(METRIC_CATEGORIES.map((c) => c.id));
      for (const m of ALL_METRICS) {
        const id = m.metricId;
        t.check(m.name.length > 0 && m.definition.length > 20 && m.businessMeaning.length > 20, `${id}: name, definition or business meaning too thin.`);
        t.check(categories.has(m.category), `${id}: unknown category ${m.category}.`);
        t.check(Boolean(UNITS[m.unit]), `${id}: unknown unit.`);
        t.check(m.reportingScope.length > 0 && m.suggestedApplication.length > 0, `${id}: reporting scope or application missing.`);
        const i = m.interpretation;
        t.check(Boolean(i.higher && i.lower) && i.exceptions.length > 0 && i.drivers.length > 0 && i.managementUses.length > 0 && i.pitfalls.length > 0, `${id}: interpretation incomplete.`);
        t.check(m.example.label === HYPOTHETICAL_LABEL, `${id}: example not labelled hypothetical.`);
        t.check(m.example.assumptions.length > 0 && m.example.steps.length > 0 && m.example.interpretation.length > 0 && m.example.scenario.length > 0, `${id}: example incomplete.`);
      }
    }),

    run('Verification status is transparent and evidence references real registry entries', (t) => {
      for (const m of ALL_METRICS) {
        const e = m.evidence;
        t.check(e.note.length > 0, `${m.metricId}: evidence note missing.`);
        t.check(['source-verified', 'verified-with-caveat', 'pending-verification', 'rejected'].includes(e.status), `${m.metricId}: unknown status ${e.status}.`);
        if (e.status === 'source-verified' || e.status === 'verified-with-caveat') {
          t.check(e.sources.length > 0, `${m.metricId}: verified without sources.`);
          t.check(Boolean(e.verifiedOn && /^\d{4}-\d{2}-\d{2}$/.test(e.verifiedOn)), `${m.metricId}: verified without ISO date.`);
          for (const s of e.sources) {
            t.check(Boolean(EVIDENCE_SOURCES[s.sourceId]), `${m.metricId}: unknown source ${s.sourceId}.`);
            t.check(s.locator.length > 0 && s.confirms.length > 0, `${m.metricId}: source reference lacks locator or confirmation.`);
          }
          if (e.status === 'verified-with-caveat') t.check(Boolean(e.caveats && e.caveats.length > 0 && e.caveats.every((c) => c.length > 10)), `${m.metricId}: Verified with caveat needs displayed caveats.`);
        } else {
          t.check(e.sources.length === 0, `${m.metricId}: pending or rejected metric should not cite sources as evidence.`);
          t.check(!assessMetric(m).learnerReady, `${m.metricId}: pending or rejected metric must not be learner-ready.`);
        }
      }
      for (const source of Object.values(EVIDENCE_SOURCES)) {
        t.check(/^https:\/\//.test(source.url) && source.accessedOn.length === 10, `${source.id}: URL or access date missing.`);
      }
    }),

    run('Learner-ready means source-verified AND formula-tested', (t) => {
      let ready = 0;
      for (const m of ALL_METRICS) {
        const r = assessMetric(m);
        t.check(r.learnerReady === (r.sourceVerified && r.formulaTested), `${m.metricId}: readiness flag inconsistent.`);
        if (r.learnerReady) ready += 1;
      }
      t.check(ready > 0, 'No learner-ready metrics.');
    }),

    run('Formula relationships hold across metrics (simulator compatibility)', (t) => {
      const val = (formulaId: string, inputs: Record<string, number>) => {
        const r = evaluateFormula(formulaId, inputs);
        return r.ok ? r.value : Number.NaN;
      };
      const occ = val('hotel-occupancy-rate', { roomsSold: 2250, roomsAvailable: 3000 });
      const adr = val('average-daily-rate', { roomRevenue: 270000, roomsSold: 2250 });
      const revpar = val('revpar', { roomRevenue: 270000, roomsAvailable: 3000 });
      t.check(approxEqual(revpar, occ * adr, CHECK_TOLERANCE), 'RevPAR ≠ Occupancy × ADR.');
      const nim = val('net-interest-margin', { interestIncome: 900, interestExpense: 500, averageEarningAssets: 12000 });
      const yieldEa = val('asset-yield', { interestIncome: 900, averageEarningAssets: 12000 });
      const cof = val('cost-of-funds', { interestExpense: 500, averageEarningAssets: 12000 });
      // Same denominator, period and income and expense definitions: the relationship holds numerically.
      t.check(approxEqual(nim, yieldEa - cof, CHECK_TOLERANCE), 'On one common basis NIM should equal asset yield − cost of funding earning assets.');
      // It is an approximation, not an identity: a liability-based cost of funds breaks it.
      const costOnLiabilities = 500 / 10000;
      t.check(!approxEqual(yieldEa - costOnLiabilities, nim, 1e-6), 'Asset yield − a liability-based cost of funds must not be treated as the NIM.');
      const a = val('availability', { runTime: 450, plannedProductionTime: 480 });
      const p = val('performance-efficiency', { idealCycleTime: 0.5, totalCount: 810, runTime: 450 });
      const q = val('quality-rate', { goodCount: 790, totalCount: 810 });
      t.check(approxEqual(val('oee', { availability: a, performance: p, quality: q }), (790 * 0.5) / 480, CHECK_TOLERANCE), 'OEE ≠ A × P × Q ≠ simple OEE.');
      t.check(approxEqual(val('annual-recurring-revenue', { monthlyRecurringRevenue: val('monthly-recurring-revenue', { payingAccounts: 10, averageRevenuePerAccount: 25 }) }), 3000, CHECK_TOLERANCE), 'ARR ≠ MRR × 12.');
      const gmv = val('gross-merchandise-value', { orders: 1000, averageOrderValue: 40 });
      t.check(approxEqual(val('take-rate', { platformRevenue: gmv * 0.1, grossValue: gmv }), 0.1, CHECK_TOLERANCE), 'Take rate × GMV round trip failed.');
      const beYield = val('break-even-yield', { costPerHectare: 18000, pricePerTonne: 3000 });
      t.check(approxEqual(val('break-even-price', { costPerHectare: 18000, yieldPerHectare: beYield }), 3000, CHECK_TOLERANCE), 'Break-even price and yield are not inverse.');
      const irr = val('internal-rate-of-return', { cf0: -1000, cf1: 300, cf2: 300, cf3: 300, cf4: 300, cf5: 300 });
      t.check(Math.abs(val('net-present-value', { discountRate: irr, cf0: -1000, cf1: 300, cf2: 300, cf3: 300, cf4: 300, cf5: 300 })) < 1e-6, 'NPV at IRR is not zero.');
      const dso = val('days-sales-outstanding', { averageReceivables: 240, netCreditSales: 1460 });
      const dio = val('days-inventory-outstanding', { endingInventory: 150, cogs: 1095 });
      t.check(approxEqual(val('cash-conversion-cycle', { inventoryDays: dio, receivableDays: dso, payableDays: 45 }), 65, CHECK_TOLERANCE), 'CCC ≠ DIO + DSO − DPO.');
      for (const m of ALL_METRICS.filter((x) => x.simulator)) {
        const s = m.simulator!;
        t.check(s.drivers.length > 0 && s.scenarioAssumptions.length > 0 && s.relationships.length > 0, `${m.metricId}: simulator hints incomplete.`);
      }
    }),

    run('Coverage manifest is internally consistent', (t) => {
      const manifest = buildCoverageManifest();
      t.check(manifest.length === 44, `Manifest should have 44 rows, found ${manifest.length}.`);
      for (const row of manifest) {
        t.check(row.metricsAuthored <= row.metricsIdentified, `${row.curriculumId}: authored > identified.`);
        t.check(row.readyForLearners <= row.sourceVerified && row.readyForLearners <= row.formulaTested, `${row.curriculumId}: ready exceeds verified or tested.`);
        t.check(row.sourceVerified + row.pendingVerification === row.metricsAuthored, `${row.curriculumId}: verified + pending ≠ authored.`);
        t.check(row.sourceVerified + row.pendingOnly + row.rejected === row.metricsAuthored, `${row.curriculumId}: verified + pending + rejected ≠ authored.`);
        t.check(row.verifiedWithCaveat <= row.sourceVerified, `${row.curriculumId}: caveat count exceeds verified count.`);
        t.check(row.workedExamples === row.metricsAuthored, `${row.curriculumId}: a metric lacks a worked example.`);
      }
    }),
  ];
}
