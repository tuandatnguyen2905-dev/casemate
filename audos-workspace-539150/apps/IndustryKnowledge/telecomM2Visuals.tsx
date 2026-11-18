import type { TelecomM2VisualKind } from './telecomM2Core';
import { VisualView } from './fashionVisualKit';
import { TELECOM_M2_VISUALS } from './telecomM2VisualSpecs';

export function renderTelecomModule02Visual(kind: TelecomM2VisualKind) {
  const visual = TELECOM_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
