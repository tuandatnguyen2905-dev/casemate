import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock3,
  Download,
  Gavel,
  Loader2,
  Play,
  RefreshCw,
  Save,
  Send,
  Settings2,
  ShieldCheck,
  Trophy,
  UserCheck,
  Users,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { CASE_MASTERY_STAGES } from '../../data/pawviaCase';
import { isFounderEmailSession } from '../../lib/founderAccess';

const WORKSPACE_ID = 'workspace-539150';
const ARENA_TOKEN_TRACE = true; // TRACE
const ARENA_TRACE_SOURCE = 'apps/CaseMastery/App.tsx'; // TRACE
const FUNCTIONS = ['Strategy', 'Marketing', 'Finance', 'Sales/Commercial', 'Supply Chain'];
const FUNCTION_DESCRIPTIONS: Record<string, string> = {
  Strategy: 'Frame the core problem, choices, risks, and overall recommendation.',
  Marketing: 'Define the target buyer, proposition, concept evidence, and demand plan.',
  Finance: 'Test launch economics, break-even assumptions, and profit protection.',
  'Sales/Commercial': 'Shape channels, pack-price architecture, pilots, and sell-through.',
  'Supply Chain': 'Assess sourcing, capacity, quality, and launch-readiness constraints.',
};
const DRAFT_SECTIONS = [
  ['problem_issue_tree', 'Problem / Issue Tree'],
  ['market_buyer_diagnosis', 'Market & Buyer Diagnosis'],
  ['concept_choice', 'Concept Choice'],
  ['commercial_financial_reasoning', 'Commercial & Financial Reasoning'],
  ['go_to_market_plan', 'Go-to-Market Plan'],
  ['assumptions_validation_tests', 'Assumptions & Validation Tests'],
  ['final_recommendation', 'Final Recommendation'],
] as const;
const RUBRIC = [
  ['structure', 'Problem structuring and issue tree quality', 20],
  ['evidence', 'Correct use of exhibits and calculations', 20],
  ['choice', 'Target segment and concept choice with evidence', 20],
  ['commercial', 'Commercial and financial logic', 20],
  ['execution', 'Execution plan and go-to-market', 10],
  ['assumptions', 'Explicit treatment of assumptions', 10],
] as const;

type Json = Record<string, any>;
type Tab = 'overview' | 'live' | 'results' | 'admin';

function storedAccount(spaceId: string) {
  try {
    return JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
  } catch {
    return {};
  }
}

const ARENA_SEAT_KEY = 'casemate-arena-seat';

function storedSeat(spaceId: string) {
  try {
    return JSON.parse(localStorage.getItem(`${ARENA_SEAT_KEY}:${spaceId}`) || '{}');
  } catch {
    return {};
  }
}

function rememberSeat(spaceId: string, seat: Record<string, any>) {
  try {
    localStorage.setItem(`${ARENA_SEAT_KEY}:${spaceId}`, JSON.stringify(seat));
  } catch {
    // Privacy-restricted browsers block storage. The server registration still
    // recognises the member on their next bootstrap.
  }
}

function forgetSeat(spaceId: string) {
  try {
    localStorage.removeItem(`${ARENA_SEAT_KEY}:${spaceId}`);
  } catch {
    // Ignored for the same reason as rememberSeat.
  }
}

const ARENA_LOBBY_POLL_MS = 18_000;
const ARENA_LIVE_POLL_MS = 15_000;
const ARENA_CASE_CACHE_PREFIX = 'casemate-arena-case';

function stageNeedsCase(stage: unknown) {
  return ['solve', 'rebuttal', 'peer_review', 'feedback'].includes(normalizeStage(stage));
}

function caseCacheKey(sessionRowId: string, version: unknown) {
  return `${ARENA_CASE_CACHE_PREFIX}:${sessionRowId}:${String(version || 'unversioned')}`;
}

function readCachedCase(sessionRowId: string, version: unknown) {
  if (!sessionRowId || !version) return null;
  try {
    const parsed = JSON.parse(sessionStorage.getItem(caseCacheKey(sessionRowId, version)) || 'null');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function writeCachedCase(sessionRowId: string, version: unknown, candidateCase: any) {
  if (!sessionRowId || !version || !candidateCase) return;
  try {
    sessionStorage.setItem(caseCacheKey(sessionRowId, version), JSON.stringify(candidateCase));
  } catch {
    // A memory-only copy remains in React state when sessionStorage is blocked.
  }
}

function compactPollMembers(state: any) {
  return (Array.isArray(state?.members) ? state.members : []).map((row: any) => ({
    userId: String(Array.isArray(row) ? row[0] : row?.userId || ''),
    function: String(Array.isArray(row) ? row[1] : row?.function || ''),
    isLeader: Boolean(Array.isArray(row) ? row[2] : row?.isLeader),
    ready: Boolean(Array.isArray(row) ? row[3] : row?.ready),
    name: String(Array.isArray(row) ? row[4] || '' : row?.name || ''),
  })).filter((member: any) => member.userId);
}

function mergeArenaActive(current: any, incoming: any) {
  if (!incoming) return current;
  if (!incoming.state) {
    return {
      ...(current || {}),
      ...incoming,
      session: { ...(current?.session || {}), ...(incoming?.session || {}) },
      case: incoming.case || current?.case || null,
      caseLoadedVersion: incoming.case ? incoming.caseSnapshotVersion : current?.caseLoadedVersion,
    };
  }
  if (!current) return current;
  const state = incoming.state;
  const pollMembers = compactPollMembers(state);
  const previousMembers = Array.isArray(current?.team?.members) ? current.team.members : [];
  const pollStage = normalizeStage(state.stage);
  const members = pollMembers.map((member: any) => {
    const previous = previousMembers.find((item: any) => arenaUserId(item) === member.userId) || {};
    const presence = pollStage === 'registration' ? member.ready : Boolean(previous.isPresent ?? previous.is_present ?? member.ready);
    return { ...previous, ...member, ready: presence, role: member.isLeader ? 'leader' : 'member', isPresent: presence, is_present: presence };
  });
  const currentMemberId = arenaUserId(current?.member);
  const viewerState = members.find((member: any) => member.userId === currentMemberId);
  return {
    ...current,
    session: { ...(current.session || {}), stage: state.stage || current?.session?.stage },
    remainingSeconds: toNumber(state.remaining, current?.remainingSeconds || 0),
    team: current.team ? { ...current.team, members } : current.team,
    member: current.member && viewerState ? { ...current.member, is_present: viewerState.ready, isPresent: viewerState.ready } : current.member,
    registration: current.registration && viewerState ? { ...current.registration, attendance_status: viewerState.ready ? 'present' : current.registration.attendance_status } : current.registration,
    lobby: { ...(current.lobby || {}), memberCount: toNumber(state.count, members.length), teamSize: toNumber(state.size, current?.lobby?.teamSize), full: toNumber(state.count, members.length) >= toNumber(state.size, 1) },
    isLeader: current.isLeader === true || viewerState?.isLeader === true,
    pollVersion: state.version,
    submissionStatus: { submitted: state.submitted === true },
  };
}

function mergeLobbyPoll(session: any, state: any) {
  if (!session || !state) return session;
  const members = compactPollMembers(state);
  const previousSlots = Array.isArray(session?.lobby?.slots) ? session.lobby.slots : [];
  const slots = FUNCTIONS.map((fn) => {
    const next = members.find((member: any) => member.function === fn);
    const previous = previousSlots.find((slot: any) => slot?.function === fn)?.member;
    if (!next) return { function: fn, member: null };
    return { function: fn, member: { ...(arenaUserId(previous) === next.userId ? previous : {}), ...next, linkedin: arenaUserId(previous) === next.userId ? previous?.linkedin : undefined } };
  });
  return {
    ...session,
    stage: state.stage || session.stage,
    lobby: { ...(session.lobby || {}), slots, memberCount: toNumber(state.count, members.length), requiredMemberCount: toNumber(state.size, session?.teamSize), full: toNumber(state.count, members.length) >= toNumber(state.size, 1) },
  };
}

const LEGACY_CASE_MASTERY_ID_KEYS = [
  'casemate-case-mastery-session-id',
  'casemate-case-mastery-registration-id',
  'casemate-case-mastery-team-id',
];

function clearLegacyCaseMasteryIds(spaceId: string) {
  try {
    for (const key of LEGACY_CASE_MASTERY_ID_KEYS) {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}:${spaceId}`);
    }
  } catch {
    // Storage can be unavailable in privacy-restricted browsers. The server
    // remains the source of truth, so entry still works without this cleanup.
  }
}

function formatDate(value?: string | null) {
  if (!value) return 'To be announced';
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(date) + ' · Vietnam time';
}

function formatCountdown(seconds: number) {
  const safe = Math.max(0, Math.round(seconds || 0));
  const hours = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${hours ? `${hours}:` : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function useSmoothCountdown(remainingSeconds: unknown, timerKey: string) {
  const serverRemaining = Math.max(0, Math.round(Number(remainingSeconds) || 0));
  const [secondsLeft, setSecondsLeft] = useState(serverRemaining);
  const deadlineRef = useRef(Date.now() + serverRemaining * 1000);
  const timerKeyRef = useRef(timerKey);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const localRemaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
    if (timerKeyRef.current !== timerKey || Math.abs(localRemaining - serverRemaining) > 1) {
      timerKeyRef.current = timerKey;
      deadlineRef.current = Date.now() + serverRemaining * 1000;
      setSecondsLeft(serverRemaining);
    }
  }, [serverRemaining, timerKey]);

  useEffect(() => {
    const tick = () => {
      const next = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setSecondsLeft((current) => current === next ? current : next);
    };
    tick();
    intervalRef.current = window.setInterval(tick, 250);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [timerKey]);

  return secondsLeft;
}

function emptyDraft() {
  return Object.fromEntries(DRAFT_SECTIONS.map(([key]) => [key, ''])) as Record<string, string>;
}

function toNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function ordinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  return `${value}${value % 10 === 1 ? 'st' : value % 10 === 2 ? 'nd' : value % 10 === 3 ? 'rd' : 'th'}`;
}

function normalizeStage(value: unknown) {
  const stage = String(value || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (stage === 'check_in' || stage === 'warm_up' || stage === 'warmup') return 'checkin';
  return stage;
}

function displayArenaName(value: unknown) {
  const legacyName = ['Case', 'Mastery'].join(' ');
  return String(value || '').split(legacyName).join('Case Arena');
}

// Only a registration-stage session is a startable lobby. A finished or
// already-running round must never render the team-slot lobby, because there is
// no Start action left for it.
function sessionPhase(session: any): 'lobby' | 'running' | 'finished' {
  const stage = normalizeStage(session?.stage);
  const status = String(session?.status || '').trim().toLowerCase();
  if (stage === 'registration') return 'lobby';
  if (stage === 'complete' || status === 'completed' || status === 'complete' || status === 'archived') return 'finished';
  return 'running';
}

function arenaUserId(value: any) {
  return String(value?.userId || value?.user_id || '').trim();
}

function isArenaLeader(team: any, member: any, registration?: any) {
  const memberId = arenaUserId(member);
  const leaderId = String(team?.leaderUserId || team?.leader_user_id || '').trim();
  return Boolean(
    member?.isLeader === true ||
    member?.is_leader === true ||
    member?.role === 'leader' ||
    registration?.is_team_leader === true ||
    (memberId && leaderId && memberId === leaderId),
  );
}

function viewerIsTeamLeader(active: any) {
  return active?.isLeader === true || isArenaLeader(active?.team, active?.member, active?.registration);
}

function MiniChart({ exhibit }: { exhibit: any }) {
  const chart = exhibit.chart;
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const element = hostRef.current;
    if (!element) return;
    const measure = () => setWidth(Math.round(element.getBoundingClientRect().width));
    measure();
    const Observer = (window as any).ResizeObserver;
    if (!Observer) {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new Observer(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  if (!chart?.series?.length) return null;
  const values = chart.series.flatMap((series: any) => series.values).map(Number);
  const min = Math.min(0, ...values);
  const max = Math.max(1, ...values);
  const span = max - min || 1;
  const colors = ['var(--space-brand-primary-600)', 'var(--space-brand-highlight-600)', 'var(--space-neutral-500)', 'var(--space-semantic-warning)', 'var(--space-semantic-success)'];
  if (chart.type === 'line') {
    const height = 360;
    const left = 28;
    const right = 18;
    const top = 34;
    const bottom = 64;
    const x = (index: number) => left + (index / Math.max(1, chart.categories.length - 1)) * (width - left - right);
    const y = (value: number) => top + ((max - value) / span) * (height - top - bottom);
    return (
      <div ref={hostRef} className="w-full min-w-0" role="img" aria-label={`${exhibit.title} chart`}>
        {width >= 240 ? (
          <>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block" aria-hidden="true">
              <line x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} stroke="var(--space-border-strong)" />
              {chart.series.map((series: any, seriesIndex: number) => {
                const points = series.values.map((value: number, index: number) => `${x(index)},${y(value)}`).join(' ');
                return <g key={series.name}><polyline points={points} fill="none" stroke={colors[seriesIndex % colors.length]} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />{series.values.map((value: number, index: number) => <g key={index}><circle cx={x(index)} cy={y(value)} r="5" fill={colors[seriesIndex % colors.length]} stroke="var(--space-surface-card)" strokeWidth="1.5" /><text x={x(index)} y={Math.max(18, y(value) - 11)} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--space-text-primary)" stroke="var(--space-surface-card)" strokeWidth="4" paintOrder="stroke">{value.toLocaleString()}</text></g>)}</g>;
              })}
              {chart.categories.map((label: string, index: number) => <text key={label} x={x(index)} y={height - 24} textAnchor="middle" fontSize="14" fill="var(--space-text-muted)">{label}</text>)}
            </svg>
            <div className="mt-2 flex flex-wrap justify-center gap-4">{chart.series.map((series: any, index: number) => <span key={series.name} className="flex items-center gap-1.5 text-[14px] text-[var(--space-text-secondary)]"><span className="h-3 w-3 rounded-sm" style={{ background: colors[index % colors.length] }} />{series.name}</span>)}</div>
          </>
        ) : <div className="h-[360px]" />}
      </div>
    );
  }
  const groups = chart.categories.length;
  return (
    <div ref={hostRef} className="w-full min-w-0 px-2 pt-3" role="img" aria-label={`${exhibit.title} chart`}>
      <div className="flex h-[320px] items-end gap-3 border-b border-[var(--space-border-strong)]">
        {chart.categories.map((category: string, categoryIndex: number) => (
          <div key={category} className="flex min-w-0 flex-1 items-end justify-center gap-1.5">
            {chart.series.map((series: any, seriesIndex: number) => {
              const value = Number(series.values[categoryIndex]);
              const barHeight = Math.max(3, ((value - min) / span) * 260);
              return <div key={series.name} className="flex min-w-0 flex-1 flex-col items-center justify-end" title={`${series.name} · ${category}: ${value} ${chart.unit}`}><span className="mb-1 text-[13px] font-bold tabular-nums text-[var(--space-text-secondary)]">{value.toLocaleString()}</span><div className="w-full max-w-14 rounded-t" style={{ height: barHeight, background: colors[seriesIndex % colors.length] }} /></div>;
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 grid" style={{ gridTemplateColumns: `repeat(${groups}, minmax(0, 1fr))` }}>{chart.categories.map((label: string) => <span key={label} className="break-words px-1 text-center text-[13px] leading-4 text-[var(--space-text-muted)]">{label}</span>)}</div>
      <div className="mt-3 flex flex-wrap justify-center gap-4">{chart.series.map((series: any, index: number) => <span key={series.name} className="flex items-center gap-1.5 text-[13px] text-[var(--space-text-secondary)]"><span className="h-3 w-3 rounded-sm" style={{ background: colors[index % colors.length] }} />{series.name}</span>)}</div>
    </div>
  );
}

function ExhibitCard({ exhibit }: { exhibit: any }) {
  const [open, setOpen] = useState(true);
  return (
    <article className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-sm">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-start justify-between gap-3 p-4 text-left">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Exhibit {exhibit.id}</p><h3 className="mt-1 font-extrabold text-[var(--space-text-primary)]">{exhibit.title}</h3>{exhibit.description && <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{exhibit.description}</p>}<p className="mt-1 text-[10px] text-[var(--space-text-muted)]">{exhibit.unit}</p></div>
        {open ? <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)]" /> : <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />}
      </button>
      {open && <div className="space-y-4 border-t border-[var(--space-border-default)] p-4">
        <div className="overflow-x-auto rounded-xl bg-[var(--space-surface-muted)] p-3"><MiniChart exhibit={exhibit} /></div>
        <DataTable columns={exhibit.table?.columns || exhibit.columns} rows={exhibit.table?.rows || exhibit.rows} />
        {(exhibit.secondaryTable || exhibit.secondary) && <DataTable columns={(exhibit.secondaryTable || exhibit.secondary).columns} rows={(exhibit.secondaryTable || exhibit.secondary).rows} />}
        {exhibit.profiles?.length > 0 && <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Segment profiles · What matters most</p><div className="mt-2 grid gap-2 sm:grid-cols-2">{exhibit.profiles.map((profile: any) => { const segment = profile.segment || profile[0]; const description = profile.description || profile[1]; return <div key={segment} className="rounded-xl border border-[var(--space-border-default)] p-3"><p className="text-xs font-bold text-[var(--space-text-primary)]">{segment}</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{description}</p></div>; })}</div></div>}
        <div className="rounded-xl border border-[var(--space-border-default)] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Source caveats</p><ul className="mt-2 space-y-1.5">{exhibit.caveats.map((note: string) => <li key={note} className="flex gap-2 text-xs leading-5 text-[var(--space-text-secondary)]"><span>•</span><span>{note}</span></li>)}</ul></div>
      </div>}
    </article>
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: any[][] }) {
  return <div className="overflow-x-auto rounded-xl border border-[var(--space-border-default)]"><table className="min-w-full border-collapse text-[11px]"><thead><tr className="bg-[var(--space-surface-muted)]">{columns.map((column, index) => <th key={`${column}-${index}`} className={`whitespace-nowrap border-b border-[var(--space-border-strong)] px-1.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)] ${index ? 'text-right' : 'text-left'}`}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{columns.map((_, index) => <td key={index} className={`border-b border-[var(--space-border-default)] px-1.5 py-1 leading-4 ${index ? 'text-right tabular-nums text-[var(--space-text-secondary)]' : 'font-medium text-[var(--space-text-primary)]'}`}>{row[index] ?? ''}</td>)}</tr>)}</tbody></table></div>;
}

function StageStrip({ current, hideCheckin = false }: { current?: string; hideCheckin?: boolean }) {
  const currentStage = normalizeStage(current);
  const stages = hideCheckin ? CASE_MASTERY_STAGES.filter((stage) => normalizeStage(stage.id) !== 'checkin') : CASE_MASTERY_STAGES;
  return <div className={`grid gap-2 ${hideCheckin ? 'sm:grid-cols-4' : 'sm:grid-cols-5'}`}>{stages.map((stage, index) => { const active = currentStage === normalizeStage(stage.id); return <div key={stage.id} className={`rounded-xl border p-3 ${active ? 'border-[var(--space-brand-primary-500)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]'}`}><p className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-muted)]'}`}>{index + 1} · {stage.minutes} min</p><p className="mt-1 text-xs font-bold text-[var(--space-text-primary)]">{stage.label}</p></div>; })}</div>;
}

