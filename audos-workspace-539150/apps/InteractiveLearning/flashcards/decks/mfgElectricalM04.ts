// Pinned-ID authored flashcard decks: Electrical Equipment Manufacturing, Module 04 (apps/IndustryKnowledge/mfgElectricalModule04.tsx).
// Excerpts are checked against the rendered chapter text, not the raw source file.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'mfg-electrical',
  industryLabel: 'Electrical Equipment Manufacturing',
  moduleId: 'me-m04',
  moduleLabel: 'Module 04',
  moduleKey: 'MFG_ELECTRICAL_MODULE04',
  file: 'apps/IndustryKnowledge/mfgElectricalModule04.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const ME_M04_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m4-industry-competition-structure',
  title: 'Electrical Equipment Manufacturing: Industry Competition Structure',
  description: 'Why there is no single competitive structure and what high-voltage entry requires.',
  lessonId: 'me-m4-l1',
  lessonTitle: 'Industry Competition Structure',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m4-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Competitive Is Electrical & Energy Equipment Manufacturing?', sourceTitle: 'How Competitive Is Electrical & Energy Equipment Manufacturing?', citations: [] },
    { title: 'How Do Porter\'s Five Forces Apply to Electrical Equipment?', sourceTitle: 'How Do Porter\'s Five Forces Apply to Electrical Equipment?', citations: [] },
    { title: 'What Creates Technical, Capital and Trust Barriers?', sourceTitle: 'What Creates Technical, Capital and Trust Barriers?', citations: [] },
  ],
  cards: [
    {
      id: 'me41-no-single-competitive-structure',
      ch: 1,
      front: 'Does one competitive structure describe all electrical equipment?',
      back: 'No. Rivalry ranges from global technology-led grid and automation markets to price-sensitive standardized components, panels and local distribution.',
      explanation: 'There is no single competitive structure across all electrical equipment.',
      example: 'Global OEMs, domestic manufacturers, distributors, panel builders, EPCs and service firms are analyzed by the product actually contested.',
      terms: ['Market concentration', 'Competitive segments'],
      refs: [
        [1, 'There is no single competitive structure across all electrical equipment.'],
        [1, 'rivalry that ranges from global technology-led grid and automation markets to price-sensitive standardized components, panels and local distribution'],
        [1, 'Analyze global OEMs, domestic manufacturers, distributors, panel builders, EPCs and service firms by the product actually contested.'],
      ],
    },
    {
      id: 'me41-high-voltage-vs-wiring',
      ch: 2,
      front: 'What do high-voltage systems reward, compared with standard wiring products?',
      back: 'High-voltage systems reward references, engineering and service, while standard wiring products emphasize cost, range and availability.',
      explanation: 'Competitors are analyzed by the product actually contested.',
      example: 'A high-voltage bidder leans on references and service, while a wiring-product seller competes on cost, range and availability.',
      terms: ['High-voltage systems', 'Standardized products'],
      refs: [
        [2, 'High-voltage systems reward references, engineering and service while standard wiring products emphasize cost, range and availability.'],
        [2, 'Analyze global OEMs, domestic manufacturers, distributors, panel builders, EPCs and service firms by the product actually contested.'],
      ],
    },
    {
      id: 'me41-new-hv-supplier-needs',
      ch: 3,
      front: 'What does a new high-voltage supplier need before it can compete?',
      back: 'Design evidence, type tests, manufacturing consistency, project references and field support.',
      explanation: 'Technical complexity and customer risk strengthen barriers; standardized categories intensify price pressure.',
      example: 'Focused entry through panels, components, integration or services can be more credible than immediate competition across broad portfolios.',
      terms: ['Barriers to entry', 'Type tests'],
      refs: [
        [3, 'A new high-voltage supplier needs design evidence, type tests, manufacturing consistency, project references and field support.'],
        [3, 'Technical complexity and customer risk strengthen barriers; standardized categories intensify price pressure.'],
        [3, 'Focused entry through panels, components, integration or services can be more credible than immediate competition across broad portfolios.'],
      ],
    },
  ],
});

