import type { GroceryModule01VisualKind } from './groceryM1Core';
import { VisualView } from './fashionVisualKit';
import { GROCERY_M1_VISUALS } from './groceryM1VisualSpecs';

export function renderGroceryModule01Visual(kind: GroceryModule01VisualKind) {
  const visual = GROCERY_M1_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
