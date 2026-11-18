import { PACKAGED_FOOD_M2_LESSON1_DECK, PACKAGED_FOOD_M2_LESSON1_QUIZ, PACKAGED_FOOD_M2_LESSON1_TAKEAWAYS } from './packagedFoodM2Lesson1';
import { PACKAGED_FOOD_M2_LESSON2_DECK, PACKAGED_FOOD_M2_LESSON2_QUIZ, PACKAGED_FOOD_M2_LESSON2_TAKEAWAYS } from './packagedFoodM2Lesson2';
import { PACKAGED_FOOD_M2_LESSON3_DECK, PACKAGED_FOOD_M2_LESSON3_QUIZ, PACKAGED_FOOD_M2_LESSON3_TAKEAWAYS } from './packagedFoodM2Lesson3';
import { PACKAGED_FOOD_M2_LESSON4 } from './packagedFoodM2Lesson4';
import { PACKAGED_FOOD_M2_LESSON5 } from './packagedFoodM2Lesson5';
import { PACKAGED_FOOD_M2_LESSON6 } from './packagedFoodM2Lesson6';
import { renderPackagedFoodM2Visual } from './packagedFoodM2Visuals';
import { PACKAGED_FOOD_M2_VISUALS } from './packagedFoodM2VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PackagedFoodM2CardData, PackagedFoodM2VisualKind } from './packagedFoodM2Core';
import type { PackagedFoodQuestion, PackagedFoodTakeaways } from './packagedFoodM1Core';
export type { PackagedFoodM2VisualKind } from './packagedFoodM2Core';
export { renderPackagedFoodM2Visual };

export const PACKAGED_FOOD_MODULE02_LESSONS = [
  { title: 'Value Chain Overview', description: 'Trace raw ingredients into packaged products and follow product, money and information flows.' },
  { title: 'Upstream Activities', description: 'Understand ingredients, packaging suppliers, input costs and supply risks.' },
  { title: 'Midstream Activities', description: 'See how factories convert, test and package safe, consistent food.' },
  { title: 'Downstream Activities', description: 'Follow products through distribution, retail, marketing and execution.' },
  { title: 'Inputs, Outputs & Value Creation', description: 'Map what enters and leaves each stage and where competitive value is built.' },
  { title: 'Global vs. Local Value Chain', description: 'Compare global commodity sourcing with Vietnam-localised production and distribution.' },
];
const keys = PACKAGED_FOOD_MODULE02_LESSONS.map((lesson) => lesson.title);
const decks = [PACKAGED_FOOD_M2_LESSON1_DECK, PACKAGED_FOOD_M2_LESSON2_DECK, PACKAGED_FOOD_M2_LESSON3_DECK, PACKAGED_FOOD_M2_LESSON4.deck, PACKAGED_FOOD_M2_LESSON5.deck, PACKAGED_FOOD_M2_LESSON6.deck];
const quizzes = [PACKAGED_FOOD_M2_LESSON1_QUIZ, PACKAGED_FOOD_M2_LESSON2_QUIZ, PACKAGED_FOOD_M2_LESSON3_QUIZ, PACKAGED_FOOD_M2_LESSON4.quiz, PACKAGED_FOOD_M2_LESSON5.quiz, PACKAGED_FOOD_M2_LESSON6.quiz];
const takeaways = [PACKAGED_FOOD_M2_LESSON1_TAKEAWAYS, PACKAGED_FOOD_M2_LESSON2_TAKEAWAYS, PACKAGED_FOOD_M2_LESSON3_TAKEAWAYS, PACKAGED_FOOD_M2_LESSON4.takeaways, PACKAGED_FOOD_M2_LESSON5.takeaways, PACKAGED_FOOD_M2_LESSON6.takeaways];
export const PACKAGED_FOOD_MODULE02_DECKS: Record<string, PackagedFoodM2CardData[]> = {};
export const PACKAGED_FOOD_MODULE02_QUIZZES: Record<string, PackagedFoodQuestion[]> = {};
export const PACKAGED_FOOD_MODULE02_TAKEAWAYS: Record<string, PackagedFoodTakeaways> = {};
keys.forEach((key, i) => { PACKAGED_FOOD_MODULE02_DECKS[key] = decks[i]; PACKAGED_FOOD_MODULE02_QUIZZES[key] = quizzes[i]; PACKAGED_FOOD_MODULE02_TAKEAWAYS[key] = takeaways[i]; });
applyChapterVisualText(PACKAGED_FOOD_MODULE02_DECKS, PACKAGED_FOOD_M2_VISUALS);
export function isPackagedFoodM2VisualKind(value: string): value is PackagedFoodM2VisualKind { return value.startsWith('packaged-food-m2-'); }
