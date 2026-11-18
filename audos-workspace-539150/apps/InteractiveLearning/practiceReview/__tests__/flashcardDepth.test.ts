// Flashcard depth: chapter-aligned cards for every curriculum (FC-01 … FC-22). Fixtures are made-up chapters,
// except FC-03, FC-05 and FC-17, which use the live Commercial Banking 1.1 authored deck. Pure cases, no DOM.
// Run from the workspace root: npx -y tsx@4 apps/InteractiveLearning/practiceReview/__tests__/flashcardDepth.test.ts
import { quizStorageKey } from '../../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, StorageLike } from '../../../IndustryKnowledge/lessonFlowCore';
import type { CurriculumLesson, LessonFlowCurriculum } from '../../../IndustryKnowledge/lessonFlow';
import { auditFlashcardCoverage, flashcardCoverageReport } from '../../../IndustryKnowledge/flashcardCoverage';
import type { LearningModeCatalog } from '../../../IndustryKnowledge/learningModeAudit';
import { COMMERCIAL_BANKING_FUNDAMENTALS, validateDeck } from '../../flashcards/decks';
import { deckStats } from '../../flashcards/review';
import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import { answersOverlap, cardContentKey, chapterDepth, chapterLessonDeck, contentTokens } from '../chapterCards';
import { FLASHCARD_SCOPES, cardsInScope, originLesson, resolveIndustryFlashcards, scopeDeck } from '../flashcardScopes';
import type { IndustryFlashcards, ScopedCard } from '../flashcardScopes';
import { FLASHCARDS_MODE } from '../flashcardsMode';
import { chapterLearningModes, chapterModeCounts, prepareLearningEntry } from '../learningModes';
import type { PracticeLesson } from '../practiceLessonStore';
import { heldSourceDecks } from '../sourceDecks';

type TestChapter = ChapterLike & Record<string, unknown>;

const memoryStorage = (seed: Record<string, unknown> = {}): StorageLike => {
  const values = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
};
const ids = (items: Array<{ card: { cardId: string } }>) => items.map((item) => item.card.cardId);
const prefixes = (items: Array<{ cardId: string }>) => items.map((card) => card.cardId.split('-')[0]);

const RICH: TestChapter = {
  title: '01 How Service Contracts Work',
  objective: 'Explain how service contracts turn equipment sales into recurring revenue.',
  keyInsight: 'Service contracts turn a one-off equipment sale into a decade of predictable revenue.',
  keyTerms: [
    { term: 'Service contract', definition: 'A multi-year agreement that bundles maintenance, parts and support for one price.' },
    { term: 'Installed base', definition: 'The fleet of equipment already running at customer sites and generating service demand.' },
    { term: 'Attach rate', definition: 'The share of new equipment sales that also sign a service contract at purchase.' },
  ],
  narrative: [
    { label: 'What it is', text: 'A service contract commits the supplier to keep a customer machine running in exchange for a fixed annual fee.' },
    { label: 'How it works', text: 'Technicians follow a preventive schedule, stock critical parts near large customers and respond to breakdowns within an agreed window.' },
    { label: 'Why it is happening', text: 'Buyers prefer predictable operating budgets, and suppliers want revenue that does not depend on new equipment orders.' },
    { label: 'Real-world example', text: 'A forklift maker sells trucks at a thin margin, then earns steady revenue by maintaining the same trucks for ten years under contract.' },
    { label: 'Vietnam example', text: 'An industrial-park operator near Hai Phong signs one maintenance agreement covering the cranes of every tenant on its site.' },
    { label: 'Business impact', text: 'Recurring service income smooths earnings through downturns, so investors value a large installed base highly.' },
  ],
  concepts: [{
    title: 'What a contract covers',
    summary: 'Each contract defines the scope of work, the response time and the annual price.',
    points: ['Preventive maintenance: scheduled visits that replace worn parts before they fail.', 'Response time: the maximum hours allowed between a breakdown call and a technician arriving.'],
    whyItMatters: 'Clear scope prevents disputes over which repairs the annual fee already includes.',
  }],
  statTiles: [
    { value: '3', label: 'KPIs to watch', description: 'Attach rate · Renewal rate · Uptime' },
    { value: '1', label: 'Main risk', description: 'Underpriced contracts lock in years of loss-making repair work.' },
  ],
};
const INTRO: TestChapter = {
  title: '02 Who Buys Service Contracts',
  keyInsight: 'Fleet buyers judge suppliers by lifetime cost rather than the purchase price.',
  keyTerms: [{ term: 'Fleet buyer', definition: 'A customer that operates many machines and compares suppliers on total cost.' }],
  narrative: [{ label: 'What it is', text: 'Most contracts are signed by operators that run dozens of machines across several different sites.' }],
};
const HELD: TestChapter = { ...RICH, title: '03 A Held Chapter', reviewStatus: 'Under Review', keyInsight: 'A held chapter would otherwise produce a card about pricing power in this market.' };
const template = (number: number, topic: string): TestChapter => ({
  title: `0${number} ${topic}`,
  keyInsight: `Value depends on reliable delivery and repeat orders. This chapter focuses specifically on ${topic}.`,
  keyTerms: [{ term: topic, definition: `A core Test concept related to ${topic.toLowerCase()}.` }],
  narrative: [
    { label: 'What it is', text: `${topic} examines ${topic}. demand shaped by many outside factors.` },
    { label: 'Why it matters', text: 'Many outside forces make this topic commercially important. Value depends on reliable delivery and repeat orders.' },
    { label: 'Business impact', text: 'Define scope, evidence, customer and outcome before acting on the topic.' },
  ],
});
const TEMPLATE = [template(1, 'Delivery reliability'), template(2, 'Order frequency'), template(3, 'Depot coverage')];

