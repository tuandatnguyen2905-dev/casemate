// Sprint 03G learner-progress sync: persistence, cross-device, isolation, migration, offline and
// learning-engine regression cases, on two simulated browsers sharing one account backend. Runs without a DOM:
//   npx tsx apps/IndustryKnowledge/__tests__/progressSync.test.ts
// The backend is an in-file reference server that applies the same rules as the sync server function
// (progressMerge). Set globalThis.__DK_SYNC_SERVER__ to a factory to run the cases against another backend.
import { chapterPlanFromStatuses, CHAPTER_FLOW_MIGRATION_ID, FLOW_MIGRATION_ID, LESSON_PROGRESS_KEY, quizStorageKey, readerStorageKey, storedChapterProgress } from '../lessonFlowCore';
import type { ChapterLike } from '../lessonFlowCore';
import { mergeNote, mergePayload, payloadChanged } from '../progressSync/progressMerge';
import type { SyncRecordType } from '../progressSync/progressMerge';
import { canonicalId, extractRecords, flashcardKeyFor, matchSortKeyFor, memoryKeyValueStore, recordKeys } from '../progressSync/progressModel';
import type { KeyValueStore, SyncRecord } from '../progressSync/progressModel';
import { DEVICE_ARCHIVE_PREFIX, OWNER_KEY, readOwner } from '../progressSync/progressOwnership';
import { loadQueue } from '../progressSync/progressQueue';
import { ProgressSyncEngine, reconcileWorkingCopy } from '../progressSync/progressSyncEngine';
import { SyncTransportError } from '../progressSync/progressTransport';
import type { ProgressTransport, PushMutation, PushResult } from '../progressSync/progressTransport';
import { learnerScopeFor } from '../../InteractiveLearning/practiceReview/learnerScope';

type Case = { id: string; name: string; run: () => Promise<void> | void };

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const same = (left: unknown, right: unknown, message: string) => assert(JSON.stringify(left) === JSON.stringify(right), `${message}: expected ${JSON.stringify(right)}, got ${JSON.stringify(left)}`);

// Backend ---------------------------------------------------------------------------------

export interface TestServer {
  transportFor(email: string | null, options?: { expired?: boolean }): ProgressTransport;
  recordsOf(email: string): SyncRecord[];
  calls: number;
  offline: boolean;
  failNextPushes: number;
}

function referenceServer(): TestServer {
  const rows = new Map<string, Map<string, SyncRecord & { idempotencyKey?: string }>>();
  const server: TestServer = {
    calls: 0,
    offline: false,
    failNextPushes: 0,
    recordsOf: (email) => Array.from(rows.get(email)?.values() ?? []).map(({ idempotencyKey: _ik, ...record }) => record),
    transportFor(email, options = {}) {
      const guard = () => {
        server.calls += 1;
        if (server.offline) throw new SyncTransportError('offline', null);
        if (!email || options.expired) throw new SyncTransportError('auth', 401);
      };
      const mine = () => {
        if (!rows.has(email!)) rows.set(email!, new Map());
        return rows.get(email!)!;
      };
      return {
        async summary() {
          guard();
          return { records: server.recordsOf(email!), serverTime: new Date().toISOString() };
        },
        async push(mutations: PushMutation[]) {
          guard();
          if (server.failNextPushes > 0) {
            server.failNextPushes -= 1;
            throw new SyncTransportError('server', 503);
          }
          const table = mine();
          return mutations.map((mutation): PushResult => {
            const row = table.get(mutation.key);
            if (row && row.idempotencyKey === mutation.idempotencyKey) return { key: mutation.key, status: 'duplicate', revision: row.revision, record: row };
            if (mutation.type === 'attempt') {
              if (row) return { key: mutation.key, status: 'duplicate', revision: row.revision };
              table.set(mutation.key, { ...mutation, revision: 1 });
              return { key: mutation.key, status: 'applied', revision: 1 };
            }
            if (mutation.type === 'note') {
              const stored = row ? { text: String(row.payload.text), modifiedAt: String(row.payload.modifiedAt), revision: row.revision ?? 1 } : null;
              const outcome = mergeNote(stored, { text: String(mutation.payload.text), modifiedAt: String(mutation.payload.modifiedAt), baseRevision: mutation.baseRevision ?? 0 });
              if (outcome.status === 'conflict') return { key: mutation.key, status: 'conflict', revision: row!.revision, record: row! };
              if (outcome.status === 'unchanged') return { key: mutation.key, status: 'unchanged', revision: outcome.note.revision };
              table.set(mutation.key, { ...mutation, payload: { text: outcome.note.text, modifiedAt: outcome.note.modifiedAt }, revision: outcome.note.revision });
              return { key: mutation.key, status: 'applied', revision: outcome.note.revision };
            }
            const before = row?.payload ?? {};
            const merged = mergePayload(mutation.type as SyncRecordType, before, mutation.payload, row?.eventAt ?? '', mutation.eventAt);
            if (row && !payloadChanged(before, merged)) return { key: mutation.key, status: 'unchanged', revision: row.revision, ...(payloadChanged(mutation.payload, merged) ? { record: row } : {}) };
            const revision = (row?.revision ?? 0) + 1;
            const lww = mutation.type === 'position' || mutation.type === 'resume';
            const eventAt = lww ? (merged === mutation.payload ? mutation.eventAt : row!.eventAt) : [row?.eventAt ?? '', mutation.eventAt].sort().pop()!;
            const record = { type: mutation.type, key: mutation.key, curriculumId: row?.curriculumId ?? mutation.curriculumId, payload: merged, eventAt, revision, flags: mutation.flags, idempotencyKey: mutation.idempotencyKey };
            table.set(mutation.key, record);
            const differs = payloadChanged(mutation.payload, merged);
            return { key: mutation.key, status: differs ? 'merged' : 'applied', revision, ...(differs ? { record } : {}) };
          });
        },
      };
    },
  };
  return server;
}

