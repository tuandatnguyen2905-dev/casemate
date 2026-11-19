// My Roadmap — "Today's Focus": a compact strip inside "Your Learning Snapshot".
// Two read-only items (weakest eligible Case Drill skill, weakest eligible Aptitude
// Test category) with the measured score and the next 5pp milestone; how it is
// measured, the sample and the latest before/after change sit behind the info
// icon. No practice buttons — every action stays in Recommendations. Skill scores
// are never mixed with the roadmap completion %.

import { Hexagon, Loader2, Target, Zap } from 'lucide-react';
import {
  APTITUDE_MIN_GRADED,
  APTITUDE_WINDOW_DAYS,
  CASE_DRILL_MIN_DRILLS,
} from '../../lib/skillFocus';
import type { FocusAnnotation, FocusEmpty, FocusFeature, FocusSkill, FocusTile } from '../../lib/skillFocus';
import type { SkillFocusState } from './skillFocusData';
import InfoPopover from './InfoPopover';

const FEATURE_META: Record<FocusFeature, { label: string; icon: typeof Zap }> = {
  case_drill: { label: 'Case Drill', icon: Zap },
  aptitude: { label: 'Aptitude Test', icon: Hexagon },
};

const MINUS = '\u2212';

function shortDate(time: number): string {
  const date = new Date(time);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function formatDeltaPp(deltaPp: number): string {
  if (deltaPp === 0) return 'no change (0 pp)';
  return `${deltaPp > 0 ? '+' : MINUS}${Math.abs(deltaPp)} pp`;
}

function milestoneText(skill: Pick<FocusSkill, 'goal' | 'goalPp' | 'goalReached'>): string {
  return skill.goalReached || skill.goal == null ? 'Goal reached at 100%' : `Next milestone ${skill.goal}% (+${skill.goalPp} pp)`;
}

function FocusDetails({ feature, skill }: { feature: FocusFeature; skill: FocusSkill | null }) {
  const isAptitude = feature === 'aptitude';
  return (
    <>
      <b>Metric</b>
      {isAptitude ? (
        <span>
          Accuracy in one Aptitude Test category = graded correct {'\u00f7'} graded answered {'\u00d7'} 100. Your lowest
          category is shown.
        </span>
      ) : (
        <span>
          Mean of your 0{'\u2013'}100 rubric-based Case Drill scores for one skill, using only drills graded on the same
          rubric{skill?.rubricId ? ` (${skill.rubricId})` : ''}. Your lowest skill is shown.
        </span>
      )}
      <b>Sample</b>
      {isAptitude ? (
        <span>
          Attempts from the last {APTITUDE_WINDOW_DAYS} days, with at least {APTITUDE_MIN_GRADED} graded answers in the
          category. Unanswered, partial-credit and duplicate attempts are not counted.
          {skill ? ` Yours: ${skill.sampleText}.` : ''}
        </span>
      ) : (
        <span>
          At least {CASE_DRILL_MIN_DRILLS} comparable scored drills. A question you retake counts once, with its latest
          score; drills without a score are never counted.
          {skill ? ` Yours: ${skill.sampleText}.` : ''}
        </span>
      )}
      {skill && (
        <>
          <b>Latest session</b>
          <span data-testid={`focus-delta-${feature}`}>
            {skill.delta
              ? `${skill.delta.before}% \u2192 ${skill.delta.after}% (${formatDeltaPp(skill.delta.deltaPp)}) on ${shortDate(skill.delta.latestTime)}.`
              : 'First measurement. Your actual before/after change appears after your next graded session.'}
            {skill.previousWeakest ? ` Ranking updated — previously lowest: ${skill.previousWeakest.label} (${skill.previousWeakest.score}%).` : ''}
          </span>
        </>
      )}
      <b>Not a promise</b>
      <span>
        The milestone is the next 5-percentage-point step above your measured score. It is a suggested practice target,
        not a predicted or guaranteed score. It is separate from your roadmap completion.
      </span>
    </>
  );
}

function emptyText(feature: FocusFeature, tile: FocusEmpty): string {
  const isAptitude = feature === 'aptitude';
  const unit = isAptitude ? `graded answer${tile.need === 1 ? '' : 's'}` : `rated drill${tile.need === 1 ? '' : 's'}`;
  if (tile.closestLabel) return `${tile.need} more ${unit} in ${tile.closestLabel} to unlock (${tile.have} so far)`;
  return isAptitude
    ? `Answer ${APTITUDE_MIN_GRADED} graded questions in one category to unlock`
    : `Complete ${CASE_DRILL_MIN_DRILLS} rated drills on one skill to unlock`;
}

function FocusItem({ feature, tile, loading, failed }: { feature: FocusFeature; tile: FocusTile | null; loading: boolean; failed: boolean }) {
  const meta = FEATURE_META[feature];
  const Icon = meta.icon;
  const skill = tile && tile.status === 'ready' ? tile.skill : null;
  const state = loading ? 'loading' : failed || !tile ? 'unavailable' : tile.status;
  return (
    <div className={`mr-focus-item is-${state}`} data-testid={`focus-tile-${feature}`} aria-label={`${meta.label} focus`} role="group">
      <span className="mr-focus-feature"><Icon /> {meta.label}</span>
      {loading ? (
        <span className="mr-focus-fine"><Loader2 size={13} className="mr-spin" /> Checking your graded results…</span>
      ) : failed || !tile ? (
        <span className="mr-focus-fine" data-testid={`focus-unavailable-${feature}`}>Skill scores are temporarily unavailable.</span>
      ) : skill ? (
        <span className="mr-focus-body" data-testid={`focus-ready-${feature}`}>
          <b className="mr-focus-topic" data-testid={`focus-topic-${feature}`}>{skill.label}</b>
          <b className="mr-focus-score mr-num" data-testid={`focus-score-${feature}`}>{skill.score}%</b>
          <span className="mr-focus-goal mr-num" data-testid={`focus-goal-${feature}`}>{milestoneText(skill)}</span>
        </span>
      ) : tile.status === 'empty' ? (
        <span className="mr-focus-body" data-testid={`focus-empty-${feature}`}>
          <b className="mr-focus-topic">Not enough graded results yet</b>
          <span className="mr-focus-fine">{emptyText(feature, tile)}</span>
        </span>
      ) : null}
      <InfoPopover label={`How the ${meta.label} focus is measured`} testId={`focus-info-${feature}`}>
        <FocusDetails feature={feature} skill={skill} />
      </InfoPopover>
    </div>
  );
}

export default function TodaysFocus({ state }: { state: SkillFocusState }) {
  const loading = state.status === 'loading';
  const failed = state.status === 'error';
  return (
    <div className="mr-focus" data-testid="roadmap-todays-focus" role="region" aria-labelledby="mr-focus-title">
      <div className="mr-focus-head">
        <h3 id="mr-focus-title"><Target /> Today{'\u2019'}s Focus</h3>
        <span>Your lowest measured skills, from graded answers</span>
      </div>
      <div className="mr-focus-items">
        <FocusItem feature="case_drill" tile={state.focus?.caseDrill ?? null} loading={loading} failed={failed} />
        <FocusItem feature="aptitude" tile={state.focus?.aptitude ?? null} loading={loading} failed={failed} />
      </div>
    </div>
  );
}

/** Score / goal line on the recommendation card for the same topic. */
export function FocusAnnotationLine({ annotation }: { annotation: FocusAnnotation | null }) {
  if (!annotation) return null;
  return (
    <span className="mr-focus-annot" data-testid="recommendation-focus-annotation">
      <b>Today{'\u2019'}s Focus · {annotation.score}% now</b>
      <span>
        {annotation.goalReached || annotation.goal == null
          ? 'Goal reached at 100%'
          : `Next goal ${annotation.goal}% (+${annotation.goalPp} pp)`}
      </span>
    </span>
  );
}

export const FOCUS_CSS = `
.mr-focus { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; margin-top: 16px; padding: 12px 14px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-bg); min-width: 0; }
.mr-focus-head { display: flex; flex-direction: column; gap: 1px; min-width: 0; flex: 0 1 190px; }
.mr-focus-head h3 { margin: 0; display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 800; color: var(--mr-ink); }
.mr-focus-head h3 svg { width: 16px; height: 16px; color: var(--mr-red); flex-shrink: 0; }
.mr-focus-head span { font-size: 11.5px; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-focus-items { flex: 1 1 520px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; min-width: 0; }
.mr-focus-item { position: relative; display: flex; align-items: center; gap: 8px 10px; min-width: 0; padding: 8px 6px 8px 12px; border: 1px solid var(--mr-line); border-radius: 10px; background: var(--mr-surface); }
.mr-focus-item.is-ready { border-color: var(--mr-red-line); }
.mr-focus-feature { display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0; font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-red); }
.mr-focus-feature svg { width: 13px; height: 13px; }
.mr-focus-body { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 8px; flex: 1; min-width: 0; }
.mr-focus-topic { font-size: 13px; font-weight: 800; color: var(--mr-ink); overflow-wrap: anywhere; }
.mr-focus-score { font-size: 16px; font-weight: 800; color: var(--mr-ink); }
.mr-focus-goal { font-size: 11.5px; font-weight: 700; color: var(--mr-red); }
.mr-focus-fine { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-focus-item > .mr-focus-fine { flex: 1; }
.mr-focus-item .mr-info { margin-left: auto; }
.mr-focus-annot { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 8px; padding: 6px 10px; border-radius: 8px; background: var(--mr-red-soft); border: 1px solid var(--mr-red-line); font-size: 11.5px; color: var(--mr-ink-2); }
.mr-focus-annot b { font-weight: 800; color: var(--mr-red); }
@container (max-width: 720px) {
  .mr-focus { flex-direction: column; align-items: stretch; }
  .mr-focus-head { flex-basis: auto; }
  .mr-focus-items { flex-basis: auto; grid-template-columns: minmax(0, 1fr); }
}
`;
