// Casemate — Aptitude Test Simulation.
//
// Full-length, exam-style rounds (25 questions, 30 minutes, verbal + quantitative
// + abstract reasoning in one sitting with no breaks), modelled on the Talented
// Candidate 2022 Round 1 aptitude test. Questions are transcribed in
// lib/aptitudeSimulation.ts; charts, tables and abstract figures are drawn live
// from the original PDF pages (components/PdfCropFigure.tsx).
//
// Completed attempts are stored in WorkspaceDB `aptitude_attempts` with
// test_type 'simulation', keyed the same way as the Aptitude Test app.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Flag,
  Play,
  RotateCcw,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';
import { tw } from '../../lib/colors';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import PaywallGate from '../../components/PaywallGate';
import PdfCropFigure from '../../components/PdfCropFigure';
import { emitLiveSourceEventsOnce, insertedWorkspaceRowId, logLiveTrackingFailure, workspaceRows } from '../../lib/liveFeatureTracking';
import { SECTION_LABEL, loadSimulationTests } from '../../lib/aptitudeSimulation';
import type { SimCrop, SimQuestion, SimSection, SimTest } from '../../lib/aptitudeSimulation';

interface AttemptRow {
  id: number;
  test_type: string | null;
  test_id: string;
  test_name: string | null;
  score: number;
  total: number;
  percent: number | null;
  duration_seconds: number | null;
  timed_out: boolean | null;
  created_at: string;
}

interface SectionResult {
  sec: SimSection;
  score: number;
  total: number;
}

interface Finished {
  test: SimTest;
  answers: (string | null)[];
  flags: boolean[];
  score: number;
  total: number;
  percent: number;
  durationSeconds: number;
  timedOut: boolean;
  sections: SectionResult[];
}

type View = 'home' | 'intro' | 'test' | 'results';

const SECTION_ORDER: SimSection[] = ['V', 'Q', 'A'];

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function toSource(url: string, crop: SimCrop) {
  return { url, page: crop[0], box: [crop[1], crop[2], crop[3], crop[4]] as [number, number, number, number] };
}

