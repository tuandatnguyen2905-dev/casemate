// Sprint 04B: click-anywhere flip, recall that is optional, and a Session Complete screen whose counts keep
// Viewed, Rated and Mastered apart. Runs in jsdom with a small inline deck, so it needs no deck registry.

import type { ReactElement } from 'react';
import type { FlashcardContent, FlashcardDeckContent } from '../models';
import type { SummaryLessonActions } from '../components/ReviewSummary';
import { installDom } from './domEnvironment';
import { assert, assertEqual, createSuite } from './harness';

const T0 = '2026-11-16T09:00:00.000Z';
const CARD_IDS = ['s04b-alpha', 's04b-bravo', 's04b-charlie', 's04b-delta'];

const card = (cardId: string, position: number): FlashcardContent => ({
  cardId,
  deckId: 's04b-deck',
  industryId: 'test-industry',
  moduleId: 'm1',
  lessonId: 'l1',
  chapterId: 's04b-ch1',
  front: `Question ${position + 1}: what does ${cardId} mean?`,
  back: `Answer ${position + 1} for ${cardId}.`,
  explanation: `Explanation ${position + 1}.`,
  practicalExample: `Example ${position + 1}.`,
  keyTerms: [`Term ${position + 1}`],
  sourceRefs: [],
});

export const DECK: FlashcardDeckContent = {
  deckId: 's04b-deck',
  title: 'Sprint 04B deck',
  description: 'Fixture',
  industryId: 'test-industry',
  industryLabel: 'Test Industry',
  moduleId: 'm1',
  moduleLabel: 'Module 1',
  lessonId: 'l1',
  lessonTitle: 'Lesson 1',
  source: { file: 'fixture', moduleKey: 'FIXTURE', lessonTitle: 'Lesson 1', startMarker: '', endMarker: '', chapterMarker: '', readAtSha256: '', readAt: '' },
  chapters: [{ chapterId: 's04b-ch1', number: 1, title: 'Fixture chapter', sourceTitle: 'Fixture chapter' }],
  cards: CARD_IDS.map(card),
  contentStatus: 'fixture',
  mappingNotes: [],
};

