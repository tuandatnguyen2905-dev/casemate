import type { LibraryExhibit, LibraryQuestion } from './skillQuestionLibrary';
import type { SuggestedStructureTree } from './structureSuggestedTrees';
import { structuresEasySuggestedTree } from './structuresEasyBank';
import { clarifyUnitLabel, clarifyUnitText } from './unitLabels';
import {
  STRUCTURE_FRAMEWORK_BY_ID,
  STRUCTURE_FRAMEWORK_SHARED,
  type FrameworkBranch,
  type StructureFramework,
  type StructureFrameworkId,
} from './structureFrameworks';

export type FrameworkFit = 'strong' | 'partial' | 'none';

export interface FrameworkMapping {
  primary: StructureFrameworkId | null;
  secondary: StructureFrameworkId | null;
  fit: FrameworkFit;
  /** Why this framework was chosen, or why none fits. */
  basis: string;
  /** True when a person should confirm the mapping. */
  manualReview: boolean;
}

export interface GuideBranch {
  id: string;
  label: string;
  why: string;
  subdrivers: string[];
  evidence: string[];
  drivers: string[];
}

export interface StructureAnswerGuide {
  questionId: string;
  mapping: FrameworkMapping;
  objective: string;
  rootText: string;
  branches: GuideBranch[];
  evidenceToInvestigate: string[];
  priorities: string[];
  alternativeStructures: string[];
  exhibitFacts: string[];
  analysisOrder: string;
  guardrails: string[];
}

export interface TreeAssessment {
  matchedDrivers: string[];
  missedDrivers: string[];
  branchCoverage: Array<{ branchId: string; status: 'covered' | 'partial' | 'missed' }>;
  /** The material driver most worth naming, or null when the tree covers the guide. */
  mostMaterialGap: string | null;
}

const NO_FIT = (basis: string): FrameworkMapping => ({ primary: null, secondary: null, fit: 'none', basis, manualReview: true });
const fit = (primary: StructureFrameworkId, secondary: StructureFrameworkId | null, quality: FrameworkFit, basis: string, manualReview = quality !== 'strong'): FrameworkMapping => ({ primary, secondary, fit: quality, basis, manualReview });

const BUILT_OBJECTIVE_MAPPING: Array<[StructureFrameworkId, string]> = [
  ['F01', 'Profit Decline objective'],
  ['F04', 'Market Entry objective'],
  ['F02', 'Growth Strategy objective'],
  ['F10', 'Operations Bottleneck objective'],
  ['F07', 'Acquisition Due Diligence objective'],
];

const EASY_KIND_MAPPING: Record<string, [StructureFrameworkId, FrameworkFit, string]> = {
  'Profitability Structure': ['F01', 'strong', 'profit gap and margin decline'],
  'Issue Tree': ['F10', 'strong', 'flow, queue or service failure through process steps'],
  'Market Entry Structure': ['F04', 'strong', 'market entry decision with a hurdle'],
  'Acquisition Due Diligence Structure': ['F07', 'strong', 'acquisition of a specific target'],
  'Growth Strategy Structure': ['F02', 'strong', 'growth under a stated constraint'],
  'Retention Issue Tree': ['F02', 'partial', 'retention is only the core-growth lever in F02; the case diagnoses churn rather than choosing growth options'],
  'Capacity Issue Tree': ['F10', 'strong', 'throughput and constraint diagnosis'],
  'Portfolio Decision Structure': ['F08', 'strong', 'allocating capital between options under a limit'],
};

