import type { EntModule01VisualKind } from './entM1Core';
import { VisualView } from './fashionVisualKit';
import { ENT_M1_VISUALS } from './entM1VisualSpecs';

export function renderEntModule01Visual(kind: EntModule01VisualKind) {
  const visual = ENT_M1_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
