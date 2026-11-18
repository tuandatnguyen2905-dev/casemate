import type { CoffeeModule01VisualKind } from './coffeeM1Core';
import { VisualView } from './fashionVisualKit';
import { COFFEE_M1_VISUALS } from './coffeeM1VisualSpecs';

export function renderCoffeeModule01Visual(kind: CoffeeModule01VisualKind) {
  const visual = COFFEE_M1_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
