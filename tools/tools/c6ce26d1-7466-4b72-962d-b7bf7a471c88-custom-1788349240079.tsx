import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Users, UserCheck, Activity, Percent, AlertTriangle, Clock,
  ArrowUpRight, ArrowDownRight, Download, RefreshCw, Calendar,
  ChevronLeft, ChevronRight, ChevronDown,
  UserPlus, Repeat, Globe, Smartphone, BarChart3, Info,
  Target, Layers, BookOpen, GraduationCap, Zap,
  TrendingUp, TrendingDown, MousePointerClick, CircleSlash, Gauge, Compass,
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
} from 'recharts';

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
// The one exception is the feature-completion breakdown (Case Pool / Case Drill),
// whose per-action completions are only stored in workspace DB tables. Those are
// read with the workspace token when available (/db/sql), and gracefully fall
// back to the REST /data endpoint (device-token auth, like the DB Explorer) so
// the completions still populate; if neither is authorized they degrade to "—".
// ---------------------------------------------------------------------------
// Keyless CRM calls: no auth header at all (matches how the endpoints succeed).
function crmHeaders(): Record<string, string> {
  return { 'Content-Type': 'application/json' };
}
// Workspace-DB calls DO need auth (mirrors the DB Explorer default dashboard):
// a Bearer token when the host injects one, else the device token, else nothing
// (in which case the call 401s and the caller degrades gracefully to "—").
function dbHeaders(authToken?: string): Record<string, string> {
  const dt = typeof localStorage !== 'undefined' ? localStorage.getItem('workspace_device_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: 'Bearer ' + authToken } : dt ? { 'x-device-token': dt } : {}),
  };
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
  startISO: string; endISO: string;
  prevStartISO: string; prevEndISO: string;
  todayISO: string;
  timezone: string;
  authToken?: string;
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
// ENGAGEMENT TAB — top-down METRIC TREE
// ---------------------------------------------------------------------------
// Reads like ECOM reasoning: one North Star (WAU) that decomposes into a few
// standard drivers (Acquisition → Activation → Retention), then engagement
// quality, then an optional per-feature drill-down. The reader should see the
// North Star, the 3 drivers, and know WHICH driver moved it in ~10 seconds.
//
// SINGLE SOURCE OF TRUTH: the keyless CRM event stream (/api/crm/events). The
// workspace SQL/data endpoints return 401 to the dashboard runtime, so any
// metric that would need those server tables is shown as "—" (not enough data),
// never estimated.
//
// CORE ACTION (used by EVERY metric) = a user COMPLETING a value activity, not
// starting/opening one. In this workspace only Fit Assessment completion is
// emitted to the event stream (reaching My Roadmap = function_programs_filtered,
// or selecting a program = fit_assessment_completed). Case Pool / Case Drill /
// Domain Knowledge / Aptitude completions are written server-side and are NOT in
// the event stream, so they are honestly excluded from the North Star and shown
// as "—" in the feature breakdown. This keeps one definition of "active"
// everywhere (validation rule 5) and never counts an open/start as a completion.
// ===========================================================================

const MIN_COHORT = 8;                  // below this a retention cohort = "not enough data yet"
const ENGAGED_SESSION_MIN_SECS = 10;   // GA4-style engaged-session threshold
const CORE_ACTION_EVENTS = ['function_programs_filtered', 'fit_assessment_completed'];

// The five product features. `completion` lists the events that mean COMPLETED;
// null = completion is not measurable from the live event stream. `source` says
// WHERE a genuine completion count comes from:
//   'event'   — counted from the live CRM event stream over the selected range.
//   'db'      — read from a workspace DB table (rows with status='completed').
//   'pending' — no per-user completion is recorded ANYWHERE yet; render "—" with
//               a "tracking pending" note and never estimate (validation rule).
const ENG_FEATURES = [
  { key: 'fit-assessment', label: 'Fit Assessment', icon: <Target className="h-4 w-4" />, color: '#0d69b3', completion: ['function_programs_filtered', 'fit_assessment_completed'] as string[] | null, source: 'event' as 'event' | 'db' | 'pending' },
  { key: 'case-pool', label: 'Case Pool', icon: <Layers className="h-4 w-4" />, color: '#009f50', completion: null, source: 'db' as 'event' | 'db' | 'pending' },
  { key: 'case-drill', label: 'Case Drill', icon: <Zap className="h-4 w-4" />, color: '#ec8c22', completion: null, source: 'db' as 'event' | 'db' | 'pending' },
  { key: 'industry-knowledge', label: 'Domain Knowledge', icon: <BookOpen className="h-4 w-4" />, color: '#9b6ba8', completion: null, source: 'pending' as 'event' | 'db' | 'pending' },
  { key: 'aptitude-test', label: 'Aptitude Test', icon: <GraduationCap className="h-4 w-4" />, color: '#e11d48', completion: null, source: 'pending' as 'event' | 'db' | 'pending' },
] as const;
type EngFeatureKey = typeof ENG_FEATURES[number]['key'];

// --- helpers ----------------------------------------------------------------
const clampPct = (v: number | null): number | null => (v == null ? null : Math.max(0, Math.min(100, v)));
const fmtInt = (n: number | null): string => (n == null ? '—' : Math.round(n).toLocaleString());
const fmtPct = (n: number | null, d = 0): string => (n == null ? '—' : `${n.toFixed(d)}%`);
const fmtNum = (n: number | null, d = 1): string => (n == null ? '—' : n.toFixed(d));

function engDayOf(ms: number): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ms));
}
function isoNoonMs(iso: string): number { return new Date(iso + 'T12:00:00+07:00').getTime(); }

