import type { VisualSpec } from './fashionVisualKit';
import { HEALTHCARE_PRODUCTS_M1_VISUALS } from './healthcareProductsM1VisualSpecs';
import { HEALTHCARE_PRODUCTS_M2_VISUALS } from './healthcareProductsM2VisualSpecs';
import { HEALTHCARE_PRODUCTS_M3_VISUALS } from './healthcareProductsM3VisualSpecs';
import { HEALTHCARE_PRODUCTS_M4_VISUALS } from './healthcareProductsM4VisualSpecs';
import { HEALTHCARE_PRODUCTS_M5_VISUALS } from './healthcareProductsM5VisualSpecs';

export interface HealthcareProductsChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Healthcare Products & Nutrition Modules 01–05, keyed by visualKind. */
export const HEALTHCARE_PRODUCTS_CHAPTER_VISUALS: Record<string, HealthcareProductsChapterVisual> = {
  ...HEALTHCARE_PRODUCTS_M1_VISUALS,
  ...HEALTHCARE_PRODUCTS_M2_VISUALS,
  ...HEALTHCARE_PRODUCTS_M3_VISUALS,
  ...HEALTHCARE_PRODUCTS_M4_VISUALS,
  ...HEALTHCARE_PRODUCTS_M5_VISUALS,
};
