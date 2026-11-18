import type { VisualSpec } from './fashionVisualKit';
import { AGRI_LIVESTOCK_M1_VISUALS } from './agriLivestockM1VisualSpecs';
import { AGRI_LIVESTOCK_M2_VISUALS } from './agriLivestockM2VisualSpecs';
import { AGRI_LIVESTOCK_M3_VISUALS } from './agriLivestockM3VisualSpecs';
import { AGRI_LIVESTOCK_M4_VISUALS } from './agriLivestockM4VisualSpecs';
import { AGRI_LIVESTOCK_M5_VISUALS } from './agriLivestockM5VisualSpecs';

export interface AgriLivestockChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Livestock & Animal Feed Modules 01–05, keyed by visualKind. */
export const AGRI_LIVESTOCK_CHAPTER_VISUALS: Record<string, AgriLivestockChapterVisual> = {
  ...AGRI_LIVESTOCK_M1_VISUALS,
  ...AGRI_LIVESTOCK_M2_VISUALS,
  ...AGRI_LIVESTOCK_M3_VISUALS,
  ...AGRI_LIVESTOCK_M4_VISUALS,
  ...AGRI_LIVESTOCK_M5_VISUALS,
};
