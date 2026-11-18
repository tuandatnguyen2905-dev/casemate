import type { VisualSpec } from './fashionVisualKit';
import { HOTELS_M1_VISUALS } from './hospitalityHotelsM1VisualSpecs';
import { HOTELS_M2_VISUALS } from './hospitalityHotelsM2VisualSpecs';
import { HOTELS_M3_VISUALS } from './hospitalityHotelsM3VisualSpecs';
import { HOTELS_M4_VISUALS } from './hospitalityHotelsM4VisualSpecs';
import { HOTELS_M5_VISUALS } from './hospitalityHotelsM5VisualSpecs';

export interface HotelChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Hotels & Resorts Modules 01–05, keyed by visualKind. */
export const HOSPITALITY_HOTELS_CHAPTER_VISUALS: Record<string, HotelChapterVisual> = {
  ...HOTELS_M1_VISUALS,
  ...HOTELS_M2_VISUALS,
  ...HOTELS_M3_VISUALS,
  ...HOTELS_M4_VISUALS,
  ...HOTELS_M5_VISUALS,
};
