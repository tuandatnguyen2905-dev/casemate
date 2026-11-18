import type { JourneyRow } from '../../IndustryKnowledge/lessonFlowCore';

/** One lesson of the open curriculum, in curriculum order, as the reader's lesson registry lists it. */
export interface CurriculumStop {
  identity: string;
  title: string;
  moduleTitle: string;
  /** Every chapter of the lesson is held for review, so it is not a place to continue to. */
  heldForReview?: boolean;
}

/**
 * Where Continue Learning leads after practising a chapter. Built only from the reader's own Learning
 * Journey rows (its chapter gate) and the curriculum's lesson order, so practice can never open a chapter
 * the reader would refuse, skip a Knowledge Check, or jump to the start of the curriculum.
 */
export type ContinueLearningTarget =
  /** The next chapter of this lesson is open: read it. */
  | { kind: 'chapter'; chapterIndex: number; number: number; title: string }
  /** The next chapter waits for a Knowledge Check in this lesson: take that check. */
  | { kind: 'check'; checkIndex: number; checkNumber: number; lockedNumber: number; lockedTitle: string; preparation: boolean }
  /** This was the lesson's last chapter: the next lesson of the curriculum (lessons are freely navigable). */
  | { kind: 'lesson'; identity: string; title: string; moduleTitle: string; newModule: boolean }
  /** No later lesson, or the curriculum order is not known: the module's Your Learning Path. */
  | { kind: 'learning-path'; reason: 'end-of-curriculum' | 'unknown-order' };

export function resolveContinueLearning({ rows, chapterIndex, identity, lessons }: {
  rows: JourneyRow[];
  /** Original index of the chapter being practised. */
  chapterIndex: number;
  identity: string;
  /** The curriculum in order, or null when it could not be listed. */
  lessons: CurriculumStop[] | null;
}): ContinueLearningTarget {
  const next = rows.find((row) => row.index > chapterIndex && row.state !== 'under-review');
  if (next) {
    if (next.state !== 'locked') return { kind: 'chapter', chapterIndex: next.index, number: next.number, title: next.title };
    const checkNumber = next.lockedBy ?? chapterIndex + 1;
    return { kind: 'check', checkIndex: checkNumber - 1, checkNumber, lockedNumber: next.number, lockedTitle: next.title, preparation: next.lockedByPreparation };
  }
  const position = lessons ? lessons.findIndex((lesson) => lesson.identity === identity) : -1;
  if (!lessons || position < 0) return { kind: 'learning-path', reason: 'unknown-order' };
  const current = lessons[position];
  const following = lessons.slice(position + 1).find((lesson) => !lesson.heldForReview);
  if (!following) return { kind: 'learning-path', reason: 'end-of-curriculum' };
  return { kind: 'lesson', identity: following.identity, title: following.title, moduleTitle: following.moduleTitle, newModule: following.moduleTitle !== current.moduleTitle };
}

export function describeContinueLearning(target: ContinueLearningTarget): { label: string; detail?: string; notice?: string } {
  switch (target.kind) {
    case 'chapter':
      return { label: `Continue to Chapter ${target.number}`, detail: `${target.title} · opens in the lesson` };
    case 'check':
      return {
        label: `Take Knowledge Check ${target.checkNumber}`,
        detail: 'Opens the check in this lesson',
        notice: target.preparation
          ? `Chapter ${target.lockedNumber} (${target.lockedTitle}) opens after Knowledge Check ${target.checkNumber}, which could not load just now. Open it to try again.`
          : `Chapter ${target.lockedNumber} (${target.lockedTitle}) opens after you submit Knowledge Check ${target.checkNumber}, with any score. Flashcards never unlock chapters.`,
      };
    case 'lesson':
      return { label: 'Continue to Next Lesson', detail: `Next: ${target.title}${target.newModule ? ` · ${target.moduleTitle}` : ''}` };
    default:
      return {
        label: 'Back to Your Learning Path',
        detail: target.reason === 'end-of-curriculum' ? 'You have reached the last lesson of this curriculum.' : 'Pick your next lesson from the module overview.',
      };
  }
}
