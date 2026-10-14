import type { ExhibitKind, ExpertRubricItem, LibraryExhibit, LibraryQuestion, LibrarySkill } from './skillQuestionLibrary';

const SOURCE = 'Casemate original practice data; figures are illustrative, internally reconciled, and prepared for Draft Review.';
const REGIONS = ['Northern', 'Central', 'Southern', 'Mekong', 'Coastal'];
const SITUATIONS = [
  'Headline growth is running ahead of economic value creation.',
  'Performance differs sharply by customer and channel segment.',
  'Demand is growing, but delivery capacity and service quality are tightening.',
  'Customer retention has weakened despite higher commercial spending.',
  'Management faces a high-upside plan with material downside uncertainty.',
];

interface DrillProfile {
  skill: LibrarySkill;
  type: string;
  stem: string;
  industry: string;
  problem: string;
  decision: string;
  driver: string;
  action: string;
}

const PROFILES: DrillProfile[] = [
  { skill: 'charts', type: 'Performance Diagnosis', stem: 'Atlas Retail', industry: 'omnichannel retail', problem: 'performance deterioration', decision: 'which performance driver to address before the next planning cycle', driver: 'channel economics and operating discipline', action: 'gate growth investment on contribution margin and fix the weakest operating driver' },
  { skill: 'charts', type: 'Growth vs Profitability', stem: 'Beacon Foods', industry: 'packaged foods', problem: 'unprofitable growth', decision: 'whether to continue the current growth plan', driver: 'price, mix, and cost-to-serve', action: 'redirect growth toward profitable segments and set margin guardrails' },
  { skill: 'charts', type: 'Mix-Shift Analysis', stem: 'Cedar Finance', industry: 'consumer finance', problem: 'portfolio mix shift', decision: 'how to rebalance the portfolio without losing momentum', driver: 'segment mix and risk-adjusted returns', action: 'rebalance originations toward resilient cohorts and cap low-return exposure' },
  { skill: 'charts', type: 'Root-Cause Analysis', stem: 'Delta Logistics', industry: 'parcel logistics', problem: 'service and margin decline', decision: 'which root cause should receive the first intervention', driver: 'process bottlenecks and rework', action: 'run a targeted bottleneck sprint with owner-level service and cost gates' },
  { skill: 'charts', type: 'Benchmark and Performance Gap', stem: 'Elm Health', industry: 'private healthcare', problem: 'benchmark gap', decision: 'which gap is both material and realistically closeable', driver: 'site productivity and service quality', action: 'pilot the highest-value closeable gap and validate quality before scaling' },
  { skill: 'charts', type: 'Scenario and Decision Analysis', stem: 'Fjord Energy', industry: 'distributed energy', problem: 'investment under uncertainty', decision: 'which scenario-resilient option to fund', driver: 'demand, margin, and downside exposure', action: 'choose the option that clears the downside hurdle and stage capital behind milestones' },

  { skill: 'structures', type: 'Evidence-Based Issue Tree', stem: 'Grove Mobility', industry: 'urban mobility', problem: 'ambiguous growth constraint', decision: 'how to structure the diagnosis around the evidence', driver: 'demand, capacity, economics, and execution', action: 'prioritise the two evidence-backed branches and define disconfirming tests' },
  { skill: 'structures', type: 'Structure Prioritization', stem: 'Harbor Cloud', industry: 'B2B software', problem: 'multiple competing hypotheses', decision: 'which issue-tree branches to investigate first', driver: 'retention, monetisation, and product adoption', action: 'sequence analyses by value at stake, uncertainty, and decision relevance' },
  { skill: 'structures', type: 'Hypothesis Refinement', stem: 'Indigo Pharma', industry: 'pharmaceutical distribution', problem: 'weak initial hypothesis', decision: 'how the initial hypothesis should change after reviewing the evidence', driver: 'customer need, access, and channel economics', action: 'replace the broad hypothesis with a falsifiable segment-level hypothesis' },
  { skill: 'structures', type: 'Multi-Stage Problem Structure', stem: 'Juniper Aviation', industry: 'regional aviation', problem: 'multi-stage transformation', decision: 'how to stage diagnosis, design, pilot, and scale', driver: 'network economics and operational readiness', action: 'separate immediate stabilisation from medium-term redesign and gated scale-up' },
  { skill: 'structures', type: 'Conflicting Evidence Structure', stem: 'Kite Education', industry: 'digital education', problem: 'conflicting market signals', decision: 'how to reconcile demand signals with weak economics', driver: 'engagement, willingness to pay, and delivery cost', action: 'structure the contradiction explicitly and request evidence that distinguishes causes' },
  { skill: 'structures', type: 'Executive Recommendation Structure', stem: 'Lumen Hotels', industry: 'hospitality', problem: 'board recommendation', decision: 'how to present a decisive recommendation with risks and next steps', driver: 'market attractiveness, economics, and feasibility', action: 'lead with the answer, quantify the case, and state risks, mitigations, and decision gates' },

  { skill: 'calculations', type: 'Profitability Bridge', stem: 'Mosaic Appliances', industry: 'consumer appliances', problem: 'profit bridge', decision: 'which profit driver management should address first', driver: 'volume, price, unit cost, and fixed cost', action: 'lock a reconciled profit bridge and assign initiatives to the largest adverse drivers' },
  { skill: 'calculations', type: 'Price–Volume–Mix Analysis', stem: 'Nimbus Beverages', industry: 'beverages', problem: 'price-volume-mix trade-off', decision: 'whether the commercial plan creates incremental value', driver: 'price realisation, volume response, and mix', action: 'set segment-level price and mix guardrails before approving volume targets' },
  { skill: 'calculations', type: 'Break-Even and Scenario Analysis', stem: 'Orchid Clinics', industry: 'outpatient clinics', problem: 'break-even uncertainty', decision: 'which scenario clears the investment hurdle', driver: 'fixed cost, contribution, and utilisation', action: 'stage the launch against utilisation and contribution break-even gates' },
  { skill: 'calculations', type: 'Unit Economics and Customer Value', stem: 'Prairie Pay', industry: 'digital payments', problem: 'weak unit economics', decision: 'which customer cohorts merit further acquisition', driver: 'CAC, retention, revenue, and cost-to-serve', action: 'shift acquisition to cohorts with attractive payback and lifetime contribution' },
  { skill: 'calculations', type: 'Capacity and Operational Bottleneck', stem: 'Quartz Manufacturing', industry: 'industrial manufacturing', problem: 'capacity bottleneck', decision: 'where incremental capacity creates the most throughput and profit', driver: 'step capacity, yield, and downtime', action: 'debottleneck the constraining step before adding upstream capacity' },
  { skill: 'calculations', type: 'Investment Return and Sensitivity', stem: 'Ridge Renewables', industry: 'renewable infrastructure', problem: 'return sensitivity', decision: 'whether the investment remains attractive under downside assumptions', driver: 'cash flow, utilisation, cost, and timing', action: 'fund only the stage that clears the downside return hurdle and hedge the key sensitivity' },

  { skill: 'creativity', type: 'Growth Under Constraints', stem: 'Summit Care', industry: 'digital health', problem: 'constrained growth', decision: 'which growth ideas fit strict capital and capacity limits', driver: 'customer need, gross margin, and scarce capabilities', action: 'pilot two evidence-backed ideas with explicit impact, feasibility, and payback gates' },
  { skill: 'creativity', type: 'Turnaround Levers', stem: 'Tide Restaurants', industry: 'quick-service restaurants', problem: 'turnaround', decision: 'which small set of levers can restore performance fastest', driver: 'traffic, ticket, food cost, and labour productivity', action: 'combine one revenue and one cost lever, then sequence a rapid test-and-learn turnaround' },
  { skill: 'creativity', type: 'Customer Experience Redesign', stem: 'Umber Bank', industry: 'retail banking', problem: 'customer journey friction', decision: 'which journey moments to redesign first', driver: 'effort, wait time, failure demand, and trust', action: 'redesign the highest-friction moments and validate adoption, satisfaction, and economics' },
  { skill: 'creativity', type: 'Product or Service Innovation', stem: 'Vale Telecom', industry: 'telecommunications', problem: 'new offer design', decision: 'which product concept best solves an evidenced need', driver: 'need intensity, willingness to pay, and capability fit', action: 'prototype the strongest concept and use willingness-to-pay and retention gates' },
  { skill: 'creativity', type: 'Channel or Go-to-Market Innovation', stem: 'Willow Nutrition', industry: 'consumer nutrition', problem: 'go-to-market innovation', decision: 'which channel model can scale efficiently', driver: 'reach, conversion, margin, and partner fit', action: 'test the channel with the strongest reach-to-margin trade-off before broad rollout' },
  { skill: 'creativity', type: 'Risk Mitigation and Contingency Design', stem: 'Xenon Freight', industry: 'freight forwarding', problem: 'operational risk', decision: 'which mitigations and contingencies protect the plan most effectively', driver: 'likelihood, impact, detectability, and response time', action: 'prioritise preventive controls for critical risks and pre-authorise trigger-based contingencies' },

  { skill: 'market-sizing', type: 'Top-Down and Bottom-Up Reconciliation', stem: 'Yarrow Water', industry: 'water technology', problem: 'conflicting market estimates', decision: 'which reconciled market estimate should anchor the plan', driver: 'population, adoption, capacity, and spend', action: 'reconcile both methods, explain the gap, and use a bounded planning range' },
  { skill: 'market-sizing', type: 'Multi-Segment Market Sizing', stem: 'Zenith Security', industry: 'cybersecurity services', problem: 'segment sizing', decision: 'which segments create the most serviceable value', driver: 'segment count, adoption, frequency, and price', action: 'prioritise the largest reachable segments while preserving segment-specific assumptions' },
  { skill: 'market-sizing', type: 'TAM, SAM, and SOM', stem: 'Amber Cooling', industry: 'commercial cooling', problem: 'addressable market sizing', decision: 'whether the reachable opportunity justifies entry', driver: 'market universe, eligibility, share, and delivery capacity', action: 'size TAM, filter to SAM, and cap SOM by realistic share and capacity' },
  { skill: 'market-sizing', type: 'Capacity-Constrained Market Opportunity', stem: 'Birch Diagnostics', industry: 'diagnostic services', problem: 'capacity-constrained opportunity', decision: 'whether demand or delivery is the binding constraint', driver: 'eligible demand, site capacity, and ramp', action: 'match commercial acquisition to the delivery ceiling and add capacity behind demand proof' },
  { skill: 'market-sizing', type: 'Scenario and Sensitivity Sizing', stem: 'Coral Learning', industry: 'professional education', problem: 'sizing uncertainty', decision: 'which assumptions matter most to the opportunity', driver: 'adoption, frequency, price, and retention', action: 'present a range, identify the dominant sensitivity, and validate it before investment' },
  { skill: 'market-sizing', type: 'Reverse Market Sizing', stem: 'Dawn Robotics', industry: 'warehouse robotics', problem: 'target-led market sizing', decision: 'whether the required customer count and share are credible', driver: 'revenue target, price, customer count, and penetration', action: 'reverse the target into required wins and reject plans that exceed plausible penetration or capacity' },
];

