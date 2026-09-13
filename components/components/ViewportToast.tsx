// Casemate viewport toasts (v1.6 — UX fix: consolidated notifications).
//
// ONE shared stack of transient, non-interactive notifications, rendered at
// the VIEWPORT bottom-right — never inside the chat column or an app panel.
// Every save/confirmation toast in the space goes through here:
//
//   • "Saved your resume ✓" (CV Save & Continue)
//   • "Saved your answers ✓" (MCQ answers stored)
//   • "Review and adjust your resume if needed" (CV panel)
//
// Usage: import { showViewportToast } and call it from anywhere — the host
// component (mounted ONCE in Desktop.tsx) listens for the window event, so
// deeply nested components never need context or prop drilling.
//
// Placement: bottom-right of the viewport on every screen size. On small
// screens the stack sits ABOVE the chat composer (bottom-24) so it never
// covers the input; on sm+ it sits at the classic bottom-4 right-4 spot
// (same corner as the one-time feedback nudge).

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';

const TOAST_EVENT = 'casemate:viewport-toast';
const DEFAULT_DURATION_MS = 5200;

export interface ViewportToastOptions {
  tone?: 'success' | 'info';
  durationMs?: number;
}

/** Show a transient toast at the viewport bottom-right (fire-and-forget). */
export function showViewportToast(message: string, options?: ViewportToastOptions) {
  try {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: {
          message,
          tone: options?.tone === 'info' ? 'info' : 'success',
          durationMs: options?.durationMs || DEFAULT_DURATION_MS,
        },
      }),
    );
  } catch {
    // Toasts are cosmetic — never let one break a save flow.
  }
}

interface ToastItem {
  id: number;
  message: string;
  tone: 'success' | 'info';
}

export default function ViewportToastHost() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(1);

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const message = String(detail.message || '').trim();
      if (!message) return;
      const id = nextIdRef.current++;
      // Keep at most 3 toasts on screen — older ones make room for new ones.
      setToasts((prev) => [...prev.slice(-2), { id, message, tone: detail.tone === 'info' ? 'info' : 'success' }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, Number(detail.durationMs) || DEFAULT_DURATION_MS);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-24 right-4 z-[80] flex w-[min(20rem,calc(100vw-2rem))] flex-col items-end gap-2 sm:bottom-4"
      role="status"
      aria-live="polite"
      data-testid="viewport-toast-stack"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex w-full items-start gap-2.5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3.5 py-3 shadow-[0_12px_36px_var(--space-shell-shadow-strong)]"
          data-testid="viewport-toast"
        >
          {toast.tone === 'success' ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--space-semantic-success)]" />
          ) : (
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
          )}
          <p className="min-w-0 flex-1 text-sm leading-5 text-[var(--space-text-primary)]">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
