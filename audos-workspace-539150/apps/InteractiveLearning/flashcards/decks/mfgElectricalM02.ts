// Pinned-ID authored flashcard decks: Electrical Equipment Manufacturing, Module 02 (apps/IndustryKnowledge/mfgElectricalModule02.tsx).
// Excerpts are checked against the rendered chapter text, not the raw source file.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'mfg-electrical',
  industryLabel: 'Electrical Equipment Manufacturing',
  moduleId: 'me-m02',
  moduleLabel: 'Module 02',
  moduleKey: 'MFG_ELECTRICAL_MODULE02',
  file: 'apps/IndustryKnowledge/mfgElectricalModule02.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const ME_M02_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m2-value-chain-overview',
  title: 'Electrical Equipment Manufacturing: Value Chain Overview',
  description: 'The flow of the value chain, who participates in a utility project and when lifecycle value beats price.',
  lessonId: 'me-m2-l1',
  lessonTitle: 'Value Chain Overview',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m2-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Does the Electrical Equipment Value Chain Work?', sourceTitle: 'How Does the Electrical Equipment Value Chain Work?', citations: [] },
    { title: 'Who Participates From Product Design to Customer Operation?', sourceTitle: 'Who Participates From Product Design to Customer Operation?', citations: [] },
    { title: 'How Do Materials, Information, Money and Quality Evidence Flow?', sourceTitle: 'How Do Materials, Information, Money and Quality Evidence Flow?', citations: [] },
  ],
  cards: [
    {
      id: 'me21-value-chain-flow',
      ch: 1,
      front: 'What flow does the electrical-equipment value chain cover, from raw inputs to replacement?',
      back: 'From conductive and magnetic materials through product engineering, fabrication, assembly, testing, project installation, maintenance and replacement.',
      explanation: 'The chain is technically interdependent from material specification through operation.',
      example: 'Local value can come from components, panels, system design, installation, commissioning, maintenance and qualified manufacturing.',
      terms: ['Value chain', 'Conductive materials', 'Magnetic materials'],
      refs: [
        [1, 'the flow from conductive and magnetic materials through product engineering, fabrication, assembly, testing, project installation, maintenance and replacement'],
        [1, 'Electrical-equipment value chains are technically interdependent from material specification through operation.'],
      ],
    },
    {
      id: 'me21-utility-project-participants',
      ch: 2,
      front: 'Which participants does a utility project have to coordinate?',
      back: 'The equipment manufacturer, testing body, EPC contractor, system integrator, utility and field-service team.',
      explanation: 'Electrical-equipment value chains are technically interdependent from material specification through operation, so a utility project coordinates all of these participants.',
      example: 'A utility project relies on a testing body, an EPC contractor, an integrator and a field-service team as well as the manufacturer.',
      terms: ['EPC contractor', 'System integrator'],
      refs: [
        [2, 'A utility project coordinates the equipment manufacturer, testing body, EPC contractor, system integrator, utility and field-service team.'],
        [2, 'Electrical-equipment value chains are technically interdependent from material specification through operation.'],
      ],
    },
    {
      id: 'me21-pricier-transformer-economics',
      ch: 3,
      front: 'When can a more expensive transformer be the better economic choice?',
      back: 'When losses, reliability, service and expected life are included in the economics.',
      explanation: 'Reliability, compatibility and lifecycle performance often matter more than the lowest initial price.',
      example: 'When comparing two transformers, include losses, reliability, service and expected life in the economics.',
      terms: ['Transformer', 'Lifecycle value'],
      refs: [
        [3, 'A more expensive transformer may deliver better economics when losses, reliability, service and expected life are included.'],
        [3, 'Reliability, compatibility and lifecycle performance often matter more than the lowest initial price.'],
      ],
    },
  ],
});

