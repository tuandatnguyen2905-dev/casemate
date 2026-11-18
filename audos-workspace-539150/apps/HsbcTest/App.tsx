// Casemate — HSBC online assessment: answer key, as its own dock app.
//
// Items are screenshots of the interactive HSBC questions with the correct answer
// drawn in. Data lives in data/hsbc-key.json and is drawn by components/HsbcAnswerKey.tsx.

import PaywallGate from '../../components/PaywallGate';
import HsbcAnswerKey from '../../components/HsbcAnswerKey';

export default function HsbcTest() {
  return (
    <PaywallGate appId="aptitude-simulation" appName="HSBC Test">
      <div className="min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
        <div className="mx-auto w-full max-w-5xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <HsbcAnswerKey />
        </div>
      </div>
    </PaywallGate>
  );
}
