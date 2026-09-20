import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Loader2, MessageCircle, Send, Star, X } from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';

const MAX_MESSAGE_LENGTH = 500;
const AUTO_CLOSE_DELAY_MS = 2000;
const FEEDBACK_SUBMITTED_KEY = 'casemate-feedback-submitted-v1';

interface FloatingFeedbackWidgetProps {
  autoOpen?: boolean;
}

export default function FloatingFeedbackWidget({ autoOpen = false }: FloatingFeedbackWidgetProps) {
  const { spaceId, sessionId } = useSpaceRuntime();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const email = useMemo(() => {
    try {
      const stored = localStorage.getItem(`space_session_${spaceId}`);
      if (!stored) return null;
      const session = JSON.parse(stored);
      return typeof session?.email === 'string' ? session.email : null;
    } catch {
      return null;
    }
  }, [spaceId]);

  useEffect(() => {
    if (autoOpen && sessionId) {
      setIsOpen(true);
      setError('');
    }
  }, [autoOpen, sessionId]);

  useEffect(() => {
    if (isOpen && !isSubmitted) {
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  }, [isOpen, isSubmitted]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting]);

  useEffect(() => () => {
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
  }, []);

  if (!sessionId) return null;

  const closeWidget = () => {
    if (isSubmitting) return;
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    setIsOpen(false);
    setIsSubmitted(false);
    setError('');
  };

  const submitFeedback = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError('Please add a short message before sending.');
      textareaRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const database = (window as any).__workspaceDb;
      if (!database?.from) throw new Error('Feedback storage is unavailable.');

      await database.from('feedback_form_responses').insert({
        email: email || null,
        session_id: sessionId,
        score: rating || null,
        experience: trimmedMessage,
        price_range: null,
        page_path: `${window.location.pathname}${window.location.search}`,
        page_hash: window.location.hash || null,
        source: 'floating_widget',
      });

      try {
        localStorage.setItem(FEEDBACK_SUBMITTED_KEY, String(Date.now()));
      } catch {
        // The response is saved even when local storage is unavailable.
      }
      setIsSubmitted(true);
      setMessage('');
      setRating(0);
      autoCloseTimer.current = setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, AUTO_CLOSE_DELAY_MS);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error && submissionError.message
          ? submissionError.message
          : 'Could not send feedback. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] font-[var(--space-font-family)]" data-testid="floating-feedback-widget">
      {isOpen && (
        <section
          id="floating-feedback-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby="floating-feedback-title"
          className="fixed bottom-20 left-3 right-3 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-[0_18px_48px_color-mix(in_srgb,var(--space-text-primary)_24%,transparent)] sm:bottom-24 sm:left-auto sm:right-6 sm:w-96"
        >
          {isSubmitted ? (
            <div className="flex min-h-40 flex-col items-center justify-center py-4 text-center" role="status">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success)_12%,transparent)]">
                <CheckCircle2 className="h-7 w-7 text-[var(--space-semantic-success)]" />
              </span>
              <h2 className="mt-3 text-lg font-bold text-[var(--space-text-primary)]">Thanks! 🎉</h2>
              <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Your feedback helps us improve Casemate.</p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="floating-feedback-title" className="text-base font-bold text-[var(--space-text-primary)]">
                    Share your feedback
                  </h2>
                  <p className="mt-0.5 text-xs text-[var(--space-text-muted)]">A quick note is all it takes.</p>
                </div>
                <button
                  type="button"
                  onClick={closeWidget}
                  className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-lg text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-muted)] hover:text-[var(--space-text-primary)]"
                  aria-label="Close feedback form"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-[var(--space-text-secondary)]">How would you rate Casemate?</p>
                <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Rate Casemate from 1 to 5 stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      aria-label={`${value} star${value === 1 ? '' : 's'}`}
                      onClick={() => setRating(value)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-[var(--space-surface-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary)]"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          value <= rating
                            ? 'fill-[var(--space-brand-primary)] text-[var(--space-brand-primary)]'
                            : 'text-[var(--space-border-strong)]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-3 block">
                <span className="sr-only">Feedback message</span>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    if (error) setError('');
                  }}
                  maxLength={MAX_MESSAGE_LENGTH}
                  rows={4}
                  placeholder="What's working? What could be better?"
                  className="w-full resize-none rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm leading-5 text-[var(--space-text-primary)] outline-none transition placeholder:text-[var(--space-text-muted)] focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary)_18%,transparent)]"
                />
              </label>
              <div className="mt-1 flex items-center justify-between gap-3">
                <p className="min-h-4 text-xs text-[var(--space-semantic-danger)]" role="alert">{error}</p>
                <span className="flex-shrink-0 text-xs text-[var(--space-text-muted)]">{message.length}/{MAX_MESSAGE_LENGTH}</span>
              </div>

              <button
                type="button"
                onClick={() => void submitFeedback()}
                disabled={isSubmitting || !message.trim()}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-on-primary)] transition hover:bg-[var(--space-brand-primary-700)] focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isSubmitting ? 'Sending…' : 'Send feedback'}
              </button>
            </>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => {
          setIsOpen((value) => !value);
          setError('');
        }}
        aria-label={isOpen ? 'Close feedback form' : 'Share feedback'}
        aria-expanded={isOpen}
        aria-controls="floating-feedback-popup"
        className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--space-brand-primary)] px-4 text-[var(--space-text-on-primary)] shadow-[0_8px_24px_color-mix(in_srgb,var(--space-brand-primary)_38%,transparent)] transition hover:-translate-y-0.5 hover:bg-[var(--space-brand-primary-700)] focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary)] focus:ring-offset-2"
        data-testid="floating-feedback-trigger"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="text-sm font-bold">Feedback</span>
      </button>
    </div>
  );
}
