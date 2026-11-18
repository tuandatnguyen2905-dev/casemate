// Commercial Banking Module 03, Lessons 3.4 to 3.6 activities (source: commercialBankingM03B02.tsx).
// No figures, hypothetical calculations, company results or deposit-insurance amounts and dates.
// Restricted detail (same-period bank comparison data, Law 96/2025, deposit-insurance scope) is not used.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SEQUENCE_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE03' as const;
const L34 = '3.4 Revenue Streams & Cost Structure';
const L35 = '3.5 Distribution & Sales Channels';
const L36 = '3.6 Industry Ecosystem & Stakeholders';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const D1 = 'Revenue architecture and NIM';
const D2 = 'Costs, credit losses and actual profitability';
const D3 = 'Read the statements, then compare the bank';
const E1 = 'How banks reach customers';
const E3 = 'Channel economics and relationship value';
const F1 = 'Map the banking ecosystem';

export const CB_M03B02_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-03', [
  {
    activityId: 'cb-m03-seq-nim-calculation',
    type: 'sequence-builder',
    title: 'Calculating NIM, step by step',
    learningObjective: 'Order the steps for calculating NII and NIM correctly, using average earning assets as the denominator.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Compute NII first, use average earning assets second, and divide. NIM is not a loan-deposit rate gap, a net profit margin or a ratio to deposits, total assets or equity.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter lays the calculation out as four numbered steps: total interest income, subtract interest expense to get NII, calculate average interest-earning assets, and then divide NII by that average, annualising if the period requires it. NII needs total interest income first, and the final division needs both NII and the average.',
    items: [
      { id: 'sum-interest-income', text: 'Total the interest income from loans, securities and other earning assets', explanation: 'The calculation starts from what the earning assets produced.', hint: 'It is the first number needed, before anything is deducted.' },
      { id: 'subtract-expense', text: 'Subtract interest expense to reach net interest income', explanation: 'Funding cost is deducted from income to give NII.', hint: 'It needs the first figure to subtract from.' },
      { id: 'average-assets', text: 'Work out average interest-earning assets from opening and closing balances', explanation: 'The denominator is an average of earning assets over the period, not a single date, deposits or total assets.', hint: 'It prepares the denominator once the numerator is known.' },
      { id: 'divide-annualise', text: 'Divide NII by the average, annualising if the period requires it', explanation: 'Only now can the ratio be formed and made comparable with a full-year figure.', hint: 'It combines the two earlier results.' },
    ],
    correctSequence: ['sum-interest-income', 'subtract-expense', 'average-assets', 'divide-annualise'],
    sourceRefs: [
      ch(L34, 0, D1, ['cb-m03-s02', 'cb-m03-s08', 'cb-m03-s15'], '“How” statement: Step 1 total interest income, Step 2 subtract interest expense, Step 3 average interest-earning assets, Step 4 NIM = NII over average earning assets, annualised when required.'),
    ],
  },
  {
    activityId: 'cb-m03-seq-profit-waterfall',
    type: 'sequence-builder',
    title: 'From net interest income to ROA and ROE',
    learningObjective: 'Order the lines of a bank income chain from net interest income to net profit and the return ratios that scale it.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Profitability is what survives the full waterfall, not the height of the first line. Funding, operating cost and credit cost decide actual profit, and capital decides the return on it.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter states the income chain in order: net interest income plus non-interest income gives total operating income, minus operating expense gives pre-provision operating profit, minus provision expense gives profit before tax, minus tax gives net profit, and then ROA and ROE compare that profit with assets and equity.',
    items: [
      { id: 'wf-nii', text: 'Net interest income: interest income less interest expense', explanation: 'The chain starts with the spread engine after funding cost.', hint: 'It is the first line of the income chain.' },
      { id: 'wf-toi', text: 'Add net fees, FX, trading and other income to reach total operating income', explanation: 'Non-interest lines join NII to make up total operating income.', hint: 'It builds on the first line by adding the other revenue pools.' },
      { id: 'wf-ppop', text: 'Subtract operating expense to reach pre-provision operating profit', explanation: 'Running costs come off operating income before any credit charge.', hint: 'It subtracts costs from the income just built.' },
      { id: 'wf-pbt', text: 'Subtract provision expense to reach profit before tax', explanation: 'Credit cost is deducted after operating cost, which shows what profit survives credit losses.', hint: 'It comes off the profit left before the credit charge.' },
      { id: 'wf-net', text: 'Subtract tax to reach net profit', explanation: 'Tax is the last deduction and gives bottom-line earnings.', hint: 'It is taken from profit before tax.' },
      { id: 'wf-returns', text: 'Compare net profit with average assets and equity to get ROA and ROE', explanation: 'Return ratios scale the final result against the resources used.', hint: 'It uses the final profit figure and the balance sheet.' },
    ],
    correctSequence: ['wf-nii', 'wf-toi', 'wf-ppop', 'wf-pbt', 'wf-net', 'wf-returns'],
    sourceRefs: [
      ch(L34, 1, D2, ['cb-m03-s02', 'cb-m03-s06', 'cb-m03-s08', 'cb-m03-s15'], '“How it works” statement: NII plus non-interest income gives total operating income, less OPEX gives pre-provision operating profit, less provision expense gives PBT, less tax gives net profit; ROA and ROE then compare profit with assets and equity.'),
    ],
  },
  {
    activityId: 'cb-m03-sort-statement-stocks-flows',
    type: 'category-sorting',
    title: 'Balance sheet or income statement?',
    learningObjective: 'Separate balance-sheet stocks measured at a date from income-statement flows measured over a period, so the two are never compared without a defined ratio.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Balance sheets show stocks and income statements show flows. An allowance is not the period provision expense, equity is not CAR, and stocks and flows can move differently.',
    categories: [
      { id: 'balance-sheet', label: 'Balance sheet at a date', description: 'Stocks measured at a reporting date.' },
      { id: 'income-statement', label: 'Income statement over a period', description: 'Flows earned, charged or paid during a period.' },
    ],
    items: [
      { id: 'gross-loans-stock', text: 'Customer loans, investment securities and interbank assets', categoryId: 'balance-sheet', explanation: 'Earning assets are balances held at a date; the interest they generate is a separate flow.', hint: 'These are what the bank holds, not what it earned.' },
      { id: 'deposits-stock', text: 'Deposits and wholesale or interbank liabilities', categoryId: 'balance-sheet', explanation: 'Funding balances are stocks at a date; the interest paid on them is a separate flow.', hint: 'They describe what the bank owes.' },
      { id: 'allowance-stock', text: 'Loan-loss allowance', categoryId: 'balance-sheet', explanation: 'The allowance is a contra-asset representing accumulated expected credit-loss reserves.', hint: 'It is a build-up of reserves over many periods.', misplaced: { 'income-statement': 'The allowance is the accumulated balance. The charge made in a period is the provision expense.' } },
      { id: 'equity-stock', text: 'Accounting equity', categoryId: 'balance-sheet', explanation: 'Accounting equity is a balance at a date and is not the same as regulatory capital, which is measured under prudential rules.', hint: 'It is the owners\u2019 stake at a point in time.' },
      { id: 'interest-income-flow', text: 'Interest income', categoryId: 'income-statement', explanation: 'Interest income is earned over time, which is why it is linked to average loans and securities.', hint: 'It accumulates across weeks and months.' },
      { id: 'interest-expense-flow', text: 'Interest expense', categoryId: 'income-statement', explanation: 'Interest expense is the cost of deposits and borrowing incurred over time.', hint: 'It is paid out over the months of the year.' },
      { id: 'provision-flow', text: 'Provision expense', categoryId: 'income-statement', explanation: 'Provision expense is the charge that changes reserves and reduces profit for the period.', hint: 'It is the amount set aside this time, not the total held.', misplaced: { 'balance-sheet': 'The allowance on the balance sheet is the accumulated reserve. The provision charge is a flow.' } },
      { id: 'net-profit-flow', text: 'Net profit', categoryId: 'income-statement', explanation: 'Net profit is what remains of the period\u2019s income after operating expense, provisions and tax.', hint: 'It is what the bank produced after all charges.' },
    ],
    sourceRefs: [
      ch(L34, 2, D3, ['cb-m03-s08', 'cb-m03-s17', 'cb-m03-s18', 'cb-m03-s19'], 'Chapter narrative, key terms and recap (the chapter visual is held): the balance sheet shows loans, allowances, securities, interbank assets, deposits, wholesale or interbank liabilities and equity at a date; the income statement shows interest and fee flows, OPEX, provisions, PBT, tax and net profit over a period; allowance versus provision expense; equity is not CAR. No bank comparison data is used.'),
    ],
  },
  {
    activityId: 'cb-m03-match-channel-fit',
    type: 'concept-matching',
    title: 'Which channel fits which customer moment?',
    learningObjective: 'Match each distribution channel to the customer moments it serves best, so channels are chosen by the customer job rather than by traffic.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Channel',
    answerLabel: 'Best fit',
    summary: 'Simple, frequent tasks move toward self-service, while complex, high-value or high-risk decisions use people and specialists. A channel must be evaluated for reach, completion, trust, cost, risk and cross-sell, not traffic alone.',
    items: {
      prompts: [
        { id: 'mobile-web', text: 'Mobile and internet banking' },
        { id: 'rm-specialist', text: 'Relationship manager or specialist' },
        { id: 'atm-pos-qr', text: 'ATMs and POS' },
        { id: 'partner-api', text: 'Partner or API' },
      ],
      answers: [
        { id: 'fit-frequent', text: 'Simple, frequent tasks done through self-service.' },
        { id: 'fit-complex', text: 'Complex, high-value or high-risk decisions that need human judgement.' },
        { id: 'fit-transaction', text: 'Completing cash and payment transactions.' },
        { id: 'fit-contextual', text: 'Banking placed inside a non-bank customer journey.' },
      ],
    },
    pairs: [
      { id: 'pair-mobile-web', promptId: 'mobile-web', answerId: 'fit-frequent', explanation: 'Owned digital channels handle simple, frequent tasks so that people are free for the moments that need them.', hint: 'Which channel is used most often for the simplest tasks?' },
      { id: 'pair-rm-specialist', promptId: 'rm-specialist', answerId: 'fit-complex', explanation: 'A relationship manager is a human coverage role coordinating needs, products and specialists.', hint: 'Which channel is a named person for complicated needs?' },
      { id: 'pair-atm-pos-qr', promptId: 'atm-pos-qr', answerId: 'fit-transaction', explanation: 'ATMs and POS are transaction points: they exist to complete cash withdrawals and payments.', hint: 'Which channels are about finishing a payment or a cash withdrawal?' },
      { id: 'pair-partner-api', promptId: 'partner-api', answerId: 'fit-contextual', explanation: 'An embedded front end brings banking into another journey, but it does not remove the bank\u2019s responsibility for underwriting, authentication, complaints or resilience.', hint: 'Which channel puts a bank\u2019s service inside someone else\u2019s app or shop?' },
    ],
    sourceRefs: [
      ch(L35, 0, E1, ['cb-m03-s09', 'cb-m03-s07'], 'Chapter narrative, key terms and channel taxonomy: self-service for simple, frequent tasks; people and specialists for complex, high-value or high-risk decisions; ATMs and POS for cash and payment completion; partners and APIs for embedded finance.'),
    ],
  },
  {
    activityId: 'cb-m03-match-channel-economics-terms',
    type: 'concept-matching',
    title: 'Channel economics: cost and value measures',
    learningObjective: 'Distinguish the cost and value measures used to judge a channel, so a cheap transaction is not mistaken for a profitable customer relationship.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Measure',
    answerLabel: 'What it captures',
    summary: 'A mobile transaction can be cheap while a digital customer is expensive to acquire. Channel economics separates unit service cost from the lifetime economics of the relationship, and exceptions belong in total cost-to-serve.',
    items: {
      prompts: [
        { id: 'cac-term', text: 'Customer acquisition cost' },
        { id: 'marginal-cost-term', text: 'Marginal transaction cost' },
        { id: 'cost-to-serve-term', text: 'Cost-to-serve' },
        { id: 'funded-activation-term', text: 'Funded activation' },
        { id: 'failure-demand-term', text: 'Failure demand' },
        { id: 'primary-status-term', text: 'Primary-bank status' },
      ],
      answers: [
        { id: 'def-cac', text: 'Spend to win a defined new relationship, including paid and partner cost.' },
        { id: 'def-marginal-cost', text: 'The extra cost of processing one more payment or task.' },
        { id: 'def-cost-to-serve', text: 'The end-to-end cost of completing and supporting customer jobs, exceptions included.' },
        { id: 'def-funded-activation', text: 'A newly opened relationship that receives funds and begins meaningful use.' },
        { id: 'def-failure-demand', text: 'Contacts, retries and manual work created when a journey goes wrong.' },
        { id: 'def-primary-status', text: 'Balances and meaningful activity routed through the bank, not just an opened account.' },
      ],
    },
    pairs: [
      { id: 'pair-cac-term', promptId: 'cac-term', answerId: 'def-cac', explanation: 'Acquisition cost needs a consistent acquired-customer definition and must include paid as well as partner cost.', hint: 'This is paid before the customer has done anything.' },
      { id: 'pair-marginal-cost-term', promptId: 'marginal-cost-term', answerId: 'def-marginal-cost', explanation: 'Digital journeys often have a low marginal cost per transaction but meaningful technology, security and compliance expense.', hint: 'It counts only the next unit, not the platform behind it.' },
      { id: 'pair-cost-to-serve-term', promptId: 'cost-to-serve-term', answerId: 'def-cost-to-serve', explanation: 'Full journey cost includes exceptions, support and shared infrastructure, so it can be far above the cost of one transaction.', hint: 'It covers the whole job, including what goes wrong along the way.' },
      { id: 'pair-funded-activation-term', promptId: 'funded-activation-term', answerId: 'def-funded-activation', explanation: 'An account opening is not yet value; funds and meaningful use show the relationship has started.', hint: 'It is the step after opening that shows the account is real.' },
      { id: 'pair-failure-demand-term', promptId: 'failure-demand-term', answerId: 'def-failure-demand', explanation: 'Eliminating failure demand can improve both customer trust and the cost-to-income ratio.', hint: 'It is extra work that a working journey would never create.' },
      { id: 'pair-primary-status-term', promptId: 'primary-status-term', answerId: 'def-primary-status', explanation: 'Retention and balances determine franchise value, so primary status is more useful than account opening alone.', hint: 'It shows the customer has made this bank their main one.' },
    ],
    sourceRefs: [
      ch(L35, 2, E3, ['cb-m03-s09'], 'Chapter key terms, stat tiles and deep dive: CAC, marginal transaction cost, cost-to-serve, funded activation, failure demand and primary status.'),
    ],
  },
  {
    activityId: 'cb-m03-match-ecosystem-roles',
    type: 'concept-matching',
    title: 'Who does what around a Vietnamese bank',
    learningObjective: 'Match each actor in the banking ecosystem to the role it plays around a commercial bank.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Actor',
    answerLabel: 'System role',
    summary: 'Commercial banking is an ecosystem: regulation, confidence, information, infrastructure and capital interact around each institution. Map it before judging a bank\u2019s strategy or resilience.',
    items: {
      prompts: [
        { id: 'sbv-actor', text: 'State Bank of Vietnam' },
        { id: 'div-actor', text: 'Deposit Insurance of Vietnam' },
        { id: 'cic-vamc', text: 'CIC and VAMC' },
        { id: 'napas-actor', text: 'NAPAS' },
        { id: 'markets-investors', text: 'Markets and investors' },
        { id: 'assurance-standards', text: 'Auditors, ratings and standard setters' },
      ],
      answers: [
        { id: 'role-sbv', text: 'Licenses and supervises banks.' },
        { id: 'role-div', text: 'Supports the protection of depositors.' },
        { id: 'role-cic-vamc', text: 'Credit information and bad-debt support for risk management.' },
        { id: 'role-napas', text: 'Shared payment and switching infrastructure for interoperable transactions.' },
        { id: 'role-markets', text: 'Funding, capital and external discipline.' },
        { id: 'role-assurance', text: 'Independent information and international expectations applied through local law.' },
      ],
    },
    pairs: [
      { id: 'pair-sbv-actor', promptId: 'sbv-actor', answerId: 'role-sbv', explanation: 'The SBV licenses and supervises banks and sets the rules within which they operate.', hint: 'Which actor sets the rules?' },
      { id: 'pair-div-actor', promptId: 'div-actor', answerId: 'role-div', explanation: 'DIV supports depositor protection, one of the confidence mechanisms that sit around a bank but outside its management.', hint: 'Which actor provides confidence to depositors?' },
      { id: 'pair-cic-vamc', promptId: 'cic-vamc', answerId: 'role-cic-vamc', explanation: 'CIC is part of the credit-information system and VAMC of the bad-debt system; both support banks\u2019 risk management.', hint: 'Which actors supply data and help with problem loans?' },
      { id: 'pair-napas-actor', promptId: 'napas-actor', answerId: 'role-napas', explanation: 'NAPAS is shared national infrastructure that connects banks. It is not a bank-owned channel.', hint: 'Which actor operates the common rails?' },
      { id: 'pair-markets-investors', promptId: 'markets-investors', answerId: 'role-markets', explanation: 'Interbank markets supply liquidity, and strategic investors and shareholders supply capital and discipline management from outside.', hint: 'Which actors supply money and hold management to account?' },
      { id: 'pair-assurance-standards', promptId: 'assurance-standards', answerId: 'role-assurance', explanation: 'Auditors and ratings add information, while BIS, the Basel Committee and FSB shape expectations that jurisdictions implement through local law and supervision.', hint: 'Which actors check and benchmark rather than lend or regulate locally?' },
    ],
    sourceRefs: [
      ch(L36, 0, F1, ['cb-m03-s03', 'cb-m03-s09', 'cb-m03-s12'], '“How it works” statement, actor list and ecosystem map: SBV licenses and supervises, DIV supports depositor protection, CIC and VAMC support risk management, NAPAS connects payment activity, markets and investors provide funding, capital and discipline, and standard setters act through local law. No legal power beyond these roles is asserted.'),
    ],
  },
]);
