import type { LogisticsContractChapterVisual } from './logisticsContractVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Contract Logistics & Warehousing Module 03, keyed by visualKind. */
export const LOGISTICS_CONTRACT_M3_VISUALS: Record<string, LogisticsContractChapterVisual> = {
  'logistics-contract-m3-1': {
    heading: 'Volume certainty and process needs decide how dedicated an operation should be',
    intro: 'Dedicated operations configure a facility, capacity or team for one customer. The model is chosen from volume certainty, complexity, site, service and willingness to commit.',
    spec: {
      layout: 'decision', title: 'How Do Contract Logistics Companies Make Money?', kicker: '',
      root: { label: 'Customer operation to outsource', detail: 'Volume, complexity, site and service scope known' },
      question: 'How certain is the volume, and how custom must the processes be?',
      branches: [
        { condition: 'Certain volume, custom processes', outcome: 'Dedicated operation', detail: 'Facility, capacity or team configured for one customer', tone: 'positive' },
        { condition: 'Stable core plus seasonal peaks', outcome: 'Hybrid capacity', detail: 'Dedicated core capacity with shared overflow', tone: 'positive' },
        { condition: 'Uncertain volume, low willingness to commit', outcome: 'Shared-user capacity', detail: 'Common infrastructure pools cost and demand', tone: 'caution' },
      ],
      note: 'Example from the chapter: a client uses dedicated core capacity and shared overflow for seasonal peaks.',
      takeaway: 'Dedicated models maximize customization, so they fit when volume is certain and the customer is willing to commit.',
    },
  },
  'logistics-contract-m3-2': {
    heading: 'Shared-user operations pool resources and demand across customers — and carry utilization risk',
    intro: 'A shared-user operation serves multiple customers from common infrastructure under controlled allocation. Pooling lowers cost but leaves capacity that must stay utilized.',
    spec: {
      layout: 'compare', title: 'How Do 3PL and 4PL Models Differ?', kicker: '',
      leftTitle: 'Dedicated operation', rightTitle: 'Shared-user operation',
      rows: [
        { label: 'Who is served', a: 'One customer', b: 'Multiple customers under allocation controls' },
        { label: 'Resources', a: 'Customer-specific facility and team', b: 'Pooled facility, labor and equipment' },
        { label: 'Cost and demand', a: 'Carried by one contract', b: 'Pooled across customers' },
        { label: 'Customization', a: 'Maximized', b: 'Limited by common processes' },
        { label: 'Utilization risk', a: 'Tied to one customer’s volume', b: 'Managed across the shared capacity' },
      ],
      note: 'Define customer, product, order profile, site, service scope, SLA and volume assumptions before choosing a model.',
      takeaway: 'Shared-user models pool cost and demand, trading customization for better use of common capacity.',
    },
  },
  'logistics-contract-m3-3': {
    heading: 'Own, lease or outsource: each resource trades control against flexibility',
    intro: 'Providers combine owned or leased warehouses, equipment and fleets with partner networks and multiple logistics services. Each resource is weighed against control, utilization and return needs.',
    spec: {
      layout: 'table', title: 'How Do Dedicated, Shared-User, Asset-Based and Asset-Light Models Compare?', kicker: '',
      headers: ['Resource route', 'What it gives the provider', 'What it costs or risks'],
      rows: [
        { label: 'Owned assets', a: 'Direct control of warehouse, equipment or fleet', b: 'Capital allocation and utilization exposure' },
        { label: 'Leased sites', a: 'Faster, more flexible network expansion', b: 'Landlord dependency' },
        { label: 'Subcontractors', a: 'Capacity without owning it', b: 'Partner dependency and governance needs' },
        { label: 'Integrated services', a: 'Multiple logistics services in one offer', b: 'Requires coordination across resources' },
      ],
      note: 'Asset-light expansion is flexible but raises landlord and partner dependency.',
      takeaway: 'Control can come from operating capability and governance as well as ownership.',
    },
  },
  'logistics-contract-m3-4': {
    heading: 'Six core service segments, from receiving to special handling',
    intro: 'Core services range from pallet or bulk storage through complex order fulfillment designed around product and order characteristics.',
    spec: {
      layout: 'taxonomy', title: 'How Are Warehousing and Fulfillment Services Segmented?', kicker: '',
      root: 'Core warehousing and fulfillment services', rootDetail: 'Service segments, each designed around product and order characteristics',
      groups: [
        { label: 'Receiving', detail: 'Accepting goods into the site' },
        { label: 'Storage', detail: 'Pallet or bulk storage' },
        { label: 'Inventory', detail: 'Keeping stock records accurate' },
        { label: 'Pick and pack', detail: 'Order fulfillment, from simple to complex' },
        { label: 'Cross-dock', detail: 'Goods moved through without long storage' },
        { label: 'Special handling', detail: 'Controls such as batch-controlled storage' },
      ],
      note: 'High-volume consumer picking and industrial batch-controlled storage need different layouts and KPIs.',
      takeaway: 'Core accuracy and consistency determine whether broader services can succeed.',
    },
  },
  'logistics-contract-m3-5': {
    heading: 'Specialized services add procedures, skills and liability beyond standard storage',
    intro: 'Value-added and specialized services extend beyond standard storage and order processing into customization and specialized handling.',
    spec: {
      layout: 'compare', title: 'How Do Standard and Specialized Logistics Services Differ?', kicker: '',
      leftTitle: 'Standard storage and order processing', rightTitle: 'Specialized and value-added services',
      rows: [
        { label: 'Scope', a: 'Store and process orders', b: 'Labeling, inspection and aftermarket work' },
        { label: 'Procedures', a: 'Standardized core work', b: 'Validated procedures, e.g. healthcare or cold chain' },
        { label: 'Team', a: 'General warehouse roles', b: 'Trained specialist teams' },
        { label: 'Traceability', a: 'Standard inventory records', b: 'Traceability required by the product' },
        { label: 'Pricing', a: 'Standard rates', b: 'Must reflect complexity and liability' },
      ],
      note: 'Develop specialties against real demand and compliant infrastructure.',
      takeaway: 'Value-added services differentiate only when price reflects complexity and liability.',
    },
  },
  'logistics-contract-m3-6': {
    heading: 'Kitting, returns and controlled storage each change how the operation is designed',
    intro: 'Product, order and service requirements add customization and specialized handling beyond standard storage and order processing.',
    spec: {
      layout: 'table', title: 'How Do Product, Order and Service Requirements Influence Operating Design?', kicker: '',
      headers: ['Requirement', 'Service it creates', 'What the design must add'],
      rows: [
        { label: 'Order requirement', a: 'Kitting', b: 'Customization steps before dispatch' },
        { label: 'Service requirement', a: 'Returns', b: 'A reverse flow back into inventory' },
        { label: 'Product requirement', a: 'Controlled storage', b: 'Validated procedures, trained teams, traceability' },
      ],
      note: 'Healthcare or cold-chain work can require validated procedures, trained teams and traceability.',
      takeaway: 'Each added requirement adds complexity and liability, so it differentiates only when the price reflects it.',
    },
  },
  'logistics-contract-m3-7': {
    heading: 'Industrial and B2B buyers outsource materials, parts and finished stock',
    intro: 'Manufacturers, industrial companies and B2B distributors need factory materials, line-side supply, service parts, finished stock and business-customer orders handled reliably.',
    spec: {
      layout: 'taxonomy', title: 'Who Purchases Contract Logistics Services?', kicker: '',
      root: 'Industrial and B2B customers', rootDetail: 'Customer needs — categories, not a sequence',
      groups: [
        { label: 'Manufacturers', items: ['Inbound materials', 'Production support (line-side supply)'] },
        { label: 'Industrial companies', items: ['Spare parts (service parts)', 'Finished goods'] },
        { label: 'B2B distributors', items: ['B2B consolidation of business-customer orders'] },
        { label: 'Across all three', items: ['Traceability'] },
      ],
      note: 'A missing component can stop production, making inventory accuracy more valuable than a low storage rate.',
      takeaway: 'Industrial customers prioritize continuity and predictable inventory availability.',
    },
  },
  'logistics-contract-m3-8': {
    heading: 'Store replenishment, promotions and returns shape retail warehouse requirements',
    intro: 'Retail, e-commerce and consumer goods companies need multi-channel inventory, small orders, campaigns, packaging, parcels and reverse flows handled consistently.',
    spec: {
      layout: 'driverTree', title: 'What Determines Customer Warehouse and Fulfillment Requirements?', kicker: '',
      root: { label: 'Warehouse and fulfillment requirements', detail: 'Retail and consumer goods customers' },
      drivers: [
        { label: 'Store replenishment', detail: 'Stock flowing to stores', children: [{ label: 'Disciplined inventory' }, { label: 'Consistent accuracy' }] },
        { label: 'Promotions', detail: 'Campaign-driven peak volume', children: [{ label: 'Temporary labor' }, { label: 'Temporary space' }] },
        { label: 'Returns', detail: 'Reverse flows', children: [{ label: 'Packaging and parcels' }, { label: 'Return to inventory' }] },
      ],
      note: 'Peak volume needs temporary labor and space without eroding quality.',
      takeaway: 'Retail and e-commerce value flexible capacity with consistent speed and accuracy.',
    },
  },
  'logistics-contract-m3-9': {
    heading: 'Four decision factors for D2C and omnichannel fulfillment',
    intro: 'D2C and omnichannel customers weigh cost, accuracy, flexibility and visibility across multi-channel inventory, small orders, campaigns and parcels.',
    spec: {
      layout: 'table', title: 'How Do Cost, Accuracy, Flexibility and Visibility Influence Decisions?', kicker: '',
      headers: ['Decision factor', 'Where it shows up', 'What the customer looks for'],
      rows: [
        { label: 'Cost', a: 'Small orders, packaging, parcels', b: 'Efficient D2C fulfillment' },
        { label: 'Accuracy', a: 'Omnichannel inventory', b: 'One disciplined stock record' },
        { label: 'Flexibility', a: 'Campaigns and peaks', b: 'Peak capacity without eroding quality' },
        { label: 'Visibility', a: 'Marketplaces, stores, parcel partners', b: 'Integrated order and stock information' },
      ],
      note: 'Integrate marketplaces, stores and parcel partners with disciplined inventory.',
      takeaway: 'Retail and e-commerce customers choose providers that offer flexible capacity with consistent speed and accuracy.',
    },
  },
  'logistics-contract-m3-10': {
    heading: 'How storage and handling fees build revenue — and what remains after delivery cost',
    intro: 'Contract revenue can combine fixed management, storage, handling, order and value-added fees with minimums, bands, indexation and change control. The worked example below is hypothetical.',
    spec: {
      layout: 'waterfall', title: 'How Do Contract Logistics Engagements Generate Revenue?', kicker: H,
      unit: 'USD', basis: `${H}: 800 pallet positions × USD20 and 5,000 orders × USD4`,
      items: [
        { label: 'Storage revenue', value: 16000, kind: 'start' },
        { label: 'Handling revenue', value: 20000, kind: 'add' },
        { label: 'Total revenue', value: 36000, kind: 'total' },
        { label: 'Variable delivery cost', value: 12000, kind: 'subtract' },
        { label: 'Fixed delivery cost', value: 18000, kind: 'subtract' },
        { label: 'Contribution', value: 6000, kind: 'total' },
      ],
      note: 'Hypothetical: USD6,000 contribution on USD36,000 revenue is a 16.7% margin. Do not present hypothetical prices as market rates; define billing units, tax, acceptance, minimums, volume bands and collection timing.',
      takeaway: 'Revenue is built from several fee types, and only the contribution left after variable and fixed delivery cost shows whether the contract pays.',
    },
  },
  'logistics-contract-m3-11': {
    heading: 'Utilization decides whether fixed warehouse cost is absorbed',
    intro: 'Warehouse cost includes rent or depreciation, labor, equipment, systems, utilities, packaging and errors. Move utilization in this hypothetical example to see fixed cost turn a loss into a profit.',
    spec: {
      layout: 'scenario', title: 'What Determines Warehouse and Fulfillment Costs?', kicker: H,
      inputs: [
        { key: 'positions', label: 'Pallet positions', min: 200, max: 2000, step: 100, value: 1000, unit: 'positions' },
        { key: 'util', label: 'Utilization', min: 0, max: 100, step: 5, value: 60, unit: '%' },
        { key: 'rev', label: 'Revenue per occupied position', min: 10, max: 100, step: 5, value: 50, unit: 'USD' },
        { key: 'varCost', label: 'Variable cost per occupied position', min: 0, max: 50, step: 1, value: 10, unit: 'USD' },
        { key: 'fixed', label: 'Fixed cost', min: 0, max: 60000, step: 1000, value: 25000, unit: 'USD' },
      ],
      outputs: [
        { label: 'Occupied positions', unit: 'positions', digits: 0, compute: (v) => v.positions * v.util / 100 },
        { label: 'Revenue', unit: 'USD', digits: 0, compute: (v) => v.positions * v.util / 100 * v.rev },
        { label: 'Variable cost', unit: 'USD', digits: 0, compute: (v) => v.positions * v.util / 100 * v.varCost },
        { label: 'Result after fixed cost', unit: 'USD', digits: 0, compute: (v) => v.positions * v.util / 100 * (v.rev - v.varCost) - v.fixed },
      ],
      assumption: `${H}. Illustrative inputs from the chapter's worked example, not market data: 60% utilization loses USD1,000 while 90% earns USD11,000.`,
      note: 'Separate physical capacity, occupied capacity, sellable capacity, utilization, throughput, labor hours and fixed-cost commitment.',
      takeaway: 'Fixed cost stays the same while revenue follows occupied positions, so utilization decides whether the warehouse makes or loses money.',
    },
  },
  'logistics-contract-m3-12': {
    heading: 'Contribution margin decomposes into capacity, cost and quality KPIs',
    intro: 'KPIs require aligned definitions: occupancy uses occupied versus available capacity, inventory accuracy compares physical and system records, and contribution margin requires an explicit cost scope.',
    spec: {
      layout: 'driverTree', title: 'Which KPIs Drive Contract Logistics Profitability?', kicker: '',
      root: { label: 'Contribution margin', detail: 'Requires an explicit cost scope' },
      formula: 'Contribution margin = (contract revenue − delivery cost) ÷ contract revenue',
      drivers: [
        { label: 'Capacity and revenue', detail: 'Occupied versus available capacity', children: [{ label: 'Occupancy utilization' }, { label: 'Revenue per pallet' }] },
        { label: 'Cost to serve', detail: 'Output related to input', children: [{ label: 'Cost per order' }, { label: 'Cost per square meter' }, { label: 'Labor productivity' }] },
        { label: 'Quality and service', detail: 'Errors and exceptions add cost', children: [{ label: 'Picking accuracy' }, { label: 'Inventory accuracy' }, { label: 'Fulfillment rate' }, { label: 'SLA performance' }] },
      ],
      note: `${H}: USD40,000 fixed plus 10,000 orders at USD2 gives USD60,000; labor 25,000, facility 15,000, systems 5,000 and exceptions 3,000 leave USD12,000, or 20%. Higher orders do not automatically increase profit.`,
      takeaway: 'Profitability is only visible when every KPI uses an aligned definition and contribution uses an explicit cost scope.',
    },
  },
  'logistics-contract-m3-13': {
    heading: 'Consultative selling engages every function on the customer side',
    intro: 'Contract logistics sales are long B2B cycles involving procurement, operations, finance, IT and management, from diagnosis through renewal.',
    spec: {
      layout: 'ecosystem', title: 'How Do Contract Logistics Providers Acquire Customers?', kicker: '',
      center: { label: 'Provider’s consultative sales team', detail: 'Diagnosis, solution design, account governance' },
      actors: [
        { label: 'Procurement', relation: 'Runs the selection and contract terms', flows: ['money', 'oversight'] },
        { label: 'Operations', relation: 'Tests the solution design against real work', flows: ['service'] },
        { label: 'Finance', relation: 'Reviews pricing and commitments', flows: ['money', 'risk'] },
        { label: 'IT', relation: 'Assesses systems and data integration', flows: ['information'] },
        { label: 'Management', relation: 'Approves and governs the account', flows: ['oversight'] },
      ],
      note: 'In Vietnam, providers must prove sector fit, local implementation capability and governance.',
      takeaway: 'Winning requires credible implementation and operating design, not price alone.',
    },
  },
  'logistics-contract-m3-14': {
    heading: 'From tender to renewal: the contract logistics deal cycle',
    intro: 'Deals move from diagnosis and tender through solution design, negotiation and transition to renewal.',
    spec: {
      layout: 'flow', title: 'How Do Tenders, Solution Design and Contract Negotiations Work?', kicker: '',
      steps: [
        { label: 'Diagnosis', detail: 'Understand the customer’s operation', owner: 'Provider and customer' },
        { label: 'Tender', detail: 'Customer invites and compares proposals', owner: 'Procurement' },
        { label: 'Solution design', detail: 'Operating design and pricing proposed', owner: 'Provider' },
        { label: 'Contract negotiation', detail: 'Scope, SLA, pricing and risk allocation agreed', kind: 'decision', owner: 'Both parties' },
        { label: 'Transition', detail: 'Stock transfer, systems, training, testing, go-live', owner: 'Provider' },
        { label: 'Renewal', detail: 'Performance earns the next term', kind: 'outcome', owner: 'Customer' },
      ],
      loop: 'Account governance during the contract shapes the renewal decision.',
      note: 'A transition plan coordinates stock transfer, systems, training, testing and go-live contingencies.',
      takeaway: 'Winning and keeping a contract depends on credible implementation, not price alone.',
    },
  },
  'logistics-contract-m3-15': {
    heading: 'Partners extend reach — but the provider keeps accountability',
    intro: 'External facilities, transport, technology and specialty providers can support customer solutions, provided data, controls and escalation stay compatible.',
    spec: {
      layout: 'pathway', title: 'How Do Account Management and Partnerships Support Growth?', kicker: '',
      trunk: [
        { label: 'Customer account', detail: 'Provider remains accountable' },
        { label: 'Shared standards', detail: 'Compatible data, controls and escalation' },
      ],
      optionsLabel: 'Partnership routes — alternatives, not steps',
      options: [
        { label: 'Transport partners', detail: 'Extend delivery reach' },
        { label: 'Specialists', detail: 'e.g. a cold-store partner adds capability' },
        { label: 'Technology partners', detail: 'Add systems capability' },
        { label: 'Customer portals', detail: 'Share information with the customer' },
      ],
      afterLabel: 'Growth outcomes',
      after: [
        { label: 'Network expansion', detail: 'New geography', kind: 'outcome' },
        { label: 'Joint solutions', detail: 'Combined specialty offers', kind: 'outcome' },
      ],
      note: 'Use partners to extend geography and specialty without losing accountability.',
      takeaway: 'Partnerships expand reach only when responsibility, data and service standards remain coherent.',
    },
  },
  'logistics-contract-m3-16': {
    heading: 'Core participants: the 3PL, transporters, and equipment and packaging suppliers',
    intro: 'Facilities, operations, transport, systems and equipment are supplied by different participants under varying control models.',
    spec: {
      layout: 'taxonomy', title: 'Who Participates in the Contract Logistics Ecosystem?', kicker: '',
      root: 'Core industry participants', rootDetail: 'Roles, not a sequence — one firm may hold several',
      groups: [
        { label: '3PL', detail: 'Often the integrator', items: ['Manages inventory', 'Runs warehouse operations'] },
        { label: 'Transporters', detail: 'Move the goods', items: ['Carrier executes delivery'] },
        { label: 'Equipment and packaging', detail: 'Supply the physical inputs', items: ['Handling equipment', 'Packaging'] },
      ],
      note: 'A landlord owns space while the 3PL manages inventory and a carrier executes delivery.',
      takeaway: 'The 3PL often acts as integrator across internal resources and external dependencies.',
    },
  },
  'logistics-contract-m3-17': {
    heading: 'The 3PL sits between property, technology and the customer’s supply chain',
    intro: 'Property providers, technology vendors, customers and suppliers each control part of the operation. A landlord can own the space while the 3PL manages inventory.',
    spec: {
      layout: 'ecosystem', title: 'How Do 3PLs, Property Owners, Transporters and Technology Providers Collaborate?', kicker: '',
      center: { label: '3PL', detail: 'Integrates resources and dependencies' },
      actors: [
        { label: 'Property providers', relation: 'Own and lease the space', flows: ['service', 'money'] },
        { label: 'Technology vendors', relation: 'Supply systems the 3PL runs on', flows: ['information', 'service'] },
        { label: 'Customers', relation: 'Pay for and oversee the service', flows: ['money', 'oversight'] },
        { label: 'Suppliers', relation: 'Send inbound goods and data', flows: ['product', 'information'] },
        { label: 'Carriers', relation: 'Execute delivery', flows: ['product'] },
      ],
      note: 'Partner governance matters more as operations become fragmented.',
      takeaway: 'The 3PL often acts as integrator across property, technology and customer dependencies, so governance holds the model together.',
    },
  },
  'logistics-contract-m3-18': {
    heading: 'Reliable delivery rests on compliance, skilled people and governance',
    intro: 'Workplace, fire, labor, environmental, data and sector-specific controls combine with training and resilience to determine whether operations deliver.',
    spec: {
      layout: 'driverTree', title: 'How Do Regulation, Workforce and Infrastructure Shape Delivery?', kicker: '',
      root: { label: 'Reliable service delivery', detail: 'Facilities and technology plus people and controls' },
      drivers: [
        { label: 'Regulation', detail: 'Required controls', children: [{ label: 'Safety' }, { label: 'Facility compliance' }, { label: 'Product controls' }] },
        { label: 'Workforce', detail: 'Capability to run the site', children: [{ label: 'Supervisors' }, { label: 'WMS skills' }, { label: 'Maintenance' }] },
        { label: 'Infrastructure and governance', detail: 'Keeping operations running', children: [{ label: 'Performance governance' }, { label: 'Continuity' }] },
      ],
      note: 'Automation without technicians, safe procedures and recovery plans can increase outage risk.',
      takeaway: 'Facilities and technology create value only with capable people and sound governance.',
    },
  },
};
