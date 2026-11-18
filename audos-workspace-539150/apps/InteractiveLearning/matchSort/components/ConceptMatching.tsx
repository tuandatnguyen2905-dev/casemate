import { useMemo } from 'react';
import type { DragEvent } from 'react';
import { Check, X } from 'lucide-react';
import { answerDisplayOrder } from '../engine';
import type { ConceptMatchingActivity, MatchingState } from '../types';
import ActivityShell from './ActivityShell';
import { BUTTON_ICON, cx, letterFor, tileClass } from './ui';
import type { TileTone } from './ui';
import { useActivityController } from './useActivityController';
import type { ActivityComponentProps } from './useActivityController';

const DRAG_TYPE = 'text/plain';

export default function ConceptMatching({ activity, onAttempt, onNext, nextLabel }: ActivityComponentProps<ConceptMatchingActivity>) {
  const { state, dispatch, announcement, announce } = useActivityController<ConceptMatchingActivity, MatchingState>(activity, onAttempt);
  const answerOrder = useMemo(() => answerDisplayOrder(activity), [activity]);
  const answers = useMemo(() => new Map(activity.items.answers.map((item) => [item.id, item])), [activity]);
  const prompts = useMemo(() => new Map(activity.items.prompts.map((item) => [item.id, item])), [activity]);
  const letters = useMemo(() => new Map(answerOrder.map((id, index) => [id, letterFor(index)])), [answerOrder]);
  const promptNumbers = useMemo(() => new Map(activity.items.prompts.map((item, index) => [item.id, index + 1])), [activity]);
  const promptForAnswer = new Map(Object.entries(state.pairs).map(([promptId, answerId]) => [answerId, promptId]));
  const status = new Map((state.result?.entries ?? []).map((entry) => [entry.id, entry.correct]));
  const working = state.phase === 'working';
  const lockedAnswers = new Set(state.locked.map((id) => state.pairs[id]));

  const toneForPrompt = (id: string): TileTone => {
    if (status.has(id)) return status.get(id) ? 'correct' : 'incorrect';
    if (state.locked.includes(id)) return 'correct';
    if (state.selectedPrompt === id) return 'selected';
    return state.pairs[id] ? 'filled' : 'idle';
  };
  const toneForAnswer = (id: string): TileTone => {
    const promptId = promptForAnswer.get(id);
    if (promptId && status.has(promptId)) return status.get(promptId) ? 'correct' : 'incorrect';
    if (lockedAnswers.has(id)) return 'correct';
    if (state.selectedAnswer === id) return 'selected';
    return promptId ? 'filled' : 'idle';
  };

  const pairAnnouncement = (promptId: string, answerId: string) => `Paired ${prompts.get(promptId)?.text} with ${activity.answerLabel.toLowerCase()} ${letters.get(answerId)}.`;
  const selectPrompt = (id: string) => {
    if (state.selectedAnswer && !state.locked.includes(id)) announce(pairAnnouncement(id, state.selectedAnswer));
    else announce(state.selectedPrompt === id ? 'Selection cleared.' : `Selected ${prompts.get(id)?.text}. Now choose its ${activity.answerLabel.toLowerCase()}.`);
    dispatch({ type: 'select-prompt', id });
  };
  const selectAnswer = (id: string) => {
    if (state.selectedPrompt && !lockedAnswers.has(id)) announce(pairAnnouncement(state.selectedPrompt, id));
    else announce(state.selectedAnswer === id ? 'Selection cleared.' : `Selected ${activity.answerLabel.toLowerCase()} ${letters.get(id)}. Now choose its ${activity.promptLabel.toLowerCase()}.`);
    dispatch({ type: 'select-answer', id });
  };
  const onDrop = (event: DragEvent<HTMLElement>, answerId: string) => {
    event.preventDefault();
    const promptId = event.dataTransfer.getData(DRAG_TYPE);
    if (!prompts.has(promptId) || !working) return;
    announce(pairAnnouncement(promptId, answerId));
    dispatch({ type: 'pair', promptId, answerId });
  };

  return (
    <ActivityShell activity={activity} state={state} dispatch={dispatch} announcement={announcement} checkHint={`Pair every ${activity.promptLabel.toLowerCase()} to check your answers.`} onNext={onNext} nextLabel={nextLabel}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">{activity.promptLabel}</h3>
          <ul className="flex flex-col gap-2">
            {activity.items.prompts.map((prompt) => {
              const answerId = state.pairs[prompt.id];
              const locked = state.locked.includes(prompt.id);
              const tone = toneForPrompt(prompt.id);
              return (
                <li key={prompt.id} className="flex items-stretch gap-2">
                  <button
                    type="button"
                    data-prompt-id={prompt.id}
                    className={cx(tileClass(tone), 'flex items-start gap-3')}
                    aria-pressed={state.selectedPrompt === prompt.id}
                    disabled={!working || locked}
                    draggable={working && !locked}
                    onDragStart={(event) => { event.dataTransfer.setData(DRAG_TYPE, prompt.id); event.dataTransfer.effectAllowed = 'move'; }}
                    onClick={() => selectPrompt(prompt.id)}
                  >
                    <span aria-hidden="true" className="mt-0.5 w-5 shrink-0 text-xs font-semibold text-[var(--space-text-muted)]">{promptNumbers.get(prompt.id)}</span>
                    <span className="min-w-0 flex-1 font-medium">{prompt.text}</span>
                    {answerId ? <span className="shrink-0 rounded border border-[var(--space-border-strong)] px-1.5 text-xs font-semibold text-[var(--space-text-secondary)]">{letters.get(answerId)}</span> : null}
                    <StatusMark correct={status.get(prompt.id) ?? (locked ? true : undefined)} />
                    <span className="sr-only">{answerId ? `, paired with ${activity.answerLabel.toLowerCase()} ${letters.get(answerId)}` : ', not paired'}</span>
                  </button>
                  {answerId && working && !locked ? (
                    <button type="button" className={BUTTON_ICON} aria-label={`Remove pairing for ${prompt.text}`} onClick={() => { announce(`Removed pairing for ${prompt.text}.`); dispatch({ type: 'unpair', promptId: prompt.id }); }}>
                      <X aria-hidden="true" className="h-4 w-4" />
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">{activity.answerLabel}</h3>
          <ul className="flex flex-col gap-2">
            {answerOrder.map((answerId) => {
              const answer = answers.get(answerId);
              const promptId = promptForAnswer.get(answerId);
              const locked = lockedAnswers.has(answerId);
              return (
                <li key={answerId}>
                  <button
                    type="button"
                    data-answer-id={answerId}
                    className={cx(tileClass(toneForAnswer(answerId)), 'flex items-start gap-3')}
                    aria-pressed={state.selectedAnswer === answerId}
                    disabled={!working || locked}
                    onDragOver={(event) => { if (working && !locked) event.preventDefault(); }}
                    onDrop={(event) => onDrop(event, answerId)}
                    onClick={() => selectAnswer(answerId)}
                  >
                    <span aria-hidden="true" className="mt-0.5 w-5 shrink-0 text-xs font-semibold text-[var(--space-text-muted)]">{letters.get(answerId)}</span>
                    <span className="min-w-0 flex-1 text-[var(--space-text-secondary)]">{answer?.text}</span>
                    {promptId ? <span aria-hidden="true" className="shrink-0 rounded border border-[var(--space-border-strong)] px-1.5 text-xs font-semibold text-[var(--space-text-secondary)]">{promptNumbers.get(promptId)}</span> : null}
                    <span className="sr-only">{`${activity.answerLabel} ${letters.get(answerId)}`}{promptId ? `, paired with ${prompts.get(promptId)?.text}` : ''}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ActivityShell>
  );
}

export function StatusMark({ correct }: { correct: boolean | undefined }) {
  if (correct === undefined) return null;
  return (
    <span className={cx('mt-0.5 shrink-0', correct ? 'text-[var(--space-semantic-success-700)]' : 'text-[var(--space-semantic-danger-700)]')}>
      {correct ? <Check aria-hidden="true" className="h-4 w-4" /> : <X aria-hidden="true" className="h-4 w-4" />}
      <span className="sr-only">{correct ? ', correct' : ', incorrect'}</span>
    </span>
  );
}
