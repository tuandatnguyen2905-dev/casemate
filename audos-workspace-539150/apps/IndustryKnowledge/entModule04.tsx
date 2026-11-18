import { LESSON_ENT4_1 } from './entM4Lesson1';
import { LESSON_ENT4_2 } from './entM4Lesson2';
import { LESSON_ENT4_3 } from './entM4Lesson3';
import { LESSON_ENT4_4 } from './entM4Lesson4';
import { LESSON_ENT4_5 } from './entM4Lesson5';
import { renderEntModule04Visual } from './entM4Visuals';
import { ENT_M4_VISUALS } from './entM4VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { EntM4CardData, EntModule04VisualKind } from './entM4Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { EntModule04VisualKind } from './entM4Core';
export { renderEntModule04Visual };

/** Keys are the Module 04 lesson titles in RETAIL_MODULE_BLUEPRINT, which the technology sectors use unchanged. */
const LESSON_KEYS = [
  'Industry Competition Structure',
  'Key Industry Players',
  'Competitor Benchmarking',
  'Key Success Factors',
  'SWOT & Strategic Challenges',
];

const BUNDLES = [LESSON_ENT4_1, LESSON_ENT4_2, LESSON_ENT4_3, LESSON_ENT4_4, LESSON_ENT4_5];

export const ENT_MODULE04_DECKS: Record<string, EntM4CardData[]> = {};
export const ENT_MODULE04_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ENT_MODULE04_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  ENT_MODULE04_DECKS[key] = bundle.deck;
  ENT_MODULE04_QUIZZES[key] = bundle.quiz;
  ENT_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(ENT_MODULE04_DECKS, ENT_M4_VISUALS);

export function isEntModule04VisualKind(value: string): value is EntModule04VisualKind {
  return value.startsWith('ent-m4-');
}
