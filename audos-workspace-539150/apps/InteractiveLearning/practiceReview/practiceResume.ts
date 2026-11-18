// Where the learner was inside Practice & Review, so a refresh reopens the same mode and scope for the
// same lesson, and where they entered it from, so Return to Lesson goes back there. Tab-scoped
// (sessionStorage) and cleared when the learner returns to the lesson; it never touches lesson progress
// or practice history.

const RESUME_KEY = 'casemate:practice-review:resume:v1';
const MAX_AGE_MS = 6 * 60 * 60 * 1000;
/** An explicit request (the chooser, Change learning mode) is honoured only while the lesson it asked for is opening. */
const REQUEST_MAX_AGE_MS = 2 * 60 * 1000;

/** This page load. A record written earlier in the same page load never reopens practice just because a lesson mounts. */
export const PRACTICE_PAGE_LOAD = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

/** Fired after a resume record is written for a lesson that is already open (Learning Mode Chooser). */
export const PRACTICE_RESUME_EVENT = 'casemate:practice-review:resume';

/**
 * The screen a learning mode was opened from: the chapter reader (its own chooser, the Practice & Review
 * step or the takeaways card) or the Learning Mode Chooser on the module's Your Learning Path. Fixed when
 * the mode opens; switching chapters, scopes or modes inside practice never changes it.
 */
export interface PracticeOrigin {
  view: 'reader' | 'chooser';
  /** Original chapter index (the reader's deck after review holds). */
  chapterIndex: number;
  /** Reader stage the learner left; only the takeaways differ from the chapter's reading view. */
  stage?: 'learning' | 'takeaways';
}

export interface PracticeResume {
  identity: string;
  /** Open learning mode, or null for the Practice & Review overview. */
  modeId: string | null;
  scope?: string;
  /** Opened from the Learning Mode Chooser: content, counts and progress cover the reader's open chapter only. */
  chapterOnly?: boolean;
  /** Absent on records written before origins existed and on practice deep links. */
  origin?: PracticeOrigin;
  /** The learner just asked for this mode (chooser, Change learning mode, a chapter switch inside practice); one-shot. */
  requested?: boolean;
  /** The page load that wrote the record (`PRACTICE_PAGE_LOAD`). */
  pageLoad?: string;
  at: number;
}

const tabStorage = () => {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
};

export function parsePracticeOrigin(value: unknown): PracticeOrigin | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const { view, chapterIndex, stage } = value as Record<string, unknown>;
  if ((view !== 'reader' && view !== 'chooser') || !Number.isInteger(chapterIndex) || (chapterIndex as number) < 0) return undefined;
  return { view, chapterIndex: chapterIndex as number, ...(stage === 'takeaways' || stage === 'learning' ? { stage } : {}) };
}

export function readPracticeResume(identity: string, now = Date.now()): PracticeResume | null {
  try {
    const value = JSON.parse(tabStorage()?.getItem(RESUME_KEY) ?? 'null');
    if (!value || value.identity !== identity || typeof value.at !== 'number' || now - value.at > MAX_AGE_MS) return null;
    const origin = parsePracticeOrigin(value.origin);
    return {
      identity,
      modeId: typeof value.modeId === 'string' ? value.modeId : null,
      scope: typeof value.scope === 'string' ? value.scope : undefined,
      chapterOnly: value.chapterOnly === true ? true : undefined,
      ...(origin ? { origin } : {}),
      ...(value.requested === true ? { requested: true } : {}),
      ...(typeof value.pageLoad === 'string' ? { pageLoad: value.pageLoad } : {}),
      at: value.at,
    };
  } catch {
    return null;
  }
}

export function writePracticeResume(resume: Omit<PracticeResume, 'at' | 'pageLoad'>) {
  const { requested, ...rest } = resume;
  try {
    tabStorage()?.setItem(RESUME_KEY, JSON.stringify({ ...rest, ...(requested ? { requested: true } : {}), pageLoad: PRACTICE_PAGE_LOAD, at: Date.now() }));
  } catch {
    // Without tab storage a refresh simply returns to the lesson.
  }
}

