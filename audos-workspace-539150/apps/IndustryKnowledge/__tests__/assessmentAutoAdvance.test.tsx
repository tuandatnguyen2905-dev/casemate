// Knowledge Check auto-advance (Sprint 04 Release A), driven through the real LessonAssessmentStage with the same
// wiring useLessonFlowState gives it: `select` and `move` close over the render's record, so a late timer that
// used stale handlers would overwrite saved answers. Needs react, react-dom and a DOM-like global with localStorage
// (jsdom preloaded), the same setup as lessonFlowReader.test.tsx.
import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as core from '../lessonFlowCore';
import type { CheckRecord as CheckRecordT } from '../lessonFlowCore';
import { LessonAssessmentStage } from '../LessonAssessmentStage';
import { AUTO_ADVANCE_MS, autoAdvanceDelay, planAnswer } from '../assessmentAutoAdvance';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const same = (a: unknown, b: unknown, m: string) => assert(JSON.stringify(a) === JSON.stringify(b), `${m}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

const sleep = (ms: number) => act(async () => { await new Promise((r) => setTimeout(r, ms)); });

const KEY = 'casemate:domain-quiz:test';
const mkQuestions = (n: number) => Array.from({ length: n }, (_, i) => ({ id: `q${i + 1}`, question: `Question ${i + 1}?`, options: ['a', 'b', 'c', 'd'].map((id) => ({ id, text: `Opt ${id}` })), correctOptionId: 'a', explanation: 'x', moduleId: '1' }));
const load = (): CheckRecordT => { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : { latest: null, best: null, attempts: [] }; };

let submits = 0;
function mount(n: number, opts: { breakSelect?: boolean } = {}) {
  const questions = mkQuestions(n);
  const container = document.createElement('div'); document.body.appendChild(container);
  const root = createRoot(container);
  function Reader() {
    const [check, setCheck] = useState<CheckRecordT>(() => core.startOrResumeDraft(load(), questions, 'now'));
    const [result, setResult] = useState<null | { correct: number; total: number }>(null);
    const update = (next: CheckRecordT) => { setCheck(next); localStorage.setItem(KEY, JSON.stringify(next)); };
    if (result) return <div data-testid="result">{result.correct}/{result.total}</div>;
    return (
      <LessonAssessmentStage
        lessonTitle="L" chapterLabel="Chapter 1" questions={questions}
        answers={check.draft?.answers ?? {}} index={check.draft?.index ?? 0}
        onSelect={(q, o) => { if (!opts.breakSelect) update(core.selectDraftAnswer(check, q, o)); }}
        onMove={(i) => update(core.moveDraft(check, i))}
        onSubmit={() => { const r = core.submitDraft(check, questions, 'now'); if (!r) return; submits += 1; update(r.record); setResult({ correct: r.score.correct, total: r.score.total }); }}
        onExit={() => undefined}
      />
    );
  }
  act(() => root.render(<Reader />));
  const q = (sel: string) => container.querySelector(sel) as HTMLElement | null;
  const click = (el: HTMLElement | null) => { assert(el, 'element missing'); act(() => { el!.dispatchEvent(new MouseEvent('click', { bubbles: true })); }); };
  return {
    container, root, questions,
    pos: () => q('[data-testid="assessment-position"]')?.textContent ?? '',
    heading: () => container.querySelector('h2')?.textContent ?? '',
    option: (id: string) => q(`[data-testid="option-${id}"]`),
    pick: (id: string) => click(q(`[data-testid="option-${id}"]`)),
    next: () => click(q('[data-testid="assessment-next"]')),
    prev: () => click(Array.from(container.querySelectorAll('button')).find((b) => b.textContent?.includes('Previous')) as HTMLElement),
    submit: () => click(q('[data-testid="submit-assessment"]')),
    submitDisabled: () => (q('[data-testid="submit-assessment"]') as HTMLButtonElement | null)?.disabled,
    feedback: () => q('[data-testid="answer-feedback"]')?.textContent ?? '',
    result: () => q('[data-testid="result"]')?.textContent ?? null,
    stored: () => load(),
    unmount: () => act(() => root.unmount()),
  };
}

const errors: unknown[] = [];

const cases: Array<{ id: string; name: string; run: () => Promise<void> }> = [
  { id: 'MCQ-A01/A02', name: 'first question: answer registers immediately, next question appears without clicking Next', run: async () => {
    const t = mount(4);
    same(t.heading(), 'Question 1?', 'starts at Q1');
    t.pick('b');
    same(t.stored().draft?.answers, { q1: 'b' }, 'answer persisted at once');
    assert(t.option('b')!.getAttribute('aria-checked') === 'true', 'selection shown');
    assert(t.feedback().includes('Answer recorded'), 'feedback shown');
    same(t.heading(), 'Question 1?', 'still on Q1 during the confirmation');
    await sleep(AUTO_ADVANCE_MS + 150);
    same(t.heading(), 'Question 2?', 'advanced');
    same(t.pos().startsWith('Question 2 of 4'), true, 'numbering updated');
    same(t.stored().draft?.index, 1, 'draft index persisted');
    same(t.stored().draft?.answers, { q1: 'b' }, 'earlier answer not overwritten by the advance');
    same(t.stored().attempts.length, 0, 'nothing submitted');
    t.unmount();
  } },
  { id: 'MCQ-middle', name: 'middle question advances and keeps every earlier answer', run: async () => {
    const t = mount(5);
    for (const o of ['a', 'c', 'd']) { t.pick(o); await sleep(AUTO_ADVANCE_MS + 100); }
    same(t.heading(), 'Question 4?', 'at Q4');
    same(t.stored().draft?.answers, { q1: 'a', q2: 'c', q3: 'd' }, 'all answers kept');
    same(t.stored().attempts.length, 0, 'not submitted');
    t.unmount();
  } },
  { id: 'MCQ-A03/A05', name: 'final question never advances or submits by itself; one explicit Submit makes exactly one attempt', run: async () => {
    submits = 0;
    const t = mount(3);
    t.pick('a'); await sleep(AUTO_ADVANCE_MS + 100); t.pick('b'); await sleep(AUTO_ADVANCE_MS + 100);
    same(t.heading(), 'Question 3?', 'at final question');
    same(t.submitDisabled(), true, 'submit locked until final answer');
    t.pick('a');
    await sleep(AUTO_ADVANCE_MS + 400);
    same(t.heading(), 'Question 3?', 'stays on final question');
    same(t.submitDisabled(), false, 'submit enabled');
    same(t.stored().attempts.length, 0, 'no auto submission');
    assert(t.result() === null, 'no result screen yet');
    t.submit();
    assert(!t.container.querySelector('[data-testid="submit-assessment"]'), 'Submit control is gone once submitted, so a second click cannot create another attempt');
    same(submits, 1, 'one submission only');
    same(t.stored().attempts.length, 1, 'exactly one attempt recorded');
    same(t.result(), '2/3', 'score a,b,a vs key a => 2 of 3 correct');
    t.unmount();
  } },
  { id: 'MCQ-single', name: 'single-question assessment: answer registers, no advance, explicit Submit', run: async () => {
    submits = 0;
    const t = mount(1);
    t.pick('a');
    await sleep(AUTO_ADVANCE_MS + 300);
    same(t.pos().startsWith('Question 1 of 1'), true, 'still Q1 of 1');
    same(t.stored().attempts.length, 0, 'not auto-submitted');
    t.submit();
    same([submits, t.stored().attempts.length, t.result()], [1, 1, '1/1'], 'single explicit submit');
    t.unmount();
  } },
  { id: 'MCQ-rapid', name: 'rapid repeated clicks register one answer and advance exactly one question', run: async () => {
    const t = mount(4);
    t.pick('a'); t.pick('b'); t.pick('c'); t.pick('a');
    same(t.stored().draft?.answers, { q1: 'a' }, 'only the first click registers');
    await sleep(AUTO_ADVANCE_MS + 200);
    same(t.heading(), 'Question 2?', 'advanced once');
    t.pick('b'); t.pick('b');
    await sleep(AUTO_ADVANCE_MS + 200);
    same(t.heading(), 'Question 3?', 'double-tap advances one question, not two');
    same(t.stored().draft?.answers, { q1: 'a', q2: 'b' }, 'one answer per question');
    t.unmount();
  } },
  { id: 'MCQ-nav-during-pending', name: 'Next / progress click during the confirmation cancels the timer, no double move', run: async () => {
    const t = mount(4);
    t.pick('a'); t.next();
    same(t.heading(), 'Question 2?', 'manual Next moved once');
    await sleep(AUTO_ADVANCE_MS + 200);
    same(t.heading(), 'Question 2?', 'cancelled timer did not move again');
    t.pick('a'); t.prev();
    await sleep(AUTO_ADVANCE_MS + 200);
    same(t.heading(), 'Question 1?', 'Previous during confirmation also cancels the advance');
    t.unmount();
  } },
  { id: 'MCQ-keyboard', name: 'keyboard: arrows only move focus (no selection); Enter/Space activation chooses and advances', run: async () => {
    const t = mount(3);
    const first = t.option('a')!;
    first.focus();
    act(() => { first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })); });
    assert(document.activeElement === t.option('b'), 'ArrowDown moves focus to B');
    await sleep(AUTO_ADVANCE_MS + 200);
    same(t.stored().draft?.answers ?? {}, {}, 'arrow keys selected nothing');
    same(t.heading(), 'Question 1?', 'arrow keys did not advance');
    assert(t.option('a')!.tabIndex === 0 && t.option('b')!.tabIndex === -1, 'roving tabindex: one tab stop');
    // Enter / Space on a focused <button> produce a click event.
    t.pick('b');
    await sleep(AUTO_ADVANCE_MS + 150);
    same([t.heading(), t.stored().draft?.answers], ['Question 2?', { q1: 'b' }], 'keyboard-activated choice advances');
    assert(document.activeElement === t.container.querySelector('h2'), 'focus moved to the new question heading');
    t.unmount();
  } },
  { id: 'MCQ-refresh', name: 'refresh mid-assessment and returning to an incomplete assessment resume at the saved question with answers', run: async () => {
    const t = mount(4);
    t.pick('c'); await sleep(AUTO_ADVANCE_MS + 100); t.pick('d'); await sleep(AUTO_ADVANCE_MS + 100);
    t.unmount();
    const again = mount(4);
    same(again.heading(), 'Question 3?', 'resumes at Q3');
    same(again.stored().draft?.answers, { q1: 'c', q2: 'd' }, 'answers intact');
    same(again.option('a')!.getAttribute('aria-checked'), 'false', 'unanswered question has no selection');
    again.prev();
    same(again.option('d')!.getAttribute('aria-checked'), 'true', 'earlier answer shown when going back');
    again.unmount();
  } },
  { id: 'MCQ-refresh-pending', name: 'refresh during the confirmation: answer is saved, timer cleared on unmount, no error', run: async () => {
    errors.length = 0;
    const t = mount(3);
    t.pick('b');
    t.unmount();
    await sleep(AUTO_ADVANCE_MS + 300);
    same(t.stored().draft?.answers, { q1: 'b' }, 'answer survived the refresh');
    same(t.stored().draft?.index, 0, 'index unchanged (no late move after unmount)');
    same(errors.length, 0, 'no React warnings or errors after unmount');
    const again = mount(3);
    same([again.heading(), again.option('b')!.getAttribute('aria-checked')], ['Question 1?', 'true'], 'returning shows the saved answer on Q1');
    again.unmount();
  } },
  { id: 'MCQ-revisit', name: 're-answering an earlier question replaces the answer (still one answer per question) and advances', run: async () => {
    const t = mount(4);
    t.pick('a'); await sleep(AUTO_ADVANCE_MS + 100); t.prev();
    same(t.heading(), 'Question 1?', 'back at Q1');
    t.pick('c'); await sleep(AUTO_ADVANCE_MS + 100);
    same([t.heading(), t.stored().draft?.answers], ['Question 2?', { q1: 'c' }], 'replaced and advanced');
    t.unmount();
  } },
  { id: 'MCQ-validation', name: 'answer that cannot be stored never advances; foreign option ids are ignored', run: async () => {
    const t = mount(3, { breakSelect: true });
    t.pick('a');
    await sleep(AUTO_ADVANCE_MS + 200);
    same(t.heading(), 'Question 1?', 'stays when the draft did not accept the answer');
    same(t.feedback(), '', 'no false confirmation afterwards');
    t.unmount();
    same(planAnswer(mkQuestions(1)[0], 'zzz', 0, 3, false), { accept: false, advanceTo: null }, 'unknown option rejected');
    same(planAnswer(mkQuestions(1)[0], 'a', 0, 3, true), { accept: false, advanceTo: null }, 'pending rejects');
    same(planAnswer(mkQuestions(1)[0], 'a', 2, 3, false), { accept: true, advanceTo: null }, 'final question: accept, no advance');
    same(planAnswer(undefined, 'a', 0, 3, false), { accept: false, advanceTo: null }, 'missing question rejected');
  } },
  { id: 'MCQ-reduced-motion', name: 'prefers-reduced-motion: no transitions, slightly longer confirmation, still advances', run: async () => {
    (window as any).matchMedia = () => ({ matches: true });
    try {
      same(autoAdvanceDelay(true) > AUTO_ADVANCE_MS, true, 'reduced delay is longer');
      const t = mount(3);
      assert(t.option('a')!.className.includes('motion-reduce:transition-none'), 'transitions disabled under reduced motion');
      t.pick('a');
      await sleep(AUTO_ADVANCE_MS + 60);
      same(t.heading(), 'Question 1?', 'not yet at 560ms');
      await sleep(250);
      same(t.heading(), 'Question 2?', 'advanced after the reduced-motion delay');
      t.unmount();
    } finally { delete (window as any).matchMedia; }
  } },
  { id: 'MCQ-A04', name: 'scoring identical to the existing mechanism (wrong, right, wrong)', run: async () => {
    submits = 0;
    const t = mount(3);
    t.pick('b'); await sleep(AUTO_ADVANCE_MS + 100); t.pick('a'); await sleep(AUTO_ADVANCE_MS + 100); t.pick('c');
    t.submit();
    same(t.result(), '1/3', '1 of 3');
    same(t.stored().latest, 33, 'latest accuracy stored');
    same(t.stored().lastAnswers, { q1: 'b', q2: 'a', q3: 'c' }, 'answers stored as chosen');
    t.unmount();
  } },
];

export async function runAssessmentAutoAdvanceTests() {
  assert(typeof document !== 'undefined' && typeof localStorage !== 'undefined', 'needs a DOM-like global with localStorage (preload jsdom)');
  const failures: string[] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => { errors.push(args); };
  try {
    for (const item of cases) {
      localStorage.clear();
      document.body.innerHTML = '';
      try {
        await item.run();
        console.log(`PASS ${item.id} ${item.name}`);
      } catch (error) {
        failures.push(`${item.id}: ${(error as Error).message}`);
        console.log(`FAIL ${item.id} ${item.name}: ${(error as Error).message}`);
      }
    }
  } finally {
    console.error = originalError;
  }
  if (failures.length) throw new Error(`${failures.length} auto-advance case(s) failed`);
  return cases.length;
}

runAssessmentAutoAdvanceTests();
