import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  ListTree,
  Plus,
  Search,
  Shuffle,
  Sparkles,
  Target,
  Trash2,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { tw } from '../lib/colors';
import ExhibitRenderer from './ExhibitRenderer';
import ExpertDrillExperience from './ExpertDrillExperience';
import { CASE_JOURNEYS } from '../lib/caseJourneys';
import {
  ALL_LIBRARY_QUESTIONS,
  QUESTION_LIBRARY,
  SKILL_META,
  questionCountFor,
  validateQuestionLibrary,
} from '../lib/skillQuestionLibrary';
import type {
  LibraryDifficulty,
  LibraryQuestion,
  LibrarySkill,
} from '../lib/skillQuestionLibrary';
import { restoreArchivedHardQuestion } from '../lib/hardCaseDrillQuestions';
import StructuresWorkspace from '../apps/CaseDrill/StructuresWorkspace';

const PAGE_SIZE = 20;
const DIFFICULTY_LABELS: Record<LibraryDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
};

// The home list is ordered by difficulty so candidates meet Easy and Medium
// reps before the Hard and Expert ones the library array happens to list first.
const DIFFICULTY_RANK: Record<LibraryDifficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
  expert: 3,
};

const SKILL_ICONS = {
  charts: BarChart3,
  structures: ListTree,
  calculations: Calculator,
  creativity: Lightbulb,
  'market-sizing': Target,
};

type LibraryEventRole = 'open' | 'step' | 'core_action' | 'diagnostic' | 'retention';

interface LibraryEventOptions {
  completionKey?: string | null;
}

function createLibraryEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

function capitaliseLineStarts(value: string): string {
  return String(value || '')
    .replace(/\u2014/g, '-')
    .split('\n')
    .map((line) => line.replace(/^([^A-Za-zÀ-ỹ]*)([a-zà-ỹ])/, (_, prefix, first) => `${prefix}${first.toUpperCase()}`))
    .join('\n');
}

function normalise(value: string): string {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
}

function isQuestionCompleted(questionId: string): boolean {
  try { return Boolean(localStorage.getItem(`casemate-expert-completed:${questionId}`)); } catch { return false; }
}

function difficultyClass(difficulty: LibraryDifficulty): string {
  if (difficulty === 'easy') return 'bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]';
  if (difficulty === 'expert') return 'bg-[var(--space-neutral-900)] text-[var(--space-neutral-0)]';
  if (difficulty === 'hard') return 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]';
  return 'bg-[var(--space-semantic-warning-100)] text-[var(--space-neutral-800)]';
}

type MarketSizingOperator = '×' | '+' | '−' | '÷';

interface MarketSizingFactor {
  id: string;
  label: string;
  value: string;
  operator: MarketSizingOperator;
}

function initialMarketSizingFactors(): MarketSizingFactor[] {
  return [
    { id: 'factor-1', label: '', value: '', operator: '×' },
    { id: 'factor-2', label: '', value: '', operator: '×' },
    { id: 'factor-3', label: '', value: '', operator: '×' },
  ];
}

