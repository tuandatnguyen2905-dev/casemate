// Casemate — My Roadmap: "Overall Learning Progress".
//
// Informational summary of completion across the whole saved plan, separate
// from the weekly goals. It reads the same bucketed Case Pool / Case Drill /
// Aptitude Test sessions as "Your Progress This Week" and the timeline
// (bucketPracticeSessions in lib/roadmapProgress.ts), so its numbers reconcile
// with them:
//   - per week and category, completion is min(unique sessions finished in that
//     assigned week, that week's target); anything above the target is "extra"
//     and is reported separately, never added to scheduled progress
//   - category progress sums the capped completions over every week; overall
//     progress is the sum of the three categories over the sum of the targets
//   - Domain Knowledge has no weekly targets in the roadmap, so it is not here
// No buttons: practice CTAs live only in "Recommended for Your Target Program".

import { Hexagon, Loader2, Target, Zap } from 'lucide-react';
import { goalProgress } from '../../lib/roadmapProgress';
import type { RoadmapWeek, WeekProgress } from '../../lib/prepRoadmap';

export type OverallProgressStatus = 'loading' | 'ready' | 'unavailable';

interface CategoryDef {
  key: 'case_pool' | 'case_drill' | 'aptitude';
  label: string;
  icon: typeof Target;
  targetOf: (week: RoadmapWeek) => number;
  doneOf: (progress: WeekProgress | undefined) => number;
}

const CATEGORIES: CategoryDef[] = [
  {
    key: 'case_pool',
    label: 'Case Pool',
    icon: Target,
    targetOf: (week) => week.case_pool_target,
    doneOf: (progress) => progress?.case_pool_done || 0,
  },
  {
    key: 'case_drill',
    label: 'Case Drill',
    icon: Zap,
    targetOf: (week) => week.case_drill_target,
    doneOf: (progress) => progress?.case_drill_done || 0,
  },
  {
    key: 'aptitude',
    label: 'Aptitude Test',
    icon: Hexagon,
    targetOf: (week) => week.aptitude_target,
    doneOf: (progress) => progress?.aptitude_done || 0,
  },
];

export interface CategoryProgress {
  key: CategoryDef['key'];
  label: string;
  icon: typeof Target;
  completed: number;
  target: number;
  extra: number;
  remaining: number;
  pct: number;
}

export interface OverallProgressTotals {
  completed: number;
  target: number;
  extra: number;
  remaining: number;
  pct: number;
  categories: CategoryProgress[];
}

