// Connects the progress Domain Knowledge already records in this browser to the learner's account.
//
// Source of truth: for a signed-in learner the server is authoritative. The browser keys are a cache the
// lessons keep reading and writing exactly as before, plus an account-scoped queue of writes the server has
// not acknowledged yet. Guests keep the existing local-only behaviour and nothing is sent.
//
// Flow: the working copy is reconciled to the signed-in account (progressOwnership), the pending queue is
// replayed into it, then the account's records are merged in (hydrate). A periodic scan compares the browser
// records with the acknowledged baseline; only records the learner changed are queued, coalesced per record,
// and flushed in debounced batches. Hydrated data never re-uploads because it is written into the baseline.

import { applyRecords, extractRecords, payloadFingerprint, recordKeys, parseRecordKey, flashcardKeyFor, matchSortKeyFor, memoryKeyValueStore } from './progressModel';
import type { KeyValueStore, SyncRecord, Json } from './progressModel';
import { deviceArchiveView, reconcileOwnership, SYNC_PREFIX } from './progressOwnership';
import type { ReconcileResult } from './progressOwnership';
import {
  backoffMs, dueBatch, enqueue, fingerprint, idempotencyKeyFor, loadBaseline, loadConflicts, loadImportDecision, loadQueue, pendingItems, resumeKey,
  saveBaseline, saveConflicts, saveImportDecision, saveQueue,
} from './progressQueue';
import type { Baseline, ImportDecision, NoteConflict, QueueItem, QueueState } from './progressQueue';
import { SyncTransportError } from './progressTransport';
import type { ProgressTransport, PushMutation, PushResult } from './progressTransport';

export const PROGRESS_UPDATED_EVENT = 'casemate:domain-progress-updated';
const presyncPrefix = (scope: string) => `${SYNC_PREFIX}presync:${scope}|`;

export type SyncPhase = 'guest' | 'loading' | 'saved' | 'saving' | 'offline' | 'failed' | 'auth';

export interface ImportOffer {
  fingerprint: string;
  total: number;
  counts: Record<string, number>;
  /** Records the account already holds in a different version; merged by the conflict rules, never overwritten blindly. */
  differs: number;
  /** Notes whose text differs from the account's: kept as conflicts for the learner to resolve. */
  noteConflicts: number;
  /** Records that could not be tied to a curriculum lesson; imported as-is and flagged. */
  unmapped: number;
}

export interface ResumeContext {
  identity?: string;
  persistenceKey: string;
  lessonTitle?: string;
  chapter: number;
  stage: 'learning' | 'takeaways';
  params: Record<string, string>;
  at: string;
}

export interface SyncStatus {
  phase: SyncPhase;
  pending: number;
  rejected: number;
  lastSavedAt: string | null;
  conflicts: NoteConflict[];
  importOffer: ImportOffer | null;
  importState: 'idle' | 'running' | 'done' | 'failed';
  importCounts: Record<string, number> | null;
  resume: ResumeContext | null;
  /** Progress from another device arrived while a lesson was already open. */
  refreshSuggested: boolean;
  /** Browser storage could not hold the device archive, so the account copy was not loaded. */
  storageBlocked: boolean;
}

export interface EngineOptions {
  store: KeyValueStore;
  scope: string | null;
  transport: ProgressTransport | null;
  now?: () => number;
  /** Search string of the current address (`?dkLesson=…`), used for resume context only. */
  locationSearch?: () => string;
  /** Whether a Domain Knowledge screen is mounted right now (hydration then suggests a refresh). */
  lessonMounted?: () => boolean;
  emit?: (event: string) => void;
  debounceMs?: number;
  batchSize?: number;
}

const iso = (ms: number) => new Date(ms).toISOString();
const time = (value: unknown) => {
  const parsed = typeof value === 'string' ? Date.parse(value) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : 0;
};
const isObj = (value: unknown): value is Json => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const recordFp = (record: SyncRecord) => fingerprint(payloadFingerprint(record));
const RESUME_PARAMS_EXCLUDED = new Set(['dkPractice', 'dkChapter']);

