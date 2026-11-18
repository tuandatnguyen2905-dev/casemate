import { useEffect, useState } from 'react';
import { GLOSSARY_CATEGORIES } from './glossaryTypes';
import type { CurriculumGlossaryData, GlossaryCategory, GlossaryLessonDef, GlossarySource, GlossaryTermDef } from './glossaryTypes';
import { GLOSSARY_INDEX, parseLessonIdentity, resolveGlossaryRef } from './glossaryIndex';

export interface ResolvedTerm extends GlossaryTermDef {
  sources: GlossarySource[];
  /** Lesson-specific context that refines a shared definition. */
  lessonContextEn?: string;
  lessonContextVi?: string;
  /** Chapter indexes of the open lesson where the term matters. */
  chapters: number[];
}

export interface LessonGlossary {
  identity: string;
  curriculumId: string;
  subIndustry: string;
  lessonKey: string;
  lessonTitle: string;
  moduleTitle: string;
  /** Ranked: curated essential order first, then chapter relevance and category. */
  terms: ResolvedTerm[];
  essential: ResolvedTerm[];
  byChapter: Record<number, string[]>;
  /** Every term of the lessons in the same module, ranked by how many lessons use it. */
  moduleTerms: ResolvedTerm[];
}

interface NormalizedCurriculum {
  data: CurriculumGlossaryData;
  terms: Map<string, GlossaryTermDef>;
  sources: Map<string, GlossarySource>;
  lessons: Map<string, GlossaryLessonDef>;
}

const loading = new Map<string, Promise<NormalizedCurriculum>>();
const loaded = new Map<string, NormalizedCurriculum>();
const lessonCache = new Map<string, LessonGlossary>();

const CATEGORY_ORDER = new Map<GlossaryCategory, number>(GLOSSARY_CATEGORIES.map((category, index) => [category.id, index]));

export function normalizeCurriculum(data: CurriculumGlossaryData): NormalizedCurriculum {
  return {
    data,
    terms: new Map(data.terms.map((term) => [term.id, term])),
    sources: new Map(data.sources.map((source) => [source.id, source])),
    lessons: new Map(data.lessons.map((lesson) => [lesson.key, lesson])),
  };
}

function loadCurriculum(curriculumId: string): Promise<NormalizedCurriculum> {
  const ready = loaded.get(curriculumId);
  if (ready) return Promise.resolve(ready);
  const pending = loading.get(curriculumId);
  if (pending) return pending;
  const entry = GLOSSARY_INDEX.find((item) => item.curriculumId === curriculumId);
  if (!entry) return Promise.reject(new Error(`Unknown glossary ${curriculumId}`));
  const promise = entry.load().then((data) => {
    const normalized = normalizeCurriculum(data);
    loaded.set(curriculumId, normalized);
    return normalized;
  }).catch((error) => {
    loading.delete(curriculumId);
    throw error;
  });
  loading.set(curriculumId, promise);
  return promise;
}

function resolveTerm(curriculum: NormalizedCurriculum, id: string, lesson: GlossaryLessonDef | null): ResolvedTerm | null {
  const term = curriculum.terms.get(id);
  if (!term) return null;
  const note = lesson?.contextNotes?.[id];
  const chapters = lesson
    ? Object.entries(lesson.chapters).filter(([, ids]) => ids.includes(id)).map(([index]) => Number(index)).sort((a, b) => a - b)
    : [];
  return {
    ...term,
    sources: term.sourceIds.map((sourceId) => curriculum.sources.get(sourceId)).filter((source): source is GlossarySource => Boolean(source)),
    lessonContextEn: note?.en,
    lessonContextVi: note?.vi,
    chapters,
  };
}

/** Term ids of a lesson: curated essentials first, then the remaining mapped ids in chapter order. */
export function lessonTermIds(lesson: GlossaryLessonDef): string[] {
  const ids: string[] = [];
  const add = (id: string) => { if (!ids.includes(id)) ids.push(id); };
  lesson.essential.forEach(add);
  Object.keys(lesson.chapters).map(Number).sort((a, b) => a - b).forEach((index) => lesson.chapters[index].forEach(add));
  return ids;
}

/** Ranking is editorial (essential order), then breadth across the lesson's chapters, then category. Never raw word frequency. */
export function rankTerms(terms: ResolvedTerm[], essential: string[]): ResolvedTerm[] {
  const curated = new Map(essential.map((id, index) => [id, index]));
  return [...terms].sort((left, right) => {
    const a = curated.get(left.id) ?? Number.POSITIVE_INFINITY;
    const b = curated.get(right.id) ?? Number.POSITIVE_INFINITY;
    if (a !== b) return a - b;
    if (right.chapters.length !== left.chapters.length) return right.chapters.length - left.chapters.length;
    const category = (CATEGORY_ORDER.get(left.category) ?? 99) - (CATEGORY_ORDER.get(right.category) ?? 99);
    return category || left.term.localeCompare(right.term);
  });
}

