import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { PHARMACY_SOURCES } from './pharmacyM1Core';

export type PharmacyModule02VisualKind = `pharmacy-m2-${string}`;

export interface PharmacyM2CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: PharmacyModule02VisualKind;
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

export interface PharmacyM2LessonBundle {
  deck: PharmacyM2CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 02 adds the 2025 industry review in a listed manufacturer’s annual report, a government-backed
 * industry strategy summary, wholesale and logistics reporting, and the 2025 circulars on prescriptions,
 * pharmacy practice and recalls. Company figures are reported as the company published them, and where
 * sources disagree the chapter note says so instead of choosing one silently.
 */
export const PHARMACY_M2_SOURCES = {
  ...PHARMACY_SOURCES,
  dhgReport2025: { title: 'Report on business and production activities in 2025 and plan for 2026', href: 'https://dhgpharma.com.vn/sites/default/files/2026-03/7.%20BC001%20Report%20of%20the%20BOM%20in%202025.pdf', publisher: 'DHG Pharma (company annual report to shareholders)', note: 'Industry review citing IQVIA market size, establishment counts, imports, API imports and EU-GMP capacity; a company report, so figures are as the company cited them.' },
  vneconomyStrategy: { title: 'New perspective for pharmaceutical industry', href: 'https://en.vneconomy.vn/new-perspective-for-pharmaceutical-industry.htm', publisher: 'VnEconomy', note: 'Summary of the national pharmaceutical development strategy: domestic share of volume and value, 2030 targets, GMP plants, vaccines and technology transfer.' },
  nhandanApi: { title: 'Focusing potential to develop the pharmaceutical industry', href: 'https://nhandan.vn/tap-trung-tiem-nang-de-phat-trien-cong-nghiep-duoc-post897250.html', publisher: 'Nhan Dan newspaper (Vietnamese-language)', note: 'Reports more than 90% import dependence for raw materials and the generic-medicine focus of local manufacturers.' },
  imexpharmDeck: { title: 'Imexpharm Corporation investor presentation', href: 'https://www.vietcap.com.vn/api/cms-api/uploads/froala/files/VAD%202025%20-%20IMP.pdf', publisher: 'Vietcap investor event (company presentation)', note: 'Company-reported licensed products, EU-GMP lines, OTC and hospital network reach and chain sales share.' },
  sgAnalytics: { title: 'Pharmaceutical market size, opportunities and companies in Vietnam', href: 'https://www.sganalytics.com/blog/pharmaceutical-market-and-companies-in-vietnam/', publisher: 'SG Analytics (market research)', note: 'Estimates wholesale concentration of about 40% for the top three foreign-owned wholesalers and notes that foreign firms cannot distribute directly.' },
  vietnamnetDistribution: { title: 'Alliances aim to control drug distribution market', href: 'https://vietnamnet.vn/en/alliances-aim-to-control-drug-distribution-market-E199978.html', publisher: 'VietnamNet', note: 'Older trade report on foreign and local drug distributors; used for qualitative roles only, not for current shares.' },
  nhipcauWholesale: { title: 'The new game of pharmaceutical eB2B', href: 'https://nhipcaudautu.vn/kinh-doanh/cuoc-choi-moi-cua-eb2b-duoc-pham-3346350/', publisher: 'Nhip Cau Dau Tu (Vietnamese-language, citing IQVIA)', note: 'Wholesale agents by IQVIA count, the large foreign distributors and the emergence of online business-to-business platforms.' },
  longChauLogistics: { title: 'FPT Long Chau’s rapid expansion secrets', href: 'https://nhathuoclongchau.com.vn/bai-viet/bi-quyet-mo-coi-than-toc-cua-fpt-long-chau.html', publisher: 'FPT Long Chau (company website, Vietnamese-language)', note: 'Company description of its two central warehouses, order volumes, warehouse systems and delivery commitments.' },
  longChauWms: { title: 'Software house operates a comprehensive central warehouse system for FPT Long Chau', href: 'https://chungta.vn/cong-nghe/nha-phan-mem-van-hanh-he-thong-quan-ly-kho-tong-toan-dien-cho-fpt-long-chau-1139887.html', publisher: 'Chung Ta (FPT group technology news, Vietnamese-language)', note: 'Describes the 2025 warehouse management system with planning-based picking, OCR receiving and automated replenishment.' },
  circular26: { title: 'Circular 26/2025/TT-BYT on prescribing modern medicines in outpatient treatment', href: 'https://thuvienphapluat.vn/van-ban/EN/The-thao-Y-te/Circular-26-2025-TT-BYT-prescription-of-modern-drugs-in-outpatient-treatment/670082/tieng-anh.aspx', publisher: 'Thu Vien Phap Luat (English text)', note: 'Effective 1 July 2025; sets the electronic-prescription roadmap for hospitals and other facilities.' },
  circular11: { title: 'Circular 11/2025/TT-BYT amending the 2018 pharmacy practice circulars', href: 'https://english.luatvietnam.vn/y-te/circular-11-2025-tt-byt-amend-circular-02-2018-tt-byt-circular-03-2018-tt-byt-and-circular-36-2018-tt-byt-400532-d1.html', publisher: 'LuatVietnam (English text)', note: 'Amends the good pharmacy, distribution and storage practice circulars, including IT connection, e-commerce consultation records and e-prescription handling.' },
  circular30: { title: 'Circular 30/2025/TT-BYT on drug quality standards, testing and recall', href: 'https://english.luatvietnam.vn/circular-no-30-2025-tt-byt-dated-july-01-2025-of-the-ministry-of-health-guiding-the-application-of-quality-standards-testing-of-drugs-and-medicinal-404438-doc1.html', publisher: 'LuatVietnam (English text)', note: 'Sets how defective drugs are reported, assessed by level and recalled.' },
  medibaseRetail: { title: 'Pharmaceutical distribution and retail in Vietnam', href: 'https://medibase.vn/medicine/distribution-retail/', publisher: 'Medibase (independent reference site)', note: 'Secondary summary of wholesaler and retailer conditions under the 2025 legal reset; verify against the official texts.' },
  worldBankEprescription: { title: 'National e-prescription system, Viet Nam (project document)', href: 'https://documents1.worldbank.org/curated/en/099061825002572377/pdf/P181325-ae7d87dd-ef50-4ecc-a94f-a0310bf6391b.pdf', publisher: 'World Bank', note: 'Describes how pharmacies pull e-prescriptions by code and report sales to the national database.' },
} satisfies Record<string, FashionM2Source>;
export type PharmacyM2SourceId = keyof typeof PHARMACY_M2_SOURCES;
export const citeP2 = (...ids: PharmacyM2SourceId[]): FashionM2Source[] => ids.map((id) => PHARMACY_M2_SOURCES[id]);

export const P2DeepDive = F2DeepDive;
export const p2Quiz = f2Quiz;

export function p2Chapter(input: Omit<PharmacyM2CardData, 'concepts'>): PharmacyM2CardData {
  return { ...input, concepts: [] };
}
