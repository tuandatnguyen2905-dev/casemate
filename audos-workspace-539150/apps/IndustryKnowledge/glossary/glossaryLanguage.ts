import { useEffect, useState } from 'react';
import type { GlossaryLanguage } from './glossaryTypes';

// Display language for glossary definitions only. The app has no language preference of its own,
// so this stays scoped to Essential Terms and never translates chapter content.
export const GLOSSARY_LANGUAGE_KEY = 'casemate:glossary-language:v1';
const DEFAULT_LANGUAGE: GlossaryLanguage = 'both';
const listeners = new Set<(language: GlossaryLanguage) => void>();

const isLanguage = (value: unknown): value is GlossaryLanguage => value === 'both' || value === 'en' || value === 'vi';

export function readGlossaryLanguage(): GlossaryLanguage {
  try {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(GLOSSARY_LANGUAGE_KEY) : null;
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function writeGlossaryLanguage(language: GlossaryLanguage) {
  try {
    window.localStorage.setItem(GLOSSARY_LANGUAGE_KEY, language);
  } catch {
    // The choice still applies for this session.
  }
  listeners.forEach((listener) => listener(language));
}

export function useGlossaryLanguage(): [GlossaryLanguage, (language: GlossaryLanguage) => void] {
  const [language, setLanguage] = useState<GlossaryLanguage>(readGlossaryLanguage);
  useEffect(() => {
    listeners.add(setLanguage);
    return () => { listeners.delete(setLanguage); };
  }, []);
  return [language, writeGlossaryLanguage];
}

export const LANGUAGE_OPTIONS: ReadonlyArray<{ id: GlossaryLanguage; label: string; title: string }> = [
  { id: 'both', label: 'EN + VI', title: 'English with Vietnamese explanation' },
  { id: 'en', label: 'EN', title: 'English only' },
  { id: 'vi', label: 'VI', title: 'Tiếng Việt (English when no Vietnamese is available)' },
];
