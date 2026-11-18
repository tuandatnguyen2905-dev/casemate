import type { ChapterLike } from '../../IndustryKnowledge/lessonFlowCore';
import { GENERATED_SOURCE_KEY, generateLessonActivities } from './generator';
import type { GeneratedLesson } from './generator';
import type { MatchSortActivity, MatchSortPack } from './types';

// Runtime glue for generated Match & Sort: one generation per lesson deck, computed only when a lesson's practice is
// resolved (never for the whole catalogue at start-up) and kept while the reader keeps the same deck.

const byDeck = new WeakMap<ChapterLike[], Map<string, GeneratedLesson>>();

/** Generated activities and the per-chapter report for one lesson (cached on the reader's deck). */
export function generatedLessonPractice(identity: string, chapters: ChapterLike[], authored: MatchSortActivity[] = []): GeneratedLesson {
  const cacheKey = `${identity}\u0001${authored.map((activity) => activity.activityId).join(',')}`;
  const cached = Array.isArray(chapters) ? byDeck.get(chapters)?.get(cacheKey) : undefined;
  if (cached) return cached;
  const result = generateLessonActivities({ identity, chapters, authored });
  if (Array.isArray(chapters)) {
    const entries = byDeck.get(chapters) ?? new Map<string, GeneratedLesson>();
    entries.set(cacheKey, result);
    byDeck.set(chapters, entries);
  }
  return result;
}

/** The pack a lesson without authored activities presents its generated activities in. */
export function generatedPracticePack(identity: string, activities: MatchSortActivity[]): MatchSortPack {
  const [industryId = '', moduleTitle = '', ...rest] = identity.split('::');
  const lessonTitle = rest.join('::');
  return {
    packId: `generated:${identity}`,
    title: `${lessonTitle || moduleTitle}: practice`,
    industryId,
    moduleId: activities[0]?.moduleId ?? 'module',
    sourceModuleKey: GENERATED_SOURCE_KEY,
    contentStatus: 'Generated from displayed chapter text',
    contentNotes: ['Built at runtime from the text each chapter displays; optional practice that never changes Knowledge Check scores, chapter access or lesson completion.'],
    activities,
  };
}
