import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CheckCircle2, ChevronLeft, Clock, Eraser, Grid3x3, Loader2, Play, RotateCcw, Undo2 } from 'lucide-react';
import { tw } from '../lib/colors';
import {
  GC_DOT_MS,
  GC_MEMORY_SIZE,
  GC_ROUNDS,
  normalizeShape,
  sameCell,
  shapeBounds,
  summarizeGridAttempt,
} from '../lib/gridChallenge';
import type {
  GcAnswer,
  GcCell,
  GcCombinationQuestion,
  GcQuestion,
  GcResponses,
  GcResult,
  GcRotationQuestion,
  GcSession,
  GcSymmetryQuestion,
} from '../lib/gridChallenge';

export const GC_LEAVE_MESSAGE = 'Leave the Grid Challenge? This session will be discarded and nothing will be saved to your history.';

/** Pause on an empty field before each dot, so consecutive dots read as separate flashes. */
const GC_BLANK_MS = 350;
const GC_NEXT_TASK_MS = 900;
const CARD = 'rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 sm:p-4';
const PILL = 'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold';

function clock(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

/* ========================================================================== *
 * Figures
 * ========================================================================== */

const UNIT = 10;

function MemoryField({
  highlight = null,
  picks,
  onTap,
  locked = false,
}: {
  highlight?: GcCell | null;
  picks?: GcCell[];
  onTap?: (cell: GcCell) => void;
  /** Recall is full: unpicked cells ignore taps until one is deselected. */
  locked?: boolean;
}) {
  const cells = Array.from({ length: GC_MEMORY_SIZE * GC_MEMORY_SIZE }, (_, i) => [Math.floor(i / GC_MEMORY_SIZE), i % GC_MEMORY_SIZE] as GcCell);
  return (
    <div
      className="mx-auto grid aspect-square w-full max-w-[340px] gap-1.5 rounded-2xl bg-[var(--space-neutral-900)] p-3 shadow-inner sm:gap-2 sm:p-4"
      style={{ gridTemplateColumns: `repeat(${GC_MEMORY_SIZE}, minmax(0, 1fr))` }}
      role={onTap ? 'group' : 'img'}
      aria-label={onTap ? 'Recall grid: tap the dots in order' : highlight ? 'A dot is highlighted' : 'Dot field'}
      data-testid={onTap ? 'gc-recall-field' : 'gc-memory-field'}
    >
      {cells.map((cell) => {
        const lit = sameCell(highlight ?? undefined, cell);
        const order = picks ? picks.findIndex((pick) => sameCell(pick, cell)) : -1;
        const picked = order >= 0;
        const dot = (
          <span
            className={`block aspect-square w-[46%] rounded-full transition-all duration-150 motion-reduce:transition-none ${
              lit
                ? 'scale-110 bg-[var(--space-brand-primary)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--space-brand-primary)_35%,transparent)] motion-reduce:scale-100'
                : picked
                  ? 'w-[62%] bg-[var(--space-brand-primary)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--space-neutral-0)_85%,transparent)]'
                  : 'bg-[color-mix(in_srgb,var(--space-neutral-0)_32%,transparent)]'
            }`}
          />
        );
        const label = `Row ${cell[0] + 1}, column ${cell[1] + 1}`;
        if (!onTap) {
          return (
            <span key={`${cell[0]}-${cell[1]}`} className="flex items-center justify-center" data-lit={lit || undefined} data-testid={lit ? 'gc-lit-dot' : undefined}>
              {dot}
            </span>
          );
        }
        return (
          <button
            key={`${cell[0]}-${cell[1]}`}
            type="button"
            onClick={() => onTap(cell)}
            aria-pressed={picked}
            aria-label={picked ? `${label}, selected ${order + 1}${order === 0 ? 'st' : order === 1 ? 'nd' : order === 2 ? 'rd' : 'th'}` : label}
            className={`relative flex items-center justify-center rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--space-neutral-0)] ${
              picked ? 'bg-[color-mix(in_srgb,var(--space-neutral-0)_10%,transparent)]' : locked ? 'cursor-not-allowed' : 'hover:bg-[color-mix(in_srgb,var(--space-neutral-0)_10%,transparent)]'
            }`}
            style={{ touchAction: 'manipulation' }}
            data-testid={`gc-cell-${cell[0]}-${cell[1]}`}
          >
            {dot}
            {picked ? (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-base font-bold text-[var(--space-text-on-primary)] sm:text-lg">
                {order + 1}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function SymmetryFigure({ question }: { question: GcSymmetryQuestion }) {
  const width = question.cols * UNIT;
  const height = question.rows * UNIT;
  const half = (question.cols / 2) * UNIT;
  return (
    <svg viewBox={`-2 -2 ${width + 4} ${height + 4}`} className="mx-auto block w-full max-w-[300px]" role="img" aria-label="A grid split down the middle by a red line">
      <rect x={0} y={0} width={half} height={height} fill="var(--space-neutral-50)" />
      <rect x={half} y={0} width={half} height={height} fill="var(--space-neutral-100)" />
      {question.filled.map(([row, col]) => (
        <rect key={`${row}-${col}`} x={col * UNIT + 0.6} y={row * UNIT + 0.6} width={UNIT - 1.2} height={UNIT - 1.2} rx={1.2} fill="var(--space-neutral-800)" />
      ))}
      {Array.from({ length: question.cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={i * UNIT} y1={0} x2={i * UNIT} y2={height} stroke="var(--space-neutral-300)" strokeWidth={0.3} />
      ))}
      {Array.from({ length: question.rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * UNIT} x2={width} y2={i * UNIT} stroke="var(--space-neutral-300)" strokeWidth={0.3} />
      ))}
      <line x1={half} y1={-2} x2={half} y2={height + 2} stroke="var(--space-brand-primary)" strokeWidth={1.2} />
      <rect x={0} y={0} width={width} height={height} fill="none" stroke="var(--space-neutral-500)" strokeWidth={0.6} />
    </svg>
  );
}

function ShapeFigure({
  cells,
  box,
  fill,
  stroke = 'var(--space-neutral-0)',
  label,
  maxWidth = 150,
}: {
  cells: GcCell[];
  box: number;
  fill: string;
  stroke?: string;
  label: string;
  maxWidth?: number;
}) {
  const shape = normalizeShape(cells);
  const bounds = shapeBounds(shape);
  const offsetRow = (box - bounds.rows) / 2;
  const offsetCol = (box - bounds.cols) / 2;
  const size = box * UNIT;
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className="block w-full" style={{ maxWidth }} role="img" aria-label={label}>
      <rect x={-1} y={-1} width={size + 2} height={size + 2} rx={2} fill="var(--space-surface-muted)" />
      {Array.from({ length: box * box }, (_, i) => (
        <circle key={i} cx={(i % box) * UNIT + UNIT / 2} cy={Math.floor(i / box) * UNIT + UNIT / 2} r={0.5} fill="var(--space-neutral-300)" />
      ))}
      {shape.map(([row, col]) => (
        <rect
          key={`${row}-${col}`}
          x={(col + offsetCol) * UNIT + 0.4}
          y={(row + offsetRow) * UNIT + 0.4}
          width={UNIT - 0.8}
          height={UNIT - 0.8}
          rx={1}
          fill={fill}
          stroke={stroke}
          strokeWidth={0.6}
        />
      ))}
    </svg>
  );
}

function FigureSlot({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{title}</span>
      {children}
    </div>
  );
}

function RotationFigure({ question }: { question: GcRotationQuestion }) {
  return (
    <div className="mx-auto flex w-full max-w-[360px] items-center gap-3 sm:gap-5">
      <FigureSlot title="Shape A">
        <ShapeFigure cells={question.shapeA} box={4} fill="var(--space-neutral-800)" label="Shape A" />
      </FigureSlot>
      <FigureSlot title="Shape B">
        <ShapeFigure cells={question.shapeB} box={4} fill="var(--space-brand-primary)" label="Shape B" />
      </FigureSlot>
    </div>
  );
}

function CombinationFigure({ question }: { question: GcCombinationQuestion }) {
  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-3">
      <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-[2]">
        <FigureSlot title="Piece 1">
          <ShapeFigure cells={question.pieces[0]} box={3} fill="var(--space-brand-primary)" label="Piece 1" maxWidth={96} />
        </FigureSlot>
        <span className="pt-5 text-xl font-bold text-[var(--space-text-muted)]" aria-hidden="true">+</span>
        <FigureSlot title="Piece 2">
          <ShapeFigure cells={question.pieces[1]} box={3} fill="var(--space-neutral-700)" label="Piece 2" maxWidth={96} />
        </FigureSlot>
      </div>
      <span className="pt-5 text-xl font-bold text-[var(--space-text-muted)]" aria-hidden="true">=?</span>
      <div className="w-[58%] sm:w-auto sm:flex-[2]">
        <FigureSlot title="Target">
          <ShapeFigure cells={question.target} box={5} fill="var(--space-neutral-200)" stroke="var(--space-neutral-500)" label="Target shape" maxWidth={150} />
        </FigureSlot>
      </div>
    </div>
  );
}

function QuestionFigure({ question }: { question: GcQuestion }) {
  if (question.kind === 'symmetry') return <SymmetryFigure question={question} />;
  if (question.kind === 'rotation') return <RotationFigure question={question} />;
  return <CombinationFigure question={question} />;
}

/* ========================================================================== *
 * Session
 * ========================================================================== */

type Phase =
  | { type: 'round'; task: number }
  | { type: 'memorize'; task: number; step: number }
  | { type: 'solve'; task: number; step: number }
  | { type: 'recall'; task: number }
  | { type: 'next'; task: number };

function ConfirmDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[color-mix(in_srgb,var(--space-neutral-950)_45%,transparent)] p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="gc-exit-title" data-testid="gc-confirm-exit">
      <div className="w-full max-w-md rounded-2xl bg-[var(--space-surface-card)] p-4 shadow-xl sm:p-5">
        <h2 id="gc-exit-title" className="text-base font-bold text-[var(--space-text-primary)]">Leave this session?</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">The clock keeps running while you decide. If you leave, this session is discarded and nothing is saved to your history.</p>
        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
            data-testid="gc-confirm-exit-cancel"
          >
            Stay in the session
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-bold ${tw.button.primary}`}
            data-testid="gc-confirm-exit-confirm"
          >
            Leave and discard
          </button>
        </div>
      </div>
    </div>
  );
}

interface SessionProps {
  session: GcSession;
  startedAt: number;
  /** Called once: when the last recall is confirmed, or with timedOut when the clock reaches 0:00. */
  onSubmit: (responses: GcResponses, timedOut: boolean) => void;
  onExit: () => void;
  onAnswer?: () => void;
}

export function GridChallengeSession({ session, startedAt, onSubmit, onExit, onAnswer }: SessionProps) {
  const deadline = startedAt + session.timeLimitSeconds * 1000;
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
  const [phase, setPhase] = useState<Phase>({ type: 'round', task: 0 });
  const [dotVisible, setDotVisible] = useState(false);
  const [picks, setPicks] = useState<GcCell[]>([]);
  const [unitsDone, setUnitsDone] = useState(0);
  const [confirmExit, setConfirmExit] = useState(false);
  const responsesRef = useRef<GcResponses>({ answers: {}, recalls: {} });
  const submittedRef = useRef(false);
  const totalUnits = session.totalDots + session.tasks.length;

  const submit = (timedOut: boolean) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setConfirmExit(false);
    onSubmit({ answers: { ...responsesRef.current.answers }, recalls: { ...responsesRef.current.recalls } }, timedOut);
  };
  const submitRef = useRef(submit);
  submitRef.current = submit;

  useEffect(() => {
    const tick = () => {
      const left = (deadline - Date.now()) / 1000;
      setRemaining(Math.max(0, Math.ceil(left)));
      if (left <= 0) submitRef.current(true);
    };
    tick();
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [deadline]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (submittedRef.current) return undefined;
      event.preventDefault();
      event.returnValue = GC_LEAVE_MESSAGE;
      return GC_LEAVE_MESSAGE;
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, []);

  useEffect(() => {
    if (phase.type === 'memorize') {
      setDotVisible(false);
      const show = window.setTimeout(() => setDotVisible(true), GC_BLANK_MS);
      const hide = window.setTimeout(() => {
        setDotVisible(false);
        setPhase({ type: 'solve', task: phase.task, step: phase.step });
      }, GC_BLANK_MS + GC_DOT_MS);
      return () => {
        window.clearTimeout(show);
        window.clearTimeout(hide);
      };
    }
    if (phase.type === 'next') {
      const go = window.setTimeout(() => setPhase({ type: 'memorize', task: phase.task, step: 0 }), GC_NEXT_TASK_MS);
      return () => window.clearTimeout(go);
    }
    return undefined;
  }, [phase]);

  const task = session.tasks[phase.task];
  const round = GC_ROUNDS[task.round];
  const stepCount = task.steps.length;

  const answer = (value: GcAnswer) => {
    if (phase.type !== 'solve' || submittedRef.current) return;
    responsesRef.current.answers[task.steps[phase.step].question.id] = value;
    setUnitsDone((done) => done + 1);
    onAnswer?.();
    if (phase.step + 1 < stepCount) {
      setPhase({ type: 'memorize', task: phase.task, step: phase.step + 1 });
    } else {
      setPicks([]);
      setPhase({ type: 'recall', task: phase.task });
    }
  };
  const answerRef = useRef(answer);
  answerRef.current = answer;

  useEffect(() => {
    if (phase.type !== 'solve') return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === 'y') answerRef.current('yes');
      if (key === 'n') answerRef.current('no');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  const togglePick = (cell: GcCell) => {
    setPicks((current) => {
      if (current.some((pick) => sameCell(pick, cell))) return current.filter((pick) => !sameCell(pick, cell));
      if (current.length >= stepCount) return current;
      return [...current, cell];
    });
  };

  const confirmRecall = () => {
    if (phase.type !== 'recall' || submittedRef.current || !picks.length) return;
    responsesRef.current.recalls[task.id] = picks.slice();
    setUnitsDone((done) => done + 1);
    onAnswer?.();
    const nextTask = phase.task + 1;
    if (nextTask >= session.tasks.length) {
      submit(false);
      return;
    }
    setPicks([]);
    setPhase(session.tasks[nextTask].round !== task.round ? { type: 'round', task: nextTask } : { type: 'next', task: nextTask });
  };

  const lowTime = remaining <= 60;
  const warnTime = remaining <= 120;
  const shownDots = phase.type === 'memorize' ? phase.step + 1 : phase.type === 'solve' ? phase.step + 1 : phase.type === 'recall' ? stepCount : 0;

  return (
    <div className="aptitude-mobile min-h-full w-full bg-[var(--space-surface-page)]" style={{ overflowX: 'clip' }} data-testid="gc-session">
      <div className="sticky top-0 z-30 border-b border-[var(--space-border-default)] bg-[color-mix(in_srgb,var(--space-surface-card)_96%,transparent)] shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[var(--space-text-primary)] sm:text-base" data-testid="gc-position">
              Round {task.round + 1} of {GC_ROUNDS.length} · Task {task.index + 1} of {session.tasks.length}
            </p>
            <p className="truncate text-[11px] text-[var(--space-text-muted)] sm:text-xs">Grid Challenge · {round.title}</p>
          </div>
          <div
            role="timer"
            aria-label={`Time remaining ${clock(remaining)}`}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-base font-bold tabular-nums sm:text-lg ${
              lowTime
                ? 'bg-[color-mix(in_srgb,var(--space-semantic-danger)_14%,transparent)] text-[var(--space-semantic-danger)]'
                : warnTime
                  ? 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_16%,transparent)] text-[var(--space-semantic-warning-700)]'
                  : 'bg-[var(--space-surface-muted)] text-[var(--space-text-primary)]'
            }`}
            data-testid="gc-timer"
          >
            <Clock className="h-4 w-4" />
            {clock(remaining)}
          </div>
        </div>
        <div
          className="h-1.5 w-full bg-[var(--space-surface-muted)]"
          role="progressbar"
          aria-label="Session progress"
          aria-valuemin={0}
          aria-valuemax={totalUnits}
          aria-valuenow={unitsDone}
          data-testid="gc-progress"
        >
          <div className="h-full bg-[var(--space-brand-primary)] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(unitsDone / totalUnits) * 100}%` }} />
        </div>
        <div className="mx-auto flex w-full max-w-3xl gap-1 px-3 py-1.5 sm:px-5" aria-hidden="true">
          {session.tasks.map((item) => (
            <span
              key={item.id}
              className={`h-1 flex-1 rounded-full ${
                item.index < task.index ? 'bg-[var(--space-brand-primary)]' : item.index === task.index ? 'bg-[color-mix(in_srgb,var(--space-brand-primary)_45%,transparent)]' : 'bg-[var(--space-neutral-200)]'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-3 p-3 sm:space-y-4 sm:p-5">
        {phase.type === 'round' ? (
          <section className={`${CARD} space-y-3`} data-testid="gc-round-intro" data-round={task.round + 1}>
            <span className={`${PILL} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>Round {task.round + 1} of {GC_ROUNDS.length}</span>
            <h2 className="text-lg font-bold text-[var(--space-text-primary)] sm:text-xl">{round.title}</h2>
            <p className="text-sm leading-6 text-[var(--space-text-secondary)]">
              <span className="font-semibold text-[var(--space-text-primary)]">{round.question}</span> {round.rule}
            </p>
            <ol className="space-y-1 text-sm leading-6 text-[var(--space-text-secondary)]">
              <li>1. A red dot flashes on the grid for about a second — remember where it was.</li>
              <li>2. Answer one Yes/No question.</li>
              <li>3. Repeat until {round.dots[0] === round.dots[round.dots.length - 1] ? round.dots[0] : `${round.dots[0]}–${round.dots[round.dots.length - 1]}`} dots have been shown, then tap them all back in the order they appeared.</li>
            </ol>
            <p className="text-xs text-[var(--space-text-muted)]">Three tasks in this round. The clock keeps running between rounds.</p>
            <button
              type="button"
              onClick={() => setPhase({ type: 'memorize', task: phase.task, step: 0 })}
              className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold sm:w-auto ${tw.button.primary}`}
              data-testid="gc-start-round"
            >
              <Play className="h-4 w-4" />
              Start round {task.round + 1}
            </button>
          </section>
        ) : null}

        {phase.type === 'next' ? (
          <section className={`${CARD} flex min-h-[300px] flex-col items-center justify-center gap-2 text-center`} data-testid="gc-next-task" aria-live="polite">
            <span className={`${PILL} bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]`}>Next task</span>
            <p className="text-xl font-bold text-[var(--space-text-primary)]">Task {task.index + 1} of {session.tasks.length}</p>
            <p className="text-sm text-[var(--space-text-secondary)]">{stepCount} dots to remember</p>
          </section>
        ) : null}

        {phase.type === 'memorize' ? (
          <section className={`${CARD} space-y-3`} data-testid="gc-memorize" data-dot-visible={dotVisible ? 'true' : 'false'}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-[var(--space-text-primary)]">Remember the position of the red dot</p>
              <span className={`${PILL} bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]`}>Dot {shownDots} of {stepCount}</span>
            </div>
            <MemoryField highlight={dotVisible ? task.steps[phase.step].dot : null} />
          </section>
        ) : null}

        {phase.type === 'solve' ? (
          <section key={`${phase.task}-${phase.step}`} className={`${CARD} space-y-4`} data-testid="gc-solve" data-question-type={task.kind}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-base font-bold text-[var(--space-text-primary)] sm:text-lg">{round.question}</p>
              <span className={`${PILL} bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]`}>Question {phase.step + 1} of {stepCount}</span>
            </div>
            <p className="text-xs leading-5 text-[var(--space-text-muted)]">{round.rule}</p>
            <div className="py-1">
              <QuestionFigure question={task.steps[phase.step].question} />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {(['yes', 'no'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => answer(value)}
                  className={`inline-flex min-h-14 items-center justify-center rounded-xl text-base font-bold transition ${
                    value === 'yes'
                      ? tw.button.primary
                      : 'border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]'
                  }`}
                  style={{ touchAction: 'manipulation' }}
                  data-testid={`gc-answer-${value}`}
                >
                  {value === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
            <p className="hidden text-center text-[11px] text-[var(--space-text-muted)] sm:block">Keyboard: Y for Yes, N for No</p>
          </section>
        ) : null}

        {phase.type === 'recall' ? (
          <section className={`${CARD} space-y-3`} data-testid="gc-recall">
            <div className="space-y-1">
              <p className="text-base font-bold text-[var(--space-text-primary)]">Tap the {stepCount} dots in the order they appeared</p>
              <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
                Tap a selected dot again to remove it. Order matters: a dot only counts if it is in the right place and the right position in the sequence.
              </p>
            </div>
            <MemoryField picks={picks} onTap={togglePick} locked={picks.length >= stepCount} />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className={`${PILL} ${picks.length === stepCount ? 'bg-[var(--space-semantic-success-100)] text-[var(--space-semantic-success-700)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-secondary)]'}`} data-testid="gc-pick-count">
                {picks.length} of {stepCount} selected
              </span>
              <button
                type="button"
                onClick={() => setPicks((current) => current.slice(0, -1))}
                disabled={!picks.length}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40"
                data-testid="gc-undo"
              >
                <Undo2 className="h-3.5 w-3.5" />
                Undo last
              </button>
              <button
                type="button"
                onClick={() => setPicks([])}
                disabled={!picks.length}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40"
                data-testid="gc-clear"
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
            {picks.length >= stepCount ? (
              <p className="text-center text-[11px] text-[var(--space-text-muted)]">All {stepCount} dots selected. Deselect one to change your answer.</p>
            ) : null}
            <button
              type="button"
              onClick={confirmRecall}
              disabled={!picks.length}
              className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45 ${tw.button.primary}`}
              data-testid="gc-confirm-recall"
            >
              <CheckCircle2 className="h-4 w-4" />
              {phase.task + 1 >= session.tasks.length ? 'Confirm and finish' : 'Confirm'}
              {picks.length && picks.length < stepCount ? ` (${stepCount - picks.length} missing)` : ''}
            </button>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setConfirmExit(true)}
          className="inline-flex min-h-11 items-center text-xs font-medium text-[var(--space-text-muted)] hover:underline"
          data-testid="gc-exit"
        >
          Exit and discard this session
        </button>
      </div>

      {confirmExit ? (
        <ConfirmDialog
          onCancel={() => setConfirmExit(false)}
          onConfirm={() => {
            submittedRef.current = true;
            setConfirmExit(false);
            onExit();
          }}
        />
      ) : null}
    </div>
  );
}

/* ========================================================================== *
 * Results
 * ========================================================================== */

export interface GcHistoryRow {
  id: number;
  percent: number | null;
  score: number;
  total: number;
  duration_seconds: number | null;
  timed_out: boolean | null;
  answers_json?: unknown;
  created_at: string;
}

function performanceLabel(percent: number): string {
  if (percent >= 85) return 'Excellent run';
  if (percent >= 70) return 'Strong run';
  if (percent >= 50) return 'Developing — keep practising';
  return 'Early days — practice will help';
}

function Metric({ label, value, footer, testId }: { label: string; value: ReactNode; footer: ReactNode; testId: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5" data-testid={testId}>
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</span>
      <span className="mt-0.5 block text-xl font-bold leading-7 text-[var(--space-text-primary)] sm:text-2xl">{value}</span>
      <span className="mt-1 block text-[11px] leading-4 text-[var(--space-text-secondary)]">{footer}</span>
    </div>
  );
}

interface ResultsProps {
  result: GcResult;
  timeLimitSeconds: number;
  history: GcHistoryRow[];
  saving: boolean;
  saveError: string;
  onRetake: () => void;
  onBack: () => void;
}

export function GridChallengeResults({ result, timeLimitSeconds, history, saving, saveError, onRetake, onBack }: ResultsProps) {
  return (
    <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]" data-testid="gc-results">
      <div className="mx-auto w-full max-w-3xl space-y-3 p-3 sm:space-y-4 sm:p-5">
        <section className="rounded-2xl border-2 border-[var(--space-brand-primary)] bg-[var(--space-surface-card)] p-4 text-center sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">Grid Challenge · Overall performance</p>
          <p className="mt-1 text-4xl font-bold text-[var(--space-text-primary)]" data-testid="gc-overall-percent">{result.percent}%</p>
          <p className="mt-1 text-sm font-semibold text-[var(--space-text-brand)]">{performanceLabel(result.percent)}</p>
          <p className="mt-1 text-xs text-[var(--space-text-secondary)]">
            {result.score} of {result.total} points: {result.memoryTotal} dots to remember and {result.reasoningTotal} Yes/No questions.
            {result.timedOut ? ' Auto-submitted when the time ran out; anything not reached counts as wrong.' : ''}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-left lg:grid-cols-4">
            <Metric
              label="Memory accuracy"
              testId="gc-metric-memory"
              value={`${result.memoryPercent}%`}
              footer={`${result.memoryCorrect} of ${result.memoryTotal} dots in the right place and order`}
            />
            <Metric
              label="Visual reasoning"
              testId="gc-metric-reasoning"
              value={`${result.reasoningPercent}%`}
              footer={`${result.reasoningCorrect} of ${result.reasoningTotal} correct · ${result.reasoningAnswered} answered`}
            />
            <Metric
              label="Tasks completed"
              testId="gc-metric-tasks"
              value={`${result.tasksCompleted}/${result.tasksTotal}`}
              footer={result.tasksCompleted === result.tasksTotal ? 'Every task finished' : 'Tasks with a confirmed recall'}
            />
            <Metric
              label="Time spent"
              testId="gc-metric-time"
              value={clock(result.durationSeconds)}
              footer={`of ${clock(timeLimitSeconds)}${result.timedOut ? ' · time ran out' : ''}`}
            />
          </div>
          <p className="mt-3 text-[11px] leading-4 text-[var(--space-text-muted)]">Practice score from Casemate’s own rules — not an official employer or test-provider score.</p>
          {saving ? (
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--space-text-muted)]">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving to your history…
            </p>
          ) : saveError ? (
            <p className="mt-2 text-xs text-[var(--space-semantic-danger)]" data-testid="gc-save-error">{saveError}</p>
          ) : (
            <p className="mt-2 text-xs text-[var(--space-text-muted)]" data-testid="gc-saved">Saved to your Aptitude Test history.</p>
          )}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button type="button" onClick={onRetake} className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`} data-testid="gc-retake">
              <RotateCcw className="h-4 w-4" />
              New Grid Challenge
            </button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2.5 text-sm font-medium text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"
              data-testid="gc-back"
            >
              <ChevronLeft className="h-4 w-4" />
              All test types
            </button>
          </div>
        </section>

        {history.length ? (
          <section className={CARD} aria-labelledby="gc-history" data-testid="gc-history">
            <h2 id="gc-history" className="flex items-center gap-2 text-sm font-bold text-[var(--space-text-primary)]">
              <Grid3x3 className="h-4 w-4 text-[var(--space-text-brand)]" />
              Your Grid Challenge sessions
            </h2>
            <ul className="mt-2 divide-y divide-[var(--space-border-default)]">
              {history.slice(0, 8).map((row) => {
                const summary = summarizeGridAttempt(row.answers_json);
                const percent = row.percent ?? Math.round((row.score / Math.max(1, row.total)) * 100);
                return (
                  <li key={row.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-xs">
                    <span className="font-bold text-[var(--space-text-brand)]">{percent}%</span>
                    <span className="text-[var(--space-text-secondary)]">
                      {summary.memoryPercent !== null ? `Memory ${summary.memoryPercent}%` : ''}
                      {summary.reasoningPercent !== null ? ` · Reasoning ${summary.reasoningPercent}%` : ''}
                      {summary.tasksCompleted !== null ? ` · ${summary.tasksCompleted}/9 tasks` : ''}
                      {row.duration_seconds != null ? ` · ${clock(row.duration_seconds)}` : ''}
                      {row.timed_out ? ' · time ran out' : ''}
                    </span>
                    <span className="ml-auto text-[var(--space-text-muted)]">{new Date(row.created_at).toLocaleDateString('en-GB')}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