const STANDARD_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Key insight and prioritization', points: 30, description: 'Identifies the decisive conclusion and underlying driver.' },
  { criterion: 'Use of evidence across exhibits', points: 25, description: 'Uses accurate, connected evidence from both exhibits.' },
  { criterion: 'Business implication', points: 20, description: 'Explains the consequence for value, risk, or the client decision.' },
  { criterion: 'Recommendation or next step', points: 15, description: 'Proposes a practical evidence-linked action and decision gate.' },
  { criterion: 'Communication quality and structure', points: 10, description: 'Communicates concisely in Insight → Evidence → Implication → Action order.' },
];

const CALCULATION_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Calculation accuracy', points: 30, description: 'Calculates the requested result correctly with consistent units.' },
  { criterion: 'Calculation logic', points: 15, description: 'Shows formulas, assumptions, and a transparent reconciliation.' },
  { criterion: 'Interpretation of the result', points: 20, description: 'Identifies the decisive driver rather than stopping at the number.' },
  { criterion: 'Business implication', points: 20, description: 'Links the calculation to value, risk, and the client objective.' },
  { criterion: 'Recommendation and communication', points: 15, description: 'Makes a practical recommendation supported by the calculation.' },
];

function exhibit(value: LibraryExhibit): LibraryExhibit {
  return { mutuallyExclusive: true, legendConfig: { show: true, position: 'top' }, sourceNote: SOURCE, ...value };
}

