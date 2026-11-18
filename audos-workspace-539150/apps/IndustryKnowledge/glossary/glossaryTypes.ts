// Essential Terms (topic glossary) data model shared by every Domain Knowledge curriculum.
// Terms are addressed by stable ids, never by display text. A curriculum file owns its own
// context-specific terms and lesson mappings and may reference shared definitions by id, so the
// same concept is defined once and reused across chapters, lessons and sub-industries.

export type GlossaryCategory =
  | 'essential-concepts'
  | 'acronyms'
  | 'financial-metrics'
  | 'products-services'
  | 'business-models'
  | 'institutions'
  | 'business-processes'
  | 'regulatory'
  | 'strategic';

export const GLOSSARY_CATEGORIES: ReadonlyArray<{ id: GlossaryCategory; label: string; labelVi: string }> = [
  { id: 'essential-concepts', label: 'Essential Concepts', labelVi: 'Khái niệm cốt lõi' },
  { id: 'acronyms', label: 'Acronyms & Abbreviations', labelVi: 'Từ viết tắt' },
  { id: 'financial-metrics', label: 'Financial Metrics', labelVi: 'Chỉ số tài chính' },
  { id: 'products-services', label: 'Products & Services', labelVi: 'Sản phẩm & dịch vụ' },
  { id: 'business-models', label: 'Business Models', labelVi: 'Mô hình kinh doanh' },
  { id: 'institutions', label: 'Institutions & Organizations', labelVi: 'Tổ chức & định chế' },
  { id: 'business-processes', label: 'Business Processes', labelVi: 'Quy trình nghiệp vụ' },
  { id: 'regulatory', label: 'Regulatory Terminology', labelVi: 'Thuật ngữ pháp lý' },
  { id: 'strategic', label: 'Strategic Concepts', labelVi: 'Khái niệm chiến lược' },
];

/**
 * - verified: full form and definition agree with a sourced curriculum Key Term or a named official
 *   source recorded in `sourceIds`.
 * - needs-source: explanatory entry without a traceable source yet; never shown as verified.
 * - needs-review: the meaning depends on context or a rule that has not been confirmed.
 */
export type VerificationStatus = 'verified' | 'needs-source' | 'needs-review';

/** Whether the wording is an official definition, the curriculum's sourced Key Term, or a plain-language paraphrase. */
export type DefinitionBasis = 'official' | 'curriculum' | 'paraphrase';

export interface GlossarySource {
  id: string;
  title: string;
  url?: string;
  publisher?: string;
  /** Where the curriculum uses it, e.g. "Commercial Banking 1.3 ch.3 Key Terms". */
  note?: string;
}

export interface GlossaryTermDef {
  id: string;
  /** Canonical display term, e.g. "Net interest margin". */
  term: string;
  acronym?: string;
  /** Expanded form shown with an acronym, e.g. "Net Interest Margin". */
  fullForm?: string;
  /** Extra text forms recognised by inline lookup (exact, whole word). */
  aliases?: string[];
  category: GlossaryCategory;
  definitionEn: string;
  definitionVi?: string;
  businessContextEn?: string;
  businessContextVi?: string;
  exampleEn?: string;
  exampleVi?: string;
  sourceIds: string[];
  basis: DefinitionBasis;
  verificationStatus: VerificationStatus;
  reviewNote?: string;
  /** Set false for everyday words that should not be underlined in chapter text. */
  annotate?: boolean;
}

export interface GlossaryContextNote {
  en: string;
  vi?: string;
}

export interface GlossaryLessonDef {
  /** Blueprint position, e.g. "2.2". */
  key: string;
  title: string;
  module: string;
  /** Original chapter index in the lesson deck → term ids that matter in that chapter. */
  chapters: Record<number, string[]>;
  /** Curated preview order: lesson objectives, chapter relevance, beginner unfamiliarity, MT relevance. */
  essential: string[];
  /** Lesson-specific business context that refines a shared definition without duplicating it. */
  contextNotes?: Record<string, GlossaryContextNote>;
}

export interface FlaggedAcronym {
  acronym: string;
  status: 'ambiguous' | 'not-yet-authored';
  note: string;
}

export interface CurriculumGlossaryData {
  curriculumId: string;
  industry: string;
  subIndustry: string;
  terms: GlossaryTermDef[];
  sources: GlossarySource[];
  lessons: GlossaryLessonDef[];
  flaggedAcronyms?: FlaggedAcronym[];
  /** Lesson keys deliberately left without a glossary, with the reason. */
  excludedLessons?: Array<{ key: string; reason: string }>;
}

export type GlossaryLanguage = 'both' | 'en' | 'vi';
