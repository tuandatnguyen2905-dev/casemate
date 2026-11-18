import type { ViLesson } from '../localizationTypes';
import { CB_VI_L51 } from './cbViModule05L51';
import { CB_VI_L52 } from './cbViModule05L52';
import { CB_VI_L53 } from './cbViModule05L53';
import { CB_VI_L55 } from './cbViModule05L55';

/**
 * Vietnamese General Info for Commercial Banking Module 05, keyed by lesson code. Lesson 5.4 is deliberately absent:
 * it is under review hold REV-P0-12 (reviewHolds.ts), so its restricted placeholder chapters stay as they are
 * until the hold is released.
 */
export const CB_VI_MODULE05: Record<string, ViLesson> = {
  '5.1': CB_VI_L51,
  '5.2': CB_VI_L52,
  '5.3': CB_VI_L53,
  '5.5': CB_VI_L55,
};
