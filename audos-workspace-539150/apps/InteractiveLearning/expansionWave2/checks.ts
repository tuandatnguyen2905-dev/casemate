// Provider-agnostic check suite. __tests__/*.test.ts runs it against the live curriculum;
// recorded-snapshot runs inject a ChapterTextProvider built from a replica of the source (see README).

import type { FlashcardDeckContent } from './types';
import { normaliseTitle } from '../matchSort/validation';
import type { ChapterTextProvider, SourceModule, Wave2Pack } from './types';
import { activityProblems, deckQualityProblems, deckSourceProblems, deckStructureProblems, offeredActivities, offeredCards, packProblems } from './validators';
import type { KnownHold } from './validators';

export interface CheckInput {
  decks: FlashcardDeckContent[];
  packs: Wave2Pack[];
  modules: readonly SourceModule[];
  provider: ChapterTextProvider;
  holds: KnownHold[];
  /** IDs already used by existing decks and packs; wave-2 IDs must not collide with them. */
  reservedIds?: Set<string>;
}

export interface CheckResult {
  name: string;
  problems: string[];
}

const moduleOf = (modules: readonly SourceModule[], key: string) => modules.find((module) => module.moduleKey === key);

export function runChecks(input: CheckInput): CheckResult[] {
  const { decks, packs, modules, provider, holds } = input;
  const results: CheckResult[] = [];
  const add = (name: string, problems: string[]) => results.push({ name, problems });

  const ids = new Map<string, number>();
  const count = (id: string) => ids.set(id, (ids.get(id) ?? 0) + 1);
  decks.forEach((deck) => { count(deck.deckId); deck.cards.forEach((card) => count(card.cardId)); });
  packs.forEach((pack) => { count(pack.packId); pack.activities.forEach((activity) => count(activity.activityId)); });
  add('flashcards+matchsort: IDs unique across wave-2 content', [...ids].filter(([, n]) => n > 1).map(([id]) => `duplicate ID ${id}`));
  add('no overwrite: IDs do not collide with existing content', [...ids.keys()].filter((id) => input.reservedIds?.has(id)).map((id) => `collides with existing ${id}`));

  add('flashcards: schema and stable IDs (mirror of validateDeck)', decks.flatMap((deck) => deckStructureProblems(deck).map((p) => `${deck.deckId}: ${p}`)));
  add('flashcards: quality (length, duplicates, figures, legal citations)', decks.flatMap((deck) => deckQualityProblems(deck).map((p) => `${deck.deckId}: ${p}`)));
  add('flashcards: chapter mapping, verbatim excerpts, holds', decks.flatMap((deck) => {
    const module = moduleOf(modules, deck.source.moduleKey);
    return module ? deckSourceProblems(deck, module, provider, holds).map((p) => `${deck.deckId}: ${p}`) : [`${deck.deckId}: unknown module ${deck.source.moduleKey}`];
  }));
  add('flashcards: every deck chapter list equals the source mapping chapter list', decks.flatMap((deck) => {
    const module = moduleOf(modules, deck.source.moduleKey);
    const lesson = module?.lessons.find((item) => item.lessonTitle === deck.lessonTitle);
    if (!lesson) return [`${deck.deckId}: lesson not in source mapping`];
    return lesson.chapters.map((chapter, index) => (deck.chapters[index]?.title === chapter.title ? '' : `${deck.deckId}: chapter ${index + 1} differs`)).filter(Boolean);
  }));

  add('source mapping: titles, lesson source IDs and chapter count equal the displayed curriculum', modules.flatMap((module) => module.lessons.flatMap((lesson, lessonIndex) => {
    const problems: string[] = [];
    const shown = lesson.chapters.map((_, index) => provider(module.moduleKey, lesson.lessonTitle, index + 1));
    if (provider(module.moduleKey, lesson.lessonTitle, lesson.chapters.length + 1)) problems.push(`${module.moduleKey} ${lesson.lessonTitle}: the curriculum shows more chapters than the mapping`);
    shown.forEach((chapter, index) => { if (!chapter || normaliseTitle(chapter.title) !== normaliseTitle(lesson.chapters[index].title)) problems.push(`${module.moduleKey} ${lesson.lessonTitle}: chapter ${index + 1} differs (${chapter?.title ?? 'missing'})`); });
    const recorded = (module as SourceModule & { lessonSources?: string[][] }).lessonSources?.[lessonIndex];
    const actual = new Set(shown.flatMap((chapter) => chapter?.sourceIds ?? []));
    if (recorded && (recorded.length !== actual.size || recorded.some((id) => !actual.has(id)))) problems.push(`${module.moduleKey} ${lesson.lessonTitle}: recorded source IDs differ from the displayed ones`);
    return problems;
  })));

  add('matchsort: engine rules, grounding, source mapping, holds', packs.flatMap((pack) => {
    const module = moduleOf(modules, pack.sourceModuleKey);
    return module ? packProblems(pack, module, provider, holds).map((p) => `${pack.packId}: ${p}`) : [`${pack.packId}: unknown module`];
  }));
  add('matchsort: correct relationships (every pair, item and step resolves to exactly one answer)', packs.flatMap((pack) => pack.activities.flatMap((activity) => {
    const problems: string[] = [];
    if (activity.type === 'concept-matching') {
      const prompts = new Set(activity.items.prompts.map((item) => item.id));
      const answers = new Set(activity.items.answers.map((item) => item.id));
      activity.pairs.forEach((pair) => { if (!prompts.has(pair.promptId) || !answers.has(pair.answerId)) problems.push(`${activity.activityId}: pair ${pair.id} points at a missing item`); });
      if (new Set(activity.items.answers.map((item) => item.text.trim().toLowerCase())).size !== activity.items.answers.length) problems.push(`${activity.activityId}: two answers have the same text`);
    } else if (activity.type === 'category-sorting') {
      const categories = new Set(activity.categories.map((category) => category.id));
      activity.items.forEach((item) => { if (!categories.has(item.categoryId)) problems.push(`${activity.activityId}: item ${item.id} has an unknown category`); });
    } else if (activity.items.some((item, index) => item.id !== activity.correctSequence[index]) === false) {
      problems.push(`${activity.activityId}: sequence is presented already solved`);
    }
    return problems;
  })));

  add('access: held chapters are never cited (flashcards and activities)', [
    ...decks.flatMap((deck) => deck.cards.flatMap((card) => {
      const module = moduleOf(modules, deck.source.moduleKey);
      return [card.chapterId, ...card.sourceRefs.map((ref) => ref.chapterId)].flatMap((chapterId) => {
        const chapter = deck.chapters.find((item) => item.chapterId === chapterId);
        const held = holds.some((hold) => hold.moduleKey === module?.moduleKey && hold.lesson === deck.lessonTitle && (!hold.chapter || hold.chapter === chapter?.title));
        return held ? [`${card.cardId} cites held ${chapterId}`] : [];
      });
    })),
    ...packs.flatMap((pack) => pack.activities.flatMap((activity) => activity.sourceRefs.flatMap((ref) => holds.some((hold) => hold.moduleKey === ref.sourceModuleKey && hold.lesson === ref.lessonTitle && (!hold.chapter || hold.chapter === ref.chapterTitle)) ? [`${activity.activityId} cites held ${ref.chapterTitle}`] : []))),
  ]);
  add('access: no future-chapter bypass (nothing is offered until every cited chapter is open)', [
    ...decks.flatMap((deck) => {
      const problems: string[] = [];
      if (offeredCards(deck, 0).length) problems.push(`${deck.deckId}: cards offered with no chapter open`);
      let previous = 0;
      for (let open = 1; open <= deck.chapters.length; open += 1) {
        const offered = offeredCards(deck, open);
        if (offered.length < previous) problems.push(`${deck.deckId}: availability shrank at chapter ${open}`);
        previous = offered.length;
        offered.forEach((card) => card.sourceRefs.forEach((ref) => { const n = deck.chapters.find((c) => c.chapterId === ref.chapterId)?.number ?? Infinity; if (n > open) problems.push(`${card.cardId}: offered at ${open} but cites chapter ${n}`); }));
      }
      if (offeredCards(deck, deck.chapters.length).length !== deck.cards.length) problems.push(`${deck.deckId}: not every card is reachable once all chapters are open`);
      return problems;
    }),
    ...packs.flatMap((pack) => {
      const problems: string[] = [];
      const top = Math.max(0, ...pack.activities.flatMap((activity) => activity.sourceRefs.map((ref) => ref.chapterIndex + 1)));
      if (offeredActivities(pack.activities, 0).length) problems.push(`${pack.packId}: activities offered with no chapter open`);
      for (let open = 1; open <= top; open += 1) offeredActivities(pack.activities, open).forEach((activity) => activity.sourceRefs.forEach((ref) => { if (ref.chapterIndex + 1 > open) problems.push(`${activity.activityId}: offered at ${open} but cites chapter ${ref.chapterIndex + 1}`); }));
      return problems;
    }),
  ]);

  add('integration shape: decks and packs expose the fields the existing interfaces read', [
    ...decks.flatMap((deck) => (['deckId', 'title', 'description', 'industryId', 'industryLabel', 'moduleId', 'moduleLabel', 'lessonId', 'lessonTitle', 'source', 'chapters', 'cards', 'contentStatus', 'mappingNotes'] as const)
      .filter((field) => deck[field] === undefined).map((field) => `${deck.deckId}: missing ${field}`)),
    ...decks.flatMap((deck) => (['file', 'moduleKey', 'lessonTitle', 'startMarker', 'endMarker', 'chapterMarker', 'readAtSha256', 'readAt'] as const)
      .filter((field) => !deck.source[field]).map((field) => `${deck.deckId}: source.${field} empty`)),
    ...packs.flatMap((pack) => (['packId', 'title', 'industryId', 'moduleId', 'sourceModuleKey', 'contentStatus', 'contentNotes', 'activities'] as const)
      .filter((field) => (pack as unknown as Record<string, unknown>)[field] === undefined).map((field) => `${pack.packId}: missing ${field}`)),
  ]);
  add('integration shape: one industry id, namespaced IDs only', [
    ...decks.filter((deck) => deck.industryId !== 'professional-audit').map((deck) => `${deck.deckId}: industryId ${deck.industryId}`),
    ...decks.filter((deck) => !deck.deckId.startsWith('professional-audit-') || deck.cards.some((card) => !card.cardId.startsWith('pa-'))).map((deck) => `${deck.deckId}: id outside the professional-audit namespace`),
    ...packs.flatMap((pack) => pack.activities.filter((activity) => !activity.activityId.startsWith('pa-')).map((activity) => `${activity.activityId}: id outside the pa- namespace`)),
  ]);
  return results;
}

export function summarise(results: CheckResult[]) {
  const failed = results.filter((result) => result.problems.length);
  return { checks: results.length, passed: results.length - failed.length, failed: failed.length, results };
}

export { activityProblems };
