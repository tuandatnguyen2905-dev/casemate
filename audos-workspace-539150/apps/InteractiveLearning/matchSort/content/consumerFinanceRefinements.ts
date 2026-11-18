// Consumer Finance refinement activities (Priority 3 of the practice-content QA pass).
// Added only where a chapter itself names the categories, roles or ordered links being practised.
// Lessons deliberately left flashcards-only are recorded in reports/practice-content-expansion-manifest.md.
// Sources: consumerFinanceModule02.tsx to consumerFinanceModule05.tsx. No figures, rankings, provider names or legal thresholds.

import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SEQUENCE_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const INDUSTRY = 'banking-consumer-finance';

const ch02 = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef('CONSUMER_FINANCE_MODULE02', lesson, index, title, sourceIds, grounding);
const ch03 = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef('CONSUMER_FINANCE_MODULE03', lesson, index, title, sourceIds, grounding);
const ch04 = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef('CONSUMER_FINANCE_MODULE04', lesson, index, title, sourceIds, grounding);
const ch05 = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef('CONSUMER_FINANCE_MODULE05', lesson, index, title, sourceIds, grounding);

export const CF_M02_REFINEMENT_ACTIVITIES = defineActivities(INDUSTRY, 'module-02', [
  {
    activityId: 'cf-m02-sort-stock-flow-rate',
    type: 'category-sorting',
    title: 'Balance, amount over a period, or share?',
    learningObjective: 'Classify lending measures as a balance at a point in time, an amount accumulated over a period, or a share of a denominator, so that measures that answer different questions are never substituted for one another.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Stocks, flows and rates answer different questions. A metric is usable only with its product, cohort, period, denominator and event definition, and approval rate, balance growth and credit loss measure different stages.',
    categories: [
      { id: 'stock', label: 'A stock: a balance at a point in time', description: 'Read on a single date.' },
      { id: 'flow', label: 'A flow: an amount over a period', description: 'Builds up between two dates.' },
      { id: 'rate', label: 'A rate: a share of a denominator', description: 'A proportion that only makes sense with a defined base.' },
    ],
    items: [
      { id: 'balance-month-end', text: 'Outstanding balance on the last day of a month', categoryId: 'stock', explanation: 'An outstanding balance is read on one date and is not added up across time.', hint: 'It is taken on one day and is not totalled over time.' },
      { id: 'open-accounts', text: 'Number of open accounts on a given date', categoryId: 'stock', explanation: 'A count taken on a single date describes the position at that moment.', hint: 'It is a count made on a single day.' },
      { id: 'disbursed-quarter', text: 'Amount disbursed during a quarter', categoryId: 'flow', explanation: 'Disbursements accumulate over the period between two dates.', hint: 'It adds up over three months.' },
      { id: 'repayments-month', text: 'Repayments received during a month', categoryId: 'flow', explanation: 'Repayments are the total of payments arriving between two dates.', hint: 'It is the total of payments that arrived across a month.' },
      { id: 'applications-week', text: 'Applications received during a week', categoryId: 'flow', explanation: 'Applications are counted as they arrive over a period.', hint: 'It counts how many arrived across seven days.' },
      { id: 'approval-share', text: 'Approved applications as a share of applications received', categoryId: 'rate', explanation: 'An approval rate is a proportion. It needs its denominator and period defined to be comparable.', hint: 'It only means something once you say what it is compared with.', misplaced: { flow: 'The number of approvals accumulates over a period, but an approval rate is a proportion with a denominator.' } },
      { id: 'past-due-share', text: 'Accounts past due as a share of accounts in a defined cohort', categoryId: 'rate', explanation: 'A delinquency measure depends on the cohort and event definition used for its base.', hint: 'Its meaning depends on which group of accounts is counted.' },
      { id: 'loss-share', text: 'Credit loss as a share of balances for a defined product and period', categoryId: 'rate', explanation: 'Credit loss compared with balances needs the product, period and denominator to be stated.', hint: 'It compares one amount with another for a stated product and period.' },
    ],
    sourceRefs: [
      ch02('Inputs, Outputs & Value Creation', 1, 'Which Measures Must Stay Separate?', ['bisCredit', 'oecdConsumer'], 'Key insight and scope: stocks, flows and rates answer different questions and cannot be substituted; a metric needs product, cohort, period, denominator and event definition; approval rate, balance growth and credit loss measure different stages.'),
    ],
  },
]);

