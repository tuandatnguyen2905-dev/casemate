// Audit & Assurance Module 01, one deck per lesson (apps/IndustryKnowledge/auditAssuranceModule01.tsx).
// Excerpts are verbatim from the rendered chapter text. Held chapters carry no cards and no chapter-specific figures are quoted.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';

const ch = (title: string) => ({ title, sourceTitle: title, citations: [] as string[] });

const COMMON = {
  industryId: 'professional-audit',
  industryLabel: 'Audit & Assurance',
  moduleId: 'pa-m01',
  moduleLabel: 'Module 01',
  moduleKey: 'PROFESSIONAL_AUDIT_MODULE01',
  file: 'apps/IndustryKnowledge/auditAssuranceModule01.tsx',
  readAtSha256: 'rendered-chapter-text',
  readAt: '2026-11-13',
  startMarker: '',
  endMarker: '',
  chapterMarker: '',
  contentStatus: 'Draft / Ready for Review',
};

const PA_M1_L1_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m1-industry-definition-and-scope',
  title: 'Audit & Assurance: Industry Definition & Scope',
  description: 'Key ideas from the Industry Definition & Scope lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m1-l1',
  lessonTitle: 'Industry Definition & Scope',
  chapterIdPrefix: 'pa-m1-l1',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('What Is the Audit & Assurance Industry?'),
    ch('What Makes External Audit Unique?'),
    ch('Where Does Audit Begin and End?'),
    ch('Understanding Audit and Assurance Engagements'),
    ch('Who Are Audit and Assurance\'s Users and Stakeholders?'),
  ],
  cards: [
    {
      id: 'pa11-reasonable-assurance-meaning',
      ch: 1,
      front: 'In an audit or assurance engagement, what does reasonable assurance mean?',
      back: 'A high but not absolute level of assurance, supported by sufficient appropriate evidence and reduced audit risk.',
      explanation: 'Reasonable assurance is high but not absolute. The chapter ties it to sufficient appropriate evidence and to reduced audit risk.',
      example: 'A client asks whether a clean audit proves every error was found. Because reasonable assurance is high but not absolute, an audit does not guarantee detection of every error or fraud.',
      terms: ['Reasonable assurance'],
      refs: [
        [1, 'A high but not absolute level of assurance supported by sufficient appropriate evidence and reduced audit risk.'],
        [1, 'an audit does not guarantee detection of every error or fraud.'],
      ],
    },
    {
      id: 'pa11-limited-vs-reasonable-assurance',
      ch: 2,
      front: 'How does limited assurance differ from reasonable assurance?',
      back: 'Limited assurance is a lower level than reasonable assurance, expressed in the form the applicable standard requires. Reasonable assurance is a high but not absolute level supported by sufficient appropriate evidence.',
      explanation: 'The two terms sit on a scale: limited assurance is the lower level, while reasonable assurance is high but not absolute.',
      example: 'The applicable standard sets the form in which a limited assurance conclusion is expressed.',
      terms: ['Limited assurance', 'Reasonable assurance'],
      refs: [
        [2, 'A lower level of assurance than reasonable assurance, expressed in the form required by the applicable standard.'],
        [1, 'A high but not absolute level of assurance supported by sufficient appropriate evidence and reduced audit risk.'],
      ],
    },
    {
      id: 'pa11-audit-vs-other-roles',
      ch: 3,
      front: 'Who remains responsible for financial statements and controls, and how does an external audit differ from accounting, internal audit and consulting?',
      back: 'Management remains responsible for financial statements and controls. External audit independently evaluates financial statements under an applicable framework; internal audit supports governance and controls, accounting prepares records and statements, and consulting advises.',
      explanation: 'The chapter separates the roles: audit evaluates, accounting prepares, internal audit supports governance and controls, consulting advises, and management stays responsible.',
      example: 'Management prepares revenue records and estimates; the external auditor assesses risks and evidence before expressing an opinion.',
      terms: ['External audit', 'Internal audit', 'Management responsibility'],
      refs: [
        [3, 'External audit independently evaluates financial statements under an applicable framework.'],
        [3, 'Internal audit supports governance and controls; accounting prepares records and statements; consulting advises; management remains responsible for financial statements and controls.'],
        [3, 'Management prepares revenue records and estimates; the external auditor assesses risks and evidence before expressing an opinion.'],
      ],
    },
    {
      id: 'pa11-isae-vs-aup',
      ch: 4,
      front: 'How does ISAE 3000, as described in the chapter, differ from ISRS 4400 AUP?',
      back: 'ISAE 3000 covers assurance other than audits or reviews of historical financial information, while ISRS 4400 AUP reports factual findings without assurance.',
      explanation: 'One standard is about assurance engagements that are not audits or reviews of historical financial information; the other reports findings but gives no assurance.',
      example: 'A client asks for a procedures-only report with no conclusion. The chapter links that kind of engagement to ISRS 4400 AUP, which reports factual findings without assurance.',
      terms: ['ISAE 3000', 'Agreed-upon procedures'],
      refs: [
        [4, 'ISAE 3000 covers assurance other than audits or reviews of historical financial information, while ISRS 4400 AUP reports factual findings without assurance.'],
      ],
    },
    {
      id: 'pa11-complexity-drivers',
      ch: 5,
      front: 'According to the chapter, what does engagement complexity reflect, and what does it not reflect alone?',
      back: 'Complexity reflects risk, subject matter, criteria, uncertainty, locations and stakeholders, not client revenue alone.',
      explanation: 'Complexity reflects risk, subject matter, criteria, uncertainty, locations and stakeholders, so client revenue alone does not decide it.',
      example: 'Complexity can come from risk, subject matter, locations or stakeholders, not only from client revenue.',
      terms: ['Engagement complexity', 'Stakeholders'],
      refs: [
        [5, 'Complexity reflects risk, subject matter, criteria, uncertainty, locations and stakeholders—not client revenue alone.'],
      ],
    },
  ],
});

