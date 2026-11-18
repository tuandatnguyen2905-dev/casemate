// Healthcare Products & Nutrition Module 05 (apps/IndustryKnowledge/healthcareProductsModule05.tsx).
// Excerpts are verbatim from the rendered chapter text; they are checked against the rebuilt chapters, not the raw file.
// Chapters that only repeat another chapter's shared text, and the review-held chapter, carry no cards.
// Hypothetical worked numbers stay labelled as hypothetical; no real-world figures, doses or approval thresholds appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'healthcare-products',
  industryLabel: 'Healthcare Products & Nutrition',
  moduleId: 'hp-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'HEALTHCARE_PRODUCTS_MODULE05',
  file: 'apps/IndustryKnowledge/healthcareProductsModule05.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const HP_M05_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m5-consumer-and-patient-trends',
  title: 'Healthcare Products: Consumer and Patient Trends',
  description: 'Preventive wellness and personalized nutrition, and what they require to be sustainable.',
  lessonId: 'hp-m5-l1',
  lessonTitle: 'Consumer and Patient Trends',
  chapterIdPrefix: 'hp-m5-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Are Preventive Health and Nutrition Interests Changing?', sourceTitle: 'How Are Preventive Health and Nutrition Interests Changing?', citations: [] },
    { title: 'How Are Convenience, Transparency and Evidence Expectations Evolving?', sourceTitle: 'How Are Convenience, Transparency and Evidence Expectations Evolving?', citations: [] },
    { title: 'How Are Life-Stage and Personalized Preferences Developing?', sourceTitle: 'How Are Life-Stage and Personalized Preferences Developing?', citations: [] },
  ],
  cards: [
    {
      id: 'hp51-preventive-wellness-sustainable-demand',
      ch: 1,
      front: 'When does preventive wellness create sustainable demand?',
      back: 'Only when products address a defined need and communicate purpose, limits and safety responsibly.',
      explanation: 'Demand rests on a defined need and responsible communication.',
      example: 'A wellness product with no defined need and no clear limits does not build sustainable demand.',
      terms: ['Everyday wellness', 'Consumer education'],
      refs: [
        [1, 'Preventive wellness creates sustainable demand only when products address a defined need and communicate purpose, limits and safety responsibly.'],
      ],
    },
    {
      id: 'hp51-avoid-implying-universal-need',
      ch: 2,
      front: 'What should communication avoid implying, and what should it define?',
      back: 'It should avoid implying universal need or benefit. It should define the target user, permitted claim, evidence, instructions, warnings and role of balanced diet or professional advice.',
      explanation: 'Avoid implying universal need or benefit; define the target user, permitted claim, evidence, instructions, warnings and role of balanced diet or professional advice.',
      example: 'A product message names the target user, permitted claim, instructions and warnings.',
      terms: ['Responsible digital content', 'Consumer education'],
      refs: [
        [2, 'Avoid implying universal need or benefit; define the target user, permitted claim, evidence, instructions, warnings and role of balanced diet or professional advice.'],
      ],
    },
    {
      id: 'hp51-personalization-adds-value-only-when',
      ch: 3,
      front: 'When does personalization add value?',
      back: 'Only when the input is reliable, the recommendation is actionable and the claimed improvement is supported.',
      explanation: 'Personalization adds value only when the input is reliable, the recommendation is actionable and the claimed improvement is supported.',
      example: 'A personalized recommendation based on unreliable input does not add value.',
      terms: ['Digital recommendation', 'Evidence-based targeting'],
      refs: [
        [3, 'Personalization adds value only when the input is reliable, the recommendation is actionable and the claimed improvement is supported.'],
      ],
    },
    {
      id: 'hp51-targeted-versus-individualized',
      ch: 3,
      front: 'How does a targeted formulation for a defined life stage differ from fully individualized recommendations?',
      back: 'A targeted formulation for a defined life stage is operationally different from fully individualized recommendations based on sensitive health data.',
      explanation: 'A targeted formulation for a defined life stage is operationally different from fully individualized recommendations.',
      example: 'A life-stage formulation does not need the sensitive health data that fully individualized recommendations rely on.',
      terms: ['Life stage', 'Privacy', 'Biomarker'],
      refs: [
        [3, 'A targeted formulation for a defined life stage is operationally different from fully individualized recommendations based on sensitive health data.'],
      ],
    },
  ],
});

