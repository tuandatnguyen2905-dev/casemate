import { LESSON_5_1 } from './fashionM5Lesson1';
import { LESSON_5_2 } from './fashionM5Lesson2';
import { LESSON_5_3 } from './fashionM5Lesson3';
import { LESSON_5_4 } from './fashionM5Lesson4';
import { LESSON_5_5 } from './fashionM5Lesson5';
import { renderFashionModule05Visual } from './fashionM5Visuals';
import type { FashionM5CardData, FashionModule05VisualKind } from './fashionM5Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { FashionModule05VisualKind } from './fashionM5Core';
export { renderFashionModule05Visual };

/**
 * Keys are the lesson titles of Module 05 in RETAIL_MODULE_BLUEPRINT (retailSectors.ts), so the
 * decks resolve for the `retail-fashion` sector without changing the lesson list.
 */
const LESSON_KEYS = [
  'Consumer Trends',
  'Technology & Innovation Trends',
  'Market & Channel Trends',
  'Regulatory & Sustainability Trends',
  'Growth Outlook & Strategic Opportunities',
];

const BUNDLES = [LESSON_5_1, LESSON_5_2, LESSON_5_3, LESSON_5_4, LESSON_5_5];

export const FASHION_MODULE05_DECKS: Record<string, FashionM5CardData[]> = {};
export const FASHION_MODULE05_QUIZZES: Record<string, FashionM2Question[]> = {};
export const FASHION_MODULE05_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  FASHION_MODULE05_DECKS[key] = bundle.deck;
  FASHION_MODULE05_QUIZZES[key] = bundle.quiz;
  FASHION_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});

export function isFashionModule05VisualKind(value: string): value is FashionModule05VisualKind {
  return value.startsWith('fashion-m5-');
}
