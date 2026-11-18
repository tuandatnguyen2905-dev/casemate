import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import type { VisualSpec } from './fashionVisualKit';

export const COMMERCIAL_BANKING_REVIEW_STATUS = 'Draft / Ready for Review' as const;
export const COMMERCIAL_BANKING_RESTRICTION = 'Verification Required — Do Not Publish' as const;

export type CommercialBankingVisualKind = `cb-m1-${string}` | `cb-m2-${string}` | `cb-m3-${string}` | `cb-m4-${string}` | `cb-m5-${string}`;

export interface BankingNarrative {
  label: 'What it is' | 'How it works' | 'Why it matters' | 'Global example' | 'Vietnam example';
  text: string;
}

export interface BankingCardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: BankingNarrative[];
  visualKind: CommercialBankingVisualKind;
  visualHeading: string;
  visualIntro: string;
  imageAlt: string;
  statTiles: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  statsNote: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: FashionM2Source[];
}

export interface BankingLessonBundle {
  deck: BankingCardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/** A verified Real-World Case Study shown after a chapter's deep dive. See commercialBankingCases.ts. */
export interface BankingCaseStudy {
  bank: string;
  title: string;
  /** Bank & context. */
  context: string;
  /** Business problem. */
  problem: string;
  /** Strategic action. */
  action: string;
  /** Business mechanism. */
  mechanism: string;
  /** Documented outcome with period and source; says so when nothing quantitative is disclosed. */
  outcome: string;
  /** Management trainee takeaway: analysis and hypothetical KPIs, never a reported fact. */
  takeaway: string;
  sources: FashionM2Source[];
  verifiedAt: string;
}

export interface BankingChapterInput extends Omit<BankingCardData, 'concepts' | 'narrative' | 'body' | 'sources'> {
  what: string;
  how: string;
  why: string;
  global: string;
  vietnam: string;
  deepDive: string[];
  evidence: string;
  sourceIds: BankingSourceId[];
  restriction?: string;
  /** Optional verified case rendered after the deep dive; its sources join the chapter's sources. */
  caseStudy?: BankingCaseStudy;
  /** Verified sources for corrected chapter facts that are not in the original source registry. */
  extraSources?: FashionM2Source[];
}

const source = (title: string, href: string, publisher: string, note: string): FashionM2Source => ({ title, href, publisher, note });

/** Source IDs are preserved exactly from WorkspaceDB industry_briefs rows 27–30. */
export const BANKING_SOURCES = {
  'cb-m01-s01': source("The world's largest banks by assets, 2024", 'https://www.spglobal.com/market-intelligence/en/news-insights/research/the-worlds-largest-banks-by-assets-2024', 'S&P Global Market Intelligence', '2024 bank ranking; snippet-verified in row 27.'),
  'cb-m01-s02': source('Basel Framework — risk-based capital', 'https://www.bis.org/basel_framework/chapter/RBC/30.htm', 'BIS / Basel Committee on Banking Supervision', 'Official capital minimums and buffers.'),
  'cb-m01-s03': source('Basel III Liquidity Coverage Ratio', 'https://www.bis.org/publications/201301-standards-basel-iii-liquidity-coverage-ratio-and-liquidity-risk-monitoring-tools', 'BIS / Basel Committee on Banking Supervision', 'Official Basel liquidity standard; source body was not fully fetched in row 27.'),
  'cb-m01-s04': source('Global systemically important banks', 'https://www.fsb.org/work-of-the-fsb/market-and-institutional-resilience/global-systemically-important-financial-institutions-g-sifis/', 'Financial Stability Board', 'Official G-SIB framework; lesson uses the 2022 list count recorded in row 27.'),
  'cb-m01-s05': source('Vietnam financial-sector note', 'https://documents1.worldbank.org/curated/en/099062325135025950/pdf/P171375-ff64d08c-da3d-436a-9327-251c4a74b994.pdf', 'World Bank Group', 'End-September 2024 banking-depth figures; snippet-verified in row 27.'),
  'cb-m01-s06': source('Vietnam Banking Sector Update 2024', 'https://masvn.com/api/attachment/file/1740712265757-20250228ENBankingUpdate2024_Final.pdf', 'Mirae Asset Securities Vietnam, citing SBV', '2024 outstanding-credit growth; secondary source citing SBV.'),
  'cb-m01-s07': source('Law on Credit Institutions 2024', 'https://www.legal500.com/intelligence/vietnam/finance-and-banking/the-new-law-on-credit-institutions-%E2%80%93-what-you-must-know', 'National Assembly law via Legal 500 commentary', 'Law number and effective date; detailed provisions are secondary legal commentary.'),
  'cb-m01-s08': source('System of Credit Institutions', 'https://sbv.gov.vn/en/w/sbv527426', 'State Bank of Vietnam', 'Official, full-text-verified institutional taxonomy.'),
  'cb-m01-s09': source("Vietnam's GDP in 2024 up 7.09%", 'https://en.vietnamplus.vn/vietnams-gdp-in-2024-up-709-post307852.vnp', 'VietnamPlus, citing GSO', 'Official statistics reported by the state news agency.'),
  'cb-m01-s10': source('Vietnam CPI / inflation 2024', 'https://www.nso.gov.vn/', 'General Statistics Office of Vietnam', 'H1-2024 CPI figure; full-year annual average was not isolated.'),
  'cb-m01-s11': source('Vietcombank asset quality', 'https://www.fitchratings.com/research/banks/fitch-affirms-vietcombank-at-bb-outlook-stable-03-11-2025', 'Fitch Ratings', 'End-2024 NPL ratio; snippet-verified.'),
  'cb-m01-s12': source('Digital banking in Vietnam', 'https://www.ascentium.com/vietnam/insights/digital-banking-in-vietnam', 'Ascentium, citing SBV', 'Adult payment-account ownership; secondary source citing SBV.'),
  'cb-m01-s13': source('Deposit-insurance limit from 13 July 2026', 'https://div.gov.vn/tu-ngay-13-7-2026-han-muc-chi-tra-tien-bao-hiem-cua-bao-hiem-tien-gui-viet-nam-la-350-trieu-dong', 'Deposit Insurance of Vietnam', 'Official page, full-text verified. Eligibility details beyond the stated scope remain restricted.'),
  'cb-m01-s14': source('Law No. 96/2025/QH15 — credit-institution amendments', 'https://ngo-partners.com/en/tin-tuc/mechanism-for-seizure-and-realization-of-collateral-under-law-no-96-2025-qh15-some-key-updates-practical-implications/', 'National Assembly law via legal commentary', 'Primary gazetted text was not read; specific provisions remain restricted.'),
  'cb-m02-s01': source('Vietnam financial-sector note', 'https://documents1.worldbank.org/curated/en/099062325135025950/pdf/P171375-ff64d08c-da3d-436a-9327-251c4a74b994.pdf', 'World Bank Group', 'Banking depth and broad NPL measure; definitions must not be mixed.'),
  'cb-m02-s02': source('Liquidity Coverage Ratio — Executive Summary', 'https://www.bis.org/publications/fsi-summary-liquidity-coverage-ratio-lcr-executive-summary', 'BIS / Financial Stability Institute', 'Official, full-text-verified Basel liquidity summary.'),
  'cb-m02-s03': source('Basel Framework — risk-based capital', 'https://www.bis.org/basel_framework/chapter/RBC/30.htm', 'BIS / Basel Committee on Banking Supervision', 'Official capital minimums and buffers.'),
  'cb-m02-s04': source('Vietnam Banking Sector Update 2024', 'https://masvn.com/api/attachment/file/1740712265757-20250228ENBankingUpdate2024_Final.pdf', 'Mirae Asset Securities Vietnam, citing SBV', '2024 outstanding-credit growth; snippet-verified.'),
  'cb-m02-s05': source('Vietnam central bank sets 2024 credit-growth cap', 'https://www.businesstimes.com.sg/international/asean/vietnam-central-bank-sets-2024-credit-growth-cap-banking-system-15', 'The Business Times / Reuters', 'Full-text-verified secondary report.'),
  'cb-m02-s06': source('New Law on Credit Institutions 2024 — Part 2', 'https://legalcentrix.com/media/view/185429', 'Venture North Law Firm via Legal Centrix', 'Full-text legal analysis; not primary legislation.'),
  'cb-m02-s07': source('Vietnam enforces updated bank capital ratios', 'https://english.vov.vn/en/economy/vietnam-enforces-8-capital-adequacy-ratio-for-banks-from-september-15-post1230141.vov', 'Voice of Vietnam, citing SBV / VNA', 'Full-text-verified report on Circular 14/2025 and charter capital.'),
  'cb-m02-s08': source('Circular 41/2016/TT-NHNN', 'https://thuvienphapluat.vn/van-ban/EN/Tien-te-Ngan-hang/Circular-41-2016-TT-NHNN-prescribing-prudential-ratios-operations-banks-and-or-foreign-bank-branches/339636/tieng-anh.aspx', 'State Bank of Vietnam via translation portal', 'Basel II Standardised Approach; snippet-verified.'),
  'cb-m02-s09': source('Techcombank Sets Sights on Next Stage of Growth', 'https://gfmag.com/banking/techcombank-sets-sights-on-next-stage-of-growth-in-vietnam/', 'Global Finance Magazine', 'Sponsored content using company figures; full-text verified.'),
  'cb-m02-s10': source('Techcombank 2024 results', 'https://theinvestor.vn/vietnams-leading-private-lender-techcombank-books-record-profit-in-2024-d14253.html', 'The Investor', 'Company results reported by news; snippet-verified.'),
  'cb-m02-s11': source('Techcombank FY2024 results press release', 'https://techcombank.com/content/dam/techcombank/public-site/documents/techcombank-results-press-release-fy24.pdf', 'Techcombank', 'Official FY2024 results release, 20 January 2025: CASA ratio 40.9% and CASA balance VND230.9tn at 31 December 2024; NPL ratio 1.17%. Do not mix with the FY2025 annual report (CASA 40.4%, NPL 1.13%).'),
  'cb-m02-s12': source('Non-performing loans pose challenge to banking sector', 'https://vir.com.vn/non-performing-loans-pose-challenge-to-banking-sector-125121.html', 'Vietnam Investment Review, citing SBV', 'On-balance-sheet NPL stock; snippet-verified.'),
  'cb-m02-s13': source('2024 Vietnam Annual Consultation Report', 'https://www.amro-asia.org/wp-content/uploads/2025/03/2024-Vietnam-ACR_publication_18Feb2025_SI1.pdf', 'ASEAN+3 Macroeconomic Research Office', 'Regional surveillance report; snippet-verified.'),
  'cb-m02-s14': source('Techcombank ratings affirmed', 'https://www.spglobal.com/ratings/en/regulatory/article/-/view/type/HTML/id/3279656', 'S&P Global Ratings', 'Loan-to-deposit ratio; snippet-verified.'),
  'cb-m02-s15': source('Vietcombank asset quality', 'https://www.fitchratings.com/research/banks/fitch-affirms-vietcombank-at-bb-outlook-stable-03-11-2025', 'Fitch Ratings', 'End-2024 NPL ratio; snippet-verified.'),
  'cb-m02-s16': source('System of Credit Institutions', 'https://sbv.gov.vn/en/w/sbv527426', 'State Bank of Vietnam', 'Official institutional taxonomy.'),
  'cb-m02-s17': source('Vietcombank H1-2024 net profit', 'https://theinvestor.vn/vietnams-largest-lender-vietcombank-sees-h1-net-profit-up-2-on-cost-cuts-d11530.html', 'The Investor', 'Company result reported by news; snippet-verified.'),
  'cb-m02-s18': source('Digital banking in Vietnam', 'https://www.ascentium.com/vietnam/insights/digital-banking-in-vietnam', 'Ascentium, citing SBV', 'Adult payment-account ownership; secondary source.'),
  'cb-m02-s19': source('Circular 31/2024/TT-NHNN — debt classification', 'https://vanban.chinhphu.vn/?classid=1&docid=210625&pageid=27160', 'State Bank of Vietnam / Government Gazette', 'Primary metadata verified; operative PDF unread. Exact DPD bands remain restricted.'),
  'cb-m02-s20': source('Decree 86/2024/NĐ-CP — risk provisions', 'https://chinhphu.vn/?classid=0&docid=210640&pageid=27160', 'Government of Vietnam', 'Primary metadata verified; operative PDF unread. Exact provision rates remain restricted.'),
  'cb-m02-s21': source('Debt-classification principles', 'https://thoibaotaichinhvietnam.vn/quy-dinh-chi-tiet-ve-cac-nguyen-tac-phan-loai-no-cua-ngan-hang-154533.html', 'Thời báo Tài chính Việt Nam', 'Full-text explainer of scope; does not provide DPD bands or provision rates.'),
  'cb-m03-s01': source("The world's largest banks by assets, 2024", 'https://www.spglobal.com/market-intelligence/en/news-insights/research/the-worlds-largest-banks-by-assets-2024', 'S&P Global Market Intelligence', 'Snippet-verified scale and ranking only.'),
  'cb-m03-s02': source('Basel Framework — risk-based capital', 'https://www.bis.org/basel_framework/chapter/RBC/30.htm', 'BIS / Basel Committee on Banking Supervision', 'Official Basel capital minima; global standard, not automatically Vietnam law.'),
  'cb-m03-s03': source('System of Credit Institutions', 'https://sbv.gov.vn/en/w/sbv527426', 'State Bank of Vietnam', 'Official, full-text-verified institutional taxonomy.'),
  'cb-m03-s04': source('Law on Credit Institutions 2024', 'https://www.legal500.com/intelligence/vietnam/finance-and-banking/the-new-law-on-credit-institutions-%E2%80%93-what-you-must-know', 'National Assembly law via Legal 500 commentary', 'Snippet-only legal commentary; detailed operative provisions remain restricted.'),
  'cb-m03-s05': source('Vietnam financial-sector note', 'https://documents1.worldbank.org/curated/en/099062325135025950/pdf/P171375-ff64d08c-da3d-436a-9327-251c4a74b994.pdf', 'World Bank Group', 'Snippet-verified end-September 2024 banking-depth figures.'),
  'cb-m03-s06': source('Vietnam Banking Sector Update 2024', 'https://masvn.com/api/attachment/file/1740712265757-20250228ENBankingUpdate2024_Final.pdf', 'Mirae Asset Securities Vietnam, citing SBV', 'Secondary, snippet-verified outstanding-credit growth.'),
  'cb-m03-s07': source('Digital banking in Vietnam', 'https://www.ascentium.com/vietnam/insights/digital-banking-in-vietnam', 'Ascentium, citing SBV', 'Secondary, snippet-verified payment-account ownership.'),
  'cb-m03-s08': source('Vietcombank asset quality', 'https://www.fitchratings.com/research/banks/fitch-affirms-vietcombank-at-bb-outlook-stable-03-11-2025', 'Fitch Ratings', 'Snippet-verified end-2024 consolidated NPL ratio.'),
  'cb-m03-s09': source('NAPAS network and services', 'https://en.napas.com.vn/', 'NAPAS', 'Official, full-text-verified payment-infrastructure facts current in 2026.'),
  'cb-m03-s10': source('Big 6 banks control over half of reported assets', 'https://vietnamnet.vn/en/big-6-banks-now-control-over-half-of-total-banking-assets-2439376.html', 'VietnamNet', 'Full-text report; 30-bank scope and 30 June 2025 period must be retained.'),
  'cb-m03-s11': source('Big 4 credit and deposit shares', 'https://vietnamnews.vn/economy/1639185/big-4-banks-represent-41-9-of-total-credit-50-of-total-deposits.html', 'Viet Nam News, citing SBV', 'Full-text secondary report using end-2023 system data.'),
  'cb-m03-s12': source('VPBank strategic stake sold to SMBC', 'https://en.vietnamplus.vn/vpbank-sells-15-stake-to-japans-smbc-for-15-bln-usd-post250549.vnp', 'VietnamPlus / Vietnam News Agency', 'Snippet-verified 2023 strategic-investment facts.'),
  'cb-m03-s13': source('Historical deposit-insurance limit', 'https://thuvienphapluat.vn/banan/tin-tuc/what-is-the-maximum-deposit-insurance-payment-limit-in-vietnam-9571.html', 'Thu Vien Phap Luat', 'Superseded secondary source: VND125m is historical only, through 12 July 2026.'),
  'cb-m03-s14': source('Deposit Insurance of Vietnam reserve', 'https://en.vneconomy.vn/deposit-insurance-of-vietnam-reserve-at-3-23-bln.htm', 'VnEconomy', 'Secondary snippet; reserve figure requires primary reconfirmation.'),
  'cb-m03-s15': source('Selected Vietnamese banks’ 2024 profits', 'https://theinvestor.vn/some-vietnamese-banks-post-big-profits-for-2024-d13917.html', 'The Investor', 'Snippet-only selected-bank results; not a system-wide benchmark.'),
  'cb-m03-s16': source('Deposit-insurance limit from 13 July 2026', 'https://div.gov.vn/tu-ngay-13-7-2026-han-muc-chi-tra-tien-bao-hiem-cua-bao-hiem-tien-gui-viet-nam-la-350-trieu-dong', 'Deposit Insurance of Vietnam', 'Official full text: VND350m principal-plus-interest cap from 13 July 2026; detailed eligibility and payout law remain restricted.'),
  'cb-m03-s17': source('Vietcombank H1-2024 net profit', 'https://theinvestor.vn/vietnams-largest-lender-vietcombank-sees-h1-net-profit-up-2-on-cost-cuts-d11530.html', 'The Investor', 'Snippet-only half-year consolidated result; never compare with a full-year figure.'),
  'cb-m03-s18': source('Techcombank FY2024 results press release', 'https://techcombank.com/content/dam/techcombank/public-site/documents/techcombank-results-press-release-fy24.pdf', 'Techcombank', 'Official FY2024 results release, 20 January 2025: CASA ratio 40.9% and NPL ratio 1.17% at 31 December 2024. Do not mix with the FY2025 annual report (CASA 40.4%, NPL 1.13%).'),
  'cb-m03-s19': source('Techcombank 2024 results', 'https://theinvestor.vn/vietnams-leading-private-lender-techcombank-books-record-profit-in-2024-d14253.html', 'The Investor', 'Snippet-only CASA balance and growth.'),
  'cb-m03-s20': source('Law No. 96/2025/QH15', 'https://vbpl.moj.gov.vn/bocongthuong/Pages/vbpq-toanvan.aspx?ItemID=179292', 'National Assembly via Ministry of Justice database', 'Primary text did not render; this source supports no specific operative claim.'),
  'cb-m04-s01': source("The world's largest banks by assets, 2024", 'https://www.spglobal.com/market-intelligence/en/news-insights/research/the-worlds-largest-banks-by-assets-2024', 'S&P Global Market Intelligence', 'Snippet-verified rankings and asset scale only.'),
  'cb-m04-s02': source('Basel capital minimums and buffers', 'https://www.bis.org/basel_framework/chapter/RBC/30.htm', 'BIS / Basel Committee on Banking Supervision', 'Official Basel standard; not a statement of Vietnam-specific implementation.'),
  'cb-m04-s03': source('Digital banking in Vietnam', 'https://www.ascentium.com/vietnam/insights/digital-banking-in-vietnam', 'Ascentium, citing SBV', 'Secondary snippet for reported payment-account ownership.'),
  'cb-m04-s04': source('Vietnam financial-sector note', 'https://documents1.worldbank.org/curated/en/099062325135025950/pdf/P171375-ff64d08c-da3d-436a-9327-251c4a74b994.pdf', 'World Bank Group', 'Snippet-verified end-September 2024 banking-depth figures.'),
  'cb-m04-s05': source('Big 6 banks control over half of reported assets', 'https://vietnamnet.vn/en/big-6-banks-now-control-over-half-of-total-banking-assets-2439376.html', 'VietnamNet', 'Full-text report; 30-bank scope and 30 June 2025 period must be retained.'),
  'cb-m04-s06': source('Big 4 credit and deposit shares', 'https://vietnamnews.vn/economy/1639185/big-4-banks-represent-41-9-of-total-credit-50-of-total-deposits.html', 'Viet Nam News, citing SBV', 'Full-text secondary report using end-2023 system data.'),
  'cb-m04-s07': source('Vietcombank asset quality', 'https://www.fitchratings.com/research/banks/fitch-affirms-vietcombank-at-bb-outlook-stable-03-11-2025', 'Fitch Ratings', 'Snippet-verified end-2024 consolidated NPL ratio.'),
  'cb-m04-s08': source('Vietcombank Annual Report 2024', 'https://www.vietcombank.com.vn/-/media/Project/VCB-Sites/VCB/Nha-Dau-tu/Files/BC-dinh-ky/BC-thuong-nien/2024/EN_VCB-Annual-Report-2024_Full_250426_FN_compressed.pdf', 'Vietcombank', 'Official annual report: FY2024 PBT VND42,236bn and key indicators read in the text on 17 November 2026.'),
  'cb-m04-s09': source('Techcombank FY2024 results', 'https://techcombank.com/content/dam/techcombank/public-site/documents/techcombank-results-press-release-fy24.pdf', 'Techcombank', 'Company-release snippet for FY2024 PBT and operating income growth.'),
  'cb-m04-s10': source('Techcombank Annual Report 2024', 'https://techcombank.com/content/dam/techcombank/public-site/documents/bao-cao-thuong-nien-nam-2024-eng.pdf', 'Techcombank', 'Official FY2024 annual report: PBT, CASA ratio 40.9%, cost of funds, merchant lending and Auto-earning figures read in the text on 17 November 2026; definitions still differ between banks.'),
  'cb-m04-s11': source('MB Annual Report 2024', 'https://static2.vietstock.vn/vietstock/2025/4/25/20250423_mbb_250423_annual_report_2024.pdf', 'MB via Vietstock', 'Official annual report: CASA VND281tn (39.3% of customer deposits) and PBT VND28.8tn read in the text on 17 November 2026; its CASA basis differs from Techcombank’s.'),
  'cb-m04-s12': source('MB 4Q24 research report', 'https://masvn.com/api/attachment/file/1739848176141-EN_MBB_Report_MUA_MAS_4Q24_ed_S.pdf', 'Mirae Asset Securities Vietnam', 'Secondary snippet for FY2024 PBT and total operating income.'),
  'cb-m04-s13': source('VPBank Annual Report 2024', 'https://www.vpbank.com.vn/-/media/vpbank-latest/5nha-dau-tu/bao-cao-thuong-nien/2024/vpbank-bctn-2024-eng-1.pdf', 'VPBank', 'Official annual report: consolidated FY2024 PBT VND20,013bn including FE CREDIT read in the text on 17 November 2026.'),
  'cb-m04-s14': source('Vietcombank leads 2024 reported PBT', 'https://theinvestor.vn/vietcombank-leads-vietnamese-banks-in-2024-pre-tax-profit-d14533.html', 'The Investor', 'Secondary snippet for end-2024 equity and reported PBT leadership.'),
  'cb-m04-s15': source('Vietnam Banking Sector Update 2024', 'https://masvn.com/api/attachment/file/1740712265757-20250228ENBankingUpdate2024_Final.pdf', 'Mirae Asset Securities Vietnam, citing SBV', 'Secondary snippet: 15.08% outstanding-credit growth, not disbursement.'),
  'cb-m04-s16': source('Global systemically important banks', 'https://www.fsb.org/work-of-the-fsb/market-and-institutional-resilience/global-systemically-important-financial-institutions-g-sifis/', 'Financial Stability Board', 'Supports annual framework and the 30-bank 2022 list, not a current count.'),
  'cb-m05-s01': source('Digital banking in Vietnam — account ownership and mobile shift', 'https://www.ascentium.com/vietnam/insights/digital-banking-in-vietnam', 'Ascentium, citing SBV', 'Secondary source reporting about 87% adult payment-account ownership in 2024; does not measure active use.'),
  'cb-m05-s02': source('Cashless payment growth in Vietnam 2024', 'https://vietanlaw.com/new-regulations-on-cashless-payment-in-vietnam-2024/', 'Viet An Law, citing SBV', 'Secondary report of 56.57% transaction-volume and 31.35% transaction-value growth.'),
  'cb-m05-s03': source('QR code payments in Vietnam surge in 2023', 'https://theinvestor.vn/qr-code-payments-in-vietnam-surge-172in-2023-d12324.html', 'The Investor, citing payment-system data', 'Secondary report of 172% QR-payment growth in 2023.'),
  'cb-m05-s04': source('Vietnam contactless-payment development', 'https://en.vietnamplus.vn/efforts-urged-to-promote-cashless-payment-post323712.vnp', 'VietnamPlus, citing Mastercard', 'Secondary report of about 92% contactless-volume CAGR; exact base period was not isolated.'),
  'cb-m05-s05': source('Vietnam accelerates push for open banking', 'https://thoibaotaichinhvietnam.vn/vietnam-accelerates-push-for-open-banking-188503.html', 'Vietnam Financial Times', 'Supports the characterization of Vietnam open banking as early-stage.'),
  'cb-m05-s06': source('Open banking and artificial intelligence trends', 'https://www.vietnam.vn/en/ngan-hang-mo-va-tri-tue-nhan-tao-xu-huong-cua-nganh-tai-chinh-ngan-hang', 'Vietnam.vn', 'Government-portal reporting of Smart Banking 2024; qualitative trend evidence.'),
  'cb-m05-s07': source('Techcombank recognized for digital banking, data and AI', 'https://vietnamnews.vn/economy/1694078/techcombank-named-best-digital-bank-in-viet-nam-for-three-years-in-a-row.html', 'Viet Nam News', 'A verified institution example, not evidence of sector-wide AI maturity.'),
  'cb-m05-s08': source('Decree 94/2025/ND-CP — controlled testing in banking', 'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=177341', 'Government of Vietnam / National Legal Database', 'Official full text: Articles 1–2 identify the sandbox and participant classes; Article 6 limits testing by certificate, territory and duration. Read with Decree 382/2026/ND-CP, effective 6 October 2026.'),
  'cb-m05-s09': source('Law on Credit Institutions — consolidated 2025 text', 'https://vanban.chinhphu.vn/?docid=215312&pageid=27160', 'National Assembly / Office of the National Assembly', 'Official consolidated text of Law 32/2024/QH15 and Law 96/2025/QH15. Articles 156–162 cover early intervention and special control; Articles 198a–198c add the secured-asset recovery framework.'),
  'cb-m05-s10': source('Law 111/2025/QH15 — Deposit Insurance', 'https://vanban.chinhphu.vn/?classid=1&docid=216549&pageid=27160&typegroupid=3', 'National Assembly / Government legal-document portal', 'Official signed law, effective 1 May 2026. Articles 17–18 define insured and excluded deposits; Articles 21–24 govern payout triggers, limits, amounts and procedure.'),
  'cb-m05-s11': source('Circular 05/2026/TT-NHNN — deposit-insurance payment limit', 'https://vanban.chinhphu.vn/?docid=218883&pageid=27160', 'State Bank of Vietnam / Government legal-document portal', 'Official circular: VND350 million for principal plus interest across all insured deposits of one person at one participating institution; effective 13 July 2026.'),
  'cb-m05-s12': source('Circular 31/2024/TT-NHNN — asset classification', 'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=168260', 'State Bank of Vietnam / National Legal Database', 'Official full text. Article 10 classifies debt and off-balance-sheet commitments into five groups. The instrument is partly amended by Circular 37/2025/TT-NHNN.'),
  'cb-m05-s13': source('Decree 86/2024/ND-CP — risk provisions', 'https://vbpl.vn/nganhangnhanuoc/Pages/vbpq-toanvan.aspx?ItemID=168385', 'Government of Vietnam / National Legal Database', 'Official full text. Article 4 sets the specific-provision formula and rates; Article 7 sets the general-provision rate and scope. Effective 11 July 2024.'),
  'cb-m05-s14': source('Vietnam 2025 Article IV Consultation', 'https://www.elibrary.imf.org/view/journals/002/2025/283/article-A001-en.pdf', 'International Monetary Fund', 'Reports credit growth of 15% in 2024 and about 19% year-on-year by June 2025.'),
  'cb-m05-s15': source('World Bank forecast for Vietnam growth in 2025', 'https://www.reuters.com/markets/asia/world-bank-forecasts-vietnams-2025-gdp-growth-68-2025-03-12/', 'Reuters, reporting World Bank', 'A March 2025 forecast, not an outturn; record 31 notes later results may differ.'),
  'cb-m05-s16': source('Vietnam growth focus and bank leverage risk', 'https://www.fitchratings.com/research/banks/vietnams-growth-focus-risks-stoking-faster-rise-in-leverage-15-08-2025', 'Fitch Ratings', 'Forward estimate around 16% system credit growth for 2025–2026 with leverage and asset-quality warning.'),
  'cb-m05-s17': source('State Bank of Vietnam 2026 credit-growth target', 'https://www.centralbanking.com/central-banks/financial-stability/micro-prudential/7974762/state-bank-of-vietnam-lowers-credit-growth-target', 'Central Banking, citing SBV', 'Reports a 15% policy target for 2026; target is not an outturn or bank entitlement.'),
  'cb-m05-s18': source('Vietnam Banking Sector Update 2024', 'https://masvn.com/api/attachment/file/1740712265757-20250228ENBankingUpdate2024_Final.pdf', 'Mirae Asset Securities Vietnam, citing SBV', 'Reports 15.08% outstanding-credit growth in 2024.'),
  'cb-m05-s19': source('Circular 37/2025/TT-NHNN — amendments to Circular 31', 'https://vbpl.vn/nganhangnhanuoc/Pages/vbpq-toanvan.aspx?ItemID=183515', 'State Bank of Vietnam / National Legal Database', 'Official full text, effective 15 December 2025. Updates reporting, approval and supervisory-administration provisions without replacing the five-group structure in Article 10.'),
  'cb-m05-s20': source('BCBS climate-related financial-risk principles', 'https://www.bis.org/publications/202206-guidelines-principles-effective-management-and-supervision-climate-related-financial-risks', 'BIS / Basel Committee on Banking Supervision', 'Official 2022 principles for governance, internal controls, risk assessment, management and reporting. International guidance; not automatically Vietnamese law.'),
  'cb-m05-s21': source('Vietnam green-banking policy direction', 'https://sbv.gov.vn/vi/w/sbv599017', 'State Bank of Vietnam', 'Official SBV overview of Directive 03/CT-NHNN, Decision 1604/QD-NHNN and the environmental-and-social risk-management direction for credit institutions.'),
  'cb-m05-s22': source('Decree 382/2026/ND-CP — amendments to the banking sandbox', 'https://vanban.chinhphu.vn/?docid=219812&pageid=27160', 'Government of Vietnam', 'Official amendment to Decree 94/2025/ND-CP, issued and effective 6 October 2026. Lesson 5.4 makes no detailed procedural claim that depends on the amendment.'),
} satisfies Record<string, FashionM2Source>;

export type BankingSourceId = keyof typeof BANKING_SOURCES;
export const citeBanking = (...ids: BankingSourceId[]): FashionM2Source[] => ids.map((id) => BANKING_SOURCES[id]);

export function BankingCaseStudyBlock({ study }: { study: BankingCaseStudy }) {
  const rows: Array<[string, string]> = [
    ['Bank & context', study.context],
    ['Business problem', study.problem],
    ['Strategic action', study.action],
    ['Business mechanism', study.mechanism],
    ['Documented outcome', study.outcome],
  ];
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4" aria-label={`Real-world case study: ${study.bank}`} data-testid="cb-case-study">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Real-World Case Study · {study.bank}</p>
      <h4 className="mt-1 text-sm font-semibold leading-6 text-slate-900">{study.title}</h4>
      <dl className="mt-3 space-y-2.5">
        {rows.map(([label, text]) => (
          <div key={label}>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</dt>
            <dd className="mt-0.5 text-sm leading-6 text-slate-700">{text}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Management trainee takeaway · analysis, not a reported fact</p>
        <p className="mt-0.5 text-sm leading-6 text-slate-700">{study.takeaway}</p>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Sources:{' '}
        {study.sources.map((item, index) => (
          <span key={item.href}>
            {index ? '; ' : ''}
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{item.publisher}, {item.title}</a>
          </span>
        ))}
        . Checked {study.verifiedAt}.
      </p>
    </section>
  );
}

const COMMERCIAL_BANKING_CHAPTER_NUMBER_PREFIX = /^\d{2}\s+(?=\S)/;

export function bankingChapter(input: BankingChapterInput): BankingCardData {
  const { what, how, why, global, vietnam, deepDive, evidence, sourceIds, restriction, caseStudy, extraSources, ...card } = input;
  const cited = citeBanking(...sourceIds);
  const added = [...(caseStudy?.sources ?? []), ...(extraSources ?? [])].filter((item) => !cited.some((other) => other.href === item.href));
  const sources = [...cited, ...added.filter((item, index) => added.findIndex((other) => other.href === item.href) === index)];
  return {
    ...card,
    title: card.title.replace(COMMERCIAL_BANKING_CHAPTER_NUMBER_PREFIX, ''),
    chapterTitle: '',
    concepts: [],
    narrative: [
      { label: 'What it is', text: what },
      { label: 'How it works', text: how },
      { label: 'Why it matters', text: why },
      { label: 'Global example', text: global },
      { label: 'Vietnam example', text: vietnam },
    ],
    body: (
      <div className="space-y-4">
        {restriction ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
            <strong>{COMMERCIAL_BANKING_RESTRICTION}: </strong>{restriction}
          </div>
        ) : null}
        <F2DeepDive paragraphs={deepDive} evidence={evidence} />
        {caseStudy ? <BankingCaseStudyBlock study={caseStudy} /> : null}
      </div>
    ),
    sources,
  };
}

export function registerVisual<T extends CommercialBankingVisualKind>(registry: Record<string, VisualSpec>, kind: T, spec: VisualSpec): T {
  registry[kind] = spec;
  return kind;
}

/**
 * Builds 10 question seeds per lesson from its chapters: a key-insight check,
 * a key-term check and, where needed, recap applications; f2Quiz turns them into
 * the lesson's 10 questions. Every item links back to the chapter that contains
 * the answer. Options are always four unique choices.
 */
export function bankingQuiz(prefix: string, cards: BankingCardData[]): FashionM2Question[] {
  const genericWrong = [
    'It removes the need for capital, liquidity and risk controls',
    'It means every balance-sheet item is revenue',
    'It guarantees profit regardless of credit losses',
    'It applies only to investment banks',
  ];
  const uniqueOptions = (correct: string, pool: string[]): [string, string, string] => {
    const alternatives = [...new Set([...pool, ...genericWrong])].filter((item) => item !== correct).slice(0, 3);
    return [alternatives[0], alternatives[1], alternatives[2]];
  };
  const seeds = cards.flatMap((card, index) => {
    const otherInsights = cards.filter((_, candidate) => candidate !== index).map((item) => item.keyInsight);
    const firstTerm = card.keyTerms[0];
    const otherDefinitions = cards.flatMap((item) => item.keyTerms.map((term) => term.definition)).filter((definition) => definition !== firstTerm.definition);
    return [
      {
        chapter: String(index + 1), objective: `Apply the core insight from Chapter ${index + 1}`,
        question: `Which statement best captures Chapter ${index + 1}, “${card.title}”?`,
        application: `A teammate is applying Chapter ${index + 1}. Which principle should guide the analysis?`,
        correct: card.keyInsight, wrong: uniqueOptions(card.keyInsight, otherInsights),
        explanation: `${card.chapterRecap} Review Chapter ${index + 1}.`,
      },
      {
        chapter: String(index + 1), objective: `Define ${firstTerm.term}`,
        question: `What does “${firstTerm.term}” mean in this lesson?`,
        application: `A banking case uses the term “${firstTerm.term}”. Which definition is correct?`,
        correct: firstTerm.definition, wrong: uniqueOptions(firstTerm.definition, otherDefinitions),
        explanation: `${firstTerm.term}: ${firstTerm.definition} Review Chapter ${index + 1}.`,
      },
    ];
  });
  let cursor = 0;
  while (seeds.length < 10) {
    const chapterIndex = cursor % cards.length;
    const card = cards[chapterIndex];
    const correct = card.recap[cursor % card.recap.length];
    // Distractors come only from other chapters, so exactly one option belongs to the asked chapter.
    const pool = cards.flatMap((item, candidate) => (candidate === chapterIndex ? [] : item.recap)).filter((item) => item !== correct);
    seeds.push({
      chapter: String(chapterIndex + 1), objective: `Use a Chapter ${chapterIndex + 1} takeaway`,
      question: cursor < cards.length
        ? `Which takeaway belongs to Chapter ${chapterIndex + 1}, “${card.title}”?`
        : `Which additional takeaway belongs to Chapter ${chapterIndex + 1}, “${card.title}”?`,
      application: `Which statement would be safest to use when applying Chapter ${chapterIndex + 1}?`,
      correct, wrong: uniqueOptions(correct, pool),
      explanation: `${correct} Review Chapter ${chapterIndex + 1}.`,
    });
    cursor += 1;
  }
  return f2Quiz(prefix, seeds.slice(0, 10));
}

export type BankingVisualRegistry = Record<string, VisualSpec>;
