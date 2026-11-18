// Requires a DOM (browser or jsdom). The runner provides `document` and `window`.
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import CategorySorting from '../components/CategorySorting';
import ConceptMatching from '../components/ConceptMatching';
import MatchSortSession from '../components/MatchSortSession';
import SequenceBuilder from '../components/SequenceBuilder';
import { COMMERCIAL_BANKING_M01_PACK, activityById } from '../content';
import { initialSequence } from '../engine';
import { MATCH_SORT_STORAGE_KEY, createMemoryPersistence } from '../persistence';
import type { AttemptSummary, CategorySortingActivity, ConceptMatchingActivity, MatchSortAttemptEvent, SequenceBuilderActivity } from '../types';
import { eq, ok, runSuite } from './assert';

const act = (React as unknown as { act: (callback: () => void | Promise<void>) => Promise<void> }).act;
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const matching = activityById('cb-m01-match-banking-mechanics') as ConceptMatchingActivity;
const sorting = activityById('cf-m01-sort-instalment-revolving') as CategorySortingActivity;
const sequence = activityById('cf-m01-seq-credit-lifecycle') as SequenceBuilderActivity;

let root: Root | null = null;
let container: HTMLElement;

async function render(element: React.ReactElement) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => { root!.render(element); });
  return container;
}

async function cleanup() {
  if (root) await act(async () => root!.unmount());
  root = null;
  container?.remove();
}

const $ = <T extends Element = HTMLElement>(selector: string) => {
  const found = container.querySelector<T>(selector);
  if (!found) throw new Error(`Not found: ${selector}`);
  return found;
};
const button = (name: string | RegExp) => {
  const match = Array.from(container.querySelectorAll('button')).find((node) => (typeof name === 'string' ? accessibleName(node) === name : name.test(accessibleName(node))));
  if (!match) throw new Error(`No button named ${name}`);
  return match;
};
const click = async (element: Element) => act(async () => { (element as HTMLElement).click(); });
const key = async (element: Element, init: KeyboardEventInit) => act(async () => { element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, ...init })); });

function accessibleName(element: Element): string {
  const label = element.getAttribute('aria-label');
  if (label) return label.trim();
  return (element.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function dataTransfer() {
  const store = new Map<string, string>();
  return { setData: (type: string, value: string) => { store.set(type, value); }, getData: (type: string) => store.get(type) ?? '', effectAllowed: 'all', dropEffect: 'move' };
}
async function drag(source: Element, target: Element) {
  const transfer = dataTransfer();
  const fire = (node: Element, type: string) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'dataTransfer', { value: transfer });
    node.dispatchEvent(event);
  };
  await act(async () => { fire(source, 'dragstart'); fire(target, 'dragover'); fire(target, 'drop'); });
}

const announcer = () => $('[data-testid="activity-announcer"]').textContent ?? '';
const answerFor = (promptId: string) => matching.pairs.find((pair) => pair.promptId === promptId)!.answerId;

async function pairByClick(promptId: string, answerId: string) {
  await click($(`[data-prompt-id="${promptId}"]`));
  await click($(`[data-answer-id="${answerId}"]`));
}

function setReducedMotion(matches: boolean) {
  (window as unknown as { matchMedia: (query: string) => MediaQueryList }).matchMedia = (query: string) => ({
    matches: matches && query.includes('reduce'), media: query, onchange: null,
    addEventListener: () => undefined, removeEventListener: () => undefined, addListener: () => undefined, removeListener: () => undefined, dispatchEvent: () => false,
  }) as MediaQueryList;
}

const scrollCalls: Array<ScrollIntoViewOptions | boolean | undefined> = [];
Element.prototype.scrollIntoView = function scrollIntoView(options?: ScrollIntoViewOptions | boolean) { scrollCalls.push(options); };

