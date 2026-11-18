// Audit & Assurance Module 04, one deck per lesson (apps/IndustryKnowledge/auditAssuranceModule04.tsx).
// Excerpts are verbatim from the rendered chapter text. Held chapters carry no cards and no chapter-specific figures are quoted.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const ch = (title: string) => ({ title, sourceTitle: title, citations: [] as string[] });

const COMMON = {
  industryId: 'professional-audit',
  industryLabel: 'Audit & Assurance',
  moduleId: 'pa-m04',
  moduleLabel: 'Module 04',
  moduleKey: 'PROFESSIONAL_AUDIT_MODULE04',
  file: 'apps/IndustryKnowledge/auditAssuranceModule04.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const PA_M4_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m4-industry-competition-structure',
  title: 'Audit & Assurance: Industry Competition Structure',
  description: 'Key ideas from the Industry Competition Structure lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m4-l1',
  lessonTitle: 'Industry Competition Structure',
  chapterIdPrefix: 'pa-m4-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('How Competitive Is Audit & Assurance?'),
    ch('How Do Porter\'s Five Forces Apply to Audit Firms?'),
    ch('What Creates Licensing, Trust and Capability Barriers?'),
  ],
  cards: [
    {
      id: 'pa41-market-position-depends-on-fit',
      ch: 1,
      front: 'What does market position depend on, and what is it not based on alone?',
      back: 'Reliable fit with a defined client and engagement, not firm size or brand recognition alone.',
      explanation: 'Position comes from fitting a defined client and engagement reliably, not from size or brand recognition alone.',
      example: 'Firm size or brand recognition alone does not set market position; fit with a defined client and engagement does.',
      terms: ['Market position', 'Client fit'],
      refs: [
        [1, 'Market position depends on reliable fit with a defined client and engagement—not firm size or brand recognition alone.'],
      ],
    },
    {
      id: 'pa41-compare-within-authorized-engagements',
      ch: 3,
      front: 'When comparing audit firms, within which engagements should the comparison be made?',
      back: 'Only within engagements the firms are authorized, independent, competent and sufficiently resourced to perform.',
      explanation: 'The comparison is limited to engagements the firms are authorized and resourced to perform.',
      example: 'A comparison of two firms for a listed-entity audit starts by checking that each is authorized, independent, competent and resourced for it.',
      terms: ['Authorization', 'Independence'],
      refs: [
        [3, 'Compare firms only within engagements they are authorized, independent, competent and sufficiently resourced to perform.'],
      ],
    },
  ],
});

