// Commercial Banking Module 04, Lessons 4.1 and 4.2 activities (source: commercialBankingM04B03.tsx).
// No market shares, asset sizes, rankings, company results or named-bank metrics. Learners see the Module 04
// Learning Visuals from commercialBankingM04VisualSpecs.ts, not the visual specs inline in the lesson file, so
// activities are grounded only in the chapter narrative, deep dive, key terms and the rendered visual.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS, SORT_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE04' as const;
const L41 = '4.1 Industry Competition Structure';
const L42 = '4.2 Key Industry Players';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

const A2 = 'Porter\u2019s Five Forces for banking';
const A3 = 'Why bank advantages resist imitation';
const B3 = 'What market position really means';

export const CB_M04B03_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-04', [
  {
    activityId: 'cb-m04-match-five-forces',
    type: 'concept-matching',
    title: 'Five Forces applied to banking',
    learningObjective: 'Match each competitive force in banking to how it works, separating interface entry from full-balance-sheet entry.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Force and intensity',
    answerLabel: 'How it works in banking',
    summary: 'High barriers to becoming a bank do not eliminate product-level competitive pressure. Use Five Forces at the customer-job level and keep banking\u2019s regulatory and balance-sheet constraints in view.',
    items: {
      prompts: [
        { id: 'force-rivalry', text: 'Rivalry: high' },
        { id: 'force-entrants', text: 'New entrants: low' },
        { id: 'force-depositors', text: 'Depositor power: moderate' },
        { id: 'force-borrowers', text: 'Borrower power: moderate' },
        { id: 'force-substitutes', text: 'Substitutes: rising' },
      ],
      answers: [
        { id: 'lens-rivalry', text: 'Banks contest deposits, pricing, credit room and digital engagement.' },
        { id: 'lens-entrants', text: 'Interface entry is easier than bank entry.' },
        { id: 'lens-depositors', text: 'Transparent rates and easy switching, though salary convenience anchors some customers.' },
        { id: 'lens-borrowers', text: 'Large corporates negotiate across banks and markets; thin-file SMEs have fewer options.' },
        { id: 'lens-substitutes', text: 'Selected jobs are substituted, not all functions.' },
      ],
    },
    pairs: [
      { id: 'pair-force-rivalry', promptId: 'force-rivalry', answerId: 'lens-rivalry', explanation: 'Licensed banks compete intensely for deposits, credit allocation and digital engagement, and credit room shapes how far lending rivalry can go.', hint: 'The contest among existing licensed banks.' },
      { id: 'pair-force-entrants', promptId: 'force-entrants', answerId: 'lens-entrants', explanation: 'Licensing, capital, compliance and trust constrain entry as a bank, while an app can look like a bank without holding a licence, a funding franchise or credit risk.', hint: 'Becoming a bank is hard, but looking like one is not.' },
      { id: 'pair-force-depositors', promptId: 'force-depositors', answerId: 'lens-depositors', explanation: 'Deposit customers gain power when rates are transparent and switching is easy, but a salary customer may be anchored by convenience.', hint: 'What gives savers leverage, and what keeps some of them in place?' },
      { id: 'pair-force-borrowers', promptId: 'force-borrowers', answerId: 'lens-borrowers', explanation: 'Force intensity varies by segment: a multinational corporate may negotiate across banks and capital markets, while a thin-file SME may have fewer alternatives.', hint: 'Power depends on who is asking for the loan.' },
      { id: 'pair-force-substitutes', promptId: 'force-substitutes', answerId: 'lens-substitutes', explanation: 'Fintechs, e-wallets, consumer-finance providers and capital markets take selected customer jobs without replacing the whole bank.', hint: 'The threat is to one customer job at a time.' },
    ],
    sourceRefs: [
      ch(L41, 1, A2, ['cb-m04-s02', 'cb-m04-s16'], 'Chapter narrative (how it works, Vietnam example), deep dive \u201cAvoid generic force ratings\u201d and the rendered Five Forces diagram: each force with its intensity and how it works.'),
    ],
  },
  {
    activityId: 'cb-m04-match-advantage-links-v2',
    type: 'concept-matching',
    title: 'The links in the bank advantage flywheel',
    learningObjective: 'Match each capability in the bank advantage flywheel to what it creates, and see why the moat is a connected system and not one feature.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Capability',
    answerLabel: 'What it creates',
    summary: 'The moat is the connected operating system behind the product, not a standalone feature. The system is path-dependent: a trust shock can drain the funding advantage, and rapid scale can overwhelm controls.',
    items: {
      prompts: [
        { id: 'link-trust', text: 'Trust and licence' },
        { id: 'link-funding', text: 'Stable balances' },
        { id: 'link-data', text: 'Relationships and risk data' },
        { id: 'link-operations', text: 'Reliable operations' },
        { id: 'link-capital', text: 'Retained earnings and capital' },
      ],
      answers: [
        { id: 'creates-access', text: 'Permission and confidence to hold customer funds, which attracts balances.' },
        { id: 'creates-capacity', text: 'Lower funding pressure.' },
        { id: 'creates-signal', text: 'Better service and risk decisions.' },
        { id: 'creates-activity', text: 'Deeper customer activity.' },
        { id: 'creates-durability', text: 'Loss absorption and support for prudent growth.' },
      ],
    },
    pairs: [
      { id: 'pair-link-trust', promptId: 'link-trust', answerId: 'creates-access', explanation: 'Without permission and confidence there are no balances to build a franchise on: trust attracts balances.', hint: 'It decides whether customers will place money with the bank at all.' },
      { id: 'pair-link-funding', promptId: 'link-funding', answerId: 'creates-capacity', explanation: 'Balances that stay with the bank reduce how hard and how expensively it must look for other funding.', hint: 'It is the bank\u2019s supply of dependable money.' },
      { id: 'pair-link-data', promptId: 'link-data', answerId: 'creates-signal', explanation: 'Repeated activity gives insight into customers, which improves both how they are served and how their risk is judged.', hint: 'It comes from watching how customers use the bank over time.' },
      { id: 'pair-link-operations', promptId: 'link-operations', answerId: 'creates-activity', explanation: 'Dependable payment and technology infrastructure keeps customers using the bank day to day.', hint: 'Customers use more of what works every time.' },
      { id: 'pair-link-capital', promptId: 'link-capital', answerId: 'creates-durability', explanation: 'Capital absorbs losses and supports prudent growth, so the franchise survives stress.', hint: 'It is what the bank can fall back on when something goes wrong.' },
    ],
    sourceRefs: [
      ch(L41, 2, A3, ['cb-m04-s01', 'cb-m04-s16', 'cb-m04-s05'], 'Chapter narrative \u201cHow it works\u201d (trust attracts balances; balances lower funding pressure; data and relationships improve service and risk decisions; reliable operations deepen activity; retained earnings and capital support prudent growth) and the rendered flywheel diagram.'),
    ],
  },
  {
    activityId: 'cb-m04-sort-position-vs-performance',
    type: 'category-sorting',
    title: 'Market position or performance?',
    learningObjective: 'Separate measures of where a bank stands from measures of the return it produced, so a position is never read as performance.',
    instructions: SORT_INSTRUCTIONS,
    summary: 'Separate position, where the bank stands, from performance, what return and risk it produced. Assets, deposits and loans are stocks, while profit and income are flows, and relating them needs defined ratios.',
    categories: [
      { id: 'position', label: 'Market position', description: 'Where the bank stands: stocks and shares measured at a reporting date.' },
      { id: 'performance', label: 'Performance', description: 'What return the bank produced over a period.' },
    ],
    items: [
      { id: 'total-assets-position', text: 'Total assets', categoryId: 'position', explanation: 'Total assets show scale, which is a position, not a return.', hint: 'It describes size at a date.' },
      { id: 'loans-position', text: 'Customer loans outstanding', categoryId: 'position', explanation: 'Loans outstanding show how large the lending book is, which is a stock.', hint: 'It counts what is owed to the bank at a date.' },
      { id: 'deposits-position', text: 'Customer deposits', categoryId: 'position', explanation: 'Deposits show the size of the funding base at a date.', hint: 'It counts what the bank holds for customers at a date.' },
      { id: 'segment-share-position', text: 'Share of a defined segment', categoryId: 'position', explanation: 'A share is a position only when the market, denominator and date are defined.', hint: 'It compares the bank with a defined market total.' },
      { id: 'pbt-performance', text: 'Profit before tax', categoryId: 'performance', explanation: 'Profit is a flow earned over a period, which describes performance.', hint: 'It is earned across a period rather than measured at a date.', misplaced: { position: 'Profit is a flow. Assets, deposits and loans are the stocks that describe position.' } },
      { id: 'income-performance', text: 'Operating income', categoryId: 'performance', explanation: 'Income is a flow and shows what the position produced.', hint: 'It shows what was earned, not what is held.' },
      { id: 'returns-performance', text: 'Return on assets and return on equity', categoryId: 'performance', explanation: 'Return ratios show value created after the resources used, so they describe performance.', hint: 'They relate profit to the resources used to earn it.' },
    ],
    sourceRefs: [
      ch(L42, 2, B3, ['cb-m04-s05', 'cb-m04-s06'], '\u201cPosition is not performance\u201d deep dive: position is where the bank stands, performance is what return and risk it produced; assets, deposits and loans are stocks while PBT and income are flows.'),
    ],
  },
]);
