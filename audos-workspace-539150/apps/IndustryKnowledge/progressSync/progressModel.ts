// Canonical learner-progress records and their mapping to the browser records Domain Knowledge already
// keeps. Nothing here changes how lessons, checks or practice read their own storage: records are
// extracted from those keys and merged back into them in the same formats.
//
// Record keys reuse the existing identities and never invent a new ID format:
//   lesson:<industryId>::<module title>::<lesson title>     casemate:domain-lesson-progress:v1[identity]
//   reader:<persistenceKey>                                 chapters read, legacy completion, migrations
//   check:<persistenceKey>#<chapter index | lesson>         Knowledge Check summary (latest, best, answers)
//   attempt:<persistenceKey>#<chapter index | lesson>@<at>  one submitted attempt (append-only)
//   note:<persistenceKey>#<note key>                        one reader note
//   position:<persistenceKey>                               reading position (view + scroll positions)
//   flashcard:<cardId>                                      casemate:flashcards:v1:<scope> card state
//   match:<activityId>                                      casemate:practice-review:match-sort:v1:<scope>
//   resume:last                                             last meaningful Domain Knowledge context
// The curriculum (industry id) is stored beside every record so the server can load one curriculum at a time.

import { LESSON_PROGRESS_KEY, parseAssessmentRecord, parseCheckRecord, quizStorageKey, readerStorageKey } from '../lessonFlowCore';
import type { AttemptSummary, CheckRecord } from '../lessonFlowCore';
import { MATCH_SORT_STORAGE_KEY } from '../../InteractiveLearning/matchSort/persistence';
import { storageKeyFor as flashcardStorageKeyFor } from '../../InteractiveLearning/flashcards/persistence';
import { canonicalJson, mergePayload } from './progressMerge';
import type { SyncRecordType } from './progressMerge';

export type Json = Record<string, unknown>;

export const SYNC_SCHEMA_VERSION = 1;
export const READER_PREFIX = 'casemate:domain-reader:';
export const QUIZ_PREFIX = 'casemate:domain-quiz:';
export const UNRESOLVED_CURRICULUM = 'unresolved';
export const PRACTICE_CURRICULUM = 'practice';
export const LESSON_CHECK_KEY = 'lesson';

export interface SyncRecord {
  type: SyncRecordType;
  key: string;
  curriculumId: string;
  payload: Json;
  /** Learner action time. Empty when the payload carries no time of its own; the engine stamps the observation time. */
  eventAt: string;
  /** Server revision (notes use it for conflict detection). 0 = never acknowledged. */
  revision?: number;
  /** e.g. `unmapped`: the record could not be tied to a curriculum lesson. Kept, never guessed. */
  flags?: string[];
}

