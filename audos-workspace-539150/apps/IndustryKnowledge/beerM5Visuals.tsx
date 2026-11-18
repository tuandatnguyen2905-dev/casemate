import type { BeerModule05VisualKind } from './beerM5Core';
import { VisualView } from './fashionVisualKit';
import { BEER_M5_VISUALS } from './beerM5VisualSpecs';

export function renderBeerModule05Visual(kind: BeerModule05VisualKind) {
  const visual = BEER_M5_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
