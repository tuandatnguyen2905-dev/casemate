// My Roadmap — "Today's Focus": a compact block inside "Your Progress This Week".
// Two read-only tiles (weakest eligible Case Drill skill, weakest eligible Aptitude
// Test category) with the measured score, its sample, the next 5pp milestone and the
// actual before/after change from the latest graded session. No practice buttons —
// every action stays in Recommendations. Skill scores are never mixed with the
// roadmap completion %.

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Hexagon, Info, Loader2, Target, Zap } from 'lucide-react';
import {
  APTITUDE_MIN_GRADED,
  APTITUDE_WINDOW_DAYS,
  CASE_DRILL_MIN_DRILLS,
} from '../../lib/skillFocus';
import type { FocusAnnotation, FocusEmpty, FocusFeature, FocusSkill, FocusTile } from '../../lib/skillFocus';
import type { SkillFocusState } from './skillFocusData';

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

function goalText(score: number, skill: Pick<FocusSkill, 'goal' | 'goalPp' | 'goalReached'>): string {
  return skill.goalReached || skill.goal == null
    ? 'Goal reached at 100%'
    : `${score}% \u2192 Aim ${skill.goal}% (+${skill.goalPp}pp goal)`;
}

function InfoTip({ feature, skill }: { feature: FocusFeature; skill: FocusSkill | null }) {
  const tipId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hover || focused || pinned;

  const close = useCallback(() => {
    setHover(false);
    setFocused(false);
    setPinned(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onPointer = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) close();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open, close]);

  const isAptitude = feature === 'aptitude';
  const label = FEATURE_META[feature].label;
  return (
    <span
      ref={wrapRef}
      className="mr-focus-tip"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        className="mr-focus-info"
        aria-label={`How the ${label} focus score is measured`}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={(event) => {
          if (open && pinned) {
            close();
            event.currentTarget.blur();
          } else {
            setPinned(true);
          }
        }}
        data-testid={`focus-info-${feature}`}
      >
        <Info />
      </button>
      {open && (
        <span role="tooltip" id={tipId} className="mr-focus-pop" data-testid={`focus-tooltip-${feature}`}>
          <b>Metric</b>
          {isAptitude ? (
            <span>
              Accuracy in one Aptitude Test category = graded correct {'\u00f7'} graded answered {'\u00d7'} 100. Your
              lowest category is shown.
            </span>
          ) : (
            <span>
              Mean of your 0{'\u2013'}100 rubric-based Case Drill scores for one skill, using only drills graded on the
              same rubric{skill?.rubricId ? ` (${skill.rubricId})` : ''}. Your lowest skill is shown.
            </span>
          )}
          <b>Sample</b>
          {isAptitude ? (
            <span>
              Attempts from the last {APTITUDE_WINDOW_DAYS} days, with at least {APTITUDE_MIN_GRADED} graded answers in
              the category. Unanswered, partial-credit and duplicate attempts are not counted.
              {skill ? ` Yours: ${skill.sampleText}.` : ''}
            </span>
          ) : (
            <span>
              At least {CASE_DRILL_MIN_DRILLS} comparable scored drills. A question you retake counts once, with its
              latest score; drills without a score are never counted.
              {skill ? ` Yours: ${skill.sampleText}.` : ''}
            </span>
          )}
          <b>Not a promise</b>
          <span>
            The goal is the next 5-percentage-point milestone above your measured score. It is a practice target, not
            a predicted or guaranteed score increase. This is separate from your roadmap completion.
          </span>
        </span>
      )}
    </span>
  );
}

function EmptyBody({ feature, tile }: { feature: FocusFeature; tile: FocusEmpty }) {
  const isAptitude = feature === 'aptitude';
  const unit = isAptitude ? `graded answer${tile.need === 1 ? '' : 's'}` : `rated drill${tile.need === 1 ? '' : 's'}`;
  return (
    <div className="mr-focus-empty" data-testid={`focus-empty-${feature}`}>
      <h4 className="mr-focus-topic">No graded results yet</h4>
      <p>
        {tile.closestLabel
          ? `${tile.need} more ${unit} in ${tile.closestLabel} unlock${tile.need === 1 ? 's' : ''} your focus (${tile.have} so far).`
          : isAptitude
            ? `Answer ${APTITUDE_MIN_GRADED} graded questions in one Aptitude Test category to see your weakest area.`
            : `Complete ${CASE_DRILL_MIN_DRILLS} rated drills on the same skill to see your weakest skill.`}
      </p>
      <p className="mr-focus-fine">
        {isAptitude
          ? `Counts answered questions from the last ${APTITUDE_WINDOW_DAYS} days.`
          : 'Only drills graded on the same rubric are compared.'}
      </p>
    </div>
  );
}

