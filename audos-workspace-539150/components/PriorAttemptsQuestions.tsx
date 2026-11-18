import { Check } from 'lucide-react';
import { PRIOR_APPLICATION_OPTIONS, PRIOR_ROUND_OPTIONS, type PriorAttempts } from '../lib/priorAttempts';

function chipClass(selected: boolean): string {
  return `inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
    selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)]'
  }`;
}

/** Two optional questions about earlier MT / internship applications. Tapping a selected chip clears it. */
export default function PriorAttemptsQuestions({ value, onChange, className = 'mt-4' }: { value: PriorAttempts; onChange: (next: PriorAttempts) => void; className?: string }) {
  const showRound = !!value.applicationsCount && value.applicationsCount !== '0';
  return (
    <div className={`${className} rounded-2xl border border-dashed border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4`} data-testid="fit-prior-attempts">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Optional · your application history</p>
      <fieldset className="mt-2">
        <legend className="text-sm font-bold">How many MT / internship programs have you applied to before?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRIOR_APPLICATION_OPTIONS.map((option) => {
            const selected = value.applicationsCount === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(selected
                  ? { applicationsCount: '', furthestRound: '' }
                  : {
                      applicationsCount: option.value,
                      furthestRound: option.value === '0' ? 'none' : value.applicationsCount === '0' ? '' : value.furthestRound,
                    })}
                className={chipClass(selected)}
                data-testid={`prior-applications-${option.value}`}
              >
                {selected && <Check className="h-3.5 w-3.5" />}{option.label}
              </button>
            );
          })}
        </div>
      </fieldset>
      {showRound && (
        <fieldset className="mt-4">
          <legend className="text-sm font-bold">What is the furthest round you have reached?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRIOR_ROUND_OPTIONS.map((option) => {
              const selected = value.furthestRound === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChange({ ...value, furthestRound: selected ? '' : option.value })}
                  className={chipClass(selected)}
                  data-testid={`prior-round-${option.value}`}
                >
                  {selected && <Check className="h-3.5 w-3.5" />}{option.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );
}
