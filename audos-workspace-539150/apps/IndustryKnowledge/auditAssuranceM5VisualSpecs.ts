import type { AuditAssuranceChapterVisual } from './auditAssuranceVisualSpecs';

/** Chapter-specific Learning Visuals for Audit & Assurance Module 05, keyed by visualKind. */
export const AUDIT_ASSURANCE_M5_VISUALS: Record<string, AuditAssuranceChapterVisual> = {
  'professional-audit-m5-1': {
    heading: 'Wider reporting widens what stakeholders ask to have assured, but not what can be assured',
    intro: 'Reporting is widening from financial statements toward sustainability and other non-financial information. Whether assurance is possible depends on requirements, suitable criteria, reliable data and qualified practitioners.',
    spec: {
      layout: 'taxonomy', title: '01 How Are Corporate Reporting and Stakeholder Expectations Changing?', kicker: '',
      root: 'What stakeholders may ask to have assured', rootDetail: 'Scope widens only where the preconditions exist',
      groups: [
        { label: 'Financial statements', detail: 'The information a statutory audit gives its opinion on' },
        { label: 'Sustainability and other non-financial information', detail: 'Different data, boundaries and estimates, for example emissions' },
        { label: 'Stakeholder expectations', detail: 'Investors, lenders and regulators; can run ahead of legal requirements' },
        { label: 'Preconditions for assurance', items: ['Suitable criteria', 'Reliable data', 'Qualified practitioners'] },
      ],
      note: 'ISSA 5000 is final but generally effective only for periods beginning on or after 15 December 2026, with earlier application permitted. Verify whether and when assurance applies in Vietnam.',
      takeaway: 'A change in what is reported changes what can be assured; stakeholder interest alone does not create a requirement.',
    },
  },
  'professional-audit-m5-2': {
    heading: 'Users cannot see the audit work, so quality and transparency carry more weight',
    intro: 'As more decisions depend on audited information, users rely on evidence about quality. Quality-management standards, transparency about the audit and the way a firm responds to findings together let users judge quality instead of assuming it.',
    spec: {
      layout: 'table', title: '02 Why Are Audit Quality and Transparency More Important?', kicker: '',
      headers: ['Driver', 'Why it raises the stakes', 'What a firm can show'],
      rows: [
        { label: 'User reliance', a: 'Users cannot see the work and rely on the report', b: 'Evidence of quality, not claims' },
        { label: 'Quality-management standards', a: 'ISQM 1, ISQM 2 and ISA 220 (Revised), effective internationally from 15 December 2022', b: 'Objectives, risks, responses, monitoring and remediation' },
        { label: 'Transparency', a: 'Lets users, governance bodies and regulators judge quality', b: 'Quality indicators and a clear account of what the report gives assurance on' },
        { label: 'Inspection findings', a: 'Make weaknesses visible', b: 'Root causes found and remediation shown to work' },
      ],
      note: 'An international effective date does not by itself show Vietnamese adoption; verify local status.',
      takeaway: 'A firm earns trust by showing evidence of quality and of fixing weaknesses; transparency is credible only if it reports honestly on both.',
    },
  },
  'professional-audit-m5-3': {
    heading: 'Systems expertise and retention together sustain the future audit team',
    intro: 'Teams need systems understanding and digital skills, and they keep them only if peak-season workloads are sustainable and coaching continues.',
    spec: {
      layout: 'driverTree', title: '03 How Are Talent and Client Collaboration Evolving?', kicker: '',
      root: { label: 'Sustainable team capability', detail: 'For evolving client collaboration' },
      drivers: [
        { label: 'Systems expertise', detail: 'Understanding client systems', children: [{ label: 'Systems understanding' }, { label: 'Digital skills' }] },
        { label: 'Retention', detail: 'Keeping experienced people', children: [{ label: 'Sustainable peak workloads' }, { label: 'Coaching' }] },
        { label: 'Broader skills', detail: 'Working with clients', children: [{ label: 'Language' }, { label: 'Sector knowledge' }] },
      ],
      takeaway: 'Future capability combines accounting and assurance foundations with analytics, technology, communication and judgment.',
    },
  },
  'professional-audit-m5-4': {
    heading: 'Every analytics or automation use runs on the same governed base and human check',
    intro: 'Population analysis, anomaly detection, extraction, summaries, workflow and review support operate under controlled methodologies. IAASB warns against automation bias and overreliance.',
    spec: {
      layout: 'pathway', title: '04 How Are Data Analytics and Automation Changing Audit Procedures?', kicker: '',
      trunk: [
        { label: 'Approved, secure tool', detail: 'Tool governance' },
        { label: 'Data controls and validation', detail: 'Before outputs are used' },
      ],
      optionsLabel: 'Uses in procedures — alternatives, not steps',
      options: [
        { label: 'Transaction analytics', detail: 'Population analysis and anomaly detection' },
        { label: 'Document processing', detail: 'Extraction and summaries' },
        { label: 'Workflow automation', detail: 'Routine workflow steps' },
        { label: 'AI-assisted review', detail: 'Review support' },
      ],
      afterLabel: 'Whatever the use',
      after: [
        { label: 'Human verification', detail: 'Critical assessment of outputs' },
        { label: 'Documentation and limitations', detail: 'Plus productivity measurement', kind: 'outcome' },
      ],
      takeaway: 'AI and analytics can improve risk identification and efficiency but do not replace evidence evaluation, skepticism or responsibility for the conclusion.',
    },
  },
  'professional-audit-m5-5': {
    heading: 'Continuous monitoring gives earlier visibility; formal assurance still needs scope and criteria',
    intro: 'Continuous or near-real-time transaction and control monitoring is used for management, internal audit or selected assurance-related work. An alert can find an exception sooner, but it is not an assurance conclusion.',
    spec: {
      layout: 'compare', title: '05 How Are Continuous Monitoring and Technology-Enabled Evidence Developing?', kicker: '',
      leftTitle: 'Continuous controls monitoring', rightTitle: 'Formal assurance engagement',
      rows: [
        { label: 'Timing', a: 'Continuous or near-real-time', b: 'Periodic assurance over a defined scope' },
        { label: 'Output', a: 'Exception alerts and risk dashboards', b: 'Report under applicable standards' },
        { label: 'Depends on', a: 'Integrated data and data governance', b: 'Criteria, evidence and scope' },
        { label: 'Performed by', a: 'Management or internal audit', b: 'Independent external assurer' },
      ],
      note: 'Distinguish management monitoring, internal audit, controls testing and independent external assurance in contracts and communication.',
      takeaway: 'More frequent monitoring improves visibility but is not automatically equivalent to a properly scoped statutory audit or assurance engagement.',
    },
  },
  'professional-audit-m5-6': {
    heading: 'AI supports the work; judgment, skepticism and responsibility stay with people',
    intro: 'AI can help analyze populations, detect anomalies, extract and summarize documents and support review. It cannot evaluate evidence, apply professional skepticism or take responsibility for the conclusion.',
    spec: {
      layout: 'compare', title: '06 What Role Can AI Play—and Not Play—in Audit Judgment?', kicker: '',
      leftTitle: 'What AI can support', rightTitle: 'What stays with the engagement team',
      rows: [
        { label: 'Analysis', a: 'Population analysis and anomaly detection', b: 'Deciding what the flags mean' },
        { label: 'Documents', a: 'Extraction and summaries', b: 'Checking the underlying records' },
        { label: 'Review', a: 'Review support', b: 'Evaluating evidence and contradictions' },
        { label: 'Risk', a: 'Efficiency and risk identification', b: 'Guarding against automation bias and overreliance' },
        { label: 'Conclusion', a: 'An input to judgment', b: 'Responsibility for the conclusion' },
      ],
      note: 'Use approved, secure tools with validation, human verification, documentation and a statement of limitations.',
      takeaway: 'AI changes how evidence is obtained and risks are found, not who is accountable for the conclusion.',
    },
  },
  'professional-audit-m5-7': {
    heading: 'A group audit moves from coordinated planning to evaluated component work',
    intro: 'Groups have components across jurisdictions, frameworks, languages, deadlines and data restrictions. ISA 600 (Revised) strengthens two-way communication, planning, performance and documentation.',
    spec: {
      layout: 'flow', title: '07 How Are Group Audits and Cross-Border Delivery Evolving?', kicker: '',
      steps: [
        { label: 'Coordinated risk assessment', detail: 'Across components', owner: 'Group team' },
        { label: 'Clear responsibilities', detail: 'Instructions to each component', owner: 'Group team' },
        { label: 'Component work', detail: 'Local statutory and group procedures', owner: 'Component auditors' },
        { label: 'Component evaluation', kind: 'decision', detail: 'Competence, independence, evidence', owner: 'Group team' },
        { label: 'Group conclusion', kind: 'outcome', detail: 'Documented and accountable', owner: 'Group team' },
      ],
      loop: 'Two-way communication and professional skepticism run throughout.',
      takeaway: 'Group quality requires coordinated risk assessment, clear responsibilities and evaluation of component work; geographic coverage alone is insufficient.',
    },
  },
  'professional-audit-m5-8': {
    heading: 'Shared centres and specialists add capacity and expertise, not accountability',
    intro: 'Some audit tasks can be done by shared delivery centres or specialists. The engagement team must still direct, supervise and review that work and protect client data as it moves.',
    spec: {
      layout: 'table', title: '08 How Are Shared Delivery and Specialist Models Developing?', kicker: '',
      headers: ['Participant', 'What it contributes', 'What the engagement team must still do'],
      rows: [
        { label: 'Shared delivery centre', a: 'Performs defined tasks for several engagements', b: 'Define the tasks, supervise and review the results' },
        { label: 'Specialist (IT, valuation, tax, sustainability)', a: 'Expertise outside accounting and auditing', b: 'Evaluate competence and the specialist’s work' },
        { label: 'Secure data channels', a: 'Protected movement of client data', b: 'Control location, access, confidentiality and retention' },
        { label: 'Independence and competence', a: 'Requirements apply to everyone involved', b: 'Confirm them before relying on the work' },
      ],
      note: 'ISA 220 (Revised) and ISA 600 (Revised) keep the engagement partner responsible for managing and achieving quality.',
      takeaway: 'Quality depends on supervision, competence checks, independence and data controls, not on where the work is done.',
    },
  },
  'professional-audit-m5-9': {
    heading: 'Capability, not demand, limits how far assurance services can expand',
    intro: 'Adding a new kind of assurance needs more than a market. Each step below must be in place, and a firm should decline or defer work it cannot support.',
    spec: {
      layout: 'flow', title: '09 How Are Audit Firms Expanding Assurance Capabilities?', kicker: '',
      steps: [
        { label: 'Confirm the standard and criteria', detail: 'For example ISAE 3000 (Revised) or ISSA 5000' },
        { label: 'Secure subject matter competence', detail: 'In the team or through specialists' },
        { label: 'Adopt a methodology', detail: 'Applies the standard consistently' },
        { label: 'Extend quality management', detail: 'Bring the new service within ISQM 1 monitoring and remediation' },
        { label: 'Check acceptance and independence', detail: 'For each engagement' },
        { label: 'Accept the engagement', kind: 'outcome', detail: 'Only when every step holds' },
      ],
      loop: 'If any step cannot be met, decline or defer the work.',
      takeaway: 'A new service is credible only when the standard, competence, methodology, quality system and independence are ready.',
    },
  },
  'professional-audit-m5-10': {
    heading: 'Quality standards are in force; revised fraud and going-concern standards start with periods from 15 December 2026',
    intro: 'New audit, ethics, quality and reporting requirements are translated into methods, training, engagement execution, monitoring and remediation. Revised ISA 240 and ISA 570 are final but generally effective for periods beginning on or after 15 December 2026.',
    spec: {
      layout: 'timeline', title: '10 How Are Audit Standards, Ethics and Quality Requirements Evolving?', kicker: '',
      events: [
        { period: '15 December 2022', label: 'ISQM 1, ISQM 2, ISA 220 effective', detail: 'Internationally; local adoption may differ', status: 'historical' },
        { period: 'Now', label: 'Revised ISA 240 and ISA 570 final', detail: 'Fraud and going concern', status: 'current' },
        { period: '15 December 2026', label: 'Revisions generally effective', detail: 'For periods beginning on or after this date', status: 'forecast' },
        { period: 'Ongoing', label: 'Track Vietnamese adoption separately', detail: 'A final global standard is not automatically local law', status: 'current' },
      ],
      note: 'Implementation runs through methods, continuing education, ethical safeguards, quality monitoring and inspection remediation.',
      takeaway: 'Quality management is moving toward proactive risk identification, root-cause analysis and evidence that remediation works.',
    },
  },
  'professional-audit-m5-11': {
    heading: 'Sustainability assurance is offered only once requirements, criteria, data and skills are confirmed',
    intro: 'Assurance over sustainability information involves different data, boundaries, estimates and expertise. ISSA 5000 is final but generally effective only for periods beginning on or after 15 December 2026, with earlier application permitted.',
    spec: {
      layout: 'decision', title: '11 How Is Sustainability and Non-Financial Assurance Developing?', kicker: '',
      root: { label: 'Request for sustainability assurance', detail: 'e.g. over emissions information' },
      question: 'Are there actual requirements, suitable criteria, reliable data and qualified practitioners?',
      branches: [
        { condition: 'All confirmed', outcome: 'Plan the engagement', detail: 'With data control and specialist collaboration', tone: 'positive' },
        { condition: 'Framework or timing unclear', outcome: 'Verify before promising a conclusion', detail: 'Whether, when and under which framework it applies', tone: 'caution' },
        { condition: 'Data or competence missing', outcome: 'Do not promise a conclusion', tone: 'negative' },
      ],
      takeaway: 'Opportunity depends on actual reporting requirements, suitable criteria, reliable data and qualified practitioners—not generic ESG interest.',
    },
  },
  'professional-audit-m5-12': {
    heading: 'Digital assurance splits into controls, data, provider and cyber areas, each bounded by scope',
    intro: 'Technology risks arise in financial reporting and in separate engagements over controls or other digital subject matter. A controls engagement does not guarantee immunity from every cyber threat.',
    spec: {
      layout: 'taxonomy', title: '12 How Are Cybersecurity, Data and Technology Assurance Evolving?', kicker: '',
      root: 'Digital assurance subject matter', rootDetail: 'Each area needs its own scope, criteria and evidence',
      groups: [
        { label: 'Controls', items: ['IT general control', 'Application control'] },
        { label: 'Data', items: ['Data integrity', 'Evidence security'] },
        { label: 'Providers', items: ['Third-party risk'] },
        { label: 'Cyber assurance', detail: 'Bounded conclusion, not a guarantee' },
        { label: 'Specialists', items: ['Specialist integration'] },
      ],
      note: 'Define system, period, control objective, criteria, locations, providers, limitations, specialist role, evidence and data-protection duties.',
      takeaway: 'Digital assurance conclusions remain bounded by defined scope, suitable criteria, evidence and practitioner competence.',
    },
  },
  'professional-audit-m5-13': {
    heading: 'Future demand mixes recurring audit with selective growth, limited by real constraints',
    intro: 'Recurring audit demand continues, with selective growth in sustainability, controls and technology assurance amid regulation, talent, investment and liability constraints.',
    spec: {
      layout: 'taxonomy', title: '13 What Factors Will Drive Future Audit and Assurance Demand?', kicker: '',
      root: 'Future assurance demand', rootDetail: 'Factors weighed together, not in sequence',
      groups: [
        { label: 'Recurring audit demand', detail: 'The continuing base' },
        { label: 'Selective growth', items: ['Sustainability assurance', 'Controls assurance', 'Technology assurance'] },
        { label: 'Constraints', items: ['Regulation', 'Talent', 'Investment', 'Liability'] },
        { label: 'How firms win it', items: ['Quality-led competition', 'Workforce development', 'Stakeholder communication'] },
      ],
      takeaway: 'Strong long-term positions combine competence, independent judgment, quality management, controlled technology and reliable delivery.',
    },
  },
  'professional-audit-m5-14': {
    heading: 'New assurance areas are entered in stages, with a stop-or-scale decision',
    intro: 'A firm should enter an adjacent assurance area only when criteria, market demand, competence, independence, quality systems and economics are credible.',
    spec: {
      layout: 'flow', title: '14 Where Are New Opportunities Emerging in Vietnam and Global Markets?', kicker: '',
      steps: [
        { label: 'Test credibility', detail: 'Criteria, demand, competence, independence, economics' },
        { label: 'Staged capability investment', detail: 'Build skills and quality systems step by step' },
        { label: 'Apply acceptance criteria', detail: 'Current standards and engagement acceptance' },
        { label: 'Watch leading quality signals', detail: 'Early evidence the work is sound' },
        { label: 'Stop or scale', kind: 'decision', detail: 'Expand only what proves credible' },
      ],
      loop: 'A risk-based portfolio revisits each area as conditions change.',
      takeaway: 'Strong long-term positions combine competence, independent judgment, quality management, controlled technology and reliable delivery.',
    },
  },
  'professional-audit-m5-15': {
    heading: 'A strong position rests on five capabilities, including controlled technology and resilience',
    intro: 'Long-term positioning combines competence, independent judgment, quality management, controlled technology and reliable delivery.',
    spec: {
      layout: 'driverTree', title: '15 How Should Audit Firms Position Themselves?', kicker: '',
      root: { label: 'Strong long-term position', detail: 'Built from all five together' },
      drivers: [
        { label: 'Competence', detail: 'Qualified people and skills' },
        { label: 'Independent judgment', detail: 'Credible conclusions' },
        { label: 'Quality management', detail: 'Leading quality signals' },
        { label: 'Controlled technology', detail: 'Governed technology investment', children: [{ label: 'Technology investment' }] },
        { label: 'Reliable delivery', detail: 'Keeps working under disruption', children: [{ label: 'Operational resilience' }] },
      ],
      takeaway: 'Strong long-term positions combine competence, independent judgment, quality management, controlled technology and reliable delivery.',
    },
  },
};
