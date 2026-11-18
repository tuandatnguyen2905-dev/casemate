import { Fragment, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLessonFlow } from '../lessonFlow';
import { buildMatchers, segmentText } from './glossaryMatch';
import type { TermMatcher } from './glossaryMatch';
import { hasLessonGlossary } from './glossaryIndex';
import { useLessonGlossary } from './glossaryStore';
import type { LessonGlossary, ResolvedTerm } from './glossaryStore';
import { useGlossaryLanguage } from './glossaryLanguage';
import { TermCard } from './TermCard';

const OPEN_EVENT = 'casemate:glossary-popover-open';
const POPOVER_WIDTH = 320;
const MOBILE_BREAKPOINT = 640;

type Placement = { mode: 'sheet' } | { mode: 'anchored'; top: number; left: number; above: boolean };

function placementFor(trigger: HTMLElement | null): Placement {
  if (typeof window === 'undefined' || !trigger) return { mode: 'sheet' };
  if (window.innerWidth < MOBILE_BREAKPOINT) return { mode: 'sheet' };
  const rect = trigger.getBoundingClientRect();
  const width = Math.min(POPOVER_WIDTH, window.innerWidth - 16);
  const left = Math.max(8, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 8));
  const above = window.innerHeight - rect.bottom < 240 && rect.top > window.innerHeight - rect.bottom;
  return { mode: 'anchored', top: above ? rect.top - 8 : rect.bottom + 8, left, above };
}

/** One recognised term inside chapter text: a subtle inline button that opens a definition popover in place. */
export function TermLookup({ term, children }: { term: ResolvedTerm; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>({ mode: 'sheet' });
  const [language] = useGlossaryLanguage();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const onOtherOpen = (event: Event) => { if ((event as CustomEvent).detail !== popoverId) setOpen(false); };
    window.addEventListener(OPEN_EVENT, onOtherOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOtherOpen);
  }, [popoverId]);

  useLayoutEffect(() => {
    if (!open) return undefined;
    const update = () => setPlacement(placementFor(triggerRef.current));
    update();
    popoverRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.stopPropagation(); close(); } };
    const onPointer = (event: Event) => {
      const target = event.target as Node;
      if (popoverRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      close(false);
    };
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('mousedown', onPointer, true);
    document.addEventListener('touchstart', onPointer, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('mousedown', onPointer, true);
      document.removeEventListener('touchstart', onPointer, true);
    };
  }, [open]);

  const toggle = () => {
    if (open) { close(); return; }
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: popoverId }));
    setOpen(true);
  };

  const popover = open && typeof document !== 'undefined' ? createPortal(
    <div
      ref={popoverRef}
      id={popoverId}
      role="dialog"
      aria-label={`${term.term} definition`}
      tabIndex={-1}
      data-testid="glossary-popover"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const focusable = popoverRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
        if (!focusable?.length) return;
        const last = focusable[focusable.length - 1];
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); close(); }
      }}
      className={placement.mode === 'sheet'
        ? 'fixed inset-x-0 bottom-0 z-[75] max-h-[70vh] overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl outline-none'
        : 'fixed z-[75] max-h-[60vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-xl outline-none'}
      style={placement.mode === 'anchored' ? { top: placement.top, left: placement.left, width: Math.min(POPOVER_WIDTH, window.innerWidth - 16), transform: placement.above ? 'translateY(-100%)' : undefined } : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">Essential term</p>
        <button type="button" onClick={() => close()} className="-mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" aria-label="Close definition">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-1"><TermCard term={term} language={language} compact /></div>
    </div>,
    document.body,
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        data-testid="glossary-term-trigger"
        data-term-id={term.id}
        className="inline cursor-help rounded-sm border-b border-dotted border-red-400 bg-transparent p-0 text-left font-[inherit] text-inherit [font-size:inherit] [line-height:inherit] hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        {children}
      </button>
      {popover}
    </>
  );
}

// First occurrence of each term per chapter owns the annotation, in document order.
const claimsByChapter = new Map<string, Map<string, string>>();

export function claimTerm(scope: string, termId: string, blockKey: string): boolean {
  let claims = claimsByChapter.get(scope);
  if (!claims) { claims = new Map(); claimsByChapter.set(scope, claims); }
  const owner = claims.get(termId);
  if (owner === undefined) { claims.set(termId, blockKey); return true; }
  return owner === blockKey;
}

export function resetTermClaims() {
  claimsByChapter.clear();
}

const matcherCache = new WeakMap<LessonGlossary, { matchers: TermMatcher[]; byId: Map<string, ResolvedTerm> }>();
function lessonMatchers(glossary: LessonGlossary) {
  let cached = matcherCache.get(glossary);
  if (!cached) {
    cached = { matchers: buildMatchers(glossary.terms), byId: new Map(glossary.terms.map((term) => [term.id, term])) };
    matcherCache.set(glossary, cached);
  }
  return cached;
}

/**
 * Plain chapter text with the open lesson's glossary terms made lookup-able. Anything that is not a
 * string, and every lesson without glossary content, renders exactly as before.
 */
export function GlossaryText({ text, chapterIndex, blockKey }: { text: ReactNode; chapterIndex: number; blockKey: string }) {
  const flow = useLessonFlow();
  const identity = flow?.identity && hasLessonGlossary(flow.identity) ? flow.identity : null;
  const { glossary } = useLessonGlossary(identity);
  const segments = useMemo(() => {
    if (typeof text !== 'string' || !glossary) return null;
    const { matchers } = lessonMatchers(glossary);
    const scope = `${glossary.identity}#${chapterIndex}`;
    return segmentText(text, matchers, (termId) => claimTerm(scope, termId, blockKey));
  }, [text, glossary, chapterIndex, blockKey]);
  if (!segments || !glossary) return <>{text}</>;
  const { byId } = lessonMatchers(glossary);
  return (
    <>
      {segments.map((segment, index) => {
        const term = segment.termId ? byId.get(segment.termId) : undefined;
        return term ? <TermLookup key={index} term={term}>{segment.text}</TermLookup> : <Fragment key={index}>{segment.text}</Fragment>;
      })}
    </>
  );
}

/** Explicit, author-placed term reference for content that cannot be annotated automatically. */
export function GlossaryTermRef({ termId, children }: { termId: string; children: ReactNode }) {
  const flow = useLessonFlow();
  const identity = flow?.identity && hasLessonGlossary(flow.identity) ? flow.identity : null;
  const { glossary } = useLessonGlossary(identity);
  const term = glossary?.terms.find((item) => item.id === termId);
  return term ? <TermLookup term={term}>{children}</TermLookup> : <>{children}</>;
}
