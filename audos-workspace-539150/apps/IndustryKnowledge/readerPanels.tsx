import { useEffect, useRef, useState } from 'react';
import { NotebookPen } from 'lucide-react';
import { HELD_VISUAL_TEXT } from './chapterVisualText';
import { REVIEW_HOLDS } from './reviewHolds';

const sameLesson = (left: string, right: string) => left.replace(/\s+/g, ' ').trim().toLowerCase() === right.replace(/\s+/g, ' ').trim().toLowerCase();

/** True when a whole lesson is held, so its card and route show Under Review instead of a deck of held chapters. */
export const isLessonHeldForReview = (moduleKey: string, lessonTitle: string) => REVIEW_HOLDS.some((hold) => hold.scope === 'lesson' && hold.moduleKey === moduleKey && sameLesson(hold.lesson, lessonTitle));

/** A chapter whose Learning Visual is held keeps its heading text but has no diagram to show or enlarge. */
export const isHeldLearningVisual = (card: { visualHeading?: string } | undefined) => card?.visualHeading === HELD_VISUAL_TEXT.heading;

/** Shown in place of a held chapter's body; the hold keeps the chapter slot, so no content or check renders. */
export function ChapterUnderReviewNotice() {
  return (
    <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6" role="status" data-testid="chapter-under-review">
      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-800">Under review</span>
      <p className="mt-3 text-sm leading-6 text-slate-700">This chapter is being checked against its sources and is not available yet. It has no Knowledge Check, so it does not block the chapters after it.</p>
    </section>
  );
}

/**
 * Learner notes for one chapter. Notes are keyed by the chapter's original index in the lesson deck
 * (review holds keep held chapters in place), so a note always stays with its chapter.
 */
export function ChapterNotesPanel({ chapterNumber, initialValue, onSave }: { chapterNumber: number; initialValue: string; onSave: (value: string) => void }) {
  const [value, setValue] = useState(initialValue);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const id = `chapter-notes-${chapterNumber}`;
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white" aria-labelledby={`${id}-label`} data-testid="chapter-notes">
      <div className="flex min-h-12 items-center justify-between gap-2 px-4">
        <h2 id={`${id}-label`} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
          <NotebookPen className="h-3.5 w-3.5" aria-hidden /> My notes
        </h2>
        <span className="text-[10px] font-medium text-slate-400" aria-live="polite" data-testid="chapter-notes-status">{saved ? 'Saved' : ''}</span>
      </div>
      <div className="border-t border-slate-100 p-4 pt-3">
        <label htmlFor={id} className="sr-only">Notes for chapter {chapterNumber}</label>
        <textarea
          id={id}
          value={value}
          rows={5}
          onChange={(event) => {
            const next = event.target.value;
            setValue(next);
            onSave(next);
            setSaved(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setSaved(false), 1500);
          }}
          placeholder="Write what you want to remember from this chapter."
          className="block w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700 placeholder:text-slate-400 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100"
        />
        <p className="mt-2 text-[10px] leading-4 text-slate-400">Saved on this device for Chapter {chapterNumber}.</p>
      </div>
    </section>
  );
}
