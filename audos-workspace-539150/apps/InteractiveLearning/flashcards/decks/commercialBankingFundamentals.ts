// Commercial Banking Fundamentals — drawn read-only from Commercial Banking Module 01,
// Lesson 1.1 "Industry Definition & Scope" (apps/IndustryKnowledge/commercialBankingM01B1.tsx).
// Card text restates the chapter; every card cites verbatim excerpts that the source-mapping test
// checks against the curriculum file. No statistics, regulatory thresholds or held material.

import type { ChapterRef, FlashcardContent, FlashcardDeckContent, SourceRef } from '../models';

const FILE = 'apps/IndustryKnowledge/commercialBankingM01B1.tsx';
const DECK_ID = 'commercial-banking-fundamentals';
const INDUSTRY_ID = 'banking-commercial';
const MODULE_ID = 'cb-m01';
const LESSON_ID = 'cb-m1-l11';

const CHAPTERS: ChapterRef[] = [
  { chapterId: 'cb-m1-l11-ch01', number: 1, title: 'What Is Commercial Banking?', sourceTitle: '01 What Is Commercial Banking?' },
  { chapterId: 'cb-m1-l11-ch02', number: 2, title: 'What Makes Commercial Banking Unique?', sourceTitle: '02 What Makes Commercial Banking Unique?' },
  { chapterId: 'cb-m1-l11-ch03', number: 3, title: 'Where Does Commercial Banking Begin and End?', sourceTitle: '03 Where Does Commercial Banking Begin and End?' },
  { chapterId: 'cb-m1-l11-ch04', number: 4, title: 'Understanding Banking Products and Services', sourceTitle: '04 Understanding Banking Products and Services' },
  { chapterId: 'cb-m1-l11-ch05', number: 5, title: "Who Are Commercial Banks' Customers?", sourceTitle: "05 Who Are Commercial Banks' Customers?" },
];

const CITATIONS: Record<string, string[]> = {
  'cb-m1-l11-ch01': ['cb-m01-s08', 'cb-m01-s12'],
  'cb-m1-l11-ch02': ['cb-m01-s02', 'cb-m01-s03', 'cb-m01-s07'],
  'cb-m1-l11-ch03': ['cb-m01-s07', 'cb-m01-s08'],
  'cb-m1-l11-ch04': ['cb-m01-s07', 'cb-m01-s08'],
  'cb-m1-l11-ch05': ['cb-m01-s08', 'cb-m01-s12'],
};

const ref = (chapterId: string, excerpt: string): SourceRef => ({ file: FILE, chapterId, excerpt, citationIds: CITATIONS[chapterId] });

type CardInput = Omit<FlashcardContent, 'deckId' | 'industryId' | 'moduleId' | 'lessonId'>;
const card = (input: CardInput): FlashcardContent => ({ deckId: DECK_ID, industryId: INDUSTRY_ID, moduleId: MODULE_ID, lessonId: LESSON_ID, ...input });

