import { bankingChapter, bankingQuiz, registerVisual } from './commercialBankingCore';
import type { BankingLessonBundle, BankingVisualRegistry } from './commercialBankingCore';
import { CB_CASES, CB_CASE_SOURCES } from './commercialBankingCases';

export const CB_M04_B04_VISUALS: BankingVisualRegistry = {};
const v = (kind: `cb-m4-${string}`, spec: Parameters<typeof registerVisual>[2]) => registerVisual(CB_M04_B04_VISUALS, kind, spec);
const s = (value: string | undefined, label: string, subtitle: string, description: string) => ({ value, label, subtitle, description });
const t = (term: string, definition: string) => ({ term, definition });

const L44 = '4.4 Key Success Factors';
const deck44 = [
  bankingChapter({
    title: 'Funding strength and asset quality', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '10 min',
    objective: 'Explain how stable low-cost funding and disciplined credit quality jointly drive resilient profitability.',
    mateIntro: 'Cheap funding can finance bad loans. Excellent underwriting can be undermined by unstable funding. The first success factor is the pairing—not either capability alone.',
    keyInsight: 'A durable bank combines a stable funding franchise with disciplined asset selection, monitoring, provisioning and recovery.',
    what: 'Funding strength includes CASA, term deposits, wholesale access, concentration, tenor and liquidity. Asset quality includes underwriting, collateral, portfolio diversification, early warning, NPL management, provisions and recovery.',
    how: 'Stable lower-cost funding supports NIM and liquidity; disciplined credit converts that margin into profit by limiting cost of risk. Stress testing connects the two under adverse rates, withdrawals and borrower weakness.',
    why: 'High NIM with poor credit quality can destroy capital, while strong assets funded by unstable liabilities can create liquidity stress.',
    global: 'Strong banks price loans for risk and capital while maintaining contingency funding and liquid assets rather than maximizing loan deployment at all times.',
    vietnam: 'Techcombank’s company-reported 40.9% CASA ratio at end-2024 illustrates a funding lens; VCB’s 1.0% end-2024 NPL illustrates an asset-quality lens. They are not a two-metric winner comparison.',
    visualKind: v('cb-m4-44-01-funding-quality', { layout: 'compare', title: 'Twin foundations of bank success', kicker: 'Funding strength × asset quality', leftTitle: 'Funding franchise', rightTitle: 'Credit franchise', rows: [
      { label: 'Acquire', a: 'Earn operating and savings balances', b: 'Select customers within risk appetite' },
      { label: 'Price', a: 'Manage deposit and wholesale cost', b: 'Price expected loss and capital' },
      { label: 'Monitor', a: 'Track concentration, tenor and liquidity', b: 'Track behavior, covenants and migration' },
      { label: 'Protect', a: 'Maintain buffers and contingency plans', b: 'Provision, collect and recover' },
      { label: 'Outcome', a: 'Cost and stability of funds', b: 'Risk-adjusted asset yield' },
    ], takeaway: 'NIM becomes durable only when funding and credit disciplines reinforce each other.' }),
    visualHeading: 'Funding and asset-quality framework', visualIntro: 'The paired framework links the cost and stability of liabilities to the risk-adjusted yield of assets.', imageAlt: 'Comparison of funding franchise and credit franchise capabilities.',
    statTiles: [s('40.9%', 'Techcombank CASA ratio', 'End-2024 · company-reported', 'Techcombank FY2024 results release; CASA balances ÷ customer deposits.'), s('1.0%', 'Vietcombank NPL', 'Consolidated end-2024', 'Fitch snippet; NPL is not cost of risk or coverage.'), s(undefined, 'Risk-adjusted margin', 'NIM minus credit burden', 'A mechanism, not a single standardized reported KPI.')],
    statsNote: 'The two facts illustrate different lenses and should not be combined into a ranking.',
    keyTerms: [t('Funding concentration', 'Dependence on a limited set of depositors, instruments or maturities.'), t('Asset quality', 'The likelihood that loans and investments perform as expected.'), t('Early-warning indicator', 'A signal of emerging borrower or portfolio deterioration before default is confirmed.')],
    recap: ['Funding cost and stability both matter.', 'NPL is only one asset-quality measure.', 'Underwriting and monitoring protect NIM.', 'Stress testing connects assets and liabilities.'], chapterRecap: 'Funding and asset quality form the first capability pair behind resilient bank earnings.', deepDiveTitle: 'The failure modes',
    deepDive: ['A bank may chase CASA through expensive rewards or fragile concentration, making the headline ratio less valuable. A bank may suppress current NPLs through rapid growth or restructuring while risk emerges later. Companion metrics and cohorts matter.', 'Assess liability runoff and asset deterioration together. A credit shock can damage confidence and funding at the same time, forcing costly liquidity actions.'],
    evidence: 'The Techcombank CASA ratio was re-checked against its FY2024 results release; the NPL fact is snippet-level and retains its limitations; no cost-of-funds or coverage value is invented.', sourceIds: ['cb-m04-s07', 'cb-m04-s10'],
    extraSources: [CB_CASE_SOURCES.tcbResultsFy24]
  }),
  bankingChapter({
    title: 'Capital, efficiency and distribution', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '10 min',
    objective: 'Connect capital strength, operating efficiency and distribution reach to growth capacity and resilience.',
    mateIntro: 'Growth needs three forms of capacity: capital to absorb risk, operations to process and control volume, and distribution to acquire and serve the right relationships.',
    keyInsight: 'Capital, efficiency and distribution are complements: weakening one can turn growth in the others into fragility or wasted cost.',
    what: 'Capital absorbs loss and constrains RWA. Efficiency compares OPEX with income but must preserve controls and investment. Distribution creates reach through branches, digital channels, RMs and partners.',
    how: 'Allocate capital to risk-adjusted opportunities, automate repeatable processes, redesign failure demand and use the right channel for each customer job. Measure CIR beside service, risk and investment outcomes.',
    why: 'Thin capital limits growth; underinvestment can flatter CIR temporarily; broad reach without activation and retention raises cost without franchise value.',
    global: 'Basel’s 8% total-capital minimum is a global reference floor within a broader buffer framework; local implementation and bank requirements vary.',
    vietnam: 'VPBank raised capital ahead of growth: its 2023 sale of a 15% stake to Japan’s SMBC lifted owner’s equity to about VND140 trillion and its CAR to 17% (company-reported). Capital created headroom; returns still depend on efficient, well-controlled growth.',
    visualKind: v('cb-m4-44-02-capacity', { layout: 'mindmap', variant: 'sides', title: 'The growth-capacity triangle', kicker: 'Three capabilities must scale together', center: 'Prudent growth', centerSub: 'Return + resilience', tagLabel: 'Financial link', rows: [
      { label: 'Capital', a: 'Loss absorption and RWA capacity', b: 'CAR + growth ceiling' },
      { label: 'Efficiency', a: 'Processes, people, technology and controls', b: 'CIR + service quality' },
      { label: 'Distribution', a: 'Reach, acquisition and relationship coverage', b: 'CAC + activity + balances' },
      { label: 'Governance', a: 'Priorities, limits and accountability', b: 'Sustainable allocation' },
      { label: 'Resilience', a: 'Operational and financial continuity', b: 'Trust + loss avoidance' },
    ], takeaway: 'Growth is only as strong as the least-prepared capacity underneath it.' }),
    visualHeading: 'Capital-efficiency-distribution framework', visualIntro: 'The diagram links each capability to the KPI family it influences.', imageAlt: 'Mind map of bank growth capacity around capital, efficiency and distribution.',
    statTiles: [s('8%', 'Basel total-capital minimum', 'International framework', 'Do not assume identical Vietnam implementation for every bank.'), s('≈87%', 'Adult payment-account ownership', 'Reported 2024', 'Reach indicator, not active use or profitability.'), s(undefined, 'CIR', 'OPEX ÷ operating income', 'Interpret with investment, service and control quality.')],
    statsNote: 'Basel and account-ownership facts provide context only; no same-basis bank CIR or CAR benchmark was available.',
    keyTerms: [t('Risk-weighted assets (RWA)', 'Assets and exposures weighted for regulatory risk to determine capital requirements.'), t('Operating efficiency', 'The ability to deliver income and service with disciplined resource use.'), t('Failure demand', 'Extra work created because a process or service failed the first time.')],
    recap: ['Capital creates loss and growth capacity.', 'CIR needs investment context.', 'Reach needs activation and retention.', 'Capabilities must scale together.'], chapterRecap: 'Prudent growth requires enough capital, efficient controlled operations and productive distribution.', deepDiveTitle: 'Efficiency without fragility',
    deepDive: ['Cutting people or controls can lower OPEX now while increasing fraud, service failure or future remediation. Separate structural simplification from deferred cost.', 'Digital investment can raise CIR before benefits arrive. Evaluate cohorts, automation, error reduction, uptime and customer adoption—not project spending alone.'],
    evidence: 'The chapter does not imply every Vietnam bank applies the same Basel III configuration or has the same capital threshold.', sourceIds: ['cb-m04-s02', 'cb-m04-s03'],
    caseStudy: CB_CASES.vpbankSmbcCapital
  }),
  bankingChapter({
    title: 'Innovation, trust and sustainable advantage', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '9 min',
    objective: 'Explain how digital capability, fee depth, governance and trust become durable competitive advantage.',
    mateIntro: 'Innovation earns attention; reliability earns balances. A bank advantage lasts only when new experiences strengthen trust, risk control and relationship economics.',
    keyInsight: 'Sustainable advantage links innovation to customer jobs, recurring economics, secure execution and trusted governance.',
    what: 'Success factors include useful digital journeys, data and analytics, API or ecosystem integration, recurring fee services, customer retention, cyber resilience, compliance, governance and brand trust.',
    how: 'Prioritize high-friction jobs, build controls into design, measure adoption and completion, improve from service data and reinvest in security and resilience.',
    why: 'Features commoditize. A reliable primary relationship creates balances, activity, data and cross-sell that reinforce the franchise.',
    global: 'Payment and cash-management capabilities can deepen fee income and daily engagement, while resilience failures can erase years of trust.',
    vietnam: 'High account reach and shared payment rails increase the importance of app quality, ecosystem relevance, service recovery and primary-bank behavior.',
    visualKind: v('cb-m4-44-03-ksf', { layout: 'steps', title: 'Key-success-factor chain', kicker: 'Capability → behavior → financial outcome', tagLabel: 'Outcome', steps: [
      { label: 'Useful innovation', detail: 'Solve a frequent, valuable customer job', tag: 'Adoption + activity' },
      { label: 'Reliable execution', detail: 'Complete safely with strong recovery', tag: 'Trust + retention' },
      { label: 'Relationship depth', detail: 'Win primary balances and relevant cross-sell', tag: 'Funding + fees' },
      { label: 'Risk governance', detail: 'Control credit, conduct, cyber and operations', tag: 'Lower loss volatility' },
      { label: 'Reinvestment', detail: 'Fund talent, data and infrastructure', tag: 'Durable capability' },
    ], note: 'The chain breaks if innovation outpaces controls or customer trust.', takeaway: 'Innovation creates advantage only when it improves trusted relationship economics.' }),
    visualHeading: 'Key success factor chain', visualIntro: 'The chain explicitly links capability investment to financial and risk outcomes.', imageAlt: 'Five-step bank key success factor chain.',
    statTiles: [s(undefined, 'Adoption', 'Meaningful active use', 'Downloads or registered accounts are not enough.'), s(undefined, 'Trust', 'Reliable + fair + secure', 'A funding and retention driver.'), s(undefined, 'Recurring fees', 'Service value over time', 'Distinct from one-off gains or upfront payments.')],
    statsNote: 'No unsupported claim that a named bank is the fee or digital leader is made.',
    keyTerms: [t('Primary relationship', 'A relationship capturing meaningful balances and frequent activity.'), t('Cyber resilience', 'The ability to prevent, withstand and recover from cyber disruption.'), t('Recurring fee income', 'Service income expected to repeat with sustained customer activity.')],
    recap: ['Useful innovation starts with customer jobs.', 'Reliability converts use into trust.', 'Primary relationships connect trust to funding and fees.', 'Governance keeps advantage sustainable.'], chapterRecap: 'Sustainable advantage is innovation multiplied by trust and governance.', deepDiveTitle: 'From feature to franchise',
    deepDive: ['Test four stages: feature use, job completion, relationship behavior and financial outcome. A feature that boosts logins without balances, transactions or retention may not strengthen the franchise.', 'Trust is observable through funded retention, complaint outcomes, recovery, uptime and customer choice—not only brand surveys.'],
    evidence: 'The success-factor framework uses verified reach and asset-quality context without creating an unsupported digital or fee league table.', sourceIds: ['cb-m04-s03', 'cb-m04-s07', 'cb-m04-s10', 'cb-m04-s11']
  }),
];

