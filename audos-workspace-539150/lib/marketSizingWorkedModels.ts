import type { LibraryQuestion } from './skillQuestionLibrary';
import type { WorkedAnswerModel } from './caseResultModel';
import { MARKET_SIZING_BANK_CASES, marketSizingBankSourceId } from './marketSizingBank';
import { MARKET_SIZING_CYCLE_3_CASES } from './marketSizingCycle3';
import type { MsModelSpec, MsOperator, MsTerm } from './marketSizingWorkedTypes';
import { MARKET_SIZING_CYCLE_3_WORKED_SPECS } from './marketSizingWorkedCycle3';
import { MARKET_SIZING_BANK_WORKED_SPECS } from './marketSizingWorkedBank';

export type { MsModelSpec } from './marketSizingWorkedTypes';

export const MARKET_SIZING_WORKED_SPECS: MsModelSpec[] = [...MARKET_SIZING_CYCLE_3_WORKED_SPECS, ...MARKET_SIZING_BANK_WORKED_SPECS];

/**
 * Structured post-submission worked answers for every Market Sizing question in
 * Case Drill and every CM-MS case in Case Pool. Each model lists every factor
 * with a value, unit, rationale and source label, and the engine below derives
 * every step, the final estimate and the sensitivity range from those factors,
 * so the shown arithmetic cannot drift from the factor table. The same model
 * feeds the grader reference text on both surfaces.
 */

export type MsSource = 'given' | 'assumption';

export const MS_SOURCE_LABELS: Record<MsSource, string> = {
  given: 'Given by the case',
  assumption: 'Model assumption',
};

export interface MsComputedFactor {
  key: string;
  label: string;
  value: number;
  unit: string;
  percent: boolean;
  source: MsSource;
  rationale: string;
  display: string;
  keywords: string[];
  exclude: string[];
}

export interface MsComputedStep {
  key: string;
  label: string;
  unit: string;
  value: number;
  display: string;
  expression: string;
  isFinal: boolean;
  /** Every factor this step depends on, directly or through earlier steps. */
  factorKeys: string[];
}

export interface MsComputedSensitivity {
  factorLabel: string;
  lowDisplay: string;
  highDisplay: string;
  baseDisplay: string;
  rangeLow: number;
  rangeHigh: number;
  rangeLowDisplay: string;
  rangeHighDisplay: string;
  /** Names the driver and its tested range, without restating the result range. */
  driverText: string;
  text: string;
}

export interface MarketSizingWorkedModel {
  id: string;
  format: 'provided-data' | 'ambiguous-estimation';
  definition: MsModelSpec['definition'];
  formula: string;
  segments: string[];
  factors: MsComputedFactor[];
  steps: MsComputedStep[];
  final: MsComputedStep;
  /** Unit-conversion constants used in the steps (for example 12 months or 365 days). */
  constants: number[];
  /** The final estimate restated in the question's requested scale, when it differs from base units. */
  finalInRequestedUnit: string;
  sanity: string[];
  sensitivity: MsComputedSensitivity | null;
  commonMistake: string;
  alternatives: string[];
  /** Internal content-repair flag: when set, no figures are shown to the learner. */
  contentRepair: string;
}

/* ------------------------------------------------------------------ number display */

function groupWhole(whole: string): string {
  return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function trimFixed(value: number, decimals: number): string {
  const negative = value < 0;
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole, frac = ''] = fixed.split('.');
  const cleanFrac = frac.replace(/0+$/, '');
  return `${negative ? '-' : ''}${groupWhole(whole)}${cleanFrac ? `.${cleanFrac}` : ''}`;
}

/** Up to four exact decimals; a longer fraction is shown as ≈ five significant digits. */
export function displayNumber(value: number): string {
  if (!Number.isFinite(value)) return '-';
  const scaled = value * 1e4;
  if (Math.abs(scaled - Math.round(scaled)) <= Math.max(1e-6, Math.abs(scaled) * 1e-12)) return trimFixed(value, 4);
  const intDigits = Math.max(1, Math.floor(Math.log10(Math.max(1, Math.abs(value)))) + 1);
  return `≈${trimFixed(value, Math.max(0, 5 - intDigits))}`;
}

const SCALES: Array<[number, string]> = [[1e12, 'trillion'], [1e9, 'billion'], [1e6, 'million']];

function scaled(value: number, minScale = 1e6): string {
  const abs = Math.abs(value);
  const scale = SCALES.find(([size]) => abs >= size && size >= minScale);
  if (!scale) return displayNumber(value);
  return `${displayNumber(value / scale[0])} ${scale[1]}`;
}

/** "1.704 trillion VND/year", "800,000 households", "20%". */
export function formatQuantity(value: number, unit: string, percent = false): string {
  if (percent) return `${displayNumber(value * 100)}%`;
  const money = unit.match(/^(VND|USD)\b(.*)$/);
  if (money) return `${scaled(value)} ${money[1]}${money[2]}`.trim();
  const whole = Math.abs(value - Math.round(value)) <= Math.max(1e-9, Math.abs(value) * 1e-12);
  const amount = Math.abs(value) >= 1e6 && !(whole && Math.abs(value) < 1e11) ? scaled(value) : displayNumber(value);
  return unit ? `${amount} ${unit}` : amount;
}

