// Requires a DOM (browser or jsdom) for the entry-point cases; the access cases are pure.
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { LESSON_PROGRESS_KEY, quizStorageKey } from '../../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, ChapterState, CheckState, StorageLike } from '../../../IndustryKnowledge/lessonFlowCore';
import { MATCH_SORT_STORAGE_KEY } from '../../matchSort/persistence';
import { activityById } from '../../matchSort/content';
import type { ConceptMatchingActivity } from '../../matchSort/types';
import type { SourceDecks } from '../../matchSort/validation';
import { normaliseTitle } from '../../matchSort/validation';
import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import { PracticeLearnerProvider, learnerScopeFor } from '../learnerScope';
import { ReaderLearningModeSwitch } from '../LearningModeChooser';
import { chapterActivities, learningChapterTitle } from '../learningModes';
import { resolveLessonPractice } from '../lessonAccess';
import { PRACTICE_MODES, PracticeReviewJourneyStep, PracticeReviewTakeawaysCard } from '../PracticeReviewEntry';
import { publishPracticeLesson } from '../practiceLessonStore';
import type { PracticeLesson } from '../practiceLessonStore';
import { writePracticeResume } from '../practiceResume';
import { heldSourceDecks } from '../sourceDecks';

const act = (React as unknown as { act: (callback: () => void | Promise<void>) => Promise<void> }).act;
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const CB = 'banking-commercial::How the Industry Works';
const CF = 'banking-consumer-finance::How the Industry Works';
const L11 = '1.1 Industry Definition & Scope';
const L13 = '1.3 Global Market Overview';
const decks = () => heldSourceDecks();
const cardsOf = (module: keyof SourceDecks, lesson: string) => (decks()[module]?.[lesson] ?? []) as ChapterLike[];
const lessonOf = (identity: string, cards: ChapterLike[], open: number): PracticeLesson => ({ identity, cards, accessible: cards.map((_, index) => index < open) });
const memoryStorage = (seed: Record<string, unknown> = {}): StorageLike & { values: Map<string, string> } => {
  const values = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  return { values, getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
};
const ids = (list: Array<{ activityId: string }>) => list.map((item) => item.activityId).sort();
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export const accessCases = [
  { name: 'only activities whose chapters this learner has opened are offered', run: () => {
    const cards = cardsOf('COMMERCIAL_BANKING_MODULE01', L11);
    const fresh = resolveLessonPractice(lessonOf(`${CB}::${L11}`, cards, 1), decks(), memoryStorage())!;
    eq(ids(fresh.available), ['cb-m01-seq-loan-lifecycle'], 'chapter 1 only: just the activity citing chapter 1');
    eq([fresh.lockedCount, fresh.excluded.length], [4, 0], 'the others are locked, not excluded');
    const opened = resolveLessonPractice(lessonOf(`${CB}::${L11}`, cards, 5), decks(), memoryStorage())!;
    eq(ids(opened.available), ['cb-m01-match-banking-mechanics', 'cb-m01-match-products-needs', 'cb-m01-seq-loan-lifecycle', 'cb-m01-sort-customer-segments'], 'whole lesson open');
    eq(opened.lockedCount, 1, 'balance-sheet sort waits for Lesson 1.3 chapter 2');
  } },
  { name: 'chapters in other lessons follow that lesson’s own chapter gate', run: () => {
    const lesson = lessonOf(`${CB}::${L11}`, cardsOf('COMMERCIAL_BANKING_MODULE01', L11), 5);
    const pk = 'cb-l13';
    const submitted = memoryStorage({
      [LESSON_PROGRESS_KEY]: { [`${CB}::${L13}`]: { access: 'unlocked', persistenceKey: pk } },
      [quizStorageKey(pk)]: { latest: null, best: null, attempts: [], chapters: { 0: { latest: 80, best: 80, attempts: [{ at: 't', correct: 4, total: 5, accuracy: 80 }], submittedAt: 't' } } },
    });
    ok(resolveLessonPractice(lesson, decks(), submitted)!.available.some((item) => item.activityId === 'cb-m01-sort-balance-sheet'), 'check 1 of Lesson 1.3 submitted opens its chapter 2');
    const draftOnly = memoryStorage({
      [LESSON_PROGRESS_KEY]: { [`${CB}::${L13}`]: { access: 'unlocked', persistenceKey: pk } },
      [quizStorageKey(pk)]: { chapters: { 0: { draft: { questionIds: ['q'], answers: { q: 'a' }, index: 0, startedAt: 't' } } } },
    });
    ok(!resolveLessonPractice(lesson, decks(), draftOnly)!.available.some((item) => item.activityId === 'cb-m01-sort-balance-sheet'), 'an unsubmitted draft does not unlock');
    const completed = memoryStorage({ [LESSON_PROGRESS_KEY]: { [`${CB}::${L13}`]: { completedAt: 't' } } });
    eq(resolveLessonPractice(lesson, decks(), completed)!.lockedCount, 0, 'a completed lesson opens every chapter');
    const otherIndustry = memoryStorage({ [LESSON_PROGRESS_KEY]: { [`banking::How the Industry Works::${L13}`]: { completedAt: 't' } } });
    eq(resolveLessonPractice(lesson, decks(), otherIndustry)!.lockedCount, 1, 'progress from another industry never counts');
  } },
  { name: 'held, missing or moved chapters exclude their activities (fail closed)', run: () => {
    const cards = clone(cardsOf('COMMERCIAL_BANKING_MODULE01', L11));
    cards[4].reviewStatus = 'Under Review';
    const held = resolveLessonPractice(lessonOf(`${CB}::${L11}`, cards, 5), decks(), memoryStorage())!;
    eq(ids(held.excluded), ['cb-m01-sort-customer-segments'], 'held chapter in the reader');
    const heldDecks = clone(decks()) as Record<string, Record<string, Array<ChapterLike>>>;
    heldDecks.COMMERCIAL_BANKING_MODULE01[L13][1].reviewStatus = 'Under Review';
    const lesson = lessonOf(`${CB}::${L11}`, cardsOf('COMMERCIAL_BANKING_MODULE01', L11), 5);
    eq(ids(resolveLessonPractice(lesson, heldDecks as SourceDecks, memoryStorage({ [LESSON_PROGRESS_KEY]: { [`${CB}::${L13}`]: { completedAt: 't' } } }))!.excluded), ['cb-m01-sort-balance-sheet'], 'held chapter in another lesson');
    const twoChapters = cardsOf('CONSUMER_FINANCE_MODULE01', 'Industry Definition & Scope').slice(0, 2);
    const reduced = resolveLessonPractice(lessonOf(`${CF}::Industry Definition & Scope`, twoChapters, 2), decks(), memoryStorage())!;
    eq(ids(reduced.excluded), ['cf-m01-seq-credit-lifecycle', 'cf-m01-sort-instalment-revolving', 'cf-m01-sort-repayment-capacity'], 'QA scenario: a 2-chapter Lesson 1.1 hides activities citing chapters 3–5');
    eq(reduced.available.length, 0, 'nothing from missing chapters is offered');
  } },
  { name: 'other curricula with the same lesson title get no practice', run: () => {
    const cards: ChapterLike[] = [{ title: 'What Is Coffee Retail?' }, { title: 'What Makes Coffee Unique?' }];
    eq(resolveLessonPractice(lessonOf('coffee::How the Industry Works::Industry Definition & Scope', cards, 2), decks(), memoryStorage()), null, 'no pack matches');
    eq(resolveLessonPractice(null, decks(), memoryStorage()), null, 'no open lesson');
  } },
  { name: 'resolving practice never writes learner storage', run: () => {
    const storage = memoryStorage({ [LESSON_PROGRESS_KEY]: { [`${CB}::${L13}`]: { access: 'unlocked', persistenceKey: 'x' } } });
    const before = JSON.stringify([...storage.values]);
    resolveLessonPractice(lessonOf(`${CB}::${L11}`, cardsOf('COMMERCIAL_BANKING_MODULE01', L11), 5), decks(), storage);
    eq(JSON.stringify([...storage.values]), before, 'storage unchanged');
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
const byText = (text: string | RegExp) => {
  const match = Array.from(document.querySelectorAll('button')).find((node) => {
    const name = (node.getAttribute('aria-label') ?? node.textContent ?? '').replace(/\s+/g, ' ').trim();
    return typeof text === 'string' ? name === text : text.test(name);
  });
  if (!match) throw new Error(`No button ${text}`);
  return match;
};

const LEARNER = 'learner@example.com';
const MATCH_SORT_LEARNER_KEY = `${MATCH_SORT_STORAGE_KEY}:${learnerScopeFor(LEARNER)}`;

/** Mirrors the lessonFlow.tsx integration: the lesson hook publishes, the journey renders the step. */
function LessonHarness({ lesson }: { lesson: PracticeLesson }) {
  useEffect(() => publishPracticeLesson(lesson), [lesson]);
  return <PracticeLearnerProvider email={LEARNER}><div><PracticeReviewJourneyStep /><PracticeReviewTakeawaysCard /></div></PracticeLearnerProvider>;
}

async function render(lesson: PracticeLesson) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => { root!.render(<LessonHarness lesson={lesson} />); });
}

const RESUME_KEY = 'casemate:practice-review:resume:v1';
const FOCUS_KEY = 'casemate:learning-path:focus:v1';

/** A reader whose chapter really moves: selectChapter republishes the lesson on the new chapter, as lessonFlow.tsx does. */
function StatefulLessonHarness({ base, start, holder }: { base: PracticeLesson; start: number; holder: { calls: string[]; chapter: number } }) {
  const [active, setActive] = useState(start);
  const lesson = useMemo<PracticeLesson>(() => ({
    ...base,
    activeChapter: active,
    journey: {
      rows: base.cards.map((_, index) => ({
        index,
        number: index + 1,
        title: learningChapterTitle(base.cards, index),
        minutes: 5,
        state: (index === active ? 'current' : 'available') as ChapterState,
        check: 'available' as CheckState,
        lockedBy: null,
        lockedByPreparation: false,
      })),
      takeaways: 'locked',
    },
    actions: {
      selectChapter: (index) => { holder.calls.push(`chapter:${index}`); holder.chapter = index; setActive(index); return true; },
      openCheck: (index) => { holder.calls.push(`check:${index}`); },
      openTakeaways: () => { holder.calls.push('takeaways'); },
      backToLearningPath: () => { holder.calls.push('learning-path'); return true; },
    },
  }), [base, active]);
  useEffect(() => publishPracticeLesson(lesson), [lesson]);
  return <PracticeLearnerProvider email={LEARNER}><div><ReaderLearningModeSwitch /><PracticeReviewJourneyStep /></div></PracticeLearnerProvider>;
}

async function renderStateful(base: PracticeLesson, start: number) {
  const holder = { calls: [] as string[], chapter: start };
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => { root!.render(<StatefulLessonHarness base={base} start={start} holder={holder} />); });
  return { calls: holder.calls, active: () => holder.chapter };
}
// The Practice & Review resume record lives in sessionStorage; a dialog left open must not reopen in the next case.
async function cleanup() {
  if (root) await act(async () => root!.unmount());
  root = null;
  container?.remove();
  window.sessionStorage.clear();
  window.history.replaceState(null, '', window.location.pathname);
}

const matching = activityById('cb-m01-match-banking-mechanics') as ConceptMatchingActivity;
/** The Lesson 1.1 chapter the matching activity cites: Match & Sort opens on one chapter. */
const matchingChapter = matching.sourceRefs.find((ref) => normaliseTitle(ref.lessonTitle) === normaliseTitle(L11))?.chapterIndex ?? 0;
const hasBackButton = (scope: Element) => Array.from(scope.querySelectorAll('button')).some((node) => /^Back to /.test((node.textContent ?? '').trim()));
const DOMAIN_SEED: Record<string, string> = {
  [LESSON_PROGRESS_KEY]: JSON.stringify({ [`${CB}::${L11}`]: { access: 'unlocked', persistenceKey: 'cb-l11' } }),
  [quizStorageKey('cb-l11')]: JSON.stringify({ latest: null, best: null, attempts: [], chapters: { 0: { latest: 100, best: 100, attempts: [{ at: 't', correct: 5, total: 5, accuracy: 100 }], submittedAt: 't' } } }),
  'casemate:domain-reader:cb-l11': JSON.stringify({ completed: [0, 1, 2, 3, 4] }),
};

export const entryCases = [
  { name: 'lesson → Practice & Review → Match & Sort → complete → overview → back to lesson', run: async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => window.localStorage.setItem(key, value));
    const cards = cardsOf('COMMERCIAL_BANKING_MODULE01', L11);
    const chapterIds = chapterActivities(resolveLessonPractice(lessonOf(`${CB}::${L11}`, cards, 5), decks(), memoryStorage())!, matchingChapter).available.map((item) => item.activityId).sort();
    const chapterProgress = (done: number) => `${done} of ${chapterIds.length} ${chapterIds.length === 1 ? 'activity' : 'activities'} completed`;
    await render({ ...lessonOf(`${CB}::${L11}`, cards, 5), activeChapter: matchingChapter });
    const step = $('[data-testid="journey-practice-review"]');
    ok((step.textContent ?? '').includes('Optional · 2 learning modes'), 'journey step names the learning modes');
    ok(byText('Start practice'), 'takeaways card offers Start practice');
    await click(step);
    const dialog = $('[data-testid="practice-review-dialog"]');
    eq(dialog.getAttribute('aria-modal'), 'true', 'modal dialog');
    ok(dialog.parentElement === document.body && !container.contains(dialog), 'the dialog is rendered into document.body, outside the lesson');
    ok(document.activeElement === dialog.querySelector('h1'), 'focus moves to the dialog heading');
    eq($('[data-testid="practice-mode-match-sort"] [data-testid="practice-mode-progress"]').textContent, '0 of 4 activities completed', 'mode card progress');
    await click(byText('Start practice: Match & Sort'));
    ok(document.activeElement === dialog.querySelector('h1'), 'focus moves to the heading in the mode view');
    eq(dialog.querySelector('h1')?.textContent, learningChapterTitle(cards, matchingChapter), 'the heading is the active chapter title');
    eq(dialog.querySelectorAll('[data-testid="practice-back-to-lesson"]').length, 1, 'exactly one return control');
    ok(!hasBackButton(dialog), 'no second back control');
    eq(Array.from(dialog.querySelectorAll('[data-practice-activity]')).map((node) => node.getAttribute('data-practice-activity')).sort(), chapterIds, 'only the activities citing the active chapter');
    eq($('[data-testid="match-sort-completed"]').textContent, chapterProgress(0), 'chapter progress');
    ok((dialog.textContent ?? '').includes(matching.learningObjective), 'learning objective shown');
    await click(byText(`Start: ${matching.title}`));
    ok(document.querySelector(`[data-activity-id="${matching.activityId}"]`), 'Match & Sort opens on the chosen activity');
    eq(dialog.querySelectorAll('h1').length, 1, 'one page heading inside the activity');
    ok(!(dialog.textContent ?? '').includes('Optional practice. Results stay separate'), 'practice notice not repeated');
    for (const pair of matching.pairs) {
      await click($(`[data-prompt-id="${pair.promptId}"]`));
      await click($(`[data-answer-id="${pair.answerId}"]`));
    }
    await click(byText('Check answers'));
    eq($('[data-testid="activity-feedback"] h3').textContent, 'All correct', 'activity completed');
    await click(byText('Back'));
    ok((document.querySelector(`[data-practice-activity="${matching.activityId}"]`)?.textContent ?? '').includes('Completed'), 'list shows Completed');
    eq($('[data-testid="match-sort-completed"]').textContent, chapterProgress(1), 'leaving the activity returns to the chapter list with progress kept');
    ok(byText(`Practice again: ${matching.title}`), 'retry action offered');
    await click($('[data-testid="practice-back-to-lesson"]'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'dialog closed');
    ok(document.activeElement === document.querySelector('[data-testid="journey-practice-review"]'), 'focus returns to the lesson entry point');
    ok(($('[data-testid="takeaways-practice-review"]').textContent ?? '').includes('Match & Sort · 1 of 4 activities completed'), 'takeaways card updated');
    ok(byText('Continue practice'), 'takeaways card now says Continue practice');
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => eq(window.localStorage.getItem(key), value, `${key} unchanged`));
    eq(Object.keys(window.localStorage).sort(), [...Object.keys(DOMAIN_SEED), MATCH_SORT_LEARNER_KEY].sort(), 'only the learner practice key was added');
    await cleanup();
  } },
  { name: 'no open chapters with practice: no entry point and no takeaways card', run: async () => {
    window.localStorage.clear();
    await render(lessonOf(`${CF}::Industry Drivers & External Factors`, cardsOf('CONSUMER_FINANCE_MODULE01', 'Industry Drivers & External Factors'), 0));
    ok(!document.querySelector('[data-testid="journey-practice-review"]'), 'entry point hidden until something is open');
    ok(!document.querySelector('[data-testid="takeaways-practice-review"]'), 'no takeaways card');
    await cleanup();
    const held54 = '5.4 Regulatory & Sustainability Trends';
    await render(lessonOf(`${CB.replace('How the Industry Works', 'Industry Trends')}::${held54}`, cardsOf('COMMERCIAL_BANKING_MODULE05', held54), 3));
    ok(!document.querySelector('[data-testid="journey-practice-review"]'), 'held lesson 5.4 never shows Practice & Review');
    ok(!document.querySelector('[data-testid="takeaways-practice-review"]'), 'held lesson 5.4 has no takeaways card');
    await cleanup();
  } },
  { name: 'unrelated lessons render nothing; a failing mode never breaks the lesson', run: async () => {
    await render(lessonOf('coffee::How the Industry Works::Industry Definition & Scope', [{ title: 'What Is Coffee Retail?' }], 1));
    ok(!document.querySelector('[data-testid="journey-practice-review"]'), 'no step for other curricula');
    await cleanup();
    const broken = { ...PRACTICE_MODES[0], id: 'broken', resolve: () => { throw new Error('boom'); } };
    PRACTICE_MODES.push(broken);
    await render(lessonOf(`${CB}::${L11}`, cardsOf('COMMERCIAL_BANKING_MODULE01', L11), 5));
    ok(document.querySelector('[data-testid="journey-practice-review"]'), 'healthy mode still shown');
    PRACTICE_MODES.pop();
    await cleanup();
  } },
  { name: 'each mode opens one chapter beside the lesson’s Learning Journey, which picks the chapter and leads to checks, takeaways and the Learning Path', run: async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => window.localStorage.setItem(key, value));
    const cards = cardsOf('COMMERCIAL_BANKING_MODULE01', L11);
    const calls: string[] = [];
    const lesson: PracticeLesson = {
      ...lessonOf(`${CB}::${L11}`, cards, 2),
      activeChapter: 0,
      journey: {
        rows: cards.map((_, index) => ({
          index,
          number: index + 1,
          title: learningChapterTitle(cards, index),
          minutes: 5,
          state: (index === 0 ? 'current' : index === 1 ? 'available' : 'locked') as ChapterState,
          check: (index < 2 ? 'available' : 'locked') as CheckState,
          lockedBy: index ? index : null,
          lockedByPreparation: false,
        })),
        takeaways: 'locked',
      },
      actions: {
        selectChapter: (index) => { calls.push(`chapter:${index}`); return true; },
        openCheck: (index) => { calls.push(`check:${index}`); },
        openTakeaways: () => { calls.push('takeaways'); },
        backToLearningPath: () => { calls.push('learning-path'); return true; },
      },
    };
    await render(lesson);
    await click($('[data-testid="journey-practice-review"]'));
    await click(byText('Start practice: Flashcards'));
    const dialog = $('[data-testid="practice-review-dialog"]');
    eq(dialog.querySelector('h1')?.textContent, 'What Is Commercial Banking?', 'the heading is the active chapter title');
    eq(Array.from(dialog.querySelectorAll('[data-testid^="practice-journey-chapter-"]')).map((node) => node.getAttribute('data-chapter-state')), ['current', 'available', 'locked', 'locked', 'locked'], 'the reader’s journey states, in chapter order');
    ok(($('[data-testid="practice-journey-chapter-1"]').textContent ?? '').includes('8 cards'), 'open rows show their card count');
    ok(($('[data-testid="practice-journey-chapter-3"]').textContent ?? '').includes('Complete Check 2 first'), 'locked rows show the prerequisite');
    ok($('[data-testid="practice-journey-takeaways"]').hasAttribute('disabled'), 'takeaways keep the reader’s eligibility');
    eq($('[data-testid="flashcards-studied"]').textContent, '0 of 8 chapter cards rated', 'Cards rated covers the active chapter');
    await click($('[data-testid="practice-journey-chapter-3"] button'));
    eq(calls, [], 'a locked chapter is not opened');
    await click($('[data-testid="practice-journey-chapter-2"] button'));
    eq(calls, ['chapter:1'], 'an open chapter opens in the reader and the mode stays');
    await click($('[data-testid="practice-change-learning-mode"]'));
    eq($('[data-testid="learning-mode-chapter"]').textContent, 'What Is Commercial Banking?', 'Change learning mode names the active chapter');
    await click($('[data-testid="learning-mode-match-sort"]'));
    ok(document.querySelector('[data-practice-mode="match-sort"]') && document.querySelector('[data-testid="match-sort-completed"]'), 'Match & Sort for the same chapter, with its progress');
    ok(document.querySelector('[data-testid="practice-journey"]'), 'the journey stays beside Match & Sort');
    eq(dialog.querySelectorAll('[data-testid="practice-back-to-lesson"]').length, 1, 'exactly one return control');
    await click($('[data-testid="practice-back-to-lesson"]'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    eq(calls, ['chapter:1'], 'Return to Lesson closes practice onto the reader it was opened from (this static harness never moved, so no chapter to restore)');
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'practice closed');
    eq(window.sessionStorage.getItem('casemate:practice-review:resume:v1'), null, 'nothing reopens practice afterwards');
    await cleanup();
  } },
  { name: 'NAV-04/06/09/10/11: Return to Lesson goes back to the chapter practice was opened from, whatever chapter, scope or mode came after', run: async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => window.localStorage.setItem(key, value));
    const cards = cardsOf('COMMERCIAL_BANKING_MODULE01', L11);
    const reader = await renderStateful(lessonOf(`${CB}::${L11}`, cards, 5), 2);
    await click($('[data-testid="change-learning-mode"]'));
    eq($('[data-testid="learning-mode-chapter"]').textContent, learningChapterTitle(cards, 2), 'the reader’s chooser names Chapter 3');
    await click($('[data-testid="learning-mode-flashcards"]'));
    const dialog = $('[data-testid="practice-review-dialog"]');
    eq([dialog.querySelector('h1')?.textContent, $('[data-testid="practice-flashcards"]').getAttribute('data-chapter')], [learningChapterTitle(cards, 2), '2'], 'Flashcards open on Chapter 3');
    eq(JSON.parse(window.sessionStorage.getItem(RESUME_KEY) ?? '{}').origin, { view: 'reader', chapterIndex: 2, stage: 'learning' }, 'the origin is the reader on Chapter 3');
    await click($('[data-testid="practice-journey-chapter-1"] button'));
    eq([reader.active(), dialog.querySelector('h1')?.textContent], [0, learningChapterTitle(cards, 0)], 'the Learning Journey moves practice to Chapter 1');
    await click($('[data-testid="flashcards-scope-lesson"]'));
    eq($('[data-testid="practice-flashcards"]').getAttribute('data-scope'), 'lesson', 'review scope widened to the lesson');
    for (const mode of ['match-sort', 'flashcards', 'match-sort', 'flashcards', 'match-sort']) {
      await click($('[data-testid="practice-change-learning-mode"]'));
      eq($('[data-testid="learning-mode-chapter"]').textContent, learningChapterTitle(cards, 0), 'Change learning mode names the current chapter');
      await click($(`[data-testid="learning-mode-${mode}"]`));
      ok(document.querySelector(`[data-practice-mode="${mode}"]`), `${mode} open`);
      eq(dialog.querySelector('h1')?.textContent, learningChapterTitle(cards, 0), 'still Chapter 1 after the switch');
    }
    const resume = JSON.parse(window.sessionStorage.getItem(RESUME_KEY) ?? '{}');
    eq([resume.modeId, resume.scope, resume.origin], ['match-sort', 'lesson', { view: 'reader', chapterIndex: 2, stage: 'learning' }], 'five switches keep the scope and the origin');
    await click($('[data-testid="practice-back-to-lesson"]'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'practice closed');
    eq(reader.active(), 2, 'the reader is back on Chapter 3, not Chapter 1');
    ok(!reader.calls.includes('learning-path'), 'it stays in the lesson');
    eq([window.sessionStorage.getItem(RESUME_KEY), new URLSearchParams(window.location.search).get('dkPractice')], [null, null], 'no practice context left behind');
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => eq(window.localStorage.getItem(key), value, `${key} unchanged`));
    await cleanup();
  } },
  { name: 'scenario C and NAV-16/23: a chooser-opened mode returns to the chooser on its chapter; no origin falls back to the Learning Path', run: async () => {
    const cards = cardsOf('COMMERCIAL_BANKING_MODULE01', L11);
    const identity = `${CB}::${L11}`;
    // What the Learning Path chooser writes before it opens the lesson (applyLearningEntry).
    writePracticeResume({ identity, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, origin: { view: 'chooser', chapterIndex: 1 }, requested: true });
    const fromChooser = await renderStateful(lessonOf(identity, cards, 5), 1);
    ok(document.querySelector('[data-testid="practice-flashcards"]'), 'the chooser’s mode reopens with the lesson');
    await click($('[data-testid="practice-back-to-lesson"]'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    eq(fromChooser.calls, ['learning-path'], 'back to Your Learning Path, not the reader');
    eq(JSON.parse(window.sessionStorage.getItem(FOCUS_KEY) ?? '{}').chooserChapter, 1, 'with the chooser set to reopen on Chapter 2');
    await cleanup();
    writePracticeResume({ identity, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, requested: true });
    const legacy = await renderStateful(lessonOf(identity, cards, 5), 3);
    await click($('[data-testid="practice-back-to-lesson"]'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    eq(legacy.calls, ['learning-path'], 'a record without an origin falls back to Your Learning Path, never another chapter');
    eq(JSON.parse(window.sessionStorage.getItem(FOCUS_KEY) ?? '{}').chooserChapter, undefined, 'and does not reopen a chooser');
    await cleanup();
  } },
  { name: 'UXB-07/11/12: a Flashcards session finished with nothing rated offers Continue Learning through the reader gate and writes nothing', run: async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => window.localStorage.setItem(key, value));
    const cards = cardsOf('COMMERCIAL_BANKING_MODULE01', L11);
    const calls: string[] = [];
    const lesson: PracticeLesson = {
      ...lessonOf(`${CB}::${L11}`, cards, 1),
      activeChapter: 0,
      journey: {
        rows: cards.map((_, index) => ({
          index,
          number: index + 1,
          title: learningChapterTitle(cards, index),
          minutes: 5,
          state: (index === 0 ? 'current' : 'locked') as ChapterState,
          check: (index === 0 ? 'available' : 'locked') as CheckState,
          lockedBy: index ? index : null,
          lockedByPreparation: false,
        })),
        takeaways: 'locked',
      },
      actions: {
        selectChapter: (index) => { calls.push(`chapter:${index}`); return true; },
        openCheck: (index) => { calls.push(`check:${index}`); },
        openTakeaways: () => { calls.push('takeaways'); },
        backToLearningPath: () => { calls.push('learning-path'); return true; },
      },
    };
    await render(lesson);
    await click($('[data-testid="journey-practice-review"]'));
    await click(byText('Start practice: Flashcards'));
    await click($('[data-testid="flashcards-study"]'));
    await click($('[data-testid="flashcard-front"]'));
    ok(document.querySelector('[data-testid="flashcard-back"]'), 'clicking the card shows the answer');
    while (document.querySelector('[data-testid="session-next"]')) await click($('[data-testid="session-next"]'));
    await click($('[data-testid="session-finish"]'));
    eq([$('[data-testid="summary-rated"]').textContent, $('[data-testid="summary-unrated"]').textContent], ['0', $('[data-testid="summary-viewed"]').textContent], 'finished with every card viewed and none rated');
    eq(($('[data-testid="continue-learning"]').textContent ?? '').replace(/\s+/g, ' ').trim(), 'Take Knowledge Check 1 →', 'chapter 2 is locked, so the check that opens it is offered');
    ok(($('[data-testid="continue-learning-notice"]').textContent ?? '').includes('opens after you submit Knowledge Check 1'), 'the prerequisite is explained');
    eq(Object.keys(window.localStorage).sort(), Object.keys(DOMAIN_SEED).sort(), 'skipping every card writes no flashcard review');
    await click($('[data-testid="continue-learning"]'));
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    eq(calls, ['check:0'], 'Continue Learning opens Knowledge Check 1 in the reader, never chapter 2');
    ok(!document.querySelector('[data-testid="practice-review-dialog"]'), 'practice closed');
    Object.entries(DOMAIN_SEED).forEach(([key, value]) => eq(window.localStorage.getItem(key), value, `${key} unchanged`));
    await cleanup();
  } },
];

export const runPracticeReviewTests = async () => {
  await runSuite('practice access', accessCases);
  if (typeof document === 'undefined') throw new Error('Entry-point cases need a DOM environment (browser or jsdom).');
  await runSuite('practice entry', entryCases);
};
runPracticeReviewTests().catch((error) => { console.error(error.message); throw error; });
