// Casemate — "My Roadmap": the persistent personalized prep plan.
//
// Home of the roadmap generated from the "Generate My Roadmap" button in the
// Your Direction "How to get there" panel (and regenerable right here). Shows
// the target program + match %, the estimated application window, and a
// week-by-week preparation plan (Case Pool / Case Drill / Aptitude Test
// targets per week) grouped into expandable monthly overview cards, with a
// live progress tracker computed from the candidate's ACTUAL completed
// sessions in the three practice apps. All the heavy lifting lives in
// lib/prepRoadmap.ts; the roadmap row persists in the prep_roadmaps table
// keyed to the account identity, so it survives refreshes and re-logins.

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
  Cpu,
  Factory,
  Globe2,
  HeartPulse,
  Hexagon,
  Landmark,
  Layers3,
  Loader2,
  Map as MapIcon,
  RefreshCw,
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
  currentWeekNumber,
  generateAndSaveRoadmap,
  groupWeeksIntoMonths,
  isRoadmapSignInRequired,
  loadLatestRoadmap,
  loadRoadmapProgress,
  restartRoadmapJourney,
  ROADMAP_UPDATED_EVENT,
  resolveRoadmapIdentity,
  shortDateLabel,
} from '../../lib/prepRoadmap';
import type { RoadmapWeek, SavedRoadmap, WeekProgress } from '../../lib/prepRoadmap';
import { READINESS_UPDATED_EVENT } from '../../lib/readinessScore';
import ReadinessApp from '../Readiness/App';
import {
  caseRecommendationsForProgram,
  openRecommendedCaseDrill,
} from '../../lib/caseTypeRecommendations';
import { applicationWindowDisplay, findProgramTimeline } from '../../lib/programTimelines';
import { deckFor } from '../IndustryKnowledge/learningDecks';
import {
  knowledgeRecommendationsForProgram,
  studyCardsForSubcategory,
} from '../IndustryKnowledge/industrySubcategories';
import type { KnowledgeRecommendation } from '../IndustryKnowledge/industrySubcategories';

interface TrackMeta {
  key: 'case_pool' | 'case_drill' | 'aptitude';
  label: string;
  icon: typeof Target;
  dockAppId: string;
  targetOf: (week: RoadmapWeek) => number;
  doneOf: (progress: WeekProgress | undefined) => number;
  unit: string;
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
  },
  {
    key: 'case_drill',
    label: 'Case Drill',
    icon: Zap,
    dockAppId: 'case-drill',
    targetOf: (week) => week.case_drill_target,
    doneOf: (progress) => progress?.case_drill_done || 0,
    unit: 'drills',
  },
  {
    key: 'aptitude',
    label: 'Aptitude Test',
    icon: Hexagon,
    dockAppId: 'aptitude-test',
    targetOf: (week) => week.aptitude_target,
    doneOf: (progress) => progress?.aptitude_done || 0,
    unit: 'tests',
  },
];