const ME_M04_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m4-key-industry-players',
  title: 'Electrical Equipment Manufacturing: Key Industry Players',
  description: 'How diversified groups and specialists differ and why cable and critical-power expertise are not comparable.',
  lessonId: 'me-m4-l2',
  lessonTitle: 'Key Industry Players',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m4-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'Who Are the Major Global Electrical Equipment Manufacturers?', sourceTitle: 'Who Are the Major Global Electrical Equipment Manufacturers?', citations: [] },
    { title: 'How Do Diversified Groups and Product Specialists Differ?', sourceTitle: 'How Do Diversified Groups and Product Specialists Differ?', citations: [] },
    { title: 'Which Manufacturers and Participants Shape Vietnam\'s Market?', sourceTitle: 'Which Manufacturers and Participants Shape Vietnam\'s Market?', citations: [] },
  ],
  cards: [
    {
      id: 'me42-diversified-vs-specialists',
      ch: 2,
      front: 'How do diversified groups and product specialists differ in where their strengths lie?',
      back: 'Diversified leaders overlap, but their strengths differ by product, application and geography. Specialists can lead targeted applications through technical depth and project execution.',
      explanation: 'Compare authorized channels, local engineering, inventory, references, service and product fit rather than parent-company size alone.',
      example: 'A low-voltage building project, an industrial drive application and a utility grid project require different competitor sets and benchmarks.',
      terms: ['Diversified leaders', 'Specialists'],
      refs: [
        [1, 'Diversified leaders overlap, but their strengths differ by product, application and geography.'],
        [2, 'Specialists can lead targeted applications through technical depth and project execution.'],
        [1, 'A low-voltage building project, industrial drive application and utility grid project require different competitor sets and benchmarks.'],
      ],
    },
    {
      id: 'me42-cable-vs-critical-power',
      ch: 3,
      front: 'Are power-cable expertise and data-center critical-power expertise directly comparable?',
      back: 'No. Both are valuable, but they are not directly comparable businesses.',
      explanation: 'Specialist opportunities depend on project pipelines, specification access, installation partners and local lifecycle support.',
      example: 'A cable business and a data-center critical-power business are both valuable but not directly comparable.',
      terms: ['Cable systems', 'Critical power'],
      refs: [
        [3, 'Power-cable expertise and data-center critical-power expertise are both valuable but not directly comparable businesses.'],
        [3, 'Specialist opportunities depend on project pipelines, specification access, installation partners and local lifecycle support.'],
      ],
    },
  ],
});

const ME_M04_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m4-competitor-benchmarking',
  title: 'Electrical Equipment Manufacturing: Competitor Benchmarking',
  description: 'Why benchmarks need compatible products and how a higher price can still be the lower-risk choice.',
  lessonId: 'me-m4-l3',
  lessonTitle: 'Competitor Benchmarking',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m4-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'How Should Electrical Equipment Manufacturers Be Compared?', sourceTitle: 'How Should Electrical Equipment Manufacturers Be Compared?', citations: [] },
    { title: 'How Do Product, Engineering, Quality and Factory Capabilities Differ?', sourceTitle: 'How Do Product, Engineering, Quality and Factory Capabilities Differ?', citations: [] },
    { title: 'Which Commercial and Lifecycle Capabilities Create Advantage?', sourceTitle: 'Which Commercial and Lifecycle Capabilities Create Advantage?', citations: [] },
  ],
  cards: [
    {
      id: 'me43-no-universal-scorecard',
      ch: 1,
      front: 'Why should a low-voltage breaker company and a subsea high-voltage cable supplier not be compared on one scorecard?',
      back: 'Benchmarks should only compare products serving compatible applications and ratings, so there is no universal scorecard across them.',
      explanation: 'Use application tests, acceptance criteria, local references, delivery evidence and verified service capability.',
      example: 'A buyer benchmarking suppliers uses application tests, local references and delivery evidence for compatible products only.',
      terms: ['Benchmarking', 'Compatible ratings'],
      refs: [
        [1, 'Do not compare a low-voltage breaker company and subsea high-voltage cable supplier on one universal scorecard.'],
        [1, 'Benchmark only products serving compatible applications and ratings.'],
        [1, 'Use application tests, acceptance criteria, local references, delivery evidence and verified service capability.'],
      ],
    },
    {
      id: 'me43-higher-priced-supplier',
      ch: 3,
      front: 'How can a higher-priced supplier still be the lower-risk choice?',
      back: 'Stocked parts and proven local response can reduce project and downtime risk.',
      explanation: 'Commercial advantage combines price, access, technical trust and support.',
      example: 'A buyer also benchmarks genuine-product controls, Vietnamese documentation, training, project execution and warranty accountability.',
      terms: ['Market access', 'Local support'],
      refs: [
        [3, 'A higher-priced supplier may reduce project and downtime risk through stocked parts and proven local response.'],
        [3, 'Commercial advantage combines price, access, technical trust and support.'],
        [3, 'Benchmark genuine-product controls, Vietnamese documentation, training, project execution and warranty accountability.'],
      ],
    },
  ],
});