function ReadyBody({ skill }: { skill: FocusSkill }) {
  const delta = skill.delta;
  return (
    <div data-testid={`focus-ready-${skill.feature}`}>
      <h4 className="mr-focus-topic" data-testid={`focus-topic-${skill.feature}`}>{skill.label}</h4>
      <div className="mr-focus-score">
        <b className="mr-num" data-testid={`focus-score-${skill.feature}`}>{skill.score}%</b>
        <span className="mr-focus-sample" data-testid={`focus-sample-${skill.feature}`}>{skill.sampleText}</span>
      </div>
      <p className="mr-focus-line" data-testid={`focus-goal-${skill.feature}`}>
        <span className="mr-focus-tag mr-focus-tag--goal">Target milestone</span>
        <span className="mr-num">{goalText(skill.score, skill)}</span>
      </p>
      {delta ? (
        <p className="mr-focus-line" data-testid={`focus-delta-${skill.feature}`}>
          <span className="mr-focus-tag mr-focus-tag--actual">Actual, latest session</span>
          <span className="mr-num">
            {delta.before}% {'\u2192'} {delta.after}% ({formatDeltaPp(delta.deltaPp)}) on {shortDate(delta.latestTime)}
          </span>
        </p>
      ) : (
        <p className="mr-focus-fine" data-testid={`focus-baseline-${skill.feature}`}>
          First measurement. Your actual before/after change appears after your next graded session.
        </p>
      )}
      {skill.previousWeakest && (
        <p className="mr-focus-fine" data-testid={`focus-ranking-${skill.feature}`}>
          Ranking updated. Previously lowest: {skill.previousWeakest.label} ({skill.previousWeakest.score}%).
        </p>
      )}
    </div>
  );
}

function FocusTileView({ feature, tile, loading, failed }: { feature: FocusFeature; tile: FocusTile | null; loading: boolean; failed: boolean }) {
  const meta = FEATURE_META[feature];
  const Icon = meta.icon;
  const skill = tile && tile.status === 'ready' ? tile.skill : null;
  return (
    <article className="mr-focus-tile" data-testid={`focus-tile-${feature}`} aria-label={`${meta.label} focus`}>
      <header className="mr-focus-tile-head">
        <span className="mr-focus-feature"><Icon /> {meta.label}</span>
        <InfoTip feature={feature} skill={skill} />
      </header>
      {loading ? (
        <p className="mr-focus-fine"><Loader2 size={13} className="mr-spin" /> Checking your graded results…</p>
      ) : failed || !tile ? (
        <p className="mr-focus-fine" data-testid={`focus-unavailable-${feature}`}>Skill scores are temporarily unavailable.</p>
      ) : tile.status === 'ready' ? (
        <ReadyBody skill={tile.skill} />
      ) : (
        <EmptyBody feature={feature} tile={tile} />
      )}
    </article>
  );
}

export default function TodaysFocus({ state }: { state: SkillFocusState }) {
  const loading = state.status === 'loading';
  const failed = state.status === 'error';
  return (
    <div className="mr-focus" data-testid="roadmap-todays-focus" role="region" aria-labelledby="mr-focus-title">
      <div className="mr-focus-head">
        <h3 id="mr-focus-title"><Target /> Today{'\u2019'}s Focus</h3>
        <p>Your lowest measured skill in each practice app. Skill scores come from graded answers and are separate from roadmap completion.</p>
      </div>
      <div className="mr-focus-grid">
        <FocusTileView feature="case_drill" tile={state.focus?.caseDrill ?? null} loading={loading} failed={failed} />
        <FocusTileView feature="aptitude" tile={state.focus?.aptitude ?? null} loading={loading} failed={failed} />
      </div>
    </div>
  );
}

