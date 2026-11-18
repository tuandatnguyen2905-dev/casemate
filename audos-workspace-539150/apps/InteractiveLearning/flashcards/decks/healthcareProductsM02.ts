// Healthcare Products & Nutrition Module 02 (apps/IndustryKnowledge/healthcareProductsModule02.tsx).
// Excerpts are verbatim from the rendered chapter text; they are checked against the rebuilt chapters, not the raw file.
// Chapters that only repeat another chapter's shared text, and the review-held chapter, carry no cards.
// Hypothetical worked numbers stay labelled as hypothetical; no real-world figures, doses or approval thresholds appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'healthcare-products',
  industryLabel: 'Healthcare Products & Nutrition',
  moduleId: 'hp-m02',
  moduleLabel: 'Module 02',
  moduleKey: 'HEALTHCARE_PRODUCTS_MODULE02',
  file: 'apps/IndustryKnowledge/healthcareProductsModule02.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const HP_M02_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m2-value-chain-overview',
  title: 'Healthcare Products: Value Chain Overview',
  description: 'How value is created across science, manufacturing, regulation, access and responsible use.',
  lessonId: 'hp-m2-l1',
  lessonTitle: 'Value Chain Overview',
  chapterIdPrefix: 'hp-m2-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Does the Healthcare Products and Nutrition Value Chain Work?', sourceTitle: 'How Does the Healthcare Products and Nutrition Value Chain Work?', citations: [] },
    { title: 'Who Is Responsible Across the Product Lifecycle?', sourceTitle: 'Who Is Responsible Across the Product Lifecycle?', citations: [] },
    { title: 'How Do Product, Evidence, Information and Money Flow?', sourceTitle: 'How Do Product, Evidence, Information and Money Flow?', citations: [] },
  ],
  cards: [
    {
      id: 'hp21-value-from-coordination',
      ch: 1,
      front: 'What creates value in the healthcare products and nutrition value chain, and what is not enough on its own?',
      back: 'Value is created through coordination across science, manufacturing, regulation, access and responsible use. Branding or production alone is not enough.',
      explanation: 'The chain creates value through coordination, not through one stage.',
      example: 'A company with strong branding but weak coordination across science, manufacturing, regulation and access has not created value through the whole chain.',
      terms: ['Value chain', 'Quality', 'Regulatory access'],
      refs: [
        [1, 'Value is created through coordination across science, manufacturing, regulation, access and responsible use'],
      ],
    },
    {
      id: 'hp21-map-accountable-owners',
      ch: 2,
      front: 'Which responsibilities should have a mapped accountable owner across the product lifecycle?',
      back: 'Classification, evidence, supplier qualification, release, registration or declaration, distribution, complaints and corrective action.',
      explanation: 'Naming an accountable owner for each item keeps responsibility clear across the lifecycle.',
      example: 'A team assigns one accountable owner each for classification, evidence, supplier qualification, release, distribution, complaints and corrective action.',
      terms: ['Product classification', 'Quality', 'Post-market monitoring'],
      refs: [
        [2, 'Map accountable owners for classification, evidence, supplier qualification, release, registration or declaration, distribution, complaints and corrective action.'],
      ],
    },
    {
      id: 'hp21-post-market-monitoring-defined',
      ch: 2,
      front: 'What is post-market monitoring?',
      back: 'The collection and evaluation of quality, complaint, safety and use information after commercialization.',
      explanation: 'It continues responsibility after a product reaches the market.',
      example: 'Complaint, safety and use information gathered after commercialization feeds post-market monitoring.',
      terms: ['Post-market monitoring'],
      refs: [
        [2, 'Collection and evaluation of quality, complaint, safety and use information after commercialization.'],
      ],
    },
  ],
});

