import { gradeNumericQuantity, numericUnitSpec, parseNumericQuantity } from './numericUnits';
import { EASY_CALCULATION_WEIGHTS } from './caseScoringRubrics';

/**
 * calculationScoring.ts - fair, graduated marking for the "Calculations" case type.
 *
 * Case Drill and Case Pool both call this module. Numeric equivalence is resolved
 * by numericUnits.ts; this scorer never guesses an unmarked ×1,000/×1,000,000 scale.
 *
 * Marking rules:
 *  1. A submission that uses none of the numbers given in the case scores 0.
 *  2. A submission that uses the case numbers AND shows some logic never scores
 *     below CALCULATION_SCORE_FLOOR_RATIO of the available marks.
 *  3. Each result is credited on a smooth scale: exact = 100%, within 10% loses
 *     at most 20% of that result, and a wrong step only costs that step because
 *     later results that are correctly built on the learner's own earlier
 *     number still earn carry-forward credit.
 */

/** Share of the available marks guaranteed when the case numbers are used with some logic. */
export const CALCULATION_SCORE_FLOOR_RATIO = 0.4;
/** A final number inside this relative distance of the worked answer loses only a little. */
export const CALCULATION_CLOSE_TOLERANCE = 0.1;

const CARRY_FORWARD_CREDIT = 0.9;
const PROPORTIONAL_CARRY_CREDIT = 0.85;
const METHOD_ONLY_CREDIT = 0.5;
const METHOD_CONSISTENT_CREDIT = 0.6;
const ENTERED_ONLY_CREDIT = 0.2;
const INPUT_MATCH_TOLERANCE = 0.005;
const DERIVED_MATCH_TOLERANCE = 0.02;
/** Only explicit scale words/markers may rescale a value; arbitrary magnitude guessing is forbidden. */
const SCALE_FACTORS = [1];
const CASE_MATCH_SCALES = [1];

export interface CalculationScoringCheck {
  label: string;
  value: number;
  tolerance: number;
  unit: string;
}

export interface CalculationAttemptResult {
  value: string;
  unit?: string;
}

export interface CalculationAttemptRow {
  /** Zero-based index of the result this formula belongs to. */
  resultIndex: number;
  /** The number the learner typed into each formula slot. */
  inputs: string[];
  /** Evaluated value of the formula, or null while it is incomplete. */
  result: number | null;
  /** The formula as the learner built it, for quoting back. */
  text: string;
}

export interface CalculationAttempt {
  results: CalculationAttemptResult[];
  rows: CalculationAttemptRow[];
  caveat: string;
}

/**
 * 'rounding' and 'unit' only appear in the Easy profile: the digits match the worked answer and the
 * slip is owned (and deducted once) by Units and boundaries, so Arithmetic keeps full credit.
 */
export type CalculationResultStatus = 'exact' | 'close' | 'carried' | 'method' | 'entered' | 'off' | 'blank' | 'rounding' | 'unit';

/**
 * 'easy' scores four criteria (no Commercial interpretation) and gives every mistake a single owner.
 * Hard, Expert and every other caller keep the original five-criterion 'standard' profile.
 */
export type CalculationScoringProfile = 'standard' | 'easy';

export interface CalculationResultAssessment {
  label: string;
  unit: string;
  expected: number;
  learnerValue: number | null;
  relativeError: number | null;
  credit: number;
  status: CalculationResultStatus;
  note: string;
}

export interface CalculationScoredCriterion {
  key: string;
  label: string;
  weight: number;
  score: number;
  evidence: string;
  reason: string;
  strongerAnswer: string;
}

export interface CalculationScoreOutcome {
  overallScore: number;
  criteria: CalculationScoredCriterion[];
  results: CalculationResultAssessment[];
  usesCaseNumbers: boolean;
  hasLogic: boolean;
  blank: boolean;
  floorApplied: boolean;
  summary: string;
  firstDivergence: string;
}

export interface CalculationScoringInput {
  /** Case brief plus task text: every number the learner can see. */
  caseText: string;
  checks: CalculationScoringCheck[];
  attempt: CalculationAttempt;
  roundingRule?: string;
  decisionAndLimit?: string;
  profile?: CalculationScoringProfile;
}

interface NumberToken {
  value: number;
  multiplier: number;
  percent: boolean;
  explicitSuffix: boolean;
}

const TOKEN_PATTERN = /([−-]?(?:\d[\d,.]*(?:\.\d+)?|\.\d+))(?:\s*(%|percent|billion|bn|tỷ|ty|million|mn|triệu|thousand|nghìn|ngàn|m|k)(?![A-Za-zÀ-ỹ]))?/giu;

function suffixMultiplier(suffix: string): number {
  const lower = suffix.toLowerCase();
  if (lower === 'billion' || lower === 'bn' || lower === 'tỷ' || lower === 'ty') return 1e9;
  if (lower === 'million' || lower === 'mn' || lower === 'm' || lower === 'triệu') return 1e6;
  if (lower === 'thousand' || lower === 'k' || lower === 'nghìn' || lower === 'ngàn') return 1e3;
  return 1;
}

export function extractNumberTokens(text: string): NumberToken[] {
  const tokens: NumberToken[] = [];
  const source = String(text || '');
  const pattern = new RegExp(TOKEN_PATTERN.source, 'gi');
  let match: RegExpExecArray | null = pattern.exec(source);
  while (match !== null) {
    const value = Number(match[1].replace('−', '-').replace(/,/g, ''));
    const suffix = match[2] || '';
    if (Number.isFinite(value)) {
      tokens.push({
        value,
        multiplier: suffixMultiplier(suffix),
        percent: suffix === '%' || suffix.toLowerCase() === 'percent',
        explicitSuffix: Boolean(suffix),
      });
    }
    match = pattern.exec(source);
  }
  return tokens;
}

function tokenVariants(token: NumberToken): number[] {
  const variants = [token.value];
  if (token.multiplier !== 1) variants.push(token.value * token.multiplier);
  if (token.percent) variants.push(token.value / 100);
  return variants;
}

function relativeDistance(actual: number, expected: number): number {
  const scale = Math.max(Math.abs(expected), 1e-9);
  return Math.abs(actual - expected) / scale;
}

