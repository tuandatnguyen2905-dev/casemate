/**
 * Optional "prior attempts" answers asked at Fit Assessment track selection.
 * Stored in the assessment progress and sent as track_select properties
 * (prior_applications_count, prior_furthest_round). Empty string = unanswered.
 */

export type PriorApplicationsCount = '0' | '1-2' | '3-5' | '6+';
export type PriorFurthestRound = 'none' | 'cv' | 'online_test' | 'interview' | 'assessment_centre' | 'final' | 'offer';

export type PriorAttempts = {
  applicationsCount: PriorApplicationsCount | '';
  furthestRound: PriorFurthestRound | '';
};

export const EMPTY_PRIOR_ATTEMPTS: PriorAttempts = { applicationsCount: '', furthestRound: '' };

export const PRIOR_APPLICATION_OPTIONS: ReadonlyArray<{ value: PriorApplicationsCount; label: string }> = [
  { value: '0', label: 'None yet' },
  { value: '1-2', label: '1–2' },
  { value: '3-5', label: '3–5' },
  { value: '6+', label: '6+' },
];

export const PRIOR_ROUND_OPTIONS: ReadonlyArray<{ value: PriorFurthestRound; label: string }> = [
  { value: 'none', label: 'No response yet' },
  { value: 'cv', label: 'CV screening' },
  { value: 'online_test', label: 'Online test' },
  { value: 'interview', label: 'Interview' },
  { value: 'assessment_centre', label: 'Assessment centre' },
  { value: 'final', label: 'Final round' },
  { value: 'offer', label: 'Offer' },
];

export function sanitizePriorAttempts(raw: unknown): PriorAttempts {
  const value = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
  const count = PRIOR_APPLICATION_OPTIONS.find((option) => option.value === value.applicationsCount)?.value || '';
  const round = PRIOR_ROUND_OPTIONS.find((option) => option.value === value.furthestRound)?.value || '';
  return { applicationsCount: count, furthestRound: count === '0' ? 'none' : round };
}

export function priorAttemptProperties(priorAttempts: PriorAttempts): Record<string, string | null> {
  return {
    prior_applications_count: priorAttempts.applicationsCount || null,
    prior_furthest_round: priorAttempts.furthestRound || null,
  };
}
