import type { MatchSortPack } from '../types';
import { CF_M05_ACTIVITIES } from './consumerFinanceRefinements';

/** Consumer Finance Module 05 (industry trends). One activity only: the other four lessons are flashcards-only by design. */
export const CONSUMER_FINANCE_M05_PACK: MatchSortPack = {
  packId: 'consumer-finance-m05',
  title: 'Consumer Finance \u00b7 Module 05 practice',
  industryId: 'banking-consumer-finance',
  moduleId: 'module-05',
  sourceModuleKey: 'CONSUMER_FINANCE_MODULE05',
  contentStatus: 'Draft / Ready for Review',
  contentNotes: [
    'The source curriculum is marked \u201cDraft / Ready for Review\u201d. This activity uses only the tests named in the chapter: no figures, rankings or provider names.',
    'Module 05 lessons are mostly trend narratives and governance checklists rather than categories or ordered steps, so only one chapter supports a Match & Sort activity. Flashcards cover every lesson. Consumer Finance has no entry in reviewHolds.ts at the time of writing; availability is re-checked at runtime against the decks after review holds are applied.',
  ],
  activities: CF_M05_ACTIVITIES,
};
