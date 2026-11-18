import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { TELECOM_M3_VISUALS } from './telecomM3VisualSpecs';
import { TELECOM_M2_SOURCES } from './telecomM2Core';
import type { TelecomM2SourceId } from './telecomM2Core';

export type TelecomM3VisualKind = `telecom-m3-${number}`;
export interface TelecomM3CardData {
  title: string; chapterTitle: string; readingTime: string; objective: string; mateIntro: string; keyInsight: string; concepts: [];
  narrative: Array<{ label: 'What it is' | 'Why it is happening' | 'Real-world example' | 'Vietnam example' | 'Business impact'; text: string }>;
  visualKind: TelecomM3VisualKind; visualHeading: string; visualIntro: string; imageAlt: string;
  statTiles: Array<{ value?: string; label: string; subtitle?: string; description: string }>; statsNote: string;
  keyTerms: Array<{ term: string; definition: string }>; recap: string[]; chapterRecap: string; deepDiveTitle: string; body: ReactNode; sources: FashionM2Source[];
}
export interface TelecomM3LessonBundle { deck: TelecomM3CardData[]; quiz: FashionM2Question[]; takeaways: FashionM2Takeaways }
export type TelecomM3SourceId = TelecomM2SourceId;
export const telecomM3Quiz = f2Quiz;

export function telecomM3Chapter(input: {
  title: string; lesson: string; objective: string; intro: string; insight: string; what: string; why: string; example: string; vietnam: string; impact: string;
  activities: string[]; terms: Array<[string, string]>; recap: string[]; visual: TelecomM3VisualKind; sources: TelecomM3SourceId[];
}): TelecomM3CardData {
  return {
    title: input.title, chapterTitle: input.lesson, readingTime: '8', objective: input.objective, mateIntro: input.intro, keyInsight: input.insight, concepts: [],
    narrative: [
      { label: 'What it is', text: input.what }, { label: 'Why it is happening', text: input.why },
      { label: 'Real-world example', text: input.example }, { label: 'Vietnam example', text: input.vietnam }, { label: 'Business impact', text: input.impact },
    ],
    visualKind: input.visual, visualHeading: TELECOM_M3_VISUALS[input.visual]?.heading ?? input.title,
    visualIntro: TELECOM_M3_VISUALS[input.visual]?.intro ?? 'Use the visual to connect the business model, customer need, economics, channel, and ecosystem.',
    imageAlt: `Casemate telecommunications business-model visual for ${input.title}`,
    statTiles: [
      { value: String(input.activities.length), label: 'Business dimensions', description: input.activities.join(' · ') },
      { value: String(input.terms.length), label: 'Key terms', description: 'Core telecommunications business-model vocabulary.' },
      { value: '1', label: 'Central insight', description: input.insight },
    ],
    statsNote: 'Tiles summarize chapter concepts; no unsourced market figures are presented.',
    keyTerms: input.terms.map(([term, definition]) => ({ term, definition })), recap: input.recap, chapterRecap: input.recap.join(' '),
    deepDiveTitle: 'How the model creates and captures value',
    body: <F2DeepDive paragraphs={[input.what, input.why, input.example, input.vietnam, input.impact]} evidence="The module is structural and qualitative; standards and infrastructure claims use the verified ITU and 3GPP source register." />,
    sources: input.sources.map((id) => TELECOM_M2_SOURCES[id]),
  };
}
