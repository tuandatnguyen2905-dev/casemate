import { DAIRY_CONTEXT_QUIZZES, DAIRY_CONTEXT_TAKEAWAYS } from './dairyQuizContext';
import { DAIRY_VALUE_CHAIN_QUIZZES, DAIRY_VALUE_CHAIN_TAKEAWAYS } from './dairyQuizValueChain';
import { DAIRY_BUSINESS_MODEL_QUIZZES, DAIRY_BUSINESS_MODEL_TAKEAWAYS } from './dairyQuizBusinessModel';
import { DAIRY_COMPETITIVE_QUIZZES, DAIRY_COMPETITIVE_TAKEAWAYS } from './dairyQuizCompetitive';
import { DAIRY_TRENDS_QUIZZES, DAIRY_TRENDS_TAKEAWAYS } from './dairyQuizTrends';
import type { DairyLessonTakeaways, DairyQuizQuestion } from './dairyQuizCore';

export type { DairyLessonTakeaways, DairyQuizQuestion } from './dairyQuizCore';

/** Lesson titles are unique across the five dairy modules, so one flat lookup is enough. */
export const DAIRY_LESSON_QUIZZES: Record<string, DairyQuizQuestion[]> = {
  ...DAIRY_CONTEXT_QUIZZES,
  ...DAIRY_VALUE_CHAIN_QUIZZES,
  ...DAIRY_BUSINESS_MODEL_QUIZZES,
  ...DAIRY_COMPETITIVE_QUIZZES,
  ...DAIRY_TRENDS_QUIZZES,
};

export const DAIRY_LESSON_TAKEAWAYS: Record<string, DairyLessonTakeaways> = {
  ...DAIRY_CONTEXT_TAKEAWAYS,
  ...DAIRY_VALUE_CHAIN_TAKEAWAYS,
  ...DAIRY_BUSINESS_MODEL_TAKEAWAYS,
  ...DAIRY_COMPETITIVE_TAKEAWAYS,
  ...DAIRY_TRENDS_TAKEAWAYS,
};
