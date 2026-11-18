import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { TELECOM_M4_VISUALS } from './telecomM4VisualSpecs';
import { TELECOM_M2_SOURCES } from './telecomM2Core';

export const TELECOM_M4_SOURCES = {
  ...TELECOM_M2_SOURCES,
  vietnamDominance2025: {
    title: 'Circular 05/2025/TT-BKHCN — dominant-position telecommunications enterprises',
    href: 'https://vanban.chinhphu.vn/?docid=213878&pageid=27160',
    publisher: 'Viet Nam Government legal portal',
    note: 'Official circular effective 20 July 2025: Viettel and VNPT are listed for fixed terrestrial Internet access; Viettel, VNPT, and MobiFone are listed for terrestrial mobile voice and Internet access.',
  },
  dellOroRAN2025: {
    title: 'RAN Market Stabilized in 2025',
    href: 'https://www.delloro.com/news/ran-market-stabilized-in-2025/',
    publisher: 'Dell’Oro Group (17 February 2026)',
    note: 'Commercial research: 2025 worldwide RAN revenue top five were Huawei, Ericsson, Nokia, ZTE, and Samsung. This is a RAN-vendor revenue ranking, not a complete telecom-company ranking.',
  },
  gsmaVietnam5G: {
    title: 'Accelerating 5G in Vietnam',
    href: 'https://www.gsma.com/connectivity-for-good/spectrum/wp-content/uploads/2024/11/GSMA_Accelerating-5G-in-Vietnam-2024.pdf',
    publisher: 'GSMA (2024)',
    note: 'Industry-association analysis of Vietnam spectrum; recommends an average 2 GHz of mid-band spectrum per country by 2030 and identifies a Vietnam shortfall at the report date. This is a recommendation and scenario, not a guaranteed requirement or outcome.',
  },
} satisfies Record<string, FashionM2Source>;

export type TelecomM4SourceId = keyof typeof TELECOM_M4_SOURCES;
export type TelecomM4VisualKind = `telecom-m4-${number}`;
export interface TelecomM4CardData {
  title: string; chapterTitle: string; readingTime: string; objective: string; mateIntro: string; keyInsight: string; concepts: [];
  narrative: Array<{ label: 'What it is' | 'Why it is happening' | 'Real-world example' | 'Vietnam example' | 'Business impact'; text: string }>;
  visualKind: TelecomM4VisualKind; visualHeading: string; visualIntro: string; imageAlt: string;
  statTiles: Array<{ value?: string; label: string; subtitle?: string; description: string }>; statsNote: string;
  keyTerms: Array<{ term: string; definition: string }>; recap: string[]; chapterRecap: string; deepDiveTitle: string; body: ReactNode; sources: FashionM2Source[];
}
export interface TelecomM4LessonBundle { deck: TelecomM4CardData[]; quiz: FashionM2Question[]; takeaways: FashionM2Takeaways }
export const telecomM4Quiz = f2Quiz;
export function telecomM4Chapter(input: { title: string; lesson: string; objective: string; intro: string; insight: string; what: string; why: string; example: string; vietnam: string; impact: string; activities: string[]; terms: Array<[string,string]>; recap: string[]; visual: TelecomM4VisualKind; sources: TelecomM4SourceId[]; stats?: Array<{ value?: string; label: string; subtitle?: string; description: string }> }): TelecomM4CardData {
  return { title: input.title, chapterTitle: input.lesson, readingTime: '8', objective: input.objective, mateIntro: input.intro, keyInsight: input.insight, concepts: [], narrative: [{ label: 'What it is', text: input.what }, { label: 'Why it is happening', text: input.why }, { label: 'Real-world example', text: input.example }, { label: 'Vietnam example', text: input.vietnam }, { label: 'Business impact', text: input.impact }], visualKind: input.visual, visualHeading: TELECOM_M4_VISUALS[input.visual]?.heading ?? input.title, visualIntro: TELECOM_M4_VISUALS[input.visual]?.intro ?? 'Use the visual to compare competitive capabilities, evidence, economics, and strategic implications.', imageAlt: `Casemate telecommunications competitive-landscape visual for ${input.title}`, statTiles: input.stats ?? [{ value: String(input.activities.length), label: 'Competitive dimensions', description: input.activities.join(' · ') }, { value: String(input.terms.length), label: 'Key terms', description: 'Core telecommunications competition vocabulary.' }, { value: '1', label: 'Central insight', description: input.insight }], statsNote: input.stats ? 'Measured claims preserve publisher, period, market scope, and regulatory or commercial-research status.' : 'Tiles summarize chapter concepts; no unsourced market figures are presented.', keyTerms: input.terms.map(([term, definition]) => ({ term, definition })), recap: input.recap, chapterRecap: input.recap.join(' '), deepDiveTitle: 'How competitive advantage is built and sustained', body: <F2DeepDive paragraphs={[input.what,input.why,input.example,input.vietnam,input.impact]} evidence="Regulatory and market claims retain their original source, scope, and status." />, sources: input.sources.map((id) => TELECOM_M4_SOURCES[id]) };
}
