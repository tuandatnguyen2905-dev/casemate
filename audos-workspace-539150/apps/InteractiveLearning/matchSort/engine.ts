import type {
  ActivityAction,
  ActivityState,
  CategorySortingActivity,
  CheckResult,
  ConceptMatchingActivity,
  MatchingState,
  MatchSortActivity,
  ResultEntry,
  SequenceBuilderActivity,
  SequenceState,
  SortingState,
} from './types';
import { uiCorrectCount, uiNotInGroup, uiNotMatched, uiOutOfPlace, uiPairedCount, uiPlacedCount, uiStepsArranged, uiText } from '../../IndustryKnowledge/localization/uiText';

// Deterministic display order ---------------------------------------------------------------
// Orders are seeded by activity ID so they are stable across renders and tests, and they never
// line up with the answer key before the learner submits.

function hash(text: string): number {
  let state = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    state ^= text.charCodeAt(index);
    state = Math.imul(state, 16777619) >>> 0;
  }
  return state;
}

export function seededOrder<T>(values: T[], seed: string): T[] {
  const copy = [...values];
  let state = hash(seed) || 1;
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0;
    const swap = state % (index + 1);
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function firstOrder<T>(values: T[], seed: string, accept: (order: T[]) => boolean): T[] {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const order = seededOrder(values, `${seed}#${attempt}`);
    if (accept(order)) return order;
  }
  return [...values.slice(1), ...values.slice(0, 1)];
}

/** Answers column order: no answer sits beside its own prompt. */
export function answerDisplayOrder(activity: ConceptMatchingActivity): string[] {
  const promptIndex = new Map(activity.items.prompts.map((prompt, index) => [prompt.id, index]));
  const answerToPrompt = new Map(activity.pairs.map((pair) => [pair.answerId, pair.promptId]));
  const ids = activity.items.answers.map((answer) => answer.id);
  if (ids.length < 2) return ids;
  return firstOrder(ids, activity.activityId, (order) => order.every((id, index) => promptIndex.get(answerToPrompt.get(id) ?? '') !== index));
}

/** Sorting tray order: never grouped by category in authored order. */
export function itemDisplayOrder(activity: CategorySortingActivity): string[] {
  const ids = activity.items.map((item) => item.id);
  if (ids.length < 3) return ids;
  const category = new Map(activity.items.map((item) => [item.id, item.categoryId]));
  return firstOrder(ids, activity.activityId, (order) => order.some((id, index) => id !== ids[index])
    && order.slice(1).some((id, index) => category.get(id) !== category.get(order[index])));
}

/** Starting sequence: no step begins in its correct position. */
export function initialSequence(activity: SequenceBuilderActivity): string[] {
  const correct = activity.correctSequence;
  if (correct.length < 2) return [...correct];
  return firstOrder(correct, activity.activityId, (order) => order.every((id, index) => id !== correct[index]));
}

// Initial state -----------------------------------------------------------------------------

export function initialState(activity: ConceptMatchingActivity): MatchingState;
export function initialState(activity: CategorySortingActivity): SortingState;
export function initialState(activity: SequenceBuilderActivity): SequenceState;
export function initialState(activity: MatchSortActivity): ActivityState;
export function initialState(activity: MatchSortActivity): ActivityState {
  if (activity.type === 'concept-matching') {
    return { kind: 'concept-matching', pairs: {}, selectedPrompt: null, selectedAnswer: null, locked: [], phase: 'working', result: null, checks: 0 };
  }
  if (activity.type === 'category-sorting') {
    return { kind: 'category-sorting', placements: {}, selectedItem: null, locked: [], phase: 'working', result: null, checks: 0 };
  }
  return { kind: 'sequence-builder', order: initialSequence(activity), phase: 'working', result: null, checks: 0, lastMoved: null };
}

// Evaluation --------------------------------------------------------------------------------

function summarise(entries: ResultEntry[], revealed = false): CheckResult {
  const correct = entries.filter((entry) => entry.correct).length;
  return { entries, correct, total: entries.length, allCorrect: entries.length > 0 && correct === entries.length, revealed };
}

