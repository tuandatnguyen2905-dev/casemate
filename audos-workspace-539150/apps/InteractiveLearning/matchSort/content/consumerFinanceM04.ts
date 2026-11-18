// Consumer Finance Module 04 activities (source: consumerFinanceModule04.tsx).
// Every activity draws only on what the chapters state; no figures, rankings or provider names.

import type { MatchSortActivity, MatchSortPack } from '../types';
import { chapterRef, defineActivities } from './shared';
import { CF_M04_REFINEMENT_ACTIVITIES } from './consumerFinanceRefinements';
import { SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'CONSUMER_FINANCE_MODULE04' as const;
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const activities: MatchSortActivity[] = defineActivities('banking-consumer-finance', 'module-04', [
  {
    activityId: 'cf-m04-sort-benchmark-lenses',
    type: 'category-sorting',
    title: 'Which benchmark lens does each element belong to?',
    learningObjective: 'Separate the elements used to compare consumer-finance offers from the credit and channel metrics used to compare performance, so each benchmark is built on a consistent basis.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'A consistent benchmark fixes amount, term, repayment, fee, eligibility and support basis before offers are compared, and defines product, cohort, vintage, period and denominator before credit and channel metrics are compared.',
    categories: [
      { id: 'offer', label: 'Comparing offers', description: 'What the customer is offered, on a fixed basis.' },
      { id: 'performance', label: 'Comparing credit and channel performance', description: 'How cohorts actually perform, with defined cohort, period and denominator.' },
    ],
    items: [
      { id: 'eligibility', text: 'Eligibility requirements', categoryId: 'offer', explanation: 'Eligibility is part of what is offered and must be held on a consistent basis.', hint: 'It decides who can take up the offer.' },
      { id: 'rate-and-fees', text: 'Interest rate basis and relevant fees', categoryId: 'offer', explanation: 'The rate basis and fees feed the total payable, so they must be compared like for like.', hint: 'It is part of the price the customer is quoted.', misplaced: { performance: 'Price terms belong to the offer. Performance measures how accounts behave afterwards.' } },
      { id: 'repayment-flexibility', text: 'Repayment flexibility and due dates', categoryId: 'offer', explanation: 'A consistent comparison fixes amount, term, repayment and support, so these terms must be matched.', hint: 'It describes how and when the customer can pay.' },
      { id: 'total-cost', text: 'Total repayment for the same amount and term', categoryId: 'offer', explanation: 'The lowest advertised rate is not automatically best. Total repayment on the same amount and term shows the real cost.', hint: 'It shows what the customer would end up paying overall.' },
      { id: 'application-journey', text: 'The application journey and available support', categoryId: 'offer', explanation: 'Suitability, transparency and service matter alongside price, so the journey and support belong in the offer comparison.', hint: 'It is what the customer experiences while applying and afterwards.' },
      { id: 'approval-rate', text: 'Approval rate by channel', categoryId: 'performance', explanation: 'Conversion measures need a defined product, cohort, period and denominator, and are only meaningful alongside credit quality.', hint: 'It is a conversion measure that has to be read with later outcomes.', misplaced: { offer: 'Approval rate describes how a channel performs. It is not a term of the offer itself.' } },
      { id: 'first-payment-default', text: 'First-payment default by cohort', categoryId: 'performance', explanation: 'Early repayment performance by cohort connects channel reach to credit quality.', hint: 'It shows how a group of new customers behaves soon after they borrow.' },
      { id: 'dpd-and-loss', text: 'Delinquency and credit loss for a defined vintage', categoryId: 'performance', explanation: 'Delinquency and loss must be defined by product, vintage, period and denominator to be comparable.', hint: 'It measures what has gone wrong with loans from a particular period.' },
      { id: 'recovery-and-cac', text: 'Recovery and customer acquisition cost', categoryId: 'performance', explanation: 'Recovery and acquisition cost complete the picture of what a channel really contributes.', hint: 'It looks at what a channel costs to win and what is later regained.' },
    ],
    sourceRefs: [
      ch('Competitor Benchmarking', 0, 'How Should Products, Pricing and Experience Be Compared?', ['oecdConsumer', 'vnCreditLaw'], 'Dimensions eligibility, interest rate, fee, repayment flexibility, application journey, support and total cost; a consistent benchmark fixes amount, term, repayment, fee, eligibility and support basis.'),
      ch('Competitor Benchmarking', 1, 'Which Credit and Channel Metrics Belong in a Benchmark?', ['bisCredit', 'oecdConsumer'], 'Dimensions approval rate, first-payment default, DPD, credit loss, recovery and CAC; benchmarks define product, cohort, vintage, period and denominator.'),
    ],
  },
]);

export const CONSUMER_FINANCE_M04_PACK: MatchSortPack = {
  packId: 'consumer-finance-m04',
  title: 'Consumer Finance \u00b7 Module 04 practice',
  industryId: 'banking-consumer-finance',
  moduleId: 'module-04',
  sourceModuleKey: MODULE,
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked \u201cDraft / Ready for Review\u201d. This activity uses only the benchmark elements named in the chapters: no figures, rankings or provider names.',
    'Consumer Finance has no entry in reviewHolds.ts at the time of writing; availability is re-checked at runtime against the decks after review holds are applied.',
  ],
  activities: [...activities, ...CF_M04_REFINEMENT_ACTIVITIES],
};
