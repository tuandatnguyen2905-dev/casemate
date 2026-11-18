// Healthcare Products & Nutrition Module 04 (apps/IndustryKnowledge/healthcareProductsModule04.tsx).
// Excerpts are verbatim from the rendered chapter text; they are checked against the rebuilt chapters, not the raw file.
// Chapters that only repeat another chapter's shared text, and the review-held chapter, carry no cards.
// Hypothetical worked numbers stay labelled as hypothetical; no real-world figures, doses or approval thresholds appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'healthcare-products',
  industryLabel: 'Healthcare Products & Nutrition',
  moduleId: 'hp-m04',
  moduleLabel: 'Module 04',
  moduleKey: 'HEALTHCARE_PRODUCTS_MODULE04',
  file: 'apps/IndustryKnowledge/healthcareProductsModule04.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const HP_M04_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m4-industry-competition-structure',
  title: 'Healthcare Products: Industry Competition Structure',
  description: 'Why competitive advantage is category-specific and how competitors should be mapped.',
  lessonId: 'hp-m4-l1',
  lessonTitle: 'Industry Competition Structure',
  chapterIdPrefix: 'hp-m4-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 2, 3 were left without cards because they only repeat text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Competitive Is Healthcare Products & Nutrition?', sourceTitle: 'How Competitive Is Healthcare Products & Nutrition?', citations: [] },
    { title: 'How Do Porter\'s Five Forces Apply to These Products?', sourceTitle: 'How Do Porter\'s Five Forces Apply to These Products?', citations: [] },
    { title: 'What Creates Evidence, Regulation, Quality and Trust Barriers?', sourceTitle: 'What Creates Evidence, Regulation, Quality and Trust Barriers?', citations: [] },
  ],
  cards: [
    {
      id: 'hp41-advantage-is-category-specific',
      ch: 1,
      front: 'Why is competitive advantage described as category-specific?',
      back: 'Because strength in general wellness does not prove capability in clinical, pharmaceutical or specialized nutrition markets.',
      explanation: 'Competitive advantage is category-specific.',
      example: 'Strength in general wellness does not prove capability in clinical, pharmaceutical or specialized nutrition markets.',
      terms: ['Consumer health brand', 'Specialized nutrition'],
      refs: [
        [1, 'Competitive advantage is category-specific; strength in general wellness does not prove capability in clinical, pharmaceutical or specialized nutrition markets.'],
      ],
    },
    {
      id: 'hp41-private-label-versus-specialist',
      ch: 1,
      front: 'A private-label manufacturer and a medical-nutrition specialist may reach similar retailers. How do they compete?',
      back: 'On very different capabilities.',
      explanation: 'Reaching the same retailers does not make the competitors alike.',
      example: 'A private-label manufacturer and a medical-nutrition specialist may reach similar retailers but compete on very different capabilities.',
      terms: ['Private label', 'Specialized nutrition'],
      refs: [
        [1, 'A private-label manufacturer and a medical-nutrition specialist may reach similar retailers but compete on very different capabilities.'],
      ],
    },
    {
      id: 'hp41-map-competitors-by-product-class',
      ch: 1,
      front: 'Before comparing scale or share, how should competitors be mapped?',
      back: 'By actual product class, intended need, evidence, price tier, channel and professional involvement.',
      explanation: 'Scale and share are compared only after competitors are placed in the right category.',
      example: 'An analyst maps competitors by product class, intended need, evidence, price tier, channel and professional involvement before comparing share.',
      terms: ['Multinational healthcare', 'Domestic manufacturer'],
      refs: [
        [1, 'Map competitors by actual product class, intended need, evidence, price tier, channel and professional involvement before comparing scale or share.'],
      ],
    },
  ],
});

