// Flashcards learning mode: scopes, generated chapter decks and the deck overview it owns.
// The fixtures are self-contained (a made-up curriculum with no authored deck), so these cases do not
// depend on the Commercial Banking or Consumer Finance content. The overview cases need a DOM (browser or
// jsdom preloaded before React DOM). Run: npx -y tsx@4 apps/InteractiveLearning/practiceReview/__tests__/flashcardScopes.test.tsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { LESSON_PROGRESS_KEY, quizStorageKey, readerStorageKey } from '../../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, StorageLike } from '../../../IndustryKnowledge/lessonFlowCore';
import type { CurriculumLesson, LessonFlowCurriculum } from '../../../IndustryKnowledge/lessonFlow';
import { storageKeyFor } from '../../flashcards/persistence';
import { applyRating, initialReviewState } from '../../flashcards/scheduler';
import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import { FLASHCARD_SCOPES, cardsInScope, chapterLessonDeck, coverageSummary, genericDefinitions, lessonChapterAccess, originLesson, resolveIndustryFlashcards, scopeDeck } from '../flashcardScopes';
import type { FlashcardScopeId } from '../flashcardScopes';
import { FLASHCARDS_MODE, FLASHCARD_SESSION_LIMIT } from '../flashcardsMode';
import type { PracticeChrome, PracticeContext } from '../modes';
import type { PracticeLesson } from '../practiceLessonStore';

const act = (React as unknown as { act: (callback: () => void | Promise<void>) => Promise<void> }).act;
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type TestChapter = ChapterLike & {
  keyInsight?: string;
  keyTerms?: Array<{ term: string; definition: string }>;
  narrative?: Array<{ label: string; text: string }>;
  objective?: string;
};

