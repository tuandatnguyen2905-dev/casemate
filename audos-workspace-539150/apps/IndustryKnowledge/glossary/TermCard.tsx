import { ExternalLink } from 'lucide-react';
import type { GlossaryLanguage } from './glossaryTypes';
import type { ResolvedTerm } from './glossaryStore';
import { LANGUAGE_OPTIONS } from './glossaryLanguage';

export function termHeading(term: Pick<ResolvedTerm, 'term' | 'acronym'>): { title: string; badge: string | null } {
  if (term.acronym && term.acronym !== term.term) return { title: term.term, badge: term.acronym };
  return { title: term.term, badge: null };
}

export function definitionFor(term: ResolvedTerm, language: GlossaryLanguage): { text: string; fallback: boolean } {
  if (language === 'vi') return term.definitionVi ? { text: term.definitionVi, fallback: false } : { text: term.definitionEn, fallback: true };
  return { text: term.definitionEn, fallback: false };
}

function VerificationBadge({ term }: { term: ResolvedTerm }) {
  if (term.verificationStatus === 'verified') return null;
  const label = term.verificationStatus === 'needs-review' ? 'Needs review' : 'Source check pending';
  return (
    <p className="mt-2 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] leading-5 text-amber-800 ring-1 ring-amber-200" data-testid="term-verification-flag">
      <span className="font-bold">{label}.</span> {term.reviewNote ?? 'This explanation has not been matched to a cited source yet.'}
    </p>
  );
}

function SourceLine({ term }: { term: ResolvedTerm }) {
  if (!term.sources.length) return null;
  return (
    <p className="mt-2 text-[11px] leading-5 text-slate-400">
      <span className="font-semibold text-slate-500">Source{term.sources.length > 1 ? 's' : ''}:</span>{' '}
      {term.sources.map((source, index) => (
        <span key={source.id}>
          {index > 0 ? ' · ' : ''}
          {source.url ? (
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline decoration-slate-300 underline-offset-2 hover:text-red-600">
              {source.title}<ExternalLink className="h-2.5 w-2.5" aria-hidden />
            </a>
          ) : source.title}
        </span>
      ))}
    </p>
  );
}

export function TermCard({ term, language, compact = false, chapterLabel }: { term: ResolvedTerm; language: GlossaryLanguage; compact?: boolean; chapterLabel?: string }) {
  const heading = termHeading(term);
  const definition = definitionFor(term, language);
  const showVi = language === 'both' && Boolean(term.definitionVi);
  const context = language === 'vi' ? term.businessContextVi ?? term.businessContextEn : term.businessContextEn;
  const lessonContext = language === 'vi' ? term.lessonContextVi ?? term.lessonContextEn : term.lessonContextEn;
  const example = language === 'vi' ? term.exampleVi ?? term.exampleEn : term.exampleEn;
  return (
    <article className={compact ? '' : 'rounded-2xl border border-slate-200 bg-white p-4'} data-testid="glossary-term" data-term-id={term.id} data-verification={term.verificationStatus}>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="text-sm font-black text-slate-900">{heading.title}</h3>
        {heading.badge ? <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-black tracking-wide text-red-600 ring-1 ring-red-100">{heading.badge}</span> : null}
        {chapterLabel ? <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{chapterLabel}</span> : null}
      </div>
      {term.fullForm && term.fullForm !== heading.title ? <p className="mt-0.5 text-xs font-semibold text-slate-500">{term.fullForm}</p> : null}
      <p className="mt-2 text-sm leading-6 text-slate-700">
        {definition.text}
        {definition.fallback ? <span className="ml-1.5 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">English only</span> : null}
      </p>
      {!compact && context ? <p className="mt-1.5 text-xs leading-5 text-slate-500"><span className="font-bold text-slate-600">{language === 'vi' ? 'Bối cảnh:' : 'Why it matters:'}</span> {context}</p> : null}
      {!compact && lessonContext ? <p className="mt-1.5 text-xs leading-5 text-slate-500"><span className="font-bold text-slate-600">{language === 'vi' ? 'Trong bài này:' : 'In this lesson:'}</span> {lessonContext}</p> : null}
      {!compact && example ? <p className="mt-1.5 text-xs leading-5 text-slate-500"><span className="font-bold text-slate-600">{language === 'vi' ? 'Ví dụ:' : 'Example:'}</span> {example}</p> : null}
      {showVi ? (
        <div className="mt-2 rounded-xl bg-slate-50 px-3 py-2" lang="vi">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Tiếng Việt</p>
          <p className="mt-0.5 text-[13px] leading-6 text-slate-700">{term.definitionVi}</p>
          {!compact && term.businessContextVi ? <p className="mt-1 text-xs leading-5 text-slate-500">{term.businessContextVi}</p> : null}
        </div>
      ) : null}
      {!compact ? <SourceLine term={term} /> : null}
      <VerificationBadge term={term} />
    </article>
  );
}

export function LanguageToggle({ value, onChange }: { value: GlossaryLanguage; onChange: (language: GlossaryLanguage) => void }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-0.5" role="group" aria-label="Definition language">
      {LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          title={option.title}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={`min-h-8 rounded-[10px] px-2.5 text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${value === option.id ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
