/*
 * Pre-attempt guidance for library cases: "Suggested Framework" and "How to approach".
 *
 * A framework is shown only when Domain Knowledge explains it (Basic Economics ->
 * Toolkit Cards, plus the worked toolkits on the same page) and it fits
 * the case. Every authored hint passes through `poolCaseGuidance`, so a label that
 * is not one of those cards never reaches a learner as a framework. Approach tips
 * are reading or workflow guidance for the case's own exhibit or task; they never
 * name a branch, figure or answer choice. No grader reads either list.
 */

/** Card titles in Domain Knowledge -> Basic Economics -> Toolkits, exactly as published there. */
export const DOMAIN_KNOWLEDGE_TOOLKIT_CARDS: string[] = [
  'SWOT', 'PEST / PESTLE', 'Porter\u2019s Five Forces', 'BCG Matrix', 'McKinsey 7S', 'Ansoff Matrix',
  'Value Chain Analysis', 'MECE principle', 'Issue Tree', 'Hypothesis-driven thinking',
  '3C: Company, Customer, Competitor', '4P Marketing Mix', '4C Marketing Mix', 'Blue Ocean Strategy',
  'Balanced Scorecard', 'VRIN / VRIO', 'Pareto Principle (80/20)', 'First Principles Thinking',
  'Pyramid Principle', 'SCQA', 'Eisenhower Matrix', 'RACI', 'OKRs', 'KPIs vs. metrics',
  'Zero-based budgeting', 'Waterfall vs. Agile', 'Design Thinking', 'Jobs To Be Done',
  'Customer Journey Map', 'Net Promoter Score (NPS)', 'Unit Economics', 'CAC and LTV', 'Payback Period',
  'IRR and NPV', 'EBITDA', 'Working Capital', 'Gross Margin', 'Break-even Analysis',
  'Market Sizing: top-down and bottom-up', 'Fishbone / Ishikawa Diagram', 'Mind Mapping', 'Five Whys',
  'SWOT\u2013TOWS cross-analysis',
  'Worked toolkit: market sizing', 'Worked toolkit: break-even', 'Worked toolkit: profitability tree',
  'Worked toolkit: scenario analysis',
];

/** Where a learner finds these cards. Domain Knowledge has no per-card deep link yet. */
export const DOMAIN_KNOWLEDGE_TOOLKIT_PATH = 'Domain Knowledge \u203a Basic Economics \u203a Toolkit Cards';
export const DOMAIN_KNOWLEDGE_APP_ID = 'industry-knowledge';

export interface DomainKnowledgeFramework {
  /** Exact Domain Knowledge card title. */
  card: string;
  /** Chip label. */
  label: string;
}

