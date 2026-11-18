import type { PharmacyModule02VisualKind } from './pharmacyM2Core';
import { VisualView } from './fashionVisualKit';
import { PHARMACY_M2_VISUALS } from './pharmacyM2VisualSpecs';

export function renderPharmacyModule02Visual(kind: PharmacyModule02VisualKind) {
  const visual = PHARMACY_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
