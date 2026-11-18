import type { ProgressSummary } from '../engine';
import { uiCheckNumber } from '../../../IndustryKnowledge/localization/uiText';

interface ActivityProgressProps {
  progress: ProgressSummary;
  label: string;
  attempt?: number;
}

export default function ActivityProgress({ progress, label, attempt }: ActivityProgressProps) {
  const percent = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1.5" data-testid="activity-progress">
      <div className="flex items-center justify-between gap-3 text-xs text-[var(--space-text-muted)]">
        <span className="font-medium text-[var(--space-text-secondary)]">{progress.label}</span>
        {attempt ? <span>{uiCheckNumber(attempt)}</span> : null}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={progress.total}
        aria-valuenow={progress.done}
        aria-valuetext={progress.label}
        className="h-1 w-full overflow-hidden rounded-full bg-[var(--space-neutral-200)]"
      >
        <div className="ms-anim h-full rounded-full bg-[var(--space-neutral-800)]" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
