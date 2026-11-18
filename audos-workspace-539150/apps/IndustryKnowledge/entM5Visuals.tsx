import type { EntModule05VisualKind } from './entM5Core';
import { VisualView } from './fashionVisualKit';
import { ENT_M5_VISUALS } from './entM5VisualSpecs';

export function renderEntModule05Visual(kind: EntModule05VisualKind) {
  const visual = ENT_M5_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
