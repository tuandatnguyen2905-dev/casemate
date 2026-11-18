import type { LibraryDifficulty, LibraryQuestion, LibrarySkill } from './skillQuestionLibrary';

/**
 * Charts and Structures present three difficulty levels. Each question keeps its
 * stored difficulty (and id, content, exhibits, answers, scoring and attempt
 * history); only the learner-facing level is derived from it:
 *   stored easy + stored medium -> Easy
 *   stored hard                 -> Medium
 *   stored expert               -> Hard
 * Behaviour that depends on the authored format (exhibit count, scoring, answer
 * layout) must keep reading the stored difficulty, never this display level.
 * Rollback source: reports/case-drill-difficulty-snapshot.json.
 */
const THREE_LEVEL_SKILLS: ReadonlySet<LibrarySkill> = new Set<LibrarySkill>(['charts', 'structures']);

const THREE_LEVEL_FILTERS: readonly LibraryDifficulty[] = ['easy', 'medium', 'hard'];
const LEGACY_FILTERS: readonly LibraryDifficulty[] = ['easy', 'medium', 'hard', 'expert'];

export const DISPLAY_DIFFICULTY_MAP: Record<LibraryDifficulty, LibraryDifficulty> = {
  easy: 'easy',
  medium: 'easy',
  hard: 'medium',
  expert: 'hard',
};

export function usesThreeLevelDifficulty(skill: LibrarySkill): boolean {
  return THREE_LEVEL_SKILLS.has(skill);
}

export function displayDifficultyOf(question: Pick<LibraryQuestion, 'skill' | 'difficulty'>): LibraryDifficulty {
  return usesThreeLevelDifficulty(question.skill) ? DISPLAY_DIFFICULTY_MAP[question.difficulty] : question.difficulty;
}

export function difficultyFilterLevelsFor(skill: LibrarySkill): readonly LibraryDifficulty[] {
  return usesThreeLevelDifficulty(skill) ? THREE_LEVEL_FILTERS : LEGACY_FILTERS;
}
