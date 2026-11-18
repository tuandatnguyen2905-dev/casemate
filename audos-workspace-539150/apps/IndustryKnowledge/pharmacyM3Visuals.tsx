import type { PharmacyModule03VisualKind } from './pharmacyM3Core';
import { VisualView } from './fashionVisualKit';
import { PHARMACY_M3_VISUALS } from './pharmacyM3VisualSpecs';

export function renderPharmacyModule03Visual(kind: PharmacyModule03VisualKind) {
  const visual = PHARMACY_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
