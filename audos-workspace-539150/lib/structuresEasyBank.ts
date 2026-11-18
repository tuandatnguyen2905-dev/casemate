import type { FullCase } from './casePoolLibrary';
import type { LibraryQuestion } from './skillQuestionLibrary';
import type { SuggestedStructureTree } from './structureSuggestedTrees';
import { structuresEasyApproachTips, structuresEasyFrameworks } from './caseGuidance';
import { casePoolTaskFromDrill, poolCaseMcqProblems } from './casePoolMcqGuard';
import { blockingUnitShorthand } from './unitLabels';

/**
 * Structures / Easy import: the first 34 cases (E-ST-001 to E-ST-034) of the
 * founder's 68-case Structures Easy bank. Easy Structures cases carry no
 * exhibit, matching the existing Easy bank: each case keeps only the company,
 * its industry and its business problem. The question, branches and A-D options
 * come from the source. The eight case kinds share one set of branches and
 * distractors there, so those live once per kind.
 * One record feeds Case Drill (QUESTION_LIBRARY) and Case Pool
 * (CASE_POOL_LIBRARY), and the issue-tree workspace uses the key as its
 * recommended tree.
 */
type StructureKind = 'profit' | 'flow' | 'entry' | 'acquisition' | 'growth' | 'retention' | 'capacity' | 'portfolio';

interface KindSpec {
  label: string;
  poolType: string;
  businessProblem: string;
  branches: string[];
  correctIndex: number;
  distractors: string[];
  explanations: string[];
  investigateFirst: string;
}

type CaseRow = [number: number, company: string, industry: string, kind: StructureKind, problem: string];

export interface StructuresEasyRecord {
  id: string;
  code: string;
  kind: StructureKind;
  kindLabel: string;
  company: string;
  industry: string;
  title: string;
  context: string;
  problem: string;
  question: string;
  options: string[];
  key: string;
  why: string;
  root: string;
  branches: string[];
  pool: [string, string];
}

