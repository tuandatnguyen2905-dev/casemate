import { ADVANCED_CASE_DRILL_QUESTIONS } from './advancedCaseDrillQuestions';
import { CASE_JOURNEY_DRILLS, validateCaseJourneys } from './caseJourneys';
import { EXPERT_CASE_DRILL_QUESTIONS, EXPERT_DRILL_TYPES } from './expertCaseDrillQuestions';
import { EXPERT_CASE_EXPANSION, upgradeHardQuestions, validateExpertExpansion } from './expertCaseExpansion';
import { HARD_CASE_DRILL_QUESTIONS } from './hardCaseDrillQuestions';

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
  /** Case Journey membership. A drill without these is a standalone question. */
  journeyId?: string;
  journeyStage?: number;
  journeyStageRole?: 'Diagnosis' | 'Implication' | 'Decision';
  /** Audit marker for the Easy/Medium reasoning-step calibration. */
  calibrationStatus?: 'revised-v1' | 'already-at-target-v1';
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
  { id: 'creativity', label: 'Creativity', shortLabel: 'Creativity', description: 'Generate broad, original, and commercially grounded ideas.' },
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
  if (question.difficulty === 'hard' || question.difficulty === 'expert') return question;
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
  { values: [58, 22, 12, 8], implication: 'Alpha Dominates While The Remaining Categories Form A Long Tail' },
] as const;

function patternedValues(base: number, spread: number, patternIndex: number): number[] {
  return chartPatterns[patternIndex % chartPatterns.length].offsets.map((offset) => round(base + offset * spread, 0));
}

function buildCharts(): LibraryQuestion[] {
  return chartContexts.flatMap((context, contextIndex) => {
    const base = 30 + contextIndex * 3;
    const labels = ['Alpha', 'Bravo', 'Charlie', 'Delta'];
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
    const firstId = contextIndex * 4 + 1;
    return [
      {
        id: `charts-${String(firstId).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId - 1),
        title: `${context} Performance Comparison`,
        question: `Which category leads the exhibit, and what should management investigate before reallocating resources toward it?`,
        options: choiceOptions(`${maxBarLabel}; Validate Whether Its Lead Is Sustainable And Profitable`, labels.filter((label) => label !== maxBarLabel).map((label) => `${label}; Scale Immediately Without Further Checks`), contextIndex),
        correctAnswer: `${maxBarLabel}; Validate Whether Its Lead Is Sustainable And Profitable`,
        explanation: `${maxBarLabel} has the highest value at ${maxBar}. The exhibit follows a ${barPattern.name.toLowerCase()} distribution: ${barPattern.implication.toLowerCase()}. A consultant should verify margin, growth durability, and capacity before recommending reallocation.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'bar' as const, title: `${context} - Current Performance`, unit: 'Index', labels, values: barValues },
      },
      {
        id: `charts-${String(firstId + 1).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId),
        title: `${context} Four-Year Trend`,
        question: `What is the total change from Year 1 to Year 4, and what is the clearest implication?`,
        options: choiceOptions(`Change: ${pct(totalChange)}; ${linePattern.implication}`, [`Change: ${pct(round((lineValues[3] - lineValues[0]) / lineValues[3] * 100, 1))}; The Base Is Year 4`, `Change: ${pct(round((lineValues[1] / lineValues[0] - 1) * 100, 1))}; Only Year 1 And Year 2 Matter`, `Change: ${lineValues[3] - lineValues[0]}%; Absolute Change Equals Percentage Change`], contextIndex + 1),
        correctAnswer: `Change: ${pct(totalChange)}; ${linePattern.implication}`,
        explanation: `Total change is (${lineValues[3]} ÷ ${lineValues[0]} − 1) × 100 = ${pct(totalChange)}. The ${linePattern.name.toLowerCase()} shape shows that ${linePattern.implication.toLowerCase()}, so management should investigate the underlying drivers rather than infer a constant trend.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'line' as const, title: `${context} - Yearly Index`, unit: 'Index', labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], values: lineValues },
      },
      {
        id: `charts-${String(firstId + 2).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId + 1),
        title: `${context} Mix Analysis`,
        question: `What share do Alpha and Bravo represent together, and what does the distribution imply?`,
        options: choiceOptions(`Combined Share: ${pieValues[0] + pieValues[1]}%; ${compositionPattern.implication}`, [`Combined Share: ${pieValues[0]}%; Only The Largest Slice Counts`, `Combined Share: ${100 - pieValues[0] - pieValues[1]}%; The Remaining Categories Are Alpha And Bravo`, `Combined Share: ${Math.abs(pieValues[0] - pieValues[1])}%; The Difference Is The Combined Share`], contextIndex + 2),
        correctAnswer: `Combined Share: ${pieValues[0] + pieValues[1]}%; ${compositionPattern.implication}`,
        explanation: `Add Alpha (${pieValues[0]}%) and Bravo (${pieValues[1]}%) to get ${pieValues[0] + pieValues[1]}%. ${compositionPattern.implication}.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'pie' as const, title: `${context} - Share Of Total`, unit: 'Percent', labels, values: pieValues },
      },
      {
        id: `charts-${String(firstId + 3).padStart(3, '0')}`, skill: 'charts' as const, difficulty: difficultyOf(firstId + 2),
        title: `${context} Profitability Table`,
        question: `Which category generates the highest absolute profit, and which two figures support your answer?`,
        options: choiceOptions(`${highestProfitRow[0]}; Revenue ${highestProfitRow[1]} And Margin ${highestProfitRow[2]}`, tableRows.filter((row) => row !== highestProfitRow).map((row) => `${row[0]}; Revenue ${row[1]} And Margin ${row[2]}`), contextIndex + 3),
        correctAnswer: `${highestProfitRow[0]}; Revenue ${highestProfitRow[1]} And Margin ${highestProfitRow[2]}`,
        explanation: `Absolute profit equals revenue multiplied by margin. ${highestProfitRow[0]} produces ${highestProfitRow[3]} profit units, the highest value in the final column.`,
        answerMode: 'choice' as const,
        exhibit: { kind: 'table' as const, title: `${context} - Revenue And Profitability`, unit: 'Revenue In VND Billion', columns: ['Category', 'Revenue', 'Margin', 'Profit'], rows: tableRows },
      },
    ];
  });
}

