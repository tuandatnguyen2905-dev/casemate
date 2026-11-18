// Public integration surface. Domain Knowledge (or a future KPI simulator) should import
// only from this file so the library's internal layout can change without breaking callers.

import { CATALOG_SUB_INDUSTRIES, IMPLEMENTED_CURRICULUM_IDS } from './catalog/catalogSnapshot';
import { evaluateFormula, getFormula } from './core/formulas';
import type { FormulaResult, VariableSpec } from './core/formulaEngine';
import { assessMetric } from './core/readiness';
import type { MetricReadiness } from './core/readiness';
import type { MetricDefinition, UnitId } from './core/types';
import { buildCoverageManifest } from './content/coverage';
import { getMetric } from './content/library';
import type { CurriculumMetricEntry } from './content/library';
import { learnerEntriesForCurriculum, learnerReadyMetricList } from './content/learnerView';

export { default as MetricsExplorer } from './components/MetricsExplorer';
export type { MetricsExplorerProps } from './components/MetricsExplorer';
export type { MetricDefinition, MetricReadiness, CurriculumMetricEntry, FormulaResult, VariableSpec };
export { buildCoverageManifest, getMetric, assessMetric };

export const METRICS_LIBRARY_VERSION = '1.1.0-draft';

/**
 * Metrics for a Domain Knowledge curriculum id. Learner-ready only (Verified and Verified with
 * caveat). includePending is for reviewers: it also returns Pending verification and Rejected metrics.
 */
export function getMetricsForCurriculum(curriculumId: string, options: { includePending?: boolean } = {}): CurriculumMetricEntry[] {
  return learnerEntriesForCurriculum(curriculumId, options);
}

export function getLearnerReadyMetrics(): MetricDefinition[] {
  return learnerReadyMetricList();
}

/** One metric by id, only when it is learner-visible (Verified or Verified with caveat). */
export function getLearnerMetric(metricId: string): MetricDefinition | undefined {
  const metric = getMetric(metricId);
  return metric && assessMetric(metric).learnerReady ? metric : undefined;
}

export function isSupportedCurriculum(curriculumId: string): boolean {
  return IMPLEMENTED_CURRICULUM_IDS.includes(curriculumId);
}

export function curriculumLabel(curriculumId: string): string | undefined {
  return CATALOG_SUB_INDUSTRIES.find((s) => s.id === curriculumId)?.label;
}

export interface SimulatorSpec {
  metricId: string;
  formulaId: string;
  expression: string;
  outputUnit: UnitId;
  inputs: VariableSpec[];
  defaults: Record<string, number>;
  drivers: string[];
  scenarioAssumptions: string[];
  relationships: string[];
  errorConditions: string[];
  evaluate: (inputs: Record<string, unknown>) => FormulaResult;
}

/**
 * Everything a future KPI simulator needs for one metric; the simulator itself is not built here.
 * Learner-visible metrics only unless includePending is set (reviewers).
 */
export function getSimulatorSpec(metricId: string, options: { includePending?: boolean } = {}): SimulatorSpec | undefined {
  const metric = getMetric(metricId);
  const formula = metric ? getFormula(metric.formulaId) : undefined;
  if (!metric || !formula) return undefined;
  if (!options.includePending && !assessMetric(metric).learnerReady) return undefined;
  const errorConditions = [
    'MISSING_INPUT: a required variable is absent.',
    'INVALID_INPUT: a variable is not a finite number.',
    ...formula.variables.filter((v) => v.denominator).map((v) => `DIVISION_BY_ZERO: ${v.label} is zero.`),
    ...formula.variables.filter((v) => v.min !== undefined || v.max !== undefined).map((v) => `OUT_OF_RANGE: ${v.label} — ${v.rangeNote}`),
    ...(formula.constraints ?? []).map((c) => `${c.code}: ${c.message}`),
  ];
  return {
    metricId,
    formulaId: formula.id,
    expression: formula.expression,
    outputUnit: formula.outputUnit,
    inputs: formula.variables,
    defaults: { ...metric.example.inputs },
    drivers: metric.simulator?.drivers ?? [],
    scenarioAssumptions: [...(metric.simulator?.scenarioAssumptions ?? []), ...metric.example.assumptions],
    relationships: metric.simulator?.relationships ?? [],
    errorConditions,
    evaluate: (inputs) => evaluateFormula(formula.id, inputs),
  };
}