const L45 = '4.5 SWOT & Strategic Challenges';
const deck45 = [
  bankingChapter({
    title: 'A disciplined banking SWOT', chapterTitle: 'CHAPTER 1 OF 3', readingTime: '10 min',
    objective: 'Build separate global and Vietnam banking SWOTs that distinguish internal capabilities from external conditions.',
    mateIntro: 'A SWOT becomes generic when “digital” appears in every box. A useful SWOT names the mechanism and keeps industry conditions separate from one bank’s capabilities.',
    keyInsight: 'Strengths and weaknesses are internal to the analyzed bank or system; opportunities and threats are external—and every item needs a financial mechanism.',
    what: 'Vietnam system strengths include banking depth, broad reach, a concentrated profitable core and expanding digital access. Weakness hypotheses include concentration, capital constraints at some institutions, funding competition and uneven governance. Opportunities include inclusion, SME services, fee income, embedded and green finance. Threats include credit cycles, funding shocks, cyber risk and substitution.',
    how: 'Define the unit of analysis, place evidence, state the affected KPI and identify the strategic implication. Build a separate bank-specific SWOT before combining it with industry forces.',
    why: 'An industry weakness is not automatically a weakness at every bank; an external opportunity creates value only if the institution has capabilities and capital to capture it.',
    global: 'Global banks also face rate sensitivity, credit cycles, cyber and regulation, but market structure and product substitutes differ by jurisdiction.',
    vietnam: 'Bank assets near 196% and credit near 133% of GDP at end-September 2024 show depth, while 15.08% credit growth in 2024 shows expansion—not loan disbursement or guaranteed profit.',
    visualKind: v('cb-m4-45-01-swot', { layout: 'cards', title: 'Vietnam commercial banking SWOT', kicker: 'Evidence → mechanism → implication', tagLabel: 'Financial link', rows: [
      { label: 'Strength: depth & reach', a: 'Large banking footprint and broad account access', b: 'Scale + transaction potential' },
      { label: 'Strength: incumbent franchises', a: 'Deposits, trust, relationships and infrastructure', b: 'Funding + retention' },
      { label: 'Weakness: concentration', a: 'Potential exposure to correlated sectors or customers', b: 'NPL + cost of risk + capital' },
      { label: 'Weakness: funding pressure', a: 'Deposit competition and repricing sensitivity', b: 'Cost of funds + NIM' },
      { label: 'Opportunity: inclusion & SME', a: 'Underserved jobs and digitized cash flows', b: 'Growth + fees—if risk-adjusted' },
      { label: 'Threat: shocks & substitution', a: 'Macro, cyber, regulation and non-bank interfaces', b: 'Loss + OPEX + retention' },
    ], takeaway: 'A SWOT is useful only when every item changes a decision or financial driver.' }),
    visualHeading: 'Banking SWOT matrix', visualIntro: 'The matrix ties each factor to a KPI family while avoiding unsupported magnitude claims.', imageAlt: 'SWOT cards for Vietnam commercial banking linked to financial drivers.',
    statTiles: [s('196% of GDP', 'Bank assets', 'End-Sep 2024', 'Snippet-verified World Bank system-depth estimate.'), s('133% of GDP', 'Credit', 'End-Sep 2024', 'Stock measure; not annual disbursement.'), s('15.08%', 'Outstanding-credit growth', '2024', 'Secondary research citing SBV; not profit growth.')],
    statsNote: 'The cited figures do not validate unquantified claims about property exposure, thin CAR prevalence, cyber incidence or green-finance scale.',
    keyTerms: [t('SWOT', 'A framework separating internal strengths and weaknesses from external opportunities and threats.'), t('Credit stock', 'Outstanding credit at a point in time; different from new disbursement during a period.'), t('Correlated exposure', 'Exposures likely to deteriorate together because they share an economic driver.')],
    recap: ['Define the unit of analysis.', 'Keep internal and external factors separate.', 'Attach every SWOT item to a mechanism.', 'Credit growth is not disbursement or profit.'], chapterRecap: 'A disciplined SWOT converts evidence into a financial mechanism and a strategic decision.', deepDiveTitle: 'Avoid evidence overreach',
    deepDive: ['The research supports banking depth, reported account reach, scoped Big 4 shares and outstanding-credit growth. It does not quantify system property or corporate-bond exposure, banks near a CAR floor, cyber losses or green-finance volume.', 'Treat unverified items as hypotheses for diligence, not facts for publication. A bank-specific SWOT requires that bank’s own portfolio, funding, capital and control evidence.'],
    evidence: 'Every statistic retains date, meaning and source limitation. No system-level weakness is assigned automatically to a named bank.', sourceIds: ['cb-m04-s03', 'cb-m04-s04', 'cb-m04-s05', 'cb-m04-s15']
  }),
  bankingChapter({
    title: 'Strategic risks and their transmission', chapterTitle: 'CHAPTER 2 OF 3', readingTime: '11 min',
    objective: 'Trace interest-rate, credit, liquidity, capital, cyber, regulatory and competitive risks into bank financial outcomes.',
    mateIntro: 'Risks rarely stay in one box. A property downturn can raise NPLs, provisions and capital pressure; news of those losses can trigger funding stress; emergency liquidity can then compress NIM.',
    keyInsight: 'Strategic risk analysis follows transmission paths across income, balance sheet, capital, operations and trust.',
    what: 'Major risks include rate sensitivity, credit deterioration, liquidity stress, capital constraint, cyber and operational failure, regulatory change and competitive substitution.',
    how: 'Map trigger → first-order exposure → financial statement line → behavioral response → second-order consequence. Use scenarios rather than a single forecast.',
    why: 'Interactions create nonlinear outcomes. Individually manageable risks can compound through confidence, collateral, funding and operational dependencies.',
    global: 'Rate shocks reprice assets and liabilities at different speeds; cyber outages can create both direct cost and trust-driven customer behavior.',
    vietnam: 'Rapid credit growth, funding competition, evolving prudential requirements and digital dependence make integrated scenario analysis more useful than isolated risk lists.',
    visualKind: v('cb-m4-45-02-risk-map', { layout: 'table', title: 'Strategic risk transmission map', kicker: 'Trigger → statement → behavior → response', headers: ['Risk', 'Transmission path', 'Watch metrics'], rows: [
      { label: 'Interest rate', a: 'Repricing gap → NII/NIM volatility', b: 'Asset/liability repricing + CoF' },
      { label: 'Credit', a: 'Borrower stress → NPL/provisions → capital', b: 'Migration + CoR + LLCR' },
      { label: 'Liquidity', a: 'Outflows → costly funding / asset sale', b: 'Concentration + buffers + runoff' },
      { label: 'Capital', a: 'RWA growth/loss → constrained lending', b: 'CAR + retained earnings' },
      { label: 'Cyber / operations', a: 'Outage/fraud → cost + trust damage', b: 'Incidents + recovery + complaints' },
      { label: 'Regulation / competition', a: 'Rules or substitution → revenue/cost redesign', b: 'Compliance cost + churn + fee mix' },
    ], takeaway: 'Follow risk across systems; do not stop at the first financial line it touches.' }),
    visualHeading: 'Strategic risk transmission map', visualIntro: 'The map shows how risk travels through KPIs and customer behavior.', imageAlt: 'Table mapping seven banking strategic risks to transmission paths and indicators.',
    statTiles: [s(undefined, 'Rate gap', 'Different repricing speeds', 'Can move NIM even when market rates move uniformly.'), s(undefined, 'Credit migration', 'Risk can rise before default', 'Watch stages, sectors and cohorts—not NPL alone.'), s(undefined, 'Confidence', 'Behavioral transmission', 'Can turn solvency concerns into liquidity pressure.')],
    statsNote: 'No unverified incident frequency or system exposure magnitude is stated.',
    keyTerms: [t('Repricing gap', 'Mismatch in the timing or magnitude of asset and liability rate resets.'), t('Liquidity runoff', 'Withdrawal or non-renewal of funding under normal or stressed conditions.'), t('Second-order effect', 'A consequence caused by the response to the first impact rather than by the original shock alone.')],
    recap: ['Risks transmit across statements and behavior.', 'Scenario paths matter more than static lists.', 'Credit stress can become funding and capital stress.', 'Cyber risk can become trust and liquidity risk.'], chapterRecap: 'Strategic risk management identifies compound transmission paths and prepares responses before they reinforce one another.', deepDiveTitle: 'Build a scenario tree',
    deepDive: ['Choose a trigger, such as a rate increase or sector downturn. Estimate direct NII or loss effects, then model customer behavior, collateral, deposit runoff, credit-room and capital responses. Add management actions and their costs.', 'Use multiple severities and reverse stress tests: ask what combination of losses, outflows or operational failures would breach risk appetite or force a strategy change.'],
    evidence: 'The framework is conceptual and does not present unverified Vietnam exposure or cyber-loss statistics.', sourceIds: ['cb-m04-s02', 'cb-m04-s04', 'cb-m04-s15']
  }),
  bankingChapter({
    title: 'Strategic responses that change economics', chapterTitle: 'CHAPTER 3 OF 3', readingTime: '11 min',
    objective: 'Map funding optimization, income diversification, digital transformation, credit discipline, efficiency and capital planning to specific risks and KPIs.',
    mateIntro: '“Go digital” is not a strategy until it names the customer job, operating change, risk control and financial outcome. The same is true for funding, fees and capital.',
    keyInsight: 'A strategic response is credible when it names the capability, KPI mechanism, trade-off, owner and evidence of progress.',
    what: 'Core responses include funding optimization, recurring fee diversification, customer-journey redesign, underwriting and early warning, collections and provisioning, structural efficiency, resilience investment and capital planning.',
    how: 'Pair each risk with a leading indicator, action, guardrail and outcome. Sequence quick operational fixes with slower franchise and capital changes.',
    why: 'Strategies can conflict: deposit campaigns raise cost; faster growth consumes capital; fee initiatives create conduct risk; cost cuts can weaken controls; capital raises dilute owners.',
    global: 'Banks use portfolio steering, pricing, hedging, liquidity buffers, digital redesign and capital actions in combination rather than as isolated programs.',
    vietnam: 'CASA growth, fee services, digital journeys, credit quality and capital remain connected strategic levers; local credit constraints and legal requirements shape execution.',
    visualKind: v('cb-m4-45-03-response-map', { layout: 'steps', title: 'Strategic response map', kicker: 'Risk → capability → KPI → guardrail', tagLabel: 'Measure', steps: [
      { label: 'Optimize funding', detail: 'Earn operating balances; manage tenor and concentration', tag: 'CoF + stability + NIM' },
      { label: 'Diversify income', detail: 'Build recurring service value and net fees', tag: 'Fee quality + conduct' },
      { label: 'Transform journeys', detail: 'Automate completion and recovery', tag: 'CIR + activity + failures' },
      { label: 'Strengthen credit', detail: 'Underwrite, monitor, provision and recover', tag: 'NPL + CoR + LLCR' },
      { label: 'Plan capital', detail: 'Allocate RWA and build buffers', tag: 'CAR + ROE + growth capacity' },
      { label: 'Govern execution', detail: 'Set owners, limits and evidence gates', tag: 'Milestones + risk appetite' },
    ], note: 'Every lever has a trade-off; use guardrails so one KPI is not improved by damaging another.', takeaway: 'Strategy becomes real when capability changes produce measured economics within risk appetite.' }),
    visualHeading: 'Strategic response map', visualIntro: 'The response chain links each action to a KPI and its countervailing guardrail.', imageAlt: 'Six-step strategic response map for commercial banks.',
    statTiles: [s(undefined, 'Funding optimization', 'Cost + stability', 'Do not chase CASA with uneconomic incentives.'), s(undefined, 'Income diversification', 'Recurring net fees', 'Separate service value from one-off gains.'), s(undefined, 'Capital planning', 'RWA + buffers + return', 'Growth and distributions compete for capital.')],
    statsNote: 'Responses are capability frameworks, not claims that a named bank has completed them.',
    keyTerms: [t('Portfolio steering', 'Changing origination, pricing, limits or exposure mix to improve risk-return.'), t('Capital planning', 'Forecasting capital generation, consumption and buffers under business and stress scenarios.'), t('Guardrail', 'A constraint or companion measure that prevents one target from damaging another outcome.')],
    recap: ['Every response needs a KPI mechanism.', 'Funding and fee strategies have costs and risks.', 'Digital change must improve completed journeys.', 'Capital planning connects strategy to feasible growth.'], chapterRecap: 'Credible bank strategy links actions to economics while protecting resilience, fairness and capital.', deepDiveTitle: 'Turn the map into an execution plan',
    deepDive: ['For each response, define baseline, target, owner, leading indicator, lagging financial result and risk guardrail. Example: reduce failed digital onboarding before claiming CAC improvement; improve early-warning coverage before accelerating target-sector lending.', 'Review interactions quarterly. A funding campaign that improves CASA percentage but raises incentive expense and attracts unstable balances may not improve value. A provision build that lowers PBT can be consistent with stronger resilience.'],
    evidence: 'The response map follows validated business implications while avoiding unsupported claims about property exposure, cyber incidence or green-finance scale.', sourceIds: ['cb-m04-s03', 'cb-m04-s05', 'cb-m04-s15']
  }),
];

