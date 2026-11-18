import type { ReactNode } from 'react';
import { FASHION_M2_SOURCES, F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';

export type FashionModule03VisualKind = `fashion-m3-${string}`;

export interface FashionM3CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: FashionModule03VisualKind;
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

export interface FashionM3LessonBundle {
  deck: FashionM3CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 03 reuses the publishers already vetted for the value-chain module and adds the
 * company filings, trade bodies and Vietnamese regulators that this module quotes.
 * Every entry points at the publishing organisation, so a learner can open the original
 * and check a claim against it. Company filings and trade-body figures are reported as
 * published; analyst and vendor material is marked as secondary in its note.
 */
export const FASHION_M3_SOURCES = {
  ...FASHION_M2_SOURCES,
  nikeAnnual: { title: 'NIKE, Inc. Form 10-K, fiscal year ended 31 May 2024', href: 'https://www.sec.gov/Archives/edgar/data/320187/000032018724000044/nke-20240531.htm', publisher: 'U.S. Securities and Exchange Commission (NIKE, Inc.)', note: 'Source of the share of NIKE Brand footwear and apparel made in Vietnam and the use of contract manufacturers.' },
  adidasReport: { title: 'Sourcing and supply chain \u2014 adidas Annual Report 2024', href: 'https://report.adidas-group.com/2024/en/group-management-report-our-company/description-of-business-model/sourcing-and-supply-chain.html', publisher: 'adidas AG', note: 'Source of the share of adidas volume sourced from Vietnam.' },
  fastRetailingVn: { title: 'UNIQLO launches in Vietnam; Southeast Asia store counts', href: 'https://www.fastretailing.com/eng/group/news/1911051200.html', publisher: 'Fast Retailing Co., Ltd.', note: 'Company announcement of the first Vietnam store and its sales floor; store counts are on the company\u2019s Southeast Asia page.' },
  hmVietnam: { title: 'H&M plans more than 20 stores in Vietnam', href: 'https://www.vietnam.vn/en/de-nghi-tap-doan-h-m-va-syre-chia-se-kinh-nghiem-phat-trien-nganh-det-may-da-giay-ben-vung', publisher: 'Vietnam.vn (Government portal)', note: 'Reports H&M\u2019s Vietnam store count, expansion plan and number of partner factories.' },
  vietnamPlusTextile: { title: 'Vietnam\u2019s textile export turnover hits 44 billion USD in 2024', href: 'https://en.vietnamplus.vn/vietnams-textile-export-turnover-hits-44-billion-usd-in-2024-post306791.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Reports Vietnam Textile and Apparel Association (VITAS) export figures.' },
  lefasoFootwear: { title: 'Footwear and leather export turnover surpasses US$27 billion in 2024', href: 'https://en.baochinhphu.vn/footwear-export-turnover-surpasses-us27-billion-111250124162138049.htm', publisher: 'Vietnam Government News (LEFASO data)', note: 'Reports footwear export value and the limited domestic added value of contract manufacturing.' },
  cimigoEcommerce: { title: 'TikTok vs. Shopee: Gen Z and Millennial e-commerce showdown', href: 'https://www.cimigo.com/en/trends/tiktok-vs-shopee/', publisher: 'Cimigo (reporting YouNet ECI H1 2025)', note: 'Platform shares, category GMV and generational shopping behaviour for Vietnam, first half of 2025.' },
  younetFashion: { title: 'Vietnamese fashion in H1 2025: offline stores close, local brands still lead online', href: 'https://www.younetgroup.com/vietnamese-fashion-in-h1-2025-offline-stores-close-local-brands-still-lead-the-online-market/', publisher: 'YouNet Group', note: 'Covers authentic fashion on Shopee, Lazada and Tiki only; excludes sportswear and accessories.' },
  metricEcommerce: { title: 'Vietnam e-commerce marketplace report, Q3 2025', href: 'https://www.brandsvietnam.com/congdong/topic/metric-bao-cao-thi-truong-san-thuong-mai-dien-tu-viet-nam-quy-3-2025', publisher: 'Metric.vn (via Brands Vietnam)', note: 'Quarterly platform share and category growth across four marketplaces; secondary market data.' },
  canifaCleverTap: { title: 'Canifa customer engagement case study', href: 'https://clevertap.com/case-study/canifa-transforms-customer-engagement-in-vietnam-with-clevertaps-all-in-one-platform/', publisher: 'CleverTap', note: 'Vendor case study: describes Canifa\u2019s 100+ stores, app and unified online and offline customer view.' },
  scaleCommerceD2c: { title: 'Vietnamese brands doing D2C: lessons', href: 'https://www.getscalecommerce.com/blog/brand-viet-lam-d2c-thanh-cong-bai-hoc', publisher: 'ScaleCommerce', note: 'Secondary agency analysis of Coolmate and Biti\u2019s direct-to-consumer approaches; figures are as reported there.' },
  nsqReturns: { title: 'Solution to reduce return rate in e-commerce', href: 'https://nsqvietnam.com/en/solution-to-reduce-return-rate/', publisher: 'N-Squared eCommerce', note: 'Informal survey of Shopee Vietnam sellers; indicative only, not a measured national rate.' },
  reutersTariffs: { title: 'US tariffs on Vietnam would be a blow to Nike and other sportswear brands', href: 'https://www.reuters.com/business/retail-consumer/us-tariffs-vietnam-would-be-blow-nike-other-sportswear-brands-2025-04-01/', publisher: 'Reuters', note: 'Reports brand reliance on Vietnam and average U.S. tariff rates on Vietnamese footwear and apparel.' },
  vnLabelling: { title: 'Decree 111/2021/ND-CP amending Decree 43/2017 on goods labels', href: 'https://moit.gov.vn/en/news/latest-news/new-decrees-take-effect-from-february-2022.html', publisher: 'Ministry of Industry and Trade of Vietnam', note: 'Official notice of the amended goods-labelling rules, effective 15 February 2022.' },
  vnEcommerceDecree: { title: 'Decree 85/2021/ND-CP amending Decree 52/2013/ND-CP on e-commerce', href: 'https://thuvienphapluat.vn/van-ban/Thuong-mai/Nghi-dinh-85-2021-ND-CP-sua-doi-Nghi-dinh-52-2013-ND-CP-ve-thuong-mai-dien-tu-489272.aspx', publisher: 'Government of Vietnam (legal database)', note: 'Vietnamese-language text of the rules on product information shown on e-commerce sites, effective 1 January 2022.' },
  vnEInvoice: { title: 'Decree 70/2025/ND-CP on invoices and documents', href: 'https://xaydungchinhsach.chinhphu.vn/nghi-dinh-70-2025-nd-cp-sua-doi-bo-sung-quy-dinh-ve-hoa-don-chung-tu-11925032321512617.htm', publisher: 'Government of Vietnam (policy portal)', note: 'Official summary of the e-invoice rules effective 1 June 2025.' },
} satisfies Record<string, FashionM2Source>;
export type FashionM3SourceId = keyof typeof FASHION_M3_SOURCES;
export const citeF3 = (...ids: FashionM3SourceId[]): FashionM2Source[] => ids.map((id) => FASHION_M3_SOURCES[id]);

export const F3DeepDive = F2DeepDive;
export const f3Quiz = f2Quiz;

export function f3Chapter(input: Omit<FashionM3CardData, 'concepts'>): FashionM3CardData {
  return { ...input, concepts: [] };
}