const ME_M04_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m4-key-success-factors',
  title: 'Electrical Equipment Manufacturing: Key Success Factors',
  description: 'The interoperability definition, when monitoring adds value and what durable competitors combine.',
  lessonId: 'me-m4-l4',
  lessonTitle: 'Key Success Factors',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m4-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'Why Do Engineering, Reliability and Compliance Matter?', sourceTitle: 'Why Do Engineering, Reliability and Compliance Matter?', citations: [] },
    { title: 'How Do Procurement, Productivity and Quality Create Advantage?', sourceTitle: 'How Do Procurement, Productivity and Quality Create Advantage?', citations: [] },
    { title: 'How Do Customer Relationships, Distribution and Service Support Growth?', sourceTitle: 'How Do Customer Relationships, Distribution and Service Support Growth?', citations: [] },
  ],
  cards: [
    {
      id: 'me44-interoperability-definition',
      ch: 1,
      front: 'What does interoperability mean for electrical equipment and systems?',
      back: 'Ability of equipment and systems to exchange and use information through defined interfaces.',
      explanation: 'Reliability and technical credibility are foundational in mission-critical applications.',
      example: 'A firm invests in laboratories, quality systems, documentation, skills and customer application engineering.',
      terms: ['Interoperability'],
      refs: [
        [1, 'Ability of equipment and systems to exchange and use information through defined interfaces.'],
        [1, 'Reliability and technical credibility are foundational in mission-critical applications.'],
      ],
    },
    {
      id: 'me44-digital-monitoring-needs',
      ch: 1,
      front: 'When does digital monitoring add little value?',
      back: 'When sensors, communications, cybersecurity, alarms and maintenance workflows are unreliable.',
      explanation: 'Connected features and customer support from selection through operation are listed among the success factors.',
      example: 'A monitoring system with unreliable alarms would add little value.',
      terms: ['Digital monitoring', 'Cybersecurity'],
      refs: [
        [1, 'Digital monitoring adds little value if sensors, communications, cybersecurity, alarms and maintenance workflows are unreliable.'],
        [1, 'design fit, process consistency, applicable standards, traceability, connected features and customer support from selection through operation'],
      ],
    },
    {
      id: 'me44-efficiency-plus-service',
      ch: 3,
      front: 'What do durable competitors combine?',
      back: 'Efficient operations with customer access and lifecycle support.',
      explanation: 'Efficient production protects price competitiveness while service and training support repeat purchases and specification preference.',
      example: 'A local supplier\u2019s responsiveness helps most when quality is documented and execution is dependable.',
      terms: ['Lean operations', 'Customer retention'],
      refs: [
        [3, 'Durable competitors combine efficient operations with customer access and lifecycle support.'],
        [3, 'Efficient production protects price competitiveness while service and training support repeat purchases and specification preference.'],
        [3, 'Local responsiveness can be an advantage when supported by documented quality and dependable execution.'],
      ],
    },
  ],
});

const ME_M04_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m4-industry-swot-and-strategic-challenges',
  title: 'Electrical Equipment Manufacturing: Industry SWOT & Strategic Challenges',
  description: 'The SWOT summary and how a fixed-price project can lose margin.',
  lessonId: 'me-m4-l5',
  lessonTitle: 'Industry SWOT & Strategic Challenges',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m4-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'What Are the Industry\'s Main Strengths and Weaknesses?', sourceTitle: 'What Are the Industry\'s Main Strengths and Weaknesses?', citations: [] },
    { title: 'What Opportunities and Threats Shape Electrical Equipment?', sourceTitle: 'What Opportunities and Threats Shape Electrical Equipment?', citations: [] },
    { title: 'What Strategic Choices Must Manufacturers Make?', sourceTitle: 'What Strategic Choices Must Manufacturers Make?', citations: [] },
  ],
  cards: [
    {
      id: 'me45-swot-quadrants',
      ch: 1,
      front: 'How does the chapter describe the industry\u2019s strengths, weaknesses, opportunities and threats?',
      back: 'Strengths: essential infrastructure and installed bases. Weaknesses: capital and complexity. Opportunities: grids, storage and digital service. Threats: volatility and disruption.',
      explanation: 'Structural electrification demand is attractive, but profitable execution is technically and financially demanding.',
      example: 'Local demand and supply-chain participation create opportunity, but capability depth and project bankability constrain outcomes.',
      terms: ['SWOT', 'Installed base'],
      refs: [
        [1, 'strengths in essential infrastructure and installed bases; weaknesses in capital and complexity; opportunities in grids, storage and digital service; threats from volatility and disruption'],
        [1, 'Structural electrification demand is attractive, but profitable execution is technically and financially demanding.'],
        [1, 'Local demand and supply-chain participation create opportunity, but capability depth and project bankability constrain outcomes.'],
      ],
    },
    {
      id: 'me45-fixed-price-margin-loss',
      ch: 3,
      front: 'How can a fixed-price project lose margin?',
      back: 'Through metal escalation, design change, delayed acceptance and payment slippage.',
      explanation: 'Resilience requires integrated governance across engineering, procurement, finance and service.',
      example: 'A project team responds with qualified alternatives, contract controls, test gates and cash scenarios.',
      terms: ['Project risk', 'Fixed-price contract'],
      refs: [
        [3, 'A fixed-price project can lose margin through metal escalation, design change, delayed acceptance and payment slippage.'],
        [3, 'Resilience requires integrated governance across engineering, procurement, finance and service.'],
        [3, 'Use qualified alternatives, contract controls, test gates, cash scenarios, workforce plans and post-installation accountability.'],
      ],
    },
  ],
});

export const MFG_ELECTRICAL_M04_DECKS: FlashcardDeckContent[] = [ME_M04_L1_DECK, ME_M04_L2_DECK, ME_M04_L3_DECK, ME_M04_L4_DECK, ME_M04_L5_DECK];
