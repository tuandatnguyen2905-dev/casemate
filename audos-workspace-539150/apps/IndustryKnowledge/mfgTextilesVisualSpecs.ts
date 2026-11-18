import type { VisualSpec } from './fashionVisualKit';
import { MFG_TEXTILES_M1_VISUALS } from './mfgTextilesM1VisualSpecs';
import { MFG_TEXTILES_M2_VISUALS } from './mfgTextilesM2VisualSpecs';
import { MFG_TEXTILES_M3_VISUALS } from './mfgTextilesM3VisualSpecs';
import { MFG_TEXTILES_M4_VISUALS } from './mfgTextilesM4VisualSpecs';
import { MFG_TEXTILES_M5_VISUALS } from './mfgTextilesM5VisualSpecs';

export interface MfgTextilesChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Textiles & Apparel Manufacturing Modules 01–05, keyed by visualKind. */
export const MFG_TEXTILES_CHAPTER_VISUALS: Record<string, MfgTextilesChapterVisual> = {
  ...MFG_TEXTILES_M1_VISUALS,
  ...MFG_TEXTILES_M2_VISUALS,
  ...MFG_TEXTILES_M3_VISUALS,
  ...MFG_TEXTILES_M4_VISUALS,
  ...MFG_TEXTILES_M5_VISUALS,
};
