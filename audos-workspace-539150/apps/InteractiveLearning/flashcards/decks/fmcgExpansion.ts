// Smart Flashcards for the FMCG expansion curricula (see apps/IndustryKnowledge/fmcgExpansionRegistry.ts).
// Each card is one key term and the definition the reader shows for that chapter, so the excerpt always
// matches the chapter as rendered. Decks exist only for curricula that are live in the registry.

import type { FlashcardDeckContent } from '../models';
import { defineLessonDeck } from './factory';
import type { CardSpec } from './factory';
import { FMCG_EXPANSION_BUILT } from '../../../IndustryKnowledge/fmcgExpansionRegistry';
import { FX_MODULE_TITLES } from '../../../IndustryKnowledge/fmcgExpansionCore';
import type { FxBuilt, FxLesson } from '../../../IndustryKnowledge/fmcgExpansionCore';

const slug = (text: string) => text.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const stableTail = (text: string) => (/\d$/.test(text) ? `${text}-term` : text);
const sourceFile = (key: string, module: number) => `apps/IndustryKnowledge/${key.toLowerCase().replace(/_([a-z])/g, (_, char: string) => char.toUpperCase())}M${module}.ts`;

function lessonDeck(built: FxBuilt, moduleIndex: number, lessonIndex: number, lesson: FxLesson, nextTitle?: string): FlashcardDeckContent {
  const { curriculum } = built;
  const module = built.modules[moduleIndex];
  const seen = new Set<string>();
  const cards: CardSpec[] = lesson.chapters.flatMap((chapter, chapterIndex) => chapter.terms
    .filter(([term]) => {
      const key = term.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(([term, definition]) => ({
      id: stableTail(`${curriculum.slug}-m${moduleIndex + 1}l${lessonIndex + 1}c${chapterIndex + 1}-${slug(term)}`),
      ch: chapterIndex + 1,
      front: `What does \u201c${term}\u201d mean?`,
      back: definition,
      explanation: chapter.take,
      example: chapter.apply,
      terms: [term],
      refs: [[chapterIndex + 1, definition]],
    })));
  return defineLessonDeck({
    deckId: `${curriculum.id}-m${moduleIndex + 1}-${slug(lesson.title)}`,
    title: `${lesson.title}: key terms`,
    description: `Recall the key terms from the ${lesson.title} chapters of ${curriculum.name}.`,
    industryId: curriculum.id,
    industryLabel: curriculum.name,
    moduleId: `m${moduleIndex + 1}`,
    moduleLabel: FX_MODULE_TITLES[moduleIndex],
    lessonId: `${curriculum.id}-m${moduleIndex + 1}-l${lessonIndex + 1}`,
    lessonTitle: lesson.title,
    moduleKey: module.key,
    file: sourceFile(curriculum.key, moduleIndex + 1),
    readAtSha256: 'generated-from-source-at-build',
    readAt: '2026-11-12',
    startMarker: `title: '${lesson.title}'`,
    endMarker: nextTitle ? `title: '${nextTitle}'` : '];',
    chapterMarker: "t: '",
    chapterIdPrefix: `${curriculum.slug}-m${moduleIndex + 1}-l${lessonIndex + 1}`,
    chapters: lesson.chapters.map((chapter) => ({ title: chapter.t, sourceTitle: chapter.t, citations: chapter.src })),
    contentStatus: 'Ready for Review',
    mappingNotes: ['Generated from the curriculum source: every card is a key term with the definition shown in its own chapter, so cards follow the reader if the chapter text changes.'],
    cards,
  });
}

export const FMCG_EXPANSION_DECKS: FlashcardDeckContent[] = FMCG_EXPANSION_BUILT.flatMap((built) => built.curriculum.modules.flatMap((module, moduleIndex) => module.lessons.map((lesson, lessonIndex) => lessonDeck(built, moduleIndex, lessonIndex, lesson, module.lessons[lessonIndex + 1]?.title))));
