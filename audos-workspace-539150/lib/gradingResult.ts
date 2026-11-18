import type { HonestScoreResult } from './caseScoringRubrics';
import { scoreBand, scorePercent, type ScoreBandLabel } from './scorePresentation';

/** @deprecated Use scoreBand from scorePresentation for new score UI. */
export type GradingResultLabel = ScoreBandLabel;

export function normalizedScore(score: number, scale = 10): number {
  return scorePercent(score, scale) / 10;
}

export function gradingResultLabel(score: number, scale = 10): GradingResultLabel {
  return scoreBand(score, scale).label;
}

/** @deprecated Kept for older call sites while score UI migrates to scoreBand. */
export function gradingResultTone(label: GradingResultLabel): 'success' | 'warning' | 'danger' {
  if (label === 'Excellent' || label === 'Strong') return 'success';
  if (label === 'Developing') return 'warning';
  return 'danger';
}

/** Deterministic result for MCQs and exact/tolerance-based numeric questions. */
export function objectiveScoreResult(correct: boolean, evidence: string, expectedAnswer: string): HonestScoreResult {
  const score = correct ? 10 : 0;
  return {
    rubricId: 'objective-exact-v1',
    scale: 10,
    overallScore: score,
    criteria: [{
      key: 'objective_accuracy',
      label: 'Answer accuracy',
      weight: 100,
      score,
      evidence: evidence.trim() ? `Submitted: “${evidence.trim().slice(0, 300)}”` : 'No answer was submitted.',
      reason: correct ? 'The submitted answer matches the answer key.' : 'The submitted answer does not match the answer key.',
      strongerAnswer: correct ? 'Keep the same answer and reasoning.' : `Use the reference answer: ${expectedAnswer}`,
    }],
  };
}