const HP_M04_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m4-key-industry-players',
  title: 'Healthcare Products: Key Industry Players',
  description: 'The kinds of companies in the Vietnam market and how local execution shapes demand.',
  lessonId: 'hp-m4-l2',
  lessonTitle: 'Key Industry Players',
  chapterIdPrefix: 'hp-m4-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'Who Are the Major Global Participant Types?', sourceTitle: 'Who Are the Major Global Participant Types?', citations: [] },
    { title: 'How Do Branded, Contract, Ingredient and Channel Participants Differ?', sourceTitle: 'How Do Branded, Contract, Ingredient and Channel Participants Differ?', citations: [] },
    { title: 'Which Manufacturers, Distributors and Retailers Shape Vietnam\'s Market?', sourceTitle: 'Which Manufacturers, Distributors and Retailers Shape Vietnam\'s Market?', citations: [] },
  ],
  cards: [
    {
      id: 'hp42-international-versus-domestic-strengths',
      ch: 2,
      front: 'How can the strengths of international brands differ from those of domestic companies?',
      back: 'International brands may bring specialized technology. Domestic companies may compete on affordability, local insight and channel relationships.',
      explanation: 'International brands may bring specialized technology, while domestic companies may compete on affordability, local insight and channel relationships.',
      example: 'An international brand might lead with specialized technology while a domestic firm leads with local insight and channel relationships.',
      terms: ['International brand', 'Domestic business'],
      refs: [
        [2, 'International brands may bring specialized technology, while domestic companies may compete on affordability, local insight and channel relationships.'],
      ],
    },
    {
      id: 'hp42-local-execution-sustained-demand',
      ch: 3,
      front: 'What determines whether quality and brand awareness become sustained demand in Vietnam?',
      back: 'Local execution.',
      explanation: 'Quality and awareness alone do not secure demand.',
      example: 'A product with good quality and a known brand still needs strong local execution to build sustained demand.',
      terms: ['Regulatory readiness', 'Distributor'],
      refs: [
        [3, 'Local execution determines whether quality and brand awareness become sustained demand in Vietnam.'],
      ],
    },
    {
      id: 'hp42-validate-before-committing-to-scale',
      ch: 3,
      front: 'Before committing to scale in Vietnam, what should be validated?',
      back: 'Classification, documentation, labeling, claims, authenticity, price architecture, channel access and supply.',
      explanation: 'Classification, documentation, labeling, claims, authenticity, price architecture, channel access and supply are validated before committing to scale.',
      example: 'A company checks classification, labeling, claims, authenticity and channel access before it scales up.',
      terms: ['Regulatory readiness', 'Pharmacy channel'],
      refs: [
        [3, 'Validate classification, documentation, labeling, claims, authenticity, price architecture, channel access and supply before committing to scale.'],
      ],
    },
  ],
});

