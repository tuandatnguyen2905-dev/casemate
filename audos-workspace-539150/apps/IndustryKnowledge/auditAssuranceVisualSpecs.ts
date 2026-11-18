import type { VisualSpec } from './fashionVisualKit';
import { AUDIT_ASSURANCE_M1_VISUALS } from './auditAssuranceM1VisualSpecs';
import { AUDIT_ASSURANCE_M2_VISUALS } from './auditAssuranceM2VisualSpecs';
import { AUDIT_ASSURANCE_M3_VISUALS } from './auditAssuranceM3VisualSpecs';
import { AUDIT_ASSURANCE_M4_VISUALS } from './auditAssuranceM4VisualSpecs';
import { AUDIT_ASSURANCE_M5_VISUALS } from './auditAssuranceM5VisualSpecs';

export interface AuditAssuranceChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Audit & Assurance Modules 01–05, keyed by visualKind. Held chapters are intentionally absent. */
export const AUDIT_ASSURANCE_CHAPTER_VISUALS: Record<string, AuditAssuranceChapterVisual> = {
  ...AUDIT_ASSURANCE_M1_VISUALS,
  ...AUDIT_ASSURANCE_M2_VISUALS,
  ...AUDIT_ASSURANCE_M3_VISUALS,
  ...AUDIT_ASSURANCE_M4_VISUALS,
  ...AUDIT_ASSURANCE_M5_VISUALS,
};
