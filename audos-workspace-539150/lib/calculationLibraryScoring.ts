import type { CalculationAnswerPayload } from './calculationAnswerModel';
import { scoreCalculationPayload } from './calculationScoringAdapter';
import { expectedValueFromFormula, type CalculationScoreOutcome, type CalculationScoringCheck } from './calculationScoring';
import { isEasyCalculation, type HonestScoreResult } from './caseScoringRubrics';
import type { LibraryQuestion } from './skillQuestionLibrary';

function toleranceFromWorkedFormula(formula: string, unit: string): number {
  if (/\b(?:units?|packs?|bottles?|orders?|buyers?|people|sales|years?)\b/i.test(unit)) return 0;
  const afterEquals = String(formula || '').split('=').pop() || '';
  const numeric = afterEquals.match(/[−-]?(?:\d[\d,]*)(?:\.(\d+))?/);
  const decimals = numeric?.[1]?.length || 0;
  // Half of the final displayed place: 1 d.p. -> ±0.05, 2 d.p. -> ±0.005.
  return decimals ? 0.5 * (10 ** -decimals) : 0;
}

/**
 * Expected values for an Easy/Medium Calculations question, read from the worked
 * formula stored with each result (the number after the last "="). Returns null
 * when any result has no readable worked value, so the caller can fall back.
 */
export function libraryCalculationChecks(question: LibraryQuestion, payload: CalculationAnswerPayload): CalculationScoringCheck[] | null {
  const answers = Array.isArray(payload?.finalAnswers) ? payload.finalAnswers : [];
  if (!answers.length) return null;
  const checks: CalculationScoringCheck[] = [];
  for (const [index, answer] of answers.entries()) {
    const formulas = question.calculationResultFormulas?.[answer.id];
    const finalFormula = formulas?.length ? formulas[formulas.length - 1] : '';
    const value = finalFormula ? expectedValueFromFormula(finalFormula) : null;
    if (value === null || !Number.isFinite(value)) return null;
    checks.push({
      label: answer.label,
      value,
      tolerance: answer.tolerance ?? (index === 0 && question.numericTolerance != null
        ? question.numericTolerance
        : toleranceFromWorkedFormula(finalFormula, answer.unit || '')),
      unit: answer.unit || '',
    });
  }
  return checks;
}

export function libraryCalculationCaseText(question: LibraryQuestion): string {
  const exhibits = question.exhibits?.length ? question.exhibits : question.exhibit ? [question.exhibit] : [];
  return [question.question, question.businessContext || '', question.instruction || '', JSON.stringify(exhibits)].join('\n');
}

export function libraryCalculationOutcome(question: LibraryQuestion, payload: CalculationAnswerPayload): CalculationScoreOutcome | null {
  const checks = libraryCalculationChecks(question, payload);
  if (!checks) return null;
  return scoreCalculationPayload(payload, {
    caseText: libraryCalculationCaseText(question),
    checks,
    roundingRule: question.roundingRule,
    decisionAndLimit: question.keyInsight || question.explanation,
    profile: isEasyCalculation(question.skill, question.difficulty) ? 'easy' : 'standard',
  });
}

/** Marks an Easy/Medium Calculations answer with the same graduated rules as the bank cases; null when it cannot. */
export function scoreLibraryCalculation(question: LibraryQuestion, payload: CalculationAnswerPayload): HonestScoreResult | null {
  try {
    const outcome = libraryCalculationOutcome(question, payload);
    if (!outcome) return null;
    return {
      rubricId: isEasyCalculation(question.skill, question.difficulty) ? 'calculations-easy-v1' : 'calculations-cycle-1-v1',
      scale: 10,
      overallScore: outcome.overallScore,
      criteria: outcome.criteria,
    };
  } catch {
    return null;
  }
}
