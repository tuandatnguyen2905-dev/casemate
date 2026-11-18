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
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card. Chapters 1 and 3 gained cards when their text was rewritten.', 'This lesson has no held chapter.'],
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
    {
      id: 'hp31-revenue-model-defines-accountability',
      ch: 1,
      front: 'What does the way a healthcare products company earns revenue define?',
      back: 'What it is accountable for: each model creates different obligations for quality, claims and regulation.',
      explanation: 'Revenue models cannot be compared without comparing responsibility.',
      example: 'A brand owner, a contract manufacturer and a distributor can earn from the same product yet answer for different things.',
      terms: ['Product sales', 'Manufacturing contract'],
      refs: [
        [1, 'The way a company earns revenue defines what it is accountable for.'],
      ],
    },
    {
      id: 'hp31-brand-owner-stays-responsible',
      ch: 1,
      front: 'A brand owner has others make or distribute its product. Who stays responsible for the product?',
      back: 'The brand owner stays responsible for its product.',
      explanation: 'Outsourcing changes who does the work, not who is accountable.',
      example: 'A brand using a contract manufacturer still answers for its claims and evidence.',
      terms: ['Regulatory responsibility', 'Wholesale margin'],
      refs: [
        [1, 'a brand owner stays responsible for its product even when others make or distribute it'],
      ],
    },
    {
      id: 'hp31-no-model-removes-responsibility',
      ch: 3,
      front: 'Does choosing an importer, distributor, private-label or integrated model remove a company’s responsibility?',
      back: 'No. A model only moves where work is done, so each needs a clear allocation of legal responsibility.',
      explanation: 'Each model needs clear responsibility for quality, traceability and communication.',
      example: 'A foreign brand selling through a distributor still has to specify, oversee and answer for its product.',
      terms: ['Importer', 'Legal responsibility'],
      refs: [
        [3, 'No operating model removes responsibility; it only moves where work is done.'],
      ],
    },
    {
      id: 'hp31-private-label-needs-quality-agreement',
      ch: 3,
      front: 'What does a private-label model need to work?',
      back: 'A quality agreement with the manufacturer that makes the product to the brand owner’s specification.',
      explanation: 'The brand sells under its own name a product another company makes, so the specification and controls must be written down.',
      example: 'A brand and its contract manufacturer agree specifications, testing, records and corrective action in writing.',
      terms: ['Private-label model', 'Quality agreement'],
      refs: [
        [3, 'A private-label model sells under the company’s own brand a product that another company makes to its specification, which needs a quality agreement.'],
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
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card. The earlier cards on chapter 3 were replaced with new IDs when the lesson was rewritten; the retired IDs are listed in RETIRED_CARD_IDS.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Are Supplements and Consumer Health Products Segmented?', sourceTitle: 'How Are Supplements and Consumer Health Products Segmented?', citations: [] },
    { title: 'How Do General, Specialized and Medical Nutrition Differ?', sourceTitle: 'How Do General, Specialized and Medical Nutrition Differ?', citations: [] },
    { title: 'How Do Formulation, Evidence, Classification and Positioning Interact?', sourceTitle: 'How Do Formulation, Evidence, Classification and Positioning Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'hp32-segment-is-not-legal-category',
      ch: 1,
      front: 'Is a commercial segment, such as a benefit area, a legal category?',
      back: 'No. Classification depends on composition, intended use, claims and jurisdiction.',
      explanation: 'A segment groups products for commercial purposes; classification decides which rules apply.',
      example: 'A vitamin supplement, a fortified food and a specialized nutrition product in the same segment can have different classifications.',
      terms: ['Product segment', 'Product classification'],
      refs: [
        [1, 'A segment is not a legal category.'],
        [1, 'Classification depends on composition, intended use, claims and jurisdiction'],
      ],
    },
    {
      id: 'hp32-segmentation-sits-on-classification',
      ch: 1,
      front: 'How does a useful segmentation relate to correct classification?',
      back: 'It sits on top of correct classification and never replaces it.',
      explanation: 'A product in an attractive segment is not thereby permitted to make that segment’s claims.',
      example: 'A company classifies each product first and only then assigns it to a commercial segment.',
      terms: ['Dietary supplement', 'Functional food'],
      refs: [
        [1, 'A useful segmentation therefore sits on top of correct classification and never replaces it.'],
      ],
    },
    {
      id: 'hp32-intended-use-places-product',
      ch: 2,
      front: 'What places a nutrition product as general, specialized or medical nutrition?',
      back: 'Its intended use, not its ingredients alone.',
      explanation: 'General nutrition is not medical nutrition, and intended use is what separates them.',
      example: 'Products with similar nutrients can be offered as an everyday supplement or as medical nutrition for a diagnosed need.',
      terms: ['General nutrition', 'Intended use'],
      refs: [
        [2, 'a product’s intended use, not its ingredients alone, places it'],
      ],
    },
    {
      id: 'hp32-more-medical-more-control',
      ch: 2,
      front: 'What happens to the evidence and control expected as use moves from general toward medical nutrition?',
      back: 'They rise, and a product cannot borrow the claims or channels of a more medical class.',
      explanation: 'Each step toward medical use brings stricter evidence, labeling and use conditions.',
      example: 'A general supplement cannot make claims reserved for medical nutrition.',
      terms: ['Specialized nutrition', 'Medical nutrition'],
      refs: [
        [2, 'Moving from general to specialized to medical use raises the evidence and control expected, and a product cannot borrow the claims or channels of a more medical class.'],
      ],
    },
    {
      id: 'hp32-positioning-cannot-run-ahead',
      ch: 3,
      front: 'Can positioning run ahead of evidence and classification?',
      back: 'No. A claim is only as strong as the evidence for the finished product.',
      explanation: 'A change in formulation or claim changes what the product must be shown to be.',
      example: 'A reformulation with a stronger benefit claim needs its evidence and documentation reviewed first.',
      terms: ['Positioning', 'Claim substantiation'],
      refs: [
        [3, 'Positioning cannot run ahead of evidence and classification.'],
        [3, 'A claim is only as strong as the evidence for the finished product'],
      ],
    },
    {
      id: 'hp32-ingredient-evidence-not-finished-product',
      ch: 3,
      front: 'Does evidence about one ingredient alone substantiate a finished product?',
      back: 'No. The evidence must concern the finished product, its dose or serving, intended population and outcome.',
      explanation: 'Formulation, classification, evidence and positioning are decided together.',
      example: 'A study on an ingredient does not by itself support a benefit claim for a new formulation with a different amount.',
      terms: ['Product-specific evidence', 'Formulation'],
      refs: [
        [3, 'The evidence must concern the finished product, its dose or serving, intended population and outcome; evidence about one ingredient alone does not automatically substantiate the product.'],
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
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card. The earlier cards were replaced with new IDs when the lesson was rewritten; the retired IDs are listed in RETIRED_CARD_IDS.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'Who Purchases Healthcare and Nutrition Products?', sourceTitle: 'Who Purchases Healthcare and Nutrition Products?', citations: [] },
    { title: 'How Do Consumer, Family, Life-Stage and Specialized Needs Differ?', sourceTitle: 'How Do Consumer, Family, Life-Stage and Specialized Needs Differ?', citations: [] },
    { title: 'How Do Retail, Pharmacy, Professional and Institutional Buyers Differ?', sourceTitle: 'How Do Retail, Pharmacy, Professional and Institutional Buyers Differ?', citations: [] },
  ],
  cards: [
    {
      id: 'hp33-buyer-not-always-user',
      ch: 1,
      front: 'Is the person or organization that buys a healthcare product always the user?',
      back: 'No. Knowing who buys is not the same as knowing who uses or benefits.',
      explanation: 'The buyer, the user and the influencer must be identified separately.',
      example: 'A parent buys a supplement for a child on a pharmacist’s advice: one buyer, one recommender and a different user.',
      terms: ['Consumer buyer', 'Family or caregiver buyer'],
      refs: [
        [1, 'Knowing who buys is not the same as knowing who uses or benefits.'],
      ],
    },
    {
      id: 'hp33-trade-orders-are-shipments',
      ch: 1,
      front: 'What do orders from pharmacies, retailers and distributors represent?',
      back: 'Shipments into a channel rather than use; they show trade demand, not that a user needed or continued the product.',
      explanation: 'A trade purchase is not evidence of use.',
      example: 'A large order from a distributor does not show that any consumer needed or kept using the product.',
      terms: ['Trade buyer', 'Purchaser versus user'],
      refs: [
        [1, 'Pharmacies, retailers and distributors buy to resell, so their orders are shipments into a channel rather than use.'],
        [1, 'A channel partner’s purchase shows demand from the trade, not that a user needed or continued the product'],
      ],
    },
    {
      id: 'hp33-need-defines-target-population',
      ch: 2,
      front: 'What does a need define, and for whom is evidence valid?',
      back: 'A target population; evidence is valid only for the population it was gathered on.',
      explanation: 'Meeting different needs means matching formulation, claims and channel to each population.',
      example: 'Evidence gathered for adults does not substantiate use for a child.',
      terms: ['Target population', 'Life stage'],
      refs: [
        [2, 'A need defines a target population, and evidence is valid only for the population it was gathered on.'],
      ],
    },
    {
      id: 'hp33-family-buyer-vs-user',
      ch: 2,
      front: 'When families buy for others, how can the buyer’s concerns and the user’s needs relate?',
      back: 'They can diverge.',
      explanation: 'A buyer may weigh trust and ease of use while the user has a different need.',
      example: 'A caregiver chooses a product for a relative whose needs differ from the caregiver’s priorities.',
      terms: ['Family need', 'Consumer need'],
      refs: [
        [2, 'Families buy for others, so the buyer’s concerns and the user’s needs can diverge.'],
      ],
    },
    {
      id: 'hp33-buyer-types-differ',
      ch: 3,
      front: 'What do institutional buyers need from a supplier?',
      back: 'Documentation, reliable supply and traceability, under their own procurement rules.',
      explanation: 'Each buyer type creates different requirements for information, documentation and accountability.',
      example: 'A hospital buying under its procurement rules needs documentation and reliable supply that a retail buyer may not.',
      terms: ['Institutional buyer', 'Traceability'],
      refs: [
        [3, 'Institutional buyers purchase under their own procurement rules and need documentation, reliable supply and traceability.'],
      ],
    },
    {
      id: 'hp33-contracts-define-duties',
      ch: 3,
      front: 'What should contracts with buyers who hold, resell or recommend products define?',
      back: 'Custody, storage, traceability, expiry, returns, claims, reporting, audits, recalls and downstream seller controls.',
      explanation: 'These buyers hold, resell or recommend products before anyone uses them.',
      example: 'A supplier writes recall, storage and returns duties into contracts with its pharmacy and distributor customers.',
      terms: ['Product custody', 'Traceability'],
      refs: [
        [3, 'contracts should define custody, storage, traceability, expiry, returns, claims, reporting, audits, recalls and downstream seller controls'],
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
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card. The earlier card on chapter 1 was replaced with new IDs when the chapter was rewritten; the retired ID is listed in RETIRED_CARD_IDS.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'How Do Pharmacy, Retail, Distributor and Institutional Channels Work?', sourceTitle: 'How Do Pharmacy, Retail, Distributor and Institutional Channels Work?', citations: [] },
    { title: 'How Do E-Commerce and Direct-to-Consumer Channels Differ?', sourceTitle: 'How Do E-Commerce and Direct-to-Consumer Channels Differ?', citations: [] },
    { title: 'How Do Reach, Compliance, Customer Ownership and Channel Economics Interact?', sourceTitle: 'How Do Reach, Compliance, Customer Ownership and Channel Economics Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'hp35-channel-choice-changes-reach-and-contribution',
      ch: 1,
      front: 'What does channel choice change?',
      back: 'Both reach and contribution; the channel with the highest sales is not necessarily the one that adds the most contribution.',
      explanation: 'Net sales through a channel should be reconciled with that channel’s terms, returns, expiry and working capital.',
      example: 'A supplier compares a distributor, a pharmacy chain and a hospital contract after terms, returns and tied-up stock.',
      terms: ['Channel terms', 'Working capital'],
      refs: [
        [1, 'Channel choice changes both reach and contribution.'],
        [1, 'because the channel with the highest sales is not necessarily the one that adds the most contribution'],
      ],
    },
    {
      id: 'hp35-channel-terms-decide-what-supplier-keeps',
      ch: 1,
      front: 'What do channel terms such as price, margin, returns, payment and reporting decide?',
      back: 'How much of a sale the supplier keeps.',
      explanation: 'Inventory, expiry and working capital also shift cost between the supplier and its partner.',
      example: 'Two channels with the same shelf price can leave the supplier different amounts after returns and payment terms.',
      terms: ['Distributor', 'Retail channel'],
      refs: [
        [1, 'channel terms such as price, margin, returns, payment and reporting decide how much of a sale the supplier keeps'],
      ],
    },
    {
      id: 'hp35-marketplace-vs-direct-customer-ownership',
      ch: 2,
      front: 'How do e-commerce marketplaces and direct-to-consumer channels differ in who owns the customer?',
      back: 'On a marketplace the platform provides traffic and the seller has less control over data; in a direct channel the company owns the relationship and its data but bears acquisition, fulfillment, returns and service.',
      explanation: 'Both sell online, but cost and control sit in different places.',
      example: 'A supplier selling through its own subscription site owns its customers’ data but pays to attract and serve them.',
      terms: ['E-commerce marketplace', 'Direct-to-consumer'],
      refs: [
        [2, 'E-commerce and direct-to-consumer channels both sell online but differ in who owns the customer.'],
        [2, 'In a direct channel, the company sells through its own website, app or subscription and so owns the customer relationship and its data, but also bears acquisition, fulfillment, returns and customer service.'],
      ],
    },
    {
      id: 'hp35-online-judged-on-contribution',
      ch: 2,
      front: 'On what should online and direct channels be judged, rather than order volume?',
      back: 'Contribution and inventory.',
      explanation: 'A digital discount can raise sales while lowering contribution.',
      example: 'After discount, fulfillment, returns and acquisition cost, contribution per order can fall even as orders rise.',
      terms: ['Customer acquisition', 'Fulfillment'],
      refs: [
        [2, 'Online and direct channels should be judged on contribution and inventory, not on order volume.'],
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
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every chapter of this lesson has at least one card. The earlier cards were replaced with new IDs when the lesson was rewritten; the retired IDs are listed in RETIRED_CARD_IDS.', 'This lesson has no held chapter.'],
  chapters: [
    { title: 'Who Participates in the Healthcare Products Ecosystem?', sourceTitle: 'Who Participates in the Healthcare Products Ecosystem?', citations: [] },
    { title: 'How Do Researchers, Manufacturers, Channels and Professionals Collaborate?', sourceTitle: 'How Do Researchers, Manufacturers, Channels and Professionals Collaborate?', citations: [] },
    { title: 'How Do Regulators, Laboratories, Consumers and Communities Shape Value?', sourceTitle: 'How Do Regulators, Laboratories, Consumers and Communities Shape Value?', citations: [] },
  ],
  cards: [
    {
      id: 'hp36-responsibility-allocated-explicitly',
      ch: 1,
      front: 'Why must responsibility for quality, evidence and safe use be allocated explicitly across the ecosystem?',
      back: 'Because a healthcare product is the result of many parties, so responsibility is shared.',
      explanation: 'Mapping who does what exposes gaps in oversight that a single-company view hides.',
      example: 'A supplement involves a brand owner, an ingredient supplier, a manufacturer, a laboratory, a distributor, a pharmacy and a regulator.',
      terms: ['Brand owner', 'Manufacturer'],
      refs: [
        [1, 'A healthcare product is the result of many parties, so responsibility for quality, evidence and safe use is shared and must be allocated explicitly.'],
      ],
    },
    {
      id: 'hp36-single-company-may-combine-roles',
      ch: 1,
      front: 'Can one company combine several ecosystem roles?',
      back: 'Yes, as in an integrated model.',
      explanation: 'A company can hold more than one role, for example development, manufacturing and brand.',
      example: 'An integrated company that develops, makes and sells its own product holds three roles at once.',
      terms: ['Health professional', 'Distributor and retailer'],
      refs: [
        [1, 'A single company may combine several roles, as in an integrated model.'],
      ],
    },
    {
      id: 'hp36-collaboration-information-flows',
      ch: 2,
      front: 'What determines how strong collaboration across the ecosystem is?',
      back: 'Its information flows: specifications, quality agreements, traceability and feedback.',
      explanation: 'Where those links are missing, a quality or safety problem can travel unnoticed from one party to the next.',
      example: 'A complaint reaches a pharmacy; if the batch can be identified and reported on, the problem can be assessed and acted on.',
      terms: ['Quality agreement', 'Post-market monitoring'],
      refs: [
        [2, 'Collaboration is only as strong as its information flows.'],
      ],
    },
    {
      id: 'hp36-traceability-complements-regulation',
      ch: 2,
      front: 'How does WHO guidance treat traceability?',
      back: 'As a complement to regulation, surveillance and response, not a substitute for them.',
      explanation: 'Traceability helps each party act on what the others know, but it does not replace oversight.',
      example: 'Batch traceability lets a manufacturer trace its production records after a complaint, while regulators still set the rules.',
      terms: ['Traceability', 'Professional guidance'],
      refs: [
        [2, 'WHO guidance treats traceability as a complement to regulation, surveillance and response, not a substitute for them.'],
      ],
    },
    {
      id: 'hp36-value-conferred-as-well-as-created',
      ch: 3,
      front: 'Who decides whether a product is allowed, shown to be what it claims, chosen and trusted?',
      back: 'Regulators, laboratories, consumers and communities: value and trust are conferred as well as created.',
      explanation: 'A company cannot capture durable value without meeting each of these four forces.',
      example: 'A product with a distinctive formulation still needs its classification accepted and its quality confirmed.',
      terms: ['Regulator', 'Community trust'],
      refs: [
        [3, 'Value and trust are conferred as well as created.'],
      ],
    },
    {
      id: 'hp36-each-force-can-override-claims',
      ch: 3,
      front: 'Can a laboratory result, a regulator or a user community override a brand’s own claims?',
      back: 'Yes. Each independent signal can override the brand’s own claims.',
      explanation: 'Treat regulators, laboratory testing and consumer-protection rules as part of a product’s cost and credibility.',
      example: 'A laboratory result that contradicts a label can undo the value of a claim.',
      terms: ['Laboratory', 'Market access'],
      refs: [
        [3, 'Each independent signal can override the brand’s own claims.'],
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
