import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';
import type { EntM1CardData } from './entM1Core';

export { ENT_SOURCES, citeEnt, EntDeepDive, entQuiz } from './entM1Core';
export type { EntSourceId } from './entM1Core';

export type EntModule02VisualKind = `ent-m2-${string}`;

export interface EntM2CardData extends Omit<EntM1CardData, 'visualKind'> {
  visualKind: EntModule02VisualKind;
}

export interface EntM2LessonBundle {
  deck: EntM2CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

/**
 * Module 02 for Enterprise Software & IT Services reuses the Module 01 source library. Figures with different
 * definitions are never combined: Gartner covers worldwide IT spending, Mordor covers Vietnam IT services only,
 * VINASA and Tuoi Tre figures cover software and technology-firm exports, and FPT figures are company-reported.
 */
export function entM2Chapter(input: Omit<EntM2CardData, 'concepts'>): EntM2CardData {
  return { ...input, concepts: [] };
}
