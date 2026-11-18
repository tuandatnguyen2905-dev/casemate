import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { ELECTRONICS_M4_VISUALS } from './electronicsM4VisualSpecs';

export type ElectronicsM4VisualKind = `electronics-m4-${number}`;
export interface ElectronicsM4CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: Array<{ label: 'What it is' | 'Why it is happening' | 'Real-world example' | 'Vietnam example' | 'Business impact'; text: string }>;
  visualKind: ElectronicsM4VisualKind;
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
export interface ElectronicsM4LessonBundle {
  deck: ElectronicsM4CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

export const ELECTRONICS_M4_SOURCES = {
  gartner2025: {
    title: 'Gartner Says Worldwide Semiconductor Revenue Grew 21% in 2025',
    href: 'https://www.gartner.com/en/newsroom/press-releases/2026-01-12-gartner-says-worldwide-semiconductor-revenue-grew-21-percent-in-2025',
    publisher: 'Gartner (12 January 2026)',
    note: 'Preliminary vendor-revenue table: US$793.449B total 2025 semiconductor revenue; NVIDIA US$125.703B and 15.8%; SK hynix growth 37.2%; Micron growth 50.2%. Vendor revenue is not a universal technology ranking.',
  },
  counterpoint2025: {
    title: 'Global Smartphone Shipments Grew 2% YoY in 2025; Apple Emerged as Market Leader',
    href: 'https://counterpointresearch.com/en/insights/global-smartphone-shipments-grew-2-percent-YoY-in-2025',
    publisher: 'Counterpoint Research (12 January 2026)',
    note: 'Preliminary global smartphone sell-in shipment shares for 2025: Apple 20%, Samsung 19%, and Xiaomi 13%. These figures cover smartphones, not all consumer electronics.',
  },
  oecdVietnam: {
    title: 'Harnessing trade and investment flows to boost productivity',
    href: 'https://www.oecd.org/en/publications/oecd-economic-surveys-viet-nam-2025_fb37254b-en/full-report/harnessing-trade-and-investment-flows-to-boost-productivity_98d56c90.html',
    publisher: 'OECD Economic Survey: Viet Nam 2025',
    note: 'Reports approximately 50 chip-design firms, seven assembly/packaging/testing facilities, and no operational semiconductor foundry in the cited assessment.',
  },
  oecdValueChain: {
    title: 'Mapping the semiconductor value chain',
    href: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/06/mapping-the-semiconductor-value-chain_5ba52971/4154cdbf-en.pdf',
    publisher: 'OECD (2025)',
    note: 'Defines semiconductor business models and the specialized design, fabrication, assembly, testing, packaging, equipment, materials, EDA, and IP segments.',
  },
  sia: {
    title: 'Semiconductor Industry Association',
    href: 'https://www.semiconductors.org/',
    publisher: 'Semiconductor Industry Association',
    note: 'Industry reference for semiconductor technology, markets, manufacturing, and policy context.',
  },
} satisfies Record<string, FashionM2Source>;

export type ElectronicsM4SourceId = keyof typeof ELECTRONICS_M4_SOURCES;
export const electronicsM4Quiz = f2Quiz;

export function electronicsM4Chapter(input: {
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
  visual: ElectronicsM4VisualKind;
  sources: ElectronicsM4SourceId[];
  stats?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
}): ElectronicsM4CardData {
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
    visualHeading: ELECTRONICS_M4_VISUALS[input.visual]?.heading ?? input.title,
    visualIntro: ELECTRONICS_M4_VISUALS[input.visual]?.intro ?? 'Use the visual to compare competitive capabilities, evidence, and strategic implications.',
    imageAlt: `Casemate competitive-landscape visual for ${input.title}`,
    statTiles: input.stats ?? [
      { value: String(input.activities.length), label: 'Competitive dimensions', description: input.activities.join(' · ') },
      { value: String(input.terms.length), label: 'Key terms', description: 'Core competitive-landscape vocabulary for this chapter.' },
      { value: '1', label: 'Central insight', description: input.insight },
    ],
    statsNote: input.stats ? 'Publisher, period, geography, product scope, and preliminary status are retained for every measured figure.' : 'Tiles summarize chapter concepts; no unsourced market figures are presented.',
    keyTerms: input.terms.map(([term, definition]) => ({ term, definition })),
    recap: input.recap,
    chapterRecap: input.recap.join(' '),
    deepDiveTitle: 'How competitive advantage is built and sustained',
    body: <F2DeepDive paragraphs={[input.what, input.why, input.example, input.vietnam, input.impact]} evidence="Quantitative claims retain their original publisher, date, market scope, and preliminary status." />,
    sources: input.sources.map((id) => ELECTRONICS_M4_SOURCES[id]),
  };
}