const CARDS: FlashcardContent[] = [
  card({
    cardId: 'cbf-commercial-bank-definition',
    chapterId: 'cb-m1-l11-ch01',
    front: 'What is a commercial bank?',
    back: 'A licensed intermediary that turns deposits into credit, payments and productive economic activity, while carrying the risk between saver and borrower.',
    explanation: 'Commercial banking combines four functions: deposit-taking, lending, payment facilitation and system-level money creation.',
    practicalExample: 'Vietcombank, BIDV and VietinBank are deposit-taking commercial banks: households and firms place deposits, borrowers receive credit and customers move money through the bank.',
    keyTerms: ['Commercial bank', 'Deposit-taking', 'Payment facilitation'],
    sourceRefs: [
      ref('cb-m1-l11-ch01', 'A commercial bank is a licensed intermediary that turns deposits into credit, payments and productive economic activity while carrying the risk between saver and borrower.'),
      ref('cb-m1-l11-ch01', 'Commercial banking combines deposit-taking, lending, payment facilitation and system-level money creation.'),
      ref('cb-m1-l11-ch01', 'Vietcombank, BIDV and VietinBank are examples of deposit-taking commercial banks.'),
    ],
  }),
  card({
    cardId: 'cbf-financial-intermediation',
    chapterId: 'cb-m1-l11-ch01',
    front: 'Define financial intermediation.',
    back: 'Pooling funds from savers and allocating them to borrowers while managing risk.',
    explanation: 'The bank pools deposits, assesses borrowers, creates a loan asset and credits deposit money to the borrower, so individual savers do not have to assess each borrower themselves.',
    practicalExample: 'Thousands of households have spare cash while one business needs a large loan for a new factory. The bank connects them without asking every saver to assess that business.',
    keyTerms: ['Financial intermediation'],
    sourceRefs: [
      ref('cb-m1-l11-ch01', 'Pooling funds from savers and allocating them to borrowers while managing risk.'),
      ref('cb-m1-l11-ch01', 'The bank pools deposits, assesses borrowers, creates a loan asset and credits deposit money to the borrower.'),
      ref('cb-m1-l11-ch01', 'A commercial bank connects them without asking every saver to assess that business.'),
    ],
  }),
  card({
    cardId: 'cbf-deposit-liability-loan-asset',
    chapterId: 'cb-m1-l11-ch01',
    front: 'On a bank’s balance sheet, is a customer deposit an asset or a liability? What about a loan?',
    back: 'A deposit is a liability: money the bank owes the customer. A loan is an asset. Neither balance is itself a profit; the bank earns only from the interest and fees the relationship generates.',
    explanation: 'Keeping balances separate from earnings avoids a common case-interview error: treating deposit or loan growth as if it were profit.',
    practicalExample: 'When a household places savings with a bank, the bank’s liabilities rise by that amount; the bank earns only from the interest and fees the relationship generates.',
    keyTerms: ['Deposit', 'Balance sheet'],
    sourceRefs: [
      ref('cb-m1-l11-ch01', 'Deposits are liabilities and loans are assets.'),
      ref('cb-m1-l11-ch01', 'Money owed by a bank to a customer; a liability on the bank’s balance sheet.'),
      ref('cb-m1-l11-ch01', 'The balance sheet expands; the bank has not created profit. Profit arrives only if interest and fees exceed funding cost, operating cost and credit losses.'),
    ],
  }),
  card({
    cardId: 'cbf-credit-creation',
    chapterId: 'cb-m1-l11-ch01',
    front: 'What happens on the balance sheet when a bank approves a loan, and is that profit?',
    back: 'The bank records an asset (the borrower’s obligation) and a matching deposit liability. The balance sheet expands, but no profit has been created.',
    explanation: 'Profit arrives only if interest and fees exceed funding cost, operating cost and credit losses. Credit creation also stays within capital, liquidity and central-bank constraints.',
    practicalExample: 'A borrower who receives a new loan gains spending power, but also a debt. For the bank, the loan pays off only if it is repaid and priced above its costs and losses.',
    keyTerms: ['Credit creation'],
    sourceRefs: [
      ref('cb-m1-l11-ch01', 'When a bank approves a loan, it records an asset—the borrower’s obligation—and a matching deposit liability.'),
      ref('cb-m1-l11-ch01', 'Profit arrives only if interest and fees exceed funding cost, operating cost and credit losses.'),
      ref('cb-m1-l11-ch01', 'The creation of deposit money when a bank extends a loan, within regulatory constraints.'),
      ref('cb-m1-l11-ch01', 'The borrower has spending power, but also a debt.'),
    ],
  }),
  card({
    cardId: 'cbf-liquidity-transformation',
    chapterId: 'cb-m1-l11-ch02',
    front: 'What is liquidity transformation?',
    back: 'Offering withdrawable funding while holding assets that cannot be converted to cash immediately.',
    explanation: 'It gives depositors accessible money while borrowers receive longer-term finance. The same mismatch that creates value also creates fragility.',
    practicalExample: 'Depositors can withdraw at short notice, but the loans their deposits fund repay slowly. If confidence breaks, withdrawals can arrive faster than loans can be collected.',
    keyTerms: ['Liquidity transformation'],
    sourceRefs: [
      ref('cb-m1-l11-ch02', 'Offering withdrawable funding while holding assets that cannot be converted to cash immediately.'),
      ref('cb-m1-l11-ch02', 'Liquidity transformation gives depositors accessible money while borrowers receive longer-term finance.'),
      ref('cb-m1-l11-ch02', 'A confidence shock can trigger withdrawals faster than loans can be collected.'),
    ],
  }),
  card({
    cardId: 'cbf-maturity-transformation',
    chapterId: 'cb-m1-l11-ch02',
    front: 'What is maturity transformation?',
    back: 'Funding longer-term assets with shorter-term liabilities: borrowing short and lending long.',
    explanation: 'Maturity transformation is part of the bank’s business model and part of its vulnerability: a confidence shock can trigger withdrawals faster than loans can be collected, so liquid assets and supervision of risk-taking must accompany it.',
    practicalExample: 'Short-term deposits fund multi-year loans. The mismatch is part of how the bank creates value, but it must manage the gap between when funding can leave and when loans repay.',
    keyTerms: ['Maturity transformation'],
    sourceRefs: [
      ref('cb-m1-l11-ch02', 'Funding longer-term assets with shorter-term liabilities.'),
      ref('cb-m1-l11-ch02', 'Maturity transformation means borrowing short and lending long; both create value and fragility.'),
      ref('cb-m1-l11-ch02', 'That difference begins with the promise that deposits are available before long-term loans are repaid.'),
      ref('cb-m1-l11-ch02', 'A confidence shock can trigger withdrawals faster than loans can be collected. Capital absorbs losses, liquid assets meet outflows and supervision limits excessive risk-taking.'),
    ],
  }),
  card({
    cardId: 'cbf-capital-vs-liquidity',
    chapterId: 'cb-m1-l11-ch02',
    front: 'Capital versus liquidity: which one absorbs losses, and which one meets withdrawals?',
    back: 'Capital absorbs losses. Liquid assets meet outflows. Supervision limits excessive risk-taking.',
    explanation: 'Deposits fund assets but remain obligations to customers, so they are not capital. A bank can have abundant deposits yet too little capital to support more risky lending: funding capacity and solvency capacity are different questions.',
    practicalExample: 'A bank flush with new deposits still cannot keep expanding risky lending if its loss-absorbing capital is insufficient.',
    keyTerms: ['Capital adequacy', 'Liquidity'],
    sourceRefs: [
      ref('cb-m1-l11-ch02', 'Capital absorbs losses, liquid assets meet outflows and supervision limits excessive risk-taking.'),
      ref('cb-m1-l11-ch02', 'A bank can have abundant deposits yet insufficient capital to support more risky lending; funding capacity and solvency capacity are different questions.'),
    ],
  }),
  card({
    cardId: 'cbf-trust-and-bank-runs',
    chapterId: 'cb-m1-l11-ch02',
    front: 'Why is trust an operating input for a bank, not just a reputation issue?',
    back: 'Because funding depends on depositor confidence. A confidence shock can trigger withdrawals faster than loans can be collected: a bank run.',
    explanation: 'Bank profit and fragility both begin with the funding–asset mismatch, which is why licensing and prudential oversight sit alongside capital and liquidity.',
    practicalExample: 'A retailer can survive a slow day. A bank can fail in hours if every depositor asks for cash at once.',
    keyTerms: ['Bank run'],
    sourceRefs: [
      ref('cb-m1-l11-ch02', 'A retailer can survive a slow day. A bank can fail in hours if every depositor asks for cash at once.'),
      ref('cb-m1-l11-ch02', 'Rapid withdrawals caused by loss of confidence.'),
      ref('cb-m1-l11-ch02', 'Trust is an operating input because deposits can leave.'),
      ref('cb-m1-l11-ch02', 'Vietnamese commercial banks operate under SBV licensing and prudential oversight.'),
    ],
  }),
  card({
    cardId: 'cbf-industry-boundary-test',
    chapterId: 'cb-m1-l11-ch03',
    front: 'What is the clearest test for whether an institution is a commercial bank?',
    back: 'Licensed deposit-taking, combined with lending and transaction services on one regulated balance sheet.',
    explanation: 'Classify the institution first and the product second: ask who is licensed, who funds the activity and who carries the risk.',
    practicalExample: 'Vietcombank is a commercial bank, FE Credit is a consumer-finance company, and MoMo and ZaloPay are payment platforms. Overlapping products do not make their licences or balance sheets equivalent.',
    keyTerms: ['Industry boundary', 'Deposit-taking'],
    sourceRefs: [
      ref('cb-m1-l11-ch03', 'Deposit-taking is the clearest boundary test.'),
      ref('cb-m1-l11-ch03', 'For an industry case, classify the institution first and the product second.'),
      ref('cb-m1-l11-ch03', 'Who is licensed, who funds the activity and who carries the risk?'),
      ref('cb-m1-l11-ch03', 'Vietcombank is a commercial bank; FE Credit is a consumer-finance company; MoMo and ZaloPay are payment platforms. Product overlap does not make their licences or balance sheets equivalent.'),
    ],
  }),
  card({
    cardId: 'cbf-consumer-finance-company',
    chapterId: 'cb-m1-l11-ch03',
    front: 'How is a consumer-finance company funded differently from a commercial bank?',
    back: 'It is a non-bank lender funded through equity and wholesale liabilities rather than public deposits.',
    explanation: 'Consumer finance lends without public deposits, so its funding, risks and regulation differ from a deposit-taking bank even when the products look similar.',
    practicalExample: 'A finance company and a bank may both offer personal loans, but only the bank funds them from public deposits on a deposit-taking licence.',
    keyTerms: ['Consumer-finance company'],
    sourceRefs: [
      ref('cb-m1-l11-ch03', 'A non-bank lender funded through equity and wholesale liabilities rather than public deposits.'),
      ref('cb-m1-l11-ch03', 'Consumer finance lends without public deposits.'),
    ],
  }),
  card({
    cardId: 'cbf-product-families',
    chapterId: 'cb-m1-l11-ch04',
    front: 'Name the five banking product families in this lesson, and how they connect.',
    back: 'Deposits, loans, payments, trade finance and treasury services. Deposits fund the bank, loans deploy its balance sheet, and transaction, trade and treasury services deepen customer value and fee income.',
    explanation: 'Products work as one connected relationship rather than a catalogue: an account receives cash, payments move it, credit bridges timing gaps, and treasury or trade tools manage currency and contractual risk.',
    practicalExample: 'A company that receives customer cash today but pays suppliers next month needs more than a loan: it may need collections, FX, payroll, guarantees and a place to hold liquidity.',
    keyTerms: ['Deposits', 'Loans', 'Payments', 'Trade finance', 'Treasury services'],
    sourceRefs: [
      ref('cb-m1-l11-ch04', 'Deposits, loans, payments, trade finance and treasury services.'),
      ref('cb-m1-l11-ch04', 'Banking products form a connected relationship: deposits fund the bank, loans deploy its balance sheet, and transaction, trade and treasury services deepen customer value and fee income.'),
      ref('cb-m1-l11-ch04', 'A company that receives customer cash today but pays suppliers next month needs more than a loan. It may need collections, FX, payroll, guarantees and a place to hold liquidity.'),
    ],
  }),
  card({
    cardId: 'cbf-letter-of-credit',
    chapterId: 'cb-m1-l11-ch04',
    front: 'What is a letter of credit?',
    back: 'A bank undertaking used to support payment in a trade transaction.',
    explanation: 'Letters of credit belong to trade finance, which reduces payment and performance risks in commerce.',
    practicalExample: 'Corporate banks commonly combine working-capital loans with cash management, letters of credit, guarantees and FX for clients trading across borders.',
    keyTerms: ['Letter of credit', 'Trade finance'],
    sourceRefs: [
      ref('cb-m1-l11-ch04', 'A bank undertaking used to support payment in a trade transaction.'),
      ref('cb-m1-l11-ch04', 'Trade finance reduces payment and performance risks in commerce.'),
      ref('cb-m1-l11-ch04', 'Corporate banks commonly combine working-capital loans with cash management, letters of credit, guarantees and FX for clients trading across borders.'),
    ],
  }),
  card({
    cardId: 'cbf-primary-account-value',
    chapterId: 'cb-m1-l11-ch04',
    front: 'Why is being a business’s primary account commercially valuable to a bank?',
    back: 'Running payroll, collections and supplier payments shows the bank regular cash flows. That can create low-cost balances and fee income, and the better information supports credit assessment.',
    explanation: 'The advantage comes from responsible relationship depth, not forced bundling.',
    practicalExample: 'A bank that runs a company’s payroll and supplier payments can give a more useful liquidity view, and is better placed to assess that company for working-capital credit.',
    keyTerms: ['Primary account', 'Cash management'],
    sourceRefs: [
      ref('cb-m1-l11-ch04', 'A bank that runs payroll, collections and supplier payments sees regular cash flows and can provide a more useful liquidity view.'),
      ref('cb-m1-l11-ch04', 'That activity can create low-cost balances and fee income, while better information supports credit assessment.'),
    ],
  }),
  card({
    cardId: 'cbf-customer-segments',
    chapterId: 'cb-m1-l11-ch05',
    front: 'Name the three core commercial-bank customer segments and how each is typically served.',
    back: 'Retail: high-volume and standardised. SME: financial data combined with relationship judgement. Corporate and institutional: tailored structures, covenants and specialist teams.',
    explanation: 'Segmentation determines product design, risk assessment, distribution and cost-to-serve. Any segment can deposit, borrow and transact.',
    practicalExample: 'An SME may have less formal reporting, depend heavily on its owner and need fast working-capital decisions, while a large corporate may have audited accounts, multiple entities and specialist treasury staff.',
    keyTerms: ['Retail banking', 'SME banking', 'Corporate banking'],
    sourceRefs: [
      ref('cb-m1-l11-ch05', 'Retail is high-volume and standardised; SME banking combines financial data with relationship judgement; corporate banking uses tailored structures, covenants and specialist teams.'),
      ref('cb-m1-l11-ch05', 'Segmentation determines product design, risk assessment, distribution and cost-to-serve.'),
      ref('cb-m1-l11-ch05', 'An SME may have less formal reporting, depend heavily on its owner and need fast working-capital decisions.'),
    ],
  }),
];