function variantsMatch(left: number[], right: number[], tolerance: number, scales: number[] = SCALE_FACTORS): boolean {
  return left.some((a) => right.some((b) => scales.some((factor) => relativeDistance(a * factor, b) <= tolerance)));
}

function percentVariants(value: number): number[] {
  return [value, value * 100, value / 100];
}

/** Numbers a learner can see in the case, excluding 0 and 1 which carry no information. */
export function caseInputNumbers(caseText: string): number[][] {
  const seen = new Set<string>();
  const out: number[][] = [];
  extractNumberTokens(caseText).forEach((token) => {
    const variants = tokenVariants(token);
    if (variants.every((value) => value === 0 || value === 1)) return;
    const key = variants.map((value) => String(value)).join('|');
    if (seen.has(key)) return;
    seen.add(key);
    out.push(variants);
  });
  return out;
}

function numberFromText(raw: string): NumberToken | null {
  const tokens = extractNumberTokens(raw);
  return tokens.length ? tokens[0] : null;
}

function strictTolerance(check: CalculationScoringCheck): number {
  return Number.isFinite(check.tolerance) && check.tolerance >= 0 ? check.tolerance : 0;
}

interface ResultMatch {
  value: number;
  relativeError: number;
  scaled: boolean;
  exact: boolean;
  invalid?: string;
}

function matchLearnerValue(raw: string, check: CalculationScoringCheck): ResultMatch | null {
  if (!String(raw || '').trim()) return null;
  const graded = gradeNumericQuantity(raw, check.value, check.unit, strictTolerance(check));
  if (!graded.ok || graded.value === null) {
    return { value: Number.NaN, relativeError: Number.POSITIVE_INFINITY, scaled: false, exact: false, invalid: graded.message || 'Invalid number or unit.' };
  }
  return {
    value: graded.value,
    relativeError: relativeDistance(graded.value, check.value),
    scaled: false,
    exact: graded.correct,
  };
}

function proximityCredit(relative: number): number {
  if (relative <= CALCULATION_CLOSE_TOLERANCE) return 1 - 2 * relative;
  if (relative <= 0.5) return Math.max(0.4, 0.8 - (relative - CALCULATION_CLOSE_TOLERANCE));
  return ENTERED_ONLY_CREDIT;
}

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function formatPercent(relative: number): string {
  const pct = relative * 100;
  return pct < 1 ? `${roundTo(pct, 2)}%` : `${roundTo(pct, 1)}%`;
}

