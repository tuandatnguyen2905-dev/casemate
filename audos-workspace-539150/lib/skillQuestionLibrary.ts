import { ADVANCED_CASE_DRILL_QUESTIONS } from './advancedCaseDrillQuestions';
import { CHARTS_EASY_CASE_POOL_CASES, CHARTS_EASY_QUESTIONS, validateChartsEasyBank } from './chartsEasyBank';
import { STRUCTURES_EASY_CASE_POOL_CASES, STRUCTURES_EASY_QUESTIONS, validateStructuresEasyBank } from './structuresEasyBank';
import { validateStructureFrameworks } from './structureFrameworkGuides';
import { CASE_JOURNEY_DRILLS, casePoolCaseIdForJourney, validateCaseJourneys } from './caseJourneys';
import { EXPERT_CASE_DRILL_QUESTIONS, EXPERT_DRILL_TYPES } from './expertCaseDrillQuestions';
import { EXPERT_CASE_EXPANSION, upgradeHardQuestions, validateExpertExpansion } from './expertCaseExpansion';
import { HARD_CASE_DRILL_QUESTIONS } from './hardCaseDrillQuestions';
import { CALCULATION_CYCLE_1_QUESTIONS } from './calculationsCycle1';
import { calculationWorkedAnswerFor } from './calculationWorkedAnswers';
import { toleranceRuleText } from './numericUnits';
import { toLearnerFacingQuestion } from './learnerFacingContent';
import { drillEmbeddedOptionProblems, embeddedOptionRepairs } from './casePoolMcqGuard';
import { withStructureGuidance } from './caseJourneyTypes';
import {
  CREATIVITY_CYCLE_2_QUESTIONS,
  CREATIVITY_ROUTED_EXHIBIT_QUESTIONS,
  validateCreativityCycle2,
  type CreativityAnswerField,
  type CreativityCategory,
} from './creativityCycle2';
import {
  MARKET_SIZING_CYCLE_3_QUESTIONS,
  migrateLegacyMarketSizingQuestions,
  validateMarketSizingCycle3,
  type MarketSizingFormat,
} from './marketSizingCycle3';
import {
  MARKET_SIZING_BANK_QUESTIONS,
  validateMarketSizingBank,
  type MarketSizingBankMeta,
} from './marketSizingBank';

export type LibrarySkill = 'charts' | 'structures' | 'calculations' | 'creativity' | 'market-sizing';
export type LibraryDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type LibraryAnswerMode = 'choice' | 'multiple-choice' | 'number' | 'percentage' | 'currency' | 'text';
export type LibraryReviewStatus = 'Draft' | 'Needs Review' | 'Approved' | 'Published' | 'Archived';

export interface ExpertRubricItem {
  criterion: string;
  points: number;
  description: string;
}

export interface ExpertAnswerSections {
  calculation?: string;
  keyObservation?: string;
  keyInsight: string;
  supportingEvidence: string;
  businessImplication: string;
  recommendedAction: string;
}

export interface ExpertScoringHints {
  calculationTerms?: string[];
  insightTerms?: string[];
  evidenceTerms?: string[];
  implicationTerms?: string[];
  actionTerms?: string[];
}
export type ExhibitKind =
  | 'bar'
  | 'vertical-bar'
  | 'horizontal-bar'
  | 'grouped-bar'
  | 'stacked-bar'
  | 'stacked-100'
  | 'line'
  | 'multi-line'
  | 'area'
  | 'stacked-area'
  | 'combo'
  | 'dual-axis'
  | 'waterfall'
  | 'slope'
  | 'pareto'
  | 'scatter'
  | 'bubble'
  | 'histogram'
  | 'heatmap'
  | 'treemap'
  | 'pie'
  | 'donut'
  | 'funnel'
  | 'bullet'
  | 'table'
  | 'financial-table'
  | 'market-sizing-table'
  | 'sensitivity-table'
  | 'kpi-scorecard';

export interface ExhibitSeries {
  name: string;
  values: number[];
  displayValues?: string[];
  xValues?: number[];
  sizes?: number[];
  unit?: string;
  axis?: 'left' | 'right';
  color?: string;
}

export interface LibraryExhibit {
  id?: string;
  datasetId?: string;
  kind: ExhibitKind;
  title: string;
  subtitle?: string;
  unit: string;
  timePeriod?: string;
  categories?: string[];
  series?: ExhibitSeries[];
  rawValues?: number[][];
  displayValues?: string[][];
  axisConfig?: {
    xLabel?: string;
    yLabel?: string;
    rightYLabel?: string;
    min?: number;
    max?: number;
    rightMin?: number;
    rightMax?: number;
  };
  legendConfig?: { show?: boolean; position?: 'top' | 'bottom' | 'right' };
  /**
   * Bubble charts only: the data variable that bubble area represents. Without
   * it the renderer draws uniform-size points rather than imply a meaning.
   */
  sizeConfig?: { label: string; unit?: string };
  /** Structures only: how the exhibit should inform the issue tree (shown with the exhibit, never states the answer). */
  structureRole?: string;
  /** Structures only: which branch the exhibit's figures prioritise (shown after submission). */
  structureEvidence?: string;
  colorConfig?: { palette?: string[] };
  footnote?: string;
  sourceNote?: string;
  analyticalPurpose?: string;
  metrics?: string[];
  periods?: string[];
  mutuallyExclusive?: boolean;
  columns?: string[];
  rows?: string[][];
  labels?: string[];
  values?: number[];
}

export interface LibraryQuestion {
  id: string;
  skill: LibrarySkill;
  difficulty: LibraryDifficulty;
  title: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  answerMode: LibraryAnswerMode;
  numericAnswer?: number;
  numericTolerance?: number;
  answerUnit?: string;
  workingPrompt?: string;
  exhibit?: LibraryExhibit;
  exhibits?: LibraryExhibit[];
  businessContext?: string;
  estimatedMinutes?: number;
  instruction?: string;
  answerFormat?: 'single-choice' | 'multiple-select' | 'numerical' | 'percentage' | 'currency' | 'structured-expert';
  calculationLogic?: string;
  stepByStepSolution?: string[];
  keyInsight?: string;
  commonMistake?: string;
  learningObjective?: string;
  status?: 'published' | 'draft-pending-review';
  reviewStatus?: LibraryReviewStatus;
  clientObjective?: string;
  drillType?: string;
  /** The authored drillType is final; title/question keyword inference must not replace it. */
  drillTypeLocked?: boolean;
  industry?: string;
  businessProblem?: string;
  primarySkill?: string;
  structuredAnswer?: boolean;
  calculationRequired?: boolean;
  evidenceRequired?: number;
  modelAnswerSections?: ExpertAnswerSections;
  scoringRubric?: ExpertRubricItem[];
  alternativeConclusions?: string[];
  personalizedFeedbackTemplate?: string;
  commonMistakes?: string[];
  numericalValidation?: string[];
  recommendedNextDrillId?: string;
  scoringHints?: ExpertScoringHints;
  /** Stable source/version metadata for non-destructive content replacement. */
  sourceCaseId?: string;
  /** Exact published Case Pool record derived from this drill; null means standalone or unpublished. */
  source_case_id?: string | null;
  contentVersion?: string;
  retiredVersion?: string;
  retirementReason?: string;
  calculationAnswerFields?: Array<{ key: 'inputs' | 'working' | 'finalResults' | 'interpretation'; label: string; help: string }>;
  calculationNumericChecks?: Array<{ label: string; value: number; tolerance: number; unit: string }>;
  /** Explicit names and formulas keyed by final-N keep each formula attached to its own result. */
  calculationResultNames?: string[];
  calculationResultFormulas?: Record<string, string[]>;
  /** Plain-English steps per result (keyed final-N), shown only after submission as part of the Worked answer. */
  calculationWorkedSteps?: Record<string, string[]>;
  roundingRule?: string;
  weakAnswerFeedback?: string;
  /** Creativity Cycle 2 category, structured response, and source-rubric metadata. */
  creativityCategory?: CreativityCategory;
  creativityAnswerFields?: CreativityAnswerField[];
  creativityRubricVersion?: string;
  /** Market Sizing Cycle 3 format, evidence labels, and source metadata. */
  marketSizingFormat?: MarketSizingFormat;
  marketSizingRubricVersion?: string;
  marketSizingSuppliedFacts?: string[];
  marketSizingIllustrativeAssumptions?: string[];
  marketSizingSensitivity?: string;
  marketSizingReasonablenessCheck?: string;
  marketSizingOriginal?: boolean;
  /** Market Sizing banks 2-4: label metadata only. The worked solution is revealed after submission. */
  marketSizingBank?: MarketSizingBankMeta;
  /** Case Journey membership. A drill without these is a standalone question. */
  journeyId?: string;
  journeyStage?: number;
  journeyStageRole?: 'Diagnosis' | 'Implication' | 'Decision';
  /** Audit marker for the Easy/Medium reasoning-step calibration. */
  calibrationStatus?: 'revised-v1' | 'already-at-target-v1';
  /** Plain-language definitions for unexplained abbreviations found anywhere in this question. */
  industryTermNotes?: string[];
}

export interface SkillMeta {
  id: LibrarySkill;
  label: string;
  shortLabel: string;
  description: string;
}

export const SKILL_META: SkillMeta[] = [
  { id: 'charts', label: 'Charts', shortLabel: 'Charts', description: 'Read exhibits, calculate what matters, and state the management insight.' },
  { id: 'structures', label: 'Structures', shortLabel: 'Structures', description: 'Build MECE issue trees and choose the right decomposition for the decision.' },
  { id: 'calculations', label: 'Calculations', shortLabel: 'Calculations', description: 'Practise revenue, margin, cost, breakeven, percentage, and growth maths.' },
  { id: 'creativity', label: 'Creativity', shortLabel: 'Creativity', description: 'Choose Product Development, Big Idea and Key Message, IMC Plan, or Activation and Retention. Build a case-grounded mechanism, not novelty for its own sake.' },
  { id: 'market-sizing', label: 'Market Sizing', shortLabel: 'Market Sizing', description: 'Estimate Vietnamese and global markets with explicit assumptions and checks.' },
];

const difficulties: LibraryDifficulty[] = ['easy', 'medium', 'hard'];
const difficultyOf = (index: number): LibraryDifficulty => difficulties[index % difficulties.length];
const round = (value: number, digits = 1): number => Number(value.toFixed(digits));
const pct = (value: number): string => `${round(value, 1)}%`;

function choiceOptions(correct: string, alternatives: string[], offset: number): string[] {
  const values = [correct, ...alternatives.filter((value) => value !== correct)].slice(0, 4);
  const shift = offset % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)];
}

/**
 * First `count` candidate distractors whose value differs from the correct value
 * and from each other, so a computed distractor can never collapse into a
 * duplicate (or a second correct answer) when two error modes land on one figure.
 */
function distinctAlternatives(correctValue: string, candidates: Array<{ value: string; text: string }>, count = 3): string[] {
  const seen = new Set<string>([correctValue]);
  const picked: string[] = [];
  candidates.forEach((candidate) => {
    if (picked.length >= count || seen.has(candidate.value)) return;
    seen.add(candidate.value);
    picked.push(candidate.text);
  });
  return picked;
}

interface LowerTierCalculationCalibration {
  question: string;
  correctAnswer: string;
  explanation: string;
  calculationLogic: string;
  stepByStepSolution: string[];
  keyInsight: string;
  commonMistake: string;
  learningObjective: string;
  workingPrompt: string;
  acceptableAlternatives: string[];
  calculationResultNames: string[];
  calculationResultFormulas: Record<string, string[]>;
  calculationWorkedSteps: Record<string, string[]>;
  exhibit: LibraryExhibit;
}

/**
 * Add one bounded reasoning step to an Easy/Medium calculation without changing
 * its scenario, figures, difficulty, stable id, or numerical grading target.
 */
function calibrateLowerTierCalculation(
  question: LibraryQuestion,
  calibration: LowerTierCalculationCalibration,
): LibraryQuestion {
  if (question.difficulty === 'hard' || question.difficulty === 'expert') {
    return { ...question, calculationWorkedSteps: { 'final-1': calibration.calculationWorkedSteps['final-1'] } };
  }
  const easy = question.difficulty === 'easy';
  return {
    ...question,
    ...calibration,
    alternativeConclusions: calibration.acceptableAlternatives,
    estimatedMinutes: easy ? 5 : 6,
    answerFormat: 'numerical',
    calibrationStatus: 'revised-v1',
    scoringRubric: [
      {
        criterion: 'Core calculation',
        points: easy ? 60 : 45,
        description: 'Uses the supplied figures and correct units to reach the required numerical answer.',
      },
      {
        criterion: 'Comparison or second step',
        points: easy ? 25 : 35,
        description: 'Completes the explicit comparison or linked calculation instead of stopping at the first value.',
      },
      {
        criterion: 'Immediate implication',
        points: easy ? 15 : 20,
        description: 'States the direct business implication supported by the calculated result without adding unseen assumptions.',
      },
    ],
  };
}

const businesses = [
  ['Lotus Mart', 'Vietnamese grocery retailer'],
  ['Mekong Mobile', 'Consumer electronics chain'],
  ['Saigon Sip', 'Ready-to-drink beverage brand'],
  ['Northstar Bank', 'Retail bank'],
  ['Harbor Health', 'Private clinic network'],
  ['GreenRide', 'Electric mobility platform'],
  ['CloudDesk', 'B2B software company'],
  ['SwiftShip', 'Parcel delivery operator'],
  ['BrightHome', 'Home appliance manufacturer'],
  ['Urban Bowl', 'Quick-service restaurant chain'],
  ['LearnLoop', 'Online education platform'],
  ['VietHarvest', 'Packaged food producer'],
  ['NovaTel', 'Telecommunications provider'],
  ['Sunrise Hotels', 'Regional hotel group'],
  ['CarePlus', 'Pharmacy chain'],
  ['OceanPay', 'Digital payments provider'],
  ['FreshCart', 'Online grocery marketplace'],
  ['BuildRight', 'Construction materials producer'],
  ['AeroAsia', 'Regional airline'],
  ['EcoPack', 'Sustainable packaging supplier'],
] as const;

