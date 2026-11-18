export const SHARED_WORK_STYLE_ITEMS = [
  ['innovation', 'Innovation', 'Stable routines', 'New ideas and change'],
  ['detail', 'Attention to detail', 'Big picture', 'Precision and accuracy'],
  ['results', 'Outcome orientation', 'Process first', 'Measurable outcomes'],
  ['competitive', 'Competitiveness', 'Low-pressure collaboration', 'Compete to be the best'],
  ['supportive', 'People support', 'Independent environment', 'People-first support'],
  ['teamwork', 'Teamwork', 'Work independently', 'Close collaboration'],
  ['reward_development', 'Learning & development', 'Growth is secondary', 'Learning is essential'],
  ['reward_compensation', 'Compensation', 'Salary is secondary', 'High compensation matters'],
  ['work_life_balance', 'Work-life balance', 'Career takes priority', 'Balance is non-negotiable'],
] as const;

export type SharedWorkStyleKey = (typeof SHARED_WORK_STYLE_ITEMS)[number][0];
export type SharedWorkStyleScores = Record<SharedWorkStyleKey, number>;

/** @deprecated MBTI removed from Fit Assessment UI — kept for type compatibility in saved progress types. */
export type SharedPersonalityMode = 'known' | 'assessment';

type Props = {
  scores: SharedWorkStyleScores;
  onScoreChange: (key: SharedWorkStyleKey, value: number) => void;
};

/** OCP sliders only — MBTI removed (low weight in v3 / matching). */
export default function WorkStyleAssessment({ scores, onScoreChange }: Props) {
  return (
    <div className="mt-6">
      <h3 className="font-extrabold">Work Environment Preferences</h3>
      <p className="mt-1 text-xs text-[var(--space-text-muted)]">
        Nine quick sliders — your culture and work-environment signal for fit scoring.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {SHARED_WORK_STYLE_ITEMS.map(([key, label, low, high]) => (
          <label key={key} className="rounded-2xl border border-[var(--space-border-default)] p-3">
            <span className="flex items-center justify-between text-sm font-bold">
              {label}
              <b className="rounded-lg bg-[var(--space-brand-primary)] px-2.5 py-1 text-[var(--space-text-on-primary)]">{scores[key]}</b>
            </span>
            <input
              type="range"
              min={1}
              max={5}
              value={scores[key]}
              onChange={(event) => onScoreChange(key, Number(event.target.value))}
              className="mt-3 w-full accent-[var(--space-brand-primary)]"
            />
            <span className="mt-1 flex justify-between text-[10px] text-[var(--space-text-muted)]">
              <span>1 · {low}</span>
              <span className="text-right">5 · {high}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
