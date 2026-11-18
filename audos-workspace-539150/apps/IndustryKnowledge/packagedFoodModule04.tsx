import { PACKAGED_FOOD_M4_CONTENT, PACKAGED_FOOD_M4_SOURCES } from './packagedFoodM4Content';
import { PACKAGED_FOOD_M4_QUIZ_SEEDS } from './packagedFoodM4Quiz';
import { buildPfM45Module, validatePfM45Module } from './packagedFoodM45Core';
import { renderPackagedFoodM4Visual } from './packagedFoodM4Visuals';
import { PACKAGED_FOOD_M4_VISUALS } from './packagedFoodM4VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';

export const PACKAGED_FOOD_MODULE04_LESSONS = PACKAGED_FOOD_M4_CONTENT.map(({ title, description }) => ({ title, description }));
const lessonSpecs = PACKAGED_FOOD_M4_CONTENT.map((lesson) => ({ ...lesson, quizSeeds: PACKAGED_FOOD_M4_QUIZ_SEEDS[lesson.title] }));
const built = buildPfM45Module('04', lessonSpecs, PACKAGED_FOOD_M4_SOURCES);
export const PACKAGED_FOOD_MODULE04_QA = validatePfM45Module('04', lessonSpecs, PACKAGED_FOOD_M4_SOURCES, built);
export const PACKAGED_FOOD_MODULE04_DECKS = built.decks;
applyChapterVisualText(PACKAGED_FOOD_MODULE04_DECKS, PACKAGED_FOOD_M4_VISUALS);
export const PACKAGED_FOOD_MODULE04_QUIZZES = built.quizzes;
export const PACKAGED_FOOD_MODULE04_TAKEAWAYS = built.takeaways;
export { renderPackagedFoodM4Visual };
export function isPackagedFoodM4VisualKind(value: string) { return value.startsWith('packaged-food-m4-'); }
