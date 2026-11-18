import { LESSON_C2_1 } from './coffeeM2Lesson1';
import { LESSON_C2_2 } from './coffeeM2Lesson2';
import { LESSON_C2_3 } from './coffeeM2Lesson3';
import { LESSON_C2_4 } from './coffeeM2Lesson4';
import { LESSON_C2_5 } from './coffeeM2Lesson5';
import { LESSON_C2_6 } from './coffeeM2Lesson6';
import { renderCoffeeModule02Visual } from './coffeeM2Visuals';
import { COFFEE_M2_VISUALS } from './coffeeM2VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { CoffeeM2CardData, CoffeeModule02VisualKind } from './coffeeM2Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { CoffeeModule02VisualKind } from './coffeeM2Core';
export { renderCoffeeModule02Visual };

/**
 * Keys are the Module 02 lesson titles shown for the `retail-coffee` sector: the first four are the
 * RETAIL_MODULE_BLUEPRINT titles, and the last two are the coffeehouse overrides in retailSectorCoffee.ts.
 * The brief’s upstream, midstream and downstream sections map to the sourcing, logistics and store lessons.
 */
const LESSON_KEYS = [
  'Value Chain Overview',
  'Sourcing & Supplier Partnerships',
  'Distribution, Logistics & Inventory',
  'Store Network & Channel Operations',
  'Inputs, Outputs & Value Creation',
  'Global vs. Local Value Chain',
];

const BUNDLES = [LESSON_C2_1, LESSON_C2_2, LESSON_C2_3, LESSON_C2_4, LESSON_C2_5, LESSON_C2_6];

export const COFFEE_MODULE02_DECKS: Record<string, CoffeeM2CardData[]> = {};
export const COFFEE_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COFFEE_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  COFFEE_MODULE02_DECKS[key] = bundle.deck;
  COFFEE_MODULE02_QUIZZES[key] = bundle.quiz;
  COFFEE_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COFFEE_MODULE02_DECKS, COFFEE_M2_VISUALS);

export function isCoffeeModule02VisualKind(value: string): value is CoffeeModule02VisualKind {
  return value.startsWith('coffee-m2-');
}
