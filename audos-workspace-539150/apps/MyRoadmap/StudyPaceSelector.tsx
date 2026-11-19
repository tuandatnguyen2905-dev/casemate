// Casemate — My Roadmap: "Choose Your Study Pace".
//
// Three paces for the saved plan. Choosing an option only previews it: the
// comparison below is computed from the same pace engine (lib/studyPace.ts)
// that drives every other section, and nothing is saved until "Apply Study
// Pace". Leaving the page or choosing the saved option again drops the preview.
// No practice CTAs here: those live only in "Recommended for Your Target Program".

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { CheckCircle2, Flame, Leaf, Loader2, Scale } from 'lucide-react';
import type { RoadmapWeek } from '../../lib/prepRoadmap';
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

const ROWS: Array<{ key: keyof PaceWeekTargets; label: string; one: string; many: string }> = [
  { key: 'case_pool', label: 'Case Pool', one: 'case', many: 'cases' },
  { key: 'case_drill', label: 'Case Drill', one: 'drill', many: 'drills' },
  { key: 'aptitude', label: 'Aptitude Test', one: 'test', many: 'tests' },
];

function targetsLine(targets: PaceWeekTargets): string {
  return ROWS.map((row) => `${targets[row.key]} ${targets[row.key] === 1 ? row.one : row.many}`).join(' · ');
}

