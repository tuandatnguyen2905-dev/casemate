// Pure cases (no DOM, no curriculum content): where Return to Lesson goes, and the tab-scoped navigation
// context (practice resume record, practice link, Learning Path focus) across refreshes, mode switches,
// scope changes and lessons. Run from the workspace root: npx -y tsx@4 <this file>.
import { eq, ok, runSuite } from '../../matchSort/__tests__/assert';
import { requestLearningPathFocus, takeLearningPathFocus, takeLearningPathFocusEntry } from '../learningPathFocus';
import {
  PRACTICE_PAGE_LOAD, clearPracticeResume, parsePracticeOrigin, practiceRestoreDecision, readPracticeLink, readPracticeResume, requestPracticeResume, resolvePracticeReturn,
  updatePracticeResumeScope, writePracticeLink, writePracticeResume,
} from '../practiceResume';
import type { PracticeOrigin } from '../practiceResume';

const RESUME_KEY = 'casemate:practice-review:resume:v1';
const FOCUS_KEY = 'casemate:learning-path:focus:v1';

// A browser tab: sessionStorage, the address bar and a history that counts its entries.
const tab = (() => {
  const values = new Map<string, string>();
  const history = { pushes: 0, replaces: 0 };
  let href = 'https://app.example.com/industry-knowledge?dkIndustry=banking-commercial&dkModule=How+the+Industry+Works&dkLesson=1.1';
  const sessionStorage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, String(value)); },
    removeItem: (key: string) => { values.delete(key); },
    clear: () => values.clear(),
  };
  const window = {
    sessionStorage,
    get location() { const url = new URL(href); return { href, search: url.search, pathname: url.pathname }; },
    history: {
      state: null,
      pushState: (_: unknown, __: string, url: URL | string) => { history.pushes += 1; href = String(url); },
      replaceState: (_: unknown, __: string, url: URL | string) => { history.replaces += 1; href = String(url); },
    },
  };
  (globalThis as unknown as { window: typeof window }).window = window;
  return { values, history, reset: () => { values.clear(); history.pushes = 0; history.replaces = 0; } };
})();

const CB_L11 = 'banking-commercial::How the Industry Works::1.1 Industry Definition & Scope';
const CB_L12 = 'banking-commercial::How the Industry Works::1.2 History of Commercial Banking';
const CF_L11 = 'banking-consumer-finance::How the Industry Works::Industry Definition & Scope';
const open = (count: number, closed: number[] = []) => (index: number) => index >= 0 && index < count && !closed.includes(index);
const fromReader = (chapterIndex: number, stage?: 'learning' | 'takeaways'): PracticeOrigin => ({ view: 'reader', chapterIndex, ...(stage ? { stage } : {}) });

/** What the practice dialog writes when the learner switches mode (Change learning mode) or chapter. */
const switchMode = (identity: string, modeId: string, origin?: PracticeOrigin) => {
  const previous = readPracticeResume(identity);
  writePracticeResume({ identity, modeId, scope: previous?.scope ?? 'chapter', chapterOnly: true, origin });
  writePracticeLink(modeId, 2);
};

