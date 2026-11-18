import { gradeNumericQuantity, parseNumericQuantity } from './numericUnits';
import { MARKET_SIZING_CYCLE_3_QUESTIONS } from './marketSizingCycle3';

function expectValue(raw: string, unit: string, expected: number, scenario: string) {
  const parsed = parseNumericQuantity(raw, unit);
  if (!parsed.ok || parsed.value !== expected) throw new Error(`${scenario}: expected ${expected} ${unit}, received ${parsed.value} (${parsed.error || 'no error'})`);
}

function expectRejected(raw: string, unit: string, scenario: string) {
  const parsed = parseNumericQuantity(raw, unit);
  if (parsed.ok) throw new Error(`${scenario}: expected rejection, received ${parsed.value} ${unit}`);
}

function expectGrade(raw: string, expected: number, unit: string, tolerance: number, correct: boolean, scenario: string) {
  const result = gradeNumericQuantity(raw, expected, unit, tolerance);
  if (result.correct !== correct) throw new Error(`${scenario}: expected correct=${correct}, received ${result.correct} (${result.message || result.value})`);
}

export function runNumericUnitRegressionTests() {
  expectValue('127200000000', 'VND', 127200000000, 'raw integer');
  expectValue('127,200,000,000 VND', 'VND billion', 127.2, 'comma-formatted VND converted to billions');
  expectValue('127.2 billion VND', 'VND billion', 127.2, 'written English scale');
  expectValue('127.2 tỷ VND', 'VND billion', 127.2, 'Vietnamese billion scale');
  expectValue('127.2bn VND', 'VND billion', 127.2, 'bn shorthand');
  expectValue('1.000.000', 'units', 1000000, 'repeated Vietnamese dot grouping');
  expectValue('-2.5 million', 'units', -2500000, 'negative decimal with scale');
  expectValue('2 triệu', 'units', 2000000, 'Vietnamese million scale');
  expectValue('25', 'Percent', 25, 'bare percent field value means 25 percent');
  expectValue('25%', 'Percent', 25, 'explicit percent marker');
  expectValue('0.25', 'Percent', 0.25, 'bare decimal in percent field remains 0.25 percent');
  expectValue('0.25 fraction', 'Percent', 25, 'explicit decimal fraction converts to percent');
  expectValue('8 pp', 'percentage points', 8, 'percentage-point marker');
  expectRejected('8%', 'percentage points', 'percent cannot substitute for percentage points');
  expectRejected('8 percentage points', 'Percent', 'percentage points cannot substitute for percent');
  expectRejected('127.2 billion USD', 'VND billion', 'wrong currency');
  expectRejected('17,873 bottles', 'packs', 'wrong count unit');
  expectRejected('12 million VND per month', 'VND million per year', 'wrong time basis');
  expectValue('17,873 units packs', 'packs', 17873, 'legacy generic plus specific count suffix');
  expectValue('400,000,000 VND million', 'VND million', 400, 'legacy auto-appended currency scale');
  expectRejected('1,5', 'units', 'ambiguous comma decimal');
  expectRejected('1.000,5', 'units', 'mixed separator locale');
  expectRejected('', 'VND', 'empty input');
  expectRejected('about twelve VND', 'VND', 'invalid number text');
  expectRejected('12 parsecs', 'units', 'invalid unit text');
  expectGrade('127,200,000,000 VND', 127.2, 'VND billion', 0.05, true, 'reported VND example in Case Drill');
  expectGrade('127.2 billion VND', 127.2, 'VND billion', 0.05, true, 'reported VND example in Case Pool');
  expectGrade('127.250 billion VND', 127.2, 'VND billion', 0.05, true, 'inclusive rounding boundary');
  expectGrade('127.251 billion VND', 127.2, 'VND billion', 0.05, false, 'outside rounding boundary');
  expectGrade('127.2 million VND', 127.2, 'VND billion', 0.05, false, 'genuinely wrong magnitude');
  expectGrade('127200000000', 127.2, 'billion VND', 0.05, true, 'bare base-unit figure in a billion VND field');
  expectGrade('127,200,000,000', 127.2, 'billion VND', 0.05, true, 'grouped base-unit figure in a billion VND field');
  expectGrade('127.2', 127.2, 'billion VND', 0.05, true, 'value in the field unit');
  expectGrade('127.2 tỷ đồng', 127.2, 'billion VND', 0.05, true, 'Vietnamese scale and currency words');
  expectGrade('127.2 billion VND', 127.2, 'VND bn', 0.05, true, 'legacy shorthand field label');
  expectGrade('127200000', 127.2, 'billion VND', 0.05, false, 'base-unit figure off by a factor of 1,000');
  expectGrade('128 billion VND', 127.2, 'billion VND', 0.05, false, 'wrong value in the right scale');
  expectGrade('127.2', 127200000000, 'VND', 0, false, 'scaled figure typed into a base VND field');
  expectGrade('46,000 people', 46, 'thousand people', 0, true, 'count in base units');
  expectGrade('46 thousand', 46000, 'people', 0, true, 'count with written scale');
  expectGrade('2500', 25, '%', 0.05, false, 'percent is never rescaled');

  const providedCycle3 = MARKET_SIZING_CYCLE_3_QUESTIONS.filter((question) => question.id.startsWith('market-sizing-cycle3-a'));
  if (providedCycle3.length !== 12) throw new Error(`expected 12 deterministic Market Sizing Cycle 3 questions, received ${providedCycle3.length}`);
  providedCycle3.forEach((question) => {
    if (!question.roundingRule?.trim()) throw new Error(`${question.id}: missing rounding/tolerance rule`);
    if (!Number.isFinite(question.numericTolerance) || Number(question.numericTolerance) < 0) throw new Error(`${question.id}: invalid numeric tolerance`);
  });
}

runNumericUnitRegressionTests();
