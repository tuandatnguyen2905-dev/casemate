// Casemate — "My Roadmap": the persistent personalized prep plan.
//
// One page, six sections in a fixed order (founder-approved prototype):
//   1. Your Target Program — program, company, position, match %, Fit
//      Assessment link and roadmap regeneration.
//   2. Choose Your Study Pace (./StudyPaceSelector.tsx) — Take It Slow /
//      Balanced / Hardcore. Choosing previews only; "Apply Study Pace" saves.
//   3. Overall Learning Progress (./OverallProgress.tsx) — completion across the
//      whole saved plan: donut + three category bars. Read-only, no buttons.
//   4. Your Progress This Week — current week, phase, weekly completion,
//      remaining activities and one compact card per tracked practice app.
//      Read-only: no practice buttons.
//   5. Recommended for Your Target Program (./RecommendedForTarget.tsx) — the
//      only place with learn/practice CTAs.
//   6. Preparation Timeline — the saved 24-week plan in four phases with This
//      Week / Monthly / Full Plan views. Planning only: no practice buttons.
// Weeks and phases come from the saved plan (lib/prepRoadmap.ts, prep_roadmaps
// table) and every weekly target from its saved study pace (lib/studyPace.ts),
// so all sections read one schedule; progress is counted live from completed Case Pool,
// Case Drill and Aptitude Test sessions by lib/roadmapProgress.ts and
// re-bucketed whenever the Week 1 start date changes.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Compass,
  Flag,
  Hexagon,
  Loader2,
  Map as MapIcon,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import {
  generateAndSaveRoadmap,
  groupWeeksIntoMonths,
  loadLatestRoadmap,
  restartRoadmapJourney,
  ROADMAP_UPDATED_EVENT,
  resolveRoadmapIdentity,
  shortDateLabel,
} from '../../lib/prepRoadmap';
import type { RoadmapWeek, SavedRoadmap, WeekProgress } from '../../lib/prepRoadmap';
import {
  bucketPracticeSessions,
  buildWeekSchedule,
  defaultWeekOneStart,
  firstVisitIso,
  fullDateLabel,
  goalProgress,
  groupWeeksIntoPhases,
  isStartDateAllowed,
  loadFirstProfileSaveDate,
  loadPracticeSessions,
  planStatus,
  readCachedStartChoice,
  resolveStartChoice,
  saveWeekOneStart,
  startDateBounds,
  todayIso,
  weekState,
  writeCachedStartChoice,
} from '../../lib/roadmapProgress';
import type { PlanStatus, PracticeSession, RoadmapPhase, WeekStartBasis, WeekState } from '../../lib/roadmapProgress';
import { READINESS_UPDATED_EVENT } from '../../lib/readinessScore';
import {
  DEFAULT_STUDY_PACE,
  STUDY_PACE_META,
  applyStudyPace,
  readCachedStudyPace,
  resolveStudyPace,
  saveStudyPace,
  withPaceChange,
  writeCachedStudyPace,
} from '../../lib/studyPace';
import type { CachedStudyPace, StudyPace } from '../../lib/studyPace';
import { trackAppSwitch, trackStepError } from '../../lib/engagementTracking';
import { isFounderEmail } from '../../lib/founderAccess';
import OverallProgress from './OverallProgress';
import type { OverallProgressStatus } from './OverallProgress';
import RecommendedForTarget from './RecommendedForTarget';
import { ROADMAP_CSS } from './roadmapStyles';
import TodaysFocus, { FOCUS_CSS } from './TodaysFocus';
import { useSkillFocus } from './skillFocusData';
import StudyPaceSelector from './StudyPaceSelector';
import { PACE_CSS } from './paceStyles';

interface TrackMeta {
  key: 'case_pool' | 'case_drill' | 'aptitude';
  label: string;
  icon: typeof Target;
  targetOf: (week: RoadmapWeek) => number;
  doneOf: (progress: WeekProgress | undefined) => number;
  unit: string;
  unitOne: string;
  short: string;
}

const TRACKS: TrackMeta[] = [
  {
    key: 'case_pool',
    label: 'Case Pool',
    icon: Target,
    targetOf: (week) => week.case_pool_target,
    doneOf: (progress) => progress?.case_pool_done || 0,
    unit: 'full cases',
    unitOne: 'full case',
    short: 'CP',
  },
  {
    key: 'case_drill',
    label: 'Case Drill',
    icon: Zap,
    targetOf: (week) => week.case_drill_target,
    doneOf: (progress) => progress?.case_drill_done || 0,
    unit: 'drills',
    unitOne: 'drill',
    short: 'CD',
  },
  {
    key: 'aptitude',
    label: 'Aptitude Test',
    icon: Hexagon,
    targetOf: (week) => week.aptitude_target,
    doneOf: (progress) => progress?.aptitude_done || 0,
    unit: 'tests',
    unitOne: 'test',
    short: 'AT',
  },
];

type TimelineView = 'week' | 'month' | 'full';

const TIMELINE_VIEWS: Array<{ id: TimelineView; label: string }> = [
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'Monthly' },
  { id: 'full', label: 'Full Plan' },
];

const START_BASIS_LABEL: Record<WeekStartBasis, string> = {
  roadmap_created: 'the day your roadmap was created',
  profile_saved: 'the day you first saved your profile',
  first_visit: 'your first visit to My Roadmap',
};

const SESSION_REFRESH_MIN_MS = 15000;

function openDockApp(appId: string) {
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
}

function backToDirection() {
  // The app-first Fit Assessment owns the saved direction and result cards.
  trackAppSwitch('my-roadmap', 'fit-assessment', { trigger: 'roadmap_back_to_fit' });
  openDockApp('fit-assessment');
}

