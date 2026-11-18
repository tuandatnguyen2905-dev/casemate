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
    heading: 'Network types differ in how closely member firms are tied together',
    intro: 'Large global and mid-tier networks link member firms through a shared brand, methodology and quality requirements, while looser associations cooperate with less common control. Member firms remain separate legal entities.',
    spec: {
      layout: 'taxonomy', title: '04 Who Are the Major Global Audit Network Types?', kicker: '',
      root: 'Audit network types', rootDetail: 'How a firm is connected to others, not a quality ranking',
      groups: [
        { label: 'Global network', detail: 'Shared brand, methodology and quality requirements; can coordinate multinational groups' },
        { label: 'Mid-tier network', detail: 'Narrower reach; member firms still share methods' },
        { label: 'Association of independent firms', detail: 'Looser cooperation on referrals and standards' },
      ],
      note: 'Under ISQM 1 a firm’s quality management must address network requirements, and the IESBA Code can extend independence requirements to network firms.',
      takeaway: 'Network membership can add reach and a common method, but it does not remove each firm’s own responsibility for engagement quality and independence.',
    },
  },
  'professional-audit-m4-5': {
    heading: 'Firm types are categories of positioning, not rungs of a quality ladder',
    intro: 'Big Four, mid-tier, specialist and local firms differ in reach, depth and attention. Which suits an engagement depends on its entity, complexity and location, and on the competence and independence it requires.',
    spec: {
      layout: 'taxonomy', title: '05 How Do Big Four, Mid-Tier, Specialist and Local Firms Differ?', kicker: '',
      root: 'Firm types', rootDetail: 'Categories of positioning, compared per engagement',
      groups: [
        { label: 'Big Four', detail: 'Largest global networks; can coordinate complex multinational groups' },
        { label: 'Mid-tier firm', detail: 'Between the largest networks and local practices' },
        { label: 'Specialist firm', detail: 'Depth in a sector or service, with senior attention' },
        { label: 'Local firm', detail: 'Local context and attention' },
      ],
      note: 'Compare any type on engagement fit: authorized, independent, competent and resourced for this engagement.',
      takeaway: 'Choose and compare firms by fit for a defined engagement, not by size or brand.',
    },
  },
  'professional-audit-m4-6': {
    heading: 'Vietnam’s audit market is shaped by three kinds of firm and a legal framework that is adopted, not assumed',
    intro: 'International networks, domestic firms and smaller practices compete across statutory, foreign-invested, listed, group and local segments, inside the framework set by Vietnamese law and standards.',
    spec: {
      layout: 'ecosystem', title: "06 Which Firms and Institutions Shape Vietnam's Audit Market?", kicker: '',
      center: { label: 'Audit engagement in Vietnam', detail: 'Shaped by firms and by the legal framework' },
      actors: [
        { label: 'International networks', relation: 'Bring reach and common methods; local requirements still apply', flows: ['service'] },
        { label: 'Domestic firms and smaller practices', relation: 'Compete on local knowledge and regulatory readiness', flows: ['service'] },
        { label: 'Law on Independent Audit (No. 67/2011/QH12)', relation: 'Sets conditions for practising; partially effective, so verify status', flows: ['oversight'] },
        { label: 'Circular 214/2012/TT-BTC', relation: 'Vietnam Auditing Standards; check later amendments', flows: ['oversight'] },
        { label: 'IAASB and IESBA', relation: 'Influence Vietnam only through adoption', flows: ['information'] },
      ],
      note: 'Which authority performs each licensing, supervisory or standard-setting role must be verified from current official sources.',
      takeaway: 'Institutions shape who may audit what and by which standards; international standards matter only to the extent they are adopted.',
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
    heading: 'Users cannot see the audit work, so they trust an objective, competent and critical auditor',
    intro: 'Independence, expertise and professional skepticism each protect a different part of the conclusion. If one fails, the others cannot make up for it.',
    spec: {
      layout: 'table', title: '10 Why Do Independence, Expertise and Professional Skepticism Matter?', kicker: '',
      headers: ['Attribute', 'What it gives users', 'How a failure shows'],
      rows: [
        { label: 'Independence', a: 'Judgment that is not compromised and not seen to be', b: 'A close financial relationship or fee dependence' },
        { label: 'Technical and sector expertise', a: 'Recognition of where misstatement could arise', b: 'An unusual estimate is not recognized' },
        { label: 'Professional skepticism', a: 'Critical assessment of evidence and explanations', b: 'Management’s explanation accepted without corroboration' },
      ],
      note: 'The IESBA Code treats independence as a condition of credible assurance. Verify local adoption in Vietnam.',
      takeaway: 'A failure in any one of the three weakens audit quality and reputation together.',
    },
  },
  'professional-audit-m4-11': {
    heading: 'A consistent method, documented evidence and quality management make quality visible',
    intro: 'Trust rests on things users and regulators can see are in place: a risk-based method, sufficient appropriate evidence with documentation, and firm-level quality management that monitors and remediates.',
    spec: {
      layout: 'flow', title: '11 How Do Methodology, Evidence and Quality Management Create Trust?', kicker: '',
      steps: [
        { label: 'Risk-based methodology', detail: 'Directs work to where misstatement is most likely' },
        { label: 'Sufficient appropriate evidence', detail: 'Relevant and reliable enough to support the conclusion' },
        { label: 'Audit documentation', detail: 'Records how the conclusion was reached' },
        { label: 'Firm quality management', detail: 'Objectives, risks and responses under ISQM 1' },
        { label: 'Monitor and remediate root causes', detail: 'Proactively, not by policy documents alone' },
        { label: 'Confidence of clients and regulators', kind: 'outcome', detail: 'Sustained by evidence of quality' },
      ],
      loop: 'Remediation findings feed the next round of objectives and risks.',
      takeaway: 'Reputation is sustained by evidence of quality, meaning a consistent method, documented evidence and effective remediation, not by policy documents alone.',
    },
  },
  'professional-audit-m4-12': {
    heading: 'Growth is sustainable when talent, technology and client governance expand together',
    intro: 'Talent gives the capacity to staff and supervise, governed technology adds productivity, and client governance decides which work is taken on. Growth that outpaces any of them shows first as thinner supervision, less evidence or weaker independence.',
    spec: {
      layout: 'driverTree', title: '12 How Do Talent, Technology and Client Governance Support Sustainable Growth?', kicker: '',
      root: { label: 'Sustainable growth', detail: 'Add work only as fast as quality can be maintained' },
      drivers: [
        { label: 'Talent pipeline', detail: 'Capacity to staff and supervise', children: [{ label: 'Recruitment and development' }, { label: 'Retention' }] },
        { label: 'Governed technology', detail: 'Productivity only if fit for purpose', children: [{ label: 'Tool validation' }, { label: 'Human review' }] },
        { label: 'Client governance', detail: 'Which work is taken on', children: [{ label: 'Acceptance and continuance' }, { label: 'Concentration and fee pressure' }] },
      ],
      note: 'Strength in one driver does not offset a gap in another.',
      takeaway: 'Growth is sustainable when talent, technology and client governance expand together.',
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
