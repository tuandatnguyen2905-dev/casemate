import { LESSON_P1_1 } from './pharmacyM1Lesson1';
import { LESSON_P1_2 } from './pharmacyM1Lesson2';
import { LESSON_P1_3 } from './pharmacyM1Lesson3';
import { LESSON_P1_4 } from './pharmacyM1Lesson4';
import { LESSON_P1_5 } from './pharmacyM1Lesson5';
import { renderPharmacyModule01Visual } from './pharmacyM1Visuals';
import { PHARMACY_M1_VISUALS } from './pharmacyM1VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PharmacyM1CardData, PharmacyModule01VisualKind } from './pharmacyM1Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { PharmacyModule01VisualKind } from './pharmacyM1Core';
export { renderPharmacyModule01Visual };

/**
 * Keys are the Module 01 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts), so the
 * decks resolve for the `retail-pharmacy` sector without changing the lesson list. The research
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

const BUNDLES = [LESSON_P1_1, LESSON_P1_2, LESSON_P1_3, LESSON_P1_4, LESSON_P1_5];

export const PHARMACY_MODULE01_DECKS: Record<string, PharmacyM1CardData[]> = {};
export const PHARMACY_MODULE01_QUIZZES: Record<string, FashionM2Question[]> = {};
export const PHARMACY_MODULE01_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  PHARMACY_MODULE01_DECKS[key] = bundle.deck;
  PHARMACY_MODULE01_QUIZZES[key] = bundle.quiz;
  PHARMACY_MODULE01_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(PHARMACY_MODULE01_DECKS, PHARMACY_M1_VISUALS);

export function isPharmacyModule01VisualKind(value: string): value is PharmacyModule01VisualKind {
  return value.startsWith('pharmacy-m1-');
}
