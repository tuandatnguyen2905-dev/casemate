import { CATALOG_SUB_INDUSTRIES, IMPLEMENTED_CURRICULUM_IDS } from '../catalog/catalogSnapshot';
import { assessMetric } from '../core/readiness';
import { MISSING_HIGH_PRIORITY, metricsForCurriculum } from './library';

export interface CurriculumCoverage {
  curriculumId: string;
  label: string;
  metricsIdentified: number;
  metricsAuthored: number;
  /** Verified plus Verified with caveat. */
  sourceVerified: number;
  verifiedWithCaveat: number;
  /** Not verified and not rejected. */
  pendingOnly: number;
  rejected: number;
  formulaTested: number;
  readyForLearners: number;
  pendingVerification: number;
  workedExamples: number;
  missingHighPriority: string[];
}

export function buildCoverageManifest(): CurriculumCoverage[] {
  return IMPLEMENTED_CURRICULUM_IDS.map((curriculumId) => {
    const entries = metricsForCurriculum(curriculumId);
    const readiness = entries.map((entry) => assessMetric(entry.metric));
    const missing = MISSING_HIGH_PRIORITY.filter((note) => note.curriculumId === curriculumId).flatMap((note) => note.metrics);
    return {
      curriculumId,
      label: CATALOG_SUB_INDUSTRIES.find((s) => s.id === curriculumId)?.label ?? curriculumId,
      metricsIdentified: entries.length + missing.length,
      metricsAuthored: entries.length,
      sourceVerified: readiness.filter((r) => r.sourceVerified).length,
      verifiedWithCaveat: readiness.filter((r) => r.sourceVerified && r.status === 'verified-with-caveat').length,
      pendingOnly: readiness.filter((r) => !r.sourceVerified && r.status !== 'rejected').length,
      rejected: readiness.filter((r) => r.status === 'rejected').length,
      formulaTested: readiness.filter((r) => r.formulaTested).length,
      readyForLearners: readiness.filter((r) => r.learnerReady).length,
      pendingVerification: readiness.filter((r) => !r.sourceVerified).length,
      workedExamples: entries.filter((entry) => entry.metric.example.steps.length > 0).length,
      missingHighPriority: missing,
    };
  });
}
