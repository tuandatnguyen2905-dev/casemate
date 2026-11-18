import type { EcomModule01VisualKind } from './ecomM1Core';
import { VisualView } from './fashionVisualKit';
import { ECOM_M1_VISUALS } from './ecomM1VisualSpecs';

export function renderEcomModule01Visual(kind: EcomModule01VisualKind) {
  const visual = ECOM_M1_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
