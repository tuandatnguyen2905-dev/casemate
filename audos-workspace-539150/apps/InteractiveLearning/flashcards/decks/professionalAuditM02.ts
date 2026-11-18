// Audit & Assurance Module 02, one deck per lesson (apps/IndustryKnowledge/auditAssuranceModule02.tsx).
// Excerpts are verbatim from the rendered chapter text. Held chapters carry no cards and no chapter-specific figures are quoted.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const ch = (title: string) => ({ title, sourceTitle: title, citations: [] as string[] });

const COMMON = {
  industryId: 'professional-audit',
  industryLabel: 'Audit & Assurance',
  moduleId: 'pa-m02',
  moduleLabel: 'Module 02',
  moduleKey: 'PROFESSIONAL_AUDIT_MODULE02',
  file: 'apps/IndustryKnowledge/auditAssuranceModule02.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const PA_M2_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m2-value-chain-overview',
  title: 'Audit & Assurance: Value Chain Overview',
  description: 'Key ideas from the Value Chain Overview lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m2-l1',
  lessonTitle: 'Value Chain Overview',
  chapterIdPrefix: 'pa-m2-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Does an External Audit Engagement Work?'),
    ch('Who Participates in the Audit Engagement Lifecycle?'),
    ch('How Do Information, Evidence, Decisions and Risk Flow?'),
  ],
  cards: [
    {
      id: 'pa21-lifecycle-stages',
      ch: 1,
      front: 'Which stages does the audit engagement lifecycle progress through?',
      back: 'From engagement request through acceptance, planning, risk, procedures, evaluation, review, reporting and quality monitoring.',
      explanation: 'The lifecycle is a progression, from the first request to quality monitoring after reporting.',
      example: 'A new engagement request moves through acceptance and planning before procedures, and review and reporting come before quality monitoring.',
      terms: ['Engagement lifecycle', 'Acceptance'],
      refs: [
        [1, 'the progression from engagement request through acceptance, planning, risk, procedures, evaluation, review, reporting and quality monitoring.'],
      ],
    },
    {
      id: 'pa21-quality-standards-link',
      ch: 2,
      front: 'What do ISQM 1, ISA 220 and ISQM 2 connect, according to the chapter example?',
      back: 'Firm quality systems, engagement leadership and engagement quality review.',
      explanation: 'The example links a firm-level system, the leadership of the engagement and a separate quality review.',
      example: 'On a large engagement, the firm quality system, the engagement leadership and the engagement quality review each play a part.',
      terms: ['ISQM 1', 'Engagement quality review'],
      refs: [
        [2, 'ISQM 1, ISA 220 and ISQM 2 connect firm quality systems, engagement leadership and engagement quality review.'],
      ],
    },
    {
      id: 'pa21-weak-link-in-lifecycle',
      ch: 3,
      front: 'Why can weakness at one stage of the audit lifecycle matter to the final conclusion?',
      back: 'Audit quality results from a connected lifecycle, so weakness at acceptance, risk assessment, evidence or review can undermine the final conclusion.',
      explanation: 'The lifecycle is connected, so weakness at acceptance, risk assessment, evidence or review can undermine the final conclusion.',
      example: 'If risk assessment is weak, the evidence gathered later may not support the final conclusion.',
      terms: ['Risk assessment', 'Evidence'],
      refs: [
        [3, 'Audit quality results from a connected lifecycle; weakness at acceptance, risk assessment, evidence or review can undermine the final conclusion.'],
      ],
    },
  ],
});

