// Chapter access must match across learning modes (Scenarios A–F of the cross-mode check, plus the INT-01…INT-20
// legacy-completion parity cases). Compares, for the same stored records:
//   reader       — chapterProgress on the lesson's own plan (planAssessment), as the open reader computes it;
//   other lesson — storedChapterProgress with the plan's statuses: Flashcards module / all scopes
//                  (lessonChapterAccess) and the Learning Mode Chooser (lessonChapterProgress) delegate to it;
//   match & sort — the real cross-lesson gate in practiceReview/lessonAccess.ts: `otherLessonAccess` directly, and
//                  `resolveLessonPractice` end to end (authored fixture packs, so no registered content is needed).
// Pure functions only: npx tsx apps/IndustryKnowledge/__tests__/crossModeAccess.test.ts
import {
  LESSON_PROGRESS_KEY, assessmentStatuses, chapterPlanFromStatuses, chapterProgress, hasSubmission, loadProgressStore, parseAssessmentRecord,
  planAssessment, prepareChapterFlowState, quizStorageKey, readJson, readerStorageKey, storedChapterProgress,
} from '../lessonFlowCore';
import type { AssessmentLoadState, ChapterLike, ChapterPlanStatus, QuestionLike, StorageLike } from '../lessonFlowCore';
import type { LessonFlowCurriculum } from '../lessonFlow';
import { otherLessonAccess, resolveLessonPractice } from '../../InteractiveLearning/practiceReview/lessonAccess';
import type { PracticeLesson } from '../../InteractiveLearning/practiceReview/practiceLessonStore';
import type { ChapterRef, MatchSortActivity, MatchSortPack } from '../../InteractiveLearning/matchSort/types';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const same = (left: unknown, right: unknown, message: string) => assert(JSON.stringify(left) === JSON.stringify(right), `${message}: expected ${JSON.stringify(right)}, got ${JSON.stringify(left)}`);

const IDENTITY = 'test-industry::Module::Lesson';
const KEY = 'cross-mode-lesson';
const submitted = { latest: 40, best: 40, attempts: [{ at: 't', correct: 2, total: 5, accuracy: 40 }], submittedAt: 't' };

type MemoryStorage = StorageLike & { values: Map<string, string>; writes: number };
const memoryStorage = (seed: Record<string, unknown> = {}): MemoryStorage => {
  const values = new Map(Object.entries(seed).map(([key, value]) => [key, JSON.stringify(value)]));
  const storage: MemoryStorage = { values, writes: 0, getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { storage.writes += 1; values.set(key, value); } };
  return storage;
};
/** Seeds raw strings, for records that are not valid JSON or not the expected shape. */
const rawStorage = (seed: Record<string, string>): MemoryStorage => {
  const storage = memoryStorage();
  Object.entries(seed).forEach(([key, value]) => storage.values.set(key, value));
  return storage;
};
const cloneStorage = (source: MemoryStorage): MemoryStorage => rawStorage(Object.fromEntries(source.values));
const snapshot = (storage: MemoryStorage) => JSON.stringify(Array.from(storage.values).sort(([left], [right]) => left.localeCompare(right)));

const chapters = (count: number, held: number[] = []): ChapterLike[] => Array.from({ length: count }, (_, index) => ({
  title: `Chapter ${index + 1}`,
  ...(held.includes(index) ? { reviewStatus: 'Under Review' } : {}),
}));
const questionsFor = (chapterNumbers: number[]): QuestionLike[] => chapterNumbers.map((chapter) => ({
  id: `q${chapter}`,
  question: `Question for chapter ${chapter}?`,
  options: ['a', 'b', 'c', 'd'].map((id) => ({ id, text: `Option ${id}` })),
  correctOptionId: 'a',
  explanation: 'Because.',
  moduleId: String(chapter),
}));
const quiz = (submittedChapters: number[]) => ({ chapters: Object.fromEntries(submittedChapters.map((index) => [String(index), submitted])) });

const SOURCE = 'COMMERCIAL_BANKING_MODULE01' as const;
const refFor = (lessonTitle: string, cards: ChapterLike[], index: number): ChapterRef => ({ sourceModuleKey: SOURCE, lessonTitle, chapterTitle: String(cards[index]?.title ?? ''), chapterIndex: index, sourceIds: [], grounding: '' });
const openOf = (chapter: { unlocked: boolean; restricted: boolean }) => chapter.unlocked && !chapter.restricted;
const open = openOf;