function Delta({ from, to, unit }: { from: number; to: number; unit?: string }) {
  const diff = Math.round((to - from) * 10) / 10;
  if (diff === 0) return <span className="mr-pace-delta is-same">No change</span>;
  return (
    <span className={`mr-pace-delta ${diff > 0 ? 'is-up' : 'is-down'}`}>
      {diff > 0 ? '+' : '−'}{Math.abs(diff)}{unit || ''}
    </span>
  );
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
  const phaseNumbers = useMemo(() => Array.from(new Set(Object.values(phaseOf))).sort((a, b) => a - b), [phaseOf]);

  const current = useMemo(() => {
    const schedule = applyStudyPace(baseSchedule, config);
    const week = schedule.find((item) => item.week === focusWeek) || schedule[0];
    const targets = week ? weekTargetsOf(week) : paceTargetsFor(savedPace, focusPhase);
    return { targets, minutes: estimateWeeklyMinutes(targets), total: planActivityTotal(schedule) };
  }, [baseSchedule, config, focusWeek, focusPhase, savedPace]);

  const projections = useMemo(() => {
    const out = {} as Record<StudyPace, { targets: PaceWeekTargets; minutes: number; total: number }>;
    STUDY_PACES.forEach((pace) => {
      const next = effectiveWeek ? withPaceChange(config, pace, effectiveWeek) : config;
      const schedule = applyStudyPace(baseSchedule, next);
      const targets = paceTargetsFor(pace, focusPhase);
      out[pace] = { targets, minutes: estimateWeeklyMinutes(targets), total: planActivityTotal(schedule) };
    });
    return out;
  }, [baseSchedule, config, effectiveWeek, focusPhase]);

  const preview = projections[selected];
  const isPreviewing = selected !== savedPace;
  const canApply = isPreviewing && effectiveWeek != null && !saving;

  const applies = isPreviewing ? 'Applies' : 'A new pace applies';
  const scopeText = effectiveWeek == null
    ? 'Your plan has ended, so there are no weeks left to re-pace.'
    : effectiveWeek <= 1
      ? `${applies} to all ${totalWeeks} weeks of your plan.`
      : `${applies} from Week ${effectiveWeek} (this week) to Week ${totalWeeks}. Weeks 1–${effectiveWeek - 1} keep their targets.`;

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
    <section className="mr-card mr-pace" data-testid="roadmap-study-pace" data-saved-pace={savedPace} data-selected-pace={selected} aria-labelledby="mr-pace-title">
      <div className="mr-sec-head">
        <div>
          <span className="mr-eyebrow">Your weekly load</span>
          <h2 className="mr-h2" id="mr-pace-title">Choose Your Study Pace</h2>
          <p className="mr-sub">Pick a pace you can keep up for your {totalWeeks}-week plan. Preview it first — nothing changes until you apply it.</p>
        </div>
        <span className="mr-pill mr-pill--soft" data-testid="roadmap-pace-current">Current: {STUDY_PACE_META[savedPace].label}</span>
      </div>

      <div className="mr-pace-options" role="radiogroup" aria-label="Study pace" onKeyDown={moveSelection}>
        {STUDY_PACES.map((pace) => {
          const meta = STUDY_PACE_META[pace];
          const Icon = PACE_ICON[pace];
          const projection = projections[pace];
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
              className={`mr-pace-option${checked ? ' is-selected' : ''}${pace === savedPace ? ' is-saved' : ''}`}
              onClick={() => setSelected(pace)}
              data-testid={`roadmap-pace-option-${pace}`}
            >
              <span className="mr-pace-option-top">
                <span className="mr-pace-icon"><Icon /></span>
                <span className="mr-pace-name">{meta.label}</span>
                {checked ? <CheckCircle2 className="mr-pace-check" aria-hidden="true" /> : <span className="mr-pace-radio" aria-hidden="true" />}
              </span>
              <span className="mr-pace-tagline">{meta.tagline}</span>
              <span className="mr-pace-week mr-num">Week {focusWeek}: {targetsLine(projection.targets)}</span>
              <span className="mr-pace-meta mr-num">
                <span>{formatStudyHours(projection.minutes)} / week</span>
                <span>{projection.total} activities in plan</span>
              </span>
              {pace === savedPace && <span className="mr-pace-badge">Current pace</span>}
              {checked && pace !== savedPace && <span className="mr-pace-badge is-preview">Previewing</span>}
            </button>
          );
        })}
      </div>

      <div className="mr-pace-preview" data-testid="roadmap-pace-preview" aria-live="polite">
        {isPreviewing ? (
          <>
            <p className="mr-pace-preview-title">
              Preview: <b>{STUDY_PACE_META[selected].label}</b> vs your current plan ({STUDY_PACE_META[savedPace].label})
            </p>
            <div className="mr-pace-compare" role="table" aria-label={`Week ${focusWeek} targets: current plan compared with ${STUDY_PACE_META[selected].label}`}>
              <div className="mr-pace-row is-head" role="row">
                <span role="columnheader">Week {focusWeek}</span>
                <span role="columnheader">Current</span>
                <span role="columnheader">Preview</span>
                <span role="columnheader">Change</span>
              </div>
              {ROWS.map((row) => (
                <div key={row.key} className="mr-pace-row" role="row" data-testid={`roadmap-pace-compare-${row.key}`}>
                  <span role="rowheader">{row.label}</span>
                  <span role="cell" className="mr-num">{current.targets[row.key]}</span>
                  <span role="cell" className="mr-num"><b>{preview.targets[row.key]}</b></span>
                  <span role="cell"><Delta from={current.targets[row.key]} to={preview.targets[row.key]} /></span>
                </div>
              ))}
              <div className="mr-pace-row" role="row" data-testid="roadmap-pace-compare-hours">
                <span role="rowheader">Est. study time / week</span>
                <span role="cell" className="mr-num">{formatStudyHours(current.minutes)}</span>
                <span role="cell" className="mr-num"><b>{formatStudyHours(preview.minutes)}</b></span>
                <span role="cell"><Delta from={current.minutes / 60} to={preview.minutes / 60} unit=" h" /></span>
              </div>
              <div className="mr-pace-row is-total" role="row" data-testid="roadmap-pace-compare-total">
                <span role="rowheader">Whole-plan activities</span>
                <span role="cell" className="mr-num">{current.total}</span>
                <span role="cell" className="mr-num"><b>{preview.total}</b></span>
                <span role="cell"><Delta from={current.total} to={preview.total} /></span>
              </div>
            </div>
            <ul className="mr-pace-phases" aria-label={`${STUDY_PACE_META[selected].label} weekly targets by phase`}>
              {phaseNumbers.map((phase) => {
                const targets = paceTargetsFor(selected, phase);
                return (
                  <li key={phase} className={phase === focusPhase ? 'is-current' : undefined}>
                    <b>Phase {phase}</b>
                    <span className="mr-num">{targets.case_pool} / {targets.case_drill} / {targets.aptitude}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mr-pace-legend">Per week: Case Pool / Case Drill / Aptitude Test</p>
          </>
        ) : (
          <p className="mr-pace-preview-title" data-testid="roadmap-pace-summary">
            <b>{STUDY_PACE_META[savedPace].label}</b> is your current pace · Week {focusWeek}: {targetsLine(current.targets)} ·{' '}
            {formatStudyHours(current.minutes)} / week · {current.total} activities in your plan
          </p>
        )}
        <p className="mr-pace-scope">{scopeText} Completed sessions always stay counted.</p>
        <p className="mr-pace-disclaimer">{HOURS_DISCLAIMER}</p>
      </div>

      <div className="mr-pace-actions">
        <button
          type="button"
          className="mr-btn mr-btn--primary"
          onClick={() => canApply && onApply(selected)}
          disabled={!canApply}
          data-testid="button-apply-study-pace"
        >
          {saving && <Loader2 className="mr-spin" />}
          {saving ? 'Applying…' : 'Apply Study Pace'}
        </button>
        <span className="mr-pace-status" role="status" data-testid="roadmap-pace-status">
          {error
            ? <span className="mr-error">{error}</span>
            : notice
              ? notice
              : !isPreviewing
                ? 'Choose a different pace to preview it.'
                : effectiveWeek == null
                  ? 'There are no weeks left to re-pace.'
                  : 'Not saved yet — apply to update your plan.'}
        </span>
      </div>
    </section>
  );
}
