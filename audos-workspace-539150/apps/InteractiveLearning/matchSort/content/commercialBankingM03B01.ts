// Commercial Banking Module 03, Lessons 3.1 to 3.3 activities (source: commercialBankingM03B01.tsx).
// No figures, shares, ranks or bank-level income splits. Restricted detail is not used.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE03' as const;
const L31 = '3.1 Industry Business Models';
const L32 = '3.2 Products, Services & Segmentation';
const L33 = '3.3 Customer Segments & Needs';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const A1 = 'The two engines of bank revenue';
const A2 = 'Retail, corporate, universal\u2014and beyond';
const B1 = 'The banking product system';
const B2 = 'Interest income versus non-interest income';
const B3 = 'Segment, price and measure profitability';
const C1 = 'Who banks serve';
const C2 = 'What customers hire a bank to do';

export const CB_M03B01_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-03', [
  {
    activityId: 'cb-m03-sort-revenue-engines',
    type: 'category-sorting',
    title: 'Spread engine or fee engine?',
    learningObjective: 'Distinguish what the credit or spread engine and the service or fee engine each earn from, what they expose the bank to, and how they consume balance sheet.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Banks earn through balance-sheet intermediation and services, but revenue becomes profit only after funding, operating, credit and capital costs. Neither engine is costless: every engine must be tested after costs, risk and capital.',
    categories: [
      { id: 'spread', label: 'Credit and spread engine', description: 'Prices credit and maturity risk into earning assets.' },
      { id: 'fee', label: 'Service and fee engine', description: 'Earns from the services customers use, not from lending to them.' },
    ],
    items: [
      { id: 'liquidity-into-credit', text: 'Funding loans with liabilities such as customer deposits', categoryId: 'spread', explanation: 'Intermediation means funding assets, especially loans, with liabilities such as customer deposits.', hint: 'Other people\u2019s money is turned into borrowing.' },
      { id: 'interest-less-expense', text: 'Interest income less interest expense', categoryId: 'spread', explanation: 'Net interest income is the revenue of the spread engine.', hint: 'A difference between what is earned on assets and paid on funding.', misplaced: { fee: 'Net interest income comes from balance-sheet intermediation, not from fees for services.' } },
      { id: 'funding-underwriting-capital', text: 'More exposed to funding costs, lending growth and credit cycles', categoryId: 'spread', explanation: 'A spread-led bank depends on what its funding costs and on how its borrowers perform through the cycle.', hint: 'The exposure is to the price of money and to borrowers\u2019 repayments.' },
      { id: 'assets-and-rwa', text: 'Growth raises funding cost, expected losses and risk-weighted assets', categoryId: 'spread', explanation: 'A loan-led strategy may add NII while also raising funding cost, expected losses and risk-weighted assets.', hint: 'Growing it means holding more exposures.', misplaced: { fee: 'A larger recurring fee base often consumes less incremental balance-sheet capital.' } },
      { id: 'transactions-access-advice', text: 'Charging for transactions, advice, access or distribution', categoryId: 'fee', explanation: 'The fee engine charges for transactions, advice, access or distribution rather than for credit.', hint: 'Think about what the customer is paying for.' },
      { id: 'net-fees-fx-trading', text: 'Net fees, FX, trading and other income', categoryId: 'fee', explanation: 'These lines make up non-interest income.', hint: 'None of these lines is interest on a loan.' },
      { id: 'adoption-service-conduct', text: 'Still requires customers, infrastructure, controls and sometimes partners', categoryId: 'fee', explanation: 'A larger fee base can diversify revenue, but the fee engine is not costless: it still needs customers, infrastructure, controls and sometimes partners.', hint: 'The limits are about running and selling a service, not about holding loans.' },
      { id: 'digital-volume-scale', text: 'Often consumes less incremental balance-sheet capital', categoryId: 'fee', explanation: 'A fee-led strategy may be more capital-light, yet unstable if fees are one-off or partner-dependent.', hint: 'It can grow without holding many more exposures.' },
    ],
    sourceRefs: [
      ch(L31, 0, A1, ['cb-m03-s01', 'cb-m03-s05', 'cb-m03-s10'], 'Chapter narrative and deep dive (the chapter visual is held): intermediation, NII, the fee engine charging for transactions, advice, access or distribution, the exposures of a spread-led bank, the capital use of a fee base, and the costs fees still carry.'),
    ],
  },
  {
    activityId: 'cb-m03-match-bank-models',
    type: 'concept-matching',
    title: 'Bank business models and their economic design',
    learningObjective: 'Match each bank model to its economic design, so a model label is linked to customer, product, channel and risk.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Model',
    answerLabel: 'Economic design',
    summary: 'Model labels are useful only when linked to customer, product, channel, funding and risk. Universal breadth trades diversification for complexity, and digital-first describes distribution rather than a better business.',
    items: {
      prompts: [
        { id: 'retail-model', text: 'Retail' },
        { id: 'corporate-model', text: 'Corporate' },
        { id: 'universal-model', text: 'Universal' },
        { id: 'sme-specialist', text: 'Specialist' },
        { id: 'digital-first', text: 'Digital-first' },
      ],
      answers: [
        { id: 'design-retail', text: 'Households served at scale, with granular deposits and standardised underwriting.' },
        { id: 'design-corporate', text: 'Businesses served by relationship managers with credit, cash management, trade and FX.' },
        { id: 'design-universal', text: 'Several customer segments and product families combined.' },
        { id: 'design-sme', text: 'Concentrated on a narrower segment, product or capability.' },
        { id: 'design-digital', text: 'Aims to lower acquisition and service cost through how it distributes.' },
      ],
    },
    pairs: [
      { id: 'pair-retail-model', promptId: 'retail-model', answerId: 'design-retail', explanation: 'Retail relies on standardised underwriting, dense or digital distribution and granular deposits.', hint: 'Many small customers with standard products.' },
      { id: 'pair-corporate-model', promptId: 'corporate-model', answerId: 'design-corporate', explanation: 'Corporate banking relies on relationship managers, tailored limits and cross-product expertise.', hint: 'Fewer, more complex clients served by dedicated people.' },
      { id: 'pair-universal-model', promptId: 'universal-model', answerId: 'design-universal', explanation: 'Universal breadth can diversify earnings but increases operational and governance complexity.', hint: 'Its defining feature is range across segments.' },
      { id: 'pair-sme-specialist', promptId: 'sme-specialist', answerId: 'design-sme', explanation: 'Specialists focus on a product or segment, such as SMEs, mortgages or transaction banking.', hint: 'It chooses to do fewer things in more depth.' },
      { id: 'pair-digital-first', promptId: 'digital-first', answerId: 'design-digital', explanation: 'Digital-first describes distribution, not automatically a better business.', hint: 'It describes how customers are reached rather than who they are.' },
    ],
    sourceRefs: [
      ch(L31, 1, A2, ['cb-m03-s03', 'cb-m03-s10'], 'Chapter narrative and model taxonomy: retail, corporate, universal, specialist and digital-first models with their customers, distribution and operating logic.'),
    ],
  },
  {
    activityId: 'cb-m03-sort-income-lines',
    type: 'category-sorting',
    title: 'Interest income, other income, or not bank income?',
    learningObjective: 'Classify banking items as net interest income, non-interest income or not bank income, on a net, bank-level basis.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Classify income on a net, bank-level basis before comparing it or calling it recurring. Balances are not income, and an insurer\u2019s gross premium is not bank revenue; the bank earns its distribution commission.',
    categories: [
      { id: 'nii', label: 'Net interest income', description: 'Interest earned less interest paid, measured over a period.' },
      { id: 'non-interest', label: 'Non-interest income', description: 'Net fees and commissions, FX, trading and other lines outside net interest income.' },
      { id: 'not-income', label: 'Not bank income', description: 'A balance or someone else\u2019s revenue, not an income line of the bank.' },
    ],
    items: [
      { id: 'interest-spread', text: 'Interest earned on loans less interest paid on funding', categoryId: 'nii', explanation: 'Interest income minus interest expense is the definition of net interest income.', hint: 'It nets what is earned on lending against the price paid for money.' },
      { id: 'net-fees', text: 'Fees received less fees paid', categoryId: 'non-interest', explanation: 'Net fee and commission income is the comparable fee measure.', hint: 'It is the service income left after fees paid out.', misplaced: { nii: 'Fees are not interest. They are a separate income line, compared on a net basis.' } },
      { id: 'client-fx', text: 'Results from foreign-exchange client flow', categoryId: 'non-interest', explanation: 'FX results are non-interest income, which can reflect client flow and market movement and may not recur every year.', hint: 'It comes from clients exchanging currencies.' },
      { id: 'trading-gains', text: 'Trading or investment results', categoryId: 'non-interest', explanation: 'Trading and investment results are volatile non-interest lines.', hint: 'It rises and falls with markets.' },
      { id: 'distribution-commission', text: 'A bank\u2019s commission for selling an insurer\u2019s product', categoryId: 'non-interest', explanation: 'Bancassurance normally records the bank\u2019s commission as income, not the insurer\u2019s premium.', hint: 'It is what the bank earns for distribution.' },
      { id: 'gross-premium', text: 'The insurer\u2019s gross premium', categoryId: 'not-income', explanation: 'Gross premiums belong to the insurer unless consolidated accounting says otherwise, so they are not automatically bank revenue.', hint: 'The customer pays it, but it is not the bank\u2019s to keep.', misplaced: { 'non-interest': 'The bank earns the commission, not the premium itself.' } },
      { id: 'deposit-balances', text: 'Deposit balances held by the bank', categoryId: 'not-income', explanation: 'Deposits are funding liabilities, not revenue.', hint: 'It is money the bank owes to customers.', misplaced: { nii: 'A deposit balance is a liability at a date. Net interest income is earned over a period.' } },
      { id: 'loan-principal', text: 'Loan principal outstanding', categoryId: 'not-income', explanation: 'Loan principal is an asset, not income. Only the interest and fees earned on it are revenue.', hint: 'It is owed back to the bank and sits on the balance sheet.' },
    ],
    sourceRefs: [
      ch(L32, 1, B2, ['cb-m03-s03', 'cb-m03-s04'], 'Chapter narrative, key terms and stat tiles (the chapter visual is held): NII, net fees, FX and trading or investment results; bancassurance records the bank\u2019s commission, not the insurer\u2019s gross premium.'),
      ch(L31, 0, A1, ['cb-m03-s01', 'cb-m03-s05', 'cb-m03-s10'], '“How it works”: deposits are funding liabilities, not revenue; loan principal is an asset, not income.'),
    ],
  },
  {
    activityId: 'cb-m03-match-product-economics-terms',
    type: 'concept-matching',
    title: 'Product and profitability terms',
    learningObjective: 'Define the terms used to price products and measure segment profitability, and distinguish a price from profit.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Term',
    answerLabel: 'Definition',
    summary: 'Price is not profit. Segment economics require funding, service, risk and capital, and relationship value can differ from single-product margin.',
    items: {
      prompts: [
        { id: 'contingent-liability', text: 'Contingent liability' },
        { id: 'cash-management', text: 'Cash management' },
        { id: 'bancassurance', text: 'Bancassurance' },
        { id: 'funds-transfer-pricing', text: 'Funds transfer pricing' },
        { id: 'expected-credit-loss', text: 'Expected credit loss' },
        { id: 'customer-lifetime-value', text: 'Customer lifetime value' },
      ],
      answers: [
        { id: 'def-contingent', text: 'An obligation that may become a balance-sheet exposure if a specified event occurs.' },
        { id: 'def-cash-management', text: 'Services that help businesses collect, hold, forecast and pay cash.' },
        { id: 'def-bancassurance', text: 'A bank distributing an insurer\u2019s products, typically earning a commission.' },
        { id: 'def-ftp', text: 'An internal mechanism that assigns funding value or cost to business lines and products.' },
        { id: 'def-ecl', text: 'A forward-looking estimate of credit loss used in risk and accounting decisions.' },
        { id: 'def-clv', text: 'Expected relationship contribution over time after relevant costs and risk.' },
      ],
    },
    pairs: [
      { id: 'pair-contingent', promptId: 'contingent-liability', answerId: 'def-contingent', explanation: 'Some guarantees create exposure before any cash loan is drawn, because the obligation may crystallise if the event occurs.', hint: 'It describes an obligation that is not yet a drawn loan.' },
      { id: 'pair-cash-management', promptId: 'cash-management', answerId: 'def-cash-management', explanation: 'Cash management supports a business\u2019s whole cash cycle and anchors relationships through daily activity.', hint: 'It is a service for running a company\u2019s day-to-day money.' },
      { id: 'pair-bancassurance', promptId: 'bancassurance', answerId: 'def-bancassurance', explanation: 'The bank earns distribution commission, whereas the premium belongs to the insurer.', hint: 'The bank sells a product that another company underwrites.' },
      { id: 'pair-ftp', promptId: 'funds-transfer-pricing', answerId: 'def-ftp', explanation: 'It links product profitability to the bank\u2019s funding curve, so business lines are credited or charged for funding.', hint: 'It is an internal charge between parts of the same bank.' },
      { id: 'pair-ecl', promptId: 'expected-credit-loss', answerId: 'def-ecl', explanation: 'It enters price and profitability as the loss the bank expects before it happens.', hint: 'It looks ahead to losses that have not occurred yet.' },
      { id: 'pair-clv', promptId: 'customer-lifetime-value', answerId: 'def-clv', explanation: 'It values the whole relationship over time, after costs and risk, instead of a single product margin.', hint: 'It measures a customer across the whole relationship, not one transaction.' },
    ],
    sourceRefs: [
      ch(L32, 0, B1, ['cb-m03-s03', 'cb-m03-s04'], 'Key terms contingent liability, cash management and bancassurance.'),
      ch(L32, 2, B3, ['cb-m03-s03'], 'Key terms funds transfer pricing, expected credit loss and customer lifetime value.'),
    ],
  },
  {
    activityId: 'cb-m03-match-needs-to-responses-v2',
    type: 'concept-matching',
    title: 'Customer jobs and the product response',
    learningObjective: 'Match core banking jobs to how the bank answers them, starting from the customer need rather than the product.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Customer job',
    answerLabel: 'How the bank responds',
    summary: 'Products are the mechanisms; the job comes first. A bank is hired to make money available, safe and usable at the right moment, and trust and operational resilience are part of the product.',
    items: {
      prompts: [
        { id: 'job-liquidity', text: 'Liquidity' },
        { id: 'job-credit', text: 'Credit' },
        { id: 'job-convenience', text: 'Convenience' },
        { id: 'job-transactions', text: 'Transaction control' },
        { id: 'job-trust', text: 'Trust' },
      ],
      answers: [
        { id: 'resp-liquidity', text: 'A current account for daily needs and contingency funds for a business' },
        { id: 'resp-credit', text: 'Working-capital facilities, and term loans to fund investment' },
        { id: 'resp-convenience', text: 'Low-friction mobile self-service for frequent tasks' },
        { id: 'resp-transactions', text: 'Cash management coordinating collections, payroll and supplier payments' },
        { id: 'resp-trust', text: 'Reliable execution, fair treatment and operational resilience' },
      ],
    },
    pairs: [
      { id: 'pair-job-liquidity', promptId: 'job-liquidity', answerId: 'resp-liquidity', explanation: 'A liquidity need is having cash or payment capacity available when obligations are due; a current account supports daily liquidity.', hint: 'Which response keeps money available the moment it is owed?' },
      { id: 'pair-job-credit', promptId: 'job-credit', answerId: 'resp-credit', explanation: 'Working capital finances the operating cycle, and a term loan funds investment.', hint: 'Which response lets a customer spend before the money arrives?' },
      { id: 'pair-job-convenience', promptId: 'job-convenience', answerId: 'resp-convenience', explanation: 'Mobile accounts improve convenience for frequent, everyday tasks, while branches and relationship teams handle complex decisions.', hint: 'Which response is about doing everyday tasks with the least effort?' },
      { id: 'pair-job-transactions', promptId: 'job-transactions', answerId: 'resp-transactions', explanation: 'Businesses need collections, payroll and supplier payments, and cash management coordinates collections and payments.', hint: 'Which response helps a company move and track its money?' },
      { id: 'pair-job-trust', promptId: 'job-trust', answerId: 'resp-trust', explanation: 'All segments need reliability and fair treatment, and resilience is part of the product because failure can interrupt livelihoods and commerce.', hint: 'Which response is about reliability rather than a product line?' },
    ],
    sourceRefs: [
      ch(L33, 1, C2, ['cb-m03-s09', 'cb-m03-s07'], 'Chapter narrative and key terms: the core jobs (liquidity, security, credit, convenience, trust and transaction control), the products named for them, and trust and operational resilience as part of the product.'),
    ],
  },
  {
    activityId: 'cb-m03-match-segment-coverage-v2',
    type: 'concept-matching',
    title: 'Customer segments and how they are covered',
    learningObjective: 'Match each customer segment to the service model that fits its needs, complexity and economics.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Segment',
    answerLabel: 'Needs and coverage',
    summary: 'Banks segment using financial behaviour, needs, complexity and risk, not demographics alone. Coverage ranges from self-service and pooled support to dedicated relationship managers and specialists, and should fit the economics and risk.',
    items: {
      prompts: [
        { id: 'mass-retail', text: 'Mass retail' },
        { id: 'affluent-private', text: 'Affluent and private clients' },
        { id: 'sme-segment', text: 'SME' },
        { id: 'large-corporate', text: 'Large corporate' },
      ],
      answers: [
        { id: 'cover-mass', text: 'Everyday accounts, payments and standardised credit, through self-service and pooled support.' },
        { id: 'cover-affluent', text: 'Banking plus advice and wealth needs, with advice-led support.' },
        { id: 'cover-sme', text: 'Owner and business finances combined, and costly to underwrite because tickets are smaller and information less standardised.' },
        { id: 'cover-corporate', text: 'Limits, cash management, trade, FX and tailored execution, through dedicated relationship managers and specialists.' },
      ],
    },
    pairs: [
      { id: 'pair-mass-retail', promptId: 'mass-retail', answerId: 'cover-mass', explanation: 'Simple, standard needs at large scale are served efficiently through self-service and pooled support.', hint: 'The largest number of customers with the simplest needs.' },
      { id: 'pair-affluent-private', promptId: 'affluent-private', answerId: 'cover-affluent', explanation: 'These clients add advice and wealth needs to everyday banking, so coverage becomes advice-led.', hint: 'Individuals whose needs go beyond everyday banking.' },
      { id: 'pair-sme-segment', promptId: 'sme-segment', answerId: 'cover-sme', explanation: 'SMEs are strategically important but can be expensive to underwrite because information is less standardised and tickets are smaller.', hint: 'Think of a small business run by its owner.' },
      { id: 'pair-large-corporate', promptId: 'large-corporate', answerId: 'cover-corporate', explanation: 'The most complex business needs justify dedicated relationship managers and specialists.', hint: 'The most complex needs among businesses.' },
    ],
    sourceRefs: [
      ch(L33, 0, C1, ['cb-m03-s07', 'cb-m03-s11', 'cb-m03-s03'], 'Chapter narrative, deep dive and segment table: the needs of mass retail, affluent and private, SME and large-corporate customers, and coverage from self-service and pooled support to dedicated relationship managers and specialists.'),
    ],
  },
]);
