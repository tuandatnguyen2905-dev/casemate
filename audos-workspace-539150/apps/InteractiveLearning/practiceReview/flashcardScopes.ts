import { isRestrictedChapter, storedChapterProgress } from '../../IndustryKnowledge/lessonFlowCore';
import type { ChapterLike, ChapterPlanStatus, StorageLike } from '../../IndustryKnowledge/lessonFlowCore';
import type { CurriculumLesson } from '../../IndustryKnowledge/lessonFlow';
import { PRACTICE_DECKS } from '../flashcards/decks/practice';
import type { FlashcardContent, FlashcardDeckContent } from '../flashcards/models';
import { normaliseTitle } from '../matchSort/validation';
import { cardContentKey, chapterTitle, contentTokens, curriculumChapterDecks, genericDefinitions, repeatedSentences, slug } from './chapterCards';
import { resolveLessonFlashcards } from './flashcardAccess';
import { splitIdentity } from './lessonAccess';
import type { PracticeLesson } from './practiceLessonStore';
import { browserStorage } from './practiceStorage';
import { heldSourceDecks } from './sourceDecks';

export { chapterLessonDeck, genericDefinitions } from './chapterCards';

// Flashcards for a whole curriculum, resolved from the lesson that is open. Authored decks
// (flashcards/decks) come first and are never changed; every chapter is then completed with cards built
// from the text it displays (chapterCards.ts), skipping anything an authored card already asks. A
// curriculum without authored decks gets only those chapter cards. Access always follows the reader's own
// chapter gate; nothing here writes progress. Authored decks come from PRACTICE_DECKS, which adds the MCQ and
// fill-in-the-blank cards written for some lessons after their chapter's authored cards.

export type FlashcardScopeId = 'chapter' | 'lesson' | 'module' | 'all';

export const FLASHCARD_SCOPES: FlashcardScopeId[] = ['chapter', 'lesson', 'module', 'all'];

/** One verified card and whether this learner can open it now. */
export interface ScopedCard {
  card: FlashcardContent;
  lessonIdentity: string;
  moduleIndex: number;
  /** Original chapter index in the lesson deck (the reader's chapter number minus one). */
  chapterIndex: number;
  locked: boolean;
  /** "1.1 Industry Definition & Scope · Chapter 2: What Makes Commercial Banking Unique?" */
  sourceLabel: string;
  /** Written by an author, or built from the chapter's displayed text. */
  origin?: 'authored' | 'generated';
}

export interface LessonCards {
  identity: string;
  lessonTitle: string;
  moduleIndex: number;
  moduleLabel: string;
  /** Chapters that are not under review. */
  eligibleChapters: number;
  /** Eligible chapters with at least one card. */
  chaptersWithCards: number;
  cards: ScopedCard[];
  /** Authored cards withheld because a chapter they cite is missing, moved or under review. */
  excluded: number;
}

export interface FlashcardOrigin {
  identity: string;
  lessonTitle: string;
  moduleIndex: number;
  moduleLabel: string;
  /** The chapter the learner had open in the reader. */
  chapterIndex: number;
  chapterTitle: string;
  persistenceKey?: string;
  chapters: ChapterLike[];
  accessible: boolean[];
}

export interface IndustryFlashcards {
  industryId: string;
  industryLabel: string;
  /** Cards come from the chapters' displayed text because no deck was authored for this curriculum. */
  generated: boolean;
  /** Every lesson of the curriculum was resolved, so module and full-deck counts are complete. */
  complete: boolean;
  origin: FlashcardOrigin;
  lessons: LessonCards[];
}

interface LessonSource {
  identity: string;
  lessonTitle: string;
  moduleIndex: number;
  moduleLabel: string;
  chapters: ChapterLike[];
  accessible: boolean[];
  persistenceKey?: string;
}

const humanise = (value: string) => value.split('-').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

