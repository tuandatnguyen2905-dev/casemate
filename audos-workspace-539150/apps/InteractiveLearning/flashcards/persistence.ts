// Feature-scoped persistence for flashcard review state.
//
// MVP: one JSON document in localStorage under FLASHCARD_STORAGE_KEY (optionally suffixed with a
// learner key), falling back to memory when storage is missing, blocked or full. The adapter never
// reads or writes any other key, so existing Domain Knowledge progress (`casemate:domain-*`) and
// learner records are untouched.
//
// Integration point: to move review state into the learner-state system, implement
// FlashcardPersistenceAdapter against it and pass the adapter to <SmartFlashcards adapter={...} />.
// The snapshot shape (FlashcardStoreSnapshot) is the contract; parseSnapshot validates any input.

import type { CardLearningState, CardReviewState, FlashcardStoreSnapshot, RecallRating, ReviewEvent } from './models';
import { RECALL_RATINGS } from './models';

export const FLASHCARD_STORAGE_NAMESPACE = 'casemate:flashcards';
export const FLASHCARD_SCHEMA_VERSION = 1 as const;
export const FLASHCARD_STORAGE_KEY = `${FLASHCARD_STORAGE_NAMESPACE}:v${FLASHCARD_SCHEMA_VERSION}`;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface FlashcardPersistenceAdapter {
  readonly kind: string;
  load(): FlashcardStoreSnapshot;
  save(snapshot: FlashcardStoreSnapshot): void;
  clear(): void;
}

export function emptySnapshot(): FlashcardStoreSnapshot {
  return { schemaVersion: FLASHCARD_SCHEMA_VERSION, cards: {}, updatedAt: null };
}

export function storageKeyFor(learnerKey?: string | null): string {
  const scope = String(learnerKey ?? '').trim();
  return scope ? `${FLASHCARD_STORAGE_KEY}:${encodeURIComponent(scope)}` : FLASHCARD_STORAGE_KEY;
}

const STATES: CardLearningState[] = ['unseen', 'learning', 'mastered'];
const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const isIsoOrNull = (value: unknown): value is string | null => value === null || (typeof value === 'string' && !Number.isNaN(Date.parse(value)));

function parseEvent(raw: unknown): ReviewEvent | null {
  if (!isRecord(raw)) return null;
  const { at, rating, previousState, nextState, intervalDays, dueAt } = raw;
  if (typeof at !== 'string' || Number.isNaN(Date.parse(at))) return null;
  if (!RECALL_RATINGS.includes(rating as RecallRating)) return null;
  if (!STATES.includes(previousState as CardLearningState) || !STATES.includes(nextState as CardLearningState)) return null;
  if (!isFiniteNumber(intervalDays) || typeof dueAt !== 'string') return null;
  return { at, rating: rating as RecallRating, previousState: previousState as CardLearningState, nextState: nextState as CardLearningState, intervalDays, dueAt };
}

export function parseCardState(cardId: string, raw: unknown): CardReviewState | null {
  if (!isRecord(raw) || !isRecord(raw.schedule)) return null;
  const { deckId, state, confidence, lastReviewedAt, reviewHistory } = raw;
  const schedule = raw.schedule;
  if (raw.cardId !== cardId || typeof deckId !== 'string' || !deckId) return null;
  if (!STATES.includes(state as CardLearningState)) return null;
  if (!isIsoOrNull(schedule.dueAt) || !isIsoOrNull(lastReviewedAt)) return null;
  if (![schedule.intervalDays, schedule.ease, schedule.lapses, schedule.repetitions].every(isFiniteNumber)) return null;
  return {
    cardId,
    deckId,
    state: state as CardLearningState,
    confidence: isFiniteNumber(confidence) ? Math.min(1, Math.max(0, confidence)) : 0,
    schedule: {
      dueAt: schedule.dueAt as string | null,
      intervalDays: schedule.intervalDays as number,
      ease: schedule.ease as number,
      lapses: schedule.lapses as number,
      repetitions: schedule.repetitions as number,
    },
    lastReviewedAt: lastReviewedAt as string | null,
    reviewHistory: Array.isArray(reviewHistory) ? reviewHistory.map(parseEvent).filter((event): event is ReviewEvent => event !== null) : [],
  };
}

/** Accepts anything; returns a valid snapshot, dropping malformed card entries. Never throws. */
export function parseSnapshot(raw: unknown): FlashcardStoreSnapshot {
  if (!isRecord(raw) || raw.schemaVersion !== FLASHCARD_SCHEMA_VERSION || !isRecord(raw.cards)) return emptySnapshot();
  const cards: Record<string, CardReviewState> = {};
  Object.entries(raw.cards).forEach(([cardId, value]) => {
    const parsed = parseCardState(cardId, value);
    if (parsed) cards[cardId] = parsed;
  });
  return { schemaVersion: FLASHCARD_SCHEMA_VERSION, cards, updatedAt: isIsoOrNull(raw.updatedAt) ? raw.updatedAt : null };
}

const clone = (snapshot: FlashcardStoreSnapshot): FlashcardStoreSnapshot => JSON.parse(JSON.stringify(snapshot));

export function createMemoryAdapter(initial?: FlashcardStoreSnapshot): FlashcardPersistenceAdapter {
  let stored = initial ? parseSnapshot(clone(initial)) : emptySnapshot();
  return {
    kind: 'memory',
    load: () => clone(stored),
    save: (snapshot) => {
      stored = parseSnapshot(clone(snapshot));
    },
    clear: () => {
      stored = emptySnapshot();
    },
  };
}

function browserStorage(): StorageLike | null {
  try {
    const candidate = (globalThis as { localStorage?: StorageLike }).localStorage;
    return candidate ?? null;
  } catch {
    return null;
  }
}

function usable(storage: StorageLike | null): storage is StorageLike {
  if (!storage) return false;
  const probe = `${FLASHCARD_STORAGE_NAMESPACE}:probe`;
  try {
    storage.setItem(probe, '1');
    storage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export interface LocalStorageAdapterOptions {
  storage?: StorageLike | null;
  learnerKey?: string | null;
}

/**
 * localStorage-backed adapter. If storage is unavailable at creation, or a later write fails
 * (quota, private mode), it keeps working from memory for the rest of the session.
 */
export function createLocalStorageAdapter(options: LocalStorageAdapterOptions = {}): FlashcardPersistenceAdapter {
  const storage = options.storage === undefined ? browserStorage() : options.storage;
  const key = storageKeyFor(options.learnerKey);
  const memory = createMemoryAdapter();
  let durable = usable(storage);

  const readDurable = (): FlashcardStoreSnapshot => {
    try {
      const raw = (storage as StorageLike).getItem(key);
      return raw ? parseSnapshot(JSON.parse(raw)) : emptySnapshot();
    } catch {
      return emptySnapshot();
    }
  };

  return {
    get kind() {
      return durable ? 'local-storage' : 'memory';
    },
    load: () => (durable ? readDurable() : memory.load()),
    save: (snapshot) => {
      const valid = parseSnapshot(snapshot);
      memory.save(valid);
      if (!durable) return;
      try {
        (storage as StorageLike).setItem(key, JSON.stringify(valid));
      } catch {
        durable = false;
      }
    },
    clear: () => {
      memory.clear();
      if (!durable) return;
      try {
        (storage as StorageLike).removeItem(key);
      } catch {
        durable = false;
      }
    },
  };
}