function parseJsonish(value: unknown): any {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

function dbRows(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

// A logout/login issues a new session id, so the session-scoped rows belong to
// the previous session while the account's own rows are still keyed by email.
// Read by email first and only fall back to the session scope.
async function loadRecentAssessmentRows(email: string | null): Promise<any[]> {
  const db = (window as any).__workspaceDb;
  if (!db?.from) return [];
  if (email) {
    const byEmail = await db
      .from('assessment_results', { shared: true })
      .eq('user_email', email)
      .orderBy('id', 'desc')
      .limit(5)
      .get()
      .catch(() => null);
    const rows = dbRows(byEmail);
    if (rows.length > 0) return rows;
  }
  const bySession = await db.from('assessment_results').orderBy('id', 'desc').limit(5).get().catch(() => null);
  return dbRows(bySession);
}

interface AssessmentTarget {
  program: string;
  company: string | null;
  matchPercent: number | null;
}

// Pick the roadmap target from a saved direction payload: the candidate's
// pinned target first, then the #1-ranked program, then the highest match.
function readSelectedRoadmapTarget(sessionId?: string | null): AssessmentTarget | null {
  try {
    const raw = localStorage.getItem(`casemate-roadmap-target:${sessionId || 'preview'}`);
    if (!raw) return null;
    localStorage.removeItem(`casemate-roadmap-target:${sessionId || 'preview'}`);
    const parsed = JSON.parse(raw);
    if (!parsed?.program) return null;
    return {
      program: String(parsed.program),
      company: parsed.company ? String(parsed.company) : null,
      matchPercent: Number.isFinite(Number(parsed.matchPercent)) ? Math.round(Number(parsed.matchPercent)) : null,
    };
  } catch (error) {
    return null;
  }
}

function pickTargetProgram(resultJson: unknown): AssessmentTarget | null {
  const parsed = parseJsonish(resultJson);
  const programs = Array.isArray(parsed?.programs) ? parsed.programs : [];
  const usable = programs.filter(
    (p: any) => p && typeof p === 'object' && (typeof p.program === 'string' || typeof p.company === 'string'),
  );
  if (usable.length === 0) return null;
  const target =
    usable.find((p: any) => p.is_target === true || p.pinned === true) ||
    usable.slice().sort((a: any, b: any) => {
      const rankA = Number.isFinite(Number(a.rank)) && Number(a.rank) > 0 ? Number(a.rank) : 99;
      const rankB = Number.isFinite(Number(b.rank)) && Number(b.rank) > 0 ? Number(b.rank) : 99;
      if (rankA !== rankB) return rankA - rankB;
      return (Number(b.match_percent) || 0) - (Number(a.match_percent) || 0);
    })[0];
  return {
    program: String(target.program || target.company || ''),
    company: target.company ? String(target.company) : null,
    matchPercent: Number.isFinite(Number(target.match_percent)) ? Math.round(Number(target.match_percent)) : null,
  };
}

function Bar({ done, target, size }: { done: number; target: number; size?: 'thin' | 'thick' }) {
  const { pct, complete } = goalProgress(done, target);
  return (
    <div
      className={`mr-bar${size ? ` mr-bar--${size}` : ''}${complete ? ' is-done' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <span style={{ width: `${Math.max(pct > 0 ? 3 : 0, pct)}%` }} />
    </div>
  );
}

function Extra({ extra }: { extra: number }) {
  if (extra <= 0) return null;
  return <span className="mr-extra">+{extra} extra</span>;
}

function weekTotals(week: RoadmapWeek, progress: WeekProgress | undefined) {
  let counted = 0;
  let target = 0;
  let extra = 0;
  TRACKS.forEach((track) => {
    const goal = goalProgress(track.doneOf(progress), track.targetOf(week));
    counted += goal.counted;
    extra += goal.extra;
    target += track.targetOf(week);
  });
  return { counted, target, extra, remaining: Math.max(0, target - counted) };
}

function rangeTotals(weeks: RoadmapWeek[], progress: Record<number, WeekProgress>) {
  return weeks.reduce(
    (sum, week) => {
      const totals = weekTotals(week, progress[week.week]);
      return { counted: sum.counted + totals.counted, target: sum.target + totals.target, extra: sum.extra + totals.extra };
    },
    { counted: 0, target: 0, extra: 0 },
  );
}

function combinedState(states: WeekState[]): WeekState {
  if (states.includes('current')) return 'current';
  return states.length > 0 && states.every((state) => state === 'past') ? 'past' : 'upcoming';
}

function phaseState(phase: RoadmapPhase, status: PlanStatus): WeekState {
  return combinedState(phase.weeks.map((week) => weekState(week.week, status)));
}

const STATE_LABEL: Record<WeekState, string> = { current: 'Current', past: 'Completed', upcoming: 'Upcoming' };

function StateChip({ state, label }: { state: WeekState; label?: string }) {
  return (
    <span className={`mr-chip is-${state}`}>
      {state === 'past' ? <CheckCircle2 /> : state === 'upcoming' ? <Circle /> : null}
      {label || STATE_LABEL[state]}
    </span>
  );
}

function weekChipLabel(state: WeekState): string {
  return state === 'current' ? 'This week' : state === 'past' ? 'Past' : 'Upcoming';
}

function WeekDetail({
  week,
  phase,
  progress,
  state,
}: {
  week: RoadmapWeek;
  phase: RoadmapPhase | undefined;
  progress: WeekProgress | undefined;
  state: WeekState;
}) {
  const totals = weekTotals(week, progress);
  return (
    <div className={`mr-week${state === 'current' ? ' is-current' : ''}`} data-testid={`roadmap-week-${week.week}`}>
      <div className="mr-week-head">
        <b>Week {week.week}</b>
        <span className="mr-week-dates">{shortDateLabel(week.start_date)} – {shortDateLabel(week.end_date)}</span>
        <span className="mr-week-theme">{phase ? `Phase ${phase.index} · ${phase.name}` : week.theme}</span>
        <StateChip state={state} label={weekChipLabel(state)} />
      </div>
      <div className="mr-week-targets">
        {TRACKS.map((track) => {
          const target = track.targetOf(week);
          const goal = goalProgress(track.doneOf(progress), target);
          const Icon = track.icon;
          return (
            <div key={track.key} className="mr-target-item">
              <div className="mr-target-item-row">
                <Icon />
                <b>{track.label}</b>
                <Extra extra={goal.extra} />
                <span className={`mr-num${goal.complete ? ' is-done' : ''}`}>{goal.counted}/{target}</span>
              </div>
              <Bar done={goal.counted} target={target} size="thin" />
              <p className="mr-target-item-goal">Target: {target} {target === 1 ? track.unitOne : track.unit}</p>
            </div>
          );
        })}
      </div>
      <div className="mr-week-foot">
        <span><b className="mr-num">{totals.counted}/{totals.target}</b> activities</span>
        <span>{totals.remaining === 0 ? 'Weekly target reached' : `${totals.remaining} remaining`}</span>
        <Extra extra={totals.extra} />
      </div>
    </div>
  );
}

function PhaseCards({
  phases,
  status,
  progress,
  onSelect,
}: {
  phases: RoadmapPhase[];
  status: PlanStatus;
  progress: Record<number, WeekProgress>;
  onSelect: (phase: RoadmapPhase) => void;
}) {
  return (
    <div className="mr-phases" data-testid="roadmap-phases">
      {phases.map((phase) => {
        const state = phaseState(phase, status);
        const totals = rangeTotals(phase.weeks, progress);
        const first = phase.weeks[0];
        const last = phase.weeks[phase.weeks.length - 1];
        return (
          <button
            key={phase.index}
            type="button"
            className={`mr-phase is-${state}`}
            onClick={() => onSelect(phase)}
            aria-label={`Phase ${phase.index}: ${phase.name}, weeks ${first.week} to ${last.week}, ${STATE_LABEL[state]}. Show this phase's weeks.`}
            data-testid={`roadmap-phase-${phase.index}`}
            data-state={state}
          >
            <span className="mr-phase-top">
              <span className="mr-phase-idx">Phase {phase.index}</span>
              <StateChip state={state} />
            </span>
            <span className="mr-phase-name">{phase.name}</span>
            <span className="mr-phase-range">
              Weeks {first.week}–{last.week} · {shortDateLabel(phase.startIso)} – {shortDateLabel(phase.endIso)}
            </span>
            <span className="mr-phase-prog">
              <span className="mr-num">{totals.counted}/{totals.target} activities</span>
              <Extra extra={totals.extra} />
            </span>
            <Bar done={totals.counted} target={totals.target} size="thin" />
          </button>
        );
      })}
    </div>
  );
}

