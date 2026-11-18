// Consumer Finance Fundamentals — drawn read-only from Consumer Finance Module 01, Lesson 1
// "Industry Definition & Scope" (apps/IndustryKnowledge/consumerFinanceModule01.tsx). Key-term
// definitions come from the module's shared definitions in consumerFinanceCore.tsx, which is where
// the lesson's own key-term panel reads them. Generic fallback definitions are never used.

import type { ChapterRef, FlashcardContent, FlashcardDeckContent, SourceRef } from '../models';

const FILE = 'apps/IndustryKnowledge/consumerFinanceModule01.tsx';
const CORE_FILE = 'apps/IndustryKnowledge/consumerFinanceCore.tsx';
const DECK_ID = 'consumer-finance-fundamentals';
const INDUSTRY_ID = 'banking-consumer-finance';
const MODULE_ID = 'consumer-finance-m1';
const LESSON_ID = 'consumer-finance-m1-l1';

const CHAPTERS: ChapterRef[] = [
  { chapterId: 'consumer-finance-m1-l1-ch01', number: 1, title: 'What Is Consumer Finance?', sourceTitle: 'What Is Consumer Finance?' },
  { chapterId: 'consumer-finance-m1-l1-ch02', number: 2, title: 'What Makes Consumer Finance Unique?', sourceTitle: 'What Makes Consumer Finance Unique?' },
  { chapterId: 'consumer-finance-m1-l1-ch03', number: 3, title: 'Where Does Consumer Finance Begin and End?', sourceTitle: 'Where Does Consumer Finance Begin and End?' },
  { chapterId: 'consumer-finance-m1-l1-ch04', number: 4, title: 'Understanding Consumer Finance Products and Services', sourceTitle: 'Understanding Consumer Finance Products and Services' },
  { chapterId: 'consumer-finance-m1-l1-ch05', number: 5, title: 'Who Uses Consumer Finance and Why?', sourceTitle: 'Who Uses Consumer Finance and Why?' },
];

const CITATIONS: Record<string, string[]> = {
  'consumer-finance-m1-l1-ch01': ['oecdConsumer', 'ifcResponsible', 'vnCreditLaw', 'sbvInstitutions'],
  'consumer-finance-m1-l1-ch02': ['oecdConsumer', 'ifcResponsible', 'bisCredit', 'vnData'],
  'consumer-finance-m1-l1-ch03': ['vnCreditLaw', 'sbvInstitutions', 'vnElectronic', 'vnData'],
  'consumer-finance-m1-l1-ch04': ['vnCreditLaw', 'sbvInstitutions', 'cic', 'oecdConsumer'],
  'consumer-finance-m1-l1-ch05': ['worldBankFindex', 'ifcResponsible', 'oecdConsumer', 'cic'],
};

const ref = (chapterId: string, excerpt: string): SourceRef => ({ file: FILE, chapterId, excerpt, citationIds: CITATIONS[chapterId] });
const definition = (chapterId: string, excerpt: string): SourceRef => ({ file: CORE_FILE, chapterId, excerpt });

type CardInput = Omit<FlashcardContent, 'deckId' | 'industryId' | 'moduleId' | 'lessonId'>;
const card = (input: CardInput): FlashcardContent => ({ deckId: DECK_ID, industryId: INDUSTRY_ID, moduleId: MODULE_ID, lessonId: LESSON_ID, ...input });