function buildExhibits(caseIndex: number, globalIndex: number, metric: string): LibraryExhibit[] {
  const seed = 7 + globalIndex;
  const base = 80 + seed * 2;
  if (caseIndex === 0) {
    return [
      exhibit({ id: `expert-exp-${globalIndex}-bridge`, datasetId: `expert-exp-${globalIndex}-primary`, kind: 'waterfall', title: `${metric} bridge`, unit: 'Index points', timePeriod: 'Current year', categories: ['Starting point', 'Demand', 'Mix', 'Cost-to-serve', 'Execution'], series: [{ name: 'Movement', values: [base, 14, 9, -12, -7] }], axisConfig: { xLabel: 'Driver', yLabel: metric }, analyticalPurpose: 'Reconcile the headline result into positive and adverse drivers.', metrics: [metric, 'Driver contribution'], periods: ['Current year'] }),
      exhibit({ id: `expert-exp-${globalIndex}-segments`, datasetId: `expert-exp-${globalIndex}-secondary`, kind: 'grouped-bar', title: 'Segment performance and quality', unit: 'Index', timePeriod: 'Prior vs current year', categories: ['Core', 'Growth', 'At-risk'], series: [{ name: 'Prior year', values: [92 + seed % 5, 68 + seed % 7, 61 + seed % 4] }, { name: 'Current year', values: [96 + seed % 5, 84 + seed % 7, 49 + seed % 4] }], axisConfig: { xLabel: 'Segment', yLabel: 'Performance index' }, analyticalPurpose: 'Show where performance improved and where quality deteriorated.', metrics: ['Segment performance'], periods: ['Prior year', 'Current year'] }),
    ];
  }
  if (caseIndex === 1) {
    return [
      exhibit({ id: `expert-exp-${globalIndex}-scatter`, datasetId: `expert-exp-${globalIndex}-primary`, kind: 'scatter', title: `Investment intensity vs ${metric.toLowerCase()}`, unit: 'Percent', timePeriod: 'Matched operating units', categories: ['Unit A', 'Unit B', 'Unit C', 'Unit D', 'Unit E'], series: [{ name: 'Operating unit', xValues: [2, 4, 6, 8, 10], values: [8 + seed % 4, 14 + seed % 4, 19 + seed % 4, 21 + seed % 4, 22 + seed % 4] }], axisConfig: { xLabel: 'Investment index', yLabel: metric }, analyticalPurpose: 'Test the relationship and identify diminishing marginal returns.', metrics: ['Investment intensity', metric], periods: ['Current sample'] }),
      exhibit({ id: `expert-exp-${globalIndex}-trend`, datasetId: `expert-exp-${globalIndex}-secondary`, kind: 'multi-line', title: 'Volume and value trend', unit: 'Index', timePeriod: 'Four quarters', categories: ['Q1', 'Q2', 'Q3', 'Q4'], series: [{ name: 'Volume index', values: [100, 108 + seed % 3, 119 + seed % 4, 132 + seed % 5] }, { name: 'Value index', values: [100, 104 + seed % 2, 105 + seed % 3, 103 + seed % 4] }], axisConfig: { xLabel: 'Quarter', yLabel: 'Index (Q1 = 100)' }, analyticalPurpose: 'Distinguish volume growth from economic value creation over time.', metrics: ['Volume index', 'Value index'], periods: ['Q1', 'Q2', 'Q3', 'Q4'] }),
    ];
  }
  if (caseIndex === 2) {
    return [
      exhibit({ id: `expert-exp-${globalIndex}-heatmap`, datasetId: `expert-exp-${globalIndex}-primary`, kind: 'heatmap', title: `${metric} by market and segment`, unit: 'Percent', timePeriod: 'Current year', categories: ['Market 1', 'Market 2', 'Market 3'], series: [{ name: 'Core', values: [18 + seed % 4, 14 + seed % 4, 11 + seed % 4] }, { name: 'Growth', values: [12 + seed % 3, 21 + seed % 3, 16 + seed % 3] }, { name: 'Premium', values: [24 + seed % 3, 19 + seed % 3, 27 + seed % 3] }], axisConfig: { xLabel: 'Segment', yLabel: 'Market' }, analyticalPurpose: 'Locate the strongest and weakest market-segment intersections.', metrics: [metric], periods: ['Current year'] }),
      exhibit({ id: `expert-exp-${globalIndex}-mix`, datasetId: `expert-exp-${globalIndex}-secondary`, kind: 'stacked-100', title: 'Customer mix migration', unit: 'Percent', timePeriod: 'Three years', categories: ['Year 1', 'Year 2', 'Year 3'], series: [{ name: 'Core', values: [45, 40, 35] }, { name: 'Growth', values: [35, 36, 37] }, { name: 'Premium', values: [20, 24, 28] }], axisConfig: { xLabel: 'Year', yLabel: 'Share of total' }, analyticalPurpose: 'Show how mix is shifting toward segments with different economics.', metrics: ['Customer mix'], periods: ['Year 1', 'Year 2', 'Year 3'] }),
    ];
  }
  if (caseIndex === 3) {
    return [
      exhibit({ id: `expert-exp-${globalIndex}-combo`, datasetId: `expert-exp-${globalIndex}-primary`, kind: 'combo', title: `Scale and ${metric.toLowerCase()}`, unit: 'VND bn', timePeriod: 'FY2024–FY2027', categories: ['2024', '2025', '2026', '2027'], series: [{ name: 'Revenue', values: [base, base + 18, base + 41, base + 66], axis: 'left', unit: 'VND bn' }, { name: metric, values: [16, 15, 13, 11], axis: 'right', unit: 'Percent' }], axisConfig: { xLabel: 'Year', yLabel: 'Revenue (VND bn)', rightYLabel: `${metric} (%)` }, analyticalPurpose: 'Test whether scale growth translates into improving economic quality.', metrics: ['Revenue', metric], periods: ['2024', '2025', '2026', '2027'] }),
      exhibit({ id: `expert-exp-${globalIndex}-distribution`, datasetId: `expert-exp-${globalIndex}-secondary`, kind: 'histogram', title: 'Outcome distribution across operating units', unit: 'Units', timePeriod: 'Current year sample of 100', categories: ['Very weak', 'Weak', 'On plan', 'Strong', 'Very strong'], series: [{ name: 'Frequency', values: [10, 25, 35, 20, 10] }], axisConfig: { xLabel: 'Outcome band', yLabel: 'Number of units' }, analyticalPurpose: 'Show whether the headline result is broad-based or driven by a tail of units.', metrics: ['Operating-unit outcomes'], periods: ['Current year'] }),
    ];
  }
  return [
    exhibit({ id: `expert-exp-${globalIndex}-portfolio`, datasetId: `expert-exp-${globalIndex}-primary`, kind: 'treemap', title: `Portfolio contribution to ${metric.toLowerCase()}`, unit: 'Percent', timePeriod: 'Current year', categories: ['Core', 'Premium', 'Growth', 'Adjacency', 'Other'], series: [{ name: 'Share', values: [34, 26, 18, 14, 8] }], analyticalPurpose: 'Show portfolio concentration and the value pools that dominate the result.', metrics: ['Portfolio share'], periods: ['Current year'] }),
    exhibit({ id: `expert-exp-${globalIndex}-options`, datasetId: `expert-exp-${globalIndex}-secondary`, kind: 'bubble', title: 'Strategic option screen', unit: 'Percent margin', timePeriod: 'Next-year plan', categories: ['Option A', 'Option B', 'Option C', 'Option D'], series: [{ name: 'Option', xValues: [7, 11, 15, 9], values: [22, 18, 12, 25], sizes: [90 + seed, 70 + seed, 110 + seed, 55 + seed] }], axisConfig: { xLabel: 'Expected growth (%)', yLabel: 'Expected margin (%)' }, analyticalPurpose: 'Balance growth, margin, and addressable value when choosing an option.', metrics: ['Growth', 'Margin', 'Addressable value'], periods: ['Next-year plan'] }),
  ];
}

