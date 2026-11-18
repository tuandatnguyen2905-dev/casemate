/**
 * Unit wording shared by Case Drill and Case Pool.
 *
 * Learners always see a full scale word beside a number ("127.2 billion VND",
 * "46 thousand", "(thousand)"), never shorthand such as "bn", "mn", "k", "tr",
 * "VND m" or "000s". `clarifyUnitText` rewrites the unambiguous shorthand forms in
 * briefs, choices, unit fields, axis labels, tooltips and feedback. It only swaps
 * words: every digit, sign and separator stays where it was, so a value is never
 * rescaled. A bare "m" with no currency beside it (million, metres or months) is
 * left as written and reported by `findUnitShorthand` for a human content decision.
 *
 * The output is idempotent, and `sameUnitText` lets attempt history saved with the
 * old wording still match the current answer choices.
 */

type ScaleWord = 'billion' | 'million' | 'thousand';

const L = 'A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u024F\\u1E00-\\u1EFF';
const END = `(?![${L}0-9\\u00B2\\u00B3])`;
const START = `(^|[^${L}0-9.,])`;
const NUM = '(\\d[\\d,.]*\\d|\\d)';
const CUR = '(VNĐ|VND|USD|US\\$|\\$)';
const CUR_AFTER = '(VNĐ|VND|USD)';
const SCALE_CUR = '(bn|Bn|BN|b|mn|MN|mm|m|k|K)';
const SCALE_BARE = '(bn|Bn|BN|mn|MN)';

const VI_TEXT = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;
const VI_SCALE: Record<ScaleWord, string> = { billion: 'tỷ', million: 'triệu', thousand: 'nghìn' };

function scaleOf(token: string): ScaleWord {
  const lower = token.toLowerCase();
  if (lower === 'bn' || lower === 'b' || lower === 'ty' || lower === 'tỷ') return 'billion';
  if (lower === 'k') return 'thousand';
  return 'million';
}

function currencyOf(token: string): string {
  return /^(?:VNĐ|VND)$/.test(token) ? 'VND' : 'USD';
}

interface Rule {
  name: string;
  pattern: RegExp;
  replace: (vi: boolean, ...groups: string[]) => string;
}

const word = (vi: boolean, scale: ScaleWord) => (vi ? VI_SCALE[scale] : scale);

