import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { CardReviewState, Clock, FlashcardContent, FlashcardDeckContent } from '../models';
import { FLASHCARD_DECKS, validateDeck } from '../decks';
import type { FlashcardPersistenceAdapter } from '../persistence';
import { createLocalStorageAdapter } from '../persistence';
import type { DeckStats, ReviewQueue, ReviewReason } from '../review';
import { buildReviewQueue, buildStudyQueue, buildStudySession, buildWeakQueue, deckStats } from '../review';
import { formatDueFromNow, isSeen, systemClock } from '../scheduler';
import { summariseSession } from '../sessionSummary';
import { FLASHCARD_CSS, FLASHCARD_STYLE_ID } from '../styles';
import { useFlashcardReviews } from '../useFlashcardReviews';
import FlashcardDeck from './FlashcardDeck';
import type { SessionMode, SessionResult } from './FlashcardSession';
import FlashcardSession from './FlashcardSession';
import ReviewSummary from './ReviewSummary';
import type { SummaryLessonActions } from './ReviewSummary';

/** What a host overview needs to show progress and start sessions for its single deck. */
export interface FlashcardOverviewApi {
  deck: FlashcardDeckContent;
  stats: DeckStats;
  states: Record<string, CardReviewState>;
  now: number;
  /** Cards per session, or null when sessions take the whole queue. */
  sessionLimit: number | null;
  startStudy: () => void;
  startReview: () => void;
  startWeak: () => void;
}

export interface SmartFlashcardsProps {
  decks?: FlashcardDeckContent[];
  /** Defaults to feature-scoped localStorage with an in-memory fallback. */
  adapter?: FlashcardPersistenceAdapter;
  clock?: Clock;
  /** Optional learner scope for the default adapter's storage key. */
  learnerKey?: string;
  /** Rendered above the deck list (used by the demo for its controls). */
  toolbar?: React.ReactNode;
  /** Inside a host surface (Practice & Review): no standalone header or page padding. */
  embedded?: boolean;
  /** Label of the control that returns to the deck list. */
  backLabel?: string;
  /** Called when a session, summary or empty-review screen opens (true) or the deck list returns (false). */
  onViewChange?: (inSession: boolean) => void;
  /** Replaces the deck list with the host's overview of `decks[0]`. */
  renderOverview?: (api: FlashcardOverviewApi) => React.ReactNode;
  /** Caps Study, Review and weak-concept sessions; Study then takes cards not yet studied first. */
  sessionLimit?: number;
  /** The host already validated the cards (a scope deck combines several validated lesson decks). */
  prevalidated?: boolean;
  /** Source line for a card when one deck spans several lessons. */
  sourceLabelFor?: (card: FlashcardContent) => string | undefined;
  /** Continue Learning and Return to Lesson on the Session Complete screen, resolved by the host. */
  lessonActions?: SummaryLessonActions;
}

type View =
  | { name: 'decks' }
  | { name: 'session'; deckId: string; mode: SessionMode; cards: FlashcardContent[]; reasons: Record<string, ReviewReason>; run: number }
  | { name: 'summary'; deckId: string; mode: SessionMode; result: SessionResult; cards: FlashcardContent[] }
  | { name: 'nothing-due'; deckId: string };

const SESSION_TITLE: Record<SessionMode, string> = { study: 'Study', review: 'Review', weak: 'Difficult cards' };

const capped = (queue: ReviewQueue, limit?: number): ReviewQueue => (limit && queue.cards.length > limit ? { cards: queue.cards.slice(0, limit), reasons: queue.reasons } : queue);

/**
 * Smart Flashcards: Select Deck → Study → Reveal → (optionally) Rate → Session Complete. Opened from Domain
 * Knowledge lessons through Practice & Review (`embedded`); it never changes chapter access,
 * Knowledge Check scores or lesson completion.
 */