const HP_M04_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m4-competitor-benchmarking',
  title: 'Healthcare Products: Competitor Benchmarking',
  description: 'How companies compete on evidence, claims and distribution, and how to benchmark them.',
  lessonId: 'hp-m4-l3',
  lessonTitle: 'Competitor Benchmarking',
  chapterIdPrefix: 'hp-m4-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Should Healthcare Product Companies Be Compared?', sourceTitle: 'How Should Healthcare Product Companies Be Compared?', citations: [] },
    { title: 'How Do Evidence, Quality, Portfolio, Price and Access Differ?', sourceTitle: 'How Do Evidence, Quality, Portfolio, Price and Access Differ?', citations: [] },
    { title: 'Which Trust, Supply and Economic Capabilities Create Sustainable Advantage?', sourceTitle: 'Which Trust, Supply and Economic Capabilities Create Sustainable Advantage?', citations: [] },
  ],
  cards: [
    {
      id: 'hp43-scientific-language-not-credibility',
      ch: 1,
      front: 'Does scientific language make a claim credible?',
      back: 'No. Evidence must fit the product, claim, population and jurisdiction.',
      explanation: 'Scientific language does not make a claim credible; evidence must fit the product, claim, population and jurisdiction.',
      example: 'A claim that uses scientific language is credible only if the evidence fits the product, claim, population and jurisdiction.',
      terms: ['Evidence', 'Brand trust'],
      refs: [
        [1, 'Scientific language does not make a claim credible; evidence must fit the product, claim, population and jurisdiction.'],
      ],
    },
    {
      id: 'hp43-benchmark-permitted-claims-only',
      ch: 1,
      front: 'When benchmarking competitors in Vietnam, which claims and evidence should be used, and what is not proof of health value?',
      back: 'Benchmark only permitted claims and category-relevant evidence. A low price or broad placement is not proof of health value.',
      explanation: 'Price and placement are commercial facts, not health evidence.',
      example: 'A rival\'s low price or broad placement should not be treated as proof that it has health value.',
      terms: ['Evidence', 'Affordability', 'Distribution'],
      refs: [
        [1, 'Benchmark only permitted claims and category-relevant evidence, and do not treat a low price or broad placement as proof of health value.'],
      ],
    },
    {
      id: 'hp43-distribution-reach-creates-advantage-when',
      ch: 2,
      front: 'When does distribution reach create advantage?',
      back: 'Only when it produces appropriate availability, product integrity, sell-through visibility and sustainable contribution.',
      explanation: 'Reach alone is not an advantage.',
      example: 'A wide channel footprint without product integrity or sell-through visibility does not create advantage.',
      terms: ['Pharmacy access', 'Sell-through analytics'],
      refs: [
        [2, 'Distribution reach creates advantage only when it produces appropriate availability, product integrity, sell-through visibility and sustainable contribution.'],
      ],
    },
    {
      id: 'hp43-marketplace-reach-tradeoff',
      ch: 2,
      front: 'How can marketplace reach both help and add risk?',
      back: 'It can improve discovery while increasing price transparency, unauthorized-seller and misleading-listing risk.',
      explanation: 'Marketplaces improve discovery but also add risks.',
      example: 'A brand listed on a marketplace gains discovery but faces unauthorized-seller and misleading-listing risk.',
      terms: ['Online governance', 'Retail partnership'],
      refs: [
        [2, 'Marketplace reach can improve discovery while increasing price transparency, unauthorized-seller and misleading-listing risk.'],
      ],
    },
  ],
});

const HP_M04_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m4-key-success-factors',
  title: 'Healthcare Products: Key Success Factors',
  description: 'Brand strategy and portfolio management without blurring intended use or evidence.',
  lessonId: 'hp-m4-l4',
  lessonTitle: 'Key Success Factors',
  chapterIdPrefix: 'hp-m4-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 1, 2 were left without cards because they only repeat text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'Why Do Product Quality, Safety and Evidence Matter?', sourceTitle: 'Why Do Product Quality, Safety and Evidence Matter?', citations: [] },
    { title: 'How Do Manufacturing, Compliance and Supply Reliability Create Advantage?', sourceTitle: 'How Do Manufacturing, Compliance and Supply Reliability Create Advantage?', citations: [] },
    { title: 'How Do Distribution, Trust and Portfolio Economics Support Growth?', sourceTitle: 'How Do Distribution, Trust and Portfolio Economics Support Growth?', citations: [] },
  ],
  cards: [
    {
      id: 'hp44-portfolio-expansion-value',
      ch: 3,
      front: 'When does portfolio expansion create value?',
      back: 'Only when products share meaningful capability or solve complementary needs without blurring intended use or evidence.',
      explanation: 'Expansion must not blur intended use or evidence.',
      example: 'A new product that shares no capability with the core range and blurs intended use does not add value.',
      terms: ['Core product', 'Adjacent category', 'Brand governance'],
      refs: [
        [3, 'Portfolio expansion creates value only when products share meaningful capability or solve complementary needs without blurring intended use or evidence.'],
      ],
    },
    {
      id: 'hp44-supplements-and-specialized-nutrition-distinct',
      ch: 3,
      front: 'A company sells wellness supplements and specialized nutrition. What should it preserve?',
      back: 'Clear distinctions in use, evidence and professional involvement.',
      explanation: 'A company selling wellness supplements and specialized nutrition should preserve clear distinctions in use, evidence and professional involvement.',
      example: 'A company selling wellness supplements and specialized nutrition preserves clear distinctions in use, evidence and professional involvement.',
      terms: ['Price tier', 'Portfolio rationalization'],
      refs: [
        [3, 'A company selling wellness supplements and specialized nutrition should preserve clear distinctions in use, evidence and professional involvement.'],
      ],
    },
    {
      id: 'hp44-prioritize-launches',
      ch: 3,
      front: 'By what should launches be prioritized?',
      back: 'Unmet need, legal pathway, evidence, technical feasibility, channel access, affordability, contribution and strategic fit.',
      explanation: 'Launches are prioritized by unmet need, legal pathway, evidence, technical feasibility, channel access, affordability, contribution and strategic fit.',
      example: 'A team prioritizes a launch by unmet need, legal pathway and evidence, among the listed criteria.',
      terms: ['Innovation priority', 'Portfolio rationalization'],
      refs: [
        [3, 'Prioritize launches by unmet need, legal pathway, evidence, technical feasibility, channel access, affordability, contribution and strategic fit.'],
      ],
    },
  ],
});

