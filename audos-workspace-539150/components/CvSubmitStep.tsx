import { useRef } from 'react';
import { ArrowLeft, ClipboardPaste, Loader2, RefreshCw, UploadCloud } from 'lucide-react';

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
  onFile: (file: File) => void;
  onUseSaved: () => void;
  onManual: () => void;
  onRetry?: () => boolean | void;
  onBack?: () => void;
};

const HELPER_COPY: Record<CvSubmitVariant, string> = {
  validation: 'Upload your latest CV so Mate can prefill education, experience, skills and certifications relevant to your selected target.',
  discovery: 'Upload your latest CV so Mate can prefill education, experience, skills and certifications relevant to the directions you want to explore.',
};

export default function CvSubmitStep({ variant, parsing, parsePhase, parseLabels, savedCvDate, hasSavedCv, selectedFileName, parseFailure = false, onFile, onUseSaved, onManual, onRetry, onBack }: CvSubmitStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedDate = savedCvDate ? new Date(savedCvDate) : null;
  const savedLabel = savedDate && !Number.isNaN(savedDate.getTime()) ? savedDate.toLocaleDateString() : '';

  return (
    <>
      <h2 className="text-lg font-extrabold sm:text-xl">Upload Your CV</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{HELPER_COPY[variant]}</p>
      <p className="mt-2 text-xs font-semibold text-[var(--space-text-muted)]">PDF · max 10 MB · English preferred · text-based PDF preferred</p>
      {parsing ? (
        <div className="mt-5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-6 text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-[var(--space-text-brand)]" />
          <p className="mt-3 font-bold">{parseLabels[Math.min(parsePhase, parseLabels.length - 1)]}</p>
          <div className="mx-auto mt-3 h-2 max-w-md overflow-hidden rounded-full bg-[var(--space-surface-card)]"><div className="h-full rounded-full bg-[var(--space-brand-primary)]" style={{ width: `${(parsePhase + 1) * 25}%` }} /></div>
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-2xl border-2 border-dashed border-[var(--space-border-strong)] p-5 text-center hover:border-[var(--space-brand-primary-500)]">
              <UploadCloud className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" />
              <p className="mt-2 font-bold">Upload a New CV</p>
              {selectedFileName && <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{selectedFileName}</p>}
            </button>
            <button type="button" disabled={!hasSavedCv} onClick={onUseSaved} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-center disabled:opacity-45">
              <RefreshCw className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" />
              <p className="mt-2 font-bold">Use My Latest CV</p>
              {hasSavedCv && savedLabel && <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Saved {savedLabel}</p>}
            </button>
            <button type="button" onClick={onManual} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-center">
              <ClipboardPaste className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" />
              <p className="mt-2 font-bold">Paste Your CV</p>
              <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Fill in manually</p>
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) onFile(file); event.target.value = ''; }} />
          {parseFailure && (
            <div className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_40%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_9%,transparent)] p-4">
              <p className="font-bold">We couldn't read this CV accurately.</p>
              <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Please upload another file or fill in the CV details manually.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Replace CV</button>
                <button type="button" onClick={onManual} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Paste Your CV</button>
                <button type="button" onClick={() => { if (onRetry?.() === false || !onRetry) fileInputRef.current?.click(); }} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Try Again</button>
              </div>
            </div>
          )}
          {onBack && (
            <div className="mt-5 flex justify-start">
              <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button>
            </div>
          )}
        </>
      )}
    </>
  );
}
