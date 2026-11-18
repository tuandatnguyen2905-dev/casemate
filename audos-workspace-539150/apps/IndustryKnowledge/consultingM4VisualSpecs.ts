import type { ConsultingChapterVisual } from './consultingVisualSpecs';

/** Chapter-specific Learning Visuals for Management & Technology Consulting Module 04, keyed by visualKind. */
export const CONSULTING_M4_VISUALS: Record<string, ConsultingChapterVisual> = {
  'professional-consulting-m4-1': {
    heading: 'Global strategy firms compete on who they serve, what they advise on and how',
    intro: 'Global strategy providers serve boards, executives, investors and public leaders on strategy, portfolios, markets and transformation. Named firms illustrate a category, not a quality or market-share ranking.',
    spec: {
      layout: 'taxonomy', title: '01 How Do Global Strategy Firms Compete?', kicker: '',
      root: 'Global strategy firms', rootDetail: 'A category of provider, not a ranking',
      groups: [
        { label: 'Who they serve', items: ['Boards', 'Executives', 'Investors', 'Public leaders'] },
        { label: 'What they advise on', items: ['Corporate strategy', 'Portfolios', 'Markets', 'Transformation'] },
        { label: 'How they compete', items: ['Executive trust', 'Industry specialization', 'Analytical method', 'Premium positioning'] },
        { label: 'Growing requirement', detail: 'Transformation support that connects advice with execution' },
      ],
      note: 'Vietnam: verify current local presence, sector depth, staffing, delivery model and implementation capability for the actual mandate.',
      takeaway: 'Strategy firms compete on expertise, trust and high-stakes decision support and increasingly need to connect advice with execution.',
    },
  },
  'professional-consulting-m4-2': {
    heading: 'Multidisciplinary firms coordinate many teams inside independence boundaries',
    intro: 'These firms combine consulting, technology, risk and other professional services under varying legal and regulatory boundaries. An integrated transformation can draw on strategy, process, cyber and implementation teams while keeping required service restrictions.',
    spec: {
      layout: 'ecosystem', title: '02 How Do Multidisciplinary Professional Services Firms Compete?', kicker: '',
      center: { label: 'Integrated client transformation', detail: 'One accountable delivery team' },
      actors: [
        { label: 'Strategy team', relation: 'Sets direction for the transformation', flows: ['information'] },
        { label: 'Process and implementation teams', relation: 'Redesign and deliver the change', flows: ['service'] },
        { label: 'Risk advisory and cyber', relation: 'Manage risk and security', flows: ['risk', 'service'] },
        { label: 'International network', relation: 'Adds reach and specialist breadth', flows: ['information', 'service'] },
        { label: 'Independence governance', relation: 'Conflict checks and information barriers', flows: ['oversight'] },
      ],
      note: 'Vietnam: assess legal entity, authorization, conflict and independence constraints, information barriers and the accountable delivery team.',
      takeaway: 'Breadth and scale create value only when coordinated with appropriate conflict, independence, data and delivery governance.',
    },
  },
  'professional-consulting-m4-3': {
    heading: 'One program can be split among very different kinds of provider',
    intro: 'Technology consultancies, implementation partners, specialists, vendors, freelancers and in-house teams all compete for digital work. A client can choose different providers for overlapping parts of one program.',
    spec: {
      layout: 'pathway', title: '03 How Do Technology-Led and Specialist Providers Compete?', kicker: '',
      trunk: [
        { label: 'Client program', detail: 'Digital work with overlapping parts' },
        { label: 'Problem to solve', detail: 'Defines the competitive boundary' },
      ],
      optionsLabel: 'Competing providers — alternatives, not steps',
      options: [
        { label: 'Systems integrator', detail: 'Implementation and integration' },
        { label: 'Cloud provider', detail: 'Platform plus vendor services' },
        { label: 'Cyber specialist', detail: 'Focused security depth' },
        { label: 'Data and AI specialist', detail: 'Analytics and AI expertise' },
        { label: 'Independent expert', detail: 'Individual specialist input' },
        { label: 'Internal team', detail: 'Client’s own capability' },
      ],
      afterLabel: 'Then',
      after: [
        { label: 'Compare providers', detail: 'Independence, depth, capacity, incentives, total cost, lock-in, security', kind: 'decision' },
      ],
      takeaway: 'Competitive boundaries follow the problem being solved, not the traditional label of the provider.',
    },
  },
  'professional-consulting-m4-4': {
    heading: 'Vietnam’s consulting market mixes six kinds of provider',
    intro: 'The market combines global professional services, strategy, technology, local advisory, IT providers and independents. This chapter focuses on international firms and system integrators.',
    spec: {
      layout: 'taxonomy', title: '04 Who Are the Major Global Consulting Provider Types?', kicker: '',
      root: 'Consulting provider types', rootDetail: 'Nationality alone does not determine capability',
      groups: [
        { label: 'Global professional services', detail: 'International firm with network methods' },
        { label: 'Strategy firms', detail: 'Executive and strategic advice' },
        { label: 'System integrators', detail: 'Technology implementation' },
        { label: 'IT providers', detail: 'IT services and delivery' },
        { label: 'Local advisory', detail: 'Domestic context and responsiveness' },
        { label: 'Independents', detail: 'Individual experts' },
      ],
      takeaway: 'Nationality alone does not determine capability; fit depends on service, client, local context, technical depth, economics and execution.',
    },
  },
  'professional-consulting-m4-5': {
    heading: 'There is no leader list: the mandate decides which provider fits',
    intro: 'The chapter names no leading firms. It compares domestic consultancies and independent experts with international firms and asks what the actual mandate needs.',
    spec: {
      layout: 'decision', title: '05 Who Are the Technology and Systems-Integration Leaders?', kicker: '',
      root: { label: 'Technology or integration mandate', detail: 'Judge capability, not label or nationality' },
      question: 'What does this mandate need most?',
      branches: [
        { condition: 'Local context, responsiveness, price flexibility', outcome: 'Domestic consultancy', tone: 'positive' },
        { condition: 'A narrow expert question', outcome: 'Independent expert', detail: 'Check security, capacity and partner network', tone: 'caution' },
        { condition: 'Network methods across markets', outcome: 'International firm', tone: 'positive' },
        { condition: 'Choosing on nationality alone', outcome: 'Not a valid test', tone: 'negative' },
      ],
      note: 'Benchmark actual team, references, senior involvement, language, security, partner network and delivery capacity.',
      takeaway: 'Nationality alone does not determine capability; fit depends on service, client, local context, technical depth, economics and execution.',
    },
  },
  'professional-consulting-m4-6': {
    heading: 'International, domestic and IT-service providers often deliver together in Vietnam',
    intro: 'International firms can bring network methods while domestic providers offer local context, responsiveness and price flexibility. Collaborative delivery combines them with IT services around one client mandate.',
    spec: {
      layout: 'ecosystem', title: '06 Who Are the International and Domestic Providers in Vietnam?', kicker: '',
      center: { label: 'Client mandate in Vietnam', detail: 'Collaborative delivery' },
      actors: [
        { label: 'International firm', relation: 'Brings network methods', flows: ['information', 'service'] },
        { label: 'Domestic provider', relation: 'Local context, responsiveness, price flexibility', flows: ['service'] },
        { label: 'IT services provider', relation: 'Technology delivery capacity', flows: ['product', 'service'] },
        { label: 'Client', relation: 'Benchmarks team, references and senior involvement', flows: ['money', 'oversight'] },
      ],
      note: 'Benchmark actual team, references, senior involvement, language, security, partner network and delivery capacity.',
      takeaway: 'Nationality alone does not determine capability; fit depends on service, client, local context, technical depth, economics and execution.',
    },
  },
  'professional-consulting-m4-7': {
    heading: 'Brand signals reduce buying risk; buyers should still test the evidence',
    intro: 'Trust, previous work, references, senior access and relationship quality influence consulting purchases. A boutique can offset limited brand scale through verifiable specialist expertise and direct senior delivery.',
    spec: {
      layout: 'compare', title: '07 How Do Brand and Client Relationships Compare?', kicker: '',
      leftTitle: 'What builds brand trust', rightTitle: 'What the buyer should verify',
      rows: [
        { label: 'Thought leadership', a: 'Visible ideas and expertise', b: 'Relevance to this client’s problem' },
        { label: 'Executive relationship', a: 'Senior access', b: 'Whether the current team will deliver' },
        { label: 'Reference', a: 'Previous work', b: 'Relevant references and outcome evidence' },
        { label: 'Repeat engagement', a: 'Clients return', b: 'Consistent outcomes behind the return' },
        { label: 'Specialist reputation', a: 'Known for depth', b: 'Verifiable specialist expertise' },
      ],
      note: 'Test relevant references, current team and outcome evidence rather than logo familiarity.',
      takeaway: 'Brand reduces perceived buying risk, but sustained advantage requires transparent communication and consistent outcomes.',
    },
  },
  'professional-consulting-m4-8': {
    heading: 'Talent becomes an advantage once individual expertise turns into firm capability',
    intro: 'Firms combine business, sector, technology, analytical, delivery and leadership capabilities with methods, tools and knowledge. A sector expert finds constraints faster, while engineers and change leaders make solutions implementable.',
    spec: {
      layout: 'flow', title: '08 How Do Talent, Industry Expertise, and Intellectual Capital Compare?', kicker: '',
      steps: [
        { label: 'Talent acquisition', detail: 'Hire business, sector and technical capability' },
        { label: 'Professional development', detail: 'Training and career paths build depth' },
        { label: 'Multidisciplinary team', detail: 'Industry depth combined with engineering and change' },
        { label: 'Knowledge management', detail: 'Capture expertise without losing context' },
        { label: 'Organizational capability', detail: 'Reusable across clients', kind: 'outcome' },
      ],
      loop: 'Retention and knowledge transfer keep the capability in the firm and reduce key-person risk.',
      note: 'Vietnam: benchmark local retention, specialist depth, training, key-person risk, career paths and knowledge transfer.',
      takeaway: 'Talent differentiates most when individual expertise becomes reusable organizational capability without losing context.',
    },
  },
  'professional-consulting-m4-9': {
    heading: 'Access to AI is shared; governed data, knowledge and accountability are not',
    intro: 'Technology now supports research, analysis, code, collaboration and project control across firms. NIST warns of confabulation, privacy and security risks, while OECD stresses human oversight, transparency and accountability.',
    spec: {
      layout: 'compare', title: '09 How Do Technology, AI, and Delivery Productivity Compare?', kicker: '',
      leftTitle: 'AI access alone', rightTitle: 'Governed AI advantage',
      rows: [
        { label: 'Data', a: 'Whatever inputs are at hand', b: 'Trusted data with clear rights' },
        { label: 'Knowledge', a: 'Generic tools any firm can use', b: 'Proprietary analytics and knowledge' },
        { label: 'Workflow', a: 'Ad hoc automation', b: 'Digital delivery with quality control and security' },
        { label: 'Accountability', a: 'Outputs taken at face value', b: 'Source verification and human review' },
        { label: 'Productivity measure', a: 'Tool usage', b: 'Actual outcome improvement' },
      ],
      note: 'Evaluate secure environment, data rights, source verification, output quality, incident controls and actual outcome improvement.',
      takeaway: 'Access to AI is not a moat; advantage comes from trusted data, proprietary knowledge, governed workflows and human accountability.',
    },
  },
  'professional-consulting-m4-10': {
    heading: 'A premium fee holds only when expertise, value logic and scope control back it',
    intro: 'Firms compete on fee, scope, quality, method, risk, implementation and expected value. A premium fee needs credible expertise and value logic, shown with total delivery cost and benefit measurement.',
    spec: {
      layout: 'driverTree', title: '10 Why Do Talent, Knowledge, and Specialization Drive Success?', kicker: '',
      root: { label: 'Premium advisory that wins', detail: 'Differentiated on outcomes and expertise' },
      drivers: [
        { label: 'Credible expertise', detail: 'Specialist talent and knowledge', children: [{ label: 'Specialization' }, { label: 'Knowledge transfer' }] },
        { label: 'Value proposal', detail: 'Logic linking fee to expected value', children: [{ label: 'Value logic' }, { label: 'Benefit measurement' }] },
        { label: 'Scope control', detail: 'Defined work and change', children: [{ label: 'Assumptions' }, { label: 'Dependencies' }] },
        { label: 'Transparent cost', detail: 'What delivery really takes', children: [{ label: 'Total delivery cost' }, { label: 'Staffing and risk' }] },
      ],
      takeaway: 'Firms should differentiate on relevant outcomes and expertise rather than price or reputation alone.',
    },
  },
  'professional-consulting-m4-11': {
    heading: 'Bids that show how outcomes will be delivered earn more trust than low prices',
    intro: 'A low bid can create rework or failed adoption. Clients should compare offers on outcome evidence, delivery assumptions and benefit measurement, not fee alone.',
    spec: {
      layout: 'decision', title: '11 Why Do Client Trust, Delivery Quality, and Outcomes Matter?', kicker: '',
      root: { label: 'Client comparing bids', detail: 'Competitive bid, standard offer or outcome-based proposal' },
      question: 'Does the offer show how outcomes will be delivered and measured?',
      branches: [
        { condition: 'Low bid with thin assumptions', outcome: 'Risk of rework or failed adoption', tone: 'negative' },
        { condition: 'Standard offer for a well-defined need', outcome: 'Can fit if scope is explicit', detail: 'Staffing, dependencies and risk stated', tone: 'caution' },
        { condition: 'Outcome evidence and benefit measurement', outcome: 'Builds trust in delivery quality', tone: 'positive' },
      ],
      note: 'Show total delivery cost, assumptions, staffing, dependencies, risk, knowledge transfer and benefit measurement.',
      takeaway: 'Firms should differentiate on relevant outcomes and expertise rather than price or reputation alone.',
    },
  },
  'professional-consulting-m4-12': {
    heading: 'Growth lasts only when credentials, capacity, security and systems scale together',
    intro: 'Barriers come from references, relationships, talent, financial strength, security, procurement, quality and geography. Rapid sales growth weakens quality when staffing, governance and knowledge systems do not scale.',
    spec: {
      layout: 'driverTree', title: '12 How Do Pricing, Capacity, and Scalable Economics Sustain Growth?', kicker: '',
      root: { label: 'Sustainable growth', detail: 'Beyond narrow advice into enterprise transformation' },
      drivers: [
        { label: 'Credential', detail: 'References that win trust', children: [{ label: 'References' }, { label: 'Client access' }] },
        { label: 'Delivery capacity', detail: 'Multidisciplinary talent', children: [{ label: 'Staffing' }, { label: 'Quality' }] },
        { label: 'Security', detail: 'Controls clients and procurement require' },
        { label: 'Scalable system', detail: 'Repeatable delivery', children: [{ label: 'Governance' }, { label: 'Knowledge systems' }] },
        { label: 'International expansion', detail: 'Geography adds a further barrier' },
      ],
      note: 'Vietnam: stage expansion by sector, client segment and service while monitoring win rate, staffing, quality, collections and concentration.',
      takeaway: 'Entry is easy for narrow advice but enterprise transformation requires trust, multidisciplinary capacity, controls and repeatable delivery.',
    },
  },
  'professional-consulting-m4-13': {
    heading: 'Substitutes take standardized tasks; external firms keep the hard problems',
    intro: 'Client strategy teams, transformation offices, vendors, platforms, AI and independent experts all compete with consulting firms. AI can reduce research demand while raising demand for AI governance, integration and independent challenge.',
    spec: {
      layout: 'table', title: '13 How Are Internal Teams, Vendors, Freelancers, and AI Substituting Work?', kicker: '',
      headers: ['Substitute', 'What it can take over', 'Where external firms keep value'],
      rows: [
        { label: 'Internal consulting', a: 'Tasks a mature internal team does reliably', b: 'Difficult problems and capability gaps' },
        { label: 'Vendor service', a: 'Platform and product-related work', b: 'Independent challenge of options' },
        { label: 'AI self-service', a: 'Some external research', b: 'AI governance and integration' },
        { label: 'Freelancer', a: 'Defined expert tasks', b: 'Temporary capacity and complex implementation' },
      ],
      note: 'Hybrid delivery combines internal teams, vendors, freelancers and external specialists on one program.',
      takeaway: 'Substitution is strongest for standardized tasks; external firms retain value through judgment, specialization, temporary capacity and complex implementation.',
    },
  },
  'professional-consulting-m4-14': {
    heading: 'Client maturity, not segment name, sets the right positioning',
    intro: 'Client segments in Vietnam expect different governance, technology, budget, procurement and delivery. An enterprise framework can be inappropriate for an SME without data, project capacity or funding.',
    spec: {
      layout: 'decision', title: '14 How Should Providers Position by Client Segment in Vietnam?', kicker: '',
      root: { label: 'Client in Vietnam', detail: 'Multinational, domestic group, SME, financial institution, manufacturer or public sector' },
      question: 'How mature and ready is this client?',
      branches: [
        { condition: 'Lower maturity or readiness', outcome: 'Focused package, clear phases, capability transfer', tone: 'positive' },
        { condition: 'Complex program', outcome: 'Multidisciplinary governance', tone: 'positive' },
        { condition: 'No data, project capacity or funding', outcome: 'Do not impose an enterprise framework', tone: 'negative' },
      ],
      takeaway: 'Competitive fit requires matching scope, price, communication and implementation support to client maturity.',
    },
  },
  'professional-consulting-m4-15': {
    heading: 'Local constraints, growth areas and strategic responses sit side by side',
    intro: 'Vietnam combines constraints with growth in modernization, AI, cyber, process improvement and management professionalization. A diagnostic and pilot can establish value and readiness before a larger commitment.',
    spec: {
      layout: 'taxonomy', title: '15 What Risks, Opportunities, and Strategic Tradeoffs Shape the Industry?', kicker: '',
      root: 'Vietnam consulting landscape', rootDetail: 'Categories to weigh together, not a sequence',
      groups: [
        { label: 'Constraints', items: ['Price sensitivity', 'Talent shortage', 'Data maturity', 'Outcome proof'] },
        { label: 'Growth areas', items: ['Modernization', 'AI', 'Cyber', 'Process improvement', 'Management professionalization'] },
        { label: 'Strategic responses', items: ['Phased delivery', 'Partnership', 'Local capability'] },
        { label: 'What to track', items: ['Baseline and benefit', 'Staffing and quality', 'Client ownership', 'Collections', 'Repeatability'] },
      ],
      note: 'Track delivery evidence, not market growth alone.',
      takeaway: 'Sustainable opportunity comes from solving defined needs with demonstrable outcomes while maintaining quality and delivery economics.',
    },
  },
};
