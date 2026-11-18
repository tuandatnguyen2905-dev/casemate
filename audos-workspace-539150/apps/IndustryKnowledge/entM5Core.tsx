import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { citeEnt3 } from './entM3Core';
import type { Ent3SourceId } from './entM3Core';
import { citeEnt4 } from './entM4Core';
import type { Ent4SourceId } from './entM4Core';
import type { EntM1CardData } from './entM1Core';

export { EntDeepDive, entQuiz } from './entM1Core';

export type EntModule05VisualKind = `ent-m5-${string}`;

export interface EntM5CardData extends Omit<EntM1CardData, 'visualKind'> {
  visualKind: EntModule05VisualKind;
}

export interface EntM5LessonBundle {
  deck: EntM5CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 05 reuses the Module 01, 03 and 04 source libraries and adds Gartner’s September 2026 AI spending forecast
 * and Vietnamese policy documents from July 2026. Forecasts, targets, company claims and our own arithmetic are
 * labelled separately and never combined, and overlapping Gartner categories are never added together.
 */
const EXTRA_SOURCES = {
  gartnerAi: { title: 'Gartner forecasts worldwide AI spending to grow 49.5% in 2026', href: 'https://www.gartner.com/en/newsroom/press-releases/2026-09-16-gartner-forecasts-worldwide-ai-spending-to-grow-49-point-5-percent-in-2026', publisher: 'Gartner (press release, 16 September 2026)', note: 'Worldwide AI spending forecast of about US$2.67 trillion in 2026 (US$2,670B), up 49.5% from about US$1.79 trillion in 2025 and US$3.64 trillion in 2027; AI infrastructure US$1,484B (about 56%), AI services US$576B, AI software US$462B, AI agents and assistants US$29B, AI cybersecurity US$51B (up from US$26B); vendors are embedding agentic AI in existing products; enterprises turn to service providers less for transformation and more for smaller projects, with a US$1.2 trillion AI services opportunity forecast by 2030. The AI figures overlap broader IT spending categories and earlier forecasts use different scopes.' },
  vnStrategyLegal: { title: 'Decision 1266/QD-TTg approving the National Digital Transformation Strategy 2026–2030, vision to 2045', href: 'https://vanban.chinhphu.vn/?docid=218925&pageid=27160', publisher: 'Government portal (Vietnamese-language legal text, 14 July 2026)', note: 'Targets for 2030 include a digital economy of at least 30% of GDP, support for at least 500,000 SMEs to transform digitally, at least five data exchanges, 100% digitised administrative records and 99% satisfaction with online public services; vision of a data- and AI-based national governance and domestic mastery of strategic digital technologies. Policy targets, not outcomes.' },
  vnStrategyNews: { title: 'Vietnam approves national digital transformation strategy for 2026–2030', href: 'https://en.vietnamplus.vn/vietnam-approves-national-digital-transformation-strategy-for-2026-2030-post348631.vnp', publisher: 'VietnamPlus (Vietnam News Agency, 21 July 2026)', note: 'English report that the strategy was approved under Decision 1266/QD-TTg dated 14 July 2026, placing people and businesses at the centre and aiming at a data- and AI-powered national governance system, strong domestic capabilities in strategic digital technologies and protection of digital sovereignty.' },
  vnDataStrategy: { title: 'National Data Strategy approved to drive AI, digital economy development', href: 'https://vietnamnews.vn/economy/1797044/national-data-strategy-approved-to-drive-ai-digital-economy-development.html', publisher: 'Viet Nam News (August 2026)', note: 'Decision 1308/QD-TTg (18 July 2026) approving the National Data Strategy 2026–2030: three national data centres with high-performance computing and AI infrastructure, a national AI data repository, at least 150 Make in Vietnam AI models, products and services, 1,000 companies specialising in data and AI, restoration of essential services within four hours of an incident, and a top-30 ranking in data governance and AI by 2045. Targets, not outcomes.' },
  vnAiLaw: { title: 'Viet Nam’s Law on Artificial Intelligence', href: 'https://en.baochinhphu.vn/viet-nams-law-on-artificial-intelligence-111260715113551787.htm', publisher: 'Vietnam Government news portal (English translation, July 2026)', note: 'Law 134/2025/QH15 adopted on 10 December 2025 and effective 1 March 2026; AI systems already in operation have 12 months to comply, or 18 months in healthcare, education and finance; authorities may require suspension of systems posing a risk of serious harm.' },
  vnAiLawRisk: { title: 'Luật Trí tuệ nhân tạo chính thức có hiệu lực từ 1/3', href: 'https://mst.gov.vn/ai-la-cong-cu-ho-tro-quyet-dinh-cuoi-cung-van-la-con-nguoi-19726030111172663.htm', publisher: 'Ministry of Science and Technology portal (Vietnamese-language, 1 March 2026)', note: 'Describes the Law on Artificial Intelligence as risk-based, classifying AI systems into three levels (low, medium and high), with strict transparency, safety and accountability requirements for high-risk systems, and states that AI is a support tool that does not replace human decision-making.' },
  kenCloudErpForecast: { title: 'Vietnam Cloud ERP for SMEs market report: market size by year', href: 'https://www.kenresearch.com/vietnam-cloud-erp-for-smes-market', publisher: 'Ken Research (market research summary)', note: 'Third-party estimates for cloud ERP subscriptions and related services to Vietnamese SMEs: about US$126.8 million in 2025, a forecast of about US$150.5 million for 2026 and about US$356.7 million for 2031. Excludes standalone accounting products and large-enterprise-only contracts.' },
} satisfies Record<string, FashionM2Source>;

const M3_IDS = ['misaPress', 'misaAccounting', 'misaPlatform', 'worldBankSme', 'vietnamplusSme', 'kenCloudErp'];

export type Ent5SourceId = Ent3SourceId | Ent4SourceId | keyof typeof EXTRA_SOURCES;

export const citeEnt5 = (...ids: Ent5SourceId[]): FashionM2Source[] => ids.map((id) => {
  if (id in EXTRA_SOURCES) return EXTRA_SOURCES[id as keyof typeof EXTRA_SOURCES];
  if (M3_IDS.includes(id)) return citeEnt3(id as Ent3SourceId)[0];
  return citeEnt4(id as Ent4SourceId)[0];
});

export function entM5Chapter(input: Omit<EntM5CardData, 'concepts'>): EntM5CardData {
  return { ...input, concepts: [] };
}
