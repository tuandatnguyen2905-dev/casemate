// Casemate — personalized prep roadmap (the "My Roadmap" feature).
//
// Generated from the "Generate My Roadmap" button inside the Your Direction
// "How to get there" panel: a week-by-week preparation plan paced toward the
// target program's application window (lib/programTimelines — never invented
// dates), scaled to the candidate's actual practice baseline (completed
// sessions in Case Pool, Case Drill, and the Aptitude Test), and saved to the
// prep_roadmaps WorkspaceDB table keyed to the v1.1 account identity
// ('email:<sign-in email>' when signed in, else 'device:<visitor id>') so it
// survives refreshes and re-logins and follows the account across devices.
//
// Progress vs targets is NEVER stored — the My Roadmap app recomputes it live
// from the three session tables, so it updates automatically as the candidate
// completes cases, drills, and tests in the other apps:
//   - Case Pool   -> case_practice_cases (status='completed', session-scoped —
//                    the same identity Case Pool's own history uses)
//   - Case Drill  -> micro_drills (status='completed', session-scoped)
//   - Aptitude    -> aptitude_attempts (shared read filtered by user_key,
//                    the same identity the Aptitude Test history uses)

import { findProgramTimeline, deadlineStatus, formatDateVN } from './programTimelines';
import { resolveRankingUserId } from './performanceRankings';

const SPACE_ID = 'workspace-539150';
const WORKSPACE_UUID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';

/** Dispatched after a roadmap is saved so any mounted My Roadmap view refreshes. */
export const ROADMAP_UPDATED_EVENT = 'casemate:roadmap-updated';

/** Dock app id of the My Roadmap app (config.json registration). */
export const ROADMAP_APP_ID = 'my-roadmap';

const MS_PER_DAY = 86400000;

// Founder-locked baseline weekly targets (beginner level, per the build brief):
// 2 full Case Pool cases, 5 Case Drill micro-drills, 1 Aptitude Test per week.
const BASE_TARGETS: Record<RoadmapLevel, { cases: number; drills: number; tests: number }> = {
  beginner: { cases: 2, drills: 5, tests: 1 },
  intermediate: { cases: 3, drills: 6, tests: 1 },
  advanced: { cases: 4, drills: 8, tests: 2 },
};

export type RoadmapLevel = 'beginner' | 'intermediate' | 'advanced';

export interface RoadmapBaselineApp {
  completed: number;
  /** Average score normalized to 0-100 across completed sessions, when any exist. */
  avg_score: number | null;
}

export interface RoadmapBaseline {
  level: RoadmapLevel;
  total_sessions: number;
  case_pool: RoadmapBaselineApp;
  case_drill: RoadmapBaselineApp;
  aptitude_test: RoadmapBaselineApp;
}

export interface RoadmapWeek {
  /** 1-based week number. */
  week: number;
  /** ISO 'YYYY-MM-DD' — Monday of this week. */
  start_date: string;
  /** ISO 'YYYY-MM-DD' — Sunday of this week (inclusive). */
  end_date: string;
  /** Phase theme label, e.g. 'Foundation'. */
  theme: string;
  /** Phase index 1-4, for grouping/coloring. */
  phase: number;
  case_pool_target: number;
  case_drill_target: number;
  aptitude_target: number;
}

export interface SavedRoadmap {
  id: number;
  user_key: string;
  email: string | null;
  target_program: string;
  target_company: string | null;
  match_percent: number | null;
  window_kind: 'verified' | 'estimated' | 'unknown' | string | null;
  window_label: string | null;
  anchor_date: string | null;
  start_date: string;
  total_weeks: number;
  baseline_json: RoadmapBaseline | null;
  plan_json: RoadmapWeek[];
  created_at?: string;
}

export interface WeekProgress {
  case_pool_done: number;
  case_drill_done: number;
  aptitude_done: number;
}

function workspaceDb(): any {
  const db = typeof window !== 'undefined' ? (window as any).__workspaceDb : null;
  if (!db?.from) throw new Error('Workspace credentials are not ready.');
  return db;
}

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

