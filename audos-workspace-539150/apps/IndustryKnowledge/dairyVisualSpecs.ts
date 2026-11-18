import type { ChapterVisual } from './chapterVisualText';
import { DAIRY_M1_VISUALS_BY_TITLE } from './dairyM1VisualSpecs';
import { DAIRY_M2_VISUALS_BY_TITLE } from './dairyM2VisualSpecs';
import { DAIRY_M3_VISUALS_BY_TITLE } from './dairyM3VisualSpecs';
import { DAIRY_M4_VISUALS_BY_TITLE } from './dairyM4VisualSpecs';
import { DAIRY_M5_VISUALS_BY_TITLE } from './dairyM5VisualSpecs';

/** Dairy chapters carry no visualKind, so every visual is keyed by its exact chapter title (unique across the curriculum). */
export const DAIRY_VISUALS_BY_TITLE: Record<string, ChapterVisual> = {
  ...DAIRY_M1_VISUALS_BY_TITLE,
  ...DAIRY_M2_VISUALS_BY_TITLE,
  ...DAIRY_M3_VISUALS_BY_TITLE,
  ...DAIRY_M4_VISUALS_BY_TITLE,
  ...DAIRY_M5_VISUALS_BY_TITLE,
};
