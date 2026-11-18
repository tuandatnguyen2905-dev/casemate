// Audit & Assurance Module 03, one deck per lesson (apps/IndustryKnowledge/auditAssuranceModule03.tsx).
// Excerpts are verbatim from the rendered chapter text. Held chapters carry no cards and no chapter-specific figures are quoted.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const ch = (title: string) => ({ title, sourceTitle: title, citations: [] as string[] });

const COMMON = {
  industryId: 'professional-audit',
  industryLabel: 'Audit & Assurance',
  moduleId: 'pa-m03',
  moduleLabel: 'Module 03',
  moduleKey: 'PROFESSIONAL_AUDIT_MODULE03',
  file: 'apps/IndustryKnowledge/auditAssuranceModule03.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const PA_M3_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m3-industry-business-models',
  title: 'Audit & Assurance: Industry Business Models',
  description: 'Key ideas from the Industry Business Models lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m3-l1',
  lessonTitle: 'Industry Business Models',
  chapterIdPrefix: 'pa-m3-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 1 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('How Do Independent Audit Firms Make Money?'),
    ch('How Do Partnerships, Networks and Local Member Firms Differ?'),
    ch('How Do Specialist Assurance and Permitted Adjacent Services Fit?'),
  ],
  cards: [
    {
      id: 'pa31-partnership-alignment',
      ch: 2,
      front: 'When does partnership align expertise and client accountability?',
      back: 'Only when governance and incentives reinforce independence and quality.',
      explanation: 'Partnership is not enough on its own. Governance and incentives must support independence and quality.',
      example: 'If governance and incentives do not reinforce independence and quality, partnership does not align expertise and client accountability.',
      terms: ['Partnership', 'Governance'],
      refs: [
        [2, 'Partnership aligns expertise and client accountability only when governance and incentives reinforce independence and quality.'],
      ],
    },
    {
      id: 'pa31-network-firms-separate-entities',
      ch: 2,
      front: 'Network firms share methods and brand. What must still be understood about responsibility?',
      back: 'Network firms can remain separate legal entities, so contractual and engagement responsibility must be understood.',
      explanation: 'Sharing methods and brand does not merge the firms. Responsibility depends on who contracts and who performs the engagement.',
      example: 'A client of a network firm should understand which legal entity holds the contract and the engagement responsibility.',
      terms: ['Network firm', 'Legal entity'],
      refs: [
        [2, 'Network firms can share methods and brand while remaining separate legal entities, so contractual and engagement responsibility must be understood.'],
      ],
    },
    {
      id: 'pa31-align-leadership-incentives',
      ch: 3,
      front: 'Which items does the chapter say to align under current Vietnamese requirements?',
      back: 'Leadership incentives, client acceptance, partner portfolios, quality indicators and legal responsibility.',
      explanation: 'The list ties leadership incentives to client acceptance, partner portfolios, quality indicators and legal responsibility.',
      example: 'When reviewing partner portfolios, a firm checks them against client acceptance, quality indicators and legal responsibility.',
      terms: ['Partner portfolios', 'Quality indicators'],
      refs: [
        [3, 'Align leadership incentives, client acceptance, partner portfolios, quality indicators and legal responsibility under current Vietnamese requirements.'],
      ],
    },
  ],
});

