import type { EntModule02VisualKind } from './entM2Core';
import { VisualView } from './fashionVisualKit';
import { ENT_M2_VISUALS } from './entM2VisualSpecs';

export function renderEntModule02Visual(kind: EntModule02VisualKind) {
  const visual = ENT_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
