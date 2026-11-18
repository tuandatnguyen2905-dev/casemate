// Pinned-ID authored flashcard decks: Electrical Equipment Manufacturing, Module 03 (apps/IndustryKnowledge/mfgElectricalModule03.tsx).
// Excerpts are checked against the rendered chapter text, not the raw source file.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const COMMON = {
  industryId: 'mfg-electrical',
  industryLabel: 'Electrical Equipment Manufacturing',
  moduleId: 'me-m03',
  moduleLabel: 'Module 03',
  moduleKey: 'MFG_ELECTRICAL_MODULE03',
  file: 'apps/IndustryKnowledge/mfgElectricalModule03.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const ME_M03_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m3-industry-business-models',
  title: 'Electrical Equipment Manufacturing: Industry Business Models',
  description: 'How breaker and transformer business models differ and what service models add in obligations.',
  lessonId: 'me-m3-l1',
  lessonTitle: 'Industry Business Models',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m3-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'How Do Electrical Equipment Manufacturers Make Money?', sourceTitle: 'How Do Electrical Equipment Manufacturers Make Money?', citations: [] },
    { title: 'How Do OEM, Own-Brand and Component Models Differ?', sourceTitle: 'How Do OEM, Own-Brand and Component Models Differ?', citations: [] },
    { title: 'How Do Make-to-Stock, Build-to-Order and Engineering-to-Order Compare?', sourceTitle: 'How Do Make-to-Stock, Build-to-Order and Engineering-to-Order Compare?', citations: [] },
  ],
  cards: [
    {
      id: 'me31-breaker-vs-transformer-models',
      ch: 1,
      front: 'How does a breaker producer\u2019s business model differ from a transformer supplier\u2019s?',
      back: 'A breaker producer uses repeatable platforms and distributor scale; a transformer supplier adds application engineering and project testing.',
      explanation: 'Product sales remain foundational, but reliability, compliance, range and engineering determine differentiation.',
      example: 'Local manufacturers can combine standardized components with configured panels, enclosures, cables and selected equipment.',
      terms: ['Product sales', 'Application engineering'],
      refs: [
        [1, 'A breaker producer uses repeatable platforms and distributor scale; a transformer supplier adds application engineering and project testing.'],
        [1, 'Product sales remain foundational, but reliability, compliance, range and engineering determine differentiation.'],
      ],
    },
    {
      id: 'me31-solutions-add-obligations',
      ch: 3,
      front: 'What do solution and service models offer a manufacturer, and what do they add in obligations?',
      back: 'They can deepen relationships but add delivery and performance obligations.',
      explanation: 'Service-led growth needs trained teams, spares, response commitments, data governance and clear contract boundaries.',
      example: 'A supplier packages switchgear, protection, controls, commissioning and maintenance rather than selling devices separately.',
      terms: ['Integrated solutions', 'Maintenance contracts'],
      refs: [
        [3, 'Solutions and services can deepen relationships but add delivery and performance obligations.'],
        [3, 'Service-led growth needs trained teams, spares, response commitments, data governance and clear contract boundaries.'],
        [3, 'A supplier packages switchgear, protection, controls, commissioning and maintenance rather than selling devices separately.'],
      ],
    },
  ],
});

