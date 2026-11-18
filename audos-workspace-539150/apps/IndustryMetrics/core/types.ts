// Industry Metrics Library — schema. Declarative content only; no UI concerns.

export type MetricCategory =
  | 'financial-performance'
  | 'growth'
  | 'commercial-effectiveness'
  | 'operational-efficiency'
  | 'risk-quality'
  | 'industry-specific';

export const METRIC_CATEGORIES: ReadonlyArray<{ id: MetricCategory; label: string }> = [
  { id: 'financial-performance', label: 'Financial Performance' },
  { id: 'growth', label: 'Growth' },
  { id: 'commercial-effectiveness', label: 'Commercial Effectiveness' },
  { id: 'operational-efficiency', label: 'Operational Efficiency' },
  { id: 'risk-quality', label: 'Risk & Quality' },
  { id: 'industry-specific', label: 'Industry-Specific Drivers' },
];

export type UnitId =
  | 'currency'
  | 'percent'
  | 'times'
  | 'days'
  | 'count'
  | 'hours'
  | 'hectares'
  | 'tonnes'
  | 'sqm'
  | 'years'
  | 'currency-per-unit'
  | 'currency-per-sqm'
  | 'currency-per-hectare'
  | 'currency-per-tonne'
  | 'currency-per-room'
  | 'currency-per-order'
  | 'currency-per-customer'
  | 'currency-per-hour'
  | 'currency-per-fte'
  | 'tonnes-per-hectare'
  | 'units-per-hour'
  | 'units-per-order'
  | 'currency-per-thousand'
  | 'currency-per-seat-hour'
  | 'currency-per-engagement'
  | 'units'
  | 'months'
  | 'minutes'
  | 'kg'
  | 'kg-per-day';

/**
 * Review statuses. 'source-verified' is shown to learners as "Verified".
 * Only 'source-verified' and 'verified-with-caveat' (with caveats recorded) are learner-visible;
 * 'pending-verification' and 'rejected' stay hidden from learner views.
 */
export type VerificationStatus = 'source-verified' | 'verified-with-caveat' | 'pending-verification' | 'rejected';

export const VERIFICATION_LABELS: Readonly<Record<VerificationStatus, string>> = {
  'source-verified': 'Verified',
  'verified-with-caveat': 'Verified with caveat',
  'pending-verification': 'Pending verification',
  rejected: 'Rejected',
};

/** Recorded outcome of the verification review for a metric that is not (yet) verified. */
export interface MetricReview {
  /** ISO date of the review. */
  reviewedOn: string;
  /** True when a source search or read was actually performed in that review. */
  checkedThisReview: boolean;
  /** Sources or searches examined, stated honestly (including those that did not define the metric). */
  sourcesChecked: string[];
  /** Why the metric holds its status. */
  reason: string;
  /** What would settle it. */
  nextStep?: string;
}

export type MeasurementFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'per-period' | 'per-project' | 'per-season';

export interface MetricSourceRef {
  /** Id in core/sources.ts. */
  sourceId: string;
  /** Where in the source the definition was confirmed (section, paragraph, glossary entry). */
  locator: string;
  /** What exactly the source confirms for this metric. */
  confirms: string;
}

export interface MetricEvidence {
  status: VerificationStatus;
  sources: MetricSourceRef[];
  /** ISO date the cited source was read for this build; required when source-verified. */
  verifiedOn?: string;
  /** Accounting, regulatory or industry standard the definition depends on. */
  applicableStandard?: string;
  /** Scope limits, definitional variants or reasons the metric is pending. */
  note: string;
  /** Required for 'verified-with-caveat': assumptions or definitional limits shown to learners. */
  caveats?: string[];
  /** Recorded for pending and rejected metrics. */
  review?: MetricReview;
}

export interface WorkedExample {
  label: 'Hypothetical example for educational purposes';
  scenario: string;
  /** Keys must match the formula's variable ids exactly. */
  inputs: Record<string, number>;
  assumptions: string[];
  steps: string[];
  /** Stored in the formula's output unit (percent as a decimal fraction). */
  output: number;
  interpretation: string;
}

export interface MetricInterpretation {
  higher: string;
  lower: string;
  exceptions: string[];
  drivers: string[];
  managementUses: string[];
  pitfalls: string[];
}

export interface SimulatorHints {
  /** Business levers that move the formula inputs (the formula variables are always exposed). */
  drivers: string[];
  scenarioAssumptions: string[];
  /** Formula relationships to other metrics, e.g. "RevPAR = Occupancy × ADR". */
  relationships: string[];
}

export interface MetricDefinition {
  metricId: string;
  name: string;
  acronym?: string;
  category: MetricCategory;
  /** True when defined once in the shared layer and reused across industries. */
  shared: boolean;
  relatedMetricIds: string[];
  definition: string;
  businessMeaning: string;
  formulaId: string;
  unit: UnitId;
  frequency: MeasurementFrequency;
  reportingScope: string;
  variants: string[];
  interpretation: MetricInterpretation;
  example: WorkedExample;
  evidence: MetricEvidence;
  simulator?: SimulatorHints;
  suggestedApplication: string;
}

export type LinkPriority = 'core' | 'supporting';

/** Connects a metric to implemented curricula with industry-specific interpretation. */
export interface IndustryMetricLink {
  metricId: string;
  curriculumIds: string[];
  priority: LinkPriority;
  interpretation: string;
  /** Standard Domain Knowledge module the metric supports (module-level only). */
  relatedModule: 'M01' | 'M02' | 'M03' | 'M04' | 'M05';
}

export interface MissingMetricNote {
  curriculumId: string;
  metrics: string[];
  reason: string;
}

export interface IndustryPack {
  packId: string;
  label: string;
  metrics: MetricDefinition[];
  links: IndustryMetricLink[];
  missingHighPriority: MissingMetricNote[];
}