const normalise = (value: string): string => String(value || '')
  .toLowerCase()
  .replace(/[\u2019']/g, "'")
  .replace(/[^a-z0-9']+/g, ' ')
  .trim();

const capitalise = (value: string): string => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value);

export const DOMAIN_KNOWLEDGE_FRAMEWORKS: DomainKnowledgeFramework[] = DOMAIN_KNOWLEDGE_TOOLKIT_CARDS.map((card) => ({
  card,
  label: card.startsWith('Worked toolkit: ') ? capitalise(card.slice('Worked toolkit: '.length)) : card,
}));

const FRAMEWORK_BY_NAME = new Map<string, DomainKnowledgeFramework>();
DOMAIN_KNOWLEDGE_FRAMEWORKS.forEach((framework) => {
  FRAMEWORK_BY_NAME.set(normalise(framework.card), framework);
  FRAMEWORK_BY_NAME.set(normalise(framework.label), framework);
});

/** The Domain Knowledge card for an exact card title or chip label; null for anything else. */
export function domainKnowledgeFramework(name: string): DomainKnowledgeFramework | null {
  return FRAMEWORK_BY_NAME.get(normalise(name)) || null;
}

const PROFITABILITY_TREE = 'Worked toolkit: profitability tree';
const THREE_C = '3C: Company, Customer, Competitor';
const FIVE_FORCES = 'Porter\u2019s Five Forces';

/**
 * Generated full cases (core library), keyed by the family's authored hint list.
 * Value = the Domain Knowledge cards that fit that family's question and
 * exhibits; [] = no Domain Knowledge framework fits, so the label is hidden.
 */
const FULL_CASE_FRAMEWORKS: Record<string, string[]> = {
  'Profitability Framework (revenue tree \u2013 cost tree)|Issue Tree / MECE|Value Chain Analysis': [PROFITABILITY_TREE],
  'Profitability Framework by segment|MECE Principle|BCG Growth-Share Matrix': [PROFITABILITY_TREE],
  'Profitability Framework by channel|4Ps / Marketing Mix (Place)|Value Chain Analysis': [PROFITABILITY_TREE],
  'Unit Economics|Profitability Framework|Cost-Benefit Analysis (payback)': ['Unit Economics', 'Payback Period'],
  'Profitability Framework (cost tree)|Pricing Strategies / price elasticity|Value Chain Analysis': ['Gross Margin', PROFITABILITY_TREE],
  "Market Entry Framework|4Cs (Customer, Company, Competition, Context)|Porter's 5 Forces": [FIVE_FORCES, THREE_C],
  'Market Sizing (top-down)|4Cs (Customer, Company, Competition, Context)|Ansoff Matrix (market development)': [THREE_C],
  'Ansoff Matrix|Profitability Framework by channel|Value Chain Analysis': [],
  'Pricing Strategies|Profitability Framework (contribution margin)|Market Sizing (bottom-up)': ['Break-even Analysis'],
  'Market Entry Framework|Market Sizing (bottom-up)|Cost-Benefit Analysis (payback)': ['Payback Period'],
  'Theory of Constraints / bottleneck analysis|Value Chain Analysis|Issue Tree / Logic Tree': [],
  'Value Chain Analysis|Profitability Framework (cost to serve)|Cost-Benefit Analysis': [],
  'Issue Tree / Logic Tree|Value Chain Analysis|MECE Principle': ['Issue Tree'],
  'Internal benchmarking|McKinsey 7-S Framework|Value Chain Analysis': [],
  "Porter's 5 Forces|Porter's Generic Strategies|Pricing Strategies": [FIVE_FORCES],
  'BCG Growth-Share Matrix|GE-McKinsey Matrix|Profitability Framework': ['BCG Matrix'],
  'Cost-Benefit Analysis|MECE Principle|Issue Tree / Logic Tree': ['Payback Period'],
  'M&A Valuation (EV/EBITDA multiples)|Cost-Benefit Analysis|Value Chain Analysis (synergies)': ['EBITDA'],
  'Post-Merger Integration|Cost-Benefit Analysis|McKinsey 7-S Framework': [],
  'Pricing Strategies|Profitability Framework (contribution margin)|Market Sizing': [],
  'McKinsey 7-S Framework|Value Chain Analysis|Profitability Framework': ['McKinsey 7S'],
};

/** Calculations bank: only where the task is the toolkit's own calculation. */
const CALCULATION_FRAMEWORKS: Record<string, string[]> = {
  'CM-CALC-E01': ['Break-even Analysis'],
  'CM-CALC-E02': ['Break-even Analysis'],
  'CM-CALC-H01': ['Break-even Analysis'],
  'CM-CALC-H02': ['Break-even Analysis'],
  'CM-CALC-H03': ['CAC and LTV'],
  'CM-CALC-H10': ['Unit Economics'],
  'CM-CALC-E10': ['Unit Economics'],
  'CM-CALC-H11': ['Payback Period'],
  'CM-CALC-E11': ['IRR and NPV'],
};

export function calculationFrameworks(sourceCaseId: string): string[] {
  return [...(CALCULATION_FRAMEWORKS[sourceCaseId] || [])];
}

/** Structures Easy bank, by case kind. Loan-portfolio case 008 has no fitting card. */
const STRUCTURES_EASY_FRAMEWORKS: Record<string, string[]> = {
  profit: [PROFITABILITY_TREE],
  portfolio: ['IRR and NPV'],
};

export function structuresEasyFrameworks(kind: string, questionId: string): string[] {
  if (questionId === 'structures-easy-008') return [];
  return [...(STRUCTURES_EASY_FRAMEWORKS[kind] || [])];
}

export function structuresEasyApproachTips(problem: string): string[] {
  return [`Check that your branches, taken together, could explain ${problem} without overlapping.`];
}

const CHART_READING: Record<string, string> = {
  line: 'Each point on the line is one period; read exact values from the data table under the chart.',
  'grouped bars': 'Bars sit side by side within each group, one per series in the legend; read exact values from the data table.',
  '100% stacked bars': 'Each bar totals 100% and is split into segments; read each segment value from the data table.',
  waterfall: 'The first and last bars are totals and each bar between them is one step from the previous total; read every step from the data table.',
  heatmap: 'Each cell is one row-and-column value; read exact cell values from the data table.',
  bullet: 'Each row shows an actual value and a target value; read both from the data table.',
  slopegraph: 'Each line joins one item\u2019s start value to its end value; read both ends from the data table.',
  area: 'The shaded area tracks the series over time; read each period from the data table.',
  funnel: 'Each stage is part of the stage above it; read the count at every stage from the data table.',
  donut: 'Each slice is part of the whole ring; read the exact values from the data table.',
  'combo bars and line': 'The bars and the line measure different things and can sit on different axes; check which axis each series uses before comparing.',
};

const UNIT_NOTES: Record<string, string> = {
  '%': 'Values are percentages.',
  thousand: 'Values are in thousands.',
  applications: 'Values are counts of applications.',
};

interface ChartExhibitLike {
  unit?: string;
  axisConfig?: { xLabel?: string; yLabel?: string };
}

/** One reading tip for the case's own exhibit type and unit. */
export function chartApproachTips(chart: string, source?: object): string[] {
  const exhibit = source as ChartExhibitLike | undefined;
  const unit = String(exhibit?.unit || '').trim();
  if (chart === 'scatter') {
    const x = exhibit?.axisConfig?.xLabel;
    const y = exhibit?.axisConfig?.yLabel;
    return [x && y
      ? `Each point is one option, placed by ${x.toLowerCase()} along the bottom and ${y.charAt(0).toLowerCase()}${y.slice(1)} up the side; read both values for a point before comparing points.`
      : 'Each point is one option placed by two measures; read both axis labels before comparing points.'];
  }
  const reading = CHART_READING[chart] || 'Read the exhibit title, legend and data table before comparing values.';
  const unitNote = unit ? ` ${UNIT_NOTES[unit] || `Values are in ${unit}.`}` : '';
  return [`${reading}${unitNote}`];
}

export function marketSizingApproachTips(format: string): string[] {
  return format === 'provided-data'
    ? ['Every input you need is in the brief. Enter each one as a labelled Component, then combine the Components into one bottom-up model. The issue tree is optional and is not graded.']
    : ['Fix the scope the brief sets, including anything it excludes, before choosing determinants. Add only the determinants you need as Components and give each a value. The issue tree is optional and is not graded.'];
}

export function creativityApproachTips(fields: string[]): string[] {
  const parts = fields.map((field) => String(field || '').trim()).filter(Boolean);
  return parts.length ? [`Cover each part this brief asks for: ${parts.join(', ')}.`] : [];
}

interface GuidedCaseLike {
  framework_hints?: string[];
  approach_tips?: string[];
  journey_id?: string;
}

const unique = (values: string[]): string[] => [...new Set(values)];

/**
 * The guidance a learner sees before attempting a case. Journey cases author
 * [generic tree, analytical approach, ...drill types]; only the approach can be a
 * framework. Generated families use the fit table. Anything else is kept only if
 * it is a Domain Knowledge card.
 */
export function poolCaseGuidance(item: GuidedCaseLike): { frameworks: string[]; approach: string[] } {
  const authored = (item.framework_hints || []).map((hint) => String(hint || '').trim()).filter(Boolean);
  const candidates = item.journey_id
    ? authored.slice(1, 2)
    : FULL_CASE_FRAMEWORKS[authored.join('|')] ?? authored;
  const frameworks = unique(candidates
    .map(domainKnowledgeFramework)
    .filter((framework): framework is DomainKnowledgeFramework => Boolean(framework))
    .map((framework) => framework.label));
  const approach = unique((item.approach_tips || []).map((tip) => String(tip || '').trim()).filter(Boolean))
    .filter((tip) => !domainKnowledgeFramework(tip));
  return { frameworks, approach };
}

/** Every fit-table entry must name a real Domain Knowledge card. */
export function validateCaseGuidance(): string[] {
  const errors: string[] = [];
  const tables: Array<[string, Record<string, string[]>]> = [
    ['full case', FULL_CASE_FRAMEWORKS],
    ['calculation', CALCULATION_FRAMEWORKS],
    ['structures easy', STRUCTURES_EASY_FRAMEWORKS],
  ];
  tables.forEach(([name, table]) => {
    Object.entries(table).forEach(([key, cards]) => {
      cards.forEach((card) => {
        if (!domainKnowledgeFramework(card)) errors.push(`${name} "${key}" names "${card}", which is not a Domain Knowledge toolkit card.`);
      });
    });
  });
  return errors;
}