/**
 * The reader's chapter gate for a lesson that is not open, from the same stored records the reader
 * uses: chapter checks, legacy chapter completion and lesson completion. Held chapters are never open;
 * with the lesson's chapter statuses (`assessment`), a chapter without a Knowledge Check opens as in the reader.
 */
export function lessonChapterAccess(identity: string, persistenceKey: string | undefined, chapters: ChapterLike[], storage: StorageLike | null, assessment?: ReadonlyArray<ChapterPlanStatus | undefined>): boolean[] {
  return storedChapterProgress(identity, persistenceKey, chapters, storage, assessment).map((chapter) => chapter.unlocked && !chapter.restricted);
}

/** Chapter index of each authored card a lesson's deck holds, whatever the learner has opened. */
function authoredByChapter(source: LessonSource, decks: FlashcardDeckContent[]): Map<number, FlashcardContent[]> {
  const result = resolveLessonFlashcards({ identity: source.identity, cards: source.chapters, accessible: source.chapters.map(() => true) }, heldSourceDecks(), decks);
  const byChapter = new Map<number, FlashcardContent[]>();
  if (!result) return byChapter;
  const indexOf = new Map(result.sourceDeck.chapters.map((chapter) => [chapter.chapterId, chapter.number - 1]));
  result.sourceDeck.cards.forEach((card) => {
    const index = indexOf.get(card.chapterId);
    if (index !== undefined) byChapter.set(index, [...(byChapter.get(index) ?? []), card]);
  });
  return byChapter;
}

/** Enough of a chapter to tell two versions apart without hashing its whole text. */
const chapterSignature = (chapter: ChapterLike) => {
  const value = chapter as ChapterLike & { keyInsight?: unknown; keyTerms?: unknown[]; narrative?: unknown[]; concepts?: unknown[]; statTiles?: unknown[] };
  return [normaliseTitle(chapter.title), chapter.reviewStatus ?? '', String(value.keyInsight ?? '').length, value.keyTerms?.length ?? 0, value.narrative?.length ?? 0, value.concepts?.length ?? 0, value.statTiles?.length ?? 0].join(':');
};

const chapterCardCache = new WeakMap<object, Map<string, FlashcardDeckContent>>();
const recentDecks: Array<{ key: string; decks: Map<string, FlashcardDeckContent> }> = [];
const RECENT_CURRICULA = 8;

/**
 * Chapter-card decks for a whole curriculum, built once per curriculum so duplicates resolve in curriculum
 * order. With authored decks, their answers and key terms are reserved first so no chapter card repeats them.
 */
function chapterCardDecks(sources: LessonSource[], industryId: string, industryLabel: string, cacheKey: object | null, authored: FlashcardDeckContent[], decks: FlashcardDeckContent[]): Map<string, FlashcardDeckContent> {
  const cached = cacheKey ? chapterCardCache.get(cacheKey) : undefined;
  if (cached) return cached;
  const signature = [industryId, authored.map((deck) => `${deck.deckId}:${deck.cards.length}`).join(','), ...sources.map((source) => `${source.identity}:${source.chapters.map(chapterSignature).join('|')}`)].join('\u0001');
  const recent = recentDecks.find((entry) => entry.key === signature);
  if (recent) {
    if (cacheKey) chapterCardCache.set(cacheKey, recent.decks);
    return recent.decks;
  }
  const seen = new Set<string>();
  const avoid = new Map<string, Map<number, Set<string>[]>>();
  if (authored.length) {
    authored.forEach((deck) => deck.cards.forEach((card) => {
      seen.add(`answer:${normaliseTitle(card.back)}`);
      card.keyTerms.forEach((term) => { if (slug(term)) seen.add(`term:${slug(term)}`); });
    }));
    sources.forEach((source) => {
      const byChapter = authoredByChapter(source, decks);
      avoid.set(source.identity, new Map(Array.from(byChapter).map(([index, cards]) => [index, cards.flatMap((card) => [contentTokens(card.back), contentTokens(card.front)])])));
    });
  }
  const chapterSets = sources.map((source) => source.chapters);
  const built = curriculumChapterDecks(sources.map((source) => ({ ...source, industryId, industryLabel })), { seen, generic: genericDefinitions(chapterSets), repeated: repeatedSentences(chapterSets), ...(authored.length ? { avoid } : {}) });
  if (cacheKey) chapterCardCache.set(cacheKey, built);
  recentDecks.unshift({ key: signature, decks: built });
  recentDecks.length = Math.min(recentDecks.length, RECENT_CURRICULA);
  return built;
}

