import type { EcomModule02VisualKind } from './ecomM2Core';
import { VisualView } from './fashionVisualKit';
import { ECOM_M2_VISUALS } from './ecomM2VisualSpecs';

export function renderEcomModule02Visual(kind: EcomModule02VisualKind) {
  const visual = ECOM_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