const HP_M05_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m5-technology-and-innovation-trends',
  title: 'Healthcare Products: Technology & Innovation Trends',
  description: 'Evidence, transparency and innovation: what makes products credible and what makes innovation useful.',
  lessonId: 'hp-m5-l2',
  lessonTitle: 'Technology & Innovation Trends',
  chapterIdPrefix: 'hp-m5-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Are Ingredient Research and Formulation Evolving?', sourceTitle: 'How Are Ingredient Research and Formulation Evolving?', citations: [] },
    { title: 'How Are Digital Quality, Traceability and Manufacturing Developing?', sourceTitle: 'How Are Digital Quality, Traceability and Manufacturing Developing?', citations: [] },
    { title: 'How Are Data-Supported and Emerging Nutrition Technologies Evolving?', sourceTitle: 'How Are Data-Supported and Emerging Nutrition Technologies Evolving?', citations: [] },
  ],
  cards: [
    {
      id: 'hp52-evidence-differentiates-only-when',
      ch: 1,
      front: 'When does evidence differentiate a product?',
      back: 'Only when it matches intended use, finished product, population and claim and is communicated without exaggeration.',
      explanation: 'Evidence must fit the product and be communicated honestly.',
      example: 'Evidence for a different population or product does not differentiate the product being sold.',
      terms: ['Product-specific study', 'Claim substantiation', 'Transparent label'],
      refs: [
        [1, 'Evidence differentiates only when it matches intended use, finished product, population and claim and is communicated without exaggeration.'],
      ],
    },
    {
      id: 'hp52-fda-illustration-not-vietnam-template',
      ch: 1,
      front: 'What does FDA guidance illustrate about U.S. dietary-supplement structure/function claims, and how should it be used for Vietnam?',
      back: 'It illustrates that these claims require truthful, non-misleading substantiation and cannot become unauthorized disease claims. For Vietnam, do not import U.S. claim language as a legal template.',
      explanation: 'The U.S. example is an illustration only.',
      example: 'A team in Vietnam uses current Vietnamese claim, labeling and advertising rules rather than U.S. claim language.',
      terms: ['Claim substantiation', 'Transparent label'],
      refs: [
        [1, 'FDA guidance illustrates that U.S. dietary-supplement structure/function claims require truthful, non-misleading substantiation and cannot become unauthorized disease claims.'],
        [1, 'Use current Vietnamese claim, labeling and advertising rules; do not import U.S. claim language as a legal template.'],
      ],
    },
    {
      id: 'hp52-useful-innovation-solves-defined-problem',
      ch: 2,
      front: 'What makes innovation useful, and what does novelty without relevance, evidence or feasibility add?',
      back: 'Useful innovation solves a defined product or operating problem. Novelty without relevance, evidence or feasibility adds complexity rather than advantage.',
      explanation: 'Novelty by itself is not an advantage.',
      example: 'A new format with no relevance or feasibility behind it adds complexity rather than advantage.',
      terms: ['Convenient format', 'Innovation governance'],
      refs: [
        [2, 'Useful innovation solves a defined product or operating problem; novelty without relevance, evidence or feasibility adds complexity rather than advantage.'],
      ],
    },
    {
      id: 'hp52-stage-investment',
      ch: 3,
      front: 'How should investment in innovation be staged?',
      back: 'Through classification review, technical feasibility, safety, evidence, pilot manufacturing, stability, claims review, demand and stop-or-scale criteria.',
      explanation: 'Investment moves forward in stages with stop-or-scale criteria.',
      example: 'A team reviews classification and technical feasibility first, then runs pilot manufacturing before deciding to stop or scale.',
      terms: ['Innovation governance', 'Manufacturing technology'],
      refs: [
        [3, 'Stage investment through classification review, technical feasibility, safety, evidence, pilot manufacturing, stability, claims review, demand and stop-or-scale criteria.'],
      ],
    },
  ],
});

