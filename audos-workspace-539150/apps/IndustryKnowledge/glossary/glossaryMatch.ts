// Safe inline term recognition over plain strings only. It never touches markup: callers pass the
// text of one paragraph and receive ordered segments to render as React nodes. Matches are whole
// words (no partial-word hits), acronyms are case-sensitive, the longest form wins and a term is
// annotated at most once per block.

export interface MatchableTerm {
  id: string;
  term: string;
  acronym?: string;
  aliases?: string[];
  annotate?: boolean;
}

export interface TermMatcher {
  termId: string;
  form: string;
  caseSensitive: boolean;
}

export interface TextSegment {
  text: string;
  termId?: string;
}

const WORD_CHAR = /[\p{L}\p{N}]/u;
const isWordChar = (char: string | undefined) => Boolean(char) && WORD_CHAR.test(char as string);
const looksLikeAcronym = (form: string) => /[A-Z]/.test(form) && form === form.toUpperCase();

export function buildMatchers(terms: MatchableTerm[]): TermMatcher[] {
  const matchers: TermMatcher[] = [];
  const seen = new Set<string>();
  terms.forEach((term) => {
    if (term.annotate === false) return;
    [term.acronym, term.term, ...(term.aliases ?? [])].forEach((raw) => {
      const form = String(raw ?? '').trim();
      if (form.length < 2) return;
      const caseSensitive = looksLikeAcronym(form);
      const key = `${caseSensitive ? form : form.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);
      matchers.push({ termId: term.id, form: caseSensitive ? form : form.toLowerCase(), caseSensitive });
    });
  });
  return matchers.sort((left, right) => right.form.length - left.form.length);
}

/**
 * Splits `text` into plain and term segments. `claim(termId)` is asked once per term the first
 * time it is found in this block; returning false leaves that occurrence (and later ones) plain.
 */
export function segmentText(text: string, matchers: TermMatcher[], claim: (termId: string) => boolean = () => true): TextSegment[] {
  if (!text || !matchers.length) return [{ text }];
  const lower = text.toLowerCase();
  const done = new Set<string>();
  const segments: TextSegment[] = [];
  let plainStart = 0;
  let index = 0;
  while (index < text.length) {
    if (isWordChar(text[index - 1])) { index += 1; continue; }
    let matched: TermMatcher | null = null;
    for (const matcher of matchers) {
      if (done.has(matcher.termId)) continue;
      const source = matcher.caseSensitive ? text : lower;
      if (!source.startsWith(matcher.form, index)) continue;
      if (isWordChar(text[index + matcher.form.length])) continue;
      done.add(matcher.termId);
      if (!claim(matcher.termId)) continue;
      matched = matcher;
      break;
    }
    if (!matched) { index += 1; continue; }
    if (index > plainStart) segments.push({ text: text.slice(plainStart, index) });
    segments.push({ text: text.slice(index, index + matched.form.length), termId: matched.termId });
    index += matched.form.length;
    plainStart = index;
  }
  if (plainStart < text.length) segments.push({ text: text.slice(plainStart) });
  return segments;
}

/** Accent and case-insensitive search key, so "lai thuan" finds "lãi thuần". */
export function searchKey(value: string): string {
  return String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, ' ').trim();
}