const sourceLabel = (source: LessonSource, index: number) => `${source.lessonTitle} \u00b7 Chapter ${index + 1}: ${chapterTitle(source.chapters, index)}`;

type LessonItem = { card: FlashcardContent; chapterIndex: number; locked: boolean; origin: 'authored' | 'generated' };

function lessonCards(source: LessonSource, items: LessonItem[], excluded: number): LessonCards {
  const eligible = source.chapters.map((chapter, index) => (isRestrictedChapter(chapter) ? -1 : index)).filter((index) => index >= 0);
  const covered = new Set(items.map((item) => item.chapterIndex));
  return {
    identity: source.identity,
    lessonTitle: source.lessonTitle,
    moduleIndex: source.moduleIndex,
    moduleLabel: source.moduleLabel,
    eligibleChapters: eligible.length,
    chaptersWithCards: eligible.filter((index) => covered.has(index)).length,
    cards: items.map((item) => ({ ...item, lessonIdentity: source.identity, moduleIndex: source.moduleIndex, sourceLabel: sourceLabel(source, item.chapterIndex) })),
    excluded,
  };
}

function authoredItems(source: LessonSource, decks: FlashcardDeckContent[]): { items: LessonItem[]; excluded: number } {
  const result = resolveLessonFlashcards({ identity: source.identity, cards: source.chapters, accessible: source.accessible }, heldSourceDecks(), decks);
  if (!result) return { items: [], excluded: 0 };
  const indexOf = new Map(result.sourceDeck.chapters.map((chapter) => [chapter.chapterId, chapter.number - 1]));
  const items: LessonItem[] = [
    ...result.available.map((card) => ({ card, chapterIndex: indexOf.get(card.chapterId) ?? 0, locked: false, origin: 'authored' as const })),
    ...result.locked.map((card) => ({ card, chapterIndex: indexOf.get(card.chapterId) ?? 0, locked: true, origin: 'authored' as const })),
  ].sort((left, right) => result.sourceDeck.cards.indexOf(left.card) - result.sourceDeck.cards.indexOf(right.card));
  return { items, excluded: result.excluded.length };
}

function generatedItems(source: LessonSource, deck: FlashcardDeckContent | undefined): LessonItem[] {
  if (!deck) return [];
  return deck.cards.flatMap((card) => {
    const chapterIndex = deck.chapters.findIndex((chapter) => chapter.chapterId === card.chapterId);
    const chapter = source.chapters[chapterIndex];
    if (chapterIndex < 0 || !chapter || isRestrictedChapter(chapter) || normaliseTitle(chapter.title) !== normaliseTitle(deck.chapters[chapterIndex].sourceTitle)) return [];
    return [{ card, chapterIndex, locked: !source.accessible[chapterIndex], origin: 'generated' as const }];
  });
}