function modes(cards: ChapterLike[], questions: QuestionLike[] | undefined, storage: StorageLike, load: AssessmentLoadState = 'loaded') {
  const plan = planAssessment(questions, cards, load);
  const record = parseAssessmentRecord(readJson(storage, quizStorageKey(KEY)));
  const stored = readJson(storage, readerStorageKey(KEY)) as { completed?: number[]; migrations?: string[]; legacyCompletedChapters?: number[] } | null;
  const reader = prepareChapterFlowState(stored ?? {});
  const lessonLegacyComplete = Boolean(loadProgressStore(storage)[IDENTITY]?.completedAt) || hasSubmission(record);
  const readerAccess = chapterProgress({ plan, record, completed: reader.completed ?? [], legacyCompletedChapters: reader.legacyCompletedChapters ?? [], lessonLegacyComplete }).map(openOf);
  const statuses = assessmentStatuses(plan);
  const otherLesson = storedChapterProgress(IDENTITY, KEY, cards, storage, statuses).map(openOf);
  const matchSort = cards.map((_, index) => otherLessonAccess(refFor('Lesson', cards, index), cards, IDENTITY, storage, statuses, { identity: IDENTITY, persistenceKey: KEY }));
  return { readerAccess, otherLesson, matchSort, unknownStatuses: storedChapterProgress(IDENTITY, KEY, cards, storage).map(open) };
}

function agree(result: ReturnType<typeof modes>, expected: boolean[], label: string) {
  same(result.readerAccess, expected, `${label}: reader`);
  same(result.otherLesson, expected, `${label}: Flashcards / chooser for another lesson`);
  same(result.matchSort, expected, `${label}: Match & Sort for another lesson`);
}

// Cross-lesson fixture: an open lesson whose Match & Sort activities cite chapter k of another lesson of the module.
const INDUSTRY = 'int-industry';
const MODULE_TITLE = 'Module';
const OPEN_LESSON = 'Open Lesson';
const CITED_LESSON = 'Cited Lesson';
const CITED_KEY = 'int-cited-lesson';
const MODULE_PREFIX = `${INDUSTRY}::${MODULE_TITLE}`;
const citedCards = (count: number, held: number[] = []): ChapterLike[] => chapters(count, held).map((card, index) => ({ ...card, title: `Cited Chapter ${index + 1}` }));
const OPEN_CARDS: ChapterLike[] = [{ title: 'Open Chapter 1' }];

interface CrossOptions {
  count?: number;
  held?: number[];
  statuses?: ChapterPlanStatus[];
  industry?: string;
  citedKey?: string;
  curriculum?: boolean;
  /** Makes `curriculum.lessons()` throw, as a registry that failed to resolve would. */
  curriculumThrows?: boolean;
}

function cross(storage: StorageLike | null, options: CrossOptions = {}) {
  const count = options.count ?? 4;
  const industry = options.industry ?? INDUSTRY;
  const key = options.citedKey ?? CITED_KEY;
  const cards = citedCards(count, options.held);
  const citedIdentity = `${industry}::${MODULE_TITLE}::${CITED_LESSON}`;
  const activities = cards.map((_, k) => ({
    activityId: `x${k}`, type: 'concept-matching', sourceRefs: [refFor(OPEN_LESSON, OPEN_CARDS, 0), refFor(CITED_LESSON, cards, k)],
  }) as unknown as MatchSortActivity);
  const pack = { packId: 'int-pack', title: 'Fixture', industryId: industry, moduleId: 'm', sourceModuleKey: SOURCE, contentStatus: '', contentNotes: [], activities } as MatchSortPack;
  const curriculum: LessonFlowCurriculum | undefined = options.curriculum === false ? undefined : {
    industryLabel: 'Int',
    lessons: () => {
      if (options.curriculumThrows) throw new Error('registry failed');
      return [{ identity: citedIdentity, title: CITED_LESSON, persistenceKey: key, chapters: cards, assessment: options.statuses, moduleIndex: 0, lessonIndex: 1, moduleTitle: MODULE_TITLE, moduleLabel: MODULE_TITLE, open: () => undefined }];
    },
  };
  const lesson: PracticeLesson = { identity: `${industry}::${MODULE_TITLE}::${OPEN_LESSON}`, cards: OPEN_CARDS, accessible: [true], persistenceKey: 'int-open-lesson', curriculum };
  const decks = { [SOURCE]: { [OPEN_LESSON]: OPEN_CARDS, [CITED_LESSON]: cards } };
  const result = resolveLessonPractice(lesson, decks, storage, { packs: [pack], generated: false });
  const offered = new Set((result?.available ?? []).map((activity) => activity.activityId));
  const matchSort = cards.map((_, k) => offered.has(`x${k}`));
  const viaStored = storedChapterProgress(citedIdentity, key, cards, storage, options.statuses).map(open);
  const record = parseAssessmentRecord(readJson(storage, quizStorageKey(key)));
  const stored = readJson(storage, readerStorageKey(key));
  const reader = prepareChapterFlowState((stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {}) as { completed?: number[]; migrations?: string[]; legacyCompletedChapters?: number[] });
  const readerAccess = chapterProgress({
    plan: chapterPlanFromStatuses(cards, options.statuses), record, completed: reader.completed ?? [], legacyCompletedChapters: reader.legacyCompletedChapters ?? [],
    lessonLegacyComplete: Boolean(loadProgressStore(storage)[citedIdentity]?.completedAt) || hasSubmission(record),
  }).map(open);
  const direct = cards.map((_, k) => otherLessonAccess(refFor(CITED_LESSON, cards, k), cards, lesson.identity, storage, options.statuses, { identity: citedIdentity, persistenceKey: key }));
  return { matchSort, direct, flashcards: viaStored, chooser: viaStored, readerAccess, result, cards, citedIdentity, lesson };
}

