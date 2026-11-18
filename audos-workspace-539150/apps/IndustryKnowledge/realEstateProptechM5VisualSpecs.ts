import type { RealEstateProptechChapterVisual } from './realEstateProptechVisualSpecs';

/** Chapter-specific Learning Visuals for Property Technology & Marketplaces Module 05 (trends and outlook), keyed by visualKind. */
export const REAL_ESTATE_PROPTECH_M5_VISUALS: Record<string, RealEstateProptechChapterVisual> = {
  'realestate-proptech-m5-1': {
    heading: 'What digital property search combines, and the transparency layer it needs',
    intro: 'Search combines filters, location, media, alerts and property context. More information only helps when users can see its source, timestamp and verification.',
    spec: {
      layout: 'taxonomy', title: 'Digital Property Search and Transparency', kicker: '',
      root: 'Digital property search', rootDetail: 'Elements users expect together, not in sequence',
      groups: [
        { label: 'Mobile', detail: 'Filters and alerts on the phone' },
        { label: 'Map', detail: 'Location in context' },
        { label: 'Media', detail: 'Photos and other visual detail' },
        { label: 'Price', detail: 'Asking price and comparison' },
        { label: 'History', detail: 'Property context over time' },
        { label: 'Transparency layer', detail: 'Source, timestamp and verification shown' },
      ],
      note: 'More information can still be inaccurate or stale. Show source, timestamp and verification.',
      takeaway: 'Users expect convenient discovery and clearer information.',
    },
  },
  'realestate-proptech-m5-2': {
    heading: 'Where a property journey moves between online tools and people offline',
    intro: 'Digital tools can support leads, scheduling, documents and status while people complete inspections and negotiation. Each handoff needs clear authority.',
    spec: {
      layout: 'flow', title: 'Online-to-Offline Transactions', kicker: '',
      steps: [
        { label: 'Inquiry', detail: 'Lead captured and routed', owner: 'Online' },
        { label: 'Visit', detail: 'Scheduled online, inspected in person', owner: 'Online to offline' },
        { label: 'Negotiation', detail: 'Completed by people', owner: 'Offline' },
        { label: 'Document', detail: 'Digital documents with legal verification', owner: 'Online and offline' },
        { label: 'Closing', detail: 'Rights verified and transaction completed', kind: 'outcome', owner: 'Offline' },
      ],
      note: 'Online interest is not a completed transaction. Instrument handoffs and authority.',
      takeaway: 'Property journeys remain hybrid because assets and rights require physical and legal verification.',
    },
  },
  'realestate-proptech-m5-3': {
    heading: 'Tenant apps and enterprise tools extend digital service after occupancy',
    intro: 'Tenant apps and enterprise tools support requests, communication, access and portfolio visibility. Adoption alone does not prove service improved.',
    spec: {
      layout: 'compare', title: 'Tenant and Enterprise Experience', kicker: '',
      leftTitle: 'Tenant app', rightTitle: 'Enterprise tool',
      rows: [
        { label: 'User', a: 'Tenants after move-in', b: 'Occupiers and portfolio teams' },
        { label: 'Supports', a: 'Requests, communication and access', b: 'Portfolio visibility and insight' },
        { label: 'Service link', a: 'Maintenance and payments', b: 'Service across many sites' },
        { label: 'Measure', a: 'Response and resolution', b: 'Retention' },
      ],
      note: 'App adoption is not proven service improvement. Measure response, resolution and retention.',
      takeaway: 'Users expect connected digital service after occupancy.',
    },
  },
  'realestate-proptech-m5-4': {
    heading: 'The AI search loop from data to monitored recommendations',
    intro: 'Models rank listings, extract documents and identify patterns. Quality depends on the data, evaluation, human review and ongoing monitoring.',
    spec: {
      layout: 'flow', title: 'AI Search and Property Analytics', kicker: '',
      steps: [
        { label: 'Property data', detail: 'Listings and documents as model input' },
        { label: 'Model output', detail: 'Ranks listings, extracts documents, finds patterns' },
        { label: 'Explainability check', detail: 'Can the result be explained?', kind: 'decision' },
        { label: 'Human review', detail: 'People check high-impact outputs' },
        { label: 'Monitored service', detail: 'Recommendations and forecasts in use', kind: 'outcome' },
      ],
      loop: 'Monitoring catches bias or stale data and feeds corrections back into the data and model.',
      note: 'Recommendation quality can degrade with biased or stale data.',
      takeaway: 'AI can improve discovery and analysis when data and evaluation are robust.',
    },
  },
  'realestate-proptech-m5-5': {
    heading: 'What an AVM and a digital twin each do, and what neither proves',
    intro: 'AVMs estimate value; digital twins represent assets and systems for simulation and operation. Both support decisions within defined evidence limits.',
    spec: {
      layout: 'compare', title: 'Automated Valuation and Digital Twins', kicker: '',
      leftTitle: 'Automated valuation model (AVM)', rightTitle: 'Digital twin',
      rows: [
        { label: 'Purpose', a: 'Estimates property value', b: 'Represents assets and systems' },
        { label: 'Built from', a: 'Comparables and market data', b: 'Asset and building-system data' },
        { label: 'Used for', a: 'Value-related decisions', b: 'Simulation and operation' },
        { label: 'Evidence limit', a: 'Not an IVS valuation without professional judgement', b: 'Not proof of legal status' },
      ],
      note: 'Neither proves legal status or guaranteed value. Disclose assumptions and purpose. RICS: an AVM output without a valuer applying professional judgement is not an IVS-compliant valuation.',
      takeaway: 'Models and digital representations support decisions but have defined evidence limits.',
    },
  },
  'realestate-proptech-m5-6': {
    heading: 'Connected building operations only count once outcomes are verified',
    intro: 'Sensors, controls and maintenance systems coordinate building performance. Benefits depend on commissioning, a baseline and measured results.',
    spec: {
      layout: 'flow', title: 'IoT, Controls and Automated Operations', kicker: '',
      steps: [
        { label: 'Baseline', detail: 'Record performance before change' },
        { label: 'Sensor', detail: 'Measure conditions and equipment' },
        { label: 'HVAC control', detail: 'Commissioned control sequences' },
        { label: 'Maintenance', detail: 'Coordinated work on systems' },
        { label: 'Verified outcome', detail: 'Measured against the baseline', kind: 'outcome' },
      ],
      note: 'DOE’s cited average 30% annual HVAC saving is U.S. commercial-building potential, not a guarantee for every asset. Cybersecurity applies to every connected device.',
      takeaway: 'Connected systems can improve operations when commissioned and measured.',
    },
  },
  'realestate-proptech-m5-7': {
    heading: 'From portal discovery to partner services across the property journey',
    intro: 'Partnerships connect discovery to agents, developers, finance and services. Referral revenue needs a clear role, attribution and consent.',
    spec: {
      layout: 'pathway', title: 'Digital Brokerage and Platform Partnerships', kicker: '',
      trunk: [
        { label: 'Portal discovery', detail: 'User finds a property' },
        { label: 'Consented referral', detail: 'Role and attribution recorded', kind: 'decision' },
      ],
      optionsLabel: 'Partner routes — alternatives, not steps',
      options: [
        { label: 'Broker', detail: 'Agent handles the deal' },
        { label: 'Developer', detail: 'Project sales team' },
        { label: 'Bank', detail: 'Finance offer from the lender' },
        { label: 'Other services', detail: 'Further property services' },
      ],
      note: 'Referral revenue requires clear role and attribution. Manage conflicts and consent.',
      takeaway: 'Platforms increasingly coordinate partners across the property journey.',
    },
  },
  'realestate-proptech-m5-8': {
    heading: 'Enterprise systems connected through APIs around one system of record',
    intro: 'APIs integrate sales, property, maintenance, finance and reporting systems. Each data type needs an assigned system of record so bad data does not spread.',
    spec: {
      layout: 'ecosystem', title: 'SaaS Adoption and Ecosystem Integration', kicker: '',
      center: { label: 'Assigned system of record', detail: 'Governed data shared via APIs' },
      actors: [
        { label: 'CRM', relation: 'Sales records', flows: ['information'] },
        { label: 'PMS', relation: 'Property and lease records', flows: ['information'] },
        { label: 'CMMS', relation: 'Maintenance work', flows: ['information', 'service'] },
        { label: 'Finance', relation: 'Billing and payments', flows: ['information', 'money'] },
        { label: 'Reporting', relation: 'Portfolio views', flows: ['information'] },
      ],
      note: 'Integration without governance can spread bad data. Assign a system of record.',
      takeaway: 'Enterprise adoption shifts from point tools toward connected workflows.',
    },
  },
  'realestate-proptech-m5-9': {
    heading: 'Consolidation can add breadth or hide weak segment economics',
    intro: 'Companies combine marketplaces, software, data, services and smart-building products. Bundled growth can mask segments that do not pay their way.',
    spec: {
      layout: 'compare', title: 'Consolidation and Hybrid Models', kicker: '',
      leftTitle: 'Breadth (when it works)', rightTitle: 'Complexity (the risk)',
      rows: [
        { label: 'Acquisition', a: 'Adds products and customers', b: 'More to integrate and run' },
        { label: 'Bundle', a: 'One offer across workflows', b: 'Hides weak segment economics' },
        { label: 'Service', a: 'Wider customer coverage', b: 'More operating obligations' },
        { label: 'Data', a: 'Data across combined products', b: 'More rights and quality to govern' },
        { label: 'Margin', a: 'Visible by product', b: 'Blended away in group totals' },
      ],
      note: 'Bundled growth can hide weak segment economics. Report product contribution and retention.',
      takeaway: 'Consolidation can create breadth or complexity.',
    },
  },
  'realestate-proptech-m5-10': {
    heading: 'Listing controls that keep digital property information accurate and authorized',
    intro: 'Platforms need listing controls, correction, complaints and transparent limitations. A verified identity does not prove every property claim.',
    spec: {
      layout: 'flow', title: 'Property Data and Consumer Protection', kicker: '',
      steps: [
        { label: 'Listing', detail: 'Information submitted for publication' },
        { label: 'Authority', detail: 'Is the poster entitled to list it?', kind: 'decision' },
        { label: 'Accuracy', detail: 'Property claims checked, not only identity' },
        { label: 'Disclosure', detail: 'Limitations presented transparently' },
        { label: 'Complaint', detail: 'Reports received and handled', kind: 'outcome' },
      ],
      loop: 'Complaints lead to corrections of the listing.',
      note: 'Use current real-estate rules, such as Vietnam’s Law on Real Estate Business No. 29/2023/QH15; applicability depends on activity and role.',
      takeaway: 'Digital property information must be accurate, authorized and responsibly presented.',
    },
  },
  'realestate-proptech-m5-11': {
    heading: 'Data and e-transaction duties a property product must map',
    intro: 'Products process identity, behavior, documents and payments with legal and security consequences. Which duties apply depends on role and activity.',
    spec: {
      layout: 'table', title: 'Personal Data, Cybersecurity and E-Transactions', kicker: '',
      headers: ['Duty area', 'What the product handles', 'Check to make'],
      rows: [
        { label: 'Consent', a: 'Identity and behavior data', b: 'Basis for processing' },
        { label: 'Purpose', a: 'Why each data item is used', b: 'Use stays within purpose' },
        { label: 'Security', a: 'Documents and payments', b: 'Controls fit the risk' },
        { label: 'Signature', a: 'Electronic records and signatures', b: 'Transaction-specific validity' },
        { label: 'Incident', a: 'Breaches or failures', b: 'Response is prepared' },
      ],
      note: 'Verify current primary law: Law on Personal Data Protection No. 91/2025/QH15 (effective 1 January 2026) and Law on Electronic Transactions No. 20/2023/QH15 (effective 1 July 2024). Electronic records do not remove transaction-specific validity checks.',
      takeaway: 'Data and digital transaction duties depend on role and activity.',
    },
  },
  'realestate-proptech-m5-12': {
    heading: 'The benefit to measure and the harm to control for each technology',
    intro: 'AI governance, building controls and analytics should address bias, privacy, security and resource outcomes. Estimated benefit is not measured return.',
    spec: {
      layout: 'table', title: 'Responsible AI and Efficient Buildings', kicker: '',
      headers: ['Technology', 'Benefit to measure', 'Harm to control'],
      rows: [
        { label: 'AI models', a: 'Better property decisions', b: 'Model risk and bias' },
        { label: 'Building controls', a: 'Energy and water outcomes', b: 'Security of connected systems' },
        { label: 'Analytics', a: 'Insight from property data', b: 'Privacy of people in the data' },
        { label: 'Evidence', a: 'Baseline, method and review', b: 'Claims beyond the evidence' },
      ],
      note: 'Estimated benefit is not measured return. Document baseline, method and review.',
      takeaway: 'Responsible technology needs measurable benefit and controlled harm.',
    },
  },
  'realestate-proptech-m5-13': {
    heading: 'Vietnam B2B growth areas by customer and workflow',
    intro: 'CRM, PMS, analytics and integrations support agencies, developers and managers. Growth comes from solving fragmented enterprise workflows on local records.',
    spec: {
      layout: 'taxonomy', title: 'Vietnam B2B SaaS and Data Infrastructure', kicker: '',
      root: 'Vietnam B2B PropTech', rootDetail: 'Customer groups and the products serving them',
      groups: [
        { label: 'Brokers and agencies', items: ['CRM'], detail: 'Lead and sales workflow' },
        { label: 'Developers', items: ['CRM', 'Analytics'], detail: 'Project sales workflow' },
        { label: 'Managers', items: ['PMS'], detail: 'Property operations workflow' },
        { label: 'Data infrastructure', items: ['Integrations', 'Analytics'], detail: 'Depends on local records' },
      ],
      note: 'Adoption depends on implementation and local records. Build mobile and role-specific workflows.',
      takeaway: 'B2B products can grow by solving fragmented enterprise workflows.',
    },
  },
  'realestate-proptech-m5-14': {
    heading: 'Deciding when a smart-building investment can claim savings',
    intro: 'Controls, CMMS, analytics and tenant tools can improve service and cost. Whether they do depends on installed systems, operating capability and asset-level measurement.',
    spec: {
      layout: 'decision', title: 'Smart Buildings and Operating Efficiency', kicker: '',
      root: { label: 'Proposed building technology', detail: 'Controls, CMMS, analytics or tenant tools' },
      question: 'Are installed systems, operating capability and an asset-level baseline in place?',
      branches: [
        { condition: 'All in place', outcome: 'Deploy and measure outcomes', detail: 'Report asset-level energy, maintenance and service results', tone: 'positive' },
        { condition: 'Systems in place, capability weak', outcome: 'Build operating capability first', detail: 'Technology needs people to run it', tone: 'caution' },
        { condition: 'No baseline', outcome: 'Do not claim savings', detail: 'Adoption alone does not prove savings', tone: 'negative' },
      ],
      note: 'Technology adoption alone does not prove savings. Use asset-level measured outcomes.',
      takeaway: 'Building technology opportunities depend on installed systems and operating capability.',
    },
  },
  'realestate-proptech-m5-15': {
    heading: 'What makes PropTech growth durable under a downside case',
    intro: 'Companies should compare marketplace, SaaS, data, hardware and service models under downside cases. High ARR growth can coexist with cash burn and churn.',
    spec: {
      layout: 'driverTree', title: 'Sustainable Models and Investment Risk', kicker: '',
      root: { label: 'Durable growth', detail: 'Growth that survives a downside case' },
      drivers: [
        { label: 'Revenue mix', detail: 'Marketplace, SaaS, data, hardware and service', children: [{ label: 'Contribution by model' }] },
        { label: 'Retention', detail: 'Cohort evidence, not ARR growth alone', children: [{ label: 'Churn' }] },
        { label: 'CAC', detail: 'Acquisition cost recovered by customers' },
        { label: 'Capital', detail: 'Discipline while cash burn persists' },
        { label: 'Scenario', detail: 'Downside and regulatory cases tested' },
      ],
      note: 'High ARR growth can coexist with cash burn and churn. Use cohort evidence and capital discipline.',
      takeaway: 'Durable growth requires retention, contribution and regulatory resilience.',
    },
  },
};