const ME_M02_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m2-upstream-activities',
  title: 'Electrical Equipment Manufacturing: Upstream Activities',
  description: 'What materials and components products need, why the bill of materials is controlled, and how suppliers are qualified.',
  lessonId: 'me-m2-l2',
  lessonTitle: 'Upstream Activities',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m2-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'What Materials and Components Do Electrical Products Require?', sourceTitle: 'What Materials and Components Do Electrical Products Require?', citations: [] },
    { title: 'How Are Product Engineering and Bills of Materials Developed?', sourceTitle: 'How Are Product Engineering and Bills of Materials Developed?', citations: [] },
    { title: 'How Are Suppliers Qualified and Procurement Risks Managed?', sourceTitle: 'How Are Suppliers Qualified and Procurement Risks Managed?', citations: [] },
  ],
  cards: [
    {
      id: 'me22-transformer-vs-inverter-inputs',
      ch: 1,
      front: 'How do transformers and inverters differ in what they depend on?',
      back: 'Transformers combine magnetic cores, windings, insulation and cooling, while inverters depend more heavily on power semiconductors and controls.',
      explanation: 'Material and component quality directly affect losses, thermal performance, safety and delivery.',
      example: 'A buyer qualifies power semiconductors for an inverter differently from insulation for a transformer instead of treating all inputs as commodities.',
      terms: ['Transformer', 'Inverter', 'Power semiconductors'],
      refs: [
        [1, 'Transformers combine magnetic cores, windings, insulation and cooling while inverters depend more heavily on power semiconductors and controls.'],
        [1, 'Material and component quality directly affect losses, thermal performance, safety and delivery.'],
        [1, 'Develop sourcing and qualification by product criticality rather than treating all inputs as interchangeable commodities.'],
      ],
    },
    {
      id: 'me22-bom-is-designed-structure',
      ch: 2,
      front: 'Why is a bill of materials more than a purchasing list?',
      back: 'BOM cost is a designed product structure, and uncontrolled changes can affect compliance, reliability, schedule and warranty.',
      explanation: 'Engineering translates application and ratings into drawings, components, materials, software, tests and a controlled bill of materials.',
      example: 'A switchgear BOM links breakers, busbars, protection, enclosures, wiring, controls and approved alternates to a specific configuration.',
      terms: ['BOM', 'Change control'],
      refs: [
        [2, 'BOM cost is a designed product structure, not merely a purchasing list; uncontrolled changes can affect compliance, reliability, schedule and warranty.'],
        [2, 'Engineering translates application and ratings into drawings, components, materials, software, tests and a controlled bill of materials.'],
        [2, 'A switchgear BOM links breakers, busbars, protection, enclosures, wiring, controls and approved alternates to a specific configuration.'],
      ],
    },
    {
      id: 'me22-traceability-definition',
      ch: 3,
      front: 'What does traceability mean for electrical equipment?',
      back: 'Ability to follow material, component, test and product records through the lifecycle.',
      explanation: 'Procurement is a technical and resilience function, and traceable documentation is part of supplier capability.',
      example: 'A buyer can follow the material, component and test records of a product through its lifecycle.',
      terms: ['Traceability'],
      refs: [
        [3, 'Ability to follow material, component, test and product records through the lifecycle.'],
        [3, 'multi-tier supplier capability, certifications, long qualification cycles, lead time, quality history, capacity and traceable documentation'],
      ],
    },
    {
      id: 'me22-second-supplier-validation',
      ch: 3,
      front: 'When does adding a second semiconductor or insulation supplier actually improve resilience?',
      back: 'Only after design compatibility and validation are demonstrated.',
      explanation: 'Procurement is a technical and resilience function, not only a price negotiation.',
      example: 'A manufacturer approves a second source only after validation shows that it is compatible with the design.',
      terms: ['Dual sourcing', 'Supplier qualification'],
      refs: [
        [3, 'A second semiconductor or insulation supplier improves resilience only after design compatibility and validation are demonstrated.'],
        [3, 'Procurement is a technical and resilience function, not only a price negotiation.'],
      ],
    },
  ],
});

