import { LESSON_2_1 } from './fashionM2Lesson1';
import { LESSON_2_2 } from './fashionM2Lesson2';
import { LESSON_2_3 } from './fashionM2Lesson3';
import { LESSON_2_4 } from './fashionM2Lesson4';
import { LESSON_2_5 } from './fashionM2Lesson5';
import { LESSON_2_6 } from './fashionM2Lesson6';
import { renderFashionModule02Visual } from './fashionM2Visuals';
import type { FashionM2CardData, FashionM2Question, FashionM2Takeaways, FashionModule02VisualKind } from './fashionM2Core';

export type { FashionModule02VisualKind } from './fashionM2Core';
export { renderFashionModule02Visual };

/**
 * Keys match the Module 02 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts),
 * so the deck resolves for the `retail-fashion` sector without changing the lesson list.
 * The research material is organised as value chain sections (overview, upstream,
 * midstream, downstream, value creation, global/local); each one is mapped to the
 * retail lesson whose subject it covers.
 */
const LESSON_KEYS = [
  'Value Chain Overview',
  'Sourcing & Supplier Partnerships',
  'Distribution, Logistics & Inventory',
  'Store Network & Channel Operations',
  'Customer Journey & Service',
  'Where Retail Value Is Created',
];

const BUNDLES = [LESSON_2_1, LESSON_2_2, LESSON_2_3, LESSON_2_4, LESSON_2_5, LESSON_2_6];

export const FASHION_MODULE02_DECKS: Record<string, FashionM2CardData[]> = {};
export const FASHION_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const FASHION_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  FASHION_MODULE02_DECKS[key] = bundle.deck;
  FASHION_MODULE02_QUIZZES[key] = bundle.quiz;
  FASHION_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});

export function isFashionModule02VisualKind(value: string): value is FashionModule02VisualKind {
  return value.startsWith('fashion-m2-');
}
