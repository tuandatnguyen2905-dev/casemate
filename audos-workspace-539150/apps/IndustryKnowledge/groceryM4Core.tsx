import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { GROCERY_M3_SOURCES } from './groceryM3Core';

export type GroceryModule04VisualKind = `grocery-m4-${string}`;

export interface GroceryM4CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: GroceryModule04VisualKind;
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

export interface GroceryM4LessonBundle {
  deck: GroceryM4CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 04 adds the NRF and Kantar global retailer ranking, the Ministry of Industry and Trade
 * 2025 domestic market report, company pages and agricultural value-chain studies. Where
 * publishers disagree (store counts, modern-trade share, platform value) the lesson says which
 * figure it uses and why.
 */
export const GROCERY_M4_SOURCES = {
  ...GROCERY_M3_SOURCES,
  nrfTop50: { title: 'Top 50 Global Retailers 2025', href: 'https://nrf.com/research-insights/top-retailers/top-50-global-retailers/top-50-global-retailers-2025', publisher: 'National Retail Federation (NRF), compiled by Kantar', note: 'Ranking of international retailers by points from 2024 retail revenue; total company revenue and store counts are listed but do not set the rank, and retailers must operate directly in at least three countries.' },
  nrfPress: { title: 'NRF reveals 2025 Top 50 Global Retailers', href: 'https://nrf.com/media-center/press-releases/nrf-reveals-2025-top-50-global-retailers', publisher: 'National Retail Federation (NRF)', note: 'Press release naming the top ten: Walmart, Amazon, Schwarz Group, Aldi, Costco, Ahold Delhaize, Carrefour, Seven & i, IKEA and The Home Depot.' },
  nrfBlog: { title: 'A look at 2025\u2019s Top 50 Global Retailers', href: 'https://nrf.com/blog/a-look-at-2025s-top-50-global-retailers', publisher: 'National Retail Federation (NRF)', note: 'Kantar commentary on Walmart\u2019s and Amazon\u2019s positions and on how retail-specific revenue is counted.' },
  moitDomestic2025: { title: 'Vietnam domestic market report 2025', href: 'https://cdn.hstatic.net/files/200000884965/file/bao_cao_thi_truong_noi_dia_2025_bo_cong_thuong_2.pdf', publisher: 'Ministry of Industry and Trade of Vietnam (Domestic Market Department)', note: 'Vietnamese-language report with channel shares, e-commerce estimates and 2025 outlet counts and plans for major chains; its own figures differ between text and tables.' },
  mmvnAbout: { title: 'About MM Mega Market Vietnam', href: 'https://mmvietnam.com/mm-mega-market-2/', publisher: 'MM Mega Market Vietnam (company website)', note: 'Company account of its change from Metro Cash & Carry in 2016 and its wholesale and retail model; Vietnamese-language page.' },
  centralRetailFood: { title: 'Food retail: Central Retail Vietnam', href: 'https://centralretail.com.vn/hoat-dong-kinh-doanh/thuc-pham/', publisher: 'Central Retail Vietnam (company website)', note: 'Company description of its hypermarket and supermarket formats and sales channels; Vietnamese-language page.' },
  centralRetailNews: { title: 'Central Retail books $208m loss after Nguyen Kim sale', href: 'https://thoibaotaichinhvietnam.vn/central-retail-books-208m-loss-after-nguyen-kim-sale-193155.html', publisher: 'Vietnam Financial Times (Thoi bao Tai chinh Viet Nam)', note: 'Reports Central Retail Vietnam\u2019s end-2025 store counts under the GO!, Tops Market and LanChi brands.' },
  aeonExpansion: { title: 'AEON plans $1.5 bln investment in Vietnam over next decade', href: 'https://en.vneconomy.vn/aeon-plans-15-bln-investment-in-vietnam-over-next-decade.htm', publisher: 'VnEconomy', note: 'AEON Vietnam\u2019s end-2025 network by format and its ten-year investment plan.' },
  adbHorticulture: { title: 'Dysfunctional horticulture value chains and the need for modern marketing infrastructure: the case of Viet Nam', href: 'https://www.adb.org/sites/default/files/publication/534726/dysfunctional-horticulture-value-chains-viet-nam.pdf', publisher: 'Asian Development Bank', note: 'Describes the collector and wholesaler chain for vegetables, farmers\u2019 share of retail price and FAO-based post-harvest loss estimates; an older study, so use as structural evidence.' },
  celFoodLosses: { title: 'Food losses in Vietnam: the shocking reality', href: 'https://www.foodlogistics.com/transportation/cold-chain/article/21010074/cel-consulting-food-losses-in-vietnam-the-shocking-reality', publisher: 'Food Logistics (reporting a CEL Consulting survey)', note: 'Survey-based estimates of food losses by category and cold-chain use among producers, from about 2018; dated.' },
  worldBankTrace: { title: 'Digital technology for traceability in Vietnam\u2019s fruit and vegetable value chains', href: 'https://documents1.worldbank.org/curated/en/099724310182330688/pdf/IDU03bd6b7680aa0804d260a4120c0c008620286.pdf', publisher: 'World Bank', note: 'Discusses post-harvest losses, low processing rates and the role of traceability in Vietnamese fruit and vegetable chains.' },
  aciarTrace: { title: 'Piloting digital monitoring of VietGAP compliance and quality in Vietnam vegetable value chains', href: 'https://www.aciar.gov.au/sites/default/files/2023-06/agb-2021-153-final-report.pdf', publisher: 'Australian Centre for International Agricultural Research (ACIAR)', note: 'Pilot with Son La cooperatives supplying AEON and Mega Market in Hanoi using QR codes and GPS temperature loggers; a small pilot, not an industry average.' },
  pdplLaw: { title: 'Law on Personal Data Protection takes effect on 1 January 2026', href: 'https://mps.gov.vn/chinh-sach-phap-luat/bai-viet/luat-bao-ve-du-lieu-ca-nhan-chinh-thuc-co-hieu-luc-thi-hanh-tu-ngay-01-01-2026-1767186124', publisher: 'Ministry of Public Security of Vietnam', note: 'Announces Law 91/2025/QH15 and the basic data rights it creates; Vietnamese-language page.' },
  pdplRetail: { title: 'Customer data protection in Vietnam franchises', href: 'https://www.dedica-law.com/en/articles/bao-ve-du-lieu-khach-hang-trong-chuoi-nhuong-quyen-tai-viet-nam', publisher: 'DEDICA Law Firm', note: 'Law-firm explanation of how Law 91/2025/QH15 and Decree 356/2025/ND-CP apply to loyalty programmes, location data and consent; general information, not legal advice.' },
} satisfies Record<string, FashionM2Source>;
export type GroceryM4SourceId = keyof typeof GROCERY_M4_SOURCES;
export const citeG4 = (...ids: GroceryM4SourceId[]): FashionM2Source[] => ids.map((id) => GROCERY_M4_SOURCES[id]);

export const G4DeepDive = F2DeepDive;
export const g4Quiz = f2Quiz;

export function g4Chapter(input: Omit<GroceryM4CardData, 'concepts'>): GroceryM4CardData {
  return { ...input, concepts: [] };
}
