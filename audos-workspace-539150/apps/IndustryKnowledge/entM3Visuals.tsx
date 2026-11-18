import type { EntModule03VisualKind } from './entM3Core';
import { VisualView } from './fashionVisualKit';
import { ENT_M3_VISUALS } from './entM3VisualSpecs';

export function renderEntModule03Visual(kind: EntModule03VisualKind) {
  const visual = ENT_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
