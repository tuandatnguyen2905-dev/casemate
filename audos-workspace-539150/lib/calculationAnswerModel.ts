import { formatNumbersInText } from './numberDisplay';
import { formatCanonicalNumber, numericUnitSpec, parseNumericQuantity, toleranceRuleText } from './numericUnits';
import { clarifyUnitLabel } from './unitLabels';

export type CalculationOperator = '×' | '+' | '−' | '÷';

export interface CalculationFinalAnswerSpec {
  id: string;
  label: string;
  unit?: string;
  /** Absolute tolerance in the displayed canonical unit; omitted when the source only defines a narrative rule. */
  tolerance?: number;
}

export interface CalculationFinalAnswer extends CalculationFinalAnswerSpec {
  value: string;
}

export interface CalculationNumberSlot {
  id: string;
  value: string;
  label: string;
  openParenthesis: boolean;
  closeParenthesis: boolean;
}

export interface CalculationFormulaRow {
  id: string;
  /** Stable id of the result this formula calculates. Empty only on legacy saved payloads. */
  resultId: string;
  numbers: CalculationNumberSlot[];
  operators: CalculationOperator[];
}

export interface CalculationAnswerPayload {
  finalAnswers: CalculationFinalAnswer[];
  formulaRows: CalculationFormulaRow[];
  caveat: string;
}

export interface CalculationResultSummary {
  id: string;
  label: string;
  value: string;
  unit?: string;
  formulas: string[];
}

/** Display-only unit beside an answer field: clarified wording, with a bare "percent" unit shown as "%". */
export function answerUnitLabel(unit?: string | null): string {
  const label = clarifyUnitLabel(unit);
  return /^percent(?:age)?$/i.test(label) ? '%' : label;
}

/** "Unit: VND million · 1.5 or 1,500,000 VND are both accepted"; empty for percentages and unscaled units. */
export function equivalentScaleHint(unit?: string | null): string {
  const label = clarifyUnitLabel(unit);
  if (!label) return '';
  const spec = numericUnitSpec(label);
  if (spec.kind === 'percent' || spec.kind === 'percentage-point' || spec.scale <= 1) return '';
  return `Unit: ${label} · 1.5 or ${formatCanonicalNumber(1.5 * spec.scale)}${spec.currency ? ` ${spec.currency}` : ''} are both accepted`;
}

export function answerToleranceText(tolerance: number, unit?: string | null): string {
  return toleranceRuleText(tolerance, answerUnitLabel(unit), tolerance === 0).replace(/(\d) %/, '$1%');
}

function uniqueId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createCalculationNumberSlot(): CalculationNumberSlot {
  return {
    id: uniqueId('number'),
    value: '',
    label: '',
    openParenthesis: false,
    closeParenthesis: false,
  };
}

export function createCalculationFormulaRow(resultId = ''): CalculationFormulaRow {
  return {
    id: uniqueId('formula'),
    resultId,
    numbers: [createCalculationNumberSlot(), createCalculationNumberSlot()],
    operators: ['×'],
  };
}

export function createCalculationAnswerPayload(
  specs: CalculationFinalAnswerSpec[],
  initialFormulaRows: number,
): CalculationAnswerPayload {
  const resolvedSpecs = specs.length ? specs : [{ id: 'final-result-1', label: 'Final result' }];
  const finalAnswers = resolvedSpecs.map((spec) => ({ ...spec, value: '' }));
  // Every result starts with its own formula. Extra requested rows remain
  // attached to the last result, so no formula ever floats below the section.
  const formulaRows = finalAnswers.map((answer) => createCalculationFormulaRow(answer.id));
  while (formulaRows.length < Math.max(finalAnswers.length, initialFormulaRows)) {
    formulaRows.push(createCalculationFormulaRow(finalAnswers[finalAnswers.length - 1].id));
  }
  return { finalAnswers, formulaRows, caveat: '' };
}

export function formulaRowsForCalculationResult(
  payload: CalculationAnswerPayload,
  resultId: string,
  resultIndex: number,
): CalculationFormulaRow[] {
  const associated = payload.formulaRows.filter((row) => row.resultId === resultId);
  if (associated.length) return associated;
  // Compatibility for payloads created before resultId existed: the saved row
  // number was the only association available, so map that explicit index once.
  const legacyRows = payload.formulaRows.filter((row) => !row.resultId);
  return legacyRows[resultIndex] ? [{ ...legacyRows[resultIndex], resultId }] : [];
}

