import type { FlashcardDeckContent } from '../models';
import { COMMERCIAL_BANKING_FUNDAMENTALS } from './commercialBankingFundamentals';
import { CONSUMER_FINANCE_FUNDAMENTALS } from './consumerFinanceFundamentals';
import { EXPANSION_DECKS } from './expansion';

export { COMMERCIAL_BANKING_FUNDAMENTALS, CONSUMER_FINANCE_FUNDAMENTALS };

/** The two original decks first, then the expansion decks (./expansion.ts) in curriculum order. */
export const FLASHCARD_DECKS: FlashcardDeckContent[] = [COMMERCIAL_BANKING_FUNDAMENTALS, CONSUMER_FINANCE_FUNDAMENTALS, ...EXPANSION_DECKS];

const STABLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Structural checks that need no file access: stable IDs, unique cards, every card mapped to a
 * chapter of its deck, required text present. Returns problems; an empty list means valid.
 */
export function validateDeck(deck: FlashcardDeckContent): string[] {
  const problems: string[] = [];
  const chapterIds = new Set(deck.chapters.map((chapter) => chapter.chapterId));
  if (!STABLE_ID.test(deck.deckId)) problems.push(`deck id "${deck.deckId}" is not a stable slug`);
  if (chapterIds.size !== deck.chapters.length) problems.push('duplicate chapter id');
  deck.chapters.forEach((chapter, index) => {
    if (chapter.number !== index + 1) problems.push(`chapter ${chapter.chapterId} is numbered ${chapter.number}, expected ${index + 1}`);
  });
  const seen = new Set<string>();
  deck.cards.forEach((card) => {
    const where = `card ${card.cardId}`;
    if (!STABLE_ID.test(card.cardId)) problems.push(`${where}: id is not a stable slug`);
    if (/^\d+$/.test(card.cardId) || /-(?:\d+)$/.test(card.cardId)) problems.push(`${where}: id looks positional`);
    if (seen.has(card.cardId)) problems.push(`${where}: duplicate id`);
    seen.add(card.cardId);
    if (card.deckId !== deck.deckId) problems.push(`${where}: deckId ${card.deckId} does not match deck`);
    if (card.industryId !== deck.industryId || card.moduleId !== deck.moduleId || card.lessonId !== deck.lessonId) problems.push(`${where}: industry/module/lesson mismatch`);
    if (!chapterIds.has(card.chapterId)) problems.push(`${where}: unknown chapter ${card.chapterId}`);
    const required = deck.generated ? (['front', 'back', 'explanation'] as const) : (['front', 'back', 'explanation', 'practicalExample'] as const);
    required.forEach((field) => {
      if (!String(card[field] ?? '').trim()) problems.push(`${where}: empty ${field}`);
    });
    if (card.front.trim() === card.back.trim()) problems.push(`${where}: front repeats back`);
    if (!card.sourceRefs.length) problems.push(`${where}: no source reference`);
    card.sourceRefs.forEach((source) => {
      if (!chapterIds.has(source.chapterId)) problems.push(`${where}: source ref to unknown chapter ${source.chapterId}`);
      if (!source.excerpt.trim()) problems.push(`${where}: empty source excerpt`);
    });
    if (!card.sourceRefs.some((source) => source.chapterId === card.chapterId)) problems.push(`${where}: no source ref in its own chapter`);
  });
  return problems;
}

export function deckById(deckId: string, decks: FlashcardDeckContent[] = FLASHCARD_DECKS): FlashcardDeckContent | null {
  return decks.find((deck) => deck.deckId === deckId) ?? null;
}