export default function CaseMasteryApp() {
  const { sessionId, spaceId, userRole } = useSpaceRuntime();
  const account = useMemo(() => storedAccount(spaceId), [spaceId]);
  const [tab, setTab] = useState<Tab>('overview');
  const [data, setData] = useState<Json | null>(null);
  const [adminData, setAdminData] = useState<Json | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  // Keep the database row ID across lobby/live view changes. Bootstrap is a
  // broad discovery query; live hydration must use this exact ID instead of
  // depending on status/stage filters during the Start transition.
  const activeSessionIdRef = useRef('');
  const refreshSequenceRef = useRef(0);
  const activePollSequenceRef = useRef(0);
  const lastPollAtRef = useRef(0);
  const arenaTraceWindowOpenRef = useRef(false); // TRACE
  const arenaTraceWindowSessionRef = useRef(''); // TRACE
  const arenaTraceClosedSessionRef = useRef(''); // TRACE
  const arenaTraceRequestCountsRef = useRef<Record<string, number>>({}); // TRACE
  const arenaTracePollCountRef = useRef(0); // TRACE
  const arenaTraceEffectRunsRef = useRef<Record<string, number>>({}); // TRACE
  const arenaTraceStageRef = useRef('unknown'); // TRACE
  const arenaTraceMemberFunctionRef = useRef('unknown'); // TRACE

  const persistArenaTrace = useCallback(async (event: { action: string; kind: 'ai' | 'agent' | 'tool' | 'http'; chars: number; note: string; sessionRowId?: string }) => { // TRACE
    if (!ARENA_TOKEN_TRACE || !sessionId) return; // TRACE
    const sessionRowId = String(event.sessionRowId || arenaTraceWindowSessionRef.current || activeSessionIdRef.current || ''); // TRACE
    const tracePayload = { action: event.action, kind: event.kind, chars: Math.max(0, Math.round(event.chars || 0)), note: event.note }; // TRACE
    console.info('[ARENA_TOKEN_TRACE]', { source: ARENA_TRACE_SOURCE, sessionRowId, ...tracePayload }); // TRACE
    try { // TRACE
      await fetch(`/api/hooks/execute/${(window as any).__WORKSPACE_ID__ || WORKSPACE_ID}/casemate-case-mastery-v4`, { // TRACE
        method: 'POST', // TRACE
        headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId }, // TRACE
        body: JSON.stringify({ action: 'trace_client', session_id: sessionRowId || undefined, trace: tracePayload }), // TRACE
      }); // TRACE
    } catch (traceError) { // TRACE
      console.warn('[ARENA_TOKEN_TRACE] client persistence failed', traceError instanceof Error ? traceError.message : 'unknown'); // TRACE
    } // TRACE
  }, [sessionId]); // TRACE

  const traceEffectRun = useCallback((effectName: string) => { // TRACE
    if (!ARENA_TOKEN_TRACE) return; // TRACE
    const key = `${arenaTraceWindowSessionRef.current || 'unresolved'}:${arenaTraceStageRef.current}:${effectName}`; // TRACE
    const runCount = (arenaTraceEffectRunsRef.current[key] || 0) + 1; // TRACE
    arenaTraceEffectRunsRef.current[key] = runCount; // TRACE
    if (!arenaTraceWindowOpenRef.current || runCount < 2) return; // TRACE
    void persistArenaTrace({ action: 'effect_rerun', kind: 'http', chars: 0, note: `effect=${effectName}; stage=${arenaTraceStageRef.current}; runCount=${runCount}; triggeredFetch=true` }); // TRACE
  }, [persistArenaTrace]); // TRACE

  const call = useCallback(async (payload: Json) => {
    if (!sessionId) throw new Error('Sign in to use Case Arena.');
    const endpoint = `/api/hooks/execute/${(window as any).__WORKSPACE_ID__ || WORKSPACE_ID}/casemate-case-mastery-v4`; // TRACE
    const requestBody = JSON.stringify(payload); // TRACE
    const actionName = String(payload?.action || 'unknown'); // TRACE
    const response = await fetch(endpoint, { // TRACE
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
      body: requestBody, // TRACE
    });
    const responseText = await response.text(); // TRACE
    let result: Json = {}; // TRACE
    try { result = responseText ? JSON.parse(responseText) : {}; } catch { result = {}; } // TRACE
    const fullRegisteredLobby = Array.isArray(result?.sessions) ? result.sessions.find((item: any) => normalizeStage(item?.stage) === 'registration' && item?.lobby?.viewerIsMember === true && toNumber(item?.lobby?.memberCount, 0) >= Math.max(1, toNumber(item?.teamSize || item?.team_size, FUNCTIONS.length))) : null; // TRACE
    const observed = fullRegisteredLobby ? { session: fullRegisteredLobby, lobby: fullRegisteredLobby.lobby } : result?.active?.session ? result.active : result?.session ? result : null; // TRACE
    const observedSessionId = String(observed?.session?.id || payload?.session_id || payload?.sessionId || ''); // TRACE
    const observedStage = normalizeStage(observed?.session?.stage || arenaTraceStageRef.current); // TRACE
    const requiredMembers = Math.max(1, toNumber(observed?.session?.teamSize || observed?.session?.team_size || observed?.lobby?.teamSize, FUNCTIONS.length)); // TRACE
    const observedMembers = Math.max(0, toNumber(observed?.lobby?.memberCount, 0)); // TRACE
    const lobbyFull = observed?.lobby?.full === true || observedMembers >= requiredMembers; // TRACE
    if (observedSessionId && observedStage) arenaTraceStageRef.current = observedStage; // TRACE
    if (observed?.member?.function) arenaTraceMemberFunctionRef.current = String(observed.member.function); // TRACE
    if (ARENA_TOKEN_TRACE && !arenaTraceWindowOpenRef.current && observedSessionId && observedStage === 'registration' && lobbyFull && arenaTraceClosedSessionRef.current !== observedSessionId) { // TRACE
      arenaTraceWindowOpenRef.current = true; // TRACE
      arenaTraceWindowSessionRef.current = observedSessionId; // TRACE
      arenaTraceRequestCountsRef.current = {}; // TRACE
      arenaTracePollCountRef.current = 0; // TRACE
      void persistArenaTrace({ action: 'trace_window_open', kind: 'http', chars: responseText.length, sessionRowId: observedSessionId, note: `trigger=${actionName}; memberCount=${observedMembers}; requiredMembers=${requiredMembers}; stage=registration` }); // TRACE
    } // TRACE
    if (ARENA_TOKEN_TRACE && arenaTraceWindowOpenRef.current && (!arenaTraceWindowSessionRef.current || !observedSessionId || arenaTraceWindowSessionRef.current === observedSessionId)) { // TRACE
      const requestCount = (arenaTraceRequestCountsRef.current[actionName] || 0) + 1; // TRACE
      arenaTraceRequestCountsRef.current[actionName] = requestCount; // TRACE
      if (actionName === 'poll') arenaTracePollCountRef.current += 1; // TRACE
      void persistArenaTrace({ action: actionName, kind: 'http', chars: responseText.length, sessionRowId: observedSessionId, note: `endpoint=casemate-case-mastery-v4; requestCount=${requestCount}; requestChars=${requestBody.length}; responseChars=${responseText.length}; status=${response.status}; stage=${observedStage || arenaTraceStageRef.current}; pollingFiresForMember=${arenaTracePollCountRef.current}; memberFunction=${arenaTraceMemberFunctionRef.current}` }); // TRACE
    } // TRACE
    if (!response.ok || result.success === false) {
      const problem: any = new Error(result.error || 'Case Arena is temporarily unavailable.');
      problem.code = result.code;
      throw problem;
    }
    return result;
  }, [persistArenaTrace, sessionId]); // TRACE

  const ensureArenaCase = useCallback(async (active: any) => {
    const sessionRowId = String(active?.session?.id || '');
    const version = active?.caseSnapshotVersion;
    if (!sessionRowId || !stageNeedsCase(active?.session?.stage)) return active;
    if (active?.case && (!version || active?.caseLoadedVersion === version)) return active;
    const cached = readCachedCase(sessionRowId, version);
    if (cached) {
      void persistArenaTrace({ action: 'case_cache', kind: 'http', chars: JSON.stringify(cached).length, sessionRowId, note: `cache=hit; version=${String(version)}; stage=${normalizeStage(active?.session?.stage)}` });
      return { ...active, case: cached, caseLoadedVersion: version };
    }
    void persistArenaTrace({ action: 'case_cache', kind: 'http', chars: 0, sessionRowId, note: `cache=miss; version=${String(version || 'unknown')}; stage=${normalizeStage(active?.session?.stage)}` });
    const result = await call({ action: 'get_case', session_id: sessionRowId });
    const fetchedVersion = result?.caseSnapshotVersion || version;
    writeCachedCase(sessionRowId, fetchedVersion, result?.case);
    return { ...active, case: result?.case || null, caseSnapshotVersion: fetchedVersion, caseLoadedVersion: fetchedVersion };
  }, [call, persistArenaTrace]);

  const loadStageData = useCallback(async (sessionRowId: string, current?: any) => {
    const result = await call({ action: 'stage_data', session_id: sessionRowId });
    return ensureArenaCase(mergeArenaActive(current, result));
  }, [call, ensureArenaCase]);

  const refresh = useCallback(async (quiet = false) => {
    if (!sessionId) { setLoading(false); return; }
    const refreshSequence = ++refreshSequenceRef.current;
    if (!quiet) setLoading(true);
    try {
      // Bootstrap is discovery-only and never carries the frozen case payload.
      const result = await call({ action: 'bootstrap' });
      let validActive = result?.active?.session && result?.active?.registration ? result.active : null;
      const rememberedSessionId = activeSessionIdRef.current;
      if (rememberedSessionId && validActive?.session?.id !== rememberedSessionId) {
        try { validActive = await loadStageData(rememberedSessionId, validActive); } catch {}
      }
      if (!validActive) {
        const myRound = (result?.sessions || []).find((item: any) => item?.hasConfirmedRegistration === true && sessionPhase(item) !== 'finished');
        if (myRound?.id) {
          try { validActive = await loadStageData(myRound.id); } catch {}
        }
      }
      if (validActive) validActive = await ensureArenaCase(validActive);
      if (refreshSequence !== refreshSequenceRef.current) return;
      setData((current: any) => {
        const previousActive = current?.active?.session?.id === rememberedSessionId ? current.active : null;
        const nextActive = mergeArenaActive(previousActive, validActive) || previousActive;
        if (nextActive?.session?.id) activeSessionIdRef.current = nextActive.session.id;
        return { ...(current || {}), ...result, active: nextActive };
      });
      setError('');
      if (validActive || activeSessionIdRef.current) setTab((current) => current === 'overview' ? 'live' : current);
    }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not load Case Arena.'); }
    finally { if (!quiet) setLoading(false); }
  }, [call, ensureArenaCase, loadStageData, sessionId]);

  useEffect(() => { clearLegacyCaseMasteryIds(spaceId); }, [spaceId]);
  useEffect(() => { traceEffectRun('bootstrap-refresh-effect'); void refresh(); }, [refresh, traceEffectRun]); // TRACE
  useEffect(() => { // TRACE
    const active = data?.active; // TRACE
    const sessionRowId = String(active?.session?.id || ''); // TRACE
    if (active?.session?.stage) arenaTraceStageRef.current = normalizeStage(active.session.stage); // TRACE
    if (active?.member?.function) arenaTraceMemberFunctionRef.current = String(active.member.function); // TRACE
    if (!ARENA_TOKEN_TRACE || !sessionRowId || !active?.case || !arenaTraceWindowOpenRef.current || arenaTraceWindowSessionRef.current !== sessionRowId) return; // TRACE
    const caseChars = JSON.stringify(active.case).length; // TRACE
    void persistArenaTrace({ action: 'case_rendered', kind: 'http', chars: caseChars, sessionRowId, note: `stage=${arenaTraceStageRef.current}; pollingFiresForMember=${arenaTracePollCountRef.current}; memberFunction=${arenaTraceMemberFunctionRef.current}` }); // TRACE
    void persistArenaTrace({ action: 'case_open_agent_context', kind: 'agent', chars: 0, sessionRowId, note: 'attached=false; explicitContextChars=0; CaseMastery receives no AgentChat or app-state context bridge' }); // TRACE
    arenaTraceWindowOpenRef.current = false; // TRACE
    arenaTraceClosedSessionRef.current = sessionRowId; // TRACE
  }, [data?.active?.case, data?.active?.member?.function, data?.active?.session?.id, data?.active?.session?.stage, persistArenaTrace]); // TRACE
  const activePollSessionId = String(data?.active?.session?.id || '');
  const activePollStage = normalizeStage(data?.active?.session?.stage);
  const lobbyPollSessionId = String((data?.sessions || []).find((session: any) => normalizeStage(session?.stage) === 'registration')?.id || '');
  useEffect(() => {
    const sessionRowId = activePollSessionId || lobbyPollSessionId;
    const stage = activePollSessionId ? activePollStage : 'registration';
    if (!sessionId || !sessionRowId || stage === 'complete') return;
    traceEffectRun(activePollSessionId ? 'active-poll-effect' : 'lobby-poll-effect'); // TRACE
    if (activePollSessionId) activeSessionIdRef.current = activePollSessionId;
    let disposed = false;
    const pollOnce = async () => {
      if (disposed || document.visibilityState === 'hidden' || Date.now() - lastPollAtRef.current < 1_000) return;
      lastPollAtRef.current = Date.now();
      const pollSequence = ++activePollSequenceRef.current;
      try {
        const result = await call({ action: 'poll', session_id: sessionRowId });
        if (disposed || pollSequence !== activePollSequenceRef.current || !result?.state) return;
        if (!activePollSessionId) {
          setData((current: any) => current ? { ...current, sessions: (current.sessions || []).map((session: any) => session.id === sessionRowId ? mergeLobbyPoll(session, result.state) : session) } : current);
          return;
        }
        const nextStage = normalizeStage(result.state.stage);
        if (nextStage && nextStage !== stage) {
          const hydrated = await loadStageData(sessionRowId);
          if (disposed || pollSequence !== activePollSequenceRef.current) return;
          setData((current: any) => current ? { ...current, active: mergeArenaActive(current.active, hydrated) } : current);
          if (nextStage !== 'registration') setTab((current) => current === 'overview' ? 'live' : current);
          return;
        }
        setData((current: any) => current ? { ...current, active: mergeArenaActive(current.active, result) } : current);
      } catch {}
    };
    const intervalMs = stage === 'registration' ? ARENA_LOBBY_POLL_MS : ARENA_LIVE_POLL_MS;
    let timer = window.setInterval(() => { void pollOnce(); }, intervalMs);
    const resume = () => {
      if (document.visibilityState === 'hidden') { window.clearInterval(timer); return; }
      window.clearInterval(timer);
      void pollOnce();
      timer = window.setInterval(() => { void pollOnce(); }, intervalMs);
    };
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('focus', resume);
    return () => {
      disposed = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('focus', resume);
    };
  }, [activePollSessionId, activePollStage, call, lobbyPollSessionId, loadStageData, sessionId, traceEffectRun]); // TRACE

  const run = async (label: string, payload: Json, after?: (result: Json) => void, onError?: (reason: any) => boolean | void) => {
    const targetSessionId = String(payload.session_id || payload.sessionId || activeSessionIdRef.current || '');
    if (targetSessionId) {
      activeSessionIdRef.current = targetSessionId;
      refreshSequenceRef.current += 1;
      activePollSequenceRef.current += 1;
    }
    setBusy(label); setError(''); setNotice('');
    try {
      const result = await call(payload);
      let hydrated = false;
      if (payload.action === 'save_draft') {
        setData((current: any) => current ? { ...current, active: { ...current.active, submission: { ...(current.active?.submission || {}), draft: payload.draft } } } : current);
        hydrated = true;
      } else if (targetSessionId && !String(payload.action || '').startsWith('admin_')) {
        try {
          const active = await loadStageData(targetSessionId, data?.active);
          setData((current: any) => current ? { ...current, active: mergeArenaActive(current.active, active) } : { active });
          hydrated = true;
        } catch {}
      }
      after?.(result);
      setNotice(result.message || 'Saved.');
      if (!hydrated) await refresh(true);
      return result;
    }
    catch (reason: any) { if (onError?.(reason) !== true) setError(reason?.message || 'Action failed.'); return null; }
    finally { setBusy(''); }
  };

  const loadAdmin = async (sessionIdOverride?: string) => {
    setBusy('admin-load'); setError('');
    try { const result = await call({ action: 'admin_load', session_id: sessionIdOverride || data?.active?.session?.id || adminData?.selectedSessionId }); setAdminData({ ...result, selectedSessionId: sessionIdOverride || data?.active?.session?.id || adminData?.selectedSessionId }); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not load admin controls.'); }
    finally { setBusy(''); }
  };

  useEffect(() => { if (tab === 'admin' && data?.isAdmin && !adminData) void loadAdmin(); }, [tab, data?.isAdmin]);

  if (loading) return <div className="flex h-full items-center justify-center gap-2 bg-[var(--space-surface-page)] text-sm text-[var(--space-text-secondary)]"><Loader2 className="h-5 w-5 animate-spin text-[var(--space-text-brand)]" />Opening Case Arena…</div>;

  const runtimeRole = String(userRole || '').trim().toLowerCase();
  const hasAdminAccess = Boolean(
    data?.isAdmin ||
    runtimeRole === 'admin' ||
    runtimeRole === 'founder' ||
    runtimeRole === 'owner' ||
    isFounderEmailSession(spaceId),
  );
  const active = data?.active;
  const nav: Array<{ id: Tab; label: string; icon: any }> = [
    { id: 'overview', label: 'Sessions', icon: CalendarDays },
    { id: 'live', label: 'Live workspace', icon: Play },
    { id: 'results', label: 'Results', icon: Trophy },
    ...(hasAdminAccess ? [{ id: 'admin' as Tab, label: 'Admin', icon: Settings2 }] : []),
  ];

  return <div className="flex h-full min-h-0 flex-col bg-[var(--space-surface-page)]">
    <header className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-4 sm:px-6">
      <div className="flex w-full flex-wrap items-start justify-between gap-4">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--space-text-brand)]">Casemate · Live competition</p><h1 className="mt-1 text-2xl font-black text-[var(--space-text-primary)]">Case Arena</h1><p className="mt-1 max-w-2xl text-sm text-[var(--space-text-secondary)]">Claim an open function, join your team, and begin together when the Team Leader starts the round.</p></div>
        <button type="button" onClick={() => void refresh()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--space-border-default)]" aria-label="Refresh"><RefreshCw className="h-4 w-4" /></button>
      </div>
      <nav className="mt-4 flex w-full gap-2 overflow-x-auto">{nav.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setTab(id)} className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-bold ${tab === id ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)]'}`}><Icon className="h-4 w-4" />{label}</button>)}</nav>
    </header>

    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="w-full space-y-5 p-4 sm:p-6">
        {error && <div role="alert" className="flex items-start gap-2 rounded-2xl border border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_8%,transparent)] p-4 text-sm text-[var(--space-text-primary)]"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" />{error}</div>}
        {notice && <div className="flex items-start gap-2 rounded-2xl border border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_8%,transparent)] p-4 text-sm text-[var(--space-text-primary)]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" />{notice}</div>}

        {tab === 'overview' ? <Overview sessions={data?.sessions || []} active={active} account={account} busy={busy} run={run} spaceId={spaceId} onEnterLive={() => setTab('live')} onRefresh={() => refresh(true)} /> : tab === 'live' ? <LiveWorkspace active={active} busy={busy} run={run} call={call} onEnterLive={() => setTab('live')} onRefresh={() => refresh(true)} onDone={() => { setData((current) => current ? { ...current, active: null } : current); setTab('overview'); }} /> : tab === 'results' ? <Results active={active} sessions={data?.sessions || []} onRefresh={() => refresh(true)} onDone={() => { setData((current) => current ? { ...current, active: null } : current); setTab('overview'); }} /> : <AdminPanel data={adminData} busy={busy} run={run} loadAdmin={loadAdmin} />}
      </div>
    </main>
  </div>;
}

