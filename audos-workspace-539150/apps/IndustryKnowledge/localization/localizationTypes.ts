// Display-language overlays for Learning Hub content. A translation is addressed by canonical identity
// (curriculum, module, lesson code, chapter index, case id, card id, activity id), never by display text,
// and it only replaces text: ids, order, answer keys, sources and numbers come from the English source.

export type LearningLanguage = 'en' | 'vi';

/** How the current chapter is shown in the selected language. */
export type LocaleStatus = 'source' | 'translated' | 'partial' | 'stale' | 'missing' | 'loading';

export interface ViStatTile {
  label: string;
  subtitle?: string;
  description: string;
}

/** Vietnamese General Info for one chapter. `en` is the English chapter title it was translated from. */
export interface ViChapter {
  en: string;
  title: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  what: string;
  how: string;
  why: string;
  global: string;
  vietnam: string;
  /** Translation of the chapter-specific Learning Visual heading and intro the reader shows. */
  visualHeading?: string;
  visualIntro?: string;
  imageAlt: string;
  /** Same order as the English tiles; each tile keeps its English value. */
  statTiles: ViStatTile[];
  statsNote: string;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  deepDive: string[];
  evidence: string;
  /** Present exactly when the English chapter carries a verification restriction. */
  restriction?: string;
}

export interface ViTakeaways {
  learned: string;
  keyTakeaways: string[];
  businessImplications: string;
  remember: string;
}

export interface ViLesson {
  /** English lesson title (deck key) the translation belongs to, e.g. "1.1 Industry Definition & Scope". */
  enTitle: string;
  chapters: ViChapter[];
  takeaways: ViTakeaways;
}

/** Vietnamese text for a Real-World Case Study, tied to the English case version it was translated from. */
export interface ViCaseStudy {
  enTitle: string;
  /** The English case's `verifiedAt`; a different value means the source was re-verified and this text is stale. */
  sourceVerifiedAt: string;
  bank: string;
  title: string;
  context: string;
  problem: string;
  action: string;
  mechanism: string;
  outcome: string;
  takeaway: string;
  verifiedAtVi: string;
}

export interface ChapterLocale {
  status: LocaleStatus;
  /** Field paths that fell back to English, e.g. "statTiles.2.description". */
  fallbackFields: string[];
  caseStudy?: 'translated' | 'stale' | 'missing';
}

export interface LessonLocale {
  language: LearningLanguage;
  status: LocaleStatus;
  chapters: ChapterLocale[];
  quiz: 'translated' | 'partial' | 'english' | 'none';
  quizFallbackIds: string[];
  takeaways: 'translated' | 'english' | 'none';
}
