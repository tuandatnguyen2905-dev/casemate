import { LESSON_5_1 } from './beerM5Lesson1';
import { LESSON_5_2 } from './beerM5Lesson2';
import { LESSON_5_3 } from './beerM5Lesson3';
import { LESSON_5_4 } from './beerM5Lesson4';
import { LESSON_5_5 } from './beerM5Lesson5';
import { renderBeerModule05Visual } from './beerM5Visuals';
import { BEER_M5_VISUALS } from './beerM5VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';
import type { BeerM5CardData, BeerM5Question, BeerM5Takeaways, BeerModule05VisualKind } from './beerM5Core';

export type { BeerModule05VisualKind } from './beerM5Core';
export { renderBeerModule05Visual };

export const BEER_MODULE05_LESSONS = [
  { title: 'Consumer Trends', description: 'Compare global moderation with Vietnam’s beer-led starting point, then connect premium, no/low and changing occasions to business choices.', takeaways: ['Volume and value are different measures.', 'Moderation and premiumisation can coexist.', 'Vietnam combines aspiration with enforcement-led caution.'] },
  { title: 'Technology & Innovation Trends', description: 'Structure product innovation and link production, digital and AI technologies to decisions, evidence and regulated-category controls.', takeaways: ['Innovation starts with an occasion or operating loss.', 'Technology must improve a measured outcome.', 'AI needs human accountability and guardrails.'] },
  { title: 'Market & Channel Trends', description: 'Decompose value-led growth, assign roles to on-trade, off-trade and digital channels, and design connected distribution.', takeaways: ['Explain value with a growth bridge.', 'Follow the occasion into the channel.', 'Connect sell-out, stock, route economics and compliance.'] },
  { title: 'Regulatory & Sustainability Trends', description: 'Read Vietnam’s enacted laws and dates accurately, assess water and circular packaging, and operationalise ESG and compliance.', takeaways: ['Separate enactment, effectiveness and interpretation.', 'Beer and lower-strength alcohol follow different tax paths.', 'Commitments are not achievements.'] },
  { title: 'Growth Outlook & Strategic Opportunities', description: 'Qualify forecasts, screen emerging segments and turn opportunities and risks into measurable, adaptable strategy.', takeaways: ['Forecasts are conditional.', 'Attractiveness needs a right to win.', 'Every bet needs indicators and a contingency.'] },
];

const BUNDLES = [LESSON_5_1, LESSON_5_2, LESSON_5_3, LESSON_5_4, LESSON_5_5];
export const BEER_MODULE05_DECKS: Record<string, BeerM5CardData[]> = {};
export const BEER_MODULE05_QUIZZES: Record<string, BeerM5Question[]> = {};
export const BEER_MODULE05_TAKEAWAYS: Record<string, BeerM5Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = BEER_MODULE05_LESSONS[index].title;
  BEER_MODULE05_DECKS[key] = bundle.deck;
  BEER_MODULE05_QUIZZES[key] = bundle.quiz;
  BEER_MODULE05_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(BEER_MODULE05_DECKS, BEER_M5_VISUALS);

export function isBeerModule05VisualKind(value: string): value is BeerModule05VisualKind { return value.startsWith('beer-m5-'); }
