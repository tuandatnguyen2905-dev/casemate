// Casemate — the percentile ranking card shown on the result screens of Case
// Pool, Case Drill, and the Aptitude Test (performance-rankings-v1).
//
// One compact card, two rows: score ranking ("You scored higher than X% of
// users") and speed ranking ("You completed faster than X% of users"), each
// with a horizontal bar filled to the percentile. Mounting it SUBMITS the
// session to the shared user_performance_rankings pool through the built-in
// WorkspaceDB client, which computes the comparison with server-side
// aggregates — so only render it for a session completed on this page load,
// with a submissionKey unique to that completion. lib/performanceRankings.ts
// dedupes repeat mounts of the same key, so re-renders never double-count.
//
// Degrades gracefully: the first result gets a friendly benchmark message,
// and a temporary persistence error stays visible as a small retry-later note
// instead of making the entire percentile feature appear to be missing.

import { useEffect, useState } from 'react';
import { BarChart3, Loader2, TrendingUp, Zap } from 'lucide-react';
import ReadinessScoreCard from './ReadinessScoreCard';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { submitPerformanceRecord, MIN_RANKING_RECORDS } from '../lib/performanceRankings';
import type { RankingApp, RankingResult } from '../lib/performanceRankings';

function RankRow({
  icon: Icon,
  label,
  sentence,
  percentile,
}: {
  icon: typeof BarChart3;
  label: string;
  sentence: string;
  percentile: number;
}) {
  const topShare = Math.max(1, 100 - percentile);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
        <span className="text-xs font-bold text-[var(--space-text-primary)]">{label}</span>
        <span className="ml-auto rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">
          Top {topShare}%
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">{sentence}</p>
      <div
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--space-surface-muted)]"
        role="progressbar"
        aria-valuenow={percentile}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: better than ${percentile}% of users`}
      >
        <div
          className="h-full rounded-full bg-[var(--space-brand-primary-600)]"
          style={{ width: `${Math.max(4, Math.min(100, percentile))}%` }}
        />
      </div>
    </div>
  );
}

export default function PercentileRankingWidget({
  app,
  scorePercent,
  timeSeconds,
  submissionKey,
  className = '',
}: {
  /** Which ranking pool this session belongs to. */
  app: RankingApp;
  /** Score normalized to 0–100 (0–5 grades × 20; aptitude percent as-is). */
  scorePercent: number;
  /** Seconds the session took, start to submission. */
  timeSeconds: number;
  /** Unique per completed session — dedupes the insert across re-mounts. */
  submissionKey: string;
  className?: string;
}) {
  const { spaceId, sessionId } = useSpaceRuntime();
  const [result, setResult] = useState<RankingResult | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setResult(null);
    submitPerformanceRecord({ app, scorePercent, timeSeconds, spaceId, sessionId, submissionKey })
      .then((ranking) => {
        if (cancelled) return;
        setResult(ranking);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
    // Everything that matters is captured by the submission key — the other
    // props describe the same completed session and never change under it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionKey]);

  return (
    <div
      className={`rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5 ${className}`}
      data-testid="percentile-ranking-widget"
    >
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
        <TrendingUp className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
        How you rank against other users
      </p>

      {status === 'loading' ? (
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--space-text-muted)]" data-testid="ranking-loading">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Comparing your result with everyone else’s…
        </p>
      ) : status === 'error' ? (
        <p className="mt-2 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid="ranking-unavailable">
          Your result is safe, but the shared benchmark is temporarily unavailable. It will be included the next time you complete a session.
        </p>
      ) : result && result.sufficientData && result.scorePercentile != null && result.speedPercentile != null ? (
        <div className="mt-2.5 space-y-3" data-testid="ranking-rows">
          <RankRow
            icon={BarChart3}
            label="Score ranking"
            sentence={`You scored higher than ${result.scorePercentile}% of users`}
            percentile={result.scorePercentile}
          />
          <RankRow
            icon={Zap}
            label="Speed ranking"
            sentence={`You completed faster than ${result.speedPercentile}% of users`}
            percentile={result.speedPercentile}
          />
        </div>
      ) : (
        <p className="mt-2 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid="ranking-not-enough-data">
          {result?.totalRecords === 1
            ? `You’re the first to set a benchmark! Your score and speed are saved; percentiles appear once at least ${MIN_RANKING_RECORDS} results are in.`
            : `Not enough data yet — your result is saved (${result?.totalRecords ?? 0} of ${MIN_RANKING_RECORDS} so far); rankings unlock at ${MIN_RANKING_RECORDS} results.`}
        </p>
      )}

      {/* Cross-app Program Readiness Score — rendered once the submission has
          settled, so the fresh session is already counted in the aggregate. */}
      {status !== 'loading' && (
        <ReadinessScoreCard
          variant="compact"
          className="mt-3 border-t border-[var(--space-border-default)] pt-3"
        />
      )}
    </div>
  );
}
