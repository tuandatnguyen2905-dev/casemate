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
    'Chapter 2 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('How Are Financial Audit and Other Assurance Services Segmented?'),
    ch('How Do Review, Agreed-Upon Procedures and Advisory Differ?'),
    ch('Which Financial Reporting Areas Commonly Drive Audit Work?'),
  ],
  cards: [
    {
      id: 'pa32-fixed-fee-uneconomic',
      ch: 1,
      front: 'A fixed-fee audit becomes uneconomic because records are unreliable. What cannot be removed to protect margin?',
      back: 'Required evidence and quality cannot be removed to protect margin.',
      explanation: 'A fixed fee can become uneconomic when records are unreliable or complexity changes, but the required work stays.',
      example: 'The team documents the changed scope and complexity instead of cutting procedures to protect margin.',
      terms: ['Fixed fee', 'Margin'],
      refs: [
        [1, 'A fixed-fee audit can become uneconomic when records are unreliable or complexity changes, but required evidence and quality cannot be removed to protect margin.'],
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
    'Chapter 3 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('Who Purchases or Requires Audit and Assurance?'),
    ch('How Do Public-Interest, Private, Group and Voluntary Needs Differ?'),
    ch('How Do Governance, Regulators and Intended Users Evaluate Audit?'),
  ],
  cards: [
    {
      id: 'pa33-leverage-matches-complexity',
      ch: 1,
      front: 'What should staffing leverage match, and what does indiscriminate senior-time reduction increase?',
      back: 'Effective leverage matches task complexity with competence and supervision; indiscriminate senior-time reduction increases rework and quality risk.',
      explanation: 'Leverage is about fit between task, competence and supervision, not about cutting senior time.',
      example: 'A team that removes senior review from complex tasks may face more rework and quality risk.',
      terms: ['Leverage', 'Supervision'],
      refs: [
        [1, 'Effective leverage matches task complexity with competence and supervision; indiscriminate senior-time reduction increases rework and quality risk.'],
      ],
    },
    {
      id: 'pa33-automation-and-judgment',
      ch: 2,
      front: 'Automation changes junior tasks. What still requires experienced judgment?',
      back: 'Complex estimates, contradictions, conclusions and supervision.',
      explanation: 'Automation can change junior tasks, but experienced judgment remains necessary for these areas.',
      example: 'Even when a tool completes routine tasks, an experienced professional reviews the complex estimates and contradictions.',
      terms: ['Automation', 'Experienced judgment'],
      refs: [
        [2, 'Automation can change junior tasks, but experienced judgment remains necessary for complex estimates, contradictions, conclusions and supervision.'],
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
    'Chapter 3 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('How Do Staffing, Leverage and Chargeable Hours Shape Economics?'),
    ch('How Do Utilization, Billing Rates and Realization Affect Revenue?'),
    ch('Why Must Audit Quality Indicators Remain Separate From Financial KPIs?'),
  ],
  cards: [
    {
      id: 'pa35-specialization-and-diversification',
      ch: 1,
      front: 'What does specialization improve, what does diversification strengthen, and what do both require?',
      back: 'Specialization improves relevance and diversification strengthens resilience; both require competence, capacity, independence and disciplined risk selection.',
      explanation: 'Both choices are trade-offs. Each needs competence, capacity, independence and disciplined risk selection.',
      example: 'A firm that specializes in one sector still needs capacity and independence safeguards for each client.',
      terms: ['Specialization', 'Diversification'],
      refs: [
        [1, 'Specialization improves relevance while diversification strengthens resilience; both require competence, capacity, independence and disciplined risk selection.'],
      ],
    },
    {
      id: 'pa35-different-sector-capabilities',
      ch: 2,
      front: 'Why might a financial-services audit and a manufacturing audit need different teams?',
      back: 'They can require different regulatory, systems, estimate and specialist capabilities.',
      explanation: 'The sector changes the regulatory, systems and estimate issues and the specialists needed.',
      example: 'A firm taking on a manufacturing client after financial-services work checks whether it has the right specialist capabilities.',
      terms: ['Sector expertise', 'Specialist capabilities'],
      refs: [
        [2, 'A financial-services audit and a manufacturing audit can require different regulatory, systems, estimate and specialist capabilities.'],
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
    'Chapter 1 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
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
      id: 'pa36-international-code-not-override',
      ch: 3,
      front: 'A firm cites an international code example to set aside a local rule. What does the chapter say?',
      back: 'International code examples do not override local rules; apply current Vietnamese law, professional ethics and engagement-specific requirements.',
      explanation: 'The local requirements apply. An international code example does not replace them.',
      example: 'When a code example and a Vietnamese requirement differ, the team applies current Vietnamese law and the engagement-specific requirements.',
      terms: ['Local rules', 'Professional ethics'],
      refs: [
        [3, 'Apply current Vietnamese law, professional ethics and engagement-specific requirements; international code examples do not override local rules.'],
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
