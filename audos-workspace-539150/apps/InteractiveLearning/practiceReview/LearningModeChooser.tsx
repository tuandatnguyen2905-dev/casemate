import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, BookOpen, Layers, RefreshCw, Shuffle, Sparkles, X } from 'lucide-react';
import { LEARNING_MODE_IDS, chapterLearningModes } from './learningModes';
import type { ChapterModeState, LearningModeId } from './learningModes';
import { usePracticeLesson } from './practiceLessonStore';
import { requestPracticeResume } from './practiceResume';

const MODE_COPY: Record<LearningModeId, { title: string; description: string; icon: typeof BookOpen }> = {
  reader: {
    title: 'General Info',
    description: 'Prefer to read first? I’ll walk you through the key ideas with examples and visuals.',
    icon: BookOpen,
  },
  flashcards: {
    title: 'Flashcards',
    description: 'Want to test your memory? Recall each answer, then flip the card to check.',
    icon: Layers,
  },
  'match-sort': {
    title: 'Match & Sort',
    description: 'Prefer to learn by doing? Try a quick matching, grouping, or ordering activity.',
    icon: Shuffle,
  },
};

export const UNAVAILABLE_MODE_TEXT = 'Not available for this chapter yet';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2';
const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const countLabel = (mode: ChapterModeState) => {
  if (mode.id === 'reader') return 'Read the chapter';
  if (mode.id === 'flashcards') return `${mode.count} ${mode.count === 1 ? 'card' : 'cards'} in this chapter`;
  return `${mode.count} ${mode.count === 1 ? 'activity' : 'activities'} in this chapter`;
};

export interface LearningModeChooserProps {
  chapterNumber: number;
  chapterTitle: string;
  modes: Record<LearningModeId, ChapterModeState>;
  /** The mode the learner is in now, when the chooser is reopened from it. */
  current?: LearningModeId;
  onChoose: (mode: LearningModeId) => void;
  onClose: () => void;
  /** Focus target after the chooser is dismissed; defaults to the element focused when it opened. */
  returnFocus?: HTMLElement | null;
}

/**
 * Centered modal that asks how to learn one chapter. Esc, the close button and a backdrop click
 * dismiss it and return focus to the control that opened it; Tab stays inside; arrow keys move
 * between the mode cards. Unavailable modes stay visible and focusable but cannot be chosen.
 */
