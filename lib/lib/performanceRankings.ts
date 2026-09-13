// Casemate — percentile rankings shared by Case Pool, Case Drill, and Aptitude Test.
//
// Rankings use the built-in WorkspaceDB SDK directly. This avoids depending on
// an owner-only server hook being present in a customer session: each completed
// result is written to user_performance_rankings, while score/speed counts are
// computed with server-side WorkspaceDB aggregates (raw peer rows are not sent
// to result screens). The founder dashboard can also backfill the benchmark
// pool once from the three historical result tables.

const WORKSPACE_ID = 'workspace-539150';

/** Percentiles display only once an app's pool has at least this many records. */
export const MIN_RANKING_RECORDS = 5;

export type RankingApp = 'case_pool' | 'case_drill' | 'aptitude_test';

export interface RankingResult {
  totalRecords: number;
  sufficientData: boolean;
  scorePercentile: number | null;
  speedPercentile: number | null;
}

interface SubmitOptions {
  app: RankingApp;
  scorePercent: number;
  timeSeconds: number;
  spaceId: string;
  sessionId: string | null | undefined;
  submissionKey: string;
}

interface RankingRow {
  id?: number;
  user_id: string;
  app: RankingApp;
  score: number;
  time_seconds: number;
  completed_at: string;
}

const submissionCache = new Map<string, Promise<RankingResult>>();
let benchmarkBackfillPromise: Promise<number> | null = null;

function workspaceDb(): any {
  const db = typeof window !== 'undefined' ? (window as any).__workspaceDb : null;
  if (!db?.from) throw new Error('Workspace credentials are not ready.');
  return db;
}

