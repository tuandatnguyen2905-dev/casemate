// Healthcare Products & Nutrition Module 03 (apps/IndustryKnowledge/healthcareProductsModule03.tsx).
// Excerpts are verbatim from the rendered chapter text; they are checked against the rebuilt chapters, not the raw file.
// Chapters that only repeat another chapter's shared text, and the review-held chapter, carry no cards.
// Hypothetical worked numbers stay labelled as hypothetical; no real-world figures, doses or approval thresholds appear on cards.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'healthcare-products',
  industryLabel: 'Healthcare Products & Nutrition',
  moduleId: 'hp-m03',
  moduleLabel: 'Module 03',
  moduleKey: 'HEALTHCARE_PRODUCTS_MODULE03',
  file: 'apps/IndustryKnowledge/healthcareProductsModule03.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const HP_M03_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m3-industry-business-models',
  title: 'Healthcare Products: Industry Business Models',
  description: 'What brand owners and product developers control and what they remain responsible for.',
  lessonId: 'hp-m3-l1',
  lessonTitle: 'Industry Business Models',
  chapterIdPrefix: 'hp-m3-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 1, 3 were left without cards because they only repeat text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Healthcare Products and Nutrition Companies Make Money?', sourceTitle: 'How Do Healthcare Products and Nutrition Companies Make Money?', citations: [] },
    { title: 'How Do Brand Owners, Contract Manufacturers and Ingredient Suppliers Differ?', sourceTitle: 'How Do Brand Owners, Contract Manufacturers and Ingredient Suppliers Differ?', citations: [] },
    { title: 'How Do Importer, Distributor, Private-Label and Integrated Models Compare?', sourceTitle: 'How Do Importer, Distributor, Private-Label and Integrated Models Compare?', citations: [] },
  ],
  cards: [
    {
      id: 'hp31-brand-ownership-durable-value',
      ch: 2,
      front: 'When does brand ownership create durable value?',
      back: 'Only when credible quality, evidence, oversight and a clear customer reason to choose support the promise.',
      explanation: 'A brand promise needs support from quality, evidence, oversight and a reason to choose.',
      example: 'A brand with no credible evidence behind its promise does not gain durable value from ownership alone.',
      terms: ['Brand differentiation', 'Portfolio management'],
      refs: [
        [2, 'Brand ownership creates durable value only when credible quality, evidence, oversight and a clear customer reason to choose support the promise.'],
      ],
    },
    {
      id: 'hp31-asset-light-brand-responsibility',
      ch: 2,
      front: 'An asset-light brand uses specialist manufacturing. What does it still retain responsibility for?',
      back: 'Qualified partners, specifications, evidence and compliant communication.',
      explanation: 'An asset-light brand can access specialist manufacturing but retains responsibility for qualified partners, specifications, evidence and compliant communication.',
      example: 'A brand using specialist manufacturing retains responsibility for qualified partners, specifications, evidence and compliant communication.',
      terms: ['Outsourced development', 'In-house development'],
      refs: [
        [2, 'An asset-light brand can access specialist manufacturing but retains responsibility for qualified partners, specifications, evidence and compliant communication.'],
      ],
    },
    {
      id: 'hp31-choose-internal-or-outsourced',
      ch: 2,
      front: 'According to what should internal and outsourced capabilities be chosen?',
      back: 'Product class, technical complexity, control needs, capital, market timing and current legal responsibility.',
      explanation: 'Internal and outsourced capabilities are chosen according to product class, technical complexity, control needs, capital, market timing and current legal responsibility.',
      example: 'Internal and outsourced capabilities are chosen according to product class, technical complexity, control needs and capital.',
      terms: ['In-house development', 'Outsourced development', 'Commercial planning'],
      refs: [
        [2, 'Choose internal and outsourced capabilities according to product class, technical complexity, control needs, capital, market timing and current legal responsibility.'],
      ],
    },
  ],
});

