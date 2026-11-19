// Casemate — My Roadmap study pace.
//
// A learner picks one of three weekly intensities for the saved roadmap. The
// pace never changes the plan's weeks, phases or themes (plan_json); it only
// sets the Case Pool / Case Drill / Aptitude Test targets of each week from the
// phase template below. Domain Knowledge has no weekly targets yet.
//
// Persistence (prep_roadmaps.study_pace_json, written by casemate-roadmap-save-v1):
//   { version: 1, pace, history: [{ pace, from_week, applied_at }], updated_at }
// Each history entry owns the weeks from its from_week until the next entry, so
// a change applied in week N re-paces weeks N.. only and every earlier week keeps
// the targets it had. A row without a config (never chosen) is Balanced for the
// whole plan. Balanced equals the generator's 24-week baseline plan exactly
// (checked in lib/studyPace.test.ts).

import type { RoadmapWeek } from './prepRoadmap';

export type StudyPace = 'slow' | 'balanced' | 'hardcore';

export const STUDY_PACES: StudyPace[] = ['slow', 'balanced', 'hardcore'];

export const DEFAULT_STUDY_PACE: StudyPace = 'balanced';

export interface PaceWeekTargets {
  case_pool: number;
  case_drill: number;
  aptitude: number;
}

export interface StudyPaceMeta {
  id: StudyPace;
  label: string;
  tagline: string;
}

export const STUDY_PACE_META: Record<StudyPace, StudyPaceMeta> = {
  slow: { id: 'slow', label: 'Take It Slow', tagline: 'A lighter load that fits around classes or an internship.' },
  balanced: { id: 'balanced', label: 'Balanced', tagline: 'The standard Casemate plan: steady, sustainable progress.' },
  hardcore: { id: 'hardcore', label: 'Hardcore', tagline: 'Maximum reps for a close deadline or a top-tier target.' },
};

/** Weekly targets per phase (index 0 = Phase 1). Proposed defaults; tune after user testing. */
export const PACE_TEMPLATES: Record<StudyPace, PaceWeekTargets[]> = {
  slow: [
    { case_pool: 1, case_drill: 5, aptitude: 1 },
    { case_pool: 2, case_drill: 5, aptitude: 1 },
    { case_pool: 3, case_drill: 4, aptitude: 1 },
    { case_pool: 3, case_drill: 3, aptitude: 1 },
  ],
  balanced: [
    { case_pool: 2, case_drill: 7, aptitude: 1 },
    { case_pool: 3, case_drill: 8, aptitude: 1 },
    { case_pool: 5, case_drill: 6, aptitude: 1 },
    { case_pool: 4, case_drill: 5, aptitude: 2 },
  ],
  hardcore: [
    { case_pool: 3, case_drill: 10, aptitude: 2 },
    { case_pool: 4, case_drill: 12, aptitude: 2 },
    { case_pool: 8, case_drill: 9, aptitude: 2 },
    { case_pool: 6, case_drill: 8, aptitude: 3 },
  ],
};

/** The standard 24-week plan: Phase 1 weeks 1-6, Phase 2 weeks 7-13, Phase 3 weeks 14-20, Phase 4 weeks 21-24. */
export const STANDARD_PHASE_WEEKS = [6, 7, 7, 4];

/** Whole-plan activity totals of the standard 24-week plan, checked by verifyPaceTemplates(). */
export const EXPECTED_STANDARD_TOTALS: Record<StudyPace, number> = { slow: 182, balanced: 272, hardcore: 417 };

/** Illustrative minutes per activity for the hour estimate. */
export const ACTIVITY_MINUTES: PaceWeekTargets = { case_pool: 60, case_drill: 20, aptitude: 30 };

export const HOURS_DISCLAIMER = 'Illustrative estimate - actual practice time may vary';

export function isStudyPace(value: unknown): value is StudyPace {
  return value === 'slow' || value === 'balanced' || value === 'hardcore';
}

export function paceTargetsFor(pace: StudyPace, phaseIndex: number): PaceWeekTargets {
  const template = PACE_TEMPLATES[pace] || PACE_TEMPLATES[DEFAULT_STUDY_PACE];
  const index = Math.min(template.length, Math.max(1, Math.round(phaseIndex) || 1)) - 1;
  return template[index];
}

export function weekActivityTotal(targets: PaceWeekTargets): number {
  return targets.case_pool + targets.case_drill + targets.aptitude;
}

export function standardPlanTotal(pace: StudyPace): number {
  return STANDARD_PHASE_WEEKS.reduce((sum, weeks, index) => sum + weeks * weekActivityTotal(PACE_TEMPLATES[pace][index]), 0);
}

/** Problems with the templates; empty when the standard totals match EXPECTED_STANDARD_TOTALS. */
export function verifyPaceTemplates(): string[] {
  const problems: string[] = [];
  STUDY_PACES.forEach((pace) => {
    if (PACE_TEMPLATES[pace].length !== STANDARD_PHASE_WEEKS.length) problems.push(`${pace}: expected ${STANDARD_PHASE_WEEKS.length} phases`);
    const total = standardPlanTotal(pace);
    if (total !== EXPECTED_STANDARD_TOTALS[pace]) problems.push(`${pace}: standard plan total ${total}, expected ${EXPECTED_STANDARD_TOTALS[pace]}`);
  });
  return problems;
}

