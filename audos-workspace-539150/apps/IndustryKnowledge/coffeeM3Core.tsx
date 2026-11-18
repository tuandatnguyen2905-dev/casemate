import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { COFFEE_M2_SOURCES } from './coffeeM2Core';

export type CoffeeModule03VisualKind = `coffee-m3-${string}`;

export interface CoffeeM3CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: CoffeeModule03VisualKind;
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

export interface CoffeeM3LessonBundle {
  deck: CoffeeM3CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 03 adds franchise and chain-model reporting, an industry survey of independent versus chain revenue share,
 * receipt-based spending data, loyalty-programme pages, per-cup and per-store economics as reported by the press and
 * company groups, packaging-recycling rules and the coffee trade association. Per-store figures and payback ranges are
 * reported by the press or secondary sources, not audited, and the chapters label them that way.
 */
export const COFFEE_M3_SOURCES = {
  ...COFFEE_M2_SOURCES,
  iposReportDeck: { title: 'Vietnam F&B market report 2025 (iPOS.vn and Nestl\u00e9 Professional, limited version)', href: 'https://www.slideshare.net/slideshow/ipos-vn-nestle-professional-vietnam-f-b-report-2025_limited-version_low-res-pdf/287074598', publisher: 'iPOS.vn and Nestl\u00e9 Professional (report deck on SlideShare, Vietnamese-language)', note: 'Independent outlets 91.7% of 2025 F&B revenue and chains of at least 10 branded outlets 8.3%, up from about 7.3% in 2024; 2025 consumer price index rose 3.31%, with housing, electricity and water up 6.08%.' },
  milanoFranchise: { title: 'Milano Coffee\u2019s franchise story: over 2,000 outlets and how the founder works with agents', href: 'https://cafef.vn/chuyen-nhuong-quyen-nhu-nam-sau-mua-cua-milano-coffee-nhan-chuoi-hon-2000-cua-hang-phu-gan-kin-ca-nuoc-nha-sang-lap-giai-bai-toan-chat-luong-va-lam-viec-voi-dai-ly-the-nao-188240711090416066.chn', publisher: 'CafeF (Vietnamese-language, 2024)', note: 'Milano says it earns from roasting and supplying coffee to agents rather than a share of store sales, reports about 2,000 franchise outlets in 57 provinces and describes disputes when agents mix in outside products.' },
  virNewModels: { title: 'Beverage chains take on new models', href: 'https://vir.com.vn/beverage-chains-take-on-new-models-122342.html', publisher: 'Vietnam Investment Review', note: 'Trung Nguyen Legend runs a 106-store premium chain and an E-Coffee franchise of about 800 stores; The Coffee House fell from 150 stores at end-2022 to 94 at end-2024.' },
  investorEcoffee: { title: 'Trung Nguyen E-Coffee aims for 3,000 stores with a new franchise model', href: 'https://theinvestor.vn/trung-nguyen-e-coffee-aims-domestic-international-expansion-to-3000-stores-with-new-franchise-model-d12278.html', publisher: 'The Investor', note: 'Zero-fee franchise policy, conversion packages of VND 56\u2013196 million and investment packages of VND 65\u2013245 million, formats from about four square metres; a company target of 3,000 stores.' },
  vietstockDrinks: { title: 'Domestic drinks chains set to step up', href: 'https://en.vietstock.vn/2025/05/domestic-drinks-chains-set-to-step-up-974-611636.htm', publisher: 'Vietstock', note: 'Golden Gate bought 99.98% of The Coffee House for about US$10.3 million after the chain closed over 30 outlets in 2024; Starbucks Reserve Bitexco opened in April 2025.' },
  vietnamfinanceChains: { title: 'Beverage chain competition: the fierce race between local and foreign brands', href: 'https://vietnamfinance.vn/canh-tranh-chuoi-do-uong-cuoc-dua-khoc-liet-giua-thuong-hieu-noi--ngoai-d126618.html', publisher: 'VietnamFinance (Vietnamese-language)', note: 'Preliminary comparison of chains by ownership, segment and operating model, including Phuc Long kiosks in WinMart and Starbucks operating under Maxim Group; share estimates are described as preliminary.' },
  highlandsModelMix: { title: 'Highlands Coffee earns VND 12\u201313 billion a day with EBITDA over VND 1,000 billion', href: 'https://cafebiz.vn/highlands-coffee-hot-bac-tai-thi-truong-viet-voi-quy-mo-ap-dao-moi-doi-thu-thu-12-13-ty-dong-moi-ngay-loi-nhuan-ebitda-vuot-muc-1000-ty-dong-176250326061541012.chn', publisher: 'CafeBiz (reporting Jollibee Foods Corporation, Vietnamese-language)', note: 'End-2024: 850 Vietnam stores, 716 company-managed and 134 franchised; average of VND 15\u201316 million a day per store; EBITDA of about VND 1,050 billion; the system estimate is the reporter\u2019s calculation.' },
  qmeReceipts: { title: 'Vietnam coffee chain consumption insights from receipt data', href: 'https://qandme.net/en/report/vietnam-coffee-chain-consumption-insights-from-receipt-data.html', publisher: 'Q&Me (market research report summary)', note: 'Based on only 200 receipts: average VND 110,000 a visit, 77% drink-only, 18.5% drink plus food, solo visits 61\u201362%, drink-only orders VND 88,000 versus VND 162,000 with food; indicative, small sample.' },
  decisionLabBudget: { title: 'Vietnamese consumers prioritise savings while dining out remains essential', href: 'https://www.decisionlab.co/blog/vietnamese-consumers-prioritise-savings-while-dining-out-remains-essential', publisher: 'Decision Lab (survey summary)', note: '84% of respondents set limits on out-of-home spending, with 49% of Gen Z holding strictly to a budget; 57% enjoy beverages at caf\u00e9s and milk-tea shops; the publication date is not shown on the page.' },
  studentCafes: { title: 'Students spend millions of dong each month studying at caf\u00e9s', href: 'https://www.vietnam.vn/en/sinh-vien-chi-tien-trieu-moi-thang-den-quan-cafe-hoc-bai', publisher: 'VietNamNet via Vietnam.vn (April 2025, interviews)', note: 'Students quoted visit caf\u00e9s two to four times a week for VND 45,000\u201365,000 drinks and one spends 10\u201315% of a monthly allowance; individual accounts, not a survey.' },
  vnexpressCupCost: { title: 'Pho and caf\u00e9 shops add VND 10,000 surcharge at Tet', href: 'https://vnexpress.net/noi-long-quan-pho-ca-phe-phu-thu-10-nghin-dong-dip-tet-4845539.html', publisher: 'VnExpress (Vietnamese-language, 2024)', note: 'Illustrative cost of a VND 25,000 coffee: ingredients about VND 5,500, labour about VND 4,500 and fixed costs about VND 5,000; an example given by operators.' },
  secondaryUnitEconomics: { title: 'Vietnam coffee statistics 2026: market size and margins by model', href: 'https://www.validator.vn/kien-thuc/so-lieu-ca-phe-viet-nam-2026', publisher: 'Validator.vn (consultancy knowledge page, secondary)', note: 'Unaudited rule-of-thumb payback ranges by format, from 4\u20138 months for kiosks to 18\u201336 months for premium caf\u00e9s; useful as indicative ranges only.' },
  highlandsApp: { title: 'HighlandsDI member app officially launches', href: 'https://www.highlandscoffee.com.vn/vn/app-thanh-vien-highlandsdi-chinh-thuc-ra-mat.html', publisher: 'Highlands Coffee (company announcement, Vietnamese-language)', note: 'From 19 December 2025 HighlandsDI replaced Highlands Rewards, with tiers based on 12-month spend, Drips and stamps, and pre-order and prepaid top-up features.' },
  highlandsZalo: { title: 'Highlands Coffee raises conversion with a voucher campaign on Zalo Mini App', href: 'https://miniforbusiness.zalo.me/case-study/highlands-coffee-tang-ti-le-chuyen-doi-voi-chien-dich-phat-voucher-tren-zalo-mini-app', publisher: 'Zalo Mini App for Business (vendor case study, March 2025)', note: 'A 40-day campaign drew over 2 million app users, a 56.9% conversion to identified data and 347,000 Zalo OA follows; a vendor-reported result.' },
  phucLongRewards: { title: 'Ph\u00fac Long membership FAQ', href: 'https://www.phuclong.com.vn/hoi-vien', publisher: 'Ph\u00fac Long (company website, Vietnamese-language)', note: 'One point per VND 10,000 spent, tiered membership, and 100 redemption points for a free medium drink.' },
  coffeeHouseApp: { title: 'GEEK Up builds a member loyalty platform for The Coffee House', href: 'https://geekup.vn/en/works/food-beverage/the-coffee-house-member-loyalty-platform', publisher: 'GEEK Up (vendor case study)', note: 'Describes a 2016 app, 20 points for a free drink and a 10% discount, and about 100,000 downloads after two years; a vendor-reported result.' },
  eprPackaging: { title: 'EPR recycling percentages for packaging effective 1 January 2024', href: 'https://moitruongachau.com/en/part-6-epr-percentage-standard-regulations-applicable-to-packaging-products-in-viet-nam-effective-from-01-01-2024.html', publisher: 'A Chau Environment (consultancy explainer on Decree 08/2022/ND-CP)', note: 'Mandatory recycling rates from 1 January 2024 such as 20% for carton paper packaging, 15% for mixed paper and 22% for rigid PET; plastic types range from 10% to 22%.' },
  eprScope: { title: 'Recycling responsibility for products and packaging begins', href: 'https://scem.gov.vn/vi/tin-tuc-trung-tam/chu-truong-chinh-sach/bat-dau-thuc-hien-trach-nhiem-tai-che-san-pham-bao-bi-1105.html', publisher: 'Ministry of Agriculture and Environment portal (Vietnamese-language)', note: 'From 1 January 2024 producers and importers of covered packaging must meet recycling duties; packaging producers with prior-year revenue under VND 30 billion are exempt.' },
  vicofaCharter: { title: 'Charter of the Viet Nam Coffee-Cocoa Association (revised, approved 9 October 2025)', href: 'https://vicofa.org.vn/dieu-le-hiep-hoi-ca-phe-ca-cao-viet-nam-bid4.html', publisher: 'VICOFA (Vietnamese-language)', note: 'Describes VICOFA as a voluntary social-professional organisation of businesses and individuals in the coffee and cocoa sector.' },
  vicofaMembers: { title: 'VICOFA organisational structure', href: 'https://vicofa.org.vn/bo-may-to-chuc-bid2.html', publisher: 'VICOFA (Vietnamese-language)', note: 'States nearly 100 members including processors, exporters and research institutes across Robusta and Arabica regions.' },
} satisfies Record<string, FashionM2Source>;
export type CoffeeM3SourceId = keyof typeof COFFEE_M3_SOURCES;
export const citeC3 = (...ids: CoffeeM3SourceId[]): FashionM2Source[] => ids.map((id) => COFFEE_M3_SOURCES[id]);

export const C3DeepDive = F2DeepDive;
export const c3Quiz = f2Quiz;

export function c3Chapter(input: Omit<CoffeeM3CardData, 'concepts'>): CoffeeM3CardData {
  return { ...input, concepts: [] };
}
