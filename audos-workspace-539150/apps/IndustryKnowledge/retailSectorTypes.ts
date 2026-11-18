import type { LucideIcon } from 'lucide-react';

/** Shared chrome for one retail lesson: the same across every retail sector. */
export interface RetailLessonBlueprint {
  key: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

/** One of the five standard modules, with its ordered lesson list. */
export interface RetailModuleBlueprint {
  /** Canonical KNOWLEDGE_SECTIONS card title, e.g. 'How the Industry Works'. */
  moduleTitle: string;
  lessons: RetailLessonBlueprint[];
}

/** Sector-specific copy for one lesson. */
export interface RetailLessonContent {
  /** Replaces the blueprint title and subtitle when a sector teaches a different subject in this slot. */
  title?: string;
  subtitle?: string;
  description: string;
  takeaways: string[];
}

/**
 * Everything that differs between retail sectors: the module card descriptions
 * keyed by canonical module title, and the lesson copy keyed by lesson key.
 */
export interface RetailSectorContent {
  modules: Record<string, string>;
  lessons: Record<string, RetailLessonContent>;
}

export interface RetailLessonCard {
  title: string;
  description: string;
  takeaways: string[];
}

export interface RetailModuleResolution {
  description: string;
  lessons: RetailLessonCard[];
}

export interface RetailLessonPresentation {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}