const ME_M03_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m3-products-services-and-segmentation',
  title: 'Electrical Equipment Manufacturing: Products, Services & Segmentation',
  description: 'How segments differ, along which dimensions products are segmented and how lifecycle services help customers.',
  lessonId: 'me-m3-l2',
  lessonTitle: 'Products, Services & Segmentation',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m3-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Are Electrical Equipment Products Segmented?', sourceTitle: 'How Are Electrical Equipment Products Segmented?', citations: [] },
    { title: 'How Do Voltage, Capacity, Specification and Customization Affect Products?', sourceTitle: 'How Do Voltage, Capacity, Specification and Customization Affect Products?', citations: [] },
    { title: 'How Do Lifecycle Services and Integrated Solutions Differ From Product Sales?', sourceTitle: 'How Do Lifecycle Services and Integrated Solutions Differ From Product Sales?', citations: [] },
  ],
  cards: [
    {
      id: 'me32-low-voltage-vs-high-voltage',
      ch: 1,
      front: 'How do a low-voltage breaker and a high-voltage cable differ in how they are sold and supported?',
      back: 'They serve different applications, qualification routes, sales cycles and service risks.',
      explanation: 'Technical barriers, buying processes and economics differ substantially by segment.',
      example: 'A category is sized using compatible ratings, standards, customers and channels rather than a broad sector total.',
      terms: ['Low voltage', 'High voltage', 'Segmentation'],
      refs: [
        [1, 'A low-voltage breaker and high-voltage cable serve different applications, qualification routes, sales cycles and service risks.'],
        [1, 'Technical barriers, buying processes and economics differ substantially by segment.'],
        [1, 'Size each category using compatible ratings, standards, customers and channels rather than a broad sector total.'],
      ],
    },
    {
      id: 'me32-segmentation-dimensions',
      ch: 2,
      front: 'Along which dimensions does the chapter segment electrical-equipment products?',
      back: 'By function, voltage, application, technology and project complexity.',
      explanation: 'Segments span components, grid equipment, drives, power conversion, storage interfaces and UPS.',
      example: 'A category such as drives is sized with compatible ratings, standards, customers and channels rather than a broad sector total.',
      terms: ['Product segment', 'Project complexity'],
      refs: [
        [2, 'segmentation by function, voltage, application, technology and project complexity across components, grid equipment, drives, power conversion, storage interfaces and UPS'],
        [2, 'Size each category using compatible ratings, standards, customers and channels rather than a broad sector total.'],
      ],
    },
    {
      id: 'me32-relay-replacement',
      ch: 3,
      front: 'How can replacing an aging protection relay help a customer?',
      back: 'It can extend an asset\u2019s useful life and improve monitoring without replacing the full system.',
      explanation: 'Lifecycle services create recurring revenue when delivery quality is repeatable and trusted.',
      example: 'Replacing an aging protection relay improves monitoring without replacing the full system.',
      terms: ['Modernization', 'Asset life'],
      refs: [
        [3, 'Replacing an aging protection relay can extend an asset\u2019s useful life while improving monitoring without replacing the full system.'],
        [3, 'Lifecycle services create recurring revenue when delivery quality is repeatable and trusted.'],
      ],
    },
  ],
});

const ME_M03_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m3-customer-segments-and-needs',
  title: 'Electrical Equipment Manufacturing: Customer Segments & Needs',
  description: 'How renewable projects buy as a system and how customer priorities differ by application.',
  lessonId: 'me-m3-l3',
  lessonTitle: 'Customer Segments & Needs',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m3-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it displays only the lesson\u2019s shared base text and a dimension list, with nothing chapter-specific to ground a card on.',
  ],
  chapters: [
    { title: 'Who Purchases Electrical and Energy Equipment?', sourceTitle: 'Who Purchases Electrical and Energy Equipment?', citations: [] },
    { title: 'How Do Utility, Industrial, EPC and Developer Requirements Differ?', sourceTitle: 'How Do Utility, Industrial, EPC and Developer Requirements Differ?', citations: [] },
    { title: 'How Do Reliability, Compliance, Lead Time and TCO Shape Purchasing?', sourceTitle: 'How Do Reliability, Compliance, Lead Time and TCO Shape Purchasing?', citations: [] },
  ],
  cards: [
    {
      id: 'me33-renewable-project-as-system',
      ch: 1,
      front: 'How does a renewable project evaluate its electrical equipment?',
      back: 'As a system: inverters, transformers, switchgear, protection, controls, warranties and grid-code integration are evaluated together.',
      explanation: 'Utilities and developers prioritize safety, proven performance and lifecycle support over price alone.',
      example: 'Even a promising PDP8 opportunity still depends on tender timing, bankability, permitting, technical specifications and grid readiness.',
      terms: ['Grid connection', 'Bankability'],
      refs: [
        [1, 'A renewable project evaluates inverters, transformers, switchgear, protection, controls, warranties and grid-code integration as a system.'],
        [1, 'Utilities and developers prioritize safety, proven performance and lifecycle support over price alone.'],
        [1, 'PDP8 opportunities still depend on tender timing, bankability, permitting, technical specifications and grid readiness.'],
      ],
    },
    {
      id: 'me33-data-center-vs-contractor',
      ch: 2,
      front: 'How do a data center\u2019s priorities differ from a contractor\u2019s?',
      back: 'A data center emphasizes redundancy and power quality; a contractor emphasizes availability, documentation and installation efficiency.',
      explanation: 'Reliability, safety, compatibility and ownership cost are common, but priorities vary by application.',
      example: 'A supplier tailors product tiers, inventory, channels, training and service to industrial regions, commercial projects and installer networks.',
      terms: ['Critical power', 'Installer needs'],
      refs: [
        [2, 'A data center emphasizes redundancy and power quality; a contractor emphasizes availability, documentation and installation efficiency.'],
        [2, 'Reliability, safety, compatibility and ownership cost are common, but priorities vary by application.'],
        [2, 'Tailor product tiers, inventory, channels, training and service to industrial regions, commercial projects and installer networks.'],
      ],
    },
  ],
});