export const componentCases = [
  { name: 'concept matching: tap/click pairing, Escape, check, focus, targeted feedback, retry', run: async () => {
    setReducedMotion(false);
    const attempts: AttemptSummary[] = [];
    await render(<ConceptMatching activity={matching} onAttempt={(attempt) => attempts.push(attempt)} />);
    ok(button('Check answers').disabled, 'check disabled until all pairs exist');
    ok(button('Check answers').getAttribute('aria-describedby'), 'disabled check explains why');
    const first = $('[data-prompt-id="intermediation"]');
    await click(first);
    eq(first.getAttribute('aria-pressed'), 'true', 'prompt selected');
    ok(announcer().includes('Selected Financial intermediation'), 'selection announced');
    await key(first, { key: 'Escape' });
    eq(first.getAttribute('aria-pressed'), 'false', 'Escape clears selection');
    for (const pair of matching.pairs) {
      const swap: Record<string, string> = { 'bank-run': answerFor('capital-adequacy'), 'capital-adequacy': answerFor('bank-run') };
      await pairByClick(pair.promptId, swap[pair.promptId] ?? pair.answerId);
    }
    ok(announcer().startsWith('Paired'), 'pairing announced');
    ok(!button('Check answers').disabled, 'check enabled');
    await click(button('Check answers'));
    const heading = $('[data-testid="activity-feedback"] h3');
    eq(heading.textContent, '4 of 6 correct', 'feedback headline');
    ok(document.activeElement === heading, 'focus moves to feedback');
    eq((scrollCalls[scrollCalls.length - 1] as ScrollIntoViewOptions).behavior, 'smooth', 'smooth scroll without reduced motion');
    eq(announcer(), '4 of 6 correct.', 'result announced');
    const wrong = Array.from(container.querySelectorAll('[data-correct="false"]'));
    eq(wrong.length, 2, 'two incorrect feedback entries');
    wrong.forEach((node) => {
      const promptId = node.getAttribute('data-feedback-id')!;
      const own = matching.items.answers.find((answer) => answer.id === answerFor(promptId))!.text;
      ok(!(node.textContent ?? '').includes(own), `feedback for ${promptId} does not reveal its own answer`);
    });
    ok(!container.querySelector('[data-testid="source-grounding"]'), 'source notes stay hidden before completion');
    eq([attempts.length, attempts[0].correct, attempts[0].allCorrect], [1, 4, false], 'attempt reported');
    await click(button('Try again'));
    ok(($('[data-prompt-id="intermediation"]') as HTMLButtonElement).disabled, 'correct pairs locked after retry');
    ok(!($('[data-prompt-id="bank-run"]') as HTMLButtonElement).disabled, 'incorrect prompts editable after retry');
    ok(!container.querySelector('[data-testid="activity-feedback"]'), 'feedback cleared for the retry');
    await pairByClick('bank-run', answerFor('bank-run'));
    await pairByClick('capital-adequacy', answerFor('capital-adequacy'));
    await click(button('Check answers'));
    eq($('[data-testid="activity-feedback"] h3').textContent, 'All correct', 'completed');
    ok((container.textContent ?? '').includes(matching.summary), 'summary explains the reasoning');
    ok(container.querySelector('[data-testid="source-grounding"]'), 'source notes appear after completion');
    eq([attempts.length, attempts[1].allCorrect], [2, true], 'second attempt reported');
    await click(button('Practise again'));
    eq(container.querySelectorAll('[data-prompt-id][disabled]').length, 0, 'reset unlocks every prompt');
    await cleanup();
  } },
  { name: 'concept matching: mouse drag-and-drop pairs and the unpair control', run: async () => {
    await render(<ConceptMatching activity={matching} />);
    await drag($('[data-prompt-id="credit-creation"]'), $(`[data-answer-id="${answerFor('credit-creation')}"]`));
    ok(($('[data-prompt-id="credit-creation"]').textContent ?? '').includes('paired with'), 'drop creates a pair');
    await click(button('Remove pairing for Credit creation'));
    ok(($('[data-prompt-id="credit-creation"]').textContent ?? '').includes('not paired'), 'unpair control removes it');
    await cleanup();
  } },
  { name: 'category sorting: select-then-place, rearrange, return to tray, drag, check', run: async () => {
    await render(<CategorySorting activity={sorting} />);
    const tray = () => Array.from(container.querySelectorAll('[data-testid="sort-tray"] [data-item-id]'));
    eq(tray().length, sorting.items.length, 'all items start in the tray');
    await click($('[data-item-id="minimum-due"]'));
    await click(button(/^Place here: .* in Instalment credit$/));
    ok($('[data-category-id="instalment"]').querySelector('[data-item-id="minimum-due"]'), 'placed in chosen group');
    await click($('[data-item-id="minimum-due"]'));
    await click(button(/^Place here: .* in Revolving credit$/));
    ok($('[data-category-id="revolving"]').querySelector('[data-item-id="minimum-due"]'), 'moved between groups before submit');
    await click(button(/^Return .* to the items to sort$/));
    eq(tray().length, sorting.items.length, 'returned to tray');
    for (const item of sorting.items) await drag($(`[data-item-id="${item.id}"]`), $(`[data-category-id="${item.categoryId}"]`));
    eq(tray().length, 0, 'drag places items');
    await click(button('Check answers'));
    eq($('[data-testid="activity-feedback"] h3').textContent, 'All correct', 'sorting complete');
    await cleanup();
  } },
  { name: 'sequence builder: move buttons keep focus, Alt+Arrow keys, drag, evidence after completion', run: async () => {
    setReducedMotion(true);
    await render(<SequenceBuilder activity={sequence} />);
    const order = () => Array.from(container.querySelectorAll('[data-step-id]')).map((node) => node.getAttribute('data-step-id'));
    eq(order(), initialSequence(sequence), 'starts in the scrambled order');
    const second = order()[1]!;
    const up = button(`Move ${sequence.items.find((step) => step.id === second)!.text} up`);
    await click(up);
    eq(order()[0], second, 'moved up');
    const focused = document.activeElement as HTMLElement;
    ok(accessibleName(focused).includes('down'), 'focus moves to the down control when the step reaches the top');
    ok(accessibleName(focused).includes(sequence.items.find((step) => step.id === second)!.text), 'focus stays on the moved step');
    ok(announcer().includes('position 1 of'), 'move announced');
    await key(focused, { key: 'ArrowDown', altKey: true });
    eq(order()[1], second, 'Alt+ArrowDown moves the step down');
    ok(!container.querySelector('[data-testid="sequence-evidence"]'), 'sequence evidence hidden before submit');
    for (const [index, id] of sequence.correctSequence.entries()) {
      if (order()[index] !== id) await drag($(`[data-step-id="${id}"]`), $(`[data-step-id="${order()[index]}"]`));
    }
    eq(order(), sequence.correctSequence, 'drag reorders into the key');
    await click(button('Check answers'));
    eq($('[data-testid="activity-feedback"] h3').textContent, 'All correct', 'sequence complete');
    eq((scrollCalls[scrollCalls.length - 1] as ScrollIntoViewOptions).behavior, 'auto', 'reduced motion disables smooth scrolling');
    ok(container.querySelector('[data-testid="sequence-evidence"]'), 'evidence shown after completion');
    await cleanup();
    setReducedMotion(false);
  } },
  { name: 'accessibility, touch targets, reduced-motion CSS and responsive structure', run: async () => {
    for (const element of [<ConceptMatching activity={matching} />, <CategorySorting activity={sorting} />, <SequenceBuilder activity={sequence} />]) {
      await render(element);
      Array.from(container.querySelectorAll('button')).forEach((node) => {
        ok(accessibleName(node).length > 0, `button has an accessible name: ${node.outerHTML.slice(0, 80)}`);
        ok(/\b(min-h-11|h-11)\b/.test(node.className), `button is at least 44px tall: ${accessibleName(node)}`);
      });
      Array.from(container.querySelectorAll('[draggable="true"]')).forEach((node) => ok(node.tagName === 'BUTTON' || node.querySelector('button'), 'every draggable has a button alternative'));
      const bar = $('[role="progressbar"]');
      ok(bar.getAttribute('aria-valuemax') && bar.getAttribute('aria-valuenow') !== null && bar.getAttribute('aria-label'), 'progressbar is labelled');
      eq($('[data-testid="activity-announcer"]').getAttribute('aria-live'), 'polite', 'live region');
      ok($('section[aria-labelledby]'), 'activity region is labelled by its title');
      const css = $('style[data-match-sort-styles]').textContent ?? '';
      ok(css.includes('prefers-reduced-motion: reduce') && css.includes('focus-visible'), 'focus and reduced-motion styles present');
      await cleanup();
    }
    await render(<ConceptMatching activity={matching} />);
    ok(container.querySelector('.md\\:grid-cols-2'), 'matching stacks on mobile and splits on wider screens');
    await cleanup();
  } },
  { name: 'session: navigation, completion, persistence and isolation from Domain Knowledge storage', run: async () => {
    window.localStorage.clear();
    const events: MatchSortAttemptEvent[] = [];
    const persistence = createMemoryPersistence();
    await render(<MatchSortSession pack={COMMERCIAL_BANKING_M01_PACK} persistence={persistence} onAttempt={(event) => events.push(event)} />);
    eq($('[data-testid="session-progress"]').textContent, `0 of ${COMMERCIAL_BANKING_M01_PACK.activities.length} completed`, 'initial pack progress');
    ok(container.querySelector('.lg\\:grid-cols-\\[17rem_minmax\\(0\\,1fr\\)\\]'), 'session uses a responsive two-column layout');
    for (const pair of matching.pairs) await pairByClick(pair.promptId, pair.answerId);
    await click(button('Check answers'));
    eq(events.length, 1, 'attempt event emitted');
    eq([events[0].activityId, events[0].chapterId, events[0].attemptNumber, events[0].attempt.allCorrect], [matching.activityId, matching.chapterId, 1, true], 'event payload');
    ok(persistence.load()[matching.activityId]?.completedAt, 'completion persisted');
    eq($('[data-testid="session-progress"]').textContent, `1 of ${COMMERCIAL_BANKING_M01_PACK.activities.length} completed`, 'pack progress updates');
    await click(button(/^Next activity/));
    const nextId = COMMERCIAL_BANKING_M01_PACK.activities[1].activityId;
    eq($('[data-activity-id]').getAttribute('data-activity-id'), nextId, 'next activity opened');
    ok(button(new RegExp(`^2\\. ${COMMERCIAL_BANKING_M01_PACK.activities[1].title}`)).getAttribute('aria-current') === 'step', 'navigation marks the current activity');
    await cleanup();

    await render(<MatchSortSession pack={COMMERCIAL_BANKING_M01_PACK} />);
    for (const pair of matching.pairs) await pairByClick(pair.promptId, pair.answerId);
    await click(button('Check answers'));
    const keys = Object.keys(window.localStorage);
    eq(keys, [MATCH_SORT_STORAGE_KEY], 'default persistence writes only the practice key');
    ok(keys.every((name) => !name.startsWith('casemate:domain')), 'no Domain Knowledge storage touched');
    await cleanup();
  } },
];

export const runComponentTests = () => {
  if (typeof document === 'undefined') throw new Error('components.test.tsx needs a DOM environment (browser or jsdom).');
  return runSuite('components', componentCases);
};
runComponentTests().catch((error) => { console.error(error.message); throw error; });