/* ------------------------------------------------------------------ engine */

type ValueMap = Map<string, { value: number; unit: string; percent: boolean }>;

function evaluateSteps(spec: MsModelSpec, overrides: Record<string, number> = {}): { values: ValueMap; steps: MsComputedStep[] } {
  const values: ValueMap = new Map();
  const deps = new Map<string, string[]>();
  spec.factors.forEach((factor) => {
    deps.set(factor.k, [factor.k]);
    values.set(factor.k, { value: overrides[factor.k] ?? factor.v, unit: factor.unit, percent: Boolean(factor.pct) });
  });
  const termValue = (term: MsTerm): { value: number; text: string } => {
    if (typeof term === 'string') {
      const found = values.get(term);
      if (!found) throw new Error(`${spec.id}: unknown reference ${term}`);
      return { value: found.value, text: formatQuantity(found.value, found.unit, found.percent) };
    }
    return { value: term.c, text: term.label };
  };
  const steps: MsComputedStep[] = spec.steps.map((step, index) => {
    const [first, ...rest] = step.expr;
    const factorKeys = new Set<string>();
    [first, ...(rest as Array<[MsOperator, MsTerm]>).map(([, term]) => term)].forEach((term) => {
      if (typeof term === 'string') (deps.get(term) || []).forEach((key) => factorKeys.add(key));
    });
    deps.set(step.k, [...factorKeys]);
    const head = termValue(first as MsTerm);
    let value = head.value;
    let expression = head.text;
    (rest as Array<[MsOperator, MsTerm]>).forEach(([op, term]) => {
      const next = termValue(term);
      if (op === '×') value *= next.value;
      else if (op === '÷') value /= next.value;
      else if (op === '+') value += next.value;
      else if (op === '−') value -= next.value;
      else value = Math.min(value, next.value);
      expression = op === 'min' ? `the smaller of ${expression} and ${next.text}` : `${expression} ${op} ${next.text}`;
    });
    if (!Number.isFinite(value)) throw new Error(`${spec.id}: step ${step.k} is not finite`);
    const percent = step.unit === '%';
    values.set(step.k, { value, unit: percent ? '' : step.unit, percent });
    return {
      key: step.k,
      label: step.label,
      unit: step.unit,
      value,
      display: formatQuantity(value, percent ? '' : step.unit, percent),
      expression,
      isFinal: index === spec.steps.length - 1,
      factorKeys: [...factorKeys],
    };
  });
  return { values, steps };
}

function fillSanity(spec: MsModelSpec, values: ValueMap): string[] {
  return (spec.sanity || []).map((item) => {
    if (typeof item === 'string') return item;
    return item.calc.reduce((text, calc, index) => {
      const a = values.get(calc.a);
      const b = values.get(calc.b);
      if (!a || !b) throw new Error(`${spec.id}: sanity reference missing`);
      const ratio = a.value / b.value;
      const shown = calc.as === 'pct' ? `${displayNumber(Math.round(ratio * 1000) / 10)}%` : formatQuantity(ratio, calc.unit || '');
      return text.replace(`{${index}}`, shown);
    }, item.text);
  });
}

/** Common mistakes and accepted alternatives stay in the source case records; they are reused, not copied. */
function sourceNotes(id: string): { mistake: string; alternatives: string[] } | null {
  const bank = MARKET_SIZING_BANK_CASES.find((item) => marketSizingBankSourceId(item.code) === id);
  if (bank) return { mistake: bank.howToAssess, alternatives: [bank.scoringExample] };
  const cycle = MARKET_SIZING_CYCLE_3_CASES.find((item) => item.sourceCaseId === id);
  if (cycle) return { mistake: cycle.weakAnswerFeedback, alternatives: cycle.alternatives };
  return null;
}

