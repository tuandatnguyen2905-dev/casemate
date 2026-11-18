import type { FxCurriculum, FxSource } from './fmcgExpansionCore';
import { FMCG_TOBACCO_M1 } from './fmcgTobaccoM1';
import { FMCG_TOBACCO_M2 } from './fmcgTobaccoM2';
import { FMCG_TOBACCO_M3 } from './fmcgTobaccoM3';
import { FMCG_TOBACCO_M4 } from './fmcgTobaccoM4';
import { FMCG_TOBACCO_M5 } from './fmcgTobaccoM5';

/**
 * Evidence register for Tobacco & Next-Generation Products. Every Vietnam legal claim taught in this
 * curriculum was checked against the official text listed here (jurisdiction and effective date stated).
 * Market-share, market-size and illicit-trade estimates found in earlier drafts are held for review in
 * reports/fmcg-expansion-source-register-2026-11-12.md and are not taught or assessed.
 */
export const FMCG_TOBACCO_SOURCES: Record<string, FxSource> = {
  vnLaw09: { title: 'Law on Prevention and Control of Tobacco Harms No. 09/2012/QH13', publisher: 'Government legal database (vanban.chinhphu.vn)', url: 'https://vanban.chinhphu.vn/default.aspx?docid=163544&pageid=27160', date: 'Issued 18 Jun 2012; effective 1 May 2013', geo: 'Vietnam', period: 'In force; Articles 9, 11-12, 15-17, 21-30 used', status: 'Verified' },
  vnRes173: { title: 'Resolution 173/2024/QH15 of the National Assembly (8th session question-and-answer resolution)', publisher: 'Government of Vietnam (chinhphu.vn)', url: 'https://chinhphu.vn/?docid=211987&pageid=27160', date: '30 Nov 2024', geo: 'Vietnam', period: 'Bans production, trade, import, storage, transport and use of e-cigarettes and heated tobacco products from 2025', status: 'Verified' },
  vnBanNews: { title: 'From 1 January 2025, laughing gas, shisha and e-cigarettes officially banned', publisher: 'Government news portal (tiengchuong.chinhphu.vn)', url: 'https://tiengchuong.chinhphu.vn/tu-1-1-2025-chinh-thuc-cam-bong-cuoi-shisha-113250101194912695.htm', date: '1 Jan 2025', geo: 'Vietnam', period: 'Reports application of Resolution 173/2024/QH15 from 1 Jan 2025', status: 'Verified with Caveat', note: 'Official news summary; the resolution text governs.' },
  vnDec1665: { title: 'Decision 1665/QD-TTg on the plan to implement the e-cigarette and heated tobacco ban in Resolution 173/2024/QH15', publisher: 'Government of Vietnam (chinhphu.vn)', url: 'https://chinhphu.vn/?docid=214810&pageid=27160', date: '5 Aug 2025', geo: 'Vietnam', period: 'Implementation plan', status: 'Verified' },
  vnExcise66: { title: 'Law on Special Consumption (Excise) Tax No. 66/2025/QH15', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-66-2025-qh15-45587.htm', date: 'Issued 14 Jun 2025; effective 1 Jan 2026', geo: 'Vietnam', period: 'Cigarettes: 75% rate plus a specific amount per 20-stick pack rising from VND 2,000 (from 1 Jan 2027) to VND 10,000 (from 1 Jan 2031)', status: 'Verified' },
  whoVn2023: { title: 'Tobacco: Viet Nam 2023 country profile (WHO report on the global tobacco epidemic)', publisher: 'World Health Organization', url: 'https://www.who.int/publications/m/item/tobacco-vnm-2023-country-profile', date: '2023', geo: 'Vietnam', period: 'Tax and price data for 2022', status: 'Verified' },
  whoVn2021: { title: 'WHO report on the global tobacco epidemic 2021: Viet Nam country profile', publisher: 'World Health Organization', url: 'https://cdn.who.int/media/docs/default-source/country-profiles/tobacco/who_rgte_2021_viet_nam.pdf', date: '2021', geo: 'Vietnam', period: 'Global Adult Tobacco Survey 2015; tax data for 2020', status: 'Verified' },
  vnMohReport: { title: 'Vietnam among countries with highest male smoking rates: official', publisher: 'VietnamPlus (Vietnam News Agency) reporting a Ministry of Health briefing', url: 'https://en.vietnamplus.vn/vietnam-among-countries-with-highest-male-smoking-rates-official-post253495.vnp', date: 'Accessed 12 Nov 2026', geo: 'Vietnam', period: 'Adult male tobacco use in 2015 and 2020', status: 'Verified with Caveat', note: 'Secondary report of an official statement; the underlying survey report was not read.' },
  whoFact: { title: 'Tobacco fact sheet', publisher: 'World Health Organization', url: 'https://www.who.int/news-room/fact-sheets/detail/tobacco', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Latest WHO estimates', status: 'Verified with Caveat', note: 'WHO updates figures periodically; quote the current page.' },
  whoFctc: { title: 'WHO Framework Convention on Tobacco Control', publisher: 'WHO FCTC Secretariat', url: 'https://fctc.who.int/', date: 'Adopted 2003; in force 2005', geo: 'International', period: 'Treaty obligations for Parties, including Vietnam', status: 'Verified with Caveat' },
  euTpd: { title: 'Directive 2014/40/EU on tobacco and related products', publisher: 'EUR-Lex, European Union', url: 'https://eur-lex.europa.eu/eli/dir/2014/40/oj', date: '3 Apr 2014', geo: 'European Union', period: 'In force; transposed by member states', status: 'Verified' },
  fctcProtocol: { title: 'Protocol to Eliminate Illicit Trade in Tobacco Products', publisher: 'WHO FCTC Secretariat', url: 'https://fctc.who.int/protocol', date: 'Accessed 12 Nov 2026', geo: 'International', period: 'Treaty under the WHO FCTC', status: 'Verified with Caveat', note: 'Vietnam\u2019s party status is not asserted in lessons; check the treaty depositary before stating it.' },
  vinataba: { title: 'Gi\u1edbi thi\u1ec7u (About Vinataba)', publisher: 'Vietnam National Tobacco Corporation (company website)', url: 'https://www.vinataba.com.vn/gioi-thieu', date: 'Accessed 12 Nov 2026', geo: 'Vietnam', period: 'Company self-description', status: 'Verified with Caveat', note: 'Company statement about its own role; no market-share figure is taught.' },
  pmiReports: { title: 'Reports and filings', publisher: 'Philip Morris International (investor relations)', url: 'https://www.pmi.com/investor-relations/reports-filings', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Company reporting structure', status: 'Verified with Caveat', note: 'Used only to illustrate how a multinational reports combustible and smoke-free categories; products it sells that are banned in Vietnam are not discussed as opportunities.' },
  auPlain: { title: 'Tobacco Plain Packaging Act 2011 (No. 148, 2011)', publisher: 'Federal Register of Legislation, Australian Government', url: 'https://www.legislation.gov.au/C2011A00148/latest/text', date: '2011', geo: 'Australia', period: 'In force', status: 'Verified with Caveat', note: 'Act text confirmed; commencement dates should be read from the Act before quoting.' },
  fdaTobacco: { title: 'FDA Center for Tobacco Products', publisher: 'U.S. Food and Drug Administration', url: 'https://www.fda.gov/tobacco-products', date: 'Accessed 12 Nov 2026', geo: 'United States', period: 'Current federal framework, including premarket review and the federal minimum age of 21', status: 'Verified with Caveat', note: 'U.S. rules illustrate a regulatory model; they do not apply in Vietnam.' },
  vnEnvLaw: { title: 'Law on Environmental Protection No. 72/2020/QH14', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-72-2020-qh14-32703.htm', date: 'Issued 17 Nov 2020; effective 1 Jan 2022', geo: 'Vietnam', period: 'Article 55 sets collection-and-treatment responsibility for listed products, including tobacco', status: 'Verified' },
  cemEpr: { title: 'EPR policy: the first complete policy in Southeast Asia', publisher: 'Centre for Environmental Monitoring, Vietnam Environment Administration (cem.gov.vn)', url: 'https://cem.gov.vn/tin-tuc-moi-truong/chinh-sach-epr-hoan-thien-dau-tien-o-dong-nam-a', date: 'Accessed 12 Nov 2026', geo: 'Vietnam', period: 'Collection-and-treatment contributions from 1 Jan 2022, including tobacco', status: 'Verified with Caveat', note: 'Government agency summary; Decree 08/2022/ND-CP governs.' },
  illustrative: { title: 'Casemate illustrative calculation', publisher: 'Casemate (made-up numbers for teaching)', url: 'https://www.casemateaud.com/', date: '12 Nov 2026', geo: 'Not market data', period: 'Hypothetical', status: 'Verified with Caveat', note: 'Numbers are invented to show the arithmetic and must not be quoted as market or company data.' },
};

export const FMCG_TOBACCO_CURRICULUM: FxCurriculum = {
  id: 'fmcg-tobacco',
  slug: 'tobacco',
  key: 'FMCG_TOBACCO',
  name: 'Tobacco & Next-Generation Products',
  short: 'tobacco',
  sources: FMCG_TOBACCO_SOURCES,
  modules: [FMCG_TOBACCO_M1, FMCG_TOBACCO_M2, FMCG_TOBACCO_M3, FMCG_TOBACCO_M4, FMCG_TOBACCO_M5],
};
