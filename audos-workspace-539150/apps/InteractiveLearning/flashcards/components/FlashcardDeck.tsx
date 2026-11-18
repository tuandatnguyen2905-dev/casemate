import React, { useId } from 'react';
import type { FlashcardDeckContent } from '../models';
import type { DeckStats } from '../review';
import { MasteryMeter } from './FlashcardProgress';

export interface FlashcardDeckProps {
  deck: FlashcardDeckContent;
  stats: DeckStats;
  onStudy: () => void;
  onReview: () => void;
}

/** Deck tile on the selection screen. */
export default function FlashcardDeck({ deck, stats, onStudy, onReview }: FlashcardDeckProps) {
  const titleId = useId();
  const empty = stats.total === 0;
  return (
    <li className="cmfc-deck" aria-labelledby={titleId} data-testid="flashcard-deck" data-deck-id={deck.deckId}>
      <h2 id={titleId} className="cmfc-deck-title">{deck.title}</h2>
      <p className="cmfc-deck-desc">{deck.description}</p>
      <p className="cmfc-deck-source">
        From {deck.industryLabel} · {deck.moduleLabel} · {deck.lessonTitle}
      </p>
      {empty ? (
        <p className="cmfc-deck-desc">This deck has no validated cards yet.</p>
      ) : (
        <>
          <ul className="cmfc-deck-stats" aria-label={`${deck.title} progress`}>
            <li><strong>{stats.total}</strong> cards</li>
            <li><strong>{stats.unseen}</strong> new</li>
            <li><strong>{stats.due}</strong> due</li>
            <li><strong>{stats.mastered}</strong> mastered</li>
          </ul>
          <MasteryMeter percent={stats.masteryPercent} label="Mastery" detail={`${stats.mastered} of ${stats.total}`} />
        </>
      )}
      <div className="cmfc-deck-actions">
        <button type="button" className="cmfc-btn cmfc-btn-primary" onClick={onStudy} disabled={empty} aria-label={`Study ${deck.title}`}>
          Study
        </button>
        <button type="button" className="cmfc-btn" onClick={onReview} disabled={empty} aria-label={`Review ${deck.title}, ${stats.due} due`}>
          Review{stats.due ? ` · ${stats.due} due` : ''}
        </button>
      </div>
    </li>
  );
}
