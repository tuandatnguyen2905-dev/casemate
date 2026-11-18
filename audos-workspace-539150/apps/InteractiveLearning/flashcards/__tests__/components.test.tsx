// Interaction tests for the flashcard UI in a jsdom window. React DOM is imported only after the
// DOM is installed, because react-dom decides at load time whether a DOM is available.

import type { ReactElement } from 'react';
import type { FlashcardDeckContent } from '../models';
import type { FlashcardPersistenceAdapter } from '../persistence';
import { installDom } from './domEnvironment';
import { assert, assertEqual, createSuite } from './harness';

type Adapter = FlashcardPersistenceAdapter;

export const completed = (async () => {
await installDom();

const React = (await import('react')).default;
const { createRoot } = await import('react-dom/client');
const { flushSync } = await import('react-dom');
const { default: SmartFlashcards } = await import('../components/SmartFlashcards');
const { COMMERCIAL_BANKING_FUNDAMENTALS: CB, FLASHCARD_DECKS } = await import('../decks');
const { createMemoryAdapter, FLASHCARD_STORAGE_KEY } = await import('../persistence');
const { createManualClock, DAY_MS, MINUTE_MS, applyRating, initialReviewState } = await import('../scheduler');

const suite = createSuite('components (jsdom): study, reveal, rate, review');
const T0 = '2026-11-07T09:00:00.000Z';

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const mounted = new Set<() => void>();

function mount(element: ReactElement) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  flushSync(() => root.render(element));
  const unmount = () => {
    if (!mounted.delete(unmount)) return;
    root.unmount();
    container.remove();
  };
  mounted.add(unmount);
  return { container, unmount };
}

/** Every UI test unmounts what it mounted, even when an assertion fails. */
const uiTest = (title: string, fn: () => void | Promise<void>) =>
  suite.test(title, async () => {
    try {
      await fn();
    } finally {
      Array.from(mounted).forEach((unmount) => unmount());
    }
  });

async function click(element: Element | null | undefined) {
  assert(element, 'element to click exists');
  assert(!(element as HTMLButtonElement).disabled, `button "${element.textContent?.trim()}" is enabled`);
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await tick();
}

async function press(key: string, target: Element = document.body) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  await tick();
}

const q = (root: ParentNode, testId: string) => root.querySelector(`[data-testid="${testId}"]`);
const button = (root: ParentNode, text: string) =>
  Array.from(root.querySelectorAll('button')).find((item) => (item.textContent ?? '').replace(/\s+/g, ' ').trim().startsWith(text)) ?? null;
const labelled = (root: ParentNode, label: string) => root.querySelector(`button[aria-label^="${label}"]`);
const frontId = (root: ParentNode) => q(root, 'flashcard-front')?.getAttribute('data-card-id') ?? null;
const historyLength = (adapter: Adapter, cardId: string) => adapter.load().cards[cardId]?.reviewHistory.length ?? 0;

function setup(options: { adapter?: Adapter; decks?: FlashcardDeckContent[] } = {}) {
  const adapter = options.adapter ?? createMemoryAdapter();
  const clock = createManualClock(T0);
  const view = mount(<SmartFlashcards adapter={adapter} clock={clock} decks={options.decks} />);
  return { ...view, adapter, clock };
}

uiTest('deck selection lists every registered deck, originals first, with counts and no card content', () => {
  const { container, unmount } = setup();
  const decks = container.querySelectorAll('[data-testid="flashcard-deck"]');
  assertEqual(Array.from(decks).map((deck) => deck.getAttribute('data-deck-id')), FLASHCARD_DECKS.map((deck) => deck.deckId), 'deck tiles');
  assertEqual(Array.from(decks).slice(0, 2).map((deck) => deck.getAttribute('data-deck-id')), ['commercial-banking-fundamentals', 'consumer-finance-fundamentals'], 'original decks first');
  assert((decks[0].textContent ?? '').includes('14 cards'), 'card count shown');
  assert(!(container.textContent ?? '').includes(CB.cards[0].back), 'no answers on the deck screen');
  unmount();
});

