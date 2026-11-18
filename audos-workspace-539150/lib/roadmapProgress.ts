// Casemate — My Roadmap progress tracking.
//
// Turns the saved roadmap (lib/prepRoadmap) plus the learner's completed
// practice into weekly progress:
//   - Week 1 starts on the learner's chosen date, or by default on the day the
//     roadmap was created; weeks are consecutive 7-day blocks from that date.
//     Targets, themes and phase boundaries always come from plan_json.
//   - A session counts only inside the week it was completed in.
//   - Each case, drill or test counts once: a retake of the same item is not
//     counted again, in that week or any later one.
//   - Nothing here writes to a practice table; changing the start date only
//     re-buckets the same session history.
//
// Session sources:
//   Case Pool     case_practice_cases (completed) + case_structure_trees
//                 submissions whose case_id starts with 'pool-'
//   Case Drill    drill_library_attempts (completed) + micro_drills (completed)
//                 + the remaining case_structure_trees submissions (Structures)
//   Aptitude Test aptitude_attempts (shared, filtered by account user_key)
// Case Pool and Case Drill rows are owned by workspace session, and a re-login
// issues a new session id. For a signed-in account they come from the
// casemate-roadmap-save-v1 server function (action 'practice_sessions'), which
// returns the verified email's rows across all of its sessions. The current
// session's own rows (the scope the practice apps use) are the fallback.

import { resolveRoadmapIdentity } from './prepRoadmap';
import type { RoadmapWeek, SavedRoadmap, WeekProgress } from './prepRoadmap';

const ROADMAP_SAVE_HOOK = '/api/hooks/execute/workspace-539150/casemate-roadmap-save-v1';

/** The Week 1 start can be moved back at most 12 weeks and forward at most 14 days. */
export const START_DATE_PAST_DAYS = 84;
export const START_DATE_FUTURE_DAYS = 14;

export type PracticeTrack = 'case_pool' | 'case_drill' | 'aptitude';

export interface PracticeSession {
  track: PracticeTrack;
  /** Identifies the case, drill or test so retakes are recognised. */
  key: string;
  /** Completion time in epoch ms. */
  time: number;
}

export type PlanStatus =
  | { kind: 'before'; startsOn: string }
  | { kind: 'active'; week: number }
  | { kind: 'complete'; endedOn: string };

export interface RoadmapPhase {
  index: number;
  name: string;
  weeks: RoadmapWeek[];
  startIso: string;
  endIso: string;
}

export type WeekStartBasis = 'roadmap_created' | 'profile_saved' | 'first_visit';

/* ----------------------------------------------------------------------------
 * Dates (local calendar days, 'YYYY-MM-DD')
 * --------------------------------------------------------------------------*/

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function parseIsoDate(value: string | null | undefined): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || '').trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (d.getFullYear() !== Number(m[1]) || d.getMonth() !== Number(m[2]) - 1 || d.getDate() !== Number(m[3])) return null;
  return d;
}

export function addDaysIso(iso: string, days: number): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return toIsoDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + days));
}

export function todayIso(now: Date = new Date()): string {
  return toIsoDate(now);
}

/** 'DD/MM/YYYY' label. */
export function fullDateLabel(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
  return m ? `${m[3]}/${m[2]}/${m[1]}` : String(iso || '');
}

function dayStart(iso: string): number {
  const d = parseIsoDate(iso);
  return d ? d.getTime() : NaN;
}

function timeOf(...values: unknown[]): number {
  for (const value of values) {
    if (value == null || value === '') continue;
    const time = new Date(value as string).getTime();
    if (Number.isFinite(time) && time > 0) return time;
  }
  return 0;
}

/** Local calendar day of a timestamp, or null when it does not parse. */
export function localDayOf(value: unknown): string | null {
  const time = timeOf(value);
  return time ? toIsoDate(new Date(time)) : null;
}