const HP_M02_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m2-upstream-activities',
  title: 'Healthcare Products: Upstream Activities',
  description: 'Research, ingredient selection and supplier qualification before a product is made.',
  lessonId: 'hp-m2-l2',
  lessonTitle: 'Upstream Activities',
  chapterIdPrefix: 'hp-m2-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'The held chapter in this lesson (chapter 3, How Are Product-Specific Evidence and Claims Planned?) has no cards, and no card quotes it.'],
  chapters: [
    { title: 'How Are Health Needs, Ingredients and Formulations Researched?', sourceTitle: 'How Are Health Needs, Ingredients and Formulations Researched?', citations: [] },
    { title: 'How Are Ingredient Suppliers Qualified and Materials Controlled?', sourceTitle: 'How Are Ingredient Suppliers Qualified and Materials Controlled?', citations: [] },
    { title: 'How Are Product-Specific Evidence and Claims Planned?', sourceTitle: 'How Are Product-Specific Evidence and Claims Planned?', citations: [] },
  ],
  cards: [
    {
      id: 'hp22-product-specific-evidence-defined',
      ch: 1,
      front: 'What is product-specific evidence?',
      back: 'Evidence generated for the finished formulation, population, use, dose or serving and outcome in question.',
      explanation: 'It is evidence for the finished product, not only for an ingredient.',
      example: 'Research on an ingredient is not by itself evidence for the finished formulation, population, use, dose or serving and outcome in question.',
      terms: ['Product-specific evidence', 'Ingredient evidence'],
      refs: [
        [1, 'Evidence generated for the finished formulation, population, use, dose or serving and outcome in question.'],
      ],
    },
    {
      id: 'hp22-low-cost-inputs-not-economical',
      ch: 2,
      front: 'When are low-cost inputs not economical?',
      back: 'When weak provenance, variability or evidence creates testing, disruption, quality or trust risk.',
      explanation: 'A low price can hide costs in testing, disruption, quality and trust.',
      example: 'A low-cost ingredient with weak provenance or variability can create testing, disruption, quality or trust risk.',
      terms: ['Supplier qualification', 'Supply risk'],
      refs: [
        [2, 'Low-cost inputs are not economical when weak provenance, variability or evidence creates testing, disruption, quality or trust risk.'],
      ],
    },
    {
      id: 'hp22-codex-source-selection',
      ch: 2,
      front: 'What should vitamin and mineral source selection consider, according to Codex as cited in the chapter?',
      back: 'Safety, bioavailability and purity under applicable standards.',
      explanation: 'The chapter cites Codex for the factors that guide source selection.',
      example: 'When choosing a vitamin or mineral source, a team weighs its safety, bioavailability and purity under applicable standards.',
      terms: ['Ingredient standardization', 'Safety assessment'],
      refs: [
        [2, 'Codex says vitamin and mineral source selection should consider safety, bioavailability and purity under applicable standards.'],
      ],
    },
    {
      id: 'hp22-define-ingredient-specifications',
      ch: 2,
      front: 'What should be defined for an ingredient, as relevant to the product category?',
      back: 'Identity, purity, potency or composition, contaminants, allergens, certificates, audit evidence, traceability and change notification.',
      explanation: 'Identity, purity, potency or composition, contaminants, allergens, certificates, audit evidence, traceability and change notification are defined as relevant to the category.',
      example: 'A supplier specification for a category lists identity, purity, contaminants, allergens, certificates, audit evidence and traceability.',
      terms: ['Ingredient standardization', 'Supplier qualification'],
      refs: [
        [2, 'Define identity, purity, potency or composition, contaminants, allergens, certificates, audit evidence, traceability and change notification as relevant to the category.'],
      ],
    },
  ],
});

