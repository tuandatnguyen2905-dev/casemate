/**
 * CompetitiveAppetiteSection — “Your competitive ambition”, Part 4 of the unified questionnaire popup.
 *
 * Six single-select MCQs (defined in lib/competitiveScores.ts — the single
 * source of truth, shared with the scoring) that determine whether the
 * matched-program list surfaces higher- or lower-competition programs first:
 *   total raw score 0–4 → pragmatic · 5–8 → balanced · 9–12 → ambitious
 *
 * SKIPPABLE by design (Skip button, and an untouched/partial group
 * counts as skipped too): skipping never blocks "Send my answers" and
 * defaults the result ordering to 'balanced'. Answer state lives in the
 * PARENT (AgentChatView) so taps survive popup minimize/close, CV
 * replacement, and form remounts — same contract as the culture-fit groups.
 */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { APPETITE_QUESTIONS } from '../lib/competitiveScores';

export function CompetitiveAppetiteSection({
  answers,
  onAnswer,
  skipped,
  onToggleSkip,
  locked,
}: {
  /** question id → selected option value (0/1/2). */
  answers: Record<string, number>;
  onAnswer: (id: string, value: number) => void;
  /** True when the candidate explicitly tapped Skip. */
  skipped: boolean;
  onToggleSkip: () => void;
  locked: boolean;
}) {
  const [open, setOpen] = useState(true);
  const answered = APPETITE_QUESTIONS.filter((q) => typeof answers[q.id] === 'number').length;
  const total = APPETITE_QUESTIONS.length;
  const partial = !skipped && answered > 0 && answered < total;

  return (
    <div
      className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] px-3 py-2.5"
      data-testid="appetite-question-group"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-xl px-1 py-1 text-left"
        data-testid="toggle-appetite-group"
      >
        <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">
          Part 4
        </span>
        <span className="min-w-0 flex-1 text-xs font-semibold uppercase tracking-wide text-[var(--space-text-secondary)]">
          Your Competitive Ambition
        </span>
        <span
          className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            skipped
              ? 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'
              : answered === total
                ? 'bg-[var(--space-semantic-success-50)] text-[var(--space-semantic-success-700)]'
                : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'
          }`}
        >
          {skipped ? 'Skipped' : answered === total ? 'Done ✓' : `Optional · ${answered}/${total}`}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-[var(--space-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="mt-2">
          <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">
            OPTIONAL — 6 quick questions to work out whether your list should prioritize highly competitive
            programs or more accessible options first. Answer all 6 to tailor the order to your
            ambition, or skip this section to use a balanced order. You will still receive your full
            free result.
          </p>
          {skipped ? (
            <div className="mt-2 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-2.5 py-2">
              <p className="text-[11px] leading-4 text-[var(--space-text-secondary)]">
                Skipped — your results will use a balanced order across fit and realistic odds.
              </p>
              {!locked && (
                <button
                  type="button"
                  onClick={onToggleSkip}
                  className="mt-1.5 text-[11px] font-semibold text-[var(--space-text-brand)] hover:underline"
                  data-testid="button-appetite-unskip"
                >
                  Answer This Section
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="mt-2 space-y-2">
                {APPETITE_QUESTIONS.map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2.5"
                  >
                    <p className="text-sm leading-5 text-[var(--space-text-primary)]">
                      <span className="mr-1 font-semibold text-[var(--space-text-brand)]">{idx + 1}.</span>
                      {q.question}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {q.options.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          disabled={locked}
                          onClick={() => onAnswer(q.id, opt.value)}
                          aria-pressed={answers[q.id] === opt.value}
                          className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                            answers[q.id] === opt.value
                              ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-primary)]'
                              : 'border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)]'
                          } ${locked ? 'cursor-default opacity-60' : ''}`}
                          data-testid={`appetite-pick-${q.id}-${opt.value}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {partial && (
                <p className="mt-2 rounded-lg border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] px-2.5 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                  Answer all {total}/{total} questions to set your competitive ambition, or skip this section to
                  use a balanced order. Your main result will not be affected.
                </p>
              )}
              {!locked && (
                <button
                  type="button"
                  onClick={onToggleSkip}
                  className="mt-2 w-full rounded-lg border border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] px-3 py-1.5 text-center text-[12px] font-semibold text-[var(--space-text-secondary)] transition hover:border-[var(--space-brand-primary-500)] hover:text-[var(--space-text-primary)]"
                  data-testid="button-appetite-skip"
                >
                  Skip — Use Balanced Order
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