const makeServer: () => TestServer = (globalThis as { __DK_SYNC_SERVER__?: () => TestServer }).__DK_SYNC_SERVER__ ?? referenceServer;

// Browsers --------------------------------------------------------------------------------

let clock = Date.parse('2026-11-15T09:00:00Z');
const tick = (ms = 60_000) => { clock += ms; return new Date(clock).toISOString(); };
const now = () => clock;

const EMAIL_A = 'learner-a@example.test';
const EMAIL_B = 'learner-b@example.test';
const PK = 'fmcg-beauty-m1-l1';
const IDENTITY = 'fmcg-beauty::Module 1 · Market::Lesson 1 · Category basics';
const cards: ChapterLike[] = [{ title: 'Chapter 1' }, { title: 'Chapter 2' }, { title: 'Chapter 3' }];

interface Device {
  store: KeyValueStore & { dump(): Record<string, string> };
  engine: ProgressSyncEngine | null;
  email: string | null;
}

const devices: Device[] = [];

function device(initial: Record<string, string> = {}): Device {
  const created: Device = { store: memoryKeyValueStore(initial), engine: null, email: null };
  devices.push(created);
  return created;
}

/** Signs `email` in on the device (or out, with null), as a page load would: reconcile, then start the engine. */
async function signIn(dev: Device, server: TestServer, email: string | null, options: { expired?: boolean } = {}) {
  dev.engine?.stop();
  const scope = learnerScopeFor(email);
  const reconcile = reconcileWorkingCopy(dev.store, scope, now());
  dev.email = email;
  dev.engine = new ProgressSyncEngine({
    store: dev.store, scope, transport: scope ? server.transportFor(email, options) : null, now, debounceMs: 1_000_000,
    locationSearch: () => `?app=industry-knowledge&dkIndustry=fmcg-beauty&dkLesson=${encodeURIComponent('Lesson 1 · Category basics')}&dkPractice=flashcards`,
  });
  await dev.engine.start(reconcile);
  return dev.engine;
}

async function sync(dev: Device) {
  dev.engine!.scan();
  await dev.engine!.flush();
}

const readJson = (store: KeyValueStore, key: string) => JSON.parse(store.getItem(key) ?? 'null');
const writeJson = (store: KeyValueStore, key: string, value: unknown) => store.setItem(key, JSON.stringify(value));

/** What the reader writes after a learner reads chapter `index` and submits its check. */
function studyChapter(store: KeyValueStore, index: number, accuracy = 100) {
  const at = tick();
  const reader = readJson(store, readerStorageKey(PK)) ?? { notes: {}, completed: [], positions: {}, migrations: [FLOW_MIGRATION_ID, CHAPTER_FLOW_MIGRATION_ID], legacyCompletedChapters: [] };
  reader.completed = Array.from(new Set([...(reader.completed ?? []), index])).sort();
  reader.view = { stage: 'check', chapter: index };
  writeJson(store, readerStorageKey(PK), reader);
  const quiz = readJson(store, quizStorageKey(PK)) ?? { latest: null, best: null, attempts: [], chapters: {} };
  const check = quiz.chapters[String(index)] ?? { latest: null, best: null, attempts: [] };
  quiz.chapters[String(index)] = {
    ...check, latest: accuracy, best: Math.max(check.best ?? 0, accuracy), submittedAt: at,
    attempts: [...check.attempts, { at, correct: accuracy / 20, total: 5, accuracy }], lastAnswers: { [`q${index}`]: 'a' }, lastQuestionIds: [`q${index}`],
  };
  writeJson(store, quizStorageKey(PK), quiz);
  const lessons = readJson(store, LESSON_PROGRESS_KEY) ?? {};
  lessons[IDENTITY] = { access: 'unlocked', accessAt: lessons[IDENTITY]?.accessAt ?? at, persistenceKey: PK, ...(lessons[IDENTITY] ?? {}) };
  if (index === cards.length - 1 && !lessons[IDENTITY].completedAt) Object.assign(lessons[IDENTITY], { completedAt: at, source: 'assessment' });
  writeJson(store, LESSON_PROGRESS_KEY, lessons);
}

