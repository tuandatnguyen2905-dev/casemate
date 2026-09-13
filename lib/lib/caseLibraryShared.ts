/**
 * caseLibraryShared.ts — shared types and formatting utilities for Casemate's
 * two prebuilt question libraries:
 *   • lib/caseMathLibrary.ts  → 100 case-math questions (Case Drill)
 *   • lib/casePoolLibrary.ts  → 100 full cases (Case Pool)
 *
 * WHY THE CONTENT IS BUILT IN CODE INSTEAD OF LIVING IN JSON FILES:
 * the space compiler cannot import JSON files at runtime (see the note in
 * lib/programTimelines.ts). So every question is built by a DETERMINISTIC
 * builder function (the same parameters always produce the same question, and
 * every number in a solution is COMPUTED, never hand-typed), while
 * data/case-math-library.json / data/case-pool-library.json are MANIFESTS:
 * the full list of 100 questions with distribution, templates, and exhibit
 * kinds for readers and future jobs to cross-check. When editing a library,
 * update both JSON files too.
 *
 * There is no AI call anywhere on this path: drawing a question is a
 * synchronous, instant operation.
 */

export type CaseDifficulty = 'easy' | 'medium' | 'hard';

export interface ExhibitTable {
  type: 'table';
  title: string;
  columns: string[];
  rows: Array<Array<string | number>>;
  note?: string;
}

export interface ExhibitChart {
  type: 'chart_data';
  chart_type: 'bar' | 'line' | 'pie';
  title: string;
  labels: string[];
  values: number[];
  unit?: string;
}

export interface ExhibitMetric {
  type: 'metric';
  label: string;
  value: string;
  context: string;
}

export type CaseExhibit = ExhibitTable | ExhibitChart | ExhibitMetric;

export const DIFFICULTY_LABELS: Record<CaseDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const DIFFICULTY_ORDER: CaseDifficulty[] = ['easy', 'medium', 'hard'];

/* --------------------------------------------------------------------------
 * Vietnamese-style number formatting: dots for thousands, comma for decimals.
 * ------------------------------------------------------------------------ */

export function n(x: number, d = 1): string {
  const rounded = Math.round(x);
  if (d <= 0 || Math.abs(x - rounded) < 1e-9) {
    return rounded.toLocaleString('de-DE');
  }
  const fixed = x.toFixed(d);
  const [whole, frac] = fixed.split('.');
  return Number(whole).toLocaleString('de-DE') + ',' + frac;
}

export function pct(x: number, d = 1): string {
  return x.toFixed(d).replace('.', ',') + '%';
}

export function money(x: number, unit = 'billion VND', d = 1): string {
  return `${n(x, d)} ${unit}`;
}

export function round1(x: number): number {
  return Math.round(x * 10) / 10;
}

export function round2(x: number): number {
  return Math.round(x * 100) / 100;
}

export function table(
  title: string,
  columns: string[],
  rows: Array<Array<string | number>>,
  note?: string,
): ExhibitTable {
  return note ? { type: 'table', title, columns, rows, note } : { type: 'table', title, columns, rows };
}

export function chart(
  chartType: 'bar' | 'line' | 'pie',
  title: string,
  labels: string[],
  values: number[],
  unit = '',
): ExhibitChart {
  return { type: 'chart_data', chart_type: chartType, title, labels, values, unit };
}

export function metric(label: string, value: string, context: string): ExhibitMetric {
  return { type: 'metric', label, value, context };
}

/**
 * Spread a list (question types / difficulties) evenly across the library
 * using a coprime stride, so someone browsing always sees a mix of types and
 * difficulty levels instead of identical clusters sitting next to each other.
 */
export function spread<T>(pool: T[], stride: number): T[] {
  const out: Array<T | null> = new Array(pool.length).fill(null);
  let idx = 0;
  pool.forEach((item) => {
    while (out[idx % pool.length] !== null) idx += 1;
    out[idx % pool.length] = item;
    idx += stride;
  });
  return out as T[];
}

/** Pick one element at random (no AI, no network call). */
export function sample<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}
