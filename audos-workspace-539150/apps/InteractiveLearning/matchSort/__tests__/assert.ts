export function ok(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

export function eq<T>(actual: T, expected: T, message: string) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`Assertion failed: ${message}\n  expected ${e}\n  received ${a}`);
}

export interface TestCase {
  name: string;
  run: () => void | Promise<void>;
}

export async function runSuite(suite: string, cases: TestCase[]) {
  const failures: string[] = [];
  for (const test of cases) {
    try {
      await test.run();
      console.log(`  ✓ ${suite} › ${test.name}`);
    } catch (error) {
      failures.push(`${suite} › ${test.name}: ${(error as Error).message}`);
      console.log(`  ✗ ${suite} › ${test.name}`);
    }
  }
  if (failures.length) throw new Error(`${failures.length} of ${cases.length} ${suite} tests failed:\n${failures.join('\n')}`);
  return cases.length;
}