const RULES: Rule[] = [
  {
    name: 'currency-prefix amount',
    pattern: new RegExp(`(^|[^${L}0-9])${CUR}\\s?${NUM}\\s?${SCALE_CUR}${END}`, 'g'),
    replace: (vi, pre, cur, num, scale) => `${pre}${num} ${word(vi, scaleOf(scale))} ${currencyOf(cur)}`,
  },
  {
    name: 'amount with scale then currency',
    pattern: new RegExp(`${START}${NUM}\\s?${SCALE_CUR}\\s?${CUR_AFTER}(?![${L}])`, 'g'),
    replace: (vi, pre, num, scale, cur) => `${pre}${num} ${word(vi, scaleOf(scale))} ${currencyOf(cur)}`,
  },
  {
    name: 'amount with currency then scale',
    pattern: new RegExp(`${START}${NUM}\\s?${CUR_AFTER}\\s?${SCALE_CUR}${END}`, 'g'),
    replace: (vi, pre, num, cur, scale) => `${pre}${num} ${word(vi, scaleOf(scale))} ${currencyOf(cur)}`,
  },
  {
    name: 'currency unit with scale',
    pattern: new RegExp(`(^|[^${L}0-9])${CUR}\\s?${SCALE_CUR}${END}`, 'g'),
    replace: (vi, pre, cur, scale) => `${pre}${word(vi, scaleOf(scale))} ${currencyOf(cur)}`,
  },
  {
    name: 'scale unit with currency',
    pattern: new RegExp(`(^|[^${L}0-9])(bn|Bn|BN|mn|MN|mm|m|k|K)\\s?${CUR_AFTER}(?![${L}])`, 'g'),
    replace: (vi, pre, scale, cur) => `${pre}${word(vi, scaleOf(scale))} ${currencyOf(cur)}`,
  },
  {
    name: "thousands written as '000",
    pattern: new RegExp(`${CUR_AFTER}\\s?['’]000s?(?![0-9])|['’]000s?\\s?${CUR_AFTER}(?![${L}])`, 'g'),
    replace: (vi, before, after) => `${word(vi, 'thousand')} ${currencyOf(before || after)}`,
  },
  {
    name: 'thousands column marker',
    pattern: /\(\s*['’]?000s?(\s+[^)]*)?\)/g,
    replace: (vi, rest) => `(${word(vi, 'thousand')}${rest || ''})`,
  },
  {
    name: 'in thousands',
    pattern: /\b([Ii]n)\s+['’]?000s\b/g,
    replace: (vi, inWord) => `${inWord} ${vi ? 'nghìn' : 'thousands'}`,
  },
  {
    name: 'amount with bn or mn',
    pattern: new RegExp(`${START}${NUM}\\s?${SCALE_BARE}${END}`, 'g'),
    replace: (vi, pre, num, scale) => `${pre}${num} ${word(vi, scaleOf(scale))}`,
  },
  {
    name: 'amount with k',
    pattern: new RegExp(`${START}${NUM}(k|K)${END}`, 'g'),
    replace: (vi, pre, num) => `${pre}${num} ${word(vi, 'thousand')}`,
  },
  {
    name: 'bracketed scale',
    pattern: /\((bn|mn|k)\)/g,
    replace: (vi, scale) => `(${word(vi, scaleOf(scale))})`,
  },
];

const VI_RULES: Rule[] = [
  {
    name: 'Vietnamese tr',
    pattern: new RegExp(`${START}${NUM}\\s?tr(?:\\.|${END})`, 'g'),
    replace: (_vi, pre, num) => `${pre}${num} triệu`,
  },
  {
    name: 'Vietnamese ty',
    pattern: new RegExp(`${START}${NUM}\\s?ty${END}`, 'g'),
    replace: (_vi, pre, num) => `${pre}${num} tỷ`,
  },
];

function applyRules(text: string, rules: Rule[], vi: boolean): string {
  return rules.reduce((current, rule) => {
    rule.pattern.lastIndex = 0;
    return current.replace(rule.pattern, (_match: string, ...args: unknown[]) => {
      const groups = args.slice(0, -2).map((group) => (typeof group === 'string' ? group : ''));
      return rule.replace(vi, ...groups);
    });
  }, text);
}

/** Rewrites unambiguous unit shorthand into full words; digits are never changed. */
export function clarifyUnitText<T>(value: T): T {
  if (typeof value !== 'string' || !value || !/[A-Za-z$'’]/.test(value)) return value;
  const vi = VI_TEXT.test(value);
  const rules = vi ? [...RULES, ...VI_RULES] : RULES;
  let text = value as string;
  for (let pass = 0; pass < 2; pass += 1) {
    const next = applyRules(text, rules, vi);
    if (next === text) break;
    text = next;
  }
  return text as unknown as T;
}

const BARE_UNIT_LABELS: Array<[RegExp, ScaleWord]> = [
  [/^\(?\s*(?:bn|b)\s*\)?$/i, 'billion'],
  [/^\(?\s*(?:mn|mm)\s*\)?$/i, 'million'],
  [/^\(?\s*(?:k|['’]?000s?|['’]000)\s*\)?$/i, 'thousand'],
];

/**
 * Unit field of a chart, column or answer box. Besides `clarifyUnitText`, a label
 * that is nothing but a scale ("bn", "k", "000s") becomes the word. A lone "m"
 * stays as written because it may mean metres or months.
 */
export function clarifyUnitLabel(unit: string | undefined | null): string {
  const raw = String(unit ?? '').trim();
  if (!raw) return '';
  const vi = VI_TEXT.test(raw);
  for (const [pattern, scale] of BARE_UNIT_LABELS) if (pattern.test(raw)) return word(vi, scale);
  return clarifyUnitText(raw);
}

const SKIP_KEYS = new Set([
  'id', 'code', 'key_id', 'question_id', 'journey_id', 'case_id', 'related_drill_ids', 'href', 'url', 'link',
  'color', 'colors', 'kind', 'type', 'chartType', 'answerMode', 'skill', 'difficulty', 'rubricId', 'schemaVersion',
]);

/** Applies `clarifyUnitText` to every string inside a record, leaving ids, links and enum fields untouched. */
export function clarifyUnitsDeep<T>(value: T, key = ''): T {
  if (SKIP_KEYS.has(key)) return value;
  if (typeof value === 'string') return clarifyUnitText(value);
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((entry) => {
      const mapped = clarifyUnitsDeep(entry, key);
      if (mapped !== entry) changed = true;
      return mapped;
    });
    return (changed ? next : value) as unknown as T;
  }
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    let changed = false;
    const record = value as Record<string, unknown>;
    const next: Record<string, unknown> = {};
    Object.keys(record).forEach((field) => {
      const mapped = field === 'unit' || field === 'answerUnit' || field === 'yUnit' || field === 'xUnit'
        ? (typeof record[field] === 'string' ? clarifyUnitLabel(record[field] as string) : record[field])
        : clarifyUnitsDeep(record[field], field);
      if (mapped !== record[field]) changed = true;
      next[field] = mapped;
    });
    return (changed ? next : value) as T;
  }
  return value;
}

/** True when two learner-facing strings differ only in unit wording (old vs clarified choice text). */
export function sameUnitText(a: string | null | undefined, b: string | null | undefined): boolean {
  if (a == null || b == null) return a === b;
  if (a === b) return true;
  return clarifyUnitText(String(a)).trim() === clarifyUnitText(String(b)).trim();
}

/* ------------------------------------------------------------------ lint */

export interface UnitShorthandFinding {
  text: string;
  index: number;
  kind: 'shorthand' | 'ambiguous';
  suggestion?: string;
  reason: string;
}

const AMBIGUOUS_M = new RegExp(`${START}${NUM}\\s?m${END}`, 'g');
const AMBIGUOUS_BRACKET_M = /\((?:m|M)\)/g;
const LOOSE_SHORTHAND = new RegExp(`(^|[^${L}0-9])(bn|mn|tr|ty)${END}`, 'g');

/**
 * Lists unit shorthand a learner could misread. `shorthand` findings are fixed by
 * `clarifyUnitText` (the suggestion shows how); `ambiguous` findings need a human
 * to say what the abbreviation means.
 */
export function findUnitShorthand(text: string): UnitShorthandFinding[] {
  const source = String(text ?? '');
  if (!source || !/[A-Za-z$'’]/.test(source)) return [];
  const findings: UnitShorthandFinding[] = [];
  const vi = VI_TEXT.test(source);
  const rules = vi ? [...RULES, ...VI_RULES] : RULES;
  rules.forEach((rule) => {
    const pattern = new RegExp(rule.pattern.source, 'g');
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(source)) !== null) {
      const groups = match.slice(1).map((group) => group || '');
      const lead = groups[0] && /^[^0-9A-Za-z]?$/.test(groups[0]) && match[0].startsWith(groups[0]) ? groups[0].length : 0;
      const raw = match[0].slice(lead);
      findings.push({ text: raw, index: match.index + lead, kind: 'shorthand', suggestion: clarifyUnitText(raw), reason: rule.name });
      if (match[0].length === 0) pattern.lastIndex += 1;
    }
  });
  const clarified = clarifyUnitText(source);
  AMBIGUOUS_M.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = AMBIGUOUS_M.exec(clarified)) !== null) {
    const raw = match[0].slice(match[1].length);
    findings.push({ text: raw, index: match.index + match[1].length, kind: 'ambiguous', reason: '"m" after a number may mean million, metres or months' });
  }
  AMBIGUOUS_BRACKET_M.lastIndex = 0;
  while ((match = AMBIGUOUS_BRACKET_M.exec(clarified)) !== null) {
    findings.push({ text: match[0], index: match.index, kind: 'ambiguous', reason: '"(m)" may mean million, metres or months' });
  }
  LOOSE_SHORTHAND.lastIndex = 0;
  while ((match = LOOSE_SHORTHAND.exec(clarified)) !== null) {
    const raw = match[2];
    if (raw === 'ty' || raw === 'tr') {
      if (!vi) continue;
    }
    findings.push({ text: raw, index: match.index + match[1].length, kind: 'ambiguous', reason: `"${raw}" is shorthand with no number or currency beside it` });
  }
  return findings.sort((a, b) => a.index - b.index);
}

export interface UnitAuditItem {
  id: string;
  record: unknown;
}

function walkStrings(value: unknown, path: string, visit: (text: string, path: string) => void, key = ''): void {
  if (SKIP_KEYS.has(key)) return;
  if (typeof value === 'string') {
    visit(value, path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkStrings(entry, `${path}[${index}]`, visit, key));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([field, entry]) => walkStrings(entry, path ? `${path}.${field}` : field, visit, field));
  }
}

