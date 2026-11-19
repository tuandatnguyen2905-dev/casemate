// Casemate — My Roadmap: whole-plan completion, shown by "Your Learning Snapshot".
//
// Reads the same bucketed Case Pool / Case Drill / Aptitude Test sessions as the
// weekly targets and the timeline (bucketPracticeSessions in
// lib/roadmapProgress.ts), so the numbers reconcile with them:
//   - per week and category, completion is min(unique sessions finished in that
//     assigned week, that week's target); anything above the target is "extra"
//     and is reported separately, never added to scheduled progress
//   - category progress sums the capped completions over every week; overall
//     progress is the sum of the three categories over the sum of the targets
//   - Domain Knowledge has no weekly targets in the roadmap, so it is not here

import { Hexagon, Target, Zap } from 'lucide-react';
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
