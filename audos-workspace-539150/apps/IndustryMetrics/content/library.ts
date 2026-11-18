import type { IndustryMetricLink, IndustryPack, MetricDefinition, MissingMetricNote } from '../core/types';
import { SHARED_METRICS as AUTHORED_SHARED_METRICS } from './sharedMetrics';
import { applyReviewLog } from './reviewLog';
import { BANKING_PACK } from './packs/bankingPack';
import { FMCG_RETAIL_PACK } from './packs/fmcgRetailPack';
import { TECHNOLOGY_PACK } from './packs/technologyPack';
import { MANUFACTURING_PACK } from './packs/manufacturingPack';
import { LOGISTICS_PACK } from './packs/logisticsPack';
import { AGRIBUSINESS_PACK } from './packs/agribusinessPack';
import { REAL_ESTATE_PACK } from './packs/realEstatePack';
import { HOSPITALITY_PACK } from './packs/hospitalityPack';
import { SERVICES_HEALTHCARE_PACK } from './packs/servicesHealthcarePack';
import { LIFE_INSURANCE_PACK } from './packs/lifeInsurancePack';
import { PAYMENTS_PACK } from './packs/paymentsPack';
import { LIVESTOCK_PACK } from './packs/livestockPack';
import { PLATFORMS_ADDITIONS_PACK } from './packs/platformsAdditionsPack';
import { FMCG_EXPANSION_PACK } from './packs/fmcgExpansionPack';

const AUTHORED_PACKS: readonly IndustryPack[] = [
  BANKING_PACK,
  FMCG_RETAIL_PACK,
  TECHNOLOGY_PACK,
  MANUFACTURING_PACK,
  LOGISTICS_PACK,
  AGRIBUSINESS_PACK,
  REAL_ESTATE_PACK,
  HOSPITALITY_PACK,
  SERVICES_HEALTHCARE_PACK,
  LIFE_INSURANCE_PACK,
  PAYMENTS_PACK,
  LIVESTOCK_PACK,
  PLATFORMS_ADDITIONS_PACK,
  FMCG_EXPANSION_PACK,
];

/** Authored packs with the recorded review decisions (content/reviewLog.ts) applied to every metric. */
export const INDUSTRY_PACKS: readonly IndustryPack[] = AUTHORED_PACKS.map((pack) => ({ ...pack, metrics: pack.metrics.map(applyReviewLog) }));

export const SHARED_METRICS: MetricDefinition[] = AUTHORED_SHARED_METRICS.map(applyReviewLog);

export const ALL_METRICS: readonly MetricDefinition[] = [...SHARED_METRICS, ...INDUSTRY_PACKS.flatMap((pack) => pack.metrics)];

export const METRIC_BY_ID: ReadonlyMap<string, MetricDefinition> = new Map(ALL_METRICS.map((metric) => [metric.metricId, metric]));

export const ALL_LINKS: readonly IndustryMetricLink[] = INDUSTRY_PACKS.flatMap((pack) => pack.links);

export const MISSING_HIGH_PRIORITY: readonly MissingMetricNote[] = INDUSTRY_PACKS.flatMap((pack) => pack.missingHighPriority);

export function getMetric(metricId: string): MetricDefinition | undefined {
  return METRIC_BY_ID.get(metricId);
}

export interface CurriculumMetricEntry {
  metric: MetricDefinition;
  priority: IndustryMetricLink['priority'];
  interpretation: string;
  relatedModule: IndustryMetricLink['relatedModule'];
}

/** Metrics linked to one curriculum, core first, each with its industry-specific interpretation. */
export function metricsForCurriculum(curriculumId: string): CurriculumMetricEntry[] {
  const seen = new Map<string, CurriculumMetricEntry>();
  for (const link of ALL_LINKS) {
    if (!link.curriculumIds.includes(curriculumId)) continue;
    const metric = METRIC_BY_ID.get(link.metricId);
    if (!metric) continue;
    const existing = seen.get(link.metricId);
    if (existing) {
      if (link.priority === 'core') existing.priority = 'core';
      continue;
    }
    seen.set(link.metricId, { metric, priority: link.priority, interpretation: link.interpretation, relatedModule: link.relatedModule });
  }
  return [...seen.values()].sort((a, b) => (a.priority === b.priority ? a.metric.name.localeCompare(b.metric.name) : a.priority === 'core' ? -1 : 1));
}

export function curriculaForMetric(metricId: string): string[] {
  const ids = new Set<string>();
  for (const link of ALL_LINKS) if (link.metricId === metricId) link.curriculumIds.forEach((id) => ids.add(id));
  return [...ids];
}
