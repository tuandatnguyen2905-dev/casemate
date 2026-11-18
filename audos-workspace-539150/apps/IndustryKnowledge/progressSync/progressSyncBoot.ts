// Runs once when the shell bundle loads, before any Domain Knowledge screen reads its records: the
// device-wide working copy is handed to whoever is signed in now (or back to the device after sign-out,
// which always ends in a full page load). In-session sign-in and account switches are handled by the host.

import { learnerScopeFor } from '../../InteractiveLearning/practiceReview/learnerScope';
import { browserKeyValueStore } from './progressModel';
import type { KeyValueStore } from './progressModel';
import type { ReconcileResult } from './progressOwnership';
import { reconcileWorkingCopy } from './progressSyncEngine';

/** The sign-in email of the stored workspace session, as SpaceRuntimeContext adopts it (OTP-pending sessions excluded). */
export function readSignedInEmail(store: KeyValueStore, spaceId?: string | null): string | null {
  const keys = spaceId ? [`space_session_${spaceId}`] : store.keys().filter((key) => key.startsWith('space_session_') && key !== 'space_session_id');
  for (const key of keys) {
    try {
      const session = JSON.parse(store.getItem(key) ?? 'null');
      if (!session || session.verified === false) continue;
      const email = typeof session.email === 'string' ? session.email.trim().toLowerCase() : '';
      if (email.includes('@')) return email;
    } catch {
      // Not a session record.
    }
  }
  return null;
}

export function currentSpaceId(): string | null {
  if (typeof window === 'undefined') return null;
  const runtime = window as Window & { __SPACE_ID__?: string; __APP_ID__?: string };
  return runtime.__SPACE_ID__ || runtime.__APP_ID__ || null;
}

function bootReconcile(): ReconcileResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const store = browserKeyValueStore(window.localStorage);
    if (!store) return null;
    return reconcileWorkingCopy(store, learnerScopeFor(readSignedInEmail(store, currentSpaceId())));
  } catch {
    return null;
  }
}

export const BOOT_RECONCILE: ReconcileResult | null = bootReconcile();
