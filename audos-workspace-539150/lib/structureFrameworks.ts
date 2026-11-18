/**
 * Casemate Structures framework references F01-F10.
 *
 * The ten one-page framework PDFs supplied by the founder, stored with stable IDs.
 * Text fields are copied from the PDFs. They are GUIDES, NOT ANSWER KEYS: grading, suggested
 * answers and feedback use them to stay consistent, and an equivalent tree earns full credit.
 * `structure` holds the same content as reusable branches, drivers, checks and guardrails.
 * The three blocks that are identical in every PDF live once in STRUCTURE_FRAMEWORK_SHARED.
 */
import { STRUCTURE_FRAMEWORKS_F01_F05 } from './structureFrameworksA';
import { STRUCTURE_FRAMEWORKS_F06_F10 } from './structureFrameworksB';

export type StructureFrameworkId = 'F01' | 'F02' | 'F03' | 'F04' | 'F05' | 'F06' | 'F07' | 'F08' | 'F09' | 'F10';

export interface FrameworkDriver {
  id: string;
  label: string;
  /** Case-insensitive regular expression source used to detect that a user tree addresses this driver. */
  pattern: string;
}

export interface FrameworkBranch {
  id: string;
  label: string;
  /** Sub-drivers taken from the framework's first cut. */
  leaves: string[];
  /** Why the branch belongs in the tree. */
  why: string;
  /** Driver ids that this branch is responsible for covering. */
  drivers: string[];
}

export interface StructureFramework {
  id: StructureFrameworkId;
  slug: string;
  title: string;
  subtitle: string;
  source: string;
  furtherReading: string;
  status: string;
  useWhen: string;
  purposeAndRoot: string;
  issueTreeFirstCut: string;
  evidenceHeading: string;
  evidenceText: string;
  caseSpecificProbes: string;
  suggestedAnswerShape: string;
  gradingFocus: string;
  feedbackNextTest: string;
  structure: {
    branches: FrameworkBranch[];
    drivers: FrameworkDriver[];
    /** Evidence checks; `{company}` is replaced with the case company. */
    evidenceChecks: string[];
    /** The order in which the analysis should be run, written as a clause. */
    analysisOrder: string;
    /** Grading focus restated as guardrails: what to credit and what to penalise. */
    guardrails: string[];
  };
}

export const STRUCTURE_FRAMEWORK_SHARED = {
  howTheAiShouldApply: "First parse the exact decision, company, metric, unit, time horizon and supplied exhibits. Select only branches that can affect that decision; customize leaves to the business model and difficulty. Distinguish facts from assumptions and missing data. Map each material branch to a mechanism, a discriminating test and the direction of its effect. If the prompt only asks for a structure, do not require a final numerical decision.",
  universalMarkingContract: "Score relevant structure, not template mimicry: objective/metric 10%; material issue coverage 35%; causal, non-overlapping logic 25%; evidence or specific tests 20%; prioritization 10%. Calibrate to the case brief and difficulty. Equivalent trees earn full credit if they explain the same decision. Do not invent evidence. For a structure-only prompt, judge the proposed investigation, not a final recommendation. High score: a case-specific, materially complete tree with sound causal mechanics and prioritized tests. Partial score: sound top-level branches but a material driver or unit/evidence link is missing. Low score: generic list, contradictory logic or no path to the decision. Use the same principles at each difficulty, raising expectations for depth and trade-offs at Hard. Do not treat keyword matches as evidence of understanding. An omitted branch is only a defect if it could change the decision in this case. Do not double-penalize one underlying error across coverage and logic. State uncertainty where exhibits do not allow a conclusion.",
  suggestedAnswerFeedbackFormat: "Suggested answer: objective -> 2-4 top branches -> case-specific subdrivers -> evidence/assumptions -> first test or priority. Give a plausible alternative structure when relevant. Feedback: identify what the user covered; name one material missing or weak link; explain why it matters to the decision; give one exact next action or data request. Avoid raw number dumps and generic praise.",
  /** Weights from the Universal Marking Contract, summing to 100. */
  weights: { objectiveMetric: 10, issueCoverage: 35, causalLogic: 25, evidenceTests: 20, prioritization: 10 },
} as const;

export const STRUCTURE_FRAMEWORKS: StructureFramework[] = [...STRUCTURE_FRAMEWORKS_F01_F05, ...STRUCTURE_FRAMEWORKS_F06_F10];

export const STRUCTURE_FRAMEWORK_BY_ID: Record<string, StructureFramework> = Object.fromEntries(STRUCTURE_FRAMEWORKS.map((framework) => [framework.id, framework]));
