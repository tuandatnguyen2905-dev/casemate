// Casemate — Program Readiness Score card.
//
// One holistic 0-100 score aggregated across Case Pool (40%), Case Drill
// (35%), and the Aptitude Test (25%), rebalanced proportionally over the apps
// the user has actually attempted, with a pass-likelihood tier and the user's
// percentile among ALL Casemate users who hold a readiness score.
//
// Two variants:
//   - "full"    — the hero card in the Your Readiness dock app: big score,
//                 tier, percentile bar, per-app breakdown with effective
//                 weights, and the "complete your profile" prompt with deep
//                 links to untried apps.
//   - "compact" — the "Overall Readiness" strip on each app's result screen
//                 (rendered by PercentileRankingWidget below the app-specific
//                 percentile), so users see the cross-app score right where
//                 they just finished a session.
//
// Data is read-only here (lib/readinessScore.ts); result screens already
// record sessions through lib/performanceRankings.ts, which dispatches
// READINESS_UPDATED_EVENT so any mounted card refreshes automatically.

import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Award, BarChart3, Hexagon, Loader2, Target, TrendingUp, Zap } from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import {
  loadReadinessOverview,
  READINESS_UPDATED_EVENT,
  MIN_READINESS_POOL,
} from '../lib/readinessScore';
import type { ReadinessOverview } from '../lib/readinessScore';
import type { RankingApp } from '../lib/performanceRankings';

const APP_ICONS: Record<RankingApp, typeof Target> = {
  case_pool: Target,
  case_drill: Zap,
  aptitude_test: Hexagon,
};

function openDockApp(appId: string) {
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
}

