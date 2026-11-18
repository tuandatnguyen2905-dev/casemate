import { useEffect, useState } from 'react';
import { CheckCircle2, Star, X } from 'lucide-react';
import {
  ACQUISITION_SOURCES,
  hasAnsweredAcquisitionSource,
  reportAcquisitionSource,
  trackFitRating,
  trackFitRatingDismissed,
  type AcquisitionSource,
  type FitTrack,
} from '../lib/engagementTracking';

const STORAGE_KEY = 'casemate-fit-feedback-v1';
const SHOW_DELAY_MS = 2500;
const DISMISS_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000;

const STAR_COUNT = 5;
const STAR_LABELS = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

const SOURCE_LABELS: Record<AcquisitionSource, string> = {
  facebook: 'Facebook',
  tiktok: 'TikTok',
  friends: 'Friends',
  school_club: 'School / Club',
  google: 'Google',
  other: 'Other',
};

type StoredFeedback = { rated_at?: string; rating?: number; dismissed_at?: string };

function readStored(): StoredFeedback {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function writeStored(value: StoredFeedback): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStored(), ...value })); } catch { /* The popup simply returns next time. */ }
}

function shouldPrompt(): boolean {
  const stored = readStored();
  if (stored.rated_at) return false;
  const dismissedAt = Date.parse(String(stored.dismissed_at || ''));
  return !Number.isFinite(dismissedAt) || Date.now() - dismissedAt > DISMISS_COOLDOWN_MS;
}

type FitFeedbackPromptProps = { track: FitTrack; programId?: string | null };

// Shown once a result is on screen. One device rates once; closing it
// without answering brings it back after a few days.
export default function FitFeedbackPrompt({ track, programId = null }: FitFeedbackPromptProps) {
  const [open, setOpen] = useState(false);
  const [askSource] = useState(() => !hasAnsweredAcquisitionSource());
  const [source, setSource] = useState<AcquisitionSource | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!shouldPrompt()) return undefined;
    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!submitted) return undefined;
    const timer = window.setTimeout(() => setOpen(false), 1800);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  if (!open) return null;

  const dismiss = () => {
    if (!submitted) {
      writeStored({ dismissed_at: new Date().toISOString() });
      trackFitRatingDismissed({ track, programId });
    }
    setOpen(false);
  };
  const canSubmit = rating != null && (!askSource || source != null);
  const submit = () => {
    if (!canSubmit || rating == null) return;
    if (askSource && source) reportAcquisitionSource(source);
    trackFitRating(rating, { track, programId, acqSource: source, scale: STAR_COUNT });
    writeStored({ rated_at: new Date().toISOString(), rating });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[color-mix(in_srgb,var(--space-text-primary)_35%,transparent)] p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="fit-feedback-title" data-testid="fit-feedback-prompt">
      <div className="w-full max-w-lg rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Quick feedback</p>
            <h2 id="fit-feedback-title" className="mt-1 text-lg font-extrabold">{submitted ? 'Thank you!' : 'Help us improve Fit Assessment'}</h2>
          </div>
          <button type="button" onClick={dismiss} aria-label="Close feedback" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><X className="h-4 w-4" /></button>
        </div>
        {submitted ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-[var(--space-text-secondary)]"><CheckCircle2 className="h-5 w-5 text-[var(--space-semantic-success)]" />Your answer helps Casemate build a better assessment.</p>
        ) : (
          <>
            {askSource && (
              <fieldset className="mt-4">
                <legend className="text-sm font-bold">How did you hear about Casemate?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ACQUISITION_SOURCES.map((item) => (
                    <button key={item} type="button" aria-pressed={source === item} onClick={() => setSource(item)} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${source === item ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'border-[var(--space-border-default)] text-[var(--space-text-primary)] hover:border-[var(--space-brand-primary-500)]'}`}>{SOURCE_LABELS[item]}</button>
                  ))}
                </div>
              </fieldset>
            )}
            <fieldset className="mt-5">
              <legend className="text-sm font-bold">How would you rate Fit Assessment?</legend>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(null)}>
                  {Array.from({ length: STAR_COUNT }, (_, index) => index + 1).map((score) => {
                    const lit = score <= (hoverRating ?? rating ?? 0);
                    return (
                      <button key={score} type="button" aria-pressed={rating === score} aria-label={`${score} out of ${STAR_COUNT} stars`} onMouseEnter={() => setHoverRating(score)} onFocus={() => setHoverRating(score)} onBlur={() => setHoverRating(null)} onClick={() => setRating(score)} className="flex h-11 w-11 !min-h-0 items-center justify-center rounded-xl hover:bg-[var(--space-surface-muted)]">
                        <Star className={`h-8 w-8 transition ${lit ? 'text-[var(--space-semantic-warning)]' : 'text-[var(--space-border-strong)]'}`} fill={lit ? 'currentColor' : 'none'} strokeWidth={1.75} />
                      </button>
                    );
                  })}
                </div>
                <span className="text-sm font-semibold text-[var(--space-text-secondary)]" aria-live="polite">{(hoverRating ?? rating) ? STAR_LABELS[(hoverRating ?? rating ?? 1) - 1] : ''}</span>
              </div>
            </fieldset>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={dismiss} className="rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]">Not now</button>
              <button type="button" disabled={!canSubmit} onClick={submit} className="rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-45">Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
