import type { ConstructionAdvisoryChapterVisual } from './constructionAdvisoryVisualSpecs';

/** Chapter-specific Learning Visuals for Project & Construction Advisory Module 04, keyed by visualKind. */
export const CONSTRUCTION_ADVISORY_M4_VISUALS: Record<string, ConstructionAdvisoryChapterVisual> = {
  'professional-advisory-m4-1': {
    heading: 'A major programme and an independent cost review are different competitive contests',
    intro: 'Global multidisciplinary firms, specialist consultancies and domestic providers compete across different service and project scopes. A major infrastructure programme needs multidisciplinary scale, while an independent cost review can suit a focused specialist.',
    spec: {
      layout: 'compare', title: '01 How Competitive Is Project & Construction Advisory?', kicker: '',
      leftTitle: 'Major infrastructure programme', rightTitle: 'Independent cost review',
      rows: [
        { label: 'Mandate type', a: 'Multidisciplinary mandate', b: 'Focused specialist assignment' },
        { label: 'Scope of work', a: 'Integrated programme across disciplines', b: 'One defined review question' },
        { label: 'Credible rivals', a: 'Firms with multidisciplinary scale', b: 'Focused specialists as well as larger firms' },
        { label: 'Sector expertise', a: 'Needed across several asset systems', b: 'Needed in the reviewed discipline' },
      ],
      note: 'Define the tendered service, asset, complexity, period, team and local requirements before comparing provider position.',
      takeaway: 'Competition differs across specialist assignments, integrated programmes, sectors, clients and geographic markets rather than forming one uniform market.',
    },
  },
  'professional-advisory-m4-2': {
    heading: 'Competitive forces are read per arena: specialist, local and cross-border work face different rivals',
    intro: 'Before applying a forces analysis, define which market the tender sits in. Rivalry among global, specialist and domestic providers changes with the scope being bought.',
    spec: {
      layout: 'table', title: '02 How Do Porter\'s Five Forces Apply to Construction Consulting?', kicker: '',
      headers: ['Competitive arena', 'Rivals the client weighs', 'What decides position'],
      rows: [
        { label: 'Specialist assignment', a: 'Specialist consultancies', b: 'Depth in the defined service' },
        { label: 'Local delivery', a: 'Domestic providers', b: 'Local requirements and team' },
        { label: 'Geographic reach', a: 'Global multidisciplinary firms', b: 'Capacity across markets and scopes' },
      ],
      note: 'The same firm can be strong in one arena and weak in another; compare position only after the tendered service, asset, complexity, period and team are defined.',
      takeaway: 'Competition differs across specialist assignments, integrated programmes, sectors, clients and geographic markets rather than forming one uniform market.',
    },
  },
  'professional-advisory-m4-3': {
    heading: 'Entry barriers decide whether a new firm bids for full mandates or enters through a niche',
    intro: 'Credentials, references, risk systems, talent and procurement requirements create entry conditions. A new firm may enter through independent schedule reviews rather than attempting full programme management without supporting capacity.',
    spec: {
      layout: 'decision', title: '03 What Creates Barriers to Entry and Competitive Differentiation?', kicker: '',
      root: { label: 'New or smaller firm', detail: 'Choosing which mandates to pursue' },
      question: 'Does it hold the qualification, relevant experience, reputation, insurance, specialist talent and tender compliance the mandate requires?',
      branches: [
        { condition: 'Full evidence and capacity', outcome: 'Compete for high-value mandates', tone: 'positive' },
        { condition: 'Niche expertise only', outcome: 'Enter a specialist segment', detail: 'e.g. independent schedule reviews', tone: 'caution' },
        { condition: 'Neither evidence nor niche', outcome: 'Do not bid for full programme management', tone: 'negative' },
      ],
      note: 'Clients verify licenses, named professionals, insurance, references, quality controls, financial capacity and continuing delivery resources.',
      takeaway: 'Trust and delivery evidence create barriers in high-value mandates while specialization allows smaller firms to compete in selected segments.',
    },
  },
  'professional-advisory-m4-4': {
    heading: 'Large global providers compete on engineering breadth, technical advisory and global mobilization',
    intro: 'Large providers such as AECOM, Arcadis, WSP and AtkinsRéalis offer engineering, infrastructure and project-related services. An international client compares firms on sector depth, geographic reach, team availability and programme governance, not on name alone.',
    spec: {
      layout: 'taxonomy', title: '04 Who Are the Major Global Project and Engineering Advisory Firms?', kicker: '',
      root: 'Global multidisciplinary providers', rootDetail: 'Capabilities they compete on, plus examples named in this chapter',
      groups: [
        { label: 'Engineering breadth', detail: 'Engineering and infrastructure services across disciplines' },
        { label: 'Technical advisory', detail: 'Project-related advice on complex mandates' },
        { label: 'Global mobilization', detail: 'International experience and teams' },
        { label: 'Examples named (unranked)', detail: 'Alphabetical; not a ranking', items: ['AECOM', 'Arcadis', 'AtkinsRéalis', 'WSP'] },
      ],
      note: 'For a specific mandate, confirm the legal entity, current local services, nominated team, specialist access, subcontractors and delivery record.',
      takeaway: 'Global firms compete through multidisciplinary capability, established systems, international experience and complex stakeholder management.',
    },
  },
  'professional-advisory-m4-5': {
    heading: 'Multidisciplinary firms sell established systems across a programme; specialists are bought for a defined task',
    intro: 'Multidisciplinary firms compete through programme management, broad capability and established delivery systems. A client should compare sector depth, team availability and programme governance for the mandate rather than firm type alone.',
    spec: {
      layout: 'compare', title: '05 How Do Specialist and Multidisciplinary Consulting Firms Differ?', kicker: '',
      leftTitle: 'Multidisciplinary firm', rightTitle: 'Specialist firm',
      rows: [
        { label: 'Programme management', a: 'Integrated across disciplines and stakeholders', b: 'Bought for a defined part of the scope' },
        { label: 'Sustainability', a: 'Offered within a broad service range', b: 'Engaged as a separate specialist input' },
        { label: 'Delivery system', a: 'Established systems and international experience', b: 'Focused methods for one discipline' },
        { label: 'What the client tests', a: 'Team availability behind the brand', b: 'Depth and capacity for the mandate' },
      ],
      note: 'Compare on sector depth, geographic reach, team availability and programme governance, not name alone.',
      takeaway: 'Global firms compete through multidisciplinary capability, established systems, international experience and complex stakeholder management.',
    },
  },
  'professional-advisory-m4-6': {
    heading: 'In Vietnam, specialist firms and domestic providers can split commercial control from local coordination',
    intro: 'Specialist firms such as Turner & Townsend and Rider Levett Bucknall operate alongside domestic engineering, cost, design and project-management providers. A domestic provider may support approvals and market coordination while a specialist international adviser manages commercial controls.',
    spec: {
      layout: 'taxonomy', title: '06 Which Firms and Organizations Operate in Vietnam\'s Advisory Market?', kicker: '',
      root: 'Advisory providers in Vietnam', rootDetail: 'Grouped by role, not ranked',
      groups: [
        { label: 'Specialist firms', detail: 'Examples named in this chapter, alphabetical', items: ['Rider Levett Bucknall', 'Turner & Townsend'] },
        { label: 'Domestic providers', detail: 'Local knowledge, approvals and market coordination', items: ['Engineering', 'Cost', 'Design', 'Project management'] },
        { label: 'Specialist services in scope', items: ['Quantity surveying', 'Cost management', 'Project controls', 'Claims', 'Technical due diligence'] },
      ],
      note: 'Compare actual specialist depth, local rates and evidence, continuity, licensed scope, partner dependence and quality-review arrangements.',
      takeaway: 'Focused expertise, senior attention, responsiveness and local market knowledge provide credible alternatives to broad service portfolios.',
    },
  },
  'professional-advisory-m4-7': {
    heading: 'Benchmark firms on evidence that fits the assignment, not on the size of their portfolio',
    intro: 'Firms are compared on relevant service coverage, sector depth, resources, information systems, geographic reach and demonstrated experience. A client benchmarks industrial commissioning experience and controls capability rather than total company headcount.',
    spec: {
      layout: 'table', title: '07 How Should Construction Advisory Firms Be Compared?', kicker: '',
      headers: ['Criterion', 'Size signal (weak)', 'Assignment-fit evidence'],
      rows: [
        { label: 'Service breadth', a: 'Length of the service list', b: 'Services this assignment needs' },
        { label: 'Sector experience', a: 'Total company headcount', b: 'e.g. industrial commissioning experience' },
        { label: 'Project reference', a: 'Generic project list', b: 'Comparable local references' },
        { label: 'BIM capability', a: 'Tools named in the bid', b: 'Validated digital capability' },
        { label: 'Project controls', a: 'Claimed methods', b: 'Sample deliverables and named personnel' },
        { label: 'Geographic delivery', a: 'Countries covered', b: 'Team workload for this location' },
      ],
      note: 'Risk systems belong in the same test: ask how they would apply to this assignment.',
      takeaway: 'A larger portfolio does not prove better performance; fit must be tested against the assignment’s specific technical and delivery needs.',
    },
  },
  'professional-advisory-m4-8': {
    heading: 'Commercial bids can only be compared after they are normalized to the same basis',
    intro: 'Commercial benchmarking compares fee, effort, delivery method, reporting and continuity. A client compares total fees with team seniority, planned effort, exclusions, reporting method and relevant references.',
    spec: {
      layout: 'flow', title: '08 How Do Technical Capabilities, Project Portfolios and Delivery Models Differ?', kicker: '',
      steps: [
        { label: 'Normalize the bids', detail: 'Taxes, currency, reimbursables, duration, staff location, payment terms' },
        { label: 'Read the fee basis', detail: 'Total fee against planned effort and seniority' },
        { label: 'Align assumptions', detail: 'Same scope and exclusions in every bid' },
        { label: 'Test milestone delivery', detail: 'Delivery method and reporting', kind: 'decision' },
        { label: 'Weigh client continuity', detail: 'Team continuity and relevant references', kind: 'outcome' },
      ],
      note: 'A lower total fee can reflect fewer hours, more junior staff or wider exclusions rather than better value.',
      takeaway: 'Clients assess both professional capability and the quality, reliability and transparency of the working relationship.',
    },
  },
  'professional-advisory-m4-9': {
    heading: 'Lasting advantage comes from capable staffing plus a transparent, reliable working relationship',
    intro: 'Clients assess both professional capability and the quality of the relationship. Staffing plans, clear exclusions and reporting quality are where that relationship becomes visible.',
    spec: {
      layout: 'driverTree', title: '09 Which Capabilities Explain Sustainable Competitive Advantage?', kicker: '',
      root: { label: 'Sustainable competitive advantage', detail: 'Clients keep choosing the firm' },
      drivers: [
        { label: 'Professional capability', detail: 'Shown in the staffing plan', children: [{ label: 'Team seniority' }, { label: 'Planned effort' }] },
        { label: 'Transparency', detail: 'No surprises after appointment', children: [{ label: 'Stated exclusions' }, { label: 'Explicit assumptions' }] },
        { label: 'Reliability', detail: 'Seen in delivery and communication', children: [{ label: 'Reporting quality' }, { label: 'Responsiveness' }] },
      ],
      note: 'Evidence of agreed outcomes on past mandates supports all three drivers.',
      takeaway: 'Clients assess both professional capability and the quality, reliability and transparency of the working relationship.',
    },
  },
  'professional-advisory-m4-10': {
    heading: 'Credible advice passes from competent analysis through controls and independent review before it is issued',
    intro: 'Specialist competence and disciplined delivery systems support decision quality. A firm performs an independent quality review before issuing a high-consequence project-risk assessment.',
    spec: {
      layout: 'flow', title: '10 Why Do Technical Expertise and Professional Credibility Matter?', kicker: '',
      steps: [
        { label: 'Competent analysis', detail: 'Role-appropriate qualifications and supervision', owner: 'Specialist' },
        { label: 'Controlled evidence', detail: 'Project controls and source records', owner: 'Delivery team' },
        { label: 'Independent quality review', detail: 'Challenge before a high-consequence issue', kind: 'decision', owner: 'Reviewer' },
        { label: 'Reliable recommendation', detail: 'Issued with clear limits on reliance', kind: 'outcome' },
      ],
      note: 'Keep review evidence: it shows the client how the recommendation was assured.',
      takeaway: 'Professional credibility becomes valuable when it produces reliable recommendations, clear reporting and controlled project outcomes.',
    },
  },
  'professional-advisory-m4-11': {
    heading: 'Controlled project outcomes depend on judgment, commercial skill and a traceable record',
    intro: 'Disciplined delivery supports cost, schedule, risk, change and decision quality. Professional judgment is the accountable application of expertise to evidence, uncertainty, standards and project context.',
    spec: {
      layout: 'driverTree', title: '11 How Do Project Delivery, Cost Control and Risk Management Create Value?', kicker: '',
      root: { label: 'Controlled project outcome', detail: 'Value the client can see' },
      drivers: [
        { label: 'Professional judgment', detail: 'Expertise applied to evidence and uncertainty', children: [{ label: 'Risk assessment' }, { label: 'Decision quality' }] },
        { label: 'Commercial skill', detail: 'Keeps cost and change controlled', children: [{ label: 'Cost control' }, { label: 'Change management' }] },
        { label: 'Traceable record', detail: 'Shows how advice was reached', children: [{ label: 'Source records' }, { label: 'Review evidence' }] },
      ],
      note: 'Maintain supervision and clear limits on reliance so the record supports accountability.',
      takeaway: 'Professional credibility becomes valuable when it produces reliable recommendations, clear reporting and controlled project outcomes.',
    },
  },
  'professional-advisory-m4-12': {
    heading: 'Growth rests on four capability groups: trusted relationships, specialist people, efficient systems and adaptability',
    intro: 'Relationship, workforce, technology and knowledge capabilities improve delivery quality and scalability. A consultancy may develop an industrial specialist team and consistent digital reporting across several projects.',
    spec: {
      layout: 'taxonomy', title: '12 How Do Talent, Client Trust and Digital Capability Support Growth?', kicker: '',
      root: 'Capabilities for scalable growth', rootDetail: 'Built together, not one after another',
      groups: [
        { label: 'Trusted relationships', items: ['Transparent advice', 'Client relationship'] },
        { label: 'Specialist people', items: ['Talent retention', 'Sector skills'] },
        { label: 'Efficient systems', items: ['BIM', 'Integrated reporting', 'Knowledge management'] },
        { label: 'Adaptability', detail: 'Changing services as client requirements change' },
      ],
      note: 'Invest in project leadership, cost, contracts, planning, BIM, data security and sector skills while protecting professional challenge.',
      takeaway: 'Sustainable advantage combines trusted relationships, specialist people, efficient systems and adaptation to changing client requirements.',
    },
  },
  'professional-advisory-m4-13': {
    heading: 'Industry SWOT: independent expertise is the core strength; talent dependence and liability are the exposures',
    intro: 'Strengths, weaknesses, opportunities and threats are potential industry characteristics, not universal firm conditions. Each must be assessed by service line, sector, office, client mix and project stage.',
    spec: {
      layout: 'taxonomy', title: '13 What Are the Industry\'s Main Strengths and Weaknesses?', kicker: '',
      root: 'Industry-level SWOT', rootDetail: 'Potential characteristics — test each against a real firm',
      groups: [
        { label: 'Strengths', items: ['Independent expertise', 'Independent oversight'] },
        { label: 'Weaknesses', items: ['Talent dependence', 'Project cycles', 'Fee-based revenue'] },
        { label: 'Opportunities', items: ['Infrastructure opportunity'] },
        { label: 'Threats', items: ['Liability threat'] },
      ],
      note: 'Assess SWOT by service line, sector, office, client mix, project stage and evidence rather than applying one generic score.',
      takeaway: 'Professional expertise and independent oversight are strengths, while talent dependence, project cycles and fee-based revenue create vulnerability.',
    },
  },
  'professional-advisory-m4-14': {
    heading: 'Each opportunity carries a matching threat that must be managed alongside it',
    intro: 'Opportunities and threats are potential characteristics rather than universal conditions. A consultancy may expand digital project-controls capability while managing training, technology cost and data risk.',
    spec: {
      layout: 'compare', title: '14 What Opportunities and Threats Shape Construction Advisory?', kicker: '',
      leftTitle: 'Opportunity', rightTitle: 'Threat to manage',
      rows: [
        { label: 'Digital controls', a: 'Expanded project-controls capability', b: 'Training, technology cost and data risk' },
        { label: 'Transferable method', a: 'Methods reused across projects and sectors', b: 'Applied without local evidence' },
        { label: 'Project cycle', a: 'New projects create advisory demand', b: 'Fee-based revenue falls when projects pause' },
      ],
      note: 'Assess each item by service line, sector, office, client mix and project stage.',
      takeaway: 'Professional expertise and independent oversight are strengths, while talent dependence, project cycles and fee-based revenue create vulnerability.',
    },
  },
  'professional-advisory-m4-15': {
    heading: 'A growth move goes ahead only when capability is ready and quality, margin and resilience stay protected',
    intro: 'Firms face exposure from staffing, pricing, delayed projects, liability, weak information, digital change and client concentration. One firm diversified from commercial property into infrastructure only after building sector expertise and controls capacity.',
    spec: {
      layout: 'decision', title: '15 What Strategic Choices Must Advisory Firms Make?', kicker: '',
      root: { label: 'Proposed growth move', detail: 'e.g. entering a new sector' },
      question: 'Are sector expertise and controls capacity in place, with talent, fee, liability and data exposures managed?',
      branches: [
        { condition: 'Capability built, exposures managed', outcome: 'Diversify into the new sector', tone: 'positive' },
        { condition: 'Capability partly built', outcome: 'Build expertise and controls first', detail: 'Stage investment before taking mandates', tone: 'caution' },
        { condition: 'Exposures unmanaged', outcome: 'Do not expand yet', detail: 'e.g. talent shortage, fee pressure, market concentration', tone: 'negative' },
      ],
      note: 'Track pipeline quality, backlog, staffing, utilization, fee realization, collections, claims, client concentration and quality events.',
      takeaway: 'Growth is sustainable only when firms protect professional quality, margin and delivery resilience while adapting their services.',
    },
  },
};