const ME_M03_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m3-revenue-streams-and-cost-structure',
  title: 'Electrical Equipment Manufacturing: Revenue Streams & Cost Structure',
  description: 'HYPOTHETICAL worked calculations for contribution, fixed cost per unit and copper pass-through, plus the OEE definition.',
  lessonId: 'me-m3-l4',
  lessonTitle: 'Revenue Streams & Cost Structure',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m3-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Do Electrical Equipment Manufacturers Generate Revenue?', sourceTitle: 'How Do Electrical Equipment Manufacturers Generate Revenue?', citations: [] },
    { title: 'What Determines Manufacturing and Product-Lifecycle Costs?', sourceTitle: 'What Determines Manufacturing and Product-Lifecycle Costs?', citations: [] },
    { title: 'Which KPIs Drive Electrical Equipment Profitability?', sourceTitle: 'Which KPIs Drive Electrical Equipment Profitability?', citations: [] },
  ],
  cards: [
    {
      id: 'me34-calc-contribution-margin',
      ch: 1,
      front: 'HYPOTHETICAL: equipment sells for USD1,000 with USD520 BOM, USD120 labor, USD100 factory overhead, USD30 testing and USD20 logistics. What are the contribution and the margin?',
      back: 'Defined cost is 520+120+100+30+20 = USD790, so contribution is 1,000 \u2212 790 = USD210, a margin of 21 percent.',
      explanation: 'Order value, backlog, billing, revenue and cash remain separate, and hypothetical values are not actual equipment prices or margins.',
      example: 'In this HYPOTHETICAL case, a USD1,000 sale leaves USD210 after the defined cost of USD790.',
      terms: ['Contribution', 'Margin', 'BOM'],
      refs: [
        [1, 'HYPOTHETICAL calculation: defined cost=520+120+100+30+20=USD790; contribution=1,000\u2212790=USD210; margin=21%.'],
        [1, 'Equipment sold for USD1,000 with USD520 BOM, USD120 labor, USD100 factory overhead, USD30 testing and USD20 logistics generates USD210 contribution, or 21%.'],
        [1, 'Order value, backlog, billing, revenue and cash remain separate.'],
      ],
    },
    {
      id: 'me34-calc-fixed-cost-per-unit',
      ch: 2,
      front: 'HYPOTHETICAL: USD300,000 of fixed factory cost is spread over 1,000 units, then over 1,500 units. What is the fixed cost per unit in each case?',
      back: '300,000 / 1,000 = USD300 per unit, and 300,000 / 1,500 = USD200 per unit, assuming capacity, mix and quality remain feasible.',
      explanation: 'Higher utilization can lower fixed cost per unit but can also create congestion or quality loss.',
      example: 'In this HYPOTHETICAL case, spreading the same fixed cost over more units lowers the cost per unit from USD300 to USD200.',
      terms: ['Fixed cost', 'Utilization'],
      refs: [
        [2, 'HYPOTHETICAL calculation: 300,000/1,000=300; 300,000/1,500=200.'],
        [2, 'USD300,000 fixed factory cost spread over 1,000 units is USD300 per unit; at 1,500 units it is USD200, assuming capacity, mix and quality remain feasible.'],
        [2, 'Higher utilization can lower fixed cost per unit but can also create congestion or quality loss.'],
      ],
    },
    {
      id: 'me34-calc-copper-pass-through',
      ch: 3,
      front: 'HYPOTHETICAL: copper in a unit costs USD200 and rises 10 percent, the selling price is fixed and gross profit is USD300. What is gross profit with no pass-through, and with USD10 passed through?',
      back: 'The cost rises by 200 \u00d7 10 percent = USD20, so gross profit falls to 300 \u2212 20 = USD280. Passing USD10 through price leaves 300 \u2212 20 + 10 = USD290.',
      explanation: 'Gross profit falls only by the part of the cost increase that is not passed through.',
      example: 'In this HYPOTHETICAL case, passing through half of the USD20 increase leaves USD290 of gross profit.',
      terms: ['Gross profit', 'Pass-through'],
      refs: [
        [3, 'HYPOTHETICAL calculation: copper increase=200\u00d710%=20; no pass-through GP=300\u221220=280; half pass-through GP=300\u221220+10=290.'],
        [3, 'If copper in a unit costs USD200 and rises 10%, cost increases USD20.'],
      ],
    },
    {
      id: 'me34-oee-definition',
      ch: 3,
      front: 'How does this curriculum define OEE, and where is it most useful?',
      back: 'OEE (Overall Equipment Effectiveness) is Availability multiplied by Performance multiplied by Quality under defined rules, and it is most useful for suitable equipment or lines.',
      explanation: 'It is not a universal score for every engineering-to-order manufacturer.',
      example: 'A manufacturer defines numerator, denominator, product mix, standard time, quality gate and cost scope before benchmarking factories.',
      terms: ['OEE', 'Availability', 'Quality'],
      refs: [
        [3, 'Overall Equipment Effectiveness: Availability multiplied by Performance multiplied by Quality under defined rules.'],
        [3, 'OEE=Availability\u00d7Performance\u00d7Quality under defined rules and is most useful for suitable equipment or lines; it is not a universal score for every engineering-to-order manufacturer.'],
        [3, 'Define numerator, denominator, product mix, standard time, quality gate and cost scope before benchmarking factories.'],
      ],
    },
  ],
});