export function computeMarketSizingModel(spec: MsModelSpec, requestedUnit = ''): MarketSizingWorkedModel {
  const { values, steps } = evaluateSteps(spec);
  const final = steps[steps.length - 1];
  let sensitivity: MsComputedSensitivity | null = null;
  if (spec.sens) {
    const factor = spec.factors.find((item) => item.k === spec.sens!.k);
    if (!factor) throw new Error(`${spec.id}: unknown sensitivity factor`);
    const lowFinal = evaluateSteps(spec, { [factor.k]: spec.sens.low }).steps.slice(-1)[0].value;
    const highFinal = evaluateSteps(spec, { [factor.k]: spec.sens.high }).steps.slice(-1)[0].value;
    const rangeLow = Math.min(lowFinal, highFinal);
    const rangeHigh = Math.max(lowFinal, highFinal);
    const lowDisplay = formatQuantity(spec.sens.low, factor.unit, factor.pct);
    const highDisplay = formatQuantity(spec.sens.high, factor.unit, factor.pct);
    const baseDisplay = formatQuantity(factor.v, factor.unit, factor.pct);
    const rangeLowDisplay = formatQuantity(rangeLow, final.unit);
    const rangeHighDisplay = formatQuantity(rangeHigh, final.unit);
    sensitivity = {
      factorLabel: factor.label,
      lowDisplay,
      highDisplay,
      baseDisplay,
      rangeLow,
      rangeHigh,
      rangeLowDisplay,
      rangeHighDisplay,
      driverText: `${factor.label} is the least certain assumption; this range tests it from ${lowDisplay} to ${highDisplay} (base ${baseDisplay}).${spec.sens.note ? ` ${spec.sens.note}` : ''}`,
      text: `${factor.label} is the least certain assumption. Moving it from ${lowDisplay} to ${highDisplay} (base ${baseDisplay}) moves the estimate between ${rangeLowDisplay} and ${rangeHighDisplay}.${spec.sens.note ? ` ${spec.sens.note}` : ''}`,
    };
  }
  const requested = requestedFinal(final.value, final.unit, requestedUnit);
  return {
    id: spec.id,
    format: spec.format,
    definition: spec.definition,
    formula: spec.formula,
    segments: spec.segments || [],
    factors: spec.factors.map((factor) => ({
      key: factor.k,
      label: factor.label,
      value: factor.v,
      unit: factor.unit,
      percent: Boolean(factor.pct),
      source: factor.src,
      rationale: factor.why,
      display: formatQuantity(factor.v, factor.unit, factor.pct),
      keywords: factor.kw,
      exclude: factor.not || [],
    })),
    steps,
    final,
    constants: [...new Set(spec.steps.flatMap((step) => step.expr.map((term) => (Array.isArray(term) ? term[1] : term)))
      .filter((term): term is { c: number; label: string } => typeof term === 'object' && term !== null && 'c' in term)
      .map((term) => term.c)
      .filter((value) => value !== 1))],
    finalInRequestedUnit: requested,
    sanity: fillSanity(spec, values),
    sensitivity,
    commonMistake: spec.mistake || sourceNotes(spec.id)?.mistake || '',
    alternatives: spec.alternatives || sourceNotes(spec.id)?.alternatives || [],
    contentRepair: spec.repair || '',
  };
}

function requestedFinal(value: number, unit: string, requestedUnit: string): string {
  const scale = /\bmillion\b/i.test(requestedUnit) ? [1e6, 'million'] as const
    : /\bbillion\b/i.test(requestedUnit) ? [1e9, 'billion'] as const
      : /\btrillion\b/i.test(requestedUnit) ? [1e12, 'trillion'] as const : null;
  const currency = unit.match(/^(VND|USD)\b/)?.[1];
  if (!scale || !currency) return '';
  return `${displayNumber(value / scale[0])} ${scale[1]} ${currency} per year`;
}

/* ------------------------------------------------------------------ lookup */

const SPEC_BY_ID = new Map(MARKET_SIZING_WORKED_SPECS.map((spec) => [spec.id, spec]));
const MODEL_CACHE = new Map<string, MarketSizingWorkedModel | null>();

/** Case Pool and the shared CM-MS / retained records: keyed by source case id. */
export function marketSizingWorkedModelForSource(sourceCaseId?: string | null, requestedUnit = ''): MarketSizingWorkedModel | null {
  const spec = sourceCaseId ? SPEC_BY_ID.get(sourceCaseId) : undefined;
  if (!spec) return null;
  const cacheKey = `${spec.id}|${requestedUnit}`;
  if (!MODEL_CACHE.has(cacheKey)) MODEL_CACHE.set(cacheKey, computeMarketSizingModel(spec, requestedUnit));
  return MODEL_CACHE.get(cacheKey) || null;
}

/* Legacy provided-data questions (market-sizing-001..100) state every input in the question itself. */

const LEGACY_ID = /^market-sizing-\d{3}$/;

function numberAfter(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (!match) return null;
  const value = Number(match[1].replace(/,/g, ''));
  return Number.isFinite(value) ? value : null;
}

