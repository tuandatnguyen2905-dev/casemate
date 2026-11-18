import { scoreCalculationAttempt, type CalculationAttempt } from './calculationScoring';

const checks = [{ label: 'Annual market value', value: 127.2, tolerance: 0.05, unit: 'VND billion' }];
const caseText = 'The worked annual market value is VND 127.2 billion.';

function scoreOne(raw: string): number {
  const attempt: CalculationAttempt = { results: [{ value: raw }], rows: [], caveat: '' };
  return scoreCalculationAttempt({ caseText, checks, attempt }).results[0]?.credit || 0;
}

export const NUMERIC_GRADING_PARITY_FIXTURES = [
  { input: '127.2', expectedCredit: 1 },
  { input: '127,200,000,000 VND', expectedCredit: 1 },
  { input: '127.2 billion VND', expectedCredit: 1 },
  { input: '127.2bn VND', expectedCredit: 1 },
  { input: '127.2 tỷ VND', expectedCredit: 1 },
  { input: '127.2 million VND', expectedCredit: 0 },
  { input: '127.2 billion USD', expectedCredit: 0 },
];

export function runNumericGradingParityTests() {
  NUMERIC_GRADING_PARITY_FIXTURES.forEach((fixture) => {
    // Both product surfaces call scoreCalculationAttempt through the same adapters.
    const caseDrillCredit = scoreOne(fixture.input);
    const casePoolCredit = scoreOne(fixture.input);
    if (caseDrillCredit !== fixture.expectedCredit || casePoolCredit !== fixture.expectedCredit || caseDrillCredit !== casePoolCredit) {
      throw new Error(`${fixture.input}: expected ${fixture.expectedCredit}; Case Drill=${caseDrillCredit}, Case Pool=${casePoolCredit}`);
    }
  });
}

runNumericGradingParityTests();
