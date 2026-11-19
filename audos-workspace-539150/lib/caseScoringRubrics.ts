export type ExerciseType = 'structures' | 'calculations' | 'calculations_cycle_1' | 'calculations_easy' | 'case_math' | 'market_sizing' | 'market_sizing_provided' | 'market_sizing_ambiguous' | 'creativity' | 'charts' | 'full_case';

export interface ScoringCriterionDefinition {
  key: string;
  label: string;
  weight: number;
  description: string;
}

export interface ExerciseRubric {
  id: string;
  label: string;
  criteria: ScoringCriterionDefinition[];
}

export interface CriterionScore {
  key: string;
  label: string;
  weight: number;
  score: number;
  evidence: string;
  reason: string;
  strongerAnswer: string;
}

export interface HonestScoreResult {
  rubricId: string;
  scale: 10;
  overallScore: number;
  criteria: CriterionScore[];
  /** Optional on legacy and deterministic attempts. */
  evidenceToRevisit?: string[];
  nextStep?: { action: string; why: string } | null;
  furtherImprovements?: Array<{ action: string; why: string }>;
}

const criterion = (key: string, label: string, weight: number, description: string): ScoringCriterionDefinition => ({ key, label, weight, description });

export const CASE_SCORING_RUBRICS: Record<ExerciseType, ExerciseRubric> = {
  structures: {
    id: 'structures-v2-frameworks',
    label: 'Structures',
    criteria: [
      criterion('objective_metric', 'Objective and metric', 10, 'Restates the decision or objective and the metric that defines success, without adding facts the case does not give.'),
      criterion('issue_coverage', 'Material issue coverage', 35, 'Covers the drivers that matter for this case. An alternative tree earns full credit when it reaches the same drivers with sound logic, whatever its labels or branch order. Branches that are irrelevant to the case are never penalised when absent.'),
      criterion('causal_logic', 'Causal, non-overlapping logic', 25, 'Branches are distinct, each one explains part of the outcome, and no driver is counted twice.'),
      criterion('evidence_tests', 'Evidence or specific tests', 20, 'Names the data, exhibit evidence or analysis that would confirm or reject each material branch.'),
      criterion('prioritization', 'Prioritization', 10, 'Says which branch to investigate first and why. A final recommendation is not required when the question only asks for a structure.'),
    ],
  },
  calculations: {
    id: 'calculations-v1',
    label: 'Calculations',
    criteria: [
      criterion('inputs', 'Correct inputs used', 18, 'Selects the relevant numbers without inventing or omitting inputs.'),
      criterion('formula', 'Correct formula', 18, 'Uses a formula or setup that answers the stated question.'),
      criterion('step_accuracy', 'Step accuracy', 18, 'Carries arithmetic correctly through each step and avoids unsupported jumps.'),
      criterion('units', 'Units', 12, 'Labels quantities and converts units consistently.'),
      criterion('final_result', 'Final result', 18, 'States the correct final result with sensible rounding.'),
      criterion('business_interpretation', 'Business interpretation', 16, 'Explains what the result means for the business decision.'),
    ],
  },
  calculations_cycle_1: {
    id: 'calculations-cycle-1-v1',
    label: 'Calculations Cycle 1',
    criteria: [
      criterion('model_formula', 'Model and formula', 20, 'Selects the right commercial model and formula.'),
      criterion('arithmetic_sequence', 'Arithmetic and sequence', 30, 'Carries arithmetic correctly, credits valid intermediate steps, and identifies the first divergence.'),
      criterion('units_boundaries', 'Units and boundaries', 20, 'Uses the right units, time boundary, threshold, tolerance, and rounding rule.'),
      criterion('commercial_interpretation', 'Commercial interpretation', 20, 'States the business decision and the assumption or limit that governs it.'),
      criterion('traceability', 'Traceability', 10, 'Shows enough labelled work to audit the route and accept an alternative valid method.'),
    ],
  },
  calculations_easy: {
    id: 'calculations-easy-v1',
    label: 'Calculations Easy',
    criteria: [
      criterion('model_formula', 'Model and formula', 25, 'Selects the right model and builds each formula from the numbers given in the case.'),
      criterion('arithmetic_sequence', 'Arithmetic and sequence', 37.5, 'Carries the arithmetic correctly through each step. A wrong number is deducted here once; unit, scale and rounding slips are never deducted here.'),
      criterion('units_boundaries', 'Units and boundaries', 25, 'Gives each answer in the requested unit and rounding. A unit, scale or rounding slip is deducted here once and never again under arithmetic.'),
      criterion('traceability', 'Traceability', 12.5, 'Shows one labelled formula for every result so each step can be followed.'),
    ],
  },
  case_math: {
    id: 'calculations-v1',
    label: 'Case Math',
    criteria: [
      criterion('inputs', 'Correct inputs used', 18, 'Selects the relevant numbers without inventing or omitting inputs.'),
      criterion('formula', 'Correct formula', 18, 'Uses a formula or setup that answers the stated question.'),
      criterion('step_accuracy', 'Step accuracy', 18, 'Carries arithmetic correctly through each step and avoids unsupported jumps.'),
      criterion('units', 'Units', 12, 'Labels quantities and converts units consistently.'),
      criterion('final_result', 'Final result', 18, 'States the correct final result with sensible rounding.'),
      criterion('business_interpretation', 'Business interpretation', 16, 'Explains what the result means for the business decision.'),
    ],
  },
  market_sizing: {
    id: 'market-sizing-v2-components',
    label: 'Market Sizing',
    criteria: [
      criterion('components', 'Bottom-up components', 35, 'Uses the material market determinants as clearly labelled components.'),
      criterion('model_logic', 'Formula and model logic', 35, 'Connects the components in a coherent bottom-up model without double counting.'),
      criterion('calculation_accuracy', 'Calculated result and units', 30, 'Computes the model correctly and states the result in the requested unit.'),
    ],
  },
  market_sizing_provided: {
    id: 'market-sizing-provided-v2-components',
    label: 'Market Sizing · Provided Data',
    criteria: [
      criterion('inputs', 'Supplied components', 30, 'Uses all and only the supplied facts as correctly labelled model components.'),
      criterion('formula', 'Bottom-up model', 35, 'Combines the components into a complete, non-overlapping and mathematically valid formula.'),
      criterion('math_units', 'Calculated result and units', 35, 'Calculates accurately, annualizes the correct period, and states the result in the requested unit.'),
    ],
  },
  market_sizing_ambiguous: {
    id: 'market-sizing-ambiguous-v3-components',
    label: 'Market Sizing · Ambiguous Estimation',
    criteria: [
      criterion('components', 'Bottom-up components', 40, 'Chooses material, mutually exclusive market determinants and assigns sensible values.'),
      criterion('driver_logic', 'Bottom-up model logic', 35, 'Combines the components coherently and converts stocks into annual flows where required.'),
      criterion('math_units', 'Calculated result and units', 25, 'Carries the entered components through a coherent calculation with units; arithmetic is checked against the candidate’s own inputs, not proximity to the model answer.'),
    ],
  },
  creativity: {
    id: 'creativity-common-v2',
    label: 'Creativity',
    criteria: [
      criterion('problem_audience', 'Problem and audience', 20, 'Frames the exact problem, audience, behavior, occasion, objective, and supplied constraints.'),
      criterion('case_grounded_idea', 'Case-grounded idea', 20, 'Builds from facts in the brief without inventing claims, figures, capabilities, or evidence.'),
      criterion('specific_mechanism', 'Specific mechanism', 20, 'Explains specifically how the product, message, channel sequence, or behavior-change mechanic works.'),
      criterion('feasibility_tradeoffs', 'Feasibility and trade-offs', 20, 'Respects operational, budget, safety, technical, timing, and user-control limits and names material trade-offs.'),
      criterion('test_success_measure', 'Test and success measure', 20, 'Defines an observable behavior, valid comparison or paid signal, success metric, guardrail, and decision rule.'),
    ],
  },
  charts: {
    id: 'charts-v1',
    label: 'Charts and data interpretation',
    criteria: [
      criterion('reading_accuracy', 'Accuracy of exhibit reading', 30, 'Uses the correct values, units, periods, and comparisons from the exhibits.'),
      criterion('insight', 'Insight beyond restating values', 25, 'Identifies the pattern, driver, outlier, or relationship that matters.'),
      criterion('observation_vs_inference', 'Observation versus inference', 20, 'Separates what the data directly shows from hypotheses that require testing.'),
      criterion('decision_implication', 'Implication for the decision', 25, 'Explains what the evidence means for the client objective or business decision. A next step, action plan or decision gate is not required and is never marked down.'),
    ],
  },
  full_case: {
    id: 'full-case-v1',
    label: 'Full case',
    criteria: [
      criterion('problem_framing', 'Problem framing and structure', 15, 'Frames the objective and uses a coherent, case-specific structure.'),
      criterion('section_analysis', 'Per-section analysis', 15, 'Applies the relevant exercise rubric to each section of the case.'),
      criterion('quantitative_accuracy', 'Quantitative accuracy', 15, 'Uses correct inputs, calculations, units, and interpretations where applicable.'),
      criterion('evidence', 'Supporting evidence', 15, 'Cites the supplied exhibits accurately and never invents figures.'),
      criterion('integrated_recommendation', 'Integrated recommendation', 20, 'Gives a clear answer supported by the strongest findings across sections.'),
      criterion('trade_offs', 'Trade-offs and risks', 10, 'Addresses material counterarguments, risks, and uncertainties.'),
      criterion('feasibility', 'Feasibility', 10, 'Includes practical implementation, sequencing, or decision gates.'),
    ],
  },
};

