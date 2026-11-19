// Casemate — "My Roadmap": the persistent personalized prep plan.
//
// Home of the roadmap generated from the "Generate My Roadmap" button in the
// Your Direction "How to get there" panel (and regenerable right here). Shows
// the target program + match %, an Overall Progress Summary (week X of N,
// phase, this week's completed/target and remaining activities), this week's
// goals per practice app with direct CTAs, and a compact four-phase timeline
// with This Week / Monthly / Full Plan views. Targets and phases come from the
// saved plan (lib/prepRoadmap.ts, prep_roadmaps table); progress is counted
// live from completed Case Pool, Case Drill and Aptitude Test sessions by
// lib/roadmapProgress.ts, re-bucketed whenever the Week 1 start date changes.
// Below the weekly goals, "Recommended for Your Target Program"
// (./RecommendedForTarget.tsx) suggests Domain Knowledge, Aptitude Test and Case
// Drill content for the target from founder-entered candidate reviews, falling
// back to general preparation.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Circle,
  Cpu,
  Factory,
  Flag,
  Globe2,
  HeartPulse,
  Hexagon,
  Landmark,
  Layers3,
  Loader2,
  Map as MapIcon,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  Truck,
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
  caseRecommendationsForProgram,
  openRecommendedCaseDrill,
} from '../../lib/caseTypeRecommendations';
import { deckFor } from '../IndustryKnowledge/learningDecks';
import {
  knowledgeRecommendationsForProgram,
  studyCardsForSubcategory,
} from '../IndustryKnowledge/industrySubcategories';
import type { KnowledgeRecommendation } from '../IndustryKnowledge/industrySubcategories';
import { trackAppSwitch, trackStepError, trackStepView } from '../../lib/engagementTracking';
import { isFounderEmail } from '../../lib/founderAccess';
import RecommendedForTarget from './RecommendedForTarget';

interface TrackMeta {
  key: 'case_pool' | 'case_drill' | 'aptitude';
  label: string;
  icon: typeof Target;
  dockAppId: string;
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
    dockAppId: 'case-drill-log',
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
    dockAppId: 'case-drill',
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
    dockAppId: 'aptitude-test',
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

function openPracticeTrack(track: TrackMeta) {
  trackAppSwitch('my-roadmap', track.dockAppId, { trigger: 'roadmap_practice_track' });
  openDockApp(track.dockAppId);
}

const KNOWLEDGE_ICONS: Record<string, typeof BookOpen> = {
  BookOpen, Briefcase, Cpu, Factory, Globe2, HeartPulse, Landmark, Layers3,
  ShieldCheck, ShoppingCart, Store, Target, Truck, Zap,
};

type DomainProgressMap = Record<string, { completed?: string[] }>;

function readDomainProgress(userId: string): DomainProgressMap {
  try {
    const cached = JSON.parse(localStorage.getItem(`casemate-domain-progress-v1:${userId}`) || 'null');
    return cached?.progress && typeof cached.progress === 'object' ? cached.progress : {};
  } catch {
    return {};
  }
}

function openKnowledgeArea(area: KnowledgeRecommendation) {
  trackStepView('my-roadmap', 'knowledge_areas', {
    properties: {
      topic_id: area.subcategoryId || area.pillar || area.industrySlug,
      industry_slug: area.industrySlug,
      subcategory_id: area.subcategoryId || null,
    },
  });
  trackAppSwitch('my-roadmap', 'industry-knowledge', { trigger: 'roadmap_knowledge_area' });
  try {
    sessionStorage.setItem('casemate-domain-pending-route', JSON.stringify({
      industrySlug: area.industrySlug,
      subcategoryId: area.subcategoryId,
      pillar: area.pillar,
    }));
  } catch {
    // The Domain Knowledge home still opens when session storage is unavailable.
  }
  openDockApp('industry-knowledge');
}

function knowledgeAreaProgress(area: KnowledgeRecommendation, progress: DomainProgressMap): number {
  const deck = deckFor(area.industrySlug);
  if (!deck) return 0;
  const completed = new Set(progress[area.industrySlug]?.completed || []);
  const cards = area.subcategoryId
    ? studyCardsForSubcategory(area.industrySlug, area.subcategoryId, deck.cards).map((entry) => entry.card)
    : area.pillar
      ? deck.cards.filter((card) => card.topic === area.pillar)
      : deck.cards;
  const ids = [...new Set(cards.map((card) => card.id))];
  if (ids.length === 0) return 0;
  return Math.round((ids.filter((id) => completed.has(id)).length / ids.length) * 100);
}

function KnowledgeProgressRing({ value }: { value: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  return <div className="relative h-12 w-12 shrink-0" aria-label={`${value}% complete`}><svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90"><circle cx="22" cy="22" r={radius} fill="none" stroke="var(--space-border-default)" strokeWidth="4" /><circle cx="22" cy="22" r={radius} fill="none" stroke="var(--space-brand-primary-600)" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} /></svg><span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-[var(--space-text-primary)]">{value}%</span></div>;
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

function ProgressBar({ done, target, className = '' }: { done: number; target: number; className?: string }) {
  const { pct, complete } = goalProgress(done, target);
  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-muted)] ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{
          width: `${Math.max(pct > 0 ? 4 : 0, pct)}%`,
          background: complete ? 'var(--space-semantic-success)' : 'var(--space-brand-primary-600)',
        }}
      />
    </div>
  );
}

function ExtraBadge({ extra }: { extra: number }) {
  if (extra <= 0) return null;
  return (
    <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--space-semantic-success-700)]">
      +{extra} extra
    </span>
  );
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