const KINDS: Record<StructureKind, KindSpec> = {
  profit: {
    label: "Profitability Structure",
    poolType: "profitability",
    businessProblem: "Profitability decline",
    branches: ["Price × volume × mix by segment", "variable and fixed cost by activity", "bridge to cash and test what changed"],
    correctIndex: 2,
    distractors: ["Root: decision above → Fixed cost only; supplier prices; cut the largest account, leaving revenue and mix untested.", "Root: decision above → Segment margin and cash; launch a new offer; skip the current profit bridge.", "Root: decision above → Revenue by segment; marketing spend; reported cost totals, without price–volume or cost behaviour."],
    explanations: ["Splits revenue into price, volume and mix for each segment, so a sales rise that arrives with a margin fall can be traced to discounting, volume shifts or mix.", "Separates costs that move with volume from fixed costs by activity, so a cost increase is located before anyone cuts spend.", "Reconciles the profit change to cash and tests which line moved, so the diagnosis rests on what changed rather than on reported totals."],
    investigateFirst: "Order the analysis as: bridge the profit change into price, volume and mix by segment, then test cost behaviour by activity, and reconcile the movement to cash last. This locates where the profit equation changed before any cause is assumed.",
  },
  flow: {
    label: "Issue Tree",
    poolType: "operations",
    businessProblem: "Process flow",
    branches: ["Demand timing", "step-level capacity and utilisation", "availability and variability", "quality, rework and handoffs"],
    correctIndex: 3,
    distractors: ["Root: decision above → Customer complaints; staff sentiment; brand promise, without timing the process flow.", "Root: decision above → Capacity at the last step only; buy equipment before checking upstream constraints.", "Root: decision above → Revenue by customer group; gross margin; satisfaction, without arrival variability or rework."],
    explanations: ["Checks whether arrivals, peaks or timing changed before the process itself is blamed.", "Locates the constraint step by step instead of averaging capacity across the whole flow.", "Tests whether availability and variability create queues even when average capacity looks adequate.", "Captures capacity lost to rework and to handoffs between steps."],
    investigateFirst: "Order the analysis as: check whether demand timing changed, locate the constrained step, then test availability, variability, rework and handoffs. This separates a true constraint from coordination noise.",
  },
  entry: {
    label: "Market Entry Structure",
    poolType: "growth",
    businessProblem: "Market entry",
    branches: ["Market size and accessible demand", "ability to win", "unit economics and investment", "entry mode, regulatory and downside gates"],
    correctIndex: 0,
    distractors: ["Root: decision above → Market size; launch campaign; sales target, without ability to win or entry economics.", "Root: decision above → Our capabilities; partner shortlist; select an entry mode before sizing addressable demand.", "Root: decision above → Headline revenue; headline costs; choose the larger market without risk or capital hurdle."],
    explanations: ["Establishes whether accessible demand is large enough to justify entry.", "Tests whether the client can win against existing players before capital is committed.", "Converts the opportunity into unit economics and investment, tested against the stated hurdle.", "Chooses the entry mode last and sets regulatory and downside gates so the risk is bounded."],
    investigateFirst: "Order the analysis as: confirm accessible demand, test the ability to win, validate unit economics against the hurdle, and settle entry mode and downside gates last. A failed early gate makes the later design work irrelevant.",
  },
  acquisition: {
    label: "Acquisition Due Diligence Structure",
    poolType: "strategy",
    businessProblem: "Acquisition due diligence",
    branches: ["Standalone earnings quality", "customer and asset diligence", "synergies net of integration cost", "valuation, funding and downside"],
    correctIndex: 1,
    distractors: ["Root: decision above → Asset count; staff count; the cheaper target, without downside or value creation.", "Root: decision above → Purchase price; top-line synergies; close before testing earnings quality or integration.", "Root: decision above → Customer growth; market share; brand fit, excluding cash conversion and liabilities."],
    explanations: ["Tests whether reported earnings survive normalisation before any price is discussed.", "Checks the customers and assets behind the earnings for concentration, condition and utilisation.", "Values synergies only after netting the cost of integration.", "Links valuation and funding to downside protection, so the buyer can still walk away."],
    investigateFirst: "Order the analysis as: normalise earnings quality first, diligence customers and assets, net synergies against integration cost, and set valuation, funding and downside last. Weak underlying earnings invalidate the later valuation.",
  },
  growth: {
    label: "Growth Strategy Structure",
    poolType: "growth",
    businessProblem: "Growth strategy",
    branches: ["Customer need and addressable demand", "unit contribution and payback", "operational constraints", "pilot and scale gates"],
    correctIndex: 2,
    distractors: ["Root: decision above → Revenue potential; select the largest cohort before evaluating payback and delivery.", "Root: decision above → Product ideas; launch calendar; distribution, leaving the binding resource constraint aside.", "Root: decision above → Awareness; acquisition; more marketing, without marginal contribution or capacity."],
    explanations: ["Starts with who needs the offer and how much demand is addressable.", "Tests unit contribution and payback, so growth is judged on profit rather than volume.", "Names the binding operational constraint that caps how much growth is possible.", "Sets pilot and scale gates, so growth is staged against evidence."],
    investigateFirst: "Order the analysis as: size addressable demand, test unit contribution and payback, name the binding constraint, and set pilot and scale gates last. This screens viability before commitment.",
  },
  retention: {
    label: "Retention Issue Tree",
    poolType: "growth",
    businessProblem: "Customer retention",
    branches: ["Cohort and lifecycle loss", "reasons and competitive alternatives", "intervention economics", "feasible pilot and retention measure"],
    correctIndex: 3,
    distractors: ["Root: decision above → Blended churn; a blanket discount; count sign-ups instead of retained contribution.", "Root: decision above → Complaints; new creative; product features, without separating lifecycle cohorts.", "Root: decision above → Retention rate; support staffing; scale immediately without a pilot or control."],
    explanations: ["Splits the loss by cohort and lifecycle stage to locate where customers leave.", "Separates why customers leave from what competing alternatives offer.", "Tests whether an intervention pays back before it is scaled.", "Defines a feasible pilot and the retention measure that would show it worked."],
    investigateFirst: "Order the analysis as: locate the loss by cohort and lifecycle stage, establish why customers leave, test intervention economics, and design the pilot and retention measure last.",
  },
  capacity: {
    label: "Capacity Issue Tree",
    poolType: "operations",
    businessProblem: "Capacity constraint",
    branches: ["Demand by time and segment", "throughput and constraints by step", "scheduling and quality loss", "capex versus process fixes"],
    correctIndex: 0,
    distractors: ["Root: decision above → Add machines; add staff; extend hours before locating the constrained step.", "Root: decision above → Peak output only; ignore variability, yield loss and segment demand.", "Root: decision above → Revenue by segment; satisfaction by segment; choose capex before process tests."],
    explanations: ["Tests demand by time and segment, so peaks are not mistaken for a structural shortage.", "Finds the constrained step through throughput by step rather than total output.", "Accounts for scheduling and quality losses that consume capacity.", "Compares capital spend with process fixes only after the constraint is located."],
    investigateFirst: "Order the analysis as: test demand by time and segment, locate the constrained step, account for scheduling and quality loss, and compare capex with process fixes last.",
  },
  portfolio: {
    label: "Portfolio Decision Structure",
    poolType: "strategy",
    businessProblem: "Portfolio allocation",
    branches: ["Risk-adjusted return by option", "strategic fit", "shared resource constraints", "sequencing and stop/go thresholds"],
    correctIndex: 1,
    distractors: ["Root: decision above → Pick the fastest launch; defer sequencing and stop/go thresholds.", "Root: decision above → Rank headline growth; fund every positive-growth option without resource trade-offs.", "Root: decision above → Choose the highest gross margin; ignore risk, capital and shared capability constraints."],
    explanations: ["Compares the options on risk-adjusted return rather than headline growth or margin.", "Tests each option's strategic fit with the client's capabilities and priorities.", "Checks the shared resources, such as capital, people and capacity, that both options draw on.", "Sets sequencing and stop/go thresholds, so funding is staged and reversible."],
    investigateFirst: "Order the analysis as: compare risk-adjusted return by option, test strategic fit, check the shared resources both options need, and set sequencing and stop/go thresholds last.",
  },
};

