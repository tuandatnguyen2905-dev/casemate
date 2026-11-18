import { formatCanonicalNumber } from './numericUnits';

/**
 * Display-only number formatting for Market Sizing (Case Drill + Case Pool).
 *
 * Nothing here changes a stored or calculated value: callers keep plain numeric
 * strings / numbers in state and storage, and use these helpers purely to decide
 * what the learner sees. Commas are always stripped again before parsing.
 */

const GROUP_RE = /\B(?=(\d{3})+(?!\d))/g;

// Units / currency suffixes that may touch a number ("250000VND", "1500k") and still be formatted.
const ATTACHED_UNIT_RE = /^(?:k|m|mn|bn|b|tr|x|đ|vnd|usd|eur|kg|km|m2|m²|sqm|ha|kwh|mwh|gwh|tb|gb|mb)(?![A-Za-zÀ-ỹ0-9])/i;

// Nouns that make a 19xx/20xx figure a quantity rather than a year ("2000 households").
const QUANTITY_NOUN_RE = /^\s+(?:people|persons?|households?|users?|customers?|consumers?|units?|stores?|outlets?|shops?|employees?|workers?|students?|visitors?|vehicles?|cars?|motorbikes?|bikes?|orders?|subscribers?|passengers?|patients?|clients?|riders?|drivers?|schools?|buses|trips?|transactions?|items?|tonnes?|tons?|liters?|litres?|hectares?|sq\b|vnd\b|usd\b|dong\b|đồng|đ\b)/i;

const CURRENCY_BEFORE_RE = /(?:[$€£₫¥]|\b(?:vnd|usd|eur|rm|idr|thb)\s*)$/i;
const PHONE_CONTEXT_RE = /(?:phone|tel\b|mobile|hotline|zalo|sđt|sdt|fax)\s*[:#]?\s*$/i;

function groupInteger(digits: string): string {
  return digits.replace(GROUP_RE, ',');
}

function isLetterLike(ch: string): boolean {
  if (ch === '\u00d7' || ch === '\u00f7') return false;
  return /[A-Za-zÀ-ỹ_]/.test(ch);
}

function hasQuantityEvidence(text: string, start: number, end: number): boolean {
  const before = text.slice(Math.max(0, start - 12), start);
  const after = text.slice(end, end + 24);
  if (CURRENCY_BEFORE_RE.test(before)) return true;
  if (/(?:^|\s)[x×*÷+=]\s*$/.test(before) || /^\s*[x×*÷+=](?:\s|$)/.test(after)) return true;
  if (QUANTITY_NOUN_RE.test(after)) return true;
  return false;
}

/**
 * Group thousands inside free text, conservatively. Leaves untouched: decimals'
 * fractional digits, percentages, already-grouped numbers, years (19xx/20xx unless
 * there is quantity evidence), IDs (C01, D07-1, #12345), phone-like codes, dotted
 * versions/dates and Vietnamese-style 1.000.000 groupings.
 */
export function formatNumbersInText(value: unknown): string {
  const text = String(value ?? '');
  if (!/\d{4}/.test(text)) return text;
  return text.replace(/\d+(?:,\d+)*(?:\.\d+)?/g, (token: string, offset: number) => {
    if (token.includes(',')) return token;
    const dot = token.indexOf('.');
    const intPart = dot === -1 ? token : token.slice(0, dot);
    const fraction = dot === -1 ? '' : token.slice(dot);
    if (intPart.length < 4 || intPart.startsWith('0')) return token;

    const prev = offset > 0 ? text[offset - 1] : '';
    const end = offset + token.length;
    const next = end < text.length ? text[end] : '';
    const afterNext = end + 1 < text.length ? text[end + 1] : '';

    if (prev && (isLetterLike(prev) || /[#@/:+.=&?%]/.test(prev))) return token;
    if ((prev === '-' || prev === '\u2212') && /[A-Za-z]/.test((/[A-Za-z0-9_]+$/.exec(text.slice(0, offset - 1)) || [''])[0])) return token;
    if (PHONE_CONTEXT_RE.test(text.slice(Math.max(0, offset - 16), offset)) && intPart.length >= 8) return token;

    if (next === '%') return token;
    if (next === ':' || (next === '/' && /\d/.test(afterNext))) return token;
    if (next === '.' && /\d/.test(afterNext)) return token;
    if (next && isLetterLike(next) && !ATTACHED_UNIT_RE.test(text.slice(end, end + 8))) return token;

    if (!fraction && intPart.length === 4 && /^(?:19|20)\d\d$/.test(intPart) && !hasQuantityEvidence(text, offset, end)) {
      const attached = next && isLetterLike(next) && ATTACHED_UNIT_RE.test(text.slice(end, end + 8));
      if (!attached) return token;
    }
    return `${groupInteger(intPart)}${fraction}`;
  });
}

const NUMERIC_ENTRY_RE = /^([+-]?)(\d*)(\.\d*)?(%?)$/;

/**
 * Remove thousands commas from a value the learner typed or pasted, but only when
 * what remains is a plain number ("1,000,000" -> "1000000"). Anything else is
 * returned untouched so existing validation messages still apply.
 */
export function normalizeNumericEntry(raw: string): string {
  const text = String(raw ?? '');
  const stripped = text.replace(/[\s,]/g, '');
  return NUMERIC_ENTRY_RE.test(stripped) ? stripped : text;
}

/** Plain stored string -> what an input should show ("1000000" -> "1,000,000"). */
export function formatNumericEntry(raw: unknown, options: { group?: boolean } = {}): string {
  const text = String(raw ?? '');
  if (options.group === false || !text) return text;
  const stripped = text.replace(/[\s,]/g, '');
  const match = NUMERIC_ENTRY_RE.exec(stripped);
  if (!match || match[4]) return text;
  const [, sign, integer, fraction = ''] = match;
  return `${sign}${groupInteger(integer)}${fraction}`;
}

/** A computed number for display, always comma-grouped regardless of browser locale. */
export function formatNumberDisplay(value: number, maximumFractionDigits = 6): string {
  return formatCanonicalNumber(value, maximumFractionDigits);
}

/** Position in `formatted` after `significantBefore` non-comma characters. */
export function caretIndexAfterSignificant(formatted: string, significantBefore: number): number {
  if (significantBefore <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    if (formatted[index] !== ',') seen += 1;
    if (seen === significantBefore) return index + 1;
  }
  return formatted.length;
}

export function countSignificantChars(value: string): number {
  return value.replace(/,/g, '').length;
}
