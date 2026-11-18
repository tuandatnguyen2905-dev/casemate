import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { PHARMACY_M3_SOURCES } from './pharmacyM3Core';

export type PharmacyModule04VisualKind = `pharmacy-m4-${string}`;

export interface PharmacyM4CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: PharmacyModule04VisualKind;
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

export interface PharmacyM4LessonBundle {
  deck: PharmacyM4CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 04 adds broker and press comparisons of the chains, Pharmacity’s 2025–2026 turnaround disclosures,
 * a market survey of chain store counts and the amended Law on Pharmacy’s conditions for pharmacists in charge.
 * Store counts, sales per store and margins differ by date and publisher, so chapters tie each figure to its source.
 */
export const PHARMACY_M4_SOURCES = {
  ...PHARMACY_M3_SOURCES,
  vietcapFrt: { title: 'FRT update report, 3 September 2025', href: 'https://www.vietcap.com.vn/api/cms-api/uploads/file/202509/FRT-20250903-BUY.pdf', publisher: 'Vietcap (broker research)', note: 'Broker estimate of modern pharmacy penetration at about 14% in 2024 and Long Chau’s store count and sales per store at mid-2025.' },
  vietcapRace: { title: 'The pharmacy retail race: the accelerator and the one waiting for break-even', href: 'https://trading.vietcap.com.vn/ai-news/post-detail/cuoc-dua-ban-le-duoc-pham-ke-tang-toc-nguoi-cho-diem-hoa-von', publisher: 'Vietcap AI News (Vietnamese-language)', note: 'Compares Long Chau and An Khang store counts, sales per store and An Khang’s accumulated losses in 2025.' },
  vietcapTraditional: { title: 'Pharmaceutical market: golden opportunity but many challenges', href: 'https://trading.vietcap.com.vn/ai-news/post-detail/thi-truong-duoc-pham-co-hoi-vang-nhung-ngon-ngang-thach-thuc', publisher: 'Vietcap AI News (Vietnamese-language)', note: 'Reports more than 50,000 pharmacies, of which about 95% are traditional, and modern chains at about 5% of outlets.' },
  vietcapVad2024: { title: 'VAD 2024 consumer sector presentation', href: 'https://www.vietcap.com.vn/api/cms-api/uploads/froala/files/Masterclass%20Consumer.pdf', publisher: 'Vietcap (investor event presentation)', note: 'Compares chain sales per store and margins in 2023, modern-chain share and people served per modern pharmacy.' },
  kisRetail2q25: { title: 'Retail 2Q25 earnings review', href: 'https://stockkisvn.vn/wp-content/uploads/2025/08/Retail-2Q25-Earning-Review.pdf', publisher: 'KIS Vietnam (broker research)', note: 'Counts modern pharmacies at 3,475 in the second quarter of 2025 and describes the segment as entering a consolidation phase.' },
  pharmacityPress: { title: 'LeapFrog to invest in Pharmacity (press release)', href: 'https://en.acnnewswire.com/press-release/english/107379/', publisher: 'ACN Newswire (company press release)', note: 'Company statement of more than 1,100 stores, profitability in the fourth quarter of 2025 and growth in the first quarter of 2026.' },
  investorPharmacity: { title: 'Pharmacity returns to expansion after turnaround, but Vietnam’s pharmacy market has changed', href: 'https://theinvestor.vn/pharmacity-returns-to-expansion-after-turnaround-but-vietnams-pharmacy-market-has-changed-d19526.html', publisher: 'The Investor', note: 'Describes Pharmacity’s network peak and reduction, return to profit and revised 2030 store target.' },
  cafefPharmacity: { title: 'Pharmacity profitable from Q4 2025 and preparing to raise capital from LeapFrog', href: 'https://cafef.vn/chuoi-nha-thuoc-pharmacity-co-lai-tu-q4-2025-chuan-bi-huy-dong-them-von-tu-leapfrog-investments-188260528075345089.chn', publisher: 'CafeF (Vietnamese-language)', note: 'Reports stores opened in 2025, break-even of new store cohorts and the plan for 500 more stores in three years.' },
  qmeSeries: { title: 'Pharmacy chain store counts in Vietnam, 2019–2025 (Q&Me modern trade data)', href: 'https://bg.sgpjbg.com/task/7587565.html', publisher: 'Report aggregator reproducing Q&Me data', note: 'Time series and brand-by-region store counts for 2019 to 2025; a secondary reproduction of the Q&Me report.' },
  shsPharmacy: { title: 'The US$10 billion pharmaceutical pie: how Long Chau, Pharmacity and An Khang share it', href: 'https://vn.stockproxx.com/mieng-banh-duoc-pham-10-ty-usd-long-chau-pharmacity-va-an-khang-dang-chia-thi-phan-the-nao', publisher: 'Stockproxx, summarising SHS research (Vietnamese-language)', note: 'End-2025 store counts for Long Chau, Pharmacity, An Khang and Trung Son, and the view that modern chains hold under 10% of the market.' },
  fptRetail2025: { title: 'FPT Retail beats its 2025 business plan', href: 'https://baophapluat.vn/fpt-retail-frt-vuot-ke-hoach-kinh-doanh-nam-2025.html', publisher: 'Vietnam Law Newspaper (Vietnamese-language)', note: 'Reports FPT Retail’s 2025 results: Long Chau pharmacies and vaccination centres, revenue, share of group revenue and customers served.' },
  pharmacyLawConsolidated: { title: 'Consolidated Law on Pharmacy 39/VBHN-VPQH of 2025', href: 'https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Van-ban-hop-nhat-39-VBHN-VPQH-2025-Luat-Duoc-652012.aspx', publisher: 'Thu Vien Phap Luat (Vietnamese-language)', note: 'Consolidated text including Articles 11, 17a and 18 on practice certificates and the pharmacist in charge of a pharmacy or pharmacy chain.' },
  law44Summary: { title: 'Law No. 44/2024/QH15 amending the Law on Pharmacy', href: 'https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Luat-Duoc-sua-doi-2024-so-44-2024-QH15-583839.aspx?anchor=dieu_1', publisher: 'Thu Vien Phap Luat (Vietnamese-language)', note: 'Summary of the 2024 amendments, including new conditions for pharmacy chains and bans on certain online sales.' },
} satisfies Record<string, FashionM2Source>;
export type PharmacyM4SourceId = keyof typeof PHARMACY_M4_SOURCES;
export const citeP4 = (...ids: PharmacyM4SourceId[]): FashionM2Source[] => ids.map((id) => PHARMACY_M4_SOURCES[id]);

export const P4DeepDive = F2DeepDive;
export const p4Quiz = f2Quiz;

export function p4Chapter(input: Omit<PharmacyM4CardData, 'concepts'>): PharmacyM4CardData {
  return { ...input, concepts: [] };
}
