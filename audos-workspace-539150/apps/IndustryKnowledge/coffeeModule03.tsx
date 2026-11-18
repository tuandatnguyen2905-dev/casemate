import { LESSON_C3_1 } from './coffeeM3Lesson1';
import { LESSON_C3_2 } from './coffeeM3Lesson2';
import { LESSON_C3_3 } from './coffeeM3Lesson3';
import { LESSON_C3_4 } from './coffeeM3Lesson4';
import { LESSON_C3_5 } from './coffeeM3Lesson5';
import { LESSON_C3_6 } from './coffeeM3Lesson6';
import { renderCoffeeModule03Visual } from './coffeeM3Visuals';
import { COFFEE_M3_VISUALS } from './coffeeM3VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { CoffeeM3CardData, CoffeeModule03VisualKind } from './coffeeM3Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { CoffeeModule03VisualKind } from './coffeeM3Core';
export { renderCoffeeModule03Visual };

/**
 * Keys are the Module 03 lesson titles shown for the `retail-coffee` sector, taken from the
 * RETAIL_MODULE_BLUEPRINT; the sector file overrides the titles of the assortment and store-economics cards.
 */
const LESSON_KEYS = [
  'Industry Business Models',
  'Products, Services & Segmentation',
  'Customer Segments & Needs',
  'Revenue Streams & Cost Structure',
  'Distribution & Sales Channels',
  'Industry Ecosystem & Stakeholders',
];

const BUNDLES = [LESSON_C3_1, LESSON_C3_2, LESSON_C3_3, LESSON_C3_4, LESSON_C3_5, LESSON_C3_6];

export const COFFEE_MODULE03_DECKS: Record<string, CoffeeM3CardData[]> = {};
export const COFFEE_MODULE03_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COFFEE_MODULE03_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  COFFEE_MODULE03_DECKS[key] = bundle.deck;
  COFFEE_MODULE03_QUIZZES[key] = bundle.quiz;
  COFFEE_MODULE03_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COFFEE_MODULE03_DECKS, COFFEE_M3_VISUALS);

export function isCoffeeModule03VisualKind(value: string): value is CoffeeModule03VisualKind {
  return value.startsWith('coffee-m3-');
}
