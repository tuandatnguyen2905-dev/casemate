import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, ClipboardPaste, Info, Loader2, PencilLine, RefreshCw, UploadCloud } from 'lucide-react';
import { CV_FILE_ACCEPT } from '../lib/cvUploadSupport';

export type CvSubmitVariant = 'validation' | 'discovery';

type CvSubmitStepProps = {
  variant: CvSubmitVariant;
  parsing: boolean;
  parsePhase: number;
  parseLabels: string[];
  savedCvDate?: string | null;
  hasSavedCv: boolean;
  selectedFileName?: string;
  parseFailure?: boolean;
  /** Specific reason shown on the failure card; a generic message is used when empty. */
  failureMessage?: string;
  onFile: (file: File) => void;
  onUseSaved: () => void;
  onManual: () => void;
  /** Opens the blank CV form. When set, onManual is treated as the paste-text path. */
  onFillManually?: () => void;
  onRetry?: () => boolean | void;
  onBack?: () => void;
};

const HELPER_COPY: Record<CvSubmitVariant, string> = {
  validation: 'Upload your latest CV so Mate can prefill education, experience, skills and certifications relevant to your selected target.',
  discovery: 'Upload your latest CV so Mate can prefill education, experience, skills and certifications relevant to the directions you want to explore.',
};

const CV_REQUIREMENTS: string[] = [
  'PDF or Word (.docx), up to 10 MB — 1–3 pages works best.',
  'Text-based files only: scans, photos and screenshots cannot be read.',
  'No password protection. English or Vietnamese are both fine.',
  'Keep this screen open while Mate reads it (10–40 seconds). On a phone, use Chrome or Safari.',
];

export default function CvSubmitStep({ variant, parsing, parsePhase, parseLabels, savedCvDate, hasSavedCv, selectedFileName, parseFailure = false, failureMessage, onFile, onUseSaved, onManual, onFillManually, onRetry, onBack }: CvSubmitStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const savedDate = savedCvDate ? new Date(savedCvDate) : null;
  const savedLabel = savedDate && !Number.isNaN(savedDate.getTime()) ? savedDate.toLocaleDateString() : '';
  const fillManually = onFillManually || onManual;

  useEffect(() => {
    if (!parsing) { setElapsedSec(0); return undefined; }
    const startedAt = Date.now();
    const timer = window.setInterval(() => setElapsedSec(Math.round((Date.now() - startedAt) / 1000)), 1000);
    return () => window.clearInterval(timer);
  }, [parsing]);

  return (
    <>
      <h2 className="text-lg font-extrabold sm:text-xl">Upload Your CV</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{HELPER_COPY[variant]}</p>
      <p className="mt-2 text-xs font-semibold text-[var(--space-text-muted)]">PDF or Word (.docx) · max 10 MB · English or Vietnamese</p>
      {parsing ? (
        <div className="mt-5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-6 text-center" aria-live="polite">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-[var(--space-text-brand)]" />
          <p className="mt-3 font-bold">{parseLabels[Math.min(parsePhase, parseLabels.length - 1)]}</p>
          <div className="mx-auto mt-3 h-2 max-w-md overflow-hidden rounded-full bg-[var(--space-surface-card)]"><div className="h-full rounded-full bg-[var(--space-brand-primary)]" style={{ width: `${(parsePhase + 1) * 25}%` }} /></div>
          {elapsedSec >= 12 && elapsedSec < 50 && <p className="mt-3 text-xs text-[var(--space-text-secondary)]">Still reading — longer CVs can take up to a minute. Please keep this screen open.</p>}
          {elapsedSec >= 50 && <p className="mt-3 text-xs text-[var(--space-text-secondary)]">This is taking longer than usual. Mate will stop and show your options shortly if it cannot finish.</p>}
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-2xl border-2 border-dashed border-[var(--space-border-strong)] p-5 text-center hover:border-[var(--space-brand-primary-500)]">
              <UploadCloud className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" />
              <p className="mt-2 font-bold">Upload a New CV</p>
              <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{selectedFileName || 'PDF or Word (.docx)'}</p>
            </button>
            <button type="button" disabled={!hasSavedCv} onClick={onUseSaved} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-center disabled:opacity-45">
              <RefreshCw className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" />
              <p className="mt-2 font-bold">Use My Latest CV</p>
              {hasSavedCv && savedLabel && <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Saved {savedLabel}</p>}
            </button>
            <button type="button" onClick={onManual} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-center">
              <ClipboardPaste className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" />
              <p className="mt-2 font-bold">Paste Your CV</p>
              <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{onFillManually ? 'Copy-paste the text — works for any CV' : 'Fill in manually — works for any CV'}</p>
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept={CV_FILE_ACCEPT} className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) onFile(file); event.target.value = ''; }} />
          {parseFailure && (
            <div role="alert" className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_40%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_9%,transparent)] p-4">
              <p className="font-bold">We couldn't read this CV.</p>
              <p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{failureMessage || 'Please try again, upload another file (PDF or Word), or fill in your details manually.'}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => { if (onRetry?.() === false || !onRetry) fileInputRef.current?.click(); }} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Try Again</button>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Upload Another File</button>
                {onFillManually && onFillManually !== onManual && <button type="button" onClick={onManual} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Paste CV Text</button>}
                <button type="button" onClick={fillManually} className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold"><PencilLine className="h-3.5 w-3.5" />{onFillManually === onManual ? 'Fill In or Paste Manually' : 'Fill In Manually'}</button>
              </div>
            </div>
          )}
          <div className="mt-5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4" data-testid="cv-upload-requirements">
            <p className="flex items-center gap-2 text-sm font-extrabold text-[var(--space-text-primary)]"><Info className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />Before you upload</p>
            <ul className="mt-3 space-y-1.5">
              {CV_REQUIREMENTS.map((requirement) => (
                <li key={requirement} className="flex items-start gap-2 text-xs leading-5 text-[var(--space-text-secondary)]"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--space-text-brand)]" /><span>{requirement}</span></li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-5 text-[var(--space-text-secondary)]">Still stuck? Use <span className="font-bold">Paste Your CV</span>{onFillManually ? <> or <button type="button" onClick={onFillManually} className="!min-h-0 font-bold text-[var(--space-text-brand)] underline underline-offset-2">fill in the form manually</button></> : null}.</p>
          </div>
          {onBack && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
              <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button>
            </div>
          )}
        </>
      )}
    </>
  );
}
