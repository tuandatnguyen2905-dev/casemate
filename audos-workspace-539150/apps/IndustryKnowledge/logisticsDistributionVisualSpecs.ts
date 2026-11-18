import type { VisualSpec } from './fashionVisualKit';
import { LOGISTICS_DISTRIBUTION_M1_VISUALS } from './logisticsDistributionM1VisualSpecs';
import { LOGISTICS_DISTRIBUTION_M2_VISUALS } from './logisticsDistributionM2VisualSpecs';
import { LOGISTICS_DISTRIBUTION_M3_VISUALS } from './logisticsDistributionM3VisualSpecs';
import { LOGISTICS_DISTRIBUTION_M4_VISUALS } from './logisticsDistributionM4VisualSpecs';
import { LOGISTICS_DISTRIBUTION_M5_VISUALS } from './logisticsDistributionM5VisualSpecs';

export interface LogisticsDistributionChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Distribution & Market Expansion Services Modules 01–05, keyed by visualKind. */
export const LOGISTICS_DISTRIBUTION_CHAPTER_VISUALS: Record<string, LogisticsDistributionChapterVisual> = {
  ...LOGISTICS_DISTRIBUTION_M1_VISUALS,
  ...LOGISTICS_DISTRIBUTION_M2_VISUALS,
  ...LOGISTICS_DISTRIBUTION_M3_VISUALS,
  ...LOGISTICS_DISTRIBUTION_M4_VISUALS,
  ...LOGISTICS_DISTRIBUTION_M5_VISUALS,
};
