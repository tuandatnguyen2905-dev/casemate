import { useState, useEffect, useCallback } from 'react';
import { Route, Users, Mail, Ticket, CreditCard, AlertTriangle, TrendingDown, Layers, Target, Clock, Grid3x3, Trophy, Info } from 'lucide-react';
import {
  PageHeader, Grid, Stack, StatCard, Card, DataTable, Badge, EmptyState,
} from 'dashboard-blocks';
import {
  ResponsiveContainer, AreaChart, Area, BarChart as RBarChart, Bar,
  PieChart as RPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

interface TemplateProps { workspaceId: string; authToken?: string; }

const COLORS = { primary: '#0d69b3', green: '#009f50', orange: '#ec8c22', purple: '#9b6ba8' };

// Shared small-type styles so chart labels stay readable / don't get clipped
const AXIS_TICK = { fontSize: 10 };
const LEGEND_STYLE = { fontSize: 10 };
const TOOLTIP_STYLE = { fontSize: 11 };

// Truncate long category labels on vertical bar axes
function shortLabel(s: string, max = 18) {
  return s && s.length > max ? s.slice(0, max - 1) + '…' : s;
}

// Custom pie slice label rendered as small text so words fit inside the card
function makePieLabel(fmt: (e: any) => string) {
  return (props: any) => {
    const { cx, cy, midAngle, outerRadius, fill } = props;
    const RAD = Math.PI / 180;
    const r = outerRadius + 16;
    const x = cx + r * Math.cos(-midAngle * RAD);
    const y = cy + r * Math.sin(-midAngle * RAD);
    return (
      <text x={x} y={y} fill={fill} fontSize={10}
        textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {fmt(props)}
      </text>
    );
  };
}

// Internal/test accounts excluded from every metric on this dashboard.
const EXCLUDED_EMAILS = ['tuandatnguyen2905@gmail.com', 'benjaminnguyen.work03@gmail.com'];
const EXCL_LIST = EXCLUDED_EMAILS.map(e => `'${e}'`).join(',');
// Content tables (case_practice_cases, micro_drills, pending_mcq_answers) have no email
// column, so we exclude their rows by the session_ids those emails used in usage_events.
const EXCL_SESSION_SUBQ = `SELECT session_id FROM usage_events WHERE email IN (${EXCL_LIST})`;

// Ordered acquisition→activation stages that actually fire (from event census)
const FUNNEL_STAGES: { key: string; label: string }[] = [
  { key: 'app_opened', label: 'App Opened' },
  { key: 'space_entered', label: 'Space Entered' },
  { key: 'agent_message', label: 'Agent Message' },
  { key: 'email_submit', label: 'Email Submitted' },
  { key: 'trial_access', label: 'Trial Activated' },
  { key: 'pricing_view', label: 'Pricing Viewed' },
  { key: 'checkout_start', label: 'Checkout Started' },
];

// Friendly names + color for each in-product app (from usage_events.app_id)
const APP_META: Record<string, { label: string; color: string }> = {
  'case-drill': { label: 'Case Drill', color: COLORS.primary },
  'case-drill-log': { label: 'Case Drill Log', color: COLORS.green },
  'industry-knowledge': { label: 'Industry Knowledge', color: COLORS.orange },
  'aptitude-test': { label: 'Aptitude Test', color: COLORS.purple },
  'my-roadmap': { label: 'My Roadmap', color: '#4b9fd5' },
  'readiness': { label: 'Readiness Check', color: '#7fbf9a' },
  'feedback': { label: 'Feedback', color: '#c9a227' },
};
const appLabel = (id: string) => APP_META[id]?.label || id;
const appColor = (id: string) => APP_META[id]?.color || '#9aa5b1';

function pct(a: number, b: number) { return b > 0 ? Math.round((a / b) * 100) : 0; }
function fmtDay(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Small "how this is calculated" caption shown under each metric/section.
// `src` = data source (table/endpoint), `calc` = the formula in plain words.
function Note({ src, calc }: { src: string; calc: string }) {
  return (
    <div className="mt-2 flex items-start gap-1.5 rounded bg-gray-50 border border-gray-100 px-2 py-1.5 text-[11px] leading-snug text-gray-500">
      <Info className="w-3 h-3 mt-0.5 shrink-0 text-gray-400" />
      <span>
        <span className="font-medium text-gray-600">Source:</span> {src}
        <span className="mx-1 text-gray-300">·</span>
        <span className="font-medium text-gray-600">Calc:</span> {calc}
      </span>
    </div>
  );
}

export function CustomerJourneyDashboard({ workspaceId, authToken }: TemplateProps) {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const [funnel, setFunnel] = useState<Record<string, number>>({});
  const [byDay, setByDay] = useState<{ date: string; count: number }[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [appByDay, setAppByDay] = useState<any[]>([]);
  const [activeAppIds, setActiveAppIds] = useState<string[]>([]);
  const [practice, setPractice] = useState<any[]>([]);
  const [drills, setDrills] = useState<any[]>([]);
  const [mcq, setMcq] = useState<any[]>([]);
  const [industry, setIndustry] = useState<any[]>([]);

  const __dt = typeof localStorage !== 'undefined' ? localStorage.getItem('workspace_device_token') : null;
  const sqlHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: 'Bearer ' + authToken } : __dt ? { 'x-device-token': __dt } : {}),
  };

  const runSql = useCallback(async (query: string, label: string): Promise<any[]> => {
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/db/sql`, {
        method: 'POST', credentials: 'include', headers: sqlHeaders,
        body: JSON.stringify({ query, limit: 500 }),
      });
      if (!res.ok) { const t = await res.text(); throw new Error(t); }
      const json = await res.json();
      return json.rows || [];
    } catch (e: any) {
      setErrors(prev => [...prev, `${label}: ${e.message}`]);
      return [];
    }
  }, [workspaceId]);

  const loadCrm = useCallback(async (agg: string, label: string): Promise<any[]> => {
    try {
      const res = await fetch(`/api/crm/events?workspaceId=${workspaceId}&aggregation=${agg}&days=60`);
      if (!res.ok) { const t = await res.text(); throw new Error(t); }
      const json = await res.json();
      return json.data || [];
    } catch (e: any) {
      setErrors(prev => [...prev, `${label}: ${e.message}`]);
      return [];
    }
  }, [workspaceId]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErrors([]);
      const [byType, days, appRows, appDayRows, practiceRows, drillRows, mcqRows, indRows] = await Promise.all([
        loadCrm('by_type', 'Journey funnel'),
        loadCrm('by_day', 'Daily activity'),
        runSql(
          `SELECT app_id, count(*) AS opens, count(DISTINCT session_id) AS sessions, count(DISTINCT user_key) AS users, max(created_at) AS last_seen FROM usage_events WHERE event_type='app_open' AND app_id IS NOT NULL AND email NOT IN (${EXCL_LIST}) GROUP BY app_id ORDER BY users DESC, opens DESC`,
          'App engagement',
        ),
        runSql(
          `SELECT day::text AS day, app_id, count(*) AS opens FROM usage_events WHERE event_type='app_open' AND app_id IS NOT NULL AND email NOT IN (${EXCL_LIST}) GROUP BY day, app_id ORDER BY day ASC`,
          'App usage by day',
        ),
        runSql(
          `SELECT status, count(*) AS n FROM case_practice_cases WHERE session_id NOT IN (${EXCL_SESSION_SUBQ}) GROUP BY status`,
          'Case pool status',
        ),
        runSql(
          `SELECT skill_label, count(*) AS n, sum(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completed, sum(CASE WHEN status='skipped' THEN 1 ELSE 0 END) AS skipped, sum(CASE WHEN timed_out THEN 1 ELSE 0 END) AS timed_out FROM micro_drills WHERE session_id NOT IN (${EXCL_SESSION_SUBQ}) GROUP BY skill_label ORDER BY n DESC`,
          'Micro drills',
        ),
        runSql(
          `SELECT status, count(*) AS n FROM pending_mcq_answers WHERE session_id NOT IN (${EXCL_SESSION_SUBQ}) GROUP BY status`,
          'Aptitude MCQ',
        ),
        runSql(
          `SELECT target_industry, count(*) AS n, sum(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completed FROM case_practice_cases WHERE target_industry IS NOT NULL AND session_id NOT IN (${EXCL_SESSION_SUBQ}) GROUP BY target_industry ORDER BY n DESC LIMIT 10`,
          'Case pool by industry',
        ),
      ]);
      if (!alive) return;

      const fmap: Record<string, number> = {};
      byType.forEach((r: any) => { fmap[r.eventType] = r.count; });
      setFunnel(fmap);
      setByDay([...days].reverse());

      setApps(appRows.map((r: any) => ({ ...r, opens: +r.opens, sessions: +r.sessions, users: +r.users })));

      // Pivot app-by-day into one row per day with a column per app
      const ids = Array.from(new Set(appDayRows.map((r: any) => r.app_id)));
      setActiveAppIds(ids);
      const dayMap: Record<string, any> = {};
      appDayRows.forEach((r: any) => {
        if (!dayMap[r.day]) dayMap[r.day] = { date: r.day };
        dayMap[r.day][r.app_id] = +r.opens;
      });
      const pivoted = Object.values(dayMap)
        .map((row: any) => { ids.forEach(id => { if (row[id] == null) row[id] = 0; }); return row; })
        .sort((a: any, b: any) => a.date.localeCompare(b.date));
      setAppByDay(pivoted);

      setPractice(practiceRows.map((r: any) => ({ ...r, n: +r.n })));
      setDrills(drillRows.map((r: any) => ({
        ...r, n: +r.n, completed: +r.completed, skipped: +r.skipped, timed_out: +r.timed_out,
      })));
      setMcq(mcqRows.map((r: any) => ({ ...r, n: +r.n })));
      setIndustry(indRows.map((r: any) => ({ ...r, n: +r.n, completed: +r.completed })));
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [loadCrm, runSql]);

  // ---- derived: funnel ----
  const funnelData = FUNNEL_STAGES.map((s, i) => {
    const count = funnel[s.key] || 0;
    const prev = i === 0 ? count : (funnel[FUNNEL_STAGES[i - 1].key] || 0);
    const top = funnel[FUNNEL_STAGES[0].key] || 0;
    return { label: s.label, count, fromPrev: pct(count, prev), fromTop: pct(count, top), dropFromPrev: prev - count };
  });

  let worstStep = { label: '-', drop: 0, fromPrev: 100 };
  funnelData.forEach((d, i) => {
    if (i === 0) return;
    if (d.dropFromPrev > worstStep.drop) worstStep = { label: d.label, drop: d.dropFromPrev, fromPrev: d.fromPrev };
  });

  // ---- derived: app engagement ----
  const appChart = apps.map(a => ({ ...a, name: appLabel(a.app_id) }));
  const totalOpens = apps.reduce((s, a) => s + a.opens, 0);
  const topApp = apps[0]; // sorted by users desc
  const totalActiveUsers = apps.reduce((s, a) => Math.max(s, a.users), 0);

  // ---- derived: content bottlenecks ----
  const practiceCompleted = practice.find(p => p.status === 'completed')?.n || 0;
  const practicePending = practice.find(p => p.status === 'pending')?.n || 0;
  const practiceTotal = practice.reduce((s, p) => s + p.n, 0);
  const practiceRate = pct(practiceCompleted, practiceTotal);

  const appTop = funnel['app_opened'] || 0;
  const trial = funnel['trial_access'] || 0;
  const email = funnel['email_submit'] || 0;
  const checkout = funnel['checkout_start'] || 0;

  const drillRanked = [...drills]
    .map(d => ({ ...d, completeRate: pct(d.completed, d.n), timeoutRate: pct(d.timed_out, d.n) }))
    .sort((a, b) => a.completeRate - b.completeRate);

  const practicePie = [
    { label: 'Completed', value: practiceCompleted, color: COLORS.green },
    { label: 'Pending (abandoned)', value: practicePending, color: COLORS.orange },
  ];

  return (
    <Stack gap="lg">
      <PageHeader
        title="Customer Journey & Bottlenecks"
        subtitle="Which apps customers use most and where they get stuck — last 60 days"
        icon={<Route className="w-5 h-5" />}
      />

      <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-snug text-amber-800 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>
          <span className="font-medium">Excluded accounts:</span> {EXCLUDED_EMAILS.join(', ')}.
          {' '}These are filtered out of all App Adoption and content metrics (usage_events, case_practice_cases, micro_drills, pending_mcq_answers).
          {' '}The Conversion Journey funnel and Overall Activity charts come from the CRM events API, which can't be filtered by email — those two still include all accounts.
        </span>
      </div>

      {errors.length > 0 && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          <div className="font-semibold mb-1 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" /> Some queries failed (data below may be incomplete):
          </div>
          <ul className="list-disc ml-5 space-y-0.5">
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* ---- Headline KPIs: acquisition → activation ---- */}
      <div>
        <Grid cols={4}>
          <StatCard title="App Opens" value={appTop.toLocaleString()} subtitle="Top of funnel (60d)" icon={<Users className="w-4 h-4" />} loading={loading} />
          <StatCard title="Email Submitted" value={email.toLocaleString()} subtitle={`${pct(email, appTop)}% of app opens`} icon={<Mail className="w-4 h-4" />} loading={loading} />
          <StatCard title="Trials Activated" value={trial.toLocaleString()} subtitle={`${pct(trial, appTop)}% of app opens`} icon={<Ticket className="w-4 h-4" />} loading={loading} />
          <StatCard title="Checkouts Started" value={checkout.toLocaleString()} subtitle={`${pct(checkout, trial)}% of trials`} trend={checkout <= 2 ? 'down' : undefined} icon={<CreditCard className="w-4 h-4" />} loading={loading} />
        </Grid>
        <Note
          src="CRM events API — GET /api/crm/events?aggregation=by_type&days=60"
          calc="Each card counts events of one type over the last 60 days: App Opens = app_opened, Email = email_submit, Trials = trial_access, Checkouts = checkout_start. Percentages = this event ÷ a reference event (app opens, or trials for checkout), rounded to whole %."
        />
      </div>

      {/* ==================== APP USAGE SECTION ==================== */}
      <Card title="App Adoption — which product are customers using?">
        {loading ? <div className="h-16" /> : (
          <Grid cols={4}>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2"><Trophy className="w-4 h-4 text-blue-600" /></div>
              <div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Most-used app</div>
                <div className="text-base font-semibold">{topApp ? appLabel(topApp.app_id) : '-'}</div>
                <div className="text-xs text-gray-600">
                  {topApp ? `${topApp.users} unique users · ${topApp.opens} opens` : 'No data'}
                </div>
              </div>
            </div>
            <StatCard title="Apps in Use" value={apps.length} subtitle="Distinct products opened" icon={<Grid3x3 className="w-4 h-4" />} />
            <StatCard title="Total App Opens" value={totalOpens.toLocaleString()} subtitle="Across all products (60d)" icon={<Layers className="w-4 h-4" />} />
            <StatCard title="Reach (peak app)" value={totalActiveUsers.toLocaleString()} subtitle="Users on the top product" icon={<Users className="w-4 h-4" />} />
          </Grid>
        )}
        <Note
          src="Workspace DB — usage_events table, rows where event_type='app_open' (grouped by app_id)"
          calc="Most-used app = app_id with the most unique user_key. Apps in Use = number of distinct app_id. Total App Opens = total row count. Reach = highest unique-user count among all apps. A 'user' = distinct user_key; an 'open' = one event row."
        />
      </Card>

      <Grid cols={2}>
        <Card title="App usage leaderboard (unique users vs opens)">
          {loading ? <div className="h-72" /> : appChart.length === 0 ? (
            <EmptyState icon={<Layers className="w-6 h-6" />} title="No app-open data yet" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <RBarChart data={appChart} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={AXIS_TICK} />
                <YAxis type="category" dataKey="name" width={130} tick={AXIS_TICK} tickFormatter={(v: any) => shortLabel(v)} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any, n: any) => [v, n === 'users' ? 'Unique users' : n === 'sessions' ? 'Sessions' : 'Opens']} />
                <Legend wrapperStyle={LEGEND_STYLE} formatter={(v) => (v === 'users' ? 'Unique users' : v === 'opens' ? 'Opens' : v)} />
                <Bar dataKey="users" fill={COLORS.green} radius={[0, 4, 4, 0]} />
                <Bar dataKey="opens" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
              </RBarChart>
            </ResponsiveContainer>
          )}
          <Note
            src="Workspace DB — usage_events (event_type='app_open'), grouped by app_id"
            calc="Green bar = unique users (count of distinct user_key). Blue bar = opens (total event rows). Sorted by unique users descending."
          />
        </Card>

        <Card title="Share of app opens">
          {loading ? <div className="h-72" /> : appChart.length === 0 ? (
            <EmptyState title="No app-open data yet" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <RPieChart>
                <Pie data={appChart} dataKey="opens" nameKey="name" cx="50%" cy="50%" outerRadius={85}
                  label={makePieLabel((e: any) => `${e.name}: ${pct(e.opens, totalOpens)}%`)}>
                  {appChart.map((a) => <Cell key={a.app_id} fill={appColor(a.app_id)} />)}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any, n: any) => [`${v} opens (${pct(v as number, totalOpens)}%)`, n]} />
              </RPieChart>
            </ResponsiveContainer>
          )}
          <Note
            src="Workspace DB — usage_events (event_type='app_open')"
            calc="Each slice = that app's opens ÷ total opens across all apps, as a whole %. Uses total open events, not unique users."
          />
        </Card>
      </Grid>

      <Card title="App usage over time (daily opens by product)">
        {loading ? <div className="h-64" /> : appByDay.length === 0 ? (
          <EmptyState title="No app usage data yet" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={appByDay} margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={fmtDay} minTickGap={20} tick={AXIS_TICK} />
              <YAxis allowDecimals={false} tick={AXIS_TICK} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelFormatter={(l) => fmtDay(l as string)} formatter={(v: any, n: any) => [v, appLabel(n as string)]} />
              <Legend wrapperStyle={LEGEND_STYLE} formatter={(v) => appLabel(v as string)} />
              {activeAppIds.map((id) => (
                <Area key={id} type="monotone" dataKey={id} stackId="apps"
                  stroke={appColor(id)} fill={appColor(id)} fillOpacity={0.55} strokeWidth={1} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
        <Note
          src="Workspace DB — usage_events (event_type='app_open'), grouped by day + app_id"
          calc="Each day shows opens per app, stacked. Value = count of open events on that calendar day (usage_events.day). Gaps mean an app had zero opens that day / wasn't live yet."
        />
      </Card>

      {/* ==================== BOTTLENECK CALLOUTS ==================== */}
      <Grid cols={2}>
        <Card title="Biggest funnel drop-off">
          {loading ? <div className="h-16" /> : (
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-orange-100 p-2"><TrendingDown className="w-4 h-4 text-orange-600" /></div>
              <div>
                <div className="text-base font-semibold">{worstStep.label}</div>
                <div className="text-xs text-gray-600">
                  Lost <span className="font-semibold text-orange-700">{worstStep.drop.toLocaleString()}</span> people vs the prior step —
                  only <span className="font-semibold">{worstStep.fromPrev}%</span> continue.
                </div>
                <div className="text-[11px] text-gray-500 mt-1">This is where the most users leave the journey.</div>
              </div>
            </div>
          )}
          <Note
            src="CRM events API (by_type, 60d) — the 7 funnel stages"
            calc="For each step we compute (previous step count − this step count). The step with the largest absolute loss is shown. '% continue' = this step ÷ previous step."
          />
        </Card>
        <Card title="Case Pool completion rate">
          {loading ? <div className="h-16" /> : (
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2"><Target className="w-4 h-4 text-blue-600" /></div>
              <div>
                <div className="text-base font-semibold">{practiceRate}% completed</div>
                <div className="text-xs text-gray-600">
                  {practiceCompleted}/{practiceTotal} cases finished, <span className="font-semibold text-orange-700">{practicePending}</span> still pending (abandoned).
                </div>
                <div className="text-[11px] text-gray-500 mt-1">Cases created but never finished signal a content bottleneck.</div>
              </div>
            </div>
          )}
          <Note
            src="Workspace DB — case_practice_cases, grouped by status"
            calc="Completion rate = rows with status='completed' ÷ all rows. Pending = status='pending' (created but not finished)."
          />
        </Card>
      </Grid>

      {/* ---- Journey Funnel ---- */}
      <Card title="Conversion journey (event volume, 60 days)">
        {loading ? <div className="h-72" /> : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <RBarChart data={funnelData} layout="vertical" margin={{ left: 20, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={AXIS_TICK} />
                <YAxis type="category" dataKey="label" width={130} tick={AXIS_TICK} tickFormatter={(v: any) => shortLabel(v)} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: any, _n: any, p: any) => [`${(v as number).toLocaleString()} events (${p.payload.fromTop}% of top)`, 'Volume']} />
                <Bar dataKey="count" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
              </RBarChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-gray-600">
              {funnelData.slice(1).map((d) => (
                <div key={d.label} className="flex justify-between border rounded px-2 py-1">
                  <span className="truncate">{d.label}</span>
                  <span className={d.fromPrev < 50 ? 'text-orange-700 font-semibold' : 'font-medium'}>{d.fromPrev}%</span>
                </div>
              ))}
            </div>
          </>
        )}
        <Note
          src="CRM events API (by_type, 60d) — event types: app_opened → space_entered → agent_message → email_submit → trial_access → pricing_view → checkout_start"
          calc="Bar length = total events of that type (60d). This counts events, not unique people, so one user can appear in several stages. Each chip below = step ÷ the step directly above it (step-to-step conversion); tooltip shows % of the top stage."
        />
      </Card>

      {/* ---- Content status ---- */}
      <Card title="Content status — abandoned vs completed">
        {loading ? <div className="h-64" /> : (
          <Grid cols={2}>
            <ResponsiveContainer width="100%" height={220}>
              <RPieChart>
                <Pie data={practicePie} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={70} label={makePieLabel((e: any) => `${e.label}: ${e.value}`)}>
                  {practicePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </RPieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center gap-2 text-xs">
              <div className="text-[11px] text-gray-500 uppercase tracking-wide">Practice activity breakdown</div>
              {drills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">Drills completed: {drills.reduce((s, d) => s + d.completed, 0)}</Badge>
                  <Badge variant="warning">Drills skipped: {drills.reduce((s, d) => s + d.skipped, 0)}</Badge>
                  <Badge variant="error">Drills timed out: {drills.reduce((s, d) => s + d.timed_out, 0)}</Badge>
                </div>
              )}
              {mcq.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">Aptitude MCQ submitted: {mcq.find(m => m.status === 'submitted')?.n || 0}</Badge>
                  <Badge variant="warning">Aptitude MCQ pending: {mcq.find(m => m.status === 'pending')?.n || 0}</Badge>
                </div>
              )}
            </div>
          </Grid>
        )}
        <Note
          src="Workspace DB — case_practice_cases (pie), micro_drills (drill badges), pending_mcq_answers (aptitude badges)"
          calc="Pie = completed vs pending case count. Drill badges sum status='completed'/'skipped' and the timed_out flag across all micro_drills. Aptitude badges count pending_mcq_answers rows by status (submitted vs pending)."
        />
      </Card>

      {/* ---- Question-level bottleneck: drills by skill ---- */}
      <Card title="Which skills stall users (Micro Drills)">
        <DataTable
          data={drillRanked}
          loading={loading}
          emptyMessage="No drills recorded yet"
          columns={[
            { key: 'skill_label', header: 'Skill', sortable: true },
            { key: 'n', header: 'Attempts', sortable: true },
            { key: 'completeRate', header: 'Completion Rate', sortable: true, render: (v: number) => (
              <Badge variant={v < 40 ? 'error' : v < 70 ? 'warning' : 'success'}>{v}%</Badge>
            ) },
            { key: 'skipped', header: 'Skipped', sortable: true },
            { key: 'timeoutRate', header: 'Timed Out', sortable: true, render: (v: number, r: any) => (
              <span className={v >= 30 ? 'text-red-600 font-semibold flex items-center gap-1' : ''}>
                {v >= 30 && <Clock className="w-3 h-3" />}{v}% ({r.timed_out})
              </span>
            ) },
          ]}
        />
        <div className="mt-2 text-[11px] text-gray-500">
          Skills with low completion or high timeout rates (red) are where users struggle most — consider simplifying prompts or extending time limits.
        </div>
        <Note
          src="Workspace DB — micro_drills, grouped by skill_label"
          calc="Attempts = row count per skill. Completion Rate = status='completed' ÷ attempts. Skipped = status='skipped'. Timed Out = rows with timed_out=true ÷ attempts (count in parentheses). Sorted by lowest completion first."
        />
      </Card>

      {/* ---- Case pool completion by industry ---- */}
      <Card title="Case Pool by industry — high creation, low completion">
        <DataTable
          data={industry.map(r => ({ ...r, rate: pct(r.completed, r.n) }))}
          loading={loading}
          emptyMessage="No cases by industry yet"
          columns={[
            { key: 'target_industry', header: 'Target Industry', sortable: true },
            { key: 'n', header: 'Cases Created', sortable: true },
            { key: 'completed', header: 'Completed', sortable: true },
            { key: 'rate', header: 'Completion Rate', sortable: true, render: (v: number) => (
              <Badge variant={v < 30 ? 'error' : v < 60 ? 'warning' : 'success'}>{v}%</Badge>
            ) },
          ]}
        />
        <Note
          src="Workspace DB — case_practice_cases where target_industry is set, grouped by target_industry (top 10 by volume)"
          calc="Cases Created = row count per industry. Completed = status='completed'. Completion Rate = Completed ÷ Cases Created. High creation + low completion = a bottleneck to investigate."
        />
      </Card>

      {/* ---- Activity trend ---- */}
      <Card title="Overall activity (total events, last 30 days)">
        {loading ? <div className="h-64" /> : byDay.length === 0 ? (
          <EmptyState title="No activity data yet" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={byDay} margin={{ left: 0, right: 10 }}>
              <defs>
                <linearGradient id="actFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={fmtDay} minTickGap={20} tick={AXIS_TICK} />
              <YAxis allowDecimals={false} tick={AXIS_TICK} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelFormatter={(l) => fmtDay(l as string)} formatter={(v: any) => [v, 'Events']} />
              <Area type="monotone" dataKey="count" stroke={COLORS.primary} fill="url(#actFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
        <Note
          src="CRM events API — GET /api/crm/events?aggregation=by_day"
          calc="Each point = total events of ALL types on that day (every tracked interaction combined), for the last ~30 days returned by the API. Not de-duplicated by user."
        />
      </Card>
    </Stack>
  );
}

export default CustomerJourneyDashboard;