/** Authored cards in their authored order, then each chapter's generated cards right after that chapter's authored ones. */
function mergeLesson(source: LessonSource, authored: LessonItem[], generated: LessonItem[], excluded: number): LessonCards {
  if (!authored.length) return lessonCards(source, generated, excluded);
  const byChapter = new Map<number, LessonItem[]>();
  generated.forEach((item) => byChapter.set(item.chapterIndex, [...(byChapter.get(item.chapterIndex) ?? []), item]));
  const lastAuthored = new Map<number, number>();
  authored.forEach((item, position) => lastAuthored.set(item.chapterIndex, position));
  const merged: LessonItem[] = [];
  const placed = new Set<number>();
  const placeUpTo = (chapterIndex: number) => {
    Array.from(byChapter.keys()).filter((index) => index < chapterIndex && !placed.has(index) && !lastAuthored.has(index)).sort((a, b) => a - b)
      .forEach((index) => { merged.push(...byChapter.get(index)!); placed.add(index); });
  };
  authored.forEach((item, position) => {
    placeUpTo(item.chapterIndex);
    merged.push(item);
    if (lastAuthored.get(item.chapterIndex) === position && !placed.has(item.chapterIndex)) {
      merged.push(...(byChapter.get(item.chapterIndex) ?? []));
      placed.add(item.chapterIndex);
    }
  });
  Array.from(byChapter.keys()).filter((index) => !placed.has(index)).sort((a, b) => a - b).forEach((index) => merged.push(...byChapter.get(index)!));
  return lessonCards(source, merged, excluded);
}

/**
 * Every flashcard of the open lesson's curriculum, with this learner's access. Without the
 * curriculum (the reader could not list its lessons) only the open lesson is resolved.
 */
export function resolveIndustryFlashcards(lesson: PracticeLesson | null, storage: StorageLike | null = browserStorage(), decks: FlashcardDeckContent[] = PRACTICE_DECKS): IndustryFlashcards | null {
  if (!lesson) return null;
  const { industryId, moduleTitle, lessonTitle } = splitIdentity(lesson.identity);
  if (!industryId) return null;
  let curriculum: CurriculumLesson[] = [];
  try {
    curriculum = lesson.curriculum?.lessons() ?? [];
  } catch {
    curriculum = [];
  }
  const own = curriculum.find((item) => item.identity === lesson.identity);
  const ownSource: LessonSource = {
    identity: lesson.identity,
    lessonTitle: own?.title || lessonTitle,
    moduleIndex: own?.moduleIndex ?? 0,
    moduleLabel: own?.moduleLabel || moduleTitle,
    chapters: lesson.cards,
    accessible: lesson.accessible,
    persistenceKey: lesson.persistenceKey ?? own?.persistenceKey,
  };
  const sources: LessonSource[] = own
    ? curriculum.flatMap((item): LessonSource[] => {
      if (item.identity === lesson.identity) return [ownSource];
      if (!Array.isArray(item.chapters) || !item.chapters.length) return [];
      return [{
        identity: item.identity,
        lessonTitle: item.title,
        moduleIndex: item.moduleIndex,
        moduleLabel: item.moduleLabel,
        chapters: item.chapters,
        accessible: lessonChapterAccess(item.identity, item.persistenceKey, item.chapters, storage, item.assessment),
        persistenceKey: item.persistenceKey,
      }];
    })
    : [ownSource];
  const authored = decks.filter((deck) => deck.industryId === industryId);
  const industryLabel = lesson.curriculum?.industryLabel || authored[0]?.industryLabel || humanise(industryId);
  const generatedDecks = chapterCardDecks(sources, industryId, industryLabel, own ? curriculum : null, authored, decks);
  const lessons = sources.map((source) => {
    const generated = generatedItems(source, generatedDecks.get(source.identity));
    if (!authored.length) return lessonCards(source, generated, 0);
    const { items, excluded } = authoredItems(source, decks);
    return mergeLesson(source, items, generated, excluded);
  });
  const chapterIndex = Math.min(Math.max(0, Math.trunc(Number(lesson.activeChapter) || 0)), Math.max(0, lesson.cards.length - 1));
  return {
    industryId,
    industryLabel,
    generated: !authored.length,
    complete: Boolean(own),
    origin: {
      identity: lesson.identity,
      lessonTitle: ownSource.lessonTitle,
      moduleIndex: ownSource.moduleIndex,
      moduleLabel: ownSource.moduleLabel,
      chapterIndex,
      chapterTitle: chapterTitle(lesson.cards, chapterIndex),
      persistenceKey: ownSource.persistenceKey,
      chapters: lesson.cards,
      accessible: lesson.accessible,
    },
    lessons,
  };
}

