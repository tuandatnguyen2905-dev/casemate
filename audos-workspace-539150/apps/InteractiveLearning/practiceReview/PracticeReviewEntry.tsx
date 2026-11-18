import { Component, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Layers, Shuffle } from 'lucide-react';
import { isRestrictedChapter } from '../../IndustryKnowledge/lessonFlowCore';
import { describeContinueLearning, resolveContinueLearning } from './continueLearning';
import type { CurriculumStop } from './continueLearning';
import { ChapterSupportPanel } from './FlashcardDeckOverview';
import { FLASHCARDS_MODE } from './flashcardsMode';
import { usePracticeLearnerScope } from './learnerScope';
import { clearLearningPathFocus, requestLearningPathFocus } from './learningPathFocus';
import { ChangeLearningModeButton, LearningModeChooser, UNAVAILABLE_MODE_TEXT } from './LearningModeChooser';
import { chapterLearningModes, chapterModeCounts, learningChapterTitle, setReaderChapter } from './learningModes';
import type { LearningModeId } from './learningModes';
import { splitIdentity } from './lessonAccess';
import { MATCH_SORT_MODE } from './matchSortMode';
import type { PracticeChrome, PracticeContext, PracticeMode, PracticeModeSummary } from './modes';
import { PracticeJourney } from './PracticeJourney';
import { usePracticeLesson, usePracticeVersion } from './practiceLessonStore';
import { useLearningLanguage } from '../../IndustryKnowledge/localization/learningLanguage';
import { localizePracticeResolved } from '../../IndustryKnowledge/localization/practice/practiceLocalization';
import { uiChapterLabel, uiChapterOf, uiDueSubtitle, uiLearningModes, uiModeUnavailable, uiOptionalSubtitle, uiText } from '../../IndustryKnowledge/localization/uiText';
import type { PracticeLesson } from './practiceLessonStore';
import {
  PRACTICE_RESUME_EVENT, clearPracticeResume, practiceRestoreDecision, readPracticeLink, readPracticeResume, resolvePracticeReturn, updatePracticeResumeScope, writePracticeLink,
  writePracticeResume,
} from './practiceResume';
import type { PracticeOrigin } from './practiceResume';

/** Learning modes in display order. A future mode registers here and appears for any lesson it resolves. */
export const PRACTICE_MODES: Array<PracticeMode<any>> = [FLASHCARDS_MODE, MATCH_SORT_MODE];

const MODE_ICON: Record<string, typeof Layers> = { flashcards: Layers, 'match-sort': Shuffle };

interface ResolvedMode {
  mode: PracticeMode<any>;
  resolved: unknown;
  summary: PracticeModeSummary;
}

interface LessonPractice {
  lesson: PracticeLesson;
  context: PracticeContext;
  modes: ResolvedMode[];
  totals: { available: number; completed: number; locked: number; due: number };
}

/** `chapterOnly`: what each mode offers for the reader's open chapter alone (Learning Mode Chooser). */
export function useLessonPractice(chapterOnly = false, enabled = true): LessonPractice | null {
  const lesson = usePracticeLesson();
  const version = usePracticeVersion();
  const learnerScope = usePracticeLearnerScope();
  const [language] = useLearningLanguage();
  return useMemo(() => {
    if (!lesson || !enabled) return null;
    const context: PracticeContext = { learnerScope, chapterOnly };
    const modes = PRACTICE_MODES.flatMap((mode): ResolvedMode[] => {
      try {
        const resolved = localizePracticeResolved(mode.id, mode.resolve(lesson, context), language, lesson);
        return resolved ? [{ mode, resolved, summary: mode.summarise(resolved, context) }] : [];
      } catch {
        return [];
      }
    });
    if (!modes.length) return null;
    const totals = modes.reduce((sum, { summary }) => ({
      available: sum.available + summary.available,
      completed: sum.completed + summary.completed,
      locked: sum.locked + summary.locked,
      due: sum.due + (summary.due ?? 0),
    }), { available: 0, completed: 0, locked: 0, due: 0 });
    return { lesson, context, modes, totals };
  }, [lesson, version, learnerScope, chapterOnly, enabled, language]);
}

/** Practice is optional: if it ever fails, the lesson reader keeps working without it. */
class PracticeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const eyebrow = 'text-[10px] font-bold uppercase tracking-[0.16em] text-red-600';
const crumbButton = 'inline-flex min-h-9 items-center gap-1.5 rounded-md text-xs font-semibold text-slate-500 transition hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500';
const secondaryButton = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50';
const modeButton = 'mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-red-200 hover:text-red-700 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-400 sm:w-auto sm:self-start';
const focusButton = `${secondaryButton} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`;

