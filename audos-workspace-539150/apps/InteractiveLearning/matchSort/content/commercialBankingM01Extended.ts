import type { MatchSortPack } from '../types';
import { CB_M01B1_ACTIVITIES } from './commercialBankingM01B1';
import { CB_M01B2_ACTIVITIES } from './commercialBankingM01B2';
import { CB_M01B3_ACTIVITIES } from './commercialBankingM01B3';

/**
 * Lessons 1.2 to 1.5 of Commercial Banking Module 01. Lesson 1.1 keeps its original pack
 * (commercialBankingM01.ts); this pack adds activities and changes none of its IDs.
 */
export const COMMERCIAL_BANKING_M01_EXTENDED_PACK: MatchSortPack = {
  packId: 'commercial-banking-m01-lessons-2-5',
  title: 'Commercial Banking · Module 01 practice (Lessons 1.2–1.5)',
  industryId: 'banking-commercial',
  moduleId: 'module-01',
  sourceModuleKey: 'COMMERCIAL_BANKING_MODULE01',
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is still under review. These activities use only its definitions, mechanisms and frameworks: no figures, rankings, ratio values, dates or legal provisions.',
    'Lesson 1.4 Chapter 5 and Lesson 1.5 Chapter 5 carry source restriction notices; no activity cites them. Availability is re-checked at runtime against the decks after review holds are applied.',
  ],
  activities: [...CB_M01B1_ACTIVITIES, ...CB_M01B2_ACTIVITIES, ...CB_M01B3_ACTIVITIES],
};
