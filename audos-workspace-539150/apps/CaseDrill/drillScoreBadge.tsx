// Case Drill score badge - the single source of truth for how a 0-10 score is
// banded, labelled and coloured anywhere inside Case Drill (recent-rep list,
// skill averages, result screen, rubric table). "Completed" status is a
// separate neutral badge and is never coloured by score.
//
// Bands are decided on the RAW value (no rounding first):
//   < 3  red         "Needs work"   white text   (#B91C1C, 6.5:1)
//   < 5  orange      "Developing"   white text   (#C2410C, 5.2:1)
//   < 7  yellow      "Fair"         dark text    (#FACC15 / #422006, 9.5:1)
//   < 9  light green "Good"         dark text    (#86EFAC / #14532D, 6.5:1)
//   >= 9 dark green  "Excellent"    white text   (#166534, 7.1:1)
import type { CSSProperties } from 'react';

export type DrillScoreBandId = 'needs-work' | 'developing' | 'fair' | 'good' | 'excellent';

export interface DrillScoreBand {
  id: DrillScoreBandId;
  label: string;
  /** Exclusive upper bound on the 0-10 raw score. */
  below: number;
  background: string;
  foreground: string;
}

export const DRILL_SCORE_BANDS: readonly DrillScoreBand[] = [
  { id: 'needs-work', label: 'Needs work', below: 3, background: '#B91C1C', foreground: '#FFFFFF' },
  { id: 'developing', label: 'Developing', below: 5, background: '#C2410C', foreground: '#FFFFFF' },
  { id: 'fair', label: 'Fair', below: 7, background: '#FACC15', foreground: '#422006' },
  { id: 'good', label: 'Good', below: 9, background: '#86EFAC', foreground: '#14532D' },
  { id: 'excellent', label: 'Excellent', below: Infinity, background: '#166534', foreground: '#FFFFFF' },
] as const;

/** Returns a finite number, or null for null / undefined / '' / NaN. */
export function parseDrillScore(raw: unknown): number | null {
  if (raw === null || raw === undefined || raw === '') return null;
  const value = typeof raw === 'number' ? raw : Number(raw);
  return Number.isFinite(value) ? value : null;
}

/** Band for a 0-10 score. Out-of-range values are clamped for colour only. */
export function drillScoreBand(score: number): DrillScoreBand {
  const clamped = Math.max(0, Math.min(10, Number.isFinite(score) ? score : 0));
  return DRILL_SCORE_BANDS.find((band) => clamped < band.below) || DRILL_SCORE_BANDS[DRILL_SCORE_BANDS.length - 1]!;
}

/** Score text as-is: integers without ".0", decimals unchanged (8.5 -> "8.5"). */
export function formatDrillScore(score: number): string {
  return String(score);
}

/** Display text for derived averages: truncated (never rounded up across a band edge) to one decimal. */
export function formatDrillAverage(score: number): string {
  const truncated = Math.floor(score * 10 + 1e-9) / 10;
  return String(truncated);
}

export function drillScoreText(score: number, options: { average?: boolean } = {}): string {
  const value = options.average ? formatDrillAverage(score) : formatDrillScore(score);
  return `${value}/10 · ${drillScoreBand(score).label}`;
}

export function DrillScoreBadge({
  score,
  average = false,
  size = 'sm',
  className = '',
  testId,
}: {
  /** 0-10 score. Missing / non-numeric scores render nothing. */
  score: unknown;
  /** Prefixes "Average" and formats the number to one decimal (truncated). */
  average?: boolean;
  size?: 'sm' | 'lg';
  className?: string;
  testId?: string;
}) {
  const value = parseDrillScore(score);
  if (value === null) return null;
  const band = drillScoreBand(value);
  const style: CSSProperties = { backgroundColor: band.background, color: band.foreground };
  const sizing =
    size === 'lg'
      ? 'rounded-xl px-3 py-1.5 text-sm font-extrabold sm:text-base'
      : 'rounded-full px-2 py-0.5 text-[11px] font-bold';
  return (
    <span
      className={`inline-flex max-w-full items-center whitespace-normal text-center leading-tight tabular-nums ${sizing} ${className}`}
      style={style}
      data-testid={testId}
      data-score-band={band.id}
    >
      {average ? 'Average ' : ''}
      {drillScoreText(value, { average })}
    </span>
  );
}
