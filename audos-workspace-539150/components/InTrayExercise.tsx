import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { CheckCircle2, ChevronLeft, Clock, HelpCircle, Play, Trophy } from 'lucide-react';
import type { TrayExercise, TrayItem, TrayPageRef } from '../lib/inTrayExercises';
import { FigureRotateBar } from './RotateFigureButton';

export interface TraySaveInput {
  exerciseId: string;
  exerciseName: string;
  score: number;
  total: number;
  durationSeconds: number;
  timedOut: boolean;
  detail: unknown;
}

type FigureSource = { url: string; page: number; box: [number, number, number, number] };
type FigureComponent = ComponentType<{
  source: FigureSource;
  maxWidth?: number;
  rotation?: number;
  onReadyChange?: (ready: boolean) => void;
}>;

interface Props {
  exercises: TrayExercise[];
  Figure: FigureComponent;
  /** Exercise opened straight away; the picker lives in the Aptitude Test library. */
  initialExerciseId?: string;
  onBack: () => void;
  onSave: (input: TraySaveInput) => Promise<void>;
  primaryClass: string;
  ghostClass: string;
}

interface Response {
  text?: string;
  pr?: string;
  most?: number;
  least?: number;
}

type Phase = 'list' | 'intro' | 'work' | 'mark' | 'done';

const PRIORITIES = ['High', 'Medium', 'Low'];
const CARD = 'rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)]';

function toSource(url: string, ref: TrayPageRef): FigureSource {
  return { url, page: ref[0], box: [ref[1], ref[2], ref[3], ref[4]] };
}

function clock(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return `${h > 0 ? `${h}:${String(m).padStart(2, '0')}` : String(m)}:${String(s).padStart(2, '0')}`;
}

function priorityMatches(item: TrayItem, chosen?: string): boolean {
  return Boolean(chosen && item.pr && item.pr.split('/').includes(chosen));
}

function itemMax(exercise: TrayExercise, item: TrayItem): number {
  if (exercise.kind === 'e_tray_choice') return 2;
  if (exercise.kind === 'e_tray') return (item.pos || []).length;
  if (item.crit) return item.crit.reduce((sum, c) => sum + c[1], 0);
  return (item.a || []).length + 1;
}

function itemEarned(exercise: TrayExercise, item: TrayItem, resp: Response, ticks: Record<string, boolean>): number {
  const key = (kind: string, i: number) => `${item.n}:${kind}:${i}`;
  if (exercise.kind === 'e_tray_choice') {
    const opts = item.opts || [];
    const most = resp.most != null ? opts[resp.most] : undefined;
    const least = resp.least != null ? opts[resp.least] : undefined;
    return (most && most.rk === 1 ? 1 : 0) + (least && least.rk === 4 ? 1 : 0);
  }
  if (exercise.kind === 'e_tray') {
    const pos = (item.pos || []).filter((_, i) => ticks[key('p', i)]).length;
    const neg = (item.neg || []).filter((_, i) => ticks[key('n', i)]).length;
    return Math.max(0, pos - neg);
  }
  if (item.crit) {
    return item.crit.reduce((sum, c, i) => sum + (ticks[key('c', i)] ? c[1] : 0), 0);
  }
  const actions = (item.a || []).filter((_, i) => ticks[key('a', i)]).length;
  return actions + (priorityMatches(item, resp.pr) ? 1 : 0);
}

/**
 * One booklet page. The Rotate button sits in a toolbar above the frame, outside
 * the sideways scroller, so it is always visible on a phone and never covers the
 * picture. Each page keeps its own turn, reset whenever the page changes.
 */
