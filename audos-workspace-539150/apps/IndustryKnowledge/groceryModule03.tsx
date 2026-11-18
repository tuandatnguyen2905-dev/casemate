import { LESSON_G3_1 } from './groceryM3Lesson1';
import { LESSON_G3_2 } from './groceryM3Lesson2';
import { LESSON_G3_3 } from './groceryM3Lesson3';
import { LESSON_G3_4 } from './groceryM3Lesson4';
import { LESSON_G3_5 } from './groceryM3Lesson5';
import { LESSON_G3_6 } from './groceryM3Lesson6';
import { renderGroceryModule03Visual } from './groceryM3Visuals';
import { GROCERY_M3_VISUALS } from './groceryM3VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { GroceryM3CardData, GroceryModule03VisualKind } from './groceryM3Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { GroceryModule03VisualKind } from './groceryM3Core';
export { renderGroceryModule03Visual };

/**
 * Keys are the Module 03 lesson titles shown for the `retail-grocery` sector: lessons 1, 3, 4 and 6
 * keep the RETAIL_MODULE_BLUEPRINT titles, and lessons 2 and 5 use the grocery overrides in
 * retailSectorGrocery.ts.
 */
const LESSON_KEYS = [
  'Industry Business Models',
  'Products, Services & Segmentation',
  'Customer Segments & Needs',
  'Revenue Streams & Cost Structure',
  'Distribution & Sales Channels',
  'Industry Ecosystem & Stakeholders',
];

const BUNDLES = [LESSON_G3_1, LESSON_G3_2, LESSON_G3_3, LESSON_G3_4, LESSON_G3_5, LESSON_G3_6];

export const GROCERY_MODULE03_DECKS: Record<string, GroceryM3CardData[]> = {};
export const GROCERY_MODULE03_QUIZZES: Record<string, FashionM2Question[]> = {};
export const GROCERY_MODULE03_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  GROCERY_MODULE03_DECKS[key] = bundle.deck;
  GROCERY_MODULE03_QUIZZES[key] = bundle.quiz;
  GROCERY_MODULE03_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(GROCERY_MODULE03_DECKS, GROCERY_M3_VISUALS);

export function isGroceryModule03VisualKind(value: string): value is GroceryModule03VisualKind {
  return value.startsWith('grocery-m3-');
}
