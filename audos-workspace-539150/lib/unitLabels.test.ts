import { CASE_POOL_LIBRARY, CASE_POOL_SOURCE_RECORDS } from './casePoolLibrary';
import { ADVANCED_CASE_DRILL_QUESTIONS } from './advancedCaseDrillQuestions';
import { CALCULATION_CYCLE_1_CASES } from './calculationsCycle1';
import { CASE_JOURNEY_DRILLS } from './caseJourneys';
import { CASE_MATH_LIBRARY } from './caseMathLibrary';
import { CHARTS_EASY_RECORDS } from './chartsEasyBank';
import { CREATIVITY_CYCLE_2_CASES } from './creativityCycle2';
import { EXPERT_CASE_DRILL_QUESTIONS } from './expertCaseDrillQuestions';
import { EXPERT_CASE_EXPANSION } from './expertCaseExpansion';
import { HARD_CASE_DRILL_QUESTIONS } from './hardCaseDrillQuestions';
import { MARKET_SIZING_BANK_CASES } from './marketSizingBank';
import { MARKET_SIZING_CYCLE_3_CASES } from './marketSizingCycle3';
import { ALL_LIBRARY_QUESTIONS } from './skillQuestionLibrary';
import { STRUCTURES_EASY_RECORDS } from './structuresEasyBank';
import { auditUnitShorthand, blockingUnitShorthand, clarifyUnitLabel, clarifyUnitText, clarifyUnitsDeep, findUnitShorthand, sameUnitText } from './unitLabels';

function fail(message: string): never {
  throw new Error(`Unit labels: ${message}`);
}

function expectText(raw: string, expected: string) {
  const actual = clarifyUnitText(raw);
  if (actual !== expected) fail(`"${raw}" -> expected "${expected}", received "${actual}"`);
  if (clarifyUnitText(actual) !== actual) fail(`"${actual}" is not stable when clarified again`);
}

function expectLabel(raw: string, expected: string) {
  const actual = clarifyUnitLabel(raw);
  if (actual !== expected) fail(`label "${raw}" -> expected "${expected}", received "${actual}"`);
}

function digitsOf(text: string): string {
  return (text.match(/[\d.,+\-−]/g) || []).join('');
}

