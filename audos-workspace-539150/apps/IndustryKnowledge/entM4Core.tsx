import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { ENT_SOURCES } from './entM1Core';
import { ENT_M3_SOURCES } from './entM3Core';
import type { EntM1CardData, EntSourceId } from './entM1Core';

export { EntDeepDive, entQuiz } from './entM1Core';

export type EntModule04VisualKind = `ent-m4-${string}`;

export interface EntM4CardData extends Omit<EntM1CardData, 'visualKind'> {
  visualKind: EntModule04VisualKind;
}

export interface EntM4LessonBundle {
  deck: EntM4CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 04 reuses the Module 01 source library and adds sources on software competition (Deloitte, Gartner) and
 * Vietnamese competitors (CMC, VINASA, FPT, Viettel). Company and press figures, analyst estimates, official
 * statements and our own arithmetic are labelled separately. The brief’s lists of companies are illustrative and are
 * not rankings.
 */
const EXTRA_SOURCES = {
  deloitteSoftware: { title: '2026 Software Industry Outlook', href: 'https://www.deloitte.com/global/en/insights/industry/technology/technology-media-telecom-outlooks/software-industry-outlook.html', publisher: 'Deloitte Insights', note: 'Says competition will heat up as AI-native challengers chip away at market leaders and create new segments; AI agent-powered solutions could represent 60% of the total addressable software market by 2030 (an estimate); incumbents aim to become end-to-end agentic platforms and are accelerating acquisitions; a hybrid market is likely, with incumbents holding mission-critical, tightly integrated workflows and AI-native tools winning targeted use cases.' },
  deloitteSaas: { title: 'SaaS meets AI agents', href: 'https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/saas-ai-agents.html', publisher: 'Deloitte Insights (2026 predictions)', note: 'Expects subscriptions and seat-based licensing to give way to hybrid usage- and outcome-based pricing, with new implementation and monetization complexity; quotes Gartner that by 2030, 35% of point-product SaaS tools will be replaced by AI agents or absorbed into larger agent ecosystems.' },
  gartnerTrends2026: { title: 'Top 10 Strategic Technology Trends for 2026', href: 'https://emt.gartnerweb.com/ngw/globalassets/en/chief-information-officer/documents/2026-top-tech-trends.pdf', publisher: 'Gartner', note: 'Lists AI-native development platforms and multiagent systems among 2026 trends; predicts that by 2030 80% of organizations will evolve large software engineering teams into smaller AI-augmented teams and 40% of enterprise application portfolios will include custom applications built on AI-native platforms, up from 2% in 2025. Analyst predictions, not measurements.' },
  cmcGrowth: { title: 'Vietnamese technology companies must master strategic technologies and expand into international markets', href: 'https://www.vietnam.vn/en/doanh-nghiep-cong-nghe-viet-nam-phai-lam-chu-cong-nghe-chien-luoc-vuon-ra-thi-truong-quoc-te', publisher: 'Vietnam.vn (press report of a meeting with the Deputy Prime Minister)', note: 'Reports CMC 2025 revenue of VND 10,555 billion (+17%), pre-tax profit of VND 737 billion (+26%) and more than 5,800 employees (company figures as reported); quotes the Deputy Prime Minister that domestic cloud providers hold only about 20% of the domestic cloud market, most of which belongs to foreign firms, and that Vietnamese technology firms’ revenue is a very small share of the market.' },
  cmcNtt: { title: 'CMC forges strategic partnership with NTT DATA', href: 'https://cmctelecom.vn/bai-viet/cmc-forges-strategic-partnership-with-ntt-data-expanding-it-service-delivery-for-the-japanese-and-vietnamese-markets/', publisher: 'CMC Telecom (company press release, January 2026)', note: 'CMC Global signed a cooperation agreement with NTT DATA and NTT DATA Vietnam on 27 January 2026 covering delivery resources, business development and R&D; CMC says its international market grew about 30% in 2025 with profit up 34%, that it is present in 30 countries, and that it aims to become a global-scale AI transformation company. Company claims.' },
  cmcDeck: { title: 'CMC Global sales pitching deck 2025', href: 'https://cmcglobal.com.vn/wp-content/uploads/2025/07/Sales-Pitching-Deck-2025-ENG-230625.pdf', publisher: 'CMC Global (company marketing document)', note: 'Describes a best-shore delivery model combining on-site, nearshore and offshore resources, 3,000+ talents, 500+ projects and 300+ clients, and services spanning software engineering, cloud, data and AI, ERP and CRM implementation and managed services. Marketing claims.' },
  cmcJapan: { title: 'Vietnam’s tech giant eyes revenue of up to 250 million USD from Japanese market by 2028', href: 'https://en.vietnamplus.vn/vietnams-tech-giant-eyes-revenue-of-up-to-250-million-usd-from-japanese-market-by-2028-post318394.vnp', publisher: 'VietnamPlus (April 2025)', note: 'CMC expects Japan revenue of US$200–250 million by 2028, about 50% of its foreign-market revenue, and plans US$100 million of investment in mini data centres in Japan. A company target, not a forecast.' },
  vietnamplusIct: { title: 'Vietnamese tech firms accelerate in 2025, shaping ICT pillars', href: 'https://en.vietnamplus.vn/vietnamese-tech-firms-accelerate-in-2025-shaping-ict-pillars-post338731.vnp', publisher: 'VietnamPlus (Vietnam News Agency)', note: 'Reports Viettel group consolidated revenue of VND 220 trillion in 2025 (+13.5%, including telecoms and other businesses); CMC training a 72-billion-parameter language model and completing CMC Cloud; VNPT deploying generative AI platforms at 30 administrative units and its operations centre in 18 of 34 provinces; FPT overseas revenue above VND 35 trillion; MISA integrating AI agents for more than 170,000 enterprises. Press report of company statements.' },
  vinasaTop10: { title: 'Top 10 doanh nghiệp công nghệ số Việt Nam 2025 đạt doanh thu 6,5 tỷ USD', href: 'https://vietnamfinance.vn/top-10-doanh-nghiep-cong-nghe-so-viet-nam-2025-dat-doanh-thu-65-ty-usd-d133847.html', publisher: 'VietnamFinance (Vietnamese-language; reporting VINASA, 9 October 2025)', note: 'VINASA’s first Vietnam digital technology company map placed 257 firms in 389 positions across 23 maps; 81 verified firms in the Top 10 programme held 169 positions, with combined 2024 revenue above VND 160,000 billion (about US$6.5 billion), over 40% of Vietnam’s software and IT services industry revenue, and more than 132,000 engineers.' },
  vinasaTechMap: { title: '81 doanh nghiệp công nghệ số đạt Top 10 góp hơn 160.000 tỷ đồng doanh thu', href: 'https://vietnamnet.vn/81-doanh-nghiep-cong-nghe-so-dat-top-10-gop-hon-160-000-ty-dong-doanh-thu-2450993.html', publisher: 'VietnamNet (Vietnamese-language; reporting VINASA, 9 October 2025)', note: 'Describes the VINASA Tech Map assessment system: 10 criteria across two axes, Vision and Execution, grouping firms into four strategic categories (leaders, capable performers, explorers and sector-advantage firms); Top 10 firms were verified directly by an expert council.' },
} satisfies Record<string, FashionM2Source>;

// Three Module 04 chapters cite MISA's 33% accounting-software share claim, which comes from the MISA press release recorded in Module 03.
const ALL_SOURCES = { ...ENT_SOURCES, misaPress: ENT_M3_SOURCES.misaPress, ...EXTRA_SOURCES } satisfies Record<string, FashionM2Source>;
export type Ent4SourceId = EntSourceId | keyof typeof EXTRA_SOURCES;
export const citeEnt4 = (...ids: Ent4SourceId[]): FashionM2Source[] => ids.map((id) => ALL_SOURCES[id]);

export function entM4Chapter(input: Omit<EntM4CardData, 'concepts'>): EntM4CardData {
  return { ...input, concepts: [] };
}