export function evaluate(activity: MatchSortActivity, state: ActivityState): CheckResult {
  if (activity.type === 'concept-matching' && state.kind === 'concept-matching') {
    return summarise(activity.pairs.map((pair) => ({ id: pair.promptId, correct: state.pairs[pair.promptId] === pair.answerId })));
  }
  if (activity.type === 'category-sorting' && state.kind === 'category-sorting') {
    return summarise(activity.items.map((item) => ({ id: item.id, correct: state.placements[item.id] === item.categoryId })));
  }
  if (activity.type === 'sequence-builder' && state.kind === 'sequence-builder') {
    return summarise(state.order.map((id, index) => ({ id, correct: activity.correctSequence[index] === id })));
  }
  throw new Error(`State ${state.kind} does not belong to activity type ${activity.type}`);
}

export function canCheck(activity: MatchSortActivity, state: ActivityState): boolean {
  if (state.phase !== 'working') return false;
  if (activity.type === 'concept-matching' && state.kind === 'concept-matching') {
    return activity.items.prompts.every((prompt) => Boolean(state.pairs[prompt.id]));
  }
  if (activity.type === 'category-sorting' && state.kind === 'category-sorting') {
    return activity.items.every((item) => Boolean(state.placements[item.id]));
  }
  return activity.type === 'sequence-builder' && state.kind === 'sequence-builder' && state.order.length === activity.items.length;
}

export function isComplete(state: ActivityState): boolean {
  return state.phase === 'checked' && Boolean(state.result?.allCorrect);
}

export interface ProgressSummary {
  done: number;
  total: number;
  label: string;
}

export function progressOf(activity: MatchSortActivity, state: ActivityState): ProgressSummary {
  if (state.phase === 'checked' && state.result) {
    const { correct, total } = state.result;
    return { done: correct, total, label: uiCorrectCount(correct, total) };
  }
  if (activity.type === 'concept-matching' && state.kind === 'concept-matching') {
    const total = activity.items.prompts.length;
    const done = activity.items.prompts.filter((prompt) => state.pairs[prompt.id]).length;
    return { done, total, label: uiPairedCount(done, total) };
  }
  if (activity.type === 'category-sorting' && state.kind === 'category-sorting') {
    const total = activity.items.length;
    const done = activity.items.filter((item) => state.placements[item.id]).length;
    return { done, total, label: uiPlacedCount(done, total) };
  }
  const total = state.kind === 'sequence-builder' ? state.order.length : 0;
  return { done: total, total, label: uiStepsArranged(total) };
}

// Reducer -----------------------------------------------------------------------------------

const without = (record: Record<string, string>, key: string) => {
  const next = { ...record };
  delete next[key];
  return next;
};

function reduceMatching(activity: ConceptMatchingActivity, state: MatchingState, action: ActivityAction): MatchingState {
  const prompts = new Set(activity.items.prompts.map((item) => item.id));
  const answers = new Set(activity.items.answers.map((item) => item.id));
  const lockedAnswers = new Set(state.locked.map((id) => state.pairs[id]));
  const pair = (s: MatchingState, promptId: string, answerId: string): MatchingState => {
    if (!prompts.has(promptId) || !answers.has(answerId) || s.locked.includes(promptId) || lockedAnswers.has(answerId)) return s;
    const pairs = Object.fromEntries(Object.entries(s.pairs).filter(([, answer]) => answer !== answerId));
    return { ...s, pairs: { ...pairs, [promptId]: answerId }, selectedPrompt: null, selectedAnswer: null };
  };
  if (state.phase === 'checked' && !['retry', 'reveal', 'reset'].includes(action.type)) return state;
  switch (action.type) {
    case 'select-prompt':
      if (!prompts.has(action.id) || state.locked.includes(action.id)) return state;
      if (state.selectedAnswer) return pair(state, action.id, state.selectedAnswer);
      return { ...state, selectedPrompt: state.selectedPrompt === action.id ? null : action.id };
    case 'select-answer':
      if (!answers.has(action.id) || lockedAnswers.has(action.id)) return state;
      if (state.selectedPrompt) return pair(state, state.selectedPrompt, action.id);
      return { ...state, selectedAnswer: state.selectedAnswer === action.id ? null : action.id };
    case 'pair':
      return pair(state, action.promptId, action.answerId);
    case 'unpair':
      if (state.locked.includes(action.promptId)) return state;
      return { ...state, pairs: without(state.pairs, action.promptId) };
    case 'clear-selection':
      return { ...state, selectedPrompt: null, selectedAnswer: null };
    case 'check': {
      if (!canCheck(activity, state)) return state;
      const result = evaluate(activity, state);
      return { ...state, phase: 'checked', result, checks: state.checks + 1, selectedPrompt: null, selectedAnswer: null, locked: result.allCorrect ? [...prompts] : state.locked };
    }
    case 'retry': {
      if (state.phase !== 'checked' || !state.result || state.result.allCorrect) return state;
      const correctIds = state.result.entries.filter((entry) => entry.correct).map((entry) => entry.id);
      const locked = Array.from(new Set([...state.locked, ...correctIds]));
      const pairs = Object.fromEntries(Object.entries(state.pairs).filter(([promptId]) => locked.includes(promptId)));
      return { ...state, phase: 'working', result: null, locked, pairs };
    }
    case 'reveal': {
      if (state.phase !== 'checked' || !state.result || state.result.allCorrect) return state;
      const pairs = Object.fromEntries(activity.pairs.map((item) => [item.promptId, item.answerId]));
      return { ...state, pairs, locked: [...prompts], result: summarise(activity.pairs.map((item) => ({ id: item.promptId, correct: true })), true) };
    }
    case 'reset':
      return initialState(activity);
    default:
      return state;
  }
}

