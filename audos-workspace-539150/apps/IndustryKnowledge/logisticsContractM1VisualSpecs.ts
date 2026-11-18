import type { LogisticsContractChapterVisual } from './logisticsContractVisualSpecs';

/** Chapter-specific Learning Visuals for Contract Logistics & Warehousing Module 01, keyed by visualKind. */
export const LOGISTICS_CONTRACT_M1_VISUALS: Record<string, LogisticsContractChapterVisual> = {
  'logistics-contract-m1-1': {
    heading: 'How a 3PL turns inbound receipts into fulfilled, value-added orders',
    intro: 'Contract logistics covers outsourced receiving, inventory, picking, packing, dispatch, transport coordination and value-added work under an agreement. A 3PL runs the people, processes and WMS against inventory and order commitments.',
    spec: {
      layout: 'flow', title: 'What Is Contract Logistics & Warehousing?', kicker: '',
      steps: [
        { label: 'Inbound receiving', detail: 'Goods arrive and are checked into the WMS', owner: '3PL' },
        { label: 'Inventory', detail: 'Stock is stored and recorded against commitments', owner: '3PL' },
        { label: 'Fulfillment', detail: 'Orders are picked and packed', owner: '3PL' },
        { label: 'Value-added services', detail: 'Extra work agreed in the contract', owner: '3PL' },
        { label: 'Dispatch', detail: 'Handoff with transport coordination', kind: 'outcome', owner: '3PL with carriers' },
      ],
      loop: 'The cycle repeats under an agreement with ongoing responsibility and SLAs, not as a one-time job.',
      note: 'Manufacturers and retailers can access professional operations without building every capability internally.',
      takeaway: 'Contract logistics converts recurring logistics processes into a managed service with ongoing responsibility and SLAs.',
    },
  },
  'logistics-contract-m1-2': {
    heading: 'Ongoing responsibility under SLAs is what sets contract logistics apart',
    intro: 'The same recurring work — storage, distribution coordination, returns and reporting — becomes contract logistics when a provider takes ongoing responsibility for it under SLAs.',
    spec: {
      layout: 'compare', title: 'What Makes Contract Logistics Unique?', kicker: '',
      leftTitle: 'Recurring processes handled task by task',
      rightTitle: 'Contract logistics as a managed service',
      rows: [
        { label: 'Storage and inventory', a: 'Space and stock handled as needed', b: 'Provider is accountable for inventory commitments' },
        { label: 'Distribution coordination', a: 'Each dispatch arranged separately', b: 'Transport coordination is part of the agreed scope' },
        { label: 'Returns and reporting', a: 'Handled when issues arise', b: 'Returns and reports delivered as ongoing duties' },
        { label: 'Performance', a: 'Judged job by job', b: 'Measured against SLAs over the contract' },
      ],
      note: 'Define customer, product, order profile, site, service scope, SLA, volume assumptions, pricing and risk allocation before acting.',
      takeaway: 'What makes contract logistics distinct is ongoing responsibility and SLAs for recurring storage, distribution coordination, returns and reporting.',
    },
  },
  'logistics-contract-m1-3': {
    heading: 'Seven roles that overlap in practice but stay commercially distinct',
    intro: 'Contract logistics is an ongoing managed operating responsibility. Freight forwarding organizes transport, transportation moves goods, and a property owner supplies space; these roles can overlap but remain commercially distinct.',
    spec: {
      layout: 'table', title: 'Where Does Contract Logistics Begin and End?', kicker: '',
      headers: ['Role', 'What it does', 'Not the same as'],
      rows: [
        { label: 'Contract logistics', a: 'Ongoing managed warehousing, inventory and fulfillment', b: 'Freight forwarding' },
        { label: 'Warehousing', a: 'Stores and handles goods in a facility', b: 'Transportation' },
        { label: 'Transportation', a: 'Moves goods', b: 'Organizing transport' },
        { label: 'Freight forwarding', a: 'Organizes transport', b: 'Operating a warehouse' },
        { label: 'Property owner', a: 'Supplies space, e.g. leases a distribution center', b: 'Operating control' },
        { label: '3PL', a: 'Commonly executes logistics operations', b: '4PL' },
        { label: '4PL / lead logistics', a: 'Coordinates a broader provider network and governance', b: 'Single-operation execution' },
      ],
      note: 'Define inventory ownership, operating control, service scope, licenses, data, subcontractors and contractual accountability before classifying a provider.',
      takeaway: 'Warehousing is not transportation, contract logistics is not freight forwarding, and 3PL is not 4PL.',
    },
  },
  'logistics-contract-m1-4': {
    heading: 'Contract logistics services are sorted by responsibility, not warehouse size',
    intro: 'Contract logistics services are ongoing managed operations, distinct from property rent, one-off handling, transport, forwarding or consulting, while often integrated with them.',
    spec: {
      layout: 'taxonomy', title: 'Understanding Contract Logistics Services', kicker: '',
      root: 'Contract logistics services', rootDetail: 'Grouped by operating model and responsibility',
      groups: [
        { label: 'Shared-user', detail: 'One site and its resources serve several customers', items: ['Controlled allocation of space', 'Shared labor and systems'] },
        { label: 'Specialized storage', detail: 'Operations built around specific product handling' },
        { label: 'Often integrated, but separate services', detail: 'Can be bundled yet priced and governed differently', items: ['Property rent', 'One-off handling', 'Transport', 'Forwarding', 'Consulting'] },
      ],
      note: 'Two similar warehouses compete differently when one sells space and the other guarantees inventory and fulfillment outcomes.',
      takeaway: 'The market is defined by responsibility and operating model — not warehouse size alone.',
    },
  },
  'logistics-contract-m1-5': {
    heading: 'An e-commerce customer weighs in-house work against separate landlord, operator and transport roles',
    intro: 'A customer deciding between in-house and outsourced logistics deals with distinct stakeholders. Separate landlord, operator, transport and integrated-service economics.',
    spec: {
      layout: 'ecosystem', title: "Who Are the Industry's Customers and Stakeholders?", kicker: '',
      center: { label: 'Customer business', detail: 'e.g. an e-commerce seller choosing in-house versus outsourced' },
      actors: [
        { label: 'Landlord', relation: 'Leases warehouse space', flows: ['money'] },
        { label: 'Contract logistics operator', relation: 'Guarantees inventory and fulfillment outcomes', flows: ['service', 'information'] },
        { label: 'Transport provider', relation: 'Moves orders onward', flows: ['product'] },
        { label: 'Integrated-service provider', relation: 'Bundles several roles in one agreement', flows: ['service', 'money'] },
        { label: 'In-house team', relation: 'The alternative: runs operations internally', flows: ['service'] },
      ],
      note: 'The same warehouse can sell space or guarantee outcomes — the customer pays for different responsibilities.',
      takeaway: 'The market is defined by responsibility and operating model, so separate each stakeholder’s role and economics before comparing in-house and outsourced options.',
    },
  },
  'logistics-contract-m1-6': {
    heading: 'Warehousing moved from in-house facilities to accountable partnerships',
    intro: 'The industry progressed from internal storage toward external handling, dedicated sites and integrated logistics with defined service and improvement responsibilities.',
    spec: {
      layout: 'timeline', title: 'How Did Warehousing and Distribution Begin?', kicker: '',
      events: [
        { period: 'Origin', label: 'In-house facilities', detail: 'Company-owned storage as a support function', status: 'historical' },
        { period: 'Next', label: 'Dedicated operations', detail: 'External dedicated sites run for a customer', status: 'historical' },
        { period: 'Today', label: 'Strategic partnership', detail: 'Integrated logistics with service and improvement duties', status: 'current' },
      ],
      note: 'Rising operational complexity encourages outsourcing where providers can prove reliability and economics.',
      takeaway: 'The industry shifted from company-owned support functions to specialized, accountable operating partnerships.',
    },
  },
  'logistics-contract-m1-7': {
    heading: 'A 3PL’s scope widens from single tasks to integrated, improving operations',
    intro: 'A provider can progress from storage to running inventory, fulfillment, transport interfaces and reporting.',
    spec: {
      layout: 'flow', title: 'How Did Third-Party Logistics Evolve?', kicker: '',
      steps: [
        { label: 'Storage', detail: 'Provider holds goods for the customer' },
        { label: 'Outsourced tasks', detail: 'External handling of selected activities' },
        { label: 'Integrated 3PL', detail: 'Runs inventory, fulfillment, transport interfaces and reporting' },
        { label: 'Continuous improvement', detail: 'Defined responsibility to improve service', kind: 'outcome' },
      ],
      loop: 'Each step depends on the provider proving reliability and economics.',
      note: 'Rising operational complexity encourages outsourcing where providers can prove reliability and economics.',
      takeaway: 'Third-party logistics evolved from outsourced tasks into specialized, accountable operating partnerships.',
    },
  },
  'logistics-contract-m1-8': {
    heading: 'Networks, WMS and system links keep multi-location inventory connected',
    intro: 'Multi-location supply chains and high-volume small orders require connected inventory, workflows, returns and variable capacity. WMS integration keeps order and stock records synchronized.',
    spec: {
      layout: 'table', title: 'How Did E-Commerce and Digital Systems Transform Warehousing?', kicker: '',
      headers: ['Capability', 'What e-commerce demanded', 'What it keeps connected'],
      rows: [
        { label: 'Global networks', a: 'Multi-location supply chains', b: 'Inventory across locations' },
        { label: 'WMS', a: 'High-volume small orders', b: 'Order and stock records' },
        { label: 'APIs and EDI', a: 'Links to customer systems', b: 'Orders and status between parties' },
      ],
      note: 'Adoption should match product, volume, facility, skills and customer-system readiness.',
      takeaway: 'Space and labor remain essential, but systems and flexibility increasingly differentiate providers.',
    },
  },
  'logistics-contract-m1-9': {
    heading: 'Vietnam adopts automation and analytics only where operations are ready',
    intro: 'E-commerce orders push providers toward automation and predictive analytics. Adoption should match product, volume, facility, skills and customer-system readiness.',
    spec: {
      layout: 'decision', title: 'How Has Contract Logistics Developed in Vietnam?', kicker: '',
      root: { label: 'Candidate technology', detail: 'e.g. AMRs or predictive analytics for e-commerce orders' },
      question: 'Does it match product, volume, facility, skills and customer-system readiness?',
      branches: [
        { condition: 'Ready on all five', outcome: 'Adopt in suitable workflows', detail: 'AMRs can reduce travel where the workflow fits', tone: 'positive' },
        { condition: 'Skills or systems lag', outcome: 'Build readiness first', detail: 'Train teams and connect customer systems', tone: 'caution' },
        { condition: 'Profile does not fit', outcome: 'Do not adopt yet', detail: 'Space and labor still carry the operation', tone: 'negative' },
      ],
      note: 'Vietnam policy targets on digital adoption are targets, not current outcomes.',
      takeaway: 'Space and labor remain essential, but automation and analytics increasingly differentiate providers when they fit the operation.',
    },
  },
  'logistics-contract-m1-10': {
    heading: 'A global market estimate depends on which services and regions are counted',
    intro: 'Ti measures commercial contract-logistics revenue across regions and managed service categories, estimating €305.95B in 2025. Its scope and methodology are report-specific.',
    spec: {
      layout: 'driverTree', title: 'How Is the Global Contract Logistics Market Structured?', kicker: '',
      root: { label: 'Global contract logistics', detail: 'Ti estimate €305.95B, 2025' },
      drivers: [
        { label: 'Market definition', detail: 'Which managed services are included', children: [{ label: 'Distribution' }, { label: 'Warehousing' }, { label: 'Value-added services' }] },
        { label: 'Regional scope', detail: 'Revenue counted by region', children: [{ label: 'Europe' }, { label: 'Asia-Pacific' }, { label: 'North America' }] },
        { label: 'Methodology', detail: 'Report-specific commercial scope' },
      ],
      note: 'Use the forecast as global context rather than Vietnam market size or provider revenue.',
      takeaway: 'Market estimates depend on included distribution, warehousing and value-added services, and regional growth differs.',
    },
  },
  'logistics-contract-m1-11': {
    heading: 'Ti’s figures move from a 2025 estimate to forecasts for 2026 and 2030',
    intro: 'Ti estimates €305.95B in 2025, €318.58B in 2026 and €372.6B by 2030; Asia-Pacific CAGR is forecast at 6.6%.',
    spec: {
      layout: 'timeline', title: 'How Are Contract Logistics Markets Measured?', kicker: '',
      events: [
        { period: '2025', label: '€305.95B estimate', detail: 'Report-specific commercial scope', status: 'historical' },
        { period: '2026', label: '€318.58B forecast', detail: 'Forecast, not a confirmed result', status: 'forecast' },
        { period: '2030', label: '€372.6B forecast', detail: 'Asia-Pacific CAGR forecast at 6.6%', status: 'forecast' },
      ],
      note: 'Keep the status of each figure (estimate or forecast) and its scope; consolidation and regional mix can change what a total represents.',
      takeaway: 'Regional growth differs, and market estimates depend on included distribution, warehousing and value-added services.',
    },
  },
  'logistics-contract-m1-12': {
    heading: 'Demand is read by region and by the specialized services included',
    intro: 'Contract-logistics revenue is measured across regions and managed service categories. Regional growth differs: Asia-Pacific CAGR is forecast at 6.6%.',
    spec: {
      layout: 'taxonomy', title: 'Which Regions and Customer Sectors Drive Demand?', kicker: '',
      root: 'Sources of contract logistics demand', rootDetail: 'Two lenses — keep them separate when comparing estimates',
      groups: [
        { label: 'Regions', detail: 'Growth differs by region', items: ['North America', 'Asia-Pacific (6.6% CAGR forecast)', 'Europe'] },
        { label: 'Specialized services', detail: 'Managed categories that change the scope', items: ['Distribution', 'Warehousing', 'Value-added services'] },
      ],
      note: 'Use the forecast as global context rather than Vietnam market size or provider revenue.',
      takeaway: 'Regional growth differs, and demand estimates depend on which distribution, warehousing and value-added services are included.',
    },
  },
  'logistics-contract-m1-13': {
    heading: 'Shared-user and dedicated sites serve different demand patterns',
    intro: 'Customers outsource to avoid internal capital, serve channels and seek operating improvements. A shared-user site can absorb variable demand while a dedicated site supports specialized, stable volume.',
    spec: {
      layout: 'compare', title: 'Who Are the Major Global Contract Logistics Participants?', kicker: '',
      leftTitle: 'Shared-user site', rightTitle: 'Dedicated site',
      rows: [
        { label: 'Demand it suits', a: 'Variable demand', b: 'Specialized, stable volume' },
        { label: 'Outsourcing appeal', a: 'Customer avoids internal capital', b: 'Customer gets a site configured for it' },
        { label: 'Omnichannel orders', a: 'Absorbs swings across channels', b: 'Fits a predictable channel mix' },
        { label: 'Productivity pressure', a: 'Flexible capacity must not leave costs unrecovered', b: 'Committed rent, labor and systems need steady volume' },
      ],
      note: 'Providers need flexible capacity without carrying unrecovered rent, labor or systems.',
      takeaway: 'Demand combines outsourcing, complexity and flexibility — not shipment volume alone.',
    },
  },
  'logistics-contract-m1-14': {
    heading: 'Growth comes from supply-chain complexity and flexibility, not volume alone',
    intro: 'Customers avoid internal capital, reposition supply chains, serve channels, buffer inventory and seek operating improvements — each adds to outsourced demand.',
    spec: {
      layout: 'driverTree', title: 'How Do Outsourcing and Supply-Chain Complexity Shape Growth?', kicker: '',
      root: { label: 'Contract logistics growth', detail: 'Demand beyond shipment volume' },
      drivers: [
        { label: 'Manufacturing shifts', detail: 'Customers reposition supply chains' },
        { label: 'Inventory resilience', detail: 'Customers buffer inventory' },
        { label: 'Contract flexibility', detail: 'Capacity that absorbs variable demand', children: [{ label: 'Shared-user for variable demand' }, { label: 'Dedicated for stable volume' }] },
        { label: 'Outsourcing', detail: 'Customers avoid internal capital' },
      ],
      note: 'Providers need flexible capacity without carrying unrecovered rent, labor or systems.',
      takeaway: 'Demand combines outsourcing, complexity and flexibility — not shipment volume alone.',
    },
  },
  'logistics-contract-m1-15': {
    heading: 'Vietnam’s demand spans manufacturing, e-commerce and cold chain',
    intro: 'Demand comes from manufacturers, retailers, importers, exporters and online businesses requiring inventory, fulfillment and distribution support. MOIT estimates the broader logistics market at US$45–50B, but that is not contract logistics alone.',
    spec: {
      layout: 'taxonomy', title: "What Does Vietnam's Contract Logistics Market Look Like?", kicker: '',
      root: 'Vietnam demand for managed operations', rootDetail: 'Inside a broader logistics market (MOIT: US$45–50B)',
      groups: [
        { label: 'Manufacturing', detail: 'Inventory and distribution support', items: ['Manufacturers', 'Importers', 'Exporters'] },
        { label: 'E-commerce', detail: 'Fulfillment for online orders', items: ['Online businesses', 'Retailers'] },
        { label: 'Cold chain', detail: 'Temperature-controlled inventory and distribution' },
      ],
      note: 'Opportunity depends on inventory accuracy, service, integration and measurable customer value.',
      takeaway: 'Vietnam’s opportunity is dependable managed operations, not warehouse capacity alone.',
    },
  },
  'logistics-contract-m1-16': {
    heading: 'Industrial parks and consumer markets create different outsourcing needs',
    intro: 'Manufacturers, importers and exporters need inventory and distribution support, while retailers and online businesses need fulfillment. Opportunity depends on inventory accuracy, service, integration and measurable customer value.',
    spec: {
      layout: 'compare', title: 'Which Industrial and Consumption Hubs Drive Demand?', kicker: '',
      leftTitle: 'Industrial parks', rightTitle: 'Retail and consumer hubs',
      rows: [
        { label: 'Main customers', a: 'Manufacturers, importers, exporters', b: 'Retailers and online businesses' },
        { label: 'Support needed', a: 'Inventory and distribution', b: 'Fulfillment and distribution' },
        { label: 'Outsourcing case', a: 'Dependable inventory accuracy', b: 'Reliable service and integration' },
      ],
      note: 'Measure the value a provider adds in each hub, not the warehouse capacity it offers.',
      takeaway: 'Vietnam’s opportunity is dependable managed operations, not warehouse capacity alone.',
    },
  },
  'logistics-contract-m1-17': {
    heading: 'A Vietnam warehouse site sits among factories, ports, consumers and labor',
    intro: 'Warehouse geography matters relative to factories, ports, roads and consumption, alongside labor, utilities, systems and service cost.',
    spec: {
      layout: 'ecosystem', title: 'Who Are the Key Contract Logistics Participants in Vietnam?', kicker: '',
      center: { label: 'Operator’s warehouse site', detail: 'Location chosen within an end-to-end network' },
      actors: [
        { label: 'Factories', relation: 'Send inbound goods', flows: ['product'] },
        { label: 'Ports', relation: 'Connect imports and exports', flows: ['product'] },
        { label: 'Consumption markets', relation: 'Need proximity for delivery', flows: ['product', 'service'] },
        { label: 'Labor', relation: 'Staffs daily operations', flows: ['service'] },
        { label: 'Customers', relation: 'Pay service cost for managed operations', flows: ['money'] },
      ],
      note: 'Southern warehouse development shifts toward satellite provinces as operators balance cost, connectivity and customer proximity.',
      takeaway: 'Strategic sites create value only when operating capability and customer economics are strong.',
    },
  },
  'logistics-contract-m1-18': {
    heading: 'Land, facilities and digital integration together decide whether a site pays off',
    intro: 'Warehouse value depends on land and facilities alongside labor, utilities, systems and service cost. Evaluate each site as part of an end-to-end network, not as isolated real estate.',
    spec: {
      layout: 'driverTree', title: 'How Do Warehouse and Fulfillment Operations Work in Vietnam?', kicker: '',
      root: { label: 'Value of a strategic site', detail: 'Operating capability plus customer economics' },
      drivers: [
        { label: 'Land and facilities', detail: 'Where and what the site is', children: [{ label: 'Site cost' }, { label: 'Utilities' }] },
        { label: 'Digital integration', detail: 'How the site connects to customers', children: [{ label: 'Warehouse systems' }, { label: 'Customer-system links' }] },
        { label: 'Service cost', detail: 'What the customer ultimately pays' },
      ],
      note: 'Southern warehouse development shifts toward satellite provinces as operators balance cost, connectivity and customer proximity.',
      takeaway: 'Strategic sites create value only when operating capability and customer economics are strong.',
    },
  },
  'logistics-contract-m1-19': {
    heading: 'A lower-cost satellite site only works if connectivity holds',
    intro: 'Southern warehouse development shifts toward satellite provinces as operators balance cost, connectivity and customer proximity.',
    spec: {
      layout: 'decision', title: "What Opportunities and Constraints Shape Vietnam's Market?", kicker: '',
      root: { label: 'Candidate site in a satellite province', detail: 'Lower cost than core locations' },
      question: 'Does it still connect to factories, ports, roads and customers as part of the network?',
      branches: [
        { condition: 'Connected and close enough', outcome: 'Develop as a network node', detail: 'Cost saving plus proximity', tone: 'positive' },
        { condition: 'Connectivity is weak', outcome: 'Test service cost first', detail: 'Savings may be lost in transport', tone: 'caution' },
        { condition: 'Isolated real estate', outcome: 'Do not choose on rent alone', tone: 'negative' },
      ],
      note: 'Weigh green operations alongside cost, connectivity and customer proximity when comparing sites.',
      takeaway: 'Strategic sites create value only when operating capability and customer economics are strong.',
    },
  },
  'logistics-contract-m1-20': {
    heading: 'Production, trade and consumption cycles set the volume a contract must absorb',
    intro: 'Contract volume moves with manufacturing, trade, consumption, seasonality, safety stock, internal cost and contract adjustments.',
    spec: {
      layout: 'driverTree', title: 'How Do Economic and Trade Conditions Affect Contract Logistics?', kicker: '',
      root: { label: 'Contract volume and pricing', detail: 'Structural demand meets cyclical swings' },
      drivers: [
        { label: 'Production', detail: 'Manufacturing and trade levels' },
        { label: 'Consumption', detail: 'Seasonality in end demand' },
        { label: 'Safety stock', detail: 'How much inventory customers hold' },
        { label: 'In-house versus outsource', detail: 'Customer’s internal cost comparison' },
      ],
      note: 'Demand can fall below forecast while dedicated rent, systems and core labor remain committed.',
      takeaway: 'Structural outsourcing coexists with cyclical volume and pricing pressure.',
    },
  },
  'logistics-contract-m1-21': {
    heading: 'When retail demand falls below forecast, committed costs stay',
    intro: 'Demand can fall below forecast while dedicated rent, systems and core labor remain committed.',
    spec: {
      layout: 'compare', title: 'Why Do Safety, Product and Facility Requirements Matter?', kicker: '',
      leftTitle: 'Retail demand at forecast', rightTitle: 'Retail demand below forecast',
      rows: [
        { label: 'Dedicated rent', a: 'Covered by volume', b: 'Still committed' },
        { label: 'Systems', a: 'Spread over planned orders', b: 'Same cost, fewer orders' },
        { label: 'Core labor', a: 'Fully used', b: 'Still committed, partly idle' },
        { label: 'Contract response', a: 'Operate as planned', b: 'Use volume bands and change control' },
      ],
      note: 'Use volume bands, peak assumptions, change control and early customer forecasts.',
      takeaway: 'Structural outsourcing coexists with cyclical volume and pricing pressure, so volume volatility must be designed into the contract.',
    },
  },
  'logistics-contract-m1-22': {
    heading: 'Contract mechanisms decide when a volume shift triggers renegotiation',
    intro: 'Inventory policy changes, seasonality and safety stock move volume away from contract assumptions. Use volume bands, peak assumptions, change control and early customer forecasts.',
    spec: {
      layout: 'decision', title: 'How Are WMS, Automation and Data Transforming Warehousing?', kicker: '',
      root: { label: 'Volume moves from the forecast', detail: 'e.g. a customer changes inventory policy' },
      question: 'Is the change covered by the agreed bands and peak assumptions?',
      branches: [
        { condition: 'Within volume bands', outcome: 'Operate under current pricing', tone: 'positive' },
        { condition: 'Peak above assumptions', outcome: 'Apply change control', detail: 'Early customer forecasts help plan', tone: 'caution' },
        { condition: 'Lasting shift in inventory policy', outcome: 'Renegotiate the contract', tone: 'negative' },
      ],
      note: 'Demand can fall below forecast while dedicated rent, systems and core labor remain committed.',
      takeaway: 'Structural outsourcing coexists with cyclical volume and pricing pressure, so contracts need agreed ways to adjust.',
    },
  },
  'logistics-contract-m1-23': {
    heading: 'Automation, cybersecurity and energy efficiency now shape SLAs and eligibility',
    intro: 'Technology, compliance and sustainability increasingly affect eligibility, cost and reliability. A cyber outage can stop order release even when warehouse labor and stock remain available.',
    spec: {
      layout: 'table', title: 'How Are Customer SLAs and Outsourcing Models Evolving?', kicker: '',
      headers: ['Requirement', 'What it affects', 'Where to build it in'],
      rows: [
        { label: 'Automation', a: 'Cost and reliability', b: 'Daily operations' },
        { label: 'Cybersecurity', a: 'Whether orders can be released', b: 'Controls and recovery plans' },
        { label: 'Energy efficiency', a: 'Cost and provider eligibility', b: 'Contracts' },
      ],
      note: 'Integrate controls and recovery into daily operations and contracts.',
      takeaway: 'Technology, compliance and sustainability increasingly affect eligibility, cost and reliability.',
    },
  },
  'logistics-contract-m1-24': {
    heading: 'External risks cluster around systems, safety, sustainability and disruption',
    intro: 'External factors span warehouse systems, automation, data, occupational safety, product handling, energy, waste and disruption planning.',
    spec: {
      layout: 'taxonomy', title: 'What External Risks and Opportunities Shape the Industry?', kicker: '',
      root: 'External risks and opportunities', rootDetail: 'Each can change eligibility, cost or reliability',
      groups: [
        { label: 'Inventory visibility', detail: 'Systems and data that show true stock', items: ['Warehouse systems', 'Data'] },
        { label: 'Safety', detail: 'People and goods', items: ['Occupational safety', 'Product handling'] },
        { label: 'Sustainability', items: ['Energy', 'Waste'] },
        { label: 'Business continuity', detail: 'Disruption planning, e.g. for a cyber outage' },
      ],
      note: 'A cyber outage can stop order release even when warehouse labor and stock remain available.',
      takeaway: 'Technology, compliance and sustainability increasingly affect eligibility, cost and reliability.',
    },
  },
};
