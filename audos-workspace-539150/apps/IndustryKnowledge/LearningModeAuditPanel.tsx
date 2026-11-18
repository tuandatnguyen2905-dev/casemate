import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { auditLearningModes, progressBarText } from './learningModeAudit';
import type { LearningModeAudit, LearningModeCatalog } from './learningModeAudit';
import { auditAssessmentCoverage } from './assessmentCoverage';
import type { AssessmentCoverage } from './assessmentCoverage';
import { auditFlashcardCoverage } from './flashcardCoverage';
import { FlashcardCoverageSection } from './FlashcardCoverageSection';
import type { FlashcardCoverageResult } from './FlashcardCoverageSection';
import { MatchSortCoverageSection } from './MatchSortCoverageSection';

type CoverageResult = { coverage: AssessmentCoverage } | { error: string };
type AuditState = { status: 'loading' } | { status: 'ready'; audit: LearningModeAudit; coverage: CoverageResult; flashcards: FlashcardCoverageResult } | { status: 'error'; message: string };

const computeCoverage = (catalog: LearningModeCatalog): CoverageResult => {
  try {
    return { coverage: auditAssessmentCoverage(catalog) };
  } catch (error) {
    return { error: String(error) };
  }
};

const computeFlashcards = (catalog: LearningModeCatalog): FlashcardCoverageResult => {
  try {
    return { coverage: auditFlashcardCoverage(catalog) };
  } catch (error) {
    return { error: String(error) };
  }
};

const coverageTotals = (coverage: AssessmentCoverage): Array<{ id: string; label: string; value: number; attention?: boolean }> => [
  { id: 'curricula', label: 'Curricula', value: coverage.curricula },
  { id: 'openable-lessons', label: 'Openable lessons', value: coverage.openableLessons },
  { id: 'chapters', label: 'Chapters', value: coverage.chapters },
  { id: 'valid-assessment', label: 'Chapters with a valid assessment', value: coverage.chaptersWithValidAssessment },
  { id: 'zero-questions', label: 'Chapters with zero usable questions', value: coverage.chaptersWithZeroQuestions, attention: coverage.chaptersWithZeroQuestions > 0 },
  { id: 'invalid-data', label: 'Chapters with invalid question data', value: coverage.chaptersWithInvalidData, attention: coverage.chaptersWithInvalidData > 0 },
  { id: 'lessons-without-assessment', label: 'Lessons without any assessment', value: coverage.lessonsWithoutAnyAssessment, attention: coverage.lessonsWithoutAnyAssessment > 0 },
  { id: 'blocked-now', label: 'Chapters blocked now', value: coverage.blockedNow, attention: coverage.blockedNow > 0 },
  { id: 'takeaways-unreachable', label: 'Lesson takeaways unreachable', value: coverage.takeawaysUnreachable, attention: coverage.takeawaysUnreachable > 0 },
];

const curriculumName = (coverage: AssessmentCoverage, id: string) => coverage.perCurriculum.find((item) => item.id === id)?.name ?? id;

const issueLabel = (issue: 'no-questions' | 'invalid-data') => (issue === 'no-questions' ? 'No usable questions' : 'Invalid question data');

const percent = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

/**
 * Learning Mode Chooser routing coverage, computed in the browser from the live catalogue
 * (`?dkAudit=learning-modes`). Read-only: it uses empty storage, so no learner record is read or written.
 */