function evidenceFor(caseIndex: number, globalIndex: number, metric: string): { evidence: string; calculation: string; validation: string[]; terms: string[] } {
  const seed = 7 + globalIndex;
  const base = 80 + seed * 2;
  if (caseIndex === 0) {
    const end = base + 14 + 9 - 12 - 7;
    return { evidence: `Exhibit 1 reconciles the ${metric.toLowerCase()} index from ${base} to ${end}: demand and mix add 23 points, while cost-to-serve and execution remove 19. Exhibit 2 shows the Growth segment improving by 16 points while the At-risk segment falls by 12 points, so the headline masks a concentrated weakness.`, calculation: `${base} + 14 + 9 − 12 − 7 = ${end} index points. Positive drivers total 23; adverse drivers total 19.`, validation: [`Bridge endpoint = ${base} + 14 + 9 − 12 − 7 = ${end}.`, 'Grouped bars compare different segment-level evidence rather than repeating the bridge.'], terms: [String(base), String(end), '23', '19', 'Growth', 'At-risk'] };
  }
  if (caseIndex === 1) return { evidence: `Exhibit 1 shows diminishing returns after investment index 6: ${metric.toLowerCase()} rises only about 3 points while investment rises from 6 to 10. Exhibit 2 shows volume reaching roughly 132–136 while value stalls near 103–106, confirming that incremental scale is not converting into proportional value.`, calculation: 'Compare equal investment increments and endpoint indices: marginal outcome gains flatten after index 6 while the volume–value gap exceeds 25 points by Q4.', validation: ['Scatter X values increase in equal two-point steps.', 'Volume and value share a Q1 = 100 base but measure distinct outcomes.'], terms: ['6', '10', '3', '132', '103', 'volume', 'value'] };
  if (caseIndex === 2) return { evidence: `Exhibit 1 shows a spread of at least 13 points between the strongest Premium intersection and the weakest Core intersection. Exhibit 2 shows Premium mix rising from 20% to 28% while Core falls from 45% to 35%, making segment economics increasingly important to the total result.`, calculation: 'Each stacked bar reconciles to 100%; Premium gains 8 percentage points and Core loses 10 percentage points.', validation: ['Year 1 mix = 45 + 35 + 20 = 100%.', 'Year 2 mix = 40 + 36 + 24 = 100%.', 'Year 3 mix = 35 + 37 + 28 = 100%.'], terms: ['13', '20%', '28%', '45%', '35%', 'Premium', 'Core'] };
  if (caseIndex === 3) {
    const finalRevenue = base + 66;
    const startProfit = Number((base * 0.16).toFixed(1));
    const finalProfit = Number((finalRevenue * 0.11).toFixed(1));
    return { evidence: `Exhibit 1 shows revenue rising from VND ${base}bn to VND ${finalRevenue}bn while ${metric.toLowerCase()} falls from 16% to 11%; implied value moves from about VND ${startProfit}bn to VND ${finalProfit}bn. Exhibit 2 shows 35% of operating units in weak or very weak bands, indicating the quality problem is material rather than isolated.`, calculation: `${base} × 16% = ${startProfit}; ${finalRevenue} × 11% = ${finalProfit}. Weak-tail share = (10 + 25) / 100 = 35%.`, validation: [`Starting implied value = ${base} × 16% = ${startProfit}.`, `Ending implied value = ${finalRevenue} × 11% = ${finalProfit}.`, 'Histogram frequencies = 10 + 25 + 35 + 20 + 10 = 100 units.'], terms: [String(base), String(finalRevenue), '16%', '11%', String(startProfit), String(finalProfit), '35%'] };
  }
  return { evidence: 'Exhibit 1 shows that Core and Premium account for 60% of portfolio contribution, creating concentration. Exhibit 2 shows Option D has the highest margin at 25% but lower growth and the smallest opportunity, while Option B offers a more balanced 11% growth, 18% margin, and material size.', calculation: 'Portfolio shares reconcile to 100%; Core + Premium = 34% + 26% = 60%. Compare growth, margin, and bubble size rather than maximising one axis.', validation: ['Treemap shares = 34 + 26 + 18 + 14 + 8 = 100%.', 'Bubble values use distinct growth, margin, and opportunity-size dimensions.'], terms: ['34%', '26%', '60%', '25%', '11%', '18%', 'Option B', 'Option D'] };
}

