import { LESSON_3_1 } from './fashionM3Lesson1';
import { LESSON_3_2 } from './fashionM3Lesson2';
import { LESSON_3_3 } from './fashionM3Lesson3';
import { LESSON_3_4 } from './fashionM3Lesson4';
import { LESSON_3_5 } from './fashionM3Lesson5';
import { LESSON_3_6 } from './fashionM3Lesson6';
import { renderFashionModule03Visual } from './fashionM3Visuals';
import type { FashionM3CardData, FashionModule03VisualKind } from './fashionM3Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { FashionModule03VisualKind } from './fashionM3Core';
export { renderFashionModule03Visual };

/**
 * Keys are the lesson titles shown for Module 03 of the `retail-fashion` sector.
 * Lessons 2 and 5 use fashion-specific titles supplied through the sector overrides in
 * retailSectorFashion.ts, so each deck resolves against the title the learner sees.
 */
const LESSON_KEYS = [
  'Industry Business Models',
  'Products, Services & Segmentation',
  'Customer Segments & Needs',
  'Revenue Streams & Cost Structure',
  'Distribution & Sales Channels',
  'Industry Ecosystem & Stakeholders',
];

const BUNDLES = [LESSON_3_1, LESSON_3_2, LESSON_3_3, LESSON_3_4, LESSON_3_5, LESSON_3_6];

export const FASHION_MODULE03_DECKS: Record<string, FashionM3CardData[]> = {};
export const FASHION_MODULE03_QUIZZES: Record<string, FashionM2Question[]> = {};
export const FASHION_MODULE03_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  FASHION_MODULE03_DECKS[key] = bundle.deck;
  FASHION_MODULE03_QUIZZES[key] = bundle.quiz;
  FASHION_MODULE03_TAKEAWAYS[key] = bundle.takeaways;
});

export function isFashionModule03VisualKind(value: string): value is FashionModule03VisualKind {
  return value.startsWith('fashion-m3-');
}