export function buildLessonGlossary(identity: string, curriculum: NormalizedCurriculum, lessonKey: string): LessonGlossary | null {
  const lesson = curriculum.lessons.get(lessonKey);
  if (!lesson) return null;
  const terms = lessonTermIds(lesson).map((id) => resolveTerm(curriculum, id, lesson)).filter((term): term is ResolvedTerm => Boolean(term));
  if (!terms.length) return null;
  const ranked = rankTerms(terms, lesson.essential);
  const essentialIds = new Set(lesson.essential);
  const usage = new Map<string, number>();
  curriculum.data.lessons.filter((item) => item.module === lesson.module).forEach((item) => {
    lessonTermIds(item).forEach((id) => usage.set(id, (usage.get(id) ?? 0) + 1));
  });
  const moduleTerms = [...usage.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([id]) => resolveTerm(curriculum, id, null))
    .filter((term): term is ResolvedTerm => Boolean(term));
  return {
    identity,
    curriculumId: curriculum.data.curriculumId,
    subIndustry: curriculum.data.subIndustry,
    lessonKey,
    lessonTitle: lesson.title,
    moduleTitle: lesson.module,
    terms: ranked,
    essential: ranked.filter((term) => essentialIds.has(term.id)),
    byChapter: Object.fromEntries(Object.entries(lesson.chapters).map(([index, ids]) => [Number(index), ids.filter((id) => curriculum.terms.has(id))])),
    moduleTerms,
  };
}

/** The lesson glossary when its curriculum chunk is already loaded; `undefined` while not loaded; null when none exists. */
export function peekLessonGlossary(identity: string | null | undefined): LessonGlossary | null | undefined {
  const ref = resolveGlossaryRef(identity);
  if (!ref || !identity) return null;
  const cached = lessonCache.get(identity);
  if (cached) return cached;
  const curriculum = loaded.get(ref.entry.curriculumId);
  if (!curriculum) return undefined;
  const glossary = buildLessonGlossary(identity, curriculum, ref.lessonKey);
  if (glossary) lessonCache.set(identity, glossary);
  return glossary;
}

export function loadLessonGlossary(identity: string | null | undefined): Promise<LessonGlossary | null> {
  const ref = resolveGlossaryRef(identity);
  if (!ref || !identity) return Promise.resolve(null);
  return loadCurriculum(ref.entry.curriculumId).then(() => peekLessonGlossary(identity) ?? null);
}

export type LessonGlossaryStatus = 'none' | 'loading' | 'ready' | 'error';

/** Lesson-scoped glossary for a lesson identity. Lessons without content resolve to 'none' without loading anything. */
export function useLessonGlossary(identity: string | null | undefined): { status: LessonGlossaryStatus; glossary: LessonGlossary | null; retry: () => void } {
  const initial = peekLessonGlossary(identity);
  const [state, setState] = useState<{ identity: string | null | undefined; status: LessonGlossaryStatus; glossary: LessonGlossary | null }>(() => ({
    identity,
    status: initial === undefined ? 'loading' : initial ? 'ready' : 'none',
    glossary: initial ?? null,
  }));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const now = peekLessonGlossary(identity);
    if (now !== undefined) {
      setState({ identity, status: now ? 'ready' : 'none', glossary: now ?? null });
      return undefined;
    }
    setState({ identity, status: 'loading', glossary: null });
    loadLessonGlossary(identity).then(
      (glossary) => { if (active) setState({ identity, status: glossary ? 'ready' : 'none', glossary }); },
      () => { if (active) setState({ identity, status: 'error', glossary: null }); },
    );
    return () => { active = false; };
  }, [identity, attempt]);

  if (state.identity !== identity) {
    const now = peekLessonGlossary(identity);
    return { status: now === undefined ? 'loading' : now ? 'ready' : 'none', glossary: now ?? null, retry: () => setAttempt((value) => value + 1) };
  }
  return { status: state.status, glossary: state.glossary, retry: () => setAttempt((value) => value + 1) };
}

export function lessonLabelFromIdentity(identity: string | null | undefined): string {
  return parseLessonIdentity(identity)?.lessonTitle ?? '';
}

/** Test seam: forget loaded curricula. */
export function resetGlossaryCache() {
  loading.clear();
  loaded.clear();
  lessonCache.clear();
}
