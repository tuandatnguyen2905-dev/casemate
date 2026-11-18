import { LESSON_1_1 } from './fashionM1Lesson1';
import { LESSON_1_2 } from './fashionM1Lesson2';
import { LESSON_1_3 } from './fashionM1Lesson3';
import { LESSON_1_4 } from './fashionM1Lesson4';
import { LESSON_1_5 } from './fashionM1Lesson5';
import { renderFashionModule01Visual } from './fashionM1Visuals';
import type { FashionM1CardData, FashionM1Question, FashionM1Takeaways, FashionModule01VisualKind } from './fashionM1Core';

export type { FashionModule01VisualKind } from './fashionM1Core';
export { renderFashionModule01Visual };

/**
 * Keys match the Module 01 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts),
 * so the deck resolves for the `retail-fashion` sector without changing the lesson list.
 */
const LESSON_KEYS = [
  'What the Industry Includes',
  'How the Industry Evolved',
  'How the Global Market Is Structured',
  'How the Vietnam Market Works',
  'What Drives Industry Change',
];

const BUNDLES = [LESSON_1_1, LESSON_1_2, LESSON_1_3, LESSON_1_4, LESSON_1_5];

export const FASHION_MODULE01_DECKS: Record<string, FashionM1CardData[]> = {};
export const FASHION_MODULE01_QUIZZES: Record<string, FashionM1Question[]> = {};
export const FASHION_MODULE01_TAKEAWAYS: Record<string, FashionM1Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  FASHION_MODULE01_DECKS[key] = bundle.deck;
  FASHION_MODULE01_QUIZZES[key] = bundle.quiz;
  FASHION_MODULE01_TAKEAWAYS[key] = bundle.takeaways;
});

export function isFashionModule01VisualKind(value: string): value is FashionModule01VisualKind {
  return value.startsWith('fashion-m1-');
}
