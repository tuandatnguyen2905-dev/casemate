// Audit & Assurance, Module 01 (apps/IndustryKnowledge/auditAssuranceModule01.tsx), lessons 1.1 to 1.5.
// Excerpts are verbatim from the chapter text the reader displays. No law numbers, effective dates,
// statistics or market figures are used: the Vietnam chapters carry unresolved legal records.

import type { FlashcardDeckContent } from '../../types';
import { lessonDeck } from '../../kit';
import { PA_M1 as module } from '../source';

export const PA_M01_DECKS: FlashcardDeckContent[] = [
  lessonDeck({
    module, lessonNo: 1,
    description: 'What assurance is, how audit differs from its neighbours, and how engagements are told apart.',
    notes: ['Chapters 2 and 5 repeat the nearest source item with a different focus; cards cite chapter 1 or 4 for the item\u2019s own text and chapter 2 only for its key-term definitions.'],
    cards: [
      ['conclusion-drivers', 1, 'M', 'What sets the limits of the conclusion an assurance engagement can support?', 'The engagement type, materiality, evidence and the applicable standards. Even an audit does not guarantee that every error or fraud is detected.', 'The conclusion can only be as strong as what the engagement was scoped to do and the evidence gathered.', 'Two engagements for the same company can support different kinds of conclusion because they are different engagement types.', ['Materiality', 'Applicable standards'],
        [[1, 'Engagement type, materiality, evidence and applicable standards determine the conclusion; an audit does not guarantee detection of every error or fraud.']]],
      ['reasonable-assurance', 1, 'C', 'Why is reasonable assurance described as high but not absolute?', 'Because audit evidence is generally persuasive rather than conclusive.', 'Evidence can strongly support a conclusion without proving it beyond every doubt.', 'A clean audit report is strong evidence about the statements, not a promise that nothing is wrong.', ['Reasonable assurance', 'Audit evidence'],
        [[1, 'ISA 200 explains reasonable assurance as high but not absolute because audit evidence is generally persuasive rather than conclusive.']]],
      ['limited-vs-reasonable', 2, 'D', 'How does limited assurance compare with reasonable assurance?', 'Limited assurance is a lower level of assurance than reasonable assurance, and it is expressed in the form the applicable standard requires.', 'The two differ in level, so the wording of the conclusion differs too.', 'A practitioner asked for limited assurance must word the conclusion as the applicable standard requires, not as an audit opinion.', ['Limited assurance', 'Reasonable assurance'],
        [[2, 'A lower level of assurance than reasonable assurance, expressed in the form required by the applicable standard.']]],
      ['suitable-criteria', 2, 'C', 'What job do suitable criteria do in an assurance engagement?', 'They are the benchmarks used to measure or evaluate the subject matter.', 'Without agreed benchmarks, a practitioner has nothing against which to judge the subject matter.', 'A report on selected non-financial information needs stated benchmarks before it can reach a conclusion.', ['Suitable criteria', 'Subject matter'],
        [[2, 'Benchmarks used to measure or evaluate subject matter in an assurance engagement.']]],
      ['independence', 1, 'C', 'What does independence mean for a practitioner on an assurance engagement?', 'Freedom from conditions that compromise objectivity, covering independence of mind and the appearance of independence under the applicable requirements.', 'Credibility needs both real objectivity and the appearance of it.', 'A practitioner with a conflict of interest has a problem even if their judgement is sound, because independence in appearance is also required.', ['Independence', 'Objectivity'],
        [[1, 'Freedom from conditions compromising objectivity, including independence of mind and appearance under applicable requirements.']]],
      ['subject-matter-covered', 1, 'C', 'Which subject matter do independent professional engagements cover?', 'Financial statements, controls and selected non-financial information, under defined frameworks.', 'The common thread is independent work that enhances the credibility of information.', 'A controls engagement and a financial statement audit both enhance credibility, but of different subject matter.', ['Assurance', 'Framework'],
        [[1, 'independent professional engagements enhancing credibility of financial statements, controls and selected non-financial information under defined frameworks.']]],
      ['audit-vs-neighbours', 3, 'D', 'Match each role to its job: external audit, internal audit, accounting, consulting. Who stays responsible for the statements?', 'External audit independently evaluates the statements under an applicable framework; internal audit supports governance and controls; accounting prepares records and statements; consulting advises. Management remains responsible for the statements and controls.', 'Audit sits apart from preparing, advising or running controls, which is what keeps it independent.', 'A finance team that prepares the statements is doing accounting, not audit, even if it checks its own work.', ['External audit', 'Internal audit', 'Management responsibility'],
        [[3, 'External audit independently evaluates financial statements under an applicable framework. Internal audit supports governance and controls; accounting prepares records and statements; consulting advises; management remains responsible for financial statements and controls.']]],
      ['management-vs-auditor', 3, 'B', 'Management prepares revenue records and estimates. What does the external auditor do with them?', 'The auditor assesses the risks and the evidence before expressing an opinion. The auditor does not prepare the records.', 'Preparing and auditing are separate roles.', 'The company books a revenue estimate; the auditor tests the evidence behind it and then forms an opinion on the statements.', ['Estimate', 'Opinion'],
        [[3, 'Management prepares revenue records and estimates; the external auditor assesses risks and evidence before expressing an opinion.']]],
      ['aup-vs-assurance', 4, 'D', 'One engagement covers assurance other than audits or reviews of historical financial information; another reports factual findings only. Which is which?', 'ISAE 3000 covers assurance other than audits or reviews of historical financial information. ISRS 4400 agreed-upon procedures report factual findings without assurance.', 'The deciding feature is whether any assurance is given at all.', 'A lender who only wants specified checks reported, with no assurance, is asking for agreed-upon procedures.', ['ISAE 3000', 'Agreed-upon procedures'],
        [[4, 'ISAE 3000 covers assurance other than audits or reviews of historical financial information, while ISRS 4400 AUP reports factual findings without assurance.']]],
      ['complexity-drivers', 4, 'M', 'If client revenue does not drive how complex an engagement is, what does?', 'Risk, subject matter, criteria, uncertainty, locations and stakeholders.', 'Size is a poor guide: a small entity with a complex estimate can be harder than a large simple one.', 'A small group with several locations and uncertain estimates can need more work than a larger single-site client.', ['Risk', 'Criteria'],
        [[4, 'Complexity reflects risk, subject matter, criteria, uncertainty, locations and stakeholders\u2014not client revenue alone.']]],
      ['segmentation-axes', 4, 'C', 'Along which dimensions are engagements segmented?', 'Engagement type, entity, subject matter, reporting framework, public-interest status, group structure and applicable regulation.', 'Segmenting on several axes avoids treating all engagements as one service.', 'Two engagements for the same client can fall into different segments if one is a group audit and the other a controls engagement.', ['Segmentation', 'Public-interest'],
        [[4, 'segmentation by engagement type, entity, subject matter, reporting framework, public-interest status, group structure and applicable regulation.']]],
      ['generic-service-label', 4, 'B', 'A client asks for a generic service. What should acceptance, competence, independence, methodology and reporting be matched to?', 'The exact client and engagement, not a generic service label.', 'A label hides differences that change the work and the conclusion.', 'Before accepting, the team writes down the actual engagement type and client rather than recording only that an audit is requested.', ['Acceptance', 'Methodology'],
        [[4, 'Match acceptance, competence, independence, methodology and reporting to the exact client and engagement rather than a generic service label.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 2,
    description: 'The direction audit has evolved in, and why global developments matter locally only through adoption.',
    notes: ['The lesson\u2019s single source item is displayed in all four chapters; cards cite chapter 1, the chapter that owns it. The chapter 1 example also states an international effective date, which is not used.'],
    cards: [
      ['evolution-direction', 1, 'M', 'In which direction has audit practice evolved?', 'From accounting-centred checking toward risk-based evidence, professional judgment, quality systems and broader stakeholder accountability.', 'Each step added something beyond checking the records.', 'Auditors who once concentrated on checking records now start from the risks that could cause material misstatement.', ['Risk-based audit', 'Stakeholder accountability'],
        [[1, 'Audit evolved from accounting-centered checking toward risk-based evidence, professional judgment, quality systems and broader stakeholder accountability.']]],
      ['development-strands', 1, 'C', 'Which strands of development make up the history of the industry?', 'Professional bodies, ethical codes, standards, oversight, electronic evidence, analytics, formal quality management and new assurance subject matter.', 'The history covers people, rules and tools together, not only technology.', 'Analytics belongs on the list alongside ethical codes and oversight, as one strand among several.', ['Oversight', 'Electronic evidence'],
        [[1, 'the development of professional bodies, ethical codes, standards, oversight, electronic evidence, analytics, formal quality management and new assurance subject matter.']]],
      ['quality-management-shift', 1, 'D', 'How did the IAASB quality standards change the earlier approach to quality?', 'They replaced a control-oriented approach with proactive, risk-based quality management.', 'The change is from checking controls to identifying quality risks and responding to them.', 'A firm now asks which quality risks matter to it and how it will respond, rather than only confirming that listed controls exist.', ['Quality management', 'IAASB'],
        [[1, 'IAASB quality standards replaced a control-oriented approach with proactive, risk-based quality management']]],
      ['global-development-local-effect', 1, 'B', 'A new international audit development is announced. When does it matter for an engagement in Vietnam?', 'Only through current Vietnamese adoption, licensing, standards and entity-specific reporting requirements.', 'An international development does not apply by itself.', 'A team checks whether the development has been adopted for the client\u2019s reporting before changing its approach.', ['Adoption', 'Licensing'],
        [[1, 'Global developments matter only through current Vietnamese adoption, licensing, standards and entity-specific reporting requirements.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 3,
    description: 'How the global audit market is made up, what supports demand and what firms compete on.',
    notes: ['Chapter 2 (\u201cmeasured\u201d) shows text about provider types and demand, not measurement, so no card is placed there.'],
    cards: [
      ['demand-and-competition', 1, 'M', 'What supports demand for audit structurally, and what do firms compete on?', 'Law, governance and reporting needs support demand. Firms compete through quality, reputation, expertise and consistent delivery.', 'Demand comes from requirements and trust, so price is not the only basis of competition.', 'A client that must be audited chooses between firms on reputation and expertise as well as fee.', ['Demand', 'Reputation'],
        [[1, 'Demand is structurally supported by law, governance and reporting needs, while firms compete through quality, reputation, expertise and consistent delivery.']]],
      ['provider-tiers', 4, 'C', 'Which kinds of provider make up the global market?', 'International networks, mid-tier firms, national practices and specialists.', 'Providers differ in reach, depth and the clients they serve.', 'A multinational group may use a network firm, while a local company may use a national practice.', ['Network', 'Mid-tier', 'Specialist'],
        [[4, 'international networks, mid-tier firms, national practices and specialists serving client segments under professional, ethical and independence constraints.']]],
      ['network-vs-focused', 1, 'D', 'How do large networks and focused firms usually differ in what they compete on?', 'Large networks coordinate multinational work. Focused firms compete through local knowledge, specialization and senior attention.', 'Each type wins work where its strength fits the client.', 'A group with operations in many countries suits a network; a niche client may prefer a firm that gives senior attention.', ['Network', 'Specialization'],
        [[1, 'Large networks coordinate multinational work, while focused firms can compete through local knowledge, specialization and senior attention.']]],
      ['network-scale-caution', 1, 'B', 'A firm says its large network proves it is right for a Vietnamese engagement. How should that claim be read?', 'It does not prove suitability, authorization or quality for every Vietnamese engagement.', 'Scale is a different thing from fit for the engagement.', 'A client still checks the firm\u2019s authorization and competence for its own engagement.', ['Authorization', 'Network'],
        [[1, 'Network scale does not prove suitability, authorization or quality for every Vietnamese engagement.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 4,
    description: 'What the Vietnamese audit market requires and what to verify first for a given entity.',
    notes: ['The source chapters give law numbers, effective dates and a statistics panel, all backed by an unresolved legal record. None is used: the cards teach only the stable, non-legal points.'],
    cards: [
      ['market-requirements', 1, 'C', 'Beyond technical skill, what does the Vietnamese market require of an audit practice?', 'Current local regulatory knowledge, competent professionals, reliable quality systems and, where relevant, effective cross-border coordination.', 'Local knowledge and quality systems matter as much as technique.', 'A team that audits a foreign-owned subsidiary also needs to coordinate with the overseas group.', ['Regulatory knowledge', 'Quality systems'],
        [[1, 'Vietnam requires current local regulatory knowledge, competent professionals, reliable quality systems and, where relevant, effective cross-border coordination.']]],
      ['demand-sources', 2, 'C', 'Which kinds of need lead entities to engage auditors, and who serves them?', 'Statutory, contractual, lender, investor and group-reporting needs, served by international networks, domestic firms and smaller practices.', 'Different needs can be met by different provider types.', 'A lender\u2019s requirement is a contractual need, even where no statute applies.', ['Statutory', 'Group reporting'],
        [[2, 'international networks, domestic firms and smaller practices serving entities under statutory, contractual, lender, investor and group-reporting needs.']]],
      ['verify-for-the-entity', 1, 'B', 'Before taking an audit mandate for a Vietnamese entity, what should be verified for that entity?', 'The entity-specific audit requirements, eligible firms and auditors, independence, applicable standards, reporting framework and deadlines.', 'Requirements depend on the entity, so nothing is assumed from the sector.', 'A new client is checked entity by entity rather than assumed to follow the same rules as a similar company.', ['Eligibility', 'Reporting framework'],
        [[1, 'Verify entity-specific audit requirements, eligible firms and auditors, independence, applicable standards, reporting framework and deadlines.']]],
    ],
  }),
  lessonDeck({
    module, lessonNo: 5,
    description: 'The external forces that shape audit firms and what they must keep in balance.',
    notes: ['The chapter 1 example states an international effective date for a sustainability standard; it is not used.'],
    cards: [
      ['balance-as-demand-grows', 1, 'M', 'As demand for assurance expands, what must firms balance it against?', 'Competence, capacity, technology, independence and quality.', 'Taking on more work without those in balance puts quality at risk.', 'A firm that grows faster than its trained staff risks work that is below the quality it needs.', ['Capacity', 'Competence'],
        [[1, 'Long-term development requires firms to balance expanding assurance needs with competence, capacity, technology, independence and quality.']]],
      ['external-forces', 1, 'C', 'Name the external forces the chapter says shape audit firms.', 'Reporting changes, investor expectations, group structures, complex estimates, sustainability, cyber risk, digital evidence, talent scarcity and commercial pressure.', 'Some forces increase demand, others strain capacity.', 'Talent scarcity and commercial pressure both push on capacity, while investor expectations push on demand.', ['Cyber risk', 'Talent scarcity'],
        [[1, 'reporting changes, investor expectations, group structures, complex estimates, sustainability, cyber risk, digital evidence, talent scarcity and commercial pressure.']]],
      ['no-automatic-applicability', 1, 'B', 'A new international assurance standard or mandate is announced. May an engagement team assume it applies in Vietnam?', 'No. It must verify Vietnamese adoption and the client-specific requirements first.', 'Emerging mandates do not apply automatically.', 'The team confirms adoption and the client\u2019s own requirements before promising sustainability assurance.', ['Adoption', 'Mandate'],
        [[1, 'Do not assume international standards or emerging assurance mandates apply automatically; verify Vietnamese adoption and client-specific requirements.']]],
    ],
  }),
];
