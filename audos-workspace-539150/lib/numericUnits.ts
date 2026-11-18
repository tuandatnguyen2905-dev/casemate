/**
 * One numeric-unit contract for Case Drill and Case Pool.
 *
 * Stored answers and expected values stay unrounded. A question's tolerance is an
 * ABSOLUTE amount in its displayed canonical unit (for example 0.05 percent or
 * 0.1 VND million); callers must not add an implicit relative tolerance.
 *
 * Locale rule: `1,000,000` and repeated Vietnamese grouping `1.000.000` are
 * accepted. A single dot is the decimal separator (`1.234` means 1.234), while
 * comma decimals and mixed non-English separators are rejected as ambiguous.
 */

export type NumericQuantityKind = 'number' | 'currency' | 'percent' | 'percentage-point' | 'count' | 'duration';
export type NumericParseError = 'empty' | 'invalid-number' | 'ambiguous-separators' | 'invalid-unit' | 'unit-mismatch' | 'multiple-values';

export interface NumericUnitSpec {
  label: string;
  kind: NumericQuantityKind;
  currency?: 'VND' | 'USD';
  scale: number;
  baseUnit: string;
  period?: string;
}

export interface ParsedNumericQuantity {
  ok: boolean;
  value: number | null;
  canonicalUnit: string;
  explicitUnit: boolean;
  explicitScale: boolean;
  error?: NumericParseError;
  message?: string;
}

export interface NumericGradeResult extends ParsedNumericQuantity {
  correct: boolean;
  expected: number;
  tolerance: number;
  difference: number | null;
}

const SCALE_ALIASES: Array<{ pattern: RegExp; scale: number }> = [
  { pattern: /(?:trillion|tn|nghìn\s*tỷ|ngàn\s*tỷ)(?![A-Za-zÀ-ỹ])/iu, scale: 1e12 },
  { pattern: /(?:billion|bn|tỷ|ty)(?![A-Za-zÀ-ỹ])/iu, scale: 1e9 },
  { pattern: /(?:million|mn|triệu)(?![A-Za-zÀ-ỹ])/iu, scale: 1e6 },
  { pattern: /(?:thousand|nghìn|ngàn)(?![A-Za-zÀ-ỹ])/iu, scale: 1e3 },
];

const COUNT_WORDS = /\b(?:units?|items?|packs?|bottles?|orders?|buyers?|customers?|people|persons?|users?|subscriber-months?|subscribers?|sales|parcels?|deliveries|visits?|vehicles?|stores?|outlets?|transactions?|tonnes?|tons?|kg|kilograms?|litres?|liters?)\b/iu;
const DURATION_WORDS = /\b(?:years?|months?|days?|hours?|minutes?)\b/iu;
const PERCENT_WORDS = /%|\bpercent(?:age)?\b|\bphần\s*trăm\b/iu;
const PP_WORDS = /\bpercentage[ -]?points?\b|\bp\.?p\.?\b|\bđiểm\s*phần\s*trăm\b/iu;
const FRACTION_WORDS = /\b(?:decimal\s+fraction|fraction)\b|\b(?:dạng\s*thập\s*phân|tỷ\s*lệ\s*thập\s*phân)\b/iu;