function buildCalculations(): LibraryQuestion[] {
  return businesses.flatMap(([company, industry], companyIndex) => {
    const revenue = 120 + companyIndex * 17;
    const margin = 28 + (companyIndex % 8) * 3;
    const fixedCost = 18 + companyIndex * 2;
    const costBase = 70 + companyIndex * 9;
    const questions: LibraryQuestion[] = [];

    const growth = 6 + (companyIndex % 7) * 2;
    const nextRevenue = round(revenue * (1 + growth / 100), 1);
    const tenPercentPlan = round(revenue * 1.1, 1);
    const tenPercentGap = round(nextRevenue - tenPercentPlan, 1);
    const tenPercentComparison = tenPercentGap > 0 ? 'above' : tenPercentGap < 0 ? 'below' : 'equal to';
    const tenPercentConclusion = tenPercentGap > 0
      ? `Exceeds the 10% plan by VND ${tenPercentGap} billion.`
      : tenPercentGap < 0
        ? `Misses the 10% plan by VND ${Math.abs(tenPercentGap)} billion.`
        : 'Matches the 10% plan exactly.';
    const tenPercentGapNote = tenPercentGap > 0
      ? 'A positive gap means the forecast is above plan.'
      : tenPercentGap < 0
        ? 'A negative gap means the forecast falls short of plan.'
        : 'A zero gap means the forecast matches the plan.';
    questions.push(calibrateLowerTierCalculation({
      id: `calculations-${String(companyIndex * 5 + 1).padStart(3, '0')}`,
      skill: 'calculations',
      difficulty: difficultyOf(companyIndex * 5),
      title: `${company} Revenue Growth`,
      question: `${company}, a ${industry}, generated VND ${revenue} billion of revenue last year. Management expects revenue to grow by ${growth}%. What revenue should it plan for next year?`,
      options: choiceOptions(`VND ${nextRevenue} billion`, [`VND ${round(revenue + growth, 1)} billion`, `VND ${round(revenue * (1 + growth / 10), 1)} billion`, `VND ${round(revenue / (1 - growth / 100), 1)} billion`], companyIndex),
      correctAnswer: `VND ${nextRevenue} billion`,
      explanation: `Multiply VND ${revenue} billion by 1 + ${growth}%: ${revenue} × ${(1 + growth / 100).toFixed(2)} = VND ${nextRevenue} billion.`,
      answerMode: 'number', numericAnswer: nextRevenue, numericTolerance: 0.2, answerUnit: 'VND Billion',
      workingPrompt: 'Show The Growth Multiplier And Final Revenue.',
    }, {
      exhibit: {
        kind: 'table',
        title: `${company} - Growth Plan Inputs`,
        unit: 'VND billion',
        columns: ['Planning input', 'Value'],
        rows: [
          ['Last-year revenue', String(revenue)],
          ['Forecast growth', `${growth}%`],
          ['Planning benchmark', '10% growth'],
        ],
      },
      question: `${company}, a ${industry}, generated VND ${revenue} billion of revenue last year. Management expects revenue to grow by ${growth}%. What revenue should it plan for next year, and how does that compare with a 10% growth plan?`,
      correctAnswer: `VND ${nextRevenue} billion; ${tenPercentGap === 0 ? 'equal to' : `VND ${Math.abs(tenPercentGap)} billion ${tenPercentComparison}`} the 10% plan of VND ${tenPercentPlan} billion`,
      explanation: `The forecast is ${revenue} × ${(1 + growth / 100).toFixed(2)} = VND ${nextRevenue} billion. A 10% plan would be ${revenue} × 1.10 = VND ${tenPercentPlan} billion, so the forecast is ${tenPercentGap === 0 ? 'exactly equal to' : `VND ${Math.abs(tenPercentGap)} billion ${tenPercentComparison}`} that benchmark. Management should plan capacity and spending around the forecast rather than assume the benchmark was met.`, 
      calculationLogic: 'Apply the forecast growth multiplier, calculate the 10% benchmark from the same base, then compare the two values.',
      stepByStepSolution: [
        `Forecast revenue = ${revenue} × ${(1 + growth / 100).toFixed(2)} = VND ${nextRevenue} billion.`,
        `10% plan = ${revenue} × 1.10 = VND ${tenPercentPlan} billion.`,
        `Gap = ${nextRevenue} − ${tenPercentPlan} = VND ${tenPercentGap} billion, so the forecast is ${tenPercentComparison} plan.`,
      ],
      keyInsight: 'A forecast value is more decision-useful when compared with the explicit planning benchmark.',
      commonMistake: 'Adding the percentage number directly to revenue or comparing against the wrong base year.',
      learningObjective: 'Calculate forecast revenue and make one direct benchmark comparison from the same visible inputs.',
      workingPrompt: 'Show The Forecast, The 10% Benchmark, And The Gap Between Them.',
      acceptableAlternatives: [
        `Revenue plan: VND ${nextRevenue} billion; variance to 10% plan: VND ${tenPercentGap} billion.`,
        tenPercentConclusion,
      ],
      calculationResultNames: [`${company} Forecast Revenue`, `${company} Variance to 10% Plan`],
      calculationResultFormulas: {
        'final-1': [`${revenue} × ${(1 + growth / 100).toFixed(2)} = ${nextRevenue}`],
        'final-2': [`${nextRevenue} − ${tenPercentPlan} = ${tenPercentGap}`],
      },
      calculationWorkedSteps: {
        'final-1': [
          `Turn the ${growth}% growth into a multiplier: 1 + ${growth}% = ${(1 + growth / 100).toFixed(2)}.`,
          `Multiply last year's revenue by that multiplier: ${revenue} × ${(1 + growth / 100).toFixed(2)} = VND ${nextRevenue} billion.`,
        ],
        'final-2': [
          `Work out what a 10% growth plan would give: ${revenue} × 1.10 = VND ${tenPercentPlan} billion.`,
          `Subtract the plan from your forecast: ${nextRevenue} − ${tenPercentPlan} = ${tenPercentGap}. ${tenPercentGapNote}`,
        ],
      },
    }));

    const opex = 14 + (companyIndex % 6) * 2;
    const grossProfit = revenue * margin / 100;
    const operatingProfit = round(grossProfit - opex, 1);
    const operatingMargin = round(operatingProfit / revenue * 100, 1);
    questions.push(calibrateLowerTierCalculation({
      id: `calculations-${String(companyIndex * 5 + 2).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 1), title: `${company} Operating Profit`,
      question: `${company} has revenue of VND ${revenue} billion, a gross margin of ${margin}%, and operating expenses of VND ${opex} billion. What is operating profit?`,
      options: choiceOptions(`VND ${operatingProfit} billion`, [`VND ${round(grossProfit, 1)} billion`, `VND ${round(revenue - opex, 1)} billion`, `VND ${round(revenue * (margin - opex) / 100, 1)} billion`], companyIndex + 1),
      correctAnswer: `VND ${operatingProfit} billion`,
      explanation: `Gross profit is ${revenue} × ${margin}% = VND ${round(grossProfit, 1)} billion. Subtract VND ${opex} billion of operating expenses to get VND ${operatingProfit} billion.`,
      answerMode: 'number', numericAnswer: operatingProfit, numericTolerance: 0.2, answerUnit: 'VND Billion',
      workingPrompt: 'Calculate Gross Profit First, Then Subtract Operating Expenses.',
    }, {
      exhibit: {
        kind: 'table',
        title: `${company} - Profit Inputs`,
        unit: 'VND billion unless noted',
        columns: ['Metric', 'Value'],
        rows: [
          ['Revenue', String(revenue)],
          ['Gross margin', `${margin}%`],
          ['Operating expenses', String(opex)],
        ],
      },
      question: `${company} has revenue of VND ${revenue} billion, a gross margin of ${margin}%, and operating expenses of VND ${opex} billion. What are operating profit and operating margin?`,
      correctAnswer: `VND ${operatingProfit} billion operating profit; ${operatingMargin}% operating margin`,
      explanation: `Gross profit is ${revenue} × ${margin}% = VND ${round(grossProfit, 1)} billion. After subtracting VND ${opex} billion of operating expenses, operating profit is VND ${operatingProfit} billion. Dividing by revenue gives an operating margin of ${operatingProfit} ÷ ${revenue} = ${operatingMargin}%, which shows how much revenue remains after both cost layers.`,
      calculationLogic: 'Calculate gross profit, subtract operating expenses, then divide operating profit by revenue.',
      stepByStepSolution: [
        `Gross profit = ${revenue} × ${margin}% = VND ${round(grossProfit, 1)} billion.`,
        `Operating profit = ${round(grossProfit, 1)} − ${opex} = VND ${operatingProfit} billion.`,
        `Operating margin = ${operatingProfit} ÷ ${revenue} = ${operatingMargin}%.`,
      ],
      keyInsight: 'Absolute profit and operating margin answer different questions: value created and efficiency of each revenue dong.',
      commonMistake: 'Reporting gross profit as operating profit or dividing by gross profit instead of revenue.',
      learningObjective: 'Link a two-step profit calculation to the resulting operating margin.',
      workingPrompt: 'Calculate Gross Profit, Operating Profit, Then Operating Margin.',
      acceptableAlternatives: [
        `Operating profit: VND ${operatingProfit} billion; margin: ${operatingMargin}%.`,
        `${operatingMargin}% of revenue remains as operating profit, equal to VND ${operatingProfit} billion.`,
      ],
      calculationResultNames: [`${company} Operating Profit`, `${company} Operating Margin`],
      calculationResultFormulas: {
        'final-1': [`(${revenue} × ${margin}%) − ${opex} = ${operatingProfit}`],
        'final-2': [`${operatingProfit} ÷ ${revenue} × 100 = ${operatingMargin}%`],
      },
      calculationWorkedSteps: {
        'final-1': [
          `Gross profit is the part of revenue left after the direct cost of sales: ${revenue} × ${margin}% = VND ${round(grossProfit, 1)} billion.`,
          `Operating profit also takes off the running costs: ${round(grossProfit, 1)} − ${opex} = VND ${operatingProfit} billion.`,
        ],
        'final-2': [
          'Operating margin shows how much of every dong of revenue is left as operating profit.',
          `Divide operating profit by revenue and multiply by 100 to get a percentage: ${operatingProfit} ÷ ${revenue} × 100 = ${operatingMargin}%.`,
        ],
      },
    }));

    const contribution = 30 + (companyIndex % 6) * 5;
    const breakEvenUnits = round((fixedCost * 1000) / contribution, 0);
    const availableCapacity = Math.ceil(breakEvenUnits * 1.15 / 10) * 10;
    const capacityBuffer = availableCapacity - breakEvenUnits;
    const capacityBufferPct = round(capacityBuffer / breakEvenUnits * 100, 1);
    questions.push(calibrateLowerTierCalculation({
      id: `calculations-${String(companyIndex * 5 + 3).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 2), title: `${company} Breakeven Volume`,
      question: `${company} is considering a new offer with fixed costs of VND ${fixedCost} million and contribution of VND ${contribution} thousand per sale. How many sales are required to break even?`,
      options: choiceOptions(`Sales: ${breakEvenUnits.toLocaleString()}`, [`Sales: ${Math.round(breakEvenUnits / 10).toLocaleString()}`, `Sales: ${Math.round(breakEvenUnits * 1.2).toLocaleString()}`, `Sales: ${Math.round((fixedCost * 1000) / (contribution + 10)).toLocaleString()}`], companyIndex + 2),
      correctAnswer: `Sales: ${breakEvenUnits.toLocaleString()}`,
      explanation: `Convert fixed costs to VND ${fixedCost * 1000} thousand, then divide by VND ${contribution} thousand contribution per sale: ${fixedCost * 1000} ÷ ${contribution} = ${breakEvenUnits.toLocaleString()} sales.`,
      answerMode: 'number', numericAnswer: breakEvenUnits, numericTolerance: 1, answerUnit: 'Sales',
      workingPrompt: 'Align The Units Before Dividing Fixed Cost By Contribution.',
    }, {
      exhibit: {
        kind: 'table',
        title: `${company} - Breakeven Inputs`,
        unit: 'As labelled',
        columns: ['Input', 'Value'],
        rows: [
          ['Fixed costs', `VND ${fixedCost} million`],
          ['Contribution per sale', `VND ${contribution} thousand`],
          ['Available capacity', `${availableCapacity.toLocaleString()} sales`],
        ],
      },
      question: `${company} is considering a new offer with fixed costs of VND ${fixedCost} million and contribution of VND ${contribution} thousand per sale. How many sales are required to break even, and what buffer remains if capacity is ${availableCapacity.toLocaleString()} sales?`,
      correctAnswer: `${breakEvenUnits.toLocaleString()} sales to break even; ${capacityBuffer.toLocaleString()} sales of capacity remain (${capacityBufferPct}% above breakeven)`,
      explanation: `Fixed costs are VND ${fixedCost * 1000} thousand, so breakeven is ${fixedCost * 1000} ÷ ${contribution} = ${breakEvenUnits.toLocaleString()} sales. Capacity of ${availableCapacity.toLocaleString()} leaves a ${capacityBuffer.toLocaleString()}-sale buffer, or ${capacityBufferPct}% of breakeven volume. The offer is operationally feasible at breakeven, but the buffer is the immediate limit on upside or forecast error.`,
      calculationLogic: 'Align units, divide fixed cost by contribution per sale, then compare the result with available capacity.',
      stepByStepSolution: [
        `Convert fixed costs: VND ${fixedCost} million = VND ${fixedCost * 1000} thousand.`,
        `Breakeven sales = ${fixedCost * 1000} ÷ ${contribution} = ${breakEvenUnits.toLocaleString()}.`,
        `Capacity buffer = ${availableCapacity.toLocaleString()} − ${breakEvenUnits.toLocaleString()} = ${capacityBuffer.toLocaleString()} sales, equal to ${capacityBufferPct}% of breakeven volume.`,
      ],
      keyInsight: 'Breakeven establishes viability; comparing it with capacity shows whether the plan has room for execution error or growth.',
      commonMistake: 'Mixing million and thousand VND, or treating total capacity as the buffer.',
      learningObjective: 'Calculate breakeven volume and make one direct capacity comparison.',
      workingPrompt: 'Align Units, Calculate Breakeven, Then Calculate The Capacity Buffer.',
      acceptableAlternatives: [
        `Breakeven: ${breakEvenUnits.toLocaleString()} sales; spare capacity: ${capacityBuffer.toLocaleString()} sales.`,
        `Capacity is ${capacityBufferPct}% above the breakeven requirement.`,
      ],
      calculationResultNames: [`${company} Breakeven Sales`, `${company} Capacity Buffer`],
      calculationResultFormulas: {
        'final-1': [`${fixedCost * 1000} ÷ ${contribution} = ${breakEvenUnits.toLocaleString()}`],
        'final-2': [`${availableCapacity.toLocaleString()} − ${breakEvenUnits.toLocaleString()} = ${capacityBuffer.toLocaleString()}`],
      },
      calculationWorkedSteps: {
        'final-1': [
          `The fixed cost is in millions and the contribution is in thousands, so put them in the same unit first: VND ${fixedCost} million = VND ${fixedCost * 1000} thousand.`,
          `Each sale covers VND ${contribution} thousand of the fixed cost, so divide: ${fixedCost * 1000} ÷ ${contribution} = ${breakEvenUnits.toLocaleString()} sales.`,
        ],
        'final-2': [
          `Capacity is ${availableCapacity.toLocaleString()} sales and break-even needs ${breakEvenUnits.toLocaleString()} of them.`,
          `The buffer is what is left over: ${availableCapacity.toLocaleString()} − ${breakEvenUnits.toLocaleString()} = ${capacityBuffer.toLocaleString()} sales.`,
        ],
      },
    }));

    const priceIncrease = 5 + (companyIndex % 5) * 2;
    const volumeDecline = 2 + (companyIndex % 4);
    const revenueChange = round((1 + priceIncrease / 100) * (1 - volumeDecline / 100) * 100 - 100, 1);
    questions.push({
      id: `calculations-${String(companyIndex * 5 + 4).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 3), title: `${company} Price–Volume Impact`,
      question: `${company} raises price by ${priceIncrease}% and expects unit volume to decline by ${volumeDecline}%. What is the resulting percentage change in revenue?`,
      options: choiceOptions(`Revenue Change: ${pct(revenueChange)}`, [`Revenue Change: ${pct(priceIncrease - volumeDecline)}`, `Revenue Change: ${pct(priceIncrease + volumeDecline)}`, `Revenue Change: ${pct(-volumeDecline)}`], companyIndex + 3),
      correctAnswer: `Revenue Change: ${pct(revenueChange)}`,
      explanation: `Use multiplicative effects: ${(1 + priceIncrease / 100).toFixed(2)} × ${(1 - volumeDecline / 100).toFixed(2)} − 1 = ${pct(revenueChange)}. Adding the percentages misses the interaction term.`,
      answerMode: 'number', numericAnswer: revenueChange, numericTolerance: 0.15, answerUnit: 'Percent',
      workingPrompt: 'Use A Price Multiplier Times A Volume Multiplier.',
      calculationResultNames: [`${company} Revenue Change`],
      calculationResultFormulas: { 'final-1': [`(${(1 + priceIncrease / 100).toFixed(2)} × ${(1 - volumeDecline / 100).toFixed(2)} − 1) × 100 = ${revenueChange}%`] },
      calculationWorkedSteps: {
        'final-1': [
          `A ${priceIncrease}% price rise means each unit sells for ${(1 + priceIncrease / 100).toFixed(2)} times the old price.`,
          `A ${volumeDecline}% fall in volume means ${(1 - volumeDecline / 100).toFixed(2)} times as many units are sold.`,
          `Revenue is price × volume, so multiply the two: ${(1 + priceIncrease / 100).toFixed(2)} × ${(1 - volumeDecline / 100).toFixed(2)} = ${((1 + priceIncrease / 100) * (1 - volumeDecline / 100)).toFixed(4)}.`,
          `Subtract 1 and multiply by 100 to turn it into a percentage change: ${revenueChange}%. Adding the two percentages would miss the way they multiply together.`,
        ],
      },
    });

    const addressableShare = 20 + (companyIndex % 5) * 5;
    const savingRate = 8 + (companyIndex % 6) * 2;
    const savings = round(costBase * addressableShare / 100 * savingRate / 100, 2);
    questions.push({
      id: `calculations-${String(companyIndex * 5 + 5).padStart(3, '0')}`,
      skill: 'calculations', difficulty: difficultyOf(companyIndex * 5 + 4), title: `${company} Cost-Savings Opportunity`,
      question: `${company} has a VND ${costBase} billion cost base. Procurement represents ${addressableShare}% of costs, and a sourcing programme can reduce procurement spend by ${savingRate}%. What annual savings should management expect?`,
      options: choiceOptions(`VND ${savings} billion`, [`VND ${round(costBase * savingRate / 100, 2)} billion`, `VND ${round(costBase * addressableShare / 100, 2)} billion`, `VND ${round(costBase * (addressableShare + savingRate) / 100, 2)} billion`], companyIndex + 4),
      correctAnswer: `VND ${savings} billion`,
      explanation: `Apply both percentages to the cost base: ${costBase} × ${addressableShare}% × ${savingRate}% = VND ${savings} billion.`,
      answerMode: 'number', numericAnswer: savings, numericTolerance: 0.03, answerUnit: 'VND Billion',
      workingPrompt: 'Isolate Addressable Spend, Then Apply The Saving Rate.',
      calculationResultNames: [`${company} Annual Procurement Savings`],
      calculationResultFormulas: { 'final-1': [`${costBase} × ${addressableShare}% × ${savingRate}% = ${savings}`] },
      calculationWorkedSteps: {
        'final-1': [
          `Only part of the cost base can be saved. Procurement is ${addressableShare}% of VND ${costBase} billion: ${costBase} × ${addressableShare}% = VND ${round(costBase * addressableShare / 100, 2)} billion.`,
          `The sourcing programme cuts that spend by ${savingRate}%: ${round(costBase * addressableShare / 100, 2)} × ${savingRate}% = VND ${savings} billion saved each year.`,
        ],
      },
    });
    return questions;
  });
}

const chartContexts = [
  'Retail Channels', 'Product Segments', 'Customer Cohorts', 'Vietnamese Regions', 'Store Formats',
  'Digital Products', 'Delivery Routes', 'Hotel Markets', 'Banking Products', 'Clinic Services',
  'Mobility Modes', 'Software Plans', 'Food Categories', 'Telecom Packages', 'Pharmacy Categories',
  'Payment Methods', 'Grocery Missions', 'Building Materials', 'Airline Routes', 'Packaging Materials',
  'Sales Territories', 'Factory Lines', 'Restaurant Dayparts', 'Education Courses', 'Energy Sources',
];

const chartContextSingulars = [
  'Retail Channel', 'Product Segment', 'Customer Cohort', 'Vietnamese Region', 'Store Format',
  'Digital Product', 'Delivery Route', 'Hotel Market', 'Banking Product', 'Clinic Service',
  'Mobility Mode', 'Software Plan', 'Food Category', 'Telecom Package', 'Pharmacy Category',
  'Payment Method', 'Grocery Mission', 'Building Material', 'Airline Route', 'Packaging Material',
  'Sales Territory', 'Factory Line', 'Restaurant Daypart', 'Education Course', 'Energy Source',
];

const chartPatterns = [
  { name: 'Ascending', offsets: [-0.45, -0.15, 0.25, 0.65], implication: 'Performance Builds Steadily Toward The Later Categories' },
  { name: 'Descending', offsets: [0.65, 0.25, -0.15, -0.45], implication: 'Performance Is Front-Loaded And Tapers Across The Categories' },
  { name: 'Bell Curve', offsets: [-0.45, 0.35, 0.55, -0.35], implication: 'The Middle Categories Form The Strongest Cluster' },
  { name: 'Bimodal', offsets: [0.55, -0.35, -0.25, 0.65], implication: 'Two Separated Peaks Indicate A Polarised Result' },
  { name: 'Uniform', offsets: [-0.05, 0.05, -0.03, 0.03], implication: 'Performance Is Distributed Almost Evenly' },
  { name: 'Right-Skewed', offsets: [0.8, 0.2, -0.15, -0.45], implication: 'One Leading Category Is Followed By A Long Tail' },
] as const;

const compositionPatterns = [
  { values: [10, 18, 29, 43], implication: 'The Mix Rises Toward The Later Categories' },
  { values: [43, 29, 18, 10], implication: 'The Mix Is Concentrated In The Earlier Categories' },
  { values: [12, 38, 37, 13], implication: 'The Two Middle Categories Dominate The Mix' },
  { values: [37, 13, 14, 36], implication: 'The Mix Is Polarised Between The Two End Categories' },
  { values: [24, 26, 25, 25], implication: 'The Mix Is Balanced Across All Four Categories' },
  { values: [58, 22, 12, 8], implication: 'The Leading Category Dominates While The Remaining Categories Form A Long Tail' },
] as const;

function patternedValues(base: number, spread: number, patternIndex: number): number[] {
  return chartPatterns[patternIndex % chartPatterns.length].offsets.map((offset) => round(base + offset * spread, 0));
}

function buildCharts(): LibraryQuestion[] {
  return chartContexts.flatMap((context, contextIndex) => {
    const base = 30 + contextIndex * 3;
    const singular = chartContextSingulars[contextIndex];
    const labels = ['A', 'B', 'C', 'D'].map((suffix) => `${singular} ${suffix}`);
    const contextNoun = context.toLowerCase().replace('vietnamese', 'Vietnamese');
    const labelIntro = `${labels[0]}, ${labels[1]}, ${labels[2]} and ${labels[3]} are four distinct ${contextNoun}`;
    const barPatternIndex = contextIndex % chartPatterns.length;
    const linePatternIndex = (contextIndex + 2) % chartPatterns.length;
    const compositionPatternIndex = (contextIndex + 4) % compositionPatterns.length;
    const barPattern = chartPatterns[barPatternIndex];
    const linePattern = chartPatterns[linePatternIndex];
    const compositionPattern = compositionPatterns[compositionPatternIndex];
    const barValues = patternedValues(base, 24, barPatternIndex);
    const maxBar = Math.max(...barValues);
    const maxBarLabel = labels[barValues.indexOf(maxBar)];
    const lineValues = patternedValues(80 + contextIndex * 4, 44, linePatternIndex);
    const totalChange = round((lineValues[3] / lineValues[0] - 1) * 100, 1);
    const pieValues = [...compositionPattern.values];
    const tableRows = labels.map((label, index) => {
      const revenue = base + index * 9;
      const marginValue = 18 + ((contextIndex + index * 3) % 13);
      return [label, String(revenue), `${marginValue}%`, String(round(revenue * marginValue / 100, 1))];
    });
    const highestProfitRow = tableRows.reduce((best, row) => Number(row[3]) > Number(best[3]) ? row : best, tableRows[0]);
    const yearFourBase = pct(round((lineValues[3] - lineValues[0]) / lineValues[3] * 100, 1));
    const firstInterval = pct(round((lineValues[1] / lineValues[0] - 1) * 100, 1));
    const indexPoints = pct(lineValues[3] - lineValues[0]);
    const evenSpread = pct(round(totalChange / 3, 1));
    const lastInterval = pct(round((lineValues[3] / lineValues[2] - 1) * 100, 1));
    const lineAlternatives = distinctAlternatives(pct(totalChange), [
      { value: yearFourBase, text: `Change: ${yearFourBase}; Uses Year 4 As The Denominator` },
      { value: firstInterval, text: `Change: ${firstInterval}; Measures Only The First Interval` },
      { value: indexPoints, text: `Change: ${indexPoints}; Treats Index Points As Percentage Growth` },
      { value: evenSpread, text: `Change: ${evenSpread}; Divides The Total Change By Three Instead Of Compounding` },
      { value: lastInterval, text: `Change: ${lastInterval}; Measures Only The Last Interval` },
    ]);
    const pieCombined = pieValues[0] + pieValues[1];
    const pieAlternatives = distinctAlternatives(`${pieCombined}%`, [
      { value: `${pieValues[0]}%`, text: `Combined Share: ${pieValues[0]}%; Uses ${labels[0]} Without Adding ${labels[1]}` },
      { value: `${100 - pieCombined}%`, text: `Combined Share: ${100 - pieCombined}%; Uses The Complement Of ${labels[0]} And ${labels[1]}` },
      { value: `${Math.abs(pieValues[0] - pieValues[1])}%`, text: `Combined Share: ${Math.abs(pieValues[0] - pieValues[1])}%; Uses The Difference Between ${labels[0]} And ${labels[1]}` },
      { value: `${pieValues[0] + pieValues[2]}%`, text: `Combined Share: ${pieValues[0] + pieValues[2]}%; Adds ${labels[0]} And ${labels[2]} Instead Of ${labels[1]}` },
      { value: `${pieValues[1] + pieValues[2]}%`, text: `Combined Share: ${pieValues[1] + pieValues[2]}%; Adds ${labels[1]} And ${labels[2]} Instead Of ${labels[0]}` },
    ]);
    const firstId = contextIndex * 4 + 1;
    return [
      {
        id: `charts-${String(firstId).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId - 1),
        title: `${context} Performance Comparison`,
        question: `Which category leads the exhibit, and what should management investigate before reallocating resources toward it?`,
        options: choiceOptions(`${maxBarLabel}; Validate Whether Its Lead Is Sustainable And Profitable`, labels.filter((label) => label !== maxBarLabel).map((label) => `${label}; Validate Whether Its Lead Is Sustainable And Profitable`), contextIndex),
        correctAnswer: `${maxBarLabel}; Validate Whether Its Lead Is Sustainable And Profitable`,
        explanation: `${maxBarLabel} has the highest value at ${maxBar}. The exhibit follows a ${barPattern.name.toLowerCase()} distribution: ${barPattern.implication.toLowerCase()}. A consultant should verify margin, growth durability, and capacity before recommending reallocation.`,
        answerMode: 'choice' as const,
        businessContext: `${labelIntro}; the exhibit gives each one's current performance index and does not describe them further.`,
        exhibit: { kind: 'bar' as const, title: `${context} - Current Performance Index`, unit: 'Performance index', labels, values: barValues },
      },
      {
        id: `charts-${String(firstId + 1).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId),
        title: `${context} Four-Year Trend`,
        question: `What is the total change from Year 1 to Year 4, and what is the clearest implication?`,
        options: choiceOptions(`Change: ${pct(totalChange)}; ${linePattern.implication}`, lineAlternatives, contextIndex + 1),
        correctAnswer: `Change: ${pct(totalChange)}; ${linePattern.implication}`,
        explanation: `Total change is (${lineValues[3]} ÷ ${lineValues[0]} − 1) × 100 = ${pct(totalChange)}. The ${linePattern.name.toLowerCase()} shape shows that ${linePattern.implication.toLowerCase()}, so management should investigate the underlying drivers rather than infer a constant trend.`,
        answerMode: 'choice' as const,
        businessContext: `The exhibit plots a single yearly performance index for ${contextNoun} over Year 1 to Year 4; it does not describe how the index is built.`,
        exhibit: { kind: 'line' as const, title: `${context} - Yearly Performance Index`, unit: 'Performance index', labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], values: lineValues },
      },
      {
        id: `charts-${String(firstId + 2).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId + 1),
        title: `${context} Mix Analysis`,
        question: `What share do ${labels[0]} and ${labels[1]} represent together, and what does the distribution imply?`,
        options: choiceOptions(`Combined Share: ${pieValues[0] + pieValues[1]}%; ${compositionPattern.implication}`, pieAlternatives, contextIndex + 2),
        correctAnswer: `Combined Share: ${pieValues[0] + pieValues[1]}%; ${compositionPattern.implication}`,
        explanation: `Add ${labels[0]} (${pieValues[0]}%) and ${labels[1]} (${pieValues[1]}%) to get ${pieValues[0] + pieValues[1]}%. ${compositionPattern.implication}.`,
        answerMode: 'choice' as const,
        businessContext: `${labelIntro}; each slice shows one of them as a percentage of the combined total of the four, and the exhibit does not describe them further.`,
        exhibit: { kind: 'pie' as const, title: `${context} - Share Of Combined Total`, unit: 'Percent of combined total', labels, values: pieValues },
      },
      {
        id: `charts-${String(firstId + 3).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId + 2),
        title: `${context} Profitability Table`,
        question: `Which category generates the highest absolute profit, and which two figures support your answer?`,
        options: choiceOptions(`${highestProfitRow[0]}; Revenue ${highestProfitRow[1]} And Margin ${highestProfitRow[2]}`, tableRows.filter((row) => row !== highestProfitRow).map((row) => `${row[0]}; Revenue ${row[1]} And Margin ${row[2]}`), contextIndex + 3),
        correctAnswer: `${highestProfitRow[0]}; Revenue ${highestProfitRow[1]} And Margin ${highestProfitRow[2]}`,
        explanation: `Absolute profit equals revenue multiplied by margin. ${highestProfitRow[0]} produces VND ${highestProfitRow[3]} billion of profit, the highest value in the final column.`,
        answerMode: 'choice' as const,
        businessContext: `${labelIntro}; the exhibit gives each one's revenue, margin and profit (revenue × margin, in VND billion) and does not describe them further.`,
        exhibit: { kind: 'table' as const, title: `${context} - Revenue And Profitability`, unit: 'Revenue and profit in VND billion; margin in percent', columns: [singular, 'Revenue (VND billion)', 'Margin', 'Profit (VND billion)'], rows: tableRows },
      },
    ];
  });
}

