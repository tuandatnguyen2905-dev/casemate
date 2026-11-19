// My Roadmap — section 5, "Preparation Timeline": the saved 24-week plan in four
// compact phase cards with This Week / Monthly / Full Plan views. Week details
// stay collapsed until a week is selected. Planning only: no practice buttons.

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { groupWeeksIntoMonths, shortDateLabel } from '../../lib/prepRoadmap';
import type { RoadmapWeek, WeekProgress } from '../../lib/prepRoadmap';
import { fullDateLabel, goalProgress, weekState } from '../../lib/roadmapProgress';
import type { PlanStatus, RoadmapPhase, WeekState } from '../../lib/roadmapProgress';
import {
  Bar,
  Extra,
  STATE_LABEL,
  StateChip,
  TRACKS,
  combinedState,
  phaseState,
  rangeTotals,
  weekChipLabel,
  weekTotals,
} from './roadmapTracks';

export type TimelineView = 'week' | 'month' | 'full';

const TIMELINE_VIEWS: Array<{ id: TimelineView; label: string }> = [
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'Monthly' },
  { id: 'full', label: 'Full Plan' },
];

function WeekDetail({
  week,
  phase,
  progress,
  state,
  id,
}: {
  week: RoadmapWeek;
  phase: RoadmapPhase | undefined;
  progress: WeekProgress | undefined;
  state: WeekState;
  id?: string;
}) {
  const totals = weekTotals(week, progress);
  return (
    <div id={id} className={`mr-week${state === 'current' ? ' is-current' : ''}`} data-testid={`roadmap-week-${week.week}`}>
      <div className="mr-week-head">
        <b>Week {week.week}</b>
        <span className="mr-week-dates">{shortDateLabel(week.start_date)} – {shortDateLabel(week.end_date)}</span>
        <span className="mr-week-theme">{phase ? `Phase ${phase.index} · ${phase.name}` : week.theme}</span>
      </div>
      <div className="mr-week-targets">
        {TRACKS.map((track) => {
          const target = track.targetOf(week);
          const goal = goalProgress(track.doneOf(progress), target);
          const Icon = track.icon;
          return (
            <div key={track.key} className="mr-target-item">
              <div className="mr-target-item-row">
                <Icon />
                <b>{track.label}</b>
                <Extra extra={goal.extra} />
                <span className={`mr-num${goal.complete ? ' is-done' : ''}`}>{goal.counted}/{target}</span>
              </div>
              <Bar done={goal.counted} target={target} size="thin" label={`Week ${week.week} ${track.label}`} />
              <p className="mr-target-item-goal">Target: {target} {target === 1 ? track.unitOne : track.unit}</p>
            </div>
          );
        })}
      </div>
      <div className="mr-week-foot">
        <span><b className="mr-num">{totals.counted}/{totals.target}</b> activities</span>
        <span>{totals.remaining === 0 ? 'Weekly target reached' : `${totals.remaining} remaining`}</span>
        <Extra extra={totals.extra} />
      </div>
    </div>
  );
}

/** One collapsed week row (Monthly and Full Plan views); selecting it reveals the week's details. */
function WeekRow({
  week,
  phase,
  progress,
  state,
  open,
  onToggle,
}: {
  week: RoadmapWeek;
  phase: RoadmapPhase | undefined;
  progress: WeekProgress | undefined;
  state: WeekState;
  open: boolean;
  onToggle: () => void;
}) {
  const detailId = `mr-week-detail-${week.week}`;
  return (
    <div className="mr-full-item">
      <button
        type="button"
        className={`mr-full-row is-${state}`}
        aria-expanded={open}
        aria-controls={detailId}
        onClick={onToggle}
        data-testid={`roadmap-full-week-${week.week}`}
        data-state={state}
      >
        <span className="mr-full-week">
          <b>Week {week.week}</b>
          <span>{shortDateLabel(week.start_date)} – {shortDateLabel(week.end_date)}</span>
        </span>
        <span className="mr-full-tracks">
          {TRACKS.map((track) => {
            const target = track.targetOf(week);
            const goal = goalProgress(track.doneOf(progress), target);
            return (
              <span key={track.key} className="mr-full-track">
                <span className="mr-full-track-top">
                  <span title={track.label}>{track.short}</span>
                  <span className={`mr-num${goal.complete ? ' is-done' : ''}`}>
                    {goal.counted}/{target}{goal.extra > 0 ? ` +${goal.extra}` : ''}
                  </span>
                </span>
                <Bar done={goal.counted} target={target} size="thin" />
              </span>
            );
          })}
        </span>
        <StateChip state={state} label={weekChipLabel(state)} />
        <ChevronDown className="mr-month-chevron" />
      </button>
      {open && (
        <div className="mr-full-detail">
          <WeekDetail id={detailId} week={week} phase={phase} progress={progress} state={state} />
        </div>
      )}
    </div>
  );
}

