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
      id: 'pa51-expectations-run-ahead-of-requirements',
      ch: 1,
      front: 'Do stakeholder expectations for assurance always match legal requirements?',
      back: 'No. They can run ahead of legal requirements; assurance is real only where requirements, suitable criteria, reliable data and qualified practitioners exist.',
      explanation: 'A change in what is reported changes what can be assured.',
      example: 'Lenders ask for assurance over a newly published indicator, but the practitioner first needs criteria and controlled data.',
      terms: ['Stakeholder expectation', 'Suitable criteria'],
      refs: [
        [1, 'Stakeholder expectations can run ahead of legal requirements.'],
        [1, 'Demand for assurance over wider reporting is real only where requirements, suitable criteria, reliable data and qualified practitioners exist; a change in what is reported changes what can be assured.'],
      ],
    },
    {
      id: 'pa51-assurance-depends-on-criteria-data',
      ch: 1,
      front: 'What does it depend on whether assurance is possible over wider reporting?',
      back: 'Suitable criteria, reliable data and the agreed scope, not stakeholder interest alone.',
      explanation: 'Interest from stakeholders does not by itself make an engagement possible.',
      example: 'A practitioner needs to know the criteria, how the data is controlled, the period and boundary, and what conclusion is possible.',
      terms: ['Assurance scope', 'Sustainability information'],
      refs: [
        [1, 'Whether assurance is possible depends on suitable criteria, reliable data and the agreed scope, not on stakeholder interest alone.'],
      ],
    },
    {
      id: 'pa51-quality-and-transparency-reinforce',
      ch: 2,
      front: 'How do audit quality and transparency reinforce each other?',
      back: 'A firm earns trust by showing evidence of quality and of fixing weaknesses, and transparency is credible only if it reports honestly on both strengths and findings.',
      explanation: 'Transparency lets users, governance bodies and regulators judge quality instead of assuming it.',
      example: 'A firm that shares how it found and fixed an inspection weakness tells audit committees more than a statement that quality is a priority.',
      terms: ['Audit quality', 'Transparency'],
      refs: [
        [2, 'A firm earns trust by showing evidence of quality and of fixing weaknesses, and transparency is credible only if it reports honestly on both strengths and findings.'],
      ],
    },
    {
      id: 'pa51-users-cannot-see-audit-work',
      ch: 2,
      front: 'Why do users depend on evidence about quality rather than on the audit work itself?',
      back: 'Users cannot see audit work; they rely on the report and on evidence about quality.',
      explanation: 'That is why quality management, quality indicators and transparency carry more weight as more decisions depend on audited information.',
      example: 'A lender reading an audit report sees only the opinion, not how the work was done.',
      terms: ['User reliance', 'Quality management'],
      refs: [
        [2, 'Users cannot see audit work; they rely on the report and on evidence about quality.'],
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
      id: 'pa52-ai-supports-not-replaces-judgment',
      ch: 3,
      front: 'What stays with the engagement team even when AI supports the audit?',
      back: 'Evaluating evidence, exercising professional skepticism and taking responsibility for the conclusion.',
      explanation: 'AI can analyze populations, detect anomalies, extract and summarize documents and support review, but it cannot take over judgment.',
      example: 'A tool flags unusual journal entries; the team treats the flags as leads and checks the underlying records.',
      terms: ['AI-assisted analysis', 'Professional judgment'],
      refs: [
        [3, 'It cannot take over audit judgment: evaluating evidence, exercising professional skepticism and taking responsibility for the conclusion remain with the engagement team.'],
      ],
    },
    {
      id: 'pa52-ai-accountability-unchanged',
      ch: 3,
      front: 'What does AI change in an audit, and what does it not change?',
      back: 'How evidence is obtained and risks are found, not who is accountable for the conclusion.',
      explanation: 'Its value depends on governance and critical assessment, and an output that has not been verified is not yet a basis for a conclusion.',
      example: 'Accepting a tool’s summary, or the absence of flags, as proof would be automation bias.',
      terms: ['Automation bias', 'Human verification'],
      refs: [
        [3, 'AI changes how evidence is obtained and risks are found, not who is accountable for the conclusion.'],
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
      id: 'pa53-shared-delivery-adds-capacity-not-accountability',
      ch: 2,
      front: 'What do shared delivery centres and specialists add to an audit, and what do they not add?',
      back: 'Capacity and expertise, not accountability.',
      explanation: 'Each added participant widens what must be directed, reviewed and protected.',
      example: 'A valuation specialist helps with a complex estimate, but the engagement team still answers for the conclusion.',
      terms: ['Shared delivery centre', 'Specialist'],
      refs: [
        [2, 'Shared delivery and specialists add capacity and expertise, not accountability.'],
      ],
    },
    {
      id: 'pa53-team-must-direct-supervise-review',
      ch: 2,
      front: 'What must the engagement team still do when work is done by a shared centre or specialist?',
      back: 'Direct, supervise and review the work, evaluate specialists’ competence and results, keep independence in view and protect data as it moves.',
      explanation: 'The model works only if these controls are in place.',
      example: 'If the team cannot evaluate a specialist’s work, it should not rely on it.',
      terms: ['Engagement accountability', 'Supervision and review'],
      refs: [
        [2, 'The model works only if the team directs, supervises and reviews that work, evaluates specialists’ competence and results, keeps independence requirements in view for everyone involved and protects data as it moves.'],
      ],
    },
    {
      id: 'pa53-capability-not-demand-limits-expansion',
      ch: 3,
      front: 'What limits how far a firm can expand into new assurance services: demand or capability?',
      back: 'Capability. A new service is credible only when the standard, competence, methodology, quality system and independence are ready.',
      explanation: 'A firm should be willing to decline work it cannot support.',
      example: 'A firm with demand for emissions assurance but no one who understands the data should not yet accept the engagement.',
      terms: ['Adjacent assurance service', 'Engagement acceptance'],
      refs: [
        [3, 'Capability, not demand, is the limit on expanding assurance.'],
        [3, 'A new service is credible only when the standard, competence, methodology, quality system and independence are ready, and a firm should be willing to decline work it cannot support.'],
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
      id: 'pa54-digital-assurance-bounded',
      ch: 3,
      front: 'What bounds a digital assurance conclusion?',
      back: 'The defined scope, suitable criteria, evidence obtained and the practitioner’s competence.',
      explanation: 'Specialists are often involved, but the conclusion still stays within these limits.',
      example: 'A conclusion that specified controls operated effectively over a period says nothing about controls outside the scope.',
      terms: ['Cyber assurance', 'Specialist integration'],
      refs: [
        [3, 'In either case the conclusion is bounded by the defined scope, suitable criteria, evidence obtained and the practitioner’s competence, often with specialists involved.'],
      ],
    },
    {
      id: 'pa54-cyber-controls-not-certify-secure',
      ch: 3,
      front: 'Does assurance over cyber controls certify that a system is secure?',
      back: 'No. It reports on those controls against criteria; it does not certify that a system is secure.',
      explanation: 'A controls conclusion does not cover threats outside its scope or the time after its period.',
      example: 'A client given a controls assurance report should not treat it as a promise that no future cyber incident will occur.',
      terms: ['IT general control', 'Application control'],
      refs: [
        [3, 'Assurance over cyber controls reports on those controls against criteria; it does not certify that a system is secure.'],
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