function safeCount(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Unrounded percentage, 0 when there is nothing scheduled, never above 100. */
function rawPct(completed: number, target: number): number {
  if (!(target > 0)) return 0;
  return Math.min(100, Math.max(0, (completed / target) * 100));
}

/**
 * Week-by-week capped totals over the active plan. The overall figures are the
 * sum of the three category figures, so X/Y always adds up.
 */
export function computeOverallProgress(
  schedule: RoadmapWeek[],
  progress: Record<number, WeekProgress>,
): OverallProgressTotals {
  const categories: CategoryProgress[] = CATEGORIES.map((category) => {
    let completed = 0;
    let target = 0;
    let extra = 0;
    schedule.forEach((week) => {
      const weekTarget = safeCount(category.targetOf(week));
      const goal = goalProgress(safeCount(category.doneOf(progress[week.week])), weekTarget);
      completed += goal.counted;
      extra += goal.extra;
      target += weekTarget;
    });
    return {
      key: category.key,
      label: category.label,
      icon: category.icon,
      completed,
      target,
      extra,
      remaining: Math.max(0, target - completed),
      pct: rawPct(completed, target),
    };
  });
  const completed = categories.reduce((sum, c) => sum + c.completed, 0);
  const target = categories.reduce((sum, c) => sum + c.target, 0);
  const extra = categories.reduce((sum, c) => sum + c.extra, 0);
  return { completed, target, extra, remaining: Math.max(0, target - completed), pct: rawPct(completed, target), categories };
}

/** 0 -> "0%"; below 10% one decimal; 10% and above a whole number; never above 100%. */
export function formatProgressPct(value: number): string {
  const v = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  if (v === 0) return '0%';
  if (v < 10) {
    const tenth = Math.round(v * 10) / 10;
    if (tenth === 0) return '<0.1%';
    if (tenth >= 10) return '10%';
    return `${tenth.toFixed(1)}%`;
  }
  return `${Math.min(100, Math.round(v))}%`;
}

const DONUT_RADIUS = 52;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function Donut({ pct, label }: { pct: number; label: string }) {
  const filled = (Math.min(100, Math.max(0, pct)) / 100) * DONUT_CIRCUMFERENCE;
  return (
    <div className="mr-op-donut" data-testid="roadmap-overall-donut">
      <svg viewBox="0 0 140 140" role="img" aria-label={`Overall learning progress ${label}`}>
        <circle className="mr-op-donut-track" cx="70" cy="70" r={DONUT_RADIUS} />
        {filled > 0 && (
          <circle
            className="mr-op-donut-fill"
            cx="70"
            cy="70"
            r={DONUT_RADIUS}
            strokeDasharray={`${filled} ${DONUT_CIRCUMFERENCE - filled}`}
            transform="rotate(-90 70 70)"
          />
        )}
      </svg>
      <div className="mr-op-donut-center">
        <b className="mr-num" data-testid="roadmap-overall-pct">{label}</b>
        <span>complete</span>
      </div>
    </div>
  );
}

function CategoryRow({ category }: { category: CategoryProgress }) {
  const Icon = category.icon;
  const pctLabel = formatProgressPct(category.pct);
  const complete = category.target > 0 && category.completed >= category.target;
  return (
    <div className="mr-op-cat" data-testid={`roadmap-overall-${category.key}`}>
      <div className="mr-op-cat-head">
        <span className="mr-op-cat-icon"><Icon /></span>
        <b>{category.label}</b>
        <span className={`mr-op-cat-count mr-num${complete ? ' is-done' : ''}`} data-testid={`roadmap-overall-${category.key}-count`}>
          {category.completed}/{category.target}
        </span>
      </div>
      <div
        className={`mr-bar mr-bar--thick${complete ? ' is-done' : ''}`}
        role="progressbar"
        aria-label={`${category.label} overall progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(category.pct)}
      >
        <span style={{ width: `${Math.max(category.pct > 0 ? 2 : 0, category.pct)}%` }} />
      </div>
      <div className="mr-op-cat-foot">
        <span className="mr-num"><b>{pctLabel}</b> complete</span>
        <span className="mr-num">{category.remaining} remaining</span>
      </div>
      <div className="mr-op-cat-extra mr-num" data-testid={`roadmap-overall-${category.key}-extra`}>
        {category.extra > 0
          ? <><span className="mr-extra">+{category.extra} extra</span> beyond weekly targets, not counted above</>
          : 'No extra activities'}
      </div>
    </div>
  );
}

export default function OverallProgress({
  schedule,
  progress,
  status,
}: {
  schedule: RoadmapWeek[];
  progress: Record<number, WeekProgress>;
  status: OverallProgressStatus;
}) {
  const totals = computeOverallProgress(schedule, progress);
  const pctLabel = formatProgressPct(totals.pct);

  return (
    <section className="mr-card" data-testid="roadmap-overall-learning-progress" aria-labelledby="mr-overall-title">
      <div className="mr-sec-head">
        <div>
          <span className="mr-eyebrow">Across your whole plan</span>
          <h2 className="mr-h2" id="mr-overall-title">Overall Learning Progress</h2>
          <p className="mr-sub">
            Planned Case Pool, Case Drill and Aptitude Test activities across all {schedule.length} weeks.
          </p>
        </div>
      </div>

      {status === 'loading' ? (
        <div className="mr-state" data-testid="roadmap-overall-loading">
          <Loader2 size={16} className="mr-spin" />
          Loading your overall progress…
        </div>
      ) : status === 'unavailable' ? (
        <p className="mr-note" role="status" data-testid="roadmap-overall-unavailable">
          Your overall progress is temporarily unavailable. It will update as soon as your practice history loads.
        </p>
      ) : (
        <div className="mr-op">
          <div className="mr-op-summary">
            <Donut pct={totals.pct} label={pctLabel} />
            <div className="mr-op-metrics">
              <div className="mr-op-total mr-num" data-testid="roadmap-overall-total">
                <b>{totals.completed}/{totals.target}</b>
                <span>planned activities completed</span>
              </div>
              <div className="mr-op-remaining mr-num" data-testid="roadmap-overall-remaining">
                <b>{totals.remaining}</b> remaining
              </div>
              {totals.extra > 0 && (
                <div className="mr-op-extra-total mr-num" data-testid="roadmap-overall-extra">
                  <span className="mr-extra">+{totals.extra} extra</span> reported separately
                </div>
              )}
            </div>
          </div>
          <div className="mr-op-cats">
            {totals.categories.map((category) => (
              <CategoryRow key={category.key} category={category} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