const structureObjectives = [
  { title: 'Profit Decline', prompt: 'Profit has fallen for two years. Which issue tree is the strongest starting point?', correct: 'Revenue: Price, Volume, And Mix; Costs: Fixed And Variable; Then Segment By Product, Customer, Channel, And Geography', alternatives: ['Revenue: Product Lines And Regions; Costs: Departments And Projects; Then Rank The Largest Variances Against Budget', 'Market: Customers And Competitors; Company: Sales And Operations; Then Compare Performance With Peers', 'Profit: Margin And Volume; Costs: Fixed And Variable; Then Review Each Cost Line Against Last Year'], explanation: 'Start with the profit equation, keep revenue and cost branches mutually exclusive, then segment the drivers to locate the source of deterioration. The other trees are plausible but incomplete: cutting revenue by product and region mixes drivers with segments and never separates price, volume and mix; a market-and-company tree looks outward at peers without isolating the profit equation; and a margin-and-volume split overlaps with the cost branches.' },
  { title: 'Market Entry', prompt: 'The client is considering entering a new market. Which structure best supports the decision?', correct: 'Market Attractiveness; Ability To Win; Entry Economics; Entry Mode And Risks', alternatives: ['Customer Need; Competitor Offers; Product Positioning; Launch Communications And Sales Targets', 'Revenue Potential; Operating Costs; Investment Requirement; Payback And Return Thresholds', 'Market Size And Growth; Company Capabilities; Partner Shortlist; Preferred Entry Mode And Timeline'], explanation: 'A complete entry structure tests whether the market is attractive, whether the client can win, whether returns clear the hurdle, and how to enter safely. The other trees each cover only part of that decision: the customer-and-competitor tree is a launch plan that never sizes the market or tests returns; the financial tree covers revenue, cost and investment but not whether the client can win or how to enter; and the capability-and-partner tree reaches an entry mode without testing attractiveness, economics or downside risk.' },
  { title: 'Growth Strategy', prompt: 'The client wants to double revenue in three years. For reference, the core means the existing customers, products and markets of the business, and an adjacency means a new customer group, product or geography next to them. Which decomposition is most decision-useful?', correct: 'Grow The Core; Expand Into Adjacent Customers, Products, And Geographies; Build New Businesses; Test Enablers And Economics', alternatives: ['Organic Growth; Acquisitions; Partnerships; Revenue Pool Sizing By Route', 'Price Increase; Sales Expansion; Product Launches; Largest Opportunities By Revenue Potential', 'New Products; New Markets; New Channels; Plan By Quarter And Owner'], explanation: 'The structure separates core growth, adjacencies, and new businesses while testing capabilities and economics, making the options MECE and actionable. The other trees fall short: a route-based tree ranks how to grow without decomposing the revenue pools behind each route; price, sales and launch levers overlap and can double-count the same opportunity; and a products-markets-channels list skips the health of the core business and the capacity to deliver.' },
  { title: 'Operations Bottleneck', prompt: 'Service levels are worsening despite stable demand. Which issue tree should the team use?', correct: 'Demand Pattern; Process Capacity By Step; Labour And Asset Availability; Scheduling And Variability; Quality And Rework', alternatives: ['Service Revenue; Delivery Cost; Customer Satisfaction; Complaint Volumes; Metric Trends By Month', 'People Capacity; Technology Capacity; Supplier Capacity; Utilisation By Resource; Queue Length By Step', 'Customer Segments; Channel Mix; Brand Promise; Offer Design; Pricing Position'], explanation: 'A bottleneck diagnosis follows demand through each process step, then tests capacity, availability, variability, and rework as distinct root causes. The other trees do not trace the process: a revenue-cost-satisfaction tree tracks outcome metrics rather than where work queues; a capacity-by-resource tree adds resources without measuring flow, scheduling variability or rework; and a segment-channel-offer tree treats a service failure as a commercial problem before the process is measured.' },
  { title: 'Acquisition Due Diligence', prompt: 'A private-equity client is evaluating an acquisition. Which structure is most complete?', correct: 'Market And Competitive Position; Revenue Quality; Cost And Margin Sustainability; Management And Operations; Deal Economics And Risks', alternatives: ['Revenue Growth; EBITDA Margin; Valuation Multiple; Synergies; Returns Against The Hurdle', 'Customer Demand; Competitor Position; Management Interviews; Base Forecast; Cash Conversion', 'Standalone Financials; Cost Synergies; Integration Plan; Purchase Price And Terms; Financing Structure'], explanation: 'Commercial diligence must link market quality and competitive position to sustainable revenue, margins, operational capability, and deal returns. The other trees are incomplete: a financial-metrics tree takes headline growth and margin as given without testing the quality of revenue or the market behind it; a demand-and-management tree accepts the base forecast without testing cost sustainability or deal returns; and a financials-and-synergies tree frames price and financing before the market and competitive position are assessed.' },
] as const;

