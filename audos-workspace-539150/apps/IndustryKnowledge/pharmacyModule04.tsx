import { LESSON_P4_1 } from './pharmacyM4Lesson1';
import { LESSON_P4_2 } from './pharmacyM4Lesson2';
import { LESSON_P4_3 } from './pharmacyM4Lesson3';
import { LESSON_P4_4 } from './pharmacyM4Lesson4';
import { LESSON_P4_5 } from './pharmacyM4Lesson5';
import { renderPharmacyModule04Visual } from './pharmacyM4Visuals';
import { PHARMACY_M4_VISUALS } from './pharmacyM4VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PharmacyM4CardData, PharmacyModule04VisualKind } from './pharmacyM4Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { PharmacyModule04VisualKind } from './pharmacyM4Core';
export { renderPharmacyModule04Visual };

/** Keys are the five RETAIL_MODULE_BLUEPRINT lesson titles for Module 04 of the `retail-pharmacy` sector. */
const LESSON_KEYS = [
  'Industry Competition Structure',
  'Key Industry Players',
  'Competitor Benchmarking',
  'Key Success Factors',
  'SWOT & Strategic Challenges',
];

const BUNDLES = [LESSON_P4_1, LESSON_P4_2, LESSON_P4_3, LESSON_P4_4, LESSON_P4_5];

export const PHARMACY_MODULE04_DECKS: Record<string, PharmacyM4CardData[]> = {};
export const PHARMACY_MODULE04_QUIZZES: Record<string, FashionM2Question[]> = {};
export const PHARMACY_MODULE04_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  PHARMACY_MODULE04_DECKS[key] = bundle.deck;
  PHARMACY_MODULE04_QUIZZES[key] = bundle.quiz;
  PHARMACY_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(PHARMACY_MODULE04_DECKS, PHARMACY_M4_VISUALS);

export function isPharmacyModule04VisualKind(value: string): value is PharmacyModule04VisualKind {
  return value.startsWith('pharmacy-m4-');
}