function makeQuestion(profile: DrillProfile, profileIndex: number, caseIndex: number): LibraryQuestion {
  const globalIndex = profileIndex * 5 + caseIndex;
  const numericId = 300 + profileIndex * 5 + caseIndex;
  const company = `${REGIONS[caseIndex]} ${profile.stem}`;
  const metric = profile.skill === 'market-sizing' ? 'Reachable opportunity' : profile.skill === 'calculations' ? 'Economic return' : profile.skill === 'creativity' ? 'Commercial attractiveness' : profile.skill === 'structures' ? 'Decision confidence' : 'Performance quality';
  const exhibits = buildExhibits(caseIndex, globalIndex, metric);
  const derived = evidenceFor(caseIndex, globalIndex, metric);
  const calculationRequired = profile.skill === 'calculations' || profile.skill === 'market-sizing';
  const nextId = `${profile.skill}-expert-${300 + profileIndex * 5 + ((caseIndex + 1) % 5)}`;
  const model = {
    calculation: derived.calculation,
    keyInsight: `${company} should not act on the headline alone: ${profile.driver} explain why the apparent opportunity has uneven value and risk.`,
    supportingEvidence: derived.evidence,
    businessImplication: `A broad commitment would allocate resources to weak or saturated pockets and could worsen the client's ${profile.problem}; the decision should be narrowed to the segments or scenarios that clear both value and feasibility hurdles.`,
    recommendedAction: `Management should ${profile.action}, using a short pilot and explicit economic, customer, and execution thresholds before scaling.`,
  };
  const correctAnswer = `${calculationRequired ? `Calculation: ${model.calculation}\n` : ''}Key Insight: ${model.keyInsight}\nSupporting Evidence: ${model.supportingEvidence}\nBusiness Implication: ${model.businessImplication}\nRecommended Action: ${model.recommendedAction}`;
  return {
    id: `${profile.skill}-expert-${numericId}`,
    skill: profile.skill,
    difficulty: 'expert',
    title: `${company} - ${profile.type}`,
    drillType: profile.type,
    industry: profile.industry,
    businessProblem: profile.problem,
    primarySkill: `${profile.type}: synthesising complementary evidence into a management decision`,
    businessContext: `${company} is a ${profile.industry} business serving the ${REGIONS[caseIndex].toLowerCase()} market. ${SITUATIONS[caseIndex]} Leadership is preparing a decision memo for the next investment committee.`,
    clientObjective: `Determine ${profile.decision}, quantify the evidence that matters, and define the next management action.`,
    instruction: 'Synthesize both exhibits. Distinguish observation from insight, explain the business implication, and recommend an action with a measurable decision gate.',
    question: `What is the most important conclusion for ${company}, what evidence across both exhibits supports it, what does it imply for the client objective, and what should management do next?`,
    exhibits,
    answerMode: 'text',
    answerFormat: 'structured-expert',
    structuredAnswer: true,
    calculationRequired,
    evidenceRequired: 2,
    estimatedMinutes: 8 + (caseIndex % 3) * 2,
    status: 'draft-pending-review',
    reviewStatus: 'Draft',
    correctAnswer,
    modelAnswerSections: model,
    explanation: `A high-scoring response links the ${exhibits[0].kind} evidence to the distinct ${exhibits[1].kind} evidence, prioritises the decisive driver, and converts it into a practical client decision.`,
    scoringRubric: calculationRequired ? CALCULATION_RUBRIC : STANDARD_RUBRIC,
    personalizedFeedbackTemplate: 'Score each rubric criterion, identify the strongest section, name the most important missing or misread exhibit evidence, assess implication quality, and give one specific recommendation improvement.',
    alternativeConclusions: [`A different conclusion is acceptable if it uses both exhibits accurately, quantifies the trade-off, and defines a decision gate aligned with ${profile.decision}.`],
    commonMistake: `Repeating the largest value from Exhibit 1 without reconciling it with Exhibit 2 or linking it to ${profile.problem}.`,
    commonMistakes: ['Using only one exhibit.', 'Treating correlation as causation.', 'Giving a generic recommendation without a measurable gate.'],
    learningObjective: `Apply ${profile.type.toLowerCase()} to move from evidence to insight, implication, and action.`,
    numericalValidation: derived.validation,
    recommendedNextDrillId: nextId,
    scoringHints: { calculationTerms: derived.terms, insightTerms: [profile.driver, profile.problem, 'value', 'risk'], evidenceTerms: derived.terms, implicationTerms: [profile.problem, 'resources', 'risk', 'value', 'decision'], actionTerms: profile.action.toLowerCase().split(/\s+/).filter((word) => word.length > 4).slice(0, 8) },
  };
}

