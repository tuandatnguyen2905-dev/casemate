// Casemate — "My Roadmap": the persistent personalized prep plan.
//
// One lean page, five sections in a fixed order (founder-approved Lean MVP):
//   1. Your Target Program — program, company, role, fit score, roadmap overview
//      and pace; Fit Assessment link and roadmap regeneration.
//   2. Study Pace (./StudyPaceSelector.tsx) — compact Take It Slow / Balanced /
//      Hardcore control. Choosing previews only; Apply saves.
//   3. Your Learning Snapshot (./LearningSnapshot.tsx) — whole-plan completion
//      beside this week's targets, plus the compact Today's Focus strip.
//      Read-only: no practice buttons.
//   4. Recommended for you (./RecommendedForTarget.tsx) — the only place with
//      learn/practice CTAs.
//   5. Preparation Timeline (./PreparationTimeline.tsx) — the saved 24-week plan
//      in four phases with This Week / Monthly / Full Plan views. Planning only.
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
  Compass,
  Gauge,
  Loader2,
  Map as MapIcon,
  RefreshCw,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import {
  generateAndSaveRoadmap,
  loadLatestRoadmap,
  restartRoadmapJourney,
  ROADMAP_UPDATED_EVENT,
  resolveRoadmapIdentity,
} from '../../lib/prepRoadmap';
import type { SavedRoadmap } from '../../lib/prepRoadmap';
import {
  bucketPracticeSessions,
  buildWeekSchedule,
  defaultWeekOneStart,
  firstVisitIso,
  fullDateLabel,
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
  writeCachedStartChoice,
} from '../../lib/roadmapProgress';
import type { PracticeSession, WeekStartBasis } from '../../lib/roadmapProgress';
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
import type { OverallProgressStatus } from './OverallProgress';
import LearningSnapshot from './LearningSnapshot';
import PreparationTimeline from './PreparationTimeline';
import type { TimelineView } from './PreparationTimeline';
import RecommendedForTarget from './RecommendedForTarget';
import { ROADMAP_CSS } from './roadmapStyles';
import { FOCUS_CSS } from './TodaysFocus';
import { useSkillFocus } from './skillFocusData';
import StudyPaceSelector from './StudyPaceSelector';
import { PACE_CSS } from './paceStyles';

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
  const currentPhase = goalWeek
    ? phases.find((phase) => phase.weeks.some((week) => week.week === goalWeek.week)) || null
    : phases[phases.length - 1] || null;
  const effectiveView: TimelineView = timelineView || (planState.kind === 'complete' ? 'full' : 'week');
  const focusWeekNumber = goalWeek?.week ?? schedule[schedule.length - 1]?.week ?? 1;
  const bounds = startDateBounds(now);
  // A new pace re-paces the current week and every later one; ended weeks keep theirs.
  const paceEffectiveWeek = planState.kind === 'active' ? planState.week : planState.kind === 'before' ? 1 : null;
  const paceLabel = STUDY_PACE_META[paceConfig?.pace || DEFAULT_STUDY_PACE].label;

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
      setPaceNotice(`${label} applied${scope}. Your weekly targets, progress and timeline are updated.`);
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

  const overview = planState.kind === 'active'
    ? `Week ${planState.week} of ${schedule.length}${currentPhase ? ` · Phase ${currentPhase.index}: ${currentPhase.name}` : ''}`
    : planState.kind === 'before'
      ? `Starts ${fullDateLabel(planState.startsOn)}`
      : `Plan ended ${fullDateLabel(planState.endedOn)}`;

  const startDateControl = (
    <div className="mr-timeline-foot" data-testid="roadmap-start-date">
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
  );

  return (
    <div className="mr-root" onPointerEnter={refreshIfStale}>
      <style>{ROADMAP_CSS + PACE_CSS + FOCUS_CSS}</style>
      <div className="mr-wrap">
        <header className="mr-page-head">
          <h1><MapIcon size={24} /> My Roadmap</h1>
          <p>Where you’re aiming, how you’re doing, and what to do next.</p>
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
                  {assessmentTarget.matchPercent != null && <span className="mr-pill mr-pill--red">{assessmentTarget.matchPercent}% fit</span>}
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
                    <span className="mr-pill mr-pill--red" data-testid="roadmap-match" title="Fit score from your Fit Assessment">
                      {roadmap.match_percent}% fit
                    </span>
                  )}
                </div>
                <ul className="mr-target-meta">
                  {roadmap.target_company && <li><Building2 /> {roadmap.target_company}</li>}
                  {roadmap.target_function && <li><Briefcase /> {roadmap.target_function}</li>}
                  <li data-testid="roadmap-overview">
                    <CalendarDays />
                    <span><b>{schedule.length}-week plan</b> · {overview}</span>
                  </li>
                  <li data-testid="roadmap-pace-meta"><Gauge /> <span><b>{paceLabel}</b> pace</span></li>
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

            {/* 2. Study Pace — preview first, saved only on Apply */}
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

            {/* 3. Your Learning Snapshot — read-only, no practice CTAs */}
            {schedule.length > 0 && (
              <LearningSnapshot
                schedule={schedule}
                progress={progress}
                status={sessionsState}
                planState={planState}
                goalWeek={goalWeek}
                focus={skillFocus}
              />
            )}

            {/* 4. Recommended for you — the only practice CTAs */}
            {recommendations}

            {/* 5. Preparation Timeline — planning only */}
            {schedule.length > 0 && (
              <PreparationTimeline
                schedule={schedule}
                phases={phases}
                status={planState}
                progress={progress}
                view={effectiveView}
                onViewChange={setTimelineView}
                focusWeek={focusWeekNumber}
                footer={startDateControl}
              />
            )}

            <p className="mr-footnote">
              Weekly targets follow your {paceLabel} study pace, paced toward the program’s
              {roadmap.window_kind === 'verified' ? ' verified' : ' estimated'} application window — always confirm exact dates on the
              company’s careers page. A completed Case Pool, Case Drill or Aptitude Test session counts once, in the week you finish it
              (retakes don’t add to the total); weekly targets cap at 100% and anything beyond shows as extra. Domain Knowledge has no
              weekly targets yet. Changing your pace re-paces this week and later weeks; weeks that have ended keep their targets.
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