export const CB_LESSON_44: BankingLessonBundle = { deck: deck44, quiz: bankingQuiz('cb-m4-l44', deck44), takeaways: { learned: 'You can connect funding and asset quality, capital and efficiency, distribution and innovation to resilient bank advantage.', keyTakeaways: ['Funding and credit disciplines are complements.', 'Capital, efficiency and distribution must scale together.', 'Low CIR needs investment context.', 'Innovation becomes advantage through trust and governance.'], businessImplications: 'Key success factors should be managed as a connected capability system with explicit financial and risk outcomes.', remember: 'Durable advantage is trusted, risk-adjusted and capital-aware.', nextLesson: L45 } };
export const CB_LESSON_45: BankingLessonBundle = { deck: deck45, quiz: bankingQuiz('cb-m4-l45', deck45), takeaways: { learned: 'You can build an evidence-led SWOT, trace strategic-risk transmission and design responses with financial mechanisms and guardrails.', keyTakeaways: ['Separate internal capability from external condition.', 'Attach every SWOT item to a KPI mechanism.', 'Risks compound across income, liquidity, capital and trust.', 'Every response needs an owner, measure and guardrail.', 'Credit growth is not disbursement or profit.'], businessImplications: 'Strategy should prioritize linked risks and capabilities, then measure progress through both financial outcomes and resilience guardrails.', remember: 'A strategic response is credible only when it changes measured economics without hiding the trade-off.', nextLesson: 'Complete Module 04 and return to the Commercial Banking learning journey' } };