function Overview({ sessions, active, account, busy, run, spaceId, onEnterLive, onRefresh }: any) {
  const isActiveLobby = (session: any) => Boolean(active?.registration?.session_id === session.id && active?.team && normalizeStage(active?.session?.stage) === 'registration');
  const lobbySession = sessions.find(isActiveLobby) || null;
  const otherSessions = sessions.filter((session: any) => !isActiveLobby(session));
  const openSessions = otherSessions.filter((session: any) => sessionPhase(session) === 'lobby');
  const closedSessions = otherSessions.filter((session: any) => sessionPhase(session) !== 'lobby');
  const featuredTeamSize = Math.max(1, toNumber(lobbySession?.teamSize || openSessions[0]?.teamSize, FUNCTIONS.length));
  const reconnectingSession = !active ? sessions.find((session: any) => session?.hasConfirmedRegistration === true && sessionPhase(session) === 'running') : null;
  return <>
    {reconnectingSession && <WaitingCard title="Reconnecting to your team's round" body="You are registered for a round that is already running. Your team's workspace is loading — refresh if it does not appear in a few seconds." onRefresh={onRefresh} />}
    {lobbySession && <TeamLobby active={active} busy={busy} run={run} onEnterLive={onEnterLive} />}
    <section className="rounded-3xl bg-[var(--space-neutral-950)] p-6 text-white shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Readiness-based competition</p><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-black">{featuredTeamSize} seats. One team.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">Choose an open function in your team's lobby. Once all {featuredTeamSize} members are ready, the Team Leader starts the timed Pawvia solve, followed by rebuttal, peer review, and feedback.</p></div><Trophy className="h-14 w-14 text-[var(--space-brand-primary-200)]" /></div></section>
    <section><div className="mb-3"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Open lobby</p><h2 className="mt-1 text-xl font-black text-[var(--space-text-primary)]">Join Pawvia Round 1</h2></div><div className="space-y-4">{openSessions.length ? openSessions.map((session: any) => <SessionCard key={session.id} session={session} account={account} spaceId={spaceId} registered={Boolean(session.hasConfirmedRegistration || active?.registration?.session_id === session.id)} busy={busy} run={run} onRefresh={onRefresh} onEnterLive={onEnterLive} />) : lobbySession ? <div className="rounded-2xl border border-dashed border-[var(--space-border-strong)] p-6 text-center text-sm text-[var(--space-text-muted)]">Your Team Pawvia lobby is shown above.</div> : <div className="rounded-2xl border border-dashed border-[var(--space-border-strong)] p-8 text-center text-sm text-[var(--space-text-muted)]">No Case Arena lobby is open yet.</div>}</div></section>
    {closedSessions.length > 0 && <section><div className="mb-3"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-muted)]">Closed rounds</p><h2 className="mt-1 text-xl font-black text-[var(--space-text-primary)]">Earlier sessions</h2></div><div className="space-y-4">{closedSessions.map((session: any) => <ClosedSessionCard key={session.id} session={session} />)}</div></section>}
  </>;
}

