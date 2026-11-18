import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { COFFEE_M3_SOURCES } from './coffeeM3Core';

export type CoffeeModule04VisualKind = `coffee-m4-${string}`;

export interface CoffeeM4CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: CoffeeModule04VisualKind;
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

export interface CoffeeM4LessonBundle {
  deck: CoffeeM4CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 04 adds chain store-count snapshots from press and Q&Me tracking, parent-group results for Highlands and
 * Phúc Long, the 2026 Momentum Works regional report, iPOS.vn survey results and trade-press accounts of chain exits.
 * Store counts differ by reporting date and by whether kiosks and franchised outlets are included, so every count in
 * the chapters is tied to a date and a source, and conflicting figures are flagged rather than merged.
 */
export const COFFEE_M4_SOURCES = {
  ...COFFEE_M3_SOURCES,
  vietmediaSplit: { title: 'As Mixue retreats, Vietnam\u2019s coffee and tea chain market splits in two', href: 'https://en.thevietmedia.net/vietnam-beverage-chain-rebalancing/', publisher: 'The Viet Media (April 2026)', note: 'Mixue closed over 400 international outlets, with Vietnam bearing much of it; Highlands 985 stores, revenue up nearly 16%, EBITDA about VND 1.1 trillion and same-store sales up over 8% in 2025; Ph\u00fac Long 237, Katinat 93 to 114 and Starbucks 150; iPOS three-tier framework with a squeezed middle around VND 30,000\u201340,000; coffee chains US$725 million and tea chains US$617 million.' },
  vietnambizShakeout: { title: 'The 2025 shake-out: which beverage chains shone and which faded (store-count detail)', href: 'https://vietnambiz.vn/nam-thanh-loc-2025-chuoi-do-uong-nao-ruc-ro-va-chuoi-nao-da-lui-tan-20251216115151666.htm', publisher: 'VietnamBiz (16 December 2025, Vietnamese-language)', note: 'January versus late-2025 store counts for Highlands (815 to 928 by September), Ph\u00fac Long (167 to nearly 200 outside WinMart), Starbucks (125 to about 150), Katinat (93 to 114) and Trung Nguy\u00ean Legend (106 to about 112); about 50,000 F&B outlets reported closed in the first half of 2025; The Coffee House 93 stores at takeover and 48 later, though another paragraph says over 80; Caf\u00e9 Amazon exited after never passing 30 stores; Ph\u00fac Long Unicorn format and Starbucks menu localisation.' },
  vietdataHighlands: { title: 'Vietnam\u2019s largest coffee chain reaches a new profit peak', href: 'https://www.vietdata.vn/post/vietnam-s-largest-coffee-chain-reaches-a-new-profit-peak-with-philippines-conglomerate-holding-a-60', publisher: 'VietData (reporting Jollibee Foods Corporation)', note: 'Highlands third-quarter 2025 EBITDA of about PHP 666 million (over VND 297 billion, up 17.1%) and nine-month EBITDA of about VND 852 billion; 928 outlets at end-September 2025, of which 800 company-owned and 128 franchised; nearly 29% of Jollibee\u2019s coffee and tea EBITDA.' },
  vietstockRepositioning: { title: 'Repositioning of the coffee chains (long read)', href: 'https://vietstock.vn/2025/09/cuoc-tai-dinh-vi-cua-cac-chuoi-ca-phe-118-1356397.htm', publisher: 'Vietstock (September 2025, Vietnamese-language; read as a search excerpt)', note: 'Reports Highlands\u2019 average store EBITDA of about VND 640 million in a half-year, about VND 3.5 million a day, and Starbucks growing from 119 to 139 stores in the first half of 2025 with a selective-growth approach.' },
  phucLongResults: { title: 'Ph\u00fac Long earns record profit: how much does each store take a day?', href: 'https://www.vietnam.vn/en/chuoi-ca-phe-phuc-long-lai-ky-luc-moi-ngay-cua-hang-thu-ve-bao-nhieu-tien', publisher: 'Vietnam.vn (reporting Masan Group results)', note: '2025 revenue of nearly VND 1,900 billion, up nearly 17%; net profit before minorities VND 195 billion, a margin above 10%; average daily revenue per store VND 22.8 million, up 6%; over 200 standalone outlets; food targeted at about 11% of 2026 revenue; delivery described as increasingly important.' },
  investorLargerPlayers: { title: 'Vietnam F&B market: advantage shifts toward larger players', href: 'https://theinvestor.vn/vietnam-fb-market-advantage-shifts-toward-larger-players-d20022.html', publisher: 'The Investor (2026)', note: 'Highlands opened its 1,000th outlet in June 2026 with Vietnam same-store sales up 11.5% in the second quarter; Ph\u00fac Long second-quarter 2026 revenue VND 550 billion, up 26.9%, daily revenue per standard store VND 26.2 million, up 18.5%, and 220 standalone outlets; iPOS.vn first-half 2026 survey found 42.7% of establishments with revenue down at least 5% and 20.22% growing over 5%.' },
  dnseChains: { title: 'The 2025 Vietnamese coffee chain wars: some swell, some shrink', href: 'https://www.dnse.com.vn/senses/tin-tuc/dai-chien-chuoi-ca-phe-viet-2025-ke-phinh-to-nguoi-teo-top-35052312', publisher: 'DNSE (summarising a Q&Me report, Vietnamese-language)', note: 'Ph\u00fac Long added 79 stores to 237, using WinMart kiosks; Katinat 69 to 93 at VND 40,000\u201360,000 a cup; Starbucks 104 to 127 with selective growth and a push on loyalty and cashless payment; Highlands 855 stores; store counts differ from other trackers by date.' },
  vietnambizHighlandsPhucLong: { title: 'Highlands Coffee versus Ph\u00fac Long: two strategies, one arena', href: 'https://vietnambiz.vn/the-doi-dau-giua-highlands-coffee-va-phuc-long-hai-chien-luoc-mot-san-choi-20257228251538.htm', publisher: 'VietnamBiz (July 2025, Vietnamese-language; read as a search excerpt)', note: 'Price bands of VND 29,000\u201375,000 for Highlands and VND 35,000\u201370,000 for Ph\u00fac Long, described as nearly equal, so choice rests on experience and taste; Ph\u00fac Long, 85% owned by Masan, focuses on flagship stores and per-store margin and targets 500 stores; the article describes Highlands as expanding through franchising, which parent-group counts do not support as the main route.' },
  katinatProfile: { title: 'Katinat marketing strategy: from 10 to 114 stores', href: 'https://vinalink.vn/cam-nang-ve-chien-luoc/chien-luoc-marketing-cua-katinat.html', publisher: 'Vinalink (Vietnamese-language, secondary; read as a search excerpt)', note: 'Katinat from about 10 stores at end-2021 to 114 at end-2025 per Q&Me, a target of 120 in 2026, prices of VND 35,000\u201370,000 with an estimated average near VND 50,000, best-sellers described as milk tea and fruit tea, and an expert\u2019s view that a check-in-led model is hard to sustain beyond three to four years; commentary, not company data.' },
  katinatNoFranchise: { title: 'Does Katinat franchise?', href: 'https://www.sapo.vn/blog/nhuong-quyen-katinat-bao-nhieu-tien', publisher: 'Sapo blog (Vietnamese-language, secondary)', note: 'States that Katinat has not launched franchising and that its stores are directly invested in and managed by the company.' },
  agroMilano: { title: 'Surprise: Vietnam\u2019s largest coffee chain is not Highlands', href: 'https://agro.gov.vn/vn/tID35952_bat-ngo-chuoi-ca-phe-lon-nhat-viet-nam-khong-phai-highlands-am-tham-chiem-thi-truong-bang-chien-luoc-nhu-mixue.html', publisher: 'Agro.gov.vn (Vietnamese-language, reporting Momentum Works)', note: 'Milano Coffee about 2,500 outlets, the only Vietnamese chain over 1,000 by outlet count; Highlands 1,000th outlet in June 2026 and 2025 EBITDA of VND 1,097 billion; a target of listing in Vietnam in the first quarter of 2027.' },
} satisfies Record<string, FashionM2Source>;
export type CoffeeM4SourceId = keyof typeof COFFEE_M4_SOURCES;
export const citeC4 = (...ids: CoffeeM4SourceId[]): FashionM2Source[] => ids.map((id) => COFFEE_M4_SOURCES[id]);

export const C4DeepDive = F2DeepDive;
export const c4Quiz = f2Quiz;

export function c4Chapter(input: Omit<CoffeeM4CardData, 'concepts'>): CoffeeM4CardData {
  return { ...input, concepts: [] };
}
