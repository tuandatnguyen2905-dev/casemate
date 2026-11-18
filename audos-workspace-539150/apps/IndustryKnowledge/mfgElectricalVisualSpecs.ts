import type { VisualSpec } from './fashionVisualKit';
import { MFG_ELECTRICAL_M1_VISUALS } from './mfgElectricalM1VisualSpecs';
import { MFG_ELECTRICAL_M2_VISUALS } from './mfgElectricalM2VisualSpecs';
import { MFG_ELECTRICAL_M3_VISUALS } from './mfgElectricalM3VisualSpecs';
import { MFG_ELECTRICAL_M4_VISUALS } from './mfgElectricalM4VisualSpecs';
import { MFG_ELECTRICAL_M5_VISUALS } from './mfgElectricalM5VisualSpecs';

export interface MfgElectricalChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Electrical & Energy Equipment Manufacturing Modules 01–05, keyed by visualKind. */
export const MFG_ELECTRICAL_CHAPTER_VISUALS: Record<string, MfgElectricalChapterVisual> = {
  ...MFG_ELECTRICAL_M1_VISUALS,
  ...MFG_ELECTRICAL_M2_VISUALS,
  ...MFG_ELECTRICAL_M3_VISUALS,
  ...MFG_ELECTRICAL_M4_VISUALS,
  ...MFG_ELECTRICAL_M5_VISUALS,
};
