import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { ENT_SOURCES } from './entM1Core';
import type { EntM1CardData, EntSourceId } from './entM1Core';

export { EntDeepDive, entQuiz } from './entM1Core';

export type EntModule03VisualKind = `ent-m3-${string}`;

export interface EntM3CardData extends Omit<EntM1CardData, 'visualKind'> {
  visualKind: EntModule03VisualKind;
}

export interface EntM3LessonBundle {
  deck: EntM3CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 03 reuses the Module 01 source library and adds sources on Vietnamese SaaS and SME software adoption.
 * Company figures (MISA, FPT), survey results, third-party market estimates and our own arithmetic are labelled
 * separately and never combined.
 */
const EXTRA_SOURCES = {
  misaPress: { title: 'MISA được vinh danh là doanh nghiệp dẫn đầu về giải pháp tài chính – kế toán, quản trị doanh nghiệp và phát triển AI', href: 'https://www.misa.vn/154347/misa-duoc-vinh-danh-la-doanh-nghiep-dan-dau-ve-giai-phap-tai-chinh-ke-toan-quan-tri-doanh-nghiep-va-phat-trien-ai/', publisher: 'MISA (company press release, 9 October 2025; Vietnamese-language)', note: 'Company claims after a VINASA Top 10 ceremony: accounting software used by more than 214,000 businesses at end-2024 and 254,556 after seven months of 2025, projected 283,385 by year-end (+32.3%); 33% market share in Q2 2025; MISA SME used by over 220,000 businesses; MISA AMIS used by nearly 300,000 of about 1 million active businesses; software connects with e-invoices, digital signatures and e-commerce platforms. A vendor’s own figures.' },
  misaAccounting: { title: 'MISA online accounting software: pricing and customers', href: 'https://amis.misa.vn/en/accounting/', publisher: 'MISA (company website)', note: 'Annual subscription plans for AMIS Accounting from VND 2,950,000 a year (1 user) to VND 8,150,000 (3 users); states 250,706+ enterprises using the software. Vendor list prices and claims.' },
  misaPlatform: { title: 'MISA AMIS enterprise management platform', href: 'https://amis.misa.vn/en/', publisher: 'MISA (company website)', note: 'Describes MISA AMIS as a cloud platform of 40+ applications across finance, sales, HR and operations with a pay-as-you-go SaaS model and no server investment; claims 351,750 enterprises. Lists an AMIS Accounting Starter price of VND 2,450,000 a year that differs from the VND 2,950,000 on the accounting page, so current prices must be checked. Vendor claims.' },
  worldBankSme: { title: 'Challenges with digital technology adoption by SMEs: A case study from Viet Nam', href: 'https://blogs.worldbank.org/en/allaboutfinance/challenges-with-digital-technology-adoption-by-smes--a-case-stud', publisher: 'World Bank blog (study of a Vietnamese cloud ERP provider)', note: 'Digital SME programme from June 2021: free access to three modules (internal communications, HR, CRM) for one year, equal to about US$84 a month; 605 firms (about 40 employees on average) responded to Facebook and VnExpress advertising; close to 80% used the platform after initial training, about 40% afterwards, and only 35% still used it about 18 months later.' },
  vietnamplusSme: { title: 'Chuyển đổi số doanh nghiệp Việt Nam: Chính sách hỗ trợ cần thiết', href: 'https://www.vietnamplus.vn/chuyen-doi-so-trong-doanh-nghiep-can-su-ho-tro-tu-chinh-sach-post1054268.vnp', publisher: 'VietnamPlus (Vietnamese-language; citing a VINASME and Ministry of Science and Technology survey, May–June 2025)', note: 'National survey across 60 provinces: 69% of businesses at basic use (email, accounting software), 16% at system integration (ERP, CRM, IoT), 10% fully digitised with AI, 5% not started; Decision 1567/QD-BKHCN of 30 June 2025 sets digital transformation assessment criteria.' },
  kenCloudErp: { title: 'Vietnam Cloud ERP for SMEs market report, 2025–2031', href: 'https://www.kenresearch.com/vietnam-cloud-erp-for-smes-market', publisher: 'Ken Research (market research summary)', note: 'Third-party estimates: Vietnam cloud ERP for SMEs about US$126.8 million in 2025 rising to US$356.7 million by 2031; about 183,000 paid SME subscriptions and 21.0% paid penetration of addressable SMEs in 2025; SMEs over 97% of about 900,000 active businesses in 2024. Scope covers cloud ERP subscriptions and related services and excludes standalone accounting products and large-enterprise-only contracts.' },
} satisfies Record<string, FashionM2Source>;

export const ENT_M3_SOURCES = EXTRA_SOURCES;
const ALL_SOURCES = { ...ENT_SOURCES, ...EXTRA_SOURCES } satisfies Record<string, FashionM2Source>;
export type Ent3SourceId = EntSourceId | keyof typeof EXTRA_SOURCES;
export const citeEnt3 = (...ids: Ent3SourceId[]): FashionM2Source[] => ids.map((id) => ALL_SOURCES[id]);

export function entM3Chapter(input: Omit<EntM3CardData, 'concepts'>): EntM3CardData {
  return { ...input, concepts: [] };
}