const EXPLICIT: Record<string, FrameworkMapping> = {
  'structures-easy-008': fit('F08', null, 'partial', 'choosing between two loan portfolios under a loss ceiling is an allocation decision, but F08 assumes upfront spending and incremental cash flows'),
  'structures-expert-201': fit('F04', null, 'strong', 'Market Entry Structure expert case'),
  'structures-hard-insight-401': fit('F10', null, 'strong', 'MetroParcel late-delivery diagnosis across process steps and regions'),
  'structures-swiftcare-growth-route-v1': fit('F02', null, 'strong', 'growth route question; mapped from its title and id', true),
  'structures-journey-703': fit('F02', 'F08', 'partial', 'volume decline in a growing category, then a choice between funding promotion and rebuilding cold chain'),
  'structures-journey-712': NO_FIT('working capital absorbing profit and the choice between funding growth and releasing cash has no matching framework in F01-F10'),
  'structures-journey-715': fit('F08', 'F10', 'strong', 'second line versus recovering capacity on an existing line under a capital request', false),
  'structures-journey-718': fit('F04', null, 'strong', 'enter a neighbouring market and choose the route', false),
  'structures-journey-724': fit('F08', null, 'partial', 'grow, hold or exit store formats at lease renewal is a portfolio allocation closest to F08'),
  'structures-journey-730': fit('F10', 'F08', 'strong', 'service failure in parcel delivery versus a locker investment', false),
  'structures-journey-733': fit('F02', 'F01', 'partial', 'net revenue retention and segment economics span retention and profitability'),
  'structures-journey-742': fit('F02', null, 'strong', 'defend the core or enter an adjacent snacking segment', false),
  'structures-journey-745': fit('F01', 'F02', 'partial', 'retailer mix trading the category down; the joint plan trades price, volume and mix'),
  'structures-journey-751': fit('F01', null, 'strong', 'profit improved while volume declined', false),
  'structures-journey-754': fit('F01', null, 'strong', 'profit collapse after a record year', false),
  'structures-journey-757': fit('F09', 'F05', 'strong', 'premium entrant disrupting a single-incumbent category, with a possible premium launch', false),
  'structures-journey-763': fit('F02', 'F01', 'partial', 'channel collapse and margin erosion with a choice of where to aim growth'),
  'structures-journey-769': fit('F07', null, 'strong', 'acquire a backpack specialist at the asking price, lower, or walk away', false),
  'structures-journey-772': fit('F02', 'F01', 'strong', 'route to a top-three share position with a margin condition', false),
};

const EXPERT_FAMILIES: Array<[number, number, FrameworkMapping]> = [
  [330, 334, fit('F02', 'F10', 'partial', 'evidence-based issue tree on an ambiguous growth constraint across demand, capacity, economics and execution')],
  [335, 339, NO_FIT('structure prioritisation across competing hypotheses is a reasoning-process drill, not one business problem in F01-F10')],
  [340, 344, NO_FIT('hypothesis refinement after reading evidence is a reasoning-process drill, not one business problem in F01-F10')],
  [345, 349, fit('F10', 'F08', 'partial', 'multi-stage transformation of network economics and operational readiness')],
  [350, 354, NO_FIT('reconciling conflicting evidence is a reasoning-process drill, not one business problem in F01-F10')],
  [355, 359, fit('F04', null, 'partial', 'board recommendation weighing market attractiveness, economics and feasibility')],
];

function scoreText(framework: StructureFramework, text: string): number {
  return framework.structure.drivers.filter((driver) => new RegExp(driver.pattern, 'i').test(text)).length;
}

function questionText(question: LibraryQuestion): string {
  return [question.title, question.question, question.businessProblem, question.drillType, question.businessContext, question.clientObjective].filter(Boolean).join(' ');
}

/** Maps a Structures question to its most relevant primary framework, with a secondary only when the case needs one. */
export function frameworkMappingFor(question: LibraryQuestion): FrameworkMapping {
  const explicit = EXPLICIT[question.id];
  if (explicit) return explicit;
  const built = /^structures-(\d{3})$/.exec(question.id);
  if (built) {
    const [id, label] = BUILT_OBJECTIVE_MAPPING[(Number(built[1]) - 1) % 5];
    return fit(id, null, 'strong', label, false);
  }
  const easy = EASY_KIND_MAPPING[String(question.drillType || '')];
  if (/^structures-easy-\d{3}$/.test(question.id) && easy) return fit(easy[0], null, easy[1], easy[2]);
  const expert = /^structures-expert-(\d{3})$/.exec(question.id);
  if (expert) {
    const number = Number(expert[1]);
    const family = EXPERT_FAMILIES.find(([from, to]) => number >= from && number <= to);
    if (family) return family[2];
  }
  const text = questionText(question);
  const ranked = Object.values(STRUCTURE_FRAMEWORK_BY_ID)
    .map((framework) => ({ framework, score: scoreText(framework, text) }))
    .sort((a, b) => b.score - a.score);
  if (ranked[0] && ranked[0].score >= 4 && ranked[0].score - (ranked[1]?.score || 0) >= 2) {
    return fit(ranked[0].framework.id, null, 'partial', 'chosen from the question wording by keyword match');
  }
  return NO_FIT('the question wording does not match any single framework');
}

