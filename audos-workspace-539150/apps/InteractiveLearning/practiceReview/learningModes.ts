import { isRestrictedChapter, readJson, readerStorageKey, resolveStartChapter, storedChapterProgress, stripChapterNumber } from '../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, ChapterPlanStatus, ChapterProgress, StorageLike } from '../../IndustryKnowledge/lessonFlowCore';
import type { LessonFlowCurriculum } from '../../IndustryKnowledge/lessonFlow';
import { normaliseTitle } from '../matchSort/validation';
import type { MatchSortActivity } from '../matchSort/types';
import { cardsInScope, originLesson, resolveIndustryFlashcards } from './flashcardScopes';
import { resolveLessonPractice } from './lessonAccess';
import type { LessonPracticeResult } from './lessonAccess';
import type { PracticeLesson } from './practiceLessonStore';
import { clearPracticeResume, readPracticeResume, writePracticeResume } from './practiceResume';
import { browserStorage } from './practiceStorage';
import { heldSourceDecks } from './sourceDecks';

// The Learning Mode Chooser: one chapter, three ways to learn it. Everything here is resolved from
// the lesson the registry returns (its deck after review holds, its persistence key and the stored
// chapter records), so any curriculum the dispatcher can open gets the chooser without extra wiring.
// Nothing here writes lesson progress, Knowledge Check records, notes or practice history; the only
// writes are the reader's open chapter (`view`) and the tab-scoped practice resume record.

export type LearningModeId = 'reader' | 'flashcards' | 'match-sort';
export type LearningEntry = 'start' | 'continue';

export const LEARNING_MODE_IDS: LearningModeId[] = ['reader', 'flashcards', 'match-sort'];

export interface ChapterModeState {
  id: LearningModeId;
  available: boolean;
  /** Cards or activities open in this chapter now (0 for the reader). */
  count: number;
}

export interface ChapterLearningModes {
  chapterIndex: number;
  chapterTitle: string;
  modes: Record<LearningModeId, ChapterModeState>;
}

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isOpen = (chapter: ChapterProgress | undefined) => Boolean(chapter?.unlocked && !chapter.restricted);

export const learningChapterTitle = (chapters: ChapterLike[], index: number) => stripChapterNumber(String(chapters[index]?.title ?? '').replace(/\s+/g, ' ').trim())
  .replace(/^\d{1,2}\s+(?=\S)/, '') || `Chapter ${index + 1}`;

/**
 * The reader's chapter gate for a lesson that is not open yet, from the records the reader itself
 * keeps: chapter checks, legacy chapter completion and lesson completion. Held chapters are restricted;
 * with the lesson's chapter statuses (`assessment`), a chapter without a Knowledge Check opens as in the reader.
 */
export function lessonChapterProgress(identity: string, persistenceKey: string | undefined, chapters: ChapterLike[], storage: StorageLike | null, assessment?: ReadonlyArray<ChapterPlanStatus | undefined>): ChapterProgress[] {
  return storedChapterProgress(identity, persistenceKey, chapters, storage, assessment);
}

/** The lesson's chapter statuses as its curriculum resolved them, when the curriculum lists the lesson. */
function curriculumAssessment(curriculum: LessonFlowCurriculum | undefined, identity: string): ChapterPlanStatus[] | undefined {
  try {
    return curriculum?.lessons().find((lesson) => lesson.identity === identity)?.assessment;
  } catch {
    return undefined;
  }
}

/** The chapter the reader last had open, as it saved it (`view.chapter`). */
export function savedReaderChapter(persistenceKey: string | undefined, storage: StorageLike | null): number | undefined {
  const stored = persistenceKey ? readJson(storage, readerStorageKey(persistenceKey)) : null;
  const chapter = isRecord(stored) && isRecord(stored.view) ? Number(stored.view.chapter) : Number.NaN;
  return Number.isInteger(chapter) && chapter >= 0 ? chapter : undefined;
}

/**
 * Start: the first chapter this learner can open. Continue: the saved chapter when it is still open,
 * otherwise the reader's own fallback (`resolveStartChapter`: first open incomplete chapter). Held
 * chapters are never chosen; null when the lesson has no open chapter at all.
 */
export function resolveEntryChapter(entry: LearningEntry, progress: ChapterProgress[], savedChapter?: number): number | null {
  const open = progress.filter(isOpen);
  if (!open.length) return null;
  if (entry === 'start') return open[0].index;
  const resolved = resolveStartChapter(progress, savedChapter ?? -1);
  if (isOpen(progress[resolved])) return resolved;
  return (open.find((chapter) => chapter.index > resolved) ?? open[0]).index;
}