export default function SmartFlashcards({
  decks = FLASHCARD_DECKS, adapter, clock = systemClock, learnerKey, toolbar, embedded = false, backLabel = 'All decks', onViewChange,
  renderOverview, sessionLimit, prevalidated = false, sourceLabelFor, lessonActions,
}: SmartFlashcardsProps) {
  const store = useMemo(() => adapter ?? createLocalStorageAdapter({ learnerKey }), [adapter, learnerKey]);
  const reviews = useFlashcardReviews(store, clock);
  const [view, setView] = useState<View>({ name: 'decks' });
  const [run, setRun] = useState(0);
  const inSession = view.name !== 'decks';

  useEffect(() => {
    onViewChange?.(inSession);
  }, [inSession]);

  // Decks that fail structural validation are withheld rather than shown with broken mappings.
  const validDecks = useMemo(() => (prevalidated ? decks : decks.filter((deck) => validateDeck(deck).length === 0)), [decks, prevalidated]);
  const deckFor = (deckId: string) => validDecks.find((deck) => deck.deckId === deckId) ?? null;
  const now = clock();

  const open = useCallback((deck: FlashcardDeckContent, mode: SessionMode, queue: ReviewQueue) => {
    setRun((value) => value + 1);
    setView({ name: 'session', deckId: deck.deckId, mode, cards: queue.cards, reasons: queue.reasons, run: run + 1 });
  }, [run]);

  const start = useCallback(
    (deck: FlashcardDeckContent, mode: SessionMode, exclude?: ReadonlySet<string>) => {
      const at = clock();
      const source = exclude?.size ? { ...deck, cards: deck.cards.filter((card) => !exclude.has(card.cardId)) } : deck;
      const queue = mode === 'study'
        ? { cards: sessionLimit ? buildStudySession(source, reviews.states, sessionLimit) : buildStudyQueue(source), reasons: {} as Record<string, ReviewReason> }
        : capped(mode === 'review' ? buildReviewQueue(deck, reviews.states, at) : buildWeakQueue(deck, reviews.states), sessionLimit);
      if (!queue.cards.length) {
        setView(mode === 'study' ? { name: 'decks' } : { name: 'nothing-due', deckId: deck.deckId });
        return;
      }
      open(deck, mode, queue);
    },
    [clock, reviews.states, open, sessionLimit],
  );

  const toDecks = () => setView({ name: 'decks' });

  let body: React.ReactNode;
  let heading: string | null = null;
  if (view.name === 'decks') {
    const overviewDeck = renderOverview ? validDecks[0] : undefined;
    if (renderOverview && overviewDeck) {
      body = renderOverview({
        deck: overviewDeck,
        stats: deckStats(overviewDeck, reviews.states, now),
        states: reviews.states,
        now,
        sessionLimit: sessionLimit ?? null,
        startStudy: () => start(overviewDeck, 'study'),
        startReview: () => start(overviewDeck, 'review'),
        startWeak: () => start(overviewDeck, 'weak'),
      });
    } else {
      body = validDecks.length ? (
        <ul className="cmfc-deck-list" aria-label="Flashcard decks">
          {validDecks.map((deck) => (
            <FlashcardDeck
              key={deck.deckId}
              deck={deck}
              stats={deckStats(deck, reviews.states, now)}
              onStudy={() => start(deck, 'study')}
              onReview={() => start(deck, 'review')}
            />
          ))}
        </ul>
      ) : (
        <section className="cmfc-panel" data-testid="no-decks">
          <h2 className="cmfc-panel-title">No flashcard decks yet</h2>
          <p className="cmfc-panel-text">Decks appear here once their cards have been checked against the lesson content.</p>
        </section>
      );
    }
  } else {
    const deck = deckFor(view.deckId);
    if (!deck) {
      body = null;
    } else if (view.name === 'session') {
      heading = `${deck.title} · ${SESSION_TITLE[view.mode]}`;
      const sessionCards = view.cards;
      const sessionMode = view.mode;
      body = (
        <FlashcardSession
          key={view.run}
          deck={deck}
          cards={sessionCards}
          mode={sessionMode}
          reasons={view.reasons}
          states={reviews.states}
          onRate={reviews.rate}
          sourceLabelFor={sourceLabelFor}
          onComplete={(result) => setView({ name: 'summary', deckId: deck.deckId, mode: sessionMode, result, cards: sessionCards })}
        />
      );
    } else if (view.name === 'summary') {
      heading = deck.title;
      const stats = deckStats(deck, reviews.states, now);
      const sessionIds = new Set(view.cards.map((card) => card.cardId));
      const moreToStudy = Boolean(sessionLimit) && deck.cards.some((card) => !sessionIds.has(card.cardId) && !isSeen(reviews.states[card.cardId]));
      const lastCards = view.cards;
      body = (
        <ReviewSummary
          deck={deck}
          tally={view.result.tally}
          total={view.result.total}
          summary={view.result.activity ? summariseSession(view.result.activity) : undefined}
          stats={stats}
          now={now}
          onStudyAgain={() => open(deck, 'study', { cards: lastCards, reasons: {} })}
          onRetryWeak={() => start(deck, 'weak')}
          onRestart={stats.due > 0 ? () => start(deck, 'review') : moreToStudy ? () => start(deck, 'study', sessionIds) : undefined}
          restartLabel={stats.due > 0 ? `Review due cards (${stats.due})` : moreToStudy ? 'Study more cards' : undefined}
          onExit={toDecks}
          exitLabel={backLabel}
          lessonActions={lessonActions}
        />
      );
    } else {
      heading = deck.title;
      const stats = deckStats(deck, reviews.states, now);
      body = (
        <section className="cmfc-panel" data-testid="nothing-due">
          <h2 className="cmfc-panel-title">Nothing due right now</h2>
          <p className="cmfc-panel-text">
            {stats.unseen === stats.total
              ? 'Study this deck first. Cards you rate are scheduled for review automatically.'
              : stats.nextDueAt
                ? `Your next review is ${formatDueFromNow(stats.nextDueAt, now)}.`
                : 'Every studied card is scheduled for later.'}
          </p>
          <div className="cmfc-panel-actions">
            {stats.weak > 0 && (
              <button type="button" className="cmfc-btn cmfc-btn-primary" onClick={() => start(deck, 'weak')}>
                Retry weak concepts ({stats.weak})
              </button>
            )}
            <button type="button" className="cmfc-btn" onClick={() => start(deck, 'study')}>Study deck</button>
            <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={toDecks}>{backLabel}</button>
          </div>
        </section>
      );
    }
  }

  return (
    <div className={embedded ? 'cmfc cmfc--embedded' : 'cmfc'} data-testid="smart-flashcards">
      <style id={FLASHCARD_STYLE_ID}>{FLASHCARD_CSS}</style>
      <div className={embedded ? 'cmfc-shell cmfc-shell--embedded' : 'cmfc-shell'}>
        {view.name === 'decks' ? (embedded ? null : (
          <header className="cmfc-header">
            <p className="cmfc-eyebrow">Domain Knowledge practice</p>
            <h1 className="cmfc-title">Smart Flashcards</h1>
            <p className="cmfc-subtitle">Recall key ideas from your lessons, then review them just before you would forget.</p>
            {toolbar}
          </header>
        )) : (
          <div className="cmfc-topbar">
            <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={toDecks} data-testid="flashcards-session-back">
              <span aria-hidden="true">←</span> {backLabel}
            </button>
            {heading && <p className="cmfc-session-title">{heading}</p>}
          </div>
        )}
        <div>{body}</div>
      </div>
    </div>
  );
}