function companyOf(question: LibraryQuestion): string {
  const head = String(question.title || '').split(/\s[-–—]\s/)[0];
  const cleaned = head.replace(/\s+(?:Profit Decline|Profitability|Retention|Capacity|Portfolio|Market Entry|Growth Strategy|Operations Bottleneck|Acquisition Due Diligence|Issue Tree|Structure)\b.*$/i, '').trim();
  return cleaned || 'the client';
}

const fill = (text: string, company: string): string => text.split('{company}').join(company);

function exhibitText(exhibit: LibraryExhibit): string {
  return [exhibit.title, ...(exhibit.categories || exhibit.labels || []), ...(exhibit.series || []).map((series) => series.name), ...(exhibit.columns || [])].join(' ').toLowerCase();
}

const compact = (value: number | string): string => (typeof value === 'number' ? String(Math.round(value * 100) / 100) : String(value));

/** Literal restatements of exhibit values only: nothing is inferred beyond what the exhibit shows. */
function exhibitFact(exhibit: LibraryExhibit, index: number): string {
  const unit = clarifyUnitLabel(exhibit.unit);
  const header = clarifyUnitText([exhibit.title, ...(exhibit.columns || [])].join(' '));
  const stated = new RegExp(`(?:^|[^\\p{L}])${unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu').test(header);
  const unitNote = unit && !/^(?:as shown|values?|n\/a)$/i.test(unit) && !stated ? `, in ${unit}` : '';
  const label = `Exhibit ${index + 1} (${exhibit.title}${unitNote})`;
  if (exhibit.columns?.length && exhibit.rows?.length) {
    const rows = exhibit.rows.slice(0, 4).map((row) => row.map((cell, cellIndex) => `${exhibit.columns?.[cellIndex] || 'Value'} ${cell}`).join(', '));
    return `${label}: ${rows.join('; ')}`;
  }
  const categories = (exhibit.categories || exhibit.labels || []).map(String);
  const series = exhibit.series || (exhibit.values ? [{ name: 'Value', values: exhibit.values }] : []);
  if (!categories.length || !series.length) return label;
  const parts = series.slice(0, 3).map((item) => {
    const cells = categories.slice(0, 6).map((category, position) => `${category} ${compact(item.displayValues?.[position] ?? item.values[position])}`);
    return `${item.name}: ${cells.join(', ')}`;
  });
  return `${label}: ${parts.join(' | ')}`;
}

function relevantExhibit(branch: FrameworkBranch, framework: StructureFramework, exhibits: LibraryExhibit[]): number {
  let best = -1;
  let bestScore = 0;
  exhibits.forEach((exhibit, index) => {
    const text = exhibitText(exhibit);
    const score = branch.drivers.reduce((sum, id) => {
      const driver = framework.structure.drivers.find((item) => item.id === id);
      return sum + (driver && new RegExp(driver.pattern, 'i').test(text) ? 1 : 0);
    }, 0);
    if (score > bestScore) { best = index; bestScore = score; }
  });
  return best;
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'branch';
}

function exhibitsOf(question: LibraryQuestion): LibraryExhibit[] {
  return question.exhibits?.length ? question.exhibits : question.exhibit ? [question.exhibit] : [];
}

/** Builds the case-specific answer guide from the question, its exhibits and its mapped framework. Returns null when no framework fits. */
export function structureAnswerGuideFor(question: LibraryQuestion): StructureAnswerGuide | null {
  const mapping = frameworkMappingFor(question);
  const framework = mapping.primary ? STRUCTURE_FRAMEWORK_BY_ID[mapping.primary] : null;
  if (!framework) return null;
  const secondary = mapping.secondary ? STRUCTURE_FRAMEWORK_BY_ID[mapping.secondary] : null;
  const company = companyOf(question);
  const exhibits = exhibitsOf(question);
  const facts = exhibits.map(exhibitFact);
  const authored = structuresEasySuggestedTree(question.id);
  const matches: number[] = [];
  const branches: GuideBranch[] = framework.structure.branches.map((branch, index) => {
    const exhibitIndex = relevantExhibit(branch, framework, exhibits);
    matches.push(exhibitIndex);
    const evidence = [
      ...(exhibitIndex >= 0 ? [`Reconcile this branch with ${facts[exhibitIndex]}`] : []),
      ...(framework.structure.evidenceChecks[index] ? [fill(framework.structure.evidenceChecks[index], company)] : []),
    ];
    return {
      id: `${question.id}-branch-${index + 1}-${slug(branch.label)}`,
      label: branch.label,
      why: branch.why,
      subdrivers: branch.leaves.map((leaf) => fill(leaf, company)),
      evidence,
      drivers: branch.drivers,
    };
  });
  if (secondary) {
    const extra = secondary.structure.branches[0];
    branches.push({
      id: `${question.id}-branch-${branches.length + 1}-${slug(extra.label)}`,
      label: `${extra.label} (${secondary.id} lens)`,
      why: extra.why,
      subdrivers: extra.leaves.map((leaf) => fill(leaf, company)),
      evidence: secondary.structure.evidenceChecks[0] ? [fill(secondary.structure.evidenceChecks[0], company)] : [],
      drivers: [],
    });
  }
  const leadIndex = matches.findIndex((value) => value >= 0);
  const priorities = [
    leadIndex >= 0
      ? `Start with ${branches[leadIndex].label}: ${facts[matches[leadIndex]]}.`
      : `Run the analysis in this order: ${framework.structure.analysisOrder}.`,
    `Then ${framework.structure.analysisOrder}.`,
    'Say what data is missing rather than assuming it, and keep each branch distinct so one cause is not counted twice.',
  ];
  return {
    questionId: question.id,
    mapping,
    objective: question.clientObjective || question.question,
    rootText: authored?.root.text || question.question,
    branches,
    evidenceToInvestigate: framework.structure.evidenceChecks.map((check) => fill(check, company)),
    priorities,
    alternativeStructures: [
      ...framework.structure.guardrails.filter((item) => item.startsWith('Accept')).map((item) => item.replace(/^Accept /, '')),
      ...(authored ? [`${authored.branches.map((branch) => branch.text).join('; ')}`] : []),
    ],
    exhibitFacts: facts,
    analysisOrder: framework.structure.analysisOrder,
    guardrails: framework.structure.guardrails,
  };
}

export function guideToSuggestedTree(question: LibraryQuestion, guide: StructureAnswerGuide): SuggestedStructureTree {
  const branches = guide.branches.map((branch) => ({
    id: branch.id,
    text: branch.label,
    children: branch.subdrivers.map((text, index) => ({ id: `${branch.id}-test-${index + 1}`, text, test: branch.evidence[index] })),
  }));
  return {
    caseId: question.id,
    root: { id: `${question.id}-root`, text: guide.rootText },
    branches,
    explanations: guide.branches.map((branch) => ({ branchId: branch.id, title: branch.label, explanation: branch.why })),
    investigateFirst: guide.priorities.join(' '),
  };
}

/** Deterministic hints about which material drivers a user tree addresses. These guide feedback; they never replace judgement of an equivalent structure. */
export function assessTreeAgainstGuide(question: LibraryQuestion, guide: StructureAnswerGuide, treeText: string): TreeAssessment {
  const framework = STRUCTURE_FRAMEWORK_BY_ID[guide.mapping.primary as string];
  const text = treeText.toLowerCase();
  const matched = new Set<string>();
  framework.structure.drivers.forEach((driver) => { if (new RegExp(driver.pattern, 'i').test(text)) matched.add(driver.id); });
  const branchCoverage = framework.structure.branches.map((branch, index) => {
    const hits = branch.drivers.filter((id) => matched.has(id)).length;
    const status: 'covered' | 'partial' | 'missed' = hits === branch.drivers.length ? 'covered' : hits > 0 ? 'partial' : 'missed';
    return { branchId: guide.branches[index].id, status };
  });
  const missed = framework.structure.drivers.filter((driver) => !matched.has(driver.id));
  const firstMissedBranch = framework.structure.branches.find((branch) => branch.drivers.some((id) => !matched.has(id)));
  const gapDriver = firstMissedBranch ? framework.structure.drivers.find((driver) => firstMissedBranch.drivers.includes(driver.id) && !matched.has(driver.id)) : null;
  return {
    matchedDrivers: framework.structure.drivers.filter((driver) => matched.has(driver.id)).map((driver) => driver.label),
    missedDrivers: missed.map((driver) => driver.label),
    branchCoverage,
    mostMaterialGap: gapDriver ? gapDriver.label : null,
  };
}

/** The grading brief appended to the grader prompt: shared marking contract, framework cues and the case-specific guide. */
export function structureGradingBrief(question: LibraryQuestion, guide: StructureAnswerGuide | null): string {
  const shared = STRUCTURE_FRAMEWORK_SHARED;
  const lines = [
    'MARKING CONTRACT (applies to every Structures question):',
    shared.universalMarkingContract,
    '',
    'HOW TO APPLY A FRAMEWORK:',
    shared.howTheAiShouldApply,
    '',
    'FEEDBACK FORMAT:',
    shared.suggestedAnswerFeedbackFormat,
  ];
  if (!guide) {
    lines.push('', 'NO FRAMEWORK FITS THIS QUESTION. Judge the tree on its own logic against the marking contract and the question; do not force a framework.');
    return lines.join('\n');
  }
  const framework = STRUCTURE_FRAMEWORK_BY_ID[guide.mapping.primary as string];
  lines.push(
    '',
    `MAPPED FRAMEWORK ${framework.id}: ${framework.title} (a guide, not an answer key${guide.mapping.secondary ? `; secondary lens ${guide.mapping.secondary}` : ''}).`,
    `Grading focus: ${framework.gradingFocus}`,
    `Feedback and next test: ${framework.feedbackNextTest}`,
    '',
    'CASE-SPECIFIC ANSWER GUIDE (one strong structure; accept any equivalent tree that covers the same material drivers with sound logic):',
    `Objective: ${guide.objective}`,
    ...guide.branches.map((branch) => `- ${branch.label}: ${branch.subdrivers.join('; ')}. Evidence: ${branch.evidence.join(' / ') || 'n/a'}`),
    `Priorities: ${guide.priorities.join(' ')}`,
    guide.alternativeStructures.length ? `Equivalent structures to credit: ${guide.alternativeStructures.join(' | ')}` : '',
    `Do not penalise: ${guide.guardrails.filter((item) => !/^Penalise/.test(item)).join('; ') || 'branches that are irrelevant to this case'}.`,
    `Penalise: ${guide.guardrails.filter((item) => /^Penalise/.test(item)).map((item) => item.replace(/^Penalise /, '')).join('; ') || 'contradictory logic'}.`,
    'Never penalise a missing branch unless it could change the decision in this case. Never invent case facts. Do not require a final recommendation if the question only asks for a structure.',
  );
  return lines.filter((line) => line !== undefined).join('\n');
}

export function validateStructureFrameworks(questions: LibraryQuestion[]): string[] {
  const errors: string[] = [];
  const weights = Object.values(STRUCTURE_FRAMEWORK_SHARED.weights).reduce((sum, value) => sum + value, 0);
  if (weights !== 100) errors.push(`Structures marking weights must total 100; found ${weights}.`);
  if (Object.keys(STRUCTURE_FRAMEWORK_BY_ID).length !== 10) errors.push('Structures frameworks F01-F10 must all be present.');
  questions.forEach((question) => {
    const mapping = frameworkMappingFor(question);
    if (mapping.primary && !STRUCTURE_FRAMEWORK_BY_ID[mapping.primary]) errors.push(`${question.id} maps to an unknown framework ${mapping.primary}.`);
    if (mapping.secondary && mapping.secondary === mapping.primary) errors.push(`${question.id} repeats its primary framework as secondary.`);
    const guide = structureAnswerGuideFor(question);
    if (mapping.primary && (!guide || guide.branches.length < 3)) errors.push(`${question.id} has no usable answer guide.`);
  });
  return errors;
}
