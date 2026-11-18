import { LESSON_P2_1 } from './pharmacyM2Lesson1';
import { LESSON_P2_2 } from './pharmacyM2Lesson2';
import { LESSON_P2_3 } from './pharmacyM2Lesson3';
import { LESSON_P2_4 } from './pharmacyM2Lesson4';
import { LESSON_P2_5 } from './pharmacyM2Lesson5';
import { LESSON_P2_6 } from './pharmacyM2Lesson6';
import { renderPharmacyModule02Visual } from './pharmacyM2Visuals';
import { PHARMACY_M2_VISUALS } from './pharmacyM2VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PharmacyM2CardData, PharmacyModule02VisualKind } from './pharmacyM2Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { PharmacyModule02VisualKind } from './pharmacyM2Core';
export { renderPharmacyModule02Visual };

/**
 * Keys are the Module 02 lesson titles shown for the `retail-pharmacy` sector: the first four are the
 * RETAIL_MODULE_BLUEPRINT titles, and the last two are the pharmacy overrides in retailSectorPharmacy.ts.
 * The brief’s upstream, midstream and downstream sections map to the sourcing, logistics and store lessons.
 */
const LESSON_KEYS = [
  'Value Chain Overview',
  'Sourcing & Supplier Partnerships',
  'Distribution, Logistics & Inventory',
  'Store Network & Channel Operations',
  'Inputs, Outputs & Value Creation',
  'Global vs. Local Value Chain',
];

const BUNDLES = [LESSON_P2_1, LESSON_P2_2, LESSON_P2_3, LESSON_P2_4, LESSON_P2_5, LESSON_P2_6];

export const PHARMACY_MODULE02_DECKS: Record<string, PharmacyM2CardData[]> = {};
export const PHARMACY_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const PHARMACY_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  PHARMACY_MODULE02_DECKS[key] = bundle.deck;
  PHARMACY_MODULE02_QUIZZES[key] = bundle.quiz;
  PHARMACY_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(PHARMACY_MODULE02_DECKS, PHARMACY_M2_VISUALS);

export function isPharmacyModule02VisualKind(value: string): value is PharmacyModule02VisualKind {
  return value.startsWith('pharmacy-m2-');
}