export function legacyMarketSizingSpec(question: Pick<LibraryQuestion, 'id' | 'title' | 'question' | 'answerUnit' | 'numericAnswer' | 'numericTolerance'>): MsModelSpec | null {
  if (!LEGACY_ID.test(question.id)) return null;
  const text = String(question.question || '');
  const population = numberAfter(text, /population of\s+(\d[\d,]*(?:\.\d+)?)\s+million/i);
  const eligible = numberAfter(text, /eligible share of\s+(\d[\d,]*(?:\.\d+)?)%/i);
  const adoption = numberAfter(text, /adoption of\s+(\d[\d,]*(?:\.\d+)?)%/i);
  const frequency = numberAfter(text, /purchase frequency of\s+(\d[\d,]*(?:\.\d+)?)/i);
  const priceVndK = numberAfter(text, /price of\s+VND\s+(\d[\d,]*(?:\.\d+)?)\s+thousand/i);
  const priceUsd = numberAfter(text, /price of\s+USD\s+(\d[\d,]*(?:\.\d+)?)/i);
  if (population === null || eligible === null || adoption === null || frequency === null || (priceVndK === null && priceUsd === null)) return null;
  const isVnd = priceVndK !== null;
  const currency = isVnd ? 'VND' : 'USD';
  const scopeMatch = text.match(/Estimate the annual (.+?) market (in .+?|for the urban population worldwide)\. Use/i);
  const market = scopeMatch?.[1] || 'product';
  const geography = scopeMatch ? scopeMatch[2].replace(/^in\s+/i, '').replace(/^for the urban population worldwide$/i, 'Urban population worldwide') : String(question.title || '').replace(/\s+Market Size$/i, '');
  const urban = /urban population/i.test(text);
  const priceValue = isVnd ? (priceVndK as number) * 1000 : (priceUsd as number);
  const statedFinal = Number(question.numericAnswer);
  const finalBase = isVnd ? statedFinal : statedFinal * 1e6;
  return {
    id: question.id,
    format: 'provided-data',
    definition: {
      counts: `Annual consumer spending on ${market} by buyers in the stated population.`,
      excludes: 'Anything outside the stated population, eligible share and adoption.',
      geography,
      period: 'One year',
      measure: `Value (${currency} per year)`,
    },
    formula: `${urban ? 'Urban population' : 'Population'} × eligible share × adoption × purchases per buyer per year × average price`,
    factors: [
      { k: 'pop', label: urban ? 'Urban population' : 'Population', v: population * 1e6, unit: 'people', src: 'given', why: `Stated in the question as ${displayNumber(population)} million; written out in full here.`, kw: ['population', 'people', 'resident', 'inhabitant'] },
      { k: 'elig', label: 'Eligible share', v: eligible / 100, pct: true, unit: '', src: 'given', why: 'Stated in the question: the share of the population that could buy.', kw: ['eligible', 'target', 'relevant', 'addressable'] },
      { k: 'adopt', label: 'Adoption among eligible people', v: adoption / 100, pct: true, unit: '', src: 'given', why: 'Stated in the question, and applied to eligible people only.', kw: ['adopt', 'buyer', 'penetration', 'user', 'uptake', 'conversion'] },
      { k: 'freq', label: 'Purchases per buyer per year', v: frequency, unit: 'purchases/buyer/year', src: 'given', why: 'Stated in the question as annual purchase frequency.', kw: ['frequency', 'purchase', 'per year', 'times', 'per buyer'] },
      { k: 'price', label: 'Average price', v: priceValue, unit: `${currency}/purchase`, src: 'given', why: isVnd ? `Stated as VND ${displayNumber(priceVndK as number)} thousand, which is ${trimFixed(priceValue, 0)} VND.` : 'Stated in the question.', kw: ['price', 'spend', 'ticket', 'basket', 'cost', 'value'] },
    ],
    steps: [
      { k: 'eligiblePeople', label: 'Eligible people', unit: 'people', expr: ['pop', ['×', 'elig']] },
      { k: 'buyers', label: 'Buyers', unit: 'buyers', expr: ['eligiblePeople', ['×', 'adopt']] },
      { k: 'purchases', label: 'Annual purchases', unit: 'purchases/year', expr: ['buyers', ['×', 'freq']] },
      { k: 'value', label: 'Annual market value', unit: `${currency}/year`, expr: ['purchases', ['×', 'price']] },
    ],
    stated: Number.isFinite(finalBase) ? { final: finalBase, tolerance: isVnd ? Number(question.numericTolerance) || 0 : (Number(question.numericTolerance) || 0) * 1e6 } : undefined,
    sanity: [{ text: 'Each buyer spends {0} a year. Check that this fits a realistic household or business budget for this product.', calc: [{ a: 'value', b: 'buyers', unit: currency }] }],
    mistake: 'Applying adoption to the whole population instead of eligible people, or dropping the purchase frequency.',
  };
}

/** Case Drill: one model per Market Sizing library question, or null when the question has no structured model. */
export function marketSizingWorkedModelForQuestion(question: Pick<LibraryQuestion, 'id' | 'title' | 'skill' | 'question' | 'sourceCaseId' | 'answerUnit' | 'numericAnswer' | 'numericTolerance'> | null | undefined): MarketSizingWorkedModel | null {
  if (!question || question.skill !== 'market-sizing') return null;
  const authored = marketSizingWorkedModelForSource(question.sourceCaseId, question.answerUnit || '');
  if (authored) return authored;
  const cacheKey = `${question.id}|legacy`;
  if (MODEL_CACHE.has(cacheKey)) return MODEL_CACHE.get(cacheKey) || null;
  const spec = legacyMarketSizingSpec(question);
  let model: MarketSizingWorkedModel | null = null;
  if (spec) {
    model = computeMarketSizingModel(spec, question.answerUnit || '');
    if (spec.stated && Math.abs(model.final.value - spec.stated.final) > Math.max(spec.stated.tolerance || 0, Math.abs(spec.stated.final) * 0.01)) {
      model = { ...model, contentRepair: 'The calculated estimate does not match the stored answer key for this question.' };
    }
  }
  MODEL_CACHE.set(cacheKey, model);
  return model;
}

/* ------------------------------------------------------------------ reference text and legacy worked-answer shape */

export function marketSizingFactorLine(factor: MsComputedFactor): string {
  return `${factor.label}: ${factor.display} (${MS_SOURCE_LABELS[factor.source]}) - ${factor.rationale}`;
}