/* ----------------------------------------------------------------------------
 * Saved configuration
 * --------------------------------------------------------------------------*/

export interface PaceSegment {
  pace: StudyPace;
  /** First plan week (1-based) this pace applies to. */
  from_week: number;
  applied_at: string | null;
}

export interface StudyPaceConfig {
  version: 1;
  /** The pace in force now and for every later week. */
  pace: StudyPace;
  /** Ascending by from_week; the first entry always starts at week 1. */
  history: PaceSegment[];
  updated_at: string | null;
}

export function defaultStudyPaceConfig(): StudyPaceConfig {
  return { version: 1, pace: DEFAULT_STUDY_PACE, history: [{ pace: DEFAULT_STUDY_PACE, from_week: 1, applied_at: null }], updated_at: null };
}

function normalizeHistory(entries: PaceSegment[]): PaceSegment[] {
  const sorted = entries
    .filter((entry) => isStudyPace(entry.pace) && Number.isFinite(entry.from_week) && entry.from_week >= 1)
    .map((entry) => ({ pace: entry.pace, from_week: Math.round(entry.from_week), applied_at: entry.applied_at || null }))
    .sort((a, b) => a.from_week - b.from_week);
  const out: PaceSegment[] = [];
  sorted.forEach((entry) => {
    const last = out[out.length - 1];
    if (last && last.from_week === entry.from_week) out[out.length - 1] = entry;
    else if (!last || last.pace !== entry.pace) out.push(entry);
  });
  if (out.length > 0 && out[0].from_week !== 1) out.unshift({ pace: DEFAULT_STUDY_PACE, from_week: 1, applied_at: null });
  // Merging can leave two equal neighbours after the unshift above.
  return out.filter((entry, index) => index === 0 || entry.pace !== out[index - 1].pace);
}

/** Parse a stored study_pace_json value; null when absent or unusable. */
export function parseStudyPaceConfig(value: unknown): StudyPaceConfig | null {
  let parsed: any = value;
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return null;
    }
  }
  if (!parsed || typeof parsed !== 'object') return null;
  const raw: PaceSegment[] = Array.isArray(parsed.history)
    ? parsed.history.map((entry: any) => ({
        pace: entry?.pace,
        from_week: Number(entry?.from_week),
        applied_at: typeof entry?.applied_at === 'string' ? entry.applied_at : null,
      }))
    : [];
  let history = normalizeHistory(raw);
  if (history.length === 0) {
    if (!isStudyPace(parsed.pace)) return null;
    history = [{ pace: parsed.pace, from_week: 1, applied_at: typeof parsed.updated_at === 'string' ? parsed.updated_at : null }];
  }
  return {
    version: 1,
    pace: history[history.length - 1].pace,
    history,
    updated_at: typeof parsed.updated_at === 'string' ? parsed.updated_at : null,
  };
}

/** Pace in force for one plan week. */
export function paceForWeek(config: StudyPaceConfig | null, weekNumber: number): StudyPace {
  const history = config?.history || [];
  let pace: StudyPace = DEFAULT_STUDY_PACE;
  for (const entry of history) {
    if (entry.from_week <= weekNumber) pace = entry.pace;
    else break;
  }
  return pace;
}

/**
 * The config after applying `pace` from `effectiveWeek` on. Entries for earlier
 * weeks are kept untouched; later ones are replaced. Mirrors the server action.
 */
export function withPaceChange(
  config: StudyPaceConfig | null,
  pace: StudyPace,
  effectiveWeek: number,
  appliedAt: string | null = null,
): StudyPaceConfig {
  const from = Math.max(1, Math.round(effectiveWeek) || 1);
  const base = config ? config.history : defaultStudyPaceConfig().history;
  if (config && config.pace === pace && !base.some((entry) => entry.from_week > from)) return config;
  const kept = base.filter((entry) => entry.from_week < from);
  const last = kept[kept.length - 1];
  const history = !last || last.pace !== pace ? [...kept, { pace, from_week: kept.length === 0 ? 1 : from, applied_at: appliedAt }] : kept;
  return { version: 1, pace, history, updated_at: appliedAt };
}

/* ----------------------------------------------------------------------------
 * Applying a pace to the plan
 * --------------------------------------------------------------------------*/

/**
 * 1-based phase index of every week, from plan_json's own phase numbers. A plan
 * without distinct phases is split into four equal blocks, matching
 * groupWeeksIntoPhases in lib/roadmapProgress.ts.
 */
