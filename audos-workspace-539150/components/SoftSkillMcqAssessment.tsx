import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import {
  fetchCoreSoftSkillQuestionBank,
  type McqChoice,
  softSkillMcqComplete,
  sjtDisplayOrder,
  type SoftSkillQuestion,
} from '../lib/softSkillQuestionBank';

type Props = {
  answers: Record<string, McqChoice>;
  seconds: Record<string, number>;
  questionIndex: number;
  onAnswer: (itemId: string, choice: McqChoice, secondsOnItem: number) => void;
  onQuestionIndexChange: (index: number) => void;
};

const CHOICES: McqChoice[] = ['A', 'B', 'C', 'D'];

export default function SoftSkillMcqAssessment({ answers, seconds, questionIndex, onAnswer, onQuestionIndexChange }: Props) {
  const [bank, setBank] = useState<SoftSkillQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemStartedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void fetchCoreSoftSkillQuestionBank()
      .then((rows) => {
        if (!cancelled) {
          setBank(rows);
          setError('');
        }
      })
      .catch((caught) => {
        if (!cancelled) setError(caught instanceof Error ? caught.message : 'Could not load questions.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const safeIndex = bank.length ? Math.min(Math.max(0, questionIndex), bank.length - 1) : 0;
  const current = bank[safeIndex];

  useEffect(() => {
    itemStartedAtRef.current = Date.now();
  }, [current?.item_id]);

  const complete = useMemo(() => softSkillMcqComplete(answers, bank), [answers, bank]);

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-sm text-[var(--space-text-secondary)]">
        <Loader2 className="h-4 w-4 animate-spin text-[var(--space-text-brand)]" />
        Loading Casemate soft-skill questions…
      </div>
    );
  }

  if (error) {
    return <p className="mt-6 text-sm font-semibold text-[var(--space-semantic-danger)]">{error}</p>;
  }

  if (!current) {
    return <p className="mt-6 text-sm text-[var(--space-text-muted)]">No questions are configured.</p>;
  }

  const moduleLabel = current.module || current.item_type;

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold">Behavioral scenarios (SJT)</h3>
          <p className="mt-1 text-xs text-[var(--space-text-muted)]">
            Situational judgement only — how you act under pressure. Motivation and work-environment fit are captured in other steps (not repeated here).
          </p>
        </div>
        <span className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1 text-xs font-bold text-[var(--space-text-secondary)]">
          {safeIndex + 1} / {bank.length}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--space-border-default)] p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--space-text-brand)]">{moduleLabel}</p>
        <p className="mt-2 font-bold leading-snug">{current.question}</p>
        <div className="mt-4 grid gap-2">
          {sjtDisplayOrder(current.item_id).map((choice, position) => {
            const label = current[`option_${choice}` as 'option_A'];
            if (!label) return null;
            const selected = answers[current.item_id] === choice;
            return (
              <button
                key={choice}
                type="button"
                onClick={() => {
                  const elapsed = Math.max(1, Math.round((Date.now() - itemStartedAtRef.current) / 1000));
                  onAnswer(current.item_id, choice, elapsed);
                  if (safeIndex < bank.length - 1) onQuestionIndexChange(safeIndex + 1);
                }}
                className={`rounded-xl border p-3 text-left text-sm font-semibold transition-colors ${
                  selected
                    ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]'
                    : 'border-[var(--space-border-default)] hover:border-[color-mix(in_srgb,var(--space-brand-primary-500)_35%,transparent)]'
                }`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--space-surface-muted)] text-xs font-extrabold">{CHOICES[position]}</span>
                {selected && <Check className="mr-1 inline h-4 w-4 text-[var(--space-text-brand)]" />}
                {label}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            disabled={safeIndex === 0}
            onClick={() => onQuestionIndexChange(Math.max(0, safeIndex - 1))}
            className="text-xs font-bold text-[var(--space-text-muted)] disabled:opacity-30"
          >
            Previous question
          </button>
          {complete && <p className="text-xs font-bold text-[var(--space-semantic-success)]">All {bank.length} items answered</p>}
        </div>
      </div>
    </div>
  );
}