/** Match & Sort activities that cite this lesson's chapter, split into open and locked. */
export function chapterActivities(result: LessonPracticeResult, chapterIndex: number): { available: MatchSortActivity[]; locked: number } {
  const lessonTitle = normaliseTitle(result.lessonTitle);
  const cites = (activity: MatchSortActivity) => activity.sourceRefs.some((ref) => ref.chapterIndex === chapterIndex && normaliseTitle(ref.lessonTitle) === lessonTitle);
  const excluded = new Set(result.excluded.map((item) => item.activityId));
  const available = result.available.filter(cites);
  const open = new Set(available.map((activity) => activity.activityId));
  const seen = new Set<string>();
  const locked = result.pack.activities.filter((activity) => {
    if (!cites(activity) || open.has(activity.activityId) || excluded.has(activity.activityId) || seen.has(activity.activityId)) return false;
    seen.add(activity.activityId);
    return true;
  }).length;
  return { available, locked };
}

const atChapter = (lesson: PracticeLesson, chapterIndex: number): PracticeLesson => ({ ...lesson, activeChapter: chapterIndex });

function chapterFlashcards(lesson: PracticeLesson, chapterIndex: number, storage: StorageLike | null): { available: number; locked: number } {
  try {
    const industry = resolveIndustryFlashcards(atChapter(lesson, chapterIndex), storage);
    const items = industry ? cardsInScope(industry, 'chapter') : [];
    return { available: items.filter((item) => !item.locked).length, locked: items.filter((item) => item.locked).length };
  } catch {
    return { available: 0, locked: 0 };
  }
}

function chapterMatchSort(lesson: PracticeLesson, chapterIndex: number, storage: StorageLike | null): { available: number; locked: number } {
  try {
    const result = resolveLessonPractice(atChapter(lesson, chapterIndex), heldSourceDecks(), storage);
    if (!result) return { available: 0, locked: 0 };
    const scoped = chapterActivities(result, chapterIndex);
    return { available: scoped.available.length, locked: scoped.locked };
  } catch {
    return { available: 0, locked: 0 };
  }
}

/**
 * What each learning mode offers for one chapter. The chapter's own gate applies to every mode: a
 * locked or held chapter offers nothing, and practice modes need at least one open card or activity.
 */
export function chapterLearningModes(lesson: PracticeLesson, chapterIndex: number, storage: StorageLike | null = browserStorage()): ChapterLearningModes {
  const card = lesson.cards[chapterIndex];
  const open = Boolean(card) && !isRestrictedChapter(card) && Boolean(lesson.accessible[chapterIndex]);
  const flashcards = open ? chapterFlashcards(lesson, chapterIndex, storage).available : 0;
  const matchSort = open ? chapterMatchSort(lesson, chapterIndex, storage).available : 0;
  return {
    chapterIndex,
    chapterTitle: learningChapterTitle(lesson.cards, chapterIndex),
    modes: {
      reader: { id: 'reader', available: open, count: 0 },
      flashcards: { id: 'flashcards', available: flashcards > 0, count: flashcards },
      'match-sort': { id: 'match-sort', available: matchSort > 0, count: matchSort },
    },
  };
}

/**
 * Open cards (flashcards) or activities (Match & Sort) per chapter of the lesson, counted exactly as
 * `chapterLearningModes` counts one chapter. Locked and held chapters count 0.
 */
export function chapterModeCounts(lesson: PracticeLesson, mode: Exclude<LearningModeId, 'reader'>, storage: StorageLike | null = browserStorage()): number[] {
  const counts = lesson.cards.map(() => 0);
  try {
    if (mode === 'flashcards') {
      const industry = resolveIndustryFlashcards(lesson, storage);
      const seen = new Set<string>();
      (industry ? originLesson(industry)?.cards ?? [] : []).forEach((item) => {
        const key = `${item.chapterIndex}:${item.card.cardId}`;
        if (item.locked || seen.has(key) || counts[item.chapterIndex] === undefined) return;
        seen.add(key);
        counts[item.chapterIndex] += 1;
      });
    } else {
      const result = resolveLessonPractice(lesson, heldSourceDecks(), storage);
      if (result) lesson.cards.forEach((_, index) => { counts[index] = chapterActivities(result, index).available.length; });
    }
  } catch {
    return lesson.cards.map(() => 0);
  }
  return counts.map((count, index) => (isRestrictedChapter(lesson.cards[index]) || !lesson.accessible[index] ? 0 : count));
}

export interface LearningEntryInput {
  identity: string;
  persistenceKey?: string;
  chapters: ChapterLike[];
  curriculum?: LessonFlowCurriculum;
  entry: LearningEntry;
  /** Reopen on this chapter (Return to Lesson to the chooser) instead of Start / Continue; no plan when it is not open. */
  chapterIndex?: number;
  /** The lesson's chapter Knowledge Check statuses; looked up in the curriculum when omitted. */
  assessment?: ChapterPlanStatus[];
}