function clampScore(value: unknown): number {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function clampTime(value: unknown): number {
  return Math.max(1, Math.min(14400, Math.round(Number(value) || 1)));
}

function aggregateNumber(value: any): number | null {
  const candidates = [value, value?.data, value?.value, value?.count, value?.result];
  for (const candidate of candidates) {
    const number = Number(candidate);
    if (Number.isFinite(number) && number >= 0) return number;
  }
  return null;
}

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

async function rankingCounts(app: RankingApp, score: number, timeSeconds: number): Promise<RankingResult> {
  const db = workspaceDb();
  try {
    const [totalRaw, scoreRaw, speedRaw] = await Promise.all([
      db.from('user_performance_rankings', { shared: true }).eq('app', app).aggregate('id', 'count'),
      db
        .from('user_performance_rankings', { shared: true })
        .eq('app', app)
        .lt('score', score)
        .aggregate('id', 'count'),
      db
        .from('user_performance_rankings', { shared: true })
        .eq('app', app)
        .gt('time_seconds', timeSeconds)
        .aggregate('id', 'count'),
    ]);
    const total = aggregateNumber(totalRaw);
    const beatenScore = aggregateNumber(scoreRaw);
    const beatenSpeed = aggregateNumber(speedRaw);
    if (total != null && beatenScore != null && beatenSpeed != null) {
      const sufficient = total >= MIN_RANKING_RECORDS;
      return {
        totalRecords: total,
        sufficientData: sufficient,
        scorePercentile: sufficient ? Math.round((beatenScore / total) * 100) : null,
        speedPercentile: sufficient ? Math.round((beatenSpeed / total) * 100) : null,
      };
    }
  } catch {
    // Older WorkspaceDB clients may not expose aggregate on a filtered query.
    // Fall back to a bounded shared read of the ranking table only.
  }

  const response = await db
    .from('user_performance_rankings', { shared: true })
    .eq('app', app)
    .limit(1000)
    .get();
  const rows = rowsOf(response);
  const total = rows.length;
  const sufficient = total >= MIN_RANKING_RECORDS;
  return {
    totalRecords: total,
    sufficientData: sufficient,
    scorePercentile: sufficient
      ? Math.round((rows.filter((row) => Number(row.score) < score).length / total) * 100)
      : null,
    speedPercentile: sufficient
      ? Math.round((rows.filter((row) => Number(row.time_seconds) > timeSeconds).length / total) * 100)
      : null,
  };
}

/** The account identity convention shared with usage events and aptitude history. */
export function resolveRankingUserId(spaceId: string, sessionId: string | null | undefined): string {
  try {
    const stored = localStorage.getItem(`space_session_${spaceId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
        return `email:${parsed.email.toLowerCase().trim()}`;
      }
    }
  } catch {
    // Storage unavailable — use the device/session key below.
  }
  const match = typeof document !== 'undefined' ? document.cookie.match(/(?:^|;\s*)audos_vid=([^;]+)/) : null;
  return `device:${(match && match[1]) || sessionId || 'unknown'}`;
}

/** Record one completion and return its score and speed percentiles. */
export function submitPerformanceRecord(options: SubmitOptions): Promise<RankingResult> {
  const cached = submissionCache.get(options.submissionKey);
  if (cached) return cached;

  const promise = (async () => {
    const db = workspaceDb();
    const score = clampScore(options.scorePercent);
    const timeSeconds = clampTime(options.timeSeconds);
    await db.from('user_performance_rankings').insert({
      user_id: resolveRankingUserId(options.spaceId || WORKSPACE_ID, options.sessionId),
      app: options.app,
      score,
      time_seconds: timeSeconds,
      completed_at: new Date().toISOString(),
    });
    try {
      // Nudge any open readiness view (lib/readinessScore.ts) to recompute.
      window.dispatchEvent(new CustomEvent('casemate:readiness-updated'));
    } catch {
      // Non-browser environment — readiness views recompute on mount anyway.
    }
    return rankingCounts(options.app, score, timeSeconds);
  })().catch((error) => {
    submissionCache.delete(options.submissionKey);
    throw error;
  });

  submissionCache.set(options.submissionKey, promise);
  return promise;
}

function completedAtOf(row: any): string {
  const raw = row.completed_on || row.completed_at || row.created_at;
  const time = new Date(raw || Date.now()).getTime();
  return new Date(Number.isFinite(time) ? time : Date.now()).toISOString();
}

function elapsedBetween(row: any): number {
  const end = new Date(row.completed_on || row.completed_at || Date.now()).getTime();
  const start = new Date(row.created_at || end - 1000).getTime();
  return clampTime((end - start) / 1000);
}

async function sourceRows(app: RankingApp): Promise<RankingRow[]> {
  const db = workspaceDb();
  if (app === 'case_pool') {
    const response = await db
      .from('case_practice_cases', { shared: true })
      .eq('status', 'completed')
      .limit(1000)
      .get();
    return rowsOf(response)
      .filter((row) => Number.isFinite(Number(row.score)))
      .map((row) => ({
        user_id: `legacy:case_pool:${row.id}`,
        app,
        score: clampScore(Number(row.score) * 20),
        time_seconds: elapsedBetween(row),
        completed_at: completedAtOf(row),
      }));
  }

  if (app === 'case_drill') {
    const response = await db
      .from('micro_drills', { shared: true })
      .eq('status', 'completed')
      .limit(1000)
      .get();
    return rowsOf(response)
      .filter((row) => Number.isFinite(Number(row.score)) && Number.isFinite(Number(row.elapsed_seconds)))
      .map((row) => ({
        user_id: `legacy:case_drill:${row.id}`,
        app,
        score: clampScore(Number(row.score) * 20),
        time_seconds: clampTime(row.elapsed_seconds),
        completed_at: completedAtOf(row),
      }));
  }

  const response = await db.from('aptitude_attempts', { shared: true }).limit(1000).get();
  return rowsOf(response)
    .filter((row) => Number.isFinite(Number(row.score)) && Number.isFinite(Number(row.duration_seconds)))
    .map((row) => ({
      user_id: `legacy:aptitude_test:${row.id}`,
      app,
      score: clampScore(
        row.percent != null ? row.percent : (Number(row.score) / Math.max(1, Number(row.total))) * 100,
      ),
      time_seconds: clampTime(row.duration_seconds),
      completed_at: completedAtOf(row),
    }));
}

/**
 * Founder-only migration helper. It copies historical completed results into
 * the ranking pool once, without duplicating rows already backfilled or a
 * freshly submitted row with the same completion timestamp.
 */
export function ensurePerformanceBenchmarkHistory(): Promise<number> {
  if (benchmarkBackfillPromise) return benchmarkBackfillPromise;
  benchmarkBackfillPromise = (async () => {
    const db = workspaceDb();
    const currentResponse = await db
      .from('user_performance_rankings', { shared: true })
      .limit(1000)
      .get();
    const current = rowsOf(currentResponse);
    const existingLegacyKeys = new Set(
      current.map((row) => String(row.user_id || '')).filter((key) => key.startsWith('legacy:')),
    );
    const sources = (
      await Promise.all(
        (['case_pool', 'case_drill', 'aptitude_test'] as RankingApp[]).map((app) => sourceRows(app)),
      )
    ).flat();

    const pending = sources.filter((row) => {
      if (existingLegacyKeys.has(row.user_id)) return false;
      const completed = new Date(row.completed_at).getTime();
      return !current.some((existing) => {
        if (existing.app !== row.app || Number(existing.score) !== row.score) return false;
        const existingCompleted = new Date(existing.completed_at || existing.created_at).getTime();
        return Number.isFinite(existingCompleted) && Math.abs(existingCompleted - completed) <= 30000;
      });
    });

    if (pending.length > 0) {
      await db.from('user_performance_rankings').bulkInsert(
        pending.map((row) => ({
          user_id: row.user_id,
          app: row.app,
          score: row.score,
          time_seconds: row.time_seconds,
          completed_at: row.completed_at,
        })),
      );
    }
    return pending.length;
  })().catch((error) => {
    benchmarkBackfillPromise = null;
    throw error;
  });
  return benchmarkBackfillPromise;
}
