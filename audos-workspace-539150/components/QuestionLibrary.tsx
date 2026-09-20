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
  Search,
  Shuffle,
  Sparkles,
  Target,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import { tw } from '../lib/colors';
import {
  QUESTION_LIBRARY,
  SKILL_META,
  questionCountFor,
  validateQuestionLibrary,
} from '../lib/skillQuestionLibrary';
import type {
  LibraryDifficulty,
  LibraryExhibit,
  LibraryQuestion,
  LibrarySkill,
} from '../lib/skillQuestionLibrary';

const PAGE_SIZE = 20;
const DIFFICULTY_LABELS: Record<LibraryDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
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
    .split('\n')
    .map((line) => line.replace(/^([^A-Za-zÀ-ỹ]*)([a-zà-ỹ])/, (_, prefix, first) => `${prefix}${first.toUpperCase()}`))
    .join('\n');
}

function normalise(value: string): string {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
}

function difficultyClass(difficulty: LibraryDifficulty): string {
  if (difficulty === 'easy') return 'bg-[var(--space-semantic-success-100)] text-[var(--space-neutral-800)]';
  if (difficulty === 'hard') return 'bg-[var(--space-semantic-danger-100)] text-[var(--space-neutral-800)]';
  return 'bg-[var(--space-semantic-warning-100)] text-[var(--space-neutral-800)]';
}

