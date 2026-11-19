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
  { criterion: 'Key observation and data reading', points: 25, description: 'Reads the decisive exhibit values accurately, with correct units, and separates fact from interpretation.' },
  { criterion: 'Key insight identification', points: 35, description: 'Names what the evidence means for this decision and prioritises the driver that matters most.' },
  { criterion: 'Business implication', points: 30, description: 'Explains what the findings mean for the client objective, the economics, or the risk being carried. No action plan or next step is required.' },
  { criterion: 'Communication clarity', points: 10, description: 'Communicates concisely in Observation → Insight → Implication order.' },
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

const HARD_FEEDBACK = 'Score each Hard rubric criterion, name the strongest section, identify the most important missed or misread exhibit value, and give one specific improvement to the business implication.';
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

export interface StructureExhibitGuidance {
  /** Shown with the exhibit before and after submission: what to use it for in the tree. Never states the answer. */
  role: string;
  /** Shown only in Structures feedback: which branch the exhibit's figures prioritise. */
  evidence: string;
}

/** Structures exhibits keyed by exhibit id. Every figure quoted here is read directly from the exhibit it describes. */
export const STRUCTURE_EXHIBIT_GUIDANCE: Record<string, StructureExhibitGuidance> = {
  'arctis-3-1': { role: 'Use this to test the share-loss branch: compare each brand\'s FY2025 and FY2026 bars to see whether the lost share went to one competitor or spread across the field.', evidence: 'Arctis fell 2.4 points to 29% while the challenger gained 5.4 points to 23.6% (all other brands lost 3.0), so a competitor-capture branch belongs in the tree.' },
  'arctis-3-2': { role: 'Use this to test the distribution hypothesis: does revenue per outlet rise with freezer presence?', evidence: 'Provinces with 78-84% freezer presence earn 22.4-24.6 million VND per outlet against 11.2-12.4 million VND at 31-36%, so the availability branch should be prioritised over the price branch.' },
  'arctis-3-3': { role: 'Use this to compare the two funding branches on a common three-year basis before ranking them.', evidence: 'The freezer rebuild returns 1.14x over three years against 0.51x for the one-off promotion, so the freezer branch ranks first.' },
  'verdant-3-1': { role: 'Use this to find which movements take net debt to the covenant test, so the cash branch you test first targets the largest one.', evidence: 'Net debt rises from 168 billion VND to 180 billion VND even with no new spend, and working capital adds 34 billion VND, so the working-capital branch comes before the growth branch.' },
  'verdant-3-2': { role: 'Use this to test each action branch against the 3.0x covenant before you rank them.', evidence: 'Funding the export line alone breaches at 3.49x, while releasing stock first passes at 2.24x, so sequencing is the branch that decides the answer.' },
  'verdant-3-3': { role: 'Use this to test the timing branch: how much export EBITDA arrives before the covenant test.', evidence: 'The export line earns 3 billion VND of EBITDA in FY2027 against 26 billion VND by FY2029, so its benefit arrives too late to protect the test.' },
  'anvil-3-1': { role: 'Use this to test the timing branch: in which year each capacity option stops covering forecast demand.', evidence: 'Improvement alone tops out at 1,960 units per shift while base demand reaches 2,740 by FY2029, so the tree needs a branch for capacity beyond recovery.' },
  'anvil-3-2': { role: 'Use this to compare the recover, install and both branches on capital, programme cost and payback.', evidence: 'Improvement needs 6 billion VND and no capital against 48 billion VND of capital for the new line, so the cheaper recovery branch is tested first.' },
  'anvil-3-3': { role: 'Use this to test the demand-assumption branch: how much the answer depends on which demand case occurs.', evidence: 'The demand cases range from 2,180 to 3,160 units per shift, so the demand assumption is the branch to verify before committing capital.' },
  'kaya-3-1': { role: 'Use this to size the capital branch: compare total entry cost across modes, then see which components drive the gap.', evidence: 'Entry costs 24.3 billion VND, 53.4 billion and 97 billion; listing and trade terms (28.5 billion VND) and marketing launch (19.5 billion VND) are the largest gaps between own operation and a distributor.' },
  'kaya-3-2': { role: 'Use this to compare NPV and control for each mode before ranking the entry-mode branches.', evidence: 'Own operation adds only 2.5 billion VND of NPV over the joint venture for 43.6 billion VND more capital, so NPV alone does not decide the mode.' },
  'kaya-3-3': { role: 'Use this to test the risk branch: when each mode turns cash-positive.', evidence: 'The distributor route turns cash-positive in FY2029, a year before own operation (FY2030), so capital at risk is a branch in its own right.' },
  'lotuscourt-3-1': { role: 'Use this to test the format-economics branch: how each format combines profit with space efficiency.', evidence: 'Flagship has the lowest sales density (26.9 million VND per sqm) but the highest store profit (10.5 billion VND), so store economics alone do not justify an exit.' },
  'lotuscourt-3-2': { role: 'Use this to test the network-effect branch: do other stores perform better in cities with a flagship?', evidence: 'Cities with a flagship show neighbourhood revenue at index 118 against 100 and consideration at 44% against 31%, so the network-effect branch must be tested before any exit.' },
  'lotuscourt-3-3': { role: 'Use this to compare lease actions on network profit, not store profit, before ranking them.', evidence: 'Only renegotiating the flagships and exiting two high-street stores has a positive net impact (+4.1 billion VND), so the rent branch ranks above the exit branch.' },
  'swiftline-3-1': { role: 'Use this to compare the interventions on coverage, effectiveness, investment and payback before ranking them.', evidence: 'Execution first with lockers in South only costs 35 billion VND against 73 billion VND for both, so the tree should test a targeted locker branch rather than a national one.' },
  'swiftline-3-2': { role: 'Use this to test whether the failed-first-attempt branch deserves the same priority in every region.', evidence: 'Failed first attempt is the largest cause in every region and highest in South at 54% of late parcels, so it leads the tree, split by region.' },
  'swiftline-3-3': { role: 'Use this to test the adoption branch: would locker coverage turn into locker use in each area type?', evidence: 'Locker willingness falls from 61% in urban South to 11% in rural areas, so the locker branch must be split by area type.' },
  'corvex-3-1': { role: 'Use this to test the adoption branch: are customers using the seats they pay for?', evidence: 'Licensed seats grew from 12,400 to 17,600 while activation fell from 75% to 54%, so adoption is the first branch to test.' },
  'corvex-3-2': { role: 'Use this to compare the SMB options on contribution, retention and three-year ARR before ranking them.', evidence: 'Self-serve delivers 65.5 billion VND of net contribution and 571 billion VND of three-year ARR against 14.8 billion VND and 548 billion VND for exit, so exiting SMB is not the leading branch.' },
  'corvex-3-3': { role: 'Use this to test which churn cause the SMB branch should address first.', evidence: 'Never completing onboarding (38%) and low seat activation (27%) cause 65% of SMB churn against 14% for price, so the onboarding branch comes first.' },
  'sweetvale-3-1': { role: 'Use this to size the core-category branch: compare each segment\'s prior and current share to see how fast the mix is moving.', evidence: 'Jelly and gummy rose 3.3 points to 13.6% while hard and soft candy lost 4.9 points together, so fixing the growth segments sits at the top of the tree.' },
  'sweetvale-3-2': { role: 'Use this to size the adjacency branch: which health and wellness sub-segment is large and which is growing fastest.', evidence: 'Nuts and seeds is the largest at 1,118 billion VND, while fruit-and-nut bars grow fastest from a 96 billion VND base, so size and growth point to different sub-segments.' },
  'sweetvale-3-3': { role: 'Use this to rank the entry-route branches on cost, profit and risk to the core brand.', evidence: 'The licence earns 22 billion VND of year-three profit for 64 billion VND with low brand risk, while the masterbrand stretch is the only high-risk route, so route risk is a branch of its own.' },
  'cleanco-3-1': { role: 'Use this to see which segments carry GreenMart\'s forecast growth, so your plan\'s growth branch targets the largest contributions.', evidence: 'Mainstream and premium carry 99.1 billion VND of the 143.7 billion VND of segment growth against 39.3 billion VND from economy, so the economy branch is not the main growth lever.' },
  'cleanco-3-2': { role: 'Use this to test whether GreenMart\'s segment pattern differs from other retailers\'.', evidence: 'GreenMart is the only retailer where economy leads (+19%) and mainstream declines (-4%), so the tree should treat its mix as a retailer-specific problem.' },
  'cleanco-3-3': { role: 'Use this to rank the three plans on what CleanCo earns and what GreenMart gets.', evidence: 'The liquid-and-premium plan earns 52.4 billion VND of gross profit against 14.2 billion VND for the economy plan and lifts basket size by 21 thousand VND, so basket size is the branch that aligns both sides.' },
  'pacificbev-a3-1': { role: 'Use this to see which lines moved NOPBT between Y2 and Y3.', evidence: 'Cost of goods added 18.8 million USD while the four operating lines together took 17.4 million USD, so cost of goods is not where the remaining gap sits.' },
  'pacificbev-a3-2': { role: 'Use this to quantify the gap to each competitor before choosing the branch to act on.', evidence: 'Crestline earns USD 5.46 a case against PacificBev\'s USD 4.62, a USD 0.84 gap, so revenue per case is the branch to size first.' },
  'pacificbev-a3-3': { role: 'Use this to find where PacificBev is best in class and where it trails, so you prioritise the weakest branch.', evidence: 'PacificBev is best in class on general and administrative (index 100) but at 85 on net revenue per case, so the revenue branch leads the tree.' },
  'pacificbev-b3-1': { role: 'Use this to test the mix branch: which SKU families lost the most margin and which carry the least.', evidence: 'Every family lost margin, and glass sits at 19% against premix at 45% and can at 33%, so pack mix is a branch to test.' },
  'pacificbev-b3-2': { role: 'Use this to size the margin gap to competitors before ranking the recovery branches.', evidence: 'PacificBev\'s NOPBT margin is 14.2% against 22.4% for the best competitor, an 8.2-point gap the recovery has to close.' },
  'pacificbev-b3-3': { role: 'Use this to rank the recovery options against the 20% NOPBT test and the volume each gives up.', evidence: 'The combined option with advertising restored reaches 21.0% NOPBT margin while giving up 3.0% of volume, so mix and trade spend are the branches to act on together.' },
  'frostybite-3-1': { role: 'Use this to see how much of channel sales each line carries before deciding which lines need a decision.', evidence: 'The top two lines carry 60.2% of convenience sales, so the tail is the branch the range decision is about.' },
  'frostybite-3-2': { role: 'Use this to test each line on more than one measure, so a weak growth score is not read as a weak line.', evidence: 'The Vanilla Classic Bar is weakest on growth (index 28) but best on gross margin (index 100), so margin must be tested before cutting the tail.' },
  'frostybite-3-3': { role: 'Use this to rank the range actions by the profit they create or destroy.', evidence: 'The premium launch creates the most profit (+38.4 million USD) while delisting both declining lines destroys 17.4 million USD, so the launch branch ranks above the cut.' },
  'dairypeak-3-1': { role: 'Use this to separate the drivers of the EBIT fall before deciding which branch the strategy must fix.', evidence: 'The largest single driver removes 88 billion VND of the 211 billion VND opening EBIT, so the bridge separates a volume problem from the cost and price movements.' },
  'dairypeak-3-2': { role: 'Use this to test which channels held up in the shock and which grew in the good years.', evidence: 'Institutions and factories fell only 17.2% in the shock while schools and kindergartens fell about 71%, so channel resilience is the first branch.' },
  'dairypeak-3-3': { role: 'Use this to rank the strategies against the 40% share target and EBIT.', evidence: 'Only the institutions-first strategy reaches the target, at 40.2% share, so the sequencing branch decides the answer.' },
  'summit-3-1': { role: 'Use this to compare deal value at each price and synergy case against walking away.', evidence: 'The asking price destroys 448 million USD on realistic synergy while a 1.0 billion USD bid creates 152 million USD, so price discipline is the branch that decides the answer.' },
  'summit-3-2': { role: 'Use this to test what combining the businesses does to scale and group margin.', evidence: 'Group gross margin rises from 34.7% to 36.9% in the combined plan, so the strategic-fit branch is real but does not settle the price.' },
  'summit-3-3': { role: 'Use this to see where each division sits on growth and margin before deciding what the deal adds.', evidence: 'Divisional margins range from 22% to 46%, so the tree should test which divisions the deal strengthens rather than treat the target as one business.' },
  'tangytaste-3-1': { role: 'Use this to see how the category\'s value is split before choosing where to grow.', evidence: 'The largest brand holds 88.8 million USD of the 148.0 million USD category value (60%), so the share branch is about passing the smaller brands, not the leader.' },
  'tangytaste-3-2': { role: 'Use this to find the share needed to reach third place.', evidence: 'Third place requires passing Adabi at 5.5%, so any route below that share fails the goal.' },
  'tangytaste-3-3': { role: 'Use this to rank the five routes against the share target and the margin condition.', evidence: 'The combined organic route reaches 6.6% share at 14.2% margin while fish-sauce entry reaches 8.0% at 7.4% margin, so the margin condition must be applied before ranking on share.' },
  'metroparcel-delay-heatmap': { role: 'Use this to find which process step and region your tree should test first.', evidence: 'Last mile has the highest late rate in every region (9%, 11% and 18%), so the last-mile branch, split by region, comes first.' },
  'metroparcel-service-bridge': { role: 'Use this to size how much of the gap to the 90% target each process step explains.', evidence: 'The bridge falls from 90% to 78% and last mile removes 8 of the 12 points, so it deserves the deepest branch.' },
  'verda-market-attractiveness': { role: 'Use this to test the demand branch: is EV growth creating a charging gap?', evidence: 'East City has the fastest EV growth (38%) and 40 EVs per public point, so a demand branch stays in the tree.' },
  'verda-utilisation-benchmark': { role: 'Use this to test whether apparent scarcity turns into utilisation above Verda\'s 35% hurdle.', evidence: 'East City incumbents run at only 18% and 22% utilisation, below the 35% hurdle, so station economics is the first branch to prioritise.' },
  'verda-customer-research': { role: 'Use this to test the customer-need branch: where and how East City drivers actually charge.', evidence: '68% have home charging and 61% prefer highway fast charging, while only 19% report city-centre gaps, so location need is the second branch to prioritise.' },
};

