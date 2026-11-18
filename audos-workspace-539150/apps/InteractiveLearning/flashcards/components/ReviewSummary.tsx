import React, { useEffect, useId, useRef } from 'react';
import type { FlashcardDeckContent, RecallRating } from '../models';
import { RECALL_RATINGS } from '../models';
import type { DeckStats } from '../review';
import { formatDueFromNow } from '../scheduler';
import type { SessionSummary } from '../sessionSummary';
import { summaryFromTally } from '../sessionSummary';
import { MasteryMeter } from './FlashcardProgress';
import { RATING_LABEL } from './RecallRating';
import { uiAnswerChecks, uiDeckStatusLine, uiDueFromNow, uiMasteredCount, uiRecallLine, uiReviewDifficult, uiSessionRated, uiText, useUiLanguage } from '../../../IndustryKnowledge/localization/uiText';

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
  /** Already localized by the host (it knows the counts the label names). */
  restartLabel?: string;
  onExit: () => void;
  exitLabel?: string;
  lessonActions?: SummaryLessonActions;
}

export default function ReviewSummary({
  deck, tally, total, summary, stats, now, onRetryWeak, onStudyAgain, onRestart, restartLabel, onExit, exitLabel = 'All decks', lessonActions,
}: ReviewSummaryProps) {
  useUiLanguage();
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
      <h2 id={titleId} ref={headingRef} tabIndex={-1} className="cmfc-panel-title">{uiText('Session complete')}</h2>
      <p className="cmfc-panel-text">
        {uiSessionRated(session.rated, session.cards, deck.title)}
      </p>
      <dl className="cmfc-session-counts" data-testid="session-counts">
        {counts.map((item) => (
          <div key={item.label}>
            <dt>{uiText(item.label)}</dt>
            <dd data-testid={item.testId}>{item.value}</dd>
          </div>
        ))}
      </dl>
      {checks ? (
        <p className="cmfc-panel-text cmfc-small" data-testid="summary-answer-checks">
          {uiAnswerChecks(checks.correct, checks.cards, checks.firstTry, checks.shown, checks.skipped)}
          {' '}{uiText('Answer checks are practice only: they are not recall ratings and do not count towards mastery.')}
        </p>
      ) : null}
      {session.rated > 0 ? (
        <>
          <h3 className="cmfc-summary-heading">{uiText('Recall this session')}</h3>
          <ul className="cmfc-tally" aria-label={uiText('Latest rating per card this session')} data-testid="summary-recall">
            {RECALL_RATINGS.map((rating) => (
              <li key={rating}>
                <span className="cmfc-tally-value">{session.byRating[rating]}</span>
                <span className="cmfc-tally-label">{uiText(RATING_LABEL[rating])}</span>
              </li>
            ))}
          </ul>
          <p className="cmfc-panel-text cmfc-small" data-testid="summary-recall-line">
            {uiRecallLine(session.remembered, session.rated, session.difficult, session.unrated)}
          </p>
        </>
      ) : (
        <p className="cmfc-panel-text cmfc-small" data-testid="summary-no-ratings">
          {uiText('You did not rate any card, which is fine: rating is optional. Cards without a rating are not counted as remembered and are not scheduled for review.')}
        </p>
      )}
      <MasteryMeter percent={stats.masteryPercent} label={uiText('Deck mastery')} detail={uiMasteredCount(stats.mastered, stats.total)} />
      <p className="cmfc-panel-text cmfc-small">
        {uiDeckStatusLine(stats.due, stats.weak, stats.unseen, stats.nextDueAt ? uiDueFromNow(formatDueFromNow(stats.nextDueAt, now)) : null)}
      </p>
      <p className="cmfc-panel-text cmfc-small cmfc-text-muted">
        {uiText('Mastery comes only from your ratings: a card is mastered when its next review is at least three weeks away. Forgetting it later moves it back to learning.')}
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
          <button type="button" className={continueLearning ? 'cmfc-btn' : 'cmfc-btn cmfc-btn-primary'} onClick={onStudyAgain} data-testid="study-again">{uiText('Study again')}</button>
        ) : null}
        {onRetryWeak && stats.weak > 0 && (
          <button type="button" className="cmfc-btn" onClick={onRetryWeak} data-testid="review-difficult">
            {uiReviewDifficult(stats.weak)}
          </button>
        )}
        {onRestart && restartLabel ? <button type="button" className="cmfc-btn" onClick={onRestart} data-testid="session-restart">{restartLabel}</button> : null}
        {lessonActions?.returnToLesson ? (
          <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={lessonActions.returnToLesson} data-testid="summary-return-to-lesson">{uiText('Return to Lesson')}</button>
        ) : null}
        <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={onExit}>{uiText(exitLabel)}</button>
      </div>
    </section>
  );
}