const HP_M04_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m4-industry-swot-and-strategic-challenges',
  title: 'Healthcare Products: Industry SWOT & Strategic Challenges',
  description: 'Trust as both a moat and a downside risk, and the vulnerabilities that weaken competitive resilience.',
  lessonId: 'hp-m4-l5',
  lessonTitle: 'Industry SWOT & Strategic Challenges',
  chapterIdPrefix: 'hp-m4-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'What Are the Industry\'s Main Strengths and Weaknesses?', sourceTitle: 'What Are the Industry\'s Main Strengths and Weaknesses?', citations: [] },
    { title: 'What Opportunities and Threats Shape Healthcare Products?', sourceTitle: 'What Opportunities and Threats Shape Healthcare Products?', citations: [] },
    { title: 'What Strategic Choices Must Companies Make?', sourceTitle: 'What Strategic Choices Must Companies Make?', citations: [] },
  ],
  cards: [
    {
      id: 'hp45-trust-moat-and-risk',
      ch: 1,
      front: 'Why is trust described as both a moat and a downside risk?',
      back: 'Because one significant quality, safety or communication failure can damage years of brand investment.',
      explanation: 'The same trust that protects a brand can be lost through a single failure.',
      example: 'A brand with strong trust can lose it after one significant quality, safety or communication failure.',
      terms: ['Reputation', 'Quality failure'],
      refs: [
        [1, 'Trust is both a moat and a downside risk because one significant quality, safety or communication failure can damage years of brand investment.'],
      ],
    },
    {
      id: 'hp45-who-traceability-cannot-fully-block',
      ch: 2,
      front: 'What does WHO state traceability can support, and what can it not do without strong regulation and response?',
      back: 'It can support earlier detection and recall, but cannot fully block falsified products without strong regulation and response.',
      explanation: 'Traceability needs regulation and response to work fully.',
      example: 'Traceability can help detect a problem earlier, but it does not by itself block falsified products.',
      terms: ['Quality failure', 'Reputation'],
      refs: [
        [2, 'WHO states traceability can support earlier detection and recall but cannot fully block falsified products without strong regulation and response.'],
      ],
    },
    {
      id: 'hp45-maintain-readiness-measures',
      ch: 3,
      front: 'Which measures does the SWOT chapter say to maintain in Vietnam?',
      back: 'Complaint investigation, authentication, supplier alternatives, recall readiness, channel monitoring, accurate claims and current regulatory review.',
      explanation: 'Maintain complaint investigation, authentication, supplier alternatives, recall readiness, channel monitoring, accurate claims and current regulatory review.',
      example: 'A company maintains supplier alternatives and recall readiness alongside complaint investigation and channel monitoring.',
      terms: ['Supply concentration', 'Regulatory risk', 'Quality failure'],
      refs: [
        [3, 'Maintain complaint investigation, authentication, supplier alternatives, recall readiness, channel monitoring, accurate claims and current regulatory review.'],
      ],
    },
  ],
});

export const HEALTHCARE_PRODUCTS_M04_DECKS: FlashcardDeckContent[] = [
  HP_M04_L1_DECK,
  HP_M04_L2_DECK,
  HP_M04_L3_DECK,
  HP_M04_L4_DECK,
  HP_M04_L5_DECK,
];