const PA_M1_L2_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m1-industry-history-and-development',
  title: 'Audit & Assurance: Industry History & Development',
  description: 'Key ideas from the Industry History & Development lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m1-l2',
  lessonTitle: 'Industry History & Development',
  chapterIdPrefix: 'pa-m1-l2',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Did Independent Auditing Develop?'),
    ch('How Did Professional Standards and Oversight Evolve?'),
    ch('How Did Risk-Based Auditing and Quality Management Develop?'),
    ch('How Have Audit and Assurance Developed in Vietnam?'),
  ],
  cards: [
    {
      id: 'pa12-audit-evolution',
      ch: 1,
      front: 'How did audit evolve over time, according to the history lesson?',
      back: 'From accounting-centered checking toward risk-based evidence, professional judgment, quality systems and broader stakeholder accountability.',
      explanation: 'The lesson describes a shift from checking accounting records toward risk-based evidence and broader accountability.',
      example: 'Audit moved from accounting-centered checking toward risk-based evidence and professional judgment.',
      terms: ['Risk-based evidence', 'Professional judgment'],
      refs: [
        [1, 'Audit evolved from accounting-centered checking toward risk-based evidence, professional judgment, quality systems and broader stakeholder accountability.'],
      ],
    },
    {
      id: 'pa12-development-areas',
      ch: 2,
      front: 'Which developments does the history chapter list as part of the growth of the audit profession?',
      back: 'Professional bodies, ethical codes, standards, oversight, electronic evidence, analytics, formal quality management and new assurance subject matter.',
      explanation: 'The list mixes institutions (professional bodies, oversight), rules (ethical codes, standards) and newer work (analytics, new assurance subject matter).',
      example: 'The development of standards and oversight sits alongside professional bodies, ethical codes and electronic evidence in the same list.',
      terms: ['Standards', 'Oversight'],
      refs: [
        [2, 'the development of professional bodies, ethical codes, standards, oversight, electronic evidence, analytics, formal quality management and new assurance subject matter.'],
      ],
    },
    {
      id: 'pa12-quality-standards-shift',
      ch: 3,
      front: 'What approach did IAASB quality standards replace, and with what?',
      back: 'They replaced a control-oriented approach with proactive, risk-based quality management.',
      explanation: 'The change moves quality work from a control-oriented approach to one that is proactive and risk-based.',
      example: 'Quality management became proactive and risk-based instead of control-oriented.',
      terms: ['Quality management', 'IAASB'],
      refs: [
        [3, 'IAASB quality standards replaced a control-oriented approach with proactive, risk-based quality management'],
      ],
    },
    {
      id: 'pa12-vietnam-through-adoption',
      ch: 4,
      front: 'How do global audit developments matter for Vietnam, according to the chapter?',
      back: 'Only through current Vietnamese adoption, licensing, standards and entity-specific reporting requirements.',
      explanation: 'A global development does not apply by itself. The chapter says it matters through what Vietnam has adopted and what the entity must report.',
      example: 'A team hearing about a new global practice should check current Vietnamese adoption, licensing and standards before relying on it.',
      terms: ['Vietnamese adoption', 'Licensing'],
      refs: [
        [4, 'Global developments matter only through current Vietnamese adoption, licensing, standards and entity-specific reporting requirements.'],
      ],
    },
  ],
});