export interface LearningEntryPlan extends ChapterLearningModes {
  identity: string;
  persistenceKey?: string;
  chapterCount: number;
  lesson: PracticeLesson;
}

/** The chapter Start or Continue Learning opens and what each mode offers there; null when no chapter is open. */
export function prepareLearningEntry(input: LearningEntryInput, storage: StorageLike | null = browserStorage()): LearningEntryPlan | null {
  if (!input.identity || !input.chapters.length) return null;
  const progress = lessonChapterProgress(input.identity, input.persistenceKey, input.chapters, storage, input.assessment ?? curriculumAssessment(input.curriculum, input.identity));
  const chapterIndex = input.chapterIndex === undefined
    ? resolveEntryChapter(input.entry, progress, savedReaderChapter(input.persistenceKey, storage))
    : isOpen(progress[input.chapterIndex]) ? input.chapterIndex : null;
  if (chapterIndex === null) return null;
  const lesson: PracticeLesson = {
    identity: input.identity,
    cards: input.chapters,
    accessible: progress.map(isOpen),
    persistenceKey: input.persistenceKey,
    activeChapter: chapterIndex,
    curriculum: input.curriculum,
  };
  return { ...chapterLearningModes(lesson, chapterIndex, storage), identity: input.identity, persistenceKey: input.persistenceKey, chapterCount: input.chapters.length, lesson };
}

/** Points the reader at one chapter's reading view before it opens; notes, completion and positions are kept. */
export function setReaderChapter(persistenceKey: string, chapterIndex: number, storage: StorageLike | null = browserStorage()) {
  if (!storage || !Number.isInteger(chapterIndex) || chapterIndex < 0) return;
  const stored = readJson(storage, readerStorageKey(persistenceKey));
  try {
    storage.setItem(readerStorageKey(persistenceKey), JSON.stringify({ ...(isRecord(stored) ? stored : {}), view: { stage: 'learning', chapter: chapterIndex } }));
  } catch {
    // The reader then opens where its own record says.
  }
}

/** Hands the chosen mode to the reader: it opens on the chapter, and practice modes reopen through the resume record. */
export function applyLearningEntry(plan: Pick<LearningEntryPlan, 'identity' | 'persistenceKey' | 'chapterIndex'>, mode: LearningModeId, storage: StorageLike | null = browserStorage()) {
  if (plan.persistenceKey) setReaderChapter(plan.persistenceKey, plan.chapterIndex, storage);
  if (mode === 'reader') clearPracticeResume();
  else {
    // An explicit choice: practice reopens once the lesson opens, with the review scope of this mode's last visit.
    const previous = readPracticeResume(plan.identity);
    const scope = previous?.modeId === mode ? previous.scope ?? 'chapter' : 'chapter';
    writePracticeResume({ identity: plan.identity, modeId: mode, scope, chapterOnly: true, origin: { view: 'chooser', chapterIndex: plan.chapterIndex }, requested: true });
  }
}

export interface ChapterContent {
  chapterIndex: number;
  title: string;
  restricted: boolean;
  /** Cards and activities authored or generated for the chapter, whatever this learner has opened. */
  flashcards: number;
  matchSort: number;
}

/** Practice content per chapter of one lesson, independent of any learner's progress (coverage reporting). */
export function lessonChapterContent(lesson: PracticeLesson, storage: StorageLike | null = null): ChapterContent[] {
  const everyChapter: PracticeLesson = { ...lesson, accessible: lesson.cards.map((card) => !isRestrictedChapter(card)) };
  let cardsByChapter = new Map<number, number>();
  try {
    const industry = resolveIndustryFlashcards(atChapter(everyChapter, 0), storage);
    const own = industry ? originLesson(industry) : undefined;
    cardsByChapter = (own?.cards ?? []).reduce((counts, item) => counts.set(item.chapterIndex, (counts.get(item.chapterIndex) ?? 0) + 1), new Map<number, number>());
  } catch {
    cardsByChapter = new Map();
  }
  let practice: LessonPracticeResult | null = null;
  try {
    practice = resolveLessonPractice(everyChapter, heldSourceDecks(), storage);
  } catch {
    practice = null;
  }
  return lesson.cards.map((card, chapterIndex) => {
    const activities = practice ? chapterActivities(practice, chapterIndex) : { available: [], locked: 0 };
    return {
      chapterIndex,
      title: learningChapterTitle(lesson.cards, chapterIndex),
      restricted: isRestrictedChapter(card),
      flashcards: cardsByChapter.get(chapterIndex) ?? 0,
      matchSort: activities.available.length + activities.locked,
    };
  });
}