export function runUnitLabelTests(): void {
  expectText('127.2 VND bn', '127.2 billion VND');
  expectText('Revenue (VND bn)', 'Revenue (billion VND)');
  expectText('Business Line A: 79 × 24% = 18.96 VND bn; compare absolute contribution.', 'Business Line A: 79 × 24% = 18.96 billion VND; compare absolute contribution.');
  expectText('Q3: 46k × VND 155k = VND 7.13bn.', 'Q3: 46 thousand × 155 thousand VND = 7.13 billion VND.');
  expectText('VND 0.82m per store', '0.82 million VND per store');
  expectText('127.2bn VND', '127.2 billion VND');
  expectText('A budget of $3.5m', 'A budget of 3.5 million USD');
  expectText('USD 2bn deal', '2 billion USD deal');
  expectText('Price (VNDm)', 'Price (million VND)');
  expectText('Cost (bn VND)', 'Cost (billion VND)');
  expectText('Visits (000s)', 'Visits (thousand)');
  expectText("Price (VND '000)", 'Price (thousand VND)');
  expectText('Units (000 units)', 'Units (thousand units)');
  expectText('Figures in 000s', 'Figures in thousands');
  expectText('12 mn subscribers', '12 million subscribers');
  expectText('-6 VND bn', '-6 billion VND');
  expectText('Doanh thu đạt 127,2 ty VND', 'Doanh thu đạt 127,2 tỷ VND');
  expectText('Giá 155k mỗi hộp, chi phí 3 tr', 'Giá 155 nghìn mỗi hộp, chi phí 3 triệu');
  expectText('Doanh thu (VND bn) của cửa hàng', 'Doanh thu (tỷ VND) của cửa hàng');

  // Unchanged: full words, percent, pp, SI units, ids and ambiguous m.
  [
    '127.2 billion VND', 'VND million', 'VND 4.5 billion', '+4 pp', '24%', '120 m2 store', '50 m² floor', '3 km', '25 kg',
    'Q2 sales', 'E-CH-002', 'Option B', 'charts-easy-002-ex1', 'Store area 120 m', 'VND mix shift', 'USD market', 'kWh',
    '2.5x multiple', 'Tier B2B', 'Business Line B', 'Q4k', 'MAT (moving annual total)', '1,000 VND', '(1,000)', 'per 1,000 buyers',
  ].forEach((text) => {
    if (clarifyUnitText(text) !== text) fail(`"${text}" must stay unchanged, received "${clarifyUnitText(text)}"`);
  });

  ['127.2 VND bn', 'Q3: 46k × VND 155k = VND 7.13bn.', 'VND 0.82m', '$3.5m', 'Doanh thu 127,2 ty'].forEach((text) => {
    if (digitsOf(clarifyUnitText(text)) !== digitsOf(text)) fail(`"${text}" changed its digits`);
  });

  expectLabel('VND bn', 'billion VND');
  expectLabel('VND m', 'million VND');
  expectLabel('bn', 'billion');
  expectLabel('k', 'thousand');
  expectLabel('000s', 'thousand');
  expectLabel("'000", 'thousand');
  expectLabel('m', 'm');
  expectLabel('%', '%');
  expectLabel('VND million', 'VND million');
  expectLabel('', '');

  if (!sameUnitText('Q3: 46k × VND 155k = VND 7.13bn.', 'Q3: 46 thousand × 155 thousand VND = 7.13 billion VND.')) fail('old and clarified choice text must match');
  if (sameUnitText('Q3: 46k × VND 155k = VND 7.13bn.', 'Q2: 65 thousand × 139 thousand VND = 9.04 billion VND.')) fail('different choices must not match');

  const exhibit = { id: 'charts-easy-002-ex1', kind: 'grouped-bar', unit: 'VND bn', axisConfig: { yLabel: 'Revenue (VND bn)' }, series: [{ name: 'Revenue', values: [79, 36, 60], color: '#1d4ed8' }] };
  const clarified = clarifyUnitsDeep(exhibit);
  if (clarified.unit !== 'billion VND' || clarified.axisConfig.yLabel !== 'Revenue (billion VND)') fail('deep clarification must reach unit and axis labels');
  if (clarified.series[0].values !== exhibit.series[0].values || clarified.id !== exhibit.id) fail('deep clarification must keep values and ids');
  const clean = { unit: 'billion VND', title: 'Revenue' };
  if (clarifyUnitsDeep(clean) !== clean) fail('a clean record must be returned unchanged');

  const findings = findUnitShorthand('Revenue rose to 127.2 VND bn while the store is 120 m from the station.');
  if (!findings.some((item) => item.kind === 'shorthand' && item.suggestion === '127.2 billion VND')) fail('lint must flag "127.2 VND bn"');
  if (!findings.some((item) => item.kind === 'ambiguous' && item.text === '120 m')) fail('lint must list a bare "m" for a human decision');
  if (findUnitShorthand('Revenue rose to 127.2 billion VND.').length) fail('clean text must not be flagged');

  const audit = auditUnitShorthand([{ id: 'E-CH-002', record: exhibit }]);
  if (!audit.some((line) => line === 'E-CH-002 unit: "VND bn" -> "billion VND"')) fail(`audit must report unit fields: ${audit.join(' | ')}`);
  if (audit.some((line) => line.includes('charts-easy-002-ex1'))) fail('audit must skip ids');
}

function rawItems<T extends object>(records: readonly T[], idOf: (record: T) => string) {
  return records.map((record) => ({ id: idOf(record), record }));
}

/** Authoring lint over the stored banks: fixable shorthand fails, ambiguous items are listed for a human decision. */
export function runLibraryUnitAudit(): string[] {
  // ALL_LIBRARY_QUESTIONS and CASE_POOL_LIBRARY are already clarified by the learner-facing guard,
  // so shorthand left in stored content only shows up in the raw source banks.
  const items = [
    ...rawItems(CHARTS_EASY_RECORDS, (record) => record.code),
    ...rawItems(STRUCTURES_EASY_RECORDS, (record) => record.id),
    ...rawItems(MARKET_SIZING_CYCLE_3_CASES, (item) => item.sourceCaseId),
    ...rawItems(MARKET_SIZING_BANK_CASES, (item) => item.code),
    ...rawItems(CALCULATION_CYCLE_1_CASES, (item) => item.sourceCaseId),
    ...rawItems(CREATIVITY_CYCLE_2_CASES, (item) => item.sourceCaseId),
    ...rawItems([...ADVANCED_CASE_DRILL_QUESTIONS, ...HARD_CASE_DRILL_QUESTIONS, ...EXPERT_CASE_DRILL_QUESTIONS, ...EXPERT_CASE_EXPANSION, ...CASE_JOURNEY_DRILLS], (question) => question.id),
    ...rawItems(CASE_MATH_LIBRARY, (problem) => problem.id),
    ...rawItems(CASE_POOL_SOURCE_RECORDS, (item) => item.id),
    ...rawItems(ALL_LIBRARY_QUESTIONS, (question) => question.id),
    ...rawItems(CASE_POOL_LIBRARY, (item) => item.id),
  ];
  const blocking = blockingUnitShorthand(items);
  if (blocking.length) fail(`${blocking.length} unit shorthand finding(s) in stored content: ${blocking.slice(0, 8).join(' | ')}`);
  return auditUnitShorthand(items).filter((line) => line.startsWith('NEEDS DECISION'));
}

runUnitLabelTests();
runLibraryUnitAudit();
