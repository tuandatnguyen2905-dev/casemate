import type { ReactNode } from 'react';
import type { PackagedFoodM3VisualKind } from './packagedFoodM3Core';
import { VisualView } from './fashionVisualKit';
import { PACKAGED_FOOD_M3_VISUALS } from './packagedFoodM3VisualSpecs';

export function renderPackagedFoodM3Visual(kind: PackagedFoodM3VisualKind | string): ReactNode {
  const visual = PACKAGED_FOOD_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