function writeNote(store: KeyValueStore, text: string, noteKey = '0') {
  const reader = readJson(store, readerStorageKey(PK)) ?? { notes: {}, completed: [], positions: {}, migrations: [FLOW_MIGRATION_ID, CHAPTER_FLOW_MIGRATION_ID] };
  reader.notes = { ...(reader.notes ?? {}), [noteKey]: text };
  writeJson(store, readerStorageKey(PK), reader);
}

const gate = (store: KeyValueStore) => storedChapterProgress(IDENTITY, PK, cards, store, chapterPlanFromStatuses(cards).chapters.map((chapter) => chapter.status))
  .map((chapter) => `${chapter.index}:${chapter.unlocked ? 'open' : 'locked'}/${chapter.complete ? 'done' : 'todo'}`).join(' ');

const card = (cardId: string, state: string, lastReviewedAt: string) => ({
  cardId, deckId: 'fmcg-beauty::Module 1', state, confidence: 0.5, lastReviewedAt,
  schedule: { dueAt: lastReviewedAt, intervalDays: 1, ease: 2.5, lapses: 0, repetitions: 1 },
  reviewHistory: [{ at: lastReviewedAt, rating: 'good', previousState: 'learning', nextState: state, intervalDays: 1, dueAt: lastReviewedAt }],
});

/** Device data recorded before sync existed (signed out or before this sprint): owner marker absent. */
function legacyDeviceData(): Record<string, string> {
  return {
    [readerStorageKey(PK)]: JSON.stringify({ notes: { 0: 'Legacy note on this browser' }, completed: [0, 1, 2], positions: { 0: 120 } }),
    [quizStorageKey(PK)]: JSON.stringify({ latest: 70, best: 70 }),
    [LESSON_PROGRESS_KEY]: JSON.stringify({ [IDENTITY]: { persistenceKey: PK, access: 'historical', accessAt: '2026-10-01T08:00:00.000Z' } }),
    [readerStorageKey('orphan-lesson-key')]: JSON.stringify({ completed: [0], notes: {} }),
  };
}

const keysOf = (records: SyncRecord[]) => records.map((record) => record.key).sort();

// Cases -----------------------------------------------------------------------------------

