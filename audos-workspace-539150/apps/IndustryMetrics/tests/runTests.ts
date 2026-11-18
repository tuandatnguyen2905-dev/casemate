// Runner: `npx tsx apps/IndustryMetrics/tests/runTests.ts` (any TypeScript runner works).
import { runMetricsTests } from './metricsTests';
import { runReviewTests } from './reviewTests';

const results = [...runMetricsTests(), ...runReviewTests()];
let failed = 0;
let assertions = 0;
for (const result of results) {
  assertions += result.assertions;
  if (!result.passed) failed += 1;
  console.log(`${result.passed ? 'PASS' : 'FAIL'}  ${result.name} (${result.assertions} assertions)`);
  for (const failure of result.failures.slice(0, 20)) console.log(`      - ${failure}`);
}
console.log(`\n${results.length - failed}/${results.length} tests passed, ${assertions} assertions.`);
const runtime = globalThis as unknown as { process?: { exitCode?: number } };
if (failed > 0 && runtime.process) runtime.process.exitCode = 1;
