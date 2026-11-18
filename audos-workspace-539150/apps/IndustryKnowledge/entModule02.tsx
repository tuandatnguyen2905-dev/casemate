import { LESSON_ENT2_1 } from './entM2Lesson1';
import { LESSON_ENT2_2 } from './entM2Lesson2';
import { LESSON_ENT2_3 } from './entM2Lesson3';
import { LESSON_ENT2_4 } from './entM2Lesson4';
import { LESSON_ENT2_5 } from './entM2Lesson5';
import { LESSON_ENT2_6 } from './entM2Lesson6';
import { renderEntModule02Visual } from './entM2Visuals';
import { ENT_M2_VISUALS } from './entM2VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { EntM2CardData, EntModule02VisualKind } from './entM2Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { EntModule02VisualKind } from './entM2Core';
export { renderEntModule02Visual };

/**
 * Keys are the Module 02 lesson titles shown for the `tech-enterprise-sw` sector: the first two are the
 * RETAIL_MODULE_BLUEPRINT titles, and the last four are the technology overrides in techSectorBuilder.ts.
 * The brief’s upstream, midstream and downstream sections map to the sourcing, delivery and channels lessons.
 */
const LESSON_KEYS = [
  'Value Chain Overview',
  'Sourcing & Supplier Partnerships',
  'Delivery, Infrastructure & Operations',
  'Channels & Customer Operations',
  'Inputs, Outputs & Value Creation',
  'Global vs. Local Value Chain',
];

const BUNDLES = [LESSON_ENT2_1, LESSON_ENT2_2, LESSON_ENT2_3, LESSON_ENT2_4, LESSON_ENT2_5, LESSON_ENT2_6];

export const ENT_MODULE02_DECKS: Record<string, EntM2CardData[]> = {};
export const ENT_MODULE02_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ENT_MODULE02_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  ENT_MODULE02_DECKS[key] = bundle.deck;
  ENT_MODULE02_QUIZZES[key] = bundle.quiz;
  ENT_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(ENT_MODULE02_DECKS, ENT_M2_VISUALS);

export function isEntModule02VisualKind(value: string): value is EntModule02VisualKind {
  return value.startsWith('ent-m2-');
}
