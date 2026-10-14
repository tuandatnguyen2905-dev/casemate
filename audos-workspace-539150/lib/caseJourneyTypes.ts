// Case Journey builders.
//
// A Case Journey is one business decision split into linked drills that run
// diagnosis → implication → decision. Each drill is also a fully standalone
// library question, so a candidate can practise a single skill without
// completing the journey.
//
// These builders exist so every journey drill lands on the same contract the
// Case Drill library already validates: the Hard rubric is fixed at
// 20/30/25/15/10, the Expert rubrics total 100, and every drill ships as
// Draft — Pending Review like the rest of the Hard and Expert bank.
//
// Only TYPES are imported from skillQuestionLibrary, so the library can import
// journey content back without a runtime cycle.

import type { ExpertRubricItem, LibraryExhibit, LibraryQuestion } from './skillQuestionLibrary';

export type JourneyProvenance = 'constructed-from-source-structure' | 'original';
export type JourneyStageRole = 'Diagnosis' | 'Implication' | 'Decision';

/** Everything a generated journey drill supplies; the builder adds the rest. */
export type JourneyDrillInput = Omit<
  LibraryQuestion,
  'difficulty' | 'status' | 'reviewStatus' | 'answerMode' | 'answerFormat' | 'structuredAnswer' | 'scoringRubric' | 'evidenceRequired' | 'personalizedFeedbackTemplate' | 'correctAnswer'
> & { modelAnswerSections: NonNullable<LibraryQuestion['modelAnswerSections']> };

export const HARD_JOURNEY_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Key observation and data reading', points: 20, description: 'Reads the decisive exhibit values accurately, with correct units, and separates fact from interpretation.' },
  { criterion: 'Key insight identification', points: 30, description: 'Names what the evidence means for this decision and prioritises the driver that matters most.' },
  { criterion: 'Business implication', points: 25, description: 'Explains the consequence for the client objective, the economics, or the risk being carried.' },
  { criterion: 'Recommended next step', points: 15, description: 'Proposes a practical next action or analysis that follows directly from the insight.' },
  { criterion: 'Communication clarity', points: 10, description: 'Communicates concisely in Observation → Insight → Implication → Action order.' },
];

export const EXPERT_JOURNEY_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Key insight and prioritization', points: 30, description: 'Reaches a defensible conclusion that reconciles the exhibits rather than restating one of them.' },
  { criterion: 'Use of evidence across exhibits', points: 25, description: 'Cites at least two exhibits with specific, correctly read figures and connects them.' },
  { criterion: 'Business implication', points: 20, description: 'Explains why the conclusion changes the decision, the economics, or the risk.' },
  { criterion: 'Recommendation or next step', points: 15, description: 'Commits to an action with a decision gate, sequencing, or a named verification.' },
  { criterion: 'Communication quality and structure', points: 10, description: 'Communicates a clear line of argument an executive could act on.' },
];

export const EXPERT_JOURNEY_CALCULATION_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Calculation accuracy', points: 30, description: 'Produces the correct result from the supplied figures with consistent units.' },
  { criterion: 'Calculation logic', points: 15, description: 'Shows a transparent bridge, formula, and stated assumptions.' },
  { criterion: 'Interpretation of the result', points: 20, description: 'Explains what the number means rather than stopping at it.' },
  { criterion: 'Business implication', points: 20, description: 'Connects the result to the client objective and the decision at hand.' },
  { criterion: 'Recommendation and communication', points: 15, description: 'Makes a practical, evidence-linked recommendation and states it clearly.' },
];

const HARD_FEEDBACK = 'Score each Hard rubric criterion, name the strongest section, identify the most important missed or misread exhibit value, and give one specific improvement to the recommended next step.';
const EXPERT_FEEDBACK = 'Score every rubric criterion, name the strongest section, identify the most important missing or misread evidence across exhibits, assess implication quality, and give one specific improvement to the recommendation.';

const SOURCE_NOTE: Record<JourneyProvenance, string> = {
  'constructed-from-source-structure': 'Casemate practice data constructed from the source case structure; all figures are original and internally reconciled.',
  original: 'Casemate original case data; figures constructed and internally reconciled.',
};

/**
 * Render the flat model answer the review panel shows from the structured
 * sections, so the sections stay the single source of truth. Hard drills lead
 * with an observation; Expert drills carry evidence across exhibits instead.
 */
function composeModelAnswer(sections: NonNullable<LibraryQuestion['modelAnswerSections']>, isExpert: boolean): string {
  return [
    sections.calculation ? `Calculation: ${sections.calculation}` : null,
    !isExpert && sections.keyObservation ? `Key Observation: ${sections.keyObservation}` : null,
    `Key Insight: ${sections.keyInsight}`,
    isExpert ? `Supporting Evidence: ${sections.supportingEvidence}` : null,
    `Business Implication: ${sections.businessImplication}`,
    `${isExpert ? 'Recommended Action' : 'Recommended Next Step'}: ${sections.recommendedAction}`,
  ].filter(Boolean).join('\n');
}

/** Shared exhibit defaults, applied once here rather than on every exhibit. */
function withExhibitDefaults(exhibits: LibraryExhibit[] | undefined, provenance: JourneyProvenance): LibraryExhibit[] {
  return (exhibits || []).map((exhibit) => ({
    mutuallyExclusive: true,
    legendConfig: { show: true, position: 'top' as const },
    sourceNote: SOURCE_NOTE[provenance],
    ...exhibit,
  }));
}

export function hardJourneyDrill(value: JourneyDrillInput, provenance: JourneyProvenance): LibraryQuestion {
  return {
    ...value,
    exhibits: withExhibitDefaults(value.exhibits, provenance),
    correctAnswer: composeModelAnswer(value.modelAnswerSections, false),
    difficulty: 'hard',
    status: 'draft-pending-review',
    reviewStatus: 'Draft',
    answerMode: 'text',
    answerFormat: 'structured-expert',
    structuredAnswer: true,
    // The Hard breakdown scores the arithmetic inside Key Observation, so a
    // separate calculation input would be required but never scored.
    calculationRequired: false,
    evidenceRequired: 1,
    scoringRubric: HARD_JOURNEY_RUBRIC,
    personalizedFeedbackTemplate: HARD_FEEDBACK,
  };
}

export function expertJourneyDrill(value: JourneyDrillInput, provenance: JourneyProvenance): LibraryQuestion {
  return {
    ...value,
    exhibits: withExhibitDefaults(value.exhibits, provenance),
    correctAnswer: composeModelAnswer(value.modelAnswerSections, true),
    difficulty: 'expert',
    status: 'draft-pending-review',
    reviewStatus: 'Draft',
    answerMode: 'text',
    answerFormat: 'structured-expert',
    structuredAnswer: true,
    evidenceRequired: 2,
    scoringRubric: value.calculationRequired ? EXPERT_JOURNEY_CALCULATION_RUBRIC : EXPERT_JOURNEY_RUBRIC,
    personalizedFeedbackTemplate: EXPERT_FEEDBACK,
  };
}
