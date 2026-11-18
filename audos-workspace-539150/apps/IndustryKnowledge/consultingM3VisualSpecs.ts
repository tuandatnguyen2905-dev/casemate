import type { ConsultingChapterVisual } from './consultingVisualSpecs';

/** Chapter-specific Learning Visuals for Management & Technology Consulting Module 03, keyed by visualKind. */
export const CONSULTING_M3_VISUALS: Record<string, ConsultingChapterVisual> = {
  'professional-consulting-m3-1': {
    heading: 'Strategy advice runs from an executive question to a decision and a roadmap',
    intro: 'Strategy-led firms advise executives on growth, portfolios, markets, pricing, transactions and organization. The advisory focus varies, but every engagement should end in a decision the client can implement.',
    spec: {
      layout: 'pathway', title: '01 How Does Strategy-Led Advisory Create Value?', kicker: '',
      trunk: [
        { label: 'Executive question', detail: 'Growth, portfolio, market, pricing, transaction or organization issue', owner: 'Board / executives' },
        { label: 'Evidence and analysis', detail: 'Compare demand, competition, economics and risks', owner: 'Strategy advisers' },
      ],
      optionsLabel: 'Advisory focus — alternatives, not steps',
      options: [
        { label: 'Corporate strategy', detail: 'Portfolio and growth choices' },
        { label: 'Market entry', detail: 'Entry options compared before capital commitment' },
        { label: 'Commercial excellence', detail: 'Markets, pricing and sales performance' },
        { label: 'M&A strategy', detail: 'Transaction choices' },
      ],
      afterLabel: 'Where value is realised',
      after: [
        { label: 'Executive decision', detail: 'Client commits to a commercially realistic option', kind: 'decision' },
        { label: 'Roadmap', detail: 'Recommendation turned into an implementable plan', kind: 'outcome' },
      ],
      note: 'Vietnam: adapt strategic options to local regulation, market structure, partner access, management capacity and execution.',
      takeaway: 'Strategy-led firms create value through high-quality decisions and specialized expertise, but recommendations must remain commercially realistic and implementable.',
    },
  },
  'professional-consulting-m3-2': {
    heading: 'Technology programs move from architecture advice through build and migration to support',
    intro: 'Technology consulting combines business and architecture advice with engineering, implementation, migration, testing, integration and support. An ERP deployment can place each part under a separate scope.',
    spec: {
      layout: 'flow', title: '02 How Do Technology Consulting and Systems Integration Operate?', kicker: '',
      steps: [
        { label: 'Business and architecture advice', detail: 'Target enterprise application, cloud and data design', owner: 'Technology consultants' },
        { label: 'Configuration and development', detail: 'Configure the platform and build custom components', owner: 'Integrator / vendor' },
        { label: 'Migration and integration', detail: 'Move data and connect systems', owner: 'Data engineering team' },
        { label: 'Testing', detail: 'Verify delivery, integration and security', owner: 'Integrator with client' },
        { label: 'Managed support', detail: 'Service operations after go-live', kind: 'outcome', owner: 'Support provider' },
      ],
      note: 'Vietnam: clarify prime contractor, software vendor, integrator, subcontractor and client responsibilities for delivery and defects.',
      takeaway: 'Technology-led models support longer programs but carry greater delivery, integration, security and operating responsibility.',
    },
  },
  'professional-consulting-m3-3': {
    heading: 'Boutiques trade breadth for depth, speed and direct expert access',
    intro: 'Boutique and specialist firms concentrate on one sector, function, technology or problem, with lower breadth and capacity than generalists. A cybersecurity boutique can win a narrow architecture problem yet partner for a global rollout.',
    spec: {
      layout: 'compare', title: '03 How Do Boutique and Specialist Models Compete?', kicker: '',
      leftTitle: 'Boutique / specialist firm', rightTitle: 'Generalist firm',
      rows: [
        { label: 'Focus', a: 'One sector, function, technology or problem', b: 'Broad range of services' },
        { label: 'What clients buy', a: 'Depth, speed and direct senior delivery', b: 'Breadth and delivery capacity' },
        { label: 'Narrow technical problem', a: 'Can outperform, e.g. cyber architecture', b: 'May bring less focused depth' },
        { label: 'Large rollout', a: 'Partners through a partner network', b: 'Staffs from its own capacity' },
      ],
      note: 'Test specialist depth, key-person dependency, capacity, quality systems, security, continuity and partner model.',
      takeaway: 'Specialization can substitute for scale when clients value depth, speed and direct expert access.',
    },
  },
  'professional-consulting-m3-4': {
    heading: 'Package diagnostic, implementation and training to the client, not to maximise integration',
    intro: 'A transformation can be sold as one integrated program or as separate modules. The package should match client maturity, procurement, budget, risk, data and internal ownership.',
    spec: {
      layout: 'decision', title: '04 How Are Diagnostic, Advisory, and Design Services Packaged?', kicker: '',
      root: { label: 'Transformation offer', detail: 'Diagnostic, implementation and training modules' },
      question: 'Which package fits this client’s maturity, budget and internal ownership?',
      branches: [
        { condition: 'Scope or readiness still unclear', outcome: 'Standalone diagnostic', detail: 'Decision support before a larger commitment', tone: 'caution' },
        { condition: 'Clear ownership, budget and data', outcome: 'Diagnostic plus implementation', detail: 'Each module with defined responsibilities and economics', tone: 'positive' },
        { condition: 'Client team will run the result', outcome: 'Add training', detail: 'Capability development alongside delivery', tone: 'positive' },
        { condition: 'Integration exceeds client maturity', outcome: 'Do not oversell the bundle', tone: 'negative' },
      ],
      takeaway: 'Service breadth creates cross-selling and continuity only when each offer has clear capabilities, responsibilities, controls and economics.',
    },
  },
  'professional-consulting-m3-5': {
    heading: 'Delivery can run in phases from strategy to a continuing managed service',
    intro: 'The same transformation can be sold as one program or as separate diagnostic, pilot, deployment and managed phases. A managed service continues operating a defined service under agreed responsibilities and service levels.',
    spec: {
      layout: 'flow', title: '05 How Are Implementation and Managed Services Delivered?', kicker: '',
      steps: [
        { label: 'Strategy and diagnostic', detail: 'Decision support sets the target' },
        { label: 'Pilot', detail: 'Tests the solution before scale' },
        { label: 'Deployment', detail: 'Builds and rolls out the solution' },
        { label: 'Managed service', detail: 'Continuing operation under agreed service levels', kind: 'outcome' },
      ],
      note: 'Each phase needs its own capabilities, responsibilities, controls and economics; match the phasing to client procurement, budget and internal ownership.',
      takeaway: 'Service breadth creates cross-selling and continuity only when each offer has clear capabilities, responsibilities, controls and economics.',
    },
  },
  'professional-consulting-m3-6': {
    heading: 'Design, data products and capability services leave the client with different things',
    intro: 'Consulting offers span solution design, analytics and capability development as separate modules. Each one delivers something different and needs its own ownership and controls.',
    spec: {
      layout: 'table', title: '06 How Do Data Products, Training, and Capability Services Differ?', kicker: '',
      headers: ['Offer', 'What the client receives', 'Clarify before selling'],
      rows: [
        { label: 'Solution design', a: 'A designed solution ahead of build', b: 'Who builds it and owns the design' },
        { label: 'Data product', a: 'Analytics the client keeps using', b: 'Data, controls and continuing responsibility' },
        { label: 'Training', a: 'Skills for client teams', b: 'Who attends and what they will run' },
        { label: 'Capability development', a: 'Internal ownership of the result', b: 'Client maturity and readiness' },
      ],
      note: 'Match each offer to client maturity, procurement, budget, risk, data and internal ownership rather than overselling integration.',
      takeaway: 'Service breadth creates cross-selling and continuity only when each offer has clear capabilities, responsibilities, controls and economics.',
    },
  },
  'professional-consulting-m3-7': {
    heading: 'Consulting buyers differ by organisation type and by who signs inside it',
    intro: 'Buyers range from boards and executives to functions, transformation offices, procurement, CIOs, CTOs and public institutions. This chapter focuses on multinationals, financial institutions and technology companies.',
    spec: {
      layout: 'taxonomy', title: '07 Who Buys Consulting Services?', kicker: '',
      root: 'Consulting buyers', rootDetail: 'Segments, not a sequence — value depends on maturity, decision rights, regulation, budget and capacity',
      groups: [
        { label: 'Multinational', detail: 'May need regional integration' },
        { label: 'Financial institution', detail: 'Regulation shapes what the method is worth' },
        { label: 'Technology company', detail: 'Own maturity and implementation capacity set the need' },
        { label: 'Buyers inside the client', items: ['Boards and executives', 'Functions', 'Transformation offices', 'Procurement', 'CIOs and CTOs'] },
      ],
      takeaway: 'The same method has different value depending on client maturity, decision rights, regulation, budget and implementation capacity.',
    },
  },
  'professional-consulting-m3-8': {
    heading: 'Each client role around an engagement wants something different from it',
    intro: 'At a domestic group or manufacturer, the sponsor, users, affected teams and procurement each shape the engagement. Define every role before scoping the work.',
    spec: {
      layout: 'ecosystem', title: '08 How Do Buyer Roles, Procurement, and Needs Differ?', kicker: '',
      center: { label: 'Engagement at a domestic group or manufacturer', detail: 'Roles defined before scope is fixed' },
      actors: [
        { label: 'Sponsor', relation: 'Owns the budget and the desired outcome', flows: ['money', 'oversight'] },
        { label: 'Procurement', relation: 'Runs the buying process and terms', flows: ['money', 'risk'] },
        { label: 'Users', relation: 'Adopt the solution in daily work', flows: ['information'] },
        { label: 'Affected teams', relation: 'Absorb the change and its constraints', flows: ['risk', 'information'] },
        { label: 'Consulting firm', relation: 'Delivers to the agreed need and readiness', flows: ['service'] },
      ],
      note: 'Vietnam: define sponsor, users, affected teams, procurement, budget, maturity, readiness, constraints and desired outcome.',
      takeaway: 'The same method has different value depending on client maturity, decision rights, regulation, budget and implementation capacity.',
    },
  },
  'professional-consulting-m3-9': {
    heading: 'Five client conditions decide what the same method is worth',
    intro: 'An SME may need a focused cloud or process improvement with clear cost limits, while a public institution brings its own rules and decision rights. Maturity and readiness shape the whole engagement.',
    spec: {
      layout: 'driverTree', title: '09 How Do Client Maturity and Readiness Shape the Engagement?', kicker: '',
      root: { label: 'Value of the engagement', detail: 'Same method, different client' },
      drivers: [
        { label: 'Client maturity', detail: 'How ambitious the scope can be', children: [{ label: 'SME: focused improvement' }] },
        { label: 'Decision rights', detail: 'Who can approve and own change' },
        { label: 'Regulation', detail: 'Rules the client operates under', children: [{ label: 'Public sector institution' }] },
        { label: 'Budget', detail: 'Clear cost limits' },
        { label: 'Implementation capacity', detail: 'Readiness to carry the change' },
      ],
      note: 'Vietnam: define sponsor, users, affected teams, procurement, budget, maturity, readiness, constraints and desired outcome.',
      takeaway: 'The same method has different value depending on client maturity, decision rights, regulation, budget and implementation capacity.',
    },
  },
  'professional-consulting-m3-10': {
    heading: 'Each fee model allocates scope and productivity risk differently',
    intro: 'Time-based, fixed, milestone and recurring fees all depend on agreed work, dependencies, assumptions and acceptance. Contracts should match how predictable the work is.',
    spec: {
      layout: 'table', title: '10 How Do Time-Based, Fixed-Fee, and Milestone Fees Work?', kicker: '',
      headers: ['Fee model', 'How it bills', 'Where the risk sits'],
      rows: [
        { label: 'Hourly or daily rate', a: 'Time worked at agreed rates', b: 'Client carries scope and productivity uncertainty' },
        { label: 'Fixed fee', a: 'Agreed price for defined work', b: 'Firm carries margin risk if scope grows' },
        { label: 'Milestone', a: 'Payment on accepted milestones', b: 'Depends on acceptance and dependencies' },
        { label: 'Retainer', a: 'Recurring fee for ongoing work', b: 'Needs a clear scope boundary' },
      ],
      note: 'A fixed diagnostic can be followed by time-based analysis and a separate implementation contract. Change control protects the scope boundary.',
      takeaway: 'Pricing allocates scope, productivity and uncertainty risk; contracts should match work predictability and define change clearly.',
    },
  },
  'professional-consulting-m3-11': {
    heading: 'An outcome fee is earned only after baseline, measurement and validation',
    intro: 'Outcome-based pricing ties fees to verified cost, revenue, operational or strategic value rather than hours. A savings fee needs an agreed baseline, exclusions, realization period, client responsibilities and validation method.',
    spec: {
      layout: 'flow', title: '11 How Do Outcome-Based and Value-Based Fees Work?', kicker: '',
      steps: [
        { label: 'Agree the baseline', detail: 'Defined starting measure for the value', owner: 'Client and firm' },
        { label: 'Allocate responsibilities', detail: 'Exclusions, external factors and client duties', owner: 'Contract' },
        { label: 'Measurement period', detail: 'Results realised over the agreed period' },
        { label: 'Validate attribution', detail: 'Agreed method confirms what the work caused', kind: 'decision' },
        { label: 'Outcome fee', detail: 'Shared saving, performance incentive or value-based fee', kind: 'outcome' },
      ],
      note: 'Vietnam: avoid unsupported attribution and define accounting, tax, data, acceptance, dispute and payment mechanisms.',
      takeaway: 'Outcome-linked fees align incentives only when results are measurable and responsibility and external factors are fairly allocated.',
    },
  },
  'professional-consulting-m3-12': {
    heading: 'A project improves a service; a managed service runs it and renews',
    intro: 'Managed application support operates a defined service, while a consulting project diagnoses and improves it. Recurring revenue comes from retainers, support, cloud operations, cyber monitoring and analytics platforms.',
    spec: {
      layout: 'compare', title: '12 How Do Retainers and Managed Services Create Recurring Revenue?', kicker: '',
      leftTitle: 'Discrete consulting project', rightTitle: 'Retainer or managed service',
      rows: [
        { label: 'Purpose', a: 'Diagnoses and improves', b: 'Operates a defined service' },
        { label: 'Revenue pattern', a: 'Ends with the project', b: 'Recurring, subject to renewal' },
        { label: 'Typical offers', a: 'Diagnostic or improvement work', b: 'Advisory retainer, application support, cloud operations, cyber monitoring' },
        { label: 'What it demands', a: 'Defined scope and deliverables', b: 'Continuous quality, staffing and service levels' },
      ],
      note: 'Vietnam: separate service levels, incidents, data, cyber, continuity, subcontractors, transition, exit and client retained responsibilities.',
      takeaway: 'Recurring revenue improves visibility but requires continuous quality, operations, staffing and clear service responsibility.',
    },
  },
  'professional-consulting-m3-13': {
    heading: 'Each level of the team hierarchy carries a different kind of responsibility',
    intro: 'Consulting teams are hierarchical and multidisciplinary, with work allocated by competence, responsibility, complexity, deadline and budget. A strategy problem needs senior judgment; a systems program needs more engineering and project management.',
    spec: {
      layout: 'taxonomy', title: '13 How Do Staffing Hierarchies and Leverage Shape Economics?', kicker: '',
      root: 'Engagement team', rootDetail: 'Roles, not a sequence — mix them by the problem',
      groups: [
        { label: 'Partner', detail: 'Senior judgment and client responsibility' },
        { label: 'Consultant', detail: 'Analysis and day-to-day delivery' },
        { label: 'Specialist', detail: 'Sector or technical depth' },
        { label: 'Quality review', detail: 'Checks work before it reaches the client' },
      ],
      note: 'More junior leverage or more people does not by itself raise profit; the mix must fit the problem.',
      takeaway: 'Profitability depends on the right capability at the right cost—not simply more junior leverage or more people.',
    },
  },
  'professional-consulting-m3-14': {
    heading: 'Revenue from capacity depends on who is available, at what rate, for which work',
    intro: 'Managers and engineers are allocated by competence, complexity, deadline and budget. Planning must use actual local and remote availability, not headcount alone.',
    spec: {
      layout: 'driverTree', title: '14 How Do Utilization, Realization, and Capacity Affect Revenue?', kicker: '',
      root: { label: 'Delivery revenue and profit', detail: 'Right capability at the right cost' },
      drivers: [
        { label: 'Manager capacity', detail: 'Supervision and responsibility', children: [{ label: 'Project management' }, { label: 'Supervision' }] },
        { label: 'Engineer capacity', detail: 'Build and testing work', children: [{ label: 'Engineering' }, { label: 'Testing' }] },
        { label: 'Resource allocation', detail: 'Matching people to work', children: [{ label: 'Local and remote availability' }, { label: 'Peak demand' }] },
        { label: 'Cost of capacity', detail: 'What the team costs to supply', children: [{ label: 'Rates' }, { label: 'Turnover' }] },
      ],
      note: 'Vietnam: plan actual local and remote availability, rates, language, sector expertise, turnover, supervision and peak demand.',
      takeaway: 'Profitability depends on the right capability at the right cost—not simply more junior leverage or more people.',
    },
  },
  'professional-consulting-m3-15': {
    heading: 'Productivity levers each need a safeguard to stay profitable',
    intro: 'Project profitability rests on billable capacity, staffing demand and reusable methods, templates, code, data and AI-enabled knowledge systems. A reusable framework speeds delivery only after its assumptions are adapted and client confidentiality is protected.',
    spec: {
      layout: 'table', title: '15 How Do Scope, Delivery Cost, and Write-Offs Determine Project Profitability?', kicker: '',
      headers: ['Lever', 'How it lifts productivity', 'What it must protect'],
      rows: [
        { label: 'Utilization', a: 'Chargeable time against available capacity', b: 'Training, sales, internal work and leave' },
        { label: 'Capacity planning', a: 'Staffing matched to demand', b: 'Sustainable workload' },
        { label: 'Knowledge asset', a: 'Reused methods, templates, code and data', b: 'Client confidentiality' },
        { label: 'AI productivity', a: 'AI-enabled knowledge systems', b: 'Quality and learning' },
      ],
      note: 'Define utilization consistently and preserve training, quality, sales, internal work, leave and retention capacity.',
      takeaway: 'Strong productivity combines sensible utilization, reusable knowledge and technology without sacrificing learning, quality or wellbeing.',
    },
  },
  'professional-consulting-m3-16': {
    heading: 'A proprietary tool differentiates only if it carries specialist knowledge reliably',
    intro: 'Firms build research platforms, project systems and AI assistants as internal and client-facing assets. An AI knowledge assistant needs approved sources, permissions, citations, evaluation, updates and human verification.',
    spec: {
      layout: 'decision', title: '16 How Do Proprietary Tools, Data, and Intellectual Property Create Value?', kicker: '',
      root: { label: 'Proprietary tool', detail: 'Research platform, project system or AI assistant' },
      question: 'Does it embody specialized knowledge and improve reliable delivery?',
      branches: [
        { condition: 'Specialist knowledge, governed and maintained', outcome: 'Differentiates delivery', tone: 'positive' },
        { condition: 'Useful but lacks approved sources or verification', outcome: 'Govern before relying on it', detail: 'Permissions, citations, evaluation and updates', tone: 'caution' },
        { condition: 'Replicates accessible software', outcome: 'No lasting advantage', tone: 'negative' },
      ],
      note: 'Vietnam: govern client IP, personal data, cross-border transfer, access, retention, model inputs and contractual ownership.',
      takeaway: 'Tools differentiate when they embody specialized knowledge and improve reliable delivery, not when they merely replicate accessible software.',
    },
  },
  'professional-consulting-m3-17': {
    heading: 'Analytics and frameworks are delivery assets that need data governance to be usable',
    intro: 'Firms bring platforms, methodologies, datasets, accelerators, models and code into delivery. Using them on client work raises data governance questions about IP, personal data and ownership.',
    spec: {
      layout: 'taxonomy', title: '17 How Do Technology Partnerships and Alliances Shape Delivery?', kicker: '',
      root: 'Delivery assets', rootDetail: 'Internal and client-facing — categories, not steps',
      groups: [
        { label: 'Analytics', items: ['Datasets', 'Models'] },
        { label: 'Framework', items: ['Methodologies', 'Accelerators'] },
        { label: 'Platforms and code', items: ['Internal platforms', 'Client-facing platforms', 'Code'] },
        { label: 'Data governance', items: ['Client IP', 'Personal data', 'Cross-border transfer', 'Contractual ownership'] },
      ],
      takeaway: 'Tools differentiate when they embody specialized knowledge and improve reliable delivery, not when they merely replicate accessible software.',
    },
  },
  'professional-consulting-m3-18': {
    heading: 'Partners extend a firm’s reach, but the client’s need sits at the centre',
    intro: 'Consulting firms work with cloud, enterprise software, cybersecurity, data, AI and specialist providers for sales and delivery. A platform-certified team still needs objective option and total-cost analysis.',
    spec: {
      layout: 'ecosystem', title: '18 How Do Talent, Regulators, Vendors, and Client Teams Shape the Ecosystem?', kicker: '',
      center: { label: 'Client need', detail: 'Recommendations follow it, not vendor incentives' },
      actors: [
        { label: 'Consulting firm', relation: 'Objective options and total-cost analysis', flows: ['service', 'information'] },
        { label: 'Cloud partner', relation: 'Platform capability and joint delivery', flows: ['product', 'service'] },
        { label: 'Enterprise software vendor', relation: 'Application and team certification', flows: ['product'] },
        { label: 'Cyber alliance', relation: 'Security capability in delivery', flows: ['service', 'risk'] },
        { label: 'Client team', relation: 'Decides, pays and sets lock-in and exit terms', flows: ['money', 'oversight'] },
      ],
      note: 'Vietnam: disclose material relationships and define vendor, integrator, consultant and client responsibility, lock-in, portability and exit.',
      takeaway: 'Partnerships extend capability and reach, but recommendations should follow client need rather than vendor incentives.',
    },
  },
};
