import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';

export type EcomModule01VisualKind = `ecom-m1-${string}`;

export interface EcomM1CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: EcomModule01VisualKind;
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

export interface EcomM1LessonBundle {
  deck: EcomM1CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 01 for E-Commerce & Digital Marketplaces uses the EMARKETER global forecast, MOIT’s 2025
 * Vietnam estimate and VECOM’s separate 2024 estimate. They are never combined into one series because
 * publisher, period and methodology differ. Everywhere the brief describes a structure rather than supplying a
 * measurement, the chapter says so instead of inventing a number.
 */
export const ECOM_SOURCES = {
  emarketerForecast: { title: 'Ecommerce to account for more than 20% of worldwide retail sales despite slowdown', href: 'https://www.emarketer.com/content/ecommerce-account-more-than-20--of-worldwide-retail-sales-despite-slowdown', publisher: 'EMARKETER (commercial forecast, 22 May 2025)', note: 'Forecasts worldwide retail e-commerce sales of US$6.419 trillion in 2025, equal to 20.5% of total global retail sales. EMARKETER says its estimates combine research-firm and government data, historical trends, retailer revenues, consumer buying trends and macroeconomic conditions. This is a commercial forecast, not an official statistic.' },
  unctadDigitalEconomy: { title: 'E-commerce and the digital economy', href: 'https://unctad.org/topic/ecommerce-and-digital-economy', publisher: 'UNCTAD (United Nations Conference on Trade and Development)', note: 'The UN programme covering digital trade, the B2C E-commerce Index and cross-border digital commerce; the standard public reference for how e-commerce is defined internationally.' },
  unctadMeasuring: { title: 'Measuring e-commerce and the digital economy', href: 'https://unctad.org/topic/ecommerce-and-digital-economy/measuring-ecommerce-digital-economy', publisher: 'UNCTAD', note: 'Explains why e-commerce statistics differ between sources: coverage of services, B2B transactions, cross-border sales and digitally ordered versus digitally delivered trade all vary by definition.' },
  unctadDer: { title: 'Digital Economy Report', href: 'https://unctad.org/publication/digital-economy-report-2024', publisher: 'UNCTAD', note: 'UN analysis of the digital economy including its environmental footprint — data centres, devices, packaging and freight — relevant to the sustainability pressures on parcel-heavy commerce.' },
  wtoEcommerce: { title: 'Electronic commerce', href: 'https://www.wto.org/english/tratop_e/ecom_e/ecom_e.htm', publisher: 'World Trade Organization', note: 'Official WTO page on the Work Programme on Electronic Commerce and the moratorium on customs duties on electronic transmissions; the reference point for cross-border digital trade rules.' },
  moitMarket2025: { title: 'Kết nối “ba nhà” phát triển thương mại điện tử', href: 'https://moit.gov.vn/tin-tuc/bo-cong-thuong-thuc-day-ket-noi-ba-nha-phat-trien-thuong-mai-dien-tu.html', publisher: 'Ministry of Industry and Trade of Vietnam (23 October 2026)', note: 'Reports Vietnam’s 2025 e-commerce market at about US$31 billion, up 25.5% year on year and equal to about 11% of total retail sales of goods and consumer-service revenue. This is the ministry’s 2025 estimate.' },
  vecomEbi2025: { title: 'Giảm thiểu rác thải nhựa từ xanh hoá môi trường thương mại điện tử', href: 'https://moit.gov.vn/bao-ve-moi-truong/giam-thieu-rac-thai-nhua-tu-xanh-hoa-moi-truong-thuong-mai-dien-tu.html', publisher: 'Ministry of Industry and Trade article quoting VECOM E-Business Index 2025', note: 'Attributes to VECOM a 2024 estimate of US$32 billion for total e-commerce, including US$22.5 billion of online retail goods and about 12% of total retail sales of goods and consumer-service revenue. These are VECOM estimates for 2024, not MOIT figures for 2025.' },
  govLaw122: { title: 'Law No. 122/2025/QH15 on E-Commerce', href: 'https://vanban.chinhphu.vn/?docid=216503&pageid=27160', publisher: 'Government of Vietnam official legal-document portal', note: 'Official record: enacted 10 December 2025 and effective 1 July 2026.' },
  govDecree248: { title: 'Decree No. 248/2026/ND-CP detailing the Law on E-Commerce', href: 'https://vanban.chinhphu.vn/?docid=218747&pageid=27160', publisher: 'Government of Vietnam official legal-document portal', note: 'Official record: issued 30 June 2026 and effective 1 July 2026.' },
  moitLawGuide: { title: 'Ministry of Industry and Trade disseminates the Law on E-commerce and Decree No. 248/2026/ND-CP', href: 'https://moit.gov.vn/en/news/ministry-of-industry-and-trade-disseminates-the-law-on-e-commerce-and-government-decree-no.-248-2026-nd-cp.html', publisher: 'Ministry of Industry and Trade of Vietnam (3 July 2026)', note: 'Official implementation summary covering seller identity verification, public operating rules, complaint handling, record retention, cooperation with authorities, unlawful listings, livestream sellers and consumer information rights.' },
  nsoRetail: { title: 'Retail sales of goods and consumer services', href: 'https://www.nso.gov.vn/en/', publisher: 'National Statistics Office of Vietnam', note: 'Official national retail statistics. The denominator behind any e-commerce penetration percentage; it covers all goods and consumer services, far more than online trade.' },
  vecom: { title: 'Vietnam E-commerce Association (VECOM)', href: 'https://vecom.vn/', publisher: 'Vietnam E-commerce Association', note: 'Industry association that publishes the annual Vietnam E-Business Index. Its market definitions differ from the Ministry of Industry and Trade’s, so its figures are not directly comparable with the ministry’s.' },
  econSea: { title: 'e-Conomy SEA report', href: 'https://economysea.withgoogle.com/', publisher: 'Google, Temasek and Bain & Company', note: 'Annual Southeast Asia digital economy report. It is built on gross merchandise value, a different basis from official retail statistics, so it should not be compared directly with ministry figures.' },
  dhlTrends2026: { title: '2026 E-Commerce Trends Report', href: 'https://www.dhl.com/global-en/microsites/ec/ecommerce-insights/insights/reports/2026-ecommerce-trends-report.html', publisher: 'DHL eCommerce (2026 commercial survey report)', note: 'DHL reports 70% of surveyed shoppers buy internationally, up from 60% in 2025, and highlights delivery, customs, returns and trust as barriers. Survey findings are commercial research, not official statistics.' },
  dhlAi2026: { title: 'DHL E-Commerce Trends Report 2026: Old rules do not apply in the age of AI', href: 'https://group.dhl.com/en/media-relations/press-releases/2026/dhl-ecommerce-trends-report-2026-old-rules-do-not-apply-in-the-age-of-ai.html', publisher: 'DHL Group (2 June 2026)', note: 'Reports that 29% of surveyed shoppers would let AI make shopping decisions or purchases within five years; willingness was 33% among Gen Z and 36% among millennials. A DHL survey finding, not a market forecast.' },
  metric2025: { title: 'Metric chính thức công bố Báo cáo Thương mại Điện tử 2025', href: 'https://metric.vn/insights/cong-bo-bao-cao-thuong-mai-dien-tu-viet-nam-2025/', publisher: 'Metric (commercial marketplace analytics, January 2026)', note: 'For 1 January–31 December 2025 across Shopee, TikTok Shop, Lazada and Tiki only: GMV of VND429.7 trillion, up 34.75% year on year. This four-platform dataset is not the whole Vietnamese e-commerce economy.' },
  metricCompetition2025: { title: 'Thị trường TMĐT Việt Nam năm 2025: những chuyển dịch đáng chú ý', href: 'https://metric.vn/insights/thi-truong-tmdt-viet-nam-nam-2025-nhung-chuyen-dich-dang-chu-y/', publisher: 'Metric (commercial marketplace analytics, 14 January 2026)', note: 'Within the same four-platform 2025 dataset, Metric reports Shopee at 56.04% of GMV and TikTok Shop at 41.31%; Lazada and Tiki together account for the remaining approximately 3%. These are commercial estimates for the included platforms, not national market shares.' },
  worldBankVietnam: { title: 'Vietnam country overview and economic data', href: 'https://www.worldbank.org/en/country/vietnam', publisher: 'World Bank', note: 'Official macroeconomic context — income, consumption, urbanisation and growth — behind consumer demand for online purchasing.' },
  vietnamBriefing: { title: 'Vietnam e-commerce, tax and regulatory coverage', href: 'https://www.vietnam-briefing.com/', publisher: 'Vietnam Briefing (Dezan Shira & Associates)', note: 'Advisory analysis of Vietnamese market and compliance developments; secondary coverage, so verify against the gazette and official statistics.' },
} satisfies Record<string, FashionM2Source>;
export type EcomSourceId = keyof typeof ECOM_SOURCES;
export const citeEcom = (...ids: EcomSourceId[]): FashionM2Source[] => ids.map((id) => ECOM_SOURCES[id]);

export const EcomDeepDive = F2DeepDive;
export const ecomQuiz = f2Quiz;

export function ecomChapter(input: Omit<EcomM1CardData, 'concepts'>): EcomM1CardData {
  return { ...input, concepts: [] };
}
