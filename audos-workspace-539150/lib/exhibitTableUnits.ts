/**
 * Table unit de-duplication shared by every exhibit table in Case Drill and
 * Case Pool.
 *
 * Rule: a unit or qualifier that every value in a column repeats ("18%",
 * "130 VND bn", "12 per 100 buyers per week") is stated once in the column
 * header and the rows keep only the number. Columns that mix units, hold text,
 * or combine a prefix and a suffix ("VND 0.82m") are never touched, so the
 * meaning of the data cannot change. Headers and moved units use full scale
 * words ("Revenue (billion VND)"), never shorthand such as "VND bn".
 */

import { clarifyUnitLabel, clarifyUnitText } from './unitLabels';

export type ExhibitTableCell = string | number;

const EMPTY_CELLS = new Set(['', '-', '\u2013', '\u2014', 'n/a', 'na']);
const CELL_PATTERN = /^([^\d()+\-\u2212]*?)\s*([(+\-\u2212]?\d[\d.,]*\)?)(.*)$/;
const CURRENCY_PREFIX = /^(?:VND|USD|EUR|GBP|JPY|CNY|SGD|THB|US\$|[$\u20AB\u20AC\u00A3\u00A5])$/;

interface CellParts {
  prefix: string;
  num: string;
  suffix: string;
}

function splitCell(cell: ExhibitTableCell | undefined): CellParts | null {
  const text = String(cell ?? '').trim();
  const match = text.match(CELL_PATTERN);
  if (!match) return null;
  const num = match[2];
  const suffix = match[3].trim();
  if (num.startsWith('(') !== num.endsWith(')')) return null;
  if (suffix && !/^[A-Za-z%$\u20AB\u20AC\u00A3]/.test(suffix)) return null;
  return { prefix: match[1].trim(), num, suffix };
}

function isEmptyCell(cell: ExhibitTableCell | undefined): boolean {
  return EMPTY_CELLS.has(String(cell ?? '').trim().toLowerCase());
}

/** Appends a unit to a header unless the header already states it. */
export function headerWithUnit(header: string, unit?: string): string {
  const title = clarifyUnitText(String(header ?? ''));
  const cleaned = clarifyUnitLabel(String(unit ?? '').trim().replace(/^percent\b/i, '%'));
  if (!cleaned) return title;
  const lowerHeader = title.toLowerCase();
  const lowerUnit = cleaned.toLowerCase();
  if (cleaned.length > 2 ? lowerHeader.includes(lowerUnit) : lowerHeader.includes(`(${lowerUnit})`)) return title;
  return `${title} (${cleaned})`;
}

export function dedupeColumnUnits(
  columns: string[],
  rows: ExhibitTableCell[][],
): { columns: string[]; rows: ExhibitTableCell[][] } {
  const nextColumns = columns.map((column) => clarifyUnitText(column));
  const nextRows = rows.map((row) => [...row]);

  for (let columnIndex = 1; columnIndex < columns.length; columnIndex += 1) {
    const filled = nextRows.filter((row) => !isEmptyCell(row[columnIndex]));
    if (filled.length === 0) continue;
    const parts = filled.map((row) => splitCell(row[columnIndex]));
    if (parts.some((part) => part === null)) continue;
    const resolved = parts as CellParts[];
    const first = resolved[0];
    if (Boolean(first.prefix) === Boolean(first.suffix)) continue;
    const unit = first.prefix || first.suffix;
    if (first.prefix && !CURRENCY_PREFIX.test(first.prefix)) continue;
    if (unit.length > 40 || !/[A-Za-z%$\u20AB\u20AC\u00A3]/.test(unit)) continue;
    const sameUnit = resolved.every(
      (part) => part.prefix.toLowerCase() === first.prefix.toLowerCase() && part.suffix.toLowerCase() === first.suffix.toLowerCase(),
    );
    if (!sameUnit) continue;

    nextRows.forEach((row) => {
      if (isEmptyCell(row[columnIndex])) return;
      const part = splitCell(row[columnIndex]);
      if (part) row[columnIndex] = part.num;
    });
    nextColumns[columnIndex] = headerWithUnit(nextColumns[columnIndex], unit);
  }

  return { columns: nextColumns, rows: nextRows };
}
