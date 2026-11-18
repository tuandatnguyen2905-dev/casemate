// Knowledge Check auto-advance (Sprint 04 Release A).
// Three separate actions, never merged:
//   1. record an answer      -> `onSelect` (existing draft in the assessment record, saved immediately)
//   2. move to the next question -> `onMove` (draft index only)
//   3. submit the whole check -> `onSubmit` (scoring, attempts, chapter unlocking; learner-initiated only)
// Auto-advance only ever performs action 2, and never from the final question.

export const AUTO_ADVANCE_MS = 500;
/** Slightly longer when the learner asked for reduced motion: no transition, but the confirmation stays readable. */
export const AUTO_ADVANCE_REDUCED_MOTION_MS = 650;

export function prefersReducedMotion(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export const autoAdvanceDelay = (reducedMotion: boolean) => (reducedMotion ? AUTO_ADVANCE_REDUCED_MOTION_MS : AUTO_ADVANCE_MS);

export interface AnswerableQuestion {
  id: string;
  options: Array<{ id: string }>;
}

export interface AnswerDecision {
  accept: boolean;
  /** Question index to show after the confirmation, or null when the learner stays (final question). */
  advanceTo: number | null;
}

/**
 * Whether a click on an option registers, and where the flow goes afterwards.
 * Ignored while an advance is already pending (rapid or repeated clicks) and for an option that does not
 * belong to the question. The final question never advances: the learner submits it explicitly.
 */
export function planAnswer(question: AnswerableQuestion | undefined, optionId: string, index: number, total: number, pending: boolean): AnswerDecision {
  if (pending || !question || !question.options.some((option) => option.id === optionId)) return { accept: false, advanceTo: null };
  return { accept: true, advanceTo: index < total - 1 ? index + 1 : null };
}