function currentSpaceId(): string {
  const w = typeof window !== 'undefined' ? (window as any) : null;
  return (w && (w.__APP_ID__ || w.__SPACE_ID__)) || SPACE_ID;
}

class RoadmapSignInRequiredError extends Error {
  readonly code = 'SESSION_VERIFICATION_REQUIRED';

  constructor() {
    super('Please sign in again to generate your roadmap.');
    this.name = 'RoadmapSignInRequiredError';
  }
}

/** Whether a roadmap operation failed because the browser no longer has a verified platform session. */
export function isRoadmapSignInRequired(error: unknown): boolean {
  const candidate = error as { code?: unknown; status?: unknown; message?: unknown } | null;
  return error instanceof RoadmapSignInRequiredError
    || candidate?.code === 'SESSION_VERIFICATION_REQUIRED'
    || (candidate?.status === 401 && /session|sign in/i.test(String(candidate?.message || '')));
}

function storedSessionFor(spaceId: string): Record<string, any> | null {
  try {
    const stored = localStorage.getItem(`space_session_${spaceId}`);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Revalidate the canonical session immediately before the roadmap's private
 * reads and write. check-session re-issues the platform's HttpOnly session
 * cookie, which is the identity WorkspaceDB verifies in addition to its
 * public workspace token. This works identically for email and OAuth sessions.
 */
async function ensureVerifiedRoadmapSession(sessionId?: string | null): Promise<string> {
  const spaceId = currentSpaceId();
  const stored = storedSessionFor(spaceId);
  const storedId = stored?.workspaceSessionId || stored?.sessionId || stored?.id;
  const candidateId = typeof sessionId === 'string' && sessionId ? sessionId : storedId;
  if (typeof candidateId !== 'string' || !candidateId.startsWith('wses_') || stored?.verified === false) {
    throw new RoadmapSignInRequiredError();
  }

  const sharedSpacePath = `/space/${encodeURIComponent(spaceId)}`;
  const onSharedSpacePath = window.location.pathname === sharedSpacePath
    || window.location.pathname.startsWith(`${sharedSpacePath}/`);
  const query = new URLSearchParams({
    workspaceId: WORKSPACE_UUID,
    spaceId,
    sessionUuid: candidateId,
  });
  const response = await fetch(
    onSharedSpacePath
      ? `${sharedSpacePath}/check-session`
      : `/api/auth/otp/space/check-session?${query.toString()}`,
    { credentials: 'include', cache: 'no-store' },
  );
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || result?.code === 'SESSION_VERIFICATION_REQUIRED') {
      throw new RoadmapSignInRequiredError();
    }
    throw new Error(result?.error || 'Could not verify your session. Please try again.');
  }

  const authorized = result?.verified === true
    || (result?.authorized === true && result?.identityMode === 'legacy_registration');
  if (!authorized) throw new RoadmapSignInRequiredError();

  const canonicalId = typeof result?.canonicalSessionId === 'string'
    ? result.canonicalSessionId
    : candidateId;
  const storedEmail = typeof stored?.email === 'string' ? stored.email.toLowerCase().trim() : '';
  const verifiedEmail = typeof result?.email === 'string' ? result.email.toLowerCase().trim() : '';
  if (storedEmail && verifiedEmail && storedEmail !== verifiedEmail) {
    throw new RoadmapSignInRequiredError();
  }
  return canonicalId;
}