const PA_M4_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m4-key-industry-players',
  title: 'Audit & Assurance: Key Industry Players',
  description: 'Key ideas from the Key Industry Players lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m4-l2',
  lessonTitle: 'Key Industry Players',
  chapterIdPrefix: 'pa-m4-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('Who Are the Major Global Audit Network Types?'),
    ch('How Do Big Four, Mid-Tier, Specialist and Local Firms Differ?'),
    ch('Which Firms and Institutions Shape Vietnam\'s Audit Market?'),
  ],
  cards: [
    {
      id: 'pa42-network-type-not-quality',
      ch: 1,
      front: 'What does audit network type describe?',
      back: 'How a firm is connected to others, not how good it is.',
      explanation: 'Global networks, mid-tier networks and associations differ in how closely members are tied together.',
      example: 'Two firms in different kinds of network can still differ widely in the quality of their audits.',
      terms: ['Global network', 'Association of independent firms'],
      refs: [
        [1, 'Network type describes how a firm is connected to others, not how good it is.'],
      ],
    },
    {
      id: 'pa42-membership-keeps-firm-responsibility',
      ch: 1,
      front: 'Does network membership remove a firm’s own responsibility for engagement quality and independence?',
      back: 'No. Membership can add reach and a common method, but each firm stays responsible.',
      explanation: 'Member firms remain separate legal entities with their own quality and independence obligations.',
      example: 'A member firm cannot rely on its network brand to show that a particular engagement was performed well.',
      terms: ['Network firm', 'Network requirement'],
      refs: [
        [1, 'Membership can add reach and a common method, but it does not remove each firm’s own responsibility for engagement quality and independence.'],
      ],
    },
    {
      id: 'pa42-firm-types-are-positioning',
      ch: 2,
      front: 'Are Big Four, mid-tier, specialist and local firms rungs of a quality ladder?',
      back: 'No. They are categories of positioning; any type can perform a poor audit or an excellent one.',
      explanation: 'What matters is evidence of quality on the engagement, not the firm type.',
      example: 'A local firm can deliver an excellent audit and a large network firm can deliver a poor one.',
      terms: ['Big Four', 'Specialist firm'],
      refs: [
        [2, 'Firm types describe how a firm is positioned, not rungs of a quality ladder.'],
        [2, 'Any type can perform a poor audit and any type can perform an excellent one; evidence of quality is what matters.'],
      ],
    },
    {
      id: 'pa42-choose-by-engagement-fit',
      ch: 2,
      front: 'On what basis should audit firms be chosen and compared?',
      back: 'Fit for a defined engagement: authorization, independence, competence and capacity, not size or brand.',
      explanation: 'The test is the same for every firm type: is the firm suitable for this engagement?',
      example: 'A company with a specialized sector may value a specialist firm’s depth, while a multinational group may need coordination across countries.',
      terms: ['Engagement fit', 'Mid-tier firm'],
      refs: [
        [2, 'Choose and compare firms by fit for a defined engagement, meaning authorization, independence, competence and capacity, not by size or brand.'],
      ],
    },
    {
      id: 'pa42-international-standards-matter-through-adoption',
      ch: 3,
      front: 'When do international standards matter to audit in Vietnam?',
      back: 'Only to the extent they are adopted.',
      explanation: 'Institutions shape who may audit what and by which standards, so adoption status has to be checked.',
      example: 'A team checks how a standard is adopted in Vietnam instead of assuming the international edition applies.',
      terms: ['Standard adoption', 'Oversight and licensing'],
      refs: [
        [3, 'international standards matter only to the extent they are adopted'],
      ],
    },
    {
      id: 'pa42-vietnam-three-kinds-of-firm',
      ch: 3,
      front: 'Which three kinds of firm compete in Vietnam’s audit market?',
      back: 'International networks, domestic firms and smaller practices.',
      explanation: 'They compete across several client segments inside the framework set by Vietnamese law and standards.',
      example: 'A foreign-invested company may need a local statutory audit as well as work for its overseas parent.',
      terms: ['International network', 'Domestic firm'],
      refs: [
        [3, 'International networks, domestic firms and smaller practices compete across statutory, foreign-invested, listed, group and local client segments.'],
      ],
    },
  ],
});

const PA_M4_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m4-competitor-benchmarking',
  title: 'Audit & Assurance: Competitor Benchmarking',
  description: 'Key ideas from the Competitor Benchmarking lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m4-l3',
  lessonTitle: 'Competitor Benchmarking',
  chapterIdPrefix: 'pa-m4-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Should Audit Firms Be Compared?'),
    ch('How Do Talent, Sector Expertise, Methodology and Technology Differ?'),
    ch('How Should Audit Quality and Financial Performance Be Benchmarked?'),
  ],
  cards: [
    {
      id: 'pa43-talent-capacity-and-quality',
      ch: 1,
      front: 'Why is talent more than productive capacity in audit competition?',
      back: 'Talent is both productive capacity and a determinant of quality; experienced continuity can reduce repeated training and rework.',
      explanation: 'People provide capacity and also decide quality, and experienced continuity reduces repeated training and rework.',
      example: 'A firm can add headcount and still weaken quality if supervision, technical development and experienced retention do not keep pace.',
      terms: ['Talent', 'Continuity'],
      refs: [
        [1, 'Talent is both productive capacity and a determinant of quality; experienced continuity can reduce repeated training and rework.'],
        [1, 'A firm can increase headcount while weakening quality if supervision, technical development and experienced retention do not keep pace.'],
      ],
    },
    {
      id: 'pa43-technology-advantage-source',
      ch: 2,
      front: 'Where does technology advantage come from, and what does it not come from?',
      back: 'From solving meaningful evidence and workflow problems under governance, not from adopting tools for their own sake.',
      explanation: 'A tool creates advantage only when it solves a meaningful evidence or workflow problem under governance.',
      example: 'A firm buying a tool without a clear evidence or workflow problem gains no real advantage.',
      terms: ['Technology governance', 'Workflow'],
      refs: [
        [2, 'Technology advantage comes from solving meaningful evidence and workflow problems under governance—not adopting tools for their own sake.'],
      ],
    },
    {
      id: 'pa43-test-before-scaling-a-tool',
      ch: 3,
      front: 'What should be tested before a tool is scaled across engagements?',
      back: 'Accuracy, completeness, access, localization, data protection, system integration and human review.',
      explanation: 'These tests come before scaling a tool, and they include human review as well as data protection.',
      example: 'Before rolling out a tool to all teams, the firm tests accuracy, completeness, data protection and human review.',
      terms: ['Tool testing', 'Human review'],
      refs: [
        [3, 'Test accuracy, completeness, access, localization, data protection, system integration and human review before scaling a tool.'],
      ],
    },
  ],
});

