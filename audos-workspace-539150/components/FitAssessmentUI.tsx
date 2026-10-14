import { Sparkles } from 'lucide-react';

export function FitBrandTag() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--space-text-brand)]">
      <Sparkles className="h-3.5 w-3.5" /> Mate Fit Assessment
    </div>
  );
}

export function FitStepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="mb-5 grid grid-cols-6 gap-1" aria-label={`Step ${current} of ${steps.length}`}>
      {steps.map((label, index) => {
        const number = index + 1;
        const active = number === current;
        const done = number < current;
        return (
          <div key={label} className="min-w-0">
            <div className="h-1.5 rounded-full bg-[var(--space-surface-muted)]">
              <div
                className={`h-full rounded-full ${active || done ? 'bg-[var(--space-brand-primary)]' : ''}`}
                style={{ width: done ? '100%' : active ? '65%' : 0 }}
              />
            </div>
            <p className={`mt-1 truncate text-center text-[9px] font-bold sm:text-xs ${active || done ? 'text-[var(--space-text-primary)]' : 'text-[var(--space-text-muted)]'}`}>
              {number}. {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
