// Pure cases (no DOM): chapter resolution for Start / Continue Learning, chapter-scoped mode availability,
// and the reader record the chooser writes. Run from the workspace root: npx -y tsx@4 <this file>.
import { journeyRows, quizStorageKey, readerStorageKey, stripChapterNumber } from '../../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, ChapterProgress, StorageLike } from '../../../IndustryKnowledge/lessonFlowCore';
import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import { chapterActivities, chapterLearningModes, chapterModeCounts, lessonChapterContent, prepareLearningEntry, resolveEntryChapter, setReaderChapter } from '../learningModes';
import { resolveLessonPractice } from '../lessonAccess';
import type { PracticeLesson } from '../practiceLessonStore';
import { heldSourceDecks } from '../sourceDecks';

const memoryStorage = (seed: Record<string, unknown> = {}): StorageLike & { values: Map<string, string> } => {
  const values = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  return { values, getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
};
const progress = (states: Array<'open' | 'locked' | 'held' | 'done'>): ChapterProgress[] => states.map((state, index) => ({
  index,
  restricted: state === 'held',
  plan: state === 'held' ? 'under-review' : 'ready',
  read: state === 'done',
  submitted: state === 'done',
  historical: false,
  complete: state === 'done',
  unlocked: state !== 'locked',
  check: state === 'held' ? 'under-review' : state === 'done' ? 'submitted' : state === 'locked' ? 'locked' : 'available',
}));
const submitted = { latest: 80, best: 80, attempts: [{ at: 't', correct: 4, total: 5, accuracy: 80 }], submittedAt: 't' };

// A curriculum with no authored deck: flashcards come from the chapter text (chapter 1 only).
const GENERATED: ChapterLike[] = [
  {
    title: '01 What a Test Industry Sells',
    keyInsight: 'Test industry firms earn most of their margin from repeat service contracts.',
    keyTerms: [{ term: 'Service contract', definition: 'A multi-year agreement that bundles maintenance, parts and support for one price.' }],
  } as ChapterLike,
  { title: '02 How Test Industry Firms Compete' },
  { title: '03 A Held Chapter', reviewStatus: 'Under Review' },
];
const generatedLesson = (accessible: boolean[], activeChapter = 0): PracticeLesson => ({
  identity: 'test-industry::How the Industry Works::Industry Definition & Scope',
  cards: GENERATED,
  accessible,
  persistenceKey: 'test-industry-l1',
  activeChapter,
});

const CB_L11 = 'banking-commercial::How the Industry Works::1.1 Industry Definition & Scope';
const cbCards = () => (heldSourceDecks().COMMERCIAL_BANKING_MODULE01?.['1.1 Industry Definition & Scope'] ?? []) as ChapterLike[];

export const learningModeCases = [
  { name: 'Start Learning opens the first open chapter and skips held chapters', run: () => {
    eq(resolveEntryChapter('start', progress(['open', 'locked'])), 0, 'first chapter');
    eq(resolveEntryChapter('start', progress(['held', 'open', 'locked'])), 1, 'a held first chapter is skipped');
    eq(resolveEntryChapter('start', progress(['held', 'held'])), null, 'no open chapter');
  } },
  { name: 'Continue Learning resumes the saved chapter only when it is still open', run: () => {
    eq(resolveEntryChapter('continue', progress(['done', 'open', 'locked']), 1), 1, 'saved chapter is open');
    eq(resolveEntryChapter('continue', progress(['done', 'open', 'locked']), 2), 1, 'saved chapter locked: first open incomplete chapter');
    eq(resolveEntryChapter('continue', progress(['done', 'open', 'locked'])), 1, 'nothing saved: the same fallback');
    eq(resolveEntryChapter('continue', progress(['done', 'held', 'open']), 1), 2, 'a held saved chapter is never reopened');
  } },
  { name: 'the entry plan reads the reader and Knowledge Check records without changing them', run: () => {
    const storage = memoryStorage({
      [readerStorageKey('test-industry-l1')]: { notes: { 0: 'my note' }, completed: [0], view: { stage: 'learning', chapter: 1 } },
      [quizStorageKey('test-industry-l1')]: { latest: null, best: null, attempts: [], chapters: { 0: submitted } },
    });
    const before = new Map(storage.values);
    const chapters = GENERATED;
    const resumed = prepareLearningEntry({ identity: generatedLesson([]).identity, persistenceKey: 'test-industry-l1', chapters, entry: 'continue' }, storage)!;
    eq(resumed.chapterIndex, 1, 'continue resumes chapter 2');
    eq(resumed.lesson.accessible, [true, true, false], 'chapter gate from the stored check; held chapter closed');
    eq(prepareLearningEntry({ identity: generatedLesson([]).identity, persistenceKey: 'test-industry-l1', chapters, entry: 'start' }, storage)!.chapterIndex, 0, 'start opens chapter 1');
    eq(Array.from(storage.values), Array.from(before), 'nothing written');
  } },
  { name: 'Return to Lesson reopens the chooser on the origin chapter only while that chapter is still open', run: () => {
    const storage = memoryStorage({ [quizStorageKey('test-industry-l1')]: { latest: null, best: null, attempts: [], chapters: { 0: submitted } } });
    const input = { identity: generatedLesson([]).identity, persistenceKey: 'test-industry-l1', chapters: GENERATED, entry: 'start' as const };
    eq(prepareLearningEntry({ ...input, chapterIndex: 1 }, storage)!.chapterIndex, 1, 'the origin chapter, not Start Learning’s first chapter');
    eq(prepareLearningEntry({ ...input, chapterIndex: 2 }, storage), null, 'a held chapter is never reopened');
    eq(prepareLearningEntry({ ...input, chapterIndex: 9 }, storage), null, 'a chapter that no longer exists is never reopened');
    eq(prepareLearningEntry({ ...input, chapterIndex: 1 }, memoryStorage()), null, 'a chapter this learner cannot open is never reopened');
  } },
  { name: 'each mode is offered for the chapter alone, and the chapter gate applies to every mode', run: () => {
    const storage = memoryStorage();
    const first = chapterLearningModes(generatedLesson([true, true, false]), 0, storage);
    eq([first.modes.reader.available, first.modes.flashcards.available, first.modes['match-sort'].available], [true, true, false], 'chapter 1: reader and its own cards');
    ok(first.modes.flashcards.count >= 2, 'key insight and key term cards');
    eq(first.chapterTitle, 'What a Test Industry Sells', 'numeric prefix stripped');
    const second = chapterLearningModes(generatedLesson([true, true, false], 1), 1, storage);
    eq([second.modes.reader.available, second.modes.flashcards.available], [true, false], 'chapter 2 has no cards of its own');
    const locked = chapterLearningModes(generatedLesson([true, false, false], 1), 1, storage);
    eq([locked.modes.reader.available, locked.modes.flashcards.available, locked.modes['match-sort'].available], [false, false, false], 'a locked chapter offers nothing');
    const held = chapterLearningModes(generatedLesson([true, true, true], 2), 2, storage);
    eq(held.modes.reader.available, false, 'a held chapter is never offered');
  } },
  { name: 'Match & Sort activities are scoped to the chapter they cite', run: () => {
    const cards = cbCards();
    ok(cards.length > 0, 'Commercial Banking lesson 1.1 resolves');
    const lesson: PracticeLesson = { identity: CB_L11, cards, accessible: cards.map(() => true) };
    const result = resolveLessonPractice(lesson, heldSourceDecks(), memoryStorage())!;
    const perChapter = cards.map((_, index) => chapterActivities(result, index).available);
    ok(perChapter[0].some((activity) => activity.activityId === 'cb-m01-seq-loan-lifecycle'), 'chapter 1 offers the loan-lifecycle sequence');
    perChapter.forEach((activities, index) => activities.forEach((activity) => ok(activity.sourceRefs.some((ref) => ref.chapterIndex === index), `${activity.activityId} cites chapter ${index + 1}`)));
    const union = new Set(perChapter.flat().map((activity) => activity.activityId));
    eq(Array.from(union).sort(), result.available.map((activity) => activity.activityId).sort(), 'every open activity belongs to at least one chapter');
    const content = lessonChapterContent(lesson, null);
    eq(content.length, cards.length, 'one content row per chapter');
    ok(content[0].matchSort > 0 && content[0].flashcards > 0, 'chapter 1 has both practice modes');
  } },
  { name: 'Learning Journey rows mirror the reader: titles, order, states and prerequisites', run: () => {
    const title = (card: ChapterLike) => stripChapterNumber(card.title);
    const cards: ChapterLike[] = [GENERATED[0], GENERATED[1], { title: '03 Third Chapter' }];
    const rows = journeyRows(progress(['done', 'open', 'locked']), cards, 1, 'learning', title, () => 4);
    eq(rows.map((row) => row.title), ['What a Test Industry Sells', 'How Test Industry Firms Compete', 'Third Chapter'], 'titles without numeric prefixes, in chapter order');
    eq(rows.map((row) => row.state), ['completed', 'current', 'locked'], 'completed, current and locked');
    eq(rows.map((row) => row.lockedBy), [null, 1, 2], 'each chapter waits for the previous check');
    eq(rows.map((row) => row.minutes), [4, 4, 4], 'reading minutes from the reader');
    const held = journeyRows(progress(['open', 'held', 'locked']), GENERATED, 0, 'learning', title, () => 4);
    eq(held.map((row) => row.state), ['current', 'under-review', 'locked'], 'a held chapter keeps its place as Under Review');
    eq(held[2].lockedBy, 1, 'the chapter after a held one waits for the last open check');
    eq(journeyRows(progress(['done', 'done']), GENERATED.slice(0, 2), 1, 'takeaways', title, () => 4).map((row) => row.state), ['completed', 'completed'], 'on the takeaways no chapter is current');
  } },
  { name: 'per-chapter practice counts match the chooser and follow the chapter gate', run: () => {
    const storage = memoryStorage();
    const generated = generatedLesson([true, true, false]);
    const counts = chapterModeCounts(generated, 'flashcards', storage);
    eq(counts[0], chapterLearningModes(generated, 0, storage).modes.flashcards.count, 'same count as the chooser');
    eq([counts[1], counts[2]], [0, 0], 'no own cards, and held chapters count 0');
    const cards = cbCards();
    const lesson: PracticeLesson = { identity: CB_L11, cards, accessible: cards.map(() => true) };
    eq(chapterModeCounts(lesson, 'flashcards', storage), [8, 9, 10, 10, 5], 'Commercial Banking 1.1 cards per chapter: authored cards plus chapter cards');
    const practice = resolveLessonPractice(lesson, heldSourceDecks(), storage)!;
    eq(chapterModeCounts(lesson, 'match-sort', storage), cards.map((_, index) => chapterActivities(practice, index).available.length), 'Match & Sort activities per chapter');
    eq(chapterModeCounts({ ...lesson, accessible: cards.map((_, index) => index === 0) }, 'flashcards', storage), [8, 0, 0, 0, 0], 'locked chapters count 0');
  } },
  { name: 'pointing the reader at a chapter keeps notes, completion and positions', run: () => {
    const key = readerStorageKey('pk');
    const storage = memoryStorage({ [key]: { notes: { 1: 'keep' }, completed: [0], positions: { 0: 40 }, migrations: ['chapter-flow-v1'], view: { stage: 'check', chapter: 0 } } });
    setReaderChapter('pk', 2, storage);
    const stored = JSON.parse(storage.getItem(key)!);
    eq(stored.view, { stage: 'learning', chapter: 2 }, 'view points at the chosen chapter');
    eq([stored.notes, stored.completed, stored.positions, stored.migrations], [{ 1: 'keep' }, [0], { 0: 40 }, ['chapter-flow-v1']], 'everything else untouched');
    const fresh = memoryStorage();
    setReaderChapter('new', 0, fresh);
    eq(JSON.parse(fresh.getItem(readerStorageKey('new'))!), { view: { stage: 'learning', chapter: 0 } }, 'a first visit only stores the view');
  } },
];

export const runLearningModeTests = () => runSuite('learning mode chooser', learningModeCases);
Promise.resolve(runLearningModeTests()).catch((error) => { console.error(error.message); throw error; });
