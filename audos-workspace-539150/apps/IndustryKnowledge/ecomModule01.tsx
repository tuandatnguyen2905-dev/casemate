import { LESSON_ECOM_1 } from './ecomM1Lesson1';
import { LESSON_ECOM_2 } from './ecomM1Lesson2';
import { LESSON_ECOM_3 } from './ecomM1Lesson3';
import { LESSON_ECOM_4 } from './ecomM1Lesson4';
import { LESSON_ECOM_5 } from './ecomM1Lesson5';
import { renderEcomModule01Visual } from './ecomM1Visuals';
import { ECOM_M1_VISUALS } from './ecomM1VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { EcomM1CardData, EcomModule01VisualKind } from './ecomM1Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { EcomModule01VisualKind } from './ecomM1Core';
export { renderEcomModule01Visual };

/**
 * Keys match the E-Commerce-specific Module 01 lesson titles in techSectorsEnterpriseEcommerce.ts.
 * The five lessons map one-to-one to definition and scope, history, global market, Vietnam market and drivers.
 */
const LESSON_KEYS = [
  'Industry Definition & Scope',
  'Industry History & Development',
  'Global Market Overview',
  'Vietnam Market Overview',
  'Industry Drivers & External Factors',
];

const BUNDLES = [LESSON_ECOM_1, LESSON_ECOM_2, LESSON_ECOM_3, LESSON_ECOM_4, LESSON_ECOM_5];

export const ECOM_MODULE01_DECKS: Record<string, EcomM1CardData[]> = {};
export const ECOM_MODULE01_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ECOM_MODULE01_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  ECOM_MODULE01_DECKS[key] = bundle.deck;
  ECOM_MODULE01_QUIZZES[key] = bundle.quiz;
  ECOM_MODULE01_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(ECOM_MODULE01_DECKS, ECOM_M1_VISUALS);

export function isEcomModule01VisualKind(value: string): value is EcomModule01VisualKind {
  return value.startsWith('ecom-m1-');
}
