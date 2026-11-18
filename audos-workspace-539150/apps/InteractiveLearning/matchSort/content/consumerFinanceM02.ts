// Consumer Finance Module 02 activities (source: consumerFinanceModule02.tsx).
// Every activity draws only on what the chapters state; no figures, dates or legal thresholds.

import type { MatchSortActivity, MatchSortPack } from '../types';
import { chapterRef, defineActivities } from './shared';
import { CF_M02_REFINEMENT_ACTIVITIES } from './consumerFinanceRefinements';
import { PAIR_INSTRUCTIONS, SEQUENCE_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'CONSUMER_FINANCE_MODULE02' as const;
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const activities: MatchSortActivity[] = defineActivities('banking-consumer-finance', 'module-02', [
  {
    activityId: 'cf-m02-seq-lending-lifecycle',
    type: 'sequence-builder',
    title: 'The consumer lending lifecycle',
    learningObjective: 'Order the stages of the consumer lending lifecycle from funding and product design to repayment, support and recovery.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Value comes from connecting customer access, appropriate credit decisions, efficient operations and effective repayment management. Responsibility must be assigned and evidenced at every handoff along the way.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter states that the lifecycle runs from funding and product design through customer discovery, application, verification, decision, agreement, disbursement, repayment, support and recovery. The stages are consecutive: an application cannot be verified before it exists, a decision needs verified evidence, and funds cannot be disbursed before an agreement is made.',
    items: [
      { id: 'funding-product', text: 'Funding and product design', explanation: 'The chain starts before any customer arrives: funding exists and the product is designed.', hint: 'It happens before any customer is involved.' },
      { id: 'discovery', text: 'Customer discovery', explanation: 'A customer finds or is introduced to an offer.', hint: 'The customer must meet the product before applying.' },
      { id: 'application', text: 'Application', explanation: 'The customer applies for a specific amount and term.', hint: 'It begins once the customer has chosen to ask for credit.' },
      { id: 'verification', text: 'Verification of identity and evidence', explanation: 'The application is checked before a decision is made.', hint: 'There must be an application to check.' },
      { id: 'decision', text: 'Credit decision', explanation: 'The lender decides on verified evidence.', hint: 'It depends on the evidence having been checked.' },
      { id: 'agreement', text: 'Agreement', explanation: 'Terms are accepted only for credit that has been approved.', hint: 'There is nothing to agree to until credit has been approved.' },
      { id: 'disbursement', text: 'Disbursement', explanation: 'Funds are released under the agreement.', hint: 'Money moves only after the terms are agreed.' },
      { id: 'repayment-recovery', text: 'Repayment, support and recovery', explanation: 'After disbursement the provider collects repayments, supports the customer and, if needed, recovers arrears.', hint: 'It continues for as long as the credit exists.' },
    ],
    correctSequence: ['funding-product', 'discovery', 'application', 'verification', 'decision', 'agreement', 'disbursement', 'repayment-recovery'],
    sourceRefs: [
      ch('Value Chain Overview', 0, 'How Does the Consumer Finance Value Chain Work?', ['bisCredit', 'oecdConsumer', 'vnCreditLaw'], 'Key insight and “scope” statement: the lifecycle from funding and product design through discovery, application, verification, decision, agreement, disbursement, repayment, support and recovery.'),
    ],
  },
  {
    activityId: 'cf-m02-seq-origination',
    type: 'sequence-builder',
    title: 'From application to a funded account',
    learningObjective: 'Order the origination steps that turn an application into an account, and explain why speed cannot replace the checks within them.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'A smooth journey improves conversion, but speed cannot replace eligibility, affordability, fraud and clear-term checks. Every step needs a valid record, from consent to disbursement reconciliation.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter states that origination moves from capture and verification to decision, disclosure, valid acceptance, account setup, disbursement and reconciliation, and its example has the applicant review total repayment and due dates, accept a valid agreement and receive funds only after approval. Each step depends on the previous one.',
    items: [
      { id: 'capture', text: 'Application is captured', explanation: 'Origination starts when the application and the customer\u2019s consent are recorded.', hint: 'Nothing can be verified until there is an application.' },
      { id: 'verify', text: 'Identity and evidence are verified', explanation: 'Checks come before the decision so that it rests on reliable information.', hint: 'It follows capture and comes before any decision.' },
      { id: 'decide', text: 'The credit decision is made', explanation: 'Eligibility, affordability and fraud checks inform the decision.', hint: 'It needs checked evidence to decide on.' },
      { id: 'disclose', text: 'Terms are disclosed, including total repayment and due dates', explanation: 'Disclosure follows approval so the customer sees the terms they are actually being offered.', hint: 'The customer is shown terms for credit that has been approved.' },
      { id: 'accept', text: 'The customer gives valid acceptance of the agreement', explanation: 'Acceptance is meaningful only after the customer has seen and understood the terms.', hint: 'It depends on the customer having seen the terms.' },
      { id: 'set-up', text: 'The account is set up', explanation: 'The account and repayment schedule are created from the accepted agreement.', hint: 'It needs an accepted agreement to create from.' },
      { id: 'disburse', text: 'Funds are disbursed', explanation: 'Funds are released only after approval and acceptance.', hint: 'Money must not move before approval and acceptance.' },
      { id: 'reconcile', text: 'Disbursement is reconciled to the records', explanation: 'The final step checks that decision, agreement, payment and ledger all agree.', hint: 'It checks that the decision, agreement and payment were all recorded correctly.' },
    ],
    correctSequence: ['capture', 'verify', 'decide', 'disclose', 'accept', 'set-up', 'disburse', 'reconcile'],
    sourceRefs: [
      ch('Midstream Activities', 2, 'What Turns an Application into an Account?', ['vnElectronic', 'vnCreditLaw', 'vnData', 'oecdConsumer'], 'Key insight and “scope” statement: origination from capture and verification to decision, disclosure, valid acceptance, account setup, disbursement and reconciliation.'),
    ],
  },
  {
    activityId: 'cf-m02-sort-standardise-vs-local',
    type: 'category-sorting',
    title: 'Shared platform or local authority?',
    learningObjective: 'Distinguish what a global consumer-finance platform can standardise from what must stay under local accountable authority.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Global platforms provide scale only when local credit policy, customer communication and regulatory controls remain valid. Common systems standardise workflow, reporting and controls; local teams keep authority over product, evidence, decisions and customer treatment.',
    categories: [
      { id: 'shared', label: 'Can be standardised across markets', description: 'Common systems and frameworks that scale.' },
      { id: 'local', label: 'Stays under local authority', description: 'Decisions that must remain valid in the local market.' },
    ],
    items: [
      { id: 'workflow', text: 'Application and servicing workflow', categoryId: 'shared', explanation: 'Common systems can standardise workflow, which is where scale comes from.', hint: 'It is how work moves through the system, which can look the same everywhere.' },
      { id: 'reporting', text: 'Portfolio reporting and shared analytics', categoryId: 'shared', explanation: 'An international provider can share portfolio analytics across markets.', hint: 'It is how results are measured and reported to the group.' },
      { id: 'control-framework', text: 'A common control framework', categoryId: 'shared', explanation: 'Common systems can standardise controls, as long as local controls stay valid.', hint: 'It sets the checks that every entity must run.', misplaced: { local: 'Controls can be standardised in the shared system, though local teams must make sure they remain valid locally.' } },
      { id: 'product-design', text: 'Product design', categoryId: 'local', explanation: 'Local accountable teams retain authority over product.', hint: 'It depends on what customers in this market need and can afford.' },
      { id: 'verification-evidence', text: 'The evidence used to verify identity and income', categoryId: 'local', explanation: 'Evidence differs by market, because data availability and income documentation differ.', hint: 'It depends on which records customers actually have.' },
      { id: 'underwriting-policy', text: 'Underwriting rules and customer disclosures', categoryId: 'local', explanation: 'An international provider can share analytics while maintaining market-specific underwriting and disclosures.', hint: 'It must fit local rules and customers even when systems are shared.', misplaced: { shared: 'Shared analytics are common, but underwriting and disclosures have to remain specific to the market.' } },
      { id: 'customer-treatment', text: 'Customer communication, language and treatment', categoryId: 'local', explanation: 'Customer communication and treatment must remain valid in the local market.', hint: 'It is the part the customer actually experiences, in their own language.' },
      { id: 'complaints-handling', text: 'Handling customer complaints', categoryId: 'local', explanation: 'Complaint handling is part of customer treatment, which local accountable teams keep authority over, and the chapter lists complaints among the arrangements to define locally.', hint: 'It is how a customer\u2019s problem with the service gets resolved.' },
    ],
    sourceRefs: [
      ch('Global vs. Local Value Chain', 0, 'What Can Global Consumer Finance Platforms Standardise?', ['nistCSF', 'vnData', 'vnCyber', 'vnCreditLaw'], 'Key insight and “scope” statement on what common systems standardise and what local accountable teams retain; the shared-analytics example; the instruction to define local authority, language and complaints.'),
    ],
  },
  {
    activityId: 'cf-m02-match-shared-risk-controls',
    type: 'concept-matching',
    title: 'Shared data and operations: risk and response',
    learningObjective: 'Match each risk created by shared data and operations to the response the chapter prescribes.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Risk',
    answerLabel: 'Response',
    summary: 'Shared capabilities increase scale but also concentration, context, privacy, cyber and continuity risk. Organisations document data location and access, test model relevance, oversee vendors and preserve local records and recovery options.',
    items: {
      prompts: [
        { id: 'data-boundary', text: 'Data boundary and cross-border access' },
        { id: 'model-context', text: 'Model context' },
        { id: 'vendor-dependency', text: 'Vendor dependency' },
        { id: 'operational-resilience', text: 'Operational resilience' },
        { id: 'auditability', text: 'Auditability' },
      ],
      answers: [
        { id: 'resp-data-location', text: 'Document where data is held and who can access it.' },
        { id: 'resp-model-relevance', text: 'Test whether a model still fits the local customer mix.' },
        { id: 'resp-vendors', text: 'Oversee the vendors that supply critical services.' },
        { id: 'resp-recovery', text: 'Keep recovery options available locally.' },
        { id: 'resp-records', text: 'Preserve local records that can be reviewed.' },
      ],
    },
    pairs: [
      { id: 'pair-data-boundary', promptId: 'data-boundary', answerId: 'resp-data-location', explanation: 'When data and operations are shared across borders, the provider must know where data sits and who may reach it.', hint: 'The risk is about where information is and who can see it.' },
      { id: 'pair-model-context', promptId: 'model-context', answerId: 'resp-model-relevance', explanation: 'A global score can perform differently after customer mix changes, so local validation and recalibration are needed.', hint: 'The danger is a model built for different customers being used on these.' },
      { id: 'pair-vendor-dependency', promptId: 'vendor-dependency', answerId: 'resp-vendors', explanation: 'Concentration in a few suppliers is a continuity and cyber risk that needs active oversight.', hint: 'The risk is relying on outside suppliers.' },
      { id: 'pair-resilience', promptId: 'operational-resilience', answerId: 'resp-recovery', explanation: 'Shared systems can fail together, so each market needs ways to recover and continue.', hint: 'The risk is the service stopping for many markets at once.' },
      { id: 'pair-auditability', promptId: 'auditability', answerId: 'resp-records', explanation: 'Local records let local owners and regulators review how decisions were made.', hint: 'The risk is not being able to show what happened afterwards.' },
    ],
    sourceRefs: [
      ch('Global vs. Local Value Chain', 1, 'Where Do Shared Data and Operations Create Extra Risk?', ['nistAI', 'nistCSF', 'vnData', 'vnCyber'], 'Dimensions data boundary, cross-border access, vendor dependency, model context, operational resilience and auditability; the sentence on documenting data location, testing model relevance, overseeing vendors and preserving local records and recovery options.'),
    ],
  },
]);

export const CONSUMER_FINANCE_M02_PACK: MatchSortPack = {
  packId: 'consumer-finance-m02',
  title: 'Consumer Finance · Module 02 practice',
  industryId: 'banking-consumer-finance',
  moduleId: 'module-02',
  sourceModuleKey: MODULE,
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked “Draft / Ready for Review”. These activities use only mechanisms and sequences stated in the chapters: no figures, dates or legal thresholds.',
    'Consumer Finance has no entry in reviewHolds.ts at the time of writing; availability is re-checked at runtime against the decks after review holds are applied.',
  ],
  activities: [...activities, ...CF_M02_REFINEMENT_ACTIVITIES],
};
