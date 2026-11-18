// Flashcards inside Practice & Review. Access cases are pure; the entry cases need a DOM (browser
// or jsdom) and the full apps/IndustryKnowledge module graph for the live deck registries.
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { LESSON_PROGRESS_KEY, quizStorageKey } from '../../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, StorageLike } from '../../../IndustryKnowledge/lessonFlowCore';
import { COMMERCIAL_BANKING_FUNDAMENTALS, CONSUMER_FINANCE_FUNDAMENTALS } from '../../flashcards/decks';
import { FLASHCARD_STORAGE_KEY } from '../../flashcards/persistence';
import { applyRating, initialReviewState } from '../../flashcards/scheduler';
import type { SourceDecks } from '../../matchSort/validation';
import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import { resolveLessonFlashcards } from '../flashcardAccess';
import { cardsInScope, coverageSummary, resolveIndustryFlashcards } from '../flashcardScopes';
import { FLASHCARDS_MODE } from '../flashcardsMode';
import { PracticeLearnerProvider, learnerScopeFor } from '../learnerScope';
import { PracticeReviewJourneyStep, PracticeReviewTakeawaysCard } from '../PracticeReviewEntry';
import { publishPracticeLesson } from '../practiceLessonStore';
import type { PracticeLesson } from '../practiceLessonStore';
import { heldSourceDecks } from '../sourceDecks';
import { runFlashcardScopeTests } from './flashcardScopes.test';

