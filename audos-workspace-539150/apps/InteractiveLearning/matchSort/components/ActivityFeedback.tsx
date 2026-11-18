import { forwardRef } from 'react';
import { Check, X } from 'lucide-react';
import type { Feedback } from '../engine';
import { cx } from './ui';
import { uiText } from '../../../IndustryKnowledge/localization/uiText';

interface ActivityFeedbackProps {
  feedback: Feedback;
  headingId: string;
}

const ActivityFeedback = forwardRef<HTMLHeadingElement, ActivityFeedbackProps>(({ feedback, headingId }, headingRef) => (
  <section aria-labelledby={headingId} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="activity-feedback">
    <h3 id={headingId} ref={headingRef} tabIndex={-1} className="text-base font-semibold text-[var(--space-text-primary)]">{feedback.headline}</h3>
    {feedback.revealed ? (
      <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{uiText('Read each explanation, then reset to try the activity again from memory.')}</p>
    ) : !feedback.allCorrect ? (
      <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{uiText('Correct answers stay in place. Use the hints to rethink the others, then try again.')}</p>
    ) : null}
    {feedback.summary ? <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{feedback.summary}</p> : null}
    <ul className="mt-4 divide-y divide-[var(--space-border-default)]">
      {feedback.entries.map((entry) => (
        <li key={entry.id} className="flex gap-3 py-3 first:pt-0 last:pb-0" data-feedback-id={entry.id} data-correct={entry.correct ? 'true' : 'false'}>
          <span aria-hidden="true" className={cx('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', entry.correct ? 'text-[var(--space-semantic-success-700)]' : 'text-[var(--space-semantic-danger-700)]')}>
            {entry.correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-6 text-[var(--space-text-primary)]">
              <span className="sr-only">{uiText(entry.correct ? 'Correct: ' : 'Not yet: ')}</span>
              {entry.title}
            </p>
            <p className="text-sm leading-6 text-[var(--space-text-secondary)]">{entry.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
));

ActivityFeedback.displayName = 'ActivityFeedback';
export default ActivityFeedback;
