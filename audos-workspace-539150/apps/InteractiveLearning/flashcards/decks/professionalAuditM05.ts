// Audit & Assurance Module 05, one deck per lesson (apps/IndustryKnowledge/auditAssuranceModule05.tsx).
// Excerpts are verbatim from the rendered chapter text. Held chapters carry no cards and no chapter-specific figures are quoted.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const ch = (title: string) => ({ title, sourceTitle: title, citations: [] as string[] });

const COMMON = {
  industryId: 'professional-audit',
  industryLabel: 'Audit & Assurance',
  moduleId: 'pa-m05',
  moduleLabel: 'Module 05',
  moduleKey: 'PROFESSIONAL_AUDIT_MODULE05',
  file: 'apps/IndustryKnowledge/auditAssuranceModule05.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const PA_M5_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m5-client-trends',
  title: 'Audit & Assurance: Client Trends',
  description: 'Key ideas from the Client Trends lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m5-l1',
  lessonTitle: 'Client Trends',
  chapterIdPrefix: 'pa-m5-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Are Corporate Reporting and Stakeholder Expectations Changing?'),
    ch('Why Are Audit Quality and Transparency More Important?'),
    ch('How Are Talent and Client Collaboration Evolving?'),
  ],
  cards: [
    {
      id: 'pa51-future-capability-mix',
      ch: 1,
      front: 'What does future audit capability combine?',
      back: 'Accounting and assurance foundations with analytics, technology, communication and judgment.',
      explanation: 'The chapter pairs the traditional foundations with analytics, technology, communication and judgment.',
      example: 'A new auditor builds accounting and assurance foundations and also learns analytics and communication.',
      terms: ['Analytics', 'Judgment'],
      refs: [
        [1, 'Future capability combines accounting and assurance foundations with analytics, technology, communication and judgment.'],
      ],
    },
    {
      id: 'pa51-professional-skepticism-meaning',
      ch: 2,
      front: 'What is professional skepticism?',
      back: 'A questioning mind and critical assessment of evidence, including contradictory information and potential bias.',
      explanation: 'It combines a questioning mind with critical assessment of evidence, including contradictory information and potential bias.',
      example: 'Professional skepticism includes critical assessment of contradictory information and potential bias.',
      terms: ['Professional skepticism', 'Contradictory evidence'],
      refs: [
        [2, 'A questioning mind and critical assessment of evidence, including contradictory information and potential bias.'],
      ],
    },
    {
      id: 'pa51-routine-automation-judgment',
      ch: 3,
      front: 'Routine audit work is automated. What do experienced professionals still need to do?',
      back: 'Assess complex judgments and contradictory evidence.',
      explanation: 'Automating routine work does not remove the need for experienced professionals.',
      example: 'Even when routine work is automated, an experienced professional assesses the complex judgments and the contradictory evidence.',
      terms: ['Automation', 'Complex judgments'],
      refs: [
        [3, 'Automating routine work does not remove the need for experienced professionals to assess complex judgments and contradictory evidence.'],
      ],
    },
  ],
});

