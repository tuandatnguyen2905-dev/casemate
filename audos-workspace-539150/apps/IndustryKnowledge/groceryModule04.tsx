import { LESSON_G4_1 } from './groceryM4Lesson1';
import { LESSON_G4_2 } from './groceryM4Lesson2';
import { LESSON_G4_3 } from './groceryM4Lesson3';
import { LESSON_G4_4 } from './groceryM4Lesson4';
import { LESSON_G4_5 } from './groceryM4Lesson5';
import { renderGroceryModule04Visual } from './groceryM4Visuals';
import { GROCERY_M4_VISUALS } from './groceryM4VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { GroceryM4CardData, GroceryModule04VisualKind } from './groceryM4Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { GroceryModule04VisualKind } from './groceryM4Core';
export { renderGroceryModule04Visual };

/**
 * Keys are the Module 04 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts); the grocery
 * brief matches the five blueprint lessons, so no title overrides are needed.
 */
const LESSON_KEYS = [
  'Industry Competition Structure',
  'Key Industry Players',
  'Competitor Benchmarking',
  'Key Success Factors',
  'SWOT & Strategic Challenges',
];

const BUNDLES = [LESSON_G4_1, LESSON_G4_2, LESSON_G4_3, LESSON_G4_4, LESSON_G4_5];

export const GROCERY_MODULE04_DECKS: Record<string, GroceryM4CardData[]> = {};
export const GROCERY_MODULE04_QUIZZES: Record<string, FashionM2Question[]> = {};
export const GROCERY_MODULE04_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  GROCERY_MODULE04_DECKS[key] = bundle.deck;
  GROCERY_MODULE04_QUIZZES[key] = bundle.quiz;
  GROCERY_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(GROCERY_MODULE04_DECKS, GROCERY_M4_VISUALS);

export function isGroceryModule04VisualKind(value: string): value is GroceryModule04VisualKind {
  return value.startsWith('grocery-m4-');
}
