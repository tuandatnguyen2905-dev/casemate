import type { PharmacyModule04VisualKind } from './pharmacyM4Core';
import { VisualView } from './fashionVisualKit';
import { PHARMACY_M4_VISUALS } from './pharmacyM4VisualSpecs';

export function renderPharmacyModule04Visual(kind: PharmacyModule04VisualKind) {
  const visual = PHARMACY_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