const memoryStorage = (seed: Record<string, unknown> = {}): StorageLike & { values: Map<string, string> } => {
  const values = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  return { values, getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
};
const cardIds = (items: Array<{ card: { cardId: string } }>) => items.map((item) => item.card.cardId);
const submitted = { latest: 80, best: 80, attempts: [{ at: 't', correct: 4, total: 5, accuracy: 80 }], submittedAt: 't' };

// A curriculum with no authored deck ------------------------------------------------------------

const INDUSTRY = 'test-industry';
const MODULE_ONE = 'How the Industry Works';
const MODULE_TWO = 'Market Structure';
const identityOf = (module: string, lesson: string) => `${INDUSTRY}::${module}::${lesson}`;
const L1 = identityOf(MODULE_ONE, 'Industry Definition & Scope');
const L2 = identityOf(MODULE_ONE, 'Buyers and Customers');
const L3 = identityOf(MODULE_TWO, 'Market Leaders');
const L4 = identityOf(MODULE_TWO, 'Lesson Without Chapters');

const L1_CHAPTERS: TestChapter[] = [
  {
    title: '01 What a Test Industry Sells',
    keyInsight: 'Test industry firms earn most of their margin from repeat service contracts.',
    keyTerms: [
      { term: 'Service contract', definition: 'A multi-year agreement that bundles maintenance, parts and support for one price.' },
      { term: 'Installed base', definition: 'The fleet of equipment already running at customer sites and generating service demand.' },
    ],
    narrative: [{ label: 'Real-world example', text: 'A forklift maker sells trucks at a thin margin, then earns steady revenue by maintaining the same trucks for ten years under contract.' }],
  },
  {
    title: '02 How Test Industry Firms Compete',
    keyInsight: 'Firms compete on uptime guarantees rather than the sticker price of equipment.',
    keyTerms: [{ term: 'Uptime guarantee', definition: 'A promise that equipment will run for an agreed share of scheduled hours each year.' }],
  },
  { title: '03 A Held Chapter', reviewStatus: 'Under Review', keyInsight: 'A held chapter would otherwise produce a card about pricing power.' },
];
const L2_CHAPTERS: TestChapter[] = [
  { title: '01 Who Buys From Test Industry Firms', keyInsight: 'Fleet buyers judge suppliers by lifetime cost rather than the purchase price.', keyTerms: [{ term: 'Fleet buyer', definition: 'A customer that purchases and operates many machines and compares suppliers on cost.' }] },
  { title: '02 How Buyers Choose Suppliers', keyInsight: 'Buyers shortlist suppliers that can prove uptime in comparable fleets.', keyTerms: [{ term: 'Total cost of ownership', definition: 'Everything a buyer pays to own a machine, from purchase through maintenance to disposal.' }] },
  { title: '03 Why Contracts Renew', keyInsight: 'Contracts renew when the supplier keeps downtime below the promised level.', keyTerms: [{ term: 'Renewal rate', definition: 'The share of expiring contracts that customers choose to extend for another term.' }] },
];
const L3_CHAPTERS: TestChapter[] = [
  { title: '01 Who Leads the Market', keyInsight: 'The market leader sets the service standard that smaller rivals must match.', keyTerms: [{ term: 'Market leader', definition: 'The supplier with the largest installed base and the strongest service network in a region.' }] },
  { title: '02 How Entry Happens', keyInsight: 'New entrants usually start by serving one region before expanding nationally.' },
];

const entry = (identity: string, title: string, moduleIndex: number, lessonIndex: number, moduleTitle: string, persistenceKey: string, chapters: TestChapter[]): CurriculumLesson => ({
  identity, title, persistenceKey, chapters, moduleIndex, lessonIndex, moduleTitle, moduleLabel: `Module ${moduleIndex + 1} · ${moduleTitle}`, open: () => undefined,
});
const CURRICULUM: LessonFlowCurriculum = {
  industryLabel: 'Test Industry',
  lessons: () => [
    entry(L1, 'Industry Definition & Scope', 0, 0, MODULE_ONE, 'ti-l1', L1_CHAPTERS),
    entry(L2, 'Buyers and Customers', 0, 1, MODULE_ONE, 'ti-l2', L2_CHAPTERS),
    entry(L3, 'Market Leaders', 1, 0, MODULE_TWO, 'ti-l3', L3_CHAPTERS),
    entry(L4, 'Lesson Without Chapters', 1, 1, MODULE_TWO, 'ti-l4', []),
  ],
};

const lessonOf = (options: { accessible?: boolean[]; activeChapter?: number; curriculum?: LessonFlowCurriculum | null } = {}): PracticeLesson => ({
  identity: L1,
  cards: L1_CHAPTERS,
  accessible: options.accessible ?? [true, true, false],
  persistenceKey: 'ti-l1',
  activeChapter: options.activeChapter ?? 0,
  ...(options.curriculum === null ? {} : { curriculum: options.curriculum ?? CURRICULUM }),
});

// One lesson, one chapter, 15 cards: more than a session takes.
const GRADES = ['Amber', 'Basalt', 'Cobalt', 'Dolomite', 'Emerald', 'Feldspar', 'Garnet', 'Hematite', 'Iolite', 'Jasper', 'Kyanite', 'Lazurite', 'Malachite', 'Nephrite'];
const BIG_IDENTITY = 'big-industry::Core Module::Fifteen Cards';
const BIG_CHAPTERS: TestChapter[] = [{
  title: '01 The Fifteen Card Chapter',
  keyInsight: 'Every grade of material is recorded in a ledger before it leaves the depot.',
  keyTerms: GRADES.map((grade) => ({ term: `${grade} grade`, definition: `The ${grade.toLowerCase()} ledger records every shipment that leaves the depot before noon.` })),
}];
const bigLesson = (): PracticeLesson => ({ identity: BIG_IDENTITY, cards: BIG_CHAPTERS, accessible: [true], persistenceKey: 'big-l1', activeChapter: 0 });

// Pure cases: resolveIndustryFlashcards -----------------------------------------------------------

export const resolveCases = [
  { name: 'a curriculum resolves every lesson with chapters, in curriculum order, each lesson once', run: () => {
    const data = resolveIndustryFlashcards(lessonOf(), memoryStorage())!;
    eq(data.lessons.map((lesson) => lesson.identity), [L1, L2, L3], 'lesson without chapters is left out');
    eq([data.generated, data.complete, data.industryId, data.industryLabel], [true, true, INDUSTRY, 'Test Industry'], 'generated cards for a curriculum without an authored deck');
    eq(data.lessons.map((lesson) => lesson.cards.length), [6, 6, 3], 'cards per lesson (held chapter 3 adds none)');
    eq([data.origin.lessonTitle, data.origin.moduleIndex, data.origin.moduleLabel, data.origin.chapterIndex, data.origin.chapterTitle], ['Industry Definition & Scope', 0, 'Module 1 · How the Industry Works', 0, 'What a Test Industry Sells'], 'origin describes the open lesson and chapter');
    eq(originLesson(data)?.identity, L1, 'originLesson');
    eq(data.lessons.map((lesson) => [lesson.eligibleChapters, lesson.chaptersWithCards]), [[2, 2], [3, 3], [2, 2]], 'held chapters are not eligible');
  } },
  { name: 'chapter, lesson, module and all scopes widen in curriculum order and never repeat a card', run: () => {
    const data = resolveIndustryFlashcards(lessonOf(), memoryStorage())!;
    eq(FLASHCARD_SCOPES, ['chapter', 'lesson', 'module', 'all'], 'scope order');
    const counts = Object.fromEntries(FLASHCARD_SCOPES.map((scope) => [scope, cardsInScope(data, scope).length]));
    eq(counts, { chapter: 4, lesson: 6, module: 12, all: 15 }, 'cards per scope');
    ok(cardsInScope(data, 'chapter').every((item) => item.chapterIndex === 0 && item.lessonIdentity === L1), 'chapter scope is the open chapter of the open lesson');
    eq(Array.from(new Set(cardsInScope(data, 'module').map((item) => item.lessonIdentity))), [L1, L2], 'module scope stays inside module 1');
    eq(Array.from(new Set(cardsInScope(data, 'all').map((item) => item.lessonIdentity))), [L1, L2, L3], 'all scope covers every lesson');
    const all = cardIds(cardsInScope(data, 'all'));
    eq(all.length, new Set(all).size, 'no card twice');
    eq(cardIds(cardsInScope(data, 'lesson')), all.slice(0, 6), 'lesson cards come first, in lesson order');
    const second = resolveIndustryFlashcards(lessonOf({ activeChapter: 1 }), memoryStorage())!;
    eq(cardsInScope(second, 'chapter').length, 2, 'chapter scope follows the chapter open in the reader');
    eq([second.origin.chapterIndex, second.origin.chapterTitle], [1, 'How Test Industry Firms Compete'], 'origin chapter');
    eq(resolveIndustryFlashcards(lessonOf({ activeChapter: 99 }), memoryStorage())!.origin.chapterIndex, 2, 'an out-of-range chapter is clamped');
  } },
  { name: 'lessons that are not open follow the stored chapter gate; the open lesson follows the reader', run: () => {
    const lockedFlags = (data: ReturnType<typeof resolveIndustryFlashcards>, identity: string) => data!.lessons.find((lesson) => lesson.identity === identity)!.cards.map((item) => item.locked);
    const fresh = resolveIndustryFlashcards(lessonOf({ accessible: [true, false, false] }), memoryStorage())!;
    eq(lockedFlags(fresh, L1), [false, false, false, false, true, true], 'open lesson: the reader gate (chapter 2 locked)');
    eq(lockedFlags(fresh, L2), [false, false, true, true, true, true].slice(0, 6).map((_, index) => index >= 2), 'lesson 2: only its first chapter is open');
    eq(lockedFlags(fresh, L3), [false, false, true], 'lesson 3: only its first chapter is open');
    const withCheck = memoryStorage({
      [quizStorageKey('ti-l2')]: { latest: null, best: null, attempts: [], chapters: { 0: submitted } },
    });
    eq(lockedFlags(resolveIndustryFlashcards(lessonOf(), withCheck)!, L2), [false, false, false, false, true, true], 'a submitted check of chapter 1 opens chapter 2');
    const completed = memoryStorage({ [LESSON_PROGRESS_KEY]: { [L3]: { completedAt: 't' } } });
    eq(lockedFlags(resolveIndustryFlashcards(lessonOf(), completed)!, L3), [false, false, false], 'a completed lesson opens every chapter');
    eq(lockedFlags(resolveIndustryFlashcards(lessonOf(), completed)!, L2), [false, false, true, true, true, true], 'another lesson stays on its own gate');
  } },
  { name: 'lessonChapterAccess mirrors the reader gate for a lesson that is not open', run: () => {
    const chapters = L2_CHAPTERS;
    const access = (storage: StorageLike | null, key: string | undefined = 'ti-l2', lessonChapters: ChapterLike[] = chapters) => lessonChapterAccess(L2, key, lessonChapters, storage);
    eq(access(memoryStorage()), [true, false, false], 'nothing stored: the first chapter only');
    eq(access(null), [true, false, false], 'no storage at all');
    eq(access(memoryStorage(), undefined), [true, false, false], 'no persistence key');
    eq(access(memoryStorage({ [quizStorageKey('ti-l2')]: { chapters: { 0: submitted } } })), [true, true, false], 'a submitted check opens the next chapter');
    eq(access(memoryStorage({ [quizStorageKey('ti-l2')]: { chapters: { 0: submitted, 1: submitted } } })), [true, true, true], 'two submitted checks open chapter 3');
    eq(access(memoryStorage({ [quizStorageKey('ti-l2')]: { chapters: { 0: { draft: { questionIds: ['q'], answers: { q: 'a' }, index: 0, startedAt: 't' } } } } })), [true, false, false], 'an unsubmitted draft opens nothing');
    eq(access(memoryStorage({ [quizStorageKey('ti-l2')]: { latest: 70, best: 70, attempts: [] } })), [true, true, true], 'a legacy lesson-level score counts as a completed lesson');
    eq(access(memoryStorage({ [LESSON_PROGRESS_KEY]: { [L2]: { completedAt: 't' } } })), [true, true, true], 'lesson completion opens every chapter');
    eq(access(memoryStorage({ [LESSON_PROGRESS_KEY]: { [L3]: { completedAt: 't' } } })), [true, false, false], 'completion of another lesson does not count');
    eq(access(memoryStorage({ [readerStorageKey('ti-l2')]: { completed: [0] } })), [true, true, false], 'a chapter marked complete before chapter checks existed keeps access');
    eq(access(memoryStorage({ [readerStorageKey('ti-l2')]: { completed: [0], migrations: ['lesson-flow-v1', 'chapter-flow-v1'] } })), [true, false, false], 'once the flow has run, reading alone does not open the next chapter');
    const held = [L2_CHAPTERS[0], { ...L2_CHAPTERS[1], reviewStatus: 'Under Review' }, L2_CHAPTERS[2]];
    eq(access(memoryStorage({ [LESSON_PROGRESS_KEY]: { [L2]: { completedAt: 't' } } }), 'ti-l2', held), [true, false, true], 'a held chapter is never open, even in a completed lesson');
    eq(access(memoryStorage({ [quizStorageKey('ti-l2')]: { chapters: { 0: submitted } } }), 'ti-l2', held), [true, false, true], 'a held chapter is skipped by the gate: chapter 3 opens after chapter 1');
  } },
  { name: 'without the curriculum only the open lesson resolves, and a failing curriculum is ignored', run: () => {
    const alone = resolveIndustryFlashcards(lessonOf({ curriculum: null }), memoryStorage())!;
    eq([alone.complete, alone.lessons.map((lesson) => lesson.identity), alone.industryLabel], [false, [L1], 'Test Industry'], 'open lesson only; label humanised from the industry id');
    eq(alone.origin.moduleLabel, MODULE_ONE, 'module label falls back to the identity');
    eq(Object.fromEntries(FLASHCARD_SCOPES.map((scope) => [scope, cardsInScope(alone, scope).length])), { chapter: 4, lesson: 6, module: 6, all: 6 }, 'module and all collapse onto the lesson');
    const broken = resolveIndustryFlashcards(lessonOf({ curriculum: { industryLabel: 'Broken', lessons: () => { throw new Error('boom'); } } }), memoryStorage())!;
    eq([broken.complete, broken.lessons.length, broken.industryLabel], [false, 1, 'Broken'], 'a throwing curriculum falls back to the open lesson');
    const foreign = resolveIndustryFlashcards({ ...lessonOf(), identity: 'other-industry::M::Not In The Curriculum' }, memoryStorage())!;
    eq([foreign.complete, foreign.lessons.length], [false, 1], 'a lesson the curriculum does not list resolves alone');
    eq(resolveIndustryFlashcards(null, memoryStorage()), null, 'no open lesson');
    eq(resolveIndustryFlashcards({ ...lessonOf(), identity: '' }, memoryStorage()), null, 'no industry in the identity');
  } },
  { name: 'locked cards are counted but never put in a scope deck, and held chapters stay out entirely', run: () => {
    const data = resolveIndustryFlashcards(lessonOf({ accessible: [true, false, false] }), memoryStorage())!;
    const counts = (scope: FlashcardScopeId) => {
      const items = cardsInScope(data, scope);
      return [items.filter((item) => !item.locked).length, items.length];
    };
    eq(FLASHCARD_SCOPES.map(counts), [[4, 4], [4, 6], [6, 12], [8, 15]], 'open now / in total per scope');
    const deck = scopeDeck(data, 'module');
    eq([deck.deckId, deck.generated, deck.cards.length], ['scope-module', true, 6], 'scope deck holds the open cards');
    const lockedBacks = cardsInScope(data, 'all').filter((item) => item.locked).map((item) => item.card.back);
    ok(lockedBacks.length === 7 && lockedBacks.every((back) => !scopeDeck(data, 'all').cards.some((card) => card.back === back)), 'no locked answer in the deck');
    const everyCard = cardsInScope(data, 'all');
    ok(!everyCard.some((item) => /pricing power/.test(item.card.back)), 'the held chapter produced no card');
    eq(coverageSummary(data), { total: 15, available: 8, locked: 7, excluded: 0, lessons: 3, lessonsWithCards: 3, modules: 2, modulesWithCards: 2, eligibleChapters: 7, chaptersWithCards: 7 }, 'coverage summary');
    eq(scopeDeck(data, 'chapter').title, 'Chapter 1: What a Test Industry Sells', 'scope title');
    eq(scopeDeck(data, 'all').title, 'All Test Industry cards', 'full deck title');
  } },
  { name: 'resolving practice reads progress and never writes it', run: () => {
    const storage = memoryStorage({ [LESSON_PROGRESS_KEY]: { [L2]: { access: 'unlocked', persistenceKey: 'ti-l2' } }, [quizStorageKey('ti-l2')]: { chapters: { 0: submitted } } });
    const before = JSON.stringify([...storage.values]);
    resolveIndustryFlashcards(lessonOf(), storage);
    eq(JSON.stringify([...storage.values]), before, 'storage unchanged');
  } },
  { name: 'FLASHCARDS_MODE resolves { industry, lesson } and summarises the lesson or the open chapter', run: () => {
    const context: PracticeContext = { learnerScope: null };
    const resolved = FLASHCARDS_MODE.resolve(lessonOf({ accessible: [true, false, false] }), context)!;
    eq(Object.keys(resolved).sort(), ['industry', 'lesson'], 'resolve returns the industry deck and the open lesson, not a lesson result');
    eq([resolved.lesson.identity, resolved.industry.lessons.length], [L1, 3], 'shape');
    const summary = FLASHCARDS_MODE.summarise(resolved, context);
    eq([summary.available, summary.completed, summary.locked, summary.due, summary.industryLabel], [4, 0, 2, 0, 'Test Industry'], 'lesson summary counts open cards, locked ones separately');
    eq(summary.progressLabel, '0 of 4 cards rated · 15 across Test Industry', 'progress names the curriculum total');
    eq(summary.lockedLabel, '2 more cards open as you complete earlier chapters in this lesson.', 'locked label');
    const chapterContext: PracticeContext = { learnerScope: null, chapterOnly: true };
    const chapterResolved = FLASHCARDS_MODE.resolve(lessonOf({ accessible: [true, false, false] }), chapterContext)!;
    const chapterSummary = FLASHCARDS_MODE.summarise(chapterResolved, chapterContext);
    eq([chapterSummary.available, chapterSummary.locked, chapterSummary.progressLabel], [4, 0, '0 of 4 cards rated in this chapter'], 'chapter summary leaves out the curriculum total');
    eq(chapterSummary.lockedLabel, undefined, 'nothing locked in the open chapter');
    eq(FLASHCARDS_MODE.resolve(lessonOf({ accessible: [true, false, false], activeChapter: 1 }), chapterContext), null, 'chapter-only: a locked chapter offers nothing');
    eq(FLASHCARDS_MODE.resolve(lessonOf({ activeChapter: 2 }), chapterContext), null, 'chapter-only: a held chapter offers nothing');
    ok(FLASHCARDS_MODE.resolve(lessonOf({ activeChapter: 2 }), context), 'the lesson scope still resolves when the open chapter is held');
    eq(FLASHCARDS_MODE.resolve({ ...lessonOf(), identity: 'coffee::M::L', cards: [{ title: 'What Is Coffee Retail?' }], accessible: [true], curriculum: undefined }, context), null, 'a lesson whose chapters show no key insight, term or example has no cards');
    eq(FLASHCARDS_MODE.ownsLayout, true, 'the mode lays out its own overview');
    eq(FLASHCARD_SESSION_LIMIT, 12, 'sessions are capped at 12 cards');
  } },
];

// Pure cases: chapterLessonDeck -------------------------------------------------------------------

const deckOf = (chapters: TestChapter[], seen = new Set<string>(), identity = 'test-industry::Module::Lesson', lessonTitle = 'Lesson', moduleIndex = 0) => chapterLessonDeck({
  industryId: INDUSTRY, industryLabel: 'Test Industry', identity, lessonTitle, moduleIndex, moduleLabel: 'Module', chapters,
}, seen);
const fronts = (deck: { cards: Array<{ front: string }> }) => deck.cards.map((card) => card.front);

export const deckCases = [
  { name: 'every card is text its chapter displays, with a stable ID, a source excerpt and a same-chapter explanation', run: () => {
    const deck = deckOf(L1_CHAPTERS);
    eq([deck.deckId, deck.generated, deck.title], ['kt-test-industry-m1-lesson', true, 'Lesson: chapter cards'], 'deck identity');
    eq(deck.chapters.map((chapter) => [chapter.chapterId, chapter.number, chapter.title, chapter.sourceTitle]), [
      ['kt-test-industry-m1-lesson-ch01', 1, 'What a Test Industry Sells', '01 What a Test Industry Sells'],
      ['kt-test-industry-m1-lesson-ch02', 2, 'How Test Industry Firms Compete', '02 How Test Industry Firms Compete'],
      ['kt-test-industry-m1-lesson-ch03', 3, 'A Held Chapter', '03 A Held Chapter'],
    ], 'the held chapter keeps its place');
    eq(deck.cards.map((card) => card.cardId), [
      'ki-test-industry-what-a-test-industry-sells',
      'kt-test-industry-service-contract',
      'kt-test-industry-installed-base',
      'ex-test-industry-what-a-test-industry-sells-real-world-example',
      'ki-test-industry-how-test-industry-firms-compete',
      'kt-test-industry-uptime-guarantee',
    ], 'IDs come from the curriculum, the chapter title and the term');
    deck.cards.forEach((card) => {
      eq(card.sourceRefs, [{ file: 'reader:test-industry::Module::Lesson', chapterId: card.chapterId, excerpt: card.back }], `${card.cardId}: the excerpt is the answer`);
      ok(card.explanation.length > 0 && card.practicalExample === '', `${card.cardId}: explanation, no authored example`);
    });
    const term = deck.cards.find((card) => card.cardId === 'kt-test-industry-service-contract')!;
    eq([term.front, term.keyTerms, term.explanation], ['What does \u201cService contract\u201d mean?', ['Service contract'], 'Test industry firms earn most of their margin from repeat service contracts.'], 'a term card is explained by the chapter sentence that names it');
    const example = deck.cards.find((card) => card.cardId.startsWith('ex-'))!;
    eq([example.front, example.explanation], ['Give a real-world example for \u201cWhat a Test Industry Sells\u201d.', 'Test industry firms earn most of their margin from repeat service contracts.'], 'an example card is explained by the key insight');
    eq(deckOf([{ title: '01 Only A Chapter Title', keyInsight: 'Margins in this industry come almost entirely from service work.' }]).cards[0].explanation, 'Shown in the chapter \u201cOnly A Chapter Title\u201d.', 'no other sentence in the chapter: a plain pointer to the chapter');
  } },
  { name: 'template definitions, shared definitions and definitions that only repeat the term become no card', run: () => {
    const shared = 'A broad group of ideas the sector keeps coming back to.';
    const chapters: TestChapter[] = [
      {
        title: '01 Definitions',
        keyTerms: [
          { term: 'Alpha', definition: 'A core Test concept related to alpha.' },
          { term: 'Beta', definition: 'An important term for the supply side of the sector.' },
          { term: 'Gamma', definition: shared },
          { term: 'Delta', definition: shared },
          { term: 'Uptime', definition: 'Uptime is the uptime of equipment.' },
          { term: 'Epsilon', definition: 'Too short' },
          { term: 'Zeta', definition: 'The share of machines that are running when a customer needs them.' },
        ],
      },
    ];
    eq(Array.from(genericDefinitions([chapters])), ['a broad group of ideas the sector keeps coming back to.'], 'a definition given to two terms is generic');
    eq(fronts(deckOf(chapters)), ['What does \u201cZeta\u201d mean?'], 'only the specific, non-circular, long-enough definition survives');
    const split = deckOf([{ ...chapters[0], keyTerms: [{ term: 'Gamma', definition: shared }] }]);
    eq(split.cards.length, 1, 'the same definition under one term only is not shared within a lesson');
    const lessonA = { ...chapters[0], title: '01 First Lesson', keyTerms: [{ term: 'Gamma', definition: shared }] };
    const lessonB = { ...chapters[0], title: '01 Second Lesson', keyTerms: [{ term: 'Delta', definition: shared }] };
    const generic = genericDefinitions([[lessonA], [lessonB]]);
    eq(chapterLessonDeck({ industryId: INDUSTRY, industryLabel: 'T', identity: 'a', lessonTitle: 'A', moduleIndex: 0, moduleLabel: 'M', chapters: [lessonA] }, new Set(), generic).cards.length, 0, 'curriculum-wide: shared by two terms in two lessons, so neither lesson gets it');
  } },
  { name: 'only worked examples become example cards: instructions, other labels and wrong lengths are skipped', run: () => {
    const realExample = 'A regional carrier cut idle trucks by sharing depots with a rival and splitting the fuel savings between both firms.';
    const chapters: TestChapter[] = [{
      title: '01 Examples',
      narrative: [
        { label: 'Real-world example', text: realExample },
        { label: 'Vietnam example', text: 'A Vietnamese retailer moved its stock to one depot near Ho Chi Minh City to shorten delivery runs across the south.' },
        { label: 'Example', text: 'Use verified service scope for every claim made in this section of the chapter today.' },
        { label: 'Global example', text: 'Short example text.' },
        { label: 'Global example', text: Array.from({ length: 90 }, (_, index) => `word${index}`).join(' ') },
        { label: 'Case study', text: 'A distributor reorganised its warehouses after losing two large customers in a single quarter of trading.' },
        { label: 'Real-world example', text: realExample },
      ],
    }];
    const deck = deckOf(chapters);
    eq(fronts(deck), ['Give a real-world example for \u201cExamples\u201d.', 'Give a Vietnam example for \u201cExamples\u201d.'], 'a real-world and a Vietnam example; the instruction, the short, the long, the other label and the duplicate are skipped');
    eq(deck.cards.map((card) => card.cardId), ['ex-test-industry-examples-real-world-example', 'ex-test-industry-examples-vietnam-example'], 'IDs carry the label');
  } },
  { name: 'insights: boilerplate, short sentences and review markers never become cards; only the first sentence is used', run: () => {
    const chapters: TestChapter[] = [
      { title: '01 Boilerplate', keyInsight: 'This chapter focuses on the main sections of the industry and how they connect.' },
      { title: '02 Short', keyInsight: 'Margins matter a lot.' },
      { title: '03 Marker', keyInsight: 'Verification required before this claim about market size can be used anywhere.' },
      { title: '04 Two Sentences', keyInsight: 'Service work carries the margin in this sector. Equipment sales only open the door to it.' },
    ];
    const deck = deckOf(chapters);
    eq(deck.cards.map((card) => [card.cardId, card.back]), [['ki-test-industry-two-sentences', 'Service work carries the margin in this sector.']], 'first sentence of the one eligible insight');
    ok(!deck.cards.some((card) => /verification required/i.test(card.back)), 'no review marker in an answer');
  } },
  { name: 'duplicates are dropped by ID, by answer and by term, within a lesson and across lessons', run: () => {
    const insight = 'Service contracts give the supplier a predictable revenue stream every year.';
    const withDuplicates: TestChapter[] = [
      { title: '01 First', keyInsight: insight, keyTerms: [{ term: 'Retention', definition: 'The share of customers who stay with a supplier from one year to the next.' }] },
      { title: '02 Second', keyInsight: insight, keyTerms: [{ term: 'Retention', definition: 'The percentage of buyers that renew their agreement when the term ends.' }, { term: 'Churn', definition: 'The share of customers who stay with a supplier from one year to the next.' }] },
    ];
    const deck = deckOf(withDuplicates);
    eq(deck.cards.map((card) => card.cardId), ['ki-test-industry-first', 'kt-test-industry-retention'], 'same insight in chapter 2 (same answer), same term again and a definition that repeats an earlier answer are dropped');
    const seen = new Set<string>();
    const first = deckOf([L1_CHAPTERS[0]], seen, 'test-industry::Module::Lesson One', 'Lesson One');
    const repeat = deckOf([L1_CHAPTERS[0]], seen, 'test-industry::Module::Lesson Two', 'Lesson Two', 1);
    eq([first.cards.length, repeat.cards.length], [4, 0], 'a card shown in an earlier lesson of the curriculum is not repeated in a later one');
    eq(first.deckId === repeat.deckId, false, 'decks are per lesson');
    const unrelated = deckOf([{ title: '01 Elsewhere', keyInsight: 'Ports compete on turnaround time more than on the fee they charge.' }], seen, 'test-industry::Module::Lesson Three', 'Lesson Three', 1);
    eq(unrelated.cards.length, 1, 'new content in a later lesson still produces cards');
  } },
  { name: 'held chapters produce no cards but keep their place; held text is never an answer', run: () => {
    const chapters: TestChapter[] = [
      { title: '01 Open', keyInsight: 'Open chapters can produce a key insight card for the learner.' },
      { title: '02 Held', reviewStatus: 'Under Review', keyInsight: 'This held chapter must never produce any card for the learner.', keyTerms: [{ term: 'Held term', definition: 'A definition that must stay hidden while its chapter is held.' }], narrative: [{ label: 'Real-world example', text: 'A held example that is long enough to pass the length rules but must still stay hidden.' }] },
      { title: '03 Open Again', keyTerms: [{ term: 'Review gate', definition: 'Do Not Publish until the legal team has checked every figure in this definition.' }, { term: 'Open gate', definition: 'A checkpoint a learner passes before the next chapter becomes available.' }] },
    ];
    const deck = deckOf(chapters);
    eq(deck.chapters.map((chapter) => chapter.number), [1, 2, 3], 'the held chapter keeps its number');
    eq(deck.cards.map((card) => card.cardId), ['ki-test-industry-open', 'kt-test-industry-open-gate'], 'no card from the held chapter, none whose answer carries a hold marker');
    eq(deck.cards.map((card) => card.chapterId), ['kt-test-industry-m1-lesson-ch01', 'kt-test-industry-m1-lesson-ch03'], 'cards stay attached to their own chapter');
    const resolved = resolveIndustryFlashcards({ identity: L1, cards: chapters, accessible: [true, false, true], persistenceKey: 'x' }, memoryStorage())!;
    eq(originLesson(resolved)!.cards.map((item) => item.chapterIndex), [0, 2], 'the scope view never offers a held chapter');
  } },
  { name: 'IDs ignore position: reordering chapters keeps every ID, and an ID that would end in a number is suffixed', run: () => {
    const [one, two] = L1_CHAPTERS;
    const forward = deckOf([one, two]);
    const backward = deckOf([two, one]);
    eq(cardIds(forward.cards.map((card) => ({ card }))).sort(), cardIds(backward.cards.map((card) => ({ card }))).sort(), 'same IDs after a reorder');
    ok(forward.cards.every((card) => card.chapterId.endsWith('ch01') || card.chapterId.endsWith('ch02')), 'only the chapter attachment follows the position');
    const numbered = deckOf([{ title: '01 Tiers', keyTerms: [{ term: 'Tier 1', definition: 'The group of suppliers that sell directly to the maker of the finished product.' }] }]);
    eq(numbered.cards[0].cardId, 'kt-test-industry-tier-1-card', 'a positional-looking ID gets a suffix');
    const diacritics = deckOf([{ title: '01 Terms', keyTerms: [{ term: 'Đại lý', definition: 'An agent that sells the products of one supplier to local customers for a fee.' }] }]);
    eq(diacritics.cards[0].cardId, 'kt-test-industry-dai-ly', 'accents and the Vietnamese d-bar are folded');
    eq(deckOf([{ title: '01 Blank Term', keyTerms: [{ term: '', definition: 'A definition with no term attached to it at all in the data.' }] }]).cards.length, 0, 'a term with no usable ID is skipped');
  } },
];

// Overview cases (DOM) ----------------------------------------------------------------------------

let root: Root | null = null;
let container: HTMLElement;
let learnerCounter = 0;
const $ = (selector: string) => {
  const found = document.querySelector<HTMLElement>(selector);
  if (!found) throw new Error(`Not found: ${selector}`);
  return found;
};
const tid = (testId: string) => $(`[data-testid="${testId}"]`);
const has = (testId: string) => Boolean(document.querySelector(`[data-testid="${testId}"]`));
const text = (testId: string) => (tid(testId).textContent ?? '').replace(/\s+/g, ' ').trim();
const bodyText = () => document.body.textContent ?? '';
const click = async (element: Element) => act(async () => { (element as HTMLElement).click(); });
const byText = (label: string | RegExp) => {
  const match = Array.from(document.querySelectorAll('button')).find((node) => {
    const name = (node.getAttribute('aria-label') ?? node.textContent ?? '').replace(/\s+/g, ' ').trim();
    return typeof label === 'string' ? name === label : label.test(name);
  });
  if (!match) throw new Error(`No button ${label}`);
  return match;
};
const seedStorage = (entries: Record<string, unknown> = {}) => {
  window.localStorage.clear();
  Object.entries(entries).forEach(([key, value]) => window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)));
};