export const COMMERCIAL_BANKING_FUNDAMENTALS: FlashcardDeckContent = {
  deckId: DECK_ID,
  title: 'Commercial Banking Fundamentals',
  description: 'Intermediation, deposits and lending, credit creation, liquidity transformation, products and customers.',
  industryId: INDUSTRY_ID,
  industryLabel: 'Commercial Banking',
  moduleId: MODULE_ID,
  moduleLabel: 'Module 01',
  lessonId: LESSON_ID,
  lessonTitle: '1.1 Industry Definition & Scope',
  source: {
    file: FILE,
    moduleKey: 'COMMERCIAL_BANKING_MODULE01',
    lessonTitle: '1.1 Industry Definition & Scope',
    startMarker: "const L11 = '1.1 Industry Definition & Scope';",
    endMarker: "const L12 = '1.2 Industry History & Development';",
    chapterMarker: 'bankingChapter({',
    readAtSha256: '8fc1179449d733280179148df4856f7423b8e1c84610f2aacc2c0c02ff6fd3fe',
    readAt: '2026-11-07',
  },
  chapters: CHAPTERS,
  cards: CARDS,
  contentStatus: 'Draft / Ready for Review',
  mappingNotes: [
    'Chapter IDs follow the source quiz prefix `cb-m1-l11` plus the lesson-local chapter number the existing app uses (question moduleId 1–5 = deck index 0–4).',
    'Lesson 1.1 has no `restriction` notice and no entry in reviewHolds.ts at read time; the module itself carries COMMERCIAL_BANKING_REVIEW_STATUS "Draft / Ready for Review", mirrored here as contentStatus.',
    'Statistics in the chapter (e.g. the ~87% payment-account figure and the Basel 8% minimum) are deliberately not used on cards.',
    'industryId is the app category ID `banking-commercial` (INDUSTRY_CATEGORIES in App.tsx), the first part of the lesson identity; Practice & Review requires it to match. Card and deck IDs do not depend on it.',
  ],
};
