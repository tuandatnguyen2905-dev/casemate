import type { LogisticsFreightChapterVisual } from './logisticsFreightVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Freight Forwarding & Ocean Logistics Module 03 (business models), keyed by visualKind. */
export const LOGISTICS_FREIGHT_M3_VISUALS: Record<string, LogisticsFreightChapterVisual> = {
  'logistics-freight-m3-1': {
    heading: 'Forwarding earnings rest on role, procurement, accounts and cash',
    intro: 'Forwarders arrange third-party transport for principals, while an NVOCC purchases capacity and issues its own transport arrangements. Account management and working capital decide whether that model scales.',
    spec: {
      layout: 'driverTree', title: '01 How Do Freight Forwarding Companies Make Money?', kicker: '',
      root: { label: 'Asset-light forwarding earnings', detail: 'Scale comes from procurement and networks, not owned vessels' },
      drivers: [
        { label: 'Forwarder role', detail: 'Arranges third-party transport on behalf of principals', children: [{ label: 'Service fees' }, { label: 'Carrier coordination' }] },
        { label: 'NVOCC role', detail: 'Purchases capacity and issues its own transport arrangements', children: [{ label: 'Buy-sell spread' }, { label: 'Contractual exposure' }] },
        { label: 'Account management', detail: 'Keeps shippers returning with trusted service', children: [{ label: 'Customer trust' }, { label: 'Partner network' }] },
        { label: 'Working capital', detail: 'Funds the gap between paying partners and collecting from customers' },
      ],
      note: 'NVOCC legal meaning and obligations depend on jurisdiction. Confirm licensing and role before comparing responsibilities, liability and revenue.',
      takeaway: 'Asset-light models scale through procurement and networks but depend on partners, trust and working capital.',
    },
  },
  'logistics-freight-m3-2': {
    heading: 'Agent, forwarder/NVOCC and carrier roles carry rising contract risk',
    intro: 'An agent earns fees for a principal, while a forwarder or NVOCC can carry greater buy-sell and contractual exposure. The carrier supplies the capacity both arrange around.',
    spec: {
      layout: 'table', title: '02 How Do Freight Forwarders, NVOCCs and Ocean Carriers Differ?', kicker: '',
      headers: ['Role', 'What it does', 'Contract risk it carries'],
      rows: [
        { label: 'Agent', a: 'Represents a principal and earns fees', b: 'Lower: acts for someone else' },
        { label: 'Forwarder', a: 'Arranges third-party transport for the shipper', b: 'Depends on contractual role and scope' },
        { label: 'NVOCC', a: 'Buys capacity, consolidates cargo, issues own arrangements', b: 'Higher: buy-sell and contractual exposure' },
        { label: 'Ocean carrier', a: 'Provides the vessel capacity others buy', b: 'Carries the ocean movement itself' },
      ],
      note: 'Legal meaning depends on jurisdiction and contract. Confirm licensing and role before comparing liability and revenue.',
      takeaway: 'Asset-light roles scale through procurement and networks but depend on partners, trust and working capital.',
    },
  },
  'logistics-freight-m3-3': {
    heading: 'Owning vessels, containers and terminals trades control for fixed-cost risk',
    intro: 'Shipping lines and terminals own heavy assets, while hybrid providers combine owned and subcontracted ocean, inland, warehouse and customs services.',
    spec: {
      layout: 'compare', title: '03 How Do Asset-Light and Asset-Intensive Logistics Models Compare?', kicker: '',
      leftTitle: 'Asset-light provider', rightTitle: 'Asset-intensive operator',
      rows: [
        { label: 'Core assets', a: 'Uses partners’ vessels, containers and terminals', b: 'Owns vessels, containers, terminals or multimodal assets' },
        { label: 'Control', a: 'Relies on partner execution', b: 'Greater control over capacity and handling' },
        { label: 'Cost base', a: 'Mostly variable, bought per shipment', b: 'High fixed cost that must be utilized' },
        { label: 'Main risk', a: 'Partner dependence', b: 'Utilization falls below lifecycle needs' },
        { label: 'Growth lever', a: 'Integrated contracts across subcontractors', b: 'Network optimization of owned assets' },
      ],
      note: 'Hybrid providers sit between the two. Choose assets only where lane density and customer demand support lifecycle returns.',
      takeaway: 'Asset-based models gain control but carry high fixed-cost and utilization risk.',
    },
  },
  'logistics-freight-m3-4': {
    heading: 'Services split by volume, cargo type and door-to-door scope',
    intro: 'Container and specialized products are segmented by volume, cargo, route, deadline, equipment and handling.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Freight Forwarding Services Segmented?', kicker: '',
      root: 'Freight forwarding services', rootDetail: 'Segments — choose by cargo and need, not base rate alone',
      groups: [
        { label: 'By container volume', items: ['FCL', 'LCL'], detail: 'One shipper’s container or shared container space' },
        { label: 'By cargo requirement', items: ['Reefer', 'Dangerous goods', 'Project cargo'], detail: 'Special equipment and handling' },
        { label: 'By service scope', items: ['CY-to-CY', 'Door-to-door'], detail: 'How much of the journey is covered' },
        { label: 'By route and deadline', items: ['Direct service', 'Transshipment'], detail: 'Speed versus price for time-sensitive cargo' },
      ],
      note: 'A direct service may justify a premium over transshipment for time-sensitive cargo. Match factory location and destination to carrier schedules, equipment and inland options.',
      takeaway: 'The right service depends on total performance, handling and charges—not base rate alone.',
    },
  },
  'logistics-freight-m3-5': {
    heading: 'Supporting services layer onto the core container move',
    intro: 'Customs coordination, cargo-insurance arrangement and inventory coordination can be added to FCL, LCL or specialized moves. Each adds responsibility as well as value.',
    spec: {
      layout: 'pathway', title: '05 How Do FCL, LCL and Specialized Cargo Services Differ?', kicker: '',
      trunk: [
        { label: 'Core container move', detail: 'FCL, LCL or specialized handling' },
        { label: 'Defined customer problem', detail: 'What the exporter cannot coordinate alone' },
      ],
      optionsLabel: 'Supporting services — add only what solves the problem',
      options: [
        { label: 'Customs coordination', detail: 'Documents and border procedures' },
        { label: 'Insurance support', detail: 'Arranging cargo insurance' },
        { label: 'Inventory coordination', detail: 'Warehouse and distribution' },
      ],
      afterLabel: 'Before expanding',
      after: [
        { label: 'Qualified provider, clear scope', detail: 'Pricing and accountability agreed' },
        { label: 'Retention', detail: 'Only if the service stays profitable', kind: 'outcome' },
      ],
      note: 'Integrated origin services reduce exporter coordination but add responsibility and partner risk.',
      takeaway: 'Supporting services create retention when they solve a defined customer problem profitably.',
    },
  },
  'logistics-freight-m3-6': {
    heading: 'Price builds up from route, service level and cargo handling needs',
    intro: 'Warehousing, documents and special handling each add cost and responsibility on top of the transport itself, so the quote must reflect them.',
    spec: {
      layout: 'driverTree', title: '06 How Do Service Levels, Routes and Cargo Requirements Influence Pricing?', kicker: '',
      root: { label: 'Shipment price', detail: 'Transport plus every service layered on it' },
      drivers: [
        { label: 'Route', detail: 'Ocean leg, origin and destination legs', op: '+' },
        { label: 'Service level', detail: 'How much coordination the shipper hands over', op: '+', children: [{ label: 'Origin services' }, { label: 'Destination services' }] },
        { label: 'Warehousing', detail: 'Storage and distribution scope', op: '+' },
        { label: 'Documents', detail: 'Preparation and customs coordination', op: '+' },
        { label: 'Special handling', detail: 'Equipment and partner risk for specialized cargo', op: '+' },
      ],
      note: 'Expand only with qualified providers, clear scope, pricing and accountability; every added service also adds partner risk.',
      takeaway: 'Supporting services create retention only when they solve a defined customer problem profitably.',
    },
  },
  'logistics-freight-m3-7': {
    heading: 'Freight buyers differ by what the cargo does in their operations',
    intro: 'Buyers move raw materials, machinery, components and finished goods with varying timing, expertise and compliance needs.',
    spec: {
      layout: 'taxonomy', title: '07 Who Purchases Freight Forwarding Services?', kicker: '',
      root: 'Who buys freight forwarding', rootDetail: 'Customer types — each values transport differently',
      groups: [
        { label: 'Exporters', items: ['Export orders', 'Finished goods'], detail: 'Need documents and service levels' },
        { label: 'Industrial importers', items: ['Raw materials', 'Machinery', 'Components'], detail: 'Feed production lines' },
        { label: 'Schedule-driven manufacturers', items: ['Production schedules', 'Visibility'], detail: 'Value reliable arrival and exception warning' },
        { label: 'Vietnam sectors', items: ['Electronics', 'Apparel', 'Furniture', 'Machinery', 'Agriculture'], detail: 'Distinct routes and controls' },
      ],
      note: 'Vietnam’s 2025 exports of US$475.04B and imports of US$455.01B are FOB and CIF trade values, not freight revenue or cargo volume.',
      takeaway: 'Logistics value depends on how transport affects the customer’s operating model.',
    },
  },
  'logistics-freight-m3-8': {
    heading: 'Each cargo need translates into a specific carrier and partner requirement',
    intro: 'Planned inventory and cargo requiring temperature, security, classification, lifting, permits or special equipment shape which carriers and partners qualify.',
    spec: {
      layout: 'table', title: '08 What Determines Shipper Requirements and Carrier Selection?', kicker: '',
      headers: ['Shipper need', 'Requirement', 'What the carrier or partner must offer'],
      rows: [
        { label: 'Retail replenishment', a: 'Planned inventory timing', b: 'Schedules that fit the replenishment plan' },
        { label: 'Reefer', a: 'Temperature control', b: 'Reefer equipment and monitoring' },
        { label: 'Project cargo', a: 'Lifting, permits, route limits', b: 'Route surveys, cranes, tailored insurance' },
      ],
      note: 'Develop specialty offers around real customer pipelines and qualified partners.',
      takeaway: 'Specialized expertise can support differentiation when controls and returns justify complexity.',
    },
  },
  'logistics-freight-m3-9': {
    heading: 'Cargo risk decides whether cost, reliability or visibility leads',
    intro: 'E-commerce inventory, dangerous goods and high-value cargo each shift the weight a shipper puts on price, dependable arrival and tracking.',
    spec: {
      layout: 'decision', title: '09 How Do Cost, Reliability and Visibility Influence Logistics Decisions?', kicker: '',
      root: { label: 'Cargo to move', detail: 'Planned inventory or specialized cargo' },
      question: 'What does a failure cost this shipper?',
      branches: [
        { condition: 'E-commerce inventory', outcome: 'Weight reliability and visibility', detail: 'Late stock disrupts planned sales', tone: 'caution' },
        { condition: 'Dangerous goods', outcome: 'Pay for classification and controls', detail: 'Compliance failure outweighs rate savings', tone: 'negative' },
        { condition: 'High-value cargo', outcome: 'Prioritize security and tracking', detail: 'Loss exposure exceeds freight cost', tone: 'caution' },
        { condition: 'Flexible, standard cargo', outcome: 'Cost can lead the choice', tone: 'positive' },
      ],
      note: 'Specialty handling is worth offering only where controls and returns justify the complexity.',
      takeaway: 'Specialized expertise can support differentiation when controls and returns justify complexity.',
    },
  },
  'logistics-freight-m3-10': {
    heading: 'One hypothetical shipment: from sell rate to USD300 gross profit',
    intro: 'Forwarders earn freight spreads plus documentation, customs, consolidation and value-added fees. This hypothetical shipment shows how billings become gross profit.',
    spec: {
      layout: 'waterfall', title: '10 How Do Freight Forwarders Generate Revenue?', kicker: H,
      unit: 'USD per shipment', basis: `${H} — margin = 300 / 1,400 = 21.4%`,
      items: [
        { label: 'Freight sell rate', value: 1250, kind: 'start' },
        { label: 'Additional services', value: 150, kind: 'add' },
        { label: 'Gross revenue', value: 1400, kind: 'total' },
        { label: 'Ocean buy rate', value: 1000, kind: 'subtract' },
        { label: 'Other direct cost', value: 100, kind: 'subtract' },
        { label: 'Gross profit', value: 300, kind: 'total' },
      ],
      note: 'Illustrative values, not market quotations. Revenue can include origin, destination, documentation, customs, consolidation and value-added fees; principal-versus-agent accounting changes recognized revenue.',
      takeaway: 'Gross billings, recognized revenue and cash depend on principal-versus-agent accounting and contract scope.',
    },
  },
  'logistics-freight-m3-11': {
    heading: 'More shipments can still mean less gross profit',
    intro: 'Shipment cost spans ocean transport, terminal and inland services, containers, documents, labor, systems, insurance and financing. When those costs squeeze the spread, volume growth can hide falling profit.',
    spec: {
      layout: 'scenario', title: '11 What Determines Freight and Logistics Service Costs?', kicker: H,
      inputs: [
        { key: 'shipments', label: 'Shipments handled', min: 50, max: 200, step: 10, value: 140, unit: 'shipments' },
        { key: 'gp', label: 'Gross profit per shipment', min: 100, max: 400, step: 10, value: 180, unit: 'USD' },
      ],
      outputs: [
        { label: 'Total gross profit', unit: 'USD', digits: 0, compute: (v) => v.shipments * v.gp },
        { label: 'Change vs 100 shipments at USD300', unit: '%', digits: 0, compute: (v) => ((v.shipments * v.gp) / 30000 - 1) * 100 },
      ],
      assumption: `${H}. Baseline: 100 shipments × USD300 = USD30,000. Defaults reproduce 140 × USD180 = USD25,200, a 16% decline despite 40% more shipments.`,
      note: 'Cost drivers to track: carrier buy rate, terminal charge, inland transport, container cost, documentation, labor and IT, insurance and claims, working capital.',
      takeaway: 'Volume can rise while profit falls, so revenue growth alone does not prove profitability.',
    },
  },
  'logistics-freight-m3-12': {
    heading: 'Profitability KPIs only compare when scope and denominators align',
    intro: 'Shipment count differs from TEU, gross profit from operating profit, and carrier schedule reliability from end-to-end delivery. Each KPI needs its own aligned population.',
    spec: {
      layout: 'driverTree', title: '12 Which KPIs Drive Freight Forwarding Profitability?', kicker: '',
      root: { label: 'Forwarding profitability', detail: 'Measured on one scope and period' },
      formula: 'Gross profit per TEU = gross profit ÷ TEU handled (same scope and period)',
      drivers: [
        { label: 'Volume', detail: 'Count shipments and TEU separately', children: [{ label: 'Shipment count' }, { label: 'TEU handled' }] },
        { label: 'Unit economics', detail: 'Revenue less directly attributable cost', children: [{ label: 'Revenue per shipment' }, { label: 'Gross profit per shipment' }, { label: 'Gross profit per TEU' }] },
        { label: 'Margins', detail: 'Gross is not operating profit', children: [{ label: 'Gross margin' }, { label: 'Operating margin' }] },
        { label: 'Service', detail: 'End-to-end, not carrier schedule alone', children: [{ label: 'On-time delivery' }, { label: 'Dwell time' }] },
        { label: 'Cash', detail: 'Receivable and payable timing', children: [{ label: 'Working-capital cycle' }] },
      ],
      note: `${H}: 3 free days and 5 delay days leave 2 chargeable days × USD75 = USD150, halving an expected USD300 gross profit. Demurrage and detention depend on location, equipment custody and contract terms.`,
      takeaway: 'KPIs require aligned scope and denominators; dwell-time charges can erase shipment gross profit before any other exception cost.',
    },
  },
  'logistics-freight-m3-13': {
    heading: 'Customers arrive through direct accounts, agent networks and referrals',
    intro: 'Forwarders sell to shippers through relationships and formal procurement, and rely on overseas agents for origin and destination execution.',
    spec: {
      layout: 'taxonomy', title: '13 How Do Freight Forwarders Acquire Customers?', kicker: '',
      root: 'Customer acquisition channels', rootDetail: 'Channels used in parallel, not a sequence',
      groups: [
        { label: 'Direct accounts', items: ['Relationship selling', 'Formal procurement'], detail: 'Sales straight to shippers' },
        { label: 'Overseas agents', items: ['Origin execution', 'Destination execution'], detail: 'Partners extend reach on each lane' },
        { label: 'Referrals', detail: 'Introductions from satisfied customers and partners' },
      ],
      note: 'A local forwarder using a destination agent remains responsible for customer communication. Build lane expertise and partner scorecards around target export sectors.',
      takeaway: 'A broad agent network creates value only when partner quality and accountability are reliable.',
    },
  },
  'logistics-freight-m3-14': {
    heading: 'From tender to award to partner scorecard',
    intro: 'Larger shippers buy through formal procurement: the forwarder prices lanes with its agents, negotiates, then must deliver through partners it governs.',
    spec: {
      layout: 'flow', title: '14 How Do Tendering, Freight Contracts and Rate Negotiations Work?', kicker: '',
      steps: [
        { label: 'Tender issued', detail: 'Shipper defines lanes and service needs', owner: 'Shipper' },
        { label: 'Lane pricing', detail: 'Rates built with carrier and agent inputs', owner: 'Forwarder' },
        { label: 'Negotiation', detail: 'Rate, scope and responsibilities agreed', kind: 'decision', owner: 'Shipper and forwarder' },
        { label: 'Key account award', detail: 'Contracted lanes go live', owner: 'Forwarder' },
        { label: 'Partner governance', detail: 'Agent scorecards and accountability', kind: 'outcome', owner: 'Forwarder and agents' },
      ],
      loop: 'Partner performance feeds the next tender and rate review.',
      note: 'The contracting forwarder stays responsible for customer communication even when an agent executes.',
      takeaway: 'A broad agent network creates value only when partner quality and accountability are reliable.',
    },
  },
  'logistics-freight-m3-15': {
    heading: 'Digital touchpoints carry the customer from quote to exception response',
    intro: 'Portals and system integration connect customer, forwarder, carrier and authority systems for rate comparison, bookings, container milestones, documents and reporting.',
    spec: {
      layout: 'flow', title: '15 How Do Customer Relationships and Global Agent Networks Support Growth?', kicker: '',
      steps: [
        { label: 'Online quote', detail: 'Rate comparison', owner: 'Customer portal' },
        { label: 'Booking', detail: 'Confirmed with carrier systems', owner: 'Forwarder' },
        { label: 'Electronic documents', detail: 'Shared with carriers and authorities', owner: 'System integration' },
        { label: 'Tracking', detail: 'Container milestones and reporting', owner: 'Portal' },
        { label: 'Exception response', detail: 'People interpret delays and coordinate action', kind: 'outcome', owner: 'Operations team' },
      ],
      note: 'Prioritize accurate data, customer adoption, cybersecurity and exception ownership.',
      takeaway: 'Digital tools reduce friction but cannot remove judgment in complex exceptions.',
    },
  },
  'logistics-freight-m3-16': {
    heading: 'No single participant controls every shipment milestone',
    intro: 'Physical transport, infrastructure, coordination, border procedures, data and risk support are split among participants across the shipment lifecycle.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Freight & Ocean Logistics Ecosystem?', kicker: '',
      center: { label: 'The shipment', detail: 'Moves through many hands' },
      actors: [
        { label: 'Shippers', relation: 'Hand over cargo and pay for service', flows: ['product', 'money'] },
        { label: 'Consignees', relation: 'Receive cargo and confirm delivery', flows: ['product', 'information'] },
        { label: 'Carriers', relation: 'Physical ocean transport', flows: ['product', 'service'] },
        { label: 'Agents', relation: 'Origin and destination coordination', flows: ['service', 'information'] },
        { label: 'Inland transport', relation: 'Moves cargo to and from ports', flows: ['product'] },
        { label: 'Customs', relation: 'Border procedures and release', flows: ['oversight'] },
      ],
      note: 'Clear handoffs and escalation reduce friction across ports and industrial corridors.',
      takeaway: 'International freight works through interdependent providers with distinct control and liability.',
    },
  },
  'logistics-freight-m3-17': {
    heading: 'Handoffs between forwarder, terminal, carrier and broker',
    intro: 'Forwarders and NVOCCs coordinate while ports and terminals, carriers and customs brokers each control one stretch; technology and insurance support every handoff.',
    spec: {
      layout: 'flow', title: '17 How Do Forwarders, Carriers, Ports and Customs Brokers Collaborate?', kicker: '',
      steps: [
        { label: 'Booking and documents', detail: 'Coordinates cargo, space and paperwork', owner: 'Forwarder / NVOCC' },
        { label: 'Terminal handling', detail: 'Receives and loads the container', owner: 'Port and terminal' },
        { label: 'Ocean movement', detail: 'Vessel carriage between ports', owner: 'Carrier' },
        { label: 'Customs clearance', detail: 'Border procedures at destination', owner: 'Customs broker' },
        { label: 'Release and delivery', detail: 'Escalation if any handoff slips', kind: 'outcome', owner: 'Forwarder / NVOCC' },
      ],
      note: 'Technology shares milestone data and insurance covers cargo risk across all handoffs; each party keeps distinct control and liability.',
      takeaway: 'International freight works through interdependent providers with distinct control and liability.',
    },
  },
  'logistics-freight-m3-18': {
    heading: 'Company upgrading depends on rules, infrastructure, data and skills around it',
    intro: 'Regulators, port authorities, customs, associations, schools, technology firms and public-private infrastructure shape what a logistics company can achieve.',
    spec: {
      layout: 'driverTree', title: '18 How Do Trade Rules, Infrastructure and Financial Services Shape Logistics?', kicker: '',
      root: { label: 'Logistics company upgrading', detail: 'Partly set by the surrounding ecosystem' },
      drivers: [
        { label: 'Institutions', detail: 'Regulators, customs and associations', children: [{ label: 'Customs and maritime rules' }, { label: 'Standards' }] },
        { label: 'Connectivity', detail: 'Port authorities and public-private projects', children: [{ label: 'Infrastructure' }] },
        { label: 'Data interoperability', detail: 'Partners and authorities exchange reliable data', children: [{ label: 'Digital collaboration' }] },
        { label: 'Skills', detail: 'Schools and training', children: [{ label: 'Workforce' }] },
        { label: 'Sustainability', detail: 'Shared expectations across the ecosystem' },
      ],
      note: 'Electronic documents deliver value only when trading partners and authorities can exchange reliable data. Decision 2229 emphasizes infrastructure, digital transformation and higher-value logistics capability.',
      takeaway: 'Company upgrading depends partly on ecosystem connectivity, institutions, skills and data interoperability.',
    },
  },
};
