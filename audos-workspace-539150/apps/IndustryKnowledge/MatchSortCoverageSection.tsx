import { useEffect, useState } from 'react';
import type { LearningModeCatalog } from './learningModeAudit';
import { auditMatchSortCoverage } from './matchSortCoverage';
import type { MatchSortCoverage } from './matchSortCoverage';

type SectionState = { status: 'loading' } | { status: 'ready'; coverage: MatchSortCoverage } | { status: 'error'; message: string };

const percent = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

const totals = (coverage: MatchSortCoverage): Array<{ id: string; label: string; value: number; attention?: boolean }> => [
  { id: 'curricula', label: 'Curricula', value: coverage.curricula },
  { id: 'eligible', label: 'Eligible chapters', value: coverage.eligibleChapters },
  { id: 'valid', label: 'Chapters with a valid activity', value: coverage.chaptersWithValid },
  { id: 'before', label: 'Before generation (authored only)', value: coverage.chaptersWithAuthored },
  { id: 'lesson-level', label: 'Chapters with lesson-level review only', value: coverage.chaptersLessonLevelOnly },
  { id: 'zero', label: 'Chapters with zero activities', value: coverage.chaptersZero, attention: coverage.chaptersZero > 0 },
  { id: 'unique', label: 'Unique valid activities', value: coverage.unique },
  { id: 'authored', label: 'Authored', value: coverage.authored },
  { id: 'generated', label: 'Generated (chapter)', value: coverage.generated },
  { id: 'lesson-review', label: 'Lesson-level', value: coverage.lessonLevel },
  { id: 'matching', label: 'Concept Matching', value: coverage.matching },
  { id: 'sorting', label: 'Category Sorting', value: coverage.sorting },
  { id: 'sequence', label: 'Sequence Builder', value: coverage.sequence },
  { id: 'invalid', label: 'Invalid', value: coverage.invalid, attention: coverage.invalid > 0 },
  { id: 'duplicates', label: 'Duplicates', value: coverage.duplicates, attention: coverage.duplicates > 0 },
  { id: 'ambiguous', label: 'Ambiguous pairs or groups (review)', value: coverage.ambiguous, attention: coverage.ambiguous > 0 },
  { id: 'invalid-sequences', label: 'Invalid sequences', value: coverage.invalidSequences, attention: coverage.invalidSequences > 0 },
  { id: 'empty', label: 'Empty items', value: coverage.emptyItems, attention: coverage.emptyItems > 0 },
  { id: 'missing-mappings', label: 'Missing chapter mappings', value: coverage.missingMappings, attention: coverage.missingMappings > 0 },
  { id: 'ungrounded', label: 'Ungrounded content', value: coverage.ungrounded, attention: coverage.ungrounded > 0 },
  { id: 'enrichment', label: 'Flagged for enrichment', value: coverage.enrichmentNeeded, attention: coverage.enrichmentNeeded > 0 },
];

/**
 * Match & Sort coverage and quality on the learning-mode audit page (`?dkAudit=learning-modes`). Read-only: the
 * catalogue is resolved with empty storage through the learner-facing resolver (`matchSortCoverage.ts`).
 */
export function MatchSortCoverageSection({ load }: { load: () => Promise<LearningModeCatalog> }) {
  const [state, setState] = useState<SectionState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    load()
      .then((catalog) => {
        if (cancelled) return;
        try {
          setState({ status: 'ready', coverage: auditMatchSortCoverage(catalog) });
        } catch (error) {
          setState({ status: 'error', message: String(error) });
        }
      })
      .catch((error) => { if (!cancelled) setState({ status: 'error', message: String(error) }); });
    return () => { cancelled = true; };
  }, [load]);

  return (
    <section className="mt-8" aria-label="Match & Sort coverage" data-testid="match-sort-coverage" data-status={state.status}>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">Match &amp; Sort · coverage</p>
      <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900">Match &amp; Sort coverage</h2>
      {state.status === 'loading' ? <p className="mt-3 text-sm text-slate-500" role="status">Checking every chapter…</p> : null}
      {state.status === 'error' ? <p className="mt-3 text-sm text-red-700" role="alert">Match &amp; Sort coverage could not be calculated: {state.message}</p> : null}
      {state.status === 'ready' ? (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {totals(state.coverage).map((item) => (
              <div key={item.id} className={`rounded-xl border px-4 py-3 ${item.attention ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`} data-testid={`match-sort-total-${item.id}`} data-value={item.value}>
                <dt className="text-[11px] font-semibold leading-4 text-slate-600">{item.label}</dt>
                <dd className="mt-1 text-2xl font-black tabular-nums text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            A chapter counts only when a valid activity practises it (validated, answerable, and for generated activities found word for word in the chapter). Lesson-level reviews and one-term-per-chapter samplers are counted separately. {state.coverage.heldChapters} chapters held for review are not counted.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-xs" data-testid="match-sort-coverage-table">
              <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                <tr><th className="py-2 pr-3">Industry</th><th className="py-2 pr-3">Sub-industry</th><th className="py-2 pr-3">Chapters</th><th className="py-2 pr-3">Eligible</th><th className="py-2 pr-3">Matching</th><th className="py-2 pr-3">Sorting</th><th className="py-2 pr-3">Sequence</th><th className="py-2 pr-3">Valid coverage</th><th className="py-2">Missing</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.coverage.perCurriculum.map((item) => (
                  <tr key={item.id} data-testid={`match-sort-coverage-${item.id}`} data-valid={item.chaptersWithValid} data-eligible={item.eligibleChapters}>
                    <td className="py-2 pr-3 text-slate-600">{item.groupName}</td>
                    <td className="py-2 pr-3 font-semibold text-slate-800">{item.name}</td>
                    <td className="py-2 pr-3 tabular-nums">{item.chapters}</td>
                    <td className="py-2 pr-3 tabular-nums">{item.eligibleChapters}</td>
                    <td className="py-2 pr-3 tabular-nums">{item.matching}</td>
                    <td className="py-2 pr-3 tabular-nums">{item.sorting}</td>
                    <td className="py-2 pr-3 tabular-nums">{item.sequence}</td>
                    <td className="py-2 pr-3 tabular-nums">{item.chaptersWithValid} ({percent(item.chaptersWithValid, item.eligibleChapters)}%)</td>
                    <td className="py-2 tabular-nums">{item.eligibleChapters - item.chaptersWithValid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-2">
            {state.coverage.perCurriculum.filter((item) => item.enrichmentNeeded || item.issues.length).map((item) => (
              <details key={item.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3" data-testid={`match-sort-enrichment-${item.id}`}>
                <summary className="cursor-pointer text-sm font-semibold text-slate-800">{item.name} <span className="font-normal text-slate-500">· {item.enrichmentNeeded} chapters need richer content{item.issues.length ? ` · ${item.issues.length} activities to review` : ''}</span></summary>
                <ul className="mt-2 max-h-56 space-y-0.5 overflow-y-auto text-[11px] text-slate-500">
                  {item.issues.map((issue) => <li key={issue.activityId} className="text-amber-800">{issue.activityId}: {issue.problems.join('; ')}</li>)}
                  {item.chapterRows.filter((row) => row.enrichment).map((row) => (
                    <li key={`${row.lessonTitle}-${row.chapterNumber}`}>{row.lessonTitle} · Chapter {row.chapterNumber}: {row.chapterTitle}{row.status === 'lesson-level-only' ? ' (lesson review only)' : ''} — {row.enrichment}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
