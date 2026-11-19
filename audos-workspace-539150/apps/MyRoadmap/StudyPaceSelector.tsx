// Casemate — My Roadmap section 2, compact "Study Pace".
//
// A one-row segmented control (Take It Slow / Balanced / Hardcore) with the
// selected-week workload, estimated study hours and whole-plan activity total.
// Choosing an option only previews it: the figures come from the same pace engine
// (lib/studyPace.ts) that drives every other section, and nothing is saved until
// Apply. Leaving the page or choosing the saved option again drops the preview.
// No practice CTAs here: those live only in "Recommended for you".

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Flame, Leaf, Loader2, Scale } from 'lucide-react';
import type { RoadmapWeek } from '../../lib/prepRoadmap';
import { fullDateLabel, localDayOf } from '../../lib/roadmapProgress';
import {
  DEFAULT_STUDY_PACE,
  HOURS_DISCLAIMER,
  STUDY_PACES,
  STUDY_PACE_META,
  applyStudyPace,
  estimateWeeklyMinutes,
  formatStudyHours,
  paceTargetsFor,
  phaseIndexByWeek,
  planActivityTotal,
  weekTargetsOf,
  withPaceChange,
} from '../../lib/studyPace';
import type { PaceWeekTargets, StudyPace, StudyPaceConfig } from '../../lib/studyPace';

const PACE_ICON: Record<StudyPace, typeof Leaf> = { slow: Leaf, balanced: Scale, hardcore: Flame };

const ROWS: Array<{ key: keyof PaceWeekTargets; one: string; many: string }> = [
  { key: 'case_pool', one: 'case', many: 'cases' },
  { key: 'case_drill', one: 'drill', many: 'drills' },
  { key: 'aptitude', one: 'test', many: 'tests' },
];

function targetsLine(targets: PaceWeekTargets): string {
  return ROWS.map((row) => `${targets[row.key]} ${targets[row.key] === 1 ? row.one : row.many}`).join(' · ');
}

function Delta({ from, to, unit }: { from: number; to: number; unit?: string }) {
  const diff = Math.round((to - from) * 10) / 10;
  if (diff === 0) return null;
  return (
    <span className={`mr-pace-delta ${diff > 0 ? 'is-up' : 'is-down'}`}>
      {diff > 0 ? '+' : '−'}{Math.abs(diff)}{unit || ''}
    </span>
  );
}

function appliedOn(config: StudyPaceConfig | null): string | null {
  if (!config) return null;
  const last = config.history[config.history.length - 1];
  const day = localDayOf(last?.applied_at || config.updated_at);
  return day ? fullDateLabel(day) : null;
}

export interface StudyPaceSelectorProps {
  /** The plan's dated weeks; their targets are recomputed here for each pace. */
  baseSchedule: RoadmapWeek[];
  /** Saved pace configuration; null = never chosen (Balanced). */
  config: StudyPaceConfig | null;
  /** First week a new pace would change, or null when the plan has ended. */
  effectiveWeek: number | null;
  /** Week whose targets the preview compares (the current week). */
  focusWeek: number;
  saving: boolean;
  error: string | null;
  notice: string | null;
  onApply: (pace: StudyPace) => void;
}

