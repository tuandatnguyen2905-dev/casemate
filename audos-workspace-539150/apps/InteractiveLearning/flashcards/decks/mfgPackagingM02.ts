// Packaging, Labels & Industrial Materials Module 02 (apps/IndustryKnowledge/mfgPackagingModule02.tsx).
// Excerpts are verbatim from the rendered chapter text. Figures on cards are limited to the HYPOTHETICAL worked examples in the chapters.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'mfg-packaging',
  industryLabel: 'Packaging, Labels & Industrial Materials',
  moduleId: 'mp-m02',
  moduleLabel: 'Module 02',
  moduleKey: 'MFG_PACKAGING_MODULE02',
  file: 'apps/IndustryKnowledge/mfgPackagingModule02.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const MFG_PACKAGING_M02_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m2-value-chain-overview',
  title: 'Packaging, Labels & Industrial Materials: Value Chain Overview',
  description: 'Authored recall, comparison and application cards for the lesson "Value Chain Overview" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m2-l1',
  lessonTitle: 'Value Chain Overview',
  chapterIdPrefix: 'mp-m2-l1',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 2 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Does the Packaging Value Chain Work?', sourceTitle: 'How Does the Packaging Value Chain Work?', citations: [] },
    { title: 'Who Participates From Raw Material to Customer Use?', sourceTitle: 'Who Participates From Raw Material to Customer Use?', citations: [] },
    { title: 'How Do Materials, Information, Value and Money Flow?', sourceTitle: 'How Do Materials, Information, Value and Money Flow?', citations: [] },
  ],
  cards: [
    {
      id: 'mp21-value-from-converting-materials',
      ch: 1,
      front: 'Where does value come from in the packaging value chain?',
      back: 'Value comes from converting materials into products that reliably protect, identify and run in customer operations.',
      explanation: 'The value chain creates value when converted products reliably protect and identify, and run in customer operations.',
      example: 'A converter earns value by turning materials into a pack that protects the product and runs reliably on the customer line.',
      terms: ['Value creation', 'Conversion'],
      refs: [
        [1, 'Value comes from converting materials into products that reliably protect, identify and run in customer operations.'],
      ],
    },
    {
      id: 'mp21-materials-flow-through-processes',
      ch: 3,
      front: 'Which materials flow through the packaging value chain, and through which processes?',
      back: 'Paper, resins, films, metals, glass, inks and adhesives flow through coating, extrusion, molding, printing, laminating, forming, distribution, filling and recovery.',
      explanation: 'The chain follows materials from inputs through conversion and distribution to filling and recovery.',
      example: 'Resin and film move through extrusion and printing, then on to distribution, filling and recovery.',
      terms: ['Extrusion', 'Lamination', 'Recovery'],
      refs: [
        [3, 'paper, resins, films, metals, glass, inks and adhesives flowing through coating, extrusion, molding, printing, laminating, forming, distribution, filling and recovery.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M02_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m2-upstream-activities',
  title: 'Packaging, Labels & Industrial Materials: Upstream Activities',
  description: 'Authored recall, comparison and application cards for the lesson "Upstream Activities" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m2-l2',
  lessonTitle: 'Upstream Activities',
  chapterIdPrefix: 'mp-m2-l2',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'Which Substrates, Inks, Adhesives and Coatings Are Required?', sourceTitle: 'Which Substrates, Inks, Adhesives and Coatings Are Required?', citations: [] },
    { title: 'How Are Suppliers, Specifications and Sourcing Risks Managed?', sourceTitle: 'How Are Suppliers, Specifications and Sourcing Risks Managed?', citations: [] },
    { title: 'How Do Packaging Design and Product Engineering Begin?', sourceTitle: 'How Do Packaging Design and Product Engineering Begin?', citations: [] },
  ],
  cards: [
    {
      id: 'mp22-film-adhesive-grade-change',
      ch: 1,
      front: 'What can change when a film or adhesive grade is switched, and why is validation essential?',
      back: 'Changing film or adhesive grade can alter seals, migration, print, lamination, curing and line speed, so validation is essential.',
      explanation: 'Changing film or adhesive grade can alter seals, migration, print, lamination, curing and line speed; validation covers each.',
      example: 'Before switching film or adhesive grade, a converter validates seals, migration, print, lamination, curing and line speed.',
      terms: ['Adhesive', 'Migration', 'Validation'],
      refs: [
        [1, 'Changing film or adhesive grade can alter seals, migration, print, lamination, curing and line speed, so validation is essential.'],
      ],
    },
    {
      id: 'mp22-alternative-sourcing-conditions',
      ch: 2,
      front: 'When does alternative sourcing actually protect supply continuity?',
      back: 'Only when replacement materials meet technical and regulatory requirements.',
      explanation: 'A replacement source protects continuity only if its materials meet the same technical and regulatory requirements.',
      example: 'Replacement materials must meet technical and regulatory requirements before alternative sourcing protects continuity.',
      terms: ['Alternative sourcing', 'Supplier qualification'],
      refs: [
        [2, 'Alternative sourcing protects continuity only when replacement materials meet technical and regulatory requirements.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M02_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m2-midstream-activities',
  title: 'Packaging, Labels & Industrial Materials: Midstream Activities',
  description: 'Authored recall, comparison and application cards for the lesson "Midstream Activities" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m2-l3',
  lessonTitle: 'Midstream Activities',
  chapterIdPrefix: 'mp-m2-l3',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every eligible chapter of the lesson has at least one card.'],
  chapters: [
    { title: 'How Are Films, Corrugated Board and Cartons Converted?', sourceTitle: 'How Are Films, Corrugated Board and Cartons Converted?', citations: [] },
    { title: 'How Do Flexographic, Offset and Digital Printing Differ?', sourceTitle: 'How Do Flexographic, Offset and Digital Printing Differ?', citations: [] },
    { title: 'How Do Lamination, Cutting, Forming and Label Conversion Work?', sourceTitle: 'How Do Lamination, Cutting, Forming and Label Conversion Work?', citations: [] },
  ],
  cards: [
    {
      id: 'mp23-no-single-conversion-flow',
      ch: 1,
      front: 'Does one conversion flow apply to every packaging material and format? What differs between films, corrugated cases and folding cartons?',
      back: 'No single conversion flow applies to every packaging material or format. Flexible film, corrugated cases and folding cartons use different substrates, machines, process controls and quality tests.',
      explanation: 'Because substrates and machines differ, process controls and quality tests also differ for each format.',
      example: 'A corrugated shipping case and a flexible pouch use different substrates, machines and process controls.',
      terms: ['Corrugated board', 'Folding carton', 'Flexible film'],
      refs: [
        [1, 'No single conversion flow applies to every packaging material or format.'],
        [1, 'Flexible film, corrugated cases and folding cartons use different substrates, machines, process controls and quality tests.'],
      ],
    },
    {
      id: 'mp23-corrugated-case-versus-flexible-pouch',
      ch: 1,
      front: 'How does making a corrugated shipping case differ from making a flexible pouch?',
      back: 'A corrugated case combines fluting and liners before printing and converting. A flexible pouch may use film extrusion or sourced film, printing, lamination, slitting and pouch making.',
      explanation: 'Flexible film, corrugated cases and folding cartons use different substrates, machines, process controls and quality tests.',
      example: 'A corrugated shipping case starts from fluting and liners, while a flexible pouch uses film, printing, lamination, slitting and pouch making.',
      terms: ['Fluting', 'Lamination', 'Slitting'],
      refs: [
        [1, 'A corrugated shipping case combines fluting and liners before printing and converting, while a flexible pouch may use film extrusion or sourced film, printing, lamination, slitting and pouch making.'],
      ],
    },
    {
      id: 'mp23-digital-versus-flexographic-printing',
      ch: 2,
      front: 'How do digital printing and flexography compare for run length and setup?',
      back: 'Digital printing can reduce plate setup for shorter variable runs, while flexography can suit high-volume roll applications.',
      explanation: 'Printing technologies differ in setup, tooling, run length, variable data and unit economics, so the choice depends on the job.',
      example: 'A short run with variable data suits digital printing, while a high-volume roll job may suit flexography.',
      terms: ['Flexography', 'Digital printing', 'Run length'],
      refs: [
        [2, 'Digital printing can reduce plate setup for shorter variable runs, while flexography can suit high-volume roll applications.'],
      ],
    },
    {
      id: 'mp23-select-printing-technology',
      ch: 2,
      front: 'Which factors should guide the choice of printing technology?',
      back: 'Substrate, graphics, run length, tolerances, food-contact scope, throughput and total cost. Printing is a manufacturing process choice, not a universal substitute.',
      explanation: 'No one printing process fits labels, film, corrugated and folding cartons equally, so the process is chosen against the job.',
      example: 'A team compares substrate, graphics, run length, tolerances, throughput and total cost before choosing between printing technologies.',
      terms: ['Printing technology', 'Throughput'],
      refs: [
        [2, 'Select technology using substrate, graphics, run length, tolerances, food-contact scope, throughput and total cost.'],
        [2, 'Printing is a manufacturing process choice, not a universal substitute across labels, film, corrugated and folding cartons.'],
      ],
    },
    {
      id: 'mp23-high-yield-not-proof-of-quality',
      ch: 3,
      front: 'A label roll shows high material yield. Does that prove the product is good?',
      back: 'No. Production yield does not by itself prove product quality. A label roll can have high material yield yet fail on registration, adhesive, die strike or code readability.',
      explanation: 'Accepted output must satisfy dimensions, print, barrier, adhesion and use requirements, not only the yield figure.',
      example: 'A label roll can achieve high material yield yet fail because registration, adhesive, die strike or code readability is out of specification.',
      terms: ['Material yield', 'Registration', 'Die-cutting'],
      refs: [
        [3, 'Production yield does not by itself prove product quality; accepted output must satisfy dimensions, print, barrier, adhesion and use requirements.'],
        [3, 'A label roll can achieve high material yield yet fail because registration, adhesive, die strike or code readability is out of specification.'],
      ],
    },
    {
      id: 'mp23-track-conforming-output-separately',
      ch: 3,
      front: 'Which finishing measures should be tracked separately instead of being blended into one figure?',
      back: 'Conforming output, process waste, defects, rework and customer-line performance.',
      explanation: 'Track conforming output, process waste, defects and rework separately, because production yield does not by itself prove product quality.',
      example: 'A label converter reports conforming output, process waste, defects, rework and customer-line performance as separate figures.',
      terms: ['Conforming output', 'Rework'],
      refs: [
        [3, 'Track conforming output, process waste, defects, rework and customer-line performance separately.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M02_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m2-downstream-activities',
  title: 'Packaging, Labels & Industrial Materials: Downstream Activities',
  description: 'Authored recall, comparison and application cards for the lesson "Downstream Activities" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m2-l4',
  lessonTitle: 'Downstream Activities',
  chapterIdPrefix: 'mp-m2-l4',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'How Are Finished Packaging Products Inspected and Shipped?', sourceTitle: 'How Are Finished Packaging Products Inspected and Shipped?', citations: [] },
    { title: 'How Do B2B Distribution, Qualification and Traceability Work?', sourceTitle: 'How Do B2B Distribution, Qualification and Traceability Work?', citations: [] },
    { title: 'How Do Technical Support, Recycling and End-of-Life Interfaces Work?', sourceTitle: 'How Do Technical Support, Recycling and End-of-Life Interfaces Work?', citations: [] },
  ],
  cards: [
    {
      id: 'mp24-meets-drawing-yet-fails-on-line',
      ch: 1,
      front: 'A pouch or label meets drawing dimensions. Why can it still fail commercially?',
      back: 'It can fail if it jams, seals poorly or creates unreadable codes at production speed.',
      explanation: 'A pouch or label can meet drawing dimensions yet fail commercially if it jams, seals poorly or creates unreadable codes at production speed.',
      example: 'A pouch or label meets drawing dimensions yet jams at production speed, so it fails commercially.',
      terms: ['Drawing dimensions', 'Line performance'],
      refs: [
        [1, 'A pouch or label can meet drawing dimensions yet fail commercially if it jams, seals poorly or creates unreadable codes at production speed.'],
      ],
    },
    {
      id: 'mp24-supplier-performance-beyond-price',
      ch: 2,
      front: 'What does supplier performance affect besides packaging purchase cost?',
      back: 'Customer uptime, damage, traceability and delivery.',
      explanation: 'Customer uptime, damage, traceability and delivery all depend on supplier performance, not only on packaging purchase cost.',
      example: 'A pouch that jams affects customer uptime and delivery, which the packaging purchase cost does not show.',
      terms: ['Customer uptime', 'Traceability', 'Delivery'],
      refs: [
        [2, 'Supplier performance affects customer uptime, damage, traceability and delivery—not only packaging purchase cost.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M02_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m2-inputs-outputs-and-value-creation',
  title: 'Packaging, Labels & Industrial Materials: Inputs, Outputs & Value Creation',
  description: 'Authored recall, comparison and application cards for the lesson "Inputs, Outputs & Value Creation" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m2-l5',
  lessonTitle: 'Inputs, Outputs & Value Creation',
  chapterIdPrefix: 'mp-m2-l5',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Chapter 3 has no cards because it displays only the shared base text of the lesson plus a dimension sentence.'],
  chapters: [
    { title: 'What Inputs and Assets Drive Packaging Conversion?', sourceTitle: 'What Inputs and Assets Drive Packaging Conversion?', citations: [] },
    { title: 'Where Do Yield, Scrap, Quality and Scheduling Losses Arise?', sourceTitle: 'Where Do Yield, Scrap, Quality and Scheduling Losses Arise?', citations: [] },
    { title: 'How Do Protection, Information and Customer-Line Performance Create Value?', sourceTitle: 'How Do Protection, Information and Customer-Line Performance Create Value?', citations: [] },
  ],
  cards: [
    {
      id: 'mp25-conversion-inputs-and-outputs',
      ch: 1,
      front: 'Which inputs are converted into packs, labels, tapes, films and technical products?',
      back: 'Materials, energy, labor, machines, tooling, print inputs, testing, freight and inventory.',
      explanation: 'Conversion draws on materials, energy, labor, machines and supporting items, and turns them into packs, labels, tapes, films and technical products.',
      example: 'A plant combines film, energy, labor, tooling and print inputs and turns them into labels and films.',
      terms: ['Tooling', 'Print inputs'],
      refs: [
        [1, 'materials, energy, labor, machines, tooling, print inputs, testing, freight and inventory converted into packs, labels, tapes, films and technical products.'],
      ],
    },
    {
      id: 'mp25-profit-depends-on-yield-setup',
      ch: 2,
      front: 'What does packaging profitability depend on?',
      back: 'Yield, setup efficiency, utilization, pricing discipline and measurable customer value.',
      explanation: 'Profitability depends on yield, setup efficiency and utilization, as well as pricing discipline and measurable customer value.',
      example: 'Profitability depends on yield, setup efficiency, utilization and pricing discipline, as the customized short run shows.',
      terms: ['Yield', 'Setup efficiency', 'Utilization'],
      refs: [
        [2, 'Profitability depends on yield, setup efficiency, utilization, pricing discipline and measurable customer value.'],
      ],
    },
    {
      id: 'mp25-short-run-loses-margin',
      ch: 2,
      front: 'A customized short run commands a higher price. How can it still lose margin?',
      back: 'Through setup, scrap, tooling and service, if it is not costed correctly.',
      explanation: 'A higher price does not guarantee profit when setup, scrap, tooling and service costs are not counted.',
      example: 'A customized short run may command a higher price but lose margin through setup, scrap, tooling and service.',
      terms: ['Setup', 'Scrap', 'Short run'],
      refs: [
        [2, 'A customized short run may command a higher price but lose margin through setup, scrap, tooling and service if not costed correctly.'],
      ],
    },
  ],
});

const MFG_PACKAGING_M02_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-packaging-m2-global-vs-local-value-chain',
  title: 'Packaging, Labels & Industrial Materials: Global vs. Local Value Chain',
  description: 'Authored recall, comparison and application cards for the lesson "Global vs. Local Value Chain" in packaging, labels and industrial materials manufacturing, drawn from the chapter text.',
  lessonId: 'mp-m2-l6',
  lessonTitle: 'Global vs. Local Value Chain',
  chapterIdPrefix: 'mp-m2-l6',
  mappingNotes: ['Excerpts are checked against the rendered chapter text.', 'Every eligible chapter of the lesson has at least one card.'],
  chapters: [
    { title: 'How Do Global Packaging Manufacturing Networks Operate?', sourceTitle: 'How Do Global Packaging Manufacturing Networks Operate?', citations: [] },
    { title: 'How Does Vietnam\'s Packaging Supply Chain Work?', sourceTitle: 'How Does Vietnam\'s Packaging Supply Chain Work?', citations: [] },
    { title: 'How Do Imported Inputs, Localization and Export Requirements Interact?', sourceTitle: 'How Do Imported Inputs, Localization and Export Requirements Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'mp26-global-standard-local-production',
      ch: 1,
      front: 'An electronics customer asks for globally standardized protective film and label data. What does it still need locally?',
      back: 'Local production, testing and rapid technical response.',
      explanation: 'Global standards set the specification, while local production, testing and response give the speed and responsiveness.',
      example: 'An electronics customer may require globally standardized protective film and label data with local production, testing and rapid technical response.',
      terms: ['Standardized specification', 'Technical response'],
      refs: [
        [1, 'An electronics customer may require globally standardized protective film and label data with local production, testing and rapid technical response.'],
      ],
    },
    {
      id: 'mp26-vietnam-competes-proximity',
      ch: 2,
      front: 'How can Vietnam compete in packaging, and what should it keep upgrading?',
      back: 'Through proximity and responsiveness, while upgrading specification-driven capability and material resilience.',
      explanation: 'Closeness and fast response are a strength for Vietnam, and they need specification-driven capability and material resilience behind them.',
      example: 'Proximity and responsiveness give Vietnam an edge only while specification-driven capability and material resilience are upgraded.',
      terms: ['Proximity', 'Material resilience'],
      refs: [
        [2, 'Vietnam can compete through proximity and responsiveness while upgrading specification-driven capability and material resilience.'],
      ],
    },
    {
      id: 'mp26-global-inputs-local-conversion',
      ch: 3,
      front: 'How do global inputs and local capabilities combine in the packaging value chain?',
      back: 'Global raw materials and customer standards are combined with local converting, labels, industrial materials, logistics, export supply and recovery systems.',
      explanation: 'Imported inputs and customer standards meet local conversion, logistics, export supply and recovery.',
      example: 'A converter uses imported raw materials to a global customer standard and handles converting and export supply locally.',
      terms: ['Localization', 'Export supply'],
      refs: [
        [3, 'global raw materials and customer standards combined with local converting, labels, industrial materials, logistics, export supply and recovery systems.'],
      ],
    },
  ],
});

export const MFG_PACKAGING_M02_DECKS: FlashcardDeckContent[] = [
  MFG_PACKAGING_M02_L1_DECK,
  MFG_PACKAGING_M02_L2_DECK,
  MFG_PACKAGING_M02_L3_DECK,
  MFG_PACKAGING_M02_L4_DECK,
  MFG_PACKAGING_M02_L5_DECK,
  MFG_PACKAGING_M02_L6_DECK,
];
