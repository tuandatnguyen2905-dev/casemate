import type { EcomModule05VisualKind } from './ecomM5Core';
import { VisualView } from './fashionVisualKit';
import { ECOM_M5_VISUALS } from './ecomM5VisualSpecs';

export function renderEcomModule05Visual(kind: EcomModule05VisualKind) {
  const visual = ECOM_M5_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
