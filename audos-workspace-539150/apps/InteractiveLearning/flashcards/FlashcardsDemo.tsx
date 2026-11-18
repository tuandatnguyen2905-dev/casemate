// Standalone demo entry. Not registered in config.json and not imported by any existing app.
// It stores progress under its own learner scope (`casemate:flashcards:v1:demo`) and adds a
// "simulate time" control so spaced review can be checked without waiting days.

import React, { useMemo, useState } from 'react';
import SmartFlashcards from './components/SmartFlashcards';
import { createLocalStorageAdapter } from './persistence';
import { DAY_MS } from './scheduler';

export const DEMO_LEARNER_KEY = 'demo';

export default function FlashcardsDemo() {
  const [offsetDays, setOffsetDays] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const adapter = useMemo(() => createLocalStorageAdapter({ learnerKey: DEMO_LEARNER_KEY }), [resetCount]);
  const clock = useMemo(() => () => Date.now() + offsetDays * DAY_MS, [offsetDays]);

  const toolbar = (
    <div className="cmfc-deck-actions" aria-label="Demo controls" role="group">
      <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={() => setOffsetDays((days) => days + 1)}>
        Simulate +1 day
      </button>
      <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={() => setOffsetDays((days) => days + 7)}>
        Simulate +7 days
      </button>
      <button
        type="button"
        className="cmfc-btn cmfc-btn-ghost"
        onClick={() => {
          adapter.clear();
          setOffsetDays(0);
          setResetCount((count) => count + 1);
        }}
      >
        Reset demo progress
      </button>
      <span className="cmfc-small cmfc-text-muted" style={{ alignSelf: 'center' }}>
        Demo clock: {offsetDays === 0 ? 'today' : `+${offsetDays} day${offsetDays === 1 ? '' : 's'}`}
      </span>
    </div>
  );

  return <SmartFlashcards key={`${resetCount}:${offsetDays}`} adapter={adapter} clock={clock} toolbar={toolbar} />;
}
