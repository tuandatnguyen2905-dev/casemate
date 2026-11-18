import { useId, useMemo, useState } from 'react';
import { ChevronDown, Lock, NotebookPen } from 'lucide-react';
import { readJson, readerStorageKey, stripChapterNumber } from '../../IndustryKnowledge/lessonFlowCore';
import type { FlashcardOverviewApi } from '../flashcards/components/SmartFlashcards';
import { formatDueFromNow } from '../flashcards/scheduler';
import type { CoverageSummary, FlashcardOrigin, FlashcardScopeId, IndustryFlashcards, ScopedCard } from './flashcardScopes';
import { scopeTitle } from './flashcardScopes';
import type { PracticeChrome } from './modes';
import { browserStorage } from './practiceStorage';
import { uiAllCards, uiCardCount, uiCardsUnlockLater, uiChapterCardsRated, uiChapterLabel, uiIndustryTotalTail, uiLessonCount, uiMasteredCount, uiNextReviewIs, uiOpenNow, uiRetryWeakCount, uiReviewDueCount, uiSessionLimitNote, uiText, useUiLanguage } from '../../IndustryKnowledge/localization/uiText';

const eyebrow = 'text-[10px] font-bold uppercase tracking-[0.16em] text-red-600';
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2';
const primaryButton = `inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:w-auto ${focusRing}`;
const secondaryButton = `inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-red-200 hover:text-red-700 sm:w-auto ${focusRing}`;

export const scopeLabel = (data: IndustryFlashcards, scope: FlashcardScopeId) => ({
  chapter: uiText('This chapter'),
  lesson: uiText('This lesson'),
  module: uiText('This module'),
  all: uiAllCards(data.industryLabel),
}[scope]);

export function FlashcardOverviewHeader({ chrome, data }: { chrome?: PracticeChrome; data: IndustryFlashcards }) {
  useUiLanguage();
  return (
    <header>
      <p className={eyebrow}>{uiText('Practice & Review')} · {uiText('Flashcards')}</p>
      <h1 id={chrome?.headingId} ref={chrome?.headingRef} tabIndex={-1} className="mt-2 text-2xl font-black tracking-tight text-slate-900 outline-none sm:text-3xl">
        {data.industryLabel}
      </h1>
      <p className="mt-1 text-sm leading-6 text-slate-600" data-testid="practice-context">
        {uiText('From')} <span className="font-semibold text-slate-800">{data.origin.lessonTitle}</span> · {data.origin.moduleLabel}
      </p>
    </header>
  );
}

