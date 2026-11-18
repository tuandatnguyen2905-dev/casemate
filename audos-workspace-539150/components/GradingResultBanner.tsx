import type { ReactNode } from 'react';
import { CheckCircle2, CircleAlert, XCircle } from 'lucide-react';
import { scoreBand } from '../lib/scorePresentation';
import { clarifyUnitText } from '../lib/unitLabels';

export default function GradingResultBanner({
  score,
  scale = 10,
  referenceAnswer,
  explanation,
  gotRight = [],
  missed = [],
  showDetails = true,
  testId = 'grading-result-banner',
  scoreBadge,
}: {
  score: number;
  scale?: number;
  referenceAnswer?: string;
  explanation?: string;
  gotRight?: string[];
  missed?: string[];
  showDetails?: boolean;
  testId?: string;
  /** When provided, replaces the built-in coloured label and score pill and the banner stays neutral. */
  scoreBadge?: ReactNode;
}) {
  const band = scoreBand(score, scale);
  const Icon = band.id === 'excellent' || band.id === 'strong' ? CheckCircle2 : band.id === 'developing' ? CircleAlert : XCircle;

  return (
    <section className={`rounded-2xl border-2 p-4 ${scoreBadge ? 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-primary)]' : band.className}`} data-testid={testId}>
      {scoreBadge ? (
        <div className="flex flex-wrap items-center gap-2">{scoreBadge}</div>
      ) : (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Icon className="h-6 w-6 shrink-0" />
          <p className="text-lg font-extrabold" data-testid={`${testId}-label`}>{band.label}</p>
        </div>
        <p className="rounded-full bg-[var(--space-surface-card)] px-3 py-1 text-sm font-extrabold tabular-nums text-[var(--space-text-primary)]" data-testid={`${testId}-score`}>
          {score}/{scale}
        </p>
      </div>
      )}
      {showDetails ? (
        <div className="mt-3 space-y-2 text-[var(--space-text-secondary)]">
          {referenceAnswer ? <p className="text-sm leading-6"><span className="font-bold text-[var(--space-text-primary)]">Reference answer:</span> {clarifyUnitText(referenceAnswer)}</p> : null}
          {explanation ? <p className="text-sm leading-6"><span className="font-bold text-[var(--space-text-primary)]">Explanation:</span> {clarifyUnitText(explanation)}</p> : null}
          {gotRight.length ? <p className="text-sm leading-6"><span className="font-bold text-[var(--space-text-primary)]">What you got right:</span> {gotRight.map((item) => clarifyUnitText(item)).join(' · ')}</p> : null}
          {missed.length ? <p className="text-sm leading-6"><span className="font-bold text-[var(--space-text-primary)]">What you missed:</span> {missed.map((item) => clarifyUnitText(item)).join(' · ')}</p> : null}
        </div>
      ) : null}
    </section>
  );
}
