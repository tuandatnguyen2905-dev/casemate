import type { EntModule04VisualKind } from './entM4Core';
import { VisualView } from './fashionVisualKit';
import { ENT_M4_VISUALS } from './entM4VisualSpecs';

export function renderEntModule04Visual(kind: EntModule04VisualKind) {
  const visual = ENT_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
