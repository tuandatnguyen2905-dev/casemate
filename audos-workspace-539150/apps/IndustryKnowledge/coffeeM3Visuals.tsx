import type { CoffeeModule03VisualKind } from './coffeeM3Core';
import { VisualView } from './fashionVisualKit';
import { COFFEE_M3_VISUALS } from './coffeeM3VisualSpecs';

export function renderCoffeeModule03Visual(kind: CoffeeModule03VisualKind) {
  const visual = COFFEE_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