/** Queues the unsynced changes of an account whose working copy is about to be cleared (sign-out, account switch). */
export function captureAccountChanges(store: KeyValueStore, scope: string, nowMs = Date.now()): number {
  const baseline = loadBaseline(store, scope);
  if (!baseline.initialised) return 0;
  let queue = loadQueue(store, scope);
  let count = 0;
  extractRecords(store, { scope }).forEach((record, key) => {
    const fp = recordFp(record);
    if (baseline.fp[key] === fp) return;
    queue = enqueue(queue, scope, stampRecord(record, nowMs), record.type === 'note' ? { baseRevision: baseline.rev[key] ?? 0 } : {});
    baseline.fp[key] = fp;
    count += 1;
  });
  saveQueue(store, scope, queue);
  saveBaseline(store, scope, baseline);
  return count;
}

/** Makes the working copy belong to `scope` (or the device when signed out), keeping every record. */
export function reconcileWorkingCopy(store: KeyValueStore, scope: string | null, nowMs = Date.now()): ReconcileResult {
  return reconcileOwnership(store, scope, (leaving) => { captureAccountChanges(store, leaving, nowMs); });
}

function stampRecord(record: SyncRecord, nowMs: number): SyncRecord {
  const at = iso(nowMs);
  if (record.type === 'note') return { ...record, eventAt: at, payload: { text: String(record.payload.text ?? ''), modifiedAt: at } };
  if (record.type === 'position' || record.type === 'reader') return { ...record, eventAt: at };
  return { ...record, eventAt: record.eventAt || at };
}

const toMutation = (item: QueueItem): PushMutation => ({
  type: item.record.type,
  key: item.record.key,
  curriculumId: item.record.curriculumId,
  payload: item.record.payload,
  eventAt: item.record.eventAt,
  idempotencyKey: item.idempotencyKey,
  ...(item.baseRevision !== undefined ? { baseRevision: item.baseRevision } : {}),
  ...(item.record.flags?.length ? { flags: item.record.flags } : {}),
});

export class ProgressSyncEngine {
  private readonly store: KeyValueStore;
  private readonly scope: string | null;
  private readonly transport: ProgressTransport | null;
  private readonly now: () => number;
  private readonly options: EngineOptions;
  private queue: QueueState = { v: 1, items: {} };
  private baseline: Baseline = { v: 1, fp: {}, rev: {}, at: {} };
  private conflicts: Record<string, NoteConflict> = {};
  private cloud = new Map<string, SyncRecord>();
  private listeners = new Set<() => void>();
  private flushTimer: ReturnType<typeof setTimeout> | null = null;
  private firstPendingAt = 0;
  private inFlight: Promise<void> | null = null;
  private lastError: 'offline' | 'failed' | null = null;
  private authBlocked = false;
  private hydrated = false;
  private stopped = false;
  private status: SyncStatus;