function buildStructures(): LibraryQuestion[] {
  return businesses.flatMap(([company, industry], companyIndex) => structureObjectives.map((objective, objectiveIndex) => ({
    id: `structures-${String(companyIndex * 5 + objectiveIndex + 1).padStart(3, '0')}`,
    skill: 'structures' as const, difficulty: difficultyOf(companyIndex * 5 + objectiveIndex), title: `${company} ${objective.title} Structure`,
    question: `${company}, a ${industry}, faces this case: ${objective.prompt}`,
    options: choiceOptions(objective.correct, [...objective.alternatives], companyIndex + objectiveIndex),
    correctAnswer: objective.correct,
    explanation: `${objective.explanation} For ${company}, the candidate should tailor the second level to the economics of a ${industry}.`,
    answerMode: 'choice' as const,
  })));
}

const creativityThemes = [
  ['New Revenue Streams', 'Generate ideas for new revenue streams without damaging the core proposition.'],
  ['Customer Retention', 'Generate initiatives that could materially improve customer retention.'],
  ['Low-Cost Growth', 'Generate growth ideas that require limited upfront capital.'],
  ['Digital Extension', 'Generate digital products or services that extend the current customer relationship.'],
  ['Sustainability Advantage', 'Generate commercially viable ideas that turn sustainability into an advantage.'],
] as const;

const creativityApproaches = [
  `ONE POSSIBLE APPROACH - other structures can work too.\nCUSTOMER VALUE: Offer a premium tier and a loyalty-based bundle.\nEXISTING ASSETS: Package internal expertise as a service and license anonymised insights.\nPARTNERSHIPS: Build a partner marketplace and a B2B distribution route.\nRECOMMENDATION: Pilot the premium bundle first because it tests willingness to pay with limited change to the core.\nKEY RISK: Monitor cannibalisation and delivery complexity before scaling.`,
  `ONE POSSIBLE APPROACH - this uses the customer journey, but other structures are equally valid.\nONBOARDING: Add a guided first-use plan and an early-success milestone.\nONGOING VALUE: Personalise offers, recognise loyalty, and create member-only benefits.\nRECOVERY: Trigger proactive support after signs of disengagement and offer a simple pause option.\nRECOMMENDATION: Test the early-success milestone first because it addresses churn before habits weaken.\nKEY RISK: Validate that personalisation feels useful rather than intrusive.`,
  `ONE POSSIBLE APPROACH - organised by speed to launch, not a required framework.\nTHIS WEEK: Launch a referral challenge and reactivate dormant customers with a targeted offer.\nTHIS MONTH: Co-market with complementary partners and turn customer stories into reusable content.\nNEXT QUARTER: Create a lightweight ambassador programme and a repeatable community event.\nRECOMMENDATION: Start with the referral challenge for fast learning and low upfront cost.\nKEY RISK: Guard against discount-led customers who do not retain.`,
  `ONE POSSIBLE APPROACH - organised around customer jobs; another clear structure may work just as well.\nDISCOVER: Add a personalised recommendation tool and useful educational content.\nDECIDE: Offer comparison, simulation, or planning features that reduce uncertainty.\nUSE: Add reminders, progress tracking, and a digital companion service.\nRECOMMENDATION: Prototype the recommendation tool because it extends the relationship at a high-intent moment.\nKEY RISK: Keep the experience simple and protect customer data.`,
  `ONE POSSIBLE APPROACH - this follows the value chain, while other routes remain valid.\nSOURCE: Reward lower-impact suppliers and offer traceable premium options.\nOPERATE: Reduce waste, resell usable surplus, and redesign high-impact processes.\nENGAGE: Give customers a repair, refill, return, or reuse incentive.\nRECOMMENDATION: Pilot the return incentive where economics and customer visibility are strongest.\nKEY RISK: Verify the full lifecycle impact so the claim is commercially credible.`,
] as const;

