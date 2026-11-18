export type ScoreBandId = 'needs-work' | 'developing' | 'strong' | 'excellent';
export type ScoreBandLabel = 'Needs work' | 'Developing' | 'Strong' | 'Excellent';

export interface ScoreBand {
  id: ScoreBandId;
  label: ScoreBandLabel;
  minPercent: number;
  className: string;
  badgeClassName: string;
  fill: string;
  foreground: string;
  background: string;
  contrastRatio: number;
}

/**
 * The single Casemate score-to-colour scale. Classification always uses the
 * unrounded percentage; formatting may round only after the band is chosen.
 * This makes 3.9/10 Needs work while 4/10 is Developing at the exact boundary.
 */
export const SCORE_BANDS: readonly ScoreBand[] = [
  {
    id: 'excellent',
    label: 'Excellent',
    minPercent: 80,
    className: 'border-[#15803D] bg-[#F0FDF4] text-[#14532D]',
    badgeClassName: 'border border-[#15803D] bg-[#F0FDF4] text-[#14532D]',
    fill: '#15803D',
    foreground: '#14532D',
    background: '#F0FDF4',
    contrastRatio: 8.70,
  },
  {
    id: 'strong',
    label: 'Strong',
    minPercent: 60,
    className: 'border-[#0369A1] bg-[#F0F9FF] text-[#0C4A6E]',
    badgeClassName: 'border border-[#0369A1] bg-[#F0F9FF] text-[#0C4A6E]',
    fill: '#0369A1',
    foreground: '#0C4A6E',
    background: '#F0F9FF',
    contrastRatio: 8.87,
  },
  {
    id: 'developing',
    label: 'Developing',
    minPercent: 40,
    className: 'border-[#B45309] bg-[#FFFBEB] text-[#78350F]',
    badgeClassName: 'border border-[#B45309] bg-[#FFFBEB] text-[#78350F]',
    fill: '#B45309',
    foreground: '#78350F',
    background: '#FFFBEB',
    contrastRatio: 8.75,
  },
  {
    id: 'needs-work',
    label: 'Needs work',
    minPercent: 0,
    className: 'border-[#B91C1C] bg-[#FEF2F2] text-[#7F1D1D]',
    badgeClassName: 'border border-[#B91C1C] bg-[#FEF2F2] text-[#7F1D1D]',
    fill: '#B91C1C',
    foreground: '#7F1D1D',
    background: '#FEF2F2',
    contrastRatio: 9.16,
  },
] as const;

export function scorePercent(score: number, scale = 100): number {
  const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 100;
  const safeScore = Number.isFinite(score) ? score : 0;
  return Math.max(0, Math.min(100, (safeScore / safeScale) * 100));
}

export function scoreBand(score: number, scale = 100): ScoreBand {
  const percent = scorePercent(score, scale);
  return SCORE_BANDS.find((band) => percent >= band.minPercent) || SCORE_BANDS[SCORE_BANDS.length - 1]!;
}

export function scoreWithBand(score: number, scale = 10, maximumFractionDigits = 1): string {
  const value = Number.isInteger(score)
    ? String(score)
    : score.toLocaleString(undefined, { maximumFractionDigits });
  return `${value}/${scale} · ${scoreBand(score, scale).label}`;
}
