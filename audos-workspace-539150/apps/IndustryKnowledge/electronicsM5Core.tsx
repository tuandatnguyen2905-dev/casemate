import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { ELECTRONICS_M5_VISUALS } from './electronicsM5VisualSpecs';

export type ElectronicsM5VisualKind = `electronics-m5-${number}`;
export interface ElectronicsM5CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: Array<{ label: 'What it is' | 'Why it is happening' | 'Real-world example' | 'Vietnam example' | 'Business impact'; text: string }>;
  visualKind: ElectronicsM5VisualKind;
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
export interface ElectronicsM5LessonBundle {
  deck: ElectronicsM5CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

export const ELECTRONICS_M5_SOURCES = {
  wstsSpring2026: {
    title: 'Global Semiconductor Market Surges Beyond USD 1.5 Trillion in 2026',
    href: 'https://www.wsts.org/esraCMS/extension/media/f/WST/7618/WSTS_FC-Release-2026-May.pdf',
    publisher: 'World Semiconductor Trade Statistics — Spring 2026 forecast',
    note: 'Forecasts US$1.511T of worldwide semiconductor sales in 2026, up 89.9%; memory at US$803.941B, up 249.5%. These are forecast values, not confirmed full-year results.',
  },
  euEcodesign2025: {
    title: 'New EU rules for durable, energy-efficient and repairable smartphones and tablets start applying',
    href: 'https://single-market-economy.ec.europa.eu/news/new-eu-rules-durable-energy-efficient-and-repairable-smartphones-and-tablets-start-applying-2025-06-20_en',
    publisher: 'European Commission (20 June 2025)',
    note: 'Official summary of EU ecodesign and energy-labelling requirements applying from 20 June 2025, including durability, repair, spare-parts, software-support, and repairability information.',
  },
  vietnamStrategy: {
    title: 'Viet Nam’s semiconductor industry development strategy issued',
    href: 'https://en.baochinhphu.vn/govt-targets-to-raise-turnover-of-semiconductor-industry-to-us100-billion-by-2050-111240923114027879.htm',
    publisher: 'Viet Nam Government Portal (23 September 2024)',
    note: 'Official report on Decision 1018/QD-TTg: strategy through 2030 with vision to 2050. Targets are policy objectives, not guaranteed outcomes.',
  },
  oecdVietnam: {
    title: 'Harnessing trade and investment flows to boost productivity',
    href: 'https://www.oecd.org/en/publications/oecd-economic-surveys-viet-nam-2025_fb37254b-en/full-report/harnessing-trade-and-investment-flows-to-boost-productivity_98d56c90.html',
    publisher: 'OECD Economic Survey: Viet Nam 2025',
    note: 'Assesses Vietnam’s semiconductor design and assembly/packaging/testing capabilities, imported-chip dependence, talent constraints, infrastructure needs, and policy ambitions.',
  },
  oecdValueChain: {
    title: 'Mapping the semiconductor value chain',
    href: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/06/mapping-the-semiconductor-value-chain_5ba52971/4154cdbf-en.pdf',
    publisher: 'OECD (2025)',
    note: 'Maps semiconductor design, fabrication, assembly, testing, packaging, equipment, materials, EDA, and IP dependencies.',
  },
} satisfies Record<string, FashionM2Source>;

export type ElectronicsM5SourceId = keyof typeof ELECTRONICS_M5_SOURCES;
export const electronicsM5Quiz = f2Quiz;

export function electronicsM5Chapter(input: {
  title: string;
  lesson: string;
  objective: string;
  intro: string;
  insight: string;
  what: string;
  why: string;
  example: string;
  vietnam: string;
  impact: string;
  activities: string[];
  terms: Array<[string, string]>;
  recap: string[];
  visual: ElectronicsM5VisualKind;
  sources: ElectronicsM5SourceId[];
  stats?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
}): ElectronicsM5CardData {
  return {
    title: input.title,
    chapterTitle: input.lesson,
    readingTime: '8',
    objective: input.objective,
    mateIntro: input.intro,
    keyInsight: input.insight,
    concepts: [],
    narrative: [
      { label: 'What it is', text: input.what },
      { label: 'Why it is happening', text: input.why },
      { label: 'Real-world example', text: input.example },
      { label: 'Vietnam example', text: input.vietnam },
      { label: 'Business impact', text: input.impact },
    ],
    visualKind: input.visual,
    visualHeading: ELECTRONICS_M5_VISUALS[input.visual]?.heading ?? input.title,
    visualIntro: ELECTRONICS_M5_VISUALS[input.visual]?.intro ?? 'Use the visual to connect demand, technology, channels, regulation, capability, and risk.',
    imageAlt: `Casemate outlook-and-trends visual for ${input.title}`,
    statTiles: input.stats ?? [
      { value: String(input.activities.length), label: 'Trend dimensions', description: input.activities.join(' · ') },
      { value: String(input.terms.length), label: 'Key terms', description: 'Core outlook-and-trends vocabulary for this chapter.' },
      { value: '1', label: 'Central insight', description: input.insight },
    ],
    statsNote: input.stats ? 'Measured claims preserve publisher, period, scope, and forecast or regulatory status.' : 'Tiles summarize chapter concepts; no unsourced market figures are presented.',
    keyTerms: input.terms.map(([term, definition]) => ({ term, definition })),
    recap: input.recap,
    chapterRecap: input.recap.join(' '),
    deepDiveTitle: 'How the trend changes strategic choices',
    body: <F2DeepDive paragraphs={[input.what, input.why, input.example, input.vietnam, input.impact]} evidence="Forecasts, policy targets, and effective requirements are labelled as such and linked to their original publishers." />,
    sources: input.sources.map((id) => ELECTRONICS_M5_SOURCES[id]),
  };
}
