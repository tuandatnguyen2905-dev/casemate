// Audit & Assurance, Module 03 Match & Sort activities. Lessons 3.1, 3.3, 3.5 and 3.6 have none:
// 3.3 and 3.5 show text on a different topic than their titles, and 3.1 and 3.6 list considerations
// without categories or definitions.

import type { Wave2Activity } from '../../types';
import { sorting } from '../../kit';
import { PA_M3 as module } from '../source';

const src = (lessonNo: number) => module.lessonSources[lessonNo - 1];

export const PA_M03_ACTIVITIES: Wave2Activity[] = [
  sorting({
    id: 'sort-evidence-by-balance', ctx: { module, lessonNo: 2 }, sourceIds: src(2),
    refs: [[3, ['For inventory, existence, condition, costing and net realizable value may require different evidence; for revenue, occurrence, cutoff and contract terms can drive procedures.']]],
    title: 'Sort the evidence question by the balance it belongs to',
    objective: 'Tell which questions drive procedures for inventory and which for revenue.',
    summary: 'Inventory raises questions of existence, condition, costing and net realizable value; revenue raises questions of occurrence, cutoff and contract terms.',
    categories: [
      ['inventory', 'Inventory', 'Questions about stock on hand'],
      ['revenue', 'Revenue', 'Questions about sales recognised'],
    ],
    items: [
      ['Existence', 'inventory', 'The chapter lists existence among the inventory questions.', 'Is the stock really there?'],
      ['Condition', 'inventory', 'Condition is an inventory question in the chapter.', 'Is the stock in a state that can be sold?'],
      ['Costing', 'inventory', 'Costing is listed for inventory.', 'How is the cost of stock arrived at?'],
      ['Net realizable value', 'inventory', 'Net realizable value is an inventory question in the chapter.', 'What could the stock be sold for?'],
      ['Occurrence', 'revenue', 'Occurrence is listed among the revenue questions.', 'Did the sale actually happen?'],
      ['Cutoff', 'revenue', 'Cutoff is a revenue question: a sale must fall in the right period.', 'Did the sale fall in the right period?'],
      ['Contract terms', 'revenue', 'Contract terms are listed for revenue.', 'What did the agreement with the customer say?'],
    ],
  }),
  sorting({
    id: 'sort-kpi-or-quality-indicator', ctx: { module, lessonNo: 4 }, sourceIds: src(4),
    refs: [[3, ['Financial KPIs describe capacity and economics; quality indicators can include consultation, review, training, workload, findings and remediation under defined methods.', 'Chargeable hours, Utilization, Billing rate, Realization']]],
    title: 'Sort each measure into financial KPI or quality indicator',
    objective: 'Keep audit-firm financial measures separate from quality indicators.',
    summary: 'Financial KPIs describe capacity and economics. Quality indicators describe how the work was done, and the two must not be treated as the same thing.',
    categories: [
      ['financial-kpi', 'Financial KPI', 'Describes capacity and economics'],
      ['quality-indicator', 'Quality indicator', 'Describes how the work was done'],
    ],
    items: [
      ['Chargeable hours', 'financial-kpi', 'Chargeable hours are one of the capacity and economics measures in the chapter\u2019s list.', 'It counts time that can be billed.'],
      ['Utilization', 'financial-kpi', 'Utilization compares productive time with available capacity.', 'It compares time used with time available.'],
      ['Billing rate', 'financial-kpi', 'Billing rate sits in the chapter\u2019s list of economics measures.', 'It is a price per unit of effort.'],
      ['Realization', 'financial-kpi', 'Realization compares fees earned with billable effort.', 'It compares fees collected with effort recorded.'],
      ['Consultation', 'quality-indicator', 'The chapter names consultation among the quality indicators.', 'It describes whether difficult matters were discussed with others.'],
      ['Review', 'quality-indicator', 'Review is named among the quality indicators.', 'It describes whether work was challenged.'],
      ['Training', 'quality-indicator', 'Training is named among the quality indicators.', 'It describes how well people were prepared.'],
      ['Findings and remediation', 'quality-indicator', 'The chapter names findings and remediation among the quality indicators.', 'It describes whether problems were found and fixed.'],
    ],
  }),
];