const HP_M05_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m5-market-and-channel-trends',
  title: 'Healthcare Products: Market & Channel Trends',
  description: 'Digital commerce, omnichannel access and specialized nutrition channels.',
  lessonId: 'hp-m5-l3',
  lessonTitle: 'Market & Channel Trends',
  chapterIdPrefix: 'hp-m5-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Are Pharmacy, Retail and Omnichannel Models Changing?', sourceTitle: 'How Are Pharmacy, Retail and Omnichannel Models Changing?', citations: [] },
    { title: 'How Are E-Commerce and Direct Channels Developing?', sourceTitle: 'How Are E-Commerce and Direct Channels Developing?', citations: [] },
    { title: 'How Are Specialized Nutrition and Vietnam Market Channels Evolving?', sourceTitle: 'How Are Specialized Nutrition and Vietnam Market Channels Evolving?', citations: [] },
  ],
  cards: [
    {
      id: 'hp53-digital-growth-sustainable-when',
      ch: 2,
      front: 'When is digital growth sustainable?',
      back: 'When convenience is supported by authenticity, accurate information, product integrity and compliant channels.',
      explanation: 'Digital growth is sustainable when convenience is supported by authenticity, accurate information, product integrity and compliant channels.',
      example: 'An online channel that is convenient but lacks authenticity and accurate information is not sustainable.',
      terms: ['E-commerce', 'Seller governance'],
      refs: [
        [2, 'Digital growth is sustainable when convenience is supported by authenticity, accurate information, product integrity and compliant channels.'],
      ],
    },
    {
      id: 'hp53-who-online-informal-markets',
      ch: 2,
      front: 'What does WHO identify online and informal markets as, for medical products?',
      back: 'Vulnerabilities for substandard and falsified medical products, requiring regulation, surveillance and response.',
      explanation: 'These markets need regulation, surveillance and response.',
      example: 'A medical product sold through an informal market is more exposed to substandard or falsified supply.',
      terms: ['E-commerce', 'Seller governance'],
      refs: [
        [2, 'WHO identifies online and informal markets as vulnerabilities for substandard and falsified medical products, requiring regulation, surveillance and response.'],
      ],
    },
    {
      id: 'hp53-specialized-nutrition-opportunity-depends',
      ch: 3,
      front: 'What does specialized nutrition opportunity depend on, rather than demographics alone?',
      back: 'Clinical or nutritional relevance, appropriate selection, professional involvement and practical access.',
      explanation: 'Demographics alone do not create the opportunity.',
      example: 'An aging population alone does not create an opportunity without clinical or nutritional relevance and practical access.',
      terms: ['Healthy aging', 'Professional awareness', 'Affordability'],
      refs: [
        [3, 'Specialized nutrition opportunity depends on clinical or nutritional relevance, appropriate selection, professional involvement and practical access—not demographics alone.'],
      ],
    },
    {
      id: 'hp53-codex-excludes-special-dietary-uses',
      ch: 3,
      front: 'What does Codex supplement guidance explicitly exclude, and what does the chapter say this reinforces?',
      back: 'It explicitly excludes foods for special dietary uses. This reinforces that supplement and medical-nutrition pathways should remain separate.',
      explanation: 'Codex supplement guidance explicitly excludes foods for special dietary uses, reinforcing that supplement and medical-nutrition pathways should remain separate.',
      example: 'A food for special dietary use is outside the supplement guidance, so it is not handled as a general supplement.',
      terms: ['Disease-related need', 'Care coordination'],
      refs: [
        [3, 'Codex supplement guidance explicitly excludes foods for special dietary uses, reinforcing that supplement and medical-nutrition pathways should remain separate.'],
      ],
    },
  ],
});

