// Conflict rules for synced Domain Knowledge progress. Pure and self-contained (no imports): the same
// source is transpiled into the `casemate-dk-progress-sync-v1` server function, so the browser and the
// server can never disagree about how two copies of a record combine.
//
// Rules (one per record type):
// - lesson     completion and first access are kept once recorded; the earliest completion wins.
// - reader     chapters read, legacy "Mark complete" evidence and migration markers only accumulate.
// - check      the newest submission supplies the latest score and answers; the best score is the maximum.
//              A stale or unsubmitted copy never clears a submission.
// - attempt    append-only and immutable, identified by its attempt ID; a second copy is a duplicate.
// - note       never merged silently: divergent text is a conflict the learner resolves (see mergeNote).
// - position   the most recent genuine learner action wins (event time, not load or hydration time).
// - flashcard  the most recently reviewed copy supplies state and schedule; review history accumulates.
// - match      attempts accumulate by time; first completion and first reveal are kept.
// - resume     the most recent meaningful context wins.
// - import     bookkeeping only: counts accumulate, the latest status wins.

export type SyncRecordType = 'lesson' | 'reader' | 'check' | 'attempt' | 'note' | 'position' | 'flashcard' | 'match' | 'resume' | 'import';

export const SYNC_RECORD_TYPES: SyncRecordType[] = ['lesson', 'reader', 'check', 'attempt', 'note', 'position', 'flashcard', 'match', 'resume', 'import'];

type Json = Record<string, unknown>;

const isObj = (value: unknown): value is Json => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const str = (value: unknown): string | undefined => (typeof value === 'string' && value ? value : undefined);
const num = (value: unknown): number | null => (typeof value === 'number' && Number.isFinite(value) ? value : null);
const time = (value: unknown): number => {
  const parsed = typeof value === 'string' ? Date.parse(value) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : 0;
};
const ints = (value: unknown): number[] => (Array.isArray(value) ? value.filter((item): item is number => Number.isInteger(item) && item >= 0) : []);
const unionInts = (left: unknown, right: unknown): number[] => Array.from(new Set([...ints(left), ...ints(right)])).sort((a, b) => a - b);
const unionStrings = (left: unknown, right: unknown): string[] => {
  const out: string[] = [];
  [left, right].forEach((list) => (Array.isArray(list) ? list : []).forEach((item) => {
    if (typeof item === 'string' && !out.includes(item)) out.push(item);
  }));
  return out;
};
const earliest = (left: unknown, right: unknown): string | undefined => {
  const a = str(left);
  const b = str(right);
  if (!a) return b;
  if (!b) return a;
  return time(b) < time(a) ? b : a;
};

/** Stable JSON (sorted keys) so equal records compare equal regardless of key order. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (isObj(value)) {
    return `{${Object.keys(value).filter((key) => value[key] !== undefined).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value === undefined ? null : value);
}

/** Whether the right-hand copy's event (`flag` set at `at`) is the one to keep: it exists and is earlier. */
const rightIsEarlier = (leftFlag: unknown, leftAt: unknown, rightFlag: unknown, rightAt: unknown) => {
  if (!str(rightFlag)) return false;
  if (!str(leftFlag)) return true;
  const r = time(rightAt);
  const l = time(leftAt);
  return r > 0 && (l === 0 || r < l);
};

export function mergeLesson(left: Json, right: Json): Json {
  const out: Json = { ...right, ...left };
  if (str(left.completedAt) || str(right.completedAt)) {
    const side = rightIsEarlier(left.completedAt, left.completedAt, right.completedAt, right.completedAt) ? right : left;
    out.completedAt = side.completedAt;
    if (side.source !== undefined) out.source = side.source; else delete out.source;
  }
  if (str(left.access) || str(right.access)) {
    const side = rightIsEarlier(left.access, left.accessAt, right.access, right.accessAt) ? right : left;
    out.access = side.access;
    if (side.accessAt !== undefined) out.accessAt = side.accessAt; else delete out.accessAt;
  }
  const persistenceKey = str(left.persistenceKey) ?? str(right.persistenceKey);
  if (persistenceKey) out.persistenceKey = persistenceKey;
  return out;
}