function PhaseCards({
  phases,
  status,
  progress,
  onSelect,
}: {
  phases: RoadmapPhase[];
  status: PlanStatus;
  progress: Record<number, WeekProgress>;
  onSelect: (phase: RoadmapPhase) => void;
}) {
  return (
    <div className="mr-phases" data-testid="roadmap-phases">
      {phases.map((phase) => {
        const state = phaseState(phase, status);
        const totals = rangeTotals(phase.weeks, progress);
        const first = phase.weeks[0];
        const last = phase.weeks[phase.weeks.length - 1];
        return (
          <button
            key={phase.index}
            type="button"
            className={`mr-phase is-${state}`}
            onClick={() => onSelect(phase)}
            aria-label={`Phase ${phase.index}: ${phase.name}, weeks ${first.week} to ${last.week}, ${STATE_LABEL[state]}, ${totals.counted} of ${totals.target} activities. Show this phase's weeks.`}
            data-testid={`roadmap-phase-${phase.index}`}
            data-state={state}
          >
            <span className="mr-phase-top">
              <span className="mr-phase-idx">Phase {phase.index} · W{first.week}–{last.week}</span>
              <StateChip state={state} />
            </span>
            <span className="mr-phase-name">{phase.name}</span>
            <span className="mr-phase-prog">
              <span className="mr-num">{totals.counted}/{totals.target}</span>
              <Extra extra={totals.extra} />
            </span>
            <Bar done={totals.counted} target={totals.target} size="thin" />
          </button>
        );
      })}
    </div>
  );
}