const cases: Case[] = [
  {
    id: 'PR-01', name: 'complete a chapter: evidence reaches the account, Saved only after acknowledgement', async run() {
      const server = makeServer();
      const a = device();
      const engine = await signIn(a, server, EMAIL_A);
      studyChapter(a.store, 0);
      engine.scan();
      assert(engine.getStatus().phase !== 'saved', 'Saved shown before the server acknowledged');
      await engine.flush();
      same(engine.getStatus().phase, 'saved', 'status after acknowledgement');
      const keys = keysOf(server.recordsOf(EMAIL_A));
      assert(keys.includes(recordKeys.reader(PK)) && keys.includes(recordKeys.check(PK, '0')) && keys.includes(recordKeys.lesson(IDENTITY)), `missing records: ${keys}`);
    },
  },
  {
    id: 'PR-02', name: 'submit a Knowledge Check: attempt is append-only with its own ID; the draft never syncs', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A);
      studyChapter(a.store, 0, 60);
      const quiz = readJson(a.store, quizStorageKey(PK));
      quiz.chapters['1'] = { latest: null, best: null, attempts: [], draft: { questionIds: ['q1'], answers: { q1: 'b' }, index: 0, startedAt: tick() } };
      writeJson(a.store, quizStorageKey(PK), quiz);
      await sync(a);
      const records = server.recordsOf(EMAIL_A);
      same(records.filter((record) => record.type === 'attempt').length, 1, 'attempts stored');
      assert(!records.some((record) => record.key === recordKeys.check(PK, '1')), 'an unsubmitted draft was uploaded');
      assert(!JSON.stringify(records).includes('"draft"'), 'draft data reached the server');
    },
  },
  {
    id: 'PR-03', name: 'refresh: a reloaded page uploads nothing new and keeps progress', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A);
      studyChapter(a.store, 0);
      await sync(a);
      const before = server.calls;
      const engine = await signIn(a, server, EMAIL_A);
      same(engine.scan(), 0, 'records queued after reload');
      same(server.calls - before, 1, 'requests after reload (summary only)');
      same(gate(a.store), '0:open/done 1:open/todo 2:locked/todo', 'gate after reload');
    },
  },
  {
    id: 'PR-05', name: 'note: saved to the account with a revision', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A);
      writeNote(a.store, 'Margin drivers: mix, price, cost');
      await sync(a);
      const note = server.recordsOf(EMAIL_A).find((record) => record.type === 'note');
      same(note?.payload.text, 'Margin drivers: mix, price, cost', 'stored note');
      same(note?.revision, 1, 'revision');
    },
  },
  {
    id: 'PR-06/PR-07', name: 'flashcard review and Match & Sort completion sync under the account scope', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A);
      const scope = learnerScopeFor(EMAIL_A)!;
      writeJson(a.store, flashcardKeyFor(scope), { schemaVersion: 1, cards: { 'card-1': card('card-1', 'mastered', tick()) }, updatedAt: new Date(clock).toISOString() });
      writeJson(a.store, matchSortKeyFor(scope), { 'generated:fmcg-beauty::Module 1::Lesson 1#ch1': { activityId: 'generated:fmcg-beauty::Module 1::Lesson 1#ch1', attempts: [{ at: tick(), correct: 4, total: 4, allCorrect: true, revealed: false }], completedAt: new Date(clock).toISOString(), firstCheckAllCorrect: true } });
      await sync(a);
      const types = server.recordsOf(EMAIL_A).map((record) => record.type).sort();
      same(types, ['flashcard', 'match'], 'practice record types');
      same(server.recordsOf(EMAIL_A).find((record) => record.type === 'match')?.curriculumId, 'fmcg-beauty', 'Match & Sort curriculum namespace');
    },
  },
  {
    id: 'PR-08', name: 'mode switch: tab-scoped practice resume and navigation records are not synced', async run() {
      const server = makeServer();
      const a = device({ 'casemate:practice-review:resume:v1': JSON.stringify({ identity: IDENTITY, modeId: 'flashcards', at: clock }), 'casemate:learning-path:focus:v1': '{}', 'casemate-domain-pending-route': '{}' });
      await signIn(a, server, EMAIL_A);
      await sync(a);
      same(server.recordsOf(EMAIL_A).length, 0, 'records uploaded for transient UI state');
    },
  },
  {
    id: 'CD-01', name: 'two devices, one account: Device B restores the gate and the resume context', async run() {
      const server = makeServer();
      const a = device();
      const b = device();
      await signIn(a, server, EMAIL_A);
      studyChapter(a.store, 0);
      studyChapter(a.store, 1);
      await sync(a);
      const engineB = await signIn(b, server, EMAIL_A);
      same(gate(b.store), gate(a.store), 'Device B gate matches Device A');
      const resume = engineB.getStatus().resume;
      same([resume?.chapter, resume?.stage, resume?.params.dkPractice], [1, 'learning', undefined], 'resume: chapter, stage (check reopened as reading), no practice deep link');
      same(readJson(b.store, readerStorageKey(PK)).view, { stage: 'learning', chapter: 1 }, 'Device B reading position (stale check not reopened)');
    },
  },
  {
    id: 'CD-02', name: 'a stale device cannot erase completion', async run() {
      const server = makeServer();
      const a = device();
      const b = device();
      await signIn(a, server, EMAIL_A);
      await signIn(b, server, EMAIL_A);
      studyChapter(a.store, 0);
      studyChapter(a.store, 1);
      studyChapter(a.store, 2);
      await sync(a);
      // Device B never fetched; its learner only re-reads chapter 0 and the old snapshot is pushed.
      const reader = readJson(b.store, readerStorageKey(PK)) ?? {};
      writeJson(b.store, readerStorageKey(PK), { ...reader, completed: [0], migrations: [FLOW_MIGRATION_ID, CHAPTER_FLOW_MIGRATION_ID], view: { stage: 'learning', chapter: 0 } });
      writeJson(b.store, LESSON_PROGRESS_KEY, { [IDENTITY]: { access: 'unlocked', accessAt: tick(), persistenceKey: PK } });
      await sync(b);
      const lesson = server.recordsOf(EMAIL_A).find((record) => record.key === recordKeys.lesson(IDENTITY));
      assert(lesson?.payload.completedAt, 'lesson completion was erased');
      same(server.recordsOf(EMAIL_A).find((record) => record.key === recordKeys.reader(PK))?.payload.completed, [0, 1, 2], 'chapters read');
      await signIn(b, server, EMAIL_A);
      same(gate(b.store), '0:open/done 1:open/done 2:open/done', 'Device B gate after sync');
    },
  },
  {
    id: 'CD-03', name: 'retake on another device: both attempts kept, latest from the newer submission, best is the maximum', async run() {
      const server = makeServer();
      const a = device();
      const b = device();
      await signIn(a, server, EMAIL_A);
      studyChapter(a.store, 0, 100);
      await sync(a);
      await signIn(b, server, EMAIL_A);
      studyChapter(b.store, 0, 40);
      await sync(b);
      await signIn(a, server, EMAIL_A);
      const check = readJson(a.store, quizStorageKey(PK)).chapters['0'];
      same([check.attempts.length, check.latest, check.best], [2, 40, 100], 'attempts / latest / best on Device A');
    },
  },
  {
    id: 'CD-04', name: 'divergent note edits: both versions kept as a conflict until the learner resolves it', async run() {
      const server = makeServer();
      const a = device();
      const b = device();
      await signIn(a, server, EMAIL_A);
      writeNote(a.store, 'Original');
      await sync(a);
      const engineB = await signIn(b, server, EMAIL_A);
      writeNote(a.store, 'Edited on A');
      await sync(a);
      writeNote(b.store, 'Edited on B (offline)');
      await sync(b);
      const conflicts = engineB.getStatus().conflicts;
      same(conflicts.map((conflict) => [conflict.local.text, conflict.remote.text]), [['Edited on B (offline)', 'Edited on A']], 'conflict versions');
      same(readJson(b.store, readerStorageKey(PK)).notes['0'], 'Edited on B (offline)', 'Device B keeps its own text meanwhile');
      engineB.resolveConflict(conflicts[0].recordKey, 'both');
      await engineB.flush();
      const stored = String(server.recordsOf(EMAIL_A).find((record) => record.type === 'note')?.payload.text);
      assert(stored.includes('Edited on A') && stored.includes('Edited on B (offline)'), `resolved note lost a version: ${stored}`);
      same(engineB.getStatus().conflicts.length, 0, 'conflicts after resolution');
    },
  },
  {
    id: 'CD-05', name: 'reading position: the most recent learner action wins; hydration never counts as an action', async run() {
      const server = makeServer();
      const a = device();
      const b = device();
      await signIn(a, server, EMAIL_A);
      studyChapter(a.store, 0);
      await sync(a);
      await signIn(b, server, EMAIL_A);
      const queuedAfterHydrate = b.engine!.scan();
      same(queuedAfterHydrate, 0, 'records queued by hydration alone');
      const reader = readJson(b.store, readerStorageKey(PK));
      writeJson(b.store, readerStorageKey(PK), { ...reader, view: { stage: 'learning', chapter: 1 } });
      tick();
      await sync(b);
      await signIn(a, server, EMAIL_A);
      same(readJson(a.store, readerStorageKey(PK)).view.chapter, 1, 'Device A position follows the newer action on B');
    },
  },
  {
    id: 'CD-06/CD-07', name: 'flashcard and Match & Sort progress never regress to a stale snapshot', async run() {
      const server = makeServer();
      const a = device();
      const b = device();
      const scope = learnerScopeFor(EMAIL_A)!;
      await signIn(a, server, EMAIL_A);
      await signIn(b, server, EMAIL_A);
      const old = tick();
      const recent = tick();
      writeJson(a.store, flashcardKeyFor(scope), { schemaVersion: 1, cards: { c1: card('c1', 'mastered', recent) }, updatedAt: recent });
      writeJson(a.store, matchSortKeyFor(scope), { m1: { activityId: 'm1', attempts: [{ at: recent, correct: 3, total: 3, allCorrect: true, revealed: false }], completedAt: recent, firstCheckAllCorrect: true } });
      await sync(a);
      writeJson(b.store, flashcardKeyFor(scope), { schemaVersion: 1, cards: { c1: card('c1', 'learning', old) }, updatedAt: old });
      writeJson(b.store, matchSortKeyFor(scope), { m1: { activityId: 'm1', attempts: [{ at: old, correct: 1, total: 3, allCorrect: false, revealed: false }], firstCheckAllCorrect: false } });
      await sync(b);
      const records = server.recordsOf(EMAIL_A);
      same(records.find((record) => record.key === 'flashcard:c1')?.payload.state, 'mastered', 'flashcard state');
      const match = records.find((record) => record.key === 'match:m1')?.payload as { completedAt?: string; attempts: unknown[]; firstCheckAllCorrect?: boolean };
      same([Boolean(match.completedAt), match.attempts.length, match.firstCheckAllCorrect], [true, 2, false], 'match completion / attempts / first check');
    },
  },
  {
    id: 'CD-08', name: 'no silent loss: offline work is queued, survives reload and lands once online', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A);
      server.offline = true;
      studyChapter(a.store, 0);
      writeNote(a.store, 'Offline note');
      await sync(a);
      same(a.engine!.getStatus().phase, 'offline', 'status while offline');
      const pending = Object.keys(loadQueue(a.store, learnerScopeFor(EMAIL_A)!).items).length;
      assert(pending >= 4, `queued writes: ${pending}`);
      server.offline = false;
      await signIn(a, server, EMAIL_A);
      same(a.engine!.getStatus().phase, 'saved', 'status after reconnecting');
      same(server.recordsOf(EMAIL_A).find((record) => record.type === 'note')?.payload.text, 'Offline note', 'offline note');
    },
  },
  {
    id: 'AU-06', name: 'account switch A→B on one browser: no leakage and no replay of A\'s queue under B', async run() {
      const server = makeServer();
      const shared = device();
      await signIn(shared, server, EMAIL_A);
      studyChapter(shared.store, 0);
      writeNote(shared.store, 'A private note');
      shared.engine!.scan();
      // A signs out before the flush; B signs in on the same browser.
      server.offline = true;
      await shared.engine!.flush();
      server.offline = false;
      await signIn(shared, server, null);
      await signIn(shared, server, EMAIL_B);
      await shared.engine!.flush();
      assert(!JSON.stringify(shared.store.dump()).includes('A private note') || Object.keys(loadQueue(shared.store, learnerScopeFor(EMAIL_A)!).items).length > 0, 'A note visible outside A\'s queue');
      same(readJson(shared.store, readerStorageKey(PK)), null, 'B sees A\'s reader record');
      same(server.recordsOf(EMAIL_B).length, 0, 'records written under B');
      same(gate(shared.store), '0:open/todo 1:locked/todo 2:locked/todo', 'B gate');
      await signIn(shared, server, null);
      await signIn(shared, server, EMAIL_A);
      same(server.recordsOf(EMAIL_A).find((record) => record.type === 'note')?.payload.text, 'A private note', 'A\'s queued note delivered under A only');
    },
  },
  {
    id: 'AU-07', name: 'logout: account records and notes leave the working copy; device records come back', async run() {
      const server = makeServer();
      const shared = device({ [readerStorageKey('guest-lesson')]: JSON.stringify({ completed: [0], notes: { 0: 'guest note' } }) });
      await signIn(shared, server, EMAIL_A);
      writeNote(shared.store, 'A private note');
      await sync(shared);
      await signIn(shared, server, null);
      assert(!Object.entries(shared.store.dump()).some(([key, value]) => !key.includes('dk-sync') && value.includes('A private note')), 'A note left in readable keys');
      same(readJson(shared.store, readerStorageKey('guest-lesson')).notes['0'], 'guest note', 'guest record restored');
      same(readOwner(shared.store).owner, 'device', 'owner after logout');
    },
  },
  {
    id: 'AU-08', name: 'expired session: refused safely, never reported as saved, changes kept', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A, { expired: true });
      studyChapter(a.store, 0);
      await sync(a);
      same(a.engine!.getStatus().phase, 'auth', 'status with an expired session');
      assert(Object.keys(loadQueue(a.store, learnerScopeFor(EMAIL_A)!).items).length > 0, 'unsynced changes were dropped');
      same(server.recordsOf(EMAIL_A).length, 0, 'records accepted without a session');
      await signIn(a, server, EMAIL_A);
      assert(server.recordsOf(EMAIL_A).some((record) => record.type === 'attempt'), 'queued attempt not delivered after signing in again');
    },
  },
  {
    id: 'MG-01/MG-08/MG-10', name: 'shared browser: signing in attributes nothing; import is explicit; originals stay byte-identical', async run() {
      const server = makeServer();
      const shared = device(legacyDeviceData());
      const original = legacyDeviceData();
      const engine = await signIn(shared, server, EMAIL_A);
      same(server.recordsOf(EMAIL_A).length, 0, 'records attributed on sign-in');
      same(readJson(shared.store, readerStorageKey(PK)), null, 'device progress shown inside the account before import');
      const offer = engine.getStatus().importOffer;
      assert(offer && offer.total > 0, 'no import offered');
      Object.entries(original).forEach(([key, value]) => same(shared.store.getItem(DEVICE_ARCHIVE_PREFIX + key), value, `archive ${key}`));
      await engine.importDevice();
      same(engine.getStatus().importState, 'done', 'import state');
      Object.entries(original).forEach(([key, value]) => same(shared.store.getItem(DEVICE_ARCHIVE_PREFIX + key), value, `archive after import ${key}`));
      assert(server.recordsOf(EMAIL_A).some((record) => record.key === recordKeys.check(PK, 'lesson')), 'legacy lesson-level check not imported');
      await signIn(shared, server, null);
      Object.entries(original).forEach(([key, value]) => same(shared.store.getItem(key), value, `device record after logout ${key}`));
    },
  },
  {
    id: 'MG-02/MG-04', name: 'legacy records: lesson-level score and legacy completion survive; a completed account lesson stays completed', async run() {
      const server = makeServer();
      const other = device();
      await signIn(other, server, EMAIL_A);
      studyChapter(other.store, 0);
      studyChapter(other.store, 1);
      studyChapter(other.store, 2);
      await sync(other);
      const shared = device(legacyDeviceData());
      const engine = await signIn(shared, server, EMAIL_A);
      await engine.importDevice();
      const records = server.recordsOf(EMAIL_A);
      assert(records.find((record) => record.key === recordKeys.lesson(IDENTITY))?.payload.completedAt, 'completion lost on import');
      same(records.find((record) => record.key === recordKeys.check(PK, 'lesson'))?.payload.latest, 70, 'legacy lesson score');
      same(gate(shared.store), '0:open/done 1:open/done 2:open/done', 'gate after import');
    },
  },
  {
    id: 'MG-03/MG-09', name: 'import twice, or after an interruption: retry-safe with no duplicate attempts', async run() {
      const server = makeServer();
      const data = legacyDeviceData();
      data[quizStorageKey(PK)] = JSON.stringify({ latest: 70, best: 70, attempts: [{ at: '2026-10-01T08:30:00.000Z', correct: 7, total: 10, accuracy: 70 }], chapters: {} });
      const shared = device(data);
      const engine = await signIn(shared, server, EMAIL_A);
      server.failNextPushes = 1;
      await engine.importDevice();
      same(engine.getStatus().importState, 'failed', 'interrupted import state');
      await engine.importDevice();
      same(engine.getStatus().importState, 'done', 'retried import state');
      const count = server.recordsOf(EMAIL_A).length;
      const again = await signIn(shared, server, EMAIL_A);
      same(again.getStatus().importOffer, null, 'import offered again for the same device data');
      same(server.recordsOf(EMAIL_A).filter((record) => record.type === 'attempt').length, 1, 'attempts after retry');
      same(server.recordsOf(EMAIL_A).length, count, 'records after a second sign-in');
    },
  },
  {
    id: 'MG-05', name: 'unmapped records are preserved and flagged, never guessed', async run() {
      const server = makeServer();
      const shared = device(legacyDeviceData());
      const engine = await signIn(shared, server, EMAIL_A);
      same(engine.getStatus().importOffer?.unmapped, 1, 'unmapped count in the offer');
      await engine.importDevice();
      const orphan = server.recordsOf(EMAIL_A).find((record) => record.key === recordKeys.reader('orphan-lesson-key'));
      same([orphan?.curriculumId, orphan?.flags], ['unresolved', ['unmapped']], 'orphan record');
    },
  },
  {
    id: 'MG-06', name: 'notes conflict on import: the account note is not overwritten', async run() {
      const server = makeServer();
      const other = device();
      await signIn(other, server, EMAIL_A);
      writeNote(other.store, 'Newer account note');
      await sync(other);
      const shared = device(legacyDeviceData());
      const engine = await signIn(shared, server, EMAIL_A);
      same(engine.getStatus().importOffer?.noteConflicts, 1, 'note conflicts in the offer');
      await engine.importDevice();
      same(server.recordsOf(EMAIL_A).find((record) => record.type === 'note')?.payload.text, 'Newer account note', 'account note');
      same(engine.getStatus().conflicts.map((conflict) => conflict.local.text), ['Legacy note on this browser'], 'conflict kept for the learner');
    },
  },
  {
    id: 'MG-07', name: 'rejecting import changes nothing in the account', async run() {
      const server = makeServer();
      const shared = device(legacyDeviceData());
      const engine = await signIn(shared, server, EMAIL_A);
      const calls = server.calls;
      engine.dismissImport();
      same(server.calls, calls, 'requests after Not mine');
      same(server.recordsOf(EMAIL_A).length, 0, 'account records after Not mine');
      const again = await signIn(shared, server, EMAIL_A);
      same(again.getStatus().importOffer, null, 'offer after dismissal');
      assert(shared.store.getItem(DEVICE_ARCHIVE_PREFIX + readerStorageKey(PK)), 'device archive removed after dismissal');
    },
  },
  {
    id: 'MG-pre', name: 'practice already stored under the account scope before sync is offered for import, not auto-uploaded', async run() {
      const server = makeServer();
      const scope = learnerScopeFor(EMAIL_A)!;
      const shared = device({ [flashcardKeyFor(scope)]: JSON.stringify({ schemaVersion: 1, cards: { c9: card('c9', 'learning', '2026-11-01T08:00:00.000Z') }, updatedAt: '2026-11-01T08:00:00.000Z' }) });
      const engine = await signIn(shared, server, EMAIL_A);
      await sync(shared);
      same(server.recordsOf(EMAIL_A).length, 0, 'pre-sync practice uploaded automatically');
      same(engine.getStatus().importOffer?.counts.flashcard, 1, 'pre-sync flashcard offered');
    },
  },
  {
    id: 'OF-02/OF-06', name: 'failed writes are retried idempotently; changes coalesce per record and batch', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A);
      for (let index = 0; index < 5; index += 1) {
        writeNote(a.store, `draft ${index}`);
        a.engine!.scan();
      }
      same(Object.keys(loadQueue(a.store, learnerScopeFor(EMAIL_A)!).items).length, 2, 'queued records after 5 edits (note + reader)');
      server.failNextPushes = 1;
      await a.engine!.flush();
      same(a.engine!.getStatus().phase, 'failed', 'status after a server error');
      clock += 10 * 60_000;
      await a.engine!.flush();
      same(a.engine!.getStatus().phase, 'saved', 'status after retry');
      same(server.recordsOf(EMAIL_A).find((record) => record.type === 'note')?.payload.text, 'draft 4', 'final note');
    },
  },
  {
    id: 'LR-02', name: 'legacy completion is not fabricated on a new device (migration markers travel with the reader record)', async run() {
      const server = makeServer();
      const a = device();
      await signIn(a, server, EMAIL_A);
      writeJson(a.store, readerStorageKey(PK), { completed: [0, 1], migrations: [FLOW_MIGRATION_ID, CHAPTER_FLOW_MIGRATION_ID], legacyCompletedChapters: [], notes: {} });
      writeJson(a.store, LESSON_PROGRESS_KEY, { [IDENTITY]: { access: 'unlocked', accessAt: tick(), persistenceKey: PK } });
      await sync(a);
      const b = device();
      await signIn(b, server, EMAIL_A);
      same(gate(b.store), gate(a.store), 'gate on Device B');
      same(gate(b.store), '0:open/todo 1:locked/todo 2:locked/todo', 'chapters read without checks stay locked');
    },
  },
  {
    id: 'LR-alias', name: 'historical IDs: explicit alias mapping, otherwise the stored ID is used unchanged', run() {
      same(canonicalId({ 'old-key': 'new-key', 'new-key': 'newest-key' }, 'old-key'), 'newest-key', 'alias chain');
      same(canonicalId({}, 'unknown-key'), 'unknown-key', 'no alias');
      const store = memoryKeyValueStore({ [readerStorageKey('old-key')]: JSON.stringify({ completed: [0] }), [readerStorageKey('new-key')]: JSON.stringify({ completed: [1] }) });
      const records = extractRecords(store, { scope: null, aliases: { persistenceKeys: { 'old-key': 'new-key' }, lessonIdentities: {}, flashcardIds: {}, activityIds: {} } });
      same(records.get(recordKeys.reader('new-key'))?.payload.completed, [0, 1], 'aliased records combined');
    },
  },
  {
    id: 'OWN-crash', name: 'an interrupted owner switch resumes without losing device records', run() {
      const store = memoryKeyValueStore(legacyDeviceData());
      store.setItem(OWNER_KEY, `moving:device>acct:${learnerScopeFor(EMAIL_A)}`);
      store.setItem(DEVICE_ARCHIVE_PREFIX + readerStorageKey(PK), store.getItem(readerStorageKey(PK))!);
      store.removeItem(readerStorageKey(PK));
      reconcileWorkingCopy(store, learnerScopeFor(EMAIL_A), now());
      reconcileWorkingCopy(store, null, now());
      Object.entries(legacyDeviceData()).forEach(([key, value]) => same(store.getItem(key), value, `restored ${key}`));
    },
  },
];

async function main() {
  let failed = 0;
  for (const testCase of cases) {
    try {
      await testCase.run();
      console.log(`PASS ${testCase.id} ${testCase.name}`);
    } catch (error) {
      failed += 1;
      console.log(`FAIL ${testCase.id} ${testCase.name}\n     ${(error as Error).message}`);
    } finally {
      devices.splice(0).forEach((dev) => dev.engine?.stop());
    }
  }
  console.log(`\n${cases.length - failed}/${cases.length} passed`);
  process.exit(failed ? 1 : 0);
}

void main();