function phaseState(phase: RoadmapPhase, status: PlanStatus): WeekState {
  const states = phase.weeks.map((week) => weekState(week.week, status));
  if (states.includes('current')) return 'current';
  return states.every((state) => state === 'past') ? 'past' : 'upcoming';
}

const STATE_CHIP: Record<WeekState, { label: string; className: string }> = {
  current: {
    label: 'Current',
    className: 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]',
  },
  past: {
    label: 'Completed',
    className: 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]',
  },
};

function StateChip({ state, label }: { state: WeekState; label?: string }) {
  const chip = STATE_CHIP[state];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.className}`}>
      {state === 'past' ? <CheckCircle2 className="h-3 w-3" /> : state === 'upcoming' ? <Circle className="h-3 w-3" /> : null}
      {label || chip.label}
    </span>
  );
}

function stateSurface(state: WeekState): string {
  if (state === 'current') return 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)]';
  if (state === 'past') return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
  return 'border-dashed border-[var(--space-border-default)] bg-[var(--space-surface-card)] opacity-80';
}

function WeekRow({
  week,
  progress,
  state,
}: {
  week: RoadmapWeek;
  progress: WeekProgress | undefined;
  state: WeekState;
}) {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${stateSurface(state)}`} data-testid={`roadmap-week-${week.week}`}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-xs font-bold text-[var(--space-text-primary)]">Week {week.week}</span>
        <span className="text-[10px] text-[var(--space-text-muted)]">
          {shortDateLabel(week.start_date)} – {shortDateLabel(week.end_date)}
        </span>
        <span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">
          {week.theme}
        </span>
        <span className="ml-auto">
          <StateChip state={state} label={state === 'current' ? 'This week' : state === 'past' ? 'Past' : undefined} />
        </span>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {TRACKS.map((track) => {
          const target = track.targetOf(week);
          const goal = goalProgress(track.doneOf(progress), target);
          const Icon = track.icon;
          return (
            <div key={track.key}>
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
                <span className="text-[11px] font-semibold text-[var(--space-text-primary)]">{track.label}</span>
                <ExtraBadge extra={goal.extra} />
                <span
                  className={`ml-auto text-[11px] font-bold tabular-nums ${
                    goal.complete ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-text-secondary)]'
                  }`}
                >
                  {goal.counted}/{target}
                </span>
                {goal.complete && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-success)]" />}
              </div>
              <ProgressBar done={goal.counted} target={target} className="mt-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryStat({ label, value, sub, testId }: { label: string; value: string; sub?: string; testId: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2.5" data-testid={testId}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{label}</p>
      <p className="mt-0.5 break-words text-base font-extrabold leading-tight tabular-nums text-[var(--space-text-primary)]">{value}</p>
      {sub && <p className="mt-0.5 text-[10px] leading-4 text-[var(--space-text-secondary)]">{sub}</p>}
    </div>
  );
}

function GoalCard({
  track,
  week,
  progress,
}: {
  track: TrackMeta;
  week: RoadmapWeek;
  progress: WeekProgress | undefined;
}) {
  const target = track.targetOf(week);
  const goal = goalProgress(track.doneOf(progress), target);
  const Icon = track.icon;
  return (
    <div className="flex flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5" data-testid={`roadmap-goal-${track.key}`}>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--space-surface-accent-soft)]">
          <Icon className="h-4 w-4 text-[var(--space-text-brand)]" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--space-text-primary)]">{track.label}</p>
          <p className="text-[10px] text-[var(--space-text-muted)]">Goal: {target} {target === 1 ? track.unitOne : track.unit}</p>
        </div>
        <div className="ml-auto text-right">
          <p className={`text-lg font-extrabold tabular-nums ${goal.complete ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-text-primary)]'}`} data-testid={`roadmap-goal-${track.key}-count`}>
            {goal.counted}/{target}
          </p>
        </div>
      </div>
      <ProgressBar done={goal.counted} target={target} className="mt-3 h-2" />
      <div className="mt-1.5 flex min-h-5 items-center gap-1.5 text-[10px] text-[var(--space-text-secondary)]">
        {goal.complete ? (
          <span className="inline-flex items-center gap-1 font-semibold text-[var(--space-semantic-success)]">
            <CheckCircle2 className="h-3.5 w-3.5" /> Goal reached
          </span>
        ) : (
          <span>{target - goal.counted} to go this week</span>
        )}
        <ExtraBadge extra={goal.extra} />
      </div>
      <button
        type="button"
        onClick={() => openPracticeTrack(track)}
        className={`mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold hover:opacity-90 ${
          goal.complete
            ? 'border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)]'
            : 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
        }`}
        data-testid={`roadmap-goal-${track.key}-cta`}
      >
        <Icon className="h-3.5 w-3.5" />
        {goal.complete ? `Practise more in ${track.label}` : `Practise ${track.label}`}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function PhaseStrip({
  phases,
  status,
  progress,
}: {
  phases: RoadmapPhase[];
  status: PlanStatus;
  progress: Record<number, WeekProgress>;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 xl:grid-cols-4" data-testid="roadmap-phases">
      {phases.map((phase) => {
        const state = phaseState(phase, status);
        const totals = rangeTotals(phase.weeks, progress);
        return (
          <div
            key={phase.index}
            className={`rounded-xl border p-3 ${stateSurface(state)}`}
            data-testid={`roadmap-phase-${phase.index}`}
            data-state={state}
          >
            <div className="flex flex-wrap items-center justify-between gap-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Phase {phase.index}</p>
              <StateChip state={state} />
            </div>
            <p className={`mt-1 text-xs font-bold leading-snug ${state === 'current' ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-primary)]'}`}>{phase.name}</p>
            <p className="mt-0.5 text-[10px] text-[var(--space-text-muted)]">
              W{phase.weeks[0].week}–W{phase.weeks[phase.weeks.length - 1].week} · {shortDateLabel(phase.startIso)} – {shortDateLabel(phase.endIso)}
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] tabular-nums text-[var(--space-text-secondary)]">
              <span>{totals.counted}/{totals.target} activities</span>
              <ExtraBadge extra={totals.extra} />
            </div>
            <ProgressBar done={totals.counted} target={totals.target} className="mt-1" />
          </div>
        );
      })}
    </div>
  );
}