function engFeatureOf(eventType: string, appId: string | null, url: string | null): EngFeatureKey | null {
  const et = (eventType || '').toLowerCase();
  if (et.startsWith('fit_assessment') || et.startsWith('function_')) return 'fit-assessment';
  const raw = (appId || (url && url.includes('#') ? url.split('#')[1] : '') || '').toLowerCase();
  if (!raw) return null;
  if (raw.includes('aptitude')) return 'aptitude-test';
  if (raw.includes('drill')) return 'case-drill';
  if (raw.includes('industry') || raw.includes('domain') || raw.includes('knowledge')) return 'industry-knowledge';
  if (raw.includes('fit')) return 'fit-assessment';
  if (raw.includes('case') || raw.includes('practice') || raw.includes('pool')) return 'case-pool';
  return null;
}

// --- event model + fetch ----------------------------------------------------
interface EngEvent { type: string; user: string; session: string; url: string | null; feature: EngFeatureKey | null; core: boolean; t: number; day: string }

async function fetchEngEvents(ctx: FetchCtx): Promise<EngEvent[]> {
  // One pull of full history → accurate first-seen (new vs returning) and every
  // window / cohort we compare, all client-side.
  const j = await withRetry(() =>
    fetch(`/api/crm/events?workspaceId=${ctx.workspaceId}&days=1000&limit=100000`, { headers: crmHeaders() })
      .then((r) => parseOrThrow(r, 'Engagement events')));
  const out: EngEvent[] = [];
  for (const e of (j.data || [])) {
    const t = new Date(e.createdAt).getTime();
    if (!isFinite(t)) continue;
    const ed = e.eventData || {};
    const appId = ed.appId || ed.app || null;
    const url = ed.url || null;
    out.push({
      type: e.eventType,
      user: e.visitorId || e.sessionId || e.id || 'unknown',
      session: e.sessionId || e.visitorId || e.id || 'unknown',
      url,
      feature: engFeatureOf(e.eventType, appId, url),
      core: CORE_ACTION_EVENTS.includes(e.eventType),
      t, day: engDayOf(t),
    });
  }
  return out;
}

// --- feature completions from the workspace DB ------------------------------
// Case Pool / Case Drill completions are written to DB tables, NOT to the event
// stream, so we read them directly. Each finished action is one row with
// status='completed' (naturally deduped — a refresh does not add a row), so
// `completed` counts actions once per action. `users` = distinct session_id,
// `total` = all rows (attempts). Figures are cumulative (all-time), because
// completions carry no place in the dated event stream. Domain Knowledge /
// Aptitude have no per-user completion table, so they are intentionally absent.
interface FeatureDbStat { users: number; completed: number; total: number }

// Which workspace table + feature key each DB-sourced feature reads from.
// case_practice_cases → Case Pool; micro_drills → Case Drill (covers both the
// Question Library and Practice reps, per the completion spec).
const DB_FEATURE_TABLES: { key: EngFeatureKey; table: string }[] = [
  { key: 'case-pool', table: 'case_practice_cases' },
  { key: 'case-drill', table: 'micro_drills' },
];

// Read Case Pool / Case Drill completions straight from the workspace DB.
// Preferred path is one /db/sql query (distinct users + completed + attempts in a
// single round-trip). That endpoint needs stricter owner/API-key auth, though,
// which the dashboard host doesn't always grant — so we fall back to the REST
// /data endpoint (the same one the DB Explorer uses successfully with the device
// token) and dedupe client-side. Either way: `completed` = rows with
// status='completed' (one per finished action, so a refresh never double-counts),
// `users` = distinct session_id with ANY row (this is what makes Case Pool's
// "Users opened" non-zero — there is no casepool-open event yet), `total` = all
// rows (attempts). All figures are cumulative / all-time.
async function fetchViaSql(ctx: FetchCtx): Promise<Partial<Record<EngFeatureKey, FeatureDbStat>>> {
  const query = `
    SELECT 'case-pool' AS feature,
      count(DISTINCT session_id) AS users,
      count(*) FILTER (WHERE status = 'completed') AS completed,
      count(*) AS total
    FROM case_practice_cases
    UNION ALL
    SELECT 'case-drill',
      count(DISTINCT session_id),
      count(*) FILTER (WHERE status = 'completed'),
      count(*)
    FROM micro_drills`;
  const r = await fetch(`/api/workspaces/${ctx.workspaceId}/db/sql`, {
    method: 'POST',
    credentials: 'include',
    headers: dbHeaders(ctx.authToken),
    body: JSON.stringify({ query, limit: 10 }),
  });
  const j = await parseOrThrow(r, 'Feature completions (SQL)');
  const out: Partial<Record<EngFeatureKey, FeatureDbStat>> = {};
  for (const row of (j.rows || [])) {
    const key = String(row.feature) as EngFeatureKey;
    out[key] = {
      users: Number(row.users) || 0,
      completed: Number(row.completed) || 0,
      total: Number(row.total) || 0,
    };
  }
  if (!out['case-pool'] && !out['case-drill']) throw new Error('No rows from SQL endpoint');
  return out;
}

