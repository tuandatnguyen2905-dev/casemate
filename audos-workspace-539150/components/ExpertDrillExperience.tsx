import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, RotateCcw, Target } from 'lucide-react';
import ExhibitRenderer from './ExhibitRenderer';
import { journeyFor } from '../lib/caseJourneys';
import { tw } from '../lib/colors';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import type { LibraryQuestion } from '../lib/skillQuestionLibrary';
import { displayDifficultyOf } from '../lib/difficultyTiers';
import type { ExpertResponse } from '../lib/expertDrillScoring';
import CaseResultView from './CaseResultView';
import { gradeCaseExercise } from '../lib/caseScoringClient';
import type { HonestScoreResult } from '../lib/caseScoringRubrics';
import { buildFeedbackPriorities } from '../lib/feedbackPresentation';
import { clarifyUnitText, clarifyUnitsDeep } from '../lib/unitLabels';
import { openCasePoolCase, sourceFullCase } from './SolveFullCaseCta';
import {
  buildReasoningFeedback,
  chooseNextAction,
  hasLearnerResponse,
  libraryQuestionWorkedAnswer,
  normalizeAttemptHistory,
  resultOutcome,
  retryAction,
  workedAnswerReferenceText,
  type AttemptHistoryEntry,
} from '../lib/caseResultModel';

const EMPTY_RESPONSE: ExpertResponse = {
  calculation: '',
  keyInsight: '',
  supportingEvidence: '',
  businessImplication: '',
  recommendedAction: '',
};

interface SavedExpertAttempt {
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

function savedResponse(raw: unknown): ExpertResponse {
  const stored = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
  const text = (key: keyof ExpertResponse) => String(stored[key] ?? '');
  return {
    calculation: text('calculation'),
    keyInsight: text('keyInsight'),
    supportingEvidence: text('supportingEvidence'),
    businessImplication: text('businessImplication'),
    recommendedAction: text('recommendedAction'),
  };
}

interface Props {
  question: LibraryQuestion;
  onBack: () => void;
  onSubmitted: () => void;
  hideEvidenceColumn?: boolean;
  onAnswerInput?: () => void;
  onGraded?: (scoring: HonestScoreResult) => void;
  onGradeError?: (error: unknown) => void;
}

function Field({ id, label, help, value, rows = 3, onChange }: { id: string; label: string; help: string; value: string; rows?: number; onChange: (value: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-[var(--space-text-primary)]">{label}</label>
      <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-muted)]">{help}</p>
      <textarea id={id} rows={rows} value={value} onChange={(event) => onChange(event.target.value)} className={`${tw.input.base} ${tw.input.default} mt-2 text-sm leading-6`} />
    </div>
  );
}

