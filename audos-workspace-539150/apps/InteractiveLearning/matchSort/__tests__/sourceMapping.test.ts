// Integration check against the live Domain Knowledge registries (read-only imports).
// Needs the full apps/IndustryKnowledge module graph, so it runs where the space source is built,
// not in an isolated sandbox. It covers every module listed in practiceReview/sourceDecks.ts, so a
// new curriculum module is checked as soon as it is registered there.
import { BANKING_SOURCES } from '../../../IndustryKnowledge/commercialBankingCore';
import { CONSUMER_FINANCE_SOURCES } from '../../../IndustryKnowledge/consumerFinanceCore';
import { applyReviewHolds } from '../../../IndustryKnowledge/reviewHolds';
import { PRACTICE_SOURCE_MODULES } from '../../practiceReview/sourceDecks';
import { allActivities } from '../content';
import { resolveAvailableActivities } from '../validation';
import type { SourceDecks } from '../validation';
import { eq, ok, runSuite } from './assert';

const registryFor = (moduleKey: string): Record<string, unknown> => (moduleKey.startsWith('COMMERCIAL_BANKING') ? BANKING_SOURCES : CONSUMER_FINANCE_SOURCES);

const modules = new Map(PRACTICE_SOURCE_MODULES.map(([key, decks, quizzes, takeaways]) => [key, { decks, quizzes, takeaways }]));

export const sourceMappingCases = [
  { name: 'every cited chapter exists at its position and is not held after review holds', run: () => {
    const held: SourceDecks = {};
    const unmatched: string[] = [];
    modules.forEach(({ decks, quizzes, takeaways }, key) => {
      const result = applyReviewHolds(key, decks, quizzes, takeaways);
      unmatched.push(...result.unmatched);
      held[key as keyof SourceDecks] = result.decks;
    });
    eq(unmatched, [], 'review holds resolve');
    const { unavailable } = resolveAvailableActivities(allActivities(), held);
    eq(unavailable, [], 'unresolved or held chapter references');
  } },
  { name: 'every activity belongs to a module registered for practice', run: () => {
    allActivities().forEach((activity) => activity.sourceRefs.forEach((ref) => ok(modules.has(ref.sourceModuleKey), `${activity.activityId}: ${ref.sourceModuleKey} is registered in practiceReview/sourceDecks.ts`)));
  } },
  { name: 'every source ID exists in the chapter module source registry', run: () => {
    allActivities().forEach((activity) => activity.sourceRefs.forEach((ref) => ref.sourceIds.forEach((id) => ok(id in registryFor(ref.sourceModuleKey), `${activity.activityId}: ${id} in ${ref.sourceModuleKey}`))));
  } },
  { name: 'every source ID is cited by the chapter it is attributed to', run: () => {
    const cited = (moduleKey: string, lesson: string, index: number): string[] => {
      const decks = modules.get(moduleKey as never)?.decks as Record<string, Array<{ sources?: Array<{ href: string; title: string }> }>> | undefined;
      return (decks?.[lesson]?.[index]?.sources ?? []).map((source) => `${source.title}|${source.href}`);
    };
    allActivities().forEach((activity) => activity.sourceRefs.forEach((ref) => {
      const registry = registryFor(ref.sourceModuleKey) as Record<string, { title: string; href: string }>;
      const chapterSources = cited(ref.sourceModuleKey, ref.lessonTitle, ref.chapterIndex);
      ref.sourceIds.forEach((id) => ok(chapterSources.includes(`${registry[id].title}|${registry[id].href}`), `${activity.activityId}: ${id} is cited by ${ref.chapterTitle}`));
    }));
  } },
];

export const runSourceMappingTests = () => runSuite('source mapping', sourceMappingCases);
runSourceMappingTests().catch((error) => { console.error(error.message); throw error; });
