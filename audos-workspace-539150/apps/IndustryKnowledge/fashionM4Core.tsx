import type { ReactNode } from 'react';
import { FASHION_M3_SOURCES, F3DeepDive, f3Quiz } from './fashionM3Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';

export type FashionModule04VisualKind = `fashion-m4-${string}`;

export interface FashionM4CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: FashionModule04VisualKind;
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

export interface FashionM4LessonBundle {
  deck: FashionM4CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 04 reuses the publishers vetted for Modules 02 and 03 and adds the company filings,
 * platform research and Vietnamese public reporting that this module quotes. Every entry
 * points at the publishing organisation. Store counts, platform shares and enforcement
 * figures are reported as published and the note says what each one does and does not cover.
 */
export const FASHION_M4_SOURCES = {
  ...FASHION_M3_SOURCES,
  younetEciPlatforms: { title: 'TikTok Shop expands in H1 2025: what should large brands do?', href: 'https://youneteci.com/tiktok-shop-banh-truong-trong-nua-dau-2025-thuong-hieu-lon-can-lam-gi-de-kip-thoi-bat-nhip/', publisher: 'YouNet ECI', note: 'Platform revenue shares and TikTok Shop growth across all categories for the first half of 2025; Vietnamese-language report.' },
  younetGrowthRanking: { title: 'Sustainable Growth Brands Ranking on e-commerce, H1 2025', href: 'https://www.younetgroup.com/younet-eci-announces-the-sustainable-growth-brands-ranking-on-e-commerce-h1-2025-top-40-brands-leading-in-operational-efficiency-and-revenue/', publisher: 'YouNet Group (YouNet ECI)', note: 'Four-platform revenue, seller counts and the ranking method; clothing excludes sportswear, unbranded and counterfeit goods.' },
  qmeStoreCount: { title: 'Vietnam retail trends and store counts 2025', href: 'https://www.scribd.com/document/858874653/Q-ME-Vietnam-MT-Trend-2025-EN-250423-101229', publisher: 'Q&Me Vietnam', note: 'Desktop count of store networks as of March 2025; not every brand is included and counts are indicative.' },
  uniqloVietnam: { title: 'UNIQLO Vietnam company information', href: 'https://www.uniqlo.com/vn/en/information/corp-about', publisher: 'UNIQLO Vietnam Co., Ltd.', note: 'Company page: establishment date and store count as of February 2026.' },
  fastRetailingOutlets: { title: 'Group outlets', href: 'https://www.fastretailing.com/eng/group/shoplist/', publisher: 'Fast Retailing Co., Ltd.', note: 'Quarterly UNIQLO store counts by country, including Vietnam.' },
  nike10k2025: { title: 'NIKE, Inc. Form 10-K, fiscal year ended 31 May 2025', href: 'https://www.sec.gov/Archives/edgar/data/320187/000032018725000047/nke-20250531.htm', publisher: 'U.S. Securities and Exchange Commission (NIKE, Inc.)', note: 'Source of the share of NIKE Brand footwear and apparel made in Vietnam and the use of contract manufacturers.' },
  vnCounterfeitHanoi: { title: 'Prosecution over more than 35,000 counterfeit branded clothing sets', href: 'https://thanglong.chinhphu.vn/khoi-to-doi-tuong-buon-ban-hon-35-nghin-bo-quan-ao-gia-thuong-hieu-lon-103250630160427608.htm', publisher: 'Government of Vietnam (Thang Long portal)', note: 'Hanoi economic police case, June 2025; Vietnamese-language report.' },
  dtiCounterfeit: { title: 'Nearly 6,500 clothing items found suspected of brand counterfeiting', href: 'https://dtinews.dantri.com.vn/vietnam-today/nearly-6500-clothing-items-found-suspected-of-brand-counterfeiting-20251209150458125.htm', publisher: 'Dan Tri International', note: 'Hanoi inspection on 8 December 2025; goods were reported as suspected, not proven, counterfeits.' },
  laodongFakes: { title: 'Fake goods disguised as branded goods are still sold everywhere online', href: 'https://news.laodong.vn/kinh-doanh/hang-gia-doi-lot-hang-hieu-van-ban-tran-lan-tren-mang-1552857.ldo', publisher: 'Lao Dong', note: 'Reports Department of E-commerce and Digital Economy figures on removed listings in the first half of 2025.' },
  nsoPress2025: { title: 'Socio-economic situation in the fourth quarter and 2025', href: 'https://www.nso.gov.vn/en/data-and-statistics/2026/01/press-release-social-economic-situation-in-the-fourth-quarter-and-2025/', publisher: 'National Statistics Office of Vietnam', note: 'Official 2025 retail sales; covers all consumer goods and services, not fashion alone.' },
  vietnamplusRetail2025: { title: 'Vietnam\u2019s retail sales, service revenue up 9.2% in 2025', href: 'https://en.vietnamplus.vn/vietnams-retail-sales-service-revenue-up-92-in-2025-post335543.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Reports NSO figures including garment retail revenue and international visitor numbers.' },
  vcciRetail: { title: 'Retail outlook 2026', href: 'https://en.vcci.com.vn/economic-news/retail-outlook-2026-further-re-114147', publisher: 'Vietnam Chamber of Commerce and Industry (VCCI)', note: 'Analyst view on consumption growth compared with the pre-COVID average.' },
  euTextilesStrategy: { title: 'EU Strategy for Sustainable and Circular Textiles', href: 'https://environment.ec.europa.eu/strategy/textiles-strategy_en', publisher: 'European Commission', note: 'Official strategy: durability, repair, recycled fibres, Digital Product Passport and textile EPR.' },
  carbonfactTextile: { title: 'Full overview of the EU textile strategy and regulations', href: 'https://www.carbonfact.com/blog/policy/eu-regulations-for-textile-brands', publisher: 'Carbonfact', note: 'Secondary summary of EU textile EPR timing (national schemes by June 2027) and packaging rules (from August 2026); confirm with the EU texts.' },
  vietnamplusGreen: { title: 'Textile-garment production chain goes green to meet export standards', href: 'https://en.vietnamplus.vn/textile-garment-production-chain-goes-green-to-meet-export-standards-post292049.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Vietnamese garment makers adapting to EU green rules, August 2024.' },
} satisfies Record<string, FashionM2Source>;
export type FashionM4SourceId = keyof typeof FASHION_M4_SOURCES;
export const citeF4 = (...ids: FashionM4SourceId[]): FashionM2Source[] => ids.map((id) => FASHION_M4_SOURCES[id]);

export const F4DeepDive = F3DeepDive;
export const f4Quiz = f3Quiz;

export function f4Chapter(input: Omit<FashionM4CardData, 'concepts'>): FashionM4CardData {
  return { ...input, concepts: [] };
}