function SessionCard({ session, account, registered, busy, run, spaceId, onRefresh, onEnterLive }: any) {
  const seat = useMemo(() => storedSeat(String(spaceId || '')), [spaceId]);
  const claimedSeat = seat && seat.sessionId === session.id && FUNCTIONS.includes(String(seat.function || '')) ? seat : null;
  const [savedSeat, setSavedSeat] = useState<any>(claimedSeat);
  const [profile, setProfile] = useState({ name: claimedSeat?.name || account.name || account.fullName || '', linkedin_url: claimedSeat?.linkedin_url || '', team_code: claimedSeat?.team_code || '' });
  const [teamCodeError, setTeamCodeError] = useState('');
  const slots = Array.isArray(session.lobby?.slots) ? session.lobby.slots : FUNCTIONS.map((fn) => ({ function: fn, member: null }));
  const requiredMemberCount = Math.max(1, toNumber(session.teamSize || session.team_size || session.lobby?.requiredMemberCount, FUNCTIONS.length));
  const memberCount = Math.max(0, toNumber(session.lobby?.memberCount, slots.filter((slot: any) => slot.member).length));
  const inLobby = normalizeStage(session.stage) === 'registration';
  const lobbyIsFull = memberCount >= requiredMemberCount;
  const closed = !inLobby || (!session.readinessBased && session.registrationOpen === false) || lobbyIsFull;
  // memberCount is server-derived from live cm_team_members rows with members_json
  // as a fallback, so Start does not depend on a partially populated local bundle.
  const seatedOnServer = session.lobby?.viewerIsMember === true;
  const seated = Boolean(registered || seatedOnServer || savedSeat);
  const viewerIsLeader = session.lobby?.viewerIsLeader === true;
  // Start always renders in a lobby. Fill level and leadership decide only
  // whether it is clickable, never whether it exists.
  const lobbyCanStart = lobbyIsFull && viewerIsLeader && inLobby;
  const startLabel = !lobbyIsFull
    ? `Start Round · ${memberCount}/${requiredMemberCount} joined`
    : viewerIsLeader ? 'Start Round' : 'Start Round · Leader only';
  return <article className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Pawvia · Team lobby</span><span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-semantic-success)]">{memberCount} / {requiredMemberCount} members joined</span><span className="rounded-full bg-[var(--space-surface-muted)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-primary)]">{closed ? 'Closed' : 'Open'}</span></div><h3 className="mt-3 text-xl font-black text-[var(--space-text-primary)]">{displayArenaName(session.name)}</h3></div><Users className="h-6 w-6 text-[var(--space-text-brand)]" /></div>
    <div className={`mt-4 rounded-2xl border-2 p-4 ${lobbyCanStart ? 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)]'}`}><p className="text-sm font-black text-[var(--space-text-primary)]">{lobbyIsFull ? `All ${requiredMemberCount} function slots are filled — Team Pawvia is ready.` : `Waiting for all members — ${memberCount}/${requiredMemberCount} joined.`}</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{!seated ? 'Claim an open function below to join this lobby — only the Team Leader can start the round.' : viewerIsLeader ? 'The button unlocks as soon as every required slot is filled.' : 'Only the Team Leader can start the round.'}</p><button type="button" disabled={!lobbyCanStart || busy === 'start'} onClick={() => { if (!lobbyCanStart) return; void run('start', { action: 'start_competition', session_id: session.id }, () => onEnterLive?.()); }} className={`mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl px-4 text-base font-black disabled:cursor-not-allowed ${lobbyCanStart ? 'bg-[var(--space-semantic-success)] text-white shadow-lg' : 'bg-[var(--space-neutral-300)] text-[var(--space-neutral-600)]'}`}>{busy === 'start' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}{startLabel}</button></div>
    {!seated && !closed && <div className="mt-5 grid gap-3 sm:grid-cols-3"><Input label="Full name" value={profile.name} onChange={(value: string) => setProfile({ ...profile, name: value })} /><Input label="LinkedIn URL" value={profile.linkedin_url} onChange={(value: string) => setProfile({ ...profile, linkedin_url: value })} placeholder="https://linkedin.com/in/…" /><Input label="Team Code" value={profile.team_code} onChange={(value: string) => { setProfile({ ...profile, team_code: value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) }); setTeamCodeError(''); }} placeholder="Enter team code" maxLength={8} pattern="[A-Za-z0-9]{6,8}" autoCapitalize="characters" autoComplete="off" spellCheck={false} error={teamCodeError} /></div>}
    <div className="mt-5 grid gap-3 lg:grid-cols-5">{slots.map((slot: any) => { const fn = slot.function; const member = slot.member; return <div key={fn} className={`flex min-h-56 flex-col rounded-2xl border p-4 ${member ? 'border-[var(--space-border-strong)] bg-[var(--space-surface-muted)]' : 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)]'}`}><div className="flex items-start justify-between gap-2"><h4 className="font-black text-[var(--space-text-primary)]">{fn}</h4>{member?.isLeader && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_14%,transparent)] px-2 py-1 text-[9px] font-black uppercase text-[var(--space-semantic-success)]">Leader</span>}</div><p className="mt-2 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">{FUNCTION_DESCRIPTIONS[fn]}</p>{member ? <div className="mt-4 rounded-xl bg-[var(--space-surface-card)] p-3"><p className="text-sm font-bold text-[var(--space-text-primary)]">{member.name}</p>{member.linkedin ? <a href={member.linkedin} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs font-semibold text-[var(--space-text-brand)] underline">LinkedIn profile</a> : <p className="mt-1 text-xs text-[var(--space-text-muted)]">LinkedIn unavailable</p>}</div> : <button type="button" disabled={closed || seated || !profile.name.trim() || !/^https?:\/\//i.test(profile.linkedin_url) || !/^[A-Z0-9]{6,8}$/.test(profile.team_code) || busy.startsWith('join-')} onClick={() => { setTeamCodeError(''); const seatMemo = { sessionId: session.id, function: fn, name: profile.name, linkedin_url: profile.linkedin_url, team_code: profile.team_code }; void run(`join-${fn}`, { action: 'register', session_id: session.id, function: fn, name: profile.name, linkedin_url: profile.linkedin_url, team_code: profile.team_code }, () => { rememberSeat(String(spaceId || ''), seatMemo); setSavedSeat(seatMemo); }, (reason: any) => { if (reason?.code === 'INVALID_TEAM_CODE') { setTeamCodeError('Invalid team code — check with your team leader'); return true; } return false; }); }} className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-3 text-xs font-black text-[var(--space-text-on-primary)] disabled:cursor-not-allowed disabled:opacity-45">{busy === `join-${fn}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserCheck className="h-4 w-4" />}{lobbyIsFull ? 'Team full' : `Join as ${fn}`}</button>}</div>; })}</div>
    {(registered || seatedOnServer) && <div className="mt-4 flex items-center gap-2 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] p-3 text-sm font-semibold text-[var(--space-text-primary)]"><CheckCircle2 className="h-4 w-4 text-[var(--space-semantic-success)]" />You are in the {session.lobby?.teamName || 'Team Pawvia'} lobby.</div>}
    {!registered && !seatedOnServer && savedSeat && <div className="mt-4 rounded-xl bg-[var(--space-surface-muted)] p-4 text-sm text-[var(--space-text-primary)]"><p className="font-bold">You already claimed {savedSeat.function} in this lobby — you do not need to enter your details again.</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Waiting for the server to confirm your seat. This lobby re-checks itself every few seconds.</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => onRefresh?.()} className="flex min-h-10 items-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] px-3 text-xs font-bold text-[var(--space-text-brand)]"><RefreshCw className="h-4 w-4" />Check my seat</button><button type="button" onClick={() => { forgetSeat(String(spaceId || '')); setSavedSeat(null); }} className="min-h-10 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-bold text-[var(--space-text-secondary)]">Enter details again</button></div></div>}
  </article>;
}

function ClosedSessionCard({ session }: any) {
  const finished = sessionPhase(session) === 'finished';
  const requiredMemberCount = Math.max(1, toNumber(session?.teamSize || session?.team_size || session?.lobby?.requiredMemberCount, FUNCTIONS.length));
  const memberCount = Math.max(0, toNumber(session?.lobby?.memberCount, 0));
  return <article className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex flex-wrap gap-2"><span className="rounded-full bg-[var(--space-surface-muted)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-secondary)]">{finished ? 'Round ended' : 'Round in progress'}</span><span className="rounded-full bg-[var(--space-surface-muted)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-secondary)]">{memberCount} / {requiredMemberCount} members</span></div>
        <h3 className="mt-3 text-xl font-black text-[var(--space-text-primary)]">{displayArenaName(session?.name)}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">{finished ? 'This session has ended — there is nothing left to start. Team rankings and your private breakdown appear under Results once the organizer publishes them.' : 'This round has already started, so its lobby is closed. Registered members continue in the live workspace.'}</p>
      </div>
      {finished ? <Trophy className="h-6 w-6 shrink-0 text-[var(--space-text-muted)]" /> : <Clock3 className="h-6 w-6 shrink-0 text-[var(--space-text-muted)]" />}
    </div>
  </article>;
}

function Input({ label, value, onChange, placeholder, disabled, type = 'text', error, ...inputProps }: any) {
  return <label className="block"><span className="text-xs font-bold text-[var(--space-text-secondary)]">{label}</span><input type={type} value={value} disabled={disabled} placeholder={placeholder} onChange={(event) => onChange?.(event.target.value)} {...inputProps} aria-invalid={error ? true : undefined} className={`mt-1.5 min-h-11 w-full rounded-xl border bg-[var(--space-surface-card)] px-3 text-sm text-[var(--space-text-primary)] disabled:bg-[var(--space-surface-muted)] ${error ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]'}`} />{error && <span role="alert" className="mt-1.5 block text-xs font-semibold text-[var(--space-semantic-danger)]">{error}</span>}</label>;
}

function EntryStateError({ title, body }: { title: string; body: string }) {
  return <section role="alert" className="rounded-3xl border border-dashed border-[var(--space-border-strong)] p-10 text-center"><AlertTriangle className="mx-auto h-8 w-8 text-[var(--space-semantic-warning)]" /><h2 className="mt-3 text-lg font-black text-[var(--space-text-primary)]">{title}</h2><p className="mx-auto mt-1 max-w-lg text-sm text-[var(--space-text-secondary)]">{body}</p></section>;
}

