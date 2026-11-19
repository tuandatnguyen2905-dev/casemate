import type { ExpertRubricItem, LibraryExhibit, LibraryQuestion } from './skillQuestionLibrary';

const SOURCE = 'Casemate original practice data; illustrative figures prepared for Draft Review.';

const HARD_RUBRIC: ExpertRubricItem[] = [
  { criterion: 'Key observation and data reading', points: 25, description: 'Reads the decisive exhibit values accurately and distinguishes facts from interpretation.' },
  { criterion: 'Key insight identification', points: 35, description: 'Identifies what the evidence means and prioritises the main driver.' },
  { criterion: 'Business implication', points: 30, description: 'Explains what the findings mean for the client objective, economics, or risk. No action plan or next step is required.' },
  { criterion: 'Communication clarity', points: 10, description: 'Communicates concisely in Observation → Insight → Implication order.' },
];

function exhibit(value: LibraryExhibit): LibraryExhibit {
  return { mutuallyExclusive: true, legendConfig: { show: true, position: 'top' }, sourceNote: SOURCE, ...value };
}

function hard(value: Omit<LibraryQuestion, 'difficulty' | 'status' | 'reviewStatus' | 'answerMode' | 'answerFormat' | 'structuredAnswer' | 'scoringRubric'>): LibraryQuestion {
  return {
    ...value,
    difficulty: 'hard',
    status: 'draft-pending-review',
    reviewStatus: 'Draft',
    answerMode: 'text',
    answerFormat: 'structured-expert',
    structuredAnswer: true,
    calculationRequired: false,
    evidenceRequired: 1,
    estimatedMinutes: value.estimatedMinutes || 7,
    scoringRubric: HARD_RUBRIC,
    personalizedFeedbackTemplate: 'Return the overall score, strongest answer section, most important missing insight, evidence used correctly, evidence overlooked, the model answer, and the recommended next drill.',
  };
}