const isDone = (summary: PracticeModeSummary) => summary.available > 0 && summary.completed === summary.available && !summary.due;
const progressAction = (due: number, done: boolean, started: boolean) => uiText(due ? 'Review due cards' : done ? 'Practice again' : started ? 'Continue practice' : 'Start practice');
const modeAction = (summary: PracticeModeSummary) => progressAction(summary.due ?? 0, isDone(summary), summary.completed > 0);
const actionLabel = (practice: LessonPractice) => progressAction(practice.totals.due, practice.modes.every(({ summary }) => isDone(summary)), practice.totals.completed > 0);
const humanise = (slug: string) => slug.split('-').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
const clampChapter = (lesson: PracticeLesson) => Math.min(Math.max(0, Math.trunc(Number(lesson.activeChapter) || 0)), Math.max(0, lesson.cards.length - 1));
const isPracticeMode = (id: string | null | undefined): id is 'flashcards' | 'match-sort' => id === 'flashcards' || id === 'match-sort';

function ModeCard({ item, onOpen }: { item: ResolvedMode; onOpen: () => void }) {
  const { mode, summary } = item;
  const titleId = useId();
  const Icon = MODE_ICON[mode.id] ?? Layers;
  const waiting = summary.available === 0;
  const action = waiting ? uiText('Opens as you complete chapters') : modeAction(summary);
  const label = uiText(mode.label);
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5" aria-labelledby={titleId} data-testid={`practice-mode-${mode.id}`}>
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-slate-200 text-red-600" aria-hidden="true">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h2 id={titleId} className="text-base font-black tracking-tight text-slate-900">{label}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{uiText(mode.description)}</p>
      <p className="mt-2 text-xs font-medium text-slate-500">{mode.highlights.map(uiText).join(' · ')}</p>
      <div className="mb-4 mt-4 border-t border-slate-100 pt-3">
        <p className="text-xs font-semibold text-slate-700" data-testid="practice-mode-progress">{summary.progressLabel}</p>
        {summary.lockedLabel ? <p className="mt-1 text-xs leading-5 text-slate-500">{summary.lockedLabel}</p> : null}
      </div>
      <button type="button" className={modeButton} onClick={onOpen} disabled={waiting} aria-label={`${action}: ${label}`}>
        {action}
        {waiting ? null : <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    </section>
  );
}

interface DialogEntry {
  modeId: string | null;
  scope?: string;
  /** Opened in a learning mode: the mode covers the reader's open chapter only. */
  chapterOnly?: boolean;
  /** Chapter a practice deep link asks for; the reader's gate decides whether it opens. */
  chapterIndex?: number;
  /** Where the learner opened practice from; absent for deep links and older resume records. */
  origin?: PracticeOrigin;
}

