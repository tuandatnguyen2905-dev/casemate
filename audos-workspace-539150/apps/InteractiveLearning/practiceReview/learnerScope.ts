import { createContext, createElement, useContext } from 'react';
import type { ReactNode } from 'react';
import { useSpaceRuntime } from '../../../SpaceRuntimeContext';

/**
 * Practice history is stored on this device only. It is keyed by a hash of the signed-in email
 * (the identity the app already uses for account-scoped data), so two accounts on a shared
 * browser never see each other's practice, and the email itself is not written into key names.
 * Returns null when nobody is signed in; callers then keep practice in memory for the visit.
 */
export function learnerScopeFor(email: string | null | undefined): string | null {
  const value = String(email ?? '').trim().toLowerCase();
  if (!value.includes('@')) return null;
  let hash = 0x811c9dc5;
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `u-${hash.toString(16).padStart(8, '0')}`;
}

/** Overrides the signed-in email (tests and previews); undefined means "use the session". */
const LearnerEmailOverride = createContext<string | null | undefined>(undefined);

export function PracticeLearnerProvider({ email, children }: { email: string | null; children: ReactNode }) {
  return createElement(LearnerEmailOverride.Provider, { value: email }, children);
}

export function usePracticeLearnerScope(): string | null {
  const override = useContext(LearnerEmailOverride);
  let email: string | null = null;
  try {
    email = useSpaceRuntime()?.userEmail ?? null;
  } catch {
    email = null;
  }
  return learnerScopeFor(override !== undefined ? override : email);
}
