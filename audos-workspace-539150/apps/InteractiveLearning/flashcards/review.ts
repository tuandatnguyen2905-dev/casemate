// Pure queue and progress helpers. Flashcard progress is informational only: nothing here reads or
// writes chapter locks, Knowledge Check scores or lesson completion.

import type { CardReviewState, FlashcardContent, FlashcardDeckContent } from './models';
import { isDue, isSeen, isWeak, lastRating } from './scheduler';

export type ReviewReason = 'forgotten' | 'difficult' | 'due' | 'weak';

export const REVIEW_REASON_LABEL: Record<ReviewReason, string> = {
  forgotten: 'Forgotten last time',
  difficult: 'Difficult card',
  due: 'Due for review',
  weak: 'Weak concept',
};

export type ReviewStates = Record<string, CardReviewState | undefined>;

export interface ReviewQueue {
  cards: FlashcardContent[];
  reasons: Record<string, ReviewReason>;
}

export interface DeckStats {
  total: number;
  unseen: number;
  learning: number;
  mastered: number;
  due: number;
  weak: number;
  masteryPercent: number;
  /** Earliest future due time among seen cards, or null. */
  nextDueAt: string | null;
}

/** Study Mode walks the whole deck in authored order. */
export function buildStudyQueue(deck: FlashcardDeckContent): FlashcardContent[] {
  return [...deck.cards];
}

/**
 * A Study session of at most `limit` cards from the study queue: cards not studied yet first, then
 * cards still being learned, then mastered ones, each group in authored order.
 */
export function buildStudySession(deck: FlashcardDeckContent, states: ReviewStates, limit: number): FlashcardContent[] {
  const queue = buildStudyQueue(deck);
  const rank = (card: FlashcardContent) => {
    const state = states[card.cardId];
    if (!isSeen(state)) return 0;
    return state.state === 'mastered' ? 2 : 1;
  };
  return [0, 1, 2].flatMap((tier) => queue.filter((card) => rank(card) === tier)).slice(0, Math.max(1, Math.trunc(limit)));
}

function priorityTier(state: CardReviewState | undefined): number {
  if (lastRating(state) === 'again') return 0;
  if (isWeak(state)) return 1;
  return 2;
}

function compareByPriority(deck: FlashcardDeckContent, states: ReviewStates) {
  const order = new Map(deck.cards.map((card, index) => [card.cardId, index]));
  return (left: FlashcardContent, right: FlashcardContent) => {
    const a = states[left.cardId];
    const b = states[right.cardId];
    const tier = priorityTier(a) - priorityTier(b);
    if (tier) return tier;
    const ease = (a?.schedule.ease ?? 0) - (b?.schedule.ease ?? 0);
    if (ease) return ease;
    const due = new Date(a?.schedule.dueAt ?? 0).getTime() - new Date(b?.schedule.dueAt ?? 0).getTime();
    if (due) return due;
    return (order.get(left.cardId) ?? 0) - (order.get(right.cardId) ?? 0);
  };
}

/**
 * Review Mode: due cards only, forgotten first, then difficult (lowest ease first), then the most
 * overdue. Unseen cards are never "due"; they are introduced through Study Mode.
 */
export function buildReviewQueue(deck: FlashcardDeckContent, states: ReviewStates, now: number): ReviewQueue {
  const due = deck.cards.filter((card) => isDue(states[card.cardId], now));
  const cards = due.sort(compareByPriority(deck, states));
  const reasons: Record<string, ReviewReason> = {};
  cards.forEach((card) => {
    const tier = priorityTier(states[card.cardId]);
    reasons[card.cardId] = tier === 0 ? 'forgotten' : tier === 1 ? 'difficult' : 'due';
  });
  return { cards, reasons };
}

/** "Retry weak concepts": every weak card, due or not, weakest first. */
export function buildWeakQueue(deck: FlashcardDeckContent, states: ReviewStates): ReviewQueue {
  const cards = deck.cards.filter((card) => isWeak(states[card.cardId])).sort(compareByPriority(deck, states));
  const reasons: Record<string, ReviewReason> = {};
  cards.forEach((card) => {
    reasons[card.cardId] = lastRating(states[card.cardId]) === 'again' ? 'forgotten' : 'weak';
  });
  return { cards, reasons };
}

export function deckStats(deck: FlashcardDeckContent, states: ReviewStates, now: number): DeckStats {
  let unseen = 0;
  let learning = 0;
  let mastered = 0;
  let due = 0;
  let weak = 0;
  let nextDue: number | null = null;
  deck.cards.forEach((card) => {
    const state = states[card.cardId];
    if (!isSeen(state)) {
      unseen += 1;
      return;
    }
    if (state.state === 'mastered') mastered += 1;
    else learning += 1;
    if (isDue(state, now)) due += 1;
    else if (state.schedule.dueAt) {
      const at = new Date(state.schedule.dueAt).getTime();
      if (nextDue === null || at < nextDue) nextDue = at;
    }
    if (isWeak(state)) weak += 1;
  });
  const total = deck.cards.length;
  return {
    total,
    unseen,
    learning,
    mastered,
    due,
    weak,
    masteryPercent: total ? Math.round((mastered / total) * 100) : 0,
    nextDueAt: nextDue === null ? null : new Date(nextDue).toISOString(),
  };
}