const PA_M3_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m3-products-services-and-segmentation',
  title: 'Audit & Assurance: Products, Services & Segmentation',
  description: 'Key ideas from the Products, Services & Segmentation lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m3-l2',
  lessonTitle: 'Products, Services & Segmentation',
  chapterIdPrefix: 'pa-m3-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card. Cards on chapters 1 and 2 were replaced with new IDs when those chapters were rewritten; the retired IDs are listed in RETIRED_CARD_IDS.',
  ],
  chapters: [
    ch('How Are Financial Audit and Other Assurance Services Segmented?'),
    ch('How Do Review, Agreed-Upon Procedures and Advisory Differ?'),
    ch('Which Financial Reporting Areas Commonly Drive Audit Work?'),
  ],
  cards: [
    {
      id: 'pa32-segments-by-assurance-level',
      ch: 1,
      front: 'How are audit and assurance services segmented, rather than by price?',
      back: 'By the question each one answers: assurance level, subject matter, criteria and intended user.',
      explanation: 'An audit, a review, other assurance and agreed-upon procedures differ in the confidence they give and in who they serve.',
      example: 'A statutory audit opinion, a lender’s agreed-upon procedures and assurance over a non-financial indicator are three different segments.',
      terms: ['Assurance level', 'Intended user'],
      refs: [
        [1, 'Audit and assurance services are segmented by the question each one answers, not by price.'],
        [1, 'Each segment differs in assurance level, subject matter, criteria and intended user.'],
      ],
    },
    {
      id: 'pa32-law-decides-requirement-not-service',
      ch: 1,
      front: 'What changes when a service is required by law rather than bought voluntarily?',
      back: 'Who sets the requirement changes, not what the service is.',
      explanation: 'A legally required audit and a voluntary audit are the same kind of service; only the source of the requirement differs.',
      example: 'A company chooses an audit for its lender. The service is still an audit, with the same standard and report.',
      terms: ['Statutory audit', 'Voluntary audit'],
      refs: [
        [1, 'Whether a service is required by law or bought voluntarily changes who sets the requirement, not what the service is.'],
      ],
    },
    {
      id: 'pa32-agreed-upon-procedures-no-assurance',
      ch: 2,
      front: 'Do agreed-upon procedures give an opinion or an assurance conclusion?',
      back: 'No. They report the procedures performed and factual findings only, and users draw their own conclusions.',
      explanation: 'Agreed-upon procedures sit outside assurance, so they should not be read as a lighter audit.',
      example: 'A lender receives a list of findings from specified checks and decides for itself what they mean.',
      terms: ['Agreed-upon procedures', 'Factual findings'],
      refs: [
        [2, 'no opinion or assurance conclusion is expressed, and users draw their own conclusions'],
      ],
    },
    {
      id: 'pa32-review-vs-audit-evidence',
      ch: 2,
      front: 'How does the evidence obtained in a review compare with an audit, and what level of assurance results?',
      back: 'A review obtains less evidence than an audit and gives limited assurance.',
      explanation: 'The lower level of work gives a lower level of assurance, expressed in the form the applicable standard requires.',
      example: 'A practitioner who performs a review concludes with limited assurance rather than an audit opinion.',
      terms: ['Review engagement', 'Limited assurance'],
      refs: [
        [2, 'A review gives limited assurance: the practitioner obtains less evidence than in an audit and concludes in the form the applicable standard requires.'],
      ],
    },
    {
      id: 'pa32-reporting-areas-driving-audit-work',
      ch: 3,
      front: 'Which financial reporting areas does the chapter say commonly drive audit work?',
      back: 'Revenue, inventory, receivables, provisions, estimates, related parties and going concern.',
      explanation: 'The chapter points to assertions and risks within significant transaction classes, balances and disclosures.',
      example: 'A team planning an audit starts with the areas where significant balances and estimates sit, such as revenue and inventory.',
      terms: ['Revenue', 'Going concern'],
      refs: [
        [3, 'including revenue, inventory, receivables, provisions, estimates, related parties and going concern.'],
      ],
    },
    {
      id: 'pa32-inventory-vs-revenue-evidence',
      ch: 3,
      front: 'How do the evidence concerns for inventory differ from those for revenue?',
      back: 'For inventory, existence, condition, costing and net realizable value may require different evidence; for revenue, occurrence, cutoff and contract terms can drive procedures.',
      explanation: 'Each area has its own assertions, so the evidence and procedures differ.',
      example: 'The team tests inventory for existence and condition but tests revenue for occurrence and cutoff.',
      terms: ['Inventory', 'Revenue'],
      refs: [
        [3, 'For inventory, existence, condition, costing and net realizable value may require different evidence; for revenue, occurrence, cutoff and contract terms can drive procedures.'],
      ],
    },
  ],
});

