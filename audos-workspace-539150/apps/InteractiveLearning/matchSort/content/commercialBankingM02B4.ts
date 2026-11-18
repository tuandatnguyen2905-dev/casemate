// Commercial Banking Module 02, Lessons 2.1 to 2.3 activities (source: commercialBankingM02B4.tsx).
// No figures, rates, day-count bands or hypothetical calculations. Restricted detail (exact classification
// tests, provision rates, domestic funding caps) is not used.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SEQUENCE_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE02' as const;
const L21 = '2.1 Value Chain Overview';
const L22 = '2.2 Upstream Activities';
const L23 = '2.3 Midstream Activities';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const A1 = 'How the Commercial Banking Value Chain Works';
const A2 = 'Who Creates Value Across the Banking System?';
const A3 = 'How Money, Information, and Risk Flow';
const B1 = 'Where Do Commercial Banks Get Their Funding?';
const B2 = 'Understanding Cost of Funds and CASA';
const B3 = 'Liquidity, Cost of Capital, and Funding Risks';
const C1 = 'How Banks Evaluate and Approve Loans';
const C2 = 'Understanding Loan Classification and Non-Performing Loans';
const C3 = 'Credit-Risk Provisioning and Loan Recovery';

export const CB_M02B4_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-02', [
  {
    activityId: 'cb-m02-seq-value-chain',
    type: 'sequence-builder',
    title: 'The banking value chain, from funding to protection',
    learningObjective: 'Order the stages of the commercial banking value chain and explain how each stage depends on the one before it.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Bank value is created by coordinating funding, risk selection, service and resilience. Risk and regulation wrap around every stage rather than sitting at the end.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter presents the chain as five linked stages in order: funding is raised, assets and borrowers are chosen and underwritten, products are disbursed and serviced, spread and fees are earned while costs and losses are managed, and repayments return funding while capital and liquidity protect continuity. Each stage takes the output of the previous one as its input.',
    items: [
      { id: 'raise-funding', text: 'Raise funding: deposits, wholesale liabilities and capital', explanation: 'Funding is the financial input. Nothing can be lent or serviced until it exists.', hint: 'The chain starts with what the bank has available to work with.' },
      { id: 'allocate-underwrite', text: 'Allocate and underwrite: choose assets, borrowers, prices and limits', explanation: 'Once funding exists, the bank decides where to deploy it and which risk to accept.', hint: 'It needs funding to allocate, and it precedes any money being released.' },
      { id: 'disburse-service', text: 'Disburse and service: deliver credit, accounts, payments and support', explanation: 'Only approved and priced decisions are turned into customer products and ongoing service.', hint: 'It comes after the decision about who to lend to.' },
      { id: 'earn-manage', text: 'Earn and manage: collect spread and fees; manage costs and losses', explanation: 'Revenue and losses arise as balances are used and serviced, so they follow delivery.', hint: 'Income and losses depend on products already being in use.' },
      { id: 'recycle-protect', text: 'Recycle and protect: repayments return funding; capital and liquidity protect continuity', explanation: 'Repayments return funding to the start of the chain, while capital and liquidity protect it from interruption.', hint: 'This stage feeds back into the first and depends on how the loans performed.' },
    ],
    correctSequence: ['raise-funding', 'allocate-underwrite', 'disburse-service', 'earn-manage', 'recycle-protect'],
    sourceRefs: [
      ch(L21, 0, A1, ['cb-m02-s01', 'cb-m02-s04', 'cb-m02-s16'], '“Funding goes in, priced risk and service come out” visual: five stages from raising funding to recycling and protecting, with risk control across every stage.'),
    ],
  },
  {
    activityId: 'cb-m02-match-bank-actors',
    type: 'concept-matching',
    title: 'Who creates and protects bank value',
    learningObjective: 'Match each group around a bank to its contribution, so performance is not credited to sales or risk alone.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Group',
    answerLabel: 'Contribution',
    summary: 'Bank value is co-created by customer-facing, balance-sheet, control and infrastructure functions. It appears only when growth, funding, execution and control are aligned.',
    items: {
      prompts: [
        { id: 'customers', text: 'Customers' },
        { id: 'business-teams', text: 'Business teams' },
        { id: 'treasury-finance', text: 'Treasury and finance' },
        { id: 'risk-compliance', text: 'Risk and compliance' },
        { id: 'ops-tech-data', text: 'Operations, technology and data' },
        { id: 'authorities', text: 'Authorities and infrastructure' },
      ],
      answers: [
        { id: 'contrib-customers', text: 'Deposits, borrowing needs and transaction activity, which supply funding and demand.' },
        { id: 'contrib-business', text: 'Origination, advice and relationship management, which bring revenue and service.' },
        { id: 'contrib-treasury', text: 'Funding, liquidity, pricing and capital allocation, which provide balance-sheet discipline.' },
        { id: 'contrib-risk', text: 'Underwriting, limits and independent control of exposure, which prevent loss.' },
        { id: 'contrib-ops', text: 'Processing, reliability, information and channels, which allow execution at scale.' },
        { id: 'contrib-authorities', text: 'Supervision, settlement and system rules, which support trust and stability.' },
      ],
    },
    pairs: [
      { id: 'pair-customers', promptId: 'customers', answerId: 'contrib-customers', explanation: 'Customers are both the source of funding and the source of demand for credit and transactions.', hint: 'This group sits on both sides of the bank: it supplies money and uses services.' },
      { id: 'pair-business', promptId: 'business-teams', answerId: 'contrib-business', explanation: 'Business teams win and serve clients, but cannot create value without funding and control behind them.', hint: 'These are the teams that win and serve clients.' },
      { id: 'pair-treasury', promptId: 'treasury-finance', answerId: 'contrib-treasury', explanation: 'Treasury funds the loan and prices the resources it consumes, which is why internal funds-transfer pricing exists.', hint: 'The function that decides how the balance sheet is funded and priced.' },
      { id: 'pair-risk', promptId: 'risk-compliance', answerId: 'contrib-risk', explanation: 'Risk and compliance set and challenge limits and controls, so they work throughout the chain rather than at the end.', hint: 'The independent function that sets and challenges limits.' },
      { id: 'pair-ops', promptId: 'ops-tech-data', answerId: 'contrib-ops', explanation: 'Technology and operations turn decisions into reliable service, so the account stays available and the loan is paid out.', hint: 'It turns approved decisions into something that actually works every day.' },
      { id: 'pair-authorities', promptId: 'authorities', answerId: 'contrib-authorities', explanation: 'Supervisors and settlement infrastructure underpin trust by setting rules and finalising payments between participants.', hint: 'It sits outside the bank and sets the rules it works within.' },
    ],
    sourceRefs: [
      ch(L21, 1, A2, ['cb-m02-s02', 'cb-m02-s16'], '“Who funds, wins, approves and runs the same loan” visual and key insight: each actor group and what it contributes to the shared balance sheet.'),
    ],
  },
  {
    activityId: 'cb-m02-sort-four-views',
    type: 'category-sorting',
    title: 'Money, information, risk or accounting?',
    learningObjective: 'Separate the four views of one deposit-and-loan relationship so cash movement, data, risk and accounting are not confused with each other or with revenue.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Name the flow and its accounting effect separately before calculating value: money moves, information supports decisions, risk transfers to the bank, and accounting records the result.',
    categories: [
      { id: 'money', label: 'Money flow', description: 'Actual movement of funds between customers and institutions.' },
      { id: 'information', label: 'Information flow', description: 'Identity, financial and behavioural data supporting service and risk decisions.' },
      { id: 'risk', label: 'Risk flow', description: 'Exposure that passes to the bank, which prices and manages it.' },
      { id: 'accounting', label: 'Accounting view', description: 'What is recorded as an asset, liability, income or provision.' },
    ],
    items: [
      { id: 'cash-received', text: 'The bank receives cash from a depositor', categoryId: 'money', explanation: 'Cash arriving is a movement of funds. How it is recorded is a separate accounting question.', hint: 'Something physically moves from one party to another.', misplaced: { accounting: 'Receiving cash is the movement. The record of it, a rise in cash and a deposit liability, is the accounting effect.' } },
      { id: 'loan-disbursed', text: 'Loan proceeds are paid out and later repaid', categoryId: 'money', explanation: 'Disbursement and repayment are movements of funds in each direction. They are not revenue.', hint: 'It describes funds leaving and returning, not a record or a risk.', misplaced: { accounting: 'The loan asset is the record. Paying out and collecting repayments are the movements behind it.' } },
      { id: 'kyc-data', text: 'The bank records ownership, identity and transaction data', categoryId: 'information', explanation: 'Identity, financials and behaviour support service and risk decisions. They are not cash.', hint: 'It is data held about the customer, not funds.', misplaced: { accounting: 'Recording who the customer is and what they do is information. The accounting view records balances such as the deposit liability.' } },
      { id: 'credit-signals', text: 'Credit history and transaction signals feed an approval decision', categoryId: 'information', explanation: 'Credit data and signals are information moving through the bank, which is what allows risk to be priced.', hint: 'It is evidence used for a decision, rather than money or exposure.' },
      { id: 'owes-liquidity', text: 'The bank now owes liquidity to the customer', categoryId: 'risk', explanation: 'Accepting a deposit transfers a liquidity obligation to the bank, which must be able to pay on demand.', hint: 'It describes an exposure the bank carries, not a transfer of money.', misplaced: { accounting: 'The liability entry records the amount. The exposure it creates, being able to pay out when asked, is the risk.' } },
      { id: 'credit-exposure', text: 'A loan adds credit risk that the bank prices and diversifies', categoryId: 'risk', explanation: 'When lending follows, the bank takes on the borrower’s credit risk. Pricing and diversification are how it manages that exposure.', hint: 'It is about the chance that a borrower does not repay.' },
      { id: 'liability-rises', text: 'Cash and a deposit liability both rise', categoryId: 'accounting', explanation: 'Accounting records deposits as liabilities and cash as an asset. This is the record, not the movement.', hint: 'It describes entries on the books, at a date.' },
      { id: 'loan-asset-income', text: 'A loan asset is recorded, and interest and fees are earned over time', categoryId: 'accounting', explanation: 'A loan is an asset, and net interest and fee income arise over time rather than when the balances first appear.', hint: 'It names how the relationship is recorded and when income appears.' },
    ],
    sourceRefs: [
      ch(L21, 2, A3, ['cb-m02-s01', 'cb-m02-s04'], 'The chapter’s four-views table and the deep dive that works one deposit through money, accounting, information and risk.'),
    ],
  },
  {
    activityId: 'cb-m02-match-funding-layers',
    type: 'concept-matching',
    title: 'The bank funding stack and what each layer is for',
    learningObjective: 'Match each funding layer to its primary role, comparing cost, stability and purpose, and recognise that capital is not just another deposit.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Funding layer',
    answerLabel: 'Primary role',
    summary: 'Funding sources differ in cost, stickiness and purpose. Equity and qualifying capital instruments absorb losses and support growth; they are not ordinary deposit funding.',
    items: {
      prompts: [
        { id: 'casa', text: 'CASA deposits' },
        { id: 'term-deposits', text: 'Term deposits' },
        { id: 'interbank', text: 'Interbank funding' },
        { id: 'issued-debt', text: 'Issued debt and wholesale funding' },
        { id: 'equity-capital', text: 'Equity and regulatory capital instruments' },
      ],
      answers: [
        { id: 'role-casa', text: 'Low-cost relationship funding.' },
        { id: 'role-term', text: 'More stable funding, paid for with interest.' },
        { id: 'role-interbank', text: 'Shorter-term liquidity management.' },
        { id: 'role-debt', text: 'Flexible but market-sensitive funding at market returns.' },
        { id: 'role-equity', text: 'Loss absorption that supports solvency and regulatory capacity.' },
      ],
    },
    pairs: [
      { id: 'pair-casa', promptId: 'casa', answerId: 'role-casa', explanation: 'Operating balances can be stable and low-cost, which is why banks build primary relationships through payroll, merchants and transactions.', hint: 'Which layer comes from everyday accounts and carries the lowest rate?' },
      { id: 'pair-term', promptId: 'term-deposits', answerId: 'role-term', explanation: 'Customers commit money for a period, which makes the funding steadier but means the bank pays interest for it.', hint: 'The money is committed for a fixed period in exchange for interest.' },
      { id: 'pair-interbank', promptId: 'interbank', answerId: 'role-interbank', explanation: 'Borrowing from other financial institutions is mostly used to manage short-term liquidity needs.', hint: 'The lenders are other financial institutions, and the horizon is short.' },
      { id: 'pair-debt', promptId: 'issued-debt', answerId: 'role-debt', explanation: 'Bonds, certificates and market borrowing are flexible, but investors demand market returns, so this funding moves with market conditions.', hint: 'It is raised from investors and depends on market conditions.' },
      { id: 'pair-equity', promptId: 'equity-capital', answerId: 'role-equity', explanation: 'Equity and qualifying capital absorb losses and support risk-weighted lending. They are not money owed to customers.', hint: 'This layer sits beneath depositors and takes losses first.' },
    ],
    sourceRefs: [
      ch(L22, 0, B1, ['cb-m02-s02', 'cb-m02-s07', 'cb-m02-s16'], '“From salary accounts to share issues” visual: what each funding layer is for; key insight on funding mix and loss absorption.'),
    ],
  },
  {
    activityId: 'cb-m02-match-cost-terms',
    type: 'concept-matching',
    title: 'Cost-of terms and regulatory capital',
    learningObjective: 'Match each financing term to its meaning, separating rates paid or required from regulatory capital as a loss-absorbing quantity.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Term',
    answerLabel: 'Meaning',
    summary: 'Cost of funds, deposits, debt, equity and WACC are rates. Regulatory capital and CAR describe loss-absorbing capacity. A financing rate and a capital quantity are different levers.',
    items: {
      prompts: [
        { id: 'cost-funds', text: 'Cost of funds' },
        { id: 'cost-deposits', text: 'Cost of deposits' },
        { id: 'cost-debt', text: 'Cost of debt' },
        { id: 'cost-equity', text: 'Cost of equity' },
        { id: 'wacc', text: 'WACC' },
        { id: 'reg-capital', text: 'Regulatory capital and CAR' },
      ],
      answers: [
        { id: 'mean-funds', text: 'The weighted-average rate paid across all funding sources.' },
        { id: 'mean-deposits', text: 'The average rate paid on customer deposits only.' },
        { id: 'mean-debt', text: 'The rate creditors require on wholesale borrowing and bonds.' },
        { id: 'mean-equity', text: 'The return shareholders require for bearing equity risk.' },
        { id: 'mean-wacc', text: 'The blended required return across debt and equity financing.' },
        { id: 'mean-capital', text: 'A quantity of loss-absorbing resources measured against risk-weighted assets.' },
      ],
    },
    pairs: [
      { id: 'pair-funds', promptId: 'cost-funds', answerId: 'mean-funds', explanation: 'It is the blended rate across every source of funding, weighted by balance, and asks what balance-sheet funding costs.', hint: 'It covers every funding source, not just deposits.' },
      { id: 'pair-deposits', promptId: 'cost-deposits', answerId: 'mean-deposits', explanation: 'It is narrower than cost of funds because it leaves out wholesale funding and capital.', hint: 'It covers a single source of funding: the money customers place with the bank.' },
      { id: 'pair-debt', promptId: 'cost-debt', answerId: 'mean-debt', explanation: 'It reflects what lenders and bondholders require, which is why wholesale funding can be market-sensitive.', hint: 'It is set by creditors in the market, not by customers.' },
      { id: 'pair-equity', promptId: 'cost-equity', answerId: 'mean-equity', explanation: 'Shareholders bear the most risk, so they require a return for it. This is a required rate, not a regulatory requirement.', hint: 'It is a return demanded by owners rather than a rate paid to lenders.' },
      { id: 'pair-wacc', promptId: 'wacc', answerId: 'mean-wacc', explanation: 'WACC combines the cost of debt and equity financing into one weighted required return.', hint: 'It blends two of the other terms into one number.' },
      { id: 'pair-capital', promptId: 'reg-capital', answerId: 'mean-capital', explanation: 'Regulatory capital is a quantity, not a rate. Measured against risk-weighted assets it shows how much risk solvency resources can support.', hint: 'Ask whether this is a price paid for money or something a supervisor measures against exposures.' },
    ],
    sourceRefs: [
      ch(L22, 2, B3, ['cb-m02-s02', 'cb-m02-s03', 'cb-m02-s07'], 'Key insight and ‘What it is’ narrative on cost of debt, cost of equity, WACC and regulatory capital, with the key terms cost of equity, WACC and regulatory capital.'),
      ch(L22, 1, B2, ['cb-m02-s09', 'cb-m02-s10', 'cb-m02-s11'], 'Key terms cost of funds and cost of deposits: the weighted rate across all funding versus customer deposits only.'),
    ],
  },
  {
    activityId: 'cb-m02-sort-treasury-diagnostic-v2',
    type: 'category-sorting',
    title: 'Which treasury question is it?',
    learningObjective: 'Sort treasury statements into the three separate questions of the diagnostic (what funding costs, whether obligations can be met, and whether losses can be absorbed).',
    instructions: SORT_INSTRUCTIONS,
    summary: 'A bank can have cheap funding but inadequate capital, or strong capital but unstable funding. Cost, liquidity and solvency need different tools, and an answer to one is not an answer to the others.',
    categories: [
      { id: 'cost', label: 'Cost', description: 'What rate is paid and how it reprices.' },
      { id: 'liquidity', label: 'Liquidity', description: 'Whether obligations can be met on time.' },
      { id: 'solvency', label: 'Solvency', description: 'Whether capital can absorb losses and support risk-weighted assets.' },
    ],
    items: [
      { id: 'weighted-rate', text: 'The blended rate paid across CASA, term and wholesale funding', categoryId: 'cost', explanation: 'A weighted-average rate across the funding mix answers what balance-sheet funding costs.', hint: 'It is a rate averaged across the funding mix.' },
      { id: 'funding-repricing', text: 'How quickly term-deposit and wholesale rates reset when market rates move', categoryId: 'cost', explanation: 'Repricing changes what the bank pays for the same funding. The diagnostic asks what rate is paid and how it reprices.', hint: 'It is about the price of funding changing over time.', misplaced: { liquidity: 'Repricing changes what the bank pays for funding. Whether it can meet outflows on time is a separate question.' } },
      { id: 'meet-outflows', text: 'Large deposit withdrawals and maturing interbank borrowing fall due in the same week', categoryId: 'liquidity', explanation: 'Whether obligations can be paid when they fall due is the liquidity question, whatever the bank’s capital position.', hint: 'It is about having cash when depositors and lenders ask for it.', misplaced: { solvency: 'Nothing here says losses have occurred. The test is whether cash is available on time.' } },
      { id: 'hqla-buffer', text: 'Holding high-quality liquid assets for stressed outflows, and stable funding for the year ahead', categoryId: 'liquidity', explanation: 'Liquidity standards reward stable funding and liquid-asset buffers, which came from funding failures that amplified a past crisis.', hint: 'It is about assets that can be turned into cash fast, and funding that stays.', misplaced: { solvency: 'Liquid assets meet outflows. They do not absorb losses, which is the job of capital.' } },
      { id: 'contingency-funding', text: 'Contingency funding prepared for sudden outflows', categoryId: 'liquidity', explanation: 'ALM prepares contingency funding for outflows, which is part of managing liquidity and concentration risk.', hint: 'It is a plan for when withdrawals arrive faster than expected.' },
      { id: 'absorb-losses', text: 'A rise in loan losses threatens to use up the bank’s capital', categoryId: 'solvency', explanation: 'Whether capital can absorb losses without the bank failing is the solvency question.', hint: 'It is about taking a hit, not about paying out cash.', misplaced: { liquidity: 'Cash on hand does not absorb losses. Only loss-absorbing capital does.' } },
      { id: 'support-rwa', text: 'Whether regulatory capital can support more risk-weighted lending', categoryId: 'solvency', explanation: 'Regulatory capital measured against risk-weighted assets shows how much risk the bank can carry.', hint: 'It decides how much more risky lending the bank is allowed to take on.', misplaced: { cost: 'This is not about the rate paid for funding. It is the amount of loss-absorbing resources against exposures.' } },
    ],
    sourceRefs: [
      ch(L22, 2, B3, ['cb-m02-s02', 'cb-m02-s03', 'cb-m02-s07'], '“A three-question treasury diagnostic” deep dive: cost, liquidity and solvency; the chapter’s narrative on ALM and Basel liquidity standards.'),
    ],
  },
  {
    activityId: 'cb-m02-seq-credit-lifecycle',
    type: 'sequence-builder',
    title: 'The credit lifecycle, from design to recovery',
    learningObjective: 'Order the stages of the credit lifecycle and explain the control that protects loan quality at each stage.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Loan quality is produced across the whole lifecycle, not at the approval meeting alone: design, underwriting, approval, monitoring and recovery each carry their own control.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter lists the credit lifecycle in order, from product and pricing through origination, assessment, approval, documentation, disbursement, monitoring and collection, and its visual follows design and origination, then underwriting, then approval and documentation, disbursement and monitoring, and collection or recovery. A loan cannot be approved before it is assessed or monitored before it is disbursed.',
    items: [
      { id: 'design-originate', text: 'Design and originate: define the customer, product, price and application', explanation: 'The lifecycle begins by deciding who the product is for and at what price, then taking the application and completing KYC.', hint: 'Nothing can be assessed until there is a product and an application.' },
      { id: 'assess-underwrite', text: 'Assess and underwrite: test cash flow, history, collateral and risks', explanation: 'The bank turns incomplete information into a risk view by testing the borrower with evidence and challenge.', hint: 'It must happen before any decision is made on the application.' },
      { id: 'approve-document', text: 'Approve and document: set the limit, tenor, covenants and conditions', explanation: 'A positive assessment becomes a decision with a limit, tenor, covenants and conditions.', hint: 'It turns an assessment into a decision and a contract.' },
      { id: 'disburse-monitor', text: 'Disburse and monitor: release funds and track performance and warnings', explanation: 'Monitoring starts once money is out. Early-warning signals show whether repayment risk is rising.', hint: 'You cannot monitor a loan that has not yet been paid out.' },
      { id: 'collect-close', text: 'Collect, recover or close: receive repayment or manage delinquency and recovery', explanation: 'The outcome of the loan is known only at the end: repaid in full, or managed through delinquency and recovery.', hint: 'It depends on how the loan performed during monitoring.' },
    ],
    correctSequence: ['design-originate', 'assess-underwrite', 'approve-document', 'disburse-monitor', 'collect-close'],
    sourceRefs: [
      ch(L23, 0, C1, ['cb-m02-s03', 'cb-m02-s08', 'cb-m02-s16'], '“Where a loan’s quality is decided, before and after approval” visual and the ‘What it is’ lifecycle list, from design and origination to collection or recovery.'),
    ],
  },
  {
    activityId: 'cb-m02-sort-debt-group-boundary',
    type: 'category-sorting',
    title: 'Where does NPL begin?',
    learningObjective: 'Place Vietnam’s five debt groups on the correct side of the NPL boundary, and recognise which group is an early warning that sits outside NPL.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'NPL equals Groups 3 to 5. Group 2 Special Mention warns earlier but is not itself NPL. Exact day-count bands and provision rates are not taught here.',
    categories: [
      { id: 'standard', label: 'Performing', description: 'No classification warning.' },
      { id: 'watch', label: 'Early warning outside NPL', description: 'Needs attention but is not counted as a non-performing loan.' },
      { id: 'npl', label: 'NPL', description: 'Counted as non-performing in the NPL ratio.' },
    ],
    items: [
      { id: 'group-1', text: 'Group 1: Standard', categoryId: 'standard', explanation: 'Group 1 is the performing classification.', hint: 'The loan is treated as healthy.', misplaced: { watch: 'Group 1 carries no early-warning flag. The early-warning category is Group 2.' } },
      { id: 'group-2', text: 'Group 2: Special Mention', categoryId: 'watch', explanation: 'Special Mention is an early-warning classification that requires attention but sits outside NPL.', hint: 'It warns before the loan is counted as a problem.', misplaced: { npl: 'A common mistake. NPL starts at Group 3. Group 2 is an early warning that is not itself NPL.' } },
      { id: 'group-3', text: 'Group 3: Substandard', categoryId: 'npl', explanation: 'The non-performing classification begins at Group 3.', hint: 'It is the first group counted as problem loans.', misplaced: { watch: 'Substandard is where the non-performing classification begins, so it is inside NPL.' } },
      { id: 'group-4', text: 'Group 4: Doubtful', categoryId: 'npl', explanation: 'Doubtful sits between Substandard and Loss and is part of NPL.', hint: 'It sits between the first problem group and the most severe one.' },
      { id: 'group-5', text: 'Group 5: Loss', categoryId: 'npl', explanation: 'Loss is the highest-risk classification and is part of NPL.', hint: 'The most severe classification.' },
    ],
    sourceRefs: [
      ch(L23, 1, C2, ['cb-m02-s19', 'cb-m02-s21'], 'Key insight, ‘What it is’ narrative and recap: the five group names, NPL equals Groups 3 to 5, and Group 2 is an early-warning category outside NPL. Exact day-count bands are restricted and not used.'),
    ],
  },
  {
    activityId: 'cb-m02-match-credit-loss-terms',
    type: 'concept-matching',
    title: 'Credit loss terms: provisions, coverage and write-off',
    learningObjective: 'Define the terms that carry credit risk into profit and distinguish provisions, cost of risk, coverage and write-off from cash loss.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Term',
    answerLabel: 'Definition',
    summary: 'Provisioning is an accounting charge for expected credit loss, not the same as NPL stock or cash loss. Recovery, write-off and coverage describe different stages of loss management.',
    items: {
      prompts: [
        { id: 'specific-provision', text: 'Specific provision' },
        { id: 'general-provision', text: 'General provision' },
        { id: 'cost-of-risk', text: 'Cost of Risk' },
        { id: 'llcr', text: 'LLCR' },
        { id: 'write-off', text: 'Write-off' },
      ],
      answers: [
        { id: 'def-specific', text: 'An allowance linked to identified exposure risk.' },
        { id: 'def-general', text: 'An allowance covering broader risk in the performing portfolio.' },
        { id: 'def-cost-of-risk', text: 'Credit cost or provision expense relative to average loans.' },
        { id: 'def-llcr', text: 'Loan-loss provisions divided by non-performing loans.' },
        { id: 'def-write-off', text: 'Accounting removal of an exposure judged unrecoverable, while collection may continue.' },
      ],
    },
    pairs: [
      { id: 'pair-specific', promptId: 'specific-provision', answerId: 'def-specific', explanation: 'A specific provision responds to credit risk the bank has already identified in a particular exposure.', hint: 'It is attached to a particular exposure that has already shown weakness.' },
      { id: 'pair-general', promptId: 'general-provision', answerId: 'def-general', explanation: 'A general provision recognises risk that exists across the healthy book even before individual loans show trouble.', hint: 'It looks at the performing book as a whole rather than at one named loan.' },
      { id: 'pair-cost-of-risk', promptId: 'cost-of-risk', answerId: 'def-cost-of-risk', explanation: 'Relating provision expense to average loans means credit cost is read against the size of the loan book rather than as a raw amount.', hint: 'It expresses credit cost per unit of the loan book.' },
      { id: 'pair-llcr', promptId: 'llcr', answerId: 'def-llcr', explanation: 'Coverage compares the allowance with the stock of NPLs, showing how much recognised allowance stands against problem loans.', hint: 'It compares an allowance with the problem-loan stock.' },
      { id: 'pair-write-off', promptId: 'write-off', answerId: 'def-write-off', explanation: 'A write-off is an accounting action. Collection can continue, and later cash can still be recovered.', hint: 'This is an accounting action, and it is not the end of collection.' },
    ],
    sourceRefs: [
      ch(L23, 2, C3, ['cb-m02-s12', 'cb-m02-s19', 'cb-m02-s20', 'cb-m02-s21'], 'Key terms specific provision, general provision, Cost of Risk, LLCR and write-off. No provision rate is used.'),
    ],
  },
]);
