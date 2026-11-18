import { LESSON_C1_1 } from './coffeeM1Lesson1';
import { LESSON_C1_2 } from './coffeeM1Lesson2';
import { LESSON_C1_3 } from './coffeeM1Lesson3';
import { LESSON_C1_4 } from './coffeeM1Lesson4';
import { LESSON_C1_5 } from './coffeeM1Lesson5';
import { renderCoffeeModule01Visual } from './coffeeM1Visuals';
import { COFFEE_M1_VISUALS } from './coffeeM1VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { CoffeeM1CardData, CoffeeModule01VisualKind } from './coffeeM1Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { CoffeeModule01VisualKind } from './coffeeM1Core';
export { renderCoffeeModule01Visual };

/**
 * Keys are the Module 01 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts), so the decks resolve
 * for the `retail-coffee` sector without changing the lesson list. The research material is organised as
 * definition and scope, history, global market, Vietnam market and drivers; each section is mapped to the
 * blueprint lesson whose subject it covers.
 */
const LESSON_KEYS = [
  'What the Industry Includes',
  'How the Industry Evolved',
  'How the Global Market Is Structured',
  'How the Vietnam Market Works',
  'What Drives Industry Change',
];

const BUNDLES = [LESSON_C1_1, LESSON_C1_2, LESSON_C1_3, LESSON_C1_4, LESSON_C1_5];

export const COFFEE_MODULE01_DECKS: Record<string, CoffeeM1CardData[]> = {};
export const COFFEE_MODULE01_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COFFEE_MODULE01_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  COFFEE_MODULE01_DECKS[key] = bundle.deck;
  COFFEE_MODULE01_QUIZZES[key] = bundle.quiz;
  COFFEE_MODULE01_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COFFEE_MODULE01_DECKS, COFFEE_M1_VISUALS);

export function isCoffeeModule01VisualKind(value: string): value is CoffeeModule01VisualKind {
  return value.startsWith('coffee-m1-');
}
