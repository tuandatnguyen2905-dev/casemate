import type { CardReviewState, RecallRating } from '../models';
import {
  DAY_MS,
  HISTORY_LIMIT,
  INITIAL_EASE,
  MASTERY_INTERVAL_DAYS,
  MAX_EASE,
  MINUTE_MS,
  MIN_EASE,
  RELEARN_MINUTES,
  applyRating,
  createManualClock,
  formatInterval,
  initialReviewState,
  isDue,
  isWeak,
  previewIntervals,
} from '../scheduler';
import { assert, assertClose, assertEqual, createSuite } from './harness';

const suite = createSuite('scheduler (SM-2-lite, controlled clock)');
const T0 = Date.parse('2026-11-07T09:00:00.000Z');
const fresh = () => initialReviewState('card-a', 'deck-a');
const rateSeq = (ratings: RecallRating[], start = T0, gapDays?: number) => {
  let state = fresh();
  let now = start;
  for (const rating of ratings) {
    state = applyRating(state, rating, now);
    now = gapDays === undefined ? new Date(state.schedule.dueAt as string).getTime() : now + gapDays * DAY_MS;
  }
  return state;
};

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

suite.test('a new card is unseen, unscheduled and never due', () => {
  const state = fresh();
  assertEqual(state.state, 'unseen', 'initial state');
  assertEqual(state.schedule, { dueAt: null, intervalDays: 0, ease: INITIAL_EASE, lapses: 0, repetitions: 0 }, 'initial schedule');
  assert(!isDue(state, T0 + 365 * DAY_MS), 'unseen card must not be due');
});

suite.test('first ratings: Again 10 min, Hard 1 day, Good 2 days, Easy 4 days (exact due times)', () => {
  const expected: Record<RecallRating, number> = { again: RELEARN_MINUTES * MINUTE_MS, hard: DAY_MS, good: 2 * DAY_MS, easy: 4 * DAY_MS };
  (Object.keys(expected) as RecallRating[]).forEach((rating) => {
    const next = applyRating(fresh(), rating, T0);
    assertEqual(next.schedule.dueAt, new Date(T0 + expected[rating]).toISOString(), `${rating} due time`);
    assertEqual(next.lastReviewedAt, new Date(T0).toISOString(), `${rating} lastReviewedAt`);
    assertEqual(next.state, 'learning', `${rating} moves an unseen card to learning`);
  });
});

suite.test('each rating moves ease as documented and Again is the only one that resets the streak', () => {
  assertClose(applyRating(fresh(), 'again', T0).schedule.ease, 2.3, 'Again ease penalty');
  assertClose(applyRating(fresh(), 'hard', T0).schedule.ease, 2.35, 'Hard ease penalty');
  assertClose(applyRating(fresh(), 'good', T0).schedule.ease, 2.5, 'Good keeps ease');
  assertClose(applyRating(fresh(), 'easy', T0).schedule.ease, 2.65, 'Easy ease bonus');
  assertEqual(applyRating(fresh(), 'again', T0).schedule.repetitions, 0, 'Again resets repetitions');
  assertEqual(applyRating(fresh(), 'good', T0).schedule.repetitions, 1, 'Good counts a repetition');
});

suite.test('Good growth is deterministic: 2 → 5 → 13 → 33 days, mastered from the fourth Good', () => {
  const intervals: number[] = [];
  const states: string[] = [];
  let state = fresh();
  let now = T0;
  for (let i = 0; i < 4; i += 1) {
    state = applyRating(state, 'good', now);
    intervals.push(state.schedule.intervalDays);
    states.push(state.state);
    now = new Date(state.schedule.dueAt as string).getTime();
  }
  assertEqual(intervals, [2, 5, 13, 33], 'Good intervals');
  assertEqual(states, ['learning', 'learning', 'learning', 'mastered'], 'state follows the 21-day mastery threshold');
  assert(MASTERY_INTERVAL_DAYS === 21, 'mastery threshold is 21 days');
  const again = rateSeq(['good', 'good', 'good', 'good']);
  assertEqual(again, state, 'identical inputs give identical outputs');
});

suite.test('Hard < Good < Easy for every reachable state', () => {
  const histories: RecallRating[][] = [[], ['good'], ['good', 'good'], ['easy', 'easy'], ['hard', 'hard', 'hard'], ['again', 'good'], ['good', 'again', 'hard']];
  histories.forEach((history) => {
    const preview = previewIntervals(rateSeq(history));
    assert(preview.again < preview.hard && preview.hard < preview.good && preview.good < preview.easy, `ordering after [${history.join(',')}]: ${JSON.stringify(preview)}`);
  });
});

