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
    heading: 'Each service is judged through its agreed fee, its budget and its place in the portfolio',
    intro: 'Fee structures, hours, staffing, specialists, technology, rework and risk differ across audit and assurance engagements. A fixed fee can become uneconomic when records are unreliable or complexity changes.',
    spec: {
      layout: 'table', title: '04 How Are Financial Audit and Other Assurance Services Segmented?', kicker: '',
      headers: ['Economic lens', 'What it captures', 'Pressure point'],
      rows: [
        { label: 'Agreed fee', a: 'Price for a defined scope', b: 'Complexity can change after agreement' },
        { label: 'Budget', a: 'Hours, staffing, specialists, technology', b: 'Unreliable records add time and rework' },
        { label: 'Portfolio economics', a: 'Mix of engagements across the firm', b: 'Margin cannot be protected by cutting evidence' },
      ],
      note: 'Document assumptions, scope changes and responsibilities while complying with professional, independence, procurement and fee requirements.',
      takeaway: 'Sustainable economics require realistic scope and disciplined delivery; fee pressure cannot justify insufficient procedures or supervision.',
    },
  },
  'professional-audit-m3-5': {
    heading: 'Time billing and an agreed fee react differently when the work grows',
    intro: 'Engagements can be priced on recorded time or on an agreed fee for a scope. Either way, required evidence and quality cannot be removed to protect margin.',
    spec: {
      layout: 'compare', title: '05 How Do Review, Agreed-Upon Procedures and Advisory Differ?', kicker: '',
      leftTitle: 'Time billing', rightTitle: 'Agreed (fixed) fee',
      rows: [
        { label: 'Basis of the fee', a: 'Professional time recorded', b: 'Fee set for a defined scope' },
        { label: 'When complexity rises', a: 'Extra time shows in the hours', b: 'Engagement can become uneconomic' },
        { label: 'Key measure', a: 'Utilization of available capacity', b: 'Budget against actual delivery' },
        { label: 'Fixed requirement', a: 'Required procedures and supervision', b: 'Required evidence and quality' },
      ],
      note: 'Utilization: chargeable or productive time relative to available professional capacity under a stated definition.',
      takeaway: 'Sustainable economics require realistic scope and disciplined delivery; fee pressure cannot justify insufficient procedures or supervision.',
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
    heading: 'Client demand is met by a layered team that must be sized for peak deadlines',
    intro: 'Layered teams of assistants, experienced staff, managers, directors, partners and specialists are allocated by risk and competence. Capacity has to be planned for peak deadlines.',
    spec: {
      layout: 'taxonomy', title: '07 Who Purchases or Requires Audit and Assurance?', kicker: '',
      root: 'Engagement team hierarchy', rootDetail: 'Roles allocated by risk and competence',
      groups: [
        { label: 'Partners and directors', detail: 'Conclusions and final review' },
        { label: 'Managers', detail: 'Supervision and coaching' },
        { label: 'Experienced staff', detail: 'Complex estimates and contradictions' },
        { label: 'Assistants', detail: 'Tasks that automation can change' },
        { label: 'Specialists', detail: 'Brought in where risk requires' },
      ],
      note: 'Seasonality: plan qualified capacity for peak deadlines, language, sector knowledge, technology and group instructions rather than utilization alone.',
      takeaway: 'Effective leverage matches task complexity with competence and supervision; indiscriminate senior-time reduction increases rework and quality risk.',
    },
  },
  'professional-audit-m3-8': {
    heading: 'Each task goes to the level of competence its complexity and risk demand',
    intro: 'Automation can change junior tasks, but experienced judgment remains necessary for complex estimates, contradictions, conclusions and supervision.',
    spec: {
      layout: 'decision', title: '08 How Do Public-Interest, Private, Group and Voluntary Needs Differ?', kicker: '',
      root: { label: 'Engagement task', detail: 'Allocated by risk and competence' },
      question: 'What competence does this task need?',
      branches: [
        { condition: 'Routine and well defined', outcome: 'Junior staff under supervision', detail: 'Work that automation may also change', tone: 'positive' },
        { condition: 'Complex estimate or contradiction', outcome: 'Experienced staff and senior review', detail: 'Judgment cannot be delegated down', tone: 'caution' },
        { condition: 'Expertise outside the team', outcome: 'Involve a specialist', detail: 'Specialist use planned with the team', tone: 'caution' },
      ],
      note: 'Group instructions, sector knowledge and language needs change which tasks require senior or specialist time.',
      takeaway: 'Effective leverage matches task complexity with competence and supervision; indiscriminate senior-time reduction increases rework and quality risk.',
    },
  },
  'professional-audit-m3-9': {
    heading: 'Training and retention build the qualified capacity that users rely on',
    intro: 'Qualified capacity depends on technical, sector, language and technology skills, plus the coaching and reviews that experienced staff provide.',
    spec: {
      layout: 'driverTree', title: '09 How Do Governance, Regulators and Intended Users Evaluate Audit?', kicker: '',
      root: { label: 'Qualified team capacity', detail: 'What intended users ultimately rely on' },
      drivers: [
        { label: 'Training', detail: 'Builds competence', children: [{ label: 'Sector knowledge' }, { label: 'Language and technology' }] },
        { label: 'Coaching and review', detail: 'Turns experience into supervision', children: [{ label: 'Coaching juniors' }, { label: 'Reviews of work' }] },
        { label: 'Retention', detail: 'Keeps experienced judgment', children: [{ label: 'Less rework' }, { label: 'Lower quality risk' }] },
      ],
      note: 'Plan capacity on these drivers rather than utilization alone.',
      takeaway: 'Effective leverage matches task complexity with competence and supervision; indiscriminate senior-time reduction increases rework and quality risk.',
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
    heading: 'Sector specialization and portfolio diversification trade relevance against resilience',
    intro: 'Firms make portfolio choices by sector, entity type, geography, reporting complexity, risk, profitability and strategic fit. Different sectors need different capabilities and staffing.',
    spec: {
      layout: 'compare', title: '13 How Do Staffing, Leverage and Chargeable Hours Shape Economics?', kicker: '',
      leftTitle: 'Specialize by sector', rightTitle: 'Diversify the portfolio',
      rows: [
        { label: 'Main benefit', a: 'Relevance from sector expertise', b: 'Resilience across client types' },
        { label: 'Staffing effect', a: 'Deep, repeatable sector capabilities', b: 'Different regulatory, systems and specialist needs' },
        { label: 'Watch-out', a: 'Concentration on few clients or sectors', b: 'Capacity spread too thin' },
        { label: 'Portfolio review', a: 'Concentration and collection risk', b: 'Technical needs and staffing capacity' },
      ],
      note: 'A financial-services audit and a manufacturing audit can require different regulatory, systems, estimate and specialist capabilities.',
      takeaway: 'Specialization improves relevance while diversification strengthens resilience; both require competence, capacity, independence and disciplined risk selection.',
    },
  },
  'professional-audit-m3-14': {
    heading: 'Revenue moves with hours, rates and realization — within the clients a firm may serve',
    intro: 'Revenue depends on how much capacity is chargeable, the rate billed and how much of it is realized, across the client segments the firm accepts.',
    spec: {
      layout: 'driverTree', title: '14 How Do Utilization, Billing Rates and Realization Affect Revenue?', kicker: '',
      root: { label: 'Engagement revenue', detail: 'Earned within accepted client segments' },
      formula: 'Revenue ≈ chargeable hours × billing rate × realization',
      drivers: [
        { label: 'Utilization', op: '×', detail: 'Share of capacity that is chargeable' },
        { label: 'Billing rate', op: '×', detail: 'Rate applied to chargeable time' },
        { label: 'Realization', op: '×', detail: 'Share of billable effort actually earned' },
        { label: 'Client segment', detail: 'Shapes all three', children: [{ label: 'Sector and entity type' }, { label: 'Reporting complexity' }] },
        { label: 'Conflict management', detail: 'Limits which clients can be served', children: [{ label: 'Independence' }, { label: 'Eligibility' }] },
      ],
      note: 'Review each client for eligibility, independence, reputation, evidence readiness, technical needs, concentration, collection risk and staffing capacity.',
      takeaway: 'Specialization improves relevance while diversification strengthens resilience; both require competence, capacity, independence and disciplined risk selection.',
    },
  },
  'professional-audit-m3-15': {
    heading: 'Reach and specialist breadth are commercial facts, not evidence of audit quality',
    intro: 'Geographic coverage and a specialist network widen what a firm can sell. Quality depends on whether competence, capacity and independence exist where the work is done.',
    spec: {
      layout: 'compare', title: '15 Why Must Audit Quality Indicators Remain Separate From Financial KPIs?', kicker: '',
      leftTitle: 'Financial and portfolio view', rightTitle: 'Audit quality view',
      rows: [
        { label: 'Geographic coverage', a: 'Where the firm can sell and staff work', b: 'Whether competent capacity exists there' },
        { label: 'Specialist network', a: 'Breadth of specialist offering', b: 'Fit with the client’s technical needs' },
        { label: 'Client choice', a: 'Profitability and strategic fit', b: 'Eligibility, independence, evidence readiness' },
        { label: 'Risk', a: 'Concentration and collection risk', b: 'Quality and independence risk' },
      ],
      note: 'Track both views, but report them separately so commercial strength is not read as quality.',
      takeaway: 'Specialization improves relevance while diversification strengthens resilience; both require competence, capacity, independence and disciplined risk selection.',
    },
  },
  'professional-audit-m3-16': {
    heading: 'Independence requirements reach the firm from clients, the IESBA Code and local law',
    intro: 'Ethical and independence requirements affect client acceptance, services, staffing, fees, relationships and governance. IESBA Parts 4A and 4B distinguish audit/review from other assurance engagements.',
    spec: {
      layout: 'ecosystem', title: '16 Who Participates in the Audit and Assurance Ecosystem?', kicker: '',
      center: { label: 'Audit firm and engagement team', detail: 'Must stay independent of the client' },
      actors: [
        { label: 'Audit or review client', relation: 'Financial interests and long association create threats', flows: ['service', 'risk'] },
        { label: 'Other assurance client', relation: 'Part 4B independence requirements apply', flows: ['service', 'risk'] },
        { label: 'IESBA Code', relation: 'Parts 4A and 4B set independence requirements', flows: ['oversight'] },
        { label: 'Vietnamese law and ethics', relation: 'Current local rules apply first', flows: ['oversight'] },
        { label: 'Intended users', relation: 'Rely on a credible, independent conclusion', flows: ['information'] },
      ],
      note: 'Withdrawal is the response when independence cannot be maintained. International code examples do not override local rules.',
      takeaway: 'Independence is a condition of credible assurance and a core operating constraint—not an optional differentiator.',
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
    heading: 'Local law, the IESBA Code and service choices each shape how delivery is set up',
    intro: 'Ethical and independence requirements affect client acceptance, services, staffing, fees, relationships, governance and commercial planning.',
    spec: {
      layout: 'table', title: '18 How Do Regulators, Professional Bodies and Technology Providers Shape Delivery?', kicker: '',
      headers: ['Shaping force', 'Effect on delivery', 'Conflict to check'],
      rows: [
        { label: 'Vietnamese law and ethics', a: 'Sets current local requirements', b: 'International examples do not override it' },
        { label: 'IESBA Parts 4A and 4B', a: 'Separate audit/review from other assurance', b: 'Which independence part applies' },
        { label: 'Non-assurance service', a: 'Affects services, staffing and fees', b: 'May conflict with the assurance role' },
        { label: 'Commercial planning', a: 'Shapes relationships and governance', b: 'Independence stays a hard constraint' },
      ],
      takeaway: 'Independence is a condition of credible assurance and a core operating constraint—not an optional differentiator.',
    },
  },
};
