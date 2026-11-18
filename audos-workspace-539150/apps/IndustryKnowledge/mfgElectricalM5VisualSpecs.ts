import type { MfgElectricalChapterVisual } from './mfgElectricalVisualSpecs';

/** Chapter-specific Learning Visuals for Electrical & Energy Equipment Manufacturing Module 05 (trends and growth outlook), keyed by visualKind. */
export const MFG_ELECTRICAL_M5_VISUALS: Record<string, MfgElectricalChapterVisual> = {
  'mfg-electrical-m5-1': {
    heading: 'Buyers are shifting from hardware price to lifecycle operating value',
    intro: 'Utility, industrial, commercial and infrastructure buyers increasingly procure on losses, uptime, safety, service life, maintenance and support. A critical facility can justify premium equipment when lower failure risk and faster service protect operations.',
    spec: {
      layout: 'compare', title: '01 How Are Utility and Industrial Customer Requirements Changing?', kicker: '',
      leftTitle: 'Buying electrical hardware', rightTitle: 'Buying lifecycle operating value',
      rows: [
        { label: 'Cost basis', a: 'Purchase price', b: 'Total cost of ownership' },
        { label: 'Energy losses', a: 'Outside the comparison', b: 'Counted over the service life' },
        { label: 'Service response', a: 'Considered after purchase', b: 'Faster service protects operations' },
        { label: 'Premium equipment', a: 'Hard to justify', b: 'Justified by lower failure risk' },
      ],
      note: 'Total cost of ownership covers acquisition, installation, losses, operation, maintenance, downtime, financing and end-of-life cost. Suppliers should document efficiency, warranty, maintenance assumptions, parts access and response coverage.',
      takeaway: 'Customers increasingly buy lifecycle reliability and operating value, not electrical hardware alone.',
    },
  },
  'mfg-electrical-m5-2': {
    heading: 'Reliability, efficiency and maintenance each feed operating value — and need performance data',
    intro: 'Procurement now weighs losses, uptime, safety, service life, maintenance and support. Suppliers must back each claim with documented data.',
    spec: {
      layout: 'driverTree', title: '02 Why Are Reliability, Efficiency and TCO More Important?', kicker: '',
      root: { label: 'Lifecycle operating value', detail: 'What the buyer gets over the service life' },
      drivers: [
        { label: 'Reliability', detail: 'Lower failure risk', children: [{ label: 'Uptime' }, { label: 'Safety' }] },
        { label: 'Efficiency', detail: 'Lower operating cost', children: [{ label: 'Losses' }] },
        { label: 'Maintenance', detail: 'Longer, supported service', children: [{ label: 'Service life' }, { label: 'Parts access' }] },
        { label: 'Performance data', detail: 'Evidence behind every claim', children: [{ label: 'Documented efficiency' }, { label: 'Maintenance assumptions' }, { label: 'Warranty' }] },
      ],
      note: 'A critical facility can justify premium equipment when lower failure risk and faster service protect operations.',
      takeaway: 'Customers increasingly buy lifecycle reliability and operating value, not electrical hardware alone.',
    },
  },
  'mfg-electrical-m5-3': {
    heading: 'Connected equipment earns its value only when data turns into clear action',
    intro: 'Customers expect operating data, alarms, energy measurement, configuration, documentation and connection to building or industrial platforms. A connected breaker or relay creates value when alerts are understandable, interfaces dependable and action clear.',
    spec: {
      layout: 'flow', title: '03 How Are Connected Equipment and Service Expectations Evolving?', kicker: '',
      steps: [
        { label: 'Commissioning', detail: 'Configured and verified for operation' },
        { label: 'System integration', detail: 'Interoperable links to building or industrial platforms' },
        { label: 'Remote monitoring', detail: 'Operating data and energy measurement' },
        { label: 'Diagnostics', detail: 'Alarms that are understandable' },
        { label: 'Clear action', detail: 'Usability: technicians know what to do', kind: 'outcome' },
      ],
      note: 'In Vietnam, prioritize open documentation, practical integration, cybersecurity, technician skills and maintainable architectures.',
      takeaway: 'Customer experience now includes connectivity, manageability and integration across the installed system.',
    },
  },
  'mfg-electrical-m5-4': {
    heading: 'Smart-grid tools move from pilot to scale only after data, security and human validation',
    intro: 'Sensors, digital protection, communications, analytics and control improve network visibility, fault response and maintenance. A maintenance model can prioritize a transformer only after data quality, thresholds and technician validation are established.',
    spec: {
      layout: 'decision', title: '04 How Are Smart Equipment, Monitoring and Automation Developing?', kicker: '',
      root: { label: 'Candidate smart-grid use case', detail: 'Condition monitoring, AI diagnostics, digital twin, grid automation' },
      question: 'Are data quality, thresholds, secure interfaces and technician validation in place?',
      branches: [
        { condition: 'Validated against a baseline', outcome: 'Scale with human review', detail: 'e.g. smart substations', tone: 'positive' },
        { condition: 'Promising but unproven', outcome: 'Pilot a defined use case', detail: 'Set baselines and scale economics', tone: 'caution' },
        { condition: 'Data or cybersecurity gaps', outcome: 'Fix foundations first', detail: 'Do not automate on weak data', tone: 'negative' },
      ],
      note: 'In Vietnam, pilot defined use cases with baselines, secure interfaces, human review, skills and scale economics.',
      takeaway: 'Digital intelligence should complement proven engineering, safety controls and accountable operations.',
    },
  },
  'mfg-electrical-m5-5': {
    heading: 'Shared power-electronics building blocks branch into many applications',
    intro: 'Semiconductor converters, digital controls, protection and thermal systems now span renewables, batteries, EVs, industrial drives and data centers. They turn equipment from passive distribution toward active conversion.',
    spec: {
      layout: 'pathway', title: '05 How Are Power Electronics, Storage and Advanced Materials Evolving?', kicker: '',
      trunk: [
        { label: 'Semiconductors', detail: 'Converter switching devices' },
        { label: 'Inverters and converters', detail: 'With digital controls, protection and thermal systems' },
      ],
      optionsLabel: 'Applications — alternatives, not steps',
      options: [
        { label: 'Renewables' },
        { label: 'Batteries and storage' },
        { label: 'EVs' },
        { label: 'Industrial drives' },
        { label: 'Data centers' },
      ],
      afterLabel: 'Result',
      after: [{ label: 'Power quality', detail: 'Voltage, frequency and waveform managed actively', kind: 'outcome' }],
      note: 'PDP8 storage ambition creates potential for equipment, integration and service in Vietnam while project delivery remains uncertain.',
      takeaway: 'Power electronics turns equipment from passive distribution toward active conversion and flexibility.',
    },
  },
  'mfg-electrical-m5-6': {
    heading: 'A battery system is conversion, protection, monitoring, cooling and controls — not cells alone',
    intro: 'Storage interfaces, motor drives and thermal design all rely on converters, digital controls and protection. A battery system needs conversion, protection, monitoring, cooling, controls and grid integration.',
    spec: {
      layout: 'taxonomy', title: '06 How Can AI and Digital Twins Improve Manufacturing and Service?', kicker: '',
      root: 'Battery storage system', rootDetail: 'Subsystems that must work together — the cells are only one part',
      groups: [
        { label: 'Storage interfaces', detail: 'Conversion between battery and system', items: ['Conversion', 'Grid integration'] },
        { label: 'Protection', detail: 'Safe operation and fault handling' },
        { label: 'Monitoring and controls', detail: 'Digital control of operation', items: ['Monitoring', 'Controls'] },
        { label: 'Thermal design', detail: 'Cooling for converters and cells' },
        { label: 'Related application: motor drives', detail: 'Same converter and thermal know-how' },
      ],
      note: 'PDP8 storage ambition creates potential for equipment, integration and service in Vietnam while project delivery remains uncertain.',
      takeaway: 'Power electronics turns equipment from passive distribution toward active conversion and flexibility.',
    },
  },
  'mfg-electrical-m5-7': {
    heading: 'Three grid indicators frame demand — none of them is equipment revenue',
    intro: 'Transformers, cables, switchgear, substations, controls and power-quality equipment are needed for rising demand and queued generation, storage and large loads. IEA says annual grid investment must rise about 50% from roughly US$400B by 2030.',
    spec: {
      layout: 'table', title: '07 How Are Grid Investment and Electrification Shaping Demand?', kicker: '',
      headers: ['Indicator', 'Reported figure', 'How to read it'],
      rows: [
        { label: 'Annual grid investment', a: '~US$400B today (IEA Electricity 2026)', b: 'Global system investment, not equipment revenue' },
        { label: 'Required increase', a: '~50% by 2030', b: 'Requirement, not confirmed spending' },
        { label: 'Grid queues', a: '>2,500 GW', b: 'Indicative backlog of renewables, storage and large loads' },
        { label: 'Industrial electrification', a: 'Not quantified here', b: 'Adds load that grids must connect' },
      ],
      note: 'Grid expansion is constrained by permitting, supply chains, skills and long lead times. Align regional capacity with funded projects, procurement timing and technical requirements — not global headlines alone.',
      takeaway: 'Grid modernization is a structural opportunity constrained by permitting, supply chains, skills and long lead times.',
    },
  },
  'mfg-electrical-m5-8': {
    heading: 'Localize capacity for funded demand, not for queue headlines',
    intro: 'Over 2,500 GW of generation, storage and large loads such as data centers sit in grid queues worldwide. Whether that justifies local manufacturing capacity depends on funded projects, timing and skills.',
    spec: {
      layout: 'decision', title: '08 How Are Localization and Manufacturing Diversification Evolving?', kicker: '',
      root: { label: 'Global demand signal', detail: 'Queue backlog, data centers, grid investment' },
      question: 'Is local capacity tied to funded projects, procurement timing, technical requirements and regional service?',
      branches: [
        { condition: 'Funded projects and timing confirmed', outcome: 'Localize capacity for that demand', tone: 'positive' },
        { condition: 'Queue backlog only', outcome: 'Treat as indicative, not orders', detail: 'Backlog is not completed capacity', tone: 'caution' },
        { condition: 'Workforce or skills gap', outcome: 'Build skills before scaling', detail: 'Skills and lead times constrain delivery', tone: 'negative' },
      ],
      note: 'IEA: >2,500 GW in grid queues and ~US$400B annual grid investment are forward-looking system indicators, not equipment revenue.',
      takeaway: 'Grid modernization is a structural opportunity constrained by permitting, supply chains, skills and long lead times.',
    },
  },
  'mfg-electrical-m5-9': {
    heading: 'Hybrid channels: shared digital discovery, then online ordering or engineered delivery, then service',
    intro: 'Online catalogues and ordering serve standardized products alongside engineered selection, installation, commissioning, maintenance and retrofit. A customer portal can connect selection, certificates, installed assets, warranties, parts and service history.',
    spec: {
      layout: 'pathway', title: '09 How Are Project, Digital and Service-Led Channels Developing?', kicker: '',
      trunk: [
        { label: 'Digital discovery', detail: 'Online catalogues and accurate technical data' },
        { label: 'Configuration', detail: 'Selection and certificates' },
      ],
      optionsLabel: 'Route by product type — alternatives, not steps',
      options: [
        { label: 'Standardized products', detail: 'Online ordering via distributor inventory' },
        { label: 'Engineered projects', detail: 'Project delivery: installation and commissioning' },
      ],
      afterLabel: 'Lifecycle relationship',
      after: [
        { label: 'Service contracts', detail: 'Maintenance and retrofit' },
        { label: 'Remote support', detail: 'Local technicians backed remotely' },
        { label: 'Asset records', detail: 'Installed assets, warranties, parts, history', kind: 'outcome' },
      ],
      note: 'In Vietnam, integrate accurate technical data with distributor inventory, EPC relationships, local technicians and accountable fulfillment.',
      takeaway: 'The commercial model is becoming hybrid: digital convenience plus technical sales, integration and lifecycle service.',
    },
  },
  'mfg-electrical-m5-11': {
    heading: 'Efficiency and sustainability evidence follows the product from use to recycling',
    intro: 'Sustainable manufacturing covers loss reduction, material use, durability, repairability, upgrades, recovery and environmental information across the product lifecycle. Efficient equipment lowers customer cost while supporting credible requirements.',
    spec: {
      layout: 'flow', title: '11 How Are Energy Efficiency and Sustainable Manufacturing Evolving?', kicker: '',
      steps: [
        { label: 'Efficient equipment', detail: 'Lower losses and material use' },
        { label: 'Durable use', detail: 'Upgrades extend service' },
        { label: 'Repair', detail: 'Repairability keeps assets running' },
        { label: 'Recycling', detail: 'Recovery at end of life' },
        { label: 'Environmental information', detail: 'Evidence for each lifecycle stage', kind: 'outcome' },
      ],
      note: 'The EU ESPR (Regulation (EU) 2024/1781) provides a framework for future product-specific rules and digital passports, not identical duties for every electrical product.',
      takeaway: 'Efficiency and lifecycle design can lower customer cost while supporting credible sustainability requirements.',
    },
  },
  'mfg-electrical-m5-12': {
    heading: 'Check whether a product-specific rule exists before assuming circularity duties',
    intro: 'Material efficiency, refurbishment and product information are rising lifecycle requirements. The EU ESPR is a framework for future product-specific rules and digital passports, not identical duties for every electrical product.',
    spec: {
      layout: 'decision', title: '12 How Are Circularity, Cybersecurity and Lifecycle Requirements Changing?', kicker: '',
      root: { label: 'Product for a destination market', detail: 'Material efficiency, refurbishment, product information' },
      question: 'Has a product-specific requirement been adopted for this product and destination?',
      branches: [
        { condition: 'Specific rule adopted', outcome: 'Build evidence to that rule', tone: 'positive' },
        { condition: 'Framework only, e.g. ESPR', outcome: 'Prepare evidence, do not assume duties', detail: 'Future rules and digital passports', tone: 'caution' },
        { condition: 'Requirement unclear', outcome: 'Check destination requirements', tone: 'caution' },
      ],
      note: 'Develop evidence for losses, materials, maintenance, repair and end-of-life while checking applicable destination requirements.',
      takeaway: 'Efficiency and lifecycle design can lower customer cost while supporting credible sustainability requirements.',
    },
  },
  'mfg-electrical-m5-13': {
    heading: 'Six demand drivers, each with its own investment and replacement cycle',
    intro: 'Opportunities come from electricity demand, grid capacity, storage, data centers, efficient motors and drives, digital control and installed-base service. IEA’s 3.6% electricity-demand forecast is a backdrop, not an equipment sales forecast.',
    spec: {
      layout: 'driverTree', title: '13 What Factors Will Drive Future Equipment Demand?', kicker: '',
      root: { label: 'Future equipment demand', detail: 'Segments follow different cycles' },
      drivers: [
        { label: 'Demand growth', detail: 'IEA: 3.6% a year electricity demand, 2026–2030', children: [{ label: 'Backdrop, not sales' }] },
        { label: 'Grid modernization', detail: 'More grid capacity', children: [{ label: 'Grid capacity' }, { label: 'Storage' }] },
        { label: 'Renewables', detail: 'New generation to connect' },
        { label: 'Digital infrastructure', children: [{ label: 'Data centers' }, { label: 'Digital control' }] },
        { label: 'Industrial efficiency', children: [{ label: 'Efficient motors' }, { label: 'Drives' }] },
        { label: 'Lifecycle service', detail: 'Installed-base service' },
      ],
      note: 'Broad market estimates of US$1.660T (Fortune Business Insights, 2025) and US$1.752T (The Business Research Company, 2025) use separate methodologies — do not average them.',
      takeaway: 'Long-term growth is supported by electrification, but each equipment segment follows different investment and replacement cycles.',
    },
  },
  'mfg-electrical-m5-14': {
    heading: 'Opportunities cluster in local manufacturing, technology partnerships and the service ecosystem',
    intro: 'Opportunities span cables, components, panels, enclosures, selected equipment, grid and storage integration, power management, commissioning, maintenance and retrofit. Vietnam can connect domestic demand with gradual capability upgrading.',
    spec: {
      layout: 'taxonomy', title: '14 Where Are New Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      root: 'Emerging opportunity areas', rootDetail: 'Categories to pursue — not a sequence',
      groups: [
        { label: 'Local manufacturing', items: ['Cables', 'Components', 'Panels', 'Enclosures', 'Selected equipment'] },
        { label: 'Technology partnerships', items: ['Grid integration', 'Storage integration', 'Power management'] },
        { label: 'Service ecosystem', items: ['Commissioning', 'Maintenance', 'Retrofit'] },
      ],
      note: 'PDP8 targets do not guarantee orders; use customer-backed milestones for quality, testing, certification, engineering, cash, talent and partnerships.',
      takeaway: 'Vietnam can connect domestic demand with gradual capability upgrading and regional supply-chain participation.',
    },
  },
  'mfg-electrical-m5-15': {
    heading: 'A local firm upgrades step by step, then chooses where to position',
    intro: 'A local firm can progress from distribution to panel engineering, factory testing, commissioning, remote support and qualified component production. Each step should be backed by customer milestones, since PDP8 targets do not guarantee orders.',
    spec: {
      layout: 'pathway', title: '15 How Should Electrical Equipment Manufacturers Position Themselves?', kicker: '',
      trunk: [
        { label: 'Distribution', detail: 'Starting position' },
        { label: 'Panel engineering', detail: 'Own engineering capability' },
        { label: 'Factory testing and commissioning', detail: 'Evidence and field capability' },
      ],
      optionsLabel: 'Positioning choices — alternatives, not steps',
      options: [
        { label: 'Grid projects', detail: 'Grid and storage integration' },
        { label: 'Industrial solutions', detail: 'Power management and remote support' },
        { label: 'Supplier upgrading', detail: 'Qualified component production' },
      ],
      afterLabel: 'Gate for each move',
      after: [{ label: 'Customer-backed milestones', detail: 'Quality, testing, certification, cash, talent', kind: 'outcome' }],
      note: 'PDP8 targets do not guarantee orders.',
      takeaway: 'Vietnam can connect domestic demand with gradual capability upgrading and regional supply-chain participation.',
    },
  },
};
