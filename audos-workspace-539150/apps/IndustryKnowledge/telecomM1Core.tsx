import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { TELECOM_M1_VISUALS } from './telecomM1VisualSpecs';

export type TelecomM1VisualKind = `telecom-m1-${number}`;
export interface TelecomM1CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  legacyIndex?: number;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: Array<{ label: 'What it is' | 'How it works' | 'Example' | 'Why it matters'; text: string }>;
  visualKind: TelecomM1VisualKind;
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
export interface TelecomM1LessonBundle {
  deck: TelecomM1CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

export const TELECOM_M1_SOURCES = {
  omdia2025: {
    title: 'Global telecom connectivity revenues grew by 4% in 2025, with 5G surpassing 3bn connections',
    href: 'https://omdia.tech.informa.com/pr/2026/apr/global-telecom-connectivity-revenues-grew-by-4percent-in-2025-with-5g-surpassing-3bn-connections',
    publisher: 'Omdia (20 April 2026)',
    note: 'Commercial market update: US$1.3T of 2025 connectivity revenue across mobile, fixed broadband, and fixed voice; 3B 5G connections and 1.6B fixed-broadband connections. Connections are subscriptions, not unique people.',
  },
  mstApril2026: {
    title: 'Vietnam mobile and fixed broadband speeds remain among the regional leaders',
    href: 'https://mst.gov.vn/toc-do-bang-rong-di-dong-va-co-dinh-cua-viet-nam-duy-tri-trong-nhom-dan-dau-khu-vuc-197260506092138038.htm',
    publisher: 'Ministry of Science and Technology of Viet Nam (6 May 2026)',
    note: 'Official statistics as of April 2026: 110.5M mobile-broadband subscriptions, including 22.42M 5G subscriptions, and 25.26M fixed-broadband subscriptions.',
  },
  gov5g2026: {
    title: 'Viet Nam proactively prepares for 6G technology',
    href: 'https://baochinhphu.vn/viet-nam-chu-dong-chuan-bi-cho-cong-nghe-6g-102260812131046143.htm',
    publisher: 'Viet Nam Government Portal (12 August 2026)',
    note: 'Attributes to the Telecommunications Authority a retrospective early-2026 milestone of more than 40,000 5G base stations, about 91.9% population coverage, and more than 24M 5G subscriptions. Coverage does not imply identical performance everywhere.',
  },
  ituFacts2025: {
    title: 'Facts and Figures 2025',
    href: 'https://www.itu.int/en/mediacentre/Pages/PR-2025-11-17-Facts-and-Figures.aspx',
    publisher: 'International Telecommunication Union (17 November 2025)',
    note: 'Estimates 6B people online and 2.2B offline in 2025; also estimates about 3B 5G subscriptions. People and subscriptions are different measures.',
  },
  ituMeaningful: {
    title: 'Universal and Meaningful Connectivity',
    href: 'https://www.itu.int/itu-d/sites/projectumc/home/aboutumc/',
    publisher: 'International Telecommunication Union',
    note: 'Defines meaningful connectivity through quality, availability, affordability, devices, skills, and security.',
  },
  ituCables2025: {
    title: 'Submarine cable resilience summit declaration',
    href: 'https://www.itu.int/en/mediacentre/Pages/PR-2025-02-27-submarine-cables-summit-nigeria.aspx',
    publisher: 'International Telecommunication Union (27 February 2025)',
    note: 'Reports that more than 99% of international data traffic is carried by submarine telecommunications cables and emphasizes route and landing diversity, protection, and timely repair.',
  },
} satisfies Record<string, FashionM2Source>;

export type TelecomM1SourceId = keyof typeof TELECOM_M1_SOURCES;
export const telecomM1Quiz = f2Quiz;

export function telecomM1Chapter(input: {
  title: string;
  lesson: string;
  legacyIndex?: number;
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
  visual: TelecomM1VisualKind;
  sources: TelecomM1SourceId[];
  stats?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
}): TelecomM1CardData {
  return {
    title: input.title,
    chapterTitle: '',
    readingTime: '3',
    legacyIndex: input.legacyIndex,
    objective: input.objective,
    mateIntro: input.intro,
    keyInsight: input.insight,
    concepts: [],
    narrative: [
      { label: 'What it is', text: input.what },
      { label: 'How it works', text: input.why },
      { label: 'Example', text: `${input.example} Vietnam application: ${input.vietnam}` },
      { label: 'Why it matters', text: input.impact },
    ],
    visualKind: input.visual,
    visualHeading: TELECOM_M1_VISUALS[input.visual]?.heading ?? input.title,
    visualIntro: TELECOM_M1_VISUALS[input.visual]?.intro ?? 'Use the visual to connect infrastructure, services, customers, economics, and resilience.',
    imageAlt: `Casemate telecommunications overview visual for ${input.title}`,
    statTiles: input.stats ?? [
      { value: String(input.activities.length), label: 'Industry dimensions', description: input.activities.join(' · ') },
      { value: String(input.terms.length), label: 'Key terms', description: 'Core telecommunications and connectivity vocabulary.' },
      { value: '1', label: 'Central insight', description: input.insight },
    ],
    statsNote: input.stats ? 'Measured claims preserve publisher, period, scope, and whether they count people, subscriptions, coverage, or revenue.' : 'Tiles summarize chapter concepts; no unsourced market figures are presented.',
    keyTerms: input.terms.map(([term, definition]) => ({ term, definition })),
    recap: input.recap,
    chapterRecap: input.recap.join(' '),
    deepDiveTitle: 'How connectivity capability creates economic value',
    body: <F2DeepDive paragraphs={[input.what, input.why, input.example, input.vietnam, input.impact]} evidence="Market figures retain their publisher, observation period, geography, and unit of measurement." />,
    sources: input.sources.map((id) => TELECOM_M1_SOURCES[id]),
  };
}