const PA_M3_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m3-customer-segments-and-needs',
  title: 'Audit & Assurance: Customer Segments & Needs',
  description: 'Key ideas from the Customer Segments & Needs lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m3-l3',
  lessonTitle: 'Customer Segments & Needs',
  chapterIdPrefix: 'pa-m3-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card. Cards on chapters 1 and 2 were replaced with new IDs when the lesson was rewritten; the retired IDs are listed in RETIRED_CARD_IDS.',
  ],
  chapters: [
    ch('Who Purchases or Requires Audit and Assurance?'),
    ch('How Do Public-Interest, Private, Group and Voluntary Needs Differ?'),
    ch('How Do Governance, Regulators and Intended Users Evaluate Audit?'),
  ],
  cards: [
    {
      id: 'pa33-buyer-is-not-always-user',
      ch: 1,
      front: 'Is the party that appoints and pays for an audit always the party that relies on the report?',
      back: 'No. Intended users, not the buyer, define what the engagement must achieve.',
      explanation: 'The buyer is not always the user, which is why independence protects intended users from pressure by the party that pays.',
      example: 'A company hires the auditor, but investors and lenders rely on the audited statements.',
      terms: ['Intended user', 'Appointing party'],
      refs: [
        [1, 'The buyer is not always the user.'],
        [1, 'intended users, not the buyer, define what the engagement must achieve'],
      ],
    },
    {
      id: 'pa33-statutory-and-voluntary-demand',
      ch: 1,
      front: 'What are two different reasons an entity might have its financial statements audited?',
      back: 'Law or regulation can require it, or owners, lenders, investors or a parent group can ask for assurance voluntarily.',
      explanation: 'Demand comes both from legal requirements and from parties who want confidence in reported information.',
      example: 'One company is audited because law requires it; another because its lender makes audited statements a loan condition.',
      terms: ['Statutory requirement', 'Voluntary engagement'],
      refs: [
        [1, 'Law or regulation can require certain entities to have their financial statements audited.'],
        [1, 'Other entities buy an audit voluntarily because owners, lenders, investors or a parent group ask for assurance.'],
      ],
    },
    {
      id: 'pa33-client-category-changes-requirements',
      ch: 2,
      front: 'What does a client’s category change about an audit, and what does it not change?',
      back: 'It changes the requirements around the audit, but not the need for sufficient appropriate evidence.',
      explanation: 'Public-interest, private, group and voluntary audits differ in users and extra requirements, not in the evidence standard.',
      example: 'A listed company’s audit can carry extra independence requirements, yet every audit still needs sufficient appropriate evidence.',
      terms: ['Public-interest entity', 'Private company'],
      refs: [
        [2, 'A client’s category changes the requirements around the audit, not the need for sufficient appropriate evidence.'],
      ],
    },
    {
      id: 'pa33-group-needs-one-opinion',
      ch: 2,
      front: 'For a group audit, what is the need, and which standard does it bring in?',
      back: 'One coherent opinion built on component information, which brings in ISA 600 (Revised).',
      explanation: 'The group team must direct and evaluate component work to support a single group opinion.',
      example: 'A multinational needs one opinion on its group statements, built on work done across several components.',
      terms: ['Group audit', 'Reporting complexity'],
      refs: [
        [2, 'For groups, the need is one coherent opinion built on component information, which brings in ISA 600 (Revised).'],
      ],
    },
    {
      id: 'pa33-three-groups-judge-audit',
      ch: 3,
      front: 'How do those charged with governance, regulators and intended users each form a view of an audit?',
      back: 'Governance bodies through communications about the audit, independence and quality; regulators through inspection and remediation of findings; users mainly through the auditor’s report.',
      explanation: 'Each group looks at different evidence, because users cannot see the audit work itself.',
      example: 'An audit committee asks about independence, a regulator inspects the firm, and a lender reads only the opinion.',
      terms: ['Governance oversight', 'Regulatory inspection'],
      refs: [
        [3, 'Those charged with governance, such as an audit committee, evaluate the auditor through communications about the audit, independence and quality.'],
        [3, 'Regulators evaluate audit through inspection of a firm’s quality management and selected engagements, and expect findings to be remediated.'],
        [3, 'Intended users cannot see the work and judge an audit mainly through the auditor’s report and the reputation behind it.'],
      ],
    },
    {
      id: 'pa33-quality-judged-through-evidence',
      ch: 3,
      front: 'How is audit quality judged from outside the firm?',
      back: 'Through evidence, not claims: communications, inspection results and remediation.',
      explanation: 'The report alone tells users little about how well the work was done.',
      example: 'A firm that shows how it fixed an inspection finding gives more evidence of quality than one that only states quality is a priority.',
      terms: ['Remediation', 'Audit quality'],
      refs: [
        [3, 'Quality is judged from outside through evidence, not claims.'],
      ],
    },
  ],
});

