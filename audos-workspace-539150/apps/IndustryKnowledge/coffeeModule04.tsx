import { LESSON_C4_1 } from './coffeeM4Lesson1';
import { LESSON_C4_2 } from './coffeeM4Lesson2';
import { LESSON_C4_3 } from './coffeeM4Lesson3';
import { LESSON_C4_4 } from './coffeeM4Lesson4';
import { LESSON_C4_5 } from './coffeeM4Lesson5';
import { renderCoffeeModule04Visual } from './coffeeM4Visuals';
import { COFFEE_M4_VISUALS } from './coffeeM4VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { CoffeeM4CardData, CoffeeModule04VisualKind } from './coffeeM4Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { CoffeeModule04VisualKind } from './coffeeM4Core';
export { renderCoffeeModule04Visual };

/** Keys are the five RETAIL_MODULE_BLUEPRINT lesson titles for Module 04 of the `retail-coffee` sector. */
const LESSON_KEYS = [
  'Industry Competition Structure',
  'Key Industry Players',
  'Competitor Benchmarking',
  'Key Success Factors',
  'SWOT & Strategic Challenges',
];

const BUNDLES = [LESSON_C4_1, LESSON_C4_2, LESSON_C4_3, LESSON_C4_4, LESSON_C4_5];

export const COFFEE_MODULE04_DECKS: Record<string, CoffeeM4CardData[]> = {};
export const COFFEE_MODULE04_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COFFEE_MODULE04_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  COFFEE_MODULE04_DECKS[key] = bundle.deck;
  COFFEE_MODULE04_QUIZZES[key] = bundle.quiz;
  COFFEE_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COFFEE_MODULE04_DECKS, COFFEE_M4_VISUALS);

export function isCoffeeModule04VisualKind(value: string): value is CoffeeModule04VisualKind {
  return value.startsWith('coffee-m4-');
}