const PA_M1_L3_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m1-global-market-overview',
  title: 'Audit & Assurance: Global Market Overview',
  description: 'Key ideas from the Global Market Overview lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m1-l3',
  lessonTitle: 'Global Market Overview',
  chapterIdPrefix: 'pa-m1-l3',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapters 1 and 2 have no card because they display only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('How Is the Global Audit Industry Structured?'),
    ch('How Are Audit Markets and Firms Measured?'),
    ch('Which Entities and Reporting Needs Drive Demand?'),
    ch('Who Are the Major Audit Provider Types?'),
    ch('How Do Global Networks and Local Member Firms Operate?'),
  ],
  cards: [
    {
      id: 'pa13-demand-support',
      ch: 3,
      front: 'What structurally supports demand for audit, and what do firms compete on?',
      back: 'Demand is supported by law, governance and reporting needs, while firms compete through quality, reputation, expertise and consistent delivery.',
      explanation: 'Demand comes from outside the firm (law, governance, reporting needs); competition between firms is about quality, reputation, expertise and delivery.',
      example: 'A firm cannot rely on demand alone to win work; it also has to show quality, reputation, expertise and consistent delivery.',
      terms: ['Demand', 'Quality'],
      refs: [
        [3, 'Demand is structurally supported by law, governance and reporting needs, while firms compete through quality, reputation, expertise and consistent delivery.'],
      ],
    },
    {
      id: 'pa13-networks-vs-focused-firms',
      ch: 4,
      front: 'How can large networks and focused firms each compete, according to the example?',
      back: 'Large networks coordinate multinational work, while focused firms can compete through local knowledge, specialization and senior attention.',
      explanation: 'The example contrasts coordination of multinational work with competition on local knowledge, specialization and senior attention.',
      example: 'A multinational client may suit a large network, while a client that values senior attention and local knowledge may suit a focused firm.',
      terms: ['Global network', 'Local practice'],
      refs: [
        [4, 'Large networks coordinate multinational work, while focused firms can compete through local knowledge, specialization and senior attention.'],
      ],
    },
    {
      id: 'pa13-scale-not-suitability',
      ch: 5,
      front: 'A firm points to its large network as proof it should take a Vietnamese engagement. What does the chapter say about network scale?',
      back: 'Network scale does not prove suitability, authorization or quality for every Vietnamese engagement.',
      explanation: 'Size is not evidence of fit. Suitability, authorization and quality still have to be shown for the engagement.',
      example: 'Before accepting the work, the firm should check suitability and authorization for that engagement instead of citing network scale.',
      terms: ['Network scale', 'Authorization'],
      refs: [
        [5, 'Network scale does not prove suitability, authorization or quality for every Vietnamese engagement.'],
      ],
    },
  ],
});