const HP_M02_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m2-midstream-activities',
  title: 'Healthcare Products: Midstream Activities',
  description: 'Formulation, manufacturing, quality control and regulatory authorization.',
  lessonId: 'hp-m2-l3',
  lessonTitle: 'Midstream Activities',
  chapterIdPrefix: 'hp-m2-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Are Products Formulated and Manufactured?', sourceTitle: 'How Are Products Formulated and Manufactured?', citations: [] },
    { title: 'How Do Quality Systems, Testing and Batch Release Work?', sourceTitle: 'How Do Quality Systems, Testing and Batch Release Work?', citations: [] },
    { title: 'How Are Packaging, Labeling and Traceability Controlled?', sourceTitle: 'How Are Packaging, Labeling and Traceability Controlled?', citations: [] },
  ],
  cards: [
    {
      id: 'hp23-quality-designed-in',
      ch: 1,
      front: 'Where must quality be designed in, rather than tested only at the end?',
      back: 'Into formulation, process, packaging and controls.',
      explanation: 'Quality is built into the product and process, not left to end testing.',
      example: 'A team builds quality into formulation, process, packaging and controls instead of relying on a final test.',
      terms: ['Formulation', 'Process validation', 'Packaging'],
      refs: [
        [1, 'Quality must be designed into formulation, process, packaging and controls rather than tested only at the end.'],
      ],
    },
    {
      id: 'hp23-no-single-manufacturing-standard',
      ch: 1,
      front: 'Should one manufacturing standard be applied to medicines, supplements, conventional foods and medical nutrition?',
      back: 'No. One manufacturing standard should not be applied to all of them without current category-specific verification.',
      explanation: 'The manufacturing standard depends on the product category.',
      example: 'A manufacturer making a supplement and a medical-nutrition product verifies the current standard for each category.',
      terms: ['Formulation', 'Contract manufacturing'],
      refs: [
        [1, 'Do not apply one manufacturing standard to medicines, supplements, conventional foods and medical nutrition without current category-specific verification.'],
      ],
    },
    {
      id: 'hp23-quality-not-clinical-effectiveness',
      ch: 2,
      front: 'What does manufacturing quality support, and what does it not by itself demonstrate?',
      back: 'It supports consistency and safety but does not itself demonstrate clinical effectiveness.',
      explanation: 'Quality and clinical effectiveness are separate questions.',
      example: 'A conforming batch meets approved specifications and release criteria; that result does not prove benefit for every user.',
      terms: ['Specification', 'Release', 'Laboratory test'],
      refs: [
        [2, 'Manufacturing quality supports consistency and safety but does not itself demonstrate clinical effectiveness.'],
        [2, 'A conforming batch meets approved specifications and release criteria; that result does not prove benefit for every user.'],
      ],
    },
    {
      id: 'hp23-late-classification-change',
      ch: 3,
      front: 'Why does regulatory strategy belong at the start of development?',
      back: 'Because late classification or claim changes can force new evidence, reformulation, relabeling or withdrawal.',
      explanation: 'Late changes in classification or claims are costly for the product.',
      example: 'A claim changed late in development may force new evidence, reformulation or relabeling.',
      terms: ['Product classification', 'Claim substantiation', 'Labeling'],
      refs: [
        [3, 'Regulatory strategy belongs at the start of development because late classification or claim changes can force new evidence, reformulation, relabeling or withdrawal.'],
      ],
    },
    {
      id: 'hp23-fda-claims-illustration-versus-vietnam',
      ch: 3,
      front: 'What does the FDA claims guidance illustrate, and which rules should be used for Vietnam instead?',
      back: 'It illustrates a jurisdiction-specific distinction between supplement structure/function claims and disease claims requiring different regulatory treatment. For Vietnam, use current Vietnamese rules, not U.S. claim pathways.',
      explanation: 'The FDA guidance is an illustration, not a rule that applies in Vietnam.',
      example: 'A team in Vietnam checks current Vietnamese rules for registration, declaration, labeling, advertising, import and post-market duties.',
      terms: ['Claim substantiation', 'Labeling', 'Post-market compliance'],
      refs: [
        [3, 'FDA guidance illustrates a jurisdiction-specific distinction between supplement structure/function claims and disease claims requiring different regulatory treatment.'],
        [3, 'Use current Vietnamese rules, not U.S. claim pathways, to determine registration, declaration, labeling, advertising, import and post-market duties.'],
      ],
    },
  ],
});

