import type { MatchSortPack } from '../types';
import { CB_M05B01_ACTIVITIES } from './commercialBankingM05B01';
import { CB_M05MORE_ACTIVITIES } from './commercialBankingM05More';

/** Commercial Banking Module 05 (industry trends), lessons 5.1, 5.3 and 5.5. Lesson 5.4 is held; lesson 5.2 is flashcards only. */
export const COMMERCIAL_BANKING_M05_PACK: MatchSortPack = {
  packId: 'commercial-banking-m05',
  title: 'Commercial Banking \u00b7 Module 05 practice',
  industryId: 'banking-commercial',
  moduleId: 'module-05',
  sourceModuleKey: 'COMMERCIAL_BANKING_MODULE05',
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked \u201cDraft / Ready for Review\u201d. These activities use only its definitions, mechanisms and frameworks: no growth rates, credit targets, forecasts, adoption figures, market sizes or named-bank metrics.',
    'Lesson 5.4 (Regulatory & Sustainability Trends) is under review and is not used. Lesson 5.2 Chapter 3 carries a source restriction notice and is not cited by any activity. Availability is re-checked at runtime against the decks after review holds are applied.',
    'Activities use only text the learner sees. The source files\u2019 registerVisual tables are not rendered (chapters draw commercialBankingM05VisualSpecs.ts instead), so no activity is built from them. Lesson 5.2 is covered by flashcards only.',
    'Lesson 5.3 channel stages are not presented as a sequence, because the source states that channel evolution is not a universal sequence. Lesson 5.5 strategy scenarios are labelled hypothetical in the source and in the activity.',
  ],
  activities: [...CB_M05B01_ACTIVITIES, ...CB_M05MORE_ACTIVITIES],
};
