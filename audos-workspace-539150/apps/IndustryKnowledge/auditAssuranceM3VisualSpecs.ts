import type { AuditAssuranceChapterVisual } from './auditAssuranceVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Audit & Assurance Module 03, keyed by visualKind. */
export const AUDIT_ASSURANCE_M3_VISUALS: Record<string, AuditAssuranceChapterVisual> = {
  'professional-audit-m3-1': {
    heading: 'A partner-led practice earns fees by bundling six responsibilities in one leader',
    intro: 'In professional partnerships and member firms, leaders combine engagement, client, quality, talent, risk and commercial responsibilities. Specialists participate alongside them.',
    spec: {
      layout: 'taxonomy', title: '01 How Do Independent Audit Firms Make Money?', kicker: '',
      root: 'Partner leadership', rootDetail: 'Responsibilities combined in one role — not a sequence',
      groups: [
        { label: 'Engagement', detail: 'Leads the work and its conclusion' },
        { label: 'Client', detail: 'Client acceptance and the relationship' },
        { label: 'Quality', detail: 'Quality indicators and review' },
        { label: 'Talent', detail: 'Builds teams and brings in specialists' },
        { label: 'Risk', detail: 'Risk and legal responsibility' },
        { label: 'Commercial', detail: 'Partner portfolio and incentives' },
      ],
      note: 'Network firms can share methods and brand while remaining separate legal entities, so contractual and engagement responsibility must be understood.',
      takeaway: 'Partnership aligns expertise and client accountability only when governance and incentives reinforce independence and quality.',
    },
  },
  'professional-audit-m3-2': {
    heading: 'Partnership, network and member firm each answer a different governance question',
    intro: 'Network firms can share methods and brand while remaining separate legal entities. Governance and succession decide who is accountable for each engagement.',
    spec: {
      layout: 'table', title: '02 How Do Partnerships, Networks and Local Member Firms Differ?', kicker: '',
      headers: ['Structure', 'What it provides', 'Governance question'],
      rows: [
        { label: 'Partnership', a: 'Partners lead engagements, clients and quality', b: 'Professional governance and partner succession' },
        { label: 'Network', a: 'Shared methods and brand', b: 'Which entity carries contractual responsibility?' },
        { label: 'Local member firm', a: 'Separate legal entity delivering locally', b: 'Legal responsibility under Vietnamese requirements' },
      ],
      note: 'A shared brand does not by itself show which firm is responsible for an engagement.',
      takeaway: 'Partnership aligns expertise and client accountability only when governance and incentives reinforce independence and quality.',
    },
  },
  'professional-audit-m3-3': {
    heading: 'Specialist and adjacent services sit on the same governance and risk-oversight base',
    intro: 'Service lines share the firm’s leadership, client acceptance and risk oversight. Profit sharing and incentives decide whether they reinforce or strain independence and quality.',
    spec: {
      layout: 'pathway', title: '03 How Do Specialist Assurance and Permitted Adjacent Services Fit?', kicker: '',
      trunk: [
        { label: 'Client acceptance', detail: 'Who the firm may serve, and how' },
        { label: 'Risk oversight', detail: 'Independence and quality checked firm-wide' },
      ],
      optionsLabel: 'Service lines within the practice — alternatives, not steps',
      options: [
        { label: 'Financial audit', detail: 'Core engagement led by partners' },
        { label: 'Specialist assurance', detail: 'Draws on specialist participation' },
        { label: 'Permitted adjacent services', detail: 'Only where independence rules allow' },
      ],
      afterLabel: 'Across every line',
      after: [{ label: 'Profit sharing aligned with quality', kind: 'outcome', detail: 'Incentives must reinforce independence' }],
      takeaway: 'Partnership aligns expertise and client accountability only when governance and incentives reinforce independence and quality.',
    },
  },
  'professional-audit-m3-4': {
    heading: 'Each segment answers a different question and gives a different level of assurance',
    intro: 'Audit and assurance services are segmented by what each one concludes. A financial statement audit gives reasonable assurance, a review gives limited assurance, other assurance covers different subject matter, and agreed-upon procedures give no assurance.',
    spec: {
      layout: 'table', title: '04 How Are Financial Audit and Other Assurance Services Segmented?', kicker: '',
      headers: ['Segment', 'Assurance level', 'What it reports'],
      rows: [
        { label: 'Financial statement audit', a: 'Reasonable assurance', b: 'An opinion on historical financial statements' },
        { label: 'Review', a: 'Limited assurance', b: 'A conclusion in the form the standard requires' },
        { label: 'Other assurance (ISAE 3000 (Revised))', a: 'As the engagement states', b: 'A conclusion on other subject matter against suitable criteria' },
        { label: 'Agreed-upon procedures (ISRS 4400 (Revised))', a: 'None', b: 'Procedures performed and factual findings only' },
      ],
      note: 'Law or voluntary choice decides whether a service is required, not what it is. Verify the Vietnamese legal basis for each segment.',
      takeaway: 'Each segment is a different engagement with its own standard, report and level of confidence, so one segment’s conclusion cannot be reused as another’s.',
    },
  },
  'professional-audit-m3-5': {
    heading: 'Only a review gives assurance; agreed-upon procedures and advisory work do not',
    intro: 'A review gives limited assurance. Agreed-upon procedures report factual findings for specified users, and advisory work gives recommendations. Neither of the last two provides assurance.',
    spec: {
      layout: 'table', title: '05 How Do Review, Agreed-Upon Procedures and Advisory Differ?', kicker: '',
      headers: ['Service', 'Assurance and output', 'Who relies or decides'],
      rows: [
        { label: 'Review', a: 'Limited assurance; a conclusion', b: 'Intended users rely on the conclusion' },
        { label: 'Agreed-upon procedures', a: 'No assurance; procedures and factual findings', b: 'Specified users draw their own conclusions' },
        { label: 'Advisory service', a: 'No assurance; recommendations', b: 'The client decides; independence limits apply for audit clients' },
      ],
      note: 'Agreed-upon procedures are not a lighter audit, and advisory work is not assurance.',
      takeaway: 'Calling agreed-upon procedures or advisory work an audit or a review, or reading it as one, gives users more confidence than the work supports.',
    },
  },
  'professional-audit-m3-6': {
    heading: 'Audit work concentrates on a few high-risk classes, balances, estimates and disclosures',
    intro: 'Audit teams focus on assertions and risks within significant transaction classes, balances and disclosures. Different assertions in the same area can need different evidence.',
    spec: {
      layout: 'taxonomy', title: '06 Which Financial Reporting Areas Commonly Drive Audit Work?', kicker: '',
      root: 'Significant reporting areas', rootDetail: 'Areas assessed by assertion and risk — not in sequence',
      groups: [
        { label: 'Revenue recognition', items: ['Occurrence', 'Cutoff', 'Contract terms'] },
        { label: 'Inventory valuation', items: ['Existence', 'Condition', 'Costing', 'Net realizable value'] },
        { label: 'Balances and estimates', items: ['Receivables and ECL', 'Provisions', 'Management estimates'] },
        { label: 'Entity-wide areas', items: ['Going concern', 'Related parties', 'Disclosures'] },
      ],
      note: 'Apply the entity’s actual reporting framework and current requirements; do not infer one universal treatment.',
      takeaway: 'The curriculum identifies audit implications without attempting to replace the full applicable accounting standards or management judgments.',
    },
  },
  'professional-audit-m3-7': {
    heading: 'Audit is required by law or bought by choice, and the buyer is not always the user',
    intro: 'Law can require certain entities to be audited, while others buy an audit because owners, lenders, investors or a parent group ask for assurance. The party that appoints and pays is often not the party that relies on the report.',
    spec: {
      layout: 'taxonomy', title: '07 Who Purchases or Requires Audit and Assurance?', kicker: '',
      root: 'Why an audit or assurance engagement exists', rootDetail: 'Reasons that can apply together, not stages',
      groups: [
        { label: 'Statutory requirement', detail: 'Law or regulation requires an audit' },
        { label: 'Voluntary engagement', detail: 'Chosen by the entity or its owners' },
        { label: 'Lender, investor or parent request', detail: 'Third parties ask for assurance or group reporting' },
        { label: 'Appointing party and intended users', detail: 'Who appoints and pays can differ from who relies' },
      ],
      note: 'Management prepares the statements and those charged with governance oversee that process. Verify entity by entity whether Vietnamese law requires an audit.',
      takeaway: 'The buyer is not always the user: intended users define what the engagement must achieve, and independence protects them from the pressure of the party that pays.',
    },
  },
  'professional-audit-m3-8': {
    heading: 'Four client types need four different things around the same evidence standard',
    intro: 'Public-interest, private, group and voluntary clients differ in who relies on the audit, how complex reporting is and which extra requirements apply. All of them still need sufficient appropriate evidence.',
    spec: {
      layout: 'table', title: '08 How Do Public-Interest, Private, Group and Voluntary Needs Differ?', kicker: '',
      headers: ['Client type', 'Who relies', 'What differs'],
      rows: [
        { label: 'Public-interest entity', a: 'A wide group of stakeholders', b: 'Additional independence and oversight requirements can apply' },
        { label: 'Private company', a: 'Owners and lenders, usually', b: 'Requirements depend on law and contract' },
        { label: 'Group', a: 'Users of the group financial statements', b: 'One opinion built on component work (ISA 600 (Revised))' },
        { label: 'Voluntary client', a: 'Whoever asked for the audit', b: 'Scope and standard set in the engagement terms' },
      ],
      note: 'Verify how Vietnamese law classifies an entity before assuming any definition or threshold applies.',
      takeaway: 'A client’s category changes the requirements around the audit, not the need for sufficient appropriate evidence.',
    },
  },
  'professional-audit-m3-9': {
    heading: 'Three groups judge an audit through different evidence',
    intro: 'Those charged with governance, regulators and intended users each look at different things. Quality is judged from outside through evidence, not claims.',
    spec: {
      layout: 'ecosystem', title: '09 How Do Governance, Regulators and Intended Users Evaluate Audit?', kicker: '',
      center: { label: 'The audit and the firm behind it', detail: 'Judged through evidence of quality' },
      actors: [
        { label: 'Those charged with governance', relation: 'Evaluate through communications, independence and quality', flows: ['information', 'oversight'] },
        { label: 'Regulators', relation: 'Inspect quality management and expect findings to be remediated', flows: ['oversight'] },
        { label: 'Intended users', relation: 'Judge mainly through the auditor’s report', flows: ['information'] },
        { label: 'Audit firm', relation: 'Communicates, and remediates root causes of findings', flows: ['service', 'information'] },
      ],
      note: 'Confirm which bodies inspect firms in Vietnam and what follows from findings.',
      takeaway: 'Communications, inspection results and remediation show whether an audit can be relied on; the report alone tells users little about how well the work was done.',
    },
  },
  'professional-audit-m3-10': {
    heading: 'Engagement fee minus delivery cost gives contribution — try the worked example',
    intro: 'Audit firms earn fixed or scope-based engagement fees, milestone billings and permitted assurance fees. This worked example takes one fee and subtracts labour, specialist and other delivery cost.',
    spec: {
      layout: 'scenario', title: '10 How Do Audit Engagements Generate Revenue?', kicker: H,
      inputs: [
        { key: 'fee', label: 'Engagement fee', min: 600, max: 2000, step: 50, value: 1200, unit: 'VNDm' },
        { key: 'hours', label: 'Professional hours', min: 2000, max: 6000, step: 100, value: 4000, unit: 'hours' },
        { key: 'rate', label: 'Cost per hour', min: 100, max: 300, step: 10, value: 180, unit: 'VND thousand' },
        { key: 'specialists', label: 'Specialist cost', min: 0, max: 300, step: 10, value: 120, unit: 'VNDm' },
        { key: 'other', label: 'Other delivery cost', min: 0, max: 400, step: 10, value: 160, unit: 'VNDm' },
      ],
      outputs: [
        { label: 'Labour cost', unit: 'VNDm', digits: 0, compute: (v) => (v.hours * v.rate) / 1000 },
        { label: 'Total delivery cost', unit: 'VNDm', digits: 0, compute: (v) => (v.hours * v.rate) / 1000 + v.specialists + v.other },
        { label: 'Contribution', unit: 'VNDm', digits: 0, compute: (v) => v.fee - ((v.hours * v.rate) / 1000 + v.specialists + v.other) },
        { label: 'Contribution margin', unit: '%', digits: 1, compute: (v) => ((v.fee - ((v.hours * v.rate) / 1000 + v.specialists + v.other)) / v.fee) * 100 },
      ],
      assumption: `${H}. Defaults follow the chapter example: VND1,200m fee, 4,000 hours at VND180,000, VND120m specialists and VND160m other cost give VND200m contribution (16.7%). Not market data.`,
      note: 'Contract value, invoice, recognized revenue, cash and profit occur on different bases. Do not treat fee or margin as quality evidence.',
      takeaway: 'Fee less labour, specialist and other delivery cost gives contribution: in the hypothetical example, VND1,200m less VND1,000m leaves VND200m, or 16.7%.',
    },
  },
  'professional-audit-m3-11': {
    heading: 'Delivery cost builds up from people, specialists, tools, quality and overheads',
    intro: 'Delivery cost includes staff time, partner and manager supervision, specialists, tools, training, quality management, compliance, liability, travel, rework and working capital.',
    spec: {
      layout: 'driverTree', title: '11 What Determines Audit Delivery Costs and Profitability?', kicker: '',
      root: { label: 'Engagement delivery cost', detail: 'Sets profitability against the fee' },
      formula: 'Delivery cost = people + specialists and tools + quality + other costs',
      drivers: [
        { label: 'People time', op: '+', children: [{ label: 'Audit staff' }, { label: 'Partner supervision' }] },
        { label: 'Specialists and tools', op: '+', children: [{ label: 'Specialist' }, { label: 'Technology' }] },
        { label: 'Quality and capability', op: '+', children: [{ label: 'Training' }, { label: 'Quality review' }] },
        { label: 'Other costs', op: '+', children: [{ label: 'Insurance' }, { label: 'Travel and administration' }] },
      ],
      note: 'A low-fee engagement can require more senior time when records are weak or estimates complex; reducing procedures to protect margin is not an acceptable response.',
      takeaway: 'High utilization or engagement margin does not automatically indicate high audit quality; commercial pressure must not override required evidence, supervision, independence or review.',
    },
  },
  'professional-audit-m3-12': {
    heading: 'Firm KPIs fall into capacity, pricing, economics and people-and-quality families',
    intro: 'Financial KPIs describe capacity and economics; quality indicators can include consultation, review, training, workload, findings and remediation under defined methods.',
    spec: {
      layout: 'taxonomy', title: '12 Which KPIs Explain Audit-Firm Performance?', kicker: '',
      root: 'Audit-firm KPIs', rootDetail: 'Each needs a defined entity, scope, period and basis',
      groups: [
        { label: 'Capacity', items: ['Chargeable hours', 'Utilization', 'Staff leverage'] },
        { label: 'Pricing and revenue', items: ['Audit fee', 'Billing rate', 'Realization', 'Revenue per professional'] },
        { label: 'Economics and pipeline', items: ['Contribution margin', 'Backlog'] },
        { label: 'People and quality', items: ['Retention', 'Quality indicator'] },
      ],
      note: 'Two engagements with equal fees can have different hours, specialist needs, risk, review effort, collection timing and quality outcomes.',
      takeaway: 'Audit efficiency, fee and margin are not audit quality; every KPI needs an entity, service scope, period, numerator, denominator and accounting basis.',
    },
  },
  'professional-audit-m3-13': {
    heading: 'Leverage turns a layered team into cost and chargeable time, if supervision keeps pace',
    intro: 'Engagement cost depends on who does the work and for how many hours. A layered team is allocated by risk and competence, and the chargeable part of its time turns capacity into revenue.',
    spec: {
      layout: 'taxonomy', title: '13 How Do Staffing, Leverage and Chargeable Hours Shape Economics?', kicker: '',
      root: 'Engagement team hierarchy', rootDetail: 'Roles allocated by risk and competence',
      groups: [
        { label: 'Partners and directors', detail: 'Conclusions and final review' },
        { label: 'Managers', detail: 'Supervision and coaching' },
        { label: 'Experienced staff', detail: 'Complex estimates and contradictions' },
        { label: 'Assistants', detail: 'Tasks that automation can change' },
        { label: 'Specialists', detail: 'Brought in where risk requires' },
      ],
      note: 'Cutting senior time indiscriminately raises rework and quality risk. Plan capacity for peak deadlines, language, sector knowledge and technology rather than utilization alone.',
      takeaway: 'Effective leverage matches task complexity with competence and supervision; cutting senior time indiscriminately to protect margin increases rework and quality risk.',
    },
  },
  'professional-audit-m3-14': {
    heading: 'Revenue moves with chargeable hours, billing rate and realization, and each can mislead alone',
    intro: 'In a simplified model, revenue depends on how many hours are chargeable, the rate applied and how much of the effort is realized as fees earned. High utilization with low realization means busy people earning little.',
    spec: {
      layout: 'driverTree', title: '14 How Do Utilization, Billing Rates and Realization Affect Revenue?', kicker: '',
      root: { label: 'Engagement revenue', detail: 'Simplified model; each ratio needs a defined basis' },
      formula: 'Revenue ≈ chargeable hours × billing rate × realization',
      drivers: [
        { label: 'Chargeable hours', op: '×', detail: 'Available capacity multiplied by utilization' },
        { label: 'Billing rate', op: '×', detail: 'Rate applied to chargeable time' },
        { label: 'Realization', op: '×', detail: 'Fees earned relative to recorded or standard effort' },
      ],
      note: 'Contract value, invoice, recognized revenue and cash are different bases. None of these ratios measures audit quality.',
      takeaway: 'Read utilization, billing rate and realization together under defined bases, and never treat them as a reason to reduce required procedures.',
    },
  },
  'professional-audit-m3-15': {
    heading: 'Financial KPIs and audit quality indicators answer different questions',
    intro: 'Financial KPIs describe capacity and economics. Audit quality indicators inform whether the work was done with enough consultation, review, training and follow-up. The two can move in opposite directions.',
    spec: {
      layout: 'compare', title: '15 Why Must Audit Quality Indicators Remain Separate From Financial KPIs?', kicker: '',
      leftTitle: 'Financial KPIs', rightTitle: 'Audit quality indicators',
      rows: [
        { label: 'Question answered', a: 'Capacity and economics', b: 'Whether the work had enough consultation, review and follow-up' },
        { label: 'Examples', a: 'Fee, hours, utilization, margin', b: 'Consultation, review, training, workload, findings, remediation' },
        { label: 'If blended', a: 'Strong results can hide weak quality', b: 'The quality signal is lost behind the financial result' },
        { label: 'How to report', a: 'Own view with a defined basis', b: 'Own view with a defined method' },
      ],
      note: 'Efficiency, fee and margin are not evidence of audit quality.',
      takeaway: 'Blending commercial measures with quality indicators lets strong financial results hide weak quality and can reward pressure that erodes it.',
    },
  },
  'professional-audit-m3-16': {
    heading: 'Preparers, users, firms, standard setters and overseers each play a distinct role',
    intro: 'Credible assurance depends on keeping roles distinct: management prepares, the auditor independently evaluates, users rely, and standards and oversight frame the work.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Audit and Assurance Ecosystem?', kicker: '',
      center: { label: 'Audit firm and engagement team', detail: 'Performs the work independently' },
      actors: [
        { label: 'Audited entity and its governance', relation: 'Management prepares the information; governance oversees it', flows: ['information', 'money'] },
        { label: 'Intended users', relation: 'Investors, lenders and others rely on the report', flows: ['information'] },
        { label: 'Standard setters', relation: 'The IAASB and IESBA issue auditing, quality and ethics requirements', flows: ['oversight'] },
        { label: 'Oversight and licensing bodies', relation: 'Supervise firms; Vietnamese roles to be verified', flows: ['oversight'] },
        { label: 'Technology providers', relation: 'Supply tools and data platforms; the firm stays responsible', flows: ['service'] },
      ],
      note: 'An auditor acting as management would collapse two roles and weaken the whole system.',
      takeaway: 'Each participant has a different role and interest; mapping them shows where responsibility sits and where role confusion could arise.',
    },
  },
  'professional-audit-m3-17': {
    heading: 'A business relationship or fee dependence is tested before any service is accepted',
    intro: 'Ethical and independence requirements shape which services, relationships and fees a firm can accept from a client.',
    spec: {
      layout: 'decision', title: '17 How Do Independence, Ethics and Conflicts Shape Services?', kicker: '',
      root: { label: 'Proposed service or relationship', detail: 'With an audit or assurance client' },
      question: 'Would a business relationship or fee dependence threaten independence?',
      branches: [
        { condition: 'No threat identified', outcome: 'Proceed under engagement requirements', detail: 'Document the assessment', tone: 'positive' },
        { condition: 'Threat present', outcome: 'Address it before accepting', detail: 'e.g. reduce fee dependence or restructure the relationship', tone: 'caution' },
        { condition: 'Threat cannot be addressed', outcome: 'Decline the service or relationship', detail: 'Independence takes priority over revenue', tone: 'negative' },
      ],
      note: 'Apply current Vietnamese law, professional ethics and engagement-specific requirements; international code examples do not override local rules.',
      takeaway: 'Independence is a condition of credible assurance and a core operating constraint—not an optional differentiator.',
    },
  },
  'professional-audit-m3-18': {
    heading: 'Regulators, professional bodies and technology providers shape delivery but not accountability',
    intro: 'Outside parties set conditions for how engagements can be staffed, performed and documented. Accountability for the audit conclusion stays with the firm and the engagement team.',
    spec: {
      layout: 'table', title: '18 How Do Regulators, Professional Bodies and Technology Providers Shape Delivery?', kicker: '',
      headers: ['Outside party', 'How it shapes delivery', 'What stays with the firm'],
      rows: [
        { label: 'Regulators', a: 'Set conditions to practise; license and inspect', b: 'Compliance and remediation of findings' },
        { label: 'Professional bodies', a: 'Support ethics, development and, by jurisdiction, standards', b: 'Competence and ethical conduct' },
        { label: 'Technology providers', a: 'Supply tools and data platforms', b: 'Tool validation, critical review of outputs, data protection' },
      ],
      note: 'Confirm Vietnamese licensing, inspection and data-protection duties from current official sources.',
      takeaway: 'External requirements and tool dependencies change how work is performed, not who is accountable for the conclusion and its quality.',
    },
  },
};
