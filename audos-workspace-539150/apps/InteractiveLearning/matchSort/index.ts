// Match & Sort — public integration surface for a future "Practice & Review" experience.
// Not registered in navigation or config.json. Optional practice only: it never reads or writes
// Domain Knowledge reader, quiz or lesson-progress storage, and never gates chapters or lessons.

export { default as MatchSortSession, ActivityRunner } from './components/MatchSortSession';
export type { MatchSortSessionProps } from './components/MatchSortSession';
export { default as ConceptMatching } from './components/ConceptMatching';
export { default as CategorySorting } from './components/CategorySorting';
export { default as SequenceBuilder } from './components/SequenceBuilder';
export { default as ActivityFeedback } from './components/ActivityFeedback';
export { default as ActivityProgress } from './components/ActivityProgress';

export {
  MATCH_SORT_PACKS,
  COMMERCIAL_BANKING_M01_PACK,
  CONSUMER_FINANCE_M01_PACK,
  packById,
  activityById,
  activitiesForChapter,
  activitiesForLesson,
} from './content';

export { resolveAvailableActivities, chapterRefProblem, validatePacks, chapterIdOf, lessonIdOf } from './validation';

export { generateLessonActivities, isLessonSampler, qualityProblems, GENERATED_SOURCE_KEY, LESSON_REVIEW_KIND, ACTIVITY_GUIDELINE } from './generator';
export type { GeneratedLesson, GeneratedChapterReport, GeneratedKind, ActivityTier } from './generator';
export { generatedLessonPractice, generatedPracticePack } from './generatedPractice';
export type { SourceDecks, Availability, ContentIssue } from './validation';

export {
  MATCH_SORT_STORAGE_KEY,
  createStoragePersistence,
  createMemoryPersistence,
  defaultPersistence,
  recordAttempt,
  parseProgress,
} from './persistence';
export type { MatchSortPersistence, StorageLike } from './persistence';

export { initialState, reduceActivity, evaluate, canCheck, buildFeedback, progressOf } from './engine';
export type {
  ActivityType,
  SourceModuleKey,
  ChapterRef,
  MatchSortActivity,
  ConceptMatchingActivity,
  CategorySortingActivity,
  SequenceBuilderActivity,
  MatchSortPack,
  ActivityState,
  ActivityAction,
  CheckResult,
  AttemptSummary,
  ActivityRecord,
  MatchSortProgress,
  MatchSortAttemptEvent,
} from './types';
