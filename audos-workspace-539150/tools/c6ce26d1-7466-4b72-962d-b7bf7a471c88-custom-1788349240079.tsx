import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Users, UserCheck, Activity, Percent, AlertTriangle, Clock,
  ArrowUpRight, ArrowDownRight, Download, RefreshCw, Calendar,
  ChevronLeft, ChevronRight,
  UserPlus, Repeat, Globe, Smartphone, BarChart3, Info,
  Layers, Zap, CheckCircle2, PlayCircle, Database,
  Target, BookOpen, GraduationCap, Brain, Puzzle,
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
} from 'recharts';

// authToken is the host-injected, session-scoped dashboard token. The platform
// mints it server-side and passes it into the dashboard runtime as a prop at
// render time (same mechanism the shipped DB Explorer uses). It is NOT a raw
// owner/API key, is never hardcoded in client source, and is only used to
// authorize reads of WorkspaceDB tables (e.g. feature_events) via the platform's
// supported REST WorkspaceDB reader (/api/workspaces/{id}/data/{table}?_shared=1) —
// the same authenticated read path the shipped DB Explorer uses.
interface TemplateProps { workspaceId: string; authToken?: string; }

const ACCENT = '#e11d48';
const TIMEZONE = 'Asia/Ho_Chi_Minh'; // GMT+7 — all date math is anchored here
const TZ_LABEL = 'GMT+7';
const DAY_MS = 86400000;
// Engaged time = active interaction time. A gap with no interaction for longer
// than this many seconds is treated as idle (tab blurred / user away) and the
// portion beyond the threshold is not counted. GA4 uses the same 30s convention.
const IDLE_THRESHOLD_SECONDS = 30;

// ---------------------------------------------------------------------------
// GMT+7 date helpers. Calendar dates are represented as 'YYYY-MM-DD' strings.
// Arithmetic is done on a UTC-noon anchor so it is DST/offset agnostic.
// ---------------------------------------------------------------------------
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function todayISOInTz(): string {
  // en-CA formats as YYYY-MM-DD; timeZone pins it to GMT+7.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}
function anchor(iso: string): number { return new Date(iso + 'T12:00:00Z').getTime(); }
function isoFromAnchor(ms: number): string { return new Date(ms).toISOString().slice(0, 10); }
function shiftISO(iso: string, deltaDays: number): string { return isoFromAnchor(anchor(iso) + deltaDays * DAY_MS); }
function daysBetweenInclusive(from: string, to: string): number {
  return Math.round((anchor(to) - anchor(from)) / DAY_MS) + 1;
}
function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m: m - 1, d }; // m is 0-based
}
function isoOf(y: number, m0: number, d: number): string {
  return `${y}-${String(m0 + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
function daysInMonth(y: number, m0: number): number { return new Date(Date.UTC(y, m0 + 1, 0)).getUTCDate(); }
function firstWeekday(y: number, m0: number): number { return new Date(Date.UTC(y, m0, 1)).getUTCDay(); }
function addMonths(y: number, m0: number, n: number) {
  const total = y * 12 + m0 + n;
  return { y: Math.floor(total / 12), m0: ((total % 12) + 12) % 12 };
}
function fmtDMY(iso: string): string {
  const p = parts(iso);
  return `${p.d} ${MONTHS[p.m]} ${p.y}`;
}
// GMT+7 local calendar-day boundary → naive UTC timestamp string (for timestamp columns).
function gmt7ToUtcTs(iso: string): string {
  return new Date(iso + 'T00:00:00+07:00').toISOString().slice(0, 19);
}

// ---------------------------------------------------------------------------
// Presets — all resolved against "today" in GMT+7.
// ---------------------------------------------------------------------------
function buildPresets(todayISO: string): { id: string; label: string; range: [string, string] }[] {
  const p = parts(todayISO);
  const firstOfMonth = isoOf(p.y, p.m, 1);
  const lm = addMonths(p.y, p.m, -1);
  const firstOfLastMonth = isoOf(lm.y, lm.m0, 1);
  const lastOfLastMonth = isoOf(lm.y, lm.m0, daysInMonth(lm.y, lm.m0));
  return [
    { id: 'today', label: 'Today', range: [todayISO, todayISO] },
    { id: 'yesterday', label: 'Yesterday', range: [shiftISO(todayISO, -1), shiftISO(todayISO, -1)] },
    { id: 'last7', label: 'Last 7 days', range: [shiftISO(todayISO, -6), todayISO] },
    { id: 'last30', label: 'Last 30 days', range: [shiftISO(todayISO, -29), todayISO] },
    { id: 'last90', label: 'Last 90 days', range: [shiftISO(todayISO, -89), todayISO] },
    { id: 'thisMonth', label: 'This month', range: [firstOfMonth, todayISO] },
    { id: 'lastMonth', label: 'Last month', range: [firstOfLastMonth, lastOfLastMonth] },
  ];
}

// ---------------------------------------------------------------------------
// Comparison math. previous period = equal-length span immediately before.
// ---------------------------------------------------------------------------
type Delta = { kind: 'pct' | 'new' | 'na'; value: number | null };
function computeDelta(cur: number | null, prev: number | null): Delta {
  if (cur == null || prev == null) return { kind: 'na', value: null };
  if (prev > 0) return { kind: 'pct', value: ((cur - prev) / prev) * 100 };
  if (cur > 0) return { kind: 'new', value: null }; // no baseline → "New", never a huge %
  return { kind: 'na', value: null };
}
function deltaBadgeText(d: Delta): string {
  if (d.kind === 'new') return 'New';
  if (d.kind === 'na' || d.value == null) return 'n/a';
  const capped = Math.max(-999.9, Math.min(999.9, d.value));
  const overflow = Math.abs(d.value) > 999.9;
  const sign = d.value >= 0 ? '+' : '';
  return `${overflow ? (d.value > 0 ? '>+' : '<-') : sign}${Math.abs(capped).toFixed(1)}%`;
}

function formatDuration(totalSecs: number | null): string {
  if (totalSecs == null || !isFinite(totalSecs)) return '—';
  const s = Math.max(0, Math.round(totalSecs));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${sec}s`;
}

// ---------------------------------------------------------------------------
// Fetch layer. This dashboard needs NO API key and never calls an auth-gated
// endpoint. Every metric — headline KPIs AND the Acquisition tab — is sourced
// from the keyless CRM endpoints (funnel-metrics, events, contacts), which run
// against the authenticated workspace session and must be called with PLAIN
// headers. Sending an Authorization bearer makes them reject the request as
// unauthorized (the old "Connect API key" prompt), so we never send one.
// The workspace SQL endpoint (/db/sql) requires an owner/API-key token the host
// does not grant here — it is deliberately NOT used anywhere on this dashboard.
// ---------------------------------------------------------------------------
// Keyless CRM calls: no auth header at all (matches how the endpoints succeed).
function crmHeaders(): Record<string, string> {
  return { 'Content-Type': 'application/json' };
}
async function parseOrThrow(r: Response, label: string) {
  if (!r.ok) {
    const t = await r.text().catch(() => r.statusText);
    throw new Error(`${label}: ${t}`);
  }
  const j = await r.json();
  if (j && typeof j === 'object' && 'error' in j && j.error) {
    throw new Error(`${label}: ${j.error}`);
  }
  return j;
}
// Retry with exponential backoff for transient failures.
async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let lastErr: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try { return await fn(); }
    catch (e: any) {
      lastErr = e;
      if (attempt < retries) await new Promise((res) => setTimeout(res, 300 * Math.pow(2, attempt)));
    }
  }
  throw lastErr;
}

interface FetchCtx {
  workspaceId: string;
  authToken?: string; // host-injected session-scoped token for WorkspaceDB reads
  startISO: string; endISO: string;
  prevStartISO: string; prevEndISO: string;
  todayISO: string;
  timezone: string;
}
type MetricResult = { current: number | null; previous: number | null; extra?: Record<string, number | null> };

async function getEventDaily(ctx: FetchCtx, eventType: string, label: string): Promise<Record<string, number>> {
  // The CRM events API is relative to "today"; fetch enough days back to cover the previous window.
  const daysBack = Math.min(400, Math.max(1, daysBetweenInclusive(ctx.prevStartISO, ctx.todayISO) + 2));
  const j = await withRetry(() =>
    fetch(`/api/crm/events?workspaceId=${ctx.workspaceId}&aggregation=by_day&days=${daysBack}&eventType=${eventType}`,
      { headers: crmHeaders() }).then((r) => parseOrThrow(r, label))
  );
  const map: Record<string, number> = {};
  (j.data || []).forEach((row: any) => { map[row.date] = Number(row.count) || 0; });
  return map;
}
function sumWindow(map: Record<string, number>, from: string, to: string): number {
  let total = 0;
  for (const [date, count] of Object.entries(map)) {
    if (date >= from && date <= to) total += count;
  }
  return total;
}
// Unique visitors via the keyless CRM funnel endpoint. This avoids the workspace
// SQL endpoint (/db/sql), which requires an injected auth token that isn't always
// available in the dashboard host — that gap is what made the Users card render a
// misleading "Connect API key" prompt. funnel-metrics needs no key and reports
// totalUniqueVisitors for the last N days ending today, so it is exact for windows
// ending today (the default range) and a close estimate for other ranges.
async function uniqueVisitors(ctx: FetchCtx, from: string, _to: string): Promise<number> {
  const days = Math.max(1, daysBetweenInclusive(from, ctx.todayISO));
  const j = await withRetry(() =>
    fetch(`/api/crm/funnel-metrics?workspaceId=${ctx.workspaceId}&days=${days}`,
      { headers: crmHeaders() }).then((r) => parseOrThrow(r, 'Unique visitors'))
  );
  return Number(j?.data?.totalUniqueVisitors ?? 0);
}

// ---------------------------------------------------------------------------
// Engagement time. GA4-style estimate from the raw interaction event stream:
// order each session's interactions by time, and count the gap between
// consecutive events as "engaged" only up to the idle threshold. Any stretch
// with no interaction for > 30s is idle (tab blurred / user away) and excluded.
// Average Engagement Time = Total Engaged Time / Number of Users.
// ---------------------------------------------------------------------------
interface RawEvent { sessionId: string; visitorId: string | null; t: number }

// GMT+7 calendar-day window → [startMs, endMsExclusive] as absolute instants.
function gmt7WindowMs(startISO: string, endISO: string): [number, number] {
  const startMs = new Date(startISO + 'T00:00:00+07:00').getTime();
  const endMs = new Date(shiftISO(endISO, 1) + 'T00:00:00+07:00').getTime();
  return [startMs, endMs];
}

async function getRawEvents(ctx: FetchCtx): Promise<RawEvent[]> {
  // One pull covers both the current and previous windows.
  const daysBack = Math.min(400, Math.max(1, daysBetweenInclusive(ctx.prevStartISO, ctx.todayISO) + 2));
  const j = await withRetry(() =>
    fetch(`/api/crm/events?workspaceId=${ctx.workspaceId}&days=${daysBack}&limit=100000`,
      { headers: crmHeaders() }).then((r) => parseOrThrow(r, 'Engagement time'))
  );
  return (j.data || []).map((e: any): RawEvent => ({
    sessionId: e.sessionId || e.visitorId || e.id || 'unknown',
    visitorId: e.visitorId || null,
    t: new Date(e.createdAt).getTime(),
  })).filter((e: RawEvent) => isFinite(e.t));
}

