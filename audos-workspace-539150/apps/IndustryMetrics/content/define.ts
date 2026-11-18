import type { MetricDefinition, MetricEvidence, MetricInterpretation, MetricSourceRef, WorkedExample } from '../core/types';

export const HYPOTHETICAL_LABEL = 'Hypothetical example for educational purposes' as const;
export const VERIFIED_ON = '2026-11-08';

type MetricInput = Omit<MetricDefinition, 'example' | 'variants' | 'shared' | 'formulaId'> & {
  formulaId?: string;
  variants?: string[];
  example: Omit<WorkedExample, 'label'>;
};

function build(shared: boolean, input: MetricInput): MetricDefinition {
  return {
    ...input,
    shared,
    formulaId: input.formulaId ?? input.metricId,
    variants: input.variants ?? [],
    example: { label: HYPOTHETICAL_LABEL, ...input.example },
  };
}

export const sharedMetric = (input: MetricInput) => build(true, input);
export const packMetric = (input: MetricInput) => build(false, input);

export const ref = (sourceId: string, locator: string, confirms: string): MetricSourceRef => ({ sourceId, locator, confirms });

export function verified(sources: MetricSourceRef[], note: string, applicableStandard?: string): MetricEvidence {
  return { status: 'source-verified', sources, verifiedOn: VERIFIED_ON, note, applicableStandard };
}

/** Correct under stated assumptions or standards; the caveats are shown to learners next to the definition. */
export function verifiedWithCaveat(sources: MetricSourceRef[], note: string, caveats: string[], applicableStandard?: string): MetricEvidence {
  return { status: 'verified-with-caveat', sources, verifiedOn: VERIFIED_ON, note, caveats, applicableStandard };
}

export function pending(note: string, applicableStandard?: string): MetricEvidence {
  return { status: 'pending-verification', sources: [], note, applicableStandard };
}

export function interp(
  higher: string,
  lower: string,
  exceptions: string[],
  drivers: string[],
  managementUses: string[],
  pitfalls: string[],
): MetricInterpretation {
  return { higher, lower, exceptions, drivers, managementUses, pitfalls };
}

export const PENDING_PRACTICE = 'Definition reflects common management practice, but no authoritative source has been read for this build. Excluded from the learner-ready view until verified.';