/** Opens Practice & Review on the lesson that is already open, in the given mode. */
export function requestPracticeResume(resume: Omit<PracticeResume, 'at' | 'pageLoad' | 'requested'>) {
  writePracticeResume({ ...resume, requested: true });
  try {
    window.dispatchEvent(new CustomEvent(PRACTICE_RESUME_EVENT, { detail: { identity: resume.identity } }));
  } catch {
    // The resume record still reopens the mode on the next load.
  }
}

export function updatePracticeResumeScope(identity: string, scope: string) {
  const current = readPracticeResume(identity);
  if (current) writePracticeResume({ identity, modeId: current.modeId, scope, chapterOnly: current.chapterOnly, origin: current.origin });
}

export function clearPracticeResume() {
  try {
    tabStorage()?.removeItem(RESUME_KEY);
  } catch {
    // Nothing to clear.
  }
}

/**
 * Whether a lesson that just opened reopens practice from its resume record: yes for a fresh explicit request, and
 * for a reload of the page that was showing that mode (a record from an earlier page load while the address bar still
 * names the mode). Anything else was left behind earlier in this page load (browser Back or Forward, opening the
 * lesson again) and is stale: it never reopens practice. Practice progress lives elsewhere and is never touched.
 */
export function practiceRestoreDecision(
  resume: PracticeResume | null,
  link: { modeId: string } | null,
  now = Date.now(),
  pageLoad = PRACTICE_PAGE_LOAD,
): 'open' | 'stale' | 'none' {
  if (!resume) return 'none';
  if (resume.requested && now - resume.at <= REQUEST_MAX_AGE_MS) return 'open';
  if (resume.pageLoad !== pageLoad && resume.modeId !== null && link?.modeId === resume.modeId) return 'open';
  return 'stale';
}

export type PracticeReturn =
  | { to: 'reader'; chapterIndex: number; stage: 'learning' | 'takeaways' }
  | { to: 'chooser'; chapterIndex: number }
  | { to: 'learning-path' };

/**
 * Return to Lesson: the screen the mode was opened from, on the chapter it was opened for. Without an
 * origin (a deep link or an older record), or when that chapter is no longer open, the safe destination
 * is the module's Your Learning Path, never some other chapter.
 */
export function resolvePracticeReturn(origin: PracticeOrigin | null | undefined, isOpenChapter: (index: number) => boolean): PracticeReturn {
  if (!origin || !isOpenChapter(origin.chapterIndex)) return { to: 'learning-path' };
  if (origin.view === 'chooser') return { to: 'chooser', chapterIndex: origin.chapterIndex };
  return { to: 'reader', chapterIndex: origin.chapterIndex, stage: origin.stage === 'takeaways' ? 'takeaways' : 'learning' };
}

// Practice deep link: the open learning mode and chapter sit in the address bar next to the lesson's own
// dk* route params, so a copied link reopens the same mode. The chapter is 1-based; the reader's chapter
// gate still decides whether it opens.
export const PRACTICE_MODE_PARAM = 'dkPractice';
export const PRACTICE_CHAPTER_PARAM = 'dkChapter';

export function readPracticeLink(): { modeId: string; chapterIndex?: number } | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const modeId = params.get(PRACTICE_MODE_PARAM);
    if (!modeId) return null;
    const chapter = Number(params.get(PRACTICE_CHAPTER_PARAM));
    return { modeId, chapterIndex: Number.isInteger(chapter) && chapter >= 1 ? chapter - 1 : undefined };
  } catch {
    return null;
  }
}

/** Writes (or, with no mode, removes) the deep-link params on the current history entry. */
export function writePracticeLink(modeId: string | null, chapterIndex?: number) {
  try {
    const url = new URL(window.location.href);
    if (modeId) {
      url.searchParams.set(PRACTICE_MODE_PARAM, modeId);
      if (chapterIndex !== undefined) url.searchParams.set(PRACTICE_CHAPTER_PARAM, String(chapterIndex + 1));
    } else {
      url.searchParams.delete(PRACTICE_MODE_PARAM);
      url.searchParams.delete(PRACTICE_CHAPTER_PARAM);
    }
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  } catch {
    // The resume record still restores the mode after a refresh in this tab.
  }
}
