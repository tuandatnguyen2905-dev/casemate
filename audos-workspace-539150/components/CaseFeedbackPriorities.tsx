import { Search, Target } from 'lucide-react';
import type { FeedbackPriorities } from '../lib/feedbackPresentation';
import { clarifyUnitText } from '../lib/unitLabels';

export default function CaseFeedbackPriorities({
  feedback,
  className = '',
  format = (value) => value,
  testId = 'case-feedback-priorities',
}: {
  feedback: FeedbackPriorities;
  className?: string;
  format?: (value: string) => string;
  testId?: string;
}) {
  if (!feedback.evidenceToRevisit.length && !feedback.nextStep) return null;
  const show = (value: string) => format(clarifyUnitText(value));

  return (
    <div className={`space-y-3 ${className}`} data-testid={testId}>
      {feedback.evidenceToRevisit.length ? (
        <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4" data-testid={`${testId}-evidence`}>
          <h4 className="flex items-center gap-1.5 text-xs font-bold text-[var(--space-text-primary)]">
            <Search className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
            Evidence to revisit
          </h4>
          <ul className="mt-2 space-y-2">
            {feedback.evidenceToRevisit.map((item, index) => (
              <li key={`${item}-${index}`} className="break-words text-sm leading-6 text-[var(--space-text-secondary)]">
                {show(item)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {feedback.nextStep ? (
        <section className="rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4" data-testid={`${testId}-next-step`}>
          <h4 className="flex items-center gap-1.5 text-xs font-bold text-[var(--space-text-brand)]">
            <Target className="h-3.5 w-3.5 shrink-0" />
            Your next step
          </h4>
          <p className="mt-2 break-words text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{show(feedback.nextStep.action)}</p>
          {feedback.nextStep.why ? (
            <p className="mt-1 break-words text-xs leading-5 text-[var(--space-text-secondary)]">{show(feedback.nextStep.why)}</p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
