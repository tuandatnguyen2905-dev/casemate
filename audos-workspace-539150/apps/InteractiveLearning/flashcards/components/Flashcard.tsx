import React, { useEffect, useId, useRef } from 'react';
import type { FlashcardContent } from '../models';
import { uiCardAria, uiText } from '../../../IndustryKnowledge/localization/uiText';

export interface FlashcardProps {
  card: FlashcardContent;
  flipped: boolean;
  onFlip: () => void;
  /** e.g. "Commercial Banking · 1.1 Industry Definition & Scope · Chapter 2". */
  sourceLabel?: string;
}

/** Anything interactive placed on a card keeps its own behaviour and never flips it. */
const CONTROL_SELECTOR = 'button, a[href], input, select, textarea, label, summary, [contenteditable="true"], [data-no-flip]';

const selectingText = () => {
  try {
    return typeof window !== 'undefined' && String(window.getSelection?.() ?? '').trim().length > 0;
  } catch {
    return false;
  }
};

/**
 * One card, one control: clicking or tapping anywhere on it (or Enter / Space while it has focus) turns it
 * over, and the same again turns it back. The answer is not rendered at all until the card is flipped, so it
 * is neither visible nor exposed to assistive technology beforehand. The card holds no nested controls.
 */
export default function Flashcard({ card, flipped, onFlip, sourceLabel }: FlashcardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFlipped = useRef(flipped);
  const lastCard = useRef(card.cardId);
  const detailId = useId();

  useEffect(() => {
    const flipChanged = lastFlipped.current !== flipped && lastCard.current === card.cardId;
    lastFlipped.current = flipped;
    lastCard.current = card.cardId;
    if (flipChanged) {
      cardRef.current?.focus({ preventScroll: true });
      return;
    }
    // A new card replaced the one that held focus (e.g. after rating): keep keyboard users on the card.
    const active = typeof document === 'undefined' ? null : document.activeElement;
    if (!active || active === document.body) cardRef.current?.focus({ preventScroll: true });
  }, [flipped, card.cardId]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const control = (event.target as HTMLElement | null)?.closest?.(CONTROL_SELECTOR);
    if (control && control !== event.currentTarget && event.currentTarget.contains(control)) return;
    if (selectingText()) return;
    onFlip();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== ' ' && event.key !== 'Spacebar' && event.key !== 'Enter') return;
    event.preventDefault();
    if (!event.repeat) onFlip();
  };

  const face = flipped ? 'answer' : 'question';
  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      className={`cmfc-card cmfc-card--${face} ${flipped ? 'cmfc-card-back' : 'cmfc-card-front'}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={uiCardAria(flipped, flipped ? card.back : card.front)}
      aria-describedby={flipped ? detailId : undefined}
      data-testid={flipped ? 'flashcard-back' : 'flashcard-front'}
      data-card-id={card.cardId}
      data-face={face}
    >
      {flipped ? (
        <div key="answer" className="cmfc-face cmfc-face--answer cmfc-animate">
          <p className="cmfc-face-label">{uiText('Answer')}</p>
          <p className="cmfc-detail-text cmfc-small" style={{ marginBottom: 10 }}>{card.front}</p>
          <p className="cmfc-answer">{card.back}</p>
          <div id={detailId}>
            <div className="cmfc-detail">
              <p className="cmfc-detail-label">{uiText('Explanation')}</p>
              <p className="cmfc-detail-text">{card.explanation}</p>
            </div>
            {card.practicalExample.trim() ? (
              <div className="cmfc-detail">
                <p className="cmfc-detail-label">{uiText('Practical example')}</p>
                <p className="cmfc-detail-text">{card.practicalExample}</p>
              </div>
            ) : null}
            {card.keyTerms.length > 0 && <p className="cmfc-source">{uiText('Key terms')}: {card.keyTerms.join(' · ')}</p>}
            {sourceLabel && <p className="cmfc-source">{uiText('Source')}: {sourceLabel}</p>}
          </div>
          <p className="cmfc-hint" aria-hidden="true">{uiText('Tap the card or press Space to see the question again')}</p>
        </div>
      ) : (
        <div key="question" className="cmfc-face cmfc-face--question cmfc-animate">
          <span className="cmfc-face-label">{uiText('Question')}</span>
          <span className="cmfc-prompt">{card.front}</span>
          <span className="cmfc-hint" aria-hidden="true">{uiText('Tap the card or press Space to reveal the answer')}</span>
        </div>
      )}
    </div>
  );
}
