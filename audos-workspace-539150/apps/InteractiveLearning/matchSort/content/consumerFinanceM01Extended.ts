// Consumer Finance Module 01, lessons 2 to 5 activities (source: consumerFinanceModule01.tsx).
// The original Consumer Finance pack (consumerFinanceM01.ts) keeps its activities and IDs unchanged.
// Every activity here draws only on what the chapters state; no figures, dates or legal thresholds.

import type { MatchSortActivity, MatchSortPack } from '../types';
import { chapterRef, defineActivities } from './shared';
import { SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'CONSUMER_FINANCE_MODULE01' as const;
const L2 = 'Industry History & Development';
const L3 = 'Global Market Overview';
const L4 = 'Vietnam Market Overview';
const L5 = 'Industry Drivers & External Factors';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const activities: MatchSortActivity[] = defineActivities('banking-consumer-finance', 'module-01', [
  {
    activityId: 'cf-m01-sort-lending-eras',
    type: 'category-sorting',
    title: 'Which stage of consumer-credit development?',
    learningObjective: 'Place the features of consumer credit into the stage of development that introduced them: relationship lending, standardised information-driven lending, cards and revolving credit, and digital lending.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Each stage added a capability: standard policy and credit information made decisions repeatable, cards made credit reusable, and digital tools changed speed and reach. Sound decisions, secure data and customer trust remain the foundation.',
    categories: [
      { id: 'relationship', label: 'Relationship and paper-based lending', description: 'Credit decided case by case from local relationships and documents, so scale stayed limited.' },
      { id: 'standardised', label: 'Standardised, information-driven lending', description: 'Providers compare applicants consistently instead of relying on personal judgement.' },
      { id: 'revolving', label: 'Cards and revolving credit', description: 'A new product design: an ongoing facility rather than a one-off loan.' },
      { id: 'digital', label: 'Digital lending', description: 'Technology changes the speed, reach and cost of each step.' },
    ],
    items: [
      { id: 'branch-lending', text: 'Lending through branches, using employer or community knowledge', categoryId: 'relationship', explanation: 'Early models relied on branches and local knowledge of the customer, which limited scale.', hint: 'Which stage depended on knowing the customer personally?', misplaced: { standardised: 'Standardised lending reduced reliance on personal knowledge by using documented policy and records.' } },
      { id: 'manual-assessment', text: 'Manual assessment on paper evidence', categoryId: 'relationship', explanation: 'Assessment was manual and document-heavy, so scale was limited by local information and manual operations.', hint: 'Think of forms assessed by hand.' },
      { id: 'retailer-plans', text: 'Payment plans managed and recorded by the retailer', categoryId: 'relationship', explanation: 'Retailers ran their own instalment arrangements and decided repeat credit using the customer\u2019s earlier relationship.', hint: 'The seller, not a specialist lender, kept the records.' },
      { id: 'credit-file', text: 'Credit files and credit-bureau reports', categoryId: 'standardised', explanation: 'Credit reporting let providers compare applicants beyond individual relationships, with duties for data quality, authorised use, correction and security.', hint: 'It is shared information about how people have repaid before.' },
      { id: 'documented-rules', text: 'Documented eligibility rules applied the same way each time', categoryId: 'standardised', explanation: 'Common application fields and documented rules made decisions more repeatable.', hint: 'The decision no longer depends on who happens to be dealing with the applicant.' },
      { id: 'portfolio-monitoring', text: 'Monitoring a whole portfolio of accounts, not just single relationships', categoryId: 'standardised', explanation: 'Standard policies and account records allowed providers to manage portfolios beyond individual relationships.', hint: 'The provider now watches the whole book of accounts.' },
      { id: 'credit-limit', text: 'A credit limit that can be used again as repayments are made', categoryId: 'revolving', explanation: 'Cards turned credit from a single purchase or loan into reusable access governed by a limit.', hint: 'Credit that is available again after it is repaid.', misplaced: { digital: 'A revolving limit is a product design that does not depend on the channel.' } },
      { id: 'statement-cycle', text: 'A statement showing a balance, a minimum due and a due date', categoryId: 'revolving', explanation: 'Cards and revolving facilities work through a statement cycle and repayment rules, so the customer sees the balance, minimum due, due date, fees and interest.', hint: 'A regular document tells the customer what is owed and when.' },
      { id: 'restored-credit', text: 'Available credit restored after a repayment, where terms permit', categoryId: 'revolving', explanation: 'The provider receives repayments and restores available credit where the contract allows, which is what makes the facility reusable.', hint: 'Repaying does more than reduce the debt: it changes what can be used next.' },
      { id: 'electronic-identity', text: 'Remote identity and fraud checks at application', categoryId: 'digital', explanation: 'Digital processing can verify identity and screen for fraud remotely, supporting discovery, verification, decision and contracting.', hint: 'The applicant never has to visit an office.' },
      { id: 'automated-with-review', text: 'Automated decisions, with uncertain cases sent to a trained reviewer', categoryId: 'digital', explanation: 'Automated systems support decisions, while exceptions and adverse outcomes still require accountable review.', hint: 'A system decides most cases, and a person handles the doubtful ones.', misplaced: { standardised: 'Documented rules existed before automation. Routing uncertain cases from an automated process to a reviewer is a feature of digital processing.' } },
      { id: 'embedded-offer', text: 'An instalment offer presented inside an online checkout', categoryId: 'digital', explanation: 'Embedded lending places the offer inside another journey, so the customer must still know who the lender is.', hint: 'The credit offer appears where the customer is already shopping.' },
    ],
    sourceRefs: [
      ch(L2, 0, 'How Did Modern Consumer Credit Emerge?', ['bisCredit', 'oecdConsumer'], 'Dimensions branch lending, manual assessment and paper record; early models relied on branches, community knowledge and retailer-managed plans.'),
      ch(L2, 1, 'How Did Standardisation and Credit Information Change Lending?', ['bisCredit', 'cic', 'vnData'], 'Dimensions credit file, credit bureau, repeatable decision and portfolio monitoring.'),
      ch(L2, 2, 'How Did Cards and Revolving Credit Expand Choice?', ['oecdConsumer', 'vnCreditLaw', 'vnElectronic'], 'Dimensions revolving facility, credit limit, minimum payment and statement; the provider restores available credit where terms permit.'),
      ch(L2, 3, 'How Is Digitalisation Transforming Consumer Finance?', ['nistAI', 'nistCSF', 'vnData', 'vnElectronic', 'vnCyber'], 'Dimensions electronic identity, automated underwriting, embedded lending; uncertain cases routed to a trained reviewer.'),
    ],
  },
  {
    activityId: 'cf-m01-sort-volume-vs-quality',
    type: 'category-sorting',
    title: 'Volume of credit, or health of credit?',
    learningObjective: 'Separate measures of demand and lending volume from measures of capacity and healthy credit, so growth is not mistaken for sound performance.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Application demand, approvals, disbursements and balances describe volume. Capacity to repay and healthy repayment describe whether that credit is sustainable. Portfolio performance depends on the quality of demand, not on volume alone.',
    categories: [
      { id: 'volume', label: 'Demand and volume', description: 'Activity: how much is wanted, spent, approved, lent or outstanding.' },
      { id: 'health', label: 'Credit quality', description: 'Whether borrowers can carry the credit and it performs as agreed.' },
    ],
    items: [
      { id: 'application-demand', text: 'Application demand', categoryId: 'volume', explanation: 'Applications show how much credit is wanted, which is influenced by income, prices, rates and confidence. They do not show repayment.', hint: 'It counts how many people ask, not how many repay.', misplaced: { health: 'Applications measure wanting credit. They say nothing yet about ability to repay.' } },
      { id: 'approvals-disbursements', text: 'Approvals and disbursements', categoryId: 'volume', explanation: 'They show how much credit the provider has actually granted and lent, which is still a measure of volume.', hint: 'It counts credit granted and paid out.' },
      { id: 'outstanding-balances', text: 'Outstanding balances', categoryId: 'volume', explanation: 'Balances show the stock of credit owed. They can be large whether the credit is performing or not.', hint: 'It is how much is owed in total.' },
      { id: 'consumption-growth', text: 'Growth in household consumption', categoryId: 'volume', explanation: 'Consumption growth shows activity but is not the same as healthy credit.', hint: 'It shows households spending more, which does not tell you who can repay.', misplaced: { health: 'The lesson says to distinguish consumption growth from healthy credit.' } },
      { id: 'borrowing-need', text: 'A household\u2019s need to borrow', categoryId: 'volume', explanation: 'Need is why customers come to the provider. Need is not the same as the capacity to repay.', hint: 'It describes why someone wants credit, not whether they can carry it.' },
      { id: 'repayment-capacity', text: 'Capacity to meet existing and new obligations', categoryId: 'health', explanation: 'Income, employment and essential expenditure determine whether obligations can be met. It must be assessed separately from need.', hint: 'It depends on income and what must be spent on essentials.', misplaced: { volume: 'Capacity is the ability to repay. It is separate from the need that leads someone to borrow.' } },
      { id: 'healthy-repayment', text: 'Healthy repayment', categoryId: 'health', explanation: 'Repayment that continues as agreed is what makes credit sustainable, unlike balances that merely exist.', hint: 'It shows credit performing as agreed.' },
      { id: 'cohort-evidence', text: 'Product- and cohort-level evidence on missed payments', categoryId: 'health', explanation: 'Use product- and cohort-level evidence to see where repayment stress is building, instead of relying on volume totals.', hint: 'It looks at how particular groups and products are repaying.' },
    ],
    sourceRefs: [
      ch(L3, 1, 'What Drives Consumer Credit Demand and Growth?', ['worldBankFindex', 'bisCredit', 'ifcResponsible'], 'Key insight on demand versus sustainable growth, and the instruction to separate application demand from approvals, disbursements, outstanding balances and healthy repayment.'),
      ch(L5, 0, 'How Do Household Economics Affect Consumer Finance?', ['bisCredit', 'worldBankFindex', 'ifcResponsible'], 'Key insight that performance depends on quality of demand, and the instruction to distinguish borrowing need from capacity and consumption growth from healthy credit.'),
    ],
  },
  {
    activityId: 'cf-m01-sort-lender-vs-partner',
    type: 'category-sorting',
    title: 'Authorised lender or partner?',
    learningObjective: 'Assign each responsibility in a retail or fintech partnership to the authorised lender or to the partner, so customers know who is accountable for the credit.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'The boundary of the industry follows responsibility for the credit product, not the screen or brand through which the customer meets it. The partner presents; the authorised provider verifies, decides, contracts, funds and oversees servicing.',
    categories: [
      { id: 'lender', label: 'Authorised lender', description: 'The licensed provider that owns the credit product.' },
      { id: 'partner', label: 'Retail or fintech partner', description: 'A retailer, platform or vendor that supports the journey under a defined role.' },
    ],
    items: [
      { id: 'presents-application', text: 'Presents the offer and transmits the application', categoryId: 'partner', explanation: 'The partner presents or transmits an application; it does not make the credit decision.', hint: 'It is the front door the customer sees, and it passes the application on.', misplaced: { lender: 'Showing the offer is the partner\u2019s role. The lender then takes the application forward.' } },
      { id: 'introduces-customers', text: 'Introduces customers to the credit product', categoryId: 'partner', explanation: 'Retail and platform partners may introduce customers without becoming the lender.', hint: 'It brings customers to the product but does not own the credit.' },
      { id: 'supplies-technology', text: 'Provides technology or supports payments', categoryId: 'partner', explanation: 'Technology and payment partners support the stages under defined contracts and oversight.', hint: 'It supplies tools and processing rather than accountability for the account.' },
      { id: 'verifies-decides', text: 'Verifies the applicant and makes the credit decision', categoryId: 'lender', explanation: 'The lender controls product and credit decisions and must verify and decide.', hint: 'It decides whether credit is granted.', misplaced: { partner: 'Partners may transmit the application, but the authorised provider verifies and decides.' } },
      { id: 'contracts-funds', text: 'Contracts with the customer and funds the credit', categoryId: 'lender', explanation: 'The authorised provider contracts, funds and remains accountable for the account.', hint: 'It signs the agreement and puts up the money.' },
      { id: 'oversees-servicing', text: 'Oversees servicing and remains accountable for the account', categoryId: 'lender', explanation: 'Accountability continues after disbursement: servicing, collections, complaints and reporting remain with the provider.', hint: 'It stays responsible for the account after the money has been paid out.' },
    ],
    sourceRefs: [
      ch(L4, 2, 'Who Participates in Vietnam Consumer Finance?', ['sbvInstitutions', 'vnCreditLaw', 'vnData'], 'Key insight on participants; the lender controls product and credit decisions while partners may introduce customers, provide technology or support payments.'),
      ch(L4, 3, 'How Do Retail and Fintech Partnerships Work?', ['vnCreditLaw', 'vnElectronic', 'vnData', 'oecdConsumer'], 'The partner presents or transmits an application; the authorised provider verifies, decides, contracts, funds and oversees servicing.'),
    ],
  },
]);

export const CONSUMER_FINANCE_M01_EXTENDED_PACK: MatchSortPack = {
  packId: 'consumer-finance-m01-lessons-2-5',
  title: 'Consumer Finance · Module 01 practice (Lessons 2–5)',
  industryId: 'banking-consumer-finance',
  moduleId: 'module-01',
  sourceModuleKey: MODULE,
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked “Draft / Ready for Review”. These activities use only definitions and mechanisms stated in the chapters: no figures, dates or legal thresholds.',
    'Consumer Finance has no entry in reviewHolds.ts at the time of writing; availability is re-checked at runtime against the decks after review holds are applied.',
  ],
  activities,
};
