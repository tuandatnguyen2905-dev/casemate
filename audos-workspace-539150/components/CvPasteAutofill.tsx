import { useState } from 'react';
import { ChevronDown, ClipboardPaste, Loader2 } from 'lucide-react';

type CvPasteAutofillProps = {
  text: string;
  onTextChange: (value: string) => void;
  onAutofill: () => void;
  parsing: boolean;
  parsingLabel: string;
  failureMessage?: string | null;
};

const MIN_PASTE_CHARS = 40;

// Optional shortcut above the CV form: closed by default so the form itself
// is the main way in; opening it reveals the paste box and the auto-fill action.
export default function CvPasteAutofill({ text, onTextChange, onAutofill, parsing, parsingLabel, failureMessage }: CvPasteAutofillProps) {
  const [open, setOpen] = useState(() => text.trim().length > 0);
  const length = text.trim().length;

  return (
    <div className="mt-5" data-testid="cv-paste-autofill">
      <button type="button" aria-expanded={open} aria-controls="fit-cv-paste-panel" onClick={() => setOpen((current) => !current)} className="inline-flex items-center gap-2 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-brand)] hover:border-[var(--space-brand-primary-500)]">
        <ClipboardPaste className="h-4 w-4" />
        Paste CV text to auto-fill
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id="fit-cv-paste-panel" className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4">
          <label htmlFor="fit-cv-paste" className="block text-xs font-bold text-[var(--space-text-secondary)]">Paste your CV text</label>
          <textarea id="fit-cv-paste" rows={6} value={text} disabled={parsing} onChange={(event) => onTextChange(event.target.value)} placeholder="Paste your education, experience, skills, certifications and achievements here…" className="mt-1.5 w-full resize-y rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-sm leading-6 text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] disabled:opacity-60" />
          {failureMessage && !parsing && <p role="alert" className="mt-2 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_40%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_9%,transparent)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]">{failureMessage} You can keep filling in the fields below — they work exactly the same.</p>}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" disabled={parsing || length < MIN_PASTE_CHARS} onClick={onAutofill} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2 text-xs font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-45">{parsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardPaste className="h-4 w-4" />}{parsing ? parsingLabel : 'Auto-fill from text'}</button>
            {length > 0 && length < MIN_PASTE_CHARS && <span className="text-xs font-semibold text-[var(--space-semantic-danger)]">Paste at least {MIN_PASTE_CHARS} characters.</span>}
          </div>
        </div>
      )}
    </div>
  );
}