export const CF_M03_REFINEMENT_ACTIVITIES = defineActivities(INDUSTRY, 'module-03', [
  {
    activityId: 'cf-m03-sort-revenue-vs-cost',
    type: 'category-sorting',
    title: 'What the provider earns, and what reduces contribution',
    learningObjective: 'Separate the revenue streams of consumer finance from the costs that determine contribution, so that high yield is never mistaken for strong economics.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Revenue is sustainable only when pricing covers cost and risk. High yield does not equal strong economics once funding, loss and operating costs are included, and some revenue streams exist only in certain models.',
    categories: [
      { id: 'revenue', label: 'Revenue the provider earns', description: 'Income from interest, fees or partners.' },
      { id: 'cost', label: 'Cost that reduces contribution', description: 'Spending or loss that income has to cover.' },
    ],
    items: [
      { id: 'interest-income', text: 'Interest income on the loan', categoryId: 'revenue', explanation: 'Providers earn interest on the credit they extend.', hint: 'The borrower pays it for the use of money over time.' },
      { id: 'permitted-fees', text: 'Permitted fees', categoryId: 'revenue', explanation: 'Providers earn eligible fees under product and legal constraints.', hint: 'It is a charge allowed within product and legal limits.' },
      { id: 'interchange', text: 'Interchange, in models that earn it', categoryId: 'revenue', explanation: 'Interchange is earned only in some models and comes from payment activity.', hint: 'Only some business models receive it, and it arises from payment activity.' },
      { id: 'partner-income', text: 'Partner share, in models that include it', categoryId: 'revenue', explanation: 'Partner income appears in some models, under the arrangement with the partner.', hint: 'It comes from a commercial arrangement with another business.' },
      { id: 'funding-expense', text: 'Funding expense', categoryId: 'cost', explanation: 'The provider pays to obtain the money it lends, which sets a floor under pricing.', hint: 'It is what the provider pays to obtain the money it lends.' },
      { id: 'expected-loss', text: 'Expected credit loss', categoryId: 'cost', explanation: 'Some borrowers will not repay in full, and that loss has to be covered by income.', hint: 'It reflects borrowers who may not repay in full.', misplaced: { revenue: 'Credit loss reduces what the provider keeps. It is not income, even though it is priced into the loan.' } },
      { id: 'acquisition-cost', text: 'Customer acquisition cost', categoryId: 'cost', explanation: 'Winning each customer costs money, and a cheaper channel can still prove costly once fraud and losses appear.', hint: 'It is spent to win each new customer.' },
      { id: 'underwriting-cost', text: 'Underwriting', categoryId: 'cost', explanation: 'Assessing applications uses staff, data and systems.', hint: 'It is spent assessing each application.' },
      { id: 'technology-cost', text: 'Technology', categoryId: 'cost', explanation: 'Systems that run origination, accounts and payments are an ongoing operating cost.', hint: 'It keeps systems running and connected.' },
      { id: 'servicing-cost', text: 'Servicing', categoryId: 'cost', explanation: 'Looking after accounts after funds are released requires ongoing operations and support.', hint: 'It is spent looking after accounts after the money has been released.' },
      { id: 'collections-cost', text: 'Collections', categoryId: 'cost', explanation: 'Managing overdue accounts has an operating cost that income must cover.', hint: 'It is spent managing overdue payments.' },
    ],
    sourceRefs: [
      ch03('Revenue Streams & Cost Structure', 0, 'Where Does Consumer Finance Revenue Come From?', ['vnCreditLaw', 'oecdConsumer', 'bisCredit'], 'Scope: providers earn interest and eligible fees and, in some models, interchange or partner income; dimensions interest income, permitted fee, interchange, partner share.'),
      ch03('Revenue Streams & Cost Structure', 1, 'Which Costs Determine Contribution?', ['bisCredit', 'ifcResponsible'], 'Dimensions funding expense, expected credit loss, acquisition cost, underwriting, technology, servicing and collections; key insight that high yield does not equal strong economics.'),
    ],
  },
  {
    activityId: 'cf-m03-sort-channel-controls',
    type: 'category-sorting',
    title: 'Which channel does each statement describe?',
    learningObjective: 'Distinguish what each distribution channel does well and what must be governed in it: human sales, digital acquisition and retail or embedded distribution.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Each channel has its own value and its own control point. Human channels explain and resolve but need incentive control, digital channels are judged by completed and repayable credit, and embedded distribution needs the customer to understand who the lender is.',
    categories: [
      { id: 'human', label: 'Branch and direct sales', description: 'Staff or authorised agents deal with the customer.' },
      { id: 'digital', label: 'Digital acquisition', description: 'An app or website runs the journey.' },
      { id: 'embedded', label: 'Retail and embedded distribution', description: 'A retailer or platform presents the lender\u2019s offer.' },
    ],
    items: [
      { id: 'human-explain', text: 'Explains complex terms and resolves exceptions in person', categoryId: 'human', explanation: 'Human channels can explain complex terms and resolve exceptions.', hint: 'A person is on hand to talk the customer through the detail.' },
      { id: 'human-incentives', text: 'Needs controls on sales-staff incentives and handoffs to protect application quality', categoryId: 'human', explanation: 'Incentives and handoffs must protect application quality, so they are governed along with scripts and supervision.', hint: 'The risk is that rewards for selling distort which applications are submitted.' },
      { id: 'digital-success', text: 'Judged by completed, suitable and repayable credit, not the shortest application', categoryId: 'digital', explanation: 'Effectiveness is completed, suitable and repayable credit rather than speed alone.', hint: 'Speed alone is the wrong test of success on a screen.' },
      { id: 'digital-track', text: 'Tracks drop-off, verification, approval, fraud and payment performance across the journey', categoryId: 'digital', explanation: 'Teams measure each stage of the journey, from drop-off through to payment performance.', hint: 'Every stage of the journey is measured, from first screen to repayment.' },
      { id: 'digital-safeguards', text: 'Cuts form steps but keeps affordability evidence, with human help when needed', categoryId: 'digital', explanation: 'The journey can be shortened while safeguards remain and a route to a person is preserved.', hint: 'The journey is shortened while the safeguards stay in place.', misplaced: { human: 'Here the journey itself is online. A route to a person exists as a fallback, not as the channel.' } },
      { id: 'embedded-decides', text: 'The business showing the offer is not the one that decides and contracts', categoryId: 'embedded', explanation: 'The retailer or platform presents the offer while the authorised provider controls decisioning, contracting and account responsibility.', hint: 'Think about who holds responsibility for the account once the customer accepts.' },
      { id: 'embedded-clarity', text: 'The customer must still understand the lender, terms, data use and obligations', categoryId: 'embedded', explanation: 'Reduced friction only helps when customers understand who the lender is and what they owe.', hint: 'The customer could easily mistake who they are borrowing from.' },
      { id: 'embedded-monitor', text: 'Partner presentation, incentives and cohort quality are monitored', categoryId: 'embedded', explanation: 'Monitoring covers how a partner presents the offer and what is later seen in customer cohorts.', hint: 'Oversight reaches how another business shows and is rewarded for the offer.' },
    ],
    sourceRefs: [
      ch03('Distribution & Sales Channels', 0, 'How Do Branches and Direct Sales Create Value?', ['oecdConsumer', 'vnCreditLaw', 'vnData'], 'Key insight: human channels can explain complex terms and resolve exceptions, but incentives and handoffs must protect application quality.'),
      ch03('Distribution & Sales Channels', 1, 'What Makes a Digital Acquisition Channel Effective?', ['vnElectronic', 'vnData', 'oecdConsumer'], 'Key insight and scope: effectiveness is completed, suitable and repayable credit; teams measure drop-off, verification, approval, fraud, complaints and payment performance; the example keeps affordability evidence with human help.'),
      ch03('Distribution & Sales Channels', 2, 'How Should Retail and Embedded Distribution Be Governed?', ['vnCreditLaw', 'vnData', 'vnElectronic', 'oecdConsumer'], 'Key insight and scope: customers must understand the lender, terms, data use and obligations; the authorised provider controls decisioning and contracting; partner presentation and cohort quality are monitored.'),
    ],
  },
]);

