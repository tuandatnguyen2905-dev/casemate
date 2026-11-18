import type { ReactNode } from 'react';
import { pairedQuiz } from './dairyQuizCore';
import type { DairyQuizSeed } from './dairyQuizCore';

export type BeerModule02VisualKind = `beer-m2-${string}`;
export interface BeerM2Source { title: string; href: string; publisher: string }
export interface BeerM2Narrative { label: 'What it is' | 'How it works' | 'Global example' | 'Vietnam example' | 'Why it matters commercially'; text: string }
export interface BeerM2CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: BeerM2Narrative[];
  visualKind: BeerModule02VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: BeerM2Source[];
}
export interface BeerM2Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface BeerM2Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
export interface BeerM2LessonBundle { deck: BeerM2CardData[]; quiz: BeerM2Question[]; takeaways: BeerM2Takeaways }

export const BEER_M2_SOURCES = {
  s1: { title: 'Global Beer Consumption by Country in 2024', href: 'https://www.kirinholdings.com/en/newsroom/release/2025/1222_01.html', publisher: 'Kirin Holdings (brewer-compiled industry tracker)' },
  s3: { title: 'Vietnam Approves 90 Percent Tax Rate on Beer, Strong Alcohol by 2031', href: 'https://cambodianess.com/article/vietnam-approves-90-percent-tax-rate-on-beer-strong-alcohol-by-2031', publisher: 'Agence France-Presse via Cambodianess (reporting Law 66/2025/QH15)' },
  s6: { title: 'Vietnam Beer Market Set to Reach Valuation of US$14.85 Billion By 2033', href: 'https://finance.yahoo.com/news/vietnam-beer-market-set-reach-163000017.html', publisher: 'Astute Analytica press release (commercial estimates, not official statistics)' },
  s8: { title: 'Over 3 million annual deaths due to alcohol and drug use', href: 'https://www.who.int/news/item/25-06-2024-over-3-million-annual-deaths-due-to-alcohol-and-drug-use-majority-among-men', publisher: 'World Health Organization (official)' },
  s10: { title: 'Wine Industry Faces Shrinking Vineyards, Low Production And Consumption', href: 'https://www.esmmagazine.com/drinks/wine-industry-faces-shrinking-vineyards-low-production-and-consumption-oiv-311921', publisher: 'OIV annual data reported by ESM Magazine' },
  s11: { title: 'Vietnam opens new malt factory to supply Heineken and Carlsberg', href: 'https://fooddigital.com/drink/vietnam-opens-new-malt-factory-supply-heineken-and-carlsberg-processed-australian-grain', publisher: 'Food & Drink Digital (trade press, 2020)' },
  s12: { title: 'From Juice to Beer: How Far Will the Local Movement Go?', href: 'https://www.choicesmagazine.org/choices-magazine/submitted-articles/from-juice-to-beer-how-far-will-the-local-movement-go', publisher: 'Choices Magazine, AAEA (peer-reviewed, 2025)' },
  s13: { title: 'Heineken N.V. Reports 2024 Full Year Results', href: 'https://www.jamessharp.co.uk/market-news/heineken-n-v-reports-2024-full-year-results/', publisher: 'Heineken audited results reproduced by James Sharp & Co' },
  s14: { title: 'SABECO honoured in Fortune Southeast Asia 500 list', href: 'https://english.vov.vn/en/economy/sabeco-honoured-in-fortune-southeast-asia-500-list-post1102895.vov', publisher: 'Voice of Vietnam (state broadcaster)' },
  s15: { title: 'Non-alcoholic beer sector in ascendancy across Europe', href: 'https://www.brewersjournal.info/non-alcoholic-beer-sector-in-ascendancy-across-europe/', publisher: 'The Brewers Journal reporting Brewers of Europe data' },
  s16: { title: 'The Role of Aging in Spirits', href: 'https://pambos.wine/aging-in-spirits/', publisher: 'Pambos (secondary source; maturation thresholds illustrative)' },
} satisfies Record<string, BeerM2Source>;
export type BeerM2SourceId = keyof typeof BEER_M2_SOURCES;
export const citeM2 = (...ids: BeerM2SourceId[]): BeerM2Source[] => ids.map((id) => BEER_M2_SOURCES[id]);

export function M2DeepDive({ paragraphs, evidence }: { paragraphs: string[]; evidence?: string }) {
  return <div className="space-y-4">{paragraphs.map((p) => <p key={p}>{p}</p>)}{evidence ? <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600"><strong className="text-slate-800">Evidence note: </strong>{evidence}</p> : null}</div>;
}

export function m2Chapter(input: Omit<BeerM2CardData, 'concepts'>): BeerM2CardData { return { ...input, concepts: [] }; }

export function m2Quiz(prefix: string, seeds: DairyQuizSeed[]): BeerM2Question[] {
  return pairedQuiz(prefix, seeds) as BeerM2Question[];
}
