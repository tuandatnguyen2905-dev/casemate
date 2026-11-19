// Shared evidence layout for Case Drill and Case Pool solve screens.
// Reading order on every solve screen: case title -> The Question -> client objective and context ->
// evidence -> Your answer. Two exhibits sit side by side when the evidence area is wide enough to keep
// both legible; three or more use two independent comparison slots so any pair can be compared while
// every exhibit stays one choice away. Narrow screens stack every exhibit with quick links.
// Layout state lives here only, so expanding, re-pairing or jumping never touches learner input.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { ArrowDown, ArrowUp, BookOpen, Check, ChevronDown, Copy, PenLine } from 'lucide-react';

export const EVIDENCE_ANCHOR_ID = 'case-evidence-anchor';
export const ANSWER_ANCHOR_ID = 'case-answer-anchor';
export const CONTEXT_ANCHOR_ID = 'case-context-anchor';

/** Below this evidence-area width two charts are no longer legible side by side, so they stack. */
const SIDE_BY_SIDE_MIN_WIDTH = 880;

const label = 'text-[10px] font-bold uppercase tracking-[0.14em]';
const chipButton = 'inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 text-xs font-semibold text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)] hover:text-[var(--space-text-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)]';

function useContainerWidth<T extends HTMLElement>(): [RefObject<T>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    setWidth(node.getBoundingClientRect().width);
    if (typeof ResizeObserver === 'undefined') {
      const onResize = () => setWidth(node.getBoundingClientRect().width);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
    const observer = new ResizeObserver((entries) => setWidth(entries[0]?.contentRect.width || 0));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

export function scrollToAnchor(id: string, focusField = false) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (!focusField) return;
  const field = target.querySelector<HTMLElement>('textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled])');
  if (field) window.setTimeout(() => field.focus({ preventScroll: true }), 350);
}

function useAnchorExists(id: string): boolean {
  const [exists, setExists] = useState(false);
  useEffect(() => {
    // Answer areas mount after saved attempts load and unmount after submission, so keep checking.
    const check = () => setExists(Boolean(document.getElementById(id)));
    check();
    const timer = window.setInterval(check, 1000);
    return () => window.clearInterval(timer);
  }, [id]);
  return exists;
}

export interface CompareExhibitItem {
  key: string;
  /** 1-based exhibit number as printed on the card. */
  number: number;
  title: string;
}

export interface CompareSlotProps {
  /** Equal header height for cards shown side by side, so plot areas line up. */
  headerMinHeight?: number;
  onHeaderHeight: (height: number) => void;
  /** True when the card shares the row with another exhibit. */
  sideBySide: boolean;
}

export function CompareExhibits({
  items,
  renderItem,
  readingNotes,
  footer,
  testId = 'compare-exhibits',
}: {
  items: CompareExhibitItem[];
  renderItem: (index: number, slot: CompareSlotProps) => ReactNode;
  readingNotes?: ReactNode;
  footer?: ReactNode;
  testId?: string;
}) {
  const [rootRef, width] = useContainerWidth<HTMLElement>();
  const [notesOpen, setNotesOpen] = useState(false);
  const [pair, setPair] = useState<[number, number]>([0, 1]);
  const [headerHeights, setHeaderHeights] = useState<Record<number, number>>({});
  const contextExists = useAnchorExists(CONTEXT_ANCHOR_ID);
  const answerExists = useAnchorExists(ANSWER_ANCHOR_ID);
  const count = items.length;
  const wide = width >= SIDE_BY_SIDE_MIN_WIDTH;
  const mode: 'pair' | 'select' | 'stack' = !wide ? 'stack' : count === 2 ? 'pair' : 'select';
  const itemsKey = items.map((item) => item.key).join('|');

  useEffect(() => {
    setPair([0, 1]);
    setHeaderHeights({});
  }, [itemsKey]);

  const visible = mode === 'stack' ? items.map((_, index) => index) : mode === 'pair' ? [0, 1] : [pair[0], pair[1]];
  const sideBySide = mode !== 'stack';
  const headerMinHeight = sideBySide ? Math.max(0, ...visible.map((index) => headerHeights[index] || 0)) || undefined : undefined;

  const choose = (slot: 0 | 1, index: number) => {
    setPair((current) => {
      const next: [number, number] = [current[0], current[1]];
      const other = slot === 0 ? 1 : 0;
      if (next[other] === index) next[other] = next[slot];
      next[slot] = index;
      return next;
    });
  };

  const reportHeight = (index: number) => (height: number) => {
    const rounded = Math.ceil(height);
    setHeaderHeights((current) => (current[index] === rounded ? current : { ...current, [index]: rounded }));
  };

  return (
    <section ref={rootRef} id={EVIDENCE_ANCHOR_ID} className="scroll-mt-3" data-testid={testId} data-compare-mode={mode} aria-label="Case exhibits">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className={`${label} text-[var(--space-text-primary)]`}>Compare exhibits</p>
          <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-bold text-[var(--space-text-brand)]" data-testid="compare-exhibit-count">{count} exhibits</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {contextExists ? (
            <button type="button" onClick={() => scrollToAnchor(CONTEXT_ANCHOR_ID)} className={chipButton} data-testid="compare-case-context">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Case context
            </button>
          ) : null}
          {readingNotes ? (
            <button type="button" onClick={() => setNotesOpen((open) => !open)} aria-expanded={notesOpen} className={chipButton} data-testid="compare-reading-notes">
              Reading notes <ChevronDown className={`h-3.5 w-3.5 transition-transform ${notesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {readingNotes && notesOpen ? (
        <div className="mt-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2" data-testid="compare-reading-notes-panel">{readingNotes}</div>
      ) : null}

      {mode === 'select' ? (
        <div className="mt-2 grid grid-cols-2 gap-3" data-testid="compare-exhibit-selector">
          {([0, 1] as const).map((slot) => (
            <label key={slot} className="flex min-w-0 items-center gap-2 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-1.5">
              <span className={`${label} shrink-0 text-[var(--space-text-muted)]`}>{slot === 0 ? 'Left' : 'Right'}</span>
              <select
                value={pair[slot]}
                onChange={(event) => choose(slot, Number(event.target.value))}
                className="min-w-0 flex-1 truncate bg-transparent py-1 text-xs font-semibold text-[var(--space-text-primary)] focus:outline-none"
                aria-label={`${slot === 0 ? 'Left' : 'Right'} exhibit`}
                data-testid={`compare-slot-${slot === 0 ? 'left' : 'right'}`}
              >
                {items.map((item, index) => (
                  <option key={item.key} value={index}>{`Exhibit ${item.number} · ${item.title}`}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : null}

      {mode === 'stack' && (count > 1 || answerExists) ? (
        <nav className="mt-2 flex flex-wrap gap-1.5" aria-label="Jump to an exhibit" data-testid="compare-quick-links">
          {items.map((item) => (
            <button key={item.key} type="button" onClick={() => scrollToAnchor(`case-exhibit-${item.number}`)} className={chipButton}>
              Exhibit {item.number}
            </button>
          ))}
          {answerExists ? (
            <button type="button" onClick={() => scrollToAnchor(ANSWER_ANCHOR_ID, true)} className={chipButton}>
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" /> Your answer
            </button>
          ) : null}
        </nav>
      ) : null}

      <div className={`mt-2 grid w-full gap-3 ${sideBySide ? 'grid-cols-2' : 'grid-cols-1'}`} data-testid="compare-exhibit-grid">
        {visible.map((index) => (
          <div key={`${mode}-${items[index].key}`} id={`case-exhibit-${items[index].number}`} className="min-w-0 scroll-mt-3">
            {renderItem(index, { headerMinHeight, onHeaderHeight: reportHeight(index), sideBySide })}
          </div>
        ))}
      </div>
      {footer ? <div className="mt-2">{footer}</div> : null}
    </section>
  );
}

/** Measures a card header's natural height (without any shared minimum) for row alignment. */
export function useHeaderHeightReporter<T extends HTMLElement>(onHeaderHeight?: (height: number) => void) {
  const ref = useRef<T>(null);
  const callback = useRef(onHeaderHeight);
  callback.current = onHeaderHeight;
  const enabled = Boolean(onHeaderHeight);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    callback.current?.(node.getBoundingClientRect().height);
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => callback.current?.(node.getBoundingClientRect().height));
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);
  return ref;
}

/** Copies a data table as tab-separated text so it pastes cleanly into a spreadsheet. */
export function CopyTableButton({ columns, rows }: { columns: Array<string | number>; rows: Array<Array<string | number>> }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const text = [columns, ...rows].map((row) => row.map((cell) => String(cell ?? '')).join('\t')).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" onClick={() => void copy()} className="inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 text-[11px] font-semibold text-[var(--space-text-brand)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)]" data-testid="copy-data-table">
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy table'}
    </button>
  );
}

/** "Your answer" bar placed directly below the evidence. */
export function GoToAnswerBar({ hint = 'Write your answer once you have compared the evidence.', testId = 'go-to-answer-bar' }: { hint?: string; testId?: string }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2" data-testid={testId}>
      <div className="flex min-w-0 items-center gap-2">
        <PenLine className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" aria-hidden="true" />
        <p className="min-w-0 text-xs leading-5 text-[var(--space-text-secondary)]"><span className="font-bold text-[var(--space-text-primary)]">Your answer · </span>{hint}</p>
      </div>
      <button type="button" onClick={() => scrollToAnchor(ANSWER_ANCHOR_ID, true)} className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg bg-[var(--space-brand-primary-600)] px-3 text-xs font-bold text-[var(--space-text-on-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)] focus-visible:ring-offset-2" data-testid="button-go-to-answer">
        Go to answer <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

/** Quick way back from the answer area to the exhibits; renders nothing when the screen has no exhibits. */
export function BackToExhibitsButton({ className = '' }: { className?: string }) {
  const exists = useAnchorExists(EVIDENCE_ANCHOR_ID);
  if (!exists) return null;
  return (
    <button type="button" onClick={() => scrollToAnchor(EVIDENCE_ANCHOR_ID)} className={`inline-flex min-h-8 items-center gap-1 rounded-md text-xs font-semibold text-[var(--space-text-brand)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-500)] ${className}`} data-testid="button-back-to-exhibits">
      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> Back to exhibits
    </button>
  );
}