const ME_M03_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m3-distribution-and-sales-channels',
  title: 'Electrical Equipment Manufacturing: Distribution & Sales Channels',
  description: 'Which products go direct or through distributors, what strong coverage combines and how digital channels connect to technical support.',
  lessonId: 'me-m3-l5',
  lessonTitle: 'Distribution & Sales Channels',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m3-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'How Do Manufacturers Acquire Customers and Projects?', sourceTitle: 'How Do Manufacturers Acquire Customers and Projects?', citations: [] },
    { title: 'How Do Distributors, OEM Agreements, EPCs and Tenders Work?', sourceTitle: 'How Do Distributors, OEM Agreements, EPCs and Tenders Work?', citations: [] },
    { title: 'How Do Technical Sales and Long-Term Service Relationships Support Growth?', sourceTitle: 'How Do Technical Sales and Long-Term Service Relationships Support Growth?', citations: [] },
  ],
  cards: [
    {
      id: 'me35-direct-vs-distributor',
      ch: 1,
      front: 'Which products may a manufacturer sell directly, and which may flow through authorized distributors?',
      back: 'A manufacturer may sell transformers directly while cables, breakers and wiring products flow through authorized distributors.',
      explanation: 'The right channel matches technical complexity, purchase frequency and customer concentration.',
      example: 'Direct utility and industrial sales sit alongside wholesale access for standardized products and local support through dealers.',
      terms: ['Direct sales', 'Authorized distributors'],
      refs: [
        [1, 'A manufacturer may sell transformers directly while cables, breakers and wiring products flow through authorized distributors.'],
        [1, 'The right channel matches technical complexity, purchase frequency and customer concentration.'],
        [1, 'direct utility and industrial sales, wholesale access for standardized products, project specification through EPCs and local support through dealers'],
      ],
    },
    {
      id: 'me35-strong-coverage-combines',
      ch: 2,
      front: 'What does strong channel coverage combine in Vietnam?',
      back: 'Specification influence, reliable inventory, project relationships and accountable warranty support.',
      explanation: 'A manufacturer\u2019s channel choice should match technical complexity, purchase frequency and customer concentration.',
      example: 'A distributor with reliable inventory and accountable warranty support strengthens coverage.',
      terms: ['Channel coverage', 'Distributor network'],
      refs: [
        [2, 'Strong coverage combines specification influence, reliable inventory, project relationships and accountable warranty support.'],
        [2, 'The right channel matches technical complexity, purchase frequency and customer concentration.'],
      ],
    },
    {
      id: 'me35-digital-channel-handoff',
      ch: 3,
      front: 'How does an engineer use a digital channel to order equipment without losing technical support?',
      back: 'The engineer configures ratings online, validates the application with technical sales and routes fulfillment through local inventory.',
      explanation: 'Digital channels work best when connected to accurate data, fulfillment and human technical support.',
      example: 'A digital channel for Vietnam includes technical content in Vietnamese, genuine-product verification, regional stock visibility and service booking.',
      terms: ['Digital catalogue', 'Technical handoff'],
      refs: [
        [3, 'An engineer configures ratings online, validates the application with technical sales and routes fulfillment through local inventory.'],
        [3, 'Digital channels work best when connected to accurate data, fulfillment and human technical support.'],
        [3, 'Build Vietnamese technical content, genuine-product verification, regional stock visibility and service booking into digital channels.'],
      ],
    },
  ],
});

