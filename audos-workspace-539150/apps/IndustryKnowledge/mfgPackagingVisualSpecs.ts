import type { VisualSpec } from './fashionVisualKit';
import { MFG_PACKAGING_M1_VISUALS } from './mfgPackagingM1VisualSpecs';
import { MFG_PACKAGING_M2_VISUALS } from './mfgPackagingM2VisualSpecs';
import { MFG_PACKAGING_M3_VISUALS } from './mfgPackagingM3VisualSpecs';
import { MFG_PACKAGING_M4_VISUALS } from './mfgPackagingM4VisualSpecs';
import { MFG_PACKAGING_M5_VISUALS } from './mfgPackagingM5VisualSpecs';

export interface MfgPackagingChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Packaging, Labels & Industrial Materials Modules 01–05, keyed by visualKind. */
export const MFG_PACKAGING_CHAPTER_VISUALS: Record<string, MfgPackagingChapterVisual> = {
  ...MFG_PACKAGING_M1_VISUALS,
  ...MFG_PACKAGING_M2_VISUALS,
  ...MFG_PACKAGING_M3_VISUALS,
  ...MFG_PACKAGING_M4_VISUALS,
  ...MFG_PACKAGING_M5_VISUALS,
};
