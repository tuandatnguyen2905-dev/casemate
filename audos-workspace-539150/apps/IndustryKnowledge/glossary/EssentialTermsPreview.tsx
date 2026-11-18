import { useId, useState } from 'react';
import { ArrowRight, BookOpen, X } from 'lucide-react';
import type { LessonGlossary } from './glossaryStore';
import { useGlossaryLanguage } from './glossaryLanguage';
import { GlossaryDialog } from './GlossaryDialog';
import { LanguageToggle, TermCard } from './TermCard';
import { uiShowMoreTerms, uiText, uiViewAllTerms, useUiLanguage } from '../localization/uiText';

export const PREVIEW_INITIAL_COUNT = 5;

export function EssentialTermsPreview({
  glossary, loading = false, onStart, onSkip, onViewAll, onClose, returnFocus,
}: {
  glossary: LessonGlossary | null;
  loading?: boolean;
  onStart: () => void;
  onSkip: () => void;
  onViewAll: () => void;
  onClose: () => void;
  returnFocus?: HTMLElement | null;
}) {
  useUiLanguage();
  const titleId = useId();
  const [language, setLanguage] = useGlossaryLanguage();
  const [expanded, setExpanded] = useState(false);
  const essential = glossary?.essential.length ? glossary.essential : glossary?.terms ?? [];
  const shown = expanded ? essential : essential.slice(0, PREVIEW_INITIAL_COUNT);
  const hidden = essential.length - shown.length;

  return (
    <GlossaryDialog labelledBy={titleId} onClose={onClose} returnFocus={returnFocus} testId="essential-terms-preview">
      <header className="px-5 pb-3 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600"><BookOpen className="h-5 w-5" aria-hidden /></span>
            <div className="min-w-0">
              <h2 id={titleId} className="text-xl font-black tracking-tight text-slate-900">{uiText('Essential Terms')}</h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-600">{uiText('Before You Start')}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" aria-label={uiText('Close Essential Terms')}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{uiText('New to this topic? Here are the key terms worth knowing before you dive in.')}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="min-w-0 truncate text-xs font-semibold text-slate-500">{glossary?.lessonTitle ?? ''}</p>
          <LanguageToggle value={language} onChange={setLanguage} />
        </div>
      </header>
      <div className="flex-1 overflow-y-auto overscroll-contain border-y border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6" data-testid="essential-terms-preview-list">
        {loading && !glossary ? (
          <div className="space-y-2.5" role="status" aria-label={uiText('Loading terms')}>
            {[0, 1, 2].map((item) => <div key={item} className="h-20 animate-pulse rounded-2xl bg-white" />)}
          </div>
        ) : (
          <div className="space-y-2.5">
            {shown.map((term) => <TermCard key={term.id} term={term} language={language} />)}
            {hidden > 0 ? (
              <button type="button" onClick={() => setExpanded(true)} className="w-full rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 hover:border-red-200 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" data-testid="essential-terms-show-more">
                {uiShowMoreTerms(hidden)}
              </button>
            ) : null}
          </div>
        )}
      </div>
      <footer className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button type="button" onClick={onViewAll} disabled={!glossary} className="min-h-11 rounded-xl px-3 text-sm font-bold text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-40" data-testid="essential-terms-view-all">
          {uiViewAllTerms(glossary ? glossary.terms.length : null)}
        </button>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button type="button" onClick={onSkip} className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" data-testid="essential-terms-skip">
            {uiText('Skip for Now')}
          </button>
          <button type="button" onClick={onStart} data-autofocus className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white shadow-sm hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" data-testid="essential-terms-start">
            {uiText('Start Learning')} <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </footer>
    </GlossaryDialog>
  );
}
