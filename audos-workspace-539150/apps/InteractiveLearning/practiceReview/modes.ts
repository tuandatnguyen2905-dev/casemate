import type { ComponentType, RefObject } from 'react';
import type { ContinueLearningAction } from '../flashcards/components/ReviewSummary';
import type { PracticeLesson } from './practiceLessonStore';

export interface PracticeModeSummary {
  available: number;
  completed: number;
  /** Items that exist for the lesson but draw on chapters this learner has not opened yet. */
  locked: number;
  /** Flashcards due for spaced review now. */
  due?: number;
  /** Progress in the mode's own units, e.g. "3 of 14 cards studied". */
  progressLabel: string;
  /** Shown when some items are still locked, e.g. "2 more cards open as you complete earlier chapters". */
  lockedLabel?: string;
  /** Curriculum the practice belongs to, e.g. "Commercial Banking". */
  industryLabel?: string;
}

export interface PracticeContext {
  /** Hashed signed-in learner, or null when signed out (practice then stays in memory). */
  learnerScope: string | null;
  /**
   * Opened from the Learning Mode Chooser: a mode offers only the reader's open chapter
   * (`PracticeLesson.activeChapter`), and its counts and progress cover that chapter alone.
   */
  chapterOnly?: boolean;
}

/** Dialog chrome handed to a mode that lays out its own overview (`ownsLayout`). */
export interface PracticeChrome {
  headingId: string;
  headingRef: RefObject<HTMLHeadingElement>;
  lessonTitle: string;
  moduleTitle: string;
  /** Scope to restore (after a refresh or when returning from a session). */
  initialScope?: string;
  onScopeChange?: (scope: string) => void;
  /** The next step after a session, resolved from the reader's chapter gate and the curriculum order. */
  continueLearning?: ContinueLearningAction;
  /** The dialog's Return to Lesson: back to the screen practice was opened from. */
  returnToLesson?: () => void;
}

export interface PracticeModeBodyProps<R> {
  resolved: R;
  context: PracticeContext;
  /** The mode opened an activity or session (true) or returned to its own list (false). */
  onSessionChange: (inSession: boolean) => void;
  /** Present only for modes with `ownsLayout`. */
  chrome?: PracticeChrome;
}

/**
 * One optional learning mode inside Practice & Review. A mode decides from the open lesson whether
 * it has anything to offer; returning null hides it. Modes never write Domain Knowledge progress.
 */
export interface PracticeMode<R = unknown> {
  id: string;
  label: string;
  description: string;
  /** Three short labels for what the mode practises. */
  highlights: string[];
  /** The mode renders its own heading, back control and column layout inside the dialog. */
  ownsLayout?: boolean;
  resolve: (lesson: PracticeLesson, context: PracticeContext) => R | null;
  summarise: (resolved: R, context: PracticeContext) => PracticeModeSummary;
  Body: ComponentType<PracticeModeBodyProps<R>>;
}