const PA_M1_L4_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m1-vietnam-market-overview',
  title: 'Audit & Assurance: Vietnam Market Overview',
  description: 'Key ideas from the Vietnam Market Overview lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m1-l4',
  lessonTitle: 'Vietnam Market Overview',
  chapterIdPrefix: 'pa-m1-l4',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Chapter 3 has no card because it displays only the lesson\'s shared base sentences already used by other cards plus a dimension list, with template key-term definitions.',
  ],
  chapters: [
    ch('What Does Vietnam\'s Audit and Assurance Market Look Like?'),
    ch('Which Entities and Engagements Drive Audit Demand?'),
    ch('Who Are the Key Audit and Professional Institutions?'),
    ch('How Are Audits Regulated and Delivered in Vietnam?'),
    ch('What Opportunities and Constraints Shape Vietnam\'s Audit Market?'),
  ],
  cards: [
    {
      id: 'pa14-vietnam-requires',
      ch: 1,
      front: 'What does the Vietnam market overview say Vietnam requires from audit firms?',
      back: 'Current local regulatory knowledge, competent professionals, reliable quality systems and, where relevant, effective cross-border coordination.',
      explanation: 'The overview names four needs: local regulatory knowledge, competent professionals, reliable quality systems and cross-border coordination where relevant.',
      example: 'A firm entering a Vietnamese engagement with an overseas group should plan for local regulatory knowledge and cross-border coordination.',
      terms: ['Regulatory knowledge', 'Quality systems'],
      refs: [
        [1, 'Vietnam requires current local regulatory knowledge, competent professionals, reliable quality systems and, where relevant, effective cross-border coordination.'],
      ],
    },
    {
      id: 'pa14-entity-specific-requirements',
      ch: 2,
      front: 'Which kinds of requirement does the audit-requirement tile say must be verified for each entity?',
      back: 'Statutory, public-interest, listed, foreign-invested and contractual requirements must be verified.',
      explanation: 'The tile labels the audit requirement as entity-specific, so each entity has to be checked against these categories.',
      example: 'For a foreign-invested company that is also listed, the team verifies the statutory, public-interest, listed, foreign-invested and contractual requirements rather than assuming one rule fits.',
      terms: ['Entity-specific', 'Statutory audit'],
      refs: [
        [2, 'Statutory, public-interest, listed, foreign-invested and contractual requirements must be verified.'],
      ],
    },
    {
      id: 'pa14-law-and-circular-status',
      ch: 4,
      front: 'In the chapter example, how is the independent audit law described, and what is said about the circular for Vietnam auditing standards?',
      back: 'The law is described as partially effective. The circular that promulgates Vietnam auditing standards remains listed as in force.',
      explanation: 'The chapter adds that current amendments to the law must be checked, so partially effective is not the end of the check.',
      example: 'A team preparing for an engagement notes that the law is partially effective and confirms current amendments before relying on it.',
      terms: ['Independent audit law', 'Vietnam auditing standards'],
      refs: [
        [4, 'governs independent audit and is partially effective; Circular 214/2012/TT-BTC promulgates Vietnam auditing standards and remains listed as in force.'],
        [4, 'it is partially effective and current amendments must be checked.'],
      ],
    },
    {
      id: 'pa14-verify-entity-requirements',
      ch: 5,
      front: 'Before accepting an audit in Vietnam, which items does the chapter say to verify?',
      back: 'Entity-specific audit requirements, eligible firms and auditors, independence, applicable standards, reporting framework and deadlines.',
      explanation: 'The list covers who may do the work, which standards and framework apply, and when reporting is due.',
      example: 'A new client asks for an audit. Before accepting, the team verifies eligible firms and auditors, independence, applicable standards, the reporting framework and deadlines.',
      terms: ['Eligible auditors', 'Reporting framework'],
      refs: [
        [5, 'Verify entity-specific audit requirements, eligible firms and auditors, independence, applicable standards, reporting framework and deadlines.'],
      ],
    },
  ],
});

