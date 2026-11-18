import { LESSON_4_1 } from './beerM4Lesson1';
import { LESSON_4_2 } from './beerM4Lesson2';
import { LESSON_4_3 } from './beerM4Lesson3';
import { LESSON_4_4 } from './beerM4Lesson4';
import { LESSON_4_5 } from './beerM4Lesson5';
import { renderBeerModule04Visual } from './beerM4Visuals';
import type { BeerM4CardData, BeerM4Question, BeerM4Takeaways, BeerModule04VisualKind } from './beerM4Core';
import { applyChapterVisualText } from './chapterVisualText';
import { BEER_M4_VISUALS } from './beerM4VisualSpecs';

export type { BeerModule04VisualKind } from './beerM4Core';
export { renderBeerModule04Visual };

export const BEER_MODULE04_LESSONS = [
  { title: 'Industry Competition Structure', description: 'Read concentration, apply the Five Forces to beer, wine and spirits, and explain the barriers that protect incumbents.', takeaways: ['Structure shapes how rivals compete.', 'The State acts across all five forces.', 'Brand and distribution are the hardest barriers to buy.'] },
  { title: 'Key Industry Players', description: 'Identify global beer and spirits leaders, profile the four Vietnam beer groups and read value and volume share correctly.', takeaways: ['Name the league before naming the leader.', 'Ownership, brand and local operation are separate facts.', 'Share needs a stated basis.'] },
  { title: 'Competitor Benchmarking', description: 'Normalise currency, year and revenue basis, compare brands and distribution with evidence levels, and state strengths and weaknesses with confidence.', takeaways: ['Normalise first, compare second.', 'Show evidence gaps instead of filling them.', 'Strengths are interpretations tied to evidence.'] },
  { title: 'Key Success Factors', description: 'Link brand equity, reach, scale, portfolio, operations and regulatory capability to the outcomes that explain why companies win.', takeaways: ['Brand turns trust into pricing power.', 'Reach and scale reinforce each other.', 'The factors compound.'] },
  { title: 'SWOT & Strategic Challenges', description: 'Build an industry SWOT, compare global and Vietnam pressures and connect each challenge to a strategic response.', takeaways: ['SWOT sorting is analysis.', 'Threats act through demand and margin.', 'Defend value, not volume.'] },
];

const BUNDLES = [LESSON_4_1, LESSON_4_2, LESSON_4_3, LESSON_4_4, LESSON_4_5];
export const BEER_MODULE04_DECKS: Record<string, BeerM4CardData[]> = {};
export const BEER_MODULE04_QUIZZES: Record<string, BeerM4Question[]> = {};
export const BEER_MODULE04_TAKEAWAYS: Record<string, BeerM4Takeaways> = {};
BUNDLES.forEach((bundle, index) => {
  const key = BEER_MODULE04_LESSONS[index].title;
  BEER_MODULE04_DECKS[key] = bundle.deck;
  BEER_MODULE04_QUIZZES[key] = bundle.quiz;
  BEER_MODULE04_TAKEAWAYS[key] = bundle.takeaways;
});
applyChapterVisualText(BEER_MODULE04_DECKS, BEER_M4_VISUALS);

export function isBeerModule04VisualKind(value: string): value is BeerModule04VisualKind { return value.startsWith('beer-m4-'); }