function LiveWorkspace({ active, busy, run, call, onRefresh, onEnterLive, onDone }: any) {
  const timerKey = `${active?.session?.id || 'none'}:${normalizeStage(active?.session?.stage) || 'none'}`;
  const smoothRemainingSeconds = useSmoothCountdown(active?.remainingSeconds, timerKey);
  if (!active?.session) return <EntryStateError title="Session not found" body="This session may have been reset or removed. Return to Sessions and refresh to load the current Case Arena session." />;
  if (!active.registration) return <EntryStateError title="You are not registered for this session" body="Return to Sessions and register before entering the live workspace." />;
  if (active.registration.team_id && !active.team) return <EntryStateError title="Team not found" body="Your saved team belongs to an older or removed session. Return to Sessions and refresh to load your current assignment." />;
  if (active.team && !active.member) return <EntryStateError title="Registration is not linked to this team" body="Refresh the session. If the message remains, ask the organizer to repair your team assignment." />;
  const session = active.session;
  // The session stage is authoritative. A participant's stage_progress can lag
  // behind it, but must never send them back to the lobby after the round starts.
  const stage = normalizeStage(session.stage);
  if (stage === 'registration') return <TeamLobby active={active} busy={busy} run={run} onEnterLive={onEnterLive} />;
  const checkedIn = active.member?.is_present === true || active.member?.checkin_status === 'checked_in' || active.registration?.attendance_status === 'present';
  const smoothActive = { ...active, remainingSeconds: smoothRemainingSeconds };
  return <>
    <section className="sticky top-0 z-20 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-md"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Live stage</p><h2 className="mt-1 text-lg font-black text-[var(--space-text-primary)]">{CASE_MASTERY_STAGES.find((item) => normalizeStage(item.id) === stage)?.label || session.stage}</h2></div><div className="rounded-xl bg-[var(--space-neutral-950)] px-4 py-2 font-mono text-xl font-black text-white">{formatCountdown(smoothRemainingSeconds)}</div></div></section>
    <StageStrip current={stage} hideCheckin={session.readinessBased} />
    {active.team && stage === 'solve' && !viewerIsTeamLeader(active) && <TeammateBanner />}
    {!active.team ? <WaitingCard title="Team assignment pending" body="Your Team Pawvia assignment is still loading." onRefresh={onRefresh} /> : stage === 'checkin' ? checkedIn ? <WarmUp active={smoothActive} busy={busy} run={run} onRefresh={onRefresh} /> : <Checkin active={smoothActive} busy={busy} run={run} /> : stage === 'solve' ? <Solve active={smoothActive} busy={busy} run={run} onRefresh={onRefresh} /> : stage === 'rebuttal' ? <Rebuttal active={smoothActive} call={call} onRefresh={onRefresh} /> : stage === 'peer_review' ? <PeerReview active={smoothActive} busy={busy} run={run} /> : stage === 'feedback' ? <Feedback active={smoothActive} busy={busy} run={run} /> : stage === 'complete' ? <Results active={smoothActive} sessions={[session]} onRefresh={onRefresh} onDone={onDone} /> : <WaitingCard title="Session stage is updating" body="Case Arena is refreshing the current session state." onRefresh={onRefresh} />}
  </>;
}

function TeamLobby({ active, busy, run, onEnterLive }: any) {
  const team = active.team;
  const currentMember = active.member;
  const members = Array.isArray(team?.members) ? team.members : [];
  const slots = FUNCTIONS.map((fn) => ({ function: fn, member: members.find((item: any) => item?.function === fn) }));
  const filledFunctions = new Set(members.map((item: any) => item?.function).filter((fn: string) => FUNCTIONS.includes(fn)));
  // The server counts cm_team_members and names the leader; the local tallies
  // are only a fallback for a payload that predates those fields.
  const requiredMemberCount = Math.max(1, toNumber(active?.session?.teamSize || active?.session?.team_size || active?.lobby?.requiredMemberCount, FUNCTIONS.length));
  const memberCount = Math.max(Number(active?.lobby?.memberCount || 0), members.length, filledFunctions.size);
  const remaining = Math.max(0, requiredMemberCount - memberCount);
  const full = memberCount >= requiredMemberCount;
  const leader = active?.isLeader === true || isArenaLeader(team, currentMember, active?.registration);
  const lobbyOpenForStart = normalizeStage(active?.session?.stage) === 'registration';
  const canStart = full && leader && lobbyOpenForStart;
  const startLabel = !full ? `Start Round · ${memberCount}/${requiredMemberCount} joined` : leader ? 'Start Round' : 'Start Round · Leader only';
  const startRound = () => {
    if (!canStart) return;
    void run('start', { action: 'start_competition', session_id: active.session.id }, () => onEnterLive?.());
  };
  const startBar = <div className={`mt-5 rounded-2xl border-2 p-4 ${canStart ? 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)]'}`}>
    <p className="text-sm font-black text-[var(--space-text-primary)]">{full ? `All ${requiredMemberCount} function slots are filled — Team Pawvia is ready.` : `Waiting for all members — ${memberCount}/${requiredMemberCount} joined.`}</p>
    <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{leader ? 'The button unlocks as soon as every required slot is filled.' : 'Only the Team Leader can start the round.'}</p>
    <button type="button" disabled={!canStart || busy === 'start'} onClick={startRound} className={`mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl px-4 text-base font-black disabled:cursor-not-allowed ${canStart ? 'bg-[var(--space-semantic-success)] text-white shadow-lg' : 'bg-[var(--space-neutral-300)] text-[var(--space-neutral-600)]'}`}>{busy === 'start' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}{startLabel}</button>
  </div>;
  return <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--space-text-brand)]">Team lobby</p><h2 className="mt-1 text-2xl font-black text-[var(--space-text-primary)]">{team?.name || 'Team Pawvia'}</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">{memberCount} / {requiredMemberCount} function slots filled · live, no refresh needed</p></div><div className={`rounded-2xl px-4 py-3 text-sm font-black ${full ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]'}`}>{full ? 'Team ready' : `${remaining} slot${remaining === 1 ? '' : 's'} open`}</div></div>
    {startBar}
    <div className="mt-6 grid gap-3 lg:grid-cols-5">{slots.map(({ function: fn, member }) => { const own = arenaUserId(member) === arenaUserId(currentMember); return <article key={fn} className={`flex min-h-56 flex-col rounded-2xl border p-4 ${own ? 'border-[var(--space-brand-primary-500)] bg-[var(--space-surface-accent-soft)] ring-2 ring-[color-mix(in_srgb,var(--space-brand-primary-500)_18%,transparent)]' : member ? 'border-[var(--space-border-strong)] bg-[var(--space-surface-muted)]' : 'border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-card)]'}`}><div className="flex items-start justify-between gap-2"><h3 className="font-black text-[var(--space-text-primary)]">{fn}</h3>{isArenaLeader(team, member) && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_14%,transparent)] px-2 py-1 text-[9px] font-black uppercase text-[var(--space-semantic-success)]">Leader</span>}</div><p className="mt-2 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">{FUNCTION_DESCRIPTIONS[fn]}</p>{member ? <div className="mt-4 rounded-xl bg-[var(--space-surface-card)] p-3"><p className="text-sm font-bold text-[var(--space-text-primary)]">{member.name}{own ? ' · You' : ''}</p>{member.linkedin ? <a href={member.linkedin} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs font-semibold text-[var(--space-text-brand)] underline">LinkedIn profile</a> : null}</div> : <div className="mt-4 rounded-xl border border-dashed border-[var(--space-border-strong)] p-3 text-center text-xs font-bold text-[var(--space-text-muted)]">{full ? 'Team full' : 'Open'}</div>}</article>; })}</div>
  </section>;
}

function WarmUp({ active, busy, run, onRefresh }: any) {
  const session = active?.session;
  const team = active?.team;
  const member = active?.member;
  const members = Array.isArray(team?.members) ? team.members : [];
  const leader = isArenaLeader(team, member, active?.registration);
  const [present, setPresent] = useState<string[]>(() => members.filter((item: any) => item?.isPresent).map((item: any) => item.userId).filter(Boolean));
  useEffect(() => { setPresent(members.filter((item: any) => item?.isPresent).map((item: any) => item.userId).filter(Boolean)); }, [team?.members]);
  if (!session) return <EntryStateError title="Session not found" body="Refresh Case Arena to load the current session." />;
  if (!team || !member) return <EntryStateError title="Team assignment not found" body="You are not linked to a team for this session." />;
  return <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
    <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)]"><CheckCircle2 className="h-5 w-5 text-[var(--space-semantic-success)]" /></div><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Check-in complete</p><h2 className="mt-1 text-xl font-black text-[var(--space-text-primary)]">{active.team.name}</h2><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">Your team is in the warm-up room. The Pawvia case and shared draft will open automatically when the session moves to Solve.</p><div className="mt-4 rounded-xl bg-[var(--space-neutral-950)] p-4 text-white"><p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Solve opens in</p><p className="mt-1 font-mono text-3xl font-black">{formatCountdown(active.remainingSeconds)}</p></div>{leader ? <button type="button" disabled={busy === 'advance-checkin'} onClick={() => run('advance-checkin', { action: 'advance_stage', session_id: session.id, sessionId: session.id, target_stage: 'solve', targetStage: 'solve' })} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-sm font-black text-[var(--space-text-on-primary)] disabled:opacity-50">{busy === 'advance-checkin' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}Done — Start Solving →</button> : <button type="button" onClick={onRefresh} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] text-sm font-bold text-[var(--space-text-secondary)]"><RefreshCw className="h-4 w-4" />Check Leader Status →</button>}</section>
    <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Attendance</p><h3 className="mt-1 font-black text-[var(--space-text-primary)]">{present.length} of {members.length} present</h3></div>{leader && <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">Team leader</span>}</div><div className="mt-3 space-y-2">{members.map((member: any) => <label key={member.userId} className="flex items-center gap-3 rounded-xl bg-[var(--space-surface-muted)] p-3"><input type="checkbox" disabled={!leader} checked={present.includes(member.userId)} onChange={(event) => setPresent(event.target.checked ? [...present, member.userId] : present.filter((id) => id !== member.userId))} /><div className="min-w-0 flex-1"><p className="text-sm font-bold text-[var(--space-text-primary)]">{member.name}{member.isLeader ? ' · Leader' : ''}</p><p className="text-xs text-[var(--space-text-muted)]">{member.function}</p></div><span className={`text-[10px] font-bold ${present.includes(member.userId) ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-text-muted)]'}`}>{present.includes(member.userId) ? 'Present' : 'Pending'}</span></label>)}</div>{leader ? <button type="button" disabled={busy === 'presence'} onClick={() => run('presence', { action: 'leader_presence', session_id: active.session.id, team_id: active.team.id, present_user_ids: present })} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] text-sm font-bold text-[var(--space-text-brand)] disabled:opacity-50">{busy === 'presence' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}Confirm who is present</button> : <p className="mt-4 text-xs leading-5 text-[var(--space-text-muted)]">Your team leader confirms the final attendance list.</p>}</section>
  </div>;
}

function TeammateBanner() { return <section className="flex items-start gap-3 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--space-text-brand)]" /><div><p className="text-sm font-black text-[var(--space-text-primary)]">You are viewing as a team member</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Your leader is submitting on behalf of the team. Read the case, discuss with your team, and this screen will follow the round as it advances.</p></div></section>; }

function WaitingCard({ title, body, onRefresh }: { title: string; body: string; onRefresh?: () => void }) { return <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-8 text-center"><Clock3 className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" /><h2 className="mt-3 text-lg font-black text-[var(--space-text-primary)]">{title}</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--space-text-secondary)]">{body}</p>{onRefresh && <button type="button" onClick={onRefresh} className="mx-auto mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-5 text-sm font-black text-[var(--space-text-on-primary)]"><RefreshCw className="h-4 w-4" />Refresh Stage →</button>}</section>; }

function Checkin({ active, busy, run }: any) {
  const session = active?.session;
  const registration = active?.registration;
  const team = active?.team;
  const member = active?.member;
  const members = Array.isArray(team?.members) ? team.members : [];
  const [code, setCode] = useState('');
  const [teamName, setTeamName] = useState(team?.name || '');
  const [present, setPresent] = useState<string[]>(members.filter((item: any) => item?.isPresent).map((item: any) => item.userId).filter(Boolean));
  const leader = isArenaLeader(team, member, active?.registration);
  if (!session) return <EntryStateError title="Session not found" body="Refresh Case Arena to load the current session." />;
  if (!registration) return <EntryStateError title="You are not registered for this session" body="Return to Sessions and register before checking in." />;
  if (!team || !member) return <EntryStateError title="Team assignment not found" body="Your registration is not linked to a team for this session." />;
  return <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]"><section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Authenticate with your team code</h3><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Case access remains locked until the server opens Solve, even with a valid code.</p><Input label="6-character code" value={code} onChange={setCode} placeholder="ABC234" /><div className="mt-3">{leader && <Input label="Team name" value={teamName} onChange={setTeamName} />}</div><button type="button" onClick={() => run('checkin', { action: 'checkin', session_id: active.session.id, team_code: code.toUpperCase(), team_name: leader ? teamName : undefined })} disabled={busy === 'checkin'} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] text-sm font-bold text-[var(--space-text-on-primary)]"><UserCheck className="h-4 w-4" />Check in</button></section><section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">{active.team.name}</h3><div className="mt-3 space-y-2">{members.map((member: any) => <label key={member.userId} className="flex items-center gap-3 rounded-xl bg-[var(--space-surface-muted)] p-3"><input type="checkbox" disabled={!leader} checked={present.includes(member.userId)} onChange={(event) => setPresent(event.target.checked ? [...present, member.userId] : present.filter((id) => id !== member.userId))} /><div className="min-w-0"><p className="text-sm font-bold text-[var(--space-text-primary)]">{member.name}{member.isLeader ? ' · Leader' : ''}</p><p className="text-xs text-[var(--space-text-muted)]">{member.function}</p></div></label>)}</div>{leader && <button type="button" onClick={() => run('presence', { action: 'leader_presence', session_id: active.session.id, team_id: active.team.id, present_user_ids: present })} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] text-sm font-bold text-[var(--space-text-brand)]"><Check className="h-4 w-4" />Confirm who is present</button>}</section></div>;
}

