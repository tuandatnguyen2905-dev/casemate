import type { RealEstateAdvisoryChapterVisual } from './realEstateAdvisoryVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Property Advisory & Management Module 03, keyed by visualKind. */
export const REAL_ESTATE_ADVISORY_M3_VISUALS: Record<string, RealEstateAdvisoryChapterVisual> = {
  'realestate-advisory-m3-1': {
    heading: 'A brokerage or leasing mandate earns only when a defined completion event occurs',
    intro: 'Brokerage and leasing agency use mandates, leads, negotiations and completion events. Commission revenue should not be confused with property transaction value.',
    spec: {
      layout: 'flow', title: '01 Transaction Brokerage and Leasing Agency', kicker: '',
      steps: [
        { label: 'Mandate', detail: 'Client authorises the sale or lease assignment', owner: 'Client and agent' },
        { label: 'Leads', detail: 'Prospective buyers or tenants are sourced', owner: 'Agent' },
        { label: 'Negotiation', detail: 'Terms are agreed between the parties', kind: 'decision', owner: 'Agent' },
        { label: 'Completion event', detail: 'The defined sale or lease outcome occurs', owner: 'Parties' },
        { label: 'Commission earned', detail: 'Agency revenue, not the property value', kind: 'outcome', owner: 'Agency' },
      ],
      note: 'Conversion from mandate to completion drives revenue. In Vietnam, verify fee entitlement and legal requirements before acting.',
      takeaway: 'Transaction businesses earn when defined sale or lease outcomes occur.',
    },
  },
  'realestate-advisory-m3-2': {
    heading: 'What a valuation or advisory assignment must define before the fee is earned',
    intro: 'Valuation and due diligence assignments are scoped by client, property, purpose, date, assumptions and standards. An appraised value is not a guaranteed sale price.',
    spec: {
      layout: 'driverTree', title: '02 Valuation and Investment Advisory', kicker: '',
      root: { label: 'Documented advisory deliverable', detail: 'Professional analysis and judgement' },
      drivers: [
        { label: 'Purpose', detail: 'Why the client needs the advice', children: [{ label: 'Client' }, { label: 'Property' }] },
        { label: 'Basis', detail: 'The value definition applied', children: [{ label: 'Date' }, { label: 'Assumptions' }, { label: 'Standards' }] },
        { label: 'Evidence', detail: 'Market and property information relied on' },
        { label: 'Fee', detail: 'Compensates analysis, not the value outcome' },
        { label: 'Liability', detail: 'Accountability for the stated opinion' },
      ],
      note: 'Use official valuation standards, e.g. Circular 42/2024/TT-BTC in Vietnam and RICS Valuation — Global Standards.',
      takeaway: 'Advisory fees compensate professional analysis, judgement and documented deliverables.',
    },
  },
  'realestate-advisory-m3-3': {
    heading: 'Property, facilities and asset management are separate service lines that can be combined',
    intro: 'Property, facilities and asset management can be separate or integrated under service agreements. Rent and service-charge funds belong economically to owners or defined accounts, not the manager.',
    spec: {
      layout: 'taxonomy', title: '03 Recurring Management and Integrated Services', kicker: '',
      root: 'Recurring service agreements', rootDetail: 'Service lines — separate or integrated, each with its own scope',
      groups: [
        { label: 'Property management', detail: 'Administration and operation for an owner under a mandate' },
        { label: 'Facilities management (FM)', detail: 'Building services and operational delivery' },
        { label: 'Asset management', detail: 'Owner-side oversight of asset performance' },
        { label: 'Contract terms', items: ['SLA', 'Recurring fee', 'Defined scope'] },
      ],
      note: 'Rent and service-charge funds belong to owners or defined accounts, not the manager. Separate each service line.',
      takeaway: 'Recurring contracts trade episodic commissions for ongoing delivery obligations.',
    },
  },
  'realestate-advisory-m3-4': {
    heading: 'Residential transactions and community operations need different teams',
    intro: 'Residential services include brokerage, leasing, valuation and building management for individual and institutional owners. Unit brokerage and condominium management require different teams.',
    spec: {
      layout: 'compare', title: '04 Residential Property Services', kicker: '',
      leftTitle: 'Transaction work (e.g. unit brokerage)', rightTitle: 'Community operations (e.g. condominium management)',
      rows: [
        { label: 'Services', a: 'Sale, lease and valuation of units', b: 'Building management' },
        { label: 'Main counterparts', a: 'Owners, buyers and tenants', b: 'Owners and residents' },
        { label: 'Timing', a: 'Episodic, per transaction', b: 'Ongoing, day to day' },
        { label: 'Team', a: 'Transaction team', b: 'Building management team' },
        { label: 'Law to apply', a: 'Service-specific brokerage rules', b: 'Service-specific building rules' },
      ],
      note: 'Clients may be individual or institutional owners. Apply service-specific law to each side.',
      takeaway: 'Residential work spans transactions and community operations.',
    },
  },
  'realestate-advisory-m3-5': {
    heading: 'Commercial property results depend on area, tenants, rent, footfall and service together',
    intro: 'Office and retail properties require occupier strategy, effective-rent analysis, service and vendor management. Retail leasing depends on tenant mix as well as occupancy.',
    spec: {
      layout: 'driverTree', title: '05 Office, Retail and Commercial Services', kicker: '',
      root: { label: 'Commercial property performance', detail: 'Measured with property-specific metrics' },
      drivers: [
        { label: 'NLA', detail: 'Leasable area available to let' },
        { label: 'Tenant', detail: 'Occupier strategy and tenant mix', children: [{ label: 'Office occupiers' }, { label: 'Retail tenant mix' }] },
        { label: 'Rent', detail: 'Effective-rent analysis, not headline rent' },
        { label: 'Footfall', detail: 'Visitor traffic that supports retail leasing' },
        { label: 'Service', detail: 'Service and vendor management' },
      ],
      note: 'Retail leasing depends on tenant mix as well as occupancy. Use property-specific metrics.',
      takeaway: 'Commercial services combine leasing, investment advice and operations.',
    },
  },
  'realestate-advisory-m3-6': {
    heading: 'Industrial clients need advisers for site and lease decisions and facility teams for continuity',
    intro: 'Advisers support site and lease decisions while facility teams maintain critical systems and service continuity. Warehouse uptime and safety differ from office tenant experience.',
    spec: {
      layout: 'compare', title: '06 Industrial, Logistics and Facilities Services', kicker: '',
      leftTitle: 'Advisers (site and lease decisions)', rightTitle: 'Facility teams (operations)',
      rows: [
        { label: 'Industrial park', a: 'Site selection and lease terms', b: 'Shared infrastructure kept running' },
        { label: 'Warehouse', a: 'Lease decision for the occupier', b: 'Uptime of daily operations' },
        { label: 'Technical systems', a: 'Assessed as part of the site', b: 'Critical systems maintained' },
        { label: 'Safety', a: 'Considered in the decision', b: 'Managed every day on site' },
      ],
      note: 'Warehouse uptime and safety differ from office tenant experience. Match competency to asset.',
      takeaway: 'Industrial property needs technical and operational specialization.',
    },
  },
  'realestate-advisory-m3-7': {
    heading: 'Each type of property client prioritises a different outcome',
    intro: 'Developers, landlords, funds and investors need market evidence, leasing, valuation, management and reporting. An investor mandate may prioritize NOI and exit while a developer prioritizes lease-up.',
    spec: {
      layout: 'table', title: '07 Owners, Developers and Investors', kicker: '',
      headers: ['Client', 'Typical priority', 'Services drawn on'],
      rows: [
        { label: 'Developer', a: 'Lease-up of the project', b: 'Market evidence and leasing' },
        { label: 'Investor', a: 'NOI and exit', b: 'Valuation and reporting' },
        { label: 'Landlord', a: 'Protecting rental income', b: 'Leasing and management' },
        { label: 'Fund', a: 'Value and risk across assets', b: 'Reporting and valuation' },
      ],
      note: 'Priorities are illustrative of the chapter example — clarify each client objective before acting.',
      takeaway: 'Property clients seek decisions and operations that protect income and value.',
    },
  },
  'realestate-advisory-m3-8': {
    heading: 'Occupancy cost for a corporate tenant is built from more than rent',
    intro: 'Corporate tenants use advisory, tenant representation and facility services to support business activity. Lowest rent is not lowest occupancy cost.',
    spec: {
      layout: 'driverTree', title: '08 Occupiers and Corporate Tenants', kicker: '',
      root: { label: 'Fit-for-purpose occupancy', detail: 'Compare total terms and service' },
      drivers: [
        { label: 'Location', detail: 'Where the business needs to operate' },
        { label: 'Space', detail: 'Fit for the activity it supports' },
        { label: 'Lease', detail: 'Rent plus the wider terms', children: [{ label: 'Rent' }, { label: 'Other lease terms' }] },
        { label: 'Service', detail: 'Dependable facility operations' },
        { label: 'Flexibility', detail: 'Room to adapt as needs change' },
      ],
      note: 'Tenant representation advises the occupier; facility services keep operations dependable.',
      takeaway: 'Occupiers need fit-for-purpose space and dependable operations.',
    },
  },
  'realestate-advisory-m3-9': {
    heading: 'The residential agent sits between parties who each face information and conduct risk',
    intro: 'Residential buyers, sellers, landlords and tenants face information and conduct risks. Digital listing data must still be verified.',
    spec: {
      layout: 'ecosystem', title: '09 Residential Clients and Transaction Parties', kicker: '',
      center: { label: 'Residential agent', detail: 'Acts under clear authority' },
      actors: [
        { label: 'Seller', relation: 'Gives authority and property information', flows: ['information'] },
        { label: 'Buyer', relation: 'Relies on verified information', flows: ['information', 'risk'] },
        { label: 'Owner / landlord', relation: 'Mandates leasing of the home', flows: ['service'] },
        { label: 'Tenant', relation: 'Needs clear terms and communication', flows: ['information', 'service'] },
        { label: 'Listing data', relation: 'Digital data that must still be verified', flows: ['information', 'risk'] },
      ],
      note: 'Trust depends on authority, information and communication. Protect consumer and client interests.',
      takeaway: 'Individuals need clear authority, information, communication and transaction support.',
    },
  },
  'realestate-advisory-m3-10': {
    heading: 'Try it: how commission, acquisition and delivery cost set brokerage contribution',
    intro: 'Brokerage profitability deducts lead acquisition, agent compensation and attributable delivery cost from earned commission. The chapter example: USD5m at 2% earns USD100k; less USD20k acquisition and USD30k delivery gives USD50k contribution and 50%.',
    spec: {
      layout: 'scenario', title: '10 Brokerage Transaction Economics', kicker: H,
      inputs: [
        { key: 'value', label: 'Transaction value', min: 1, max: 20, step: 1, value: 5, unit: 'USD m' },
        { key: 'rate', label: 'Commission rate', min: 0.5, max: 5, step: 0.5, value: 2, unit: '%' },
        { key: 'cac', label: 'Lead acquisition cost (CAC)', min: 0, max: 100, step: 5, value: 20, unit: 'USD k' },
        { key: 'delivery', label: 'Delivery cost', min: 0, max: 100, step: 5, value: 30, unit: 'USD k' },
      ],
      outputs: [
        { label: 'Agency revenue (commission)', unit: 'USD k', digits: 0, compute: (v) => v.value * 1000 * v.rate / 100 },
        { label: 'Contribution', unit: 'USD k', digits: 0, compute: (v) => v.value * 10 * v.rate - v.cac - v.delivery },
        { label: 'Contribution margin', unit: '%', digits: 0, compute: (v) => ((v.value * 10 * v.rate - v.cac - v.delivery) / (v.value * 10 * v.rate)) * 100 },
      ],
      assumption: `${H}. Illustrative inputs from the chapter example, not market rates.`,
      note: 'Transaction value is the property price; only the commission is agency revenue.',
      takeaway: 'Agency revenue is commission, not the underlying property value.',
    },
  },
  'realestate-advisory-m3-11': {
    heading: 'From gross rent to owner NOI: vacancy and operating expenses come off first',
    intro: 'Gross potential rent less vacancy and operating expenses produces owner NOI under defined scope. The chapter example: USD1.2m gross rent less 10% vacancy and USD380k expenses gives USD700k NOI.',
    spec: {
      layout: 'waterfall', title: '11 Owner Leasing and Operating Economics', kicker: H,
      unit: 'USD thousand', basis: `${H} — owner property account, defined scope`,
      items: [
        { label: 'Gross potential rent', value: 1200, kind: 'start' },
        { label: 'Vacancy (10%)', value: 120, kind: 'subtract' },
        { label: 'Operating expenses', value: 380, kind: 'subtract' },
        { label: 'Owner NOI', value: 700, kind: 'total' },
      ],
      note: 'NOI is the owner’s, not manager revenue; a cap rate applied to NOI informs value. Separate owner cash from service fees.',
      takeaway: 'NOI belongs to the property owner and should not be reported as manager revenue.',
    },
  },
  'realestate-advisory-m3-12': {
    heading: 'From management fee to provider contribution: staff, outsourcing and technology come off',
    intro: 'Service-provider profitability depends on fee scope and delivery resources. The chapter example: USD500k fee less USD250k staff, USD150k outsource and USD30k technology leaves USD70k contribution, 14%.',
    spec: {
      layout: 'waterfall', title: '12 Management Contract KPIs and Profitability', kicker: H,
      unit: 'USD thousand', basis: `${H} — service-provider account, not the property account`,
      items: [
        { label: 'Fee revenue', value: 500, kind: 'start' },
        { label: 'Staff', value: 250, kind: 'subtract' },
        { label: 'Outsource', value: 150, kind: 'subtract' },
        { label: 'Technology', value: 30, kind: 'subtract' },
        { label: 'Contribution (14%)', value: 70, kind: 'total' },
      ],
      note: 'Track KPIs alongside: occupancy, collection, retention, WALE, service-charge recovery and SLA performance. Define provider versus property accounts.',
      takeaway: 'Service-provider profitability depends on fee scope and delivery resources.',
    },
  },
  'realestate-advisory-m3-13': {
    heading: 'Agents, branches and referrers all feed one controlled client and listing record',
    intro: 'Direct agents, co-brokers and referrals source opportunities. Duplicate leads can create fee disputes.',
    spec: {
      layout: 'ecosystem', title: '13 Brokerage Networks and Referrals', kicker: '',
      center: { label: 'Controlled client and listing records', detail: 'Single source for authority and attribution' },
      actors: [
        { label: 'Direct agents', relation: 'Source and register leads', flows: ['information'] },
        { label: 'Branches', relation: 'Extend local reach', flows: ['information', 'oversight'] },
        { label: 'Co-brokers', relation: 'Share deals under agreed terms', flows: ['information', 'money'] },
        { label: 'Referral partners', relation: 'Introduce clients for attribution', flows: ['information', 'money'] },
        { label: 'Conflict controls', relation: 'Resolve duplicate leads and fee claims', flows: ['oversight', 'risk'] },
      ],
      note: 'Duplicate leads can create fee disputes — use controlled client and listing records.',
      takeaway: 'Networks extend reach but require authority, attribution and conduct controls.',
    },
  },
  'realestate-advisory-m3-14': {
    heading: 'How institutional mandates are won — and why winning creates obligations',
    intro: 'Corporate leasing, valuation panels and management contracts use pitches, tenders and relationship development. Winning a tender creates delivery obligations, not guaranteed margin.',
    spec: {
      layout: 'flow', title: '14 Corporate and Institutional Business Development', kicker: '',
      steps: [
        { label: 'Relationship development', detail: 'Credibility built with the client' },
        { label: 'Pitch', detail: 'Capability presented for the mandate' },
        { label: 'Tender', detail: 'Staffing and SLA scope priced', kind: 'decision' },
        { label: 'Framework or appointment', detail: 'Panel or contract awarded' },
        { label: 'Accountable delivery', detail: 'Obligations met under the contract' },
        { label: 'Renewal', detail: 'Earned through delivery, not assumed', kind: 'outcome' },
      ],
      loop: 'Delivery record feeds the next pitch and renewal.',
      note: 'A tender win creates delivery obligations, not guaranteed margin.',
      takeaway: 'Institutional services are won through credibility, capability and accountable delivery.',
    },
  },
  'realestate-advisory-m3-15': {
    heading: 'Digital tools split into marketing, client management and service reporting',
    intro: 'Listings, CRM, tenant apps and client dashboards support marketing and service. Portal traffic is not transaction conversion.',
    spec: {
      layout: 'taxonomy', title: '15 Digital Listings and Client Platforms', kicker: '',
      root: 'Digital channels', rootDetail: 'Tool types — each useful only with accurate, authorized data',
      groups: [
        { label: 'Discovery and marketing', items: ['Portal listings', 'Virtual tour'] },
        { label: 'Client management', items: ['CRM'] },
        { label: 'Service and reporting', items: ['Tenant apps', 'Client dashboard'] },
        { label: 'Data foundation', detail: 'Govern data rights and quality' },
      ],
      note: 'Portal traffic is not transaction conversion.',
      takeaway: 'Digital channels improve discovery and reporting when data is accurate and authorized.',
    },
  },
  'realestate-advisory-m3-16': {
    heading: 'Owners keep the asset economics; service firms work under their mandates',
    intro: 'Owners, investors and developers appoint advisers and managers under contracts and retain asset economics and risk. AUM describes mandate scale, not ownership or revenue.',
    spec: {
      layout: 'compare', title: '16 Owners, Investors and Developers', kicker: '',
      leftTitle: 'Owner / capital provider (client)', rightTitle: 'Adviser or manager (service firm)',
      rows: [
        { label: 'Asset', a: 'Owns it', b: 'Works on it under contract' },
        { label: 'Capital and return', a: 'Provides capital, keeps the return', b: 'Earns service fees' },
        { label: 'Risk', a: 'Retains asset risk', b: 'Carries delivery obligations' },
        { label: 'Mandate', a: 'Appoints and sets scope', b: 'AUM shows mandate scale only' },
        { label: 'Governance', a: 'Decides and oversees', b: 'Reports and recommends' },
      ],
      note: 'AUM is not ownership or revenue. State valuation basis and date when quoting it.',
      takeaway: 'Property owners and capital providers are clients, not service-company assets.',
    },
  },
  'realestate-advisory-m3-17': {
    heading: 'Each professional role contributes a separate output under its own standards',
    intro: 'Transaction, valuation, management and technical vendors contribute separate outputs. A manager coordinating maintenance does not automatically perform every technical task.',
    spec: {
      layout: 'table', title: '17 Brokers, Valuers, Managers and Contractors', kicker: '',
      headers: ['Role', 'Separate output', 'Accountable for'],
      rows: [
        { label: 'Broker', a: 'Completed sale or lease', b: 'Acting within defined authority' },
        { label: 'Valuer', a: 'Opinion of value', b: 'Stated purpose, basis and date' },
        { label: 'Property manager (PM)', a: 'Property administration', b: 'Coordinating services for the owner' },
        { label: 'Facilities manager (FM)', a: 'Building operations', b: 'Service continuity' },
        { label: 'Technical vendor', a: 'Specialist technical work', b: 'Its own scope of work' },
      ],
      note: 'Coordinating maintenance is not performing every technical task — use vendor accountability.',
      takeaway: 'Professional roles collaborate while retaining distinct standards and duties.',
    },
  },
  'realestate-advisory-m3-18': {
    heading: 'Lenders, lawyers, authorities and standard-setters surround every property deal',
    intro: 'Banks, lawyers, authorities and professional bodies provide finance, legal process, regulation and guidance. Professional guidance does not override local law.',
    spec: {
      layout: 'ecosystem', title: '18 Banks, Lawyers and Regulators', kicker: '',
      center: { label: 'Transaction, valuation or operation', detail: 'Delivered by the service firm' },
      actors: [
        { label: 'Lender', relation: 'Provides finance', flows: ['money', 'risk'] },
        { label: 'Lawyer', relation: 'Runs the legal process', flows: ['service', 'information'] },
        { label: 'Authority', relation: 'Regulates and enforces law', flows: ['oversight'] },
        { label: 'Professional body', relation: 'Issues standards and guidance', flows: ['information', 'oversight'] },
      ],
      note: 'Local law prevails over guidance — e.g. Law on Real Estate Business No. 29/2023/QH15 and Circular 42/2024/TT-BTC. Verify current official sources.',
      takeaway: 'Supporting institutions shape transactions, valuations and operations.',
    },
  },
};
