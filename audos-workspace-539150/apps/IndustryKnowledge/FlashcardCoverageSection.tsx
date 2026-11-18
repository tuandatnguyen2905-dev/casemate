import type { CoverageCounts, FlashcardCoverage, FlashcardCurriculumCoverage } from './flashcardCoverage';
import { DEPTH_STANDARD } from '../InteractiveLearning/practiceReview/chapterCards';

export type FlashcardCoverageResult = { coverage: FlashcardCoverage } | { error: string };

const percent = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

const totals = (coverage: FlashcardCoverage): Array<{ id: string; label: string; value: number; attention?: boolean }> => [
  { id: 'curricula', label: 'Curricula', value: coverage.curricula },
  { id: 'eligible-chapters', label: 'Eligible chapters', value: coverage.eligibleChapters },
  { id: 'with-cards', label: 'Chapters with valid cards', value: coverage.chaptersWithCards },
  { id: 'zero', label: 'Chapters with zero cards', value: coverage.zero, attention: coverage.zero > 0 },
  { id: 'below', label: 'Below recommended depth', value: coverage.belowRecommended, attention: coverage.belowRecommended > 0 },
  { id: 'unique', label: 'Unique valid cards', value: coverage.unique },
  { id: 'authored', label: 'Authored cards', value: coverage.authored },
  { id: 'generated', label: 'Generated cards', value: coverage.generated },
  { id: 'duplicates', label: 'Duplicate cards', value: coverage.duplicates, attention: coverage.duplicates > 0 },
  { id: 'invalid', label: 'Invalid cards', value: coverage.invalid, attention: coverage.invalid > 0 },
  { id: 'unmapped', label: 'Cards without a valid chapter', value: coverage.unmapped, attention: coverage.unmapped > 0 },
  { id: 'objective-gaps', label: 'Sections no card tests', value: coverage.objectiveGaps, attention: coverage.objectiveGaps > 0 },
];

const countCells = (counts: CoverageCounts) => (
  <>
    <td className="py-2 pr-3 tabular-nums">{counts.eligibleChapters}</td>
    <td className="py-2 pr-3 tabular-nums">{counts.chaptersWithCards} ({percent(counts.chaptersWithCards, counts.eligibleChapters)}%)</td>
    <td className="py-2 pr-3 tabular-nums">{counts.belowRecommended}</td>
    <td className="py-2 pr-3 tabular-nums">{counts.zero}</td>
    <td className="py-2 tabular-nums">{counts.unique} <span className="text-slate-400">({counts.authored} / {counts.generated})</span></td>
  </>
);

const COUNT_HEADINGS = ['Chapters', 'With cards', 'Below depth', 'Zero', 'Cards (authored / generated)'];

const curriculumState = (item: FlashcardCurriculumCoverage) => (item.error || item.zero ? 'gaps' : item.belowRecommended ? 'enrich' : 'complete');
const STATE_LABEL = { gaps: 'Chapters without cards', enrich: 'Needs content enrichment', complete: 'Recommended depth' } as const;
const STATE_STYLE = { gaps: 'bg-amber-100 text-amber-800', enrich: 'bg-slate-100 text-slate-700', complete: 'bg-slate-900 text-white' } as const;