const HP_M03_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m3-products-services-and-segmentation',
  title: 'Healthcare Products: Products, Services & Segmentation',
  description: 'Manufacturers and contract manufacturing: scale, quality agreements and supplier evaluation.',
  lessonId: 'hp-m3-l2',
  lessonTitle: 'Products, Services & Segmentation',
  chapterIdPrefix: 'hp-m3-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 1, 2 were left without cards because they only repeat text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Are Supplements and Consumer Health Products Segmented?', sourceTitle: 'How Are Supplements and Consumer Health Products Segmented?', citations: [] },
    { title: 'How Do General, Specialized and Medical Nutrition Differ?', sourceTitle: 'How Do General, Specialized and Medical Nutrition Differ?', citations: [] },
    { title: 'How Do Formulation, Evidence, Classification and Positioning Interact?', sourceTitle: 'How Do Formulation, Evidence, Classification and Positioning Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'hp32-scale-lowers-cost-only-when',
      ch: 3,
      front: 'When does scale lower cost for a manufacturer?',
      back: 'Only when process capability, quality consistency and dependable delivery protect product integrity.',
      explanation: 'Scale helps only if product integrity is protected.',
      example: 'A larger plant lowers cost only if its process capability, quality consistency and delivery stay dependable.',
      terms: ['Own-brand manufacturing', 'Capacity utilization', 'Quality agreement'],
      refs: [
        [3, 'Scale lowers cost only when process capability, quality consistency and dependable delivery protect product integrity.'],
      ],
    },
    {
      id: 'hp32-who-gmp-connected-controls',
      ch: 3,
      front: 'How does WHO GMP treat quality management, validation, hygiene, testing and complaints?',
      back: 'As connected controls rather than isolated inspections.',
      explanation: 'WHO GMP treats quality management, validation, hygiene, testing and complaints as connected controls.',
      example: 'Validation, hygiene, testing and complaints are handled as connected controls, not as isolated inspections.',
      terms: ['Contract manufacturing', 'Quality agreement'],
      refs: [
        [3, 'WHO GMP treats quality management, validation, hygiene, testing and complaints as connected controls rather than isolated inspections.'],
      ],
    },
    {
      id: 'hp32-evaluate-contract-manufacturer',
      ch: 3,
      front: 'On what should a contract manufacturer be evaluated, besides its quote?',
      back: 'Category-appropriate licensing, capability, records, quality, change control, business continuity and total risk.',
      explanation: 'A quote alone is not a sufficient basis for choosing a contract manufacturer.',
      example: 'A brand comparing two contract manufacturers looks at licensing, capability, records, quality and change control as well as price.',
      terms: ['Contract manufacturing', 'Private label', 'Quality agreement'],
      refs: [
        [3, 'Evaluate a contract manufacturer on category-appropriate licensing, capability, records, quality, change control, business continuity and total risk—not quote alone.'],
      ],
    },
  ],
});

const HP_M03_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m3-customer-segments-and-needs',
  title: 'Healthcare Products: Customer Segments & Needs',
  description: 'Importers, distributors and market access partners, and what weak reporting or governance can cause.',
  lessonId: 'hp-m3-l3',
  lessonTitle: 'Customer Segments & Needs',
  chapterIdPrefix: 'hp-m3-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'Who Purchases Healthcare and Nutrition Products?', sourceTitle: 'Who Purchases Healthcare and Nutrition Products?', citations: [] },
    { title: 'How Do Consumer, Family, Life-Stage and Specialized Needs Differ?', sourceTitle: 'How Do Consumer, Family, Life-Stage and Specialized Needs Differ?', citations: [] },
    { title: 'How Do Retail, Pharmacy, Professional and Institutional Buyers Differ?', sourceTitle: 'How Do Retail, Pharmacy, Professional and Institutional Buyers Differ?', citations: [] },
  ],
  cards: [
    {
      id: 'hp33-distribution-access-and-intelligence',
      ch: 3,
      front: 'Why is distribution both market access and intelligence, and what can weak reporting or governance create?',
      back: 'Distribution brings market access and also information. Weak reporting or governance creates stock, information, quality and compliance risk.',
      explanation: 'A distributor is both a route to market and a source of market information.',
      example: 'A distributor that reports poorly leaves the brand with stock, information, quality and compliance risk.',
      terms: ['Market intelligence', 'Partner governance'],
      refs: [
        [3, 'Distribution is both market access and intelligence; weak reporting or governance creates stock, information, quality and compliance risk.'],
      ],
    },
    {
      id: 'hp33-sell-through-versus-shipments',
      ch: 2,
      front: 'What is sell-through, and how does it differ from shipments to a distributor?',
      back: 'Sell-through is sales from a channel partner to its customer. Shipments to a distributor do not equal sell-through, patient use, adherence or outcomes.',
      explanation: 'Shipments into a channel and sales out of it are different measures.',
      example: 'A large shipment to a distributor does not show that customers have bought, used or adhered to the product.',
      terms: ['Sell-through', 'Inventory'],
      refs: [
        [2, 'Sales from a channel partner to its customer, distinct from shipments into the channel.'],
        [3, 'Shipments to a distributor do not equal sell-through, patient use, adherence or outcomes.'],
      ],
    },
    {
      id: 'hp33-distributor-contracts-define',
      ch: 3,
      front: 'What should contracts with distributors define?',
      back: 'Product custody, storage, traceability, forecasts, expiry, returns, claims, reporting, audits, recalls and downstream seller controls.',
      explanation: 'A contract sets out responsibilities in advance.',
      example: 'A distributor contract spells out custody, storage, expiry, returns, reporting and recalls.',
      terms: ['Partner governance', 'Inventory'],
      refs: [
        [3, 'Contracts should define product custody, storage, traceability, forecasts, expiry, returns, claims, reporting, audits, recalls and downstream seller controls.'],
      ],
    },
  ],
});

