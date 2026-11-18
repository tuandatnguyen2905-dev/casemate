import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Loader2, RotateCcw } from 'lucide-react';
import { tw } from '../lib/colors';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import CaseResultView from './CaseResultView';
import { openCasePoolCase, sourceFullCase } from './SolveFullCaseCta';
import CalculationAnswerBuilder, { CalculationResultSummaryView } from './CalculationAnswerBuilder';
import {
  buildReasoningFeedback,
  chooseNextAction,
  emptyWorkedAnswer,
  normalizeAttemptHistory,
  resultOutcome,
  retryAction,
  type AttemptHistoryEntry,
} from '../lib/caseResultModel';
import {
  createCalculationAnswerPayload,
  serializeCalculationAnswer,
  type CalculationAnswerPayload,
} from '../lib/calculationAnswerModel';
import {
  CALCULATION_CYCLE_1_CASES,
  calculationCaseById,
  calculationWorkedItems,
  scoreCalculationSubmission,
  type CalculationBankCase,
} from '../lib/calculationsCycle1';
import type { HonestScoreResult } from '../lib/caseScoringRubrics';
import type { LibraryQuestion } from '../lib/skillQuestionLibrary';
import { clarifyUnitText } from '../lib/unitLabels';

interface SavedCalculationAttempt {
  id: number;
  question_id: string;
  answer_json: Record<string, unknown> | string;
  score: number;
  scoring_json: HonestScoreResult | string;
  status: string;
  completed_on?: string;
}

function savedObject<T>(value: T | string | null | undefined): T | null {
  if (value && typeof value === 'object') return value as T;
  if (typeof value !== 'string') return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed as T : null;
  } catch {
    return null;
  }
}

function finalAnswerSpecs(item: CalculationBankCase | null) {
  return (item?.numericChecks || []).map((check, index) => ({ id: `final-${index + 1}`, label: check.label, unit: check.unit, tolerance: check.tolerance }));
}

function emptySubmission(item: CalculationBankCase | null, difficulty: string): CalculationAnswerPayload {
  return createCalculationAnswerPayload(finalAnswerSpecs(item), difficulty === 'hard' || difficulty === 'expert' ? 2 : 1);
}

/** A saved payload carrying the case's current labels, units and tolerances; null when it is not a calculation payload. */
function restoreSubmission(item: CalculationBankCase, raw: unknown): CalculationAnswerPayload | null {
  const saved = raw && typeof raw === 'object' ? raw as Partial<CalculationAnswerPayload> : null;
  if (!saved || !Array.isArray(saved.finalAnswers) || !Array.isArray(saved.formulaRows)) return null;
  const specs = finalAnswerSpecs(item);
  return {
    caveat: String(saved.caveat || ''),
    formulaRows: saved.formulaRows,
    finalAnswers: saved.finalAnswers.map((answer, index) => ({ ...answer, ...(specs[index] || {}), value: String(answer?.value ?? '') })),
  };
}

/** Saved answers are re-marked with the current rules so a reopened score matches a fresh one. */
function remarkedScore(item: CalculationBankCase, submission: CalculationAnswerPayload | null): number | null {
  if (!submission) return null;
  try {
    const score = Number(scoreCalculationSubmission(item, submission).scoring.overallScore);
    return Number.isFinite(score) ? score : null;
  } catch {
    return null;
  }
}

function savedSubmissionOf(item: CalculationBankCase, snapshot: Record<string, unknown> | null): CalculationAnswerPayload | null {
  return restoreSubmission(item, snapshot?.submission ?? snapshot?.calculationAnswer);
}

