// Learning-progress figures for the Aptitude Test landing page.
//
// Completed  = at least one submitted row in `aptitude_attempts` (an attempt the
//              countdown auto-submitted counts too).
// In progress = a row in `aptitude_test_starts` (the test was opened) with no
//              submission yet, including attempts the candidate exited midway.
// Each catalogue test counts once however many times it is retaken.
//
// Accuracy only uses questions with a right/wrong key. Situational Judgement
// (partial credit) and In-Tray / E-Tray (points per item) still count towards
// tests completed and questions practiced, but never towards accuracy.

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface ProgressCatalogEntry {
  id: string;
  family: string;
}

export interface ProgressAttemptRow {
  test_type: string | null;
  test_id: string;
  answers_json?: unknown;
}

export interface ProgressStartRow {
  test_type: string | null;
  test_id: string;
}

export interface FamilyProgress {
  completed: number;
  total: number;
  status: ProgressStatus;
}

export interface AptitudeProgress {
  totalTests: number;
  completedTests: number;
  submittedAttempts: number;
  questionsPracticed: number;
  gradedQuestions: number;
  correctAnswers: number;
  /** null when no right/wrong question has been submitted yet. */
  accuracyPercent: number | null;
  byFamily: Record<string, FamilyProgress>;
}

const UNGRADED_FAMILIES = new Set(['situational', 'in_tray']);

export function progressPercent(part: number, whole: number): number {
  if (!whole || whole <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((part / whole) * 100)));
}

function answerEntries(raw: unknown): Record<string, unknown>[] {
  let value = raw;
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object');
}

function isAnswered(entry: Record<string, unknown>): boolean {
  if (typeof entry.answered === 'boolean') return entry.answered;
  const chosen = entry.chosen;
  if (chosen === null || chosen === undefined) return false;
  if (typeof chosen === 'string') return chosen.trim() !== '';
  return true;
}

function isGradable(entry: Record<string, unknown>, testType: string | null): boolean {
  if (typeof entry.is_correct !== 'boolean') return false;
  if (entry.credit_percent !== undefined && entry.credit_percent !== null) return false;
  const family = typeof entry.source_category === 'string' ? entry.source_category : testType || '';
  return !UNGRADED_FAMILIES.has(family);
}

export function computeAptitudeProgress(
  catalog: readonly ProgressCatalogEntry[],
  attempts: readonly ProgressAttemptRow[],
  starts: readonly ProgressStartRow[],
): AptitudeProgress {
  const catalogKeys = new Set<string>();
  const familiesById = new Map<string, string[]>();
  const totals = new Map<string, number>();
  catalog.forEach((entry) => {
    const key = `${entry.family}:${entry.id}`;
    if (catalogKeys.has(key)) return;
    catalogKeys.add(key);
    familiesById.set(entry.id, [...(familiesById.get(entry.id) || []), entry.family]);
    totals.set(entry.family, (totals.get(entry.family) || 0) + 1);
  });

  // Older rows can carry a legacy or mismatched test_type, so fall back to the
  // test id when only one family contains it.
  const resolve = (testType: string | null, testId: string): string | null => {
    if (testType && catalogKeys.has(`${testType}:${testId}`)) return `${testType}:${testId}`;
    const families = familiesById.get(testId);
    return families && families.length === 1 ? `${families[0]}:${testId}` : null;
  };

  const completedKeys = new Set<string>();
  let questionsPracticed = 0;
  let gradedQuestions = 0;
  let correctAnswers = 0;

  attempts.forEach((row) => {
    const key = resolve(row.test_type, row.test_id);
    if (key) completedKeys.add(key);
    answerEntries(row.answers_json).forEach((entry) => {
      if (isAnswered(entry)) questionsPracticed += 1;
      if (isGradable(entry, row.test_type)) {
        gradedQuestions += 1;
        if (entry.is_correct === true) correctAnswers += 1;
      }
    });
  });

  const startedKeys = new Set<string>();
  starts.forEach((row) => {
    const key = resolve(row.test_type, row.test_id);
    if (key) startedKeys.add(key);
  });

  const byFamily: Record<string, FamilyProgress> = {};
  totals.forEach((total, family) => {
    byFamily[family] = { completed: 0, total, status: 'not_started' };
  });
  completedKeys.forEach((key) => {
    const family = key.slice(0, key.indexOf(':'));
    if (byFamily[family]) byFamily[family].completed += 1;
  });
  const familiesStarted = new Set<string>();
  startedKeys.forEach((key) => familiesStarted.add(key.slice(0, key.indexOf(':'))));
  Object.entries(byFamily).forEach(([family, item]) => {
    if (item.total > 0 && item.completed >= item.total) item.status = 'completed';
    else if (item.completed > 0 || familiesStarted.has(family)) item.status = 'in_progress';
  });

  return {
    totalTests: catalogKeys.size,
    completedTests: completedKeys.size,
    submittedAttempts: attempts.length,
    questionsPracticed,
    gradedQuestions,
    correctAnswers,
    accuracyPercent: gradedQuestions > 0 ? progressPercent(correctAnswers, gradedQuestions) : null,
    byFamily,
  };
}