const HP_M03_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m3-revenue-streams-and-cost-structure',
  title: 'Healthcare Products: Revenue Streams & Cost Structure',
  description: 'Revenue, cost and KPI worked examples; all numbers are HYPOTHETICAL.',
  lessonId: 'hp-m3-l4',
  lessonTitle: 'Revenue Streams & Cost Structure',
  chapterIdPrefix: 'hp-m3-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Healthcare Product Businesses Generate Revenue?', sourceTitle: 'How Do Healthcare Product Businesses Generate Revenue?', citations: [] },
    { title: 'What Determines Product, Quality and Commercial Costs?', sourceTitle: 'What Determines Product, Quality and Commercial Costs?', citations: [] },
    { title: 'Which KPIs Drive Healthcare Product Profitability?', sourceTitle: 'Which KPIs Drive Healthcare Product Profitability?', citations: [] },
  ],
  cards: [
    {
      id: 'hp34-hypothetical-contribution-and-margin',
      ch: 1,
      front: 'HYPOTHETICAL: a product sells for 30 with costs of 6 ingredients, 4 manufacturing, 2 QA, 2 packaging and 3 distribution. What are the defined cost, contribution and margin?',
      back: 'Cost is 6+4+2+2+3=17, contribution is 30−17=13, and margin is 13/30=43.3 percent.',
      explanation: 'Cost is the sum of the five cost lines; contribution is the sale price less cost; margin is contribution divided by the sale price.',
      example: 'In the same hypothetical example, a product sold for 30 with 17 of defined cost has 13 of contribution.',
      terms: ['Contribution margin', 'Recognized revenue'],
      refs: [
        [1, 'HYPOTHETICAL calculation: cost=6+4+2+2+3=USD17; contribution=30−17=USD13; margin=13/30=43.3%.'],
      ],
    },
    {
      id: 'hp34-hypothetical-not-company-figures',
      ch: 1,
      front: 'Can a HYPOTHETICAL margin from a worked example be presented as a company or market figure?',
      back: 'No. Hypothetical values must not be presented as company or market figures, and channel, tax, returns and cost scope should be defined.',
      explanation: 'Hypothetical values must not be presented as company or market figures.',
      example: 'A HYPOTHETICAL margin of 43.3 percent is not a company or market figure.',
      terms: ['Recognized revenue', 'Contribution margin'],
      refs: [
        [1, 'Do not present hypothetical values as company or market figures; define channel, tax, returns and cost scope.'],
      ],
    },
    {
      id: 'hp34-hypothetical-dtc-contribution',
      ch: 2,
      front: 'HYPOTHETICAL: with 14 COGS, a DTC channel has revenue 30, fulfillment 5 and acquisition cost 4. What is contribution and margin?',
      back: 'With 14 COGS, 5 fulfillment and 4 acquisition cost, contribution is 7. Margin is 7/30=23.3 percent.',
      explanation: 'Subtract COGS, fulfillment and acquisition cost from channel revenue, then divide by revenue.',
      example: 'In the hypothetical example, DTC at 30 less 5 fulfillment and 4 acquisition cost contributes 7.',
      terms: ['COGS', 'Contribution margin'],
      refs: [
        [2, 'HYPOTHETICAL — With USD14 COGS, DTC at USD30 less USD5 fulfillment and USD4 acquisition contributes USD7'],
        [2, 'HYPOTHETICAL margins: DTC 7/30=23.3%'],
      ],
    },
    {
      id: 'hp34-hypothetical-channel-margin-comparison',
      ch: 2,
      front: 'In the HYPOTHETICAL channel example, which channel has the highest margin: DTC, pharmacy or distributor?',
      back: 'Pharmacy, at 27.3 percent (6/22). DTC is 23.3 percent (7/30) and the distributor is 16.7 percent (3/18).',
      explanation: 'Pharmacy 6/22 is 27.3 percent, DTC 7/30 is 23.3 percent and distributor 3/18 is 16.7 percent.',
      example: 'The pharmacy channel contributes 6 on revenue of 22, ahead of the other two channels.',
      terms: ['Contribution margin', 'Distribution margin'],
      refs: [
        [2, 'HYPOTHETICAL margins: DTC 7/30=23.3%; pharmacy 6/22=27.3%; distributor 3/18=16.7%.'],
      ],
    },
    {
      id: 'hp34-hypothetical-expiry-write-off',
      ch: 3,
      front: 'HYPOTHETICAL: 10,000 units cost 12 each and 8 percent expire. What is the write-off, before disposal or recovery effects?',
      back: 'Expired units are 10,000×8 percent=800, and the write-off is 800×12=9,600.',
      explanation: 'Expired units are 10,000×8 percent=800; write-off is 800×12=9,600, before disposal or recovery effects.',
      example: 'In the same example, the 10,000 units are an inventory of 120,000 at cost, of which 9,600 is written off.',
      terms: ['Expiry loss', 'COGS'],
      refs: [
        [3, 'HYPOTHETICAL calculation: expired units=10,000×8%=800; write-off=800×12=USD9,600.'],
      ],
    },
    {
      id: 'hp34-contribution-margin-defined',
      ch: 3,
      front: 'How is contribution margin defined, and what must be stated with it?',
      back: 'Revenue less defined variable or controllable costs. The scope must be stated.',
      explanation: 'Without a stated scope, two contribution margins cannot be compared.',
      example: 'A margin quoted for a channel should say which variable or controllable costs were deducted.',
      terms: ['Contribution margin', 'COGS'],
      refs: [
        [3, 'Revenue less defined variable or controllable costs; scope must be stated.'],
      ],
    },
  ],
});

