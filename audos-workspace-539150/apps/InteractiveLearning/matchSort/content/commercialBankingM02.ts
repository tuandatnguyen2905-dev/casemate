import type { MatchSortPack } from '../types';
import { CB_M02B4_ACTIVITIES } from './commercialBankingM02B4';
import { CB_M02B5_ACTIVITIES } from './commercialBankingM02B5';

/** Commercial Banking Module 02, lessons 2.1 to 2.6 (value chain). */
export const COMMERCIAL_BANKING_M02_PACK: MatchSortPack = {
  packId: 'commercial-banking-m02',
  title: 'Commercial Banking · Module 02 practice',
  industryId: 'banking-commercial',
  moduleId: 'module-02',
  sourceModuleKey: 'COMMERCIAL_BANKING_MODULE02',
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked “Draft / Ready for Review”. These activities use only its definitions, mechanisms and frameworks: no figures, rates, day-count bands, provision rates, company results or hypothetical calculations.',
    'Lessons 2.2 (Chapter 3), 2.3 (Chapters 2 and 3) and 2.6 (Chapter 3) carry source restriction notices. Activities there use only the taxonomy and definitions the chapters present as verified, and never state outcomes for depositors, creditors or shareholders.',
  ],
  activities: [...CB_M02B4_ACTIVITIES, ...CB_M02B5_ACTIVITIES],
};
