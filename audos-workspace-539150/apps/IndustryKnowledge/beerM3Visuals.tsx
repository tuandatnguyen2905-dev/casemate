import type { BeerModule03VisualKind } from './beerM3Core';
import { VisualView } from './fashionVisualKit';
import { BEER_M3_VISUALS } from './beerM3VisualSpecs';

export function renderBeerModule03Visual(kind: BeerModule03VisualKind) {
  const visual = BEER_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
