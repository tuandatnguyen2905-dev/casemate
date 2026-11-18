import { LESSON_G1_1 } from './groceryM1Lesson1';
import { LESSON_G1_2 } from './groceryM1Lesson2';
import { LESSON_G1_3 } from './groceryM1Lesson3';
import { LESSON_G1_4 } from './groceryM1Lesson4';
import { LESSON_G1_5 } from './groceryM1Lesson5';
import { renderGroceryModule01Visual } from './groceryM1Visuals';
import { GROCERY_M1_VISUALS } from './groceryM1VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { GroceryM1CardData, GroceryModule01VisualKind } from './groceryM1Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { GroceryModule01VisualKind } from './groceryM1Core';
export { renderGroceryModule01Visual };

/**
 * Keys are the Module 01 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts), so the
 * decks resolve for the `retail-grocery` sector without changing the lesson list. The research
 * material is organised as definition and scope, history, global market, Vietnam market and
 * drivers; each section is mapped to the blueprint lesson whose subject it covers.
 */
const LESSON_KEYS = [
  'What the Industry Includes',
  'How the Industry Evolved',
  'How the Global Market Is Structured',
  'How the Vietnam Market Works',
  'What Drives Industry Change',
];

const BUNDLES = [LESSON_G1_1, LESSON_G1_2, LESSON_G1_3, LESSON_G1_4, LESSON_G1_5];

export const GROCERY_MODULE01_DECKS: Record<string, GroceryM1CardData[]> = {};
export const GROCERY_MODULE01_QUIZZES: Record<string, FashionM2Question[]> = {};
export const GROCERY_MODULE01_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  GROCERY_MODULE01_DECKS[key] = bundle.deck;
  GROCERY_MODULE01_QUIZZES[key] = bundle.quiz;
  GROCERY_MODULE01_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(GROCERY_MODULE01_DECKS, GROCERY_M1_VISUALS);

export function isGroceryModule01VisualKind(value: string): value is GroceryModule01VisualKind {
  return value.startsWith('grocery-m1-');
}
