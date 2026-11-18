// Live registry for the FMCG expansion curricula. Only curricula listed in FMCG_EXPANSION_BUILT are
// registered with the sector catalogue (retailSectors.ts), so a curriculum keeps its Coming Soon card
// until it is added here after passing its content and functional checks.

import { buildFmcgExpansion } from './fmcgExpansionCore';
import type { FxBuilt, FxBuiltModule, FxCard, FxChapterVisual, FxQuestion, FxTakeaways } from './fmcgExpansionCore';
import type { RetailSectorContent } from './retailSectorTypes';
import { FMCG_BEAUTY_CURRICULUM } from './fmcgBeautyCurriculum';
import { FMCG_HOUSEHOLD_CURRICULUM } from './fmcgHouseholdCurriculum';
import { FMCG_TOBACCO_CURRICULUM } from './fmcgTobaccoCurriculum';

export const FMCG_EXPANSION_BUILT: FxBuilt[] = [FMCG_BEAUTY_CURRICULUM, FMCG_HOUSEHOLD_CURRICULUM, FMCG_TOBACCO_CURRICULUM].map(buildFmcgExpansion);

export const FMCG_EXPANSION_SECTOR_CONTENT: Record<string, RetailSectorContent> = Object.fromEntries(
  FMCG_EXPANSION_BUILT.map((built) => [built.curriculum.id, built.sector]),
);

/** Chapter Learning Visuals keyed by visualKind, read by App.tsx `chapterSpecVisual`. */
export const FMCG_EXPANSION_CHAPTER_VISUALS: Record<string, FxChapterVisual> = Object.assign({}, ...FMCG_EXPANSION_BUILT.map((built) => built.visuals));

/** Module decks keyed like the other curricula (`FMCG_BEAUTY_MODULE01`), for Practice & Review and review holds. */
export const FMCG_EXPANSION_MODULES: Record<string, FxBuiltModule> = Object.fromEntries(
  FMCG_EXPANSION_BUILT.flatMap((built) => built.modules.map((module) => [module.key, module])),
);

export interface FmcgExpansionLesson {
  cards: FxCard[];
  quizQuestions: FxQuestion[];
  finalTakeaways: FxTakeaways;
  persistenceKey: string;
}

export function resolveFmcgExpansionLesson(industryId: string | undefined, moduleTitle: string, lessonTitle: string): FmcgExpansionLesson | undefined {
  const built = FMCG_EXPANSION_BUILT.find((item) => item.curriculum.id === industryId);
  const module = built?.modules.find((item) => item.moduleTitle === moduleTitle);
  const cards = module?.decks[lessonTitle];
  if (!built || !module || !cards) return undefined;
  return {
    cards,
    quizQuestions: module.quizzes[lessonTitle] ?? [],
    finalTakeaways: module.takeaways[lessonTitle],
    persistenceKey: `${built.curriculum.name} ${module.label}: ${lessonTitle}`,
  };
}
