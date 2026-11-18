import type { ReactNode } from 'react';
import type { PackagedFoodM2VisualKind } from './packagedFoodM2Core';
import { VisualView } from './fashionVisualKit';
import { PACKAGED_FOOD_M2_VISUALS } from './packagedFoodM2VisualSpecs';

export function renderPackagedFoodM2Visual(kind: PackagedFoodM2VisualKind | string): ReactNode {
  const visual = PACKAGED_FOOD_M2_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
