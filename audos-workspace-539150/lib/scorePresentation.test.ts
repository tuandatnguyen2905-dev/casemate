import { SCORE_BANDS, scoreBand } from './scorePresentation';

const PERCENT_BOUNDARIES = [
  { score: 0, label: 'Needs work' },
  { score: 39, label: 'Needs work' },
  { score: 40, label: 'Developing' },
  { score: 59, label: 'Developing' },
  { score: 60, label: 'Strong' },
  { score: 79, label: 'Strong' },
  { score: 80, label: 'Excellent' },
  { score: 100, label: 'Excellent' },
] as const;

const TEN_POINT_BOUNDARIES = [
  { score: 0, label: 'Needs work' },
  { score: 3.9, label: 'Needs work' },
  { score: 4, label: 'Developing' },
  { score: 5.9, label: 'Developing' },
  { score: 6, label: 'Strong' },
  { score: 7.9, label: 'Strong' },
  { score: 8, label: 'Excellent' },
  { score: 10, label: 'Excellent' },
] as const;

export function runScorePresentationTests() {
  PERCENT_BOUNDARIES.forEach(({ score, label }) => {
    const actual = scoreBand(score, 100).label;
    if (actual !== label) throw new Error(`${score}%: expected ${label}, received ${actual}`);
  });
  TEN_POINT_BOUNDARIES.forEach(({ score, label }) => {
    const actual = scoreBand(score, 10).label;
    if (actual !== label) throw new Error(`${score}/10: expected ${label}, received ${actual}`);
  });
  SCORE_BANDS.forEach((band) => {
    if (band.contrastRatio < 4.5) throw new Error(`${band.label}: contrast ${band.contrastRatio}:1 is below WCAG AA`);
  });
}

runScorePresentationTests();
