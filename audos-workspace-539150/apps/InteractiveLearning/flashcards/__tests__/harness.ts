// Minimal, dependency-free test harness in the style of the workspace's existing *.test.ts files.
// Each suite file registers tests and awaits `suite.run()`; a failing assertion sets a non-zero
// exit code without stopping the remaining tests.

type TestFn = () => void | Promise<void>;

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function assertEqual<T>(actual: T, expected: T, message: string) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${message}\n    expected: ${e}\n    received: ${a}`);
}

export function assertClose(actual: number, expected: number, message: string, epsilon = 1e-9) {
  if (Math.abs(actual - expected) > epsilon) throw new Error(`${message}: expected ${expected}, received ${actual}`);
}

interface SuiteResult {
  name: string;
  passed: number;
  failed: number;
}

const proc = (globalThis as { process?: { exitCode?: number; env?: Record<string, string | undefined> } }).process;

export function createSuite(name: string) {
  const tests: Array<{ title: string; fn: TestFn }> = [];
  return {
    test(title: string, fn: TestFn) {
      tests.push({ title, fn });
    },
    async run(): Promise<SuiteResult> {
      let passed = 0;
      let failed = 0;
      console.log(`\n${name}`);
      for (const { title, fn } of tests) {
        try {
          await fn();
          passed += 1;
          console.log(`  ✓ ${title}`);
        } catch (error) {
          failed += 1;
          console.log(`  ✗ ${title}\n    ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      console.log(`  ${passed} passed, ${failed} failed`);
      if (failed && proc) proc.exitCode = 1;
      return { name, passed, failed };
    },
  };
}

export function env(key: string): string | undefined {
  return proc?.env?.[key];
}
