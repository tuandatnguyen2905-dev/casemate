// Numbers are the facts a translation must never change. A translated field is used only when every number
// in the current English text also appears in it, so an edited figure, period or legal reference in the
// English source automatically sends the field back to English instead of showing an outdated translation.

const NUMBER = /\d(?:[\d.,]*\d)?/g;

/** Digit groups with thousand and decimal separators removed, so "VND42,236" and "42.236" compare equal. */
export function numberTokens(text: string | undefined): string[] {
  return (String(text ?? '').match(NUMBER) ?? []).map((token) => token.replace(/[.,]/g, ''));
}

/** True when every number in the English text also appears in the Vietnamese text (as a multiset). */
export function keepsNumbers(english: string | undefined, vietnamese: string | undefined): boolean {
  if (!english) return true;
  if (!vietnamese || !vietnamese.trim()) return false;
  const pool = new Map<string, number>();
  numberTokens(vietnamese).forEach((token) => pool.set(token, (pool.get(token) ?? 0) + 1));
  return numberTokens(english).every((token) => {
    const left = pool.get(token) ?? 0;
    if (!left) return false;
    pool.set(token, left - 1);
    return true;
  });
}
