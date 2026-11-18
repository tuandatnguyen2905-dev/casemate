import { LESSON_P3_1 } from './pharmacyM3Lesson1';
import { LESSON_P3_2 } from './pharmacyM3Lesson2';
import { LESSON_P3_3 } from './pharmacyM3Lesson3';
import { LESSON_P3_4 } from './pharmacyM3Lesson4';
import { LESSON_P3_5 } from './pharmacyM3Lesson5';
import { LESSON_P3_6 } from './pharmacyM3Lesson6';
import { renderPharmacyModule03Visual } from './pharmacyM3Visuals';
import { PHARMACY_M3_VISUALS } from './pharmacyM3VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PharmacyM3CardData, PharmacyModule03VisualKind } from './pharmacyM3Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { PharmacyModule03VisualKind } from './pharmacyM3Core';
export { renderPharmacyModule03Visual };

/**
 * Keys are the Module 03 lesson titles shown for the `retail-pharmacy` sector: lessons 1, 3, 4 and 6 are
 * RETAIL_MODULE_BLUEPRINT titles, and lessons 2 and 5 are the pharmacy overrides in retailSectorPharmacy.ts.
 */
const LESSON_KEYS = [
  'Industry Business Models',
  'Products, Services & Segmentation',
  'Customer Segments & Needs',
  'Revenue Streams & Cost Structure',
  'Distribution & Sales Channels',
  'Industry Ecosystem & Stakeholders',
];

const BUNDLES = [LESSON_P3_1, LESSON_P3_2, LESSON_P3_3, LESSON_P3_4, LESSON_P3_5, LESSON_P3_6];

export const PHARMACY_MODULE03_DECKS: Record<string, PharmacyM3CardData[]> = {};
export const PHARMACY_MODULE03_QUIZZES: Record<string, FashionM2Question[]> = {};
export const PHARMACY_MODULE03_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  PHARMACY_MODULE03_DECKS[key] = bundle.deck;
  PHARMACY_MODULE03_QUIZZES[key] = bundle.quiz;
  PHARMACY_MODULE03_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(PHARMACY_MODULE03_DECKS, PHARMACY_M3_VISUALS);

export function isPharmacyModule03VisualKind(value: string): value is PharmacyModule03VisualKind {
  return value.startsWith('pharmacy-m3-');
}
