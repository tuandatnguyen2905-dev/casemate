import type { MatchSortPack } from '../types';
import { CB_M04B03_ACTIVITIES } from './commercialBankingM04B03';
import { CB_M04MORE_ACTIVITIES } from './commercialBankingM04More';

/** Commercial Banking Module 04 (competitive landscape), lessons 4.1 to 4.5. */
export const COMMERCIAL_BANKING_M04_PACK: MatchSortPack = {
  packId: 'commercial-banking-m04',
  title: 'Commercial Banking \u00b7 Module 04 practice',
  industryId: 'banking-commercial',
  moduleId: 'module-04',
  sourceModuleKey: 'COMMERCIAL_BANKING_MODULE04',
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked \u201cDraft / Ready for Review\u201d. These activities use only its definitions, mechanisms and frameworks: no market shares, asset sizes, rankings, company results, named-bank metrics or hypothetical calculations.',
    'Lesson 4.2 Chapter 2 and Lesson 4.3 Chapter 2 carry source restriction notices and are not cited by any activity. Availability is re-checked at runtime against the decks after review holds are applied.',
    'Activities are grounded in what the learner sees: chapter text and the rendered Learning Visuals (commercialBankingM04VisualSpecs.ts). The visual specs inline in the lesson files are not rendered, and the Lesson 4.3 visuals are held, so neither is used.',
  ],
  activities: [...CB_M04B03_ACTIVITIES, ...CB_M04MORE_ACTIVITIES],
};
