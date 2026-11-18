// Packaging, Labels & Industrial Materials Module 03 (apps/IndustryKnowledge/mfgPackagingModule03.tsx).
// Excerpts are verbatim from the rendered chapter text. Figures on cards are limited to the HYPOTHETICAL worked examples in the chapters.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'mfg-packaging',
  industryLabel: 'Packaging, Labels & Industrial Materials',
  moduleId: 'mp-m03',
  moduleLabel: 'Module 03',
  moduleKey: 'MFG_PACKAGING_MODULE03',
  file: 'apps/IndustryKnowledge/mfgPackagingModule03.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const MFG_PACKAGING_M03_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m3-industry-business-models',
  title: 'Packaging, Labels & Industrial Materials: Industry Business Models',
  description: 'Authored recall, comparison and application cards for the lesson "Industry Business Models" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m3-l1',
  lessonTitle: 'Industry Business Models',
  chapterIdPrefix: 'mp-m3-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 1 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Do Packaging and Label Companies Make Money?', sourceTitle: 'How Do Packaging and Label Companies Make Money?', citations: [] },
    { title: 'How Do Integrated Producers, Converters and Contract Manufacturers Differ?', sourceTitle: 'How Do Integrated Producers, Converters and Contract Manufacturers Differ?', citations: [] },
    { title: 'How Do Volume, Custom, Specialty and Design-to-Manufacture Models Compare?', sourceTitle: 'How Do Volume, Custom, Specialty and Design-to-Manufacture Models Compare?', citations: [] },
  ],
  cards: [
    {
      id: 'mp31-contract-versus-proprietary-offers',
      ch: 2,
      front: 'Which two kinds of offer sit side by side in packaging business models?',
      back: 'B2B manufacturing to customer specifications, alongside proprietary labels, films, adhesives, security features, design, testing, inventory and troubleshooting.',
      explanation: 'A manufacturer can build to a customer specification and also offer its own products and services.',
      example: 'One converter produces to a customer specification, and also offers proprietary labels, films and adhesives with design, testing and troubleshooting.',
      terms: ['Contract manufacturing', 'Proprietary products'],
      refs: [
        [2, 'B2B manufacturing to customer specifications alongside proprietary labels, films, adhesives, security features, design, testing, inventory and troubleshooting.'],
      ],
    },
    {
      id: 'mp31-differentiation-validated-problems',
      ch: 3,
      front: 'When is differentiation strongest for packaging products and services?',
      back: 'When they solve validated customer production or compliance problems.',
      explanation: 'Differentiation is strongest when products and services solve validated customer production or compliance problems.',
      example: 'A qualified protective-film supplier can combine material, precision slitting, line trials, stocking and technical response.',
      terms: ['Differentiation', 'Validated problem'],
      refs: [
        [3, 'Differentiation is strongest when products and services solve validated customer production or compliance problems.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M03_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m3-products-services-and-segmentation',
  title: 'Packaging, Labels & Industrial Materials: Products, Services & Segmentation',
  description: 'Authored recall, comparison and application cards for the lesson "Products, Services & Segmentation" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m3-l2',
  lessonTitle: 'Products, Services & Segmentation',
  chapterIdPrefix: 'mp-m3-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Are Packaging Products Segmented by Material and Format?', sourceTitle: 'How Are Packaging Products Segmented by Material and Format?', citations: [] },
    { title: 'How Do Standard, Customized and Performance Products Differ?', sourceTitle: 'How Do Standard, Customized and Performance Products Differ?', citations: [] },
    { title: 'How Do Printing, Labels, Engineering and Technical Services Add Value?', sourceTitle: 'How Do Printing, Labels, Engineering and Technical Services Add Value?', citations: [] },
  ],
  cards: [
    {
      id: 'mp32-segment-by-function-not-material',
      ch: 1,
      front: 'How should packaging products be segmented: by material alone, or by something else?',
      back: 'By function and application rather than material alone.',
      explanation: 'Products with the same material can serve very different functions and applications, so function and application give a better segmentation.',
      example: 'Two products in the same material but with different applications are placed in different segments.',
      terms: ['Segmentation', 'Function and application'],
      refs: [
        [1, 'Products should be segmented by function and application rather than material alone.'],
      ],
    },
    {
      id: 'mp32-pouch-carton-film-different-risks',
      ch: 2,
      front: 'A food-contact pouch, a shipping carton and an electronics protective film are all packaging-related. How do they differ?',
      back: 'They have different tests, economics and risks.',
      explanation: 'A food-contact pouch, shipping carton and electronics protective film may all be packaging-related but have different tests, economics and risks.',
      example: 'A pouch for food contact, a shipping carton and an electronics film each face their own tests and economics.',
      terms: ['Food-contact pouch', 'Protective film'],
      refs: [
        [2, 'A food-contact pouch, shipping carton and electronics protective film may all be packaging-related but have different tests, economics and risks.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M03_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m3-customer-segments-and-needs',
  title: 'Packaging, Labels & Industrial Materials: Customer Segments & Needs',
  description: 'Authored recall, comparison and application cards for the lesson "Customer Segments & Needs" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m3-l3',
  lessonTitle: 'Customer Segments & Needs',
  chapterIdPrefix: 'mp-m3-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'Who Purchases Packaging, Labels and Industrial Materials?', sourceTitle: 'Who Purchases Packaging, Labels and Industrial Materials?', citations: [] },
    { title: 'How Do FMCG, Healthcare, Electronics and Industrial Needs Differ?', sourceTitle: 'How Do FMCG, Healthcare, Electronics and Industrial Needs Differ?', citations: [] },
    { title: 'How Do Cost, MOQ, Lead Time, Quality and Compliance Shape Purchasing?', sourceTitle: 'How Do Cost, MOQ, Lead Time, Quality and Compliance Shape Purchasing?', citations: [] },
  ],
  cards: [
    {
      id: 'mp33-customer-segments-range',
      ch: 1,
      front: 'What range of customer needs do packaging, label and industrial-material suppliers serve?',
      back: 'Segments ranging from visual consumer packs to regulated labels, sensitive-component protection, transport packaging and manufacturing materials.',
      explanation: 'Buyers span consumer packs, regulated labels, protection of sensitive components, transport packaging and manufacturing materials.',
      example: 'A supplier serves a brand that needs visual consumer packs and a factory that needs manufacturing materials.',
      terms: ['Customer segments', 'Regulated labels'],
      refs: [
        [1, 'segments ranging from visual consumer packs to regulated labels, sensitive-component protection, transport packaging and manufacturing materials.'],
      ],
    },
    {
      id: 'mp33-healthcare-label-versus-industrial-buyer',
      ch: 2,
      front: 'How do a healthcare label buyer and an industrial buyer differ in what they emphasize?',
      back: 'A healthcare label emphasizes accuracy and traceability, while an industrial buyer may prioritize adhesion, tolerance and supply continuity.',
      explanation: 'Segments judge a product by their own needs: accuracy and traceability for healthcare, adhesion, tolerance and continuity for industry.',
      example: 'A healthcare buyer checks label accuracy and traceability, while an industrial buyer checks adhesion, tolerance and supply continuity.',
      terms: ['Traceability', 'Tolerance', 'Supply continuity'],
      refs: [
        [2, 'A healthcare label emphasizes accuracy and traceability while an industrial buyer may prioritize adhesion, tolerance and supply continuity.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M03_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m3-revenue-streams-and-cost-structure',
  title: 'Packaging, Labels & Industrial Materials: Revenue Streams & Cost Structure',
  description: 'Authored recall, comparison and application cards for the lesson "Revenue Streams & Cost Structure" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m3-l4',
  lessonTitle: 'Revenue Streams & Cost Structure',
  chapterIdPrefix: 'mp-m3-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every eligible chapter of the lesson has at least one card.'],
  chapters: [
    { title: 'How Do Packaging Manufacturers Generate Revenue?', sourceTitle: 'How Do Packaging Manufacturers Generate Revenue?', citations: [] },
    { title: 'What Determines Packaging Conversion Cost?', sourceTitle: 'What Determines Packaging Conversion Cost?', citations: [] },
    { title: 'Which KPIs Drive Packaging Manufacturing Profitability?', sourceTitle: 'Which KPIs Drive Packaging Manufacturing Profitability?', citations: [] },
  ],
  cards: [
    {
      id: 'mp34-hypothetical-revenue-contribution',
      ch: 1,
      front: 'HYPOTHETICAL: an order of 100,000 accepted packs at USD0.20 each has USD9,000 material, USD1,000 production waste and USD5,000 conversion cost. What are revenue, contribution and margin?',
      back: 'Revenue is 100,000 x 0.20 = USD20,000. Contribution is 20,000 - 9,000 - 1,000 - 5,000 = USD5,000, so margin is 5,000 / 20,000 = 25 percent.',
      explanation: 'Contribution is revenue less material, waste and conversion cost; margin divides contribution by revenue. The figures are illustrative only.',
      example: 'For the HYPOTHETICAL order, revenue is USD20,000 and contribution is USD5,000, which is 25 percent of revenue.',
      terms: ['Contribution margin', 'Conversion cost'],
      refs: [
        [1, 'HYPOTHETICAL — An order of 100,000 accepted packs at USD0.20 earns USD20,000 revenue.'],
        [1, 'Material input costs USD9,000, production waste USD1,000 and conversion cost USD5,000, giving USD5,000 contribution or 25%.'],
      ],
    },
    {
      id: 'mp34-illustrative-prices-not-benchmarks',
      ch: 1,
      front: 'Can the hypothetical price of USD0.20 per pack be quoted as a company or market benchmark?',
      back: 'No. Illustrative prices or costs must not be presented as company or market benchmarks.',
      explanation: 'The HYPOTHETICAL figures illustrate the calculation; illustrative prices or costs are not company or market benchmarks.',
      example: 'The HYPOTHETICAL price and costs in the example are illustrative, not company or market benchmarks.',
      terms: ['Hypothetical example', 'Benchmark'],
      refs: [
        [1, 'Do not present illustrative prices or costs as company or market benchmarks.'],
      ],
    },
    {
      id: 'mp34-hypothetical-accepted-units',
      ch: 2,
      front: 'HYPOTHETICAL: 10,000 input units, 90 percent material utilization and 2 percent defects on produced units. How many accepted units result?',
      back: 'Produced units are 10,000 x 90 percent = 9,000, and accepted units are 9,000 x 98 percent = 8,820, so 8,820 accepted units result.',
      explanation: 'Apply material utilization first, then remove defects from the produced units. The figures are illustrative only.',
      example: 'From 10,000 input units, 9,000 are produced and 8,820 pass as accepted units.',
      terms: ['Material utilization', 'Accepted units', 'Defects'],
      refs: [
        [2, 'HYPOTHETICAL — 10,000 input units with 90% material utilization and 2% defects on produced units yield 8,820 accepted units. USD900 total conversion cost equals about USD0.102 per accepted unit.'],
        [2, 'HYPOTHETICAL: produced=10,000×90%=9,000; accepted=9,000×98%=8,820; cost=900/8,820≈0.102.'],
      ],
    },
    {
      id: 'mp34-hypothetical-cost-per-accepted-unit',
      ch: 2,
      front: 'HYPOTHETICAL: total conversion cost is USD900 and the run yields 8,820 accepted units. What is the cost per accepted unit?',
      back: '900 / 8,820 is about USD0.102 per accepted unit.',
      explanation: 'Divide the total conversion cost by accepted units, not by produced units, so material loss and defects are included.',
      example: 'USD900 total conversion cost equals about USD0.102 per accepted unit.',
      terms: ['Cost per accepted unit', 'Conversion cost'],
      refs: [
        [2, 'HYPOTHETICAL — 10,000 input units with 90% material utilization and 2% defects on produced units yield 8,820 accepted units. USD900 total conversion cost equals about USD0.102 per accepted unit.'],
        [2, 'HYPOTHETICAL: produced=10,000×90%=9,000; accepted=9,000×98%=8,820; cost=900/8,820≈0.102.'],
      ],
    },
    {
      id: 'mp34-hypothetical-setup-cost-per-unit',
      ch: 3,
      front: 'HYPOTHETICAL: a USD600 setup is spread over 20,000 units versus 5,000 units. What is the setup cost per unit, and what does it explain?',
      back: '600 / 20,000 = USD0.03 per unit, versus 600 / 5,000 = USD0.12 per unit. This explains MOQ and short-run pricing.',
      explanation: 'A USD600 setup spread over 20,000 units costs less per unit than over 5,000 units, which explains MOQ and short-run pricing.',
      example: 'The same setup costs USD0.03 per unit on a long run and USD0.12 per unit on a short run.',
      terms: ['Setup cost', 'MOQ', 'Run length'],
      refs: [
        [3, 'HYPOTHETICAL — A USD600 setup spread over 20,000 units costs USD0.03 each; over 5,000 units it costs USD0.12 each before material or run cost, explaining MOQ and short-run pricing.'],
        [3, 'HYPOTHETICAL: 600/20,000=0.03 versus 600/5,000=0.12 per unit. Shorter runs require pricing or setup recovery.'],
      ],
    },
    {
      id: 'mp34-normalize-cost-basis',
      ch: 3,
      front: 'Why should square-meter, kilogram and thousand-unit costs not be compared directly?',
      back: 'They need a normalized product and performance basis before they can be compared.',
      explanation: 'Square-meter, kilogram and thousand-unit costs are never compared without a normalized product and performance basis, so the products compared must be normalized first.',
      example: 'Quotes per square-meter and per thousand units are first put on a normalized product and performance basis.',
      terms: ['Normalized basis', 'Cost per unit'],
      refs: [
        [3, 'Never compare square-meter, kilogram and thousand-unit costs without a normalized product and performance basis.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M03_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m3-distribution-and-sales-channels',
  title: 'Packaging, Labels & Industrial Materials: Distribution & Sales Channels',
  description: 'Authored recall, comparison and application cards for the lesson "Distribution & Sales Channels" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m3-l5',
  lessonTitle: 'Distribution & Sales Channels',
  chapterIdPrefix: 'mp-m3-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Do Packaging Manufacturers Acquire and Serve Customers?', sourceTitle: 'How Do Packaging Manufacturers Acquire and Serve Customers?', citations: [] },
    { title: 'How Do Direct B2B, Key Accounts, Distributors and Export Channels Work?', sourceTitle: 'How Do Direct B2B, Key Accounts, Distributors and Export Channels Work?', citations: [] },
    { title: 'How Do Customer Specification, Qualification and Supply Agreements Work?', sourceTitle: 'How Do Customer Specification, Qualification and Supply Agreements Work?', citations: [] },
  ],
  cards: [
    {
      id: 'mp35-channel-balance',
      ch: 1,
      front: 'What should packaging sales channels balance?',
      back: 'Customer control, technical complexity, fragmented demand and service cost.',
      explanation: 'A channel choice trades off customer control against technical complexity, fragmented demand and service cost.',
      example: 'A manufacturer weighs customer control and technical complexity against fragmented demand and service cost when choosing a channel.',
      terms: ['Sales channel', 'Service cost'],
      refs: [
        [1, 'Channels should balance customer control, technical complexity, fragmented demand and service cost.'],
      ],
    },
    {
      id: 'mp35-large-factories-and-smaller-users',
      ch: 2,
      front: 'How can a packaging manufacturer serve large factories and smaller users at the same time?',
      back: 'Combine account management for large factories with distributors for smaller users, and accurate digital data across both.',
      explanation: 'Account management suits large factories, distributors suit smaller users, and accurate digital data keeps both consistent.',
      example: 'A manufacturer assigns account management to large factories, uses distributors for smaller users, and shares accurate digital data across both.',
      terms: ['Account management', 'Distributors'],
      refs: [
        [2, 'Combine account management for large factories with distributors for smaller users and accurate digital data across both.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M03_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m3-industry-ecosystem-and-stakeholders',
  title: 'Packaging, Labels & Industrial Materials: Industry Ecosystem & Stakeholders',
  description: 'Authored recall, comparison and application cards for the lesson "Industry Ecosystem & Stakeholders" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m3-l6',
  lessonTitle: 'Industry Ecosystem & Stakeholders',
  chapterIdPrefix: 'mp-m3-l6',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 2 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'Who Participates in the Packaging Ecosystem?', sourceTitle: 'Who Participates in the Packaging Ecosystem?', citations: [] },
    { title: 'How Do Material Producers, Converters, Printers and Customers Collaborate?', sourceTitle: 'How Do Material Producers, Converters, Printers and Customers Collaborate?', citations: [] },
    { title: 'How Do Equipment, Testing, Regulators, Recyclers and Logistics Shape Delivery?', sourceTitle: 'How Do Equipment, Testing, Regulators, Recyclers and Logistics Shape Delivery?', citations: [] },
  ],
  cards: [
    {
      id: 'mp36-ecosystem-participants',
      ch: 1,
      front: 'Who participates in the packaging, labels and industrial materials ecosystem?',
      back: 'Paper mills, resin and chemical suppliers, converters, label firms, machinery providers, brands, factories, distributors, laboratories, regulators and recyclers.',
      explanation: 'The ecosystem spans suppliers, makers, customers and the testing, regulatory and recycling parties around them.',
      example: 'A converter works with a resin supplier, a machinery provider, a customer brand, a laboratory and a recycler.',
      terms: ['Ecosystem', 'Laboratories', 'Recyclers'],
      refs: [
        [1, 'paper mills, resin and chemical suppliers, converters, label firms, machinery providers, brands, factories, distributors, laboratories, regulators and recyclers.'],
      ],
    },
    {
      id: 'mp36-recyclable-redesign-can-fail',
      ch: 3,
      front: 'Why can a recyclable redesign fail even if the idea is sound?',
      back: 'It can fail if barrier performance, sealing, line speed, sorting or recycled-material markets are unsuitable.',
      explanation: 'A recyclable design depends on parties across the ecosystem, from line performance to sorting and end markets.',
      example: 'A redesigned pack is recyclable on paper, but sealing is poor and there is no market for the recycled material.',
      terms: ['Recyclable redesign', 'Sorting', 'Barrier performance'],
      refs: [
        [3, 'A recyclable redesign can fail if barrier performance, sealing, line speed, sorting or recycled-material markets are unsuitable.'],
      ],
    },
  ],
});

export const MFG_PACKAGING_M03_DECKS: FlashcardDeckContent[] = [
  MFG_PACKAGING_M03_L1_DECK,
  MFG_PACKAGING_M03_L2_DECK,
  MFG_PACKAGING_M03_L3_DECK,
  MFG_PACKAGING_M03_L4_DECK,
  MFG_PACKAGING_M03_L5_DECK,
  MFG_PACKAGING_M03_L6_DECK,
];
