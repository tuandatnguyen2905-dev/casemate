import { useId, useState } from 'react';
import { ChevronDown, Lightbulb, Lock } from 'lucide-react';
import { JourneyChapter } from '../../IndustryKnowledge/lessonFlow';
import type { JourneyRow } from '../../IndustryKnowledge/lessonFlowCore';
import type { PracticeJourney as PracticeJourneyData } from './practiceLessonStore';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2';

const countLabel = (modeId: string, count: number) => {
  if (modeId === 'flashcards') return count ? `${count} ${count === 1 ? 'card' : 'cards'}` : 'No cards yet';
  return count ? `${count} ${count === 1 ? 'activity' : 'activities'}` : 'No activities yet';
};

const isOpenRow = (row: JourneyRow) => row.state !== 'locked' && row.state !== 'under-review';

/**
 * The lesson's Learning Journey inside a practice mode: the reader's own rows (titles, order and
 * states), used as the practice scope selector. Choosing a chapter keeps the mode; Knowledge Check and
 * Final Lesson Takeaways leave practice for the reader's existing routes. A sticky side column on
 * desktop; a collapsible list under the header on smaller screens.
 */
export function PracticeJourney({ journey, chapterIndex, modeId, counts, onSelectChapter, onSelectCheck, onSelectTakeaways }: {
  journey: PracticeJourneyData;
  chapterIndex: number;
  modeId: string;
  /** Open cards or activities per chapter for the current mode. */
  counts: number[];
  onSelectChapter: (index: number) => void;
  onSelectCheck: (index: number) => void;
  onSelectTakeaways: () => void;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const current = journey.rows[chapterIndex];
  const takeawaysLocked = journey.takeaways === 'locked';
  const choose = (index: number) => {
    setOpen(false);
    onSelectChapter(index);
  };
  return (
    <nav aria-label="Learning journey" className="min-w-0 lg:sticky lg:top-6" data-testid="practice-journey">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={listId}
        className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left lg:hidden ${focusRing}`}
        data-testid="practice-journey-toggle"
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Learning journey · Chapter {chapterIndex + 1} of {journey.rows.length}</span>
          <span className="block truncate text-sm font-semibold text-slate-800">{current?.title}</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div id={listId} className={`${open ? 'mt-2 block' : 'hidden'} lg:mt-0 lg:block`}>
        <p className="mb-2 hidden px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 lg:block">Learning journey</p>
        <div className="space-y-1">
          {journey.rows.map((row) => (
            <JourneyChapter
              key={row.index}
              testId={`practice-journey-chapter-${row.number}`}
              number={row.number}
              title={row.title}
              minutes={row.minutes}
              state={row.state}
              check={row.check}
              lockedBy={row.lockedBy}
              lockedByPreparation={row.lockedByPreparation}
              detail={isOpenRow(row) ? countLabel(modeId, counts[row.index] ?? 0) : undefined}
              checkActive={false}
              onSelectChapter={() => choose(row.index)}
              onSelectCheck={() => onSelectCheck(row.index)}
            />
          ))}
          <button
            type="button"
            onClick={onSelectTakeaways}
            disabled={takeawaysLocked}
            data-testid="practice-journey-takeaways"
            className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${takeawaysLocked ? 'cursor-not-allowed' : 'hover:bg-slate-50'}`}
          >
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${takeawaysLocked ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white'}`}>
              {takeawaysLocked ? <Lock className="h-3 w-3" /> : <Lightbulb className="h-3 w-3" />}
            </span>
            <span className="min-w-0">
              <span className={`block text-xs font-medium leading-5 ${takeawaysLocked ? 'text-slate-400' : 'text-slate-600'}`}>Final Lesson Takeaways</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{takeawaysLocked ? 'After the final check' : 'Available'}</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
