// Consumer Finance Module 03 activities (source: consumerFinanceModule03.tsx).
// Every activity draws only on what the chapters state; no figures, dates or legal thresholds.

import type { MatchSortActivity, MatchSortPack } from '../types';
import { chapterRef, defineActivities } from './shared';
import { CF_M03_REFINEMENT_ACTIVITIES } from './consumerFinanceRefinements';
import { SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'CONSUMER_FINANCE_MODULE03' as const;
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const activities: MatchSortActivity[] = defineActivities('banking-consumer-finance', 'module-03', [
  {
    activityId: 'cf-m03-sort-lending-models',
    type: 'category-sorting',
    title: 'Balance-sheet lending or partnership model?',
    learningObjective: 'Distinguish the features and conditions of balance-sheet consumer lending from those of partnership and embedded-finance models.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Balance-sheet lending gives control and concentrates risk in the institution. Partnerships extend access only when partner quality, lender authority, customer clarity and unit economics stay sound.',
    categories: [
      { id: 'balance-sheet', label: 'Balance-sheet lending', description: 'The institution funds, originates and keeps the credit.' },
      { id: 'partnership', label: 'Partnership and embedded finance', description: 'A lender\u2019s offer is delivered through a retailer or platform.' },
    ],
    items: [
      { id: 'funds-retains', text: 'Funds, originates and retains the consumer receivables', categoryId: 'balance-sheet', explanation: 'Banks and finance companies in this model keep the receivables on their own books.', hint: 'The provider keeps the credit it creates.', misplaced: { partnership: 'In a partnership the retailer or platform only presents the offer. Funding, originating and keeping the receivables is what defines balance-sheet lending.' } },
      { id: 'product-control', text: 'Product and relationship control, with funding, credit and capital risk concentrated in the institution', categoryId: 'balance-sheet', explanation: 'Keeping the whole exposure gives control but concentrates the risk.', hint: 'One institution decides everything and carries everything.' },
      { id: 'interest-fees', text: 'Interest and permitted fees earned over the account lifecycle', categoryId: 'balance-sheet', explanation: 'The institution earns interest and permitted fees across the life of the account, and absorbs credit loss and operating cost.', hint: 'Income arrives gradually across the life of each account.' },
      { id: 'offer-in-journey', text: 'An authorised lender\u2019s offer placed inside a retailer or platform journey', categoryId: 'partnership', explanation: 'A retailer or platform places the lender\u2019s offer in its own journey, while the lender remains accountable.', hint: 'The customer meets the offer in someone else\u2019s shop or app.' },
      { id: 'explicit-responsibilities', text: 'Explicit responsibility for marketing, data, decision, agreement, funding, service and complaints', categoryId: 'partnership', explanation: 'When several parties are involved, each step must be assigned to a named party.', hint: 'Several organisations are involved, so each step needs a named owner.' },
      { id: 'sound-conditions', text: 'Works only if partner quality, lender authority, customer clarity and unit economics remain sound', categoryId: 'partnership', explanation: 'Partnerships expand access only when these conditions hold.', hint: 'Its success depends on a third party behaving well.' },
    ],
    sourceRefs: [
      ch('Industry Business Models', 0, 'How Does Balance-Sheet Consumer Lending Work?', ['vnCreditLaw', 'sbvInstitutions', 'bisCredit'], 'Key insight and scope: the institution funds, originates and retains receivables, earns interest and fees, and concentrates funding, credit and capital risk.'),
      ch('Industry Business Models', 1, 'How Do Partnership and Embedded-Finance Models Work?', ['oecdConsumer', 'vnCreditLaw', 'vnData', 'vnElectronic'], 'Key insight and scope: partnerships expand access only when partner quality, lender authority, customer clarity and unit economics remain sound; responsibilities stay explicit.'),
    ],
  },
  {
    activityId: 'cf-m03-sort-risk-carriers-vs-supporters',
    type: 'category-sorting',
    title: 'Who carries the credit risk, and who supports?',
    learningObjective: 'Distinguish institutions that authorise, fund and retain receivables from partners that support the lifecycle without taking over the lender\u2019s authority.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Institutions that authorise, fund and retain receivables carry the financial, capital and customer-accountability obligations. Bureaus, verification, payment and platform partners extend capability without automatically assuming the lender\u2019s decision authority.',
    categories: [
      { id: 'carries-risk', label: 'Carries the credit risk and accountability', description: 'Authorises, funds and retains the receivables.' },
      { id: 'supports', label: 'Supports without taking over lender authority', description: 'Provides information, identity, payments or software under contract and oversight.' },
    ],
    items: [
      { id: 'finance-company', text: 'A finance company specialising in retail instalments', categoryId: 'carries-risk', explanation: 'Finance companies originate within their own permissions and funding, and carry the portfolio risk.', hint: 'It lends, funds the portfolio and keeps the exposure.' },
      { id: 'bank-cards', text: 'A bank offering cards to existing relationship customers', categoryId: 'carries-risk', explanation: 'Banks originate within institution-specific permissions and carry the obligations of the credit.', hint: 'It lends to its own customers from its own balance sheet.' },
      { id: 'card-issuer', text: 'A card issuer extending reusable credit', categoryId: 'carries-risk', explanation: 'A card issuer is one of the institutions that authorise, fund and retain receivables.', hint: 'It decides on the limit and keeps the exposure.' },
      { id: 'credit-bureau', text: 'A credit bureau supplying information', categoryId: 'supports', explanation: 'Bureaus support the lender\u2019s information needs and do not make the credit decision.', hint: 'It supplies facts, but the lending decision is someone else\u2019s.', misplaced: { 'carries-risk': 'A bureau provides information for the decision. It does not lend or hold the receivables.' } },
      { id: 'verification-vendor', text: 'A verification vendor checking identity', categoryId: 'supports', explanation: 'A lender can use external identity verification but retains responsibility for approval and customer treatment.', hint: 'It performs a check that the lender relies on.' },
      { id: 'payment-provider', text: 'A payment provider moving the funds', categoryId: 'supports', explanation: 'Payment providers support the lifecycle under contracts and oversight, without carrying the credit risk.', hint: 'It moves money but does not decide who gets credit.' },
      { id: 'loan-platform', text: 'A loan-platform vendor supplying software', categoryId: 'supports', explanation: 'Software vendors extend capability under contracts, access controls and oversight.', hint: 'It provides tools the lender uses.' },
      { id: 'data-processor', text: 'A data processor handling customer data for the lender', categoryId: 'supports', explanation: 'Data processors act under contract and oversight, with security, resilience and audit arrangements verified by the lender.', hint: 'It handles information on the lender\u2019s behalf.' },
    ],
    sourceRefs: [
      ch('Industry Ecosystem & Stakeholders', 0, 'Which Financial Institutions Carry the Credit Risk?', ['sbvInstitutions', 'vnCreditLaw', 'bisCredit'], 'Key insight: institutions that authorise, fund and retain receivables carry distinct financial, capital and customer-accountability obligations; dimensions bank, finance company, card issuer.'),
      ch('Industry Ecosystem & Stakeholders', 1, 'What Do Technology, Bureau and Payment Partners Do?', ['cic', 'nistCSF', 'vnData', 'vnCreditLaw'], 'Key insight: partners extend capability without automatically assuming the lender\u2019s decision authority; dimensions credit bureau, verification vendor, payment provider, loan platform, data processor.'),
    ],
  },
]);

export const CONSUMER_FINANCE_M03_PACK: MatchSortPack = {
  packId: 'consumer-finance-m03',
  title: 'Consumer Finance \u00b7 Module 03 practice',
  industryId: 'banking-consumer-finance',
  moduleId: 'module-03',
  sourceModuleKey: MODULE,
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked \u201cDraft / Ready for Review\u201d. These activities use only mechanisms and roles stated in the chapters: no figures, dates or legal thresholds.',
    'Consumer Finance has no entry in reviewHolds.ts at the time of writing; availability is re-checked at runtime against the decks after review holds are applied.',
  ],
  activities: [...activities, ...CF_M03_REFINEMENT_ACTIVITIES],
};
