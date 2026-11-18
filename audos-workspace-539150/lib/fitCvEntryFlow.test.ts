import { resolveFitCvEntryView } from './fitCvEntryFlow';

function expectView(actual: ReturnType<typeof resolveFitCvEntryView>, expected: ReturnType<typeof resolveFitCvEntryView>, scenario: string) {
  if (actual !== expected) throw new Error(`${scenario}: expected ${expected}, received ${actual}`);
}

export function runFitCvEntryFlowRegressionTests() {
  expectView(
    resolveFitCvEntryView({ step: 1, cvReady: false, chooserVisible: false, showPaste: true }),
    'paste',
    'choosing Paste Your CV opens the paste-entry view',
  );
  expectView(
    resolveFitCvEntryView({ step: 1, cvReady: true, chooserVisible: false, showPaste: true }),
    'confirmation',
    'a successfully parsed pasted CV opens confirmation',
  );
  expectView(
    resolveFitCvEntryView({ step: 1, cvReady: false, chooserVisible: true, showPaste: true }),
    'chooser',
    'an explicitly opened chooser takes precedence',
  );
}

runFitCvEntryFlowRegressionTests();