function fold(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function unitFamily(value: string): string {
  const singular = fold(value).replace(/s$/, '');
  if (singular === 'people' || singular === 'person') return 'person';
  if (singular === 'unit' || singular === 'item') return 'generic-count';
  return singular;
}

function currencyIn(value: string): 'VND' | 'USD' | undefined {
  if (/(?:vnd|vnđ|đồng|dong)(?![A-Za-zÀ-ỹ])|₫/iu.test(value)) return 'VND';
  if (/(?:usd|us\s*dollars?|dollars?)(?![A-Za-zÀ-ỹ])|\$/iu.test(value)) return 'USD';
  return undefined;
}

function scaleIn(value: string, currencyContext: boolean): { scale: number; explicit: boolean } {
  for (const alias of SCALE_ALIASES) if (alias.pattern.test(value)) return { scale: alias.scale, explicit: true };
  if (/k(?![A-Za-zÀ-ỹ])/iu.test(value)) return { scale: 1e3, explicit: true };
  if (currencyContext && /m(?![A-Za-zÀ-ỹ])/iu.test(value)) return { scale: 1e6, explicit: true };
  if (currencyContext && /b(?![A-Za-zÀ-ỹ])/iu.test(value)) return { scale: 1e9, explicit: true };
  return { scale: 1, explicit: false };
}

export function numericUnitSpec(label: string | undefined): NumericUnitSpec {
  const raw = String(label || 'number').trim();
  const currency = currencyIn(raw);
  const scale = scaleIn(raw, Boolean(currency)).scale;
  const periodMatch = raw.match(DURATION_WORDS);
  const period = periodMatch ? unitFamily(periodMatch[0]) : undefined;
  if (PP_WORDS.test(raw)) return { label: raw, kind: 'percentage-point', scale: 1, baseUnit: 'percentage points', period };
  if (PERCENT_WORDS.test(raw)) return { label: raw, kind: 'percent', scale: 1, baseUnit: '%', period };
  if (currency) return { label: raw, kind: 'currency', currency, scale, baseUnit: currency, period };
  if (periodMatch) return { label: raw, kind: 'duration', scale, baseUnit: period || 'year', period };
  if (COUNT_WORDS.test(raw)) return { label: raw, kind: 'count', scale, baseUnit: fold((raw.match(COUNT_WORDS) || ['units'])[0]).replace(/s$/, ''), period };
  return { label: raw, kind: 'number', scale, baseUnit: 'number', period };
}

function parseNumberToken(token: string): { value: number | null; error?: NumericParseError } {
  let text = token.replace(/[−–—]/g, '-').replace(/[\u00a0\u202f_'’\s]/g, '');
  const sign = text.startsWith('-') || text.startsWith('+') ? text[0] : '';
  if (sign) text = text.slice(1);
  if (!text || !/^[\d.,]+$/.test(text)) return { value: null, error: 'invalid-number' };
  const commaCount = (text.match(/,/g) || []).length;
  const dotCount = (text.match(/\./g) || []).length;
  if (commaCount && dotCount) {
    if (!/^\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(text)) return { value: null, error: 'ambiguous-separators' };
    text = text.replace(/,/g, '');
  } else if (commaCount) {
    if (!/^\d{1,3}(?:,\d{3})+$/.test(text)) return { value: null, error: 'ambiguous-separators' };
    text = text.replace(/,/g, '');
  } else if (dotCount > 1) {
    if (!/^\d{1,3}(?:\.\d{3})+$/.test(text)) return { value: null, error: 'ambiguous-separators' };
    text = text.replace(/\./g, '');
  } else if (!/^\d+(?:\.\d*)?$|^\.\d+$/.test(text)) {
    return { value: null, error: 'invalid-number' };
  }
  const value = Number(`${sign}${text}`);
  return Number.isFinite(value) ? { value } : { value: null, error: 'invalid-number' };
}

function errorResult(spec: NumericUnitSpec, error: NumericParseError, message: string): ParsedNumericQuantity {
  return { ok: false, value: null, canonicalUnit: spec.label, explicitUnit: false, explicitScale: false, error, message };
}

export function parseNumericQuantity(raw: string, expectedUnit?: string): ParsedNumericQuantity {
  const spec = numericUnitSpec(expectedUnit);
  const source = String(raw ?? '').trim();
  if (!source) return errorResult(spec, 'empty', 'Enter a number.');
  const numberMatches = source.match(/[+−–—-]?(?:\d[\d\s\u00a0\u202f_'’.,]*|[.,]\d+)/g) || [];
  const meaningful = numberMatches.filter((match) => /\d/.test(match));
  if (meaningful.length !== 1) {
    return errorResult(spec, meaningful.length ? 'multiple-values' : 'invalid-number', meaningful.length ? 'Enter one numerical value in this field.' : 'Enter a valid number.');
  }
  const parsed = parseNumberToken(meaningful[0]);
  if (parsed.value === null) {
    return errorResult(spec, parsed.error || 'invalid-number', parsed.error === 'ambiguous-separators'
      ? 'Use comma thousands (1,000,000), repeated Vietnamese dot grouping (1.000.000), or a dot decimal (1.5).'
      : 'Enter a valid finite number.');
  }

  const remainder = source.replace(meaningful[0], ' ').replace(/[()[\],:;]/g, ' ').replace(/\s+/g, ' ').trim();
  const enteredCurrency = currencyIn(remainder);
  const enteredPp = PP_WORDS.test(remainder);
  const enteredPercent = !enteredPp && PERCENT_WORDS.test(remainder);
  const fraction = FRACTION_WORDS.test(remainder);
  const enteredScale = scaleIn(remainder, Boolean(enteredCurrency || spec.currency));
  const explicitUnit = Boolean(enteredCurrency || enteredPp || enteredPercent || COUNT_WORDS.test(remainder) || DURATION_WORDS.test(remainder));
  // Legacy serialization always appended the field suffix, even when the learner
  // had typed a base-currency unit. `400,000,000 VND million` (or `... million VND`)
  // therefore means VND 400,000,000 entered into a VND-million field, not 400 quadrillion.
  const scaleWords = 'trillion|tn|billion|bn|tỷ|ty|million|mn|triệu|thousand|nghìn|ngàn';
  const currencyWords = `${enteredCurrency}|vnđ|đồng|dong`;
  const legacyAppendedScale = Boolean(spec.currency && spec.scale > 1 && enteredCurrency
    && new RegExp(`(?:${currencyWords})\\s+(?:${scaleWords})|(?:${scaleWords})\\s+(?:${currencyWords})`, 'iu').test(remainder)
    && Math.abs(parsed.value) >= spec.scale);

  if (enteredCurrency && (!spec.currency || enteredCurrency !== spec.currency)) {
    return { ...errorResult(spec, 'unit-mismatch', `This field expects ${spec.label}, not ${enteredCurrency}.`), explicitUnit: true, explicitScale: enteredScale.explicit };
  }
  if ((enteredPp && spec.kind !== 'percentage-point') || (enteredPercent && spec.kind === 'percentage-point')) {
    return { ...errorResult(spec, 'unit-mismatch', `Percentage change and percentage-point change are different; this field expects ${spec.label}.`), explicitUnit: true, explicitScale: enteredScale.explicit };
  }
  if (spec.kind === 'percent' && enteredPp) {
    return { ...errorResult(spec, 'unit-mismatch', 'This field expects percent, not percentage points.'), explicitUnit: true, explicitScale: enteredScale.explicit };
  }
  if (fraction && spec.kind !== 'percent') {
    return { ...errorResult(spec, 'unit-mismatch', `A decimal fraction is not valid for ${spec.label}.`), explicitUnit, explicitScale: enteredScale.explicit };
  }
  if (spec.kind === 'count') {
    const expectedFamily = unitFamily(spec.baseUnit);
    const enteredFamilies = (remainder.match(new RegExp(COUNT_WORDS.source, 'giu')) || []).map(unitFamily).filter((family) => family !== 'generic-count');
    if (enteredFamilies.length && expectedFamily !== 'generic-count' && enteredFamilies.some((family) => family !== expectedFamily)) {
      return { ...errorResult(spec, 'unit-mismatch', `This field expects ${spec.label}, not ${enteredFamilies.join(' / ')}.`), explicitUnit, explicitScale: enteredScale.explicit };
    }
  }
  const enteredPeriods = (remainder.match(new RegExp(DURATION_WORDS.source, 'giu')) || []).map(unitFamily);
  if (spec.period && enteredPeriods.some((period) => period !== spec.period)) {
    return { ...errorResult(spec, 'unit-mismatch', `This field expects ${spec.label}, not per ${enteredPeriods.join(' / ')}.`), explicitUnit, explicitScale: enteredScale.explicit };
  }
  if (spec.kind === 'duration') {
    const expectedFamily = unitFamily(spec.baseUnit);
    if (enteredPeriods.some((family) => family !== expectedFamily)) {
      return { ...errorResult(spec, 'unit-mismatch', `This field expects ${spec.label}, not ${enteredPeriods.join(' / ')}.`), explicitUnit, explicitScale: enteredScale.explicit };
    }
  }

  let cleaned = remainder
    .replace(PP_WORDS, ' ').replace(PERCENT_WORDS, ' ').replace(FRACTION_WORDS, ' ')
    .replace(/(^|[^A-Za-zÀ-ỹ])(?:vnd|vnđ|usd|us\s*dollars?|dollars?|đồng|dong)(?![A-Za-zÀ-ỹ])|[$₫]/giu, '$1 ');
  SCALE_ALIASES.forEach((alias) => { cleaned = cleaned.replace(alias.pattern, ' '); });
  cleaned = cleaned
    .replace(/(?:^|\s)[kmb](?=\s|$)/giu, ' ')
    .replace(new RegExp(COUNT_WORDS.source, 'giu'), ' ')
    .replace(new RegExp(DURATION_WORDS.source, 'giu'), ' ')
    .trim();
  if (cleaned && !/^(?:per|a|an|the|each|of|\/|year|month|day|unit|person|buyer|sale|order|pack|bottle|subscriber|visit|delivery|parcel|km|kg|m2|m²|sqm|ha)(?:\s+(?:per|a|an|the|each|of|year|month|day|unit|person|buyer|sale|order|pack|bottle|subscriber|visit|delivery|parcel|km|kg|m2|m²|sqm|ha))*$/iu.test(cleaned)) {
    return { ...errorResult(spec, 'invalid-unit', `“${cleaned}” is not a recognised unit.`), explicitUnit, explicitScale: enteredScale.explicit };
  }

  let value = parsed.value;
  if (spec.kind === 'percent') {
    if (fraction) value *= 100;
  } else if (spec.kind === 'percentage-point') {
    // A bare value or explicit pp marker is already in percentage points.
  } else if (enteredScale.explicit || enteredCurrency) {
    value = legacyAppendedScale ? value / spec.scale : value * enteredScale.scale / spec.scale;
  }
  return { ok: true, value, canonicalUnit: spec.label, explicitUnit, explicitScale: enteredScale.explicit };
}

export function gradeNumericQuantity(raw: string, expected: number, expectedUnit: string | undefined, tolerance: number): NumericGradeResult {
  let parsed = parseNumericQuantity(raw, expectedUnit);
  const safeTolerance = Number.isFinite(tolerance) && tolerance >= 0 ? tolerance : 0;
  const within = (value: number) => Math.abs(value - expected) <= safeTolerance + Number.EPSILON * Math.max(1, Math.abs(expected));
  // A bare figure written out in base units ("127200000000" in a billion VND field)
  // is the same quantity, so it is read in base units when only that reading matches.
  const spec = numericUnitSpec(expectedUnit);
  if (parsed.ok && parsed.value !== null && !parsed.explicitScale && (!parsed.explicitUnit || spec.kind === 'count') && spec.scale > 1
    && spec.kind !== 'percent' && spec.kind !== 'percentage-point' && !within(parsed.value) && within(parsed.value / spec.scale)) {
    parsed = { ...parsed, value: parsed.value / spec.scale };
  }
  const difference = parsed.value === null ? null : Math.abs(parsed.value - expected);
  return {
    ...parsed,
    correct: parsed.ok && parsed.value !== null && within(parsed.value),
    expected,
    tolerance: safeTolerance,
    difference,
  };
}

export function formatCanonicalNumber(value: number, maximumFractionDigits = 6): string {
  return value.toLocaleString('en-US', { maximumFractionDigits, useGrouping: true });
}

export function toleranceRuleText(tolerance: number, unit: string, exactInteger = false): string {
  if (tolerance === 0 || exactInteger) return `Exact in ${unit}; whole-count thresholds must follow the stated rounding direction.`;
  return `Accepted within ±${formatCanonicalNumber(tolerance)} ${unit}; scoring uses the unrounded stored value.`;
}
