import type { ReactNode } from 'react';
import { VisualView } from './fashionVisualKit';
import { PACKAGED_FOOD_M4_VISUALS } from './packagedFoodM4VisualSpecs';

export function renderPackagedFoodM4Visual(kind: string): ReactNode {
  const visual = PACKAGED_FOOD_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