function reduceSorting(activity: CategorySortingActivity, state: SortingState, action: ActivityAction): SortingState {
  const items = new Set(activity.items.map((item) => item.id));
  const categories = new Set(activity.categories.map((category) => category.id));
  const place = (s: SortingState, itemId: string, categoryId: string): SortingState => {
    if (!items.has(itemId) || !categories.has(categoryId) || s.locked.includes(itemId)) return s;
    return { ...s, placements: { ...s.placements, [itemId]: categoryId }, selectedItem: null };
  };
  if (state.phase === 'checked' && !['retry', 'reveal', 'reset'].includes(action.type)) return state;
  switch (action.type) {
    case 'select-item':
      if (!items.has(action.id) || state.locked.includes(action.id)) return state;
      return { ...state, selectedItem: state.selectedItem === action.id ? null : action.id };
    case 'place':
      return place(state, action.itemId, action.categoryId);
    case 'place-selected':
      return state.selectedItem ? place(state, state.selectedItem, action.categoryId) : state;
    case 'unplace':
      if (state.locked.includes(action.itemId)) return state;
      return { ...state, placements: without(state.placements, action.itemId), selectedItem: null };
    case 'clear-selection':
      return { ...state, selectedItem: null };
    case 'check': {
      if (!canCheck(activity, state)) return state;
      const result = evaluate(activity, state);
      return { ...state, phase: 'checked', result, checks: state.checks + 1, selectedItem: null, locked: result.allCorrect ? [...items] : state.locked };
    }
    case 'retry': {
      if (state.phase !== 'checked' || !state.result || state.result.allCorrect) return state;
      const correctIds = state.result.entries.filter((entry) => entry.correct).map((entry) => entry.id);
      const locked = Array.from(new Set([...state.locked, ...correctIds]));
      const placements = Object.fromEntries(Object.entries(state.placements).filter(([itemId]) => locked.includes(itemId)));
      return { ...state, phase: 'working', result: null, locked, placements };
    }
    case 'reveal': {
      if (state.phase !== 'checked' || !state.result || state.result.allCorrect) return state;
      const placements = Object.fromEntries(activity.items.map((item) => [item.id, item.categoryId]));
      return { ...state, placements, locked: [...items], result: summarise(activity.items.map((item) => ({ id: item.id, correct: true })), true) };
    }
    case 'reset':
      return initialState(activity);
    default:
      return state;
  }
}

export function moveInOrder(order: string[], id: string, toIndex: number): string[] {
  const from = order.indexOf(id);
  if (from < 0) return order;
  const target = Math.max(0, Math.min(order.length - 1, Math.trunc(toIndex)));
  if (target === from) return order;
  const next = [...order];
  next.splice(from, 1);
  next.splice(target, 0, id);
  return next;
}

