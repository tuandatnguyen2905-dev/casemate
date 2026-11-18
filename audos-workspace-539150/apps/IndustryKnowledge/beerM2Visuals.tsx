import type { ReactNode } from 'react';
import { VisualView } from './fashionVisualKit';
import { BEER_M2_VISUALS } from './beerM2VisualSpecs';

export function renderBeerModule02Visual(kind: string): ReactNode {
  const visual = BEER_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
