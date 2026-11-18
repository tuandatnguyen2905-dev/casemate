// Casemate — Shopee round 1 test: answer key, as its own dock app.
//
// Items collected from a screen recording of the Shopee first-round online test.
// Data lives in data/shopee-key.json and is drawn by components/ScreenshotAnswerKey.tsx.

import PaywallGate from '../../components/PaywallGate';
import ScreenshotAnswerKey from '../../components/ScreenshotAnswerKey';
import type { KeyConfig, KeyData } from '../../components/ScreenshotAnswerKey';
import shopeeKey from '../../data/shopee-key.json';

const SHOPEE_CONFIG: KeyConfig = {
  eyebrow: 'Shopee round 1 test',
  heading: 'Answer key: {count} items',
  kindLabels: {
    num: 'Numerical reasoning',
    verb: 'Verbal reasoning',
    integ: 'Integrated reasoning',
    logic: 'Logical sequences',
  },
  kindOrder: ['num', 'verb', 'integ', 'logic'],
  testId: 'shopee',
};

export default function ShopeeTest() {
  return (
    <PaywallGate appId="aptitude-simulation" appName="Shopee Test">
      <div className="min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-5xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <ScreenshotAnswerKey data={shopeeKey as unknown as KeyData} config={SHOPEE_CONFIG} />
        </div>
      </div>
    </PaywallGate>
  );
}