const PA_M1_L5_DECK: FlashcardDeckContent = defineLessonDeck({
  ...COMMON,
  deckId: 'professional-audit-m1-industry-drivers-and-external-factors',
  title: 'Audit & Assurance: Industry Drivers & External Factors',
  description: 'Key ideas from the Industry Drivers & External Factors lesson, each grounded in text shown in its chapter.',
  lessonId: 'pa-m1-l5',
  lessonTitle: 'Industry Drivers & External Factors',
  chapterIdPrefix: 'pa-m1-l5',
  mappingNotes: [
    'Excerpts are checked against the rendered chapter text.',
    'Every chapter of this lesson has at least one card.',
  ],
  chapters: [
    ch('How Do Capital Markets and Corporate Complexity Affect Audit Demand?'),
    ch('Why Do Public Interest, Regulation and Trust Matter?'),
    ch('How Are Technology and Data Changing Audit Work?'),
    ch('How Are Talent and Reporting Expectations Evolving?'),
    ch('What External Risks and Opportunities Shape Audit Firms?'),
  ],
  cards: [
    {
      id: 'pa15-pressures-on-audit',
      ch: 1,
      front: 'Which pressures does the drivers lesson list as shaping audit demand and delivery?',
      back: 'Reporting changes, investor expectations, group structures, complex estimates, sustainability, cyber risk, digital evidence, talent scarcity and commercial pressure.',
      explanation: 'The list combines demand-side drivers (reporting changes, investor expectations, group structures) with delivery-side pressures (talent scarcity, commercial pressure).',
      example: 'A firm can check its client base against pressures such as reporting changes, group structures, talent scarcity and commercial pressure.',
      terms: ['Reporting changes', 'Talent scarcity'],
      refs: [
        [1, 'reporting changes, investor expectations, group structures, complex estimates, sustainability, cyber risk, digital evidence, talent scarcity and commercial pressure.'],
      ],
    },
    {
      id: 'pa15-independence-meaning',
      ch: 2,
      front: 'What does independence mean for an audit, according to the key term definition?',
      back: 'Freedom from conditions compromising objectivity, including independence of mind and appearance under applicable requirements.',
      explanation: 'The definition covers both independence of mind and independence in appearance, under applicable requirements.',
      example: 'An engagement team considers both independence of mind and appearance when checking conditions that could compromise objectivity.',
      terms: ['Independence'],
      refs: [
        [2, 'Freedom from conditions compromising objectivity, including independence of mind and appearance under applicable requirements.'],
      ],
    },
    {
      id: 'pa15-no-automatic-application',
      ch: 3,
      front: 'A colleague assumes new international standards and emerging assurance mandates apply in Vietnam automatically. What should be done instead?',
      back: 'Do not assume they apply automatically; verify Vietnamese adoption and client-specific requirements.',
      explanation: 'Applicability in Vietnam has to be checked. International standards and emerging mandates are not automatic.',
      example: 'Before promising a new type of assurance work, the team verifies Vietnamese adoption and the client-specific requirements.',
      terms: ['Vietnamese adoption', 'Client-specific requirements'],
      refs: [
        [3, 'Do not assume international standards or emerging assurance mandates apply automatically; verify Vietnamese adoption and client-specific requirements.'],
      ],
    },
    {
      id: 'pa15-issa-5000-status',
      ch: 4,
      front: 'How does the chapter describe the status of final ISSA 5000?',
      back: 'It creates a global sustainability-assurance baseline but is not generally effective until periods beginning on or after its stated effective date.',
      explanation: 'Final does not mean generally effective yet. The chapter ties effectiveness to the start of the reporting period.',
      example: 'A firm asked to assure a sustainability report checks the period start against the stated effective date before treating ISSA 5000 as generally effective.',
      terms: ['ISSA 5000', 'Sustainability assurance'],
      refs: [
        [4, 'Final ISSA 5000 creates a global sustainability-assurance baseline but is not generally effective until periods beginning on or after'],
      ],
    },
    {
      id: 'pa15-balance-assurance-needs',
      ch: 5,
      front: 'What must firms balance as the need for assurance expands?',
      back: 'Expanding assurance needs must be balanced with competence, capacity, technology, independence and quality.',
      explanation: 'Growth in assurance needs is not a goal by itself; it has to be matched by competence, capacity, technology, independence and quality.',
      example: 'A firm that adds assurance work without matching competence and capacity does not balance expanding assurance needs with quality.',
      terms: ['Competence', 'Capacity'],
      refs: [
        [5, 'Long-term development requires firms to balance expanding assurance needs with competence, capacity, technology, independence and quality.'],
      ],
    },
  ],
});

export const PROFESSIONAL_AUDIT_M01_DECKS: FlashcardDeckContent[] = [
  PA_M1_L1_DECK,
  PA_M1_L2_DECK,
  PA_M1_L3_DECK,
  PA_M1_L4_DECK,
  PA_M1_L5_DECK,
];