const HP_M03_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m3-distribution-and-channel-economics',
  title: 'Healthcare Products: Distribution & Channel Economics',
  description: 'What sustainable economics depend on and how channel moves can affect contribution.',
  lessonId: 'hp-m3-l5',
  lessonTitle: 'Distribution & Channel Economics',
  chapterIdPrefix: 'hp-m3-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 2 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Pharmacy, Retail, Distributor and Institutional Channels Work?', sourceTitle: 'How Do Pharmacy, Retail, Distributor and Institutional Channels Work?', citations: [] },
    { title: 'How Do E-Commerce and Direct-to-Consumer Channels Differ?', sourceTitle: 'How Do E-Commerce and Direct-to-Consumer Channels Differ?', citations: [] },
    { title: 'How Do Reach, Compliance, Customer Ownership and Channel Economics Interact?', sourceTitle: 'How Do Reach, Compliance, Customer Ownership and Channel Economics Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'hp35-net-sales-reconciled-with-costs',
      ch: 1,
      front: 'Net sales should be reconciled with which costs and terms?',
      back: 'Product cost, distributor and retailer terms, fulfillment, returns, expiry, customer support, evidence and quality costs.',
      explanation: 'Net sales should be reconciled with product cost, distributor and retailer terms, fulfillment, returns, expiry, customer support, evidence and quality costs.',
      example: 'A team reconciles net sales with product cost, distributor and retailer terms, returns and expiry.',
      terms: ['Gross margin', 'Channel contribution', 'Inventory economics'],
      refs: [
        [1, 'Net sales should be reconciled with product cost, distributor and retailer terms, fulfillment, returns, expiry, customer support, evidence and quality costs.'],
      ],
    },
    {
      id: 'hp35-sustainable-economics-not-headline-sales',
      ch: 3,
      front: 'What do sustainable economics depend on, rather than headline sales?',
      back: 'Contribution, working capital, quality and repeatable demand.',
      explanation: 'Headline sales do not show contribution, working capital, quality or repeatable demand.',
      example: 'A product with strong headline sales can still be unsustainable if contribution and working capital are weak.',
      terms: ['Channel contribution', 'Repeat purchase', 'Scale efficiency'],
      refs: [
        [3, 'Sustainable economics depend on contribution, working capital, quality and repeatable demand—not headline sales.'],
      ],
    },
    {
      id: 'hp35-discount-grows-sales-reduces-contribution',
      ch: 3,
      front: 'How can a digital discount or pharmacy placement affect sales and contribution?',
      back: 'It can grow sales while reducing contribution or increasing working capital.',
      explanation: 'Measure by product, customer group and channel to see the effect.',
      example: 'A discount that lifts sales may still lower contribution or tie up more working capital.',
      terms: ['Channel contribution', 'Inventory economics'],
      refs: [
        [3, 'a digital discount or pharmacy placement can grow sales while reducing contribution or increasing working capital.'],
      ],
    },
  ],
});

