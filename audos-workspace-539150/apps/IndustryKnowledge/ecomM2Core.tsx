import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';
import type { EcomM1CardData } from './ecomM1Core';

export { ECOM_SOURCES, citeEcom, EcomDeepDive, ecomQuiz } from './ecomM1Core';
export type { EcomSourceId } from './ecomM1Core';

export type EcomModule02VisualKind = `ecom-m2-${string}`;

export interface EcomM2CardData extends Omit<EcomM1CardData, 'visualKind'> {
  visualKind: EcomModule02VisualKind;
}

export interface EcomM2LessonBundle {
  deck: EcomM2CardData[];
  quiz: FashionM2Question[];
  takeaways: FashionM2Takeaways;
}

export function ecomM2Chapter(input: Omit<EcomM2CardData, 'concepts'>): EcomM2CardData {
  return { ...input, concepts: [] };
}
