// Commercial Banking Module 01, Lessons 1.3 and 1.4 activities (source: commercialBankingM01B2.tsx).
// No ranking, ratio value, date or legal provision is used. Lesson 1.4 Chapter 5 (restriction notice) is not cited.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE01' as const;
const L12 = '1.2 Industry History & Development';
const L13 = '1.3 Global Market Overview';
const L14 = '1.4 Vietnam Market Overview';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const G2 = 'Global Banking Assets, Credit, and Deposits';
const G3 = 'How Global Banks Measure Performance';
const G5 = 'International Banking and Financial Stability';
const V2 = 'Deposits, Lending, and Banking Demand in Vietnam';
const V3 = "Vietnam's Banking Institutions and Regulatory Structure";
const V4 = 'Major Commercial Banks in Vietnam';

export const CB_M01B2_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-01', [
  {
    activityId: 'cb-m01-match-bank-ratios',
    type: 'concept-matching',
    title: 'Five bank ratios and the question each answers',
    learningObjective: 'Match NIM, ROA, ROE, the NPL ratio and CAR to the question each is designed to answer, so no ratio is used as a substitute for another.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Ratio',
    answerLabel: 'Question it answers',
    summary: 'Spread, efficiency, owner return, asset quality and capital resilience are five different questions. Read the ratios together, with matching definitions and periods.',
    items: {
      prompts: [
        { id: 'nim', text: 'NIM' },
        { id: 'roa', text: 'ROA' },
        { id: 'roe', text: 'ROE' },
        { id: 'npl', text: 'NPL ratio' },
        { id: 'car', text: 'CAR' },
      ],
      answers: [
        { id: 'q-spread', text: 'How strong is the core spread economics?' },
        { id: 'q-efficiency', text: 'How efficiently is the balance sheet used to produce profit?' },
        { id: 'q-owner', text: 'What return does owner capital receive?' },
        { id: 'q-impaired', text: 'What is the quality of the loan book?' },
        { id: 'q-buffer', text: 'How much loss-absorbing capacity supports the risk taken?' },
      ],
    },
    pairs: [
      { id: 'pair-nim', promptId: 'nim', answerId: 'q-spread', explanation: 'NIM compares net interest income with the assets that earn it, so it shows how strong core spread economics are. It is not the headline lending rate or a simple loan-deposit spread.', hint: 'Its numerator is interest earned less interest paid; ask what that tells you about lending and funding together.' },
      { id: 'pair-roa', promptId: 'roa', answerId: 'q-efficiency', explanation: 'ROA divides profit by all assets, so it shows how efficiently the whole balance sheet turns into profit.', hint: 'The denominator is the whole balance sheet, not just the owners’ stake.' },
      { id: 'pair-roe', promptId: 'roe', answerId: 'q-owner', explanation: 'ROE divides profit by equity. Because banks fund most assets with liabilities, equity is small and ROE is usually higher than ROA, partly because of leverage.', hint: 'Its denominator is the owners’ stake in the bank.' },
      { id: 'pair-npl', promptId: 'npl', answerId: 'q-impaired', explanation: 'The NPL ratio is the share of gross loans classified as non-performing. It tests asset quality and is not the same as provisions.', hint: 'This one looks only at the loan book and how much of it is not being repaid as agreed.' },
      { id: 'pair-car', promptId: 'car', answerId: 'q-buffer', explanation: 'CAR relates regulatory capital to risk-weighted exposure, so it measures the buffer available to absorb losses.', hint: 'Its denominator weights exposures by risk, and its numerator is the cushion beneath depositors.' },
    ],
    sourceRefs: [
      ch(L13, 2, G3, ['cb-m01-s02', 'cb-m01-s11'], 'Key insight “NIM measures spread economics, ROA balance-sheet efficiency, ROE owner return, NPL asset quality and CAR regulatory loss-absorption capacity”; the “Read the numerator and denominator before the ratio” table; key terms NIM, ROA, ROE, NPL ratio and CAR.'),
    ],
  },
  {
    activityId: 'cb-m01-sort-stock-flow-income',
    type: 'category-sorting',
    title: 'Stock, flow or income?',
    learningObjective: 'Classify banking measures as balance-sheet stocks, flows or income before comparing them, to avoid false growth and profitability conclusions.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Stocks are balances at a date, flows are activity over a period, and income is earned over time from using and servicing balances. Classify the number first.',
    categories: [
      { id: 'stock', label: 'Balance-sheet stock', description: 'A balance measured at a point in time, on either side of the balance sheet.' },
      { id: 'flow', label: 'Flow', description: 'Activity measured over a period.' },
      { id: 'income', label: 'Income', description: 'Revenue earned over a period from using and servicing balances.' },
    ],
    items: [
      { id: 'total-assets', text: 'Total assets', categoryId: 'stock', explanation: 'Total assets add up loans, securities, cash and other items at a reporting date. They measure size, not profit.', hint: 'It is read off the balance sheet on a single date.', misplaced: { income: 'Assets are a balance at a date. Income is what the balance earns over time.' } },
      { id: 'gross-loans', text: 'Gross loans', categoryId: 'stock', explanation: 'Gross loans are credit outstanding before loan-loss provisions, measured at a date.', hint: 'It is the amount still owed to the bank at a reporting date, before any deductions.' },
      { id: 'customer-deposits', text: 'Customer deposits', categoryId: 'stock', explanation: 'Deposits are amounts the bank owes depositors at a date. They are a liability balance and funding, not revenue.', hint: 'It is money owed to customers on a given date.', misplaced: { income: 'Deposits fund the bank but are owed back to customers. Taking one in does not earn revenue.' } },
      { id: 'disbursement', text: 'Loans advanced during the quarter', categoryId: 'flow', explanation: 'New disbursement is activity during a period, so it is a flow even though it adds to the stock of loans.', hint: 'Ask whether this is a balance at a date or something that happened over a period.', misplaced: { stock: 'Outstanding credit is a stock. The loans advanced during a period are the flow that adds to it.' } },
      { id: 'repayments', text: 'Loan repayments received during the quarter', categoryId: 'flow', explanation: 'Repayments are activity over a period. They shrink balances but are not revenue.', hint: 'They reduce what is owed over time, and are measured across a period.', misplaced: { income: 'Repayments return principal and are not revenue. Only the interest and fees earned on the loan are income.' } },
      { id: 'nii', text: 'Net interest income', categoryId: 'income', explanation: 'Net interest income is interest earned less interest paid during a period. It is a revenue line.', hint: 'Earned from using balances across a period, not a balance itself.', misplaced: { stock: 'It is measured across a period and is not a balance at a date.' } },
      { id: 'fee-income', text: 'Fees from servicing customers', categoryId: 'income', explanation: 'Net interest and fee income arise from using and servicing balances over time.', hint: 'Earned across a period by providing services to customers.' },
    ],
    sourceRefs: [
      ch(L13, 1, G2, ['cb-m01-s01', 'cb-m01-s05', 'cb-m01-s06'], '“Stock, flow or income: classify the number first” diagram: total assets, gross loans and customer deposits as stocks, new disbursement and repayments as flows, net interest income and fee income as income.'),
    ],
  },
  {
    activityId: 'cb-m01-match-stability-layers',
    type: 'concept-matching',
    title: 'Layers of international bank resilience',
    learningObjective: 'Match each layer of financial-stability architecture to the failure it is designed to prevent, absorb or contain.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Safeguard',
    answerLabel: 'What it is for',
    summary: 'International financial stability combines supervision, capital, liquidity, systemic buffers and credible resolution, and each addresses a different part of systemic risk.',
    items: {
      prompts: [
        { id: 'supervision', text: 'Supervision and risk control' },
        { id: 'capital', text: 'Capital adequacy' },
        { id: 'liquidity', text: 'Liquidity resilience' },
        { id: 'systemic-buffers', text: 'Extra systemic buffers' },
        { id: 'resolution', text: 'Resolution and resolvability' },
      ],
      answers: [
        { id: 'purpose-prevent', text: 'Identify deterioration before it becomes a failure.' },
        { id: 'purpose-losses', text: 'Absorb losses when assets lose value.' },
        { id: 'purpose-outflows', text: 'Meet withdrawals and stressed outflows of funding.' },
        { id: 'purpose-internalise', text: 'Add resilience requirements for banks whose size and connections would spread their distress.' },
        { id: 'purpose-critical', text: 'Keep critical functions running if a bank does fail.' },
      ],
    },
    pairs: [
      { id: 'pair-supervision', promptId: 'supervision', answerId: 'purpose-prevent', explanation: 'Supervision identifies deterioration early, so problems can be addressed before losses or withdrawals force a response.', hint: 'This layer acts before anything has gone wrong.' },
      { id: 'pair-capital', promptId: 'capital', answerId: 'purpose-losses', explanation: 'Capital absorbs losses, which is a different job from meeting withdrawals.', hint: 'Think of the cushion that takes the hit when assets lose value.' },
      { id: 'pair-liquidity', promptId: 'liquidity', answerId: 'purpose-outflows', explanation: 'Liquidity meets withdrawals: the LCR tests liquid assets against stressed outflows and the NSFR tests whether funding is stable over a year.', hint: 'This layer is about cash being available, not about losses.' },
      { id: 'pair-systemic-buffers', promptId: 'systemic-buffers', answerId: 'purpose-internalise', explanation: 'Systemic importance comes from size, interconnectedness, substitutability, complexity and cross-border activity, so those banks face added capital and resolvability expectations.', hint: 'It applies only to the banks whose failure would spread widely.' },
      { id: 'pair-resolution', promptId: 'resolution', answerId: 'purpose-critical', explanation: 'Higher loss-absorbency and resolution planning aim to keep critical functions operating and allocate losses without disorderly collapse. They do not promise that shareholders or creditors avoid losses.', hint: 'This is the plan for failure rather than a way of preventing it.' },
    ],
    sourceRefs: [
      ch(L13, 4, G5, ['cb-m01-s03', 'cb-m01-s04'], 'Chapter recap “International financial stability combines supervision, capital, liquidity, systemic buffers and credible resolution.”; recap “Capital absorbs losses; liquidity meets withdrawals.”; key insight on systemic importance; how it works on resolution planning; key terms LCR and NSFR.'),
      ch(L12, 1, 'Banking Regulation, Crises, and Financial Stability', ['cb-m01-s02', 'cb-m01-s03'], 'How it works: “supervision identifies deterioration”.'),
    ],
  },
  {
    activityId: 'cb-m01-match-vn-institution-roles',
    type: 'concept-matching',
    title: 'Vietnam’s regulated banking structure',
    learningObjective: 'Match each institution type in Vietnam’s regulated banking structure to its role, so that institutions are classified before their economics are analysed.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Institution',
    answerLabel: 'Role',
    summary: 'Classify the institution before analysing its products or economics: its licence and mandate determine deposit-taking, product scope, funding and regulatory obligations.',
    items: {
      prompts: [
        { id: 'sbv', text: 'State Bank of Vietnam' },
        { id: 'state-owned', text: 'State-owned commercial banks' },
        { id: 'joint-stock', text: 'Joint-stock commercial banks' },
        { id: 'foreign-jv', text: 'Foreign-owned and joint-venture banks' },
        { id: 'policy-coop', text: 'Policy and cooperative institutions' },
        { id: 'non-bank', text: 'Non-bank credit institutions' },
      ],
      answers: [
        { id: 'role-sbv', text: 'Conducts monetary policy, issues licences and supervises; does not serve customers itself.' },
        { id: 'role-state-owned', text: 'Large customer banks in which the government holds control, taking commercial deposits and giving credit.' },
        { id: 'role-joint-stock', text: 'Customer banks owned through shares, taking commercial deposits and giving credit.' },
        { id: 'role-foreign-jv', text: 'Locally licensed banks that are wholly overseas-owned or owned jointly by domestic and overseas partners.' },
        { id: 'role-policy-coop', text: 'Lend to a public mandate or support member finance rather than optimise commercially.' },
        { id: 'role-non-bank', text: 'Finance and leasing companies that lend without the full permissions of a commercial bank.' },
      ],
    },
    pairs: [
      { id: 'pair-sbv', promptId: 'sbv', answerId: 'role-sbv', explanation: 'The SBV sits above customer banking: it sets policy, issues licences and supervises, and does not compete for customers.', hint: 'Which role sits above customer banking rather than inside it?' },
      { id: 'pair-state-owned', promptId: 'state-owned', answerId: 'role-state-owned', explanation: 'State ownership or control shapes mandate and franchise, but it does not by itself determine performance.', hint: 'Its defining feature is who owns or controls it.' },
      { id: 'pair-joint-stock', promptId: 'joint-stock', answerId: 'role-joint-stock', explanation: 'A joint-stock bank is a commercial bank owned through shares. Joint-stock leaders often compete on digital capability, segment focus and fees.', hint: 'Think about what the word “stock” says about how this bank is owned.' },
      { id: 'pair-foreign-jv', promptId: 'foreign-jv', answerId: 'role-foreign-jv', explanation: 'The official taxonomy includes wholly foreign-owned banks and joint-venture banks owned jointly by domestic and foreign partners, both licensed locally.', hint: 'Think about where the owners of these banks come from.' },
      { id: 'pair-policy-coop', promptId: 'policy-coop', answerId: 'role-policy-coop', explanation: 'Policy banks lend to a public-policy mandate and cooperative institutions support member finance, so neither optimises like an ordinary commercial bank.', hint: 'Think about whom these institutions exist to serve, if not shareholders seeking profit.' },
      { id: 'pair-non-bank', promptId: 'non-bank', answerId: 'role-non-bank', explanation: 'Finance and leasing companies lend without the full permissions of a commercial bank, so their funding and regulation differ.', hint: 'The name of this group tells you which licence it does not hold.' },
    ],
    sourceRefs: [
      ch(L14, 2, V3, ['cb-m01-s07', 'cb-m01-s08'], '“One supervisor, four bank ownership types, several specialised lenders” diagram: the SBV, the four commercial-bank categories, policy banks, cooperative institutions and non-bank credit institutions; key terms SBV, policy bank, joint-venture bank and non-bank credit institution.'),
      ch(L14, 3, V4, ['cb-m01-s08'], 'Key terms “State-controlled bank” and “Joint-stock bank”.'),
    ],
  },
  {
    activityId: 'cb-m01-match-demand-drivers',
    type: 'concept-matching',
    title: 'What moves banking demand and supply in Vietnam',
    learningObjective: 'Connect each driver of Vietnamese banking demand to what it changes, separating what raises demand from what limits approved supply.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Driver',
    answerLabel: 'What it changes',
    summary: 'Rising demand is not the same as safe lending. Growth and inclusion lift demand; affordability, SBV credit room and borrower quality decide how much of it becomes approved lending.',
    items: {
      prompts: [
        { id: 'growth', text: 'Economic growth' },
        { id: 'inclusion', text: 'Financial inclusion' },
        { id: 'rates', text: 'Interest rates' },
        { id: 'credit-room', text: 'SBV credit room' },
        { id: 'asset-quality', text: 'Borrower quality' },
      ],
      answers: [
        { id: 'effect-demand', text: 'Supports transaction and credit demand from households and businesses.' },
        { id: 'effect-retail', text: 'Widens the addressable customer base for accounts, savings and retail products.' },
        { id: 'effect-mix', text: 'Changes borrowers’ affordability and the competition for deposits.' },
        { id: 'effect-ceiling', text: 'Caps how much approved lending can grow, whatever demand is.' },
        { id: 'effect-appetite', text: 'Sets risk appetite through expected repayment, and so approval and price.' },
      ],
    },
    pairs: [
      { id: 'pair-growth', promptId: 'growth', answerId: 'effect-demand', explanation: 'GDP and income growth support demand for transactions and credit, but demand is not the same as prudent lending.', hint: 'This driver expands what customers want from banks.' },
      { id: 'pair-inclusion', promptId: 'inclusion', answerId: 'effect-retail', explanation: 'As more adults hold and use accounts, the addressable customer base widens, particularly for retail products.', hint: 'This driver adds new customers rather than more activity from existing ones.' },
      { id: 'pair-rates', promptId: 'rates', answerId: 'effect-mix', explanation: 'Rates change what savers earn and whether borrowers can afford repayments, so they move both funding and lending.', hint: 'It works through price: what depositors earn and what borrowers pay.' },
      { id: 'pair-credit-room', promptId: 'credit-room', answerId: 'effect-ceiling', explanation: 'Credit room is an SBV-administered limit on how quickly an individual bank may grow credit, so it limits supply even when demand is strong.', hint: 'Which driver is set by the regulator rather than by customers or the economy?' },
      { id: 'pair-asset-quality', promptId: 'asset-quality', answerId: 'effect-appetite', explanation: 'Expected repayment determines how much risk a bank will take and what it charges, so borrower quality filters demand into approvals.', hint: 'Banks look at whether loans will be repaid before approving and pricing them.' },
    ],
    sourceRefs: [
      ch(L14, 1, V2, ['cb-m01-s06', 'cb-m01-s09', 'cb-m01-s12'], '“Why rising demand is not the same as safe lending” flow: growing activity and customer demand pass through affordability, SBV credit room and the bank’s risk pricing; key insight on growth, inclusion and borrower quality; recap “Payment-account reach expands the addressable customer base.”'),
    ],
  },
  {
    activityId: 'cb-m01-sort-bank-archetypes-v2',
    type: 'category-sorting',
    title: 'State-controlled or joint-stock leaders?',
    learningObjective: 'Distinguish the examples, typical advantages and assumptions to avoid for state-controlled and joint-stock banks.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Ownership is context, not proof of performance. Explain the business model behind each bank, then test the evidence with like-for-like measures.',
    categories: [
      { id: 'state', label: 'State-controlled leaders', description: 'Large banks in which the state has controlling ownership or influence.' },
      { id: 'joint-stock', label: 'Joint-stock leaders', description: 'Commercial banks owned through shares.' },
    ],
    items: [
      { id: 'example-state', text: 'Examples: Agribank, BIDV, VietinBank and Vietcombank', categoryId: 'state', explanation: 'The state-controlled group includes Agribank, BIDV, VietinBank and Vietcombank.', hint: 'Think of the group the lesson calls the Big 4.' },
      { id: 'example-joint-stock', text: 'Examples: Techcombank, MB, VPBank and ACB', categoryId: 'joint-stock', explanation: 'Major joint-stock names include Techcombank, MB, VPBank and ACB.', hint: 'Think of the challengers that often compete on digital experience and fee ecosystems.' },
      { id: 'strength-scale', text: 'Typical advantage: scale, distribution, institutional funding and public-policy roles', categoryId: 'state', explanation: 'State-controlled banks often benefit from scale, distribution and institutional funding, and they carry public-policy roles.', hint: 'Which group leans on size and established networks?', misplaced: { 'joint-stock': 'Joint-stock leaders more often compete through digital experience, segment focus and fee ecosystems than on inherited scale.' } },
      { id: 'strength-digital', text: 'Typical advantage: digital, retail, SME, ecosystem or fee capabilities', categoryId: 'joint-stock', explanation: 'Joint-stock competitors may differentiate through digital, retail, SME, ecosystem or fee capabilities.', hint: 'Which group typically competes on speed and capability rather than inherited scale?' },
      { id: 'avoid-ownership', text: 'Assumption to avoid: that public ownership guarantees performance', categoryId: 'state', explanation: 'Ownership is context. A bank must still show actual evidence of efficiency, capital strength and asset quality.', hint: 'Which group’s ownership could tempt an analyst to assume strength without evidence?' },
      { id: 'avoid-growth', text: 'Assumption to avoid: that digital growth guarantees profitability', categoryId: 'joint-stock', explanation: 'Customer and fee growth can coexist with weak margins or credit problems, so profitability must be evidenced.', hint: 'Which group’s growth story could tempt an analyst to assume profit without evidence?' },
    ],
    sourceRefs: [
      ch(L14, 3, V4, ['cb-m01-s08', 'cb-m01-s11'], '“Scale and mandate versus speed and segment focus” comparison: examples, typical advantages and what not to assume for each group; recap “Ownership is context, not proof of performance.”'),
    ],
  },
]);