export function parseCalculationNumber(raw: string): number | null {
  const text = String(raw || '').trim();
  if (!text) return null;
  const isPercent = /%|\bpercent(?:age)?\b|\bphần\s*trăm\b/iu.test(text);
  const currency = /(?:vnd|vnđ|đồng|dong)|₫/iu.test(text) ? 'VND' : /(?:usd|dollars?)|\$/iu.test(text) ? 'USD' : '';
  const parsed = parseNumericQuantity(text, isPercent ? 'Percent' : currency || 'number');
  if (!parsed.ok || parsed.value === null) return null;
  // Formula slots use a marked percentage as its arithmetic fraction. A bare
  // decimal stays literal, matching percent-field semantics elsewhere.
  return isPercent ? parsed.value / 100 : parsed.value;
}

function precedence(operator: CalculationOperator): number {
  return operator === '×' || operator === '÷' ? 2 : 1;
}

function applyOperator(left: number, right: number, operator: CalculationOperator): number | null {
  if (operator === '×') return left * right;
  if (operator === '÷') return right === 0 ? null : left / right;
  if (operator === '+') return left + right;
  return left - right;
}

export function evaluateCalculationFormula(row: CalculationFormulaRow): number | null {
  if (row.numbers.length < 2 || row.operators.length !== row.numbers.length - 1) return null;
  const output: Array<number | CalculationOperator | '(' | ')'> = [];
  row.numbers.forEach((slot, index) => {
    const value = parseCalculationNumber(slot.value);
    if (value === null) return;
    if (slot.openParenthesis) output.push('(');
    output.push(value);
    if (slot.closeParenthesis) output.push(')');
    if (index < row.operators.length) output.push(row.operators[index]);
  });
  if (output.filter((token) => typeof token === 'number').length !== row.numbers.length) return null;

  const values: number[] = [];
  const operators: Array<CalculationOperator | '('> = [];
  const reduce = () => {
    const operator = operators.pop();
    const right = values.pop();
    const left = values.pop();
    if (!operator || operator === '(' || left === undefined || right === undefined) return false;
    const result = applyOperator(left, right, operator);
    if (result === null || !Number.isFinite(result)) return false;
    values.push(result);
    return true;
  };

  for (const token of output) {
    if (typeof token === 'number') {
      values.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length && operators[operators.length - 1] !== '(') {
        if (!reduce()) return null;
      }
      if (operators.pop() !== '(') return null;
    } else {
      while (
        operators.length
        && operators[operators.length - 1] !== '('
        && precedence(operators[operators.length - 1] as CalculationOperator) >= precedence(token)
      ) {
        if (!reduce()) return null;
      }
      operators.push(token);
    }
  }
  while (operators.length) {
    if (operators[operators.length - 1] === '(' || !reduce()) return null;
  }
  return values.length === 1 && Number.isFinite(values[0]) ? values[0] : null;
}

