import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CardReviewState, FlashcardContent, FlashcardDeckContent, RecallRating as Rating } from '../models';
import { RECALL_RATINGS } from '../models';
import { flashcardType } from '../interactive';
import type { ReviewReason } from '../review';
import { REVIEW_REASON_LABEL } from '../review';
import { formatInterval, initialReviewState, previewIntervals } from '../scheduler';
import type { InteractionOutcome, SessionActivity } from '../sessionSummary';
import Flashcard from './Flashcard';
import FlashcardProgress from './FlashcardProgress';
import InteractiveFlashcard from './InteractiveFlashcard';
import type { AnswerAttempt } from './InteractiveFlashcard';
import RecallRating, { RATING_LABEL } from './RecallRating';
import { uiChapterLabel, uiInterval, uiRatedAnnouncement, uiRatedNote, uiText } from '../../../IndustryKnowledge/localization/uiText';

export type SessionMode = 'study' | 'review' | 'weak';

export interface SessionResult {
  /** Rating events this session, including a card rated again after Again. */
  tally: Record<Rating, number>;
  /** Queue length at the end, including cards shown again after Again. */
  total: number;
  /** Which cards were viewed and which were rated. Viewing alone is never a rating. */
  activity?: SessionActivity;
}

export interface FlashcardSessionProps {
  deck: FlashcardDeckContent;
  cards: FlashcardContent[];
  mode: SessionMode;
  reasons?: Record<string, ReviewReason>;
  states: Record<string, CardReviewState | undefined>;
  onRate: (card: FlashcardContent, rating: Rating) => void;
  onComplete: (result: SessionResult) => void;
  /** In review sessions a card rated Again is shown again later in the same session (default: review/weak only). */
  requeueAgain?: boolean;
  /** Source line for a card when the deck spans several lessons. */
  sourceLabelFor?: (card: FlashcardContent) => string | undefined;
}

/** How many extra times one card may come back after Again within a single session. */
export const MAX_REQUEUES_PER_CARD = 2;

const emptyTally = (): Record<Rating, number> => ({ again: 0, hard: 0, good: 0, easy: 0 });

/**
 * Previous, Next and Finish session never depend on a rating: skipping a card leaves it unrated, so the
 * scheduler never sees it. A rating is applied only when the learner picks one, then the next card shows.
 * MCQ and fill-in-the-blank cards do not flip: their answer appears once it is checked correctly or shown,
 * and checking an answer is recorded for the summary only, never as a rating.
 */