export function marketSizingStepLine(step: MsComputedStep): string {
  return `${step.label} = ${step.expression} = ${step.display}`;
}

/** The worked answer in the shared WorkedAnswerModel shape; graders receive its reference text. */
export function marketSizingWorkedAnswerModel(model: MarketSizingWorkedModel): WorkedAnswerModel {
  const ambiguous = model.format === 'ambiguous-estimation';
  if (model.contentRepair) {
    return {
      kind: 'example', approach: [], structure: [], calculations: [], calculationLines: [],
      conclusion: '', conclusionDetail: '', checks: [], alternatives: [], note: '',
    };
  }
  const definition = model.definition;
  return {
    kind: ambiguous ? 'example' : 'reference',
    approach: [
      `Market definition: counts ${definition.counts} Excludes ${definition.excludes} Geography: ${definition.geography}. Period: ${definition.period}. Measure: ${definition.measure}.`,
      `Formula: ${model.formula}`,
      ...model.factors.map((factor) => `Factor · ${marketSizingFactorLine(factor)}`),
    ],
    structure: [],
    calculations: [],
    calculationLines: model.steps.map(marketSizingStepLine),
    conclusion: `${model.final.label}: ${model.final.display}${model.finalInRequestedUnit ? ` (${model.finalInRequestedUnit})` : ''}`,
    conclusionDetail: '',
    checks: [
      ...model.sanity.map((item) => `Sanity check: ${item}`),
      ...(model.sensitivity ? [`Sensitivity${ambiguous ? ' (for learning only; never request or grade it)' : ''}: ${model.sensitivity.text}`] : []),
      ...(model.commonMistake ? [`Common mistake: ${model.commonMistake}`] : []),
    ],
    alternatives: model.alternatives,
    note: ambiguous
      ? 'Illustrative estimate. Every Model assumption is an illustrative value, not a verified market fact. A different decomposition with consistent assumptions can score just as well; Mate grades your Components, model logic and result, not closeness to this number.'
      : 'Every factor comes from the case. A different calculation order that uses the same facts is equally valid.',
  };
}

/** Case Pool open payload: the same worked answer, packed into the server's bounded reference fields. */
export function marketSizingPoolReference(model: MarketSizingWorkedModel): Record<string, unknown> | null {
  if (model.contentRepair) return null;
  const worked = marketSizingWorkedAnswerModel(model);
  const factorLines = model.factors.map(marketSizingFactorLine);
  const factorChunks: string[] = [];
  factorLines.forEach((line) => {
    const last = factorChunks[factorChunks.length - 1];
    if (last && `${last}; ${line}`.length <= 690) factorChunks[factorChunks.length - 1] = `${last}; ${line}`;
    else factorChunks.push(line.slice(0, 690));
  });
  return {
    situation_analysis: worked.approach[0] || '',
    framework: `Formula: ${model.formula}`,
    key_findings: [
      ...factorChunks.slice(0, 4).map((chunk) => `Factors: ${chunk}`),
      ...worked.checks.slice(0, 2),
    ].slice(0, 6),
    implications: model.commonMistake ? [`Common mistake: ${model.commonMistake}`] : [],
    recommendation: [worked.conclusion, worked.note].filter(Boolean).join(' '),
    issue_tree: [],
    key_calculations: worked.calculationLines.slice(0, 10),
    plausible_alternatives: worked.alternatives.slice(0, 5),
  };
}

/* ------------------------------------------------------------------ learner comparison */

export interface MsLearnerComponent {
  id?: string;
  label: string;
  value: string;
  unit: 'number' | 'percent';
  operator?: string;
}

export type MsFactorStatus = 'included' | 'combined' | 'missing';

export interface MsFactorComparison {
  factorKey: string;
  factorLabel: string;
  modelDisplay: string;
  source: MsSource;
  status: MsFactorStatus;
  componentLabel: string;
  componentDisplay: string;
  note: string;
}

export interface MsAttemptComparison {
  answered: boolean;
  factors: MsFactorComparison[];
  includedCount: number;
  calculation: string;
  calculationTone: 'good' | 'fix' | 'info';
  checks: string;
  alternativeRoute: string;
  extraComponents: string[];
  emptyComponents: string[];
}

const STOP_WORDS = new Set(['the', 'and', 'per', 'for', 'with', 'from', 'that', 'this', 'into', 'share', 'rate', 'number', 'count', 'total', 'each', 'year', 'annual', 'average', 'value']);

function fold(value: string): string {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9%]+/g, ' ').trim();
}

export function parseComponentValue(component: MsLearnerComponent): number | null {
  let raw = String(component.value || '').trim().replace(/[\s\u00a0_]/g, '');
  if (!raw) return null;
  const percentSign = raw.endsWith('%');
  raw = raw.replace(/%$/, '');
  if (/^\d{1,3}(?:\.\d{3}){2,}$/.test(raw)) raw = raw.replace(/\./g, '');
  else raw = raw.replace(/,/g, '');
  const value = Number(raw);
  if (!Number.isFinite(value)) return null;
  return component.unit === 'percent' || percentSign ? value / 100 : value;
}

