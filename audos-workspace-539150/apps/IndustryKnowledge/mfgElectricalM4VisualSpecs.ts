import type { MfgElectricalChapterVisual } from './mfgElectricalVisualSpecs';

/** Chapter-specific Learning Visuals for Electrical & Energy Equipment Manufacturing Module 04 (competition, players and strategy), keyed by visualKind. */
export const MFG_ELECTRICAL_M4_VISUALS: Record<string, MfgElectricalChapterVisual> = {
  'mfg-electrical-m4-1': {
    heading: 'Technology-led grid markets and price-sensitive standard products compete in different ways',
    intro: 'Rivalry ranges from global technology-led grid and automation markets to price-sensitive standardized components, panels and local distribution. High-voltage systems reward references and engineering; standard wiring products emphasize cost, range and availability.',
    spec: {
      layout: 'compare', title: '01 How Competitive Is Electrical & Energy Equipment Manufacturing?', kicker: '',
      leftTitle: 'Technology-led grid and automation', rightTitle: 'Price-sensitive standardized products',
      rows: [
        { label: 'Typical rivals', a: 'Global groups', b: 'Regional suppliers and integrators' },
        { label: 'Example products', a: 'High-voltage systems', b: 'Standard wiring, components, panels' },
        { label: 'What wins', a: 'References, engineering and service', b: 'Cost, range and availability' },
        { label: 'Where it is fought', a: 'Global grid and automation markets', b: 'Local distribution' },
      ],
      note: 'In Vietnam, analyze global OEMs, domestic manufacturers, distributors, panel builders, EPCs and service firms by the product actually contested.',
      takeaway: 'There is no single competitive structure across all electrical equipment.',
    },
  },
  'mfg-electrical-m4-2': {
    heading: 'The five forces only make sense once the segment scope is fixed',
    intro: 'Rivalry differs between technology-led grid markets and standardized components, so the five forces must be applied to one defined segment. Specialists and component makers face different pressures from the same industry label.',
    spec: {
      layout: 'taxonomy', title: '02 How Do Porter\'s Five Forces Apply to Electrical Equipment?', kicker: '',
      root: 'Five forces in one defined segment', rootDetail: 'Set the segment scope first — forces differ by product',
      groups: [
        { label: 'Rivalry', detail: 'Global groups, specialists or regional suppliers, by segment' },
        { label: 'Threat of new entrants', detail: 'Lower in reference-driven high-voltage systems' },
        { label: 'Buyer power', detail: 'Stronger where cost, range and availability decide' },
        { label: 'Supplier power', detail: 'Depends on the components a segment relies on' },
        { label: 'Threat of substitutes', detail: 'Judged per application, not industry-wide' },
      ],
      note: 'High-voltage systems reward references, engineering and service while standard wiring products emphasize cost, range and availability.',
      takeaway: 'There is no single competitive structure across all electrical equipment, so apply the forces segment by segment.',
    },
  },
  'mfg-electrical-m4-3': {
    heading: 'Entry barriers come from technical depth, capital and earned customer trust',
    intro: 'Barriers arise from intellectual property, specialist equipment, certification, operating references, qualification, distribution and lifecycle support. A new high-voltage supplier needs design evidence, type tests, manufacturing consistency, references and field support.',
    spec: {
      layout: 'taxonomy', title: '03 What Creates Technical, Capital and Trust Barriers?', kicker: '',
      root: 'Barriers to entry', rootDetail: 'Three kinds — strongest where complexity and customer risk are high',
      groups: [
        { label: 'Technical barriers', detail: 'Know-how a rival must build', items: ['Engineering', 'Technology and IP'] },
        { label: 'Capital barriers', detail: 'Assets needed before the first order', items: ['Manufacturing investment', 'Specialist equipment'] },
        { label: 'Trust barriers', detail: 'Evidence buyers require', items: ['Testing', 'Qualification', 'Project references', 'Service'] },
      ],
      note: 'In Vietnam, focused entry through panels, components, integration or services can be more credible than immediate competition across broad portfolios.',
      takeaway: 'Technical complexity and customer risk strengthen barriers; standardized categories intensify price pressure.',
    },
  },
  'mfg-electrical-m4-4': {
    heading: 'Five diversified global groups, each described by its own portfolio focus',
    intro: 'Global firms combine electrification, automation, power distribution, controls, drives, digital systems, project access and service networks. Their strengths overlap but differ by product, application and geography.',
    spec: {
      layout: 'taxonomy', title: '04 Who Are the Major Global Electrical Equipment Manufacturers?', kicker: '',
      root: 'Diversified global groups', rootDetail: 'Listed alphabetically — not a ranking',
      groups: [
        { label: 'ABB', detail: 'Electrification portfolio' },
        { label: 'Eaton', detail: 'Electrical and industrial power management' },
        { label: 'Mitsubishi Electric', detail: 'Factory automation, drives and electrical systems' },
        { label: 'Schneider Electric', detail: 'Energy management, electrification and automation' },
        { label: 'Siemens', detail: 'Electrification and energy technology' },
        { label: 'Segment comparison', detail: 'Pick rivals per project type', items: ['Low-voltage building', 'Industrial drive', 'Utility grid'] },
      ],
      note: 'Portfolio context comes from each company’s official source. In Vietnam, compare authorized channels, local engineering, inventory, references, service and product fit rather than parent-company size alone.',
      takeaway: 'Diversified leaders overlap, but their strengths differ by product, application and geography.',
    },
  },
  'mfg-electrical-m4-5': {
    heading: 'Specialists win targeted applications through depth rather than breadth',
    intro: 'Cable systems, grid technology, transformers, high-voltage systems and critical-power infrastructure are served by focused international players. Power-cable and critical-power expertise are both valuable but not directly comparable.',
    spec: {
      layout: 'compare', title: '05 How Do Diversified Groups and Product Specialists Differ?', kicker: '',
      leftTitle: 'Diversified groups', rightTitle: 'Product specialists',
      rows: [
        { label: 'Portfolio', a: 'Many product lines and applications', b: 'Focused: cables, grid technology, transformers' },
        { label: 'Source of lead', a: 'Breadth and coverage across segments', b: 'Technical depth and project execution' },
        { label: 'Examples named', a: 'Not profiled in this chapter', b: 'Prysmian, NKT (power cable); Hitachi Energy (grid)' },
        { label: 'Fair comparison', a: 'Only within the contested segment', b: 'Not across unrelated specialties' },
      ],
      note: 'Specialist opportunities depend on project pipelines, specification access, installation partners and local lifecycle support.',
      takeaway: 'Specialists can lead targeted applications through technical depth and project execution.',
    },
  },
  'mfg-electrical-m4-6': {
    heading: 'Specialist opportunity in Vietnam depends on pipelines, specification access, partners and support',
    intro: 'Focused international players serve cable systems, high-voltage systems and critical-power infrastructure. Whether a specialist can participate in Vietnam depends on local project and support conditions.',
    spec: {
      layout: 'driverTree', title: '06 Which Manufacturers and Participants Shape Vietnam\'s Market?', kicker: '',
      root: { label: 'Specialist opportunity in Vietnam', detail: 'Specialization only pays where these hold' },
      drivers: [
        { label: 'Project pipelines', detail: 'Real projects needing the specialty', children: [{ label: 'Cable systems' }, { label: 'Critical power' }] },
        { label: 'Specification access', detail: 'Being written into project requirements' },
        { label: 'Installation partners', detail: 'Local firms able to install the system' },
        { label: 'Local lifecycle support', detail: 'Service after commissioning' },
      ],
      note: 'Nexans (cable and electrification) and Vertiv (critical digital infrastructure and power) illustrate specialization; the chapter does not size their position in Vietnam.',
      takeaway: 'Specialists can lead targeted applications through technical depth and project execution.',
    },
  },
  'mfg-electrical-m4-7': {
    heading: 'Benchmark only when applications and ratings are compatible',
    intro: 'Manufacturers are compared on technical capacity, efficiency, durability, test evidence, field reliability and service response. A low-voltage breaker company and a subsea high-voltage cable supplier do not belong on one universal scorecard.',
    spec: {
      layout: 'decision', title: '07 How Should Electrical Equipment Manufacturers Be Compared?', kicker: '',
      root: { label: 'Two manufacturers to compare', detail: 'Before any scorecard' },
      question: 'Do their products serve compatible applications and ratings?',
      branches: [
        { condition: 'Yes — same application and rating', outcome: 'Benchmark performance, reliability, lead time', tone: 'positive' },
        { condition: 'Partly — ranges overlap', outcome: 'Compare only the overlapping products', tone: 'caution' },
        { condition: 'No — e.g. breaker vs subsea cable', outcome: 'Do not use one universal scorecard', tone: 'negative' },
      ],
      note: 'In Vietnam, use application tests, acceptance criteria, local references, delivery evidence and verified service capability.',
      takeaway: 'Benchmark only products serving compatible applications and ratings.',
    },
  },
  'mfg-electrical-m4-8': {
    heading: 'Each capability needs its own evidence when competitors are benchmarked',
    intro: 'Benchmarks examine technical capacity, efficiency, durability, protection, digital functions, test evidence, process consistency, field reliability and service response. Engineering, manufacturing and service each leave different evidence.',
    spec: {
      layout: 'table', title: '08 How Do Product, Engineering, Quality and Factory Capabilities Differ?', kicker: '',
      headers: ['Capability', 'What to examine', 'Evidence to ask for'],
      rows: [
        { label: 'Product', a: 'Efficiency, durability, protection, digital functions', b: 'Application tests' },
        { label: 'Engineering', a: 'Technical capacity for the application', b: 'Acceptance criteria met' },
        { label: 'Quality', a: 'Test evidence', b: 'Test reports for the rating' },
        { label: 'Manufacturing', a: 'Process consistency', b: 'Delivery evidence' },
        { label: 'Service', a: 'Field reliability and service response', b: 'Local references, verified service' },
      ],
      note: 'Do not compare a low-voltage breaker company and subsea high-voltage cable supplier on one universal scorecard.',
      takeaway: 'Benchmark only products serving compatible applications and ratings.',
    },
  },
  'mfg-electrical-m4-9': {
    heading: 'A higher-priced supplier can still win on lifecycle value',
    intro: 'Commercial advantage covers purchase and ownership cost, geographic reach, authorized inventory, EPC relationships, references, warranties, spares and technicians. A higher-priced supplier may reduce project and downtime risk through stocked parts and proven local response.',
    spec: {
      layout: 'compare', title: '09 Which Commercial and Lifecycle Capabilities Create Advantage?', kicker: '',
      leftTitle: 'Competing on purchase price', rightTitle: 'Competing on lifecycle value',
      rows: [
        { label: 'Pricing', a: 'Lowest upfront price', b: 'Purchase plus ownership cost' },
        { label: 'Distribution', a: 'Reach where volume is', b: 'Authorized inventory and geographic reach' },
        { label: 'Project access', a: 'Bid when invited', b: 'Consultant and EPC relationships' },
        { label: 'Brand references', a: 'Few proven installations', b: 'References that lower buyer risk' },
        { label: 'Local support', a: 'Limited spares and technicians', b: 'Stocked parts and proven response' },
        { label: 'Lifecycle value', a: 'Downtime risk stays with buyer', b: 'Lower project and downtime risk' },
      ],
      note: 'In Vietnam, benchmark genuine-product controls, Vietnamese documentation, training, project execution and warranty accountability.',
      takeaway: 'Commercial advantage combines price, access, technical trust and support.',
    },
  },
  'mfg-electrical-m4-10': {
    heading: 'Reliability rests on engineering fit, compliance evidence and interoperable interfaces',
    intro: 'Success depends on design fit, process consistency, applicable standards, traceability, connected features and support from selection through operation. In mission-critical applications these are foundations, not extras.',
    spec: {
      layout: 'driverTree', title: '10 Why Do Engineering, Reliability and Compliance Matter?', kicker: '',
      root: { label: 'Technical credibility', detail: 'Reliable in mission-critical use' },
      drivers: [
        { label: 'Engineering', detail: 'Equipment fits the application', children: [{ label: 'Design fit' }, { label: 'Process consistency' }] },
        { label: 'Compliance', detail: 'Evidence the product meets requirements', children: [{ label: 'Applicable standards' }, { label: 'Traceability' }] },
        { label: 'Interoperability', detail: 'Exchanges information through defined interfaces', children: [{ label: 'Connected features' }, { label: 'Cybersecurity' }] },
      ],
      note: 'Digital monitoring adds little value if sensors, communications, cybersecurity, alarms and maintenance workflows are unreliable.',
      takeaway: 'Reliability and technical credibility are foundational in mission-critical applications.',
    },
  },
  'mfg-electrical-m4-11': {
    heading: 'Quality, innovation and technical support build credibility from selection through operation',
    intro: 'Customer support runs from selection through operation, backed by quality systems, laboratories and documentation. Connected innovation only adds value when the systems around it are reliable.',
    spec: {
      layout: 'flow', title: '11 How Do Procurement, Productivity and Quality Create Advantage?', kicker: '',
      steps: [
        { label: 'Selection', detail: 'Customer application engineering', owner: 'Technical support' },
        { label: 'Production', detail: 'Process consistency and quality systems', owner: 'Quality' },
        { label: 'Testing and documentation', detail: 'Laboratories and traceable records', owner: 'Quality' },
        { label: 'Connected operation', detail: 'Monitoring that alarms and workflows can act on', owner: 'Innovation' },
        { label: 'Trusted in operation', detail: 'Credibility in mission-critical use', kind: 'outcome' },
      ],
      note: 'In Vietnam, invest in laboratories, quality systems, documentation, skills and customer application engineering.',
      takeaway: 'Reliability and technical credibility are foundational in mission-critical applications.',
    },
  },
  'mfg-electrical-m4-12': {
    heading: 'Durable growth combines efficient operations, customer access and lifecycle support',
    intro: 'Growth draws on yield, utilization, inventory, logistics, distributor coverage, field technicians, spares, upgrades, training and partners. Efficient production protects price while service and training support repeat purchases.',
    spec: {
      layout: 'driverTree', title: '12 How Do Customer Relationships, Distribution and Service Support Growth?', kicker: '',
      root: { label: 'Durable growth', detail: 'Repeat purchases and specification preference' },
      drivers: [
        { label: 'Efficient operations', detail: 'Protects price competitiveness', children: [{ label: 'Lean operations', detail: 'Yield and utilization' }, { label: 'Procurement', detail: 'Inventory and logistics' }] },
        { label: 'Customer access', detail: 'Reach buyers and specifiers', children: [{ label: 'Channels', detail: 'Distributor coverage' }, { label: 'Partnerships', detail: 'Strategic partners' }] },
        { label: 'Lifecycle support', detail: 'Keeps customers coming back', children: [{ label: 'Service infrastructure', detail: 'Field technicians and spares' }, { label: 'Retention', detail: 'Upgrades and training' }] },
      ],
      note: 'Local responsiveness can be an advantage when supported by documented quality and dependable execution.',
      takeaway: 'Durable competitors combine efficient operations with customer access and lifecycle support.',
    },
  },
  'mfg-electrical-m4-13': {
    heading: 'Essential demand is the strength; capital intensity and supply risk are the weaknesses',
    intro: 'The industry’s strengths lie in essential infrastructure and installed bases; its weaknesses lie in capital and complexity. Structural demand is attractive, but profitable execution is demanding.',
    spec: {
      layout: 'compare', title: '13 What Are the Industry\'s Main Strengths and Weaknesses?', kicker: '',
      leftTitle: 'Strengths', rightTitle: 'Weaknesses',
      rows: [
        { label: 'Demand', a: 'Essential infrastructure demand', b: 'Execution is technically demanding' },
        { label: 'Installed base', a: 'Large installed bases to serve', b: 'Complex systems to support' },
        { label: 'Capital', a: 'Electrification demand is structural', b: 'Capital intensity strains finances' },
        { label: 'Supply', a: 'Local supply-chain participation', b: 'Supply risk from volatility and disruption' },
        { label: 'Vietnam', a: 'Local demand creates opportunity', b: 'Capability depth and bankability constrain' },
      ],
      note: 'Digital and storage growth increases software, semiconductor, cybersecurity and talent requirements.',
      takeaway: 'Structural electrification demand is attractive, but profitable execution is technically and financially demanding.',
    },
  },
  'mfg-electrical-m4-14': {
    heading: 'Each opportunity in grids, storage and digital service brings its own threat or requirement',
    intro: 'Opportunities lie in grids, storage and digital service; threats come from volatility and disruption. Digital and storage growth also raises software, semiconductor, cybersecurity and talent requirements.',
    spec: {
      layout: 'table', title: '14 What Opportunities and Threats Shape Electrical Equipment?', kicker: '',
      headers: ['Area', 'Opportunity', 'Threat or requirement'],
      rows: [
        { label: 'Grid opportunity', a: 'Grid expansion and modernization', b: 'Capital and delivery complexity' },
        { label: 'Storage', a: 'Storage growth', b: 'Semiconductor and software needs' },
        { label: 'Digital service', a: 'Digital service growth', b: 'Cybersecurity and talent needs' },
        { label: 'Technology shifts', a: 'New digital and storage offers', b: 'Disruption of existing positions' },
        { label: 'Technical barriers', a: 'Reward capability depth', b: 'Raise the bar for new suppliers' },
      ],
      note: 'In Vietnam, local demand and supply-chain participation create opportunity, but capability depth and project bankability constrain outcomes.',
      takeaway: 'Structural electrification demand is attractive, but profitable execution is technically and financially demanding.',
    },
  },
  'mfg-electrical-m4-15': {
    heading: 'Six strategic risks, where they arise and the control that answers each',
    intro: 'Risks span materials, scope changes, schedules, working capital, currencies, software support, standards, cybersecurity and skilled labor. A fixed-price project can lose margin through metal escalation, design change, delayed acceptance and payment slippage.',
    spec: {
      layout: 'table', title: '15 What Strategic Choices Must Manufacturers Make?', kicker: '',
      headers: ['Risk', 'Where it arises', 'Control'],
      rows: [
        { label: 'Supply risk', a: 'Materials, components, metal escalation', b: 'Qualified alternatives' },
        { label: 'Project risk', a: 'Scope changes, schedules, delayed acceptance', b: 'Contract controls' },
        { label: 'Technology risk', a: 'Software support', b: 'Post-installation accountability' },
        { label: 'Financial risk', a: 'Working capital, currencies, payment slippage', b: 'Cash scenarios' },
        { label: 'Compliance risk', a: 'Standards and cybersecurity', b: 'Test gates' },
        { label: 'Capability risk', a: 'Skilled labor', b: 'Workforce plans' },
      ],
      note: 'The controls only work together: engineering, procurement, finance and service must share one governance view.',
      takeaway: 'Resilience requires integrated governance across engineering, procurement, finance and service.',
    },
  },
};
