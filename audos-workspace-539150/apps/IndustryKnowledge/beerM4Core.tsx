import type { ReactNode } from 'react';
import { pairedQuiz } from './dairyQuizCore';
import type { DairyQuizSeed } from './dairyQuizCore';

export type BeerModule04VisualKind = `beer-m4-${string}`;
export interface BeerM4Source { title: string; href: string; publisher: string; note?: string }
export interface BeerM4Narrative { label: 'What it is' | 'How it works' | 'Global example' | 'Vietnam example' | 'Why it matters commercially'; text: string }
export interface BeerM4CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: BeerM4Narrative[];
  visualKind: BeerModule04VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: BeerM4Source[];
}
export interface BeerM4Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface BeerM4Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
export interface BeerM4LessonBundle { deck: BeerM4CardData[]; quiz: BeerM4Question[]; takeaways: BeerM4Takeaways }

export const BEER_M4_SOURCES = {
  kirin2024: { title: 'Global Beer Consumption by Country in 2024', href: 'https://www.kirinholdings.com/en/newsroom/release/2025/1222_01.html', publisher: 'Kirin Holdings', note: 'Brewer-compiled global tracker; 2024 consumption.' },
  vietnamTax: { title: 'Vietnam Approves 90 Percent Tax Rate on Beer, Strong Alcohol by 2031', href: 'https://cambodianess.com/article/vietnam-approves-90-percent-tax-rate-on-beer-strong-alcohol-by-2031', publisher: 'Agence France-Presse via Cambodianess', note: 'Reports the June 2025 National Assembly vote (Law 66/2025/QH15).' },
  vietnamDownturn: { title: 'Craft brews still shine in Vietnam’s gloomy beer market', href: 'https://asiabrewersnetwork.com/news/craft-brews-still-shine-in-vietnams-gloomy-beer-market', publisher: 'Asia Brewers Network', note: 'Trade-press reporting of 2023 company results; reporting periods differ by company.' },
  sabecoAcquisition: { title: 'Vietnam’s largest brewer a foreign owned business now', href: 'https://e.vnexpress.net/news/business/companies/vietnam-s-largest-brewer-a-foreign-owned-business-now-3864025.html', publisher: 'VnExpress International', note: 'Historical December 2017 transaction.' },
  vietnamMarket: { title: 'Vietnam Beer Market Set to Reach Valuation of US$14.85 Billion By 2033', href: 'https://finance.yahoo.com/news/vietnam-beer-market-set-reach-163000017.html', publisher: 'Astute Analytica press release via Yahoo Finance', note: 'Commercial market-research estimate; not official statistics.' },
  whoGlobal: { title: 'Over 3 million annual deaths due to alcohol and drug use', href: 'https://www.who.int/news/item/25-06-2024-over-3-million-annual-deaths-due-to-alcohol-and-drug-use-majority-among-men', publisher: 'World Health Organization', note: 'Global per-capita consumption trend uses 2019 data.' },
  choicesUs: { title: 'From Juice to Beer: How Far Will the Local Movement Go?', href: 'https://www.choicesmagazine.org/choices-magazine/submitted-articles/from-juice-to-beer-how-far-will-the-local-movement-go', publisher: 'Choices Magazine, Agricultural & Applied Economics Association', note: 'US-focused 2025 academic analysis; not a global or Vietnam structure.' },
  heineken2024: { title: 'Heineken N.V. Reports 2024 Full Year Results', href: 'https://www.jamessharp.co.uk/market-news/heineken-n-v-reports-2024-full-year-results/', publisher: 'Heineken results reproduced by James Sharp & Co', note: 'FY2024 company results.' },
  sabeco2023: { title: 'SABECO honoured in Fortune Southeast Asia 500 list', href: 'https://english.vov.vn/en/economy/sabeco-honoured-in-fortune-southeast-asia-500-list-post1102895.vov', publisher: 'Voice of Vietnam', note: 'Reports Sabeco FY2023 results and network (21 June 2024).' },
  europeBeer: { title: 'Non-alcoholic beer sector in ascendancy across Europe', href: 'https://www.brewersjournal.info/non-alcoholic-beer-sector-in-ascendancy-across-europe/', publisher: 'Brewers of Europe data reported by The Brewers Journal', note: 'Europe-only trade-body data.' },
  diageo2026: { title: 'Diageo — Preliminary Results, Year Ended 30 June 2026', href: 'https://www.jamessharp.co.uk/market-news/diageo-preliminary-results/', publisher: 'Diageo results reproduced by James Sharp & Co', note: 'Fiscal year ends 30 June.' },
  pernod2025: { title: 'Pernod Ricard: FY25 Full-Year Sales and Results', href: 'https://www.nasdaq.com/press-release/pernod-ricard-steering-through-challenging-environment-agility-discipline-and', publisher: 'Pernod Ricard release via Nasdaq', note: 'Fiscal year ended 30 June 2025.' },
  rtd: { title: 'RTD Market 2026 Forecast and Trends', href: 'https://www.ohbev.com/blog/rtd-market-2024-comprehensive-overview', publisher: 'OhBEV compiling IWSR and NielsenIQ data', note: 'Commercial compilation; geography and periods are not fully specified for every figure.' },
  barthhaas: { title: 'Brewing groups dominate international beer market', href: 'https://brauwelt.com/en/topics/market/645775-brewing-groups-dominate-international-beer-market', publisher: 'BarthHaas Report 2022/2023 reported by Brauwelt International', note: '2022 output of the top-40 brewing groups; trade-press report.' },
  abinbev2024: { title: 'Anheuser-Busch InBev finishes with a flourish in 2024', href: 'https://drinks-intel.com/subscriber-news/anheuser-busch-inbev-finishes-with-a-flourish-in-2024-results-data/', publisher: 'Global Drinks Intel', note: 'Trade-press reporting of AB InBev FY2024 results.' },
  carlsberg2026: { title: 'Carlsberg A/S — Solid top-line development and earnings growth (H1 2026)', href: 'https://via.ritzau.dk/announcement/15098999?publisherId=13560234&lang=en', publisher: 'Carlsberg A/S via Via Ritzau', note: 'Half-year statement as at 30 June 2026; also cites FY2025 operating profit.' },
} satisfies Record<string, BeerM4Source>;
export type BeerM4SourceId = keyof typeof BEER_M4_SOURCES;
export const citeM4 = (...ids: BeerM4SourceId[]): BeerM4Source[] => ids.map((id) => BEER_M4_SOURCES[id]);

export function M4DeepDive({ paragraphs, evidence }: { paragraphs: string[]; evidence?: string }) {
  return <div className="space-y-4">{paragraphs.map((p) => <p key={p}>{p}</p>)}{evidence ? <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600"><strong className="text-slate-800">Evidence note: </strong>{evidence}</p> : null}</div>;
}
export function m4Chapter(input: Omit<BeerM4CardData, 'concepts'>): BeerM4CardData { return { ...input, concepts: [] }; }
export function m4Quiz(prefix: string, seeds: DairyQuizSeed[]): BeerM4Question[] { return pairedQuiz(prefix, seeds) as BeerM4Question[]; }
