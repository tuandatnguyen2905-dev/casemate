// Commercial Banking Module 04, Lessons 4.1 and 4.2 (apps/IndustryKnowledge/commercialBankingM04B03.tsx).
// Excerpts are verbatim and re-checked by decks.test.ts. No market shares, asset sizes, rankings, company
// results or named-bank metrics are used. Lesson 4.2 Chapter 2 carries a restriction notice (unsupported
// rankings and unverified claims), so its card teaches only the method. Lesson 4.3 is added separately.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'banking-commercial',
  industryLabel: 'Commercial Banking',
  moduleId: 'cb-m04',
  moduleLabel: 'Module 04',
  moduleKey: 'COMMERCIAL_BANKING_MODULE04',
  file: 'apps/IndustryKnowledge/commercialBankingM04B03.tsx',
  readAtSha256: '14ffd4a95f627ae6c4b035344840f3c3acf50969e283bab6c4b8c0232a15604c',
  readAt: '2026-11-08',
  chapterMarker: 'bankingChapter({',
  contentStatus: 'Draft / Ready for Review',
};

export const CB_LESSON_41_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'commercial-banking-competition-structure',
  title: 'Commercial Banking: Industry Competition Structure',
  description: 'Where banks compete, Five Forces applied to banking, and why bank advantages resist imitation.',
  lessonId: 'cb-m4-l41',
  lessonTitle: '4.1 Industry Competition Structure',
  startMarker: "const L41 = '4.1 Industry Competition Structure';",
  endMarker: "const L42 = '4.2 Key Industry Players';",
  chapterIdPrefix: 'cb-m4-l41',
  chapters: [
    { title: 'Where banks actually compete', sourceTitle: 'Where banks actually compete', citations: ['cb-m04-s05', 'cb-m04-s06', 'cb-m04-s02'] },
    { title: 'Porter\u2019s Five Forces for banking', sourceTitle: 'Porter\u2019s Five Forces for banking', citations: ['cb-m04-s02', 'cb-m04-s16'] },
    { title: 'Why bank advantages resist imitation', sourceTitle: 'Why bank advantages resist imitation', citations: ['cb-m04-s01', 'cb-m04-s16', 'cb-m04-s05'] },
  ],
  mappingNotes: ['Lesson 4.1 has no restriction notice and no entry in reviewHolds.ts at read time. Market shares, asset sizes and the G-SIB count in the chapters are not used.'],
  cards: [
    {
      id: 'cb41-three-arenas-of-competition',
      ch: 1,
      front: 'In which arenas do banks compete, and what limits that competition?',
      back: 'Funding, lending and distribution, inside a stability-focused regulatory perimeter. Banks compete for the same customer three times: for deposits, for credit relationships and for daily transaction activity.',
      explanation: 'Licences, capital and policy constraints stop banking behaving like an ordinary consumer market.',
      example: 'A bank can win deposits, win loans and win everyday transactions from the same customer, each with a different economic prize.',
      terms: ['Funding franchise', 'Customer franchise'],
      refs: [
        [1, 'Banking rivalry operates across funding, lending and distribution inside a stability-focused regulatory perimeter.'],
        [1, 'Banks compete for the same customer three times: for deposits, for credit relationships and for daily transaction activity.'],
      ],
    },
    {
      id: 'cb41-funding-lending-transaction-wins',
      ch: 1,
      front: 'What does each kind of competitive win give a bank?',
      back: 'A funding win can support margin, a lending win consumes liquidity and capital, and a transaction win can deepen data and retention.',
      explanation: 'Competition therefore links customer share to balance-sheet and risk capacity.',
      example: 'Winning salary accounts lowers funding pressure, whereas winning large loans uses up capital and liquidity.',
      terms: ['CASA', 'Primary relationship'],
      refs: [
        [1, 'A funding win can support margin, a lending win consumes liquidity and capital, and a transaction win can deepen data and retention.'],
      ],
    },
    {
      id: 'cb41-structure-before-strategy',
      ch: 1,
      front: 'How should a competitor analysis begin, and why can demand exceed what a Vietnamese bank may lend?',
      back: 'By grouping banks with comparable mandates and customers. In Vietnam a bank\u2019s demand and capital capacity may exceed its permitted growth in a given period, because lending growth is tied to regulatory credit-room allocation.',
      explanation: 'A foreign corporate bank and a domestic mass-retail bank overlap in some services but do not compete symmetrically for every pool.',
      example: 'A bank with eager borrowers and spare capital may still have to slow lending to stay within its allocated growth.',
      terms: ['State-controlled bank', 'Joint-stock bank', 'Credit room'],
      refs: [
        [1, 'Start a competitor analysis by grouping banks with comparable mandates and customers.'],
        [1, 'A bank\u2019s demand and capital capacity may exceed its permitted growth in a given period.'],
      ],
    },
    {
      id: 'cb41-five-forces-at-job-level',
      ch: 2,
      front: 'Why are entry barriers high yet competitive pressure still intense in banking?',
      back: 'Entry barriers are high, but rivalry and substitution are intense because customers can move transactions, deposits and selected financial jobs among many providers. A bank may face low new-bank entry yet high pressure on a product.',
      explanation: 'Use Five Forces at the customer-job level while keeping banking\u2019s regulatory and balance-sheet constraints.',
      example: 'Few new banks are licensed, yet a customer can move bill payments to an e-wallet and savings to whichever bank pays a more transparent, better rate.',
      terms: ['Substitute', 'Entry barrier'],
      refs: [
        [2, 'Entry barriers are high, but rivalry and substitution are intense because customers can move transactions, deposits and selected financial jobs among many providers.'],
        [2, 'A bank may face low new-bank entry yet high pressure on a product.'],
        [2, 'Use Five Forces at the customer-job level and retain banking\u2019s regulatory and balance-sheet constraints.'],
      ],
    },
    {
      id: 'cb41-licensed-entry-versus-interface',
      ch: 2,
      front: 'How does a new app differ from a new bank, and what constrains true entry?',
      back: 'An app can look like a bank without holding a banking licence, a funding franchise or credit risk. Licensing, capital, compliance and trust constrain true entry, so customer-interface competition must be separated from full-balance-sheet competition.',
      explanation: 'Fintech and e-wallet services can substitute for selected jobs without replacing the whole bank.',
      example: 'A payments app can take a share of daily transactions while still depending on banks for accounts and settlement.',
      terms: ['Entry barrier', 'Substitute'],
      refs: [
        [2, 'A new app can look like a new bank without holding a banking license, a funding franchise or credit risk.'],
        [2, 'Five Forces helps separate customer-interface competition from full-balance-sheet competition.'],
        [2, 'Licensing, capital, compliance and trust constrain entry.'],
        [2, 'Fintech and e-wallet services can substitute for selected jobs without replacing the whole bank.'],
      ],
    },
    {
      id: 'cb41-force-intensity-varies',
      ch: 2,
      front: 'Why should Five Forces ratings not be generic, and can competitors also be complements?',
      back: 'Force intensity varies by segment: a multinational corporate may have strong bargaining power across banks and markets, while a thin-file SME may have fewer alternatives. A payments app can weaken a bank\u2019s interface advantage while depending on bank accounts and payment rails.',
      explanation: 'Competitive and complementary roles can coexist.',
      example: 'A high-balance depositor may chase the best rate, while a salary customer may stay because the account is convenient.',
      terms: ['Depositor power', 'Borrower power'],
      refs: [
        [2, 'Force intensity varies by segment.'],
        [2, 'A multinational corporate may have strong bargaining power across banks and markets; a thin-file SME may have fewer alternatives.'],
        [2, 'A payments app can weaken the bank\u2019s interface advantage while depending on bank accounts and payment rails.'],
      ],
    },
    {
      id: 'cb41-moat-is-a-system',
      ch: 3,
      front: 'What makes a bank advantage durable, and why does copying its features not copy the advantage?',
      back: 'A reinforcing system of trust, funding, risk capability, capital, infrastructure and relationships, not one app feature. Copying a front-end feature does not reproduce the liability franchise, portfolio history or operating resilience behind it.',
      explanation: 'The system compounds and is path-dependent: it is shaped by accumulated history that cannot be recreated instantly.',
      example: 'A competitor can copy an app screen quickly, but not years of trusted balances and risk data.',
      terms: ['Economic moat', 'Path dependence'],
      refs: [
        [3, 'Durable bank advantage is a reinforcing system of trust, funding, risk capability, capital, infrastructure and relationships\u2014not one app feature.'],
        [3, 'The system compounds and is path-dependent. Copying a front-end feature does not reproduce the liability franchise, portfolio history or operating resilience behind it.'],
      ],
    },
    {
      id: 'cb41-stress-the-moat',
      ch: 3,
      front: 'How should a claimed bank advantage be tested?',
      back: 'Ask whether the strength applies across segments, and stress it: a funding advantage can disappear after a trust shock, rapid scale can overwhelm controls, and concentrated relationships can become correlated exposure.',
      explanation: 'Specify the arena and the economic mechanism rather than asserting a general strength.',
      example: 'Corporate relationships may not create a mass-retail acquisition-cost advantage.',
      terms: ['Concentration', 'Correlated exposure'],
      refs: [
        [3, 'Stress the moat: a funding advantage can disappear after a trust shock; rapid scale can overwhelm controls; concentrated relationships can become correlated exposure.'],
        [3, 'Ask whether a strength applies across segments.'],
        [3, 'Specify the arena and economic mechanism.'],
      ],
    },
  ],
});

