import type { TelecomM3VisualKind } from './telecomM3Core';
import { VisualView } from './fashionVisualKit';
import { TELECOM_M3_VISUALS } from './telecomM3VisualSpecs';

export function renderTelecomModule03Visual(kind: TelecomM3VisualKind) { const visual = TELECOM_M3_VISUALS[kind]; return visual ? <VisualView spec={visual.spec} /> : null; }
