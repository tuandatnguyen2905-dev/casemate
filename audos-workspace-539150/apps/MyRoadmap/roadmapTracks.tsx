// Shared progress building blocks for My Roadmap. The Learning Snapshot, the
// target card and the Preparation Timeline all count through these helpers, so
// every section shows the same capped numbers for the same week.

import { CheckCircle2, Circle, Hexagon, Target, Zap } from 'lucide-react';
import { goalProgress, weekState } from '../../lib/roadmapProgress';
import type { PlanStatus, RoadmapPhase, WeekState } from '../../lib/roadmapProgress';
import type { RoadmapWeek, WeekProgress } from '../../lib/prepRoadmap';

export interface TrackMeta {
  key: 'case_pool' | 'case_drill' | 'aptitude';
  label: string;
  icon: typeof Target;
  targetOf: (week: RoadmapWeek) => number;
  doneOf: (progress: WeekProgress | undefined) => number;
  unit: string;
  unitOne: string;
  short: string;
}

export const TRACKS: TrackMeta[] = [
  {
    key: 'case_pool',
    label: 'Case Pool',
    icon: Target,
    targetOf: (week) => week.case_pool_target,
    doneOf: (progress) => progress?.case_pool_done || 0,
    unit: 'full cases',
    unitOne: 'full case',
    short: 'CP',
  },
  {
    key: 'case_drill',
    label: 'Case Drill',
    icon: Zap,
    targetOf: (week) => week.case_drill_target,
    doneOf: (progress) => progress?.case_drill_done || 0,
    unit: 'drills',
    unitOne: 'drill',
    short: 'CD',
  },
  {
    key: 'aptitude',
    label: 'Aptitude Test',
    icon: Hexagon,
    targetOf: (week) => week.aptitude_target,
    doneOf: (progress) => progress?.aptitude_done || 0,
    unit: 'tests',
    unitOne: 'test',
    short: 'AT',
  },
];

export function Bar({ done, target, size, label }: { done: number; target: number; size?: 'thin' | 'thick'; label?: string }) {
  const { pct, complete } = goalProgress(done, target);
  return (
    <div
      className={`mr-bar${size ? ` mr-bar--${size}` : ''}${complete ? ' is-done' : ''}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <span style={{ width: `${Math.max(pct > 0 ? 3 : 0, pct)}%` }} />
    </div>
  );
}

export function Extra({ extra }: { extra: number }) {
  if (extra <= 0) return null;
  return <span className="mr-extra">+{extra} extra</span>;
}

export function weekTotals(week: RoadmapWeek, progress: WeekProgress | undefined) {
  let counted = 0;
  let target = 0;
  let extra = 0;
  TRACKS.forEach((track) => {
    const goal = goalProgress(track.doneOf(progress), track.targetOf(week));
    counted += goal.counted;
    extra += goal.extra;
    target += track.targetOf(week);
  });
  return { counted, target, extra, remaining: Math.max(0, target - counted) };
}

export function rangeTotals(weeks: RoadmapWeek[], progress: Record<number, WeekProgress>) {
  return weeks.reduce(
    (sum, week) => {
      const totals = weekTotals(week, progress[week.week]);
      return { counted: sum.counted + totals.counted, target: sum.target + totals.target, extra: sum.extra + totals.extra };
    },
    { counted: 0, target: 0, extra: 0 },
  );
}

export function combinedState(states: WeekState[]): WeekState {
  if (states.includes('current')) return 'current';
  return states.length > 0 && states.every((state) => state === 'past') ? 'past' : 'upcoming';
}

export function phaseState(phase: RoadmapPhase, status: PlanStatus): WeekState {
  return combinedState(phase.weeks.map((week) => weekState(week.week, status)));
}

export const STATE_LABEL: Record<WeekState, string> = { current: 'Current', past: 'Completed', upcoming: 'Upcoming' };

export function StateChip({ state, label }: { state: WeekState; label?: string }) {
  return (
    <span className={`mr-chip is-${state}`}>
      {state === 'past' ? <CheckCircle2 /> : state === 'upcoming' ? <Circle /> : null}
      {label || STATE_LABEL[state]}
    </span>
  );
}

export function weekChipLabel(state: WeekState): string {
  return state === 'current' ? 'This week' : state === 'past' ? 'Past' : 'Upcoming';
}
