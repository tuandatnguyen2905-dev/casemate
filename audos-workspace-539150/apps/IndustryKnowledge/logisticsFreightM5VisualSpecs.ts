import type { LogisticsFreightChapterVisual } from './logisticsFreightVisualSpecs';

/** Chapter-specific Learning Visuals for Freight Forwarding & Ocean Logistics Module 05 (trends and outlook), keyed by visualKind.
 *  logistics-freight-m5-10 has no entry: reviewHolds.ts REV-P0-07. */
export const LOGISTICS_FREIGHT_M5_VISUALS: Record<string, LogisticsFreightChapterVisual> = {
  'logistics-freight-m5-1': {
    heading: 'Shippers are moving from lowest rate to balanced cost and performance',
    intro: 'Shippers increasingly want complete charges, route choices, capacity commitments and contingency options under changing demand.',
    spec: {
      layout: 'compare', title: "01 How Are Shippers' Logistics Requirements Changing?", kicker: '',
      leftTitle: 'Lowest-rate buying', rightTitle: 'Balanced cost-performance buying',
      rows: [
        { label: 'Quote', a: 'Base freight rate', b: 'Transparent quotes: surcharges, local services, free time' },
        { label: 'Routing', a: 'Cheapest route only', b: 'Alternative routes compared' },
        { label: 'Capacity', a: 'Booked as needed', b: 'Capacity planning and commitments' },
        { label: 'Risk', a: 'Handled when it happens', b: 'Contingencies agreed upfront' },
        { label: 'Inventory', a: 'Outside the freight decision', b: 'Inventory coordination included' },
      ],
      note: 'A cheaper route can be uneconomic once delay, inventory and failure risk are included. Rate indices exclude inland transport and specialized containers.',
      takeaway: 'Customer value is shifting toward balanced cost, reliability, flexibility and risk management.',
    },
  },
  'logistics-freight-m5-2': {
    heading: 'Predictable total performance rests on reliable bookings, alerts and reporting',
    intro: 'Customers judge end-to-end origin, ocean, customs and destination coordination, backed by actionable milestone information.',
    spec: {
      layout: 'driverTree', title: '02 Why Are Reliability, Visibility and Resilience Becoming More Important?', kicker: '',
      root: { label: 'Predictable shipment performance', detail: 'Judged end to end, not by rate alone' },
      drivers: [
        { label: 'Booking reliability', detail: 'Space confirmed and kept', children: [{ label: 'Origin execution' }] },
        { label: 'Proactive alerts', detail: 'Early warning of missed connections', children: [{ label: 'Ocean milestones' }, { label: 'Customs status' }] },
        { label: 'Service reporting', detail: 'Performance the customer can review', children: [{ label: 'Destination delivery' }] },
      ],
      note: 'An early missed-connection alert can support inventory, production or customer decisions.',
      takeaway: 'Customers increasingly evaluate predictable total shipment performance rather than rate alone.',
    },
  },
  'logistics-freight-m5-3': {
    heading: 'One coordination point links every party as supply chains spread out',
    intro: 'As sourcing spreads, customers want a single point coordinating origin, ocean, customs and destination, with accurate ETAs and dashboards.',
    spec: {
      layout: 'ecosystem', title: '03 How Are Supply-Chain Diversification and Trade Patterns Affecting Demand?', kicker: '',
      center: { label: 'Single coordination point', detail: 'Forwarder owning end-to-end updates' },
      actors: [
        { label: 'Origin suppliers', relation: 'Cargo readiness and pickup', flows: ['product', 'information'] },
        { label: 'Ocean carriers', relation: 'Vessel milestones for accurate ETA', flows: ['service', 'information'] },
        { label: 'Customs', relation: 'Clearance status', flows: ['oversight'] },
        { label: 'Destination partners', relation: 'Delivery execution', flows: ['service'] },
        { label: 'Customer', relation: 'Dashboards and realistic updates; pays for service', flows: ['information', 'money'] },
      ],
      note: 'Combine local origin execution with reliable overseas partners and realistic updates.',
      takeaway: 'Customers increasingly evaluate predictable total shipment performance rather than rate alone.',
    },
  },
  'logistics-freight-m5-4': {
    heading: 'Digital platforms span quoting, documents, exceptions and planning',
    intro: 'Platforms now cover quotation, booking, documents, milestone updates, classification, anomaly detection and demand planning.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Digital Freight Platforms Changing Logistics?', kicker: '',
      root: 'Digital freight platform capabilities', rootDetail: 'Capabilities — each still needs human review where it matters',
      groups: [
        { label: 'Commercial', items: ['Digital quotes', 'Booking'] },
        { label: 'Documents', items: ['Document extraction', 'Classification'] },
        { label: 'Operations', items: ['Workflow automation', 'AI exception support', 'Anomaly detection'] },
        { label: 'Planning', items: ['Forecasting', 'Demand planning'] },
        { label: 'Connectivity', items: ['System integration', 'Milestone updates'] },
      ],
      note: 'AI can flag inconsistent cargo data but compliance-sensitive decisions still need accountable review. Focus on data quality, redesigned workflows, training and partner connectivity.',
      takeaway: 'Technology is valuable when it improves accuracy, speed and service with appropriate human review.',
    },
  },
  'logistics-freight-m5-5': {
    heading: 'Tracking data becomes value only when an alert reaches an owner who acts',
    intro: 'Carrier, vessel, terminal, GPS and customer data estimate progress and delay; the response is what improves operations.',
    spec: {
      layout: 'flow', title: '05 How Are Tracking, Automation and Data Analytics Improving Operations?', kicker: '',
      steps: [
        { label: 'Data captured', detail: 'Carrier, vessel, terminal, GPS, customer', owner: 'Data sources' },
        { label: 'Container milestones', detail: 'Validated progress events', owner: 'Tracking system' },
        { label: 'Exception alert', detail: 'Delay or deviation detected', kind: 'decision', owner: 'Automation' },
        { label: 'Response', detail: 'Assigned owner coordinates action', owner: 'Operations' },
        { label: 'Customer integration', detail: 'Update flows into customer systems', kind: 'outcome', owner: 'Customer' },
      ],
      note: 'Define milestones, validate sources and assign response ownership.',
      takeaway: 'Visibility creates the most value when it supports timely action.',
    },
  },
  'logistics-freight-m5-6': {
    heading: 'When a predictive ETA can be acted on — and when it needs review',
    intro: 'AI and connected systems produce predictive ETAs and performance analytics, but predictions are uncertain when schedules, customs or weather change.',
    spec: {
      layout: 'decision', title: '06 How Could AI and Connected Logistics Systems Transform Freight Forwarding?', kicker: '',
      root: { label: 'Predictive ETA', detail: 'From connected carrier, terminal and GPS data' },
      question: 'How far can this prediction be trusted?',
      branches: [
        { condition: 'Validated sources, shared data standards', outcome: 'Share as an estimate and act', detail: 'Feed performance analytics', tone: 'positive' },
        { condition: 'Schedules, customs or weather changing', outcome: 'Flag uncertainty and review', detail: 'Never present as a guarantee', tone: 'caution' },
        { condition: 'Inconsistent or unvalidated data', outcome: 'Do not automate the response', detail: 'Fix data quality first', tone: 'negative' },
      ],
      note: 'Data standards let customer, forwarder and carrier systems interpret milestones the same way.',
      takeaway: 'Visibility creates the most value when it supports timely action.',
    },
  },
  'logistics-freight-m5-7': {
    heading: 'Sourcing pressure opens several network responses, not one shift',
    intro: 'Tariffs, labor, geopolitical risk and customer demand are reshaping suppliers, ports, carriers and routes.',
    spec: {
      layout: 'pathway', title: '07 How Are Global Shipping Networks and Trade Lanes Evolving?', kicker: '',
      trunk: [
        { label: 'Sourcing pressure', detail: 'Tariffs, labor, geopolitical risk, customer demand' },
        { label: 'Network rethink', detail: 'Suppliers, ports, carriers and routes reviewed' },
      ],
      optionsLabel: 'Responses — alternatives that can be combined',
      options: [
        { label: 'Regional sourcing', detail: 'Add a nearby supplier country' },
        { label: 'Alternative gateways', detail: 'Add a second port' },
        { label: 'Regional networks', detail: 'Regional services feeding global lanes' },
      ],
      afterLabel: 'Forwarder capability needed',
      after: [{ label: 'Lane-specific execution', detail: 'Built around industrial clusters and corridors', kind: 'outcome' }],
      note: 'Diversification may add a second country or port rather than move all production.',
      takeaway: 'Changing manufacturing geography increases demand for flexible local execution connected to international networks.',
    },
  },
  'logistics-freight-m5-8': {
    heading: 'Diversified manufacturing turns one origin into multicountry capacity coordination',
    intro: 'As manufacturing diversifies, capacity has to be planned and coordinated across more origins, ports and carriers.',
    spec: {
      layout: 'compare', title: '08 How Are Carrier Alliances and Capacity Management Affecting Freight Markets?', kicker: '',
      leftTitle: 'Single-origin supply chain', rightTitle: 'Diversified multicountry supply chain',
      rows: [
        { label: 'Origins', a: 'One country, one main port', b: 'A second country or port added' },
        { label: 'Capacity', a: 'Secured on one lane', b: 'Balanced across several lanes and carriers' },
        { label: 'Coordination', a: 'One origin team', b: 'Multicountry coordination' },
        { label: 'Resilience', a: 'Exposed to one disruption', b: 'Alternatives if one route fails' },
      ],
      note: 'Use industrial clusters and trade corridors to build lane-specific capabilities.',
      takeaway: 'Changing manufacturing geography increases demand for flexible local execution connected to international networks.',
    },
  },
  'logistics-freight-m5-9': {
    heading: 'From a commodity quote to integrated, specialized or digital relationships',
    intro: 'Ocean, customs, inland, warehousing, reporting and cargo expertise can be delivered through one coordinated relationship instead of a single price.',
    spec: {
      layout: 'pathway', title: '09 How Are Integrated Logistics and Digital Distribution Models Developing?', kicker: '',
      trunk: [{ label: 'Commodity freight quote', detail: 'Competes on price alone' }],
      optionsLabel: 'Ways to move beyond price — alternatives, not steps',
      options: [
        { label: 'Integrated forwarding', detail: 'Ocean, customs, inland and warehousing together' },
        { label: 'Specialized cargo', detail: 'E.g. a reefer program with monitoring' },
        { label: 'Digital acquisition', detail: 'Customers won through online channels' },
        { label: 'Customer solutions', detail: 'Reporting designed around one shipper' },
      ],
      afterLabel: 'Relationship locked in by',
      after: [
        { label: 'Long-term contracts', detail: 'Committed scope and pricing' },
        { label: 'Performance reviews', detail: 'Accountability for returns', kind: 'outcome' },
      ],
      note: 'Add service scope only where capability, pricing and accountability support returns.',
      takeaway: 'Integration and specialization can move providers beyond commodity price competition.',
    },
  },
  'logistics-freight-m5-11': {
    heading: 'Credible decarbonization combines vessel, fuel, utilization and measurement levers',
    intro: 'Decarbonization involves vessel operations, fuel availability, safety, infrastructure, lifecycle emissions and customer reporting, set against the 2023 IMO Strategy.',
    spec: {
      layout: 'driverTree', title: '11 How Are Decarbonization and Environmental Requirements Reshaping Ocean Shipping?', kicker: '',
      root: { label: 'Credible emissions reduction', detail: 'Measured, not just claimed' },
      drivers: [
        { label: 'Vessel efficiency', detail: 'How ships are operated', children: [{ label: 'Vessel operations' }] },
        { label: 'Alternative fuels', detail: 'Evaluated realistically', children: [{ label: 'Fuel availability' }, { label: 'Safety' }, { label: 'Infrastructure' }, { label: 'Lifecycle emissions' }] },
        { label: 'Container utilization', detail: 'Fuller boxes, fewer moves' },
        { label: 'Measurement', detail: 'Disclosed method and data', children: [{ label: 'Activity data' }, { label: 'Assumptions' }] },
      ],
      note: 'The 2023 IMO Strategy gives primary climate context; detailed obligations depend on applicable IMO instruments and implementation.',
      takeaway: 'Decarbonization requires credible measurement and realistic technology and fuel evaluation.',
    },
  },
  'logistics-freight-m5-12': {
    heading: 'Test every emissions claim before it reaches a customer',
    intro: 'Customers increasingly expect emissions figures and green claims to be supported by disclosed methods, activity data and assumptions.',
    spec: {
      layout: 'decision', title: '12 How Are Supply-Chain Security and Compliance Expectations Evolving?', kicker: '',
      root: { label: 'Customer emissions request', detail: 'Speed and routing choices, reported emissions' },
      question: 'Is the claim backed by a disclosed method and data?',
      branches: [
        { condition: 'Method, activity data and assumptions disclosed', outcome: 'Report transparently', tone: 'positive' },
        { condition: 'Estimate with gaps', outcome: 'Disclose limits, improve with carriers', detail: 'Green collaboration on data', tone: 'caution' },
        { condition: 'No supporting method', outcome: 'Do not make the green claim', tone: 'negative' },
      ],
      note: 'Work with carriers and shippers on efficiency and transparent reporting rather than unsupported green claims.',
      takeaway: 'Decarbonization requires credible measurement and realistic technology and fuel evaluation.',
    },
  },
  'logistics-freight-m5-13': {
    heading: 'Demand comes from trade; profit depends on model, differentiation and cost',
    intro: 'Manufacturing specialization, sourcing, industrial inputs and finished goods sustain demand amid trade policy, geopolitics and fleet changes.',
    spec: {
      layout: 'driverTree', title: '13 What Factors Will Drive Future Freight and Ocean Logistics Demand?', kicker: '',
      root: { label: 'Future demand captured profitably', detail: 'Volume alone is not profit' },
      drivers: [
        { label: 'Trade volume', detail: 'Specialization, sourcing, inputs and finished goods', children: [{ label: 'International trade' }] },
        { label: 'Service model', detail: 'Broader scope per customer', children: [{ label: 'Integrated logistics' }, { label: 'Digital services' }] },
        { label: 'Differentiation', detail: 'Capabilities others lack', children: [{ label: 'Specialized cargo' }, { label: 'Resilience solutions' }] },
        { label: 'Cost', detail: 'Margin protection', children: [{ label: 'Operational efficiency' }] },
      ],
      note: 'UNCTAD projects 2026–2030 seaborne trade growth near 2% annually and containerized trade 2.3% — volume forecasts, not forwarder revenue or margin.',
      takeaway: 'Long-term demand remains, but sustainable profit depends on model, capacity, cost and differentiation.',
    },
  },
  'logistics-freight-m5-14': {
    heading: 'Vietnam’s activity signals point to specific services to build',
    intro: 'Trade value and port scale support forwarding, customs, inland, warehousing, specialized cargo, visibility and sustainability services — but each indicator measures something different.',
    spec: {
      layout: 'table', title: '14 Where Are New Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      headers: ['Opportunity', 'Signal (and what it is not)', 'What to build'],
      rows: [
        { label: 'Export specialization', a: 'US$930.05B 2025 trade value — not freight revenue', b: 'Export-sector solutions and agents' },
        { label: 'Port-inland connectivity', a: '34.36M TEU 2025 estimate — port handling, not company volume', b: 'Corridor and inland links' },
        { label: 'Integrated logistics', a: '12–15% annual growth target — policy, not result', b: 'Customs, warehousing, digital documents' },
      ],
      note: '2025 trade value and port TEU indicate activity but not the same demand or operator economics.',
      takeaway: 'Vietnam can capture more value through reliable networks, integration and technical capability—not volume alone.',
    },
  },
  'logistics-freight-m5-15': {
    heading: 'Positioning choices that win on capability rather than volume',
    intro: 'Future competition rewards forwarders that add international agents, digital upgrading and specialized cargo capability on the lanes they serve.',
    spec: {
      layout: 'decision', title: '15 How Should Freight Forwarders Position Themselves for Future Competition?', kicker: '',
      root: { label: 'Forwarder positioning', detail: 'Where to invest next' },
      question: 'Which capability gap limits value on target lanes?',
      branches: [
        { condition: 'Thin overseas coverage', outcome: 'Build international agents', detail: 'Reliable destination execution', tone: 'positive' },
        { condition: 'Manual documents and updates', outcome: 'Prioritize digital upgrading', detail: 'Digital documents and visibility', tone: 'positive' },
        { condition: 'Strong export-sector demand', outcome: 'Develop specialized cargo offers', detail: 'Skills and qualified partners', tone: 'positive' },
        { condition: 'Competing on rate alone', outcome: 'Volume without retained value', tone: 'negative' },
      ],
      note: 'Build export-sector solutions, agents, carrier access, digital documents, skills and corridor connectivity.',
      takeaway: 'Vietnam can capture more value through reliable networks, integration and technical capability—not volume alone.',
    },
  },
};
