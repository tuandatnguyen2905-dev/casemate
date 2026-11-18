import { LESSON_C5_1 } from './coffeeM5Lesson1';
import { LESSON_C5_2 } from './coffeeM5Lesson2';
import { LESSON_C5_3 } from './coffeeM5Lesson3';
import { LESSON_C5_4 } from './coffeeM5Lesson4';
import { LESSON_C5_5 } from './coffeeM5Lesson5';
import { renderCoffeeModule05Visual } from './coffeeM5Visuals';
import { COFFEE_M5_VISUALS } from './coffeeM5VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { CoffeeM5CardData, CoffeeModule05VisualKind } from './coffeeM5Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { CoffeeModule05VisualKind } from './coffeeM5Core';
export { renderCoffeeModule05Visual };

/** Keys are the five RETAIL_MODULE_BLUEPRINT lesson titles for Module 05 of the `retail-coffee` sector. */
const LESSON_KEYS = [
  'Consumer Trends',
  'Technology & Innovation Trends',
  'Market & Channel Trends',
  'Regulatory & Sustainability Trends',
  'Growth Outlook & Strategic Opportunities',
];

const BUNDLES = [LESSON_C5_1, LESSON_C5_2, LESSON_C5_3, LESSON_C5_4, LESSON_C5_5];

export const COFFEE_MODULE05_DECKS: Record<string, CoffeeM5CardData[]> = {};
export const COFFEE_MODULE05_QUIZZES: Record<string, FashionM2Question[]> = {};
export const COFFEE_MODULE05_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  COFFEE_MODULE05_DECKS[key] = bundle.deck;
  COFFEE_MODULE05_QUIZZES[key] = bundle.quiz;
  COFFEE_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(COFFEE_MODULE05_DECKS, COFFEE_M5_VISUALS);

export function isCoffeeModule05VisualKind(value: string): value is CoffeeModule05VisualKind {
  return value.startsWith('coffee-m5-');
}
