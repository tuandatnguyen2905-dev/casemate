// Commercial Banking Module 01, Lesson 1.5 activities (source: commercialBankingM01B3.tsx).
// No figures, dates or statutory detail. Chapter 5 (restriction notice) is not cited.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SEQUENCE_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE01' as const;
const L15 = '1.5 Industry Drivers & External Factors';
const ch = (index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, L15, index, title, sourceIds, grounding);

export const CB_M01B3_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-01', [
  {
    activityId: 'cb-m01-match-macro-drivers',
    type: 'concept-matching',
    title: 'Macro drivers and the banking outcome they move',
    learningObjective: 'Trace each macroeconomic driver to the banking outcome it moves, following demand, pricing and credit quality instead of a one-way claim.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Macro driver',
    answerLabel: 'Banking outcome it moves',
    summary: 'Economic conditions affect bank profit through demand, repricing and credit quality, not a single channel. Follow each driver to its outcome before judging the net effect.',
    items: {
      prompts: [
        { id: 'gdp-investment', text: 'GDP growth and investment' },
        { id: 'interest-rates', text: 'Interest rates' },
        { id: 'inflation', text: 'Inflation' },
        { id: 'downturn', text: 'Downturn risk' },
      ],
      answers: [
        { id: 'out-demand', text: 'Demand for credit, deposits and fees' },
        { id: 'out-nim', text: 'Net interest margin' },
        { id: 'out-repayment', text: 'Policy rates and real repayment capacity' },
        { id: 'out-npl', text: 'Non-performing loans and provisions' },
      ],
    },
    pairs: [
      { id: 'pair-gdp', promptId: 'gdp-investment', answerId: 'out-demand', explanation: 'Growth lifts cash flows and credit demand, and can raise deposits and fee activity too.', hint: 'Companies that expand need financing and services; what does that raise?' },
      { id: 'pair-rates', promptId: 'interest-rates', answerId: 'out-nim', explanation: 'Assets and deposits reprice at different speeds, so rates move margin, and they also change what borrowers can afford. A rate rise is not automatically good for profit.', hint: 'This driver acts on what the bank earns on assets and pays on funding, and not always at the same speed.' },
      { id: 'pair-inflation', promptId: 'inflation', answerId: 'out-repayment', explanation: 'Inflation changes policy and purchasing power, so it works through rates and borrowers’ real capacity to repay.', hint: 'It acts indirectly: it influences how policy is set and what households and firms can really afford.' },
      { id: 'pair-downturn', promptId: 'downturn', answerId: 'out-npl', explanation: 'A downturn weakens cash flow and collateral values, so more loans fail to perform and provisions rise.', hint: 'Weaker cash flow and falling collateral values show up first in loan quality.' },
    ],
    sourceRefs: [
      ch(0, 'Economic Drivers of Commercial Banking', ['cb-m01-s09', 'cb-m01-s10'], '“Three channels from the macro economy to bank returns” driver tree: demand, net interest margin and credit losses; recap “Inflation shapes policy and real repayment capacity.” and “The net effect depends on provisions as well as margin.”'),
    ],
  },
  {
    activityId: 'cb-m01-match-technology-controls',
    type: 'concept-matching',
    title: 'Banking technology and its paired control',
    learningObjective: 'Pair each banking technology with the control requirement that must travel with its benefit.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Technology',
    answerLabel: 'Control requirement',
    summary: 'Every digital gain needs a matching control, and digital value is measured in outcomes, not features: automation scales controls and errors alike, and APIs and cloud add partner and resilience dependencies.',
    items: {
      prompts: [
        { id: 'mobile-ekyc', text: 'Mobile banking and eKYC' },
        { id: 'automation', text: 'Workflow automation' },
        { id: 'ai-analytics', text: 'AI and analytics' },
        { id: 'apis', text: 'APIs and partners' },
        { id: 'cloud-core', text: 'Modern infrastructure' },
      ],
      answers: [
        { id: 'ctl-identity', text: 'Identity and fraud checks.' },
        { id: 'ctl-exceptions', text: 'Exception handling for cases the flow cannot process.' },
        { id: 'ctl-model', text: 'Model governance, explainability and drift monitoring.' },
        { id: 'ctl-consent', text: 'Security and third-party risk management.' },
        { id: 'ctl-resilience', text: 'Operational resilience for critical processes.' },
      ],
    },
    pairs: [
      { id: 'pair-mobile-ekyc', promptId: 'mobile-ekyc', answerId: 'ctl-identity', explanation: 'Faster access and lower cost-to-serve are valuable only if the bank still identifies the customer and detects fraud.', hint: 'Remote onboarding gives speed; what must be established before an account is opened?' },
      { id: 'pair-automation', promptId: 'automation', answerId: 'ctl-exceptions', explanation: 'Automation handles repeatable steps, but it scales errors as well as controls, so cases that do not fit the flow need handling.', hint: 'When a process runs without people, what must catch the cases that do not fit?' },
      { id: 'pair-ai', promptId: 'ai-analytics', answerId: 'ctl-model', explanation: 'AI supports fraud detection, service and decisions, but a weak model can scale errors as quickly as it scales service, so it needs data and model governance.', hint: 'The risk is in how the model reaches its outputs and whether it still fits current conditions.' },
      { id: 'pair-apis', promptId: 'apis', answerId: 'ctl-consent', explanation: 'Connected services and wider reach depend on external partners, which introduces security and third-party risk.', hint: 'This technology opens the bank’s services to outside parties.' },
      { id: 'pair-cloud', promptId: 'cloud-core', answerId: 'ctl-resilience', explanation: 'Scalability for growing digital volumes is worth little if critical processes cannot keep running through disruption.', hint: 'Scale brings dependence on systems and providers, so ask what happens when one fails.' },
    ],
    sourceRefs: [
      ch(3, 'Technology and Digital Banking Innovation', ['cb-m01-s12'], '“Every digital gain needs a matching control” table: each technology lever with the value it can create and the control it requires; recap “Automation scales controls and errors alike.” and “APIs and cloud increase partner and resilience dependencies.”'),
    ],
  },
  {
    activityId: 'cb-m01-seq-inclusion-stages',
    type: 'sequence-builder',
    title: 'From account access to a responsible relationship',
    learningObjective: 'Order the stages by which an opened account becomes a durable, responsible banking relationship, and explain why ownership alone is not inclusion.',
    instructions: SEQUENCE_INSTRUCTIONS,
    summary: 'Owning an account is only the first step: inclusion creates value when access becomes active, primary and responsibly deepened use.',
    isSequentialProcess: true,
    sequenceEvidence: 'The chapter’s “From an opened account to a trusted primary relationship” flow presents four consecutive stages: a customer can open and reach an account, then money arrives and the first meaningful transactions happen, then salary, bills and savings run through the account, and only then do credit and advice deepen the relationship to fit the customer’s needs, knowledge and capacity.',
    items: [
      { id: 'access', text: 'Access: a customer can open and reach an account', explanation: 'Nothing else can happen until the customer can open and reach the account.', hint: 'It is the precondition for every other stage.' },
      { id: 'activation', text: 'Activation: money enters and the customer completes useful transactions', explanation: 'An account becomes useful only when it is used. Ownership alone is not proof of active use.', hint: 'It follows opening an account and comes before the bank becomes the customer’s main one.' },
      { id: 'primary', text: 'Primary account: salary arrives, bills are paid and savings build at this bank', explanation: 'Trust and convenience make the account the customer’s main one, which takes repeated, reliable use after activation.', hint: 'It needs repeated use over time, not just a first transaction.' },
      { id: 'deepening', text: 'Responsible deepening: credit and advice fit the customer’s needs, knowledge and capacity', explanation: 'Credit and advice are suitable only once the bank understands the customer through a trusted primary relationship.', hint: 'Credit that fits a customer’s needs relies on knowing their regular finances.' },
    ],
    correctSequence: ['access', 'activation', 'primary', 'deepening'],
    sourceRefs: [
      ch(2, 'Social and Demographic Changes in Banking', ['cb-m01-s12'], '“From an opened account to a trusted primary relationship” flow and the recap “Ownership is not the same as active, beneficial use.”'),
    ],
  },
]);