export function originLesson(data: IndustryFlashcards): LessonCards | undefined {
  return data.lessons.find((lesson) => lesson.identity === data.origin.identity);
}

/** Cards in one scope, in curriculum order, each card once (by ID and by question and answer). */
export function cardsInScope(data: IndustryFlashcards, scope: FlashcardScopeId): ScopedCard[] {
  const own = originLesson(data)?.cards ?? [];
  const lessons = scope === 'module' ? data.lessons.filter((lesson) => lesson.moduleIndex === data.origin.moduleIndex) : data.lessons;
  const items = scope === 'chapter'
    ? own.filter((item) => item.chapterIndex === data.origin.chapterIndex)
    : scope === 'lesson' ? own : lessons.flatMap((lesson) => lesson.cards);
  const seen = new Set<string>();
  return items.filter((item) => {
    const content = cardContentKey(item.card);
    if (seen.has(item.card.cardId) || seen.has(content)) return false;
    seen.add(item.card.cardId);
    seen.add(content);
    return true;
  });
}

export function scopeTitle(data: IndustryFlashcards, scope: FlashcardScopeId): string {
  if (scope === 'chapter') return `Chapter ${data.origin.chapterIndex + 1}: ${data.origin.chapterTitle}`;
  if (scope === 'lesson') return data.origin.lessonTitle;
  if (scope === 'module') return data.origin.moduleLabel;
  return `All ${data.industryLabel} cards`;
}

/**
 * One study deck for a scope: the cards open to this learner now. Cards keep their own deck IDs, so
 * review history is shared with every other scope that contains them.
 */
export function scopeDeck(data: IndustryFlashcards, scope: FlashcardScopeId, items: ScopedCard[] = cardsInScope(data, scope)): FlashcardDeckContent {
  const title = scopeTitle(data, scope);
  return {
    deckId: `scope-${scope}`,
    title,
    description: '',
    industryId: data.industryId,
    industryLabel: data.industryLabel,
    moduleId: scope,
    moduleLabel: data.origin.moduleLabel,
    lessonId: scope,
    lessonTitle: data.origin.lessonTitle,
    source: { file: '', moduleKey: '', lessonTitle: data.origin.lessonTitle, startMarker: '', endMarker: '', chapterMarker: '', readAtSha256: '', readAt: '' },
    chapters: [],
    cards: items.filter((item) => !item.locked).map((item) => item.card),
    contentStatus: 'Scope',
    mappingNotes: [],
    generated: data.generated,
  };
}

export interface CoverageSummary {
  total: number;
  available: number;
  locked: number;
  excluded: number;
  lessons: number;
  lessonsWithCards: number;
  modules: number;
  modulesWithCards: number;
  eligibleChapters: number;
  chaptersWithCards: number;
}

/** Counts for reporting and the full-deck line; derived from the resolved cards only. */
export function coverageSummary(data: IndustryFlashcards): CoverageSummary {
  const cards = cardsInScope(data, 'all');
  const modules = new Set(data.lessons.map((lesson) => lesson.moduleIndex));
  const modulesWithCards = new Set(data.lessons.filter((lesson) => lesson.cards.length).map((lesson) => lesson.moduleIndex));
  return {
    total: cards.length,
    available: cards.filter((item) => !item.locked).length,
    locked: cards.filter((item) => item.locked).length,
    excluded: data.lessons.reduce((sum, lesson) => sum + lesson.excluded, 0),
    lessons: data.lessons.length,
    lessonsWithCards: data.lessons.filter((lesson) => lesson.cards.length).length,
    modules: modules.size,
    modulesWithCards: modulesWithCards.size,
    eligibleChapters: data.lessons.reduce((sum, lesson) => sum + lesson.eligibleChapters, 0),
    chaptersWithCards: data.lessons.reduce((sum, lesson) => sum + lesson.chaptersWithCards, 0),
  };
}