function PracticeReviewDialog({ practice: lessonPractice, onClose, initial = null }: { practice: LessonPractice; onClose: () => void; initial?: DialogEntry | null }) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lesson = lessonPractice.lesson;
  const identity = lesson.identity;
  const initialModeId = isPracticeMode(initial?.modeId) ? initial!.modeId : null;
  // Every learning mode works on one chapter: the chapter open in the reader, which the Learning Journey switches.
  const [activeModeId, setActiveModeId] = useState<string | null>(initialModeId);
  const chapterOnly = activeModeId !== null;
  const chapterPractice = useLessonPractice(true, chapterOnly);
  const [inSession, setInSession] = useState(false);
  const [chooserOpen, setChooserOpen] = useState(false);
  const chooserTrigger = useRef<HTMLButtonElement>(null);
  const active = chapterOnly ? chapterPractice?.modes.find((item) => item.mode.id === activeModeId) ?? null : null;
  const activeMode = PRACTICE_MODES.find((mode) => mode.id === activeModeId) ?? null;
  const { industryId, moduleTitle, lessonTitle } = splitIdentity(identity);
  const industryLabel = lessonPractice.modes.map(({ summary }) => summary.industryLabel).find(Boolean) ?? humanise(industryId);
  const chapterIndex = clampChapter(lesson);
  const chapterTitle = learningChapterTitle(lesson.cards, chapterIndex);
  const chapterLabel = uiChapterLabel(chapterIndex + 1, chapterTitle);
  const activeLabel = activeMode ? uiText(activeMode.label) : '';
  const journey = lesson.journey;
  const counts = useMemo(() => (isPracticeMode(activeModeId) ? chapterModeCounts(lesson, activeModeId) : []), [lesson, activeModeId]);
  const curriculumStops = useMemo<CurriculumStop[] | null>(() => {
    try {
      return lesson.curriculum
        ? lesson.curriculum.lessons().map((item) => ({
          identity: item.identity,
          title: item.title,
          moduleTitle: item.moduleLabel || item.moduleTitle,
          heldForReview: Array.isArray(item.chapters) && item.chapters.length > 0 && item.chapters.every((chapter) => isRestrictedChapter(chapter)),
        }))
        : null;
    } catch {
      return null;
    }
  }, [lesson.curriculum]);
  // Resolved from the reader's own Learning Journey rows, so practice never opens a chapter the reader would refuse.
  const continueTarget = useMemo(() => (journey ? resolveContinueLearning({ rows: journey.rows, chapterIndex, identity, lessons: curriculumStops }) : null), [journey, chapterIndex, identity, curriculumStops]);
  const choices = useMemo(() => (chooserOpen ? chapterLearningModes(lesson, chapterIndex) : null), [chooserOpen, lesson, chapterIndex]);
  // Fixed when practice opens: Return to Lesson goes back here whatever chapter, scope or mode the learner moves to.
  const [origin] = useState<PracticeOrigin | null>(() => (initial ? initial.origin ?? null : { view: 'reader', chapterIndex, stage: 'learning' }));
  const resumeOrigin = origin ?? undefined;

  useEffect(() => {
    headingRef.current?.focus();
  }, [activeModeId]);

  // Browser Back from here lands on the module overview with this lesson's card in view.
  useEffect(() => {
    requestLearningPathFocus(identity);
  }, [identity]);

  useEffect(() => {
    const previous = readPracticeResume(identity);
    writePracticeResume({ identity, modeId: activeModeId, scope: activeModeId ? previous?.scope ?? 'chapter' : undefined, chapterOnly: chapterOnly || undefined, origin: resumeOrigin });
  }, [identity, activeModeId, chapterIndex]);

  // Leaving the lesson with practice still open (browser Back, another route) points the reader back at the origin
  // chapter, so the lesson never reopens on whichever chapter practice last showed. Leaving through the dialog clears the
  // record first, and a chapter switch made inside practice marks it requested, so neither lands here.
  useEffect(() => () => {
    const record = readPracticeResume(identity);
    if (!record || record.requested || !origin || origin.stage === 'takeaways' || !lesson.persistenceKey) return;
    setReaderChapter(lesson.persistenceKey, origin.chapterIndex);
  }, []);

  useEffect(() => {
    writePracticeLink(activeModeId, activeModeId ? chapterIndex : undefined);
  }, [activeModeId, chapterIndex]);

  // A deep link may ask for another chapter; only an open, not-held chapter is taken.
  useEffect(() => {
    if (initial?.chapterIndex === undefined || initial.chapterIndex === chapterIndex) return;
    const row = journey?.rows[initial.chapterIndex];
    if (row && row.state !== 'locked' && row.state !== 'under-review') lesson.actions?.selectChapter(initial.chapterIndex);
  }, []);

  const leave = () => {
    clearPracticeResume();
    writePracticeLink(null);
    onClose();
  };
  /** Closes practice and shows the chapter reader underneath. */
  const leaveToReader = () => {
    clearLearningPathFocus();
    leave();
  };
  /**
   * The one return control, Return to Lesson: the reader chapter (or takeaways) practice was opened from, or the
   * Learning Mode Chooser it was opened from on Your Learning Path. Without a usable origin: Your Learning Path.
   */
  const returnToLesson = () => {
    const target = resolvePracticeReturn(origin, (index) => index < lesson.cards.length && Boolean(lesson.accessible[index]));
    if (target.to === 'reader') {
      if (target.chapterIndex !== chapterIndex) lesson.actions?.selectChapter(target.chapterIndex);
      if (target.stage === 'takeaways') lesson.actions?.openTakeaways();
      leaveToReader();
      return;
    }
    leave();
    if (!lesson.actions?.backToLearningPath()) clearLearningPathFocus();
    else if (target.to === 'chooser') requestLearningPathFocus(identity, target.chapterIndex);
  };

  /** Continue Learning: the next open chapter, the Knowledge Check that opens it, the next lesson, or Your Learning Path. */
  const continueLearning = () => {
    const target = continueTarget;
    if (!target) return;
    if (target.kind === 'chapter') {
      if (!lesson.actions?.selectChapter(target.chapterIndex)) {
        returnToLesson();
        return;
      }
      leaveToReader();
      return;
    }
    if (target.kind === 'check') {
      leaveToReader();
      lesson.actions?.openCheck(target.checkIndex);
      return;
    }
    if (target.kind === 'lesson') {
      let next: { open: () => void } | undefined;
      try {
        next = lesson.curriculum?.lessons().find((item) => item.identity === target.identity);
      } catch {
        next = undefined;
      }
      if (!next) {
        returnToLesson();
        return;
      }
      leaveToReader();
      next.open();
      return;
    }
    leave();
    if (!lesson.actions?.backToLearningPath()) clearLearningPathFocus();
  };

  useEffect(() => {
    if (activeModeId) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      event.preventDefault();
      leaveToReader();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModeId, onClose]);

  /** Switches the reader's chapter; the mode stays and every count follows the new chapter. */
  const selectChapter = (index: number) => {
    if (index === chapterIndex) return;
    const row = journey?.rows[index];
    if (!row || row.state === 'locked' || row.state === 'under-review') return;
    setInSession(false);
    writePracticeResume({ identity, modeId: activeModeId, scope: 'chapter', chapterOnly: true, origin: resumeOrigin, requested: true });
    lesson.actions?.selectChapter(index);
  };

  const openMode = (id: string) => {
    if (isPracticeMode(id)) {
      const modeCounts = chapterModeCounts(lesson, id);
      const target = modeCounts[chapterIndex] ? chapterIndex : modeCounts.findIndex((count) => count > 0);
      if (target >= 0 && target !== chapterIndex) {
        writePracticeResume({ identity, modeId: id, scope: 'chapter', chapterOnly: true, origin: resumeOrigin, requested: true });
        lesson.actions?.selectChapter(target);
      }
    }
    setInSession(false);
    setActiveModeId(id);
  };

  // The Learning Mode Chooser switches modes for the same chapter; General Info returns to the reader.
  const chooseMode = (mode: LearningModeId) => {
    setChooserOpen(false);
    if (mode === 'reader') {
      leaveToReader();
      return;
    }
    if (mode === activeModeId) return;
    setInSession(false);
    setActiveModeId(mode);
  };

  const chrome: PracticeChrome = {
    headingId,
    headingRef,
    lessonTitle,
    moduleTitle,
    initialScope: readPracticeResume(identity)?.scope ?? 'chapter',
    onScopeChange: (scope) => updatePracticeResumeScope(identity, scope),
    continueLearning: continueTarget ? { ...describeContinueLearning(continueTarget), onSelect: continueLearning } : undefined,
    returnToLesson,
  };

  const header = (
    <nav aria-label={uiText('Practice and review')} className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <button type="button" onClick={returnToLesson} className={crumbButton} data-testid="practice-back-to-lesson">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {uiText('Return to Lesson')}
      </button>
      {activeMode ? (
        <>
          <span className="text-xs text-slate-300" aria-hidden="true">/</span>
          <span className="max-w-[14rem] truncate text-xs font-semibold text-slate-500" data-testid="practice-chapter-crumb">{chapterLabel}</span>
          <span className="text-xs text-slate-300" aria-hidden="true">/</span>
          <span className="text-xs font-semibold text-slate-700" aria-current="page">{activeLabel}</span>
        </>
      ) : null}
      <ChangeLearningModeButton buttonRef={chooserTrigger} onClick={() => setChooserOpen(true)} className="ml-auto" testId="practice-change-learning-mode" />
    </nav>
  );

  const modeView = activeMode ? (
    <div className="mt-5 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-8" data-testid="practice-chapter-layout">
      {journey ? (
        <PracticeJourney
          journey={journey}
          chapterIndex={chapterIndex}
          modeId={activeMode.id}
          counts={counts}
          onSelectChapter={selectChapter}
          onSelectCheck={(index) => { leaveToReader(); lesson.actions?.openCheck(index); }}
          onSelectTakeaways={() => { leaveToReader(); lesson.actions?.openTakeaways(); }}
        />
      ) : null}
      <div className="mt-5 min-w-0 lg:mt-0">
        <header>
          <p className={eyebrow}>{activeLabel} · {uiChapterOf(chapterIndex + 1, lesson.cards.length)}</p>
          <h1 id={headingId} ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-black tracking-tight text-slate-900 outline-none sm:text-3xl" data-testid="practice-chapter-title">{chapterTitle}</h1>
          <p className="mt-1 text-xs font-medium text-slate-500" data-testid="practice-context">{lessonTitle} · {industryLabel}</p>
        </header>
        {active && chapterPractice ? (
          <section className="mt-5" aria-label={uiText(active.mode.label)} data-practice-mode={active.mode.id}>
            <PracticeBoundary>
              <active.mode.Body key={`${active.mode.id}:${chapterIndex}`} resolved={active.resolved} context={chapterPractice.context} onSessionChange={setInSession} chrome={chrome} />
            </PracticeBoundary>
          </section>
        ) : (
          <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5" data-testid="practice-chapter-unavailable">
            <p className="text-sm font-semibold text-slate-800">{uiText(UNAVAILABLE_MODE_TEXT)}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{uiModeUnavailable(activeLabel, chapterLabel)}</p>
            <button type="button" onClick={() => setChooserOpen(true)} className={`mt-4 ${focusButton}`}>{uiText('Choose another learning mode')}</button>
          </section>
        )}
        {inSession ? null : (
          <div className="mt-6">
            <ChapterSupportPanel key={chapterIndex} fixed origin={{ chapters: lesson.cards, accessible: lesson.accessible, chapterIndex, persistenceKey: lesson.persistenceKey }} />
          </div>
        )}
      </div>
    </div>
  ) : null;

  const hubView = (
    <>
      <p className={`mt-5 ${eyebrow}`}>{uiText('Practice & Review · Optional')}</p>
      <h1 id={headingId} ref={headingRef} tabIndex={-1} className="mt-2 text-2xl font-black tracking-tight text-slate-900 outline-none">{lessonTitle}</h1>
      <p className="mt-1 text-xs font-medium text-slate-500" data-testid="practice-context">{`${industryLabel} · ${moduleTitle}`}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {uiText('Optional revision, one chapter at a time. Results stay separate from Knowledge Checks and never change chapter access, scores or lesson completion.')}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2" data-testid="practice-mode-list">
        {lessonPractice.modes.map((item) => <ModeCard key={item.mode.id} item={item} onOpen={() => openMode(item.mode.id)} />)}
      </div>
      <p className="mt-5 text-xs leading-5 text-slate-500">
        {uiText(lessonPractice.context.learnerScope
          ? 'Practice progress is saved in this browser for your account.'
          : 'You are not signed in, so practice progress is kept only until you leave this page.')}
      </p>
    </>
  );

  const dialog = (
    <div role="dialog" aria-modal="true" aria-labelledby={headingId} className="fixed inset-0 z-[1000] overflow-y-auto bg-white text-slate-900" data-testid="practice-review-dialog">
      <div className={`mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 ${activeMode ? 'max-w-6xl' : 'max-w-3xl'}`}>
        {header}
        {modeView ?? hubView}
      </div>
      {choices ? (
        <LearningModeChooser
          chapterNumber={chapterIndex + 1}
          chapterTitle={choices.chapterTitle}
          modes={choices.modes}
          current={isPracticeMode(activeModeId) ? activeModeId : undefined}
          returnFocus={chooserTrigger.current}
          onClose={() => setChooserOpen(false)}
          onChoose={chooseMode}
        />
      ) : null}
    </div>
  );

  // Rendered at the document root so no sticky or transformed ancestor in the reader can paint over it.
  return typeof document !== 'undefined' && document.body ? createPortal(dialog, document.body) : dialog;
}

