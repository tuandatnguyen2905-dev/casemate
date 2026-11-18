import type { RealEstateProptechChapterVisual } from './realEstateProptechVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Property Technology & Marketplaces Module 03 (business models), keyed by visualKind. */
export const REAL_ESTATE_PROPTECH_M3_VISUALS: Record<string, RealEstateProptechChapterVisual> = {
  'realestate-proptech-m3-1': {
    heading: 'What a property marketplace sells to agents, landlords and developers',
    intro: 'Platforms sell listings, ads, subscriptions or leads without owning the property. For each product, define who pays, what they buy and how results are attributed.',
    spec: {
      layout: 'table', title: 'Listing, Advertising and Lead Generation', kicker: '',
      headers: ['Product sold', 'What the payer buys', 'Attribution to check'],
      rows: [
        { label: 'Listing fee', a: 'Placement of inventory on the platform', b: 'Listing volume, not transactions or GMV' },
        { label: 'Advertisement', a: 'Visibility in front of searchers', b: 'Exposure versus genuine contact' },
        { label: 'Subscription', a: 'Ongoing access to platform tools', b: 'Continued use by the paying business' },
        { label: 'Lead', a: 'Qualified demand from a searcher', b: 'Lead source through to conversion' },
      ],
      note: 'Payers are typically agents, landlords and developers. Listing volume is not transaction count or GMV.',
      takeaway: 'Marketplace revenue can come from visibility or qualified demand without owning property.',
    },
  },
  'realestate-proptech-m3-2': {
    heading: 'Transaction fees and data subscriptions earn different value and carry different risks',
    intro: 'Platforms may earn referral or transaction fees, or sell data and analytics subscriptions. The two models are measured differently and assume different risks.',
    spec: {
      layout: 'compare', title: 'Transaction, Commission and Data Models', kicker: '',
      leftTitle: 'Transaction and commission model', rightTitle: 'Data subscription model',
      rows: [
        { label: 'What is monetized', a: 'A referral or completed transaction', b: 'Access to data and analytics' },
        { label: 'Revenue measure', a: 'Take rate: recognized revenue over aligned GMV', b: 'Recurring subscription revenue' },
        { label: 'Common misreading', a: 'Treating GMV as company revenue', b: 'Treating data access as a transaction' },
        { label: 'Main risk', a: 'Overlap with regulated partner roles', b: 'Data accuracy and data rights' },
      ],
      note: 'GMV is not company revenue unless accounting supports gross recognition. Separate regulated partner roles.',
      takeaway: 'Transaction and data models monetize different value and assume different risks.',
    },
  },
  'realestate-proptech-m3-3': {
    heading: 'Six revenue lines in software and connected-building models, reported separately',
    intro: 'SaaS, licensing, usage fees, implementation, hardware and maintenance have different revenue and cost profiles, so they should be reported separately.',
    spec: {
      layout: 'table', title: 'SaaS, Enterprise and Smart-Building Models', kicker: '',
      headers: ['Revenue line', 'How it is earned', 'Reporting point'],
      rows: [
        { label: 'Subscription', a: 'Recurring software access', b: 'Recurring software revenue' },
        { label: 'License', a: 'Right to use the software', b: 'Separate from subscriptions' },
        { label: 'Usage', a: 'Fees tied to activity or volume', b: 'Varies with customer usage' },
        { label: 'Implementation', a: 'Setup and installation work', b: 'Track service obligations' },
        { label: 'Hardware', a: 'Connected devices for buildings', b: 'Can carry lower margin than software' },
        { label: 'Maintenance', a: 'Ongoing service of installed systems', b: 'Track service obligations' },
      ],
      note: 'Hardware revenue can have lower margin than recurring software. Track installation and service obligations.',
      takeaway: 'Recurring software and connected-building models combine different revenue and cost profiles.',
    },
  },
  'realestate-proptech-m3-4': {
    heading: 'Consumer discovery tools and broker workflow tools serve different users',
    intro: 'Products include portals, agent CRM, lead routing, scheduling and digital media. Searchers and brokers use them for different jobs, and responsibility must be clear.',
    spec: {
      layout: 'compare', title: 'Property Search and Digital Brokerage Tools', kicker: '',
      leftTitle: 'Consumer discovery', rightTitle: 'Broker workflow',
      rows: [
        { label: 'Main user', a: 'Buyers and renters searching', b: 'Agents and brokerages' },
        { label: 'Core tools', a: 'Search, map and recommendations', b: 'CRM, lead routing and scheduling' },
        { label: 'Output', a: 'A shortlist and a contact', b: 'A managed lead and appointment' },
        { label: 'Responsibility', a: 'Marketplace presents information', b: 'Broker performs the regulated role' },
      ],
      note: 'A marketplace is not the broker unless it performs that regulated role. Clarify participant responsibility.',
      takeaway: 'Consumer discovery and broker workflows serve different users.',
    },
  },
  'realestate-proptech-m3-5': {
    heading: 'What property-management software covers, and what stays a management service',
    intro: 'PMS and tenant products support lease administration, billing, work orders, communication and reporting. The software coordinates records; it does not deliver the management service itself.',
    spec: {
      layout: 'taxonomy', title: 'Property Management and Tenant Platforms', kicker: '',
      root: 'PMS and tenant platform', rootDetail: 'Modules that coordinate records and workflows',
      groups: [
        { label: 'Lease administration', detail: 'Lease records, terms and renewals' },
        { label: 'Rent and accounting', detail: 'Billing, collection and reporting' },
        { label: 'Maintenance', detail: 'Work orders and their status' },
        { label: 'Tenant communication', detail: 'Requests and notices to tenants' },
        { label: 'Outside the software', detail: 'Outsourced operations are a separate service' },
      ],
      note: 'Software output depends on accurate setup and process. Separate SaaS from outsourced operations.',
      takeaway: 'Property software coordinates records and workflows but does not automatically deliver management services.',
    },
  },
  'realestate-proptech-m3-6': {
    heading: 'Each data, valuation and building product carries its own evidence limit',
    intro: 'Market data, AVMs, analytics, sensors, controls and digital twins serve decisions and operations. Each needs its model and technical limits stated.',
    spec: {
      layout: 'table', title: 'Data, Valuation and Smart-Building Products', kicker: '',
      headers: ['Product', 'What it supports', 'Limit to state'],
      rows: [
        { label: 'Comparables and market data', a: 'Pricing and market decisions', b: 'Source coverage and freshness' },
        { label: 'AVM', a: 'An automated value estimate', b: 'Not an IVS valuation without professional judgement' },
        { label: 'Analytics', a: 'Patterns across portfolios', b: 'Model assumptions and inputs' },
        { label: 'Sensors and controls', a: 'Building operations', b: 'Savings are potential, not guaranteed' },
        { label: 'Digital twin', a: 'Simulation of assets and systems', b: 'Technical limits of the representation' },
      ],
      note: 'RICS: an AVM output without a valuer applying professional judgement is not an IVS-compliant valuation. DOE’s cited average 30% annual HVAC saving is a U.S. commercial-building potential, not a guarantee for every building.',
      takeaway: 'Data and physical systems require different evidence and accountability.',
    },
  },
  'realestate-proptech-m3-7': {
    heading: 'The consumer journey from discovery to transaction, stage by stage',
    intro: 'Searchers compare location, price, property and agent or owner responsiveness. Measure each qualified journey stage rather than registered users.',
    spec: {
      layout: 'flow', title: 'Consumers, Buyers and Renters', kicker: '',
      steps: [
        { label: 'Discovery', detail: 'Relevant inventory by location, price and property', owner: 'Searcher' },
        { label: 'Trust', detail: 'Clear, accurate listing information', owner: 'Platform' },
        { label: 'Contact', detail: 'Responsive agent or owner', owner: 'Agent / owner' },
        { label: 'Visit', detail: 'A safe next step in person', owner: 'Searcher and agent' },
        { label: 'Transaction', detail: 'Purchase or lease is completed', kind: 'outcome', owner: 'Buyer / renter' },
      ],
      note: 'Registered users do not equal active intent.',
      takeaway: 'Consumers need relevant inventory, clear information and safe next steps.',
    },
  },
  'realestate-proptech-m3-8': {
    heading: 'What drives revenue outcomes for agencies, developers and landlords',
    intro: 'Agencies, developers and landlords buy listings, leads, CRM, campaigns and analytics. What matters is whether demand turns into revenue, not the number of leads.',
    spec: {
      layout: 'driverTree', title: 'Brokers, Developers and Landlords', kicker: '',
      root: { label: 'Revenue outcome', detail: 'For an agency, developer or landlord' },
      drivers: [
        { label: 'Inventory', detail: 'Properties the business markets', children: [{ label: 'Listings' }] },
        { label: 'Demand generation', detail: 'Leads by tracked source', children: [{ label: 'Leads' }, { label: 'Campaigns' }] },
        { label: 'Workflow productivity', detail: 'Handling demand efficiently', children: [{ label: 'CRM' }, { label: 'Analytics' }] },
        { label: 'Conversion', detail: 'More leads can raise cost without better conversion' },
      ],
      note: 'Track lead source and revenue outcome.',
      takeaway: 'Property businesses need demand generation and workflow productivity.',
    },
  },
  'realestate-proptech-m3-9': {
    heading: 'What property managers, occupiers and investors adopt software for',
    intro: 'Managers, occupiers and investors adopt software for leases, maintenance, energy, reporting and analytics. All three need reliability, integration and measurable operating value.',
    spec: {
      layout: 'table', title: 'Property Managers, Occupiers and Investors', kicker: '',
      headers: ['Enterprise customer', 'Software used for', 'Value to prove'],
      rows: [
        { label: 'Property managers', a: 'Leases and maintenance', b: 'Reliable daily operation' },
        { label: 'Occupiers', a: 'Energy and reporting', b: 'Measurable operating value' },
        { label: 'Investors', a: 'Portfolio reporting and analytics', b: 'Insight across the portfolio' },
        { label: 'All enterprise buyers', a: 'Integration and security', b: 'Fit with existing systems' },
      ],
      note: 'Buying software does not prove adoption or ROI. Set implementation and outcome baselines.',
      takeaway: 'Enterprise customers need reliability, integration and measurable operating value.',
    },
  },
  'realestate-proptech-m3-10': {
    heading: 'How paying listings and variable cost set marketplace contribution',
    intro: 'Revenue can come from listings, ads, leads or transactions while costs include marketing, moderation, cloud and data. Move the hypothetical inputs to see monthly revenue and contribution change.',
    spec: {
      layout: 'scenario', title: 'Marketplace Revenue and Contribution', kicker: H,
      inputs: [
        { key: 'listings', label: 'Active listings', min: 2000, max: 20000, step: 1000, value: 10000, unit: 'listings' },
        { key: 'paying', label: 'Share of listings paying', min: 5, max: 50, step: 5, value: 20, unit: '%' },
        { key: 'fee', label: 'Monthly fee per paying listing', min: 5, max: 60, step: 5, value: 20, unit: 'USD' },
        { key: 'cost', label: 'Monthly variable cost', min: 5000, max: 40000, step: 1000, value: 15000, unit: 'USD' },
      ],
      outputs: [
        { label: 'Monthly revenue', unit: 'USD', digits: 0, compute: (v) => v.listings * (v.paying / 100) * v.fee },
        { label: 'Contribution', unit: 'USD', digits: 0, compute: (v) => v.listings * (v.paying / 100) * v.fee - v.cost },
        { label: 'Contribution margin', unit: '%', digits: 1, compute: (v) => ((v.listings * (v.paying / 100) * v.fee - v.cost) / (v.listings * (v.paying / 100) * v.fee)) * 100 },
      ],
      assumption: `${H}. Defaults follow the chapter example: 10,000 active listings, 20% paying USD20 gives USD40k monthly revenue; less USD15k variable cost leaves USD25k contribution, 62.5%. Assumptions are not benchmarks.`,
      note: 'Variable cost covers items such as marketing, moderation, cloud and data.',
      takeaway: 'Marketplace economics depend on monetized relevant supply and variable service cost.',
    },
  },
  'realestate-proptech-m3-11': {
    heading: 'How accounts, churn and CAC turn into MRR, LTV and payback',
    intro: 'MRR and ARR describe recurring run rate; churn, LTV/CAC and payback explain durability and acquisition efficiency. Change the hypothetical contract, margin, churn and CAC assumptions to see why each must be explicit.',
    spec: {
      layout: 'scenario', title: 'SaaS Recurring Revenue and Unit Economics', kicker: H,
      inputs: [
        { key: 'accounts', label: 'Paying accounts', min: 20, max: 500, step: 10, value: 100, unit: 'accounts' },
        { key: 'arpa', label: 'ARPA (monthly)', min: 100, max: 2000, step: 50, value: 500, unit: 'USD' },
        { key: 'margin', label: 'Gross margin', min: 40, max: 95, step: 5, value: 80, unit: '%' },
        { key: 'churn', label: 'Monthly churn', min: 0.5, max: 10, step: 0.5, value: 2, unit: '%' },
        { key: 'cac', label: 'CAC per account', min: 1000, max: 20000, step: 500, value: 6000, unit: 'USD' },
      ],
      outputs: [
        { label: 'MRR', unit: 'USD', digits: 0, compute: (v) => v.accounts * v.arpa },
        { label: 'ARR (run rate)', unit: 'USD', digits: 0, compute: (v) => v.accounts * v.arpa * 12 },
        { label: 'Simplified LTV per account', unit: 'USD', digits: 0, compute: (v) => (v.arpa * (v.margin / 100)) / (v.churn / 100) },
        { label: 'CAC payback', unit: 'months', digits: 1, compute: (v) => v.cac / (v.arpa * (v.margin / 100)) },
        { label: 'LTV / CAC', unit: '×', digits: 1, compute: (v) => (v.arpa * (v.margin / 100)) / (v.churn / 100) / v.cac },
      ],
      assumption: `${H}. Defaults follow the chapter example: 100 accounts × USD500 = USD50k MRR and USD600k ARR; at 80% margin, 2% monthly churn and USD6k CAC, simplified LTV is USD20k and payback 15 months.`,
      note: 'ARR is not cash collected. GRR and NRR also need explicit contract assumptions.',
      takeaway: 'SaaS metrics require explicit contract, churn and gross-margin assumptions.',
    },
  },
  'realestate-proptech-m3-12': {
    heading: 'Why USD1.5m of revenue still ends in a USD100k loss',
    intro: 'Cost includes development, cloud, data, acquisition, success, cybersecurity, hardware and support. In the chapter’s hypothetical example, four cost lines together exceed revenue.',
    spec: {
      layout: 'driverTree', title: 'Product Profitability and Enterprise KPIs', kicker: H,
      root: { label: 'Operating result: USD100k loss', detail: 'Hypothetical product P&L from the chapter' },
      formula: 'USD1.5m revenue − 600k − 500k − 250k − 250k = USD100k loss',
      drivers: [
        { label: 'Revenue', op: '+', detail: 'USD1.5m' },
        { label: 'Engineering', op: '−', detail: 'USD600k' },
        { label: 'Sales', op: '−', detail: 'USD500k' },
        { label: 'Infrastructure', op: '−', detail: 'USD250k' },
        { label: 'G&A', op: '−', detail: 'USD250k' },
        { label: 'Enterprise KPIs', detail: 'Explain whether the loss can close', children: [{ label: 'Activation' }, { label: 'Adoption' }, { label: 'Uptime' }, { label: 'Implementation margin' }] },
      ],
      note: `${H}. USD1.5m revenue less 600k engineering, 500k sales, 250k infrastructure and 250k G&A yields a USD100k loss. Measure product and cohort contribution.`,
      takeaway: 'User or revenue growth does not guarantee profit.',
    },
  },
  'realestate-proptech-m3-13': {
    heading: 'The self-service funnel from first visit to retained customer',
    intro: 'Consumer and SMB products use content, paid media, referrals, trials and in-product conversion. Self-service only works when onboarding and value are simple enough.',
    spec: {
      layout: 'flow', title: 'Self-Service and Digital Acquisition', kicker: '',
      steps: [
        { label: 'Acquisition', detail: 'SEO content, performance marketing or referrals' },
        { label: 'Trial', detail: 'User tries the product without a salesperson' },
        { label: 'Activation', detail: 'User reaches first real value' },
        { label: 'Conversion', detail: 'In-product upgrade to paid' },
        { label: 'Retained cohort', detail: 'Judge channels by cohort CAC and retention', kind: 'outcome' },
      ],
      note: 'Cheap signups can have weak activation. Acquisition channels are alternatives feeding the same funnel.',
      takeaway: 'Self-service works when onboarding and value are simple enough.',
    },
  },
  'realestate-proptech-m3-14': {
    heading: 'Enterprise deals move from account to rollout through a defined pilot gate',
    intro: 'Teams sell directly to developers, managers, owners and occupiers through pilots and procurement. A signed pilot only becomes recurring adoption when it passes a defined success gate.',
    spec: {
      layout: 'flow', title: 'Direct Enterprise Sales and Partnerships', kicker: '',
      steps: [
        { label: 'Account', detail: 'Developer, manager, owner or occupier', owner: 'Sales team or partner' },
        { label: 'Demo', detail: 'Show the workflow problem being solved' },
        { label: 'Pilot', detail: 'Success criteria agreed before start', kind: 'decision' },
        { label: 'Procurement', detail: 'Commercial and contract approval', owner: 'Customer' },
        { label: 'Rollout', detail: 'Recurring adoption beyond the pilot', kind: 'outcome' },
      ],
      note: 'A signed pilot is not recurring adoption. Define success and the rollout gate.',
      takeaway: 'Enterprise distribution requires consultative sales and implementation proof.',
    },
  },
  'realestate-proptech-m3-15': {
    heading: 'What grows revenue inside existing accounts after integration',
    intro: 'Platforms partner with agencies, developers, banks, software and device vendors, then expand accounts through adoption. Expansion comes from workflows that are actually used, not from integration count.',
    spec: {
      layout: 'driverTree', title: 'Integrations and Customer Expansion', kicker: '',
      root: { label: 'Account expansion (NRR)', detail: 'Revenue growth from existing customers' },
      drivers: [
        { label: 'Active connected workflows', detail: 'Integrations that customers really use', children: [{ label: 'API' }, { label: 'Marketplace partner' }] },
        { label: 'Adoption', detail: 'Driven by customer success', children: [{ label: 'Customer success' }] },
        { label: 'Upsell', detail: 'More products or seats in the account' },
        { label: 'Switching cost', detail: 'Rises when integrations are useful' },
      ],
      note: 'Integration count does not prove usage. Measure active connected workflows.',
      takeaway: 'Integrations can improve distribution and switching cost when useful.',
    },
  },
  'realestate-proptech-m3-16': {
    heading: 'Real estate participants supply the inventory, workflows and customers a platform depends on',
    intro: 'Owners, developers, brokers and managers supply inventory, workflows and customers. The technology firm depends on them and does not automatically replace them.',
    spec: {
      layout: 'ecosystem', title: 'PropTech Firms and Real Estate Participants', kicker: '',
      center: { label: 'PropTech platform', detail: 'Does not own every listed property' },
      actors: [
        { label: 'Owners', relation: 'Supply property inventory', flows: ['product', 'information'] },
        { label: 'Developers', relation: 'Supply projects and buy services', flows: ['product', 'money'] },
        { label: 'Brokers', relation: 'Bring listings and run sales workflows', flows: ['information', 'money'] },
        { label: 'Managers', relation: 'Run operations through the software', flows: ['service', 'money'] },
      ],
      note: 'Document each participant’s role and contract.',
      takeaway: 'Technology firms depend on asset and service participants without replacing them automatically.',
    },
  },
  'realestate-proptech-m3-17': {
    heading: 'Partner types that extend a product, and the risk each adds',
    intro: 'Cloud, identity, mapping, data, banks, payments and hardware vendors support delivery. Each partner extends capability but also widens the compliance surface.',
    spec: {
      layout: 'taxonomy', title: 'Technology, Data and Financial Partners', kicker: '',
      root: 'Delivery partners', rootDetail: 'Allocate risk and data rights for each',
      groups: [
        { label: 'Technology infrastructure', items: ['Cloud', 'Identity', 'Mapping', 'API'] },
        { label: 'Data providers', detail: 'Data rights must be agreed' },
        { label: 'Financial partners', items: ['Bank', 'Payment'], detail: 'Referral does not make the portal the lender' },
        { label: 'Device vendors', detail: 'Hardware for connected buildings' },
      ],
      note: 'Finance referral does not make the portal the lender. Allocate risk and data rights.',
      takeaway: 'Partners extend product capability and compliance surface.',
    },
  },
  'realestate-proptech-m3-18': {
    heading: 'The people and authorities that shape trust around a PropTech service',
    intro: 'Users and authorities shape trust, legal form, data protection, cybersecurity and service outcomes. Automation does not remove consumer protection.',
    spec: {
      layout: 'ecosystem', title: 'Regulators, Consumers and Building Users', kicker: '',
      center: { label: 'PropTech service', detail: 'Touches people, property and regulated transactions' },
      actors: [
        { label: 'Consumers', relation: 'Rely on accurate information and protection', flows: ['information', 'risk'] },
        { label: 'Tenants and building users', relation: 'Receive building and tenant services', flows: ['service'] },
        { label: 'Data subjects', relation: 'Have personal data processed', flows: ['information', 'risk'] },
        { label: 'Authorities', relation: 'Set legal form and data duties', flows: ['oversight'] },
        { label: 'Operators', relation: 'Deliver the service outcome', flows: ['service', 'money'] },
      ],
      note: 'Use current official sources, such as Vietnam’s Law on Real Estate Business No. 29/2023/QH15, Law on Personal Data Protection No. 91/2025/QH15 and Law on Electronic Transactions No. 20/2023/QH15. Applicability depends on activity and role.',
      takeaway: 'PropTech affects people, property and regulated transactions.',
    },
  },
};