const act = (React as unknown as { act: (callback: () => void | Promise<void>) => Promise<void> }).act;
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const CB = 'banking-commercial::How the Industry Works';
const CF = 'banking-consumer-finance::How the Industry Works';
const CB_L11 = '1.1 Industry Definition & Scope';
const CF_L1 = 'Industry Definition & Scope';
const decks = () => heldSourceDecks();
const cardsOf = (module: keyof SourceDecks, lesson: string) => (decks()[module]?.[lesson] ?? []) as ChapterLike[];
const lessonOf = (identity: string, cards: ChapterLike[], open: number): PracticeLesson => ({ identity, cards, accessible: cards.map((_, index) => index < open) });
const cbLesson = (open: number, cards = cardsOf('COMMERCIAL_BANKING_MODULE01', CB_L11)) => lessonOf(`${CB}::${CB_L11}`, cards, open);
const cfLesson = (open: number, cards = cardsOf('CONSUMER_FINANCE_MODULE01', CF_L1)) => lessonOf(`${CF}::${CF_L1}`, cards, open);
const ids = (list: Array<{ cardId: string }>) => list.map((item) => item.cardId).sort();
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
const memoryStorage = (seed: Record<string, unknown> = {}): StorageLike & { values: Map<string, string> } => {
  const values = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  return { values, getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
};

const CB_CHAPTER_1 = ['cbf-commercial-bank-definition', 'cbf-credit-creation', 'cbf-deposit-liability-loan-asset', 'cbf-financial-intermediation'];

export const accessCases = [
  { name: 'both decks resolve against the live registries with every card available when all chapters are open', run: () => {
    const cb = resolveLessonFlashcards(cbLesson(5), decks())!;
    eq([cb.available.length, cb.lockedCount, cb.excluded.length], [14, 0, 0], 'Commercial Banking 1.1');
    const cf = resolveLessonFlashcards(cfLesson(5), decks())!;
    eq([cf.available.length, cf.lockedCount, cf.excluded.length], [13, 0, 0], 'Consumer Finance Lesson 1 (cff-credit-risk retired)');
    eq(cb.deck.cards.length, 14, 'filtered deck carries the available cards');
  } },
  { name: 'only cards whose every chapter is open are offered (no future-chapter content)', run: () => {
    const cb = resolveLessonFlashcards(cbLesson(1), decks())!;
    eq(ids(cb.available), CB_CHAPTER_1, 'chapter 1 only');
    eq([cb.lockedCount, cb.excluded.length], [10, 0], 'later cards locked, not excluded');
    const cf = resolveLessonFlashcards(cfLesson(1), decks())!;
    eq(ids(cf.available), ['cff-consumer-finance-scope'], 'chapter-1 cards that also cite chapter 2 or 4 stay locked');
    eq(cf.lockedCount, 12, 'the rest wait for their chapters');
    ok(!cf.available.some((card) => card.cardId === 'cff-instalment-credit'), 'instalment card cites Chapter 4 and waits for it');
  } },
  { name: 'held, moved or missing chapters exclude their cards (fail closed)', run: () => {
    const heldReader = clone(cardsOf('COMMERCIAL_BANKING_MODULE01', CB_L11));
    heldReader[4].reviewStatus = 'Under Review';
    const held = resolveLessonFlashcards(cbLesson(5, heldReader), decks())!;
    eq(ids(held.excluded), ['cbf-customer-segments'], 'held chapter in the reader');
    ok(held.excluded[0].reasons[0].includes('under review'), 'reason names the hold');

    const heldRegistry = clone(decks()) as Record<string, Record<string, ChapterLike[]>>;
    heldRegistry.COMMERCIAL_BANKING_MODULE01[CB_L11][1].reviewStatus = 'Under Review';
    eq(ids(resolveLessonFlashcards(cbLesson(5), heldRegistry as SourceDecks)!.excluded), ['cbf-capital-vs-liquidity', 'cbf-liquidity-transformation', 'cbf-maturity-transformation', 'cbf-trust-and-bank-runs'], 'held chapter in the registry');

    const swapped = clone(cardsOf('COMMERCIAL_BANKING_MODULE01', CB_L11));
    [swapped[3], swapped[4]] = [swapped[4], swapped[3]];
    const moved = resolveLessonFlashcards(cbLesson(5, swapped), decks())!;
    eq(ids(moved.excluded), ['cbf-customer-segments', 'cbf-letter-of-credit', 'cbf-primary-account-value', 'cbf-product-families'], 'cards on moved chapters');

    const twoChapters = cardsOf('CONSUMER_FINANCE_MODULE01', CF_L1).slice(0, 2);
    const reduced = resolveLessonFlashcards(cfLesson(2, twoChapters), decks())!;
    ok(reduced.excluded.length > 0 && reduced.available.every((card) => ['consumer-finance-m1-l1-ch01', 'consumer-finance-m1-l1-ch02'].includes(card.chapterId)), 'QA scenario: a 2-chapter lesson keeps only cards from those chapters');
    ok(reduced.available.every((card) => card.sourceRefs.every((ref) => ref.chapterId.endsWith('ch01') || ref.chapterId.endsWith('ch02'))), 'no excerpt from a missing chapter');
  } },
  { name: 'other curricula and other lessons get no flashcards', run: () => {
    const coffee: ChapterLike[] = [{ title: 'What Is Coffee Retail?' }, { title: 'What Makes Coffee Unique?' }];
    eq(resolveLessonFlashcards(lessonOf(`coffee::How the Industry Works::${CF_L1}`, coffee, 2), decks()), null, 'same lesson title, different chapters');
    const otherLesson = resolveLessonFlashcards(lessonOf(`${CB}::1.3 Global Market Overview`, cardsOf('COMMERCIAL_BANKING_MODULE01', '1.3 Global Market Overview'), 5), decks());
    eq(otherLesson?.sourceDeck.source.lessonTitle, '1.3 Global Market Overview', 'another banking lesson gets its own deck, never the 1.1 deck');
    ok(!otherLesson?.available.some((card) => CB_CHAPTER_1.includes(card.cardId)), 'no 1.1 cards leak into another lesson');
    const held54 = '5.4 Regulatory & Sustainability Trends';
    eq(resolveLessonFlashcards(lessonOf(`${CB}::${held54}`, cardsOf('COMMERCIAL_BANKING_MODULE05', held54), 3), decks()), null, 'held lesson 5.4 has no flashcards even with every chapter open');
    eq(resolveLessonFlashcards(lessonOf(`commercial-banking::How the Industry Works::${CB_L11}`, cardsOf('COMMERCIAL_BANKING_MODULE01', CB_L11), 5), decks()), null, 'same lesson under a non-canonical industry id');
    eq(resolveLessonFlashcards(null, decks()), null, 'no open lesson');
  } },
  { name: 'decks keep their authored mapping (stable IDs, lesson keys)', run: () => {
    eq(COMMERCIAL_BANKING_FUNDAMENTALS.source.lessonTitle, CB_L11, 'banking lesson key');
    eq(CONSUMER_FINANCE_FUNDAMENTALS.source.lessonTitle, CF_L1, 'consumer finance lesson key');
    ok(Object.keys(decks().COMMERCIAL_BANKING_MODULE01 ?? {}).includes(CB_L11) && Object.keys(decks().CONSUMER_FINANCE_MODULE01 ?? {}).includes(CF_L1), 'lesson keys exist in the live registries');
  } },
  { name: 'learner scopes are stable, distinct and never contain the email', run: () => {
    const a = learnerScopeFor(' Learner@Example.com ');
    eq(a, learnerScopeFor('learner@example.com'), 'normalised');
    ok(a !== learnerScopeFor('other@example.com'), 'distinct learners');
    ok(!String(a).includes('example'), 'email not stored in key names');
    eq(learnerScopeFor(null), null, 'signed out');
  } },
  { name: 'a live curriculum resolves authored decks lesson by lesson; lessons that are not open follow their own chapter gate', run: () => {
    const module01 = (decks().COMMERCIAL_BANKING_MODULE01 ?? {}) as Record<string, ChapterLike[]>;
    const titles = Object.keys(module01);
    ok(titles.includes(CB_L11) && titles.length >= 3, 'module 1 lists lesson 1.1 and others');
    const entries = titles.map((title, index) => ({
      identity: `${CB}::${title}`, title, persistenceKey: `cb-live-${index}`, chapters: module01[title], moduleIndex: 0, lessonIndex: index,
      moduleTitle: 'How the Industry Works', moduleLabel: 'How the Industry Works', open: () => undefined,
    }));
    const lesson: PracticeLesson = { ...cbLesson(5), persistenceKey: `cb-live-${titles.indexOf(CB_L11)}`, curriculum: { industryLabel: 'Commercial Banking', lessons: () => entries } };
    const fresh = resolveIndustryFlashcards(lesson, memoryStorage())!;
    eq([fresh.generated, fresh.complete, fresh.industryLabel], [false, true, 'Commercial Banking'], 'authored decks, complete curriculum');
    eq(fresh.lessons.map((item) => item.identity), entries.map((item) => item.identity), 'every lesson of the curriculum, in order');
    const own = fresh.lessons.find((item) => item.identity === lesson.identity)!;
    eq([own.cards.length, own.cards.filter((item) => item.locked).length, own.excluded], [42, 0, 0], 'the open lesson follows the reader gate: all 42 cards of 1.1 are open');
    eq(own.cards.filter((item) => item.origin === 'authored').length, 14, 'the 14 authored cards are kept; chapter cards complete each chapter');
    const other = fresh.lessons.find((item) => item.identity !== lesson.identity && item.cards.some((card) => card.locked) && item.cards.some((card) => !card.locked));
    ok(other, 'another lesson has cards on its first chapter open and cards on later chapters waiting for its checks');
    const completed = resolveIndustryFlashcards(lesson, memoryStorage({ [LESSON_PROGRESS_KEY]: { [other.identity]: { completedAt: 't' } } }))!;
    const reopened = completed.lessons.find((item) => item.identity === other.identity)!;
    eq([reopened.cards.length, reopened.cards.some((item) => item.locked)], [other.cards.length, false], 'a completed lesson opens every one of its chapters');
    ok(cardsInScope(fresh, 'module').length > cardsInScope(fresh, 'lesson').length, 'module scope reaches into the other lessons');
    const coverage = coverageSummary(fresh);
    eq(coverage.lessons, entries.length, 'coverage counts every lesson of the curriculum');
    ok(coverage.total > own.cards.length && coverage.available < coverage.total, 'curriculum total exceeds the open lesson, and some cards wait');
    eq(Object.keys(FLASHCARDS_MODE.resolve(lesson, { learnerScope: null })!).sort(), ['industry', 'lesson'], 'resolve returns { industry, lesson }');
  } },
];

// Entry points -------------------------------------------------------------------------------

let root: Root | null = null;
let container: HTMLElement;
const $ = (selector: string) => {
  const found = document.querySelector<HTMLElement>(selector);
  if (!found) throw new Error(`Not found: ${selector}`);
  return found;
};
const click = async (element: Element) => act(async () => { (element as HTMLElement).click(); });
const tid = (testId: string) => $(`[data-testid="${testId}"]`);
const has = (testId: string) => Boolean(document.querySelector(`[data-testid="${testId}"]`));
const text = (testId: string) => (tid(testId).textContent ?? '').replace(/\s+/g, ' ').trim();
const RESUME_KEY = 'casemate:practice-review:resume:v1';
const byText = (text: string | RegExp) => {
  const match = Array.from(document.querySelectorAll('button')).find((node) => {
    const name = (node.getAttribute('aria-label') ?? node.textContent ?? '').replace(/\s+/g, ' ').trim();
    return typeof text === 'string' ? name === text : text.test(name);
  });
  if (!match) throw new Error(`No button ${text}`);
  return match;
};

const byTextOrNull = (pattern: RegExp) => Array.from(document.querySelectorAll('button')).find((node) => pattern.test((node.getAttribute('aria-label') ?? node.textContent ?? '').replace(/\s+/g, ' ').trim())) ?? null;

function LessonHarness({ lesson, email }: { lesson: PracticeLesson; email: string | null }) {
  useEffect(() => publishPracticeLesson(lesson), [lesson]);
  return (
    <PracticeLearnerProvider email={email}>
      <div><PracticeReviewJourneyStep /><PracticeReviewTakeawaysCard /></div>
    </PracticeLearnerProvider>
  );
}

async function render(lesson: PracticeLesson, email: string | null = 'learner@example.com') {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => { root!.render(<LessonHarness lesson={lesson} email={email} />); });
}
/** The Flashcards mode on its own, as Practice & Review renders it for lesson-wide scopes. */
function BodyHarness({ lesson }: { lesson: PracticeLesson }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const learnerScope = learnerScopeFor(LEARNER);
  const resolved = FLASHCARDS_MODE.resolve(lesson, { learnerScope })!;
  return <FLASHCARDS_MODE.Body resolved={resolved} context={{ learnerScope }} onSessionChange={() => undefined} chrome={{ headingId: 'flashcards-heading', headingRef, lessonTitle: CB_L11, moduleTitle: 'How the Industry Works' }} />;
}