function Solve({ active, busy, run, onRefresh, watchRebuttal }: any) {
  const session = active?.session;
  const registration = active?.registration;
  const team = active?.team;
  const member = active?.member;
  const [draft, setDraft] = useState<Record<string, string>>({ ...emptyDraft(), ...(active?.submission?.draft || {}) });
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const dirty = useRef(false);
  const leader = viewerIsTeamLeader(active);
  useEffect(() => { if (!leader && active?.submission?.draft) setDraft({ ...emptyDraft(), ...active.submission.draft }); }, [leader, active?.submission?.draft]);
  useEffect(() => { if (leader) { dirty.current = true; setSaveState('unsaved'); } }, [draft, leader]);
  useEffect(() => {
    if (!session?.id) return;
    const timer = window.setInterval(async () => { if (!dirty.current || active?.submission?.submittedAt) return; setSaveState('saving'); try { await run('autosave', { action: 'save_draft', session_id: session.id, draft }); dirty.current = false; setSaveState('saved'); } catch { setSaveState('unsaved'); } }, 30_000);
    return () => window.clearInterval(timer);
  }, [draft, session?.id, active?.submission?.submittedAt]);
  if (!session) return <EntryStateError title="Session not found" body="Refresh Case Arena to load the current session." />;
  if (!registration) return <EntryStateError title="You are not registered for this session" body="Return to Sessions and register before solving." />;
  if (!team || !member) return <EntryStateError title="Team assignment not found" body="Your registration is not linked to a team for this session." />;
  if (!active.case) return <WaitingCard title="Case access is loading" body="The Pawvia case is opening for your team." onRefresh={onRefresh} />;
  return <div className="space-y-5"><section className="space-y-4"><div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Candidate brief</p><h2 className="mt-1 text-xl font-black text-[var(--space-text-primary)]">{active.case.title}</h2>{active.case.businessBrief.map((paragraph: string) => <p key={paragraph} className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]">{paragraph}</p>)}<div className="mt-4 rounded-xl bg-[var(--space-surface-muted)] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Definitions</p><ul className="mt-2 space-y-1">{active.case.definitions.map((item: string) => <li key={item} className="text-xs leading-5 text-[var(--space-text-secondary)]">• {item}</li>)}</ul></div></div><div className={`grid gap-4 ${active.case.exhibits.length === 2 ? 'md:grid-cols-2' : active.case.exhibits.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>{active.case.exhibits.map((exhibit: any) => <div key={exhibit.id} className="min-w-0"><ExhibitCard exhibit={exhibit} /></div>)}</div><section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Your assignment</h3><ol className="mt-3 space-y-3">{active.case.assignment.map((task: string, index: number) => <li key={task} className="flex gap-3 text-sm leading-6 text-[var(--space-text-secondary)]"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-xs font-bold text-[var(--space-text-brand)]">{index + 1}</span><span>{task}</span></li>)}</ol><p className="mt-4 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{active.case.deliverable}</p></section></section><aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">{watchRebuttal && <section className="rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Rebuttal in progress</p><h3 className="mt-1 font-black text-[var(--space-text-primary)]">Your leader is answering the rebuttal questions</h3><p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Read along and discuss with your leader. This screen moves on automatically when the round is submitted.</p><div className="mt-3 space-y-3">{(Array.isArray(active.teamRebuttal) ? active.teamRebuttal : []).map((item: any, index: number) => <div key={item.id} className="rounded-xl bg-[var(--space-surface-card)] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Question {index + 1}</p><p className="mt-1 text-sm font-bold leading-6 text-[var(--space-text-primary)]">{item.question_text}</p><p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-[var(--space-text-secondary)]">{item.answer_text || 'Leader answer pending…'}</p></div>)}</div></section>}<section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Shared team draft</p><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Label every assumption explicitly.</p></div><span className={`text-xs font-bold ${saveState === 'saved' ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-semantic-warning)]'}`}>{active.submission?.submittedAt ? 'Final · locked' : saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Unsaved'}</span></div>{leader ? <div className="mt-4 space-y-4">{DRAFT_SECTIONS.map(([key, label]) => <label key={key} className="block"><span className="text-xs font-bold text-[var(--space-text-primary)]">{label}</span><textarea value={draft[key]} disabled={!!active.submission?.submittedAt} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} rows={4} className="mt-1.5 w-full resize-y rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-sm leading-6" /></label>)}</div> : <div className="mt-4 space-y-4">{DRAFT_SECTIONS.map(([key, label]) => <div key={key}><p className="text-xs font-bold text-[var(--space-text-primary)]">{label}</p><div className="mt-1.5 min-h-12 whitespace-pre-wrap rounded-xl bg-[var(--space-surface-muted)] p-3 text-sm leading-6 text-[var(--space-text-secondary)]">{draft[key] || 'Your leader has not written this section yet.'}</div></div>)}</div>}{active.submission?.submittedAt ? <div className="mt-4 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-success-500)_10%,transparent)] p-4"><p className="text-xs font-bold text-[var(--space-semantic-success)]">Submission received</p><p className="mt-1 break-all font-mono text-[11px] text-[var(--space-text-secondary)]">{active.submission.receiptToken}</p><p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{formatDate(active.submission.submittedAt)}</p>{leader && <button type="button" disabled={busy === 'advance-solve'} onClick={() => run('advance-solve', { action: 'advance_stage', session_id: session.id, sessionId: session.id, target_stage: 'rebuttal', targetStage: 'rebuttal' })} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-sm font-black text-[var(--space-text-on-primary)] disabled:opacity-50">{busy === 'advance-solve' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Go to Rebuttal Now →</button>}</div> : leader ? <div className="mt-4 grid gap-2"><button type="button" onClick={() => run('save', { action: 'save_draft', session_id: active.session.id, draft }, () => setSaveState('saved'))} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] text-sm font-bold text-[var(--space-text-secondary)]"><Save className="h-4 w-4" />Save now</button><button type="button" disabled={busy === 'submit'} onClick={() => { if (window.confirm('Submit the final team solution? This cannot be edited afterward.')) run('submit', { action: 'submit_solution', session_id: active.session.id, draft }); }} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] text-sm font-bold text-[var(--space-text-on-primary)] disabled:cursor-not-allowed disabled:opacity-45"><Send className="h-4 w-4" />Submit Answer Early →</button></div> : <div className="mt-4 space-y-2"><div className="rounded-xl bg-[var(--space-surface-muted)] p-4 text-xs leading-5 text-[var(--space-text-secondary)]">Read-only team draft · your Team Leader edits and submits the final solution for everyone.</div><button type="button" onClick={onRefresh} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] text-sm font-bold text-[var(--space-text-brand)]"><RefreshCw className="h-4 w-4" />Check Team Submission →</button></div>}</section></aside></div>;
}

function Rebuttal({ active, call, onRefresh }: any) {
  const session = active?.session;
  const rebuttal = Array.isArray(active?.rebuttal) ? active.rebuttal.filter(Boolean) : [];
  const [answers, setAnswers] = useState<Record<string, string>>(() => Object.fromEntries(rebuttal.map((item: any) => [item.id, item.answer_text || ''])));
  const [saved, setSaved] = useState<Record<string, string>>({});
  const [proceeding, setProceeding] = useState(false);
  const [proceedError, setProceedError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const allAnswered = rebuttal.length > 0 && rebuttal.every((item: any) => String(answers[item.id] || '').trim());
  const submitAndProceed = async () => {
    setProceedError('');
    if (!allAnswered) { setProceedError('Answer every assigned question before submitting.'); setConfirming(false); return; }
    setProceeding(true);
    try {
      await call({ action: 'submit_rebuttal', session_id: session.id, answers: rebuttal.map((item: any) => ({ answer_id: item.id, answer_text: answers[item.id] })) });
      setConfirming(false);
      await onRefresh();
    } catch (reason: any) { setProceedError(reason?.message || 'Could not submit the rebuttal.'); setConfirming(false); }
    finally { setProceeding(false); }
  };
  useEffect(() => {
    setAnswers((current) => {
      const next = { ...current };
      let changed = false;
      for (const item of rebuttal) { if (next[item.id] === undefined && item.answer_text) { next[item.id] = item.answer_text; changed = true; } }
      return changed ? next : current;
    });
  }, [active?.rebuttal]);
  useEffect(() => {
    if (!session?.id) return;
    const timer = window.setInterval(async () => { for (const item of rebuttal) { const value = answers[item.id] || ''; if (value !== (saved[item.id] ?? item.answer_text ?? '')) { try { await call({ action: 'save_rebuttal', session_id: session.id, answer_id: item.id, answer_text: value }); setSaved((current) => ({ ...current, [item.id]: value })); } catch {} } } }, 20_000);
    return () => window.clearInterval(timer);
  }, [answers, active?.rebuttal, session?.id, call, saved]);
  if (!session) return <EntryStateError title="Session not found" body="Refresh Case Arena to load the current session." />;
  if (!active?.registration || !active?.team || !active?.member) return <EntryStateError title="You are not registered for this session" body="A valid registration and team assignment are required for rebuttal." />;
  return <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Individual rebuttal · {active?.member?.function || active?.registration?.function_track || 'Your function'}</p><h2 className="mt-1 text-xl font-black text-[var(--space-text-primary)]">Defend your reasoning</h2><p className="mt-1 text-sm text-[var(--space-text-secondary)]">These two questions are assigned to you based on the function you selected. Answer and submit independently; the team advances only after every member submits.</p><div className="mt-5 space-y-5">{rebuttal.length ? rebuttal.map((item: any, index: number) => <label key={item.id} className="block rounded-2xl bg-[var(--space-surface-muted)] p-4"><span className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Question {index + 1} of {rebuttal.length}</span><span className="mt-2 block text-sm font-bold leading-6 text-[var(--space-text-primary)]">{item.question_text || `Assigned question #${item.question_id}`}</span><textarea value={answers[item.id] || ''} onChange={(event) => setAnswers({ ...answers, [item.id]: event.target.value })} rows={7} className="mt-3 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-sm leading-6" /><span className="mt-1 block text-[10px] text-[var(--space-text-muted)]">{saved[item.id] === answers[item.id] ? 'Saved' : 'Autosave pending'}</span></label>) : <WaitingCard title="Questions are being assigned" body="Case Arena is selecting two questions for your registered function. If that function has no dedicated questions, a general fallback is used." />}</div>{confirming && !proceedError && <p className="mt-4 rounded-xl bg-[var(--space-surface-accent-soft)] p-3 text-xs font-semibold text-[var(--space-text-primary)]">Submitting locks in your individual rebuttal. The team will move on after every member has submitted. Press the button again to confirm.</p>}{proceedError && <p role="alert" className="mt-4 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_8%,transparent)] p-3 text-xs text-[var(--space-semantic-danger)]">{proceedError}</p>}<div className="mt-4 grid gap-2 sm:grid-cols-2"><button type="button" onClick={() => onRefresh()} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-border-default)] text-sm font-bold"><RefreshCw className="h-4 w-4" />Check saved answers</button><button type="button" disabled={proceeding || !allAnswered} onClick={() => { if (confirming) void submitAndProceed(); else { setProceedError(''); setConfirming(true); } }} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-sm font-black text-[var(--space-text-on-primary)] disabled:opacity-50">{proceeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{confirming ? 'Confirm — Submit My Rebuttal' : 'Submit My Rebuttal'}</button></div></section>;
}

function PeerReview({ active, busy, run }: any) {
  const session = active?.session;
  const peerTargets = Array.isArray(active?.peerTargets) ? active.peerTargets.filter(Boolean) : [];
  const initialReviews = () => Object.fromEntries(peerTargets.map((target: any) => [target.userId, { analysis: 0, communication: 0, collaboration: 0, note: '' }]));
  const [reviews, setReviews] = useState<Record<string, { analysis: number; communication: number; collaboration: number; note: string }>>(initialReviews);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setReviews((current) => Object.fromEntries(peerTargets.map((target: any) => [target.userId, current[target.userId] || { analysis: 0, communication: 0, collaboration: 0, note: '' }])));
  }, [active?.peerTargets]);
  const updateRank = (targetId: string, dimension: 'analysis' | 'communication' | 'collaboration', nextRank: number) => {
    setReviews((current) => {
      const previousRank = current[targetId][dimension];
      const swapTarget = Object.keys(current).find((id) => id !== targetId && current[id][dimension] === nextRank);
      const next = { ...current, [targetId]: { ...current[targetId], [dimension]: nextRank } };
      if (swapTarget) next[swapTarget] = { ...next[swapTarget], [dimension]: previousRank };
      return next;
    });
  };
  const updateNote = (targetId: string, note: string) => setReviews((current) => ({ ...current, [targetId]: { ...current[targetId], note } }));
  const allRanksComplete = peerTargets.length > 0 && (['analysis', 'communication', 'collaboration'] as const).every((dimension) => {
    const ranks = peerTargets.map((target: any) => Number(reviews[target.userId]?.[dimension] || 0));
    return ranks.every((rank) => Number.isInteger(rank) && rank >= 1 && rank <= peerTargets.length) && new Set(ranks).size === peerTargets.length;
  });
  const leader = viewerIsTeamLeader(active);
  if (!session) return <EntryStateError title="Session not found" body="Refresh Case Arena to load the current session." />;
  if (!active?.registration || !active?.team || !active?.member) return <EntryStateError title="You are not registered for this session" body="A valid registration and team assignment are required for peer review." />;
  return <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex items-start gap-3"><ShieldCheck className="h-5 w-5 text-[var(--space-text-brand)]" /><div><h2 className="text-xl font-black text-[var(--space-text-primary)]">Private Peer Review</h2><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">Rank every other teammate from strongest ({ordinal(1)}) to {ordinal(peerTargets.length)} in each dimension. Every rank must be used once per dimension. Leaders and members complete the same private form.</p></div></div><div className="mt-5 space-y-4">{peerTargets.map((target: any) => <article key={target.userId} className="rounded-2xl bg-[var(--space-surface-muted)] p-4"><div><h3 className="font-bold text-[var(--space-text-primary)]">{target.name}</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">{target.function}{target.isLeader ? ' · Team Leader' : ''}</p></div><div className="mt-4 grid gap-3 md:grid-cols-3">{([['analysis', 'Contribution to analysis'], ['communication', 'Communication clarity'], ['collaboration', 'Collaboration & support']] as const).map(([key, label]) => <label key={key}><span className="text-xs font-semibold text-[var(--space-text-secondary)]">{label}</span><select value={reviews[target.userId]?.[key] || 0} onChange={(event) => updateRank(target.userId, key, Number(event.target.value))} className="mt-1.5 min-h-11 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3"><option value={0}>Select rank</option>{peerTargets.map((_: any, index: number) => <option key={index + 1} value={index + 1}>{ordinal(index + 1)}</option>)}</select></label>)}</div><label className="mt-4 block"><span className="text-xs font-semibold text-[var(--space-text-secondary)]">Confidential note</span><textarea value={reviews[target.userId]?.note || ''} onChange={(event) => updateNote(target.userId, event.target.value)} rows={3} placeholder="Private context for the judge (optional)" className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-sm leading-6" /></label></article>)}</div>{!submitted && !allRanksComplete && <p className="mt-4 text-xs font-semibold text-[var(--space-semantic-warning)]">Choose a unique rank for every teammate in all three dimensions to enable submission.</p>}{submitted && <p className="mt-4 rounded-xl bg-[var(--space-surface-accent-soft)] p-3 text-xs font-semibold text-[var(--space-text-primary)]">Your peer review is submitted. Waiting for the remaining team members; this round completes and AI scoring starts automatically when everyone submits.</p>}<button type="button" disabled={submitted || busy === 'peer' || !allRanksComplete} onClick={async () => { const result = await run('peer', { action: 'submit_peer_reviews', session_id: active.session.id, reviews: peerTargets.map((target: any) => ({ reviewee_id: target.userId, ratings: { analysis_rank: reviews[target.userId]?.analysis, communication_rank: reviews[target.userId]?.communication, collaboration_rank: reviews[target.userId]?.collaboration, confidential_note: reviews[target.userId]?.note || '' } })) }); if (result) setSubmitted(true); }} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-50">{busy === 'peer' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardCheck className="h-4 w-4" />}{submitted ? 'Peer Review Submitted' : 'Submit Peer Review'}</button>{submitted && leader && <button type="button" disabled={busy === 'peer-force'} onClick={() => { if (window.confirm('Finish peer review now? AI scoring will use submitted rankings and treat missing peer evidence neutrally.')) void run('peer-force', { action: 'advance_stage', session_id: active.session.id, target_stage: 'complete', targetStage: 'complete', force_complete: true }); }} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] text-sm font-black text-[var(--space-text-brand)] disabled:opacity-50">{busy === 'peer-force' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}Leader: Finish Peer Review Now</button>}</section>;
}

