import { LESSON_G2_1 } from './groceryM2Lesson1';
import { LESSON_G2_2 } from './groceryM2Lesson2';
import { LESSON_G2_3 } from './groceryM2Lesson3';
import { LESSON_G2_4 } from './groceryM2Lesson4';
import { LESSON_G2_5 } from './groceryM2Lesson5';
import { LESSON_G2_6 } from './groceryM2Lesson6';
import { renderGroceryModule02Visual } from './groceryM2Visuals';
import { GROCERY_M2_VISUALS } from './groceryM2VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { GroceryM2CardData, GroceryModule02VisualKind } from './groceryM2Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { GroceryModule02VisualKind } from './groceryM2Core';
export { renderGroceryModule02Visual };

/**
 * Keys are the Module 02 lesson titles shown for the `retail-grocery` sector: the first four are the
 * RETAIL_MODULE_BLUEPRINT titles, and the last two are the grocery overrides in retailSectorGrocery.ts.
 */
const LESSON_KEYS = [
  'Value Chain Overview',
  'Sourcing & Supplier Partnerships',
  'Distribution, Logistics & Inventory',
  'Store Network & Channel Operations',
  'Inputs, Outputs & Value Creation',
  'Global vs. Local Value Chain',
];

const BUNDLES = [LESSON_G2_1, LESSON_G2_2, LESSON_G2_3, LESSON_G2_4, LESSON_G2_5, LESSON_G2_6];

export const GROCERY_MODULE02_DECKS: Record<string, GroceryM2CardData[]> = {};
export const GROCERY_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const GROCERY_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  GROCERY_MODULE02_DECKS[key] = bundle.deck;
  GROCERY_MODULE02_QUIZZES[key] = bundle.quiz;
  GROCERY_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(GROCERY_MODULE02_DECKS, GROCERY_M2_VISUALS);

export function isGroceryModule02VisualKind(value: string): value is GroceryModule02VisualKind {
  return value.startsWith('grocery-m2-');
}