function formatNumber(value: number): string {
  const rounded = Math.abs(value) >= 100 ? roundTo(value, 1) : roundTo(value, 2);
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function wordCount(text: string): number {
  return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

function rowIsComplete(row: CalculationAttemptRow): boolean {
  return row.result !== null && row.inputs.length >= 2 && row.inputs.every((input) => numberFromText(input) !== null);
}

function inputVariantList(raw: string): number[] {
  const token = numberFromText(raw);
  return token ? tokenVariants(token) : [];
}

function rowUsesAnyOf(row: CalculationAttemptRow, pool: number[][], scales: number[] = SCALE_FACTORS): boolean {
  return row.inputs.some((input) => {
    const variants = inputVariantList(input);
    return variants.length > 0 && pool.some((candidate) => variantsMatch(variants, candidate, INPUT_MATCH_TOLERANCE, scales));
  });
}

function learnerNumberPool(attempt: CalculationAttempt): number[][] {
  const pool: number[][] = [];
  attempt.results.forEach((result) => extractNumberTokens(result.value).forEach((token) => pool.push(tokenVariants(token))));
  attempt.rows.forEach((row) => row.inputs.forEach((input) => {
    const variants = inputVariantList(input);
    if (variants.length) pool.push(variants);
  }));
  extractNumberTokens(attempt.caveat).forEach((token) => pool.push(tokenVariants(token)));
  return pool;
}

export function attemptUsesCaseNumbers(
  attempt: CalculationAttempt,
  caseText: string,
  checks: CalculationScoringCheck[],
): boolean {
  const caseNumbers = caseInputNumbers(caseText);
  const pool = learnerNumberPool(attempt);
  // One or two small numbers (20, 40...) can match by chance, so a match counts when it is a
  // large figure or when at least three different case numbers appear.
  const matched = new Set<number>();
  let largestMatch = 0;
  caseNumbers.forEach((candidate, index) => {
    pool.forEach((variants) => {
      variants.forEach((typed) => {
        candidate.forEach((given) => {
          if (relativeDistance(typed, given) <= INPUT_MATCH_TOLERANCE) {
            matched.add(index);
            largestMatch = Math.max(largestMatch, Math.abs(typed));
          }
        });
      });
    });
  });
  if (largestMatch >= 100 || matched.size >= 3) return true;
  // Results derived from the case numbers count even when the inputs were not retyped.
  const learnerResults: string[] = attempt.results.map((result) => result.value);
  attempt.rows.forEach((row) => { if (row.result !== null) learnerResults.push(String(row.result)); });
  return checks.some((check) => learnerResults.some((raw) => {
    const match = matchLearnerValue(raw, check);
    return Boolean(match) && (match as ResultMatch).relativeError <= DERIVED_MATCH_TOLERANCE;
  }));
}

/**
 * Cheap guard used where there are no stored expected values (generated drills):
 * blank answers and answers that ignore the case numbers must score 0, and an answer
 * that uses them with some working is lifted to the floor.
 */
export function calculationMarkingGuard(
  attempt: CalculationAttempt,
  caseText: string,
  checks: CalculationScoringCheck[] = [],
): { blank: boolean; usesCaseNumbers: boolean; hasLogic: boolean } {
  const hasFinal = attempt.results.some((result) => numberFromText(result.value) !== null);
  const hasRow = attempt.rows.some((row) => row.inputs.some((slot) => numberFromText(slot) !== null));
  const blank = !hasFinal && !hasRow && !attempt.caveat.trim();
  const usesCaseNumbers = !blank && attemptUsesCaseNumbers(attempt, caseText, checks);
  const hasLogic = usesCaseNumbers && (attempt.rows.some(rowIsComplete) || (hasFinal && wordCount(attempt.caveat) >= 5));
  return { blank, usesCaseNumbers, hasLogic };
}

function rowsFor(attempt: CalculationAttempt, index: number): CalculationAttemptRow[] {
  return attempt.rows.filter((row) => row.resultIndex === index);
}

function describeStatus(status: CalculationResultStatus, relative: number | null): string {
  if (status === 'exact') return 'Matches the worked answer.';
  if (status === 'close') return `Within ${formatPercent(relative ?? 0)} of the worked answer, so only a small deduction.`;
  if (status === 'carried') return 'Different from the worked answer, but correctly built on your own earlier number, so it keeps most of its marks.';
  if (status === 'method') return 'The number differs, but your formula starts from the case numbers, so you keep partial credit for the method.';
  if (status === 'entered') return 'A number was entered, but the working does not show how it was reached.';
  return 'Not answered.';
}

function assessResults(input: CalculationScoringInput): CalculationResultAssessment[] {
  const { attempt, checks, caseText } = input;
  const caseNumbers = caseInputNumbers(caseText);
  const assessments: CalculationResultAssessment[] = [];
  const learnerFinals: Array<{ variants: number[]; value: number | null }> = [];
  const learnerRatios: Array<number | null> = [];

  checks.forEach((check, index) => {
    const finalRaw = attempt.results[index]?.value || '';
    const finalToken = numberFromText(finalRaw);
    const rows = rowsFor(attempt, index);
    const completeRows = rows.filter(rowIsComplete);
    const earlierPool: number[][] = [];
    learnerFinals.slice(0, index).forEach((entry) => { if (entry.variants.length) earlierPool.push(entry.variants); });
    attempt.rows.filter((row) => row.resultIndex < index && row.result !== null).forEach((row) => earlierPool.push([row.result as number]));
    checks.slice(0, index).forEach((earlier) => earlierPool.push(percentVariants(earlier.value)));

    const match = finalToken ? matchLearnerValue(finalRaw, check) : null;
    const rowResultMatch = !match && completeRows.length
      ? matchLearnerValue(String(completeRows[0].result), check)
      : null;
    const effective = match?.invalid ? null : match || rowResultMatch;
    const relative = effective ? effective.relativeError : null;

    let credit = 0;
    let status: CalculationResultStatus = 'blank';
    const proximity = match ? proximityCredit(match.relativeError) : rowResultMatch ? 0.7 * proximityCredit(rowResultMatch.relativeError) : 0;

    if (match?.invalid) {
      credit = 0;
      status = 'off';
    } else if (match && (match.exact || match.relativeError <= 1e-9)) {
      credit = 1;
      status = 'exact';
    } else if (match && match.relativeError <= CALCULATION_CLOSE_TOLERANCE) {
      credit = proximity;
      status = match.relativeError <= 0.0005 ? 'exact' : 'close';
    } else if (finalToken || rowResultMatch) {
      credit = Math.max(proximity, finalToken ? ENTERED_ONLY_CREDIT : 0);
      status = finalToken ? 'entered' : 'off';
      const consistent = completeRows.find((row) => {
        if (!finalToken || row.result === null) return false;
        const variants = tokenVariants(finalToken);
        return variantsMatch([row.result], variants, INPUT_MATCH_TOLERANCE);
      });
      const usableRow = consistent || completeRows.find((row) => rowUsesAnyOf(row, caseNumbers, CASE_MATCH_SCALES) || rowUsesAnyOf(row, earlierPool));
      if (usableRow) {
        const usesCase = rowUsesAnyOf(usableRow, caseNumbers, CASE_MATCH_SCALES);
        const usesEarlier = rowUsesAnyOf(usableRow, earlierPool);
        if (usesCase || usesEarlier) {
          const methodCredit = consistent ? METHOD_CONSISTENT_CREDIT : METHOD_ONLY_CREDIT;
          if (methodCredit > credit) { credit = methodCredit; status = 'method'; }
        }
        if (consistent && usesEarlier && index > 0) {
          const priorLearner = learnerFinals.slice(0, index).some((entry) => entry.variants.length && rowUsesAnyOf(consistent, [entry.variants]));
          const priorRow = attempt.rows.some((row) => row.resultIndex < index && row.result !== null && rowUsesAnyOf(consistent, [[row.result as number]]));
          if ((priorLearner || priorRow) && CARRY_FORWARD_CREDIT > credit) { credit = CARRY_FORWARD_CREDIT; status = 'carried'; }
        }
      }
      if (consistent && match && check.value !== 0 && match.value !== 0) {
        const ratio = match.value / check.value;
        const proportional = learnerRatios.slice(0, index).some((earlier) => earlier !== null && Math.abs(earlier - 1) > 0.02 && Math.abs(ratio - earlier) / Math.abs(earlier) <= 0.03);
        if (proportional && PROPORTIONAL_CARRY_CREDIT > credit) { credit = PROPORTIONAL_CARRY_CREDIT; status = 'carried'; }
      }
    }

    learnerFinals.push({ variants: finalToken ? tokenVariants(finalToken) : [], value: match ? match.value : null });
    learnerRatios.push(match && check.value !== 0 ? match.value / check.value : null);

    const finalStatus: CalculationResultStatus = credit > 0 || status !== 'blank' ? status : 'blank';
    assessments.push({
      label: check.label,
      unit: check.unit,
      expected: check.value,
      learnerValue: match ? match.value : rowResultMatch ? rowResultMatch.value : null,
      relativeError: relative,
      credit: roundTo(Math.max(0, Math.min(1, credit)), 3),
      status: finalStatus,
      note: match?.invalid || describeStatus(finalStatus, relative),
    });
  });
  return assessments;
}

function criterion(
  key: string,
  label: string,
  weight: number,
  score: number,
  evidence: string,
  reason: string,
  strongerAnswer: string,
): CalculationScoredCriterion {
  return { key, label, weight, score: roundTo(Math.max(0, Math.min(10, score)), 1), evidence, reason, strongerAnswer };
}

function zeroOutcome(input: CalculationScoringInput, reason: string, evidence: string, blank: boolean): CalculationScoreOutcome {
  if (input.profile === 'easy') return easyZeroOutcome(input, evidence, blank);
  const first = input.checks[0]?.label || 'the first requested result';
  const criteria = [
    criterion('model_formula', 'Model and formula', 20, 0, evidence, reason, 'Write the commercial formula and start from the numbers given in the case.'),
    criterion('arithmetic_sequence', 'Arithmetic and sequence', 30, 0, evidence, reason, `Calculate ${first} first, using the figures in the case brief.`),
    criterion('units_boundaries', 'Units and boundaries', 20, 0, evidence, reason, input.roundingRule || 'State the unit and rounding the case asks for.'),
    criterion('commercial_interpretation', 'Commercial interpretation', 20, 0, evidence, reason, input.decisionAndLimit || 'State the decision and the assumption it depends on.'),
    criterion('traceability', 'Traceability', 10, 0, evidence, reason, 'Show each intermediate step so the first slip can be found.'),
  ];
  return {
    overallScore: 0,
    criteria,
    results: input.checks.map((check) => ({
      label: check.label, unit: check.unit, expected: check.value, learnerValue: null, relativeError: null, credit: 0, status: 'blank' as const, note: 'Not marked.',
    })),
    usesCaseNumbers: false,
    hasLogic: false,
    blank,
    floorApplied: false,
    summary: blank ? 'Nothing was submitted, so there is nothing to mark.' : 'None of the numbers from the case brief appear in your answer, so it scores 0.',
    firstDivergence: blank ? `Start with ${first}.` : `Start from the figures in the case brief, then build ${first}.`,
  };
}

function rowsSummary(rows: CalculationAttemptRow[]): string {
  const text = rows.filter((row) => row.text.trim()).map((row) => row.text.trim()).join(' | ').slice(0, 420);
  return text || 'No complete formula row was submitted.';
}

const EASY_ROUNDING_BAND = 0.015;
const EASY_ROUNDING_UNITS_CREDIT = 0.75;
const EASY_UNIT_SLIP_UNITS_CREDIT = 0.4;
const EASY_PERFECT_SCORE = 9.95;

interface EasyResultReview {
  assessment: CalculationResultAssessment;
  /** Share of this result's units/rounding marks kept; null when the answer could not be read. */
  unitsCredit: number | null;
  unitsNote: string;
}

function unitSuffix(unit: string): string {
  return unit ? ` ${unit}` : '';
}

function typedDecimals(raw: string): number {
  const match = String(raw || '').replace(/,/g, '').match(/\d+\.(\d+)/);
  return match ? match[1].length : 0;
}

/** The digits are right but the value is written on the wrong scale (0.037 for 3.7%, VND units for VND million). */
function isScaleSlip(check: CalculationScoringCheck, value: number): boolean {
  if (!Number.isFinite(value) || value === 0 || check.value === 0) return false;
  const kind = numericUnitSpec(check.unit).kind;
  const factors = kind === 'percent' || kind === 'percentage-point' ? [100] : kind === 'currency' ? [1e3, 1e6, 1e9] : [];
  return factors.some((factor) => relativeDistance(value / factor, check.value) <= 0.01 || relativeDistance(value * factor, check.value) <= 0.01);
}

/** The number differs only because it was rounded more coarsely (or in the other direction) than the case asks. */
function isRoundingOnly(check: CalculationScoringCheck, value: number, raw: string): boolean {
  if (relativeDistance(value, check.value) > EASY_ROUNDING_BAND) return false;
  const difference = Math.abs(value - check.value);
  const coarse = difference <= 0.5 * 10 ** -typedDecimals(raw) + 1e-9;
  const wholeStep = Number.isInteger(check.value) && Number.isInteger(value) && difference <= 1;
  return coarse || wholeStep;
}

function describeEasyDeviation(item: CalculationResultAssessment): string {
  const suffix = unitSuffix(item.unit);
  const expected = `${formatNumber(item.expected)}${suffix}`;
  const got = item.learnerValue === null ? 'no readable number' : `${formatNumber(item.learnerValue)}${suffix}`;
  if (item.status === 'blank') return `${item.label}: no number was entered.`;
  if ((item.status === 'close' || item.status === 'entered') && item.relativeError !== null) return `${item.label}: ${got} is ${formatPercent(item.relativeError)} away from the worked answer of ${expected}.`;
  if (item.status === 'carried') return `${item.label}: ${got} differs from the worked answer of ${expected}, but it is correctly built on your own earlier number, so most marks are kept.`;
  if (item.status === 'method') return `${item.label}: ${got} differs from the worked answer of ${expected}; the formula starts from the case numbers, so part of the marks are kept.`;
  if (item.status === 'entered') return `${item.label}: ${got} differs from the worked answer of ${expected}.`;
  return `${item.label}: ${item.note}`;
}

function easyZeroOutcome(input: CalculationScoringInput, evidence: string, blank: boolean): CalculationScoreOutcome {
  const first = input.checks[0]?.label || 'the first requested result';
  const reasons = blank
    ? [
      'No formula was submitted, so the model could not be checked.',
      'No result was entered, so there is nothing to compare with the worked answer.',
      'No final answer was entered, so units and rounding could not be checked.',
      'No working was submitted, so there are no steps to trace.',
    ]
    : [
      'The formula does not start from any number given in the case brief.',
      'None of the case figures appear in the answer, so no result can be matched to the worked answer.',
      'Units and rounding cannot be checked because the answer is not built on the case figures.',
      'The steps shown cannot be tied back to the case brief.',
    ];
  const criteria = [
    criterion('model_formula', 'Model and formula', EASY_CALCULATION_WEIGHTS.model_formula, 0, evidence, reasons[0], 'Write the formula and start from the numbers given in the case.'),
    criterion('arithmetic_sequence', 'Arithmetic and sequence', EASY_CALCULATION_WEIGHTS.arithmetic_sequence, 0, evidence, reasons[1], `Calculate ${first} first, using the figures in the case brief.`),
    criterion('units_boundaries', 'Units and boundaries', EASY_CALCULATION_WEIGHTS.units_boundaries, 0, evidence, reasons[2], input.roundingRule || 'State the unit and rounding the case asks for.'),
    criterion('traceability', 'Traceability', EASY_CALCULATION_WEIGHTS.traceability, 0, evidence, reasons[3], 'Show each intermediate step so the first slip can be found.'),
  ];
  return {
    overallScore: 0,
    criteria,
    results: input.checks.map((check) => ({
      label: check.label, unit: check.unit, expected: check.value, learnerValue: null, relativeError: null, credit: 0, status: 'blank' as const, note: 'Not marked.',
    })),
    usesCaseNumbers: false,
    hasLogic: false,
    blank,
    floorApplied: false,
    summary: blank ? 'Nothing was submitted, so there is nothing to mark.' : 'None of the numbers from the case brief appear in your answer, so it scores 0.',
    firstDivergence: blank ? `Start with ${first}.` : `Start from the figures in the case brief, then build ${first}.`,
  };
}

/**
 * Easy profile. The case already supplies the data and the interpretation, so assumptions are never
 * requested or marked: four criteria (25 / 37.5 / 25 / 12.5). Each mistake has exactly one owner:
 *  - a wrong number belongs to Arithmetic and sequence;
 *  - a unit, scale or rounding slip belongs to Units and boundaries, and Arithmetic keeps full credit
 *    for a value whose digits are right;
 *  - a missing or incomplete formula belongs to Model and formula / Traceability, never to the number.
 */
function scoreEasyCalculationAttempt(input: CalculationScoringInput): CalculationScoreOutcome {
  const { checks } = input;
  const attempt: CalculationAttempt = { ...input.attempt, caveat: '' };
  const easyInput: CalculationScoringInput = { ...input, attempt };
  const hasFinal = attempt.results.some((result) => numberFromText(result.value) !== null);
  const hasRow = attempt.rows.some((row) => row.inputs.some((slot) => numberFromText(slot) !== null));
  if (!hasFinal && !hasRow) return easyZeroOutcome(easyInput, 'No answer was submitted.', true);
  const usesCaseNumbers = attemptUsesCaseNumbers(attempt, input.caseText, checks);
  if (!usesCaseNumbers) {
    return easyZeroOutcome(
      easyInput,
      `Your answer: ${[attempt.results.map((result) => result.value.trim()).filter(Boolean).join(', '), rowsSummary(attempt.rows)].filter(Boolean).join(' | ').slice(0, 300) || 'only text'}`,
      false,
    );
  }

  // A wrong unit is judged under Units and boundaries, so the bare number is what Arithmetic marks.
  const unitProblems = new Set<number>();
  const adjustedResults = attempt.results.map((result, index) => {
    const check = checks[index];
    const raw = String(result?.value || '').trim();
    if (!check || !raw) return result;
    const parsed = parseNumericQuantity(raw, check.unit);
    if (parsed.ok || (parsed.error !== 'unit-mismatch' && parsed.error !== 'invalid-unit')) return result;
    const token = numberFromText(raw);
    if (!token) return result;
    unitProblems.add(index);
    return { ...result, value: String(token.value) };
  });
  const assessments = assessResults({ ...easyInput, attempt: { ...attempt, results: adjustedResults } });

  const reviews = checks.map((check, index): EasyResultReview => {
    const raw = String(attempt.results[index]?.value || '').trim();
    const assessment: CalculationResultAssessment = { ...assessments[index] };
    if (!raw || numberFromText(raw) === null) return { assessment, unitsCredit: null, unitsNote: '' };
    const parsed = gradeNumericQuantity(raw, check.value, check.unit, strictTolerance(check));
    if (unitProblems.has(index)) {
      if (assessment.status === 'exact') assessment.note = 'The number matches the worked answer; the unit written with it is marked under Units and boundaries.';
      return { assessment, unitsCredit: EASY_UNIT_SLIP_UNITS_CREDIT, unitsNote: `${check.label}: ${parsed.message || 'the unit is not the one the case asks for.'}` };
    }
    if (!parsed.ok || parsed.value === null) return { assessment, unitsCredit: null, unitsNote: '' };
    const value = parsed.value;
    const suffix = unitSuffix(check.unit);
    if (Math.abs(value - check.value) <= strictTolerance(check) + 1e-9) return { assessment, unitsCredit: 1, unitsNote: '' };
    if (isScaleSlip(check, value)) {
      assessment.credit = 1;
      assessment.status = 'unit';
      assessment.note = 'The digits match the worked answer; how the value is scaled or labelled is marked under Units and boundaries.';
      return {
        assessment,
        unitsCredit: EASY_UNIT_SLIP_UNITS_CREDIT,
        unitsNote: `${check.label}: you wrote ${raw}, but the answer must be given in${suffix || ' the requested unit'} (worked answer: ${formatNumber(check.value)}${suffix}).`,
      };
    }
    if (isRoundingOnly(check, value, raw)) {
      assessment.credit = 1;
      assessment.status = 'rounding';
      assessment.note = 'Matches the worked answer apart from rounding, which is marked under Units and boundaries.';
      return {
        assessment,
        unitsCredit: EASY_ROUNDING_UNITS_CREDIT,
        unitsNote: `${check.label}: you gave ${formatNumber(value)}${suffix} and the worked answer is ${formatNumber(check.value)}${suffix}; round the way the case asks.`,
      };
    }
    return { assessment, unitsCredit: 1, unitsNote: '' };
  });
  const results = reviews.map((review) => review.assessment);

  const count = Math.max(1, checks.length);
  const arithmetic = (results.reduce((sum, item) => sum + item.credit, 0) / count) * 10;
  const completeRows = attempt.rows.filter(rowIsComplete);
  const caseNumbers = caseInputNumbers(input.caseText);

  const modelPerResult = checks.map((_, index): number => {
    const rows = rowsFor(attempt, index);
    const complete = rows.filter(rowIsComplete);
    if (complete.length) {
      const grounded = complete.some((row) => rowUsesAnyOf(row, caseNumbers, CASE_MATCH_SCALES) || results.slice(0, index).some((item) => item.credit > 0));
      return grounded ? 1 : 0.6;
    }
    if (rows.some((row) => row.inputs.some((slot) => numberFromText(slot) !== null))) return 0.45;
    // No formula shown: a correct answer earns part of the model credit, so the omission is not charged in full twice (Traceability also marks it).
    if (!numberFromText(attempt.results[index]?.value || '')) return 0;
    return (results[index]?.credit ?? 0) >= 0.95 ? 0.7 : 0.25;
  });
  const modelScore = (modelPerResult.reduce((sum, value) => sum + value, 0) / count) * 10;

  const traceabilityPerResult = checks.map((_, index): number => {
    const rows = rowsFor(attempt, index);
    if (rows.some(rowIsComplete)) return 1;
    return rows.some((row) => row.inputs.some((slot) => numberFromText(slot) !== null)) ? 0.45 : 0;
  });
  const traceabilityScore = (traceabilityPerResult.reduce((sum, value) => sum + value, 0) / count) * 10;

  const assessedUnits = reviews.filter((review) => review.unitsCredit !== null);
  const unitsScore = assessedUnits.length
    ? (assessedUnits.reduce((sum, review) => sum + (review.unitsCredit as number), 0) / assessedUnits.length) * 10
    : 0;

  const hasLogic = completeRows.length > 0 || results.some((item) => item.credit >= 0.8);
  const floor = CALCULATION_SCORE_FLOOR_RATIO * 10;
  let floorApplied = false;
  const lift = (score: number) => {
    if (hasLogic && score < floor) {
      floorApplied = true;
      return floor;
    }
    return score;
  };

  const citedRows = rowsSummary(attempt.rows);
  const finalText = attempt.results.map((result) => `${result.value.trim() || '[empty]'}${result.unit ? ` ${result.unit}` : ''}`).join('; ').slice(0, 220);
  const matchedLabels = results.filter((item) => ['exact', 'close', 'rounding', 'unit'].includes(item.status)).map((item) => item.label);

  const groundedCount = modelPerResult.filter((value) => value === 1).length;
  const ungroundedCount = modelPerResult.filter((value) => value === 0.6).length;
  const answerOnlyCount = modelPerResult.filter((value) => value === 0.7).length;
  const ungroundedNote = ungroundedCount ? ' One or more formulas do not start from any number in the case.' : '';
  const answerOnlyNote = answerOnlyCount ? ' Where no formula is shown, a correct answer earns only part of the model credit.' : '';
  const missingFormulaNote = count - groundedCount - ungroundedCount - answerOnlyCount > 0 ? ' The remaining results have no complete formula.' : '';
  const modelReason = groundedCount === count
    ? 'Each result has a complete formula that starts from the case numbers.'
    : groundedCount === 0 && ungroundedCount === 0 && answerOnlyCount === 0
      ? 'No usable formula was submitted, so the model could not be confirmed.'
      : `${groundedCount} of ${count} results have a complete formula built from the case numbers.${ungroundedNote}${answerOnlyNote}${missingFormulaNote}`;

  const tracedCount = traceabilityPerResult.filter((value) => value === 1).length;
  const traceReason = tracedCount === count
    ? 'Every result has a complete formula row, so each step can be followed.'
    : tracedCount === 0
      ? 'There is no complete formula row to follow, so the steps cannot be traced.'
      : `Complete formula rows are shown for ${tracedCount} of ${count} results; the others cannot be traced step by step.`;

  const deviations = results.filter((item) => item.credit < 1 - 1e-9).map(describeEasyDeviation);
  const ownershipNote = results.some((item) => item.status === 'rounding' || item.status === 'unit')
    ? ' Rounding and unit differences are marked once, under Units and boundaries.'
    : '';
  const arithmeticReason = (deviations.length
    ? `Marks are lost on ${deviations.length} of ${count} results. ${deviations.slice(0, 2).join(' ')}`
    : ownershipNote ? 'Every result has the right value.' : 'Every result matches the worked answer.') + ownershipNote;

  const unitIssues = reviews.map((review) => review.unitsNote).filter(Boolean);
  const unitsReason = !assessedUnits.length
    ? (hasFinal ? 'No final answer could be read as a single number, so units and rounding could not be checked.' : 'No final answer was entered, so units and rounding could not be checked.')
    : unitIssues.length
      ? `Marks are lost on ${unitIssues.length} of ${assessedUnits.length} answers. ${unitIssues.slice(0, 2).join(' ')}`
      : 'Every answer is in the requested unit and at the requested precision.';

  const firstLoss = results.find((item) => item.credit < 1 - 1e-9);
  const firstSlip = reviews.find((review) => review.unitsCredit !== null && review.unitsCredit < 1);
  const unitsFix = !firstSlip
    ? ''
    : firstSlip.assessment.status === 'rounding'
      ? (input.roundingRule || 'Round to the precision the case asks for.')
      : `Enter ${firstSlip.assessment.label} in ${firstSlip.assessment.unit || 'the unit the case asks for'}, without a different unit or scale.`;
  const perfect = (score: number) => score >= EASY_PERFECT_SCORE;
  const W = EASY_CALCULATION_WEIGHTS;
  const criteria = [
    criterion(
      'model_formula', 'Model and formula', W.model_formula, lift(modelScore), citedRows, modelReason,
      perfect(modelScore) ? 'Keep building each formula from the case numbers.' : 'Build one labelled formula under each result, starting from the numbers in the brief.',
    ),
    criterion(
      'arithmetic_sequence', 'Arithmetic and sequence', W.arithmetic_sequence, lift(arithmetic),
      matchedLabels.length ? `${citedRows} Right value: ${matchedLabels.join(', ')}.` : citedRows,
      arithmeticReason,
      perfect(arithmetic) || !firstLoss ? 'Keep the same order of steps.' : `Recheck ${firstLoss.label}: the worked answer gives ${formatNumber(firstLoss.expected)}${unitSuffix(firstLoss.unit)}.`,
    ),
    criterion(
      'units_boundaries', 'Units and boundaries', W.units_boundaries, lift(unitsScore), `Final numerical answers: ${finalText || 'none'}`, unitsReason,
      perfect(unitsScore) ? 'Keep stating the unit and precision with each answer.' : unitsFix || input.roundingRule || 'Give every answer in the unit and rounding the case states.',
    ),
    criterion(
      'traceability', 'Traceability', W.traceability, lift(traceabilityScore), citedRows, traceReason,
      perfect(traceabilityScore) ? 'Keep one labelled formula under every result.' : 'Show one complete formula for every result.',
    ),
  ];
  const weighted = criteria.reduce((sum, item) => sum + item.score * item.weight, 0);
  const overallScore = roundTo(weighted / 100, 1);

  const countStatus = (statuses: CalculationResultStatus[]) => results.filter((item) => statuses.includes(item.status)).length;
  const slipCount = reviews.filter((review) => review.unitsCredit !== null && review.unitsCredit < 1).length;
  const summaryParts = [`${countStatus(['exact', 'rounding', 'unit'])} match the worked answer`];
  if (countStatus(['close'])) summaryParts.push(`${countStatus(['close'])} within ${formatPercent(CALCULATION_CLOSE_TOLERANCE)}`);
  if (countStatus(['carried'])) summaryParts.push(`${countStatus(['carried'])} built correctly on your own earlier number`);
  if (slipCount) summaryParts.push(`${slipCount} need a unit or rounding fix`);
  const summary = `Of ${checks.length} result${checks.length === 1 ? '' : 's'}: ${summaryParts.join(', ')}.${floorApplied ? ' You used the case numbers and showed working, so no criterion is marked below 4/10.' : ''}`;

  const firstOff = results.find((item) => !['exact', 'close', 'rounding', 'unit'].includes(item.status));
  let firstDivergence = slipCount
    ? 'No numeric divergence was found; the remaining marks are about units or rounding.'
    : 'No divergence was found.';
  if (firstOff) {
    const got = firstOff.learnerValue === null ? 'did not give a number' : `got ${formatNumber(firstOff.learnerValue)}`;
    firstDivergence = `${firstOff.label}: you ${got}, the worked answer gives ${formatNumber(firstOff.expected)} ${firstOff.unit}. Check the step that produces this result first.`;
  }

  return { overallScore, criteria, results, usesCaseNumbers, hasLogic, blank: false, floorApplied, summary, firstDivergence };
}

export function scoreCalculationAttempt(input: CalculationScoringInput): CalculationScoreOutcome {
  if (input.profile === 'easy') return scoreEasyCalculationAttempt(input);
  const { attempt, checks } = input;
  const hasFinal = attempt.results.some((result) => numberFromText(result.value) !== null);
  const hasRow = attempt.rows.some((row) => row.inputs.some((slot) => numberFromText(slot) !== null));
  const hasCaveat = Boolean(attempt.caveat.trim());
  if (!hasFinal && !hasRow && !hasCaveat) {
    return zeroOutcome(input, 'No answer was submitted, so there is nothing to assess.', 'No answer was submitted.', true);
  }
  const usesCaseNumbers = attemptUsesCaseNumbers(attempt, input.caseText, checks);
  if (!usesCaseNumbers) {
    return zeroOutcome(
      input,
      'None of the numbers given in the case brief appear in your answer, so none of it can be tied to the case.',
      `Your answer: ${[attempt.results.map((result) => result.value.trim()).filter(Boolean).join(', '), rowsSummary(attempt.rows)].filter(Boolean).join(' | ').slice(0, 300) || 'only text'}`,
      false,
    );
  }

  const assessments = assessResults(input);
  const count = Math.max(1, checks.length);
  const arithmetic = (assessments.reduce((sum, item) => sum + item.credit, 0) / count) * 10;
  const completeRows = attempt.rows.filter(rowIsComplete);
  const caseNumbers = caseInputNumbers(input.caseText);

  const modelPerResult = checks.map((_, index): number => {
    const rows = rowsFor(attempt, index);
    const complete = rows.filter(rowIsComplete);
    if (complete.length) {
      const grounded = complete.some((row) => rowUsesAnyOf(row, caseNumbers, CASE_MATCH_SCALES) || assessments.slice(0, index).some((item) => item.credit > 0));
      return grounded ? 1 : 0.6;
    }
    if (rows.some((row) => row.inputs.some((slot) => numberFromText(slot) !== null))) return 0.45;
    return numberFromText(attempt.results[index]?.value || '') ? 0.25 : 0;
  });
  const modelScore = (modelPerResult.reduce((sum, value) => sum + value, 0) / count) * 10;

  const traceabilityPerResult = checks.map((_, index): number => {
    const rows = rowsFor(attempt, index);
    if (rows.some(rowIsComplete)) return 1;
    return rows.some((row) => row.inputs.some((slot) => numberFromText(slot) !== null)) ? 0.45 : 0;
  });
  const traceabilityScore = (traceabilityPerResult.reduce((sum, value) => sum + value, 0) / count) * 10;

  const unitsPerResult = checks.map((check, index) => {
    const raw = attempt.results[index]?.value || '';
    if (!numberFromText(raw)) return 0;
    const match = matchLearnerValue(raw, check);
    if (!match || match.invalid) return 0;
    if (match.scaled) return 0.5;
    return 0.6 + 0.4 * assessments[index].credit;
  });
  const unitsScore = (unitsPerResult.reduce((sum, value) => sum + value, 0) / count) * 10;

  const interpretationScore = Math.min(10, wordCount(attempt.caveat) * 0.8);

  const hasLogic = completeRows.length > 0
    || (hasFinal && wordCount(attempt.caveat) >= 5)
    || assessments.some((item) => item.credit >= 0.8);

  const floor = CALCULATION_SCORE_FLOOR_RATIO * 10;
  const lift = (score: number) => (hasLogic && score < floor ? floor : score);
  const lifted = (score: number) => hasLogic && score < floor;
  const floorNote = ' Marked at the minimum because you used the case numbers and showed some working.';

  const matchedLabels = assessments.filter((item) => item.status === 'exact' || item.status === 'close').map((item) => item.label);
  const citedRows = rowsSummary(attempt.rows);
  const firstOff = assessments.find((item) => item.status !== 'exact' && item.status !== 'close');
  const finalText = attempt.results.map((result) => `${result.value.trim() || '[empty]'}${result.unit ? ` ${result.unit}` : ''}`).join('; ').slice(0, 220);

  const strongCount = assessments.filter((item) => item.credit >= 0.8).length;
  const offNote = firstOff ? firstOff.label + ': ' + firstOff.note : 'Every result is within tolerance.';

  const criteria = [
    criterion(
      'model_formula', 'Model and formula', 20, lift(modelScore), citedRows,
      (modelScore >= 8 ? 'The formula setup is explicit and starts from the case numbers.' : completeRows.length ? 'Some results have a formula, others do not.' : 'No complete formula row was submitted, so method credit is limited even where a number is right.') + (lifted(modelScore) ? floorNote : ''),
      'Build one labelled formula under each result, starting from the numbers in the brief.',
    ),
    criterion(
      'arithmetic_sequence', 'Arithmetic and sequence', 30, lift(arithmetic),
      matchedLabels.length ? `${citedRows} Matched or very close: ${matchedLabels.join(', ')}.` : citedRows,
      `${strongCount} of ${checks.length} results kept at least 80% of their marks. ${offNote}` + (lifted(arithmetic) ? floorNote : ''),
      firstOff ? 'Recheck ' + firstOff.label + ': the worked answer gives ' + formatNumber(firstOff.expected) + ' ' + firstOff.unit + '.' : 'Keep the same order of steps.',
    ),
    criterion(
      'units_boundaries', 'Units and boundaries', 20, lift(unitsScore), `Final numerical answers: ${finalText || 'none'}`,
      (unitsScore >= 8 ? 'Each answer is in the unit the case asks for.' : 'One or more answers are missing or not in the requested unit.') + (lifted(unitsScore) ? floorNote : ''),
      input.roundingRule || 'Give every answer in the unit and rounding the case states.',
    ),
    criterion(
      'commercial_interpretation', 'Commercial interpretation', 20, lift(interpretationScore),
      `Key caveat or assumption: “${attempt.caveat.trim().slice(0, 180) || 'Not provided.'}”`,
      (interpretationScore >= 8 ? 'The assumption or limit that governs the decision is clear.' : 'The decision-relevant caveat or assumption is short or missing.') + (lifted(interpretationScore) ? floorNote : ''),
      input.decisionAndLimit || 'State what you would recommend and the assumption it rests on.',
    ),
    criterion(
      'traceability', 'Traceability', 10, lift(traceabilityScore), citedRows,
      (traceabilityScore >= 8 ? 'The formula rows make the sequence easy to follow.' : 'Some steps cannot be traced because a formula row is missing or incomplete.') + (lifted(traceabilityScore) ? floorNote : ''),
      'Show one complete formula for every result.',
    ),
  ];
  const weighted = criteria.reduce((sum, item) => sum + item.score * item.weight, 0);
  const overallScore = roundTo(weighted / 100, 1);
  const floorApplied = criteria.some((item) => item.reason.endsWith(floorNote));

  const exactCount = assessments.filter((item) => item.status === 'exact').length;
  const closeCount = assessments.filter((item) => item.status === 'close').length;
  const carriedCount = assessments.filter((item) => item.status === 'carried').length;
  const summaryParts = [exactCount + ' match the worked answer'];
  if (closeCount) summaryParts.push(closeCount + ' within ' + formatPercent(CALCULATION_CLOSE_TOLERANCE));
  if (carriedCount) summaryParts.push(carriedCount + ' built correctly on your own earlier number');
  const summary = 'Of ' + checks.length + ' results: ' + summaryParts.join(', ') + '.';
  let firstDivergence = 'No numeric divergence was found; the remaining marks are about units, working and the written assumption.';
  if (firstOff) {
    const got = firstOff.learnerValue === null ? 'did not give a number' : 'got ' + formatNumber(firstOff.learnerValue);
    firstDivergence = firstOff.label + ': you ' + got + ', the worked answer gives ' + formatNumber(firstOff.expected) + ' ' + firstOff.unit + '. Check the step that produces this result first.';
  }

  return { overallScore, criteria, results: assessments, usesCaseNumbers, hasLogic, blank: false, floorApplied, summary, firstDivergence };
}

/** Rebuild an attempt from the serialized answer saved by serializeCalculationAnswer. */
export function attemptFromSerializedAnswer(serialized: string): CalculationAttempt {
  const lines = String(serialized || '').split('\n');
  const finalHeader = lines.findIndex((line) => line.trim() === 'FINAL NUMERICAL ANSWERS');
  const formulaHeader = lines.findIndex((line) => /^(FORMULAS BY RESULT|STRUCTURED FORMULA ROWS)$/.test(line.trim()));
  const results: CalculationAttemptResult[] = [];
  const rows: CalculationAttemptRow[] = [];
  let caveat = '';
  if (finalHeader < 0) return { results, rows, caveat };
  const finalEnd = formulaHeader >= 0 ? formulaHeader : lines.length;
  lines.slice(finalHeader + 1, finalEnd).forEach((line) => {
    const match = line.match(/^\s*(\d+)\.\s+(.+?):\s*(.*)$/);
    if (!match) return;
    const value = match[3].trim();
    results[Number(match[1]) - 1] = { value: value === '[empty]' ? '' : value.replace(/\s*\[empty\]\s*$/, '') };
  });
  if (formulaHeader >= 0) {
    lines.slice(formulaHeader + 1).forEach((line) => {
      const caveatMatch = line.match(/^KEY CAVEAT OR ASSUMPTION:\s*(.*)$/);
      if (caveatMatch) {
        caveat = caveatMatch[1].trim() === '[not provided]' ? '' : caveatMatch[1].trim();
        return;
      }
      const current = line.match(/^\s*(\d+)\.\s+\[([^\]]+)\]\s+(.+?):\s*(.*)$/);
      const legacy = line.match(/^\s*Row\s+(\d+):\s*(.*)$/i);
      const index = current ? Number(current[1]) - 1 : legacy ? Number(legacy[1]) - 1 : -1;
      const expression = current ? current[4] : legacy ? legacy[2] : '';
      if (index < 0 || !expression.trim()) return;
      const splitAt = expression.lastIndexOf(' = ');
      const left = splitAt >= 0 ? expression.slice(0, splitAt) : expression;
      const right = splitAt >= 0 ? expression.slice(splitAt + 3) : '';
      const incomplete = /\[blank\]|\[incomplete\]/.test(expression);
      const inputs = extractNumberTokens(left.replace(/\([^()]*[A-Za-z][^()]*\)/g, ' ')).map((token) => String(token.value));
      const resultToken = incomplete ? null : numberFromText(right);
      rows.push({
        resultIndex: index,
        inputs: incomplete ? inputs.concat(/\[blank\]/.test(left) ? ['[blank]'] : []) : inputs,
        result: resultToken ? resultToken.value : null,
        text: expression.trim(),
      });
    });
  }
  for (let index = 0; index < results.length; index += 1) {
    if (!results[index]) results[index] = { value: '' };
  }
  return { results, rows, caveat };
}

/** Read the number after the last "=" in a worked formula such as "(1.06 × 0.97 − 1) × 100 = 2.8%". */
export function expectedValueFromFormula(formula: string): number | null {
  const text = String(formula || '');
  const afterEquals = text.includes('=') ? text.slice(text.lastIndexOf('=') + 1) : text;
  const token = numberFromText(afterEquals);
  return token ? token.value * (token.explicitSuffix && !token.percent ? token.multiplier : 1) : null;
}