// Fallback: page the REST /data endpoint for both tables and compute the same
// three figures client-side (dedupe by session_id for users, count
// status='completed' rows for completed). Tables are small (≈130 rows each).
async function fetchViaRest(ctx: FetchCtx): Promise<Partial<Record<EngFeatureKey, FeatureDbStat>>> {
  const out: Partial<Record<EngFeatureKey, FeatureDbStat>> = {};
  for (const { key, table } of DB_FEATURE_TABLES) {
    const users = new Set<string>();
    let completed = 0, total = 0;
    let offset = 0;
    const pageSize = 1000;
    for (let guard = 0; guard < 50; guard++) {
      const r = await fetch(
        `/api/workspaces/${ctx.workspaceId}/data/${table}?_limit=${pageSize}&_offset=${offset}`,
        { credentials: 'include', headers: dbHeaders(ctx.authToken) },
      );
      const j = await parseOrThrow(r, `Feature completions (${table})`);
      const rows: any[] = j.data || [];
      for (const row of rows) {
        total++;
        if (row.session_id) users.add(String(row.session_id));
        if (String(row.status) === 'completed') completed++;
      }
      if (rows.length < pageSize) break; // last page
      offset += pageSize;
    }
    out[key] = { users: users.size, completed, total };
  }
  return out;
}

async function fetchFeatureDbStats(ctx: FetchCtx): Promise<Partial<Record<EngFeatureKey, FeatureDbStat>>> {
  try {
    return await fetchViaSql(ctx);
  } catch {
    // SQL endpoint unavailable (auth) → derive the same numbers from REST /data.
    return await fetchViaRest(ctx);
  }
}

// --- index (built once per pull) --------------------------------------------
interface EngIndex {
  events: EngEvent[];
  coreEvents: EngEvent[];
  firstSeen: Map<string, number>;      // first-ever event (acquisition) per user
  firstCoreDay: Map<string, string>;   // first GMT+7 day with a core action
  coreDaySet: Map<string, Set<string>>;// all GMT+7 days with a core action
}
function buildIndex(events: EngEvent[]): EngIndex {
  const firstSeen = new Map<string, number>();
  const firstCoreDay = new Map<string, string>();
  const coreDaySet = new Map<string, Set<string>>();
  const coreEvents: EngEvent[] = [];
  for (const e of events) {
    const fs = firstSeen.get(e.user);
    if (fs == null || e.t < fs) firstSeen.set(e.user, e.t);
    if (e.core) {
      coreEvents.push(e);
      let s = coreDaySet.get(e.user); if (!s) { s = new Set(); coreDaySet.set(e.user, s); } s.add(e.day);
      const fcd = firstCoreDay.get(e.user);
      if (fcd == null || e.day < fcd) firstCoreDay.set(e.user, e.day);
    }
  }
  return { events, coreEvents, firstSeen, firstCoreDay, coreDaySet };
}

// --- windowed primitives ----------------------------------------------------
function winMs(sIso: string, eIso: string): [number, number] { return gmt7WindowMs(sIso, eIso); }

function activeUsers(idx: EngIndex, sMs: number, eMsExcl: number): Set<string> {
  const s = new Set<string>();
  for (const e of idx.coreEvents) if (e.t >= sMs && e.t < eMsExcl) s.add(e.user);
  return s;
}

// Activation = new users (first seen in window) who also completed a core action
// in the SAME window ÷ new users in window.
function activationInWindow(idx: EngIndex, sIso: string, eIso: string): { rate: number | null; newU: number; activated: number } {
  const [sMs, eMs] = winMs(sIso, eIso);
  let newU = 0, activated = 0;
  for (const [user, fs] of idx.firstSeen) {
    if (fs < sMs || fs >= eMs) continue;
    newU++;
    const fcd = idx.firstCoreDay.get(user);
    if (fcd) { const c = isoNoonMs(fcd); if (c >= sMs && c < eMs) activated++; }
  }
  return { rate: newU > 0 ? clampPct((activated / newU) * 100) : null, newU, activated };
}

// Day-N retention: of users whose first core-action day falls in the range and
// has matured N days within it, the share active again exactly on day+N. Small
// cohorts return null so we never render a misleading rate.
function retentionDN(idx: EngIndex, startISO: string, endISO: string, N: number): { rate: number | null; cohort: number; retained: number } {
  const lastEligible = shiftISO(endISO, -N);
  let cohort = 0, retained = 0;
  for (const [user, fcd] of idx.firstCoreDay) {
    if (fcd < startISO || fcd > lastEligible) continue;
    cohort++;
    if (idx.coreDaySet.get(user)?.has(shiftISO(fcd, N))) retained++;
  }
  if (cohort < MIN_COHORT) return { rate: null, cohort, retained };
  return { rate: clampPct((retained / cohort) * 100), cohort, retained };
}

// Split active users of a window into new (first core day in the week) vs returning.
function splitActive(idx: EngIndex, sMs: number, eMsExcl: number, weekStartISO: string): { total: number; newA: number; retA: number } {
  const act = activeUsers(idx, sMs, eMsExcl);
  let newA = 0, retA = 0;
  for (const u of act) { const f = idx.firstCoreDay.get(u); if (f && f >= weekStartISO) newA++; else retA++; }
  return { total: act.size, newA, retA };
}

// Engagement quality over the ACTIVE-USER population (one consistent denominator).
interface Quality { engagementRate: number | null; avgEngTime: number | null; sessionsPerUser: number | null; actionsPerUser: number | null; activeUsers: number }
function qualityInWindow(idx: EngIndex, sMs: number, eMsExcl: number): Quality {
  const active = activeUsers(idx, sMs, eMsExcl);
  if (active.size === 0) return { engagementRate: null, avgEngTime: null, sessionsPerUser: null, actionsPerUser: null, activeUsers: 0 };
  const bySession = new Map<string, number[]>();
  let coreActions = 0;
  for (const e of idx.events) {
    if (e.t < sMs || e.t >= eMsExcl || !active.has(e.user)) continue;
    let a = bySession.get(e.session); if (!a) { a = []; bySession.set(e.session, a); } a.push(e.t);
    if (e.core) coreActions++;
  }
  let engagedSecs = 0, engagedSessions = 0;
  const totalSessions = bySession.size;
  for (const times of bySession.values()) {
    times.sort((a, b) => a - b);
    let secs = 0;
    for (let i = 1; i < times.length; i++) { const gap = (times[i] - times[i - 1]) / 1000; if (gap > 0) secs += Math.min(gap, IDLE_THRESHOLD_SECONDS); }
    engagedSecs += secs;
    if (secs >= ENGAGED_SESSION_MIN_SECS || times.length >= 2) engagedSessions++;
  }
  return {
    engagementRate: totalSessions > 0 ? clampPct((engagedSessions / totalSessions) * 100) : null,
    avgEngTime: engagedSecs / active.size,
    sessionsPerUser: totalSessions / active.size,
    actionsPerUser: coreActions / active.size,
    activeUsers: active.size,
  };
}

