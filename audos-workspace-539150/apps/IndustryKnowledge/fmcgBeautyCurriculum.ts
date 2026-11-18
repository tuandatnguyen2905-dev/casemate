import type { FxCurriculum, FxSource } from './fmcgExpansionCore';
import { FMCG_BEAUTY_M1 } from './fmcgBeautyM1';
import { FMCG_BEAUTY_M2 } from './fmcgBeautyM2';
import { FMCG_BEAUTY_M3 } from './fmcgBeautyM3';
import { FMCG_BEAUTY_M4 } from './fmcgBeautyM4';
import { FMCG_BEAUTY_M5 } from './fmcgBeautyM5';

/** Evidence register for Beauty & Personal Care. Dates are publication or adoption dates; `period` is what the source covers. */
export const FMCG_BEAUTY_SOURCES: Record<string, FxSource> = {
  euCosReg: { title: 'Regulation (EC) No 1223/2009 on cosmetic products', publisher: 'EUR-Lex, European Union', url: 'https://eur-lex.europa.eu/eli/reg/2009/1223/oj', date: '30 Nov 2009 (applies from 11 Jul 2013)', geo: 'European Union', period: 'In force; consolidated amendments apply', status: 'Verified' },
  euClaims: { title: 'Commission Regulation (EU) No 655/2013: common criteria for cosmetic claims', publisher: 'EUR-Lex, European Union', url: 'https://eur-lex.europa.eu/eli/reg/2013/655/oj', date: '10 Jul 2013', geo: 'European Union', period: 'In force', status: 'Verified' },
  vnCos: { title: 'Circular 06/2011/TT-BYT on the management of cosmetics', publisher: 'Ministry of Health via Government legal database (vanban.chinhphu.vn)', url: 'https://vanban.chinhphu.vn/default.aspx?docid=99376&pageid=27160', date: '25 Jan 2011', geo: 'Vietnam', period: 'In force as amended; implements the ASEAN cosmetic harmonisation agreement signed 2 Sep 2003', status: 'Verified' },
  vnCos34: { title: 'Circular 34/2025/TT-BYT amending Circular 06/2011/TT-BYT on cosmetics', publisher: 'Ministry of Health via Government legal database (vanban.chinhphu.vn)', url: 'https://vanban.chinhphu.vn/?docid=214428&pageid=27160', date: 'Issued 3 Jul 2025; effective 18 Aug 2025', geo: 'Vietnam', period: 'Amends notification dossier and procedure rules', status: 'Verified' },
  vnRes173: { title: 'Resolution 173/2024/QH15 of the National Assembly on the question-and-answer session of the 8th sitting', publisher: 'Government of Vietnam (chinhphu.vn)', url: 'https://chinhphu.vn/?docid=211987&pageid=27160', date: '30 Nov 2024', geo: 'Vietnam', period: 'Directs tighter oversight of cosmetics and functional-food trading on e-commerce platforms and social networks', status: 'Verified' },
  fdaMocra: { title: 'Modernization of Cosmetics Regulation Act of 2022 (MoCRA)', publisher: 'U.S. Food and Drug Administration', url: 'https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-2022-mocra', date: 'Enacted 29 Dec 2022; page accessed 12 Nov 2026', geo: 'United States', period: 'Implementation deadlines vary by provision', status: 'Verified with Caveat', note: 'U.S. rules illustrate a regulatory model; they do not apply in Vietnam.' },
  iso22716: { title: 'ISO 22716:2007 Cosmetics: Good Manufacturing Practices (GMP)', publisher: 'International Organization for Standardization', url: 'https://www.iso.org/standard/36437.html', date: '2007 (confirmed edition)', geo: 'International', period: 'Voluntary standard; referenced by several regulators', status: 'Verified with Caveat' },
  vnEnvLaw: { title: 'Law on Environmental Protection No. 72/2020/QH14', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-72-2020-qh14-32703.htm', date: 'Issued 17 Nov 2020; effective 1 Jan 2022', geo: 'Vietnam', period: 'Articles 54-55 set extended producer responsibility', status: 'Verified' },
  vnEpr: { title: 'Decree 08/2022/ND-CP detailing the Law on Environmental Protection', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-08-2022-nd-cp-36666.htm', date: '10 Jan 2022', geo: 'Vietnam', period: 'Packaging recycling responsibility from 1 Jan 2024 (Article 77), including cosmetics packaging', status: 'Verified' },
  vnData: { title: 'Law on Personal Data Protection No. 91/2025/QH15', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-91-2025-qh15-45578.htm', date: 'Effective 1 Jan 2026', geo: 'Vietnam', period: 'In force; duties depend on processing role, data and purpose', status: 'Verified' },
  vnConsumer: { title: 'Law on Protection of Consumer Rights No. 19/2023/QH15', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-19-2023-qh15-39843.htm', date: 'Effective 1 Jul 2024', geo: 'Vietnam', period: 'In force', status: 'Verified' },
  loreal: { title: 'L\u2019Or\u00e9al Finance: annual and universal registration documents', publisher: 'L\u2019Or\u00e9al Group (company filings)', url: 'https://www.loreal-finance.com/en', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Latest published financial year', status: 'Verified with Caveat', note: 'Company landing page; used only for divisional structure, not market data.' },
  elc: { title: 'The Est\u00e9e Lauder Companies: investor relations and annual reports', publisher: 'The Est\u00e9e Lauder Companies Inc. (company filings)', url: 'https://www.elcompanies.com/en/investors', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Latest published fiscal year', status: 'Verified with Caveat', note: 'Company landing page; used to illustrate prestige channel mechanics only.' },
  unilever: { title: 'Unilever annual report and accounts', publisher: 'Unilever PLC (company filings)', url: 'https://www.unilever.com/investors/annual-report-and-accounts/', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Latest published financial year', status: 'Verified with Caveat', note: 'Company landing page; used for portfolio-structure examples only.' },
  hasaki: { title: 'Hasaki.vn (company website)', publisher: 'Hasaki Beauty & Clinic', url: 'https://hasaki.vn/', date: 'Accessed 12 Nov 2026', geo: 'Vietnam', period: 'Company self-description: nationwide branch network, more than 600 brands', status: 'Verified with Caveat', note: 'Company statement about itself; used only to illustrate specialist beauty retail, not market share.' },
  cocoon: { title: 'Cocoon Vietnam (company website)', publisher: 'Cocoon Vietnam', url: 'https://cocoonvietnam.com/', date: 'Accessed 12 Nov 2026', geo: 'Vietnam', period: 'Company self-description as vegan cosmetics', status: 'Verified with Caveat', note: 'Brand positioning statement; vegan certification claims are the company\u2019s own and were not independently audited.' },
  illustrative: { title: 'Casemate illustrative calculation', publisher: 'Casemate (made-up numbers for teaching)', url: 'https://www.casemateaud.com/', date: '12 Nov 2026', geo: 'Not market data', period: 'Hypothetical', status: 'Verified with Caveat', note: 'Numbers are invented to show the arithmetic and must not be quoted as market or company data.' },
};

export const FMCG_BEAUTY_CURRICULUM: FxCurriculum = {
  id: 'fmcg-beauty',
  slug: 'beauty',
  key: 'FMCG_BEAUTY',
  name: 'Beauty & Personal Care',
  short: 'beauty',
  sources: FMCG_BEAUTY_SOURCES,
  modules: [FMCG_BEAUTY_M1, FMCG_BEAUTY_M2, FMCG_BEAUTY_M3, FMCG_BEAUTY_M4, FMCG_BEAUTY_M5],
};
