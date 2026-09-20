import { useState, useEffect } from 'react';
import { PageHeader, Grid, Stack, StatCard, DataTable, Badge, BarChart, PieChart } from 'dashboard-blocks';
import { BarChart3, Eye, Mail, TrendingUp, Users } from 'lucide-react';

interface TemplateProps {
  workspaceId: string;
  authToken?: string;
}

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function fmtDate(s: string): string {
  return new Date(s + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function AnalyticsDashboard({ workspaceId, authToken }: TemplateProps) {
  const [summary, setSummary] = useState<any>(null);
  const [eventCounts, setEventCounts] = useState<any>({});
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  // Time-period filter. Defaults to the last 30 days; presets plus a custom
  // from-to range. The applied range drives every query below via the
  // startDate/endDate params that /api/crm/events and /summary support.
  const [preset, setPreset] = useState<string>('30');
  const [customFrom, setCustomFrom] = useState<string>('');
  const [customTo, setCustomTo] = useState<string>('');
  const [range, setRange] = useState<{ start: string; end: string } | null>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 29);
    return { start: toDateStr(start), end: toDateStr(end) };
  });
  const __dt = typeof localStorage !== 'undefined' ? localStorage.getItem('workspace_device_token') : null;
  const authHeaders: Record<string, string> = authToken ? { 'Authorization': 'Bearer ' + authToken } : __dt ? { 'x-device-token': __dt } : {};

  function pickPreset(p: string) {
    setPreset(p);
    if (p === 'all') { setRange(null); return; }
    if (p === 'custom') { return; }
    const days = parseInt(p, 10);
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    setRange({ start: toDateStr(start), end: toDateStr(end) });
  }

  function applyCustom() {
    if (!customFrom || !customTo || customFrom > customTo) return;
    setRange({ start: customFrom, end: customTo });
  }

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setErrors([]);
      try {
        // /api/crm/events accepts plain YYYY-MM-DD startDate/endDate (endDate
        // inclusive). The /summary endpoint compares exact timestamps, so it
        // gets an explicit end-of-day to keep the end date inclusive too.
        const crmRange = range ? '&startDate=' + range.start + '&endDate=' + range.end : '&days=3650';
        const summaryQs = range
          ? '?startDate=' + encodeURIComponent(range.start + 'T00:00:00') + '&endDate=' + encodeURIComponent(range.end + 'T23:59:59.999')
          : '';
        const [summaryRes, byDayRes, byTypeRes, recentRes] = await Promise.all([
          fetch('/api/analytics/' + workspaceId + '/summary' + summaryQs, { credentials: 'include', headers: authHeaders }),
          fetch('/api/crm/events?workspaceId=' + workspaceId + '&aggregation=by_day&excludeType=scroll_depth' + crmRange, { credentials: 'include', headers: authHeaders }),
          fetch('/api/crm/events?workspaceId=' + workspaceId + '&aggregation=by_type&excludeType=scroll_depth' + crmRange, { credentials: 'include', headers: authHeaders }),
          fetch('/api/crm/events?workspaceId=' + workspaceId + '&limit=20' + crmRange, { credentials: 'include', headers: authHeaders }),
        ]);

        const summaryJson = await summaryRes.json();
        if (cancelled) return;
        setSummary(summaryJson.summary || null);

        const byTypeJson = await byTypeRes.json();
        const typeRows = Array.isArray(byTypeJson.data) ? byTypeJson.data : [];
        const counts: Record<string, number> = {};
        typeRows.forEach((r: any) => { counts[r.eventType] = Number(r.count) || 0; });
        if (cancelled) return;
        setEventCounts(counts);

        const byDayJson = await byDayRes.json();
        const dayRows = Array.isArray(byDayJson.data) ? byDayJson.data : [];
        // by_day returns most-recent first; reverse to chronological and label
        // by real date so the chart no longer shows arbitrary weekday names.
        if (cancelled) return;
        setDailyData(dayRows.slice().reverse().map((r: any) => ({
          label: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: Number(r.count) || 0,
        })));

        const recentJson = await recentRes.json();
        const evts = (recentJson.data || recentJson.events || []).map((e: any) => ({
          ...e,
          eventType: e.eventType || e.type,
        }));
        if (cancelled) return;
        setRecentEvents(evts);

        // Unique visitors = distinct visitor_id in usage_events over the range.
        // Counts people (deduped), unlike Total Events which counts actions.
        //
        // NOTE: usage_events is a WorkspaceDB table that is NOT readable from a
        // real logged-in browser session via POST /db/sql — that path needs
        // window.__DASHBOARD_AUTH_TOKEN__, which is absent in normal sessions and
        // returns 401. So this card is served by a read-only SERVER HOOK
        // (`usage-visitors-v1`) that holds the workspace credential server-side and
        // returns ONLY { visitor_id, created_at } rows. We dedupe distinct non-null
        // visitor_id within the selected window client-side (matching the old
        // count(DISTINCT visitor_id) semantics; SQL COUNT DISTINCT ignores NULLs).
        // Boundaries are compared in UTC to mirror the prior server-side timestamps.
        try {
          const hookHeaders: Record<string, string> = { 'Content-Type': 'application/json', ...authHeaders };
          const visRes = await fetch('/api/workspaces/' + workspaceId + '/hooks/usage-visitors-v1/execute', {
            method: 'POST',
            credentials: 'include',
            headers: hookHeaders,
            body: JSON.stringify({}),
          });
          if (!visRes.ok) {
            const t = await visRes.text().catch(() => visRes.statusText);
            throw new Error('usage-visitors-v1 hook ' + visRes.status + ': ' + t);
          }
          const visJson = await visRes.json().catch(() => null);
          if (!visJson || visJson.ok !== true) {
            const detail = visJson ? (visJson.error || JSON.stringify(visJson)) : 'empty response body';
            throw new Error('usage-visitors-v1 hook returned an error: ' + detail);
          }
          const visRows: any[] = Array.isArray(visJson.rows) ? visJson.rows : [];
          // A zero-row result from a never-empty ledger is a READ FAILURE, not a
          // valid empty state — surface it rather than render a misleading "0".
          if (visRows.length === 0) {
            throw new Error('usage-visitors-v1 hook returned 0 rows; usage_events is never empty, so this is treated as a read failure.');
          }
          const startMs = range ? Date.parse(range.start + 'T00:00:00Z') : -Infinity;
          const endMs = range ? Date.parse(range.end + 'T23:59:59.999Z') : Infinity;
          const distinct = new Set<string>();
          for (const r of visRows) {
            const vid = r && r.visitor_id;
            if (vid == null || vid === '') continue; // COUNT DISTINCT ignores NULLs
            const t = Date.parse(r.created_at);
            if (isNaN(t) || t < startMs || t > endMs) continue;
            distinct.add(String(vid));
          }
          if (cancelled) return;
          setUniqueVisitors(distinct.size);
        } catch (e: any) {
          if (!cancelled) {
            setUniqueVisitors(null);
            setErrors((prev) => [...prev, 'unique visitors: ' + (e?.message || String(e))]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        if (!cancelled) setErrors((prev) => [...prev, 'analytics: ' + ((err as any)?.message || String(err))]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, [workspaceId, range ? range.start + '|' + range.end : 'all']);

  const s = summary || {};
  const totalEvents = (s.totalViews || 0) + (s.totalEmailClicks || 0) + (s.totalEmailCaptures || 0)
    + (s.totalAgentConversations || 0) + (s.totalPricingViews || 0) + (s.totalCheckoutStarts || 0);

  const pieData = Object.entries(eventCounts).map(([label, value]) => ({
    label,
    value: value as number
  }));

  const periodLabel = range ? fmtDate(range.start) + ' - ' + fmtDate(range.end) : 'All time';
  const presets = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: 'all', label: 'All time' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <Stack>
      <PageHeader 
        title="Analytics Dashboard" 
        subtitle="Event tracking and funnel analysis"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => pickPreset(p.value)}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                border: '1px solid ' + (preset === p.value ? '#3b82f6' : '#d1d5db'),
                background: preset === p.value ? '#3b82f6' : 'transparent',
                color: preset === p.value ? '#ffffff' : 'inherit',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        {preset === 'custom' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12 }}>From</label>
            <input type="date" value={customFrom} max={customTo || undefined} onChange={(e) => setCustomFrom(e.target.value)}
              style={{ fontSize: 12, padding: '3px 6px', borderRadius: 6, border: '1px solid #d1d5db', background: 'transparent', color: 'inherit' }} />
            <label style={{ fontSize: 12 }}>To</label>
            <input type="date" value={customTo} min={customFrom || undefined} onChange={(e) => setCustomTo(e.target.value)}
              style={{ fontSize: 12, padding: '3px 6px', borderRadius: 6, border: '1px solid #d1d5db', background: 'transparent', color: 'inherit' }} />
            <button
              onClick={applyCustom}
              disabled={!customFrom || !customTo || customFrom > customTo}
              style={{
                padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                border: '1px solid #3b82f6', background: '#3b82f6', color: '#ffffff',
                opacity: (!customFrom || !customTo || customFrom > customTo) ? 0.5 : 1,
              }}
            >
              Apply
            </button>
          </div>
        )}
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Showing: <strong>{periodLabel}</strong>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: 8, padding: '10px 12px', fontSize: 13 }}>
          <strong>Some data failed to load:</strong>
          <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* People vs. actions: Unique Visitors counts distinct humans, while
          Total Events counts every action they fired (one person = many events). */}
      <Grid cols={2}>
        <StatCard
          title="Unique Visitors"
          value={uniqueVisitors == null ? '—' : uniqueVisitors}
          subtitle={'Distinct people · ' + periodLabel}
          icon={<Users className="w-5 h-5" />}
          loading={loading}
        />
        <StatCard
          title="Total Events"
          value={totalEvents}
          subtitle="Actions fired (page views, clicks, submits…)"
          icon={<BarChart3 className="w-5 h-5" />}
          loading={loading}
        />
      </Grid>

      <Grid cols={3}>
        <StatCard
          title="Page Views"
          value={s.totalViews || 0}
          icon={<Eye className="w-5 h-5" />}
          loading={loading}
        />
        <StatCard
          title="CTA Clicks"
          value={s.totalEmailClicks || 0}
          icon={<TrendingUp className="w-5 h-5" />}
          loading={loading}
        />
        <StatCard
          title="Email Submits"
          value={s.totalEmailCaptures || 0}
          icon={<Mail className="w-5 h-5" />}
          loading={loading}
        />
      </Grid>

      <Grid cols={2}>
        <BarChart 
          title="Events by Day" 
          data={dailyData}
          color="#3b82f6"
        />
        <PieChart 
          title="Events by Type" 
          data={pieData}
        />
      </Grid>

      <DataTable
        title="Recent Events"
        data={recentEvents}
        columns={[
          { key: 'eventType', header: 'Event Type', render: (val: string) => <Badge variant="info">{val}</Badge> },
          { key: 'eventData', header: 'Details', render: (val: any) => {
            if (!val || typeof val !== 'object') return '-';
            const detail = val.source || val.page || val.email || val.path || '-';
            return String(detail);
          }},
          { key: 'createdAt', header: 'Time', render: (val: string) => {
            if (!val) return '-';
            const date = new Date(val);
            return isNaN(date.getTime()) ? '-' : date.toLocaleString();
          }}
        ]}
        pageSize={10}
        loading={loading}
        emptyMessage="No events tracked yet."
      />
    </Stack>
  );
}