const PA_M5_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m5-technology-and-innovation-trends',
  title: 'Audit & Assurance: Technology & Innovation Trends',
  description: 'Key ideas from the Technology & Innovation Trends lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m5-l2',
  lessonTitle: 'Technology & Innovation Trends',
  chapterIdPrefix: 'pa-m5-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Are Data Analytics and Automation Changing Audit Procedures?'),
    ch('How Are Continuous Monitoring and Technology-Enabled Evidence Developing?'),
    ch('What Role Can AI Play—and Not Play—in Audit Judgment?'),
  ],
  cards: [
    {
      id: 'pa52-ai-role-and-limits',
      ch: 1,
      front: 'What can AI and analytics improve, and what do they not replace?',
      back: 'They can improve risk identification and efficiency but do not replace evidence evaluation, skepticism or responsibility for the conclusion.',
      explanation: 'AI and analytics help with risk identification and efficiency; the auditor still evaluates evidence and owns the conclusion.',
      example: 'Analytics can improve risk identification and efficiency, but evidence evaluation, skepticism and responsibility for the conclusion remain.',
      terms: ['AI-assisted review', 'Responsibility'],
      refs: [
        [1, 'AI and analytics can improve risk identification and efficiency but do not replace evidence evaluation, skepticism or responsibility for the conclusion.'],
      ],
    },
    {
      id: 'pa52-automation-bias-warning',
      ch: 1,
      front: 'What does IAASB warn against regarding automated tools, and what does it require?',
      back: 'It warns against automation bias and overreliance and requires critical assessment of information and outputs.',
      explanation: 'The example names automation bias and overreliance as the risks and critical assessment as the response.',
      example: 'Automation bias and overreliance are managed through critical assessment of information and outputs.',
      terms: ['Automation bias', 'Overreliance'],
      refs: [
        [1, 'IAASB warns against automation bias and overreliance and requires critical assessment of information and outputs.'],
      ],
    },
    {
      id: 'pa52-monitoring-not-statutory-audit',
      ch: 2,
      front: 'Is more frequent monitoring automatically equivalent to a properly scoped statutory audit or assurance engagement?',
      back: 'No. More frequent monitoring improves visibility but is not automatically equivalent to a properly scoped statutory audit or assurance engagement.',
      explanation: 'Frequent monitoring gives better visibility, but an assurance engagement still needs its own scope.',
      example: 'An automated alert can identify an exception sooner, but formal assurance still requires criteria, evidence, scope and reporting under applicable standards.',
      terms: ['Continuous monitoring', 'Assurance engagement'],
      refs: [
        [2, 'More frequent monitoring improves visibility but is not automatically equivalent to a properly scoped statutory audit or assurance engagement.'],
        [2, 'An automated alert can identify an exception sooner, but formal assurance still requires criteria, evidence, scope and reporting under applicable standards.'],
      ],
    },
    {
      id: 'pa52-cyber-assurance-limits',
      ch: 3,
      front: 'Does a controls assurance engagement guarantee immunity from every cyber threat?',
      back: 'No. It does not guarantee immunity from every cyber threat or future incident.',
      explanation: 'Digital assurance conclusions stay bounded by defined scope, suitable criteria, evidence and practitioner competence.',
      example: 'A client given a controls assurance report should not treat it as a promise that no future cyber incident will occur.',
      terms: ['Cyber assurance', 'Controls assurance'],
      refs: [
        [3, 'A controls assurance engagement does not guarantee immunity from every cyber threat or future incident.'],
        [3, 'Digital assurance conclusions must remain bounded by defined scope, suitable criteria, evidence and practitioner competence.'],
      ],
    },
  ],
});