/** Read-only flashcard coverage for every curriculum: Industry → Sub-industry → Module → Lesson → Chapter. */
export function FlashcardCoverageSection({ result }: { result: FlashcardCoverageResult }) {
  return (
    <section className="mt-8" aria-label="Flashcard coverage" data-testid="flashcard-coverage">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">Flashcards · coverage</p>
      <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900">Flashcard coverage</h2>
      {'error' in result ? (
        <p className="mt-3 text-sm text-red-700" role="alert">Flashcard coverage could not be calculated: {result.error}</p>
      ) : (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {totals(result.coverage).map((item) => (
              <div key={item.id} className={`rounded-xl border px-4 py-3 ${item.attention ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`} data-testid={`flashcard-total-${item.id}`} data-value={item.value}>
                <dt className="text-[11px] font-semibold leading-4 text-slate-600">{item.label}</dt>
                <dd className="mt-1 text-2xl font-black tabular-nums text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            Only valid, unique cards count. {result.coverage.heldChapters} chapters held for review are not counted. Recommended depth per chapter comes from the specific teaching units it displays:
            introductory {DEPTH_STANDARD.introductory.min}–{DEPTH_STANDARD.introductory.max}, standard {DEPTH_STANDARD.standard.min}–{DEPTH_STANDARD.standard.max}, complex {DEPTH_STANDARD.complex.min}–{DEPTH_STANDARD.complex.max} cards.
            A chapter below it has no further text of its own to draw on and is flagged for content enrichment, never padded.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-xs" data-testid="flashcard-tiers">
              <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                <tr><th className="py-2 pr-3">Chapter depth</th><th className="py-2 pr-3">Chapters</th><th className="py-2 pr-3">Cards</th><th className="py-2">Below recommended</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(['introductory', 'standard', 'complex'] as const).map((tier) => (
                  <tr key={tier}>
                    <td className="py-2 pr-3 font-semibold capitalize text-slate-800">{tier}</td>
                    <td className="py-2 pr-3 tabular-nums">{result.coverage.tiers[tier].chapters}</td>
                    <td className="py-2 pr-3 tabular-nums">{result.coverage.tiers[tier].cards}</td>
                    <td className="py-2 tabular-nums">{result.coverage.tiers[tier].below}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-xs" data-testid="flashcard-groups">
              <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                <tr><th className="py-2 pr-3">Industry</th><th className="py-2 pr-3">Curricula</th>{COUNT_HEADINGS.map((heading) => <th key={heading} className="py-2 pr-3">{heading}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.coverage.groups.filter((group) => group.curricula).map((group) => (
                  <tr key={group.id} data-testid={`flashcard-group-${group.id}`}>
                    <td className="py-2 pr-3 font-semibold text-slate-800">{group.name}</td>
                    <td className="py-2 pr-3 tabular-nums">{group.curricula}</td>
                    {countCells(group)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2" aria-label="Flashcard coverage by sub-industry">
            {result.coverage.perCurriculum.map((item) => {
              const state = curriculumState(item);
              const exceptions = item.chapters.filter((chapter) => chapter.status === 'zero' || chapter.status === 'below-recommended' || chapter.duplicates || chapter.invalid || chapter.objectiveGap);
              return (
                <details key={item.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3" data-testid={`flashcard-coverage-${item.id}`} data-state={state}>
                  <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-semibold text-slate-800">{item.name} <span className="font-normal text-slate-400">· {item.groupName}</span></span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${STATE_STYLE[state]}`}>{STATE_LABEL[state]}</span>
                  </summary>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {item.chaptersWithCards} of {item.eligibleChapters} chapters with cards · {item.unique} cards ({item.authored} authored, {item.generated} generated){item.hasAuthoredDecks ? ' · authored decks completed with chapter cards' : ''} · {item.belowRecommended} below recommended depth · {item.zero} without cards
                    {item.duplicates ? ` · ${item.duplicates} duplicates` : ''}{item.invalid ? ` · ${item.invalid} invalid` : ''}{item.unmapped ? ` · ${item.unmapped} without a valid chapter` : ''}
                  </p>
                  {item.error ? <p className="mt-2 text-xs text-red-700">{item.error}</p> : null}
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[36rem] text-left text-[11px]">
                      <thead className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                        <tr><th className="py-1.5 pr-3">Module · lesson</th>{COUNT_HEADINGS.map((heading) => <th key={heading} className="py-1.5 pr-3">{heading}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {item.modules.flatMap((module) => [
                          <tr key={`module-${module.index}`} className="font-semibold text-slate-800"><td className="py-2 pr-3">{module.label}</td>{countCells(module)}</tr>,
                          ...item.lessonRows.filter((lesson) => lesson.moduleIndex === module.index).map((lesson) => (
                            <tr key={`lesson-${module.index}-${lesson.title}`} className="text-slate-600"><td className="py-2 pl-3 pr-3">{lesson.title}</td>{countCells(lesson)}</tr>
                          )),
                        ])}
                      </tbody>
                    </table>
                  </div>
                  {exceptions.length ? (
                    <ul className="mt-3 max-h-56 space-y-0.5 overflow-y-auto text-[11px] text-slate-500" data-testid="flashcard-coverage-exceptions">
                      {exceptions.map((chapter) => (
                        <li key={`${chapter.lessonTitle}-${chapter.chapterNumber}`}>
                          {chapter.lessonTitle} · Chapter {chapter.chapterNumber}: {chapter.chapterTitle} — {chapter.cards} of {chapter.recommended} recommended ({chapter.tier})
                          {chapter.status === 'zero' ? ' · no cards: flag for content enrichment' : chapter.status === 'below-recommended' ? ' · below depth: flag for content enrichment' : ''}
                          {chapter.duplicates ? ` · ${chapter.duplicates} duplicate` : ''}{chapter.invalid ? ` · ${chapter.invalid} invalid` : ''}{chapter.objectiveGap ? ' · a section no card tests' : ''}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </details>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
