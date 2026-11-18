// Sprint 04G: Knowledge Check auto-advance in Vietnamese, driven through the real LessonAssessmentStage with the same
// draft wiring as assessmentAutoAdvance.test.tsx. A translated check keeps question ids, option ids and the answer key,
// so one click records one answer, the flow advances and scores exactly as in English, and switching EN | VI mid-check
// keeps every answer. Needs react, react-dom and a DOM-like global with localStorage (jsdom preloaded).
import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as core from '../lessonFlowCore';
import type { CheckRecord as CheckRecordT, QuestionLike } from '../lessonFlowCore';
import { LessonAssessmentStage } from '../LessonAssessmentStage';
import { AUTO_ADVANCE_MS } from '../assessmentAutoAdvance';
import { writeLearningLanguage } from '../localization/learningLanguage';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const same = (a: unknown, b: unknown, m: string) => assert(JSON.stringify(a) === JSON.stringify(b), `${m}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
const sleep = (ms: number) => act(async () => { await new Promise((r) => setTimeout(r, ms)); });

const KEY = 'casemate:domain-quiz:vi-test';
const english = (n: number): QuestionLike[] => Array.from({ length: n }, (_, i) => ({ id: `q${i + 1}`, question: `Question ${i + 1}?`, options: ['a', 'b', 'c', 'd'].map((id) => ({ id, text: `Option ${id}` })), correctOptionId: 'a', explanation: 'x', moduleId: '1' }));
/** The same check as the localizer returns it: only display text changes. */
const vietnamese = (n: number): QuestionLike[] => english(n).map((q, i) => ({ ...q, question: `Câu hỏi ${i + 1}?`, options: q.options.map((o) => ({ ...o, text: `Phương án ${o.id}` })), explanation: 'giải thích' }));
const load = (): CheckRecordT => { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : { latest: null, best: null, attempts: [] }; };

let switchLanguage: (language: 'en' | 'vi') => void = () => undefined;

function mount(n: number, language: 'en' | 'vi') {
  writeLearningLanguage(language);
  const container = document.createElement('div'); document.body.appendChild(container);
  const root = createRoot(container);
  function Reader() {
    const [lang, setLang] = useState(language);
    switchLanguage = (next) => { writeLearningLanguage(next); setLang(next); };
    const questions = lang === 'vi' ? vietnamese(n) : english(n);
    const [check, setCheck] = useState<CheckRecordT>(() => core.startOrResumeDraft(load(), questions, 'now'));
    const [result, setResult] = useState<null | string>(null);
    const update = (next: CheckRecordT) => { setCheck(next); localStorage.setItem(KEY, JSON.stringify(next)); };
    if (result) return <div data-testid="result">{result}</div>;
    return (
      <LessonAssessmentStage
        lessonTitle="L" chapterLabel="Chương 1" questions={questions}
        answers={check.draft?.answers ?? {}} index={check.draft?.index ?? 0}
        onSelect={(q, o) => update(core.selectDraftAnswer(check, q, o))}
        onMove={(i) => update(core.moveDraft(check, i))}
        onSubmit={() => { const r = core.submitDraft(check, questions, 'now'); if (!r) return; update(r.record); setResult(`${r.score.correct}/${r.score.total}`); }}
        onExit={() => undefined}
      />
    );
  }
  act(() => root.render(<Reader />));
  const q = (sel: string) => container.querySelector(sel) as HTMLElement | null;
  const click = (el: HTMLElement | null) => { assert(el, 'element missing'); act(() => { el!.dispatchEvent(new MouseEvent('click', { bubbles: true })); }); };
  return {
    container,
    heading: () => container.querySelector('h2')?.textContent ?? '',
    pick: (id: string) => click(q(`[data-testid="option-${id}"]`)),
    option: (id: string) => q(`[data-testid="option-${id}"]`),
    submit: () => click(q('[data-testid="submit-assessment"]')),
    feedback: () => q('[data-testid="answer-feedback"]')?.textContent ?? '',
    progressLabels: () => Array.from(container.querySelectorAll('[role="listitem"]')).map((el) => el.getAttribute('aria-label')),
    progressGroup: () => q('[role="list"]')?.getAttribute('aria-label') ?? '',
    text: () => container.textContent ?? '',
    result: () => q('[data-testid="result"]')?.textContent ?? null,
    unmount: () => act(() => root.unmount()),
  };
}

const cases: Array<{ id: string; name: string; run: () => Promise<void> }> = [
  { id: 'KC-VI-01', name: 'Vietnamese: one click records one answer, confirmation is Vietnamese, then the next question appears', run: async () => {
    const t = mount(3, 'vi');
    same(t.heading(), 'Câu hỏi 1?', 'Vietnamese question shown');
    t.pick('b'); t.pick('c');
    same(load().draft?.answers, { q1: 'b' }, 'only the first click registers');
    assert(t.feedback().startsWith('Đã ghi nhận câu trả lời. Đang chuyển sang câu 2/3'), `Vietnamese confirmation: ${t.feedback()}`);
    assert(!t.feedback().includes('Answer recorded'), 'no English confirmation in Vietnamese');
    same(t.progressGroup(), 'Tiến độ Kiểm tra kiến thức', 'progress group label');
    same(t.progressLabels(), ['Câu 1, đã trả lời', 'Câu 2, chưa trả lời', 'Câu 3, chưa trả lời'], 'progress dot labels');
    await sleep(AUTO_ADVANCE_MS + 150);
    same(t.heading(), 'Câu hỏi 2?', 'advanced');
    t.unmount();
  } },
  { id: 'KC-VI-02', name: 'Vietnamese: final question waits for an explicit Submit; unanswered link and confirmation are Vietnamese', run: async () => {
    const t = mount(3, 'vi');
    t.pick('a'); await sleep(AUTO_ADVANCE_MS + 100);
    act(() => { (t.container.querySelector('[data-testid="assessment-next"]') as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    same(t.heading(), 'Câu hỏi 3?', 'skipped to the final question');
    assert(t.text().includes('Đến câu 2'), 'link to the unanswered question is Vietnamese');
    assert(!t.text().includes('Go to question'), 'no English link');
    t.pick('a');
    await sleep(AUTO_ADVANCE_MS + 300);
    same(t.heading(), 'Câu hỏi 3?', 'final question never advances');
    same(t.feedback(), 'Đã ghi nhận câu trả lời. Bạn có thể đổi đáp án trước khi nộp bài.', 'final confirmation');
    same(load().attempts.length, 0, 'nothing submitted automatically');
    t.unmount();
  } },
  { id: 'KC-VI-03', name: 'same picks score identically in English and Vietnamese (option ids and key unchanged)', run: async () => {
    const run = async (language: 'en' | 'vi') => {
      localStorage.removeItem(KEY);
      const t = mount(3, language);
      t.pick('b'); await sleep(AUTO_ADVANCE_MS + 100); t.pick('a'); await sleep(AUTO_ADVANCE_MS + 100); t.pick('c');
      t.submit();
      const stored = load();
      const out = { result: t.result(), latest: stored.latest, lastAnswers: stored.lastAnswers, lastQuestionIds: stored.lastQuestionIds, attempts: stored.attempts.length };
      t.unmount();
      return out;
    };
    const en = await run('en');
    const vi = await run('vi');
    same(vi, en, 'identical record in both languages');
    same(en, { result: '1/3', latest: 33, lastAnswers: { q1: 'b', q2: 'a', q3: 'c' }, lastQuestionIds: ['q1', 'q2', 'q3'], attempts: 1 }, 'expected score');
  } },
  { id: 'KC-VI-04', name: 'switching VI → EN mid-check keeps the position and every answer; English text is restored', run: async () => {
    localStorage.removeItem(KEY);
    const t = mount(4, 'vi');
    t.pick('d'); await sleep(AUTO_ADVANCE_MS + 100);
    same(t.heading(), 'Câu hỏi 2?', 'at Q2 in Vietnamese');
    act(() => switchLanguage('en'));
    same(t.heading(), 'Question 2?', 'same question, now English');
    same(load().draft?.answers, { q1: 'd' }, 'answer kept across the switch');
    t.pick('b');
    assert(t.feedback().startsWith('Answer recorded. Moving to question 3 of 4'), `English confirmation restored: ${t.feedback()}`);
    same(t.progressLabels()[0], 'Question 1, answered', 'English dot label restored');
    await sleep(AUTO_ADVANCE_MS + 100);
    same([t.heading(), load().draft?.answers], ['Question 3?', { q1: 'd', q2: 'b' }], 'advanced with both answers');
    t.unmount();
  } },
];

export async function runAssessmentAutoAdvanceViTests() {
  assert(typeof document !== 'undefined' && typeof localStorage !== 'undefined', 'needs a DOM-like global with localStorage (preload jsdom)');
  const failures: string[] = [];
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
    writeLearningLanguage('en');
  }
  if (failures.length) throw new Error(`${failures.length} Vietnamese auto-advance case(s) failed`);
  return cases.length;
}

runAssessmentAutoAdvanceViTests();