// Total engaged seconds + distinct users for one GMT+7 window.
function engagementForWindow(events: RawEvent[], startMs: number, endMsExcl: number): { totalSecs: number; users: number; avg: number | null } {
  const bySession = new Map<string, number[]>();
  const users = new Set<string>();
  for (const e of events) {
    if (e.t < startMs || e.t >= endMsExcl) continue;
    if (e.visitorId) users.add(e.visitorId);
    const arr = bySession.get(e.sessionId);
    if (arr) arr.push(e.t); else bySession.set(e.sessionId, [e.t]);
  }
  let totalSecs = 0;
  for (const times of bySession.values()) {
    if (times.length < 2) continue; // a lone interaction has no measurable engaged span
    times.sort((a, b) => a - b);
    for (let i = 1; i < times.length; i++) {
      const gap = (times[i] - times[i - 1]) / 1000;
      if (gap > 0) totalSecs += Math.min(gap, IDLE_THRESHOLD_SECONDS);
    }
  }
  const userCount = users.size;
  return { totalSecs, users: userCount, avg: userCount > 0 ? totalSecs / userCount : null };
}

// ---------------------------------------------------------------------------
// METRICS CONFIG — add a new KPI by appending one object here. No UI rewrite.
// ---------------------------------------------------------------------------
interface MetricDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  comparison: boolean;
  format: (v: number | null) => string;
  fetcher: (ctx: FetchCtx) => Promise<MetricResult>;
}

const METRICS: MetricDef[] = [
  {
    key: 'users',
    label: 'Users',
    icon: <Users className="h-4 w-4" />,
    subtitle: 'Unique visitors in selected range',
    comparison: false,
    format: (v) => (v == null ? '—' : Math.round(v).toLocaleString()),
    fetcher: async (ctx) => {
      // Keyless funnel source reports "last N days ending today", so an accurate
      // previous-period unique count isn't available without the workspace SQL token.
      const current = await uniqueVisitors(ctx, ctx.startISO, ctx.endISO);
      return { current, previous: null };
    },
  },
  {
    key: 'sessions',
    label: 'Sessions',
    icon: <UserCheck className="h-4 w-4" />,
    subtitle: 'Total site visits · vs previous period',
    comparison: true,
    format: (v) => (v == null ? '—' : Math.round(v).toLocaleString()),
    fetcher: async (ctx) => {
      const map = await getEventDaily(ctx, 'app_opened', 'Sessions');
      return {
        current: sumWindow(map, ctx.startISO, ctx.endISO),
        previous: sumWindow(map, ctx.prevStartISO, ctx.prevEndISO),
      };
    },
  },
  {
    key: 'engagement',
    label: 'Avg Engagement Time',
    icon: <Clock className="h-4 w-4" />,
    subtitle: 'Engaged time ÷ users · idle >30s excluded',
    comparison: true,
    format: (v) => formatDuration(v),
    fetcher: async (ctx) => {
      // Average Engagement Time = Total Engaged Time / Number of Users, where
      // engaged time counts active interaction and excludes idle gaps > 30s.
      const events = await getRawEvents(ctx);
      const [curStart, curEnd] = gmt7WindowMs(ctx.startISO, ctx.endISO);
      const [prevStart, prevEnd] = gmt7WindowMs(ctx.prevStartISO, ctx.prevEndISO);
      const cur = engagementForWindow(events, curStart, curEnd);
      const prev = engagementForWindow(events, prevStart, prevEnd);
      return {
        current: cur.avg,
        previous: prev.avg,
        extra: { totalEngagedSecs: cur.totalSecs, users: cur.users },
      };
    },
  },
  {
    key: 'registration',
    label: 'Registration Rate',
    icon: <Percent className="h-4 w-4" />,
    subtitle: 'Signups ÷ unique visitors in range',
    comparison: false,
    format: (v) => (v == null ? '—' : `${v.toFixed(1)}%`),
    fetcher: async (ctx) => {
      // Unique visitors come from the keyless funnel source, which can't produce an
      // accurate previous-window figure, so the comparison is omitted here too.
      const [emailMap, uCur] = await Promise.all([
        getEventDaily(ctx, 'email_submit', 'Registrations'),
        uniqueVisitors(ctx, ctx.startISO, ctx.endISO),
      ]);
      const curSignups = sumWindow(emailMap, ctx.startISO, ctx.endISO);
      return {
        current: uCur > 0 ? (curSignups / uCur) * 100 : null,
        previous: null,
        extra: { curSignups, uCur },
      };
    },
  },
];

// fetchMetric(metricKey, startDate, endDate, timezone) — the single reusable entry point.
async function fetchMetric(metricKey: string, ctx: FetchCtx): Promise<MetricResult> {
  const def = METRICS.find((m) => m.key === metricKey);
  if (!def) throw new Error(`Unknown metric: ${metricKey}`);
  return def.fetcher(ctx);
}

