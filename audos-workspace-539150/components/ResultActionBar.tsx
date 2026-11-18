import { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import type { NextActionOption } from '../lib/caseResultModel';

/** Nearest ancestor that actually scrolls; app content scrolls inside the shell, not the window. */
export function scrollParentOf(node: HTMLElement | null): HTMLElement | null {
  let current = node?.parentElement || null;
  while (current) {
    const { overflowY } = window.getComputedStyle(current);
    if ((overflowY === 'auto' || overflowY === 'scroll') && current.scrollHeight > current.clientHeight) return current;
    current = current.parentElement;
  }
  return null;
}

// When two results share a page (a Case Pool Structures case grades the tree and the
// full case), only the most recently shown one docks to the bottom of a phone screen.
let nextBarId = 0;
let dockedBars: number[] = [];
const dockListeners = new Set<() => void>();

function useDocksOnMobile(): boolean {
  const [id] = useState(() => ++nextBarId);
  const [docked, setDocked] = useState(false);
  useEffect(() => {
    const update = () => setDocked(dockedBars[dockedBars.length - 1] === id);
    dockListeners.add(update);
    dockedBars = [...dockedBars, id];
    dockListeners.forEach((listener) => listener());
    return () => {
      dockListeners.delete(update);
      dockedBars = dockedBars.filter((entry) => entry !== id);
      dockListeners.forEach((listener) => listener());
    };
  }, [id]);
  return docked;
}

/**
 * The one Retry control for every Case Drill and Case Pool result. CaseResultView
 * places it directly under the result header. On phones it docks above the shell's
 * bottom navigation (the 76px offset matches the other docked prompts) so it can be
 * pressed from anywhere in the result without scrolling.
 */
export default function ResultActionBar({
  retry,
  next = null,
  format = (value) => value,
}: {
  retry: NextActionOption;
  next?: NextActionOption | null;
  format?: (value: string) => string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const docked = useDocksOnMobile();
  const nextAction = next && next.kind !== 'retry' ? next : null;

  const runRetry = () => {
    const anchor = barRef.current?.closest('[data-retry-anchor]') as HTMLElement | null;
    const scroller = scrollParentOf(barRef.current);
    retry.onSelect();
    window.requestAnimationFrame(() => {
      if (anchor?.isConnected) anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
      else if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <div
      ref={barRef}
      className={`rounded-2xl border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] p-2.5 sm:p-3 ${docked ? 'fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-30 shadow-[0_-6px_18px_color-mix(in_srgb,var(--space-shell-shadow)_45%,transparent)] sm:static sm:z-auto sm:shadow-none' : ''}`}
      data-testid="result-action-bar"
      data-docked={docked ? 'true' : 'false'}
    >
      {retry.detail || nextAction?.detail ? (
        <div className="mb-2.5 hidden min-w-0 space-y-0.5 sm:block">
          {retry.detail ? <p className="break-words text-sm leading-6 text-[var(--space-text-primary)]" data-testid="result-retry-detail">{format(retry.detail)}</p> : null}
          {nextAction?.detail ? <p className="break-words text-xs leading-5 text-[var(--space-text-muted)]">{format(nextAction.detail)}</p> : null}
        </div>
      ) : null}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={runRetry}
          className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-on-primary)] transition-opacity hover:opacity-90"
          data-testid="button-result-retry"
        >
          <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{retry.label}</span>
        </button>
        {nextAction ? (
          <button
            type="button"
            onClick={nextAction.onSelect}
            title={nextAction.detail ? format(nextAction.detail) : undefined}
            className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-card)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-brand)] transition-colors hover:bg-[var(--space-surface-accent-soft)]"
            data-testid="button-result-next-action"
            data-kind={nextAction.kind}
          >
            <span className="truncate">{nextAction.label}</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