const PA_M5_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m5-market-and-delivery-model-trends',
  title: 'Audit & Assurance: Market & Delivery Model Trends',
  description: 'Key ideas from the Market & Delivery Model Trends lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m5-l3',
  lessonTitle: 'Market & Delivery Model Trends',
  chapterIdPrefix: 'pa-m5-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Are Group Audits and Cross-Border Delivery Evolving?'),
    ch('How Are Shared Delivery and Specialist Models Developing?'),
    ch('How Are Audit Firms Expanding Assurance Capabilities?'),
  ],
  cards: [
    {
      id: 'pa53-group-quality-requirements',
      ch: 1,
      front: 'What does group audit quality require, and is geographic coverage enough?',
      back: 'Coordinated risk assessment, clear responsibilities and evaluation of component work; geographic coverage alone is insufficient.',
      explanation: 'Quality in group audits depends on coordination, clear responsibilities and evaluating component work.',
      example: 'A group with components in many places still needs coordinated risk assessment and evaluation of component work.',
      terms: ['Group coordination', 'Component evaluation'],
      refs: [
        [1, 'Group quality requires coordinated risk assessment, clear responsibilities and evaluation of component work; geographic coverage alone is insufficient.'],
      ],
    },
    {
      id: 'pa53-isa-600-strengthens',
      ch: 2,
      front: 'What does ISA 600 (Revised) strengthen in group audits, according to the trends chapter?',
      back: 'Two-way communication, professional skepticism, planning, performance and documentation.',
      explanation: 'The example lists five areas where ISA 600 (Revised) strengthens group audits.',
      example: 'A group audit team checks communication, skepticism, planning, performance and documentation against ISA 600 (Revised).',
      terms: ['ISA 600', 'Group audit'],
      refs: [
        [2, 'ISA 600 (Revised) strengthens two-way communication, professional skepticism, planning, performance and documentation in group audits.'],
      ],
    },
    {
      id: 'pa53-align-local-and-group',
      ch: 3,
      front: 'How should local statutory work and group instructions be handled together?',
      back: 'Align them while assessing component competence, independence, evidence, secure data transfer and accountability.',
      explanation: 'Local work and group instructions need to be aligned, with the component assessed on several points.',
      example: 'A team aligns the local statutory deadline with group instructions and assesses the component for competence and independence.',
      terms: ['Group instructions', 'Component competence'],
      refs: [
        [3, 'Align local statutory work and group instructions while assessing component competence, independence, evidence, secure data transfer and accountability.'],
      ],
    },
  ],
});

const PA_M5_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m5-regulatory-and-sustainability-trends',
  title: 'Audit & Assurance: Regulatory & Sustainability Trends',
  description: 'Key ideas from the Regulatory & Sustainability Trends lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m5-l4',
  lessonTitle: 'Regulatory & Sustainability Trends',
  chapterIdPrefix: 'pa-m5-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Are Audit Standards, Ethics and Quality Requirements Evolving?'),
    ch('How Is Sustainability and Non-Financial Assurance Developing?'),
    ch('How Are Cybersecurity, Data and Technology Assurance Evolving?'),
  ],
  cards: [
    {
      id: 'pa54-final-standard-not-automatic-law',
      ch: 1,
      front: 'Is a final global standard automatically current Vietnamese law?',
      back: 'No. A final global standard is not automatically current Vietnamese law; track Ministry of Finance, professional, legal and international-adoption status separately.',
      explanation: 'Final status at the international level and legal status in Vietnam are tracked separately.',
      example: 'When a revised standard is final internationally, the team still checks its current status in Vietnam before applying it.',
      terms: ['International adoption', 'Ministry of Finance'],
      refs: [
        [1, 'Track current Ministry of Finance, professional, legal and international-adoption status separately; a final global standard is not automatically current Vietnamese law.'],
      ],
    },
    {
      id: 'pa54-sustainability-opportunity-depends',
      ch: 2,
      front: 'What does opportunity in sustainability assurance depend on?',
      back: 'Actual reporting requirements, suitable criteria, reliable data and qualified practitioners, not generic ESG interest.',
      explanation: 'Interest in ESG is not enough. The opportunity depends on requirements, criteria, data and practitioners.',
      example: 'A firm that wants to offer sustainability assurance first checks the actual reporting requirements and suitable criteria.',
      terms: ['Suitable criteria', 'Sustainability assurance'],
      refs: [
        [2, 'Opportunity depends on actual reporting requirements, suitable criteria, reliable data and qualified practitioners—not generic ESG interest.'],
      ],
    },
    {
      id: 'pa54-issa-5000-early-application',
      ch: 2,
      front: 'What does the chapter say about the timing of ISSA 5000 and early application?',
      back: 'It is final but generally effective only for periods beginning on or after its stated effective date, with earlier application permitted.',
      explanation: 'Final status and effective timing are separate points, and early application is allowed.',
      example: 'A firm considering ISSA 5000 for an earlier period notes that earlier application is permitted.',
      terms: ['ISSA 5000', 'Early application'],
      refs: [
        [2, 'ISSA 5000 is final but generally effective only for periods beginning on or after'],
        [2, 'with earlier application permitted.'],
      ],
    },
    {
      id: 'pa54-verify-before-promising-sustainability',
      ch: 3,
      front: 'Before promising a sustainability assurance conclusion, what should be verified?',
      back: 'Whether, when and under which framework sustainability reporting or assurance applies.',
      explanation: 'The check comes before the promise: whether the requirement applies, when, and under which framework.',
      example: 'A client asks for a sustainability assurance conclusion; the team first verifies whether and under which framework it applies.',
      terms: ['Sustainability reporting', 'Framework'],
      refs: [
        [3, 'Verify whether, when and under which framework sustainability reporting or assurance applies before promising a conclusion.'],
      ],
    },
  ],
});