function TrayPage({ Figure, source, label }: { Figure: FigureComponent; source: FigureSource; label: string }) {
  const [rotation, setRotation] = useState(0);
  const sourceKey = `${source.url}|${source.page}|${source.box.join(',')}`;
  useEffect(() => {
    setRotation(0);
  }, [sourceKey]);
  const sideways = rotation === 90 || rotation === 270;
  return (
    <div>
      <FigureRotateBar rotation={rotation} onRotate={() => setRotation((turn) => (turn + 90) % 360)} />
      <div className="rounded-xl border border-[var(--space-border-default)] bg-white">
        <div className="overflow-x-auto rounded-xl">
          <div className={sideways ? '' : 'min-w-[640px]'}>
            <Figure source={source} maxWidth={820} rotation={rotation} />
          </div>
        </div>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

function Paragraphs({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className || ''}`}>
      {items.map((text, i) => (
        <p key={i} className="text-xs leading-5 text-[var(--space-text-secondary)]">{text}</p>
      ))}
    </div>
  );
}

export default function InTrayFamily({ exercises, Figure, initialExerciseId, onBack, onSave, primaryClass, ghostClass }: Props) {
  const [phase, setPhase] = useState<Phase>('list');
  const [active, setActive] = useState<TrayExercise | null>(null);
  const [tab, setTab] = useState<string>('brief');
  const [resp, setResp] = useState<Record<number, Response>>({});
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const [remaining, setRemaining] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const startedRef = useRef<number>(0);
  const deadlineRef = useRef<number>(0);
  const durationRef = useRef<number>(0);

  const storageKey = active ? `casemate-tray-${active.id}` : '';

  const goMark = useCallback((byTimer: boolean) => {
    durationRef.current = Math.round((Date.now() - startedRef.current) / 1000);
    setTimedOut(byTimer);
    setTicks({});
    setPhase('mark');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (phase !== 'work') return undefined;
    const tick = () => {
      const left = Math.ceil((deadlineRef.current - Date.now()) / 1000);
      setRemaining(Math.max(0, left));
      if (left <= 0) goMark(true);
    };
    tick();
    const timer = window.setInterval(tick, 500);
    return () => window.clearInterval(timer);
  }, [phase, goMark]);

  useEffect(() => {
    if (!storageKey || phase !== 'work') return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(resp));
    } catch (error) {
      /* storage unavailable: answers stay in memory only */
    }
  }, [resp, storageKey, phase]);

  const openExercise = (exercise: TrayExercise) => {
    setActive(exercise);
    setPhase('intro');
    setSaveError('');
    try {
      const saved = localStorage.getItem(`casemate-tray-${exercise.id}`);
      setResp(saved ? (JSON.parse(saved) as Record<number, Response>) : {});
    } catch (error) {
      setResp({});
    }
  };

  useEffect(() => {
    const initial = exercises.find((exercise) => exercise.id === initialExerciseId);
    if (initial) openExercise(initial);
    else onBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    if (!active) return;
    startedRef.current = Date.now();
    deadlineRef.current = Date.now() + active.minutes * 60 * 1000;
    setRemaining(active.minutes * 60);
    setTab('brief');
    setPhase('work');
  };

  const update = (n: number, patch: Partial<Response>) =>
    setResp((prev) => ({ ...prev, [n]: { ...prev[n], ...patch } }));

  const totals = useMemo(() => {
    if (!active) return { score: 0, total: 0, perItem: [] as Array<{ n: number; earned: number; max: number }> };
    const perItem = active.items.map((item) => ({
      n: item.n,
      earned: itemEarned(active, item, resp[item.n] || {}, ticks),
      max: itemMax(active, item),
    }));
    let score = perItem.reduce((sum, p) => sum + p.earned, 0);
    let total = perItem.reduce((sum, p) => sum + p.max, 0);
    if (active.overall) {
      const pos = active.overall.pos.filter((_, i) => ticks[`o:p:${i}`]).length;
      const neg = active.overall.neg.filter((_, i) => ticks[`o:n:${i}`]).length;
      score += Math.max(0, pos - neg);
      total += active.overall.pos.length;
    }
    return { score, total, perItem };
  }, [active, resp, ticks]);

  const finish = async () => {
    if (!active) return;
    setSaving(true);
    setSaveError('');
    try {
      await onSave({
        exerciseId: active.id,
        exerciseName: active.title,
        score: totals.score,
        total: totals.total,
        durationSeconds: durationRef.current,
        timedOut,
        detail: active.items.map((item) => ({
          item: item.n,
          title: item.t,
          earned: totals.perItem.find((p) => p.n === item.n)?.earned ?? 0,
          max: itemMax(active, item),
          priority: resp[item.n]?.pr || null,
          answered: Boolean((resp[item.n]?.text || '').trim()) || resp[item.n]?.most != null,
        })),
      });
      try {
        localStorage.removeItem(`casemate-tray-${active.id}`);
      } catch (error) {
        /* ignore */
      }
      setPhase('done');
    } catch (error) {
      setSaveError('Your result is shown below, but it could not be saved to your history. Try again in a few minutes.');
      setPhase('done');
    } finally {
      setSaving(false);
    }
  };

  const shell = (children: ReactNode) => (
    <div className="aptitude-mobile min-h-full w-full overflow-x-hidden bg-[var(--space-surface-page)]">
      <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:space-y-4 sm:p-5 lg:p-6">{children}</div>
    </div>
  );

  const pages = (refs: TrayPageRef[], label: string) =>
    active ? (
      <div className="space-y-3">
        {refs.map((ref, i) => (
          <TrayPage key={`${tab}-${ref[0]}-${i}`} Figure={Figure} source={toSource(active.url, ref)} label={label} />
        ))}
        <p className="text-[11px] text-[var(--space-text-muted)]">Pictures come from the original booklet PDF, so an internet connection is needed. On a phone, scroll sideways to read, or use the rotate icon button above a picture to turn it.</p>
      </div>
    ) : null;

  /* ---------------------------------------------------------------- list */
  if (phase === 'list' || !active) {
    return null;
  }

  const isChoice = active.kind === 'e_tray_choice';
  const unanswered = active.items.filter((item) => {
    const r = resp[item.n] || {};
    return isChoice ? r.most == null || r.least == null : !(r.text || '').trim();
  }).length;

  /* --------------------------------------------------------------- intro */
  if (phase === 'intro') {
    const how =
      active.kind === 'in_tray'
        ? 'Read every item, then for each one give a priority (High, Medium or Low) where asked and write the actions you would take and who should be involved. Spend the first 5 to 10 minutes reading everything, and look for links between items.'
        : active.kind === 'e_tray'
          ? 'Read the background and each e-mail (use the reference documents), then write the reply you would send. You will not get answers back, so use the information you are given. Be polite, specific and decisive.'
          : 'Read each e-mail and its attachments, then choose the MOST effective and the LEAST effective of the four possible replies.';
    return shell(
      <>
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--space-text-brand)] hover:underline">
          <ChevronLeft className="h-4 w-4" /> All tests
        </button>
        <div className={`${CARD} space-y-3 p-4`}>
          <h1 className="text-lg font-bold text-[var(--space-text-primary)]">{active.title}</h1>
          <p className="text-sm leading-6 text-[var(--space-text-secondary)]">You are {active.role}.</p>
          <p className="text-sm leading-6 text-[var(--space-text-secondary)]">{how}</p>
          <ul className="list-disc space-y-1 pl-5 text-xs leading-5 text-[var(--space-text-secondary)]">
            <li>{active.items.length} {active.kind === 'in_tray' ? 'items' : 'e-mails'} to deal with in {active.minutes} minutes. The clock submits for marking at zero.</li>
            <li>Your answers are kept on this device while you work, so a refresh will not lose them.</li>
            <li>
              {isChoice
                ? 'Scoring: 1 point for the correct most effective reply and 1 point for the correct least effective reply, in each e-mail.'
                : 'After you finish you see the official model answer and tick what your answer covered. That self-marking gives your score.'}
            </li>
          </ul>
          <button type="button" onClick={start} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm ${primaryClass}`} data-testid="button-begin-tray">
            <Play className="h-4 w-4" /> Begin exercise
          </button>
        </div>
      </>,
    );
  }

  /* ---------------------------------------------------------------- work */
  if (phase === 'work') {
    const itemNo = tab.startsWith('i') ? Number(tab.slice(1)) : null;
    const item = itemNo != null ? active.items.find((it) => it.n === itemNo) : undefined;
    const r = item ? resp[item.n] || {} : {};
    const doc = tab.startsWith('d') ? active.docs?.find((d) => d.n === Number(tab.slice(1))) : undefined;
    const tabBtn = (id: string, label: string, done?: boolean) => (
      <button
        key={id}
        type="button"
        onClick={() => setTab(id)}
        className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${tab === id ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)]'}`}
      >
        {label}
        {done ? ' \u2713' : ''}
      </button>
    );
    return shell(
      <>
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 shadow-sm">
          <p className="min-w-0 truncate text-sm font-bold text-[var(--space-text-primary)]">{active.title}</p>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1 font-mono text-base font-bold tabular-nums ${remaining <= 300 ? 'text-[var(--space-semantic-danger)]' : 'text-[var(--space-text-primary)]'}`}>
              <Clock className="h-4 w-4" /> {clock(remaining)}
            </span>
            <button type="button" onClick={() => goMark(false)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${primaryClass}`} data-testid="button-finish-tray">
              Finish and mark
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tabBtn('brief', 'Briefing')}
          {active.items.map((it) => {
            const rr = resp[it.n] || {};
            const done = isChoice ? rr.most != null && rr.least != null : Boolean((rr.text || '').trim());
            return tabBtn(`i${it.n}`, `${active.kind === 'in_tray' ? 'Item' : 'E-mail'} ${it.n}`, done);
          })}
          {(active.docs || []).map((d) => tabBtn(`d${d.n}`, `Doc ${d.n}`))}
        </div>

        {tab === 'brief' ? (
          <div className="space-y-3">
            <p className="text-xs text-[var(--space-text-secondary)]">Read the instructions, the background and the list of documents before you start. {unanswered} of {active.items.length} still need an answer.</p>
            {pages(active.brief, 'Briefing')}
          </div>
        ) : null}

        {doc ? (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-[var(--space-text-primary)]">Reference document {doc.n}: {doc.t}</h2>
            {pages(doc.pg, doc.t)}
          </div>
        ) : null}

        {item ? (
          <div className="grid gap-3 lg:grid-cols-5">
            <div className="space-y-2 lg:col-span-3">
              <h2 className="text-sm font-bold text-[var(--space-text-primary)]">{item.t}</h2>
              {pages(item.pg, item.t)}
            </div>
            <div className={`${CARD} space-y-3 self-start p-3 lg:sticky lg:top-16 lg:col-span-2`}>
              {isChoice ? (
                <>
                  <p className="text-xs font-semibold text-[var(--space-text-primary)]">Competency: {item.comp}</p>
                  <p className="text-xs text-[var(--space-text-muted)]">Choose one MOST effective and one LEAST effective response.</p>
                  {(item.opts || []).map((opt, oi) => (
                    <div key={oi} className="rounded-xl border border-[var(--space-border-default)] p-2.5">
                      <p className="text-xs leading-5 text-[var(--space-text-primary)]">{opt.t}</p>
                      <div className="mt-2 grid grid-cols-2 gap-1.5">
                        <button type="button" onClick={() => update(item.n, { most: oi, least: r.least === oi ? undefined : r.least })} className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold ${r.most === oi ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)]'}`}>Most effective</button>
                        <button type="button" onClick={() => update(item.n, { least: oi, most: r.most === oi ? undefined : r.most })} className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold ${r.least === oi ? 'border-[var(--space-semantic-danger)] bg-[var(--space-semantic-danger)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)]'}`}>Least effective</button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {item.pr ? (
                    <div>
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">Priority</p>
                      <div className="mt-1 grid grid-cols-3 gap-1.5">
                        {PRIORITIES.map((p) => (
                          <button key={p} type="button" onClick={() => update(item.n, { pr: p })} className={`rounded-lg border px-2 py-1.5 text-xs font-semibold ${r.pr === p ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)]'}`}>{p}</button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <label className="text-xs font-semibold text-[var(--space-text-primary)]" htmlFor={`tray-text-${item.n}`}>
                      {active.kind === 'in_tray' ? 'Actions, and who should be involved' : 'Your reply'}
                    </label>
                    <textarea
                      id={`tray-text-${item.n}`}
                      value={r.text || ''}
                      onChange={(event) => update(item.n, { text: event.target.value })}
                      rows={active.kind === 'in_tray' ? 9 : 12}
                      placeholder={active.kind === 'in_tray' ? 'Short bullet points: what you will do, who you will ask or tell, by when.' : 'Write the e-mail you would send in reply.'}
                      className="mt-1 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page)] p-2.5 text-sm leading-6 text-[var(--space-text-primary)]"
                    />
                  </div>
                </>
              )}
              <div className="flex gap-2">
                {item.n > 1 ? <button type="button" onClick={() => setTab(`i${item.n - 1}`)} className={`flex-1 rounded-lg px-3 py-2 text-xs ${ghostClass}`}>Previous</button> : null}
                {item.n < active.items.length ? <button type="button" onClick={() => setTab(`i${item.n + 1}`)} className={`flex-1 rounded-lg px-3 py-2 text-xs ${primaryClass}`}>Next</button> : null}
              </div>
            </div>
          </div>
        ) : null}
      </>,
    );
  }

  /* ---------------------------------------------------------------- mark */
  if (phase === 'mark') {
    const tickBox = (key: string, label: string, tone: 'pos' | 'neg') => (
      <label key={key} className="flex cursor-pointer items-start gap-2 rounded-lg px-1.5 py-1 hover:bg-[var(--space-surface-muted)]">
        <input type="checkbox" checked={Boolean(ticks[key])} onChange={(event) => setTicks((prev) => ({ ...prev, [key]: event.target.checked }))} className="mt-1 h-4 w-4 flex-shrink-0" />
        <span className={`text-xs leading-5 ${tone === 'neg' ? 'text-[var(--space-semantic-danger)]' : 'text-[var(--space-text-secondary)]'}`}>{label}</span>
      </label>
    );
    return shell(
      <>
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 shadow-sm">
          <div>
            <p className="text-sm font-bold text-[var(--space-text-primary)]">Mark your answers</p>
            <p className="text-[11px] text-[var(--space-text-muted)]">{timedOut ? 'Time is up. ' : ''}{isChoice ? 'Scored automatically.' : 'Tick what your answer covered.'}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[var(--space-text-primary)]">{totals.score}/{totals.total}</span>
            <button type="button" onClick={() => void finish()} disabled={saving} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${primaryClass}`} data-testid="button-save-tray">
              {saving ? 'Saving...' : 'Save my result'}
            </button>
          </div>
        </div>
        {active.comps ? <p className="text-xs text-[var(--space-text-secondary)]">Competencies assessed: {active.comps.join(', ')}.</p> : null}
        {active.items.map((item) => {
          const r = resp[item.n] || {};
          const pt = totals.perItem.find((p) => p.n === item.n);
          return (
            <div key={item.n} className={`${CARD} space-y-3 p-3 sm:p-4`}>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-sm font-bold text-[var(--space-text-primary)]">{active.kind === 'in_tray' ? 'Item' : 'E-mail'} {item.n}: {item.t}</h2>
                <span className="flex-shrink-0 rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">{pt?.earned ?? 0}/{pt?.max ?? 0}</span>
              </div>
              {isChoice ? (
                <div className="space-y-2">
                  {(item.opts || []).map((opt, oi) => {
                    const label = opt.rk === 1 ? 'Most effective' : opt.rk === 2 ? 'Second most effective' : opt.rk === 3 ? 'Not appropriate' : 'Least effective';
                    const mine = r.most === oi ? 'Your most effective' : r.least === oi ? 'Your least effective' : '';
                    return (
                      <div key={oi} className={`rounded-xl border p-2.5 ${opt.rk === 1 ? 'border-[var(--space-semantic-success)]' : opt.rk === 4 ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]'}`}>
                        <p className="text-xs leading-5 text-[var(--space-text-primary)]">{opt.t}</p>
                        <p className="mt-1 text-[11px] font-semibold text-[var(--space-text-brand)]">{label}{mine ? ` \u00b7 ${mine}` : ''}</p>
                        <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{opt.why}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="rounded-xl bg-[var(--space-surface-muted)] p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Your answer{r.pr ? ` \u00b7 priority ${r.pr}` : ''}</p>
                    <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-[var(--space-text-primary)]">{(r.text || '').trim() || 'No answer written.'}</p>
                  </div>
                  {item.pr ? (
                    <p className={`text-xs font-semibold ${priorityMatches(item, r.pr) ? 'text-[var(--space-semantic-success)]' : 'text-[var(--space-semantic-danger)]'}`}>
                      Model priority: {item.pr.replace('/', ' or ')}. {r.pr ? (priorityMatches(item, r.pr) ? 'Your priority matches (1 point).' : `You chose ${r.pr} (0 points).`) : 'You did not choose a priority (0 points).'}
                    </p>
                  ) : null}
                  {item.a && !item.crit ? (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Model actions: tick each one your answer covered (1 point each)</p>
                      {item.a.map((text, i) => tickBox(`${item.n}:a:${i}`, text, 'pos'))}
                    </div>
                  ) : null}
                  {item.crit ? (
                    <>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Model answer</p>
                        <Paragraphs items={item.a || []} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Scoring: tick what you did</p>
                        {item.crit.map((c, i) => tickBox(`${item.n}:c:${i}`, `${c[1]} point${c[1] === 1 ? '' : 's'} ${c[0]}${c[2] ? ' (bonus)' : ''}`, 'pos'))}
                        {(item.zero || []).map((z, i) => <p key={i} className="px-1.5 text-[11px] text-[var(--space-text-muted)]">0 points {z}</p>)}
                      </div>
                    </>
                  ) : null}
                  {active.kind === 'e_tray' ? (
                    <>
                      <p className="text-xs text-[var(--space-text-secondary)]">
                        <strong>Competency:</strong> {item.comp}. <strong>Urgency:</strong> {item.urg}. <strong>Importance:</strong> {item.imp}.
                      </p>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Positive indicators: tick each one your reply showed (+1 each)</p>
                        {(item.pos || []).map((text, i) => tickBox(`${item.n}:p:${i}`, text, 'pos'))}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-semantic-danger)]">Negative indicators: tick any your reply showed (-1 each)</p>
                        {(item.neg || []).map((text, i) => tickBox(`${item.n}:n:${i}`, text, 'neg'))}
                      </div>
                    </>
                  ) : null}
                  {item.note && item.note.length ? (
                    <details className="rounded-xl border border-[var(--space-border-default)] p-2.5">
                      <summary className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[var(--space-text-brand)]"><HelpCircle className="h-3.5 w-3.5" /> Assessor notes</summary>
                      <Paragraphs items={item.note} className="mt-2" />
                    </details>
                  ) : null}
                </>
              )}
              <details>
                <summary className="cursor-pointer text-xs font-semibold text-[var(--space-text-secondary)]">Show the original documents again</summary>
                <div className="mt-2">{pages(item.pg, item.t)}</div>
              </details>
            </div>
          );
        })}
        {active.overall ? (
          <div className={`${CARD} space-y-2 p-3 sm:p-4`}>
            <h2 className="text-sm font-bold text-[var(--space-text-primary)]">Whole exercise</h2>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-brand)]">Positive indicators (+1 each)</p>
            {active.overall.pos.map((text, i) => tickBox(`o:p:${i}`, text, 'pos'))}
            <p className="pt-1 text-[10px] font-bold uppercase tracking-wide text-[var(--space-semantic-danger)]">Negative indicators (-1 each)</p>
            {active.overall.neg.map((text, i) => tickBox(`o:n:${i}`, text, 'neg'))}
          </div>
        ) : null}
        <div className="flex justify-end">
          <button type="button" onClick={() => void finish()} disabled={saving} className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${primaryClass}`}>
            {saving ? 'Saving...' : 'Save my result'}
          </button>
        </div>
      </>,
    );
  }

  /* ---------------------------------------------------------------- done */
  const percent = Math.round((totals.score / Math.max(1, totals.total)) * 100);
  return shell(
    <>
      <div className={`${CARD} space-y-3 p-4 text-center`}>
        <Trophy className="mx-auto h-8 w-8 text-[var(--space-text-brand)]" />
        <h1 className="text-lg font-bold text-[var(--space-text-primary)]">{active.title}</h1>
        <p className="text-3xl font-bold text-[var(--space-text-primary)]">{totals.score}/{totals.total}</p>
        <p className="text-sm text-[var(--space-text-secondary)]">{percent}% of the available points{timedOut ? ' \u00b7 the clock ran out' : ''}{' \u00b7 '}{clock(durationRef.current)} used</p>
        {saveError ? <p className="text-xs text-[var(--space-semantic-danger)]">{saveError}</p> : <p className="flex items-center justify-center gap-1 text-xs text-[var(--space-semantic-success)]"><CheckCircle2 className="h-4 w-4" /> Result saved</p>}
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setPhase('mark')} className={`rounded-xl px-4 py-2 text-sm ${ghostClass}`}>Review my marking</button>
          <button type="button" onClick={onBack} className={`rounded-xl px-4 py-2 text-sm ${primaryClass}`}>Back to all tests</button>
        </div>
      </div>
      <div className={`${CARD} p-3`}>
        <p className="text-xs font-semibold text-[var(--space-text-primary)]">Points by item</p>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          {totals.perItem.map((p) => (
            <li key={p.n} className="flex items-center justify-between gap-2 text-xs text-[var(--space-text-secondary)]">
              <span className="truncate">{p.n}. {active.items.find((i) => i.n === p.n)?.t}</span>
              <span className="font-semibold">{p.earned}/{p.max}</span>
            </li>
          ))}
        </ul>
      </div>
    </>,
  );
}