const entry = (industry: string, moduleIndex: number, lessonIndex: number, title: string, chapters: ChapterLike[], assessment?: CurriculumLesson['assessment']): CurriculumLesson => ({
  identity: `${industry}::Module ${moduleIndex + 1}::${title}`, title, persistenceKey: `${industry}-${moduleIndex}-${lessonIndex}`, chapters, moduleIndex, lessonIndex,
  moduleTitle: `Module ${moduleIndex + 1}`, moduleLabel: `Module ${moduleIndex + 1}`, open: () => undefined, ...(assessment ? { assessment } : {}),
});
const curriculumOf = (industry: string, label: string, lessons: CurriculumLesson[]): LessonFlowCurriculum => ({ industryLabel: label, lessons: () => lessons });
const RICH_LESSONS = (industry = 'depth-industry') => [
  entry(industry, 0, 0, 'Service Economics', [RICH, INTRO, HELD]),
  entry(industry, 0, 1, 'Template Lesson', TEMPLATE),
  entry(industry, 1, 0, 'Market Leaders', [{ title: '01 Who Leads the Market', keyInsight: 'The market leader sets the service standard that smaller rivals must match.', keyTerms: [{ term: 'Market leader', definition: 'The supplier with the largest installed base and the strongest service network in a region.' }] } as TestChapter]),
];
const open = (lesson: CurriculumLesson, curriculum: LessonFlowCurriculum, activeChapter = 0, accessible?: boolean[]): PracticeLesson => ({
  identity: lesson.identity, cards: lesson.chapters!, accessible: accessible ?? lesson.chapters!.map((chapter) => chapter.reviewStatus !== 'Under Review'), persistenceKey: lesson.persistenceKey, activeChapter, curriculum,
});
const resolveRich = (activeChapter = 0, industry = 'depth-industry') => {
  const lessons = RICH_LESSONS(industry);
  return resolveIndustryFlashcards(open(lessons[0], curriculumOf(industry, 'Depth Industry', lessons), activeChapter), memoryStorage())!;
};
/** Every piece of text a chapter's General Info displays, lower-cased. */
const displayed = (chapter: TestChapter) => JSON.stringify([chapter.keyInsight, chapter.keyTerms, chapter.narrative, chapter.concepts, chapter.statTiles]).toLowerCase();

const CB = 'banking-commercial::How the Industry Works::1.1 Industry Definition & Scope';
const cbCards = () => (heldSourceDecks().COMMERCIAL_BANKING_MODULE01?.['1.1 Industry Definition & Scope'] ?? []) as ChapterLike[];
const cbLesson = (): PracticeLesson => ({ identity: CB, cards: cbCards(), accessible: cbCards().map(() => true) });