export default function ReadinessScoreCard({
  variant = 'full',
  className = '',
  showMethodology = true,
}: {
  variant?: 'full' | 'compact';
  className?: string;
  showMethodology?: boolean;
}) {
  const { spaceId, sessionId } = useSpaceRuntime();
  const [overview, setOverview] = useState<ReadinessOverview | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const load = useCallback(async () => {
    try {
      const next = await loadReadinessOverview(spaceId, sessionId);
      setOverview(next);
      setStatus('ready');
    } catch {
      setStatus((previous) => (previous === 'ready' ? 'ready' : 'error'));
    }
  }, [spaceId, sessionId]);

  useEffect(() => {
    void load();
    const onUpdated = () => void load();
    window.addEventListener(READINESS_UPDATED_EVENT, onUpdated);
    return () => window.removeEventListener(READINESS_UPDATED_EVENT, onUpdated);
  }, [load]);

  const missingApps = overview?.breakdown.filter((entry) => entry.averageScore == null) || [];

  // ---- Compact variant: the "Overall Readiness" strip on result screens ----
  if (variant === 'compact') {
    if (status === 'error') return null;
    return (
      <div className={className} data-testid="overall-readiness">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
          <Award className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
          Overall Readiness
          <span className="font-medium normal-case tracking-normal">— across all Casemate practice apps</span>
        </p>
        {status === 'loading' || !overview ? (
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--space-text-muted)]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Updating your Program Readiness Score…
          </p>
        ) : overview.score == null || !overview.tier ? (
          <p className="mt-2 text-[11px] leading-4 text-[var(--space-text-muted)]">
            Complete a scored session in any practice app to unlock your Program Readiness Score.
          </p>
        ) : (
          <div className="mt-2" data-testid="overall-readiness-score">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-bold leading-none text-[var(--space-text-primary)]">
                {overview.score}
                <span className="text-[11px] font-semibold text-[var(--space-text-muted)]">/100</span>
              </span>
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">
                {overview.tier.label}
              </span>
              {overview.percentile != null && (
                <span className="text-[11px] text-[var(--space-text-secondary)]">
                  Higher than {overview.percentile}% of users
                </span>
              )}
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
              <div
                className="h-full rounded-full bg-[var(--space-brand-primary-600)]"
                style={{ width: `${Math.max(4, Math.min(100, overview.score))}%` }}
              />
            </div>
            {overview.percentile == null && (
              <p className="mt-1 text-[10px] text-[var(--space-text-muted)]">
                Percentile unlocks once {MIN_READINESS_POOL} users hold a readiness score ({overview.poolUserCount} so far).
              </p>
            )}
            {missingApps.length > 0 && (
              <p className="mt-1 text-[10px] leading-4 text-[var(--space-text-muted)]">
                Complete{' '}
                {missingApps.map((entry, index) => (
                  <span key={entry.app}>
                    {index > 0 && (index === missingApps.length - 1 ? ' and ' : ', ')}
                    <button
                      type="button"
                      onClick={() => openDockApp(entry.dockAppId)}
                      className="font-semibold text-[var(--space-text-brand)] underline underline-offset-2"
                    >
                      {entry.label}
                    </button>
                  </span>
                ))}{' '}
                for a more accurate readiness score.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // ---- Full variant: the hero card in the Your Readiness app ----
  return (
    <div
      className={`rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 ${className}`}
      data-testid="readiness-score-card"
    >
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">
        <Award className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
        Program Readiness Score
      </p>

      {status === 'loading' ? (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-[var(--space-text-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Aggregating your results across Case Pool, Case Drill, and Aptitude Test…
        </p>
      ) : status === 'error' ? (
        <p className="mt-3 text-sm leading-6 text-[var(--space-text-muted)]">
          Your readiness score is temporarily unavailable — it will be back the next time you open
          this view.
        </p>
      ) : overview && overview.score != null && overview.tier ? (
        <div className="mt-3 space-y-4">
          {/* Score + tier */}
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
            <span className="text-5xl font-bold leading-none text-[var(--space-text-primary)]" data-testid="readiness-score-value">
              {overview.score}
              <span className="text-lg font-semibold text-[var(--space-text-muted)]">/100</span>
            </span>
            <div>
              <span className="inline-block rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--space-text-brand)]" data-testid="readiness-tier">
                {overview.tier.label}
              </span>
              <p className="mt-1 text-xs text-[var(--space-text-secondary)]">{overview.tier.description}</p>
            </div>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
            <div
              className="h-full rounded-full bg-[var(--space-brand-primary-600)]"
              style={{ width: `${Math.max(4, Math.min(100, overview.score))}%` }}
            />
          </div>

          {/* Percentile */}
          {overview.percentile != null ? (
            <div className="rounded-xl bg-[var(--space-surface-muted)] p-3" data-testid="readiness-percentile">
              <div className="flex flex-wrap items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" />
                <span className="text-xs font-bold text-[var(--space-text-primary)]">
                  You scored higher than {overview.percentile}% of all Casemate users
                </span>
                <span className="ml-auto rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">
                  Top {Math.max(1, 100 - overview.percentile)}%
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--space-surface-card)]">
                <div
                  className="h-full rounded-full bg-[var(--space-brand-primary-600)]"
                  style={{ width: `${Math.max(4, Math.min(100, overview.percentile))}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]">
              Your percentile among all Casemate users unlocks once {MIN_READINESS_POOL} users hold a
              readiness score — {overview.poolUserCount} so far. Your score is already in the pool.
            </p>
          )}

          {showMethodology && (
            <>
              {/* Per-app breakdown */}
              <div className="space-y-2" data-testid="readiness-breakdown">
            {overview.breakdown.map((entry) => {
              const Icon = APP_ICONS[entry.app] || BarChart3;
              return (
                <div key={entry.app} className="rounded-xl border border-[var(--space-border-default)] p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
                    <span className="text-xs font-bold text-[var(--space-text-primary)]">{entry.label}</span>
                    {entry.averageScore != null ? (
                      <span className="ml-auto text-xs text-[var(--space-text-secondary)]">
                        avg <span className="font-bold text-[var(--space-text-primary)]">{Math.round(entry.averageScore)}%</span>
                        {' · '}
                        {entry.attempts} session{entry.attempts === 1 ? '' : 's'}
                        {' · '}
                        weight {entry.effectiveWeight}%
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openDockApp(entry.dockAppId)}
                        className="ml-auto inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--space-text-brand)] hover:opacity-90"
                      >
                        Not tried yet — start
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  {entry.averageScore != null && (
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
                      <div
                        className="h-full rounded-full bg-[var(--space-brand-primary-600)]"
                        style={{ width: `${Math.max(3, Math.min(100, Math.round(entry.averageScore)))}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Complete your profile */}
          {missingApps.length > 0 && (
            <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3" data-testid="readiness-complete-profile">
              <p className="text-xs font-bold text-[var(--space-text-primary)]">Complete your profile</p>
              <p className="mt-1 text-[11px] leading-5 text-[var(--space-text-secondary)]">
                Your score currently covers {3 - missingApps.length} of 3 practice apps — untried apps
                don’t count against you, but completing them makes the score a much better predictor.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {missingApps.map((entry) => (
                  <button
                    key={entry.app}
                    type="button"
                    onClick={() => openDockApp(entry.dockAppId)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--space-brand-primary-600)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-on-primary)] hover:opacity-90"
                  >
                    Complete {entry.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

              <p className="text-[10px] leading-4 text-[var(--space-text-muted)]">
                Weighted average of your app averages — Case Pool 40%, Case Drill 35%, Aptitude Test 25%
                (weights rebalance over the apps you’ve tried). Updates automatically after every graded
                case, drill, or test.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="mt-3" data-testid="readiness-empty">
          <p className="text-sm leading-6 text-[var(--space-text-secondary)]">
            Complete your first scored session in any practice app and your Program Readiness Score
            appears here — one number out of 100 across everything you practise, with your standing
            among all Casemate users.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {overview?.breakdown.map((entry) => {
              const Icon = APP_ICONS[entry.app] || BarChart3;
              return (
                <button
                  key={entry.app}
                  type="button"
                  onClick={() => openDockApp(entry.dockAppId)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-brand)] hover:opacity-90"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {entry.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