export function mergeReader(left: Json, right: Json): Json {
  return {
    completed: unionInts(left.completed, right.completed),
    legacyCompletedChapters: unionInts(left.legacyCompletedChapters, right.legacyCompletedChapters),
    migrations: unionStrings(left.migrations, right.migrations),
  };
}

const hasSubmissionFields = (check: Json) => num(check.latest) !== null || Boolean(str(check.submittedAt));

export function mergeCheck(left: Json, right: Json): Json {
  const leftAt = time(left.submittedAt);
  const rightAt = time(right.submittedAt);
  // The copy with the newer submission supplies the latest score and answers. A copy without any
  // submission never replaces one that has it.
  let newer: Json;
  if (!hasSubmissionFields(right)) newer = left;
  else if (!hasSubmissionFields(left)) newer = right;
  else newer = rightAt > leftAt ? right : left;
  const older = newer === left ? right : left;
  const bests = [num(left.best), num(right.best), num(left.latest), num(right.latest)].filter((value): value is number => value !== null);
  const out: Json = {};
  const latest = num(newer.latest) ?? num(older.latest);
  if (latest !== null) out.latest = latest;
  if (bests.length) out.best = Math.max(...bests);
  const submittedAt = time(newer.submittedAt) >= time(older.submittedAt) ? str(newer.submittedAt) ?? str(older.submittedAt) : str(older.submittedAt);
  if (submittedAt) out.submittedAt = submittedAt;
  const answers = isObj(newer.lastAnswers) ? newer.lastAnswers : isObj(older.lastAnswers) ? older.lastAnswers : undefined;
  const ids = Array.isArray(newer.lastQuestionIds) ? newer.lastQuestionIds : Array.isArray(older.lastQuestionIds) ? older.lastQuestionIds : undefined;
  if (answers) out.lastAnswers = answers;
  if (ids) out.lastQuestionIds = ids;
  return out;
}

/** Attempts are immutable: an existing copy always wins. */
export function mergeAttempt(left: Json, right: Json): Json {
  return Object.keys(left).length ? left : right;
}

export function mergePosition(left: Json, right: Json, leftAt: string, rightAt: string): Json {
  return time(rightAt) > time(leftAt) ? right : left;
}

const reviewKey = (event: Json) => `${str(event.at) ?? ''}|${str(event.rating) ?? ''}`;

export function mergeFlashcard(left: Json, right: Json): Json {
  const leftAt = time(left.lastReviewedAt);
  const rightAt = time(right.lastReviewedAt);
  const winner = rightAt > leftAt ? right : left;
  const history: Json[] = [];
  const seen = new Set<string>();
  [left.reviewHistory, right.reviewHistory].forEach((list) => (Array.isArray(list) ? list : []).forEach((event) => {
    if (!isObj(event)) return;
    const key = reviewKey(event);
    if (seen.has(key)) return;
    seen.add(key);
    history.push(event);
  }));
  history.sort((a, b) => time(a.at) - time(b.at));
  return { ...winner, reviewHistory: history };
}

const MATCH_ATTEMPTS_KEPT = 20;
const matchAttemptKey = (attempt: Json) => `${str(attempt.at) ?? ''}|${num(attempt.correct) ?? ''}|${num(attempt.total) ?? ''}|${attempt.revealed === true}`;

export function mergeMatch(left: Json, right: Json): Json {
  const attempts: Json[] = [];
  const seen = new Set<string>();
  [left.attempts, right.attempts].forEach((list) => (Array.isArray(list) ? list : []).forEach((attempt) => {
    if (!isObj(attempt)) return;
    const key = matchAttemptKey(attempt);
    if (seen.has(key)) return;
    seen.add(key);
    attempts.push(attempt);
  }));
  attempts.sort((a, b) => time(a.at) - time(b.at));
  const firstAt = (record: Json) => (Array.isArray(record.attempts) && isObj(record.attempts[0]) ? time(record.attempts[0].at) : Number.POSITIVE_INFINITY);
  const out: Json = { ...right, ...left, attempts: attempts.slice(-MATCH_ATTEMPTS_KEPT) };
  const completedAt = earliest(left.completedAt, right.completedAt);
  if (completedAt) out.completedAt = completedAt; else delete out.completedAt;
  const revealedAt = earliest(left.revealedAt, right.revealedAt);
  if (revealedAt) out.revealedAt = revealedAt; else delete out.revealedAt;
  const leftFirst = typeof left.firstCheckAllCorrect === 'boolean' ? left.firstCheckAllCorrect : undefined;
  const rightFirst = typeof right.firstCheckAllCorrect === 'boolean' ? right.firstCheckAllCorrect : undefined;
  const first = leftFirst === undefined ? rightFirst : rightFirst === undefined ? leftFirst : firstAt(right) < firstAt(left) ? rightFirst : leftFirst;
  if (first === undefined) delete out.firstCheckAllCorrect; else out.firstCheckAllCorrect = first;
  return out;
}

