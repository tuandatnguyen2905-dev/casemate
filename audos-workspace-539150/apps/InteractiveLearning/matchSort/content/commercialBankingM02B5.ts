// Commercial Banking Module 02, Lessons 2.4 to 2.6 activities (source: commercialBankingM02B5.tsx).
// No figures, rates, company results or hypothetical calculations. Lesson 2.6 Chapter 3 (restriction notice)
// is used only for definitions of liquidity stress, insolvency and supervisory terms, never for outcomes.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SEQUENCE_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE02' as const;
const L24 = '2.4 Downstream Activities';
const L25 = '2.5 Inputs, Outputs & Value Creation';
const L26 = '2.6 Global vs. Local Value Chain';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const D1 = 'How Banks Deliver Financial Services';
const D2 = 'Retail, SME, and Corporate Banking Relationships';
const E1 = 'Understanding Banking Inputs and Outputs';
const E2 = 'How Banks Generate Net Interest Income and NIM';
const E3 = 'How Costs and Credit Risks Affect Profitability';
const F1 = 'How Global Commercial Banking Operations Work';
const F2 = "Vietnam's Commercial Banking Value Chain";
const F3 = 'Banking Regulation, Risk, and Financial Stability';

export const CB_M02B5_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-02', [
  {
    activityId: 'cb-m02-match-channel-roles',
    type: 'concept-matching',
    title: 'Which channel is best for what?',
    learningObjective: 'Match each service channel to the customer need it serves best, so channel choice follows customer complexity inside one controlled relationship.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Channel',
    answerLabel: 'Best suited to',
    summary: 'Digital channels handle frequency and routine tasks, while human channels remain valuable for complexity and trust. Reliability and controls must stay consistent across all of them.',
    items: {
      prompts: [
        { id: 'mobile-internet', text: 'Mobile and internet' },
        { id: 'branch', text: 'Branch' },
        { id: 'rm', text: 'Relationship manager' },
        { id: 'contact-centre', text: 'Contact centre' },
      ],
      answers: [
        { id: 'best-digital', text: 'Payments, balance checks and simple tasks that happen often.' },
        { id: 'best-branch', text: 'Cash services and assisted onboarding where trust and accessibility matter.' },
        { id: 'best-rm', text: 'Coordinating SME and corporate needs across several products.' },
        { id: 'best-contact', text: 'Support, complaints and service recovery from a distance.' },
      ],
    },
    pairs: [
      { id: 'pair-digital', promptId: 'mobile-internet', answerId: 'best-digital', explanation: 'Frequent, routine activity moves to lower-cost digital channels, which suit convenience and repeated use.', hint: 'Which channel is used most often, for the simplest tasks?' },
      { id: 'pair-branch', promptId: 'branch', answerId: 'best-branch', explanation: 'Branches remain important for cash and assisted onboarding, and for customers who need an accessible place to get help.', hint: 'Which channel is a physical place where customers can get face-to-face help?' },
      { id: 'pair-rm', promptId: 'rm', answerId: 'best-rm', explanation: 'Business clients with complex needs are served by a person who coordinates specialists across products.', hint: 'Which channel is a named person for business clients?' },
      { id: 'pair-contact', promptId: 'contact-centre', answerId: 'best-contact', explanation: 'When something goes wrong, customers need support that resolves the failure and restores their confidence.', hint: 'Which channel is for help when something has gone wrong, without visiting anywhere?' },
    ],
    sourceRefs: [
      ch(L24, 0, D1, ['cb-m02-s16', 'cb-m02-s18'], '“Which door a customer need should come through” visual and the ‘How it works’ narrative: routine tasks go digital, complex needs go to people.'),
    ],
  },
  {
    activityId: 'cb-m02-sort-segment-relationships-v2',
    type: 'category-sorting',
    title: 'Which relationship model?',
    learningObjective: 'Distinguish retail, SME and corporate relationships by the needs they have and the economic and risk focus each requires.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Each segment needs a different balance of standardisation, advice and risk judgement. Relationship depth creates value only when products are useful, suitable and profitable after risk.',
    categories: [
      { id: 'retail', label: 'Retail', description: 'Individuals and households.' },
      { id: 'sme', label: 'SME', description: 'Small and medium-sized enterprises.' },
      { id: 'corporate', label: 'Corporate', description: 'Large organisations.' },
    ],
    items: [
      { id: 'standard-at-scale', text: 'High-volume personal needs served through standardised products', categoryId: 'retail', explanation: 'Retail relationships focus on high-volume personal needs, which suit standard products.', hint: 'Which customers are served in very large numbers with similar products?' },
      { id: 'activation-fraud', text: 'Watch activation, affordability and suitable cross-sell', categoryId: 'retail', explanation: 'With very many small relationships, the bank watches whether accounts become active, whether credit is affordable and whether extra products are suitable.', hint: 'Think of the watch-points when the customer base runs into millions.', misplaced: { sme: 'Owner dependence is the SME watch-point. This list is about activity, affordability and suitability across a very large customer base.' } },
      { id: 'working-capital-support', text: 'Owner and business cash flow managed together', categoryId: 'sme', explanation: 'SME relationships combine the owner’s and the business’s cash flow, so the bank serves and assesses both.', hint: 'Whose personal and business finances are hard to separate?' },
      { id: 'cash-flow-owner', text: 'Watch cash-flow visibility and owner dependence', categoryId: 'sme', explanation: 'Smaller businesses may report less formally and rely on their owner, so the bank looks hard at cash flow and at how much depends on one person.', hint: 'Which customers depend heavily on one owner and may report less formally?', misplaced: { corporate: 'Corporate watch-points are wallet share, concentration and covenants. Owner dependence points to a smaller business.' } },
      { id: 'bespoke-services', text: 'Complex facilities, cash management and transaction services', categoryId: 'corporate', explanation: 'Large organisations need coordinated facilities and transaction services, often across several legal entities.', hint: 'Which customers need a combination of facilities and services across several entities?' },
      { id: 'wallet-covenants', text: 'Watch wallet share, concentration and covenants', categoryId: 'corporate', explanation: 'Large relationships are judged on how much of the customer’s business the bank holds, how concentrated the exposure is and the covenants that protect it.', hint: 'Which customers bring large single exposures that need contractual conditions?', misplaced: { sme: 'Wallet share and covenants belong to larger, bespoke relationships.' } },
    ],
    sourceRefs: [
      ch(L24, 1, D2, ['cb-m02-s09'], '“Same bank, three different relationship economics” table and the ‘What it is’ narrative: what each segment needs and what the bank must watch.'),
    ],
  },
  {
    activityId: 'cb-m02-sort-input-families',
    type: 'category-sorting',
    title: 'Banking inputs and outputs',
    learningObjective: 'Classify what a bank uses and produces into financial, operational and information inputs and outputs, without treating balances as revenue.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Banking transforms financial, operational and informational inputs into services and risk-adjusted returns. Value exists only after funding, operating, credit and capital costs are recognised.',
    categories: [
      { id: 'financial', label: 'Financial inputs', description: 'Resources the bank owes back or that absorb its losses.' },
      { id: 'operational', label: 'Operational inputs', description: 'What the bank uses to execute decisions and deliver service.' },
      { id: 'information', label: 'Information inputs', description: 'What the bank knows, used to identify, decide, monitor and control.' },
      { id: 'outputs', label: 'Outputs', description: 'What the bank provides to customers.' },
    ],
    items: [
      { id: 'customer-deposits', text: 'Customer deposits', categoryId: 'financial', explanation: 'Deposits are funding the bank owes back. They are an input, not sales.', hint: 'It is money the bank holds and owes back to customers.', misplaced: { outputs: 'A deposit is something the bank takes in and must repay, so it is a resource rather than a product sold.' } },
      { id: 'wholesale-funding', text: 'Wholesale funding', categoryId: 'financial', explanation: 'Borrowing from institutions or markets is another financial input that supports assets.', hint: 'It is borrowed from institutions rather than from ordinary customers.' },
      { id: 'equity-capital', text: 'Equity capital', categoryId: 'financial', explanation: 'Capital is funding that also provides loss-absorption capacity.', hint: 'It comes from owners and absorbs losses.' },
      { id: 'people-processes', text: 'People and processes', categoryId: 'operational', explanation: 'Staff and processes provide the execution and service capacity that turns decisions into delivery.', hint: 'It is what carries out the work day to day.' },
      { id: 'technology-platforms', text: 'Technology platforms and distribution channels', categoryId: 'operational', explanation: 'Systems and channels deliver service at scale and connect every channel to the same records and controls.', hint: 'It is the infrastructure through which service is delivered.' },
      { id: 'kyc-identity', text: 'KYC identity checks on a new customer', categoryId: 'information', explanation: 'Identity data supports decision and control quality, so it is an input rather than cash.', hint: 'It is knowledge about who the customer is.' },
      { id: 'credit-financial-data', text: 'A borrower’s credit history and financial statements', categoryId: 'information', explanation: 'Financial and credit data is used to decide and monitor risk, improving decision quality.', hint: 'It is evidence used to judge a borrower’s ability to repay.' },
      { id: 'transaction-data', text: 'Records of what customers pay and receive', categoryId: 'information', explanation: 'Transaction signals show behaviour and help control risk and personalise service.', hint: 'It is a record of what the customer actually does.', misplaced: { outputs: 'Providing payments is an output. The record of those payments is information the bank uses to monitor risk and serve the customer.' } },
      { id: 'loans', text: 'Loans', categoryId: 'outputs', explanation: 'Credit is one of the main things a bank produces. It is also an asset and a risk exposure, not profit.', hint: 'It is something the bank provides to borrowers.', misplaced: { financial: 'A loan is where the bank deploys funding, so it is a product, not a resource it uses.' } },
      { id: 'payments-accounts', text: 'Payments and accounts', categoryId: 'outputs', explanation: 'Accounts and payment services are core outputs through which customers transact.', hint: 'It is what customers use to move and hold money.' },
      { id: 'trade-treasury', text: 'Trade and treasury solutions', categoryId: 'outputs', explanation: 'Trade and treasury solutions broaden outputs beyond credit and payments.', hint: 'It is a specialist service sold to business clients.' },
    ],
    sourceRefs: [
      ch(L25, 0, E1, ['cb-m02-s02', 'cb-m02-s03', 'cb-m02-s16'], '“Deposits are owed back and loans are not profit” visual and key terms financial, operational and information input.'),
    ],
  },
  {
    activityId: 'cb-m02-seq-profit-waterfall-v2',
    type: 'sequence-builder',
    title: 'The bank profitability waterfall',
    learningObjective: 'Order the steps from operating income down to net profit and its return ratios, and explain which metric each step feeds.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Profitability is a waterfall: volume sits at the top while costs and losses determine what survives. ROA and ROE then scale the result against assets and equity.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter’s waterfall presents the calculation in a fixed order: net interest income and non-interest income combine into total operating income, operating expense is subtracted (giving pre-provision operating profit), provisions are subtracted, tax leads to net profit, and ROA and ROE then scale that result. Each step works on the result of the one before.',
    items: [
      { id: 'operating-income', text: 'Total operating income: net interest income plus non-interest income such as fees', explanation: 'The waterfall begins with what the bank earns: the net spread on its balance sheet together with fee and service income.', hint: 'Every later line is taken off this figure.' },
      { id: 'subtract-opex', text: 'Subtract operating expense: the cost of running the bank and serving customers', explanation: 'Costs are deducted from operating income, which is what the cost-to-income ratio describes. What remains is pre-provision operating profit.', hint: 'It can be taken off only once income has been built.' },
      { id: 'subtract-provisions', text: 'Subtract provisions: the credit-cost charge', explanation: 'Credit risk reaches profit through provision expense, which Cost of Risk describes.', hint: 'Analysts compare profit before this line with the charge itself to separate operations from the credit cycle.' },
      { id: 'tax-net-profit', text: 'Deduct tax to reach net profit', explanation: 'Net profit is what remains after operating, credit and tax costs.', hint: 'It is applied to what remains after the operating and credit deductions.' },
      { id: 'scale-roa-roe', text: 'Scale net profit against assets and equity as ROA and ROE', explanation: 'ROA and ROE can only be calculated once net profit is known, and they must be read with leverage and capital.', hint: 'These ratios need the bottom-line figure first.' },
    ],
    correctSequence: ['operating-income', 'subtract-opex', 'subtract-provisions', 'tax-net-profit', 'scale-roa-roe'],
    sourceRefs: [
      ch(L25, 2, E3, ['cb-m02-s07', 'cb-m02-s17'], '“What survives between operating income and net profit” visual and the ‘What it is’ and ‘How it works’ narrative: operating income, then opex, provisions and tax to net profit, scaled by ROA and ROE.'),
    ],
  },
  {
    activityId: 'cb-m02-match-profit-metrics',
    type: 'concept-matching',
    title: 'Profit metrics and what each measures',
    learningObjective: 'Define NII, NIM, cost-to-income ratio, Cost of Risk, pre-provision operating profit and capital efficiency, so each is read for the question it answers.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Metric',
    answerLabel: 'What it measures',
    summary: 'NII and fees are not net profit. Efficiency, credit cost and capital use each explain what survives of revenue, and each is a separate measure.',
    items: {
      prompts: [
        { id: 'nii-metric', text: 'NII' },
        { id: 'nim-metric', text: 'NIM' },
        { id: 'cir-metric', text: 'Cost-to-income ratio' },
        { id: 'cost-of-risk-metric', text: 'Cost of Risk' },
        { id: 'ppop-metric', text: 'Pre-provision operating profit' },
        { id: 'capital-efficiency', text: 'Capital efficiency' },
      ],
      answers: [
        { id: 'what-nii', text: 'Interest income minus interest expense.' },
        { id: 'what-nim', text: 'NII divided by average interest-earning assets, annualised when appropriate.' },
        { id: 'what-cir', text: 'Operating expense divided by total operating income.' },
        { id: 'what-cost-of-risk', text: 'Credit cost or provision expense relative to average loans.' },
        { id: 'what-ppop', text: 'Operating income less operating expense, before credit provisions.' },
        { id: 'what-capital-efficiency', text: 'Return generated relative to the capital required to support risk.' },
      ],
    },
    pairs: [
      { id: 'pair-nii', promptId: 'nii-metric', answerId: 'what-nii', explanation: 'NII nets what the bank earns on assets against what it pays for funding.', hint: 'It is a difference between two interest figures.' },
      { id: 'pair-nim', promptId: 'nim-metric', answerId: 'what-nim', explanation: 'NIM scales NII by the average earning-asset base, so it is not the same as the quoted loan-deposit spread.', hint: 'It expresses the net interest figure as a proportion of the assets that earn it.' },
      { id: 'pair-cir', promptId: 'cir-metric', answerId: 'what-cir', explanation: 'It shows operating efficiency: how much of each unit of income is spent on running the bank.', hint: 'It compares running costs with income.' },
      { id: 'pair-cost-of-risk', promptId: 'cost-of-risk-metric', answerId: 'what-cost-of-risk', explanation: 'It transmits credit risk into profit by relating loss charges to the size of the loan book.', hint: 'It expresses credit loss charges against the size of the book.' },
      { id: 'pair-ppop', promptId: 'ppop-metric', answerId: 'what-ppop', explanation: 'Analysts use it to separate operating performance from the credit cycle.', hint: 'It is measured before the credit-loss charge is taken.' },
      { id: 'pair-capital-efficiency', promptId: 'capital-efficiency', answerId: 'what-capital-efficiency', explanation: 'A bank can earn profit while consuming far more capital than the return justifies, so profit is judged against the capital used.', hint: 'It judges return against the resources needed to carry the risk.' },
    ],
    sourceRefs: [
      ch(L25, 2, E3, ['cb-m02-s07', 'cb-m02-s17'], 'Key terms CIR, Cost of Risk, pre-provision operating profit and capital efficiency.'),
      ch(L25, 1, E2, ['cb-m02-s09', 'cb-m02-s17'], 'Key terms NII and NIM.'),
    ],
  },
  {
    activityId: 'cb-m02-sort-global-vs-vietnam-v2',
    type: 'category-sorting',
    title: 'Developed-market tendency or Vietnam pattern?',
    learningObjective: 'Compare how system financing, growth limits, funding competition, distribution and risk agenda differ between a global reference model and Vietnam, to localise a banking recommendation.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'The banking value chain is universal, but the operating constraints are local. Keep the universal logic, then replace assumptions with verified Vietnam-specific constraints.',
    categories: [
      { id: 'developed', label: 'Developed-market tendency', description: 'The typical pattern in developed systems with mature regimes.' },
      { id: 'vietnam', label: 'Vietnam pattern', description: 'The pattern the lesson describes for Vietnam.' },
    ],
    items: [
      { id: 'capital-market-alternatives', text: 'Greater reliance on fee and capital-markets income', categoryId: 'developed', explanation: 'Developed systems generally rely more on fee and capital-markets income alongside commercial banking.', hint: 'Which system has other major routes to finance and income besides bank lending?' },
      { id: 'bank-dominated', text: 'Bank-dominated system financing', categoryId: 'vietnam', explanation: 'Deposits fund a bank-dominated system, so bank health matters throughout the economy.', hint: 'In which system do banks carry most of the financing?' },
      { id: 'normal-constraints', text: 'Lending growth set only by demand, capital, liquidity and risk appetite, with no bank-specific credit quota', categoryId: 'developed', explanation: 'These are the universal constraints on a bank’s growth, without an administered quota.', hint: 'The usual limits on growth, and nothing more.', misplaced: { vietnam: 'Vietnam has these constraints too, but adds a bank-specific credit-room limit, which this item rules out.' } },
      { id: 'credit-room', text: 'SBV credit room limits each bank’s lending growth on top of the usual constraints', categoryId: 'vietnam', explanation: 'Credit room is an administered limit on how quickly an individual bank may grow credit.', hint: 'A regulator-assigned growth limit is added to the usual ones.' },
      { id: 'broad-market-funding', text: 'Deposits plus broad market funding', categoryId: 'developed', explanation: 'Developed systems offer banks wider market funding alongside deposits.', hint: 'Funding comes from many sources beyond the deposit franchise.' },
      { id: 'casa-franchise', text: 'Intense competition for low-cost CASA deposits', categoryId: 'vietnam', explanation: 'Intense competition for low-cost current and savings balances makes the deposit franchise a decisive competitive lever.', hint: 'Winning cheap everyday balances decides who competes best.' },
      { id: 'branch-rationalisation', text: 'Digital channels that are already mature', categoryId: 'developed', explanation: 'In developed markets digital channels are already mature rather than still being adopted rapidly.', hint: 'Digital is already established rather than growing fast.', misplaced: { vietnam: 'Vietnam combines rapid digital adoption with branches and relationship managers that still serve complex needs.' } },
      { id: 'mobile-qr-and-branches', text: 'Rapid mobile or QR adoption alongside branches and relationship managers', categoryId: 'vietnam', explanation: 'Mobile and QR dominate routine access while branches and relationship managers remain important for complexity.', hint: 'Fast digital growth that sits next to a continuing human network.' },
      { id: 'efficiency-conduct', text: 'Risk managed within mature Basel III regimes', categoryId: 'developed', explanation: 'Developed systems generally operate under mature Basel III regimes.', hint: 'A risk framework that is already fully established.' },
      { id: 'asset-quality-capital', text: 'Property, bond and borrower risks under a still-maturing capital and bad-debt framework', categoryId: 'vietnam', explanation: 'Asset quality and capital remain binding risks while the capital and bad-debt framework is still maturing.', hint: 'A risk agenda still centred on loan quality and building capital.' },
    ],
    sourceRefs: [
      ch(L26, 1, F2, ['cb-m02-s01', 'cb-m02-s04', 'cb-m02-s18'], '“Same chain, local playbook: what changes in Vietnam” comparison and key insight: system financing, growth constraint, funding competition, distribution and risk agenda.'),
    ],
  },
  {
    activityId: 'cb-m02-match-global-operating-model',
    type: 'concept-matching',
    title: 'How a global bank operates through local entities',
    learningObjective: 'Match each block of the global bank operating model to what it coordinates, and recognise that scale operates through local regulated balance sheets.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Operating-model block',
    answerLabel: 'What it coordinates',
    summary: 'Global scale operates through local regulated balance sheets, not above them. Shared networks create reach, while local licences, capital and liquidity rules still bind each entity.',
    items: {
      prompts: [
        { id: 'local-franchises', text: 'Local customer franchises' },
        { id: 'transaction-network', text: 'Global transaction network' },
        { id: 'group-treasury', text: 'Group treasury' },
        { id: 'risk-compliance-group', text: 'Risk and compliance' },
        { id: 'shared-technology', text: 'Shared technology and operations' },
      ],
      answers: [
        { id: 'coord-franchises', text: 'Deposits, lending and service inside each market, under the local licence and conduct rules.' },
        { id: 'coord-network', text: 'Payments, trade, cash and correspondent banking for cross-border clients.' },
        { id: 'coord-treasury', text: 'Funding, liquidity, capital and market risks across the group.' },
        { id: 'coord-risk', text: 'Group standards combined with local rules, for consistent control.' },
        { id: 'coord-technology', text: 'Common platforms, data and processing used across entities.' },
      ],
    },
    pairs: [
      { id: 'pair-franchises', promptId: 'local-franchises', answerId: 'coord-franchises', explanation: 'Each market has its own licensed business, with deposits, lending and service governed by local rules.', hint: 'It is the part of the bank that actually faces customers in each country.' },
      { id: 'pair-network', promptId: 'transaction-network', answerId: 'coord-network', explanation: 'Cross-border clients are served through payments, trade finance, cash services and correspondent relationships.', hint: 'It links the group to clients who operate across borders.' },
      { id: 'pair-treasury', promptId: 'group-treasury', answerId: 'coord-treasury', explanation: 'Group treasury coordinates balance-sheet resources, though local supervisors can limit where they may move.', hint: 'It manages the group’s scarce resources.' },
      { id: 'pair-risk-group', promptId: 'risk-compliance-group', answerId: 'coord-risk', explanation: 'The group sets common standards while each entity also follows the rules of the place it operates.', hint: 'Two layers of rules apply here, not one.' },
      { id: 'pair-technology', promptId: 'shared-technology', answerId: 'coord-technology', explanation: 'Shared systems create scale across the group, but add data and operational dependencies across borders.', hint: 'It is the common back-office that many entities run on.' },
    ],
    sourceRefs: [
      ch(L26, 0, F1, ['cb-m02-s02', 'cb-m02-s03', 'cb-m02-s16'], '“One brand, many regulated balance sheets” visual and the ‘What it is’ and ‘How it works’ narrative: what the group shares and what each local entity keeps.'),
    ],
  },
  {
    activityId: 'cb-m02-match-stress-terms',
    type: 'concept-matching',
    title: 'Stress, failure and supervisory terms',
    learningObjective: 'Define liquidity stress, insolvency, early intervention, special control and resolution, and keep prevention, intervention and failure handling distinct.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Term',
    answerLabel: 'Definition',
    summary: 'Liquidity stress and insolvency need different diagnoses, and prevention, intervention and resolution are different stages. The terms do not by themselves say who bears losses.',
    items: {
      prompts: [
        { id: 'liquidity-stress', text: 'Liquidity stress' },
        { id: 'insolvency', text: 'Insolvency' },
        { id: 'early-intervention', text: 'Early intervention' },
        { id: 'special-control', text: 'Special control' },
        { id: 'resolution-term', text: 'Resolution' },
      ],
      answers: [
        { id: 'def-liquidity-stress', text: 'Difficulty meeting obligations when due despite possible long-term asset value.' },
        { id: 'def-insolvency', text: 'A condition in which losses overwhelm capital or liabilities exceed asset value.' },
        { id: 'def-early-intervention', text: 'Supervisory action taken before an institution reaches failure.' },
        { id: 'def-special-control', text: 'Enhanced SBV control over a weak credit institution under the domestic legal framework.' },
        { id: 'def-resolution', text: 'A lawful process for handling failure while preserving critical functions.' },
      ],
    },
    pairs: [
      { id: 'pair-liquidity-stress', promptId: 'liquidity-stress', answerId: 'def-liquidity-stress', explanation: 'A bank can be sound yet unable to pay on time, for example in a run. A solvent bank in this position may need temporary liquidity.', hint: 'The assets may be worth enough over time, but cash is short now.' },
      { id: 'pair-insolvency', promptId: 'insolvency', answerId: 'def-insolvency', explanation: 'Here losses exceed capital, so more liquidity does not repair the problem. Loss recognition and restructuring or resolution are needed.', hint: 'This is about losses larger than the buffer, not about timing.' },
      { id: 'pair-early-intervention', promptId: 'early-intervention', answerId: 'def-early-intervention', explanation: 'Authorities act while an institution is weak but not yet failed, to prevent deterioration.', hint: 'Think about timing: is the institution weak but still operating, or has it already failed?' },
      { id: 'pair-special-control', promptId: 'special-control', answerId: 'def-special-control', explanation: 'It is a domestic mechanism for weak credit institutions. It does not by itself say who bears losses.', hint: 'It is a mechanism of Vietnam’s own legal framework, not a Basel standard.' },
      { id: 'pair-resolution', promptId: 'resolution-term', answerId: 'def-resolution', explanation: 'Resolution handles failure while keeping critical functions running. It is not a guarantee for every stakeholder.', hint: 'Which term applies once failure itself has to be handled?' },
    ],
    sourceRefs: [
      ch(L26, 2, F3, ['cb-m02-s02', 'cb-m02-s06', 'cb-m02-s07', 'cb-m02-s08'], 'Key terms early intervention, special control, liquidity stress, insolvency and resolution. No outcome for depositors, creditors or shareholders is stated.'),
    ],
  },
]);