/** A refresh restores Practice & Review once per page load, for the lesson it was open on. */
let resumeClaimedAt: number | null = null;
/** A practice deep link (dkPractice in the address bar) is honoured only on the page load that carries it. */
let practiceLinkHandled = false;

function usePracticeDialog(identity: string | null) {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState<DialogEntry | null>(null);
  const [dialogKey, setDialogKey] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);

  // A refresh, a practice deep link, or the Learning Mode Chooser on the open lesson (PRACTICE_RESUME_EVENT) reopens a mode.
  useEffect(() => {
    if (!identity) return undefined;
    const claim = () => {
      const resume = readPracticeResume(identity);
      if (resume && resumeClaimedAt === resume.at) return;
      const decision = practiceRestoreDecision(resume, readPracticeLink());
      if (decision === 'stale') {
        // Left behind earlier in this page load (Back, Forward, opening the lesson again): the lesson opens normally.
        clearPracticeResume();
        writePracticeLink(null);
        practiceLinkHandled = true;
        return;
      }
      if (resume && decision === 'open') {
        resumeClaimedAt = resume.at;
        practiceLinkHandled = true;
        setInitial({ modeId: resume.modeId, scope: resume.scope, chapterOnly: resume.chapterOnly, origin: resume.origin });
        setDialogKey((value) => value + 1);
        setOpen(true);
        return;
      }
      const link = practiceLinkHandled ? null : readPracticeLink();
      practiceLinkHandled = true;
      if (!link || !isPracticeMode(link.modeId)) return;
      setInitial({ modeId: link.modeId, scope: 'chapter', chapterOnly: true, chapterIndex: link.chapterIndex });
      setDialogKey((value) => value + 1);
      setOpen(true);
    };
    if (!open) claim();
    window.addEventListener(PRACTICE_RESUME_EVENT, claim);
    return () => window.removeEventListener(PRACTICE_RESUME_EVENT, claim);
  }, [identity]);

  /** Opens the Practice & Review overview; `origin` names the reader screen it was opened from (its open chapter by default). */
  const show = (origin?: PracticeOrigin) => {
    practiceLinkHandled = true;
    setInitial(origin ? { modeId: null, origin } : null);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    // Focus goes back to the entry point without scrolling the reader away from where the learner was reading.
    window.setTimeout(() => trigger.current?.focus({ preventScroll: true }), 0);
  };
  return { open, show, initial, trigger, close, dialogKey };
}

