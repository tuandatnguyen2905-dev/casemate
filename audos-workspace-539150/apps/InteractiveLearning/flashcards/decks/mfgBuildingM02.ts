// Building Materials & Coatings Module 02, one deck per lesson (apps/IndustryKnowledge/mfgBuildingModule02.tsx).
// Excerpts are verbatim from the rendered chapter text and re-checked by decks.test.ts.
// Figures, dates and company data stay out of the cards; only hypothetical worked calculations carry numbers.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: "mfg-building",
  industryLabel: "Building Materials & Coatings",
  moduleId: 'mb-m02',
  moduleLabel: 'Module 02',
  moduleKey: 'MFG_BUILDING_MODULE02',
  file: 'apps/IndustryKnowledge/mfgBuildingModule02.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

export const MFG_BUILDING_M02_DECKS: FlashcardDeckContent[] = [
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m2-value-chain-overview",
    title: "Building Materials & Coatings: Value Chain Overview",
    description: "Authored review cards for Value Chain Overview in Building Materials & Coatings.",
    lessonId: 'mb-m2-l1',
    lessonTitle: "Value Chain Overview",
    chapterIdPrefix: 'mb-m2-l1',
    chapters: [
      { title: "How Does the Building-Materials Value Chain Work?", sourceTitle: "How Does the Building-Materials Value Chain Work?", citations: [] },
      { title: "Who Participates From Resources to Installed Product?", sourceTitle: "Who Participates From Resources to Installed Product?", citations: [] },
      { title: "How Do Materials, Products, Information and Money Flow?", sourceTitle: "How Do Materials, Products, Information and Money Flow?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 3 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb21-cement-vs-coatings-chain",
        ch: 1,
        front: "How do the value chains of cement and of coatings differ in what they depend on?",
        back: "Cement depends on quarries, kilns and regional bulk logistics; coatings depend more on formulation, packaging, brand, dealer stock and application support.",
        explanation: "The two categories have different bottlenecks, so one chain model does not fit both.",
        example: "A cement producer worries about quarries, kilns and bulk logistics, while a coatings company worries about formulation, dealer stock and application support.",
        terms: ["Resource supply", "Distribution"],
        refs: [
          [1, "Cement depends on quarries, kilns and regional bulk logistics; coatings depend more on formulation, packaging, brand, dealer stock and application support."],
        ],
      },
      {
        id: "mb21-map-category-specific-chains",
        ch: 2,
        front: "A team wants to use one value-chain model for every building-material product. What should it do instead?",
        back: "Map category-specific participants and bottlenecks instead of imposing one value-chain model across all products.",
        explanation: "Participants and bottlenecks differ by category, so each category gets its own map.",
        example: "The chain links minerals, metals, chemicals and energy to material plants, formulators, warehouses, dealers, projects, installers and building owners, but not every product follows the same path.",
        terms: ["Value chain", "Manufacturing"],
        refs: [
          [2, "Map category-specific participants and bottlenecks instead of imposing one value-chain model across all products."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m2-upstream-activities",
    title: "Building Materials & Coatings: Upstream Activities",
    description: "Authored review cards for Upstream Activities in Building Materials & Coatings.",
    lessonId: 'mb-m2-l2',
    lessonTitle: "Upstream Activities",
    chapterIdPrefix: 'mb-m2-l2',
    chapters: [
      { title: "What Raw Materials and Chemical Feedstocks Are Required?", sourceTitle: "What Raw Materials and Chemical Feedstocks Are Required?", citations: [] },
      { title: "How Are Extraction, Procurement and Supplier Quality Managed?", sourceTitle: "How Are Extraction, Procurement and Supplier Quality Managed?", citations: [] },
      { title: "How Do Energy, Water and Input-Cost Risks Affect Production?", sourceTitle: "How Do Energy, Water and Input-Cost Risks Affect Production?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 3 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb22-raw-materials-and-inputs",
        ch: 1,
        front: "Which raw materials and inputs does the upstream stage of building-materials manufacturing involve?",
        back: "Limestone, clay, gypsum, sand, aggregates, metals, glass inputs, resins, pigments, solvents, additives, packaging, utilities and production equipment.",
        explanation: "Inputs range from minerals and metals to chemical feedstocks, packaging, utilities and equipment.",
        example: "A manufacturer sourcing for production lists inputs such as limestone, clay and gypsum as well as resins, pigments, solvents and additives.",
        terms: ["Minerals", "Resins and pigments"],
        refs: [
          [1, "limestone, clay, gypsum, sand, aggregates, metals, glass inputs, resins, pigments, solvents, additives, packaging, utilities and production equipment."],
        ],
      },
      {
        id: "mb22-low-cost-pigment-hidden-cost",
        ch: 2,
        front: "Why can a low-cost pigment or resin end up costing more?",
        back: "It can raise hidden cost if color, weatherability, adhesion or compliance becomes inconsistent.",
        explanation: "Input sourcing controls cost, consistency, compliance and environmental exposure, so price alone is not the test.",
        example: "A buyer picks the cheapest pigment, and later batches vary in color or fail on weatherability or adhesion.",
        terms: ["Resins and pigments", "Supplier qualification"],
        refs: [
          [2, "A low-cost pigment or resin can raise hidden cost if color, weatherability, adhesion or compliance becomes inconsistent."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m2-midstream-activities",
    title: "Building Materials & Coatings: Midstream Activities",
    description: "Authored review cards for Midstream Activities in Building Materials & Coatings.",
    lessonId: 'mb-m2-l3',
    lessonTitle: "Midstream Activities",
    chapterIdPrefix: 'mb-m2-l3',
    chapters: [
      { title: "How Are Cement, Clinker, Concrete and Aggregates Produced?", sourceTitle: "How Are Cement, Clinker, Concrete and Aggregates Produced?", citations: [] },
      { title: "How Are Ceramics and Construction Glass Manufactured?", sourceTitle: "How Are Ceramics and Construction Glass Manufactured?", citations: [] },
      { title: "How Are Paints, Protective Coatings and Construction Chemicals Formulated?", sourceTitle: "How Are Paints, Protective Coatings and Construction Chemicals Formulated?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 2 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb23-cement-concrete-aggregate-processes",
        ch: 1,
        front: "How do cement production, concrete batching and aggregates differ in their processes?",
        back: "Cement production converts mineral feedstocks through clinker and grinding; concrete batching combines cement, aggregates, water and admixtures; aggregates are extracted and processed separately.",
        explanation: "These related products do not share one universal process, unit or cost structure.",
        example: "A quarry supplies feedstock, a kiln makes clinker, grinding makes cement and a batching plant combines cement, aggregates, water and admixtures.",
        terms: ["Kiln and clinker", "Concrete batching", "Aggregate processing"],
        refs: [
          [1, "Cement production converts mineral feedstocks through clinker and grinding; concrete batching combines cement, aggregates, water and admixtures; aggregates are extracted and processed separately."],
          [1, "These related products do not share one universal process, unit or cost structure."],
        ],
      },
      {
        id: "mb23-clinker-route-to-concrete",
        ch: 1,
        front: "Clinker can be sold or ground. What does grinding turn it into, and where does that product go next?",
        back: "Clinker can be ground with other constituents into finished cement, which then becomes one input into concrete.",
        explanation: "Clinker, cement and concrete are linked but are different products.",
        example: "A producer can sell clinker, or grind it with other constituents into finished cement that a concrete producer then uses as an input.",
        terms: ["Kiln and clinker", "Cement grinding"],
        refs: [
          [1, "Clinker can be sold or ground with other constituents into finished cement, which then becomes one input into concrete."],
        ],
      },
      {
        id: "mb23-factory-conformance-not-installed-performance",
        ch: 3,
        front: "A coating passes factory conformance checks. Does that guarantee installed performance?",
        back: "No. Factory conformance or certification does not guarantee installed performance under every surface and environment.",
        explanation: "Coatings and chemicals are formulated systems whose performance depends on ingredients, dispersion, batch control, substrate, preparation and application.",
        example: "A batch can meet its factory test and still behave differently on a different surface or in a different environment.",
        terms: ["Batch test", "Dispersion and mixing"],
        refs: [
          [3, "Factory conformance or certification does not guarantee installed performance under every surface and environment."],
          [3, "Coatings and chemicals are formulated systems whose performance depends on ingredients, dispersion, batch control, substrate, preparation and application."],
        ],
      },
      {
        id: "mb23-protective-coating-site-failure",
        ch: 3,
        front: "A protective coating was formulated correctly at the factory but fails on site. What can explain it?",
        back: "Unsuitable surface preparation, film thickness or curing can cause failure despite correct factory formulation.",
        explanation: "Performance depends on the substrate, preparation and application as well as on the formulation.",
        example: "A coating is applied over a poorly prepared surface or cured under unsuitable conditions and fails although the batch was right.",
        terms: ["Resin or binder", "Batch test"],
        refs: [
          [3, "A protective coating can fail despite correct factory formulation when surface preparation, film thickness or curing is unsuitable."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m2-downstream-activities",
    title: "Building Materials & Coatings: Downstream Activities",
    description: "Authored review cards for Downstream Activities in Building Materials & Coatings.",
    lessonId: 'mb-m2-l4',
    lessonTitle: "Downstream Activities",
    chapterIdPrefix: 'mb-m2-l4',
    chapters: [
      { title: "How Are Bulk and Packaged Materials Distributed?", sourceTitle: "How Are Bulk and Packaged Materials Distributed?", citations: [] },
      { title: "How Do Dealers, Project Procurement and Site Delivery Work?", sourceTitle: "How Do Dealers, Project Procurement and Site Delivery Work?", citations: [] },
      { title: "How Do Application, Technical Support and After-Sales Interfaces Work?", sourceTitle: "How Do Application, Technical Support and After-Sales Interfaces Work?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 1 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb24-dealer-stock-with-control",
        ch: 2,
        front: "What should a manufacturer control while it develops dealer stock and project relationships?",
        back: "Credit, genuine products, delivery and application quality.",
        explanation: "Market access combines physical availability, credit, technical support and influence before procurement.",
        example: "A manufacturer expands dealer stock and project relationships while keeping credit, genuine products, delivery and application quality under control.",
        terms: ["Retail and dealers", "Direct projects"],
        refs: [
          [2, "Develop dealer stock and project relationships while controlling credit, genuine products, delivery and application quality."],
          [2, "Market access combines physical availability, credit, technical support and influence before procurement."],
        ],
      },
      {
        id: "mb24-coating-needs-before-sale",
        ch: 3,
        front: "What may a protective coating need before a sale is made?",
        back: "Surface assessment, samples, system specification and contractor training.",
        explanation: "Technical support and influence come before procurement, not after it.",
        example: "A buyer of a protective coating first has the surface assessed, receives samples and a system specification, and trains the contractor.",
        terms: ["Specification selling", "Application support"],
        refs: [
          [3, "A protective coating may need surface assessment, samples, system specification and contractor training before a sale."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m2-inputs-outputs-and-value-creation",
    title: "Building Materials & Coatings: Inputs, Outputs & Value Creation",
    description: "Authored review cards for Inputs, Outputs & Value Creation in Building Materials & Coatings.",
    lessonId: 'mb-m2-l5',
    lessonTitle: "Inputs, Outputs & Value Creation",
    chapterIdPrefix: 'mb-m2-l5',
    chapters: [
      { title: "What Resources Are Required to Manufacture Building Materials?", sourceTitle: "What Resources Are Required to Manufacture Building Materials?", citations: [] },
      { title: "Where Are Yield Loss, Quality, Cost and Logistics Risks Generated?", sourceTitle: "Where Are Yield Loss, Quality, Cost and Logistics Risks Generated?", citations: [] },
      { title: "How Do Product Performance and Lifecycle Value Create Advantage?", sourceTitle: "How Do Product Performance and Lifecycle Value Create Advantage?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapters 1, 2 have no cards because they display only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb25-lowest-cost-not-best-choice",
        ch: 3,
        front: "Is the lowest cost per tonne, litre or square metre always the best economic choice?",
        back: "No. A durable system can reduce rework and maintenance despite higher initial product cost, so the best choice may not be the lowest cost per tonne, litre or square metre.",
        explanation: "Lifecycle value and maintenance matter alongside initial product cost.",
        example: "A durable waterproofing or anti-corrosion system costs more at first but reduces rework and maintenance.",
        terms: ["Total installed cost", "Durability"],
        refs: [
          [3, "The best economic choice may not be the lowest cost per tonne, litre or square metre."],
          [3, "A durable waterproofing or anti-corrosion system can reduce rework and maintenance despite higher initial product cost."],
        ],
      },
      {
        id: "mb25-quantify-installed-cost",
        ch: 3,
        front: "What should be quantified when comparing building-material options, instead of package price alone?",
        back: "Installed cost, expected life, maintenance, failure risk, application labor and compliance.",
        explanation: "These factors show the cost of the installed result rather than the price of the package.",
        example: "Two products with similar package prices can differ in expected life, maintenance, failure risk and application labor.",
        terms: ["Total installed cost", "Maintenance"],
        refs: [
          [3, "Quantify installed cost, expected life, maintenance, failure risk, application labor and compliance—not package price alone."],
        ],
      },
    ],
  }),
  defineLessonDeck({
    ...COMMON,
    deckId: "mfg-building-m2-global-vs-local-value-chain",
    title: "Building Materials & Coatings: Global vs. Local Value Chain",
    description: "Authored review cards for Global vs. Local Value Chain in Building Materials & Coatings.",
    lessonId: 'mb-m2-l6',
    lessonTitle: "Global vs. Local Value Chain",
    chapterIdPrefix: 'mb-m2-l6',
    chapters: [
      { title: "How Do Global Building-Materials Networks Operate?", sourceTitle: "How Do Global Building-Materials Networks Operate?", citations: [] },
      { title: "How Does Vietnam's Building-Materials Value Chain Work?", sourceTitle: "How Does Vietnam's Building-Materials Value Chain Work?", citations: [] },
      { title: "How Do Localization, Specialty Imports and Logistics Constraints Interact?", sourceTitle: "How Do Localization, Specialty Imports and Logistics Constraints Interact?", citations: [] },
    ],
    mappingNotes: [
      "Excerpts are checked against the rendered chapter text, not the raw module file.",
      "Chapter 1 has no card because it displays only the lesson's shared base text plus a dimension list that other chapters of the lesson repeat.",
    ],
    cards: [
      {
        id: "mb26-local-vs-international",
        ch: 3,
        front: "Which building-material inputs tend to localize near demand, and which can move internationally?",
        back: "Heavy materials tend to localize near demand, while high-value formulation inputs can move internationally.",
        explanation: "Competitive local value chains pair domestic scale with access to specialized global inputs.",
        example: "Cement is made near demand, while a specialty formulation input may be imported.",
        terms: ["Local heavy materials", "Imported specialty inputs"],
        refs: [
          [3, "Heavy materials tend to localize near demand while high-value formulation inputs can move internationally."],
        ],
      },
      {
        id: "mb26-local-chain-combines",
        ch: 2,
        front: "What do competitive local value chains combine?",
        back: "Domestic scale with reliable access to specialized global inputs and technology.",
        explanation: "Localized cement, steel, tiles, glass and paints sit alongside imported resins, pigments, additives, equipment or know-how where needed.",
        example: "A local paint maker pairs domestic production scale with reliable access to imported resins or pigments.",
        terms: ["Supply resilience", "Technology upgrading"],
        refs: [
          [2, "Competitive local value chains combine domestic scale with reliable access to specialized global inputs and technology."],
          [2, "localized cement, steel, tiles, glass and paints alongside imported resins, pigments, additives, equipment or know-how where needed."],
        ],
      },
    ],
  }),
];
