// Essential Terms (Sprint 04E): data integrity, safe inline lookup, lesson-entry preview, reader reopen,
// term sheet, language fallback and lessons without glossary content. Self-running like the other suites
// here: needs react, react-dom, lucide-react and a DOM-like global (jsdom preloaded).
import { act, createElement, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { LessonFlowContext } from '../lessonFlow';
import type { LessonFlowValue } from '../lessonFlow';
import { GLOSSARY_INDEX, hasLessonGlossary, normalizeLessonTitle, parseLessonIdentity, resolveGlossaryRef } from '../glossary/glossaryIndex';
import { loadLessonGlossary, peekLessonGlossary, resetGlossaryCache } from '../glossary/glossaryStore';
import { buildMatchers, searchKey, segmentText } from '../glossary/glossaryMatch';
import { GLOSSARY_LANGUAGE_KEY, writeGlossaryLanguage } from '../glossary/glossaryLanguage';
import { definitionFor } from '../glossary/TermCard';
import { EssentialTermsReaderButton, GlossaryText, PREVIEW_SEEN_KEY, PREVIEW_SKIPPED_KEY, shouldAutoOpenEssentialTerms, useEssentialTermsEntry } from '../glossary/EssentialTermsEntry';
import { resetTermClaims } from '../glossary/TermPopover';
import { glossaryCoverage, loadAllGlossaries } from '../glossary/glossaryCoverage';
import type { CoverageCatalog } from '../glossary/glossaryCoverage';
import { FINANCE_SHARED_TERMS } from '../glossary/data/financeSharedTerms';
import type { CurriculumGlossaryData } from '../glossary/glossaryTypes';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const CB_11 = 'banking-commercial::How the Industry Works::1.1 Industry Definition & Scope';
const CB_22 = 'banking-commercial::How Value Moves Through the Industry::2.2 Upstream Activities';
const CB_54 = 'banking-commercial::What Is Changing Next::5.4 Regulatory & Sustainability Trends';
const CF_34 = 'banking-consumer-finance::How Companies Make Money::Revenue Streams & Cost Structure';
const OTHER = 'fmcg-dairy::How the Industry Works::Industry Definition & Scope';

const results: Array<{ id: string; name: string; ok: boolean; error?: string }> = [];
function ok(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
async function check(id: string, name: string, run: () => void | Promise<void>) {
  try {
    await run();
    results.push({ id, name, ok: true });
  } catch (error) {
    results.push({ id, name, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
}

const flow = (identity: string): LessonFlowValue => ({ identity, isFirst: true, pending: false, previous: null, next: null });

async function mount(node: ReactNode) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  await act(async () => { root.render(node); });
  await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
  return {
    host,
    rerender: async (next: ReactNode) => { await act(async () => { root.render(next); }); },
    unmount: async () => { await act(async () => { root.unmount(); }); host.remove(); },
  };
}

const flush = () => act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
const click = async (element: Element | null | undefined) => {
  ok(element, 'element to click was not found');
  await act(async () => { (element as HTMLElement).click(); });
  await flush();
};
const key = async (name: string, target: EventTarget = document, shiftKey = false) => {
  await act(async () => { target.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, shiftKey })); });
};
const byTestId = (id: string) => document.body.querySelector(`[data-testid="${id}"]`);
const byTestIdAll = (id: string) => Array.from(document.body.querySelectorAll(`[data-testid="${id}"]`));

function resetStorage() {
  window.localStorage.removeItem(PREVIEW_SEEN_KEY);
  window.sessionStorage.removeItem(PREVIEW_SKIPPED_KEY);
  window.localStorage.removeItem(GLOSSARY_LANGUAGE_KEY);
  resetTermClaims();
}

function EntryHarness({ identity, onProceed, auto }: { identity: string; onProceed: () => void; auto?: boolean }) {
  const entry = useEssentialTermsEntry();
  const [chooserOpen, setChooserOpen] = useState(false);
  return createElement('div', null,
    createElement('button', { type: 'button', 'data-testid': 'start-lesson', onClick: (event: { currentTarget: HTMLButtonElement }) => entry.open(identity, () => { onProceed(); setChooserOpen(true); }, { trigger: event.currentTarget, auto }) }, 'Start Learning'),
    entry.element,
    chooserOpen ? createElement('div', { 'data-testid': 'learning-mode-chooser-stub' }, 'chooser') : null,
  );
}

export async function runGlossaryEssentialTerms() {
  const all = await loadAllGlossaries();
  const byId = new Map<string, CurriculumGlossaryData>(all.map((data) => [data.curriculumId, data]));
  const cb = byId.get('commercial-banking')!;
  const cf = byId.get('consumer-finance')!;

  // Data integrity -------------------------------------------------------------------------
  await check('GL-10', 'shared definitions are one object reused across sub-industries', () => {
    const costOfRisk = FINANCE_SHARED_TERMS.find((term) => term.id === 'fin.cost-of-risk');
    ok(costOfRisk && cb.terms.includes(costOfRisk) && cf.terms.find((term) => term.id === 'fin.cost-of-risk') === costOfRisk, 'cost of risk is not the same shared object in Commercial Banking and Consumer Finance');
    const seen = new Map<string, unknown>();
    all.forEach((data) => {
      ok(new Set(data.terms.map((term) => term.id)).size === data.terms.length, `${data.curriculumId} lists a term twice`);
      data.terms.forEach((term) => {
        if (seen.has(term.id)) ok(seen.get(term.id) === term, `${term.id} is redefined in ${data.curriculumId} instead of reusing the shared entry`);
        seen.set(term.id, term);
      });
    });
  });

  await check('GL-12', 'every term traces to sources that exist in its curriculum', () => {
    all.forEach((data) => data.terms.forEach((term) => {
      term.sourceIds.forEach((sourceId) => ok(data.sources.some((source) => source.id === sourceId), `${data.curriculumId}/${term.id} cites missing source ${sourceId}`));
    }));
    all.forEach((data) => data.sources.forEach((source) => ok(!source.url || /^https:\/\/[^\s]+$/.test(source.url), `${source.id} has a malformed URL`)));
  });

  await check('GL-13', 'no term without a source is marked verified', () => {
    all.forEach((data) => data.terms.forEach((term) => {
      if (!term.sourceIds.length) ok(term.verificationStatus !== 'verified', `${term.id} is verified without a source`);
      if (term.verificationStatus !== 'verified') ok(Boolean(term.reviewNote), `${term.id} needs a review note explaining what is pending`);
    }));
  });

  await check('GL-11', 'ambiguous acronyms are flagged and never auto-annotated', () => {
    all.forEach((data) => {
      const forms = buildMatchers(data.terms).map((matcher) => matcher.form);
      ok(!forms.includes('LTV'), `${data.curriculumId} would annotate the ambiguous acronym LTV`);
    });
    const ltvFlags = all.filter((data) => (data.flaggedAcronyms ?? []).some((item) => item.acronym === 'LTV' && item.status === 'ambiguous'));
    ok(ltvFlags.length >= 2, 'LTV is not flagged as ambiguous');
    const underwriting = all.flatMap((data) => data.terms.filter((term) => term.aliases?.includes('underwriting')).map((term) => term.id));
    ok(underwriting.includes('fin.credit-underwriting') && underwriting.includes('li.underwriting'), 'credit and insurance underwriting are not separate, context-specific entries');
  });

  await check('GL-01b', 'every lesson preview has 1-15 curated terms that are all mapped to chapters', () => {
    all.forEach((data) => data.lessons.forEach((lesson) => {
      ok(lesson.essential.length > 0 && lesson.essential.length <= 15, `${data.curriculumId} ${lesson.key} has ${lesson.essential.length} essential terms`);
      lesson.essential.forEach((id) => ok(Object.values(lesson.chapters).some((ids) => ids.includes(id)), `${data.curriculumId} ${lesson.key}: ${id} is essential but mapped to no chapter`));
    }));
  });

  await check('GL-15', 'identity resolution keeps lesson identities untouched and tolerates numbering', () => {
    ok(parseLessonIdentity(CB_11)?.lessonTitle === '1.1 Industry Definition & Scope', 'identity parsing changed the lesson title');
    ok(normalizeLessonTitle('2.2 Upstream Activities') === normalizeLessonTitle('Upstream Activities'), 'numbered and plain titles differ');
    ok(resolveGlossaryRef(CB_22)?.lessonKey === '2.2', 'Commercial Banking 2.2 not resolved');
    ok(resolveGlossaryRef(CF_34)?.lessonKey === '3.4', 'Consumer Finance 3.4 not resolved');
    ok(!hasLessonGlossary(CB_54), 'held lesson 5.4 must not have a glossary');
    ok(!hasLessonGlossary(OTHER), 'an industry without authored content resolved a glossary');
    ok(!hasLessonGlossary('not-an-identity'), 'malformed identity resolved a glossary');
  });

  await check('GL-15b', 'a curriculum title map resolves its own titles without leaking into other curricula', () => {
    const retail = { ...GLOSSARY_INDEX[0], curriculumId: 'retail-test', industryIds: ['retail-test'], lessonKeys: ['2.2', '2.5'], lessonTitleKeys: { 'Sourcing & Supplier Partnerships': '2.2' } };
    const index = [retail];
    ok(resolveGlossaryRef('retail-test::How Value Moves Through the Industry::2.2 Sourcing & Supplier Partnerships', index)?.lessonKey === '2.2', 'curriculum title not resolved');
    ok(!resolveGlossaryRef('retail-test::How Value Moves Through the Industry::Upstream Activities', index), 'blueprint title resolved to a key the curriculum gives another lesson');
    ok(resolveGlossaryRef('retail-test::How Value Moves Through the Industry::Inputs, Outputs & Value Creation', index)?.lessonKey === '2.5', 'blueprint title stopped resolving');
    ok(!resolveGlossaryRef('banking-commercial::How Value Moves Through the Industry::Sourcing & Supplier Partnerships'), 'a curriculum title map leaked into another curriculum');
  });

  // Matching safety ------------------------------------------------------------------------
  await check('GL-06a', 'inline matching is whole-word, case-safe for acronyms and once per block', () => {
    const matchers = buildMatchers([
      { id: 'nim', term: 'Net interest margin', acronym: 'NIM' },
      { id: 'casa', term: 'CASA', aliases: ['CASA deposits'] },
      { id: 'casa-ratio', term: 'CASA ratio' },
    ]);
    const text = 'NIMBY is not NIM. casa is Spanish. The CASA ratio rose; CASA deposits and NIM rose again.';
    const segments = segmentText(text, matchers);
    const marked = segments.filter((segment) => segment.termId).map((segment) => `${segment.termId}:${segment.text}`);
    ok(segments.map((segment) => segment.text).join('') === text, 'segmentation changed the text');
    ok(marked.join('|') === 'nim:NIM|casa-ratio:CASA ratio|casa:CASA deposits', `unexpected annotations ${marked.join('|')}`);
  });

  await check('GL-22', 'matching a long chapter stays fast and the lesson glossary is cached', async () => {
    const glossary = await loadLessonGlossary(CB_22);
    ok(glossary, 'Commercial Banking 2.2 glossary did not load');
    ok(peekLessonGlossary(CB_22) === glossary, 'lesson glossary was rebuilt instead of cached');
    const matchers = buildMatchers(glossary.terms);
    const paragraph = 'Banks with a strong CASA base enjoy a lower cost of funds, which supports NIM and liquidity. '.repeat(250);
    const started = Date.now();
    for (let index = 0; index < 20; index += 1) segmentText(paragraph, matchers);
    ok(Date.now() - started < 1500, `20 passes over ${paragraph.length} characters took ${Date.now() - started} ms`);
    GLOSSARY_INDEX.forEach((entry) => ok(typeof entry.load === 'function', `${entry.curriculumId} data is not lazily loaded`));
  });

  await check('GL-21a', 'search is accent-insensitive', () => {
    ok(searchKey('Nợ xấu (NPL)').includes('no xau'), 'Vietnamese search key failed');
  });

  // Language -------------------------------------------------------------------------------
  await check('GL-08', 'Vietnamese view falls back to English when no Vietnamese exists', async () => {
    const glossary = await loadLessonGlossary(CB_11);
    const term = { ...glossary!.terms[0], definitionVi: undefined };
    ok(definitionFor(term, 'vi').fallback && definitionFor(term, 'vi').text === term.definitionEn, 'missing Vietnamese did not fall back to English');
    ok(definitionFor(glossary!.terms[0], 'vi').text === glossary!.terms[0].definitionVi, 'Vietnamese definition not used');
    const casa = cb.terms.find((item) => item.id === 'cb.casa');
    ok(casa?.definitionVi?.includes('CASA'), 'the established abbreviation CASA is not kept in the Vietnamese explanation');
    const icbc = cb.terms.find((item) => item.id === 'cb.icbc');
    ok(icbc?.fullForm === 'Industrial and Commercial Bank of China Ltd.' && icbc.category === 'institutions', 'ICBC is not identified as the actual institution');
  });

  // Lesson entry preview --------------------------------------------------------------------
  await check('GL-01', 'Essential Terms preview appears at lesson entry with the required copy', async () => {
    resetStorage();
    let proceeded = 0;
    const view = await mount(createElement(EntryHarness, { identity: CB_11, onProceed: () => { proceeded += 1; } }));
    await click(byTestId('start-lesson'));
    await flush();
    const preview = byTestId('essential-terms-preview');
    ok(preview, 'preview did not open');
    ok(preview.textContent?.includes('Essential Terms') && preview.textContent.includes('Before You Start'), 'heading or subhead missing');
    ok(preview.textContent?.includes('New to this topic? Here are the key terms worth knowing before you dive in.'), 'intro copy missing');
    ok(byTestIdAll('glossary-term').length === 5, `expected 5 curated terms, saw ${byTestIdAll('glossary-term').length}`);
    ok(proceeded === 0 && !byTestId('learning-mode-chooser-stub'), 'chooser opened before the learner chose');
    await click(byTestId('essential-terms-show-more'));
    ok(byTestIdAll('glossary-term').length > 5, 'Show more did not expand the curated list');
    await view.unmount();
  });

  await check('GL-02', 'Start Learning continues to the learning mode chooser and stops auto-opening', async () => {
    resetStorage();
    let proceeded = 0;
    const view = await mount(createElement(EntryHarness, { identity: CB_11, onProceed: () => { proceeded += 1; } }));
    await click(byTestId('start-lesson'));
    await click(byTestId('essential-terms-start'));
    ok(proceeded === 1, `proceed ran ${proceeded} times`);
    ok(!byTestId('essential-terms-preview') && byTestId('learning-mode-chooser-stub'), 'chooser did not replace the preview');
    ok(!shouldAutoOpenEssentialTerms(CB_11), 'preview would auto-open again after Start Learning');
    const progress = window.localStorage.getItem('casemate:domain-lesson-progress:v1');
    ok(!progress || !progress.includes('glossary'), 'glossary wrote into lesson progress');
    await view.unmount();
  });

  await check('GL-03', 'Skip for Now continues and pauses the preview for this session only', async () => {
    resetStorage();
    let proceeded = 0;
    const view = await mount(createElement(EntryHarness, { identity: CB_22, onProceed: () => { proceeded += 1; } }));
    await click(byTestId('start-lesson'));
    await click(byTestId('essential-terms-skip'));
    ok(proceeded === 1 && byTestId('learning-mode-chooser-stub'), 'Skip for Now did not continue to the chooser');
    ok(!shouldAutoOpenEssentialTerms(CB_22), 'skipped preview would reopen in the same session');
    ok(!window.localStorage.getItem(PREVIEW_SEEN_KEY)?.includes(CB_22), 'Skip for Now was stored permanently');
    await view.unmount();
  });

  await check('GL-05', 'closing the preview cancels entry; re-entry on return bypasses it', async () => {
    resetStorage();
    const proceeded = { count: 0 };
    const view = await mount(createElement(EntryHarness, { identity: CB_11, onProceed: () => { proceeded.count += 1; } }));
    await click(byTestId('start-lesson'));
    await key('Escape');
    await flush();
    ok(!byTestId('essential-terms-preview') && proceeded.count === 0, 'Escape did not close the preview without entering the lesson');
    await view.unmount();
    const reopen = await mount(createElement(EntryHarness, { identity: CB_11, onProceed: () => { proceeded.count += 1; }, auto: false }));
    await click(byTestId('start-lesson'));
    ok((proceeded.count as number) === 1 && !byTestId('essential-terms-preview'), 'programmatic re-entry showed the preview');
    await reopen.unmount();
  });

  await check('GL-14', 'lessons without glossary content go straight to the chooser and render nothing extra', async () => {
    resetStorage();
    for (const identity of [OTHER, CB_54]) {
      let proceeded = 0;
      const view = await mount(createElement(EntryHarness, { identity, onProceed: () => { proceeded += 1; } }));
      await click(byTestId('start-lesson'));
      ok(proceeded === 1 && !byTestId('essential-terms-preview'), `${identity} showed a preview or did not continue`);
      await view.unmount();
      const reader = await mount(createElement(LessonFlowContext.Provider, { value: flow(identity) },
        createElement(EssentialTermsReaderButton, { chapterIndex: 0 }),
        createElement('p', { 'data-testid': 'plain' }, createElement(GlossaryText, { text: 'NIM and CASA matter.', chapterIndex: 0, blockKey: 'What it is' }))));
      ok(!byTestId('essential-terms-reader-button'), `${identity} rendered a reader button`);
      ok(byTestId('plain')?.innerHTML === 'NIM and CASA matter.', 'text without glossary changed');
      await reader.unmount();
    }
  });

  await check('GL-04', 'reader button reopens the term sheet with chapter, lesson and module scopes', async () => {
    resetStorage();
    await loadLessonGlossary(CB_22);
    const view = await mount(createElement(LessonFlowContext.Provider, { value: flow(CB_22) }, createElement(EssentialTermsReaderButton, { chapterIndex: 1 })));
    await click(byTestId('essential-terms-reader-button'));
    ok(byTestId('glossary-term-sheet'), 'term sheet did not open');
    ok(byTestId('glossary-scope-chapter')?.getAttribute('aria-pressed') === 'true', 'chapter scope is not the default');
    const chapterCount = byTestIdAll('glossary-term').length;
    await click(byTestId('glossary-scope-lesson'));
    ok(byTestIdAll('glossary-term').length > chapterCount, 'lesson scope did not show more terms than the chapter');
    await click(byTestId('glossary-scope-module'));
    ok(byTestIdAll('glossary-term').length >= chapterCount, 'module scope missing');
    const headings = Array.from(byTestId('glossary-term-list')!.querySelectorAll('section h3')).map((node) => node.textContent);
    ok(headings.length > 0 && headings.every((text) => Boolean(text)), 'category headings missing');
    await key('Escape');
    ok(!byTestId('glossary-term-sheet'), 'Escape did not close the term sheet');
    ok(document.activeElement === byTestId('essential-terms-reader-button'), 'focus did not return to the reader button');
    await view.unmount();
  });

  await check('GL-21', 'long term lists scroll and search by acronym or Vietnamese', async () => {
    resetStorage();
    await loadLessonGlossary(CB_22);
    const view = await mount(createElement(LessonFlowContext.Provider, { value: flow(CB_22) }, createElement(EssentialTermsReaderButton, { chapterIndex: 0 })));
    await click(byTestId('essential-terms-reader-button'));
    await click(byTestId('glossary-scope-lesson'));
    ok(byTestId('glossary-term-list')?.className.includes('overflow-y-auto'), 'term list does not scroll independently');
    const input = byTestId('glossary-search') as HTMLInputElement;
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    await act(async () => { setValue.call(input, 'vốn huy động'); input.dispatchEvent(new Event('input', { bubbles: true })); });
    const ids = byTestIdAll('glossary-term').map((node) => node.getAttribute('data-term-id'));
    ok(ids.includes('fin.cost-of-funds'), `Vietnamese search did not find cost of funds (${ids.join(',')})`);
    await act(async () => { setValue.call(input, 'zzzz-no-match'); input.dispatchEvent(new Event('input', { bubbles: true })); });
    ok(byTestId('glossary-term-list')?.textContent?.includes('No terms match'), 'empty search state missing');
    await view.unmount();
  });

  await check('GL-08b', 'language toggle switches definitions between EN, VI and both', async () => {
    resetStorage();
    await loadLessonGlossary(CB_22);
    const view = await mount(createElement(LessonFlowContext.Provider, { value: flow(CB_22) }, createElement(EssentialTermsReaderButton, { chapterIndex: 0 })));
    await click(byTestId('essential-terms-reader-button'));
    const first = () => byTestIdAll('glossary-term')[0];
    ok(first().querySelector('[lang="vi"]'), 'default view should show the Vietnamese explanation');
    await act(async () => { writeGlossaryLanguage('en'); });
    ok(!first().querySelector('[lang="vi"]') && !/[ăâđêôơư]/i.test(first().textContent ?? ''), 'English view still shows Vietnamese');
    await act(async () => { writeGlossaryLanguage('vi'); });
    ok(/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(first().textContent ?? ''), 'Vietnamese view shows no Vietnamese');
    await view.unmount();
  });

  // Inline lookup ---------------------------------------------------------------------------
  await check('GL-06', 'recognised terms open a popover in place; one annotation per term per chapter', async () => {
    resetStorage();
    await loadLessonGlossary(CB_22);
    const view = await mount(createElement(LessonFlowContext.Provider, { value: flow(CB_22) },
      createElement('p', { 'data-testid': 'para-a' }, createElement(GlossaryText, { text: 'A higher CASA ratio lowers the cost of funds and lifts NIM.', chapterIndex: 1, blockKey: 'What it is' })),
      createElement('p', { 'data-testid': 'para-b' }, createElement(GlossaryText, { text: 'NIM again, and the cost of funds again.', chapterIndex: 1, blockKey: 'How it works' })),
      createElement('p', { 'data-testid': 'para-c' }, createElement(GlossaryText, { text: createElement('strong', null, 'NIM inside JSX'), chapterIndex: 1, blockKey: 'Why it matters' }))));
    const triggers = (testId: string) => Array.from(byTestId(testId)!.querySelectorAll('[data-testid="glossary-term-trigger"]')).map((node) => node.getAttribute('data-term-id'));
    ok(triggers('para-a').join(',') === 'cb.casa-ratio,fin.cost-of-funds,fin.nim', `first paragraph annotations: ${triggers('para-a').join(',')}`);
    ok(triggers('para-b').length === 0, 'terms were annotated twice in one chapter');
    ok(byTestId('para-c')!.innerHTML === '<strong>NIM inside JSX</strong>', 'non-string content was altered');
    ok(byTestId('para-a')!.textContent === 'A higher CASA ratio lowers the cost of funds and lifts NIM.', 'annotated text changed');
    const trigger = byTestId('para-a')!.querySelector('[data-term-id="fin.nim"]') as HTMLButtonElement;
    ok(trigger.tagName === 'BUTTON' && trigger.getAttribute('aria-haspopup') === 'dialog', 'trigger is not an accessible button');
    await click(trigger);
    const popover = byTestId('glossary-popover');
    ok(popover && popover.textContent?.includes('Net interest margin'), 'popover did not show the definition');
    ok(trigger.getAttribute('aria-expanded') === 'true', 'aria-expanded not set');
    await key('Escape');
    ok(!byTestId('glossary-popover') && document.activeElement === trigger, 'Escape did not close the popover and restore focus');
    await click(trigger);
    await act(async () => { document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); });
    ok(!byTestId('glossary-popover'), 'outside click did not dismiss the popover');
    await view.unmount();
  });

  await check('GL-07', 'opening and closing lookups and sheets never moves the reading position', async () => {
    resetStorage();
    await loadLessonGlossary(CB_22);
    const calls: Array<FocusOptions | undefined> = [];
    const original = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function focus(options?: FocusOptions) { calls.push(options); return original.call(this, options); };
    try {
      const view = await mount(createElement(LessonFlowContext.Provider, { value: flow(CB_22) },
        createElement(EssentialTermsReaderButton, { chapterIndex: 0 }),
        createElement('p', null, createElement(GlossaryText, { text: 'CASA is cheap funding.', chapterIndex: 0, blockKey: 'What it is' }))));
      const before = window.scrollY;
      await click(document.body.querySelector('[data-testid="glossary-term-trigger"]'));
      await key('Escape');
      await click(byTestId('essential-terms-reader-button'));
      await key('Escape');
      ok(window.scrollY === before, 'scroll position changed');
      ok(calls.length > 0 && calls.every((options) => options?.preventScroll === true), 'a focus move could scroll the page');
      await view.unmount();
    } finally {
      HTMLElement.prototype.focus = original;
    }
  });

  await check('GL-19', 'on narrow screens the lookup opens as a bottom sheet', async () => {
    resetStorage();
    await loadLessonGlossary(CB_22);
    const width = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 375 });
    try {
      const view = await mount(createElement(LessonFlowContext.Provider, { value: flow(CB_22) },
        createElement('p', null, createElement(GlossaryText, { text: 'CASA is cheap funding.', chapterIndex: 2, blockKey: 'What it is' }))));
      await click(document.body.querySelector('[data-testid="glossary-term-trigger"]'));
      ok(byTestId('glossary-popover')?.className.includes('bottom-0'), 'popover is not a bottom sheet on mobile');
      await view.unmount();
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
    }
  });

  await check('GL-20', 'dialogs trap keyboard focus and close with Escape', async () => {
    resetStorage();
    const view = await mount(createElement(EntryHarness, { identity: CB_22, onProceed: () => undefined }));
    await click(byTestId('start-lesson'));
    const dialog = byTestId('essential-terms-preview')!;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled])'));
    focusable[focusable.length - 1].focus();
    await key('Tab');
    ok(document.activeElement === focusable[0], 'Tab from the last control did not wrap to the first');
    await key('Tab', document, true);
    ok(document.activeElement === focusable[focusable.length - 1], 'Shift+Tab from the first control did not wrap to the last');
    await view.unmount();
  });

  // Coverage checker -------------------------------------------------------------------------
  await check('GL-09', 'coverage reports unexplained abbreviations, invalid chapters and unused entries', () => {
    const catalog: CoverageCatalog = {
      subIndustries: [{
        id: 'banking-commercial', name: 'Commercial Banking', groupName: 'Banking & Financial Services',
        lessons: [{ identity: CB_11, lessonTitle: '1.1 Industry Definition & Scope', moduleTitle: 'How the Industry Works', blocked: false, deck: { cards: [{ title: 'Only chapter', narrative: [{ label: 'What it is', text: 'A deposit funds lending. XQZR is unexplained.' }] }] } }],
      }],
    };
    const report = glossaryCoverage(catalog, all);
    ok(report.unknownAbbreviations.some((item) => item.acronym === 'XQZR'), 'unexplained abbreviation not reported');
    ok(report.invalidMappings.some((item) => item.lessonKey === '1.1' && /does not exist/.test(item.detail)), 'out-of-range chapter mapping not reported');
    ok(!report.structurallyValid, 'a broken catalogue was reported as structurally valid');
  });

  await check('GL-25', 'authored glossary data is structurally valid on its own', () => {
    const report = glossaryCoverage({ subIndustries: [] }, all);
    ok(report.structuralProblems.length === 0, report.structuralProblems.join('; '));
    ok(report.conflictingIds.length === 0, `conflicting ids: ${report.conflictingIds.map((item) => item.termId).join(', ')}`);
    ok(report.duplicateDefinitions.length === 0, `duplicate definitions: ${report.duplicateDefinitions.map((item) => item.detail).join('; ')}`);
    ok(report.unusedEntries.length === 0, `unused entries: ${report.unusedEntries.map((item) => item.termId).join(', ')}`);
    const indexOnly = report.invalidMappings.filter((item) => item.detail !== 'glossary lesson not found in the live catalogue');
    ok(indexOnly.length === 0, indexOnly.map((item) => `${item.curriculumId} ${item.lessonKey} ${item.termId ?? ''} ${item.detail}`).join('; '));
  });

  resetGlossaryCache();
  const failed = results.filter((result) => !result.ok);
  results.forEach((result) => console.log(`${result.ok ? '✓' : '✗'} ${result.id} ${result.name}${result.error ? ` — ${result.error}` : ''}`));
  console.log(`${results.length - failed.length}/${results.length} Essential Terms checks passed`);
  if (failed.length) throw new Error(`${failed.length} Essential Terms checks failed: ${failed.map((result) => result.id).join(', ')}`);
  return results;
}

runGlossaryEssentialTerms().catch((error) => { console.error(error.message); throw error; });
