import { activityById } from '../content';
import { answerDisplayOrder, buildFeedback, canCheck, evaluate, initialSequence, initialState, isComplete, itemDisplayOrder, moveInOrder, progressOf, reduceActivity } from '../engine';
import { MATCH_SORT_STORAGE_KEY, createMemoryPersistence, createStoragePersistence, parseProgress, recordAttempt } from '../persistence';
import type { ActivityAction, ActivityState, CategorySortingActivity, ConceptMatchingActivity, MatchingState, MatchSortActivity, SequenceBuilderActivity, SequenceState, SortingState } from '../types';
import { eq, ok, runSuite } from './assert';

const matching = activityById('cb-m01-match-banking-mechanics') as ConceptMatchingActivity;
const sorting = activityById('cf-m01-sort-instalment-revolving') as CategorySortingActivity;
const sequence = activityById('cf-m01-seq-credit-lifecycle') as SequenceBuilderActivity;

const apply = <S extends ActivityState>(activity: MatchSortActivity, state: S, ...actions: ActivityAction[]) => actions.reduce<ActivityState>((current, action) => reduceActivity(activity, current, action), state) as S;
const answerOf = (promptId: string) => matching.pairs.find((pair) => pair.promptId === promptId)!.answerId;
const pairAll = (state: MatchingState, swap?: [string, string]) => {
  let next = state;
  matching.pairs.forEach((pair) => {
    let answerId = pair.answerId;
    if (swap && pair.promptId === swap[0]) answerId = answerOf(swap[1]);
    if (swap && pair.promptId === swap[1]) answerId = answerOf(swap[0]);
    next = apply(matching, next, { type: 'pair', promptId: pair.promptId, answerId });
  });
  return next;
};

