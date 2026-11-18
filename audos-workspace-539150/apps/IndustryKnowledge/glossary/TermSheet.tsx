import { useId, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { GLOSSARY_CATEGORIES } from './glossaryTypes';
import type { LessonGlossary, ResolvedTerm } from './glossaryStore';
import { searchKey } from './glossaryMatch';
import { useGlossaryLanguage } from './glossaryLanguage';
import { GlossaryDialog } from './GlossaryDialog';
import { LanguageToggle, TermCard } from './TermCard';
import { uiChapterNumber, uiChapterShort, uiNoTermsMatch, uiText, useUiLanguage } from '../localization/uiText';

export type TermSheetScope = 'chapter' | 'lesson' | 'module';

function matchesQuery(term: ResolvedTerm, query: string): boolean {
  if (!query) return true;
  return searchKey([term.term, term.acronym, term.fullForm, ...(term.aliases ?? []), term.definitionEn, term.definitionVi].filter(Boolean).join(' ')).includes(query);
}

export function groupByCategory(terms: ResolvedTerm[]) {
  return GLOSSARY_CATEGORIES
    .map((category) => ({ category, terms: terms.filter((term) => term.category === category.id) }))
    .filter((group) => group.terms.length > 0);
}

export function TermSheet({
  glossary, chapterIndex, onClose, returnFocus, initialScope,
}: {
  glossary: LessonGlossary;
  chapterIndex?: number;
  onClose: () => void;
  returnFocus?: HTMLElement | null;
  initialScope?: TermSheetScope;
}) {
  useUiLanguage();
  const titleId = useId();
  const [language, setLanguage] = useGlossaryLanguage();
  const chapterIds = chapterIndex !== undefined ? glossary.byChapter[chapterIndex] ?? [] : [];
  const scopes: Array<{ id: TermSheetScope; label: string; count: number }> = [
    ...(chapterIds.length ? [{ id: 'chapter' as const, label: uiChapterNumber((chapterIndex ?? 0) + 1), count: chapterIds.length }] : []),
    { id: 'lesson', label: uiText('This lesson'), count: glossary.terms.length },
    ...(glossary.moduleTerms.length > glossary.terms.length ? [{ id: 'module' as const, label: uiText('Whole module'), count: glossary.moduleTerms.length }] : []),
  ];
  const [scope, setScope] = useState<TermSheetScope>(() => (initialScope && scopes.some((item) => item.id === initialScope) ? initialScope : scopes[0].id));
  const [query, setQuery] = useState('');
  const key = searchKey(query);
  const pool = scope === 'module' ? glossary.moduleTerms : scope === 'chapter' ? glossary.terms.filter((term) => chapterIds.includes(term.id)) : glossary.terms;
  const visible = useMemo(() => pool.filter((term) => matchesQuery(term, key)), [pool, key]);
  const groups = groupByCategory(visible);

  return (
    <GlossaryDialog labelledBy={titleId} onClose={onClose} returnFocus={returnFocus} testId="glossary-term-sheet" wide>
      <header className="border-b border-slate-100 px-5 pb-4 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">{uiText('Essential Terms')} · {glossary.subIndustry}</p>
            <h2 id={titleId} className="mt-1 text-lg font-black tracking-tight text-slate-900 sm:text-xl">{glossary.lessonTitle}</h2>
            <p className="mt-0.5 text-xs text-slate-500">{glossary.moduleTitle}</p>
          </div>
          <button type="button" onClick={onClose} data-autofocus className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" aria-label={uiText('Close term sheet')}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">{uiText('Search terms')}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={uiText('Search terms, acronyms or Vietnamese')}
              className="min-h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
              data-testid="glossary-search"
            />
          </label>
          <LanguageToggle value={language} onChange={setLanguage} />
        </div>
        {scopes.length > 1 ? (
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label={uiText('Which terms to show')}>
            {scopes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={scope === item.id}
                onClick={() => setScope(item.id)}
                className={`min-h-8 rounded-full px-3 text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${scope === item.id ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                data-testid={`glossary-scope-${item.id}`}
              >
                {item.label} · {item.count}
              </button>
            ))}
          </div>
        ) : null}
      </header>
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6" data-testid="glossary-term-list">
        {groups.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500" role="status">{uiNoTermsMatch(query)}</p>
        ) : groups.map((group) => (
          <section key={group.category.id} className="mb-6 last:mb-2" aria-label={group.category.label}>
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {group.category.label}{language !== 'en' ? <span className="normal-case tracking-normal"> · {group.category.labelVi}</span> : null}
            </h3>
            <div className="space-y-2.5">
              {group.terms.map((term) => (
                <TermCard
                  key={term.id}
                  term={term}
                  language={language}
                  chapterLabel={scope === 'lesson' && term.chapters.length ? uiChapterShort(term.chapters.map((index) => index + 1).join(', ')) : undefined}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <footer className="border-t border-slate-100 px-5 py-3 text-[11px] leading-5 text-slate-400 sm:px-6">
        {uiText('Optional reference. Terms never lock chapters or count toward completion. Vietnamese explanations are pending native-speaker review.')}
      </footer>
    </GlossaryDialog>
  );
}
