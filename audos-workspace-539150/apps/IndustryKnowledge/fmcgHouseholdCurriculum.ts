import type { FxCurriculum, FxSource } from './fmcgExpansionCore';
import { FMCG_HOUSEHOLD_M1 } from './fmcgHouseholdM1';
import { FMCG_HOUSEHOLD_M2 } from './fmcgHouseholdM2';
import { FMCG_HOUSEHOLD_M3 } from './fmcgHouseholdM3';
import { FMCG_HOUSEHOLD_M4 } from './fmcgHouseholdM4';
import { FMCG_HOUSEHOLD_M5 } from './fmcgHouseholdM5';

/** Evidence register for Household & Personal Care. Dates are publication or adoption dates; `period` is what the source covers. */
export const FMCG_HOUSEHOLD_SOURCES: Record<string, FxSource> = {
  vnEnvLaw: { title: 'Law on Environmental Protection No. 72/2020/QH14', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-72-2020-qh14-32703.htm', date: 'Issued 17 Nov 2020; effective 1 Jan 2022', geo: 'Vietnam', period: 'Articles 54-55 set extended producer responsibility', status: 'Verified' },
  vnEpr: { title: 'Decree 08/2022/ND-CP detailing the Law on Environmental Protection', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-08-2022-nd-cp-36666.htm', date: '10 Jan 2022', geo: 'Vietnam', period: 'Packaging recycling responsibility from 1 Jan 2024 (Article 77), including packaging of detergents and household preparations', status: 'Verified' },
  cemEpr: { title: 'EPR policy: the first complete policy in Southeast Asia', publisher: 'Centre for Environmental Monitoring, Vietnam Environment Administration (cem.gov.vn)', url: 'https://cem.gov.vn/tin-tuc-moi-truong/chinh-sach-epr-hoan-thien-dau-tien-o-dong-nam-a', date: 'Accessed 12 Nov 2026', geo: 'Vietnam', period: 'Summarises collection-and-treatment contributions from 1 Jan 2022, including single-use diapers, sanitary pads and wet wipes', status: 'Verified with Caveat', note: 'Government agency summary; the decree text governs.' },
  vnBiocide: { title: 'Decree 91/2016/ND-CP on household and medical insecticidal and disinfectant chemicals and preparations', publisher: 'Government legal database (vanban.chinhphu.vn)', url: 'https://vanban.chinhphu.vn/default.aspx?docid=185596&pageid=27160', date: '1 Jul 2016; consolidated as 16/VBHN-BYT on 30 Dec 2024 after Decrees 155/2018 and 129/2024', geo: 'Vietnam', period: 'In force as amended', status: 'Verified' },
  vnCos: { title: 'Circular 06/2011/TT-BYT on the management of cosmetics', publisher: 'Ministry of Health via Government legal database (vanban.chinhphu.vn)', url: 'https://vanban.chinhphu.vn/default.aspx?docid=99376&pageid=27160', date: '25 Jan 2011', geo: 'Vietnam', period: 'In force as amended; covers personal-care products classed as cosmetics', status: 'Verified' },
  euCosReg: { title: 'Regulation (EC) No 1223/2009 on cosmetic products', publisher: 'EUR-Lex, European Union', url: 'https://eur-lex.europa.eu/eli/reg/2009/1223/oj', date: '30 Nov 2009 (applies from 11 Jul 2013)', geo: 'European Union', period: 'Defines cosmetics to include products for teeth and the mouth', status: 'Verified' },
  euDetergents: { title: 'Regulation (EC) No 648/2004 on detergents', publisher: 'EUR-Lex, European Union', url: 'https://eur-lex.europa.eu/eli/reg/2004/648/oj', date: '31 Mar 2004', geo: 'European Union', period: 'Surfactant biodegradability and detergent labelling; amended over time', status: 'Verified' },
  euClp: { title: 'Regulation (EC) No 1272/2008 on classification, labelling and packaging of substances and mixtures (CLP)', publisher: 'EUR-Lex, European Union', url: 'https://eur-lex.europa.eu/eli/reg/2008/1272/oj', date: '16 Dec 2008', geo: 'European Union', period: 'Hazard classification and labels based on the UN GHS', status: 'Verified' },
  uneceGhs: { title: 'Globally Harmonized System of Classification and Labelling of Chemicals (GHS)', publisher: 'United Nations Economic Commission for Europe', url: 'https://unece.org/about-ghs', date: 'Accessed 12 Nov 2026', geo: 'International', period: 'Revised editions issued periodically', status: 'Verified with Caveat' },
  vnConsumer: { title: 'Law on Protection of Consumer Rights No. 19/2023/QH15', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-19-2023-qh15-39843.htm', date: 'Effective 1 Jul 2024', geo: 'Vietnam', period: 'In force', status: 'Verified' },
  jmp: { title: 'WHO/UNICEF Joint Monitoring Programme for Water Supply, Sanitation and Hygiene', publisher: 'WHO and UNICEF (washdata.org)', url: 'https://washdata.org/', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Household hygiene service indicators by country', status: 'Verified with Caveat', note: 'Used for the hygiene-service concept only; no figures quoted.' },
  pg: { title: 'Procter & Gamble investor relations and annual reports', publisher: 'The Procter & Gamble Company (company filings)', url: 'https://www.pginvestor.com/', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Latest published fiscal year', status: 'Verified with Caveat', note: 'Company landing page; used for segment structure only.' },
  unilever: { title: 'Unilever annual report and accounts', publisher: 'Unilever PLC (company filings)', url: 'https://www.unilever.com/investors/annual-report-and-accounts/', date: 'Accessed 12 Nov 2026', geo: 'Global', period: 'Latest published financial year', status: 'Verified with Caveat', note: 'Company landing page; used for portfolio structure only.' },
  lix: { title: 'Lixco (company website)', publisher: 'LIX Detergent Joint Stock Company', url: 'https://lixco.com/', date: 'Accessed 12 Nov 2026', geo: 'Vietnam', period: 'Company self-description: laundry powder, liquid detergent, dishwashing liquid and household cleaners under the Lix brand', status: 'Verified with Caveat', note: 'Company statement about its own products; no market-share figure is taught.' },
  illustrative: { title: 'Casemate illustrative calculation', publisher: 'Casemate (made-up numbers for teaching)', url: 'https://www.casemateaud.com/', date: '12 Nov 2026', geo: 'Not market data', period: 'Hypothetical', status: 'Verified with Caveat', note: 'Numbers are invented to show the arithmetic and must not be quoted as market or company data.' },
};

export const FMCG_HOUSEHOLD_CURRICULUM: FxCurriculum = {
  id: 'fmcg-household',
  slug: 'household',
  key: 'FMCG_HOUSEHOLD',
  name: 'Household & Personal Care',
  short: 'household',
  sources: FMCG_HOUSEHOLD_SOURCES,
  modules: [FMCG_HOUSEHOLD_M1, FMCG_HOUSEHOLD_M2, FMCG_HOUSEHOLD_M3, FMCG_HOUSEHOLD_M4, FMCG_HOUSEHOLD_M5],
};
