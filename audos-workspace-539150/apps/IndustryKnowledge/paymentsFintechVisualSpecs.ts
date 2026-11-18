import type { VisualSpec } from './fashionVisualKit';
import { PAYMENTS_FINTECH_M1_VISUALS } from './paymentsFintechM1VisualSpecs';
import { PAYMENTS_FINTECH_M2_VISUALS } from './paymentsFintechM2VisualSpecs';
import { PAYMENTS_FINTECH_M3_VISUALS } from './paymentsFintechM3VisualSpecs';
import { PAYMENTS_FINTECH_M4_VISUALS } from './paymentsFintechM4VisualSpecs';
import { PAYMENTS_FINTECH_M5_VISUALS } from './paymentsFintechM5VisualSpecs';

export interface PaymentsFintechChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Payments & Fintech Modules 01–05, keyed by visualKind. Held chapters are intentionally absent. */
export const PAYMENTS_FINTECH_CHAPTER_VISUALS: Record<string, PaymentsFintechChapterVisual> = {
  ...PAYMENTS_FINTECH_M1_VISUALS,
  ...PAYMENTS_FINTECH_M2_VISUALS,
  ...PAYMENTS_FINTECH_M3_VISUALS,
  ...PAYMENTS_FINTECH_M4_VISUALS,
  ...PAYMENTS_FINTECH_M5_VISUALS,
};
