import type { ReactNode } from 'react';
import type { BeerCardData, BeerLessonBundle, BeerQuestion, BeerTakeaways } from './beerM1Core';
import { LESSON_1_1 } from './beerM1Lesson1';
import { LESSON_1_2 } from './beerM1Lesson2';
import { LESSON_1_3 } from './beerM1Lesson3';
import { LESSON_1_4 } from './beerM1Lesson4';
import { LESSON_1_5 } from './beerM1Lesson5';
import { VisualView } from './fashionVisualKit';
import { BEER_M1_VISUALS } from './beerM1VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';

export type { BeerModule01VisualKind } from './beerM1Core';

const LESSON_KEYS = [
  'What the Industry Includes',
  'How the Industry Evolved',
  'How the Global Market Is Structured',
  'How the Vietnam Market Works',
  'What Drives Industry Change',
];

const BUNDLES: Array<BeerLessonBundle | undefined> = [LESSON_1_1, LESSON_1_2, LESSON_1_3, LESSON_1_4, LESSON_1_5];

const DECKS: Record<string, BeerCardData[]> = {};
const QUIZZES: Record<string, BeerQuestion[]> = {};
const TAKEAWAYS: Record<string, BeerTakeaways> = {};
const VISUALS: Record<string, () => ReactNode> = {};

BUNDLES.forEach((bundle, index) => {
  if (!bundle) return;
  const key = LESSON_KEYS[index];
  DECKS[key] = bundle.deck;
  QUIZZES[key] = bundle.quiz;
  TAKEAWAYS[key] = bundle.takeaways;
  Object.assign(VISUALS, bundle.visuals);
});

export const BEER_MODULE01_DECKS = DECKS;
export const BEER_MODULE01_QUIZZES = QUIZZES;
export const BEER_MODULE01_TAKEAWAYS = TAKEAWAYS;
applyChapterVisualText(BEER_MODULE01_DECKS, BEER_M1_VISUALS);

export function renderBeerModule01Visual(kind: string): ReactNode {
  const visual = BEER_M1_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