export function LearningModeAuditPanel({ load, onClose }: { load: () => Promise<LearningModeCatalog>; onClose: () => void }) {
  const [state, setState] = useState<AuditState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    load()
      .then((catalog) => { if (!cancelled) setState({ status: 'ready', audit: auditLearningModes(catalog), coverage: computeCoverage(catalog), flashcards: computeFlashcards(catalog) }); })
      .catch((error) => { if (!cancelled) setState({ status: 'error', message: String(error) }); });
    return () => { cancelled = true; };
  }, [load]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-7 sm:py-8" data-testid="learning-mode-audit" data-status={state.status}
      {...(state.status === 'ready' ? { 'data-verified': state.audit.verified, 'data-implemented': state.audit.implemented } : {})}>
      <button type="button" onClick={onClose} className="inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Domain Knowledge
      </button>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">Learning Mode Chooser · routing check</p>
      <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Sub-industries with verified chooser routing</h1>
      {state.status === 'loading' ? <p className="mt-4 text-sm text-slate-500" role="status">Resolving every implemented sub-industry…</p> : null}
      {state.status === 'error' ? <p className="mt-4 text-sm text-red-700" role="alert">The catalogue could not be loaded: {state.message}</p> : null}
      {state.status === 'ready' ? (
        <>
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-label="Routing coverage">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">{state.audit.verified} of {state.audit.implemented} implemented sub-industries</p>
              <p className="text-2xl font-black tabular-nums text-slate-900">{state.audit.percent}%</p>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Sub-industries with verified chooser routing" aria-valuemin={0} aria-valuemax={state.audit.implemented} aria-valuenow={state.audit.verified}>
              <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${state.audit.percent}%` }} />
            </div>
            <p className="mt-2 font-mono text-xs text-slate-500" data-testid="learning-mode-audit-bar">{progressBarText(state.audit.verified, state.audit.implemented)}</p>
          </section>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-xs">
              <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                <tr><th className="py-2 pr-3">Industry group</th><th className="py-2 pr-3">Verified / implemented</th><th className="py-2 pr-3">Chapters</th><th className="py-2 pr-3">With flashcards</th><th className="py-2 pr-3">With Match &amp; Sort</th><th className="py-2">Flashcards</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.audit.groups.map((group) => (
                  <tr key={group.id} data-testid={`learning-mode-audit-group-${group.id}`}>
                    <td className="py-2 pr-3 font-semibold text-slate-800">{group.name}</td>
                    <td className="py-2 pr-3 tabular-nums">{group.verified} / {group.implemented}</td>
                    <td className="py-2 pr-3 tabular-nums">{group.chapters}</td>
                    <td className="py-2 pr-3 tabular-nums">{group.chaptersWithFlashcards} ({percent(group.chaptersWithFlashcards, group.chapters)}%)</td>
                    <td className="py-2 pr-3 tabular-nums">{group.chaptersWithMatchSort} ({percent(group.chaptersWithMatchSort, group.chapters)}%)</td>
                    <td className="py-2 tabular-nums">{group.flashcards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mt-6 space-y-2" aria-label="Sub-industries">
            {state.audit.subIndustries.map((item) => (
              <details key={item.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3" data-testid={`learning-mode-audit-${item.id}`} data-verified={item.verified ? 'true' : 'false'}>
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-slate-800">{item.name} <span className="font-normal text-slate-400">· {item.groupName}</span></span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${item.verified ? 'bg-slate-900 text-white' : 'bg-amber-100 text-amber-800'}`}>{item.verified ? 'Verified' : 'Needs attention'}</span>
                </summary>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {item.routedLessons} of {item.openableLessons} openable lessons routed{item.heldLessons ? ` · ${item.heldLessons} fully under review` : ''} · {item.chapters} chapters · {item.flashcards} flashcards ({item.chaptersWithFlashcards} chapters) · {item.matchSortActivities} Match &amp; Sort activities ({item.chaptersWithMatchSort} chapters)
                </p>
                {item.failures.length ? (
                  <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-red-700">{item.failures.map((failure) => <li key={failure}>{failure}</li>)}</ul>
                ) : null}
                {item.missing.length ? (
                  <ul className="mt-2 max-h-48 space-y-0.5 overflow-y-auto text-[11px] text-slate-500">
                    {item.missing.map((chapter) => (
                      <li key={`${chapter.lessonTitle}-${chapter.chapterNumber}`}>{chapter.lessonTitle} · Chapter {chapter.chapterNumber}: {chapter.chapterTitle} — no {chapter.missing.map((mode) => (mode === 'flashcards' ? 'flashcards' : 'Match & Sort')).join(' or ')}</li>
                    ))}
                  </ul>
                ) : null}
              </details>
            ))}
          </section>

          <section className="mt-8" aria-label="Knowledge Check coverage" data-testid="knowledge-check-coverage">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">Knowledge Check · coverage</p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900">Knowledge Check coverage</h2>
            {'error' in state.coverage ? (
              <p className="mt-3 text-sm text-red-700" role="alert">Knowledge Check coverage could not be calculated: {state.coverage.error}</p>
            ) : (
              <>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {coverageTotals(state.coverage.coverage).map((item) => (
                    <div key={item.id} className={`rounded-xl border px-4 py-3 ${item.attention ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`} data-testid={`knowledge-check-total-${item.id}`} data-value={item.value}>
                      <dt className="text-[11px] font-semibold leading-4 text-slate-600">{item.label}</dt>
                      <dd className="mt-1 text-2xl font-black tabular-nums text-slate-900">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-[11px] text-slate-500">
                  {state.coverage.coverage.heldChapters} chapters held for review are not counted as gaps · {state.coverage.coverage.invalidQuestions} of {state.coverage.coverage.questions} authored questions were dropped as invalid · {state.coverage.coverage.blockedBeforeFix} chapters were blocked before the gate fix.
                </p>
                {state.coverage.coverage.affected.length ? (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[40rem] text-left text-xs" data-testid="knowledge-check-affected">
                      <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                        <tr><th className="py-2 pr-3">Chapter</th><th className="py-2 pr-3">Issue</th><th className="py-2">Reasons</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {state.coverage.coverage.affected.map((item) => (
                          <tr key={`${item.curriculumId}-${item.lessonTitle}-${item.chapterNumber}`} data-testid="knowledge-check-affected-row" data-issue={item.issue}>
                            <td className="py-2 pr-3 text-slate-800">{curriculumName(state.coverage.coverage, item.curriculumId)} › {item.lessonTitle} › Chapter {item.chapterNumber}{item.chapterTitle ? `: ${item.chapterTitle}` : ''}</td>
                            <td className="py-2 pr-3 font-semibold text-slate-700">{issueLabel(item.issue)}</td>
                            <td className="py-2 text-slate-500">{item.reasons.length ? item.reasons.join('; ') : 'No question names this chapter'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-600" data-testid="knowledge-check-none-affected">Every chapter has a valid Knowledge Check and no question data was dropped.</p>
                )}
              </>
            )}
          </section>

          <FlashcardCoverageSection result={state.flashcards} />

          <MatchSortCoverageSection load={load} />
        </>
      ) : null}
    </main>
  );
}
