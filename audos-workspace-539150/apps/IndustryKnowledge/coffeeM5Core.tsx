import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { COFFEE_M4_SOURCES } from './coffeeM4Core';

export type CoffeeModule05VisualKind = `coffee-m5-${string}`;

export interface CoffeeM5CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: CoffeeModule05VisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  statsNote?: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: FashionM2Source[];
}

export interface CoffeeM5LessonBundle {
  deck: CoffeeM5CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 05 adds the first-half 2026 iPOS.vn spending data, Tuoi Tre and Jollibee reporting on chain rebalancing and
 * digital sales, press accounts of automation and reusable-cup schemes, and the 2025 personal data protection law with its
 * 2026 penalty decree. Spending shares, company results and press accounts keep their source labels, and policy or
 * company targets are written as targets, never as forecasts.
 */
export const COFFEE_M5_SOURCES = {
  ...COFFEE_M4_SOURCES,
  iposH12026Detail: { title: 'iPOS.vn and Nestl\u00e9 Professional publish the first-half 2026 Vietnam F&B market report (spending data)', href: 'https://ipos.vn/ipos-vn-va-nestle-professional-cong-bo-bao-cao-thi-truong-kinh-doanh-am-thuc-tai-viet-nam-6-thang-dau-nam-2026/', publisher: 'iPOS.vn press release, 10 September 2026 (Vietnamese-language)', note: 'First-half 2026 F&B revenue of VND 432.7 trillion, up 6.55% on VND 406.1 trillion; about 329,200 outlets, down 0.1%; about 43% of outlets with lower revenue; 25.64% of food outlets and 15.82% of drink outlets growing; 52.01% of businesses planning to expand, down from 57.31%; drink spend under VND 35,000 down from 41.64% to 29.44% and VND 36,000\u201370,000 up from 48.29% to 61.78%; ultra-cheap fixed-price drinks the top trend at 39.19%; 14.24% of diners had tried no trend.' },
  tuoitreRebalancing: { title: 'Vietnam beverage chains trim networks, optimize operations as competition pressures margins', href: 'https://news.tuoitre.vn/vietnam-beverage-chains-trim-networks-optimize-operations-as-competition-pressures-margins-103260426173649191.htm', publisher: 'Tuoi Tre News (26 April 2026)', note: 'Branded coffee and milk tea market above US$1.3 billion, third largest in Southeast Asia; consolidation since early 2026; chains with 100+ outlets such as Highlands, Starbucks and Ph\u00fac Long use self-service counters; Chagee uses QR-coded cups for automated mixing; ultra-low-cost drinks from VND 7,000; an Insight Asia director calls it a rebalancing phase with localised saturation.' },
  jollibeeHighlands: { title: 'Highlands Coffee posts high double-digit FY 2025 revenue growth; best-in-class unit economics', href: 'https://www.jollibeegroup.com/news/jollibee-group-highlands-coffee-posts-high-double-digit-fy-2025-revenue-growth-best-in-class-unit-economics/', publisher: 'Jollibee Group (company announcement)', note: 'High double-digit FY2025 revenue growth and high single-digit same-store sales growth in Q1 2026; network predominantly company-owned; most digital sales through third-party aggregators with the Highlands app a growing share; \u201cbest-in-class\u201d profitability is the company\u2019s own claim.' },
  greenstyleReusable: { title: 'Starbucks charges for paper bags, Highlands Coffee gives a discount for bringing a cup', href: 'https://greenstyle.vn/starbucks-thu-phi-tui-giay-highlands-coffee-giam-gia-neu-mang-coc/', publisher: 'Greenstyle (6 January 2025, Vietnamese-language)', note: 'Starbucks charged VND 500 per paper bag from 26 December 2024; Highlands gave VND 8,000 off for bringing a personal cup, reported at one outlet as applying on Mondays; Vietnam uses about 30 billion nylon bags a year, 80% discarded after one use, per an environmental economics association in 2023.' },
  starbucksByoc: { title: 'Starbucks Vietnam: bring your own cup incentive', href: 'https://www.facebook.com/starbucksvietnam/posts/for-earth-day-tag-your-sustainability-teammate-in-the-comments-and-let-us-know-w/821342363360227/', publisher: 'Starbucks Vietnam (company social post)', note: 'States VND 10,000 off plus 2 bonus Stars for bringing a reusable cup; a company promotion whose current terms were not checked.' },
  vpbankPassio: { title: 'VPBank and Passio Coffee reusable-bottle offer', href: 'https://www.vpbank.com.vn/uu-dai/retail/other-promotion-category/vpbank-ket-hop-passio-coffee', publisher: 'VPBank (bank promotion page, Vietnamese-language)', note: 'VND 10,000 off a Size L drink when a customer brings the promotional bottle and pays with VPBank, through 31 December 2026; a bank-led promotion.' },
  roboticCafe: { title: 'A small Ho Chi Minh City caf\u00e9 uses a robot to make coffee in two minutes', href: 'https://dantri.com.vn/du-lich/quan-nho-o-tphcm-choi-lon-dung-robot-pha-ca-phe-2-phut-co-ngay-mot-ly-20260312201518460.htm', publisher: 'Dan Tri (13 March 2026, Vietnamese-language)', note: 'One caf\u00e9, open about a month, with Vietnamese-built robot arms making a drink in about two minutes, ordering by screen and QR payment, staff on hand to help; peak-hour waits can be longer; a single-shop example.' },
  pdplLaw: { title: 'Law 91/2025/QH15 on Personal Data Protection', href: 'https://congbao.chinhphu.vn/van-ban/luat-so-91-2025-qh15-45578.htm', publisher: 'Official Gazette (Vietnamese-language)', note: 'Issued 26 June 2025 and effective 1 January 2026; maximum administrative fine of VND 3 billion for most violations, 5% of prior-year revenue for cross-border transfer violations and 10 times proceeds for data sales; small enterprises, startups and micro-enterprises have partial exemptions.' },
  pdplConsent: { title: 'Consent requirements in Vietnam under Law 91/2025', href: 'https://lexdata.vn/en/handbook/what-is-consent/', publisher: 'LexData (legal handbook, secondary)', note: 'Consent must be clear and specific; silence is not consent; default consent is not allowed; controllers must keep consent records; businesses holding valid consent under the earlier Decree 13/2023 need not re-ask for existing purposes.' },
  decree330: { title: 'Decree 330/2026/ND-CP on penalties in cybersecurity and personal data protection', href: 'https://xaydungchinhsach.chinhphu.vn/nghi-dinh-330-2026-nd-cp-ve-xu-phat-vi-pham-hanh-chinh-trong-linh-vuc-an-ninh-mang-119260824172446407.htm', publisher: 'Chinhphu.vn (government portal, August 2026, Vietnamese-language)', note: 'Fines of VND 30\u201350 million for processing data without consent, default consent or no consent log, and VND 50\u201370 million for continuing after a request to stop or treating silence as consent.' },
} satisfies Record<string, FashionM2Source>;
export type CoffeeM5SourceId = keyof typeof COFFEE_M5_SOURCES;
export const citeC5 = (...ids: CoffeeM5SourceId[]): FashionM2Source[] => ids.map((id) => COFFEE_M5_SOURCES[id]);

export const C5DeepDive = F2DeepDive;
export const c5Quiz = f2Quiz;

export function c5Chapter(input: Omit<CoffeeM5CardData, 'concepts'>): CoffeeM5CardData {
  return { ...input, concepts: [] };
}
