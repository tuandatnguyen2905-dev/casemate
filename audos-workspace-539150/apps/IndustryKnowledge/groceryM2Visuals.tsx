import type { GroceryModule02VisualKind } from './groceryM2Core';
import { VisualView } from './fashionVisualKit';
import { GROCERY_M2_VISUALS } from './groceryM2VisualSpecs';

export function renderGroceryModule02Visual(kind: GroceryModule02VisualKind) {
  const visual = GROCERY_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