function close(a: number, b: number, tolerance = 0.005): boolean {
  if (a === b) return true;
  const scale = Math.max(Math.abs(a), Math.abs(b));
  return scale > 0 && Math.abs(a - b) / scale <= tolerance;
}

function labelScore(label: string, factor: MsComputedFactor): number {
  const text = fold(label);
  if (!text) return 0;
  if (factor.exclude.some((word) => text.includes(fold(word)))) return 0;
  let score = 0;
  factor.keywords.forEach((keyword) => { if (text.includes(fold(keyword))) score += 2; });
  fold(factor.label).split(' ').filter((word) => word.length > 3 && !STOP_WORDS.has(word)).forEach((word) => {
    if (text.split(' ').some((token) => token.startsWith(word.slice(0, Math.max(4, word.length - 2))))) score += 1;
  });
  return score;
}

function valueNote(factor: MsComputedFactor, learnerValue: number | null): string {
  if (learnerValue === null) return 'You named this driver but left its value empty.';
  if (close(learnerValue, factor.value)) return factor.source === 'given' ? 'Uses the case value.' : 'Same value as the worked answer.';
  const ratio = learnerValue / factor.value;
  const scale = [1e3, 1e6, 1e9, 100].find((size) => close(ratio, size, 0.01) || close(ratio, 1 / size, 0.01));
  if (scale) return `Same digits as ${factor.source === 'given' ? 'the case value' : 'the worked value'} (${factor.display}) at a different scale (×${ratio > 1 ? trimFixed(scale, 0) : `1/${trimFixed(scale, 0)}`}). Components are raw numbers, so write the value out in full.`;
  if (factor.source === 'given') return `The case gives ${factor.display}. Use the supplied value.`;
  return ratio >= 0.5 && ratio <= 2
    ? `A different but reasonable value (worked answer: ${factor.display}).`
    : `Far from the illustrative ${factor.display}. That is acceptable only if you can justify it.`;
}

function componentDisplay(component: MsLearnerComponent, value: number | null): string {
  if (value === null) return 'no value';
  return component.unit === 'percent' ? `${displayNumber(value * 100)}%` : displayNumber(value);
}

