import type { VisualSpec } from './fashionVisualKit';
import { LOGISTICS_FREIGHT_M1_VISUALS } from './logisticsFreightM1VisualSpecs';
import { LOGISTICS_FREIGHT_M2_VISUALS } from './logisticsFreightM2VisualSpecs';
import { LOGISTICS_FREIGHT_M3_VISUALS } from './logisticsFreightM3VisualSpecs';
import { LOGISTICS_FREIGHT_M4_VISUALS } from './logisticsFreightM4VisualSpecs';
import { LOGISTICS_FREIGHT_M5_VISUALS } from './logisticsFreightM5VisualSpecs';

export interface LogisticsFreightChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Freight Forwarding & Ocean Logistics Modules 01–05, keyed by visualKind. */
export const LOGISTICS_FREIGHT_CHAPTER_VISUALS: Record<string, LogisticsFreightChapterVisual> = {
  ...LOGISTICS_FREIGHT_M1_VISUALS,
  ...LOGISTICS_FREIGHT_M2_VISUALS,
  ...LOGISTICS_FREIGHT_M3_VISUALS,
  ...LOGISTICS_FREIGHT_M4_VISUALS,
  ...LOGISTICS_FREIGHT_M5_VISUALS,
};