export default function ExpertDrillExperience({ question, onBack, onSubmitted, hideEvidenceColumn = false, onAnswerInput, onGraded, onGradeError }: Props) {
  const { sessionId } = useSpaceRuntime();
  const { data: attemptRows, loading: attemptsLoading, refresh: refreshAttempts } = window.useWorkspaceDB<SavedExpertAttempt>('drill_library_attempts', {
    filters: [
      { column: 'session_id', operator: 'eq', value: sessionId || '__no_session__' },
      { column: 'question_id', operator: 'eq', value: question.id },
    ],
    orderBy: { column: 'completed_on', direction: 'desc' },
    limit: 1,
  });
  const [response, setResponse] = useState<ExpertResponse>(EMPTY_RESPONSE);
  const [submitted, setSubmitted] = useState(false);
  const [grading, setGrading] = useState(false);
  const [scoringResult, setScoringResult] = useState<HonestScoreResult | null>(null);
  const [error, setError] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [retrying, setRetrying] = useState(false);
  const [completedOn, setCompletedOn] = useState('');
  const [attemptHistory, setAttemptHistory] = useState<AttemptHistoryEntry[]>([]);

  useEffect(() => {
    if (retrying || submitted) return;
    const saved = (attemptRows || []).find((row) => row.status === 'completed');
    if (!saved) return;
    const savedScore = savedObject<HonestScoreResult>(saved.scoring_json);
    const snapshot = savedObject<Record<string, unknown>>(saved.answer_json);
    if (!savedScore || !Array.isArray(savedScore.criteria) || !snapshot) return;
    setResponse(savedResponse(snapshot.response));
    setSubmittedAnswer(String(snapshot.candidateAnswer || snapshot.working || snapshot.answer || ''));
    setScoringResult(savedScore);
    setCompletedOn(saved.completed_on || '');
    setAttemptHistory(normalizeAttemptHistory(snapshot.previousAttempts));
    setSubmitted(true);
  }, [attemptRows, retrying, submitted]);

  const workedAnswer = useMemo(() => (submitted ? libraryQuestionWorkedAnswer(question) : null), [question, submitted]);
  const journey = journeyFor(question);
  const exhibits = question.exhibits || [];
  const shown = useMemo(() => clarifyUnitsDeep(question), [question]);
  const shownExhibits = shown.exhibits || [];
  const isHard = question.difficulty === 'hard';
  const displayLevel = displayDifficultyOf(question);
  const levelLabel = displayLevel === 'easy' ? 'Easy' : displayLevel === 'medium' ? 'Medium' : displayLevel === 'hard' ? 'Hard' : 'Expert';
  const levelBadgeClass = displayLevel === 'expert'
    ? 'bg-[var(--space-neutral-900)] text-[var(--space-neutral-0)]'
    : displayLevel === 'hard'
      ? 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]'
      : displayLevel === 'medium'
        ? 'bg-[var(--space-semantic-warning-100)] text-[var(--space-neutral-800)]'
        : 'bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]';
  const rankedCriteria = scoringResult
    ? scoringResult.criteria.slice().sort((a, b) => a.score - b.score || b.weight - a.weight)
    : [];
  const feedbackPriorities = buildFeedbackPriorities({
    evidenceToRevisit: scoringResult?.evidenceToRevisit || [],
    nextStep: scoringResult?.nextStep,
    furtherImprovements: scoringResult?.furtherImprovements || [],
    fallbackActions: rankedCriteria.map((item) => ({ action: item.strongerAnswer, why: item.reason })),
  });
  const outcome = resultOutcome(scoringResult?.overallScore ?? null, 10, { answered: hasLearnerResponse(submittedAnswer) });
  const focus = feedbackPriorities.nextStep?.action || '';
  const resultFeedback = buildReasoningFeedback({
    criteria: scoringResult?.criteria || [],
    evidenceToRevisit: scoringResult?.evidenceToRevisit || [],
    exclude: focus ? [focus] : [],
  });
  const fullCase = sourceFullCase(question.source_case_id);
  const retry = retryAction(() => reset(), { focus });
  const nextAction = chooseNextAction(outcome, {
    'full-case': fullCase ? { kind: 'full-case', label: 'Solve the full case', detail: `Take this drill into its full case: ${fullCase.title}.`, onSelect: () => openCasePoolCase(fullCase.id) } : null,
  });

  const update = (key: keyof ExpertResponse, value: string) => {
    setResponse((current) => ({ ...current, [key]: value }));
    setError('');
    onAnswerInput?.();
  };

  const submit = async () => {
    if (grading) return;
    const answerText = [
      response.calculation.trim() ? `Calculation:\n${response.calculation.trim()}` : '',
      response.supportingEvidence.trim() ? `Observed evidence:\n${response.supportingEvidence.trim()}` : '',
      response.keyInsight.trim() ? `Insight:\n${response.keyInsight.trim()}` : '',
      response.businessImplication.trim() ? `Business implication:\n${response.businessImplication.trim()}` : '',
      response.recommendedAction.trim() ? `Recommended action:\n${response.recommendedAction.trim()}` : '',
    ].filter(Boolean).join('\n\n');
    setError('');
    setGrading(true);
    try {
      const scoring = await gradeCaseExercise({
        exerciseType: question.skill,
        title: question.title,
        question: question.question,
        caseContext: question.businessContext || question.clientObjective || '',
        exhibits: JSON.stringify(exhibits),
        referenceAnswer: workedAnswerReferenceText(libraryQuestionWorkedAnswer(question)) || question.correctAnswer,
        answer: answerText,
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
        const answerJson = {
          schemaVersion: 2,
          kind: 'structured-expert',
          candidateAnswer: answerText,
          response,
          previousAttempts,
        };
        const score = Math.round(Number(scoring.overallScore));
        if (current?.id) {
          await db.from('drill_library_attempts').update(current.id, {
            question_id: question.id,
            skill: question.skill,
            difficulty: question.difficulty,
            answer_json: answerJson,
            score,
            scoring_json: scoring,
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
            scoring_json: scoring,
            status: 'completed',
            completed_on: now,
            created_at: now,
            updated_at: now,
          });
        }
      }
      setScoringResult(scoring);
      setSubmittedAnswer(answerText);
      setSubmitted(true);
      setRetrying(false);
      setCompletedOn(now);
      setAttemptHistory(previousAttempts);
      refreshAttempts();
      try { localStorage.setItem(`casemate-expert-completed:${question.id}`, now); } catch { /* Completion tracking is best-effort. */ }
      onSubmitted();
      onGraded?.(scoring);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (gradeError) {
      setError(gradeError instanceof Error ? gradeError.message : 'Mate could not grade this answer. Your work is unchanged; please try again.');
      onGradeError?.(gradeError);
    } finally {
      setGrading(false);
    }
  };

  const leaveQuestion = () => {
    const hasDraft = Object.values(response).some((value) => value.trim());
    if (!submitted && hasDraft && !window.confirm('Back to the Question Library? Your unfinished answer will be discarded.')) return;
    onBack();
  };

  const reset = () => {
    setResponse({ ...EMPTY_RESPONSE });
    setRetrying(true);
    setSubmitted(false);
    setScoringResult(null);
    setSubmittedAnswer('');
    setError('');
  };

  return (
    <div className="mt-5" data-testid={`expert-drill-${question.id}`}>
      <button type="button" onClick={leaveQuestion} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${tw.button.secondary}`}>
        <ArrowLeft className="h-4 w-4" /> Back to Question Library
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${levelBadgeClass}`}>{levelLabel}</span>
        <span className={`${tw.badge.default} ${tw.badge.primary}`}>{question.drillType}</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">{isHard ? '2 connected exhibits' : '2–3 connected exhibits'}</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">Insight and implication required</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">{question.estimatedMinutes} min</span>
      </div>

      {journey ? (
        <section className="mt-4 rounded-2xl border border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4 sm:p-5" data-testid="journey-framing">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">
            Case Journey · {question.journeyStageRole}
          </p>
          <h2 className="mt-1 text-base font-bold text-[var(--space-text-primary)]">{clarifyUnitText(journey.name)}</h2>
          <dl className="mt-3 grid gap-2 sm:grid-cols-3">
            <div><dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Your role</dt><dd className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{clarifyUnitText(journey.role)}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">The decision</dt><dd className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{clarifyUnitText(journey.decision)}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Timeframe</dt><dd className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{clarifyUnitText(journey.timeframe)}</dd></div>
          </dl>
        </section>
      ) : null}

      <div className="mt-4">
        <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">{shown.industry} · {shown.businessProblem}</p>
          <h1 className="mt-2 break-words text-xl font-extrabold leading-7 text-[var(--space-text-primary)] sm:text-2xl">{shown.title}</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]">{shown.businessContext}</p>
          <div className="mt-4 rounded-xl border-l-4 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">Client objective</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-[var(--space-text-primary)]">{shown.clientObjective}</p>
          </div>
        </section>

        <div className="mt-4">
          <ExhibitRenderer exhibits={shownExhibits} displayMode="advanced" />
        </div>

        <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 sm:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Question</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-[var(--space-text-brand)]">{shown.instruction}</p>
          <p className="mt-2 text-base font-bold leading-7 text-[var(--space-text-primary)]">{shown.question}</p>
          <p className="mt-3 text-xs text-[var(--space-text-muted)]"><span className="font-bold">Primary consulting skill:</span> {shown.primarySkill}</p>
        </section>

        <div className="mt-4 space-y-4">
          {!submitted && attemptsLoading && !retrying ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 text-center" aria-busy="true" data-testid="expert-attempt-loading">
              <p className="text-sm font-bold text-[var(--space-text-primary)]">Checking for your saved result…</p>
            </section>
          ) : !submitted ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6" data-testid="expert-answer-area">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Structured {levelLabel} Answer</p>
              <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{isHard ? 'Use specific exhibit values, then explain what they mean. Keep the path direct and decision-focused.' : 'Reference at least Exhibit 1 and Exhibit 2 with specific numbers. A correct number without interpretation cannot receive a high score.'}</p>
              <div className="mt-5 space-y-5">
                {question.calculationRequired ? <Field id="expert-calculation" label="Calculation" help="Show formulas, units, assumptions, and the reconciled result before interpreting it. Example: Revenue = 120 × 40 = 4,800 million VND." value={response.calculation} onChange={(value) => update('calculation', value)} rows={4} /> : null}
                {isHard ? <Field id="hard-observation" label="1. Key Observation" help="Report only what the exhibits show. Example: Volume rose 8%, but revenue fell 3% as price declined 10%." value={response.supportingEvidence} onChange={(value) => update('supportingEvidence', value)} rows={3} /> : null}
                <Field id="expert-insight" label={`${isHard ? '2' : '1'}. Key Insight`} help="Explain the conclusion behind the observation. Example: Discounting is eroding growth because the price decline outweighs the volume gain." value={response.keyInsight} onChange={(value) => update('keyInsight', value)} />
                {!isHard ? <Field id="expert-evidence" label="2. Supporting Evidence" help="Cite at least two exhibits with specific, reconciled numbers; do not repeat your conclusion." value={response.supportingEvidence} onChange={(value) => update('supportingEvidence', value)} rows={3} /> : null}
                <Field id="expert-implication" label="3. Business Implication" help="Explain why the insight matters to the client objective, economics, or risk." value={response.businessImplication} onChange={(value) => update('businessImplication', value)} />
                <Field id="expert-action" label={`4. ${isHard ? 'Recommended Next Step' : 'Recommended Action'}`} help="Recommend what management should do or investigate next, with a practical decision gate." value={response.recommendedAction} onChange={(value) => update('recommendedAction', value)} rows={3} />
              </div>
              {error ? <p className="mt-4 text-sm font-semibold text-[var(--space-semantic-danger)]">{error}</p> : null}
              <button type="button" onClick={() => void submit()} disabled={grading} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold ${tw.button.primary} ${grading ? tw.button.disabled : ''}`} data-testid="button-submit-expert-answer"><Check className="h-4 w-4" /> {grading ? 'Mate is grading…' : `Submit For ${levelLabel} Feedback`}</button>
            </section>
          ) : scoringResult ? (
            <section className="space-y-4" data-testid="expert-feedback">
              <CaseResultView
                score={scoringResult.overallScore}
                scale={10}
                outcome={outcome}
                completedOn={completedOn}
                feedback={resultFeedback}
                criteria={scoringResult.criteria}
                learnerResponseText={submittedAnswer}
                workedAnswer={workedAnswer}
                history={attemptHistory}
                retry={retry}
                nextAction={nextAction}
                testId="expert-result"
              />
              <div className="flex flex-col gap-2 pb-20 sm:flex-row sm:pb-0">
                <button type="button" onClick={leaveQuestion} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`} data-testid="button-back-expert-library"><ArrowLeft className="h-4 w-4" /> Back to Question Library</button>
              </div>
            </section>
          ) : null}
        </div>
      </div>

      {!submitted ? <div className="mt-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-xs leading-5 text-[var(--space-text-muted)]"><Target className="mr-1 inline h-3.5 w-3.5" /> Scoring guardrail: correct numbers alone cannot earn a high score without interpretation, business implication, and an evidence-linked recommendation{isHard ? '.' : ' supported by multiple exhibits.'}</div> : null}
    </div>
  );
}