const PA_M5_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m5-growth-outlook-and-strategic-opportunities',
  title: 'Audit & Assurance: Growth Outlook & Strategic Opportunities',
  description: 'Key ideas from the Growth Outlook & Strategic Opportunities lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m5-l5',
  lessonTitle: 'Growth Outlook & Strategic Opportunities',
  chapterIdPrefix: 'pa-m5-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('What Factors Will Drive Future Audit and Assurance Demand?'),
    ch('Where Are New Opportunities Emerging in Vietnam and Global Markets?'),
    ch('How Should Audit Firms Position Themselves?'),
  ],
  cards: [
    {
      id: 'pa55-selective-growth-areas',
      ch: 1,
      front: 'Which areas of selective growth does the outlook chapter name alongside recurring audit demand?',
      back: 'Sustainability, controls and technology assurance, amid regulation, talent, investment and liability constraints.',
      explanation: 'The growth is selective and sits within constraints of regulation, talent, investment and liability.',
      example: 'A firm planning growth looks at sustainability, controls and technology assurance while allowing for talent and liability constraints.',
      terms: ['Selective growth', 'Technology assurance'],
      refs: [
        [1, 'recurring audit demand and selective growth in sustainability, controls and technology assurance amid regulation, talent, investment and liability constraints.'],
      ],
    },
    {
      id: 'pa55-enter-adjacent-assurance-area',
      ch: 2,
      front: 'When should a firm enter an adjacent assurance area?',
      back: 'Only when criteria, market demand, competence, independence, quality systems and economics are credible.',
      explanation: 'Entry requires all six conditions to be credible, not only market demand.',
      example: 'A firm with demand but no credible criteria or competence should not enter the adjacent area yet.',
      terms: ['Adjacent assurance', 'Quality systems'],
      refs: [
        [2, 'A firm should enter an adjacent assurance area only when criteria, market demand, competence, independence, quality systems and economics are credible.'],
      ],
    },
    {
      id: 'pa55-staged-capability-investment',
      ch: 3,
      front: 'What does the chapter recommend for building new capability in Vietnam?',
      back: 'Staged capability investment, current standards, engagement acceptance criteria, leading quality signals and stop-or-scale decisions.',
      explanation: 'Investment is staged and tied to acceptance criteria and quality signals, with decisions to stop or scale.',
      example: 'A firm builds a new capability in stages and decides at each stage whether to stop or scale based on quality signals.',
      terms: ['Capability investment', 'Stop-or-scale'],
      refs: [
        [3, 'Use staged capability investment, current standards, engagement acceptance criteria, leading quality signals and stop-or-scale decisions.'],
      ],
    },
  ],
});

export const PROFESSIONAL_AUDIT_M05_DECKS: FlashcardDeckContent[] = [
  PA_M5_L1_DECK,
  PA_M5_L2_DECK,
  PA_M5_L3_DECK,
  PA_M5_L4_DECK,
  PA_M5_L5_DECK,
];