const CARDS: FlashcardContent[] = [
  card({
    cardId: 'cff-consumer-finance-scope',
    chapterId: 'consumer-finance-m1-l1-ch01',
    front: 'What does Consumer Finance cover, and what is it distinct from?',
    back: 'Financial products and services that help individuals and households manage purchases, timing gaps and longer-term needs. It is distinct from corporate finance and investment-focused wealth management.',
    explanation: 'Consumer Finance connects household needs with authorized credit products, funding, risk assessment and repayment, while balancing access, responsible lending, credit quality and sustainable economics.',
    practicalExample: 'A customer uses an unsecured personal loan for an essential household purchase after the provider evaluates eligibility, affordability, fraud and repayment risk.',
    keyTerms: ['Consumer Finance', 'Personal lending'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch01', 'Consumer Finance covers financial products and services that help individuals and households manage purchases, timing gaps and longer-term needs; it is distinct from corporate finance and investment-focused wealth management.'),
      ref('consumer-finance-m1-l1-ch01', 'Consumer Finance connects household needs with authorized credit products, funding, risk assessment and repayment while balancing access, responsible lending, credit quality and sustainable economics.'),
      ref('consumer-finance-m1-l1-ch01', 'A customer uses an unsecured personal loan for an essential household purchase after the provider evaluates eligibility, affordability, fraud and repayment risk.'),
    ],
  }),
  card({
    cardId: 'cff-instalment-credit',
    chapterId: 'consumer-finance-m1-l1-ch01',
    front: 'What is instalment credit?',
    back: 'Credit repaid through a defined series of scheduled payments.',
    explanation: 'An instalment product has a fixed purchase, amount and schedule, unlike a reusable revolving facility.',
    practicalExample: 'A smartphone bought on instalments has a fixed purchase price, amount and repayment schedule.',
    keyTerms: ['Instalment credit', 'Retail instalment'],
    sourceRefs: [
      definition('consumer-finance-m1-l1-ch01', 'Credit repaid through a defined series of scheduled payments.'),
      ref('consumer-finance-m1-l1-ch01', "['Household need','Personal lending','Instalment credit','Revolving credit','Affordability assessment']"),
      ref('consumer-finance-m1-l1-ch04', 'A smartphone instalment has a fixed purchase, amount and schedule, while a credit card is reusable revolving credit with different limit, payment and interest mechanics.'),
    ],
  }),
  card({
    cardId: 'cff-revolving-credit',
    chapterId: 'consumer-finance-m1-l1-ch01',
    front: 'What is revolving credit?',
    back: 'A facility that can be borrowed, repaid and reused within agreed limits and terms.',
    explanation: 'Revolving credit changes consumer credit from a single purchase or loan into reusable access governed by a limit, with its own payment and interest mechanics.',
    practicalExample: 'A credit card is reusable revolving credit: the limit, payment and interest mechanics differ from a fixed smartphone instalment plan.',
    keyTerms: ['Revolving credit', 'Credit card'],
    sourceRefs: [
      definition('consumer-finance-m1-l1-ch01', 'A facility that can be borrowed, repaid and reused within agreed limits and terms.'),
      ref('consumer-finance-m1-l1-ch01', "['Household need','Personal lending','Instalment credit','Revolving credit','Affordability assessment']"),
      ref('consumer-finance-m1-l1-ch04', 'A smartphone instalment has a fixed purchase, amount and schedule, while a credit card is reusable revolving credit with different limit, payment and interest mechanics.'),
    ],
  }),
  card({
    cardId: 'cff-affordability-assessment',
    chapterId: 'consumer-finance-m1-l1-ch01',
    front: 'What is an affordability assessment?',
    back: 'An evaluation of income, essential expenditure, existing obligations and payment capacity, before and during a credit relationship.',
    explanation: 'It is why the same request can lead to different outcomes: affordability depends on each applicant’s verified circumstances, not on the amount requested.',
    practicalExample: 'Two applicants requesting the same amount can receive different limits because their verified income, essential expenditure, existing obligations and repayment history differ.',
    keyTerms: ['Affordability assessment'],
    sourceRefs: [
      definition('consumer-finance-m1-l1-ch01', 'Evaluation of income, essential expenditure, existing obligations and payment capacity before and during a credit relationship.'),
      ref('consumer-finance-m1-l1-ch01', "['Household need','Personal lending','Instalment credit','Revolving credit','Affordability assessment']"),
      ref('consumer-finance-m1-l1-ch02', 'Two applicants requesting the same amount can receive different limits because verified income, essential expenditure, existing obligations and repayment history differ.'),
    ],
  }),
  card({
    cardId: 'cff-credit-vs-cash-sale',
    chapterId: 'consumer-finance-m1-l1-ch02',
    front: 'What makes consumer credit different from a cash sale?',
    back: 'It commits future household income, uses personal and credit information, and requires decisions about suitability, affordability, pricing, servicing and treatment when circumstances change.',
    explanation: 'Consumer Finance joins a consumer-protection relationship to a risk-bearing financial contract: access is valuable only when terms are understood and repayment remains manageable.',
    practicalExample: 'A cash purchase ends at the till. A financed purchase continues through months of repayments, statements and support, and the provider must handle changes in the customer’s circumstances.',
    keyTerms: ['Household cash flow', 'Repayment uncertainty'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch02', 'Unlike a cash sale, consumer credit commits future household income, uses personal and credit information, and requires decisions about suitability, affordability, pricing, servicing and treatment when circumstances change.'),
      ref('consumer-finance-m1-l1-ch02', 'Consumer Finance joins a consumer-protection relationship to a risk-bearing financial contract: access is valuable only when terms are understood and repayment remains manageable.'),
    ],
  }),
  card({
    cardId: 'cff-responsible-lending-controls',
    chapterId: 'consumer-finance-m1-l1-ch02',
    front: 'Across which stages should responsible-lending, personal-data, disclosure and fair-treatment controls apply?',
    back: 'Across the whole lifecycle: design, sales, underwriting, servicing and collections.',
    explanation: 'Responsible lending means product, sales, underwriting, servicing and collection practices designed around suitability, affordability, transparency and fair treatment.',
    practicalExample: 'A provider that checks affordability at approval but pressures customers in collections is not lending responsibly; the controls must hold at every stage.',
    keyTerms: ['Responsible lending', 'Sensitive data'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch02', 'Apply responsible-lending, personal-data, disclosure and fair-treatment controls across design, sales, underwriting, servicing and collections.'),
      definition('consumer-finance-m1-l1-ch02', 'Product, sales, underwriting, servicing and collection practices designed around suitability, affordability, transparency and fair treatment.'),
    ],
  }),
  card({
    cardId: 'cff-boundary-responsibility',
    chapterId: 'consumer-finance-m1-l1-ch03',
    front: 'What decides who is the consumer-finance provider when an offer appears on someone else’s platform?',
    back: 'Responsibility for the credit product, not the screen or brand through which the customer discovers it.',
    explanation: 'Separate customer introduction, technology, payment processing, data handling and credit-decision roles across platform, retailer and licensed provider.',
    practicalExample: 'An e-commerce platform introduces an instalment offer, while an authorized financial institution decides, contracts, funds and remains accountable for the account.',
    keyTerms: ['Licensed provider', 'Credit decision'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch03', 'The boundary follows responsibility for the credit product—not the screen or brand through which the customer discovers it.'),
      ref('consumer-finance-m1-l1-ch03', 'Separate customer introduction, technology, payment processing, data handling and credit-decision roles across platform, retailer and licensed provider.'),
      ref('consumer-finance-m1-l1-ch03', 'An e-commerce platform introduces an instalment offer, while an authorized financial institution decides, contracts, funds and remains accountable for the account.'),
    ],
  }),
  card({
    cardId: 'cff-credit-lifecycle',
    chapterId: 'consumer-finance-m1-l1-ch03',
    front: 'Where does the consumer-credit lifecycle begin, and when does it end?',
    back: 'It begins with product design, funding and customer acquisition, runs through application, credit decision, agreement and disbursement, and ends only after servicing, repayment, recovery, complaints and required reporting are complete.',
    explanation: 'Disbursement is the middle of the lifecycle, not the end: servicing and repayment are part of the industry.',
    practicalExample: 'A loan that has been paid out still needs statements, repayment handling, support for complaints and, where needed, lawful recovery before the provider’s responsibility ends.',
    keyTerms: ['Servicing', 'Collections'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch03', 'The industry begins with product design, funding and customer acquisition, continues through application, credit decision, agreement and disbursement, and ends only after servicing, repayment, recovery, complaints and required reporting are complete.'),
    ],
  }),
  card({
    cardId: 'cff-partners-are-not-lenders',
    chapterId: 'consumer-finance-m1-l1-ch03',
    front: 'What role can a technology, retail or payment partner play in a consumer-credit journey, and what does that role not make it?',
    back: 'It may support stages of the lifecycle, such as customer introduction, technology or payment processing, without becoming the lender.',
    explanation: 'The authorized provider that decides, contracts, funds and remains accountable for the account is the lender, whoever introduced the customer.',
    practicalExample: 'A retailer that shows an instalment option at checkout introduces the customer; the licensed finance provider makes the credit decision and owns the account.',
    keyTerms: ['Technology partner', 'Licensed provider'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch03', 'Technology, retail and payment partners may support these stages without becoming the lender.'),
      ref('consumer-finance-m1-l1-ch03', 'Separate customer introduction, technology, payment processing, data handling and credit-decision roles across platform, retailer and licensed provider.'),
      ref('consumer-finance-m1-l1-ch03', 'An e-commerce platform introduces an instalment offer, while an authorized financial institution decides, contracts, funds and remains accountable for the account.'),
    ],
  }),
  card({
    cardId: 'cff-core-products',
    chapterId: 'consumer-finance-m1-l1-ch04',
    front: 'Name the core Consumer Finance products.',
    back: 'Unsecured personal loans, cards and revolving facilities, vehicle or asset-linked finance, and retail instalments.',
    explanation: 'Consumer Finance is not one market: product purpose, collateral, facility design, term, total cost and repayment pattern create different customer and risk outcomes.',
    practicalExample: 'An unsecured personal loan and vehicle finance can both meet a household need, but collateral, term and repayment pattern differ, so the customer and risk outcomes differ too.',
    keyTerms: ['Personal loan', 'Credit card', 'Vehicle finance', 'Retail instalment'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch04', 'Core products include unsecured personal loans, cards and revolving facilities, vehicle or asset-linked finance and retail instalments.'),
      ref('consumer-finance-m1-l1-ch04', 'Consumer Finance is not one market: product purpose, collateral, facility design, term, total cost and repayment pattern create different customer and risk outcomes.'),
    ],
  }),
  card({
    cardId: 'cff-supporting-services',
    chapterId: 'consumer-finance-m1-l1-ch04',
    front: 'Which supporting services sit around consumer-credit products?',
    back: 'Identity checks, credit information, scoring, fraud controls, payment processing, statements, customer support and lawful collections.',
    explanation: 'These services carry the account from application through repayment and servicing; they are part of the product experience, not an afterthought.',
    practicalExample: 'After a card is issued, the customer still relies on statements, payment processing and customer support, and the provider on fraud controls and lawful collections.',
    keyTerms: ['Credit information', 'Account servicing'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch04', 'Supporting services include identity checks, credit information, scoring, fraud controls, payment processing, statements, customer support and lawful collections.'),
    ],
  }),
  card({
    cardId: 'cff-need-vs-capacity',
    chapterId: 'consumer-finance-m1-l1-ch05',
    front: 'Why must a customer’s need be assessed separately from their capacity to repay?',
    back: 'Customers use Consumer Finance for different jobs, and a genuine need does not prove they can repay. Approval is not proof of suitability or wellbeing.',
    explanation: 'Use verified income, essential expenses, existing obligations and credit information where authorized; accessible products still require conservative limits and understandable terms.',
    practicalExample: 'A salaried customer compares a personal loan and an instalment plan for an appliance using monthly payment, total cost, flexibility and budget impact.',
    keyTerms: ['Planned purchase', 'Emergency need', 'Cash-flow timing'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch05', 'Customers use Consumer Finance for different jobs, so a genuine need must be assessed separately from capacity to repay.'),
      ref('consumer-finance-m1-l1-ch05', 'Use can support access and resilience, but approval is not proof of suitability or wellbeing.'),
      ref('consumer-finance-m1-l1-ch05', 'Use verified income, essential expenses, existing obligations and credit information where authorized; accessible products still require conservative limits and understandable terms.'),
      ref('consumer-finance-m1-l1-ch05', 'A salaried customer compares a personal loan and instalment plan for an appliance using monthly payment, total cost, flexibility and budget impact.'),
    ],
  }),
  card({
    cardId: 'cff-financial-inclusion',
    chapterId: 'consumer-finance-m1-l1-ch05',
    front: 'In Consumer Finance, what does financial inclusion mean?',
    back: 'Access that can support resilience for people such as emerging borrowers with limited formal histories, while products keep conservative limits and understandable terms. It is not access to credit at any cost.',
    explanation: 'Access is valuable only when terms are understood and repayment remains manageable, so inclusion is judged by suitable, manageable use rather than by approvals.',
    practicalExample: 'Offering a thin-file borrower a small, clearly explained limit supports inclusion; approving a large limit without checking capacity does not.',
    keyTerms: ['Financial inclusion', 'Thin-file borrower'],
    sourceRefs: [
      ref('consumer-finance-m1-l1-ch05', "['Salaried worker','Thin-file borrower','Planned purchase','Emergency need','Cash-flow timing','Financial inclusion']"),
      ref('consumer-finance-m1-l1-ch05', 'emerging borrowers with limited formal histories. Use can support access and resilience'),
      ref('consumer-finance-m1-l1-ch05', 'accessible products still require conservative limits and understandable terms.'),
      ref('consumer-finance-m1-l1-ch02', 'access is valuable only when terms are understood and repayment remains manageable.'),
    ],
  }),
];