function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split('**');
  return (
    <p className={`whitespace-pre-line ${className || ''}`}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-[var(--space-text-primary)]">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

function sectionRange(test: SimTest, sec: SimSection): string {
  const numbers = test.questions.filter((q) => q.sec === sec).map((q) => q.n);
  if (!numbers.length) return '';
  return numbers.length === 1 ? `Q${numbers[0]}` : `Q${numbers[0]}–${numbers[numbers.length - 1]}`;
}

function emitSimulationAttempt(input: {
  insertResponse: unknown;
  sessionId: string;
  userKey: string;
  completedAt: string;
  testId: string;
  testName: string;
  score: number;
  total: number;
  percent: number;
  durationSeconds: number;
  timedOut: boolean;
}): void {
  void (async () => {
    try {
      const db = (window as any).__workspaceDb;
      if (!db?.from) throw new Error('workspace_db_unavailable');
      let rowId = insertedWorkspaceRowId(input.insertResponse);
      if (!rowId) {
        const source = await db
          .from('aptitude_attempts', { shared: true })
          .eq('user_key', input.userKey)
          .eq('completed_at', input.completedAt)
          .eq('test_id', input.testId)
          .limit(1)
          .get();
        const row = workspaceRows(source)[0] || null;
        rowId = Number(row?.id) || null;
      }
      if (!rowId) throw new Error('aptitude_attempt_row_id_unavailable');
      const properties = {
        score: input.score,
        total: input.total,
        percent: input.percent,
        test_id: input.testId,
        test_name: input.testName || null,
        test_type: 'simulation',
        timed_out: input.timedOut,
        duration_seconds: input.durationSeconds,
      };
      if (input.timedOut) {
        emitLiveSourceEventsOnce({
          featureName: 'aptitude',
          appId: 'aptitude-test',
          mode: null,
          sessionId: input.sessionId,
          sourceTable: 'aptitude_attempts',
          sourceRecordId: rowId,
          sourceUserKey: input.userKey,
          occurredAt: input.completedAt,
          properties,
          events: [{ eventName: 'aptitude_timed_out', eventRole: 'diagnostic', completionKey: null }],
        });
        return;
      }
      const completionKey = `aptitude:${rowId}`;
      emitLiveSourceEventsOnce({
        featureName: 'aptitude',
        appId: 'aptitude-test',
        mode: null,
        sessionId: input.sessionId,
        sourceTable: 'aptitude_attempts',
        sourceRecordId: rowId,
        sourceUserKey: input.userKey,
        occurredAt: input.completedAt,
        properties,
        events: [{ eventName: 'aptitude_submitted', eventRole: 'core_action', completionKey }],
        coreDedup: { eventName: 'aptitude_submitted', completionKey },
      });
    } catch (error) {
      logLiveTrackingFailure({
        featureName: 'aptitude',
        eventName: input.timedOut ? 'aptitude_timed_out' : 'aptitude_submitted',
        sessionId: input.sessionId,
        reason: error instanceof Error ? error.message : 'aptitude_attempt_source_read_failed',
        statusCode: Number.isFinite(Number((error as any)?.status)) ? Number((error as any).status) : null,
        phase: 'aptitude_source_read',
      });
    }
  })();
}

function QuestionBody({
  test,
  q,
  selected,
  onSelect,
  reveal,
}: {
  test: SimTest;
  q: SimQuestion;
  selected?: string | null;
  onSelect?: (label: string) => void;
  reveal?: boolean;
}) {
  const figures = (crops: SimCrop[]) =>
    crops.map((crop, i) => <PdfCropFigure key={`${crop.join('-')}-${i}`} source={toSource(test.url, crop)} maxWidth={760} />);

  const frame = (label: string) => {
    if (reveal) {
      if (label === q.answer) {
        return 'border-[var(--space-semantic-success)] bg-[color-mix(in_srgb,var(--space-semantic-success)_10%,transparent)]';
      }
      if (label === selected) {
        return 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_10%,transparent)]';
      }
      return 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]';
    }
    return label === selected
      ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-brand-primary)]';
  };

  const marker = (label: string) => (
    <>
      {reveal && label === q.answer ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" /> : null}
      {reveal && label === selected && label !== q.answer ? (
        <XCircle className="h-4 w-4 shrink-0 text-[var(--space-semantic-danger)]" />
      ) : null}
    </>
  );

  const group = q.group;

  return (
    <div className="space-y-3">
      {group ? (
        <div className="space-y-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 sm:p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{group.title}</p>
          {group.intro ? (
            <div className="max-h-72 overflow-y-auto rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3">
              <RichText text={group.intro} className="text-sm leading-7 text-[var(--space-text-secondary)]" />
            </div>
          ) : null}
          {figures(group.before)}
          {group.note ? <RichText text={group.note} className="text-sm leading-7 text-[var(--space-text-secondary)]" /> : null}
        </div>
      ) : null}

      {q.intro ? (
        <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3 sm:p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{q.introTitle || 'Passage'}</p>
          <div className={`mt-1.5 ${q.intro.length > 1600 ? 'max-h-80 overflow-y-auto pr-2' : ''}`}>
            <RichText text={q.intro} className="text-sm leading-7 text-[var(--space-text-primary)]" />
          </div>
        </div>
      ) : null}

      {figures(q.before)}
      {q.stem ? <RichText text={q.stem} className="text-sm font-medium leading-7 text-[var(--space-text-primary)] sm:text-[15px]" /> : null}
      {figures(q.after)}

      {q.options.length ? (
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Answer options">
          {q.labels.map((label, i) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={selected === label}
              disabled={!onSelect}
              onClick={() => onSelect && onSelect(label)}
              className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2.5 text-left transition sm:gap-3 sm:px-4 ${frame(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--space-border-strong)] text-[11px] font-bold text-[var(--space-text-secondary)]">
                {label}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium leading-6 text-[var(--space-text-primary)]">{q.options[i]}</span>
              {marker(label)}
            </button>
          ))}
        </div>
      ) : (
        <div className="mx-auto grid w-full max-w-md gap-2" style={{ gridTemplateColumns: `repeat(${q.labels.length}, minmax(0, 1fr))` }} role="radiogroup" aria-label="Answer options">
          {q.labels.map((label) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={selected === label}
              disabled={!onSelect}
              onClick={() => onSelect && onSelect(label)}
              className={`flex min-h-12 items-center justify-center gap-1 rounded-xl border-2 text-base font-bold text-[var(--space-text-primary)] transition ${frame(label)} ${onSelect ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {label}
              {marker(label)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SimulationInner() {
  const { spaceId, sessionId } = useSpaceRuntime();
  const tests = useMemo(() => loadSimulationTests(), []);

  const [view, setView] = useState<View>('home');
  const [active, setActive] = useState<SimTest | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [flags, setFlags] = useState<boolean[]>([]);
  const [index, setIndex] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [finished, setFinished] = useState<Finished | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [wrongOnly, setWrongOnly] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const submittingRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const email = useMemo(() => {
    try {
      const stored = localStorage.getItem(`space_session_${spaceId}`);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
        return parsed.email.toLowerCase().trim();
      }
    } catch (error) {
      /* storage unavailable: fall back to the device key */
    }
    return null;
  }, [spaceId]);

  const userKey = useMemo(() => {
    if (email) return `email:${email}`;
    const match = typeof document !== 'undefined' ? document.cookie.match(/(?:^|;\s*)audos_vid=([^;]+)/) : null;
    return `device:${(match && match[1]) || sessionId || 'unknown'}`;
  }, [email, sessionId]);

  const history = (window as any).useWorkspaceDB('aptitude_attempts', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: userKey }],
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 50,
  }) as { data: AttemptRow[] | null; refresh: () => void };
  const attempts = (Array.isArray(history.data) ? history.data : []).filter((row) => row.test_type === 'simulation');
  const refreshHistoryRef = useRef(history.refresh);
  refreshHistoryRef.current = history.refresh;

  const answersRef = useRef<(string | null)[]>([]);
  answersRef.current = answers;
  const flagsRef = useRef<boolean[]>([]);
  flagsRef.current = flags;

  const bestFor = (testId: string) => {
    const rows = attempts.filter((row) => row.test_id === testId);
    if (!rows.length) return null;
    return rows.reduce((best, row) => (row.score > best.score ? row : best), rows[0]);
  };

  const finish = useCallback(
    async (test: SimTest, picked: (string | null)[], marked: boolean[], timedOut: boolean, started: number | null) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      setConfirmSubmit(false);

      const total = test.questions.length;
      const correct = test.questions.map((q, i) => picked[i] === q.answer);
      const score = correct.filter(Boolean).length;
      const percent = Math.round((score / Math.max(1, total)) * 100);
      const sections = SECTION_ORDER.map((sec) => {
        const indexes = test.questions.map((q, i) => (q.sec === sec ? i : -1)).filter((i) => i >= 0);
        return { sec, score: indexes.filter((i) => correct[i]).length, total: indexes.length };
      }).filter((s) => s.total > 0);
      const durationSeconds = started ? Math.round((Date.now() - started) / 1000) : 0;

      setFinished({ test, answers: picked, flags: marked, score, total, percent, durationSeconds, timedOut, sections });
      setWrongOnly(false);
      setView('results');
      window.dispatchEvent(new CustomEvent('casemate:pwa-install-ready', { detail: { source: 'aptitude_test_completed' } }));
      setSaving(true);
      setSaveError('');

      try {
        const completedAt = new Date().toISOString();
        const insertResponse = await (window as any).__workspaceDb.from('aptitude_attempts').insert({
          user_key: userKey,
          email: email || null,
          test_type: 'simulation',
          test_id: test.id,
          test_name: test.name,
          score,
          total,
          percent,
          duration_seconds: durationSeconds,
          timed_out: timedOut,
          answers_json: test.questions.map((q, i) => ({
            question_id: `${test.id}-q${q.n}`,
            section: q.sec,
            chosen: picked[i],
            correct: q.answer,
            is_correct: correct[i],
          })),
          completed_at: completedAt,
        });
        refreshHistoryRef.current();
        if (sessionId) {
          emitSimulationAttempt({
            insertResponse,
            sessionId,
            userKey,
            completedAt,
            testId: test.id,
            testName: test.name,
            score,
            total,
            percent,
            durationSeconds,
            timedOut,
          });
        }
      } catch (error) {
        setSaveError('Your full result is shown below, but it could not be saved to your history. Try another simulation in a few minutes.');
      } finally {
        setSaving(false);
      }
    },
    [email, sessionId, userKey],
  );

  useEffect(() => {
    if (view !== 'test' || !deadline || !active) return undefined;
    const tick = () => {
      const left = (deadline - Date.now()) / 1000;
      setRemaining(Math.max(0, Math.ceil(left)));
      if (left <= 0) void finish(active, answersRef.current, flagsRef.current, true, startedAt);
    };
    tick();
    const timer = window.setInterval(tick, 500);
    return () => window.clearInterval(timer);
  }, [view, deadline, active, startedAt, finish]);

  useEffect(() => {
    if (view === 'test' && topRef.current) topRef.current.scrollIntoView({ block: 'start' });
  }, [index, view]);

  const openIntro = (test: SimTest) => {
    setActive(test);
    setView('intro');
  };

  const startTest = (test: SimTest) => {
    submittingRef.current = false;
    setActive(test);
    setAnswers(new Array(test.questions.length).fill(null));
    setFlags(new Array(test.questions.length).fill(false));
    setIndex(0);
    setConfirmSubmit(false);
    const now = Date.now();
    setStartedAt(now);
    setDeadline(now + test.minutes * 60 * 1000);
    setRemaining(test.minutes * 60);
    setFinished(null);
    setSaveError('');
    setView('test');
  };

  const goHome = () => {
    setView('home');
    setActive(null);
  };

  const chooseAnswer = (label: string) => {
    setAnswers((prev) => {
      const next = prev.slice();
      next[index] = label;
      return next;
    });
  };

  const toggleFlag = () => {
    setFlags((prev) => {
      const next = prev.slice();
      next[index] = !next[index];
      return next;
    });
  };

  const pageShell = (children: ReactNode) => (
    <div className="aptitude-simulation min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
      <style>{`
        @media (max-width: 639px) {
          .aptitude-simulation [role="radio"] { min-height: 48px; }
          .aptitude-simulation button { touch-action: manipulation; }
        }
      `}</style>
      <div className="mx-auto w-full max-w-5xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">{children}</div>
    </div>
  );

  /* ------------------------------------------------------------------ home */

  if (view === 'home') {
    return pageShell(
      <>
        <header className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] sm:h-10 sm:w-10">
            <ClipboardList className="h-4 w-4 text-[var(--space-text-brand)] sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">Aptitude Test Simulation</h1>
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => {
            const best = bestFor(test.id);
            const taken = attempts.filter((row) => row.test_id === test.id).length;
            return (
              <div
                key={test.id}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3.5 transition-all hover:border-[var(--space-brand-primary)] hover:shadow-md sm:p-4"
                data-testid={`card-${test.id}`}
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-bold text-[var(--space-text-primary)]">{test.name}</h2>
                    {best ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                        <Trophy className="h-3 w-3" /> Best {best.score}/{best.total}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] font-semibold text-[var(--space-text-brand)]">{test.subtitle}</p>
                </div>
                <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--space-text-muted)]">
                  <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" />{test.questions.length} questions</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{test.minutes} min</span>
                  <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />{taken > 0 ? `Taken: ${taken}` : 'Not Started Yet'}</span>
                </p>
                <button
                  type="button"
                  onClick={() => openIntro(test)}
                  className={`mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`}
                  data-testid={`button-open-${test.id}`}
                >
                  <Play className="h-4 w-4" />
                  {taken > 0 ? 'Sit it again' : 'Start simulation'}
                </button>
              </div>
            );
          })}
        </div>

        {attempts.length > 0 ? (
          <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
            <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Your attempts</h2>
            <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
              {attempts.slice(0, 10).map((row) => (
                <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
                  <span className="font-medium text-[var(--space-text-primary)]">{row.test_name || row.test_id}</span>
                  <span className="text-[var(--space-text-secondary)]">
                    {row.score}/{row.total}
                    {row.duration_seconds != null ? ` · ${formatClock(row.duration_seconds)}` : ''}
                    {row.timed_out ? ' · timed out' : ''}
                  </span>
                  <span className="text-[var(--space-text-muted)]">{new Date(row.created_at).toLocaleDateString('en-GB')}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </>,
    );
  }

  /* ----------------------------------------------------------------- intro */

  if (view === 'intro' && active) {
    return pageShell(
      <>
        <button
          type="button"
          onClick={goHome}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          All simulations
        </button>

        <div className="space-y-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">{active.subtitle}</p>
            <h1 className="mt-1 text-xl font-bold text-[var(--space-text-primary)]">{active.name}</h1>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[var(--space-text-primary)]">Overall instruction</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">
              The test is comprised of {active.questions.length} questions, divided into 3 sections. The amount of time for this
              test is {active.minutes} minutes, with NO BREAKS between sections. Each question has some possible answer options,
              and only ONE correct answer.
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {SECTION_ORDER.map((sec) => (
                <li key={sec} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
                  <p className="text-xs font-bold text-[var(--space-text-primary)]">{SECTION_LABEL[sec]}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--space-text-muted)]">
                    {sectionRange(active, sec)} · {active.questions.filter((q) => q.sec === sec).length} questions
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="list-disc space-y-1 pl-5 text-xs leading-5 text-[var(--space-text-secondary)]">
            <li>The {active.minutes}-minute countdown starts as soon as you press Start and submits the test by itself at zero.</li>
            <li>You can move freely between questions, change answers and flag questions to come back to.</li>
            <li>Charts, tables and figures are drawn from the original test file, so you need an internet connection.</li>
            <li>{active.keyNote}</li>
          </ul>

          <button
            type="button"
            onClick={() => startTest(active)}
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold sm:w-auto ${tw.button.primary}`}
            data-testid="button-start-simulation"
          >
            <Play className="h-4 w-4" />
            Start the {active.minutes}-minute test
          </button>
        </div>
      </>,
    );
  }

  /* ------------------------------------------------------------------ test */

  if (view === 'test' && active) {
    const question = active.questions[index];
    const answered = answers.filter(Boolean).length;
    const unanswered = active.questions.length - answered;
    const flagged = flags.filter(Boolean).length;
    const lowTime = remaining <= 60;
    const isLast = index === active.questions.length - 1;

    return pageShell(
      <>
        <div ref={topRef} />
        <div className="sticky top-0 z-20 flex items-center justify-between gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 shadow-sm sm:static sm:px-4 sm:py-2.5 sm:shadow-none">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-bold text-[var(--space-text-primary)]">
                Question {question.n}/{active.questions.length}
              </p>
              <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                {SECTION_LABEL[question.sec]}
              </span>
            </div>
            <p className="text-[11px] text-[var(--space-text-muted)]">
              {active.name} · {answered}/{active.questions.length} answered
              {flagged > 0 ? ` · ${flagged} flagged` : ''}
            </p>
          </div>
          <div
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold tabular-nums sm:py-1 sm:text-[13px] ${
              lowTime
                ? 'bg-[color-mix(in_srgb,var(--space-semantic-danger)_12%,transparent)] text-[var(--space-semantic-danger)]'
                : 'bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]'
            }`}
            aria-live="polite"
          >
            <Clock className="h-4 w-4" />
            {formatClock(remaining)}
          </div>
        </div>

        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
          <div
            className="h-full rounded-full bg-[var(--space-brand-primary)] transition-all"
            style={{ width: `${((index + 1) / active.questions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-4 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-5">
          <QuestionBody key={question.n} test={active} q={question} selected={answers[index]} onSelect={chooseAnswer} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            className={`inline-flex items-center gap-1 rounded-lg border border-[var(--space-border-default)] px-3 py-2 text-sm font-semibold ${tw.button.ghost} disabled:opacity-40`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            type="button"
            onClick={toggleFlag}
            aria-pressed={flags[index]}
            className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              flags[index]
                ? 'border-[var(--space-semantic-warning)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_14%,transparent)] text-[var(--space-semantic-warning-700)]'
                : `border-[var(--space-border-default)] ${tw.button.ghost}`
            }`}
          >
            <Flag className="h-4 w-4" />
            {flags[index] ? 'Flagged' : 'Flag for review'}
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={() => setConfirmSubmit(true)}
              className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold ${tw.button.primary}`}
              data-testid="button-submit-simulation"
            >
              Submit test
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIndex(Math.min(active.questions.length - 1, index + 1))}
              className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold ${tw.button.primary}`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="space-y-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[var(--space-text-primary)]">Question navigator</h2>
            <button
              type="button"
              onClick={() => setConfirmSubmit(true)}
              className="rounded-lg border border-[var(--space-border-default)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-muted)]"
            >
              Finish and submit
            </button>
          </div>
          {SECTION_ORDER.map((sec) => {
            const items = active.questions.map((q, i) => ({ q, i })).filter((item) => item.q.sec === sec);
            if (!items.length) return null;
            return (
              <div key={sec}>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{SECTION_LABEL[sec]}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {items.map(({ q, i }) => {
                    const isCurrent = i === index;
                    const isAnswered = Boolean(answers[i]);
                    return (
                      <button
                        key={q.n}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to question ${q.n}${isAnswered ? ', answered' : ''}${flags[i] ? ', flagged' : ''}`}
                        className={`relative flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold transition ${
                          isCurrent
                            ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                            : isAnswered
                              ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                              : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]'
                        }`}
                      >
                        {q.n}
                        {flags[i] ? <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--space-semantic-warning)]" /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {confirmSubmit ? (
          <>
            <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setConfirmSubmit(false)} aria-hidden="true" />
            <div
              role="dialog"
              aria-label="Submit the test"
              className="fixed inset-x-3 bottom-6 z-50 mx-auto max-w-md rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:-translate-x-1/2 sm:-translate-y-1/2"
            >
              <p className="text-sm font-bold text-[var(--space-text-primary)]">Submit the test?</p>
              <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                {unanswered > 0
                  ? `${unanswered} ${unanswered === 1 ? 'question is' : 'questions are'} still unanswered and will score 0.`
                  : 'Every question has an answer.'}
                {flagged > 0 ? ` ${flagged} ${flagged === 1 ? 'question is' : 'questions are'} flagged for review.` : ''} You have{' '}
                {formatClock(remaining)} left.
              </p>
              <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setConfirmSubmit(false)}
                  className="rounded-lg border border-[var(--space-border-default)] px-4 py-2 text-sm font-semibold text-[var(--space-text-brand)] hover:bg-[var(--space-surface-muted)]"
                >
                  Keep working
                </button>
                <button
                  type="button"
                  onClick={() => void finish(active, answers, flags, false, startedAt)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${tw.button.primary}`}
                  data-testid="button-confirm-submit"
                >
                  Submit now
                </button>
              </div>
            </div>
          </>
        ) : null}
      </>,
    );
  }

  /* --------------------------------------------------------------- results */

  if (view === 'results' && finished) {
    const { test } = finished;
    const reviewItems = test.questions
      .map((q, i) => ({ q, i }))
      .filter(({ q, i }) => !wrongOnly || finished.answers[i] !== q.answer);
    const wrongCount = test.questions.filter((q, i) => finished.answers[i] !== q.answer).length;

    return pageShell(
      <>
        <button
          type="button"
          onClick={goHome}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          All simulations
        </button>

        <div className="space-y-4 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">{test.name}</p>
              <p className="mt-1 text-3xl font-extrabold text-[var(--space-text-primary)]" data-testid="text-sim-score">
                {finished.score}/{finished.total}
                <span className="ml-2 text-lg font-bold text-[var(--space-text-secondary)]">{finished.percent}%</span>
              </p>
              <p className="mt-1 text-xs text-[var(--space-text-muted)]">
                Time used {formatClock(finished.durationSeconds)} of {test.minutes}:00
                {finished.timedOut ? ' · the time ran out and the test was submitted automatically' : ''}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => startTest(test)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold ${tw.button.primary}`}
              >
                <RotateCcw className="h-4 w-4" />
                Sit it again
              </button>
            </div>
          </div>

          {saving ? <p className="text-xs text-[var(--space-text-muted)]">Saving your result…</p> : null}
          {saveError ? <p className="text-xs font-medium text-[var(--space-semantic-danger)]">{saveError}</p> : null}

          <div className="grid gap-2 sm:grid-cols-3">
            {finished.sections.map((section) => {
              const pct = Math.round((section.score / Math.max(1, section.total)) * 100);
              return (
                <div key={section.sec} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
                  <p className="text-xs font-bold text-[var(--space-text-primary)]">{SECTION_LABEL[section.sec]}</p>
                  <p className="mt-1 text-lg font-bold text-[var(--space-text-primary)]">
                    {section.score}/{section.total}
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--space-surface-card)]">
                    <div className="h-full rounded-full bg-[var(--space-brand-primary)]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[var(--space-text-primary)]">Review every question</h2>
          <button
            type="button"
            onClick={() => setWrongOnly(!wrongOnly)}
            aria-pressed={wrongOnly}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              wrongOnly
                ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary)]'
            }`}
          >
            {wrongOnly ? `Showing ${wrongCount} to review` : `Only questions to review (${wrongCount})`}
          </button>
        </div>

        <div className="space-y-3">
          {reviewItems.map(({ q, i }) => {
            const chosen = finished.answers[i];
            const isCorrect = chosen === q.answer;
            return (
              <div key={q.n} className="space-y-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[var(--space-text-primary)]">Question {q.n}</p>
                  <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                    {SECTION_LABEL[q.sec]}
                  </span>
                  {finished.flags[i] ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-secondary)]">
                      <Flag className="h-3 w-3" /> Flagged
                    </span>
                  ) : null}
                  <span
                    className={`ml-auto inline-flex items-center gap-1 text-xs font-semibold ${
                      isCorrect ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-semantic-danger)]'
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {isCorrect ? `Correct — you chose ${chosen}` : chosen ? `Wrong — you chose ${chosen}, the answer is ${q.answer}` : `Not answered — the answer is ${q.answer}`}
                  </span>
                </div>
                <QuestionBody test={test} q={q} selected={chosen} reveal />
                <div className="rounded-lg bg-[var(--space-surface-muted)] p-3">
                  <p className="text-xs font-semibold text-[var(--space-text-primary)]">Answer and explanation</p>
                  {q.review.length && test.keyUrl ? (
                    <div className="mt-2 space-y-2">
                      {q.review.map((crop, k) => (
                        <PdfCropFigure key={`${crop.join('-')}-${k}`} source={toSource(test.keyUrl as string, crop)} maxWidth={760} alt={`Official explanation for question ${q.n}`} />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                      Correct answer: {q.answer}. The source file only marks the correct option (bolded) and gives no written explanation for this question.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          {reviewItems.length === 0 ? (
            <p className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-sm text-[var(--space-text-secondary)]">
              Every question was answered correctly. Nothing to review.
            </p>
          ) : null}
        </div>
      </>,
    );
  }

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-[var(--space-surface-page)] p-6">
      <p className="text-sm text-[var(--space-text-muted)]">Loading the simulation…</p>
    </div>
  );
}

export default function AptitudeSimulation() {
  return (
    <PaywallGate appId="aptitude-simulation" appName="Aptitude Test Simulation">
      <SimulationInner />
    </PaywallGate>
  );
}