/** Sign-in email for the founder-follow-up column, from the same storage the account identity uses. */
function currentSignInEmail(spaceId: string): string | null {
  try {
    const stored = localStorage.getItem(`space_session_${spaceId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
        return parsed.email.toLowerCase().trim();
      }
    }
  } catch (e) {
    // Storage unavailable — email stays unknown.
  }
  return null;
}

export function resolveRoadmapIdentity(sessionId?: string | null): { userKey: string; email: string | null } {
  const spaceId = currentSpaceId();
  return { userKey: resolveRankingUserId(spaceId, sessionId || null), email: currentSignInEmail(spaceId) };
}

function toIso(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function parseIso(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value || '').trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Monday of the week containing `date` (local time). */
function mondayOf(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

/* ----------------------------------------------------------------------------
 * Application-window resolution (real timeline data, never invented)
 * --------------------------------------------------------------------------*/

export interface RoadmapWindowInfo {
  kind: 'verified' | 'estimated' | 'unknown';
  /** Ready-to-render window summary for the roadmap header. */
  label: string;
  /** ISO date the plan is paced toward (open date, or close date when already open). */
  anchorDateIso: string | null;
  /** Weeks the plan should cover (already includes the ~2-week pre-window buffer). */
  planWeeks: number;
}

const FALLBACK_WEEKS = 12;
const MIN_WEEKS = 4;
const MAX_WEEKS = 24;

function clampWeeks(weeks: number): number {
  return Math.max(MIN_WEEKS, Math.min(MAX_WEEKS, Math.round(weeks)));
}

/**
 * Resolve the target program's application window from the founder-verified
 * timeline record and derive how many weeks the plan should cover: from today
 * until ~2 weeks before the window opens — or until the close date when the
 * window is already open — or a fixed 12-week plan when nothing is verified.
 */
export function resolveRoadmapWindow(company: string, program: string, now: Date = new Date()): RoadmapWindowInfo {
  const record = findProgramTimeline(company, program || company);
  const status = deadlineStatus(record, now);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (status.kind === 'countdown') {
    // Concrete verified dates. If the window hasn't opened yet, pace toward
    // the open date minus 2 weeks; if it's already open, every remaining week
    // until the deadline counts.
    const win = record?.applicationWindow || null;
    const openDate = win?.openDate ? parseIso(win.openDate) : null;
    if (openDate && openDate.getTime() > today.getTime()) {
      const daysToOpen = Math.round((openDate.getTime() - today.getTime()) / MS_PER_DAY);
      return {
        kind: 'verified',
        label: `Opens ${formatDateVN(win!.openDate!)} — closes ${status.closeDateLabel} (verified)`,
        anchorDateIso: win!.openDate!,
        planWeeks: clampWeeks(daysToOpen / 7 - 2),
      };
    }
    const closeDate = win?.closeDate ? parseIso(win.closeDate) : null;
    const daysToClose = closeDate ? Math.round((closeDate.getTime() - today.getTime()) / MS_PER_DAY) : 0;
    return {
      kind: 'verified',
      label: `Open now — closes ${status.closeDateLabel} (${status.label || 'verified'})`,
      anchorDateIso: win?.closeDate || null,
      planWeeks: clampWeeks(daysToClose / 7),
    };
  }

  if (status.kind === 'estimated' && status.estimatedOpenDateLabel && status.daysToEstimatedOpen != null) {
    // Month-level estimate anchored to a display date (founder directive
    // 2026-08-09) — plan until ~2 weeks before that anchor.
    const anchor = new Date(today.getTime() + status.daysToEstimatedOpen * MS_PER_DAY);
    return {
      kind: 'estimated',
      label: `Expected to open ${status.estimatedOpenDateLabel} (estimated from the most recent cycle)`,
      anchorDateIso: toIso(anchor),
      planWeeks: clampWeeks(status.daysToEstimatedOpen / 7 - 2),
    };
  }

  if (status.kind === 'estimated') {
    return {
      kind: 'estimated',
      label: status.openText || status.closeText || 'Estimated window from the most recent cycle',
      anchorDateIso: null,
      planWeeks: FALLBACK_WEEKS,
    };
  }

  if (status.kind === 'closed') {
    return {
      kind: 'estimated',
      label: `This cycle closed ${status.closeDateLabel} — plan targets the next cycle`,
      anchorDateIso: null,
      planWeeks: FALLBACK_WEEKS,
    };
  }

  return {
    kind: 'unknown',
    label: 'Application window not verified yet — standard 12-week plan',
    anchorDateIso: null,
    planWeeks: FALLBACK_WEEKS,
  };
}

/* ----------------------------------------------------------------------------
 * Performance baseline (actual usage history, session/user scoped)
 * --------------------------------------------------------------------------*/

function averagePercent(values: number[]): number | null {
  if (values.length === 0) return null;
  const sum = values.reduce((total, v) => total + v, 0);
  return Math.round(sum / values.length);
}

/**
 * Pull the candidate's current baseline from their real session history. Each
 * source uses the same identity its own app uses, so the numbers here always
 * match what the candidate sees in those apps. No history = beginner.
 */
export async function loadRoadmapBaseline(sessionId?: string | null): Promise<RoadmapBaseline> {
  const db = workspaceDb();
  const { userKey } = resolveRoadmapIdentity(sessionId);

  const [casesRes, drillsRes, aptitudeRes] = await Promise.all([
    db.from('case_practice_cases').eq('status', 'completed').limit(500).get().catch(() => []),
    db.from('micro_drills').eq('status', 'completed').limit(500).get().catch(() => []),
    db.from('aptitude_attempts', { shared: true }).eq('user_key', userKey).limit(500).get().catch(() => []),
  ]);

  const caseRows = rowsOf(casesRes);
  const drillRows = rowsOf(drillsRes);
  const aptitudeRows = rowsOf(aptitudeRes);

  const casePool: RoadmapBaselineApp = {
    completed: caseRows.length,
    avg_score: averagePercent(
      caseRows.map((row) => Number(row.score) * 20).filter((v) => Number.isFinite(v) && v >= 0),
    ),
  };
  const caseDrill: RoadmapBaselineApp = {
    completed: drillRows.length,
    avg_score: averagePercent(
      drillRows.map((row) => Number(row.score) * 20).filter((v) => Number.isFinite(v) && v >= 0),
    ),
  };
  const aptitude: RoadmapBaselineApp = {
    completed: aptitudeRows.length,
    avg_score: averagePercent(
      aptitudeRows
        .map((row) => (row.percent != null ? Number(row.percent) : (Number(row.score) / Math.max(1, Number(row.total))) * 100))
        .filter((v) => Number.isFinite(v) && v >= 0),
    ),
  };

  const totalSessions = casePool.completed + caseDrill.completed + aptitude.completed;
  const level: RoadmapLevel = totalSessions >= 15 ? 'advanced' : totalSessions >= 5 ? 'intermediate' : 'beginner';

  return {
    level,
    total_sessions: totalSessions,
    case_pool: casePool,
    case_drill: caseDrill,
    aptitude_test: aptitude,
  };
}

/* ----------------------------------------------------------------------------
 * Week-by-week plan construction
 * --------------------------------------------------------------------------*/

interface PhaseSpec {
  theme: string;
  /** Share of total weeks (normalized). */
  share: number;
  /** Multipliers applied to the level's base weekly targets. */
  cases: number;
  drills: number;
  tests: number;
}

// Ramp: light full-case load while fundamentals build, drill-heavy middle,
// case-heavy late phase, then a short polish block with extra aptitude reps.
const PHASES: PhaseSpec[] = [
  { theme: 'Foundation', share: 0.25, cases: 0.5, drills: 1.2, tests: 1 },
  { theme: 'Speed & Accuracy', share: 0.3, cases: 1, drills: 1.4, tests: 1 },
  { theme: 'Full Case Practice', share: 0.3, cases: 1.5, drills: 1, tests: 1 },
  { theme: 'Final Polish & Mock Runs', share: 0.15, cases: 1.25, drills: 0.8, tests: 2 },
];

function targetOf(base: number, multiplier: number, intensity: number): number {
  return Math.max(1, Math.round(base * multiplier * intensity));
}

/**
 * Build the week-by-week plan. Weeks are Monday-aligned starting from the
 * generation week. A short runway (≤ 8 weeks) raises weekly intensity ~25% so
 * total preparation volume stays realistic.
 */
export function buildWeeklyPlan(totalWeeks: number, level: RoadmapLevel, startMonday: Date): RoadmapWeek[] {
  const weeks = clampWeeks(totalWeeks);
  const base = BASE_TARGETS[level];
  const intensity = weeks <= 8 ? 1.25 : 1;

  // Distribute weeks across phases proportionally (every phase gets ≥ 1 week).
  const counts = PHASES.map((phase) => Math.max(1, Math.floor(weeks * phase.share)));
  let assigned = counts.reduce((sum, count) => sum + count, 0);
  let cursor = PHASES.length - 2; // grow/shrink middle phases first
  while (assigned < weeks) {
    counts[(cursor = (cursor + 1) % PHASES.length)] += 1;
    assigned += 1;
  }
  while (assigned > weeks) {
    const idx = counts.findIndex((count) => count > 1);
    if (idx < 0) break;
    counts[idx] -= 1;
    assigned -= 1;
  }

  const plan: RoadmapWeek[] = [];
  let weekNumber = 1;
  PHASES.forEach((phase, phaseIndex) => {
    for (let i = 0; i < counts[phaseIndex]; i++) {
      const start = new Date(startMonday.getTime() + (weekNumber - 1) * 7 * MS_PER_DAY);
      const end = new Date(start.getTime() + 6 * MS_PER_DAY);
      plan.push({
        week: weekNumber,
        start_date: toIso(start),
        end_date: toIso(end),
        theme: phase.theme,
        phase: phaseIndex + 1,
        case_pool_target: targetOf(base.cases, phase.cases, intensity),
        case_drill_target: targetOf(base.drills, phase.drills, intensity),
        aptitude_target: targetOf(base.tests, phase.tests, intensity),
      });
      weekNumber += 1;
    }
  });
  return plan;
}

/* ----------------------------------------------------------------------------
 * Persistence
 * --------------------------------------------------------------------------*/

function parsePlanJson(value: unknown): RoadmapWeek[] {
  let parsed: any = value;
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch (e) {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((w: any) => w && typeof w === 'object' && Number.isFinite(Number(w.week)))
    .map((w: any) => ({
      week: Number(w.week),
      start_date: String(w.start_date || ''),
      end_date: String(w.end_date || ''),
      theme: String(w.theme || ''),
      phase: Number(w.phase) || 1,
      case_pool_target: Math.max(0, Number(w.case_pool_target) || 0),
      case_drill_target: Math.max(0, Number(w.case_drill_target) || 0),
      aptitude_target: Math.max(0, Number(w.aptitude_target) || 0),
    }))
    .sort((a, b) => a.week - b.week);
}

function parseBaselineJson(value: unknown): RoadmapBaseline | null {
  let parsed: any = value;
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch (e) {
      return null;
    }
  }
  if (!parsed || typeof parsed !== 'object') return null;
  return parsed as RoadmapBaseline;
}

function normalizeRow(row: any): SavedRoadmap | null {
  if (!row || typeof row !== 'object') return null;
  const plan = parsePlanJson(row.plan_json);
  if (plan.length === 0) return null;
  return {
    id: Number(row.id) || 0,
    user_key: String(row.user_key || ''),
    email: row.email ? String(row.email) : null,
    target_program: String(row.target_program || ''),
    target_company: row.target_company ? String(row.target_company) : null,
    match_percent: Number.isFinite(Number(row.match_percent)) ? Number(row.match_percent) : null,
    window_kind: row.window_kind ? String(row.window_kind) : null,
    window_label: row.window_label ? String(row.window_label) : null,
    anchor_date: row.anchor_date ? String(row.anchor_date).slice(0, 10) : null,
    start_date: String(row.start_date || '').slice(0, 10),
    total_weeks: Number(row.total_weeks) || plan.length,
    baseline_json: parseBaselineJson(row.baseline_json),
    plan_json: plan,
    created_at: row.created_at ? String(row.created_at) : undefined,
  };
}

/** Newest saved roadmap for the current account identity, or null. */
export async function loadLatestRoadmap(sessionId?: string | null): Promise<SavedRoadmap | null> {
  const db = workspaceDb();
  const { userKey } = resolveRoadmapIdentity(sessionId);
  const response = await db
    .from('prep_roadmaps', { shared: true })
    .eq('user_key', userKey)
    .orderBy('id', 'desc')
    .limit(1)
    .get();
  const rows = rowsOf(response);
  return rows.length > 0 ? normalizeRow(rows[0]) : null;
}

async function deleteVisibleRows(
  table: string,
  options?: { shared: true; filterColumn: string; filterValue: string },
): Promise<void> {
  const db = workspaceDb();
  let query = options ? db.from(table, { shared: true }) : db.from(table);
  if (options) query = query.eq(options.filterColumn, options.filterValue);
  const response = await query.limit(1000).get();
  const ids = rowsOf(response)
    .map((row) => Number(row?.id))
    .filter((id) => Number.isFinite(id) && id > 0);
  await Promise.all(ids.map((id) => (
    options ? db.from(table, { shared: true }).delete(id) : db.from(table).delete(id)
  )));
}

/**
 * Remove only the current candidate's fit, roadmap, and readiness state.
 * Practice history lives in separate tables and is deliberately untouched.
 */
export async function restartRoadmapJourney(sessionId?: string | null): Promise<void> {
  const { userKey } = resolveRoadmapIdentity(sessionId);
  await Promise.all([
    deleteVisibleRows('assessment_results'),
    deleteVisibleRows('fit_assessments'),
    deleteVisibleRows('assessment_flow_events'),
    deleteVisibleRows('prep_roadmaps', { shared: true, filterColumn: 'user_key', filterValue: userKey }),
    deleteVisibleRows('culture_fit_results', { shared: true, filterColumn: 'user_key', filterValue: userKey }),
    deleteVisibleRows('pending_mcq_answers', { shared: true, filterColumn: 'user_key', filterValue: userKey }),
    deleteVisibleRows('user_performance_rankings', { shared: true, filterColumn: 'user_id', filterValue: userKey }),
  ]);

  try {
    localStorage.removeItem(`casemate-function-first-v1:${sessionId || 'preview'}`);
    localStorage.removeItem(`casemate-roadmap-target:${sessionId || 'preview'}`);
  } catch (e) {
    // Server state is already reset; unavailable local storage cannot block navigation.
  }

  try {
    window.dispatchEvent(new CustomEvent('casemate:restart-fit-assessment'));
    window.dispatchEvent(new CustomEvent(ROADMAP_UPDATED_EVENT));
    window.dispatchEvent(new CustomEvent('casemate:readiness-updated'));
  } catch (e) {
    // Non-browser environment.
  }
}

export interface GenerateRoadmapInput {
  targetProgram: string;
  targetCompany?: string | null;
  matchPercent?: number | null;
  sessionId?: string | null;
}

/**
 * Generate a personalized roadmap and save it (regenerate = a newer row that
 * supersedes the previous one). Returns the saved roadmap ready to render.
 */
export async function generateAndSaveRoadmap(input: GenerateRoadmapInput): Promise<SavedRoadmap> {
  // Rebind the verified platform session before any private WorkspaceDB read or
  // write. The SDK attaches its workspace token; the HttpOnly cookie renewed
  // here supplies the user identity required by private-write enforcement.
  const verifiedSessionId = await ensureVerifiedRoadmapSession(input.sessionId);
  const db = workspaceDb();
  const { userKey, email } = resolveRoadmapIdentity(verifiedSessionId);
  const now = new Date();

  const [baseline, windowInfo] = await Promise.all([
    loadRoadmapBaseline(verifiedSessionId),
    Promise.resolve(resolveRoadmapWindow(input.targetCompany || input.targetProgram, input.targetProgram, now)),
  ]);

  const startMonday = mondayOf(now);
  const plan = buildWeeklyPlan(windowInfo.planWeeks, baseline.level, startMonday);

  const record = {
    user_key: userKey,
    email,
    target_program: input.targetProgram,
    target_company: input.targetCompany || null,
    match_percent: input.matchPercent != null && Number.isFinite(Number(input.matchPercent)) ? Math.round(Number(input.matchPercent)) : null,
    window_kind: windowInfo.kind,
    window_label: windowInfo.label,
    anchor_date: windowInfo.anchorDateIso,
    start_date: toIso(startMonday),
    total_weeks: plan.length,
    baseline_json: baseline,
    plan_json: plan,
  };

  await db.from('prep_roadmaps').insert(record);

  try {
    window.dispatchEvent(new CustomEvent(ROADMAP_UPDATED_EVENT));
  } catch (e) {
    // Non-browser environment — the app reloads on mount anyway.
  }

  // Read the row back so the caller gets the server-stamped id/created_at.
  const saved = await loadLatestRoadmap(verifiedSessionId);
  if (saved) return saved;
  // Extremely defensive fallback: render from the local record.
  return normalizeRow({ ...record, id: 0 }) as SavedRoadmap;
}

/* ----------------------------------------------------------------------------
 * Live progress vs weekly targets
 * --------------------------------------------------------------------------*/

function completionTime(row: any): number {
  const raw = row.completed_on || row.completed_at || row.updated_at || row.created_at;
  const time = new Date(raw || 0).getTime();
  return Number.isFinite(time) ? time : 0;
}

/**
 * Count the candidate's completed sessions inside each roadmap week. Pulled
 * live from the same tables the practice apps write, so finishing a case,
 * drill, or test anywhere updates the tracker automatically.
 */
export async function loadRoadmapProgress(
  roadmap: SavedRoadmap,
  sessionId?: string | null,
): Promise<Record<number, WeekProgress>> {
  const db = workspaceDb();
  const { userKey } = resolveRoadmapIdentity(sessionId);

  const [casesRes, drillsRes, aptitudeRes] = await Promise.all([
    db.from('case_practice_cases').eq('status', 'completed').limit(500).get().catch(() => []),
    db.from('micro_drills').eq('status', 'completed').limit(500).get().catch(() => []),
    db.from('aptitude_attempts', { shared: true }).eq('user_key', userKey).limit(500).get().catch(() => []),
  ]);

  const buckets: Record<number, WeekProgress> = {};
  roadmap.plan_json.forEach((week) => {
    buckets[week.week] = { case_pool_done: 0, case_drill_done: 0, aptitude_done: 0 };
  });

  const weekOf = (time: number): RoadmapWeek | null => {
    if (!time) return null;
    for (const week of roadmap.plan_json) {
      const start = parseIso(week.start_date);
      const end = parseIso(week.end_date);
      if (!start || !end) continue;
      const endOfDay = end.getTime() + MS_PER_DAY - 1;
      if (time >= start.getTime() && time <= endOfDay) return week;
    }
    return null;
  };

  rowsOf(casesRes).forEach((row) => {
    const week = weekOf(completionTime(row));
    if (week) buckets[week.week].case_pool_done += 1;
  });
  rowsOf(drillsRes).forEach((row) => {
    const week = weekOf(completionTime(row));
    if (week) buckets[week.week].case_drill_done += 1;
  });
  rowsOf(aptitudeRes).forEach((row) => {
    const week = weekOf(completionTime(row));
    if (week) buckets[week.week].aptitude_done += 1;
  });

  return buckets;
}

/* ----------------------------------------------------------------------------
 * Presentation helpers shared by the app + panel
 * --------------------------------------------------------------------------*/

export interface RoadmapMonth {
  month: number; // 1-based
  label: string; // 'Month 1'
  weeks: RoadmapWeek[];
}

/** Group plan weeks into months (4-week blocks) for the summary view. */
export function groupWeeksIntoMonths(plan: RoadmapWeek[]): RoadmapMonth[] {
  const months: RoadmapMonth[] = [];
  plan.forEach((week, index) => {
    const monthIndex = Math.floor(index / 4);
    if (!months[monthIndex]) {
      months[monthIndex] = { month: monthIndex + 1, label: `Month ${monthIndex + 1}`, weeks: [] };
    }
    months[monthIndex].weeks.push(week);
  });
  return months;
}

/** 1-based week number containing `now`, or null when outside the plan. */
export function currentWeekNumber(roadmap: SavedRoadmap, now: Date = new Date()): number | null {
  const time = now.getTime();
  for (const week of roadmap.plan_json) {
    const start = parseIso(week.start_date);
    const end = parseIso(week.end_date);
    if (!start || !end) continue;
    if (time >= start.getTime() && time <= end.getTime() + MS_PER_DAY - 1) return week.week;
  }
  return null;
}

/** 'DD/MM' short label for week chips. */
export function shortDateLabel(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
  return m ? `${m[3]}/${m[2]}` : String(iso || '');
}
