import type { MetricDefinition, VerificationStatus } from './types';
import { evaluateFormula, getFormula } from './formulas';
import { approxEqual, CHECK_TOLERANCE, EXAMPLE_TOLERANCE, FORMULA_CHECKS } from '../tests/formulaChecks';

export interface MetricReadiness {
  /** Verified or Verified with caveat, with sources and (for caveats) at least one caveat recorded. */
  sourceVerified: boolean;
  formulaTested: boolean;
  exampleRecalculates: boolean;
  /** Only verified (or properly caveated) metrics whose formula passes its checks are visible to learners. */
  learnerReady: boolean;
  status: VerificationStatus;
  issues: string[];
}

const checkCache = new Map<string, { count: number; passed: boolean }>();

/** Runs the independent checks for one formula (cached; pure arithmetic, so cheap). */
export function independentChecksPass(formulaId: string): { count: number; passed: boolean } {
  const cached = checkCache.get(formulaId);
  if (cached) return cached;
  const checks = FORMULA_CHECKS.filter((check) => check.formulaId === formulaId && check.expected !== undefined);
  const passed = checks.length > 0 && checks.every((check) => {
    const result = evaluateFormula(formulaId, check.inputs);
    return result.ok && approxEqual(result.value, check.expected as number, CHECK_TOLERANCE);
  });
  const outcome = { count: checks.length, passed };
  checkCache.set(formulaId, outcome);
  return outcome;
}

export function exampleRecalculates(metric: MetricDefinition): boolean {
  const result = evaluateFormula(metric.formulaId, metric.example.inputs);
  return result.ok && approxEqual(result.value, metric.example.output, EXAMPLE_TOLERANCE);
}

/** True when the evidence record is complete enough for the status it claims. */
export function evidenceSupportsVerification(metric: MetricDefinition): boolean {
  const evidence = metric.evidence;
  if (evidence.status !== 'source-verified' && evidence.status !== 'verified-with-caveat') return false;
  if (evidence.sources.length === 0 || !evidence.verifiedOn) return false;
  if (evidence.status === 'verified-with-caveat' && !(evidence.caveats && evidence.caveats.length > 0)) return false;
  return true;
}

export function assessMetric(metric: MetricDefinition): MetricReadiness {
  const issues: string[] = [];
  const formula = getFormula(metric.formulaId);
  if (!formula) issues.push(`Formula "${metric.formulaId}" is not registered.`);
  const sourceVerified = evidenceSupportsVerification(metric);
  const checks = formula ? independentChecksPass(metric.formulaId) : { count: 0, passed: false };
  if (formula && checks.count === 0) issues.push('No independent calculation check.');
  if (formula && checks.count > 0 && !checks.passed) issues.push('Independent calculation check failed.');
  const recalculates = formula ? exampleRecalculates(metric) : false;
  if (formula && !recalculates) issues.push('Worked example does not recalculate.');
  const formulaTested = Boolean(formula) && checks.passed && recalculates;
  if (metric.evidence.status === 'rejected') issues.push('Rejected: incorrect, inappropriate or contradicted by a source.');
  else if (!sourceVerified) issues.push('Pending source verification.');
  return { sourceVerified, formulaTested, exampleRecalculates: recalculates, learnerReady: sourceVerified && formulaTested, status: metric.evidence.status, issues };
}

export function isLearnerReady(metric: MetricDefinition): boolean {
  return assessMetric(metric).learnerReady;
}