  constructor(options: EngineOptions) {
    this.options = options;
    this.store = options.store;
    this.scope = options.scope;
    this.transport = options.transport;
    this.now = options.now ?? Date.now;
    this.status = {
      phase: options.scope ? 'loading' : 'guest', pending: 0, rejected: 0, lastSavedAt: null, conflicts: [], importOffer: null,
      importState: 'idle', importCounts: null, resume: null, refreshSuggested: false, storageBlocked: false,
    };
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  getStatus = (): SyncStatus => this.status;

  private publish(patch: Partial<SyncStatus> = {}) {
    const pending = this.scope ? pendingItems(this.queue).length : 0;
    const rejected = Object.values(this.queue.items).filter((item) => item.rejected).length;
    const next: SyncStatus = { ...this.status, ...patch, pending, rejected, conflicts: Object.values(this.conflicts) };
    if (!this.scope) next.phase = 'guest';
    else if (this.authBlocked) next.phase = 'auth';
    else if (next.storageBlocked) next.phase = 'failed';
    else if (this.inFlight) next.phase = 'saving';
    else if (pending > 0) next.phase = this.lastError ?? (this.hydrated ? 'saving' : 'loading');
    else if (rejected > 0) next.phase = 'failed';
    else if (!this.hydrated) next.phase = this.lastError ?? 'loading';
    else next.phase = 'saved';
    this.status = next;
    this.listeners.forEach((listener) => listener());
  }

  /** Loads per-account bookkeeping, replays unsynced writes, then merges the account's records. */
  async start(reconcile: ReconcileResult | null = null): Promise<void> {
    if (!this.scope) {
      this.publish();
      return;
    }
    if (reconcile?.error === 'storage') {
      this.lastError = 'failed';
      this.publish({ storageBlocked: true });
      return;
    }
    this.queue = loadQueue(this.store, this.scope);
    this.baseline = loadBaseline(this.store, this.scope);
    this.conflicts = loadConflicts(this.store, this.scope);
    if (!this.baseline.initialised) this.initialiseBaseline();
    this.retryNow(false);
    this.replayQueue();
    this.publish({ resume: this.readResume(), importOffer: this.computeImportOffer() });
    await this.hydrate();
    await this.flush();
  }

  /** A new page load, the browser coming back online or the learner pressing Retry: queued writes are due again. */
  retryNow(flush = true) {
    if (!this.scope) return;
    Object.values(this.queue.items).forEach((item) => { if (!item.rejected) item.nextAttemptAt = 0; });
    saveQueue(this.store, this.scope, this.queue);
    if (flush) void this.flush();
  }

  stop() {
    this.stopped = true;
    if (this.flushTimer) clearTimeout(this.flushTimer);
    this.flushTimer = null;
  }

  /**
   * First run for this account on this device: practice history already stored under the account scope
   * predates sync, so it is frozen as an import candidate instead of being uploaded automatically.
   */
  private initialiseBaseline() {
    if (!this.scope) return;
    const prefix = presyncPrefix(this.scope);
    [flashcardKeyFor(this.scope), matchSortKeyFor(this.scope)].forEach((key) => {
      const value = this.store.getItem(key);
      if (value === null) return;
      try { this.store.setItem(prefix + key, value); } catch { /* the live key still holds it */ }
    });
    extractRecords(this.store, { scope: this.scope }).forEach((record, key) => { this.baseline.fp[key] = recordFp(record); });
    this.baseline.initialised = true;
    saveBaseline(this.store, this.scope, this.baseline);
  }

  private replayQueue() {
    const records = Object.values(this.queue.items).map((item) => item.record);
    if (records.length) applyRecords(this.store, records, { scope: this.scope });
  }

  /** Compares the browser records with the baseline and queues what the learner changed. Returns the number queued. */
  scan(): number {
    if (!this.scope || this.stopped) return 0;
    const nowMs = this.now();
    let count = 0;
    let latestPosition: SyncRecord | null = null;
    extractRecords(this.store, { scope: this.scope }).forEach((record, key) => {
      const fp = recordFp(record);
      if (this.baseline.fp[key] === fp) return;
      const stamped = stampRecord(record, nowMs);
      this.queue = enqueue(this.queue, this.scope!, stamped, record.type === 'note' ? { baseRevision: this.baseline.rev[key] ?? 0 } : {});
      this.baseline.fp[key] = fp;
      if (record.type === 'position') {
        this.baseline.at[key] = stamped.eventAt;
        latestPosition = stamped;
      }
      count += 1;
    });
    if (latestPosition) this.noteResume(latestPosition);
    if (count) {
      saveQueue(this.store, this.scope, this.queue);
      saveBaseline(this.store, this.scope, this.baseline);
      if (!this.firstPendingAt) this.firstPendingAt = nowMs;
      this.scheduleFlush();
      this.publish();
    }
    return count;
  }

  private scheduleFlush() {
    if (this.stopped) return;
    const debounce = this.options.debounceMs ?? 6000;
    const waited = this.now() - this.firstPendingAt;
    const delay = waited > 30_000 ? 0 : debounce;
    if (this.flushTimer) clearTimeout(this.flushTimer);
    this.flushTimer = setTimeout(() => { this.flushTimer = null; void this.flush(); }, delay);
  }

  /** Sends due writes in batches. "Saved" is shown only once the server acknowledged every pending write. */
  async flush(options: { keepalive?: boolean } = {}): Promise<void> {
    if (!this.scope || !this.transport || this.authBlocked || this.stopped) return;
    if (this.inFlight) return this.inFlight;
    const run = async () => {
      for (let round = 0; round < 20; round += 1) {
        const batch = dueBatch(this.queue, this.now(), this.options.batchSize ?? 40);
        if (!batch.length) break;
        let results: PushResult[];
        try {
          results = await this.transport!.push(batch.map(toMutation), { keepalive: options.keepalive });
        } catch (error) {
          this.handleFailure(batch, error);
          return;
        }
        this.lastError = null;
        this.applyResults(batch, results, 'sync');
      }
      const waiting = pendingItems(this.queue);
      if (!waiting.length) {
        this.firstPendingAt = 0;
        this.status = { ...this.status, lastSavedAt: iso(this.now()) };
      } else if (!this.stopped && !this.flushTimer) {
        const retryIn = Math.min(...waiting.map((item) => item.nextAttemptAt)) - this.now();
        this.flushTimer = setTimeout(() => { this.flushTimer = null; void this.flush(); }, Math.max(1000, retryIn));
      }
    };
    this.inFlight = run().finally(() => { this.inFlight = null; this.publish(); });
    this.publish();
    return this.inFlight;
  }

  private handleFailure(batch: QueueItem[], error: unknown) {
    const kind = error instanceof SyncTransportError ? error.kind : 'server';
    if (kind === 'auth') {
      // An expired or rejected session is never reported as saved; writes stay queued for this account.
      this.authBlocked = true;
      return;
    }
    this.lastError = kind === 'offline' ? 'offline' : 'failed';
    const nowMs = this.now();
    batch.forEach((item) => {
      const current = this.queue.items[item.record.key];
      if (!current || current.idempotencyKey !== item.idempotencyKey) return;
      const tries = current.tries + 1;
      this.queue.items[item.record.key] = { ...current, tries, nextAttemptAt: nowMs + backoffMs(tries), ...(kind === 'invalid' ? { rejected: 'invalid' } : {}) };
    });
    saveQueue(this.store, this.scope!, this.queue);
    const retryIn = Math.min(...batch.map((item) => (this.queue.items[item.record.key]?.nextAttemptAt ?? nowMs) - nowMs));
    if (!this.stopped && kind !== 'invalid' && Number.isFinite(retryIn)) {
      if (this.flushTimer) clearTimeout(this.flushTimer);
      this.flushTimer = setTimeout(() => { this.flushTimer = null; void this.flush(); }, Math.max(1000, retryIn));
    }
  }

  private applyResults(batch: QueueItem[], results: PushResult[], origin: 'sync' | 'import'): Record<string, number> {
    const counts: Record<string, number> = {};
    const byKey = new Map(results.map((result) => [result.key, result]));
    const toApply: SyncRecord[] = [];
    batch.forEach((item) => {
      const key = item.record.key;
      const result = byKey.get(key);
      const current = this.queue.items[key];
      const sameWrite = current && current.idempotencyKey === item.idempotencyKey;
      if (!result || result.status === 'retry') {
        // Not acknowledged: kept and resent later with the same idempotency key.
        if (sameWrite) this.queue.items[key] = { ...current, tries: current.tries + 1, nextAttemptAt: this.now() + backoffMs(current.tries + 1) };
        this.lastError = 'failed';
        return;
      }
      counts[result.status] = (counts[result.status] ?? 0) + 1;
      if (result.status === 'rejected') {
        if (sameWrite) this.queue.items[key] = { ...current, rejected: result.reason ?? 'rejected' };
        return;
      }
      if (typeof result.revision === 'number') this.baseline.rev[key] = result.revision;
      if (result.status === 'conflict' && result.record && item.record.type === 'note') {
        const remote = result.record.payload;
        this.conflicts[key] = {
          recordKey: key,
          curriculumId: item.record.curriculumId,
          local: { text: String(item.record.payload.text ?? ''), at: item.record.eventAt },
          remote: { text: String(remote.text ?? ''), modifiedAt: String(remote.modifiedAt ?? ''), revision: result.record.revision ?? 0 },
        };
      } else if (result.record && origin === 'sync') {
        toApply.push(result.record);
      }
      if (result.record) this.cloud.set(key, result.record);
      if (sameWrite) delete this.queue.items[key];
    });
    if (toApply.length) this.applyCloud(toApply);
    saveQueue(this.store, this.scope!, this.queue);
    saveBaseline(this.store, this.scope!, this.baseline);
    saveConflicts(this.store, this.scope!, this.conflicts);
    return counts;
  }

  /** Merges server records into the browser keys and records them as acknowledged so they never re-upload. */
  private applyCloud(records: SyncRecord[]) {
    if (!this.scope) return [];
    const changed = applyRecords(this.store, records, {
      scope: this.scope,
      canReplaceNote: (key) => !this.queue.items[key] && !this.conflicts[key],
      isNewerPosition: (key, eventAt) => !this.queue.items[key] && time(eventAt) > time(this.baseline.at[key]),
    });
    records.forEach((record) => {
      if (record.type === 'position' && time(record.eventAt) > time(this.baseline.at[record.key])) this.baseline.at[record.key] = record.eventAt;
      if (typeof record.revision === 'number') this.baseline.rev[record.key] = record.revision;
    });
    extractRecords(this.store, { scope: this.scope }).forEach((record, key) => {
      if (!this.queue.items[key]) this.baseline.fp[key] = recordFp(record);
    });
    return changed;
  }

  async hydrate(): Promise<void> {
    if (!this.scope || !this.transport || this.stopped) return;
    try {
      const { records } = await this.transport.summary();
      this.cloud = new Map(records.map((record) => [record.key, record]));
      const resume = records.find((record) => record.type === 'resume');
      const changed = this.applyCloud(records.filter((record) => record.type !== 'resume' && record.type !== 'import'));
      if (resume) this.adoptResume(resume);
      saveBaseline(this.store, this.scope, this.baseline);
      this.hydrated = true;
      this.lastError = null;
      if (changed.length) {
        this.options.emit?.(PROGRESS_UPDATED_EVENT);
        if (this.options.lessonMounted?.()) this.status = { ...this.status, refreshSuggested: true };
      }
      this.publish({ importOffer: this.computeImportOffer(), resume: this.readResume() });
    } catch (error) {
      const kind = error instanceof SyncTransportError ? error.kind : 'server';
      if (kind === 'auth') this.authBlocked = true;
      else this.lastError = kind === 'offline' ? 'offline' : 'failed';
      this.publish();
    }
  }

  // Notes conflicts -----------------------------------------------------------------------

  /** The learner chose: keep this device's text, use the other device's, or keep both in one note. */
  resolveConflict(recordKey: string, choice: 'local' | 'remote' | 'both') {
    const conflict = this.conflicts[recordKey];
    if (!conflict || !this.scope) return;
    const text = choice === 'local' ? conflict.local.text : choice === 'remote' ? conflict.remote.text
      : `${conflict.local.text}\n\n— From another device —\n${conflict.remote.text}`;
    const at = iso(this.now());
    const record: SyncRecord = { type: 'note', key: recordKey, curriculumId: conflict.curriculumId, payload: { text, modifiedAt: at }, eventAt: at };
    delete this.conflicts[recordKey];
    applyRecords(this.store, [record], { scope: this.scope });
    this.baseline.rev[recordKey] = conflict.remote.revision;
    if (choice === 'remote') {
      this.baseline.fp[recordKey] = recordFp({ ...record, payload: { text } });
    } else {
      this.queue = enqueue(this.queue, this.scope, record, { baseRevision: conflict.remote.revision });
      this.baseline.fp[recordKey] = recordFp({ ...record, payload: { text } });
      if (!this.firstPendingAt) this.firstPendingAt = this.now();
      this.scheduleFlush();
    }
    saveQueue(this.store, this.scope, this.queue);
    saveBaseline(this.store, this.scope, this.baseline);
    saveConflicts(this.store, this.scope, this.conflicts);
    this.options.emit?.(PROGRESS_UPDATED_EVENT);
    this.publish();
  }

  // Resume --------------------------------------------------------------------------------

  private noteResume(position: SyncRecord) {
    if (!this.scope) return;
    const view = isObj(position.payload.view) ? position.payload.view : null;
    const chapter = Number(view?.chapter);
    if (!view || !Number.isInteger(chapter) || chapter < 0) return;
    const params: Record<string, string> = {};
    try {
      new URLSearchParams(this.options.locationSearch?.() ?? '').forEach((value, name) => {
        if (name.startsWith('dk') && !RESUME_PARAMS_EXCLUDED.has(name)) params[name] = value;
      });
    } catch {
      // Without the address, resume still names the lesson.
    }
    const persistenceKey = parseRecordKey(position.key).rest;
    const identity = this.identityFor(persistenceKey);
    const resume: ResumeContext = {
      persistenceKey,
      ...(identity ? { identity, lessonTitle: identity.split('::').slice(2).join('::') } : {}),
      chapter,
      stage: view.stage === 'takeaways' ? 'takeaways' : 'learning',
      params,
      at: position.eventAt,
    };
    try { this.store.setItem(resumeKey(this.scope), JSON.stringify(resume)); } catch { /* resume is optional */ }
    this.queue = enqueue(this.queue, this.scope, { type: 'resume', key: recordKeys.resume(), curriculumId: identity ? identity.split('::')[0] : 'unresolved', payload: resume as unknown as Json, eventAt: resume.at });
    this.status = { ...this.status, resume };
  }

  private adoptResume(record: SyncRecord) {
    if (!this.scope) return;
    const local = this.readResume();
    if (local && time(local.at) >= time(record.eventAt)) return;
    try { this.store.setItem(resumeKey(this.scope), JSON.stringify(record.payload)); } catch { /* optional */ }
  }

  private readResume(): ResumeContext | null {
    if (!this.scope) return null;
    try {
      const value = JSON.parse(this.store.getItem(resumeKey(this.scope)) ?? 'null');
      return isObj(value) && typeof value.persistenceKey === 'string' && Number.isInteger(value.chapter) ? value as unknown as ResumeContext : null;
    } catch {
      return null;
    }
  }

  private identityFor(persistenceKey: string): string | undefined {
    try {
      const lessons = JSON.parse(this.store.getItem('casemate:domain-lesson-progress:v1') ?? '{}');
      if (!isObj(lessons)) return undefined;
      return Object.keys(lessons).find((identity) => isObj(lessons[identity]) && (lessons[identity] as Json).persistenceKey === persistenceKey);
    } catch {
      return undefined;
    }
  }

  // Historical import ---------------------------------------------------------------------

  /** Device records not attributed to any account: the archive of signed-out progress plus pre-sync practice. */
  importCandidates(): Map<string, SyncRecord> {
    const out = new Map<string, SyncRecord>();
    if (!this.scope) return out;
    extractRecords(deviceArchiveView(this.store), { scope: null, lessonsOnly: true }).forEach((record, key) => out.set(key, record));
    const prefix = presyncPrefix(this.scope);
    const presync = memoryKeyValueStore();
    this.store.keys().filter((key) => key.startsWith(prefix)).forEach((key) => {
      const value = this.store.getItem(key);
      if (value !== null) presync.setItem(key.slice(prefix.length), value);
    });
    extractRecords(presync, { scope: this.scope }).forEach((record, key) => out.set(key, record));
    return out;
  }

  computeImportOffer(): ImportOffer | null {
    if (!this.scope) return null;
    const candidates = Array.from(this.importCandidates().values());
    if (!candidates.length) return null;
    const fp = fingerprint(candidates.map((record) => `${record.key}=${recordFp(record)}`).sort().join('\n'));
    const decision = loadImportDecision(this.store, this.scope);
    if (decision && decision.fingerprint === fp && decision.status !== 'in-progress') return null;
    const counts: Record<string, number> = {};
    let differs = 0;
    let noteConflicts = 0;
    let unmapped = 0;
    candidates.forEach((record) => {
      counts[record.type] = (counts[record.type] ?? 0) + 1;
      if (record.flags?.includes('unmapped')) unmapped += 1;
      const cloud = this.cloud.get(record.key);
      if (!cloud) return;
      if (record.type === 'note') {
        if (String(cloud.payload.text ?? '') !== String(record.payload.text ?? '')) noteConflicts += 1;
      } else if (payloadFingerprint(cloud) !== payloadFingerprint(record)) {
        differs += 1;
      }
    });
    return { fingerprint: fp, total: candidates.length, counts, differs, noteConflicts, unmapped };
  }

  /** Not mine / not now: recorded on this device only. Nothing is sent to the account. */
  dismissImport() {
    const offer = this.status.importOffer;
    if (!this.scope || !offer) return;
    saveImportDecision(this.store, this.scope, { status: 'dismissed', fingerprint: offer.fingerprint, importId: '', at: iso(this.now()) });
    this.publish({ importOffer: null });
  }

  /**
   * Copies the device records into the account. Idempotent and retry-safe: every write carries a key derived
   * from the import and the record, so a retried or repeated import never duplicates attempts and the server's
   * conflict rules decide every merge (completion never regresses; differing notes become conflicts).
   * The device archive is left exactly as it was.
   */
  async importDevice(): Promise<void> {
    const offer = this.status.importOffer;
    if (!this.scope || !this.transport || !offer || this.status.importState === 'running') return;
    const previous = loadImportDecision(this.store, this.scope);
    const importId = previous?.status === 'in-progress' && previous.fingerprint === offer.fingerprint ? previous.importId : `imp-${fingerprint(`${this.scope}|${offer.fingerprint}`)}`;
    const decision: ImportDecision = { status: 'in-progress', fingerprint: offer.fingerprint, importId, at: iso(this.now()) };
    saveImportDecision(this.store, this.scope, decision);
    this.publish({ importState: 'running' });
    const candidates = Array.from(this.importCandidates().values());
    const totals: Record<string, number> = {};
    try {
      for (let start = 0; start < candidates.length; start += 40) {
        const slice = candidates.slice(start, start + 40);
        const items: QueueItem[] = slice.map((record) => {
          const stamped = record.type === 'note'
            ? { ...record, eventAt: record.eventAt || decision.at, payload: { text: String(record.payload.text ?? ''), modifiedAt: decision.at } }
            : { ...record, eventAt: record.eventAt || decision.at };
          return {
            record: stamped,
            idempotencyKey: idempotencyKeyFor(this.scope!, stamped, `import:${importId}`),
            // An imported note never replaces an account note: if one exists with other text, it becomes a conflict.
            ...(record.type === 'note' ? { baseRevision: -1 } : {}),
            origin: 'import', tries: 0, nextAttemptAt: 0,
          };
        });
        const results = await this.transport.push(items.map(toMutation), { origin: 'import', importId });
        const counts = this.applyResults(items, results, 'import');
        Object.entries(counts).forEach(([status, count]) => { totals[status] = (totals[status] ?? 0) + count; });
        if (results.length < items.length || counts.retry) throw new SyncTransportError('server', null);
      }
      saveImportDecision(this.store, this.scope, { ...decision, status: 'imported', counts: totals });
      this.publish({ importState: 'done', importCounts: totals, importOffer: null });
      await this.hydrate();
      this.publish({ importOffer: null });
    } catch (error) {
      if (error instanceof SyncTransportError && error.kind === 'auth') this.authBlocked = true;
      this.publish({ importState: 'failed' });
    }
  }
}
