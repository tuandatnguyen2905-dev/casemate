import type { VisualSpec } from './fashionVisualKit';
import { CONSTRUCTION_ADVISORY_M1_VISUALS } from './constructionAdvisoryM1VisualSpecs';
import { CONSTRUCTION_ADVISORY_M2_VISUALS } from './constructionAdvisoryM2VisualSpecs';
import { CONSTRUCTION_ADVISORY_M3_VISUALS } from './constructionAdvisoryM3VisualSpecs';
import { CONSTRUCTION_ADVISORY_M4_VISUALS } from './constructionAdvisoryM4VisualSpecs';
import { CONSTRUCTION_ADVISORY_M5_VISUALS } from './constructionAdvisoryM5VisualSpecs';

export interface ConstructionAdvisoryChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Project & Construction Advisory Modules 01–05, keyed by visualKind. */
export const CONSTRUCTION_ADVISORY_CHAPTER_VISUALS: Record<string, ConstructionAdvisoryChapterVisual> = {
  ...CONSTRUCTION_ADVISORY_M1_VISUALS,
  ...CONSTRUCTION_ADVISORY_M2_VISUALS,
  ...CONSTRUCTION_ADVISORY_M3_VISUALS,
  ...CONSTRUCTION_ADVISORY_M4_VISUALS,
  ...CONSTRUCTION_ADVISORY_M5_VISUALS,
};