export const CF_M04_REFINEMENT_ACTIVITIES = defineActivities(INDUSTRY, 'module-04', [
  {
    activityId: 'cf-m04-seq-risk-compounding',
    type: 'sequence-builder',
    title: 'How weak acquisition can compound (illustrative chain)',
    learningObjective: 'Trace how a weak acquisition decision can compound into funding pressure, and see why consumer-finance risks are analysed together rather than as a list.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Consumer-finance risks interact: weak acquisition can increase fraud and arrears, strain service, damage trust and tighten funding. The chain is an illustration of how risk compounds, with each effect possible rather than certain, so leading indicators and escalation triggers matter.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter states that weak acquisition can increase fraud and arrears, strain service, damage trust and tighten funding, and its example traces aggressive partner incentives to low-quality applications, rising delinquency, complaints and collection pressure. Each effect follows from the one before it, so the order is a causal chain. It is an illustration of compounding, not a forecast.',
    items: [
      { id: 'incentives', text: 'Aggressive partner incentives reward volume', explanation: 'The chapter\u2019s example begins with incentives that push partners toward volume.', hint: 'It is about how partners are rewarded for what they bring in.' },
      { id: 'low-quality', text: 'Low-quality applications are acquired', explanation: 'When volume is rewarded without regard to quality, weaker applications enter the process.', hint: 'It follows once volume is rewarded without regard to quality.' },
      { id: 'fraud-arrears', text: 'Fraud and arrears rise', explanation: 'Weak acquisition can increase fraud and arrears, which appear as poorly selected customers start to repay badly.', hint: 'It shows up once poorly selected customers begin to repay badly.' },
      { id: 'service-strain', text: 'Complaints and collection pressure strain service', explanation: 'Rising arrears and complaints land on the teams that serve customers and manage overdue accounts.', hint: 'It lands on the people who deal with customers and overdue accounts.' },
      { id: 'trust-damage', text: 'Customer trust is damaged', explanation: 'Strained service and difficult collection experiences damage trust in the provider.', hint: 'It comes after customers have had a poor experience.' },
      { id: 'funding-tightens', text: 'Funding tightens', explanation: 'The final effect reaches the money the provider can raise, which limits how much it can lend.', hint: 'It touches the money the provider can raise, which depends on how others see it.' },
    ],
    correctSequence: ['incentives', 'low-quality', 'fraud-arrears', 'service-strain', 'trust-damage', 'funding-tightens'],
    sourceRefs: [
      ch04('Industry SWOT & Strategic Challenges', 1, 'Which Risks Can Compound Across the Model?', ['oecdConsumer', 'bisCredit', 'nistAI', 'vnData'], 'Key insight and example: weak acquisition can increase fraud and arrears, strain service, damage trust and tighten funding; aggressive partner incentives produce low-quality applications, rising DPD, complaints and collection pressure.'),
    ],
  },
]);

