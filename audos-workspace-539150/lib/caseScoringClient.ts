import {
  calculationAnswerPayloadWithResults,
  hasCalculationFormula,
  type CalculationAnswerPayload,
} from './calculationAnswerModel';
import {
  deterministicLowScore,
  normalizeCriterionScores,
  rubricForExercise,
  type ExerciseRubric,
  type HonestScoreResult,
} from './caseScoringRubrics';
import { feedbackGuideText, feedbackSkillsForExercise } from './caseFeedbackGuides';

function parseJson(text: string): unknown {
  const clean = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Mate returned unreadable feedback. Your answer is unchanged; please try again.');
  return JSON.parse(clean.slice(start, end + 1));
}

export async function gradeCaseExercise({
  exerciseType,
  title,
  question,
  caseContext,
  exhibits,
  referenceAnswer,
  answer,
  calculationSubmission,
  rubricOverride,
}: {
  exerciseType: string;
  title: string;
  question: string;
  caseContext?: string;
  exhibits?: string;
  referenceAnswer?: string;
  answer: string;
  calculationSubmission?: CalculationAnswerPayload;
  rubricOverride?: ExerciseRubric;
}): Promise<HonestScoreResult> {
  const rubric = rubricOverride || rubricForExercise(exerciseType);
  const normalizedType = String(exerciseType || '').toLowerCase();
  const exerciseInstruction = normalizedType.includes('calcul') || normalizedType.includes('math')
    ? 'Treat FINAL NUMERICAL ANSWERS and STRUCTURED FORMULA ROWS as distinct evidence. Cite the learner’s actual row number and arithmetic in criterion feedback, and identify the FIRST exact row where formula, arithmetic, units, or interpretation diverged. A missing formula loses method and traceability credit, but a correct final number still earns arithmetic/final-result credit. Accept alternative valid formula structures, order, grouping, and operators when mathematically equivalent. The live row result is learner-derived and never an answer-key hint.'
    : normalizedType === 'market_sizing_provided'
      ? 'This is PROVIDED DATA. Grade only the labelled Components, the bottom-up formula/model, and the calculated result with units according to the weighted rubric. The separate issue tree is a private thinking tool and is never included or graded. Name the exact omitted or misapplied component and its effect on the result. Do not reward invented replacement values. A stock-times-price, all-population-times-price, or model missing the decisive eligibility/frequency components must score 0-2 overall when it fundamentally fails the funnel. Accept mathematically equivalent formulas and alternative calculation order.'
      : normalizedType === 'market_sizing_ambiguous'
        ? 'This is AMBIGUOUS ESTIMATION. Grade only the labelled Components, how they are combined in the bottom-up model, and the calculated result with units, NOT proximity to the model number. The separate issue tree is a private thinking tool and is never included or graded. Do not ask for, mention, or score a recommended tree, written scope, assumption rationale, calculation-step narrative, sensitivity analysis, reasonableness check, or independent check. Name the exact component, operator, value, unit, or stock-to-flow choice that was right or wrong and explain its directional effect. Mostly empty or fundamentally wrong models must score 0-2. Accept a different defensible component model when its logic and units hold.'
        : normalizedType.includes('market') && normalizedType.includes('siz')
          ? 'Grade only the labelled Components, bottom-up model logic, and calculated result with units. Never grade or request the separate issue tree, written calculation steps, judgment notes, or a reasonableness check. Explicitly flag stock-to-flow errors, double counting, and missing material components.'
      : normalizedType.includes('chart') || normalizedType.includes('data')
        ? 'Separately assess OBSERVED IN THE DATA and INFERENCE. If the answer merely restates values without a decision implication, call that out plainly and score it low. The answer form ends with the business implication: never require, request or deduct for a recommended action, next step, action plan or decision gate, and do not suggest adding one as an improvement.'
        : normalizedType.includes('creativ')
          ? 'Judge the response against the exact case objective and constraints, not novelty alone. Use the five exact criterion labels. Credit alternative valid mechanisms. Never claim evidence was overlooked unless that fact appears in the brief. Order guidance around the first decisive gap, then one or two prioritized revisions and the next exercise.'
          : 'Tie every improvement to something the candidate actually wrote or missed.';
  const easyCalculationNote = normalizedType === 'calculations_easy'
    ? ' EASY LEVEL: grade exactly four criteria (Model and formula, Arithmetic and sequence, Units and boundaries, Traceability). The case already supplies the data and the interpretation, so NEVER ask for, mention, penalise or score assumptions, caveats, a recommendation or any commercial interpretation, and ignore any empty or missing assumption field. Deduct every mistake under ONE criterion only: a unit, scale or rounding slip belongs to Units and boundaries and must not also lower Arithmetic and sequence; a wrong number belongs to Arithmetic and sequence and must not also lower Units and boundaries; a missing formula row belongs to Traceability and Model and formula, never to the number. Each reason must agree with its score (no complaint on a 10/10, no praise on a low score), and no two criteria may repeat the same sentence.'
    : '';
  if (calculationSubmission) {
    const hasFinal = calculationSubmission.finalAnswers.some((item) => item.value.trim());
    if (!hasFinal && !hasCalculationFormula(calculationSubmission) && !calculationSubmission.caveat.trim()) {
      return normalizeCriterionScores({}, rubric, '');
    }
  }
  const lowScoreProbe = normalizedType.includes('market_sizing')
    ? answer
        .replace(/\b(bottom-up components|final estimate)\s*:/gi, ' ')
        .replace(/\[empty\]/gi, ' ')
        .trim()
    : answer;
  if (deterministicLowScore(lowScoreProbe) !== null) return normalizeCriterionScores({}, rubric, lowScoreProbe);
  const token = (window as any).__workspaceDb?.token;
  if (!token) throw new Error('Sign in so Mate can grade and preserve your answer.');
  const response = await fetch('/proxy/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': token },
    body: JSON.stringify({
      model: 'gpt-6.1-sol',
      reasoning_effort: 'medium',
      max_completion_tokens: 6000,
      response_format: { type: 'json_object' },
      stream: false,
      messages: [
        {
          role: 'system',
          content: 'You are Mate, Casemate’s rigorous and evidence-bound case-interview grader. Use the full 0-10 range. Irrelevant, unsupported, fundamentally misunderstood, or mostly empty work must receive 0-2 where warranted. Answer length and confident wording are not evidence. Never invent a strength, number, quote, or exhibit reference. Accept alternative but valid reasoning when it is supported. Novelty alone is not rewarded. Separate observed data from inference. Write all user-facing feedback in English. Do not expose IDs, grading codes, raw JSON, or placeholder labels. Do not use long em dashes. Return valid JSON only.',
        },
        {
          role: 'user',
          content: [
            `EXERCISE: ${rubric.label}`,
            `TITLE: ${title}`,
            `QUESTION: ${question}`,
            caseContext ? `CASE CONTEXT: ${caseContext}` : '',
            exhibits ? `EXHIBITS: ${exhibits}` : '',
            referenceAnswer ? `REFERENCE ANSWER: ${referenceAnswer}` : '',
            `SHARED RUBRIC: ${JSON.stringify(rubric)}`,
            `CANDIDATE ANSWER: ${answer}`,
            calculationSubmission ? `STRUCTURED CALCULATION PAYLOAD: ${JSON.stringify(calculationAnswerPayloadWithResults(calculationSubmission))}` : '',
            `EXERCISE-SPECIFIC COMPARISON: ${exerciseInstruction}${easyCalculationNote}`,
            feedbackGuideText(feedbackSkillsForExercise(normalizedType)),
            normalizedType === 'calculations_easy' ? 'EASY LEVEL REMINDER: the Easy rule above overrides the lens, so never comment on interpretation, assumptions or business consequence.' : '',
            'For every rubric criterion return its exact key, a score from 0 to 10, evidence quoting or faithfully paraphrasing what the candidate actually wrote, why it did or did not meet the criterion, and what a stronger answer would add. If no meaningful strength exists, say so plainly and respectfully. Do not return an independent overall score because the app derives it from the weights.',
            'evidence_to_revisit = only meaningful evidence issues. Each item must name the exact figure, chart pattern, or case fact; say what the candidate missed or misread; and explain why it changes the conclusion. Compare against the actual candidate answer first: never claim evidence was missed when they used it correctly. Return [] when there is no grounded evidence issue. Never write vague advice such as “use more evidence”.',
            'next_step = the ONE correction that would most improve the answer, with a concrete action and brief reason. Prioritize a wrong conclusion, calculation, or decisive case fact before writing style. further_improvements = zero to two smaller, useful actions. Do not repeat advice or contradict another section.',
            'Return exactly: {"criteria":[{"key":"exact rubric key","score":0,"evidence":"string","reason":"string","stronger_answer":"string"}],"evidence_to_revisit":["exact fact + miss/misread + why it matters"],"next_step":{"action":"string","why":"string"},"further_improvements":[{"action":"string","why":"string"}],"content_flags":["string"]}',
          ].filter(Boolean).join('\n\n'),
        },
      ],
    }),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.error?.message || body?.error || 'Mate could not grade this answer. Your work is unchanged; please try again.');
  const parsed = parseJson(body?.choices?.[0]?.message?.content || '') as Record<string, unknown>;
  const flags = Array.isArray(parsed?.content_flags) ? parsed.content_flags.map((item) => String(item ?? '').trim()).filter(Boolean) : [];
  if (flags.length) console.warn(`CONTENT_FLAG ${exerciseType} ${title}: ${flags.join(' | ').slice(0, 600)}`);
  return normalizeCriterionScores(parsed, rubric, answer);
}