const HP_M03_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'healthcare-products-m3-industry-ecosystem-and-stakeholders',
  title: 'Healthcare Products: Industry Ecosystem & Stakeholders',
  description: 'Competitive barriers and what combines into a defensible advantage.',
  lessonId: 'hp-m3-l6',
  lessonTitle: 'Industry Ecosystem & Stakeholders',
  chapterIdPrefix: 'hp-m3-l6',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 was left without cards because it only repeats text already used on another chapter of this lesson.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'Who Participates in the Healthcare Products Ecosystem?', sourceTitle: 'Who Participates in the Healthcare Products Ecosystem?', citations: [] },
    { title: 'How Do Researchers, Manufacturers, Channels and Professionals Collaborate?', sourceTitle: 'How Do Researchers, Manufacturers, Channels and Professionals Collaborate?', citations: [] },
    { title: 'How Do Regulators, Laboratories, Consumers and Communities Shape Value?', sourceTitle: 'How Do Regulators, Laboratories, Consumers and Communities Shape Value?', citations: [] },
  ],
  cards: [
    {
      id: 'hp36-defensible-advantage',
      ch: 2,
      front: 'What does a defensible advantage combine, and what is insufficient alone?',
      back: 'It combines hard-to-replicate capability with reliable customer access. Brand or technical quality alone is insufficient.',
      explanation: 'Both capability and access are needed.',
      example: 'A strong brand with weak customer access lacks a defensible advantage.',
      terms: ['Brand trust', 'Distribution access', 'Manufacturing scale'],
      refs: [
        [2, 'Defensible advantage combines hard-to-replicate capability with reliable customer access; brand or technical quality alone is insufficient.'],
      ],
    },
    {
      id: 'hp36-barriers-differ-by-category',
      ch: 3,
      front: 'How do barriers compare between an authorized medicine, a specialized nutrition product and a food supplement?',
      back: 'They differ sharply, even when each addresses health.',
      explanation: 'Health relevance does not make barriers the same.',
      example: 'An authorized medicine and a food supplement face sharply different barriers although both address health.',
      terms: ['Regulatory expertise', 'Research intensity'],
      refs: [
        [3, 'Barriers differ sharply between an authorized medicine, a specialized nutrition product and a food supplement even when each addresses health.'],
      ],
    },
    {
      id: 'hp36-select-model-after-testing',
      ch: 3,
      front: 'Before selecting a business model, what should be tested?',
      back: 'Classification, evidence, quality, supply, channel access, affordability, capital and accountability.',
      explanation: 'The model is chosen after these tests, not before.',
      example: 'A team tests classification, evidence, quality, supply and channel access before settling on a model.',
      terms: ['Integrated model', 'Regulatory expertise'],
      refs: [
        [3, 'Select the business model only after testing classification, evidence, quality, supply, channel access, affordability, capital and accountability.'],
      ],
    },
  ],
});

export const HEALTHCARE_PRODUCTS_M03_DECKS: FlashcardDeckContent[] = [
  HP_M03_L1_DECK,
  HP_M03_L2_DECK,
  HP_M03_L3_DECK,
  HP_M03_L4_DECK,
  HP_M03_L5_DECK,
  HP_M03_L6_DECK,
];