export const engineCases = [
  { name: 'display orders are deterministic and never line up with the answer key', run: () => {
    eq(answerDisplayOrder(matching), answerDisplayOrder(matching), 'answer order is stable');
    const order = answerDisplayOrder(matching);
    matching.items.prompts.forEach((prompt, index) => ok(order[index] !== answerOf(prompt.id), `answer for ${prompt.id} is not beside it`));
    const start = initialSequence(sequence);
    start.forEach((id, index) => ok(id !== sequence.correctSequence[index], `step ${id} does not start in place`));
    ok(itemDisplayOrder(sorting).join() !== sorting.items.map((item) => item.id).join(), 'sort tray is shuffled');
  } },
  { name: 'pair matching by prompt-then-answer, answer-then-prompt and re-pairing', run: () => {
    let state = initialState(matching);
    state = apply(matching, state, { type: 'select-prompt', id: 'bank-run' });
    eq(state.selectedPrompt, 'bank-run', 'prompt selected');
    state = apply(matching, state, { type: 'select-answer', id: 'def-bank-run' });
    eq(state.pairs['bank-run'], 'def-bank-run', 'paired after answer selection');
    eq(state.selectedPrompt, null, 'selection cleared after pairing');
    state = apply(matching, state, { type: 'select-answer', id: 'def-credit-creation' }, { type: 'select-prompt', id: 'credit-creation' });
    eq(state.pairs['credit-creation'], 'def-credit-creation', 'answer-first pairing works');
    state = apply(matching, state, { type: 'pair', promptId: 'intermediation', answerId: 'def-bank-run' });
    eq(state.pairs.intermediation, 'def-bank-run', 'answer moved to the new prompt');
    ok(!state.pairs['bank-run'], 'previous prompt released the reused answer');
    state = apply(matching, state, { type: 'unpair', promptId: 'intermediation' });
    ok(!state.pairs.intermediation, 'unpair removes the pairing');
    state = apply(matching, state, { type: 'select-prompt', id: 'bank-run' }, { type: 'clear-selection' });
    eq(state.selectedPrompt, null, 'clear-selection');
    state = apply(matching, state, { type: 'select-prompt', id: 'not-a-prompt' }, { type: 'pair', promptId: 'bank-run', answerId: 'nope' });
    eq(state.selectedPrompt, null, 'unknown IDs are ignored');
  } },
  { name: 'matching check, targeted feedback, retry keeps correct pairs and reset clears all', run: () => {
    let state = initialState(matching);
    ok(!canCheck(matching, state), 'cannot check with nothing paired');
    state = pairAll(state, ['liquidity-transformation', 'maturity-transformation']);
    ok(canCheck(matching, state), 'can check once every prompt is paired');
    state = apply(matching, state, { type: 'check' });
    eq([state.phase, state.result?.correct, state.result?.total, state.checks], ['checked', 4, 6, 1], 'result after first check');
    const feedback = buildFeedback(matching, state)!;
    eq(feedback.headline, '4 of 6 correct', 'headline');
    const wrong = feedback.entries.filter((entry) => !entry.correct);
    eq(wrong.map((entry) => entry.id).sort(), ['liquidity-transformation', 'maturity-transformation'], 'incorrect entries listed first');
    wrong.forEach((entry) => {
      const pair = matching.pairs.find((item) => item.promptId === entry.id)!;
      eq(entry.detail, pair.hint, 'incorrect feedback uses the misconception hint');
      const answer = matching.items.answers.find((item) => item.id === pair.answerId)!.text;
      ok(!entry.title.includes(answer) && !entry.detail.includes(answer), 'incorrect feedback does not reveal the answer');
    });
    feedback.entries.filter((entry) => entry.correct).forEach((entry) => ok(entry.detail === matching.pairs.find((pair) => pair.promptId === entry.id)!.explanation, 'correct feedback explains why'));
    eq(apply(matching, state, { type: 'unpair', promptId: 'bank-run' }).pairs['bank-run'], 'def-bank-run', 'edits are ignored while checked');
    state = apply(matching, state, { type: 'retry' });
    eq(state.phase, 'working', 'retry returns to working');
    eq(state.locked.length, 4, 'correct pairs are locked');
    ok(!state.pairs['liquidity-transformation'] && !state.pairs['maturity-transformation'], 'incorrect pairs are cleared');
    eq(apply(matching, state, { type: 'unpair', promptId: 'bank-run' }).pairs['bank-run'], 'def-bank-run', 'locked pairs cannot be removed');
    eq(apply(matching, state, { type: 'select-prompt', id: 'bank-run' }).selectedPrompt, null, 'locked prompts cannot be selected');
    state = apply(matching, state, { type: 'pair', promptId: 'liquidity-transformation', answerId: 'def-liquidity-transformation' }, { type: 'pair', promptId: 'maturity-transformation', answerId: 'def-maturity-transformation' }, { type: 'check' });
    ok(isComplete(state), 'second check completes the activity');
    eq(buildFeedback(matching, state)?.summary, matching.summary, 'summary shown on completion');
    eq(apply(matching, state, { type: 'retry' }), state, 'retry is a no-op once complete');
    state = apply(matching, state, { type: 'reset' });
    eq([Object.keys(state.pairs).length, state.locked.length, state.checks, state.phase], [0, 0, 0, 'working'], 'reset clears everything');
  } },
  { name: 'reveal is only available after an incomplete check and is flagged', run: () => {
    let state = initialState(matching);
    eq(apply(matching, state, { type: 'reveal' }), state, 'cannot reveal before checking');
    state = apply(matching, pairAll(state, ['bank-run', 'intermediation']), { type: 'check' }, { type: 'reveal' });
    eq([state.result?.allCorrect, state.result?.revealed], [true, true], 'reveal marks all correct and revealed');
    eq(buildFeedback(matching, state)?.headline, 'Answers revealed', 'revealed headline');
  } },
  { name: 'category placement, moving between groups, retry and misconception notes', run: () => {
    let state: SortingState = initialState(sorting);
    state = apply(sorting, state, { type: 'select-item', id: 'minimum-due' }, { type: 'place-selected', categoryId: 'instalment' });
    eq(state.placements['minimum-due'], 'instalment', 'placed via selection');
    state = apply(sorting, state, { type: 'place', itemId: 'minimum-due', categoryId: 'revolving' });
    eq(state.placements['minimum-due'], 'revolving', 'items can be rearranged before submit');
    state = apply(sorting, state, { type: 'unplace', itemId: 'minimum-due' });
    ok(!state.placements['minimum-due'], 'items can return to the tray');
    state = apply(sorting, state, { type: 'place', itemId: 'minimum-due', categoryId: 'ghost' });
    ok(!state.placements['minimum-due'], 'unknown categories are ignored');
    eq(progressOf(sorting, state).label, `0 of ${sorting.items.length} placed`, 'progress label');
    sorting.items.forEach((item) => { state = apply(sorting, state, { type: 'place', itemId: item.id, categoryId: item.id === 'minimum-due' ? 'instalment' : item.categoryId }); });
    state = apply(sorting, state, { type: 'check' });
    eq(state.result?.correct, sorting.items.length - 1, 'one misplaced item');
    const entry = buildFeedback(sorting, state)!.entries[0];
    eq([entry.id, entry.correct], ['minimum-due', false], 'misplaced item reported first');
    eq(entry.detail, sorting.items.find((item) => item.id === 'minimum-due')!.misplaced!.instalment, 'misconception note for the chosen category');
    state = apply(sorting, state, { type: 'retry' });
    ok(!state.placements['minimum-due'] && state.locked.length === sorting.items.length - 1, 'retry returns only the incorrect item');
    state = apply(sorting, state, { type: 'place', itemId: 'minimum-due', categoryId: 'revolving' }, { type: 'check' });
    ok(isComplete(state), 'sorting completes');
  } },
  { name: 'sequence ordering, incorrect positions, retry keeps order', run: () => {
    let state: SequenceState = initialState(sequence);
    eq(evaluate(sequence, state).correct, 0, 'no step starts in its correct position');
    eq(moveInOrder(['a', 'b', 'c'], 'a', 9), ['b', 'c', 'a'], 'move clamps to the end');
    eq(moveInOrder(['a', 'b', 'c'], 'c', -4), ['c', 'a', 'b'], 'move clamps to the start');
    const first = state.order[0];
    eq(apply(sequence, state, { type: 'move-step-by', id: first, delta: -1 }), state, 'moving the first step up is a no-op');
    state = apply(sequence, state, { type: 'move-step-by', id: first, delta: 1 });
    eq(state.order[1], first, 'move down by one');
    eq(state.lastMoved, first, 'last moved recorded');
    sequence.correctSequence.slice(0, 4).forEach((id, index) => { state = apply(sequence, state, { type: 'move-step', id, toIndex: index }); });
    state = apply(sequence, state, { type: 'check' });
    const incorrect = state.result!.entries.filter((entry) => !entry.correct).map((entry) => entry.id);
    ok(state.result!.correct >= 4, 'first four positions correct');
    const before = [...state.order];
    eq(apply(sequence, state, { type: 'move-step', id: before[0], toIndex: 3 }).order, before, 'no moves while checked');
    if (incorrect.length) {
      const feedback = buildFeedback(sequence, state)!;
      ok(feedback.entries[0].title.startsWith('Position '), 'incorrect positions are highlighted first');
      state = apply(sequence, state, { type: 'retry' });
      eq(state.order, before, 'retry keeps the current order');
      sequence.correctSequence.forEach((id, index) => { state = apply(sequence, state, { type: 'move-step', id, toIndex: index }); });
      state = apply(sequence, state, { type: 'check' });
    }
    ok(isComplete(state), 'sequence completes');
    eq(state.order, sequence.correctSequence, 'final order matches key');
  } },
  { name: 'attempt history, completion and storage stay separate from assessments', run: () => {
    let progress = recordAttempt({}, 'a1', { at: 't1', correct: 3, total: 6, allCorrect: false, revealed: false });
    eq([progress.a1.firstCheckAllCorrect, progress.a1.completedAt], [false, undefined], 'first failed check');
    progress = recordAttempt(progress, 'a1', { at: 't2', correct: 6, total: 6, allCorrect: true, revealed: false });
    eq([progress.a1.firstCheckAllCorrect, progress.a1.completedAt, progress.a1.attempts.length], [false, 't2', 2], 'completion recorded once');
    progress = recordAttempt(progress, 'a1', { at: 't3', correct: 6, total: 6, allCorrect: true, revealed: false });
    eq(progress.a1.completedAt, 't2', 'completion time is not overwritten');
    progress = recordAttempt(progress, 'a2', { at: 't4', correct: 6, total: 6, allCorrect: true, revealed: true });
    eq([progress.a2.completedAt, progress.a2.revealedAt], [undefined, 't4'], 'revealed answers do not count as completion');
    for (let index = 0; index < 30; index += 1) progress = recordAttempt(progress, 'a3', { at: `x${index}`, correct: 1, total: 2, allCorrect: false, revealed: false });
    eq(progress.a3.attempts.length, 20, 'attempt history is capped');
    const values = new Map<string, string>();
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
    const store = createStoragePersistence(storage);
    store.save(progress);
    eq(createStoragePersistence(storage).load(), parseProgress(JSON.parse(JSON.stringify(progress))), 'storage round trip');
    eq([...values.keys()], [MATCH_SORT_STORAGE_KEY], 'only the practice key is written');
    ok(!MATCH_SORT_STORAGE_KEY.startsWith('casemate:domain'), 'practice key never collides with Domain Knowledge keys');
    values.set(MATCH_SORT_STORAGE_KEY, '{not json');
    eq(createStoragePersistence(storage).load(), {}, 'corrupt storage falls back to empty');
    const throwing = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
    const resilient = createStoragePersistence(throwing);
    resilient.save(progress);
    eq(resilient.load().a1?.completedAt, 't2', 'blocked storage does not throw and keeps history for the session');
    eq(createMemoryPersistence({ a: { activityId: 'a', attempts: [] } }).load().a.attempts, [], 'memory adapter');
  } },
];

export const runEngineTests = () => runSuite('engine', engineCases);
runEngineTests().catch((error) => { console.error(error.message); throw error; });