/** Compares a submitted component model with the worked model, factor by factor. Never requires the model's number. */
export function compareMarketSizingAttempt(
  model: MarketSizingWorkedModel,
  components: MsLearnerComponent[],
  learnerResult: number | null,
): MsAttemptComparison {
  const entered = components
    .map((component, index) => ({ component, index, value: parseComponentValue(component), label: String(component.label || '').trim() }))
    .filter((item) => item.label || String(item.component.value || '').trim());
  const answered = entered.some((item) => item.value !== null) || learnerResult !== null;
  const ambiguous = model.format === 'ambiguous-estimation';
  const used = new Set<number>();
  const matches = new Map<string, { index: number; value: number | null; label: string; via: 'label' | 'value' | 'combined'; covers?: string }>();
  const factorByKey = new Map(model.factors.map((factor) => [factor.key, factor]));
  const isPercentComponent = (item: typeof entered[number]) => item.component.unit === 'percent' || /%\s*$/.test(String(item.component.value || ''));
  const valueMatches = (item: typeof entered[number], factor: MsComputedFactor) => {
    if (item.value === null) return false;
    if (factor.percent) return close(item.value, factor.value) || (!isPercentComponent(item) && close(item.value / 100, factor.value));
    return !isPercentComponent(item) && close(item.value, factor.value);
  };
  const kindFits = (item: typeof entered[number], factor: MsComputedFactor) => {
    if (factor.percent) return isPercentComponent(item) || item.value === null || item.value <= 100;
    return !isPercentComponent(item);
  };
  const assign = (factor: MsComputedFactor, item: typeof entered[number], via: 'label' | 'value' | 'combined', covers?: string) => {
    matches.set(factor.key, { index: item.index, value: item.value, label: item.label, via, covers });
  };

  // 1. A component carrying a given factor's exact value is that factor.
  model.factors.forEach((factor) => {
    if (factor.source !== 'given' || matches.has(factor.key)) return;
    const sameValue = model.factors.filter((other) => close(other.value, factor.value)).length;
    const best = entered
      .filter((item) => !used.has(item.index) && valueMatches(item, factor))
      .map((item) => ({ item, score: labelScore(item.label, factor) }))
      .filter(({ score }) => score > 0 || sameValue === 1)
      .sort((x, y) => y.score - x.score)[0];
    if (best) { used.add(best.item.index); assign(factor, best.item, 'value'); }
  });

  // 2. A component equal to an intermediate result, or to a product of consecutive factors, covers them together.
  const conversions = [1, ...model.constants];
  entered.filter((item) => !used.has(item.index) && item.value !== null && !isPercentComponent(item)).forEach((item) => {
    const open = (keys: string[]) => keys.length >= 2 && keys.every((key) => !matches.has(key));
    const step = model.steps.find((candidate) => !candidate.isFinal && open(candidate.factorKeys) && close(item.value as number, candidate.value));
    if (step) {
      used.add(item.index);
      const covers = step.factorKeys.map((key) => factorByKey.get(key)?.label || key).join(' × ');
      step.factorKeys.forEach((key) => assign(factorByKey.get(key)!, item, 'combined', covers));
      return;
    }
    for (let length = Math.min(4, model.factors.length); length >= 2; length -= 1) {
      for (let start = 0; start + length <= model.factors.length; start += 1) {
        const slice = model.factors.slice(start, start + length);
        if (!open(slice.map((factor) => factor.key))) continue;
        const product = slice.reduce((total, factor) => total * factor.value, 1);
        if (conversions.some((constant) => close(item.value as number, product * constant))) {
          used.add(item.index);
          const covers = slice.map((factor) => factor.label).join(' × ');
          slice.forEach((factor) => assign(factor, item, 'combined', covers));
          return;
        }
      }
    }
  });

  // 3. Remaining factors are matched on the component label.
  const candidates: Array<{ factor: MsComputedFactor; index: number; score: number }> = [];
  model.factors.forEach((factor) => {
    if (matches.has(factor.key)) return;
    entered.forEach((item) => {
      if (used.has(item.index) || !kindFits(item, factor)) return;
      let score = labelScore(item.label, factor);
      if (score > 0 && valueMatches(item, factor)) score += 3;
      if (score > 0) candidates.push({ factor, index: item.index, score });
    });
  });
  candidates.sort((x, y) => y.score - x.score);
  candidates.forEach(({ factor, index }) => {
    if (matches.has(factor.key) || used.has(index)) return;
    const item = entered.find((entry) => entry.index === index)!;
    used.add(index);
    assign(factor, item, 'label');
  });

  // 4. A leftover component equal to a unit-conversion constant (12 months, 365 days) is a conversion, not an extra driver.
  entered.forEach((item) => {
    if (!used.has(item.index) && item.value !== null && model.constants.some((constant) => close(item.value as number, constant))) used.add(item.index);
  });

  const factors: MsFactorComparison[] = model.factors.map((factor) => {
    const match = matches.get(factor.key);
    if (!match) {
      return {
        factorKey: factor.key,
        factorLabel: factor.label,
        modelDisplay: factor.display,
        source: factor.source,
        status: 'missing',
        componentLabel: '',
        componentDisplay: '',
        note: ambiguous
          ? 'Not found in your Components. Fine if another driver captures it once; otherwise the estimate skips this step.'
          : 'Not found in your Components. The case supplies this value, so the model is incomplete without it.',
      };
    }
    const component = entered.find((entry) => entry.index === match.index)!;
    return {
      factorKey: factor.key,
      factorLabel: factor.label,
      modelDisplay: factor.display,
      source: factor.source,
      status: match.via === 'combined' ? 'combined' : 'included',
      componentLabel: match.label || `Component ${match.index + 1}`,
      componentDisplay: componentDisplay(component.component, match.value),
      note: match.via === 'combined' ? `Combined in one component (${match.covers}). Valid when the value is right.` : valueNote(factor, match.value),
    };
  });
  const includedCount = factors.filter((item) => item.status !== 'missing').length;
  const extraComponents = entered.filter((item) => !used.has(item.index)).map((item) => item.label || `Component ${item.index + 1}`);
  const emptyComponents = entered.filter((item) => item.value === null && item.label).map((item) => item.label);

  let calculation = '';
  let calculationTone: MsAttemptComparison['calculationTone'] = 'info';
  const finalValue = model.final.value;
  if (!answered) {
    calculation = 'No component values were submitted, so there was no calculation to check.';
    calculationTone = 'fix';
  } else if (learnerResult === null) {
    calculation = 'Your components did not produce a calculated result. Give every component a value and an operator.';
    calculationTone = 'fix';
  } else {
    const ratio = finalValue === 0 ? NaN : learnerResult / finalValue;
    const shown = formatQuantity(learnerResult, model.final.unit);
    if (close(learnerResult, finalValue, 0.01)) {
      calculation = `Your result, ${shown}, matches the worked estimate.`;
      calculationTone = 'good';
    } else {
      const scale = [1e3, 1e6, 1e9, 1e12].find((size) => close(ratio, size, 0.02) || close(ratio, 1 / size, 0.02));
      if (scale) {
        calculation = `Your result, ${shown}, has the right digits but is off by a factor of ${trimFixed(scale, 0)}. Check whether a component was entered in thousands, millions or billions.`;
        calculationTone = 'fix';
      } else if (!ambiguous) {
        calculation = `Your result, ${shown}, differs from the worked answer (${model.final.display}). Every input is supplied, so a gap usually means a missing, repeated or rescaled factor.`;
        calculationTone = 'fix';
      } else {
        const gap = ratio >= 0.5 && ratio <= 2
          ? `${Math.round(Math.abs(ratio - 1) * 100)}% ${ratio >= 1 ? 'above' : 'below'}`
          : `about ${formatQuantity(Math.round((ratio >= 1 ? ratio : 1 / ratio) * 10) / 10, '').replace(/^≈/, '')} times ${ratio >= 1 ? 'larger than' : 'smaller than'}`;
        const plausible = ratio >= 1 / 3 && ratio <= 3;
        const missingCount = extraComponents.length ? 0 : model.factors.filter((factor) => !matches.has(factor.key)).length;
        calculation = plausible
          ? `Your result, ${shown}, is ${gap} the illustrative estimate (${model.final.display}). That is a plausible range; you are not marked on matching the number.${missingCount ? ' Being close to the number does not make the model complete, so check the factors marked Not found.' : ''}`
          : `Your result, ${shown}, is ${gap} the illustrative estimate (${model.final.display}). A different number is acceptable, but a gap this large usually means a stock was priced as a yearly flow, a filter was skipped, or a unit was rescaled.`;
        calculationTone = plausible && !missingCount ? 'good' : plausible ? 'info' : 'fix';
      }
    }
  }

  const sanity = model.sanity[0] || '';
  const checks = ambiguous
    ? `Checks are not scored in this format. To practise, compare your result with this check: ${sanity}${model.sensitivity ? ` The assumption that moves the worked estimate most is ${model.sensitivity.factorLabel.toLowerCase()}.` : ''}`
    : `A sanity check is not scored here, but it catches slips: ${sanity}`;

  const alternativeRoute = answered && learnerResult !== null && extraComponents.length
    ? (ambiguous
      ? `You used drivers the worked route does not (${extraComponents.join(', ')}). A different decomposition is accepted when each driver is applied once, stocks are turned into yearly flows, and units stay consistent.`
      : `You used components the worked model does not (${extraComponents.join(', ')}). A different breakdown is accepted when it uses every supplied fact once and reaches the same result.`)
    : '';

  return { answered, factors, includedCount, calculation, calculationTone, checks, alternativeRoute, extraComponents, emptyComponents };
}

