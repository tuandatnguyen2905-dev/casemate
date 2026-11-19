// Shared "question first" reading layout for Case Drill and Case Pool solve screens.
// Fixed reading path: The Question -> Context -> Evidence -> Answer area, with an optional,
// closed-by-default Vietnamese summary ("Tóm tắt đề bằng tiếng Việt") tied to the item id.
// Vietnamese summaries and term definitions live in lib/caseReadingVi.ts (verified per item);
// an item without a verified summary simply shows no toggle.
import { createContext, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import { ArrowUp, BookOpen, ChevronDown, Languages, X } from 'lucide-react';
import { viReadingFor, type ViReadingEntry, type ViTerm } from '../lib/caseReadingVi';
import { CONTEXT_ANCHOR_ID } from './CompareExhibits';

/* ------------------------------------------------------------------------- */
/* Glossary context: lets exhibit headings show the item's Vietnamese terms.  */
/* ------------------------------------------------------------------------- */

interface CaseReadingContextValue {
  itemId: string | null;
  terms: ViTerm[];
}

const CaseReadingContext = createContext<CaseReadingContextValue>({ itemId: null, terms: [] });

/** Scopes the Vietnamese summary and exhibit term definitions to one case / question id. */
export function CaseReadingProvider({ itemId, children }: { itemId?: string | null; children: ReactNode }) {
  const value = useMemo(() => ({ itemId: itemId || null, terms: viReadingFor(itemId)?.terms || [] }), [itemId]);
  return <CaseReadingContext.Provider value={value}>{children}</CaseReadingContext.Provider>;
}

/** The id set by the nearest CaseReadingProvider (e.g. the Case Pool case hosting an embedded workspace). */
export function useCaseReadingItemId(): string | null {
  return useContext(CaseReadingContext).itemId;
}

function normaliseTerm(value: string): string {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function findTerm(terms: ViTerm[], label: string): ViTerm | null {
  const text = normaliseTerm(label);
  if (!text) return null;
  return terms.find((term) => normaliseTerm(term.term) === text)
    || terms.find((term) => normaliseTerm(term.term).length >= 3 && text.includes(normaliseTerm(term.term)))
    || null;
}

/** Tap / keyboard definition button. Renders nothing when the label has no Vietnamese term. */
export function TermHint({ label, className = '' }: { label: string; className?: string }) {
  const { terms } = useContext(CaseReadingContext);
  const term = findTerm(terms, label);
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const toggle = () => {
    const rect = wrapRef.current?.getBoundingClientRect();
    setAlignRight(Boolean(rect && rect.left > window.innerWidth / 2));
    setOpen((value) => !value);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  if (!term) return null;
  return (
    <span ref={wrapRef} className={`relative inline-flex align-middle normal-case tracking-normal ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`Giải thích bằng tiếng Việt: ${term.term}`}
        onClick={(event) => { event.stopPropagation(); toggle(); }}
        onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
        className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-1 text-[10px] font-bold text-[var(--space-text-brand)] hover:border-[var(--space-brand-primary-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)]"
        data-testid="term-hint"
      >
        VI
      </button>
      {open ? (
        <span
          id={id}
          role="note"
          className={`absolute ${alignRight ? 'right-0' : 'left-0'} top-full z-40 mt-1 block w-56 max-w-[70vw] rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2.5 text-left text-xs font-normal leading-5 text-[var(--space-text-primary)] shadow-lg`}
        >
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{term.term}</span>
          <span lang="vi" className="mt-0.5 block">{term.vi}</span>
        </span>
      ) : null}
    </span>
  );
}

/* ------------------------------------------------------------------------- */
/* Context: the full brief stays visible; only explicit background collapses. */
/* ------------------------------------------------------------------------- */

const SHORT_BRIEF = 480;

export interface SplitContext {
  visible: string[];
  optional: string[];
  asList: boolean;
}

function sentencesOf(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function unitsOf(text: string): string[] {
  return text
    .split(/\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => (/^[-•*]\s+/.test(block) ? [block.replace(/^[-•*]\s+/, '')] : sentencesOf(block)));
}

/**
 * Briefs stay complete: a solver must never need to expand anything. Short briefs render as written;
 * long ones become a scannable list of their own sentences, unchanged and in order. Only text a caller
 * passes explicitly as optional background is collapsed under "Read full brief" — automatic collapsing
 * was rejected because constraints read like background (e.g. "staff can use shared phones").
 */
export function splitContext(raw: string | null | undefined, optionalBackground?: string | null): SplitContext {
  const text = String(raw || '').trim();
  const optional = unitsOf(String(optionalBackground || '').trim());
  if (!text) return { visible: [], optional, asList: false };
  if (text.length <= SHORT_BRIEF) return { visible: text.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean), optional, asList: false };
  return { visible: unitsOf(text), optional, asList: true };
}

/* ------------------------------------------------------------------------- */
/* Process snapshots: only for process cases whose brief states the current   */
/* process explicitly. Every step and issue below is taken from the brief.    */
/* ------------------------------------------------------------------------- */

interface ProcessSnapshot {
  title: string;
  steps: Array<{ actor: string; action: string }>;
  issues: string[];
}

const ROVA_CURRENT_PROCESS: ProcessSnapshot = {
  title: 'Current parcel handoff, as described in the brief',
  steps: [
    { actor: 'Building', action: 'Parcel arrives' },
    { actor: 'Apartment staff', action: 'Write parcel names in a notebook' },
    { actor: 'Resident', action: 'Comes to the desk to collect' },
  ],
  issues: ['Residents sometimes collect the wrong parcel', 'Residents make repeated trips to the desk'],
};

const PROCESS_SNAPSHOTS: Record<string, ProcessSnapshot> = {
  'CM-CRE-PD06': ROVA_CURRENT_PROCESS,
  'case-cm-cre-pd06': ROVA_CURRENT_PROCESS,
};

export function CaseProcessSnapshot({ itemId }: { itemId: string | null | undefined }) {
  const snapshot = itemId ? PROCESS_SNAPSHOTS[itemId] : null;
  if (!snapshot) return null;
  return (
    <figure className="mt-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5" data-testid="case-process-snapshot">
      <figcaption className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--space-text-muted)]">{snapshot.title}</figcaption>
      <ol className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-stretch">
        {snapshot.steps.map((step, index) => (
          <li key={step.action} className="flex min-w-0 flex-1 items-center gap-1.5">
            <span className="min-w-0 flex-1 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-1.5">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">{step.actor}</span>
              <span className="block text-xs font-semibold leading-5 text-[var(--space-text-primary)]">{step.action}</span>
            </span>
            {index < snapshot.steps.length - 1 ? <span aria-hidden="true" className="hidden text-[var(--space-text-muted)] sm:inline">→</span> : null}
          </li>
        ))}
      </ol>
      <ul className="mt-1.5 space-y-0.5">
        {snapshot.issues.map((issue) => (
          <li key={issue} className="text-xs leading-5 text-[var(--space-text-secondary)]">Issue noted: {issue}</li>
        ))}
      </ul>
    </figure>
  );
}

/* ------------------------------------------------------------------------- */
/* Layout helpers                                                             */
/* ------------------------------------------------------------------------- */

function useElementWidth<T extends HTMLElement>(): [RefObject<T>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    setWidth(node.getBoundingClientRect().width);
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => setWidth(entries[0]?.contentRect.width || 0));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

const SIDE_PANEL_MIN_WIDTH = 860;
/** Question and context share one row from this card width, so the evidence starts higher on laptops. */
const SPLIT_MIN_WIDTH = 900;
const label = 'text-[10px] font-bold uppercase tracking-[0.14em]';

export function ViSummaryPanel({ entry, activeTaskId, onClose, className = '' }: { entry: ViReadingEntry; activeTaskId?: string | null; onClose: () => void; className?: string }) {
  const taskSummary = activeTaskId && entry.tasks ? entry.tasks[activeTaskId] : '';
  return (
    <aside
      lang="vi"
      aria-label="Tóm tắt đề bằng tiếng Việt"
      className={`rounded-xl border border-[color-mix(in_srgb,var(--space-brand-primary-500)_35%,transparent)] bg-[var(--space-surface-accent-soft)] p-3 ${className}`}
      data-testid="vi-summary-panel"
    >
      <div className="flex items-start justify-between gap-2">
        <p className={`${label} text-[var(--space-text-brand)]`}>Tóm tắt đề bằng tiếng Việt</p>
        <button type="button" onClick={onClose} aria-label="Đóng tóm tắt tiếng Việt" className="-mr-1 -mt-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--space-text-muted)] hover:text-[var(--space-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)]">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-1 text-[13px] leading-6 text-[var(--space-text-primary)]">{entry.summary}</p>
      {taskSummary ? (
        <div className="mt-2 border-t border-[var(--space-border-default)] pt-2">
          <p className={`${label} text-[var(--space-text-muted)]`}>Nhiệm vụ đang làm</p>
          <p className="mt-0.5 text-[13px] leading-6 text-[var(--space-text-primary)]">{taskSummary}</p>
        </div>
      ) : null}
      {entry.terms?.length ? (
        <div className="mt-2 border-t border-[var(--space-border-default)] pt-2">
          <p className={`${label} text-[var(--space-text-muted)]`}>Thuật ngữ</p>
          <dl className="mt-1 space-y-1">
            {entry.terms.map((term) => (
              <div key={term.term} className="text-xs leading-5">
                <dt className="inline font-semibold text-[var(--space-text-primary)]" lang="en">{term.term}: </dt>
                <dd className="inline text-[var(--space-text-secondary)]">{term.vi}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      <p className="mt-2 text-[10px] leading-4 text-[var(--space-text-muted)]">Bản tóm tắt chỉ giúp hiểu đề. Đề tiếng Anh là bản chính thức.</p>
    </aside>
  );
}

export function ViSummaryToggle({ open, onToggle, controls }: { open: boolean; onToggle: () => void; controls: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)] ${
        open
          ? 'border-[var(--space-brand-primary-500)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
          : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)] hover:text-[var(--space-text-brand)]'
      }`}
      data-testid="vi-summary-toggle"
    >
      <Languages className="h-3.5 w-3.5" aria-hidden="true" />
      <span lang="vi">Tóm tắt đề bằng tiếng Việt</span>
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
    </button>
  );
}

/* ------------------------------------------------------------------------- */
/* The Question -> Context block                                              */
/* ------------------------------------------------------------------------- */

export interface CaseTaskStep {
  id: string;
  label: string;
  prompt: string;
}

export interface CaseQuestionFirstProps {
  /** Case / question id the Vietnamese summary is stored under. */
  itemId: string | null | undefined;
  /** Full original English task, all required parts. */
  question: ReactNode;
  /** Optional extra required-output line(s) shown under the question (e.g. "Show the forecast..."). */
  questionNote?: ReactNode;
  /** Client objective, kept directly under the question. */
  clientObjective?: ReactNode;
  /** Case title row; when given, the Vietnamese toggle sits at its right so the question block stays compact. */
  heading?: ReactNode;
  /** 'split' places the context beside the question on wide cards; 'stacked' (default) keeps it below. */
  layout?: 'stacked' | 'split';
  /** Overall objective for multi-task cases. */
  objective?: string | null;
  /** Ordered tasks for multi-task cases; activeTaskId marks the current one. */
  tasks?: CaseTaskStep[];
  activeTaskId?: string | null;
  /** Original brief text; split into visible key facts and optional background. */
  context?: string | null;
  /** Extra always-visible context (supplied facts, definitions, constraints). */
  contextExtra?: ReactNode;
  /** Explicitly supplementary background, collapsed under "Read full brief". Never put facts needed to solve here. */
  optionalBackground?: string | null;
  className?: string;
  compact?: boolean;
  /** Render without its own card border/padding (when placed inside an existing card). */
  bare?: boolean;
  testId?: string;
}

export function CaseQuestionFirst({
  itemId,
  question,
  questionNote,
  clientObjective,
  heading,
  layout = 'stacked',
  objective,
  tasks,
  activeTaskId,
  context,
  contextExtra,
  optionalBackground,
  className = '',
  compact = false,
  bare = false,
  testId = 'case-question-first',
}: CaseQuestionFirstProps) {
  const entry = viReadingFor(itemId);
  const [viOpen, setViOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [rootRef, width] = useElementWidth<HTMLElement>();
  const panelId = useId();
  const split = useMemo(() => splitContext(context, optionalBackground), [context, optionalBackground]);
  const hasContext = split.visible.length > 0 || Boolean(contextExtra);
  const splitActive = layout === 'split' && hasContext && width >= SPLIT_MIN_WIDTH;
  const sidePanel = viOpen && !splitActive && width >= SIDE_PANEL_MIN_WIDTH;
  const pad = compact ? 'p-3' : 'p-3 sm:p-4';

  useEffect(() => { setViOpen(false); setBriefOpen(false); }, [itemId]);

  const panel = entry && viOpen ? (
    <div id={panelId} className={sidePanel ? 'min-w-0' : 'mt-2'}>
      <ViSummaryPanel entry={entry} activeTaskId={activeTaskId} onClose={() => setViOpen(false)} className={sidePanel ? 'sticky top-2' : ''} />
    </div>
  ) : <span id={panelId} hidden />;

  const contextBlock = hasContext ? (
    <div id={CONTEXT_ANCHOR_ID} className={`scroll-mt-3 ${splitActive ? 'border-l border-[var(--space-border-default)] pl-4' : 'mt-3 border-t border-[var(--space-border-default)] pt-2.5'}`} data-testid="case-context">
      <p className={`${label} text-[var(--space-text-muted)]`}>Context</p>
      {split.asList ? (
        <ul className="mt-1 space-y-1">
          {split.visible.map((line, index) => (
            <li key={index} className="flex gap-2 text-sm leading-6 text-[var(--space-text-primary)]">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--space-text-muted)]" aria-hidden="true" />
              <span className="min-w-0">{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        split.visible.map((line, index) => (
          <p key={index} className="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--space-text-primary)]">{line}</p>
        ))
      )}
      {contextExtra ? <div className="mt-2">{contextExtra}</div> : null}
      <CaseProcessSnapshot itemId={itemId} />
      {split.optional.length ? (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setBriefOpen((value) => !value)}
            aria-expanded={briefOpen}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md text-xs font-semibold text-[var(--space-text-brand)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)]"
            data-testid="read-full-brief"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {briefOpen ? 'Hide extra background' : 'Read full brief'}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${briefOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {briefOpen ? (
            <ul className="mt-1 space-y-1 border-l-2 border-[var(--space-border-default)] pl-3">
              {split.optional.map((line, index) => (
                <li key={index} className="text-sm leading-6 text-[var(--space-text-secondary)]">{line}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;

  return (
    <section
      ref={rootRef}
      id="case-question-anchor"
      className={`scroll-mt-3 ${bare ? '' : `rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] ${pad}`} ${className}`}
      data-testid={testId}
      data-item-id={itemId || undefined}
    >
      {heading ? (
        <div className="flex flex-wrap items-center justify-between gap-2" data-testid="case-question-heading">
          <div className="min-w-0 flex-1 basis-[18rem]">{heading}</div>
          {entry ? <ViSummaryToggle open={viOpen} onToggle={() => setViOpen((value) => !value)} controls={panelId} /> : null}
        </div>
      ) : null}
      <div className={`${heading ? 'mt-1 ' : ''}${splitActive ? 'grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start gap-4' : sidePanel ? 'grid grid-cols-[minmax(0,1fr)_minmax(260px,340px)] items-start gap-4' : ''}`}>
        <div className="min-w-0">
          {heading ? (
            <p className={`${label} text-[var(--space-text-brand)]`}>The Question</p>
          ) : (
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className={`${label} pt-1 text-[var(--space-text-brand)]`}>The Question</p>
              {entry ? <ViSummaryToggle open={viOpen} onToggle={() => setViOpen((value) => !value)} controls={panelId} /> : null}
            </div>
          )}

          {objective && tasks?.length ? (
            <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]"><span className="font-semibold text-[var(--space-text-primary)]">Overall objective: </span>{objective}</p>
          ) : null}

          {tasks?.length ? (
            <ol className="mt-2 space-y-1.5" data-testid="case-task-list">
              {tasks.map((task, index) => {
                const active = task.id === activeTaskId;
                return (
                  <li
                    key={task.id}
                    aria-current={active ? 'step' : undefined}
                    className={`rounded-lg border px-2.5 py-2 text-sm leading-6 ${active ? 'border-[var(--space-brand-primary-500)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-primary)]' : 'border-[var(--space-border-default)] text-[var(--space-text-secondary)]'}`}
                  >
                    <span className={`mr-1.5 text-[10px] font-bold uppercase tracking-wider ${active ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-muted)]'}`}>
                      Task {index + 1} · {task.label}{active ? ' · Active' : ''}
                    </span>
                    <span className="block">{task.prompt}</span>
                  </li>
                );
              })}
            </ol>
          ) : null}

          {question ? (
            <div className={`mt-1 whitespace-pre-line text-[15px] font-semibold leading-6 text-[var(--space-text-primary)] ${tasks?.length ? 'mt-2' : ''}`} data-testid="case-question-text">
              {question}
            </div>
          ) : null}
          {questionNote ? <div className="mt-1.5 text-sm leading-6 text-[var(--space-text-primary)]">{questionNote}</div> : null}
          {clientObjective ? (
            <p className="mt-2 text-sm leading-6 text-[var(--space-text-primary)]" data-testid="case-client-objective">
              <span className={`${label} mr-1.5 text-[var(--space-text-brand)]`}>Client objective</span>
              {clientObjective}
            </p>
          ) : null}

          {!sidePanel ? panel : null}

          {hasContext && !splitActive ? contextBlock : null}
        </div>
        {splitActive ? <div className="min-w-0">{contextBlock}</div> : null}
        {sidePanel ? panel : null}
      </div>
    </section>
  );
}

/** Compact Vietnamese toggle for layouts that keep their own question block. */
export function CaseViSummaryInline({ itemId, activeTaskId, className = '' }: { itemId: string | null | undefined; activeTaskId?: string | null; className?: string }) {
  const entry = viReadingFor(itemId);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  useEffect(() => setOpen(false), [itemId]);
  if (!entry) return null;
  return (
    <div className={className} data-testid="vi-summary-inline">
      <ViSummaryToggle open={open} onToggle={() => setOpen((value) => !value)} controls={panelId} />
      <div id={panelId} hidden={!open}>
        {open ? <ViSummaryPanel entry={entry} activeTaskId={activeTaskId} onClose={() => setOpen(false)} className="mt-2" /> : null}
      </div>
    </div>
  );
}

/** Mobile-friendly floating shortcut back to the question/exhibits while solving a long case. */
export function BackToQuestionButton({ targetId = 'case-question-anchor', label: text = 'Back to the question' }: { targetId?: string; label?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="fixed bottom-4 left-4 z-30 inline-flex lg:hidden min-h-10 items-center gap-1.5 rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3.5 py-2 text-xs font-bold text-[var(--space-text-brand)] shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)]"
      data-testid="back-to-question"
    >
      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
      {text}
    </button>
  );
}
