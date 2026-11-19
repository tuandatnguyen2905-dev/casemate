// My Roadmap — section 3, "Your Learning Snapshot": how the learner is doing.
// Whole-plan completion (donut + Case Pool / Case Drill / Aptitude Test bars)
// beside this week's three targets, then the compact Today's Focus strip.
// Read-only: every learn/practice CTA lives in "Recommended for you".

import { CheckCircle2, Flag, Loader2 } from 'lucide-react';
import { shortDateLabel } from '../../lib/prepRoadmap';
import type { RoadmapWeek, WeekProgress } from '../../lib/prepRoadmap';
import { fullDateLabel, goalProgress } from '../../lib/roadmapProgress';
import type { PlanStatus } from '../../lib/roadmapProgress';
import { computeOverallProgress, formatProgressPct } from './OverallProgress';
import type { CategoryProgress, OverallProgressStatus } from './OverallProgress';
import { Bar, Extra, TRACKS, weekTotals } from './roadmapTracks';
import TodaysFocus from './TodaysFocus';
import type { SkillFocusState } from './skillFocusData';

const DONUT_RADIUS = 52;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function Donut({ pct, label }: { pct: number; label: string }) {
  const filled = (Math.min(100, Math.max(0, pct)) / 100) * DONUT_CIRCUMFERENCE;
  return (
    <div className="mr-snap-donut" data-testid="roadmap-overall-donut">
      <svg viewBox="0 0 140 140" role="img" aria-label={`Overall learning progress ${label}`}>
        <circle className="mr-snap-donut-track" cx="70" cy="70" r={DONUT_RADIUS} />
        {filled > 0 && (
          <circle
            className="mr-snap-donut-fill"
            cx="70"
            cy="70"
            r={DONUT_RADIUS}
            strokeDasharray={`${filled} ${DONUT_CIRCUMFERENCE - filled}`}
            transform="rotate(-90 70 70)"
          />
        )}
      </svg>
      <div className="mr-snap-donut-center">
        <b className="mr-num" data-testid="roadmap-overall-pct">{label}</b>
        <span>complete</span>
      </div>
    </div>
  );
}

