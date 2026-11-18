// Audit & Assurance, Module 02 Match & Sort activities. The engagement lifecycle is a genuine
// sequence: the chapter states the progression in order. Lessons 2.2, 2.5 and 2.6 have no activity
// (the chapters list considerations without definitions or categories), and 2.6 chapter 3 is held.

import type { Wave2Activity } from '../../types';
import { matching, sequence } from '../../kit';
import { PA_M2 as module } from '../source';

const src = (lessonNo: number) => module.lessonSources[lessonNo - 1];

export const PA_M02_ACTIVITIES: Wave2Activity[] = [
  sequence({
    id: 'seq-engagement-lifecycle', ctx: { module, lessonNo: 1 }, sourceIds: src(1),
    refs: [[1, ['the progression from engagement request through acceptance, planning, risk, procedures, evaluation, review, reporting and quality monitoring.']]],
    title: 'Put the engagement lifecycle in order',
    objective: 'Order the stages of an external audit engagement from request to quality monitoring.',
    summary: 'An engagement moves from request through acceptance, planning, risk assessment, procedures, evaluation, review and reporting, and ends with quality monitoring.',
    evidence: 'the progression from engagement request through acceptance, planning, risk, procedures, evaluation, review, reporting and quality monitoring.',
    steps: [
      ['Engagement request', 'The lifecycle starts when an engagement is requested.', 'Nothing can be accepted until it has been asked for.'],
      ['Acceptance', 'Acceptance follows the request: the firm decides whether to take the engagement on.', 'The firm decides whether to take the work on.'],
      ['Planning', 'Planning follows acceptance, once the engagement terms and team are settled.', 'It sets up the approach once the work is accepted.'],
      ['Risk assessment', 'Risks are identified and assessed before procedures are designed in response.', 'It identifies where misstatement could arise.'],
      ['Procedures', 'Procedures respond to the assessed risks and produce the evidence.', 'It is the work that responds to the risks found.'],
      ['Evaluation', 'The evidence and findings are evaluated after the procedures are done.', 'It weighs what the procedures found.'],
      ['Review', 'Review challenges the judgments and evidence before the report is issued.', 'It challenges the judgments reached.'],
      ['Reporting', 'The report is formed and issued after evaluation and review.', 'It communicates the conclusion.'],
      ['Quality monitoring', 'Monitoring closes the cycle by checking how the quality system performed.', 'It looks back at how the work and the system performed.'],
    ],
  }),
  matching({
    id: 'match-risk-components', ctx: { module, lessonNo: 3 }, sourceIds: src(3),
    refs: [[1, ['Susceptibility of an assertion to material misstatement before considering related controls.', 'Risk that a material misstatement will not be prevented, or detected and corrected, by relevant controls.', 'Risk that audit procedures will not detect an existing material misstatement.']]],
    title: 'Match each risk component to its meaning',
    objective: 'Distinguish inherent, control and detection risk in the simplified audit risk model.',
    summary: 'Inherent risk is judged before controls, control risk is about the controls, and detection risk is about the audit procedures.',
    promptLabel: 'Risk component', answerLabel: 'Meaning',
    pairs: [
      ['Inherent risk', 'Susceptibility to material misstatement before considering related controls', 'It is judged before any control is taken into account.', 'It looks at the item before controls come into the picture.'],
      ['Control risk', 'Risk that the entity\u2019s controls will not prevent, or detect and correct, a material misstatement', 'It concerns whether the relevant controls do their job.', 'It is about the entity\u2019s own safeguards.'],
      ['Detection risk', 'Risk that audit procedures will not detect an existing material misstatement', 'It concerns the auditor\u2019s own procedures, not the entity\u2019s.', 'It is the one the auditor can change by changing the work.'],
    ],
  }),
  matching({
    id: 'match-opinion-types', ctx: { module, lessonNo: 4 }, sourceIds: src(4),
    refs: [[2, ['Opinion that the financial statements are presented, in all material respects, in accordance with the applicable framework.', 'Modified opinion used for a material but not pervasive misstatement or evidence limitation under applicable reporting requirements.', 'Modified opinion for material and pervasive misstatement under applicable reporting requirements.', 'An Emphasis of Matter draws attention to an appropriately presented matter and is not automatically a modified opinion.']]],
    title: 'Match each report element to when it is used',
    objective: 'Tell the opinion types and the Emphasis of Matter paragraph apart.',
    summary: 'The opinion type follows the circumstances, and an Emphasis of Matter draws attention without modifying the opinion.',
    promptLabel: 'Report element', answerLabel: 'What it signals',
    pairs: [
      ['Unmodified opinion', 'The statements are presented, in all material respects, in accordance with the framework', 'This is what an unmodified opinion states.', 'It is the opinion with no modification.'],
      ['Qualified opinion', 'A material misstatement or evidence limitation that is not pervasive', 'A qualified opinion is used when the matter is material but not pervasive.', 'The matter is significant but contained.'],
      ['Adverse opinion', 'A material misstatement that is also pervasive', 'An adverse opinion is used for material and pervasive misstatement.', 'The matter is significant and widespread.'],
      ['Emphasis of Matter', 'Draws attention to a properly presented matter without itself modifying the opinion', 'It highlights a matter and is not automatically a modified opinion.', 'It points the reader somewhere and leaves the opinion as it was.'],
    ],
  }),
];
