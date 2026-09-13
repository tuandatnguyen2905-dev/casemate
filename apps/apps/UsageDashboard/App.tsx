// Casemate "Usage · Founder" — v1.1 founder-only usage & retention dashboard.
//
// INTERNAL ONLY: registered in config.json with allowedRoles: ["founder"], so
// customers never see it in the sidebar; this component ALSO guards itself
// (entrepreneur mode or an explicit 'founder' session role required) in case
// someone deep-links to #founder-usage.
//
// Data source: the WorkspaceDB `usage_events` table, written by Desktop.tsx —
// at most one row per user per UTC day per event ('visit') / per app
// ('app_open', app_id set). Users are keyed on their sign-in email
// ('email:<email>'), falling back to the device visitor id for guests, so the
// same person is never double-counted across sessions on the same device.
//
// Headline metrics:
//   - Distinct users: unique user_key values seen.
//   - Sessions: 'visit' rows = distinct-day visits (one per user per day per device).
//   - Return-visitor rate: users active on ≥2 distinct days ÷ total users.
//   - Per-app usage: distinct users who opened each dock app.
//   - Fit assessments: total saved results (from assessment_results) — the
//     fit assessment lives in Mate's chat, not a dock app, so it is counted
//     from its own table.
//
// Tracking starts with the v1.1 release — earlier visits are not back-filled.
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Award,
  BarChart3,
  CalendarDays,
  Clock3,
  Loader2,
  Lock,
  Play,
  Radar,
  RefreshCw,
  Repeat,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { isFounderEmail, isFounderEmailSession } from '../../lib/founderAccess';
import { ensurePerformanceBenchmarkHistory, MIN_RANKING_RECORDS } from '../../lib/performanceRankings';
import { computeReadinessByUser, readinessTier, READINESS_TIERS } from '../../lib/readinessScore';
import {
  ensureCompanyIntelHook,
  ensureCompanyIntelSchedule,
  executeIntelHook,
  INTEL_COMPANIES,
  INTEL_SCHEDULE_NAME,
  INTEL_STALE_DAYS,
  intelAgeDays,
  intelConfidenceLabel,
  parseIntelRows,
} from '../../lib/companyIntelligence';
import type { CompanyIntelRecord } from '../../lib/companyIntelligence';
import { ensureCasemateAuthHook } from '../../lib/authAccount';
import { fetchTemporaryTesters, TemporaryTesterRow } from '../../lib/proAccess';

interface UsageRow {
  id: number;
  user_key: string;
  email: string | null;
  visitor_id: string | null;
  event_type: string;
  app_id: string | null;
  day: string;
  session_ref: string | null;
  created_at: string;
}

interface SessionTrackingRow {
  id: number;
  user_id: string;
  visit_session_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number;
  date: string;
  app_opens_in_session: number;
}

interface PerformanceRow {
  id: number;
  user_id: string;
  app: 'case_pool' | 'case_drill' | 'aptitude_test';
  score: number;
  time_seconds: number;
  completed_at: string | null;
  created_at: string;
}

const APP_LABELS: Record<string, string> = {
  readiness: 'Your Readiness',
  'case-drill-log': 'Case Pool',
  'case-drill': 'Case Drill',
  'industry-knowledge': 'Industry Knowledge',
  'aptitude-test': 'Aptitude Test',
  feedback: 'Feedback',
};

const PERFORMANCE_LABELS: Record<PerformanceRow['app'], string> = {
  case_pool: 'Case Pool',
  case_drill: 'Case Drill',
  aptitude_test: 'Aptitude Test',
};

const PAGE_SIZE = 1000;
const MAX_ROWS = 10000;