const HP_M02_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m2-downstream-activities',
  title: 'Healthcare Products: Downstream Activities',
  description: 'Distribution, recommendation and consumer use, and how channel capability should match product risk.',
  lessonId: 'hp-m2-l4',
  lessonTitle: 'Downstream Activities',
  chapterIdPrefix: 'hp-m2-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Products Reach Applicable Market-Access Processes?', sourceTitle: 'How Do Products Reach Applicable Market-Access Processes?', citations: [] },
    { title: 'How Do Distribution, Pharmacy, Retail and E-Commerce Channels Work?', sourceTitle: 'How Do Distribution, Pharmacy, Retail and E-Commerce Channels Work?', citations: [] },
    { title: 'How Are Consumer Information, Complaints, Safety Signals and Recalls Managed?', sourceTitle: 'How Are Consumer Information, Complaints, Safety Signals and Recalls Managed?', citations: [] },
  ],
  cards: [
    {
      id: 'hp24-widest-channel-not-safest',
      ch: 2,
      front: 'Is the widest channel always the safest or most effective, and what should channel capability match?',
      back: 'No. Channel capability should match product risk, storage, information and use context.',
      explanation: 'The widest channel is not always the safest or most effective.',
      example: 'Channel capability should match product risk, storage, information and use context.',
      terms: ['Distributor', 'Pharmacy', 'E-commerce'],
      refs: [
        [2, 'The widest channel is not always the safest or most effective; channel capability should match product risk, storage, information and use context.'],
      ],
    },
    {
      id: 'hp24-protect-integrity-across-channels',
      ch: 2,
      front: 'What should be protected across physical and digital channels?',
      back: 'Product integrity, authorized sellers, storage, traceability, accurate listings, privacy, professional scope and escalation.',
      explanation: 'The same protections apply in physical and digital channels.',
      example: 'A seller of a product online and in a pharmacy keeps listings accurate and sells only through authorized sellers.',
      terms: ['E-commerce', 'Pharmacy', 'Consumer support'],
      refs: [
        [2, 'Protect product integrity, authorized sellers, storage, traceability, accurate listings, privacy, professional scope and escalation across physical and digital channels.'],
      ],
    },
    {
      id: 'hp24-traceability-limits',
      ch: 3,
      front: 'What can WHO traceability guidance support, and what can traceability not do by itself?',
      back: 'Supply visibility can support recalls, inventory integrity and earlier response, but traceability by itself does not fully prevent falsified products.',
      explanation: 'Supply visibility can support recalls, inventory integrity and earlier response while not fully preventing falsified products by itself.',
      example: 'Supply visibility supports recalls and earlier response, but it does not fully prevent falsified products by itself.',
      terms: ['Traceability', 'Post-market monitoring'],
      refs: [
        [3, 'WHO traceability guidance explains how supply visibility can support recalls, inventory integrity and earlier response while not fully preventing falsified products by itself.'],
      ],
    },
  ],
});

const HP_M02_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m2-inputs-outputs-and-value-creation',
  title: 'Healthcare Products: Inputs, Outputs & Value Creation',
  description: 'How inputs become outputs and where value is gained or lost across the chain.',
  lessonId: 'hp-m2-l5',
  lessonTitle: 'Inputs, Outputs & Value Creation',
  chapterIdPrefix: 'hp-m2-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'What Resources Are Required to Create Responsible Products?', sourceTitle: 'What Resources Are Required to Create Responsible Products?', citations: [] },
    { title: 'Where Are Product Cost, Quality, Safety and Supply Risks Generated?', sourceTitle: 'Where Are Product Cost, Quality, Safety and Supply Risks Generated?', citations: [] },
    { title: 'How Do Evidence, Access, Consistency and Trust Create Value?', sourceTitle: 'How Do Evidence, Access, Consistency and Trust Create Value?', citations: [] },
  ],
  cards: [
    {
      id: 'hp25-supply-and-information-versus-value-loss',
      ch: 2,
      front: 'What supports appropriate use, and what destroys value, according to the chapter?',
      back: 'Reliable supply and accurate information can support appropriate use. Inconsistent quality, shortages, unsuitable claims or poor adherence destroy value.',
      explanation: 'The chapter contrasts what supports appropriate use with what destroys value.',
      example: 'A shortage or an unsuitable claim reduces value, while reliable supply and accurate information help appropriate use.',
      terms: ['Product quality', 'Access', 'Health outcome'],
      refs: [
        [2, 'Reliable supply and accurate information can support appropriate use, while inconsistent quality, shortages, unsuitable claims or poor adherence destroy value.'],
      ],
    },
    {
      id: 'hp25-align-evidence-quality-access-sustainability',
      ch: 3,
      front: 'What do strong models align, and what happens if one is optimized while the others are neglected?',
      back: 'Strong models align evidence, product quality, appropriate access and commercial sustainability. Optimizing one while neglecting others weakens value.',
      explanation: 'Strong models align evidence, product quality, appropriate access and commercial sustainability.',
      example: 'A model that improves access but neglects product quality weakens value.',
      terms: ['Product quality', 'Access', 'Health outcome'],
      refs: [
        [3, 'Strong models align evidence, product quality, appropriate access and commercial sustainability; optimizing one while neglecting others weakens value.'],
      ],
    },
    {
      id: 'hp25-measure-beyond-revenue',
      ch: 3,
      front: 'Alongside revenue and margin, what should be measured?',
      back: 'Quality performance, stock availability, complaint rate, appropriate use, repeat purchase and relevant outcomes.',
      explanation: 'Revenue and margin alone do not show these measures.',
      example: 'A team reports complaint rate, stock availability and appropriate use next to revenue and margin.',
      terms: ['Product quality', 'Health outcome'],
      refs: [
        [3, 'Measure quality performance, stock availability, complaint rate, appropriate use, repeat purchase and relevant outcomes alongside revenue and margin.'],
      ],
    },
  ],
});

