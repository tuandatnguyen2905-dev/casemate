import { LESSON_4_1 } from './fashionM4Lesson1';
import { LESSON_4_2 } from './fashionM4Lesson2';
import { LESSON_4_3 } from './fashionM4Lesson3';
import { LESSON_4_4 } from './fashionM4Lesson4';
import { LESSON_4_5 } from './fashionM4Lesson5';
import { renderFashionModule04Visual } from './fashionM4Visuals';
import type { FashionM4CardData, FashionModule04VisualKind } from './fashionM4Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { FashionModule04VisualKind } from './fashionM4Core';
export { renderFashionModule04Visual };

/**
 * Keys are the lesson titles of Module 04 in RETAIL_MODULE_BLUEPRINT (retailSectors.ts), so the
 * decks resolve for the `retail-fashion` sector without changing the lesson list.
 */
const LESSON_KEYS = [
  'Industry Competition Structure',
  'Key Industry Players',
  'Competitor Benchmarking',
  'Key Success Factors',
  'SWOT & Strategic Challenges',
];

const BUNDLES = [LESSON_4_1, LESSON_4_2, LESSON_4_3, LESSON_4_4, LESSON_4_5];

export const FASHION_MODULE04_DECKS: Record<string, FashionM4CardData[]> = {};
export const FASHION_MODULE04_QUIZZES: Record<string, FashionM2Question[]> = {};
export const FASHION_MODULE04_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  FASHION_MODULE04_DECKS[key] = bundle.deck;
  FASHION_MODULE04_QUIZZES[key] = bundle.quiz;
  FASHION_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});

export function isFashionModule04VisualKind(value: string): value is FashionModule04VisualKind {
  return value.startsWith('fashion-m4-');
}
