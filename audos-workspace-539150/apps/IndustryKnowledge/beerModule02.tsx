import { LESSON_2_1 } from './beerM2Lesson1';
import { LESSON_2_2 } from './beerM2Lesson2';
import { LESSON_2_3 } from './beerM2Lesson3';
import { LESSON_2_4 } from './beerM2Lesson4';
import { LESSON_2_5 } from './beerM2Lesson5';
import { LESSON_2_6 } from './beerM2Lesson6';
import { renderBeerModule02Visual } from './beerM2Visuals';
import { BEER_M2_VISUALS } from './beerM2VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { BeerM2CardData, BeerM2Question, BeerM2Takeaways, BeerModule02VisualKind } from './beerM2Core';

export type { BeerModule02VisualKind } from './beerM2Core';
export { renderBeerModule02Visual };

export const BEER_MODULE02_LESSONS = [
  { title: 'Value Chain Overview', description: 'Map beer, wine and spirits from raw inputs to consumers, identify who creates value, and follow product, information, money and tax flows.', takeaways: ['Beer, wine and spirits share three blocks but differ at conversion.', 'Value comes from transformation, trust and access.', 'The State participates through excise and reporting.'] },
  { title: 'Upstream Activities', description: 'Understand ingredients, packaging, operating inputs, Vietnam sourcing dependencies, input costs and supply risks.', takeaways: ['Beer blends local water with globally traded inputs.', 'Packaging and plant inputs can stop production.', 'Vietnam localises malting while importing barley and hops.'] },
  { title: 'Midstream Activities', description: 'Compare production tracks, quality and packaging gates, maturation, efficiency and manufacturing economics.', takeaways: ['Fermentation is shared; distillation distinguishes spirits.', 'Quality is preventive and traceable.', 'Scale creates value only with yield, reliability and demand.'] },
  { title: 'Downstream Activities', description: 'Trace layered distribution, on-trade and off-trade channels, marketing execution and regulatory constraints.', takeaways: ['Intermediaries provide inventory, credit and reach.', 'On-trade and off-trade require different execution.', 'Commercial strategy joins preference, availability and compliance.'] },
  { title: 'Inputs, Outputs & Value Creation', description: 'Connect stage inputs and outputs to costs, tax, profit, margin definitions and competitive value.', takeaways: ['Outputs include information, by-products and waste.', 'Operating cost, excise and profit are different layers.', 'Advantage is a reinforcing capability system.'] },
  { title: 'Global vs. Local Value Chain', description: 'Compare global category logic with Vietnam’s imported upstream, local production, distribution and selective exports.', takeaways: ['Beer is commonly brewed near demand.', 'Vietnam’s local mid- and downstream remain globally exposed upstream.', 'Localisation is an activity-level decision.'] },
];

const BUNDLES = [LESSON_2_1, LESSON_2_2, LESSON_2_3, LESSON_2_4, LESSON_2_5, LESSON_2_6];
export const BEER_MODULE02_DECKS: Record<string, BeerM2CardData[]> = {};
export const BEER_MODULE02_QUIZZES: Record<string, BeerM2Question[]> = {};
export const BEER_MODULE02_TAKEAWAYS: Record<string, BeerM2Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = BEER_MODULE02_LESSONS[index].title;
  BEER_MODULE02_DECKS[key] = bundle.deck;
  BEER_MODULE02_QUIZZES[key] = bundle.quiz;
  BEER_MODULE02_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(BEER_MODULE02_DECKS, BEER_M2_VISUALS);

export function isBeerModule02VisualKind(value: string): value is BeerModule02VisualKind { return value.startsWith('beer-m2-'); }
