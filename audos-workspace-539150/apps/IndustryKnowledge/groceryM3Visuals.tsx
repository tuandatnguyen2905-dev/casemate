import type { GroceryModule03VisualKind } from './groceryM3Core';
import { VisualView } from './fashionVisualKit';
import { GROCERY_M3_VISUALS } from './groceryM3VisualSpecs';

export function renderGroceryModule03Visual(kind: GroceryModule03VisualKind) {
  const visual = GROCERY_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