interface Mounted {
  events: { sessions: boolean[]; scopes: string[] };
  learner: string;
  resolved: NonNullable<ReturnType<typeof FLASHCARDS_MODE.resolve>>;
}

async function mountMode(lesson: PracticeLesson, options: { chapterOnly?: boolean; initialScope?: string; seed?: (learner: string) => Record<string, unknown> } = {}): Promise<Mounted> {
  const learner = `scopes-test-${learnerCounter += 1}`;
  if (options.seed) seedStorage(options.seed(learner));
  const context: PracticeContext = { learnerScope: learner, chapterOnly: options.chapterOnly };
  const resolved = FLASHCARDS_MODE.resolve(lesson, context);
  if (!resolved) throw new Error('The mode resolved nothing for this lesson');
  const events: Mounted['events'] = { sessions: [], scopes: [] };
  const chrome: PracticeChrome = {
    headingId: 'flashcards-heading',
    headingRef: React.createRef<HTMLHeadingElement>(),
    lessonTitle: resolved.industry.origin.lessonTitle,
    moduleTitle: resolved.industry.origin.moduleLabel,
    initialScope: options.initialScope,
    onScopeChange: (scope) => events.scopes.push(scope),
  };
  const Body = FLASHCARDS_MODE.Body;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => {
    root!.render(<Body resolved={resolved} context={context} onSessionChange={(next) => events.sessions.push(next)} chrome={chrome} />);
  });
  return { events, learner, resolved };
}

