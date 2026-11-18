import { LESSON_ENT5_1 } from './entM5Lesson1';
import { LESSON_ENT5_2 } from './entM5Lesson2';
import { LESSON_ENT5_3 } from './entM5Lesson3';
import { LESSON_ENT5_4 } from './entM5Lesson4';
import { LESSON_ENT5_5 } from './entM5Lesson5';
import { renderEntModule05Visual } from './entM5Visuals';
import { ENT_M5_VISUALS } from './entM5VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { EntM5CardData, EntModule05VisualKind } from './entM5Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { EntModule05VisualKind } from './entM5Core';
export { renderEntModule05Visual };

/** Keys are the Module 05 lesson titles in RETAIL_MODULE_BLUEPRINT, which the technology sectors use unchanged. */
const LESSON_KEYS = [
  'Consumer Trends',
  'Technology & Innovation Trends',
  'Market & Channel Trends',
  'Regulatory & Sustainability Trends',
  'Growth Outlook & Strategic Opportunities',
];

const BUNDLES = [LESSON_ENT5_1, LESSON_ENT5_2, LESSON_ENT5_3, LESSON_ENT5_4, LESSON_ENT5_5];

export const ENT_MODULE05_DECKS: Record<string, EntM5CardData[]> = {};
export const ENT_MODULE05_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ENT_MODULE05_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  ENT_MODULE05_DECKS[key] = bundle.deck;
  ENT_MODULE05_QUIZZES[key] = bundle.quiz;
  ENT_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(ENT_MODULE05_DECKS, ENT_M5_VISUALS);

export function isEntModule05VisualKind(value: string): value is EntModule05VisualKind {
  return value.startsWith('ent-m5-');
}
