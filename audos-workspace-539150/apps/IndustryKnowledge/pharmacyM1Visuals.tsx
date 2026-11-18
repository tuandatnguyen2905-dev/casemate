import type { PharmacyModule01VisualKind } from './pharmacyM1Core';
import { VisualView } from './fashionVisualKit';
import { PHARMACY_M1_VISUALS } from './pharmacyM1VisualSpecs';

export function renderPharmacyModule01Visual(kind: PharmacyModule01VisualKind) {
  const visual = PHARMACY_M1_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
