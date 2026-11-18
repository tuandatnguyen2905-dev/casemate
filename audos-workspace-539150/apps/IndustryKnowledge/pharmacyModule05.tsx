import { LESSON_P5_1 } from './pharmacyM5Lesson1';
import { LESSON_P5_2 } from './pharmacyM5Lesson2';
import { LESSON_P5_3 } from './pharmacyM5Lesson3';
import { LESSON_P5_4 } from './pharmacyM5Lesson4';
import { LESSON_P5_5 } from './pharmacyM5Lesson5';
import { renderPharmacyModule05Visual } from './pharmacyM5Visuals';
import { PHARMACY_M5_VISUALS } from './pharmacyM5VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PharmacyM5CardData, PharmacyModule05VisualKind } from './pharmacyM5Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { PharmacyModule05VisualKind } from './pharmacyM5Core';
export { renderPharmacyModule05Visual };

/** Keys are the five RETAIL_MODULE_BLUEPRINT lesson titles for Module 05 of the `retail-pharmacy` sector. */
const LESSON_KEYS = [
  'Consumer Trends',
  'Technology & Innovation Trends',
  'Market & Channel Trends',
  'Regulatory & Sustainability Trends',
  'Growth Outlook & Strategic Opportunities',
];

const BUNDLES = [LESSON_P5_1, LESSON_P5_2, LESSON_P5_3, LESSON_P5_4, LESSON_P5_5];

export const PHARMACY_MODULE05_DECKS: Record<string, PharmacyM5CardData[]> = {};
export const PHARMACY_MODULE05_QUIZZES: Record<string, FashionM2Question[]> = {};
export const PHARMACY_MODULE05_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  PHARMACY_MODULE05_DECKS[key] = bundle.deck;
  PHARMACY_MODULE05_QUIZZES[key] = bundle.quiz;
  PHARMACY_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(PHARMACY_MODULE05_DECKS, PHARMACY_M5_VISUALS);

export function isPharmacyModule05VisualKind(value: string): value is PharmacyModule05VisualKind {
  return value.startsWith('pharmacy-m5-');
}
