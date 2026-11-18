/*
 * One post-submission result for every Case Drill and Case Pool surface.
 *
 * Every view builds the same four-part result from the SAME verified case data
 * the grader used: the outcome comes from the stored score, the reasoning
 * feedback from the criteria / delta that produced that score, and the worked
 * answer from the reference the grader was given. Hosts never mix in a second,
 * independently generated assessment, so the score and the worked answer cannot
 * disagree.
 */
import type { CriterionScore } from './caseScoringRubrics';
import type { CalculationWorkedItem } from './calculationWorkedAnswers';
import type { LibraryQuestion } from './skillQuestionLibrary';
import { scorePercent } from './scorePresentation';
import { sameUnitText } from './unitLabels';

export type ResultOutcome = 'correct' | 'partial' | 'incorrect' | 'not-answered';

export const OUTCOME_LABELS: Record<ResultOutcome, string> = {
  correct: 'Correct',
  partial: 'Partially correct',
  incorrect: 'Incorrect',
  'not-answered': 'Not answered',
};

/**
 * Objective items (MCQ, exact numeric) are binary. Rubric-graded work follows the
 * Casemate score bands: 80%+ meets the standard, 40-79% is partially correct.
 */
export function resultOutcome(
  score: number | null | undefined,
  scale: number,
  options: { objective?: boolean; answered?: boolean } = {},
): ResultOutcome {
  if (options.answered === false) return 'not-answered';
  if (score === null || score === undefined || !Number.isFinite(Number(score))) return 'not-answered';
  const percent = scorePercent(Number(score), scale);
  if (options.objective) return percent >= 99.999 ? 'correct' : 'incorrect';
  if (percent >= 80) return 'correct';
  if (percent >= 40) return 'partial';
  return 'incorrect';
}

