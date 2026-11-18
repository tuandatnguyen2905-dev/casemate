import type { VisualSpec } from './fashionVisualKit';
import { LIFE_INSURANCE_M1_VISUALS } from './lifeInsuranceM1VisualSpecs';
import { LIFE_INSURANCE_M2_VISUALS } from './lifeInsuranceM2VisualSpecs';
import { LIFE_INSURANCE_M3_VISUALS } from './lifeInsuranceM3VisualSpecs';
import { LIFE_INSURANCE_M4_VISUALS } from './lifeInsuranceM4VisualSpecs';
import { LIFE_INSURANCE_M5_VISUALS } from './lifeInsuranceM5VisualSpecs';

export interface LifeInsuranceChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Life Insurance Modules 01–05, keyed by visualKind. */
export const LIFE_INSURANCE_CHAPTER_VISUALS: Record<string, LifeInsuranceChapterVisual> = {
  ...LIFE_INSURANCE_M1_VISUALS,
  ...LIFE_INSURANCE_M2_VISUALS,
  ...LIFE_INSURANCE_M3_VISUALS,
  ...LIFE_INSURANCE_M4_VISUALS,
  ...LIFE_INSURANCE_M5_VISUALS,
};
