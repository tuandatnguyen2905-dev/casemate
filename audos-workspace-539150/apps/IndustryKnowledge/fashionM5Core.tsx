import type { ReactNode } from 'react';
import { FASHION_M4_SOURCES, F4DeepDive, f4Quiz } from './fashionM4Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';

export type FashionModule05VisualKind = `fashion-m5-${string}`;

export interface FashionM5CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: FashionModule05VisualKind;
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

export interface FashionM5LessonBundle {
  deck: FashionM5CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 05 reuses the publishers vetted for Modules 02 to 04 and adds the Vietnamese laws,
 * ministry and association reporting, sports-participation reports and brand technology
 * case studies that this module quotes. Laws and decrees are cited by their issuing or
 * reporting body; vendor and brand pages are marked as such in the note.
 */
export const FASHION_M5_SOURCES = {
  ...FASHION_M4_SOURCES,
  vnPdpl: { title: 'Law No. 91/2025/QH15 on Personal Data Protection (English summary)', href: 'https://lexdata.vn/en/legal-documents/personal-data-protection-law-91-2025-qh15/', publisher: 'LexData', note: 'Secondary English summary: in force from 1 January 2026; consent and opt-out for targeted advertising, risk classification of AI processing and the 100,000 data-subject threshold.' },
  acclimeJan2026: { title: 'January 2026: Vietnam regulatory compliance updates', href: 'https://vietnam.acclime.com/news-insights/january-2026-vietnam-regulatory-compliance-updates/', publisher: 'Acclime Vietnam', note: 'Advisory summary of Decree 356/2025/ND-CP and the Law on Artificial Intelligence (passed 10 December 2025, effective 1 March 2026).' },
  vnEcommerceLaw: { title: 'The National Assembly officially passes the E-Commerce Law', href: 'https://moit.gov.vn/en/news/latest-news/the-national-assembly-officially-passes-the-e-commerce-law.html', publisher: 'Ministry of Industry and Trade of Vietnam', note: 'Official notice: 41 articles, applies to domestic and foreign parties, effective 1 July 2026.' },
  eyDecree117: { title: 'Vietnam promulgates decree on tax administration for e-commerce and digital platforms', href: 'https://www.ey.com/en_gl/technical/tax-alerts/vietnam-promulgates-decree-on-tax-administration-for-business-activities-on-e-commerce-and-digital-platforms-of-households-and-individuals', publisher: 'EY', note: 'Tax alert on Decree 117/2025/ND-CP: platform withholding of VAT and personal income tax from 1 July 2025.' },
  kpmgDecree252: { title: 'Decree 252 on tax administration', href: 'https://kpmg.com/vn/en/insights/2026/07/decree-252-on-tax-administration.html', publisher: 'KPMG Vietnam', note: 'Advisory summary: Decree 252/2026/ND-CP replaced Decree 117 from 1 July 2026.' },
  vietnamNewsEcom: { title: 'Viet Nam sees strong e-commerce growth in 2025', href: 'https://vietnamnews.vn/economy/1732871/viet-nam-sees-strong-e-commerce-growth-in-2025.html', publisher: 'Viet Nam News (VNA)', note: 'Department of E-commerce and Digital Economy estimate: about US$31 billion, +25.5%, about 10% of retail sales. Another ministry report estimates US$32 billion, nearly 12%.' },
  vovDomesticReport: { title: 'Vietnam\u2019s retail market hits US$269 bln as e-commerce booms', href: 'https://english.vov.vn/en/economy/vietnams-retail-market-hits-us269-bln-as-e-commerce-booms-report-post1257801.vov', publisher: 'VOV (Voice of Vietnam)', note: 'Reports the Ministry of Industry and Trade\u2019s Vietnam Domestic Market Report 2025.' },
  vnRunningHue: { title: 'Over 12,000 runners take part in VnExpress Marathon Hue 2025', href: 'https://en.vietnamplus.vn/over-12000-runners-take-part-in-vnexpress-marathon-hue-2025-post312997.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Participation at a single event; not a national measure of running.' },
  vnexpressHaiPhong: { title: 'Record 3,000 registrations for the 42 km distance at VM Hai Phong', href: 'https://vnexpress.net/ky-luc-3-000-nguoi-dang-ky-42km-tai-vm-hai-phong-4912788.html', publisher: 'VnExpress', note: 'Event organiser data on registrations and the share choosing the full marathon; Vietnamese-language report.' },
  vnSportsEconomy: { title: 'Sports economics in Vietnam, an overlooked gold mine', href: 'https://www.vietnam.vn/en/kinh-te-the-thao-o-viet-nam-mo-vang-bi-bo-quen-nguoi-viet-bat-dau-chiu-chi-cho-the-thao', publisher: 'Vietnam.vn (Government portal)', note: 'Reports Metric.vn platform sales of pickleball products and consumer spending on sport.' },
  vneconomyTextile: { title: 'Vietnam\u2019s textile exports expected to top $46 bln in 2025', href: 'https://en.vneconomy.vn/vietnams-textile-exports-expected-to-top-46-bln-in-2025.htm', publisher: 'VnEconomy', note: 'Reports VITAS figures: export value, trade surplus and domestic value-added ratio.' },
  vneconomyFootwear: { title: 'Vietnam\u2019s footwear exports gain $29 bln in 2025', href: 'https://en.vneconomy.vn/vietnams-footwear-exports-gain-29-bln-in-2025.htm', publisher: 'VnEconomy', note: 'Reports LEFASO figures for 2025 footwear exports and production capacity.' },
  asemTextile: { title: 'Vietnam\u2019s textile and garment exports in 2025 and targets for 2026', href: 'https://asemconnectvietnam.gov.vn/default.aspx?ID1=2&ID8=146457&ZID1=8', publisher: 'ASEM Connect Vietnam (Ministry of Industry and Trade)', note: 'Government portal summary of VITAS data, product-structure shift and the 2026 target.' },
  vietnamplusEpr: { title: 'Manufacturers, importers commit to embracing recycling responsibilities', href: 'https://en.vietnamplus.vn/manufacturers-importers-commit-to-embracing-recycling-responsibilities-post276972.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Vietnam\u2019s EPR rules from 1 January 2024; the packaging groups named are food, cosmetics, medicines, feed, detergents and cement, not apparel.' },
  betterWorkIlo: { title: 'Better Work celebrates 15 years in Viet Nam', href: 'https://www.ilo.org/resource/news/better-work-celebrates-15-years-viet-nam', publisher: 'International Labour Organization', note: 'Programme reach: over 500 garment, textile and footwear factories and nearly 800,000 workers by 2024.' },
  csdddBriefing: { title: 'EU CSDDD: what Vietnam-based suppliers need to know', href: 'https://www.vietnam-briefing.com/news/eu-sustainability-due-diligence-rules-compliance-implications-for-vietnam-businesses.html/', publisher: 'Vietnam Briefing (Dezan Shira & Associates)', note: 'Secondary advisory analysis; EU timelines are subject to change, so confirm against the EU texts.' },
  yodyAiTryOn: { title: 'AI try-on technology trial for VIP customers', href: 'https://yody.vn/post/thu-do-ai', publisher: 'YODY (brand page)', note: 'Brand description of a limited trial; Vietnamese-language page.' },
  stringeeCanifa: { title: 'Canifa integrates video calling into the C-Live app', href: 'https://stringee.com/en/customers/cau-chuyen-khach-hang-canifa-su-dung-stringee-video-call-api', publisher: 'Stringee (vendor case study)', note: 'Vendor case study of Canifa\u2019s video-consultation app; figures and benefits are as described by the vendor and brand.' },
  thanhnienAi: { title: 'Vietnamese fashion transforms with AI', href: 'https://thanhnien.vn/thoi-trang-viet-chuyen-minh-cung-ai-185250621201133847.htm', publisher: 'Thanh Nien', note: 'Vietnamese-language report quoting the IVY Moda CEO on AI in design and content.' },
  appierKk: { title: 'K&K Fashion success story', href: 'https://www.appier.com/en/success-stories/kk_fashion', publisher: 'Appier (vendor case study)', note: 'Vendor case study of AI-driven personalisation at a Vietnamese women\u2019s fashion brand.' },
  hmVietnamBiz: { title: 'H&M to open more than 7 additional stores in Vietnam in coming years', href: 'https://vietnambiz.vn/hm-se-mo-them-tren-7-cua-hang-trong-vai-nam-toi-o-viet-nam-2025613215911183.htm', publisher: 'Vietnambiz', note: 'Vietnamese-language report comparing H&M store counts in Vietnam and neighbouring markets, June 2025.' },
} satisfies Record<string, FashionM2Source>;
export type FashionM5SourceId = keyof typeof FASHION_M5_SOURCES;
export const citeF5 = (...ids: FashionM5SourceId[]): FashionM2Source[] => ids.map((id) => FASHION_M5_SOURCES[id]);

export const F5DeepDive = F4DeepDive;
export const f5Quiz = f4Quiz;

export function f5Chapter(input: Omit<FashionM5CardData, 'concepts'>): FashionM5CardData {
  return { ...input, concepts: [] };
}
