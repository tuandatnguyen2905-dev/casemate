import { useEffect, useState } from 'react';
import type { LibraryQuestion } from './skillQuestionLibrary';
import type { HonestScoreResult } from './caseScoringRubrics';
import { isFounderEmailSession } from './founderAccess';

/**
 * Server-held answer keys for the static question banks.
 *
 * A question version is identified by `content_hash`: SHA-256 over the
 * learner-facing fields only, so a browser that no longer ships keys can still
 * name the exact version it rendered. `payload_hash` covers the whole record;
 * while keys are still compiled into the bundle the browser sends it too, so
 * the server only answers from a key synced from this exact build.
 *
 * Keys reach inbox_library_answer_keys through the founder's own session: when
 * a founder opens the Question Library, the library this build compiled is
 * diffed against the server and any missing version is uploaded.
 */

const HOOK_URL = '/api/workspaces/workspace-539150/hooks/casemate-library-answers-v1/execute';
const SYNC_MANIFEST_KEY = 'casemate-library-answer-keys-synced';
const SYNC_BATCH_ITEMS = 30;
const SYNC_BATCH_BYTES = 400_000;
const GRADE_TIMEOUT_MS = 6000;

export type AnswerKeySource = 'case_drill_library' | 'case_pool_library';

export interface ServerObjectiveGrade {
  status: 'graded';
  correct: boolean;
  scoring: HonestScoreResult;
  solution: Record<string, unknown>;
}

interface SyncItem {
  source: AnswerKeySource;
  question_id: string;
  content_hash: string;
  payload_hash: string;
  payload: Record<string, unknown>;
}