function caseSpecificCreativityAnswer(company: string, industry: string, themeIndex: number): string {
  const directions = [
    [
      ['Premium bundle', 'Package the highest-value parts of the current offer into a paid tier for existing customers.', 'Raises revenue per customer while using assets the business already has.', 'Pilot with one segment, define the bundle and price, and track conversion plus cannibalisation.', 'A weak value gap can shift customers from the core offer without creating enough incremental revenue.'],
      ['B2B expertise service', `Turn ${company}'s ${industry} know-how or operational capability into a service for business clients.`, 'Adds a less capital-intensive revenue stream and deepens strategic relationships.', 'Choose one repeatable capability, standardise delivery, and test with two anchor clients.', 'Custom work can consume scarce staff and make delivery hard to scale.'],
      ['Partner marketplace', 'Let complementary partners reach the customer base through a curated marketplace or referral model.', 'Adds commission income and broadens customer value without building every product internally.', 'Set partner standards, commercial terms, data rules, and a small-category launch.', 'Poor partner quality can damage trust in the core brand.'],
    ],
    [
      ['Early-success onboarding', 'Guide new customers to one valuable milestone in their first days.', 'Builds habit before early uncertainty becomes churn.', 'Identify the milestone, add prompts or human support, and A/B test retention by cohort.', 'Too much onboarding can add friction for experienced customers.'],
      ['Personalised ongoing value', `Use ${company}'s first-party signals to tailor useful offers, reminders, or benefits.`, 'Keeps the service relevant and increases repeat engagement.', 'Start with transparent rules and one high-value trigger before adding complex models.', 'Over-personalisation can feel intrusive and requires careful data governance.'],
      ['Proactive recovery', 'Detect declining engagement and trigger support, a pause option, or a targeted save action.', 'Recovers at-risk customers before they fully disengage.', 'Define churn signals, route priority cases, and measure retained margin rather than saves alone.', 'Discount-heavy recovery can train customers to threaten cancellation.'],
    ],
    [
      ['Referral challenge', 'Reward existing customers for qualified referrals with a time-bound, trackable offer.', 'Creates fast, low-capital acquisition through trusted networks.', 'Set qualification rules, cap incentives, and compare referred-customer retention with paid channels.', 'Loose rules can attract low-quality or fraudulent referrals.'],
      ['Complementary co-marketing', `Partner with a non-competing ${industry} business that reaches the same customer.`, 'Shares distribution cost and opens a relevant audience quickly.', 'Choose one partner, define the joint offer and attribution, then run a limited campaign.', 'Brand mismatch and unclear ownership can weaken conversion.'],
      ['Customer ambassador programme', 'Turn credible customers into repeat advocates through content, events, or communities.', 'Builds a durable acquisition asset instead of one-off discount traffic.', 'Recruit a small cohort, provide useful assets, and reward quality outcomes.', 'It takes longer to scale and needs active community management.'],
    ],
    [
      ['Recommendation tool', 'Help customers choose the right product or service from their stated needs.', 'Reduces decision friction and improves conversion at a high-intent moment.', 'Prototype a rules-based version, validate recommendations, then add sophistication only if needed.', 'Bad recommendations can reduce trust and create support costs.'],
      ['Planning or comparison feature', `Use ${company}'s domain knowledge to let customers compare scenarios before buying.`, 'Extends engagement and makes the commercial choice easier to justify.', 'Choose one frequent decision, expose assumptions, and test whether users act on the output.', 'Too many inputs can make the tool harder than the original decision.'],
      ['Digital companion', 'Add reminders, progress tracking, or post-purchase support around the core offer.', 'Extends the relationship beyond the transaction and supports retention.', 'Launch one recurring use case with clear notification controls and success metrics.', 'Low repeat value can create an expensive feature that customers ignore.'],
    ],
    [
      ['Lower-impact sourcing', 'Shift a visible input toward verified lower-impact suppliers and make the choice traceable.', 'Reduces footprint while supporting a credible premium or trust claim.', 'Audit the current baseline, qualify suppliers, and pilot one product line.', 'Input costs or supply reliability may worsen before scale benefits arrive.'],
      ['Waste-to-value operations', `Reduce, reuse, or resell usable waste from ${company}'s ${industry} operations.`, 'Cuts disposal cost and can create a secondary revenue or savings stream.', 'Map the largest waste pools, validate quality and regulation, and pilot the best unit economics.', 'Collection and processing costs can exceed the recovered value.'],
      ['Customer return or reuse loop', 'Reward customers for returning, refilling, repairing, or reusing the product.', 'Improves lifecycle economics and makes the sustainability proposition tangible.', 'Start where reverse logistics already exists and measure return rate plus full cost.', 'Transport and handling can erase the environmental and financial benefit.'],
    ],
  ][themeIndex] || [];
  if (directions.length === 0) return creativityApproaches[themeIndex] || creativityApproaches[0];
  const lines = [`ONE POSSIBLE APPROACH FOR ${company.toUpperCase()} - other structures can work too.`];
  directions.forEach((direction, index) => {
    lines.push(`DIRECTION ${index + 1} - ${direction[0]}`);
    lines.push(`MECHANISM: ${direction[1]}`);
    lines.push(`EXPECTED BENEFIT: ${direction[2]}`);
    lines.push(`IMPLEMENTATION: ${direction[3]}`);
    lines.push(`TRADE-OFF: ${direction[4]}`);
  });
  lines.push(`PRIORITY: Pilot Direction 1 first for ${company}, then compare impact, feasibility, and strategic fit before scaling.`);
  return lines.join('\n');
}

function buildCreativity(): LibraryQuestion[] {
  return businesses.flatMap(([company, industry], companyIndex) => creativityThemes.map(([theme, prompt], themeIndex) => {
    const id = companyIndex * 5 + themeIndex + 1;
    return {
      id: `creativity-${String(id).padStart(3, '0')}`, skill: 'creativity' as const, difficulty: difficultyOf(id - 1), title: `${company} ${theme}`,
      question: `${company}, a ${industry}, asks: ${prompt} Produce at least six distinct ideas using a clear structure appropriate to the question, then identify the most promising idea and one risk. Multiple structures are valid.`,
      correctAnswer: caseSpecificCreativityAnswer(company, industry, themeIndex),
      explanation: `There is no single required framework for a creativity answer. This is one structured route; another answer can be equally strong if it offers distinct, commercially grounded ideas and prioritises a recommendation by impact, feasibility, and strategic fit.`,
      answerMode: 'text' as const, workingPrompt: 'Write One Idea Per Line Using Any Clear Structure That Fits The Question.',
    };
  }));
}

const markets = [
  ['Takeaway Coffee', 68, 42, 95, 45, 3.2], ['Bubble Tea', 38, 36, 42, 58, 4.1],
  ['Meal Delivery', 72, 28, 30, 92, 8.5], ['Electric Scooters', 55, 9, 0.25, 28000, 1450],
  ['Online Tutoring', 24, 18, 24, 180, 12], ['Air Purifiers', 62, 8, 0.2, 5200, 310],
  ['Pet Food', 22, 34, 18, 240, 16], ['Fitness Memberships', 58, 12, 12, 650, 38],
  ['Streaming Subscriptions', 74, 31, 12, 120, 9], ['Private Health Checks', 64, 16, 0.8, 2100, 140],
  ['Solar Rooftops', 48, 5, 0.08, 68000, 4200], ['Cloud Software Seats', 18, 27, 12, 320, 22],
  ['Domestic Flights', 70, 22, 1.6, 1800, 125], ['Premium Skincare', 46, 29, 4, 720, 48],
  ['Digital Wallet Payments', 78, 57, 110, 6, 0.45], ['Coworking Desks', 16, 8, 8, 2100, 145],
  ['Home Insurance', 52, 7, 1, 1600, 115], ['Robot Vacuums', 44, 6, 0.16, 8900, 520],
  ['Language Learning Apps', 61, 14, 8, 190, 14], ['Sustainable Packaging', 26, 24, 12, 480, 34],
] as const;

const sizingRegions = [
  { name: 'Vietnam', scope: 'in Vietnam', populationLabel: 'a population of', population: 101, currency: 'VND' as const },
  { name: 'Ho Chi Minh City', scope: 'in Ho Chi Minh City', populationLabel: 'a population of', population: 9.5, currency: 'VND' as const },
  { name: 'Hanoi', scope: 'in Hanoi', populationLabel: 'a population of', population: 8.6, currency: 'VND' as const },
  { name: 'Southeast Asia', scope: 'in Southeast Asia', populationLabel: 'a population of', population: 690, currency: 'USD' as const },
  { name: 'Global Urban Markets', scope: 'for the urban population worldwide', populationLabel: 'an urban population of', population: 4600, currency: 'USD' as const },
];

function buildMarketSizing(): LibraryQuestion[] {
  return markets.flatMap(([market, eligible, adoption, frequency, priceVndK, priceUsd], marketIndex) => sizingRegions.map((region, regionIndex) => {
    const id = marketIndex * 5 + regionIndex + 1;
    const eligiblePeople = region.population * eligible / 100;
    const buyers = eligiblePeople * adoption / 100;
    const isVnd = region.currency === 'VND';
    const compactTam = round(buyers * frequency * (isVnd ? priceVndK : priceUsd), 1);
    const tam = isVnd ? compactTam * 1_000_000_000 : compactTam;
    const unit = isVnd ? 'VND Per Year' : 'USD Million Per Year';
    const priceLabel = isVnd ? `VND ${priceVndK} thousand` : `USD ${priceUsd}`;
    return {
      id: `market-sizing-${String(id).padStart(3, '0')}`, skill: 'market-sizing' as const, difficulty: difficultyOf(id - 1),
      title: `${region.name} ${market} Market Size`,
      question: `Estimate the annual ${market.toLowerCase()} market ${region.scope}. Use ${region.populationLabel} ${region.population} million, an eligible share of ${eligible}%, adoption of ${adoption}% among eligible people, annual purchase frequency of ${frequency}, and an average price of ${priceLabel}. Show each step and state the result in ${unit}.`,
      correctAnswer: `Market Size: ${tam.toLocaleString('en-US')} ${unit}`,
      explanation: `Eligible Population: ${region.population} million × ${eligible}% = ${round(eligiblePeople, 2)} million.\nAdopting Buyers: ${round(eligiblePeople, 2)} million × ${adoption}% = ${round(buyers, 2)} million.\nAnnual Units: ${round(buyers, 2)} million × ${frequency} = ${round(buyers * frequency, 2)} million.\nAnnual Market Value: ${round(buyers * frequency, 2)} million × ${priceLabel} = ${tam.toLocaleString('en-US')} ${unit}.\nSanity Check: Compare The Implied Spend Per Buyer With A Realistic Household Or Business Budget.`,
      answerMode: 'number' as const, numericAnswer: tam, numericTolerance: Math.max(isVnd ? 1_000_000 : 0.2, tam * 0.01), answerUnit: unit,
      workingPrompt: 'Build The Estimate From Population To Eligible Users, Buyers, Frequency, And Price.',
    };
  }));
}

const expertFor = (skill: LibrarySkill): LibraryQuestion[] => [
  ...EXPERT_CASE_DRILL_QUESTIONS,
  ...EXPERT_CASE_EXPANSION,
].filter((question) => question.skill === skill);

const FILTER_DEFAULTS: Record<LibrarySkill, { drillType: string; industry: string; businessProblem: string }> = {
  charts: { drillType: 'Performance Diagnosis', industry: 'Cross-industry', businessProblem: 'Performance analysis' },
  structures: { drillType: 'Issue Tree', industry: 'Cross-industry', businessProblem: 'Decision structuring' },
  calculations: { drillType: 'Business Calculation', industry: 'Cross-industry', businessProblem: 'Financial analysis' },
  creativity: { drillType: 'Idea Generation', industry: 'Cross-industry', businessProblem: 'Growth and innovation' },
  'market-sizing': { drillType: 'Market Sizing', industry: 'Consumer & Services', businessProblem: 'Market opportunity' },
};

function inferFilterMetadata(question: LibraryQuestion): Pick<LibraryQuestion, 'drillType' | 'industry' | 'businessProblem' | 'estimatedMinutes'> {
  const defaults = FILTER_DEFAULTS[question.skill];
  const text = `${question.title} ${question.question}`.toLowerCase();
  const companyIndustry = businesses.find(([company]) => text.includes(company.toLowerCase()))?.[1];
  let drillType = question.drillType || defaults.drillType;
  let businessProblem = question.businessProblem || defaults.businessProblem;

  if (question.skill === 'charts') {
    if (question.drillTypeLocked) {
      // Authored drill type stays as supplied.
    } else if (text.includes('trend')) drillType = 'Trend Analysis';
    else if (text.includes('mix')) drillType = 'Mix-Shift Analysis';
    else if (text.includes('profit')) drillType = 'Profitability Analysis';
  } else if (question.skill === 'calculations') {
    if (text.includes('breakeven')) drillType = 'Break-Even Analysis';
    else if (text.includes('growth')) drillType = 'Growth Calculation';
    else if (text.includes('profit')) drillType = 'Profitability Calculation';
    businessProblem = text.includes('cost') ? 'Cost reduction' : text.includes('profit') ? 'Profitability' : businessProblem;
  } else if (question.skill === 'structures') {
    if (!question.drillTypeLocked) {
      drillType = text.includes('entry') ? 'Market Entry Structure' : text.includes('profit') ? 'Profitability Structure' : 'Issue Tree';
      businessProblem = text.includes('entry') ? 'Market entry' : text.includes('profit') ? 'Profitability decline' : businessProblem;
    }
  } else if (question.skill === 'creativity') {
    drillType = text.includes('retention') ? 'Customer Retention Ideas' : text.includes('digital') ? 'Digital Innovation' : text.includes('sustain') ? 'Sustainability Ideas' : 'Growth Ideas';
    businessProblem = text.includes('retention') ? 'Customer retention' : 'Growth and innovation';
  } else if (question.skill === 'market-sizing') {
    drillType = 'Market Sizing';
    businessProblem = 'Market opportunity';
  }

  return {
    drillType,
    industry: question.industry || companyIndustry || defaults.industry,
    businessProblem,
    estimatedMinutes: question.estimatedMinutes || (question.difficulty === 'easy' ? 4 : question.difficulty === 'medium' ? 6 : question.difficulty === 'hard' ? 7 : 10),
  };
}

