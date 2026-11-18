import { useEffect, useId, useRef } from 'react';
import type { Dispatch, KeyboardEvent, ReactNode } from 'react';
import { ArrowRight, Eye, RotateCcw } from 'lucide-react';
import { buildFeedback, canCheck, progressOf } from '../engine';
import type { ActivityAction, ActivityState, MatchSortActivity } from '../types';
import ActivityFeedback from './ActivityFeedback';
import ActivityProgress from './ActivityProgress';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, MatchSortStyles, TYPE_LABEL, usePrefersReducedMotion } from './ui';
import { uiActivityProgress, uiText } from '../../../IndustryKnowledge/localization/uiText';

/** Checks before answers can be revealed, so learners always try at least twice first. */
export const REVEAL_AFTER_CHECKS = 2;

interface ActivityShellProps {
  activity: MatchSortActivity;
  state: ActivityState;
  dispatch: Dispatch<ActivityAction>;
  announcement: string;
  checkHint: string;
  onNext?: () => void;
  nextLabel?: string;
  children: ReactNode;
}

export default function ActivityShell({ activity, state, dispatch, announcement, checkHint, onNext, nextLabel, children }: ActivityShellProps) {
  const ids = useId();
  const titleId = `${ids}-title`;
  const hintId = `${ids}-check-hint`;
  const feedbackHeadingId = `${ids}-feedback`;
  const feedbackRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const feedback = buildFeedback(activity, state);
  const progress = progressOf(activity, state);
  const checkable = canCheck(activity, state);
  const checked = state.phase === 'checked';
  const allCorrect = Boolean(state.result?.allCorrect);
  const focusKey = checked && state.result ? `${state.checks}:${state.result.revealed}` : null;

  useEffect(() => {
    const heading = feedbackRef.current;
    if (!focusKey || !heading) return;
    heading.focus({ preventScroll: true });
    if (typeof heading.scrollIntoView === 'function') heading.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }, [focusKey]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') dispatch({ type: 'clear-selection' });
  };
  const primary = activity.sourceRefs[0];

  return (
    <section aria-labelledby={titleId} onKeyDown={onKeyDown} className="ms-root flex flex-col gap-5" data-activity-id={activity.activityId} data-activity-type={activity.type}>
      <MatchSortStyles />
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium text-[var(--space-text-muted)]">
          {uiText(TYPE_LABEL[activity.type])} · {primary.lessonTitle} · {primary.chapterTitle}
        </p>
        <h2 id={titleId} className="text-xl font-semibold leading-tight text-[var(--space-text-primary)]">{activity.title}</h2>
        <p className="text-sm leading-6 text-[var(--space-text-secondary)]"><span className="font-semibold text-[var(--space-text-primary)]">{uiText('Objective: ')}</span>{activity.learningObjective}</p>
        <p className="text-sm leading-6 text-[var(--space-text-muted)]">{activity.instructions}</p>
      </header>

      <ActivityProgress progress={progress} label={uiActivityProgress(activity.title)} attempt={state.checks || undefined} />

      <div className="flex flex-col gap-4">{children}</div>

      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--space-border-default)] pt-4">
        {!checked ? (
          <>
            <button type="button" className={BUTTON_PRIMARY} disabled={!checkable} aria-describedby={!checkable ? hintId : undefined} onClick={() => dispatch({ type: 'check' })}>{uiText('Check answers')}</button>
            {!checkable ? <span id={hintId} className="text-xs text-[var(--space-text-muted)]">{checkHint}</span> : null}
          </>
        ) : allCorrect ? (
          onNext ? <button type="button" className={BUTTON_PRIMARY} onClick={onNext}>{nextLabel ?? uiText('Next activity')}<ArrowRight aria-hidden="true" className="h-4 w-4" /></button> : null
        ) : (
          <>
            <button type="button" className={BUTTON_PRIMARY} onClick={() => dispatch({ type: 'retry' })}>{uiText('Try again')}</button>
            {state.checks >= REVEAL_AFTER_CHECKS ? (
              <button type="button" className={BUTTON_SECONDARY} onClick={() => dispatch({ type: 'reveal' })}><Eye aria-hidden="true" className="h-4 w-4" />{uiText('Show answers')}</button>
            ) : null}
          </>
        )}
        <button type="button" className={`${BUTTON_SECONDARY} sm:ml-auto`} onClick={() => dispatch({ type: 'reset' })}>
          <RotateCcw aria-hidden="true" className="h-4 w-4" />{uiText(allCorrect ? 'Practise again' : 'Reset')}
        </button>
      </div>

      {feedback ? <ActivityFeedback ref={feedbackRef} feedback={feedback} headingId={feedbackHeadingId} /> : null}

      <p aria-live="polite" role="status" className="sr-only" data-testid="activity-announcer">{announcement}</p>

      <details className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3 text-sm">
        <summary className="cursor-pointer font-medium text-[var(--space-text-secondary)]">{uiText('Chapter links and sources')}</summary>
        <ul className="mt-3 flex flex-col gap-2 text-[var(--space-text-secondary)]">
          {activity.sourceRefs.map((ref) => (
            <li key={`${ref.lessonTitle}-${ref.chapterIndex}`} className="leading-6">
              <span className="font-medium text-[var(--space-text-primary)]">{ref.lessonTitle} · {ref.chapterTitle}</span>
              {allCorrect ? <span className="block text-[var(--space-text-muted)]" data-testid="source-grounding">{ref.grounding}</span> : null}
              <span className="block text-xs text-[var(--space-text-muted)]">{uiText('Sources')}: {ref.sourceIds.join(', ')}</span>
            </li>
          ))}
        </ul>
        {!allCorrect ? <p className="mt-3 text-xs text-[var(--space-text-muted)]">{uiText('What each chapter says about these answers appears here once the activity is complete.')}</p> : null}
        {allCorrect && activity.type === 'sequence-builder' ? <p className="mt-3 leading-6 text-[var(--space-text-muted)]" data-testid="sequence-evidence"><span className="font-medium text-[var(--space-text-secondary)]">{uiText('Why this is a sequence: ')}</span>{activity.sequenceEvidence}</p> : null}
        <p className="mt-3 text-xs text-[var(--space-text-muted)]">{uiText('Practice only. Results here do not change Knowledge Check scores, chapter access or lesson completion.')}</p>
      </details>
    </section>
  );
}