export function mergeImport(left: Json, right: Json): Json {
  const counts: Json = {};
  const leftCounts = isObj(left.counts) ? left.counts : {};
  const rightCounts = isObj(right.counts) ? right.counts : {};
  Array.from(new Set([...Object.keys(leftCounts), ...Object.keys(rightCounts)])).forEach((key) => {
    counts[key] = Math.max(num(leftCounts[key]) ?? 0, num(rightCounts[key]) ?? 0);
  });
  const newer = time(right.updatedAt) >= time(left.updatedAt) ? right : left;
  return { ...left, ...right, status: newer.status ?? left.status ?? right.status, updatedAt: str(newer.updatedAt), counts };
}

/**
 * Combines two copies of one record. `left` is the copy already held (server row or local cache),
 * `right` is the incoming copy. Notes are handled by `mergeNote` and never reach this function.
 */
export function mergePayload(type: SyncRecordType, left: Json, right: Json, leftAt = '', rightAt = ''): Json {
  switch (type) {
    case 'lesson': return mergeLesson(left, right);
    case 'reader': return mergeReader(left, right);
    case 'check': return mergeCheck(left, right);
    case 'attempt': return mergeAttempt(left, right);
    case 'position':
    case 'resume': return mergePosition(left, right, leftAt, rightAt);
    case 'flashcard': return mergeFlashcard(left, right);
    case 'match': return mergeMatch(left, right);
    case 'import': return mergeImport(left, right);
    default: return left;
  }
}

export interface NoteVersion {
  text: string;
  modifiedAt: string;
  revision: number;
}

export type NoteOutcome =
  | { status: 'unchanged'; note: NoteVersion }
  | { status: 'applied'; note: NoteVersion }
  | { status: 'conflict'; note: NoteVersion };

/**
 * A note edit applies only on top of the revision it was made from. When the stored note moved on in
 * the meantime (another device saved first) and the text differs, both versions are kept and the
 * learner chooses; nothing is overwritten or discarded silently.
 */
export function mergeNote(stored: NoteVersion | null, incoming: { text: string; modifiedAt: string; baseRevision: number }): NoteOutcome {
  if (!stored) return { status: 'applied', note: { text: incoming.text, modifiedAt: incoming.modifiedAt, revision: 1 } };
  if (stored.text === incoming.text) return { status: 'unchanged', note: stored };
  if (incoming.baseRevision === stored.revision) {
    return { status: 'applied', note: { text: incoming.text, modifiedAt: incoming.modifiedAt, revision: stored.revision + 1 } };
  }
  return { status: 'conflict', note: stored };
}

/** Whether a merged payload differs from what was held, so an unchanged write is acknowledged without a database update. */
export function payloadChanged(before: Json, after: Json): boolean {
  return canonicalJson(before) !== canonicalJson(after);
}

/** The status column: a compact, non-personal summary used for per-learner lookups. */
export function recordStatus(type: SyncRecordType, payload: Json): string | null {
  switch (type) {
    case 'lesson': return str(payload.completedAt) ? 'completed' : str(payload.access) ? 'started' : null;
    case 'check': return hasSubmissionFields(payload) ? 'submitted' : null;
    case 'attempt': return 'submitted';
    case 'flashcard': return str(payload.state) ?? null;
    case 'match': return str(payload.completedAt) ? 'completed' : Array.isArray(payload.attempts) && payload.attempts.length ? 'attempted' : null;
    case 'import': return str(payload.status) ?? null;
    default: return null;
  }
}
