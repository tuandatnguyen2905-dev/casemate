import { useSyncExternalStore } from 'react';
import type { ChapterLike, JourneyRow } from '../../IndustryKnowledge/lessonFlowCore';
import type { LessonFlowCurriculum } from '../../IndustryKnowledge/lessonFlow';

/** The reader's Learning Journey, so the practice modes list the same chapters in the same states. */
export interface PracticeJourney {
  rows: JourneyRow[];
  takeaways: 'locked' | 'available';
}

/** Navigation the open reader performs for Practice & Review; every action keeps the reader's own gates. */
export interface PracticeLessonActions {
  /** Opens a chapter in the reader; false when the chapter gate refuses it. */
  selectChapter: (index: number) => boolean;
  openCheck: (index: number) => void;
  openTakeaways: () => void;
  /** Opens the module's Your Learning Path overview; false when the lesson has none. */
  backToLearningPath: () => boolean;
}

/** The lesson currently open in the Domain Knowledge reader, as Practice & Review needs it. */
export interface PracticeLesson {
  /** `<industryId>::<module title>::<lesson title>`, the lesson-progress identity. */
  identity: string;
  /** The reader's own deck, after review holds. */
  cards: ChapterLike[];
  /** By original chapter index: open to this learner and not under review. */
  accessible: boolean[];
  /** The reader's storage key for this lesson (notes live under `casemate:domain-reader:<key>`). */
  persistenceKey?: string;
  /** Original index of the chapter open in the reader. */
  activeChapter?: number;
  /** Every lesson of the curriculum, when the reader can list them. */
  curriculum?: LessonFlowCurriculum;
  journey?: PracticeJourney;
  actions?: PracticeLessonActions;
}

let current: PracticeLesson | null = null;
let practiceVersion = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

const signature = (lesson: PracticeLesson | null) => (lesson
  ? [
    lesson.identity, lesson.accessible.map(Number).join(''), String(lesson.activeChapter ?? ''), lesson.curriculum ? '1' : '0',
    lesson.journey ? `${lesson.journey.takeaways}:${lesson.journey.rows.map((row) => `${row.state}/${row.check}`).join(',')}` : '',
    ...lesson.cards.map((card) => `${card.title ?? ''}|${card.reviewStatus ?? ''}`),
  ].join('\u0001')
  : '');

/** Called by the lesson-flow hook. Returns the cleanup for when that lesson closes. */
export function publishPracticeLesson(lesson: PracticeLesson): () => void {
  const changed = signature(lesson) !== signature(current);
  current = lesson;
  if (changed) emit();
  return () => {
    if (current?.identity !== lesson.identity) return;
    current = null;
    emit();
  };
}

/** Practice history changed (an attempt was recorded); entry points refresh their counts. */
export function notifyPracticeChanged() {
  practiceVersion += 1;
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

export const getPracticeLesson = () => current;

export const usePracticeLesson = () => useSyncExternalStore(subscribe, getPracticeLesson, getPracticeLesson);
export const usePracticeVersion = () => useSyncExternalStore(subscribe, () => practiceVersion, () => practiceVersion);
