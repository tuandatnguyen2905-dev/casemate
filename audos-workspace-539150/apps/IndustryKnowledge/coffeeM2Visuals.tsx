import type { CoffeeModule02VisualKind } from './coffeeM2Core';
import { VisualView } from './fashionVisualKit';
import { COFFEE_M2_VISUALS } from './coffeeM2VisualSpecs';

export function renderCoffeeModule02Visual(kind: CoffeeModule02VisualKind) {
  const visual = COFFEE_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