/** True when the learner submitted something gradable (not blank / placeholder only). */
export function hasLearnerResponse(text: unknown): boolean {
  const clean = String(text ?? '')
    .replace(/CASEMATE_MARKET_SIZING_V\d+\n?/g, ' ')
    .replace(/\[empty\]/gi, ' ')
    .replace(/\b(?:final answer|bottom-up components|final estimate|final numerical answers|structured formula rows)\s*:/gi, ' ')
    .replace(/[\s:;,.\-–—_*#|()[\]{}"]+/g, '');
  return clean.length > 0;
}

export interface WorkedAnswerModel {
  /** 'reference' = the verified answer key. 'example' = one strong answer to open-ended work. */
  kind: 'reference' | 'example';
  approach: string[];
  /** Numbered first-level branches of a model structure, shown under Approach. */
  structure: string[];
  calculations: CalculationWorkedItem[];
  calculationLines: string[];
  conclusion: string;
  conclusionDetail: string;
  checks: string[];
  alternatives: string[];
  note: string;
}

function cleanText(value: unknown): string {
  return String(value ?? '').replace(/\u2014/g, '-').trim();
}

function keyOf(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function cleanList(values: unknown, max = 12): string[] {
  const seen = new Set<string>();
  const list = Array.isArray(values) ? values : values === undefined || values === null ? [] : [values];
  const result: string[] = [];
  list.forEach((value) => {
    const text = cleanText(value);
    const key = keyOf(text);
    if (!text || !key || seen.has(key) || result.length >= max) return;
    seen.add(key);
    result.push(text);
  });
  return result;
}

export function emptyWorkedAnswer(kind: WorkedAnswerModel['kind']): WorkedAnswerModel {
  return { kind, approach: [], structure: [], calculations: [], calculationLines: [], conclusion: '', conclusionDetail: '', checks: [], alternatives: [], note: '' };
}

export function hasWorkedAnswer(model: WorkedAnswerModel | null | undefined): model is WorkedAnswerModel {
  return Boolean(model && (model.conclusion || model.calculations.length || model.calculationLines.length || model.structure.length || model.approach.length));
}

/** Drops duplicates across sub-parts so the same sentence never appears twice in one worked answer. */
function finalizeWorkedAnswer(model: WorkedAnswerModel): WorkedAnswerModel | null {
  const seen = new Set<string>();
  const take = (items: string[]) => items.filter((item) => {
    const key = keyOf(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const conclusion = cleanText(model.conclusion);
  if (conclusion) seen.add(keyOf(conclusion));
  const detail = cleanText(model.conclusionDetail);
  const conclusionDetail = detail && !seen.has(keyOf(detail)) ? detail : '';
  if (conclusionDetail) seen.add(keyOf(conclusionDetail));
  const next: WorkedAnswerModel = {
    ...model,
    conclusion,
    conclusionDetail,
    structure: take(cleanList(model.structure)),
    approach: take(cleanList(model.approach)),
    calculationLines: take(cleanList(model.calculationLines, 16)),
    checks: take(cleanList(model.checks)),
    alternatives: take(cleanList(model.alternatives, 6)),
    note: cleanText(model.note),
  };
  return hasWorkedAnswer(next) ? next : null;
}

/** Plain-text form of a worked answer. Graders receive exactly this text, so grading and the shown answer share one source. */
export function workedAnswerReferenceText(model: WorkedAnswerModel | null | undefined): string {
  if (!hasWorkedAnswer(model)) return '';
  const lines: string[] = [];
  if (model.kind === 'example') lines.push('This is one strong answer, not the only acceptable one. Credit any other answer that is logically sound and uses the case facts.');
  if (model.approach.length || model.structure.length) {
    lines.push('APPROACH:');
    model.approach.forEach((item) => lines.push(`- ${item}`));
    model.structure.forEach((item, index) => lines.push(`  ${index + 1}. ${item}`));
  }
  if (model.calculations.length || model.calculationLines.length) {
    lines.push('CALCULATIONS:');
    model.calculations.forEach((item) => {
      lines.push(`- ${item.label}: ${item.answer}${item.formula ? ` (formula: ${item.formula})` : ''}`);
      item.steps.forEach((step) => lines.push(`    ${step}`));
    });
    model.calculationLines.forEach((item) => lines.push(`- ${item}`));
  }
  if (model.conclusion) lines.push(`CONCLUSION: ${model.conclusion}`);
  if (model.conclusionDetail) lines.push(model.conclusionDetail);
  if (model.checks.length) {
    lines.push('EVIDENCE, ASSUMPTIONS AND CHECKS:');
    model.checks.forEach((item) => lines.push(`- ${item}`));
  }
  if (model.alternatives.length) {
    lines.push('OTHER ACCEPTABLE ANSWERS:');
    model.alternatives.forEach((item) => lines.push(`- ${item}`));
  }
  return lines.join('\n');
}

/* ------------------------------------------------------------------ evidence guards */

const SCALE_WORDS: Array<[RegExp, number]> = [
  [/^(?:bn|billion|tỷ|ty|b)$/i, 1e9],
  [/^(?:mn|million|triệu|m)$/i, 1e6],
  [/^(?:k|thousand|nghìn|ngàn)$/i, 1e3],
];

/** Every number written in a text, with and without its scale word (e.g. "4.8bn" -> 4.8 and 4.8e9). */
export function numbersInText(text: string): number[] {
  const values: number[] = [];
  const pattern = /([−-]?\d[\d,]*(?:\.\d+)?)\s*(bn|billion|tỷ|ty|mn|million|triệu|thousand|nghìn|ngàn|k|m|b)?(?![A-Za-zÀ-ỹ])/giu;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(String(text || ''))) !== null) {
    const raw = match[1].replace('−', '-');
    const normalized = /^\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(raw.replace('-', '')) ? raw.replace(/,/g, '') : raw.replace(/,/g, '.');
    const value = Number(normalized);
    if (!Number.isFinite(value)) continue;
    values.push(value);
    const scale = SCALE_WORDS.find(([word]) => word.test(match![2] || ''))?.[1];
    if (scale) values.push(value * scale);
  }
  return values;
}

/**
 * A numeric answer key is trustworthy for the worked answer only when the
 * displayed answer text states the same number the grader checks against.
 */
export function numericKeyMatchesText(expected: number, text: string, tolerance = 0): boolean {
  const values = numbersInText(text);
  if (!values.length) return true;
  const slack = Math.max(Math.abs(tolerance), Math.abs(expected) * 0.005, 1e-9);
  return values.some((value) => Math.abs(value - expected) <= slack || Math.abs(value / 100 - expected) <= slack || Math.abs(value * 100 - expected) <= slack);
}

export interface EvidenceCheck {
  trustworthy: boolean;
  reason: string;
}

const TRUSTED: EvidenceCheck = { trustworthy: true, reason: '' };

/** Guards a library question's answer key before it is shown as the worked answer. */
export function libraryQuestionEvidence(question: Pick<LibraryQuestion, 'id' | 'skill' | 'answerMode' | 'options' | 'correctAnswer' | 'explanation' | 'numericAnswer' | 'numericTolerance'>): EvidenceCheck {
  const key = cleanText(question.correctAnswer);
  if (!key) return { trustworthy: false, reason: 'No verified answer is stored for this question.' };
  const isChoice = question.answerMode === 'choice' || question.answerMode === 'multiple-choice';
  if (isChoice && question.skill !== 'calculations' && Array.isArray(question.options) && question.options.length && !question.options.some((option) => sameUnitText(option, question.correctAnswer))) {
    return { trustworthy: false, reason: 'The stored answer key is not one of the answer choices.' };
  }
  if (question.numericAnswer != null && question.skill !== 'market-sizing' && question.skill !== 'calculations' && !numericKeyMatchesText(Number(question.numericAnswer), key, Number(question.numericTolerance) || 0)) {
    return { trustworthy: false, reason: 'The stored answer text and the number used for marking do not agree.' };
  }
  return TRUSTED;
}

/* ------------------------------------------------------------------ worked-answer builders */

const EXAMPLE_NOTE = 'One well-reasoned route, not the only acceptable answer. A different structure or recommendation that is logically sound and uses the case facts can score just as well.';

/** Internal content-routing notes stored with a few questions; they are not part of the answer. */
const EDITORIAL_NOTE = /\b(?:source case ID|source values|is routed to|belongs in (?:Charts|Structures|Creativity|Calculations|Market Sizing))\b/i;

function withoutEditorialNotes(text: string): string {
  return String(text || '')
    .split('\n')
    .map((line) => line.split(/(?<=[.!?])\s+/).filter((sentence) => !EDITORIAL_NOTE.test(sentence)).join(' '))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function isOpenEndedQuestion(question: Pick<LibraryQuestion, 'skill' | 'answerMode' | 'marketSizingFormat' | 'structuredAnswer'>): boolean {
  if (question.skill === 'structures' || question.skill === 'creativity') return true;
  if (question.structuredAnswer) return true;
  if (question.skill === 'market-sizing') return question.marketSizingFormat !== 'provided-data';
  return question.answerMode === 'text';
}

/** Worked answer for a Question Library item (Charts, Calculations, Market Sizing, Expert drills, Structures fallback). */
export function libraryQuestionWorkedAnswer(
  question: LibraryQuestion,
  options: { calculations?: CalculationWorkedItem[]; inputLines?: string[] } = {},
): WorkedAnswerModel | null {
  const evidence = libraryQuestionEvidence(question);
  if (!evidence.trustworthy) return null;
  const kind: WorkedAnswerModel['kind'] = isOpenEndedQuestion(question) ? 'example' : 'reference';
  const model = emptyWorkedAnswer(kind);
  const steps = cleanList(question.stepByStepSolution, 12).map(withoutEditorialNotes).filter(Boolean);
  const explanation = withoutEditorialNotes(cleanText(question.explanation));
  if (question.skill === 'calculations') {
    model.approach = cleanList(options.inputLines, 8).map((line) => `Input · ${line}`);
    model.calculations = options.calculations || [];
    model.conclusion = cleanText(question.correctAnswer);
    model.conclusionDetail = explanation;
  } else if (question.skill === 'market-sizing') {
    model.calculationLines = steps;
    model.conclusion = cleanText(question.correctAnswer);
    model.conclusionDetail = explanation;
    if (question.marketSizingFormat === 'ambiguous-estimation') model.note = 'Illustrative estimate. A different defensible component model can score just as well; Mate grades your Components, model logic and result, not closeness to this number.';
  } else if (question.skill === 'charts' && !question.structuredAnswer) {
    model.approach = steps.length ? steps : explanation ? [explanation] : [];
    model.conclusion = cleanText(question.correctAnswer);
    model.conclusionDetail = steps.length ? explanation : '';
  } else {
    model.approach = steps;
    model.conclusion = cleanText(question.correctAnswer);
    model.conclusionDetail = explanation;
  }
  if (question.keyInsight) model.checks.push(`Business meaning: ${cleanText(question.keyInsight)}`);
  if (question.commonMistake) model.checks.push(`Common mistake to avoid: ${cleanText(question.commonMistake)}`);
  if (kind === 'example' && !model.note) model.note = EXAMPLE_NOTE;
  return finalizeWorkedAnswer(model);
}

export interface MarketSizingBankItemLike {
  code?: string;
  title?: string;
  modelRoute?: string;
  workedCalculation?: string;
  driverLogic?: string;
  howToAssess?: string;
  scoringExample?: string;
}

/** Sentences of a worked-calculation paragraph; decimals such as "13.333bn" never split. */
function calculationSentences(text: string): string[] {
  return String(text || '')
    .split(/\n+|(?<=[.;])\s+(?=[A-Z])/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function lastIndexWhere(lines: string[], pattern: RegExp): number {
  for (let index = lines.length - 1; index >= 0; index -= 1) if (pattern.test(lines[index])) return index;
  return -1;
}

/** Market Sizing banks 2-4: the published route, calculation and checks for one source case. */
export function marketSizingBankWorkedAnswer(item: MarketSizingBankItemLike | null | undefined, notice = ''): WorkedAnswerModel | null {
  if (!item) return null;
  const model = emptyWorkedAnswer('example');
  const sentences = calculationSentences(item.workedCalculation || '');
  const totalIndex = lastIndexWhere(sentences, /\btotal\b[^.]*=/i);
  const resultIndex = totalIndex >= 0 ? totalIndex : lastIndexWhere(sentences, /\b(?:revenue|spend|market|size|value)\b[^.]*=/i);
  const conclusionIndex = resultIndex >= 0 ? resultIndex : sentences.length - 1;
  model.approach = cleanList([item.modelRoute]);
  model.calculationLines = sentences.slice(0, Math.max(0, conclusionIndex));
  model.conclusion = sentences[conclusionIndex] || '';
  model.checks = cleanList([
    ...sentences.slice(conclusionIndex + 1),
    item.driverLogic ? `Driver logic and check: ${item.driverLogic}` : '',
    item.howToAssess ? `Common mistakes: ${item.howToAssess}` : '',
  ]);
  model.alternatives = cleanList([item.scoringExample]);
  model.note = [notice, 'Your own issue tree is not graded; your Components and model are.'].filter(Boolean).join(' ');
  return finalizeWorkedAnswer(model);
}

export interface PoolModelAnswerLike {
  situation_analysis?: string;
  framework_applied?: string;
  issue_tree?: string[];
  key_calculations?: string[];
  key_findings?: string[];
  implications?: string[];
  recommendation?: string;
  plausible_alternatives?: string[];
}

/** Money or volume figures that collapse to zero after unit scaling, e.g. "0 billion VND" or "0,00 million units". */
const DEGENERATE_FIGURE = /(?:^|[^\d.,])0(?:,0+)?\s(?:billion|million|thousand)\b/i;

/** Guards a published Case Pool answer before it is shown as the worked answer. */
export function poolCaseEvidence(answer: PoolModelAnswerLike | null | undefined): EvidenceCheck {
  if (!answer || !(cleanText(answer.recommendation) || (answer.key_findings || []).length || (answer.issue_tree || []).length)) {
    return { trustworthy: false, reason: 'No verified worked answer is stored for this case.' };
  }
  const figures = [answer.recommendation, ...(answer.key_findings || []), ...(answer.key_calculations || [])].map(cleanText).join('\n');
  if (DEGENERATE_FIGURE.test(figures)) {
    return { trustworthy: false, reason: 'The stored worked answer states headline figures that round to zero, so it failed a consistency check and is held back for content review.' };
  }
  return TRUSTED;
}

/** Full Case Pool library case: the published worked answer, which is also the grader's reference. */
export function poolCaseWorkedAnswer(answer: PoolModelAnswerLike | null | undefined): WorkedAnswerModel | null {
  if (!answer || !poolCaseEvidence(answer).trustworthy) return null;
  const model = emptyWorkedAnswer('example');
  model.approach = cleanList([
    answer.situation_analysis ? `Read the situation: ${cleanText(answer.situation_analysis)}` : '',
    answer.framework_applied ? `Structure: ${cleanText(answer.framework_applied)}` : '',
  ]);
  model.structure = cleanList(answer.issue_tree, 8);
  model.calculationLines = cleanList(answer.key_calculations, 10);
  model.conclusion = cleanText(answer.recommendation);
  model.checks = cleanList([...(answer.key_findings || []), ...(answer.implications || []).map((item) => `Implication: ${cleanText(item)}`)], 10);
  model.alternatives = cleanList(answer.plausible_alternatives, 5);
  model.note = EXAMPLE_NOTE;
  return finalizeWorkedAnswer(model);
}

/** Case Room (generated case): the worked answer written in the same grading call as the score and delta. */
export function roomCaseWorkedAnswer(answer: { framework?: unknown; key_findings?: unknown; recommendation?: unknown } | null | undefined, options: { hideStructure?: boolean } = {}): WorkedAnswerModel | null {
  if (!answer) return null;
  const model = emptyWorkedAnswer('example');
  if (!options.hideStructure && cleanText(answer.framework)) model.approach = [`Structure: ${cleanText(answer.framework)}`];
  model.checks = cleanList(answer.key_findings, 6);
  model.conclusion = options.hideStructure ? '' : cleanText(answer.recommendation);
  if (options.hideStructure && model.checks.length) {
    model.calculationLines = model.checks;
    model.checks = [];
  }
  model.note = EXAMPLE_NOTE;
  return finalizeWorkedAnswer(model);
}

/* ------------------------------------------------------------------ reasoning feedback */

export interface ReasoningFeedback {
  worked: string[];
  failed: string[];
}

const GENERIC_FEEDBACK = /^(?:answer accuracy:\s*)?the submitted answer (?:matches|does not match) the answer key\.?$/i;

function tokens(value: string): Set<string> {
  return new Set(keyOf(value).split(' ').filter((word) => word.length > 3));
}

function nearDuplicate(left: string, right: string): boolean {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return keyOf(left) === keyOf(right);
  const overlap = [...a].filter((word) => b.has(word)).length;
  return overlap / Math.min(a.size, b.size) >= 0.75;
}

function distinct(values: string[], blocked: string[], max: number): string[] {
  const result: string[] = [];
  values.forEach((value) => {
    const text = cleanText(value);
    if (!text || GENERIC_FEEDBACK.test(text) || result.length >= max) return;
    if ([...blocked, ...result].some((prior) => nearDuplicate(text, prior))) return;
    result.push(text);
  });
  return result;
}

function criterionLine(criterion: Pick<CriterionScore, 'label' | 'reason'>): string {
  const reason = cleanText(criterion.reason);
  return reason ? `${cleanText(criterion.label)}: ${reason}` : '';
}

/**
 * What worked / what to fix, built only from the grading output for this attempt:
 * host-specific lines first (e.g. the option chosen), then the case-specific
 * delta, then the evidence issues, then the rubric criteria themselves.
 */
export function buildReasoningFeedback({
  criteria = [],
  matched = [],
  missing = [],
  evidenceToRevisit = [],
  worked = [],
  failed = [],
  exclude = [],
  max = 3,
}: {
  criteria?: Array<Pick<CriterionScore, 'label' | 'reason' | 'score' | 'weight'>>;
  matched?: unknown[];
  missing?: unknown[];
  evidenceToRevisit?: unknown[];
  worked?: unknown[];
  failed?: unknown[];
  exclude?: string[];
  max?: number;
}): ReasoningFeedback {
  const strong = criteria.filter((criterion) => Number(criterion.score) >= 8).sort((a, b) => b.weight - a.weight).map(criterionLine);
  const weak = criteria
    .filter((criterion) => Number(criterion.score) < 8)
    .sort((a, b) => a.score - b.score || b.weight - a.weight)
    .map(criterionLine);
  const workedLines = distinct([...cleanList(worked), ...cleanList(matched), ...strong], exclude, max);
  const failedLines = distinct([...cleanList(failed), ...cleanList(missing), ...cleanList(evidenceToRevisit), ...weak], [...exclude, ...workedLines], max);
  return { worked: workedLines, failed: failedLines };
}

/** MCQ: names the option chosen and the keyed option, tied to the same key the grader used. */
export function choiceFeedback(selected: string, correctAnswer: string, correct: boolean): ReasoningFeedback {
  const chosen = cleanText(selected);
  if (!chosen) return { worked: [], failed: ['No option was selected, so nothing could be marked.'] };
  if (correct) return { worked: [`You chose “${chosen}”, which is the option the exhibit supports.`], failed: [] };
  return { worked: [], failed: [`You chose “${chosen}”. The exhibit supports “${cleanText(correctAnswer)}” instead - compare the two against the data in the worked answer.`] };
}

/** Direct numeric answers: states the learner's value against the marked value and tolerance. */
export function numericFeedback(submitted: string, expectedText: string, correct: boolean, toleranceText = ''): ReasoningFeedback {
  const value = cleanText(submitted);
  if (!value) return { worked: [], failed: ['No value was submitted, so nothing could be marked.'] };
  if (correct) return { worked: [`Your value ${value} matches the marked answer${toleranceText ? ` (${toleranceText})` : ''}.`], failed: [] };
  return { worked: [], failed: [`Your value ${value} does not match the marked answer ${cleanText(expectedText)}${toleranceText ? ` (${toleranceText})` : ''}. Check the inputs, units and scale in the worked answer.`] };
}

/* ------------------------------------------------------------------ next action */

export type NextActionKind = 'retry' | 'next-question' | 'full-case' | 'domain-knowledge';

export interface NextActionOption {
  kind: NextActionKind;
  label: string;
  detail?: string;
  onSelect: () => void;
}

export const RETRY_LABEL = 'Retry';

/**
 * The Retry offered on every Case Drill and Case Pool result, whatever the outcome.
 * It clears only the current attempt; saved attempts and history stay untouched.
 */
export function retryAction(onSelect: () => void, { focus = '', label = RETRY_LABEL }: { focus?: string; label?: string } = {}): NextActionOption {
  return {
    kind: 'retry',
    label,
    detail: focus ? `Focus on one thing: ${focus}` : 'Start again from a blank answer. Your earlier attempts stay in your history.',
    onSelect,
  };
}

/**
 * The one forward step shown beside Retry, chosen from the outcome: a correct
 * answer moves to the full case or the next question; a missed objective item
 * goes to the concept first. Retry is never chosen here - it is always offered
 * through retryAction. `objective` is kept for existing callers.
 */
export function chooseNextAction(
  outcome: ResultOutcome,
  options: Partial<Record<NextActionKind, NextActionOption | null | undefined>>,
  _options: { objective?: boolean } = {},
): NextActionOption | null {
  const order: NextActionKind[] = outcome === 'correct'
    ? ['full-case', 'next-question', 'domain-knowledge']
    : ['domain-knowledge', 'next-question', 'full-case'];
  for (const kind of order) {
    const option = options[kind];
    if (option) return option;
  }
  return null;
}

/* ------------------------------------------------------------------ attempt history */

export interface AttemptHistoryEntry {
  score: number;
  scale: number;
  completedOn?: string;
}

/** Earlier attempts kept per question. A retry adds to this list; nothing is dropped in normal use. */
export const ATTEMPT_HISTORY_LIMIT = 50;

export function normalizeAttemptHistory(raw: unknown, max = ATTEMPT_HISTORY_LIMIT): AttemptHistoryEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry: any) => ({
      score: Number(entry?.score),
      scale: Number(entry?.scale) === 10 ? 10 : Number(entry?.scale) === 5 ? 5 : 10,
      completedOn: typeof entry?.completedOn === 'string' ? entry.completedOn : typeof entry?.completed_on === 'string' ? entry.completed_on : undefined,
    }))
    .filter((entry) => Number.isFinite(entry.score) && entry.score >= 0 && entry.score <= entry.scale)
    .slice(0, max);
}