/**
 * Charts Easy and Structures Easy build the drill and its Case Pool case from one
 * source record, and the case names the drill in related_drill_ids. That stored
 * back-reference is the only evidence used; titles are never compared.
 */
const EASY_BANK_SOURCE_CASE_BY_DRILL = new Map<string, string>(
  [...CHARTS_EASY_CASE_POOL_CASES, ...STRUCTURES_EASY_CASE_POOL_CASES].flatMap((item) =>
    (item.related_drill_ids || []).map((drillId): [string, string] => [drillId, item.id])),
);

export function sourceCaseIdForDrill(question: Pick<LibraryQuestion, 'journeyId' | 'sourceCaseId'> & { id?: string }): string | null {
  const journeyCaseId = casePoolCaseIdForJourney(question.journeyId);
  if (journeyCaseId) return journeyCaseId;
  const sourceId = String(question.sourceCaseId || '').trim();
  if (/^CM-(?:CALC|CRE|MS)-[A-Z0-9-]+$/.test(sourceId)) return `case-${sourceId.toLowerCase()}`;
  return (question.id && EASY_BANK_SOURCE_CASE_BY_DRILL.get(question.id)) || null;
}

interface IndustryTermRule {
  abbreviation: string;
  pattern: RegExp;
  expandedPattern: RegExp;
  explain: (questionText: string) => string;
}

const INDUSTRY_TERM_RULES: IndustryTermRule[] = [
  {
    abbreviation: 'MAT',
    pattern: /\bMAT\b/,
    expandedPattern: /moving annual total/i,
    explain: (text) => /\b(?:previous|prior|current|latest|versus|vs\.?|growth)\b/i.test(text)
      ? 'MAT (Moving Annual Total) means sales over the rolling 12 months ending at each stated comparison point, not separate calendar years.'
      : 'MAT (Moving Annual Total) means the latest rolling 12 months of sales for the metric shown, not a calendar-year total.',
  },
  { abbreviation: 'ARR', pattern: /\bARR\b/, expandedPattern: /annual recurring revenue/i, explain: () => 'ARR (Annual Recurring Revenue) is the subscription revenue expected to repeat over a full year.' },
  { abbreviation: 'EBITDA', pattern: /\bEBITDA\b/, expandedPattern: /earnings before interest,? taxes,? depreciation and amorti[sz]ation/i, explain: () => 'EBITDA is profit before interest, tax, depreciation and amortisation; it is a rough view of operating performance before financing and non-cash charges.' },
  { abbreviation: 'EBIT', pattern: /\bEBIT\b/, expandedPattern: /earnings before interest and taxes/i, explain: () => 'EBIT means earnings before interest and tax, commonly called operating profit.' },
  { abbreviation: 'CAGR', pattern: /\bCAGR\b/, expandedPattern: /compound annual growth rate/i, explain: () => 'CAGR (Compound Annual Growth Rate) is the steady yearly growth rate that links the starting value to the ending value.' },
  { abbreviation: 'CAC', pattern: /\bCAC\b/, expandedPattern: /customer acquisition cost/i, explain: () => 'CAC (Customer Acquisition Cost) is the average sales and marketing cost needed to win one new customer.' },
  { abbreviation: 'LTV', pattern: /\bLTV\b/, expandedPattern: /lifetime value/i, explain: () => 'LTV (Lifetime Value) is the value or contribution expected from a customer over the whole relationship.' },
  { abbreviation: 'ARPU', pattern: /\bARPU\b/, expandedPattern: /average revenue per user/i, explain: () => 'ARPU (Average Revenue Per User) is revenue divided by the average number of users in the period.' },
  { abbreviation: 'NPS', pattern: /\bNPS\b/, expandedPattern: /net promoter score/i, explain: () => 'NPS (Net Promoter Score) is the percentage of promoters minus the percentage of detractors.' },
  { abbreviation: 'SKU', pattern: /\bSKUs?\b/, expandedPattern: /stock keeping unit/i, explain: () => 'SKU (Stock Keeping Unit) means one distinct product or product variant tracked in inventory.' },
  { abbreviation: 'TAM', pattern: /\bTAM\b/, expandedPattern: /total addressable market/i, explain: () => 'TAM (Total Addressable Market) is the full demand available if every relevant customer could be served.' },
  { abbreviation: 'SAM', pattern: /\bSAM\b/, expandedPattern: /serviceable available market/i, explain: () => 'SAM (Serviceable Available Market) is the part of the total market the company can serve with its offer and reach.' },
  { abbreviation: 'SOM', pattern: /\bSOM\b/, expandedPattern: /serviceable obtainable market/i, explain: () => 'SOM (Serviceable Obtainable Market) is the realistic share of the serviceable market the company could win.' },
  { abbreviation: 'ROIC', pattern: /\bROIC\b/, expandedPattern: /return on invested capital/i, explain: () => 'ROIC (Return on Invested Capital) measures operating profit earned for each unit of capital invested in the business.' },
  { abbreviation: 'WACC', pattern: /\bWACC\b/, expandedPattern: /weighted average cost of capital/i, explain: () => 'WACC (Weighted Average Cost of Capital) is the blended return required by the company’s debt and equity investors.' },
  { abbreviation: 'NPV', pattern: /\bNPV\b/, expandedPattern: /net present value/i, explain: () => 'NPV (Net Present Value) is today’s value of future cash flows minus the initial investment.' },
  { abbreviation: 'IRR', pattern: /\bIRR\b/, expandedPattern: /internal rate of return/i, explain: () => 'IRR (Internal Rate of Return) is the discount rate at which an investment’s net present value equals zero.' },
  { abbreviation: 'OPEX', pattern: /\bOPEX\b/i, expandedPattern: /operating expenses?/i, explain: () => 'OPEX means operating expenses: the recurring costs of running the business.' },
  { abbreviation: 'CAPEX', pattern: /\bCAPEX\b/i, expandedPattern: /capital expenditure/i, explain: () => 'CAPEX means capital expenditure: money invested in long-lived assets such as equipment, stores or systems.' },
  { abbreviation: 'FTE', pattern: /\bFTEs?\b/, expandedPattern: /full[- ]time equivalent/i, explain: () => 'FTE (Full-Time Equivalent) converts staff hours into the workload of one full-time employee.' },
  { abbreviation: 'GMV', pattern: /\bGMV\b/, expandedPattern: /gross merchandise value/i, explain: () => 'GMV (Gross Merchandise Value) is the total value of goods sold through a marketplace before fees, refunds and costs.' },
  { abbreviation: 'YoY', pattern: /\bYoY\b/i, expandedPattern: /year[- ]on[- ]year/i, explain: () => 'YoY means year on year: the value is compared with the same period one year earlier.' },
  { abbreviation: 'QoQ', pattern: /\bQoQ\b/i, expandedPattern: /quarter[- ]on[- ]quarter/i, explain: () => 'QoQ means quarter on quarter: the value is compared with the immediately preceding quarter.' },
  { abbreviation: 'DSO', pattern: /\bDSO\b/, expandedPattern: /days sales outstanding/i, explain: () => 'DSO (Days Sales Outstanding) is the average number of days customers take to pay invoices.' },
];

export function industryTermNotesForText(text: string): string[] {
  return INDUSTRY_TERM_RULES
    .filter((rule) => rule.pattern.test(text) && !rule.expandedPattern.test(text))
    .map((rule) => rule.explain(text));
}

function industryTermNotesFor(question: LibraryQuestion): string[] {
  return industryTermNotesForText(JSON.stringify(question));
}

function withSourceCaseRelationships(questions: LibraryQuestion[]): LibraryQuestion[] {
  return questions.map((question) => {
    const industryTermNotes = industryTermNotesFor(question);
    const termContext = industryTermNotes.length ? `Plain-language terms: ${industryTermNotes.join(' ')}` : '';
    return toLearnerFacingQuestion({
      ...question,
      // Journey drills receive this in their builder so Case Drill and Case Pool share one exhibit object.
      ...(question.skill === 'structures' && !question.journeyId && question.exhibits?.length ? { exhibits: withStructureGuidance(question.exhibits) } : {}),
      businessContext: termContext
        ? [termContext, question.businessContext].filter(Boolean).join('\n\n')
        : question.businessContext,
      industryTermNotes,
      source_case_id: sourceCaseIdForDrill(question),
    });
  });
}

const INJECTED_EXHIBIT_NOTE = ' These are generic comparison labels used only in this added exhibit; they are separate from, and unrelated to, any labels in the original exhibit.';
const INJECTED_INDEX_NOTE = 'Volume and Value are two generic index series, each set to 100 in Q1 (Q1 = 100); only their direction and relative gap are comparable. They are separate from, and unrelated to, any labels or units in the original exhibit, and this exhibit does not describe them further.';

function clarifyInjectedHardExhibits(question: LibraryQuestion): LibraryQuestion {
  const isInjected = (item: LibraryExhibit): boolean => Boolean(item.datasetId?.endsWith('-hard-upgrade'));
  if (!question.exhibits?.some(isInjected)) return question;
  return {
    ...question,
    exhibits: question.exhibits.map((item) => {
      if (!isInjected(item) || /unrelated to/i.test(item.footnote || '')) return item;
      if (item.kind === 'multi-line') {
        return {
          ...item,
          axisConfig: { ...item.axisConfig, yLabel: 'Index (Q1 = 100)' },
          footnote: item.footnote ? `${item.footnote} ${INJECTED_INDEX_NOTE}` : INJECTED_INDEX_NOTE,
        };
      }
      return item.footnote ? { ...item, footnote: `${item.footnote}${INJECTED_EXHIBIT_NOTE}` } : item;
    }),
  };
}

function prepareLibrary(skill: LibrarySkill, questions: LibraryQuestion[]): LibraryQuestion[] {
  const prepared = upgradeHardQuestions(questions).map(clarifyInjectedHardExhibits).map((question) => ({
    ...question,
    ...inferFilterMetadata(question),
    // Numeric tolerances are absolute amounts in the displayed canonical unit.
    // Source-authored rules win; this fallback makes every direct numeric field auditable.
    roundingRule: question.roundingRule || ((question.answerMode === 'number' || question.answerMode === 'percentage' || question.answerMode === 'currency') && question.answerUnit && question.numericTolerance != null
      ? toleranceRuleText(question.numericTolerance, question.answerUnit, question.numericTolerance === 0)
      : question.roundingRule),
    // Every lower-tier item was reviewed in the same pass. Only the bounded
    // calculation items that needed another reasoning step carry revised-v1;
    // the rest already met the requested Easy/Medium bar.
    calibrationStatus: question.difficulty === 'easy' || question.difficulty === 'medium'
      ? question.calibrationStatus || 'already-at-target-v1' as const
      : question.calibrationStatus,
    // The original Hard bank remains addressable by id for completion history,
    // but is no longer presented as the primary Hard experience.
    reviewStatus: question.difficulty === 'hard' && !question.structuredAnswer ? 'Archived' as const : question.reviewStatus,
  }));
  const authored = [
    // Journey drills and the structured Hard bank bypass inferFilterMetadata so
    // their authored drill type, industry, and business problem survive intact.
    ...CASE_JOURNEY_DRILLS.filter((question) => question.skill === skill),
    ...HARD_CASE_DRILL_QUESTIONS.filter((question) => question.skill === skill),
    ...prepared,
  ].map((question) => skill === 'calculations'
    && (question.difficulty === 'hard' || question.difficulty === 'expert')
    && !question.sourceCaseId?.startsWith('CM-CALC-')
      ? {
          ...question,
          reviewStatus: 'Archived' as const,
          retiredVersion: 'calculations-cycle-1-v1',
          retirementReason: 'Replaced by the approved CM-CALC Cycle 1 bank; retained for past submissions and scores.',
        }
      : question);
  if (skill === 'calculations') return withSourceCaseRelationships([...CALCULATION_CYCLE_1_QUESTIONS, ...authored]);
  if (skill === 'creativity') {
    const retiredLegacy = authored.map((question) => ({
      ...question,
      reviewStatus: 'Archived' as const,
      retiredVersion: 'creativity-cycle-2-v1',
      retirementReason: 'Retired from the learner selector when Creativity moved from a difficulty ladder to four approved problem types. Stable IDs remain for historical submissions and scores.',
    }));
    return withSourceCaseRelationships([...CREATIVITY_CYCLE_2_QUESTIONS, ...retiredLegacy]);
  }
  if (skill === 'market-sizing') {
    const migrated = migrateLegacyMarketSizingQuestions(authored);
    const knownIds = new Set([...MARKET_SIZING_CYCLE_3_QUESTIONS, ...migrated].map((question) => question.id));
    return withSourceCaseRelationships([
      ...MARKET_SIZING_CYCLE_3_QUESTIONS,
      ...MARKET_SIZING_BANK_QUESTIONS.filter((question) => !knownIds.has(question.id)),
      ...migrated,
    ]);
  }
  return withSourceCaseRelationships(authored);
}