export function startDateBounds(now: Date = new Date()): { min: string; max: string } {
  const today = todayIso(now);
  return { min: addDaysIso(today, -START_DATE_PAST_DAYS), max: addDaysIso(today, START_DATE_FUTURE_DAYS) };
}

export function isStartDateAllowed(iso: string, now: Date = new Date()): boolean {
  if (!parseIsoDate(iso)) return false;
  const { min, max } = startDateBounds(now);
  return iso >= min && iso <= max;
}

/**
 * Default Week 1 start: the day the roadmap was created; otherwise the first
 * CV profile save; otherwise the learner's first visit to My Roadmap.
 */
export function defaultWeekOneStart(
  roadmap: Pick<SavedRoadmap, 'created_at'>,
  fallbacks: { profileSavedAt?: string | null; firstVisitIso?: string | null; now?: Date } = {},
): { iso: string; basis: WeekStartBasis } {
  const created = localDayOf(roadmap.created_at);
  if (created) return { iso: created, basis: 'roadmap_created' };
  const profile = localDayOf(fallbacks.profileSavedAt);
  if (profile) return { iso: profile, basis: 'profile_saved' };
  const firstVisit = parseIsoDate(fallbacks.firstVisitIso || '') ? String(fallbacks.firstVisitIso) : todayIso(fallbacks.now);
  return { iso: firstVisit, basis: 'first_visit' };
}

/* ----------------------------------------------------------------------------
 * Schedule, status and phases
 * --------------------------------------------------------------------------*/

/**
 * Light weekly targets for a plan row that has none. The roadmap generator
 * always writes at least 1 per activity, so a 0 here means the value is missing.
 */
export const DEFAULT_WEEKLY_TARGETS = { case_pool_target: 3, case_drill_target: 3, aptitude_target: 2 } as const;

/** The plan's weeks re-dated as consecutive 7-day blocks from `weekOneIso`. */
export function buildWeekSchedule(plan: RoadmapWeek[], weekOneIso: string): RoadmapWeek[] {
  return plan
    .slice()
    .sort((a, b) => a.week - b.week)
    .map((week, index) => {
      const start = addDaysIso(weekOneIso, index * 7);
      return {
        ...week,
        start_date: start,
        end_date: addDaysIso(start, 6),
        case_pool_target: week.case_pool_target > 0 ? week.case_pool_target : DEFAULT_WEEKLY_TARGETS.case_pool_target,
        case_drill_target: week.case_drill_target > 0 ? week.case_drill_target : DEFAULT_WEEKLY_TARGETS.case_drill_target,
        aptitude_target: week.aptitude_target > 0 ? week.aptitude_target : DEFAULT_WEEKLY_TARGETS.aptitude_target,
      };
    });
}

function weekRange(week: RoadmapWeek): { start: number; end: number } {
  return { start: dayStart(week.start_date), end: dayStart(addDaysIso(week.start_date, 7)) };
}

function weekContaining(schedule: RoadmapWeek[], time: number): RoadmapWeek | null {
  if (!time) return null;
  for (const week of schedule) {
    const { start, end } = weekRange(week);
    if (time >= start && time < end) return week;
  }
  return null;
}

export function planStatus(schedule: RoadmapWeek[], now: Date = new Date()): PlanStatus {
  if (schedule.length === 0) return { kind: 'before', startsOn: todayIso(now) };
  const first = schedule[0];
  const last = schedule[schedule.length - 1];
  const time = now.getTime();
  if (time < weekRange(first).start) return { kind: 'before', startsOn: first.start_date };
  const current = weekContaining(schedule, time);
  if (current) return { kind: 'active', week: current.week };
  return { kind: 'complete', endedOn: last.end_date };
}

export type WeekState = 'past' | 'current' | 'upcoming';