export const CF_M05_ACTIVITIES = defineActivities(INDUSTRY, 'module-05', [
  {
    activityId: 'cf-m05-match-alternative-data-tests',
    type: 'concept-matching',
    title: 'Testing alternative data before it is used',
    learningObjective: 'Match each test that alternative data should pass before use to the question it asks.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Test',
    answerLabel: 'Question it asks',
    summary: 'Alternative data can add evidence for underserved customers, but it can also bring poor quality, hidden proxies and unfair outcomes. Teams test necessity, permission, representativeness, predictive value and stability before use, then monitor decisions by cohort.',
    items: {
      prompts: [
        { id: 'test-necessity', text: 'Necessity' },
        { id: 'test-permission', text: 'Permission' },
        { id: 'test-representativeness', text: 'Representativeness' },
        { id: 'test-predictive', text: 'Predictive value' },
        { id: 'test-stability', text: 'Stability' },
      ],
      answers: [
        { id: 'q-needed', text: 'Is this data actually needed to make the decision?' },
        { id: 'q-permitted', text: 'Is the data permitted to be used for this purpose?' },
        { id: 'q-reflects', text: 'Does it reflect the customers it will be used to judge?' },
        { id: 'q-repayment', text: 'Does it have a defensible connection to repayment?' },
        { id: 'q-holds', text: 'Does the relationship hold up over time?' },
      ],
    },
    pairs: [
      { id: 'pair-necessity', promptId: 'test-necessity', answerId: 'q-needed', explanation: 'Data that is not needed for the decision should not be collected or used, which also limits privacy and security exposure.', hint: 'It asks whether the decision could be made without this data.' },
      { id: 'pair-permission', promptId: 'test-permission', answerId: 'q-permitted', explanation: 'Data must be used only where its use is allowed, with consent where it is required.', hint: 'It asks about the right to use the data, not about how useful it is.' },
      { id: 'pair-representativeness', promptId: 'test-representativeness', answerId: 'q-reflects', explanation: 'A signal that works for one kind of customer can mislead for another, so the data has to fit the people it will judge.', hint: 'It asks whether the data fits the people being assessed.' },
      { id: 'pair-predictive', promptId: 'test-predictive', answerId: 'q-repayment', explanation: 'A signal without a defensible link to repayment, which also produces uneven outcomes, should be rejected.', hint: 'It asks whether the data helps explain who repays.' },
      { id: 'pair-stability', promptId: 'test-stability', answerId: 'q-holds', explanation: 'A pattern that fades quickly gives false confidence, so it has to stay reliable over time.', hint: 'It asks whether a pattern keeps working after it is first found.' },
    ],
    sourceRefs: [
      ch05('Technology & Innovation Trends', 1, 'What Can Alternative Data Add\u2014and What Can Go Wrong?', ['nistAI', 'vnData', 'oecdConsumer'], 'Scope: teams test necessity, permission, representativeness, predictive value and stability before use and monitor decisions by cohort; the example rejects a signal that lacks a defensible connection to repayment.'),
    ],
  },
]);