const structureObjectives = [
  { title: 'Profit Decline', prompt: 'Profit has fallen for two years. Which issue tree is the strongest starting point?', correct: 'Revenue: Price, Volume, And Mix; Costs: Fixed And Variable; Then Segment By Product, Customer, Channel, And Geography', alternatives: ['Marketing, Sales, Finance, And Operations Departments', 'Competitors, Customers, And Regulation Without A Profit Bridge', 'List Every Cost Line Before Testing Revenue'], explanation: 'Start with the profit equation, keep revenue and cost branches mutually exclusive, then segment the drivers to locate the source of deterioration.' },
  { title: 'Market Entry', prompt: 'The client is considering entering a new market. Which structure best supports the decision?', correct: 'Market Attractiveness; Ability To Win; Entry Economics; Entry Mode And Risks', alternatives: ['Product, Price, Place, And Promotion Only', 'Revenue And Cost Only', 'Customers, Competitors, And Company History'], explanation: 'A complete entry structure tests whether the market is attractive, whether the client can win, whether returns clear the hurdle, and how to enter safely.' },
  { title: 'Growth Strategy', prompt: 'The client wants to double revenue in three years. Which decomposition is most decision-useful?', correct: 'Grow The Core; Expand Into Adjacent Customers, Products, And Geographies; Build New Businesses; Test Enablers And Economics', alternatives: ['Organic Growth And Inorganic Growth Without Further Detail', 'Raise Prices Across Every Product', 'Brainstorm Products Before Diagnosing The Core'], explanation: 'The structure separates core growth, adjacencies, and new businesses while testing capabilities and economics, making the options MECE and actionable.' },
  { title: 'Operations Bottleneck', prompt: 'Service levels are worsening despite stable demand. Which issue tree should the team use?', correct: 'Demand Pattern; Process Capacity By Step; Labour And Asset Availability; Scheduling And Variability; Quality And Rework', alternatives: ['Revenue, Cost, And Profit', 'Customer Segments And Brand Awareness', 'Technology Projects And Vendor List'], explanation: 'A bottleneck diagnosis follows demand through each process step, then tests capacity, availability, variability, and rework as distinct root causes.' },
  { title: 'Acquisition Due Diligence', prompt: 'A private-equity client is evaluating an acquisition. Which structure is most complete?', correct: 'Market And Competitive Position; Revenue Quality; Cost And Margin Sustainability; Management And Operations; Deal Economics And Risks', alternatives: ['Revenue Growth And EBITDA Only', 'Customer Interviews Without Financial Validation', 'Synergies Before Testing The Standalone Business'], explanation: 'Commercial diligence must link market quality and competitive position to sustainable revenue, margins, operational capability, and deal returns.' },
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

function buildCreativity(): LibraryQuestion[] {
  return businesses.flatMap(([company, industry], companyIndex) => creativityThemes.map(([theme, prompt], themeIndex) => {
    const id = companyIndex * 5 + themeIndex + 1;
    return {
      id: `creativity-${String(id).padStart(3, '0')}`, skill: 'creativity' as const, difficulty: difficultyOf(id - 1), title: `${company} ${theme}`,
      question: `${company}, a ${industry}, asks: ${prompt} Produce at least six distinct ideas using a clear structure appropriate to the question, then identify the most promising idea and one risk. Multiple structures are valid.`,
      correctAnswer: creativityApproaches[themeIndex] || creativityApproaches[0],
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
  { name: 'Vietnam', population: 101, currency: 'VND' as const },
  { name: 'Ho Chi Minh City', population: 9.5, currency: 'VND' as const },
  { name: 'Hanoi', population: 8.6, currency: 'VND' as const },
  { name: 'Southeast Asia', population: 690, currency: 'USD' as const },
  { name: 'Global Urban Markets', population: 4600, currency: 'USD' as const },
];

function buildMarketSizing(): LibraryQuestion[] {
  return markets.flatMap(([market, eligible, adoption, frequency, priceVndK, priceUsd], marketIndex) => sizingRegions.map((region, regionIndex) => {
    const id = marketIndex * 5 + regionIndex + 1;
    const eligiblePeople = region.population * eligible / 100;
    const buyers = eligiblePeople * adoption / 100;
    const isVnd = region.currency === 'VND';
    const tam = round(buyers * frequency * (isVnd ? priceVndK : priceUsd), 1);
    const unit = isVnd ? 'VND Billion Per Year' : 'USD Million Per Year';
    const priceLabel = isVnd ? `VND ${priceVndK} thousand` : `USD ${priceUsd}`;
    return {
      id: `market-sizing-${String(id).padStart(3, '0')}`, skill: 'market-sizing' as const, difficulty: difficultyOf(id - 1),
      title: `${region.name} ${market} Market Size`,
      question: `Estimate the annual ${market.toLowerCase()} market in ${region.name}. Use a population of ${region.population} million, an eligible share of ${eligible}%, adoption of ${adoption}% among eligible people, annual purchase frequency of ${frequency}, and an average price of ${priceLabel}. Show each step and state the result in ${unit}.`,
      correctAnswer: `Market Size: ${tam.toLocaleString()} ${unit}`,
      explanation: `Eligible Population: ${region.population} million × ${eligible}% = ${round(eligiblePeople, 2)} million.\nAdopting Buyers: ${round(eligiblePeople, 2)} million × ${adoption}% = ${round(buyers, 2)} million.\nAnnual Units: ${round(buyers, 2)} million × ${frequency} = ${round(buyers * frequency, 2)} million.\nAnnual Market Value: ${round(buyers * frequency, 2)} million × ${priceLabel} = ${tam.toLocaleString()} ${unit}.\nSanity Check: Compare The Implied Spend Per Buyer With A Realistic Household Or Business Budget.`,
      answerMode: 'number' as const, numericAnswer: tam, numericTolerance: Math.max(0.2, tam * 0.01), answerUnit: unit,
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
    if (text.includes('trend')) drillType = 'Trend Analysis';
    else if (text.includes('mix')) drillType = 'Mix-Shift Analysis';
    else if (text.includes('profit')) drillType = 'Profitability Analysis';
  } else if (question.skill === 'calculations') {
    if (text.includes('breakeven')) drillType = 'Break-Even Analysis';
    else if (text.includes('growth')) drillType = 'Growth Calculation';
    else if (text.includes('profit')) drillType = 'Profitability Calculation';
    businessProblem = text.includes('cost') ? 'Cost reduction' : text.includes('profit') ? 'Profitability' : businessProblem;
  } else if (question.skill === 'structures') {
    drillType = text.includes('entry') ? 'Market Entry Structure' : text.includes('profit') ? 'Profitability Structure' : 'Issue Tree';
    businessProblem = text.includes('entry') ? 'Market entry' : text.includes('profit') ? 'Profitability decline' : businessProblem;
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

function prepareLibrary(skill: LibrarySkill, questions: LibraryQuestion[]): LibraryQuestion[] {
  const prepared = upgradeHardQuestions(questions).map((question) => ({
    ...question,
    ...inferFilterMetadata(question),
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
  return [
    // Journey drills and the structured Hard bank bypass inferFilterMetadata so
    // their authored drill type, industry, and business problem survive intact.
    ...CASE_JOURNEY_DRILLS.filter((question) => question.skill === skill),
    ...HARD_CASE_DRILL_QUESTIONS.filter((question) => question.skill === skill),
    ...prepared,
  ];
}

export const QUESTION_LIBRARY: Record<LibrarySkill, LibraryQuestion[]> = {
  charts: prepareLibrary('charts', [...buildCharts(), ...ADVANCED_CASE_DRILL_QUESTIONS, ...expertFor('charts')]),
  structures: prepareLibrary('structures', [...buildStructures(), ...expertFor('structures')]),
  calculations: prepareLibrary('calculations', [...buildCalculations(), ...expertFor('calculations')]),
  creativity: prepareLibrary('creativity', [...buildCreativity(), ...expertFor('creativity')]),
  'market-sizing': prepareLibrary('market-sizing', [...buildMarketSizing(), ...expertFor('market-sizing')]),
};

export const ALL_LIBRARY_QUESTIONS = SKILL_META.flatMap((skill) => QUESTION_LIBRARY[skill.id]);

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

export function questionCountFor(skill: LibrarySkill): number {
  return QUESTION_LIBRARY[skill].length;
}

export function validateExpertQuestion(question: LibraryQuestion): string[] {
  if (question.difficulty !== 'expert' || !question.structuredAnswer) return [];
  const errors: string[] = [];
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
  if (question.difficulty !== 'hard' || !question.structuredAnswer) return [];
  const errors: string[] = [];
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

export function validateQuestionLibrary(): string[] {
  const errors: string[] = [...validateExpertExpansion(), ...validateCaseJourneys()];
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
      errors.push(...validateExpertQuestion(question));
      errors.push(...validateHardStructuredQuestion(question));
      if (question.difficulty === 'hard') {
        const hardExhibits = question.exhibits || [];
        if (hardExhibits.length < 2 || new Set(hardExhibits.map((exhibit) => exhibit.kind === 'bar' ? 'vertical-bar' : exhibit.kind)).size < 2) {
          errors.push(`${question.id} Hard Case Must Have At Least Two Distinct Exhibit Types.`);
        }
        if (!question.structuredAnswer && question.reviewStatus !== 'Archived') errors.push(`${question.id} Legacy Hard MCQ Must Be Archived.`);
      }
      if (question.status === 'draft-pending-review') {
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
