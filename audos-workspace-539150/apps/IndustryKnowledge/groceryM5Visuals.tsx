import type { GroceryModule05VisualKind } from './groceryM5Core';
import { VisualView } from './fashionVisualKit';
import { GROCERY_M5_VISUALS } from './groceryM5VisualSpecs';

export function renderGroceryModule05Visual(kind: GroceryModule05VisualKind) {
  const visual = GROCERY_M5_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
