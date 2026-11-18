import type { EcomModule03VisualKind } from './ecomM3Core';
import { VisualView } from './fashionVisualKit';
import { ECOM_M3_VISUALS } from './ecomM3VisualSpecs';

export function renderEcomModule03Visual(kind: EcomModule03VisualKind) {
  const visual = ECOM_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