const ME_M02_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m2-midstream-activities',
  title: 'Electrical Equipment Manufacturing: Midstream Activities',
  description: 'What switchgear engineering aligns, why repeatable manufacturing matters and what factory testing does and does not cover.',
  lessonId: 'me-m2-l3',
  lessonTitle: 'Midstream Activities',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m2-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Are Electrical Components Fabricated, Wound or Integrated?', sourceTitle: 'How Are Electrical Components Fabricated, Wound or Integrated?', citations: [] },
    { title: 'How Are Production Scheduling, Assembly and In-Process Quality Managed?', sourceTitle: 'How Are Production Scheduling, Assembly and In-Process Quality Managed?', citations: [] },
    { title: 'How Do Testing, FAT, Rework and Release Work?', sourceTitle: 'How Do Testing, FAT, Rework and Release Work?', citations: [] },
  ],
  cards: [
    {
      id: 'me23-switchgear-engineering-aligns',
      ch: 1,
      front: 'What does switchgear engineering have to align?',
      back: 'Ratings, protection, busbars, mechanisms, arc controls, enclosures and digital interfaces.',
      explanation: 'Engineering capability and repeatable manufacturing are central because field failures can disrupt critical systems.',
      example: 'Panel, cable, transformer and power-electronics producers can upgrade through design ownership, process capability and configuration discipline.',
      terms: ['Switchgear', 'Configuration'],
      refs: [
        [1, 'Switchgear engineering aligns ratings, protection, busbars, mechanisms, arc controls, enclosures and digital interfaces.'],
        [1, 'Engineering capability and repeatable manufacturing are central because field failures can disrupt critical systems.'],
      ],
    },
    {
      id: 'me23-why-repeatable-manufacturing',
      ch: 2,
      front: 'Why are engineering capability and repeatable manufacturing central in this industry?',
      back: 'Because field failures can disrupt critical systems.',
      explanation: 'Production covers voltage, current, insulation, heat, mechanical strength, enclosure, controls, winding, wiring, assembly and customer-specific configuration.',
      example: 'A field failure in equipment that serves a critical system can disrupt that system.',
      terms: ['Repeatable manufacturing', 'Field failure'],
      refs: [
        [2, 'Engineering capability and repeatable manufacturing are central because field failures can disrupt critical systems.'],
        [2, 'voltage, current, insulation, heat, mechanical strength, enclosure, controls, winding, wiring, assembly and customer-specific configuration'],
      ],
    },
    {
      id: 'me23-fat-limits',
      ch: 3,
      front: 'What can FAT show for configured equipment, and what does it not replace?',
      back: 'It can demonstrate agreed factory tests for configured equipment, but it does not replace every conformity, site or lifecycle requirement.',
      explanation: 'FAT and SAT are not universal identical procedures; product certification, factory quality control and customer acceptance have different purposes.',
      example: 'A configured panel can undergo documented factory checks before shipment, then site tests after installation under the project scope.',
      terms: ['FAT', 'SAT', 'Release record'],
      refs: [
        [3, 'FAT can demonstrate agreed factory tests for configured equipment but does not replace every conformity, site or lifecycle requirement.'],
        [3, 'FAT and SAT are not universal identical procedures; product certification, factory quality control and customer acceptance have different purposes.'],
        [3, 'A configured panel can undergo documented factory checks before shipment, then site tests after installation under the project scope.'],
      ],
    },
  ],
});

