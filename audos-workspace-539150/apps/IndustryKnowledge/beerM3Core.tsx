import type { ReactNode } from 'react';
import { pairedQuiz } from './dairyQuizCore';
import type { DairyQuizSeed } from './dairyQuizCore';

export type BeerModule03VisualKind = `beer-m3-${string}`;
export interface BeerM3Source { title: string; href: string; publisher: string; note?: string }
export interface BeerM3Narrative { label: 'What it is' | 'How it works' | 'Global example' | 'Vietnam example' | 'Why it matters commercially'; text: string }
export interface BeerM3CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: BeerM3Narrative[];
  visualKind: BeerModule03VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: BeerM3Source[];
}
export interface BeerM3Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface BeerM3Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
export interface BeerM3LessonBundle { deck: BeerM3CardData[]; quiz: BeerM3Question[]; takeaways: BeerM3Takeaways }

export const BEER_M3_SOURCES = {
  kirin2024: { title: 'Global Beer Consumption by Country in 2024', href: 'https://www.kirinholdings.com/en/newsroom/release/2025/1222_01.html', publisher: 'Kirin Holdings', note: 'Brewer-compiled global tracker.' },
  vietnamTax: { title: 'Vietnam Approves 90 Percent Tax Rate on Beer, Strong Alcohol by 2031', href: 'https://cambodianess.com/article/vietnam-approves-90-percent-tax-rate-on-beer-strong-alcohol-by-2031', publisher: 'Agence France-Presse via Cambodianess', note: 'Reports Law 66/2025/QH15.' },
  vietnamDownturn: { title: 'Craft brews still shine in Vietnam’s gloomy beer market', href: 'https://asiabrewersnetwork.com/news/craft-brews-still-shine-in-vietnams-gloomy-beer-market', publisher: 'Asia Brewers Network', note: 'Trade reporting on nine months of 2023.' },
  sabecoAcquisition: { title: 'Vietnam’s largest brewer a foreign owned business now', href: 'https://e.vnexpress.net/news/business/companies/vietnam-s-largest-brewer-a-foreign-owned-business-now-3864025.html', publisher: 'VnExpress International', note: 'Historical 2017 transaction.' },
  vietnamMarket: { title: 'Vietnam Beer Market Set to Reach Valuation of US$14.85 Billion By 2033', href: 'https://finance.yahoo.com/news/vietnam-beer-market-set-reach-163000017.html', publisher: 'Astute Analytica press release via Yahoo Finance', note: 'Commercial estimates; not official statistics.' },
  whoFact: { title: 'Alcohol — WHO Fact Sheet', href: 'https://www.who.int/news-room/fact-sheets/detail/alcohol', publisher: 'World Health Organization' },
  whoGlobal: { title: 'Over 3 million annual deaths due to alcohol and drug use', href: 'https://www.who.int/news/item/25-06-2024-over-3-million-annual-deaths-due-to-alcohol-and-drug-use-majority-among-men', publisher: 'World Health Organization', note: 'Global consumption and health outcomes use 2019 data.' },
  oiv2025: { title: 'Wine Industry Faces Shrinking Vineyards, Low Production And Consumption', href: 'https://www.esmmagazine.com/drinks/wine-industry-faces-shrinking-vineyards-low-production-and-consumption-oiv-311921', publisher: 'OIV data reported by ESM Magazine' },
  intermalt: { title: 'Vietnam opens new malt factory to supply Heineken and Carlsberg', href: 'https://fooddigital.com/drink/vietnam-opens-new-malt-factory-supply-heineken-and-carlsberg-processed-australian-grain', publisher: 'Food & Drink Digital', note: '2020 trade reporting and company-reported footprint.' },
  choicesHops: { title: 'From Juice to Beer: How Far Will the Local Movement Go?', href: 'https://www.choicesmagazine.org/choices-magazine/submitted-articles/from-juice-to-beer-how-far-will-the-local-movement-go', publisher: 'Choices Magazine, Agricultural & Applied Economics Association', note: 'US-focused 2025 academic analysis.' },
  heineken2024: { title: 'Heineken N.V. Reports 2024 Full Year Results', href: 'https://www.jamessharp.co.uk/market-news/heineken-n-v-reports-2024-full-year-results/', publisher: 'Heineken results reproduced by James Sharp & Co' },
  sabeco2023: { title: 'SABECO honoured in Fortune Southeast Asia 500 list', href: 'https://english.vov.vn/en/economy/sabeco-honoured-in-fortune-southeast-asia-500-list-post1102895.vov', publisher: 'Voice of Vietnam', note: 'Reports Sabeco FY2023 results and network.' },
  europeBeer: { title: 'Non-alcoholic beer sector in ascendancy across Europe', href: 'https://www.brewersjournal.info/non-alcoholic-beer-sector-in-ascendancy-across-europe/', publisher: 'Brewers of Europe data reported by The Brewers Journal' },
  spiritsAging: { title: 'The Role of Aging in Spirits', href: 'https://pambos.wine/aging-in-spirits/', publisher: 'Pambos', note: 'Secondary explainer; regulatory-age examples only.' },
  diageo2026: { title: 'Diageo — Preliminary Results, Year Ended 30 June 2026', href: 'https://www.jamessharp.co.uk/market-news/diageo-preliminary-results/', publisher: 'Diageo results reproduced by James Sharp & Co' },
  pernod2025: { title: 'Pernod Ricard: FY25 Full-Year Sales and Results', href: 'https://www.nasdaq.com/press-release/pernod-ricard-steering-through-challenging-environment-agility-discipline-and', publisher: 'Pernod Ricard release via Nasdaq' },
  rtd2024: { title: 'RTD Market 2026 Forecast and Trends', href: 'https://www.ohbev.com/blog/rtd-market-2024-comprehensive-overview', publisher: 'OhBEV', note: 'Commercial compilation; underlying geography and periods are unclear for several figures.' },
} satisfies Record<string, BeerM3Source>;
export type BeerM3SourceId = keyof typeof BEER_M3_SOURCES;
export const citeM3 = (...ids: BeerM3SourceId[]): BeerM3Source[] => ids.map((id) => BEER_M3_SOURCES[id]);

export function M3DeepDive({ paragraphs, evidence }: { paragraphs: string[]; evidence?: string }) {
  return <div className="space-y-4">{paragraphs.map((p) => <p key={p}>{p}</p>)}{evidence ? <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600"><strong className="text-slate-800">Evidence note: </strong>{evidence}</p> : null}</div>;
}
export function m3Chapter(input: Omit<BeerM3CardData, 'concepts'>): BeerM3CardData { return { ...input, concepts: [] }; }
export function m3Quiz(prefix: string, seeds: DairyQuizSeed[]): BeerM3Question[] { return pairedQuiz(prefix, seeds) as BeerM3Question[]; }