/** Small score / goal line on the existing recommendation card for the same topic. */
export function FocusAnnotationLine({ annotation }: { annotation: FocusAnnotation | null }) {
  if (!annotation) return null;
  return (
    <span className="mr-focus-annot" data-testid="recommendation-focus-annotation">
      <b>Your score {annotation.score}%</b>
      <span>
        {annotation.goalReached || annotation.goal == null
          ? 'Goal reached at 100%'
          : `Next goal ${annotation.goal}% (+${annotation.goalPp}pp)`}
      </span>
    </span>
  );
}

export const FOCUS_CSS = `
.mr-focus { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--mr-line); min-width: 0; }
.mr-focus-head h3 { margin: 0; display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 800; color: var(--mr-ink); }
.mr-focus-head h3 svg { width: 17px; height: 17px; color: var(--mr-red); flex-shrink: 0; }
.mr-focus-head p { margin: 4px 0 0; font-size: 12.5px; color: var(--mr-muted); overflow-wrap: anywhere; }
.mr-focus-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
.mr-focus-tile { position: relative; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); padding: 14px 16px; background: var(--mr-surface); min-width: 0; }
.mr-focus-tile-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.mr-focus-feature { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--mr-red); }
.mr-focus-feature svg { width: 14px; height: 14px; }
.mr-focus-topic { margin: 8px 0 0; font-size: 16px; font-weight: 800; line-height: 1.3; color: var(--mr-ink); overflow-wrap: anywhere; }
.mr-focus-score { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; margin-top: 4px; }
.mr-focus-score b { font-size: 28px; font-weight: 800; line-height: 1.15; color: var(--mr-ink); }
.mr-focus-sample { font-size: 12px; color: var(--mr-muted); }
.mr-focus-line { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; margin: 10px 0 0; font-size: 12.5px; font-weight: 700; color: var(--mr-ink-2); }
.mr-focus-tag { display: inline-flex; border-radius: 999px; padding: 1px 8px; font-size: 10.5px; font-weight: 800; white-space: nowrap; }
.mr-focus-tag--goal { background: var(--mr-red-soft); color: var(--mr-red); border: 1px solid var(--mr-red-line); }
.mr-focus-tag--actual { background: var(--mr-line-soft); color: var(--mr-ink-2); border: 1px solid var(--mr-line); }
.mr-focus-fine { display: flex; align-items: center; gap: 6px; margin: 8px 0 0; font-size: 11.5px; color: var(--mr-muted); }
.mr-focus-empty p { margin: 6px 0 0; font-size: 12.5px; color: var(--mr-ink-2); overflow-wrap: anywhere; }
.mr-focus-empty .mr-focus-fine { display: block; }
.mr-focus-tip { position: relative; display: inline-flex; flex-shrink: 0; }
.mr-focus-info { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin: -6px -6px -6px 0; padding: 0; border: 0; border-radius: 999px; background: none; color: var(--mr-muted); }
.mr-focus-info svg { width: 16px; height: 16px; }
.mr-focus-info:hover, .mr-focus-info[aria-expanded="true"] { color: var(--mr-red); background: var(--mr-red-soft); }
.mr-focus-pop { position: absolute; z-index: 20; right: 0; top: calc(100% + 6px); display: flex; flex-direction: column; gap: 2px; width: min(320px, 78vw); width: min(320px, calc(100cqw - 56px)); padding: 12px 14px; border: 1px solid var(--mr-line); border-radius: var(--mr-radius-sm); background: var(--mr-surface); box-shadow: 0 8px 24px rgba(16, 24, 40, 0.16); font-size: 12px; font-weight: 400; line-height: 1.45; letter-spacing: 0; text-transform: none; color: var(--mr-ink-2); text-align: left; }
.mr-focus-pop b { margin-top: 6px; font-size: 11px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--mr-ink); }
.mr-focus-pop b:first-child { margin-top: 0; }
.mr-focus-annot { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 8px; margin: 8px 0 0; padding: 5px 9px; border-radius: 8px; background: var(--mr-red-soft); border: 1px solid var(--mr-red-line); font-size: 11.5px; color: var(--mr-ink-2); }
.mr-focus-annot b { font-weight: 800; color: var(--mr-red); }
@container (max-width: 640px) {
  .mr-focus-grid { grid-template-columns: minmax(0, 1fr); }
}
`;