export const CONSUMER_FINANCE_FUNDAMENTALS: FlashcardDeckContent = {
  deckId: DECK_ID,
  title: 'Consumer Finance Fundamentals',
  description: 'Consumer lending, instalment and revolving credit, affordability, repayment and servicing.',
  industryId: INDUSTRY_ID,
  industryLabel: 'Consumer Finance',
  moduleId: MODULE_ID,
  moduleLabel: 'Module 01',
  lessonId: LESSON_ID,
  lessonTitle: 'Lesson 1 · Industry Definition & Scope',
  source: {
    file: FILE,
    moduleKey: 'CONSUMER_FINANCE_MODULE01',
    lessonTitle: 'Industry Definition & Scope',
    startMarker: "['Industry Definition & Scope',[",
    endMarker: "['Industry History & Development',[",
    chapterMarker: "i('",
    readAtSha256: 'e48c72984a0498bbc0bc5bdc9cf94ed8ea75a1003f5b77f828005574170e306a',
    readAt: '2026-11-07',
    supportingFiles: [
      {
        file: CORE_FILE,
        startMarker: 'const definitions:Record<string,string>={',
        endMarker: 'const terms=',
        readAtSha256: 'bc985b1dc3b81f34df97bc563ea24a33516f50c9412bd5a40ccec0ecce24ead4',
      },
    ],
  },
  chapters: CHAPTERS,
  cards: CARDS,
  contentStatus: 'No review status declared in the Consumer Finance source',
  mappingNotes: [
    'At read time Lesson 1 "Industry Definition & Scope" has exactly 5 chapters, matching the 5-chapter structure the QA/standardization work expects. No mismatch found; the source was not edited.',
    'Chapter IDs follow the source quiz prefix `consumer-finance-m1-l1` plus the lesson-local chapter number (question moduleId 1–5 = deck index 0–4). The existing visual kinds for these chapters are consumer-finance-m1-1 … consumer-finance-m1-5.',
    'Definitions for Instalment credit, Revolving credit, Affordability assessment and Responsible lending are the exact entries the chapter key-term panels render. The former card cff-credit-risk was retired in the 2026-11-08 integrity pass: its definition came from the shared table and is not displayed in any Consumer Finance chapter. Its ID is never reused. Financial inclusion is the sixth Chapter 5 dimension, so its shared definition is not rendered either; that card is grounded on the Chapter 5 text the learner reads instead.',
    'No Consumer Finance chapter is listed in reviewHolds.ts at read time.',
    'industryId is the app category ID `banking-consumer-finance` (INDUSTRY_CATEGORIES in App.tsx and RETAIL_SECTOR_CONTENT in retailSectors.ts), the first part of the lesson identity; Practice & Review requires it to match. Card and deck IDs do not depend on it.',
  ],
};
