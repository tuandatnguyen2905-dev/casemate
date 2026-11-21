import { useEffect, useMemo, useState, type ReactNode } from 'react';
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
import { presentLibraryQuestion } from '../lib/learnerContentPresentation';
import CaseIdentityChips from './CaseIdentityChips';
import { drillIdentity } from '../lib/caseIdentity';
import { BackToQuestionButton, CaseQuestionFirst, useCaseReadingItemId } from './CaseReadingGuide';
import { ANSWER_ANCHOR_ID, BackToExhibitsButton, GoToAnswerBar } from './CompareExhibits';
import { ChartsAudioHeader, ChartsAudioLayout, ChartsAudioQuestion, ChartsModeSwitchButton } from './ChartsAudioMode';
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
  /** Charts only: the narration player. When set, the drill renders in Audio Mode (same instance, so typed answers are kept). */
  audioPlayer?: ReactNode;
  /** Charts only: switches between Text Mode and Audio Mode on this same drill. */
  onSwitchMode?: (mode: 'text' | 'audio') => void;
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

export default function ExpertDrillExperience({ question, onBack, onSubmitted, hideEvidenceColumn = false, onAnswerInput, onGraded, onGradeError, audioPlayer, onSwitchMode }: Props) {
  const { sessionId } = useSpaceRuntime();
  const readingId = useCaseReadingItemId() || question.id;
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
  const audioMode = Boolean(audioPlayer);

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
  // The answer fields below already ask for observation or evidence, insight and business implication, so the generic answer-format prompt is not repeated.
  const presented = useMemo(() => presentLibraryQuestion({ businessContext: shown.businessContext, instruction: shown.instruction, question: shown.question }, { hasExhibits: shownExhibits.length > 0 }), [shown, shownExhibits.length]);
  const objective = presented.context && shown.clientObjective && presented.context.includes(String(shown.clientObjective).trim()) ? '' : shown.clientObjective;
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

  const answerFields = (
    <>
      <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{isHard ? 'Use specific exhibit values, then explain what they mean. Keep the path direct and decision-focused.' : 'Reference at least Exhibit 1 and Exhibit 2 with specific numbers. A correct number without interpretation cannot receive a high score.'}</p>
      <div className={audioMode ? 'mt-4 space-y-4' : 'mt-5 space-y-5'}>
        {question.calculationRequired ? <Field id="expert-calculation" label="Calculation" help="Show formulas, units, assumptions, and the reconciled result before interpreting it. Example: Revenue = 120 × 40 = 4,800 million VND." value={response.calculation} onChange={(value) => update('calculation', value)} rows={4} /> : null}
        {isHard ? <Field id="hard-observation" label="1. Key Observation" help="Report only what the exhibits show. Example: Volume rose 8%, but revenue fell 3% as price declined 10%." value={response.supportingEvidence} onChange={(value) => update('supportingEvidence', value)} rows={3} /> : null}
        <Field id="expert-insight" label={`${isHard ? '2' : '1'}. Key Insight`} help="Explain the conclusion behind the observation. Example: Discounting is eroding growth because the price decline outweighs the volume gain." value={response.keyInsight} onChange={(value) => update('keyInsight', value)} />
        {!isHard ? <Field id="expert-evidence" label="2. Supporting Evidence" help="Cite at least two exhibits with specific, reconciled numbers; do not repeat your conclusion." value={response.supportingEvidence} onChange={(value) => update('supportingEvidence', value)} rows={3} /> : null}
        <Field id="expert-implication" label="3. Business Implication" help="Explain what your findings mean for the client's objective or business decision. A next step or action plan is not required." value={response.businessImplication} onChange={(value) => update('businessImplication', value)} />
      </div>
      {error ? <p className="mt-4 text-sm font-semibold text-[var(--space-semantic-danger)]">{error}</p> : null}
      <button type="button" onClick={() => void submit()} disabled={grading} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold ${tw.button.primary} ${grading ? tw.button.disabled : ''}`} data-testid="button-submit-expert-answer"><Check className="h-4 w-4" /> {grading ? 'Mate is grading…' : `Submit For ${levelLabel} Feedback`}</button>
    </>
  );

  const attemptLoading = !submitted && attemptsLoading && !retrying ? (
    <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 text-center" aria-busy="true" data-testid="expert-attempt-loading">
      <p className="text-sm font-bold text-[var(--space-text-primary)]">Checking for your saved result…</p>
    </section>
  ) : null;

  const resultArea = submitted && scoringResult ? (
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
  ) : null;

  const guardrail = !submitted ? <div className="mt-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-xs leading-5 text-[var(--space-text-muted)]"><Target className="mr-1 inline h-3.5 w-3.5" /> Scoring guardrail: correct numbers alone cannot earn a high score without interpretation and a business implication{isHard ? '.' : ' supported by multiple exhibits.'} A next step or action plan is not required and never costs marks.</div> : null;

  if (audioMode) {
    return (
      <div data-testid={`expert-drill-${question.id}`}>
        <ChartsAudioLayout
          header={(
            <ChartsAudioHeader
              title={shown.title}
              onBackToLibrary={leaveQuestion}
              onSwitchToText={() => onSwitchMode?.('text')}
              meta={(
                <>
                  <CaseIdentityChips identity={drillIdentity(question)} testId="expert-identity" />
                  <span className="text-xs font-semibold text-[var(--space-text-muted)]">{shownExhibits.length >= 3 ? `${shownExhibits.length} connected exhibits` : isHard ? '2 connected exhibits' : '2–3 connected exhibits'}</span>
                  <span className="text-xs font-semibold text-[var(--space-text-muted)]">{question.estimatedMinutes} min</span>
                </>
              )}
            />
          )}
          player={audioPlayer}
          exhibits={<ExhibitRenderer exhibits={shownExhibits} layout="compare" guide={presented.exhibitGuide} />}
          panel={submitted ? (
            <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-sm">
              <ChartsAudioQuestion task={presented.task} notes={[presented.instruction, ...presented.guidance]} />
              <p className="mt-3 border-t border-[var(--space-border-default)] pt-3 text-xs font-semibold text-[var(--space-text-secondary)]">Your feedback is below the exhibits.</p>
            </section>
          ) : (
            <section id={ANSWER_ANCHOR_ID} className="scroll-mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-sm" data-testid="expert-answer-area">
              <ChartsAudioQuestion task={presented.task} notes={[presented.instruction, ...presented.guidance]} />
              <div className="mt-3 border-t border-[var(--space-border-default)] pt-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Your answer · Structured {levelLabel} Answer</p>
                {attemptLoading || answerFields}
              </div>
            </section>
          )}
          after={(
            <>
              {resultArea}
              {guardrail}
            </>
          )}
        />
      </div>
    );
  }

  return (
    <div className="mt-3" data-testid={`expert-drill-${question.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={leaveQuestion} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold ${tw.button.secondary}`}>
          <ArrowLeft className="h-4 w-4" /> Back to Question Library
        </button>
        {onSwitchMode ? <ChartsModeSwitchButton target="audio" onClick={() => onSwitchMode('audio')} /> : null}
        <CaseIdentityChips identity={drillIdentity(question)} testId="expert-identity" />
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">{shownExhibits.length >= 3 ? `${shownExhibits.length} connected exhibits` : isHard ? '2 connected exhibits' : '2–3 connected exhibits'}</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">Insight and implication required</span>
        <span className="text-xs font-semibold text-[var(--space-text-muted)]">{question.estimatedMinutes} min</span>
      </div>

      <div className="mt-3">
        <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3">
          <CaseQuestionFirst
            bare
            layout="split"
            heading={(
              <h1 className="break-words text-lg font-extrabold leading-7 text-[var(--space-text-primary)]">
                {shown.businessProblem ? <span className="mr-2 align-middle text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]" data-testid="expert-business-problem">{shown.businessProblem}</span> : null}
                {shown.title}
              </h1>
            )}
            itemId={readingId}
            question={<span data-testid="expert-task">{presented.task}</span>}
            questionNote={presented.instruction || presented.guidance.length ? (
              <>
                {presented.instruction ? <p className="text-sm font-semibold leading-6 text-[var(--space-text-brand)]">{presented.instruction}</p> : null}
                {presented.guidance.map((line) => <p key={line} className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">{line}</p>)}
              </>
            ) : null}
            clientObjective={objective || undefined}
            context={presented.context}
            contextExtra={journey || presented.keyTerms.length || shown.primarySkill || presented.skillLabels.length ? (
              <>
                {journey ? (
                  <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-accent-soft)] p-2.5" data-testid="journey-framing">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-brand)]">Case Journey · {question.journeyStageRole} · {clarifyUnitText(journey.name)}</p>
                    <dl className="mt-1.5 space-y-1">
                      <div className="text-xs leading-5"><dt className="inline font-bold text-[var(--space-text-primary)]">Your role: </dt><dd className="inline text-[var(--space-text-secondary)]">{clarifyUnitText(journey.role)}</dd></div>
                      <div className="text-xs leading-5"><dt className="inline font-bold text-[var(--space-text-primary)]">The decision: </dt><dd className="inline text-[var(--space-text-secondary)]">{clarifyUnitText(journey.decision)}</dd></div>
                      <div className="text-xs leading-5"><dt className="inline font-bold text-[var(--space-text-primary)]">Timeframe: </dt><dd className="inline text-[var(--space-text-secondary)]">{clarifyUnitText(journey.timeframe)}</dd></div>
                    </dl>
                  </div>
                ) : null}
                {presented.keyTerms.length ? <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="expert-key-terms"><span className="font-bold text-[var(--space-text-primary)]">Key terms:</span> {presented.keyTerms.join(' ')}</p> : null}
                {shown.primarySkill || presented.skillLabels.length ? <p className="mt-2 text-[11px] font-medium text-[var(--space-text-muted)]" data-testid="expert-skill-label">Skill focus: {[shown.primarySkill, ...presented.skillLabels].filter(Boolean).join('; ')}</p> : null}
              </>
            ) : null}
          />
        </section>

        <div className="mt-3">
          <ExhibitRenderer exhibits={shownExhibits} displayMode="advanced" guide={presented.exhibitGuide} />
          {!submitted ? <GoToAnswerBar hint="Write your conclusion, the evidence and what it means for the client." /> : null}
        </div>

        <div className="mt-4 space-y-4">
          {attemptLoading || (!submitted ? (
            <section id={ANSWER_ANCHOR_ID} className="scroll-mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm sm:p-6" data-testid="expert-answer-area">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Your answer · Structured {levelLabel} Answer</p>
                <BackToExhibitsButton />
              </div>
              {answerFields}
            </section>
          ) : resultArea)}
        </div>
      </div>

      {guardrail}
      <BackToQuestionButton />
    </div>
  );
}
