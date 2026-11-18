import type { VisualSpec } from './fashionVisualKit';
import { AGRI_CROP_M1_VISUALS } from './agriCropM1VisualSpecs';
import { AGRI_CROP_M2_VISUALS } from './agriCropM2VisualSpecs';
import { AGRI_CROP_M3_VISUALS } from './agriCropM3VisualSpecs';
import { AGRI_CROP_M4_VISUALS } from './agriCropM4VisualSpecs';
import { AGRI_CROP_M5_VISUALS } from './agriCropM5VisualSpecs';

export interface AgriCropChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Crop Production & Agricultural Processing Modules 01–05, keyed by visualKind. */
export const AGRI_CROP_CHAPTER_VISUALS: Record<string, AgriCropChapterVisual> = {
  ...AGRI_CROP_M1_VISUALS,
  ...AGRI_CROP_M2_VISUALS,
  ...AGRI_CROP_M3_VISUALS,
  ...AGRI_CROP_M4_VISUALS,
  ...AGRI_CROP_M5_VISUALS,
};