const PA_M3_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m3-revenue-streams-and-cost-structure',
  title: 'Audit & Assurance: Revenue Streams & Cost Structure',
  description: 'Key ideas from the Revenue Streams & Cost Structure lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m3-l4',
  lessonTitle: 'Revenue Streams & Cost Structure',
  chapterIdPrefix: 'pa-m3-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Do Audit Engagements Generate Revenue?'),
    ch('What Determines Audit Delivery Costs and Profitability?'),
    ch('Which KPIs Explain Audit-Firm Performance?'),
  ],
  cards: [
    {
      id: 'pa34-engagement-contribution-calculation',
      ch: 1,
      front: 'HYPOTHETICAL: an audit has a fee of 1,200,000,000, 4,000 professional hours at a cost of 180,000 per hour, specialists costing 120,000,000 and other delivery cost of 160,000,000. What are the contribution and margin?',
      back: 'Labor is 720,000,000 and total delivery cost is 1,000,000,000. Contribution is 200,000,000 (1,200,000,000 less 1,000,000,000) and margin is 16.7 percent.',
      explanation: 'Labor comes from hours times cost per hour; add specialists and other delivery cost; subtract the total from the fee; divide by the fee for the margin.',
      example: 'This is a hypothetical calculation for practice, not a statement about real audit margins.',
      terms: ['Contribution margin', 'Delivery cost'],
      refs: [
        [1, 'HYPOTHETICAL calculation: labor=4,000×0.18m=720m; total delivery cost=720+120+160=1,000m; contribution=1,200−1,000=200m; margin=16.7%.'],
        [1, 'A VND1,200m fee less 4,000 professional hours at VND180,000 cost, VND120m specialists and VND160m other delivery cost gives VND200m contribution, or 16.7%.'],
      ],
    },
    {
      id: 'pa34-different-revenue-bases',
      ch: 1,
      front: 'Which five measures occur on different bases in an audit engagement?',
      back: 'Contract value, invoice, recognized revenue, cash and profit.',
      explanation: 'Contract value, invoice, recognized revenue, cash and profit occur on different bases, so they are not interchangeable.',
      example: 'Contract value, invoice, recognized revenue, cash and profit each have their own basis, so a team reports them separately.',
      terms: ['Recognized revenue', 'Contract value'],
      refs: [
        [1, 'Contract value, invoice, recognized revenue, cash and profit occur on different bases.'],
      ],
    },
    {
      id: 'pa34-margin-not-quality',
      ch: 2,
      front: 'Does high utilization or engagement margin automatically indicate high audit quality?',
      back: 'No. Commercial pressure must not override required evidence, supervision, independence or review.',
      explanation: 'High utilization or margin is an economic result and does not by itself show that evidence, supervision, independence or review were adequate.',
      example: 'A low-fee engagement with weak records can need more senior time; reducing procedures to protect margin is not an acceptable response.',
      terms: ['Utilization', 'Audit quality'],
      refs: [
        [2, 'High utilization or engagement margin does not automatically indicate high audit quality; commercial pressure must not override required evidence, supervision, independence or review.'],
        [2, 'A low-fee engagement can require more senior time when records are weak or estimates complex; reducing procedures to protect margin is not an acceptable response.'],
      ],
    },
    {
      id: 'pa34-utilization-vs-realization',
      ch: 3,
      front: 'How do utilization and realization differ?',
      back: 'Utilization is chargeable or productive time relative to available professional capacity. Realization is fees earned relative to recorded or standard billable effort. Each is under a stated or defined basis.',
      explanation: 'Utilization looks at time against capacity; realization looks at fees against billable effort.',
      example: 'Each measure is read under its stated definition or defined basis.',
      terms: ['Utilization', 'Realization'],
      refs: [
        [3, 'Chargeable or productive time relative to available professional capacity under a stated definition.'],
        [3, 'Fees earned relative to recorded or standard billable effort under a defined basis.'],
      ],
    },
    {
      id: 'pa34-kpi-needs-and-quality',
      ch: 3,
      front: 'What does every KPI need, and are audit efficiency, fee and margin the same as audit quality?',
      back: 'Every KPI needs an entity, service scope, period, numerator, denominator and accounting basis. Audit efficiency, fee and margin are not audit quality.',
      explanation: 'A KPI is only meaningful with its scope and basis stated, and the economic KPIs do not measure quality.',
      example: 'Two engagements with equal fees can have different hours, specialist needs, risk, review effort, collection timing and quality outcomes.',
      terms: ['KPI', 'Audit quality'],
      refs: [
        [3, 'Audit efficiency, fee and margin are not audit quality. Every KPI needs an entity, service scope, period, numerator, denominator and accounting basis.'],
        [3, 'Two engagements with equal fees can have different hours, specialist needs, risk, review effort, collection timing and quality outcomes.'],
      ],
    },
  ],
});

