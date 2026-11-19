import type { LibrarySkill } from './skillQuestionLibrary';

/** One-shot sessionStorage key: a LibrarySkill id Question Library consumes to open its list on that skill tab. */
export const CASE_DRILL_SKILL_KEY = 'casemate-case-drill-skill';

const LIBRARY_SKILLS: readonly LibrarySkill[] = ['charts', 'structures', 'calculations', 'creativity', 'market-sizing'];

export function isLibrarySkill(value: unknown): value is LibrarySkill {
  return typeof value === 'string' && (LIBRARY_SKILLS as readonly string[]).includes(value);
}

/** Opens Case Drill on the Question Library list filtered to one skill tab (no question is opened). */
export function openCaseDrillSkill(skill: LibrarySkill): void {
  if (!isLibrarySkill(skill)) return;
  try {
    sessionStorage.setItem(CASE_DRILL_SKILL_KEY, skill);
  } catch {
    // Case Drill still opens on its Question Library.
  }
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'case-drill' } }));
}
