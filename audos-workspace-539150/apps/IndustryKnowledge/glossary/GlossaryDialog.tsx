import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
/** Only the top-most glossary dialog handles Escape and Tab, so a term sheet opened from the preview closes on its own. */
const stack: symbol[] = [];

export function GlossaryDialog({
  labelledBy, onClose, returnFocus, children, testId, wide = false,
}: {
  labelledBy: string;
  onClose: () => void;
  returnFocus?: HTMLElement | null;
  children: ReactNode;
  testId?: string;
  wide?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const token = Symbol('glossary-dialog');
    stack.push(token);
    const previous = returnFocus ?? (document.activeElement as HTMLElement | null);
    const panel = panelRef.current;
    (panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel)?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (stack[stack.length - 1] !== token || !panel) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!focusable.length) { event.preventDefault(); panel.focus({ preventScroll: true }); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) { event.preventDefault(); last.focus({ preventScroll: true }); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first.focus({ preventScroll: true }); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      const position = stack.indexOf(token);
      if (position >= 0) stack.splice(position, 1);
      // preventScroll keeps the learner's reading position when focus returns.
      if (previous && typeof previous.focus === 'function' && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, []);

  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-900/40 sm:items-center sm:p-4"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onCloseRef.current(); }}
      data-testid={testId ? `${testId}-overlay` : undefined}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        data-testid={testId}
        className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:max-h-[88vh] sm:rounded-3xl ${wide ? 'sm:max-w-3xl' : 'sm:max-w-2xl'}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
