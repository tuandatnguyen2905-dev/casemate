import { useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { defaultPersistence, recordAttempt } from '../persistence';
import type { MatchSortPersistence } from '../persistence';
import type { AttemptSummary, MatchSortActivity, MatchSortAttemptEvent, MatchSortPack, MatchSortProgress } from '../types';
import CategorySorting from './CategorySorting';
import ConceptMatching from './ConceptMatching';
import SequenceBuilder from './SequenceBuilder';
import { BUTTON_SECONDARY, MatchSortStyles, TYPE_LABEL, cx } from './ui';
import type { ActivityComponentProps } from './useActivityController';

export function ActivityRunner({ activity, ...props }: ActivityComponentProps) {
  if (activity.type === 'concept-matching') return <ConceptMatching activity={activity} {...props} />;
  if (activity.type === 'category-sorting') return <CategorySorting activity={activity} {...props} />;
  return <SequenceBuilder activity={activity} {...props} />;
}

export interface MatchSortSessionProps {
  pack: MatchSortPack;
  /** Defaults to pack.activities. Pass the output of resolveAvailableActivities to hide held chapters. */
  activities?: MatchSortActivity[];
  persistence?: MatchSortPersistence;
  initialActivityId?: string;
  onAttempt?: (event: MatchSortAttemptEvent) => void;
  onExit?: () => void;
  /** Inside a host page that already has the page heading and practice notice (Practice & Review). */
  embedded?: boolean;
}

const statusText = (progress: MatchSortProgress, id: string) => {
  const record = progress[id];
  if (record?.completedAt) return 'Completed';
  if (record?.revealedAt) return 'Answers shown';
  return record?.attempts.length ? 'Attempted' : 'Not started';
};

export default function MatchSortSession({ pack, activities, persistence, initialActivityId, onAttempt, onExit, embedded = false }: MatchSortSessionProps) {
  const list = activities ?? pack.activities;
  const store = useMemo(() => persistence ?? defaultPersistence(), [persistence]);
  const [progress, setProgress] = useState<MatchSortProgress>(() => store.load());
  const [activeId, setActiveId] = useState(() => list.find((activity) => activity.activityId === initialActivityId)?.activityId ?? list[0]?.activityId);
  const mainRef = useRef<HTMLDivElement>(null);
  const index = Math.max(0, list.findIndex((activity) => activity.activityId === activeId));
  const active = list[index];
  const completed = list.filter((activity) => progress[activity.activityId]?.completedAt).length;

  const open = (id: string) => {
    setActiveId(id);
    requestAnimationFrameSafe(() => mainRef.current?.focus({ preventScroll: false }));
  };
  const handleAttempt = (activity: MatchSortActivity) => (attempt: AttemptSummary) => {
    const next = recordAttempt(store.load(), activity.activityId, attempt);
    store.save(next);
    setProgress(next);
    onAttempt?.({ activityId: activity.activityId, chapterId: activity.chapterId, type: activity.type, attempt, attemptNumber: next[activity.activityId].attempts.length });
  };

  if (!active) {
    return (
      <div className="ms-root p-6 text-sm text-[var(--space-text-secondary)]">
        <MatchSortStyles />
        No practice activities are available for this module yet.
      </div>
    );
  }
  const next = list[index + 1];

  return (
    <div className="ms-root min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)]" data-pack-id={pack.packId}>
      <MatchSortStyles />
      <div className={cx('mx-auto flex w-full max-w-6xl flex-col gap-5', !embedded && 'px-4 py-5 sm:px-6 lg:py-8')}>
        <header className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
          {onExit ? (
            <button type="button" className={BUTTON_SECONDARY} onClick={onExit}><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back</button>
          ) : null}
          <div className="min-w-0 flex-1">
            {embedded ? (
              <h2 className="text-lg font-semibold text-[var(--space-text-primary)]">{pack.title}</h2>
            ) : (
              <>
                <h1 className="text-lg font-semibold text-[var(--space-text-primary)]">{pack.title}</h1>
                <p className="text-sm leading-6 text-[var(--space-text-muted)]">Optional practice. Results stay separate from Knowledge Checks and never change chapter access or lesson completion.</p>
              </>
            )}
          </div>
          <p className="text-sm text-[var(--space-text-secondary)]" data-testid="session-progress">{completed} of {list.length} completed</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <nav aria-label="Practice activities">
            <ol className="flex flex-col gap-1.5">
              {list.map((activity, position) => {
                const current = activity.activityId === active.activityId;
                return (
                  <li key={activity.activityId}>
                    <button
                      type="button"
                      aria-current={current ? 'step' : undefined}
                      onClick={() => open(activity.activityId)}
                      className={cx('ms-anim flex min-h-11 w-full flex-col items-start rounded-lg border px-3 py-2 text-left', current ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-card)]' : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] hover:border-[var(--space-border-strong)]')}
                    >
                      <span className="text-sm font-medium leading-5 text-[var(--space-text-primary)]">{position + 1}. {activity.title}</span>
                      <span className="text-xs text-[var(--space-text-muted)]">{TYPE_LABEL[activity.type]} · {statusText(progress, activity.activityId)}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div ref={mainRef} tabIndex={-1} className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 outline-none sm:p-6">
            <p className="mb-3 text-xs text-[var(--space-text-muted)]">Activity {index + 1} of {list.length}</p>
            <ActivityRunner
              key={active.activityId}
              activity={active}
              onAttempt={handleAttempt(active)}
              onNext={next ? () => open(next.activityId) : undefined}
              nextLabel={next ? 'Next activity' : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function requestAnimationFrameSafe(callback: () => void) {
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(callback);
  else callback();
}
