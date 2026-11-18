import type { ActivityRecord, AttemptSummary, MatchSortProgress } from './types';

/**
 * Practice history only. It never touches the Domain Knowledge keys
 * (`casemate:domain-reader:*`, `casemate:domain-quiz:*`, `casemate:domain-lesson-progress:v1`),
 * so Knowledge Check scores, chapter gates and lesson completion are unaffected.
 */
export const MATCH_SORT_STORAGE_KEY = 'casemate:practice-review:match-sort:v1';
const MAX_ATTEMPTS = 20;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Integration point: swap in a server-backed adapter with the same two methods. */
export interface MatchSortPersistence {
  load(): MatchSortProgress;
  save(progress: MatchSortProgress): void;
}

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

function parseAttempt(raw: unknown): AttemptSummary | null {
  if (!isRecord(raw) || typeof raw.at !== 'string' || typeof raw.correct !== 'number' || typeof raw.total !== 'number') return null;
  return { at: raw.at, correct: raw.correct, total: raw.total, allCorrect: raw.allCorrect === true, revealed: raw.revealed === true };
}

export function parseProgress(raw: unknown): MatchSortProgress {
  if (!isRecord(raw)) return {};
  const progress: MatchSortProgress = {};
  Object.entries(raw).forEach(([activityId, value]) => {
    if (!isRecord(value)) return;
    const attempts = Array.isArray(value.attempts) ? value.attempts.map(parseAttempt).filter((item): item is AttemptSummary => Boolean(item)) : [];
    progress[activityId] = {
      activityId,
      attempts,
      completedAt: typeof value.completedAt === 'string' ? value.completedAt : undefined,
      firstCheckAllCorrect: typeof value.firstCheckAllCorrect === 'boolean' ? value.firstCheckAllCorrect : undefined,
      revealedAt: typeof value.revealedAt === 'string' ? value.revealedAt : undefined,
    };
  });
  return progress;
}

export function recordAttempt(progress: MatchSortProgress, activityId: string, attempt: AttemptSummary): MatchSortProgress {
  const current: ActivityRecord = progress[activityId] ?? { activityId, attempts: [] };
  const next: ActivityRecord = { ...current, attempts: [...current.attempts, attempt].slice(-MAX_ATTEMPTS) };
  if (current.firstCheckAllCorrect === undefined && !attempt.revealed) next.firstCheckAllCorrect = attempt.allCorrect;
  if (attempt.allCorrect && !attempt.revealed && !current.completedAt) next.completedAt = attempt.at;
  if (attempt.revealed && !current.revealedAt) next.revealedAt = attempt.at;
  return { ...progress, [activityId]: next };
}

export function createMemoryPersistence(initial: MatchSortProgress = {}): MatchSortPersistence {
  let value = parseProgress(initial);
  return { load: () => value, save: (progress) => { value = progress; } };
}

export function createStoragePersistence(storage: StorageLike | null | undefined, key = MATCH_SORT_STORAGE_KEY): MatchSortPersistence {
  const memory = createMemoryPersistence();
  return {
    load: () => {
      if (!storage) return memory.load();
      try {
        return parseProgress(JSON.parse(storage.getItem(key) ?? '{}'));
      } catch {
        return memory.load();
      }
    },
    save: (progress) => {
      memory.save(progress);
      try {
        storage?.setItem(key, JSON.stringify(progress));
      } catch {
        // Private browsing or quota: history stays available for this session.
      }
    },
  };
}

export function defaultPersistence(): MatchSortPersistence {
  try {
    return createStoragePersistence(typeof window !== 'undefined' ? window.localStorage : null);
  } catch {
    return createMemoryPersistence();
  }
}
