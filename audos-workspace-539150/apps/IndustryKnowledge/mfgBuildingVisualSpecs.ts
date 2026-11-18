import type { VisualSpec } from './fashionVisualKit';
import { MFG_BUILDING_M1_VISUALS } from './mfgBuildingM1VisualSpecs';
import { MFG_BUILDING_M2_VISUALS } from './mfgBuildingM2VisualSpecs';
import { MFG_BUILDING_M3_VISUALS } from './mfgBuildingM3VisualSpecs';
import { MFG_BUILDING_M4_VISUALS } from './mfgBuildingM4VisualSpecs';
import { MFG_BUILDING_M5_VISUALS } from './mfgBuildingM5VisualSpecs';

export interface MfgBuildingChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Building Materials & Coatings Modules 01–05, keyed by visualKind. */
export const MFG_BUILDING_CHAPTER_VISUALS: Record<string, MfgBuildingChapterVisual> = {
  ...MFG_BUILDING_M1_VISUALS,
  ...MFG_BUILDING_M2_VISUALS,
  ...MFG_BUILDING_M3_VISUALS,
  ...MFG_BUILDING_M4_VISUALS,
  ...MFG_BUILDING_M5_VISUALS,
};