async function cleanup() {
  if (root) await act(async () => root!.unmount());
  root = null;
  container?.remove();
  window.localStorage.clear();
}

const scopeButtons = () => Array.from(document.querySelectorAll('[data-testid^="flashcards-scope-"]')).map((node) => node.getAttribute('data-testid')!.replace('flashcards-scope-', ''));
const pressed = () => Array.from(document.querySelectorAll('[data-testid^="flashcards-scope-"]')).filter((node) => node.getAttribute('aria-pressed') === 'true').map((node) => node.getAttribute('data-testid')!.replace('flashcards-scope-', ''));
const tiles = () => [text('flashcards-available'), text('flashcards-due'), text('flashcards-mastery')];

async function revealAndRate(rating: 'again' | 'hard' | 'good' | 'easy') {
  await click(tid('reveal-answer'));
  await click($(`button[data-rating="${rating}"]`));
}

const dueState = (cardId: string, rating: 'good' | 'again', hoursAgo: number) => applyRating(initialReviewState(cardId, 'scope-chapter'), rating, Date.now() - hoursAgo * 60 * 60 * 1000);
const snapshotOf = (states: Array<ReturnType<typeof dueState>>) => ({ schemaVersion: 1, cards: Object.fromEntries(states.map((state) => [state.cardId, state])), updatedAt: new Date().toISOString() });