const PA_M4_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m4-key-success-factors',
  title: 'Audit & Assurance: Key Success Factors',
  description: 'Key ideas from the Key Success Factors lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m4-l4',
  lessonTitle: 'Key Success Factors',
  chapterIdPrefix: 'pa-m4-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card. Cards on chapters 1 and 3 were replaced with new IDs when the lesson was rewritten; the retired IDs are listed in RETIRED_CARD_IDS.',
  ],
  chapters: [
    ch('Why Do Independence, Expertise and Professional Skepticism Matter?'),
    ch('How Do Methodology, Evidence and Quality Management Create Trust?'),
    ch('How Do Talent, Technology and Client Governance Support Sustainable Growth?'),
  ],
  cards: [
    {
      id: 'pa44-failure-in-one-weakens-all',
      ch: 1,
      front: 'What happens if independence, expertise or professional skepticism fails?',
      back: 'The others cannot make up for it; a failure in any one weakens audit quality and reputation together.',
      explanation: 'Each attribute protects a different part of the conclusion.',
      example: 'A technically strong team with a close financial relationship to the client may not be seen as independent.',
      terms: ['Independence', 'Technical expertise'],
      refs: [
        [1, 'If one fails, the others cannot make up for it.'],
        [1, 'A failure in any one weakens quality and reputation together.'],
      ],
    },
    {
      id: 'pa44-professional-skepticism-meaning',
      ch: 1,
      front: 'What does professional skepticism involve?',
      back: 'A questioning mind that critically assesses evidence, including contradictory information and management’s explanations.',
      explanation: 'The auditor does not accept explanations at face value without corroboration.',
      example: 'A team that accepts management’s explanation of an unusual estimate without corroboration has not applied skepticism.',
      terms: ['Professional skepticism', 'Management representation'],
      refs: [
        [1, 'Professional skepticism is the questioning mind that critically assesses evidence, including contradictory information and management’s explanations, rather than accepting them at face value.'],
      ],
    },
    {
      id: 'pa44-quality-made-demonstrable',
      ch: 2,
      front: 'What makes audit quality demonstrable to clients and regulators rather than merely asserted?',
      back: 'A consistent risk-based method, sufficient appropriate evidence with documentation, and firm-level quality management that monitors and remediates.',
      explanation: 'These are things users and regulators can see are in place.',
      example: 'A firm shows its method, its documented evidence and how it remediated a finding.',
      terms: ['Risk-based methodology', 'Audit documentation'],
      refs: [
        [2, 'Together they make quality demonstrable to clients and regulators rather than merely asserted.'],
        [2, 'Sufficient appropriate evidence and audit documentation show what supports the conclusion.'],
      ],
    },
    {
      id: 'pa44-reputation-sustained-by-evidence',
      ch: 2,
      front: 'How is an audit firm’s reputation sustained?',
      back: 'By evidence of quality, meaning a consistent method, documented evidence and effective remediation, and not by policy documents alone.',
      explanation: 'Reputation is accumulated professional performance and ethics.',
      example: 'A firm that traces a recurring weakness to its cause and checks that the fix worked shows quality that a policy manual cannot.',
      terms: ['Quality management', 'Monitoring and remediation'],
      refs: [
        [2, 'Reputation is accumulated professional performance and ethics. It is sustained by evidence of quality, meaning a consistent method, documented evidence and effective remediation, and not by policy documents alone.'],
      ],
    },
    {
      id: 'pa44-growth-three-drivers-together',
      ch: 3,
      front: 'What must expand together for audit-firm growth to be sustainable?',
      back: 'Talent, technology and client governance.',
      explanation: 'Strength in one does not offset a gap in another.',
      example: 'A firm that wins more clients but does not add supervision capacity or validate its tools is growing faster than its quality can follow.',
      terms: ['Talent pipeline', 'Governed technology'],
      refs: [
        [3, 'Growth is sustainable when talent, technology and client governance expand together.'],
      ],
    },
    {
      id: 'pa44-growth-outpacing-shows-as',
      ch: 3,
      front: 'Where does growth that outpaces talent, technology or client governance tend to show first?',
      back: 'As thinner supervision, reduced evidence or weakened independence, before it appears as a commercial problem.',
      explanation: 'Quality strain is usually visible in the work before it is visible in the results.',
      example: 'Results look strong until quality indicators or an inspection reveal the strain.',
      terms: ['Growth pace', 'Client concentration'],
      refs: [
        [3, 'Growth that outpaces any of them tends to appear as thinner supervision, reduced evidence or weakened independence before it appears as a commercial problem.'],
      ],
    },
  ],
});

