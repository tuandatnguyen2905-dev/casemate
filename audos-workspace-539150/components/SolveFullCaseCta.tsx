import type { MouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { tw } from '../lib/colors';
import { SELECTABLE_CASE_POOL_LIBRARY } from '../lib/casePoolLibrary';

export const CASE_POOL_REQUEST_KEY = 'casemate-open-case-pool';
const CASE_POOL_APP_ID = 'case-drill-log';
const CASE_ROUTE_PREFIX = 'case';

export function casePoolCaseIdFromHash(hash: string): string | null {
  try {
    const parts = String(hash || '').replace(/^#/, '').split('/').map((part) => decodeURIComponent(part));
    if (parts[0]?.toLowerCase() !== CASE_POOL_APP_ID || parts[1]?.toLowerCase() !== CASE_ROUTE_PREFIX) return null;
    const caseId = String(parts[2] || '').trim();
    return /^case-[a-z0-9-]+$/i.test(caseId) ? caseId : null;
  } catch {
    return null;
  }
}

export function casePoolCaseHash(caseId: string): string {
  return `#${CASE_POOL_APP_ID}/${CASE_ROUTE_PREFIX}/${encodeURIComponent(caseId)}`;
}

/** The selectable Case Pool case a drill was built from, if any. */
export function sourceFullCase(sourceCaseId?: string | null): { id: string; title: string } | null {
  const item = sourceCaseId ? SELECTABLE_CASE_POOL_LIBRARY.find((entry) => entry.id === sourceCaseId) : null;
  return item ? { id: item.id, title: item.title } : null;
}

export function openCasePoolCase(caseId: string): void {
  if (!SELECTABLE_CASE_POOL_LIBRARY.some((item) => item.id === caseId)) return;
  try { sessionStorage.setItem(CASE_POOL_REQUEST_KEY, caseId); } catch { /* URL remains the durable fallback. */ }
  const nextHash = casePoolCaseHash(caseId);
  if (window.location.hash !== nextHash) window.location.hash = nextHash;
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: CASE_POOL_APP_ID } }));
}

export default function SolveFullCaseCta({ sourceCaseId, className = '' }: { sourceCaseId?: string | null; className?: string }) {
  const sourceCase = sourceCaseId
    ? SELECTABLE_CASE_POOL_LIBRARY.find((item) => item.id === sourceCaseId)
    : null;
  if (!sourceCase) return null;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openCasePoolCase(sourceCase.id);
  };

  return (
    <section className={`rounded-2xl border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] p-4 ${className}`} data-testid="solve-full-case-cta">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">Continue with the exact source case</p>
          <p className="mt-1 text-sm font-bold leading-5 text-[var(--space-text-primary)]">{sourceCase.title}</p>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">Your drill result and feedback stay saved. The full case opens directly in its solve workspace.</p>
        </div>
        <a
          href={casePoolCaseHash(sourceCase.id)}
          onClick={onClick}
          className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${tw.button.primary}`}
          data-testid={`button-solve-full-case-${sourceCase.id}`}
        >
          Solve the Full Case <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
