import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';

export type EntModule01VisualKind = `ent-m1-${string}`;

export interface EntM1CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: EntModule01VisualKind;
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

export interface EntM1LessonBundle {
  deck: EntM1CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 01 for Enterprise Software & IT Services draws on Gartner\u2019s July 2026 spending forecast, Mordor
 * Intelligence\u2019s Vietnam IT services estimates, FPT\u2019s 2025 results, Vietnam government and association
 * statistics, Nasscom and IBPAP delivery-hub data, and Vietnamese legal texts. Spending, market-size and company
 * figures use different definitions and are never combined: Gartner covers worldwide IT spending, Mordor covers
 * IT services only, and Vietnam\u2019s digital technology industry totals include hardware.
 */
export const ENT_SOURCES = {
  gartnerJuly2026: { title: 'Gartner forecasts worldwide IT spending to grow 14.2% in 2026, totaling $6.37 trillion', href: 'https://www.gartner.com/en/newsroom/press-releases/2026-07-27-gartner-forecasts-worldwide-it-spending-to-grow-14-point-2-percent-in-2026-totaling-6-point-37-trillion', publisher: 'Gartner (press release, 27 July 2026)', note: 'Worldwide IT spending of US$6,369 billion in 2026, up 14.2%: data center systems US$822 billion (+62.5%), devices US$868 billion (+9.8%), software US$1,468 billion (+15.5%), services US$1,570 billion (+5.3%), IaaS US$287 billion (+29.3%) and communications services US$1,354 billion (+4.4%); the analyst says it is not a market where a rising tide lifts all boats.' },
  mordorVietnamIt: { title: 'Vietnam IT services market size and share analysis, 2026\u20132031', href: 'https://www.mordorintelligence.com/industry-reports/vietnam-it-services-market', publisher: 'Mordor Intelligence (market research summary)', note: 'IT services market of US$2.37 billion in 2025, US$2.63 billion in 2026 and US$4.39 billion by 2031 (10.82% CAGR 2026\u20132031); IT outsourcing 39.05% of 2025 value, cloud and platform services growing 11.86% a year; large enterprises 67.72% and SMEs growing 12.74% a year; BFSI 26.55%; talent shortages, fragmented data-privacy rules and submarine-cable outages temper growth. IT services only, not enterprise software.' },
  fptTechnology2025: { title: 'Technology sector, Annual Report 2025', href: 'https://bctn2025.fpt.com/en/business-performance-analysis/technology-sector/', publisher: 'FPT Corporation (annual report)', note: 'Technology sector revenue of VND 44,475 billion (+13.7%), 63.4% of group revenue and 45.3% of pre-tax profit; services include digital, green and AI transformation consulting, national and provincial digital systems, FPT AI Factory, cybersecurity and semiconductor chip design; a company report.' },
  fptGlobalIt2025: { title: 'IT services for foreign markets, Annual Report 2025', href: 'https://bctn2025.fpt.com/en/business-performance-analysis/technology-sector/it-services-for-foreign-markets/', publisher: 'FPT Corporation (annual report)', note: 'Overseas IT services revenue of VND 35,382 billion (+14.3%) and pre-tax profit of VND 5,467 billion; digital transformation revenue VND 16,751 billion (+16.8%, 47.3% of the segment); Japan the main market with a first contract above US$100 million; shift from time-and-materials to managed services; AI-first strategy with an 8.2% productivity gain reported by the company.' },
  fptEarnings2025: { title: 'FPT earnings report, 12 months 2025', href: 'https://fpt.com/-/media/project/fpt-corporation/fpt/ir/information-disclosures/year-report/2026/january/fpt_earnings-report-12m2025.pdf', publisher: 'FPT Corporation (earnings report)', note: 'Domestic IT services revenue VND 9,093 billion (+11.5%) with pre-tax profit VND 416 billion (-9.7%); global IT services revenue VND 35,382 billion (+14.3%); Japan up 25.4%.' },
  vietnamplusDigitalTech: { title: 'Digital technology industry surpasses 2025 targets', href: 'https://en.vietnamplus.vn/digital-technology-industry-surpasses-2025-targets-post335272.vnp', publisher: 'VietnamPlus (reporting the Ministry of Science and Technology, January 2026)', note: 'Digital technology industry revenue of about US$198 billion in 2025 (+26%), including hardware and electronics exports of US$178 billion; 80,052 active firms; e-commerce revenue about US$36 billion. The industry total is not the enterprise software and IT services market.' },
  tuoitreDigitalExports: { title: 'Vietnam\u2019s digital technology exports hit $172bn in 2025', href: 'https://news.tuoitre.vn/vietnams-digital-technology-exports-hit-172bn-in-2025-103251231111204888.htm', publisher: 'Tuoi Tre News (December 2025)', note: 'Digital technology exports of about US$172 billion and overseas revenue of Vietnamese technology firms of about US$15 billion; about 80,000 technology firms and over 1.9 million workers; more than 2,100 firms export digital products and services.' },
  vneconomyVinasa: { title: 'Expansion of export markets for innovative products remains limited', href: 'https://en.vneconomy.vn/expansion-of-export-markets-for-innovative-products-remains-limited.htm', publisher: 'VnEconomy (quoting VINASA)', note: 'VINASA says the software sector accounts for US$13 billion of Vietnam\u2019s IT industry revenue, with exports of US$7 billion (2024 figures); main outsourcing markets are the US, Japan, Europe and parts of Southeast Asia; lack of local offices abroad limits trust-building.' },
  vietnamnewsItWorkforce: { title: 'Viet Nam faces shortfall of 200,000 IT workers by end of year', href: 'https://bizhub.vietnamnews.vn/viet-nam-faces-shortfall-of-200000-it-workers-by-end-of-year-post374169.html', publisher: 'Viet Nam News (May 2025, citing An Binh Securities)', note: 'Demand of 700,000 IT workers by end-2025 against about 500,000 qualified candidates from domestic training; about 50,000 IT graduates a year, of whom around 30% are job-ready.' },
  vneconomyTalent: { title: 'Vietnam forecast to be short of 150,000 tech workers annually', href: 'https://en.vneconomy.vn/vietnam-forecast-to-be-short-of-150-000-tech-workers-annually.htm', publisher: 'VnEconomy (citing a TopDev report)', note: 'Estimated IT workforce of 530,000 and a forecast annual shortage of 150,000\u2013200,000 tech workers; only about 30% of graduates meet employers\u2019 requirements.' },
  vietnamCloudProgram: { title: 'Government approves national action program on development of cloud computing during 2025\u20132030', href: 'https://en.baochinhphu.vn/govt-approves-national-action-program-on-development-of-cloud-computing-during-20252030-111250612163552859.htm', publisher: 'Vietnam Government news portal (June 2025)', note: 'Decision 1121/QD-TTg targets cloud use by all government agencies and state enterprises, 70% of private enterprises and over 50% of the population by 2030, with services from domestic companies; a policy target.' },
  digitalTechLaw: { title: 'Law 71/2025/QH15 on the Digital Technology Industry', href: 'https://mst.gov.vn/van-ban-phap-luat/25224.htm', publisher: 'Ministry of Science and Technology (Vietnamese-language legal database)', note: 'Issued 14 June 2025 and effective 1 January 2026, with Articles 11, 28 and 29 effective 1 July 2025; covers digital technology products and services, human resources and incentives.' },
  dataLawOverview: { title: 'Vietnam AI regulation overview', href: 'https://regulations.ai/regulations/RAI-VN-NA-SUMMARY-2026', publisher: 'Regulations.AI (secondary summary)', note: 'Notes that the Law on Data (60/2024/QH15) takes effect on 1 July 2025 and regulates digital, important and core data, alongside the personal data protection framework.' },
  pdplGazette: { title: 'Law 91/2025/QH15 on Personal Data Protection', href: 'https://congbao.chinhphu.vn/van-ban/luat-so-91-2025-qh15-45578.htm', publisher: 'Official Gazette (Vietnamese-language)', note: 'Issued 26 June 2025 and effective 1 January 2026; maximum administrative fine of VND 3 billion for most violations.' },
  cyberLaw2025: { title: 'Law on Cybersecurity 2025, No. 116/2025/QH15', href: 'https://english.luatvietnam.vn/lawoncybersecurityno116-2025-qh15dateddecember102025ofthenationalassembly-422396-doc1.html', publisher: 'Luat Viet Nam (English translation and summary)', note: 'Passed 10 December 2025 and effective 1 July 2026; replaces the 2018 Cybersecurity Law and consolidates cybersecurity and network information security rules.' },
  andersenLaws: { title: 'Key Vietnamese laws in force from 1 July 2026', href: 'https://vn.andersen.com/wp-content/uploads/2026/07/Key-Vietnamese-Laws-in-Force-From-1-July-2026.pdf', publisher: 'Andersen Vietnam (law firm briefing)', note: 'Lists the Cybersecurity Law (116/2025/QH15), Digital Transformation Law (148/2025/QH15) and High Technology Law (133/2025/QH15) among laws effective 1 July 2026; a secondary legal summary.' },
  nasscomReview: { title: 'Nasscom Annual Strategic Review 2025', href: 'https://www.nasscom.in/sites/default/files/media_pdf/Nasscom%20SR%20Press%20release.pdf', publisher: 'Nasscom (industry association press release)', note: 'India\u2019s technology industry about US$282.6 billion in FY2025 including hardware, with IT services US$137.1 billion, exports US$224.4 billion, 5.8 million employees and over 1,750 global capability centres.' },
  philstarItBpm: { title: 'IT-BPM revenues breach $40 billion mark', href: 'https://www.philstar.com/business/2026/01/29/2504140/it-bpm-revenues-breach-40-billion-mark', publisher: 'Philstar (reporting IBPAP, January 2026)', note: 'Philippine IT-BPM revenue above US$40 billion in 2025 and about 1.9 million workers.' },
  erpHistory: { title: 'Enterprise resource planning (ERP): a brief history', href: 'https://www.sciencedirect.com/science/article/abs/pii/S0272696306001355', publisher: 'Journal of Operations Management (academic article)', note: 'Traces ERP from 1960s reorder-point systems and material requirements planning on mainframes, through MRP II in the 1980s, to the term ERP coined by Gartner around 1990.' },
  erpTechTarget: { title: 'ERP evolution sees major shifts in holistic view of business', href: 'https://www.techtarget.com/enterprise-software/feature/ERP-evolution-sees-major-shifts-in-holistic-view-of-business', publisher: 'TechTarget', note: 'Describes ERP as an integrated system with a central database, SAP as an early-1970s pioneer, and the move from mainframes to client-server systems such as SAP R/3.' },
  kodakIbm1989: { title: 'IBM to take over Kodak\u2019s data processing', href: 'https://www.washingtonpost.com/archive/business/1989/07/26/ibm-to-take-over-kodaks-data-processing/fc22f559-b2b4-4dc7-a6a3-ffeb35b58c3b/', publisher: 'The Washington Post (26 July 1989)', note: 'IBM agreed to build and run a data center taking over work spread across four Kodak centers.' },
  kodakEffect: { title: 'Diffusion of information technology outsourcing: influence sources and the Kodak effect', href: 'https://jstor.org/stable/23010646', publisher: 'Information Systems Research (academic article, via JSTOR)', note: 'Argues that Kodak\u2019s 1989 deal, transferring four data centers and about 300 IT staff to IBM, was a critical event that made IT outsourcing a serious strategic choice.' },
  offshoreY2k: { title: 'Enabling factors for the recent offshoring trend', href: 'https://www.institut-numerique.org/23-enabling-factors-for-recent-offshoring-trend-4ffbd6e5b6903', publisher: 'Institut du Num\u00e9rique (research excerpt)', note: 'States that the reprogramming demanded by the year-2000 problem exceeded domestic supply, so firms in the US and Europe turned to overseas suppliers.' },
  saasHistory: { title: 'The rise, fall, and resurrection of software as a service', href: 'https://cacm.acm.org/opinion/the-rise-fall-and-resurrection-of-software-as-a-service/', publisher: 'Communications of the ACM', note: 'Describes SaaS as running software remotely on the provider\u2019s infrastructure and cites Salesforce.com, launched in 1999, as an early and successful example.' },
  fptHistory: { title: 'FPT Corporation history', href: 'https://fpt.com/en/about-us/history', publisher: 'FPT Corporation (company website)', note: 'Founded in 1988 amid the Đổi Mới reforms by 13 scientists; renamed in 1990; first commercial software contract in late 1990 for a Vietnam Airlines reservation system, then IT projects in banking, public finance, telecoms and power; set globalisation with software outsourcing as its direction at a 1998 conference; a company history.' },
  fptMilestones: { title: 'FPT’s milestones on the way of globalization', href: 'https://fpt.com/en/news/fpt-news/fpts-milestones-on-the-way-of-globalization-', publisher: 'FPT Corporation (company news, 2013)', note: 'Dated milestones: distribution partnerships with Olivetti, IBM and Compaq in 1989–95, an Oracle alliance in 1997, a branch in Bangalore in January 1999, the first software export to North America on 13 June 1999 and ISO 9001 certification in February 2000; a company account.' },
  vietnamBriefingIt: { title: 'Vietnam IT services: nearshore and offshore outsourcing opportunities', href: 'https://www.vietnam-briefing.com/news/vietnam-it-services-market-nearshore-and-offshore-outsourcing-opportunities.html/', publisher: 'Vietnam Briefing (Dezan Shira & Associates)', note: 'Repeats Mordor Intelligence\u2019s Vietnam IT services estimates and links growth to cloud adoption, digital government spending and nearshore outsourcing demand from Japan and the United States.' },
} satisfies Record<string, FashionM2Source>;
export type EntSourceId = keyof typeof ENT_SOURCES;
export const citeEnt = (...ids: EntSourceId[]): FashionM2Source[] => ids.map((id) => ENT_SOURCES[id]);

export const EntDeepDive = F2DeepDive;
export const entQuiz = f2Quiz;

export function entChapter(input: Omit<EntM1CardData, 'concepts'>): EntM1CardData {
  return { ...input, concepts: [] };
}
