import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CriterionScore } from '../lib/caseScoringRubrics';
import { formatNumbersInText } from '../lib/numberDisplay';
import { scoreBand } from '../lib/scorePresentation';
import { clarifyUnitText } from '../lib/unitLabels';

export default function CriterionScoreTable({
  overallScore,
  criteria,
  title = 'Criterion breakdown',
  defaultOpen = true,
  formatNumbers = false,
  renderScore,
  showEvidence = true,
}: {
  overallScore: number;
  criteria: CriterionScore[];
  title?: string;
  defaultOpen?: boolean;
  formatNumbers?: boolean;
  /** When provided, renders every score (overall and per-criterion) instead of the built-in band pill. */
  renderScore?: (score: number) => ReactNode;
  /** Set false to omit the "What you wrote" column. Defaults to true so other surfaces are unchanged. */
  showEvidence?: boolean;
}) {
  if (!criteria.length) return null;
  const fmt = (text: string) => {
    const clear = clarifyUnitText(text);
    return formatNumbers ? formatNumbersInText(clear) : clear;
  };
  const overallBand = scoreBand(overallScore, 10);
  return (
    <section className="mt-4 overflow-hidden rounded-2xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)]" data-testid="criterion-score-table">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--space-border-default)] bg-[var(--space-surface-accent-soft)] p-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Transparent weighted score</p>
          <h3 className="mt-1 text-sm font-bold text-[var(--space-text-primary)]">{title}</h3>
        </div>
        {renderScore ? (
          renderScore(overallScore)
        ) : (
        <div className={`rounded-xl border px-4 py-2 text-center ${overallBand.className}`}>
          <span className="text-2xl font-black tabular-nums">{overallScore}</span>
          <span className="ml-1 text-xs font-bold">/10</span>
          <span className="ml-2 text-xs font-extrabold">{overallBand.label}</span>
        </div>
        )}
      </div>
      <details open={defaultOpen}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-xs font-bold text-[var(--space-text-primary)] [&::-webkit-details-marker]:hidden">
          See how every criterion contributed
          <ChevronDown className="h-4 w-4 text-[var(--space-text-brand)]" />
        </summary>
        <div className="overflow-x-auto border-t border-[var(--space-border-default)]">
          <table className={`w-full ${showEvidence ? 'min-w-[760px]' : 'min-w-[620px]'} border-collapse text-left`}>
            <thead className="bg-[var(--space-surface-muted)]">
              <tr>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Criterion and weight</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Score</th>
                {showEvidence ? <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">What you wrote</th> : null}
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Why</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">What a stronger answer adds</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((item) => {
                const band = scoreBand(item.score, 10);
                return (
                  <tr key={item.key} className="border-t border-[var(--space-border-default)] align-top">
                    <td className="px-4 py-3"><p className="text-xs font-bold text-[var(--space-text-primary)]">{clarifyUnitText(item.label)}</p><p className="mt-1 text-[10px] text-[var(--space-text-muted)]">{item.weight}% of overall score</p></td>
                    <td className="px-4 py-3">{renderScore ? renderScore(item.score) : <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-black tabular-nums ${band.badgeClassName}`}>{item.score}/10 · {band.label}</span>}</td>
                    {showEvidence ? <td className="break-words px-4 py-3 text-xs leading-5 text-[var(--space-text-secondary)]">{fmt(item.evidence)}</td> : null}
                    <td className="break-words px-4 py-3 text-xs leading-5 text-[var(--space-text-secondary)]">{fmt(item.reason)}</td>
                    <td className="break-words px-4 py-3 text-xs leading-5 text-[var(--space-text-secondary)]">{fmt(item.strongerAnswer)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
