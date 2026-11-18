import type { MatchSortPack } from '../types';
import { chapterRef, defineActivities } from './shared';

const MODULE = 'COMMERCIAL_BANKING_MODULE01' as const;
const L11 = '1.1 Industry Definition & Scope';
const L13 = '1.3 Global Market Overview';

const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const PAIR_INSTRUCTIONS = 'Select an item on the left, then select the item on the right that matches it. On a computer you can also drag a left item onto its match. Pair every item, then check your answers.';
const SORT_INSTRUCTIONS = 'Select an item, then choose the group it belongs to. On a computer you can also drag an item into a group. You can move items between groups until you check.';

const activities = defineActivities('banking-commercial', 'module-01', [
  {
    activityId: 'cb-m01-match-banking-mechanics',
    type: 'concept-matching',
    title: 'Banking mechanics: terms and definitions',
    learningObjective: 'Define the mechanisms that set a commercial bank apart from an ordinary company: intermediation, credit creation, liquidity and maturity transformation, capital adequacy and bank runs.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Term',
    answerLabel: 'Definition',
    summary: 'A commercial bank is a licensed intermediary that turns deposits into credit and payments. The same funding–asset mismatch that creates its value makes trust, capital and liquidity essential.',
    items: {
      prompts: [
        { id: 'intermediation', text: 'Financial intermediation' },
        { id: 'credit-creation', text: 'Credit creation' },
        { id: 'liquidity-transformation', text: 'Liquidity transformation' },
        { id: 'maturity-transformation', text: 'Maturity transformation' },
        { id: 'capital-adequacy', text: 'Capital adequacy' },
        { id: 'bank-run', text: 'Bank run' },
      ],
      answers: [
        { id: 'def-intermediation', text: 'Pooling funds from savers and allocating them to borrowers while managing risk.' },
        { id: 'def-credit-creation', text: 'The creation of deposit money when a bank extends a loan, within regulatory constraints.' },
        { id: 'def-liquidity-transformation', text: 'Offering withdrawable funding while holding assets that cannot be converted to cash immediately.' },
        { id: 'def-maturity-transformation', text: 'Funding longer-term assets with shorter-term liabilities.' },
        { id: 'def-capital-adequacy', text: 'Maintaining loss-absorbing regulatory capital relative to risk-weighted assets.' },
        { id: 'def-bank-run', text: 'Rapid withdrawals caused by loss of confidence.' },
      ],
    },
    pairs: [
      { id: 'pair-intermediation', promptId: 'intermediation', answerId: 'def-intermediation', explanation: 'The bank stands between many savers and the borrowers they could not assess themselves: it pools deposits, evaluates borrowers and carries the risk in between.', hint: 'Think about the bank’s role between thousands of savers and one business that needs a large loan.' },
      { id: 'pair-credit-creation', promptId: 'credit-creation', answerId: 'def-credit-creation', explanation: 'Approving a loan records the borrower’s obligation as an asset and credits a matching deposit. Spending power is created alongside a debt, and capital, liquidity and policy limit how far this can go.', hint: 'This term is about what a new loan adds to the money in the system, not about moving existing savings.' },
      { id: 'pair-liquidity-transformation', promptId: 'liquidity-transformation', answerId: 'def-liquidity-transformation', explanation: 'Depositors can withdraw quickly while the loans they fund repay slowly. Customers value that access, and it is why banks hold liquid assets to meet outflows.', hint: 'Compare how fast customers can take money out with how fast the bank can turn its assets into cash. Loan length is a different idea.' },
      { id: 'pair-maturity-transformation', promptId: 'maturity-transformation', answerId: 'def-maturity-transformation', explanation: 'Borrowing short and lending long gives savers short-term access and borrowers long-term finance. It creates value but also fragility, so it must be accompanied by liquidity requirements and supervision of risk-taking.', hint: 'Focus on time horizons: how long the bank’s funding lasts compared with its loans.' },
      { id: 'pair-capital-adequacy', promptId: 'capital-adequacy', answerId: 'def-capital-adequacy', explanation: 'Capital sits beneath depositors and absorbs losses. A bank can have plenty of deposits and still lack the capital to support more risky lending: funding and solvency are different questions.', hint: 'Deposits fund assets but are still owed to customers. Which definition describes the buffer that takes losses?' },
      { id: 'pair-bank-run', promptId: 'bank-run', answerId: 'def-bank-run', explanation: 'Deposits can leave faster than loans are collected, so a confidence shock can turn into a liquidity crisis within hours. Trust is an operating input for a bank.', hint: 'This term names an event caused by depositor behaviour, not a rule or a ratio.' },
    ],
    sourceRefs: [
      ch(L11, 0, 'What Is Commercial Banking?', ['cb-m01-s08'], 'Key terms “Financial intermediation” and “Credit creation”; deep dive on a loan creating a matching deposit.'),
      ch(L11, 1, 'What Makes Commercial Banking Unique?', ['cb-m01-s02', 'cb-m01-s03'], 'Key terms “Liquidity transformation”, “Maturity transformation”, “Capital adequacy” and “Bank run”; transformation-and-safeguard comparison.'),
    ],
  },
  {
    activityId: 'cb-m01-match-products-needs',
    type: 'concept-matching',
    title: 'Banking products and the needs they solve',
    learningObjective: 'Map deposit, credit, payment, trade and treasury products to the customer need each one solves.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Product',
    answerLabel: 'Customer need',
    summary: 'Banking products work as one relationship: deposits fund the bank, loans deploy its balance sheet, and payment, trade and treasury services deepen the relationship and fee income.',
    items: {
      prompts: [
        { id: 'current-account', text: 'Current account' },
        { id: 'overdraft', text: 'Overdraft' },
        { id: 'letter-of-credit', text: 'Letter of credit' },
        { id: 'cash-management', text: 'Cash management' },
        { id: 'fx-treasury', text: 'Foreign-exchange and treasury services' },
      ],
      answers: [
        { id: 'need-transactions', text: 'Receive money and make frequent payments and withdrawals.' },
        { id: 'need-timing-gap', text: 'Let the account balance fall below zero, up to an approved limit, to bridge a short timing gap.' },
        { id: 'need-trade-payment', text: 'Support payment between parties in a trade transaction with a bank undertaking.' },
        { id: 'need-cash-cycle', text: 'Collect, hold, forecast and pay a business’s cash.' },
        { id: 'need-currency', text: 'Manage currency exposure and liquidity for a client trading across borders.' },
      ],
    },
    pairs: [
      { id: 'pair-current-account', promptId: 'current-account', answerId: 'need-transactions', explanation: 'A current account is a transaction deposit designed for frequent payments and withdrawals. The balance is also funding for the bank, because it is a deposit the bank owes the customer.', hint: 'Which need is about day-to-day money movement rather than borrowing or managing risk?' },
      { id: 'pair-overdraft', promptId: 'overdraft', answerId: 'need-timing-gap', explanation: 'An overdraft is credit attached to the account. It bridges gaps such as paying suppliers before customer cash arrives.', hint: 'This product is credit linked to an account rather than a separate loan.' },
      { id: 'pair-letter-of-credit', promptId: 'letter-of-credit', answerId: 'need-trade-payment', explanation: 'A letter of credit is a bank undertaking that supports payment in trade, reducing payment and performance risk between buyer and seller.', hint: 'This product exists because a buyer and a seller in trade may not trust each other to pay or deliver.' },
      { id: 'pair-cash-management', promptId: 'cash-management', answerId: 'need-cash-cycle', explanation: 'Cash management runs collections, payroll and supplier payments. The bank sees regular cash flows, which can support stable balances, fee income and better credit assessment.', hint: 'Think of the service a business uses to run its whole cash cycle, not a single loan or payment.' },
      { id: 'pair-fx-treasury', promptId: 'fx-treasury', answerId: 'need-currency', explanation: 'Treasury and FX tools help clients control currency and liquidity. Corporate banks often combine them with working-capital loans, cash management and trade finance.', hint: 'Which need only arises when a client deals in more than one currency?' },
    ],
    sourceRefs: [
      ch(L11, 3, 'Understanding Banking Products and Services', ['cb-m01-s07', 'cb-m01-s08'], 'Key terms “Current account”, “Overdraft”, “Letter of credit” and “Cash management”; product system including treasury services (cash, FX and liquidity management).'),
    ],
  },
  {
    activityId: 'cb-m01-sort-balance-sheet',
    type: 'category-sorting',
    title: 'Asset, liability or income?',
    learningObjective: 'Classify common banking items as assets, liabilities or income, and explain why deposits are funding rather than revenue.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Deposits are liabilities and loans are assets; only income earned over time is revenue. Classify a number before comparing it.',
    categories: [
      { id: 'asset', label: 'Asset', description: 'Something the bank owns or is owed, recorded on the balance sheet at a date.' },
      { id: 'liability', label: 'Liability', description: 'Something the bank owes to customers or lenders, recorded on the balance sheet at a date.' },
      { id: 'income', label: 'Income', description: 'Earned over a period from using and servicing balances. Not a balance-sheet item.' },
    ],
    items: [
      { id: 'loans-to-customers', text: 'Loans to customers', categoryId: 'asset', explanation: 'A loan is the borrower’s obligation to repay the bank, so it is a bank asset and the bank’s main use of funds.', hint: 'Ask who owes whom: after a loan is made, the borrower owes the bank.', misplaced: { liability: 'A loan is not money the bank owes. The borrower owes the bank, so loans sit on the opposite side of the balance sheet from deposits.', income: 'The loan is a balance at a date. Only the interest earned on it over time is income.' } },
      { id: 'securities-held', text: 'Securities the bank holds', categoryId: 'asset', explanation: 'Securities are investments the bank owns. With loans and cash they make up total assets, which measure size, not profit.', hint: 'These are investments the bank owns, held alongside its loans.' },
      { id: 'cash-held', text: 'Cash the bank holds', categoryId: 'asset', explanation: 'Cash is part of total assets, and liquid holdings like this help the bank meet withdrawals.', hint: 'This is something the bank keeps on hand to meet withdrawals.' },
      { id: 'customer-deposits', text: 'Customer current and savings deposits', categoryId: 'liability', explanation: 'A deposit is money the bank owes the customer. It funds the bank’s assets, but it is not revenue and it can be withdrawn.', hint: 'Customers can ask for this money back, so whose money is it?', misplaced: { income: 'A common mistake. Deposits fund the bank but are still owed to customers; taking in a deposit earns the bank nothing by itself.', asset: 'The cash that arrives is held by the bank, but the deposit balance records what the bank now owes the customer.' } },
      { id: 'borrowings', text: 'Borrowings from other lenders', categoryId: 'liability', explanation: 'Bank assets are funded mainly by deposits and borrowings. Borrowings must be repaid to the lenders who provided them.', hint: 'This is funding the bank must repay to whoever provided it.' },
      { id: 'new-loan-deposit', text: 'The deposit credited to a borrower when a loan is approved', categoryId: 'liability', explanation: 'Approving a loan records the borrower’s obligation and, at the same moment, a matching deposit the bank owes the borrower. The balance sheet expands, but no profit has been made.', hint: 'Approving a loan creates two entries at once. This is the one the bank owes to the borrower.', misplaced: { income: 'Creating a deposit through lending expands the balance sheet but earns nothing yet. Profit comes only if interest and fees exceed funding cost, operating cost and credit losses.', asset: 'The loan is what the borrower owes the bank. The deposit created with it is what the bank owes the borrower.' } },
      { id: 'net-interest-income', text: 'Net interest income', categoryId: 'income', explanation: 'Interest earned minus interest paid during a period. It is the main revenue line and comes from using balances over time, not from the balances themselves.', hint: 'This figure is measured over a period, not at a single date.', misplaced: { asset: 'Net interest income is earned during a period. Assets are balances measured at a date.' } },
      { id: 'payment-fees', text: 'Fees from payment and transaction services', categoryId: 'income', explanation: 'Fees are non-interest revenue earned by servicing customers, for example through payments and cash management.', hint: 'This is earned by providing a service during a period.' },
    ],
    sourceRefs: [
      ch(L11, 0, 'What Is Commercial Banking?', ['cb-m01-s08'], 'Recap “Deposits are liabilities and loans are assets.”; deep dive on the matching deposit created by a loan and on profit arriving only if interest and fees exceed funding cost, operating cost and credit losses.'),
      ch(L11, 1, 'What Makes Commercial Banking Unique?', ['cb-m01-s02'], 'Assets such as loans and securities are funded mainly by deposits and borrowings, with equity capital absorbing losses.'),
      ch(L13, 1, 'Global Banking Assets, Credit, and Deposits', ['cb-m01-s05'], '“Total assets include loans, securities, cash and other items.”; the “Stock, flow or income: classify the number first” diagram lists customer deposits as a liability and net interest income and fee income as income.'),
    ],
  },
  {
    activityId: 'cb-m01-sort-customer-segments',
    type: 'category-sorting',
    title: 'Which customer segment?',
    learningObjective: 'Distinguish retail, SME and corporate customers by their needs, information and the service model a bank uses for each.',
    instructions: `${SORT_INSTRUCTIONS} Every segment can deposit, borrow and transact, so each item describes what differs between them.`,
    summary: 'Segment the customer before choosing products, channels or risk tools: retail is high-volume and standardised, SME blends data with relationship judgement, and corporate banking is bespoke.',
    categories: [
      { id: 'retail', label: 'Retail', description: 'Individuals and households.' },
      { id: 'sme', label: 'SME', description: 'Small and medium-sized enterprises.' },
      { id: 'corporate', label: 'Corporate & institutional', description: 'Large organisations and institutions.' },
    ],
    items: [
      { id: 'retail-products', text: 'Accounts, cards and mortgages for individuals', categoryId: 'retail', explanation: 'Retail banking serves individuals and households with accounts, cards, mortgages and personal finance.', hint: 'Who typically needs a mortgage and a personal card?' },
      { id: 'retail-standardised', text: 'High-volume, standardised products', categoryId: 'retail', explanation: 'Serving very many individuals and households with similar needs favours standardised products, which keeps the cost to serve low.', hint: 'Which segment has the most customers with similar needs?' },
      { id: 'sme-owner', text: 'Less formal reporting and heavy dependence on the owner', categoryId: 'sme', explanation: 'A smaller business may lack formal reporting and depend on its owner, so the bank cannot rely on audited accounts alone.', hint: 'Think of a family shop rather than a multinational.', misplaced: { corporate: 'Large organisations usually have audited accounts and specialist finance staff. Dependence on one owner marks a smaller business.' } },
      { id: 'sme-judgement', text: 'Financial data combined with relationship judgement', categoryId: 'sme', explanation: 'Neither pure standardisation nor fully bespoke structuring fits, so SME banking blends available data with a relationship manager’s understanding of the business.', hint: 'This approach sits between standardised scoring and fully bespoke structuring.' },
      { id: 'sme-working-capital', text: 'Fast working-capital decisions', categoryId: 'sme', explanation: 'Smaller businesses often need quick working-capital decisions. Applying a large-company process to them raises the cost to serve.', hint: 'Which segment suffers most when a slow, bespoke credit process is applied to it?' },
      { id: 'corp-structure', text: 'Audited accounts, multiple entities and specialist treasury staff', categoryId: 'corporate', explanation: 'Large organisations bring formal reporting and complex group structures, which call for specialist assessment.', hint: 'Which customer has its own finance and treasury team?', misplaced: { sme: 'Audited accounts across several entities and an in-house treasury team describe a large organisation, not a smaller business.' } },
      { id: 'corp-tailored', text: 'Tailored facilities, covenants and specialist teams', categoryId: 'corporate', explanation: 'Corporate banking uses bespoke credit structures and covenants, coordinated by relationship managers and specialist teams.', hint: 'This service model is bespoke rather than standardised.' },
    ],
    sourceRefs: [
      ch(L11, 4, "Who Are Commercial Banks' Customers?", ['cb-m01-s08'], 'Segment definitions, the “Same bank, three ways of serving and judging customers” table and the deep dive on why an SME is not simply a small corporate.'),
    ],
  },
  {
    activityId: 'cb-m01-seq-loan-lifecycle',
    type: 'sequence-builder',
    title: 'From loan decision to loan outcome',
    learningObjective: 'Order the stages of a single bank loan and explain why each stage depends on the one before.',
    instructions: 'Put the stages in order from first to last. Use the Move up and Move down buttons, press Alt with the arrow keys, or drag a stage on a computer. Check when you are ready.',
    summary: 'Lending creates a deposit and a debt at the same time, so the balance sheet grows before any profit exists. Profit depends on how the loan performs after it is used and repaid.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter describes one loan in order: the bank assesses the borrower, then creates a loan asset and credits deposit money to the borrower; borrowers then invest and transact through bank rails, and profit arrives only if interest and fees exceed funding cost, operating cost and credit losses. The loan asset and the matching deposit are recorded together, so they form a single stage here.',
    items: [
      { id: 'assess', text: 'The bank assesses the borrower’s ability to repay', explanation: 'Lending starts with assessment: the bank evaluates the borrower before it commits its balance sheet.', hint: 'Nothing can be recorded or spent until the bank has decided whether to lend.' },
      { id: 'approve-record', text: 'The loan is approved: a loan asset and a matching deposit are recorded together', explanation: 'Approval creates the borrower’s obligation and a deposit the bank owes the borrower at the same moment. This is how lending creates deposit money.', hint: 'This stage needs a positive credit decision first, and it creates the money the borrower will use.' },
      { id: 'spend', text: 'The borrower pays suppliers or invests using the new deposit', explanation: 'The new deposit gives the borrower spending power, and bank payment rails move it through the economy.', hint: 'Money can only be spent after it has been credited to the borrower.' },
      { id: 'repay', text: 'The borrower repays principal with interest over the life of the loan', explanation: 'Repayments reduce the loan balance over time, and the interest earned is the income on the relationship.', hint: 'Repayment follows the use of the funds and runs across the loan’s life.' },
      { id: 'outcome', text: 'The bank’s profit is judged against funding cost, operating cost and credit losses', explanation: 'A bigger balance sheet is not profit. Profit exists only if interest and fees exceed funding cost, operating cost and any credit losses, which can only be judged as the loan performs.', hint: 'This judgement depends on how the loan actually performed, so it cannot come early.' },
    ],
    correctSequence: ['assess', 'approve-record', 'spend', 'repay', 'outcome'],
    sourceRefs: [
      ch(L11, 0, 'What Is Commercial Banking?', ['cb-m01-s08'], '“How it works”: the bank assesses borrowers, creates a loan asset and credits deposit money; deep dive: the balance sheet expands and profit arrives only if income exceeds funding cost, operating cost and credit losses.'),
    ],
  },
]);

export const COMMERCIAL_BANKING_M01_PACK: MatchSortPack = {
  packId: 'commercial-banking-m01',
  title: 'Commercial Banking · Module 01 practice',
  industryId: 'banking-commercial',
  moduleId: 'module-01',
  sourceModuleKey: MODULE,
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is still under review. These activities use only its definitions and mechanisms: no figures, rankings, ratios or legal provisions.',
    'No Commercial Banking Module 01 chapter is under a review hold at the time of writing; availability is re-checked at runtime against the decks after review holds are applied.',
  ],
  activities,
};