export function LearningModeChooser({ chapterNumber, chapterTitle, modes, current, onChoose, onClose, returnFocus }: LearningModeChooserProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const opener = useRef<HTMLElement | null>(typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null);
  const restoreFocus = useRef(true);

  useEffect(() => {
    const preferred = current ? LEARNING_MODE_IDS.indexOf(current) : LEARNING_MODE_IDS.findIndex((id) => modes[id].available);
    (cardRefs.current[preferred >= 0 ? preferred : 0] ?? panelRef.current)?.focus();
    return () => {
      if (!restoreFocus.current) return;
      const target = returnFocus ?? opener.current;
      window.setTimeout(() => {
        if (target?.isConnected) target.focus({ preventScroll: true });
      }, 0);
    };
  }, []);

  const choose = (mode: LearningModeId) => {
    if (!modes[mode].available) return;
    restoreFocus.current = mode === current;
    onChoose(mode);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === 'Tab') {
      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panelRef.current?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    const position = cardRefs.current.findIndex((card) => card === document.activeElement);
    if (!step || position < 0) return;
    event.preventDefault();
    cardRefs.current[(position + step + LEARNING_MODE_IDS.length) % LEARNING_MODE_IDS.length]?.focus();
  };

  const dialog = (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={onKeyDown}
      data-testid="learning-mode-backdrop"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="relative my-auto w-full max-w-3xl rounded-2xl bg-white p-5 text-slate-900 shadow-2xl outline-none sm:p-7"
        data-testid="learning-mode-chooser"
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 ${focusRing}`}
          aria-label="Close learning mode chooser"
          data-testid="learning-mode-close"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="pr-10 text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">Chapter {chapterNumber}</p>
        <h2 id={titleId} className="mt-1 pr-10 text-xl font-black tracking-tight text-slate-900 sm:text-2xl" data-testid="learning-mode-chapter">{chapterTitle}</h2>
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50/60 p-3 ring-1 ring-red-100">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white" aria-hidden="true">
            <Sparkles className="h-4 w-4" />
          </span>
          <p id={descriptionId} className="text-sm font-semibold leading-6 text-slate-800">Hey, I’m Mate. How would you like to learn this chapter?</p>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3" role="group" aria-label="Learning modes">
          {LEARNING_MODE_IDS.map((id, index) => {
            const mode = modes[id];
            const copy = MODE_COPY[id];
            const Icon = copy.icon;
            const statusId = `${titleId}-${id}-status`;
            const isCurrent = id === current;
            return (
              <button
                key={id}
                ref={(element) => { cardRefs.current[index] = element; }}
                type="button"
                onClick={() => choose(id)}
                aria-disabled={!mode.available}
                aria-describedby={statusId}
                aria-current={isCurrent ? 'true' : undefined}
                data-testid={`learning-mode-${id}`}
                data-available={mode.available ? 'true' : 'false'}
                className={`group flex h-full min-h-[11rem] flex-col rounded-2xl border p-4 text-left transition ${focusRing} ${mode.available
                  ? `bg-white hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md ${isCurrent ? 'border-red-300 ring-1 ring-red-200' : 'border-slate-200'}`
                  : 'cursor-not-allowed border-dashed border-slate-200 bg-slate-50'}`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${mode.available ? 'bg-red-50 text-red-600 ring-1 ring-red-100' : 'bg-slate-100 text-slate-400'}`} aria-hidden="true">
                    <Icon className="h-4 w-4" />
                  </span>
                  {isCurrent ? <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Current</span> : null}
                </span>
                <span className={`mt-3 text-base font-black tracking-tight ${mode.available ? 'text-slate-900' : 'text-slate-500'}`}>{copy.title}</span>
                <span className={`mt-1 text-sm leading-6 ${mode.available ? 'text-slate-600' : 'text-slate-400'}`}>{copy.description}</span>
                <span id={statusId} className={`mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-bold ${mode.available ? 'text-red-600' : 'text-slate-500'}`}>
                  {mode.available ? <>{countLabel(mode)} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></> : UNAVAILABLE_MODE_TEXT}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">Your reading progress, notes, Knowledge Checks and practice history are kept whichever way you learn.</p>
      </div>
    </div>
  );

  return typeof document !== 'undefined' && document.body ? createPortal(dialog, document.body) : dialog;
}

const switchButton = `inline-flex min-h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold normal-case tracking-normal text-slate-700 shadow-sm transition hover:border-red-200 hover:text-red-700 ${focusRing}`;

export function ChangeLearningModeButton({ onClick, buttonRef, className = '', testId = 'change-learning-mode' }: {
  onClick: () => void;
  buttonRef?: RefObject<HTMLButtonElement>;
  className?: string;
  testId?: string;
}) {
  return (
    <button ref={buttonRef} type="button" onClick={onClick} aria-haspopup="dialog" className={`${switchButton} ${className}`} data-testid={testId}>
      <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Change learning mode
    </button>
  );
}

/**
 * "Change learning mode" for the chapter reader. It reads the lesson the reader publishes for
 * Practice & Review, so it always offers the chapter that is open, under the reader's own gate.
 */
export function ReaderLearningModeSwitch({ className = '' }: { className?: string }) {
  const lesson = usePracticeLesson();
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const chapterIndex = lesson ? Math.min(Math.max(0, Math.trunc(Number(lesson.activeChapter) || 0)), Math.max(0, lesson.cards.length - 1)) : 0;
  const choices = useMemo(() => (open && lesson ? chapterLearningModes(lesson, chapterIndex) : null), [open, lesson, chapterIndex]);
  if (!lesson) return null;
  return (
    <>
      <ChangeLearningModeButton buttonRef={trigger} onClick={() => setOpen(true)} className={className} />
      {choices ? (
        <LearningModeChooser
          chapterNumber={chapterIndex + 1}
          chapterTitle={choices.chapterTitle}
          modes={choices.modes}
          current="reader"
          returnFocus={trigger.current}
          onClose={() => setOpen(false)}
          onChoose={(mode) => {
            setOpen(false);
            if (mode !== 'reader') requestPracticeResume({ identity: lesson.identity, modeId: mode, scope: 'chapter', chapterOnly: true, origin: { view: 'reader', chapterIndex, stage: 'learning' } });
          }}
        />
      ) : null}
    </>
  );
}