function agreeCross(result: ReturnType<typeof cross>, expected: boolean[], label: string, withReader = true) {
  if (withReader) same(result.readerAccess, expected, `${label}: reader`);
  same(result.flashcards, expected, `${label}: Flashcards (lessonChapterAccess)`);
  same(result.chooser, expected, `${label}: Learning Mode Chooser (lessonChapterProgress)`);
  same(result.direct, expected, `${label}: otherLessonAccess`);
  same(result.matchSort, expected, `${label}: cross-lesson Match & Sort (resolveLessonPractice)`);
}

const reader = (key: string, record: Record<string, unknown>) => ({ [readerStorageKey(key)]: record });
const MIGRATED = ['lesson-flow-v1', 'chapter-flow-v1'];
const lessonEntry = (industry: string, title: string, entry: Record<string, unknown>) => ({ [LESSON_PROGRESS_KEY]: { [`${industry}::${MODULE_TITLE}::${title}`]: entry } });

const cases: Array<{ id: string; name: string; run: () => void }> = [
  {
    id: 'A', name: 'valid, unsubmitted check keeps chapter 2 locked in every mode', run: () => {
      agree(modes(chapters(3), questionsFor([1, 2, 3]), memoryStorage()), [true, false, false], 'A');
    },
  },
  {
    id: 'B', name: 'a submitted check (any score) opens chapter 2 in every mode', run: () => {
      agree(modes(chapters(3), questionsFor([1, 2, 3]), memoryStorage({ [quizStorageKey(KEY)]: quiz([0]) })), [true, true, false], 'B');
    },
  },
  {
    id: 'C', name: 'a zero-question chapter 1 opens chapter 2 everywhere and records nothing', run: () => {
      const storage = memoryStorage();
      const before = JSON.stringify(Array.from(storage.values));
      const result = modes(chapters(3), questionsFor([2, 3]), storage);
      agree(result, [true, true, false], 'C');
      same(JSON.stringify(Array.from(storage.values)), before, 'C: no record written');
      same(result.unknownStatuses, [true, false, false], 'C: without statuses the gate stays conservative (never opens early)');
    },
  },
  {
    id: 'D', name: 'consecutive zero-question chapters: no deadlock, an earlier unsubmitted check still gates', run: () => {
      const cards = chapters(5);
      const questions = questionsFor([1, 5]);
      agree(modes(cards, questions, memoryStorage()), [true, false, false, false, false], 'D before check 1');
      agree(modes(cards, questions, memoryStorage({ [quizStorageKey(KEY)]: quiz([0]) })), [true, true, true, true, true], 'D after check 1');
      agree(modes(chapters(5, [2]), questions, memoryStorage({ [quizStorageKey(KEY)]: quiz([0]) })), [true, true, false, true, true], 'D with a held chapter');
    },
  },
  {
    id: 'E', name: 'a failed question load never opens chapters or writes anything', run: () => {
      const storage = memoryStorage();
      agree(modes(chapters(3), undefined, storage, 'failed'), [true, false, false], 'E');
      same(storage.values.size, 0, 'E: nothing written');
      const kept = memoryStorage({ [quizStorageKey(KEY)]: quiz([0]) });
      agree(modes(chapters(3), undefined, kept, 'failed'), [true, true, false], 'E: earlier submission still counts');
    },
  },
  {
    id: 'F', name: 'existing completion keeps access in every mode, including Match & Sort, without new records', run: () => {
      const storage = memoryStorage({ [LESSON_PROGRESS_KEY]: { [IDENTITY]: { completedAt: '2026-01-01T00:00:00.000Z', source: 'assessment' } }, [quizStorageKey(KEY)]: quiz([0, 1, 2]) });
      const before = JSON.stringify(Array.from(storage.values));
      agree(modes(chapters(3), questionsFor([2, 3]), storage), [true, true, true], 'F');
      same(JSON.stringify(Array.from(storage.values)), before, 'F: no duplicate or new progress record');

      // The original legacy-only condition: pre-flow "Mark complete" chapters, no chapter check submitted, no lesson completion.
      const legacy = memoryStorage({ [readerStorageKey(KEY)]: { completed: [0, 1] } });
      const legacyBefore = snapshot(legacy);
      same(parseAssessmentRecord(readJson(legacy, quizStorageKey(KEY))).chapters, {}, 'F: no chapter check was submitted');
      same(loadProgressStore(legacy), {}, 'F: no lesson completion was recorded');
      const result = modes(chapters(3), questionsFor([1, 2, 3]), legacy);
      same(result.readerAccess, [true, true, true], 'F: pre-flow "Mark complete" history opens chapters in the reader');
      agree(result, [true, true, true], 'F: legacy-only completion');
      same(snapshot(legacy), legacyBefore, 'F: legacy records read without being rewritten');
      same(legacy.writes, 0, 'F: nothing written');
    },
  },
  {
    id: 'INT-01', name: 'new learner: prerequisites remain in every mode', run: () => {
      agreeCross(cross(memoryStorage()), [true, false, false, false], 'INT-01 empty storage');
      agreeCross(cross(memoryStorage({ 'casemate:unrelated': { completed: [0, 1, 2, 3] } })), [true, false, false, false], 'INT-01 unrelated records');
      agreeCross(cross(null), [true, false, false, false], 'INT-01 no storage', false);
    },
  },
  {
    id: 'INT-02', name: 'a valid, unsubmitted check (even a started draft) keeps the later chapter locked', run: () => {
      const draft = { chapters: { 0: { draft: { questionIds: ['q1'], answers: { q1: 'a' }, index: 0, startedAt: 't' } } } };
      agreeCross(cross(memoryStorage({ [quizStorageKey(CITED_KEY)]: draft })), [true, false, false, false], 'INT-02');
    },
  },
  {
    id: 'INT-03', name: 'a low-score submission unlocks the next chapter, and only that one', run: () => {
      const zero = { latest: 0, best: 0, attempts: [{ at: 't', correct: 0, total: 5, accuracy: 0 }], submittedAt: 't' };
      agreeCross(cross(memoryStorage({ [quizStorageKey(CITED_KEY)]: { chapters: { 0: zero } } })), [true, true, false, false], 'INT-03');
    },
  },
  {
    id: 'INT-04', name: 'legacy chapter completion without a new-format submission is recognised by every mode', run: () => {
      const storage = memoryStorage(reader(CITED_KEY, { completed: [0, 1] }));
      const before = snapshot(storage);
      agreeCross(cross(storage), [true, true, true, false], 'INT-04');
      same(snapshot(storage), before, 'INT-04: records untouched');
      same(storage.writes, 0, 'INT-04: nothing written');
      same(cross(storage).result?.lockedCount, 1, 'INT-04: only the chapter after the legacy completion stays locked');
    },
  },
  {
    id: 'INT-05', name: 'migrated legacy completion keeps parity; completion made under the chapter flow is only "read"', run: () => {
      agreeCross(cross(memoryStorage(reader(CITED_KEY, { completed: [0, 1, 2], migrations: MIGRATED, legacyCompletedChapters: [0, 1] }))), [true, true, true, false], 'INT-05 migrated legacy');
      agreeCross(cross(memoryStorage(reader(CITED_KEY, { completed: [0, 1], migrations: MIGRATED }))), [true, false, false, false], 'INT-05 read under the chapter flow');
      agreeCross(cross(memoryStorage(reader(CITED_KEY, { completed: [0], migrations: ['lesson-flow-v1'] }))), [true, false, false, false], 'INT-05 lesson flow used before chapter checks existed');
    },
  },
  {
    id: 'INT-06', name: 'a partially completed legacy lesson opens only the appropriate chapters', run: () => {
      agreeCross(cross(memoryStorage(reader(CITED_KEY, { completed: [0] }))), [true, true, false, false], 'INT-06 first chapter');
      agreeCross(cross(memoryStorage(reader(CITED_KEY, { completed: [1] }))), [true, true, true, false], 'INT-06 later chapter only');
      agreeCross(cross(memoryStorage({ ...reader(CITED_KEY, { completed: [0] }), [quizStorageKey(CITED_KEY)]: quiz([1]) })), [true, true, true, false], 'INT-06 legacy plus a new submission');
    },
  },
  {
    id: 'INT-07', name: 'a fully completed legacy lesson is open in every mode', run: () => {
      agreeCross(cross(memoryStorage(reader(CITED_KEY, { completed: [0, 1, 2, 3] }))), [true, true, true, true], 'INT-07 every chapter marked complete');
      agreeCross(cross(memoryStorage(lessonEntry(INDUSTRY, CITED_LESSON, { completedAt: 't', source: 'legacy-chapters', persistenceKey: CITED_KEY }))), [true, true, true, true], 'INT-07 lesson completion');
      agreeCross(cross(memoryStorage({ [quizStorageKey(CITED_KEY)]: { latest: 70, best: 70, attempts: [] } })), [true, true, true, true], 'INT-07 legacy lesson-level check');
      const noCurriculum = memoryStorage(lessonEntry(INDUSTRY, `1.2 ${CITED_LESSON}`, { completedAt: 't', source: 'assessment', persistenceKey: CITED_KEY }));
      same(cross(noCurriculum, { curriculum: false }).matchSort, [true, true, true, true], 'INT-07 completion found by title without the curriculum');
    },
  },
  {
    id: 'INT-08', name: 'consecutive zero-question chapters never deadlock, and an earlier unsubmitted check still gates', run: () => {
      const statuses: ChapterPlanStatus[] = ['ready', 'under-preparation', 'under-preparation', 'ready'];
      agreeCross(cross(memoryStorage(), { statuses }), [true, false, false, false], 'INT-08 check 1 not submitted');
      agreeCross(cross(memoryStorage({ [quizStorageKey(CITED_KEY)]: quiz([0]) }), { statuses }), [true, true, true, true], 'INT-08 check 1 submitted');
      agreeCross(cross(memoryStorage(), { statuses: ['under-preparation', 'under-preparation', 'ready', 'ready'] }), [true, true, true, false], 'INT-08 leading zero-question chapters');
    },
  },
  {
    id: 'INT-09', name: 'a failed assessment load never counts as completion or grants access', run: () => {
      const failed: ChapterPlanStatus[] = ['unavailable', 'unavailable', 'unavailable', 'unavailable'];
      const storage = memoryStorage();
      agreeCross(cross(storage, { statuses: failed }), [true, false, false, false], 'INT-09 nothing stored');
      same(storage.writes, 0, 'INT-09: nothing written');
      agreeCross(cross(memoryStorage({ [quizStorageKey(CITED_KEY)]: quiz([0]) }), { statuses: failed }), [true, true, false, false], 'INT-09 an earlier submission still counts');
      const unreadable: StorageLike = { getItem: () => { throw new Error('storage unavailable'); }, setItem: () => { throw new Error('storage unavailable'); } };
      same(cross(unreadable, { statuses: failed }).matchSort, [true, false, false, false], 'INT-09 unreadable storage opens nothing and does not throw');
    },
  },
  {
    id: 'INT-10', name: 'a held chapter stays held in every mode, whatever the stored progress says', run: () => {
      const held = cross(memoryStorage(reader(CITED_KEY, { completed: [0, 1] })), { held: [1] });
      agreeCross(held, [true, false, true, false], 'INT-10 legacy completion of a held chapter');
      assert(held.result?.excluded.some((item) => item.activityId === 'x1'), 'INT-10: the activity citing the held chapter is withheld, not merely locked');
      const completed = cross(memoryStorage(lessonEntry(INDUSTRY, CITED_LESSON, { completedAt: 't', persistenceKey: CITED_KEY })), { held: [1] });
      agreeCross(completed, [true, false, true, true], 'INT-10 completed lesson');
      agreeCross(cross(memoryStorage(), { held: [0] }), [false, true, false, false], 'INT-10 held first chapter does not gate the next');
    },
  },
  {
    id: 'INT-11', name: 'an invalid target lesson or chapter falls back safely', run: () => {
      const storage = memoryStorage(reader(CITED_KEY, { completed: [0, 1, 2, 3] }));
      const cards = citedCards(4);
      const ref = (index: number) => refFor(CITED_LESSON, cards, index);
      const access = (index: number, deck: ChapterLike[]) => otherLessonAccess(ref(index), deck, `${MODULE_PREFIX}::${OPEN_LESSON}`, storage, undefined, { identity: `${MODULE_PREFIX}::${CITED_LESSON}`, persistenceKey: CITED_KEY });
      same([access(4, cards), access(99, cards), access(-1, cards), access(Number.NaN, cards)], [false, false, false, false], 'INT-11 chapter index outside the lesson');
      same(access(0, []), false, 'INT-11 empty deck never opens a chapter');
      same(otherLessonAccess(ref(1), cards, 'not-an-identity', storage), false, 'INT-11 unresolvable identity and no stored key opens nothing');
      same(otherLessonAccess(ref(1), cards, `${MODULE_PREFIX}::${OPEN_LESSON}`, storage, undefined, { identity: 'x::y::z', persistenceKey: undefined }), false, 'INT-11 an identity with no records opens nothing');
      const throwing = cross(storage, { curriculumThrows: true });
      same(throwing.matchSort, [true, false, false, false], 'INT-11 a curriculum that cannot be listed gives no stored key, so the gate stays conservative');
      // Activity availability stays separate: an open chapter cited with a wrong title is withheld, not unlocked.
      const wrongTitle = resolveLessonPractice(
        cross(storage).lesson,
        { [SOURCE]: { [OPEN_LESSON]: OPEN_CARDS, [CITED_LESSON]: cards } },
        storage,
        { generated: false, packs: [{ packId: 'p', title: '', industryId: INDUSTRY, moduleId: 'm', sourceModuleKey: SOURCE, contentStatus: '', contentNotes: [], activities: [
          { activityId: 'bad', type: 'concept-matching', sourceRefs: [refFor(OPEN_LESSON, OPEN_CARDS, 0), { ...ref(1), chapterTitle: 'Not the chapter at that position' }] },
          { activityId: 'missing-lesson', type: 'concept-matching', sourceRefs: [refFor(OPEN_LESSON, OPEN_CARDS, 0), { ...ref(1), lessonTitle: 'No Such Lesson' }] },
        ] as unknown as MatchSortActivity[] }] },
      );
      same(wrongTitle?.available.length, 0, 'INT-11 invalid references are never offered');
      same(wrongTitle?.excluded.map((item) => item.activityId), ['bad', 'missing-lesson'], 'INT-11 invalid references are reported as withheld');
    },
  },
  {
    id: 'INT-12', name: 'corrupted or incomplete progress never throws and never fabricates completion', run: () => {
      const quizKey = quizStorageKey(CITED_KEY);
      const readerKey = readerStorageKey(CITED_KEY);
      const locked = [true, false, false, false];
      const cases: Array<[string, Record<string, string>, boolean[]]> = [
        ['reader is not JSON', { [readerKey]: 'not json{' }, locked],
        ['reader is an array', { [readerKey]: '[0,1,2]' }, locked],
        ['completed is a string', { [readerKey]: '{"completed":"0,1"}' }, locked],
        ['completed mixes valid and invalid entries', { [readerKey]: '{"completed":[0,"1",null,1.5,{},true]}' }, [true, true, false, false]],
        ['migrations is not a list', { [readerKey]: '{"migrations":"chapter-flow-v1","legacyCompletedChapters":"all"}' }, locked],
        ['legacyCompletedChapters mixes valid and invalid entries', { [readerKey]: '{"migrations":["chapter-flow-v1"],"legacyCompletedChapters":[0,"x",2.5,null]}' }, [true, true, false, false]],
        ['quiz is an array', { [quizKey]: '[]' }, locked],
        ['quiz chapter checks are malformed', { [quizKey]: '{"chapters":{"0":"x","1":null,"abc":{"latest":5}}}' }, locked],
        ['quiz score is not a number', { [quizKey]: '{"chapters":{"0":{"latest":"90","attempts":"many"}}}' }, locked],
        ['lesson progress is not an object', { [LESSON_PROGRESS_KEY]: '"done"' }, locked],
        ['lesson progress entry is null', { [LESSON_PROGRESS_KEY]: `{"${MODULE_PREFIX}::${CITED_LESSON}":null}` }, locked],
        ['lesson progress completion is empty', { [LESSON_PROGRESS_KEY]: `{"${MODULE_PREFIX}::${CITED_LESSON}":{"completedAt":"","persistenceKey":7}}` }, locked],
        ['lesson progress is not JSON', { [LESSON_PROGRESS_KEY]: '{{' }, locked],
      ];
      cases.forEach(([label, seed, expected]) => {
        const storage = rawStorage(seed);
        const before = snapshot(storage);
        const result = cross(storage);
        same(result.matchSort, expected, `INT-12 ${label}: Match & Sort`);
        same(result.flashcards, expected, `INT-12 ${label}: Flashcards / chooser`);
        same(result.direct, expected, `INT-12 ${label}: otherLessonAccess`);
        same(snapshot(storage), before, `INT-12 ${label}: records untouched`);
      });
    },
  },
  {
    id: 'INT-13', name: "the cited lesson's own progress is used, never another lesson's", run: () => {
      const otherKey = 'int-other-lesson';
      const everything = {
        ...reader(otherKey, { completed: [0, 1, 2, 3] }),
        [quizStorageKey(otherKey)]: quiz([0, 1, 2, 3]),
        ...lessonEntry(INDUSTRY, 'Other Lesson', { completedAt: 't', persistenceKey: otherKey }),
      };
      agreeCross(cross(memoryStorage(everything)), [true, false, false, false], 'INT-13 progress belongs to a different lesson');
      const cards = citedCards(4);
      const storage = memoryStorage({ ...everything, ...reader(CITED_KEY, { completed: [0] }) });
      const open = (lessonTitle: string, key: string, index: number) => otherLessonAccess(refFor(lessonTitle, cards, index), cards, `${MODULE_PREFIX}::${OPEN_LESSON}`, storage, undefined, { identity: `${MODULE_PREFIX}::${lessonTitle}`, persistenceKey: key });
      same(cards.map((_, index) => open(CITED_LESSON, CITED_KEY, index)), [true, true, false, false], 'INT-13 the cited lesson reads its own key');
      same(cards.map((_, index) => open('Other Lesson', otherKey, index)), [true, true, true, true], 'INT-13 the other lesson reads its own key');
      const noKeyGiven = (index: number) => otherLessonAccess(refFor(CITED_LESSON, cards, index), cards, `${MODULE_PREFIX}::${OPEN_LESSON}`, storage);
      same(cards.map((_, index) => noKeyGiven(index)), [true, false, false, false], 'INT-13 without a storage key, a lesson with no stored entry opens nothing beyond the first chapter');
    },
  },
  {
    id: 'INT-14', name: 'Flashcards chapter scope: the decision it consumes is unchanged and equals the reader and Match & Sort', run: () => {
      const result = cross(memoryStorage(reader(CITED_KEY, { completed: [0, 1] })));
      same(result.flashcards[1], true, 'INT-14 chapter 2 of the cited lesson opens');
      same(result.matchSort[1], result.flashcards[1], 'INT-14 and Match & Sort agrees');
      same(result.flashcards[3], false, 'INT-14 a chapter with no prerequisite met stays locked');
    },
  },
  {
    id: 'INT-15', name: 'Flashcards module scope: every lesson of the module gets the same gate in every mode', run: () => {
      const storage = memoryStorage({ ...reader('int-m1-a', { completed: [0] }), ...reader('int-m1-b', { completed: [0, 1, 2] }), [quizStorageKey('int-m1-c')]: quiz([0]) });
      const module = [['int-m1-a', 'Lesson A'], ['int-m1-b', 'Lesson B'], ['int-m1-c', 'Lesson C']];
      const flashcards = module.map(([key, title]) => storedChapterProgress(`${MODULE_PREFIX}::${title}`, key, citedCards(4), storage).map(open));
      const matchSort = module.map(([key, title]) => citedCards(4).map((_, index) => otherLessonAccess(refFor(title, citedCards(4), index), citedCards(4), `${MODULE_PREFIX}::${OPEN_LESSON}`, storage, undefined, { identity: `${MODULE_PREFIX}::${title}`, persistenceKey: key })));
      same(flashcards, [[true, true, false, false], [true, true, true, true], [true, true, false, false]], 'INT-15 module-scope decisions');
      same(matchSort, flashcards, 'INT-15 Match & Sort follows the same decisions');
    },
  },
  {
    id: 'INT-16', name: 'Flashcards all-scope: lessons of other modules and industries are decided by their own records only', run: () => {
      const storage = memoryStorage({ ...reader('int-m1-a', { completed: [0, 1] }), ...reader('int-m2-a', { completed: [0] }) });
      const lessons = [[`${INDUSTRY}::Module::Lesson A`, 'int-m1-a'], [`${INDUSTRY}::Module Two::Lesson A`, 'int-m2-a'], [`${INDUSTRY}::Module Two::Lesson B`, 'int-m2-b']];
      const decide = ([identity, key]: string[]) => {
        const parts = identity.split('::');
        return citedCards(4).map((_, index) => otherLessonAccess(refFor(parts[2], citedCards(4), index), citedCards(4), `${parts[0]}::${parts[1]}::Open`, storage, undefined, { identity, persistenceKey: key }));
      };
      same(lessons.map((lesson) => storedChapterProgress(lesson[0], lesson[1], citedCards(4), storage).map(open)), [[true, true, true, false], [true, true, false, false], [true, false, false, false]], 'INT-16 flashcard decisions');
      same(lessons.map(decide), lessons.map((lesson) => storedChapterProgress(lesson[0], lesson[1], citedCards(4), storage).map(open)), 'INT-16 Match & Sort decisions match');
    },
  },
  {
    id: 'INT-17', name: 'the Learning Mode Chooser agrees with Match & Sort in every progress state', run: () => {
      const states: Array<[string, Record<string, unknown>, boolean[], Partial<CrossOptions>]> = [
        ['new learner', {}, [true, false, false, false], {}],
        ['legacy completion', reader(CITED_KEY, { completed: [0, 1] }), [true, true, true, false], {}],
        ['submitted check', { [quizStorageKey(CITED_KEY)]: quiz([0]) }, [true, true, false, false], {}],
        ['held chapter', reader(CITED_KEY, { completed: [0, 1] }), [true, false, true, false], { held: [1] }],
        ['zero-question chapter', {}, [true, true, false, false], { statuses: ['under-preparation', 'ready', 'ready', 'ready'] }],
      ];
      states.forEach(([label, seed, expected, options]) => {
        const result = cross(memoryStorage(seed), options);
        same(result.chooser, result.matchSort, `INT-17 ${label}: chooser vs Match & Sort`);
        same(result.chooser, expected, `INT-17 ${label}: expected decision`);
      });
    },
  },
  {
    id: 'INT-18', name: 'saved Match & Sort completion, Flashcard history, scores, notes and positions are preserved (read-only)', run: () => {
      const seed = {
        ...reader(CITED_KEY, { completed: [0, 1], notes: { 0: 'my note' }, positions: { 0: 120 }, view: { stage: 'learning', chapter: 1 } }),
        [quizStorageKey(CITED_KEY)]: { latest: 80, best: 90, attempts: [{ at: 't', correct: 4, total: 5, accuracy: 80 }], chapters: { 0: submitted } },
        'casemate:match-sort:progress': { x1: { activityId: 'x1', attempts: [], completedAt: '2026-01-01T00:00:00.000Z' } },
        'casemate:flashcards:review': { 'deck:card-1': { box: 3, lastReviewedAt: '2026-01-02T00:00:00.000Z' } },
        ...lessonEntry(INDUSTRY, 'Some Lesson', { completedAt: 't', access: 'historical', persistenceKey: 'k' }),
      };
      const storage = memoryStorage(seed);
      const before = snapshot(storage);
      cross(storage);
      cross(storage, { statuses: ['ready', 'unavailable', 'under-preparation', 'ready'] });
      same(snapshot(storage), before, 'INT-18 every stored record is byte-identical after the access checks');
      same(storage.writes, 0, 'INT-18 nothing was written');
    },
  },
  {
    id: 'INT-19', name: 'a refresh with legacy progress gives the same decision, with or without the reader having migrated it', run: () => {
      const legacy = memoryStorage(reader(CITED_KEY, { completed: [0, 1] }));
      const first = cross(legacy);
      const refreshed = cross(cloneStorage(legacy));
      same(refreshed.matchSort, first.matchSort, 'INT-19 same decision after reload');
      same(first.matchSort, [true, true, true, false], 'INT-19 legacy decision');
      // What the reader persists once it has opened the lesson: the migration marker and the captured legacy chapters.
      const migrated = cloneStorage(legacy);
      migrated.values.set(readerStorageKey(CITED_KEY), JSON.stringify(prepareChapterFlowState({ completed: [0, 1] })));
      const afterReader = cross(migrated);
      same(afterReader.matchSort, first.matchSort, 'INT-19 same decision once the reader has migrated the record');
      same(afterReader.readerAccess, first.readerAccess, 'INT-19 and the reader agrees');
    },
  },
  {
    id: 'INT-20', name: 'progress never leaks between curricula that share lesson and module titles', run: () => {
      const other = 'int-other-industry';
      const seed = {
        ...reader('int-other-cited', { completed: [0, 1, 2, 3] }),
        [quizStorageKey('int-other-cited')]: quiz([0, 1, 2, 3]),
        ...lessonEntry(other, CITED_LESSON, { completedAt: 't', persistenceKey: 'int-other-cited' }),
      };
      agreeCross(cross(memoryStorage(seed)), [true, false, false, false], 'INT-20 the learner has progress only in the other curriculum');
      agreeCross(cross(memoryStorage(seed), { industry: other, citedKey: 'int-other-cited' }), [true, true, true, true], 'INT-20 the other curriculum keeps its own progress');
    },
  },
];

export function runCrossModeAccessTests() {
  const failures: string[] = [];
  cases.forEach((item) => {
    try {
      item.run();
      console.log(`PASS ${item.id} ${item.name}`);
    } catch (error) {
      failures.push(`${item.id}: ${(error as Error).message}`);
      console.log(`FAIL ${item.id} ${item.name}: ${(error as Error).message}`);
    }
  });
  if (failures.length) throw new Error(`${failures.length} cross-mode case(s) failed`);
  return cases.length;
}

runCrossModeAccessTests();
