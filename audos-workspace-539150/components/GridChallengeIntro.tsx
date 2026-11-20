import { ChevronLeft, Grid3x3, Play } from 'lucide-react';
import { tw } from '../lib/colors';

export interface GridChallengeIntroProps {
  title: string;
  description: string;
  instructions: string[];
  /** Short facts such as the round count and the time limit. */
  chips: string[];
  best?: string | null;
  note?: string | null;
  actionLabel?: string;
  onStart: () => void;
  onBack: () => void;
}

const PILL = 'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold';

export default function GridChallengeIntro({
  title,
  description,
  instructions,
  chips,
  best = null,
  note = null,
  actionLabel = 'Start Test',
  onStart,
  onBack,
}: GridChallengeIntroProps) {
  return (
    <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]" data-testid="gc-intro">
      <div className="mx-auto w-full max-w-5xl space-y-3 p-3 sm:space-y-4 sm:p-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
          data-testid="gc-intro-back"
        >
          <ChevronLeft className="h-4 w-4" />
          All test types
        </button>

        <header className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]">
            <Grid3x3 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">{title}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {chips.map((text) => (
                <span key={text} className={`${PILL} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>{text}</span>
              ))}
              {best ? (
                <span className={`${PILL} bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]`}>{best}</span>
              ) : null}
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">{description}</p>
            {note ? <p className="mt-1 text-xs font-semibold text-[var(--space-text-brand)]">{note}</p> : null}
          </div>
        </header>

        <section
          className="space-y-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4"
          aria-labelledby="gc-rules"
        >
          <h2 id="gc-rules" className="text-sm font-bold text-[var(--space-text-primary)]">How it works</h2>
          <ol className="space-y-1.5 text-sm leading-6 text-[var(--space-text-secondary)]">
            {instructions.map((text, i) => (
              <li key={text} className="flex gap-1.5">
                <span className="font-bold text-[var(--space-text-brand)]">{i + 1}.</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </section>

        <button
          type="button"
          onClick={onStart}
          className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold sm:w-auto ${tw.button.primary}`}
          data-testid="gc-intro-start"
        >
          <Play className="h-4 w-4" />
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
