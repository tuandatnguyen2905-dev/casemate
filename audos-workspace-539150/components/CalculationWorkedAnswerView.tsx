import type { CalculationWorkedItem } from '../lib/calculationWorkedAnswers';
import { clarifyUnitText } from '../lib/unitLabels';

const TONE_CLASS: Record<NonNullable<CalculationWorkedItem['tone']>, string> = {
  good: 'bg-[color-mix(in_srgb,var(--space-semantic-success)_14%,transparent)] text-[var(--space-semantic-success)]',
  warn: 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_14%,transparent)] text-[var(--space-semantic-warning)]',
  neutral: 'bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]',
};

/**
 * "Worked answer": for every requested result, its name, the worked number, the
 * formula directly under that number, and a plain-English step-by-step explanation.
 * Shown only after submission.
 */
export default function CalculationWorkedAnswerView({
  items,
  decision,
  title = 'Worked answer',
  intro,
  embedded = false,
  testId = 'calculation-worked-answer',
}: {
  items: CalculationWorkedItem[];
  decision?: string;
  title?: string;
  intro?: string;
  embedded?: boolean;
  testId?: string;
}) {
  if (!items.length) return null;
  return (
    <section
      className={embedded ? 'mt-1' : 'mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5'}
      data-testid={testId}
    >
      {embedded ? null : <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">{title}</p>}
      {intro ? <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{clarifyUnitText(intro)}</p> : null}
      <div className={`${embedded || intro ? 'mt-3' : 'mt-4'} space-y-4`}>
        {items.map((item) => (
          <article
            key={item.id}
            className="min-w-0 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4"
            data-testid={`calculation-worked-result-${item.id}`}
          >
            <p className="break-words text-xs font-bold text-[var(--space-text-secondary)]">{clarifyUnitText(item.label)}</p>
            <p className="mt-1 break-words text-xl font-extrabold tabular-nums text-[var(--space-text-primary)]">{clarifyUnitText(item.answer)}</p>
            {item.formula ? (
              <p
                className="mt-1.5 whitespace-pre-wrap break-words font-mono text-[11px] leading-5 text-[var(--space-text-muted)]"
                data-testid={`calculation-worked-formula-${item.id}`}
              >
                <span className="font-sans font-bold text-[var(--space-text-secondary)]">Formula: </span>{clarifyUnitText(item.formula)}
              </p>
            ) : null}
            {item.learnerValue ? (
              <p className="mt-2 flex flex-wrap items-center gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                <span><span className="font-bold">Your number:</span> {clarifyUnitText(item.learnerValue)}</span>
                {item.note ? <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${TONE_CLASS[item.tone || 'neutral']}`}>{clarifyUnitText(item.note)}</span> : null}
              </p>
            ) : null}
            {item.steps.length ? (
              <ol className="mt-3 space-y-2 border-t border-[var(--space-border-default)] pt-3">
                {item.steps.map((step, stepIndex) => (
                  <li key={`${item.id}-${stepIndex}`} className="flex gap-2 text-sm leading-6 text-[var(--space-text-secondary)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[10px] font-bold text-[var(--space-text-brand)]">{stepIndex + 1}</span>
                    <span className="min-w-0 break-words">{clarifyUnitText(step)}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </article>
        ))}
      </div>
      {decision ? (
        <div className="mt-4 rounded-xl bg-[var(--space-surface-accent-soft)] p-3">
          <p className="text-xs font-bold text-[var(--space-text-brand)]">Decision and limit</p>
          <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{clarifyUnitText(decision)}</p>
        </div>
      ) : null}
    </section>
  );
}
