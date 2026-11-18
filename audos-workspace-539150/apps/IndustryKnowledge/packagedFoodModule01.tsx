import { PACKAGED_FOOD_M1_LESSON1_DECK, PACKAGED_FOOD_M1_LESSON1_QUIZ, PACKAGED_FOOD_M1_LESSON1_TAKEAWAYS } from './packagedFoodM1Lesson1';
import { PACKAGED_FOOD_M1_LESSON2_DECK, PACKAGED_FOOD_M1_LESSON2_QUIZ, PACKAGED_FOOD_M1_LESSON2_TAKEAWAYS } from './packagedFoodM1Lesson2';
import { PACKAGED_FOOD_M1_LESSON3_DECK, PACKAGED_FOOD_M1_LESSON3_QUIZ, PACKAGED_FOOD_M1_LESSON3_TAKEAWAYS } from './packagedFoodM1Lesson3';
import { PACKAGED_FOOD_M1_LESSON4_DECK, PACKAGED_FOOD_M1_LESSON4_QUIZ, PACKAGED_FOOD_M1_LESSON4_TAKEAWAYS } from './packagedFoodM1Lesson4';
import { PACKAGED_FOOD_M1_LESSON5_DECK, PACKAGED_FOOD_M1_LESSON5_QUIZ, PACKAGED_FOOD_M1_LESSON5_TAKEAWAYS } from './packagedFoodM1Lesson5';
import { VisualView } from './fashionVisualKit';
import { PACKAGED_FOOD_M1_VISUALS } from './packagedFoodM1VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { PackagedFoodCardData, PackagedFoodQuestion, PackagedFoodTakeaways, PackagedFoodVisualKind } from './packagedFoodM1Core';

export type { PackagedFoodVisualKind } from './packagedFoodM1Core';

export const PACKAGED_FOOD_MODULE01_DECKS: Record<string, PackagedFoodCardData[]> = {
  'What the Industry Includes': PACKAGED_FOOD_M1_LESSON1_DECK,
  'How the Industry Evolved': PACKAGED_FOOD_M1_LESSON2_DECK,
  'How the Global Market Is Structured': PACKAGED_FOOD_M1_LESSON3_DECK,
  'How the Vietnam Market Works': PACKAGED_FOOD_M1_LESSON4_DECK,
  'What Drives Industry Change': PACKAGED_FOOD_M1_LESSON5_DECK,
};
applyChapterVisualText(PACKAGED_FOOD_MODULE01_DECKS, PACKAGED_FOOD_M1_VISUALS);

export const PACKAGED_FOOD_MODULE01_QUIZZES: Record<string, PackagedFoodQuestion[]> = {
  'What the Industry Includes': PACKAGED_FOOD_M1_LESSON1_QUIZ,
  'How the Industry Evolved': PACKAGED_FOOD_M1_LESSON2_QUIZ,
  'How the Global Market Is Structured': PACKAGED_FOOD_M1_LESSON3_QUIZ,
  'How the Vietnam Market Works': PACKAGED_FOOD_M1_LESSON4_QUIZ,
  'What Drives Industry Change': PACKAGED_FOOD_M1_LESSON5_QUIZ,
};

export const PACKAGED_FOOD_MODULE01_TAKEAWAYS: Record<string, PackagedFoodTakeaways> = {
  'What the Industry Includes': PACKAGED_FOOD_M1_LESSON1_TAKEAWAYS,
  'How the Industry Evolved': PACKAGED_FOOD_M1_LESSON2_TAKEAWAYS,
  'How the Global Market Is Structured': PACKAGED_FOOD_M1_LESSON3_TAKEAWAYS,
  'How the Vietnam Market Works': PACKAGED_FOOD_M1_LESSON4_TAKEAWAYS,
  'What Drives Industry Change': PACKAGED_FOOD_M1_LESSON5_TAKEAWAYS,
};

export function renderPackagedFoodModule01Visual(kind: PackagedFoodVisualKind | string) {
  const visual = PACKAGED_FOOD_M1_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
