import type { StorageLike } from '../../IndustryKnowledge/lessonFlowCore';
import { createLocalStorageAdapter, createMemoryAdapter } from '../flashcards/persistence';
import type { FlashcardPersistenceAdapter } from '../flashcards/persistence';
import { MATCH_SORT_STORAGE_KEY, createMemoryPersistence, createStoragePersistence } from '../matchSort/persistence';
import type { MatchSortPersistence } from '../matchSort/persistence';
import { notifyPracticeChanged } from './practiceLessonStore';

// Practice history lives in this browser only, one record per signed-in learner. Signed-out visits
// keep practice in memory, so nothing is left behind for the next person on a shared device.
// None of these keys overlap the Domain Knowledge records (`casemate:domain-*`).

export const browserStorage = (): StorageLike | null => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
};

const GUEST = '__guest__';
const flashcardAdapters = new Map<string, FlashcardPersistenceAdapter>();

/** Flashcard review schedules for this learner (`casemate:flashcards:v1:<scope>`). */
export function flashcardAdapterFor(scope: string | null): FlashcardPersistenceAdapter {
  const key = scope ?? GUEST;
  const cached = flashcardAdapters.get(key);
  if (cached) return cached;
  const base = scope ? createLocalStorageAdapter({ learnerKey: scope }) : createMemoryAdapter();
  const adapter: FlashcardPersistenceAdapter = {
    get kind() {
      return base.kind;
    },
    load: () => base.load(),
    save: (snapshot) => {
      base.save(snapshot);
      notifyPracticeChanged();
    },
    clear: () => {
      base.clear();
      notifyPracticeChanged();
    },
  };
  flashcardAdapters.set(key, adapter);
  return adapter;
}

export const matchSortStorageKeyFor = (scope: string) => `${MATCH_SORT_STORAGE_KEY}:${scope}`;
const matchSortGuest = createMemoryPersistence();

/** Match & Sort attempt history for this learner (`casemate:practice-review:match-sort:v1:<scope>`). */
export function matchSortPersistenceFor(scope: string | null): MatchSortPersistence {
  return scope ? createStoragePersistence(browserStorage(), matchSortStorageKeyFor(scope)) : matchSortGuest;
}
