import type { VisualSpec } from './fashionVisualKit';
import { REAL_ESTATE_ADVISORY_M1_VISUALS } from './realEstateAdvisoryM1VisualSpecs';
import { REAL_ESTATE_ADVISORY_M2_VISUALS } from './realEstateAdvisoryM2VisualSpecs';
import { REAL_ESTATE_ADVISORY_M3_VISUALS } from './realEstateAdvisoryM3VisualSpecs';
import { REAL_ESTATE_ADVISORY_M4_VISUALS } from './realEstateAdvisoryM4VisualSpecs';
import { REAL_ESTATE_ADVISORY_M5_VISUALS } from './realEstateAdvisoryM5VisualSpecs';

export interface RealEstateAdvisoryChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Property Advisory & Management Modules 01–05, keyed by visualKind. Held chapters are intentionally absent. */
export const REAL_ESTATE_ADVISORY_CHAPTER_VISUALS: Record<string, RealEstateAdvisoryChapterVisual> = {
  ...REAL_ESTATE_ADVISORY_M1_VISUALS,
  ...REAL_ESTATE_ADVISORY_M2_VISUALS,
  ...REAL_ESTATE_ADVISORY_M3_VISUALS,
  ...REAL_ESTATE_ADVISORY_M4_VISUALS,
  ...REAL_ESTATE_ADVISORY_M5_VISUALS,
};