export const HARD_CASE_DRILL_QUESTIONS: LibraryQuestion[] = [
  hard({
    id: 'charts-legacy-novabrew-401', skill: 'charts', title: 'NovaBrew - Growth Quality and Margin Risk', drillType: 'Growth vs Profitability', industry: 'Beverages', businessProblem: 'Profit decline', primarySkill: 'Turning a profit bridge into a business-decision implication', estimatedMinutes: 7,
    businessContext: 'NovaBrew sold more canned coffee in FY2026, but operating profit declined. Management is deciding whether to sign a larger distributor agreement.',
    clientObjective: 'Identify the decisive insight, support it with evidence, and explain what it implies for the distribution decision.',
    instruction: 'Do not merely describe values. State the insight, cite the supporting evidence, and explain the decision implication.',
    question: 'What is the most important insight from the exhibits, what evidence supports it, and what does it imply for NovaBrew’s distributor decision?',
    exhibits: [
      exhibit({ id: 'novabrew-income-table', datasetId: 'novabrew-fy25-26', kind: 'financial-table', title: 'Operating Profit Summary', unit: 'billion VND', timePeriod: 'FY2025–FY2026', columns: ['Metric', 'FY2025', 'FY2026'], rows: [['Revenue', '200', '230'], ['Variable costs', '(130)', '(166)'], ['Fixed costs', '(40)', '(46)'], ['Operating profit', '30', '18']], analyticalPurpose: 'Reconcile the reported operating-profit decline.', metrics: ['Revenue', 'Variable cost', 'Fixed cost', 'Operating profit'], periods: ['FY2025', 'FY2026'] }),
      exhibit({ id: 'novabrew-profit-waterfall', datasetId: 'novabrew-profit-bridge', kind: 'waterfall', title: 'FY2025 to FY2026 Operating-Profit Bridge', unit: 'billion VND', timePeriod: 'FY2025–FY2026', categories: ['FY2025 profit', 'Volume', 'Price / mix', 'Input cost', 'Distributor rebate', 'Fixed cost'], series: [{ name: 'Movement', values: [30, 18, 12, -20, -16, -6] }], axisConfig: { xLabel: 'Bridge driver', yLabel: 'Operating profit (billion VND)' }, analyticalPurpose: 'Separate favorable growth effects from adverse cost and commercial effects.', metrics: ['Profit movement'], periods: ['FY2025', 'FY2026'] }),
    ],
    correctAnswer: 'Key Observation: Operating profit fell from 30 billion VND to 18 billion VND. Volume and price/mix added 30 billion VND, but input cost, distributor rebate, and fixed cost removed 42 billion VND.\nKey Insight: Growth is not the problem; the economics of that growth are weak because input-cost inflation and distributor rebates consume the benefit.\nBusiness Implication: Expanding the same agreement risks scaling revenue while margin falls further.\nRecommended Next Step: Renegotiate rebate and price pass-through terms, then require a contribution-margin gate by distributor and SKU.',
    modelAnswerSections: { keyObservation: 'Operating profit fell from 30 billion VND to 18 billion VND while favorable volume and mix were outweighed by cost and rebate headwinds.', keyInsight: 'NovaBrew is growing on unattractive economics rather than suffering from weak demand.', supportingEvidence: 'Revenue rose from 200 billion VND to 230 billion VND, but profit fell 12 billion VND; positive bridge drivers total 30 billion VND versus 42 billion VND of adverse drivers.', businessImplication: 'A larger agreement on the same terms could grow revenue while destroying margin.', recommendedAction: 'Renegotiate the rebate and price pass-through, with a contribution-margin gate before expansion.' },
    explanation: 'The exhibit is genuinely new versus the existing Charts and Structures sources because its underlying income statement, bridge figures, distributor decision, and insight are specific to NovaBrew.',
    alternativeConclusions: ['Prioritising input-cost protection first is acceptable if the answer still addresses the distributor rebate before expansion.'], commonMistake: 'Describing revenue growth without explaining why profit fell or what the bridge means for the decision.', commonMistakes: ['Repeating values without an insight.', 'Recommending expansion without a margin gate.'], learningObjective: 'Convert a reconciled profit bridge into an evidence-backed business decision.', numericalValidation: ['FY2025 profit = 200 − 130 − 40 = 30 billion VND.', 'FY2026 profit = 230 − 166 − 46 = 18 billion VND.', 'Bridge = 18 + 12 − 20 − 16 − 6 = −12 billion VND.'], recommendedNextDrillId: 'charts-hard-insight-401',
    scoringHints: { insightTerms: ['economics', 'input', 'rebate', 'margin'], evidenceTerms: ['30', '18', '12', '42'], implicationTerms: ['distribution', 'margin', 'risk'], actionTerms: ['renegotiate', 'rebate', 'price', 'gate'] },
  }),

  hard({
    id: 'charts-hard-insight-401', skill: 'charts', title: 'Lantern Retail - Online Growth Quality', drillType: 'Growth vs Profitability', industry: 'Omnichannel retail', businessProblem: 'Unprofitable growth', primarySkill: 'Turning a visible channel trend into a management insight', estimatedMinutes: 6,
    businessContext: 'Lantern Retail is a Vietnamese home-goods chain. Online revenue has grown quickly, and management is considering shifting another 20 billion VND of marketing spend to the channel.',
    clientObjective: 'Decide whether the current online growth model is strong enough to justify the additional marketing investment.',
    instruction: 'Use the two connected exhibits to separate the visible growth observation from the economic insight. Follow the direct Observation → Insight → Implication path.',
    question: 'What is the most important insight about Lantern Retail’s online growth, and why does it matter for the investment decision?',
    exhibits: [
      exhibit({ id: 'lantern-channel-revenue', datasetId: 'lantern-fy25-26', kind: 'grouped-bar', title: 'Revenue by Channel', unit: 'billion VND', timePeriod: 'FY2025–FY2026', categories: ['Stores', 'Online', 'B2B'], series: [{ name: 'FY2025', values: [520, 180, 100] }, { name: 'FY2026', values: [500, 300, 90] }], axisConfig: { xLabel: 'Channel', yLabel: 'Revenue (billion VND)' }, analyticalPurpose: 'Identify which channel created the headline growth.', metrics: ['Revenue'], periods: ['FY2025', 'FY2026'] }),
      exhibit({ id: 'lantern-online-margin', datasetId: 'lantern-online-quarterly', kind: 'line', title: 'Online Contribution Margin', unit: 'Percent', timePeriod: 'FY2026 quarters', categories: ['Q1', 'Q2', 'Q3', 'Q4'], series: [{ name: 'Contribution margin', values: [8, 7, 5, 2] }], axisConfig: { xLabel: 'Quarter', yLabel: 'Contribution margin (%)' }, analyticalPurpose: 'Test whether online growth is becoming more or less economically attractive.', metrics: ['Contribution margin'], periods: ['Q1', 'Q2', 'Q3', 'Q4'] }),
    ],
    correctAnswer: 'Key Observation: Online revenue increased from 180 billion VND to 300 billion VND, while its contribution margin fell steadily from 8% in Q1 to 2% in Q4.\nKey Insight: Online is driving revenue growth but its growth quality is deteriorating; the company is buying scale with progressively weaker unit economics.\nBusiness Implication: Moving another 20 billion VND into the same model could increase sales while adding little contribution and increasing fulfilment pressure.\nRecommended Next Step: Hold broad spend expansion, diagnose margin by cohort and order type, and release investment only when a pilot restores contribution margin above an agreed threshold.',
    modelAnswerSections: { keyObservation: 'Online revenue rose from 180 billion VND to 300 billion VND, but online contribution margin declined from 8% to 2% across FY2026.', keyInsight: 'The online channel is creating scale without healthy incremental economics.', supportingEvidence: 'Exhibit 1 shows 120 billion VND of online growth; Exhibit 2 shows a six-point contribution-margin decline.', businessImplication: 'Additional broad marketing spend risks accelerating value-dilutive growth.', recommendedAction: 'Pause broad expansion, diagnose cohort and order economics, and use a contribution-margin gate for the next investment tranche.' },
    explanation: 'The direct Hard-level insight is the conflict between strong online revenue growth and rapidly weakening contribution margin.',
    alternativeConclusions: ['Selective investment in profitable online cohorts is acceptable if the answer defines the cohort and a margin gate.'], commonMistake: 'Calling online the best channel because its revenue grew fastest without checking its contribution margin.', commonMistakes: ['Repeating the revenue bars without interpreting the margin trend.', 'Recommending more spend without a profitability gate.'], learningObjective: 'Distinguish channel growth from value-creating channel growth.', numericalValidation: ['Online revenue growth = 300 − 180 = 120 billion VND.', 'Online contribution margin decline = 8% − 2% = 6 percentage points.'], recommendedNextDrillId: 'structures-hard-insight-401',
    scoringHints: { insightTerms: ['growth', 'economics', 'margin', 'value'], evidenceTerms: ['180', '300', '8%', '2%', '120', '6'], implicationTerms: ['investment', 'contribution', 'risk', 'fulfilment'], actionTerms: ['pause', 'cohort', 'diagnose', 'gate', 'margin'] },
  }),

  hard({
    id: 'structures-hard-insight-401', skill: 'structures', title: 'MetroParcel - Late-Delivery Diagnosis', drillType: 'Evidence-Based Issue Tree', industry: 'Parcel logistics', businessProblem: 'Service deterioration', primarySkill: 'Prioritising an issue tree from connected operating evidence', estimatedMinutes: 7,
    businessContext: 'MetroParcel’s on-time delivery rate has fallen below its 90% target. The COO wants a focused diagnostic plan rather than a broad review of every operation.',
    clientObjective: 'Identify the first diagnostic branch to investigate and define the most useful next analysis.',
    instruction: 'Read the operating pattern first, then state the diagnosis it suggests. A full multi-branch synthesis is not required; prioritise the most decision-relevant branch.',
    question: 'Which issue-tree branch should MetroParcel prioritise, what insight supports that choice, and what should the COO analyse next?',
    exhibits: [
      exhibit({ id: 'metroparcel-delay-heatmap', datasetId: 'metroparcel-regions-steps', kind: 'heatmap', title: 'Late Deliveries by Region and Process Step', unit: 'Percent of parcels', timePeriod: 'Latest month', categories: ['North', 'Central', 'South'], series: [{ name: 'Sorting', values: [4, 5, 6] }, { name: 'Line haul', values: [5, 6, 6] }, { name: 'Last mile', values: [9, 11, 18] }], axisConfig: { xLabel: 'Region', yLabel: 'Process step' }, analyticalPurpose: 'Locate where and in which region delays concentrate.', metrics: ['Late-delivery rate'], periods: ['Latest month'] }),
      exhibit({ id: 'metroparcel-service-bridge', datasetId: 'metroparcel-on-time-bridge', kind: 'waterfall', title: 'On-Time Delivery Bridge vs 90% Target', unit: 'Percentage points', timePeriod: 'Latest month', categories: ['90% target', 'Sorting', 'Line haul', 'Last mile'], series: [{ name: 'Movement', values: [90, -2, -2, -8] }], axisConfig: { xLabel: 'Driver', yLabel: 'On-time delivery (%)' }, analyticalPurpose: 'Prioritise the process step that explains most of the service gap.', metrics: ['On-time delivery', 'Driver impact'], periods: ['Latest month'] }),
    ],
    correctAnswer: 'Key Observation: Last-mile delays are highest in every region and reach 18% in the South; the bridge attributes 8 of the 12 percentage-point service gap to last mile.\nKey Insight: The first branch should be last-mile execution, especially the South, rather than a company-wide sorting or line-haul review.\nBusiness Implication: A broad diagnostic would dilute effort while the dominant service problem continues to drive failed delivery promises and rework.\nRecommended Next Step: Break South last-mile performance into route density, driver capacity, failed first attempts, dispatch timing, and partner performance, then compare high- and low-performing depots.',
    modelAnswerSections: { keyObservation: 'Last-mile delay is the largest process problem in every region, peaks at 18% in the South, and explains 8 of the 12 points below target.', keyInsight: 'Prioritise the South last-mile branch because it is the concentrated driver of the company-level service gap.', supportingEvidence: 'Exhibit 1 localises the hotspot; Exhibit 2 shows last mile contributes two-thirds of the 12-point gap.', businessImplication: 'A broad review would slow correction of the dominant source of service failure and rework.', recommendedAction: 'Decompose South last mile by route, capacity, failed attempts, dispatch timing, partner, and depot performance.' },
    explanation: 'The direct path is to locate the hotspot, quantify its contribution to the target gap, and use that evidence to prioritise the issue tree.',
    alternativeConclusions: ['A candidate may start with South depot performance if it is explicitly nested under the last-mile branch.'], commonMistake: 'Listing a generic end-to-end operations framework without prioritising last mile or the South region.', commonMistakes: ['Treating all process steps as equally important.', 'Ignoring the company-level target bridge.'], learningObjective: 'Use evidence to prioritise a tailored issue tree rather than presenting an unranked framework.', numericalValidation: ['Target gap = 90% − 78% = 12 points.', 'Last mile explains 8 / 12 = 67% of the gap.'], recommendedNextDrillId: 'calculations-hard-insight-401',
    scoringHints: { insightTerms: ['last mile', 'south', 'priorit', 'driver'], evidenceTerms: ['18%', '8', '12', '78%', '90%', '67%'], implicationTerms: ['service', 'rework', 'focus', 'failure'], actionTerms: ['route', 'capacity', 'attempt', 'dispatch', 'depot', 'partner'] },
  }),

  hard({
    id: 'calculations-hard-insight-401', skill: 'calculations', title: 'NovaBrew - Profit Bridge Under Volume Growth', drillType: 'Profitability Bridge', industry: 'Beverages', businessProblem: 'Profit decline', primarySkill: 'Reading a reconciled profit bridge and identifying the decisive driver', estimatedMinutes: 7,
    businessContext: 'NovaBrew sold more canned coffee in FY2026, but operating profit declined. Management needs a direct diagnosis before signing a larger distributor agreement.',
    clientObjective: 'Explain the profit decline, identify the most important controllable driver, and recommend the next commercial action.',
    instruction: 'Use the reconciled financial table and bridge. Put the calculation in Key Observation, then interpret rather than stopping at the number.',
    question: 'What does the profit bridge show, what is the key business insight, and what should NovaBrew do before expanding distribution?',
    exhibits: [
      exhibit({ id: 'novabrew-income-table', datasetId: 'novabrew-fy25-26', kind: 'financial-table', title: 'Operating Profit Summary', unit: 'billion VND', timePeriod: 'FY2025–FY2026', columns: ['Metric', 'FY2025', 'FY2026'], rows: [['Revenue', '200', '230'], ['Variable costs', '(130)', '(166)'], ['Fixed costs', '(40)', '(46)'], ['Operating profit', '30', '18']], analyticalPurpose: 'Reconcile the reported operating-profit decline.', metrics: ['Revenue', 'Variable cost', 'Fixed cost', 'Operating profit'], periods: ['FY2025', 'FY2026'] }),
      exhibit({ id: 'novabrew-profit-waterfall', datasetId: 'novabrew-profit-bridge', kind: 'waterfall', title: 'FY2025 to FY2026 Operating-Profit Bridge', unit: 'billion VND', timePeriod: 'FY2025–FY2026', categories: ['FY2025 profit', 'Volume', 'Price / mix', 'Input cost', 'Distributor rebate', 'Fixed cost'], series: [{ name: 'Movement', values: [30, 18, 12, -20, -16, -6] }], axisConfig: { xLabel: 'Bridge driver', yLabel: 'Operating profit (billion VND)' }, analyticalPurpose: 'Separate favorable growth effects from adverse cost and commercial effects.', metrics: ['Profit movement'], periods: ['FY2025', 'FY2026'] }),
    ],
    correctAnswer: 'Key Observation: Operating profit fell from 30 billion VND to 18 billion VND, a 12 billion VND decline. Volume and price/mix added 30 billion VND, but input cost, distributor rebate, and fixed cost removed 42 billion VND.\nKey Insight: Growth itself is not the problem; the new economics are unattractive because input-cost inflation and the distributor rebate more than consume the added gross benefit.\nBusiness Implication: Expanding the same agreement could scale revenue while compressing operating margin from 15.0% to 7.8%.\nRecommended Next Step: Renegotiate the rebate and price pass-through before expansion, with a minimum contribution-margin gate by distributor and SKU.',
    modelAnswerSections: { keyObservation: 'Profit declined 12 billion VND from 30 billion VND to 18 billion VND; 30 billion VND of favorable volume and mix was outweighed by 42 billion VND of cost, rebate, and fixed-cost headwinds.', keyInsight: 'The added volume is being monetised on weak terms, especially input-cost exposure and distributor rebates.', supportingEvidence: 'Exhibit 1 reconciles profit to 18 billion VND; Exhibit 2 reconciles +18 +12 −20 −16 −6 = −12.', businessImplication: 'Scaling the same model would grow revenue while reducing margin and resilience.', recommendedAction: 'Renegotiate rebate and price pass-through, then require contribution-margin gates by distributor and SKU.' },
    explanation: 'The Hard-level move is to reconcile the bridge, distinguish the growth benefit from the commercial and cost leakage, and name the controllable action.',
    alternativeConclusions: ['Prioritising input-cost hedging is acceptable if the answer still addresses the distributor rebate before volume expansion.'], commonMistake: 'Blaming volume growth for the decline without separating positive volume impact from cost and rebate headwinds.', commonMistakes: ['Reporting only the 12 billion VND decline.', 'Recommending growth without a margin threshold.'], learningObjective: 'Translate a reconciled profit bridge into a commercial management action.', numericalValidation: ['FY2025 profit = 200 − 130 − 40 = 30 billion VND.', 'FY2026 profit = 230 − 166 − 46 = 18 billion VND.', 'Bridge = 18 + 12 − 20 − 16 − 6 = −12 billion VND.', 'FY2025 margin = 30 / 200 = 15.0%; FY2026 margin = 18 / 230 = 7.8%.'], recommendedNextDrillId: 'creativity-hard-insight-401',
    scoringHints: { insightTerms: ['economics', 'input', 'rebate', 'volume', 'margin'], evidenceTerms: ['30', '18', '12', '42', '15.0%', '7.8%'], implicationTerms: ['scale', 'margin', 'revenue', 'resilience'], actionTerms: ['renegotiate', 'rebate', 'price', 'gate', 'distributor', 'sku'] },
  }),

  hard({
    id: 'creativity-hard-insight-401', skill: 'creativity', title: 'CareCircle - Retention Ideas With Evidence', drillType: 'Customer Experience Redesign', industry: 'Digital health', businessProblem: 'Customer retention', primarySkill: 'Selecting a focused, evidence-backed initiative rather than listing generic ideas', estimatedMinutes: 6,
    businessContext: 'CareCircle is a subscription telehealth service. Management wants one retention initiative that can be tested within eight weeks using the current clinical team.',
    clientObjective: 'Choose the strongest retention concept and define a practical pilot that does not add clinician capacity.',
    instruction: 'Use the complaint mix to identify the need, then use the option screen to select one feasible response. One well-supported concept is better than a long list.',
    question: 'Which retention initiative should CareCircle test first, what insight supports it, and how should management run the pilot?',
    exhibits: [
      exhibit({ id: 'carecircle-churn-treemap', datasetId: 'carecircle-churn-reasons', kind: 'treemap', title: 'Primary Reasons for Subscription Churn', unit: 'Percent of churned members', timePeriod: 'Last 6 months', categories: ['Slow follow-up', 'Price', 'Generic care plan', 'App friction', 'Other'], series: [{ name: 'Share', values: [35, 25, 20, 12, 8] }], analyticalPurpose: 'Identify the largest customer needs behind churn.', metrics: ['Churn reason share'], periods: ['Last 6 months'] }),
      exhibit({ id: 'carecircle-option-screen', datasetId: 'carecircle-retention-options', kind: 'grouped-bar', title: 'Retention Initiative Screen', unit: 'Score out of 10', timePeriod: 'Eight-week pilot estimate', categories: ['Automated follow-up', 'Price discount', 'Personalised care plan', 'App redesign'], series: [{ name: 'Expected retention impact', values: [8, 6, 7, 4] }, { name: 'Feasibility with current team', values: [9, 8, 6, 5] }], axisConfig: { xLabel: 'Initiative', yLabel: 'Score (10 = high)' }, analyticalPurpose: 'Compare customer impact and delivery feasibility under the capacity constraint.', metrics: ['Expected impact', 'Feasibility'], periods: ['Pilot estimate'] }),
    ],
    correctAnswer: 'Key Observation: Slow follow-up is the largest churn reason at 35%. Automated follow-up has the strongest combined screen, scoring 8/10 on expected impact and 9/10 on feasibility.\nKey Insight: The best first initiative is a clinically approved automated follow-up journey, because it attacks the largest need without requiring more clinician time.\nBusiness Implication: Starting with discounts would sacrifice revenue while addressing a smaller churn driver; a broad app redesign is less feasible and less directly linked to the main problem.\nRecommended Next Step: Run an eight-week pilot for new and at-risk members using automated check-ins, escalation rules, and clinician-approved content; compare renewal, response, escalation, and satisfaction against a control group.',
    modelAnswerSections: { keyObservation: 'Slow follow-up represents 35% of churn, and automated follow-up scores 8/10 on impact and 9/10 on feasibility.', keyInsight: 'An automated, clinically governed follow-up journey is the strongest evidence-backed concept under the no-new-capacity constraint.', supportingEvidence: 'Exhibit 1 identifies the largest churn reason; Exhibit 2 shows the best impact-feasibility combination.', businessImplication: 'Discounts or a broad redesign would either sacrifice economics or miss the main need.', recommendedAction: 'Pilot automated check-ins and escalation for eight weeks against a control, tracking renewal, response, escalation, and satisfaction.' },
    explanation: 'The direct path is need → option fit → business trade-off → test design.',
    alternativeConclusions: ['A personalised care-plan pilot is acceptable if the answer explains how it avoids additional clinician capacity and why it can outperform automated follow-up.'], commonMistake: 'Listing many generic retention ideas without choosing one or connecting it to the churn evidence.', commonMistakes: ['Choosing a discount only because it is feasible.', 'Ignoring the current-team capacity constraint.'], learningObjective: 'Turn customer evidence into one focused, testable, commercially grounded idea.', numericalValidation: ['Churn reasons reconcile to 35 + 25 + 20 + 12 + 8 = 100%.', 'Automated follow-up has the highest combined impact and feasibility score: 8 + 9 = 17.'], recommendedNextDrillId: 'market-sizing-hard-insight-401',
    scoringHints: { insightTerms: ['automated', 'follow-up', 'capacity', 'retention'], evidenceTerms: ['35%', '8', '9', '17'], implicationTerms: ['discount', 'revenue', 'churn', 'feasible'], actionTerms: ['pilot', 'check-in', 'escalation', 'control', 'renewal', 'satisfaction'] },
  }),

  hard({
    id: 'market-sizing-hard-insight-401', skill: 'market-sizing', title: 'FreshFleet - Capacity-Constrained Market Entry', drillType: 'Capacity-Constrained Market Opportunity', industry: 'Cold-chain logistics', businessProblem: 'Market entry and capacity planning', primarySkill: 'Reconciling serviceable demand with operational capacity', estimatedMinutes: 8,
    businessContext: 'FreshFleet provides refrigerated delivery for independent food retailers. It is considering a launch in three Vietnamese cities with six trucks available in year one.',
    clientObjective: 'Estimate the serviceable annual opportunity, identify the realistic year-one ceiling, and decide how to stage market entry.',
    instruction: 'Calculate the demand pool from Exhibit 1, compare it with delivery capacity in Exhibit 2, then state the single binding constraint and next step.',
    question: 'What is FreshFleet’s serviceable market, what can it realistically capture in year one, what does that imply, and how should management launch?',
    exhibits: [
      exhibit({ id: 'freshfleet-market-inputs', datasetId: 'freshfleet-serviceable-market', kind: 'market-sizing-table', title: 'Serviceable Market Inputs', unit: '', timePeriod: 'Year-one planning base', columns: ['Input', 'Value', 'Definition'], rows: [['Independent food retailers', '12,000', 'Across three launch cities'], ['Require cold-chain delivery', '40%', 'Eligible demand'], ['Likely to outsource', '25%', 'Serviceable customers'], ['Annual spend per customer', '120 million VND', 'Expected contract value']], analyticalPurpose: 'Calculate the serviceable customer and revenue pool.', metrics: ['Customer universe', 'Eligibility', 'Outsourcing', 'Annual spend'], periods: ['Year one'] }),
      exhibit({ id: 'freshfleet-city-capacity', datasetId: 'freshfleet-demand-capacity', kind: 'stacked-bar', title: 'Serviceable Customers vs Year-One Truck Capacity', unit: 'Customers', timePeriod: 'Year one', categories: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'], series: [{ name: 'Capacity served', values: [180, 120, 60] }, { name: 'Unserved serviceable demand', values: [420, 280, 140] }], axisConfig: { xLabel: 'Launch city', yLabel: 'Customers' }, analyticalPurpose: 'Compare serviceable demand with the operational delivery ceiling by city.', metrics: ['Capacity served', 'Unserved demand'], periods: ['Year one'] }),
    ],
    correctAnswer: 'Key Observation: Serviceable demand is 12,000 × 40% × 25% = 1,200 customers, worth 144 billion VND annually. The six-truck plan can serve only 360 customers, worth 43.2 billion VND, or 30% of the serviceable pool.\nKey Insight: Delivery capacity, not market demand, is the binding year-one constraint; FreshFleet cannot pursue all three cities at full commercial intensity.\nBusiness Implication: Broad acquisition could create backlog and service failures, while spreading trucks evenly may weaken route density.\nRecommended Next Step: Launch in dense city clusters up to the 360-customer ceiling, prioritise routes with the best utilisation, and add leased or partner trucks only after conversion and service-level gates are met.',
    modelAnswerSections: { keyObservation: 'The serviceable pool is 1,200 customers / 144 billion VND, while capacity supports 360 customers / 43.2 billion VND, equal to 30% of serviceable demand.', keyInsight: 'Truck capacity is the binding constraint, so the entry plan should optimise route density rather than maximise acquisition.', supportingEvidence: 'Exhibit 1 calculates the market pool; Exhibit 2 reconciles 600 + 400 + 200 = 1,200 serviceable customers and 180 + 120 + 60 = 360 capacity.', businessImplication: 'An unconstrained launch risks backlog, poor service, and low-density routes.', recommendedAction: 'Stage a cluster launch to the 360-customer ceiling and add partner or leased capacity only after conversion, utilisation, and service gates.' },
    explanation: 'The Hard-level insight comes directly from reconciling a simple serviceable-demand estimate with the operational ceiling.',
    alternativeConclusions: ['A two-city launch is acceptable if the answer shows how the 360-customer capacity is allocated and preserves route density.'], commonMistake: 'Using the full 144 billion VND serviceable market as the year-one revenue target without checking truck capacity.', commonMistakes: ['Stopping at TAM-like demand.', 'Ignoring route density and service quality.'], learningObjective: 'Reconcile market demand with a capacity-based capture ceiling and turn the result into a launch plan.', numericalValidation: ['Serviceable customers = 12,000 × 40% × 25% = 1,200.', 'Serviceable value = 1,200 × 120 million VND = 144 billion VND.', 'Capacity = 180 + 120 + 60 = 360 customers.', 'Capacity revenue = 360 × 120 million VND = 43.2 billion VND.', 'Capacity share = 360 / 1,200 = 30%.'], recommendedNextDrillId: 'charts-hard-insight-401',
    scoringHints: { insightTerms: ['capacity', 'constraint', 'demand', 'route', 'density'], evidenceTerms: ['1,200', '144', '360', '43.2', '30%'], implicationTerms: ['backlog', 'service', 'density', 'acquisition'], actionTerms: ['cluster', 'launch', 'partner', 'leased', 'utilisation', 'gate'] },
  }),
];

const RESTORED_HARD_META: Record<LibraryQuestion['skill'], { drillType: string; problem: string; primarySkill: string; action: string }> = {
  charts: { drillType: 'Chart Synthesis', problem: 'Performance diagnosis', primarySkill: 'Connecting chart evidence to a management decision', action: 'Validate the decisive driver, then run a focused pilot with a measurable performance gate.' },
  structures: { drillType: 'Evidence-Based Structure', problem: 'Problem prioritisation', primarySkill: 'Building and prioritising an evidence-led issue tree', action: 'Prioritise the highest-value branch, define disconfirming evidence, and assign the first diagnostic analysis.' },
  calculations: { drillType: 'Calculation to Insight', problem: 'Economic decision', primarySkill: 'Turning a reconciled calculation into a business implication', action: 'Confirm the economics, isolate the controllable driver, and set a threshold before committing resources.' },
  creativity: { drillType: 'Evidence-Backed Ideation', problem: 'Growth and innovation', primarySkill: 'Selecting a commercially grounded idea from the evidence', action: 'Pilot the strongest idea against a control and scale only after impact, feasibility, and economics are proven.' },
  'market-sizing': { drillType: 'Market Sizing to Decision', problem: 'Market opportunity', primarySkill: 'Reconciling demand, serviceability, and realistic capture', action: 'Validate the most sensitive assumption and stage entry to the realistic serviceable opportunity.' },
};

const RESTORED_SEGMENT_NOTE = 'Segments A, B and C are three distinct segments of the company in this case; this exhibit does not describe them further.';

function restorationExhibits(question: LibraryQuestion): LibraryExhibit[] {
  const common = {
    datasetId: `${question.id}-restored-hard`,
    timePeriod: 'Current decision period',
    sourceNote: SOURCE,
    mutuallyExclusive: true,
    legendConfig: { show: true, position: 'top' as const },
  };
  if (question.skill === 'structures') return [
    { ...common, id: `${question.id}-priority`, kind: 'grouped-bar', title: 'Issue-Tree Branch Priority', unit: 'Index', categories: ['Demand', 'Economics', 'Operations'], series: [{ name: 'Value at stake', values: [62, 84, 71] }, { name: 'Evidence strength', values: [58, 76, 67] }], analyticalPurpose: 'Prioritise diagnostic branches by value and evidence.', metrics: ['Value at stake', 'Evidence strength'], periods: ['Current period'] },
    { ...common, id: `${question.id}-diagnosis`, kind: 'heatmap', title: 'Driver Evidence by Segment', unit: 'Index', categories: ['Segment A', 'Segment B', 'Segment C'], footnote: RESTORED_SEGMENT_NOTE, series: [{ name: 'Demand', values: [72, 81, 49] }, { name: 'Economics', values: [78, 64, 38] }, { name: 'Execution', values: [75, 69, 42] }], analyticalPurpose: 'Locate the segment-driver intersection that needs the first test.', metrics: ['Diagnostic evidence'], periods: ['Current period'] },
  ];
  if (question.skill === 'calculations') return [
    { ...common, id: `${question.id}-bridge`, kind: 'waterfall', title: 'Economic Outcome Bridge', unit: 'Index points', categories: ['Starting point', 'Volume', 'Price / mix', 'Variable cost', 'Fixed cost'], series: [{ name: 'Movement', values: [80, 14, 9, -12, -6] }], analyticalPurpose: 'Reconcile the outcome into positive and adverse drivers.', metrics: ['Outcome movement'], periods: ['Current period'] },
    { ...common, id: `${question.id}-economics`, kind: 'financial-table', title: 'Segment Economics', unit: 'Index and percent', columns: ['Segment', 'Revenue index', 'Margin', 'Risk'], rows: [['Segment A', '112', '18%', 'Low'], ['Segment B', '126', '12%', 'Medium'], ['Segment C', '88', '5%', 'High']], footnote: RESTORED_SEGMENT_NOTE, analyticalPurpose: 'Connect the calculation to segment economics and risk.', metrics: ['Revenue', 'Margin', 'Risk'], periods: ['Current period'] },
  ];
  if (question.skill === 'creativity') return [
    { ...common, id: `${question.id}-needs`, kind: 'treemap', title: 'Customer Need Concentration', unit: 'Percent', categories: ['Convenience', 'Value', 'Trust', 'Personalisation', 'Other'], series: [{ name: 'Share', values: [31, 25, 20, 16, 8] }], analyticalPurpose: 'Identify the largest evidenced needs for ideation.', metrics: ['Need share'], periods: ['Current period'] },
    { ...common, id: `${question.id}-options`, kind: 'multi-line', title: 'Pilot Option Outlook', unit: 'Index', categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], series: [{ name: 'Customer impact', values: [100, 111, 124, 138] }, { name: 'Delivery effort', values: [100, 106, 113, 119] }], analyticalPurpose: 'Compare expected impact with delivery effort over the pilot.', metrics: ['Customer impact', 'Delivery effort'], periods: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
  ];
  if (question.skill === 'market-sizing') return [
    { ...common, id: `${question.id}-funnel`, kind: 'funnel', title: 'Opportunity Funnel', unit: 'Percent of TAM', categories: ['TAM', 'SAM', 'SOM'], series: [{ name: 'Reachable share of TAM', values: [100, 62, 28] }], analyticalPurpose: 'Separate total, serviceable, and realistically obtainable demand.', metrics: ['Reachable share'], periods: ['Planning case'] },
    { ...common, id: `${question.id}-scenarios`, kind: 'scatter', title: 'Market Entry Scenarios', unit: 'Percent margin', categories: ['Conservative', 'Base', 'Upside'], series: [{ name: 'Scenario', xValues: [7, 12, 17], values: [22, 18, 13] }], axisConfig: { xLabel: 'Growth (%)', yLabel: 'Margin (%)' }, analyticalPurpose: 'Balance growth and margin across entry scenarios.', metrics: ['Growth', 'Margin'], periods: ['Planning case'] },
  ];
  return [
    { ...common, id: `${question.id}-segments`, kind: 'grouped-bar', title: 'Segment Performance Comparison', unit: 'Index', categories: ['Segment A', 'Segment B', 'Segment C'], footnote: RESTORED_SEGMENT_NOTE, series: [{ name: 'Prior period', values: [94, 72, 66] }, { name: 'Current period', values: [98, 86, 53] }], analyticalPurpose: 'Show segment divergence hidden by the headline.', metrics: ['Segment performance'], periods: ['Prior period', 'Current period'] },
    { ...common, id: `${question.id}-trend`, kind: 'multi-line', title: 'Volume and Value Trend', unit: 'Index', categories: ['Q1', 'Q2', 'Q3', 'Q4'], series: [{ name: 'Volume', values: [100, 110, 122, 135] }, { name: 'Value', values: [100, 106, 109, 107] }], analyticalPurpose: 'Test whether scale is converting into economic value.', metrics: ['Volume', 'Value'], periods: ['Q1', 'Q2', 'Q3', 'Q4'] },
  ];
}

function normalisedExhibitKind(exhibit: LibraryExhibit): string {
  return exhibit.kind === 'bar' ? 'vertical-bar' : exhibit.kind;
}

/**
 * Restores a pre-migration Hard question without changing its stable ID or
 * candidate completion key. The archived MCQ/numeric prompt becomes context
 * for the structured Observation → Insight → Implication response.
 */
export function restoreArchivedHardQuestion(question: LibraryQuestion): LibraryQuestion {
  if (question.retiredVersion || question.difficulty !== 'hard' || question.reviewStatus !== 'Archived') return question;

  const exhibits = question.exhibits?.length ? [...question.exhibits] : question.exhibit ? [question.exhibit] : [];
  const kinds = new Set(exhibits.map(normalisedExhibitKind));
  for (const candidate of restorationExhibits(question)) {
    if (exhibits.length >= 2 && kinds.size >= 2) break;
    const kind = normalisedExhibitKind(candidate);
    if (kinds.has(kind)) continue;
    exhibits.push(candidate);
    kinds.add(kind);
  }

  const meta = RESTORED_HARD_META[question.skill];
  const observation = question.correctAnswer || question.explanation;
  const insight = question.keyInsight || question.explanation;
  const implication = `The client should not act on the headline alone; the evidence changes the value, risk, or priority of the ${meta.problem.toLowerCase()} decision.`;
  const evidenceTerms = Array.from(`${question.correctAnswer} ${question.explanation}`.matchAll(/\b\d+(?:[.,]\d+)?%?\b/g), (match) => match[0]).slice(0, 8);
  const correctAnswer = `Key Observation: ${observation}\nKey Insight: ${insight}\nBusiness Implication: ${implication}`;

  return {
    ...question,
    exhibits,
    exhibit: undefined,
    options: undefined,
    answerMode: 'text',
    answerFormat: 'structured-expert',
    structuredAnswer: true,
    calculationRequired: false,
    evidenceRequired: 2,
    estimatedMinutes: question.estimatedMinutes || 7,
    status: 'draft-pending-review',
    reviewStatus: 'Draft',
    drillType: question.drillType || meta.drillType,
    industry: question.industry || 'Cross-industry case practice',
    businessProblem: question.businessProblem || meta.problem,
    primarySkill: question.primarySkill || meta.primarySkill,
    businessContext: question.businessContext || `${question.title} is a Hard case that requires the candidate to connect quantitative evidence with a management decision.`,
    clientObjective: question.clientObjective || 'Identify the decisive observation and explain the business insight and implication.',
    instruction: 'Use both exhibits. Follow Observation → Insight → Implication, cite the decisive values, and keep the implication linked to the evidence.',
    question: `${question.question}\n\nWhat is the key observation, what insight does it reveal, and why does it matter?`,
    correctAnswer,
    modelAnswerSections: {
      keyInsight: insight,
      supportingEvidence: `Exhibit 1 provides the original case evidence: ${observation} Exhibit 2 adds a distinct decision lens that must be reconciled with that result.`,
      businessImplication: implication,
      recommendedAction: meta.action,
    },
    explanation: `${question.explanation} A complete Hard answer must now connect that result to the distinct second exhibit and state the business implication.`,
    scoringRubric: HARD_RUBRIC,
    personalizedFeedbackTemplate: 'Return the overall score, strongest answer section, most important missing insight, evidence used correctly, evidence overlooked, the model answer, and the recommended next drill.',
    alternativeConclusions: question.alternativeConclusions || ['A different conclusion is acceptable when it uses both exhibits accurately and explains what the evidence means for the decision.'],
    commonMistake: question.commonMistake || 'Stopping at the original answer without interpreting the complementary exhibit or stating a management implication.',
    commonMistakes: question.commonMistakes || ['Using only one exhibit.', 'Repeating a calculation without interpreting it.', 'Stating an implication that is not tied to the decision.'],
    learningObjective: question.learningObjective || meta.primarySkill,
    numericalValidation: question.numericalValidation || ['The original answer and explanation remain unchanged as the numerical reference.', 'The second exhibit is analytically distinct from the first.'],
    scoringHints: {
      insightTerms: question.scoringHints?.insightTerms || [question.skill, 'driver', 'priority', 'risk'],
      evidenceTerms: question.scoringHints?.evidenceTerms || evidenceTerms,
      implicationTerms: question.scoringHints?.implicationTerms || ['value', 'risk', 'decision', 'client'],
      actionTerms: question.scoringHints?.actionTerms || meta.action.toLowerCase().split(/\s+/).filter((word) => word.length > 4).slice(0, 8),
    },
  };
}