const PA_M4_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m4-industry-swot-and-strategic-challenges',
  title: 'Audit & Assurance: Industry SWOT & Strategic Challenges',
  description: 'Key ideas from the Industry SWOT & Strategic Challenges lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m4-l5',
  lessonTitle: 'Industry SWOT & Strategic Challenges',
  chapterIdPrefix: 'pa-m4-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 2 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('What Are the Industry\'s Main Strengths and Weaknesses?'),
    ch('What Opportunities and Threats Shape Audit and Assurance?'),
    ch('What Strategic Choices Must Audit Firms Make?'),
  ],
  cards: [
    {
      id: 'pa45-most-serious-vulnerability',
      ch: 1,
      front: 'When does the most serious vulnerability for an audit firm appear?',
      back: 'When commercial pressure weakens quality, independence, staffing or evidence.',
      explanation: 'The chapter singles out commercial pressure that weakens quality, independence, staffing or evidence.',
      example: 'A firm under fee pressure that cuts staffing or evidence is exposing itself to its most serious vulnerability.',
      terms: ['Fee pressure', 'Independence risk'],
      refs: [
        [1, 'The most serious vulnerability appears when commercial pressure weakens quality, independence, staffing or evidence.'],
      ],
    },
    {
      id: 'pa45-turnover-systems-concentration',
      ch: 3,
      front: 'How can staff turnover, system failures and concentrated clients each add pressure on a firm?',
      back: 'Staff turnover can increase review effort, system failures can disrupt evidence, and concentrated clients can amplify pressure.',
      explanation: 'The example links three separate risks to extra review effort, disrupted evidence and amplified pressure.',
      example: 'A firm that loses staff, suffers a system failure and depends on a few clients faces all three pressures at once.',
      terms: ['Client concentration', 'Cyber incident'],
      refs: [
        [3, 'Staff turnover can increase review effort, while system failures can disrupt evidence and concentrated clients can amplify pressure.'],
      ],
    },
  ],
});

export const PROFESSIONAL_AUDIT_M04_DECKS: FlashcardDeckContent[] = [
  PA_M4_L1_DECK,
  PA_M4_L2_DECK,
  PA_M4_L3_DECK,
  PA_M4_L4_DECK,
  PA_M4_L5_DECK,
];
