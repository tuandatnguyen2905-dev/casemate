import type { GroceryModule04VisualKind } from './groceryM4Core';
import { VisualView } from './fashionVisualKit';
import { GROCERY_M4_VISUALS } from './groceryM4VisualSpecs';

export function renderGroceryModule04Visual(kind: GroceryModule04VisualKind) {
  const visual = GROCERY_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
