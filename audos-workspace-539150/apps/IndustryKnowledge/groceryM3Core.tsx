import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { GROCERY_M2_SOURCES } from './groceryM2Core';

export type GroceryModule03VisualKind = `grocery-m3-${string}`;

export interface GroceryM3CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: GroceryModule03VisualKind;
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

export interface GroceryM3LessonBundle {
  deck: GroceryM3CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 03 adds company annual reports and investor presentations, NielsenIQ and Kantar consumer
 * research, e-commerce analytics and Vietnamese legal texts. Company and analyst figures are
 * reported as published; notes say what each figure covers and where scopes differ (a chain, a
 * federation, a platform panel, or the whole retail sector).
 */
export const GROCERY_M3_SOURCES = {
  ...GROCERY_M2_SOURCES,
  masanAr2025: { title: 'Masan Group Annual Report 2025', href: 'https://cafef1.mediacdn.vn/download/080426/msn123009-bao-cao-thuong-nien-2025-1-607434.pdf', publisher: 'Masan Group (company report)', note: 'Company-reported WinCommerce store counts, new-store economics, rural performance, WiN membership and Kantar channel-share estimates for 2025.' },
  masanFy2025: { title: 'Masan recorded 1.6x YoY earnings for FY2025, achieving all-time-high profit', href: 'https://www.masangroup.com/news/press-releases/msn-recorded-16x-yoy-earnings-for-fy2025-achieving-all-time-high-profit/', publisher: 'Masan Group (press release)', note: 'WinCommerce 2025 revenue, profit after tax, margin, working capital and new-store breakeven results, as the company reported them.' },
  vnexpressWincommerce: { title: 'WinCommerce\u2019s strategy for sustainable growth', href: 'https://e.vnexpress.net/news/business/wincommerce-s-strategy-for-sustainable-growth-4786752.html', publisher: 'VnExpress International', note: 'Describes WinCommerce\u2019s private labels, WiN membership benefits and store formats in 2024, as relayed from the company.' },
  vnexpressFirstProfits: { title: 'How Winmart, Bach Hoa Xanh grocery chains make first profits', href: 'https://e.vnexpress.net/news/business/companies/how-winmart-bach-hoa-xanh-grocery-chains-make-first-profits-4787900.html', publisher: 'VnExpress International', note: 'Store formats, Bach Hoa Xanh\u2019s fresh-food share of products and store-size limits, with analyst comments, in 2024.' },
  coopPrivateLabel: { title: 'Saigon Co.op\u2019s private label products are shaping a new shopping experience', href: 'https://www.vietnam.vn/en/hang-nhan-rieng-saigon-co-op-dinh-hinh-loi-mua-sam-moi', publisher: 'Vietnam.vn (Government portal)', note: 'Private-label range, tiers, share of sales and repeat-purchase rates reported by Saigon Co.op for the period to the third quarter of 2025.' },
  coopPrivateLabel2500: { title: 'Saigon Co.op private-label goods exceed 2,500 products', href: 'https://taichinhdoanhnghiep.net.vn/hang-nhan-rieng-saigon-coop-vuot-2500-san-pham-d70004.html', publisher: 'Tai chinh Doanh nghiep (Vietnamese-language business magazine)', note: 'Later report of the private-label range, the three product lines and the price gap against comparable products.' },
  coop2025: { title: 'Saigon Co.op: 2025 revenue exceeds VND 32,000 billion', href: 'https://tphcm.chinhphu.vn/saigon-coop-doanh-thu-nam-2025-vuot-32000-ty-dong-101260318082934385.htm', publisher: 'Ho Chi Minh City Government portal (chinhphu.vn)', note: 'Saigon Co.op federation revenue for 2025, number of outlets and its consumer-cooperative plan; federation-wide, not Co.opmart alone.' },
  circleK: { title: 'About Circle K Vietnam', href: 'https://www.circlek.com.vn/vi/gioi-thieu/', publisher: 'Circle K Vietnam (company website)', note: 'Company statement of its licensed-brand model, first store in December 2008 and more than 500 stores in July 2025; Vietnamese-language page.' },
  kedGs25: { title: 'GS25 becomes No. 1 convenience store chain in southern Vietnam', href: 'https://www.kedglobal.com/business-politics/newsView/ked202308030002', publisher: 'KED Global (Korea Economic Daily)', note: 'GS25 store count in southern Vietnam, start of franchising in 2021 and franchise numbers, as of mid-2023.' },
  fiinModernTrade: { title: 'Robust development of minimarts and CVS: modern trade sector preview, August 2024', href: 'https://fiingroup.vn/upload/docs/14.-FiinGroup-Modern-Trade-Sector-Preview-Aug-2024-(1).pdf', publisher: 'FiinGroup', note: 'Research-firm estimates for 2023 of channel shares of total retail, convenience-store points of sale and concentration of the top ten chains in 2022; covers all retail, not grocery alone.' },
  bjcMmvn: { title: 'MMVN acquisition presentation, December 2025', href: 'https://bjc.listedcompany.com/misc/PRESN/20251217-bjc-mmvn.pdf', publisher: 'Berli Jucker (BJC) investor presentation', note: 'Format mix, customer mix, direct-sourcing platforms and traditional-grocery partnership network of MM Mega Market Vietnam in 2025, as presented by the prospective acquirer.' },
  metricEcommerce2025: { title: 'Online retail sales in Vietnam jump 35% to over $16 bln in 2025', href: 'https://theinvestor.vn/online-retail-sales-in-vietnam-jump-35-to-over-16-bln-in-2025-report-d18140.html', publisher: 'The Investor (reporting analytics firm Metric)', note: 'Four-platform gross merchandise value for 2025 and platform shares; covers all categories, not grocery alone.' },
  superApps: { title: 'Super apps wage billion-dollar race for Viet Nam\u2019s digital shopping carts', href: 'https://vietnamnews.vn/economy/1723090/super-apps-wage-billion-dollar-race-for-viet-nam-s-digital-shopping-carts.html', publisher: 'Viet Nam News', note: 'Reports Metric data on 2024 platform sales, growth of groceries and food, and quick-delivery grocery services.' },
  niqVocal: { title: 'Vocal for Local: Vietnamese consumers are redefining the path to purchase', href: 'https://nielseniq.com/global/en/insights/analysis/2025/vocal-for-local-vietnamese-consumers-are-redefining-the-path-to-purchase/', publisher: 'NielsenIQ (NIQ)', note: 'Survey findings on support for local products and Gen Z attitudes, October 2025.' },
  niqTariffs: { title: 'From tariffs to opportunity', href: 'https://nielseniq.com/global/en/insights/analysis/2025/from-tariffs-to-opportunity/', publisher: 'NielsenIQ (NIQ)', note: 'Regional consumer mindsets, polarisation between trading down and trading up, Tet demand and premium motivators in Vietnam, 2025.' },
  qandmeChannels: { title: 'Popularity of general trade and modern trade stores and their image', href: 'https://qandme.net/en/report/popularity-of-gt-and-mt-stores-and-their-image.html', publisher: 'Q&Me (online market research)', note: 'Small survey of 200 women aged 20\u201349 in Ho Chi Minh City and Hanoi; indicative of urban attitudes only.' },
  hanoitimesPromo: { title: 'Supermarket promotions boost Vietnamese goods, expand reach to consumers', href: 'https://hanoitimes.vn/supermarket-promotions-boost-vietnamese-goods-expand-reach-to-consumers.850458.html', publisher: 'The Hanoi Times', note: 'Supermarket campaign discounts and loyalty offers in 2025, and Ministry of Industry and Trade figures on the share of Vietnamese goods on shelves.' },
  consumerLaw: { title: 'The 2023 Law on Protection of Consumer Rights takes effect on 1 July 2024', href: 'https://moit.gov.vn/tin-tuc/thong-bao/luat-bao-ve-quyen-loi-nguoi-tieu-dung-nam-2023-chinh-thuc-co-hieu-luc-tu-ngay-1-7-2024.html', publisher: 'Ministry of Industry and Trade of Vietnam', note: 'Announces Law 19/2023/QH15, its structure and Decree 55/2024/ND-CP; Vietnamese-language page.' },
  consumerLawRetail: { title: 'Key consumer-protection responsibilities of retail distributors', href: 'https://www.bvntd.gov.vn/tintuc_sukien/mot-so-trach-nhiem-quan-trong-ve-bao-ve-quyen-loi-nguoi-tieu-dung-cua-cac-to-chuc-ca-nhan-phan-phoi-ban-le-hang-tieu-dung/', publisher: 'Vietnam Competition and Consumer Authority portal (bvntd.gov.vn)', note: 'Explains retailer duties under Articles 10 and 14 of the 2023 consumer-protection law; Vietnamese-language page.' },
  consumerLawEn: { title: 'Law on Protection of Consumer Rights No. 19/2023/QH15', href: 'https://english.luatvietnam.vn/thuong-mai/law-on-protection-of-consumer-rights-no-19-2023-qh15-259732-d1.html', publisher: 'LuatVietnam (legal database, English text)', note: 'English summary and text, including the vulnerable-consumer groups protected from July 2024.' },
  foodSafetyLaw: { title: 'Law on Food Safety No. 55/2010/QH12', href: 'https://vanban.chinhphu.vn/default.aspx?docid=96032&pageid=27160', publisher: 'Government of Vietnam (official legal portal)', note: 'Sets obligations of food businesses including safety conditions and record keeping; Vietnamese-language text.' },
  competitionLaw: { title: 'Competition Law No. 23/2018/QH14', href: 'https://thuvienphapluat.vn/van-ban/Doanh-nghiep/Luat-canh-tranh-345182.aspx', publisher: 'ThuVienPhapLuat (legal database)', note: 'Vietnam\u2019s competition law on anti-competitive agreements, dominant positions and economic concentration; Vietnamese-language text.' },
  franchiseDecree: { title: 'Decree 35/2006/ND-CP on commercial franchising', href: 'https://www.moj.gov.vn/vbpq/en/lists/vn%20bn%20php%20lut/view_detail.aspx?itemid=5762', publisher: 'Ministry of Justice of Vietnam (legal information system, English text)', note: 'Original text of the franchising decree under the 2005 Commercial Law; later amended, so check the current consolidated version.' },
  franchiseGuide: { title: 'Franchise investment conditions in Vietnam 2026', href: 'https://www.dedica-law.com/en/articles/dieu-kien-dau-tu-nhuong-quyen-thuong-hieu-franchise-tai-viet-nam-2026', publisher: 'DEDICA Law Firm', note: 'Law-firm summary of franchisor conditions and the registration procedure; general information, not legal advice.' },
  avrAbout: { title: 'About the Association of Vietnam Retailers', href: 'https://hiephoibanle.com.vn/gioi-thieu-hiep-hoi/', publisher: 'Association of Vietnam Retailers (AVR)', note: 'Association\u2019s own statement of its founding decision, purpose and voluntary non-profit status; Vietnamese-language page.' },
  avrForum: { title: 'Vietnam Retail Forum reviews 10-year retail market growth', href: 'https://en.vietnamplus.vn/vietnam-retail-forum-reviews-10-year-retail-market-growth-post123262.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Reports AVR membership and its role connecting retailers and state agencies at its tenth anniversary in 2017.' },
  retailMediaRates: { title: 'AEON Vietnam advertising channels and rates', href: 'https://www.aeon.com.vn/media', publisher: 'AEON Vietnam (company website)', note: 'Published in-store advertising prices and monthly reach for screens, carts and other media; Vietnamese-language page.' },
  cartAdvertising: { title: 'Advertising on shopping carts nationwide', href: 'https://ssm.vn/en/advertising-on-shopping-carts-nationwide-lotte-bigc-vinmart/', publisher: 'Sixth Sense Media (advertising agency)', note: 'Agency\u2019s price range for cart advertising at major supermarket chains in 2025; a commercial price list, not an audited figure.' },
  virConvenience: { title: 'Foreign brands keep up their convenience store dominance', href: 'https://vir.com.vn/foreign-brands-keep-up-their-convenience-store-dominance-126243.html', publisher: 'Vietnam Investment Review (VIR)', note: 'Analysis of foreign convenience chains in Vietnam and the customers each targets; store counts in the article are dated and should be checked against company updates.' },
  kantarOutlook: { title: 'Vietnam FMCG Outlook 2025', href: 'https://www.kantarworldpanel.com/vn/news/vietnam-fmcg-outlook-2025', publisher: 'Kantar Worldpanel Vietnam', note: 'Describes how price, value, convenience and experience guide Vietnamese consumers amid rising food prices and uncertainty, February 2025.' },
  euromonitorSupermarkets: { title: 'Supermarkets in Vietnam', href: 'https://www.euromonitor.com/supermarkets-in-vietnam/report', publisher: 'Euromonitor International', note: 'Summary of 2025 supermarket value shares; the full report is paywalled.' },
} satisfies Record<string, FashionM2Source>;
export type GroceryM3SourceId = keyof typeof GROCERY_M3_SOURCES;
export const citeG3 = (...ids: GroceryM3SourceId[]): FashionM2Source[] => ids.map((id) => GROCERY_M3_SOURCES[id]);

export const G3DeepDive = F2DeepDive;
export const g3Quiz = f2Quiz;

export function g3Chapter(input: Omit<GroceryM3CardData, 'concepts'>): GroceryM3CardData {
  return { ...input, concepts: [] };
}