function Feedback({ active, busy, run }: any) {
  if (!active?.session) return <EntryStateError title="Session not found" body="Refresh Case Arena to load the current session." />;
  if (!active.registration || !active.team || !active.member) return <EntryStateError title="You are not registered for this session" body="A valid registration and team assignment are required to view feedback." />;
  const release = active.session.feedbackRelease || {};
  const leader = isArenaLeader(active?.team, active?.member, active?.registration);
  return <div className="space-y-5"><section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h2 className="text-xl font-black text-[var(--space-text-primary)]">Judge-approved feedback</h2>{Object.keys(release).length ? <div className="mt-4 space-y-3">{Object.entries(release).map(([section, text]) => <div key={section} className="rounded-xl bg-[var(--space-surface-muted)] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{section}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]">{String(text)}</p></div>)}</div> : <p className="mt-2 text-sm text-[var(--space-text-secondary)]">Pending judge approval. Feedback appears section by section when the admin releases it.</p>}<button type="button" disabled={busy === 'advance-feedback'} onClick={() => { if (leader && !window.confirm('Advance the whole team to Results?')) return; void run('advance-feedback', { action: 'advance_stage', session_id: active.session.id, sessionId: active.session.id, target_stage: 'complete', targetStage: 'complete' }); }} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-sm font-black text-[var(--space-text-on-primary)] disabled:opacity-50">{busy === 'advance-feedback' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}View Results →</button></section>{active.score ? <ScoreBreakdown score={active.score} /> : <WaitingCard title="Pending AI judging" body="Your results will appear here after the server evaluates the case submission, rebuttals, and peer rankings." />}</div>;
}

function ScoreBreakdown({ score }: any) { const cards = [['Case score · 70%', score.teamCase, score.caseReasoning], ['Your rebuttal score · 20%', score.rebuttal, score.rebuttalReasoning], ['Individual performance points · 10%', score.peer, score.peerReasoning]]; return <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">AI-generated results</p><h3 className="mt-1 text-3xl font-black text-[var(--space-text-primary)]">{toNumber(score.final).toFixed(1)} / 100</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">Weighted total from the case, your rebuttal, and ordinal peer rankings.</p><div className="mt-4 grid gap-3 lg:grid-cols-3">{cards.map(([label, value, reasoning]) => <div key={String(label)} className="rounded-xl bg-[var(--space-surface-muted)] p-4"><p className="text-xs text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-xl font-black text-[var(--space-text-primary)]">{toNumber(value).toFixed(1)} / 100</p><p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]">{String(reasoning || 'The AI judge did not provide additional reasoning.')}</p></div>)}</div>{score.summary && <div className="mt-4 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Overall team performance</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{score.summary}</p></div>}{score.feedback && <div className="mt-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-primary)]">Your specific feedback</p><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{score.feedback}</p></div>}</section>; }

function Results({ active, sessions, onRefresh, onDone }: any) {
  const released = sessions.filter((session: any) => session.rankingReleased);
  if (!active?.score && !active?.leaderboard?.length) return <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-8 text-center"><Trophy className="mx-auto h-8 w-8 text-[var(--space-text-brand)]" /><h2 className="mt-3 text-xl font-black text-[var(--space-text-primary)]">{released.length ? 'Ranking released' : 'Round complete · AI judging pending'}</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--space-text-secondary)]">Your team's case, individual rebuttals, and private peer rankings are submitted. AI-generated case, rebuttal, and individual performance results appear here as soon as automatic judging completes; the team leaderboard is published separately.</p><div className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row">{onRefresh && <button type="button" onClick={onRefresh} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] px-5 text-sm font-black text-[var(--space-text-brand)]"><RefreshCw className="h-4 w-4" />Refresh Results</button>}{onDone && <button type="button" onClick={onDone} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-5 text-sm font-black text-[var(--space-text-on-primary)]"><CheckCircle2 className="h-4 w-4" />Finish →</button>}</div></section>;
  return <div className="space-y-5">{active?.score && <ScoreBreakdown score={active.score} />}<section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Team leaderboard</p>{active?.leaderboard?.length ? <div className="mt-4 space-y-2">{active.leaderboard.map((team: any) => <div key={team.teamId} className="flex items-center gap-3 rounded-xl bg-[var(--space-surface-muted)] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--space-brand-primary-600)] text-sm font-black text-white">{team.rank}</span><span className="min-w-0 flex-1 font-bold text-[var(--space-text-primary)]">{team.teamName}</span><span className="font-black text-[var(--space-text-brand)]">{toNumber(team.score).toFixed(1)}</span></div>)}</div> : <p className="mt-2 text-sm text-[var(--space-text-secondary)]">Your AI-generated results are ready. The team leaderboard will appear after the organizer publishes it.</p>}<div className="mt-5 grid gap-2 sm:grid-cols-2">{onRefresh && <button type="button" onClick={onRefresh} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] text-sm font-black text-[var(--space-text-brand)]"><RefreshCw className="h-4 w-4" />Refresh Results</button>}{onDone && <button type="button" onClick={onDone} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] text-sm font-black text-[var(--space-text-on-primary)]"><CheckCircle2 className="h-4 w-4" />Finish →</button>}</div></section></div>;
}

