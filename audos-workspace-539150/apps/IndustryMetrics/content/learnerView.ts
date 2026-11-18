// The single rule for what learners may see: only Verified and properly caveated Verified with
// caveat metrics whose formula checks pass. Pending and Rejected metrics are returned only when a
// reviewer explicitly asks for them (includePending). The adapter and the tests both use this file.

import { assessMetric } from '../core/readiness';
import type { MetricDefinition } from '../core/types';
import { ALL_METRICS, metricsForCurriculum } from './library';
import type { CurriculumMetricEntry } from './library';

export function learnerEntriesForCurriculum(curriculumId: string, options: { includePending?: boolean } = {}): CurriculumMetricEntry[] {
  return metricsForCurriculum(curriculumId).filter((entry) => options.includePending || assessMetric(entry.metric).learnerReady);
}

export function learnerReadyMetricList(): MetricDefinition[] {
  return ALL_METRICS.filter((metric) => assessMetric(metric).learnerReady);
}