function RoadmapTimeline({
  schedule,
  phases,
  status,
  progress,
  view,
  onViewChange,
  expandedMonths,
  onToggleMonth,
}: {
  schedule: RoadmapWeek[];
  phases: RoadmapPhase[];
  status: PlanStatus;
  progress: Record<number, WeekProgress>;
  view: TimelineView;
  onViewChange: (view: TimelineView) => void;
  expandedMonths: Record<number, boolean>;
  onToggleMonth: (month: number) => void;
}) {
  const months = useMemo(() => groupWeeksIntoMonths(schedule), [schedule]);
  const focusWeek = status.kind === 'active'
    ? schedule.find((week) => week.week === status.week)
    : status.kind === 'before'
      ? schedule[0]
      : schedule[schedule.length - 1];
  const focusPhase = phases.find((phase) => phase.weeks.some((week) => week.week === focusWeek?.week)) || phases[0];

  return (
    <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-timeline">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[var(--space-text-primary)]">Preparation timeline</p>
          <p className="mt-0.5 text-xs text-[var(--space-text-muted)]">
            {schedule.length} weeks in {phases.length} phases · {fullDateLabel(schedule[0].start_date)} – {fullDateLabel(schedule[schedule.length - 1].end_date)}
          </p>
        </div>
        <div className="grid grid-cols-3 rounded-xl bg-[var(--space-surface-muted)] p-1 sm:inline-grid" role="tablist" aria-label="Timeline view" data-testid="roadmap-view-switcher">
          {TIMELINE_VIEWS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={view === option.id}
              onClick={() => onViewChange(option.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                view === option.id
                  ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)] shadow-sm'
                  : 'text-[var(--space-text-secondary)] hover:text-[var(--space-text-brand)]'
              }`}
              data-testid={`roadmap-view-${option.id}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <PhaseStrip phases={phases} status={status} progress={progress} />
      </div>

      <div className="mt-4" data-testid={`roadmap-view-panel-${view}`}>
        {view === 'week' && focusWeek && focusPhase && (
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
                Phase {focusPhase.index} · {focusPhase.name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {focusPhase.weeks.map((week) => {
                  const state = weekState(week.week, status);
                  const totals = weekTotals(week, progress[week.week]);
                  const met = totals.target > 0 && totals.counted >= totals.target;
                  return (
                    <span
                      key={week.week}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-bold tabular-nums ${
                        state === 'current'
                          ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                          : state === 'past'
                            ? 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)]'
                            : 'border-dashed border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-muted)]'
                      }`}
                      title={`Week ${week.week}: ${totals.counted}/${totals.target} activities`}
                    >
                      {state === 'past' && met ? <CheckCircle2 className="h-3 w-3 text-[var(--space-semantic-success)]" /> : null}
                      W{week.week}
                    </span>
                  );
                })}
              </div>
            </div>
            <WeekRow week={focusWeek} progress={progress[focusWeek.week]} state={weekState(focusWeek.week, status)} />
          </div>
        )}

        {view === 'month' && (
          <div className="space-y-2" data-testid="roadmap-months">
            {months.map((month) => {
              const expanded = !!expandedMonths[month.month];
              const firstWeek = month.weeks[0];
              const lastWeek = month.weeks[month.weeks.length - 1];
              const states = month.weeks.map((week) => weekState(week.week, status));
              const state: WeekState = states.includes('current') ? 'current' : states.every((s) => s === 'past') ? 'past' : 'upcoming';
              const totals = TRACKS.map((track) => {
                let target = 0;
                let done = 0;
                month.weeks.forEach((week) => {
                  target += track.targetOf(week);
                  done += goalProgress(track.doneOf(progress[week.week]), track.targetOf(week)).counted;
                });
                return { track, target, done };
              });
              return (
                <div key={month.month} className={`overflow-hidden rounded-xl border ${stateSurface(state)}`} data-testid={`roadmap-month-${month.month}`}>
                  <button
                    type="button"
                    onClick={() => onToggleMonth(month.month)}
                    aria-expanded={expanded}
                    className="flex w-full items-start justify-between gap-3 px-3 py-2.5 text-left hover:bg-[var(--space-surface-muted)]"
                  >
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--space-text-primary)]">
                        {month.label}
                        <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">
                          W{firstWeek.week}–W{lastWeek.week} · {shortDateLabel(firstWeek.start_date)} – {shortDateLabel(lastWeek.end_date)}
                        </span>
                        <StateChip state={state} />
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                        {totals.map(({ track, target, done }) => (
                          <span key={track.key} className="text-[11px] tabular-nums text-[var(--space-text-secondary)]">
                            <span className="font-semibold text-[var(--space-text-primary)]">{track.label}</span>{' '}
                            {done}/{target}
                          </span>
                        ))}
                      </div>
                    </div>
                    {expanded ? (
                      <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />
                    ) : (
                      <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />
                    )}
                  </button>
                  {expanded && (
                    <div className="space-y-2 border-t border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5">
                      {month.weeks.map((week) => (
                        <WeekRow key={week.week} week={week} progress={progress[week.week]} state={weekState(week.week, status)} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {view === 'full' && (
          <div className="space-y-4" data-testid="roadmap-full-plan">
            {phases.map((phase) => (
              <div key={phase.index}>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
                  Phase {phase.index} · {phase.name}
                </p>
                <div className="overflow-hidden rounded-xl border border-[var(--space-border-default)]">
                  {phase.weeks.map((week, index) => {
                    const state = weekState(week.week, status);
                    return (
                      <div
                        key={week.week}
                        className={`flex flex-col gap-1.5 px-3 py-2 sm:flex-row sm:items-center sm:gap-3 ${index > 0 ? 'border-t border-[var(--space-border-default)]' : ''} ${
                          state === 'current' ? 'bg-[var(--space-surface-accent-soft)]' : state === 'upcoming' ? 'bg-[var(--space-surface-card)] opacity-80' : 'bg-[var(--space-surface-card)]'
                        }`}
                        data-testid={`roadmap-full-week-${week.week}`}
                        data-state={state}
                      >
                        <div className="flex min-w-0 items-center gap-2 sm:w-44 sm:shrink-0">
                          <span className="text-xs font-bold text-[var(--space-text-primary)]">W{week.week}</span>
                          <span className="text-[10px] text-[var(--space-text-muted)]">{shortDateLabel(week.start_date)} – {shortDateLabel(week.end_date)}</span>
                          <span className="sm:hidden"><StateChip state={state} label={state === 'current' ? 'This week' : state === 'past' ? 'Past' : undefined} /></span>
                        </div>
                        <div className="grid flex-1 grid-cols-3 gap-2">
                          {TRACKS.map((track) => {
                            const target = track.targetOf(week);
                            const goal = goalProgress(track.doneOf(progress[week.week]), target);
                            return (
                              <div key={track.key} className="min-w-0">
                                <div className="flex items-center justify-between gap-1 text-[10px] tabular-nums">
                                  <span className="font-semibold text-[var(--space-text-secondary)]" title={track.label}>{track.short}</span>
                                  <span className={goal.complete ? 'font-bold text-[var(--space-semantic-success)]' : 'text-[var(--space-text-secondary)]'}>
                                    {goal.counted}/{target}{goal.extra > 0 ? ` +${goal.extra}` : ''}
                                  </span>
                                </div>
                                <ProgressBar done={goal.counted} target={target} className="mt-0.5 h-1" />
                              </div>
                            );
                          })}
                        </div>
                        <span className="hidden sm:block sm:w-24 sm:shrink-0 sm:text-right">
                          <StateChip state={state} label={state === 'current' ? 'This week' : state === 'past' ? 'Past' : undefined} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className="text-[10px] text-[var(--space-text-muted)]">CP = Case Pool · CD = Case Drill · AT = Aptitude Test</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function MyRoadmapApp() {
  const { sessionId, userEmail, userRole } = useSpaceRuntime();
  // Same founder detection as the Usage · Founder dashboard; the review server
  // function re-checks the verified session email on every write.
  const isReviewAdmin = isFounderEmail(userEmail) || userRole === 'founder';
  const userId = useMemo(() => resolveRoadmapIdentity(sessionId, userEmail).userKey, [sessionId, userEmail]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [roadmap, setRoadmap] = useState<SavedRoadmap | null>(null);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
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
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>({});
  const [domainProgress, setDomainProgress] = useState<DomainProgressMap>(() => readDomainProgress(userId));
  const [now, setNow] = useState(() => new Date());
  const [timelineView, setTimelineView] = useState<TimelineView | null>(null);
  const [startChoice, setStartChoice] = useState<string | null>(null);
  const [startNotice, setStartNotice] = useState<string | null>(null);
  const [profileSavedAt, setProfileSavedAt] = useState<string | null>(null);
  const [startEditorOpen, setStartEditorOpen] = useState(false);
  const [startDraft, setStartDraft] = useState('');
  const [savingStart, setSavingStart] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setDomainProgress(readDomainProgress(userId));
    sync();
    window.addEventListener('casemate:domain-progress-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('casemate:domain-progress-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, [userId]);

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
    if (loaded) setSessions(loaded);
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
        if (loaded) setSessions(loaded);
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
          sessionId,
          accountEmail: userEmail,
        });
        roadmapOwnerRef.current = userId;
        setRoadmap(saved);
        setConfirmRegenerate(false);
        setExpandedMonths({});
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
    [sessionId, userEmail, userId, roadmap, refreshSessions],
  );

  useEffect(() => {
    if (!hasPendingSelection || !assessmentTarget || generating || status !== 'ready') return;
    setHasPendingSelection(false);
    void generate(assessmentTarget);
  }, [hasPendingSelection, assessmentTarget, generating, status, generate]);

  useEffect(() => {
    if (!confirmRestart) return;
    restartCancelRef.current?.focus();
  }, [confirmRestart]);

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
  const schedule = useMemo(() => (roadmap ? buildWeekSchedule(roadmap.plan_json, weekOneIso) : []), [roadmap, weekOneIso]);
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
  const bounds = startDateBounds(now);

  const recommendedCaseTypes = useMemo(() => roadmap ? caseRecommendationsForProgram({
    company: roadmap.target_company,
    program: roadmap.target_program,
  }) : [], [roadmap]);
  const knowledgeAreas = useMemo(() => roadmap
    ? knowledgeRecommendationsForProgram(roadmap.target_program, roadmap.target_company).slice(0, 4)
    : [], [roadmap]);
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

  // Default-expand the month containing the current week (or the first month).
  useEffect(() => {
    if (!roadmap || schedule.length === 0) return;
    const months = groupWeeksIntoMonths(schedule);
    setExpandedMonths((previous) => {
      if (Object.keys(previous).length > 0) return previous;
      const target = goalWeek ? months.find((month) => month.weeks.some((week) => week.week === goalWeek.week)) : months[0];
      return target ? { [target.month]: true } : { [months[0].month]: true };
    });
  }, [roadmap, schedule, goalWeek]);

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

  const regenerateTarget: AssessmentTarget | null = roadmap
    ? {
        program: roadmap.target_program,
        company: roadmap.target_company,
        matchPercent: roadmap.match_percent,
      }
    : assessmentTarget;

  const draftValid = isStartDateAllowed(startDraft, now);

  return (
    <div
      className="flex min-h-full w-full flex-col bg-[var(--space-surface-page)] [&_button]:min-h-11 [&_button]:min-w-11"
      onPointerEnter={refreshIfStale}
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl space-y-4 px-4 py-5 sm:space-y-5 sm:px-7 sm:py-7 lg:px-10">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-bold text-[var(--space-text-primary)]">
            <MapIcon className="h-5 w-5 text-[var(--space-text-brand)]" />
            My Roadmap
          </h1>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">
            Your personalized preparation plan — see this week’s goals and track your progress.
          </p>
        </div>

        {status === 'loading' ? (
          <div className="flex items-center gap-2 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-sm text-[var(--space-text-muted)] sm:p-5">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading your roadmap…
          </div>
        ) : status === 'error' ? (
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-sm leading-6 text-[var(--space-text-secondary)] sm:p-5">
            Your roadmap is temporarily unavailable — please reopen this app in a moment.
          </div>
        ) : !roadmap && !assessmentTarget ? (
          <>
          {/* No roadmap AND no saved direction — the assessment comes first. */}
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="roadmap-needs-assessment">
            <p className="text-sm font-semibold text-[var(--space-text-primary)]">
              Complete your fit assessment first to generate your roadmap
            </p>
            <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              Your roadmap is built from your Fit Assessment result and target timeline. If you already know
              your target, validate that program and function; otherwise use Exploration to discover a direction.
              Confirm your CV and assessment information, then generate the plan. It’s completely free.
            </p>
            <button
              type="button"
              onClick={backToDirection}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-2 text-sm font-semibold sm:w-auto text-[var(--space-text-on-primary)] hover:opacity-90"
            >
              <ArrowLeft className="h-4 w-4" />
              Start my fit assessment
            </button>
          </div>
          <RecommendedForTarget
            target={null}
            sessionId={sessionId}
            userKey={userId}
            isAdmin={isReviewAdmin}
            onChooseTarget={backToDirection}
          />
          </>
        ) : !roadmap && assessmentTarget ? (
          <>
          {/* Direction exists but no roadmap yet — generate right here. */}
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="roadmap-generate-cta">
            <p className="text-sm font-semibold text-[var(--space-text-primary)]">No roadmap yet — let’s build yours</p>
            <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              Based on your direction, your target is{' '}
              <span className="font-semibold text-[var(--space-text-primary)]">{assessmentTarget.program}</span>
              {assessmentTarget.matchPercent != null ? ` (${assessmentTarget.matchPercent}% match)` : ''}. Mate will
              pace a week-by-week plan toward its application window, scaled to your practice so far.
            </p>
            {generateError && (
              <p className="mt-2 text-xs font-semibold text-[var(--space-semantic-danger)]">{generateError}</p>
            )}
            <button
              type="button"
              onClick={() => void generate(assessmentTarget)}
              disabled={generating}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-2 text-sm font-semibold sm:w-auto text-[var(--space-text-on-primary)] hover:opacity-90 disabled:opacity-60"
              data-testid="button-generate-roadmap"
            >
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {generating ? 'Building your roadmap…' : 'Generate My Roadmap'}
            </button>
          </div>
          <RecommendedForTarget
            target={recommendationTarget}
            sessionId={sessionId}
            userKey={userId}
            isAdmin={isReviewAdmin}
            onChooseTarget={backToDirection}
          />
          </>
        ) : roadmap ? (
          <>
            {/* Target program + window header */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-header-card">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Your target</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold leading-snug text-[var(--space-text-primary)]">
                  {roadmap.target_program}
                </h2>
                {roadmap.match_percent != null && (
                  <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--space-text-on-primary)]">
                    {roadmap.match_percent}% match
                  </span>
                )}
              </div>
              {(roadmap.target_company || roadmap.target_function) && (
                <p className="mt-1 text-xs font-semibold text-[var(--space-text-secondary)]">
                  {[roadmap.target_company, roadmap.target_function].filter(Boolean).join(' · ')}
                </p>
              )}
              <div className="mt-2 space-y-1">
                <p className="flex items-start gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
                  <span>
                    <span className="font-semibold text-[var(--space-text-primary)]">Application status:</span>{' '}
                    This program may be open — check the company's careers page to confirm before you apply.
                  </span>
                </p>
                <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="font-semibold text-[var(--space-text-primary)]">{schedule.length}-week plan</span>
                  {roadmap.baseline_json ? ` · paced from your ${roadmap.baseline_json.level} baseline (${roadmap.baseline_json.total_sessions} completed session${roadmap.baseline_json.total_sessions === 1 ? '' : 's'})` : ''}
                </p>
              </div>
              <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={backToDirection}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-semibold sm:w-auto sm:py-1.5 text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
                  data-testid="button-back-to-direction"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Fit Assessment
                </button>
                {!confirmRegenerate ? (
                  <button
                    type="button"
                    onClick={() => setConfirmRegenerate(true)}
                    disabled={generating}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-semibold sm:w-auto sm:py-1.5 text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:opacity-60"
                    data-testid="button-regenerate-roadmap"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Regenerate
                  </button>
                ) : (
                  <span className="inline-flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--space-text-secondary)]">
                    Replace this roadmap with a fresh one from today?
                    <button
                      type="button"
                      onClick={() => regenerateTarget && void generate(regenerateTarget)}
                      disabled={generating}
                      className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-brand-primary-600)] px-2.5 py-1 text-[11px] font-bold text-[var(--space-text-on-primary)] hover:opacity-90 disabled:opacity-60"
                      data-testid="button-confirm-regenerate"
                    >
                      {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                      Yes, regenerate
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmRegenerate(false)}
                      disabled={generating}
                      className="rounded-lg border border-[var(--space-border-strong)] px-2.5 py-1 text-[11px] font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
                    >
                      Keep current
                    </button>
                  </span>
                )}
              </div>
              {generateError && (
                <p className="mt-2 text-xs font-semibold text-[var(--space-semantic-danger)]">{generateError}</p>
              )}
            </div>

            {/* Overall Progress Summary */}
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-progress-summary" data-plan-state={planState.kind}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-[var(--space-text-primary)]">Overall progress</p>
                {planState.kind === 'active' && (
                  <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--space-text-on-primary)]">
                    Week {planState.week} of {schedule.length}
                  </span>
                )}
                {planState.kind === 'before' && (
                  <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--space-text-brand)]" data-testid="roadmap-starts-on">
                    Starts on {fullDateLabel(planState.startsOn)}
                  </span>
                )}
                {planState.kind === 'complete' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--space-semantic-success-700)]" data-testid="roadmap-plan-complete">
                    <Flag className="h-3 w-3" /> Plan complete
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
                <SummaryStat
                  testId="roadmap-summary-week"
                  label="Current week"
                  value={planState.kind === 'active' ? `${planState.week}/${schedule.length}` : planState.kind === 'before' ? `0/${schedule.length}` : `${schedule.length}/${schedule.length}`}
                  sub={goalWeek && planState.kind === 'active'
                    ? `${shortDateLabel(goalWeek.start_date)} – ${shortDateLabel(goalWeek.end_date)}`
                    : planState.kind === 'before'
                      ? `Starts ${fullDateLabel(planState.startsOn)}`
                      : `Ended ${fullDateLabel(schedule[schedule.length - 1].end_date)}`}
                />
                <SummaryStat
                  testId="roadmap-summary-phase"
                  label="Phase"
                  value={currentPhase?.name || '—'}
                  sub={currentPhase ? `Phase ${currentPhase.index} of ${phases.length}` : undefined}
                />
                {goalTotals ? (
                  <>
                    <SummaryStat
                      testId="roadmap-summary-weekly"
                      label={planState.kind === 'before' ? 'Week 1 goal' : 'This week'}
                      value={`${goalTotals.counted}/${goalTotals.target}`}
                      sub={goalTotals.extra > 0 ? `activities done · +${goalTotals.extra} extra` : 'activities done'}
                    />
                    <SummaryStat
                      testId="roadmap-summary-remaining"
                      label="Remaining"
                      value={String(goalTotals.remaining)}
                      sub={goalTotals.remaining === 0
                        ? 'Weekly goals reached'
                        : `activit${goalTotals.remaining === 1 ? 'y' : 'ies'} ${planState.kind === 'before' ? 'to do in Week 1' : 'left this week'}`}
                    />
                  </>
                ) : (
                  <>
                    <SummaryStat testId="roadmap-summary-weekly" label="Whole plan" value={`${planTotals.counted}/${planTotals.target}`} sub="activities done" />
                    <SummaryStat testId="roadmap-summary-remaining" label="Extra practice" value={String(planTotals.extra)} sub="beyond weekly goals" />
                  </>
                )}
              </div>

              <div className="mt-3" data-testid="roadmap-overall-progress">
                <div className="flex flex-col gap-0.5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold text-[var(--space-text-primary)]">Whole plan</span>
                  <span className="font-bold tabular-nums text-[var(--space-text-secondary)]">
                    {planTotals.counted}/{planTotals.target} activities{planTotals.extra > 0 ? ` · +${planTotals.extra} extra` : ''}
                  </span>
                </div>
                <ProgressBar done={planTotals.counted} target={planTotals.target} className="mt-1.5 h-2" />
              </div>

              <div className="mt-3 border-t border-[var(--space-border-default)] pt-3" data-testid="roadmap-start-date">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
                  <span className="text-[11px] text-[var(--space-text-secondary)]">
                    Week 1 {planState.kind === 'before' ? 'starts' : 'started'}{' '}
                    <span className="font-semibold text-[var(--space-text-primary)]" data-testid="roadmap-week1-date">{fullDateLabel(weekOneIso)}</span>
                    {usingCustomStart ? ' · your chosen date' : defaultStart ? ` · ${START_BASIS_LABEL[defaultStart.basis]}` : ''}
                  </span>
                  {!startEditorOpen && (
                    <button
                      type="button"
                      onClick={() => {
                        setStartDraft(isStartDateAllowed(weekOneIso, now) ? weekOneIso : todayIso(now));
                        setStartError(null);
                        setStartEditorOpen(true);
                      }}
                      className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-[var(--space-text-brand)] underline decoration-[var(--space-border-strong)] underline-offset-4 hover:opacity-80"
                      data-testid="button-change-start-date"
                    >
                      Change start date
                    </button>
                  )}
                </div>
                {startNotice && !startEditorOpen && (
                  <p className="mt-1 text-[10px] text-[var(--space-text-muted)]">{startNotice}</p>
                )}
                {startEditorOpen && (
                  <div className="mt-2.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="roadmap-start-date-editor">
                    <label htmlFor="roadmap-week1-input" className="text-[11px] font-semibold text-[var(--space-text-primary)]">
                      When should Week 1 start?
                    </label>
                    <p className="mt-0.5 text-[10px] leading-4 text-[var(--space-text-muted)]">
                      Pick any date from {fullDateLabel(bounds.min)} to {fullDateLabel(bounds.max)}. Your practice history stays the same; it is just grouped into weeks from the new date.
                    </p>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <input
                        id="roadmap-week1-input"
                        type="date"
                        min={bounds.min}
                        max={bounds.max}
                        value={startDraft}
                        onChange={(event) => setStartDraft(event.target.value)}
                        className="min-h-11 w-full rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-3 text-sm text-[var(--space-text-primary)] sm:w-48"
                        data-testid="input-start-date"
                      />
                      <div className="grid grid-cols-2 gap-2 sm:flex">
                        <button
                          type="button"
                          onClick={() => void applyStartChoice(startDraft === defaultStart?.iso ? null : startDraft)}
                          disabled={!draftValid || savingStart}
                          className="inline-flex items-center justify-center gap-1 rounded-lg bg-[var(--space-brand-primary-600)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-on-primary)] hover:opacity-90 disabled:opacity-50"
                          data-testid="button-save-start-date"
                        >
                          {savingStart && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setStartEditorOpen(false);
                            setStartError(null);
                          }}
                          disabled={savingStart}
                          className="rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    {!draftValid && startDraft && (
                      <p className="mt-1.5 text-[10px] font-semibold text-[var(--space-semantic-danger)]">Choose a date between {fullDateLabel(bounds.min)} and {fullDateLabel(bounds.max)}.</p>
                    )}
                    {startError && <p className="mt-1.5 text-[10px] font-semibold text-[var(--space-semantic-danger)]" role="alert">{startError}</p>}
                    {usingCustomStart && defaultStart && (
                      <button
                        type="button"
                        onClick={() => void applyStartChoice(null)}
                        disabled={savingStart}
                        className="mt-2 inline-flex items-center gap-1 rounded-lg px-1 py-1 text-[11px] font-semibold text-[var(--space-text-secondary)] underline decoration-[var(--space-border-strong)] underline-offset-4 hover:text-[var(--space-text-brand)]"
                        data-testid="button-reset-start-date"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset to default ({fullDateLabel(defaultStart.iso)})
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Weekly goals */}
            {goalWeek ? (
              <section data-testid="roadmap-weekly-goals">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-sm font-bold text-[var(--space-text-primary)]">
                    {planState.kind === 'before' ? 'Week 1 goals' : 'This week’s goals'}
                    <span className="ml-2 text-[11px] font-semibold text-[var(--space-text-muted)]">
                      Week {goalWeek.week} · {shortDateLabel(goalWeek.start_date)} – {shortDateLabel(goalWeek.end_date)} · {goalWeek.theme}
                    </span>
                  </p>
                </div>
                {planState.kind === 'before' && (
                  <p className="mb-2 rounded-xl bg-[var(--space-surface-accent-soft)] px-3 py-2 text-[11px] leading-5 text-[var(--space-text-secondary)]">
                    Your plan starts on <span className="font-semibold text-[var(--space-text-primary)]">{fullDateLabel(planState.startsOn)}</span>. Sessions you complete from that day count toward Week 1.
                  </p>
                )}
                {!hasAnyPractice && planState.kind === 'active' && (
                  <div className="mb-2 flex flex-col gap-2 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-3 sm:flex-row sm:items-center sm:justify-between" data-testid="roadmap-empty-state">
                    <div>
                      <p className="text-xs font-bold text-[var(--space-text-primary)]">Start your first practice</p>
                      <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">A quick Case Drill takes a few minutes. Every case, drill or test you finish this week fills these bars.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openPracticeTrack(TRACKS[1])}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-2 text-xs font-bold text-[var(--space-text-on-primary)] hover:opacity-90"
                      data-testid="button-start-first-practice"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      Start your first practice
                    </button>
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-3">
                  {TRACKS.map((track) => (
                    <GoalCard key={track.key} track={track} week={goalWeek} progress={progress[goalWeek.week]} />
                  ))}
                </div>
              </section>
            ) : (
              <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-weekly-goals-complete">
                <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--space-text-primary)]">
                  <Flag className="h-4 w-4 text-[var(--space-semantic-success)]" />
                  Plan complete
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                  You’ve reached the end of your {schedule.length}-week plan. Review every week in the Full Plan below, keep practising, or regenerate a fresh roadmap for your next target.
                </p>
                <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap">
                  {TRACKS.map((track) => {
                    const Icon = track.icon;
                    return (
                      <button
                        key={track.key}
                        type="button"
                        onClick={() => openPracticeTrack(track)}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-2 text-[11px] font-semibold sm:w-auto sm:py-1.5 text-[var(--space-text-brand)] hover:opacity-90"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        Practise in {track.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <RecommendedForTarget
              target={recommendationTarget}
              sessionId={sessionId}
              userKey={userId}
              isAdmin={isReviewAdmin}
              onChooseTarget={backToDirection}
            />

            <RoadmapTimeline
              schedule={schedule}
              phases={phases}
              status={planState}
              progress={progress}
              view={effectiveView}
              onViewChange={setTimelineView}
              expandedMonths={expandedMonths}
              onToggleMonth={(month) => setExpandedMonths((prev) => ({ ...prev, [month]: !prev[month] }))}
            />

            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-case-priorities">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[var(--space-text-primary)]">Case Types to Practice</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">The top 3 case types for your target program’s industry. Choose one to open the right Case Drill filter.</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {recommendedCaseTypes.map((caseType, index) => (
                  <button key={caseType.label} type="button" onClick={() => {
                    trackStepView('my-roadmap', 'case_types', { properties: { case_type: caseType.drillSkillId, case_type_label: caseType.label, rank: index + 1 } });
                    trackAppSwitch('my-roadmap', 'case-drill', { trigger: 'roadmap_case_type' });
                    openRecommendedCaseDrill(caseType.drillSkillId, sessionId);
                  }} className="flex items-center gap-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 text-left hover:border-[var(--space-brand-primary-200)]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--space-brand-primary-600)] text-xs font-bold text-[var(--space-text-on-primary)]">{index + 1}</span>
                    <span className="text-xs font-semibold text-[var(--space-text-primary)]">{caseType.label}</span>
                    <Zap className="ml-auto h-3.5 w-3.5 text-[var(--space-text-brand)]" />
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-knowledge-areas">
              <div>
                <p className="text-sm font-bold text-[var(--space-text-primary)]">Knowledge Areas to Master for {roadmap.target_program}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">A static, program-specific study path from Domain Knowledge. Progress updates as you complete cards.</p>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {knowledgeAreas.map((area) => {
                  const Icon = KNOWLEDGE_ICONS[area.icon] || BookOpen;
                  const pct = knowledgeAreaProgress(area, domainProgress);
                  return <button key={`${area.industrySlug}-${area.subcategoryId || area.pillar || area.name}`} type="button" onClick={() => openKnowledgeArea(area)} className="group flex min-h-44 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-200)] hover:shadow-sm" data-testid={`knowledge-area-${area.subcategoryId || area.industrySlug}`}>
                    <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-card)]"><Icon className="h-5 w-5 text-[var(--space-text-brand)]" /></span><KnowledgeProgressRing value={pct} /></div>
                    <h3 className="mt-3 text-sm font-bold text-[var(--space-text-primary)]">{area.name}</h3><p className="mt-1 line-clamp-3 text-[11px] leading-4 text-[var(--space-text-muted)]">{area.why}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[10px] font-bold text-[var(--space-text-brand)]">Study this area <ChevronRight className="h-3.5 w-3.5" /></span>
                  </button>;
                })}
              </div>
            </section>

            <p className="text-[10px] leading-4 text-[var(--space-text-muted)]">
              Weekly targets are Mate’s pacing recommendation from your baseline and the program’s
              {roadmap.window_kind === 'verified' ? ' verified' : ' estimated'} application window — always confirm
              exact dates on the company’s careers page. Progress counts your completed Case Pool, Case Drill and
              Aptitude Test sessions automatically: a session counts in the week you finish it, each case, drill or
              test counts once (retakes don’t add to the total), and anything beyond a weekly goal shows as extra.
            </p>
          </>
        ) : null}

        {status === 'ready' && (
          <div className="flex justify-center pb-2 pt-3">
            <button
              type="button"
              onClick={() => {
                setRestartError(null);
                setConfirmRestart(true);
              }}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-[var(--space-text-muted)] underline decoration-[var(--space-border-strong)] underline-offset-4 hover:text-[var(--space-semantic-danger)]"
              data-testid="button-restart-progress"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Restart fit assessment
            </button>
          </div>
        )}
      </div>

      {confirmRestart && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[color-mix(in_srgb,var(--space-shell-shadow)_55%,transparent)] p-4" data-testid="restart-progress-dialog-backdrop">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="restart-progress-title"
            aria-describedby="restart-progress-description"
            className="w-full max-w-md rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-2xl sm:p-6"
            data-testid="restart-progress-dialog"
          >
            <h2 id="restart-progress-title" className="text-lg font-bold text-[var(--space-text-primary)]">
              Restart your fit assessment?
            </h2>
            <p id="restart-progress-description" className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">
              This clears your fit assessment results and questionnaire state so you can assess again. Your saved roadmap and practice progress stay available; the roadmap changes only when you explicitly regenerate it.
            </p>
            {restartError && (
              <p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)] p-3 text-xs font-semibold text-[var(--space-semantic-danger)]" role="alert">
                {restartError}
              </p>
            )}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                ref={restartCancelRef}
                type="button"
                onClick={() => {
                  setRestartError(null);
                  setConfirmRestart(false);
                }}
                disabled={restarting}
                className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-4 py-2.5 text-sm font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:opacity-60 sm:w-auto"
                data-testid="button-cancel-restart"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void restartProgress()}
                disabled={restarting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-semantic-danger)] px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60 sm:w-auto"
                data-testid="button-confirm-restart"
              >
                {restarting && <Loader2 className="h-4 w-4 animate-spin" />}
                {restarting ? 'Restarting…' : 'Yes, restart assessment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
