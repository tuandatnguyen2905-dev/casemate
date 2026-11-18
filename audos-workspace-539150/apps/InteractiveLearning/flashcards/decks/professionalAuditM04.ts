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
      id: 'pa42-quality-standards-emphasis',
      ch: 1,
      front: 'What do IAASB quality standards emphasize, rather than policy documents alone?',
      back: 'Proactive monitoring, root causes and timely remediation.',
      explanation: 'The example shows that quality standards look for active monitoring and fixing of causes, not only written policies.',
      example: 'A firm with detailed policies still needs proactive monitoring and timely remediation of root causes.',
      terms: ['Monitoring', 'Root causes'],
      refs: [
        [1, 'IAASB quality standards emphasize proactive monitoring, root causes and timely remediation rather than policy documents alone.'],
      ],
    },
    {
      id: 'pa42-reputation-sustained-by-evidence',
      ch: 2,
      front: 'How is a firm reputation built and sustained, according to the chapter?',
      back: 'Reputation is accumulated professional performance and ethics; it must be sustained through evidence of quality and effective remediation.',
      explanation: 'Reputation accumulates from performance and ethics and has to be sustained with evidence of quality and effective remediation.',
      example: 'A firm that wants to protect its reputation keeps evidence of quality and acts on remediation.',
      terms: ['Reputation', 'Remediation'],
      refs: [
        [2, 'Reputation is accumulated professional performance and ethics; it must be sustained through evidence of quality and effective remediation.'],
      ],
    },
    {
      id: 'pa42-assess-firm-beyond-prestige',
      ch: 3,
      front: 'What should be assessed about a firm beyond its historical prestige?',
      back: 'Current licensing, quality controls, relevant experience, inspection or regulatory context, delivery capacity and independence.',
      explanation: 'The chapter lists current factors to assess, rather than relying on past reputation alone.',
      example: 'A client choosing a firm checks current licensing, quality controls, relevant experience and delivery capacity instead of prestige alone.',
      terms: ['Licensing', 'Quality controls'],
      refs: [
        [3, 'Assess current licensing, quality controls, relevant experience, inspection or regulatory context, delivery capacity and independence—not historical prestige alone.'],
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
    'Chapter 2 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('Why Do Independence, Expertise and Professional Skepticism Matter?'),
    ch('How Do Methodology, Evidence and Quality Management Create Trust?'),
    ch('How Do Talent, Technology and Client Governance Support Sustainable Growth?'),
  ],
  cards: [
    {
      id: 'pa44-parallel-deadlines',
      ch: 1,
      front: 'Local statutory reporting and overseas group instructions apply to the same client. What can this create?',
      back: 'Parallel deadlines, frameworks and evidence requirements.',
      explanation: 'Two sets of requirements can run side by side and have to be coordinated.',
      example: 'A team coordinating local statutory reporting with overseas group instructions plans for parallel deadlines, frameworks and evidence requirements.',
      terms: ['Framework coordination', 'Group instructions'],
      refs: [
        [1, 'Local statutory reporting and overseas group instructions can create parallel deadlines, frameworks and evidence requirements.'],
      ],
    },
    {
      id: 'pa44-compete-only-where-fit',
      ch: 3,
      front: 'Where should a firm compete in Vietnam, according to the chapter?',
      back: 'Only where authorizations, standards, independence, sector competence, language, technology and staffing fit the mandate.',
      explanation: 'The test is whether authorizations, standards, independence, competence, language, technology and staffing fit the mandate.',
      example: 'A firm without the right sector competence or staffing for a mandate should not compete for it.',
      terms: ['Authorizations', 'Sector competence'],
      refs: [
        [3, 'Compete only where authorizations, standards, independence, sector competence, language, technology and staffing fit the mandate.'],
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
