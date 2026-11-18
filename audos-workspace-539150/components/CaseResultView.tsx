import type { ReactNode } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, CircleAlert, CircleMinus, Lightbulb, MessageSquareText, XCircle } from 'lucide-react';
import CalculationWorkedAnswerView from './CalculationWorkedAnswerView';
import ResultActionBar from './ResultActionBar';
import type { CriterionScore } from '../lib/caseScoringRubrics';
import { scoreBand } from '../lib/scorePresentation';
import { clarifyUnitText, clarifyUnitsDeep } from '../lib/unitLabels';
import {
  OUTCOME_LABELS,
  hasWorkedAnswer,
  type AttemptHistoryEntry,
  type NextActionOption,
  type ReasoningFeedback,
  type ResultOutcome,
  type WorkedAnswerModel,
} from '../lib/caseResultModel';

const sectionLabel = 'text-[11px] font-bold uppercase tracking-[0.14em]';
const HISTORY_SHOWN = 5;

function formatDate(value?: string): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatScore(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function OutcomeIcon({ outcome }: { outcome: ResultOutcome }) {
  if (outcome === 'correct') return <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />;
  if (outcome === 'partial') return <CircleAlert className="h-6 w-6 shrink-0" aria-hidden="true" />;
  if (outcome === 'incorrect') return <XCircle className="h-6 w-6 shrink-0" aria-hidden="true" />;
  return <CircleMinus className="h-6 w-6 shrink-0" aria-hidden="true" />;
}

function FeedbackList({ items, tone, empty }: { items: string[]; tone: 'good' | 'fix'; empty: string }) {
  return items.length ? (
    <ul className="mt-2 space-y-2">
      {items.map((item, index) => (
        <li key={`${index}-${item.slice(0, 24)}`} className="flex gap-2 break-words text-sm leading-6 text-[var(--space-text-secondary)]">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'good' ? 'bg-[var(--space-semantic-success)]' : 'bg-[var(--space-semantic-warning)]'}`} aria-hidden="true" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  ) : <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">{empty}</p>;
}

function WorkedAnswerBody({ model, format, approachSlot }: { model: WorkedAnswerModel | null; format: (value: string) => string; approachSlot?: ReactNode }) {
  const hasModel = hasWorkedAnswer(model);
  const hasApproach = Boolean(approachSlot) || Boolean(hasModel && (model.approach.length || model.structure.length));
  const hasCalculations = Boolean(hasModel && (model.calculations.length || model.calculationLines.length));
  const hasConclusion = Boolean(hasModel && (model.conclusion || model.conclusionDetail || model.checks.length || model.alternatives.length));
  const note = (hasModel || approachSlot) && model?.note ? model.note : '';
  return (
    <div className="mt-3 space-y-4">
      {note ? (
        <p className="rounded-xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_25%,transparent)] bg-[var(--space-surface-accent-soft)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="worked-answer-note">{format(note)}</p>
      ) : null}
      {hasApproach ? (
        <section data-testid="worked-approach">
          <p className={`${sectionLabel} text-[var(--space-text-muted)]`}>Approach</p>
          {approachSlot ? <div className="mt-2 min-w-0">{approachSlot}</div> : null}
          {hasModel && model.approach.length ? (
            <ul className="mt-2 space-y-1.5">
              {model.approach.map((item, index) => <li key={`a-${index}`} className="whitespace-pre-wrap break-words text-sm leading-6 text-[var(--space-text-secondary)]">{format(item)}</li>)}
            </ul>
          ) : null}
          {hasModel && model.structure.length ? (
            <ol className="mt-2 grid gap-2 sm:grid-cols-2">
              {model.structure.map((branch, index) => (
                <li key={`s-${index}`} className="flex gap-2 rounded-xl bg-[var(--space-surface-muted)] p-2.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="font-bold text-[var(--space-text-brand)]">{index + 1}.</span>
                  <span className="min-w-0 break-words">{format(branch)}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </section>
      ) : null}
      {hasCalculations && model ? (
        <section data-testid="worked-calculations">
          <p className={`${sectionLabel} text-[var(--space-text-muted)]`}>Calculations</p>
          {model.calculations.length ? <CalculationWorkedAnswerView embedded items={clarifyUnitsDeep(model.calculations)} testId="worked-calculation-items" /> : null}
          {model.calculationLines.length ? (
            <ol className="mt-2 space-y-1.5">
              {model.calculationLines.map((line, index) => (
                <li key={`c-${index}`} className="flex gap-2 text-sm leading-6 text-[var(--space-text-secondary)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[10px] font-bold text-[var(--space-text-brand)]">{index + 1}</span>
                  <span className="min-w-0 whitespace-pre-wrap break-words tabular-nums">{format(line)}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </section>
      ) : null}
      {hasConclusion && model ? (
        <section data-testid="worked-conclusion">
          <p className={`${sectionLabel} text-[var(--space-text-muted)]`}>Conclusion</p>
          {model.conclusion ? <p className={`mt-1.5 whitespace-pre-wrap break-words ${model.conclusion.length > 220 ? 'text-sm leading-6' : 'text-base font-bold leading-7'} text-[var(--space-text-primary)]`}>{format(model.conclusion)}</p> : null}
          {model.conclusionDetail ? <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 text-[var(--space-text-secondary)]">{format(model.conclusionDetail)}</p> : null}
          {model.checks.length ? (
            <div className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3" data-testid="worked-checks">
              <p className="text-xs font-bold text-[var(--space-text-primary)]">Evidence, assumptions and checks</p>
              <ul className="mt-1.5 space-y-1.5">
                {model.checks.map((item, index) => <li key={`k-${index}`} className="break-words text-xs leading-5 text-[var(--space-text-secondary)]">• {format(item)}</li>)}
              </ul>
            </div>
          ) : null}
          {model.alternatives.length ? (
            <div className="mt-3" data-testid="worked-alternatives">
              <p className="text-xs font-bold text-[var(--space-text-primary)]">Other acceptable answers</p>
              <ul className="mt-1.5 space-y-1.5">
                {model.alternatives.map((item, index) => <li key={`o-${index}`} className="break-words text-xs leading-5 text-[var(--space-text-secondary)]">• {format(item)}</li>)}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

/**
 * The single post-submission result used by Case Drill and Case Pool:
 * 1. score and clear result, then the Retry bar (with the one forward step beside
 * it), 2. what worked / what to fix, 3. the learner's answer beside the worked
 * answer (approach, calculations, conclusion). Hosts pass data only; the order is
 * fixed here.
 */
export default function CaseResultView({
  score,
  scale,
  outcome,
  objective = false,
  completedOn,
  feedback,
  criteria = [],
  learnerResponse,
  learnerResponseText,
  workedAnswer,
  approachSlot,
  workedAnswerBody,
  unavailableReason,
  retry,
  nextAction,
  history = [],
  extras,
  format = (value) => value,
  layout = 'side-by-side',
  summaryNote,
  testId = 'case-result-view',
}: {
  score: number | null;
  scale: number;
  outcome: ResultOutcome;
  objective?: boolean;
  completedOn?: string;
  feedback: ReasoningFeedback;
  criteria?: CriterionScore[];
  learnerResponse?: ReactNode;
  learnerResponseText?: string;
  workedAnswer?: WorkedAnswerModel | null;
  approachSlot?: ReactNode;
  /** Replaces the generic worked-answer body, e.g. the Market Sizing factor model. */
  workedAnswerBody?: ReactNode;
  unavailableReason?: string;
  /** Built with retryAction; shown on every result that can be attempted again. */
  retry?: NextActionOption | null;
  nextAction?: NextActionOption | null;
  history?: AttemptHistoryEntry[];
  extras?: ReactNode;
  format?: (value: string) => string;
  layout?: 'side-by-side' | 'stacked';
  /** Replaces the line under the outcome, e.g. for legacy attempts saved before scores existed. */
  summaryNote?: string;
  testId?: string;
}) {
  const graded = score !== null && Number.isFinite(score);
  const band = scoreBand(graded ? Number(score) : 0, scale);
  const toneClass = outcome === 'not-answered' && !graded
    ? 'border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] text-[var(--space-text-primary)]'
    : band.className;
  const hasModel = hasWorkedAnswer(workedAnswer);
  const showWorked = hasModel || Boolean(approachSlot) || Boolean(workedAnswerBody);
  const exampleKind = hasModel ? workedAnswer.kind === 'example' : Boolean(approachSlot);
  const responseText = String(learnerResponseText ?? '').trim();
  const completed = formatDate(completedOn);
  const rankedCriteria = criteria.slice().sort((a, b) => b.weight - a.weight);
  const shownHistory = history.slice(0, HISTORY_SHOWN);
  const forwardAction = nextAction && nextAction.kind !== 'retry' ? nextAction : null;
  const show = (value: string) => format(clarifyUnitText(value));

  return (
    <section className="mt-4 space-y-4" data-testid={testId} data-outcome={outcome}>
      <div className={`rounded-2xl border-2 p-4 ${toneClass}`} data-testid="result-summary">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <OutcomeIcon outcome={outcome} />
            <div className="min-w-0">
              <p className="text-lg font-extrabold leading-6" data-testid="result-outcome">{OUTCOME_LABELS[outcome]}</p>
              <p className="text-xs font-medium leading-5 opacity-90">
                {summaryNote || (graded
                  ? objective
                    ? 'Marked against the answer key.'
                    : 'Marked against the case rubric and its worked answer.'
                  : 'No answer was graded, so this attempt is not scored.')}
                {completed ? ` · Completed ${completed}` : ''}
              </p>
            </div>
          </div>
          {graded ? (
            <p className="rounded-full bg-[var(--space-surface-card)] px-3 py-1 text-sm font-extrabold tabular-nums text-[var(--space-text-primary)]" data-testid="result-score">
              {formatScore(Number(score))}/{scale}
            </p>
          ) : null}
        </div>
        {shownHistory.length ? (
          <p className="mt-2 text-[11px] leading-4 opacity-90" data-testid="result-attempt-history">
            Earlier attempts: {shownHistory.map((entry) => `${formatScore(entry.score)}/${entry.scale}${formatDate(entry.completedOn) ? ` (${formatDate(entry.completedOn)})` : ''}`).join(' · ')}
            {history.length > shownHistory.length ? ` · ${history.length - shownHistory.length} more` : ''}
          </p>
        ) : null}
      </div>

      {retry ? <ResultActionBar retry={retry} next={forwardAction} format={show} /> : null}

      {extras}

      <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4" data-testid="result-reasoning">
        {!feedback.worked.length && !feedback.failed.length ? (
          <p className="text-sm leading-6 text-[var(--space-text-muted)]" data-testid="result-no-feedback">
            {graded ? 'No itemised feedback was saved for this attempt. Compare your answer with the worked answer below.' : 'Nothing was submitted to assess.'}
          </p>
        ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div data-testid="result-worked">
            <p className={`${sectionLabel} text-[var(--space-semantic-success)]`}>What worked</p>
            <FeedbackList items={feedback.worked.map((item) => show(item))} tone="good" empty={graded ? 'Nothing in this attempt met the standard yet.' : 'Nothing was submitted to assess.'} />
          </div>
          <div data-testid="result-failed">
            <p className={`${sectionLabel} text-[var(--space-semantic-warning)]`}>What to fix</p>
            <FeedbackList items={feedback.failed.map((item) => show(item))} tone="fix" empty="No material gap was found in this attempt." />
          </div>
        </div>
        )}
        {rankedCriteria.length > 1 ? (
          <details className="mt-3 border-t border-[var(--space-border-default)] pt-3" data-testid="result-criteria">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-xs font-bold text-[var(--space-text-primary)] [&::-webkit-details-marker]:hidden">
              How this score was calculated
              <ChevronDown className="h-4 w-4 text-[var(--space-text-brand)]" />
            </summary>
            <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
              {rankedCriteria.map((criterion) => (
                <li key={criterion.key || criterion.label} className="flex flex-col gap-1 py-2 sm:flex-row sm:items-start sm:gap-3">
                  <span className="min-w-0 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                    <span className="font-bold text-[var(--space-text-primary)]">{clarifyUnitText(criterion.label)}</span>
                    <span className="text-[var(--space-text-muted)]"> · {criterion.weight}% weight</span>
                    {criterion.reason ? <span className="block">{show(criterion.reason)}</span> : null}
                  </span>
                  <span className={`inline-flex shrink-0 self-start whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-black tabular-nums ${scoreBand(criterion.score, 10).badgeClassName}`}>{formatScore(criterion.score)}/10</span>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>

      <div className={`grid gap-4 ${layout === 'side-by-side' ? 'lg:grid-cols-2 lg:items-start' : ''}`} data-testid="result-comparison">
        <div className="min-w-0 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4" data-testid="result-learner-response">
          <p className={`flex items-center gap-1.5 ${sectionLabel} text-[var(--space-text-brand)]`}><MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" /> Your answer</p>
          {learnerResponse ? (
            <div className="mt-2 min-w-0">{learnerResponse}</div>
          ) : responseText ? (
            <p className="mt-2 max-h-96 overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--space-surface-muted)] p-3 text-sm leading-6 text-[var(--space-text-secondary)]">{responseText}</p>
          ) : (
            <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] p-3 text-sm leading-6 text-[var(--space-text-muted)]" data-testid="result-no-response">You did not submit an answer for this attempt.</p>
          )}
        </div>

        {showWorked ? (
          <div className="min-w-0 rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-card)] p-4" data-testid="result-worked-answer" data-kind={exampleKind ? 'example' : 'reference'}>
            <p className={`flex items-center gap-1.5 ${sectionLabel} text-[var(--space-text-brand)]`}><Lightbulb className="h-3.5 w-3.5" aria-hidden="true" /> {exampleKind ? 'A strong example answer' : 'Worked answer'}</p>
            {workedAnswerBody ? <div className="min-w-0">{workedAnswerBody}</div> : <WorkedAnswerBody model={workedAnswer || null} format={show} approachSlot={approachSlot} />}
          </div>
        ) : (
          <div className="min-w-0 rounded-2xl border border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] p-4" data-testid="result-worked-answer-unavailable">
            <p className={`${sectionLabel} text-[var(--space-text-muted)]`}>Worked answer</p>
            <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">
              {unavailableReason || 'There is not yet enough verified case evidence to show a trustworthy worked answer for this question.'} Your score and the feedback above come from the rubric criteria only.
            </p>
          </div>
        )}
      </div>

      {!retry && nextAction ? (
        <div className="rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4" data-testid="result-next-action" data-kind={nextAction.kind}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className={`${sectionLabel} text-[var(--space-text-brand)]`}>Your next step</p>
              {nextAction.detail ? <p className="mt-1 break-words text-sm leading-6 text-[var(--space-text-primary)]">{show(nextAction.detail)}</p> : null}
            </div>
            <button
              type="button"
              onClick={nextAction.onSelect}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)] transition-opacity hover:opacity-90"
              data-testid="button-result-next-action"
            >
              {clarifyUnitText(nextAction.label)} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
