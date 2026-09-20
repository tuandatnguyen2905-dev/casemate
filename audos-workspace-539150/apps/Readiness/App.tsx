// Casemate — Program Readiness Score content, embedded in My Roadmap.
//
// A returning candidate's live preparation checkpoint after any practice: one
// holistic 0-100 score aggregated across Case Pool (40%), Case Drill (35%),
// and the Aptitude Test (25%), a pass-likelihood tier, and their percentile
// among all Casemate users. The heavy lifting (aggregation, rebalancing,
// percentile, auto-refresh) lives in components/ReadinessScoreCard.tsx +
// lib/readinessScore.ts — this app frames it with the tier ladder and an
// explanation of how the score works. Free for everyone, no paywall.

import { Award, BookOpen, Hexagon, Target, Zap } from 'lucide-react';
import ReadinessScoreCard from '../../components/ReadinessScoreCard';
import { READINESS_TIERS, READINESS_WEIGHTS, READINESS_APP_META } from '../../lib/readinessScore';
import type { RankingApp } from '../../lib/performanceRankings';

const APP_ICONS: Record<RankingApp, typeof Target> = {
  case_pool: Target,
  case_drill: Zap,
  aptitude_test: Hexagon,
};

function openDockApp(appId: string) {
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
}

export default function ReadinessApp({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={embedded ? 'w-full' : 'flex min-h-full w-full flex-col bg-[var(--space-surface-page)]'}>
      <div className={embedded ? 'space-y-4' : 'mx-auto w-full max-w-3xl space-y-4 p-4 sm:p-6'}>
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-[var(--space-text-primary)]">
            <Award className="h-5 w-5 text-[var(--space-text-brand)]" />
            {embedded ? 'Readiness checkpoint' : 'Program readiness'}
          </h2>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">
            Track what is already strong, spot missing practice, and focus your next roadmap steps.
            Your score combines every graded case, drill, and aptitude test and updates after each session.
          </p>
        </div>

        <ReadinessScoreCard variant="full" showMethodology={!embedded} />

        {!embedded && (
          <>
            {/* Tier ladder */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">The readiness ladder</h2>
              <div className="mt-3 space-y-2">
                {READINESS_TIERS.map((tier) => (
                  <div key={tier.label} className="flex items-center gap-3">
                    <span className="w-16 shrink-0 text-right text-[11px] font-semibold tabular-nums text-[var(--space-text-muted)]">
                      {tier.min}–{tier.max}
                    </span>
                    <span className="w-24 shrink-0 rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-center text-[10px] font-bold text-[var(--space-text-brand)]">
                      {tier.label}
                    </span>
                    <span className="min-w-0 text-xs text-[var(--space-text-secondary)]">{tier.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How it's computed + where to earn points */}
            <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5">
              <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">How the score is built</h2>
              <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                Each app contributes the average of all your scored sessions there, weighted by how much
                that skill matters in real MT/consulting selection. Apps you haven’t tried are left out
                (their weight is shared across the rest) — so an untried app never lowers your score,
                it just makes the picture less complete.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {(Object.keys(READINESS_APP_META) as RankingApp[]).map((app) => {
                  const meta = READINESS_APP_META[app];
                  const Icon = APP_ICONS[app] || BookOpen;
                  return (
                    <button
                      key={app}
                      type="button"
                      onClick={() => openDockApp(meta.dockAppId)}
                      className="rounded-xl border border-[var(--space-border-default)] p-3 text-left hover:bg-[var(--space-surface-muted)]"
                    >
                      <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--space-text-primary)]">
                        <Icon className="h-4 w-4 text-[var(--space-text-brand)]" />
                        {meta.label}
                      </span>
                      <span className="mt-1 block text-[11px] text-[var(--space-text-muted)]">
                        weight {READINESS_WEIGHTS[app]}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