export function weekState(weekNumber: number, status: PlanStatus): WeekState {
  if (status.kind === 'before') return 'upcoming';
  if (status.kind === 'complete') return 'past';
  if (weekNumber < status.week) return 'past';
  return weekNumber === status.week ? 'current' : 'upcoming';
}

/**
 * Phases come from plan_json's own phase numbers. A plan without distinct
 * phases (legacy rows) is split into four equal blocks instead.
 */
export function groupWeeksIntoPhases(schedule: RoadmapWeek[]): RoadmapPhase[] {
  const groups: RoadmapWeek[][] = [];
  schedule.forEach((week) => {
    const last = groups[groups.length - 1];
    if (last && last[0].phase === week.phase) last.push(week);
    else groups.push([week]);
  });
  let blocks = groups;
  if (groups.length < 2 && schedule.length >= 4) {
    const size = Math.ceil(schedule.length / 4);
    blocks = [0, 1, 2, 3]
      .map((i) => schedule.slice(i * size, (i + 1) * size))
      .filter((block) => block.length > 0);
  }
  return blocks.map((weeks, index) => ({
    index: index + 1,
    name: (blocks === groups && weeks[0].theme) || `Phase ${index + 1}`,
    weeks,
    startIso: weeks[0].start_date,
    endIso: weeks[weeks.length - 1].end_date,
  }));
}

/* ----------------------------------------------------------------------------
 * Counting
 * --------------------------------------------------------------------------*/

export function emptyWeekProgress(): WeekProgress {
  return { case_pool_done: 0, case_drill_done: 0, aptitude_done: 0 };
}

const FIELD: Record<PracticeTrack, keyof WeekProgress> = {
  case_pool: 'case_pool_done',
  case_drill: 'case_drill_done',
  aptitude: 'aptitude_done',
};

/**
 * Count each distinct case/drill/test once, in the week of its first
 * completion on or after Week 1. Sessions outside the plan are ignored.
 */
export function bucketPracticeSessions(
  sessions: PracticeSession[],
  schedule: RoadmapWeek[],
): Record<number, WeekProgress> {
  const buckets: Record<number, WeekProgress> = {};
  schedule.forEach((week) => {
    buckets[week.week] = emptyWeekProgress();
  });
  const seen = new Set<string>();
  sessions
    .filter((session) => session.time > 0)
    .slice()
    .sort((a, b) => a.time - b.time)
    .forEach((session) => {
      const id = `${session.track}|${session.key}`;
      if (seen.has(id)) return;
      const week = weekContaining(schedule, session.time);
      if (!week) return;
      seen.add(id);
      buckets[week.week][FIELD[session.track]] += 1;
    });
  return buckets;
}

/** Progress toward one target: the bar caps at 100% and the rest is extra. */
export function goalProgress(done: number, target: number): { counted: number; extra: number; pct: number; complete: boolean } {
  const safeTarget = Math.max(0, target);
  const counted = Math.min(done, safeTarget);
  return {
    counted,
    extra: Math.max(0, done - safeTarget),
    pct: safeTarget > 0 ? Math.round((counted / safeTarget) * 100) : 0,
    complete: safeTarget > 0 && done >= safeTarget,
  };
}

/* ----------------------------------------------------------------------------
 * Loading completed sessions
 * --------------------------------------------------------------------------*/

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