function parseMarketSizingValue(value: string): number | null {
  const normalized = value.trim().replace(/,/g, '');
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function calculateMarketSizingResult(factors: MarketSizingFactor[]): number | null {
  const terms: Array<{ value: number; operator: MarketSizingOperator }> = [];
  factors.forEach((factor) => {
    const value = parseMarketSizingValue(factor.value);
    if (value !== null) terms.push({ value, operator: factor.operator });
  });
  if (terms.length === 0) return null;

  // Follow standard arithmetic precedence: multiplication and division are
  // evaluated within each term before addition or subtraction.
  let total = 0;
  let currentTerm = terms[0].value;
  for (let index = 1; index < terms.length; index += 1) {
    const { value, operator } = terms[index];
    if (operator === '×') currentTerm *= value;
    else if (operator === '÷') {
      if (value === 0) return null;
      currentTerm /= value;
    } else {
      total += currentTerm;
      currentTerm = operator === '+' ? value : -value;
    }
  }
  const result = total + currentTerm;
  return Number.isFinite(result) ? result : null;
}

function formatMarketSizingResult(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

function SolutionPanel({ question, isCorrect }: { question: LibraryQuestion; isCorrect: boolean | null }) {
  return (
    <section className="mt-4 overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]" data-testid="question-library-solution">
      <div className="flex items-center gap-3 border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-5 py-4">
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${isCorrect === false ? 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_14%,transparent)] text-[var(--space-semantic-warning)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-success)_14%,transparent)] text-[var(--space-semantic-success)]'}`}>
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-[var(--space-text-primary)]">
            {question.skill === 'creativity'
              ? 'One Possible Approach'
              : isCorrect === null
                ? 'Model Answer Revealed'
                : isCorrect
                  ? 'Correct Answer'
                  : 'Review The Worked Solution'}
          </p>
          <p className="text-xs text-[var(--space-text-muted)]">
            {question.skill === 'creativity'
              ? 'Creativity questions can be tackled in many valid ways - use this as a structured example, not the only answer.'
              : 'Use The Explanation To Check Your Logic, Not Only The Final Answer.'}
          </p>
        </div>
      </div>
      <div className="space-y-4 px-5 py-5 sm:px-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">Answer</p>
          <p className="mt-1.5 whitespace-pre-wrap text-base font-bold leading-7 text-[var(--space-text-primary)]">{capitaliseLineStarts(question.correctAnswer)}</p>
        </div>
        {question.stepByStepSolution?.length ? (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">Step-By-Step Solution</p>
            <ol className="mt-2 space-y-2">
              {question.stepByStepSolution.map((step, index) => <li key={index} className="flex gap-2 text-sm leading-6 text-[var(--space-text-secondary)]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[10px] font-bold text-[var(--space-text-brand)]">{index + 1}</span><span>{capitaliseLineStarts(step)}</span></li>)}
            </ol>
          </div>
        ) : null}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">Explanation</p>
          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]">{capitaliseLineStarts(question.explanation)}</p>
        </div>
        {question.calibrationStatus === 'revised-v1' && question.alternativeConclusions?.length ? (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">Also Acceptable</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--space-text-secondary)]">
              {question.alternativeConclusions.map((answer) => <li key={answer}>{capitaliseLineStarts(answer)}</li>)}
            </ul>
          </div>
        ) : null}
        {question.calibrationStatus === 'revised-v1' && question.scoringRubric?.length ? (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">Scoring Rubric</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {question.scoringRubric.map((item) => (
                <div key={item.criterion} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
                  <p className="text-xs font-bold text-[var(--space-text-primary)]">{item.criterion} · {item.points} pts</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">{capitaliseLineStarts(item.description)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {question.keyInsight ? <div className="rounded-xl bg-[var(--space-surface-accent-soft)] p-3 text-sm leading-6 text-[var(--space-text-secondary)]"><span className="font-bold text-[var(--space-text-brand)]">Key Insight:</span> {capitaliseLineStarts(question.keyInsight)}</div> : null}
        {question.commonMistake ? <div className="text-sm leading-6 text-[var(--space-text-secondary)]"><span className="font-bold text-[var(--space-text-primary)]">Common Mistake:</span> {capitaliseLineStarts(question.commonMistake)}</div> : null}
        {question.learningObjective ? <div className="text-sm leading-6 text-[var(--space-text-secondary)]"><span className="font-bold text-[var(--space-text-primary)]">Learning Objective:</span> {capitaliseLineStarts(question.learningObjective)}</div> : null}
      </div>
    </section>
  );
}

