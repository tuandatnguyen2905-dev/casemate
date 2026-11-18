import type { AuditAssuranceChapterVisual } from './auditAssuranceVisualSpecs';

/** Chapter-specific Learning Visuals for Audit & Assurance Module 04, keyed by visualKind. */
export const AUDIT_ASSURANCE_M4_VISUALS: Record<string, AuditAssuranceChapterVisual> = {
  'professional-audit-m4-1': {
    heading: 'Three competitor types compete on reach, local context and delivery model',
    intro: 'Competitors differ in geographic reach, client segments, technical depth, cost structures, authorizations and delivery models. Global networks may coordinate complex groups, while others compete through depth and local context.',
    spec: {
      layout: 'taxonomy', title: '01 How Competitive Is Audit & Assurance?', kicker: '',
      root: 'Competitor types', rootDetail: 'Categories compared per engagement — not a ranking',
      groups: [
        { label: 'Global network', detail: 'May coordinate complex groups' },
        { label: 'Local practice', detail: 'Senior attention and local context' },
        { label: 'Technology-enabled firm', detail: 'Competes through its delivery model' },
      ],
      note: 'Compare firms only within engagements they are authorized, independent, competent and sufficiently resourced to perform.',
      takeaway: 'Market position depends on reliable fit with a defined client and engagement—not firm size or brand recognition alone.',
    },
  },
  'professional-audit-m4-2': {
    heading: 'Competitive forces act on each engagement, not on the audit market as a whole',
    intro: 'Applied to audit, rivalry, client choice and entry conditions differ by engagement because firms differ in reach, technical depth, authorizations and delivery models.',
    spec: {
      layout: 'ecosystem', title: "02 How Do Porter's Five Forces Apply to Audit Firms?", kicker: '',
      center: { label: 'Competition for one engagement', detail: 'Won on reliable fit with the client' },
      actors: [
        { label: 'Mid-tier networks', relation: 'Rival through reach and coordination', flows: ['service'] },
        { label: 'Specialist assurance firms', relation: 'Rival through depth and senior attention', flows: ['service'] },
        { label: 'Global networks', relation: 'Rival on complex group coordination', flows: ['service'] },
        { label: 'Clients', relation: 'Choose on fit, not brand alone', flows: ['money'] },
        { label: 'Authorization rules', relation: 'Limit who can enter each engagement', flows: ['oversight'] },
      ],
      note: 'Run the forces analysis per client segment and engagement type; the answer changes with authorization and technical depth.',
      takeaway: 'Market position depends on reliable fit with a defined client and engagement—not firm size or brand recognition alone.',
    },
  },
  'professional-audit-m4-3': {
    heading: 'Licensing, independence, capability and capacity together set the entry barrier',
    intro: 'A firm can compete for an engagement only if it is authorized, independent, competent and sufficiently resourced to perform it. A national firm with a strong sector practice can meet that test.',
    spec: {
      layout: 'driverTree', title: '03 What Creates Licensing, Trust and Capability Barriers?', kicker: '',
      root: { label: 'Barrier to a given engagement', detail: 'All conditions must hold' },
      drivers: [
        { label: 'Licensing', detail: 'Authorized to perform the service' },
        { label: 'Trust', detail: 'Independent of the client', children: [{ label: 'Independence' }, { label: 'Reliable fit' }] },
        { label: 'Capability', detail: 'Competent for the work', children: [{ label: 'Sector practice' }, { label: 'Technical depth' }] },
        { label: 'Capacity', detail: 'Sufficiently resourced to deliver' },
      ],
      note: 'Size or brand recognition alone does not clear these barriers.',
      takeaway: 'Market position depends on reliable fit with a defined client and engagement—not firm size or brand recognition alone.',
    },
  },
  'professional-audit-m4-4': {
    heading: 'Quality management runs as a cycle that earns and renews client confidence',
    intro: 'Quality management covers firm and engagement systems for achieving quality objectives, identifying risks, implementing responses, monitoring and remediation. IAASB standards stress proactive monitoring and root causes.',
    spec: {
      layout: 'flow', title: '04 Who Are the Major Global Audit Network Types?', kicker: '',
      steps: [
        { label: 'Set quality objectives', detail: 'Firm and engagement level' },
        { label: 'Identify quality risks', detail: 'What could prevent the objectives' },
        { label: 'Implement responses', detail: 'Policies put into practice' },
        { label: 'Monitor', detail: 'Proactively, not by policy documents alone' },
        { label: 'Remediate root causes', detail: 'Timely and evidenced' },
        { label: 'Client confidence', kind: 'outcome', detail: 'Sustained by evidence of quality' },
      ],
      loop: 'Remediation findings feed the next round of objectives and risks.',
      takeaway: 'Reputation is accumulated professional performance and ethics; it must be sustained through evidence of quality and effective remediation.',
    },
  },
  'professional-audit-m4-5': {
    heading: 'Every firm type is judged on the same expertise and integrity evidence',
    intro: 'Big Four, mid-tier, specialist and local firms are categories, not a quality ranking. Assess each on current licensing, quality controls, relevant experience, delivery capacity and independence.',
    spec: {
      layout: 'taxonomy', title: '05 How Do Big Four, Mid-Tier, Specialist and Local Firms Differ?', kicker: '',
      root: 'Evidence to assess any firm type', rootDetail: 'Same criteria for every type — not historical prestige',
      groups: [
        { label: 'Technical expertise', items: ['Relevant experience', 'Quality controls', 'Delivery capacity'] },
        { label: 'Professional integrity', items: ['Independence', 'Ethics', 'Effective remediation'] },
        { label: 'Standing to act', items: ['Current licensing', 'Inspection or regulatory context'] },
      ],
      note: 'Firm types named in the chapter: Big Four, mid-tier, specialist and local firms.',
      takeaway: 'Reputation is accumulated professional performance and ethics; it must be sustained through evidence of quality and effective remediation.',
    },
  },
  'professional-audit-m4-6': {
    heading: 'A firm’s reputation is shaped by regulators, clients, stakeholders and standards',
    intro: 'Quality, technical, regulatory, ethical and delivery signals shape client, regulator and stakeholder confidence. How a firm responds to inspection is one of the strongest signals.',
    spec: {
      layout: 'ecosystem', title: "06 Which Firms and Institutions Shape Vietnam's Audit Market?", kicker: '',
      center: { label: 'Audit firm', detail: 'Reputation = accumulated performance and ethics' },
      actors: [
        { label: 'Regulators and inspectors', relation: 'Inspect and set the licensing context', flows: ['oversight'] },
        { label: 'Clients', relation: 'Engage firms on evidence of quality', flows: ['money', 'service'] },
        { label: 'Other stakeholders', relation: 'Read quality and ethical signals', flows: ['information'] },
        { label: 'IAASB quality standards', relation: 'Expect monitoring, root causes and remediation', flows: ['oversight'] },
      ],
      note: 'Assess current licensing, quality controls, relevant experience, inspection or regulatory context, delivery capacity and independence—not historical prestige alone.',
      takeaway: 'Reputation is accumulated professional performance and ethics; it must be sustained through evidence of quality and effective remediation.',
    },
  },
  'professional-audit-m4-7': {
    heading: 'Benchmark firms on talent depth and continuity, not headcount',
    intro: 'Firms compete for accounting, audit, technology, valuation, sustainability and sector expertise across career stages. A firm can grow headcount while weakening quality.',
    spec: {
      layout: 'table', title: '07 How Should Audit Firms Be Compared?', kicker: '',
      headers: ['Talent dimension', 'Benchmark evidence', 'Why headcount misses it'],
      rows: [
        { label: 'Qualification', a: 'Competence and qualifications', b: 'Numbers do not show competence' },
        { label: 'Retention', a: 'Staff continuity', b: 'Turnover repeats training and rework' },
        { label: 'Specialist development', a: 'Specialist depth', b: 'Generalist growth hides thin expertise' },
        { label: 'Knowledge sharing', a: 'Coaching and technical development', b: 'Development must keep pace with growth' },
        { label: 'Workforce planning', a: 'Workload and review capacity', b: 'Supervision can fall behind hiring' },
      ],
      note: 'Graduate recruitment adds capacity only when supervision and development keep pace.',
      takeaway: 'Talent is both productive capacity and a determinant of quality; experienced continuity can reduce repeated training and rework.',
    },
  },
  'professional-audit-m4-8': {
    heading: 'Each technology capability adds something different — and needs its own controls',
    intro: 'Analytics, AI and secure collaboration can be sources of quality, consistency, speed and risk. IAASB guidance highlights tool fitness, monitoring, output evaluation and confidentiality.',
    spec: {
      layout: 'table', title: '08 How Do Talent, Sector Expertise, Methodology and Technology Differ?', kicker: '',
      headers: ['Capability', 'What it can add', 'Governance it needs'],
      rows: [
        { label: 'Audit analytics', a: 'Quality and consistency of evidence work', b: 'Output evaluation and skepticism' },
        { label: 'AI-assisted analysis', a: 'Speed on meaningful evidence problems', b: 'Tool fitness, monitoring, human review' },
        { label: 'Secure collaboration', a: 'Shared evidence across team and client', b: 'Confidentiality and data protection' },
        { label: 'Productivity', a: 'Faster workflow', b: 'Documentation and training' },
      ],
      takeaway: 'Technology advantage comes from solving meaningful evidence and workflow problems under governance—not adopting tools for their own sake.',
    },
  },
  'professional-audit-m4-9': {
    heading: 'A tool must pass testing and governance before it scales across engagements',
    intro: 'Before scaling a tool, test accuracy, completeness, access, localization, data protection, system integration and human review.',
    spec: {
      layout: 'flow', title: '09 How Should Audit Quality and Financial Performance Be Benchmarked?', kicker: '',
      steps: [
        { label: 'Define the problem', detail: 'A real evidence or workflow need' },
        { label: 'Test accuracy and completeness', detail: 'Of outputs and digital evidence' },
        { label: 'Check access and data protection', detail: 'Including localization' },
        { label: 'Integrate with human review', detail: 'System integration and reviewer checks' },
        { label: 'Govern and monitor', detail: 'Documentation, training, monitoring' },
        { label: 'Scale workflow automation', kind: 'outcome', detail: 'Only after the checks pass' },
      ],
      note: 'Benchmark technology by the evidence problems it solves under governance, not by the number of tools adopted.',
      takeaway: 'Technology advantage comes from solving meaningful evidence and workflow problems under governance—not adopting tools for their own sake.',
    },
  },
  'professional-audit-m4-10': {
    heading: 'Local statutory work and group instructions run in parallel on one client',
    intro: 'Local statutory reporting and overseas group instructions can create parallel deadlines, frameworks and evidence requirements. Domestic firms need regulatory readiness and framework coordination to serve both.',
    spec: {
      layout: 'compare', title: '10 Why Do Independence, Expertise and Professional Skepticism Matter?', kicker: '',
      leftTitle: 'Local statutory reporting', rightTitle: 'Overseas group instructions',
      rows: [
        { label: 'Framework', a: 'Vietnamese requirements', b: 'Group reporting framework' },
        { label: 'Deadline', a: 'Local statutory deadline', b: 'Group reporting deadline' },
        { label: 'Evidence', a: 'Meets local requirements', b: 'Meets group instructions' },
        { label: 'Firm capability', a: 'Regulatory readiness', b: 'Framework coordination' },
      ],
      note: 'ISA 600 (Revised) covers group audits; local adoption and requirements still apply.',
      takeaway: 'Vietnam rewards local regulatory expertise and reliable execution combined, where needed, with international coordination.',
    },
  },
  'professional-audit-m4-11': {
    heading: 'Compete for a mandate only when authorizations, skills and staffing all fit',
    intro: 'International networks, domestic firms and smaller practices compete across client segments. Each should compete only where authorizations, standards, independence, competence, language, technology and staffing fit the mandate.',
    spec: {
      layout: 'decision', title: '11 How Do Methodology, Evidence and Quality Management Create Trust?', kicker: '',
      root: { label: 'Candidate mandate', detail: 'Statutory, FDI, listed, group or local client' },
      question: 'Do authorizations, independence, competence, language, technology and staffing fit?',
      branches: [
        { condition: 'All fit locally', outcome: 'Compete for the mandate', tone: 'positive' },
        { condition: 'Needs international coordination', outcome: 'Compete with network support', detail: 'Where an international network adds coordination', tone: 'caution' },
        { condition: 'Staffing or independence gap', outcome: 'Do not compete', detail: 'Talent competition can leave teams short', tone: 'negative' },
      ],
      takeaway: 'Vietnam rewards local regulatory expertise and reliable execution combined, where needed, with international coordination.',
    },
  },
  'professional-audit-m4-12': {
    heading: 'Vietnam’s audit demand splits into five client segments with different needs',
    intro: 'Competition among international networks, domestic firms and smaller practices runs across statutory, FDI, listed, group and local client segments.',
    spec: {
      layout: 'taxonomy', title: '12 How Do Talent, Technology and Client Governance Support Sustainable Growth?', kicker: '',
      root: 'Client segments', rootDetail: 'Segments, not stages — firms choose where to grow',
      groups: [
        { label: 'Statutory', detail: 'Local statutory reporting' },
        { label: 'FDI', detail: 'Local and overseas requirements together' },
        { label: 'Listed', detail: 'Listed-entity work' },
        { label: 'Group', detail: 'Parallel frameworks and deadlines' },
        { label: 'Local', detail: 'Served by domestic firms and smaller practices' },
      ],
      note: 'Talent and digital delivery support sustainable growth only in segments where the firm’s authorizations and staffing fit.',
      takeaway: 'Vietnam rewards local regulatory expertise and reliable execution combined, where needed, with international coordination.',
    },
  },
  'professional-audit-m4-13': {
    heading: 'Weakness appears where fee pressure, independence risk or findings erode quality',
    intro: 'Quality, people, technology, legal, client and reputation risks interact. Concentrated clients can amplify pressure on staffing and evidence.',
    spec: {
      layout: 'driverTree', title: "13 What Are the Industry's Main Strengths and Weaknesses?", kicker: '',
      root: { label: 'Core vulnerability', detail: 'Commercial pressure weakening quality' },
      drivers: [
        { label: 'Fee pressure', detail: 'Squeezes delivery', children: [{ label: 'Thinner staffing' }, { label: 'Reduced evidence' }] },
        { label: 'Independence risk', detail: 'Pressure from important clients', children: [{ label: 'Concentrated clients' }] },
        { label: 'Regulatory finding', detail: 'Makes weaknesses visible', children: [{ label: 'Inspection results' }, { label: 'Reputation risk' }] },
      ],
      note: 'Strength rests on keeping quality, independence, staffing and evidence intact under these pressures.',
      takeaway: 'The most serious vulnerability appears when commercial pressure weakens quality, independence, staffing or evidence.',
    },
  },
  'professional-audit-m4-14': {
    heading: 'Talent, litigation and resilience threats each need a named response',
    intro: 'Staff turnover can increase review effort, while system failures can disrupt evidence. Firms integrate acceptance, capacity, insurance, cyber controls and continuity planning.',
    spec: {
      layout: 'table', title: '14 What Opportunities and Threats Shape Audit and Assurance?', kicker: '',
      headers: ['Threat', 'How it shows up', 'Response to integrate'],
      rows: [
        { label: 'Talent shortage', a: 'Turnover increases review effort', b: 'Capacity planning and quality indicators' },
        { label: 'Litigation', a: 'Legal and liability exposure', b: 'Acceptance discipline and insurance' },
        { label: 'Operational resilience', a: 'System failures disrupt evidence', b: 'Cyber controls and continuity planning' },
      ],
      takeaway: 'The most serious vulnerability appears when commercial pressure weakens quality, independence, staffing or evidence.',
    },
  },
  'professional-audit-m4-15': {
    heading: 'Client concentration and cyber incidents threaten the firm in different ways',
    intro: 'Concentrated clients can amplify commercial pressure, while system failures can disrupt evidence. Each needs its own controls in the firm’s strategy.',
    spec: {
      layout: 'compare', title: '15 What Strategic Choices Must Audit Firms Make?', kicker: '',
      leftTitle: 'Client concentration', rightTitle: 'Cyber incident',
      rows: [
        { label: 'What it threatens', a: 'Independence and quality under pressure', b: 'Evidence and system availability' },
        { label: 'Early signal', a: 'Dependence and collection pressure', b: 'System failures' },
        { label: 'Control response', a: 'Acceptance and independence review', b: 'Cyber controls and continuity planning' },
        { label: 'Backstop', a: 'Quality indicators', b: 'Insurance' },
      ],
      takeaway: 'The most serious vulnerability appears when commercial pressure weakens quality, independence, staffing or evidence.',
    },
  },
};