async function renderBody(lesson: PracticeLesson) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => { root!.render(<BodyHarness lesson={lesson} />); });
}
async function unmountHarness() {
  if (root) await act(async () => root!.unmount());
  root = null;
  container?.remove();
}
// The resume record lives in sessionStorage; a dialog left open by one case must not reopen in the next.
async function cleanup() {
  await unmountHarness();
  window.sessionStorage.clear();
  window.history.replaceState(null, '', window.location.pathname);
}

const LEARNER = 'learner@example.com';
const learnerKey = `${FLASHCARD_STORAGE_KEY}:${learnerScopeFor(LEARNER)}`;
const DOMAIN_SEED: Record<string, string> = {
  [LESSON_PROGRESS_KEY]: JSON.stringify({ [`${CB}::${CB_L11}`]: { access: 'unlocked', persistenceKey: 'cb-l11' } }),
  [quizStorageKey('cb-l11')]: JSON.stringify({ latest: null, best: null, attempts: [], chapters: { 0: { latest: 80, best: 80, attempts: [{ at: 't', correct: 4, total: 5, accuracy: 80 }], submittedAt: 't' } } }),
  'casemate:domain-reader:cb-l11': JSON.stringify({ notes: { 0: 'my note' }, completed: [0] }),
};
const seedDomain = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  Object.entries(DOMAIN_SEED).forEach(([key, value]) => window.localStorage.setItem(key, value));
};

