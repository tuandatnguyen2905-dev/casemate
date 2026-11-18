import { useCallback, useEffect, useRef, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useLessonFlow } from '../lessonFlow';
import { hasLessonGlossary } from './glossaryIndex';
import { loadLessonGlossary, useLessonGlossary } from './glossaryStore';
import { EssentialTermsPreview } from './EssentialTermsPreview';
import { TermSheet } from './TermSheet';
import { uiText, useUiLanguage } from '../localization/uiText';

export { GlossaryText, GlossaryTermRef } from './TermPopover';

// UI preference only: whether the preview opens by itself at lesson entry. It is never read by
// lesson progress, chapter unlocking or completion.
export const PREVIEW_SEEN_KEY = 'casemate:glossary-preview:v1';
export const PREVIEW_SKIPPED_KEY = 'casemate:glossary-preview-skip:v1';

function readMap(storage: Storage | null | undefined, key: string): Record<string, string> {
  try {
    const value = JSON.parse(storage?.getItem(key) ?? '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function writeEntry(storage: Storage | null | undefined, key: string, identity: string, value: string) {
  try {
    storage?.setItem(key, JSON.stringify({ ...readMap(storage, key), [identity]: value }));
  } catch {
    // Without storage the preview simply offers itself again next time.
  }
}

const local = () => (typeof window !== 'undefined' ? window.localStorage : null);
const session = () => (typeof window !== 'undefined' ? window.sessionStorage : null);

/** Opens by itself on lesson entry until the learner starts the lesson from it; Skip for Now pauses it for this browser session. */
export function shouldAutoOpenEssentialTerms(identity: string | null | undefined): boolean {
  if (!identity || !hasLessonGlossary(identity)) return false;
  return !readMap(local(), PREVIEW_SEEN_KEY)[identity] && !readMap(session(), PREVIEW_SKIPPED_KEY)[identity];
}

export function recordPreviewChoice(identity: string, choice: 'started' | 'skipped') {
  if (choice === 'started') writeEntry(local(), PREVIEW_SEEN_KEY, identity, 'started');
  else writeEntry(session(), PREVIEW_SKIPPED_KEY, identity, 'skipped');
}

interface PendingEntry {
  identity: string;
  proceed: () => void;
  trigger: HTMLElement | null;
}

function EssentialTermsEntryDialog({ identity, proceed, trigger, onDone }: PendingEntry & { onDone: () => void }) {
  const { status, glossary } = useLessonGlossary(identity);
  const [sheetOpen, setSheetOpen] = useState(false);
  const unavailable = status === 'none' || status === 'error';

  // A lesson whose glossary cannot load goes straight on to the learning mode chooser.
  useEffect(() => {
    if (!unavailable) return;
    onDone();
    proceed();
  }, [unavailable]);
  if (unavailable) return null;

  const finish = (choice: 'started' | 'skipped') => {
    recordPreviewChoice(identity, choice);
    onDone();
    proceed();
  };

  return (
    <>
      <EssentialTermsPreview
        glossary={glossary}
        loading={status === 'loading'}
        onStart={() => finish('started')}
        onSkip={() => finish('skipped')}
        onViewAll={() => setSheetOpen(true)}
        onClose={onDone}
        returnFocus={trigger}
      />
      {sheetOpen && glossary ? <TermSheet glossary={glossary} initialScope="lesson" onClose={() => setSheetOpen(false)} /> : null}
    </>
  );
}

/**
 * Optional Essential Terms step in lesson entry, before the learning mode chooser. `open` runs
 * `proceed` at once when the lesson has no glossary, when the learner already started from the
 * preview, or for programmatic re-entry (`auto: false`).
 */
export function useEssentialTermsEntry() {
  const [pending, setPending] = useState<PendingEntry | null>(null);
  const open = useCallback((identity: string, proceed: () => void, options: { trigger?: HTMLElement | null; auto?: boolean } = {}) => {
    if (options.auto === false || !shouldAutoOpenEssentialTerms(identity)) {
      proceed();
      return;
    }
    void loadLessonGlossary(identity).catch(() => undefined);
    setPending({ identity, proceed, trigger: options.trigger ?? null });
  }, []);
  const element = pending ? <EssentialTermsEntryDialog key={pending.identity} {...pending} onDone={() => setPending(null)} /> : null;
  return { open, element };
}

/** Reopens the lesson's Essential Terms from the reader. Renders nothing for lessons without glossary content. */
export function EssentialTermsReaderButton({ chapterIndex, className = '' }: { chapterIndex: number; className?: string }) {
  useUiLanguage();
  const flow = useLessonFlow();
  const identity = flow?.identity && hasLessonGlossary(flow.identity) ? flow.identity : null;
  const { status, glossary, retry } = useLessonGlossary(identity);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  if (!identity || status === 'none') return null;
  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => { if (status === 'error') retry(); setOpen(true); }}
        className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border border-red-100 bg-white px-3 py-1 text-[11px] font-bold normal-case tracking-normal text-red-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${className}`}
        data-testid="essential-terms-reader-button"
      >
        <BookOpen className="h-3.5 w-3.5" aria-hidden /> {uiText('Essential Terms')}
      </button>
      {open && glossary ? <TermSheet glossary={glossary} chapterIndex={chapterIndex} onClose={() => setOpen(false)} returnFocus={buttonRef.current} /> : null}
    </>
  );
}
