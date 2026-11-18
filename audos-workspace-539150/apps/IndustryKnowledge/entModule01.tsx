import { LESSON_ENT_1 } from './entM1Lesson1';
import { LESSON_ENT_2 } from './entM1Lesson2';
import { LESSON_ENT_3 } from './entM1Lesson3';
import { LESSON_ENT_4 } from './entM1Lesson4';
import { LESSON_ENT_5 } from './entM1Lesson5';
import { renderEntModule01Visual } from './entM1Visuals';
import { ENT_M1_VISUALS } from './entM1VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { EntM1CardData, EntModule01VisualKind } from './entM1Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { EntModule01VisualKind } from './entM1Core';
export { renderEntModule01Visual };

/**
 * Keys are the Module 01 lesson titles in RETAIL_MODULE_BLUEPRINT (retailSectors.ts), so the decks resolve
 * for the `tech-enterprise-sw` sector without changing the lesson list. The research brief is organised as
 * definition and scope, history, global market, Vietnam market and drivers.
 */
const LESSON_KEYS = [
  'What the Industry Includes',
  'How the Industry Evolved',
  'How the Global Market Is Structured',
  'How the Vietnam Market Works',
  'What Drives Industry Change',
];

const BUNDLES = [LESSON_ENT_1, LESSON_ENT_2, LESSON_ENT_3, LESSON_ENT_4, LESSON_ENT_5];

export const ENT_MODULE01_DECKS: Record<string, EntM1CardData[]> = {};
export const ENT_MODULE01_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ENT_MODULE01_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  ENT_MODULE01_DECKS[key] = bundle.deck;
  ENT_MODULE01_QUIZZES[key] = bundle.quiz;
  ENT_MODULE01_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(ENT_MODULE01_DECKS, ENT_M1_VISUALS);

export function isEntModule01VisualKind(value: string): value is EntModule01VisualKind {
  return value.startsWith('ent-m1-');
}