export const EXPERT_CASE_EXPANSION: LibraryQuestion[] = PROFILES.flatMap((profile, profileIndex) =>
  REGIONS.map((_, caseIndex) => makeQuestion(profile, profileIndex, caseIndex)),
);

function genericChart(kind: ExhibitKind, question: LibraryQuestion, seed: number): LibraryExhibit {
  const base = 40 + (seed % 23);
  const common = { id: `${question.id}-hard-${kind}`, datasetId: `${question.id}-hard-upgrade`, title: `${question.title} - complementary evidence`, timePeriod: 'Current decision period', sourceNote: SOURCE };
  if (kind === 'financial-table') return exhibit({ ...common, kind, unit: 'Index and percent', columns: ['Segment', 'Scale index', 'Margin', 'Risk flag'], rows: [['Core', String(base + 30), '18%', 'Low'], ['Growth', String(base + 16), '12%', 'Medium'], ['At-risk', String(base), '6%', 'High']], analyticalPurpose: 'Add segment economics and risk context to the headline exhibit.', metrics: ['Scale', 'Margin', 'Risk'], periods: ['Current period'] });
  if (kind === 'heatmap') return exhibit({ ...common, kind, unit: 'Index', categories: ['Market A', 'Market B', 'Market C'], series: [{ name: 'Core', values: [base + 9, base + 2, base - 4] }, { name: 'Growth', values: [base, base + 12, base + 4] }, { name: 'Premium', values: [base + 15, base + 7, base + 18] }], axisConfig: { xLabel: 'Segment', yLabel: 'Market' }, analyticalPurpose: 'Locate the market-segment intersections behind the aggregate result.', metrics: ['Relative performance'], periods: ['Current period'] });
  if (kind === 'waterfall') return exhibit({ ...common, kind, unit: 'Index points', categories: ['Start', 'Demand', 'Mix', 'Cost', 'Execution'], series: [{ name: 'Movement', values: [base + 40, 12, 7, -9, -5] }], axisConfig: { xLabel: 'Driver', yLabel: 'Outcome bridge' }, analyticalPurpose: 'Decompose the outcome into positive and adverse drivers.', metrics: ['Outcome movement'], periods: ['Current period'] });
  if (kind === 'scatter') return exhibit({ ...common, kind, unit: 'Percent', categories: ['A', 'B', 'C', 'D', 'E'], series: [{ name: 'Unit', xValues: [2, 4, 6, 8, 10], values: [8, 14, 18, 20, 21] }], axisConfig: { xLabel: 'Input intensity', yLabel: 'Outcome' }, analyticalPurpose: 'Test the relationship and whether returns flatten.', metrics: ['Input intensity', 'Outcome'], periods: ['Matched sample'] });
  if (kind === 'treemap') return exhibit({ ...common, kind, unit: 'Percent', categories: ['Core', 'Premium', 'Growth', 'Adjacency', 'Other'], series: [{ name: 'Portfolio share', values: [34, 26, 18, 14, 8] }], analyticalPurpose: 'Show concentration and the portfolio value pools available for creative intervention.', metrics: ['Portfolio share'], periods: ['Current period'] });
  if (kind === 'stacked-100') return exhibit({ ...common, kind, unit: 'Percent', categories: ['Prior', 'Current'], series: [{ name: 'Core', values: [50, 39] }, { name: 'Growth', values: [30, 35] }, { name: 'Premium', values: [20, 26] }], axisConfig: { xLabel: 'Period', yLabel: 'Share' }, analyticalPurpose: 'Show the mix shift underlying the decision.', metrics: ['Mix'], periods: ['Prior', 'Current'] });
  if (kind === 'bubble') return exhibit({ ...common, kind, unit: 'Percent margin', categories: ['Option A', 'Option B', 'Option C'], series: [{ name: 'Option', xValues: [8, 13, 17], values: [22, 17, 11], sizes: [90, 120, 75] }], axisConfig: { xLabel: 'Growth (%)', yLabel: 'Margin (%)' }, analyticalPurpose: 'Balance growth, economics, and addressable value.', metrics: ['Growth', 'Margin', 'Value'], periods: ['Planning case'] });
  if (kind === 'multi-line') return exhibit({ ...common, kind, unit: 'Index', categories: ['Q1', 'Q2', 'Q3', 'Q4'], series: [{ name: 'Volume', values: [100, 110, 122, 135] }, { name: 'Value', values: [100, 106, 109, 108] }], axisConfig: { xLabel: 'Quarter', yLabel: 'Index' }, analyticalPurpose: 'Contrast scale growth with value creation over time.', metrics: ['Volume', 'Value'], periods: ['Q1', 'Q2', 'Q3', 'Q4'] });
  return exhibit({ ...common, kind: 'grouped-bar', unit: 'Index', categories: ['Core', 'Growth', 'At-risk'], series: [{ name: 'Prior', values: [base + 22, base + 8, base + 3] }, { name: 'Current', values: [base + 25, base + 19, base - 6] }], axisConfig: { xLabel: 'Segment', yLabel: 'Performance index' }, analyticalPurpose: 'Compare segment movement and expose divergence hidden by the aggregate.', metrics: ['Segment performance'], periods: ['Prior', 'Current'] });
}