export function rubricForExercise(type: string): ExerciseRubric {
  const normalized = String(type || '').toLowerCase().replace(/-/g, '_');
  if (normalized === 'case_math') return CASE_SCORING_RUBRICS.case_math;
  return CASE_SCORING_RUBRICS[normalized as ExerciseType] || CASE_SCORING_RUBRICS.full_case;
}

export function deterministicLowScore(answer: string): 0 | 1 | null {
  const clean = String(answer || '').trim();
  if (!clean) return 0;
  const meaningfulWords = clean.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word));
  if (meaningfulWords.length < 4) return 0;
  if (meaningfulWords.length < 12 || clean.length < 45) return 1;
  return null;
}

export function deriveOverallScore(criteria: Array<{ score: number; weight: number }>): number {
  const totalWeight = criteria.reduce((sum, item) => sum + Math.max(0, Number(item.weight) || 0), 0);
  if (!totalWeight) return 0;
  const weighted = criteria.reduce((sum, item) => sum + Math.max(0, Math.min(10, Number(item.score) || 0)) * Math.max(0, Number(item.weight) || 0), 0);
  return Math.round((weighted / totalWeight) * 10) / 10;
}

export function normalizeCriterionScores(raw: unknown, rubric: ExerciseRubric, answer: string): HonestScoreResult {
  const lowScore = deterministicLowScore(answer);
  const source = raw && typeof raw === 'object' ? raw as Record<string, any> : {};
  const rawCriteria = Array.isArray(source.criteria) ? source.criteria : [];
  const byKey = new Map(rawCriteria.map((item: any) => [String(item?.key || ''), item]));
  const answerExcerpt = String(answer || '').trim().replace(/\s+/g, ' ').slice(0, 120);
  const criteria = rubric.criteria.map((definition) => {
    if (lowScore !== null) {
      return {
        ...definition,
        score: lowScore,
        evidence: answerExcerpt ? `Submission: “${answerExcerpt}”` : 'No answer was submitted.',
        reason: lowScore === 0 ? 'There is not enough relevant content to assess this criterion.' : 'The submission is too limited to demonstrate this criterion.',
        strongerAnswer: `Add specific content that demonstrates ${definition.label.toLowerCase()}: ${definition.description}`,
      };
    }
    const item = byKey.get(definition.key);
    const score = Number(item?.score);
    const evidence = String(item?.evidence || '').trim();
    const reason = String(item?.reason || '').trim();
    const strongerAnswer = String(item?.stronger_answer || item?.strongerAnswer || '').trim();
    if (!item || !Number.isFinite(score) || !evidence || !reason || !strongerAnswer) {
      throw new Error('Mate returned an incomplete criterion breakdown. Your answer is unchanged; please try grading again.');
    }
    return {
      ...definition,
      score: Math.round(Math.max(0, Math.min(10, score)) * 10) / 10,
      evidence: evidence.slice(0, 600),
      reason: reason.slice(0, 900),
      strongerAnswer: strongerAnswer.slice(0, 900),
    };
  });
  const cleanList = (value: unknown, max: number): string[] => (
    Array.isArray(value)
      ? value.map((item) => String(item ?? '').trim()).filter(Boolean).slice(0, max)
      : []
  );
  const cleanAction = (value: any): { action: string; why: string } | null => {
    if (typeof value === 'string') return value.trim() ? { action: value.trim(), why: '' } : null;
    const action = String(value?.action || value?.text || '').trim();
    return action ? { action, why: String(value?.why || value?.reason || '').trim() } : null;
  };
  const ranked = criteria.slice().sort((a, b) => a.score - b.score || b.weight - a.weight);
  const generatedNextStep = cleanAction(source.next_step);
  const nextStep = generatedNextStep || (ranked[0]
    ? { action: ranked[0].strongerAnswer, why: ranked[0].reason }
    : null);
  const generatedFurther = (Array.isArray(source.further_improvements) ? source.further_improvements : [])
    .map(cleanAction)
    .filter((item): item is { action: string; why: string } => Boolean(item));
  const fallbackFurther = ranked.slice(1).map((item) => ({ action: item.strongerAnswer, why: item.reason }));
  const seen = new Set(nextStep ? [nextStep.action.toLowerCase()] : []);
  const furtherImprovements = [...generatedFurther, ...fallbackFurther].filter((item) => {
    const key = item.action.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 2);
  return {
    rubricId: rubric.id,
    scale: 10,
    overallScore: deriveOverallScore(criteria),
    criteria,
    evidenceToRevisit: lowScore === null ? cleanList(source.evidence_to_revisit, 4) : [],
    nextStep,
    furtherImprovements,
  };
}

/**
 * Easy Calculations are scored on four criteria. The case already supplies the data and the
 * interpretation, so Commercial interpretation (20% on the shared Calculations rubric) is dropped
 * and its weight is redistributed proportionally across the other four: 20/30/20/10 -> 25/37.5/25/12.5.
 */
export const EASY_CALCULATION_WEIGHTS: Record<string, number> = {
  model_formula: 25,
  arithmetic_sequence: 37.5,
  units_boundaries: 25,
  traceability: 12.5,
};
export const EASY_CALCULATION_REMOVED_CRITERION = 'commercial_interpretation';

export function isEasyCalculation(skill: string | null | undefined, difficulty: string | null | undefined): boolean {
  return String(skill || '').toLowerCase() === 'calculations' && String(difficulty || '').toLowerCase() === 'easy';
}

const ASSUMPTION_FEEDBACK = /assumption|caveat|commercial interpretation/i;

/**
 * Display-time guard for Easy Calculations. Saved attempts that stored a Commercial interpretation
 * score keep their data, but the row is hidden, the remaining weights add up to exactly 100 and
 * the overall score is recomputed from them. Safe to call on results that are already normalised.
 */
export function normalizeEasyCalculationScoring(result: HonestScoreResult): HonestScoreResult {
  if (!result || !Array.isArray(result.criteria)) return result;
  const kept = result.criteria.filter((item) => item.key !== EASY_CALCULATION_REMOVED_CRITERION);
  const totalWeight = kept.reduce((sum, item) => sum + Math.max(0, Number(item.weight) || 0), 0);
  const canonical = kept.length === 4 && kept.every((item) => item.key in EASY_CALCULATION_WEIGHTS);
  const criteria = kept.map((item) => ({
    ...item,
    weight: canonical
      ? EASY_CALCULATION_WEIGHTS[item.key]
      : totalWeight > 0 ? Math.round((Math.max(0, Number(item.weight) || 0) * 100 / totalWeight) * 100) / 100 : item.weight,
  }));
  const withoutAssumptions = (items: Array<{ action: string; why: string }> | undefined) => (
    items ? items.filter((item) => !ASSUMPTION_FEEDBACK.test(`${item.action} ${item.why}`)) : items
  );
  const next = result.nextStep && ASSUMPTION_FEEDBACK.test(`${result.nextStep.action} ${result.nextStep.why}`) ? null : result.nextStep;
  return {
    ...result,
    criteria,
    overallScore: criteria.length ? deriveOverallScore(criteria) : result.overallScore,
    evidenceToRevisit: result.evidenceToRevisit ? result.evidenceToRevisit.filter((item) => !ASSUMPTION_FEEDBACK.test(item)) : result.evidenceToRevisit,
    nextStep: next,
    furtherImprovements: withoutAssumptions(result.furtherImprovements),
  };
}

export const CASE_SCORING_RUBRICS_JSON = JSON.stringify(CASE_SCORING_RUBRICS);