export interface KeyValueStore {
  keys(): string[];
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function browserKeyValueStore(storage: Storage | null | undefined): KeyValueStore | null {
  if (!storage) return null;
  return {
    keys: () => {
      const out: string[] = [];
      try {
        for (let index = 0; index < storage.length; index += 1) {
          const key = storage.key(index);
          if (key !== null) out.push(key);
        }
      } catch {
        // Storage became unavailable mid-scan; return what was read.
      }
      return out;
    },
    getItem: (key) => {
      try {
        return storage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key, value) => storage.setItem(key, value),
    removeItem: (key) => {
      try {
        storage.removeItem(key);
      } catch {
        // Nothing to remove.
      }
    },
  };
}

export function memoryKeyValueStore(initial: Record<string, string> = {}): KeyValueStore & { dump(): Record<string, string> } {
  const data = new Map(Object.entries(initial));
  return {
    keys: () => Array.from(data.keys()),
    getItem: (key) => (data.has(key) ? data.get(key)! : null),
    setItem: (key, value) => { data.set(key, String(value)); },
    removeItem: (key) => { data.delete(key); },
    dump: () => Object.fromEntries(data),
  };
}

// Historical identifiers -------------------------------------------------------------------

/**
 * Explicit mapping from historical identifiers to the identifiers the curriculum uses now. Add an entry
 * when content is renamed (e.g. a lesson title or persistence key changes); records under the old ID
 * are then synced under the new one. IDs with no entry are used exactly as stored.
 */
export interface ProgressIdAliases {
  persistenceKeys: Record<string, string>;
  lessonIdentities: Record<string, string>;
  flashcardIds: Record<string, string>;
  activityIds: Record<string, string>;
}

export const PROGRESS_ID_ALIASES: ProgressIdAliases = {
  persistenceKeys: {},
  lessonIdentities: {},
  flashcardIds: {},
  activityIds: {},
};

export function canonicalId(map: Record<string, string>, id: string): string {
  let current = id;
  for (let hop = 0; hop < 8 && Object.prototype.hasOwnProperty.call(map, current) && map[current] !== current; hop += 1) current = map[current];
  return current;
}

export const curriculumOfIdentity = (identity: string) => {
  const industry = identity.split('::')[0]?.trim();
  return industry && identity.includes('::') ? industry : UNRESOLVED_CURRICULUM;
};

export const recordKeys = {
  lesson: (identity: string) => `lesson:${identity}`,
  reader: (persistenceKey: string) => `reader:${persistenceKey}`,
  check: (persistenceKey: string, chapter: string) => `check:${persistenceKey}#${chapter}`,
  attempt: (persistenceKey: string, chapter: string, at: string) => `attempt:${persistenceKey}#${chapter}@${at}`,
  note: (persistenceKey: string, noteKey: string) => `note:${persistenceKey}#${noteKey}`,
  position: (persistenceKey: string) => `position:${persistenceKey}`,
  flashcard: (cardId: string) => `flashcard:${cardId}`,
  match: (activityId: string) => `match:${activityId}`,
  resume: () => 'resume:last',
};

/** Splits `<type>:<rest>`; `rest` is returned verbatim. */
export function parseRecordKey(key: string): { type: string; rest: string } {
  const at = key.indexOf(':');
  return at < 0 ? { type: '', rest: key } : { type: key.slice(0, at), rest: key.slice(at + 1) };
}

/** `<persistenceKey>#<suffix>` → parts; persistence keys may themselves contain `#`, so split at the last one. */
function splitHash(rest: string): [string, string] {
  const at = rest.lastIndexOf('#');
  return at < 0 ? [rest, ''] : [rest.slice(0, at), rest.slice(at + 1)];
}

// Extraction -------------------------------------------------------------------------------

const isObj = (value: unknown): value is Json => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const readJson = (store: KeyValueStore, key: string): unknown => {
  try {
    const raw = store.getItem(key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
};
const ints = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is number => Number.isInteger(item) && item >= 0) : []);
const latestIso = (...values: unknown[]) => values.filter((value): value is string => typeof value === 'string' && !Number.isNaN(Date.parse(value)))
  .sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? '';

export interface ExtractOptions {
  /** Signed-in learner scope (`learnerScopeFor(email)`); practice records are read only for it. */
  scope: string | null;
  aliases?: ProgressIdAliases;
  /** Read only Domain Knowledge lesson records (the device archive holds no practice history). */
  lessonsOnly?: boolean;
}

export const flashcardKeyFor = (scope: string) => flashcardStorageKeyFor(scope);
export const matchSortKeyFor = (scope: string) => `${MATCH_SORT_STORAGE_KEY}:${scope}`;

/** True for the device-wide Domain Knowledge keys whose owner the sync layer tracks. */
export const isLessonWorkingKey = (key: string) => key === LESSON_PROGRESS_KEY || key.startsWith(READER_PREFIX) || key.startsWith(QUIZ_PREFIX);

function checkPayload(check: CheckRecord): Json {
  const out: Json = {};
  if (check.latest !== null) out.latest = check.latest;
  if (check.best !== null) out.best = check.best;
  if (check.submittedAt) out.submittedAt = check.submittedAt;
  if (check.lastAnswers) out.lastAnswers = check.lastAnswers;
  if (check.lastQuestionIds) out.lastQuestionIds = check.lastQuestionIds;
  return out;
}

/** Reads every progress record from the given keys into canonical records (drafts and transient UI state are skipped). */
export function extractRecords(store: KeyValueStore, options: ExtractOptions): Map<string, SyncRecord> {
  const aliases = options.aliases ?? PROGRESS_ID_ALIASES;
  const out = new Map<string, SyncRecord>();
  const put = (record: SyncRecord) => {
    const existing = out.get(record.key);
    if (!existing) {
      out.set(record.key, record);
      return;
    }
    // Two local keys can map to one canonical record (an alias and its target): combine, never drop.
    out.set(record.key, { ...existing, payload: mergePayload(record.type, existing.payload, record.payload, existing.eventAt, record.eventAt), eventAt: latestIso(existing.eventAt, record.eventAt) });
  };

  const lessonStore = readJson(store, LESSON_PROGRESS_KEY);
  const curriculumByKey = new Map<string, string>();
  if (isObj(lessonStore)) {
    Object.entries(lessonStore).forEach(([rawIdentity, entry]) => {
      if (!isObj(entry)) return;
      const identity = canonicalId(aliases.lessonIdentities, rawIdentity);
      const curriculumId = curriculumOfIdentity(identity);
      const persistenceKey = typeof entry.persistenceKey === 'string' ? canonicalId(aliases.persistenceKeys, entry.persistenceKey) : undefined;
      if (persistenceKey && curriculumId !== UNRESOLVED_CURRICULUM) curriculumByKey.set(persistenceKey, curriculumId);
      const payload: Json = {};
      (['completedAt', 'source', 'access', 'accessAt'] as const).forEach((field) => {
        if (typeof entry[field] === 'string') payload[field] = entry[field];
      });
      if (persistenceKey) payload.persistenceKey = persistenceKey;
      put({
        type: 'lesson', key: recordKeys.lesson(identity), curriculumId, payload, eventAt: latestIso(entry.completedAt, entry.accessAt),
        ...(curriculumId === UNRESOLVED_CURRICULUM ? { flags: ['unmapped'] } : {}),
      });
    });
  }

  const located = (persistenceKey: string) => {
    const curriculumId = curriculumByKey.get(persistenceKey) ?? UNRESOLVED_CURRICULUM;
    return { curriculumId, ...(curriculumId === UNRESOLVED_CURRICULUM ? { flags: ['unmapped'] } : {}) };
  };

  store.keys().forEach((storageKey) => {
    if (storageKey.startsWith(READER_PREFIX)) {
      const persistenceKey = canonicalId(aliases.persistenceKeys, storageKey.slice(READER_PREFIX.length));
      const reader = readJson(store, storageKey);
      if (!isObj(reader)) return;
      const where = located(persistenceKey);
      put({
        type: 'reader', key: recordKeys.reader(persistenceKey), ...where, eventAt: '',
        payload: {
          completed: ints(reader.completed),
          legacyCompletedChapters: ints(reader.legacyCompletedChapters),
          migrations: Array.isArray(reader.migrations) ? reader.migrations.filter((item): item is string => typeof item === 'string') : [],
        },
      });
      if (isObj(reader.notes)) {
        Object.entries(reader.notes).forEach(([noteKey, text]) => {
          if (typeof text !== 'string') return;
          put({ type: 'note', key: recordKeys.note(persistenceKey, noteKey), ...where, eventAt: '', payload: { text } });
        });
      }
      const view = isObj(reader.view) ? reader.view : null;
      const positions = isObj(reader.positions) ? reader.positions : null;
      if (view || (positions && Object.keys(positions).length)) {
        put({ type: 'position', key: recordKeys.position(persistenceKey), ...where, eventAt: '', payload: { ...(view ? { view } : {}), ...(positions ? { positions } : {}) } });
      }
      return;
    }
    if (storageKey.startsWith(QUIZ_PREFIX)) {
      const persistenceKey = canonicalId(aliases.persistenceKeys, storageKey.slice(QUIZ_PREFIX.length));
      const raw = readJson(store, storageKey);
      if (!isObj(raw)) return;
      const record = parseAssessmentRecord(raw);
      const where = located(persistenceKey);
      const checks: Array<[string, CheckRecord]> = [[LESSON_CHECK_KEY, record], ...Object.entries(record.chapters)];
      checks.forEach(([chapter, check]) => {
        const payload = checkPayload(check);
        if (Object.keys(payload).length) {
          put({ type: 'check', key: recordKeys.check(persistenceKey, chapter), ...where, eventAt: check.submittedAt ?? '', payload });
        }
        check.attempts.forEach((attempt: AttemptSummary) => {
          if (typeof attempt.at !== 'string' || !attempt.at) return;
          put({
            type: 'attempt', key: recordKeys.attempt(persistenceKey, chapter, attempt.at), ...where, eventAt: attempt.at,
            payload: { at: attempt.at, correct: attempt.correct, total: attempt.total, accuracy: attempt.accuracy },
          });
        });
      });
    }
  });

  if (options.scope && !options.lessonsOnly) {
    const snapshot = readJson(store, flashcardKeyFor(options.scope));
    if (isObj(snapshot) && isObj(snapshot.cards)) {
      Object.entries(snapshot.cards).forEach(([rawId, card]) => {
        if (!isObj(card)) return;
        const cardId = canonicalId(aliases.flashcardIds, rawId);
        put({ type: 'flashcard', key: recordKeys.flashcard(cardId), curriculumId: PRACTICE_CURRICULUM, eventAt: latestIso(card.lastReviewedAt), payload: { ...card, cardId } });
      });
    }
    const matches = readJson(store, matchSortKeyFor(options.scope));
    if (isObj(matches)) {
      Object.entries(matches).forEach(([rawId, activity]) => {
        if (!isObj(activity)) return;
        const activityId = canonicalId(aliases.activityIds, rawId);
        const attempts = Array.isArray(activity.attempts) ? activity.attempts : [];
        const lastAt = attempts.length && isObj(attempts[attempts.length - 1]) ? (attempts[attempts.length - 1] as Json).at : undefined;
        const curriculumId = activityId.includes('::') ? curriculumOfIdentity(activityId.replace(/^[^:]*:(?!:)/, '')) : PRACTICE_CURRICULUM;
        put({ type: 'match', key: recordKeys.match(activityId), curriculumId: curriculumId === UNRESOLVED_CURRICULUM ? PRACTICE_CURRICULUM : curriculumId, eventAt: latestIso(lastAt, activity.completedAt), payload: { ...activity, activityId } });
      });
    }
  }
  return out;
}

export const payloadFingerprint = (record: Pick<SyncRecord, 'type' | 'payload'>) => canonicalJson([record.type, record.payload]);

// Application ------------------------------------------------------------------------------

export interface ApplyOptions {
  scope: string | null;
  /** A cloud note replaces the local one only when the learner has no unsynced edit to it. */
  canReplaceNote?: (recordKey: string, localText: string | undefined) => boolean;
  /** A cloud position replaces the local one only when it is a newer learner action. */
  isNewerPosition?: (recordKey: string, eventAt: string) => boolean;
}

const MAX_QUIZ_ATTEMPTS = 50;

function writeJson(store: KeyValueStore, key: string, before: string | null, value: unknown): boolean {
  const next = JSON.stringify(value);
  if (next === before) return false;
  try {
    store.setItem(key, next);
    return true;
  } catch {
    return false;
  }
}

/**
 * Merges records into the browser keys Domain Knowledge reads, in their existing formats. Existing
 * fields the sync does not own (drafts, archives, unknown fields) are preserved. Returns the storage
 * keys that changed.
 */
export function applyRecords(store: KeyValueStore, records: SyncRecord[], options: ApplyOptions): string[] {
  const changed = new Set<string>();
  const pending = new Map<string, { before: string | null; value: Json }>();
  const load = (key: string): Json => {
    const cached = pending.get(key);
    if (cached) return cached.value;
    const before = store.getItem(key);
    let value: Json = {};
    try {
      const parsed = before === null ? null : JSON.parse(before);
      value = isObj(parsed) ? parsed : {};
    } catch {
      value = {};
    }
    pending.set(key, { before, value });
    return value;
  };
  const stage = (key: string, value: Json) => {
    const entry = pending.get(key);
    pending.set(key, { before: entry ? entry.before : store.getItem(key), value });
  };

  records.forEach((record) => {
    const { type, rest } = parseRecordKey(record.key);
    const payload = isObj(record.payload) ? record.payload : {};
    if (type === 'lesson') {
      const lessons = load(LESSON_PROGRESS_KEY);
      const current = isObj(lessons[rest]) ? lessons[rest] as Json : {};
      stage(LESSON_PROGRESS_KEY, { ...lessons, [rest]: mergePayload('lesson', current, payload) });
      return;
    }
    if (type === 'reader') {
      const key = readerStorageKey(rest);
      const reader = load(key);
      const merged = mergePayload('reader', { completed: reader.completed, legacyCompletedChapters: reader.legacyCompletedChapters, migrations: reader.migrations }, payload);
      stage(key, { ...reader, ...merged });
      return;
    }
    if (type === 'note') {
      const [persistenceKey, noteKey] = splitHash(rest);
      const key = readerStorageKey(persistenceKey);
      const reader = load(key);
      const notes = isObj(reader.notes) ? reader.notes as Record<string, unknown> : {};
      const local = typeof notes[noteKey] === 'string' ? notes[noteKey] as string : undefined;
      const text = typeof payload.text === 'string' ? payload.text : '';
      if (local === text || (options.canReplaceNote && !options.canReplaceNote(record.key, local))) return;
      stage(key, { ...reader, notes: { ...notes, [noteKey]: text } });
      return;
    }
    if (type === 'position') {
      if (options.isNewerPosition && !options.isNewerPosition(record.key, record.eventAt)) return;
      const key = readerStorageKey(rest);
      const reader = load(key);
      const next: Json = { ...reader };
      if (isObj(payload.view)) {
        // A Knowledge Check left open on another device never reopens here; the chapter opens instead.
        const view = payload.view as Json;
        next.view = { ...view, stage: view.stage === 'takeaways' ? 'takeaways' : 'learning' };
      }
      if (isObj(payload.positions)) next.positions = { ...(isObj(reader.positions) ? reader.positions : {}), ...payload.positions };
      stage(key, next);
      return;
    }
    if (type === 'check' || type === 'attempt') {
      const [persistenceKeyAndChapter] = type === 'attempt' ? [rest.slice(0, rest.lastIndexOf('@'))] : [rest];
      const [persistenceKey, chapter] = splitHash(persistenceKeyAndChapter);
      if (!persistenceKey || !chapter) return;
      const key = quizStorageKey(persistenceKey);
      const raw = load(key);
      const quiz = parseAssessmentRecord(raw);
      const isLesson = chapter === LESSON_CHECK_KEY;
      if (!isLesson && !/^\d+$/.test(chapter)) return;
      const current: CheckRecord = isLesson ? quiz : quiz.chapters[chapter] ?? parseCheckRecord(null);
      let next: CheckRecord;
      if (type === 'check') {
        const merged = mergePayload('check', checkPayload(current), payload);
        next = {
          ...current,
          latest: typeof merged.latest === 'number' ? merged.latest : current.latest,
          best: typeof merged.best === 'number' ? merged.best : current.best,
          ...(typeof merged.submittedAt === 'string' ? { submittedAt: merged.submittedAt } : {}),
          ...(isObj(merged.lastAnswers) ? { lastAnswers: merged.lastAnswers as Record<string, string> } : {}),
          ...(Array.isArray(merged.lastQuestionIds) ? { lastQuestionIds: merged.lastQuestionIds as string[] } : {}),
        };
      } else {
        const attempt = payload as unknown as AttemptSummary;
        if (typeof attempt.at !== 'string' || typeof attempt.accuracy !== 'number') return;
        if (current.attempts.some((item) => item.at === attempt.at)) return;
        const attempts = [...current.attempts, { at: attempt.at, correct: attempt.correct, total: attempt.total, accuracy: attempt.accuracy }]
          .sort((a, b) => Date.parse(a.at) - Date.parse(b.at)).slice(-MAX_QUIZ_ATTEMPTS);
        next = { ...current, attempts };
      }
      const updated = isLesson ? { ...raw, ...stripUndefined(next), chapters: { ...(isObj(raw.chapters) ? raw.chapters : {}) } } : { ...raw, chapters: { ...(isObj(raw.chapters) ? raw.chapters : {}), [chapter]: stripUndefined(next) } };
      stage(key, updated);
      return;
    }
    if ((type === 'flashcard' || type === 'match') && options.scope) {
      if (type === 'flashcard') {
        const key = flashcardKeyFor(options.scope);
        const snapshot = load(key);
        const cards = isObj(snapshot.cards) ? snapshot.cards as Record<string, Json> : {};
        const current = isObj(cards[rest]) ? cards[rest] : {};
        const merged = mergePayload('flashcard', current, payload);
        const updatedAt = latestIso(snapshot.updatedAt, merged.lastReviewedAt) || null;
        stage(key, { schemaVersion: 1, ...snapshot, cards: { ...cards, [rest]: { ...merged, cardId: rest } }, updatedAt });
      } else {
        const key = matchSortKeyFor(options.scope);
        const progress = load(key);
        const current = isObj(progress[rest]) ? progress[rest] as Json : {};
        stage(key, { ...progress, [rest]: { ...mergePayload('match', current, payload), activityId: rest } });
      }
    }
  });

  pending.forEach(({ before, value }, key) => {
    if (writeJson(store, key, before, value)) changed.add(key);
  });
  return Array.from(changed);
}

function stripUndefined<T extends object>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)) as T;
}