const CASE_ROWS: CaseRow[] = [
  [1, "Atlas Pharmacies", "pharmacy retail", "profit", "a 9% sales rise and a 2.4-point profit-margin fall"],
  [2, "Birch Transit", "urban buses", "flow", "on-time departures falling from 91% to 82% with flat passenger demand"],
  [3, "Cedar Agro", "crop inputs", "entry", "entry into a neighbouring province with an 18 billion VND cap"],
  [4, "Dockside Foods", "seafood processing", "acquisition", "buying a 42 billion VND cold-storage operator with uneven utilisation"],
  [5, "Evergreen Tutors", "after-school tutoring", "growth", "adding 2,500 learners while tutor hours are capped"],
  [6, "Flora Diagnostics", "medical testing", "retention", "repeat bookings down 14% while new bookings rise 8%"],
  [7, "Granite Works", "precast construction", "capacity", "a 16% order increase but queue time up by four days"],
  [8, "Horizon Credit", "consumer lending", "portfolio", "choosing between two loan portfolios under a 6% loss ceiling"],
  [9, "Ivory Hotels", "boutique lodging", "profit", "room revenue up 11% but property profit down 3 billion VND"],
  [10, "JetParcel", "parcel delivery", "flow", "late deliveries doubled despite unchanged parcel volume"],
  [11, "Koru Foods", "organic groceries", "entry", "entering Da Nang with 12 billion VND and a two-year payback rule"],
  [12, "Lantern Mobility", "e-scooter sharing", "acquisition", "acquiring a fleet operator with 22% idle vehicles"],
  [13, "Mira Labs", "clinical software", "growth", "targeting 8 billion VND annual gross profit with one engineering squad"],
  [14, "Nova Aquaculture", "shrimp farming", "retention", "churn among contract farmers rising to 18%"],
  [15, "Olive Kitchen", "meal delivery", "capacity", "kitchen throughput falling 13% at the dinner peak"],
  [16, "Pavo Materials", "insulation panels", "portfolio", "allocating 25 billion VND between two plant expansions"],
  [17, "Qube Retail", "consumer electronics", "profit", "same-store sales flat while inventory days rise from 58 to 76"],
  [18, "Ridge Logistics", "cold-chain transport", "flow", "spoilage claims up 40% with unchanged shipment count"],
  [19, "Saffron Health", "urgent care", "entry", "testing a new suburban clinic with a 9 billion VND lease commitment"],
  [20, "Tidal Renewables", "wind maintenance", "acquisition", "buying a service firm with 61% technician utilisation"],
  [21, "Umber Fashion", "modest apparel", "growth", "growing online orders without increasing returns above 12%"],
  [22, "VenturePay", "payment terminals", "retention", "merchant dormancy rising after month three"],
  [23, "Woven Textiles", "garment manufacturing", "capacity", "defect rework rising from 4% to 9%"],
  [24, "Xylem Water", "water treatment", "portfolio", "prioritising industrial contracts under a 30 billion VND capex limit"],
  [25, "Yara Travel", "tour operations", "profit", "gross bookings up 21% but refunds consuming margin"],
  [26, "Zinc Marine", "ship repair", "flow", "dock turnaround worsening while booked jobs stay flat"],
  [27, "Aster Foods", "fermented beverages", "entry", "entering convenience stores with a six-month shelf-life constraint"],
  [28, "Boreal Batteries", "energy storage", "acquisition", "acquiring a battery integrator with three warranty vintages"],
  [29, "Clover Education", "vocational training", "growth", "launching two programmes with 60 instructor slots"],
  [30, "Diamond Care", "home nursing", "retention", "monthly cancellations rising to 17%"],
  [31, "Ember Steel", "metal fabrication", "capacity", "overtime up 28% with no revenue growth"],
  [32, "Fenix Telecom", "fiber installation", "portfolio", "choosing which district to build next with 20 billion VND"],
  [33, "Galen MedTech", "medical devices", "profit", "service profit down despite a larger installed base"],
  [34, "Helix Ports", "port operations", "flow", "crane delays rising at night despite steady vessel calls"],
];

