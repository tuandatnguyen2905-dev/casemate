import type { VisualSpec } from './fashionVisualKit';
import { LOGISTICS_CONTRACT_M1_VISUALS } from './logisticsContractM1VisualSpecs';
import { LOGISTICS_CONTRACT_M2_VISUALS } from './logisticsContractM2VisualSpecs';
import { LOGISTICS_CONTRACT_M3_VISUALS } from './logisticsContractM3VisualSpecs';
import { LOGISTICS_CONTRACT_M4_VISUALS } from './logisticsContractM4VisualSpecs';
import { LOGISTICS_CONTRACT_M5_VISUALS } from './logisticsContractM5VisualSpecs';

export interface LogisticsContractChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Contract Logistics & Warehousing Modules 01–05, keyed by visualKind. */
export const LOGISTICS_CONTRACT_CHAPTER_VISUALS: Record<string, LogisticsContractChapterVisual> = {
  ...LOGISTICS_CONTRACT_M1_VISUALS,
  ...LOGISTICS_CONTRACT_M2_VISUALS,
  ...LOGISTICS_CONTRACT_M3_VISUALS,
  ...LOGISTICS_CONTRACT_M4_VISUALS,
  ...LOGISTICS_CONTRACT_M5_VISUALS,
};