const domCases = [
  { name: 'the overview offers four scopes with a curriculum and chapter plus lesson without one; chapter is the default', run: async () => {
    seedStorage();
    await mountMode(lessonOf());
    eq(scopeButtons(), ['chapter', 'lesson', 'module', 'all'], 'scope buttons');
    eq(pressed(), ['chapter'], 'This chapter is selected first');
    eq(tid('practice-flashcards').getAttribute('data-scope'), 'chapter', 'data-scope');
    eq(text('flashcards-scope-all'), 'All Test Industry cards3 lessons10 open now · 15 in total', 'the full-deck button names the curriculum and its size');
    await cleanup();

    seedStorage();
    await mountMode(lessonOf({ curriculum: null }));
    eq(scopeButtons(), ['chapter', 'lesson'], 'without the curriculum, module and full-deck scopes are not offered');
    ok(text('flashcards-industry-total').includes('Other lessons could not be loaded, so totals cover this lesson only.'), 'the total line says why');
    await cleanup();

    seedStorage();
    await mountMode(lessonOf(), { chapterOnly: true });
    eq([scopeButtons(), pressed()], [['chapter', 'lesson', 'module', 'all'], ['chapter']], 'from the Learning Mode Chooser the deck starts on the open chapter and can widen');
    ok(!has('flashcards-industry-total'), 'and no curriculum total');
    eq(text('flashcards-available'), '4', 'chapter cards');
    await cleanup();
  } },
  { name: 'tiles and scope buttons count what is open now; the locked note appears only when cards wait', run: async () => {
    seedStorage();
    await mountMode(lessonOf({ accessible: [true, false, false] }));
    eq(tiles(), ['4', '0', '0%'], 'chapter scope: available, due, mastery');
    ok(!has('flashcards-locked-note'), 'the open chapter has no locked cards');
    eq(text('flashcards-scope-chapter').endsWith('4 open now'), true, 'no "in total" when everything is open');
    await click(tid('flashcards-scope-lesson'));
    eq([pressed(), tiles()], [['lesson'], ['4', '0', '0%']], 'lesson scope');
    ok(text('flashcards-locked-note').startsWith('2 more cards unlock later.'), 'two cards of chapter 2 wait');
    ok(!text('flashcards-locked-note').includes('first chapter of every lesson'), 'lesson help is about this lesson');
    ok(text('flashcards-scope-lesson').endsWith('4 open now · 6 in total'), 'scope button counts');
    await click(tid('flashcards-scope-module'));
    eq(tiles(), ['6', '0', '0%'], 'module scope adds the first chapter of lesson 2');
    ok(text('flashcards-locked-note').startsWith('6 more cards unlock later.'), 'six cards wait in module 1');
    ok(text('flashcards-locked-note').includes('The first chapter of every lesson is always open.'), 'wider scopes explain the per-lesson gate');
    await click(tid('flashcards-scope-all'));
    eq(tiles(), ['8', '0', '0%'], 'all scope');
    eq(text('flashcards-industry-total').startsWith('Test Industry: 15 cards in total, 8 open now, across 3 lessons.'), true, 'curriculum total');
    ok(text('flashcards-industry-total').includes('Every answer is text its chapter shows'), 'generated decks say where answers come from');
    ok(!text('flashcards-industry-total').includes('could not be loaded'), 'complete curriculum');
    eq(tid('practice-flashcards').getAttribute('data-scope'), 'all', 'data-scope follows the selection');
    await cleanup();
  } },
  { name: 'Study takes at most 12 cards, Reveal answer shows the answer, and Study more cards continues with the rest', run: async () => {
    seedStorage();
    const { resolved } = await mountMode(bigLesson());
    const deck = scopeDeck(resolved.industry, 'chapter');
    eq(deck.cards.length, 15, 'fixture: 15 cards in the chapter');
    eq(tiles()[0], '15', 'all 15 are available');
    ok(text('flashcards-study').length > 0 && !has('flashcards-review') && has('flashcards-zero-due'), 'study offered; nothing due');
    ok(text('flashcards-zero-due').startsWith('Nothing due for review.'), 'zero-due message');
    await click(tid('flashcards-study'));
    ok(text('session-progress').startsWith('Card 1 of 12'), `session is capped: ${text('session-progress')}`);
    const first = deck.cards[0];
    ok(!bodyText().includes(first.back), 'the answer is not in the DOM before it is revealed');
    ok(has('reveal-answer') && !has('recall-rating'), 'Reveal answer is offered, ratings are not');
    await click(tid('reveal-answer'));
    ok((tid('flashcard-back').textContent ?? '').includes(first.back), 'the answer is shown');
    ok(has('recall-rating') && !has('reveal-answer'), 'ratings replace the reveal button');
    await click($('button[data-rating="good"]'));
    for (let i = 1; i < FLASHCARD_SESSION_LIMIT; i += 1) await revealAndRate('good');
    ok(text('review-summary').includes('You rated 12 of 12 cards'), `12 cards rated: ${text('review-summary')}`);
    await click(byText('Study more cards'));
    ok(text('session-progress').startsWith('Card 1 of 12'), 'the next session is capped too');
    const unstudied = deck.cards.slice(12).map((card) => card.cardId);
    eq(unstudied.includes(tid('flashcard-front').getAttribute('data-card-id')!), true, 'it starts with the cards not studied yet');
    for (let i = 0; i < unstudied.length; i += 1) {
      const shown = tid('flashcard-front').getAttribute('data-card-id')!;
      ok(unstudied.includes(shown), `card ${i + 1} of the next session is still unstudied (${shown})`);
      await revealAndRate('good');
    }
    await click(tid('flashcards-session-back'));
    eq(tiles(), ['15', '0', '0%'], 'back on the overview');
  } },
  { name: 'Review takes at most 12 due cards, forgotten cards first, and the overview shows the due count', run: async () => {
    seedStorage();
    const probe = await mountMode(bigLesson());
    const ids = scopeDeck(probe.resolved.industry, 'chapter').cards.map((card) => card.cardId);
    await cleanup();
    const states = ids.slice(0, 14).map((cardId, index) => dueState(cardId, index === 13 ? 'again' : 'good', index === 13 ? 1 : 72));
    await mountMode(bigLesson(), { seed: (learner) => ({ [storageKeyFor(learner)]: snapshotOf(states) }) });
    eq(tiles()[0], '15', 'available');
    eq(text('flashcards-due'), '14', 'due tile');
    ok(!has('flashcards-zero-due'), 'no zero-due message while cards are due');
    eq(text('flashcards-review'), 'Review 14 due', 'review button names the due count');
    await click(tid('flashcards-review'));
    eq(tid('flashcard-session').getAttribute('data-mode'), 'review', 'review session');
    ok(text('session-progress').startsWith('Card 1 of 12'), 'review is capped at 12');
    eq(tid('flashcard-front').getAttribute('data-card-id'), ids[13], 'the forgotten card comes first');
    ok(bodyText().includes('Forgotten last time'), 'review reason shown');
  } },
  { name: 'Scope memory and session events reach the dialog through the chrome; the overview has no Back button', run: async () => {
    seedStorage();
    const mounted = await mountMode(lessonOf(), { initialScope: 'module' });
    eq([pressed(), mounted.events.scopes], [['module'], ['module']], 'a stored scope is restored and reported');
    ok(text('practice-context').startsWith('From Industry Definition & Scope'), 'lesson context in the header');
    ok(text('practice-context').endsWith('Module 1 · How the Industry Works'), 'module label from the curriculum');
    const header = tid('practice-flashcards').querySelector('header')!;
    eq(header.firstElementChild?.tagName, 'P', 'the header starts with its eyebrow: no control and no space reserved above it');
    ok(!has('flashcards-overview-back') && !Array.from(document.querySelectorAll('button')).some((node) => /^Back to /.test((node.textContent ?? '').trim())), 'no Back to ... button on the overview');
    await click(tid('flashcards-scope-lesson'));
    eq(mounted.events.scopes, ['module', 'lesson'], 'scope changes are reported');
    await click(tid('flashcards-study'));
    ok(mounted.events.sessions.includes(true), 'the dialog is told a session started');
    ok(!has('flashcards-scope') && !has('flashcards-progress-summary'), 'no overview chrome inside a session');
    ok(has('flashcards-session-back'), 'a session has its own way back to the overview');
    await click(tid('flashcards-session-back'));
    eq(mounted.events.sessions[mounted.events.sessions.length - 1], false, 'and back on the overview');
    ok(has('flashcards-progress-summary') && has('flashcards-scope'), 'overview chrome returns');
    await cleanup();

    seedStorage();
    await mountMode(lessonOf({ curriculum: null }), { initialScope: 'all' });
    eq(pressed(), ['chapter'], 'a stored scope that is not offered falls back to the chapter');
    await cleanup();
    seedStorage();
    await mountMode(lessonOf(), { chapterOnly: true, initialScope: 'lesson' });
    eq(tid('practice-flashcards').getAttribute('data-scope'), 'lesson', 'a stored scope is restored in the chapter flow too');
  } },
  { name: 'a chapter with no cards offers the whole lesson instead', run: async () => {
    seedStorage();
    await mountMode(lessonOf({ activeChapter: 2 }));
    ok(has('flashcards-none-open') && !has('flashcards-study'), 'nothing to study in the held chapter');
    eq(text('flashcards-available'), '0', 'available tile');
    ok(text('flashcards-none-open').includes('This chapter has no cards of its own.'), 'message');
    await click(byText('Show the whole lesson'));
    eq(pressed(), ['lesson'], 'switched to the lesson scope');
    ok(has('flashcards-study') && !has('flashcards-none-open'), 'cards are offered');
    eq(tiles()[0], '6', 'lesson cards');
  } },
  { name: 'cards of chapters that are still locked never reach the DOM, in any scope or session', run: async () => {
    seedStorage();
    const { resolved } = await mountMode(lessonOf({ accessible: [true, false, false] }));
    const locked = cardsInScope(resolved.industry, 'all').filter((item) => item.locked);
    eq(locked.length, 7, 'fixture: seven locked cards');
    const noLockedText = (where: string) => locked.forEach((item) => ok(!bodyText().includes(item.card.back) && !bodyText().includes(item.card.front), `${where}: locked card ${item.card.cardId} is hidden`));
    for (const scope of FLASHCARD_SCOPES) {
      await click(tid(`flashcards-scope-${scope}`));
      noLockedText(`${scope} overview`);
    }
    await click(tid('flashcards-study'));
    const open = cardsInScope(resolved.industry, 'all').filter((item) => !item.locked).length;
    ok(text('session-progress').startsWith(`Card 1 of ${open}`), 'only open cards are queued');
    for (let i = 0; i < open; i += 1) {
      await click(tid('reveal-answer'));
      noLockedText(`card ${i + 1}`);
      await click($('button[data-rating="easy"]'));
    }
    ok(has('review-summary'), 'session completed');
  } },
  { name: 'My notes and key terms show open chapters only, read the reader\'s own record and never write it', run: async () => {
    const reader = JSON.stringify({ notes: { 0: 'my note on chapter one', 1: 'my note on chapter two', 2: 'note on a held chapter' }, completed: [0] });
    seedStorage({ [readerStorageKey('ti-l1')]: reader });
    await mountMode(lessonOf());
    const panel = tid('flashcards-support-panel');
    eq(Array.from(panel.querySelectorAll('select option')).map((option) => option.textContent), ['Chapter 1: What a Test Industry Sells', 'Chapter 2: How Test Industry Firms Compete'], 'open chapters only: the held chapter is not listed');
    eq(text('flashcards-chapter-note'), 'my note on chapter one', 'note for the open chapter');
    ok((panel.textContent ?? '').includes('Service contract') && !(panel.textContent ?? '').includes('Uptime guarantee'), 'key terms of chapter 1 only');
    ok(!bodyText().includes('note on a held chapter'), 'the held chapter note is not shown');
    const select = panel.querySelector('select') as HTMLSelectElement;
    await act(async () => {
      select.value = '1';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
    eq(text('flashcards-chapter-note'), 'my note on chapter two', 'note follows the selected chapter');
    ok((tid('flashcards-support-panel').textContent ?? '').includes('Uptime guarantee'), 'key terms follow the selected chapter');
    await click(tid('flashcards-study'));
    ok(!has('flashcards-support-panel'), 'the panel is not shown during a session');
    eq(window.localStorage.getItem(readerStorageKey('ti-l1')), reader, 'the reader record is unchanged');
    await cleanup();

    seedStorage();
    await mountMode(lessonOf({ accessible: [true, false, false] }));
    ok(text('flashcards-support-panel').includes('Chapter 1: What a Test Industry Sells') && !has('flashcards-chapter-note'), 'one open chapter: no selector, and no note yet');
    ok(!text('flashcards-support-panel').includes('My saved note') && !bodyText().includes('write them beside the chapter'), 'no notes section, and no invitation to write notes, when none were saved');
  } },
  { name: 'practising writes only the learner flashcard record', run: async () => {
    const seed = {
      [LESSON_PROGRESS_KEY]: { [L1]: { access: 'unlocked', persistenceKey: 'ti-l1' } },
      [quizStorageKey('ti-l1')]: { latest: null, best: null, attempts: [], chapters: { 0: submitted } },
      [readerStorageKey('ti-l1')]: { notes: { 0: 'kept' }, completed: [0] },
    };
    seedStorage(seed);
    const { learner } = await mountMode(lessonOf());
    await click(tid('flashcards-study'));
    await revealAndRate('good');
    await revealAndRate('again');
    const stored = JSON.parse(window.localStorage.getItem(storageKeyFor(learner)) ?? '{}');
    eq(Object.keys(stored.cards ?? {}).length, 2, 'two ratings stored under the learner key');
    eq(Object.keys(window.localStorage).sort(), [...Object.keys(seed), storageKeyFor(learner)].sort(), 'no other key written');
    Object.entries(seed).forEach(([key, value]) => eq(JSON.parse(window.localStorage.getItem(key) ?? 'null'), value, `${key} unchanged`));
  } },
];

export const overviewCases = domCases.map(({ name, run }) => ({
  name,
  run: async () => {
    try {
      await run();
    } finally {
      await cleanup();
    }
  },
}));

export const runFlashcardScopeTests = async () => {
  await runSuite('flashcard scopes', resolveCases);
  await runSuite('flashcard chapter decks', deckCases);
  if (typeof document === 'undefined') throw new Error('Overview cases need a DOM environment (browser or jsdom).');
  await runSuite('flashcard deck overview', overviewCases);
};

const entryPoint = (globalThis as { process?: { argv?: string[] } }).process?.argv?.[1] ?? '';
if (entryPoint.endsWith('flashcardScopes.test.tsx')) {
  runFlashcardScopeTests().catch((error) => { console.error(error.message); throw error; });
}
