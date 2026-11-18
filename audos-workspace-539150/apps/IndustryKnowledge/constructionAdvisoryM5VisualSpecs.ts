import type { ConstructionAdvisoryChapterVisual } from './constructionAdvisoryVisualSpecs';

/** Chapter-specific Learning Visuals for Project & Construction Advisory Module 05, keyed by visualKind. */
export const CONSTRUCTION_ADVISORY_M5_VISUALS: Record<string, ConstructionAdvisoryChapterVisual> = {
  'professional-advisory-m5-1': {
    heading: 'Clients now want one integrated advisory team that still keeps specialist depth',
    intro: 'Clients increasingly combine multidisciplinary and programme-level appointments with sector expertise. A manufacturer may appoint one integrated advisory team across several factory expansions while retaining specialist commissioning expertise.',
    spec: {
      layout: 'ecosystem', title: '01 How Are Construction Clients\' Expectations Changing?', kicker: '',
      center: { label: 'Integrated appointment', detail: 'One lead adviser across several projects' },
      actors: [
        { label: 'Client', relation: 'Appoints and retains decisions', flows: ['money', 'oversight'] },
        { label: 'Project management', relation: 'Leads interfaces and programme support', flows: ['service'] },
        { label: 'Cost advice', relation: 'Links technical and commercial choices', flows: ['information'] },
        { label: 'Procurement', relation: 'Structures how packages are bought', flows: ['service'] },
        { label: 'Risk', relation: 'Surfaces exposure across the programme', flows: ['risk'] },
        { label: 'Sector specialist', relation: 'Keeps depth, e.g. commissioning', flows: ['service'] },
      ],
      note: 'Define lead adviser, discipline authority, interfaces, specialist reliance, local capability and knowledge transfer across the integrated team.',
      takeaway: 'Clients value advisers that connect technical, commercial and strategic decisions without losing depth on complex specialist tasks.',
    },
  },
  'professional-advisory-m5-2': {
    heading: 'Cost certainty comes from a control cycle that starts early and ends in corrective action',
    intro: 'Clients increasingly focus on cost assumptions, schedule logic, risk exposure and forecast reliability. An investor may commission an independent review before authorizing the next stage of a capital programme.',
    spec: {
      layout: 'flow', title: '02 Why Are Cost Certainty and Project Transparency Becoming More Important?', kicker: '',
      steps: [
        { label: 'Early cost plan', detail: 'Explicit cost assumptions from the start' },
        { label: 'Integrated controls', detail: 'Cost, schedule and risk reported together' },
        { label: 'Independent review', detail: 'Readiness tested before the next stage', kind: 'decision' },
        { label: 'Corrective action', detail: 'Early action that protects capital', kind: 'outcome' },
      ],
      loop: 'Corrective actions update the cost plan and controls for the next review.',
      note: 'Reconcile approved scope, current design, market rates, procurement, land and approval dependencies before presenting forecast confidence.',
      takeaway: 'Advisory demand remains linked to clients’ need to protect capital through realistic forecasts, transparent reporting and early risk action.',
    },
  },
  'professional-advisory-m5-3': {
    heading: 'Forecast confidence for a capital programme rests on contingency, critical path and the risks behind them',
    intro: 'Investment priorities increasingly hinge on how reliable cost and schedule forecasts are. Contingency covers uncertainty in the estimate; the critical path sets the earliest possible completion date.',
    spec: {
      layout: 'driverTree', title: '03 How Are Infrastructure and Industrial Investment Priorities Evolving?', kicker: '',
      root: { label: 'Forecast confidence', detail: 'How far the forecast can be relied on' },
      drivers: [
        { label: 'Contingency', detail: 'Allowance for uncertainty, separate from scope growth', children: [{ label: 'Cost assumptions' }, { label: 'Market rates' }] },
        { label: 'Critical path', detail: 'Activities that fix earliest completion', children: [{ label: 'Schedule logic' }, { label: 'Approval dependencies' }] },
        { label: 'Risk exposure', detail: 'Dependencies outside the team’s control', children: [{ label: 'Land' }, { label: 'Procurement' }] },
      ],
      note: 'Reconcile approved scope and current design before presenting any forecast confidence.',
      takeaway: 'Advisory demand remains linked to clients’ need to protect capital through realistic forecasts, transparent reporting and early risk action.',
    },
  },
  'professional-advisory-m5-4': {
    heading: 'BIM adds value when information requirements are set first and models feed decisions through to the asset',
    intro: 'Structured project and asset information is managed through BIM, controlled environments, connected models and integrated reporting. Appointment-level information requirements come before implementation.',
    spec: {
      layout: 'flow', title: '04 How Is BIM Transforming Construction Advisory?', kicker: '',
      steps: [
        { label: 'Information requirement', detail: 'Classification, access, ownership and security agreed' },
        { label: 'BIM', detail: 'Shared asset information created and used' },
        { label: 'Project dashboard', detail: 'Integrated reporting for decisions' },
        { label: 'Digital twin', detail: 'Connected to asset data for selected operational decisions', kind: 'outcome' },
      ],
      note: 'Define handover data at the start so the model can serve the asset after construction.',
      takeaway: 'Digital tools create value when they improve information quality, collaboration and decisions rather than merely digitizing paperwork.',
    },
  },
  'professional-advisory-m5-5': {
    heading: 'A Common Data Environment is the single source every team reads from and writes to',
    intro: 'A team uses a shared model and CDE to coordinate design changes, approvals and issue status before construction. The CDE is the agreed source for collecting, managing, reviewing and distributing controlled information.',
    spec: {
      layout: 'ecosystem', title: '05 How Are Digital Twins, Project Analytics and Automation Evolving?', kicker: '',
      center: { label: 'Common Data Environment', detail: 'Agreed source of controlled information' },
      actors: [
        { label: 'Design team', relation: 'Model coordination of design changes', flows: ['information'] },
        { label: 'Approvers', relation: 'Record approval and issue status', flows: ['oversight'] },
        { label: 'Project analytics', relation: 'Reads controlled data for reporting', flows: ['information'] },
        { label: 'Asset owner', relation: 'Receives asset data at handover', flows: ['information', 'service'] },
        { label: 'Information security', relation: 'Controls access and protects data', flows: ['risk'] },
      ],
      note: 'Set classification, access, approval status, ownership, security and handover data before implementation.',
      takeaway: 'Digital tools create value when they improve information quality, collaboration and decisions rather than merely digitizing paperwork.',
    },
  },
  'professional-advisory-m5-6': {
    heading: 'AI tasks branch from approved data, then rejoin at validation and accountable human review',
    intro: 'AI-assisted review, forecasting, classification and reporting can be applied to contracts, schedules, costs, risks and records. An AI workflow flags inconsistent dates across documents for a controls specialist to verify and resolve.',
    spec: {
      layout: 'pathway', title: '06 What Role Can AI and Data Play in Project Management?', kicker: '',
      trunk: [
        { label: 'Approved data', detail: 'Confidential and personal information protected' },
      ],
      optionsLabel: 'AI-assisted tasks — alternatives, not steps',
      options: [
        { label: 'Document extraction' },
        { label: 'Risk classification' },
        { label: 'Cost analysis' },
        { label: 'Schedule forecast' },
        { label: 'Automated report' },
      ],
      afterLabel: 'Every output then passes through',
      after: [
        { label: 'Model validation', detail: 'Outputs checked and limitations documented' },
        { label: 'Human oversight', detail: 'An accountable specialist verifies and decides', kind: 'outcome' },
      ],
      takeaway: 'AI can augment professional capacity but cannot replace accountable expertise in complex, high-consequence project decisions.',
    },
  },
  'professional-advisory-m5-7': {
    heading: 'Selection is shifting from brand or lowest fee toward evidence of outcomes and fit',
    intro: 'Firms demonstrate capability through formal procurement, networks, alliances, referrals and technical content. A consultancy and engineering firm may submit a combined proposal for a transport programme with explicit lead and specialist roles.',
    spec: {
      layout: 'compare', title: '07 How Are Construction Procurement and Delivery Models Changing?', kicker: '',
      leftTitle: 'Selection on brand or low fee', rightTitle: 'Value-based selection',
      rows: [
        { label: 'Main test', a: 'Name or lowest price in a competitive tender', b: 'Credible outcomes and fit with requirements' },
        { label: 'Evidence', a: 'Generic credentials', b: 'Case evidence and technical content' },
        { label: 'Team model', a: 'One firm’s offer', b: 'Joint proposal or strategic partner with explicit roles' },
        { label: 'Commercial fit', a: 'Fee alone', b: 'Fee with risk, exclusions and responsibility' },
      ],
      note: 'Compare method, named team, references, local capacity, exclusions, fee, risk and responsibility; disclose material partner incentives.',
      takeaway: 'Winning work depends on credible outcomes and fit with client requirements rather than brand or low fees alone.',
    },
  },
  'professional-advisory-m5-8': {
    heading: 'A framework runs as a cycle: set terms once, call off mandates, review, then renew or end',
    intro: 'Longer-term frameworks, portfolio support and embedded teams span multiple projects or lifecycle stages. A corporate client may use a framework to appoint advisers across a series of office and industrial projects.',
    spec: {
      layout: 'flow', title: '08 How Are Integrated Consulting and Project Management Services Developing?', kicker: '',
      steps: [
        { label: 'Framework agreement', detail: 'Rates, resources, conflicts and confidentiality', owner: 'Client and adviser' },
        { label: 'Call-off per project', detail: 'Scope defined for each recurring mandate', owner: 'Client' },
        { label: 'Embedded team delivers', detail: 'Continuity across projects', owner: 'Adviser' },
        { label: 'Performance review', detail: 'Against agreed terms', kind: 'decision', owner: 'Client' },
        { label: 'Renew or terminate', kind: 'outcome', owner: 'Client' },
      ],
      loop: 'Renewal leads to the next call-off under the same framework.',
      note: 'Client ownership: the client keeps defined responsibilities that the embedded team does not take over.',
      takeaway: 'Integrated and recurring engagements improve continuity but increase the need for independence, conflict and accountability controls.',
    },
  },
  'professional-advisory-m5-9': {
    heading: 'Each continuity benefit of a portfolio partnership needs its own independence or accountability control',
    intro: 'Portfolio support spans multiple projects and lifecycle stages. The continuity it brings raises the need for independence, conflict and accountability controls.',
    spec: {
      layout: 'table', title: '09 How Are Global and Local Advisory Partnerships Evolving?', kicker: '',
      headers: ['Partnership feature', 'Continuity benefit', 'Control it requires'],
      rows: [
        { label: 'Portfolio advisory', a: 'One adviser across many projects', b: 'Independence when reviewing its own work' },
        { label: 'Common standard', a: 'Consistent methods and reporting', b: 'Accountability for each project’s outcome' },
        { label: 'Conflict control', a: 'Confidence in recurring advice', b: 'Declared conflicts and confidentiality' },
      ],
      note: 'Define call-off scope, rates, resources, conflicts, confidentiality, performance review, termination and retained client responsibilities.',
      takeaway: 'Integrated and recurring engagements improve continuity but increase the need for independence, conflict and accountability controls.',
    },
  },
  'professional-advisory-m5-11': {
    heading: 'Green building choices are judged on whole-life performance, not initial cost alone',
    intro: 'Assessment covers capital and operating cost, carbon, energy, materials, climate exposure, durability and certification. A design team compares material options across initial cost, maintenance, service life and embodied carbon under stated boundaries.',
    spec: {
      layout: 'driverTree', title: '11 How Are Green Buildings and Sustainable Infrastructure Shaping Demand?', kicker: '',
      root: { label: 'Whole-life performance', detail: 'Over a defined period and boundary' },
      drivers: [
        { label: 'Whole-life cost', detail: 'Capital to end-of-life', children: [{ label: 'Capital cost' }, { label: 'Maintenance and replacement' }] },
        { label: 'Operational energy', detail: 'Energy used once the asset runs' },
        { label: 'Material selection', detail: 'Compared under stated boundaries', children: [{ label: 'Service life' }, { label: 'Embodied carbon' }] },
        { label: 'Asset resilience', detail: 'Climate exposure and durability' },
      ],
      note: 'Define the local baseline, assessment method and data quality before comparing options.',
      takeaway: 'Sustainability is most effective when lifecycle performance is integrated into early project decisions and verified through delivery.',
    },
  },
  'professional-advisory-m5-12': {
    heading: 'Sustainability governance runs from a defined baseline to verification in operation',
    intro: 'Governance requirements increasingly cover carbon, climate exposure and certification. Each claim needs a baseline, a method, an owner and operational verification.',
    spec: {
      layout: 'flow', title: '12 How Are Safety, Professional Liability and Project Governance Requirements Evolving?', kicker: '',
      steps: [
        { label: 'Define the baseline', detail: 'Local baseline, assessment method and data quality' },
        { label: 'Assess climate hazard', detail: 'Exposure of the asset over its life' },
        { label: 'Compare embodied carbon', detail: 'Options under stated lifecycle boundaries' },
        { label: 'Set green certification scope', detail: 'What is certified and who owns it', kind: 'decision' },
        { label: 'Verify in operation', kind: 'outcome' },
      ],
      note: 'Name the owner of each step and the operational check before any sustainability result is reported.',
      takeaway: 'Sustainability is most effective when lifecycle performance is integrated into early project decisions and verified through delivery.',
    },
  },
  'professional-advisory-m5-13': {
    heading: 'Future demand concentrates where capital exposure, complexity and stakeholders all need specialist oversight',
    intro: 'Potential demand comes from infrastructure, industrial and digital facilities, energy, urban renewal, refurbishment and stronger governance. A consultancy may build a specialist team for industrial projects involving equipment integration, controls and commissioning.',
    spec: {
      layout: 'driverTree', title: '13 What Factors Will Drive Future Construction Advisory Demand?', kicker: '',
      root: { label: 'Future advisory demand', detail: 'Potential, not guaranteed' },
      drivers: [
        { label: 'High capital exposure', children: [{ label: 'Infrastructure programme' }] },
        { label: 'Technical complexity', children: [{ label: 'Data centre' }, { label: 'Equipment integration' }] },
        { label: 'Multiple stakeholders', children: [{ label: 'Grid investment' }] },
        { label: 'Specialist oversight need', children: [{ label: 'Independent assurance' }] },
      ],
      note: 'Each example sits under the driver it most illustrates; the strongest opportunities combine all four.',
      takeaway: 'The strongest opportunities combine high capital exposure, technical complexity, multiple stakeholders and clear need for specialist oversight.',
    },
  },
  'professional-advisory-m5-14': {
    heading: 'An announced investment counts as an opportunity only after its delivery conditions are tested',
    intro: 'Opportunities are emerging in industrial facilities, energy transition and asset renewal. Announced investment is treated as opportunity only after testing funding, approvals, land, procurement, start timing, sponsor and adviser scope.',
    spec: {
      layout: 'decision', title: '14 Where Are New Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      root: { label: 'Announced investment', detail: 'Industrial facility, energy transition or asset renewal' },
      question: 'Have funding, approvals, land, procurement, start timing, sponsor and adviser scope been tested?',
      branches: [
        { condition: 'All tested and credible', outcome: 'Pursue as an opportunity', tone: 'positive' },
        { condition: 'Some conditions open', outcome: 'Track but do not count it yet', tone: 'caution' },
        { condition: 'Untested', outcome: 'Treat as an announcement only', tone: 'negative' },
      ],
      takeaway: 'The strongest opportunities combine high capital exposure, technical complexity, multiple stakeholders and clear need for specialist oversight.',
    },
  },
  'professional-advisory-m5-15': {
    heading: 'Positioning is a staged choice of capabilities, each scaled or stopped on reference-project evidence',
    intro: 'Firms align service portfolio, talent, technology, commercial model and risk controls with changing client needs. A Vietnamese consultancy may develop digital project controls for industrial and infrastructure clients while strengthening professional training.',
    spec: {
      layout: 'pathway', title: '15 How Should Construction Advisory Firms Position Themselves?', kicker: '',
      trunk: [
        { label: 'Vietnam positioning', detail: 'Target clients and changing needs' },
        { label: 'Resource planning', detail: 'Staged capability investment with accountable owners' },
      ],
      optionsLabel: 'Capabilities to build — choose, not sequence',
      options: [
        { label: 'Project controls' },
        { label: 'Commercial expertise' },
        { label: 'Sustainability' },
        { label: 'Sector specialization' },
        { label: 'AI governance' },
      ],
      afterLabel: 'Each capability then faces',
      after: [
        { label: 'Reference projects', detail: 'Quality metrics on secure systems' },
        { label: 'Stop-or-scale decision', kind: 'decision' },
      ],
      takeaway: 'Long-term competitiveness combines trusted judgment, integrated delivery, digital capability, specialist depth and measurable client value.',
    },
  },
};