function hardKinds(skill: LibrarySkill): ExhibitKind[] {
  if (skill === 'structures') return ['grouped-bar', 'heatmap'];
  if (skill === 'calculations') return ['waterfall', 'financial-table'];
  if (skill === 'creativity') return ['treemap', 'multi-line'];
  if (skill === 'market-sizing') return ['stacked-100', 'bubble'];
  return ['grouped-bar', 'multi-line'];
}

export function upgradeHardQuestions(questions: LibraryQuestion[]): LibraryQuestion[] {
  return questions.map((question, index) => {
    if (question.difficulty !== 'hard') return question;
    const current = question.exhibits?.length ? [...question.exhibits] : question.exhibit ? [question.exhibit] : [];
    const kinds = new Set(current.map((item) => item.kind === 'bar' ? 'vertical-bar' : item.kind));
    const candidates: ExhibitKind[] = [...hardKinds(question.skill), 'financial-table', 'heatmap', 'waterfall', 'scatter', 'stacked-100', 'bubble', 'multi-line'];
    for (const kind of candidates) {
      const normalized = kind === 'bar' ? 'vertical-bar' : kind;
      if (current.length >= 2 && kinds.size >= 2) break;
      if (kinds.has(normalized)) continue;
      current.push(genericChart(kind, question, index + 1));
      kinds.add(normalized);
    }
    const synthesisInstruction = 'Use both exhibits: answer the original question, then explain how the complementary exhibit changes the confidence, implication, or management action.';
    return { ...question, exhibits: current.slice(0, Math.max(2, current.length)), instruction: question.instruction?.includes('Use both exhibits') ? question.instruction : [question.instruction, synthesisInstruction].filter(Boolean).join(' ') };
  });
}

