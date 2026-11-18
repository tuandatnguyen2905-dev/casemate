import type { ConstructionAdvisoryChapterVisual } from './constructionAdvisoryVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Project & Construction Advisory Module 03, keyed by visualKind. */
export const CONSTRUCTION_ADVISORY_M3_VISUALS: Record<string, ConstructionAdvisoryChapterVisual> = {
  'professional-advisory-m3-1': {
    heading: 'Advisory fees are earned on defined assignments, specialist expertise or a multidisciplinary offer',
    intro: 'Project-based professional-service models monetize defined assignments, specialist expertise and scoped deliverables. A developer may appoint cost planning, technical due diligence and project-management advisers separately, one per mandate.',
    spec: {
      layout: 'taxonomy', title: '01 How Do Project & Construction Advisory Firms Make Money?', kicker: '',
      root: 'What the client pays for', rootDetail: 'Each fee is tied to a scoped mandate and its deliverables',
      groups: [
        { label: 'Project assignment', detail: 'A defined mandate with scoped deliverables', items: ['Cost planning', 'Technical due diligence', 'Project management'] },
        { label: 'Specialist expertise', detail: 'Depth and reputation in one discipline', items: ['Quantity surveying', 'Scheduling'] },
        { label: 'Multidisciplinary offer', detail: 'Integrated services for a broader client relationship' },
      ],
      note: 'Before appointing, confirm each provider’s licensed capability, named specialists, reliance limits, insurance, conflicts and contractual responsibility.',
      takeaway: 'Specialists compete through depth and reputation while multidisciplinary firms seek broader client relationships through integrated services.',
    },
  },
  'professional-advisory-m3-2': {
    heading: 'An independent specialist sells depth on one question; an integrated firm sells breadth across disciplines',
    intro: 'Specialist reports, claims advice and technical due diligence are typical independent mandates. Integrated firms instead seek a broader relationship across several services.',
    spec: {
      layout: 'compare', title: '02 How Do Independent Consultants and Integrated Engineering Firms Differ?', kicker: '',
      leftTitle: 'Independent specialist consultant', rightTitle: 'Integrated multidisciplinary firm',
      rows: [
        { label: 'Typical mandate', a: 'Specialist report, claims advice or technical due diligence', b: 'Integrated services across several disciplines' },
        { label: 'Competes through', a: 'Depth and reputation', b: 'Breadth and a broader client relationship' },
        { label: 'How it is appointed', a: 'Separately, for each defined mandate', b: 'As one provider for combined scopes' },
        { label: 'What to confirm', a: 'Named specialists and reliance limits', b: 'Conflicts and contractual responsibility per service' },
      ],
      note: 'Technical due diligence is an independent review of technical condition, scope, risk, compliance and capital implications for a decision.',
      takeaway: 'Specialists compete through depth and reputation while multidisciplinary firms seek broader client relationships through integrated services.',
    },
  },
  'professional-advisory-m3-3': {
    heading: 'Longer appointments widen the scope covered and raise the governance each one demands',
    intro: 'Integrated appointments coordinate multidisciplinary support across several stages, projects or facilities. An industrial company may engage one advisory partner to govern a portfolio of factory expansions with shared controls and reporting.',
    spec: {
      layout: 'table', title: '03 How Do Project-Based, Retainer and Framework Agreements Work?', kicker: '',
      headers: ['Appointment form', 'What it covers', 'What it demands'],
      rows: [
        { label: 'Integrated project management', a: 'Several stages of one project', b: 'Clear scope boundaries and accountability' },
        { label: 'Programme management', a: 'Several projects or facilities', b: 'Portfolio governance and common controls' },
        { label: 'Embedded team', a: 'Advisers working within the client’s team', b: 'Conflicts management and knowledge transfer' },
        { label: 'Long-term appointment', a: 'A portfolio over an extended period', b: 'Resource planning and local authority' },
      ],
      note: 'Example: one advisory partner governing a portfolio of factory expansions through shared controls and reporting.',
      takeaway: 'Integrated models improve coordination and continuity but require stronger governance, resource planning and responsibility management.',
    },
  },
  'professional-advisory-m3-4': {
    heading: 'Advisory services fall into strategic, delivery, commercial and specialist lines',
    intro: 'Services are sold separately or combined around project needs. A lender may buy only technical due diligence, while a developer buys continuous project, cost and commercial management.',
    spec: {
      layout: 'taxonomy', title: '04 How Are Construction Advisory Services Segmented?', kicker: '',
      root: 'Construction advisory services', rootDetail: 'Service lines — sold separately or combined',
      groups: [
        { label: 'Strategic', items: ['Feasibility'] },
        { label: 'Delivery', items: ['Project management', 'Project controls'] },
        { label: 'Commercial', items: ['Cost management', 'Commercial advice'] },
        { label: 'Specialist', items: ['Technical assurance', 'Claims'] },
      ],
      note: 'Map every service to the project stage, current data, applicable standards, decision user, licensed scope and deliverable reliance.',
      takeaway: 'Service lines differ in expertise, deliverables, client need and the responsibility the adviser assumes.',
    },
  },
  'professional-advisory-m3-5': {
    heading: 'Five asset-specific factors set how much and what kind of advice a project type needs',
    intro: 'Technical systems, procurement, regulation, interfaces and operating risks differ by asset type. A data centre needs far more coordination of power, cooling, redundancy, controls and commissioning than a conventional office.',
    spec: {
      layout: 'driverTree', title: '05 How Do Project Types Influence Advisory Requirements?', kicker: '',
      root: { label: 'Advisory requirement', detail: 'Differs by asset type' },
      drivers: [
        { label: 'Technical systems', detail: 'What the asset must do', children: [{ label: 'Power' }, { label: 'Cooling' }] },
        { label: 'Interfaces', detail: 'Systems that must work together', children: [{ label: 'Controls' }, { label: 'Commissioning' }] },
        { label: 'Operating risks', detail: 'What failure would cost in use', children: [{ label: 'Redundancy' }] },
        { label: 'Procurement', detail: 'How the asset is bought and supplied' },
        { label: 'Regulation', detail: 'The authority pathway that applies' },
      ],
      note: 'Apply the same drivers to transport, residential, industrial facility and data centre projects; the data-centre children above come from the chapter example.',
      takeaway: 'Sector expertise matters because technical systems, procurement, regulation, interfaces and operating risks differ by asset type.',
    },
  },
  'professional-advisory-m3-6': {
    heading: 'Firms organize one advisory capability into sector portfolios such as commercial property, healthcare and energy',
    intro: 'Advisory capability is organized around infrastructure, real estate, industrial, healthcare, energy and specialized facilities. Each portfolio is then tested against the actual asset it will serve.',
    spec: {
      layout: 'pathway', title: '06 How Do Firms Build Specialized Service Portfolios?', kicker: '',
      trunk: [
        { label: 'Core advisory capability', detail: 'Project, cost and controls methods' },
        { label: 'Sector specialists', detail: 'Matched to asset technology and risk' },
      ],
      optionsLabel: 'Sector portfolios — alternatives, not steps',
      options: [
        { label: 'Commercial property' },
        { label: 'Healthcare' },
        { label: 'Energy' },
        { label: 'Infrastructure' },
        { label: 'Industrial' },
      ],
      note: 'Test local references and sector specialists against the actual asset technology, authority pathway, supply chain and operating model.',
      takeaway: 'Sector expertise matters because technical systems, procurement, regulation, interfaces and operating risks differ by asset type.',
    },
  },
  'professional-advisory-m3-7': {
    heading: 'Public buyers purchase preparation and procurement support judged on accountability and value for money',
    intro: 'Public project owners buy support across feasibility, procurement, governance, implementation monitoring and assurance. An infrastructure authority may appoint a programme-management consultant to coordinate reporting and risks across several transport packages.',
    spec: {
      layout: 'taxonomy', title: '07 Who Purchases Construction Advisory Services?', kicker: '',
      root: 'Public-sector clients', rootDetail: 'Who buys, what they buy, how they judge it',
      groups: [
        { label: 'Who buys', items: ['Government owner', 'State enterprise', 'Infrastructure authority'] },
        { label: 'What they buy', items: ['Project preparation', 'Public procurement support', 'Implementation monitoring'] },
        { label: 'How advice is judged', items: ['Accountability', 'Value for money', 'Compliance'] },
      ],
      note: 'Follow the current public-investment, procurement, construction, approval and disclosure requirements that apply to the owner and funding source.',
      takeaway: 'Public clients often prioritize transparent preparation, compliance, coordination and accountable use of capital.',
    },
  },
  'professional-advisory-m3-8': {
    heading: 'Private owners hire advisers when a capital decision carries delivery risk',
    intro: 'Developers, companies and lenders allocate capital and manage delivery risk, and they judge advice by what it protects. An investor, for example, commissions technical due diligence before acquiring a partially completed commercial property.',
    spec: {
      layout: 'table', title: '08 What Problems Lead Owners to Hire Project Advisors?', kicker: '',
      headers: ['Private client', 'Problem behind the mandate', 'Advice is tested against'],
      rows: [
        { label: 'Developer', a: 'Allocating capital to a project it delivers', b: 'Commercial outcome' },
        { label: 'Industrial operator', a: 'A capital project its operations depend on', b: 'Asset performance' },
        { label: 'Lender', a: 'Funding a project it does not control', b: 'Delivery confidence' },
      ],
      note: 'Each mandate should connect to investment authority, funding, title and approvals, technical evidence, exit or operation plan and risk appetite; together these define risk-adjusted return.',
      takeaway: 'Private clients evaluate advice through commercial outcomes, delivery confidence, asset performance and risk-adjusted investment value.',
    },
  },
  'professional-advisory-m3-9': {
    heading: 'Occupiers, investors and funds appoint a consultant only when the advice links to their investment decision',
    intro: 'Private clients select advisers by whether the advice protects risk-adjusted investment value. The test is whether the mandate connects to authority, funding, technical evidence, exit or operation plan and risk appetite.',
    spec: {
      layout: 'decision', title: '09 How Do Clients Select and Evaluate Construction Consultants?', kicker: '',
      root: { label: 'Candidate consultant', detail: 'For a corporate occupier, investor or fund' },
      question: 'Does the proposed advice connect to the client’s investment authority, funding, technical evidence and exit or operation plan?',
      branches: [
        { condition: 'Clearly linked with evidence', outcome: 'Appoint for the defined mandate', detail: 'Scope matches the decision being made', tone: 'positive' },
        { condition: 'Partly linked', outcome: 'Clarify scope and reliance first', detail: 'e.g. confirm what technical evidence will be reviewed', tone: 'caution' },
        { condition: 'Not linked to the decision', outcome: 'Do not appoint on reputation alone', tone: 'negative' },
      ],
      note: 'Example: an investor commissions technical due diligence before acquiring a partially completed commercial property.',
      takeaway: 'Private clients evaluate advice through commercial outcomes, delivery confidence, asset performance and risk-adjusted investment value.',
    },
  },
  'professional-advisory-m3-10': {
    heading: 'Hypothetical engagement: scope growth can raise contribution while lowering margin',
    intro: 'Hypothetical example: a VND1,000m fee less VND600m labor and VND150m other delivery cost leaves VND250m contribution (25%). An approved VND100m scope change costing VND90m lifts contribution to VND260m but cuts margin to 23.6%.',
    spec: {
      layout: 'waterfall', title: '10 How Do Construction Advisory Engagements Generate Revenue?', kicker: H,
      unit: 'VND million', basis: `${H} — illustrative figures, not market data`,
      items: [
        { label: 'Initial fee', value: 1000, kind: 'start' },
        { label: 'Professional labor', value: 600, kind: 'subtract' },
        { label: 'Other delivery cost', value: 150, kind: 'subtract' },
        { label: 'Initial contribution (25%)', value: 250, kind: 'total' },
        { label: 'Approved scope change', value: 100, kind: 'add' },
        { label: 'Scope change cost', value: 90, kind: 'subtract' },
        { label: 'Revised contribution (23.6%)', value: 260, kind: 'total' },
      ],
      note: 'Revenue can be earned as a fixed fee, time charge, monthly fee, milestone billing, framework call-off or variation. Billing, recognized revenue and cash collection happen at different times; signed contract value is not cash or profit.',
      takeaway: 'An approved scope change can add contribution in money terms while lowering margin, so judge both.',
    },
  },
  'professional-advisory-m3-11': {
    heading: 'Hypothetical scope creep: extra hours either earn a variation or erode contribution',
    intro: 'Hypothetical example: scope creep adds 120 hours at VND1.5m cost per hour, or VND180m. An approved VND220m variation lifts contribution by VND40m; if it is not approved, contribution falls by VND180m.',
    spec: {
      layout: 'scenario', title: '11 What Determines Consulting Delivery Costs and Profitability?', kicker: H,
      inputs: [
        { key: 'hours', label: 'Extra hours from scope creep', min: 0, max: 300, step: 10, value: 120, unit: 'hours' },
        { key: 'rate', label: 'Delivery cost per hour', min: 0.5, max: 3, step: 0.1, value: 1.5, unit: 'VND m' },
        { key: 'variation', label: 'Variation fee if approved', min: 0, max: 500, step: 10, value: 220, unit: 'VND m' },
      ],
      outputs: [
        { label: 'Added delivery cost', unit: 'VND m', digits: 0, compute: (v) => v.hours * v.rate },
        { label: 'Contribution change if approved', unit: 'VND m', digits: 0, compute: (v) => v.variation - v.hours * v.rate },
        { label: 'Contribution change if unapproved', unit: 'VND m', digits: 0, compute: (v) => -v.hours * v.rate },
      ],
      assumption: `${H}. Illustrative inputs, not market data. Defaults reproduce the chapter: 220 − (120 × 1.5) = +40; unapproved = −180.`,
      note: 'Delivery cost also includes specialist subcontractors, site deployment, travel, software, insurance, overhead and rework. Track approved versus pending variations, write-offs and receivables separately.',
      takeaway: 'Unapproved scope growth turns professional hours straight into lost contribution, so variations need approval before the work is absorbed.',
    },
  },
  'professional-advisory-m3-12': {
    heading: 'Hypothetical earned-value check: cost and schedule indices read against a project baseline',
    intro: 'Hypothetical example: with PV=800, EV=720 and AC=900, CPI=0.80 and CV=−180 show over budget, while SPI=0.90 and SV=−80 show behind the value schedule. If BAC=1,000 and current cost efficiency continues, EAC=BAC/CPI=1,250.',
    spec: {
      layout: 'scenario', title: '12 Which KPIs Explain Project and Advisory Business Performance?', kicker: H,
      inputs: [
        { key: 'pv', label: 'Planned value (PV)', min: 100, max: 1500, step: 10, value: 800, unit: '' },
        { key: 'ev', label: 'Earned value (EV)', min: 100, max: 1500, step: 10, value: 720, unit: '' },
        { key: 'ac', label: 'Actual cost (AC)', min: 100, max: 1500, step: 10, value: 900, unit: '' },
        { key: 'bac', label: 'Budget at completion (BAC)', min: 500, max: 2000, step: 50, value: 1000, unit: '' },
      ],
      outputs: [
        { label: 'CPI = EV/AC', unit: '', digits: 2, compute: (v) => v.ev / v.ac },
        { label: 'SPI = EV/PV', unit: '', digits: 2, compute: (v) => v.ev / v.pv },
        { label: 'CV = EV − AC', unit: '', digits: 0, compute: (v) => v.ev - v.ac },
        { label: 'SV = EV − PV', unit: '', digits: 0, compute: (v) => v.ev - v.pv },
        { label: 'EAC = BAC/CPI', unit: '', digits: 0, compute: (v) => (v.bac * v.ac) / v.ev },
      ],
      assumption: `${H}. Illustrative inputs, not market data. EAC assumes future cost efficiency follows the current CPI; ratios are undefined when their denominator is zero, so sliders start above zero.`,
      note: 'These earned-value metrics measure a client project baseline. Firm KPIs — utilization, billing rate, realization, revenue per professional, contribution margin and backlog — measure the advisory business and need their own stated definitions. EVM schedule variance is value-based, not elapsed-time delay.',
      takeaway: 'Keep project budget performance separate from advisory profitability, and state the baseline and forecasting assumption behind every index.',
    },
  },
  'professional-advisory-m3-13': {
    heading: 'Clients reach an adviser through several routes, but every route needs evidence of capability',
    intro: 'Advisory engagements come from direct mandates, tenders, networks, frameworks and referrals. Because advice is hard to assess before delivery, case experience and professional trust decide selection on every route.',
    spec: {
      layout: 'pathway', title: '13 How Do Construction Advisory Firms Acquire Clients?', kicker: '',
      trunk: [
        { label: 'Case experience', detail: 'Comparable delivery the client can check' },
        { label: 'Professional trust', detail: 'Credibility of team and control method' },
      ],
      optionsLabel: 'Routes to an appointment — alternatives, not steps',
      options: [
        { label: 'Client relationship', detail: 'Direct mandate from an existing client' },
        { label: 'Competitive tender', detail: 'Often after prequalification' },
        { label: 'Framework', detail: 'Call-off under an agreed arrangement' },
        { label: 'Referral', detail: 'Introduced through a professional network' },
      ],
      note: 'Example: a consultancy wins an infrastructure assignment by proving comparable delivery experience, team availability and a credible control method. Proposals should substantiate references, named team, assumptions, exclusions and commercial terms.',
      takeaway: 'Because advice is difficult to assess before delivery, relevant evidence, credibility and client confidence strongly influence selection.',
    },
  },
  'professional-advisory-m3-14': {
    heading: 'A joint bid assembles partners around one prime consultant, and each role must be settled before bidding',
    intro: 'Complex mandates are often won through alliances and multidisciplinary bids. A cost consultancy may partner with a technical due diligence specialist for an investor’s integrated review.',
    spec: {
      layout: 'ecosystem', title: '14 How Do Tenders, RFPs and Consultant Selection Work?', kicker: '',
      center: { label: 'Joint bid', detail: 'Led by a prime consultant' },
      actors: [
        { label: 'Client', relation: 'Issues the tender and selects', flows: ['money', 'oversight'] },
        { label: 'Engineering partner', relation: 'Adds specialist technical coverage', flows: ['service'] },
        { label: 'Law firm', relation: 'Adds legal specialist input', flows: ['service'] },
        { label: 'Technology vendor', relation: 'Supplies tools and data access', flows: ['information'] },
        { label: 'Specialist subcontractor', relation: 'e.g. technical due diligence', flows: ['service', 'risk'] },
      ],
      note: 'Before bidding, clarify prime and subcontract roles, referral incentives, client ownership, data access, quality review and joint liability.',
      takeaway: 'Partnerships expand specialist coverage and market access while digital visibility supports—but does not replace—trust.',
    },
  },
  'professional-advisory-m3-15': {
    heading: 'Repeat business grows from referral partners and visible expertise, both resting on earned trust',
    intro: 'Architects and financiers can refer future mandates, and thought leadership keeps a firm visible. Digital visibility supports trust but does not replace it.',
    spec: {
      layout: 'driverTree', title: '15 How Do Firms Build Repeat Business and Long-Term Client Relationships?', kicker: '',
      root: { label: 'Repeat business', detail: 'Long-term client relationships' },
      drivers: [
        { label: 'Referral partners', detail: 'Specialist referrals around mandates', children: [{ label: 'Architect' }, { label: 'Financier' }] },
        { label: 'Thought leadership', detail: 'Visibility between projects', children: [{ label: 'Technical content' }, { label: 'Digital business development' }] },
        { label: 'Earned trust', detail: 'Visibility supports it, never replaces it' },
      ],
      note: 'Clarify referral incentives and client ownership with every partner.',
      takeaway: 'Partnerships expand specialist coverage and market access while digital visibility supports—but does not replace—trust.',
    },
  },
  'professional-advisory-m3-16': {
    heading: 'Owners, designers, suppliers and regulators each bring a different flow into asset delivery',
    intro: 'Clients, advisers, designers, builders, suppliers, capital providers, insurers and authorities all act around asset delivery. Each carries distinct decisions, information, obligations and risk.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Construction Advisory Ecosystem?', kicker: '',
      center: { label: 'Asset delivery', detail: 'The project all participants serve' },
      actors: [
        { label: 'Project owner', relation: 'Funds and takes decisions', flows: ['money', 'oversight'] },
        { label: 'Designer', relation: 'Produces design information', flows: ['information'] },
        { label: 'Supplier', relation: 'Provides materials and equipment', flows: ['product'] },
        { label: 'Regulator', relation: 'Approves and enforces requirements', flows: ['oversight'] },
        { label: 'Capital provider', relation: 'Finances under conditions', flows: ['money', 'risk'] },
        { label: 'Insurer', relation: 'Covers defined risks', flows: ['risk'] },
      ],
      note: 'Use contracts and responsibility matrices that reflect actual statutory and project roles rather than generic organization charts.',
      takeaway: 'Project performance depends on coordinated decisions, information, obligations and risk allocation among distinct participants.',
    },
  },
  'professional-advisory-m3-17': {
    heading: 'The adviser turns contractor information into risks and decision requests the client can act on',
    intro: 'An adviser coordinates consultants and contractors while presenting project risks and decision requests to the client. The decision then flows back into the work through the contract.',
    spec: {
      layout: 'flow', title: '17 How Do Owners, Consultants, Contractors and Authorities Collaborate?', kicker: '',
      steps: [
        { label: 'Report progress and issues', detail: 'Status, risks and change requests', owner: 'Contractor' },
        { label: 'Coordinate and assess', detail: 'Across consultants and contractors', owner: 'Adviser' },
        { label: 'Present decision request', detail: 'Risks, options and implications', owner: 'Adviser' },
        { label: 'Decide within authority', kind: 'decision', owner: 'Project owner' },
        { label: 'Instruct under contract', detail: 'Decision recorded and issued', kind: 'outcome', owner: 'Adviser' },
      ],
      loop: 'Instructions change the work, and the next report starts the cycle again.',
      note: 'Financiers may rely on the same risk reporting; assign every role from actual statutory and project roles, not a generic organization chart.',
      takeaway: 'Project performance depends on coordinated decisions, information, obligations and risk allocation among distinct participants.',
    },
  },
  'professional-advisory-m3-18': {
    heading: 'Institutions shape delivery by supplying competence, methods, technology and risk cover',
    intro: 'Professional bodies, universities, training providers, standards organizations, software vendors, legal specialists and insurers support competence, methods, technology, contracts, insurance and continuing development.',
    spec: {
      layout: 'taxonomy', title: '18 How Do Professional Standards and Industry Institutions Shape Delivery?', kicker: '',
      root: 'Industry institutions', rootDetail: 'Grouped by what they contribute to practice',
      groups: [
        { label: 'Competence', items: ['Professional body', 'University', 'Training provider'] },
        { label: 'Methods', items: ['Standards organization'] },
        { label: 'Technology', items: ['Software vendor'] },
        { label: 'Contracts and risk', items: ['Legal specialist', 'Insurance'] },
      ],
      note: 'Example: a consultancy combines professional qualifications with project-controls and information-management training. Verify which credentials have legal or contractual relevance.',
      takeaway: 'Industry maturity depends on qualified talent, professional standards, reliable information and mechanisms for improving practice.',
    },
  },
};