function openDockApp(appId: string) {
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
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
  const pct = target > 0 ? Math.min(100, Math.round((done / target) * 100)) : 0;
  const complete = target > 0 && done >= target;
  return (
    <div className={`h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-muted)] ${className}`}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.max(pct > 0 ? 4 : 0, pct)}%`,
          background: complete ? 'var(--space-semantic-success)' : 'var(--space-brand-primary-600)',
        }}
      />
    </div>
  );
}

const PHASE_META: Record<number, { label: string; color: string; soft: string }> = {
  1: { label: 'Profile building', color: 'var(--space-semantic-success-600)', soft: 'color-mix(in srgb, var(--space-semantic-success-500) 12%, transparent)' },
  2: { label: 'Application prep', color: 'var(--space-brand-primary-600)', soft: 'color-mix(in srgb, var(--space-brand-primary-500) 11%, transparent)' },
  3: { label: 'Interview prep', color: 'var(--space-semantic-warning-600)', soft: 'color-mix(in srgb, var(--space-semantic-warning-500) 13%, transparent)' },
  4: { label: 'Final polish', color: 'var(--space-brand-primary-900)', soft: 'color-mix(in srgb, var(--space-brand-primary-900) 10%, transparent)' },
};

function RoadmapTimeline({ roadmap, currentWeek }: { roadmap: SavedRoadmap; currentWeek: number | null }) {
  const phases = roadmap.plan_json.reduce<Array<{ phase: number; weeks: RoadmapWeek[] }>>((groups, week) => {
    const last = groups[groups.length - 1];
    if (last?.phase === week.phase) last.weeks.push(week);
    else groups.push({ phase: week.phase, weeks: [week] });
    return groups;
  }, []);
  const minWidth = Math.max(760, roadmap.plan_json.length * 104);

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]" data-testid="roadmap-horizontal-timeline">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--space-border-default)] px-4 py-3 sm:px-5 sm:py-4">
        <div>
          <p className="text-sm font-bold text-[var(--space-text-primary)]">Preparation timeline</p>
          <p className="mt-0.5 text-xs text-[var(--space-text-muted)]"><span className="sm:hidden">Your plan, week by week.</span><span className="hidden sm:inline">Scroll across weeks; the red marker shows where you are today.</span></p>
        </div>
        <div className="hidden flex-wrap gap-2 sm:flex">
          {Object.entries(PHASE_META).map(([phase, meta]) => (
            <span key={phase} className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />{meta.label}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-2 p-3 sm:hidden">
        {roadmap.plan_json.map((week) => {
          const meta = PHASE_META[week.phase] || PHASE_META[1];
          const isCurrent = week.week === currentWeek;
          return (
            <div key={week.week} className={`rounded-xl border p-3 ${isCurrent ? 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]'}`}>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold" style={{ background: meta.color, color: 'var(--space-text-on-primary)' }}>{week.week}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-xs font-bold text-[var(--space-text-primary)]">Week {week.week}</p>
                    <span className="text-[10px] text-[var(--space-text-muted)]">{shortDateLabel(week.start_date)}</span>
                    {isCurrent && <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-[9px] font-bold text-[var(--space-text-on-primary)]">Today</span>}
                  </div>
                  <p className="mt-1 text-xs font-semibold" style={{ color: meta.color }}>{week.theme}</p>
                  <p className="mt-1 text-[10px] leading-4 text-[var(--space-text-secondary)]">{week.case_pool_target} cases · {week.case_drill_target} drills · {week.aptitude_target} test</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden overflow-x-auto p-5 overscroll-x-contain sm:block">
        <div style={{ minWidth }}>
          <div className="mb-5 flex gap-1">
            {phases.map((group) => {
              const meta = PHASE_META[group.phase] || PHASE_META[1];
              return (
                <div key={group.phase} className="rounded-lg px-3 py-2 text-xs font-bold" style={{ flex: group.weeks.length, color: meta.color, background: meta.soft }}>
                  {meta.label} · W{group.weeks[0].week}–W{group.weeks[group.weeks.length - 1].week}
                </div>
              );
            })}
          </div>
          <div className="relative grid gap-2 pt-7" style={{ gridTemplateColumns: `repeat(${roadmap.plan_json.length}, minmax(96px, 1fr))` }}>
            <div className="pointer-events-none absolute left-0 right-0 top-[46px] h-0.5 bg-[var(--space-border-strong)]" />
            {roadmap.plan_json.map((week) => {
              const meta = PHASE_META[week.phase] || PHASE_META[1];
              const isCurrent = week.week === currentWeek;
              return (
                <div key={week.week} className="relative min-w-0 text-center">
                  <div className="relative h-9">
                    {isCurrent && (
                      <div className="absolute -top-6 left-1/2 z-20 -translate-x-1/2">
                        <span className="whitespace-nowrap rounded-full bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-[9px] font-bold text-[var(--space-text-on-primary)]">Today</span>
                        <span className="mx-auto block h-2.5 w-0.5 bg-[var(--space-brand-primary-600)]" />
                      </div>
                    )}
                    <span className="relative z-10 mx-auto block h-9 w-9 rounded-full border-4 border-[var(--space-surface-card)] text-xs font-extrabold leading-7" style={{ background: meta.color, color: 'var(--space-text-on-primary)' }}>{week.week}</span>
                  </div>
                  <div className="mt-3 min-h-11">
                    <p className="text-[10px] font-bold text-[var(--space-text-primary)]">W{week.week}</p>
                    <p className="text-[9px] text-[var(--space-text-muted)]">{shortDateLabel(week.start_date)}</p>
                  </div>
                  <div className="mt-2 rounded-lg p-2 text-left" style={{ background: meta.soft }}>
                    <p className="line-clamp-2 text-[10px] font-semibold leading-4" style={{ color: meta.color }}>{week.theme}</p>
                    <p className="mt-1 text-[9px] leading-4 text-[var(--space-text-secondary)]">{week.case_pool_target} cases · {week.case_drill_target} drills · {week.aptitude_target} test</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WeekRow({
  week,
  progress,
  isCurrent,
}: {
  week: RoadmapWeek;
  progress: WeekProgress | undefined;
  isCurrent: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-2.5 ${
        isCurrent
          ? 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)]'
          : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]'
      }`}
      data-testid={`roadmap-week-${week.week}`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-xs font-bold text-[var(--space-text-primary)]">Week {week.week}</span>
        <span className="text-[10px] text-[var(--space-text-muted)]">
          {shortDateLabel(week.start_date)} – {shortDateLabel(week.end_date)}
        </span>
        <span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">
          {week.theme}
        </span>
        {isCurrent && (
          <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-on-primary)]">
            This week
          </span>
        )}
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {TRACKS.map((track) => {
          const target = track.targetOf(week);
          const done = track.doneOf(progress);
          const complete = target > 0 && done >= target;
          const Icon = track.icon;
          return (
            <div key={track.key}>
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
                <span className="text-[11px] font-semibold text-[var(--space-text-primary)]">{track.label}</span>
                <span
                  className={`ml-auto text-[11px] font-bold tabular-nums ${
                    complete ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-text-secondary)]'
                  }`}
                >
                  {Math.min(done, 99)}/{target}
                </span>
                {complete && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--space-semantic-success)]" />}
              </div>
              <ProgressBar done={done} target={target} className="mt-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MyRoadmapApp() {
  const { sessionId, spaceId } = useSpaceRuntime();
  const userId = useMemo(() => resolveRoadmapIdentity(sessionId).userKey, [sessionId]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [roadmap, setRoadmap] = useState<SavedRoadmap | null>(null);
  const [progress, setProgress] = useState<Record<number, WeekProgress>>({});
  const [assessmentTarget, setAssessmentTarget] = useState<AssessmentTarget | null>(null);
  const [hasPendingSelection, setHasPendingSelection] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [confirmRegenerate, setConfirmRegenerate] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [restartError, setRestartError] = useState<string | null>(null);
  const restartCancelRef = useRef<HTMLButtonElement>(null);
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>({});
  const [domainProgress, setDomainProgress] = useState<DomainProgressMap>(() => readDomainProgress(userId));

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

  const load = useCallback(async () => {
    try {
      const selectedTarget = readSelectedRoadmapTarget(sessionId);
      const saved = await loadLatestRoadmap(sessionId);
      setRoadmap(saved);
      if (saved) {
        const byWeek = await loadRoadmapProgress(saved, sessionId).catch(() => ({}));
        setProgress(byWeek);
        if (selectedTarget && selectedTarget.program !== saved.target_program) {
          setAssessmentTarget(selectedTarget);
          setHasPendingSelection(true);
        }
      } else if (selectedTarget) {
        setAssessmentTarget(selectedTarget);
        setHasPendingSelection(true);
      } else {
        // No roadmap yet — is there a saved direction to generate from?
        try {
          const db = (window as any).__workspaceDb;
          const response = await db.from('assessment_results').orderBy('id', 'desc').limit(5).get();
          const rows = Array.isArray(response) ? response : response?.data || response?.rows || [];
          let target: AssessmentTarget | null = null;
          for (const row of rows) {
            target = pickTargetProgram(row?.result_json);
            if (target && target.program) break;
          }
          setAssessmentTarget(target && target.program ? target : null);
        } catch (e) {
          setAssessmentTarget(null);
        }
      }
      setStatus('ready');
    } catch (e) {
      setStatus((previous) => (previous === 'ready' ? 'ready' : 'error'));
    }
  }, [sessionId]);

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

  const generate = useCallback(
    async (target: AssessmentTarget) => {
      setGenerating(true);
      setGenerateError(null);
      setNeedsSignIn(false);
      try {
        const saved = await generateAndSaveRoadmap({
          targetProgram: target.program,
          targetCompany: target.company,
          matchPercent: target.matchPercent,
          sessionId,
        });
        setRoadmap(saved);
        setConfirmRegenerate(false);
        setExpandedMonths({});
        const byWeek = await loadRoadmapProgress(saved, sessionId).catch(() => ({}));
        setProgress(byWeek);
      } catch (e) {
        if (isRoadmapSignInRequired(e)) {
          setNeedsSignIn(true);
          setGenerateError('Your session needs to be refreshed. Please sign in again to generate your roadmap.');
        } else {
          setGenerateError('Roadmap generation didn\u2019t go through — please try again in a moment.');
        }
      } finally {
        setGenerating(false);
      }
    },
    [sessionId],
  );

  const signInAgain = useCallback(async () => {
    const sharedSpacePath = `/space/${encodeURIComponent(spaceId)}`;
    const logoutUrl = window.location.pathname === sharedSpacePath
      || window.location.pathname.startsWith(`${sharedSpacePath}/`)
      ? `${sharedSpacePath}/logout`
      : `/api/space/${encodeURIComponent(spaceId)}/logout`;
    try {
      await fetch(logoutUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      // Local cleanup below still returns the visitor to the sign-in gate.
    }
    try {
      localStorage.removeItem(`space_session_${spaceId}`);
      sessionStorage.removeItem('space_session_id');
    } catch {
      // Reload still lets the platform restore or request a valid session.
    }
    window.location.reload();
  }, [spaceId]);

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
      await restartRoadmapJourney(sessionId);
      setConfirmRestart(false);
      setRoadmap(null);
      setProgress({});
      setAssessmentTarget(null);
      setHasPendingSelection(false);
      openDockApp('fit-assessment');
    } catch (e) {
      setRestartError('We couldn’t finish restarting your progress. Please try again.');
    } finally {
      setRestarting(false);
    }
  }, [restarting, sessionId]);

  const months = useMemo(() => (roadmap ? groupWeeksIntoMonths(roadmap.plan_json) : []), [roadmap]);
  const currentWeek = useMemo(() => (roadmap ? currentWeekNumber(roadmap) : null), [roadmap]);
  const recommendedCaseTypes = useMemo(() => roadmap ? caseRecommendationsForProgram({
    company: roadmap.target_company,
    program: roadmap.target_program,
  }) : [], [roadmap]);
  const liveWindow = useMemo(() => {
    if (!roadmap) return null;
    return applicationWindowDisplay(findProgramTimeline(
      roadmap.target_company || roadmap.target_program,
      roadmap.target_program,
    ));
  }, [roadmap]);
  const knowledgeAreas = useMemo(() => roadmap
    ? knowledgeRecommendationsForProgram(roadmap.target_program, roadmap.target_company).slice(0, 4)
    : [], [roadmap]);

  // Default-expand the month containing the current week (or the first month).
  useEffect(() => {
    if (!roadmap || months.length === 0) return;
    setExpandedMonths((previous) => {
      if (Object.keys(previous).length > 0) return previous;
      const target = currentWeek
        ? months.find((month) => month.weeks.some((week) => week.week === currentWeek))
        : months[0];
      return target ? { [target.month]: true } : { [months[0].month]: true };
    });
  }, [roadmap, months, currentWeek]);

  const overallTotals = useMemo(() => {
    if (!roadmap) return null;
    let done = 0;
    let target = 0;
    roadmap.plan_json.forEach((week) => {
      const weekProgress = progress[week.week];
      TRACKS.forEach((track) => {
        target += track.targetOf(week);
        done += Math.min(track.doneOf(weekProgress), track.targetOf(week));
      });
    });
    return { done, target, pct: target > 0 ? Math.round((done / target) * 100) : 0 };
  }, [roadmap, progress]);

  const regenerateTarget: AssessmentTarget | null = roadmap
    ? {
        program: roadmap.target_program,
        company: roadmap.target_company,
        matchPercent: roadmap.match_percent,
      }
    : assessmentTarget;

  return (
    <div className="flex min-h-full w-full flex-col bg-[var(--space-surface-page)] [&_button]:min-h-11 [&_button]:min-w-11">
      <div className="mx-auto w-full max-w-7xl space-y-4 p-3 sm:space-y-5 sm:p-6 lg:p-7">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-bold text-[var(--space-text-primary)]">
            <MapIcon className="h-5 w-5 text-[var(--space-text-brand)]" />
            My Roadmap
          </h1>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">
            Your personalized preparation plan and readiness benchmark in one place.
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
          /* No roadmap AND no saved direction — the assessment comes first. */
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="roadmap-needs-assessment">
            <p className="text-sm font-semibold text-[var(--space-text-primary)]">
              Complete your fit assessment first to generate your roadmap
            </p>
            <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              Your roadmap is built from your Fit Assessment result — your matched programs and their
              application timelines. Add your CV in the structured four-step flow, confirm the profile,
              complete the fit questions, and your direction unlocks in minutes. It’s completely free.
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
        ) : !roadmap && assessmentTarget ? (
          /* Direction exists but no roadmap yet — generate right here. */
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="roadmap-generate-cta">
            <p className="text-sm font-semibold text-[var(--space-text-primary)]">No roadmap yet — let’s build yours</p>
            <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              Based on your direction, your target is{' '}
              <span className="font-semibold text-[var(--space-text-primary)]">{assessmentTarget.program}</span>
              {assessmentTarget.matchPercent != null ? ` (${assessmentTarget.matchPercent}% match)` : ''}. Mate will
              pace a week-by-week plan toward its application window, scaled to your practice so far.
            </p>
            {generateError && (
              <p className="mt-2 text-xs font-semibold text-[var(--space-semantic-danger)]" role="alert">{generateError}</p>
            )}
            {needsSignIn && (
              <button
                type="button"
                onClick={() => void signInAgain()}
                className="mt-2 inline-flex items-center justify-center rounded-lg border border-[var(--space-semantic-danger)] px-3 py-1.5 text-xs font-bold text-[var(--space-semantic-danger)] hover:bg-[var(--space-surface-muted)]"
                data-testid="button-roadmap-sign-in-again"
              >
                Sign in again
              </button>
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
              <div className="mt-2 space-y-1">
                <p className="flex items-start gap-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
                  <span>
                    <span className="font-semibold text-[var(--space-text-primary)]">Application window:</span>{' '}
                    {liveWindow?.openLabel || "Check the company's careers page for the latest application window"}
                    {liveWindow?.closeLabel ? ` · ${liveWindow.closeLabel}` : ''}
                  </span>
                </p>
                <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="font-semibold text-[var(--space-text-primary)]">{roadmap.total_weeks}-week plan</span>
                  {' · '}started {shortDateLabel(roadmap.start_date)}
                  {roadmap.baseline_json ? ` · paced from your ${roadmap.baseline_json.level} baseline (${roadmap.baseline_json.total_sessions} completed session${roadmap.baseline_json.total_sessions === 1 ? '' : 's'})` : ''}
                </p>
              </div>
              {overallTotals && (
                <div className="mt-3" data-testid="roadmap-overall-progress">
                  <div className="flex flex-col gap-0.5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold text-[var(--space-text-primary)]">Overall plan progress</span>
                    <span className="font-bold tabular-nums text-[var(--space-text-secondary)]">
                      {overallTotals.done}/{overallTotals.target} targets · {overallTotals.pct}%
                    </span>
                  </div>
                  <ProgressBar done={overallTotals.done} target={overallTotals.target} className="mt-1.5 h-2" />
                </div>
              )}
              <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={backToDirection}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-semibold sm:w-auto sm:py-1.5 text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
                  data-testid="button-back-to-direction"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to My Direction
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
                <p className="mt-2 text-xs font-semibold text-[var(--space-semantic-danger)]" role="alert">{generateError}</p>
              )}
              {needsSignIn && (
                <button
                  type="button"
                  onClick={() => void signInAgain()}
                  className="mt-2 inline-flex items-center justify-center rounded-lg border border-[var(--space-semantic-danger)] px-3 py-1.5 text-xs font-bold text-[var(--space-semantic-danger)] hover:bg-[var(--space-surface-muted)]"
                  data-testid="button-roadmap-sign-in-again"
                >
                  Sign in again
                </button>
              )}
            </div>

            <ReadinessApp embedded />

            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-case-priorities">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[var(--space-text-primary)]">Case Types to Practice</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">The top 3 case types for your target program’s industry. Choose one to open the right Case Drill filter.</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {recommendedCaseTypes.map((caseType, index) => (
                  <button key={caseType.label} type="button" onClick={() => openRecommendedCaseDrill(caseType.drillSkillId, sessionId)} className="flex items-center gap-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 text-left hover:border-[var(--space-brand-primary-200)]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--space-brand-primary-600)] text-xs font-bold text-[var(--space-text-on-primary)]">{index + 1}</span>
                    <span className="text-xs font-semibold text-[var(--space-text-primary)]">{caseType.label}</span>
                    <Zap className="ml-auto h-3.5 w-3.5 text-[var(--space-text-brand)]" />
                  </button>
                ))}
              </div>
            </section>

            <RoadmapTimeline roadmap={roadmap} currentWeek={currentWeek} />

            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5" data-testid="roadmap-knowledge-areas">
              <div>
                <p className="text-sm font-bold text-[var(--space-text-primary)]">Knowledge Areas to Master for {roadmap.target_program}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">A static, program-specific study path from Domain Knowledge. Progress updates as you complete cards.</p>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

            {/* This week focus */}
            {currentWeek != null && (
              <div data-testid="roadmap-this-week">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
                  This week’s targets
                </p>
                {roadmap.plan_json
                  .filter((week) => week.week === currentWeek)
                  .map((week) => (
                    <WeekRow key={week.week} week={week} progress={progress[week.week]} isCurrent />
                  ))}
                <div className="mt-2 grid gap-2 sm:flex sm:flex-wrap">
                  {TRACKS.map((track) => {
                    const Icon = track.icon;
                    return (
                      <button
                        key={track.key}
                        type="button"
                        onClick={() => openDockApp(track.dockAppId)}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-2 text-[11px] font-semibold sm:w-auto sm:py-1.5 text-[var(--space-text-brand)] hover:opacity-90"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        Practice in {track.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Monthly overview → expandable weekly detail */}
            <div className="space-y-3" data-testid="roadmap-months">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
                Monthly overview — tap a month for its weekly detail
              </p>
              {months.map((month) => {
                const expanded = !!expandedMonths[month.month];
                const firstWeek = month.weeks[0];
                const lastWeek = month.weeks[month.weeks.length - 1];
                const totals = TRACKS.map((track) => {
                  let target = 0;
                  let done = 0;
                  month.weeks.forEach((week) => {
                    target += track.targetOf(week);
                    done += Math.min(track.doneOf(progress[week.week]), track.targetOf(week));
                  });
                  return { track, target, done };
                });
                const themes = Array.from(new Set(month.weeks.map((week) => week.theme)));
                const containsCurrent = currentWeek != null && month.weeks.some((week) => week.week === currentWeek);
                return (
                  <div
                    key={month.month}
                    className={`overflow-hidden rounded-2xl border ${
                      containsCurrent ? 'border-[var(--space-brand-primary-200)]' : 'border-[var(--space-border-default)]'
                    } bg-[var(--space-surface-card)]`}
                    data-testid={`roadmap-month-${month.month}`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedMonths((prev) => ({ ...prev, [month.month]: !expanded }))}
                      className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-[var(--space-surface-muted)]"
                    >
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--space-text-primary)]">
                          {month.label}
                          <span className="text-[10px] font-semibold text-[var(--space-text-muted)]">
                            Weeks {firstWeek.week}–{lastWeek.week} · {shortDateLabel(firstWeek.start_date)} – {shortDateLabel(lastWeek.end_date)}
                          </span>
                          {containsCurrent && (
                            <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-on-primary)]">
                              Now
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[var(--space-text-secondary)]">{themes.join(' → ')}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
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
                      <div className="space-y-2 border-t border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
                        {month.weeks.map((week) => (
                          <WeekRow
                            key={week.week}
                            week={week}
                            progress={progress[week.week]}
                            isCurrent={currentWeek === week.week}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] leading-4 text-[var(--space-text-muted)]">
              Weekly targets are Mate’s pacing recommendation from your baseline and the program’s
              {roadmap.window_kind === 'verified' ? ' verified' : ' estimated'} application window — always confirm
              exact dates on the company’s careers page. Progress counts your completed sessions in Case Pool, Case
              Drill, and Aptitude Test automatically.
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
              Restart my progress
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
              Restart your progress?
            </h2>
            <p id="restart-progress-description" className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">
              This will reset your fit assessment results and roadmap. You'll need to go through the assessment again. Your aptitude test, case drill, and domain knowledge progress will not be affected.
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
                {restarting ? 'Restarting…' : 'Yes, restart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
