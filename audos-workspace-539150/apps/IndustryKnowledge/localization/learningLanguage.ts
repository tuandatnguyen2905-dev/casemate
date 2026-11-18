import { useEffect, useState } from 'react';
import { readGlossaryLanguage, writeGlossaryLanguage } from '../glossary/glossaryLanguage';
import type { LearningLanguage } from './localizationTypes';

export type { LearningLanguage } from './localizationTypes';

// Learner-wide display language for Learning Hub content, kept on this device the same way Essential Terms
// keeps its glossary language. It is display-only: lesson, chapter, card, activity and question identities
// never depend on it, so switching never touches progress, answers or reading position.
export const LEARNING_LANGUAGE_KEY = 'casemate:learning-language:v1';
const DEFAULT_LANGUAGE: LearningLanguage = 'en';
const listeners = new Set<(language: LearningLanguage) => void>();
let current: LearningLanguage | null = null;

const isLanguage = (value: unknown): value is LearningLanguage => value === 'en' || value === 'vi';

function readStored(): LearningLanguage {
  try {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(LEARNING_LANGUAGE_KEY) : null;
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function readLearningLanguage(): LearningLanguage {
  if (!current) current = readStored();
  return current;
}

export function writeLearningLanguage(language: LearningLanguage) {
  if (!isLanguage(language)) return;
  current = language;
  try {
    window.localStorage.setItem(LEARNING_LANGUAGE_KEY, language);
  } catch {
    // The choice still applies for this session.
  }
  // Essential Terms keeps its own EN / VI / EN + VI choice; only a single-language choice that contradicts
  // the lesson language follows it, so "EN + VI" is never overridden.
  const glossary = readGlossaryLanguage();
  if (glossary !== 'both' && glossary !== language) writeGlossaryLanguage(language);
  listeners.forEach((listener) => listener(language));
}

export function subscribeLearningLanguage(listener: (language: LearningLanguage) => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useLearningLanguage(): [LearningLanguage, (language: LearningLanguage) => void] {
  const [language, setLanguage] = useState<LearningLanguage>(readLearningLanguage);
  useEffect(() => {
    const unsubscribe = subscribeLearningLanguage(setLanguage);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LEARNING_LANGUAGE_KEY || !isLanguage(event.newValue) || event.newValue === current) return;
      current = event.newValue;
      listeners.forEach((listener) => listener(event.newValue as LearningLanguage));
    };
    window.addEventListener('storage', onStorage);
    setLanguage(readLearningLanguage());
    return () => {
      unsubscribe();
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  return [language, writeLearningLanguage];
}