function Exhibit({ exhibit }: { exhibit: LibraryExhibit }) {
  const labels = exhibit.labels || [];
  const values = exhibit.values || [];
  const max = Math.max(...values, 1);
  const total = values.reduce((sum, value) => sum + value, 0) || 1;
  const tones = [
    'var(--space-brand-primary-700)',
    'var(--space-brand-primary-500)',
    'var(--space-brand-primary-300)',
    'var(--space-brand-primary-100)',
  ];

  return (
    <section
      className="overflow-hidden rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] shadow-sm"
      data-testid="question-library-exhibit"
    >
      <div className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-5 py-4 sm:px-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Exhibit</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">{capitaliseLineStarts(exhibit.title)}</h2>
          <span className="text-xs font-medium text-[var(--space-text-muted)]">{capitaliseLineStarts(exhibit.unit)}</span>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {exhibit.kind === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--space-border-strong)]">
                  {(exhibit.columns || []).map((column) => (
                    <th key={column} className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-[var(--space-text-muted)]">
                      {capitaliseLineStarts(column)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(exhibit.rows || []).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-[var(--space-border-default)] last:border-b-0">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`px-3 py-3.5 ${cellIndex === 0 ? 'font-semibold text-[var(--space-text-primary)]' : 'tabular-nums text-[var(--space-text-secondary)]'}`}>
                        {capitaliseLineStarts(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : exhibit.kind === 'pie' ? (
          <div className="grid items-center gap-6 sm:grid-cols-[minmax(220px,0.9fr)_minmax(240px,1.1fr)]">
            <div className="mx-auto h-56 w-56 rounded-full shadow-inner" style={{ background: `conic-gradient(${values.map((value, index) => {
              const previous = values.slice(0, index).reduce((sum, item) => sum + item, 0) / total * 100;
              const end = previous + value / total * 100;
              return `${tones[index % tones.length]} ${previous}% ${end}%`;
            }).join(', ')})` }} role="img" aria-label={capitaliseLineStarts(exhibit.title)} />
            <ul className="space-y-3">
              {labels.map((label, index) => (
                <li key={label} className="flex items-center gap-3 rounded-xl border border-[var(--space-border-default)] px-3.5 py-3">
                  <span className="h-3.5 w-3.5 rounded-sm" style={{ background: tones[index % tones.length] }} />
                  <span className="flex-1 text-sm font-medium text-[var(--space-text-secondary)]">{capitaliseLineStarts(label)}</span>
                  <span className="text-base font-bold tabular-nums text-[var(--space-text-primary)]">{values[index]}%</span>
                </li>
              ))}
            </ul>
          </div>
        ) : exhibit.kind === 'line' ? (
          <div>
            <svg viewBox="0 0 700 280" className="h-[280px] w-full" role="img" aria-label={capitaliseLineStarts(exhibit.title)} preserveAspectRatio="none">
              {[0, 1, 2, 3, 4].map((index) => (
                <line key={index} x1="48" x2="680" y1={35 + index * 50} y2={35 + index * 50} stroke="var(--space-border-default)" strokeWidth="1" />
              ))}
              <polyline
                fill="none"
                stroke="var(--space-brand-primary-600)"
                strokeWidth="7"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={values.map((value, index) => `${60 + index * (610 / Math.max(values.length - 1, 1))},${235 - value / max * 180}`).join(' ')}
              />
              {values.map((value, index) => {
                const x = 60 + index * (610 / Math.max(values.length - 1, 1));
                const y = 235 - value / max * 180;
                return <circle key={index} cx={x} cy={y} r="8" fill="var(--space-surface-card)" stroke="var(--space-brand-primary-600)" strokeWidth="5" />;
              })}
            </svg>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(labels.length, 1)}, minmax(0, 1fr))` }}>
              {labels.map((label, index) => (
                <div key={label} className="text-center">
                  <p className="text-xs font-semibold text-[var(--space-text-muted)]">{capitaliseLineStarts(label)}</p>
                  <p className="mt-1 text-base font-bold tabular-nums text-[var(--space-text-primary)]">{values[index]}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[310px] items-end justify-around gap-4 border-b-2 border-[var(--space-border-strong)] px-3 pt-8 sm:gap-8 sm:px-8">
            {labels.map((label, index) => (
              <div key={label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                <span className="mb-2 text-sm font-bold tabular-nums text-[var(--space-text-primary)]">{values[index]}</span>
                <div className="w-full max-w-24 rounded-t-lg bg-[var(--space-brand-primary-600)]" style={{ height: `${Math.max(12, values[index] / max * 78)}%` }} />
                <span className="mt-3 min-h-10 text-center text-xs font-semibold text-[var(--space-text-muted)]">{capitaliseLineStarts(label)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
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
            {isCorrect === null ? 'Model Answer Revealed' : isCorrect ? 'Correct Answer' : 'Review The Worked Solution'}
          </p>
          <p className="text-xs text-[var(--space-text-muted)]">Use The Explanation To Check Your Logic, Not Only The Final Answer.</p>
        </div>
      </div>
      <div className="space-y-4 px-5 py-5 sm:px-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">Answer</p>
          <p className="mt-1.5 whitespace-pre-wrap text-base font-bold leading-7 text-[var(--space-text-primary)]">{capitaliseLineStarts(question.correctAnswer)}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">Explanation</p>
          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-[var(--space-text-secondary)]">{capitaliseLineStarts(question.explanation)}</p>
        </div>
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
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
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
  const skillMeta = SKILL_META.find((item) => item.id === skill) || SKILL_META[0];
  const questions = QUESTION_LIBRARY[skill];
  const matches = useMemo(() => {
    const needle = normalise(query);
    return questions.filter((question) => {
      if (difficulty !== 'all' && question.difficulty !== difficulty) return false;
      if (!needle) return true;
      return normalise(`${question.title} ${question.question} ${question.explanation}`).includes(needle);
    });
  }, [questions, difficulty, query]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [skill, difficulty, query]);

  const resetAttempt = () => {
    submittedAttemptRef.current = false;
    explanationViewedRef.current = false;
    setSelectedOption('');
    setAnswer('');
    setWorking('');
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

  const switchSkill = (nextSkill: LibrarySkill) => {
    setSkill(nextSkill);
    setDifficulty('all');
    setQuery('');
    setActive(null);
    resetAttempt();
    void emitLibraryEvent('drill_skill_selected', 'step', { skill: nextSkill });
  };

  const randomQuestion = () => {
    const pool = matches.length > 0 ? matches : questions;
    const nextQuestion = pool[Math.floor(Math.random() * pool.length)];
    if (active) void emitLibraryEvent('drill_next_question', 'retention', { question_id: nextQuestion.id });
    openQuestion(nextQuestion);
  };

  const submit = () => {
    if (!active) return;
    if (active.answerMode === 'choice' && !selectedOption) {
      setValidationError('Choose An Answer Before Submitting.');
      return;
    }
    if (active.answerMode !== 'choice' && !answer.trim() && !working.trim()) {
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
    if (active.answerMode === 'choice') return selectedOption === active.correctAnswer;
    const parsed = Number(answer.replace(/,/g, '').replace(/[^0-9.-]/g, ''));
    if (!Number.isFinite(parsed) || active.numericAnswer == null) return false;
    return Math.abs(parsed - active.numericAnswer) <= (active.numericTolerance || 0.01);
  }, [active, submitted, selectedOption, answer]);

  if (active) {
    const isCaseCoachLayout = active.skill === 'charts' || active.skill === 'calculations';
    return (
      <div className="mt-5" data-testid={`question-library-active-${active.skill}`}>
        <button type="button" onClick={() => setActive(null)} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${tw.button.ghost}`}>
          <ArrowLeft className="h-4 w-4" />
          Back To Question Library
        </button>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`${tw.badge.default} ${tw.badge.primary}`}>{capitaliseLineStarts(skillMeta.label)}</span>
          <span className={`${tw.badge.default} ${difficultyClass(active.difficulty)}`}>{DIFFICULTY_LABELS[active.difficulty]}</span>
          <span className="text-xs font-medium text-[var(--space-text-muted)]">Question {active.id.split('-').pop()} Of 100</span>
        </div>

        {active.skill === 'charts' && active.exhibit ? <div className="mt-4"><Exhibit exhibit={active.exhibit} /></div> : null}

        <section className={`mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] ${isCaseCoachLayout ? 'px-5 py-6 shadow-sm sm:px-8 sm:py-8' : 'p-4 sm:p-5'}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Question</p>
          <h2 className="mt-2 text-xl font-bold leading-8 text-[var(--space-text-primary)] sm:text-2xl">{capitaliseLineStarts(active.title)}</h2>
          <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-[var(--space-text-secondary)]">{capitaliseLineStarts(active.question)}</p>
        </section>

        {!submitted ? (
          <section className={`mt-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] ${isCaseCoachLayout ? 'p-5 shadow-sm sm:p-7' : 'p-4 sm:p-5'}`} data-testid="question-library-answer-area">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-muted)]">Your Answer</p>

            {active.answerMode === 'choice' ? (
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
              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(220px,0.7fr)_minmax(320px,1.3fr)]">
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
                {active.answerMode === 'number' ? (
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
                  className={`${tw.input.base} ${tw.input.default} ${active.answerMode === 'number' ? 'mt-3' : ''} min-h-36 text-sm leading-6`}
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
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">Choose One Of Five Consulting Skills. Every Skill Contains Exactly 100 Questions With Answers And Explanations.</p>
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
          {(['all', 'easy', 'medium', 'hard'] as const).map((level) => (
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
        <p className="mt-3 text-xs font-medium text-[var(--space-text-muted)]">Questions Matching Your Filters: {matches.length}.</p>
      </section>

      <section className="mt-4">
        {matches.length === 0 ? (
          <p className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-7 text-center text-sm text-[var(--space-text-secondary)]">No Questions Match. Try A Different Search Or Difficulty.</p>
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
                    <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${difficultyClass(question.difficulty)}`}>{DIFFICULTY_LABELS[question.difficulty]}</span>
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