function reduceSequence(activity: SequenceBuilderActivity, state: SequenceState, action: ActivityAction): SequenceState {
  if (state.phase === 'checked' && !['retry', 'reveal', 'reset'].includes(action.type)) return state;
  switch (action.type) {
    case 'move-step': {
      const order = moveInOrder(state.order, action.id, action.toIndex);
      return order === state.order ? state : { ...state, order, lastMoved: action.id };
    }
    case 'move-step-by': {
      const order = moveInOrder(state.order, action.id, state.order.indexOf(action.id) + action.delta);
      return order === state.order ? state : { ...state, order, lastMoved: action.id };
    }
    case 'check': {
      if (!canCheck(activity, state)) return state;
      return { ...state, phase: 'checked', result: evaluate(activity, state), checks: state.checks + 1 };
    }
    case 'retry':
      if (state.phase !== 'checked' || !state.result || state.result.allCorrect) return state;
      return { ...state, phase: 'working', result: null };
    case 'reveal':
      if (state.phase !== 'checked' || !state.result || state.result.allCorrect) return state;
      return { ...state, order: [...activity.correctSequence], lastMoved: null, result: summarise(activity.correctSequence.map((id) => ({ id, correct: true })), true) };
    case 'reset':
      return initialState(activity);
    default:
      return state;
  }
}

export function reduceActivity(activity: MatchSortActivity, state: ActivityState, action: ActivityAction): ActivityState {
  if (activity.type === 'concept-matching' && state.kind === 'concept-matching') return reduceMatching(activity, state, action);
  if (activity.type === 'category-sorting' && state.kind === 'category-sorting') return reduceSorting(activity, state, action);
  if (activity.type === 'sequence-builder' && state.kind === 'sequence-builder') return reduceSequence(activity, state, action);
  return state;
}

// Feedback ----------------------------------------------------------------------------------

export interface FeedbackEntry {
  id: string;
  correct: boolean;
  title: string;
  detail: string;
}

export interface Feedback {
  headline: string;
  allCorrect: boolean;
  revealed: boolean;
  summary: string | null;
  entries: FeedbackEntry[];
}

const quote = (text: string) => `“${text}”`;

/**
 * Correct answers explain why they are right. Incorrect answers get a hint aimed at the
 * misconception and never the answer itself, so the learner can retry.
 */
export function buildFeedback(activity: MatchSortActivity, state: ActivityState): Feedback | null {
  const result = state.result;
  if (state.phase !== 'checked' || !result) return null;
  const headline = result.revealed ? uiText('Answers revealed') : result.allCorrect ? uiText('All correct') : uiCorrectCount(result.correct, result.total);
  const summary = result.allCorrect ? activity.summary : null;
  const byId = new Map(result.entries.map((entry) => [entry.id, entry.correct]));
  let entries: FeedbackEntry[] = [];
  if (activity.type === 'concept-matching' && state.kind === 'concept-matching') {
    const prompts = new Map(activity.items.prompts.map((item) => [item.id, item.text]));
    const answers = new Map(activity.items.answers.map((item) => [item.id, item.text]));
    entries = activity.pairs.map((pair) => {
      const correct = byId.get(pair.promptId) ?? false;
      const prompt = prompts.get(pair.promptId) ?? '';
      return correct
        ? { id: pair.promptId, correct, title: `${prompt} — ${answers.get(pair.answerId) ?? ''}`, detail: pair.explanation }
        : { id: pair.promptId, correct, title: uiNotMatched(prompt, quote(answers.get(state.pairs[pair.promptId]) ?? '')), detail: pair.hint };
    });
  } else if (activity.type === 'category-sorting' && state.kind === 'category-sorting') {
    const categories = new Map(activity.categories.map((category) => [category.id, category.label]));
    entries = activity.items.map((item) => {
      const correct = byId.get(item.id) ?? false;
      const chosen = state.placements[item.id];
      return correct
        ? { id: item.id, correct, title: `${item.text} — ${categories.get(item.categoryId) ?? ''}`, detail: item.explanation }
        : { id: item.id, correct, title: uiNotInGroup(item.text, categories.get(chosen) ?? uiText('that group')), detail: item.misplaced?.[chosen] ?? item.hint };
    });
  } else if (activity.type === 'sequence-builder' && state.kind === 'sequence-builder') {
    const steps = new Map(activity.items.map((step) => [step.id, step]));
    entries = state.order.map((id, index) => {
      const step = steps.get(id);
      const correct = byId.get(id) ?? false;
      return correct
        ? { id, correct, title: `${index + 1}. ${step?.text ?? ''}`, detail: step?.explanation ?? '' }
        : { id, correct, title: uiOutOfPlace(index + 1, quote(step?.text ?? '')), detail: step?.hint ?? '' };
    });
  }
  const ordered = result.allCorrect ? entries : [...entries.filter((entry) => !entry.correct), ...entries.filter((entry) => entry.correct)];
  return { headline, allCorrect: result.allCorrect, revealed: result.revealed, summary, entries: ordered };
}
