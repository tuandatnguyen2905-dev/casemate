// Commercial Banking Module 04, Lessons 4.3 to 4.5 activities (sources: commercialBankingM04B03.tsx and
// commercialBankingM04B04.tsx). No figures, named-bank metrics or hypothetical calculations. Lesson 4.3
// Chapter 2 (restriction notice) is not cited. Learners see the Module 04 Learning Visuals from
// commercialBankingM04VisualSpecs.ts, and every Lesson 4.3 visual is held, so activities are grounded only in
// the chapter narrative, deep dive, recap, key terms, stat tiles and the rendered (non-held) visuals.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE04' as const;
const L43 = '4.3 Competitor Benchmarking';
const L44 = '4.4 Key Success Factors';
const L45 = '4.5 SWOT & Strategic Challenges';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const BM1 = 'Build a bank benchmark that means something';
const BM3 = 'Interpret trade-offs, not winners';
const K1 = 'Funding strength and asset quality';
const K3 = 'Innovation, trust and sustainable advantage';
const S1 = 'A disciplined banking SWOT';
const S2 = 'Strategic risks and their transmission';
const S3 = 'Strategic responses that change economics';

export const CB_M04MORE_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-04', [
  {
    activityId: 'cb-m04-match-kpi-definitions',
    type: 'concept-matching',
    title: 'What four benchmark ratios actually measure',
    learningObjective: 'Match each benchmark ratio to what it measures, so a stock of problem loans, a period charge, a capital ratio and an efficiency ratio are never treated as interchangeable.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Ratio',
    answerLabel: 'What it measures',
    summary: 'Each metric sees one layer of the bank. Formula definitions may vary across disclosures, so retain each bank\u2019s own definition and reconcile it before any comparison.',
    items: {
      prompts: [
        { id: 'kpi-npl', text: 'NPL ratio' },
        { id: 'kpi-cor', text: 'Cost of risk' },
        { id: 'kpi-car', text: 'CAR' },
        { id: 'kpi-cir', text: 'CIR' },
      ],
      answers: [
        { id: 'def-npl', text: 'The stock of problem loans relative to gross loans.' },
        { id: 'def-cor', text: 'The period\u2019s credit-loss charge relative to average loans.' },
        { id: 'def-car', text: 'Regulatory capital relative to risk-weighted assets.' },
        { id: 'def-cir', text: 'Operating expense relative to operating income.' },
      ],
    },
    pairs: [
      { id: 'pair-kpi-npl', promptId: 'kpi-npl', answerId: 'def-npl', explanation: 'It counts problem loans held at a date; it is not the provision expense charged during the period.', hint: 'It is a snapshot of loans that have already gone bad.' },
      { id: 'pair-kpi-cor', promptId: 'kpi-cor', answerId: 'def-cor', explanation: 'Provisions divided by average loans give the period\u2019s credit-loss charge, subject to each bank\u2019s definition.', hint: 'It is what credit losses cost the bank during the period.' },
      { id: 'pair-kpi-car', promptId: 'kpi-car', answerId: 'def-car', explanation: 'It uses regulatory capital over risk-weighted assets, not accounting equity divided by total assets.', hint: 'It weights exposures by risk before comparing them with the cushion.' },
      { id: 'pair-kpi-cir', promptId: 'kpi-cir', answerId: 'def-cir', explanation: 'It is an efficiency ratio, and it needs a consistent revenue scope before two banks can be compared.', hint: 'It shows how much of what the bank earns is spent running it.' },
    ],
    sourceRefs: [
      ch(L43, 0, BM1, ['cb-m04-s07', 'cb-m04-s08', 'cb-m04-s09', 'cb-m04-s10', 'cb-m04-s11', 'cb-m04-s12', 'cb-m04-s13'], 'Chapter stat tiles defining the NPL ratio, cost of risk, CAR and CIR, the stats note on varying formula definitions, and the narrative \u201cEach metric sees one layer\u201d.'),
    ],
  },
  {
    activityId: 'cb-m04-match-tradeoff-questions',
    type: 'concept-matching',
    title: 'Headline metric, counter-question',
    learningObjective: 'Match each attractive headline metric to the question that tests whether it is real strength.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Headline',
    answerLabel: 'Counter-question',
    summary: 'Bank strength is multidimensional: interpret each attractive metric beside the risk, cost or capital that can produce it. Pair every headline with its companion evidence.',
    items: {
      prompts: [
        { id: 'head-nim', text: 'High NIM' },
        { id: 'head-casa', text: 'High CASA' },
        { id: 'head-growth', text: 'Fast growth' },
        { id: 'head-cir', text: 'Low CIR' },
        { id: 'head-roe', text: 'High ROE' },
        { id: 'head-provisions', text: 'High provisions' },
      ],
      answers: [
        { id: 'ask-nim', text: 'What do the lending mix and cost of risk show?' },
        { id: 'ask-casa', text: 'How stable is that funding, and what does it cost to keep?' },
        { id: 'ask-growth', text: 'What do underwriting cohorts, NPL migration and provisions show?' },
        { id: 'ask-cir', text: 'Is spending on technology and controls adequate?' },
        { id: 'ask-roe', text: 'What do ROA and CAR show?' },
        { id: 'ask-provisions', text: 'Are the reserves improving resilience?' },
      ],
    },
    pairs: [
      { id: 'pair-head-nim', promptId: 'head-nim', answerId: 'ask-nim', explanation: 'NIM can be high because of mix or risk, so a high margin is read beside the cost of the credit risk behind it.', hint: 'Margin can be bought with risk.' },
      { id: 'pair-head-casa', promptId: 'head-casa', answerId: 'ask-casa', explanation: 'CASA needs a stability and cost lens: low-cost balances help only if they stay and remain cheap to keep.', hint: 'Cheap funding is worth little if it can leave quickly.' },
      { id: 'pair-head-growth', promptId: 'head-growth', answerId: 'ask-growth', explanation: 'Growth trades off against asset quality, and losses on new lending often appear only after the growth has been reported.', hint: 'Losses on new loans often appear after the growth does.' },
      { id: 'pair-head-cir', promptId: 'head-cir', answerId: 'ask-cir', explanation: 'A low ratio can mean efficiency, or underinvestment in capability, controls or resilience that flatters it for now.', hint: 'Low cost can mean skimping.' },
      { id: 'pair-head-roe', promptId: 'head-roe', answerId: 'ask-roe', explanation: 'A high return on equity can reflect strong asset returns or thin capital, so ROA and CAR give the context.', hint: 'It may come from thin equity.' },
      { id: 'pair-head-provisions', promptId: 'head-provisions', answerId: 'ask-provisions', explanation: 'Provisions reduce today\u2019s profit but can strengthen resilience.', hint: 'They lower profit now for a possible benefit later.' },
    ],
    sourceRefs: [
      ch(L43, 2, BM3, ['cb-m04-s07', 'cb-m04-s10', 'cb-m04-s11'], 'Chapter narrative (key trade-offs; \u201cBuild paired hypotheses, then seek companion evidence\u201d), mate intro and recap: each headline metric with the companion evidence that tests it.'),
    ],
  },
  {
    activityId: 'cb-m04-sort-funding-vs-credit-franchise',
    type: 'category-sorting',
    title: 'Funding franchise or credit franchise?',
    learningObjective: 'Place each activity in the funding franchise or the credit franchise, the two disciplines that must reinforce each other.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'NIM becomes durable only when funding and credit disciplines reinforce each other. Cheap funding can finance bad loans, and strong underwriting can be undermined by unstable funding.',
    categories: [
      { id: 'funding', label: 'Funding franchise', description: 'Attracting and managing the money the bank lends.' },
      { id: 'credit', label: 'Credit franchise', description: 'Choosing, pricing and managing the loans the bank makes.' },
    ],
    items: [
      { id: 'earn-balances', text: 'Earn operating and savings balances', categoryId: 'funding', explanation: 'Acquiring balances is how a funding franchise is built.', hint: 'It brings in money from customers.' },
      { id: 'select-customers', text: 'Select customers within risk appetite', categoryId: 'credit', explanation: 'Selection of borrowers is the first step of credit discipline.', hint: 'It decides who is allowed to borrow.' },
      { id: 'manage-deposit-cost', text: 'Manage deposit and wholesale cost', categoryId: 'funding', explanation: 'Pricing of liabilities decides the cost of funds.', hint: 'It concerns what the bank pays for its money.' },
      { id: 'price-loss-capital', text: 'Price expected loss and capital into loans', categoryId: 'credit', explanation: 'Loan pricing must cover expected loss and the capital the loan uses.', hint: 'It sets what borrowers pay to cover what could go wrong.' },
      { id: 'track-concentration-tenor', text: 'Track concentration, tenor and liquidity', categoryId: 'funding', explanation: 'Stable funding needs watching for dependence on a few sources or short maturities.', hint: 'It watches how dependable the money is.' },
      { id: 'track-behaviour-migration', text: 'Track early-warning indicators and portfolio diversification', categoryId: 'credit', explanation: 'Early-warning indicators signal borrower or portfolio deterioration before default is confirmed.', hint: 'It watches how borrowers are doing.' },
      { id: 'maintain-buffers', text: 'Maintain contingency funding and liquid assets', categoryId: 'funding', explanation: 'Buffers protect the bank when funding becomes less available.', hint: 'It is preparation for money becoming scarce.', misplaced: { credit: 'Buffers protect against funding shocks. Loan losses are met through collateral, provisions and recovery.' } },
      { id: 'provision-collect-recover', text: 'Hold collateral, provision and recover', categoryId: 'credit', explanation: 'These actions limit the loss when loans go wrong.', hint: 'They deal with loans that have already gone bad.' },
    ],
    sourceRefs: [
      ch(L44, 0, K1, ['cb-m04-s07', 'cb-m04-s10'], 'Chapter narrative (what funding strength and asset quality include; how they connect) and the rendered funding-franchise versus credit-franchise comparison: acquire, watch and protect on each side.'),
    ],
  },
  {
    activityId: 'cb-m04-match-ksf-outcomes-v2',
    type: 'concept-matching',
    title: 'From capability to outcome in the success-factor chain',
    learningObjective: 'Match each link in the key-success-factor chain to the behaviour or outcome it produces.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Capability',
    answerLabel: 'Outcome',
    summary: 'Sustainable advantage links innovation to customer jobs, recurring economics, secure execution and trusted governance. Innovation earns attention; reliability earns balances.',
    items: {
      prompts: [
        { id: 'ksf-innovation', text: 'Useful innovation' },
        { id: 'ksf-execution', text: 'Reliable execution' },
        { id: 'ksf-depth', text: 'Primary relationships' },
        { id: 'ksf-governance', text: 'Governance' },
      ],
      answers: [
        { id: 'out-adoption', text: 'Adoption and activity.' },
        { id: 'out-trust', text: 'Trust and retention.' },
        { id: 'out-funding-fees', text: 'Funding and fees.' },
        { id: 'out-sustainable', text: 'An advantage that stays sustainable.' },
      ],
    },
    pairs: [
      { id: 'pair-ksf-innovation', promptId: 'ksf-innovation', answerId: 'out-adoption', explanation: 'Innovation that starts from a high-friction customer job earns meaningful active use; downloads or registered accounts are not enough.', hint: 'The first sign that a new feature works.' },
      { id: 'pair-ksf-execution', promptId: 'ksf-execution', answerId: 'out-trust', explanation: 'Reliability converts use into trust, and trust shows up in funded retention, complaint outcomes, recovery and uptime.', hint: 'It is earned when things work and failures are fixed.' },
      { id: 'pair-ksf-depth', promptId: 'ksf-depth', answerId: 'out-funding-fees', explanation: 'A reliable primary relationship creates balances, activity, data and cross-sell, which connect trust to funding and fee income.', hint: 'It is what a main-bank relationship pays the bank.' },
      { id: 'pair-ksf-governance', promptId: 'ksf-governance', answerId: 'out-sustainable', explanation: 'Compliance, cyber resilience and trusted governance protect the franchise, so an advantage built through innovation can last.', hint: 'It stops a gain from being undone later.' },
    ],
    sourceRefs: [
      ch(L44, 2, K3, ['cb-m04-s03', 'cb-m04-s07', 'cb-m04-s10', 'cb-m04-s11'], 'Chapter recap (useful innovation starts with customer jobs; reliability converts use into trust; primary relationships connect trust to funding and fees; governance keeps advantage sustainable), narrative and the adoption stat tile.'),
    ],
  },
  {
    activityId: 'cb-m04-sort-swot-factors-v2',
    type: 'category-sorting',
    title: 'Classify the SWOT factors',
    learningObjective: 'Place factors in a banking SWOT as strengths, weaknesses, opportunities or threats, keeping internal capability separate from external condition.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Strengths and weaknesses are internal to the analysed bank or system; opportunities and threats are external. Unverified items are hypotheses for diligence, not facts.',
    categories: [
      { id: 'strength', label: 'Strength', description: 'An internal capability that helps.' },
      { id: 'weakness', label: 'Weakness', description: 'An internal limitation that hurts, treated as a hypothesis until evidenced.' },
      { id: 'opportunity', label: 'Opportunity', description: 'An external condition that could be captured.' },
      { id: 'threat', label: 'Threat', description: 'An external condition that could cause harm.' },
    ],
    items: [
      { id: 'depth-reach', text: 'Banking depth relative to the economy', categoryId: 'strength', explanation: 'A deep banking system gives scale for funding and lending, which is a capability the system already has.', hint: 'It describes what the system already has.' },
      { id: 'account-reach', text: 'Broad account reach among adults', categoryId: 'strength', explanation: 'Wide account access gives transaction potential, although reach is not the same as active use.', hint: 'It describes how many customers the system already serves.' },
      { id: 'concentration', text: 'Potential exposure to correlated sectors or customers', categoryId: 'weakness', explanation: 'Concentration can raise NPLs, cost of risk and capital need, but must be evidenced for each bank.', hint: 'It is a limitation inside the portfolio.', misplaced: { threat: 'Concentration is an internal portfolio feature. The external event that exposes it would be the threat.' } },
      { id: 'capital-constraints', text: 'Capital constraints at some institutions', categoryId: 'weakness', explanation: 'Thin capital is an internal limit on growth and loss absorption, and it is a hypothesis to test bank by bank.', hint: 'It is a limit on what some banks can carry.' },
      { id: 'inclusion-sme', text: 'Financial inclusion and SME services', categoryId: 'opportunity', explanation: 'Growth and fees are available only if captured with sound risk management.', hint: 'It is something in the market that a bank could go after.' },
      { id: 'fee-embedded', text: 'Fee income, embedded finance and green finance', categoryId: 'opportunity', explanation: 'These are external openings that need capability and capital to capture.', hint: 'They are openings that depend on action by the bank.' },
      { id: 'shocks-substitution', text: 'Cyber risk and substitution by non-bank providers', categoryId: 'threat', explanation: 'These external conditions can raise loss and operating cost and reduce retention.', hint: 'They are outside events that could hurt.', misplaced: { weakness: 'These come from outside the bank, so they are external conditions and not internal limitations.' } },
      { id: 'credit-funding-cycles', text: 'Credit cycles and funding shocks', categoryId: 'threat', explanation: 'Downturns and funding stress arise outside the bank and hit its earnings.', hint: 'They come from the economy and the markets.' },
    ],
    sourceRefs: [
      ch(L45, 0, S1, ['cb-m04-s03', 'cb-m04-s04', 'cb-m04-s05', 'cb-m04-s15'], 'Chapter narrative \u201cWhat it is\u201d and the rendered SWOT taxonomy: strengths, weakness hypotheses, opportunities and threats, cited without any magnitude.'),
    ],
  },
  {
    activityId: 'cb-m04-match-risk-transmission-v2',
    type: 'concept-matching',
    title: 'How strategic risks travel through a bank',
    learningObjective: 'Match each strategic risk to its transmission path, following it beyond the first financial line it touches.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Risk',
    answerLabel: 'Transmission path',
    summary: 'Follow risk across statements and behaviour and do not stop at the first financial line it touches. Credit stress can become funding and capital stress, and cyber risk can become trust and liquidity risk.',
    items: {
      prompts: [
        { id: 'risk-rate', text: 'Interest rate' },
        { id: 'risk-credit', text: 'Credit' },
        { id: 'risk-liquidity', text: 'Liquidity' },
        { id: 'risk-capital', text: 'Capital' },
        { id: 'risk-cyber', text: 'Cyber and operations' },
      ],
      answers: [
        { id: 'path-rate', text: 'Assets and liabilities reprice at different speeds, moving NIM.' },
        { id: 'path-credit', text: 'Borrower stress raises NPLs and provisions.' },
        { id: 'path-liquidity', text: 'Deposit runoff forces costly emergency funding.' },
        { id: 'path-capital', text: 'Losses shrink the capacity to lend.' },
        { id: 'path-cyber', text: 'An outage causes direct cost and trust-driven customer behaviour.' },
      ],
    },
    pairs: [
      { id: 'pair-risk-rate', promptId: 'risk-rate', answerId: 'path-rate', explanation: 'A repricing gap is a mismatch in the timing or magnitude of rate resets, so margin can move even when market rates move uniformly.', hint: 'The exposure is to timing differences in rate changes.' },
      { id: 'pair-risk-credit', promptId: 'risk-credit', answerId: 'path-credit', explanation: 'A sector downturn weakens borrowers, and the first-order hit lands on credit quality and income.', hint: 'It starts with borrowers who struggle to repay.' },
      { id: 'pair-risk-liquidity', promptId: 'risk-liquidity', answerId: 'path-liquidity', explanation: 'When confidence falls and funding is withdrawn or not renewed, replacement liquidity is expensive and compresses margin.', hint: 'It starts with money leaving the bank.' },
      { id: 'pair-risk-capital', promptId: 'risk-capital', answerId: 'path-capital', explanation: 'Losses and provisions reduce capital, which limits how much more the bank can lend.', hint: 'It ends with the bank being unable to lend more.' },
      { id: 'pair-risk-cyber', promptId: 'risk-cyber', answerId: 'path-cyber', explanation: 'Failures cost money directly and, through trust, can also change how customers behave, so cyber risk can become liquidity risk.', hint: 'It starts with a system failure.' },
    ],
    sourceRefs: [
      ch(L45, 1, S2, ['cb-m04-s02', 'cb-m04-s04', 'cb-m04-s15'], 'Chapter mate intro, narrative global example, stat tiles, key terms (repricing gap, liquidity runoff) and recap, plus the rendered property-downturn transmission flow.'),
    ],
  },
  {
    activityId: 'cb-m04-match-response-kpis',
    type: 'concept-matching',
    title: 'Strategic responses and the measures that show them working',
    learningObjective: 'Match each strategic response to the measure that shows whether it changes economics.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Response',
    answerLabel: 'Measure of progress',
    summary: 'A strategic response is credible when it names the capability, KPI mechanism, trade-off, owner and evidence of progress. Each lever also needs a guardrail so one KPI is not improved at another\u2019s expense.',
    items: {
      prompts: [
        { id: 'resp-funding', text: 'Optimise funding' },
        { id: 'resp-income', text: 'Diversify income' },
        { id: 'resp-journeys', text: 'Redesign customer journeys' },
        { id: 'resp-credit', text: 'Strengthen credit' },
        { id: 'resp-capital', text: 'Plan capital' },
      ],
      answers: [
        { id: 'meas-funding', text: 'Cost and stability of deposit balances.' },
        { id: 'meas-income', text: 'Recurring net fees, kept apart from one-off gains.' },
        { id: 'meas-journeys', text: 'Digital tasks completed without failure, such as onboarding.' },
        { id: 'meas-credit', text: 'Early-warning coverage and provisions.' },
        { id: 'meas-capital', text: 'Risk-weighted assets, buffers and return.' },
      ],
    },
    pairs: [
      { id: 'pair-resp-funding', promptId: 'resp-funding', answerId: 'meas-funding', explanation: 'Earning operating balances and managing tenor and concentration should lower cost and steady the balances, without chasing CASA through uneconomic incentives.', hint: 'It acts on the money the bank raises.' },
      { id: 'pair-resp-income', promptId: 'resp-income', answerId: 'meas-income', explanation: 'Recurring service value is separated from one-off gains, and fee initiatives are watched for conduct risk.', hint: 'It is about earning from services rather than from interest.' },
      { id: 'pair-resp-journeys', promptId: 'resp-journeys', answerId: 'meas-journeys', explanation: 'Automating completion and recovery should cut failed journeys; reduce failed onboarding before claiming a lower acquisition cost.', hint: 'It changes how customers complete tasks.' },
      { id: 'pair-resp-credit', promptId: 'resp-credit', answerId: 'meas-credit', explanation: 'Better underwriting, monitoring and provisioning show up here first: improve early-warning coverage before accelerating target-sector lending.', hint: 'It acts on the quality of lending.' },
      { id: 'pair-resp-capital', promptId: 'resp-capital', answerId: 'meas-capital', explanation: 'Allocating risk-weighted assets and building buffers determines the growth the bank can afford, and growth and distributions compete for capital.', hint: 'It decides how much risk can be carried.' },
    ],
    sourceRefs: [
      ch(L45, 2, S3, ['cb-m04-s03', 'cb-m04-s05', 'cb-m04-s15'], 'Chapter narrative, deep dive \u201cTurn the map into an execution plan\u201d and the rendered strategic response table: each response with its measure of progress.'),
    ],
  },
]);