export function formatCalculationValue(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

function formatCalculationEntry(raw: string): string {
  const text = String(raw || '').trim();
  const percent = text.endsWith('%');
  const numeric = (percent ? text.slice(0, -1) : text).replace(/[\s,]/g, '');
  if (!/^[−-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(numeric)) return text;
  const parsed = Number(numeric.replace('−', '-'));
  if (!Number.isFinite(parsed)) return text;
  return `${formatCalculationValue(parsed)}${percent ? '%' : ''}`;
}

export function formatCalculationFormulaRow(row: CalculationFormulaRow): string {
  const terms: string[] = [];
  row.numbers.forEach((slot, index) => {
    const number = slot.value.trim() ? formatCalculationEntry(slot.value) : '[blank]';
    const labelled = slot.label.trim() ? `${number} (${slot.label.trim()})` : number;
    terms.push(`${slot.openParenthesis ? '(' : ''}${labelled}${slot.closeParenthesis ? ')' : ''}`);
    if (index < row.operators.length) terms.push(row.operators[index]);
  });
  const result = evaluateCalculationFormula(row);
  return `${terms.join(' ')} = ${result === null ? '[incomplete]' : formatCalculationValue(result)}`;
}

export function hasCalculationFormula(payload: CalculationAnswerPayload): boolean {
  return payload.formulaRows.some((row) => row.numbers.every((slot) => parseCalculationNumber(slot.value) !== null));
}

export function calculationAnswerPayloadWithResults(payload: CalculationAnswerPayload) {
  return {
    ...payload,
    formulaRows: payload.formulaRows.map((row) => ({
      ...row,
      result: evaluateCalculationFormula(row),
    })),
  };
}

export function calculationResultSummaries(payload: CalculationAnswerPayload): CalculationResultSummary[] {
  return payload.finalAnswers.map((answer, index) => ({
    id: answer.id,
    label: answer.label,
    value: answer.value.trim() ? formatCalculationEntry(answer.value) : '[empty]',
    unit: answer.unit,
    formulas: formulaRowsForCalculationResult(payload, answer.id, index)
      .filter((row) => row.numbers.some((slot) => slot.value.trim() || slot.label.trim()))
      .map(formatCalculationFormulaRow),
  }));
}

/** Parse both the current result-associated serialization and pre-association rows. */
export function parseSerializedCalculationResults(
  serialized: string,
  fallbackSpecs: CalculationFinalAnswerSpec[] = [],
): CalculationResultSummary[] {
  const lines = String(serialized || '').split('\n');
  const finalHeader = lines.findIndex((line) => line.trim() === 'FINAL NUMERICAL ANSWERS');
  if (finalHeader < 0) return [];
  const formulaHeader = lines.findIndex((line) => /^(FORMULAS BY RESULT|STRUCTURED FORMULA ROWS)$/.test(line.trim()));
  const finalEnd = formulaHeader >= 0 ? formulaHeader : lines.length;
  const summaries: CalculationResultSummary[] = [];

  lines.slice(finalHeader + 1, finalEnd).forEach((line) => {
    const match = line.match(/^\s*(\d+)\.\s+(.+?):\s*(.*)$/);
    if (!match) return;
    const index = Number(match[1]) - 1;
    const fallback = fallbackSpecs[index];
    summaries.push({
      id: fallback?.id || `final-${index + 1}`,
      label: fallback?.label || match[2].trim(),
      value: match[3].trim() ? formatNumbersInText(match[3].trim()) : '[empty]',
      unit: fallback?.unit,
      formulas: [],
    });
  });

  if (formulaHeader < 0) return summaries;
  lines.slice(formulaHeader + 1).forEach((line) => {
    const current = line.match(/^\s*(\d+)\.\s+\[([^\]]+)\]\s+(.+?):\s*(.*)$/);
    if (current) {
      const resultId = current[2].trim();
      const index = Number(current[1]) - 1;
      const target = summaries.find((summary) => summary.id === resultId) || summaries[index];
      if (target && current[4].trim() && !current[4].includes('[blank]')) target.formulas.push(current[4].trim());
      return;
    }
    const legacy = line.match(/^\s*Row\s+(\d+):\s*(.*)$/i);
    if (legacy) {
      const target = summaries[Number(legacy[1]) - 1];
      if (target && legacy[2].trim() && !legacy[2].includes('[blank]')) target.formulas.push(legacy[2].trim());
    }
  });
  return summaries;
}

/** `includeCaveat: false` leaves the assumption line out entirely (Easy cases never ask for one). */
export function serializeCalculationAnswer(payload: CalculationAnswerPayload, options: { includeCaveat?: boolean } = {}): string {
  const finals = payload.finalAnswers
    .map((answer, index) => {
      const entered = answer.value.trim();
      const alreadyHasUnit = /%|\b(?:vnd|vnđ|usd|đồng|dong|dollars?|billion|bn|million|mn|thousand|nghìn|ngàn|triệu|tỷ|percent(?:age)?|percentage[ -]?points?|units?|packs?|bottles?|orders?|buyers?|years?)\b|[$₫]/iu.test(entered);
      return `${index + 1}. ${answer.label}: ${entered || '[empty]'}${answer.unit && !alreadyHasUnit ? ` ${answer.unit}` : ''}`;
    })
    .join('\n');
  const formulas = payload.finalAnswers
    .flatMap((answer, answerIndex) => formulaRowsForCalculationResult(payload, answer.id, answerIndex)
      .map((row) => `${answerIndex + 1}. [${answer.id}] ${answer.label}: ${formatCalculationFormulaRow(row)}`))
    .join('\n');
  return [
    'FINAL NUMERICAL ANSWERS',
    finals,
    'FORMULAS BY RESULT',
    formulas,
    ...(options.includeCaveat === false ? [] : [`KEY CAVEAT OR ASSUMPTION: ${payload.caveat.trim() || '[not provided]'}`]),
  ].join('\n');
}
