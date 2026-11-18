import { QUESTION_LIBRARY, type LibraryExhibit } from './skillQuestionLibrary';
import { restoreArchivedHardQuestion } from './hardCaseDrillQuestions';
import { CASE_POOL_LIBRARY } from './casePoolLibrary';

/*
 * Exhibit readability audit for every Case Drill question and Case Pool case.
 *
 * Learners must be able to read and copy every figure a question needs, so the
 * data behind each exhibit has to be complete and self-consistent before the
 * renderers draw it. Rendered geometry (clipped or overlapping labels) needs a
 * browser and is checked separately; this file covers the data rules.
 */

const TABLE_KINDS = new Set(['table', 'financial-table', 'market-sizing-table', 'sensitivity-table', 'kpi-scorecard']);
const WATERFALL_ENDING_LABEL = /\b(?:ending|closing|final|end value|at test|year[- ]three target|addressable students|store profit|gross profit|net debt|operating profit|arr|ebit|ebitda|revenue)\b/i;
/** A decimal comma ("8,9 months") reads as a thousands separator next to the English-format tables. */
const DECIMAL_COMMA = /(?<![\d,.])\d{1,3},\d{1,2}(?![\d])/;
/** Exhibits whose source never defines a unit; held for content review rather than given an invented one. */
const UNIT_REVIEW = new Set(['charts-easy-007-ex1', 'charts-easy-019-ex1', 'charts-easy-055-ex1', 'charts-easy-067-ex1']);

interface Owned {
  owner: string;
  exhibit: LibraryExhibit;
  siblings: LibraryExhibit[];
}

function fail(problems: string[]): void {
  if (problems.length) throw new Error(`Exhibit readability audit: ${problems.length} problem(s): ${problems.slice(0, 12).join(' | ')}`);
}

function parseDisplay(text: string): number | null {
  const clean = String(text).replace(/[,\s%]/g, '').replace(/[^\d.()+-]/g, '');
  if (!/^\(?[+-]?\d*\.?\d+\)?$/.test(clean)) return null;
  const value = Number(clean.replace(/[()]/g, ''));
  if (!Number.isFinite(value)) return null;
  return clean.startsWith('(') && clean.endsWith(')') ? -value : value;
}

function libraryExhibits(): Owned[] {
  const owned: Owned[] = [];
  Object.values(QUESTION_LIBRARY).flat().map(restoreArchivedHardQuestion).filter((question) => question.reviewStatus !== 'Archived').forEach((question) => {
    const list = question.exhibits?.length ? question.exhibits : question.exhibit ? [question.exhibit] : [];
    list.forEach((exhibit) => owned.push({ owner: question.id, exhibit, siblings: list }));
  });
  CASE_POOL_LIBRARY.forEach((item) => (item.journey_exhibits || []).forEach((exhibit) => owned.push({ owner: item.id, exhibit, siblings: item.journey_exhibits || [] })));
  return owned;
}

/** Every string inside a value: exhibit titles, cells, notes and metric cards. */
function textOf(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(textOf);
  if (value && typeof value === 'object') return Object.values(value).flatMap(textOf);
  return [];
}

function series(exhibit: LibraryExhibit): { categories: string[]; series: Array<{ name: string; unit?: string; values: number[]; displayValues?: string[]; xValues?: number[] }> } {
  const categories = (exhibit.categories || exhibit.labels || []).map(String);
  const list = exhibit.series?.length
    ? exhibit.series.map((item) => ({ ...item, values: item.values.map(Number) }))
    : exhibit.values ? [{ name: exhibit.metrics?.[0] || exhibit.unit || 'Value', values: exhibit.values.map(Number) }] : [];
  return { categories, series: list };
}

