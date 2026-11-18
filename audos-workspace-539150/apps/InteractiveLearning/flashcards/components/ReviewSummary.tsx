import React, { useEffect, useId, useRef } from 'react';
import type { FlashcardDeckContent, RecallRating } from '../models';
import { RECALL_RATINGS } from '../models';
import type { DeckStats } from '../review';
import { formatDueFromNow } from '../scheduler';
import type { SessionSummary } from '../sessionSummary';
import { summaryFromTally } from '../sessionSummary';
import { MasteryMeter } from './FlashcardProgress';
import { RATING_LABEL } from './RecallRating';

/** The host's next step in the curriculum, already resolved against its chapter-access rules. */
export interface ContinueLearningAction {
  /** Button text, e.g. "Continue to Chapter 3". */
  label: string;
  /** Where it leads, e.g. the chapter or lesson title. */
  detail?: string;
  /** Why the natural next step is not open yet, e.g. a Knowledge Check to submit first. */
  notice?: string;
  onSelect: () => void;
}

/** Lesson navigation a host (Practice & Review) offers on the Session Complete screen. */
export interface SummaryLessonActions {
  continueLearning?: ContinueLearningAction;
  returnToLesson?: () => void;
}

export interface ReviewSummaryProps {
  deck: FlashcardDeckContent;
  tally: Record<RecallRating, number>;
  /** Cards in the session queue, including any shown again after Again. */
  total: number;
  /** Viewed, rated and unrated cards; derived from `tally` when absent. */
  summary?: SessionSummary;
  stats: DeckStats;
  now: number;
  onRetryWeak?: () => void;
  /** Replays the same cards. */
  onStudyAgain?: () => void;
  /** An extra session, e.g. due cards or the next batch of cards not studied yet. */
  onRestart?: () => void;
  restartLabel?: string;
  onExit: () => void;
  exitLabel?: string;
  lessonActions?: SummaryLessonActions;
}

const plural = (count: number, one: string, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;

export default function ReviewSummary({
  deck, tally, total, summary, stats, now, onRetryWeak, onStudyAgain, onRestart, restartLabel, onExit, exitLabel = 'All decks', lessonActions,
}: ReviewSummaryProps) {
  const titleId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const session = summary ?? summaryFromTally(tally, total);
  const continueLearning = lessonActions?.continueLearning;
  const checks = session.answerChecks;

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const counts = [
    { label: 'Viewed', value: session.viewed, testId: 'summary-viewed' },
    { label: 'Rated', value: session.rated, testId: 'summary-rated' },
    { label: 'Not rated', value: session.unrated, testId: 'summary-unrated' },
  ];

  return (
    <section className="cmfc-panel" aria-labelledby={titleId} data-testid="review-summary">
      <h2 id={titleId} ref={headingRef} tabIndex={-1} className="cmfc-panel-title">Session complete</h2>
      <p className="cmfc-panel-text">
        You rated {session.rated} of {plural(session.cards, 'card')} in {deck.title}.
      </p>
      <dl className="cmfc-session-counts" data-testid="session-counts">
        {counts.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd data-testid={item.testId}>{item.value}</dd>
          </div>
        ))}
      </dl>
      {checks ? (
        <p className="cmfc-panel-text cmfc-small" data-testid="summary-answer-checks">
          Answer checks (multiple choice and fill in the blank): {checks.correct} of {plural(checks.cards, 'card')} answered correctly
          {checks.firstTry !== checks.correct ? ` (${checks.firstTry} on the first try)` : ''}
          {checks.shown ? ` · ${checks.shown} shown without a correct answer` : ''}
          {checks.skipped ? ` · ${checks.skipped} skipped` : ''}.
          {' '}Answer checks are practice only: they are not recall ratings and do not count towards mastery.
        </p>
      ) : null}
      {session.rated > 0 ? (
        <>
          <h3 className="cmfc-summary-heading">Recall this session</h3>
          <ul className="cmfc-tally" aria-label="Latest rating per card this session" data-testid="summary-recall">
            {RECALL_RATINGS.map((rating) => (
              <li key={rating}>
                <span className="cmfc-tally-value">{session.byRating[rating]}</span>
                <span className="cmfc-tally-label">{RATING_LABEL[rating]}</span>
              </li>
            ))}
          </ul>
          <p className="cmfc-panel-text cmfc-small" data-testid="summary-recall-line">
            Remembered (Good or Easy): {session.remembered} of {session.rated} rated · Difficult (Again or Hard): {session.difficult}
            {session.unrated ? `. ${plural(session.unrated, 'card')} without a rating ${session.unrated === 1 ? 'is' : 'are'} not counted.` : '.'}
          </p>
        </>
      ) : (
        <p className="cmfc-panel-text cmfc-small" data-testid="summary-no-ratings">
          You did not rate any card, which is fine: rating is optional. Cards without a rating are not counted as remembered and are not scheduled for review.
        </p>
      )}
      <MasteryMeter percent={stats.masteryPercent} label="Deck mastery" detail={`${stats.mastered} of ${stats.total} mastered`} />
      <p className="cmfc-panel-text cmfc-small">
        {stats.due} due now · {stats.weak} difficult · {stats.unseen} not rated yet
        {stats.nextDueAt ? ` · next review ${formatDueFromNow(stats.nextDueAt, now)}` : ''}
      </p>
      <p className="cmfc-panel-text cmfc-small cmfc-text-muted">
        Mastery comes only from your ratings: a card is mastered when its next review is at least three weeks away. Forgetting it later moves it back to learning.
      </p>
      {continueLearning ? (
        <div className="cmfc-continue" data-testid="continue-learning-panel">
          {continueLearning.notice ? <p className="cmfc-continue-notice" data-testid="continue-learning-notice">{continueLearning.notice}</p> : null}
          <button type="button" className="cmfc-btn cmfc-btn-primary cmfc-continue-btn" onClick={continueLearning.onSelect} data-testid="continue-learning">
            {continueLearning.label} <span aria-hidden="true">→</span>
          </button>
          {continueLearning.detail ? <p className="cmfc-continue-detail" data-testid="continue-learning-detail">{continueLearning.detail}</p> : null}
        </div>
      ) : null}
      <div className="cmfc-panel-actions">
        {onStudyAgain ? (
          <button type="button" className={continueLearning ? 'cmfc-btn' : 'cmfc-btn cmfc-btn-primary'} onClick={onStudyAgain} data-testid="study-again">Study again</button>
        ) : null}
        {onRetryWeak && stats.weak > 0 && (
          <button type="button" className="cmfc-btn" onClick={onRetryWeak} data-testid="review-difficult">
            Review difficult cards ({stats.weak})
          </button>
        )}
        {onRestart && restartLabel ? <button type="button" className="cmfc-btn" onClick={onRestart}>{restartLabel}</button> : null}
        {lessonActions?.returnToLesson ? (
          <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={lessonActions.returnToLesson} data-testid="summary-return-to-lesson">Return to Lesson</button>
        ) : null}
        <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={onExit}>{exitLabel}</button>
      </div>
    </section>
  );
}
