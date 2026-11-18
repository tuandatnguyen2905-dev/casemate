import type { ViLesson } from '../localizationTypes';
import { CB_VI_L11, CB_VI_L12 } from './cbViModule01L11L12';
import { CB_VI_L13, CB_VI_L14 } from './cbViModule01L13L14';
import { CB_VI_L15 } from './cbViModule01L15';

/** Vietnamese General Info for Commercial Banking Module 01, keyed by lesson code. Loaded only when a learner reads this module in Vietnamese. */
export const CB_VI_MODULE01: Record<string, ViLesson> = {
  '1.1': CB_VI_L11,
  '1.2': CB_VI_L12,
  '1.3': CB_VI_L13,
  '1.4': CB_VI_L14,
  '1.5': CB_VI_L15,
};
