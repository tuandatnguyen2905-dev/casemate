import type { LogisticsContractChapterVisual } from './logisticsContractVisualSpecs';

/** Chapter-specific Learning Visuals for Contract Logistics & Warehousing Module 05, keyed by visualKind. */
export const LOGISTICS_CONTRACT_M5_VISUALS: Record<string, LogisticsContractChapterVisual> = {
  'logistics-contract-m5-1': {
    heading: 'Customers want flexible capacity; providers still have commitments to recover',
    intro: 'Changing volumes, seasons, launches and sourcing are managed through shared capacity, bands, pricing and realistic service terms.',
    spec: {
      layout: 'table', title: 'How Are Contract Logistics Customers’ Requirements Changing?', kicker: '',
      headers: ['Requirement', 'What the customer wants', 'What the provider must protect'],
      rows: [
        { label: 'Flexible capacity', a: 'Shared capacity for changing volumes', b: 'Recovery of facility commitments' },
        { label: 'Peak planning', a: 'Seasons and launches covered', b: 'Labor and equipment commitments' },
        { label: 'SLA', a: 'Realistic service terms', b: 'Commitments it can measure and meet' },
        { label: 'Contract term', a: 'One-year or flexible contracts', b: 'Investment recovery' },
      ],
      note: 'Align flexibility with minimums, forecasts and change-control rules.',
      takeaway: 'Customers seek operational flexibility while providers must recover facility, labor and equipment commitments.',
    },
  },
  'logistics-contract-m5-2': {
    heading: 'Transparent pricing, adjustable commitments and proactive communication make flexibility workable',
    intro: 'When volumes and seasons change, bands, pricing and realistic service terms decide whether flexibility stays fair for both sides.',
    spec: {
      layout: 'driverTree', title: 'Why Are Flexibility, Reliability and Cost Transparency More Important?', kicker: '',
      root: { label: 'Workable flexible contract', detail: 'Reliable for the customer, viable for the provider' },
      drivers: [
        { label: 'Transparent pricing', detail: 'Customer sees how cost moves', children: [{ label: 'Volume bands' }, { label: 'Clear pricing' }] },
        { label: 'Adjustable commitments', detail: 'Terms that move with demand', children: [{ label: 'Minimums' }, { label: 'Change-control rules' }] },
        { label: 'Proactive communication', detail: 'No surprises', children: [{ label: 'Shared forecasts' }, { label: 'Early warning of change' }] },
      ],
      note: 'One-year or flexible contracts reduce commitment but can constrain provider investment recovery.',
      takeaway: 'Flexibility only lasts when pricing and commitments are transparent enough for providers to recover their costs.',
    },
  },
  'logistics-contract-m5-3': {
    heading: 'End-to-end outsourcing replaces handoffs with one accountable relationship',
    intro: 'Warehousing, inventory, fulfillment, transport, returns and reporting can be coordinated under one operating relationship. A retailer can use one inventory pool for stores, online orders and wholesale customers.',
    spec: {
      layout: 'compare', title: 'How Are Integrated and End-to-End Solutions Evolving?', kicker: '',
      leftTitle: 'Separate services with handoffs', rightTitle: 'Integrated end-to-end solution',
      rows: [
        { label: 'Accountability', a: 'Split across parties', b: 'Single accountability' },
        { label: 'Sites', a: 'Each site run on its own', b: 'Multi-site coordination' },
        { label: 'Inventory', a: 'Separate pools per channel', b: 'One pool for stores, online and wholesale' },
        { label: 'Visibility', a: 'Partial reporting', b: 'Shared visibility and reporting' },
        { label: 'Process integration', a: 'Handoffs between services', b: 'Fewer handoffs, clear role and data ownership' },
      ],
      note: 'Integration should reduce handoffs while keeping role and data ownership clear.',
      takeaway: 'Customers value reduced complexity and consistent outcomes—not more service categories by themselves.',
    },
  },
  'logistics-contract-m5-4': {
    heading: 'Automation options grouped by the warehouse activity they target',
    intro: 'Automation covers storage, movement, sorting, picking, planning and equipment analytics, matched to volume, products and payback.',
    spec: {
      layout: 'taxonomy', title: 'How Are Warehouse Automation and Robotics Changing Operations?', kicker: '',
      root: 'Warehouse automation, robotics and AI', rootDetail: 'Options by activity — automate measurable bottlenecks',
      groups: [
        { label: 'Storage', items: ['ASRS'] },
        { label: 'Movement', detail: 'Travel-intensive picking support', items: ['AMRs'] },
        { label: 'Picking', items: ['Robotic picking'] },
        { label: 'Planning', items: ['AI labor planning', 'Intelligent slotting'] },
        { label: 'Equipment analytics', items: ['Predictive maintenance'] },
      ],
      note: 'AMRs can support travel-intensive picking but need WMS integration, safe workflows and maintenance. Stage pilots around stable data, trained teams and the customer contract horizon.',
      takeaway: 'Automate measurable bottlenecks rather than every activity.',
    },
  },
  'logistics-contract-m5-5': {
    heading: 'From standardized data to timely alerts: how WMS information becomes a decision',
    intro: 'Inventory and task systems connect with customers, transport, labor and management information. Value comes when reliable data reaches the people who act on it.',
    spec: {
      layout: 'flow', title: 'How Are WMS, Analytics and Digital Twins Improving Decisions?', kicker: '',
      steps: [
        { label: 'Standardize data', detail: 'Master data, events and KPI definitions' },
        { label: 'Cloud WMS', detail: 'Inventory and task records in one system' },
        { label: 'Dashboards', detail: 'Performance visible to management' },
        { label: 'Alerts', detail: 'Exceptions flagged as they happen', kind: 'decision' },
        { label: 'Operating decision', detail: 'Timely action on the floor', kind: 'outcome' },
      ],
      note: 'Standardize master data, events and KPI definitions before advanced analytics.',
      takeaway: 'Digital value comes from reliable data turned into timely operating decisions.',
    },
  },
  'logistics-contract-m5-6': {
    heading: 'Connected warehousing links orders, analytics and digital twins to the WMS',
    intro: 'Inventory and task systems are connected with customers, transport, labor and management information. A digital twin can test layout changes, but its quality depends on valid data and assumptions.',
    spec: {
      layout: 'ecosystem', title: 'How Could AI and Connected Logistics Transform Warehousing?', kicker: '',
      center: { label: 'Inventory and task systems', detail: 'The connected warehouse core' },
      actors: [
        { label: 'ERP and orders', relation: 'Customer orders flow in', flows: ['information'] },
        { label: 'Transport', relation: 'Shipments coordinated', flows: ['information', 'product'] },
        { label: 'Labor', relation: 'Tasks assigned and tracked', flows: ['service'] },
        { label: 'Predictive analytics', relation: 'Anticipates operating needs', flows: ['information'] },
        { label: 'Digital twins', relation: 'Tests layout changes before rollout', flows: ['information', 'risk'] },
        { label: 'Management information', relation: 'KPIs for review', flows: ['oversight'] },
      ],
      note: 'Model quality depends on valid data and assumptions.',
      takeaway: 'Digital value comes from reliable data turned into timely operating decisions.',
    },
  },
  'logistics-contract-m5-7': {
    heading: 'Test a new region before building dedicated capacity there',
    intro: 'Sourcing and manufacturing shifts create inventory and distribution needs across regions. Shared-user and partner networks can test new markets before dedicated investment.',
    spec: {
      layout: 'decision', title: 'How Are Regional Logistics Networks and Supply Chains Evolving?', kicker: '',
      root: { label: 'New regional demand', detail: 'From sourcing and manufacturing shifts' },
      question: 'How credible is the manufacturing or consumption cluster behind the demand?',
      branches: [
        { condition: 'Unproven market', outcome: 'Test with shared-user or partner networks', detail: 'Flexible capacity before investment', tone: 'caution' },
        { condition: 'Growing, credible cluster', outcome: 'Add phased capacity', detail: 'Expand toward a regional DC', tone: 'positive' },
        { condition: 'Proven multicountry demand', outcome: 'Commit to regional DCs', detail: 'Coordinate multicountry operations', tone: 'positive' },
      ],
      note: 'Develop around credible manufacturing and consumption clusters with phased capacity.',
      takeaway: 'Geographic change creates opportunity and risk when facilities outlive customer demand.',
    },
  },
  'logistics-contract-m5-8': {
    heading: 'Manufacturing relocation creates new distribution demand — and stranded-site risk',
    intro: 'As sourcing and manufacturing shift, new inventory and distribution needs appear across regions.',
    spec: {
      layout: 'compare', title: 'How Are E-Commerce and Omnichannel Fulfillment Developing?', kicker: '',
      leftTitle: 'Opportunity', rightTitle: 'Risk',
      rows: [
        { label: 'Manufacturing relocation', a: 'New inventory and distribution needs', b: 'Demand may move again' },
        { label: 'Network optimization', a: 'Sites placed near new clusters', b: 'Facilities can outlive customer demand' },
        { label: 'Resilience', a: 'More sourcing options for customers', b: 'Dedicated investment made too early' },
      ],
      note: 'Shared-user and partner networks can test new markets before dedicated investment.',
      takeaway: 'Geographic change creates opportunity and risk when facilities outlive customer demand.',
    },
  },
  'logistics-contract-m5-9': {
    heading: 'Each specialized service is defined by a different product or order requirement',
    intro: 'Growth comes from multi-channel orders and products requiring temperature, security, traceability, availability or value-added work.',
    spec: {
      layout: 'table', title: 'How Are Specialized and Integrated Logistics Services Expanding?', kicker: '',
      headers: ['Service', 'Defining requirement', 'What the customer values'],
      rows: [
        { label: 'Omnichannel stock', a: 'Multi-channel orders from one stock', b: 'Flexible fulfillment' },
        { label: 'E-commerce', a: 'Small, frequent online orders', b: 'Speed and accuracy' },
        { label: 'Cold chain', a: 'Temperature control', b: 'Product integrity' },
        { label: 'Aftermarket', a: 'Availability of spare parts', b: 'Rapid small orders over average storage cost' },
        { label: 'High-value goods', a: 'Security and traceability', b: 'Controlled custody' },
        { label: 'Customization', a: 'Value-added work', b: 'Orders tailored to the customer' },
      ],
      note: 'Choose specialties based on demand, workforce, infrastructure and contract economics.',
      takeaway: 'Growth is strongest where flexible fulfillment meets differentiated sector expertise.',
    },
  },
  'logistics-contract-m5-10': {
    heading: 'Warehouse requirements fall into safety, product, data and audit control categories',
    intro: 'Applicable duties depend on facility, product, equipment, workforce, systems, customer and jurisdiction. Operational controls should be checked against current primary requirements and contracts.',
    spec: {
      layout: 'taxonomy', title: 'How Do Safety, Product and Data Requirements Affect Warehouses?', kicker: '',
      root: 'Warehouse control categories', rootDetail: 'Categories to check — specific duties vary by site and product',
      groups: [
        { label: 'People and site', items: ['Workplace safety', 'Fire and facility requirement'] },
        { label: 'Product', detail: 'Product-specific procedures may apply', items: ['Product control', 'Cold chain'] },
        { label: 'Data', detail: 'Connected WMS needs access controls and recovery', items: ['Data access', 'Cybersecurity'] },
        { label: 'Assurance', items: ['Audit and correction'] },
      ],
      note: 'Verify current facility- and product-specific requirements against primary sources and contracts; customer standards do not automatically replace law.',
      takeaway: 'A generic warehouse checklist cannot establish every legal or product requirement, and customer standards do not automatically replace law.',
    },
  },
  'logistics-contract-m5-11': {
    heading: 'Green warehousing starts with building energy, equipment and waste',
    intro: 'Building energy, handling equipment, packaging, waste and facility design all affect resource use and customer procurement.',
    spec: {
      layout: 'taxonomy', title: 'How Are Green Warehousing and Resource Efficiency Evolving?', kicker: '',
      root: 'Resource-efficiency levers', rootDetail: 'Levers to prioritize, not a sequence',
      groups: [
        { label: 'Energy efficiency', detail: 'Building energy use', items: ['LED lighting', 'Controls'] },
        { label: 'Electric equipment', detail: 'Handling equipment' },
        { label: 'Waste', detail: 'Packaging and other site waste' },
      ],
      note: 'Prioritize practical projects aligned with customer requirements and asset horizon.',
      takeaway: 'Sustainability needs measurable benefits and credible methods rather than general claims.',
    },
  },
  'logistics-contract-m5-12': {
    heading: 'A sustainability claim needs a measurable benefit and a credible method',
    intro: 'Renewable energy, packaging and emissions methods affect resources and customer procurement. Solar, for example, needs site, load, finance and contract evaluation.',
    spec: {
      layout: 'decision', title: 'How Are Traceability, Resilience and Responsible Operations Changing?', kicker: '',
      root: { label: 'Proposed sustainability initiative', detail: 'Renewable energy, packaging or emissions reporting' },
      question: 'Can the benefit be measured with a credible method?',
      branches: [
        { condition: 'Measured with a credible emissions method', outcome: 'Report the benefit', detail: 'Supports customer procurement', tone: 'positive' },
        { condition: 'Renewable energy such as solar', outcome: 'Evaluate before committing', detail: 'Site, load, finance and contract', tone: 'caution' },
        { condition: 'General claim without a method', outcome: 'Do not make the claim', tone: 'negative' },
      ],
      note: 'Prioritize practical projects aligned with customer requirements and asset horizon.',
      takeaway: 'Sustainability needs measurable benefits and credible methods rather than general claims.',
    },
  },
  'logistics-contract-m5-13': {
    heading: 'Six drivers behind Ti’s forecast of global contract logistics growth',
    intro: 'Ti forecasts global contract logistics rising from €305.95B in 2025 to €372.6B in 2030 at 4.0% CAGR. Growth is driven by outsourcing and complexity, with regional and service differences.',
    spec: {
      layout: 'driverTree', title: 'What Factors Will Drive Future Contract Logistics Demand?', kicker: '',
      root: { label: 'Future contract logistics demand', detail: 'Ti: €305.95B (2025 estimate) to €372.6B (2030 forecast)' },
      drivers: [
        { label: 'Market expansion', detail: 'Outsourcing and complexity', children: [{ label: 'Outsourcing' }, { label: 'Asia-Pacific growth', detail: '6.6% CAGR forecast' }] },
        { label: 'Service mix', detail: 'Where demand concentrates', children: [{ label: 'Specialized logistics' }, { label: 'Technology' }] },
        { label: 'Industry economics', detail: 'How providers capture it', children: [{ label: 'Consolidation' }, { label: 'Margin discipline' }] },
      ],
      note: 'These are commercial global estimates, not Vietnam revenue or guaranteed outcomes; scope and methodology are report-specific.',
      takeaway: 'Long-term growth requires productivity, retention and profitable service design—not revenue pursuit alone.',
    },
  },
  'logistics-contract-m5-14': {
    heading: 'Vietnam’s route from storage and handling to managed operations',
    intro: 'Industrial, consumer and online demand is supported by sites, connectivity, WMS, workforce, specialties and local-global partnerships.',
    spec: {
      layout: 'pathway', title: 'Where Are New Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      trunk: [
        { label: 'Storage and handling', detail: 'Today’s base' },
        { label: 'Demonstrated demand', detail: 'Customer outsourcing and service economics proven' },
      ],
      optionsLabel: 'Opportunity areas — alternatives, not steps',
      options: [
        { label: 'Manufacturing logistics', detail: 'Industrial demand' },
        { label: 'Warehouse networks', detail: 'Sites and connectivity' },
        { label: 'Specialized services', detail: 'Specialties and local-global partnerships' },
      ],
      afterLabel: 'Direction of travel',
      after: [{ label: 'Integrated managed operations', detail: 'Technology-enabled', kind: 'outcome' }],
      note: 'The US$45–50B broader logistics estimate is context—not contract-logistics market size.',
      takeaway: 'Vietnam can progress from storage and handling toward integrated, technology-enabled managed operations.',
    },
  },
  'logistics-contract-m5-15': {
    heading: 'Three positioning levers and the capability each one needs',
    intro: 'Providers position around industrial, consumer and online demand, supported by sites, connectivity, WMS, workforce, specialties and local-global partnerships.',
    spec: {
      layout: 'table', title: 'How Should Contract Logistics Providers Position Themselves?', kicker: '',
      headers: ['Positioning lever', 'Demand it serves', 'Capability needed'],
      rows: [
        { label: 'Retail and e-commerce', a: 'Consumer and online demand', b: 'Fulfillment sites and connectivity' },
        { label: 'Digital integration', a: 'Customers needing connected data', b: 'WMS and system connectivity' },
        { label: 'Skills and green logistics', a: 'Customer workforce and green requirements', b: 'Trained workforce and resource-efficient sites' },
      ],
      note: 'Invest where customer outsourcing, service economics and operating capability are demonstrated.',
      takeaway: 'Providers move beyond storage and handling by investing where outsourcing, economics and capability are demonstrated.',
    },
  },
};