export const QUESTION_LIBRARY: Record<LibrarySkill, LibraryQuestion[]> = {
  charts: prepareLibrary('charts', [...CHARTS_EASY_QUESTIONS, ...CREATIVITY_ROUTED_EXHIBIT_QUESTIONS.filter((question) => question.skill === 'charts'), ...buildCharts(), ...ADVANCED_CASE_DRILL_QUESTIONS, ...expertFor('charts')]),
  structures: prepareLibrary('structures', [...STRUCTURES_EASY_QUESTIONS, ...CREATIVITY_ROUTED_EXHIBIT_QUESTIONS.filter((question) => question.skill === 'structures'), ...buildStructures(), ...expertFor('structures')]),
  calculations: prepareLibrary('calculations', [...buildCalculations(), ...expertFor('calculations')]),
  creativity: prepareLibrary('creativity', [...buildCreativity(), ...expertFor('creativity')]),
  'market-sizing': prepareLibrary('market-sizing', [...buildMarketSizing(), ...expertFor('market-sizing')]),
};

export const ALL_LIBRARY_QUESTIONS = SKILL_META.flatMap((skill) => QUESTION_LIBRARY[skill.id]);

const WATERFALL_AUDIT_TOLERANCE = 0.11;
const WATERFALL_AUDIT_ENDING_LABEL = /\b(?:closing|ending|final|end value|at test|target|addressable|store profit|gross profit|net debt|operating profit|arr|ebit|ebitda|revenue)\b/i;

/**
 * Build-time inventory and reconciliation check for every Waterfall exhibit in
 * the complete question bank. Case Pool rows point back to these same source
 * questions, so `sharedWithCasePool` identifies the two-surface coverage.
 */
export const WATERFALL_DATA_AUDIT = (() => {
  const cases = ALL_LIBRARY_QUESTIONS.flatMap((question) => {
    const exhibits = question.exhibits || (question.exhibit ? [question.exhibit] : []);
    return exhibits
      .filter((exhibit) => exhibit.kind === 'waterfall')
      .map((exhibit) => {
        const categories = (exhibit.categories || exhibit.labels || []).map(String);
        const sourceValues = exhibit.series?.[0]?.values || exhibit.values || [];
        const values = sourceValues.map(Number);
        const lastIndex = values.length - 1;
        const calculatedBeforeLast = values.slice(0, -1).reduce((sum, value) => sum + value, 0);
        const lastLabel = categories[lastIndex] || '';
        const explicitByLabel = WATERFALL_AUDIT_ENDING_LABEL.test(lastLabel);
        const explicitByValue = lastIndex > 0 && Math.abs(Number(values[lastIndex]) - calculatedBeforeLast) <= WATERFALL_AUDIT_TOLERANCE;
        const hasExplicitEnding = lastIndex > 0 && (explicitByLabel || explicitByValue);
        const calculatedEnding = hasExplicitEnding
          ? calculatedBeforeLast
          : values.reduce((sum, value) => sum + value, 0);
        const suppliedEnding = hasExplicitEnding ? values[lastIndex] : calculatedEnding;
        const mismatch = suppliedEnding - calculatedEnding;
        return {
          questionId: question.id,
          questionTitle: question.title,
          difficulty: question.difficulty,
          exhibitId: exhibit.id || null,
          exhibitTitle: exhibit.title,
          sharedWithCasePool: Boolean(question.source_case_id),
          hasExplicitEnding,
          calculatedEnding,
          suppliedEnding,
          mismatch,
          withinTolerance: Math.abs(mismatch) <= WATERFALL_AUDIT_TOLERANCE,
        };
      });
  });
  return {
    tolerance: WATERFALL_AUDIT_TOLERANCE,
    cases,
    byDifficulty: Object.fromEntries(['easy', 'medium', 'hard', 'expert'].map((difficulty) => [difficulty, cases.filter((item) => item.difficulty === difficulty).length])),
    sharedWithCasePool: cases.filter((item) => item.sharedWithCasePool).length,
    mismatches: cases.filter((item) => !item.withinTolerance),
  };
})();

/** Programmatic audit inventories: no question content, answer or score is changed by these projections. */
export const CASE_DRILL_AUDIT_RUNTIME_SNAPSHOT = ALL_LIBRARY_QUESTIONS.map((question) => ({
  id: question.id,
  title: question.title,
  question: question.question,
  exhibit: question.exhibit,
  exhibits: question.exhibits,
  options: question.options,
  correctAnswer: question.correctAnswer,
  answerMode: question.answerMode,
  numericAnswer: question.numericAnswer,
  numericTolerance: question.numericTolerance,
  answerUnit: question.answerUnit,
  explanation: question.explanation,
  calculationLogic: question.calculationLogic,
  stepByStepSolution: question.stepByStepSolution,
  modelAnswerSections: question.modelAnswerSections,
  scoringRubric: question.scoringRubric,
  scoringHints: question.scoringHints,
  personalizedFeedbackTemplate: question.personalizedFeedbackTemplate,
  weakAnswerFeedback: question.weakAnswerFeedback,
  sourceCaseId: question.sourceCaseId,
  source_case_id: question.source_case_id,
}));

export const INDUSTRY_TERM_EXPLANATION_AUDIT = {
  questionCount: ALL_LIBRARY_QUESTIONS.length,
  explainedQuestionIds: ALL_LIBRARY_QUESTIONS.filter((question) => question.industryTermNotes?.length).map((question) => question.id),
  explanationsByQuestion: Object.fromEntries(
    ALL_LIBRARY_QUESTIONS
      .filter((question) => question.industryTermNotes?.length)
      .map((question) => [question.id, question.industryTermNotes]),
  ),
};

function sourceRelationshipEvidence(question: LibraryQuestion): string {
  if (question.journeyId) return question.source_case_id
    ? `Canonical Case Journey ${question.journeyId}: shared drill IDs and exhibit objects.`
    : `Case Journey ${question.journeyId} is withheld from Case Pool pending source alignment.`;
  if (question.sourceCaseId?.startsWith('CM-CALC-')) return 'Same Calculation source record, numeric checks, units, rounding rule, and worked answer.';
  if (question.sourceCaseId?.startsWith('CM-CRE-')) return 'Same Creativity source brief, task, constraints, rubric, and worked response.';
  if (question.sourceCaseId?.startsWith('CM-MS-')) return 'Same Market Sizing source brief, task, format, driver logic, and worked solution.';
  if (EASY_BANK_SOURCE_CASE_BY_DRILL.has(question.id)) {
    return question.skill === 'charts'
      ? 'Same Charts Easy source record (exhibit, options and answer key); the Case Pool case lists this drill in related_drill_ids.'
      : 'Same Structures Easy source record (problem, options and key tree); the Case Pool case lists this drill in related_drill_ids.';
  }
  return 'Standalone drill: no exact published Case Pool source record.';
}

/**
 * Recorded drill -> Case Pool relationships. Whether the full-case button can open
 * the record (it must be selectable and name the drill) is decided by
 * DRILL_FULL_CASE_LINK_AUDIT in casePoolLibrary.ts; a retired record is flagged there.
 */
export const DRILL_SOURCE_CASE_AUDIT = {
  linked: ALL_LIBRARY_QUESTIONS
    .filter((question) => Boolean(question.source_case_id))
    .map((question) => ({ drillId: question.id, sourceCaseId: question.source_case_id as string, evidence: sourceRelationshipEvidence(question) })),
  unlinked: ALL_LIBRARY_QUESTIONS
    .filter((question) => !question.source_case_id)
    .map((question) => ({ drillId: question.id, sourceCaseId: null, reason: sourceRelationshipEvidence(question) })),
};

const LOWER_TIER_QUESTIONS = ALL_LIBRARY_QUESTIONS.filter(
  (question) => question.difficulty === 'easy' || question.difficulty === 'medium',
);

/** Build-time audit used to report the calibration without equating drills to full cases. */
export const LOWER_TIER_CALIBRATION_AUDIT = {
  reviewed: LOWER_TIER_QUESTIONS.length,
  revisedEasy: LOWER_TIER_QUESTIONS.filter((question) => question.difficulty === 'easy' && question.calibrationStatus === 'revised-v1').length,
  revisedMedium: LOWER_TIER_QUESTIONS.filter((question) => question.difficulty === 'medium' && question.calibrationStatus === 'revised-v1').length,
  alreadyAtTarget: LOWER_TIER_QUESTIONS.filter((question) => question.calibrationStatus === 'already-at-target-v1').length,
  // Shared Case Journey records are Hard/Expert. No Easy/Medium revision is
  // allowed to claim one of those distinct scenarios merely because a skill matches.
  affectedSharedCaseIds: [...new Set(LOWER_TIER_QUESTIONS
    .filter((question) => question.calibrationStatus === 'revised-v1' && question.journeyId)
    .map((question) => `case-${question.journeyId}`))],
};

/**
 * Case Drill keeps multiple-choice options in the separate `options` field. `repairedAtLoad` lists drills whose
 * text had an option list typed into it (separated into `options` as they loaded, so the stem and the options are
 * never shown together); `remaining` must stay empty.
 */
export const CASE_DRILL_EMBEDDED_OPTION_AUDIT = {
  repairedAtLoad: embeddedOptionRepairs(),
  remaining: drillEmbeddedOptionProblems(ALL_LIBRARY_QUESTIONS),
};

export function questionCountFor(skill: LibrarySkill): number {
  return QUESTION_LIBRARY[skill].filter((question) => question.reviewStatus !== 'Archived').length;
}

function calculationWorkedAnswerComplete(question: LibraryQuestion): boolean {
  const worked = calculationWorkedAnswerFor(question.sourceCaseId);
  const checks = question.calculationNumericChecks || [];
  return Boolean(worked)
    && Boolean(worked?.decision)
    && worked?.results.length === checks.length
    && Boolean(worked?.results.every((result) => result.formula && result.steps.length > 0));
}

export function validateExpertQuestion(question: LibraryQuestion): string[] {
  if (question.retiredVersion || question.difficulty !== 'expert' || !question.structuredAnswer || question.marketSizingFormat) return [];
  const errors: string[] = [];
  if (question.sourceCaseId?.startsWith('CM-CALC-')) {
    if ((question.exhibits || []).length !== 0) errors.push(`${question.id} Calculation Bank Case Must Not Have Charts.`);
    if ((question.scoringRubric || []).map((item) => item.points).join(',') !== '20,30,20,20,10') errors.push(`${question.id} Must Use The Approved 2/3/2/2/1 Calculations Rubric.`);
    if (!question.calculationNumericChecks?.length || !question.roundingRule || !question.weakAnswerFeedback) errors.push(`${question.id} Is Missing Deterministic Checks, Rounding, Or Feedback Direction.`);
    if (!calculationWorkedAnswerComplete(question)) errors.push(`${question.id} Is Missing A Worked Answer With A Formula And Steps For Every Result.`);
    return errors;
  }
  const exhibits = question.exhibits || [];
  if (exhibits.length < 2 || exhibits.length > 3) errors.push(`${question.id} Must Have 2–3 Connected Exhibits.`);
  if (new Set(exhibits.map((exhibit) => exhibit.kind)).size < 2) errors.push(`${question.id} Must Use At Least Two Different Exhibit Types.`);
  if (!question.businessContext || !question.clientObjective || !question.drillType || !question.industry || !question.businessProblem || !question.primarySkill) errors.push(`${question.id} Is Missing Expert Context Metadata.`);
  if (!question.modelAnswerSections?.keyInsight || !question.modelAnswerSections?.supportingEvidence || !question.modelAnswerSections?.businessImplication || !question.modelAnswerSections?.recommendedAction) errors.push(`${question.id} Is Missing A Complete Structured Model Answer.`);
  if (!question.scoringRubric?.length || question.scoringRubric.reduce((sum, item) => sum + item.points, 0) !== 100) errors.push(`${question.id} Rubric Must Total 100 Points.`);
  if (!question.alternativeConclusions?.length || !question.commonMistake || !question.numericalValidation?.length || !question.recommendedNextDrillId || !question.personalizedFeedbackTemplate) errors.push(`${question.id} Is Missing Review Or Feedback Content.`);
  if (question.reviewStatus !== 'Draft' || question.status !== 'draft-pending-review') errors.push(`${question.id} Must Remain Draft - Pending Review.`);
  if ((question.evidenceRequired || 0) < 2) errors.push(`${question.id} Must Require Evidence From At Least Two Exhibits.`);
  if (question.calculationRequired && !question.modelAnswerSections?.calculation) errors.push(`${question.id} Is Missing Its Model Calculation.`);
  exhibits.forEach((exhibit, index) => {
    if (!exhibit.title || !exhibit.analyticalPurpose || !exhibit.metrics?.length || !exhibit.periods?.length) errors.push(`${question.id} / Exhibit ${index + 1} Is Missing Review Metadata.`);
  });
  return errors;
}