const HP_M05_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m5-regulatory-and-sustainability-trends',
  title: 'Healthcare Products: Regulatory & Sustainability Trends',
  description: 'Classification, labeling and claims rules, and regulatory readiness across the product lifecycle.',
  lessonId: 'hp-m5-l4',
  lessonTitle: 'Regulatory & Sustainability Trends',
  chapterIdPrefix: 'hp-m5-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Product Classification, Labeling and Claims Rules Evolve?', sourceTitle: 'How Do Product Classification, Labeling and Claims Rules Evolve?', citations: [] },
    { title: 'How Do Safety Monitoring, Traceability and Recall Requirements Work?', sourceTitle: 'How Do Safety Monitoring, Traceability and Recall Requirements Work?', citations: [] },
    { title: 'How Are Responsible Sourcing, Packaging and Sustainability Expectations Changing?', sourceTitle: 'How Are Responsible Sourcing, Packaging and Sustainability Expectations Changing?', citations: [] },
  ],
  cards: [
    {
      id: 'hp54-foreign-authorization-not-automatic',
      ch: 1,
      front: 'Does a foreign authorization automatically apply in Vietnam, and is legal market access independent clinical validation?',
      back: 'No to both. A foreign authorization does not automatically apply in Vietnam, and legal market access is not independent clinical validation.',
      explanation: 'Authorization elsewhere and legal access are not proof of the other.',
      example: 'A foreign authorization does not automatically apply in Vietnam, and legal market access is not independent clinical validation.',
      terms: ['Classification', 'Jurisdiction'],
      refs: [
        [1, 'A foreign authorization does not automatically apply in Vietnam, and legal market access is not independent clinical validation.'],
      ],
    },
    {
      id: 'hp54-reformulation-or-claim-change',
      ch: 1,
      front: 'What can a product reformulation or claim change alter?',
      back: 'Documentation, labeling, evidence and market-access obligations.',
      explanation: 'A change to the product or claim can change obligations.',
      example: 'A reformulated product may need new documentation and labeling and may face different market-access obligations.',
      terms: ['Classification', 'Label', 'Market-access process'],
      refs: [
        [1, 'A product reformulation or claim change can alter documentation, labeling, evidence and market-access obligations.'],
      ],
    },
    {
      id: 'hp54-nutrient-content-versus-health-claim',
      ch: 1,
      front: 'How does a nutrient content claim differ from a health claim?',
      back: 'A nutrient content claim is a statement about the presence, absence or level of a nutrient. A health claim is a statement relating a product or constituent to health. Both apply under applicable rules.',
      explanation: 'Nutrient content, health and disease-treatment claims have different evidence and legal implications.',
      example: 'A statement about the level of a nutrient is a nutrient content claim, while a statement relating a constituent to health is a health claim.',
      terms: ['Nutrient content claim', 'Health claim'],
      refs: [
        [1, 'Statement about the presence, absence or level of a nutrient under applicable rules.'],
        [1, 'Statement relating a product or constituent to health under the applicable evidence and legal framework.'],
      ],
    },
    {
      id: 'hp54-do-not-invent-legal-details',
      ch: 1,
      front: 'When describing Vietnamese rules, what should not be invented?',
      back: 'Article numbers, permitted claims, certification duties or effective dates. Current official texts should be verified.',
      explanation: 'Legal details must come from verified official texts.',
      example: 'A summary of Vietnamese rules cites only what has been verified in current official texts.',
      terms: ['Jurisdiction', 'Advertising'],
      refs: [
        [1, 'Verify current official texts; do not invent article numbers, permitted claims, certification duties or effective dates.'],
      ],
    },
    {
      id: 'hp54-reassess-when-product-changes',
      ch: 2,
      front: 'When should classification and duties be reassessed?',
      back: 'Whenever formulation, source, intended use, claim, label, channel or digital content changes.',
      explanation: 'Any of these changes can affect classification and duties.',
      example: 'A change of label or channel is a reason to reassess classification and duties.',
      terms: ['Classification review', 'Digital monitoring'],
      refs: [
        [2, 'Reassess classification and duties whenever formulation, source, intended use, claim, label, channel or digital content changes.'],
      ],
    },
  ],
});