/** Expert-expansion templates reuse one exhibit shape per case type, keyed by the id suffix. */
const EXPANSION_STRUCTURE_GUIDANCE: Record<string, StructureExhibitGuidance> = {
  bridge: { role: 'Use this to separate positive from adverse drivers of the headline result.', evidence: 'Demand and mix add 23 points while cost-to-serve and execution remove 19, so the tree needs both a growth branch and a cost-and-execution branch.' },
  segments: { role: 'Use this to test which segment branch needs attention first.', evidence: 'Segment B improves by 16 points while Segment C falls by 12, so the Segment C branch is tested first.' },
  scatter: { role: 'Use this to test whether more investment keeps paying back.', evidence: 'Gains flatten after investment index 6, so an investment-efficiency branch is tested before scaling.' },
  trend: { role: 'Use this to test whether volume growth is turning into value.', evidence: 'Volume reaches about 132-136 while value stalls near 103-106, so the value branch is the one to investigate.' },
  heatmap: { role: 'Use this to locate the market-segment intersection your tree should test first.', evidence: 'The strongest Segment C cell sits at least 13 points above the weakest Segment A cell, so the tree splits by segment within each market.' },
  mix: { role: 'Use this to test whether a segment-mix branch belongs near the top of your tree.', evidence: 'Segment C rises from 20% to 28% while Segment A falls from 45% to 35%, so mix shift is a top-level branch.' },
  combo: { role: 'Use this to test whether growth in scale is improving the result.', evidence: 'Revenue keeps rising while the right-axis measure falls from 16% to 11%, so quality is tested before growth.' },
  distribution: { role: 'Use this to check whether the result is broad-based or driven by a few units.', evidence: '35 of 100 units sit in the two weak bands against 30 in the two strong bands, so the tree segments by unit performance.' },
  portfolio: { role: 'Use this to see which value pools dominate, so your first branches cover them.', evidence: 'Segments A and B contribute 60% between them, so those two branches come first.' },
  options: { role: 'Use this to compare the options on growth and margin before ranking them.', evidence: 'Option D has the highest margin (25%) at 9% growth while Option C grows fastest (15%) at the lowest margin (12%), so the tree weighs growth against margin rather than ranking on one.' },
};

/** Attach issue-tree guidance to Structures exhibits; authored values on the exhibit win. */
export function withStructureGuidance(exhibits: LibraryExhibit[]): LibraryExhibit[] {
  return exhibits.map((exhibit) => {
    const id = exhibit.id || '';
    const suffix = /^expert-exp-\d+-([a-z]+)$/.exec(id)?.[1];
    const guidance = STRUCTURE_EXHIBIT_GUIDANCE[id] || (suffix ? EXPANSION_STRUCTURE_GUIDANCE[suffix] : undefined);
    if (!guidance) return exhibit;
    return { ...exhibit, structureRole: exhibit.structureRole || guidance.role, structureEvidence: exhibit.structureEvidence || guidance.evidence };
  });
}

function journeyExhibits(value: JourneyDrillInput, provenance: JourneyProvenance): LibraryExhibit[] {
  const exhibits = withExhibitDefaults(value.exhibits, provenance);
  return value.skill === 'structures' ? withStructureGuidance(exhibits) : exhibits;
}

export function hardJourneyDrill(value: JourneyDrillInput, provenance: JourneyProvenance): LibraryQuestion {
  return {
    ...value,
    exhibits: journeyExhibits(value, provenance),
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
    exhibits: journeyExhibits(value, provenance),
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
