// Packaging, Labels & Industrial Materials Module 01 (apps/IndustryKnowledge/mfgPackagingModule01.tsx).
// Excerpts are verbatim from the rendered chapter text. Figures on cards are limited to the HYPOTHETICAL worked examples in the chapters.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'mfg-packaging',
  industryLabel: 'Packaging, Labels & Industrial Materials',
  moduleId: 'mp-m01',
  moduleLabel: 'Module 01',
  moduleKey: 'MFG_PACKAGING_MODULE01',
  file: 'apps/IndustryKnowledge/mfgPackagingModule01.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const MFG_PACKAGING_M01_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m1-industry-definition-and-scope',
  title: 'Packaging, Labels & Industrial Materials: Industry Definition & Scope',
  description: 'Authored recall, comparison and application cards for the lesson "Industry Definition & Scope" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m1-l1',
  lessonTitle: 'Industry Definition & Scope',
  chapterIdPrefix: 'mp-m1-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 5 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'What Is the Packaging, Labels & Industrial Materials Industry?', sourceTitle: 'What Is the Packaging, Labels & Industrial Materials Industry?', citations: [] },
    { title: 'What Makes Packaging Manufacturing Unique?', sourceTitle: 'What Makes Packaging Manufacturing Unique?', citations: [] },
    { title: 'Where Does the Industry Begin and End?', sourceTitle: 'Where Does the Industry Begin and End?', citations: [] },
    { title: 'What Are the Main Packaging and Label Categories?', sourceTitle: 'What Are the Main Packaging and Label Categories?', citations: [] },
    { title: 'Who Are the Industry\'s Customers and Stakeholders?', sourceTitle: 'Who Are the Industry\'s Customers and Stakeholders?', citations: [] },
  ],
  cards: [
    {
      id: 'mp11-industry-enabling-functions',
      ch: 1,
      front: 'What does the packaging, labels and industrial materials industry enable, and through which capability?',
      back: 'It enables protection, identification, logistics and manufacturing, through matched material and conversion capability.',
      explanation: 'The industry is defined by what packs, labels and industrial materials do for customers, backed by the material and conversion capability that fits each use.',
      example: 'A pharmaceutical pack combines product protection, accurate label content and line compatibility through matched material and conversion capability.',
      terms: ['Conversion capability', 'Packaging functions'],
      refs: [
        [1, 'The industry enables protection, identification, logistics and manufacturing through matched material and conversion capability.'],
      ],
    },
    {
      id: 'mp11-pharma-pack-combines-requirements',
      ch: 2,
      front: 'A pharmaceutical pack is a good example of what makes packaging manufacturing demanding. Which requirements does it combine?',
      back: 'Product protection, accurate label content, tamper evidence, coding, line compatibility and traceable records.',
      explanation: 'The pack combines several requirements at once: product protection, label content, coding and traceable records.',
      example: 'A pharmaceutical pack must keep product protection, accurate label content, tamper evidence and traceable records together.',
      terms: ['Tamper evidence', 'Traceability', 'Line compatibility'],
      refs: [
        [2, 'A pharmaceutical pack combines product protection, accurate label content, tamper evidence, coding, line compatibility and traceable records.'],
      ],
    },
    {
      id: 'mp11-industry-boundary-not-equals',
      ch: 3,
      front: 'Where does the packaging industry begin and end? Which four "is not" statements keep its boundaries clear?',
      back: 'Packaging materials are not finished packs, material production is not conversion, printing is not label conversion, and packaging manufacturing is not product filling.',
      explanation: 'Each pair separates one stage from the next: material producers, converters, printers and label converters, and the customers who fill and pack products.',
      example: 'A converter makes and prints a pouch; material production is not conversion, and the food company fills it under its own production controls.',
      terms: ['Conversion', 'Material production', 'Label conversion'],
      refs: [
        [3, 'Packaging materials are not finished packs, material production is not conversion, printing is not label conversion, and packaging manufacturing is not product filling.'],
        [3, 'Material producers make paper, resin, film, foil, glass or metal inputs; converters manufacture packaging;'],
      ],
    },
    {
      id: 'mp11-pouch-converter-versus-filler',
      ch: 3,
      front: 'A converter makes and prints a pouch. Who fills and seals it, and under whose production controls?',
      back: 'A food company fills and seals the pouch under its own production controls, so the converter and the filler are separate manufacturing stages.',
      explanation: 'The converter manufactures the packaging, while filling and packing the product belongs to the customer operation.',
      example: 'A converter prints and delivers a pouch. The food company then fills and seals it on its own line under its own controls.',
      terms: ['Filling and packing', 'Converter'],
      refs: [
        [3, 'A converter makes and prints a pouch, while a food company fills and seals it under its own production controls.'],
      ],
    },
    {
      id: 'mp11-primary-secondary-tertiary-example',
      ch: 4,
      front: 'Using a beverage example, how can one product be primary, secondary and tertiary packaging at different levels?',
      back: 'A beverage bottle can be primary packaging, a paperboard multipack secondary, and a palletized stretch-wrapped load tertiary.',
      explanation: 'The packaging level describes the relationship to the packed product and to logistics, so the same product can appear at all three levels.',
      example: 'On a beverage line, the bottle is primary packaging, the paperboard multipack secondary and the palletized stretch-wrapped load tertiary, so each level relates differently to the product and logistics.',
      terms: ['Primary packaging', 'Secondary packaging', 'Tertiary packaging'],
      refs: [
        [4, 'A beverage bottle can be primary packaging, a paperboard multipack secondary, and a palletized stretch-wrapped load tertiary.'],
      ],
    },
    {
      id: 'mp11-levels-versus-formats-not-interchangeable',
      ch: 4,
      front: 'Why can primary, secondary and tertiary packaging not be treated as interchangeable, and what else follows different structures and economics?',
      back: 'They describe different relationships to the product and logistics. Flexible and rigid packaging, corrugated board and folding carton also follow different structures and economics.',
      explanation: 'Packaging levels describe the relationship to the packed product and logistics, while material and format describe manufacturing technology.',
      example: 'A bottle, a multipack and a palletized load are different levels, while a flexible pouch and a corrugated case differ in format and economics.',
      terms: ['Flexible packaging', 'Rigid packaging', 'Folding carton'],
      refs: [
        [4, 'Primary, secondary and tertiary packaging are not interchangeable; flexible and rigid packaging, corrugated board and folding carton follow different structures and economics.'],
        [4, 'Packaging levels describe relationship to the packed product and logistics, while material and format describe manufacturing technology.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M01_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m1-industry-history-and-development',
  title: 'Packaging, Labels & Industrial Materials: Industry History & Development',
  description: 'Authored recall, comparison and application cards for the lesson "Industry History & Development" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m1-l2',
  lessonTitle: 'Industry History & Development',
  chapterIdPrefix: 'mp-m1-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Did Product Packaging Evolve?', sourceTitle: 'How Did Product Packaging Evolve?', citations: [] },
    { title: 'How Did Paper, Plastic, Printing and Labeling Industrialize?', sourceTitle: 'How Did Paper, Plastic, Printing and Labeling Industrialize?', citations: [] },
    { title: 'How Have Global Packaging Manufacturing Technologies Developed?', sourceTitle: 'How Have Global Packaging Manufacturing Technologies Developed?', citations: [] },
    { title: 'How Has Vietnam\'s Packaging Industry Developed?', sourceTitle: 'How Has Vietnam\'s Packaging Industry Developed?', citations: [] },
  ],
  cards: [
    {
      id: 'mp12-packaging-evolution-systems',
      ch: 1,
      front: 'How does the industry history chapter describe the overall evolution of packaging?',
      back: 'Packaging evolved from basic containers into technology-intensive supply-chain and information systems.',
      explanation: 'The history moves from basic containers to technology-intensive supply-chain and information systems, including digital identification.',
      example: 'QR and serialized labels can support traceability, which shows packaging acting as an information system.',
      terms: ['Packaging evolution', 'Information systems'],
      refs: [
        [1, 'Packaging evolved from basic containers into technology-intensive supply-chain and information systems.'],
      ],
    },
    {
      id: 'mp12-craft-to-automated-converting',
      ch: 2,
      front: 'Which shift marks the industrialization of paper, plastic, printing and labeling in packaging?',
      back: 'The move from wood, paper, glass and metal craft to standardized, automated converting, plastics, high-quality print, multilayers, serialization and environmental redesign.',
      explanation: 'This is how paper, plastic, printing and labeling industrialize: craft gives way to standardized, automated converting with plastics, high-quality print and multilayers.',
      example: 'The move to standardized, automated converting brings plastics, high-quality print and multilayers.',
      terms: ['Standardized converting', 'Multilayers', 'Serialization'],
      refs: [
        [2, 'the move from wood, paper, glass and metal craft to standardized, automated converting, plastics, high-quality print, multilayers, serialization and environmental redesign.'],
      ],
    },
    {
      id: 'mp12-export-manufacturing-expectations',
      ch: 4,
      front: 'How does export manufacturing change what Vietnam packaging customers expect from suppliers?',
      back: 'Export manufacturing raises expectations for standardized specifications, inspection, documentation and customer collaboration.',
      explanation: 'Standardized specifications, inspection and documentation matter more for export manufacturing, and customer collaboration supports them.',
      example: 'A Vietnam packaging supplier to export manufacturing prepares standardized specifications, inspection and documentation, and collaborates with the customer.',
      terms: ['Export manufacturing', 'Standardized specifications'],
      refs: [
        [4, 'Export manufacturing raises expectations for standardized specifications, inspection, documentation and customer collaboration.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M01_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m1-global-market-overview',
  title: 'Packaging, Labels & Industrial Materials: Global Market Overview',
  description: 'Authored recall, comparison and application cards for the lesson "Global Market Overview" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m1-l3',
  lessonTitle: 'Global Market Overview',
  chapterIdPrefix: 'mp-m1-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 4 and 5 have no cards because they display only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Is the Global Packaging Industry Structured?', sourceTitle: 'How Is the Global Packaging Industry Structured?', citations: [] },
    { title: 'How Are Packaging Markets Measured?', sourceTitle: 'How Are Packaging Markets Measured?', citations: [] },
    { title: 'Which Materials, Regions and Applications Drive Demand?', sourceTitle: 'Which Materials, Regions and Applications Drive Demand?', citations: [] },
    { title: 'Who Are the Major Global Participant Types?', sourceTitle: 'Who Are the Major Global Participant Types?', citations: [] },
    { title: 'How Do Packaging Demand, Trade and Packaged-Goods Value Interact?', sourceTitle: 'How Do Packaging Demand, Trade and Packaged-Goods Value Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'mp13-global-estimates-differ-by-definition',
      ch: 1,
      front: 'Why should global packaging market estimates not be compared as if they measured the same thing?',
      back: 'Global growth is broad, but market estimates and segment economics differ by definition and material.',
      explanation: 'Market estimates and segment economics differ by definition and material, so each estimate is read with its own definition and material.',
      example: 'Two market estimates can differ by definition and material, so they are not averaged.',
      terms: ['Market definition', 'Segment economics'],
      refs: [
        [1, 'Global growth is broad, but market estimates and segment economics differ by definition and material.'],
      ],
    },
    {
      id: 'mp13-retain-both-definitions',
      ch: 1,
      front: 'When two commercial estimates use different definitions, what should an analyst do with them?',
      back: 'Retain both commercial definitions rather than average them, then size relevant formats and end uses separately.',
      explanation: 'Retain both commercial definitions rather than average them: each has its own definition and methodology.',
      example: 'Two commercial definitions of the global market stay separate, and the relevant formats and end uses are sized separately.',
      terms: ['Commercial definition', 'Sizing'],
      refs: [
        [1, 'Retain both commercial definitions rather than average them, then size relevant formats and end uses separately.'],
      ],
    },
    {
      id: 'mp13-capacity-output-orders-revenue',
      ch: 2,
      front: 'How are capacity, output, order volume, revenue and raw-material value kept distinct when packaging markets are measured?',
      back: 'Capacity is not output; order volume is not recognized revenue; packaging manufacturing revenue is not raw-material value or downstream product value.',
      explanation: 'Raw-material markets, converted packaging sales, orders, physical output, company revenue and packaged-goods value measure different entities and periods.',
      example: 'A converter may have capacity that is not output, and an order volume that is not recognized revenue.',
      terms: ['Capacity', 'Output', 'Recognized revenue'],
      refs: [
        [2, 'Capacity is not output; order volume is not recognized revenue; packaging manufacturing revenue is not raw-material value or downstream product value.'],
        [2, 'Raw-material markets, converted packaging sales, orders, physical output, company revenue and downstream packaged-goods value measure different entities and periods.'],
      ],
    },
    {
      id: 'mp13-annual-order-commitment-revenue',
      ch: 2,
      front: 'A converter receives an annual order commitment. When does it recognize revenue?',
      back: 'Only as qualified packaging is delivered under applicable terms, not when the commitment is received.',
      explanation: 'Order volume is not recognized revenue, so revenue follows delivery of qualified packaging under the applicable terms.',
      example: 'A converter receives an annual order commitment but recognizes revenue only as qualified packaging is delivered under applicable terms.',
      terms: ['Order commitment', 'Recognized revenue'],
      refs: [
        [2, 'A converter may receive an annual order commitment but recognize revenue only as qualified packaging is delivered under applicable terms.'],
      ],
    },
    {
      id: 'mp13-state-measurement-basis',
      ch: 2,
      front: 'What should be stated whenever a packaging market figure is quoted?',
      back: 'Material, product level, unit, geography, period and historical or forecast status.',
      explanation: 'Raw-material markets, orders, physical output and company revenue measure different entities and periods, so a market figure needs its basis stated.',
      example: 'A figure shows its material, product level, unit, geography and period, with historical or forecast status stated.',
      terms: ['Product level', 'Forecast status'],
      refs: [
        [2, 'State material, product level, unit, geography, period and historical or forecast status.'],
      ],
    },
    {
      id: 'mp13-global-scope-materials-end-uses',
      ch: 3,
      front: 'Which materials and end uses does the global finished-packaging scope cover?',
      back: 'Finished packaging across paper, flexible and rigid plastic, metal, glass and other materials, serving consumer and industrial end uses.',
      explanation: 'The scope looks at finished packaging by material, serving both consumer and industrial customers.',
      example: 'A market view that covers paper, plastic, metal and glass packs serving consumer and industrial buyers uses this finished-packaging scope.',
      terms: ['Finished packaging', 'End uses'],
      refs: [
        [3, 'finished packaging across paper, flexible and rigid plastic, metal, glass and other materials serving consumer and industrial end uses.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M01_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m1-vietnam-market-overview',
  title: 'Packaging, Labels & Industrial Materials: Vietnam Market Overview',
  description: 'Authored recall, comparison and application cards for the lesson "Vietnam Market Overview" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m1-l4',
  lessonTitle: 'Vietnam Market Overview',
  chapterIdPrefix: 'mp-m1-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 2, 3 and 5 have no cards because they display only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'What Does Vietnam\'s Packaging Ecosystem Look Like?', sourceTitle: 'What Does Vietnam\'s Packaging Ecosystem Look Like?', citations: [] },
    { title: 'Which Packaging and Label Categories Are Manufactured in Vietnam?', sourceTitle: 'Which Packaging and Label Categories Are Manufactured in Vietnam?', citations: [] },
    { title: 'How Do Domestic and Foreign-Invested Manufacturers Participate?', sourceTitle: 'How Do Domestic and Foreign-Invested Manufacturers Participate?', citations: [] },
    { title: 'How Do FMCG, Electronics, Industrial and Export Customers Drive Demand?', sourceTitle: 'How Do FMCG, Electronics, Industrial and Export Customers Drive Demand?', citations: [] },
    { title: 'How Do Imported Inputs and Supply-Chain Constraints Shape Vietnam?', sourceTitle: 'How Do Imported Inputs and Supply-Chain Constraints Shape Vietnam?', citations: [] },
  ],
  cards: [
    {
      id: 'mp14-vietnam-ecosystem-participants',
      ch: 1,
      front: 'Which businesses make up the Vietnam packaging ecosystem, and which sectors do they serve?',
      back: 'Domestic converters, paper products, plastics, printers, labels, foreign-invested suppliers and industrial materials, serving food, healthcare, electronics, furniture and exports.',
      explanation: 'The ecosystem mixes domestic and foreign-invested suppliers across materials and formats, serving several downstream sectors and exports.',
      example: 'A map of Vietnam packaging would list converters, printers, label firms and foreign-invested suppliers next to the food, electronics and furniture customers they serve.',
      terms: ['Foreign-invested suppliers', 'Industrial materials'],
      refs: [
        [1, 'domestic converters, paper products, plastics, printers, labels, foreign-invested suppliers and industrial materials serving food, healthcare, electronics, furniture and exports.'],
      ],
    },
    {
      id: 'mp14-demand-versus-constraints',
      ch: 4,
      front: 'What helps Vietnam packaging, and what constrains its value capture?',
      back: 'Vietnam benefits from consumer and export-manufacturing demand, but material dependence and uneven technical and recovery systems constrain value capture.',
      explanation: 'Consumer and export-manufacturing demand is a benefit; material dependence and uneven technical and recovery systems limit value capture.',
      example: 'A Vietnam converter sees demand from export manufacturing, yet material dependence constrains the value it captures.',
      terms: ['Export manufacturing', 'Material dependence', 'Value capture'],
      refs: [
        [4, 'Vietnam benefits from consumer and export-manufacturing demand, but material dependence and uneven technical and recovery systems constrain value capture.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M01_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m1-industry-drivers-and-external-factors',
  title: 'Packaging, Labels & Industrial Materials: Industry Drivers & External Factors',
  description: 'Authored recall, comparison and application cards for the lesson "Industry Drivers & External Factors" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m1-l5',
  lessonTitle: 'Industry Drivers & External Factors',
  chapterIdPrefix: 'mp-m1-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapters 3, 4 and 5 have no cards because they display only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Do Consumer Goods, Industry and E-Commerce Drive Packaging Demand?', sourceTitle: 'How Do Consumer Goods, Industry and E-Commerce Drive Packaging Demand?', citations: [] },
    { title: 'How Do Materials, Energy and Freight Affect Packaging Manufacturers?', sourceTitle: 'How Do Materials, Energy and Freight Affect Packaging Manufacturers?', citations: [] },
    { title: 'How Do Customer Specifications and Supply Resilience Shape Demand?', sourceTitle: 'How Do Customer Specifications and Supply Resilience Shape Demand?', citations: [] },
    { title: 'How Are Packaging Innovation and Automation Changing Production?', sourceTitle: 'How Are Packaging Innovation and Automation Changing Production?', citations: [] },
    { title: 'How Do Environmental Rules and Circularity Affect the Industry?', sourceTitle: 'How Do Environmental Rules and Circularity Affect the Industry?', citations: [] },
  ],
  cards: [
    {
      id: 'mp15-performance-depends-on-downstream',
      ch: 1,
      front: 'What does packaging manufacturer performance depend on, according to the drivers chapter?',
      back: 'Downstream-sector exposure and rising technical, information and environmental requirements.',
      explanation: 'Exposure to downstream sectors and growing technical, information and environmental requirements both shape performance.',
      example: 'A converter serving food, healthcare and electronics customers sees its results move with those sectors and with rising requirements.',
      terms: ['Downstream sectors', 'Technical requirements'],
      refs: [
        [1, 'Performance depends on downstream-sector exposure and rising technical, information and environmental requirements.'],
      ],
    },
    {
      id: 'mp15-electronics-exports-versus-resin-prices',
      ch: 2,
      front: 'More exported electronics are raising protective-packaging demand while resin prices rise. What happens to converter margins?',
      back: 'Demand for protective packaging can rise, while resin prices and customer cost-down requests squeeze converter margins.',
      explanation: 'Protective-packaging demand can rise while resin prices and customer cost-down requests squeeze converter margins, so demand and margins can move apart.',
      example: 'A converter serving exported electronics sees more protective-packaging demand, but resin prices and customer cost-down requests squeeze its margins.',
      terms: ['Resin prices', 'Cost-down requests', 'Converter margins'],
      refs: [
        [2, 'More exported electronics can raise protective-packaging demand while resin prices and customer cost-down requests squeeze converter margins.'],
      ],
    },
  ],
});

export const MFG_PACKAGING_M01_DECKS: FlashcardDeckContent[] = [
  MFG_PACKAGING_M01_L1_DECK,
  MFG_PACKAGING_M01_L2_DECK,
  MFG_PACKAGING_M01_L3_DECK,
  MFG_PACKAGING_M01_L4_DECK,
  MFG_PACKAGING_M01_L5_DECK,
];