function JourneyStep() {
  const practice = useLessonPractice();
  const { open, show, initial, trigger, close, dialogKey } = usePracticeDialog(practice && practice.totals.available ? practice.lesson.identity : null);
  // Shown only once something in this lesson is open to practise.
  if (!practice || practice.totals.available === 0) return null;
  const { due } = practice.totals;
  const modesLabel = practice.modes.length === 1 ? uiText(practice.modes[0].mode.label) : uiLearningModes(practice.modes.length);
  const subtitle = due ? uiDueSubtitle(due) : uiOptionalSubtitle(modesLabel);
  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => show()}
        data-testid="journey-practice-review"
        className="flex min-w-[min(70vw,220px)] snap-start items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-slate-50 lg:mt-1 lg:w-full lg:min-w-0"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-red-600 ring-1 ring-slate-200">
          <Layers className="h-3 w-3" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-medium leading-5 text-slate-600">{uiText('Practice & Review')}</span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">{subtitle}</span>
        </span>
      </button>
      {open ? <PracticeReviewDialog key={dialogKey} practice={practice} onClose={close} initial={initial} /> : null}
    </>
  );
}

function TakeawaysCard() {
  const practice = useLessonPractice();
  const { open, show, initial, trigger, close, dialogKey } = usePracticeDialog(practice && practice.totals.available ? practice.lesson.identity : null);
  if (!practice || !practice.totals.available) return null;
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-label={uiText('Practice and review')} data-testid="takeaways-practice-review">
      <p className={eyebrow}>{uiText('Practice & Review · Optional')}</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 text-sm leading-6 text-slate-600">
          <ul className="space-y-0.5">
            {practice.modes.map(({ mode, summary }) => (
              <li key={mode.id}><span className="font-semibold text-slate-800">{uiText(mode.label)}</span> · {summary.progressLabel}</li>
            ))}
          </ul>
          <p className="mt-1 text-xs text-slate-500">{uiText('Practice never changes your Knowledge Check scores.')}</p>
        </div>
        <button ref={trigger} type="button" onClick={() => show({ view: 'reader', chapterIndex: clampChapter(practice.lesson), stage: 'takeaways' })} className={`${secondaryButton} shrink-0 whitespace-nowrap`}>{actionLabel(practice)}</button>
      </div>
      {open ? <PracticeReviewDialog key={dialogKey} practice={practice} onClose={close} initial={initial} /> : null}
    </section>
  );
}

/** Journey step after Final Lesson Takeaways. Renders nothing for lessons without practice. */
export function PracticeReviewJourneyStep() {
  return <PracticeBoundary><JourneyStep /></PracticeBoundary>;
}

/** Compact practice prompt on the Lesson Takeaways screen. Renders nothing without practice. */
export function PracticeReviewTakeawaysCard() {
  return <PracticeBoundary><TakeawaysCard /></PracticeBoundary>;
}
