import type { CoffeeModule05VisualKind } from './coffeeM5Core';
import { VisualView } from './fashionVisualKit';
import { COFFEE_M5_VISUALS } from './coffeeM5VisualSpecs';

export function renderCoffeeModule05Visual(kind: CoffeeModule05VisualKind) {
  const visual = COFFEE_M5_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