function dayOf(value: unknown): string {
  return String(value ?? '').slice(0, 10);
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function performanceUserLabel(userId: string): string {
  if (userId.startsWith('email:')) return userId.slice(6);
  if (userId.startsWith('legacy:')) return `Historical attempt #${userId.split(':').pop()}`;
  const tail = userId.slice(-6);
  return `Visitor …${tail}`;
}

function StatCard({ 
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-[0_1px_3px_color-mix(in_srgb,var(--space-shell-shadow)_35%,transparent)]">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--space-surface-accent-soft)]">
          <Icon className="h-4 w-4 text-[var(--space-text-brand)]" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-[var(--space-text-primary)]">{value}</p>
      {sub && <p className="mt-1 text-xs text-[var(--space-text-muted)]">{sub}</p>}
    </div>
  );
}

// Company-intelligence social-listening pipeline: status per program-database
// company (last scrape, confidence, no-data flags), a manual "Re-scrape now"
// trigger, and idempotent deploy of the pipeline hook + its daily rolling
// 7-day schedule. Hook/schedule management needs a founder-authenticated
// session (App Studio); when unavailable, the section says so instead of
// failing silently. Data reads are plain shared WorkspaceDB reads.
function IntelPipelineSection() {
  const [records, setRecords] = useState<CompanyIntelRecord[]>([]);
  const [runRows, setRunRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [service, setService] = useState<'checking' | 'ready' | 'unavailable'>('checking');
  const [serviceError, setServiceError] = useState('');
  const [scheduleState, setScheduleState] = useState<'created' | 'exists' | null>(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number; label: string } | null>(null);
  const [lastRunSummary, setLastRunSummary] = useState('');

  const loadData = useCallback(async () => {
    setLoadError('');
    try {
      const db = (window as any).__workspaceDb;
      if (!db) throw new Error('Workspace database is not available in this view.');
      const intelRes = await db
        .from('company_intelligence', { shared: true })
        .orderBy('id', 'desc')
        .limit(200)
        .get();
      setRecords(parseIntelRows(intelRes && Array.isArray(intelRes.data) ? intelRes.data : []));
      const runsRes = await db
        .from('intel_scrape_runs', { shared: true })
        .orderBy('id', 'desc')
        .limit(80)
        .get();
      setRunRows(runsRes && Array.isArray(runsRes.data) ? runsRes.data : []);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Could not load company intelligence data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
    // Deploy/refresh the multi-method sign-in service (casemate-auth-v1) from
    // this founder-authenticated session. Independent of the intel pipeline —
    // a failure here never blocks the dashboard or the pipeline status.
    void ensureCasemateAuthHook().catch((e) => {
      console.warn('[UsageDashboard] auth service deploy skipped:', e instanceof Error ? e.message : e);
    });
    void (async () => {
      try {
        await ensureCompanyIntelHook();
        const schedule = await ensureCompanyIntelSchedule();
        setScheduleState(schedule);
        setService('ready');
      } catch (e) {
        setService('unavailable');
        setServiceError(
          e instanceof Error
            ? e.message
            : 'Pipeline deploy is unavailable in this session — open this dashboard from App Studio once.',
        );
      }
    })();
  }, [loadData]);

  const rescrape = useCallback(
    async (companyIds: string[]) => {
      if (running || companyIds.length === 0) return;
      setRunning(true);
      setLastRunSummary('');
      let ok = 0;
      let failed = 0;
      let done = 0;
      try {
        // Hook executions run server-side; the dashboard loops small batches
        // (≤3 companies per call) so each execution stays inside the hook
        // sandbox's fetch/time limits.
        for (let i = 0; i < companyIds.length; i += 3) {
          const chunk = companyIds.slice(i, i + 3);
          const label = chunk
            .map((id) => {
              const company = INTEL_COMPANIES.find((c) => c.id === id);
              return company ? company.short : id;
            })
            .join(', ');
          setProgress({ done, total: companyIds.length, label });
          const result = await executeIntelHook({ action: 'run', companies: chunk, trigger: 'manual' });
          const processed = result && Array.isArray(result.processed) ? result.processed : [];
          processed.forEach((p) => {
            if (p.status === 'success') ok += 1;
            else failed += 1;
          });
          if (!result || result.success !== true) failed += Math.max(0, chunk.length - processed.length);
          done += chunk.length;
          setProgress({ done, total: companyIds.length, label: '' });
          await loadData();
        }
        setLastRunSummary(`Re-scrape finished: ${ok} compan${ok === 1 ? 'y' : 'ies'} updated, ${failed} failed.`);
      } finally {
        setRunning(false);
        setProgress(null);
        void loadData();
      }
    },
    [running, loadData],
  );

  const rows = useMemo(() => {
    const recordById = new Map(records.map((r) => [r.company_id, r] as const));
    const latestRunById = new Map<string, any>();
    runRows.forEach((row) => {
      const id = String((row && row.company_id) || '');
      if (id && !latestRunById.has(id)) latestRunById.set(id, row); // rows arrive id desc
    });
    return INTEL_COMPANIES.map((company) => ({
      company,
      record: recordById.get(company.id) || null,
      lastRun: latestRunById.get(company.id) || null,
    }));
  }, [records, runRows]);

  const withData = rows.filter((r) => r.record).length;
  const staleCount = rows.filter((r) => {
    const age = intelAgeDays(r.record);
    return r.record && age != null && age >= INTEL_STALE_DAYS;
  }).length;

  return (
    <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="founder-intel-pipeline">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Radar className="h-4 w-4 text-[var(--space-text-brand)]" />
          <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Company intelligence pipeline</h2>
        </div>
        <button
          onClick={() => void rescrape(INTEL_COMPANIES.map((c) => c.id))}
          disabled={running || service !== 'ready'}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--space-brand-primary-600)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-on-primary)] hover:opacity-90 disabled:opacity-50"
          data-testid="intel-rescrape-all"
        >
          {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          {running ? 'Scraping…' : withData === 0 ? 'Run first scrape (all companies)' : 'Re-scrape all now'}
        </button>
      </div>
      <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-muted)]">
        Social listening per program-database company: ITviec · Glassdoor · JobStreet VN · public Facebook groups ·
        LinkedIn · annual reports &amp; press — scraped via web search, AI-filtered with credibility scoring, stored in
        WorkspaceDB. The Direction card shows culture compatibility, difficulty-to-get-in, and company challenges
        wherever a record exists (programs without data keep today's behavior). A daily schedule
        (“{INTEL_SCHEDULE_NAME}”) refreshes up to 5 companies whose data is older than {INTEL_STALE_DAYS} days, so every
        company re-scrapes on a rolling {INTEL_STALE_DAYS}-day cycle.
      </p>

      {service === 'unavailable' && (
        <p className="mt-3 flex items-start gap-1.5 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] px-3 py-2 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="intel-service-warning">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-semantic-warning)]" />
          <span>
            Pipeline hook/schedule could not be deployed from this session: {serviceError} Open this dashboard once
            from App Studio (entrepreneur mode) — it deploys and schedules everything automatically.
          </span>
        </p>
      )}
      {service === 'ready' && scheduleState && (
        <p className="mt-2 text-[11px] text-[var(--space-text-muted)]" data-testid="intel-schedule-status">
          Pipeline service deployed · weekly refresh schedule {scheduleState === 'created' ? 'registered just now' : 'active'} · {withData}/{INTEL_COMPANIES.length} companies have data
          {staleCount > 0 ? ` · ${staleCount} stale (>${INTEL_STALE_DAYS}d)` : ''}
        </p>
      )}

      {progress && (
        <div className="mt-3" data-testid="intel-progress">
          <p className="text-[11px] text-[var(--space-text-secondary)]">
            Scraping {progress.done}/{progress.total}
            {progress.label ? ` — now: ${progress.label}` : ''} (each company ≈ 6 sources + AI analysis; keep this tab
            open)
          </p>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
            <div
              className="h-full rounded-full bg-[var(--space-brand-primary)]"
              style={{ width: `${Math.max(4, Math.round((progress.done / Math.max(1, progress.total)) * 100))}%` }}
            />
          </div>
        </div>
      )}
      {lastRunSummary && <p className="mt-2 text-xs font-medium text-[var(--space-text-secondary)]" data-testid="intel-run-summary">{lastRunSummary}</p>}
      {loadError && (
        <p className="mt-3 rounded-xl border border-[var(--space-semantic-danger)] px-3 py-2 text-xs text-[var(--space-semantic-danger)]">{loadError}</p>
      )}

      {loading ? (
        <p className="mt-3 flex items-center gap-2 text-xs text-[var(--space-text-muted)]">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading intelligence data…
        </p>
      ) : (
        <div className="mt-3 max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wide text-[var(--space-text-muted)]">
                <th className="py-1.5 pr-2 font-semibold">Company</th>
                <th className="py-1.5 pr-2 font-semibold">Last scrape</th>
                <th className="py-1.5 pr-2 font-semibold">Confidence</th>
                <th className="py-1.5 pr-2 text-right font-semibold">Signals</th>
                <th className="py-1.5 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--space-border-default)]">
              {rows.map(({ company, record, lastRun }) => {
                const age = intelAgeDays(record);
                const lastRunFailed = lastRun && String(lastRun.status) === 'error';
                return (
                  <tr key={company.id} data-testid={`intel-row-${company.id}`}>
                    <td className="max-w-[14rem] py-1.5 pr-2">
                      <span className="block truncate font-medium text-[var(--space-text-primary)]" title={company.name}>{company.name}</span>
                      <span className="block truncate text-[10px] text-[var(--space-text-muted)]">{company.industry}</span>
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-2 text-[var(--space-text-secondary)]">
                      {record && record.last_scraped_at ? (
                        <span className={age != null && age >= INTEL_STALE_DAYS ? 'text-[var(--space-semantic-warning)]' : ''}>
                          {age === 0 ? 'today' : `${age}d ago`}
                        </span>
                      ) : (
                        <span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-muted)]">No data yet</span>
                      )}
                      {lastRunFailed && (
                        <span className="ml-1 text-[10px] text-[var(--space-semantic-danger)]" title={String(lastRun.error || '')}>last run failed</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-2">
                      {record ? (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            record.confidence_level === 'high'
                              ? 'bg-[color-mix(in_srgb,var(--space-semantic-success)_12%,transparent)] text-[var(--space-semantic-success)]'
                              : record.confidence_level === 'medium'
                                ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                                : 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_12%,transparent)] text-[var(--space-text-secondary)]'
                          }`}
                        >
                          {intelConfidenceLabel(record.confidence_level)}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[var(--space-text-muted)]">—</span>
                      )}
                    </td>
                    <td className="py-1.5 pr-2 text-right tabular-nums text-[var(--space-text-secondary)]">
                      {record ? record.signals.length : '—'}
                    </td>
                    <td className="py-1.5 text-right">
                      <button
                        onClick={() => void rescrape([company.id])}
                        disabled={running || service !== 'ready'}
                        className="rounded-lg border border-[var(--space-border-default)] px-2 py-1 text-[10px] font-medium text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:opacity-50"
                        data-testid={`intel-rescrape-${company.id}`}
                      >
                        Re-scrape
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CompanyIntelControls() {
  const workspaceId = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';
  const hookUrl = '/api/hooks/execute/workspace-539150/casemate-company-intel-v1';
  const scheduleName = 'Casemate weekly company intelligence refresh';
  const [refreshing, setRefreshing] = useState(false);
  const [progress, setProgress] = useState('');
  const [scheduleStatus, setScheduleStatus] = useState('Checking the 7-day schedule…');

  const callIntelHook = async (payload: Record<string, unknown>) => {
    const response = await fetch(hookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) throw new Error(data.error || `Intel pipeline failed (${response.status})`);
    return data;
  };

  useEffect(() => {
    let cancelled = false;
    const ensureWeeklySchedule = async () => {
      try {
        const listResponse = await fetch(`/api/workspaces/${workspaceId}/schedules`);
        const listData = await listResponse.json().catch(() => ({}));
        if (!listResponse.ok) throw new Error(listData.error || 'Couldn’t read the schedule');
        const existing = (listData.schedules || []).find((schedule: any) => schedule?.name === scheduleName && schedule?.status !== 'cancelled');
        if (existing) {
          if (!cancelled) setScheduleStatus('Automatic refresh every 7 days · active');
          return;
        }
        const createResponse = await fetch(`/api/workspaces/${workspaceId}/schedules`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: scheduleName,
            description: 'Refresh social-listening and competition data for every Casemate company.',
            frequency: 'weekly',
            time: '02:00',
            timezone: 'Asia/Ho_Chi_Minh',
            actionType: 'hook',
            actionPayload: { hookName: 'casemate-company-intel-v1', payload: { action: 'scrape_all', trigger: 'scheduled', deep_scrape: false } },
          }),
        });
        const createData = await createResponse.json().catch(() => ({}));
        if (!createResponse.ok || createData.success === false) throw new Error(createData.error || 'Couldn’t create the schedule');
        if (!cancelled) setScheduleStatus('Automatic refresh every 7 days · enabled');
      } catch (error) {
        if (!cancelled) setScheduleStatus(`Automatic scheduling isn’t enabled: ${error instanceof Error ? error.message : 'unknown error'}`);
      }
    };
    void ensureWeeklySchedule();
    return () => { cancelled = true; };
  }, []);

  const rescrapeAll = async () => {
    if (refreshing) return;
    setRefreshing(true);
    setProgress('Loading the company list…');
    try {
      setProgress('Scanning discussion sources, employer reviews, and press coverage…');
      const result = await callIntelHook({ action: 'scrape_all', trigger: 'manual', catalog_mode: true, deep_scrape: false });
      setProgress(`Complete: ${result.succeeded || 0} / ${result.processed || 0} companies refreshed${result.failed ? ` · ${result.failed} errors logged` : ''}.`);
      window.dispatchEvent(new CustomEvent('company-intel-updated'));
    } catch (error) {
      setProgress(`Couldn’t complete the refresh: ${error instanceof Error ? error.message : 'unknown error'}`);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <section className="mx-4 mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_24%,transparent)] bg-[color-mix(in_srgb,var(--space-brand-primary-500)_6%,transparent)] p-4 md:mx-6" data-testid="company-intel-controls">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold text-[var(--space-text-primary)]">Social listening & competitive rate</p>
          <p className="mt-1 text-xs text-[var(--space-text-muted)]">{scheduleStatus}</p>
          {progress && <p className="mt-2 text-xs font-semibold text-[var(--space-text-brand)]">{progress}</p>}
        </div>
        <button type="button" onClick={() => void rescrapeAll()} disabled={refreshing} className="shrink-0 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-on-primary)] disabled:cursor-not-allowed disabled:opacity-60">
          {refreshing ? 'Re-scraping…' : 'Re-scrape all companies'}
        </button>
      </div>
    </section>
  );
}

export default function UsageDashboard() {
  return <div className="flex h-full min-h-0 flex-col"><CompanyIntelControls /><div className="min-h-0 flex-1"><UsageDashboardContent /></div></div>;
}

function UsageDashboardContent() {
  const { mode, userRole, spaceId, sessionId } = useSpaceRuntime();
  // Founder access: entrepreneur mode (App Studio), an explicit 'founder'
  // session role, or the founder's own OTP-verified sign-in email — so the
  // dashboard also works on the live site under the founder's account.
  const isFounder = mode === 'entrepreneur' || userRole === 'founder' || isFounderEmailSession(spaceId);

  const [rows, setRows] = useState<UsageRow[]>([]);
  const [sessionRows, setSessionRows] = useState<SessionTrackingRow[]>([]);
  const [sessionError, setSessionError] = useState('');
  const [rankingRows, setRankingRows] = useState<PerformanceRow[]>([]);
  const [rankingError, setRankingError] = useState('');
  const [assessmentCount, setAssessmentCount] = useState<number | null>(null);
  const [temporaryTesters, setTemporaryTesters] = useState<TemporaryTesterRow[]>([]);
  const [temporaryTesterError, setTemporaryTesterError] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    setSessionError('');
    setRankingError('');
    setTemporaryTesterError('');
    try {
      const db = (window as any).__workspaceDb;
      if (!db) throw new Error('Workspace database is not available in this view.');

      let all: UsageRow[] = [];
      let offset = 0;
      while (offset < MAX_ROWS) {
        const res = await db
          .from('usage_events', { shared: true })
          .orderBy('created_at', 'asc')
          .limit(PAGE_SIZE)
          .offset(offset)
          .get();
        const page: UsageRow[] = res && Array.isArray(res.data) ? res.data : [];
        all = all.concat(page);
        if (page.length < PAGE_SIZE) break;
        offset += PAGE_SIZE;
      }
      setRows(all);

      try {
        let sessions: SessionTrackingRow[] = [];
        let sessionOffset = 0;
        while (sessionOffset < MAX_ROWS) {
          const sessionCutoff = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
          const res = await db
            .from('session_tracking', { shared: true })
            .gte('date', sessionCutoff)
            .orderBy('started_at', 'asc')
            .limit(PAGE_SIZE)
            .offset(sessionOffset)
            .get();
          const page: SessionTrackingRow[] = res && Array.isArray(res.data) ? res.data : [];
          sessions = sessions.concat(page);
          if (page.length < PAGE_SIZE) break;
          sessionOffset += PAGE_SIZE;
        }
        setSessionRows(sessions);
      } catch (sessionLoadError) {
        setSessionRows([]);
        setSessionError(
          sessionLoadError instanceof Error ? sessionLoadError.message : 'Could not load session duration data.',
        );
      }

      // Seed the percentile pool from completed historical sessions once,
      // then load every ranking row for the founder leaderboard.
      try {
        await ensurePerformanceBenchmarkHistory();
        let rankings: PerformanceRow[] = [];
        let rankingOffset = 0;
        while (rankingOffset < MAX_ROWS) {
          const res = await db
            .from('user_performance_rankings', { shared: true })
            .orderBy('completed_at', 'desc')
            .limit(PAGE_SIZE)
            .offset(rankingOffset)
            .get();
          const page: PerformanceRow[] = res && Array.isArray(res.data) ? res.data : [];
          rankings = rankings.concat(page);
          if (page.length < PAGE_SIZE) break;
          rankingOffset += PAGE_SIZE;
        }
        setRankingRows(rankings);
      } catch (rankingLoadError) {
        setRankingRows([]);
        setRankingError(
          rankingLoadError instanceof Error ? rankingLoadError.message : 'Could not load performance rankings.',
        );
      }

      // Fit assessments happen inside Mate's chat, so count them from their
      // own table instead of app_open events.
      try {
        const count = await db.from('assessment_results', { shared: true }).count();
        setAssessmentCount(typeof count === 'number' ? count : null);
      } catch (e) {
        setAssessmentCount(null);
      }

      // Whitelist emails are never read through the public WorkspaceDB client.
      // The dedicated hook returns them only after server-verifying this
      // founder's signed-in session.
      try {
        setTemporaryTesters(await fetchTemporaryTesters(sessionId || ''));
      } catch (testerLoadError) {
        setTemporaryTesters([]);
        setTemporaryTesterError(
          testerLoadError instanceof Error ? testerLoadError.message : 'Could not load temporary testers.',
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load usage data.');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (isFounder) void load();
  }, [isFounder, load]);

  const stats = useMemo(() => {
    // Founder sign-ins are excluded so the numbers reflect real customers
    // (Desktop also stops logging them going forward; this filters out any
    // founder rows already recorded).
    const customerRows = rows.filter(r => !isFounderEmail(r.email));
    const userDays = new Map<string, Set<string>>();
    const visits = customerRows.filter(r => r.event_type === 'visit');
    customerRows.forEach(r => {
      if (!userDays.has(r.user_key)) userDays.set(r.user_key, new Set());
      userDays.get(r.user_key)!.add(dayOf(r.day));
    });
    const totalUsers = userDays.size;
    const returningUsers = Array.from(userDays.values()).filter(days => days.size >= 2).length;
    const returnRate = totalUsers > 0 ? returningUsers / totalUsers : 0;

    // Per-app: distinct users + total distinct-day opens.
    const appUsers = new Map<string, Set<string>>();
    const appOpens = new Map<string, number>();
    customerRows
      .filter(r => r.event_type === 'app_open' && r.app_id)
      .forEach(r => {
        const id = r.app_id as string;
        if (!appUsers.has(id)) appUsers.set(id, new Set());
        appUsers.get(id)!.add(r.user_key);
        appOpens.set(id, (appOpens.get(id) || 0) + 1);
      });

    // Last 14 days of visit activity (unique users per day).
    const dayUsers = new Map<string, Set<string>>();
    visits.forEach(r => {
      const d = dayOf(r.day);
      if (!dayUsers.has(d)) dayUsers.set(d, new Set());
      dayUsers.get(d)!.add(r.user_key);
    });
    const recentDays = Array.from(dayUsers.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .slice(0, 14)
      .map(([d, users]) => ({ day: d, users: users.size }));

    return {
      totalUsers,
      totalSessions: visits.length,
      returningUsers,
      returnRate,
      appUsers,
      appOpens,
      recentDays,
    };
  }, [rows]);

  const sessionStats = useMemo(() => {
    const todayMs = Date.now();
    const dayKey = (daysAgo: number) =>
      new Date(todayMs - daysAgo * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const finished = sessionRows.filter((row) => {
      const email = row.user_id.startsWith('email:') ? row.user_id.slice(6) : row.user_id;
      return !isFounderEmail(email) && !!row.ended_at && Number(row.duration_seconds) >= 0;
    });
    const averageMinutes = (items: SessionTrackingRow[]) =>
      items.length
        ? items.reduce((sum, row) => sum + Number(row.duration_seconds || 0), 0) / items.length / 60
        : 0;
    const last7 = finished.filter((row) => dayOf(row.date || row.started_at) >= dayKey(6));
    const last30 = finished.filter((row) => dayOf(row.date || row.started_at) >= dayKey(29));
    const bucketCounts = [
      last30.filter((row) => Number(row.duration_seconds) < 2 * 60).length,
      last30.filter((row) => Number(row.duration_seconds) >= 2 * 60 && Number(row.duration_seconds) < 5 * 60).length,
      last30.filter((row) => Number(row.duration_seconds) >= 5 * 60 && Number(row.duration_seconds) < 15 * 60).length,
      last30.filter((row) => Number(row.duration_seconds) >= 15 * 60).length,
    ];
    const distribution = ['Under 2 min', '2–5 min', '5–15 min', '15+ min'].map((label, index) => ({
      label,
      count: bucketCounts[index],
      percent: last30.length ? bucketCounts[index] / last30.length : 0,
    }));
    const daily = Array.from({ length: 14 }, (_, index) => dayKey(13 - index)).map((day) => {
      const sessions = finished.filter((row) => dayOf(row.date || row.started_at) === day);
      return { day, sessions: sessions.length, averageMinutes: averageMinutes(sessions) };
    });
    return {
      average7Minutes: averageMinutes(last7),
      average30Minutes: averageMinutes(last30),
      sessions7: last7.length,
      sessions30: last30.length,
      distribution,
      daily,
    };
  }, [sessionRows]);

  const performance = useMemo(() => {
    return (Object.keys(PERFORMANCE_LABELS) as PerformanceRow['app'][]).map((app) => {
      const attempts = rankingRows
        .filter((row) => row.app === app)
        .sort((a, b) => Number(b.score) - Number(a.score) || Number(a.time_seconds) - Number(b.time_seconds));
      const total = attempts.length;
      const averageScore = total
        ? attempts.reduce((sum, row) => sum + Number(row.score), 0) / total
        : 0;
      const averageTime = total
        ? attempts.reduce((sum, row) => sum + Number(row.time_seconds), 0) / total
        : 0;
      const ranked = attempts.map((row, index) => ({
        ...row,
        rank: index + 1,
        scorePercentile: total
          ? Math.round((attempts.filter((peer) => Number(peer.score) < Number(row.score)).length / total) * 100)
          : 0,
        speedPercentile: total
          ? Math.round(
              (attempts.filter((peer) => Number(peer.time_seconds) > Number(row.time_seconds)).length / total) * 100,
            )
          : 0,
      }));
      return { app, attempts: ranked, total, averageScore, averageTime };
    });
  }, [rankingRows]);

  // Program Readiness Score distribution: one holistic 0-100 score per user
  // (same aggregation as the customer-facing card in lib/readinessScore.ts).
  const readiness = useMemo(() => {
    const byUser = computeReadinessByUser(rankingRows);
    const users = Array.from(byUser.values())
      .map((user) => ({ ...user, rounded: Math.round(user.score), tier: readinessTier(user.score) }))
      .sort((a, b) => b.score - a.score);
    const average = users.length ? users.reduce((sum, user) => sum + user.score, 0) / users.length : 0;
    const buckets = READINESS_TIERS.map((tier) => ({
      tier,
      count: users.filter((user) => user.rounded >= tier.min && user.rounded <= tier.max).length,
    }));
    return { users, average, buckets };
  }, [rankingRows]);

  if (!isFounder) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[var(--space-surface-page)] p-8">
        <div className="max-w-sm rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-8 text-center">
          <Lock className="mx-auto h-8 w-8 text-[var(--space-text-muted)]" />
          <h1 className="mt-3 text-base font-semibold text-[var(--space-text-primary)]">Founder-only area</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">
            This internal dashboard is only visible to the Casemate team. Your fit assessment and
            practice tools are all in the sidebar.
          </p>
        </div>
      </div>
    );
  }

  const maxDayUsers = Math.max(1, ...stats.recentDays.map(d => d.users));
  const maxSessionDayMinutes = Math.max(1, ...sessionStats.daily.map((day) => day.averageMinutes));

  return (
    <div className="flex min-h-full w-full flex-col bg-[var(--space-surface-page)]">
      {/* Full-bleed, like the rest of Casemate — a dashboard reads better the
          more width its charts and tables get. */}
      <div className="w-full space-y-4 p-4 sm:p-6 lg:px-8 xl:px-12">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-bold text-[var(--space-text-primary)]">Usage &amp; retention</h1>
            <p className="text-xs text-[var(--space-text-muted)]">
              Founder view — customers never see this. Legacy visit totals are counted once per person per day;
              Session Duration uses each authenticated visit. Your own founder sign-in is excluded.
            </p>
          </div>
          <button
            onClick={() => void load()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] px-4 py-3 text-sm text-[var(--space-semantic-danger)]">
            {error}
          </div>
        )}

        {loading && rows.length === 0 ? (
          <div className="flex items-center gap-2 py-10 text-sm text-[var(--space-text-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading usage data…
          </div>
        ) : (
          <>
            {/* Headline metrics */}
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard
                icon={Users}
                label="Distinct users"
                value={String(stats.totalUsers)}
                sub="Unique people (by sign-in email)"
              />
              <StatCard
                icon={CalendarDays}
                label="Tracked visit days"
                value={String(stats.totalSessions)}
                sub="Legacy metric: 1 per user per day per device"
              />
              <StatCard
                icon={Repeat}
                label="Return-visitor rate"
                value={formatPercent(stats.returnRate)}
                sub={`${stats.returningUsers} of ${stats.totalUsers} users came back on a later day`}
              />
            </div>

            {/* Temporary tester whitelist — founder-only server read */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="founder-temporary-testers">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[var(--space-text-brand)]" />
                <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Temporary tester access</h2>
              </div>
              <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-muted)]">
                Internal whitelist only. Each tester receives Casemate Pro through 30 days after their trial-end date, inclusive; paid subscriptions remain authoritative.
              </p>
              {temporaryTesterError ? (
                <p className="mt-3 rounded-xl border border-[var(--space-semantic-danger)] px-3 py-2 text-xs text-[var(--space-semantic-danger)]">
                  {temporaryTesterError}
                </p>
              ) : temporaryTesters.length === 0 ? (
                <p className="mt-3 text-xs text-[var(--space-text-muted)]">No temporary testers.</p>
              ) : (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[36rem] text-left text-xs">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-wide text-[var(--space-text-muted)]">
                        <th className="py-1.5 pr-3 font-semibold">Email</th>
                        <th className="py-1.5 pr-3 font-semibold">Trial ends</th>
                        <th className="py-1.5 pr-3 font-semibold">Free until</th>
                        <th className="py-1.5 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--space-border-default)]">
                      {temporaryTesters.map((tester) => (
                        <tr key={tester.id}>
                          <td className="py-2 pr-3 font-medium text-[var(--space-text-primary)]">{tester.email}</td>
                          <td className="whitespace-nowrap py-2 pr-3 tabular-nums text-[var(--space-text-secondary)]">{tester.trial_end_date}</td>
                          <td className="whitespace-nowrap py-2 pr-3 tabular-nums text-[var(--space-text-secondary)]">{tester.free_until}</td>
                          <td className="py-2">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tester.active ? 'bg-[color-mix(in_srgb,var(--space-semantic-success)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>
                              {tester.active ? 'User Tester' : 'Tester Expired'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Session duration */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="founder-session-duration">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[var(--space-text-brand)]" />
                <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Session Duration</h2>
              </div>
              <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-muted)]">
                Authenticated customer visits. Active sessions refresh every minute; hidden or idle tabs are finalized automatically.
              </p>
              {sessionError && (
                <p className="mt-3 rounded-xl border border-[var(--space-semantic-danger)] px-3 py-2 text-xs text-[var(--space-semantic-danger)]">
                  {sessionError}
                </p>
              )}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard
                  icon={Clock3}
                  label="Average session · 7 days"
                  value={`${sessionStats.average7Minutes.toFixed(1)} min`}
                  sub={`${sessionStats.sessions7} session${sessionStats.sessions7 === 1 ? '' : 's'}`}
                />
                <StatCard
                  icon={CalendarDays}
                  label="Average session · 30 days"
                  value={`${sessionStats.average30Minutes.toFixed(1)} min`}
                  sub={`${sessionStats.sessions30} session${sessionStats.sessions30 === 1 ? '' : 's'}`}
                />
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <section>
                  <h3 className="text-xs font-semibold text-[var(--space-text-primary)]">Length distribution · last 30 days</h3>
                  <div className="mt-2 space-y-2">
                    {sessionStats.distribution.map((bucket) => (
                      <div key={bucket.label}>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[var(--space-text-secondary)]">{bucket.label}</span>
                          <span className="font-semibold tabular-nums text-[var(--space-text-primary)]">
                            {formatPercent(bucket.percent)} <span className="font-normal text-[var(--space-text-muted)]">({bucket.count})</span>
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
                          <div
                            className="h-full rounded-full bg-[var(--space-brand-primary)]"
                            style={{ width: `${bucket.count > 0 ? Math.max(3, Math.round(bucket.percent * 100)) : 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-semibold text-[var(--space-text-primary)]">Daily average · last 14 days</h3>
                  <div className="mt-2 space-y-1.5" data-testid="session-duration-daily-chart">
                    {sessionStats.daily.map((day) => (
                      <div key={day.day} className="flex items-center gap-2">
                        <span className="w-20 flex-shrink-0 text-[10px] tabular-nums text-[var(--space-text-muted)]">{day.day.slice(5)}</span>
                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
                          <div
                            className="h-full rounded-full bg-[var(--space-brand-primary)]"
                            style={{
                              width: `${day.sessions > 0 ? Math.max(4, Math.round((day.averageMinutes / maxSessionDayMinutes) * 100)) : 0}%`,
                            }}
                          />
                        </div>
                        <span className="w-20 flex-shrink-0 text-right text-[10px] font-semibold tabular-nums text-[var(--space-text-primary)]">
                          {day.sessions > 0 ? `${day.averageMinutes.toFixed(1)} min` : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Per-app usage */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[var(--space-text-brand)]" />
                <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Which tools get used</h2>
              </div>
              <div className="mt-3 divide-y divide-[var(--space-border-default)]">
                <div className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-2 text-sm text-[var(--space-text-primary)]">
                    <Sparkles className="h-4 w-4 text-[var(--space-text-brand)]" />
                    Fit assessment (in Mate's chat)
                  </span>
                  <span className="text-sm font-semibold text-[var(--space-text-primary)]">
                    {assessmentCount != null ? `${assessmentCount} saved results` : 'n/a'}
                  </span>
                </div>
                {Object.entries(APP_LABELS).map(([appId, label]) => {
                  const users = stats.appUsers.get(appId)?.size || 0;
                  const opens = stats.appOpens.get(appId) || 0;
                  return (
                    <div key={appId} className="flex items-center justify-between py-2.5">
                      <span className="text-sm text-[var(--space-text-primary)]">{label}</span>
                      <span className="text-sm text-[var(--space-text-secondary)]">
                        <span className="font-semibold text-[var(--space-text-primary)]">{users}</span> distinct users
                        <span className="text-[var(--space-text-muted)]"> · {opens} user-days</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] leading-5 text-[var(--space-text-muted)]">
                App usage counts every distinct user who opened the tool since v1.1 shipped.
                Fit-assessment count comes from saved assessment results (all-time).
              </p>
            </div>

            {/* Company intelligence pipeline (social listening) */}
            <IntelPipelineSection />

            {/* Percentile pools + all-user leaderboard */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="founder-performance-rankings">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[var(--space-text-brand)]" />
                <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Performance rankings</h2>
              </div>
              <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-muted)]">
                Every completed scored session across Case Pool, Case Drill, and Aptitude Test. Historical results are included automatically; score is normalized to 100 and lower time is better.
              </p>

              {rankingError ? (
                <p className="mt-3 rounded-xl border border-[var(--space-semantic-danger)] px-3 py-2 text-xs text-[var(--space-semantic-danger)]">
                  {rankingError}
                </p>
              ) : (
                <div className="mt-3 grid gap-3 xl:grid-cols-3">
                  {performance.map((pool) => (
                    <section key={pool.app} className="min-w-0 rounded-xl border border-[var(--space-border-default)] p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xs font-bold text-[var(--space-text-primary)]">{PERFORMANCE_LABELS[pool.app]}</h3>
                          <p className="mt-0.5 text-[10px] text-[var(--space-text-muted)]">
                            {pool.total} attempt{pool.total === 1 ? '' : 's'}
                            {pool.total ? ` · avg ${Math.round(pool.averageScore)}% · ${formatDuration(pool.averageTime)}` : ''}
                          </p>
                        </div>
                        <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">
                          {pool.total >= MIN_RANKING_RECORDS ? 'Live' : 'Building'}
                        </span>
                      </div>

                      {pool.total === 0 ? (
                        <p className="mt-3 text-xs leading-5 text-[var(--space-text-secondary)]">
                          No completed results yet. The first finisher will set the benchmark.
                        </p>
                      ) : (
                        <ol className="mt-2 max-h-80 space-y-2 overflow-y-auto pr-1">
                          {pool.attempts.map((attempt) => (
                            <li key={attempt.id} className="rounded-lg bg-[var(--space-surface-muted)] p-2.5">
                              <div className="flex min-w-0 items-center gap-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-card)] text-[9px] font-bold text-[var(--space-text-brand)]">
                                  {attempt.rank}
                                </span>
                                <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-[var(--space-text-primary)]" title={attempt.user_id}>
                                  {performanceUserLabel(attempt.user_id)}
                                </span>
                                <span className="shrink-0 text-[10px] font-bold tabular-nums text-[var(--space-text-primary)]">
                                  {Math.round(Number(attempt.score))}% · {formatDuration(Number(attempt.time_seconds))}
                                </span>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-2 text-[9px] text-[var(--space-text-muted)]">
                                <div>
                                  <span>Score p{attempt.scorePercentile}</span>
                                  <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-card)]">
                                    <div className="h-full rounded-full bg-[var(--space-brand-primary-600)]" style={{ width: `${Math.max(3, attempt.scorePercentile)}%` }} />
                                  </div>
                                </div>
                                <div>
                                  <span className="inline-flex items-center gap-0.5"><Zap className="h-2.5 w-2.5" /> Speed p{attempt.speedPercentile}</span>
                                  <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-card)]">
                                    <div className="h-full rounded-full bg-[var(--space-brand-primary-600)]" style={{ width: `${Math.max(3, attempt.speedPercentile)}%` }} />
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </section>
                  ))}
                </div>
              )}
            </div>

            {/* Program Readiness distribution */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5" data-testid="founder-readiness-distribution">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[var(--space-text-brand)]" />
                <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Program Readiness distribution</h2>
              </div>
              <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-muted)]">
                One holistic score per user — Case Pool 40% · Case Drill 35% · Aptitude Test 25%,
                rebalanced over the apps each user has tried. Anonymous historical attempts count as
                single-result users, same as the percentile pools.
              </p>

              {rankingError ? (
                <p className="mt-3 rounded-xl border border-[var(--space-semantic-danger)] px-3 py-2 text-xs text-[var(--space-semantic-danger)]">
                  {rankingError}
                </p>
              ) : readiness.users.length === 0 ? (
                <p className="mt-3 text-sm text-[var(--space-text-secondary)]">
                  No readiness scores yet — the first completed scored session creates one.
                </p>
              ) : (
                <>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <StatCard
                      icon={Users}
                      label="Users with a score"
                      value={String(readiness.users.length)}
                      sub="Everyone with at least one scored session"
                    />
                    <StatCard
                      icon={Trophy}
                      label="Average readiness"
                      value={`${Math.round(readiness.average)}/100`}
                      sub={`Average tier: ${readinessTier(readiness.average).label}`}
                    />
                  </div>

                  <div className="mt-4 space-y-1.5" data-testid="readiness-tier-histogram">
                    {readiness.buckets.map(({ tier, count }) => (
                      <div key={tier.label} className="flex items-center gap-3">
                        <span className="w-32 flex-shrink-0 text-xs text-[var(--space-text-muted)]">
                          {tier.label} ({tier.min}–{tier.max})
                        </span>
                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
                          <div
                            className="h-full rounded-full bg-[var(--space-brand-primary)]"
                            style={{
                              width: `${count > 0 ? Math.max(4, Math.round((count / Math.max(1, readiness.users.length)) * 100)) : 0}%`,
                            }}
                          />
                        </div>
                        <span className="w-8 flex-shrink-0 text-right text-xs font-semibold tabular-nums text-[var(--space-text-primary)]">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 max-h-72 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-wide text-[var(--space-text-muted)]">
                          <th className="py-1.5 pr-2 font-semibold">User</th>
                          <th className="py-1.5 pr-2 font-semibold">Apps covered</th>
                          <th className="py-1.5 pr-2 text-right font-semibold">Score</th>
                          <th className="py-1.5 font-semibold">Tier</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--space-border-default)]">
                        {readiness.users.map((user) => (
                          <tr key={user.userId}>
                            <td className="max-w-[16rem] truncate py-1.5 pr-2 text-[var(--space-text-primary)]" title={user.userId}>
                              {performanceUserLabel(user.userId)}
                            </td>
                            <td className="py-1.5 pr-2 text-[var(--space-text-muted)]">
                              {user.appsWithResults.map((app) => PERFORMANCE_LABELS[app]).join(', ')}
                            </td>
                            <td className="py-1.5 pr-2 text-right font-semibold tabular-nums text-[var(--space-text-primary)]">
                              {user.rounded}
                            </td>
                            <td className="py-1.5">
                              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">
                                {user.tier.label}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            {/* Recent daily actives */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Daily active users (last 14 tracked days)</h2>
              {stats.recentDays.length === 0 ? (
                <p className="mt-3 text-sm text-[var(--space-text-secondary)]">
                  No visits tracked yet — data starts flowing as soon as customers use the space on
                  this release.
                </p>
              ) : (
                <div className="mt-3 space-y-1.5">
                  {stats.recentDays.map(({ day, users }) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="w-24 flex-shrink-0 text-xs tabular-nums text-[var(--space-text-muted)]">{day}</span>
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
                        <div
                          className="h-full rounded-full bg-[var(--space-brand-primary)]"
                          style={{ width: `${Math.max(4, Math.round((users / maxDayUsers) * 100))}%` }}
                        />
                      </div>
                      <span className="w-8 flex-shrink-0 text-right text-xs font-semibold tabular-nums text-[var(--space-text-primary)]">
                        {users}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