export function ScopeSelector({ data, scopes, value, counts, onChange }: {
  data: IndustryFlashcards;
  scopes: FlashcardScopeId[];
  value: FlashcardScopeId;
  counts: Record<FlashcardScopeId, { available: number; total: number }>;
  onChange: (scope: FlashcardScopeId) => void;
}) {
  useUiLanguage();
  const labelId = useId();
  const detail = (scope: FlashcardScopeId) => (scope === 'all'
    ? uiLessonCount(data.lessons.filter((lesson) => lesson.cards.length).length)
    : scopeTitle(data, scope));
  return (
    <section className="mt-6" aria-labelledby={labelId}>
      <h2 id={labelId} className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{uiText('Cards to study')}</h2>
      <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-labelledby={labelId} data-testid="flashcards-scope">
        {scopes.map((scope) => {
          const selected = scope === value;
          return (
            <button
              key={scope}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(scope)}
              data-testid={`flashcards-scope-${scope}`}
              className={`flex min-h-16 min-w-0 flex-col items-start rounded-xl border px-3 py-2.5 text-left transition ${focusRing} ${selected ? 'border-red-600 bg-red-50 ring-1 ring-red-600' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <span className={`text-sm font-bold ${selected ? 'text-red-700' : 'text-slate-900'}`}>{scopeLabel(data, scope)}</span>
              <span className="mt-0.5 line-clamp-1 w-full text-xs text-slate-500">{detail(scope)}</span>
              <span className="mt-1 text-[11px] font-semibold text-slate-600">{uiOpenNow(counts[scope].available, counts[scope].total)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const unlockHelp = (scope: FlashcardScopeId) => (scope === 'chapter' || scope === 'lesson'
  ? uiText('They open chapter by chapter: submit the Knowledge Check of a chapter (any score) and the next chapter, with its cards, opens.')
  : uiText('They open chapter by chapter in each lesson: submit the Knowledge Check of a chapter (any score) and the next chapter, with its cards, opens. The first chapter of every lesson is always open.'));

export function FlashcardProgressSummary({ data, scope, api, items, coverage, chapterOnly = false }: {
  data: IndustryFlashcards;
  scope: FlashcardScopeId;
  api: FlashcardOverviewApi;
  items: ScopedCard[];
  coverage: CoverageSummary;
  /** Learning Mode Chooser flow: every count covers the open chapter, so the curriculum total is left out. */
  chapterOnly?: boolean;
}) {
  useUiLanguage();
  const titleId = useId();
  const { stats } = api;
  const locked = items.filter((item) => item.locked).length;
  const tiles = [
    { label: 'Available now', value: String(stats.total), testId: 'flashcards-available' },
    { label: 'Due for review', value: String(stats.due), testId: 'flashcards-due' },
    { label: 'Mastery', value: `${stats.masteryPercent}%`, detail: uiMasteredCount(stats.mastered, stats.total), testId: 'flashcards-mastery' },
  ];
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5" aria-labelledby={titleId} data-testid="flashcards-progress-summary">
      <h2 id={titleId} className="text-sm font-bold text-slate-900">{scopeTitle(data, scope)}</h2>
      <dl className="mt-3 grid grid-cols-3 gap-2">
        {tiles.map((tile) => (
          <div key={tile.label} className="min-w-0 rounded-xl bg-slate-50 px-3 py-2.5">
            <dt className="text-[11px] font-semibold leading-4 text-slate-500">{uiText(tile.label)}</dt>
            <dd className="mt-1 text-xl font-black tabular-nums text-slate-900" data-testid={tile.testId}>{tile.value}</dd>
            {tile.detail ? <dd className="text-[11px] leading-4 text-slate-500">{tile.detail}</dd> : null}
          </div>
        ))}
      </dl>
      {locked ? (
        <p className="mt-3 flex gap-2 text-xs leading-5 text-slate-600" data-testid="flashcards-locked-note">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
          <span><span className="font-semibold text-slate-800">{uiCardsUnlockLater(locked)}</span> {unlockHelp(scope)}</span>
        </p>
      ) : null}
      {chapterOnly ? null : <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500" data-testid="flashcards-industry-total">
        {data.industryLabel}: <span className="font-semibold text-slate-700">{uiCardCount(coverage.total)}</span>{uiIndustryTotalTail(coverage.available, coverage.lessonsWithCards)}
        {data.generated ? uiText(' Every answer is text its chapter shows: the key insight, a key term or a worked example.') : ''}
        {data.complete ? '' : uiText(' Other lessons could not be loaded, so totals cover this lesson only.')}
      </p>}
    </section>
  );
}

/**
 * Learning Mode Chooser flow: the active chapter's "Cards rated" bar (unique cards the learner rated
 * over the cards open in the chapter) and the scheduler's available, due and mastered counts. Cards that
 * were only viewed have no scheduler state and are not counted.
 */
export function FlashcardChapterProgress({ api }: { api: FlashcardOverviewApi }) {
  useUiLanguage();
  const titleId = useId();
  const { stats } = api;
  const rated = stats.total - stats.unseen;
  const percent = stats.total ? Math.round((rated / stats.total) * 100) : 0;
  const label = uiChapterCardsRated(rated, stats.total);
  const tiles = [
    { label: 'Available', value: stats.total, testId: 'flashcards-available' },
    { label: 'Due', value: stats.due, testId: 'flashcards-due' },
    { label: 'Mastered', value: stats.mastered, testId: 'flashcards-mastered' },
  ];
  return (
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5" aria-labelledby={titleId} data-testid="flashcards-progress-summary">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 id={titleId} className="text-sm font-bold text-slate-900">{uiText('Cards rated')}</h2>
        <p className="text-xs font-semibold text-slate-600" data-testid="flashcards-studied">{label}</p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={uiText('Cards rated')} aria-valuemin={0} aria-valuemax={stats.total} aria-valuenow={rated} aria-valuetext={label}>
        <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${percent}%` }} />
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2">
        {tiles.map((tile) => (
          <div key={tile.label} className="min-w-0 rounded-xl bg-slate-50 px-3 py-2">
            <dt className="text-[11px] font-semibold leading-4 text-slate-500">{uiText(tile.label)}</dt>
            <dd className="mt-0.5 text-lg font-black tabular-nums text-slate-900" data-testid={tile.testId}>{tile.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function FlashcardActions({ api, scope, onWiderScope }: { api: FlashcardOverviewApi; scope: FlashcardScopeId; onWiderScope?: () => void }) {
  useUiLanguage();
  const { stats, now } = api;
  if (!stats.total) {
    return (
      <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:p-5" data-testid="flashcards-none-open">
        <p className="text-sm font-semibold text-slate-800">{uiText('No cards in this scope are open yet.')}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{scope === 'chapter' ? uiText('This chapter has no cards of its own.') : uiText('Its chapters open as you submit each Knowledge Check.')}</p>
        {onWiderScope ? <button type="button" onClick={onWiderScope} className={`mt-3 ${secondaryButton}`}>{uiText('Show the whole lesson')}</button> : null}
      </section>
    );
  }
  const rated = stats.total - stats.unseen;
  const reviewNote = stats.nextDueAt
    ? uiNextReviewIs(formatDueFromNow(stats.nextDueAt, now))
    : rated ? uiText('Every rated card is scheduled for later.') : uiText('Cards you rate are scheduled for review automatically.');
  return (
    <section className="mt-6" aria-label={uiText('Start practising')}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={api.startStudy} className={primaryButton} data-testid="flashcards-study">{uiText('Study available cards')}</button>
        {stats.due ? (
          <button type="button" onClick={api.startReview} className={secondaryButton} data-testid="flashcards-review">{uiReviewDueCount(stats.due)}</button>
        ) : (
          <p className="text-sm leading-6 text-slate-600 sm:pl-2" data-testid="flashcards-zero-due">
            <span className="font-semibold text-slate-800">{stats.unseen ? uiText('Nothing due for review.') : uiText('All cards rated. Nothing due for review.')}</span> {reviewNote}
          </p>
        )}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        {uiSessionLimitNote(api.sessionLimit ?? stats.total, stats.unseen)}
        {stats.weak ? ' ' : ''}
        {stats.weak ? <button type="button" onClick={api.startWeak} className="font-semibold text-red-700 underline decoration-red-200 underline-offset-2 hover:text-red-800">{uiRetryWeakCount(stats.weak)}</button> : null}
      </p>
    </section>
  );
}

type ChapterWithTerms = { title?: string; keyTerms?: Array<{ term?: unknown; definition?: unknown }> };

function savedNotes(persistenceKey?: string): Record<string, string> {
  const stored = persistenceKey ? readJson(browserStorage(), readerStorageKey(persistenceKey)) : null;
  const notes = stored && typeof stored === 'object' && !Array.isArray(stored) ? (stored as { notes?: unknown }).notes : null;
  if (!notes || typeof notes !== 'object' || Array.isArray(notes)) return {};
  return Object.fromEntries(Object.entries(notes as Record<string, unknown>).filter(([, note]) => typeof note === 'string' && note.trim()) as Array<[string, string]>);
}

const openByDefault = () => {
  try {
    return typeof window !== 'undefined' && Boolean(window.matchMedia?.('(min-width: 1280px)').matches);
  } catch {
    return false;
  }
};

/**
 * Key terms for one open chapter of the originating lesson, plus any note the learner saved in the reader
 * before notes were removed from it. A saved note is shown read-only; nothing here writes or deletes it.
 */
export function ChapterSupportPanel({ origin, fixed = false }: {
  origin: Pick<FlashcardOrigin, 'chapters' | 'accessible' | 'chapterIndex' | 'persistenceKey'>;
  /** Only the active chapter: the practice modes pick the chapter in their Learning Journey. */
  fixed?: boolean;
}) {
  useUiLanguage();
  const notes = useMemo(() => savedNotes(origin.persistenceKey), [origin.persistenceKey]);
  const chapters = origin.chapters.map((chapter, index) => ({ index, chapter: chapter as ChapterWithTerms })).filter(({ index }) => origin.accessible[index]);
  const [selected, setSelected] = useState(() => (fixed || origin.accessible[origin.chapterIndex] ? origin.chapterIndex : chapters[0]?.index ?? 0));
  const [open, setOpen] = useState(openByDefault);
  const selectId = useId();
  if (!chapters.length) return null;
  const chapter = origin.chapters[selected] as ChapterWithTerms | undefined;
  const terms = (Array.isArray(chapter?.keyTerms) ? chapter!.keyTerms : [])
    .map((entry) => ({ term: String(entry?.term ?? '').trim(), definition: String(entry?.definition ?? '').trim() }))
    .filter((entry) => entry.term && entry.definition);
  const note = notes[String(selected)];
  const anyNote = chapters.some(({ index }) => Boolean(notes[String(index)]));
  const title = (index: number) => stripChapterNumber(origin.chapters[index]?.title);
  return (
    <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="overflow-hidden rounded-2xl border border-slate-200 bg-white" data-testid="flashcards-support-panel">
      <summary className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 ${focusRing}`}>
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
          {anyNote ? <><NotebookPen className="h-3.5 w-3.5" aria-hidden="true" /> {uiText('Key terms & saved notes')}</> : uiText('Key terms')}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </summary>
      <div className="border-t border-slate-100 p-4 pt-3">
        {chapters.length > 1 && !fixed ? (
          <>
            <label htmlFor={selectId} className="text-[11px] font-semibold text-slate-500">{uiText('Chapter')}</label>
            <select
              id={selectId}
              value={selected}
              onChange={(event) => setSelected(Number(event.target.value))}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100"
            >
              {chapters.map(({ index }) => <option key={index} value={index}>{uiChapterLabel(index + 1, title(index))}</option>)}
            </select>
          </>
        ) : (
          <p className="text-[11px] font-semibold text-slate-500">{uiChapterLabel(selected + 1, title(selected))}</p>
        )}
        <h3 className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{uiText('Key terms')}</h3>
        {terms.length ? (
          <dl className="mt-1 space-y-2">
            {terms.map((entry) => (
              <div key={entry.term} className="text-xs leading-5">
                <dt className="font-bold text-slate-800">{entry.term}</dt>
                <dd className="text-slate-600">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-1 text-xs leading-5 text-slate-500">{uiText('This chapter lists no key terms.')}</p>
        )}
        {note ? (
          <>
            <h3 className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{uiText('My saved note')}</h3>
            <p className="mt-1 whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700" data-testid="flashcards-chapter-note">{note}</p>
          </>
        ) : null}
      </div>
    </details>
  );
}
