// Audit & Assurance, Module 05 Match & Sort activity. Only lesson 5.2 has one: its three chapters each
// state a limit on what a tool or engagement delivers. The other lessons are flashcards-only because
// their chapters list considerations without definitions, categories or ordered steps.

import type { Wave2Activity } from '../../types';
import { matching } from '../../kit';
import { PA_M5 as module } from '../source';

export const PA_M05_ACTIVITIES: Wave2Activity[] = [
  matching({
    id: 'match-limits-of-digital-tools', ctx: { module, lessonNo: 2 }, sourceIds: module.lessonSources[1],
    refs: [
      [1, ['AI and analytics can improve risk identification and efficiency but do not replace evidence evaluation, skepticism or responsibility for the conclusion.']],
      [2, ['More frequent monitoring improves visibility but is not automatically equivalent to a properly scoped statutory audit or assurance engagement.', 'An automated alert can identify an exception sooner, but formal assurance still requires criteria, evidence, scope and reporting under applicable standards.']],
      [3, ['A controls assurance engagement does not guarantee immunity from every cyber threat or future incident.']],
    ],
    title: 'Match each digital development to its limit',
    objective: 'State what AI, monitoring, alerts and controls assurance do not deliver on their own.',
    summary: 'Each digital development helps but stops short of something: replacing judgment, giving assurance, or guaranteeing the future.',
    promptLabel: 'Development', answerLabel: 'Its limit',
    pairs: [
      ['AI and analytics', 'Do not replace evidence evaluation, skepticism or responsibility for the conclusion', 'The chapter says they can improve risk identification and efficiency, but not replace these.', 'They assist the work and leave something with the practitioner.'],
      ['Continuous monitoring', 'Not automatically equivalent to a properly scoped audit or assurance engagement', 'More frequent monitoring improves visibility but is not the same as a scoped engagement.', 'More frequent is not the same as formally scoped.'],
      ['An automated alert', 'Does not itself give assurance, which still needs criteria, evidence, scope and reporting', 'An alert can find an exception sooner, but assurance needs a defined basis and a report.', 'It points to something; it does not conclude.'],
      ['A controls assurance engagement', 'Does not guarantee immunity from every cyber threat or future incident', 'It speaks to the controls in scope and not to every future event.', 'It looks at defined controls and says nothing certain about what happens next.'],
    ],
  }),
];
