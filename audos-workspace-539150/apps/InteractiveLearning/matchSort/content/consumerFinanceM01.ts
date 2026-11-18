import type { MatchSortPack } from '../types';
import { chapterRef, defineActivities } from './shared';

const MODULE = 'CONSUMER_FINANCE_MODULE01' as const;
const L1 = 'Industry Definition & Scope';
const L2 = 'Industry History & Development';
const L5 = 'Industry Drivers & External Factors';

const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const PAIR_INSTRUCTIONS = 'Select an item on the left, then select the item on the right that matches it. On a computer you can also drag a left item onto its match. Pair every item, then check your answers.';
const SORT_INSTRUCTIONS = 'Select an item, then choose the group it belongs to. On a computer you can also drag an item into a group. You can move items between groups until you check.';

const activities = defineActivities('banking-consumer-finance', 'module-01', [
  {
    activityId: 'cf-m01-match-terminology',
    type: 'concept-matching',
    title: 'Consumer finance terminology',
    learningObjective: 'Define the core terms used to describe consumer credit products, credit decisions and responsible lending.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Term',
    answerLabel: 'Definition',
    summary: 'Instalment and revolving credit are different structures. Affordability is one input to underwriting, alternative data may inform a decision only when it is permitted and governed, and responsible lending runs through the whole lifecycle.',
    items: {
      prompts: [
        { id: 'instalment-credit', text: 'Instalment credit' },
        { id: 'revolving-credit', text: 'Revolving credit' },
        { id: 'affordability-assessment', text: 'Affordability assessment' },
        { id: 'underwriting', text: 'Underwriting' },
        { id: 'alternative-data', text: 'Alternative data' },
        { id: 'responsible-lending', text: 'Responsible lending' },
      ],
      answers: [
        { id: 'def-instalment', text: 'Credit repaid through a defined series of scheduled payments.' },
        { id: 'def-revolving', text: 'A facility that can be borrowed, repaid and reused within agreed limits and terms.' },
        { id: 'def-affordability', text: 'Evaluation of income, essential expenditure, existing obligations and payment capacity before and during a credit relationship.' },
        { id: 'def-underwriting', text: 'Evaluating eligibility, affordability, fraud and repayment risk, then setting the limit, price and terms.' },
        { id: 'def-alternative-data', text: 'Information outside conventional credit files considered for a permitted decision under governance, relevance and quality controls.' },
        { id: 'def-responsible-lending', text: 'Product, sales, underwriting, servicing and collection practices designed around suitability, affordability, transparency and fair treatment.' },
      ],
    },
    pairs: [
      { id: 'pair-instalment', promptId: 'instalment-credit', answerId: 'def-instalment', explanation: 'Instalment credit has a fixed amount and schedule, like a smartphone financed through set payments. The agreement ends when the schedule is complete.', hint: 'This product has an end point that is known from the start.' },
      { id: 'pair-revolving', promptId: 'revolving-credit', answerId: 'def-revolving', explanation: 'A revolving facility such as a credit card restores available credit as it is repaid, within its limit and terms.', hint: 'This product can be used again after it is paid down.' },
      { id: 'pair-affordability', promptId: 'affordability-assessment', answerId: 'def-affordability', explanation: 'Affordability asks whether the customer can repay without hardship, using verified income, essential spending and existing obligations, both before lending and while the account is open.', hint: 'This assessment is about the customer’s capacity to pay, not the lender’s whole decision process.' },
      { id: 'pair-underwriting', promptId: 'underwriting', answerId: 'def-underwriting', explanation: 'Underwriting is the whole credit decision. Affordability is one input alongside eligibility, fraud and repayment risk, and the output includes the terms offered.', hint: 'This is the broader decision process. Capacity to pay is only one of its inputs.' },
      { id: 'pair-alternative-data', promptId: 'alternative-data', answerId: 'def-alternative-data', explanation: 'Data beyond the usual credit file can improve access and consistency only when it is permitted and reliable, with validation, monitoring and accountable human review around the decision.', hint: 'This is about evidence a lender may use beyond the usual credit record.' },
      { id: 'pair-responsible-lending', promptId: 'responsible-lending', answerId: 'def-responsible-lending', explanation: 'Responsible lending is an operating model across design, sales, underwriting, servicing and collections, not a disclosure added at the end.', hint: 'This term covers every stage of the relationship, from first design to the last collection call.' },
    ],
    sourceRefs: [
      ch(L1, 0, 'What Is Consumer Finance?', ['oecdConsumer', 'ifcResponsible'], 'Key terms “Instalment credit”, “Revolving credit” and “Affordability assessment”. Underwriting: the provider “evaluates eligibility, affordability, fraud and repayment risk”, and at approval the “Limit, price and terms set and disclosed”.'),
      ch(L1, 1, 'What Makes Consumer Finance Unique?', ['bisCredit', 'oecdConsumer'], 'Key term “Responsible lending”: “Product, sales, underwriting, servicing and collection practices designed around suitability, affordability, transparency and fair treatment.”'),
      ch(L5, 3, 'How Do Technology, Data and Cyber Risk Change Decisions?', ['nistAI', 'vnData'], 'Key term “Alternative data” and its definition; “Technology can improve access and consistency only when data is permitted and reliable”.'),
      ch(L5, 4, 'What Does Responsible Lending Require End to End?', ['oecdConsumer', 'ifcResponsible'], 'Responsible lending is an operating model spanning design, acquisition, underwriting, servicing and collections.'),
    ],
  },
  {
    activityId: 'cf-m01-sort-instalment-revolving',
    type: 'category-sorting',
    title: 'Instalment or revolving credit?',
    learningObjective: 'Distinguish instalment credit from revolving credit by how each is drawn, repaid and reused.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Instalment credit is a defined amount on a fixed schedule; revolving credit is reusable access governed by a limit, a statement cycle and repayment rules. They are alternative product structures, not stages.',
    categories: [
      { id: 'instalment', label: 'Instalment credit', description: 'A defined amount repaid through a series of scheduled payments.' },
      { id: 'revolving', label: 'Revolving credit', description: 'A limit that can be drawn, repaid and drawn again within agreed terms.' },
    ],
    items: [
      { id: 'smartphone-plan', text: 'A smartphone financed with a fixed amount and payment schedule', categoryId: 'instalment', explanation: 'The chapter’s own example: a smartphone instalment has a fixed purchase, amount and schedule.', hint: 'Is the amount fixed at the start, with a known end date?', misplaced: { revolving: 'A fixed purchase on a fixed schedule ends once it is paid. It does not create reusable access.' } },
      { id: 'card-purchases', text: 'A credit card used for several purchases within one limit', categoryId: 'revolving', explanation: 'A card records many transactions against one approved limit.', hint: 'Can the customer keep using it for new purchases?' },
      { id: 'restored-credit', text: 'Repaying restores available credit, where the terms permit', categoryId: 'revolving', explanation: 'Repayment frees up the limit again, which is the defining feature of reusable credit.', hint: 'Does repaying make it possible to borrow again?' },
      { id: 'scheduled-payments', text: 'A set number of payments, after which the agreement ends', categoryId: 'instalment', explanation: 'Instalment credit is repaid through a defined schedule, and the agreement ends once it is complete.', hint: 'Is there a known number of payments?' },
      { id: 'minimum-due', text: 'The customer chooses how much to repay above a minimum due', categoryId: 'revolving', explanation: 'A statement shows the balance, minimum due and due date, and the customer decides how much to repay. That choice changes interest and available credit.', hint: 'Does the repayment amount change from cycle to cycle at the customer’s choice?', misplaced: { instalment: 'Instalment payments follow a fixed schedule. A customer-chosen amount above a minimum is a feature of a reusable facility.' } },
      { id: 'point-of-sale', text: 'Finance for one specific purchase at the point of sale', categoryId: 'instalment', explanation: 'Retail and point-of-sale instalments finance a specific purchase through scheduled payments.', hint: 'Is the credit tied to a single item?' },
      { id: 'draw-again', text: 'Stays available for new borrowing for as long as the account remains open and in good standing', categoryId: 'revolving', explanation: 'A revolving facility can be drawn, repaid and drawn again; unlike an instalment plan, it has no fixed end once the schedule is paid.', hint: 'Is the access ongoing rather than a one-off amount?' },
    ],
    sourceRefs: [
      ch(L1, 3, 'Understanding Consumer Finance Products and Services', ['vnCreditLaw', 'oecdConsumer'], 'Example: a smartphone instalment has a fixed purchase, amount and schedule, while a credit card is reusable revolving credit with its own limit, payment and interest mechanics.'),
      ch(L2, 2, 'How Did Cards and Revolving Credit Expand Choice?', ['oecdConsumer', 'vnCreditLaw'], 'Revolving mechanics: approved limit, transactions recorded against it, statement with minimum due and due date, repayment restores available credit.'),
      ch(L1, 0, 'What Is Consumer Finance?', ['oecdConsumer'], 'Instalment and revolving credit definitions; the chapter visual presents them as alternative products, not stages.'),
    ],
  },
  {
    activityId: 'cf-m01-sort-repayment-capacity',
    type: 'category-sorting',
    title: 'What counts towards repayment capacity?',
    learningObjective: 'Separate the evidence that determines a household’s repayment capacity from signals that do not prove it.',
    instructions: `${SORT_INSTRUCTIONS} Repayment capacity is income minus essential expenditure minus existing obligations.`,
    summary: 'Repayment capacity is income minus essential expenditure minus existing obligations. A genuine need and a fast approval are separate from capacity and never substitute for it.',
    categories: [
      { id: 'income', label: 'Income', description: 'Adds to what the household can repay.' },
      { id: 'essential', label: 'Essential expenditure', description: 'Reduces capacity: spending the household cannot avoid.' },
      { id: 'obligations', label: 'Existing obligations', description: 'Reduces capacity: repayments already owed.' },
      { id: 'not-evidence', label: 'Not evidence of capacity', description: 'May matter to the customer or the decision, but does not show the household can repay.' },
    ],
    items: [
      { id: 'stable-employment', text: 'Stable employment', categoryId: 'income', explanation: 'Employment and income stability support the income side of capacity.', hint: 'Does this make the money coming in more reliable?' },
      { id: 'verified-earnings', text: 'Verified regular earnings', categoryId: 'income', explanation: 'Verified earnings are the income input to an affordability assessment.', hint: 'This is what the household earns, confirmed by evidence.' },
      { id: 'living-costs', text: 'Rising essential living costs', categoryId: 'essential', explanation: 'Living costs reduce what is left for repayment; lenders increase monitoring when living-cost pressure rises.', hint: 'Is this money the household must spend whether or not it borrows?' },
      { id: 'inflation', text: 'Inflation in the price of necessities', categoryId: 'essential', explanation: 'Inflation raises unavoidable spending, which reduces repayment capacity even when earnings are unchanged.', hint: 'Higher prices for necessities leave less to repay with.', misplaced: { obligations: 'Inflation does not create a debt. It raises the cost of what the household must buy anyway.' } },
      { id: 'existing-loan', text: 'Repayments on an existing loan', categoryId: 'obligations', explanation: 'Existing obligations are subtracted before a new repayment can be judged affordable.', hint: 'This money is already committed to another lender.', misplaced: { essential: 'Loan repayments are owed under a contract with a lender; they are counted separately from day-to-day living costs.' } },
      { id: 'household-debt', text: 'Outstanding household debt', categoryId: 'obligations', explanation: 'Debt already owed must be serviced, so it reduces capacity for new credit.', hint: 'Debt already owed has to be serviced before any new credit.' },
      { id: 'genuine-need', text: 'A genuine, urgent need for the purchase', categoryId: 'not-evidence', explanation: 'A genuine need must be assessed separately from capacity to repay. Need alone is not a reason to lend.', hint: 'Needing something does not change what can be repaid.', misplaced: { income: 'A need for the purchase adds nothing to what the household earns. Need and capacity are separate tests.' } },
      { id: 'fast-approval', text: 'A fast approval from a lending app', categoryId: 'not-evidence', explanation: 'Approval is not proof of suitability or wellbeing; a fast decision still needs verified capacity behind it.', hint: 'An approval is an output of the decision, not an input to it.' },
    ],
    sourceRefs: [
      ch(L5, 0, 'How Do Household Economics Affect Consumer Finance?', ['bisCredit', 'ifcResponsible'], 'Dimensions employment, income stability, inflation, essential expense and household debt; chapter visual: capacity = income − essential expenditure − existing obligations.'),
      ch(L1, 4, 'Who Uses Consumer Finance and Why?', ['ifcResponsible', 'oecdConsumer'], 'A genuine need must be assessed separately from capacity to repay; approval is not proof of suitability or wellbeing.'),
      ch(L1, 0, 'What Is Consumer Finance?', ['oecdConsumer'], 'Affordability assessment: income, essential expenditure, existing obligations and payment capacity.'),
    ],
  },
  {
    activityId: 'cf-m01-seq-credit-lifecycle',
    type: 'sequence-builder',
    title: 'The consumer credit lifecycle',
    learningObjective: 'Order the stages of a consumer credit relationship from product design to closure, and explain why each stage depends on the one before.',
    instructions: 'Put the stages in order from first to last. Use the Move up and Move down buttons, press Alt with the arrow keys, or drag a stage on a computer. Check when you are ready.',
    summary: 'The boundary of consumer finance follows responsibility for the credit product: it begins with design and funding and ends only after servicing, any recovery and complaints are complete.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter states that the industry begins with product design, funding and customer acquisition, continues through application, credit decision, agreement and disbursement, and ends only after servicing, repayment, recovery, complaints and required reporting are complete. Personal loans, instalment credit and revolving credit are alternative products, not stages; each follows this same lifecycle.',
    items: [
      { id: 'design-fund', text: 'Product design and funding: terms, risk appetite and funding are set', explanation: 'A product must exist, with terms and funding, before anyone can be offered it. The licensed provider owns this stage.', hint: 'What has to exist before any customer can be offered credit?' },
      { id: 'introduce', text: 'Customer introduction: the offer is shown directly, on a platform or in store', explanation: 'Acquisition follows design. A retailer or platform may present the offer without becoming the lender.', hint: 'A customer can only meet an offer that has already been designed and funded.' },
      { id: 'apply', text: 'Application: the customer requests a defined product and amount', explanation: 'The customer acts on the offer, and permitted application data is captured.', hint: 'This is the customer’s first action after seeing the offer.' },
      { id: 'assess-decide', text: 'Assessment and credit decision: identity, eligibility, affordability, fraud and repayment risk are checked; limit, price and terms are set', explanation: 'The provider can only assess what has been applied for. The decision sets the limit, price and terms that will be disclosed.', hint: 'A decision needs an application to assess.' },
      { id: 'agree-disburse', text: 'Agreement and disbursement: contract and disclosure, then funds are paid or the facility is opened', explanation: 'Only an approved application leads to a contract, and funds are released or the facility opened after the agreement.', hint: 'Money cannot be released before there is an approved, agreed contract.' },
      { id: 'service-close', text: 'Servicing to closure: repayment, support, any recovery, complaints and required reporting', explanation: 'The relationship continues after the money is paid out and ends only when servicing, repayment, any recovery and complaints are complete.', hint: 'This stage only exists once the customer has received funds or access.' },
    ],
    correctSequence: ['design-fund', 'introduce', 'apply', 'assess-decide', 'agree-disburse', 'service-close'],
    sourceRefs: [
      ch(L1, 2, 'Where Does Consumer Finance Begin and End?', ['vnCreditLaw', 'sbvInstitutions'], 'Scope text and “Who is responsible at each stage” flow: product design and funding, customer introduction, application and credit decision, agreement and disbursement, servicing, recovery and complaints.'),
      ch(L1, 0, 'What Is Consumer Finance?', ['oecdConsumer', 'ifcResponsible'], 'Chapter visual lifecycle: application, assessment, approval, disbursement or access, repayment and servicing. Products are alternatives that each follow it.'),
    ],
  },
]);

export const CONSUMER_FINANCE_M01_PACK: MatchSortPack = {
  packId: 'consumer-finance-m01',
  title: 'Consumer Finance · Module 01 practice',
  industryId: 'banking-consumer-finance',
  moduleId: 'module-01',
  sourceModuleKey: MODULE,
  contentStatus: 'Educational content; verify current law and product terms',
  contentNotes: [
    'No rates, figures or legal provisions are used. Activities use the module’s definitions, examples and chapter visuals only.',
    'QA flagged Lesson 1.1 as having 2 of the required 5 chapters. At read time consumerFinanceModule01.tsx defines 5 chapters for “Industry Definition & Scope”, 2 of which carry a legacyIndex. Activities cite chapters by exact title and position and are hidden at runtime if a cited chapter is missing, moved or under review.',
  ],
  activities,
};