export function runExhibitReadabilityTests(): void {
  const problems: string[] = [];
  const owned = libraryExhibits();
  if (owned.length < 500) problems.push(`only ${owned.length} library exhibits found; the bank failed to load.`);

  owned.forEach(({ owner, exhibit }) => {
    const id = `${owner} / ${exhibit.id || exhibit.title}`;
    if (!String(exhibit.title || '').trim()) problems.push(`${id}: no title.`);
    if (TABLE_KINDS.has(exhibit.kind)) {
      if (exhibit.kind !== 'kpi-scorecard') {
        if (!exhibit.columns?.length || !exhibit.rows?.length) problems.push(`${id}: table has no columns or rows.`);
        (exhibit.rows || []).forEach((row, index) => {
          if (row.length !== (exhibit.columns || []).length) problems.push(`${id}: row ${index + 1} has ${row.length} cells for ${(exhibit.columns || []).length} columns.`);
          row.forEach((cell) => { if (!String(cell ?? '').trim()) problems.push(`${id}: row ${index + 1} has an empty cell.`); });
        });
      }
      return;
    }
    const { categories, series: list } = series(exhibit);
    if (!categories.length || !list.length) problems.push(`${id}: no plotted data.`);
    if (new Set(categories.map((category) => category.toLowerCase().trim())).size !== categories.length) problems.push(`${id}: two categories share a label, so one is hidden in the data table.`);
    list.forEach((item) => {
      if (item.values.length !== categories.length) problems.push(`${id}: ${item.name} has ${item.values.length} values for ${categories.length} categories.`);
      if (item.values.some((value) => !Number.isFinite(value))) problems.push(`${id}: ${item.name} has a non-numeric value.`);
      if (exhibit.kind !== 'scatter' && exhibit.kind !== 'bubble') {
        (item.displayValues || []).forEach((display, index) => {
          const parsed = parseDisplay(display);
          if (parsed === null) return;
          const value = item.values[index];
          const scaled = [1, 1e3, 1e-3, 1e6, 1e-6, 1e9, 1e-9].map((factor) => parsed * factor);
          if (!scaled.some((candidate) => Math.abs(candidate - value) <= Math.max(Math.abs(value) * 0.006, 0.051))) problems.push(`${id}: table shows "${display}" for ${categories[index]} but the chart plots ${value}.`);
        });
      }
    });
    if ((exhibit.kind === 'scatter' || exhibit.kind === 'bubble') && !exhibit.axisConfig?.xLabel) problems.push(`${id}: scatter X axis has no label.`);
    if (!String(exhibit.unit || '').trim() && !list.every((item) => String(item.unit || '').trim()) && !UNIT_REVIEW.has(String(exhibit.id))) problems.push(`${id}: no unit on the exhibit or its series.`);
    if ((exhibit.kind === 'pie' || exhibit.kind === 'donut') && /percent|%/i.test(exhibit.unit)) {
      const total = (list[0]?.values || []).reduce((sum, value) => sum + value, 0);
      if (total < 98 || total > 102) problems.push(`${id}: percentage composition totals ${total.toFixed(1)}%.`);
    }
    if (exhibit.kind === 'waterfall') {
      const values = list[0]?.values || [];
      const last = values.length - 1;
      const movements = values.slice(0, -1).reduce((sum, value) => sum + value, 0);
      if (WATERFALL_ENDING_LABEL.test(categories[last] || '') && Math.abs(values[last] - movements) > 0.11) problems.push(`${id}: closing bar ${values[last]} does not equal opening plus movements (${Number(movements.toFixed(4))}).`);
    }
  });

  // Two exhibits in one question must quote the same figure for the same series, category and unit.
  const byOwner = new Map<string, LibraryExhibit[]>();
  owned.forEach(({ owner, siblings }) => byOwner.set(owner, siblings));
  byOwner.forEach((siblings, owner) => {
    for (let a = 0; a < siblings.length; a += 1) {
      for (let b = a + 1; b < siblings.length; b += 1) {
        if (TABLE_KINDS.has(siblings[a].kind) || TABLE_KINDS.has(siblings[b].kind)) continue;
        const first = series(siblings[a]);
        const second = series(siblings[b]);
        first.series.forEach((s1) => second.series.forEach((s2) => {
          if (s1.name.toLowerCase().trim() !== s2.name.toLowerCase().trim()) return;
          if (String(s1.unit || siblings[a].unit || '').toLowerCase() !== String(s2.unit || siblings[b].unit || '').toLowerCase()) return;
          first.categories.forEach((category, i) => {
            const j = second.categories.findIndex((other) => other.toLowerCase().trim() === category.toLowerCase().trim());
            if (j >= 0 && Math.abs(s1.values[i] - s2.values[j]) > Math.max(Math.abs(s1.values[i]), Math.abs(s2.values[j])) * 0.005 + 1e-9) problems.push(`${owner}: "${s1.name}" for "${category}" is ${s1.values[i]} in one exhibit and ${s2.values[j]} in another.`);
          });
        }));
      }
    }
  });

  // Case Pool core exhibits (tables, charts, metric cards) and the case text around them.
  CASE_POOL_LIBRARY.forEach((item) => {
    (item.data_exhibits || []).forEach((exhibit, index) => {
      const id = `${item.id} / exhibit ${index + 1}`;
      if (exhibit.type === 'table') {
        exhibit.rows.forEach((row, rowIndex) => {
          if (row.length !== exhibit.columns.length) problems.push(`${id}: row ${rowIndex + 1} has ${row.length} cells for ${exhibit.columns.length} columns.`);
          row.forEach((cell) => { if (String(cell ?? '').trim() === '' || (typeof cell === 'number' && !Number.isFinite(cell))) problems.push(`${id}: row ${rowIndex + 1} has an empty cell.`); });
        });
      } else if (exhibit.type === 'chart_data') {
        if (exhibit.labels.length !== exhibit.values.length) problems.push(`${id}: ${exhibit.labels.length} labels for ${exhibit.values.length} values.`);
        if (exhibit.values.some((value) => !Number.isFinite(Number(value)))) problems.push(`${id}: non-numeric chart value.`);
        if (new Set(exhibit.labels.map((label) => label.toLowerCase().trim())).size !== exhibit.labels.length) problems.push(`${id}: two categories share a label.`);
      }
    });
    const strings = [item.situation, item.key_question, item.objective || '', item.model_answer.recommendation, ...(item.model_answer.key_findings || []), ...(item.model_answer.key_calculations || []), ...textOf(item.data_exhibits)];
    const comma = strings.find((part) => DECIMAL_COMMA.test(part) && !/\d{1,3}(?:,\d{3})+/.test(part));
    if (comma) problems.push(`${item.id}: decimal comma in "${comma.slice(0, 60)}" - case text must use the table number format.`);
  });

  fail(problems);
}

runExhibitReadabilityTests();
