// Audit & Assurance, Module 01 Match & Sort activities. Grounding quotes are verbatim chapter text.
// Lessons 1.5 is flashcards-only: its chapter lists forces without defining which belongs where.

import type { Wave2Activity } from '../../types';
import { matching, sorting } from '../../kit';
import { PA_M1 as module } from '../source';

const src = (lessonNo: number) => module.lessonSources[lessonNo - 1];

export const PA_M01_ACTIVITIES: Wave2Activity[] = [
  matching({
    id: 'match-assurance-terms', ctx: { module, lessonNo: 1 }, sourceIds: src(1),
    refs: [
      [1, ['A high but not absolute level of assurance supported by sufficient appropriate evidence and reduced audit risk.', 'Specified procedures with factual findings; intended users draw their own conclusions and no assurance conclusion is expressed.', 'Freedom from conditions compromising objectivity, including independence of mind and appearance under applicable requirements.']],
      [2, ['A lower level of assurance than reasonable assurance, expressed in the form required by the applicable standard.', 'Benchmarks used to measure or evaluate subject matter in an assurance engagement.']],
    ],
    title: 'Match the assurance term to its meaning',
    objective: 'Distinguish the core terms used to describe an assurance engagement.',
    summary: 'Level of assurance, benchmarks, procedures and independence each answer a different question about an engagement.',
    promptLabel: 'Term', answerLabel: 'Meaning',
    pairs: [
      ['Reasonable assurance', 'A high but not absolute level of assurance backed by sufficient appropriate evidence', 'The chapter defines it as high but not absolute, supported by sufficient appropriate evidence and reduced audit risk.', 'This is the level an audit aims for, and it stops short of certainty.'],
      ['Limited assurance', 'A lower level of assurance, worded as the applicable standard requires', 'It is lower than the audit level, and the conclusion takes the form the standard requires.', 'It sits below the level an audit gives.'],
      ['Suitable criteria', 'Benchmarks used to measure or evaluate the subject matter', 'Criteria are the yardstick against which an assurance engagement judges its subject matter.', 'Think of what an engagement measures the subject matter against.'],
      ['Agreed-upon procedures', 'Specified procedures with factual findings and no assurance conclusion', 'The practitioner reports what was done and found; intended users draw their own conclusions.', 'The findings are reported, but no conclusion of assurance is given.'],
      ['Independence', 'Freedom from conditions that compromise objectivity, in mind and in appearance', 'It covers independence of mind and the appearance of independence under the applicable requirements.', 'It concerns objectivity, both real and visible.'],
    ],
  }),
  sorting({
    id: 'sort-who-does-what', ctx: { module, lessonNo: 1 }, sourceIds: src(1),
    refs: [[3, ['External audit independently evaluates financial statements under an applicable framework. Internal audit supports governance and controls; accounting prepares records and statements; consulting advises; management remains responsible for financial statements and controls.', 'the external auditor assesses risks and evidence before expressing an opinion.']]],
    title: 'Sort the activity by the role that performs it',
    objective: 'Separate external audit from internal audit, accounting and consulting.',
    summary: 'Audit evaluates; accounting prepares; internal audit supports governance and controls; consulting advises. Management stays responsible for the statements.',
    categories: [
      ['external-audit', 'External audit', 'Independent evaluation of the financial statements'],
      ['internal-audit', 'Internal audit', 'Support for governance and controls'],
      ['accounting', 'Accounting', 'Preparing records and statements'],
      ['consulting', 'Consulting', 'Advising the client'],
    ],
    items: [
      ['Independently evaluates the financial statements under an applicable framework', 'external-audit', 'This is the defining job of an external financial statement audit.', 'It is independent of the people who prepare the statements.'],
      ['Assesses risks and evidence before expressing an opinion', 'external-audit', 'The chapter\u2019s example shows the auditor assessing risk and evidence and then giving an opinion.', 'It ends in an opinion on the statements.'],
      ['Supports governance and controls inside the organisation', 'internal-audit', 'The chapter gives governance and controls as the purpose of internal audit.', 'It works within the organisation to strengthen how it is run.'],
      ['Prepares the records and the financial statements', 'accounting', 'Preparing the records and statements is accounting; evaluating them independently is not.', 'It produces the records rather than judging them.'],
      ['Advises the client', 'consulting', 'The chapter says consulting advises, which differs from evaluating independently.', 'It gives advice rather than an opinion or a set of records.'],
    ],
  }),
  sorting({
    id: 'sort-earlier-or-later-emphasis', ctx: { module, lessonNo: 2 }, sourceIds: src(2),
    refs: [[1, ['Audit evolved from accounting-centered checking toward risk-based evidence, professional judgment, quality systems and broader stakeholder accountability.', 'IAASB quality standards replaced a control-oriented approach with proactive, risk-based quality management']]],
    title: 'Sort what audit emphasised before and after its evolution',
    objective: 'Place each emphasis on the side of the shift the chapter describes.',
    summary: 'Audit moved from checking records and controls toward risk-based evidence, judgment, quality systems and accountability.',
    categories: [
      ['earlier-emphasis', 'Earlier emphasis', 'What audit evolved away from'],
      ['later-emphasis', 'Later emphasis', 'What audit evolved toward'],
    ],
    items: [
      ['Accounting-centered checking', 'earlier-emphasis', 'The chapter says audit evolved from accounting-centered checking.', 'It is the starting point of the shift described.'],
      ['A control-oriented approach to quality', 'earlier-emphasis', 'IAASB standards replaced a control-oriented approach to quality.', 'The quality standards moved away from it.'],
      ['Risk-based evidence', 'later-emphasis', 'Risk-based evidence is the first thing audit evolved toward.', 'It is where the shift ends up.'],
      ['Professional judgment', 'later-emphasis', 'The chapter lists professional judgment among what audit moved toward.', 'It is a direction of travel, not a starting point.'],
      ['Proactive, risk-based quality management', 'later-emphasis', 'It is what replaced the control-oriented approach.', 'It replaced the older approach to quality.'],
      ['Broader stakeholder accountability', 'later-emphasis', 'The chapter names broader stakeholder accountability as part of the move.', 'It widens whom the work answers to.'],
    ],
  }),
  matching({
    id: 'match-market-forces', ctx: { module, lessonNo: 3 }, sourceIds: src(3),
    refs: [[1, ['Demand is structurally supported by law, governance and reporting needs, while firms compete through quality, reputation, expertise and consistent delivery.', 'Large networks coordinate multinational work, while focused firms can compete through local knowledge, specialization and senior attention.']]],
    title: 'Match the market factor to what the chapter says about it',
    objective: 'Link demand, competition and provider types to their descriptions.',
    summary: 'Requirements support demand; quality and reputation win work; networks and focused firms win it in different ways.',
    promptLabel: 'Market factor', answerLabel: 'What the chapter says',
    pairs: [
      ['What supports demand for audit', 'Law, governance and reporting needs', 'The chapter says demand is structurally supported by these three.', 'Think of requirements, not of price.'],
      ['What firms compete on', 'Quality, reputation, expertise and consistent delivery', 'These are the bases of competition named in the chapter.', 'These are things a client judges rather than a price list.'],
      ['Large networks', 'Coordinating multinational work', 'The example gives coordinating work across countries as the large networks\u2019 strength.', 'Their reach is the point.'],
      ['Focused firms', 'Local knowledge, specialization and senior attention', 'The example names these as how focused firms can compete.', 'They win on depth rather than breadth.'],
    ],
  }),
  sorting({
    id: 'sort-need-or-provider', ctx: { module, lessonNo: 4 }, sourceIds: src(4),
    refs: [[1, ['international networks, domestic firms and smaller practices serving entities under statutory, contractual, lender, investor and group-reporting needs.']]],
    title: 'Sort audit needs from the providers that serve them',
    objective: 'Tell the reasons entities need an audit from the kinds of firm that deliver it.',
    summary: 'Entities need audits for statutory, contractual, lender, investor and group-reporting reasons, and networks, domestic firms and smaller practices serve them.',
    categories: [
      ['reason-for-audit', 'Reason an entity needs an audit', 'Why the work is requested'],
      ['type-of-provider', 'Type of provider', 'Who delivers the work'],
    ],
    items: [
      ['Statutory need', 'reason-for-audit', 'The chapter lists statutory need among the needs entities have.', 'It describes why an audit is wanted, not who performs it.'],
      ['Lender need', 'reason-for-audit', 'A lender can require an audit; the chapter names lender needs.', 'It describes a party that asks for the work.'],
      ['Investor need', 'reason-for-audit', 'Investor needs are one of the reasons the chapter lists.', 'It is a party that relies on the result.'],
      ['Group-reporting need', 'reason-for-audit', 'Group reporting is the last of the needs the chapter names.', 'It arises from reporting to a parent or group.'],
      ['International network', 'type-of-provider', 'International networks are the first provider type the chapter names.', 'It is a firm, not a reason for engagement.'],
      ['Domestic firm', 'type-of-provider', 'Domestic firms are one of the three provider types listed.', 'It is a firm that delivers the work.'],
      ['Smaller practice', 'type-of-provider', 'Smaller practices complete the list of provider types.', 'It is a firm that delivers the work.'],
    ],
  }),
];
