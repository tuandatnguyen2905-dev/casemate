import type { FashionM2Question, FashionM2Takeaways } from './fashionM2Core';
import type { EcomM1CardData } from './ecomM1Core';
export { citeEcom, EcomDeepDive, ecomQuiz } from './ecomM1Core';
export type EcomModule03VisualKind = `ecom-m3-${string}`;
export interface EcomM3CardData extends Omit<EcomM1CardData, 'visualKind'> { visualKind: EcomModule03VisualKind }
export interface EcomM3LessonBundle { deck: EcomM3CardData[]; quiz: FashionM2Question[]; takeaways: FashionM2Takeaways }
export function ecomM3Chapter(input: Omit<EcomM3CardData, 'concepts'>): EcomM3CardData { return { ...input, concepts: [] }; }