// Weekly buckets across the selected range (per-week, not cumulative).
interface EngWeek { label: string; startISO: string; wau: number; newActive: number; returningActive: number; activation: number | null; stickiness: number | null }
function engWeekly(idx: EngIndex, startISO: string, endISO: string): EngWeek[] {
  const out: EngWeek[] = [];
  let ws = startISO, guard = 0;
  while (ws <= endISO && guard++ < 60) {
    let we = shiftISO(ws, 6); if (we > endISO) we = endISO;
    const [sMs, eMs] = winMs(ws, we);
    const sp = splitActive(idx, sMs, eMs, ws);
    const actv = activationInWindow(idx, ws, we);
    const dau = activeUsers(idx, ...winMs(we, we)).size;
    const mau = activeUsers(idx, ...winMs(shiftISO(we, -29), we)).size;
    const p = parts(ws);
    out.push({
      label: `${p.d} ${MONTHS[p.m]}`, startISO: ws,
      wau: sp.total, newActive: sp.newA, returningActive: sp.retA,
      activation: actv.rate,
      stickiness: mau > 0 ? clampPct((dau / mau) * 100) : null,
    });
    ws = shiftISO(we, 1);
  }
  return out;
}

// Per-feature breakdown for a window (Layer 4).
interface FeatureRow { key: EngFeatureKey; label: string; icon: React.ReactNode; color: string; source: 'event' | 'db' | 'pending'; users: number; completed: number | null; completionPct: number | null; returnPct: number | null; issue: boolean; dbSourced?: boolean }
function featureBreakdown(idx: EngIndex, sMs: number, eMsExcl: number): FeatureRow[] {
  return ENG_FEATURES.map((f) => {
    const users = new Set<string>();
    const daysByUser = new Map<string, Set<string>>();
    const completers = new Set<string>();
    for (const e of idx.events) {
      if (e.t < sMs || e.t >= eMsExcl || e.feature !== f.key) continue;
      users.add(e.user);
      let d = daysByUser.get(e.user); if (!d) { d = new Set(); daysByUser.set(e.user, d); } d.add(e.day);
      if (f.completion && f.completion.includes(e.type)) completers.add(e.user);
    }
    const u = users.size;
    const comp = f.completion ? completers.size : null;
    let completionPct: number | null = null; let issue = false;
    if (comp != null) { if (comp > u) { issue = true; } else completionPct = u > 0 ? clampPct((comp / u) * 100) : null; }
    const ret = [...daysByUser.values()].filter((s) => s.size >= 2).length;
    return { key: f.key, label: f.label, icon: f.icon, color: f.color, source: f.source, users: u, completed: comp, completionPct, returnPct: u > 0 ? clampPct((ret / u) * 100) : null, issue };
  });
}

// ---------------------------------------------------------------------------
// Presentational pieces
// ---------------------------------------------------------------------------
function Sparkline({ data, color }: { data: (number | null)[]; color: string }) {
  if (!data.some((v) => v != null)) return <div style={{ height: 34 }} />;
  const pts = data.map((v, i) => ({ i, v }));
  const id = 'sp' + color.replace('#', '');
  return (
    <ResponsiveContainer width="100%" height={34}>
      <AreaChart data={pts} margin={{ top: 3, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#${id})`} dot={false} isAnimationActive={false} connectNulls />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function NorthStarTile({ label, icon, color, value, delta, sub, spark, note, loading }: {
  label: string; icon: React.ReactNode; color: string; value: string; delta: Delta; sub?: string; spark: (number | null)[]; note?: string; loading: boolean;
}) {
  const up = (delta.value ?? 0) >= 0;
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}14`, color }}>{icon}</span>
          <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</span>
        </div>
        {!loading && delta.kind !== 'na' && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${delta.kind === 'pct' ? (up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600') : 'bg-gray-100 text-gray-500'}`}>
            {delta.kind === 'pct' && (up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}
            {deltaBadgeText(delta)}
          </span>
        )}
      </div>
      <div className="mt-2 truncate text-2xl font-semibold tracking-tight text-gray-900">
        {loading ? <span className="inline-block h-7 w-20 animate-pulse rounded-md bg-gray-100" /> : value}
      </div>
      {sub && <div className="mt-0.5 truncate text-[11px] text-gray-500">{loading ? '' : sub}</div>}
      <div className="mt-2 -mb-1">{loading ? <div className="h-[34px] animate-pulse rounded bg-gray-50" /> : <Sparkline data={spark} color={color} />}</div>
      {note && !loading && <div className="mt-1.5 flex items-start gap-1 text-[10px] leading-snug text-gray-400"><Info className="mt-px h-3 w-3 shrink-0" />{note}</div>}
    </div>
  );
}

