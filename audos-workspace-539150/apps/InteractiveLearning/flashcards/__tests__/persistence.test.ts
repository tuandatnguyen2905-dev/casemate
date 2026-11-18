import type { FlashcardStoreSnapshot } from '../models';
import {
  FLASHCARD_STORAGE_KEY,
  createLocalStorageAdapter,
  createMemoryAdapter,
  emptySnapshot,
  parseSnapshot,
  storageKeyFor,
} from '../persistence';
import type { StorageLike } from '../persistence';
import { applyRating, initialReviewState } from '../scheduler';
import { assert, assertEqual, createSuite } from './harness';

const suite = createSuite('persistence adapter');
const T0 = Date.parse('2026-11-07T09:00:00.000Z');

function fakeStorage(seed: Record<string, string> = {}, options: { failWrites?: boolean } = {}) {
  const data = new Map(Object.entries(seed));
  const storage: StorageLike & { data: Map<string, string>; failWrites: boolean } = {
    data,
    failWrites: Boolean(options.failWrites),
    getItem: (key) => (data.has(key) ? (data.get(key) as string) : null),
    setItem(key, value) {
      if (this.failWrites) throw new Error('QuotaExceededError');
      data.set(key, value);
    },
    removeItem: (key) => {
      data.delete(key);
    },
  };
  return storage;
}

function snapshotWithOneCard(): FlashcardStoreSnapshot {
  const state = applyRating(initialReviewState('cbf-credit-creation', 'commercial-banking-fundamentals'), 'good', T0);
  return { schemaVersion: 1, cards: { [state.cardId]: state }, updatedAt: new Date(T0).toISOString() };
}

suite.test('memory adapter round-trips and returns copies', () => {
  const adapter = createMemoryAdapter();
  assertEqual(adapter.load(), emptySnapshot(), 'starts empty');
  const snapshot = snapshotWithOneCard();
  adapter.save(snapshot);
  const loaded = adapter.load();
  assertEqual(loaded, snapshot, 'round trip');
  loaded.cards['cbf-credit-creation'].state = 'mastered';
  assertEqual(adapter.load().cards['cbf-credit-creation'].state, 'learning', 'callers cannot mutate stored state');
  adapter.clear();
  assertEqual(adapter.load(), emptySnapshot(), 'clear');
});

suite.test('localStorage adapter writes only its own namespaced key', () => {
  const existing = {
    'casemate:domain-lesson-progress:v1': '{"banking::Module::1.1":{"completedAt":"2026-10-01"}}',
    'casemate:domain-quiz:cb': '{"latest":80,"best":90}',
  };
  const storage = fakeStorage(existing);
  const adapter = createLocalStorageAdapter({ storage });
  assertEqual(adapter.kind, 'local-storage', 'durable adapter');
  adapter.save(snapshotWithOneCard());
  assertEqual(FLASHCARD_STORAGE_KEY, 'casemate:flashcards:v1', 'feature namespace key');
  assertEqual([...storage.data.keys()].sort(), [...Object.keys(existing), FLASHCARD_STORAGE_KEY].sort(), 'no other keys written; probe key removed');
  Object.entries(existing).forEach(([key, value]) => assertEqual(storage.data.get(key), value, `${key} untouched`));
  assertEqual(createLocalStorageAdapter({ storage }).load(), snapshotWithOneCard(), 'a new adapter reads the saved snapshot');
  adapter.clear();
  assert(!storage.data.has(FLASHCARD_STORAGE_KEY), 'clear removes only the feature key');
  assertEqual(storage.data.size, 2, 'existing learner records survive clear');
});

suite.test('learner scoping keeps learners apart', () => {
  const storage = fakeStorage();
  const a = createLocalStorageAdapter({ storage, learnerKey: 'learner@example.com' });
  const b = createLocalStorageAdapter({ storage, learnerKey: 'other@example.com' });
  a.save(snapshotWithOneCard());
  assertEqual(b.load(), emptySnapshot(), 'other learner sees nothing');
  assertEqual(storageKeyFor('learner@example.com'), 'casemate:flashcards:v1:learner%40example.com', 'scoped key');
  assertEqual(storageKeyFor('  '), FLASHCARD_STORAGE_KEY, 'blank scope uses the base key');
});

suite.test('falls back to memory when storage is unavailable or blocked', () => {
  const missing = createLocalStorageAdapter({ storage: null });
  assertEqual(missing.kind, 'memory', 'no storage');
  missing.save(snapshotWithOneCard());
  assertEqual(missing.load(), snapshotWithOneCard(), 'memory fallback still works');

  const blocked = createLocalStorageAdapter({ storage: fakeStorage({}, { failWrites: true }) });
  assertEqual(blocked.kind, 'memory', 'blocked storage detected by the probe');
  blocked.save(snapshotWithOneCard());
  assertEqual(blocked.load(), snapshotWithOneCard(), 'blocked storage falls back to memory');
});

suite.test('a write failure mid-session keeps progress for the rest of the session', () => {
  const storage = fakeStorage();
  const adapter = createLocalStorageAdapter({ storage });
  assertEqual(adapter.kind, 'local-storage', 'starts durable');
  storage.failWrites = true;
  adapter.save(snapshotWithOneCard());
  assertEqual(adapter.kind, 'memory', 'switches to memory');
  assertEqual(adapter.load(), snapshotWithOneCard(), 'progress kept in memory');
});

suite.test('corrupted or foreign data never throws and never leaks invalid entries', () => {
  const corrupted = createLocalStorageAdapter({ storage: fakeStorage({ [FLASHCARD_STORAGE_KEY]: '{not json' }) });
  assertEqual(corrupted.load(), emptySnapshot(), 'invalid JSON → empty');
  assertEqual(parseSnapshot({ schemaVersion: 2, cards: {} }), emptySnapshot(), 'unknown schema → empty');
  assertEqual(parseSnapshot(null), emptySnapshot(), 'null → empty');
  const good = snapshotWithOneCard().cards['cbf-credit-creation'];
  const mixed = parseSnapshot({
    schemaVersion: 1,
    updatedAt: 'yesterday',
    cards: {
      'cbf-credit-creation': good,
      'wrong-id': { ...good },
      'bad-state': { ...good, cardId: 'bad-state', state: 'expert' },
      'bad-schedule': { ...good, cardId: 'bad-schedule', schedule: { ...good.schedule, ease: 'high' } },
    },
  });
  assertEqual(Object.keys(mixed.cards), ['cbf-credit-creation'], 'only the valid entry survives');
  assertEqual(mixed.updatedAt, null, 'invalid timestamp dropped');
});

export const completed = suite.run();