const POOL_INDUSTRY_BY_NUMBER: Record<number, string> = {"1": "retail", "2": "logistics", "3": "fmcg", "4": "fmcg", "5": "retail", "6": "healthcare", "7": "real-estate", "8": "banking", "9": "real-estate", "10": "logistics", "11": "fmcg", "12": "logistics", "13": "tech", "14": "fmcg", "15": "retail", "16": "real-estate", "17": "retail", "18": "logistics", "19": "healthcare", "20": "logistics", "21": "retail", "22": "tech", "23": "fmcg", "24": "logistics", "25": "retail", "26": "logistics", "27": "fmcg", "28": "tech", "29": "retail", "30": "healthcare", "31": "logistics", "32": "tech", "33": "healthcare", "34": "logistics"};

const capitalise = (value: string): string => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value);

const slug = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'branch';

function buildRecord(row: CaseRow): StructuresEasyRecord {
  const [number, company, industry, kind, problem] = row;
  const spec = KINDS[kind];
  const code = `E-ST-${String(number).padStart(3, '0')}`;
  const branchText = spec.branches.join('; ');
  const options = [...spec.distractors];
  options.splice(spec.correctIndex, 0, `Root: decision above \u2192 ${branchText}.`);
  const root = `How should ${company} resolve ${problem}?`;
  return {
    id: `structures-easy-${String(number).padStart(3, '0')}`,
    code,
    kind,
    kindLabel: spec.label,
    company,
    industry,
    title: `${company} ${spec.label}`,
    context: `${company} operates in ${industry}. Management needs a testable decision structure, not a list of symptoms.`,
    problem,
    question: `${company}, a ${industry} organisation, faces ${problem}. Which issue tree is the strongest starting point for the decision?`,
    options,
    key: `Root: ${root} Branches: ${branchText}.`,
    why: `Keep branches distinct. ${spec.explanations.join(' ')}`,
    root,
    branches: [...spec.branches],
    pool: [POOL_INDUSTRY_BY_NUMBER[number], spec.poolType],
  };
}

export const STRUCTURES_EASY_RECORDS: StructuresEasyRecord[] = CASE_ROWS.map(buildRecord);

const RECORD_BY_ID = new Map(STRUCTURES_EASY_RECORDS.map((record): [string, StructuresEasyRecord] => [record.id, record]));

/** The key's root and branches, shown as the recommended tree after a learner submits. */
export function structuresEasySuggestedTree(questionId: string): SuggestedStructureTree | null {
  const record = RECORD_BY_ID.get(questionId);
  if (!record) return null;
  const spec = KINDS[record.kind];
  const branches = record.branches.map((text, index) => {
    const label = capitalise(text);
    return { id: `${record.id}-branch-${index + 1}-${slug(label)}`, text: label, children: [] };
  });
  return {
    caseId: record.id,
    root: { id: `${record.id}-root`, text: record.root },
    branches,
    explanations: branches.map((branch, index) => ({ branchId: branch.id, title: branch.text, explanation: spec.explanations[index] })),
    investigateFirst: spec.investigateFirst,
  };
}

