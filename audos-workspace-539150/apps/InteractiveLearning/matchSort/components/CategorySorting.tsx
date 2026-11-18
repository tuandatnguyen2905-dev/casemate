import { useMemo } from 'react';
import type { DragEvent } from 'react';
import { Undo2 } from 'lucide-react';
import { itemDisplayOrder } from '../engine';
import type { CategorySortingActivity, SortingState } from '../types';
import ActivityShell from './ActivityShell';
import { StatusMark } from './ConceptMatching';
import { BUTTON_ICON, BUTTON_SECONDARY, cx, tileClass } from './ui';
import type { TileTone } from './ui';
import { useActivityController } from './useActivityController';
import type { ActivityComponentProps } from './useActivityController';

const DRAG_TYPE = 'text/plain';

export default function CategorySorting({ activity, onAttempt, onNext, nextLabel }: ActivityComponentProps<CategorySortingActivity>) {
  const { state, dispatch, announcement, announce } = useActivityController<CategorySortingActivity, SortingState>(activity, onAttempt);
  const order = useMemo(() => itemDisplayOrder(activity), [activity]);
  const items = useMemo(() => new Map(activity.items.map((item) => [item.id, item])), [activity]);
  const categories = useMemo(() => new Map(activity.categories.map((category) => [category.id, category])), [activity]);
  const status = new Map((state.result?.entries ?? []).map((entry) => [entry.id, entry.correct]));
  const working = state.phase === 'working';
  const selected = state.selectedItem ? items.get(state.selectedItem) : undefined;
  const tray = order.filter((id) => !state.placements[id]);

  const tone = (id: string): TileTone => {
    if (status.has(id)) return status.get(id) ? 'correct' : 'incorrect';
    if (state.locked.includes(id)) return 'correct';
    if (state.selectedItem === id) return 'selected';
    return 'idle';
  };
  const place = (itemId: string, categoryId: string) => {
    announce(`Placed ${items.get(itemId)?.text} in ${categories.get(categoryId)?.label}.`);
    dispatch({ type: 'place', itemId, categoryId });
  };
  const select = (id: string) => {
    announce(state.selectedItem === id ? 'Selection cleared.' : `Selected ${items.get(id)?.text}. Now choose a group.`);
    dispatch({ type: 'select-item', id });
  };
  const unplace = (itemId: string) => {
    announce(`Returned ${items.get(itemId)?.text} to the items to sort.`);
    dispatch({ type: 'unplace', itemId });
  };
  const dropTarget = (onItem: (itemId: string) => void) => ({
    onDragOver: (event: DragEvent<HTMLElement>) => { if (working) event.preventDefault(); },
    onDrop: (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      const itemId = event.dataTransfer.getData(DRAG_TYPE);
      if (working && items.has(itemId)) onItem(itemId);
    },
  });

  const itemButton = (id: string) => {
    const item = items.get(id);
    const locked = state.locked.includes(id);
    return (
      <button
        type="button"
        data-item-id={id}
        className={cx(tileClass(tone(id)), 'flex items-start gap-2')}
        aria-pressed={state.selectedItem === id}
        disabled={!working || locked}
        draggable={working && !locked}
        onDragStart={(event) => { event.dataTransfer.setData(DRAG_TYPE, id); event.dataTransfer.effectAllowed = 'move'; }}
        onClick={() => select(id)}
      >
        <span className="min-w-0 flex-1">{item?.text}</span>
        <StatusMark correct={status.get(id) ?? (locked ? true : undefined)} />
      </button>
    );
  };

  return (
    <ActivityShell activity={activity} state={state} dispatch={dispatch} announcement={announcement} checkHint="Place every item in a group to check your answers." onNext={onNext} nextLabel={nextLabel}>
      <section aria-labelledby={`${activity.activityId}-tray`} className="rounded-xl border border-dashed border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] p-3" data-testid="sort-tray" {...dropTarget(unplace)}>
        <h3 id={`${activity.activityId}-tray`} className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">Items to sort ({tray.length})</h3>
        {tray.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">{tray.map((id) => <li key={id}>{itemButton(id)}</li>)}</ul>
        ) : (
          <p className="text-sm text-[var(--space-text-muted)]">{working ? 'Every item is placed. Select an item to move it, or check your answers.' : 'Every item is placed.'}</p>
        )}
      </section>

      <div className={cx('grid gap-3', activity.categories.length > 3 ? 'sm:grid-cols-2' : activity.categories.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2')}>
        {activity.categories.map((category) => {
          const placed = order.filter((id) => state.placements[id] === category.id);
          return (
            <section key={category.id} role="group" aria-labelledby={`${activity.activityId}-${category.id}`} data-category-id={category.id} className="flex flex-col gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3" {...dropTarget((itemId) => place(itemId, category.id))}>
              <div>
                <h3 id={`${activity.activityId}-${category.id}`} className="text-sm font-semibold text-[var(--space-text-primary)]">{category.label}</h3>
                <p className="text-xs leading-5 text-[var(--space-text-muted)]">{category.description}</p>
              </div>
              {working ? (
                <button type="button" className={cx(BUTTON_SECONDARY, 'w-full')} disabled={!selected || state.placements[selected.id] === category.id} onClick={() => selected && place(selected.id, category.id)}>
                  {selected ? `Place here` : 'Select an item first'}
                  <span className="sr-only">{selected ? `: ${selected.text} in ${category.label}` : ` to place it in ${category.label}`}</span>
                </button>
              ) : null}
              <ul className="flex min-h-11 flex-col gap-2">
                {placed.map((id) => (
                  <li key={id} className="flex items-stretch gap-2">
                    {itemButton(id)}
                    {working && !state.locked.includes(id) ? (
                      <button type="button" className={BUTTON_ICON} aria-label={`Return ${items.get(id)?.text} to the items to sort`} onClick={() => unplace(id)}>
                        <Undo2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </ActivityShell>
  );
}
