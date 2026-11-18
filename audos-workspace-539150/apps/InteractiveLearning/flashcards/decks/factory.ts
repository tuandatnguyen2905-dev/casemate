// Declarative helper for lesson decks. A deck still resolves to the plain FlashcardDeckContent shape
// (see ../models.ts); this only removes the repeated boilerplate around chapters, source mapping and
// card identity so a lesson's content stays readable. Nothing here touches review state.

import type { ChapterRef, FlashcardContent, FlashcardDeckContent, SourceRef } from '../models';

export interface ChapterSpec {
  /** Title as the reader displays it (numeric prefix stripped). */
  title: string;
  /** Exact title literal in the source file, including any numeric prefix. */
  sourceTitle: string;
  /** Citation IDs the source chapter already lists. */
  citations: string[];
}

export interface CardSpec {
  /** Stable slug. Never reuse or rename: learners' review history is keyed by it. */
  id: string;
  /** 1-based lesson-local chapter number the card belongs to. */
  ch: number;
  front: string;
  back: string;
  explanation: string;
  example: string;
  terms: string[];
  /** Verbatim excerpts from the source chapter: [chapter number, excerpt]. */
  refs: Array<[number, string]>;
}

export interface LessonDeckSpec {
  deckId: string;
  title: string;
  description: string;
  industryId: string;
  industryLabel: string;
  moduleId: string;
  moduleLabel: string;
  lessonId: string;
  /** Lesson title exactly as used by the lesson registry. */
  lessonTitle: string;
  moduleKey: string;
  file: string;
  readAtSha256: string;
  readAt: string;
  startMarker: string;
  endMarker: string;
  chapterMarker: string;
  /** Prefix for chapter IDs: `${chapterIdPrefix}-ch01` and so on. */
  chapterIdPrefix: string;
  chapters: ChapterSpec[];
  contentStatus: string;
  mappingNotes?: string[];
  cards: CardSpec[];
}

export const chapterIdFor = (prefix: string, number: number) => `${prefix}-ch${String(number).padStart(2, '0')}`;

export function defineLessonDeck(spec: LessonDeckSpec): FlashcardDeckContent {
  const chapters: ChapterRef[] = spec.chapters.map((chapter, index) => ({
    chapterId: chapterIdFor(spec.chapterIdPrefix, index + 1),
    number: index + 1,
    title: chapter.title,
    sourceTitle: chapter.sourceTitle,
  }));
  const sourceRef = (number: number, excerpt: string): SourceRef => ({
    file: spec.file,
    chapterId: chapterIdFor(spec.chapterIdPrefix, number),
    excerpt,
    citationIds: spec.chapters[number - 1]?.citations,
  });
  const cards: FlashcardContent[] = spec.cards.map((card) => ({
    cardId: card.id,
    deckId: spec.deckId,
    industryId: spec.industryId,
    moduleId: spec.moduleId,
    lessonId: spec.lessonId,
    chapterId: chapterIdFor(spec.chapterIdPrefix, card.ch),
    front: card.front,
    back: card.back,
    explanation: card.explanation,
    practicalExample: card.example,
    keyTerms: card.terms,
    sourceRefs: card.refs.map(([number, excerpt]) => sourceRef(number, excerpt)),
  }));
  return {
    deckId: spec.deckId,
    title: spec.title,
    description: spec.description,
    industryId: spec.industryId,
    industryLabel: spec.industryLabel,
    moduleId: spec.moduleId,
    moduleLabel: spec.moduleLabel,
    lessonId: spec.lessonId,
    lessonTitle: spec.lessonTitle,
    source: {
      file: spec.file,
      moduleKey: spec.moduleKey,
      lessonTitle: spec.lessonTitle,
      startMarker: spec.startMarker,
      endMarker: spec.endMarker,
      chapterMarker: spec.chapterMarker,
      readAtSha256: spec.readAtSha256,
      readAt: spec.readAt,
    },
    chapters,
    cards,
    contentStatus: spec.contentStatus,
    mappingNotes: spec.mappingNotes ?? [],
  };
}