export default function QuestionLibrary() {
  const { sessionId, visitorId, spaceId, trackEvent } = useSpaceRuntime();
  const [skill, setSkill] = useState<LibrarySkill>('charts');
  const [difficulty, setDifficulty] = useState<LibraryDifficulty | 'all'>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [active, setActive] = useState<LibraryQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [answer, setAnswer] = useState('');
  const [working, setWorking] = useState('');
  const [marketSizingFactors, setMarketSizingFactors] = useState<MarketSizingFactor[]>(initialMarketSizingFactors);
  const [marketSizingManualResult, setMarketSizingManualResult] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [journey, setJourney] = useState('all');
  const [drillType, setDrillType] = useState('all');
  const [industry, setIndustry] = useState('all');
  const [businessProblem, setBusinessProblem] = useState('all');
  const [estimatedTime, setEstimatedTime] = useState<'all' | 'under-10' | '10-plus'>('all');
  const [completion, setCompletion] = useState<'all' | 'completed' | 'not-completed'>('all');
  const [recommendedOnly, setRecommendedOnly] = useState(false);
  const [completionVersion, setCompletionVersion] = useState(0);
  const libraryOpenedTrackedRef = useRef(false);
  const submittedAttemptRef = useRef(false);
  const explanationViewedRef = useRef(false);

  const libraryUserKey = useMemo(() => {
    try {
      const stored = localStorage.getItem(`space_session_${spaceId}`);
      const parsed = stored ? JSON.parse(stored) : null;
      if (typeof parsed?.email === 'string' && parsed.email.includes('@')) return `email:${parsed.email.toLowerCase().trim()}`;
    } catch {
      // Fall through to the stable device identity.
    }
    return visitorId ? `device:${visitorId}` : sessionId ? `device:${sessionId}` : 'device:unknown';
  }, [sessionId, spaceId, visitorId]);

  const emitLibraryEvent = useCallback(async (
    eventName: string,
    eventRole: LibraryEventRole,
    properties: Record<string, unknown>,
    options: LibraryEventOptions = {},
  ) => {
    if (!sessionId) return;
    const eventId = createLibraryEventId();
    const unresolved = libraryUserKey === 'device:unknown' || libraryUserKey.startsWith('device:wses_');
    try {
      await (window as any).__workspaceDb?.from('feature_events').insert({
        event_key: eventId,
        schema_version: 1,
        event_name: eventName,
        event_role: eventRole,
        feature_name: 'drill_library',
        app_id: 'case-drill',
        mode: 'library',
        user_id: unresolved ? null : libraryUserKey,
        identity_status: unresolved ? 'identity_unresolved' : 'resolved',
        source_user_key: libraryUserKey,
        identity_session_ref: sessionId,
        completion_key: options.completionKey ?? null,
        occurred_at: new Date().toISOString(),
        properties_json: properties,
        source_kind: 'live',
        source_table: null,
        source_record_id: null,
        session_id: sessionId,
      });
    } catch (error) {
      console.warn('[Question Library] feature_events write failed:', eventName, error);
    }
    void trackEvent(eventName, {
      ...properties,
      event_id: eventId,
      event_role: eventRole,
      feature_name: 'drill_library',
      source_kind: 'live',
    });
  }, [libraryUserKey, sessionId, trackEvent]);

  useEffect(() => {
    if (!sessionId || libraryOpenedTrackedRef.current) return;
    libraryOpenedTrackedRef.current = true;
    void emitLibraryEvent('drill_library_opened', 'open', {});
  }, [sessionId, emitLibraryEvent]);

  const libraryErrors = useMemo(() => validateQuestionLibrary(), []);
  const marketSizingCalculation = useMemo(
    () => calculateMarketSizingResult(marketSizingFactors),
    [marketSizingFactors],
  );
  const marketSizingResult = marketSizingCalculation === null ? marketSizingManualResult : String(marketSizingCalculation);
  const skillMeta = SKILL_META.find((item) => item.id === skill) || SKILL_META[0];
  const questions = QUESTION_LIBRARY[skill];
  const visibleQuestions = useMemo(
    () => questions
      .map(restoreArchivedHardQuestion)
      .filter((question) => question.reviewStatus !== 'Archived'),
    [questions],
  );
  const difficultyQuestions = useMemo(
    () => difficulty === 'all' ? visibleQuestions : visibleQuestions.filter((question) => question.difficulty === difficulty),
    [visibleQuestions, difficulty],
  );
  const filterOptions = useMemo(() => ({
    journeyIds: [...new Set(difficultyQuestions.map((question) => question.journeyId).filter(Boolean))] as string[],
    drillTypes: [...new Set(difficultyQuestions.map((question) => question.drillType).filter(Boolean))] as string[],
    industries: [...new Set(difficultyQuestions.map((question) => question.industry).filter(Boolean))] as string[],
    businessProblems: [...new Set(difficultyQuestions.map((question) => question.businessProblem).filter(Boolean))] as string[],
  }), [difficultyQuestions]);
  const recommendedIds = useMemo(() => {
    const ids = new Set<string>();
    // Preserve explicit next-drill chains (used by Expert and the new Hard set)
    // whenever the learner has completed the source drill.
    ALL_LIBRARY_QUESTIONS.forEach((question) => {
      if (isQuestionCompleted(question.id) && question.recommendedNextDrillId) ids.add(question.recommendedNextDrillId);
    });
    // Every difficulty also receives progress-aware fallbacks: the first
    // incomplete drill in each drill type. This keeps recommendations useful
    // for Easy and Medium questions that predate explicit recommendation ids.
    const representedTypes = new Set<string>();
    difficultyQuestions.forEach((question) => {
      const type = question.drillType || question.skill;
      if (!isQuestionCompleted(question.id) && !representedTypes.has(type)) {
        representedTypes.add(type);
        ids.add(question.id);
      }
    });
    return ids;
  }, [difficultyQuestions, completionVersion]);
  const matches = useMemo(() => {
    const needle = normalise(query);
    const filtered = visibleQuestions.filter((question) => {
      if (difficulty !== 'all' && question.difficulty !== difficulty) return false;
      if (journey === 'journeys-only' && !question.journeyId) return false;
      if (journey === 'standalone' && question.journeyId) return false;
      if (journey !== 'all' && journey !== 'journeys-only' && journey !== 'standalone' && question.journeyId !== journey) return false;
      if (drillType !== 'all' && question.drillType !== drillType) return false;
      if (industry !== 'all' && question.industry !== industry) return false;
      if (businessProblem !== 'all' && question.businessProblem !== businessProblem) return false;
      if (estimatedTime === 'under-10' && (!question.estimatedMinutes || question.estimatedMinutes >= 10)) return false;
      if (estimatedTime === '10-plus' && (!question.estimatedMinutes || question.estimatedMinutes < 10)) return false;
      const completed = isQuestionCompleted(question.id);
      if (completion === 'completed' && !completed) return false;
      if (completion === 'not-completed' && completed) return false;
      if (recommendedOnly && !recommendedIds.has(question.id)) return false;
      if (!needle) return true;
      return normalise(`${question.title} ${question.question} ${question.explanation} ${question.drillType || ''} ${question.industry || ''} ${question.businessProblem || ''}`).includes(needle);
    });
    return filtered.sort((a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]);
  }, [visibleQuestions, difficulty, query, journey, drillType, industry, businessProblem, estimatedTime, completion, recommendedOnly, recommendedIds, completionVersion]);

  useEffect(() => {
    const namedJourney = journey !== 'all' && journey !== 'journeys-only' && journey !== 'standalone';
    if (namedJourney && !filterOptions.journeyIds.includes(journey)) setJourney('all');
    if (drillType !== 'all' && !filterOptions.drillTypes.includes(drillType)) setDrillType('all');
    if (industry !== 'all' && !filterOptions.industries.includes(industry)) setIndustry('all');
    if (businessProblem !== 'all' && !filterOptions.businessProblems.includes(businessProblem)) setBusinessProblem('all');
  }, [difficulty, filterOptions, journey, drillType, industry, businessProblem]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [skill, difficulty, query, journey, drillType, industry, businessProblem, estimatedTime, completion, recommendedOnly]);

  const clearFilters = () => {
    setQuery('');
    setJourney('all');
    setDrillType('all');
    setIndustry('all');
    setBusinessProblem('all');
    setEstimatedTime('all');
    setCompletion('all');
    setRecommendedOnly(false);
  };

  const resetAttempt = () => {
    submittedAttemptRef.current = false;
    explanationViewedRef.current = false;
    setSelectedOption('');
    setAnswer('');
    setWorking('');
    setMarketSizingFactors(initialMarketSizingFactors());
    setMarketSizingManualResult('');
    setSubmitted(false);
    setValidationError('');
  };

  const openQuestion = (question: LibraryQuestion) => {
    setActive(question);
    resetAttempt();
    void emitLibraryEvent('drill_question_opened', 'step', {
      question_id: question.id,
      skill: question.skill,
      difficulty: question.difficulty,
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Case Pool writes an exact drill id before opening this app. The openApp
  // listener also covers a Case Drill window that is already mounted.
  useEffect(() => {
    const consumeRequest = () => {
      try {
        const id = sessionStorage.getItem('casemate-open-case-drill');
        if (!id) return;
        const requested = ALL_LIBRARY_QUESTIONS.find((question) => question.id === id);
        if (!requested) return;
        sessionStorage.removeItem('casemate-open-case-drill');
        setSkill(requested.skill);
        openQuestion(requested);
      } catch {
        /* sessionStorage can be unavailable in strict browser modes */
      }
    };
    consumeRequest();
    const onOpenApp = (event: Event) => {
      if ((event as CustomEvent).detail?.appId === 'case-drill') consumeRequest();
    };
    window.addEventListener('openApp', onOpenApp);
    return () => window.removeEventListener('openApp', onOpenApp);
    // The request is event-driven; re-registering on every render would risk
    // consuming the same navigation twice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchSkill = (nextSkill: LibrarySkill) => {
    setSkill(nextSkill);
    setDifficulty('all');
    setQuery('');
    setJourney('all');
    setDrillType('all');
    setIndustry('all');
    setBusinessProblem('all');
    setEstimatedTime('all');
    setCompletion('all');
    setRecommendedOnly(false);
    setActive(null);
    resetAttempt();
    void emitLibraryEvent('drill_skill_selected', 'step', { skill: nextSkill });
  };

  const randomQuestion = () => {
    const pool = matches.length > 0 ? matches : difficultyQuestions;
    if (pool.length === 0) return;
    const nextQuestion = pool[Math.floor(Math.random() * pool.length)];
    if (active) void emitLibraryEvent('drill_next_question', 'retention', { question_id: nextQuestion.id });
    openQuestion(nextQuestion);
  };

  const submit = () => {
    if (!active) return;
    if (active.skill !== 'market-sizing' && active.answerMode === 'choice' && !selectedOption) {
      setValidationError('Choose An Answer Before Submitting.');
      return;
    }
    if (active.skill === 'market-sizing' && !marketSizingResult.trim()) {
      setValidationError('Build Your Formula Or Enter A Final Market Size Before Submitting.');
      return;
    }
    if (active.skill !== 'market-sizing' && active.answerMode !== 'choice' && !answer.trim() && !working.trim()) {
      setValidationError('Enter Your Answer Or Working Before Submitting.');
      return;
    }
    setValidationError('');
    if (!submittedAttemptRef.current) {
      submittedAttemptRef.current = true;
      void emitLibraryEvent('drill_answer_submitted', 'core_action', {
        question_id: active.id,
        skill: active.skill,
        difficulty: active.difficulty,
        answer_mode: active.answerMode,
      }, { completionKey: `case_drill_library:${active.id}:${libraryUserKey || sessionId}` });
    }
    try { localStorage.setItem(`casemate-expert-completed:${active.id}`, new Date().toISOString()); } catch { /* Best-effort completion filter. */ }
    setCompletionVersion((version) => version + 1);
    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted || !active || explanationViewedRef.current) return;
    explanationViewedRef.current = true;
    void emitLibraryEvent('drill_explanation_viewed', 'diagnostic', {
      question_id: active.id,
      skill: active.skill,
      difficulty: active.difficulty,
    });
  }, [submitted, active, emitLibraryEvent]);

  const isCorrect = useMemo(() => {
    if (!active || !submitted) return null;
    if (active.answerMode === 'text') return null;
    if (active.skill !== 'market-sizing' && active.answerMode === 'choice') return selectedOption === active.correctAnswer;
    const valueToGrade = active.skill === 'market-sizing' ? marketSizingResult : answer;
    const parsed = Number(valueToGrade.replace(/,/g, '').replace(/[^0-9.-]/g, ''));
    if (!Number.isFinite(parsed) || active.numericAnswer == null) return false;
    return Math.abs(parsed - active.numericAnswer) <= (active.numericTolerance || 0.01);
  }, [active, submitted, selectedOption, answer, marketSizingResult]);

  if (active?.skill === 'structures') {
    return (
      <div className="mt-5" data-testid="question-library-active-structures">
        <button type="button" onClick={() => setActive(null)} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.ghost}`}>
          <ArrowLeft className="h-4 w-4" />
          Back To Structures Library
        </button>
        <StructuresWorkspace
          initialCaseId={active.id}
          onSubmitted={() => {
            try { localStorage.setItem(`casemate-expert-completed:${active.id}`, new Date().toISOString()); } catch { /* Best-effort completion filter. */ }
            setCompletionVersion((version) => version + 1);
            if (!submittedAttemptRef.current) {
              submittedAttemptRef.current = true;
              void emitLibraryEvent('drill_answer_submitted', 'core_action', {
                question_id: active.id,
                skill: active.skill,
                difficulty: active.difficulty,
                answer_mode: 'issue-tree',
              }, { completionKey: `case_drill_library:${active.id}:${libraryUserKey || sessionId}` });
            }
          }}
        />
      </div>
    );
  }

  if (active?.structuredAnswer && active.skill !== 'market-sizing') {
    return (
      <ExpertDrillExperience
        question={active}
        onBack={() => setActive(null)}
        onOpenQuestion={openQuestion}
        onSubmitted={() => {
          setCompletionVersion((version) => version + 1);
          void emitLibraryEvent('drill_answer_submitted', 'core_action', { question_id: active.id, skill: active.skill, difficulty: active.difficulty, answer_mode: 'structured-expert' }, { completionKey: `case_drill_library:${active.id}:${libraryUserKey || sessionId}` });
        }}
      />
    );
  }

  if (active) {
    const isCaseCoachLayout = active.skill === 'charts' || active.skill === 'calculations';
    const isMarketSizing = active.skill === 'market-sizing';
    const activeExhibits = active.exhibits?.length ? active.exhibits : active.exhibit ? [active.exhibit] : [];
    const isNumericMode = active.answerMode === 'number' || active.answerMode === 'percentage' || active.answerMode === 'currency';
    return (
      <div className="mt-5" data-testid={`question-library-active-${active.skill}`}>
        <button type="button" onClick={() => setActive(null)} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.ghost}`}>
          <ArrowLeft className="h-4 w-4" />
          Back To Question Library
        </button>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`${tw.badge.default} ${tw.badge.primary}`}>{capitaliseLineStarts(skillMeta.label)}</span>
          <span className={`${tw.badge.default} ${difficultyClass(active.difficulty)}`}>{DIFFICULTY_LABELS[active.difficulty]}</span>
          <span className="text-xs font-medium text-[var(--space-text-muted)]">Question {active.id.split('-').pop()} Of {questionCountFor(active.skill)}</span>
          {active.estimatedMinutes ? <span className="text-xs font-medium text-[var(--space-text-muted)]">· {active.estimatedMinutes} Min</span> : null}
        </div>

        <section className={`mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] ${isCaseCoachLayout ? 'px-5 py-6 shadow-sm sm:px-8 sm:py-8' : 'p-4 sm:p-5'}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Case Context</p>
          <h2 className="mt-2 text-xl font-bold leading-8 text-[var(--space-text-primary)] sm:text-2xl">{capitaliseLineStarts(active.title)}</h2>
          {active.businessContext ? <p className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3 text-sm leading-6 text-[var(--space-text-secondary)]">{capitaliseLineStarts(active.businessContext)}</p> : null}
        </section>

        {activeExhibits.length ? <div className="mt-4"><ExhibitRenderer exhibits={activeExhibits} /></div> : null}

        <section className={`mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] ${isCaseCoachLayout ? 'px-5 py-6 shadow-sm sm:px-8 sm:py-8' : 'p-4 sm:p-5'}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Question</p>
          {active.instruction ? <p className="mt-3 text-sm font-semibold leading-6 text-[var(--space-text-brand)]">{capitaliseLineStarts(active.instruction)}</p> : null}
          <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-[var(--space-text-secondary)]">{capitaliseLineStarts(active.question)}</p>
        </section>

        {!submitted ? (
          <section className={`mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] ${isCaseCoachLayout ? 'p-5 shadow-sm sm:p-7' : 'p-4 sm:p-5'}`} data-testid="question-library-answer-area">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)]">Your Answer</p>

            {isMarketSizing ? (
              <div className="mt-4 space-y-4" data-testid="market-sizing-answer-layout">
                <section className="overflow-hidden rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] shadow-md" data-testid="market-sizing-result-box">
                  <div className="border-b border-[color-mix(in_srgb,var(--space-brand-primary-500)_24%,transparent)] px-4 py-3 sm:px-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Part 1 · Calculated Result</p>
                    <p className="mt-1 text-xs text-[var(--space-text-secondary)]">
                      {marketSizingCalculation === null ? 'Enter your final figure, or build the formula below.' : 'Updated automatically from your bottom-up formula.'}
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:px-6 sm:py-7">
                    <label className="text-xs font-bold text-[var(--space-text-secondary)]" htmlFor="market-sizing-result">Final Market Size</label>
                    <input
                      id="market-sizing-result"
                      value={marketSizingCalculation === null ? marketSizingManualResult : formatMarketSizingResult(marketSizingCalculation)}
                      onChange={(event) => { setMarketSizingManualResult(event.target.value); setValidationError(''); }}
                      readOnly={marketSizingCalculation !== null}
                      placeholder="Enter your final estimate"
                      className="mt-2 w-full bg-transparent text-3xl font-extrabold tabular-nums tracking-tight text-[var(--space-text-primary)] outline-none placeholder:text-[var(--space-text-muted)] sm:text-4xl"
                      data-testid="input-market-sizing-result"
                    />
                    {active.answerUnit ? <p className="mt-2 text-sm font-semibold text-[var(--space-text-brand)]">{capitaliseLineStarts(active.answerUnit)}</p> : null}
                  </div>
                </section>

                <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4 sm:p-5" data-testid="market-sizing-formula-builder">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Part 2 · Bottom-Up Sizing Model</p>
                      <h3 className="mt-1 text-base font-bold text-[var(--space-text-primary)]">Build Your Bottom-Up Formula</h3>
                      <p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">Name each component, enter its value, and choose the operator between terms. Use decimals for rates, for example 5% = 0.05.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMarketSizingFactors((factors) => [...factors, { id: `factor-${Date.now()}-${factors.length}`, label: '', value: '', operator: '×' }])}
                      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold ${tw.button.secondary}`}
                      data-testid="button-add-market-sizing-factor"
                    >
                      <Plus className="h-4 w-4" /> Add Component
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    {marketSizingFactors.map((factor, index) => (
                      <div key={factor.id}>
                        {index > 0 ? (
                          <div className="flex h-10 items-center gap-3">
                            <span className="h-px flex-1 bg-[var(--space-border-default)]" />
                            <select
                              value={factor.operator}
                              onChange={(event) => {
                                const operator = event.target.value as MarketSizingOperator;
                                setMarketSizingFactors((factors) => factors.map((item) => item.id === factor.id ? { ...item, operator } : item));
                                setValidationError('');
                              }}
                              aria-label={`Operator before component ${index + 1}`}
                              className="h-8 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2 text-xs font-bold text-[var(--space-text-brand)] outline-none focus:border-[var(--space-brand-primary-600)]"
                              data-testid={`select-market-sizing-operator-${index - 1}`}
                            >
                              <option value="×">× Multiply</option>
                              <option value="+">+ Add</option>
                              <option value="−">− Subtract</option>
                              <option value="÷">÷ Divide</option>
                            </select>
                            <span className="h-px flex-1 bg-[var(--space-border-default)]" />
                          </div>
                        ) : null}
                        <div className="grid gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:grid-cols-[minmax(0,1fr)_minmax(150px,0.55fr)_44px] sm:items-end">
                          <label className="block text-xs font-bold text-[var(--space-text-secondary)]">
                            Component {index + 1}
                            <input
                              value={factor.label}
                              onChange={(event) => {
                                const label = event.target.value;
                                setMarketSizingFactors((factors) => factors.map((item) => item.id === factor.id ? { ...item, label } : item));
                                setValidationError('');
                              }}
                              placeholder={['AOV', 'Traffic', 'Conversion Rate'][index] || 'Component label'}
                              className={`${tw.input.base} ${tw.input.default} mt-1.5 text-sm`}
                              data-testid={`input-market-sizing-label-${index}`}
                            />
                          </label>
                          <label className="block text-xs font-bold text-[var(--space-text-secondary)]">
                            Value
                            <input
                              type="number"
                              inputMode="decimal"
                              step="any"
                              value={factor.value}
                              onChange={(event) => {
                                const value = event.target.value;
                                setMarketSizingFactors((factors) => factors.map((item) => item.id === factor.id ? { ...item, value } : item));
                                setValidationError('');
                              }}
                              placeholder="0"
                              className={`${tw.input.base} ${tw.input.default} mt-1.5 text-sm font-bold tabular-nums`}
                              data-testid={`input-market-sizing-value-${index}`}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setMarketSizingFactors((factors) => factors.filter((item) => item.id !== factor.id))}
                            disabled={marketSizingFactors.length === 1}
                            className={`flex h-11 items-center justify-center rounded-xl border border-[var(--space-border-default)] text-[var(--space-semantic-danger)] transition-colors hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-35`}
                            aria-label={`Remove component ${index + 1}`}
                            data-testid={`button-remove-market-sizing-factor-${index}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-3 text-sm font-semibold text-[var(--space-text-secondary)]" data-testid="market-sizing-formula-summary">
                    {marketSizingFactors.map((factor, index) => (
                      <span key={factor.id} className="inline-flex items-center gap-2">
                        {index > 0 ? <span className="font-bold text-[var(--space-text-brand)]">{factor.operator}</span> : null}
                        <span>{factor.label.trim() || `Component ${index + 1}`}</span>
                      </span>
                    ))}
                    <span className="font-bold text-[var(--space-text-brand)]">=</span>
                    <span className="font-extrabold tabular-nums text-[var(--space-text-primary)]">
                      {marketSizingCalculation === null ? (marketSizingManualResult.trim() || 'Final Result') : formatMarketSizingResult(marketSizingCalculation)}
                    </span>
                  </div>
                </section>
              </div>
            ) : active.answerMode === 'choice' ? (
              <div className="mt-3 grid gap-2.5">
                {(active.options || []).map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { setSelectedOption(option); setValidationError(''); }}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${selectedOption === option ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-border-strong)]'}`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${selectedOption === option ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm font-medium leading-6 text-[var(--space-text-primary)]">{capitaliseLineStarts(option)}</span>
                  </button>
                ))}
              </div>
            ) : active.skill === 'calculations' ? (
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="text-sm font-bold text-[var(--space-text-primary)]" htmlFor="calculation-answer">Final Numerical Answer</label>
                  <div className="mt-2 flex overflow-hidden rounded-xl border-2 border-[var(--space-border-strong)] bg-[var(--space-surface-page)] focus-within:border-[var(--space-brand-primary-600)]">
                    <input
                      id="calculation-answer"
                      inputMode="decimal"
                      value={answer}
                      onChange={(event) => { setAnswer(event.target.value); setValidationError(''); }}
                      placeholder="Enter Your Number"
                      className="min-w-0 flex-1 bg-transparent px-4 py-4 text-xl font-bold tabular-nums text-[var(--space-text-primary)] outline-none"
                      data-testid="input-calculation-answer"
                    />
                    <span className="flex max-w-36 items-center border-l border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 text-xs font-semibold text-[var(--space-text-muted)]">{capitaliseLineStarts(active.answerUnit || '')}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-[var(--space-text-primary)]" htmlFor="calculation-working">Working Space</label>
                  <textarea
                    id="calculation-working"
                    value={working}
                    onChange={(event) => { setWorking(event.target.value); setValidationError(''); }}
                    rows={5}
                    placeholder={capitaliseLineStarts(active.workingPrompt || 'Show Your Working Step By Step.')}
                    className={`${tw.input.base} ${tw.input.default} mt-2 min-h-32 text-sm leading-6`}
                    data-testid="input-calculation-working"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-3">
                {isNumericMode ? (
                  <input
                    inputMode="decimal"
                    value={answer}
                    onChange={(event) => { setAnswer(event.target.value); setValidationError(''); }}
                    placeholder="Enter Your Final Estimate"
                    className={`${tw.input.base} ${tw.input.default} text-base font-semibold`}
                  />
                ) : null}
                <textarea
                  value={working}
                  onChange={(event) => { setWorking(event.target.value); setValidationError(''); }}
                  rows={7}
                  placeholder={capitaliseLineStarts(active.workingPrompt || 'Write Your Answer In Clear, Structured Lines.')}
                  className={`${tw.input.base} ${tw.input.default} ${isNumericMode ? 'mt-3' : ''} min-h-36 text-sm leading-6`}
                />
              </div>
            )}

            {validationError ? <p className="mt-3 text-sm font-medium text-[var(--space-semantic-danger)]">{validationError}</p> : null}
            <button type="button" onClick={submit} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold ${tw.button.primary}`} data-testid="button-submit-library-answer">
              <Check className="h-4 w-4" />
              {active.answerMode === 'text' ? 'Reveal Model Answer' : 'Submit Answer'}
            </button>
          </section>
        ) : (
          <SolutionPanel question={active} isCorrect={isCorrect} />
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={randomQuestion} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.primary}`}>
            <Shuffle className="h-4 w-4" />
            Next {capitaliseLineStarts(skillMeta.label)} Question
          </button>
          <button type="button" onClick={() => setActive(null)} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`}>
            <ArrowLeft className="h-4 w-4" />
            Browse All Questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5" data-testid="question-library-home">
      {libraryErrors.length > 0 ? (
        <div className="rounded-xl border border-[var(--space-semantic-danger)] bg-[var(--space-surface-card)] p-4 text-sm text-[var(--space-semantic-danger)]">
          {libraryErrors.map((error) => <p key={error}>{capitaliseLineStarts(error)}</p>)}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]">
        <div className="px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">
              <Sparkles className="h-5 w-5 text-[var(--space-text-brand)]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--space-text-primary)]">Question Library</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">Choose one of five consulting skills. Alongside the standalone question bank, {CASE_JOURNEYS.length} Case Journeys run one business decision across linked drills - diagnosis, then implication, then a defensible recommendation. Open any journey drill or practise any standalone drill on its own.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-[var(--space-border-default)] sm:grid-cols-5" role="tablist" aria-label="Question Library Skills">
          {SKILL_META.map((item) => {
            const Icon = SKILL_ICONS[item.id];
            const selected = skill === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => switchSkill(item.id)}
                className={`flex min-h-24 flex-col items-center justify-center gap-1.5 border-b border-r border-[var(--space-border-default)] px-2 py-3 text-center transition-colors sm:border-b-0 ${selected ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'}`}
                data-testid={`tab-library-${item.id}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-bold">{capitaliseLineStarts(item.shortLabel)}</span>
                <span className={`text-[10px] font-semibold ${selected ? 'opacity-80' : 'text-[var(--space-text-muted)]'}`}>Questions: {questionCountFor(item.id)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--space-text-primary)]">{capitaliseLineStarts(skillMeta.label)}</h3>
            <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{capitaliseLineStarts(skillMeta.description)}</p>
          </div>
          <button type="button" onClick={randomQuestion} className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`}>
            <Shuffle className="h-4 w-4" />
            Random Question
          </button>
        </div>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Questions By Topic Or Scenario"
            className={`${tw.input.base} ${tw.input.default} py-2.5 pl-9 text-sm`}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(['all', 'easy', 'medium', 'hard', 'expert'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulty(level)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${difficulty === level ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]' : 'border border-[var(--space-border-default)] text-[var(--space-text-secondary)] hover:border-[var(--space-border-strong)]'}`}
            >
              {level === 'all' ? 'All Difficulties' : DIFFICULTY_LABELS[level]}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--space-text-muted)]">Advanced Filters · {difficulty === 'all' ? 'All Difficulties' : DIFFICULTY_LABELS[difficulty]}</p>
          <button type="button" onClick={clearFilters} className="text-xs font-bold text-[var(--space-text-brand)] hover:underline">Clear Filters</button>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <select value={drillType} onChange={(event) => setDrillType(event.target.value)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by drill type"><option value="all">All Drill Types</option>{filterOptions.drillTypes.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={industry} onChange={(event) => setIndustry(event.target.value)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by industry"><option value="all">All Industries</option>{filterOptions.industries.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={businessProblem} onChange={(event) => setBusinessProblem(event.target.value)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by business problem"><option value="all">All Business Problems</option>{filterOptions.businessProblems.map((value) => <option key={value} value={value}>{value}</option>)}</select>
          <select value={estimatedTime} onChange={(event) => setEstimatedTime(event.target.value as typeof estimatedTime)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by estimated time"><option value="all">Any Estimated Time</option><option value="under-10">Under 10 Minutes</option><option value="10-plus">10–12 Minutes</option></select>
          <select value={completion} onChange={(event) => setCompletion(event.target.value as typeof completion)} className={`${tw.input.base} ${tw.input.default} py-2.5 text-xs`} aria-label="Filter by completion"><option value="all">Completed Or Not</option><option value="completed">Completed</option><option value="not-completed">Not Completed</option></select>
          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] px-3 text-xs font-semibold text-[var(--space-text-secondary)]"><input type="checkbox" checked={recommendedOnly} onChange={(event) => setRecommendedOnly(event.target.checked)} className="h-4 w-4 accent-[var(--space-brand-primary-600)]" /> Recommended For Me</label>
        </div>
        <p className="mt-3 text-xs font-medium text-[var(--space-text-muted)]">Questions Matching Your Filters: {matches.length}.</p>
      </section>

      <section className="mt-4">
        {matches.length === 0 ? (
          <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-7 text-center" data-testid="question-library-empty-state">
            <p className="text-sm font-bold text-[var(--space-text-primary)]">No Drills Match These Filters</p>
            <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Clear the search and advanced filters to see {difficulty === 'all' ? 'this skill’s drills' : `${DIFFICULTY_LABELS[difficulty]} drills`} again.</p>
            <button type="button" onClick={clearFilters} className={`mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold ${tw.button.primary}`} data-testid="button-clear-library-filters">Clear Filters</button>
          </div>
        ) : (
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {matches.slice(0, visibleCount).map((question) => (
              <li key={question.id}>
                <button
                  type="button"
                  onClick={() => openQuestion(question)}
                  className="group flex h-full w-full items-start gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left transition-all hover:border-[var(--space-brand-primary-600)] hover:shadow-md"
                  data-testid={`library-question-${question.id}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-xs font-bold text-[var(--space-text-brand)]">{question.id.split('-').pop()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-5 text-[var(--space-text-primary)]">{capitaliseLineStarts(question.title)}</span>
                    <span className="mt-1.5 block line-clamp-2 text-xs leading-5 text-[var(--space-text-muted)]">{capitaliseLineStarts(question.question)}</span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${difficultyClass(question.difficulty)}`}>{DIFFICULTY_LABELS[question.difficulty]}</span>
                      {question.structuredAnswer ? <><span className="inline-flex rounded-full border border-[var(--space-border-default)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">{question.difficulty === 'hard' ? '2 connected exhibits' : '2–3 connected exhibits'}</span><span className="inline-flex rounded-full border border-[var(--space-border-default)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">Insight + implication</span></> : null}
                      {isQuestionCompleted(question.id) ? <span className="inline-flex rounded-full bg-[var(--space-semantic-success-100)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-neutral-800)]">Completed</span> : null}
                    </span>
                  </span>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-[var(--space-text-muted)] transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {matches.length > visibleCount ? (
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className={`mt-3 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold ${tw.button.secondary}`}>
            Show {Math.min(PAGE_SIZE, matches.length - visibleCount)} More Questions
          </button>
        ) : null}
      </section>
    </div>
  );
}
