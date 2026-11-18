import { useEffect, useMemo, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import { ArrowDown, ArrowUp, GripVertical } from 'lucide-react';
import type { SequenceBuilderActivity, SequenceState } from '../types';
import ActivityShell from './ActivityShell';
import { StatusMark } from './ConceptMatching';
import { BUTTON_ICON, cx, tileClass } from './ui';
import type { TileTone } from './ui';
import { useActivityController } from './useActivityController';
import type { ActivityComponentProps } from './useActivityController';

const DRAG_TYPE = 'text/plain';
type Control = 'up' | 'down';

export default function SequenceBuilder({ activity, onAttempt, onNext, nextLabel }: ActivityComponentProps<SequenceBuilderActivity>) {
  const { state, dispatch, announcement, announce } = useActivityController<SequenceBuilderActivity, SequenceState>(activity, onAttempt);
  const steps = useMemo(() => new Map(activity.items.map((step) => [step.id, step])), [activity]);
  const status = new Map((state.result?.entries ?? []).map((entry) => [entry.id, entry.correct]));
  const working = state.phase === 'working';
  const controls = useRef(new Map<string, HTMLButtonElement | null>());
  const [focusTarget, setFocusTarget] = useState<{ id: string; control: Control } | null>(null);
  const total = state.order.length;

  useEffect(() => {
    if (!focusTarget) return;
    const index = state.order.indexOf(focusTarget.id);
    const preferred = focusTarget.control === 'up' && index === 0 ? 'down' : focusTarget.control === 'down' && index === total - 1 ? 'up' : focusTarget.control;
    controls.current.get(`${focusTarget.id}:${preferred}`)?.focus();
    setFocusTarget(null);
  }, [state.order, focusTarget, total]);

  const move = (id: string, delta: number, control: Control) => {
    const from = state.order.indexOf(id);
    const to = Math.max(0, Math.min(total - 1, from + delta));
    if (from === to || !working) return;
    announce(`Moved ${steps.get(id)?.text} to position ${to + 1} of ${total}.`);
    dispatch({ type: 'move-step', id, toIndex: to });
    setFocusTarget({ id, control });
  };
  const onRowKeyDown = (event: KeyboardEvent<HTMLLIElement>, id: string) => {
    if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return;
    event.preventDefault();
    move(id, event.key === 'ArrowUp' ? -1 : 1, event.key === 'ArrowUp' ? 'up' : 'down');
  };
  const onDrop = (event: DragEvent<HTMLLIElement>, targetId: string) => {
    event.preventDefault();
    const id = event.dataTransfer.getData(DRAG_TYPE);
    if (!working || !steps.has(id) || id === targetId) return;
    const to = state.order.indexOf(targetId);
    announce(`Moved ${steps.get(id)?.text} to position ${to + 1} of ${total}.`);
    dispatch({ type: 'move-step', id, toIndex: to });
  };
  const tone = (id: string): TileTone => (status.has(id) ? (status.get(id) ? 'correct' : 'incorrect') : 'idle');

  return (
    <ActivityShell activity={activity} state={state} dispatch={dispatch} announcement={announcement} checkHint="" onNext={onNext} nextLabel={nextLabel}>
      <p id={`${activity.activityId}-keys`} className="sr-only">Use the Move up and Move down buttons, or press Alt with the up or down arrow key, to change a stage’s position.</p>
      <ol className="flex flex-col gap-2" aria-describedby={`${activity.activityId}-keys`}>
        {state.order.map((id, index) => {
          const step = steps.get(id);
          return (
            <li
              key={id}
              data-step-id={id}
              data-position={index + 1}
              className={cx(tileClass(tone(id)), 'flex items-center gap-2 py-2')}
              draggable={working}
              onDragStart={(event) => { event.dataTransfer.setData(DRAG_TYPE, id); event.dataTransfer.effectAllowed = 'move'; }}
              onDragOver={(event) => { if (working) event.preventDefault(); }}
              onDrop={(event) => onDrop(event, id)}
              onKeyDown={(event) => onRowKeyDown(event, id)}
            >
              {working ? <GripVertical aria-hidden="true" className="hidden h-4 w-4 shrink-0 text-[var(--space-text-muted)] sm:block" /> : null}
              <span aria-hidden="true" className="w-6 shrink-0 text-center text-sm font-semibold text-[var(--space-text-muted)]">{index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="sr-only">{`Position ${index + 1} of ${total}: `}</span>
                {step?.text}
              </span>
              <StatusMark correct={status.get(id)} />
              {working ? (
                <span className="flex shrink-0 gap-1">
                  <button type="button" ref={(node) => { controls.current.set(`${id}:up`, node); }} className={BUTTON_ICON} aria-label={`Move ${step?.text} up`} disabled={index === 0} onClick={() => move(id, -1, 'up')}>
                    <ArrowUp aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <button type="button" ref={(node) => { controls.current.set(`${id}:down`, node); }} className={BUTTON_ICON} aria-label={`Move ${step?.text} down`} disabled={index === total - 1} onClick={() => move(id, 1, 'down')}>
                    <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  </button>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </ActivityShell>
  );
}
