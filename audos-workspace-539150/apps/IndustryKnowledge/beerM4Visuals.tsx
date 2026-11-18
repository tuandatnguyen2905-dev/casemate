import type { BeerModule04VisualKind } from './beerM4Core';
import { VisualView } from './fashionVisualKit';
import { BEER_M4_VISUALS } from './beerM4VisualSpecs';

export function renderBeerModule04Visual(kind: BeerModule04VisualKind) {
  const visual = BEER_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