export const STRUCTURES_EASY_QUESTIONS: LibraryQuestion[] = STRUCTURES_EASY_RECORDS.map((record) => ({
  id: record.id,
  skill: 'structures' as const,
  difficulty: 'easy' as const,
  title: record.title,
  question: record.question,
  options: [...record.options],
  correctAnswer: record.key,
  explanation: record.why,
  answerMode: 'text' as const,
  businessContext: record.context,
  industry: capitalise(record.industry),
  businessProblem: KINDS[record.kind].businessProblem,
  drillType: record.kindLabel,
  drillTypeLocked: true,
  sourceCaseId: record.code,
}));

/**
 * The Case Pool task: build the tree. The four Case Drill trees (the key and its three distractors) stay in the
 * record's own `options`; the drill's "which tree is strongest" wording is not carried over.
 */
export function structuresEasyPoolTask(record: StructuresEasyRecord): string {
  return casePoolTaskFromDrill(
    `${record.company}, a ${record.industry} organisation, faces ${record.problem}. Build the issue tree you would use as the starting point for this decision.`,
    'State the root question, set out the distinct branches, and say what evidence each branch needs.',
  );
}

export const STRUCTURES_EASY_CASE_POOL_CASES: FullCase[] = STRUCTURES_EASY_RECORDS.map((record) => {
  const spec = KINDS[record.kind];
  const task = structuresEasyPoolTask(record);
  const branchLabels = record.branches.map(capitalise);
  return {
    id: `case-${record.id}`,
    title: record.title,
    industry: record.pool[0],
    type: record.pool[1],
    difficulty: 'easy' as const,
    situation: record.context,
    key_question: task,
    data_exhibits: [],
    framework_hints: structuresEasyFrameworks(record.kind, record.id),
    approach_tips: structuresEasyApproachTips(record.problem),
    objective: task,
    constraints: ['Keep branches distinct and testable.', 'Start from the decision and name what evidence each branch needs.'],
    estimated_minutes: 8,
    skill_focus: ['structures' as const],
    related_drill_ids: [record.id],
    source_status: 'original-complete' as const,
    data_status: 'shared-validated' as const,
    review_status: 'active' as const,
    model_answer: {
      situation_analysis: `${record.company} needs a testable decision structure for ${record.problem}, not a list of symptoms.`,
      framework_applied: `${spec.label}: ${branchLabels.join(' \u2192 ')}`,
      issue_tree: branchLabels,
      key_findings: [spec.investigateFirst, ...branchLabels.map((label, index) => (spec.explanations[index] ? `${label}: ${spec.explanations[index]}` : label))],
      recommendation: record.key,
    },
    tags: [record.kindLabel, record.industry, 'Structures Easy bank'],
  };
});

export function validateStructuresEasyBank(): string[] {
  const errors: string[] = [];
  if (STRUCTURES_EASY_RECORDS.length !== 34) errors.push(`Structures Easy import must contain 34 cases; found ${STRUCTURES_EASY_RECORDS.length}.`);
  const titles = STRUCTURES_EASY_RECORDS.map((record) => record.title);
  if (new Set(titles).size !== titles.length) errors.push('Structures Easy titles must be unique.');
  if (new Set(STRUCTURES_EASY_RECORDS.map((record) => record.id)).size !== STRUCTURES_EASY_RECORDS.length) errors.push('Structures Easy ids must be unique.');
  STRUCTURES_EASY_QUESTIONS.forEach((question, index) => {
    const record = STRUCTURES_EASY_RECORDS[index];
    const expected = `E-ST-${String(index + 1).padStart(3, '0')}`;
    if (record.code !== expected) errors.push(`${record.id} is out of order; expected ${expected}.`);
    if (/E-ST/i.test(record.title)) errors.push(`${record.id} title must not contain a source code.`);
    if (new Set(record.options).size !== 4) errors.push(`${record.id} must have four distinct options.`);
    if (record.options.filter((option) => option === `Root: decision above \u2192 ${record.branches.join('; ')}.`).length !== 1) errors.push(`${record.id} key must match exactly one option.`);
    if (question.exhibits?.length || question.exhibit) errors.push(`${record.id} is Easy and must not carry an exhibit.`);
  });
  STRUCTURES_EASY_CASE_POOL_CASES.forEach((item) => poolCaseMcqProblems(item).forEach((problem) => errors.push(problem)));
  blockingUnitShorthand(STRUCTURES_EASY_RECORDS.map((record) => ({ id: record.id, record }))).forEach((problem) => errors.push(problem));
  return errors;
}