function PreparationTimeline({
  schedule,
  phases,
  status,
  progress,
  view,
  onViewChange,
  focusWeek,
}: {
  schedule: RoadmapWeek[];
  phases: RoadmapPhase[];
  status: PlanStatus;
  progress: Record<number, WeekProgress>;
  view: TimelineView;
  onViewChange: (view: TimelineView) => void;
  focusWeek: number;
}) {
  const months = useMemo(() => groupWeeksIntoMonths(schedule), [schedule]);
  const [selectedWeek, setSelectedWeek] = useState<number>(focusWeek);
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>({});
  const [openFullWeek, setOpenFullWeek] = useState<number | null>(null);

  useEffect(() => {
    setSelectedWeek(focusWeek);
    setOpenFullWeek(null);
    const month = months.find((item) => item.weeks.some((week) => week.week === focusWeek)) || months[0];
    setExpandedMonths(month ? { [month.month]: true } : {});
  }, [focusWeek, months]);

  const phaseOf = (weekNumber: number) => phases.find((phase) => phase.weeks.some((week) => week.week === weekNumber));
  const selected = schedule.find((week) => week.week === selectedWeek) || schedule[0];
  const selectedPhase = selected ? phaseOf(selected.week) : undefined;
  const selectedIndex = selected ? schedule.indexOf(selected) : 0;

  const selectPhase = (phase: RoadmapPhase) => {
    const current = phase.weeks.find((week) => weekState(week.week, status) === 'current') || phase.weeks[0];
    setSelectedWeek(current.week);
    onViewChange('week');
  };

  return (
    <section className="mr-card" data-testid="roadmap-timeline" aria-labelledby="mr-timeline-title">
      <div className="mr-sec-head">
        <div>
          <span className="mr-eyebrow">Your plan</span>
          <h2 className="mr-h2" id="mr-timeline-title">Preparation Timeline</h2>
          <p className="mr-sub">
            {schedule.length} weeks in {phases.length} phases · {fullDateLabel(schedule[0].start_date)} – {fullDateLabel(schedule[schedule.length - 1].end_date)}
          </p>
        </div>
        <div className="mr-tabs" role="tablist" aria-label="Timeline view" data-testid="roadmap-view-switcher">
          {TIMELINE_VIEWS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              id={`mr-tab-${option.id}`}
              aria-selected={view === option.id}
              aria-controls="mr-timeline-panel"
              className="mr-tab"
              onClick={() => onViewChange(option.id)}
              data-testid={`roadmap-view-${option.id}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <PhaseCards phases={phases} status={status} progress={progress} onSelect={selectPhase} />

      <div className="mr-view" id="mr-timeline-panel" role="tabpanel" aria-labelledby={`mr-tab-${view}`} data-testid={`roadmap-view-panel-${view}`}>
        {view === 'week' && selected && (
          <div>
            <div className="mr-weeknav">
              <button
                type="button"
                className="mr-icon-btn"
                onClick={() => setSelectedWeek(schedule[Math.max(0, selectedIndex - 1)].week)}
                disabled={selectedIndex === 0}
                aria-label="Previous week"
                data-testid="roadmap-week-prev"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="mr-weeknav-title" aria-live="polite">
                <b>Week {selected.week} of {schedule.length}</b>
                <span>{shortDateLabel(selected.start_date)} – {shortDateLabel(selected.end_date)}{selectedPhase ? ` · ${selectedPhase.name}` : ''}</span>
              </div>
              <button
                type="button"
                className="mr-icon-btn"
                onClick={() => setSelectedWeek(schedule[Math.min(schedule.length - 1, selectedIndex + 1)].week)}
                disabled={selectedIndex >= schedule.length - 1}
                aria-label="Next week"
                data-testid="roadmap-week-next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="mr-weekchips" role="group" aria-label="Choose a week">
              {schedule.map((week) => {
                const state = weekState(week.week, status);
                const totals = weekTotals(week, progress[week.week]);
                const met = totals.target > 0 && totals.counted >= totals.target;
                return (
                  <button
                    key={week.week}
                    type="button"
                    className={`mr-weekchip is-${state}${met ? ' is-met' : ''}`}
                    aria-pressed={week.week === selected.week}
                    aria-label={`Week ${week.week}, ${weekChipLabel(state)}, ${totals.counted} of ${totals.target} activities`}
                    onClick={() => setSelectedWeek(week.week)}
                    data-testid={`roadmap-week-chip-${week.week}`}
                  >
                    W{week.week}
                  </button>
                );
              })}
            </div>
            <WeekDetail week={selected} phase={selectedPhase} progress={progress[selected.week]} state={weekState(selected.week, status)} />
          </div>
        )}

        {view === 'month' && (
          <div className="mr-months" data-testid="roadmap-months">
            {months.map((month) => {
              const expanded = !!expandedMonths[month.month];
              const first = month.weeks[0];
              const last = month.weeks[month.weeks.length - 1];
              const state = combinedState(month.weeks.map((week) => weekState(week.week, status)));
              const totals = rangeTotals(month.weeks, progress);
              const perTrack = TRACKS.map((track) => {
                let target = 0;
                let done = 0;
                month.weeks.forEach((week) => {
                  target += track.targetOf(week);
                  done += goalProgress(track.doneOf(progress[week.week]), track.targetOf(week)).counted;
                });
                return { track, target, done };
              });
              return (
                <div key={month.month} className={`mr-month${state === 'current' ? ' is-current' : ''}`} data-testid={`roadmap-month-${month.month}`}>
                  <button
                    type="button"
                    className="mr-month-btn"
                    aria-expanded={expanded}
                    aria-controls={`mr-month-body-${month.month}`}
                    onClick={() => setExpandedMonths((prev) => ({ ...prev, [month.month]: !prev[month.month] }))}
                  >
                    <span className="mr-month-main">
                      <span className="mr-month-title">
                        {month.label}
                        <span className="mr-month-range">
                          W{first.week}–W{last.week} · {shortDateLabel(first.start_date)} – {shortDateLabel(last.end_date)}
                        </span>
                        <StateChip state={state} />
                      </span>
                      <span className="mr-month-tracks">
                        {perTrack.map(({ track, target, done }) => (
                          <span key={track.key} className="mr-num"><b>{track.label}</b> {done}/{target}</span>
                        ))}
                      </span>
                    </span>
                    <span className="mr-month-side">
                      <span className="mr-num">{totals.counted}/{totals.target} activities</span>
                      <Bar done={totals.counted} target={totals.target} size="thin" />
                    </span>
                    <ChevronDown className="mr-month-chevron" />
                  </button>
                  {expanded && (
                    <div className="mr-month-body" id={`mr-month-body-${month.month}`}>
                      {month.weeks.map((week) => (
                        <WeekDetail
                          key={week.week}
                          week={week}
                          phase={phaseOf(week.week)}
                          progress={progress[week.week]}
                          state={weekState(week.week, status)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {view === 'full' && (
          <div className="mr-full" data-testid="roadmap-full-plan">
            {phases.map((phase) => (
              <div key={phase.index}>
                <p className="mr-full-phase-title">Phase {phase.index} · {phase.name}</p>
                <div className="mr-full-list">
                  {phase.weeks.map((week) => {
                    const state = weekState(week.week, status);
                    const open = openFullWeek === week.week;
                    return (
                      <div key={week.week} className="mr-full-item">
                        <button
                          type="button"
                          className={`mr-full-row is-${state}`}
                          aria-expanded={open}
                          aria-controls={`mr-full-detail-${week.week}`}
                          onClick={() => setOpenFullWeek(open ? null : week.week)}
                          data-testid={`roadmap-full-week-${week.week}`}
                          data-state={state}
                        >
                          <span className="mr-full-week">
                            <b>Week {week.week}</b>
                            <span>{shortDateLabel(week.start_date)} – {shortDateLabel(week.end_date)}</span>
                          </span>
                          <span className="mr-full-tracks">
                            {TRACKS.map((track) => {
                              const target = track.targetOf(week);
                              const goal = goalProgress(track.doneOf(progress[week.week]), target);
                              return (
                                <span key={track.key} className="mr-full-track">
                                  <div>
                                    <span title={track.label}>{track.short}</span>
                                    <span className={`mr-num${goal.complete ? ' is-done' : ''}`}>
                                      {goal.counted}/{target}{goal.extra > 0 ? ` +${goal.extra}` : ''}
                                    </span>
                                  </div>
                                  <Bar done={goal.counted} target={target} size="thin" />
                                </span>
                              );
                            })}
                          </span>
                          <StateChip state={state} label={weekChipLabel(state)} />
                          <ChevronDown className="mr-month-chevron" />
                        </button>
                        {open && (
                          <div className="mr-full-detail" id={`mr-full-detail-${week.week}`}>
                            <WeekDetail week={week} phase={phase} progress={progress[week.week]} state={state} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className="mr-legend">CP = Case Pool · CD = Case Drill · AT = Aptitude Test · select a week to see its targets</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value, sub, testId, text }: { label: string; value: string; sub?: string; testId: string; text?: boolean }) {
  return (
    <div className="mr-stat" data-testid={testId}>
      <div className="mr-stat-label">{label}</div>
      <div className={`mr-stat-value mr-num${text ? ' mr-stat-value--text' : ''}`}>{value}</div>
      {sub && <div className="mr-stat-sub">{sub}</div>}
    </div>
  );
}

export default function MyRoadmapApp() {
  const { sessionId, userEmail, userRole } = useSpaceRuntime();
  // Same founder detection as the Usage · Founder dashboard; the review server
  // function re-checks the verified session email on every write.
  const isReviewAdmin = isFounderEmail(userEmail) || userRole === 'founder';
  const userId = useMemo(() => resolveRoadmapIdentity(sessionId, userEmail).userKey, [sessionId, userEmail]);
  // Today's Focus: read-only skill scores from graded Case Drill / Aptitude Test results.
  const skillFocus = useSkillFocus(sessionId, userEmail, userId);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [roadmap, setRoadmap] = useState<SavedRoadmap | null>(null);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [sessionsState, setSessionsState] = useState<OverallProgressStatus>('loading');
  const [assessmentTarget, setAssessmentTarget] = useState<AssessmentTarget | null>(null);
  const [hasPendingSelection, setHasPendingSelection] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [confirmRegenerate, setConfirmRegenerate] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [restartError, setRestartError] = useState<string | null>(null);
  const restartCancelRef = useRef<HTMLButtonElement>(null);
  const loadRequestRef = useRef(0);
  const roadmapOwnerRef = useRef<string | null>(null);
  const sessionsFetchedAtRef = useRef(0);
  const [now, setNow] = useState(() => new Date());
  const [timelineView, setTimelineView] = useState<TimelineView | null>(null);
  const [startChoice, setStartChoice] = useState<string | null>(null);
  const [startNotice, setStartNotice] = useState<string | null>(null);
  const [profileSavedAt, setProfileSavedAt] = useState<string | null>(null);
  const [startEditorOpen, setStartEditorOpen] = useState(false);
  const [startDraft, setStartDraft] = useState('');
  const [savingStart, setSavingStart] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [localPace, setLocalPace] = useState<CachedStudyPace | null>(null);
  const [savingPace, setSavingPace] = useState(false);
  const [paceError, setPaceError] = useState<string | null>(null);
  const [paceNotice, setPaceNotice] = useState<string | null>(null);

  // Roadmaps are stored under 'email:<sign-in email>'. Without that email the
  // identity falls back to the device key and a returning account looks empty.
  useEffect(() => {
    if (sessionId && !userEmail) {
      console.warn('[My Roadmap] The active workspace session exposes no sign-in email, so the saved roadmap for this account cannot be loaded.');
    }
  }, [sessionId, userEmail]);

  const refreshSessions = useCallback(async () => {
    sessionsFetchedAtRef.current = Date.now();
    const loaded = await loadPracticeSessions(sessionId, userEmail).catch(() => null);
    if (loaded) {
      setSessions(loaded);
      setSessionsState('ready');
    } else {
      setSessionsState((previous) => (previous === 'ready' ? 'ready' : 'unavailable'));
    }
  }, [sessionId, userEmail]);

  const load = useCallback(async () => {
    const requestId = ++loadRequestRef.current;
    const isStale = () => requestId !== loadRequestRef.current;

    // During login/renewal the session id can arrive one render before its
    // account email. Never query with a temporary device key in that window:
    // it would make an existing email-keyed roadmap appear to have vanished.
    // Incrementing the request id above also invalidates any older load.
    if (sessionId && !userEmail) {
      setStatus((previous) => (previous === 'ready' ? 'ready' : 'loading'));
      return;
    }
    try {
      const selectedTarget = readSelectedRoadmapTarget(sessionId);
      const saved = await loadLatestRoadmap(sessionId, userEmail);
      if (isStale()) return;
      if (saved) {
        roadmapOwnerRef.current = userId;
        setRoadmap(saved);
        sessionsFetchedAtRef.current = Date.now();
        const loaded = await loadPracticeSessions(sessionId, userEmail).catch(() => null);
        if (isStale()) return;
        if (loaded) {
          setSessions(loaded);
          setSessionsState('ready');
        } else {
          setSessionsState((previous) => (previous === 'ready' ? 'ready' : 'unavailable'));
        }
        if (selectedTarget && selectedTarget.program !== saved.target_program) {
          setAssessmentTarget(selectedTarget);
          setHasPendingSelection(true);
        }
      } else {
        // An empty background read must not erase a roadmap that this same
        // account just generated successfully. It can clear only when the
        // resolved account identity changed.
        if (roadmapOwnerRef.current !== userId) {
          roadmapOwnerRef.current = userId;
          setRoadmap(null);
        }
        if (selectedTarget) {
          setAssessmentTarget(selectedTarget);
          setHasPendingSelection(true);
        } else {
          // No roadmap yet — is there a saved direction to generate from?
          try {
            const rows = await loadRecentAssessmentRows(userEmail);
            if (isStale()) return;
            let target: AssessmentTarget | null = null;
            for (const row of rows) {
              target = pickTargetProgram(row?.result_json);
              if (target && target.program) break;
            }
            setAssessmentTarget(target && target.program ? target : null);
          } catch (e) {
            if (isStale()) return;
            setAssessmentTarget(null);
          }
        }
      }
      if (!isStale()) setStatus('ready');
    } catch (e) {
      trackStepError('my-roadmap', 'access', e, { properties: { operation: 'load_roadmap' } });
      if (!isStale()) setStatus((previous) => (previous === 'ready' ? 'ready' : 'error'));
    }
  }, [sessionId, userEmail, userId]);

  useEffect(() => {
    void load();
    const onUpdated = () => void load();
    window.addEventListener(ROADMAP_UPDATED_EVENT, onUpdated);
    // Every graded case/drill/test dispatches this — refresh the tracker live.
    window.addEventListener(READINESS_UPDATED_EVENT, onUpdated);
    return () => {
      window.removeEventListener(ROADMAP_UPDATED_EVENT, onUpdated);
      window.removeEventListener(READINESS_UPDATED_EVENT, onUpdated);
    };
  }, [load]);

  // Coming back from a practice app should show the new session without a reload.
  const refreshIfStale = useCallback(() => {
    setNow(new Date());
    if (!roadmap) return;
    if (Date.now() - sessionsFetchedAtRef.current < SESSION_REFRESH_MIN_MS) return;
    void refreshSessions();
  }, [roadmap, refreshSessions]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') refreshIfStale();
    };
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent)?.detail?.appId === 'my-roadmap') refreshIfStale();
    };
    window.addEventListener('focus', refreshIfStale);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('openApp', onOpenApp);
    return () => {
      window.removeEventListener('focus', refreshIfStale);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('openApp', onOpenApp);
    };
  }, [refreshIfStale]);

  // The saved roadmap row is authoritative; a local, not-yet-synced choice
  // covers device-only accounts and a save that has not reached the server.
  useEffect(() => {
    if (!roadmap) {
      setStartChoice(null);
      return;
    }
    const cached = readCachedStartChoice(userId, roadmap.id);
    const resolved = resolveStartChoice(roadmap, cached);
    setStartChoice(resolved);
    if (roadmap.week1_start_date) writeCachedStartChoice(userId, roadmap.id, { value: roadmap.week1_start_date, synced: true });
    else if (cached?.synced && cached.value) writeCachedStartChoice(userId, roadmap.id, { value: null, synced: true });
    setStartNotice(cached && !cached.synced && !roadmap.week1_start_date && cached.value ? 'Saved on this device only.' : null);
  }, [roadmap, userId]);

  // Same rule for the study pace: the saved row wins over an unsynced local pace.
  useEffect(() => {
    if (!roadmap) {
      setLocalPace(null);
      return;
    }
    if (roadmap.study_pace_json) {
      writeCachedStudyPace(userId, roadmap.id, { config: roadmap.study_pace_json, synced: true });
      setLocalPace(null);
    } else {
      const cached = readCachedStudyPace(userId, roadmap.id);
      setLocalPace(cached && !cached.synced ? cached : null);
    }
  }, [roadmap, userId]);

  const paceConfig = useMemo(() => resolveStudyPace(roadmap?.study_pace_json || null, localPace), [roadmap, localPace]);

  useEffect(() => {
    if (!roadmap || roadmap.created_at || !userEmail) return;
    let cancelled = false;
    void loadFirstProfileSaveDate(userEmail).then((value) => {
      if (!cancelled) setProfileSavedAt(value);
    });
    return () => {
      cancelled = true;
    };
  }, [roadmap, userEmail]);

  const generate = useCallback(
    async (target: AssessmentTarget) => {
      setGenerating(true);
      setGenerateError(null);
      try {
        const existing = roadmap?.target_program === target.program ? roadmap : null;
        const saved = await generateAndSaveRoadmap({
          targetProgram: target.program,
          targetCompany: target.company,
          targetProgramId: existing?.target_program_id,
          targetFunction: existing?.target_function,
          recruitmentCycle: existing?.recruitment_cycle,
          activeTargetStatus: existing?.active_target_status,
          fitResultReference: existing?.fit_result_reference,
          targetFit: existing?.target_fit_json,
          preparationRecommendations: existing?.preparation_recommendations,
          roadmapTaskStatus: existing?.roadmap_task_status,
          matchPercent: target.matchPercent,
          studyPace: paceConfig ? paceConfig.pace : undefined,
          sessionId,
          accountEmail: userEmail,
        });
        roadmapOwnerRef.current = userId;
        setRoadmap(saved);
        setConfirmRegenerate(false);
        setPaceNotice(null);
        setPaceError(null);
        setTimelineView(null);
        setStartEditorOpen(false);
        await refreshSessions();
      } catch (e) {
        trackStepError('my-roadmap', 'access', e, { properties: { operation: 'generate_roadmap' } });
        setGenerateError('Roadmap generation didn\u2019t go through — please try again in a moment.');
      } finally {
        setGenerating(false);
      }
    },
    [sessionId, userEmail, userId, roadmap, refreshSessions, paceConfig],
  );

  useEffect(() => {
    if (!hasPendingSelection || !assessmentTarget || generating || status !== 'ready') return;
    setHasPendingSelection(false);
    void generate(assessmentTarget);
  }, [hasPendingSelection, assessmentTarget, generating, status, generate]);

  useEffect(() => {
    if (!confirmRestart) return;
    restartCancelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !restarting) setConfirmRestart(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmRestart, restarting]);

  const restartProgress = useCallback(async () => {
    if (restarting) return;
    setRestarting(true);
    setRestartError(null);
    try {
      await restartRoadmapJourney(sessionId, userEmail);
      setConfirmRestart(false);
      setAssessmentTarget(null);
      setHasPendingSelection(false);
      trackAppSwitch('my-roadmap', 'fit-assessment', { trigger: 'roadmap_restart_assessment' });
      openDockApp('fit-assessment');
    } catch (e) {
      trackStepError('my-roadmap', 'access', e, { properties: { operation: 'restart_assessment' } });
      setRestartError('We couldn’t finish restarting your progress. Please try again.');
    } finally {
      setRestarting(false);
    }
  }, [restarting, sessionId, userEmail]);

  const defaultStart = useMemo(() => (roadmap
    ? defaultWeekOneStart(roadmap, { profileSavedAt, firstVisitIso: firstVisitIso(userId) })
    : null), [roadmap, profileSavedAt, userId]);
  const weekOneIso = startChoice || defaultStart?.iso || todayIso();
  const usingCustomStart = !!startChoice && startChoice !== defaultStart?.iso;
  const baseSchedule = useMemo(() => (roadmap ? buildWeekSchedule(roadmap.plan_json, weekOneIso) : []), [roadmap, weekOneIso]);
  // Every section below reads this one pace-resolved schedule.
  const schedule = useMemo(() => applyStudyPace(baseSchedule, paceConfig), [baseSchedule, paceConfig]);
  const phases = useMemo(() => groupWeeksIntoPhases(schedule), [schedule]);
  const progress = useMemo(() => bucketPracticeSessions(sessions, schedule), [sessions, schedule]);
  const planState = useMemo(() => planStatus(schedule, now), [schedule, now]);
  const goalWeek = planState.kind === 'active'
    ? schedule.find((week) => week.week === planState.week) || null
    : planState.kind === 'before'
      ? schedule[0] || null
      : null;
  const goalTotals = goalWeek ? weekTotals(goalWeek, progress[goalWeek.week]) : null;
  const currentPhase = goalWeek
    ? phases.find((phase) => phase.weeks.some((week) => week.week === goalWeek.week)) || null
    : phases[phases.length - 1] || null;
  const planTotals = useMemo(() => rangeTotals(schedule, progress), [schedule, progress]);
  const hasAnyPractice = planTotals.counted + planTotals.extra > 0;
  const effectiveView: TimelineView = timelineView || (planState.kind === 'complete' ? 'full' : 'week');
  const focusWeekNumber = goalWeek?.week ?? schedule[schedule.length - 1]?.week ?? 1;
  const bounds = startDateBounds(now);
  // A new pace re-paces the current week and every later one; ended weeks keep theirs.
  const paceEffectiveWeek = planState.kind === 'active' ? planState.week : planState.kind === 'before' ? 1 : null;

  const recommendationTarget = useMemo(() => {
    if (roadmap) {
      return {
        company: roadmap.target_company || null,
        program: roadmap.target_program || null,
        position: roadmap.target_function || null,
        programId: roadmap.target_program_id || null,
      };
    }
    return assessmentTarget
      ? { company: assessmentTarget.company, program: assessmentTarget.program, position: null, programId: null }
      : null;
  }, [roadmap, assessmentTarget]);

  const applyStartChoice = useCallback(async (value: string | null) => {
    if (!roadmap) return;
    setSavingStart(true);
    setStartError(null);
    const previous = startChoice;
    setStartChoice(value);
    writeCachedStartChoice(userId, roadmap.id, { value, synced: false });
    try {
      if (!roadmap.id || !userEmail) throw Object.assign(new Error('device_only'), { code: 'device_only' });
      await saveWeekOneStart(roadmap.id, value, sessionId);
      writeCachedStartChoice(userId, roadmap.id, { value, synced: true });
      setRoadmap((current) => (current && current.id === roadmap.id ? { ...current, week1_start_date: value } : current));
      setStartNotice(null);
      setStartEditorOpen(false);
    } catch (e: any) {
      if (e?.code === 'device_only' || e?.code === 'verified_email_required') {
        setStartNotice(value ? 'Saved on this device only.' : null);
        setStartEditorOpen(false);
      } else {
        trackStepError('my-roadmap', 'access', e, { properties: { operation: 'save_start_date' } });
        setStartChoice(previous);
        writeCachedStartChoice(userId, roadmap.id, { value: previous, synced: false });
        setStartError('We couldn’t save your start date. Please try again.');
      }
    } finally {
      setSavingStart(false);
    }
  }, [roadmap, startChoice, userId, userEmail, sessionId]);

  const applyStudyPaceChoice = useCallback(async (pace: StudyPace) => {
    if (!roadmap || paceEffectiveWeek == null || savingPace) return;
    const label = STUDY_PACE_META[pace].label;
    const scope = paceEffectiveWeek > 1 ? ` from Week ${paceEffectiveWeek}` : '';
    setSavingPace(true);
    setPaceError(null);
    setPaceNotice(null);
    try {
      if (!roadmap.id || !userEmail) throw Object.assign(new Error('device_only'), { code: 'device_only' });
      const saved = await saveStudyPace(roadmap.id, pace, paceEffectiveWeek, sessionId);
      writeCachedStudyPace(userId, roadmap.id, { config: saved, synced: true });
      setRoadmap((current) => (current && current.id === roadmap.id ? { ...current, study_pace_json: saved } : current));
      setPaceNotice(`${label} applied${scope}. Your weekly goals, progress and timeline are updated.`);
    } catch (e: any) {
      if (e?.code === 'device_only' || e?.code === 'verified_email_required') {
        const local: CachedStudyPace = { config: withPaceChange(paceConfig, pace, paceEffectiveWeek, new Date().toISOString()), synced: false };
        writeCachedStudyPace(userId, roadmap.id, local);
        setLocalPace(local);
        setPaceNotice(`${label} applied${scope} on this device only.`);
      } else {
        trackStepError('my-roadmap', 'access', e, { properties: { operation: 'save_study_pace' } });
        setPaceError(e?.code === 'week_ended'
          ? 'This week has already ended. Reopen My Roadmap and try again.'
          : 'We couldn’t save your study pace. Please try again.');
      }
    } finally {
      setSavingPace(false);
    }
  }, [roadmap, paceEffectiveWeek, savingPace, userEmail, sessionId, userId, paceConfig]);

  const regenerateTarget: AssessmentTarget | null = roadmap
    ? {
        program: roadmap.target_program,
        company: roadmap.target_company,
        matchPercent: roadmap.match_percent,
      }
    : assessmentTarget;

  const draftValid = isStartDateAllowed(startDraft, now);

  const recommendations = (
    <RecommendedForTarget
      target={recommendationTarget}
      sessionId={sessionId}
      userKey={userId}
      isAdmin={isReviewAdmin}
      fitRecommendations={roadmap?.preparation_recommendations || []}
      skillFocus={skillFocus.focus}
    />
  );

  return (
    <div className="mr-root" onPointerEnter={refreshIfStale}>
      <style>{ROADMAP_CSS + PACE_CSS + FOCUS_CSS}</style>
      <div className="mr-wrap">
        <header className="mr-page-head">
          <h1><MapIcon size={24} /> My Roadmap</h1>
          <p>Where you stand, what to practise next, and your week-by-week plan.</p>
        </header>

        {status === 'loading' ? (
          <div className="mr-card mr-state">
            <Loader2 size={16} className="mr-spin" />
            Loading your roadmap…
          </div>
        ) : status === 'error' ? (
          <div className="mr-card">Your roadmap is temporarily unavailable — please reopen this app in a moment.</div>
        ) : !roadmap && !assessmentTarget ? (
          <>
            <section className="mr-card mr-target mr-target--empty" data-testid="roadmap-needs-assessment" aria-labelledby="mr-target-title">
              <div className="mr-target-main">
                <span className="mr-eyebrow">Your Target Program</span>
                <div className="mr-target-title"><h2 id="mr-target-title">No target program yet</h2></div>
                <p className="mr-sub">
                  Complete your Fit Assessment to choose a target program. Your week-by-week roadmap, progress tracking and
                  tailored recommendations are built from it — it’s free.
                </p>
              </div>
              <div className="mr-target-actions">
                <button type="button" className="mr-btn mr-btn--primary" onClick={backToDirection} data-testid="button-start-fit-assessment">
                  <Compass /> Go to Fit Assessment
                </button>
              </div>
            </section>
            {recommendations}
          </>
        ) : !roadmap && assessmentTarget ? (
          <>
            <section className="mr-card mr-target" data-testid="roadmap-generate-cta" aria-labelledby="mr-target-title">
              <div className="mr-target-main">
                <span className="mr-eyebrow">Your Target Program</span>
                <div className="mr-target-title">
                  <h2 id="mr-target-title">{assessmentTarget.program}</h2>
                  {assessmentTarget.matchPercent != null && <span className="mr-pill mr-pill--red">{assessmentTarget.matchPercent}% match</span>}
                </div>
                <ul className="mr-target-meta">
                  {assessmentTarget.company && <li><Building2 /> {assessmentTarget.company}</li>}
                </ul>
                <p className="mr-target-note">No roadmap yet — Mate will pace a week-by-week plan toward this program’s application window.</p>
                {generateError && <p className="mr-error" role="alert">{generateError}</p>}
              </div>
              <div className="mr-target-actions">
                <button type="button" className="mr-btn mr-btn--ghost" onClick={backToDirection} data-testid="button-back-to-direction">
                  <Compass /> View Fit Assessment
                </button>
                <button
                  type="button"
                  className="mr-btn mr-btn--primary"
                  onClick={() => void generate(assessmentTarget)}
                  disabled={generating}
                  data-testid="button-generate-roadmap"
                >
                  {generating ? <Loader2 className="mr-spin" /> : <Sparkles />}
                  {generating ? 'Building your roadmap…' : 'Generate My Roadmap'}
                </button>
              </div>
            </section>
            {recommendations}
          </>
        ) : roadmap ? (
          <>
            {/* 1. Your Target Program */}
            <section className="mr-card mr-target" data-testid="roadmap-header-card" aria-labelledby="mr-target-title">
              <div className="mr-target-main">
                <span className="mr-eyebrow">Your Target Program</span>
                <div className="mr-target-title">
                  <h2 id="mr-target-title">{roadmap.target_program}</h2>
                  {roadmap.match_percent != null && (
                    <span className="mr-pill mr-pill--red" data-testid="roadmap-match">{roadmap.match_percent}% match</span>
                  )}
                </div>
                <ul className="mr-target-meta">
                  {roadmap.target_company && <li><Building2 /> {roadmap.target_company}</li>}
                  {roadmap.target_function && <li><Briefcase /> {roadmap.target_function}</li>}
                  <li>
                    <CalendarDays />
                    <span>
                      <b>{schedule.length}-week plan</b>
                      {` · ${STUDY_PACE_META[paceConfig?.pace || DEFAULT_STUDY_PACE].label} pace`}
                    </span>
                  </li>
                </ul>
                <p className="mr-target-note">
                  Application status: this program may be open — confirm dates on the company’s careers page before you apply.
                </p>
                {generateError && <p className="mr-error" role="alert">{generateError}</p>}
              </div>
              <div className="mr-target-actions">
                {!confirmRegenerate ? (
                  <>
                    <button type="button" className="mr-btn mr-btn--ghost" onClick={backToDirection} data-testid="button-back-to-direction">
                      <Compass /> View Fit Assessment
                    </button>
                    <button
                      type="button"
                      className="mr-btn mr-btn--ghost"
                      onClick={() => setConfirmRegenerate(true)}
                      disabled={generating}
                      data-testid="button-regenerate-roadmap"
                    >
                      <RefreshCw /> Regenerate
                    </button>
                  </>
                ) : (
                  <div className="mr-confirm">
                    <span>Replace this roadmap with a fresh one from today?</span>
                    <button
                      type="button"
                      className="mr-btn mr-btn--primary mr-btn--sm"
                      onClick={() => regenerateTarget && void generate(regenerateTarget)}
                      disabled={generating}
                      data-testid="button-confirm-regenerate"
                    >
                      {generating ? <Loader2 className="mr-spin" /> : <RefreshCw />}
                      Yes, regenerate
                    </button>
                    <button type="button" className="mr-btn mr-btn--ghost mr-btn--sm" onClick={() => setConfirmRegenerate(false)} disabled={generating}>
                      Keep current
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 2. Choose Your Study Pace — preview first, saved only on Apply */}
            {schedule.length > 0 && (
              <StudyPaceSelector
                baseSchedule={baseSchedule}
                config={paceConfig}
                effectiveWeek={paceEffectiveWeek}
                focusWeek={focusWeekNumber}
                saving={savingPace}
                error={paceError}
                notice={paceNotice || (localPace && !roadmap.study_pace_json ? 'Saved on this device only.' : null)}
                onApply={(pace) => void applyStudyPaceChoice(pace)}
              />
            )}

            {/* 3. Overall Learning Progress — whole-plan completion, read-only */}
            <OverallProgress schedule={schedule} progress={progress} status={sessionsState} />

            {/* 4. Your Progress This Week — read-only, no practice CTAs */}
            <section className="mr-card" data-testid="roadmap-progress-summary" data-plan-state={planState.kind} aria-labelledby="mr-progress-title">
              <div className="mr-sec-head">
                <div>
                  <span className="mr-eyebrow">Where you stand</span>
                  <h2 className="mr-h2" id="mr-progress-title">Your Progress This Week</h2>
                  <p className="mr-sub">
                    {goalWeek
                      ? <>Week {goalWeek.week} · {shortDateLabel(goalWeek.start_date)} – {shortDateLabel(goalWeek.end_date)}{currentPhase ? <> · <strong>{currentPhase.name}</strong></> : null}</>
                      : <>Your {schedule.length}-week plan ended on {fullDateLabel(schedule[schedule.length - 1].end_date)}.</>}
                  </p>
                </div>
                {planState.kind === 'active' && <span className="mr-pill mr-pill--red">Week {planState.week} of {schedule.length}</span>}
                {planState.kind === 'before' && (
                  <span className="mr-pill mr-pill--soft" data-testid="roadmap-starts-on">Starts {fullDateLabel(planState.startsOn)}</span>
                )}
                {planState.kind === 'complete' && (
                  <span className="mr-pill mr-pill--green" data-testid="roadmap-plan-complete"><Flag size={13} /> Plan complete</span>
                )}
              </div>

              <div className="mr-stats">
                <Stat
                  testId="roadmap-summary-week"
                  label="Current week"
                  value={planState.kind === 'active' ? `${planState.week}/${schedule.length}` : planState.kind === 'before' ? `0/${schedule.length}` : `${schedule.length}/${schedule.length}`}
                  sub={goalWeek && planState.kind === 'active'
                    ? `${shortDateLabel(goalWeek.start_date)} – ${shortDateLabel(goalWeek.end_date)}`
                    : planState.kind === 'before'
                      ? `Starts ${fullDateLabel(planState.startsOn)}`
                      : `Ended ${fullDateLabel(schedule[schedule.length - 1].end_date)}`}
                />
                <Stat
                  testId="roadmap-summary-phase"
                  label="Current phase"
                  value={currentPhase?.name || '—'}
                  sub={currentPhase ? `Phase ${currentPhase.index} of ${phases.length}` : undefined}
                  text
                />
                {goalTotals ? (
                  <>
                    <Stat
                      testId="roadmap-summary-weekly"
                      label={planState.kind === 'before' ? 'Week 1 completion' : 'Weekly completion'}
                      value={`${goalTotals.counted}/${goalTotals.target}`}
                      sub={goalTotals.extra > 0 ? `activities · +${goalTotals.extra} extra` : 'activities completed'}
                    />
                    <Stat
                      testId="roadmap-summary-remaining"
                      label="Remaining"
                      value={String(goalTotals.remaining)}
                      sub={goalTotals.remaining === 0
                        ? 'Weekly target reached'
                        : `activit${goalTotals.remaining === 1 ? 'y' : 'ies'} ${planState.kind === 'before' ? 'in Week 1' : 'left this week'}`}
                    />
                  </>
                ) : (
                  <>
                    <Stat testId="roadmap-summary-weekly" label="Whole plan" value={`${planTotals.counted}/${planTotals.target}`} sub="activities completed" />
                    <Stat testId="roadmap-summary-remaining" label="Extra practice" value={String(planTotals.extra)} sub="beyond weekly targets" />
                  </>
                )}
              </div>

              {goalWeek && (
                <div className="mr-grid-3" data-testid="roadmap-weekly-goals">
                  {TRACKS.map((track) => {
                    const target = track.targetOf(goalWeek);
                    const goal = goalProgress(track.doneOf(progress[goalWeek.week]), target);
                    const Icon = track.icon;
                    return (
                      <div key={track.key} className="mr-track" data-testid={`roadmap-goal-${track.key}`}>
                        <div className="mr-track-head">
                          <span className="mr-track-icon"><Icon /></span>
                          <div>
                            <div className="mr-track-name">{track.label}</div>
                            <div className="mr-track-goal">Target: {target} {target === 1 ? track.unitOne : track.unit}</div>
                          </div>
                          <span className={`mr-track-count mr-num${goal.complete ? ' is-done' : ''}`} data-testid={`roadmap-goal-${track.key}-count`}>
                            {goal.counted}/{target}
                          </span>
                        </div>
                        <div style={{ marginTop: 12 }}><Bar done={goal.counted} target={target} /></div>
                        <div className="mr-track-foot">
                          {goal.complete
                            ? <span className="is-done"><CheckCircle2 size={14} /> Target reached</span>
                            : <span>{target - goal.counted} to go{planState.kind === 'before' ? ' in Week 1' : ' this week'}</span>}
                          <Extra extra={goal.extra} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <TodaysFocus state={skillFocus} />

              {planState.kind === 'before' && (
                <p className="mr-note">
                  Your plan starts on <strong>{fullDateLabel(planState.startsOn)}</strong>. Sessions you complete from that day count toward Week 1.
                </p>
              )}
              {!hasAnyPractice && planState.kind === 'active' && (
                <p className="mr-note" data-testid="roadmap-empty-state">
                  <strong>No activity yet.</strong> These bars fill automatically as you finish cases, drills and tests — pick a starting point in the recommendations below.
                </p>
              )}

              <div data-testid="roadmap-start-date">
                <div className="mr-start">
                  <CalendarDays />
                  <span>
                    Week 1 {planState.kind === 'before' ? 'starts' : 'started'}{' '}
                    <b data-testid="roadmap-week1-date">{fullDateLabel(weekOneIso)}</b>
                    {usingCustomStart ? ' · your chosen date' : defaultStart ? ` · ${START_BASIS_LABEL[defaultStart.basis]}` : ''}
                  </span>
                  {!startEditorOpen && (
                    <button
                      type="button"
                      className="mr-link"
                      onClick={() => {
                        setStartDraft(isStartDateAllowed(weekOneIso, now) ? weekOneIso : todayIso(now));
                        setStartError(null);
                        setStartEditorOpen(true);
                      }}
                      data-testid="button-change-start-date"
                    >
                      Change start date
                    </button>
                  )}
                </div>
                {startNotice && !startEditorOpen && <p className="mr-sub">{startNotice}</p>}
                {startEditorOpen && (
                  <div className="mr-start-editor" data-testid="roadmap-start-date-editor">
                    <label htmlFor="roadmap-week1-input">When should Week 1 start?</label>
                    <p>
                      Pick any date from {fullDateLabel(bounds.min)} to {fullDateLabel(bounds.max)}. Your practice history stays the same; it is just grouped into weeks from the new date.
                    </p>
                    <div className="mr-start-row">
                      <input
                        id="roadmap-week1-input"
                        type="date"
                        min={bounds.min}
                        max={bounds.max}
                        value={startDraft}
                        onChange={(event) => setStartDraft(event.target.value)}
                        data-testid="input-start-date"
                      />
                      <button
                        type="button"
                        className="mr-btn mr-btn--primary mr-btn--sm"
                        onClick={() => void applyStartChoice(startDraft === defaultStart?.iso ? null : startDraft)}
                        disabled={!draftValid || savingStart}
                        data-testid="button-save-start-date"
                      >
                        {savingStart && <Loader2 className="mr-spin" />}
                        Save
                      </button>
                      <button
                        type="button"
                        className="mr-btn mr-btn--ghost mr-btn--sm"
                        onClick={() => {
                          setStartEditorOpen(false);
                          setStartError(null);
                        }}
                        disabled={savingStart}
                      >
                        Cancel
                      </button>
                    </div>
                    {!draftValid && startDraft && (
                      <p className="mr-error">Choose a date between {fullDateLabel(bounds.min)} and {fullDateLabel(bounds.max)}.</p>
                    )}
                    {startError && <p className="mr-error" role="alert">{startError}</p>}
                    {usingCustomStart && defaultStart && (
                      <button
                        type="button"
                        className="mr-link"
                        onClick={() => void applyStartChoice(null)}
                        disabled={savingStart}
                        data-testid="button-reset-start-date"
                      >
                        <RotateCcw size={14} />
                        Reset to default ({fullDateLabel(defaultStart.iso)})
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* 5. Recommended for Your Target Program — the only practice CTAs */}
            {recommendations}

            {/* 6. Preparation Timeline — planning only */}
            {schedule.length > 0 && (
              <PreparationTimeline
                schedule={schedule}
                phases={phases}
                status={planState}
                progress={progress}
                view={effectiveView}
                onViewChange={setTimelineView}
                focusWeek={focusWeekNumber}
              />
            )}

            <p className="mr-footnote">
              Weekly targets follow your {STUDY_PACE_META[paceConfig?.pace || DEFAULT_STUDY_PACE].label} study pace, paced toward the program’s
              {roadmap.window_kind === 'verified' ? ' verified' : ' estimated'} application window — always confirm exact dates on the
              company’s careers page. Progress counts your completed Case Pool, Case Drill and Aptitude Test sessions automatically: a
              session counts in the week you finish it, each case, drill or test counts once (retakes don’t add to the total), weekly
              targets cap at 100%, and anything beyond a target shows as extra. Changing your pace re-paces this week and every later
              week; weeks that have ended keep their targets.
            </p>
          </>
        ) : null}

        {status === 'ready' && (
          <div className="mr-restart">
            <button
              type="button"
              className="mr-link mr-link--muted"
              onClick={() => {
                setRestartError(null);
                setConfirmRestart(true);
              }}
              data-testid="button-restart-progress"
            >
              <RefreshCw size={14} />
              Restart fit assessment
            </button>
          </div>
        )}
      </div>

      {confirmRestart && (
        <div
          className="mr-modal-backdrop"
          data-testid="restart-progress-dialog-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !restarting) setConfirmRestart(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="restart-progress-title"
            aria-describedby="restart-progress-description"
            className="mr-modal"
            data-testid="restart-progress-dialog"
          >
            <h3 id="restart-progress-title">Restart your fit assessment?</h3>
            <div className="mr-modal-section">
              <p id="restart-progress-description">
                This clears your fit assessment results and questionnaire state so you can assess again. Your saved roadmap and practice progress stay available; the roadmap changes only when you explicitly regenerate it.
              </p>
              {restartError && <p className="mr-error" role="alert">{restartError}</p>}
            </div>
            <div className="mr-modal-foot">
              <button
                ref={restartCancelRef}
                type="button"
                className="mr-btn mr-btn--ghost"
                onClick={() => {
                  setRestartError(null);
                  setConfirmRestart(false);
                }}
                disabled={restarting}
                data-testid="button-cancel-restart"
              >
                Cancel
              </button>
              <button
                type="button"
                className="mr-btn mr-btn--primary"
                onClick={() => void restartProgress()}
                disabled={restarting}
                data-testid="button-confirm-restart"
              >
                {restarting && <Loader2 className="mr-spin" />}
                {restarting ? 'Restarting…' : 'Yes, restart assessment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
