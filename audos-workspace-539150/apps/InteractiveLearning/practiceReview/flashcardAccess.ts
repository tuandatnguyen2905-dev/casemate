import { isRestrictedChapter } from '../../IndustryKnowledge/lessonFlowCore';
import { FLASHCARD_DECKS, validateDeck } from '../flashcards/decks';
import type { FlashcardContent, FlashcardDeckContent } from '../flashcards/models';
import { chapterRefProblem, normaliseTitle } from '../matchSort/validation';
import type { SourceDecks } from '../matchSort/validation';
import type { ChapterRef, SourceModuleKey } from '../matchSort/types';
import { splitIdentity } from './lessonAccess';
import type { PracticeLesson } from './practiceLessonStore';

export interface LessonFlashcardsResult {
  /** The authored deck, unfiltered. */
  sourceDeck: FlashcardDeckContent;
  /** The same deck limited to cards this learner may see now. */
  deck: FlashcardDeckContent;
  available: FlashcardContent[];
  /** Cards whose chapters exist but are not open to this learner yet. */
  lockedCount: number;
  /** The locked cards themselves, in deck order (never shown, only counted). */
  locked: FlashcardContent[];
  /** Cards withheld because a chapter they draw on is missing, moved or under review. */
  excluded: Array<{ cardId: string; reasons: string[] }>;
}

type Access = { ok: true } | { ok: false; locked: boolean; reason: string };

type LessonLike = Pick<PracticeLesson, 'identity' | 'cards' | 'accessible'>;

/**
 * The deck authored for this lesson: same industry id and lesson title, and at least one of its
 * chapters sits at its recorded position in the reader. Other curricula that reuse a lesson title
 * never match.
 */
function deckForLesson(lesson: LessonLike, decks: FlashcardDeckContent[]): FlashcardDeckContent | null {
  const { industryId, lessonTitle } = splitIdentity(lesson.identity);
  const title = normaliseTitle(lessonTitle);
  return decks.find((deck) => deck.industryId === industryId && normaliseTitle(deck.source.lessonTitle) === title
    && deck.chapters.some((chapter) => normaliseTitle(lesson.cards[chapter.number - 1]?.title) === normaliseTitle(chapter.title))) ?? null;
}

/** Every chapter a card draws on: its own chapter plus each chapter its excerpts come from. */
function chaptersOf(card: FlashcardContent): string[] {
  return Array.from(new Set([card.chapterId, ...card.sourceRefs.map((ref) => ref.chapterId)]));
}

function chapterAccess(deck: FlashcardDeckContent, chapterId: string, lesson: LessonLike, held: SourceDecks): Access {
  const chapter = deck.chapters.find((item) => item.chapterId === chapterId);
  if (!chapter) return { ok: false, locked: false, reason: `unknown chapter ${chapterId}` };
  const index = chapter.number - 1;
  const registryRef = {
    sourceModuleKey: deck.source.moduleKey as SourceModuleKey,
    lessonTitle: deck.source.lessonTitle,
    chapterTitle: chapter.title,
    chapterIndex: index,
    sourceIds: [],
    grounding: '',
  } as ChapterRef;
  const registryProblem = chapterRefProblem(registryRef, held);
  if (registryProblem) return { ok: false, locked: false, reason: registryProblem };
  const card = lesson.cards[index];
  if (!card || normaliseTitle(card.title) !== normaliseTitle(chapter.title)) {
    return { ok: false, locked: false, reason: `reader shows a different chapter at position ${chapter.number}` };
  }
  if (isRestrictedChapter(card)) return { ok: false, locked: false, reason: `chapter "${chapter.title}" is under review` };
  return lesson.accessible[index] ? { ok: true } : { ok: false, locked: true, reason: `chapter "${chapter.title}" is locked` };
}

/**
 * Flashcards for the open lesson. A card is offered only when every chapter it draws on exists at
 * its recorded position in both the reader and the live registry (after review holds), is not
 * under review, and is open to this learner under the reader's own chapter gate.
 */
export function resolveLessonFlashcards(lesson: LessonLike | null, held: SourceDecks, decks: FlashcardDeckContent[] = FLASHCARD_DECKS): LessonFlashcardsResult | null {
  if (!lesson) return null;
  const sourceDeck = deckForLesson(lesson, decks);
  if (!sourceDeck || validateDeck(sourceDeck).length) return null;
  const available: FlashcardContent[] = [];
  const locked: FlashcardContent[] = [];
  const excluded: LessonFlashcardsResult['excluded'] = [];
  sourceDeck.cards.forEach((card) => {
    const results = chaptersOf(card).map((chapterId) => chapterAccess(sourceDeck, chapterId, lesson, held));
    const blocked = results.filter((result): result is Extract<Access, { ok: false }> => !result.ok);
    const hard = blocked.filter((result) => !result.locked);
    if (hard.length) excluded.push({ cardId: card.cardId, reasons: hard.map((result) => result.reason) });
    else if (blocked.length) locked.push(card);
    else available.push(card);
  });
  return { sourceDeck, deck: { ...sourceDeck, cards: available }, available, lockedCount: locked.length, locked, excluded };
}