suite.test('Hard is small growth, Easy is larger growth than Good', () => {
  const base = rateSeq(['good', 'good']);
  assertEqual(base.schedule.intervalDays, 5, 'base interval');
  assertEqual(applyRating(base, 'hard', T0).schedule.intervalDays, 6, 'Hard = max(I + 1, round(I × 1.2))');
  assertEqual(applyRating(base, 'good', T0).schedule.intervalDays, 13, 'Good = round(I × ease)');
  assertEqual(applyRating(base, 'easy', T0).schedule.intervalDays, 16, 'Easy = round(I × ease × 1.3)');
});

suite.test('a lapse demotes a mastered card, counts a lapse and schedules a 10-minute relearn', () => {
  const mastered = rateSeq(['good', 'good', 'good', 'good']);
  assertEqual(mastered.state, 'mastered', 'precondition');
  const now = T0 + 100 * DAY_MS;
  const lapsed = applyRating(mastered, 'again', now);
  assertEqual(lapsed.state, 'learning', 'demoted');
  assertEqual(lapsed.schedule.lapses, 1, 'lapse counted');
  assertEqual(lapsed.schedule.repetitions, 0, 'streak reset');
  assertEqual(lapsed.schedule.dueAt, new Date(now + 10 * MINUTE_MS).toISOString(), 'relearn due time');
  assertEqual(lapsed.reviewHistory[lapsed.reviewHistory.length - 1].previousState, 'mastered', 'history records the demotion');
  assertEqual(applyRating(lapsed, 'good', now).schedule.intervalDays, 2, 'relearning restarts at the first Good interval');
});

suite.test('Again on a never-recalled card is an ease penalty but not a lapse', () => {
  const state = applyRating(fresh(), 'again', T0);
  assertEqual(state.schedule.lapses, 0, 'no lapse');
  assertEqual(applyRating(state, 'again', T0).schedule.lapses, 0, 'still no lapse');
});

suite.test('ease is clamped to [1.3, 3.0]', () => {
  let low = fresh();
  for (let i = 0; i < 20; i += 1) low = applyRating(low, 'again', T0);
  assertEqual(low.schedule.ease, MIN_EASE, 'minimum ease');
  let high = fresh();
  for (let i = 0; i < 20; i += 1) high = applyRating(high, 'easy', T0);
  assertEqual(high.schedule.ease, MAX_EASE, 'maximum ease');
  assert(high.schedule.intervalDays <= 365, 'interval cap');
});

suite.test('applyRating is pure: it never mutates the previous state', () => {
  const previous = deepFreeze(rateSeq(['good', 'hard']));
  const copy = JSON.stringify(previous);
  applyRating(previous as CardReviewState, 'easy', T0);
  assertEqual(JSON.stringify(previous), copy, 'previous unchanged');
});

suite.test('previewIntervals matches the interval applyRating schedules', () => {
  const state = rateSeq(['good', 'easy']);
  const preview = previewIntervals(state);
  (['hard', 'good', 'easy'] as RecallRating[]).forEach((rating) => {
    assertEqual(applyRating(state, rating, T0).schedule.intervalDays, preview[rating], `${rating} preview`);
  });
});

suite.test('review history records every rating and is capped', () => {
  let state = fresh();
  for (let i = 0; i < HISTORY_LIMIT + 10; i += 1) state = applyRating(state, i % 2 ? 'good' : 'hard', T0 + i * DAY_MS);
  assertEqual(state.reviewHistory.length, HISTORY_LIMIT, 'capped history');
  assertEqual(state.reviewHistory[HISTORY_LIMIT - 1].at, new Date(T0 + (HISTORY_LIMIT + 9) * DAY_MS).toISOString(), 'latest event kept');
});

suite.test('isDue and isWeak follow the controlled clock', () => {
  const clock = createManualClock('2026-11-07T09:00:00.000Z');
  const state = applyRating(fresh(), 'again', clock());
  assert(!isDue(state, clock()), 'not due immediately');
  clock.advance(10 * MINUTE_MS);
  assert(isDue(state, clock()), 'due after relearn step');
  assert(isWeak(state), 'Again makes a card weak');
  assert(!isWeak(rateSeq(['good', 'good', 'good', 'good'])), 'mastered card is not weak');
  assert(!isWeak(applyRating(fresh(), 'good', T0)), 'a clean Good is not weak');
  clock.advanceDays(1);
  assertEqual(clock(), T0 + 10 * MINUTE_MS + DAY_MS, 'manual clock advances deterministically');
});

suite.test('confidence is a moving average of ratings', () => {
  const state = rateSeq(['easy', 'good']);
  assertClose(state.confidence, 0.63, 'confidence after Easy then Good', 0.001);
  assertClose(applyRating(state, 'again', T0).confidence, 0.315, 'Again halves confidence', 0.006);
});

suite.test('interval labels are readable', () => {
  assertEqual(formatInterval(10 / 1440), '10 min', 'minutes');
  assertEqual(formatInterval(1), '1 day', 'one day');
  assertEqual(formatInterval(13), '13 days', 'days');
  assertEqual(formatInterval(90), '3 mo', 'months');
});

export const completed = suite.run();