export default function PreparationTimeline({
  schedule,
  phases,
  status,
  progress,
  view,
  onViewChange,
  focusWeek,
  footer,
}: {
  schedule: RoadmapWeek[];
  phases: RoadmapPhase[];
  status: PlanStatus;
  progress: Record<number, WeekProgress>;
  view: TimelineView;
  onViewChange: (view: TimelineView) => void;
  focusWeek: number;
  footer?: ReactNode;
}) {
  const months = useMemo(() => groupWeeksIntoMonths(schedule), [schedule]);
  const [selectedWeek, setSelectedWeek] = useState<number>(focusWeek);
  const [weekOpen, setWeekOpen] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>({});
  const [openWeek, setOpenWeek] = useState<number | null>(null);

  useEffect(() => {
    setSelectedWeek(focusWeek);
    setWeekOpen(false);
    setOpenWeek(null);
    setExpandedMonths({});
  }, [focusWeek, months]);

  const phaseOf = (weekNumber: number) => phases.find((phase) => phase.weeks.some((week) => week.week === weekNumber));
  const selected = schedule.find((week) => week.week === selectedWeek) || schedule[0];
  const selectedPhase = selected ? phaseOf(selected.week) : undefined;
  const selectedIndex = selected ? schedule.indexOf(selected) : 0;
  const selectedState = selected ? weekState(selected.week, status) : 'upcoming';
  const selectedTotals = selected ? weekTotals(selected, progress[selected.week]) : null;

  const selectWeek = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
    setWeekOpen(true);
  };

  const selectPhase = (phase: RoadmapPhase) => {
    const current = phase.weeks.find((week) => weekState(week.week, status) === 'current') || phase.weeks[0];
    selectWeek(current.week);
    onViewChange('week');
  };

  const toggleWeek = (weekNumber: number) => setOpenWeek((open) => (open === weekNumber ? null : weekNumber));

  return (
    <section className="mr-card mr-timeline" data-testid="roadmap-timeline" aria-labelledby="mr-timeline-title">
      <div className="mr-sec-head">
        <div>
          <span className="mr-eyebrow">Your plan</span>
          <h2 className="mr-h2" id="mr-timeline-title">Preparation Timeline</h2>
          <p className="mr-sub">
            {schedule.length} weeks · {phases.length} phases · {fullDateLabel(schedule[0].start_date)} – {fullDateLabel(schedule[schedule.length - 1].end_date)}
          </p>
        </div>
        <div className="mr-tabs" role="tablist" aria-label="Timeline view" data-testid="roadmap-view-switcher">
          {TIMELINE_VIEWS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              id={`mr-tab-${option.id}`}
              aria-selected={view === option.id}
              aria-controls="mr-timeline-panel"
              className="mr-tab"
              onClick={() => onViewChange(option.id)}
              data-testid={`roadmap-view-${option.id}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <PhaseCards phases={phases} status={status} progress={progress} onSelect={selectPhase} />

      <div className="mr-view" id="mr-timeline-panel" role="tabpanel" aria-labelledby={`mr-tab-${view}`} data-testid={`roadmap-view-panel-${view}`}>
        {view === 'week' && selected && selectedTotals && (
          <div>
            <div className="mr-weeknav">
              <button
                type="button"
                className="mr-icon-btn"
                onClick={() => setSelectedWeek(schedule[Math.max(0, selectedIndex - 1)].week)}
                disabled={selectedIndex === 0}
                aria-label="Previous week"
                data-testid="roadmap-week-prev"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="mr-weekchips" role="group" aria-label="Choose a week">
                {schedule.map((week) => {
                  const state = weekState(week.week, status);
                  const totals = weekTotals(week, progress[week.week]);
                  const met = totals.target > 0 && totals.counted >= totals.target;
                  return (
                    <button
                      key={week.week}
                      type="button"
                      className={`mr-weekchip is-${state}${met ? ' is-met' : ''}`}
                      aria-pressed={week.week === selected.week}
                      aria-label={`Week ${week.week}, ${weekChipLabel(state)}, ${totals.counted} of ${totals.target} activities`}
                      onClick={() => selectWeek(week.week)}
                      data-testid={`roadmap-week-chip-${week.week}`}
                    >
                      {week.week}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className="mr-icon-btn"
                onClick={() => setSelectedWeek(schedule[Math.min(schedule.length - 1, selectedIndex + 1)].week)}
                disabled={selectedIndex >= schedule.length - 1}
                aria-label="Next week"
                data-testid="roadmap-week-next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <button
              type="button"
              className={`mr-week-summary is-${selectedState}`}
              aria-expanded={weekOpen}
              aria-controls="mr-week-detail-selected"
              onClick={() => setWeekOpen((open) => !open)}
              data-testid="roadmap-week-summary"
            >
              <span className="mr-week-summary-main" aria-live="polite">
                <b>Week {selected.week} of {schedule.length}</b>
                <span>
                  {shortDateLabel(selected.start_date)} – {shortDateLabel(selected.end_date)}
                  {selectedPhase ? ` · ${selectedPhase.name}` : ''}
                </span>
              </span>
              <span className="mr-week-summary-count mr-num">{selectedTotals.counted}/{selectedTotals.target} activities</span>
              <StateChip state={selectedState} label={weekChipLabel(selectedState)} />
              <span className="mr-week-summary-toggle">{weekOpen ? 'Hide details' : 'Show details'}</span>
              <ChevronDown className="mr-month-chevron" />
            </button>
            {weekOpen && (
              <WeekDetail
                id="mr-week-detail-selected"
                week={selected}
                phase={selectedPhase}
                progress={progress[selected.week]}
                state={selectedState}
              />
            )}
          </div>
        )}

        {view === 'month' && (
          <div className="mr-months" data-testid="roadmap-months">
            {months.map((month) => {
              const expanded = !!expandedMonths[month.month];
              const first = month.weeks[0];
              const last = month.weeks[month.weeks.length - 1];
              const state = combinedState(month.weeks.map((week) => weekState(week.week, status)));
              const totals = rangeTotals(month.weeks, progress);
              return (
                <div key={month.month} className={`mr-month${state === 'current' ? ' is-current' : ''}`} data-testid={`roadmap-month-${month.month}`}>
                  <button
                    type="button"
                    className="mr-month-btn"
                    aria-expanded={expanded}
                    aria-controls={`mr-month-body-${month.month}`}
                    onClick={() => setExpandedMonths((prev) => ({ ...prev, [month.month]: !prev[month.month] }))}
                  >
                    <span className="mr-month-main">
                      <span className="mr-month-title">
                        {month.label}
                        <span className="mr-month-range">
                          W{first.week}–W{last.week} · {shortDateLabel(first.start_date)} – {shortDateLabel(last.end_date)}
                        </span>
                      </span>
                    </span>
                    <StateChip state={state} />
                    <span className="mr-month-side">
                      <span className="mr-num">{totals.counted}/{totals.target}</span>
                      <Bar done={totals.counted} target={totals.target} size="thin" />
                    </span>
                    <ChevronDown className="mr-month-chevron" />
                  </button>
                  {expanded && (
                    <div className="mr-month-body" id={`mr-month-body-${month.month}`}>
                      <div className="mr-full-list">
                        {month.weeks.map((week) => (
                          <WeekRow
                            key={week.week}
                            week={week}
                            phase={phaseOf(week.week)}
                            progress={progress[week.week]}
                            state={weekState(week.week, status)}
                            open={openWeek === week.week}
                            onToggle={() => toggleWeek(week.week)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {view === 'full' && (
          <div className="mr-full" data-testid="roadmap-full-plan">
            {phases.map((phase) => (
              <div key={phase.index}>
                <p className="mr-full-phase-title">Phase {phase.index} · {phase.name}</p>
                <div className="mr-full-list">
                  {phase.weeks.map((week) => (
                    <WeekRow
                      key={week.week}
                      week={week}
                      phase={phase}
                      progress={progress[week.week]}
                      state={weekState(week.week, status)}
                      open={openWeek === week.week}
                      onToggle={() => toggleWeek(week.week)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {view !== 'week' && (
          <p className="mr-legend">CP = Case Pool · CD = Case Drill · AT = Aptitude Test · select a week to see its targets</p>
        )}
      </div>
      {footer}
    </section>
  );
}
