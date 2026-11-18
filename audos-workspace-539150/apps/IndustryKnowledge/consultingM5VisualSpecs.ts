import type { ConsultingChapterVisual } from './consultingVisualSpecs';

/** Chapter-specific Learning Visuals for Management & Technology Consulting Module 05, keyed by visualKind. */
export const CONSULTING_M5_VISUALS: Record<string, ConsultingChapterVisual> = {
  'professional-consulting-m5-1': {
    heading: 'Clients are moving from paying for deliverables to paying for evidenced impact',
    intro: 'Clients increasingly tie consulting spend to cost, revenue, speed, productivity, risk, adoption and customer outcomes. PMI distinguishes project outputs from benefits, which need owners, metrics and sustainment plans.',
    spec: {
      layout: 'compare', title: '01 How Is Demand Shifting Toward Measurable Outcomes?', kicker: '',
      leftTitle: 'Judged by deliverables', rightTitle: 'Judged by measurable outcomes',
      rows: [
        { label: 'What counts as value', a: 'Completed outputs', b: 'Benefits the client can evidence' },
        { label: 'Contract', a: 'Defined scope of work', b: 'Outcome contract' },
        { label: 'Ownership', a: 'Ends at handover', b: 'Named benefit owner and sustainment plan' },
        { label: 'Proof', a: 'Acceptance of deliverables', b: 'Baseline, dashboard, attribution and independent validation' },
      ],
      note: 'Define baseline, external factors, client responsibilities, measurement period and attribution before claiming impact.',
      takeaway: 'Consulting value will be judged increasingly through credible evidence of impact rather than completed deliverables.',
    },
  },
  'professional-consulting-m5-2': {
    heading: 'Staged engagements test assumptions before committing to scale',
    intro: 'Smaller staged engagements now replace or precede large transformation commitments. A diagnostic, pilot and phased rollout test assumptions and readiness before scale.',
    spec: {
      layout: 'flow', title: '02 Why Are Modular and Flexible Engagements Growing?', kicker: '',
      steps: [
        { label: 'Diagnostic', detail: 'Tests assumptions and readiness' },
        { label: 'Pilot', detail: 'Proves the approach on a limited scope' },
        { label: 'Phase gate', detail: 'Acceptance criteria decide stop or scale', kind: 'decision' },
        { label: 'Phased rollout', detail: 'Work packages delivered by a flexible team' },
        { label: 'Integrated roadmap', detail: 'Phases add up to one coherent target', kind: 'outcome' },
      ],
      loop: 'Handover and reusable architecture carry knowledge from one phase to the next.',
      takeaway: 'Modular delivery reduces initial risk only when phases connect to a coherent target and preserve knowledge continuity.',
    },
  },
  'professional-consulting-m5-3': {
    heading: 'Hybrid teams put the client’s transformation office at the centre',
    intro: 'Delivery increasingly combines client staff, consultants, vendors, contractors and tools under shared governance. An internal transformation office can own priorities while external specialists support AI, cyber or architecture.',
    spec: {
      layout: 'ecosystem', title: '03 How Are Insourcing and Hybrid Client-Consultant Teams Changing Delivery?', kicker: '',
      center: { label: 'Client transformation office', detail: 'Owns priorities under hybrid governance' },
      actors: [
        { label: 'Internal strategy team', relation: 'Client staff doing work once bought externally', flows: ['information'] },
        { label: 'Consultants', relation: 'Co-delivery and independent challenge', flows: ['service', 'oversight'] },
        { label: 'External specialists', relation: 'Augment AI, cyber or architecture work', flows: ['service'] },
        { label: 'Vendors and contractors', relation: 'Tools and temporary capacity', flows: ['product', 'money'] },
      ],
      note: 'Clarify accountability, decision rights, methods, IP, data, staffing, knowledge transfer and retained ownership; capability transfer should leave the client able to sustain outcomes.',
      takeaway: 'Stronger internal teams shift external value toward specialized expertise, independent challenge, temporary capacity and collaboration.',
    },
  },
  'professional-consulting-m5-4': {
    heading: 'Generative AI takes on tasks, while framing and accountability stay human',
    intro: 'Generative AI now supports research, analysis, coding, summaries, drafts and internal knowledge workflows. NIST identifies confabulation, privacy, prompt injection and data risks that require governed use.',
    spec: {
      layout: 'taxonomy', title: '04 How Is Generative AI Changing Consulting Delivery and Enterprise Adoption?', kicker: '',
      root: 'Consulting work with generative AI', rootDetail: 'Task composition changes; the need for judgment does not',
      groups: [
        { label: 'AI-supported tasks', items: ['Research automation', 'Analytical assistance', 'Knowledge retrieval', 'Document production'] },
        { label: 'Work that stays human', items: ['Problem framing', 'Client context', 'Client interaction', 'Accountability'] },
        { label: 'Secure AI guardrails', items: ['Approved environments', 'Client data and IP protection', 'Cited sources', 'Human validation'] },
        { label: 'Risks NIST identifies', items: ['Confabulation', 'Privacy', 'Prompt injection', 'Data risks'] },
      ],
      takeaway: 'AI changes task composition more than it removes the need for problem framing, context, client interaction and accountability.',
    },
  },
  'professional-consulting-m5-5': {
    heading: 'AI adoption and cloud modernization converge on one data and governance foundation',
    intro: 'This chapter joins AI strategy and enterprise architecture: business case, data, risk and human oversight for AI, plus target architecture, migration, integration, security and cost. Both create value only with process and ownership change.',
    spec: {
      layout: 'table', title: '05 How Are Cloud, Data, Architecture, and Cyber Resilience Converging?', kicker: '',
      headers: ['Workstream', 'What it covers', 'Governance it needs'],
      rows: [
        { label: 'AI adoption', a: 'Use-case assessment, workflow redesign, training', b: 'AI governance and value measurement' },
        { label: 'Data foundation', a: 'Data readiness and data architecture', b: 'Personal-data owners, controls and monitoring' },
        { label: 'Cloud migration', a: 'Moving workloads with integration', b: 'Cloud cost (FinOps) governance' },
        { label: 'Legacy modernization', a: 'Replacing systems with process and ownership change', b: 'Architecture governance' },
        { label: 'Resilience and exit', a: 'Data location, cross-border transfer, resilience', b: 'Vendor lock-in, skills, costs and exit assessed' },
      ],
      note: 'ISO/IEC 42001 provides a management-system approach for AI; OECD stresses human oversight, transparency and accountability.',
      takeaway: 'AI consulting creates value by moving organizations from experiments to reliable business adoption, and modernization by improving operating and innovation capability rather than replacing technology alone.',
    },
  },
  'professional-consulting-m5-6': {
    heading: 'Operating-model reinvention changes five elements together, with cyber resilience built in',
    intro: 'This chapter joins operating-model transformation and cyber resilience. Decision rights, workflows, capabilities, technology and measures are redesigned together, and security runs through all of them.',
    spec: {
      layout: 'taxonomy', title: '06 How Is Technology Reinventing Processes and Operating Models?', kicker: '',
      root: 'Reinvented operating model', rootDetail: 'Elements that change as one system, not in sequence',
      groups: [
        { label: 'Structure', items: ['Organization redesign', 'Decision rights', 'Shared service'] },
        { label: 'Process', items: ['Process simplification', 'Customer journey'] },
        { label: 'People', items: ['Capabilities', 'Roles and learning'] },
        { label: 'Technology', items: ['Digital model', 'Cloud security', 'Identity'] },
        { label: 'Measures', items: ['Performance management'] },
        { label: 'Cyber resilience throughout', items: ['Security by design', 'Third-party risk', 'Incident response', 'Operational resilience'] },
      ],
      note: 'NIST CSF 2.0 connects Govern, Identify, Protect, Detect, Respond and Recover. A new platform cannot fix fragmented accountability or conflicting incentives by itself.',
      takeaway: 'Structure, process, people, technology and measures must change as one system for transformation to endure, with cybersecurity embedded as a business-governance issue.',
    },
  },
  'professional-consulting-m5-7': {
    heading: 'Architects and strategists each need the other’s fluency',
    intro: 'Consulting work now spans management, cloud, AI, data, cyber, engineering, facilitation and change. A technology architect needs business tradeoffs, while a strategist needs to know data and AI limits.',
    spec: {
      layout: 'compare', title: '07 How Are Hybrid Business and Technology Skills Changing Teams?', kicker: '',
      leftTitle: 'Technology architect', rightTitle: 'Strategist',
      rows: [
        { label: 'Home strength', a: 'Technology design', b: 'Business strategy' },
        { label: 'Skill to add', a: 'Business literacy: tradeoffs', b: 'Technology fluency: data and AI limits' },
        { label: 'Shared need', a: 'Change leadership to make it stick', b: 'Change leadership and facilitation' },
      ],
      note: 'Vietnam: develop local hybrid skills, language, sector context, client communication and implementation leadership.',
      takeaway: 'Future consultants need domain depth and cross-functional fluency to connect strategy, technology and organizational behavior.',
    },
  },
  'professional-consulting-m5-8': {
    heading: 'Team capability builds from industry depth, data literacy and mixed staffing',
    intro: 'Future teams combine domain depth with cross-functional fluency across cloud, AI, data, cyber and engineering. Multidisciplinary staffing puts those profiles on the same engagement.',
    spec: {
      layout: 'driverTree', title: '08 How Are Productivity, Careers, and Talent Retention Evolving?', kicker: '',
      root: { label: 'Productive consulting team', detail: 'Connects strategy, technology and behaviour' },
      drivers: [
        { label: 'Industry depth', detail: 'Domain and sector context', children: [{ label: 'Sector context' }, { label: 'Language' }] },
        { label: 'Data literacy', detail: 'Understands data and AI limits', children: [{ label: 'Data' }, { label: 'AI' }] },
        { label: 'Multidisciplinary staffing', detail: 'Mixed profiles on one team', children: [{ label: 'Cloud and cyber' }, { label: 'Engineering' }, { label: 'Facilitation and change' }] },
      ],
      note: 'Vietnam: develop local hybrid skills, language, sector context, client communication and implementation leadership.',
      takeaway: 'Future consultants need domain depth and cross-functional fluency to connect strategy, technology and organizational behavior.',
    },
  },
  'professional-consulting-m5-9': {
    heading: 'Time freed by AI must be reinvested in learning to keep careers and retention healthy',
    intro: 'AI, project mix, training, mentoring, utilization and career architecture shape future consulting talent. Reducing junior drafting can free time but needs new ways to develop analysis and client skills.',
    spec: {
      layout: 'pathway', title: '09 How Are Remote, Platform, and Ecosystem Delivery Models Developing?', kicker: '',
      trunk: [
        { label: 'AI-augmented role', detail: 'Less junior drafting' },
        { label: 'Freed capacity', detail: 'Time that workforce planning must assign' },
      ],
      optionsLabel: 'Ways to rebuild learning pathways — combine, not steps',
      options: [
        { label: 'Mentoring', detail: 'Develops judgment and client skills' },
        { label: 'Technical training', detail: 'Builds specialist depth' },
        { label: 'Certification', detail: 'Recognises skills' },
        { label: 'Project variety', detail: 'Broadens experience' },
      ],
      afterLabel: 'Result',
      after: [
        { label: 'Career path and retention', detail: 'Fair workload and wellbeing sustain productivity', kind: 'outcome' },
      ],
      takeaway: 'Productivity is unsustainable if automation removes learning pathways or workload erodes judgment and retention.',
    },
  },
  'professional-consulting-m5-10': {
    heading: 'Vietnam’s e-transaction, personal-data and cybersecurity laws and when each applies',
    intro: 'Regulatory, ethical, cyber, data and environmental considerations now shape consulting and client solutions. The chapter’s sources record when each law took effect.',
    spec: {
      layout: 'timeline', title: '10 How Are Responsible AI, Data, and Cyber Rules Changing Consulting?', kicker: '',
      events: [
        { period: '1 July 2024', label: 'Law on Electronic Transactions', detail: 'No. 20/2023/QH15 took effect', status: 'historical' },
        { period: '1 January 2026', label: 'Law on Personal Data Protection', detail: 'No. 91/2025/QH15 effective', status: 'current' },
        { period: '1 July 2026', label: 'Cybersecurity Law', detail: 'No. 116/2025/QH15 effective', status: 'current' },
        { period: 'Now', label: 'Map rules to project controls', detail: 'Human oversight, security and sustainability requirements', status: 'current' },
      ],
      note: 'OECD AI principles call for human oversight, transparency, robustness, traceability, accountability and systematic risk management. Applicability depends on organization, service, data and current guidance.',
      takeaway: 'Technology and sustainability claims require lifecycle governance, evidence and accountable decisions rather than policy slogans.',
    },
  },
  'professional-consulting-m5-11': {
    heading: 'Transparency, confidentiality, IP and accountability each need a named project control',
    intro: 'Ethical, data and IP considerations apply to consulting work as well as to client solutions. OECD principles call for transparency, traceability and accountability.',
    spec: {
      layout: 'table', title: '11 How Do Ethics, Confidentiality, IP, and Professional Accountability Matter?', kicker: '',
      headers: ['Obligation', 'What it protects', 'Project control'],
      rows: [
        { label: 'Transparency', a: 'How advice and AI outputs were produced', b: 'Traceable sources and methods' },
        { label: 'Confidentiality', a: 'Client and personal data', b: 'Data requirements mapped to controls' },
        { label: 'IP', a: 'Client and firm intellectual property', b: 'Agreed ownership and use' },
        { label: 'Accountability', a: 'Professional decisions', b: 'Named people review and answer for them' },
      ],
      note: 'Map personal-data, cybersecurity, electronic-transaction, sector and environmental requirements to project controls.',
      takeaway: 'Technology and sustainability claims require lifecycle governance, evidence and accountable decisions rather than policy slogans.',
    },
  },
  'professional-consulting-m5-12': {
    heading: 'A governed claim carries evidence where a policy slogan carries none',
    intro: 'Sustainability, privacy and bias claims in client solutions face growing evidence requirements. The chapter contrasts policy slogans with lifecycle governance and accountable decisions.',
    spec: {
      layout: 'compare', title: '12 How Are Sustainability and Evidence Requirements Shaping Engagements?', kicker: '',
      leftTitle: 'Policy slogan', rightTitle: 'Governed, evidenced claim',
      rows: [
        { label: 'Sustainability claim', a: 'Stated in policy', b: 'Evidence across the lifecycle' },
        { label: 'Privacy', a: 'Assumed compliant', b: 'Personal-data requirements mapped to controls' },
        { label: 'Bias', a: 'Not examined', b: 'Systematic risk management' },
        { label: 'Decision', a: 'Diffuse responsibility', b: 'Accountable decision owner' },
      ],
      takeaway: 'Technology and sustainability claims require lifecycle governance, evidence and accountable decisions rather than policy slogans.',
    },
  },
  'professional-consulting-m5-13': {
    heading: 'Growth areas sit where business, technology and organizational gaps overlap',
    intro: 'Emerging client needs span AI, cloud, cyber, data, operations, workforce and sector-specific transformation. A focused AI workflow program can combine process redesign, data, governance, integration, learning and benefit tracking.',
    spec: {
      layout: 'taxonomy', title: '13 Where Are the Main Consulting Growth Opportunities?', kicker: '',
      root: 'Consulting growth opportunities', rootDetail: 'Service areas, not a sequence',
      groups: [
        { label: 'AI transformation', detail: 'Workflow redesign with data and governance' },
        { label: 'Cyber resilience', detail: 'Security and recovery capability' },
        { label: 'Enterprise modernization', detail: 'Cloud, data and integration' },
        { label: 'Operational excellence', detail: 'Process and operations improvement' },
        { label: 'Organization transformation', detail: 'Workforce and structure change' },
        { label: 'Industry solution', detail: 'Sector-specific transformation' },
      ],
      note: 'Vietnam: prioritize needs with funded sponsors, usable data, internal owners, legal feasibility and a scalable business case.',
      takeaway: 'The strongest growth areas combine complex business, technology and organizational capability gaps where credible expertise can create measurable outcomes.',
    },
  },
  'professional-consulting-m5-14': {
    heading: 'Firm strategy works only when position, talent, technology and delivery align',
    intro: 'Firms are investing in capabilities, methods, AI workflows, commercial models and professional standards. Isolated AI tools create less advantage than a governed workflow with proprietary knowledge and measurable quality.',
    spec: {
      layout: 'driverTree', title: '14 What Strategic Priorities Should Consulting Firms Pursue?', kicker: '',
      root: { label: 'Sustainable adaptation', detail: 'Alignment across the firm' },
      drivers: [
        { label: 'Specialist differentiation', detail: 'Market position' },
        { label: 'Talent transformation', detail: 'Trusted, skilled people' },
        { label: 'AI-enabled operating model', detail: 'Governed workflows', children: [{ label: 'Knowledge IP' }, { label: 'Technology governance' }] },
        { label: 'Outcome delivery', detail: 'Pricing, quality and measurable results' },
      ],
      note: 'Vietnam: build capabilities in service areas with local demand, trusted talent, secure delivery and repeatable economics.',
      takeaway: 'Sustainable adaptation requires alignment among market position, talent, technology, pricing, quality and delivery.',
    },
  },
  'professional-consulting-m5-15': {
    heading: 'Several overlapping scenarios, each with a signal leaders can watch',
    intro: 'The industry’s future is shaped by AI access, client maturity, internal capability, regulation and problem complexity. Routine research may commoditize while cross-functional transformation and technical specialist work expand.',
    spec: {
      layout: 'table', title: '15 What Long-Term Industry Scenarios Should Leaders Plan For?', kicker: '',
      headers: ['Scenario', 'What it means', 'Signal to monitor'],
      rows: [
        { label: 'AI productivity', a: 'Productivity gains from AI access', b: 'AI adoption' },
        { label: 'Commoditization', a: 'Pressure on routine, standardized work', b: 'Pricing' },
        { label: 'Integrated transformation', a: 'Cross-functional programs expand', b: 'Procurement' },
        { label: 'Specialist growth', a: 'Technical specialist work expands', b: 'Talent' },
        { label: 'Hybrid team', a: 'Stronger internal client capability', b: 'Client insourcing' },
        { label: 'Outcome competition', a: 'Firms compete on accountable outcomes', b: 'Outcome evidence' },
      ],
      note: 'Scenarios overlap; plan with several rather than one forecast.',
      takeaway: 'The future will combine productivity gains with pressure on standardized work, rewarding expertise, integration, trust and accountable outcomes.',
    },
  },
};
