import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';

export type PharmacyModule01VisualKind = `pharmacy-m1-${string}`;

export interface PharmacyM1CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: PharmacyModule01VisualKind;
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

export interface PharmacyM1LessonBundle {
  deck: PharmacyM1CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 01 for pharmacy retail draws on company-linked analyst reports, trade-press store counts,
 * the amended Law on Pharmacy and its guiding texts, demographic and out-of-pocket spending studies,
 * and global operator disclosures. Market-size and share figures use different definitions in
 * different sources and are never combined; store counts are tied to a reporting date.
 */
export const PHARMACY_SOURCES = {
  frtReport2026: { title: 'Company Report: FPT Digital Retail JSC (FRT) \u2013 Long Chau pharmacy chain continues to spearhead growth', href: 'https://gtht.com.vn/wp-content/uploads/2026/02/EN-GTJASVN-RS_FRT-Equity-Report-_Long-Chau-pharmacy-chain-continues-to-spearhead-growth-_TP188687_Feb-4-2026.pdf', publisher: 'Guotai Junan Securities Vietnam (equity research)', note: 'February 2026 broker report: Long Chau network at end-2025, its share of FRT revenue, estimated market share and the 2024 pharmacy retail market value (citing Euromonitor).' },
  virChains: { title: 'Pharmacy chain players change tack', href: 'https://vir.com.vn/pharmacy-chain-players-change-tack-125266.html', publisher: 'Vietnam Investment Review', note: 'Trade-press overview of market fragmentation, the independent share, chain expansion, OTC forecasts and the position of Long Chau, Pharmacity, An Khang and Trung Son.' },
  qmeChains: { title: 'Long Chau pulls ahead with more than half of chain stores; An Khang no longer present in Hanoi', href: 'https://cafebiz.vn/cuc-dien-thi-truong-nha-thuoc-long-chau-vuon-minh-ap-dao-chiem-hon-50-thi-phan-an-khang-khong-con-hien-dien-o-ha-noi-176250516154352628.chn', publisher: 'CafeBiz (reporting the Q&Me modern trade report; Vietnamese-language)', note: 'Reports Q&Me chain pharmacy counts for 2025, the share of Long Chau stores outside Hanoi and Ho Chi Minh City, and An Khang\u2019s accumulated losses at end-2024.' },
  imarcRetail: { title: 'Vietnam Pharmacy Retail Market Size & Forecast 2034', href: 'https://www.imarcgroup.com/vietnam-pharmacy-retail-market', publisher: 'IMARC Group (market research)', note: 'Commercial estimate of Vietnam pharmacy retail at about US$9.5 billion in 2025; definitions differ from other sources.' },
  imarcPharma: { title: 'Vietnam Pharmaceuticals Market Size and Growth 2026\u20132034', href: 'https://www.imarcgroup.com/vietnam-pharmaceuticals-market', publisher: 'IMARC Group (market research)', note: 'Commercial estimate of the whole Vietnamese pharmaceutical market at about US$8.0 billion in 2025; a different scope from pharmacy retail.' },
  univdatos: { title: 'Vietnam Pharmacy Retail Market: Current Analysis and Forecast (2025\u20132033)', href: 'https://pdf.marketpublishers.com/univdatos/vietnam-pharmacy-retail-market-current-analysis-n-forecast.pdf', publisher: 'UnivDatos (market research)', note: 'Cites VDSC for about 50,000 retail pharmacies at 31 October 2024 and roughly 85% share for small independents.' },
  vneconomyPharma: { title: 'Vietnam eyes $10 bln pharma market by 2026, ramps up investment attraction and production', href: 'https://en.vneconomy.vn/vietnam-eyes-10-bln-pharma-market-by-2026-ramps-up-investment-attraction-production.htm', publisher: 'VnEconomy', note: 'Overview of the pharmaceutical market (about US$7 billion in 2025), manufacturing facilities, wholesalers and retailers, imports and public-hospital share.' },
  asemImports: { title: 'Pharmaceutical import markets in 2024', href: 'https://asemconnectvietnam.gov.vn/default.aspx?ID1=2&ID8=141416&ZID1=8', publisher: 'AsemconnectVietnam (citing General Department of Customs and VITIC)', note: 'Pharmaceutical imports of nearly US$4.4 billion in 2024, up 27.9%, by main supplier country.' },
  tcbsPharma: { title: 'Pharmaceutical Industry Report', href: 'https://finance.vietstock.vn/downloadedoc/22488', publisher: 'TCBS Research (Vietnamese-language)', note: 'Broker report noting that domestic medicines are about 60% of volume but about 46% of value.' },
  ibaSurvey: { title: 'Trade and Distribution of Therapeutic Products Survey \u2013 Vietnam', href: 'https://www.ibanet.org/document?id=Healthcare-Survey-2026-Vietnam', publisher: 'International Bar Association, Healthcare and Life Sciences Law Committee', note: 'Legal survey of licensing, retailer conditions, foreign-invested enterprise limits and the legal documents effective from 1 July 2025.' },
  bakerMckenzie: { title: 'Vietnam: Guiding regulations effective from 1 July 2025 concerning Amended Pharmaceutical Law 2024', href: 'https://www.bakermckenzie.com/en/insight/publications/alerts/2025/08/vietnam-guiding-regulations-effective-from-1-july-2025-concerning-amended', publisher: 'Baker McKenzie', note: 'Law-firm summary of Decree 163/2025/ND-CP and Circular 31/2025/TT-BYT, including e-commerce information and packaging requirements.' },
  decree163: { title: 'Decree No. 163/2025/ND-CP detailing a number of articles of the Law on Pharmacy', href: 'https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-163-2025-nd-cp-45343.htm', publisher: 'Official Gazette of Vietnam (Vietnamese-language)', note: 'Government decree issued 29 June 2025 and effective 1 July 2025.' },
  ecomRules: { title: 'Regulations on pharmaceutical business by e-commerce', href: 'https://congbaokhanhhoa.gov.vn/noi-dung/id/4033/Quy-dinh-ve-kinh-doanh-duoc-theo-phuong-thuc-thuong-mai-dien-tu', publisher: 'Khanh Hoa Provincial Gazette, reporting Chinhphu.vn (Vietnamese-language)', note: 'Plain summary of the information that pharmacies selling online must publish and the packaging details required under Decree 163/2025/ND-CP.' },
  unfpaAgeing: { title: 'Population Ageing and Older Persons in Viet Nam', href: 'https://vietnam.unfpa.org/sites/default/files/pub-pdf/ageing_report_from_census_2019_eng_final27082021.pdf', publisher: 'UNFPA Viet Nam (2019 census monograph)', note: 'Medium-fertility projections of the older population to 2069, including 16.53% aged 60+ in 2029 and the 2036 aged-population threshold.' },
  vnplusAging: { title: 'Rapid population aging: A wake-up call for policy reform', href: 'https://en.vietnamplus.vn/rapid-population-aging-a-wake-up-call-for-policy-reform-post326875.vnp', publisher: 'VietnamPlus', note: 'Reports 14.2 million people aged 60+ in 2024, the age-group structure and a Ministry of Health view of the 2030 outlook.' },
  vssNcd: { title: 'Viet Nam Social Security news: diabetes and treatment cost management', href: 'https://vss.gov.vn/english/news/Pages/vietnam-social-security.aspx?CateID=198&ItemID=12817', publisher: 'Vietnam Social Security', note: 'Ministry of Health figure of 73.7% of disease burden and mortality from non-communicable diseases, and diabetes spending from the health-insurance fund in 2025.' },
  worldBankOop: { title: 'Trends and Differentials in Household Out-of-Pocket Spending for Health in Viet Nam, 2010\u20132022', href: 'https://doi.org/10.1596/43785', publisher: 'World Bank', note: 'About 40% of current health expenditure paid out of pocket; pharmaceuticals about 75% of out-of-pocket spending in 2022; health-insurance coverage 91%.' },
  springerElderly: { title: 'Household financial burden associated with healthcare for older people in Viet Nam', href: 'https://link.springer.com/article/10.1186/s12961-022-00913-3', publisher: 'Health Research Policy and Systems (Springer Nature)', note: 'Cross-sectional survey of households with people aged 60+: out-of-pocket burden, chronic conditions and financial distress.' },
  pharmacity2025: { title: 'Pharmacity reports nine-month 2025 revenue up 32%, network reaches 991 stores', href: 'https://doanhnhan.baophapluat.vn/pharmacity-bao-doanh-thu-9-thang-2025-tang-32-mang-luoi-dat-991-cua-hang-88763.html', publisher: 'Doanh nhan (Vietnamese-language business news)', note: 'Pharmacity store count at 30 September 2025 and nine-month revenue growth, after earlier restructuring.' },
  anKhang2025: { title: 'An Khang pharmacy chain keeps losing in 2025 while Long Chau reports large profit', href: 'https://www.tinnhanhchungkhoan.vn/nam-2025-chuoi-nha-thuoc-an-khang-tiep-tuc-lo-chuoi-long-chau-bao-lai-lon-post384797.html', publisher: 'Tin nhanh chung khoan (Vietnamese-language)', note: 'An Khang store count, 2025 revenue and loss and accumulated loss; Long Chau pharmacy count at end-2025.' },
  pharmacyPlayers: { title: 'Long Chau, Pharmacity and who else is sharing the billion-dollar pharmacy retail pie', href: 'https://doanhnhanvn.vn/long-chau-pharmacity-va-nhung-cai-ten-nao-dang-chia-phan-mieng-banh-ty-do-nganh-ban-le-duoc-pham.html', publisher: 'Doanh nhan Viet Nam (Vietnamese-language)', note: 'Background on Pharmacity restructuring, An Khang\u2019s 2023\u20132024 store changes and the Trung Son Pharma investment by Dongwha.' },
  pdplLaw: { title: 'Law on Personal Data Protection 2025, No. 91/2025/QH15', href: 'https://thuvienphapluat.vn/van-ban/EN/Bo-may-hanh-chinh/Law-91-2025-QH15-Personal-Data-Protection/665440/tieng-anh.aspx', publisher: 'LuatVietnam / Thu Vien Phap Luat (English text)', note: 'Law effective 1 January 2026; Article 26 covers health information, and Article 8 sets maximum administrative fines.' },
  walgreensPress: { title: 'Walgreen Co. to operate as private standalone company following acquisition by Sycamore Partners', href: 'https://corporate.walgreens.com/news-and-stories/press-releases/2025/walgreen-co-to-operate-as-private-standalone-company-followingacquisition-by-sycamore-partners/', publisher: 'Walgreens (company press release)', note: 'Company statement of 28 August 2025 on private ownership, about 8,500 stores and about 220,000 team members.' },
  sycamoreDeal: { title: 'Sycamore Partners completes acquisition of Walgreens Boots Alliance', href: 'https://www.sycamorepartners.com/news-article/sycamore-partners-completes-acquisition-of-walgreens-boots-alliance', publisher: 'Sycamore Partners', note: 'Announces completion on 28 August 2025 and that Walgreens, Boots and other businesses operate as separate standalone companies.' },
  cvsWalgreens: { title: 'CVS Health vs Walgreens in the U.S. Pharmacy Market', href: 'https://www.mmcginvest.com/post/cvs-health-vs-walgreens-in-the-u-s-pharmacy-market', publisher: 'MMCG Invest (independent analysis)', note: 'Estimated 2025 U.S. pharmacy retail revenue shares of about 21% for CVS and 20% for Walgreens; estimates, not audited figures.' },
  walgreensCredit: { title: 'Is Walgreens still investment grade in 2026?', href: 'https://investmentgrade.com/walgreens-takeover-investment-grade/', publisher: 'InvestmentGrade.com (credit analysis)', note: 'Summarises the October 2024 plan to close about 1,200 Walgreens stores over three years and the Rite Aid bankruptcy.' },
} satisfies Record<string, FashionM2Source>;
export type PharmacySourceId = keyof typeof PHARMACY_SOURCES;
export const citeP1 = (...ids: PharmacySourceId[]): FashionM2Source[] => ids.map((id) => PHARMACY_SOURCES[id]);

export const P1DeepDive = F2DeepDive;
export const p1Quiz = f2Quiz;

export function p1Chapter(input: Omit<PharmacyM1CardData, 'concepts'>): PharmacyM1CardData {
  return { ...input, concepts: [] };
}