/**
 * Authoring / import lint: one line per bare shorthand unit in any learner-visible
 * string of each record, e.g. `E-CH-002 exhibits[0].unit: "VND bn" -> "billion VND"`.
 * Ambiguous findings are prefixed `NEEDS DECISION`.
 */
export function auditUnitShorthand(items: UnitAuditItem[]): string[] {
  const problems: string[] = [];
  items.forEach((item) => {
    walkStrings(item.record, '', (text, path) => {
      const isUnitField = /(?:^|\.)(?:unit|answerUnit|xUnit|yUnit)$/.test(path);
      if (isUnitField) {
        const fixed = clarifyUnitLabel(text);
        if (fixed !== text.trim()) problems.push(`${item.id} ${path}: "${text}" -> "${fixed}"`);
        else if (/^\(?\s*m\s*\)?$/i.test(text.trim())) problems.push(`NEEDS DECISION ${item.id} ${path}: "${text}" may mean million, metres or months`);
        return;
      }
      findUnitShorthand(text).forEach((finding) => {
        problems.push(finding.kind === 'ambiguous'
          ? `NEEDS DECISION ${item.id} ${path}: "${finding.text}" - ${finding.reason}`
          : `${item.id} ${path}: "${finding.text}" -> "${finding.suggestion}"`);
      });
    });
  });
  return problems;
}

/** Problems that block an import or authoring save: everything except items listed for a human decision. */
export function blockingUnitShorthand(items: UnitAuditItem[]): string[] {
  return auditUnitShorthand(items).filter((line) => !line.startsWith('NEEDS DECISION'));
}