export function phaseIndexByWeek(schedule: RoadmapWeek[]): Record<number, number> {
  const sorted = schedule.slice().sort((a, b) => a.week - b.week);
  const groups: RoadmapWeek[][] = [];
  sorted.forEach((week) => {
    const last = groups[groups.length - 1];
    if (last && last[0].phase === week.phase) last.push(week);
    else groups.push([week]);
  });
  let blocks = groups;
  if (groups.length < 2 && sorted.length >= 4) {
    const size = Math.ceil(sorted.length / 4);
    blocks = [0, 1, 2, 3].map((i) => sorted.slice(i * size, (i + 1) * size)).filter((block) => block.length > 0);
  }
  const out: Record<number, number> = {};
  blocks.forEach((weeks, index) => weeks.forEach((week) => {
    out[week.week] = index + 1;
  }));
  return out;
}

/** The schedule with every week's targets set from the pace in force for that week. */
export function applyStudyPace(schedule: RoadmapWeek[], config: StudyPaceConfig | null): RoadmapWeek[] {
  const phaseOf = phaseIndexByWeek(schedule);
  return schedule.map((week) => {
    const targets = paceTargetsFor(paceForWeek(config, week.week), phaseOf[week.week] || week.phase);
    return {
      ...week,
      case_pool_target: targets.case_pool,
      case_drill_target: targets.case_drill,
      aptitude_target: targets.aptitude,
    };
  });
}

/** plan_json rows re-targeted for one pace across the whole plan (new or regenerated roadmaps). */
export function planWithPaceTargets(plan: RoadmapWeek[], pace: StudyPace): RoadmapWeek[] {
  return applyStudyPace(plan, { version: 1, pace, history: [{ pace, from_week: 1, applied_at: null }], updated_at: null });
}

export function weekTargetsOf(week: RoadmapWeek): PaceWeekTargets {
  return { case_pool: week.case_pool_target, case_drill: week.case_drill_target, aptitude: week.aptitude_target };
}

export function planActivityTotal(schedule: RoadmapWeek[]): number {
  return schedule.reduce((sum, week) => sum + week.case_pool_target + week.case_drill_target + week.aptitude_target, 0);
}

export function estimateWeeklyMinutes(targets: PaceWeekTargets): number {
  return (
    targets.case_pool * ACTIVITY_MINUTES.case_pool +
    targets.case_drill * ACTIVITY_MINUTES.case_drill +
    targets.aptitude * ACTIVITY_MINUTES.aptitude
  );
}

/** Minutes as hours rounded to the nearest half hour, e.g. "≈ 4.5 h". */
export function formatStudyHours(minutes: number): string {
  const halfHours = Math.round(Math.max(0, minutes) / 30) / 2;
  return `≈ ${Number.isInteger(halfHours) ? halfHours : halfHours.toFixed(1)} h`;
}

/* ----------------------------------------------------------------------------
 * Persistence
 * --------------------------------------------------------------------------*/

const ROADMAP_SAVE_HOOK = '/api/hooks/execute/workspace-539150/casemate-roadmap-save-v1';

/** Re-pace the learner's own roadmap row from `effectiveWeek` on; returns the stored config. */
export async function saveStudyPace(
  roadmapId: number,
  pace: StudyPace,
  effectiveWeek: number,
  sessionId?: string | null,
): Promise<StudyPaceConfig> {
  const response = await fetch(ROADMAP_SAVE_HOOK, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(sessionId ? { 'X-Session-Id': sessionId } : {}),
    },
    body: JSON.stringify({ action: 'set_study_pace', roadmap_id: roadmapId, pace, effective_week: effectiveWeek }),
  });
  const payload = await response.json().catch(() => ({}));
  const config = parseStudyPaceConfig(payload?.study_pace_json);
  if (!response.ok || payload?.success === false || !config) {
    const error = new Error(payload?.error || 'Your study pace could not be saved.');
    (error as any).code = payload?.code || `http_${response.status}`;
    throw error;
  }
  return config;
}

/* ----------------------------------------------------------------------------
 * Local copy for device-only accounts and saves that have not reached the server
 * --------------------------------------------------------------------------*/

export interface CachedStudyPace {
  config: StudyPaceConfig;
  synced: boolean;
}

function paceCacheKey(userKey: string, roadmapId: number): string {
  return `casemate-roadmap-pace:v1:${userKey}:${roadmapId}`;
}

export function readCachedStudyPace(userKey: string, roadmapId: number): CachedStudyPace | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(paceCacheKey(userKey, roadmapId)) || 'null');
    const config = parseStudyPaceConfig(parsed?.config);
    return config ? { config, synced: parsed.synced === true } : null;
  } catch {
    return null;
  }
}

export function writeCachedStudyPace(userKey: string, roadmapId: number, value: CachedStudyPace | null): void {
  try {
    if (value) localStorage.setItem(paceCacheKey(userKey, roadmapId), JSON.stringify(value));
    else localStorage.removeItem(paceCacheKey(userKey, roadmapId));
  } catch {
    // The server copy (when signed in) still holds the pace.
  }
}

/** The saved row wins; an unsynced local pace covers device-only accounts and failed saves. */
export function resolveStudyPace(saved: StudyPaceConfig | null, cached: CachedStudyPace | null): StudyPaceConfig | null {
  if (saved) return saved;
  if (cached && !cached.synced) return cached.config;
  return null;
}
