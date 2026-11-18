// Targeted tests for the 2026-11-08 verification review: status model, learner visibility,
// recorded review decisions, corrected formula definitions and cross-industry consistency.
// Same conventions as metricsTests.ts (no framework). Run through tests/runTests.ts.

import { COMING_SOON_IDS, IMPLEMENTED_CURRICULUM_IDS } from '../catalog/catalogSnapshot';
import { evaluateFormula, FORMULAS } from '../core/formulas';
import { assessMetric } from '../core/readiness';
import { EVIDENCE_SOURCES } from '../core/sources';
import { VERIFICATION_LABELS } from '../core/types';
import type { MetricDefinition, VerificationStatus } from '../core/types';
import { ALL_METRICS, METRIC_BY_ID, curriculaForMetric } from '../content/library';
import { learnerEntriesForCurriculum, learnerReadyMetricList } from '../content/learnerView';
import { CAVEAT_RECLASSIFICATIONS, PENDING_REVIEWS } from '../content/reviewLog';
import { approxEqual, CHECK_TOLERANCE } from './formulaChecks';
import type { TestResult } from './metricsTests';

class Collector {
  assertions = 0;
  failures: string[] = [];
  check(condition: boolean, message: string): void {
    this.assertions += 1;
    if (!condition) this.failures.push(message);
  }
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

const VERIFIED_STATUSES: VerificationStatus[] = ['source-verified', 'verified-with-caveat'];

function val(formulaId: string, inputs: Record<string, number>): number {
  const result = evaluateFormula(formulaId, inputs);
  return result.ok ? result.value : Number.NaN;
}

function withStatus(metric: MetricDefinition, status: VerificationStatus, caveats?: string[]): MetricDefinition {
  return { ...metric, evidence: { ...metric.evidence, status, caveats } };
}

export function runReviewTests(): TestResult[] {
  return [
    run('Four verification statuses exist, are labelled, and partition the library', (t) => {
      t.check(Object.keys(VERIFICATION_LABELS).length === 4, 'Expected four verification statuses.');
      const counts: Record<VerificationStatus, number> = { 'source-verified': 0, 'verified-with-caveat': 0, 'pending-verification': 0, rejected: 0 };
      for (const metric of ALL_METRICS) counts[metric.evidence.status] += 1;
      const total = counts['source-verified'] + counts['verified-with-caveat'] + counts['pending-verification'] + counts.rejected;
      t.check(total === ALL_METRICS.length, 'Statuses do not partition the metrics.');
      t.check(counts['pending-verification'] === Object.keys(PENDING_REVIEWS).length, `Pending count ${counts['pending-verification']} ≠ recorded reviews ${Object.keys(PENDING_REVIEWS).length}.`);
      t.check(counts['verified-with-caveat'] > 0 && counts['source-verified'] > 0, 'Both verified statuses should be in use.');
      t.check(new Set(ALL_METRICS.map((m) => m.metricId)).size === ALL_METRICS.length, 'Duplicate metric ids.');
    }),

    run('Learner views contain only Verified and Verified with caveat metrics; Pending and Rejected are never visible', (t) => {
      for (const curriculumId of IMPLEMENTED_CURRICULUM_IDS) {
        const visible = learnerEntriesForCurriculum(curriculumId);
        const review = learnerEntriesForCurriculum(curriculumId, { includePending: true });
        for (const entry of visible) {
          t.check(VERIFIED_STATUSES.includes(entry.metric.evidence.status), `${curriculumId}: ${entry.metric.metricId} (${entry.metric.evidence.status}) leaked into the learner view.`);
          t.check(assessMetric(entry.metric).learnerReady, `${curriculumId}: ${entry.metric.metricId} is not learner-ready.`);
        }
        const visibleIds = new Set(visible.map((e) => e.metric.metricId));
        for (const entry of review) {
          if (!visibleIds.has(entry.metric.metricId)) t.check(!assessMetric(entry.metric).learnerReady, `${curriculumId}: ${entry.metric.metricId} hidden although learner-ready.`);
        }
        t.check(review.length >= visible.length, `${curriculumId}: review view smaller than learner view.`);
      }
      for (const metric of learnerReadyMetricList()) t.check(VERIFIED_STATUSES.includes(metric.evidence.status), `${metric.metricId}: unverified metric in the learner-ready list.`);
      t.check(ALL_METRICS.some((m) => m.evidence.status === 'pending-verification'), 'Expected pending metrics to exist for the visibility check to mean something.');
    }),

    run('Status rules: Rejected and Pending are never learner-ready; caveated verification needs caveats', (t) => {
      const sample = ALL_METRICS.find((m) => m.evidence.status === 'source-verified' && assessMetric(m).formulaTested);
      t.check(Boolean(sample), 'No verified, formula-tested sample metric.');
      if (!sample) return;
      t.check(assessMetric(sample).learnerReady, 'Baseline sample should be learner-ready.');
      t.check(!assessMetric(withStatus(sample, 'rejected')).learnerReady, 'Rejected metric became learner-ready.');
      t.check(!assessMetric(withStatus(sample, 'pending-verification')).learnerReady, 'Pending metric became learner-ready.');
      t.check(!assessMetric(withStatus(sample, 'verified-with-caveat')).learnerReady, 'Verified with caveat without caveats became learner-ready.');
      t.check(!assessMetric(withStatus(sample, 'verified-with-caveat', [])).learnerReady, 'Empty caveat list accepted.');
      t.check(assessMetric(withStatus(sample, 'verified-with-caveat', ['State the basis used.'])).learnerReady, 'Properly caveated metric should be learner-ready.');
      const noSources: MetricDefinition = { ...sample, evidence: { ...sample.evidence, sources: [] } };
      t.check(!assessMetric(noSources).learnerReady, 'Verified metric without sources became learner-ready.');
    }),

    run('Every pending metric records its review reason; the review log has no stale entries', (t) => {
      for (const metric of ALL_METRICS) {
        if (metric.evidence.status !== 'pending-verification' && metric.evidence.status !== 'rejected') continue;
        const review = metric.evidence.review;
        t.check(Boolean(review), `${metric.metricId}: pending or rejected without a recorded review.`);
        if (!review) continue;
        t.check(/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedOn), `${metric.metricId}: review date missing.`);
        t.check(review.reason.length > 20, `${metric.metricId}: review reason too thin.`);
        t.check(Boolean(review.nextStep && review.nextStep.length > 10), `${metric.metricId}: next step missing.`);
        t.check(review.checkedThisReview || review.reason.includes('Not re-researched'), `${metric.metricId}: unchecked metric must say it was not re-researched.`);
        t.check(metric.evidence.sources.length === 0, `${metric.metricId}: pending metric cites sources.`);
      }
      for (const id of Object.keys(PENDING_REVIEWS)) {
        const metric = METRIC_BY_ID.get(id);
        t.check(Boolean(metric), `Review log refers to unknown metric ${id}.`);
        if (metric) t.check(metric.evidence.status === 'pending-verification' || metric.evidence.status === 'rejected', `${id}: has a pending review but status is ${metric.evidence.status}.`);
      }
    }),

    run('Caveat reclassifications point at real metrics, carry caveats and keep their sources', (t) => {
      for (const [id, entry] of Object.entries(CAVEAT_RECLASSIFICATIONS)) {
        const metric = METRIC_BY_ID.get(id);
        t.check(Boolean(metric), `Reclassification refers to unknown metric ${id}.`);
        if (!metric) continue;
        t.check(metric.evidence.status === 'verified-with-caveat', `${id}: expected Verified with caveat, found ${metric.evidence.status}.`);
        t.check(entry.caveats.length > 0 && entry.caveats.every((c) => c.length > 20), `${id}: caveats too thin.`);
        t.check(metric.evidence.sources.length > 0, `${id}: lost its sources.`);
        for (const source of entry.addSources ?? []) t.check(Boolean(EVIDENCE_SOURCES[source.sourceId]), `${id}: added source ${source.sourceId} is not registered.`);
      }
    }),

    run('Corrected definitions: NIM, cost of funds and asset yield are an approximation, not an identity', (t) => {
      const nim = METRIC_BY_ID.get('net-interest-margin');
      const cof = METRIC_BY_ID.get('cost-of-funds');
      const ay = METRIC_BY_ID.get('asset-yield');
      t.check(Boolean(nim && cof && ay), 'Banking metrics missing.');
      if (!nim || !cof || !ay) return;
      t.check(FORMULAS['net-interest-margin'].expression.includes('Average earning assets'), 'NIM must divide by average earning assets.');
      for (const metric of [nim, cof]) {
        const relationships = (metric.simulator?.relationships ?? []).join(' ');
        t.check(relationships.includes('≈') && !/NIM = Asset yield/.test(relationships), `${metric.metricId}: relationship must be stated as an approximation.`);
      }
      t.check(cof.variants.join(' ').includes('interest-bearing liabilities'), 'Cost of funds must document the liability-based variant.');
      t.check(cof.evidence.status === 'verified-with-caveat' && ay.evidence.status === 'verified-with-caveat', 'Asset yield and cost of funds must carry caveats.');
      t.check((cof.evidence.caveats ?? []).join(' ').includes('same denominator'), 'Caveats must state the same-denominator assumption.');
      t.check(nim.interpretation.pitfalls.join(' ').includes('denominators and definitions match'), 'NIM pitfalls should warn about the yield-minus-cost shortcut.');
    }),

    run('Corrected definitions: DIO uses ending inventory and differs from 365 ÷ turnover unless ending equals average', (t) => {
      const turnover = val('inventory-turnover', { cogs: 1200, averageInventory: 200 });
      const dioEqual = val('days-inventory-outstanding', { endingInventory: 200, cogs: 1200 });
      const dioHigher = val('days-inventory-outstanding', { endingInventory: 300, cogs: 1200 });
      t.check(approxEqual(dioEqual, 365 / turnover, CHECK_TOLERANCE), 'DIO should equal 365 ÷ turnover when ending equals average inventory.');
      t.check(!approxEqual(dioHigher, 365 / turnover, 1e-6), 'DIO with higher ending inventory must differ from 365 ÷ turnover.');
      const dio = METRIC_BY_ID.get('days-inventory-outstanding');
      t.check(Boolean(dio && (dio.evidence.caveats ?? []).join(' ').includes('ending inventory')), 'DIO caveat must explain the ending-versus-average basis.');
    }),

    run('Corrected definitions: weight-based vehicle load factor and delivery of its units', (t) => {
      const spec = FORMULAS['vehicle-load-factor'];
      t.check(spec.expression.includes('Weight of goods carried') && spec.variables.every((v) => v.unit === 'tonnes'), 'Vehicle load factor must be an explicit weight-based measure in tonnes.');
      t.check(approxEqual(val('vehicle-load-factor', { loadCarried: 12, vehicleCapacity: 15 }), 0.8, CHECK_TOLERANCE), 'Vehicle load factor example failed.');
      const result = evaluateFormula('vehicle-load-factor', { loadCarried: 16, vehicleCapacity: 15 });
      t.check(!result.ok && result.error === 'INVALID_COMBINATION', 'Overloaded vehicle should be rejected.');
      const metric = METRIC_BY_ID.get('vehicle-load-factor');
      t.check(Boolean(metric && metric.variants.some((v) => v.includes('Volumetric'))), 'Volumetric loading factor should be documented as a variant.');
    }),

    run('Cross-industry formula consistency: same relationship, same result', (t) => {
      const margins = [
        val('gross-margin', { netSales: 100, cogs: 60 }),
        val('contribution-margin-ratio', { revenue: 100, variableCosts: 60 }),
        val('project-margin', { projectFees: 100, directCosts: 60 }),
      ];
      for (const m of margins) t.check(approxEqual(m, 0.4, CHECK_TOLERANCE), 'Margin family should give 40%.');
      t.check(approxEqual(val('hotel-occupancy-rate', { roomsSold: 80, roomsAvailable: 100 }), val('physical-occupancy-rate', { occupiedArea: 80, leasableArea: 100 }), CHECK_TOLERANCE), 'Occupancy formulas should agree.');
      t.check(approxEqual(val('utilization-rate', { billableHours: 90, availableHours: 100 }), val('capacity-utilization', { actualOutput: 90, capacity: 100 }), CHECK_TOLERANCE), 'Utilisation formulas should agree.');
      const churn = val('churn-rate', { customersLost: 12, customersStart: 400 });
      const retention = val('customer-retention-rate', { customersEnd: 438, newCustomers: 50, customersStart: 400 });
      t.check(approxEqual(churn + retention, 1, CHECK_TOLERANCE), 'Churn and retention should sum to 100% on one customer definition.');
      const nrr = val('net-revenue-retention', { cohortCurrentArr: 1150, cohortPriorArr: 1000 });
      t.check(nrr > 1, 'NRR can exceed 100%.');
      const tooMany = evaluateFormula('customer-retention-rate', { customersEnd: 1100, newCustomers: 50, customersStart: 1000 });
      t.check(!tooMany.ok && tooMany.error === 'INVALID_COMBINATION', 'Customer retention cannot exceed 100%.');
      const arr = METRIC_BY_ID.get('annual-recurring-revenue');
      t.check(Boolean(arr && (arr.evidence.caveats ?? []).join(' ').includes('not GAAP or IFRS revenue')), 'ARR must carry the caveat that it is not recognised revenue.');
      const gmv = METRIC_BY_ID.get('gross-merchandise-value');
      t.check(Boolean(gmv && (gmv.evidence.caveats ?? []).join(' ').includes('GMV is not revenue')), 'GMV must carry the caveat that it is not revenue.');
    }),

    run('Round-trip relationships for the new metrics', (t) => {
      const ape = val('annual-premium-equivalent', { regularPremiums: 120, singlePremiums: 400 });
      const vnb = val('value-of-new-business', { pvFutureProfits: 75, costOfRequiredCapital: 15 });
      t.check(approxEqual(ape, 160, CHECK_TOLERANCE) && approxEqual(vnb, 60, CHECK_TOLERANCE), 'APE or VNB arithmetic failed.');
      t.check(approxEqual(val('vnb-margin', { valueOfNewBusiness: vnb, annualPremiumEquivalent: ape }), vnb / ape, CHECK_TOLERANCE), 'VNB margin ≠ VNB ÷ APE.');
      t.check(val('solvency-ratio', { eligibleOwnFunds: 100, solvencyCapitalRequirement: 100 }) === 1, 'Own funds equal to SCR should give 100%.');
      t.check(val('solvency-ratio', { eligibleOwnFunds: 99, solvencyCapitalRequirement: 100 }) < 1, 'Own funds below SCR should give less than 100%.');
      const tpv = val('total-payment-volume', { paymentTransactions: 1000, averagePaymentValue: 30 });
      t.check(approxEqual(val('take-rate', { platformRevenue: tpv * 0.02, grossValue: tpv }), 0.02, CHECK_TOLERANCE), 'TPV × take rate round trip failed.');
      t.check(approxEqual(val('transaction-loss-rate', { transactionLosses: 30, totalPaymentVolume: tpv }), 30 / tpv, CHECK_TOLERANCE), 'Transaction loss rate ≠ losses ÷ TPV.');
      const adg = val('average-daily-gain', { finalWeight: 100, initialWeight: 40, daysOnFeed: 120 });
      t.check(approxEqual(adg * 120, 60, CHECK_TOLERANCE), 'ADG × days should equal weight gained.');
      const fcr = val('feed-conversion-ratio', { feedConsumed: 90, liveweightGain: 50 });
      t.check(approxEqual(fcr * 50, 90, CHECK_TOLERANCE), 'FCR × gain should equal feed consumed.');
      const cog = val('cost-of-gain', { totalFeedingCost: 8000, totalGain: 4 });
      t.check(approxEqual(cog * 4, 8000, CHECK_TOLERANCE), 'Cost of gain × gain should equal total cost.');
      t.check(approxEqual(val('subscriber-growth', { subscribersEnd: 1100, subscribersStart: 1000 }), 1100 / 1000 - 1, CHECK_TOLERANCE), 'Subscriber growth ≠ end ÷ start − 1.');
      t.check(approxEqual(val('mortality-rate', { animalsDied: 6, animalsPlaced: 200 }), 0.03, CHECK_TOLERANCE), 'Mortality rate arithmetic failed.');
      t.check(approxEqual(val('dressing-percentage', { carcassWeight: 300, liveWeight: 500 }), 0.6, CHECK_TOLERANCE), 'Dressing percentage arithmetic failed.');
    }),

    run('Hotel and restaurant definitions stay separate', (t) => {
      const hotelOnly = ['hotel-occupancy-rate', 'average-daily-rate', 'revpar', 'goppar'];
      const restaurantOnly = ['food-cost-percentage', 'prime-cost-percentage', 'table-turnover', 'revpash'];
      for (const id of hotelOnly) {
        const curricula = curriculaForMetric(id);
        t.check(curricula.length > 0 && curricula.every((c) => c === 'hospitality-hotels'), `${id}: hotel metric linked outside Hotels & Resorts (${curricula.join(', ')}).`);
      }
      for (const id of restaurantOnly) {
        const curricula = curriculaForMetric(id);
        t.check(!curricula.includes('hospitality-hotels'), `${id}: restaurant metric linked to Hotels & Resorts.`);
      }
    }),

    run('Priority sub-industries reach their minimum learner-visible coverage', (t) => {
      const minimums: Record<string, number> = {
        'banking-insurance': 9,
        'banking-fintech': 9,
        'tech-telecom': 5,
        'tech-social': 7,
        'agri-livestock': 9,
        'realestate-proptech': 8,
      };
      for (const [curriculumId, minimum] of Object.entries(minimums)) {
        const count = learnerEntriesForCurriculum(curriculumId).length;
        t.check(count >= minimum, `${curriculumId}: ${count} learner-visible metrics, expected at least ${minimum}.`);
      }
      for (const id of COMING_SOON_IDS) t.check(learnerEntriesForCurriculum(id).length === 0, `${id}: Coming Soon entry has learner metrics.`);
    }),

    run('Worked examples make no market-benchmark claims and new sources are registered once', (t) => {
      const banned = /(industry average|market average|industry benchmark|market benchmark)/i;
      for (const metric of ALL_METRICS) {
        const text = [metric.example.scenario, metric.example.interpretation, ...metric.example.assumptions, ...metric.example.steps].join(' ');
        t.check(!banned.test(text), `${metric.metricId}: worked example reads like a market benchmark.`);
      }
      const urls = Object.values(EVIDENCE_SOURCES).map((s) => s.url);
      t.check(new Set(urls).size === urls.length, 'Two registry entries share a URL.');
    }),
  ];
}
