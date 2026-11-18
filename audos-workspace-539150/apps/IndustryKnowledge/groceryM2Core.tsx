import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { GROCERY_SOURCES } from './groceryM1Core';

export type GroceryModule02VisualKind = `grocery-m2-${string}`;

export interface GroceryM2CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: GroceryModule02VisualKind;
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

export interface GroceryM2LessonBundle {
  deck: GroceryM2CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 02 adds company disclosures, broker research and government logistics and
 * traceability publications to the grocery source set. Company figures are reported as the
 * company published them and, where publishers disagree, the note says which one is used.
 */
export const GROCERY_M2_SOURCES = {
  ...GROCERY_SOURCES,
  vietcapGrocery: { title: 'Grocery sector update report, October 2024', href: 'https://www.vietcap.com.vn/api/cms-api/uploads/file/202410/GrocerySector-20241021.pdf', publisher: 'Vietcap Securities (broker research)', note: 'Broker analysis of the fragmented fresh-food chain, retailer sourcing and market shares; estimates are the broker\u2019s own.' },
  mwgBusiness2025: { title: 'Mobile World Group: full-year 2025 business summary', href: 'https://cdnv2.tgdd.vn/mwgvn/investorrelations/files/posts/2026/1/5547/dd/0d/dd0da3558bf8b2b2ec32771c3261c00d.pdf', publisher: 'Mobile World Investment Corporation (MWG)', note: 'Company-reported Bach Hoa Xanh results for 2025: revenue, store count, online share and profit status; Vietnamese-language document.' },
  nhsvMwg: { title: 'MWG initiation report: Bach Hoa Xanh leads the acceleration', href: 'https://nhsv.vn/bao-cao/mwg-mua-bao-cao-dinh-gia-lan-dau-bach-hoa-xanh-dan-da-tang-toc-era-blue-mo-rong-chuoi-tang-truong.html', publisher: 'NH Securities Vietnam (broker research)', note: 'Broker estimate of Bach Hoa Xanh\u2019s 2025 profit near VND 800 billion and 2,559 stores; the company itself did not publish the chain\u2019s profit.' },
  vnexpressBhx: { title: 'Bach Hoa Xanh sells over VND 100 billion a day', href: 'https://vnexpress.net/bach-hoa-xanh-ban-hon-tram-ty-dong-moi-ngay-5008801.html', publisher: 'VnExpress', note: 'News report on MWG\u2019s 2025 results for Bach Hoa Xanh; the company did not publish the chain\u2019s profit or margin.' },
  winEcoFarms: { title: 'WinCommerce and the WinEco clean-vegetable brand', href: 'https://cand.vn/wincommerce-gop-phan-lam-day-duong-chat-mam-com-viet-post719670.html', publisher: 'Nhan dan Cong an (cand.vn)', note: 'Describes WinEco\u2019s farms and WIN-member discounts; company claims as reported; Vietnamese-language article.' },
  winCommerceExpansion: { title: 'WinCommerce aims for Q3 revenue exceeding 10 trillion VND', href: 'https://www.vietnam.vn/en/wincommerce-dat-muc-tieu-doanh-thu-quy-iii-vuot-10-000-ty-dong', publisher: 'Vietnam.vn (Government portal)', note: 'Reports WinCommerce\u2019s new-store openings to the end of August 2025 and the share located in rural areas, as stated by the company.' },
  logisticsCostPortal: { title: 'Optimising logistics', href: 'https://logistics.gov.vn/dich-vu-logistics/toi-uu-cho-logistics', publisher: 'Vietnam Logistics portal (Ministry of Industry and Trade)', note: 'Logistics cost as a share of GDP in Vietnam and in comparison countries; Vietnamese-language page, March 2024.' },
  logisticsStrategy: { title: 'Vietnam logistics service development strategy 2025\u20132035, vision to 2050', href: 'https://moit.gov.vn/chuyen-muc/chien-luoc-quy-hoach-ke-hoach-phat-trien/chien-luoc-phat-trien-dich-vu-logistics-viet-nam-thoi-ky-2025-2035-tam-nhin-den-2050.html', publisher: 'Ministry of Industry and Trade of Vietnam', note: 'Decision 2229/QD-TTg of 9 October 2025: targets for logistics cost, outsourcing and digitalisation.' },
  fiinColdChain: { title: 'FiinGroup on Vietnam\u2019s cold chain growth potential, CO-REF Vietnam 2025', href: 'https://fiinresearch.vn/NewsInsights/NewsDetail?id=11461188', publisher: 'FiinGroup', note: 'Research-firm estimate of cold-chain market size and growth; not an official statistic.' },
  productQualityLaw: { title: 'New rules on traceability and supply-chain transparency from 1 January 2026', href: 'https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/chinh-sach-moi/90687/quy-dinh-moi-ve-truy-xuat-nguon-goc-va-minh-bach-chuoi-cung-ung-san-pham-hang-hoa-tu-01-01-2026', publisher: 'ThuVienPhapLuat (legal database)', note: 'Legal-database summary of the amended Law on Product and Goods Quality (No. 78/2025/QH15), Article 6d; Vietnamese-language.' },
  traceCircular: { title: 'Circular 02/2024/TT-BKHCN on product and goods traceability', href: 'https://english.luatvietnam.vn/khoa-hoc/circular-02-2024-tt-bkhcn-management-of-product-and-goods-traceability-308660-d1.html', publisher: 'LuatVietnam (legal database, English text)', note: 'Sets the one-step-forward, one-step-back principle and the national standards for tracing codes and data carriers.' },
} satisfies Record<string, FashionM2Source>;
export type GroceryM2SourceId = keyof typeof GROCERY_M2_SOURCES;
export const citeG2 = (...ids: GroceryM2SourceId[]): FashionM2Source[] => ids.map((id) => GROCERY_M2_SOURCES[id]);

export const G2DeepDive = F2DeepDive;
export const g2Quiz = f2Quiz;

export function g2Chapter(input: Omit<GroceryM2CardData, 'concepts'>): GroceryM2CardData {
  return { ...input, concepts: [] };
}