export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value === undefined ? null : value);
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item === undefined ? null : item)).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).filter((key) => record[key] !== undefined).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(',')}}`;
}

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function jsonRecord(value: unknown): Record<string, unknown> {
  return JSON.parse(JSON.stringify(value ?? {})) as Record<string, unknown>;
}

/** Learner-facing fields of a Case Drill library question; these stay in the bundle after keys move out. */
export function libraryQuestionContentHash(question: LibraryQuestion): Promise<string> {
  return sha256Hex(stableStringify({
    id: question.id,
    skill: question.skill,
    difficulty: question.difficulty,
    answerMode: question.answerMode,
    question: question.question,
    options: question.options || [],
    answerUnit: question.answerUnit || '',
    numericTolerance: question.numericTolerance ?? null,
  }));
}

function casePoolContentHash(record: Record<string, unknown>): Promise<string> {
  return sha256Hex(stableStringify({
    id: record.id,
    title: record.title ?? null,
    situation: record.situation ?? null,
    key_question: record.key_question ?? null,
    answer_choices: record.answer_choices ?? null,
  }));
}

function payloadHash(payload: Record<string, unknown>): Promise<string> {
  return sha256Hex(stableStringify(payload));
}

async function callAnswerService<T>(sessionId: string | null | undefined, body: Record<string, unknown>, timeoutMs = 20000): Promise<T> {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? window.setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetch(HOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(sessionId ? { 'X-Session-Id': sessionId } : {}) },
      body: JSON.stringify({ ...body, sessionId: sessionId || undefined }),
      signal: controller?.signal,
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result?.error) throw new Error(result?.error || `Answer service returned ${response.status}`);
    return result as T;
  } finally {
    if (timer) window.clearTimeout(timer);
  }
}

/**
 * Grades an MCQ or direct-numeric library question on the server. Returns null
 * when the server has no key for this exact question version or cannot be
 * reached, so the caller can fall back to its own key during the transition.
 */
export async function gradeObjectiveOnServer({
  question,
  sessionId,
  mode,
  selectedOption,
  answer,
  evidence,
  localCorrect,
}: {
  question: LibraryQuestion;
  sessionId?: string | null;
  mode: 'choice' | 'numeric';
  selectedOption?: string;
  answer?: string;
  evidence?: string;
  localCorrect?: boolean;
}): Promise<ServerObjectiveGrade | null> {
  try {
    const [contentHash, fullHash] = await Promise.all([
      libraryQuestionContentHash(question),
      payloadHash(jsonRecord(question)),
    ]);
    const result = await callAnswerService<{ status: string } & Partial<ServerObjectiveGrade>>(sessionId, {
      action: 'grade',
      source: 'case_drill_library',
      question_id: question.id,
      content_hash: contentHash,
      payload_hash: fullHash,
      mode,
      selected_option: mode === 'choice' ? selectedOption || '' : undefined,
      answer: mode === 'numeric' ? answer || '' : undefined,
      evidence,
      local_correct: localCorrect,
    }, GRADE_TIMEOUT_MS);
    if (result.status !== 'graded' || typeof result.correct !== 'boolean' || !result.scoring) return null;
    return result as ServerObjectiveGrade;
  } catch (error) {
    console.warn('[Answer keys] server grading unavailable, using the bundled key:', error);
    return null;
  }
}

async function buildSyncItems(questions: LibraryQuestion[]): Promise<SyncItem[]> {
  const items: SyncItem[] = [];
  const seen = new Set<string>();
  const push = (item: SyncItem) => {
    const triple = `${item.source}|${item.question_id}|${item.content_hash}|${item.payload_hash}`;
    if (seen.has(triple)) return;
    seen.add(triple);
    items.push(item);
  };
  for (const question of questions) {
    if (!question?.id) continue;
    const payload = jsonRecord(question);
    push({
      source: 'case_drill_library',
      question_id: question.id,
      content_hash: await libraryQuestionContentHash(question),
      payload_hash: await payloadHash(payload),
      payload,
    });
  }
  try {
    const { CASE_POOL_LIBRARY } = await import('./casePoolLibrary');
    for (const record of (CASE_POOL_LIBRARY || []) as unknown[]) {
      const payload = jsonRecord(record);
      if (typeof payload.id !== 'string' || !payload.id) continue;
      push({
        source: 'case_pool_library',
        question_id: payload.id,
        content_hash: await casePoolContentHash(payload),
        payload_hash: await payloadHash(payload),
        payload,
      });
    }
  } catch (error) {
    console.warn('[Answer keys] Case Pool library could not be read for sync:', error);
  }
  return items;
}

function batches(items: SyncItem[]): SyncItem[][] {
  const out: SyncItem[][] = [];
  let current: SyncItem[] = [];
  let bytes = 0;
  for (const item of items) {
    const size = JSON.stringify(item).length;
    if (current.length && (current.length >= SYNC_BATCH_ITEMS || bytes + size > SYNC_BATCH_BYTES)) {
      out.push(current);
      current = [];
      bytes = 0;
    }
    current.push(item);
    bytes += size;
  }
  if (current.length) out.push(current);
  return out;
}

export interface AnswerKeySyncSummary {
  checked: number;
  inserted: number;
  rejected: number;
  skipped: boolean;
}

let syncInFlight: Promise<AnswerKeySyncSummary> | null = null;

/** Founder-only: uploads every question version this build compiled that the server does not hold yet. */
export function syncLibraryAnswerKeys(sessionId: string, questions: LibraryQuestion[]): Promise<AnswerKeySyncSummary> {
  if (syncInFlight) return syncInFlight;
  syncInFlight = (async () => {
    const items = await buildSyncItems(questions);
    const manifest = await sha256Hex(items.map((item) => `${item.source}|${item.question_id}|${item.content_hash}|${item.payload_hash}`).sort().join('\n'));
    try {
      if (localStorage.getItem(SYNC_MANIFEST_KEY) === manifest) return { checked: items.length, inserted: 0, rejected: 0, skipped: true };
    } catch { /* storage unavailable: run the full check */ }
    let inserted = 0;
    let rejected = 0;
    for (const batch of batches(items)) {
      const result = await callAnswerService<{ inserted?: number; rejected?: number }>(sessionId, {
        action: 'sync_keys',
        items: batch,
        build_hint: typeof window !== 'undefined' ? window.location.host : null,
      });
      inserted += Number(result.inserted) || 0;
      rejected += Number(result.rejected) || 0;
    }
    if (rejected === 0) {
      try { localStorage.setItem(SYNC_MANIFEST_KEY, manifest); } catch { /* best effort */ }
    }
    return { checked: items.length, inserted, rejected, skipped: false };
  })().finally(() => { syncInFlight = null; });
  return syncInFlight;
}

/** Runs the founder key sync once per page load and returns a short status line for the founder only. */
export function useFounderAnswerKeySync(sessionId: string | null | undefined, spaceId: string, questions: LibraryQuestion[]): string | null {
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    if (!sessionId || !isFounderEmailSession(spaceId)) return;
    let cancelled = false;
    setStatus('Answer keys: checking the server copy…');
    syncLibraryAnswerKeys(sessionId, questions)
      .then((summary) => {
        if (cancelled) return;
        setStatus(summary.skipped
          ? `Answer keys: server copy matches this build (${summary.checked} versions).`
          : `Answer keys: ${summary.checked} versions checked, ${summary.inserted} uploaded${summary.rejected ? `, ${summary.rejected} rejected` : ''}.`);
      })
      .catch((error) => {
        if (!cancelled) setStatus(`Answer keys: sync failed (${error instanceof Error ? error.message : 'unknown error'}).`);
      });
    return () => { cancelled = true; };
  }, [sessionId, spaceId, questions]);
  return status;
}
