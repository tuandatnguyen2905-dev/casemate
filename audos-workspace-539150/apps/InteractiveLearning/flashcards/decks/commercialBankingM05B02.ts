// Commercial Banking Module 05, Lesson 5.3 (apps/IndustryKnowledge/commercialBankingM05B02.tsx).
// Lesson 5.4 shares this file but is under a lesson-level review hold (REV-P0-12): it is NOT read for
// content, and the deck's end marker stops before it. Excerpts are verbatim and come only from text the
// learner sees (the source's registerVisual specs are not rendered). No growth rates, branch counts or
// adoption figures are used.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

export const CB_LESSON_53_DECK: FlashcardDeckContent = defineLessonDeck({
  industryId: 'banking-commercial',
  industryLabel: 'Commercial Banking',
  moduleId: 'cb-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'COMMERCIAL_BANKING_MODULE05',
  file: 'apps/IndustryKnowledge/commercialBankingM05B02.tsx',
  readAtSha256: '2d971d0e7f7a817e9318fa704a27befb4fb15fee35f0bef4291de474b1956f3e',
  readAt: '2026-11-08',
  chapterMarker: 'bankingChapter({',
  contentStatus: 'Draft / Ready for Review',
  deckId: 'commercial-banking-market-channel-trends',
  title: 'Commercial Banking: Market & Channel Trends',
  description: 'How distribution is moving from channels to journeys, how relationship economics are changing, and how Vietnam\u2019s ecosystem fits together.',
  lessonId: 'cb-m5-l53',
  lessonTitle: '5.3 Market & Channel Trends',
  startMarker: "const L53 = '5.3 Market & Channel Trends';",
  endMarker: "const L54 = '5.4 Regulatory & Sustainability Trends';",
  chapterIdPrefix: 'cb-m5-l53',
  chapters: [
    { title: 'The Evolution of Banking Distribution', sourceTitle: 'The Evolution of Banking Distribution', citations: ['cb-m05-s02', 'cb-m05-s03', 'cb-m05-s04'] },
    { title: 'How Banking Business Models Are Evolving', sourceTitle: 'How Banking Business Models Are Evolving', citations: ['cb-m05-s02', 'cb-m05-s03', 'cb-m05-s07'] },
    { title: 'Market and Channel Developments in Vietnam', sourceTitle: 'Market and Channel Developments in Vietnam', citations: ['cb-m05-s02', 'cb-m05-s03', 'cb-m05-s04', 'cb-m03-s09'] },
  ],
  mappingNotes: [
    'Lesson 5.3 has no entry in reviewHolds.ts and no restriction notice at read time. Lesson 5.4, in the same source file, is held and was not read for content.',
    'Cashless, QR and contactless growth rates in the chapters are not used.',
  ],
  cards: [
    {
      id: 'cb53-journey-orchestration',
      ch: 1,
      front: 'How is bank distribution changing, and where should human value be protected?',
      back: 'It is shifting from channel ownership to journey orchestration: routine activity moves digital while trust-heavy needs use expert and hybrid support. Hybrid journeys preserve continuity and trust.',
      explanation: 'The branch may process fewer transfers while remaining the place where a complex facility or a high-stakes problem is handled.',
      example: 'A balance enquiry moves to the app, while a business owner still goes to a banker to discuss a complex facility.',
      terms: ['Omnichannel', 'Relationship manager', 'Cost-to-serve'],
      refs: [
        [1, 'Distribution is shifting from channel ownership to journey orchestration: routine activity moves digital while trust-heavy needs use expert and hybrid support.'],
        [1, 'Hybrid journeys preserve continuity and trust.'],
      ],
    },
    {
      id: 'cb53-match-channel-to-customer-job',
      ch: 1,
      front: 'What should decide which channel serves a customer job?',
      back: 'Frequency, complexity, value, emotional stakes, identity needs and failure consequences. A balance enquiry and a restructuring conversation should not follow the same design logic.',
      explanation: 'Measure the whole journey, including assisted completion, transfers between channels, repeat contact and resolution, not only app usage or branch traffic.',
      example: 'A customer asking for a balance needs speed, whereas a customer renegotiating debt needs a conversation.',
      terms: ['Omnichannel', 'Hybrid service'],
      refs: [
        [1, 'Evaluate frequency, complexity, value, emotional stakes, identity needs and failure consequences.'],
        [1, 'A balance enquiry and a restructuring conversation should not follow the same design logic.'],
      ],
    },
    {
      id: 'cb53-removing-a-touchpoint-risk',
      ch: 1,
      front: 'What can go wrong when a physical touchpoint is removed, and how may branch roles shift?',
      back: 'Removing a physical touchpoint without replacing its trust function can reduce value. Branches can shift toward advice and exceptions rather than routine transactions.',
      explanation: 'Channel mix affects cost to serve, acquisition, customer experience, deposit activity and retention.',
      example: 'Closing a branch that customers used to resolve problems, without another route for that help, can lose those customers.',
      terms: ['Cost-to-serve', 'Channel mix'],
      refs: [
        [1, 'Removing a physical touchpoint without replacing its trust function can reduce value.'],
        [1, 'Branches can shift toward advice and exceptions.'],
      ],
    },
    {
      id: 'cb53-relationship-economics-not-product-margin',
      ch: 2,
      front: 'What do emerging banking business models optimise, and how can that make an unprofitable-looking product worthwhile?',
      back: 'Relationship economics across funding, fees, risk and service cost, not the margin of one product alone. A free account can attract salary flows, lower funding cost and support responsible cross-sell.',
      explanation: 'Measure the customer system: revenue, funding value, risk, service cost and retention together.',
      example: 'A no-fee account that brings in a customer\u2019s salary every month can be worth more than the fees it forgoes.',
      terms: ['Non-interest income', 'CASA'],
      refs: [
        [2, 'Emerging banking models optimise relationship economics across funding, fees, risk and service cost\u2014not the margin of one product alone.'],
        [2, 'A free account can look unprofitable as a product and valuable as a relationship if it attracts salary flows, lowers funding cost and supports responsible cross-sell.'],
      ],
    },
    {
      id: 'cb53-when-digital-improves-cir',
      ch: 2,
      front: 'When does digital change improve a bank\u2019s cost-to-income ratio?',
      back: 'When recurring service shifts to a lower total cost faster than technology, cyber, data, migration and dual-channel expenses grow. A transformation can worsen CIR during investment and improve it after adoption and process retirement.',
      explanation: 'Digital efficiency depends on real adoption and on the total cost, including the cost of running old and new channels side by side.',
      example: 'Running both a legacy process and a new digital one for a long time can push the ratio up before it comes down.',
      terms: ['CIR', 'CAC'],
      refs: [
        [2, 'Digital improves CIR when recurring service shifts to a lower total cost faster than technology, cyber, data, migration and dual-channel expenses grow.'],
        [2, 'A transformation can worsen CIR during investment and improve it after adoption and process retirement.'],
      ],
    },
    {
      id: 'cb53-contribution-logic-and-clv',
      ch: 2,
      front: 'How should customer lifetime value be judged, and when is cross-sell not high quality?',
      back: 'Use contribution logic: income and funding value minus acquisition, service, expected credit loss, fraud, partner and capital costs. Cross-sell volume without customer suitability or risk discipline is not high-quality customer lifetime value.',
      explanation: 'Customer lifetime value is expected relationship value after relevant costs and risk over time.',
      example: 'Selling many products to a customer who cannot afford them adds volume but may add loss.',
      terms: ['CLV', 'CAC'],
      refs: [
        [2, 'Use contribution logic: income and funding value minus acquisition, service, expected credit loss, fraud, partner and capital costs.'],
        [2, 'Cross-sell volume without customer suitability or risk discipline is not high-quality CLV.'],
        [2, 'Customer lifetime value: expected relationship value after relevant costs and risk over time.'],
      ],
    },
    {
      id: 'cb53-ecosystem-journey-accountability',
      ch: 3,
      front: 'Where does Vietnam\u2019s distribution advantage come from, and what should be mapped across partners?',
      back: 'From connecting mobile scale, payment rails, trusted bank capabilities and partner contexts into reliable journeys. Map who acquires, authenticates, serves, settles, owns data, receives fees, bears fraud and resolves disputes, because a seamless front end can conceal fragmented responsibilities.',
      explanation: 'The strategic unit is the connected journey, not any channel in isolation.',
      example: 'A shopper experiences one payment, but a bank app, a QR merchant, shared payment rails and a wallet may each have played a part.',
      terms: ['Payment rail', 'Ecosystem distribution'],
      refs: [
        [3, 'Vietnam\u2019s distribution advantage comes from connecting mobile scale, payment rails, trusted bank capabilities and partner contexts into reliable journeys.'],
        [3, 'Map who acquires, authenticates, serves, settles, owns data, receives fees, bears fraud and resolves disputes.'],
        [3, 'A seamless front end can conceal fragmented responsibilities.'],
      ],
    },
    {
      id: 'cb53-ecosystem-benefits-and-risks',
      ch: 3,
      front: 'What does ecosystem distribution offer a bank, and what does it introduce?',
      back: 'It can lower friction and customer acquisition cost while growing CASA and transaction fees. It also introduces partner dependency, interface, cyber, dispute and customer-ownership questions, and can cause channel conflict.',
      explanation: 'Channel conflict is tension when channels compete for customers, economics or ownership instead of coordinating.',
      example: 'A partner app that owns the customer relationship may take the bank\u2019s place at the point of sale.',
      terms: ['Channel conflict', 'Ecosystem distribution'],
      refs: [
        [3, 'The ecosystem can lower friction and CAC while growing CASA and transaction fees. It also introduces partner dependency, interface, cyber, dispute and customer-ownership questions.'],
        [3, 'Tension when channels compete for customers, economics or ownership instead of coordinating.'],
      ],
    },
  ],
});

export const COMMERCIAL_BANKING_M05B02_DECKS: FlashcardDeckContent[] = [CB_LESSON_53_DECK];