const ME_M02_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m2-downstream-activities',
  title: 'Electrical Equipment Manufacturing: Downstream Activities',
  description: 'What product performance depends on after the factory, how commissioning is defined and when monitoring data is usable.',
  lessonId: 'me-m2-l4',
  lessonTitle: 'Downstream Activities',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m2-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Are Equipment Sales, Tenders and Project Deliveries Managed?', sourceTitle: 'How Are Equipment Sales, Tenders and Project Deliveries Managed?', citations: [] },
    { title: 'How Do Installation, SAT and Commissioning Interfaces Work?', sourceTitle: 'How Do Installation, SAT and Commissioning Interfaces Work?', citations: [] },
    { title: 'How Do Warranty, Maintenance and Lifecycle Services Create Value?', sourceTitle: 'How Do Warranty, Maintenance and Lifecycle Services Create Value?', citations: [] },
  ],
  cards: [
    {
      id: 'me24-performance-depends-on-delivery',
      ch: 1,
      front: 'What does product performance depend on beyond the product itself?',
      back: 'Correct selection, integration, installation and commissioning.',
      explanation: 'Routes from manufacturers to utilities, industrial users, contractors and buildings run through wholesalers, technical sales, EPCs and integrators.',
      example: 'A substation project coordinates equipment ratings, grounding, protection settings, communications, site tests and operational handover.',
      terms: ['Installation', 'Commissioning', 'System integration'],
      refs: [
        [1, 'Product performance depends on correct selection, integration, installation and commissioning.'],
        [1, 'routes from manufacturers to utilities, industrial users, contractors and buildings through wholesalers, technical sales, EPCs and integrators'],
        [1, 'A substation project coordinates equipment ratings, grounding, protection settings, communications, site tests and operational handover.'],
      ],
    },
    {
      id: 'me24-commissioning-definition',
      ch: 2,
      front: 'What is commissioning, as defined in this curriculum?',
      back: 'Verification that installed equipment and systems are configured and ready for intended operation.',
      explanation: 'Local distributors and EPCs can add value through application engineering, inventory, project coordination and accountable commissioning.',
      example: 'After installation, a team verifies that the system is configured and ready for its intended operation.',
      terms: ['Commissioning'],
      refs: [
        [2, 'Verification that installed equipment and systems are configured and ready for intended operation.'],
        [2, 'Local distributors and EPCs can add value through application engineering, inventory, project coordination and accountable commissioning.'],
      ],
    },
    {
      id: 'me24-condition-data-needs-thresholds',
      ch: 3,
      front: 'When can temperature and loading data support maintenance prioritization?',
      back: 'Only when alerts connect to validated thresholds and field action.',
      explanation: 'Lifecycle support creates recurring value and reduces customer downtime risk.',
      example: 'Temperature and loading data prioritize maintenance only when alerts connect to validated thresholds and field action.',
      terms: ['Condition monitoring', 'Maintenance prioritization'],
      refs: [
        [3, 'Temperature and loading data can support maintenance prioritization only when alerts connect to validated thresholds and field action.'],
        [3, 'Lifecycle support creates recurring value and reduces customer downtime risk.'],
      ],
    },
  ],
});