const PA_M2_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m2-upstream-activities',
  title: 'Audit & Assurance: Upstream Activities',
  description: 'Key ideas from the Upstream Activities lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m2-l2',
  lessonTitle: 'Upstream Activities',
  chapterIdPrefix: 'pa-m2-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Are Clients Accepted and Independence Evaluated?'),
    ch('How Are Engagement Terms, Strategy and Audit Plans Defined?'),
    ch('How Are Materiality and Performance Materiality Applied?'),
  ],
  cards: [
    {
      id: 'pa22-iesba-independence-scope',
      ch: 1,
      front: 'Which relationships and services do IESBA independence standards address, according to the chapter example?',
      back: 'Audit, review and other assurance relationships, fees and non-assurance services, under defined frameworks.',
      explanation: 'The example shows that independence covers the type of engagement, the fees and the other services provided.',
      example: 'When accepting a client, the team checks relationships, fees and non-assurance services against the independence standards.',
      terms: ['IESBA', 'Non-assurance services'],
      refs: [
        [1, 'IESBA independence standards address audit, review and other assurance relationships, fees and non-assurance services under defined frameworks.'],
      ],
    },
    {
      id: 'pa22-acceptance-planning-benefit',
      ch: 2,
      front: 'What do good acceptance and planning improve, and what do unsuitable scope or insufficient capability cause?',
      back: 'They improve effectiveness and resource allocation. Unsuitable scope or insufficient capability creates delay, rework and evidence weakness.',
      explanation: 'Planning pays off in effectiveness and resource allocation; poor scope or capability costs time and weakens evidence.',
      example: 'A team that accepts work beyond its capability may face delay and rework later.',
      terms: ['Acceptance', 'Planning'],
      refs: [
        [2, 'Good acceptance and planning improve effectiveness and resource allocation; unsuitable scope or insufficient capability creates delay, rework and evidence weakness.'],
      ],
    },
    {
      id: 'pa22-overall-materiality-calculation',
      ch: 3,
      front: 'HYPOTHETICAL: a team illustrates overall materiality as 5 percent of a normalized profit of 100,000,000,000 currency units. What is the overall materiality in the illustration?',
      back: '5,000,000,000 currency units, from 100,000,000,000 multiplied by 5 percent. The 3,500,000,000 performance materiality is a stated risk judgment in the illustration, not a universal rule.',
      explanation: 'Multiply the benchmark by the illustrative percentage to get overall materiality. The performance materiality figure reflects the stated hypothetical risk judgment.',
      example: 'In this hypothetical, qualitative matters can still be material below either amount.',
      terms: ['Overall materiality', 'Performance materiality'],
      refs: [
        [3, 'HYPOTHETICAL calculation: 100bn×5%=5bn overall illustration; 3.5bn performance materiality reflects the stated hypothetical risk judgment.'],
        [3, 'Qualitative matters can still be material below either amount.'],
      ],
    },
    {
      id: 'pa22-illustrative-percentage-not-requirement',
      ch: 3,
      front: 'A trainee says the percentage in the materiality illustration is a Vietnam requirement. How should you respond?',
      back: 'Do not present the illustrative percentage as a Vietnam requirement; apply current standards, entity context and documented professional judgment.',
      explanation: 'The percentage is only an illustration. What applies is the current standard, the entity context and documented judgment.',
      example: 'In a planning meeting, the team explains that the illustrative percentage is a teaching figure and documents its own judgment for the entity.',
      terms: ['Materiality', 'Professional judgment'],
      refs: [
        [3, 'Apply current standards, entity context and documented professional judgment; do not present the illustrative percentage as a Vietnam requirement.'],
      ],
    },
  ],
});

