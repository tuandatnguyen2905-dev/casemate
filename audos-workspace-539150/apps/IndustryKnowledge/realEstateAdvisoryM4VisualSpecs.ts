import type { RealEstateAdvisoryChapterVisual } from './realEstateAdvisoryVisualSpecs';

/** Chapter-specific Learning Visuals for Property Advisory & Management Module 04, keyed by visualKind. */
export const REAL_ESTATE_ADVISORY_M4_VISUALS: Record<string, RealEstateAdvisoryChapterVisual> = {
  'realestate-advisory-m4-1': {
    heading: 'Five pressures set how hard a property service is to compete in',
    intro: 'Clients can tender services while digital platforms reduce some information advantages. Low-entry brokerage differs from standards-intensive valuation or complex FM.',
    spec: {
      layout: 'driverTree', title: '01 Five Forces in Property Services', kicker: '',
      root: { label: 'Competitive intensity', detail: 'Assess by service and property' },
      drivers: [
        { label: 'Client power', detail: 'Clients can tender services' },
        { label: 'Talent', detail: 'Specialist professionals are scarce inputs' },
        { label: 'Entry', detail: 'Low in brokerage, higher in valuation or complex FM', children: [{ label: 'Brokerage' }, { label: 'Valuation' }, { label: 'Complex FM' }] },
        { label: 'Substitute', detail: 'Digital platforms reduce some information advantages' },
        { label: 'Rivalry', detail: 'Competition for mandates and renewals' },
      ],
      note: 'Trust and recurring mandates soften these pressures; the balance differs by service line.',
      takeaway: 'Trust, relationships, specialist talent and recurring mandates shape competition.',
    },
  },
  'realestate-advisory-m4-2': {
    heading: 'The market is made of several provider types, each solving a different need',
    intro: 'Markets include local agencies, international networks, valuers, managers, facility contractors and digital platforms. Global reach does not guarantee local execution.',
    spec: {
      layout: 'taxonomy', title: '02 Fragmentation and Professional Specialization', kicker: '',
      root: 'Property service providers', rootDetail: 'Provider types — categories, not stages',
      groups: [
        { label: 'Local broker', detail: 'Local agencies and their relationships' },
        { label: 'Global network', detail: 'International networks and systems' },
        { label: 'Specialist', items: ['Valuers', 'Managers', 'Facility contractors'] },
        { label: 'Integrated provider', detail: 'Several services under one firm' },
        { label: 'Platform', detail: 'Digital listing and discovery' },
      ],
      note: 'Global reach does not guarantee local execution — verify the legal entity and team.',
      takeaway: 'Scale and specialization solve different client needs.',
    },
  },
  'realestate-advisory-m4-3': {
    heading: 'Why changing an embedded provider is costly for the client',
    intro: 'Mandates depend on competence, conflicts, client knowledge, systems and service continuity. Changing a building manager can disrupt records and vendors.',
    spec: {
      layout: 'driverTree', title: '03 Trust, Switching and Barriers to Entry', kicker: '',
      root: { label: 'Switching cost and entry barrier', detail: 'Built from credibility and embedded operations' },
      drivers: [
        { label: 'Track record', detail: 'Demonstrated competence on similar mandates' },
        { label: 'Qualification', detail: 'Professional credibility of the team' },
        { label: 'Data', detail: 'Client knowledge and building records', children: [{ label: 'Records' }, { label: 'Client knowledge' }] },
        { label: 'Integration', detail: 'Systems and vendors tied into operations' },
        { label: 'Retention', detail: 'Service continuity the client wants to keep' },
      ],
      note: 'If a change is made, plan the transition and data handover.',
      takeaway: 'Professional credibility and embedded operations can create switching costs.',
    },
  },
  'realestate-advisory-m4-4': {
    heading: 'Group-level scale differs from what a local entity can actually deliver',
    intro: 'International participants often combine transaction and recurring services through networks. Actual country and service capability varies by legal entity, team and mandate.',
    spec: {
      layout: 'compare', title: '04 International Real Estate Service Firms', kicker: '',
      leftTitle: 'Global group view', rightTitle: 'Local (Vietnam) capability check',
      rows: [
        { label: 'Service lines', a: 'Brokerage, valuation, advisory, management, FM', b: 'Which ones the local entity provides' },
        { label: 'Scale figures', a: 'Group AUM or transaction value', b: 'Not Vietnam revenue' },
        { label: 'Delivery', a: 'Network-wide systems', b: 'Local legal entity, team and mandate' },
        { label: 'Evidence', a: 'Group reporting', b: 'Local disclosures' },
      ],
      note: 'A global group’s AUM or transaction value should not be treated as Vietnam revenue.',
      takeaway: 'International participants often combine transaction and recurring services through networks.',
    },
  },
  'realestate-advisory-m4-5': {
    heading: 'Vietnam providers span residential networks, commercial advisers, valuers and operators',
    intro: 'Vietnam firms range from residential networks to commercial advisers, valuers and operators. Local relationships and market knowledge can compete with global systems and client networks.',
    spec: {
      layout: 'taxonomy', title: '05 Vietnam Providers and Local Networks', kicker: '',
      root: 'Vietnam providers', rootDetail: 'Categories by service scope — verify each firm’s actual scope',
      groups: [
        { label: 'Residential networks', detail: 'Sales and leasing of homes' },
        { label: 'Commercial advisers', detail: 'Leasing and advice for commercial property' },
        { label: 'Valuers', detail: 'Professional opinions of value' },
        { label: 'Operators and managers', detail: 'Property and building management' },
      ],
      note: 'Domestic strengths are local relationships and market knowledge. Listing count does not establish completed transaction share.',
      takeaway: 'Vietnam firms range from residential networks to commercial advisers, valuers and operators.',
    },
  },
  'realestate-advisory-m4-6': {
    heading: 'Choosing between a specialist and an integrated provider depends on the mandate',
    intro: 'Clients choose between focused expertise and one-provider models. Integration can improve data flow or create conflicts requiring controls.',
    spec: {
      layout: 'decision', title: '06 Specialist Versus Integrated Providers', kicker: '',
      root: { label: 'Client mandate', detail: 'One service or several linked services' },
      question: 'Does the client need niche depth, or coordination across several mandates?',
      branches: [
        { condition: 'Single niche need', outcome: 'Specialist provider', detail: 'Depth in one service or asset type', tone: 'positive' },
        { condition: 'Linked mandates, conflicts controlled', outcome: 'Integrated provider', detail: 'Cross-sell and data flow at scale', tone: 'positive' },
        { condition: 'Linked mandates, conflicts unmanaged', outcome: 'Disclose and manage first', detail: 'Integration can create conflicts', tone: 'caution' },
      ],
      note: 'Judge either model on delivered quality, not on scale or breadth alone.',
      takeaway: 'Specialists offer depth while integrated firms coordinate multiple mandates.',
    },
  },
  'realestate-advisory-m4-7': {
    heading: 'Benchmark capability by completed work and qualified teams, not claimed coverage',
    intro: 'Benchmark residential, office, retail, industrial, valuation, management and facility capability separately. Claimed coverage is weaker than completed mandates and qualified teams.',
    spec: {
      layout: 'table', title: '07 Service Portfolio and Sector Expertise', kicker: '',
      headers: ['Benchmark dimension', 'Weaker evidence', 'Stronger evidence'],
      rows: [
        { label: 'Service', a: 'Listed service lines', b: 'Completed mandates per service' },
        { label: 'Asset class', a: 'Claimed sector coverage', b: 'Work done in that property type' },
        { label: 'Client', a: 'Claimed client base', b: 'Mandates delivered for similar clients' },
        { label: 'Team and qualification', a: 'Firm-wide headcount', b: 'Qualified team on the mandate' },
      ],
      note: 'Match the legal entity and period being compared.',
      takeaway: 'Portfolio breadth must be paired with demonstrated property expertise.',
    },
  },
  'realestate-advisory-m4-8': {
    heading: 'Each scale metric measures something different and cannot be swapped',
    intro: 'Transaction value, leasing volume, NLA, AUM, properties and units managed use different bases. AUM is not assets owned, manager revenue or transaction value.',
    spec: {
      layout: 'table', title: '08 Transaction, Leasing and Management Scale', kicker: '',
      headers: ['Metric', 'What it measures', 'It is not'],
      rows: [
        { label: 'Transaction value', a: 'Value of properties transacted', b: 'Agency revenue' },
        { label: 'Commission', a: 'Fee earned on transactions', b: 'Property value' },
        { label: 'NLA', a: 'Leasable area leased or managed', b: 'Revenue or value' },
        { label: 'AUM', a: 'Scale of mandates on a valuation basis', b: 'Assets owned or manager revenue' },
        { label: 'Managed units', a: 'Properties and units under management', b: 'Fee or profit' },
      ],
      note: 'Normalize valuation basis and date before comparing firms.',
      takeaway: 'Scale metrics are not interchangeable.',
    },
  },
  'realestate-advisory-m4-9': {
    heading: 'Useful benchmarks pair each client outcome with the provider’s economics',
    intro: 'Compare retention, SLA, reporting, collection support, cost, fee revenue and contract contribution. High occupancy does not prove manager service quality or margin.',
    spec: {
      layout: 'compare', title: '09 Service Quality, Technology and Profitability', kicker: '',
      leftTitle: 'Client outcome', rightTitle: 'Service-provider economics',
      rows: [
        { label: 'SLA', a: 'Agreed service levels met', b: 'Cost of delivering them' },
        { label: 'Retention', a: 'Client renews the contract', b: 'Recurring fee revenue kept' },
        { label: 'Collection', a: 'Collection support for the owner', b: 'Effort inside the fee scope' },
        { label: 'System', a: 'Clear, timely reporting', b: 'Technology cost of the contract' },
        { label: 'Margin', a: 'Not shown by occupancy', b: 'Fee revenue less cost = contribution' },
      ],
      note: 'High occupancy does not prove manager service quality or margin. Use matched contract scope.',
      takeaway: 'Useful benchmarking connects client outcomes to service-provider economics.',
    },
  },
  'realestate-advisory-m4-10': {
    heading: 'How trusted advice is built from evidence to an accountable recommendation',
    intro: 'Clients value accurate market knowledge, clear assumptions, controlled conflicts and accountable recommendations. An AVM cannot replace judgement where professional valuation is required.',
    spec: {
      layout: 'flow', title: '10 Market Expertise and Professional Credibility', kicker: '',
      steps: [
        { label: 'Market evidence', detail: 'Accurate, sourced market knowledge' },
        { label: 'Clear assumptions', detail: 'Stated so the client can test them' },
        { label: 'Professional judgement', detail: 'Applied to standard; an AVM cannot replace it' },
        { label: 'Conflict check', detail: 'Independence and ethics confirmed', kind: 'decision' },
        { label: 'Accountable recommendation', detail: 'Builds reputation over time', kind: 'outcome' },
      ],
      loop: 'Retain source and review trails so each recommendation can be checked later.',
      takeaway: 'Trusted advice requires evidence, competence and independence.',
    },
  },
  'realestate-advisory-m4-11': {
    heading: 'The service loop that turns resolved issues into renewals',
    intro: 'Managers need reliable operations, transparent reporting and issue resolution. Activity volume without outcomes weakens trust.',
    spec: {
      layout: 'flow', title: '11 Client Relationships and Service Quality', kicker: '',
      steps: [
        { label: 'Request or issue', detail: 'Raised by client or occupier' },
        { label: 'Responsive handling', detail: 'Clear communication on next steps' },
        { label: 'Resolution', detail: 'The issue is actually fixed' },
        { label: 'Reporting against SLA', detail: 'Agreed service levels measured' },
        { label: 'Retention and renewal', detail: 'Recurring value continues', kind: 'outcome' },
      ],
      loop: 'Consistent outcomes build trust for the next request and renewal.',
      note: 'Activity volume without outcomes weakens trust — measure agreed service levels.',
      takeaway: 'Recurring value depends on consistent client and occupier experience.',
    },
  },
  'realestate-advisory-m4-12': {
    heading: 'Scalable quality comes from people, systems and process together',
    intro: 'Talent, standard workflows, property systems, maintenance platforms and vendor controls support delivery. Technology without adoption and clean data adds cost.',
    spec: {
      layout: 'driverTree', title: '12 Talent, Technology and Operational Efficiency', kicker: '',
      root: { label: 'Scalable service quality', detail: 'Joint result of people and systems' },
      drivers: [
        { label: 'People', detail: 'Talent that delivers the service', children: [{ label: 'Professional' }, { label: 'Engineer' }] },
        { label: 'Systems', detail: 'Property and maintenance platforms', children: [{ label: 'PMS' }, { label: 'CMMS' }] },
        { label: 'Process', detail: 'Standard workflows and vendor controls' },
        { label: 'Adoption and clean data', detail: 'Without them technology adds cost' },
      ],
      note: 'Design governance before automation.',
      takeaway: 'People and systems jointly determine scalable quality.',
    },
  },
  'realestate-advisory-m4-13': {
    heading: 'The same features that make property services strong also expose them',
    intro: 'Recurring management diversifies commissions while staffing and liability remain. Strong revenue can be concentrated in few clients.',
    spec: {
      layout: 'compare', title: '13 Strengths and Weaknesses', kicker: '',
      leftTitle: 'Strength', rightTitle: 'Weakness',
      rows: [
        { label: 'Business model', a: 'Asset light', b: 'Depends on people and trust' },
        { label: 'Revenue', a: 'Recurring management diversifies commissions', b: 'Cyclical transaction fees remain' },
        { label: 'Clients', a: 'Deep relationships', b: 'Revenue can concentrate in few clients' },
        { label: 'People', a: 'Professional expertise', b: 'Talent and liability exposure' },
      ],
      note: 'Track service and client mix.',
      takeaway: 'Property services can be asset-light but depend on people, trust and transaction cycles.',
    },
  },
  'realestate-advisory-m4-14': {
    heading: 'Where to invest: opportunities are defensible only when outcomes are',
    intro: 'Data, integrated FM and recurring mandates can grow; simple intermediation can be disrupted. Digital listing does not eliminate advice and diligence.',
    spec: {
      layout: 'decision', title: '14 Opportunities and Threats', kicker: '',
      root: { label: 'Growth option', detail: 'Outsourcing, institutional owners, digital, regulation' },
      question: 'Does the service deliver an outcome that platforms or regulation cannot easily replace?',
      branches: [
        { condition: 'Advice, diligence, integrated FM or data', outcome: 'Invest', detail: 'Professionalization and outsourcing create demand', tone: 'positive' },
        { condition: 'Recurring mandate needing new capability', outcome: 'Invest selectively', detail: 'Regulation changes the terms of competition', tone: 'caution' },
        { condition: 'Simple intermediation only', outcome: 'Exposed to disintermediation', detail: 'Platforms can disrupt it', tone: 'negative' },
      ],
      note: 'Digital listing does not eliminate advice and diligence.',
      takeaway: 'Professionalization and outsourcing create opportunity while platforms and regulation change competition.',
    },
  },
  'realestate-advisory-m4-15': {
    heading: 'Strategy starts from target clients and assets, then picks one position',
    intro: 'Firms choose specialist credibility, integrated delivery, premium operations or technology-enabled scale. Adding services without capability can damage the brand.',
    spec: {
      layout: 'pathway', title: '15 Strategic Differentiation', kicker: '',
      trunk: [
        { label: 'Target clients', detail: 'Who the firm serves' },
        { label: 'Property types', detail: 'Assets it has expertise in' },
        { label: 'Service economics', detail: 'Recurring versus transaction fees' },
      ],
      optionsLabel: 'Strategic positions — alternatives, not steps',
      options: [
        { label: 'Specialist credibility', detail: 'Depth in a niche' },
        { label: 'Integrated delivery', detail: 'Coordinated multiple services' },
        { label: 'Premium operations', detail: 'Higher-service property operations' },
        { label: 'Technology-enabled scale', detail: 'Systems that extend reach' },
      ],
      note: 'Stage growth against talent and controls — adding services without capability can damage the brand.',
      takeaway: 'Strategy should align target clients, property types and service economics.',
    },
  },
};