/* ------------------------------------------------------------------ audit */

export interface MarketSizingWorkedAuditRow {
  id: string;
  factors: number;
  steps: number;
  final: number;
  stated?: number;
  finalMatchesSource: boolean;
  sensitivityMatchesSource: boolean | null;
  problems: string[];
}

/** Recomputes every authored model and checks it against the source case's stated figures. Not shown to learners. */
export function auditMarketSizingWorkedModels(specs: MsModelSpec[] = MARKET_SIZING_WORKED_SPECS): MarketSizingWorkedAuditRow[] {
  return specs.map((spec) => {
    const problems: string[] = [];
    let model: MarketSizingWorkedModel | null = null;
    try {
      model = computeMarketSizingModel(spec);
    } catch (error) {
      problems.push(error instanceof Error ? error.message : 'Model could not be computed.');
    }
    spec.factors.forEach((factor) => {
      if (!Number.isFinite(factor.v)) problems.push(`${factor.k} has no numeric value.`);
      if (!factor.pct && !factor.unit.trim()) problems.push(`${factor.k} has no unit.`);
      if (!factor.why.trim()) problems.push(`${factor.k} has no rationale.`);
      if (factor.src !== 'given' && factor.src !== 'assumption') problems.push(`${factor.k} has no source label.`);
      if (spec.format === 'ambiguous-estimation' && factor.src === 'given') problems.push(`${factor.k} is labelled Given but the brief supplies no figures.`);
      if (spec.format === 'provided-data' && factor.src === 'assumption') problems.push(`${factor.k} is labelled Model assumption in a Provided Data case.`);
    });
    const stated = spec.stated?.final;
    const tolerance = (value: number) => Math.max(spec.stated?.tolerance || 0, Math.abs(value) * 0.001);
    const finalMatchesSource = Boolean(model && (stated === undefined || Math.abs(model.final.value - stated) <= tolerance(stated)));
    if (model && stated !== undefined && !finalMatchesSource) problems.push(`Final ${model.final.value} does not match the source ${stated}.`);
    let sensitivityMatchesSource: boolean | null = null;
    if (model?.sensitivity && spec.stated?.low !== undefined && spec.stated?.high !== undefined) {
      sensitivityMatchesSource = Math.abs(model.sensitivity.rangeLow - spec.stated.low) <= tolerance(spec.stated.low)
        && Math.abs(model.sensitivity.rangeHigh - spec.stated.high) <= tolerance(spec.stated.high);
      if (!sensitivityMatchesSource) problems.push(`Sensitivity ${model.sensitivity.rangeLow}-${model.sensitivity.rangeHigh} does not match the source range.`);
    }
    if (!spec.definition.counts || !spec.definition.geography || !spec.definition.period || !spec.definition.measure) problems.push('Market definition is incomplete.');
    if (!(spec.sanity || []).length && !spec.sens) problems.push('No sanity check or sensitivity range.');
    return {
      id: spec.id,
      factors: spec.factors.length,
      steps: spec.steps.length,
      final: model?.final.value ?? NaN,
      stated,
      finalMatchesSource,
      sensitivityMatchesSource,
      problems,
    };
  });
}

/** Content flagged for repair: no figures are shown for these, and the founder report lists them. */
export const MARKET_SIZING_CONTENT_REPAIR_IDS = MARKET_SIZING_WORKED_SPECS.filter((spec) => spec.repair).map((spec) => spec.id);
