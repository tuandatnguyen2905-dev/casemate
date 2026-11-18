import { useCallback, useRef, useState } from 'react';
import type { CardReviewState, Clock, FlashcardContent, FlashcardStoreSnapshot, RecallRating } from './models';
import type { FlashcardPersistenceAdapter } from './persistence';
import { applyRating, initialReviewState } from './scheduler';

export interface FlashcardReviews {
  states: Record<string, CardReviewState>;
  stateFor: (card: FlashcardContent) => CardReviewState;
  /** Applies one rating, persists it and returns the new state. */
  rate: (card: FlashcardContent, rating: RecallRating) => CardReviewState;
}

export function useFlashcardReviews(adapter: FlashcardPersistenceAdapter, clock: Clock): FlashcardReviews {
  const [snapshot, setSnapshot] = useState<FlashcardStoreSnapshot>(() => adapter.load());
  const latest = useRef(snapshot);

  const stateFor = useCallback(
    (card: FlashcardContent) => latest.current.cards[card.cardId] ?? initialReviewState(card.cardId, card.deckId),
    [],
  );

  const rate = useCallback(
    (card: FlashcardContent, rating: RecallRating) => {
      const now = clock();
      const current = latest.current.cards[card.cardId] ?? initialReviewState(card.cardId, card.deckId);
      const next = applyRating(current, rating, now);
      const updated: FlashcardStoreSnapshot = {
        ...latest.current,
        cards: { ...latest.current.cards, [card.cardId]: next },
        updatedAt: new Date(now).toISOString(),
      };
      latest.current = updated;
      adapter.save(updated);
      setSnapshot(updated);
      return next;
    },
    [adapter, clock],
  );

  return { states: snapshot.cards, stateFor, rate };
}