function DriverPanel({ title, subtitle, icon, color, current, delta, unit, data, dataKey, loading, help }: {
  title: string; subtitle: string; icon: React.ReactNode; color: string; current: string; delta: Delta; unit: '%' | '';
  data: EngWeek[]; dataKey: keyof EngWeek; loading: boolean; help: string;
}) {
  const up = (delta.value ?? 0) >= 0;
  return (
    <Panel title={title} subtitle={subtitle} icon={icon}>
      <div className="mb-2 flex items-end justify-between gap-2">
        <span className="text-2xl font-semibold tracking-tight text-gray-900">{loading ? <span className="inline-block h-7 w-16 animate-pulse rounded bg-gray-100" /> : current}</span>
        {!loading && delta.kind !== 'na' && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${delta.kind === 'pct' ? (up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600') : 'bg-gray-100 text-gray-500'}`}>
            {delta.kind === 'pct' && (up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}
            {deltaBadgeText(delta)}
          </span>
        )}
      </div>
      {loading ? <div className="h-40 animate-pulse rounded-lg bg-gray-100" /> : data.length === 0 ? (
        <NoData icon={<TrendingUp className="h-6 w-6" />} hint="Range too short to build weekly buckets." />
      ) : (
        <ResponsiveContainer width="100%" height={168}>
          <LineChart data={data} margin={{ top: 6, right: 10, bottom: 2, left: -14 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={36} unit={unit} allowDecimals={false} />
            <Tooltip formatter={(v: any) => [unit === '%' ? `${Number(v).toFixed(1)}%` : Math.round(v), title]} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} labelStyle={{ color: '#64748b' }} />
            <Line type="monotone" dataKey={dataKey as string} stroke={color} strokeWidth={2} dot={{ r: 2.5 }} activeDot={{ r: 4 }} connectNulls isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
      <p className="mt-2 text-[11px] leading-snug text-gray-400">{help}</p>
    </Panel>
  );
}

function RetentionBar({ label, rate, cohort, color }: { label: string; rate: number | null; cohort: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-semibold text-gray-900">{rate == null ? '—' : `${rate.toFixed(0)}%`}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full" style={{ width: `${rate == null ? 0 : Math.max(2, rate)}%`, backgroundColor: color }} />
      </div>
      <div className="mt-0.5 text-[10px] text-gray-400">{rate == null ? (cohort > 0 ? `cohort ${cohort} · not enough data yet` : 'not enough data yet') : `${cohort} in cohort`}</div>
    </div>
  );
}

function QualityTile({ label, icon, value, delta, hint, loading }: { label: string; icon: React.ReactNode; value: string; delta: Delta; hint: string; loading: boolean }) {
  const up = (delta.value ?? 0) >= 0;
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        <span className="text-gray-400">{icon}</span><span className="truncate">{label}</span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        {loading ? <span className="inline-block h-6 w-16 animate-pulse rounded bg-gray-100" /> : <span className="truncate text-xl font-semibold tracking-tight text-gray-900">{value}</span>}
        {!loading && delta.kind !== 'na' && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${delta.kind === 'pct' ? (up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600') : 'bg-gray-100 text-gray-500'}`}>
            {delta.kind === 'pct' && (up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}
            {deltaBadgeText(delta)}
          </span>
        )}
      </div>
      {!loading && <div className="mt-1 text-[11px] leading-snug text-gray-400">{hint}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Engagement tab
// ---------------------------------------------------------------------------
function EngagementTab({ ctx }: { ctx: FetchCtx }) {
  const [events, setEvents] = useState<EngEvent[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [dbStats, setDbStats] = useState<Partial<Record<EngFeatureKey, FeatureDbStat>>>({});
  const [dbErr, setDbErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setErr(null);
    fetchEngEvents(ctx)
      .then((ev) => { if (cancelled) return; setEvents(ev); setLoading(false); })
      .catch((e: any) => { if (cancelled) return; setErr(e.message || 'Failed to load'); setLoading(false); });
    // Case Pool / Case Drill completions live in the workspace DB, not the event
    // stream. Fetched separately and non-fatally — if auth is missing the rows
    // degrade to "—" rather than breaking the tab.
    setDbErr(null);
    fetchFeatureDbStats(ctx)
      .then((s) => { if (!cancelled) setDbStats(s); })
      .catch((e: any) => { if (!cancelled) { setDbStats({}); setDbErr(e.message || 'DB unavailable'); } });
    return () => { cancelled = true; };
  }, [ctx]);

  const idx = useMemo(() => (events ? buildIndex(events) : null), [events]);
  const weeks = useMemo(() => (idx ? engWeekly(idx, ctx.startISO, ctx.endISO) : []), [idx, ctx.startISO, ctx.endISO]);

  // Rolling windows anchored to the end of the selected range (all nested,
  // guaranteeing DAU ⊆ WAU ⊆ MAU — validation rule 1 subset integrity).
  const m = useMemo(() => {
    if (!idx) return null;
    const end = ctx.endISO;
    const day = activeUsers(idx, ...winMs(end, end)).size;
    const wau = activeUsers(idx, ...winMs(shiftISO(end, -6), end)).size;
    const wauPrev = activeUsers(idx, ...winMs(shiftISO(end, -13), shiftISO(end, -7))).size;
    const mau = activeUsers(idx, ...winMs(shiftISO(end, -29), end)).size;
    const dayPrev = activeUsers(idx, ...winMs(shiftISO(end, -7), shiftISO(end, -7))).size;
    const mauPrev = activeUsers(idx, ...winMs(shiftISO(end, -36), shiftISO(end, -7))).size;
    const stick = mau > 0 && day <= mau ? clampPct((day / mau) * 100) : null;
    const stickPrev = mauPrev > 0 && dayPrev <= mauPrev ? clampPct((dayPrev / mauPrev) * 100) : null;
    const actCur = activationInWindow(idx, shiftISO(end, -6), end);
    const actPrev = activationInWindow(idx, shiftISO(end, -13), shiftISO(end, -7));
    const d1 = retentionDN(idx, ctx.startISO, end, 1);
    const d7 = retentionDN(idx, ctx.startISO, end, 7);
    const d30 = retentionDN(idx, ctx.startISO, end, 30);
    const d7Prev = retentionDN(idx, ctx.prevStartISO, ctx.prevEndISO, 7);
    const qCur = qualityInWindow(idx, ...winMs(shiftISO(end, -6), end));
    const qPrev = qualityInWindow(idx, ...winMs(shiftISO(end, -13), shiftISO(end, -7)));
    const curSplit = splitActive(idx, ...winMs(shiftISO(end, -6), end), shiftISO(end, -6));
    const prevSplit = splitActive(idx, ...winMs(shiftISO(end, -13), shiftISO(end, -7)), shiftISO(end, -13));
    return { day, wau, wauPrev, mau, stick, stickPrev, actCur, actPrev, d1, d7, d30, d7Prev, qCur, qPrev, curSplit, prevSplit };
  }, [idx, ctx.endISO, ctx.startISO, ctx.prevStartISO, ctx.prevEndISO]);

  const featureRows = useMemo(() => {
    if (!idx) return [] as FeatureRow[];
    const base = featureBreakdown(idx, ...winMs(ctx.startISO, ctx.endISO));
    return base.map((r) => {
      const s = dbStats[r.key];
      if (!s) return r;
      // DB-sourced feature (Case Pool / Case Drill): Completed = finished
      // submissions (rows with status='completed', one per action), Completion %
      // = completed ÷ attempts. Users (opened) = distinct sessions with ANY row
      // in the table — this is what fixes Case Pool's "0 opened" (no open event
      // fires, so usage is derived from the table). Cumulative / all-time.
      // Validation: completed can never exceed attempts, so % is always 0–100.
      const completed = Math.min(s.completed, s.total);
      const completionPct = s.total > 0 ? clampPct((completed / s.total) * 100) : null;
      return { ...r, users: s.users, completed, completionPct, issue: false, dbSourced: true };
    });
  }, [idx, ctx.startISO, ctx.endISO, dbStats]);

  // Auto-insight: decompose the WoW move of WAU into Acquisition vs Retention.
  const insight = useMemo(() => {
    if (!m || m.wauPrev == null) return null;
    const cur = m.curSplit, prev = m.prevSplit;
    const dTotal = cur.total - prev.total;
    const dNew = cur.newA - prev.newA;
    const dRet = cur.retA - prev.retA;
    if (prev.total === 0 && cur.total === 0) return null;
    if (dTotal === 0) return { tone: 'flat' as const, text: 'WAU is flat week over week — new and returning active users held steady.' };
    const dir = dTotal > 0 ? 'up' : 'down';
    const driverIsAcq = Math.abs(dNew) >= Math.abs(dRet);
    const pct = prev.total > 0 ? Math.round((Math.abs(dTotal) / prev.total) * 100) : null;
    const driver = driverIsAcq
      ? `Acquisition (new active users ${prev.newA}→${cur.newA})`
      : `Retention (returning active users ${prev.retA}→${cur.retA})`;
    return { tone: dir as 'up' | 'down', text: `WAU ${dir} ${pct != null ? pct + '%' : ''} week over week, driven mainly by ${driver}.` };
  }, [m]);

  // Spark series
  const sparkWAU = weeks.map((w) => w.wau);
  const sparkAct = weeks.map((w) => w.activation);
  const sparkStick = weeks.map((w) => w.stickiness);

  const northStar = [
    {
      key: 'wau', label: 'WAU', icon: <Users className="h-4 w-4" />, color: '#0d69b3',
      value: fmtInt(m?.wau ?? null),
      delta: computeDelta(m?.wau ?? null, m?.wauPrev ?? null),
      sub: `DAU ${fmtInt(m?.day ?? null)} · MAU ${fmtInt(m?.mau ?? null)}`,
      spark: sparkWAU, note: undefined as string | undefined,
    },
    {
      key: 'stick', label: 'Stickiness', icon: <Activity className="h-4 w-4" />, color: '#009f50',
      value: fmtPct(m?.stick ?? null),
      delta: computeDelta(m?.stick ?? null, m?.stickPrev ?? null),
      sub: 'DAU ÷ MAU', spark: sparkStick, note: undefined,
    },
    {
      key: 'act', label: 'Activation Rate', icon: <Percent className="h-4 w-4" />, color: '#ec8c22',
      value: fmtPct(m?.actCur.rate ?? null),
      delta: computeDelta(m?.actCur.rate ?? null, m?.actPrev.rate ?? null),
      sub: m ? `${m.actCur.activated}/${m.actCur.newU} new users` : '', spark: sparkAct, note: undefined,
    },
    {
      key: 'ret', label: 'Retention (D7)', icon: <Repeat className="h-4 w-4" />, color: '#9b6ba8',
      value: fmtPct(m?.d7.rate ?? null),
      delta: computeDelta(m?.d7.rate ?? null, m?.d7Prev.rate ?? null),
      sub: m && m.d7.rate != null ? `${m.d7.retained}/${m.d7.cohort} returned on day 7` : (m && m.d7.cohort > 0 ? `cohort ${m.d7.cohort}` : ''),
      spark: [] as (number | null)[],
      note: m && m.d7.rate == null ? 'Not enough matured cohort yet' : 'Returning to a core action (Fit Assessment is largely one-time)',
    },
  ];

  const qualityTiles = [
    { key: 'engrate', label: 'Engagement Rate', icon: <Gauge className="h-4 w-4" />, value: fmtPct(m?.qCur.engagementRate ?? null), delta: computeDelta(m?.qCur.engagementRate ?? null, m?.qPrev.engagementRate ?? null), hint: 'Engaged sessions ÷ total sessions' },
    { key: 'time', label: 'Avg Engagement Time', icon: <Clock className="h-4 w-4" />, value: formatDuration(m?.qCur.avgEngTime ?? null), delta: computeDelta(m?.qCur.avgEngTime ?? null, m?.qPrev.avgEngTime ?? null), hint: 'Engaged time ÷ active users · idle >30s excluded' },
    { key: 'spu', label: 'Sessions per User', icon: <Layers className="h-4 w-4" />, value: fmtNum(m?.qCur.sessionsPerUser ?? null), delta: computeDelta(m?.qCur.sessionsPerUser ?? null, m?.qPrev.sessionsPerUser ?? null), hint: 'Sessions ÷ active users' },
    { key: 'apu', label: 'Avg Actions per User', icon: <MousePointerClick className="h-4 w-4" />, value: fmtNum(m?.qCur.actionsPerUser ?? null), delta: computeDelta(m?.qCur.actionsPerUser ?? null, m?.qPrev.actionsPerUser ?? null), hint: 'Core actions ÷ active users' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {err && <ErrorStrip label="Engagement data" message={err} />}

      {/* Scope banner — what "core action" can be measured here */}
      <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2 text-[11px] leading-snug text-blue-800">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          <span className="font-semibold">Core action = completing a value activity.</span> Only Fit Assessment completion (reaching My Roadmap / selecting a program) is emitted to the live event stream, so the North Star and its drivers above are built on that. In the feature breakdown below, Case Pool and Case Drill completions are now read directly from the workspace database (all-time), while Domain Knowledge and Aptitude have no per-user completion recorded anywhere yet and show “tracking pending”, never estimated. All windows are GMT&#8239;+7 and driven by the date range above.
        </span>
      </div>

      {/* LAYER 1 — North Star KPI row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700">North Star</h2>
          <span className="text-[11px] text-gray-400">weekly active users and its health</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {northStar.map((c) => (
            <NorthStarTile key={c.key} label={c.label} icon={c.icon} color={c.color} value={c.value} delta={c.delta} sub={c.sub} spark={c.spark} note={c.note} loading={loading} />
          ))}
        </div>
      </div>

      {/* LAYER 2 — Decomposition: why the North Star moved */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700">What's driving it</h2>
          <span className="text-[11px] text-gray-400">Acquisition · Activation · Retention</span>
        </div>
        {insight && !loading && (
          <div className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs ${insight.tone === 'down' ? 'bg-amber-50 text-amber-800' : insight.tone === 'up' ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-600'}`}>
            {insight.tone === 'down' ? <TrendingDown className="mt-0.5 h-4 w-4 shrink-0" /> : insight.tone === 'up' ? <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" /> : <Info className="mt-0.5 h-4 w-4 shrink-0" />}
            <span className="font-medium">{insight.text}</span>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <DriverPanel
            title="Acquisition" subtitle="New active users per week" icon={<UserPlus className="h-4 w-4" />} color="#0d69b3"
            current={fmtInt(m?.curSplit.newA ?? null)} delta={computeDelta(m?.curSplit.newA ?? null, m?.prevSplit.newA ?? null)}
            unit="" data={weeks} dataKey="newActive" loading={loading}
            help="First-time core-action users each week (their first-ever completion falls in that week)."
          />
          <DriverPanel
            title="Activation" subtitle="Activation rate per week" icon={<Percent className="h-4 w-4" />} color="#ec8c22"
            current={fmtPct(m?.actCur.rate ?? null)} delta={computeDelta(m?.actCur.rate ?? null, m?.actPrev.rate ?? null)}
            unit="%" data={weeks} dataKey="activation" loading={loading}
            help="New users who complete Fit Assessment ÷ new users, per cohort week."
          />
          <Panel title="Retention" subtitle="Return to a core action" icon={<Repeat className="h-4 w-4" />}>
            {loading ? <div className="h-40 animate-pulse rounded-lg bg-gray-100" /> : (
              <div className="flex flex-col gap-4 pt-1">
                <RetentionBar label="D1 retention" rate={m?.d1.rate ?? null} cohort={m?.d1.cohort ?? 0} color="#9b6ba8" />
                <RetentionBar label="D7 retention" rate={m?.d7.rate ?? null} cohort={m?.d7.cohort ?? 0} color="#9b6ba8" />
                <RetentionBar label="D30 retention" rate={m?.d30.rate ?? null} cohort={m?.d30.cohort ?? 0} color="#9b6ba8" />
                <p className="text-[11px] leading-snug text-gray-400">Share of a first-core-action cohort active again on day N. D30 stays “—” until cohorts mature 30 days.</p>
              </div>
            )}
          </Panel>
        </div>
      </div>

      {/* LAYER 3 — Engagement quality */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700">Engagement quality</h2>
          <span className="text-[11px] text-gray-400">among active users · this week vs previous</span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {qualityTiles.map((t) => (
            <QualityTile key={t.key} label={t.label} icon={t.icon} value={t.value} delta={t.delta} hint={t.hint} loading={loading} />
          ))}
        </div>
      </div>

      {/* LAYER 4 — Feature drill-down (collapsed by default) */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => setShowBreakdown((v) => !v)}
          className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition-colors hover:bg-gray-50"
          aria-expanded={showBreakdown}
        >
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500"><BarChart3 className="h-4 w-4" /></span>
            <span>
              <span className="block text-sm font-semibold text-gray-800">Break down by feature</span>
              <span className="block text-[11px] text-gray-400">Active users, completion % and return % per feature · selected range</span>
            </span>
          </span>
          {showBreakdown ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
        </button>
        {showBreakdown && (
          <div className="border-t border-gray-100 p-4">
            {dbErr && (
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-snug text-amber-800">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>Case Pool / Case Drill completions couldn’t be read from the workspace database, so they show “—”. ({dbErr})</span>
              </div>
            )}
            {loading ? <div className="h-40 animate-pulse rounded-lg bg-gray-100" /> : featureRows.every((r) => r.users === 0) ? (
              <NoData icon={<BarChart3 className="h-6 w-6" />} hint="No feature activity in the selected range." />
            ) : (
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      <th className="px-2 py-2">Feature</th>
                      <th className="px-2 py-2 text-right">Users (opened)</th>
                      <th className="px-2 py-2 text-right">Completed</th>
                      <th className="px-2 py-2 text-right">Completion %</th>
                      <th className="px-2 py-2 text-right">Return %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...featureRows].sort((a, b) => b.users - a.users).map((r) => (
                      <tr key={r.key} className="border-b border-gray-100">
                        <td className="px-2 py-2.5">
                          <span className="flex items-center gap-2 font-medium text-gray-800">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md text-white" style={{ backgroundColor: r.color }}>{r.icon}</span>
                            {r.label}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 text-right font-semibold text-gray-900">{r.users.toLocaleString()}</td>
                        <td className="px-2 py-2.5 text-right text-gray-700">
                          {r.completed != null ? (
                            <span title={r.dbSourced ? 'Read directly from the workspace database (rows with status = completed) · all-time' : 'Completions from the live event stream over the selected range'}>
                              {r.completed.toLocaleString()}{r.dbSourced && <sup className="ml-0.5 text-[9px] font-normal text-gray-400">DB</sup>}
                            </span>
                          ) : r.source === 'pending' ? (
                            <span className="inline-flex items-center gap-1 text-gray-400" title="No per-user completion is recorded for this feature yet — completion tracking is being added, so we never estimate it">
                              <Clock className="h-3.5 w-3.5" />
                              <span className="text-[11px] font-medium">tracking pending</span>
                            </span>
                          ) : <span className="inline-flex items-center gap-1 text-gray-300" title="Completions live in the workspace database but couldn't be read right now"><CircleSlash className="h-3.5 w-3.5" />—</span>}
                        </td>
                        <td className="px-2 py-2.5 text-right">
                          {r.issue ? <span className="inline-flex items-center gap-1 text-amber-700" title="Completed exceeded users — data issue"><AlertTriangle className="h-3.5 w-3.5" />data issue</span>
                            : r.completionPct != null ? <span className="font-medium text-gray-700">{r.completionPct.toFixed(0)}%</span>
                            : r.source === 'pending' ? <span className="text-[11px] font-medium text-gray-400" title="Completion tracking pending for this feature">tracking pending</span>
                            : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-2 py-2.5 text-right">{r.returnPct != null ? <span className="font-medium text-gray-700">{r.returnPct.toFixed(0)}%</span> : <span className="text-gray-300">—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-2 px-2 text-[11px] leading-snug text-gray-400">
                  <Info className="mr-1 inline h-3 w-3" />Users (opened) = distinct people who used the feature. Return % = used the feature on ≥2 distinct days ÷ users. Fit Assessment completion comes from the live event stream over the selected range. <span className="font-medium text-gray-500">Case Pool &amp; Case Drill</span> completions are read directly from the workspace database (<sup className="text-[9px]">DB</sup>): <span className="font-medium text-gray-500">Completed</span> = finished submissions (rows with status = completed, counted once each) and <span className="font-medium text-gray-500">Completion %</span> = completed ÷ total attempts — shown all-time (cumulative), since completions are not in the dated event stream. Case Pool <span className="font-medium text-gray-500">Users (opened)</span> is likewise derived from distinct sessions in that table, because no casepool-open event fires yet. <span className="font-medium text-gray-500">Domain Knowledge &amp; Aptitude</span> have no per-user completion recorded anywhere, so their Completed / Completion % stay <span className="font-medium text-gray-500">“tracking pending”</span> — never estimated — until those completion events start flowing.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-start gap-1.5 text-[11px] leading-snug text-gray-400">
        <Info className="mt-0.5 h-3 w-3 shrink-0" />
        <span>
          All metrics computed from first-party product events in {TZ_LABEL}. Rates are bounded 0–100%, funnel steps are true subsets, and any metric without enough data shows “—” rather than a guessed value.
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
  const [activeTab, setActiveTab] = useState<'acquisition' | 'engagement'>('acquisition');

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
    workspaceId, startISO, endISO, prevStartISO, prevEndISO, todayISO, timezone: TIMEZONE, authToken,
  }), [workspaceId, startISO, endISO, prevStartISO, prevEndISO, todayISO, authToken]);

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

      {/* Secondary content area: Acquisition | Engagement mini-tabs pinned under the
          KPI header. Only the content below switches — the header never moves. */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
          {(['acquisition', 'engagement'] as const).map((t) => {
            const active = activeTab === t;
            return (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  active ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'
                }`}
                style={active ? { backgroundColor: ACCENT } : undefined}
              >
                {t === 'acquisition' ? 'Acquisition' : 'Engagement'}
              </button>
            );
          })}
        </div>

        {activeTab === 'acquisition'
          ? <AcquisitionTab key={`acq-${refreshKey}`} ctx={ctx} />
          : <EngagementTab key={`eng-${refreshKey}`} ctx={ctx} />}
      </div>
    </div>
  );
}