function parseJsonish(value: unknown): any {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function casePoolKey(row: any): string {
  const meta = parseJsonish(row?.rubric_json)?._casemate;
  const libraryId = String(meta?.library_case_id || meta?.source_case_id || '').trim();
  return libraryId ? `case:${libraryId}` : `case-row:${row?.id}`;
}

/**
 * Same identity the Aptitude Test app uses for "tests completed"
 * (test_type + test_id). Randomised simulations reuse one test_id for
 * different question sets, so those also include the questions served.
 */
export function aptitudeKey(row: any): string {
  const base = `apt:${String(row?.test_type || '')}:${String(row?.test_id || '')}`;
  if (!/mixed|simulation/i.test(String(row?.test_id || ''))) return base;
  const answers = parseJsonish(row?.answers_json);
  const ids = Array.isArray(answers)
    ? answers.map((entry: any) => String(entry?.question_id || '')).filter(Boolean).sort()
    : [];
  return ids.length > 0 ? `${base}:${ids.join(',')}` : `${base}:row-${row?.id}`;
}

export function structureTreeSessions(row: any): PracticeSession[] {
  const caseId = String(row?.case_id || '').trim();
  if (!caseId) return [];
  const submissions = parseJsonish(row?.submissions_json);
  if (!Array.isArray(submissions)) return [];
  const track: PracticeTrack = caseId.startsWith('pool-') ? 'case_pool' : 'case_drill';
  return submissions
    .map((submission: any) => ({ track, key: `tree:${caseId}`, time: timeOf(submission?.submittedAt, row?.updated_at) }))
    .filter((session) => session.time > 0);
}

interface CasePracticeRows {
  cases: any[];
  trees: any[];
  micro: any[];
  library: any[];
}

/** Completed Case Pool / Case Drill rows from every session of the signed-in account. */
async function loadAccountPracticeRows(sessionId: string): Promise<CasePracticeRows> {
  const response = await fetch(ROADMAP_SAVE_HOOK, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
    body: JSON.stringify({ action: 'practice_sessions' }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.success !== true) {
    throw new Error(payload?.error || `Practice history request failed (${response.status}).`);
  }
  return {
    cases: rowsOf(payload.case_practice_cases),
    trees: rowsOf(payload.case_structure_trees),
    micro: rowsOf(payload.micro_drills),
    library: rowsOf(payload.drill_library_attempts),
  };
}

/** Every completed practice session visible to this learner, across the three apps. */
export async function loadPracticeSessions(
  sessionId?: string | null,
  accountEmail?: string | null,
): Promise<PracticeSession[]> {
  const db = workspaceDb();
  const { userKey } = resolveRoadmapIdentity(sessionId, accountEmail);
  const read = async (build: () => any): Promise<any[]> => {
    try {
      return rowsOf(await build());
    } catch {
      return [];
    }
  };
  const columns = (query: any, ...names: string[]) => (typeof query?.select === 'function' ? query.select(...names) : query);

  const readSessionScoped = async (): Promise<CasePracticeRows> => {
    const [cases, trees, micro, library] = await Promise.all([
      read(() => columns(db.from('case_practice_cases').eq('status', 'completed'), 'id', 'rubric_json', 'completed_on', 'updated_at', 'created_at').limit(1000).get()),
      read(() => columns(db.from('case_structure_trees'), 'id', 'case_id', 'submissions_json', 'updated_at').limit(1000).get()),
      read(() => columns(db.from('micro_drills').eq('status', 'completed'), 'id', 'completed_on', 'updated_at', 'created_at').limit(1000).get()),
      read(() => columns(db.from('drill_library_attempts').eq('status', 'completed'), 'id', 'question_id', 'completed_on', 'updated_at').limit(1000).get()),
    ]);
    return { cases, trees, micro, library };
  };
  const caseRows = sessionId && accountEmail
    ? loadAccountPracticeRows(sessionId).catch(() => readSessionScoped())
    : readSessionScoped();

  const [{ cases, trees, micro, library }, aptitude] = await Promise.all([
    caseRows,
    read(() => columns(db.from('aptitude_attempts', { shared: true }).eq('user_key', userKey), 'id', 'test_type', 'test_id', 'answers_json', 'completed_at', 'created_at').limit(1000).get()),
  ]);

  const sessions: PracticeSession[] = [];
  cases.forEach((row) => {
    sessions.push({ track: 'case_pool', key: casePoolKey(row), time: timeOf(row.completed_on, row.updated_at, row.created_at) });
  });
  trees.forEach((row) => sessions.push(...structureTreeSessions(row)));
  micro.forEach((row) => {
    sessions.push({ track: 'case_drill', key: `micro:${row.id}`, time: timeOf(row.completed_on, row.updated_at, row.created_at) });
  });
  library.forEach((row) => {
    sessions.push({ track: 'case_drill', key: `lib:${row.question_id || row.id}`, time: timeOf(row.completed_on, row.updated_at) });
  });
  aptitude.forEach((row) => {
    sessions.push({ track: 'aptitude', key: aptitudeKey(row), time: timeOf(row.completed_at, row.created_at) });
  });
  return sessions.filter((session) => session.time > 0);
}

/** First CV profile save for the account (Week 1 fallback when a roadmap has no creation time). */
export async function loadFirstProfileSaveDate(email: string | null | undefined): Promise<string | null> {
  if (!email) return null;
  try {
    const db = workspaceDb();
    const response = await db
      .from('user_cv_profiles', { shared: true })
      .eq('user_email', email.toLowerCase().trim())
      .orderBy('id', 'asc')
      .limit(1)
      .get();
    const row = rowsOf(response)[0];
    return row?.created_at ? String(row.created_at) : null;
  } catch {
    return null;
  }
}

/* ----------------------------------------------------------------------------
 * Week 1 start preference
 * --------------------------------------------------------------------------*/

export interface StartDateChoice {
  /** Chosen 'YYYY-MM-DD', or null for the default. */
  value: string | null;
  /** True once the server has stored this choice on the roadmap row. */
  synced: boolean;
}

function choiceCacheKey(userKey: string, roadmapId: number): string {
  return `casemate-roadmap-week1:v1:${userKey}:${roadmapId}`;
}

export function readCachedStartChoice(userKey: string, roadmapId: number): StartDateChoice | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(choiceCacheKey(userKey, roadmapId)) || 'null');
    if (!parsed || typeof parsed !== 'object') return null;
    const value = typeof parsed.value === 'string' && parseIsoDate(parsed.value) ? parsed.value : null;
    return { value, synced: parsed.synced === true };
  } catch {
    return null;
  }
}

