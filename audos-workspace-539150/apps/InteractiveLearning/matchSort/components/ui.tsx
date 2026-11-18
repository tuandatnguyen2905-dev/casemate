import { useEffect, useState } from 'react';

// Focus and motion rules live in a scoped stylesheet so they hold regardless of Tailwind config.
export const MATCH_SORT_CSS = `
.ms-root button:focus-visible, .ms-root [tabindex]:not([tabindex="-1"]):focus-visible, .ms-root summary:focus-visible { outline: 2px solid var(--space-text-primary, #111827); outline-offset: 2px; }
.ms-root [tabindex="-1"]:focus { outline: none; }
.ms-root .ms-anim { transition: border-color 150ms ease, background-color 150ms ease, color 150ms ease; }
.ms-root [draggable="true"] { cursor: grab; }
@media (prefers-reduced-motion: reduce) {
  .ms-root *, .ms-root *::before, .ms-root *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
}
`;

export function MatchSortStyles() {
  return <style data-match-sort-styles="">{MATCH_SORT_CSS}</style>;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
  } catch {
    return false;
  }
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export const BUTTON_PRIMARY = 'ms-anim inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--space-brand-primary-600)] px-4 text-sm font-semibold text-[var(--space-text-on-primary)] hover:bg-[var(--space-brand-primary-700)] disabled:cursor-not-allowed disabled:opacity-40';
export const BUTTON_SECONDARY = 'ms-anim inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 text-sm font-semibold text-[var(--space-text-primary)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40';
export const BUTTON_ICON = 'ms-anim inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)] disabled:cursor-not-allowed disabled:opacity-30';

export type TileTone = 'idle' | 'selected' | 'filled' | 'correct' | 'incorrect';

const TONES: Record<TileTone, string> = {
  idle: 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-border-strong)]',
  selected: 'border-[var(--space-brand-primary-600)] bg-[var(--space-brand-primary-50)]',
  filled: 'border-[var(--space-border-strong)] bg-[var(--space-surface-muted)]',
  correct: 'border-[var(--space-semantic-success-600)] bg-[var(--space-semantic-success-50)]',
  incorrect: 'border-[var(--space-semantic-danger-600)] bg-[var(--space-semantic-danger-50)]',
};

export const tileClass = (tone: TileTone) => cx('ms-anim w-full min-h-11 rounded-lg border px-3 py-2.5 text-left text-sm leading-6 text-[var(--space-text-primary)]', TONES[tone]);

export const TYPE_LABEL = {
  'concept-matching': 'Concept matching',
  'category-sorting': 'Category sorting',
  'sequence-builder': 'Sequence builder',
} as const;

export const letterFor = (index: number) => String.fromCharCode(65 + index);
