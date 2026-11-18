import type { ChapterRef, MatchSortActivity, SourceModuleKey } from '../types';
import { chapterIdOf, lessonIdOf } from '../validation';

type Distributive<T> = T extends unknown ? Omit<T, 'chapterId' | 'lessonId' | 'industryId' | 'moduleId'> : never;
export type ActivityDraft = Distributive<MatchSortActivity>;

export const chapterRef = (
  sourceModuleKey: SourceModuleKey,
  lessonTitle: string,
  chapterIndex: number,
  chapterTitle: string,
  sourceIds: string[],
  grounding: string,
): ChapterRef => ({ sourceModuleKey, lessonTitle, chapterIndex, chapterTitle, sourceIds, grounding });

/** Derives lessonId and chapterId from the first source reference so IDs never drift from it. */
export function defineActivities(industryId: string, moduleId: string, drafts: ActivityDraft[]): MatchSortActivity[] {
  return drafts.map((draft) => ({
    ...draft,
    industryId,
    moduleId,
    lessonId: lessonIdOf(draft.sourceRefs[0]),
    chapterId: chapterIdOf(draft.sourceRefs[0]),
  }) as MatchSortActivity);
}
