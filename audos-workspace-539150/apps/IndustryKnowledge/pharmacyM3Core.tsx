import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { PHARMACY_M2_SOURCES } from './pharmacyM2Core';

export type PharmacyModule03VisualKind = `pharmacy-m3-${string}`;

export interface PharmacyM3CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: PharmacyModule03VisualKind;
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

export interface PharmacyM3LessonBundle {
  deck: PharmacyM3CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 03 adds broker research on Long Chau’s 2025 results, company programme pages for franchise and
 * partnership models, the e-commerce rules for medicines, and workforce data. Company and broker figures
 * are reported as published; where sources disagree, the chapter note says so.
 */
export const PHARMACY_M3_SOURCES = {
  ...PHARMACY_M2_SOURCES,
  acbsFrt: { title: 'FRT update: outperform (6 March 2026)', href: 'https://acbs.com.vn/acbsmedia/2026/03/FRT-by-ACBS_Update-Mar-6th-2026.pdf', publisher: 'ACBS Research (broker research)', note: 'Broker estimates of Long Chau revenue, gross margin of 23.4% in 2025 versus 22.2% in 2024, pre-tax profit and store counts including vaccination centres.' },
  kbsvFrt: { title: 'Long Chau is a long-term driver (FRT initiation)', href: 'https://www.kbsec.com.vn/pic/Service/KBSV_Initiation_FRT_Eng.pdf', publisher: 'KB Securities Vietnam (broker research)', note: '2023 initiation report: pharmacy-only model, rural expansion, about six months to break even for new stores as stated by management.' },
  rongvietFrt: { title: 'FPT Digital Retail JSC company report, October 2024', href: 'https://vdsc.com.vn/data/api/app/file-storage/8afb6fb3-3924-44b1-591a-08dcf9a2f68a/FRT_Company%20Report_Oct%202024_Eng_New.pdf', publisher: 'VDSC / Rong Viet Securities (broker research)', note: 'Broker view of Long Chau’s revenue contribution, market share assumptions and vaccination-centre business.' },
  longChauAvg2025: { title: 'Average 2025 revenue of each Long Chau pharmacy reaches VND 1.2 billion a month', href: 'https://thoibaotaichinhvietnam.vn/doanh-thu-binh-quan-nam-2025-moi-cua-hang-nha-thuoc-long-chau-dat-12-ty-dongthang-191619.html', publisher: 'Vietnam Financial Times (Vietnamese-language)', note: 'Reports FRT’s 2025 results and the average monthly revenue per Long Chau pharmacy.' },
  longChauNetMargin: { title: 'FPT Retail: Long Chau keeps growing, FPT Shop returns to profit', href: 'https://kinhtechungkhoan.vn/fpt-retail-frt-long-chau-giu-nhip-tang-truong-fpt-shop-co-lai-tro-lai-1425733.html', publisher: 'Kinh te Chung khoan (Vietnamese-language)', note: 'Reports a Long Chau net profit margin of about 2.1% in 2025.' },
  kennoLongChau: { title: 'Long Chau builds a healthcare business around its pharmacy network', href: 'https://kenno.com/insights/long-chau-builds-a-healthcare-business-around-its-pharmacy-network', publisher: 'Kenno (independent analysis)', note: 'Describes the Long Chau Plus pharmacy and convenience format and the analyst view that supplements and personal care carry higher margins.' },
  vietbiz2021: { title: 'Vietnam’s pharmaceutical retail market: potential for development of pharmacy chains', href: 'https://vietbiz.jp/en/maproject-pharmaceuticals-2/', publisher: 'VietBiz (market report summary, 2021 data)', note: 'Dated 2021 comparison of chain sales per store and sales mix; used only for historical context.' },
  aktaPharmacity: { title: 'Pharmacity company profile', href: 'https://akta.pro/company-profiles/000269l/pharmacity', publisher: 'Akta (company profile aggregator)', note: 'Third-party profile describing Pharmacity’s revenue lines and private-label range since 2015; not a company disclosure.' },
  techsciEpharmacy: { title: 'Vietnam e-pharmacy market size, share and forecast', href: 'https://www.techsciresearch.com/report/vietnam-e-pharmacy-market/7901.html', publisher: 'TechSci Research (market research)', note: 'Recent developments including Long Chau’s VNeID online purchase service and Pharmacity’s 2025 partnerships.' },
  dav1136: { title: 'Official dispatch 1136/QLD-KD of 2025 on inspecting pharmaceutical business', href: 'https://luatvietnam.vn/y-te/cong-van-1136-qld-kd-2025-thanh-tra-kiem-tra-xu-ly-vi-pham-hoat-dong-kinh-doanh-duoc-398129-d6.html', publisher: 'LuatVietnam (Vietnamese-language)', note: 'Drug Administration letter of 21 April 2025 quoting the amended law’s bans on online retail of certain medicines.' },
  vnexpressGs25: { title: 'Trung Son Pharma and GS25 launch a pharmacy and convenience store model', href: 'https://vnexpress.net/trung-son-pharma-bat-tay-gs25-ra-mat-mo-hinh-nha-thuoc-cua-hang-tien-loi-4859911.html', publisher: 'VnExpress (Vietnamese-language)', note: 'First pharmacy and convenience store at GS25 in Go Cong, Tien Giang; Trung Son has more than 230 pharmacies.' },
  vbiPhano: { title: 'Phano Pharmacy joins Masan’s new ecosystem', href: 'https://vietnambusinessinsider.vn/phano-pharmacy-chuoi-duoc-pham-vua-tham-gia-vao-he-sinh-thai-moi-cua-masan-la-ai-a24157.html', publisher: 'Vietnam Business Insider (Vietnamese-language, 2021)', note: 'Historical example of a pharmacy chain starting franchising in 2016 and partnering with a retail group.' },
  mediPharma: { title: 'Medi Pharma: pharmacy franchise', href: 'https://medipharma.com.vn/', publisher: 'Medi Pharma (company website, Vietnamese-language)', note: 'Company statement of a franchise programme with centralised supply, ERP, training and marketing; claims are the company’s own.' },
  circaFranchise: { title: 'CIRCA pharmacy partnership programme', href: 'https://franchise.circa.vn/', publisher: 'CIRCA (company programme page, Vietnamese-language)', note: 'Describes tiered partnership packages with investment matched by facilities; terms are the company’s own and illustrative.' },
  vietnamnetLongChau: { title: 'Long Chau cooperates with Organon', href: 'https://vietnamnet.vn/long-chau-hop-tac-organon-gop-phan-cham-soc-suc-khoe-phu-nu-viet-2423063.html', publisher: 'VietnamNet (Vietnamese-language)', note: 'Company statement of 2,222 pharmacies, more than 18,000 pharmacists and 28 million customers and families in July 2025.' },
  vnexpressRecruit: { title: 'FPT Long Chau ready to recruit FPT Polytechnic students', href: 'https://vnexpress.net/fpt-long-chau-san-sang-tuyen-dung-sinh-vien-cao-dang-fpt-polytechnic-4875770.html', publisher: 'VnExpress (Vietnamese-language)', note: 'Company statements on 2025 hiring plans and average pharmacist and manager pay.' },
  chungtaTouchpoints: { title: 'Digital touchpoints: when technology brings simplicity and convenience', href: 'https://chungta.vn/cong-nghe/diem-cham-tren-nen-tang-so-khi-cong-nghe-mang-lai-su-don-gian-va-tien-loi-1136764.html', publisher: 'Chung Ta (FPT group technology news, Vietnamese-language)', note: 'Group statements on Long Chau’s delivery commitment under two hours and a returning-customer rate of about 70%; company claims, not independent measures.' },
  pensoftPharmacists: { title: 'Motivation and its determinants among community pharmacists in Vietnam', href: 'https://pharmacia.pensoft.net/article/155839/', publisher: 'Pharmacia (peer-reviewed journal)', note: 'Pharmacist density of 3.41 per 10,000 people in 2016 data and the 2025–2030 target of 4.0.' },
} satisfies Record<string, FashionM2Source>;
export type PharmacyM3SourceId = keyof typeof PHARMACY_M3_SOURCES;
export const citeP3 = (...ids: PharmacyM3SourceId[]): FashionM2Source[] => ids.map((id) => PHARMACY_M3_SOURCES[id]);

export const P3DeepDive = F2DeepDive;
export const p3Quiz = f2Quiz;

export function p3Chapter(input: Omit<PharmacyM3CardData, 'concepts'>): PharmacyM3CardData {
  return { ...input, concepts: [] };
}
