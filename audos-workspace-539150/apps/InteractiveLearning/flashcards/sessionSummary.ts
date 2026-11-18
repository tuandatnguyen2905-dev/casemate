// What a learner did in one flashcard session. Viewing, rating and mastery are separate states:
// - viewed: the card was on screen (session only, never persisted);
// - rated: the learner chose Again / Hard / Good / Easy, which is the only thing the scheduler records;
// - mastered: derived by the scheduler from review history (see scheduler.ts), never from this file.
// A card that was only viewed is never counted as recalled, remembered or mastered.
// MCQ and fill-in-the-blank answer checks are a fourth, separate record: a correct answer is neither a
// rating nor mastery, and it is kept for the session summary only (never persisted).

import type { RecallRating } from './models';
import { RECALL_RATINGS } from './models';

/** One interactive card's answer checks in this session. */
export interface InteractionOutcome {
  type: 'mcq' | 'fill_blank';
  /** Answers checked (Show answer is not an attempt). */
  attempts: number;
  /** At least one checked answer was right. */
  correct: boolean;
  /** The first checked answer was right, before any retry or Show answer. */
  firstTryCorrect: boolean;
  /** The learner asked to see the answer. */
  answerShown: boolean;
}

export interface SessionActivity {
  /** Unique cards in the session, in queue order. */
  cardIds: string[];
  /** Cards that were on screen at least once. */
  viewed: string[];
  /** Latest rating given to each card in this session; cards that were never rated are absent. */
  ratings: Record<string, RecallRating>;
  /** MCQ and fill-in-the-blank cards in the session; absent when there were none. */
  interactiveCardIds?: string[];
  /** Answer checks per interactive card; cards never answered or shown are absent. */
  interactions?: Record<string, InteractionOutcome>;
}

export interface AnswerCheckSummary {
  /** Interactive cards in the session. */
  cards: number;
  /** Cards with at least one checked answer. */
  attempted: number;
  /** Cards answered correctly at some point (including after a retry). */
  correct: number;
  /** Cards answered correctly on the first check. */
  firstTry: number;
  /** Cards whose answer was shown on request. */
  shown: number;
  /** Cards neither answered nor shown. */
  skipped: number;
}

export interface SessionSummary {
  cards: number;
  viewed: number;
  rated: number;
  /** Cards in the session without a rating, whether skipped or never reached. */
  unrated: number;
  /** Latest rating per rated card, so the four counts always add up to `rated`. */
  byRating: Record<RecallRating, number>;
  /** Rated Good or Easy. */
  remembered: number;
  /** Rated Again or Hard. */
  difficult: number;
  difficultCardIds: string[];
  /** Present only when the session held MCQ or fill-in-the-blank cards. */
  answerChecks?: AnswerCheckSummary;
}

function answerChecks(activity: SessionActivity, inSession: Set<string>): AnswerCheckSummary | undefined {
  const ids = Array.from(new Set(activity.interactiveCardIds ?? [])).filter((cardId) => inSession.has(cardId));
  if (!ids.length) return undefined;
  const outcomes = ids.map((cardId) => activity.interactions?.[cardId]).filter((outcome): outcome is InteractionOutcome => Boolean(outcome));
  return {
    cards: ids.length,
    attempted: outcomes.filter((outcome) => outcome.attempts > 0).length,
    correct: outcomes.filter((outcome) => outcome.correct).length,
    firstTry: outcomes.filter((outcome) => outcome.firstTryCorrect).length,
    shown: outcomes.filter((outcome) => outcome.answerShown).length,
    skipped: ids.length - outcomes.length,
  };
}

export function summariseSession(activity: SessionActivity): SessionSummary {
  const cardIds = Array.from(new Set(activity.cardIds));
  const inSession = new Set(cardIds);
  const rated = cardIds.filter((cardId) => RECALL_RATINGS.includes(activity.ratings[cardId]));
  // Rating needs the answer on screen, so a rated card always counts as viewed.
  const viewed = new Set([...activity.viewed.filter((cardId) => inSession.has(cardId)), ...rated]);
  const byRating = Object.fromEntries(RECALL_RATINGS.map((rating) => [rating, 0])) as Record<RecallRating, number>;
  rated.forEach((cardId) => { byRating[activity.ratings[cardId]] += 1; });
  const difficultCardIds = rated.filter((cardId) => activity.ratings[cardId] === 'again' || activity.ratings[cardId] === 'hard');
  const checks = answerChecks(activity, inSession);
  return {
    cards: cardIds.length,
    viewed: viewed.size,
    rated: rated.length,
    unrated: cardIds.length - rated.length,
    byRating,
    remembered: byRating.good + byRating.easy,
    difficult: difficultCardIds.length,
    difficultCardIds,
    ...(checks ? { answerChecks: checks } : {}),
  };
}

/** Summary for a result recorded without activity (older callers): every queued card counts as viewed. */
export function summaryFromTally(tally: Record<RecallRating, number>, total: number): SessionSummary {
  const rated = Math.min(total, RECALL_RATINGS.reduce((sum, rating) => sum + tally[rating], 0));
  return {
    cards: total,
    viewed: total,
    rated,
    unrated: total - rated,
    byRating: { ...tally },
    remembered: tally.good + tally.easy,
    difficult: tally.again + tally.hard,
    difficultCardIds: [],
  };
}