const HP_M02_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m2-global-vs-local-value-chain',
  title: 'Healthcare Products: Global vs. Local Value Chain',
  description: 'How global capability and locally compliant execution fit together.',
  lessonId: 'hp-m2-l6',
  lessonTitle: 'Global vs. Local Value Chain',
  chapterIdPrefix: 'hp-m2-l6',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Global Ingredient and Manufacturing Networks Operate?', sourceTitle: 'How Do Global Ingredient and Manufacturing Networks Operate?', citations: [] },
    { title: 'How Does Vietnam’s Healthcare Product Value Chain Work?', sourceTitle: 'How Does Vietnam’s Healthcare Product Value Chain Work?', citations: [] },
    { title: 'How Do Global Evidence and Local Regulatory Requirements Interact?', sourceTitle: 'How Do Global Evidence and Local Regulatory Requirements Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'hp26-traceability-borders-or-local',
      ch: 1,
      front: 'When do traceability and qualified partners matter?',
      back: 'Whether ingredients and products cross borders or are manufactured locally.',
      explanation: 'Traceability and qualified partners matter in both global and local supply.',
      example: 'A locally made product and an imported one both depend on traceability and qualified partners.',
      terms: ['Supply resilience', 'Partner governance'],
      refs: [
        [1, 'Traceability and qualified partners matter whether ingredients and products cross borders or are manufactured locally.'],
      ],
    },
    {
      id: 'hp26-local-versus-imports-compare',
      ch: 2,
      front: 'Is local production automatically lower-cost or higher-quality, and are imports automatically superior?',
      back: 'No on both counts. Compare validated capability, total cost, resilience and compliance.',
      explanation: 'Neither local production nor imports win automatically.',
      example: 'A team comparing a local manufacturer with an import compares validated capability, total cost, resilience and compliance.',
      terms: ['Local manufacturing', 'Supply resilience'],
      refs: [
        [2, 'Local production is not automatically lower-cost or higher-quality, and imports are not automatically superior; compare validated capability, total cost, resilience and compliance.'],
      ],
    },
    {
      id: 'hp26-global-capability-local-execution',
      ch: 3,
      front: 'What does the optimal value chain combine, and what does it retain control over?',
      back: 'It combines specialized global capability with locally compliant execution. It retains control over product integrity, evidence and differentiation.',
      explanation: 'The optimal value chain combines specialized global capability with locally compliant execution.',
      example: 'A company uses global specialist capability but keeps control over product integrity, evidence and differentiation.',
      terms: ['Strategic control', 'Technology transfer'],
      refs: [
        [3, 'The optimal value chain combines specialized global capability with locally compliant execution and retains control over product integrity, evidence and differentiation.'],
      ],
    },
  ],
});

export const HEALTHCARE_PRODUCTS_M02_DECKS: FlashcardDeckContent[] = [
  HP_M02_L1_DECK,
  HP_M02_L2_DECK,
  HP_M02_L3_DECK,
  HP_M02_L4_DECK,
  HP_M02_L5_DECK,
  HP_M02_L6_DECK,
];
