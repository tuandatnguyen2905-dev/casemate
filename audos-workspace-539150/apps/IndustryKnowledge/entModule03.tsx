import { LESSON_ENT3_1 } from './entM3Lesson1';
import { LESSON_ENT3_2 } from './entM3Lesson2';
import { LESSON_ENT3_3 } from './entM3Lesson3';
import { LESSON_ENT3_4 } from './entM3Lesson4';
import { LESSON_ENT3_5 } from './entM3Lesson5';
import { LESSON_ENT3_6 } from './entM3Lesson6';
import { renderEntModule03Visual } from './entM3Visuals';
import { ENT_M3_VISUALS } from './entM3VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { EntM3CardData, EntModule03VisualKind } from './entM3Core';
import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';

export type { EntModule03VisualKind } from './entM3Core';
export { renderEntModule03Visual };

/**
 * Keys are the Module 03 lesson titles shown for the `tech-enterprise-sw` sector: the first, third, fourth and
 * sixth are RETAIL_MODULE_BLUEPRINT titles, and the second and fifth are the technology overrides in
 * techSectorBuilder.ts.
 */
const LESSON_KEYS = [
  'Industry Business Models',
  'Products, Services & Segmentation',
  'Customer Segments & Needs',
  'Revenue Streams & Cost Structure',
  'Distribution & Sales Channels',
  'Industry Ecosystem & Stakeholders',
];

const BUNDLES = [LESSON_ENT3_1, LESSON_ENT3_2, LESSON_ENT3_3, LESSON_ENT3_4, LESSON_ENT3_5, LESSON_ENT3_6];

export const ENT_MODULE03_DECKS: Record<string, EntM3CardData[]> = {};
export const ENT_MODULE03_QUIZZES: Record<string, FashionM2Question[]> = {};
export const ENT_MODULE03_TAKEAWAYS: Record<string, FashionM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = LESSON_KEYS[index];
  ENT_MODULE03_DECKS[key] = bundle.deck;
  ENT_MODULE03_QUIZZES[key] = bundle.quiz;
  ENT_MODULE03_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(ENT_MODULE03_DECKS, ENT_M3_VISUALS);

export function isEntModule03VisualKind(value: string): value is EntModule03VisualKind {
  return value.startsWith('ent-m3-');
}
