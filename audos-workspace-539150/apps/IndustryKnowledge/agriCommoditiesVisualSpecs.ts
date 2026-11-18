import type { VisualSpec } from './fashionVisualKit';
import { AGRI_COMMODITIES_M1_VISUALS } from './agriCommoditiesM1VisualSpecs';
import { AGRI_COMMODITIES_M2_VISUALS } from './agriCommoditiesM2VisualSpecs';
import { AGRI_COMMODITIES_M3_VISUALS } from './agriCommoditiesM3VisualSpecs';
import { AGRI_COMMODITIES_M4_VISUALS } from './agriCommoditiesM4VisualSpecs';
import { AGRI_COMMODITIES_M5_VISUALS } from './agriCommoditiesM5VisualSpecs';

export interface AgriCommoditiesChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Agricultural Commodities & Trading Modules 01–05, keyed by visualKind. */
export const AGRI_COMMODITIES_CHAPTER_VISUALS: Record<string, AgriCommoditiesChapterVisual> = {
  ...AGRI_COMMODITIES_M1_VISUALS,
  ...AGRI_COMMODITIES_M2_VISUALS,
  ...AGRI_COMMODITIES_M3_VISUALS,
  ...AGRI_COMMODITIES_M4_VISUALS,
  ...AGRI_COMMODITIES_M5_VISUALS,
};
