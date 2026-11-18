// Public surface of the isolated Smart Flashcards feature.

export { default as SmartFlashcards } from './components/SmartFlashcards';
export type { SmartFlashcardsProps } from './components/SmartFlashcards';
export { default as Flashcard } from './components/Flashcard';
export { default as FlashcardDeck } from './components/FlashcardDeck';
export { default as FlashcardSession } from './components/FlashcardSession';
export { default as RecallRating } from './components/RecallRating';
export { default as FlashcardProgress, MasteryMeter } from './components/FlashcardProgress';
export { default as ReviewSummary } from './components/ReviewSummary';
export { default as FlashcardsDemo } from './FlashcardsDemo';
export * from './models';
export * from './scheduler';
export * from './review';
export * from './persistence';
export { FLASHCARD_DECKS, validateDeck, deckById } from './decks';
export { useFlashcardReviews } from './useFlashcardReviews';
