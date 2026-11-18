import { LESSON_3_1 } from './beerM3Lesson1';
import { LESSON_3_2 } from './beerM3Lesson2';
import { LESSON_3_3 } from './beerM3Lesson3';
import { LESSON_3_4 } from './beerM3Lesson4';
import { LESSON_3_5 } from './beerM3Lesson5';
import { LESSON_3_6 } from './beerM3Lesson6';
import { renderBeerModule03Visual } from './beerM3Visuals';
import { BEER_M3_VISUALS } from './beerM3VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { BeerM3CardData, BeerM3Question, BeerM3Takeaways, BeerModule03VisualKind } from './beerM3Core';

export type { BeerModule03VisualKind } from './beerM3Core';
export { renderBeerModule03Visual };

export const BEER_MODULE03_LESSONS = [
  { title: 'Industry Business Models', description: 'Compare integrated and specialised models, brand ownership, licensing, contract production and the different economic clocks of beer, wine and spirits.', takeaways: ['Brand, production and distribution ownership are separate choices.', 'Integration trades capital for control.', 'Compare only clearly defined margin metrics.'] },
  { title: 'Products, Services & Segmentation', description: 'Distinguish beer, wine, spirits and RTDs; build responsible price and occasion segments; connect differentiation to pricing.', takeaways: ['Category combines production, law and experience.', 'Tiers are relative to market and category.', 'Premiumisation means value mix, not more consumption.'] },
  { title: 'Customer Segments & Needs', description: 'Segment responsible adult demand by need and occasion, diagnose purchase drivers and examine Vietnam channel behaviour.', takeaways: ['Occasion shapes the choice set.', 'Trade and consumer propositions must both work.', 'Local evidence beats demographic stereotypes.'] },
  { title: 'Revenue Streams & Cost Structure', description: 'Build revenue and cost bridges, place excise correctly and connect operating levers to clearly defined profitability metrics.', takeaways: ['Volume, realised price and mix drive revenue.', 'Excise is not factory cost.', 'Gross, operating and net margins are different.'] },
  { title: 'Distribution & Sales Channels', description: 'Compare on- and off-trade, map Vietnam routes and evaluate channel economics through service, cost and working capital.', takeaways: ['On-trade and off-trade sell different value bundles.', 'Distribution combines stock, credit and routes.', 'Never infer margins from consumer prices.'] },
  { title: 'Industry Ecosystem & Stakeholders', description: 'Map commercial, regulatory and social stakeholders; trace value and risk exchanges; connect partnerships to the licence to operate.', takeaways: ['The ecosystem is broader than the product chain.', 'Externalities belong in the map.', 'Regulation defines the model and partners execute it.'] },
];

const BUNDLES = [LESSON_3_1, LESSON_3_2, LESSON_3_3, LESSON_3_4, LESSON_3_5, LESSON_3_6];
export const BEER_MODULE03_DECKS: Record<string, BeerM3CardData[]> = {};
export const BEER_MODULE03_QUIZZES: Record<string, BeerM3Question[]> = {};
export const BEER_MODULE03_TAKEAWAYS: Record<string, BeerM3Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = BEER_MODULE03_LESSONS[index].title;
  BEER_MODULE03_DECKS[key] = bundle.deck;
  BEER_MODULE03_QUIZZES[key] = bundle.quiz;
  BEER_MODULE03_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(BEER_MODULE03_DECKS, BEER_M3_VISUALS);

export function isBeerModule03VisualKind(value: string): value is BeerModule03VisualKind { return value.startsWith('beer-m3-'); }
