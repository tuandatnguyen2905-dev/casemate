import type { CoffeeModule04VisualKind } from './coffeeM4Core';
import { VisualView } from './fashionVisualKit';
import { COFFEE_M4_VISUALS } from './coffeeM4VisualSpecs';

export function renderCoffeeModule04Visual(kind: CoffeeModule04VisualKind) {
  const visual = COFFEE_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
