// Who the device-wide Domain Knowledge records belong to.
//
// Lessons, Knowledge Checks and lesson completion are read from device-wide keys (`casemate:domain-reader:*`,
// `casemate:domain-quiz:*`, `casemate:domain-lesson-progress:v1`) that carry no account. Those keys are the
// working copy for exactly one owner at a time:
// - `device`: guests and everything recorded before account sync existed. Never sent anywhere automatically.
// - `acct:<scope>`: one signed-in learner, filled from their account and their own pending changes.
// Switching owner copies the device records into an archive (byte for byte, never deleted) before the working
// copy is cleared, and restores them when the device is used signed out again. A learner never sees, and the
// sync never uploads, records that belong to someone else. A `moving:` marker makes an interrupted switch
// resume safely on the next load.

import { isLessonWorkingKey } from './progressModel';
import type { KeyValueStore } from './progressModel';

export const SYNC_PREFIX = 'casemate:dk-sync:v1:';
export const OWNER_KEY = `${SYNC_PREFIX}owner`;
export const DEVICE_ARCHIVE_PREFIX = `${SYNC_PREFIX}device|`;
export const DEVICE_OWNER = 'device';
export const accountOwner = (scope: string) => `acct:${scope}`;

export type OwnerTag = string;

export interface ReconcileResult {
  changed: boolean;
  from: OwnerTag;
  to: OwnerTag;
  /** The switch could not complete (browser storage full); the working copy was left with its previous owner. */
  error?: 'storage';
}

export const scopeOfOwner = (owner: OwnerTag): string | null => (owner.startsWith('acct:') ? owner.slice(5) : null);

export function readOwner(store: KeyValueStore): { owner: OwnerTag; moving: { from: OwnerTag; to: OwnerTag } | null } {
  const raw = store.getItem(OWNER_KEY) ?? DEVICE_OWNER;
  if (raw.startsWith('moving:')) {
    const [from, to] = raw.slice(7).split('>');
    return { owner: from || DEVICE_OWNER, moving: { from: from || DEVICE_OWNER, to: to || DEVICE_OWNER } };
  }
  return { owner: raw, moving: null };
}

export const deviceArchiveKeys = (store: KeyValueStore) => store.keys().filter((key) => key.startsWith(DEVICE_ARCHIVE_PREFIX));

/** The archived device records, read-only, under their original key names. */
export function deviceArchiveView(store: KeyValueStore): KeyValueStore {
  return {
    keys: () => deviceArchiveKeys(store).map((key) => key.slice(DEVICE_ARCHIVE_PREFIX.length)),
    getItem: (key) => store.getItem(DEVICE_ARCHIVE_PREFIX + key),
    setItem: () => { throw new Error('The device archive is read-only'); },
    removeItem: () => { throw new Error('The device archive is read-only'); },
  };
}

/**
 * Makes `scope` (or the device, when null) the owner of the working copy. `captureLeavingAccount` runs
 * before an account's working copy is cleared so its unsynced changes are queued for that account only.
 */
export function reconcileOwnership(store: KeyValueStore, scope: string | null, captureLeavingAccount: (scope: string) => void): ReconcileResult {
  const { owner, moving } = readOwner(store);
  const target = scope ? accountOwner(scope) : DEVICE_OWNER;
  const from = moving ? moving.from : owner;
  if (!moving && from === target) return { changed: false, from, to: target };

  const working = store.keys().filter(isLessonWorkingKey);
  try {
    store.setItem(OWNER_KEY, `moving:${from}>${target}`);
    if (from === DEVICE_OWNER) {
      working.forEach((key) => {
        const value = store.getItem(key);
        if (value !== null) store.setItem(DEVICE_ARCHIVE_PREFIX + key, value);
      });
    } else {
      const leaving = scopeOfOwner(from);
      if (leaving) captureLeavingAccount(leaving);
    }
  } catch {
    // Without room to archive, nothing moves: the previous owner keeps the working copy.
    try { store.setItem(OWNER_KEY, from); } catch { /* marker unchanged */ }
    return { changed: false, from, to: from, error: 'storage' };
  }

  working.forEach((key) => store.removeItem(key));
  let restored = 0;
  if (target === DEVICE_OWNER) {
    deviceArchiveKeys(store).forEach((key) => {
      const value = store.getItem(key);
      if (value === null) return;
      try {
        store.setItem(key.slice(DEVICE_ARCHIVE_PREFIX.length), value);
        restored += 1;
      } catch {
        // The archive still holds it; the next load retries.
      }
    });
  }
  store.setItem(OWNER_KEY, target);
  return { changed: working.length > 0 || restored > 0, from, to: target };
}