export const practiceNavigationCases = [
  { name: 'NAV-04/05/10: Return to Lesson from a mode opened in the reader goes back to that reader chapter', run: () => {
    eq(resolvePracticeReturn(fromReader(2), open(5)), { to: 'reader', chapterIndex: 2, stage: 'learning' }, 'entered on Chapter 3: back to Chapter 3, not Chapter 1');
    eq(resolvePracticeReturn(fromReader(0), open(5)), { to: 'reader', chapterIndex: 0, stage: 'learning' }, 'NAV-22 first chapter');
    eq(resolvePracticeReturn(fromReader(4), open(5)), { to: 'reader', chapterIndex: 4, stage: 'learning' }, 'NAV-21 final chapter');
    eq(resolvePracticeReturn(fromReader(4, 'takeaways'), open(5)), { to: 'reader', chapterIndex: 4, stage: 'takeaways' }, 'opened from the takeaways card: back to the takeaways');
  } },
  { name: 'scenario C: a mode opened from the Learning Mode Chooser returns to that chooser on the same chapter', run: () => {
    eq(resolvePracticeReturn({ view: 'chooser', chapterIndex: 3 }, open(5)), { to: 'chooser', chapterIndex: 3 }, 'chooser, chapter 4 — not General Info');
  } },
  { name: 'NAV-16/23: without a valid origin Return to Lesson falls back to the Learning Path, never another chapter', run: () => {
    eq(resolvePracticeReturn(null, open(5)), { to: 'learning-path' }, 'deep link: no origin');
    eq(resolvePracticeReturn(undefined, open(5)), { to: 'learning-path' }, 'older resume record: no origin');
    eq(resolvePracticeReturn(fromReader(7), open(5)), { to: 'learning-path' }, 'chapter no longer in the deck');
    eq(resolvePracticeReturn(fromReader(2), open(5, [2])), { to: 'learning-path' }, 'chapter now held or locked');
    eq(resolvePracticeReturn({ view: 'chooser', chapterIndex: 2 }, open(5, [2])), { to: 'learning-path' }, 'chooser chapter no longer open');
    eq([parsePracticeOrigin({ view: 'reader', chapterIndex: -1 }), parsePracticeOrigin({ view: 'modal', chapterIndex: 1 }), parsePracticeOrigin({ view: 'reader', chapterIndex: 1.5 }), parsePracticeOrigin('reader')], [undefined, undefined, undefined, undefined], 'malformed origins are ignored');
    eq(parsePracticeOrigin({ view: 'reader', chapterIndex: 1, stage: 'check' }), { view: 'reader', chapterIndex: 1 }, 'unknown stage dropped');
  } },
  { name: 'NAV-13/14: the origin survives a refresh with the mode, scope and chapter-only flag; records without one stay readable', run: () => {
    tab.reset();
    writePracticeResume({ identity: CB_L11, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, origin: fromReader(2) });
    const restored = readPracticeResume(CB_L11)!;
    eq([restored.modeId, restored.scope, restored.chapterOnly, restored.origin], ['flashcards', 'chapter', true, { view: 'reader', chapterIndex: 2 }], 'restored after reload');
    tab.values.set(RESUME_KEY, JSON.stringify({ identity: CB_L11, modeId: 'match-sort', scope: 'chapter', chapterOnly: true, at: Date.now() }));
    const legacy = readPracticeResume(CB_L11)!;
    eq([legacy.modeId, 'origin' in legacy], ['match-sort', false], 'pre-origin record still reopens the mode, with no origin');
    tab.values.set(RESUME_KEY, JSON.stringify({ identity: CB_L11, modeId: 'flashcards', origin: fromReader(1), at: Date.now() - 7 * 60 * 60 * 1000 }));
    eq(readPracticeResume(CB_L11), null, 'a stale record restores nothing');
  } },
  { name: 'NAV-11: changing the flashcard scope never changes the navigation origin', run: () => {
    tab.reset();
    writePracticeResume({ identity: CB_L11, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, origin: fromReader(1) });
    updatePracticeResumeScope(CB_L11, 'module');
    const record = readPracticeResume(CB_L11)!;
    eq([record.scope, record.origin], ['module', { view: 'reader', chapterIndex: 1 }], 'module scope, origin still Chapter 2');
    eq(resolvePracticeReturn(record.origin, open(5)), { to: 'reader', chapterIndex: 1, stage: 'learning' }, 'Return to Lesson: Chapter 2');
  } },
  { name: 'NAV-06…09/15: repeated mode switches keep the chapter origin and add no history entries', run: () => {
    tab.reset();
    const origin = fromReader(2);
    writePracticeResume({ identity: CB_L11, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, origin });
    updatePracticeResumeScope(CB_L11, 'lesson');
    ['match-sort', 'flashcards', 'match-sort', 'flashcards', 'match-sort'].forEach((mode) => switchMode(CB_L11, mode, origin));
    const record = readPracticeResume(CB_L11)!;
    eq([record.modeId, record.origin, record.scope], ['match-sort', origin, 'lesson'], 'five switches: same origin, scope kept');
    eq(tab.history.pushes, 0, 'mode switching never pushes a history entry');
    eq(readPracticeLink(), { modeId: 'match-sort', chapterIndex: 2 }, 'the address bar names the open mode and chapter');
    writePracticeLink(null);
    eq([readPracticeLink(), tab.history.pushes], [null, 0], 'leaving practice removes the link in place');
    clearPracticeResume();
    eq(readPracticeResume(CB_L11), null, 'leaving practice clears the record');
  } },
  { name: 'NAV-12/24: navigation context is per lesson identity, so other lessons and curricula never pick it up', run: () => {
    tab.reset();
    writePracticeResume({ identity: CB_L11, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, origin: fromReader(3) });
    eq([readPracticeResume(CB_L12), readPracticeResume(CF_L11)], [null, null], 'another lesson and another curriculum read nothing');
    writePracticeResume({ identity: CF_L11, modeId: 'match-sort', scope: 'chapter', chapterOnly: true, origin: { view: 'chooser', chapterIndex: 0 } });
    eq(readPracticeResume(CB_L11), null, 'the newer lesson replaces the older record');
    eq(readPracticeResume(CF_L11)!.origin, { view: 'chooser', chapterIndex: 0 }, 'Consumer Finance keeps its own origin');
  } },
  { name: 'scenario C on the Learning Path: the lesson card is focused and its chooser reopens on the origin chapter', run: () => {
    tab.reset();
    const module = [CB_L11, CB_L12];
    requestLearningPathFocus(CB_L12, 2);
    eq(takeLearningPathFocusEntry([CF_L11]), null, 'another module ignores it');
    ok(tab.values.has(FOCUS_KEY), 'and leaves it for the right module');
    eq(takeLearningPathFocusEntry(module), { identity: CB_L12, chooserChapter: 2 }, 'card and chooser chapter');
    eq(takeLearningPathFocusEntry(module), null, 'taken once');
    requestLearningPathFocus(CB_L11);
    eq(takeLearningPathFocusEntry(module), { identity: CB_L11 }, 'plain Back: focus only, no chooser');
    requestLearningPathFocus(CB_L11, -1);
    eq(takeLearningPathFocus(module), CB_L11, 'invalid chapter: focus only, through the original API');
    tab.values.set(FOCUS_KEY, JSON.stringify({ identity: CB_L11, chooserChapter: 1, at: Date.now() - 31 * 60 * 1000 }));
    eq([takeLearningPathFocusEntry(module), tab.values.has(FOCUS_KEY)], [null, false], 'stale focus is dropped');
  } },
  { name: 'NAV-R09/R10/R11: a record left from earlier in this page load (Back, Forward, reopening the lesson) never reopens practice', run: () => {
    tab.reset();
    writePracticeResume({ identity: CB_L11, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, origin: fromReader(2) });
    const record = readPracticeResume(CB_L11)!;
    eq([record.pageLoad, 'requested' in record], [PRACTICE_PAGE_LOAD, false], 'every write is stamped with this page load and is not a request');
    eq(practiceRestoreDecision(record, { modeId: 'flashcards' }), 'stale', 'Forward to the lesson entry that still carries dkPractice: stale');
    eq(practiceRestoreDecision(record, null), 'stale', 'reopening the lesson without a link: stale');
    eq(practiceRestoreDecision(null, { modeId: 'flashcards' }), 'none', 'no record: only a deep link can open practice');
  } },
  { name: 'Scenario A: an explicit request reopens practice once, and only while it is fresh', run: () => {
    tab.reset();
    requestPracticeResume({ identity: CB_L11, modeId: 'match-sort', scope: 'chapter', chapterOnly: true, origin: { view: 'chooser', chapterIndex: 1 } });
    const requested = readPracticeResume(CB_L11)!;
    eq([requested.requested, practiceRestoreDecision(requested, null)], [true, 'open'], 'Change learning mode or the chooser: open');
    eq(practiceRestoreDecision(requested, null, requested.at + 3 * 60 * 1000), 'stale', 'a request the lesson never picked up expires');
    writePracticeResume({ identity: CB_L11, modeId: 'match-sort', scope: 'chapter', chapterOnly: true, origin: requested.origin });
    eq(practiceRestoreDecision(readPracticeResume(CB_L11), null), 'stale', 'once the dialog has it, the request is spent');
    requestPracticeResume({ identity: CB_L11, modeId: 'flashcards', scope: 'chapter', chapterOnly: true, origin: fromReader(0) });
    updatePracticeResumeScope(CB_L11, 'module');
    eq(['requested' in readPracticeResume(CB_L11)!, readPracticeResume(CB_L11)!.scope], [false, 'module'], 'a scope change inside practice also spends it');
  } },
  { name: 'NAV-R12/R13 and Scenario E/F: a reload restores only the mode the address bar still names', run: () => {
    tab.reset();
    const before = { identity: CB_L11, modeId: 'flashcards', scope: 'module', chapterOnly: true, origin: fromReader(2), pageLoad: 'an-earlier-page-load', at: Date.now() };
    eq(practiceRestoreDecision(before, { modeId: 'flashcards' }), 'open', 'reload of the Flashcards page: restored, scope and origin with it');
    eq(practiceRestoreDecision(before, { modeId: 'match-sort' }), 'stale', 'the address bar names another mode: ignored');
    eq(practiceRestoreDecision(before, null), 'stale', 'reload of a page with no practice link: ignored');
    eq(practiceRestoreDecision({ ...before, modeId: null }, null), 'stale', 'the Practice & Review overview is not restored by a reload');
    const legacy = { identity: CB_L11, modeId: 'flashcards', at: Date.now() };
    eq(practiceRestoreDecision(legacy, { modeId: 'flashcards' }), 'open', 'a record from before page loads were stamped still restores on its own page');
    eq(resolvePracticeReturn(before.origin, open(2)), { to: 'learning-path' }, 'restored with an origin that no longer exists: Return to Lesson falls back safely');
  } },
];

export const runPracticeNavigationTests = () => runSuite('practice navigation', practiceNavigationCases);
Promise.resolve(runPracticeNavigationTests()).catch((error) => { console.error(error.message); throw error; });