export function validateExpertExpansion(): string[] {
  const errors: string[] = [];
  if (EXPERT_CASE_EXPANSION.length !== 150) errors.push(`Expert expansion contains ${EXPERT_CASE_EXPANSION.length} cases instead of 150.`);
  for (const profile of PROFILES) {
    const cases = EXPERT_CASE_EXPANSION.filter((item) => item.skill === profile.skill && item.drillType === profile.type);
    if (cases.length !== 5) errors.push(`${profile.skill} / ${profile.type} contains ${cases.length} cases instead of 5.`);
    if (new Set(cases.map((item) => item.title.split(' - ')[0])).size !== 5) errors.push(`${profile.skill} / ${profile.type} repeats a company.`);
    const primaryCounts = new Map<string, number>();
    cases.forEach((item) => {
      const kinds = (item.exhibits || []).map((entry) => entry.kind);
      if (kinds.length < 2 || new Set(kinds).size < 2) errors.push(`${item.id} does not have two distinct exhibit types.`);
      const primary = kinds[0] || 'missing';
      primaryCounts.set(primary, (primaryCounts.get(primary) || 0) + 1);
    });
    primaryCounts.forEach((count, kind) => { if (count > 2) errors.push(`${profile.skill} / ${profile.type} uses ${kind} as primary in ${count} cases.`); });
  }
  return errors;
}
