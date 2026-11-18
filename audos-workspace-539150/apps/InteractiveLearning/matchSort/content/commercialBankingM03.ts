import type { MatchSortPack } from '../types';
import { CB_M03B01_ACTIVITIES } from './commercialBankingM03B01';
import { CB_M03B02_ACTIVITIES } from './commercialBankingM03B02';

/** Commercial Banking Module 03, lessons 3.1 to 3.6 (business models). */
export const COMMERCIAL_BANKING_M03_PACK: MatchSortPack = {
  packId: 'commercial-banking-m03',
  title: 'Commercial Banking \u00b7 Module 03 practice',
  industryId: 'banking-commercial',
  moduleId: 'module-03',
  sourceModuleKey: 'COMMERCIAL_BANKING_MODULE03',
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked \u201cDraft / Ready for Review\u201d. These activities use only its definitions, mechanisms and frameworks: no figures, shares, ranks, hypothetical calculations, bank-level income splits, or deposit-insurance amounts and dates.',
    'Lesson 3.1 Chapter 1, Lesson 3.2 Chapters 1 and 2, Lesson 3.4 Chapter 3 and Lesson 3.6 Chapters 2 and 3 carry source restriction notices; activities there state only classification logic, definitions and cautions, and never outcomes for depositors, creditors or shareholders.',
  ],
  activities: [...CB_M03B01_ACTIVITIES, ...CB_M03B02_ACTIVITIES],
};