export const depthCases = [
  { name: 'FC-01 rich chapter: one concept per card across the General Info journey, within the recommended depth', run: () => {
    const deck = chapterLessonDeck({ industryId: 'depth-industry', industryLabel: 'Depth', identity: 'depth-industry::M::L', lessonTitle: 'L', moduleIndex: 0, moduleLabel: 'M', chapters: [RICH] }, new Set());
    const depth = chapterDepth(RICH);
    eq([depth.tier, depth.min, depth.max], ['standard', 10, 15], 'a chapter with 15 specific units is standard');
    ok(deck.cards.length >= depth.min && deck.cards.length <= depth.max, `cards within the recommended range: ${deck.cards.length}`);
    eq(prefixes(deck.cards), ['wi', 'ki', 'kt', 'kt', 'kt', 'cs', 'cp', 'cp', 'hw', 'dr', 'ex', 'ex', 'kp', 'rk', 'bi'], 'fundamentals → mechanisms → examples → applications → implications');
    eq(Array.from(new Set(deck.cards.map((card) => card.stage))).sort(), ['application', 'implication', 'mechanism', 'recall'], 'recall, mechanism, implication and application cards');
    ok(deck.cards.every((card) => card.origin === 'generated' && card.sourceSection && card.conceptCategory && card.difficulty && card.learningObjective === RICH.objective), 'optional metadata on every card');
    eq(new Set(deck.cards.map((card) => card.front)).size, deck.cards.length, 'no prompt repeats');
  } },
  { name: 'FC-02 introductory chapter: few cards, never padded', run: () => {
    const deck = chapterLessonDeck({ industryId: 'depth-industry', industryLabel: 'Depth', identity: 'depth-industry::M::L', lessonTitle: 'L', moduleIndex: 0, moduleLabel: 'M', chapters: [INTRO] }, new Set());
    eq(chapterDepth(INTRO).tier, 'introductory', 'three teaching units: introductory');
    eq(prefixes(deck.cards), ['wi', 'ki', 'kt'], 'one card per unit the chapter shows');
    eq(new Set(deck.cards.map((card) => card.back)).size, deck.cards.length, 'every answer differs');
  } },
  { name: 'FC-03 authored cards are preserved first, unchanged, and no chapter card repeats one', run: () => {
    const data = resolveIndustryFlashcards(cbLesson(), memoryStorage())!;
    const own = originLesson(data)!;
    const authored = own.cards.filter((item) => item.origin === 'authored');
    eq(ids(authored).sort(), COMMERCIAL_BANKING_FUNDAMENTALS.cards.map((card) => card.cardId).sort(), 'every authored card of 1.1 is still offered');
    authored.forEach((item) => eq(item.card, COMMERCIAL_BANKING_FUNDAMENTALS.cards.find((card) => card.cardId === item.card.cardId), `${item.card.cardId} unchanged`));
    const generated = own.cards.filter((item) => item.origin === 'generated');
    ok(generated.length > 0, 'chapter cards complete the authored deck');
    generated.forEach((item) => authored.filter((other) => other.chapterIndex === item.chapterIndex)
      .forEach((other) => ok(!answersOverlap(contentTokens(item.card.back), contentTokens(other.card.back)), `${item.card.cardId} does not repeat ${other.card.cardId}`)));
    ok(generated.every((item) => !/\d+(?:[.,]\d+)?\s?%|\b(?:19|20)\d{2}\b/.test(item.card.back)), 'no figures beside an authored deck');
  } },
  { name: 'FC-04 generated cards are grounded in their own chapter', run: () => {
    const data = resolveRich();
    const lessons = RICH_LESSONS();
    data.lessons.forEach((lesson) => lesson.cards.forEach((item) => {
      const chapter = lessons.find((entryItem) => entryItem.identity === lesson.identity)!.chapters![item.chapterIndex] as TestChapter;
      ok(displayed(chapter).includes(item.card.sourceRefs[0].excerpt.toLowerCase()), `${item.card.cardId}: excerpt is displayed in its chapter`);
      item.card.back.split(/(?<=[.!?])\s+/).forEach((sentence) => ok(displayed(chapter).includes(sentence.toLowerCase()), `${item.card.cardId}: "${sentence}" is chapter text`));
    }));
  } },
  { name: 'FC-05 combined deck: each chapter shows its authored cards, then its chapter cards', run: () => {
    const own = originLesson(resolveIndustryFlashcards(cbLesson(), memoryStorage())!)!;
    cbCards().forEach((_, chapterIndex) => {
      const origins = own.cards.filter((item) => item.chapterIndex === chapterIndex).map((item) => item.origin);
      eq(origins, [...origins].sort((left, right) => (left === right ? 0 : left === 'authored' ? -1 : 1)), `chapter ${chapterIndex + 1}: authored first`);
    });
    eq(own.cards.map((item) => item.chapterIndex), [...own.cards.map((item) => item.chapterIndex)].sort((a, b) => a - b), 'chapters in order');
  } },
  { name: 'FC-06 limited content: template text, filler definitions and restated headings never become cards', run: () => {
    const template = originLessonOf(resolveRich(), 'Template Lesson');
    eq(template.cards.map((item) => [item.chapterIndex, item.card.cardId.split('-')[0]]), [[0, 'ki']], 'only the first appearance of the shared insight');
    ok(template.cards.every((item) => !/core test concept|examines|commercially important|define scope/i.test(item.card.back)), 'no filler answer');
  } },
  { name: 'FC-07 a chapter with no usable content offers no flashcards (unavailable state)', run: () => {
    const empty: CurriculumLesson = entry('empty-industry', 0, 0, 'Empty', [{ title: '01 Empty Chapter' }, { title: '02 Another Empty Chapter' }]);
    const lesson = open(empty, curriculumOf('empty-industry', 'Empty', [empty]));
    eq(FLASHCARDS_MODE.resolve(lesson, { learnerScope: null }), null, 'lesson scope: nothing to study');
    eq(FLASHCARDS_MODE.resolve(lesson, { learnerScope: null, chapterOnly: true }), null, 'chapter flow: unavailable');
    eq(chapterLearningModes(lesson, 0, memoryStorage()).modes.flashcards.available, false, 'the chooser does not offer Flashcards');
  } },
  { name: 'FC-08 duplicates: repeated and paraphrased answers appear once, and wider scopes never repeat a card', run: () => {
    const shared = 'Depots near large customers cut the time a technician needs to reach a broken machine.';
    const chapters: TestChapter[] = [
      { title: '01 Depots', narrative: [{ label: 'What it is', text: shared }], keyInsight: 'Depot placement decides how fast a supplier can restore service.' },
      { title: '02 Response', narrative: [{ label: 'What it is', text: shared }, { label: 'How it works', text: `Depot placement decides how fast a supplier can restore service. ${'Planners'} map customer sites and open a depot wherever demand clusters.` }] },
    ];
    const deck = chapterLessonDeck({ industryId: 'dup-industry', industryLabel: 'Dup', identity: 'dup-industry::M::L', lessonTitle: 'L', moduleIndex: 0, moduleLabel: 'M', chapters }, new Set());
    eq(deck.cards.filter((card) => card.back === shared).length, 1, 'the same text in two chapters is asked once');
    const mechanism = deck.cards.find((card) => card.cardId.startsWith('hw-'))!;
    eq(mechanism.back, 'Planners map customer sites and open a depot wherever demand clusters.', 'the sentence already asked as the key insight is left out of the mechanism answer');
    const card = deck.cards[0];
    const scoped = (lessonIdentity: string, cardId: string): ScopedCard => ({ card: { ...card, cardId }, lessonIdentity, moduleIndex: 0, chapterIndex: 0, locked: false, sourceLabel: '' });
    const data = { industryId: 'dup-industry', industryLabel: 'Dup', generated: true, complete: true, origin: { identity: 'a', lessonTitle: 'A', moduleIndex: 0, moduleLabel: 'M', chapterIndex: 0, chapterTitle: 'C', chapters: [], accessible: [] },
      lessons: [{ identity: 'a', lessonTitle: 'A', moduleIndex: 0, moduleLabel: 'M', eligibleChapters: 1, chaptersWithCards: 1, excluded: 0, cards: [scoped('a', 'card-one')] }, { identity: 'b', lessonTitle: 'B', moduleIndex: 0, moduleLabel: 'M', eligibleChapters: 1, chaptersWithCards: 1, excluded: 0, cards: [scoped('b', 'card-two')] }] } as IndustryFlashcards;
    eq(ids(cardsInScope(data, 'all')), ['card-one'], 'the same question and answer under two IDs is offered once in the full deck');
  } },
  { name: 'FC-09 no cross-industry leakage: cards, IDs and authored decks stay inside their own curriculum', run: () => {
    const a = resolveRich(0, 'industry-alpha');
    const b = resolveRich(0, 'industry-beta');
    const alpha = ids(cardsInScope(a, 'all'));
    ok(alpha.every((id) => id.includes('industry-alpha')) && ids(cardsInScope(b, 'all')).every((id) => id.includes('industry-beta')), 'IDs carry their own industry');
    ok(!alpha.some((id) => ids(cardsInScope(b, 'all')).includes(id)), 'no shared card IDs');
    ok(cardsInScope(a, 'all').every((item) => item.origin === 'generated'), 'another industry\u2019s authored decks are never used');
    ok(cardsInScope(resolveIndustryFlashcards(cbLesson(), memoryStorage())!, 'all').every((item) => item.card.industryId === 'banking-commercial'), 'Commercial Banking keeps to its own cards');
  } },
  { name: 'FC-10 chapter scope is the open chapter only', run: () => {
    const data = resolveRich();
    ok(cardsInScope(data, 'chapter').every((item) => item.chapterIndex === 0 && item.lessonIdentity === data.origin.identity), 'chapter 1 of the open lesson');
    eq(cardsInScope(resolveRich(1), 'chapter').map((item) => item.chapterIndex), [1, 1, 1], 'follows the chapter open in the reader');
  } },
  { name: 'FC-11 lesson scope is every chapter of the open lesson, in order', run: () => {
    const data = resolveRich();
    eq(ids(cardsInScope(data, 'lesson')), ids(originLesson(data)!.cards), 'the open lesson');
    ok(cardsInScope(data, 'lesson').every((item) => item.chapterIndex !== 2), 'never the held chapter');
  } },
  { name: 'FC-12 module scope stays inside the module', run: () => {
    const data = resolveRich();
    eq(Array.from(new Set(cardsInScope(data, 'module').map((item) => item.moduleIndex))), [0], 'module 1 only');
    eq(Array.from(new Set(cardsInScope(data, 'module').map((item) => item.lessonIdentity))).length, 2, 'both lessons of module 1');
  } },
  { name: 'FC-13 all scope keeps its meaning: the whole curriculum, each card once', run: () => {
    const data = resolveRich();
    const all = ids(cardsInScope(data, 'all'));
    eq(all.length, new Set(all).size, 'unique IDs');
    eq(new Set(cardsInScope(data, 'all').map((item) => cardContentKey(item.card))).size, all.length, 'unique questions and answers');
    eq(Array.from(new Set(cardsInScope(data, 'all').map((item) => item.moduleIndex))), [0, 1], 'every module');
    eq(FLASHCARD_SCOPES.map((scope) => cardsInScope(data, scope).length).every((count, index, counts) => index === 0 || count >= counts[index - 1]), true, 'scopes widen');
  } },
  { name: 'FC-14 switching the review scope never moves the origin chapter', run: () => {
    const data = resolveRich(1);
    const before = JSON.stringify(data.origin);
    FLASHCARD_SCOPES.forEach((scope) => scopeDeck(data, scope));
    eq(JSON.stringify(data.origin), before, 'origin unchanged after every scope');
    eq(scopeDeck(data, 'chapter').title, 'Chapter 2: Who Buys Service Contracts', 'chapter scope is still the origin chapter');
  } },
  { name: 'FC-15 Change Learning Mode counts the same chapter cards the Flashcards chapter scope offers', run: () => {
    const lessons = RICH_LESSONS();
    const lesson = open(lessons[0], curriculumOf('depth-industry', 'Depth Industry', lessons));
    const counts = chapterModeCounts(lesson, 'flashcards', memoryStorage());
    lesson.cards.forEach((_, index) => {
      const scoped = cardsInScope(resolveIndustryFlashcards({ ...lesson, activeChapter: index }, memoryStorage())!, 'chapter').filter((item) => !item.locked).length;
      eq([chapterLearningModes(lesson, index, memoryStorage()).modes.flashcards.count, counts[index]], [index === 2 ? 0 : scoped, index === 2 ? 0 : scoped], `chapter ${index + 1}`);
    });
  } },
  { name: 'FC-16 Return to Lesson reopens the origin chapter with its own cards, whatever scope was studied', run: () => {
    const lessons = RICH_LESSONS();
    const storage = memoryStorage({ [quizStorageKey(lessons[0].persistenceKey!)]: { chapters: { 0: { latest: 50, best: 50, attempts: [{ at: 't', correct: 1, total: 2, accuracy: 50 }], submittedAt: 't' } } } });
    const plan = prepareLearningEntry({ identity: lessons[0].identity, persistenceKey: lessons[0].persistenceKey, chapters: lessons[0].chapters!, curriculum: curriculumOf('depth-industry', 'Depth Industry', lessons), entry: 'start', chapterIndex: 1 }, storage)!;
    eq([plan.chapterIndex, plan.modes.flashcards.count], [1, 3], 'the origin chapter and its cards');
    eq(prepareLearningEntry({ identity: lessons[0].identity, persistenceKey: lessons[0].persistenceKey, chapters: lessons[0].chapters!, entry: 'start', chapterIndex: 2 }, storage), null, 'a held origin chapter is never reopened');
  } },
  { name: 'FC-17 saved review progress still applies: card IDs that existed before keep their history', run: () => {
    const states = Object.fromEntries(['cbf-credit-creation', 'ki-depth-industry-how-service-contracts-work'].map((cardId) => [cardId, { cardId, deckId: 'x', state: 'learning' as const, confidence: 0.5, schedule: { dueAt: '2000-01-01T00:00:00.000Z', intervalDays: 2, ease: 2.5, lapses: 0, repetitions: 1 }, lastReviewedAt: '2000-01-01T00:00:00.000Z', reviewHistory: [] }]));
    const cb = deckStats(scopeDeck(resolveIndustryFlashcards(cbLesson(), memoryStorage())!, 'lesson'), states, Date.now());
    const rich = deckStats(scopeDeck(resolveRich(), 'chapter'), states, Date.now());
    eq([cb.learning, cb.due, rich.learning, rich.due], [1, 1, 1, 1], 'the authored and the original chapter card are still seen and due');
  } },
  { name: 'FC-18 a large curriculum resolves once, in order, without repeats', run: () => {
    const lessons = Array.from({ length: 30 }, (_, index) => entry('large-industry', Math.floor(index / 6), index % 6, `Lesson ${String.fromCharCode(65 + (index % 26))}${index}`, [0, 1, 2, 3, 4].map((chapter) => ({
      ...RICH,
      title: `0${chapter + 1} Topic ${index}-${chapter}`,
      keyInsight: `Lesson ${index} chapter ${chapter} shows that service revenue grows with the installed base.`,
      keyTerms: [{ term: `Term ${index} ${chapter} alpha`, definition: `The measure ${index}-${chapter} that tracks how many machines are under contract today.` }],
    }))));
    const started = Date.now();
    const data = resolveIndustryFlashcards(open(lessons[0], curriculumOf('large-industry', 'Large', lessons)), memoryStorage())!;
    const all = cardsInScope(data, 'all');
    ok(Date.now() - started < 5000, `resolved in ${Date.now() - started} ms`);
    eq(all.length, new Set(ids(all)).size, 'unique');
    eq(data.lessons.map((lesson) => lesson.identity), lessons.map((lesson) => lesson.identity), 'curriculum order');
    const started2 = Date.now();
    resolveIndustryFlashcards(open(lessons[0], curriculumOf('large-industry', 'Large', lessons)), memoryStorage());
    ok(Date.now() - started2 < Math.max(200, (Date.now() - started) / 2), 'a second resolution reuses the built decks');
  } },
  { name: 'FC-19 card IDs stay compatible with stored review history', run: () => {
    const input = { industryId: 'depth-industry', industryLabel: 'Depth', identity: 'depth-industry::M::L', lessonTitle: 'L', moduleIndex: 0, moduleLabel: 'M' };
    const forward = chapterLessonDeck({ ...input, chapters: [RICH, INTRO] }, new Set());
    const backward = chapterLessonDeck({ ...input, chapters: [INTRO, RICH] }, new Set());
    eq(forward.cards.map((card) => card.cardId).sort(), backward.cards.map((card) => card.cardId).sort(), 'IDs ignore chapter position');
    eq(validateDeck(forward), [], 'stable, non-positional slugs that pass deck validation');
    ok(forward.cards.some((card) => card.cardId === 'ki-depth-industry-how-service-contracts-work') && forward.cards.some((card) => card.cardId === 'kt-depth-industry-service-contract'), 'the original key-insight and key-term IDs are unchanged');
  } },
  { name: 'FC-20 the shared access policy for chapters without an assessment opens their cards as the reader does', run: () => {
    const lessons = RICH_LESSONS();
    const third = lessons[2];
    const entryChapter: TestChapter = { title: '02 How Entry Happens', keyInsight: 'New entrants usually start by serving one region before expanding nationally.' };
    const policy = (assessment?: CurriculumLesson['assessment']) => resolveIndustryFlashcards(open(lessons[0], curriculumOf('depth-industry', 'Depth Industry', [lessons[0], lessons[1], { ...third, chapters: [third.chapters![0], entryChapter], ...(assessment ? { assessment } : {}) }])), memoryStorage())!.lessons[2];
    eq(Array.from(new Set(policy().cards.filter((item) => item.chapterIndex === 0).map((item) => item.locked))), [false], 'the first chapter of another lesson is always open');
    eq(Array.from(new Set(policy().cards.filter((item) => item.chapterIndex === 1).map((item) => item.locked))), [true], 'with a check to submit, chapter 2 waits');
    eq(Array.from(new Set(policy(['under-preparation', 'ready']).cards.filter((item) => item.chapterIndex === 1).map((item) => item.locked))), [false], 'with no usable question in chapter 1, chapter 2 opens');
  } },
  { name: 'FC-21 held chapters produce no cards and are never counted as gaps', run: () => {
    const own = originLesson(resolveRich())!;
    ok(own.cards.every((item) => item.chapterIndex !== 2), 'no card from the held chapter');
    eq([own.eligibleChapters, own.chaptersWithCards], [2, 2], 'the held chapter is not eligible');
  } },
  { name: 'FC-22 catalogue coverage counts only valid unique cards, per industry, curriculum, module, lesson and chapter', run: () => {
    const asCatalog = (industry: string, lessons: CurriculumLesson[]) => ({ id: industry, name: industry, groupId: 'group', groupName: 'Group', lessons: lessons.map((lesson) => ({ moduleIndex: lesson.moduleIndex, moduleTitle: lesson.moduleTitle, moduleLabel: lesson.moduleLabel, lessonIndex: lesson.lessonIndex, lessonTitle: lesson.title, displayTitle: lesson.title, identity: lesson.identity, blocked: false, deck: { cards: lesson.chapters!, persistenceKey: lesson.persistenceKey! }, routeDeck: { persistenceKey: lesson.persistenceKey! } })) });
    const catalog: LearningModeCatalog = { groups: [{ id: 'group', name: 'Group' }], subIndustries: [asCatalog('depth-industry', RICH_LESSONS()), asCatalog('banking-commercial', [{ ...entry('banking-commercial', 0, 0, '1.1 Industry Definition & Scope', cbCards()), identity: CB }])] };
    const coverage = auditFlashcardCoverage(catalog);
    const depth = coverage.perCurriculum[0];
    eq([depth.eligibleChapters, depth.heldChapters, depth.chaptersWithCards, depth.zero], [6, 1, 4, 2], 'six eligible chapters, the held one apart; two template chapters have nothing of their own');
    eq(depth.chapters.find((chapter) => chapter.chapterTitle === 'Who Buys Service Contracts')!.status, 'below-recommended', 'an introductory chapter with three cards is flagged for enrichment');
    eq(depth.chapters.find((chapter) => chapter.chapterTitle === 'How Service Contracts Work')!.status, 'covered', 'the rich chapter meets its depth');
    eq(depth.unique, depth.authored + depth.generated, 'unique = authored + generated');
    eq([coverage.perCurriculum[1].authored, coverage.perCurriculum[1].invalid, coverage.perCurriculum[1].unmapped], [14, 0, 0], 'the 14 authored 1.1 cards count once, none invalid or unmapped');
    eq(coverage.groups[0].eligibleChapters, coverage.eligibleChapters, 'industry totals add up');
    eq(depth.modules.map((module) => module.eligibleChapters), [5, 1], 'module totals');
    eq(depth.lessonRows.map((lesson) => lesson.eligibleChapters), [2, 3, 1], 'lesson totals');
    ok(flashcardCoverageReport(coverage)[0].startsWith('Flashcard coverage: 2 curricula'), 'plain-text report');
  } },
];

function originLessonOf(data: IndustryFlashcards, title: string) {
  return data.lessons.find((lesson) => lesson.lessonTitle === title)!;
}

export const runFlashcardDepthTests = () => runSuite('flashcard depth', depthCases);

const entryPoint = (globalThis as { process?: { argv?: string[] } }).process?.argv?.[1] ?? '';
if (entryPoint.endsWith('flashcardDepth.test.ts')) {
  Promise.resolve(runFlashcardDepthTests()).catch((error) => { console.error(error.message); throw error; });
}
