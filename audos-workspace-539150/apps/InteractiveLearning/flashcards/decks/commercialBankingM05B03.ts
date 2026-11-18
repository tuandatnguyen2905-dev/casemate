// Commercial Banking Module 05, Lesson 5.5 (apps/IndustryKnowledge/commercialBankingM05B03.tsx).
// Excerpts are verbatim. No credit-growth figures, targets or forecasts are used: the chapter mixes outturns,
// a target and an estimate, which cards present only as concepts. The chapter's hypothetical scenarios are
// used only as the concepts they teach and are not presented as data.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

export const CB_LESSON_55_DECK: FlashcardDeckContent = defineLessonDeck({
  industryId: 'banking-commercial',
  industryLabel: 'Commercial Banking',
  moduleId: 'cb-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'COMMERCIAL_BANKING_MODULE05',
  file: 'apps/IndustryKnowledge/commercialBankingM05B03.tsx',
  readAtSha256: 'dfeb92cc611623d584d911ca796e88c68c3cef4e1c9604f7f86f9553c8d84d9b',
  readAt: '2026-11-08',
  chapterMarker: 'bankingChapter({',
  contentStatus: 'Draft / Ready for Review',
  deckId: 'commercial-banking-growth-outlook',
  title: 'Commercial Banking: Growth Outlook & Strategic Opportunities',
  description: 'How to read a banking outlook, which opportunities are investable, and how strategic choices trade off against each other.',
  lessonId: 'cb-m5-l55',
  lessonTitle: '5.5 Growth Outlook & Strategic Opportunities',
  startMarker: "const L55 = '5.5 Growth Outlook & Strategic Opportunities';",
  endMarker: 'export const CB_LESSON_55: BankingLessonBundle',
  chapterIdPrefix: 'cb-m5-l55',
  chapters: [
    { title: 'Where Is Commercial Banking Heading?', sourceTitle: 'Where Is Commercial Banking Heading?', citations: ['cb-m05-s14', 'cb-m05-s16', 'cb-m05-s17', 'cb-m05-s18'] },
    { title: 'Emerging Growth Opportunities for Banks', sourceTitle: 'Emerging Growth Opportunities for Banks', citations: ['cb-m05-s01', 'cb-m05-s02', 'cb-m05-s05', 'cb-m05-s07', 'cb-m05-s12'] },
    { title: 'Strategic Choices for the Banks of Tomorrow', sourceTitle: 'Strategic Choices for the Banks of Tomorrow', citations: ['cb-m05-s14', 'cb-m05-s16', 'cb-m05-s17', 'cb-m05-s18'] },
  ],
  mappingNotes: ['Lesson 5.5 has no entry in reviewHolds.ts and no restriction notice at read time. Chapter 3\u2019s scenarios are labelled hypothetical by the source and are used only as concepts.'],
  cards: [
    {
      id: 'cb55-high-growth-rising-risk',
      ch: 1,
      front: 'The banking outlook is \u201chigh growth with rising risk\u201d. What determines whether that growth becomes durable profit?',
      back: 'Funding, asset quality and capital. Demand creates opportunity, but those three determine whether growth becomes durable profit.',
      explanation: 'A strong credit forecast can support revenue and still weaken a bank if funding, underwriting, provisions or capital fail to keep pace.',
      example: 'A bank that lends faster than it can fund or capitalise safely may grow its loan book and weaken its position.',
      terms: ['Risk-adjusted growth'],
      refs: [
        [1, 'The outlook is high growth with rising risk: demand creates opportunity, but funding, asset quality and capital determine whether growth becomes durable profit.'],
      ],
    },
    {
      id: 'cb55-outturn-target-estimate-scenario',
      ch: 1,
      front: 'How do an outturn, a target, an estimate and a scenario assumption differ?',
      back: 'An outturn is an observed result for a completed or measured period. A target is an intended policy or management outcome, not a guaranteed result. An estimate is forward-looking; a scenario assumption is a conditional input to explore a possible future. Never average them into one series.',
      explanation: 'The same credit number can be opportunity, target or risk depending on its source, period and relationship to deposits, underwriting and capital.',
      example: 'A reported growth rate for a past year, a policy goal for a future year and an agency projection are three different kinds of number.',
      terms: ['Outturn', 'Target', 'Scenario assumption'],
      refs: [
        [1, 'An observed result for a completed or measured period.'],
        [1, 'An intended policy or management outcome, not a guaranteed result.'],
        [1, 'The figures mix outturns, a year-on-year observation, a target and an estimate. They must not be averaged or treated as a consistent forecast series.'],
      ],
    },
    {
      id: 'cb55-system-target-is-not-a-bank-entitlement',
      ch: 1,
      front: 'Why should a system-wide target not be applied to a single bank, and how should an outlook be built?',
      back: 'A bank\u2019s funding, credit room, customer demand, risk appetite and capital capacity can differ materially from the system. Build scenarios rather than a single point prediction.',
      explanation: 'A system target is a policy intention and not a growth guarantee for any one institution.',
      example: 'A bank with limited capital headroom may be unable to grow in line with a system-wide goal.',
      terms: ['Target', 'Scenario assumption'],
      refs: [
        [1, 'Do not translate a system target into guaranteed growth for one bank.'],
        [1, 'Create scenarios rather than a single point prediction.'],
      ],
    },
    {
      id: 'cb55-investable-opportunity-conditions',
      ch: 2,
      front: 'When is a banking growth opportunity investable?',
      back: 'Only when customer need, bank capability, risk-adjusted economics and regulatory capacity align. An attractive segment can still be a poor opportunity without low-cost funding, underwriting capability, distribution or enough capital.',
      explanation: 'Headline growth can conceal acquisition cost, credit loss, conduct exposure, partner dependence, funding pressure or capital use.',
      example: 'A fast-growing customer segment is a poor target for a bank that cannot underwrite its risks.',
      terms: ['Right to win', 'Risk-adjusted return'],
      refs: [
        [2, 'A banking opportunity is investable only when customer need, bank capability, risk-adjusted economics and regulatory capacity align.'],
        [2, 'An attractive segment can still be a poor opportunity for a bank without low-cost funding, underwriting capability, distribution or enough capital.'],
      ],
    },
    {
      id: 'cb55-opportunity-test-and-option-value',
      ch: 2,
      front: 'How should an opportunity be tested when adoption, legal detail or risk performance is uncertain?',
      back: 'Identify the cheapest test that could disprove the thesis, and preserve option value through pilots, modular capabilities or partnerships. Option value is the value of preserving a future choice while uncertainty resolves.',
      explanation: 'Do not scale because a trend label is fashionable; scale only after evidence.',
      example: 'A small pilot of a new proposition can show whether customers use it before the bank commits capital to it.',
      terms: ['Option value', 'Transaction service'],
      refs: [
        [2, 'Identify the cheapest test that could disprove the thesis.'],
        [2, 'Preserve option value through pilots, modular capabilities or partnerships when adoption, legal detail or risk performance remains uncertain.'],
        [2, 'Value of preserving a future choice while uncertainty resolves.'],
      ],
    },
    {
      id: 'cb55-strategy-is-a-system-of-trade-offs',
      ch: 3,
      front: 'Why should no single ratio be optimised in isolation in bank strategy?',
      back: 'Bank strategy is a system of trade-offs: every growth or return lever must be tested against credit quality, funding stability, capital, complexity and trust. Optimising one ratio can weaken the bank.',
      explanation: 'High NIM may reflect risk, fast lending can raise risk-weighted assets and NPLs, low CIR can hide underinvestment, and high ROE can reflect leverage.',
      example: 'A board that demands faster growth, higher margin, lower costs and stronger capital at once must see which of these compete.',
      terms: ['Strategic trade-off', 'Capital headroom'],
      refs: [
        [3, 'Bank strategy is a system of trade-offs: every growth or return lever must be tested against credit quality, funding stability, capital, complexity and trust.'],
        [3, 'Optimising one ratio can weaken the bank.'],
      ],
    },
    {
      id: 'cb55-core-strategic-choices',
      ch: 3,
      front: 'Which six strategic choices does the lesson identify as trade-offs?',
      back: 'Growth versus credit quality, NIM versus lending risk, CASA versus funding stability, digital efficiency versus investment, fee income versus complexity, and ROE versus capital adequacy.',
      explanation: 'Define the objective and constraints, trace each lever through the balance sheet and P&L, compare scenarios, set guardrails and monitor leading indicators.',
      example: 'Pushing for a higher ROE by taking on more leverage may reduce the capital available to absorb stress.',
      terms: ['Guardrail', 'Funding stability'],
      refs: [
        [3, 'Core choices include growth versus credit quality, NIM versus lending risk, CASA versus funding stability, digital efficiency versus investment, fee income versus complexity, and ROE versus capital adequacy.'],
      ],
    },
    {
      id: 'cb55-loan-growth-may-not-improve-profit',
      ch: 3,
      front: 'Why might faster loan growth not improve profit, and how should it be judged?',
      back: 'New volume can require expensive funding, compress pricing, increase opex and risk-weighted assets, and produce future provisions. Evaluate contribution after credit and capital.',
      explanation: 'A teaching case in the chapter treats this as a hypothetical to show the causal chain, not a forecast.',
      example: 'A lender that grows quickly by cutting prices may find the extra volume earns less after funding, losses and capital.',
      terms: ['Capital headroom', 'Guardrail'],
      refs: [
        [3, 'Why loan growth may not improve profit: new volume can require expensive funding, compress pricing, increase opex and RWA, and produce future provisions.'],
        [3, 'Evaluate contribution after credit and capital.'],
      ],
    },
    {
      id: 'cb55-rising-npl-response',
      ch: 3,
      front: 'How should a bank change its growth approach when NPLs rise?',
      back: 'Tighten or reprice risk, strengthen monitoring and collections, reassess sectors, provisions and capital, and protect liquidity rather than chase volume.',
      explanation: 'This is one of the chapter\u2019s hypothetical teaching scenarios: rising non-performing loans change risk appetite and capital choices.',
      example: 'A bank seeing rising arrears in one sector may slow lending there and build its collections capacity.',
      terms: ['Funding stability', 'Guardrail'],
      refs: [
        [3, 'How rising NPLs change growth: tighten or reprice risk, strengthen monitoring and collections, reassess sectors, provisions and capital, and protect liquidity rather than chase volume.'],
      ],
    },
  ],
});

export const COMMERCIAL_BANKING_M05B03_DECKS: FlashcardDeckContent[] = [CB_LESSON_55_DECK];
