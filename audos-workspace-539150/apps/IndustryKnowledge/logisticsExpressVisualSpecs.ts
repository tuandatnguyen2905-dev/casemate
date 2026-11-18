import type { VisualSpec } from './fashionVisualKit';
import { LOGISTICS_EXPRESS_M1_VISUALS } from './logisticsExpressM1VisualSpecs';
import { LOGISTICS_EXPRESS_M2_VISUALS } from './logisticsExpressM2VisualSpecs';
import { LOGISTICS_EXPRESS_M3_VISUALS } from './logisticsExpressM3VisualSpecs';
import { LOGISTICS_EXPRESS_M4_VISUALS } from './logisticsExpressM4VisualSpecs';
import { LOGISTICS_EXPRESS_M5_VISUALS } from './logisticsExpressM5VisualSpecs';

export interface LogisticsExpressChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Express & Last-Mile Delivery Modules 01–05, keyed by visualKind. */
export const LOGISTICS_EXPRESS_CHAPTER_VISUALS: Record<string, LogisticsExpressChapterVisual> = {
  ...LOGISTICS_EXPRESS_M1_VISUALS,
  ...LOGISTICS_EXPRESS_M2_VISUALS,
  ...LOGISTICS_EXPRESS_M3_VISUALS,
  ...LOGISTICS_EXPRESS_M4_VISUALS,
  ...LOGISTICS_EXPRESS_M5_VISUALS,
};
