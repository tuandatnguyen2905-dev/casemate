// SM-2-lite spaced-review scheduler. Pure and deterministic: every function takes `now` (ms) from
// the caller, so a fixed clock gives identical results on every run. No ML, no network.
//
// Algorithm (documented in README.md):
// - Again: lapse counted if the card had at least one successful recall; ease -0.20; repetitions
//   reset; due again in RELEARN_MINUTES; state becomes `learning` (a mastered card is demoted).
// - Hard / Good / Easy on a card with no current streak use FIRST_INTERVAL_DAYS (1 / 2 / 4 days).
// - With a streak, from the previous interval I and the ease E before this rating:
//     Hard = max(I + 1, round(I × 1.2))                     small growth, ease -0.15
//     Good = max(Hard + 1, round(I × E))                    normal growth, ease unchanged
//     Easy = max(Good + 1, round(I × E × EASY_BONUS))      larger growth, ease +0.15
// - Ease is clamped to [MIN_EASE, MAX_EASE]; intervals are capped at MAX_INTERVAL_DAYS.
// - State is `mastered` while the interval is at least MASTERY_INTERVAL_DAYS, else `learning`.

import type { CardLearningState, CardReviewState, Clock, RecallRating, ReviewEvent } from './models';

export const DAY_MS = 86_400_000;
export const MINUTE_MS = 60_000;
export const INITIAL_EASE = 2.5;
export const MIN_EASE = 1.3;
export const MAX_EASE = 3.0;
export const RELEARN_MINUTES = 10;
export const FIRST_INTERVAL_DAYS: Record<Exclude<RecallRating, 'again'>, number> = { hard: 1, good: 2, easy: 4 };
export const HARD_MULTIPLIER = 1.2;
export const EASY_BONUS = 1.3;
export const EASE_DELTA: Record<RecallRating, number> = { again: -0.2, hard: -0.15, good: 0, easy: 0.15 };
export const RATING_SCORE: Record<RecallRating, number> = { again: 0, hard: 0.4, good: 0.75, easy: 1 };
export const MASTERY_INTERVAL_DAYS = 21;
export const MAX_INTERVAL_DAYS = 365;
export const HISTORY_LIMIT = 50;

export const systemClock: Clock = () => Date.now();

/** A controllable clock for tests and demos. */
export function createManualClock(start: number | string | Date) {
  let current = typeof start === 'number' ? start : new Date(start).getTime();
  const clock = (() => current) as Clock & {
    advance: (ms: number) => number;
    advanceDays: (days: number) => number;
    set: (value: number | string | Date) => number;
  };
  clock.advance = (ms) => (current += ms);
  clock.advanceDays = (days) => (current += days * DAY_MS);
  clock.set = (value) => (current = typeof value === 'number' ? value : new Date(value).getTime());
  return clock;
}

const round2 = (value: number) => Math.round(value * 100) / 100;
const clampEase = (value: number) => round2(Math.min(MAX_EASE, Math.max(MIN_EASE, value)));
const iso = (ms: number) => new Date(ms).toISOString();

export function initialReviewState(cardId: string, deckId: string): CardReviewState {
  return {
    cardId,
    deckId,
    state: 'unseen',
    confidence: 0,
    schedule: { dueAt: null, intervalDays: 0, ease: INITIAL_EASE, lapses: 0, repetitions: 0 },
    lastReviewedAt: null,
    reviewHistory: [],
  };
}

/** Interval in days each rating would produce right now. Used for button hints and by applyRating. */
export function previewIntervals(state: CardReviewState): Record<RecallRating, number> {
  const { repetitions, intervalDays, ease } = state.schedule;
  const again = RELEARN_MINUTES / (24 * 60);
  if (repetitions <= 0) return { again, ...FIRST_INTERVAL_DAYS };
  const previous = Math.max(1, intervalDays);
  const hard = Math.min(MAX_INTERVAL_DAYS, Math.max(previous + 1, Math.round(previous * HARD_MULTIPLIER)));
  const good = Math.min(MAX_INTERVAL_DAYS, Math.max(hard + 1, Math.round(previous * ease)));
  const easy = Math.min(MAX_INTERVAL_DAYS, Math.max(good + 1, Math.round(previous * ease * EASY_BONUS)));
  return { again, hard, good, easy };
}

export function stateForInterval(intervalDays: number): CardLearningState {
  return intervalDays >= MASTERY_INTERVAL_DAYS ? 'mastered' : 'learning';
}

/** Returns the next review state. Never mutates `previous`. */
export function applyRating(previous: CardReviewState, rating: RecallRating, now: number): CardReviewState {
  const { schedule } = previous;
  const intervals = previewIntervals(previous);
  const intervalDays = intervals[rating];
  const isAgain = rating === 'again';
  const lapses = schedule.lapses + (isAgain && schedule.repetitions > 0 ? 1 : 0);
  const repetitions = isAgain ? 0 : schedule.repetitions + 1;
  const dueMs = now + (isAgain ? RELEARN_MINUTES * MINUTE_MS : intervalDays * DAY_MS);
  const nextState: CardLearningState = isAgain ? 'learning' : stateForInterval(intervalDays);
  const event: ReviewEvent = {
    at: iso(now),
    rating,
    previousState: previous.state,
    nextState,
    intervalDays: round2(intervalDays),
    dueAt: iso(dueMs),
  };
  return {
    ...previous,
    state: nextState,
    confidence: round2(previous.confidence * 0.5 + RATING_SCORE[rating] * 0.5),
    schedule: {
      dueAt: iso(dueMs),
      intervalDays: round2(intervalDays),
      ease: clampEase(schedule.ease + EASE_DELTA[rating]),
      lapses,
      repetitions,
    },
    lastReviewedAt: iso(now),
    reviewHistory: [...previous.reviewHistory, event].slice(-HISTORY_LIMIT),
  };
}

export function lastRating(state: CardReviewState | undefined): RecallRating | null {
  const history = state?.reviewHistory ?? [];
  return history.length ? history[history.length - 1].rating : null;
}

export function isSeen(state: CardReviewState | undefined): state is CardReviewState {
  return Boolean(state && state.state !== 'unseen');
}

export function isDue(state: CardReviewState | undefined, now: number): boolean {
  if (!isSeen(state) || !state.schedule.dueAt) return false;
  return new Date(state.schedule.dueAt).getTime() <= now;
}

/**
 * A weak card is one the learner has struggled with and not yet mastered: last rated Again or
 * Hard, has lapsed, or still carries an ease penalty.
 */
export function isWeak(state: CardReviewState | undefined): boolean {
  if (!isSeen(state) || state.state === 'mastered') return false;
  const last = lastRating(state);
  return last === 'again' || last === 'hard' || state.schedule.lapses > 0 || state.schedule.ease < INITIAL_EASE;
}

export function formatInterval(days: number): string {
  if (days < 1) {
    const minutes = Math.max(1, Math.round(days * 24 * 60));
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.round(minutes / 60);
    return `${hours} hr`;
  }
  const whole = Math.round(days);
  if (whole < 31) return `${whole} day${whole === 1 ? '' : 's'}`;
  const months = Math.round(whole / 30);
  return `${months} mo`;
}

export function formatDueFromNow(dueAt: string | null, now: number): string {
  if (!dueAt) return 'not scheduled';
  const delta = new Date(dueAt).getTime() - now;
  if (delta <= 0) return 'now';
  return `in ${formatInterval(delta / DAY_MS)}`;
}
