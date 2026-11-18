// PDF text extraction can turn ligature glyphs (fi, ffi) into NUL characters,
// which PostgreSQL JSON columns reject when the CV or progress is saved.
export function stripNulDeep<T>(value: T): T {
  if (typeof value === 'string') return value.replace(/\u0000/g, '') as unknown as T;
  if (Array.isArray(value)) return value.map((item) => stripNulDeep(item)) as unknown as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, stripNulDeep(item)])) as T;
  }
  return value;
}