function CategoryBar({ category }: { category: CategoryProgress }) {
  const Icon = category.icon;
  const complete = category.target > 0 && category.completed >= category.target;
  return (
    <div className="mr-snap-cat" data-testid={`roadmap-overall-${category.key}`}>
      <div className="mr-snap-cat-head">
        <span className="mr-snap-icon"><Icon /></span>
        <b>{category.label}</b>
        <span className="mr-snap-cat-pct mr-num">{formatProgressPct(category.pct)}</span>
        <span className={`mr-snap-cat-count mr-num${complete ? ' is-done' : ''}`} data-testid={`roadmap-overall-${category.key}-count`}>
          {category.completed}/{category.target}
        </span>
      </div>
      <div
        className={`mr-bar${complete ? ' is-done' : ''}`}
        role="progressbar"
        aria-label={`${category.label} overall progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(category.pct)}
      >
        <span style={{ width: `${Math.max(category.pct > 0 ? 2 : 0, category.pct)}%` }} />
      </div>
      {category.extra > 0 && (
        <span className="mr-snap-cat-extra mr-num" data-testid={`roadmap-overall-${category.key}-extra`}>
          <span className="mr-extra">+{category.extra} extra</span> not counted above
        </span>
      )}
    </div>
  );
}

export interface LearningSnapshotProps {
  schedule: RoadmapWeek[];
  progress: Record<number, WeekProgress>;
  status: OverallProgressStatus;
  planState: PlanStatus;
  /** The week whose targets are shown: the current week, Week 1 before the plan starts, null once it ended. */
  goalWeek: RoadmapWeek | null;
  focus: SkillFocusState;
}

export default function LearningSnapshot({ schedule, progress, status, planState, goalWeek, focus }: LearningSnapshotProps) {
  const totals = computeOverallProgress(schedule, progress);
  const pctLabel = formatProgressPct(totals.pct);
  const goalTotals = goalWeek ? weekTotals(goalWeek, progress[goalWeek.week]) : null;
  const before = planState.kind === 'before';
  const hasAnyPractice = totals.completed + totals.extra > 0;

  return (
    <section className="mr-card mr-snap" data-testid="roadmap-learning-snapshot" data-plan-state={planState.kind} aria-labelledby="mr-snap-title">
      <div className="mr-sec-head">
        <div>
          <span className="mr-eyebrow">How you’re doing</span>
          <h2 className="mr-h2" id="mr-snap-title">Your Learning Snapshot</h2>
          <p className="mr-sub">Completed Case Pool, Case Drill and Aptitude Test sessions against your plan.</p>
        </div>
        {planState.kind === 'active' && <span className="mr-pill mr-pill--red">Week {planState.week} of {schedule.length}</span>}
        {before && <span className="mr-pill mr-pill--soft" data-testid="roadmap-starts-on">Starts {fullDateLabel(planState.startsOn)}</span>}
        {planState.kind === 'complete' && (
          <span className="mr-pill mr-pill--green" data-testid="roadmap-plan-complete"><Flag size={13} /> Plan complete</span>
        )}
      </div>

      {status === 'loading' ? (
        <div className="mr-state" data-testid="roadmap-overall-loading">
          <Loader2 size={16} className="mr-spin" />
          Loading your progress…
        </div>
      ) : status === 'unavailable' ? (
        <p className="mr-note" role="status" data-testid="roadmap-overall-unavailable">
          Your progress is temporarily unavailable. It will update as soon as your practice history loads.
        </p>
      ) : (
        <div className="mr-snap-grid">
          <div className="mr-snap-panel" data-testid="roadmap-overall-learning-progress">
            <h3 className="mr-snap-title">Overall progress <span>· all {schedule.length} weeks</span></h3>
            <div className="mr-snap-overall">
              <div className="mr-snap-summary">
                <Donut pct={totals.pct} label={pctLabel} />
                <div className="mr-snap-total mr-num" data-testid="roadmap-overall-total">
                  <b>{totals.completed}/{totals.target}</b>
                  <span>planned activities</span>
                </div>
                <div className="mr-snap-remaining mr-num" data-testid="roadmap-overall-remaining">
                  <b>{totals.remaining}</b> remaining
                  {totals.extra > 0 && <> · <span className="mr-extra" data-testid="roadmap-overall-extra">+{totals.extra} extra</span></>}
                </div>
              </div>
              <div className="mr-snap-cats">
                {totals.categories.map((category) => <CategoryBar key={category.key} category={category} />)}
              </div>
            </div>
          </div>

          <div className="mr-snap-panel" data-testid="roadmap-progress-summary">
            {goalWeek && goalTotals ? (
              <>
                <h3 className="mr-snap-title">
                  {before ? 'Week 1 targets' : 'This week'}
                  <span> · Week {goalWeek.week} · {shortDateLabel(goalWeek.start_date)} – {shortDateLabel(goalWeek.end_date)}</span>
                </h3>
                <div className="mr-snap-week" data-testid="roadmap-weekly-goals">
                  {TRACKS.map((track) => {
                    const target = track.targetOf(goalWeek);
                    const goal = goalProgress(track.doneOf(progress[goalWeek.week]), target);
                    const Icon = track.icon;
                    return (
                      <div key={track.key} className="mr-snap-target" data-testid={`roadmap-goal-${track.key}`}>
                        <div className="mr-snap-cat-head">
                          <span className="mr-snap-icon"><Icon /></span>
                          <b>{track.label}</b>
                          <span className={`mr-snap-cat-count mr-num${goal.complete ? ' is-done' : ''}`} data-testid={`roadmap-goal-${track.key}-count`}>
                            {goal.counted}/{target}
                          </span>
                        </div>
                        <Bar done={goal.counted} target={target} label={`${track.label} this week`} />
                        <div className="mr-snap-target-foot">
                          {goal.complete
                            ? <span className="is-done"><CheckCircle2 size={13} /> Target reached</span>
                            : <span>{target - goal.counted} {target - goal.counted === 1 ? track.unitOne : track.unit} to go</span>}
                          <Extra extra={goal.extra} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mr-snap-week-total mr-num" data-testid="roadmap-summary-weekly">
                  <b>{goalTotals.counted}/{goalTotals.target}</b> activities {before ? 'in Week 1' : 'this week'}
                  <span data-testid="roadmap-summary-remaining">
                    {goalTotals.remaining === 0 ? ' · weekly target reached' : ` · ${goalTotals.remaining} remaining`}
                  </span>
                  {goalTotals.extra > 0 && <> · <span className="mr-extra">+{goalTotals.extra} extra</span></>}
                </p>
              </>
            ) : (
              <>
                <h3 className="mr-snap-title">Plan complete</h3>
                <p className="mr-snap-week-total mr-num" data-testid="roadmap-summary-weekly">
                  Your {schedule.length}-week plan ended on {fullDateLabel(schedule[schedule.length - 1].end_date)}. You finished{' '}
                  <b>{totals.completed}/{totals.target}</b> planned activities
                  {totals.extra > 0 ? <> plus <span className="mr-extra">+{totals.extra} extra</span></> : null}.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {status === 'ready' && before && (
        <p className="mr-note">
          Your plan starts on <strong>{fullDateLabel(planState.startsOn)}</strong>. Sessions you complete from that day count toward Week 1.
        </p>
      )}
      {status === 'ready' && !hasAnyPractice && planState.kind === 'active' && (
        <p className="mr-note" data-testid="roadmap-empty-state">
          <strong>No activity yet.</strong> These bars fill automatically as you finish cases, drills and tests — your next steps are in Recommended for you below.
        </p>
      )}

      <TodaysFocus state={focus} />
    </section>
  );
}
