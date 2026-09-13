// Casemate — Program Readiness Score (holistic cross-app performance).
//
// One score out of 100 per user, aggregated from the SAME shared ranking pool
// the per-app percentiles use (user_performance_rankings, written on every
// completed scored session in Case Pool, Case Drill, and the Aptitude Test):
//   - Case Pool      -> average normalized score, weight 40%
//   - Case Drill     -> average normalized score, weight 35%
//   - Aptitude Test  -> average accuracy,         weight 25%
// Apps the user never attempted are EXCLUDED and the remaining weights are
// rebalanced proportionally — an untried app never penalises the score, the
// UI just prompts them to complete it for a more accurate picture.
//
// The percentile is computed the same way as the per-app percentiles (share
// of the pool with a strictly lower value), but over PER-USER readiness
// scores instead of per-attempt rows: every user_id with at least one ranked
// result gets one readiness score, and "You scored higher than X% of users"
// compares against all of them. Historical backfilled attempts (user_id
// 'legacy:<app>:<row>') each count as one anonymous benchmark user, exactly
// as they already do in the per-app pools.

import { resolveRankingUserId } from './performanceRankings';
import type { RankingApp } from './performanceRankings';

/** Relative weights per app (rebalanced proportionally over attempted apps). */
export const READINESS_WEIGHTS: Record<RankingApp, number> = {
  case_pool: 40,
  case_drill: 35,
  aptitude_test: 25,
};

export const READINESS_APP_ORDER: RankingApp[] = ['case_pool', 'case_drill', 'aptitude_test'];

/** Dock app ids + display labels for deep links and copy. */
export const READINESS_APP_META: Record<RankingApp, { label: string; dockAppId: string }> = {
  case_pool: { label: 'Case Pool', dockAppId: 'case-drill-log' },
  case_drill: { label: 'Case Drill', dockAppId: 'case-drill' },
  aptitude_test: { label: 'Aptitude Test', dockAppId: 'aptitude-test' },
};

/** The percentile only displays once this many users have a readiness score. */
export const MIN_READINESS_POOL = 5;

/** Dispatched after a new performance record lands so open readiness views refresh. */
export const READINESS_UPDATED_EVENT = 'casemate:readiness-updated';

export interface ReadinessTier {
  label: string;
  description: string;
  min: number;
  max: number;
}

/** Pass-likelihood tiers, mapped straight from the rounded 0-100 score. */
export const READINESS_TIERS: ReadinessTier[] = [
  { label: 'Early Stage', description: 'Significant prep required', min: 0, max: 39 },
  { label: 'On Track', description: 'Developing core skills', min: 40, max: 59 },
  { label: 'Strong', description: 'Competitive candidate', min: 60, max: 74 },
  { label: 'Very Strong', description: 'Well-positioned for top programs', min: 75, max: 89 },
  { label: 'Elite', description: 'Top-tier readiness', min: 90, max: 100 },
];

export function readinessTier(score: number): ReadinessTier {
  const rounded = Math.max(0, Math.min(100, Math.round(score)));
  return READINESS_TIERS.find((tier) => rounded >= tier.min && rounded <= tier.max) || READINESS_TIERS[0];
}

export interface AppAverage {
  attempts: number;
  averageScore: number;
}

export interface UserReadiness {
  userId: string;
  /** Weighted 0-100 readiness score over the apps this user has attempted. */
  score: number;
  apps: Partial<Record<RankingApp, AppAverage>>;
  appsWithResults: RankingApp[];
}

interface RankingRowLike {
  user_id?: unknown;
  app?: unknown;
  score?: unknown;
}

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

/**
 * Group raw ranking rows into one readiness score per user. Pure — the
 * founder dashboard reuses it on rows it already loaded.
 */
export function computeReadinessByUser(rows: RankingRowLike[]): Map<string, UserReadiness> {
  const totals = new Map<string, Map<RankingApp, { sum: number; count: number }>>();
  for (const row of rows) {
    const userId = typeof row?.user_id === 'string' ? row.user_id : '';
    const app = row?.app as RankingApp;
    const score = Number(row?.score);
    if (!userId || !READINESS_WEIGHTS[app] || !Number.isFinite(score)) continue;
    if (!totals.has(userId)) totals.set(userId, new Map());
    const perApp = totals.get(userId)!;
    const bucket = perApp.get(app) || { sum: 0, count: 0 };
    bucket.sum += Math.max(0, Math.min(100, score));
    bucket.count += 1;
    perApp.set(app, bucket);
  }

  const result = new Map<string, UserReadiness>();
  totals.forEach((perApp, userId) => {
    const apps: Partial<Record<RankingApp, AppAverage>> = {};
    let weightedSum = 0;
    let weightTotal = 0;
    READINESS_APP_ORDER.forEach((app) => {
      const bucket = perApp.get(app);
      if (!bucket || bucket.count === 0) return;
      const averageScore = bucket.sum / bucket.count;
      apps[app] = { attempts: bucket.count, averageScore };
      weightedSum += averageScore * READINESS_WEIGHTS[app];
      weightTotal += READINESS_WEIGHTS[app];
    });
    if (weightTotal === 0) return;
    result.set(userId, {
      userId,
      score: weightedSum / weightTotal,
      apps,
      appsWithResults: READINESS_APP_ORDER.filter((app) => apps[app]),
    });
  });
  return result;
}

