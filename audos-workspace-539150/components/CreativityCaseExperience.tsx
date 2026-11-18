import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Eye, Lightbulb, Loader2, RefreshCw } from 'lucide-react';
import { tw } from '../lib/colors';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { gradeCaseExercise } from '../lib/caseScoringClient';
import type { HonestScoreResult } from '../lib/caseScoringRubrics';
import type { LibraryQuestion } from '../lib/skillQuestionLibrary';
import {
  creativityCaseBySourceId,
  creativityRubricForCase,
  serializeCreativityAnswers,
} from '../lib/creativityCycle2';
import CaseResultView from './CaseResultView';
import { buildFeedbackPriorities } from '../lib/feedbackPresentation';
import { clarifyUnitText } from '../lib/unitLabels';
import { openCasePoolCase, sourceFullCase } from './SolveFullCaseCta';
import {
  buildReasoningFeedback,
  chooseNextAction,
  emptyWorkedAnswer,
  hasLearnerResponse,
  normalizeAttemptHistory,
  resultOutcome,
  retryAction,
  workedAnswerReferenceText,
  type AttemptHistoryEntry,
  type WorkedAnswerModel,
} from '../lib/caseResultModel';

interface SavedCreativityAttempt {
  id: number;
  question_id: string;
  answer_json: Record<string, unknown> | string;
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

/** The strong-response example shown after submission is also the grader's reference. */
function creativityWorkedAnswer(bankCase: NonNullable<ReturnType<typeof creativityCaseBySourceId>>): WorkedAnswerModel {
  return {
    ...emptyWorkedAnswer('example'),
    approach: bankCase.assessment ? [`How strong answers are judged: ${bankCase.assessment}`] : [],
    conclusion: String(bankCase.workedResponse || ''),
    alternatives: bankCase.scoringExampleAlternative ? [String(bankCase.scoringExampleAlternative)] : [],
    note: 'A strong example, not the only acceptable answer. Other mechanisms that use the same facts and constraints earn full credit.',
  };
}

export default function CreativityCaseExperience({
  question,
  onBack,
  onSubmitted,
  hideEvidenceColumn = false,
  onAnswerInput,
  onGraded,
  onGradeError,
}: {
  question: LibraryQuestion;
  onBack: () => void;
  onSubmitted?: () => void;
  hideEvidenceColumn?: boolean;
  onAnswerInput?: () => void;
  onGraded?: (scoring: HonestScoreResult) => void;
  onGradeError?: (error: unknown) => void;
}) {
  const bankCase = creativityCaseBySourceId(question.sourceCaseId);
  const { sessionId } = useSpaceRuntime();
  const { data: attemptRows, refresh: refreshAttempts } = window.useWorkspaceDB<SavedCreativityAttempt>('drill_library_attempts', {
    filters: [
      { column: 'session_id', operator: 'eq', value: sessionId || '__no_session__' },
      { column: 'question_id', operator: 'eq', value: question.id },
    ],
    orderBy: { column: 'completed_on', direction: 'desc' },
    limit: 1,
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [score, setScore] = useState<HonestScoreResult | null>(null);
  const [grading, setGrading] = useState(false);
  const [error, setError] = useState('');
  const [retrying, setRetrying] = useState(false);
  const [completedOn, setCompletedOn] = useState('');
  const [attemptHistory, setAttemptHistory] = useState<AttemptHistoryEntry[]>([]);

  const weakest = useMemo(() => score?.criteria.slice().sort((a, b) => a.score - b.score || b.weight - a.weight) || [], [score]);
  const feedbackPriorities = buildFeedbackPriorities({
    evidenceToRevisit: score?.evidenceToRevisit || [],
    nextStep: score?.nextStep,
    furtherImprovements: score?.furtherImprovements || [],
    fallbackActions: weakest.map((criterion) => ({ action: criterion.strongerAnswer, why: criterion.reason })),
  });

  useEffect(() => {
    if (retrying || score || !bankCase) return;
    const saved = (attemptRows || []).find((row) => row.status === 'completed');
    if (!saved) return;
    const savedScore = savedObject<HonestScoreResult>(saved.scoring_json);
    const snapshot = savedObject<Record<string, unknown>>(saved.answer_json);
    if (!savedScore || !Array.isArray(savedScore.criteria) || !snapshot) return;
    const storedAnswers = snapshot.answers && typeof snapshot.answers === 'object' && !Array.isArray(snapshot.answers)
      ? Object.fromEntries(Object.entries(snapshot.answers as Record<string, unknown>).map(([key, value]) => [key, String(value || '')]))
      : {};
    setAnswers(storedAnswers);
    setSubmittedAnswer(String(snapshot.candidateAnswer || snapshot.working || snapshot.answer || ''));
    setScore(savedScore);
    setCompletedOn(saved.completed_on || '');
    setAttemptHistory(normalizeAttemptHistory(snapshot.previousAttempts));
  }, [attemptRows, bankCase, retrying, score]);

  if (!bankCase) {
    return (
      <div className="mt-5 rounded-2xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] p-5">
        <p className="text-sm font-bold text-[var(--space-semantic-danger)]">This Creativity source case could not be loaded.</p>
        <button type="button" onClick={onBack} className={`mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${tw.button.secondary}`}><ArrowLeft className="h-4 w-4" /> Back to case library</button>
      </div>
    );
  }

  const candidateAnswer = serializeCreativityAnswers(bankCase, answers);
  const submit = async () => {
    if (grading) return;
    setGrading(true);
    setError('');
    try {
      const result = await gradeCaseExercise({
        exerciseType: 'creativity',
        rubricOverride: creativityRubricForCase(bankCase),
        title: bankCase.title,
        question: bankCase.task,
        caseContext: `${bankCase.brief}\n\nHOW TO ASSESS: ${bankCase.assessment}\n\nSOURCE RUBRIC: ${bankCase.sourceRubric}`,
        referenceAnswer: workedAnswerReferenceText(creativityWorkedAnswer(bankCase)),
        answer: candidateAnswer,
      });
      const now = new Date().toISOString();
      let previousAttempts: AttemptHistoryEntry[] = [];
      if (sessionId) {
        const db = (window as any).__workspaceDb;
        if (!db?.from) throw new Error('Mate graded your answer, but saved progress is unavailable. Please try again.');
        const existing = await db
          .from('drill_library_attempts')
          .eq('session_id', sessionId)
          .eq('question_id', question.id)
          .limit(1)
          .get();
        const current = Array.isArray(existing?.data) ? existing.data[0] : null;
        const previousScore = savedObject<HonestScoreResult>(current?.scoring_json);
        const previousSnapshot = savedObject<Record<string, unknown>>(current?.answer_json);
        previousAttempts = normalizeAttemptHistory([
          ...(current?.status === 'completed' && previousScore ? [{ score: Number(current.score), scale: 10, completedOn: current.completed_on }] : []),
          ...(Array.isArray(previousSnapshot?.previousAttempts) ? (previousSnapshot?.previousAttempts as unknown[]) : []),
        ]);
        const values = {
          question_id: question.id,
          skill: question.skill,
          difficulty: question.difficulty,
          answer_json: { schemaVersion: 2, kind: 'creativity', candidateAnswer, answers, previousAttempts },
          score: Math.round(Number(result.overallScore)),
          scoring_json: result,
          status: 'completed',
          completed_on: now,
          updated_at: now,
        };
        if (current?.id) await db.from('drill_library_attempts').update(current.id, values);
        else await db.from('drill_library_attempts').insert({ session_id: sessionId, ...values, created_at: now });
      }
      setSubmittedAnswer(candidateAnswer);
      setScore(result);
      setRetrying(false);
      setCompletedOn(now);
      setAttemptHistory(previousAttempts);
      refreshAttempts();
      onSubmitted?.();
      onGraded?.(result);
      try { localStorage.setItem(`casemate-expert-completed:${question.id}`, now); } catch { /* best effort */ }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not grade this answer. Your work is unchanged; please try again.');
      onGradeError?.(caught);
    } finally {
      setGrading(false);
    }
  };

  const leaveQuestion = () => {
    const hasDraft = Object.values(answers).some((value) => value.trim());
    if (!score && hasDraft && !window.confirm('Back to the Creativity Library? Your unfinished answer will be discarded.')) return;
    onBack();
  };

  const startOver = () => {
    setAnswers({});
    setSubmittedAnswer('');
    setRetrying(true);
    setScore(null);
    setError('');
  };

  return (
    <div className="mt-5" data-testid="creativity-case-experience">
      <button type="button" onClick={leaveQuestion} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${tw.button.secondary}`}>
        <ArrowLeft className="h-4 w-4" /> Back to Creativity library
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`${tw.badge.default} ${tw.badge.primary}`}>{bankCase.categoryLabel}</span>
        <span className={`${tw.badge.default} ${tw.badge.neutral}`}>{bankCase.code}</span>
        <span className="text-xs text-[var(--space-text-muted)]">Rubric: {bankCase.rubricVersion}</span>
      </div>

      <section className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Case brief</p>
        <h2 className="mt-2 text-xl font-bold text-[var(--space-text-primary)] sm:text-2xl">{clarifyUnitText(bankCase.title)}</h2>
        <p className="mt-3 max-w-[90ch] text-sm leading-7 text-[var(--space-text-secondary)]">{clarifyUnitText(bankCase.brief)}</p>
        <div className="mt-4 rounded-xl border-l-4 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Your task</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{clarifyUnitText(bankCase.task)}</p>
        </div>
      </section>

      {!score ? (
        <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-6" data-testid="creativity-answer-fields">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><Lightbulb className="h-4 w-4 text-[var(--space-text-brand)]" /></div>
            <div>
              <h3 className="text-sm font-bold text-[var(--space-text-primary)]">Build your {bankCase.categoryLabel} response</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">The strong-response example stays hidden until you submit. Other valid mechanisms receive credit when they use the same facts and constraints.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {bankCase.responseFields.map((field) => (
              <label key={field.key} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 text-xs font-bold text-[var(--space-text-primary)]">
                {clarifyUnitText(field.label)}
                <span className="mt-1 block font-normal leading-5 text-[var(--space-text-muted)]">{clarifyUnitText(field.help)}</span>
                <textarea
                  value={answers[field.key] || ''}
                  onChange={(event) => { setAnswers((current) => ({ ...current, [field.key]: event.target.value })); onAnswerInput?.(); }}
                  rows={3}
                  disabled={grading}
                  placeholder={`Write your ${field.label.toLowerCase()}…`}
                  className={`${tw.input.base} ${tw.input.default} mt-2 min-h-24 text-sm font-normal leading-6`}
                  data-testid={`creativity-field-${field.key}`}
                />
              </label>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-[var(--space-text-muted)]">Weak or mostly empty work may score 0–2/10. Novelty alone does not earn credit.</p>
          {error ? <p className="mt-3 text-sm text-[var(--space-semantic-danger)]" role="alert">{error}</p> : null}
          <button type="button" onClick={() => void submit()} disabled={grading} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold ${tw.button.primary} ${grading ? tw.button.disabled : ''}`} data-testid="button-submit-creativity-answer">
            {grading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {grading ? 'Mate is grading…' : 'Submit for feedback'}
          </button>
        </section>
      ) : (
        <div data-testid="creativity-feedback">
          {(() => {
            const outcome = resultOutcome(score.overallScore, 10, { answered: hasLearnerResponse(submittedAnswer) });
            const focus = feedbackPriorities.nextStep?.action || '';
            const fullCase = sourceFullCase(question.source_case_id);
            return (
              <CaseResultView
                score={score.overallScore}
                scale={10}
                outcome={outcome}
                completedOn={completedOn}
                feedback={buildReasoningFeedback({
                  criteria: score.criteria,
                  evidenceToRevisit: score.evidenceToRevisit || [],
                  failed: score.overallScore <= 2 && bankCase.weakAnswerFeedback ? [bankCase.weakAnswerFeedback] : [],
                  exclude: focus ? [focus] : [],
                })}
                criteria={score.criteria}
                learnerResponseText={submittedAnswer}
                workedAnswer={creativityWorkedAnswer(bankCase)}
                history={attemptHistory}
                retry={retryAction(startOver, { focus })}
                nextAction={chooseNextAction(outcome, {
                  'next-question': bankCase.nextCaseId ? { kind: 'next-question', label: 'Choose the next case', detail: `${bankCase.nextCaseId} is next in this Creativity sequence. It opens from the library.`, onSelect: onBack } : null,
                  'full-case': fullCase ? { kind: 'full-case', label: 'Solve the full case', detail: `Take this case into its full Case Pool version: ${fullCase.title}.`, onSelect: () => openCasePoolCase(fullCase.id) } : null,
                })}
                testId="creativity-result"
              />
            );
          })()}

          <div className="mt-4 flex flex-col gap-2 pb-20 sm:flex-row sm:pb-0">
            <button type="button" onClick={leaveQuestion} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`} data-testid="button-back-creativity-library"><ArrowLeft className="h-4 w-4" /> Back to Creativity Library</button>
          </div>
        </div>
      )}
    </div>
  );
}
