import type { ReactNode } from 'react';
import { VisualView } from './fashionVisualKit';
import { PACKAGED_FOOD_M5_VISUALS } from './packagedFoodM5VisualSpecs';

export function renderPackagedFoodM5Visual(kind: string): ReactNode {
  const visual = PACKAGED_FOOD_M5_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