const PA_M2_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m2-midstream-activities',
  title: 'Audit & Assurance: Midstream Activities',
  description: 'Key ideas from the Midstream Activities lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m2-l3',
  lessonTitle: 'Midstream Activities',
  chapterIdPrefix: 'pa-m2-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Are Risks of Material Misstatement Assessed?'),
    ch('How Are Controls, Assertions and Audit Procedures Linked?'),
    ch('How Are Sampling, Evidence and Documentation Evaluated?'),
  ],
  cards: [
    {
      id: 'pa23-three-risk-components',
      ch: 1,
      front: 'How do inherent risk, control risk and detection risk differ?',
      back: 'Inherent risk is susceptibility of an assertion to material misstatement before considering controls. Control risk is the risk that controls will not prevent, or detect and correct, a material misstatement. Detection risk is the risk that audit procedures will not detect an existing material misstatement.',
      explanation: 'The three components sit at different points: before controls, in the controls themselves and in the audit procedures.',
      example: 'A complex revenue estimate with weak controls raises both inherent and control risk, so the response considers year-end testing and external evidence.',
      terms: ['Inherent risk', 'Control risk', 'Detection risk'],
      refs: [
        [1, 'Susceptibility of an assertion to material misstatement before considering related controls.'],
        [1, 'Risk that a material misstatement will not be prevented, or detected and corrected, by relevant controls.'],
        [1, 'Risk that audit procedures will not detect an existing material misstatement.'],
      ],
    },
    {
      id: 'pa23-higher-risk-lower-detection',
      ch: 1,
      front: 'Inherent and control risk are assessed higher. What generally follows for detection risk and for the procedures?',
      back: 'Lower acceptable detection risk, reached through changed nature, timing or extent of procedures.',
      explanation: 'A higher assessed risk of misstatement leads to procedures that change in nature, timing or extent.',
      example: 'A complex revenue estimate with weak controls can lead to more year-end testing, external evidence, larger or targeted selections and specialist involvement.',
      terms: ['Detection risk', 'Audit procedures'],
      refs: [
        [1, 'Higher assessed inherent or control risk generally requires lower acceptable detection risk through changed nature, timing or extent of procedures.'],
        [1, 'A complex revenue estimate with weak controls can lead to more year-end testing, external evidence, larger or targeted selections and specialist involvement.'],
      ],
    },
    {
      id: 'pa23-evidence-volume-not-enough',
      ch: 2,
      front: 'Does a large volume of evidence make up for weak relevance or reliability?',
      back: 'No. Evidence must be sufficient and appropriate for the assessed risk; volume does not compensate for weak relevance or reliability.',
      explanation: 'Evidence must be sufficient and appropriate for the assessed risk, so weak relevance or reliability is not offset by volume.',
      example: 'A large volume of evidence with weak relevance or reliability still falls short of sufficient and appropriate evidence for the assessed risk.',
      terms: ['Sufficient appropriate evidence', 'Reliability'],
      refs: [
        [2, 'Evidence must be sufficient and appropriate for the assessed risk; volume does not compensate for weak relevance or reliability.'],
      ],
    },
    {
      id: 'pa23-hypothetical-weak-controls-response',
      ch: 3,
      front: 'HYPOTHETICAL: revenue risk rises because controls are weak. How may the auditor shift the work, and does risk alone set a sample size?',
      back: 'The auditor may shift work toward year-end substantive procedures, external confirmations and targeted unusual transactions. No universal sample size follows from risk alone.',
      explanation: 'The hypothetical response is to expand or retarget testing, improve source reliability and resolve contradictions while documenting why the evidence supports the conclusion.',
      example: 'A team facing weak revenue controls targets unusual transactions and uses external confirmations instead of applying a fixed sample size.',
      terms: ['Substantive procedures', 'External confirmation'],
      refs: [
        [3, 'the auditor may shift work toward year-end substantive procedures, external confirmations and targeted unusual transactions'],
        [3, 'no universal sample size follows from risk alone.'],
        [3, 'expand or retarget testing, improve source reliability and resolve contradictions while documenting why evidence supports the conclusion.'],
      ],
    },
  ],
});

