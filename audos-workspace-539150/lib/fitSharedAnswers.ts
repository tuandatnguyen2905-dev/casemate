// Answers that mean the same thing in the Validation and Discovery tracks are
// kept per account (or per device before sign-in), so switching track never
// asks for them twice. The CV itself is shared through user_cv_profiles.

export type SharedFitTarget = { programId: string; company: string; program: string; selectedFunction: string; source: 'validation' | 'discovery' };

export type SharedFitAnswers = {
  mcqAnswers?: Record<string, string>;
  mcqSeconds?: Record<string, number>;
  ocp?: Record<string, number>;
  lastTarget?: SharedFitTarget | null;
  updatedAt?: string;
};

function storageKey(email: string | null | undefined): string {
  const owner = String(email || '').trim().toLowerCase();
  return `casemate-fit-shared-v1:${owner || 'device'}`;
}

export function readSharedFitAnswers(email: string | null | undefined): SharedFitAnswers {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey(email)) || '{}');
    return value && typeof value === 'object' ? value as SharedFitAnswers : {};
  } catch {
    return {};
  }
}

export function writeSharedFitAnswers(email: string | null | undefined, patch: SharedFitAnswers): void {
  try {
    const next = { ...readSharedFitAnswers(email), ...patch, updatedAt: new Date().toISOString() };
    localStorage.setItem(storageKey(email), JSON.stringify(next));
  } catch {
    // Storage unavailable: each track still keeps its own draft.
  }
}

export function hasSharedAnswers(value: Record<string, unknown> | null | undefined): boolean {
  return !!value && typeof value === 'object' && Object.keys(value).length > 0;
}

// Sliders start at 3; an all-3 vector carries no preference to share.
export function isDefaultOcp(ocp: Record<string, number> | null | undefined): boolean {
  return !ocp || Object.values(ocp).every((value) => Number(value) === 3);
}