const HP_M05_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m5-growth-outlook-and-strategic-opportunities',
  title: 'Healthcare Products: Growth Outlook & Strategic Opportunities',
  description: 'Where opportunities occur and how to validate them before expansion.',
  lessonId: 'hp-m5-l5',
  lessonTitle: 'Growth Outlook & Strategic Opportunities',
  chapterIdPrefix: 'hp-m5-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'What Factors Will Drive Future Healthcare Product Demand?', sourceTitle: 'What Factors Will Drive Future Healthcare Product Demand?', citations: [] },
    { title: 'Where Are Evidence-Backed Opportunities Emerging in Vietnam and Global Markets?', sourceTitle: 'Where Are Evidence-Backed Opportunities Emerging in Vietnam and Global Markets?', citations: [] },
    { title: 'How Should Healthcare Product Companies Position Themselves?', sourceTitle: 'How Should Healthcare Product Companies Position Themselves?', citations: [] },
  ],
  cards: [
    {
      id: 'hp55-best-opportunities-intersect',
      ch: 2,
      front: 'Where do the best opportunities occur?',
      back: 'Where a defined health need intersects with credible evidence, suitable product design, accessible distribution and sustainable economics.',
      explanation: 'The best opportunities occur where a defined health need intersects with credible evidence, suitable product design, accessible distribution and sustainable economics.',
      example: 'A defined health need without credible evidence or accessible distribution is not the best opportunity.',
      terms: ['Evidence differentiation', 'Channel fit'],
      refs: [
        [2, 'The best opportunities occur where a defined health need intersects with credible evidence, suitable product design, accessible distribution and sustainable economics.'],
      ],
    },
    {
      id: 'hp55-focused-launch-versus-broad-portfolio',
      ch: 2,
      front: 'Which creates better learning: a focused launch or a broad portfolio built on wellness interest alone?',
      back: 'A focused launch with verified classification, evidence, qualified supply and a suitable channel.',
      explanation: 'Focus produces better learning than breadth built on wellness interest alone.',
      example: 'A launch with verified classification and a suitable channel teaches more than a broad portfolio built on wellness interest.',
      terms: ['Focused entry', 'Channel fit'],
      refs: [
        [2, 'A focused launch with verified classification, evidence, qualified supply and a suitable channel creates better learning than a broad portfolio built on wellness interest alone.'],
      ],
    },
    {
      id: 'hp55-validate-before-expansion',
      ch: 3,
      front: 'What should be validated before expansion?',
      back: 'User and professional need, legal pathway, claims, quality, channel contribution, affordability, resilience and post-market measures.',
      explanation: 'Validate user and professional need, legal pathway, claims, quality, channel contribution, affordability, resilience and post-market measures before expansion.',
      example: 'A company confirms the legal pathway, quality and channel contribution before expanding.',
      terms: ['Lifecycle management', 'Outcome measurement'],
      refs: [
        [3, 'Validate user and professional need, legal pathway, claims, quality, channel contribution, affordability, resilience and post-market measures before expansion.'],
      ],
    },
  ],
});

export const HEALTHCARE_PRODUCTS_M05_DECKS: FlashcardDeckContent[] = [
  HP_M05_L1_DECK,
  HP_M05_L2_DECK,
  HP_M05_L3_DECK,
  HP_M05_L4_DECK,
  HP_M05_L5_DECK,
];