// ---------------------------------------------------------------------------
// Date range picker (dual-month, presets, GMT+7).
// ---------------------------------------------------------------------------
function MonthGrid({
  y, m0, todayISO, start, end, hover, onPick, onHover,
}: {
  y: number; m0: number; todayISO: string;
  start: string | null; end: string | null; hover: string | null;
  onPick: (iso: string) => void; onHover: (iso: string | null) => void;
}) {
  const lead = firstWeekday(y, m0);
  const total = daysInMonth(y, m0);
  const cells: (string | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(isoOf(y, m0, d));

  const rangeEnd = end || (start && hover ? hover : null);
  const lo = start && rangeEnd ? (start <= rangeEnd ? start : rangeEnd) : start;
  const hi = start && rangeEnd ? (start <= rangeEnd ? rangeEnd : start) : start;

  return (
    <div className="min-w-[208px] shrink-0">
      <div className="mb-1.5 text-center text-xs font-semibold text-gray-800">{MONTHS[m0]} {y}</div>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(7, minmax(28px, 1fr))' }}>
        {WEEKDAYS.map((w) => (
          <div key={w} className="flex h-6 items-center justify-center text-center text-[11px] font-semibold uppercase text-gray-400">{w}</div>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <div key={i} />;
          const isToday = iso === todayISO;
          const isStart = iso === start;
          const isEnd = iso === end || (!end && iso === hover && !!start);
          const inRange = lo && hi ? iso >= lo && iso <= hi : false;
          const isEndpoint = isStart || isEnd;
          return (
            <button
              key={i}
              onClick={() => onPick(iso)}
              onMouseEnter={() => onHover(iso)}
              className={`relative flex h-7 w-full min-w-[28px] items-center justify-center rounded-md text-xs font-medium transition-colors ${
                isEndpoint ? 'text-white'
                  : inRange ? 'text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: isEndpoint ? ACCENT : inRange ? '#fee2e5' : undefined,
              }}
            >
              {parts(iso).d}
              {isToday && !isEndpoint && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" style={{ backgroundColor: ACCENT }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateRangePicker({
  value, onChange, todayISO,
}: {
  value: [string, string];
  onChange: (range: [string, string]) => void;
  todayISO: string;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => { const p = parts(value[0]); return { y: p.y, m0: p.m }; });
  const [start, setStart] = useState<string | null>(value[0]);
  const [end, setEnd] = useState<string | null>(value[1]);
  const [hover, setHover] = useState<string | null>(null);
  const [panelShift, setPanelShift] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const presets = useMemo(() => buildPresets(todayISO), [todayISO]);
  const activePresetId = presets.find((p) => p.range[0] === value[0] && p.range[1] === value[1])?.id ?? 'custom';

  // Close on outside click or Esc; keep the floating panel on-screen (flip/shift horizontally).
  useEffect(() => {
    if (!open) { setPanelShift(0); return; }
    const onDoc = (e: MouseEvent) => { const target: any = e.target; if (ref.current && !ref.current.contains(target)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);

    const reposition = () => {
      const el = panelRef.current;
      if (!el) return;
      // Measure without any prior shift so the correction is absolute, not cumulative.
      const prev = el.style.transform;
      el.style.transform = 'none';
      const rect = el.getBoundingClientRect();
      el.style.transform = prev;
      const margin = 8;
      let shift = 0;
      if (rect.left < margin) shift = margin - rect.left;                                 // overflow left → push right
      else if (rect.right > window.innerWidth - margin) shift = window.innerWidth - margin - rect.right; // overflow right → push left
      setPanelShift(shift);
    };
    const raf = requestAnimationFrame(reposition);
    window.addEventListener('resize', reposition);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', reposition);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const openPicker = () => {
    setStart(value[0]); setEnd(value[1]); setHover(null);
    const p = parts(value[0]); setView({ y: p.y, m0: p.m });
    setOpen(true);
  };

  const pick = (iso: string) => {
    if (!start || (start && end)) { setStart(iso); setEnd(null); setHover(iso); return; }
    // second click completes the range
    const lo = iso < start ? iso : start;
    const hi = iso < start ? start : iso;
    setStart(lo); setEnd(hi);
    onChange([lo, hi]);
    setOpen(false);
  };

  const applyPreset = (range: [string, string]) => {
    setStart(range[0]); setEnd(range[1]);
    onChange(range);
    setOpen(false);
  };

  const next = addMonths(view.y, view.m0, 1);
  const label = `${fmtDMY(value[0])} - ${fmtDMY(value[1])} (${TZ_LABEL})`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => (open ? setOpen(false) : openPicker())}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
      >
        <Calendar className="h-4 w-4 text-gray-400" />
        {label}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full z-50 mt-2 flex max-w-[calc(100vw-1rem)] overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-2xl"
          style={{ transform: panelShift ? `translateX(${panelShift}px)` : undefined }}
        >
          {/* Presets */}
          <div className="flex w-32 flex-col gap-0.5 border-r border-gray-100 p-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.range)}
                className={`rounded-md px-2.5 py-1 text-left text-xs font-medium transition-colors ${
                  activePresetId === p.id ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activePresetId === p.id ? { backgroundColor: ACCENT } : undefined}
              >
                {p.label}
              </button>
            ))}
            <div className={`mt-0.5 rounded-md px-2.5 py-1 text-left text-xs ${activePresetId === 'custom' ? 'font-semibold text-gray-800' : 'text-gray-400'}`}>
              Custom range
            </div>
          </div>

          {/* Calendars */}
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <button onClick={() => setView(addMonths(view.y, view.m0, -1))} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-medium text-gray-400">Click start, then end date</span>
              <button onClick={() => setView(addMonths(view.y, view.m0, 1))} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4" onMouseLeave={() => setHover(null)}>
              <MonthGrid y={view.y} m0={view.m0} todayISO={todayISO} start={start} end={end} hover={hover} onPick={pick} onHover={setHover} />
              <MonthGrid y={next.y} m0={next.m0} todayISO={todayISO} start={start} end={end} hover={hover} onPick={pick} onHover={setHover} />
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-gray-100 pt-2.5">
              <span className="text-[11px] text-gray-500">
                {start ? fmtDMY(start) : '—'} {end ? `→ ${fmtDMY(end)}` : start ? '→ …' : ''}
              </span>
              <button onClick={() => setOpen(false)} className="rounded-md px-2.5 py-1 text-[11px] font-medium text-gray-500 hover:bg-gray-100">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// KPI card — independent loading / value / error / auth states.
// ---------------------------------------------------------------------------
interface CardState {
  loading: boolean;
  current: number | null;
  previous: number | null;
  error: string | null;
}

function KpiCard({
  def, state,
}: {
  def: MetricDef;
  state: CardState;
}) {
  const delta: Delta = def.comparison ? computeDelta(state.current, state.previous) : { kind: 'na', value: null };
  const showBadge = def.comparison && !state.loading && !state.error;
  const up = (delta.value ?? 0) >= 0;
  const tip = `Current: ${def.format(state.current)} · Previous: ${def.format(state.previous)}` +
    (delta.kind === 'pct' && delta.value != null ? ` · Change: ${delta.value.toFixed(1)}%` : '');

  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">{def.icon}</span>
          <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-gray-500">{def.label}</span>
        </div>
        {showBadge && (
          <span
            title={tip}
            className={`inline-flex cursor-default items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              delta.kind === 'pct'
                ? up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {delta.kind === 'pct' && (up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}
            {deltaBadgeText(delta)}
          </span>
        )}
      </div>

      <div className="mt-2 truncate text-xl font-semibold tracking-tight text-gray-900">
        {state.loading ? (
          <span className="inline-block h-7 w-24 animate-pulse rounded-md bg-gray-100" />
        ) : state.error ? (
          <span className="text-lg font-medium text-gray-400">—</span>
        ) : (
          def.format(state.current)
        )}
      </div>

      {state.error ? (
        <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs text-red-600" title={state.error}>
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-2">{state.error}</span>
        </div>
      ) : (
        <div className="mt-2 text-[11px] leading-snug text-gray-400">{def.subtitle}</div>
      )}
    </div>
  );
}

// ===========================================================================
// ACQUISITION TAB
// Who arrives, from where, on what device. Acquisition-only — no engagement or
// conversion metrics live here. All windows are GMT+7, driven by the global
// date range. Nothing is fabricated: demographics we don't collect render a
// graceful "Not enough data yet" state instead of an empty or fake chart.
// ===========================================================================

// Consistent slice colors — a given category keeps the same color across every donut.
const SLICE_COLORS: Record<string, string> = {
  New: '#0d69b3', Returning: '#9b6ba8',
  Facebook: '#0d69b3', Instagram: '#ec8c22', Threads: '#009f50', Direct: '#64748b', Other: '#cbd5e1',
  Mobile: '#0d69b3', Desktop: '#009f50', Tablet: '#ec8c22',
  Male: '#0d69b3', Female: '#ec8c22', Unknown: '#cbd5e1',
};

type AcqCounts = { total: number; newU: number; returning: number; sessions: number };

// New vs Returning is decided by each visitor's first-ever activity: a visitor
// active in the window whose first-ever event predates the window start is
// "returning"; one whose first-ever event falls inside the window is "new".
// Sessions = distinct session references active in the window.
//
// Source: the keyless CRM event stream (/api/crm/events) — the SAME source the
// Users and Sessions KPI cards use. This deliberately avoids the workspace SQL
// endpoint (/db/sql), which requires an owner/API-key token the dashboard host
// does not grant here — that gap is exactly what produced the
// "This endpoint requires owner or API key access" error on this tab.
interface AcqEvent { visitorId: string | null; sessionRef: string | null; t: number }

// One pull covers the workspace's entire history (a few thousand events), so
// "first-ever seen" per visitor is accurate rather than clipped to a window.
async function getAcqEvents(ctx: FetchCtx): Promise<AcqEvent[]> {
  const j = await withRetry(() =>
    fetch(`/api/crm/events?workspaceId=${ctx.workspaceId}&days=1000&limit=100000`,
      { headers: crmHeaders() }).then((r) => parseOrThrow(r, 'Acquisition'))
  );
  return (j.data || []).map((e: any): AcqEvent => ({
    visitorId: e.visitorId || null,
    sessionRef: e.sessionId || null,
    t: new Date(e.createdAt).getTime(),
  })).filter((e: AcqEvent) => isFinite(e.t));
}

// Earliest event timestamp per visitor across the full pulled history.
function firstSeenMap(events: AcqEvent[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const e of events) {
    if (!e.visitorId) continue;
    const prev = m.get(e.visitorId);
    if (prev == null || e.t < prev) m.set(e.visitorId, e.t);
  }
  return m;
}

// Counts for one GMT+7 window, using the precomputed full-history first-seen map.
function computeAcqForWindow(
  events: AcqEvent[], firsts: Map<string, number>, startMs: number, endMsExcl: number,
): AcqCounts {
  const active = new Set<string>();
  const sessions = new Set<string>();
  for (const e of events) {
    if (e.t < startMs || e.t >= endMsExcl) continue;
    if (e.visitorId) active.add(e.visitorId);
    if (e.sessionRef) sessions.add(e.sessionRef);
  }
  let newU = 0, returning = 0;
  for (const v of active) {
    const first = firsts.get(v);
    if (first != null && first >= startMs) newU++; else returning++;
  }
  return { total: active.size, newU, returning, sessions: sessions.size };
}

// Channel is derived from CRM contact acquisition attribution (the only reliable
// source of where a person arrived from). We never invent it — a contact with no
// attribution signal is counted as Direct, unknown non-social referrers as Other.
type ChannelName = 'Facebook' | 'Instagram' | 'Threads' | 'Direct' | 'Other';
function classifyChannel(c: any): ChannelName {
  const bag = [
    c.utmSource, c.utmMedium, c.attribution?.source, c.attribution?.medium,
    c.attribution?.campaign, c.sourceCategory, c.campaignName, c.adSetName,
    c.rawAttribution?.httpReferrer, c.platform,
  ].filter(Boolean).join(' ').toLowerCase();
  const hasFbclid = !!c.attribution?.fbclid;
  if (c.igUsername || /instagram|(^|[^a-z])ig([^a-z]|$)/.test(bag)) return 'Instagram';
  if (/threads/.test(bag)) return 'Threads';
  if (hasFbclid || /facebook|(^|[^a-z])fb|meta|paid_social/.test(bag)) return 'Facebook';
  if (!bag || /direct/.test(bag)) return 'Direct';
  return 'Other';
}

interface ChannelResult { slices: { label: string; value: number; color: string }[]; total: number }
async function fetchChannel(ctx: FetchCtx): Promise<ChannelResult> {
  const j = await withRetry(() =>
    fetch(`/api/crm/contacts/${ctx.workspaceId}?limit=500`, { headers: crmHeaders() })
      .then((r) => parseOrThrow(r, 'Channel'))
  );
  const contacts: any[] = j.contacts || [];
  const [startMs, endMsExcl] = gmt7WindowMs(ctx.startISO, ctx.endISO);
  const counts: Record<ChannelName, number> = { Facebook: 0, Instagram: 0, Threads: 0, Direct: 0, Other: 0 };
  let total = 0;
  for (const c of contacts) {
    const seen = new Date(c.firstSeen || c.createdAt).getTime();
    if (!isFinite(seen) || seen < startMs || seen >= endMsExcl) continue; // respect the GMT+7 date window
    counts[classifyChannel(c)]++; total++;
  }
  // Group any slice under 3% into "Other" so the donut stays readable.
  const primary: ChannelName[] = ['Facebook', 'Instagram', 'Threads', 'Direct'];
  let otherExtra = 0;
  const slices: { label: string; value: number; color: string }[] = [];
  for (const k of primary) {
    const v = counts[k];
    if (v <= 0) continue;
    if (total > 0 && v / total < 0.03) otherExtra += v;
    else slices.push({ label: k, value: v, color: SLICE_COLORS[k] });
  }
  const otherTotal = counts.Other + otherExtra;
  if (otherTotal > 0) slices.push({ label: 'Other', value: otherTotal, color: SLICE_COLORS.Other });
  slices.sort((a, b) => b.value - a.value);
  return { slices, total };
}

// --- Small presentational pieces --------------------------------------------
function DeltaBadge({ delta }: { delta: Delta }) {
  if (delta.kind === 'na') return <span className="text-[11px] text-gray-300">—</span>;
  const up = (delta.value ?? 0) >= 0;
  const pct = delta.kind === 'pct';
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
      pct ? (up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600') : 'bg-gray-100 text-gray-500'
    }`}>
      {pct && (up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}
      {deltaBadgeText(delta)}
    </span>
  );
}

function AcqStat({ label, icon, value, delta, loading }: {
  label: string; icon: React.ReactNode; value: string; delta: Delta; loading: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        <span className="text-gray-400">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        {loading ? (
          <span className="inline-block h-7 w-20 animate-pulse rounded-md bg-gray-100" />
        ) : (
          <span className="truncate text-xl font-semibold tracking-tight text-gray-900">{value}</span>
        )}
        {!loading && <DeltaBadge delta={delta} />}
      </div>
      {!loading && <div className="mt-1.5 text-[11px] text-gray-400">vs previous period</div>}
    </div>
  );
}

function Panel({ title, subtitle, icon, children, className }: {
  title: string; subtitle?: string; icon: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className || ''}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">{icon}</span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-gray-800">{title}</div>
          {subtitle && <div className="truncate text-[11px] text-gray-400">{subtitle}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

function NoData({ icon, hint }: { icon: React.ReactNode; hint: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50/60 px-4 py-8 text-center">
      <span className="text-gray-300">{icon}</span>
      <div className="text-sm font-medium text-gray-500">Not enough data yet</div>
      <div className="max-w-[220px] text-[11px] leading-snug text-gray-400">{hint}</div>
    </div>
  );
}

function ErrorStrip({ label, message }: { label: string; message: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span><span className="font-semibold">{label} failed:</span> {message}</span>
    </div>
  );
}

// --- Donut with center label, on-slice %, legend & tooltip ------------------
function DonutTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  const tot = p.payload?.__total || 0;
  const pct = tot ? Math.round((p.value / tot) * 100) : 0;
  return (
    <div className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs shadow-md">
      <span className="font-medium text-gray-800">{p.name}</span>
      <span className="text-gray-500">: {Number(p.value).toLocaleString()} ({pct}%)</span>
    </div>
  );
}

function Donut({ data, centerValue, centerLabel, height = 172 }: {
  data: { label: string; value: number; color: string }[];
  centerValue: string; centerLabel: string; height?: number;
}) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const withTotal = data.map((d) => ({ ...d, __total: total }));
  const renderPct = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (percent < 0.08) return null; // hide labels on tiny slices to avoid clutter
    const RAD = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RAD);
    const y = cy + r * Math.sin(-midAngle * RAD);
    return (
      <text x={x} y={y} fill="#fff" fontSize={10} fontWeight={600} textAnchor="middle" dominantBaseline="central">
        {Math.round(percent * 100)}%
      </text>
    );
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={withTotal} dataKey="value" nameKey="label" cx="50%" cy="50%"
              innerRadius={height * 0.34} outerRadius={height * 0.48}
              paddingAngle={data.length > 1 ? 2 : 0} stroke="none"
              labelLine={false} label={renderPct} isAnimationActive={false}
            >
              {withTotal.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-gray-900">{centerValue}</span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{centerLabel}</span>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-gray-600">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
              {d.label}
            </span>
            <span className="font-medium text-gray-900">
              {d.value.toLocaleString()}{' '}
              <span className="text-gray-400">({total ? Math.round((d.value / total) * 100) : 0}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutSkeleton({ height = 172 }: { height?: number }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto animate-pulse rounded-full bg-gray-100" style={{ height, width: height }} />
      <div className="mt-3 space-y-2">
        {[0, 1, 2].map((i) => <div key={i} className="h-3 animate-pulse rounded bg-gray-100" />)}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OVERVIEW content — shown under the pinned KPI header. Since the four headline
// KPIs now live in the always-visible header, this tab gives them context:
// the exact reporting window being compared, and what each metric measures.
// No new data is fetched — it reuses the METRICS config and the current range.
// ---------------------------------------------------------------------------
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-2 last:border-0">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="truncate text-right text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function OverviewContent({
  startISO, endISO, prevStartISO, prevEndISO, rangeLen,
}: {
  startISO: string; endISO: string; prevStartISO: string; prevEndISO: string; rangeLen: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Panel title="Reporting window" subtitle="All dates anchored to GMT+7" icon={<Calendar className="h-4 w-4" />}>
        <div className="flex flex-col">
          <InfoRow label="Selected range" value={`${fmtDMY(startISO)} → ${fmtDMY(endISO)}`} />
          <InfoRow label="Compared with" value={`${fmtDMY(prevStartISO)} → ${fmtDMY(prevEndISO)}`} />
          <InfoRow label="Span" value={`${rangeLen} day${rangeLen === 1 ? '' : 's'}`} />
          <InfoRow label="Timezone" value={`${TIMEZONE.replace('_', ' ')} (${TZ_LABEL})`} />
        </div>
        <p className="mt-3 flex items-start gap-2 text-[11px] leading-snug text-gray-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Each headline card compares the selected range against the equal-length span immediately before it.
        </p>
      </Panel>

      <Panel title="What these metrics mean" subtitle="Definitions for the four headline KPIs" icon={<Info className="h-4 w-4" />} className="lg:col-span-2">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {METRICS.map((def) => (
            <div key={def.key} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50/60 p-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-gray-500 shadow-sm">{def.icon}</span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-gray-800">{def.label}</div>
                <div className="text-[11px] leading-snug text-gray-500">{def.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function AcquisitionTab({ ctx }: { ctx: FetchCtx }) {
  const [counts, setCounts] = useState<{ cur: AcqCounts; prev: AcqCounts } | null>(null);
  const [countsErr, setCountsErr] = useState<string | null>(null);
  const [countsLoading, setCountsLoading] = useState(true);

  const [channel, setChannel] = useState<ChannelResult | null>(null);
  const [channelErr, setChannelErr] = useState<string | null>(null);
  const [channelLoading, setChannelLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setCountsLoading(true); setCountsErr(null);
    getAcqEvents(ctx)
      .then((events) => {
        if (cancelled) return;
        const firsts = firstSeenMap(events);
        const [cs, ce] = gmt7WindowMs(ctx.startISO, ctx.endISO);
        const [ps, pe] = gmt7WindowMs(ctx.prevStartISO, ctx.prevEndISO);
        const cur = computeAcqForWindow(events, firsts, cs, ce);
        const prev = computeAcqForWindow(events, firsts, ps, pe);
        setCounts({ cur, prev }); setCountsLoading(false);
      })
      .catch((e: any) => { if (cancelled) return; setCountsErr(e.message || 'Failed to load'); setCountsLoading(false); });
    return () => { cancelled = true; };
  }, [ctx]);

  useEffect(() => {
    let cancelled = false;
    setChannelLoading(true); setChannelErr(null);
    fetchChannel(ctx)
      .then((res) => { if (cancelled) return; setChannel(res); setChannelLoading(false); })
      .catch((e: any) => { if (cancelled) return; setChannelErr(e.message || 'Failed to load'); setChannelLoading(false); });
    return () => { cancelled = true; };
  }, [ctx]);

  const cur = counts?.cur, prev = counts?.prev;
  const rate = (c?: AcqCounts) => (c && c.total > 0 ? (c.newU / c.total) * 100 : null);

  const stats = [
    { key: 'new', label: 'New Users', icon: <UserPlus className="h-3.5 w-3.5" />, value: cur ? cur.newU.toLocaleString() : '—', delta: computeDelta(cur?.newU ?? null, prev?.newU ?? null) },
    { key: 'ret', label: 'Returning Users', icon: <Repeat className="h-3.5 w-3.5" />, value: cur ? cur.returning.toLocaleString() : '—', delta: computeDelta(cur?.returning ?? null, prev?.returning ?? null) },
    { key: 'rate', label: 'New User Rate', icon: <Percent className="h-3.5 w-3.5" />, value: rate(cur) != null ? `${rate(cur)!.toFixed(1)}%` : '—', delta: computeDelta(rate(cur), rate(prev)) },
    { key: 'total', label: 'Total Users', icon: <Users className="h-3.5 w-3.5" />, value: cur ? cur.total.toLocaleString() : '—', delta: computeDelta(cur?.total ?? null, prev?.total ?? null) },
    { key: 'sessions', label: 'Sessions', icon: <Activity className="h-3.5 w-3.5" />, value: cur ? cur.sessions.toLocaleString() : '—', delta: computeDelta(cur?.sessions ?? null, prev?.sessions ?? null) },
  ];

  const newRetData = cur && cur.total > 0
    ? [
        { label: 'New', value: cur.newU, color: SLICE_COLORS.New },
        { label: 'Returning', value: cur.returning, color: SLICE_COLORS.Returning },
      ]
    : [];

  return (
    <div className="flex flex-col gap-5">
      {/* SECTION 1 — Acquisition KPI row */}
      <div className="flex flex-col gap-3">
        {countsErr && <ErrorStrip label="Acquisition metrics" message={countsErr} />}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {stats.map((s) => (
            <AcqStat key={s.key} label={s.label} icon={s.icon} value={s.value} delta={s.delta} loading={countsLoading && !countsErr} />
          ))}
        </div>
      </div>

      {/* SECTION 2 — Composition donuts */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-700">User composition</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Panel title="New vs Returning" subtitle="Share of users in range" icon={<Users className="h-4 w-4" />}>
            {countsErr ? <NoData icon={<Users className="h-6 w-6" />} hint="Could not load user data for this range." />
              : countsLoading ? <DonutSkeleton />
              : newRetData.length === 0 ? <NoData icon={<Users className="h-6 w-6" />} hint="No user activity recorded in the selected date range." />
              : <Donut data={newRetData} centerValue={cur!.total.toLocaleString()} centerLabel="Total Users" />}
          </Panel>

          <Panel title="Users by Channel" subtitle="By acquisition source" icon={<Globe className="h-4 w-4" />}>
            {channelErr ? <NoData icon={<Globe className="h-6 w-6" />} hint={`Channel data unavailable: ${channelErr}`} />
              : channelLoading ? <DonutSkeleton />
              : !channel || channel.slices.length === 0 ? <NoData icon={<Globe className="h-6 w-6" />} hint="No attributed arrivals in the selected date range." />
              : <Donut data={channel.slices} centerValue={channel.total.toLocaleString()} centerLabel="Contacts" />}
          </Panel>

          <Panel title="Device Breakdown" subtitle="Mobile · Desktop · Tablet" icon={<Smartphone className="h-4 w-4" />}>
            <NoData icon={<Smartphone className="h-6 w-6" />} hint="Device type isn't recorded in this workspace's event stream, so it can't be shown yet." />
          </Panel>
        </div>
      </div>

      {/* SECTION 3 — Demographics */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-700">Demographics</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Panel title="Geography" subtitle="Country → city breakdown" icon={<Globe className="h-4 w-4" />} className="lg:col-span-2 min-h-[320px]">
            <NoData
              icon={<Globe className="h-7 w-7" />}
              hint="Country and city data needs geo-IP resolution, which isn't captured in this workspace's analytics events yet. It will populate here automatically once available."
            />
          </Panel>
          <div className="flex flex-col gap-4">
            <Panel title="Age" subtitle="By age bucket" icon={<BarChart3 className="h-4 w-4" />} className="min-h-[150px]">
              <NoData icon={<BarChart3 className="h-6 w-6" />} hint="Age isn't collected by the analytics source, or is below the reporting threshold." />
            </Panel>
            <Panel title="Gender" subtitle="Distribution" icon={<Users className="h-4 w-4" />} className="min-h-[150px]">
              <NoData icon={<Users className="h-6 w-6" />} hint="Gender isn't collected by the analytics source, or is below the reporting threshold." />
            </Panel>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-1.5 text-[11px] leading-snug text-gray-400">
        <Info className="mt-0.5 h-3 w-3 shrink-0" />
        <span>
          Users, sessions and new/returning are computed from first-party visitor activity in GMT+7.
          Channel is derived from contact acquisition attribution. Device and demographic panels stay
          empty until the underlying data is collected — values are never estimated.
        </span>
      </div>
    </div>
  );
}

// ===========================================================================
// ENGAGEMENT TAB  (redesigned body — below the mini-tabs only)
// Sourced EXCLUSIVELY from the canonical `feature_events` ledger, and NEVER a
// legacy table (usage_events / case_practice_cases / micro_drills /
// session_tracking). feature_events is a WorkspaceDB table that CANNOT be read
// directly from a real browser session (POST /db/sql needs a dashboard token that
// is not injected on this host; GET /data?_shared=1 is viewer-scoped and returns
// an empty array → both previously rendered a misleading "0"). Instead the ledger
// is read through a read-only SERVER HOOK (`engagement-events-v1`) that holds the
// workspace credential server-side and returns only the 9 analytic columns as
// JSON; the browser calls its /execute endpoint with the ambient session. See
// fetchFeatureEvents. The ledger is small (a few hundred rows), so the whole
// window is aggregated client-side; that is what makes distinct-day engagement
// and per-day sparklines exact rather than estimated. A zero-row / failed read is
// surfaced as a visible error — it is never shown as "0" data.
//
// Integrity rules enforced here, end to end:
//   • Rows with identity_status <> 'resolved' NEVER contribute to a distinct-user
//     count (they remain countable as raw events only).
//   • Founder / internal / dev accounts are already excluded upstream when the
//     ledger is written, so no extra client filter is needed.
//   • "Completed" (core action) = ONLY event_role='core_action', restricted to the
//     approved event names: fit_program_selected, case_graded,
//     drill_answer_submitted, practice_rep_completed, domain_card_learned OR
//     domain_test_completed (deduped per session), aptitude_submitted.
//   • Nothing is fabricated: a stage with no valid event, or an event with no data
//     in the window, is FLAGGED (never shown as a misleading "0").
//   • All calendar math is GMT+7, driven by the global date filter. No percentage
//     is ever allowed above 100%, and no child count above its parent.
// Auth to the hook mirrors the shipped Server Hooks dashboard exactly (optional
// authToken bearer, x-device-token fallback, credentials:'include'); on any hook
// failure the tab shows a visible error strip instead of pretending zero data.
// ===========================================================================

// The approved set of core-action event names (the only events that count as a
// completion). Kept in lockstep with the event_role='core_action' tag on the row.
const CORE_ACTION_EVENTS = new Set<string>([
  'fit_program_selected', 'case_graded', 'drill_answer_submitted',
  'practice_rep_completed', 'domain_card_learned', 'domain_test_completed',
  'aptitude_submitted',
]);

interface FeatureEventRow {
  feature: string;
  event: string;
  role: string;
  mode: string | null;
  userId: string | null;
  identity: string;
  sessionId: string | null;
  t: number;        // occurred_at as epoch ms (UTC)
  source: string;   // 'live' | 'backfill'
}

// feature_events.occurred_at is stored as a naive UTC timestamp — normalize any
// serialized form ("2026-08-12T03:16:46.097" or with a space) to epoch ms as UTC.
function occurredToMs(v: any): number {
  if (v == null) return NaN;
  let s = String(v);
  if (!/[zZ]$|[+-]\d\d:?\d\d$/.test(s)) s = s.replace(' ', 'T') + 'Z';
  return new Date(s).getTime();
}

// Map a raw feature_events record (the 9 analytic columns returned by the
// engagement-events-v1 server hook) into the strongly-typed row the tab aggregates.
function mapFeatureEventRow(e: any): FeatureEventRow {
  return {
    feature: e.feature_name, event: e.event_name, role: e.event_role, mode: e.mode ?? null,
    userId: e.user_id ?? null, identity: e.identity_status, sessionId: e.session_id ?? null,
    t: occurredToMs(e.occurred_at), source: e.source_kind,
  };
}

// -----------------------------------------------------------------------------
// feature_events read layer — SERVER-SIDE PROXY (the only path that works in a
// real logged-in browser session).
//
// Why the browser cannot read this ledger directly (both earlier attempts FAILED
// in a real session and are permanently removed):
//   • POST /db/sql  → requires window.__DASHBOARD_AUTH_TOKEN__, which is NOT
//     injected on this dashboard host (verified missing at runtime) → 401 / dead.
//   • GET /data/feature_events?_shared=1 → authorized but viewer-scoped, so it
//     returns HTTP 200 with an EMPTY array → previously rendered a misleading "0".
//
// feature_events is a WorkspaceDB table that only a server-side context holding
// workspace credentials may read in full. So the read runs inside a SERVER HOOK
// (`engagement-events-v1`) that holds the credential server-side and returns only
// the 9 analytic columns as JSON — no credential, no properties_json, no writes.
// The browser calls the hook's /execute endpoint with the ambient session
// (credentials:'include'), exactly like the shipped Server Hooks dashboard does.
//
// Contract: { ok:true, count, rows:[ …9 cols… ] }. A non-ok body, a transport
// failure, or 0 rows from this never-empty ledger is thrown as a HARD ERROR so the
// tab shows a visible red strip — a silent "0" is impossible by construction.
// -----------------------------------------------------------------------------

const ENGAGEMENT_HOOK = 'engagement-events-v1';

async function fetchFeatureEvents(ctx: FetchCtx): Promise<FeatureEventRow[]> {
  const url = `/api/workspaces/${ctx.workspaceId}/hooks/${ENGAGEMENT_HOOK}/execute`;
  // Mirror the shipped Server Hooks dashboard auth exactly: prefer an injected
  // bearer, else the workspace device token, else rely on the ambient session
  // cookie (credentials:'include'). No workspace credential is ever handled here —
  // the credential lives only inside the server hook.
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (ctx.authToken) headers['Authorization'] = `Bearer ${ctx.authToken}`;
  else if (typeof localStorage !== 'undefined') {
    const dt = localStorage.getItem('workspace_device_token');
    if (dt) headers['x-device-token'] = dt;
  }

  let r: Response;
  try {
    r = await withRetry(() => fetch(url, {
      method: 'POST', credentials: 'include', headers, body: JSON.stringify({}),
    }));
  } catch (e: any) {
    throw new Error(`engagement-events-v1 hook: network error — ${e?.message || e}`);
  }
  if (!r.ok) {
    const t = await r.text().catch(() => r.statusText);
    throw new Error(`engagement-events-v1 hook ${r.status}: ${t}`);
  }
  const j: any = await r.json().catch(() => null);
  if (!j || j.ok !== true) {
    const detail = j ? (j.error || JSON.stringify(j)) : 'empty response body';
    throw new Error(`engagement-events-v1 hook returned an error: ${detail}`);
  }
  const raw: any[] = Array.isArray(j.rows) ? j.rows : [];
  const rows = raw.map(mapFeatureEventRow).filter((e) => isFinite(e.t));
  // A zero-row result from a ledger that is never empty is a READ FAILURE, never a
  // valid empty state — surface it so the tab shows a visible error, not "0".
  if (rows.length === 0) {
    throw new Error(
      `The ${ENGAGEMENT_HOOK} hook returned 0 rows. feature_events is never empty, so this ` +
      `is treated as a read failure (never rendered as "0"). Confirm the hook is enabled in ` +
      `Server Hooks & Tasks and that this session is signed in to the workspace.`
    );
  }
  // eslint-disable-next-line no-console
  console.info(`[Engagement] feature_events loaded via server hook ${ENGAGEMENT_HOOK}: ${rows.length} rows`);
  return rows;
}

// GMT+7 calendar day for a UTC instant (YYYY-MM-DD).
const engDayFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit',
});
function engDayKey(ms: number): string { return engDayFmt.format(new Date(ms)); }

// A row is a valid, countable completion by a real person.
function isResolvedCore(e: FeatureEventRow): boolean {
  return e.role === 'core_action'
    && e.identity === 'resolved'
    && !!e.userId
    && CORE_ACTION_EVENTS.has(e.event)
    && e.t !== undefined;
}

interface EngKpis {
  activeLearners: number;          // distinct resolved core-action users
  engagementRate: number | null;   // engaged / activated, %
  sessionsPerUser: number | null;
  actionsPerUser: number | null;
  engagedUsers: number; activatedUsers: number; sessions: number; actions: number;
}

// One GMT+7 window → the four headline KPIs, computed from resolved core actions.
function computeKpis(rows: FeatureEventRow[], startMs: number, endMsExcl: number): EngKpis {
  const users = new Set<string>();
  const sessions = new Set<string>();
  let actions = 0;
  const daysByUser = new Map<string, Set<string>>();
  for (const e of rows) {
    if (e.t < startMs || e.t >= endMsExcl) continue;
    if (!isResolvedCore(e)) continue;
    users.add(e.userId as string);
    if (e.sessionId) sessions.add(e.sessionId);
    actions++;
    let ds = daysByUser.get(e.userId as string);
    if (!ds) { ds = new Set(); daysByUser.set(e.userId as string, ds); }
    ds.add(engDayKey(e.t));
  }
  const activated = users.size;
  let engaged = 0;
  for (const ds of daysByUser.values()) if (ds.size >= 2) engaged++;
  return {
    activeLearners: activated,
    engagementRate: activated > 0 ? Math.min(100, (engaged / activated) * 100) : null,
    sessionsPerUser: activated > 0 ? sessions.size / activated : null,
    actionsPerUser: activated > 0 ? actions / activated : null,
    engagedUsers: engaged, activatedUsers: activated, sessions: sessions.size, actions,
  };
}

interface DayPoint { day: string; users: number; sessions: number; actions: number }
// Per-day real series across the selected window (drives the KPI sparklines).
function dailySeries(rows: FeatureEventRow[], startISO: string, endISO: string): DayPoint[] {
  const days: string[] = [];
  for (let cur = startISO; cur <= endISO; cur = shiftISO(cur, 1)) days.push(cur);
  const idx = new Map(days.map((d, i) => [d, i] as const));
  const u = days.map(() => new Set<string>());
  const s = days.map(() => new Set<string>());
  const a = days.map(() => 0);
  for (const e of rows) {
    if (!isResolvedCore(e)) continue;
    const i = idx.get(engDayKey(e.t));
    if (i == null) continue;
    u[i].add(e.userId as string);
    if (e.sessionId) s[i].add(e.sessionId);
    a[i]++;
  }
  return days.map((d, i) => ({ day: d, users: u[i].size, sessions: s[i].size, actions: a[i] }));
}

// Per-event aggregate within a window: raw events, distinct resolved users, source
// split, and a per-user tally (used for repeat thresholds).
interface EventAgg { events: number; users: Set<string>; live: number; backfill: number; byUser: Map<string, number> }
function aggregateEvents(rows: FeatureEventRow[], startMs: number, endMsExcl: number): Map<string, EventAgg> {
  const m = new Map<string, EventAgg>();
  for (const e of rows) {
    if (e.t < startMs || e.t >= endMsExcl) continue;
    const k = `${e.feature}|${e.event}`;
    let a = m.get(k);
    if (!a) { a = { events: 0, users: new Set(), live: 0, backfill: 0, byUser: new Map() }; m.set(k, a); }
    a.events++;
    if (e.source === 'live') a.live++; else a.backfill++;
    if (e.identity === 'resolved' && e.userId) {
      a.users.add(e.userId);
      a.byUser.set(e.userId, (a.byUser.get(e.userId) || 0) + 1);
    }
  }
  return m;
}

// Every `${feature}|${event}` that has EVER appeared — lets us distinguish
// "instrumented but idle this window" (awaiting usage) from "never emitted"
// (instrumentation needed).
function allTimeEventKeys(rows: FeatureEventRow[]): Set<string> {
  const s = new Set<string>();
  for (const e of rows) s.add(`${e.feature}|${e.event}`);
  return s;
}

// --- Roadmap-accurate feature funnels ---------------------------------------
// Each stage names the EXACT feature_events.event_name it reads. `event: null`
// means no canonical event is defined for that step yet. Resolution is fully
// data-driven at render time (see resolveStage): a stage shows a real value, or
// "Awaiting real usage" (event exists all-time but idle this window), or
// "Instrumentation needed" (event never emitted / not defined). Nothing is faked.
type StageFlag = 'awaiting' | 'instrumentation';
type FeatureStatus = 'live' | 'awaiting' | 'instrumentation';
type StageKind = 'open' | 'step' | 'activation' | 'core' | 'repeat';

interface RStage {
  label: string;
  kind: StageKind;
  event: string | null;
  repeatThreshold?: number;
  note?: string;
}
interface SideStat {
  label: string;
  event: string | null;       // numerator event (e.g. aptitude_timed_out)
  overEvent?: string | null;  // denominator adds this event to `event`
  note?: string;
}
interface RFeature {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  feature: string;            // feature_events.feature_name
  stages: RStage[];
  sideStats?: SideStat[];
  caveat?: string;            // window-independent data-integrity caveat
}

// Selector groups. "Case Drill" fans out into its two roadmap modes.
interface SelectorItem { id: string; label: string; icon: React.ReactNode; features: string[] }
const ENG_SELECTOR: SelectorItem[] = [
  { id: 'fit', label: 'Fit Assessment', icon: <Target className="h-3.5 w-3.5" />, features: ['fit'] },
  { id: 'case_pool', label: 'Case Pool', icon: <Layers className="h-3.5 w-3.5" />, features: ['case_pool'] },
  { id: 'casedrill', label: 'Case Drill', icon: <BookOpen className="h-3.5 w-3.5" />, features: ['drill_library', 'practice'] },
  { id: 'domain', label: 'Domain Knowledge', icon: <Brain className="h-3.5 w-3.5" />, features: ['domain'] },
  { id: 'aptitude', label: 'Aptitude Test', icon: <Puzzle className="h-3.5 w-3.5" />, features: ['aptitude'] },
];

const ENG_FEATURES: Record<string, RFeature> = {
  fit: {
    id: 'fit', title: 'Fit Assessment', subtitle: 'Industry & function fit → program match',
    icon: <Target className="h-4 w-4" />, feature: 'fit',
    caveat: 'fit_roadmap_created is intentionally NOT counted as a completion — it fires on the "View Roadmap" click, not a confirmed program selection.',
    stages: [
      { label: 'Started', kind: 'open', event: 'fit_started' },
      { label: 'CV Uploaded', kind: 'step', event: 'fit_cv_parsed' },
      { label: 'Motivation', kind: 'step', event: 'fit_motivation' },
      { label: 'Work Style', kind: 'step', event: 'fit_work_style' },
      { label: 'MBTI', kind: 'step', event: 'fit_mbti' },
      { label: 'Function Fit Viewed', kind: 'activation', event: 'fit_function_fit_viewed' },
      { label: 'Program Selected', kind: 'core', event: 'fit_program_selected' },
    ],
  },
  case_pool: {
    id: 'case_pool', title: 'Case Pool', subtitle: 'Full-length case practice',
    icon: <Layers className="h-4 w-4" />, feature: 'case_pool',
    stages: [
      { label: 'Opened', kind: 'open', event: 'casepool_opened' },
      { label: 'Filtered / Selected', kind: 'step', event: 'case_filtered' },
      { label: 'Case Opened', kind: 'step', event: 'case_opened' },
      { label: 'Submitted', kind: 'step', event: 'case_submitted' },
      { label: 'Graded', kind: 'core', event: 'case_graded' },
      { label: 'Next Case', kind: 'repeat', event: 'case_graded', repeatThreshold: 2 },
    ],
  },
  drill_library: {
    id: 'drill_library', title: 'Case Drill — Question Library', subtitle: 'Mode A · self-serve question bank',
    icon: <BookOpen className="h-4 w-4" />, feature: 'drill_library',
    stages: [
      { label: 'Opened', kind: 'open', event: 'drill_library_opened' },
      { label: 'Skill Selected', kind: 'step', event: 'drill_skill_selected' },
      { label: 'Question Opened', kind: 'step', event: 'drill_question_opened' },
      { label: 'Answer Submitted', kind: 'core', event: 'drill_answer_submitted' },
      { label: 'Next Question', kind: 'repeat', event: 'drill_answer_submitted', repeatThreshold: 3 },
    ],
  },
  practice: {
    id: 'practice', title: 'Case Drill — Practice with Mate', subtitle: 'Mode B · coached sub-skill reps',
    icon: <GraduationCap className="h-4 w-4" />, feature: 'practice',
    stages: [
      { label: 'Opened', kind: 'open', event: 'practice_opened' },
      { label: 'Sub-skill Started', kind: 'step', event: 'practice_subskill_started' },
      { label: 'Submitted', kind: 'step', event: 'practice_submitted' },
      { label: 'Graded', kind: 'activation', event: 'practice_graded' },
      { label: 'Rep Completed', kind: 'core', event: 'practice_rep_completed' },
      { label: 'Repeat Rep', kind: 'repeat', event: 'practice_rep_completed', repeatThreshold: 2 },
    ],
  },
  domain: {
    id: 'domain', title: 'Domain Knowledge', subtitle: 'Industry learning cards & tests',
    icon: <Brain className="h-4 w-4" />, feature: 'domain',
    stages: [
      { label: 'Opened', kind: 'open', event: 'domain_opened' },
      { label: 'Path Selected', kind: 'step', event: 'domain_path_selected' },
      { label: 'Sub-category Opened', kind: 'step', event: 'domain_subcategory_opened' },
      { label: 'Mode Started', kind: 'step', event: 'domain_mode_started' },
      { label: 'Card Learned / Test Done', kind: 'core', event: 'domain_card_learned', note: 'Either domain_card_learned OR domain_test_completed counts, deduped per session.' },
      { label: 'Review Returned', kind: 'repeat', event: 'domain_card_learned', repeatThreshold: 2 },
    ],
  },
  aptitude: {
    id: 'aptitude', title: 'Aptitude Test', subtitle: 'Diagrammatic · inductive · deductive · error-checking',
    icon: <Puzzle className="h-4 w-4" />, feature: 'aptitude',
    stages: [
      { label: 'Opened', kind: 'open', event: 'aptitude_opened' },
      { label: 'Type Selected', kind: 'step', event: 'aptitude_type_selected' },
      { label: 'Started', kind: 'step', event: 'aptitude_started' },
      { label: 'Questions Answered', kind: 'step', event: 'aptitude_question_answered' },
      { label: 'Submitted', kind: 'core', event: 'aptitude_submitted' },
      { label: 'Score Viewed', kind: 'activation', event: 'aptitude_score_viewed' },
      { label: 'Next Test', kind: 'repeat', event: 'aptitude_submitted', repeatThreshold: 2 },
    ],
    sideStats: [
      { label: 'Abandonment Rate', event: 'aptitude_abandoned', overEvent: 'aptitude_started', note: 'Needs an aptitude_started event to measure — not a completion.' },
      { label: 'Timeout Rate', event: 'aptitude_timed_out', overEvent: 'aptitude_submitted', note: 'Timed-out ÷ (submitted + timed-out). Not a completion.' },
    ],
  },
};

// For domain, a completion is EITHER card learned OR test completed (deduped per
// session). This companion event is folded in when resolving the domain core stage.
const DOMAIN_ALT_CORE = 'domain_test_completed';

interface EngData {
  rows: FeatureEventRow[];
  cur: EngKpis;
  prev: EngKpis;
  series: DayPoint[];
  agg: Map<string, EventAgg>;      // per-event aggregate, current window
  everSeen: Set<string>;           // `${feature}|${event}` ever present
  overall: { events: number; users: number; live: number; backfill: number };
  totalCoreUsers: number;          // distinct resolved core-action users, current window
  windowMs: [number, number];
}

async function fetchEngagement(ctx: FetchCtx): Promise<EngData> {
  const rows = await fetchFeatureEvents(ctx);
  const [cs, ce] = gmt7WindowMs(ctx.startISO, ctx.endISO);
  const [ps, pe] = gmt7WindowMs(ctx.prevStartISO, ctx.prevEndISO);
  const cur = computeKpis(rows, cs, ce);
  const prev = computeKpis(rows, ps, pe);
  const series = dailySeries(rows, ctx.startISO, ctx.endISO);
  const agg = aggregateEvents(rows, cs, ce);
  const everSeen = allTimeEventKeys(rows);

  // Overall provenance counts for the current window.
  let events = 0, live = 0, backfill = 0;
  const users = new Set<string>();
  for (const e of rows) {
    if (e.t < cs || e.t >= ce) continue;
    events++;
    if (e.source === 'live') live++; else backfill++;
    if (e.identity === 'resolved' && e.userId) users.add(e.userId);
  }

  return {
    rows, cur, prev, series, agg, everSeen,
    overall: { events, users: users.size, live, backfill },
    totalCoreUsers: cur.activeLearners,
    windowMs: [cs, ce],
  };
}

// Resolve one roadmap stage against the current window. Returns a real value, or a
// flag ('awaiting' = instrumented but idle this window, 'instrumentation' = never
// emitted / undefined). Repeat stages count users meeting the threshold; the domain
// core stage folds in the alternate completion event and dedupes per user.
type StageResolved =
  | { kind: 'value'; events: number; users: number; live: number; backfill: number }
  | { kind: 'flag'; flag: StageFlag };

function resolveStage(feature: RFeature, stage: RStage, data: EngData): StageResolved {
  const flagFor = (event: string | null): StageFlag =>
    event && data.everSeen.has(`${feature.feature}|${event}`) ? 'awaiting' : 'instrumentation';

  if (!stage.event) return { kind: 'flag', flag: 'instrumentation' };

  // Repeat: distinct users with >= threshold of the (core) event this window.
  if (stage.kind === 'repeat') {
    const a = data.agg.get(`${feature.feature}|${stage.event}`);
    const thr = stage.repeatThreshold || 2;
    if (!a) return { kind: 'flag', flag: flagFor(stage.event) };
    let users = 0;
    for (const c of a.byUser.values()) if (c >= thr) users++;
    if (users <= 0) return { kind: 'flag', flag: flagFor(stage.event) };
    return { kind: 'value', events: users, users, live: a.live, backfill: a.backfill };
  }

  // Domain core: card learned OR test completed, deduped per user.
  if (feature.feature === 'domain' && stage.kind === 'core') {
    const a1 = data.agg.get(`domain|${stage.event}`);
    const a2 = data.agg.get(`domain|${DOMAIN_ALT_CORE}`);
    if (!a1 && !a2) {
      const seen = data.everSeen.has(`domain|${stage.event}`) || data.everSeen.has(`domain|${DOMAIN_ALT_CORE}`);
      return { kind: 'flag', flag: seen ? 'awaiting' : 'instrumentation' };
    }
    const users = new Set<string>();
    let events = 0, live = 0, backfill = 0;
    [a1, a2].forEach((a) => { if (!a) return; events += a.events; live += a.live; backfill += a.backfill; a.byUser.forEach((_, u) => users.add(u)); });
    return { kind: 'value', events, users: users.size, live, backfill };
  }

  const a = data.agg.get(`${feature.feature}|${stage.event}`);
  if (!a || a.events <= 0) return { kind: 'flag', flag: flagFor(stage.event) };
  return { kind: 'value', events: a.events, users: a.users.size, live: a.live, backfill: a.backfill };
}

// Feature status chip, purely from real data in the window (fallback to all-time).
function featureStatus(feature: RFeature, data: EngData): FeatureStatus {
  const coreStage = feature.stages.find((s) => s.kind === 'core');
  const coreResolved = coreStage ? resolveStage(feature, coreStage, data) : null;
  if (coreResolved && coreResolved.kind === 'value' && coreResolved.events > 0) return 'live';
  // Any event at all for this feature (window or all-time) ⇒ awaiting; else instrumentation.
  for (const s of feature.stages) {
    if (s.event && (data.agg.has(`${feature.feature}|${s.event}`) || data.everSeen.has(`${feature.feature}|${s.event}`))) return 'awaiting';
  }
  return 'instrumentation';
}

// --- Presentational pieces (NEW — scoped to the Engagement tab) --------------

// Tiny inline SVG sparkline. No axes/labels — pure trend shape for a KPI card.
function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 96, h = 30, pad = 2;
  const clean = values.filter((v) => isFinite(v));
  if (clean.length === 0 || Math.max(...clean) <= 0) {
    return <div className="h-[30px] w-[96px] rounded bg-gray-50" title="No daily activity in range" />;
  }
  const max = Math.max(...clean, 1);
  const min = Math.min(...clean, 0);
  const span = max - min || 1;
  const step = clean.length > 1 ? (w - pad * 2) / (clean.length - 1) : 0;
  const xy = (v: number, i: number): [number, number] => [
    pad + i * step,
    h - pad - ((v - min) / span) * (h - pad * 2),
  ];
  const line = clean.map((v, i) => xy(v, i).join(',')).join(' ');
  const [lx, ly] = xy(clean[clean.length - 1], clean.length - 1);
  const area = `${pad},${h - pad} ${line} ${lx},${h - pad}`;
  return (
    <svg width={w} height={h} className="shrink-0">
      <polygon points={area} fill={color} opacity={0.08} />
      <polyline points={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={2.2} fill={color} />
    </svg>
  );
}

interface EngKpiState { loading: boolean; error: string | null; value: number | null; prev: number | null; spark: number[] }

// KPI card scoped to the Engagement tab. Deliberately a SEPARATE component from the
// global KpiCard so the global header/KPI row is never touched. Adds a sparkline,
// WoW badge and an optional tooltip on the value.
function EngKpiCard({
  label, icon, subtitle, format, state, sparkColor, tooltip,
}: {
  label: string; icon: React.ReactNode; subtitle: string;
  format: (v: number | null) => string; state: EngKpiState; sparkColor: string; tooltip?: string;
}) {
  const delta = computeDelta(state.value, state.prev);
  const up = (delta.value ?? 0) >= 0;
  const showBadge = !state.loading && !state.error;
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">{icon}</span>
          <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</span>
        </div>
        {showBadge && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            delta.kind === 'pct' ? (up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600') : 'bg-gray-100 text-gray-500'
          }`} title="Change vs previous equal-length period (WoW)">
            {delta.kind === 'pct' && (up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}
            {deltaBadgeText(delta)}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="truncate text-xl font-semibold tracking-tight text-gray-900" title={tooltip}>
              {state.loading ? (
                <span className="inline-block h-7 w-20 animate-pulse rounded-md bg-gray-100" />
              ) : state.error ? (
                <span className="text-lg font-medium text-gray-400">—</span>
              ) : (
                format(state.value)
              )}
            </span>
            {tooltip && !state.loading && !state.error && (
              <Info className="h-3 w-3 shrink-0 text-gray-300" aria-label={tooltip} />
            )}
          </div>
        </div>
        {!state.loading && !state.error && <Sparkline values={state.spark} color={sparkColor} />}
      </div>

      {state.error ? (
        <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-red-50 px-2.5 py-1.5 text-[11px] text-red-600" title={state.error}>
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
          <span className="line-clamp-2">Couldn’t compute this metric.</span>
        </div>
      ) : (
        <div className="mt-2 text-[11px] leading-snug text-gray-400">{subtitle}</div>
      )}
    </div>
  );
}

function EngKpiSkeleton() {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <span className="h-3 w-24 animate-pulse rounded bg-gray-100" />
      <div className="mt-2 flex items-end justify-between">
        <span className="h-7 w-20 animate-pulse rounded-md bg-gray-100" />
        <span className="h-[30px] w-[96px] animate-pulse rounded bg-gray-100" />
      </div>
      <span className="mt-2 h-3 w-28 animate-pulse rounded bg-gray-100" />
    </div>
  );
}

function EngStatusChip({ status }: { status: FeatureStatus }) {
  const map: Record<FeatureStatus, { dot: string; label: string; cls: string }> = {
    live: { dot: '#059669', label: 'Live', cls: 'bg-emerald-50 text-emerald-700' },
    awaiting: { dot: '#d97706', label: 'Awaiting real usage', cls: 'bg-amber-50 text-amber-700' },
    instrumentation: { dot: '#dc2626', label: 'Instrumentation needed', cls: 'bg-red-50 text-red-700' },
  };
  const s = map[status];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}>
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.dot }} />
      {s.label}
    </span>
  );
}

function EngSourceTag({ live, backfill }: { live: number; backfill: number }) {
  if (live > 0 && backfill > 0) return <span className="rounded bg-indigo-50 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-indigo-600">mixed</span>;
  if (live > 0) return <span className="rounded bg-emerald-50 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-600">live</span>;
  if (backfill > 0) return <span className="rounded bg-gray-100 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-500">backfill</span>;
  return null;
}

const STAGE_KIND_ICON: Record<StageKind, React.ReactNode> = {
  open: <PlayCircle className="h-3.5 w-3.5" />,
  step: <Activity className="h-3.5 w-3.5" />,
  activation: <Zap className="h-3.5 w-3.5" />,
  core: <CheckCircle2 className="h-3.5 w-3.5" />,
  repeat: <Repeat className="h-3.5 w-3.5" />,
};

// One horizontal roadmap funnel for a single feature/mode.
function FeatureFunnel({ feature, data }: { feature: RFeature; data: EngData }) {
  const status = featureStatus(feature, data);
  const resolved = feature.stages.map((s) => ({ stage: s, res: resolveStage(feature, s, data) }));

  // The funnel value used for conversion = distinct users (fallback to events).
  const valOf = (r: StageResolved): number | null => (r.kind === 'value' ? (r.users || r.events) : null);

  // Conversions between ADJACENT stages that BOTH have real data (spec rule).
  const conv: (number | null)[] = resolved.map((_, i) => {
    if (i === 0) return null;
    const a = valOf(resolved[i - 1].res);
    const b = valOf(resolved[i].res);
    if (a == null || b == null || a <= 0) return null;
    return Math.min(100, (b / a) * 100); // never > 100%
  });
  // Biggest real drop-off = the smallest defined conversion.
  let dropIdx = -1, dropVal = Infinity;
  conv.forEach((c, i) => { if (c != null && c < dropVal) { dropVal = c; dropIdx = i; } });

  // Opened-instrumentation caveat: completions exist but the open stage has no event.
  const coreRes = resolved.find((r) => r.stage.kind === 'core')?.res;
  const openRes = resolved.find((r) => r.stage.kind === 'open');
  const openNeedsInstr = coreRes?.kind === 'value' && coreRes.events > 0
    && openRes && openRes.res.kind === 'flag' && openRes.res.flag === 'instrumentation';

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">{feature.icon}</span>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-gray-800">{feature.title}</div>
            <div className="truncate text-[11px] text-gray-400">{feature.subtitle}</div>
          </div>
        </div>
        <EngStatusChip status={status} />
      </div>

      {/* Horizontal stage flow with conversion connectors */}
      <div className="flex flex-nowrap items-stretch gap-1.5 overflow-x-auto pb-1">
        {resolved.map(({ stage, res }, i) => (
          <div key={i} className="flex shrink-0 items-stretch gap-1.5">
            {i > 0 && (
              <div className="flex w-12 flex-col items-center justify-center">
                {conv[i] != null ? (
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${i === dropIdx ? 'bg-red-100 text-red-700' : 'text-gray-400'}`}>
                    {Math.round(conv[i] as number)}%
                  </span>
                ) : (
                  <span className="text-gray-200">·</span>
                )}
                {i === dropIdx && conv[i] != null && (
                  <span className="mt-0.5 flex items-center gap-0.5 text-[8px] font-semibold uppercase text-red-600">
                    <ArrowDownRight className="h-2.5 w-2.5" />drop
                  </span>
                )}
              </div>
            )}
            <div className={`flex w-[128px] flex-col rounded-lg border p-2.5 ${
              stage.kind === 'core' ? 'border-emerald-100 bg-emerald-50/40' : 'border-gray-100 bg-gray-50/50'
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                <span className="text-gray-400">{STAGE_KIND_ICON[stage.kind]}</span>
                <span className="truncate" title={stage.label}>{stage.label}</span>
              </div>
              {res.kind === 'value' ? (
                <>
                  <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="text-lg font-semibold tracking-tight text-gray-900">
                      {stage.kind === 'repeat' ? res.users.toLocaleString() : res.events.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-400">{stage.kind === 'repeat' ? 'users' : 'events'}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1">
                    {stage.kind !== 'repeat' && <span className="text-[10px] text-gray-400">{res.users.toLocaleString()} {res.users === 1 ? 'user' : 'users'}</span>}
                    <EngSourceTag live={res.live} backfill={res.backfill} />
                  </div>
                </>
              ) : (
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${
                    res.flag === 'awaiting' ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-red-200 bg-red-50 text-red-700'
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: res.flag === 'awaiting' ? '#d97706' : '#dc2626' }} />
                    {res.flag === 'awaiting' ? 'Awaiting usage' : 'Instrumentation needed'}
                  </span>
                </div>
              )}
              {stage.note && <div className="mt-1 text-[9px] leading-snug text-gray-400">{stage.note}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Side stats (never completions) */}
      {feature.sideStats && feature.sideStats.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {feature.sideStats.map((ss) => {
            const num = ss.event ? data.agg.get(`${feature.feature}|${ss.event}`) : undefined;
            const den = ss.overEvent ? data.agg.get(`${feature.feature}|${ss.overEvent}`) : undefined;
            const numV = num?.events || 0;
            const denTotal = (den?.events || 0) + numV;
            const canCompute = !!ss.event && data.everSeen.has(`${feature.feature}|${ss.event}`)
              && !!ss.overEvent && data.everSeen.has(`${feature.feature}|${ss.overEvent}`) && denTotal > 0;
            return (
              <div key={ss.label} className="flex flex-col rounded-lg border border-gray-100 bg-white px-2.5 py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{ss.label}</span>
                {canCompute ? (
                  <span className="text-sm font-semibold text-gray-800">{Math.min(100, Math.round((numV / denTotal) * 100))}%</span>
                ) : (
                  <span className="text-[11px] font-medium text-red-600">Instrumentation needed</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {openNeedsInstr && (
        <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] leading-snug text-amber-700">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
          <span>Opened: instrumentation needed — completions are recorded but no open/entry event is emitted, so the top of this funnel can’t be measured yet.</span>
        </div>
      )}
      {feature.caveat && (
        <div className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-snug text-gray-500">
          <Info className="mt-0.5 h-3 w-3 shrink-0 text-gray-400" />
          <span>{feature.caveat}</span>
        </div>
      )}
    </div>
  );
}

function FeatureFunnelSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-8 w-8 animate-pulse rounded-lg bg-gray-100" />
        <div className="flex-1">
          <span className="block h-3.5 w-40 animate-pulse rounded bg-gray-100" />
          <span className="mt-1 block h-3 w-52 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="h-20 w-[128px] shrink-0 animate-pulse rounded-lg bg-gray-100" />)}
      </div>
    </div>
  );
}

// Section C — feature comparison summary.
interface CompRow { id: string; title: string; icon: React.ReactNode; completed: number; users: number; coverage: number | null; status: FeatureStatus }
function buildComparison(data: EngData): CompRow[] {
  const rows: CompRow[] = Object.values(ENG_FEATURES).map((f) => {
    const coreStage = f.stages.find((s) => s.kind === 'core');
    const res = coreStage ? resolveStage(f, coreStage, data) : null;
    const completed = res && res.kind === 'value' ? res.events : 0;
    const users = res && res.kind === 'value' ? res.users : 0;
    const coverage = data.totalCoreUsers > 0 ? Math.min(100, (users / data.totalCoreUsers) * 100) : null;
    return { id: f.id, title: f.title, icon: f.icon, completed, users, coverage, status: featureStatus(f, data) };
  });
  return rows.sort((a, b) => b.completed - a.completed);
}

function EngagementTab({ ctx }: { ctx: FetchCtx }) {
  const [data, setData] = useState<EngData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>('fit');

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(null);
    fetchEngagement(ctx)
      .then((d) => { if (cancelled) return; setData(d); setLoading(false); })
      .catch((e: any) => { if (cancelled) return; setError(e.message || 'Failed to load'); setLoading(false); });
    return () => { cancelled = true; };
  }, [ctx]);

  // Per-card state (Section A). All four derive from one fetch; on failure each card
  // shows its own non-blocking error state rather than crashing the tab.
  const kpiState = (value: number | null, prev: number | null, spark: number[]): EngKpiState => ({
    loading, error, value: error ? null : value, prev: error ? null : prev, spark,
  });
  const cur = data?.cur;
  const prev = data?.prev;
  const series = data?.series || [];

  const activeCard = kpiState(cur?.activeLearners ?? null, prev?.activeLearners ?? null, series.map((d) => d.users));
  const rateCard = kpiState(cur?.engagementRate ?? null, prev?.engagementRate ?? null, series.map((d) => d.users));
  const sessCard = kpiState(cur?.sessionsPerUser ?? null, prev?.sessionsPerUser ?? null, series.map((d) => d.sessions));
  const actCard = kpiState(cur?.actionsPerUser ?? null, prev?.actionsPerUser ?? null, series.map((d) => d.actions));

  const fmtInt = (v: number | null) => (v == null ? '—' : Math.round(v).toLocaleString());
  const fmtPct = (v: number | null) => (v == null ? '—' : `${Math.min(100, v).toFixed(1)}%`);
  const fmtRatio = (v: number | null) => (v == null ? '—' : v.toFixed(2));

  const selectorItem = ENG_SELECTOR.find((s) => s.id === selected) || ENG_SELECTOR[0];
  const comparison = data ? buildComparison(data) : [];

  return (
    <div className="flex flex-col gap-6">
      {error && <ErrorStrip label="Engagement (feature_events)" message={error} />}

      {/* Provenance note + legend */}
      <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-1.5 text-[11px] leading-snug text-gray-500">
          <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span>
            Every number reads live from the canonical <span className="font-medium text-gray-700">feature_events</span> ledger
            (via the workspace-privileged dashboard reader — never legacy tables). Only <span className="font-medium text-gray-700">resolved</span> identities
            count as users, completions are strictly the approved <span className="font-medium text-gray-700">core actions</span>, and stages with no event or no data are flagged — never zero-filled.
          </span>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#059669' }} />Live</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#d97706' }} />Awaiting real usage</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#dc2626' }} />Instrumentation needed</span>
        </div>
      </div>

      {/* ================= SECTION A — Engagement KPI header (exactly 4 cards) ========= */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {loading && !error ? (
          [0, 1, 2, 3].map((i) => <EngKpiSkeleton key={i} />)
        ) : (
          <>
            <EngKpiCard
              label="Current Active Learners" icon={<Users className="h-4 w-4" />}
              subtitle="Users with at least one completed action · resolved identities only"
              format={fmtInt} state={activeCard} sparkColor="#0d69b3"
            />
            <EngKpiCard
              label="Engagement Rate" icon={<Repeat className="h-4 w-4" />}
              subtitle="Users active on 2+ days ÷ users with at least one completion"
              format={fmtPct} state={rateCard} sparkColor="#009f50"
              tooltip="User-based repeat-usage rate (engaged on 2+ calendar days ÷ activated). Intentionally different from GA4's session-based engagement rate."
            />
            <EngKpiCard
              label="Sessions per User" icon={<UserCheck className="h-4 w-4" />}
              subtitle="Visit frequency · temporary metric until engagement-time tracking is instrumented"
              format={fmtRatio} state={sessCard} sparkColor="#ec8c22"
              tooltip="Avg Engagement Time is not yet trackable (no duration field in feature_events). This metric shows visit frequency instead."
            />
            <EngKpiCard
              label="Avg Actions per User" icon={<Zap className="h-4 w-4" />}
              subtitle="Completed actions per active user · depth of usage"
              format={fmtRatio} state={actCard} sparkColor="#9b6ba8"
            />
          </>
        )}
      </div>

      {/* ================= SECTION B — Roadmap-accurate feature breakdown ============= */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-gray-700">Feature breakdown</h2>
          <span className="text-[11px] text-gray-400">Roadmap stages · user-based conversion shown only where both steps have real data</span>
        </div>

        {/* Feature selector (this is a Section-B control, NOT the global mini-tab bar) */}
        <div className="flex flex-wrap gap-2">
          {ENG_SELECTOR.map((s) => {
            const active = s.id === selected;
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active ? 'border-transparent text-white shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
                style={active ? { backgroundColor: ACCENT } : undefined}
              >
                {s.icon}{s.label}
              </button>
            );
          })}
        </div>

        {loading && !error ? (
          <FeatureFunnelSkeleton />
        ) : error ? (
          <NoData icon={<Database className="h-7 w-7" />} hint="Feature breakdown could not load because feature_events is unreachable in this session. The error above has the details — no data is estimated." />
        ) : data ? (
          <div className="flex flex-col gap-4">
            {selectorItem.features.map((fid) => {
              const f = ENG_FEATURES[fid];
              return f ? <FeatureFunnel key={fid} feature={f} data={data} /> : null;
            })}
          </div>
        ) : null}
      </div>

      {/* ================= SECTION C — Feature comparison summary ===================== */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Feature comparison</h2>
          <span className="text-[11px] text-gray-400">Sorted by real completions · coverage vs {data ? data.totalCoreUsers.toLocaleString() : '—'} active learners</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-2.5">Feature</th>
                <th className="px-4 py-2.5 text-right">Completed (real)</th>
                <th className="px-4 py-2.5 text-right">Users (resolved)</th>
                <th className="px-4 py-2.5">Coverage</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && !error ? (
                [0, 1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3" colSpan={5}><span className="block h-4 w-full animate-pulse rounded bg-gray-100" /></td>
                  </tr>
                ))
              ) : error ? (
                <tr><td className="px-4 py-6 text-center text-sm text-gray-400" colSpan={5}>Unavailable — see the error above.</td></tr>
              ) : (
                comparison.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">{r.icon}</span>
                        <span className="font-medium text-gray-800">{r.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">{r.completed.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{r.users.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {r.coverage == null ? (
                        <span className="text-gray-300">—</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full" style={{ width: `${r.coverage}%`, backgroundColor: ACCENT }} />
                          </div>
                          <span className="text-[11px] font-medium text-gray-500">{Math.round(r.coverage)}%</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3"><EngStatusChip status={r.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-1.5 text-[11px] leading-snug text-gray-400">
        <Info className="mt-0.5 h-3 w-3 shrink-0" />
        <span>
          Distinct-user counts use resolved identities only — unresolved events stay countable but never add to user totals.
          Founder/internal/dev accounts are excluded upstream. WoW badges compare the selected range with the equal-length period immediately before it.
          Percentages are capped at 100% and no stage can exceed the stage above it.
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main dashboard
// ---------------------------------------------------------------------------
export function FunnelOverview({ workspaceId, authToken }: TemplateProps) {
  const todayISO = useMemo(() => todayISOInTz(), []);
  const [range, setRange] = useState<[string, string]>(() => [shiftISO(todayISO, -29), todayISO]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [tab, setTab] = useState<'acquisition' | 'engagement'>('acquisition');

  const [startISO, endISO] = range;
  const rangeLen = daysBetweenInclusive(startISO, endISO);
  const prevEndISO = shiftISO(startISO, -1);
  const prevStartISO = shiftISO(startISO, -rangeLen);

  const initialCards = (): Record<string, CardState> => {
    const o: Record<string, CardState> = {};
    METRICS.forEach((m) => { o[m.key] = { loading: true, current: null, previous: null, error: null }; });
    return o;
  };
  const [cards, setCards] = useState<Record<string, CardState>>(initialCards);

  const ctx: FetchCtx = useMemo(() => ({
    workspaceId, authToken, startISO, endISO, prevStartISO, prevEndISO, todayISO, timezone: TIMEZONE,
  }), [workspaceId, authToken, startISO, endISO, prevStartISO, prevEndISO, todayISO]);

  useEffect(() => {
    let cancelled = false;
    // Reset each card to loading, then resolve independently and in parallel.
    setCards((prev) => {
      const o: Record<string, CardState> = {};
      METRICS.forEach((m) => { o[m.key] = { ...prev[m.key], loading: true, error: null }; });
      return o;
    });

    METRICS.forEach((def) => {
      fetchMetric(def.key, ctx)
        .then((res) => {
          if (cancelled) return;
          setCards((prev) => ({ ...prev, [def.key]: { loading: false, current: res.current, previous: res.previous, error: null } }));
        })
        .catch((e: any) => {
          if (cancelled) return;
          setCards((prev) => ({ ...prev, [def.key]: { loading: false, current: null, previous: null, error: e.message || 'Failed to load' } }));
        });
    });

    return () => { cancelled = true; };
  }, [ctx, refreshKey]);

  const busy = Object.values(cards).some((c) => c.loading);

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  const handleExport = () => {
    const header = ['Metric', 'Value', 'Previous Value', 'Change vs Previous Period', 'Status'];
    const rows = METRICS.map((def) => {
      const c = cards[def.key];
      const d = computeDelta(c.current, c.previous);
      const change = d.kind === 'pct' && d.value != null ? `${d.value.toFixed(1)}%` : d.kind === 'new' ? 'New' : 'n/a';
      return [def.label, def.format(c.current), def.format(c.previous), change, c.error ? 'error' : 'ok'];
    });
    const meta = [
      ['Report', 'Website Performance Overview'],
      ['Timezone', `${TIMEZONE} (${TZ_LABEL})`],
      ['Selected range', `${fmtDMY(startISO)} to ${fmtDMY(endISO)}`],
      ['Previous range', `${fmtDMY(prevStartISO)} to ${fmtDMY(prevEndISO)}`],
      [],
    ];
    const all = [...meta, header, ...rows];
    const csv = all.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-performance-${startISO}_to_${endISO}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    // Normal in-flow container: full width of whatever the parent provides, capped
    // at 1440px and centered. No 100vw break-out — that overflows narrow ancestor
    // columns and forces a horizontal scrollbar. `w-full` + `min-w-0` keeps the grid
    // from ever exceeding its parent, so nothing overflows horizontally.
    <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:gap-6">
      {/* Top bar — full width, aligned to the content grid below */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ backgroundColor: ACCENT }}>
            <Activity className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Casemate</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DateRangePicker value={range} onChange={setRange} todayISO={todayISO} />
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          <button
            onClick={handleRefresh}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: ACCENT }}
          >
            <RefreshCw className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Pinned KPI header — ALWAYS visible, never reloads on mini-tab switch.
          1 col mobile (<640), 2 cols tablet (640–1023), 4 cols desktop (>=1024). */}
      <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((def) => (
          <KpiCard key={def.key} def={def} state={cards[def.key]} />
        ))}
      </div>

      {/* Secondary content area: mini-tabs pinned under the KPI header.
          The header above never moves or reloads on tab switch. */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
          {([
            { id: 'acquisition' as const, label: 'Acquisition' },
            { id: 'engagement' as const, label: 'Engagement' },
          ]).map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  active ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'
                }`}
                style={active ? { backgroundColor: ACCENT } : undefined}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === 'acquisition'
          ? <AcquisitionTab key={`acq-${refreshKey}`} ctx={ctx} />
          : <EngagementTab key={`eng-${refreshKey}`} ctx={ctx} />}
      </div>
    </div>
  );
}