export const completed = (async () => {
  await installDom();

  const React = (await import('react')).default;
  const { createRoot } = await import('react-dom/client');
  const { flushSync } = await import('react-dom');
  const { default: SmartFlashcards } = await import('../components/SmartFlashcards');
  const { createMemoryAdapter } = await import('../persistence');
  const { applyRating, createManualClock, DAY_MS, initialReviewState } = await import('../scheduler');
  const { summariseSession } = await import('../sessionSummary');

  const suite = createSuite('Sprint 04B (jsdom): click to flip, optional recall, session complete');
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

  const uiTest = (title: string, fn: () => void | Promise<void>) => suite.test(title, async () => {
    try {
      await fn();
    } finally {
      Array.from(mounted).forEach((unmount) => unmount());
    }
  });

  async function click(element: Element | null | undefined) {
    assert(element, 'element to click exists');
    assert(!(element as HTMLButtonElement).disabled, `"${element.textContent?.trim()}" is enabled`);
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await tick();
  }
  async function press(key: string, target: Element = document.body, init: KeyboardEventInit = {}) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }));
    await tick();
  }
  const q = (root: ParentNode, testId: string) => root.querySelector(`[data-testid="${testId}"]`);
  const cardEl = (root: ParentNode) => root.querySelector('.cmfc-card') as HTMLElement | null;
  const face = (root: ParentNode) => cardEl(root)?.getAttribute('data-face') ?? null;
  const shownId = (root: ParentNode) => cardEl(root)?.getAttribute('data-card-id') ?? null;
  const textOf = (root: ParentNode, testId: string) => (q(root, testId)?.textContent ?? '').replace(/\s+/g, ' ').trim();
  const button = (root: ParentNode, text: string) => Array.from(root.querySelectorAll('button')).find((node) => (node.textContent ?? '').replace(/\s+/g, ' ').trim().startsWith(text)) ?? null;

  function setup(options: { adapter?: ReturnType<typeof createMemoryAdapter>; lessonActions?: SummaryLessonActions; start?: 'study' | 'review' } = {}) {
    const adapter = options.adapter ?? createMemoryAdapter();
    const clock = createManualClock(T0);
    const view = mount(
      <SmartFlashcards
        embedded
        prevalidated
        decks={[DECK]}
        adapter={adapter}
        clock={clock}
        backLabel="Back to Flashcards overview"
        lessonActions={options.lessonActions}
        renderOverview={(api) => (
          <>
            <button type="button" data-testid="start-study" onClick={api.startStudy}>Study</button>
            <button type="button" data-testid="start-review" onClick={api.startReview}>Review</button>
          </>
        )}
      />,
    );
    return { ...view, adapter, clock };
  }
  async function study(options: Parameters<typeof setup>[0] = {}) {
    const ctx = setup(options);
    await click(q(ctx.container, options.start === 'review' ? 'start-review' : 'start-study'));
    return ctx;
  }

  uiTest('UXB-01 clicking anywhere on the question face reveals the answer, once', async () => {
    const { container } = await study();
    assertEqual(face(container), 'question', 'starts on the question');
    assert(!(document.body.textContent ?? '').includes(DECK.cards[0].back), 'answer not in the DOM before the flip');
    await click(container.querySelector('.cmfc-prompt'));
    assertEqual(face(container), 'answer', 'a click on the prompt text flips the card');
    assert(q(container, 'flashcard-back') && (q(container, 'flashcard-back')?.textContent ?? '').includes(DECK.cards[0].back), 'answer shown');
    assert(q(container, 'recall-rating'), 'ratings appear with the answer');
    assert(document.activeElement === cardEl(container), 'focus stays on the card');
  });

  uiTest('UXB-02 clicking anywhere on the answer face returns to the question; one click is one flip', async () => {
    const { container } = await study();
    await click(cardEl(container));
    await click(container.querySelector('.cmfc-detail-text'));
    assertEqual(face(container), 'question', 'a click on the explanation text flips back');
    await click(cardEl(container));
    assertEqual(face(container), 'answer', 'third click: answer again');
    assertEqual(shownId(container), CARD_IDS[0], 'deck position kept while flipping');
    assert((q(container, 'session-progress')?.textContent ?? '').includes('Card 1 of 4'), 'still card 1');
  });

  uiTest('UXB-03 embedded controls never flip the card, and the card holds no nested controls', async () => {
    const { container, adapter } = await study();
    const surface = cardEl(container)!;
    assertEqual(surface.getAttribute('role'), 'button', 'the card is one control');
    assertEqual(surface.getAttribute('tabindex'), '0', 'and is focusable');
    assertEqual(surface.querySelectorAll('button, a, input, select, textarea, [tabindex]').length, 0, 'no nested interactive elements');
    await click(q(container, 'reveal-answer'));
    assertEqual(face(container), 'answer', 'Reveal answer flips exactly once');
    await click(container.querySelector('button[data-rating="good"]'));
    assertEqual([shownId(container), face(container)], [CARD_IDS[1], 'question'], 'a rating advances to the next card face down (it does not flip the card)');
    await click(cardEl(container));
    await click(q(container, 'session-previous'));
    assertEqual([shownId(container), face(container)], [CARD_IDS[0], 'question'], 'Previous moves without flipping');
    await click(q(container, 'session-next'));
    assertEqual([shownId(container), face(container)], [CARD_IDS[1], 'question'], 'Next moves without flipping');
    const injected = document.createElement('button');
    injected.type = 'button';
    injected.textContent = 'Source link';
    cardEl(container)!.appendChild(injected);
    await click(injected);
    assertEqual(face(container), 'question', 'a control placed on the card keeps its own click');
    injected.remove();
    assertEqual(adapter.load().cards[CARD_IDS[1]], undefined, 'no control rated card 2 by accident');
  });

  uiTest('UXB-04 keyboard: Enter / Space flip a focused card exactly once; held keys do not repeat', async () => {
    const { container } = await study();
    const surface = cardEl(container)!;
    surface.focus();
    await press(' ', surface);
    assertEqual(face(container), 'answer', 'Space on the focused card flips once (the window handler does not flip it again)');
    await press('Enter', surface);
    assertEqual(face(container), 'question', 'Enter flips back');
    await press('Enter', surface, { repeat: true });
    assertEqual(face(container), 'question', 'auto-repeat is ignored');
    (document.activeElement as HTMLElement | null)?.blur();
    await press(' ');
    assertEqual(face(container), 'answer', 'Space with nothing focused still flips the card');
  });

  uiTest('UXB-05 / UXB-06 Next and Previous work without a rating and record nothing', async () => {
    const { container, adapter } = await study();
    await click(q(container, 'session-next'));
    assertEqual(shownId(container), CARD_IDS[1], 'Next from an unflipped, unrated card');
    await click(cardEl(container));
    await click(q(container, 'session-next'));
    assertEqual(shownId(container), CARD_IDS[2], 'Next from a revealed, unrated card');
    await click(q(container, 'session-previous'));
    await click(q(container, 'session-previous'));
    assertEqual(shownId(container), CARD_IDS[0], 'Previous back to card 1');
    await press('ArrowRight');
    assertEqual(shownId(container), CARD_IDS[1], 'arrow keys too');
    assertEqual(Object.keys(adapter.load().cards), [], 'skipping never writes a review');
    assert((q(container, 'session-progress')?.textContent ?? '').includes('3 viewed · 0 rated'), `progress separates viewed and rated: ${q(container, 'session-progress')?.textContent}`);
  });

  uiTest('UXB-07 / UXB-08 a deck can be finished with every card unrated, and nothing is counted as remembered or mastered', async () => {
    const { container, adapter } = await study();
    for (let i = 0; i < CARD_IDS.length - 1; i += 1) await click(q(container, 'session-next'));
    await click(cardEl(container));
    await click(q(container, 'session-finish'));
    const summary = q(container, 'review-summary');
    assert(summary, 'Session Complete screen');
    const text = (summary.textContent ?? '').replace(/\s+/g, ' ');
    assert(text.includes('Session complete'), 'titled Session complete, not Session ended');
    assertEqual([textOf(container, 'summary-viewed'), textOf(container, 'summary-rated'), textOf(container, 'summary-unrated')], ['4', '0', '4'], 'viewed, rated, not rated');
    assert(text.includes('You rated 0 of 4 cards'), 'rated line');
    assert(q(container, 'summary-no-ratings') && !q(container, 'summary-recall'), 'no recall performance without ratings');
    assert(!/Remembered/.test(text), 'unrated cards are never shown as remembered');
    assert(text.includes('0 of 4 mastered'), 'mastery stays at zero');
    assertEqual(Object.keys(adapter.load().cards), [], 'no review state written');
  });

  uiTest('UXB-09 an explicit rating is scheduled exactly as before; rating moves on in order without wrapping to skipped cards', async () => {
    const { container, adapter, clock } = await study();
    await click(q(container, 'session-next'));
    await click(cardEl(container));
    await click(container.querySelector('button[data-rating="good"]'));
    const expected = applyRating(initialReviewState(CARD_IDS[1], DECK.deckId), 'good', clock());
    assertEqual(adapter.load().cards[CARD_IDS[1]], expected, 'stored state equals the scheduler result for Good');
    assertEqual(expected.schedule.intervalDays, 2, 'Good on a new card: 2 days');
    assertEqual(expected.schedule.dueAt, new Date(Date.parse(T0) + 2 * DAY_MS).toISOString(), 'due from the injected clock');
    assertEqual(shownId(container), CARD_IDS[2], 'next card in order (card 1, skipped, is not forced back)');
    await click(cardEl(container));
    await click(q(container, 'session-next'));
    await click(cardEl(container));
    await click(container.querySelector('button[data-rating="easy"]'));
    assert(q(container, 'review-summary'), 'rating the last card finishes the session');
    assertEqual(Object.keys(adapter.load().cards).sort(), [CARD_IDS[1], CARD_IDS[3]].sort(), 'only explicitly rated cards are stored');
  });

  uiTest('UXB-10 Session Complete counts: viewed, rated, unrated, latest rating per card, difficult cards; Study again replays', async () => {
    const { container } = await study();
    await click(q(container, 'session-next'));
    await click(cardEl(container));
    await click(container.querySelector('button[data-rating="good"]'));
    await click(cardEl(container));
    await click(container.querySelector('button[data-rating="again"]'));
    await click(cardEl(container));
    await click(q(container, 'session-finish'));
    assertEqual(['summary-viewed', 'summary-rated', 'summary-unrated'].map((id) => textOf(container, id)), ['4', '2', '2'], 'counts');
    assertEqual(Array.from(container.querySelectorAll('[data-testid="summary-recall"] .cmfc-tally-value')).map((node) => node.textContent), ['1', '0', '1', '0'], 'Again 1 · Hard 0 · Good 1 · Easy 0');
    assert(textOf(container, 'summary-recall-line').startsWith('Remembered (Good or Easy): 1 of 2 rated · Difficult (Again or Hard): 1'), textOf(container, 'summary-recall-line'));
    assert(textOf(container, 'summary-recall-line').includes('2 cards without a rating are not counted'), 'unrated cards called out');
    assertEqual(textOf(container, 'review-difficult'), 'Review difficult cards (1)', 'difficult cards offered from real ratings');
    await click(q(container, 'study-again'));
    assertEqual([shownId(container), (q(container, 'session-progress')?.textContent ?? '').includes('Card 1 of 4')], [CARD_IDS[0], true], 'Study again replays the same cards from the start');
  });

  uiTest('UXB-10 a card shown again after Again is counted once, with its latest rating', async () => {
    const adapter = createMemoryAdapter();
    const past = Date.parse(T0) - DAY_MS * 5;
    const due = applyRating(initialReviewState(CARD_IDS[0], DECK.deckId), 'good', past);
    adapter.save({ schemaVersion: 1, cards: { [due.cardId]: due }, updatedAt: due.lastReviewedAt });
    const { container } = await study({ adapter, start: 'review' });
    await click(cardEl(container));
    await click(container.querySelector('button[data-rating="again"]'));
    assertEqual(shownId(container), CARD_IDS[0], 'requeued after Again');
    await click(cardEl(container));
    await click(container.querySelector('button[data-rating="good"]'));
    assert((q(container, 'review-summary')?.textContent ?? '').includes('You rated 1 of 1 card'), 'one card, rated once in the counts');
    assertEqual(Array.from(container.querySelectorAll('[data-testid="summary-recall"] .cmfc-tally-value')).map((node) => node.textContent), ['0', '0', '1', '0'], 'latest rating (Good) only');
    assertEqual(adapter.load().cards[CARD_IDS[0]].reviewHistory.map((event) => event.rating), ['good', 'again', 'good'], 'both ratings still reach the scheduler history');
  });

  uiTest('Continue Learning and Return to Lesson come from the host, never gated on rating', async () => {
    const calls: string[] = [];
    const { container } = await study({
      lessonActions: {
        continueLearning: { label: 'Take Knowledge Check 1', detail: 'Opens the check in this lesson', notice: 'Chapter 2 opens after you submit Knowledge Check 1.', onSelect: () => calls.push('continue') },
        returnToLesson: () => calls.push('return'),
      },
    });
    for (let i = 0; i < CARD_IDS.length - 1; i += 1) await click(q(container, 'session-next'));
    await click(q(container, 'session-finish'));
    assertEqual(textOf(container, 'continue-learning'), 'Take Knowledge Check 1 →', 'prominent continue action with nothing rated');
    assertEqual(textOf(container, 'continue-learning-notice'), 'Chapter 2 opens after you submit Knowledge Check 1.', 'prerequisite explained');
    await click(q(container, 'continue-learning'));
    await click(q(container, 'summary-return-to-lesson'));
    assertEqual(calls, ['continue', 'return'], 'both actions call the host');
    assert(button(container, 'Back to Flashcards overview'), 'the overview exit stays');
  });

  uiTest('UXB-16 card IDs reach the DOM and storage unchanged', async () => {
    const { container, adapter } = await study();
    const seen: string[] = [];
    for (let i = 0; i < CARD_IDS.length; i += 1) {
      seen.push(shownId(container)!);
      await click(cardEl(container));
      await click(container.querySelector('button[data-rating="hard"]'));
    }
    assertEqual(seen, CARD_IDS, 'data-card-id is the authored card ID');
    assertEqual(Object.keys(adapter.load().cards).sort(), [...CARD_IDS].sort(), 'stored under the same IDs');
  });

  suite.test('summariseSession keeps viewed, rated and unrated consistent', () => {
    const summary = summariseSession({ cardIds: ['a', 'b', 'c', 'a'], viewed: ['a', 'c', 'zz'], ratings: { b: 'hard', c: 'easy', zz: 'good' } });
    assertEqual([summary.cards, summary.viewed, summary.rated, summary.unrated], [3, 3, 2, 1], 'unique cards; rated implies viewed; outside cards ignored');
    assertEqual([summary.remembered, summary.difficult, summary.difficultCardIds], [1, 1, ['b']], 'recall split');
    assertEqual(summary.byRating, { again: 0, hard: 1, good: 0, easy: 1 }, 'latest rating per card');
    const none = summariseSession({ cardIds: ['a', 'b'], viewed: ['a', 'b'], ratings: {} });
    assertEqual([none.rated, none.unrated, none.remembered], [0, 2, 0], 'nothing rated: nothing remembered');
  });

  return suite.run();
})();
