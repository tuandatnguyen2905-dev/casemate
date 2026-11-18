import { PACKAGED_FOOD_M5_CONTENT, PACKAGED_FOOD_M5_SOURCES } from './packagedFoodM5Content';
import { PACKAGED_FOOD_M5_QUIZ_SEEDS } from './packagedFoodM5Quiz';
import { buildPfM45Module, validatePfM45Module } from './packagedFoodM45Core';
import { renderPackagedFoodM5Visual } from './packagedFoodM5Visuals';
import { PACKAGED_FOOD_M5_VISUALS } from './packagedFoodM5VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';

export const PACKAGED_FOOD_MODULE05_LESSONS = PACKAGED_FOOD_M5_CONTENT.map(({ title, description }) => ({ title, description }));
const lessonSpecs = PACKAGED_FOOD_M5_CONTENT.map((lesson) => ({ ...lesson, quizSeeds: PACKAGED_FOOD_M5_QUIZ_SEEDS[lesson.title] }));
const built = buildPfM45Module('05', lessonSpecs, PACKAGED_FOOD_M5_SOURCES);
export const PACKAGED_FOOD_MODULE05_QA = validatePfM45Module('05', lessonSpecs, PACKAGED_FOOD_M5_SOURCES, built);
export const PACKAGED_FOOD_MODULE05_DECKS = built.decks;
applyChapterVisualText(PACKAGED_FOOD_MODULE05_DECKS, PACKAGED_FOOD_M5_VISUALS);
export const PACKAGED_FOOD_MODULE05_QUIZZES = built.quizzes;
export const PACKAGED_FOOD_MODULE05_TAKEAWAYS = built.takeaways;
export { renderPackagedFoodM5Visual };
export function isPackagedFoodM5VisualKind(value: string) { return value.startsWith('packaged-food-m5-'); }