export default function StudyPaceSelector({
  baseSchedule,
  config,
  effectiveWeek,
  focusWeek,
  saving,
  error,
  notice,
  onApply,
}: StudyPaceSelectorProps) {
  const savedPace: StudyPace = config?.pace || DEFAULT_STUDY_PACE;
  const [selected, setSelected] = useState<StudyPace>(savedPace);
  const optionRefs = useRef<Record<StudyPace, HTMLButtonElement | null>>({ slow: null, balanced: null, hardcore: null });

  useEffect(() => {
    setSelected(savedPace);
  }, [savedPace]);

  const totalWeeks = baseSchedule.length;
  const phaseOf = useMemo(() => phaseIndexByWeek(baseSchedule), [baseSchedule]);
  const focusPhase = phaseOf[focusWeek] || 1;

  const current = useMemo(() => {
    const schedule = applyStudyPace(baseSchedule, config);
    const week = schedule.find((item) => item.week === focusWeek) || schedule[0];
    const targets = week ? weekTargetsOf(week) : paceTargetsFor(savedPace, focusPhase);
    return { targets, minutes: estimateWeeklyMinutes(targets), total: planActivityTotal(schedule) };
  }, [baseSchedule, config, focusWeek, focusPhase, savedPace]);

  const preview = useMemo(() => {
    if (selected === savedPace || effectiveWeek == null) return current;
    const schedule = applyStudyPace(baseSchedule, withPaceChange(config, selected, effectiveWeek));
    const targets = paceTargetsFor(selected, focusPhase);
    return { targets, minutes: estimateWeeklyMinutes(targets), total: planActivityTotal(schedule) };
  }, [selected, savedPace, current, effectiveWeek, config, baseSchedule, focusPhase]);

  const isPreviewing = selected !== savedPace;
  const canApply = isPreviewing && effectiveWeek != null && !saving;
  const applied = appliedOn(config);

  const scopeText = effectiveWeek == null
    ? 'Your plan has ended, so there are no weeks left to re-pace.'
    : effectiveWeek <= 1
      ? `Applies to all ${totalWeeks} weeks.`
      : `Applies from Week ${effectiveWeek} (this week); Weeks 1–${effectiveWeek - 1} keep their targets.`;

  const statusText = error
    ? null
    : notice
      ? notice
      : isPreviewing
        ? effectiveWeek == null
          ? 'There are no weeks left to re-pace.'
          : `Previewing ${STUDY_PACE_META[selected].label} — not saved until you apply it.`
        : `${STUDY_PACE_META[savedPace].label} is your current pace${applied ? ` · applied ${applied}` : ''}.`;

  const moveSelection = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = STUDY_PACES.indexOf(selected);
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % STUDY_PACES.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + STUDY_PACES.length) % STUDY_PACES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = STUDY_PACES.length - 1;
    else return;
    event.preventDefault();
    const pace = STUDY_PACES[next];
    setSelected(pace);
    optionRefs.current[pace]?.focus();
  };

  return (
    <section
      className="mr-card mr-pace"
      data-testid="roadmap-study-pace"
      data-saved-pace={savedPace}
      data-selected-pace={selected}
      aria-labelledby="mr-pace-title"
    >
      <div className="mr-pace-bar">
        <div className="mr-pace-head">
          <span className="mr-eyebrow">How hard you study</span>
          <h2 className="mr-h2" id="mr-pace-title">Study Pace</h2>
        </div>

        <div className="mr-seg mr-pace-seg" role="radiogroup" aria-labelledby="mr-pace-title" onKeyDown={moveSelection}>
          {STUDY_PACES.map((pace) => {
            const Icon = PACE_ICON[pace];
            const checked = selected === pace;
            return (
              <button
                key={pace}
                ref={(node) => {
                  optionRefs.current[pace] = node;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                title={STUDY_PACE_META[pace].tagline}
                className={`mr-seg-btn${checked ? ' is-selected' : ''}${pace === savedPace ? ' is-saved' : ''}`}
                onClick={() => setSelected(pace)}
                data-testid={`roadmap-pace-option-${pace}`}
              >
                <Icon aria-hidden="true" />
                <span>{STUDY_PACE_META[pace].label}</span>
                {pace === savedPace && <span className="mr-seg-dot" aria-label="current pace" />}
              </button>
            );
          })}
        </div>

        <dl className="mr-pace-metrics" data-testid="roadmap-pace-preview" aria-live="polite">
          <div data-testid="roadmap-pace-week">
            <dt>Week {focusWeek} workload</dt>
            <dd className="mr-num">{targetsLine(preview.targets)}</dd>
          </div>
          <div data-testid="roadmap-pace-hours">
            <dt>Est. study time</dt>
            <dd className="mr-num">
              {formatStudyHours(preview.minutes)} / week
              {isPreviewing && <Delta from={current.minutes / 60} to={preview.minutes / 60} unit=" h" />}
            </dd>
          </div>
          <div data-testid="roadmap-pace-total">
            <dt>Planned activities</dt>
            <dd className="mr-num">
              <b data-testid="roadmap-pace-total-value">{preview.total}</b>
              {isPreviewing ? <span className="mr-pace-vs"> vs {current.total} now</span> : <span className="mr-pace-vs"> in your plan</span>}
              {isPreviewing && <Delta from={current.total} to={preview.total} />}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          className="mr-btn mr-btn--primary mr-pace-apply"
          onClick={() => canApply && onApply(selected)}
          disabled={!canApply}
          data-testid="button-apply-study-pace"
        >
          {saving && <Loader2 className="mr-spin" />}
          {saving ? 'Applying…' : 'Apply'}
        </button>
      </div>

      <p className="mr-pace-note" role="status" data-testid="roadmap-pace-status">
        {error ? <span className="mr-error">{error}</span> : <span className="mr-pace-status">{statusText}</span>}
        <span>{scopeText} Completed sessions always stay counted.</span>
        <span className="mr-pace-disclaimer">{HOURS_DISCLAIMER}.</span>
      </p>
    </section>
  );
}