export default function FlashcardSession({ deck, cards, mode, reasons = {}, states, onRate, onComplete, requeueAgain = mode !== 'study', sourceLabelFor }: FlashcardSessionProps) {
  const byId = useMemo(() => new Map([...deck.cards, ...cards].map((card) => [card.cardId, card])), [deck, cards]);
  const chapters = useMemo(() => new Map(deck.chapters.map((chapter) => [chapter.chapterId, chapter])), [deck]);
  const [queue, setQueue] = useState<string[]>(() => cards.map((card) => card.cardId));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState<Record<number, Rating>>({});
  const [viewedCount, setViewedCount] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const ratedRef = useRef<Record<number, Rating>>({});
  const queueRef = useRef(queue);
  const tallyRef = useRef(emptyTally());
  const viewedRef = useRef<Set<string>>(new Set());
  const ratingsRef = useRef<Record<string, Rating>>({});
  const outcomesRef = useRef<Record<string, InteractionOutcome>>({});
  const requeues = useRef<Record<string, number>>({});
  const completed = useRef(false);

  const cardId = queue[index];
  const card = cardId ? byId.get(cardId) : undefined;
  const kind = card ? flashcardType(card) : 'classic';
  const interactive = kind !== 'classic';
  const ratedHere = rated[index];
  const reviewState = card ? states[card.cardId] ?? initialReviewState(card.cardId, card.deckId) : null;
  const intervals = reviewState ? previewIntervals(reviewState) : undefined;
  const isRepeat = queue.indexOf(cardId) < index;

  useEffect(() => {
    if (!cardId || viewedRef.current.has(cardId)) return;
    viewedRef.current.add(cardId);
    setViewedCount(viewedRef.current.size);
  }, [cardId]);

  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    const cardIds = Array.from(new Set(queueRef.current));
    const interactiveCardIds = cardIds.filter((id) => {
      const item = byId.get(id);
      return item ? flashcardType(item) !== 'classic' : false;
    });
    const activity: SessionActivity = {
      cardIds,
      viewed: Array.from(viewedRef.current),
      ratings: { ...ratingsRef.current },
      ...(interactiveCardIds.length ? { interactiveCardIds, interactions: { ...outcomesRef.current } } : {}),
    };
    onComplete({ tally: { ...tallyRef.current }, total: queueRef.current.length, activity });
  }, [onComplete, byId]);

  const toggleFlip = useCallback(() => setFlipped((value) => !value), []);
  const reveal = useCallback(() => setFlipped(true), []);

  const recordAttempt = useCallback((attempt: AnswerAttempt) => {
    if (!card || !interactive) return;
    const previous = outcomesRef.current[card.cardId];
    const attempts = (previous?.attempts ?? 0) + (attempt.shown ? 0 : 1);
    outcomesRef.current = {
      ...outcomesRef.current,
      [card.cardId]: {
        type: kind as InteractionOutcome['type'],
        attempts,
        correct: Boolean(previous?.correct) || attempt.correct,
        firstTryCorrect: previous ? previous.firstTryCorrect : attempt.correct && !attempt.shown,
        answerShown: Boolean(previous?.answerShown) || attempt.shown,
      },
    };
  }, [card, interactive, kind]);

  const goTo = useCallback((position: number) => {
    if (position < 0 || position >= queueRef.current.length) return;
    setIndex(position);
    setFlipped(false);
  }, []);

  const rate = useCallback(
    (rating: Rating) => {
      if (!card || !flipped || completed.current) return;
      // Ref-based guard: a second click or key press before re-render is ignored.
      if (ratedRef.current[index]) return;
      ratedRef.current = { ...ratedRef.current, [index]: rating };
      ratingsRef.current = { ...ratingsRef.current, [card.cardId]: rating };
      tallyRef.current = { ...tallyRef.current, [rating]: tallyRef.current[rating] + 1 };
      onRate(card, rating);

      let nextQueue = queueRef.current;
      const shownAgain = rating === 'again' && requeueAgain && (requeues.current[card.cardId] ?? 0) < MAX_REQUEUES_PER_CARD;
      if (shownAgain) {
        requeues.current[card.cardId] = (requeues.current[card.cardId] ?? 0) + 1;
        nextQueue = [...nextQueue, card.cardId];
        queueRef.current = nextQueue;
        setQueue(nextQueue);
      }
      setRated(ratedRef.current);
      const timing = intervals ? uiInterval(formatInterval(intervals[rating])) : '';
      setAnnouncement(uiRatedAnnouncement(uiText(RATING_LABEL[rating]), timing, shownAgain));
      // The next card in order, skipped or not; cards skipped earlier stay where they are and are never forced back.
      if (index + 1 >= nextQueue.length) {
        finish();
        return;
      }
      setIndex(index + 1);
      setFlipped(false);
    },
    [card, flipped, index, intervals, onRate, requeueAgain, finish],
  );

  const handlers = useRef({ toggleFlip, rate, goTo, index, flipped, ratedHere, interactive });
  handlers.current = { toggleFlip, rate, goTo, index, flipped, ratedHere, interactive };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) return;
      const onControl = Boolean(target?.closest?.('button, a[href], [role="button"], label, fieldset, form'));
      const current = handlers.current;
      switch (event.key) {
        case ' ':
        case 'Spacebar':
        case 'Enter':
          // A focused button (or the focused card itself) already handles Space/Enter. Interactive cards never flip.
          if (onControl || current.interactive) return;
          event.preventDefault();
          if (!event.repeat) current.toggleFlip();
          return;
        case 'ArrowLeft':
          event.preventDefault();
          current.goTo(current.index - 1);
          return;
        case 'ArrowRight':
          event.preventDefault();
          current.goTo(current.index + 1);
          return;
        case '1':
        case '2':
        case '3':
        case '4':
          if (!current.flipped || current.ratedHere) return;
          event.preventDefault();
          current.rate(RECALL_RATINGS[Number(event.key) - 1]);
          return;
        default:
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!card) {
    return (
      <section className="cmfc-panel" data-testid="session-empty">
        <h2 className="cmfc-panel-title">{uiText('No cards to show')}</h2>
        <p className="cmfc-panel-text">{uiText('This session has no cards.')}</p>
      </section>
    );
  }

  const chapter = chapters.get(card.chapterId);
  const sourceLabel = sourceLabelFor?.(card) ?? `${deck.industryLabel} · ${deck.lessonTitle}${chapter ? ` · ${uiChapterLabel(chapter.number, chapter.title)}` : ''}`;
  const ratedCount = Object.keys(ratingsRef.current).length;
  const isLast = index === queue.length - 1;
  const reasonText = isRepeat ? uiText('Shown again this session') : reasons[card.cardId] ? uiText(REVIEW_REASON_LABEL[reasons[card.cardId]]) : null;

  return (
    <div className="cmfc-session" data-testid="flashcard-session" data-mode={mode} data-card-type={kind}>
      <FlashcardProgress current={index + 1} total={queue.length} rated={ratedCount} viewed={viewedCount} />
      {reasonText && <p className="cmfc-reason">{reasonText}</p>}
      {interactive ? (
        <InteractiveFlashcard key={`${index}:${card.cardId}`} card={card} sourceLabel={sourceLabel} onReveal={reveal} onAttempt={recordAttempt} />
      ) : (
        <Flashcard card={card} flipped={flipped} onFlip={toggleFlip} sourceLabel={sourceLabel} />
      )}
      {!flipped && !interactive && (
        <div className="cmfc-reveal">
          <button type="button" className="cmfc-btn cmfc-btn-primary" onClick={toggleFlip} data-testid="reveal-answer">
            {uiText('Reveal answer')}
          </button>
        </div>
      )}
      {flipped && !ratedHere && (
        <>
          <RecallRating onRate={rate} intervals={intervals} />
          <p className="cmfc-rating-optional" data-testid="rating-optional">
            {uiText(interactive
              ? 'Checking an answer is not a rating. Rate your recall only if you want this card scheduled for review; Next moves on without it.'
              : 'Rating is optional. Use Next to move on without rating this card.')}
          </p>
        </>
      )}
      {ratedHere && (
        <p className="cmfc-rated-note" data-testid="rated-note">
          {uiRatedNote(uiText(RATING_LABEL[ratedHere]))}
        </p>
      )}
      <nav className="cmfc-nav" aria-label={uiText('Card navigation')}>
        <button type="button" className="cmfc-btn" onClick={() => goTo(index - 1)} disabled={index === 0} data-testid="session-previous">
          {uiText('Previous')}
        </button>
        {isLast ? (
          <button type="button" className="cmfc-btn cmfc-btn-primary" onClick={finish} data-testid="session-finish">
            {uiText('Finish session')}
          </button>
        ) : (
          <button type="button" className="cmfc-btn" onClick={() => goTo(index + 1)} data-testid="session-next">
            {uiText(interactive && !flipped ? 'Skip' : 'Next')}
          </button>
        )}
      </nav>
      <p className="cmfc-kbd-help" aria-hidden="true">
        {interactive
          ? <><kbd>←</kbd> <kbd>→</kbd> {uiText('move')} · <kbd>1</kbd>–<kbd>4</kbd> {uiText('rate after the answer shows (optional)')}</>
          : <><kbd>Space</kbd> {uiText('flip')} · <kbd>←</kbd> <kbd>→</kbd> {uiText('move')} · <kbd>1</kbd>–<kbd>4</kbd> {uiText('rate (optional)')}</>}
      </p>
      <p className="cmfc-visually-hidden" aria-live="polite" data-testid="session-announcement">{announcement}</p>
    </div>
  );
}