uiTest('before flip only the front exists: no answer text, no answer region, no rating controls', async () => {
  const { container, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  const first = CB.cards[0];
  assertEqual(frontId(container), first.cardId, 'first card shown');
  assert((q(container, 'flashcard-front')?.textContent ?? '').includes(first.front), 'front text visible');
  const all = document.body.textContent ?? '';
  [first.back, first.explanation, first.practicalExample].forEach((text) => assert(!all.includes(text), `answer content must not be in the DOM: "${text.slice(0, 40)}…"`));
  assertEqual(container.querySelector('[role="region"][aria-label="Answer"]'), null, 'no accessible answer region');
  assertEqual(q(container, 'recall-rating'), null, 'rating controls hidden before reveal');
  unmount();
});

uiTest('clicking the card flips it: answer, explanation, example, source and rating controls appear', async () => {
  const { container, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  await click(q(container, 'flashcard-front'));
  const back = q(container, 'flashcard-back');
  assert(back, 'answer side rendered');
  const first = CB.cards[0];
  [first.back, first.explanation, first.practicalExample, 'Chapter 1: What Is Commercial Banking?'].forEach((text) => assert((back.textContent ?? '').includes(text), `back shows "${text.slice(0, 40)}…"`));
  assert(document.activeElement === back, 'focus moves to the answer');
  assertEqual(container.querySelectorAll('[data-testid="recall-rating"] button').length, 4, 'four rating buttons');
  await click(back);
  assert(q(container, 'flashcard-front') && !q(container, 'flashcard-back'), 'clicking the answer flips back to the question');
  unmount();
});

uiTest('Previous / Next move between cards and reset the flip', async () => {
  const { container, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  assert(button(container, 'Previous')?.disabled, 'Previous disabled on the first card');
  await click(q(container, 'flashcard-front'));
  await click(button(container, 'Next'));
  assertEqual(frontId(container), CB.cards[1].cardId, 'Next shows card 2 face down');
  assert((q(container, 'session-progress')?.textContent ?? '').includes('Card 2 of 14'), 'progress indicator updates');
  await click(button(container, 'Previous'));
  assertEqual(frontId(container), CB.cards[0].cardId, 'Previous returns to card 1');
  unmount();
});

uiTest('a rating updates and persists the review schedule, then advances', async () => {
  const { container, adapter, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  await click(q(container, 'flashcard-front'));
  await click(container.querySelector('button[data-rating="good"]'));
  const saved = adapter.load().cards[CB.cards[0].cardId];
  assert(saved, 'review state persisted');
  assertEqual(saved.state, 'learning', 'state');
  assertEqual(saved.schedule.intervalDays, 2, 'Good on a new card schedules 2 days');
  assertEqual(saved.schedule.dueAt, new Date(Date.parse(T0) + 2 * DAY_MS).toISOString(), 'due time from the injected clock');
  assertEqual(frontId(container), CB.cards[1].cardId, 'advances to the next card');
  assert((q(container, 'session-announcement')?.textContent ?? '').includes('Rated Good. Next review in 2 days.'), 'screen-reader announcement');
  unmount();
});

uiTest('double submission is ignored (two clicks or two key presses before re-render)', async () => {
  const { container, adapter, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  await click(q(container, 'flashcard-front'));
  const good = container.querySelector('button[data-rating="good"]') as HTMLButtonElement;
  good.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  good.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await tick();
  assertEqual(historyLength(adapter, CB.cards[0].cardId), 1, 'one rating recorded for card 1');
  assertEqual(historyLength(adapter, CB.cards[1].cardId), 0, 'card 2 not rated by the second click');
  assertEqual(frontId(container), CB.cards[1].cardId, 'advanced exactly one card');

  await press(' ');
  document.body.dispatchEvent(new KeyboardEvent('keydown', { key: '3', bubbles: true }));
  document.body.dispatchEvent(new KeyboardEvent('keydown', { key: '3', bubbles: true }));
  await tick();
  assertEqual(historyLength(adapter, CB.cards[1].cardId), 1, 'one rating recorded for card 2');
  assertEqual(historyLength(adapter, CB.cards[2].cardId), 0, 'card 3 untouched');
  unmount();
});

uiTest('keyboard: Space/Enter flip, arrows move, 1–4 rate only after reveal, inputs are ignored', async () => {
  const { container, adapter, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  (document.activeElement as HTMLElement | null)?.blur();
  await press('1');
  assertEqual(historyLength(adapter, CB.cards[0].cardId), 0, 'rating keys do nothing before reveal');
  await press(' ');
  assert(q(container, 'flashcard-back'), 'Space flips');
  await press(' ');
  assert(q(container, 'flashcard-front'), 'Space flips back');
  await press('ArrowRight');
  assertEqual(frontId(container), CB.cards[1].cardId, 'ArrowRight → next');
  await press('ArrowLeft');
  assertEqual(frontId(container), CB.cards[0].cardId, 'ArrowLeft → previous');
  (document.activeElement as HTMLElement | null)?.blur();
  await press('Enter');
  assert(q(container, 'flashcard-back'), 'Enter flips');
  await press('4');
  assertEqual(adapter.load().cards[CB.cards[0].cardId]?.reviewHistory[0]?.rating, 'easy', '4 = Easy');
  const input = document.createElement('input');
  container.appendChild(input);
  await press(' ', input);
  assert(q(container, 'flashcard-front'), 'typing in an input does not flip the card');
  unmount();
});

uiTest('a focused card flips exactly once on Space or Enter (no double flip)', async () => {
  const { container, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  const front = q(container, 'flashcard-front') as HTMLElement;
  front.focus();
  await press(' ', front);
  assert(q(container, 'flashcard-back'), 'the card handles Space itself and the window handler does not flip it back');
  await press('Enter', q(container, 'flashcard-back')!);
  assert(q(container, 'flashcard-front'), 'Enter flips it back, once');
  unmount();
});

uiTest('rating every card completes the deck and shows the review summary', async () => {
  const { container, adapter, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  for (let i = 0; i < CB.cards.length; i += 1) {
    (document.activeElement as HTMLElement | null)?.blur();
    await press(' ');
    await press('3');
  }
  const summary = q(container, 'review-summary');
  assert(summary, 'summary shown');
  const text = summary.textContent ?? '';
  assert(text.includes('Session complete') && text.includes('You rated 14 of 14 cards'), `summary text: ${text.slice(0, 120)}`);
  assertEqual(Object.keys(adapter.load().cards).length, 14, 'all 14 cards scheduled');
  await click(button(container, 'All decks'));
  assert((container.querySelector('[data-deck-id="commercial-banking-fundamentals"]')?.textContent ?? '').includes('0 new'), 'deck tile reflects progress');
  unmount();
});

uiTest('Review Mode: forgotten cards come back first, and Again re-queues them within the session', async () => {
  const { container, clock, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  for (let i = 0; i < CB.cards.length; i += 1) {
    (document.activeElement as HTMLElement | null)?.blur();
    await press(' ');
    await press(i === 0 ? '1' : '3');
  }
  assert(button(container, 'Review difficult cards (1)'), 'summary offers the difficult card');
  await click(button(container, 'All decks'));
  await click(labelled(container, 'Review Commercial Banking'));
  assert(q(container, 'nothing-due'), 'nothing due before the relearn step has elapsed');
  assert(button(container, 'Retry weak concepts (1)'), 'weak concepts remain available');

  clock.advance(11 * MINUTE_MS);
  await click(button(container, 'All decks'));
  await click(labelled(container, 'Review Commercial Banking Fundamentals, 1 due'));
  assertEqual(q(container, 'flashcard-session')?.getAttribute('data-mode'), 'review', 'review session');
  assertEqual(frontId(container), CB.cards[0].cardId, 'the forgotten card is first');
  assert((container.textContent ?? '').includes('Forgotten last time'), 'reason shown');
  await press(' ');
  await press('1');
  assertEqual(frontId(container), CB.cards[0].cardId, 'Again brings it back in the same session');
  assert((container.textContent ?? '').includes('Shown again this session'), 'repeat marked');
  assert((q(container, 'session-progress')?.textContent ?? '').includes('Card 2 of 2'), 'queue grew by one');
  await press(' ');
  await press('3');
  assert((q(container, 'review-summary')?.textContent ?? '').includes('You rated 1 of 1 card'), 'review session completes; the card shown again is counted once');

  clock.advanceDays(3);
  await click(button(container, 'All decks'));
  assert(labelled(container, 'Review Commercial Banking Fundamentals, 14 due'), 'every studied card comes due on schedule');
  unmount();
});

uiTest('empty states: no decks, a deck without validated cards, and invalid decks are withheld', async () => {
  const none = setup({ decks: [] });
  assert(q(none.container, 'no-decks'), 'no-decks state');
  none.unmount();

  const empty = setup({ decks: [{ ...CB, deckId: 'empty-deck', cards: [] }] });
  assert((empty.container.textContent ?? '').includes('no validated cards yet'), 'empty deck message');
  assert(labelled(empty.container, 'Study Commercial Banking')?.hasAttribute('disabled'), 'study disabled for an empty deck');
  empty.unmount();

  const broken = setup({ decks: [{ ...CB, cards: [{ ...CB.cards[0], chapterId: 'missing-chapter' }] }] });
  assert(q(broken.container, 'no-decks'), 'a deck with a broken chapter mapping is not shown');
  broken.unmount();
});

uiTest('progress survives a remount with the same adapter', async () => {
  const adapter = createMemoryAdapter();
  const first = setup({ adapter });
  await click(labelled(first.container, 'Study Commercial Banking'));
  await press(' ');
  await press('3');
  first.unmount();
  const second = setup({ adapter });
  assert((second.container.querySelector('[data-deck-id="commercial-banking-fundamentals"]')?.textContent ?? '').includes('13 new'), 'previous rating restored');
  second.unmount();
});

uiTest('default adapter persists to the feature key in localStorage only', async () => {
  localStorage.clear();
  localStorage.setItem('casemate:domain-lesson-progress:v1', '{"keep":true}');
  const view = mount(<SmartFlashcards clock={createManualClock(T0)} />);
  await click(labelled(view.container, 'Study Commercial Banking'));
  await press(' ');
  await press('2');
  const stored = JSON.parse(localStorage.getItem(FLASHCARD_STORAGE_KEY) ?? '{}');
  assertEqual(stored.cards?.[CB.cards[0].cardId]?.reviewHistory?.[0]?.rating, 'hard', 'rating stored under casemate:flashcards:v1');
  assertEqual(localStorage.getItem('casemate:domain-lesson-progress:v1'), '{"keep":true}', 'existing progress untouched');
  assertEqual(Object.keys(localStorage).sort(), ['casemate:domain-lesson-progress:v1', FLASHCARD_STORAGE_KEY].sort(), 'no other keys');
  view.unmount();
});

uiTest('the Reveal answer button flips the card, then gives way to the rating controls', async () => {
  const { container, unmount } = setup();
  await click(labelled(container, 'Study Commercial Banking'));
  assert(q(container, 'reveal-answer'), 'Reveal answer is offered on the question side');
  assertEqual(q(container, 'recall-rating'), null, 'no rating controls yet');
  await click(q(container, 'reveal-answer'));
  assert(q(container, 'flashcard-back') && q(container, 'recall-rating'), 'answer and rating controls shown');
  assertEqual(q(container, 'reveal-answer'), null, 'the button is gone once the answer is shown');
  await click(q(container, 'flashcard-back'));
  assert(q(container, 'reveal-answer') && !q(container, 'flashcard-back'), 'flipping back offers it again');
  unmount();
});

uiTest('sessionLimit caps Study and Review sessions, and Study takes cards not yet studied first', async () => {
  const clock = createManualClock(T0);
  const first = mount(<SmartFlashcards adapter={createMemoryAdapter()} clock={clock} sessionLimit={5} />);
  await click(labelled(first.container, 'Study Commercial Banking'));
  assert((q(first.container, 'session-progress')?.textContent ?? '').includes('Card 1 of 5'), 'Study takes 5 of the 14 cards');
  for (let i = 0; i < 5; i += 1) {
    await press(' ');
    await press('3');
  }
  assert((q(first.container, 'review-summary')?.textContent ?? '').includes('You rated 5 of 5 cards'), 'session of five completes');
  await click(button(first.container, 'Study more cards'));
  assertEqual(frontId(first.container), CB.cards[5].cardId, 'the next session starts with the first card not studied yet');
  assert((q(first.container, 'session-progress')?.textContent ?? '').includes('Card 1 of 5'), 'and is capped too');
  first.unmount();

  const dueAt = clock() - 3 * DAY_MS;
  const states = CB.cards.map((card) => applyRating(initialReviewState(card.cardId, card.deckId), 'good', dueAt));
  const seeded = createMemoryAdapter({ schemaVersion: 1, cards: Object.fromEntries(states.map((state) => [state.cardId, state])), updatedAt: new Date(dueAt).toISOString() });
  const second = mount(<SmartFlashcards adapter={seeded} clock={clock} sessionLimit={5} />);
  await click(labelled(second.container, 'Review Commercial Banking Fundamentals, 14 due'));
  assert((q(second.container, 'session-progress')?.textContent ?? '').includes('Card 1 of 5'), 'Review takes 5 of the 14 due cards');
  second.unmount();
});

uiTest('a host overview replaces the deck list and receives the stats, the session limit and the start actions', async () => {
  const seen: Array<{ total: number; limit: number | null; deckId: string }> = [];
  const changes: boolean[] = [];
  const view = mount(
    <SmartFlashcards
      embedded
      prevalidated
      decks={[CB]}
      adapter={createMemoryAdapter()}
      clock={createManualClock(T0)}
      sessionLimit={5}
      backLabel="Back to deck overview"
      onViewChange={(inSession) => changes.push(inSession)}
      renderOverview={(api) => {
        seen.push({ total: api.stats.total, limit: api.sessionLimit, deckId: api.deck.deckId });
        return <button type="button" data-testid="host-study" onClick={api.startStudy}>Host study</button>;
      }}
    />,
  );
  assertEqual(view.container.querySelectorAll('[data-testid="flashcard-deck"]').length, 0, 'no deck tiles');
  assertEqual(view.container.querySelector('h1'), null, 'no standalone header when embedded');
  assertEqual(seen[0], { total: 14, limit: 5, deckId: CB.deckId }, 'the overview gets the deck, its stats and the limit');
  await click(q(view.container, 'host-study'));
  assert(q(view.container, 'flashcard-session'), 'the host action starts a session');
  assert((q(view.container, 'session-progress')?.textContent ?? '').includes('Card 1 of 5'), 'capped');
  assert(changes.includes(true), 'the host is told a session is open');
  await click(q(view.container, 'flashcards-session-back'));
  assert(q(view.container, 'host-study'), 'the host overview returns');
  assertEqual(changes[changes.length - 1], false, 'and the host is told the session closed');
  view.unmount();
});

return suite.run();
})();
