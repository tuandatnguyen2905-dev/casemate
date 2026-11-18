import { LESSON_G5_1 } from './groceryM5Lesson1';
import { LESSON_G5_2 } from './groceryM5Lesson2';
import { LESSON_G5_3 } from './groceryM5Lesson3';
import { LESSON_G5_4 } from './groceryM5Lesson4';
import { LESSON_G5_5 } from './groceryM5Lesson5';
import { renderGroceryModule05Visual } from './groceryM5Visuals';
import { GROCERY_M5_VISUALS } from './groceryM5VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { GroceryM5CardData, GroceryModule05VisualKind } from './groceryM5Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { GroceryModule05VisualKind } from './groceryM5Core';
export { renderGroceryModule05Visual };

/**
 * Keys are the Module 05 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts); the grocery
 * brief matches the five blueprint lessons, so no title overrides are needed.
 */
const LESSON_KEYS = [
  'Consumer Trends',
  'Technology & Innovation Trends',
  'Market & Channel Trends',
  'Regulatory & Sustainability Trends',
  'Growth Outlook & Strategic Opportunities',
];

const BUNDLES = [LESSON_G5_1, LESSON_G5_2, LESSON_G5_3, LESSON_G5_4, LESSON_G5_5];

export const GROCERY_MODULE05_DECKS: Record<string, GroceryM5CardData[]> = {};
export const GROCERY_MODULE05_QUIZZES: Record<string, FashionM2Question[]> = {};
export const GROCERY_MODULE05_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  GROCERY_MODULE05_DECKS[key] = bundle.deck;
  GROCERY_MODULE05_QUIZZES[key] = bundle.quiz;
  GROCERY_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(GROCERY_MODULE05_DECKS, GROCERY_M5_VISUALS);

export function isGroceryModule05VisualKind(value: string): value is GroceryModule05VisualKind {
  return value.startsWith('grocery-m5-');
}
