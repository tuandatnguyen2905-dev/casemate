import type { LogisticsFreightChapterVisual } from './logisticsFreightVisualSpecs';

/** Chapter-specific Learning Visuals for Freight Forwarding & Ocean Logistics Module 04 (competition), keyed by visualKind. */
export const LOGISTICS_FREIGHT_M4_VISUALS: Record<string, LogisticsFreightChapterVisual> = {
  'logistics-freight-m4-1': {
    heading: 'Freight competition is several overlapping arenas, not one market',
    intro: 'Global and local forwarding, liner shipping, terminals, trade-lane specialists, cargo experts and digital services compete with different roles and assets.',
    spec: {
      layout: 'taxonomy', title: '01 How Competitive Is Freight Forwarding & Ocean Logistics?', kicker: '',
      root: 'Competitive arenas', rootDetail: 'Distinct roles, assets and customer relationships',
      groups: [
        { label: 'Global integrators', detail: 'Multinational forwarding networks' },
        { label: 'Local forwarders', detail: 'Local service on specific lanes' },
        { label: 'Shipping lines', detail: 'Sell vessel capacity' },
        { label: 'Terminals', detail: 'Port handling capacity' },
        { label: 'Specialists', items: ['Trade-lane specialists', 'Cargo experts'], detail: 'Depth in one lane or cargo type' },
        { label: 'Digital services', detail: 'Technology-led quoting and visibility' },
      ],
      note: 'A carrier sells vessel capacity while a forwarder may compare several carriers for one customer.',
      takeaway: 'Competition combines distinct roles, assets and customer relationships rather than one market.',
    },
  },
  'logistics-freight-m4-2': {
    heading: 'Five forces pressing on forwarding margins',
    intro: 'Forwarders face rivals across global, regional and specialist players, depend on carriers and ports for capacity, and meet new digital entrants.',
    spec: {
      layout: 'driverTree', title: "02 How Do Porter's Five Forces Apply to Freight Forwarding?", kicker: '',
      root: { label: 'Forwarding industry profitability', detail: 'Shaped by five competitive forces' },
      drivers: [
        { label: 'Rivalry', detail: 'Many providers on the same lanes', children: [{ label: 'Global integrators' }, { label: 'Regional forwarders' }, { label: 'Specialists' }] },
        { label: 'Supplier power', detail: 'Capacity and handling come from others', children: [{ label: 'Shipping lines' }, { label: 'Ports' }] },
        { label: 'Buyer power', detail: 'Shippers can compare several quotes' },
        { label: 'New entrants', detail: 'Can quote quickly with technology', children: [{ label: 'Digital entrants' }] },
        { label: 'Substitutes', detail: 'Carriers selling capacity direct to shippers' },
      ],
      note: 'Advantage comes from choosing where scale, lane expertise, port position, local service or technology helps.',
      takeaway: 'Competition combines distinct roles, assets and customer relationships rather than one market.',
    },
  },
  'logistics-freight-m4-3': {
    heading: 'What a new entrant lacks — and how incumbents prove it',
    intro: 'Barriers come from carrier and agent access, systems, trust, compliance, cash and specialized handling; shipping and ports add vessels, containers and terminals.',
    spec: {
      layout: 'table', title: '03 What Creates Competitive Barriers and Advantages?', kicker: '',
      headers: ['Barrier', 'What a new broker may lack', 'How to build proof'],
      rows: [
        { label: 'Network access', a: 'Carrier allocations and overseas agents', b: 'Partner quality on target lanes' },
        { label: 'Operational credibility', a: 'Reliable overseas execution', b: 'Route performance record' },
        { label: 'Working capital', a: 'Credit to pay partners first', b: 'Cash discipline and credit terms' },
        { label: 'Specialized knowledge', a: 'Claims and compliance capability', b: 'Documentation accuracy' },
        { label: 'Technology', a: 'Systems beyond a quoting tool', b: 'Integrated, reliable data' },
        { label: 'Customer switching', a: 'A reason to move accounts', b: 'Customer retention' },
      ],
      note: 'A new broker can quote rates but may lack allocations, credit, claims capability and reliable overseas execution.',
      takeaway: 'Freight-forwarding barriers are often relationships, execution and finance; shipping and ports add capital and network scale.',
    },
  },
  'logistics-freight-m4-4': {
    heading: 'Three global forwarders, compared on what each lane actually delivers',
    intro: 'Multinational providers offer forwarding plus customs, inland, warehousing and supply-chain services with differing strengths. Examples are listed alphabetically, not ranked.',
    spec: {
      layout: 'table', title: '04 Who Are the Major Global Freight and Ocean Logistics Participants?', kicker: '',
      headers: ['Provider (alphabetical)', 'Official-source context', 'Check on your lane'],
      rows: [
        { label: 'CEVA Logistics', a: 'Forwarding and integrated logistics', b: 'Trade-lane execution' },
        { label: 'DHL Global Forwarding', a: 'Global forwarding and logistics portfolio', b: 'Account service and technology' },
        { label: 'DSV', a: 'Transport and logistics', b: 'Local partner depth' },
      ],
      note: 'Parent-company scale does not guarantee identical service on every Vietnam lane.',
      takeaway: 'Global providers compete through networks, procurement, standardized operations and integrated accounts.',
    },
  },
  'logistics-freight-m4-5': {
    heading: 'Forwarders sell coordination; shipping lines sell vessel capacity',
    intro: 'Forwarders such as Kuehne+Nagel and Expeditors compete through networks, procurement and integrated accounts, while shipping companies compete on the capacity they operate.',
    spec: {
      layout: 'compare', title: '05 How Do Freight Forwarders and Shipping Companies Compete Differently?', kicker: '',
      leftTitle: 'Freight forwarder (e.g. Kuehne+Nagel, Expeditors)', rightTitle: 'Shipping company',
      rows: [
        { label: 'What is sold', a: 'Coordinated multi-carrier service', b: 'Space on its own vessels' },
        { label: 'Main lever', a: 'Procurement across several carriers', b: 'Network and fleet deployment' },
        { label: 'Account model', a: 'Integrated accounts with customs, inland, warehousing', b: 'Capacity contracts with shippers and forwarders' },
        { label: 'Local execution', a: 'Depends on local partner depth per lane', b: 'Depends on port calls on the lane' },
      ],
      note: 'Compare trade-lane execution, account service, technology and local partner depth rather than parent-company scale.',
      takeaway: 'Global providers compete through networks, procurement, standardized operations and integrated accounts.',
    },
  },
  'logistics-freight-m4-6': {
    heading: 'Global carriers and Vietnamese operators shape the same lanes in different roles',
    intro: 'Global vessel networks and Vietnamese providers spanning ports, forwarding, warehousing and inland services all influence Vietnam’s freight flows. Names are listed alphabetically, not ranked.',
    spec: {
      layout: 'taxonomy', title: "06 Which Companies and Infrastructure Operators Shape Vietnam's Logistics Industry?", kicker: '',
      root: 'Who shapes Vietnam’s freight lanes', rootDetail: 'Different businesses — not directly comparable',
      groups: [
        { label: 'Global container carriers', items: ['CMA CGM', 'COSCO SHIPPING', 'Hapag-Lloyd', 'Maersk', 'MSC'], detail: 'Global vessel networks' },
        { label: 'Vietnamese port and logistics providers', items: ['Gemadept', 'Transimex'], detail: 'Ports, forwarding, warehousing and inland services' },
        { label: 'Measure each on its own terms', items: ['Port throughput', 'Forwarder gross profit', 'Carrier network'], detail: 'Different financial definitions' },
      ],
      note: 'A port operator’s throughput and a forwarder’s gross profit measure different businesses. Evaluate actual service scope, ports, lanes, customers and assets.',
      takeaway: 'Carriers, forwarders and port operators are connected but not directly comparable in every segment.',
    },
  },
  'logistics-freight-m4-7': {
    heading: 'Benchmark forwarders lane by lane, not by network size',
    intro: 'Comparisons should use operating measures relevant to the role: forwarders on booking and documents, carriers on fleet, utilization and schedules.',
    spec: {
      layout: 'table', title: '07 How Should Freight Forwarders Be Compared?', kicker: '',
      headers: ['Benchmark', 'What it shows', 'Compare on'],
      rows: [
        { label: 'Route coverage', a: 'Lanes the forwarder truly serves', b: 'Lanes target exporters use' },
        { label: 'Capacity access', a: 'Ability to secure space', b: 'Allocations in tight markets' },
        { label: 'Schedule reliability', a: 'Services meeting a defined tolerance', b: 'Same tolerance and route' },
        { label: 'Documentation accuracy', a: 'Error-free bookings and records', b: 'Corrections per shipment' },
        { label: 'Exception response', a: 'Speed and quality of recovery', b: 'Like-for-like disruptions' },
        { label: 'Visibility', a: 'Milestones the customer can see', b: 'Accuracy, not dashboard count' },
      ],
      note: 'Rate benchmarks such as the World Container Index use a 40-foot, dry FAK, CY-to-CY basis and exclude inland and specialized containers.',
      takeaway: 'Route-specific reliability is more useful than broad network size alone.',
    },
  },
  'logistics-freight-m4-8': {
    heading: 'Headline rate and volume versus total cost, retention and cash',
    intro: 'Commercial comparisons must cover base freight, surcharges, local and inland charges, revenue recognition, contribution, renewal and cash.',
    spec: {
      layout: 'compare', title: '08 How Do Volume, Networks, Service Quality and Profitability Differ?', kicker: '',
      leftTitle: 'Headline view', rightTitle: 'Commercial-strength view',
      rows: [
        { label: 'Price', a: 'Lowest base rate', b: 'Total shipment cost incl. local and inland' },
        { label: 'Revenue', a: 'Gross billings', b: 'Net, like-for-like recognized revenue' },
        { label: 'Customer', a: 'New volume won', b: 'Retention and renewal' },
        { label: 'Cash', a: 'Revenue booked', b: 'Working capital tied up' },
      ],
      note: 'A low headline rate may exclude origin, destination or inland cost and create a higher total.',
      takeaway: 'Commercial strength combines transparent scope, retained margin and customer loyalty.',
    },
  },
  'logistics-freight-m4-9': {
    heading: 'Lasting advantage combines retained margin, diversified accounts and differentiation',
    intro: 'Sustainable advantage shows in gross profit kept after full costs, accounts that are not overly concentrated and service customers will stay for.',
    spec: {
      layout: 'driverTree', title: '09 Which Capabilities Explain Sustainable Competitive Advantage?', kicker: '',
      root: { label: 'Sustainable competitive advantage', detail: 'Strength that survives rate cycles' },
      drivers: [
        { label: 'Retained gross profit', detail: 'Margin kept after surcharges and local costs', children: [{ label: 'Transparent scope' }, { label: 'Buy-sell discipline' }] },
        { label: 'Account concentration', detail: 'Exposure to a few large customers', children: [{ label: 'Customer mix' }] },
        { label: 'Service differentiation', detail: 'Reasons customers renew', children: [{ label: 'Customer loyalty' }, { label: 'Retention' }] },
      ],
      note: 'Normalize gross versus net revenue and compare like-for-like service boundaries.',
      takeaway: 'Commercial strength combines transparent scope, retained margin and customer loyalty.',
    },
  },
  'logistics-freight-m4-10': {
    heading: 'Cheap capacity only helps if it actually sails and delivers',
    intro: 'Carrier relationships decide capacity, cost and booking certainty. Cheap capacity is not an advantage when rollovers or weak destination service damage customer outcomes.',
    spec: {
      layout: 'decision', title: '10 Why Do Carrier Relationships and Capacity Access Matter?', kicker: '',
      root: { label: 'Capacity for a booking', detail: 'From carrier relationships and allocations' },
      question: 'Is this capacity both affordable and reliable on the lane?',
      branches: [
        { condition: 'Allocation with reliable sailing', outcome: 'Use as primary capacity', detail: 'Plan with lane forecasts', tone: 'positive' },
        { condition: 'Cheaper but rollover risk', outcome: 'Keep a qualified alternative', detail: 'Protect cargo readiness dates', tone: 'caution' },
        { condition: 'Weak destination service', outcome: 'Do not book on price alone', detail: 'Customer outcome suffers', tone: 'negative' },
      ],
      note: 'Spot indices are dated route snapshots: the World Container Index composite rose 2% to US$4,585 per 40-foot container on 22 October 2026, not every shipment or contract rate.',
      takeaway: 'Competitive procurement and reliable execution reinforce each other.',
    },
  },
  'logistics-freight-m4-11': {
    heading: 'Procurement and standard work reinforce each other in a loop',
    intro: 'Cost efficiency starts with procurement, but supplier performance, standard work and exception handling determine whether savings survive execution.',
    spec: {
      layout: 'flow', title: '11 How Do Cost Efficiency and Operational Reliability Create Advantage?', kicker: '',
      steps: [
        { label: 'Lane planning', detail: 'Forecast volumes and cargo readiness', owner: 'Forwarder' },
        { label: 'Procurement', detail: 'Secure competitive allocations', owner: 'Procurement team' },
        { label: 'Standard work', detail: 'Consistent booking and documentation', owner: 'Operations' },
        { label: 'Supplier performance', detail: 'Score carriers and agents on delivery', kind: 'decision', owner: 'Partner governance' },
        { label: 'Lower cost, fewer failures', kind: 'outcome', owner: 'Customer and forwarder' },
      ],
      loop: 'Supplier performance data feeds the next procurement round.',
      note: 'Use lane forecasts, allocations, qualified alternatives and clear operating controls.',
      takeaway: 'Competitive procurement and reliable execution reinforce each other.',
    },
  },
  'logistics-freight-m4-12': {
    heading: 'Trust grows when tracking data triggers an accountable response',
    intro: 'Milestones, customer updates, records, claims evidence and risk information only build trust when someone acts on them.',
    spec: {
      layout: 'flow', title: '12 How Do Global Networks, Technology and Customer Trust Support Growth?', kicker: '',
      steps: [
        { label: 'Milestone tracked', detail: 'Carrier and terminal events captured', owner: 'Tracking system' },
        { label: 'Data checked', detail: 'Records validated before sharing', owner: 'Document controls' },
        { label: 'Customer update', detail: 'ETA shared with its uncertainty', owner: 'Account team' },
        { label: 'Accountable action', detail: 'Inventory or delivery decision prompted', kind: 'decision', owner: 'Customer and operator' },
        { label: 'Evidence retained', detail: 'Supports claims and liability review', kind: 'outcome', owner: 'Forwarder' },
      ],
      note: 'Emissions reporting follows the same rule: transparent methods. The 2023 IMO Strategy gives climate context; detailed obligations depend on applicable instruments.',
      takeaway: 'Visibility creates value when accurate data triggers accountable decisions.',
    },
  },
  'logistics-freight-m4-13': {
    heading: 'Essential demand on one side, volatile thin margins on the other',
    intro: 'The industry’s strength is its trade-connectivity role; its weaknesses are rate volatility and thin margins.',
    spec: {
      layout: 'compare', title: "13 What Are the Industry's Main Strengths and Weaknesses?", kicker: '',
      leftTitle: 'Strengths', rightTitle: 'Weaknesses',
      rows: [
        { label: 'Demand', a: 'Essential role in trade connectivity', b: 'Cyclical, disruption-prone volumes' },
        { label: 'Pricing', a: 'Value in reliable execution', b: 'Rate volatility and price competition' },
        { label: 'Margin', a: 'Digital and specialty growth areas', b: 'Thin margins, weak buy-sell discipline' },
        { label: 'Vietnam', a: 'Trade growth creates demand', b: 'Demand does not guarantee margin' },
      ],
      note: 'Seaborne-trade volume grew 2.2% in 2024 with 0.5% forecast for 2025 — physical volumes, not forwarding revenue.',
      takeaway: 'Durable demand coexists with cyclical rates, disruption and intense price competition.',
    },
  },
  'logistics-freight-m4-14': {
    heading: 'Integrated and specialty services as opportunities; capacity, partners and geopolitics as threats',
    intro: 'Opportunities lie in integrated and specialty services on attractive lanes; threats come from capacity swings, partner dependence and geopolitics.',
    spec: {
      layout: 'table', title: '14 What Opportunities and Threats Shape Global Freight Markets?', kicker: '',
      headers: ['Factor', 'Opportunity or threat', 'Strategic response'],
      rows: [
        { label: 'Network opportunity', a: 'Opportunity', b: 'Focus on attractive lanes and sectors' },
        { label: 'Integrated services', a: 'Opportunity', b: 'Deepen accounts beyond the ocean leg' },
        { label: 'Specialty services', a: 'Opportunity', b: 'Build cargo expertise' },
        { label: 'Capacity swings', a: 'Threat', b: 'Allocations and alternatives' },
        { label: 'Partner dependence', a: 'Threat', b: 'Qualified backup partners' },
        { label: 'Geopolitical threat', a: 'Threat', b: 'Route contingency planning' },
      ],
      note: 'Vietnam’s 2025 merchandise exports of US$475.04B and imports of US$455.01B are trade values, not freight revenue or cargo volume.',
      takeaway: 'Durable demand coexists with cyclical rates, disruption and intense price competition.',
    },
  },
  'logistics-freight-m4-15': {
    heading: 'Risk controls embedded at every stage from quote to collection',
    intro: 'Rate validity, alternative carriers, record checks, escalation, receivables, foreign exchange and compliance each belong to a specific stage of the shipment.',
    spec: {
      layout: 'flow', title: '15 What Strategic Choices Must Freight Forwarders Make?', kicker: '',
      steps: [
        { label: 'Quotation', detail: 'Rate risk: clear validity after carrier cost check', owner: 'Sales' },
        { label: 'Procurement', detail: 'Capacity risk: alternative carriers, partner backups', owner: 'Procurement' },
        { label: 'Documentation', detail: 'Compliance: customs, sanctions, dangerous goods checks', owner: 'Operations' },
        { label: 'Execution', detail: 'Disruption: escalation and continuity plans', owner: 'Operations' },
        { label: 'Billing and collection', detail: 'Credit and currency: limits and FX exposure', kind: 'outcome', owner: 'Finance' },
      ],
      note: 'A quote made before carrier cost confirmation can lose money when rates or surcharges move.',
      takeaway: 'Risk management must be embedded in quotation, procurement, execution and communication.',
    },
  },
};