const PA_M3_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m3-engagement-economics-and-delivery-profitability',
  title: 'Audit & Assurance: Engagement Economics & Delivery Profitability',
  description: 'Key ideas from the Engagement Economics & Delivery Profitability lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m3-l5',
  lessonTitle: 'Engagement Economics & Delivery Profitability',
  chapterIdPrefix: 'pa-m3-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card. Cards on chapters 1 and 2 were replaced with new IDs when the lesson was rewritten; the retired IDs are listed in RETIRED_CARD_IDS.',
  ],
  chapters: [
    ch('How Do Staffing, Leverage and Chargeable Hours Shape Economics?'),
    ch('How Do Utilization, Billing Rates and Realization Affect Revenue?'),
    ch('Why Must Audit Quality Indicators Remain Separate From Financial KPIs?'),
  ],
  cards: [
    {
      id: 'pa35-leverage-matches-complexity',
      ch: 1,
      front: 'What should staff leverage match, and what does cutting senior time indiscriminately increase?',
      back: 'Leverage should match task complexity with competence and supervision; cutting senior time indiscriminately to protect margin increases rework and quality risk.',
      explanation: 'Leverage is about fit between task, competence and supervision, not about cutting senior time.',
      example: 'A team that removes senior review from complex estimates may find errors late and add unbudgeted rework.',
      terms: ['Staff leverage', 'Supervision'],
      refs: [
        [1, 'Effective leverage matches task complexity with competence and supervision. Cutting senior time indiscriminately to protect margin increases rework and quality risk.'],
      ],
    },
    {
      id: 'pa35-automation-changes-junior-tasks',
      ch: 1,
      front: 'Automation can change junior tasks. What still needs experienced people and supervision?',
      back: 'Judgment on complex estimates, contradictions and conclusions.',
      explanation: 'Automation changes the task mix, but experienced judgment and supervision remain necessary.',
      example: 'Even when a tool completes routine tasks, an experienced professional reviews the complex estimates and contradictions.',
      terms: ['Team hierarchy', 'Supervision'],
      refs: [
        [1, 'Automation can change junior tasks, but judgment on complex estimates, contradictions and conclusions still needs experienced people and supervision.'],
      ],
    },
    {
      id: 'pa35-no-single-ratio-explains-revenue',
      ch: 2,
      front: 'Can utilization, billing rate or realization explain revenue on its own?',
      back: 'No. They should be read together under defined bases, and none of them measures audit quality.',
      explanation: 'Each ratio can mislead alone, so they are interpreted together and never as a reason to reduce required procedures.',
      example: 'A team reads utilization together with billing rate and realization instead of judging an engagement by one ratio.',
      terms: ['Utilization', 'Realization'],
      refs: [
        [2, 'No single ratio explains revenue.'],
        [2, 'Read utilization, billing rate and realization together under defined bases, and never treat them as measures of audit quality or as a reason to reduce required procedures.'],
      ],
    },
    {
      id: 'pa35-high-utilization-low-realization',
      ch: 2,
      front: 'What does high utilization combined with low realization mean?',
      back: 'Busy people earning little.',
      explanation: 'Utilization measures how much time is chargeable; realization shows how much of that effort is earned as fees.',
      example: 'A team whose scope grew without a fee change writes off part of its effort, so its realization is low despite full utilization.',
      terms: ['Utilization', 'Realization'],
      refs: [
        [2, 'high utilization with low realization means busy people earning little'],
      ],
    },
    {
      id: 'pa35-kpis-and-quality-indicators-separate',
      ch: 3,
      front: 'Why should audit quality indicators be reported apart from financial KPIs?',
      back: 'They answer different questions and can move in opposite directions, so blending them can let strong financial results hide weak quality.',
      explanation: 'Keeping the two views separate stops commercial strength being read as audit quality.',
      example: 'A firm shows rising margin in one view and late partner review in another, so the quality signal is not lost.',
      terms: ['Audit quality indicator', 'Financial KPI'],
      refs: [
        [3, 'The two answer different questions and can move in opposite directions, so they are defined, reported and reviewed separately.'],
        [3, 'Blending commercial measures with quality indicators lets strong financial results hide weak quality and can reward pressure that erodes it.'],
      ],
    },
  ],
});

