// Commercial Banking Module 05, Lessons 5.1 and 5.2 activities (source: commercialBankingM05B01.tsx).
// No adoption statistics, growth rates or deployment claims. Lesson 5.2 Chapter 3 (restriction notice) is not cited.
// Activities use only text the learner sees: the source's registerVisual tables are not rendered (chapters draw
// commercialBankingM05VisualSpecs.ts instead). Lesson 5.2 is covered by flashcards only.

import type { MatchSortActivity } from '../types';
import { chapterRef, defineActivities } from './shared';
import { PAIR_INSTRUCTIONS } from './instructions';

const MODULE = 'COMMERCIAL_BANKING_MODULE05' as const;
const L51 = '5.1 Consumer Trends';
const ch = (lesson: string, index: number, title: string, sourceIds: string[], grounding: string) => chapterRef(MODULE, lesson, index, title, sourceIds, grounding);

export const CB_M05B01_ACTIVITIES: MatchSortActivity[] = defineActivities('banking-commercial', 'module-05', [
  {
    activityId: 'cb-m05-match-segment-financial-jobs',
    type: 'concept-matching',
    title: 'Households, SMEs and corporates: different financial jobs',
    learningObjective: 'Match each Vietnamese customer segment to the financial jobs it needs a bank to do, so segments are defined by job and risk rather than treated alike.',
    instructions: PAIR_INSTRUCTIONS,
    promptLabel: 'Segment',
    answerLabel: 'Financial jobs',
    summary: 'Inclusion, trust and digital access matter for every segment, but the financial job and risk model differ. Treating segments alike creates poor fit and risk.',
    items: {
      prompts: [
        { id: 'seg-households', text: 'Households' },
        { id: 'seg-smes', text: 'SMEs' },
        { id: 'seg-corporates', text: 'Corporates' },
      ],
      answers: [
        { id: 'job-households', text: 'Safe payments, savings, responsible credit and guidance.' },
        { id: 'job-smes', text: 'Cash-flow visibility, payments, working capital and practical underwriting.' },
        { id: 'job-corporates', text: 'Liquidity, transaction, trade, FX and risk services.' },
      ],
    },
    pairs: [
      { id: 'pair-seg-households', promptId: 'seg-households', answerId: 'job-households', explanation: 'Everyday money needs come first for families, so service must stay simple, safe and understandable.', hint: 'Families building everyday security and savings.' },
      { id: 'pair-seg-smes', promptId: 'seg-smes', answerId: 'job-smes', explanation: 'Cash-flow data can improve service and assessment for smaller firms, but seasonality and informality still need human judgment.', hint: 'Smaller firms whose daily cash and funding are tight.' },
      { id: 'pair-seg-corporates', promptId: 'seg-corporates', answerId: 'job-corporates', explanation: 'Large organisations bring complexity that sustains specialist and relationship teams alongside digital tools.', hint: 'Treasury teams managing large flows across borders.' },
    ],
    sourceRefs: [
      ch(L51, 2, 'Emerging Customer Needs in Vietnam', ['cb-m05-s01', 'cb-m05-s02', 'cb-m05-s03'], '“What it is” narrative (household, SME and corporate needs) and the “Households, SMEs and corporates hire a bank for different jobs” learning visual.'),
    ],
  },
]);
