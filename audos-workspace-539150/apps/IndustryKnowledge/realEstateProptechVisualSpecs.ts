import type { VisualSpec } from './fashionVisualKit';
import { REAL_ESTATE_PROPTECH_M1_VISUALS } from './realEstateProptechM1VisualSpecs';
import { REAL_ESTATE_PROPTECH_M2_VISUALS } from './realEstateProptechM2VisualSpecs';
import { REAL_ESTATE_PROPTECH_M3_VISUALS } from './realEstateProptechM3VisualSpecs';
import { REAL_ESTATE_PROPTECH_M4_VISUALS } from './realEstateProptechM4VisualSpecs';
import { REAL_ESTATE_PROPTECH_M5_VISUALS } from './realEstateProptechM5VisualSpecs';

export interface RealEstateProptechChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Property Technology & Marketplaces Modules 01–05, keyed by visualKind. */
export const REAL_ESTATE_PROPTECH_CHAPTER_VISUALS: Record<string, RealEstateProptechChapterVisual> = {
  ...REAL_ESTATE_PROPTECH_M1_VISUALS,
  ...REAL_ESTATE_PROPTECH_M2_VISUALS,
  ...REAL_ESTATE_PROPTECH_M3_VISUALS,
  ...REAL_ESTATE_PROPTECH_M4_VISUALS,
  ...REAL_ESTATE_PROPTECH_M5_VISUALS,
};