const PA_M3_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m3-industry-ecosystem-and-stakeholders',
  title: 'Audit & Assurance: Industry Ecosystem & Stakeholders',
  description: 'Key ideas from the Industry Ecosystem & Stakeholders lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m3-l6',
  lessonTitle: 'Industry Ecosystem & Stakeholders',
  chapterIdPrefix: 'pa-m3-l6',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card. Chapter 3 had a card replaced with a new ID when the chapter was rewritten; the retired ID is listed in RETIRED_CARD_IDS.',
  ],
  chapters: [
    ch('Who Participates in the Audit and Assurance Ecosystem?'),
    ch('How Do Independence, Ethics and Conflicts Shape Services?'),
    ch('How Do Regulators, Professional Bodies and Technology Providers Shape Delivery?'),
  ],
  cards: [
    {
      id: 'pa36-independence-not-optional',
      ch: 2,
      front: 'Is independence an optional differentiator for an audit firm?',
      back: 'No. It is a condition of credible assurance and a core operating constraint.',
      explanation: 'Independence is required for credible assurance, so firms cannot treat it as a way to stand out.',
      example: 'A firm treats independence as a core operating constraint, not as a differentiator.',
      terms: ['Independence', 'Credible assurance'],
      refs: [
        [2, 'Independence is a condition of credible assurance and a core operating constraint—not an optional differentiator.'],
      ],
    },
    {
      id: 'pa36-iesba-parts-4a-4b',
      ch: 2,
      front: 'What do IESBA Parts 4A and 4B distinguish, according to the chapter example?',
      back: 'Independence requirements for audit and review engagements and independence requirements for other assurance engagements.',
      explanation: 'The two parts separate the independence requirements by type of engagement.',
      example: 'A team checks which part applies to an engagement before applying the independence requirements.',
      terms: ['IESBA', 'Independence requirements'],
      refs: [
        [2, 'IESBA Parts 4A and 4B distinguish independence requirements for audit/review and other assurance engagements.'],
      ],
    },
    {
      id: 'pa36-roles-kept-distinct',
      ch: 1,
      front: 'Why must the roles of preparer, auditor, user and overseer be kept distinct?',
      back: 'Management prepares, the auditor independently evaluates, users rely, and oversight and standards frame the work. Role confusion weakens the whole system.',
      explanation: 'Credible assurance depends on each participant staying in its own role.',
      example: 'An auditor acting as management would collapse two roles into one.',
      terms: ['Audited entity', 'Intended user'],
      refs: [
        [1, 'credible assurance depends on keeping them distinct: management prepares, the auditor independently evaluates, users rely, and oversight and standards frame the work'],
      ],
    },
    {
      id: 'pa36-standard-setters-issue-requirements',
      ch: 1,
      front: 'Which bodies issue auditing, quality-management and ethics requirements?',
      back: 'Standard setters such as the IAASB and the IESBA.',
      explanation: 'Standard setters issue the requirements; legal and oversight bodies license and supervise.',
      example: 'The IAASB issues auditing and quality standards, and the IESBA issues the Code of Ethics.',
      terms: ['Standard setter', 'Oversight body'],
      refs: [
        [1, 'Standard setters such as the IAASB and the IESBA issue auditing, quality-management and ethics requirements'],
      ],
    },
    {
      id: 'pa36-tool-use-does-not-transfer-responsibility',
      ch: 3,
      front: 'Does using a technology provider’s audit tool transfer responsibility for the work?',
      back: 'No. IAASB technology material expects tool fitness, critical evaluation of outputs and protection of confidential information.',
      explanation: 'The provider supplies the tool; the firm keeps accountability for the audit conclusion.',
      example: 'A firm adopting a new analytics platform still validates it and reviews its outputs critically.',
      terms: ['Technology provider', 'Tool validation'],
      refs: [
        [3, 'using a tool does not transfer responsibility: IAASB technology material expects tool fitness, critical evaluation of outputs and protection of confidential information'],
      ],
    },
    {
      id: 'pa36-regulators-set-conditions-to-practise',
      ch: 3,
      front: 'What do regulators set, and how can they supervise, as an outside influence on audit delivery?',
      back: 'The conditions to practise, supervised through licensing and inspection.',
      explanation: 'Regulators, professional bodies and technology providers each shape how engagements can be staffed and performed.',
      example: 'A firm must be able to show an inspector how an engagement was performed and reviewed.',
      terms: ['Regulator', 'Quality inspection'],
      refs: [
        [3, 'Regulators set the conditions to practise and can supervise through licensing and inspection.'],
      ],
    },
  ],
});

export const PROFESSIONAL_AUDIT_M03_DECKS: FlashcardDeckContent[] = [
  PA_M3_L1_DECK,
  PA_M3_L2_DECK,
  PA_M3_L3_DECK,
  PA_M3_L4_DECK,
  PA_M3_L5_DECK,
  PA_M3_L6_DECK,
];
