import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { TELECOM_M2_VISUALS } from './telecomM2VisualSpecs';

export type TelecomM2VisualKind = `telecom-m2-${number}`;
export interface TelecomM2CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: Array<{ label: 'What it is' | 'Why it is happening' | 'Real-world example' | 'Vietnam example' | 'Business impact'; text: string }>;
  visualKind: TelecomM2VisualKind;
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
export interface TelecomM2LessonBundle {
  deck: TelecomM2CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

export const TELECOM_M2_SOURCES = {
  threeGpp: {
    title: '3GPP — The Mobile Broadband Standard',
    href: 'https://www.3gpp.org/specifications.html/',
    publisher: '3rd Generation Partnership Project',
    note: 'Official overview of the global partnership and technical reports and specifications underpinning mobile systems.',
  },
  ituStandards: {
    title: 'Consensus-based technical standards',
    href: 'https://www.itu.int/en/mediacentre/backgrounders/Pages/standardization.aspx',
    publisher: 'International Telecommunication Union',
    note: 'Explains ITU-R and ITU-T Recommendations, interoperability, consensus development, and the relationship between standards and regulation.',
  },
  ituSpectrum: {
    title: 'ITU-R: Managing the radio-frequency spectrum for the world',
    href: 'https://www.itu.int/en/mediacentre/backgrounders/Pages/itu-r-managing-the-radio-frequency-spectrum-for-the-world.aspx',
    publisher: 'International Telecommunication Union',
    note: 'Official overview of ITU-R spectrum and satellite-orbit coordination; national regulators authorize spectrum under domestic frameworks.',
  },
  ituSupplyChain: {
    title: 'Supply chain of telecom/ICT infrastructure related to international Internet connectivity costs',
    href: 'https://www.itu.int/dms_pub/itu-t/opb/fg/T-FG-CD-2025-4-PDF-E.pdf',
    publisher: 'ITU Focus Group Technical Report (October 2025)',
    note: 'Maps international connectivity, national backbones, exchanges, metro and middle mile, last-mile access, passive infrastructure, and customer premises equipment.',
  },
  ituSharing: {
    title: 'Shared uses of telecommunication infrastructure',
    href: 'https://www.itu.int/epublications/publication/itu-t-d-264-2020-04-shared-uses-of-telecommunication-infrastructure-as-possible-methods-for-enhancing-the-efficiency-of-telecommunications',
    publisher: 'ITU-T Recommendation D.264',
    note: 'Official guidance on passive and active infrastructure-sharing options and their regulatory and competition considerations.',
  },
  ituCables: {
    title: 'Submarine cable resilience summit declaration',
    href: 'https://www.itu.int/en/mediacentre/Pages/PR-2025-02-27-submarine-cables-summit-nigeria.aspx',
    publisher: 'International Telecommunication Union (27 February 2025)',
    note: 'Emphasizes submarine-cable protection, diverse routes and landings, monitoring, timely deployment, and repair.',
  },
} satisfies Record<string, FashionM2Source>;

export type TelecomM2SourceId = keyof typeof TELECOM_M2_SOURCES;
export const telecomM2Quiz = f2Quiz;

export function telecomM2Chapter(input: {
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
  visual: TelecomM2VisualKind;
  sources: TelecomM2SourceId[];
  stats?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
}): TelecomM2CardData {
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
    visualHeading: TELECOM_M2_VISUALS[input.visual]?.heading ?? input.title,
    visualIntro: TELECOM_M2_VISUALS[input.visual]?.intro ?? 'Use the visual to follow technology, infrastructure, operations, services, and value across the chain.',
    imageAlt: `Casemate telecommunications value-chain visual for ${input.title}`,
    statTiles: input.stats ?? [
      { value: String(input.activities.length), label: 'Value-chain activities', description: input.activities.join(' · ') },
      { value: String(input.terms.length), label: 'Key terms', description: 'Core telecommunications value-chain vocabulary.' },
      { value: '1', label: 'Central insight', description: input.insight },
    ],
    statsNote: input.stats ? 'Measured claims preserve source, scope, period, and unit.' : 'Tiles summarize chapter concepts; no unsourced market figures are presented.',
    keyTerms: input.terms.map(([term, definition]) => ({ term, definition })),
    recap: input.recap,
    chapterRecap: input.recap.join(' '),
    deepDiveTitle: 'How this stage creates and captures value',
    body: <F2DeepDive paragraphs={[input.what, input.why, input.example, input.vietnam, input.impact]} evidence="Structural claims follow the supplied curriculum and official 3GPP and ITU references." />,
    sources: input.sources.map((id) => TELECOM_M2_SOURCES[id]),
  };
}