export function writeCachedStartChoice(userKey: string, roadmapId: number, choice: StartDateChoice): void {
  try {
    localStorage.setItem(choiceCacheKey(userKey, roadmapId), JSON.stringify(choice));
  } catch {
    // The server copy (when signed in) still holds the choice.
  }
}

/** The saved row wins; an unsynced local choice covers device-only accounts and failed saves. */
export function resolveStartChoice(
  roadmap: Pick<SavedRoadmap, 'week1_start_date'>,
  cached: StartDateChoice | null,
): string | null {
  if (roadmap.week1_start_date && parseIsoDate(roadmap.week1_start_date)) return roadmap.week1_start_date;
  if (cached && !cached.synced) return cached.value;
  return null;
}

/** Remembers the first day this account opened My Roadmap (last-resort Week 1 default). */
export function firstVisitIso(userKey: string, now: Date = new Date()): string {
  const key = `casemate-roadmap-first-visit:v1:${userKey}`;
  try {
    const stored = localStorage.getItem(key);
    if (stored && parseIsoDate(stored)) return stored;
    const today = todayIso(now);
    localStorage.setItem(key, today);
    return today;
  } catch {
    return todayIso(now);
  }
}

/** Store the Week 1 start (null = reset to default) on the learner's own roadmap row. */
export async function saveWeekOneStart(roadmapId: number, startIso: string | null, sessionId?: string | null): Promise<void> {
  const response = await fetch(ROADMAP_SAVE_HOOK, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(sessionId ? { 'X-Session-Id': sessionId } : {}),
    },
    body: JSON.stringify({ action: 'set_start_date', roadmap_id: roadmapId, start_date: startIso }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    const error = new Error(payload.error || 'Your start date could not be saved.');
    (error as any).code = payload.code || `http_${response.status}`;
    throw error;
  }
}