export const CB_LESSON_42_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'commercial-banking-key-industry-players',
  title: 'Commercial Banking: Key Industry Players',
  description: 'How to profile global and Vietnamese banks without unsupported rankings, and what market position means.',
  lessonId: 'cb-m4-l42',
  lessonTitle: '4.2 Key Industry Players',
  startMarker: "const L42 = '4.2 Key Industry Players';",
  endMarker: "const L43 = '4.3 Competitor Benchmarking';",
  chapterIdPrefix: 'cb-m4-l42',
  chapters: [
    { title: 'Read global players by model\u2014not fame', sourceTitle: 'Read global players by model\u2014not fame', citations: ['cb-m04-s01', 'cb-m04-s16'] },
    { title: 'Vietnam\u2019s leading bank archetypes', sourceTitle: 'Vietnam\u2019s leading bank archetypes', citations: ['cb-m04-s05', 'cb-m04-s07', 'cb-m04-s08', 'cb-m04-s09', 'cb-m04-s10', 'cb-m04-s11', 'cb-m04-s12', 'cb-m04-s13'] },
    { title: 'What market position really means', sourceTitle: 'What market position really means', citations: ['cb-m04-s05', 'cb-m04-s06'] },
  ],
  mappingNotes: [
    'Lesson 4.2 has no entry in reviewHolds.ts at read time. Chapter 2 carries a restriction notice excluding unsupported rankings and unverified claims about network size, fee leadership or asset quality: its card teaches only the method, and names no bank or metric.',
    'Asset rankings, market shares, asset totals and company results in the chapters are deliberately not used.',
  ],
  cards: [
    {
      id: 'cb42-scale-then-separate-lenses',
      ch: 1,
      front: 'What does asset scale establish when comparing global banks, and what must be analysed separately?',
      back: 'It establishes context. Then analyse model, geography, funding, risk and return separately, because asset rank is neither a profit rank nor a safety rank.',
      explanation: 'Scale helps funding, investment and diversification but can add complexity, regulation and systemic obligations.',
      example: 'A bank can lead on assets because of its domestic system and policy context without having the strongest returns.',
      terms: ['Total assets', 'Universal bank', 'Systemic importance'],
      refs: [
        [1, 'Use scale to establish context, then analyze model, geography, funding, risk and return separately.'],
        [1, 'Asset rank is neither a profit rank nor a safety rank.'],
      ],
    },
    {
      id: 'cb42-global-profile-and-normalising',
      ch: 1,
      front: 'What should a global bank profile cover, and what can distort cross-border comparison?',
      back: 'Assets, loans and deposits, customer segments, geographic reach, non-interest businesses, capital, asset quality, efficiency and returns. Currency translation, reporting dates, consolidation and accounting standards can distort cross-border comparisons.',
      explanation: 'Use source-reported values carefully and focus on ratio definitions and trends.',
      example: 'Two banks reporting in different currencies and on different dates cannot be ranked from raw totals.',
      terms: ['Currency translation', 'Reporting scope'],
      refs: [
        [1, 'Profile a global bank across assets, loans and deposits, customer segments, geographic reach, non-interest businesses, capital, asset quality, efficiency and returns.'],
        [1, 'Currency translation, reporting dates, consolidation and accounting standards can distort cross-border comparisons.'],
      ],
    },
    {
      id: 'cb42-positioning-is-not-ranking',
      ch: 2,
      front: 'What is bank positioning, and what must it not be turned into?',
      back: 'Positioning describes where and how a bank competes. It must not be inflated into an unsupported rank or a complete performance judgement. Archetypes explain strategic choices and likely KPI sensitivities, but selected metrics cannot fill an incomplete scorecard.',
      explanation: 'The current evidence does not support complete rankings, so qualitative positioning is used to form hypotheses and like-for-like evidence to test them.',
      example: 'Describing a bank as focused on retail and SME customers is a positioning statement. Calling it the best bank is a ranking claim that needs defined, verified metrics.',
      terms: ['Positioning', 'Ecosystem banking'],
      refs: [
        [2, 'Positioning describes where and how a bank competes; it must not be inflated into an unsupported rank or complete performance judgment.'],
        [2, 'Archetypes explain strategic choices and likely KPI sensitivities.'],
        [2, 'The current source set does not support complete rankings for eight banks.'],
      ],
    },
    {
      id: 'cb42-define-market-position',
      ch: 3,
      front: 'What must be defined before a market-position claim is used?',
      back: 'The market, the metric, the denominator and the date, plus the economic mechanism. Then check whether the position produces a sustainable customer or funding advantage.',
      explanation: 'A high asset share can reflect low-margin or capital-intensive activity, and a smaller bank can have stronger returns or a more valuable niche.',
      example: '\u201cMarket leader\u201d means nothing until the market and the measure are named.',
      terms: ['Market share', 'Denominator discipline'],
      refs: [
        [3, 'Market position is multidimensional: define the market, denominator, date and economic mechanism before using a share or rank.'],
        [3, 'explain whether the position produces sustainable customer or funding advantage'],
      ],
    },
    {
      id: 'cb42-position-versus-performance',
      ch: 3,
      front: 'How does market position differ from performance, and how should diversification be treated?',
      back: 'Position is where the bank stands; performance is what return and risk it produced. Diversification should be tested, not presumed from product breadth.',
      explanation: 'Assets, deposits and loans are stocks while profit and income are flows, so relating them needs defined ratios.',
      example: 'A bank may offer many products yet depend economically on one funding pool or risk segment.',
      terms: ['Diversification', 'Market share'],
      refs: [
        [3, 'Separate position\u2014where the bank stands\u2014from performance\u2014what return and risk it produced.'],
        [3, 'Diversification should be tested, not presumed from product breadth.'],
      ],
    },
  ],
});

export const COMMERCIAL_BANKING_M04B03_DECKS: FlashcardDeckContent[] = [CB_LESSON_41_DECK, CB_LESSON_42_DECK];
