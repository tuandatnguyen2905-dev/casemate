// Per-account bookkeeping kept in this browser. Every key carries the learner scope, so one account's
// pending writes, conflicts and sync baseline are never read, replayed or shown under another account.
//   queue:<scope>      writes not yet acknowledged by the server (coalesced per record, retried idempotently)
//   baseline:<scope>   fingerprints of what the server last acknowledged, so only genuine changes upload
//   conflicts:<scope>  note versions that diverged across devices, kept until the learner chooses
//   import:<scope>     the learner's decision about progress found on this device

import { SYNC_PREFIX } from './progressOwnership';
import type { KeyValueStore, SyncRecord } from './progressModel';

export const queueKey = (scope: string) => `${SYNC_PREFIX}queue:${scope}`;
export const baselineKey = (scope: string) => `${SYNC_PREFIX}baseline:${scope}`;
export const conflictsKey = (scope: string) => `${SYNC_PREFIX}conflicts:${scope}`;
export const importKey = (scope: string) => `${SYNC_PREFIX}import:${scope}`;
export const resumeKey = (scope: string) => `${SYNC_PREFIX}resume:${scope}`;

/** Short, stable, non-cryptographic fingerprint (cyrb53). Keeps baselines small and free of note text. */
export function fingerprint(text: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    h1 = Math.imul(h1 ^ code, 2654435761);
    h2 = Math.imul(h2 ^ code, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

const readObject = <T>(store: KeyValueStore, key: string, fallback: T): T => {
  try {
    const parsed = JSON.parse(store.getItem(key) ?? 'null');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as T : fallback;
  } catch {
    return fallback;
  }
};
const writeObject = (store: KeyValueStore, key: string, value: unknown): boolean => {
  try {
    store.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export interface QueueItem {
  record: SyncRecord;
  /** Same write, same key: a retry after a lost response is recognised by the server and never applied twice. */
  idempotencyKey: string;
  /** Note edits: the server revision the edit was made on top of. */
  baseRevision?: number;
  origin: 'sync' | 'import';
  tries: number;
  nextAttemptAt: number;
  /** The server refused the write as invalid; kept (never discarded) and not retried until it changes. */
  rejected?: string;
}

export interface QueueState {
  v: 1;
  items: Record<string, QueueItem>;
}

export const loadQueue = (store: KeyValueStore, scope: string): QueueState => {
  const value = readObject<QueueState>(store, queueKey(scope), { v: 1, items: {} });
  return { v: 1, items: value.items && typeof value.items === 'object' ? value.items : {} };
};
export const saveQueue = (store: KeyValueStore, scope: string, queue: QueueState) => writeObject(store, queueKey(scope), queue);

export function idempotencyKeyFor(scope: string, record: Pick<SyncRecord, 'key' | 'type' | 'payload'>, salt = ''): string {
  return `ik1-${fingerprint(`${scope}|${record.key}|${salt}|${JSON.stringify([record.type, record.payload])}`)}`;
}

/** Adds or replaces the pending write for a record. A newer change to the same record supersedes the older one. */
export function enqueue(queue: QueueState, scope: string, record: SyncRecord, options: { baseRevision?: number; origin?: 'sync' | 'import'; salt?: string } = {}): QueueState {
  const idempotencyKey = idempotencyKeyFor(scope, record, options.salt);
  const current = queue.items[record.key];
  if (current && current.idempotencyKey === idempotencyKey) return queue;
  return {
    v: 1,
    items: {
      ...queue.items,
      [record.key]: {
        record,
        idempotencyKey,
        ...(options.baseRevision !== undefined ? { baseRevision: options.baseRevision } : current?.baseRevision !== undefined ? { baseRevision: current.baseRevision } : {}),
        origin: options.origin ?? 'sync',
        tries: 0,
        nextAttemptAt: 0,
      },
    },
  };
}

export const pendingItems = (queue: QueueState) => Object.values(queue.items).filter((item) => !item.rejected);

/** Up to `limit` writes that are due, attempts and lesson completions first so the most valuable evidence lands first. */
export function dueBatch(queue: QueueState, now: number, limit: number): QueueItem[] {
  const weight = (item: QueueItem) => (item.record.type === 'attempt' || item.record.type === 'check' || item.record.type === 'lesson' ? 0 : 1);
  return pendingItems(queue).filter((item) => item.nextAttemptAt <= now).sort((a, b) => weight(a) - weight(b)).slice(0, limit);
}

export function backoffMs(tries: number): number {
  return Math.min(5 * 60_000, 2_000 * 2 ** Math.max(0, tries - 1));
}

export interface Baseline {
  v: 1;
  /** Fingerprint of the record as last acknowledged (or as hydrated from the server). */
  fp: Record<string, string>;
  /** Server revision per record (notes). */
  rev: Record<string, number>;
  /** Learner action time of the last acknowledged reading position, per record. */
  at: Record<string, string>;
  /** Set once the first scan for this account has run on this device. */
  initialised?: boolean;
}

export const loadBaseline = (store: KeyValueStore, scope: string): Baseline => {
  const value = readObject<Partial<Baseline>>(store, baselineKey(scope), {});
  return { v: 1, fp: value.fp ?? {}, rev: value.rev ?? {}, at: value.at ?? {}, ...(value.initialised ? { initialised: true } : {}) };
};
export const saveBaseline = (store: KeyValueStore, scope: string, baseline: Baseline) => writeObject(store, baselineKey(scope), baseline);

export interface NoteConflict {
  recordKey: string;
  curriculumId: string;
  local: { text: string; at: string };
  remote: { text: string; modifiedAt: string; revision: number };
}

export const loadConflicts = (store: KeyValueStore, scope: string): Record<string, NoteConflict> => readObject(store, conflictsKey(scope), {});
export const saveConflicts = (store: KeyValueStore, scope: string, conflicts: Record<string, NoteConflict>) => writeObject(store, conflictsKey(scope), conflicts);

export interface ImportDecision {
  status: 'imported' | 'dismissed' | 'in-progress';
  /** Fingerprint of the device records the decision was about; new device activity offers import again. */
  fingerprint: string;
  importId: string;
  at: string;
  counts?: Record<string, number>;
}

export const loadImportDecision = (store: KeyValueStore, scope: string): ImportDecision | null => {
  const value = readObject<Partial<ImportDecision> | null>(store, importKey(scope), null);
  return value && typeof value.status === 'string' && typeof value.fingerprint === 'string' ? value as ImportDecision : null;
};
export const saveImportDecision = (store: KeyValueStore, scope: string, decision: ImportDecision) => writeObject(store, importKey(scope), decision);