function AdminPanel({ data, busy, run, loadAdmin }: any) {
  const [sessionForm, setSessionForm] = useState({ name: 'Pawvia Case Arena', startsAt: '', registrationDeadline: '', meetingLink: '', stageDurations: { checkin: 20, solve: 60, rebuttal: 30, peer_review: 10, feedback: 40 } });
  const [selected, setSelected] = useState(data?.selectedSessionId || '');
  const [feedback, setFeedback] = useState('{}');
  const [, setClockTick] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setClockTick((value) => value + 1), 1000); return () => window.clearInterval(timer); }, []);
  if (!data) return <div className="flex items-center justify-center gap-2 py-16 text-sm text-[var(--space-text-muted)]"><Loader2 className="h-4 w-4 animate-spin" />Loading admin controls…</div>;
  const durationTotal = Object.values(sessionForm.stageDurations).reduce((sum, value) => sum + Number(value), 0);
  const selectedSession = data.sessions.find((session: any) => session.id === selected);
  const selectedStageKey = String(selectedSession?.stage || '');
  const selectedStageMinutes = Number(selectedSession?.stageDurations?.[selectedStageKey] || 0);
  const selectedStageStart = Date.parse(selectedSession?.stageStartedAt || '');
  const selectedRemaining = Number.isFinite(selectedStageStart) ? Math.max(0, Math.round((selectedStageStart + selectedStageMinutes * 60000 - Date.now()) / 1000)) : selectedStageMinutes * 60;
  const stageOrder = ['registration', 'checkin', 'solve', 'rebuttal', 'peer_review', 'feedback', 'complete'];
  const selectedStageIndex = stageOrder.indexOf(selectedStageKey);
  const nextStage = selectedStageIndex >= 0 && selectedStageIndex < stageOrder.length - 1 ? stageOrder[selectedStageIndex + 1] : null;
  const reload = () => void loadAdmin(selected || undefined);
  return <div className="space-y-5">
    <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Founder controls</p><h2 className="mt-1 text-xl font-black text-[var(--space-text-primary)]">Competition control room</h2></div><button type="button" onClick={reload} className="flex min-h-10 items-center gap-2 rounded-xl border border-[var(--space-border-default)] px-4 text-xs font-bold"><RefreshCw className="h-4 w-4" />Refresh</button></div><select value={selected} onChange={(event) => { setSelected(event.target.value); void loadAdmin(event.target.value); }} className="mt-4 min-h-11 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 text-sm"><option value="">Select session</option>{data.sessions.map((session: any) => <option key={session.id} value={session.id}>{displayArenaName(session.name)} · {session.stage}</option>)}</select></section>

    <div className="grid gap-5"><section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Create session</h3><div className="mt-3 space-y-3"><Input label="Session name" value={sessionForm.name} onChange={(value: string) => setSessionForm({ ...sessionForm, name: value })} /><Input label="Starts at" type="datetime-local" value={sessionForm.startsAt} onChange={(value: string) => setSessionForm({ ...sessionForm, startsAt: value })} /><Input label="Registration deadline" type="datetime-local" value={sessionForm.registrationDeadline} onChange={(value: string) => setSessionForm({ ...sessionForm, registrationDeadline: value })} /><Input label="Meeting link" value={sessionForm.meetingLink} onChange={(value: string) => setSessionForm({ ...sessionForm, meetingLink: value })} /><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{CASE_MASTERY_STAGES.map((stage) => <Input key={stage.id} label={stage.label} type="number" value={sessionForm.stageDurations[stage.id as keyof typeof sessionForm.stageDurations]} onChange={(value: string) => setSessionForm({ ...sessionForm, stageDurations: { ...sessionForm.stageDurations, [stage.id]: Number(value) } })} />)}</div><p className={`text-xs font-bold ${durationTotal === 160 ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-semantic-danger)]'}`}>Total: {durationTotal} minutes · must equal 160</p><button type="button" disabled={durationTotal !== 160} onClick={() => run('create-session', { action: 'admin_create_session', session: { ...sessionForm, startsAt: new Date(sessionForm.startsAt).toISOString(), registrationDeadline: new Date(sessionForm.registrationDeadline).toISOString() } }, reload)} className="min-h-11 w-full rounded-xl bg-[var(--space-brand-primary-600)] text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-50">Create frozen Pawvia session</button></div></section></div>

    {selected && <>
      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-neutral-950)] p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">Admin-only · never shown to candidates</p><h3 className="mt-1 text-lg font-black">Pawvia judge reference</h3><div className="mt-4 grid gap-4 lg:grid-cols-3"><div><p className="text-xs font-bold text-white/80">Calculation checks</p><ul className="mt-2 space-y-1.5">{(data.caseRecord?.judge?.calculationChecks || []).map((item: string) => <li key={item} className="text-xs leading-5 text-white/70">• {item}</li>)}</ul></div><div><p className="text-xs font-bold text-white/80">Possible issue trees</p><ul className="mt-2 space-y-1.5">{(data.caseRecord?.judge?.issueTrees || []).map((item: string) => <li key={item} className="text-xs leading-5 text-white/70">• {item}</li>)}</ul></div><div><p className="text-xs font-bold text-white/80">Defensible alternatives</p><ul className="mt-2 space-y-1.5">{(data.caseRecord?.judge?.alternatives || []).map((item: string) => <li key={item} className="text-xs leading-5 text-white/70">• {item}</li>)}</ul></div></div><details className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3"><summary className="cursor-pointer text-xs font-bold text-white/80">Complete frozen source record · all 4 pages and 7 exhibits</summary><pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap text-[10px] leading-5 text-white/65">{JSON.stringify(data.caseRecord?.candidate || {}, null, 2)}</pre></details></section>
      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-black text-[var(--space-text-primary)]">Live stage controller</h3><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Current: <span className="font-bold text-[var(--space-text-brand)]">{selectedSession?.stage || '—'}</span> · Timer {formatCountdown(selectedRemaining)}. Timed stages advance automatically and every automatic or manual change is audited.</p></div><button type="button" onClick={() => { if (window.confirm('Form or replace teams? This action is audited.')) run('teams', { action: 'admin_form_teams', session_id: selected, confirm: true }, reload); }} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-xs font-bold"><Users className="mr-1.5 inline h-4 w-4" />Form diverse teams</button></div>{nextStage && <button type="button" disabled={busy === 'stage-next'} onClick={() => { if (window.confirm(`Advance from ${selectedStageKey.replace('_', ' ')} to ${nextStage.replace('_', ' ')}? This action is audited.`)) run('stage-next', { action: 'admin_advance_stage', session_id: selected, confirm: true }, reload); }} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 text-sm font-black text-[var(--space-text-on-primary)] disabled:opacity-50">{busy === 'stage-next' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}Advance to Next Stage · {nextStage.replace('_', ' ')}</button>}<div className="mt-4 grid gap-2 sm:grid-cols-7">{['registration','checkin','solve','rebuttal','peer_review','feedback','complete'].map((stage) => <button key={stage} type="button" onClick={() => { if (window.confirm(`Move the server-controlled stage to ${stage}?`)) run('stage', { action: 'admin_advance_stage', session_id: selected, stage, confirm: true }, reload); }} className="min-h-10 rounded-xl border border-[var(--space-border-default)] px-2 text-xs font-bold text-[var(--space-text-secondary)]">{stage.replace('_',' ')}</button>)}</div></section>

      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex items-center justify-between"><h3 className="font-black text-[var(--space-text-primary)]">Registrations & waitlist</h3><span className="text-xs text-[var(--space-text-muted)]">{data.registrations.length} people</span></div><div className="mt-3 overflow-x-auto"><table className="min-w-full text-xs"><thead><tr>{['Name','Function','Status','Team','Actions'].map((item) => <th key={item} className="border-b border-[var(--space-border-strong)] px-2 py-2 text-left">{item}</th>)}</tr></thead><tbody>{data.registrations.map((reg: any) => <tr key={reg.id}><td className="border-b border-[var(--space-border-default)] px-2 py-2"><p className="font-bold">{reg.full_name}</p><p className="text-[10px] text-[var(--space-text-muted)]">{reg.email}</p></td><td className="border-b px-2 py-2">{reg.function_track}</td><td className="border-b px-2 py-2">{reg.waitlisted ? 'Waitlist' : reg.approved === false ? 'Removed' : reg.attendance_status}</td><td className="border-b px-2 py-2">{reg.team_id || '—'}</td><td className="border-b px-2 py-2"><div className="flex gap-1">{['approve','waitlist','remove'].map((operation) => <button key={operation} type="button" onClick={() => run(`reg-${operation}`, { action: 'admin_registration', session_id: selected, registration_id: reg.id, operation }, reload)} className="rounded border border-[var(--space-border-default)] px-2 py-1">{operation}</button>)}</div></td></tr>)}</tbody></table></div></section>

      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Teams, check-in & leader override</h3><div className="mt-4 grid gap-4 lg:grid-cols-2">{data.teams.map((team: any) => { const members = data.members.filter((member: any) => member.team_id === team.id); return <article key={team.id} className="rounded-xl bg-[var(--space-surface-muted)] p-4"><div className="flex justify-between gap-2"><div><p className="font-bold text-[var(--space-text-primary)]">{team.team_name}</p><p className="font-mono text-xs text-[var(--space-text-muted)]">Code {team.team_code}</p></div><span className="text-xs text-[var(--space-text-muted)]">{members.filter((m: any) => m.is_present).length}/{members.length} present</span></div><div className="mt-3 space-y-2">{members.map((member: any) => <TeamMemberAdmin key={member.id} member={member} team={team} teams={data.teams} selected={selected} run={run} reload={reload} />)}</div></article>; })}</div></section>

      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Question bank & rebuttal grading</h3><div className="mt-3 grid gap-3 lg:grid-cols-2">{data.questions.map((question: any) => <QuestionEditor key={question.id} question={question} selected={selected} run={run} reload={reload} />)}</div><div className="mt-5 space-y-2">{data.answers.map((answer: any) => <div key={answer.id} className="grid items-center gap-2 rounded-xl border border-[var(--space-border-default)] p-3 sm:grid-cols-[1fr_120px]"><div><p className="text-xs font-bold">{answer.user_id}</p><p className="mt-1 line-clamp-2 text-xs text-[var(--space-text-secondary)]">{answer.answer_text || 'No answer yet'}</p></div><input type="number" min={0} max={100} defaultValue={answer.score ?? ''} placeholder="0–100" onBlur={(event) => { if (event.target.value !== '') void run('grade-answer', { action: 'admin_grade_rebuttal', session_id: selected, answer_id: answer.id, score: Number(event.target.value) }, reload); }} className="min-h-10 rounded-xl border border-[var(--space-border-default)] px-3" /></div>)}</div></section>

      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Team case rubric</h3><div className="mt-4 grid gap-4 lg:grid-cols-2">{data.teams.map((team: any) => <TeamGradeCard key={team.id} team={team} submission={data.submissions.find((item: any) => item.team_id === team.id)} selected={selected} run={run} reload={reload} />)}</div></section>

      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Private peer review moderation</h3><div className="mt-3 space-y-2">{data.peerReviews.map((review: any) => <div key={review.id} className="rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs"><p className="font-bold">{review.reviewer_id} → {review.reviewee_id}</p><pre className="mt-1 whitespace-pre-wrap text-[var(--space-text-secondary)]">{JSON.stringify(review.ratings_json, null, 2)}</pre></div>)}</div></section>

      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-black text-[var(--space-text-primary)]">Feedback, AI judging & release</h3><p className="mt-1 text-xs text-[var(--space-text-secondary)]">The server scores the final submission, every function-specific rebuttal, and all ordinal peer rankings against a compressed Pawvia brief. It generates the case score, per-person rebuttal score, peer contribution, reasoning, and specific feedback.</p><textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} rows={6} className="mt-3 w-full rounded-xl border border-[var(--space-border-default)] p-3 font-mono text-xs" /><div className="mt-3 grid gap-2 sm:grid-cols-3"><button type="button" onClick={() => { try { run('feedback', { action: 'admin_release_feedback', session_id: selected, feedback_release: JSON.parse(feedback) }, reload); } catch { window.alert('Enter valid JSON.'); } }} className="min-h-11 rounded-xl border border-[var(--space-border-default)] text-xs font-bold">Release feedback</button><button type="button" disabled={busy === 'judging'} onClick={() => void run('judging', { action: 'generate_results', session_id: selected }, reload)} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] px-3 text-xs font-bold text-[var(--space-text-brand)] disabled:opacity-50">{busy === 'judging' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gavel className="h-4 w-4" />}Generate / retry AI scoring</button><button type="button" onClick={() => { if (window.confirm('Publish the team ranking? Individual AI results are already visible after judging completes.')) run('ranking', { action: 'admin_publish_ranking', session_id: selected }, reload); }} className="min-h-11 rounded-xl bg-[var(--space-brand-primary-600)] text-xs font-bold text-[var(--space-text-on-primary)]">Publish ranking</button></div></section>

      <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex items-center justify-between"><div><h3 className="font-black text-[var(--space-text-primary)]">Audit trail</h3><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Admin actions, leader changes, team formation seeds, score changes and releases.</p></div><button type="button" onClick={() => { const blob = new Blob([JSON.stringify(data.audit, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `case-arena-audit-${selected}.json`; a.click(); URL.revokeObjectURL(url); }} className="flex min-h-10 items-center gap-2 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-bold"><Download className="h-4 w-4" />Export</button></div><div className="mt-3 max-h-72 space-y-2 overflow-y-auto">{data.audit.map((item: any) => <div key={item.id} className="rounded-xl bg-[var(--space-surface-muted)] p-3"><p className="text-xs font-bold text-[var(--space-text-primary)]">{item.action}</p><p className="mt-1 text-[10px] text-[var(--space-text-muted)]">{item.actor_user_id} · {formatDate(item.created_at_action)}</p><pre className="mt-1 whitespace-pre-wrap text-[10px] text-[var(--space-text-secondary)]">{JSON.stringify(item.details_json)}</pre></div>)}</div></section>
    </>}
  </div>;
}

function TeamMemberAdmin({ member, team, teams, selected, run, reload }: any) {
  return <div className="rounded-lg bg-[var(--space-surface-card)] p-2"><div className="flex items-center justify-between gap-2"><div><p className="text-xs font-bold">{member.user_id}</p><p className="text-[10px] text-[var(--space-text-muted)]">{member.function} · {member.checkin_status}</p></div><button type="button" onClick={() => run('leader', { action: 'admin_reassign_leader', session_id: selected, team_id: team.id, user_id: member.user_id }, reload)} className={`rounded px-2 py-1 text-[10px] font-bold ${member.is_leader ? 'bg-[var(--space-brand-primary-600)] text-white' : 'border border-[var(--space-border-default)]'}`}>{member.is_leader ? 'Leader' : 'Make leader'}</button></div><label className="mt-2 flex items-center gap-2 text-[10px] text-[var(--space-text-muted)]"><span>Move to</span><select defaultValue={team.id} onChange={(event) => { if (event.target.value !== team.id && window.confirm('Move this member to another team?')) run('move-member', { action: 'admin_move_member', session_id: selected, member_id: member.id, target_team_id: event.target.value }, reload); }} className="min-h-8 flex-1 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2">{teams.map((target: any) => <option key={target.id} value={target.id}>{target.team_name}</option>)}</select></label></div>;
}

function QuestionEditor({ question, selected, run, reload }: any) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ function: question.function, question_text: question.question_text, judge_notes: question.judge_notes || '', active: question.active !== false });
  return <article className="rounded-xl bg-[var(--space-surface-muted)] p-3">{editing ? <div className="space-y-2"><select value={draft.function} onChange={(event) => setDraft({ ...draft, function: event.target.value })} className="min-h-9 w-full rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2 text-xs">{FUNCTIONS.map((item) => <option key={item}>{item}</option>)}</select><textarea value={draft.question_text} onChange={(event) => setDraft({ ...draft, question_text: event.target.value })} rows={4} className="w-full rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2 text-xs" /><textarea value={draft.judge_notes} onChange={(event) => setDraft({ ...draft, judge_notes: event.target.value })} rows={2} placeholder="Judge-only notes" className="w-full rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2 text-xs" /><div className="flex gap-2"><button type="button" onClick={() => setEditing(false)} className="flex-1 rounded-lg border border-[var(--space-border-default)] py-2 text-xs font-bold">Cancel</button><button type="button" onClick={() => run('question', { action: 'admin_save_question', session_id: selected, question_id: question.id, ...draft }, () => { setEditing(false); reload(); })} className="flex-1 rounded-lg bg-[var(--space-brand-primary-600)] py-2 text-xs font-bold text-white">Save</button></div></div> : <><p className="text-[10px] font-bold uppercase text-[var(--space-text-brand)]">{question.function}</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-primary)]">{question.question_text}</p><button type="button" onClick={() => setEditing(true)} className="mt-2 text-[10px] font-bold text-[var(--space-text-brand)] underline">Edit question & judge notes</button></>}</article>;
}

function TeamGradeCard({ team, submission, selected, run, reload }: any) {
  const [rubric, setRubric] = useState<Json>(() => Object.fromEntries(RUBRIC.map(([key]) => [key, 0])));
  const [feedback, setFeedback] = useState({ overall: '', evidence: '' });
  const total = RUBRIC.reduce((sum, [key]) => sum + Number(rubric[key] || 0), 0);
  return <article className="rounded-xl bg-[var(--space-surface-muted)] p-4"><div className="flex items-center justify-between"><h4 className="font-bold text-[var(--space-text-primary)]">{team.team_name}</h4><span className="text-sm font-black text-[var(--space-text-brand)]">{total}/100</span></div>{submission?.draft_json ? <details className="mt-3 rounded-lg bg-[var(--space-surface-card)] p-3"><summary className="cursor-pointer text-xs font-bold text-[var(--space-text-brand)]">Review submitted solution</summary><div className="mt-3 space-y-3">{Object.entries(submission.draft_json).map(([section, text]) => <div key={section}><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{section.replace(/_/g, ' ')}</p><p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-[var(--space-text-secondary)]">{String(text)}</p></div>)}</div></details> : <p className="mt-2 text-xs text-[var(--space-text-muted)]">No final submission yet.</p>}<div className="mt-3 space-y-2">{RUBRIC.map(([key, label, max]) => <label key={key} className="grid grid-cols-[1fr_72px] items-center gap-2"><span className="text-xs text-[var(--space-text-secondary)]">{label} · /{max}</span><input type="number" min={0} max={max} value={rubric[key]} onChange={(event) => setRubric({ ...rubric, [key]: Number(event.target.value) })} className="min-h-9 rounded-lg border border-[var(--space-border-default)] px-2 text-right" /></label>)}</div><textarea value={feedback.overall} onChange={(event) => setFeedback({ ...feedback, overall: event.target.value })} placeholder="Judge feedback citing submission evidence" rows={3} className="mt-3 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-xs" /><button type="button" onClick={() => run('grade-team', { action: 'admin_grade_team', session_id: selected, team_id: team.id, rubric, feedback }, reload)} className="mt-3 min-h-10 w-full rounded-xl bg-[var(--space-brand-primary-600)] text-xs font-bold text-[var(--space-text-on-primary)]"><Gavel className="mr-1.5 inline h-4 w-4" />Save team score</button></article>;
}