const ME_M02_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m2-inputs-outputs-and-value-creation',
  title: 'Electrical Equipment Manufacturing: Inputs, Outputs & Value Creation',
  description: 'What a drive system delivers and how cost drivers differ between cables and inverters.',
  lessonId: 'me-m2-l5',
  lessonTitle: 'Inputs, Outputs & Value Creation',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m2-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'What Resources Are Required to Manufacture Electrical Equipment?', sourceTitle: 'What Resources Are Required to Manufacture Electrical Equipment?', citations: [] },
    { title: 'Where Are Manufacturing Costs, Defects and Delivery Risks Generated?', sourceTitle: 'Where Are Manufacturing Costs, Defects and Delivery Risks Generated?', citations: [] },
    { title: 'How Do Engineering, Quality and Service Create Customer Value?', sourceTitle: 'How Do Engineering, Quality and Service Create Customer Value?', citations: [] },
  ],
  cards: [
    {
      id: 'me25-drive-system-output',
      ch: 1,
      front: 'What does a drive system deliver besides hardware?',
      back: 'Controlled motor performance, configuration evidence, training and support.',
      explanation: 'Output should be measured through reliability, losses, safety, delivery and customer uptime, not unit volume alone.',
      example: 'A buyer of a drive system judges the output by uptime and losses as well as by the units delivered.',
      terms: ['Drive system', 'Operational output'],
      refs: [
        [1, 'A drive system\u2019s output is not only hardware but controlled motor performance, configuration evidence, training and support.'],
        [1, 'Measure output through reliability, losses, safety, delivery and customer uptime\u2014not unit volume alone.'],
      ],
    },
    {
      id: 'me25-cable-vs-inverter-economics',
      ch: 2,
      front: 'How do cable economics differ from inverter economics?',
      back: 'Cable economics may be metal-sensitive, while inverter economics depend more on power devices, controls, thermal design and software.',
      explanation: 'Value capture depends on efficient conversion and differentiated lifecycle performance.',
      example: 'A cost review for a cable line looks first at metal exposure, while one for an inverter looks first at power devices, controls and thermal design.',
      terms: ['Cost drivers', 'Value capture'],
      refs: [
        [2, 'Cable economics may be metal-sensitive while inverter economics depend more on power devices, controls, thermal design and software.'],
        [2, 'Value capture depends on efficient conversion and differentiated lifecycle performance.'],
      ],
    },
  ],
});

const ME_M02_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m2-global-vs-local-value-chain',
  title: 'Electrical Equipment Manufacturing: Global vs. Local Value Chain',
  description: 'The trade-offs of global integration and how Vietnam can deepen value capture.',
  lessonId: 'me-m2-l6',
  lessonTitle: 'Global vs. Local Value Chain',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m2-l6',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'How Do Global Electrical Equipment Networks Operate?', sourceTitle: 'How Do Global Electrical Equipment Networks Operate?', citations: [] },
    { title: 'How Does Vietnam\'s Electrical Equipment Value Chain Work?', sourceTitle: 'How Does Vietnam\'s Electrical Equipment Value Chain Work?', citations: [] },
    { title: 'How Do Localization and Imported Technology Interact?', sourceTitle: 'How Do Localization and Imported Technology Interact?', citations: [] },
  ],
  cards: [
    {
      id: 'me26-global-integration-tradeoff',
      ch: 1,
      front: 'What does global integration provide, and what exposures does it create?',
      back: 'It provides scale and technology but creates concentration, logistics and currency exposure.',
      explanation: 'Suppliers should identify which capabilities are controlled globally and where local engineering, inventory and service reduce risk.',
      example: 'A multinational may use global designs and critical components while regional plants configure products and local teams commission them.',
      terms: ['Global sourcing', 'Regional production'],
      refs: [
        [1, 'Global integration provides scale and technology but creates concentration, logistics and currency exposure.'],
        [1, 'Suppliers should identify which capabilities are controlled globally and where local engineering, inventory and service reduce risk.'],
      ],
    },
    {
      id: 'me26-vietnam-deepen-value',
      ch: 2,
      front: 'How can Vietnam deepen value capture in the electrical-equipment value chain?',
      back: 'By progressing from supply and assembly toward qualified engineering and integration.',
      explanation: 'Upgrading requires quality systems, test capability, standards knowledge, delivery discipline and technology partnerships.',
      example: 'A panel builder can add design, protection coordination, traceability, factory testing, commissioning and monitoring integration.',
      terms: ['Upgrading', 'Panel building'],
      refs: [
        [2, 'Vietnam can deepen value capture by progressing from supply and assembly toward qualified engineering and integration.'],
        [2, 'Upgrading requires quality systems, test capability, standards knowledge, delivery discipline and technology partnerships.'],
      ],
    },
  ],
});

export const MFG_ELECTRICAL_M02_DECKS: FlashcardDeckContent[] = [ME_M02_L1_DECK, ME_M02_L2_DECK, ME_M02_L3_DECK, ME_M02_L4_DECK, ME_M02_L5_DECK, ME_M02_L6_DECK];
