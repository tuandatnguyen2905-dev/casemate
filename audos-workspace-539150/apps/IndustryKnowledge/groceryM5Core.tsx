import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { GROCERY_M4_SOURCES } from './groceryM4Core';

export type GroceryModule05VisualKind = `grocery-m5-${string}`;

export interface GroceryM5CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: GroceryModule05VisualKind;
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

export interface GroceryM5LessonBundle {
  deck: GroceryM5CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 05 adds national retail and e-commerce policy targets, the Deloitte 2026 global retail
 * outlook, payment statistics, packaging rules and company technology disclosures. Targets are
 * policy aims, not forecasts, and company results are as the companies reported them.
 */
export const GROCERY_M5_SOURCES = {
  ...GROCERY_M4_SOURCES,
  retailStrategy2326: { title: 'Decision 2326/QD-TTg approving the strategy for development of Vietnam\u2019s retail market through 2030', href: 'https://english.luatvietnam.vn/decisionno2326-qd-ttgdatedoctober212025oftheprimeministerapprovingthestrategyfordevelopmentofvietnamsretailmarketthrough2030-415895-doc1.html', publisher: 'LuatVietnam (legal database, English text)', note: 'Prime Minister\u2019s decision of 21 October 2025 setting retail growth and e-commerce targets to 2030; targets are aims, not forecasts.' },
  ecommercePlan: { title: 'National E-commerce Development Master Plan 2026\u20132030 approved', href: 'https://en.vecom.vn/national-e-commerce-development-master-plan-2026-2030-approved', publisher: 'Vietnam E-commerce Association (VECOM), reporting Decision 1568/QD-BCT', note: 'Ministry of Industry and Trade plan with targets for e-commerce growth, share of goods retail, cashless transactions and regional balance; policy targets, not forecasts.' },
  deloitte2026: { title: '2026 Retail Industry Global Outlook', href: 'https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook.html', publisher: 'Deloitte Insights', note: 'Global survey of 330 retail executives on AI, retail media and marketing; global findings, not specific to Vietnam.' },
  deloitteMedia: { title: 'Retail media gets personal with AI', href: 'https://action.deloitte.com/insight/4886/retail-media-gets-personal-with-ai', publisher: 'Deloitte', note: 'Part of the 2026 retail outlook series on retail media networks and in-house AI-enabled marketing.' },
  sbvPayments: { title: '2025 cashless payment value nearly 28 times GDP', href: 'https://en.vietnamplus.vn/2025-cashless-payment-value-nearly-28-times-gdp-post337178.vnp', publisher: 'VietnamPlus (reporting the State Bank of Vietnam)', note: 'State Bank figures on non-cash payment value, QR code growth and ATM and POS trends for 2025.' },
  vneconomyPayments: { title: 'Non-cash payments reach 28 times GDP in 2025', href: 'https://en.vneconomy.vn/non-cash-payments-reach-28-times-gdp-in-2025.htm', publisher: 'VnEconomy (reporting the State Bank of Vietnam)', note: 'Growth in non-cash transaction volume and value by channel in 2025, including QR codes.' },
  napas2025: { title: 'NAPAS 2025 member organization conference', href: 'https://en.napas.com.vn/napas-2025-member-organization-conference-184260317124736875.htm', publisher: 'NAPAS (National Payment Corporation of Vietnam)', note: 'Operator\u2019s account of 2025 volumes, VietQR growth and contactless and cross-border payment launches.' },
  adbPetRecycling: { title: 'Market research: PET recycling in Viet Nam', href: 'https://www.adb.org/sites/default/files/institutional-document/1123256/market-research-pet-recycling-viet-nam.pdf', publisher: 'Asian Development Bank', note: 'Summarises extended producer responsibility under Decree 08/2022/ND-CP, including mandatory recycling rates for plastic packaging from 2024.' },
  plasticRoadmap: { title: 'After 2025, no single-use plastic products or non-biodegradable plastic packaging in shopping centres and supermarkets', href: 'https://moit.gov.vn/bao-ve-moi-truong/sau-nam-2025-khong-luu-hanh-va-su-dung-san-pham-nhua-su-dung-mot-lan-bao-bi-nhua-kho-phan-huy-sinh-hoc-tai-cac-trung-tam.html', publisher: 'Ministry of Industry and Trade of Vietnam', note: 'Explains Article 64 of Decree 08/2022/ND-CP on the plastic roadmap; Vietnamese-language page.' },
  winareMasan: { title: 'Technology applications optimize supply chain and reduce losses in modern retail', href: 'https://www.masangroup.com/news/masan-news/technology-applications-optimize-supply-chain-and-reduce-losses-in-modern-retail/', publisher: 'Masan Group (company news)', note: 'Company-reported results of the WiNARE automated ordering system in a 614-store Ho Chi Minh City pilot from May to August 2025.' },
  supraNews: { title: 'New store models: WinCommerce may open 1,000 more stores this year', href: 'https://tapchicongthuong.vn/trien-khai-mo-hinh-cua-hang-moi--wincommerce-co-the-mo-them-1-000-diem-ban-trong-nam-nay-133235.htm', publisher: 'Tap chi Cong Thuong (Industry and Trade Magazine)', note: 'Reports Masan\u2019s statements on the Supra logistics platform, shelf availability, cash cycle and the Win urban format; Vietnamese-language article, early 2025.' },
  wcmQ3Plan: { title: 'WinCommerce targets third-quarter revenue above VND 10,000 billion', href: 'https://vnexpress.net/wincommerce-dat-muc-tieu-doanh-thu-quy-iii-vuot-10-000-ty-4943834.html', publisher: 'VnExpress (Vietnamese-language business news)', note: 'Reports WinCommerce\u2019s 2025 store openings by August, the rural share, the WiNARE rollout plan and the cost and price pressures the company cited.' },
  bhxRecord: { title: 'Vietnam\u2019s retail grocery chain Bach Hoa Xanh reaches record store count', href: 'https://theinvestor.vn/vietnams-retail-grocery-chain-bach-hoa-xanh-reaches-record-store-count-d16113.html', publisher: 'The Investor', note: 'Mid-2025 store counts for Bach Hoa Xanh and WinCommerce and Bach Hoa Xanh\u2019s in-house logistics approach.' },
} satisfies Record<string, FashionM2Source>;
export type GroceryM5SourceId = keyof typeof GROCERY_M5_SOURCES;
export const citeG5 = (...ids: GroceryM5SourceId[]): FashionM2Source[] => ids.map((id) => GROCERY_M5_SOURCES[id]);

export const G5DeepDive = F2DeepDive;
export const g5Quiz = f2Quiz;

export function g5Chapter(input: Omit<GroceryM5CardData, 'concepts'>): GroceryM5CardData {
  return { ...input, concepts: [] };
}
