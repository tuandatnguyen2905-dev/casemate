import {
  evaluateCalculationFormula,
  formatCalculationFormulaRow,
  formulaRowsForCalculationResult,
  type CalculationAnswerPayload,
} from './calculationAnswerModel';
import {
  scoreCalculationAttempt,
  type CalculationAttempt,
  type CalculationScoreOutcome,
  type CalculationScoringCheck,
  type CalculationScoringProfile,
} from './calculationScoring';

export interface CalculationScoringOptions {
  /** Case brief plus task: every number the learner could see. */
  caseText: string;
  checks: CalculationScoringCheck[];
  roundingRule?: string;
  decisionAndLimit?: string;
  /** 'easy' drops Commercial interpretation and scores every mistake once; omit for the standard five-criterion rubric. */
  profile?: CalculationScoringProfile;
}

/** Convert the structured answer payload into the plain attempt the scorer reads. Old saved payloads never throw. */
export function calculationAttemptFromPayload(payload: CalculationAnswerPayload): CalculationAttempt {
  const finalAnswers = Array.isArray(payload?.finalAnswers) ? payload.finalAnswers : [];
  const formulaRows = Array.isArray(payload?.formulaRows) ? payload.formulaRows : [];
  const safePayload: CalculationAnswerPayload = { finalAnswers, formulaRows, caveat: String(payload?.caveat ?? '') };
  const rows: CalculationAttempt['rows'] = [];
  finalAnswers.forEach((answer, resultIndex) => {
    formulaRowsForCalculationResult(safePayload, answer.id, resultIndex).forEach((row) => {
      try {
        const numbers = Array.isArray(row.numbers) ? row.numbers : [];
        rows.push({
          resultIndex,
          inputs: numbers.map((slot) => String(slot?.value ?? '')),
          result: evaluateCalculationFormula(row),
          text: formatCalculationFormulaRow(row),
        });
      } catch {
        /* A malformed legacy row is simply ignored. */
      }
    });
  });
  return {
    results: finalAnswers.map((answer) => ({ value: String(answer?.value ?? ''), unit: answer?.unit })),
    rows,
    caveat: safePayload.caveat,
  };
}

export function scoreCalculationPayload(payload: CalculationAnswerPayload, options: CalculationScoringOptions): CalculationScoreOutcome {
  return scoreCalculationAttempt({ ...options, attempt: calculationAttemptFromPayload(payload) });
}
