import type { MatchSortActivity, MatchSortPack } from '../types';
import { chapterIdOf, lessonIdOf } from '../validation';
import { COMMERCIAL_BANKING_M01_PACK } from './commercialBankingM01';
import { CONSUMER_FINANCE_M01_PACK } from './consumerFinanceM01';
import { EXPANSION_PACKS } from './expansion';

export { COMMERCIAL_BANKING_M01_PACK, CONSUMER_FINANCE_M01_PACK };

/** The two original packs first, then the expansion packs (./expansion.ts) in curriculum order. */
export const MATCH_SORT_PACKS: MatchSortPack[] = [COMMERCIAL_BANKING_M01_PACK, CONSUMER_FINANCE_M01_PACK, ...EXPANSION_PACKS];

export const packById = (packId: string): MatchSortPack | null => MATCH_SORT_PACKS.find((pack) => pack.packId === packId) ?? null;

export const allActivities = (): MatchSortActivity[] => MATCH_SORT_PACKS.flatMap((pack) => pack.activities);

export const activityById = (activityId: string): MatchSortActivity | null => allActivities().find((activity) => activity.activityId === activityId) ?? null;

/** Activities citing a chapter anywhere in their source references, not only the primary one. */
export const activitiesForChapter = (chapterId: string): MatchSortActivity[] => allActivities()
  .filter((activity) => activity.sourceRefs.some((ref) => chapterIdOf(ref) === chapterId));

export const activitiesForLesson = (lessonId: string): MatchSortActivity[] => allActivities()
  .filter((activity) => activity.sourceRefs.some((ref) => lessonIdOf(ref) === lessonId));