export const entryCases = [
  { name: 'lesson → Practice & Review → Flashcards for the open chapter → study and rate → Return to Lesson', run: async () => {
    seedDomain();
    await render(cbLesson(1));
    const step = $('[data-testid="journey-practice-review"]');
    ok((step.textContent ?? '').includes('Optional · 2 learning modes'), `journey step: ${step.textContent}`);
    await click(step);
    const dialog = $('[data-testid="practice-review-dialog"]');
    ok(dialog.parentElement === document.body && !container.contains(dialog), 'the dialog is rendered into document.body, outside the lesson');
    ok(document.activeElement === dialog.querySelector('h1'), 'focus on the lesson heading');
    eq(dialog.querySelector('h1')?.textContent, CB_L11, 'lesson context shown');
    eq($('[data-testid="practice-context"]').textContent, 'Commercial Banking · How the Industry Works', 'industry and module context');
    eq(Array.from(dialog.querySelectorAll('[data-testid="practice-mode-list"] > section')).map((node) => node.getAttribute('data-testid')), ['practice-mode-flashcards', 'practice-mode-match-sort'], 'two learning-mode cards');
    eq($('[data-testid="practice-mode-flashcards"] [data-testid="practice-mode-progress"]').textContent, '0 of 8 cards rated · 42 across Commercial Banking', 'only open-chapter cards counted, with the sub-industry total');
    ok(($('[data-testid="practice-mode-flashcards"]').textContent ?? '').includes('34 more cards open as you complete earlier chapters'), 'locked cards counted, not shown');
    await click(byText('Start practice: Flashcards'));
    eq(dialog.querySelectorAll('[data-testid="practice-back-to-lesson"]').length, 1, 'exactly one return control');
    ok(text('practice-back-to-lesson').includes('Return to Lesson'), 'the return control names the lesson');
    ok(!has('flashcards-overview-back') && !byTextOrNull(/^Back to /), 'no second back control in the Flashcards overview');
    ok(!Array.from(document.querySelectorAll('h1')).some((heading) => heading.textContent === 'Smart Flashcards'), 'no standalone feature header');
    eq(dialog.querySelectorAll('h1').length, 1, 'one page heading');
    eq(dialog.querySelector('h1')?.textContent, 'What Is Commercial Banking?', 'the heading is the active chapter title');
    ok(document.activeElement === dialog.querySelector('h1'), 'focus moves to the chapter heading');
    eq(text('practice-context'), `${CB_L11} · Commercial Banking`, 'lesson and sub-industry context');
    eq(tid('practice-flashcards').getAttribute('data-scope'), 'chapter', 'the deck is the active chapter');
    ok(has('flashcards-scope-chapter') && has('flashcards-scope-lesson'), 'the deck starts on the chapter and can widen; the Learning Journey still picks the chapter');
    eq(text('flashcards-studied'), '0 of 8 chapter cards rated', 'Cards rated: unique rated cards over the open cards of the chapter');
    eq([text('flashcards-available'), text('flashcards-due'), text('flashcards-mastered')], ['8', '0', '0'], 'available, due and mastered from the scheduler');
    ok(has('flashcards-support-panel'), 'notes and key terms below the practice controls');
    await click(tid('flashcards-study'));
    ok(($('[data-testid="session-progress"]').textContent ?? '').includes('Card 1 of 8'), 'study queue limited to open chapters');
    const lockedBack = COMMERCIAL_BANKING_FUNDAMENTALS.cards.find((card) => card.cardId === 'cbf-customer-segments')!.back;
    ok(!(document.body.textContent ?? '').includes(lockedBack), 'no locked-chapter answer in the DOM');
    const firstCard = COMMERCIAL_BANKING_FUNDAMENTALS.cards.find((card) => card.cardId === 'cbf-commercial-bank-definition')!;
    eq($('[data-testid="flashcard-front"]').getAttribute('data-card-id'), firstCard.cardId, 'the first unstudied card of the chapter');
    ok(!(document.body.textContent ?? '').includes(firstCard.back), 'the answer is not in the DOM before Reveal answer');
    await click(tid('reveal-answer'));
    ok(has('flashcard-back') && has('recall-rating'), 'Reveal answer shows the answer and the ratings');
    await click($('button[data-rating="good"]'));
    const stored = JSON.parse(window.localStorage.getItem(learnerKey) ?? '{}');
    eq(stored.cards?.['cbf-commercial-bank-definition']?.schedule?.intervalDays, 2, 'Good schedules 2 days under the learner key');
    for (let i = 0; i < 7; i += 1) {
      await click($('[data-testid="flashcard-front"]'));
      await click($('button[data-rating="good"]'));
    }
    ok(($('[data-testid="review-summary"]').textContent ?? '').includes('You rated 8 of 8 cards'), 'session summary');
    await click(byText('Back to Flashcards overview'));
    ok(has('flashcards-progress-summary') && !has('flashcard-session'), 'leaving the session returns to the Flashcards overview of the same chapter');
    eq([text('flashcards-studied'), text('flashcards-available'), text('flashcards-mastered')], ['8 of 8 chapter cards rated', '8', '0'], 'progress kept after the session');
    ok(text('flashcards-zero-due').startsWith('All cards rated. Nothing due for review.'), 'all rated, nothing due yet');
    await click($('[data-testid="practice-back-to-lesson"]'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'dialog closed');
    ok(document.activeElement === document.querySelector('[data-testid="journey-practice-review"]'), 'focus returns to the lesson entry point');
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => eq(window.localStorage.getItem(key), value, `${key} unchanged`));
    eq(Object.keys(window.localStorage).sort(), [...Object.keys(DOMAIN_SEED), learnerKey].sort(), 'only the learner flashcard key was added');
    await cleanup();
  } },
  { name: 'due cards surface on the journey step and open in Review Mode', run: async () => {
    seedDomain();
    const due = applyRating(initialReviewState('cbf-credit-creation', COMMERCIAL_BANKING_FUNDAMENTALS.deckId), 'again', Date.now() - 60 * 60 * 1000);
    window.localStorage.setItem(learnerKey, JSON.stringify({ schemaVersion: 1, cards: { [due.cardId]: due }, updatedAt: due.lastReviewedAt }));
    await render(cbLesson(1));
    ok(($('[data-testid="journey-practice-review"]').textContent ?? '').includes('Optional · 1 card due'), 'journey shows the due card');
    await click($('[data-testid="journey-practice-review"]'));
    ok(($('[data-testid="practice-mode-flashcards"]').textContent ?? '').includes('1 due for review'), 'mode card shows due count');
    await click(byText('Review due cards: Flashcards'));
    eq([text('flashcards-due'), text('flashcards-review')], ['1', 'Review 1 due'], 'the overview offers the due card');
    ok(!has('flashcards-zero-due'), 'no zero-due message while a card is due');
    await click(tid('flashcards-review'));
    eq($('[data-testid="flashcard-front"]').getAttribute('data-card-id'), 'cbf-credit-creation', 'the forgotten card is reviewed');
    ok((document.body.textContent ?? '').includes('Forgotten last time'), 'review reason shown');
    await cleanup();
  } },
  { name: 'learners on a shared browser never see each other’s flashcards; signed-out practice is not stored', run: async () => {
    seedDomain();
    const rated = applyRating(initialReviewState('cbf-financial-intermediation', COMMERCIAL_BANKING_FUNDAMENTALS.deckId), 'good', Date.now());
    window.localStorage.setItem(learnerKey, JSON.stringify({ schemaVersion: 1, cards: { [rated.cardId]: rated }, updatedAt: rated.lastReviewedAt }));
    await render(cbLesson(1), 'other@example.com');
    await click($('[data-testid="journey-practice-review"]'));
    eq($('[data-testid="practice-mode-flashcards"] [data-testid="practice-mode-progress"]').textContent, '0 of 8 cards rated · 42 across Commercial Banking', 'another account starts fresh');
    await cleanup();

    seedDomain();
    await render(cbLesson(1), null);
    await click($('[data-testid="journey-practice-review"]'));
    ok((document.body.textContent ?? '').includes('kept only until you leave this page'), 'signed-out notice');
    await click(byText('Start practice: Flashcards'));
    await click(tid('flashcards-study'));
    await click(tid('reveal-answer'));
    await click($('button[data-rating="easy"]'));
    eq(Object.keys(window.localStorage).sort(), Object.keys(DOMAIN_SEED).sort(), 'nothing written while signed out');
    await cleanup();
  } },
  { name: 'saved progress for a chapter that is now held or locked is never surfaced', run: async () => {
    seedDomain();
    const stale = applyRating(initialReviewState('cbf-customer-segments', COMMERCIAL_BANKING_FUNDAMENTALS.deckId), 'again', Date.now() - 60 * 60 * 1000);
    window.localStorage.setItem(learnerKey, JSON.stringify({ schemaVersion: 1, cards: { [stale.cardId]: stale }, updatedAt: stale.lastReviewedAt }));
    const heldReader = clone(cardsOf('COMMERCIAL_BANKING_MODULE01', CB_L11));
    heldReader[4].reviewStatus = 'Under Review';
    await render(cbLesson(5, heldReader));
    ok(!($('[data-testid="journey-practice-review"]').textContent ?? '').includes('due'), 'no due count from a held chapter');
    await click($('[data-testid="journey-practice-review"]'));
    eq($('[data-testid="practice-mode-flashcards"] [data-testid="practice-mode-progress"]').textContent, '0 of 37 cards rated · 37 across Commercial Banking', 'held chapter cards neither listed nor counted');
    await click(byText('Start practice: Flashcards'));
    eq([text('flashcards-available'), text('flashcards-due')], ['8', '0'], 'chapter 1: its own cards and no due count from the held chapter');
    ok(has('flashcards-zero-due') && !has('flashcards-review'), 'review offers nothing from the held chapter');
    await cleanup();
    await render({ ...cbLesson(5, heldReader), activeChapter: 4 });
    await click($('[data-testid="journey-practice-review"]'));
    await click(byText('Start practice: Flashcards'));
    ok(has('practice-chapter-unavailable') && !has('practice-flashcards'), 'the held chapter itself offers no flashcards');
    await cleanup();
    await render(cbLesson(1));
    ok(!($('[data-testid="journey-practice-review"]').textContent ?? '').includes('due'), 'no due count from a locked chapter');
    await cleanup();
    eq(JSON.parse(window.localStorage.getItem(learnerKey) ?? '{}').cards?.[stale.cardId]?.schedule?.lapses, stale.schedule.lapses, 'saved schedule kept intact for when the chapter returns');
  } },
  { name: 'Escape closes the overview; lessons without practice show no entry point', run: async () => {
    seedDomain();
    await render(cbLesson(5));
    await click($('[data-testid="journey-practice-review"]'));
    await act(async () => { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'Escape closes');
    await cleanup();
    await render(lessonOf(`${CB}::1.3 Global Market Overview`, cardsOf('COMMERCIAL_BANKING_MODULE01', '1.3 Global Market Overview'), 0));
    ok(!document.querySelector('[data-testid="journey-practice-review"]'), 'no entry point while nothing in the lesson is open to practise');
    await cleanup();
    await render(lessonOf(`${CB}::5.4 Regulatory & Sustainability Trends`, cardsOf('COMMERCIAL_BANKING_MODULE05', '5.4 Regulatory & Sustainability Trends'), 3));
    ok(!document.querySelector('[data-testid="journey-practice-review"]'), 'held lesson 5.4 shows no entry point even with every chapter open');
    await cleanup();
  } },
  { name: 'resolving and rendering practice never writes Domain Knowledge records', run: async () => {
    const storage = memoryStorage();
    storage.setItem(LESSON_PROGRESS_KEY, '{"x":1}');
    resolveLessonFlashcards(cbLesson(5), decks());
    eq([...storage.values.keys()], [LESSON_PROGRESS_KEY], 'pure resolution');
  } },
  { name: 'Study takes at most 12 cards in a wider scope, and Study more cards continues with the rest', run: async () => {
    seedDomain();
    await renderBody(cbLesson(5));
    await click(tid('flashcards-scope-lesson'));
    eq([text('flashcards-available'), has('flashcards-locked-note')], ['42', false], 'every card of lesson 1.1 is open');
    await click(tid('flashcards-study'));
    ok(text('session-progress').startsWith('Card 1 of 12'), `a session takes at most 12 cards: ${text('session-progress')}`);
    for (let i = 0; i < 12; i += 1) {
      await click(tid('reveal-answer'));
      await click($('button[data-rating="good"]'));
    }
    ok(text('review-summary').includes('You rated 12 of 12 cards'), 'twelve cards rated');
    await click(byText('Study more cards'));
    ok(text('session-progress').startsWith('Card 1 of 12'), 'the next session starts with the cards not studied yet and is capped too');
    await cleanup();
  } },
  { name: 'a refresh reopens Flashcards on the same chapter, the address bar carries the practice link, and Return to Lesson leaves it', run: async () => {
    seedDomain();
    await render(cbLesson(5));
    await click($('[data-testid="journey-practice-review"]'));
    await click(byText('Start practice: Flashcards'));
    const resume = JSON.parse(window.sessionStorage.getItem(RESUME_KEY) ?? '{}');
    eq([resume.modeId, resume.scope, resume.chapterOnly], ['flashcards', 'chapter', true], 'mode and chapter remembered for this tab');
    const link = new URLSearchParams(window.location.search);
    eq([link.get('dkPractice'), link.get('dkChapter')], ['flashcards', '1'], 'practice link: mode and 1-based chapter');
    await unmountHarness();
    // A reload starts a new page load; here it is simulated by marking the record as written by an earlier one.
    window.sessionStorage.setItem(RESUME_KEY, JSON.stringify({ ...JSON.parse(window.sessionStorage.getItem(RESUME_KEY) ?? '{}'), pageLoad: 'an-earlier-page-load' }));
    await render(cbLesson(5));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    eq(tid('practice-flashcards').getAttribute('data-scope'), 'chapter', 'the dialog reopens on the chapter');
    eq(document.querySelectorAll('[data-testid="practice-back-to-lesson"]').length, 1, 'one return control after the refresh');
    ok(!has('flashcards-overview-back') && !byTextOrNull(/^Back to /), 'no second back control');
    await click(tid('practice-back-to-lesson'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'dialog closed');
    eq(window.sessionStorage.getItem(RESUME_KEY), null, 'leaving practice clears the resume record');
    eq(new URLSearchParams(window.location.search).get('dkPractice'), null, 'and the practice link');
    await cleanup();
  } },
  { name: 'NAV-R09/R10/R11: opening the lesson again in the same page load (Back then Forward, or reopening it) never reopens stale practice', run: async () => {
    seedDomain();
    await render(cbLesson(5));
    await click($('[data-testid="journey-practice-review"]'));
    await click(byText('Start practice: Flashcards'));
    ok(has('practice-flashcards'), 'practice open');
    await unmountHarness();
    await render(cbLesson(5));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'the lesson opens normally, not in the earlier practice');
    eq([window.sessionStorage.getItem(RESUME_KEY), new URLSearchParams(window.location.search).get('dkPractice')], [null, null], 'the stale record and practice link are dropped');
    await click($('[data-testid="journey-practice-review"]'));
    ok(has('practice-mode-flashcards'), 'Practice & Review still opens when asked');
    await cleanup();
  } },
];

export const runFlashcardsPracticeTests = async () => {
  await runSuite('flashcards practice access', accessCases);
  if (typeof document === 'undefined') throw new Error('Entry-point cases need a DOM environment (browser or jsdom).');
  await runSuite('flashcards practice entry', entryCases);
  await runFlashcardScopeTests();
};
runFlashcardsPracticeTests().catch((error) => { console.error(error.message); throw error; });