export function validateHardStructuredQuestion(question: LibraryQuestion): string[] {
  if (question.retiredVersion || question.difficulty !== 'hard' || !question.structuredAnswer || question.marketSizingFormat) return [];
  const errors: string[] = [];
  if (question.sourceCaseId?.startsWith('CM-CALC-')) {
    if ((question.exhibits || []).length !== 0) errors.push(`${question.id} Calculation Bank Case Must Not Have Charts.`);
    if ((question.scoringRubric || []).map((item) => item.points).join(',') !== '20,30,20,20,10') errors.push(`${question.id} Must Use The Approved 2/3/2/2/1 Calculations Rubric.`);
    if (!question.calculationNumericChecks?.length || !question.roundingRule || !question.weakAnswerFeedback) errors.push(`${question.id} Is Missing Deterministic Checks, Rounding, Or Feedback Direction.`);
    if (!calculationWorkedAnswerComplete(question)) errors.push(`${question.id} Is Missing A Worked Answer With A Formula And Steps For Every Result.`);
    return errors;
  }
  const exhibits = question.exhibits || [];
  if (exhibits.length < 2) errors.push(`${question.id} Hard Case Must Have At Least Two Exhibits.`);
  if (new Set(exhibits.map((exhibit) => exhibit.kind === 'bar' ? 'vertical-bar' : exhibit.kind)).size < 2) errors.push(`${question.id} Hard Case Must Use At Least Two Different Exhibit Types.`);
  if (!question.businessContext || !question.clientObjective || !question.drillType || !question.industry || !question.businessProblem) errors.push(`${question.id} Is Missing Hard Context Metadata.`);
  if (!question.modelAnswerSections?.keyObservation || !question.modelAnswerSections.keyInsight || !question.modelAnswerSections.businessImplication || !question.modelAnswerSections.recommendedAction) errors.push(`${question.id} Is Missing A Complete Hard Structured Model Answer.`);
  const rubricPoints = question.scoringRubric?.map((item) => item.points) || [];
  if (rubricPoints.join(',') !== '20,30,25,15,10') errors.push(`${question.id} Must Use The 20/30/25/15/10 Hard Rubric.`);
  if (question.reviewStatus !== 'Draft' || question.status !== 'draft-pending-review') errors.push(`${question.id} Must Remain Draft - Pending Review.`);
  if (!question.personalizedFeedbackTemplate || !question.recommendedNextDrillId) errors.push(`${question.id} Is Missing Personalized Feedback Or A Recommended Next Drill.`);
  if (!question.estimatedMinutes || question.estimatedMinutes < 5 || question.estimatedMinutes > 8) errors.push(`${question.id} Must Take Approximately 5–8 Minutes.`);
  return errors;
}

export function validateMcqAnswerKeys(): string[] {
  const errors: string[] = [];
  ALL_LIBRARY_QUESTIONS
    .filter((question) => question.reviewStatus !== 'Archived' && (question.answerMode === 'choice' || question.answerMode === 'multiple-choice'))
    .forEach((question) => {
      const options = question.options || [];
      if (options.length !== 4) errors.push(`${question.id} Must Have Exactly Four MCQ Options.`);
      if (new Set(options).size !== options.length) errors.push(`${question.id} Contains Duplicate MCQ Options.`);
      const correctMatches = options.filter((option) => option === question.correctAnswer).length;
      if (correctMatches !== 1) errors.push(`${question.id} Must Contain Its Correct Answer Exactly Once.`);
      options.forEach((option) => {
        const gradedCorrect = option === question.correctAnswer;
        if (option === question.correctAnswer && !gradedCorrect) errors.push(`${question.id} Rejects Its Answer Key.`);
        if (option !== question.correctAnswer && gradedCorrect) errors.push(`${question.id} Accepts A Distractor As Correct.`);
      });
    });
  return errors;
}

export const CHART_PATTERN_DISTRIBUTION_AUDIT = {
  contexts: chartContexts.length,
  bar: Object.fromEntries(chartPatterns.map((pattern, index) => [pattern.name, chartContexts.filter((_, contextIndex) => contextIndex % chartPatterns.length === index).length])),
  line: Object.fromEntries(chartPatterns.map((pattern, index) => [pattern.name, chartContexts.filter((_, contextIndex) => (contextIndex + 2) % chartPatterns.length === index).length])),
  composition: compositionPatterns.map((pattern, index) => ({
    pattern: pattern.implication,
    count: chartContexts.filter((_, contextIndex) => (contextIndex + 4) % compositionPatterns.length === index).length,
    largestSlice: Math.max(...pattern.values),
  })),
};

export function validateNumericUnitContract(): string[] {
  const errors: string[] = [];
  ALL_LIBRARY_QUESTIONS.filter((question) => question.reviewStatus !== 'Archived').forEach((question) => {
    const directNumeric = question.answerMode === 'number' || question.answerMode === 'percentage' || question.answerMode === 'currency';
    if (directNumeric) {
      if (!Number.isFinite(question.numericAnswer)) errors.push(`${question.id} Is Missing A Finite Canonical Numeric Answer.`);
      if (!question.answerUnit?.trim()) errors.push(`${question.id} Is Missing Its Canonical Answer Unit.`);
      if (!Number.isFinite(question.numericTolerance) || Number(question.numericTolerance) < 0) errors.push(`${question.id} Is Missing A Nonnegative Absolute Tolerance.`);
      if (!question.roundingRule?.trim()) errors.push(`${question.id} Is Missing Its Rounding/Tolerance Rule.`);
    }
    (question.calculationNumericChecks || []).forEach((check, index) => {
      if (!check.label.trim() || !check.unit.trim() || !Number.isFinite(check.value) || !Number.isFinite(check.tolerance) || check.tolerance < 0) {
        errors.push(`${question.id} / Result ${index + 1} Has An Invalid Quantity, Unit, Value, Or Tolerance.`);
      }
    });
    if (question.calculationNumericChecks?.length && !question.roundingRule?.trim()) errors.push(`${question.id} Is Missing Its Calculation Rounding Rule.`);
  });
  return errors;
}

export const NUMERIC_UNIT_AUDIT = {
  auditedQuestions: ALL_LIBRARY_QUESTIONS.filter((question) => question.reviewStatus !== 'Archived' && (
    question.answerMode === 'number' || question.answerMode === 'percentage' || question.answerMode === 'currency'
    || Boolean(question.calculationNumericChecks?.length) || question.skill === 'market-sizing'
    || Boolean(question.exhibit || question.exhibits?.length)
  )).length,
  directNumericInputs: ALL_LIBRARY_QUESTIONS.filter((question) => question.reviewStatus !== 'Archived' && ['number', 'percentage', 'currency'].includes(question.answerMode)).length,
  deterministicCalculationResults: ALL_LIBRARY_QUESTIONS.filter((question) => question.reviewStatus !== 'Archived').reduce((sum, question) => sum + (question.calculationNumericChecks?.length || 0), 0),
};

export function validateQuestionLibrary(): string[] {
  const waterfallErrors = WATERFALL_DATA_AUDIT.mismatches.map((item) => `${item.questionId} / ${item.exhibitId || item.exhibitTitle} Waterfall Movements End At ${item.calculatedEnding.toFixed(1)}, Not Its Supplied Ending Total ${item.suppliedEnding.toFixed(1)}.`);
  const errors: string[] = [...validateExpertExpansion(), ...validateChartsEasyBank(), ...validateStructuresEasyBank(),
    ...validateStructureFrameworks(QUESTION_LIBRARY.structures), ...validateCaseJourneys(), ...validateCreativityCycle2(), ...validateMarketSizingCycle3(), ...validateMarketSizingBank(), ...validateMcqAnswerKeys(), ...validateNumericUnitContract(), ...drillEmbeddedOptionProblems(ALL_LIBRARY_QUESTIONS), ...waterfallErrors];
  const snapshotIds = CASE_DRILL_AUDIT_RUNTIME_SNAPSHOT.map((question) => question.id);
  const currentIds = ALL_LIBRARY_QUESTIONS.map((question) => question.id);
  if (snapshotIds.length !== currentIds.length || snapshotIds.some((id, index) => id !== currentIds[index])) {
    errors.push('Case Drill Audit Snapshot Question Count Or ID Order Changed.');
  }
  ALL_LIBRARY_QUESTIONS.forEach((question) => {
    const notes = question.industryTermNotes || [];
    if (notes.some((note) => !note.trim())) errors.push(`${question.id} Has An Empty Industry-Term Explanation.`);
    if (/\bMAT\b/.test(JSON.stringify(question)) && !/moving annual total/i.test(JSON.stringify(question))) {
      errors.push(`${question.id} Uses MAT Without Explaining Moving Annual Total.`);
    }
  });
  if (Object.values(CHART_PATTERN_DISTRIBUTION_AUDIT.bar).some((count) => Number(count) === 0)) errors.push('Charts Bank Must Use Every Defined Bar Pattern.');
  if (Object.values(CHART_PATTERN_DISTRIBUTION_AUDIT.line).some((count) => Number(count) === 0)) errors.push('Charts Bank Must Use Every Defined Line Pattern.');
  if (LOWER_TIER_CALIBRATION_AUDIT.revisedEasy !== 20) errors.push(`Expected 20 Revised Easy Drills; Found ${LOWER_TIER_CALIBRATION_AUDIT.revisedEasy}.`);
  if (LOWER_TIER_CALIBRATION_AUDIT.revisedMedium !== 20) errors.push(`Expected 20 Revised Medium Drills; Found ${LOWER_TIER_CALIBRATION_AUDIT.revisedMedium}.`);
  LOWER_TIER_QUESTIONS.forEach((question) => {
    if (!question.calibrationStatus) errors.push(`${question.id} Is Missing Its Lower-Tier Calibration Review Marker.`);
    if (question.calibrationStatus === 'revised-v1') {
      const rubricTotal = question.scoringRubric?.reduce((sum, item) => sum + item.points, 0) || 0;
      if (rubricTotal !== 100) errors.push(`${question.id} Lower-Tier Calibration Rubric Must Total 100 Points.`);
      if (!question.alternativeConclusions?.length) errors.push(`${question.id} Needs Acceptable Alternative Answers.`);
      if ((question.stepByStepSolution?.length || 0) < 2 || !question.keyInsight || !question.commonMistake) errors.push(`${question.id} Needs Evidence, Reasoning, And Feedback For Its Added Step.`);
    }
    if (question.skill === 'calculations' && question.reviewStatus !== 'Archived' && (question.difficulty === 'easy' || question.difficulty === 'medium')) {
      const resultKeys = Object.keys(question.calculationResultFormulas || {});
      if (!resultKeys.length || resultKeys.some((key) => !question.calculationWorkedSteps?.[key]?.length)) errors.push(`${question.id} Needs A Plain-English Worked Answer For Every Result.`);
    }
  });
  if (HARD_CASE_DRILL_QUESTIONS.length < 5) errors.push('Hard Library Must Contain At Least Five New Structured Cases.');
  for (const skill of SKILL_META) {
    if (!HARD_CASE_DRILL_QUESTIONS.some((question) => question.skill === skill.id)) errors.push(`${skill.label} Needs A New Structured Hard Case.`);
  }
  for (const [skill, types] of Object.entries(EXPERT_DRILL_TYPES)) {
    if (types.length !== 6 || new Set(types).size !== 6) errors.push(`${skill} Must Define Six Distinct Expert Drill Types.`);
  }
  for (const skill of SKILL_META) {
    const questions = QUESTION_LIBRARY[skill.id];
    if (questions.length < 100) errors.push(`${skill.label} Has ${questions.length} Questions; At Least 100 Are Required.`);
    const ids = new Set(questions.map((question) => question.id));
    if (ids.size !== questions.length) errors.push(`${skill.label} Contains Duplicate Question IDs.`);
    questions.forEach((question) => {
      if (!question.question || !question.correctAnswer || !question.explanation) errors.push(`${question.id} Is Missing Required Content.`);
      if (question.source_case_id === undefined) errors.push(`${question.id} Is Missing Its Nullable Source Case Relationship.`);
      errors.push(...validateExpertQuestion(question));
      errors.push(...validateHardStructuredQuestion(question));
      if (question.difficulty === 'hard' && !question.sourceCaseId?.startsWith('CM-CALC-') && !question.marketSizingFormat) {
        const hardExhibits = question.exhibits || [];
        if (hardExhibits.length < 2 || new Set(hardExhibits.map((exhibit) => exhibit.kind === 'bar' ? 'vertical-bar' : exhibit.kind)).size < 2) {
          errors.push(`${question.id} Hard Case Must Have At Least Two Distinct Exhibit Types.`);
        }
        if (!question.structuredAnswer && question.reviewStatus !== 'Archived') errors.push(`${question.id} Legacy Hard MCQ Must Be Archived.`);
      }
      if (question.status === 'draft-pending-review' && !question.sourceCaseId?.startsWith('CM-CALC-') && !question.retiredVersion) {
        if (!question.structuredAnswer) {
          const required = [question.businessContext, question.instruction, question.calculationLogic, question.keyInsight, question.commonMistake, question.learningObjective];
          if (required.some((value) => !value) || !question.estimatedMinutes || !question.answerFormat || !question.stepByStepSolution?.length) {
            errors.push(`${question.id} Is Missing Required Hard/Expert Review Content.`);
          }
        }
        if (!question.exhibits?.length) errors.push(`${question.id} Has No Structured Exhibits.`);
        question.exhibits?.forEach((exhibit) => {
          const categories = exhibit.categories || exhibit.labels || [];
          const series = exhibit.series || (exhibit.values ? [{ name: 'Value', values: exhibit.values }] : []);
          if (!['table', 'financial-table', 'market-sizing-table', 'sensitivity-table', 'kpi-scorecard'].includes(exhibit.kind)) {
            if (!categories.length || !series.length || series.some((item) => item.values.length !== categories.length || item.values.some((value) => !Number.isFinite(Number(value))))) {
              errors.push(`${question.id} / ${exhibit.id || exhibit.title} Has Invalid Chart Data.`);
            }
          }
        });
      }
    });
  }
  return errors;
}
