import type { VisualSpec } from './fashionVisualKit';
import { CONSULTING_M1_VISUALS } from './consultingM1VisualSpecs';
import { CONSULTING_M2_VISUALS } from './consultingM2VisualSpecs';
import { CONSULTING_M3_VISUALS } from './consultingM3VisualSpecs';
import { CONSULTING_M4_VISUALS } from './consultingM4VisualSpecs';
import { CONSULTING_M5_VISUALS } from './consultingM5VisualSpecs';

export interface ConsultingChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Management & Technology Consulting Modules 01–05, keyed by visualKind. */
export const CONSULTING_CHAPTER_VISUALS: Record<string, ConsultingChapterVisual> = {
  ...CONSULTING_M1_VISUALS,
  ...CONSULTING_M2_VISUALS,
  ...CONSULTING_M3_VISUALS,
  ...CONSULTING_M4_VISUALS,
  ...CONSULTING_M5_VISUALS,
};
