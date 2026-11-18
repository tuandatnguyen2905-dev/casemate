import type { ReactNode } from 'react';
import { F2DeepDive, f2Quiz } from './fashionM2Core';
import type { FashionM2Narrative, FashionM2Question, FashionM2Source, FashionM2Takeaways } from './fashionM2Core';
import { PHARMACY_M4_SOURCES } from './pharmacyM4Core';

export type PharmacyModule05VisualKind = `pharmacy-m5-${string}`;

export interface PharmacyM5CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: FashionM2Narrative[];
  visualKind: PharmacyModule05VisualKind;
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

export interface PharmacyM5LessonBundle {
  deck: PharmacyM5CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 05 reuses the Module 01 to 04 source library: broker and market counts, the amended Law on Pharmacy and its
 * guiding texts, the 2025 circulars, the data protection law and company statements. Regulatory dates are taken from
 * those texts as summarised there, and company or broker figures are reported as published and labelled as such.
 */
export const PHARMACY_M5_SOURCES = {
  ...PHARMACY_M4_SOURCES,
} satisfies Record<string, FashionM2Source>;
export type PharmacyM5SourceId = keyof typeof PHARMACY_M5_SOURCES;
export const citeP5 = (...ids: PharmacyM5SourceId[]): FashionM2Source[] => ids.map((id) => PHARMACY_M5_SOURCES[id]);

export const P5DeepDive = F2DeepDive;
export const p5Quiz = f2Quiz;

export function p5Chapter(input: Omit<PharmacyM5CardData, 'concepts'>): PharmacyM5CardData {
  return { ...input, concepts: [] };
}
