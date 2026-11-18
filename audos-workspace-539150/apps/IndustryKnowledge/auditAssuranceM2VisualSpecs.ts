import type { AuditAssuranceChapterVisual } from './auditAssuranceVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Audit & Assurance Module 02, keyed by visualKind. */
export const AUDIT_ASSURANCE_M2_VISUALS: Record<string, AuditAssuranceChapterVisual> = {
  'professional-audit-m2-1': {
    heading: 'An external audit runs from acceptance to reporting, with quality monitoring around it',
    intro: 'The engagement progresses from request through acceptance, planning, risk, procedures, evaluation, review and reporting. ISQM 1, ISA 220 and ISQM 2 connect firm quality systems, engagement leadership and engagement quality review.',
    spec: {
      layout: 'flow', title: '01 How Does an External Audit Engagement Work?', kicker: '',
      steps: [
        { label: 'Acceptance', detail: 'Decide whether to take the engagement', owner: 'Firm' },
        { label: 'Planning and risk', detail: 'Strategy, materiality and risk assessment', owner: 'Engagement team' },
        { label: 'Procedures and evidence', detail: 'Obtain evidence responsive to risks', owner: 'Engagement team' },
        { label: 'Evaluation and review', detail: 'Leadership and engagement quality review', kind: 'decision', owner: 'Engagement leader (ISA 220)' },
        { label: 'Reporting', detail: 'Issue the supported conclusion', kind: 'outcome', owner: 'Engagement leader' },
      ],
      loop: 'Quality monitoring under the firm system (ISQM 1) feeds lessons back into future acceptance and planning.',
      note: 'Map accountable owners, applicable standards, evidence, reviews, communications, reporting and retention before fieldwork begins.',
      takeaway: 'Audit quality results from a connected lifecycle; weakness at acceptance, risk assessment, evidence or review can undermine the final conclusion.',
    },
  },
  'professional-audit-m2-2': {
    heading: 'Several accountable roles surround one engagement, each with its own quality duty',
    intro: 'The firm quality system, engagement leadership and engagement quality review each have a defined role in planning, evaluation and monitoring.',
    spec: {
      layout: 'ecosystem', title: '02 Who Participates in the Audit Engagement Lifecycle?', kicker: '',
      center: { label: 'Audit engagement', detail: 'Planning through reporting' },
      actors: [
        { label: 'Firm quality system', relation: 'Sets and monitors quality responses (ISQM 1)', flows: ['oversight'] },
        { label: 'Engagement leader', relation: 'Directs planning and evaluation (ISA 220)', flows: ['service'] },
        { label: 'Engagement team', relation: 'Performs procedures and gathers evidence', flows: ['information'] },
        { label: 'Engagement quality reviewer', relation: 'Reviews significant judgments (ISQM 2)', flows: ['oversight'] },
        { label: 'Client management', relation: 'Provides information; keeps responsibility for statements', flows: ['information'] },
        { label: 'Intended users', relation: 'Receive the report', flows: ['information'] },
      ],
      note: 'Map accountable owners, reviews and communications before fieldwork begins.',
      takeaway: 'Audit quality results from a connected lifecycle; weakness at planning, evaluation or monitoring can undermine the final conclusion.',
    },
  },
  'professional-audit-m2-3': {
    heading: 'The final conclusion is only as strong as the weakest link before it',
    intro: 'Information, evidence, decisions and risk pass through acceptance, risk assessment, evidence gathering and review. A weakness at any point can undermine the conclusion.',
    spec: {
      layout: 'driverTree', title: '03 How Do Information, Evidence, Decisions and Risk Flow?', kicker: '',
      root: { label: 'Supportable final conclusion', detail: 'Depends on every earlier stage' },
      formula: 'A weak link anywhere weakens the conclusion',
      drivers: [
        { label: 'Acceptance', detail: 'Suitable scope and capability' },
        { label: 'Risk assessment', detail: 'Where misstatement may arise', children: [{ label: 'Entity information' }, { label: 'Planned responses' }] },
        { label: 'Evidence', detail: 'Sufficient and appropriate for the risk' },
        { label: 'Review', detail: 'Leadership and engagement quality review', children: [{ label: 'Challenge judgments' }, { label: 'Confirm support' }] },
      ],
      note: 'Map evidence, reviews and communications before fieldwork begins so each decision has an accountable owner.',
      takeaway: 'Audit quality results from a connected lifecycle; weakness at acceptance, risk assessment, evidence or review can undermine the final conclusion.',
    },
  },
  'professional-audit-m2-4': {
    heading: 'Acceptance depends on independence, capability and a workable timeline',
    intro: 'Ethical and conflict checks, management integrity, engagement terms, materiality, team and specialist assignment and schedule coordination come before accepting. IESBA standards address relationships, fees and non-assurance services.',
    spec: {
      layout: 'decision', title: '04 How Are Clients Accepted and Independence Evaluated?', kicker: '',
      root: { label: 'Engagement request', detail: 'Before any work is agreed' },
      question: 'Is the firm eligible and independent, with the team, specialists and timeline to deliver?',
      branches: [
        { condition: 'All confirmed', outcome: 'Accept and agree terms', detail: 'Then set materiality and risk strategy', tone: 'positive' },
        { condition: 'Resolvable gap', outcome: 'Resolve before accepting', detail: 'e.g. specialists, scope or reporting deadline', tone: 'caution' },
        { condition: 'Independence or integrity concern', outcome: 'Do not accept', detail: 'Relationships, fees or non-assurance services', tone: 'negative' },
      ],
      note: 'Confirm eligibility, independence, client requirements, scope, responsibilities, framework, specialists, reporting deadlines and current standards.',
      takeaway: 'Good acceptance and planning improve effectiveness and resource allocation; unsuitable scope or insufficient capability creates delay, rework and evidence weakness.',
    },
  },
  'professional-audit-m2-5': {
    heading: 'Engagement terms and the risk plan are set in order before fieldwork',
    intro: 'Once client integrity is confirmed, the firm agrees terms, sets materiality and risk strategy, assigns the team and specialists, and coordinates the schedule.',
    spec: {
      layout: 'flow', title: '05 How Are Engagement Terms, Strategy and Audit Plans Defined?', kicker: '',
      steps: [
        { label: 'Confirm client integrity', detail: 'Management integrity and conflict checks', kind: 'decision' },
        { label: 'Agree engagement terms', detail: 'Scope, responsibilities and framework' },
        { label: 'Set the risk plan', detail: 'Materiality and risk strategy' },
        { label: 'Assign team and specialists', detail: 'Capability matched to risk' },
        { label: 'Coordinate the schedule', detail: 'Reporting deadlines agreed', kind: 'outcome' },
      ],
      note: 'Unsuitable scope or insufficient capability at this stage creates delay, rework and evidence weakness later.',
      takeaway: 'Good acceptance and planning improve effectiveness and resource allocation; unsuitable scope or insufficient capability creates delay, rework and evidence weakness.',
    },
  },
  'professional-audit-m2-6': {
    heading: 'Overall materiality comes from a benchmark; performance materiality is set below it',
    intro: 'Materiality guides planning, procedures and evaluation based on what could influence intended users. Move the hypothetical inputs to see how both amounts respond.',
    spec: {
      layout: 'scenario', title: '06 How Are Materiality and Performance Materiality Applied?', kicker: H,
      inputs: [
        { key: 'benchmark', label: 'Normalized profit (benchmark)', min: 20, max: 300, step: 10, value: 100, unit: 'VND bn' },
        { key: 'pct', label: 'Percentage applied to benchmark', min: 1, max: 10, step: 0.5, value: 5, unit: '%' },
        { key: 'pm', label: 'Performance materiality as share of overall', min: 50, max: 90, step: 5, value: 70, unit: '%' },
      ],
      outputs: [
        { label: 'Overall materiality', unit: 'VND bn', digits: 2, compute: (v) => v.benchmark * v.pct / 100 },
        { label: 'Performance materiality', unit: 'VND bn', digits: 2, compute: (v) => v.benchmark * v.pct / 100 * v.pm / 100 },
      ],
      assumption: `${H}. Defaults reproduce the chapter's illustration: 5% of VND100bn = VND5bn overall; VND3.5bn performance materiality as a stated risk judgment. Not a Vietnam requirement or universal rule.`,
      note: 'Neither amount is a permitted error allowance; qualitative matters can be material below either amount, and materiality is revised as accumulated misstatements are evaluated.',
      takeaway: 'Performance materiality is an engagement judgment set below overall materiality to reduce aggregation risk, not a universal rule or safe error amount.',
    },
  },
  'professional-audit-m2-7': {
    heading: 'Higher inherent or control risk must be offset by lower detection risk',
    intro: 'Risk assessment identifies where material misstatement may arise. The simplified planning model expresses Audit Risk = Inherent Risk × Control Risk × Detection Risk; it is not a literal company-wide probability calculation.',
    spec: {
      layout: 'driverTree', title: '07 How Are Risks of Material Misstatement Assessed?', kicker: '',
      root: { label: 'Audit risk', detail: 'Kept acceptably low' },
      formula: 'Audit Risk = Inherent Risk × Control Risk × Detection Risk (simplified planning model)',
      drivers: [
        {
          label: 'Risk of material misstatement', detail: 'Assessed by the auditor',
          children: [{ label: 'Inherent risk', detail: 'Susceptibility before controls' }, { label: 'Control risk', detail: 'Controls may not prevent or detect' }],
        },
        { label: 'Detection risk', op: '×', detail: 'Controlled through procedures', children: [{ label: 'Nature' }, { label: 'Timing' }, { label: 'Extent' }] },
      ],
      note: 'Audit risk differs from business, fraud and engagement risk. Example: a complex revenue estimate with weak controls can lead to more year-end testing, external evidence and specialist involvement.',
      takeaway: 'Higher assessed inherent or control risk generally requires lower acceptable detection risk through changed nature, timing or extent of procedures.',
    },
  },
  'professional-audit-m2-8': {
    heading: 'Each assessed risk leads to a chosen procedure, and documentation ties it back',
    intro: 'After understanding the entity and assessing risks, the auditor designs responses and obtains evidence. ISA 315 supports risk identification; ISA 500 requires sufficient appropriate evidence.',
    spec: {
      layout: 'pathway', title: '08 How Are Controls, Assertions and Audit Procedures Linked?', kicker: '',
      trunk: [
        { label: 'Understand the entity', detail: 'Business, systems and controls' },
        { label: 'Assess risks by assertion', detail: 'Where material misstatement may arise (ISA 315)' },
      ],
      optionsLabel: 'Responses chosen for the risk — alternatives or combinations',
      options: [
        { label: 'Control testing', detail: 'Do relevant controls operate?' },
        { label: 'External confirmation', detail: 'Evidence from outside the entity' },
        { label: 'Journal entry testing', detail: 'Targets unusual or manual entries' },
      ],
      afterLabel: 'Then',
      after: [{ label: 'Documentation', detail: 'Links evidence to assertions (ISA 500)', kind: 'outcome' }],
      note: 'Evaluate internal and external information, system reports, source reliability, completeness and contradictory evidence.',
      takeaway: 'Evidence must be sufficient and appropriate for the assessed risk; volume does not compensate for weak relevance or reliability.',
    },
  },
  'professional-audit-m2-9': {
    heading: 'Evidence is judged on relevance and reliability first, quantity second',
    intro: 'Auditors obtain evidence through inspection, observation, confirmation, recalculation, reperformance, inquiry and analytics. Quantity cannot compensate for poor relevance or reliability.',
    spec: {
      layout: 'table', title: '09 How Are Sampling, Evidence and Documentation Evaluated?', kicker: '',
      headers: ['Evaluation point', 'Question to ask', 'If it falls short'],
      rows: [
        { label: 'Evidence relevance', a: 'Does it address the assertion at risk?', b: 'Retarget testing' },
        { label: 'Evidence reliability', a: 'How trustworthy is the source?', b: 'Improve source reliability' },
        { label: 'Evidence quantity', a: 'Is there enough for the assessed risk?', b: 'Expand testing — volume alone is not enough' },
        { label: 'Sampling risk', a: 'Could the selection misrepresent the population?', b: 'Redesign for population characteristics' },
        { label: 'Contradictory evidence', a: 'Does anything conflict with the conclusion?', b: 'Resolve before concluding' },
        { label: 'Audit documentation', a: 'Is the professional judgment recorded?', b: 'Document why evidence supports the conclusion' },
      ],
      note: 'HYPOTHETICAL: when revenue risk rises because controls are weak, work may shift to year-end substantive procedures, external confirmations and targeted unusual transactions. No universal sample size follows from risk alone.',
      takeaway: 'Procedure design and sample selection require current standards, population characteristics and professional judgment.',
    },
  },
  'professional-audit-m2-10': {
    heading: 'Completion moves from forming the opinion to communication, the final file and follow-up',
    intro: 'Completion covers forming and issuing the report, communicating findings and independence matters, completing documentation and handling required subsequent activities.',
    spec: {
      layout: 'flow', title: '10 How Is an Audit Completed and Reviewed?', kicker: '',
      steps: [
        { label: 'Evaluate and review', detail: 'Is the evidence sufficient for the conclusion?', kind: 'decision' },
        { label: 'Form the audit opinion', detail: 'Unmodified or modified, plus required paragraphs' },
        { label: 'Communicate with management', detail: 'Findings and independence matters' },
        { label: 'Complete documentation', detail: 'Assemble the final file' },
        { label: 'Follow-up', detail: 'Required subsequent activities', kind: 'outcome' },
      ],
      note: 'Preserve management’s responsibility for statements and controls; follow-up should not transfer management decisions to the auditor.',
      takeaway: 'The report expresses a supported conclusion in context; it is not a guarantee of future viability or absence of all fraud.',
    },
  },
  'professional-audit-m2-11': {
    heading: 'The opinion type follows from whether a matter is material and whether it is pervasive',
    intro: 'Reporting outcomes depend on the matter, materiality, pervasiveness and evidence. An Emphasis of Matter draws attention to an appropriately presented matter and is not automatically a modified opinion.',
    spec: {
      layout: 'decision', title: '11 How Are Audit Opinions and Other Report Elements Distinguished?', kicker: '',
      root: { label: 'Evaluated evidence and misstatements', detail: 'At the end of the audit' },
      question: 'Is there a material misstatement or evidence limitation, and is it pervasive?',
      branches: [
        { condition: 'No material misstatement; sufficient evidence', outcome: 'Unmodified opinion', detail: 'Not a guarantee of financial health', tone: 'positive' },
        { condition: 'Material but not pervasive', outcome: 'Qualified opinion', detail: 'Misstatement or evidence limitation', tone: 'caution' },
        { condition: 'Material and pervasive misstatement', outcome: 'Adverse opinion', tone: 'negative' },
        { condition: 'Pervasive inability to obtain evidence', outcome: 'Disclaimer of opinion', tone: 'negative' },
      ],
      note: 'Emphasis of Matter, going concern and other information are separate report elements. Verify current wording and required elements for the entity and period.',
      takeaway: 'An unmodified opinion is not a guarantee of financial health; qualified, adverse and disclaimer opinions communicate different circumstances and are not severity labels without context.',
    },
  },
  'professional-audit-m2-12': {
    heading: 'The auditor reports and recommends; management keeps every decision',
    intro: 'Findings, other reporting and the final file are the auditor’s output. Recommendations and follow-up must not transfer management decisions to the auditor.',
    spec: {
      layout: 'compare', title: '12 How Are Findings Communicated Without Assuming Management Responsibility?', kicker: '',
      leftTitle: 'Auditor', rightTitle: 'Management',
      rows: [
        { label: 'Findings', a: 'Communicates findings and recommendations', b: 'Decides whether and how to act' },
        { label: 'Statements and controls', a: 'Reports a supported conclusion', b: 'Remains responsible for them' },
        { label: 'Other reporting', a: 'Required communications, incl. independence matters', b: 'Receives and responds' },
        { label: 'Final file', a: 'Completes the audit documentation', b: 'Keeps its own records and decisions' },
      ],
      note: 'If the auditor makes management decisions, independence and the credibility of the conclusion are at risk.',
      takeaway: 'The report expresses a supported conclusion in context; it is not a guarantee of future viability or absence of all fraud.',
    },
  },
  'professional-audit-m2-13': {
    heading: 'Behind every audit sits a firm quality system of leadership, resources, information and monitoring',
    intro: 'IAASB quality standards use a risk-based approach and emphasize tone at the top, information flow, monitoring and timely remediation.',
    spec: {
      layout: 'taxonomy', title: '13 What Resources and Evidence Support an Audit?', kicker: '',
      root: 'Firm quality system', rootDetail: 'Components that work together, not a checklist',
      groups: [
        { label: 'Leadership', detail: 'Tone at the top' },
        { label: 'Resources', items: ['Competent people', 'Specialists', 'Technology'] },
        { label: 'Information flow', detail: 'Communication across firm and engagements' },
        { label: 'Methodology update', detail: 'Current standards translated into methods' },
        { label: 'Monitoring and remediation', detail: 'Evidence that quality responses work' },
      ],
      note: 'Translate current standards into methods, training, reviews and evidence that quality responses work in practice.',
      takeaway: 'Quality is an organizational capability requiring leadership, resources, information, monitoring and remediation—not an individual checklist.',
    },
  },
  'professional-audit-m2-14': {
    heading: 'Training, review and remediation turn individual judgment into reliable quality',
    intro: 'Quality objectives are achieved through competence, direction, review, monitoring and root-cause analysis. Quality indicators show where remediation is needed.',
    spec: {
      layout: 'driverTree', title: '14 How Do Professional Judgment, Skepticism and Quality Management Create Value?', kicker: '',
      root: { label: 'Credible engagement conclusions', detail: 'The value quality management creates' },
      drivers: [
        { label: 'Professional judgment', children: [{ label: 'Training' }, { label: 'Competence' }] },
        { label: 'Skepticism in practice', children: [{ label: 'Direction' }, { label: 'Review' }] },
        { label: 'Quality management', children: [{ label: 'Quality indicator' }, { label: 'Root-cause analysis' }, { label: 'Remediation' }] },
      ],
      note: 'Quality responses only create value if there is evidence that they work in practice.',
      takeaway: 'Quality is an organizational capability requiring leadership, resources, information, monitoring and remediation—not an individual checklist.',
    },
  },
  'professional-audit-m2-15': {
    heading: 'Monitoring and remediation form a repeating improvement cycle',
    intro: 'Supervision and monitoring surface issues, root-cause analysis explains them, and remediation and resources keep the improvement going.',
    spec: {
      layout: 'flow', title: '15 How Are Monitoring, Remediation and Professional Development Sustained?', kicker: '',
      steps: [
        { label: 'Supervision', detail: 'Direction and review on engagements' },
        { label: 'Monitoring', detail: 'Do quality responses work?', kind: 'decision' },
        { label: 'Root-cause analysis', detail: 'Why did a deficiency arise?' },
        { label: 'Timely remediation', detail: 'Fix methods, reviews or training' },
        { label: 'Resources and development', detail: 'People, training and methods updated', kind: 'outcome' },
      ],
      loop: 'Improvements are monitored again in the next cycle.',
      note: 'Translate current standards into methods, training, reviews and evidence that quality responses work in practice.',
      takeaway: 'Quality is an organizational capability requiring leadership, resources, information, monitoring and remediation—not an individual checklist.',
    },
  },
  'professional-audit-m2-16': {
    heading: 'In a group audit the group auditor stays accountable for work done across the network',
    intro: 'International methods, member firms, component auditors, shared centers and specialists combine with local law and reporting. ISA 600 (Revised) strengthens group-auditor responsibilities and two-way communication.',
    spec: {
      layout: 'ecosystem', title: '16 How Do Global Audit Networks and Group Audits Operate?', kicker: '',
      center: { label: 'Group engagement team', detail: 'Keeps engagement accountability' },
      actors: [
        { label: 'Global methodology', relation: 'International methods shared across member firms', flows: ['information'] },
        { label: 'Component auditors', relation: 'Two-way communication; competence and independence assessed', flows: ['information', 'service'] },
        { label: 'Shared delivery centers', relation: 'Perform delegated work under supervision', flows: ['service'] },
        { label: 'Specialists', relation: 'Support complex areas', flows: ['service'] },
        { label: 'Local law and reporting', relation: 'Local requirements and secure data transfer', flows: ['oversight', 'risk'] },
      ],
      note: 'ISA 600 (Revised) is effective internationally for periods beginning on or after 15 December 2023, subject to local adoption. Data transfer must consider Law 91/2025/QH15, effective 1 January 2026.',
      takeaway: 'Global standardization and local expertise are complementary, but neither network membership nor delegation removes engagement accountability.',
    },
  },
  'professional-audit-m2-17': {
    heading: 'Global methods supply consistency; local expertise makes delivery fit Vietnam',
    intro: 'International methods and specialist networks combine with local law, language, reporting and client context when audits are delivered in Vietnam.',
    spec: {
      layout: 'compare', title: '17 How Is Audit Delivery Adapted to Vietnam?', kicker: '',
      leftTitle: 'Global standardization', rightTitle: 'Local adaptation in Vietnam',
      rows: [
        { label: 'Method', a: 'International methodology', b: 'Local law, language and reporting' },
        { label: 'People', a: 'Specialist network', b: 'Local expertise on client context' },
        { label: 'Data', a: 'Shared delivery across locations', b: 'Secure transfer under Law 91/2025/QH15' },
        { label: 'Oversight', a: 'Group instructions', b: 'Supervision and evaluation of local work' },
        { label: 'Accountability', a: 'Not removed by network membership', b: 'Not removed by delegation' },
      ],
      note: 'Assess component competence and independence, local requirements and supervision before relying on local work.',
      takeaway: 'Global standardization and local expertise are complementary, but neither network membership nor delegation removes engagement accountability.',
    },
  },
};
