// Which lesson card the module's Your Learning Path overview should bring into view when the learner
// comes back from a lesson (Return to Lesson, or the browser Back button from Practice & Review), and
// whether that lesson's Learning Mode Chooser should reopen on a chapter (a mode opened from the chooser).
// Tab-scoped and keyed by the lesson identity `<industryId>::<module title>::<lesson title>`, so it never
// depends on browser history.

const FOCUS_KEY = 'casemate:learning-path:focus:v1';
const MAX_AGE_MS = 30 * 60 * 1000;

export interface LearningPathFocus {
  identity: string;
  /** Reopen the lesson's Learning Mode Chooser on this chapter (original index). */
  chooserChapter?: number;
}

const tabStorage = () => {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null;
  }
};

export function requestLearningPathFocus(identity: string, chooserChapter?: number) {
  if (!identity) return;
  const reopen = Number.isInteger(chooserChapter) && (chooserChapter as number) >= 0 ? { chooserChapter } : {};
  try {
    tabStorage()?.setItem(FOCUS_KEY, JSON.stringify({ identity, ...reopen, at: Date.now() }));
  } catch {
    // The overview then opens at its top.
  }
}

export function clearLearningPathFocus() {
  try {
    tabStorage()?.removeItem(FOCUS_KEY);
  } catch {
    // Nothing to clear.
  }
}

/** The pending lesson when it belongs to one of `identities` (the open module); a matching or stale record is cleared. */
export function takeLearningPathFocusEntry(identities: string[], now = Date.now()): LearningPathFocus | null {
  let value: { identity?: unknown; chooserChapter?: unknown; at?: unknown } | null = null;
  try {
    value = JSON.parse(tabStorage()?.getItem(FOCUS_KEY) ?? 'null');
  } catch {
    value = null;
  }
  if (!value || typeof value.identity !== 'string' || typeof value.at !== 'number') return null;
  if (now - value.at > MAX_AGE_MS) {
    clearLearningPathFocus();
    return null;
  }
  if (!identities.includes(value.identity)) return null;
  clearLearningPathFocus();
  const chapter = value.chooserChapter;
  return Number.isInteger(chapter) && (chapter as number) >= 0 ? { identity: value.identity, chooserChapter: chapter as number } : { identity: value.identity };
}

export function takeLearningPathFocus(identities: string[], now = Date.now()): string | null {
  return takeLearningPathFocusEntry(identities, now)?.identity ?? null;
}