export interface ReadinessBreakdownEntry {
  app: RankingApp;
  label: string;
  dockAppId: string;
  attempts: number;
  averageScore: number | null;
  /** Effective weight (%) after rebalancing over attempted apps; null when untried. */
  effectiveWeight: number | null;
  baseWeight: number;
}

export interface ReadinessOverview {
  /** Null when this user has no ranked results in any app yet. */
  score: number | null;
  tier: ReadinessTier | null;
  /** Share of users (0-100) with a strictly lower readiness score; null until the pool is big enough. */
  percentile: number | null;
  /** Users (including anonymous historical benchmarks) that hold a readiness score. */
  poolUserCount: number;
  sufficientData: boolean;
  breakdown: ReadinessBreakdownEntry[];
  missingApps: RankingApp[];
  userId: string;
}

/** Percentile of `score` within `poolScores` (which includes the user's own score). */
export function readinessPercentile(poolScores: number[], score: number): number {
  if (poolScores.length === 0) return 0;
  const beaten = poolScores.filter((peer) => peer < score).length;
  return Math.round((beaten / poolScores.length) * 100);
}

function buildOverview(byUser: Map<string, UserReadiness>, userId: string): ReadinessOverview {
  const mine = byUser.get(userId) || null;
  const poolScores = Array.from(byUser.values()).map((user) => user.score);
  const sufficient = poolScores.length >= MIN_READINESS_POOL;
  const breakdown: ReadinessBreakdownEntry[] = [];
  const attempted = mine ? mine.appsWithResults : [];
  const weightTotal = attempted.reduce((sum, app) => sum + READINESS_WEIGHTS[app], 0);
  READINESS_APP_ORDER.forEach((app) => {
    const meta = READINESS_APP_META[app];
    const average = mine?.apps[app];
    breakdown.push({
      app,
      label: meta.label,
      dockAppId: meta.dockAppId,
      attempts: average?.attempts || 0,
      averageScore: average ? average.averageScore : null,
      effectiveWeight: average && weightTotal > 0 ? Math.round((READINESS_WEIGHTS[app] / weightTotal) * 100) : null,
      baseWeight: READINESS_WEIGHTS[app],
    });
  });
  return {
    score: mine ? Math.round(mine.score) : null,
    tier: mine ? readinessTier(mine.score) : null,
    percentile: mine && sufficient ? readinessPercentile(poolScores, mine.score) : null,
    poolUserCount: poolScores.length,
    sufficientData: sufficient,
    breakdown,
    missingApps: READINESS_APP_ORDER.filter((app) => !attempted.includes(app)),
    userId,
  };
}

const PAGE_SIZE = 1000;
const MAX_ROWS = 10000;

async function loadAllRankingRows(): Promise<any[]> {
  const db = typeof window !== 'undefined' ? (window as any).__workspaceDb : null;
  if (!db?.from) throw new Error('Workspace credentials are not ready.');
  let all: any[] = [];
  let offset = 0;
  while (offset < MAX_ROWS) {
    const response = await db
      .from('user_performance_rankings', { shared: true })
      .orderBy('id', 'asc')
      .limit(PAGE_SIZE)
      .offset(offset)
      .get();
    const page = rowsOf(response);
    all = all.concat(page);
    if (page.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }
  return all;
}

/**
 * Load the current user's readiness overview from the shared ranking pool.
 * Reads only — every completed session was already recorded by the result
 * screens through lib/performanceRankings.ts, so the score updates by itself
 * whenever a new case, drill, or test lands in the pool.
 */
export async function loadReadinessOverview(
  spaceId: string,
  sessionId: string | null | undefined,
): Promise<ReadinessOverview> {
  const rows = await loadAllRankingRows();
  const byUser = computeReadinessByUser(rows);
  return buildOverview(byUser, resolveRankingUserId(spaceId, sessionId));
}
