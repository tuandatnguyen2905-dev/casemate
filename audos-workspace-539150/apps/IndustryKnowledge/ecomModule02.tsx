import { LESSON_ECOM2_1 } from './ecomM2Lesson1';
import { LESSON_ECOM2_2 } from './ecomM2Lesson2';
import { LESSON_ECOM2_3 } from './ecomM2Lesson3';
import { LESSON_ECOM2_4 } from './ecomM2Lesson4';
import { LESSON_ECOM2_5 } from './ecomM2Lesson5';
import { LESSON_ECOM2_6 } from './ecomM2Lesson6';
import { renderEcomModule02Visual } from './ecomM2Visuals';
import { ECOM_M2_VISUALS } from './ecomM2VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { EcomM2CardData, EcomModule02VisualKind } from './ecomM2Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { EcomModule02VisualKind } from './ecomM2Core';
export { renderEcomModule02Visual };

const LESSON_KEYS = [
  'Value Chain Overview',
  'Upstream Activities',
  'Midstream Activities',
  'Downstream Activities',
  'Inputs, Outputs & Value Creation',
  'Global vs. Local Value Chain',
];

const BUNDLES = [LESSON_ECOM2_1, LESSON_ECOM2_2, LESSON_ECOM2_3, LESSON_ECOM2_4, LESSON_ECOM2_5, LESSON_ECOM2_6];

export const ECOM_MODULE02_DECKS: Record<string, EcomM2CardData[]> = {};
export const ECOM_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ECOM_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  ECOM_MODULE02_DECKS[key] = bundle.deck;
  ECOM_MODULE02_QUIZZES[key] = bundle.quiz;
  ECOM_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(ECOM_MODULE02_DECKS, ECOM_M2_VISUALS);

export function isEcomModule02VisualKind(value: string): value is EcomModule02VisualKind {
  return value.startsWith('ecom-m2-');
}
