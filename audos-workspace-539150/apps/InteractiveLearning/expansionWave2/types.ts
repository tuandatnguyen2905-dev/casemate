// Types for the Practice & Review expansion, wave 2. Everything here is additive and self-contained.
// Decks use the existing flashcard model unchanged. Match & Sort uses the existing activity model,
// except that `sourceModuleKey` is a plain string: the engine's `SourceModuleKey` union is closed
// over Commercial Banking and Consumer Finance and is widened only in the later integration pass.

import type { FlashcardDeckContent } from '../flashcards/models';
import type { ChapterRef, MatchSortActivity, MatchSortPack } from '../matchSort/types';

export type { FlashcardDeckContent };

export type Wave2ChapterRef = Omit<ChapterRef, 'sourceModuleKey'> & { sourceModuleKey: string };

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type Wave2Activity = DistributiveOmit<MatchSortActivity, 'sourceRefs'> & { sourceRefs: Wave2ChapterRef[] };
export type Wave2Pack = Omit<MatchSortPack, 'sourceModuleKey' | 'activities'> & { sourceModuleKey: string; activities: Wave2Activity[] };

/**
 * How well a chapter's displayed text answers its own title.
 * authored: written specifically for the title. aligned: the text answers the title.
 * weak: the text covers the lesson theme but not the title. mismatch: the text covers a different topic.
 * held: under a review hold; never cited.
 */
export type ChapterAlignment = 'authored' | 'aligned' | 'weak' | 'mismatch' | 'held';

export interface SourceChapter {
  /** Title without the numeric prefix, exactly as the reader shows it. */
  title: string;
  alignment: ChapterAlignment;
}

export interface SourceLesson {
  lessonTitle: string;
  lessonId: string;
  chapters: SourceChapter[];
}

export interface SourceModule {
  moduleKey: string;
  moduleId: string;
  moduleLabel: string;
  file: string;
  /** contentSha256 of `file` when it was read through the workspace bridge. */
  readAtSha256: string;
  lessons: SourceLesson[];
}

/** What a test needs to know about one displayed chapter. */
export interface ChapterText {
  title: string;
  /** Text the learner can read in the chapter, one field per line. Excerpts must sit inside a single line. */
  text: string;
  sourceIds: string[];
  held: boolean;
}

/** Resolves a chapter (1-based number within its lesson) to its displayed text; null when it does not exist. */
export type ChapterTextProvider = (moduleKey: string, lessonTitle: string, chapterNumber: number) => ChapterText | null;

/** A review hold recorded for a chapter or, when `chapter` is absent, a whole lesson. */
export interface KnownHold {
  moduleKey: string;
  lesson: string;
  chapter?: string;
  id: string;
}

export type CardCategory = 'Concept Recall' | 'Mechanism Understanding' | 'Financial Literacy' | 'Business Application' | 'Compare & Differentiate';

export type CurriculumStatus =
  | 'Not Started'
  | 'Authored / Unverified'
  | 'Validation Failed'
  | 'Validated / Integration Ready'
  | 'Blocked by Source or Review Hold'
  | 'Integrated';

export interface CoverageRow {
  industryId: string;
  curriculum: string;
  group: string;
  status: CurriculumStatus;
  totalLessons: number;
  lessonsInspected: number;
  lessonsWithFlashcards: number;
  totalCards: number;
  lessonsWithMatchSort: number;
  totalActivities: number;
  sourceMapping: string;
  contentQuality: string;
  reviewHold: string;
  testsExecuted: string;
  remaining: string;
}
