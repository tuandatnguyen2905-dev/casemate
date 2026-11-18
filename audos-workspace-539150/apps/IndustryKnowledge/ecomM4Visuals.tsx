import type { EcomModule04VisualKind } from './ecomM4Core';
import { VisualView } from './fashionVisualKit';
import { ECOM_M4_VISUALS } from './ecomM4VisualSpecs';

export function renderEcomModule04Visual(kind: EcomModule04VisualKind) {
  const visual = ECOM_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
