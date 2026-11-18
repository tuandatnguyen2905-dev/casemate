// Casemate — PepsiCo online test: answer key, as its own dock app.
//
// 35 items transcribed from screenshots of the PepsiCo form (charts, tables,
// verbal and logical sequences). Data lives in data/pepsico-key.json and is drawn
// by components/ScreenshotAnswerKey.tsx.

import PaywallGate from '../../components/PaywallGate';
import ScreenshotAnswerKey from '../../components/ScreenshotAnswerKey';
import type { KeyConfig, KeyData } from '../../components/ScreenshotAnswerKey';
import pepsicoKey from '../../data/pepsico-key.json';

const PEPSICO_CONFIG: KeyConfig = {
  eyebrow: 'PepsiCo online test',
  heading: 'Answer key: {count} items',
  kindLabels: {
    chart: 'Charts',
    table: 'Tables',
    verb: 'Verbal reasoning',
    logic: 'Logical reasoning',
  },
  kindOrder: ['chart', 'table', 'verb', 'logic'],
  testId: 'pepsico',
};

export default function PepsicoTest() {
  return (
    <PaywallGate appId="aptitude-simulation" appName="PepsiCo Test">
      <div className="min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-5xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <ScreenshotAnswerKey data={pepsicoKey as unknown as KeyData} config={PEPSICO_CONFIG} />
        </div>
      </div>
    </PaywallGate>
  );
}
