import type { ReactNode } from 'react';
import { pairedQuiz } from './dairyQuizCore';
import type { DairyQuizSeed } from './dairyQuizCore';

export type BeerModule05VisualKind = `beer-m5-${string}`;
export interface BeerM5Source { title: string; href: string; publisher: string; note?: string }
export interface BeerM5Narrative { label: 'What is changing' | 'Why it is changing' | 'Global example' | 'Vietnam example' | 'How it affects businesses'; text: string }
export interface BeerM5CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: BeerM5Narrative[];
  visualKind: BeerModule05VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: BeerM5Source[];
}
export interface BeerM5Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface BeerM5Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
export interface BeerM5LessonBundle { deck: BeerM5CardData[]; quiz: BeerM5Question[]; takeaways: BeerM5Takeaways }

export const BEER_M5_SOURCES = {
  kirin2024: { title: 'Global Beer Consumption by Country in 2024', href: 'https://www.kirinholdings.com/en/newsroom/release/2025/1222_01.html', publisher: 'Kirin Holdings', note: 'Brewer-compiled tracker: about 194.12 million kl in 2024, up 0.5%.' },
  who2024: { title: 'Over 3 million annual deaths due to alcohol and drug use', href: 'https://www.who.int/news/item/25-06-2024-over-3-million-annual-deaths-due-to-alcohol-and-drug-use-majority-among-men', publisher: 'World Health Organization', note: 'Official global health source; latest comparable consumption point cited is 2019.' },
  iwsr2034: { title: 'IWSR forecasts $34bn beverage alcohol growth by 2034', href: 'https://drinksint.com/iwsr-forecasts-34bn-beverage-alcohol-growth-by-2034/', publisher: 'IWSR reported by Drinks International', note: 'Commercial forecast across key markets, not a guarantee or total-world market size.' },
  vietnamVendor: { title: 'Vietnam Beer Market Set to Reach Valuation of US$14.85 Billion By 2033', href: 'https://finance.yahoo.com/news/vietnam-beer-market-set-reach-163000017.html', publisher: 'Astute Analytica press release via Yahoo Finance', note: 'Commercial vendor estimate; not official statistics or a consensus forecast.' },
  heineken2024: { title: 'Heineken N.V. Reports 2024 Full Year Results', href: 'https://www.jamessharp.co.uk/market-news/heineken-n-v-reports-2024-full-year-results/', publisher: 'Heineken results reproduced by James Sharp & Co', note: 'FY2024 company results: Heineken brand +9%, Heineken 0.0 about +10%, gross savings over EUR0.6bn.' },
  pernod2025: { title: 'Pernod Ricard: FY25 Full-Year Sales and Results', href: 'https://www.nasdaq.com/press-release/pernod-ricard-steering-through-challenging-environment-agility-discipline-and', publisher: 'Pernod Ricard release via Nasdaq', note: 'FY ended 30 June 2025; corporate results, not industry totals.' },
  diageo2026: { title: 'Diageo — Preliminary Results, Year Ended 30 June 2026', href: 'https://www.jamessharp.co.uk/market-news/diageo-preliminary-results/', publisher: 'Diageo results reproduced by James Sharp & Co', note: 'Corporate target and results; the US$850m item is a savings target from FY27, not an achieved saving.' },
  rtd: { title: 'RTD Market 2026 Forecast and Trends', href: 'https://www.ohbev.com/blog/rtd-market-2024-comprehensive-overview', publisher: 'OhBEV compiling IWSR and NielsenIQ', note: 'Commercial compilation; use its RTD figures as estimates with stated periods.' },
  europeNoLow: { title: 'Non-alcoholic beer sector in ascendancy across Europe', href: 'https://www.brewersjournal.info/non-alcoholic-beer-sector-in-ascendancy-across-europe/', publisher: 'Brewers of Europe data reported by The Brewers Journal', note: 'Europe-only trade-body evidence.' },
  vietnamDownturn: { title: 'Craft brews still shine in Vietnam’s gloomy beer market', href: 'https://asiabrewersnetwork.com/news/craft-brews-still-shine-in-vietnams-gloomy-beer-market', publisher: 'Asia Brewers Network', note: 'Secondary reporting of 2023 company performance; revenue movement is not a consumption measure.' },
  alcoholLaw: { title: 'Law No. 44/2019/QH14 on Prevention and Control of Harmful Effects of Alcoholic Beverages', href: 'https://vanban.chinhphu.vn/?docid=197311&pageid=27160', publisher: 'Government of Vietnam legal portal', note: 'Enacted 14 June 2019; effective 1 January 2020. Official legal source.' },
  decree168: { title: 'Decree No. 168/2024/ND-CP on road-traffic administrative penalties', href: 'https://vanban.chinhphu.vn/?docid=212167&pageid=27160', publisher: 'Government of Vietnam legal portal', note: 'Enacted 26 December 2024; effective 1 January 2025. Amended by Decree 238/2026 effective 15 August 2026.' },
  decree238: { title: 'Decree No. 238/2026/ND-CP amending Decree 168/2024', href: 'https://vanban.chinhphu.vn/?docid=218613&pageid=27160', publisher: 'Government of Vietnam legal portal', note: 'Enacted 26 June 2026; effective 15 August 2026. Check the consolidated current text before quoting a penalty.' },
  exciseLaw: { title: 'Law No. 66/2025/QH15 on Excise Tax', href: 'https://vanban.chinhphu.vn/?docid=214598&pageid=27160', publisher: 'Government of Vietnam legal portal', note: 'Enacted 14 June 2025; effective 1 January 2026. Official legal source.' },
  exciseSchedule: { title: 'Excise Tax Schedule under Law 66/2025/QH15', href: 'https://xaydungchinhsach.chinhphu.vn/bieu-thue-tieu-thu-dac-biet-theo-luat-so-66-2025-qh155-ap-dung-tu-01-01-2026-119250719071456329.htm', publisher: 'Government Policy Development Portal', note: 'Official schedule: beer and ≥20° alcohol 65% in 2026 to 90% in 2031; <20° alcohol 35% to 60%.' },
  vovZero: { title: 'Security ministry presses ahead with zero tolerance policy for drink driving', href: 'https://english.vov.vn/en/society/security-ministry-presses-ahead-with-zero-tolerance-policy-for-drink-driving-post1092127.vov', publisher: 'Voice of Vietnam', note: 'State-news explanation published 29 April 2024; policy context, not the legal text.' },
  vnexpress168: { title: 'Huge new penalties justified, will help improve Vietnam traffic order', href: 'https://e.vnexpress.net/news/perspectives/huge-new-penalties-justified-will-help-improve-vietnam-traffic-order-4836935.html', publisher: 'VnExpress International', note: 'Reports Decree 168’s 1 January 2025 start and first-day enforcement; general traffic totals are not alcohol-only.' },
} satisfies Record<string, BeerM5Source>;
export type BeerM5SourceId = keyof typeof BEER_M5_SOURCES;
export const citeM5 = (...ids: BeerM5SourceId[]): BeerM5Source[] => ids.map((id) => BEER_M5_SOURCES[id]);

export function M5DeepDive({ paragraphs, evidence }: { paragraphs: string[]; evidence?: string }) {
  return <div className="space-y-4">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{evidence ? <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600"><strong className="text-slate-800">Evidence note: </strong>{evidence}</p> : null}</div>;
}
export function m5Chapter(input: Omit<BeerM5CardData, 'concepts'>): BeerM5CardData { return { ...input, concepts: [] }; }
export function m5Quiz(prefix: string, seeds: DairyQuizSeed[]): BeerM5Question[] { return pairedQuiz(prefix, seeds) as BeerM5Question[]; }