const PA_M2_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m2-downstream-activities',
  title: 'Audit & Assurance: Downstream Activities',
  description: 'Key ideas from the Downstream Activities lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m2-l4',
  lessonTitle: 'Downstream Activities',
  chapterIdPrefix: 'pa-m2-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Is an Audit Completed and Reviewed?'),
    ch('How Are Audit Opinions and Other Report Elements Distinguished?'),
    ch('How Are Findings Communicated Without Assuming Management Responsibility?'),
  ],
  cards: [
    {
      id: 'pa24-report-not-a-guarantee',
      ch: 1,
      front: 'What does an audit report express, and what is it not a guarantee of?',
      back: 'A supported conclusion in context. It is not a guarantee of future viability or absence of all fraud.',
      explanation: 'The report expresses a supported conclusion in context. It is not a guarantee of future viability or of the absence of all fraud.',
      example: 'A reader should not treat the report as a guarantee of future viability or absence of all fraud.',
      terms: ['Audit report', 'Supported conclusion'],
      refs: [
        [1, 'The report expresses a supported conclusion in context; it is not a guarantee of future viability or absence of all fraud.'],
      ],
    },
    {
      id: 'pa24-qualified-vs-adverse',
      ch: 2,
      front: 'How do a qualified opinion and an adverse opinion differ?',
      back: 'A qualified opinion is a modified opinion for a material but not pervasive misstatement or evidence limitation. An adverse opinion is a modified opinion for a material and pervasive misstatement.',
      explanation: 'Both are modified opinions. The difference is whether the matter is material but not pervasive, or material and pervasive.',
      example: 'A material misstatement that is not pervasive points toward a qualified opinion; one that is material and pervasive points toward an adverse opinion.',
      terms: ['Qualified opinion', 'Adverse opinion'],
      refs: [
        [2, 'Modified opinion used for a material but not pervasive misstatement or evidence limitation under applicable reporting requirements.'],
        [2, 'Modified opinion for material and pervasive misstatement under applicable reporting requirements.'],
      ],
    },
    {
      id: 'pa24-emphasis-of-matter-not-modified',
      ch: 2,
      front: 'Is an Emphasis of Matter paragraph automatically a modified opinion?',
      back: 'No. It draws attention to an appropriately presented matter and is not automatically a modified opinion.',
      explanation: 'An Emphasis of Matter points the reader to a matter that is already appropriately presented.',
      example: 'A report can draw attention to a matter without that making the opinion a modified opinion.',
      terms: ['Emphasis of Matter', 'Modified opinion'],
      refs: [
        [2, 'An Emphasis of Matter draws attention to an appropriately presented matter and is not automatically a modified opinion.'],
      ],
    },
    {
      id: 'pa24-management-responsibility-preserved',
      ch: 3,
      front: 'When communicating findings and recommendations, how should management responsibility be handled?',
      back: 'Preserve management’s responsibility for statements and controls; recommendations and follow-up should not transfer management decisions to the auditor.',
      explanation: 'Recommendations are advice. The decisions, and the responsibility for statements and controls, stay with management.',
      example: 'Recommendations and follow-up should not transfer management decisions to the auditor.',
      terms: ['Management responsibility', 'Follow-up'],
      refs: [
        [3, 'Preserve management’s responsibility for statements and controls; recommendations and follow-up should not transfer management decisions to the auditor.'],
      ],
    },
  ],
});