export default function CalculationCaseExperience({
  question,
  onBack,
  onSubmitted,
  hideEvidenceColumn = false,
  onAnswerInput,
}: {
  question: LibraryQuestion;
  onBack: () => void;
  onSubmitted: () => void;
  hideEvidenceColumn?: boolean;
  onAnswerInput?: () => void;
}) {
  const item = calculationCaseById(question.sourceCaseId);
  const { sessionId } = useSpaceRuntime();
  const { data: attemptRows, loading: attemptsLoading, refresh: refreshAttempts } = window.useWorkspaceDB<SavedCalculationAttempt>('drill_library_attempts', {
    filters: [
      { column: 'session_id', operator: 'eq', value: sessionId || '__no_session__' },
      { column: 'question_id', operator: 'eq', value: question.id },
    ],
    orderBy: { column: 'completed_on', direction: 'desc' },
    limit: 1,
  });
  const [submission, setSubmission] = useState<CalculationAnswerPayload>(() => emptySubmission(item, question.difficulty));
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [retrying, setRetrying] = useState(false);
  const [completedOn, setCompletedOn] = useState('');
  const [attemptHistory, setAttemptHistory] = useState<AttemptHistoryEntry[]>([]);
  const feedback = useMemo(
    () => item && submitted ? scoreCalculationSubmission(item, submission) : null,
    [item, submitted, submission],
  );
  const nextCase = feedback
    ? CALCULATION_CYCLE_1_CASES.find((candidate) => candidate.sourceCaseId === feedback.nextCaseId)
    : null;
  const answered = submission.finalAnswers.some((answer) => answer.value.trim())
    || submission.formulaRows.some((row) => row.numbers.some((slot) => slot.value.trim()));
  const worked = useMemo(
    () => (item && feedback ? calculationWorkedItems(item, feedback.outcome) : null),
    [item, feedback],
  );

  useEffect(() => {
    if (retrying || submitted || !item) return;
    const saved = (attemptRows || []).find((row) => row.status === 'completed');
    if (!saved) return;
    const snapshot = savedObject<Record<string, unknown>>(saved.answer_json);
    const restored = savedSubmissionOf(item, snapshot);
    if (!restored || remarkedScore(item, restored) === null) return;
    setSubmission(restored);
    setCompletedOn(saved.completed_on || '');
    setAttemptHistory(normalizeAttemptHistory(snapshot?.previousAttempts));
    setSubmitted(true);
  }, [attemptRows, item, retrying, submitted]);

  if (!item) return null;

  const leaveQuestion = () => {
    const hasDraft = submission.caveat.trim()
      || submission.finalAnswers.some((answer) => answer.value.trim())
      || submission.formulaRows.some((row) => row.numbers.some((slot) => slot.value.trim() || slot.label.trim()));
    if (!submitted && hasDraft && !window.confirm('Back to the Question Library? Your unfinished calculation will be discarded.')) return;
    onBack();
  };

  const startOver = () => {
    setSubmission(emptySubmission(item, question.difficulty));
    setRetrying(true);
    setSubmitted(false);
    setError('');
  };

  const submit = async () => {
    if (saving) return;
    setSaving(true);
    setError('');
    try {
      const result = scoreCalculationSubmission(item, submission);
      const now = new Date().toISOString();
      let previousAttempts: AttemptHistoryEntry[] = [];
      if (sessionId) {
        const db = (window as any).__workspaceDb;
        if (!db?.from) throw new Error('Your calculation was marked, but saved progress is unavailable. Please try again.');
        const existing = await db
          .from('drill_library_attempts')
          .eq('session_id', sessionId)
          .eq('question_id', question.id)
          .limit(1)
          .get();
        const current = Array.isArray(existing?.data) ? existing.data[0] : null;
        const previousSnapshot = savedObject<Record<string, unknown>>(current?.answer_json);
        const previousScore = current?.status === 'completed'
          ? remarkedScore(item, savedSubmissionOf(item, previousSnapshot)) ?? (savedObject<HonestScoreResult>(current.scoring_json) ? Number(current.score) : null)
          : null;
        previousAttempts = normalizeAttemptHistory([
          ...(previousScore !== null ? [{ score: previousScore, scale: 10, completedOn: current.completed_on }] : []),
          ...(Array.isArray(previousSnapshot?.previousAttempts) ? (previousSnapshot?.previousAttempts as unknown[]) : []),
        ]);
        const answerJson = {
          schemaVersion: 2,
          kind: 'calculation-cycle-1',
          candidateAnswer: serializeCalculationAnswer(submission),
          submission,
          previousAttempts,
        };
        const score = Math.round(Number(result.scoring.overallScore));
        if (current?.id) {
          await db.from('drill_library_attempts').update(current.id, {
            question_id: question.id,
            skill: question.skill,
            difficulty: question.difficulty,
            answer_json: answerJson,
            score,
            scoring_json: result.scoring,
            status: 'completed',
            completed_on: now,
            updated_at: now,
          });
        } else {
          await db.from('drill_library_attempts').insert({
            session_id: sessionId,
            question_id: question.id,
            skill: question.skill,
            difficulty: question.difficulty,
            answer_json: answerJson,
            score,
            scoring_json: result.scoring,
            status: 'completed',
            completed_on: now,
            created_at: now,
            updated_at: now,
          });
        }
      }
      setSubmitted(true);
      setRetrying(false);
      setCompletedOn(now);
      setAttemptHistory(previousAttempts);
      refreshAttempts();
      try { localStorage.setItem(`casemate-expert-completed:${question.id}`, now); } catch { /* Best effort only. */ }
      onSubmitted();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Your calculation could not be saved. Your work is unchanged; please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-5" data-testid={`calculation-cycle-1-${item.code.toLowerCase()}`}>
      <button type="button" onClick={leaveQuestion} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${tw.button.secondary}`}>
        <ArrowLeft className="h-4 w-4" /> Back to case library
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.difficulty === 'hard' ? 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]' : 'bg-[var(--space-neutral-900)] text-[var(--space-neutral-0)]'}`}>{item.difficulty === 'hard' ? 'Hard' : 'Expert'}</span>
        <span className={`${tw.badge.default} ${tw.badge.primary}`}>{item.family}</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">Text-first · no chart</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">{question.estimatedMinutes} min</span>
      </div>

      <section className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Learner-facing brief</p>
        <h1 className="mt-2 break-words text-xl font-extrabold leading-7 text-[var(--space-text-primary)] sm:text-2xl">{clarifyUnitText(item.title)}</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--space-text-secondary)]">{clarifyUnitText(item.brief)}</p>
      </section>

      <section className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Task</p>
        <p className="mt-3 text-base font-bold leading-7 text-[var(--space-text-primary)]">{clarifyUnitText(item.task)}</p>
        <p className="mt-3 text-xs leading-5 text-[var(--space-text-muted)]">{clarifyUnitText(item.roundingRule)}</p>
      </section>

      {!submitted && attemptsLoading && !retrying ? (
        <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 text-center" aria-busy="true" data-testid="calculation-attempt-loading">
          <p className="text-sm font-bold text-[var(--space-text-primary)]">Checking for your saved result…</p>
        </section>
      ) : !submitted ? (
        <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6" data-testid="calculation-answer-area">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Your answer</p>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">The answer key, decision, scoring emphasis, and weak-answer guidance remain hidden until you submit.</p>
          <CalculationAnswerBuilder value={submission} onChange={(next) => { setSubmission(next); setError(''); onAnswerInput?.(); }} disabled={saving} />
          {error ? <p className="mt-4 text-sm font-semibold text-[var(--space-semantic-danger)]" role="alert">{error}</p> : null}
          <button type="button" onClick={() => void submit()} disabled={saving} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold ${tw.button.primary} ${saving ? tw.button.disabled : ''}`} data-testid="button-submit-calculation-answer">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} {saving ? 'Saving your result…' : 'Submit for feedback'}
          </button>
        </section>
      ) : feedback ? (
        <section className="mt-4 space-y-4" data-testid="calculation-feedback">
          {(() => {
            const good = feedback.outcome.results.filter((result) => result.status === 'exact' || result.status === 'close' || result.status === 'carried');
            const rest = feedback.outcome.results.filter((result) => !good.includes(result));
            const outcome = resultOutcome(feedback.scoring.overallScore, 10, { answered });
            const focus = feedback.revisions[0] || '';
            const fullCase = sourceFullCase(question.source_case_id);
            const workedAnswer = worked && worked.items.length
              ? { ...emptyWorkedAnswer('reference'), calculations: worked.items, conclusion: worked.decision || '' }
              : null;
            return (
              <CaseResultView
                score={feedback.scoring.overallScore}
                scale={10}
                outcome={outcome}
                completedOn={completedOn}
                feedback={buildReasoningFeedback({
                  criteria: feedback.scoring.criteria,
                  matched: good.map((result) => `${result.label}: ${result.note}`),
                  failed: feedback.firstDecisiveError ? [feedback.firstDecisiveError] : [],
                  missing: rest.map((result) => `${result.label}: ${result.note}`),
                  exclude: focus ? [focus] : [],
                })}
                criteria={feedback.scoring.criteria}
                learnerResponse={answered ? <CalculationResultSummaryView value={submission} title="Your calculated results" /> : undefined}
                workedAnswer={workedAnswer}
                history={attemptHistory}
                retry={retryAction(startOver, { focus })}
                nextAction={chooseNextAction(outcome, {
                  'next-question': nextCase ? { kind: 'next-question', label: 'Choose the next calculation', detail: `${nextCase.sourceCaseId} · ${nextCase.title} is next in this sequence. It opens from the library.`, onSelect: onBack } : null,
                  'full-case': fullCase ? { kind: 'full-case', label: 'Solve the full case', detail: `Take this calculation into its full case: ${fullCase.title}.`, onSelect: () => openCasePoolCase(fullCase.id) } : null,
                })}
                testId="calculation-result"
              />
            );
          })()}
          <div className="flex flex-col gap-2 pb-20 sm:flex-row sm:pb-0">
            <button type="button" onClick={leaveQuestion} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`}><ArrowLeft className="h-4 w-4" /> Back to Question Library</button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
