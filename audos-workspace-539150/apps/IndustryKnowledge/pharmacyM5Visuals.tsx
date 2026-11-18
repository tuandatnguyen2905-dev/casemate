import type { PharmacyModule05VisualKind } from './pharmacyM5Core';
import { VisualView } from './fashionVisualKit';
import { PHARMACY_M5_VISUALS } from './pharmacyM5VisualSpecs';

export function renderPharmacyModule05Visual(kind: PharmacyModule05VisualKind) {
  const visual = PHARMACY_M5_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