const PA_M2_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m2-inputs-outputs-and-value-creation',
  title: 'Audit & Assurance: Inputs, Outputs & Value Creation',
  description: 'Key ideas from the Inputs, Outputs & Value Creation lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m2-l5',
  lessonTitle: 'Inputs, Outputs & Value Creation',
  chapterIdPrefix: 'pa-m2-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('What Resources and Evidence Support an Audit?'),
    ch('How Do Professional Judgment, Skepticism and Quality Management Create Value?'),
    ch('How Are Monitoring, Remediation and Professional Development Sustained?'),
  ],
  cards: [
    {
      id: 'pa25-iaasb-quality-emphasis',
      ch: 1,
      front: 'What do IAASB quality standards use and emphasize, according to the chapter example?',
      back: 'A risk-based approach, emphasizing tone at the top, information flow, monitoring and timely remediation.',
      explanation: 'The example lists leadership tone, information flow, monitoring and timely remediation as the emphasis.',
      example: 'A firm checking its quality system asks whether tone at the top, information flow, monitoring and timely remediation are all in place.',
      terms: ['Tone at the top', 'Remediation'],
      refs: [
        [1, 'IAASB quality standards use a risk-based approach and emphasize tone at the top, information flow, monitoring and timely remediation.'],
      ],
    },
    {
      id: 'pa25-quality-is-organizational',
      ch: 2,
      front: 'Is audit quality an individual checklist or an organizational capability?',
      back: 'An organizational capability, requiring leadership, resources, information, monitoring and remediation, not an individual checklist.',
      explanation: 'Quality is built by the organization through leadership, resources, information, monitoring and remediation.',
      example: 'A single reviewer ticking a checklist does not create quality if the firm lacks resources and monitoring.',
      terms: ['Quality management', 'Organizational capability'],
      refs: [
        [2, 'Quality is an organizational capability requiring leadership, resources, information, monitoring and remediation—not an individual checklist.'],
      ],
    },
    {
      id: 'pa25-translate-standards-into-practice',
      ch: 3,
      front: 'How should current standards be put into practice inside a firm?',
      back: 'Translate them into methods, training, reviews and evidence that quality responses work in practice.',
      explanation: 'A standard needs to become methods, training and reviews, with evidence that the responses work.',
      example: 'After a standard changes, the firm updates its methods and training and checks through reviews that the new responses work.',
      terms: ['Current standards', 'Training'],
      refs: [
        [3, 'Translate current standards into methods, training, reviews and evidence that quality responses work in practice.'],
      ],
    },
  ],
});

const PA_M2_L6_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m2-global-vs-local-value-chain',
  title: 'Audit & Assurance: Global vs. Local Value Chain',
  description: 'Key ideas from the Global vs. Local Value Chain lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m2-l6',
  lessonTitle: 'Global vs. Local Value Chain',
  chapterIdPrefix: 'pa-m2-l6',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every eligible chapter of this lesson has at least one card.',
    'Chapter 3 is review-held and has no cards.',
  ],
  chapters: [
    ch('How Do Global Audit Networks and Group Audits Operate?'),
    ch('How Is Audit Delivery Adapted to Vietnam?'),
    ch('How Do International Standards and Vietnam-Adopted Requirements Interact?'),
  ],
  cards: [
    {
      id: 'pa26-accountability-not-delegated',
      ch: 1,
      front: 'Do network membership or delegation remove engagement accountability?',
      back: 'No. Global standardization and local expertise are complementary, but neither network membership nor delegation removes engagement accountability.',
      explanation: 'Network methods and local expertise work together, but accountability for the engagement stays where it is.',
      example: 'A group auditor that delegates work to a component auditor still keeps engagement accountability.',
      terms: ['Engagement accountability', 'Component auditor'],
      refs: [
        [1, 'Global standardization and local expertise are complementary, but neither network membership nor delegation removes engagement accountability.'],
        [1, 'ISA 600 (Revised) strengthens group-auditor responsibilities, two-way communication, planning, skepticism and documentation when component auditors are involved.'],
      ],
    },
    {
      id: 'pa26-assess-component-work',
      ch: 2,
      front: 'What should be assessed when local component work and group instructions are involved?',
      back: 'Component competence and independence, group instructions, local requirements, secure data transfer, supervision and evaluation of work.',
      explanation: 'The list covers the component auditor, the instructions given to it, local requirements, data transfer and how its work is supervised and evaluated.',
      example: 'Before relying on a local component team, the group team checks competence and independence, sends clear group instructions and evaluates the work.',
      terms: ['Component auditor', 'Group instructions'],
      refs: [
        [2, 'Assess component competence and independence, group instructions, local requirements, secure data transfer, supervision and evaluation of work.'],
      ],
    },
  ],
});

export const PROFESSIONAL_AUDIT_M02_DECKS: FlashcardDeckContent[] = [
  PA_M2_L1_DECK,
  PA_M2_L2_DECK,
  PA_M2_L3_DECK,
  PA_M2_L4_DECK,
  PA_M2_L5_DECK,
  PA_M2_L6_DECK,
];