const ME_M03_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'mfg-electrical-m3-industry-ecosystem-and-stakeholders',
  title: 'Electrical Equipment Manufacturing: Industry Ecosystem & Stakeholders',
  description: 'What a grid project must align across the ecosystem, where capability gaps arise and what partnerships include.',
  lessonId: 'me-m3-l6',
  lessonTitle: 'Industry Ecosystem & Stakeholders',
  startMarker: '',
  endMarker: '',
  chapterIdPrefix: 'me-m3-l6',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    { title: 'Who Participates in the Electrical Equipment Ecosystem?', sourceTitle: 'Who Participates in the Electrical Equipment Ecosystem?', citations: [] },
    { title: 'How Do Manufacturers, Suppliers, EPCs, Utilities and Test Bodies Collaborate?', sourceTitle: 'How Do Manufacturers, Suppliers, EPCs, Utilities and Test Bodies Collaborate?', citations: [] },
    { title: 'How Do Standards, Regulators, Technology and Service Partners Shape Delivery?', sourceTitle: 'How Do Standards, Regulators, Technology and Service Partners Shape Delivery?', citations: [] },
  ],
  cards: [
    {
      id: 'me36-grid-project-alignment',
      ch: 1,
      front: 'What must a grid project align across the participants of its ecosystem?',
      back: 'Specifications, tests, construction, protection settings, communications and operational acceptance.',
      explanation: 'System performance depends on the wider ecosystem, not one manufacturer alone.',
      example: 'The ecosystem spans materials, components, equipment brands, engineering firms, contractors, developers, users, service providers, standards organizations and regulators.',
      terms: ['Ecosystem', 'Operational acceptance'],
      refs: [
        [1, 'A grid project requires aligned specifications, tests, construction, protection settings, communications and operational acceptance.'],
        [1, 'System performance depends on the wider ecosystem, not one manufacturer alone.'],
      ],
    },
    {
      id: 'me36-capability-gaps',
      ch: 2,
      front: 'At which stages can capability gaps arise in Vietnam\u2019s electrical-equipment ecosystem?',
      back: 'At design, procurement, installation, laboratory, commissioning or service stages.',
      explanation: 'System performance depends on the wider ecosystem, not one manufacturer alone.',
      example: 'A gap at the laboratory or commissioning stage can limit delivery even when design and procurement are in place.',
      terms: ['Capability gap', 'Testing bodies'],
      refs: [
        [2, 'Capability gaps can arise at design, procurement, installation, laboratory, commissioning or service stages.'],
        [2, 'System performance depends on the wider ecosystem, not one manufacturer alone.'],
      ],
    },
    {
      id: 'me36-partnership-pairing',
      ch: 3,
      front: 'How can an international power-electronics provider pair with local participants, and what should the partnership include?',
      back: 'It can pair technology with local enclosures, integration, installation and service. The partnership should include knowledge transfer, quality governance, testing, workforce development and commercial responsibility.',
      explanation: 'Partnerships combine complementary capabilities without requiring every firm to build everything internally.',
      example: 'A local firm supplies enclosures and installation while the international provider supplies the power-electronics technology.',
      terms: ['Technology partners', 'Knowledge transfer'],
      refs: [
        [3, 'An international power-electronics provider can pair technology with local enclosures, integration, installation and service.'],
        [3, 'Partnerships should include knowledge transfer, quality governance, testing, workforce development and commercial responsibility.'],
        [3, 'Partnerships combine complementary capabilities without requiring every firm to build everything internally.'],
      ],
    },
  ],
});

export const MFG_ELECTRICAL_M03_DECKS: FlashcardDeckContent[] = [ME_M03_L1_DECK, ME_M03_L2_DECK, ME_M03_L3_DECK, ME_M03_L4_DECK, ME_M03_L5_DECK, ME_M03_L6_DECK];
