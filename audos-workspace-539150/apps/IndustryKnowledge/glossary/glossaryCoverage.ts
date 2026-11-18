// Glossary coverage checker. Reads the same lesson catalogue the app uses (every implemented
// sub-industry, its lessons and chapter decks) plus the authored glossary data, and reports what is
// structurally valid separately from what is factually verified. Nothing here names a curriculum.
import { isValidElement } from 'react';
import type { CurriculumGlossaryData, GlossaryTermDef } from './glossaryTypes';
import { GLOSSARY_INDEX, normalizeLessonTitle, resolveGlossaryRef } from './glossaryIndex';
import type { CurriculumGlossaryIndexEntry } from './glossaryIndex';
import { lessonTermIds } from './glossaryStore';

export interface CoverageCatalog {
  subIndustries: Array<{
    id: string;
    name: string;
    groupName: string;
    error?: string;
    lessons: Array<{ identity: string; lessonTitle: string; moduleTitle: string; blocked: boolean; deck: { cards: unknown[] } | null }>;
  }>;
}

export interface CoverageRow {
  industry: string;
  subIndustry: string;
  subIndustryId: string;
  lessons: number;
  lessonsWithGlossary: number;
  uniqueTerms: number;
  verifiedTerms: number;
  enCoverage: number;
  viCoverage: number;
  sourceCoverage: number;
  gaps: string[];
}

export interface CoverageIssue {
  curriculumId: string;
  lessonKey?: string;
  chapter?: number;
  termId?: string;
  detail: string;
}

export interface GlossaryCoverageReport {
  curriculaInspected: number;
  lessonsInspected: number;
  lessonsWithGlossary: number;
  lessonsWithoutGlossary: number;
  uniqueTerms: number;
  rows: CoverageRow[];
  termsNeedingVerification: CoverageIssue[];
  /** One id defined with different content in two curricula. */
  conflictingIds: CoverageIssue[];
  /** Different ids whose canonical term and definition are identical: should be one shared entry. */
  duplicateDefinitions: CoverageIssue[];
  /** An acronym that resolves to different terms somewhere in the catalogue. */
  ambiguousAcronyms: Array<{ acronym: string; termIds: string[]; flaggedIn: string[] }>;
  invalidMappings: CoverageIssue[];
  unusedEntries: CoverageIssue[];
  /** Mapped terms not found in that chapter's readable text (relevance check; review, not necessarily wrong). */
  mappingsNotInText: CoverageIssue[];
  /** Upper-case abbreviations in chapters of glossary lessons that the glossary does not explain. */
  unknownAbbreviations: Array<{ curriculumId: string; acronym: string; chapters: number }>;
  structuralProblems: string[];
  structurallyValid: boolean;
  table: string;
}

const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

/** Readable text of a chapter card: plain strings anywhere in its data, including strings passed as props inside JSX. */
export function chapterText(card: unknown, depth = 0): string {
  if (depth > 12 || card === null || card === undefined || typeof card === 'boolean') return '';
  if (typeof card === 'string') return card;
  if (typeof card === 'number') return String(card);
  if (typeof card === 'function') return '';
  if (Array.isArray(card)) return card.map((item) => chapterText(item, depth + 1)).join(' ');
  if (isValidElement(card)) return chapterText((card.props as Record<string, unknown>) ?? {}, depth + 1);
  if (typeof card === 'object') {
    return Object.entries(card as Record<string, unknown>)
      .filter(([key]) => !['icon', 'visualKind', 'imageUrl', 'url', 'href', 'id', 'sourceIds', 'className'].includes(key))
      .map(([, value]) => chapterText(value, depth + 1))
      .join(' ');
  }
  return '';
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function formsOf(term: GlossaryTermDef): string[] {
  return [term.term, term.acronym, term.fullForm, ...(term.aliases ?? [])].filter((form): form is string => Boolean(form && form.trim().length >= 2));
}

export function textMentions(text: string, term: GlossaryTermDef): boolean {
  return formsOf(term).some((form) => {
    const acronym = /[A-Z]/.test(form) && form === form.toUpperCase();
    const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegex(acronym ? form : form.toLowerCase())}(?=$|[^\\p{L}\\p{N}])`, 'u');
    return pattern.test(acronym ? text : text.toLowerCase());
  });
}

const ACRONYM_PATTERN = /(?<![\p{L}\p{N}])[A-Z][A-Z0-9&-]{1,6}(?![\p{L}\p{N}])/gu;
const NOT_TERMS = new Set(['II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'XI', 'OK', 'US', 'UK', 'EU', 'AND', 'OR', 'THE', 'FOR', 'NOT', 'TBD']);

function termKey(term: GlossaryTermDef) {
  return `${term.term.toLowerCase()}|${term.definitionEn.trim().toLowerCase()}`;
}

export function glossaryCoverage(
  catalog: CoverageCatalog,
  glossaries: CurriculumGlossaryData[],
  index: ReadonlyArray<CurriculumGlossaryIndexEntry> = GLOSSARY_INDEX,
): GlossaryCoverageReport {
  const byCurriculum = new Map(glossaries.map((data) => [data.curriculumId, data]));
  const termsNeedingVerification: CoverageIssue[] = [];
  const conflictingIds: CoverageIssue[] = [];
  const duplicateDefinitions: CoverageIssue[] = [];
  const invalidMappings: CoverageIssue[] = [];
  const unusedEntries: CoverageIssue[] = [];
  const mappingsNotInText: CoverageIssue[] = [];
  const unknownAbbreviations: GlossaryCoverageReport['unknownAbbreviations'] = [];
  const structural: string[] = [];

  // Term identity across curricula: the same id must mean the same object everywhere.
  const globalTerms = new Map<string, { term: GlossaryTermDef; curriculumId: string }>();
  const byDefinition = new Map<string, Set<string>>();
  glossaries.forEach((data) => {
    const local = new Set<string>();
    data.terms.forEach((term) => {
      if (local.has(term.id)) structural.push(`${data.curriculumId}: term ${term.id} listed twice`);
      local.add(term.id);
      const seen = globalTerms.get(term.id);
      if (seen && seen.term !== term && JSON.stringify(seen.term) !== JSON.stringify(term)) {
        conflictingIds.push({ curriculumId: data.curriculumId, termId: term.id, detail: `also defined differently in ${seen.curriculumId}` });
      }
      if (!seen) globalTerms.set(term.id, { term, curriculumId: data.curriculumId });
      const key = termKey(term);
      byDefinition.set(key, new Set([...(byDefinition.get(key) ?? []), term.id]));
      if (!term.definitionEn.trim()) structural.push(`${data.curriculumId}: ${term.id} has no English definition`);
      if (term.verificationStatus === 'verified' && !term.sourceIds.length) structural.push(`${data.curriculumId}: ${term.id} is marked verified without a source`);
      term.sourceIds.forEach((sourceId) => {
        if (!data.sources.some((source) => source.id === sourceId)) structural.push(`${data.curriculumId}: ${term.id} cites unknown source ${sourceId}`);
      });
    });
  });
  byDefinition.forEach((ids) => {
    if (ids.size > 1) duplicateDefinitions.push({ curriculumId: '*', detail: `identical definition under ${[...ids].join(', ')}` });
  });
  globalTerms.forEach(({ term, curriculumId }) => {
    if (term.verificationStatus !== 'verified') termsNeedingVerification.push({ curriculumId, termId: term.id, detail: `${term.verificationStatus}${term.reviewNote ? ` — ${term.reviewNote}` : ''}` });
  });

  // Acronyms that mean different things in different places.
  const acronyms = new Map<string, Set<string>>();
  globalTerms.forEach(({ term }) => {
    [term.acronym, ...(term.aliases ?? []).filter((alias) => /^[A-Z0-9&-]{2,7}$/.test(alias))].filter(Boolean).forEach((acronym) => {
      acronyms.set(acronym as string, new Set([...(acronyms.get(acronym as string) ?? []), term.id]));
    });
  });
  const flagged = new Map<string, string[]>();
  glossaries.forEach((data) => (data.flaggedAcronyms ?? []).filter((item) => item.status === 'ambiguous').forEach((item) => {
    flagged.set(item.acronym, [...(flagged.get(item.acronym) ?? []), data.curriculumId]);
  }));
  const ambiguousAcronyms = [...new Set([...acronyms.keys(), ...flagged.keys()])]
    .filter((acronym) => (acronyms.get(acronym)?.size ?? 0) > 1 || flagged.has(acronym))
    .map((acronym) => ({ acronym, termIds: [...(acronyms.get(acronym) ?? [])], flaggedIn: flagged.get(acronym) ?? [] }));

  // Index ↔ data agreement, mappings and unused entries.
  index.forEach((entry) => {
    const data = byCurriculum.get(entry.curriculumId);
    if (!data) { structural.push(`${entry.curriculumId}: indexed but no data supplied`); return; }
    const dataKeys = data.lessons.map((lesson) => lesson.key).sort();
    const indexKeys = [...entry.lessonKeys].sort();
    if (dataKeys.join(',') !== indexKeys.join(',')) structural.push(`${entry.curriculumId}: index lessons [${indexKeys}] differ from data lessons [${dataKeys}]`);
    const terms = new Map(data.terms.map((term) => [term.id, term]));
    const used = new Set<string>();
    data.lessons.forEach((lesson) => {
      lesson.essential.forEach((id) => {
        if (!terms.has(id)) invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: lesson.key, termId: id, detail: 'essential term is not defined' });
        if (!Object.values(lesson.chapters).some((ids) => ids.includes(id))) invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: lesson.key, termId: id, detail: 'essential term is not mapped to any chapter' });
      });
      Object.entries(lesson.chapters).forEach(([chapter, ids]) => {
        ids.forEach((id) => { if (!terms.has(id)) invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: lesson.key, chapter: Number(chapter), termId: id, detail: 'term is not defined' }); });
        if (new Set(ids).size !== ids.length) invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: lesson.key, chapter: Number(chapter), detail: 'term mapped twice in one chapter' });
      });
      Object.keys(lesson.contextNotes ?? {}).forEach((id) => {
        if (!lessonTermIds(lesson).includes(id)) invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: lesson.key, termId: id, detail: 'context note for a term the lesson does not use' });
      });
      lessonTermIds(lesson).forEach((id) => used.add(id));
    });
    data.terms.forEach((term) => { if (!used.has(term.id)) unusedEntries.push({ curriculumId: data.curriculumId, termId: term.id, detail: 'defined but not mapped to any lesson' }); });
  });

  // Walk the live catalogue: lessons, chapter bounds, relevance and unexplained abbreviations.
  let lessonsInspected = 0;
  let lessonsWithGlossary = 0;
  const rows: CoverageRow[] = catalog.subIndustries.map((entry) => {
    const indexEntry = index.find((item) => item.industryIds.includes(entry.id));
    const data = indexEntry ? byCurriculum.get(indexEntry.curriculumId) : undefined;
    let withGlossary = 0;
    const acronymChapters = new Map<string, number>();
    const known = new Set<string>();
    data?.terms.forEach((term) => formsOf(term).forEach((form) => known.add(form)));
    data?.flaggedAcronyms?.forEach((item) => known.add(item.acronym));
    const mappedKeys = new Set<string>();
    entry.lessons.forEach((lesson) => {
      lessonsInspected += 1;
      const ref = resolveGlossaryRef(lesson.identity);
      if (!ref || !data) return;
      const lessonDef = data.lessons.find((item) => item.key === ref.lessonKey);
      if (!lessonDef) return;
      mappedKeys.add(ref.lessonKey);
      if (normalizeLessonTitle(lessonDef.title) !== normalizeLessonTitle(lesson.lessonTitle)) {
        invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: ref.lessonKey, detail: `lesson title "${lesson.lessonTitle}" does not match glossary title "${lessonDef.title}"` });
      }
      if (lesson.blocked) {
        invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: ref.lessonKey, detail: 'glossary authored for a lesson that cannot be opened' });
        return;
      }
      withGlossary += 1;
      const cards = lesson.deck?.cards ?? [];
      const terms = new Map(data.terms.map((term) => [term.id, term]));
      Object.entries(lessonDef.chapters).forEach(([chapter, ids]) => {
        const chapterIndex = Number(chapter);
        if (!Number.isInteger(chapterIndex) || chapterIndex < 0 || chapterIndex >= cards.length) {
          invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: ref.lessonKey, chapter: chapterIndex, detail: `chapter ${chapterIndex + 1} does not exist (lesson has ${cards.length})` });
          return;
        }
        const text = chapterText(cards[chapterIndex]);
        ids.forEach((id) => {
          const term = terms.get(id);
          if (term && !textMentions(text, term)) mappingsNotInText.push({ curriculumId: data.curriculumId, lessonKey: ref.lessonKey, chapter: chapterIndex, termId: id, detail: 'not found in chapter text' });
        });
      });
      cards.forEach((card) => {
        const found = new Set((chapterText(card).match(ACRONYM_PATTERN) ?? []).filter((acronym) => !NOT_TERMS.has(acronym) && !known.has(acronym) && !/^\d/.test(acronym)));
        found.forEach((acronym) => acronymChapters.set(acronym, (acronymChapters.get(acronym) ?? 0) + 1));
      });
    });
    lessonsWithGlossary += withGlossary;
    if (data) {
      acronymChapters.forEach((chapters, acronym) => unknownAbbreviations.push({ curriculumId: data.curriculumId, acronym, chapters }));
      data.lessons.filter((lesson) => !mappedKeys.has(lesson.key)).forEach((lesson) => {
        invalidMappings.push({ curriculumId: data.curriculumId, lessonKey: lesson.key, detail: 'glossary lesson not found in the live catalogue' });
      });
    }
    const terms = data ? data.terms : [];
    const gaps: string[] = [];
    if (entry.error) gaps.push(`catalogue error: ${entry.error}`);
    if (!data) gaps.push('no glossary authored');
    else {
      const openable = entry.lessons.filter((lesson) => !lesson.blocked).length;
      if (withGlossary < openable) gaps.push(`${openable - withGlossary} openable lessons without glossary`);
      const pending = terms.filter((term) => term.verificationStatus !== 'verified').length;
      if (pending) gaps.push(`${pending} terms need source/review`);
      const noVi = terms.filter((term) => !term.definitionVi).length;
      if (noVi) gaps.push(`${noVi} terms without Vietnamese`);
      gaps.push('Vietnamese pending native review');
    }
    return {
      industry: entry.groupName,
      subIndustry: entry.name,
      subIndustryId: entry.id,
      lessons: entry.lessons.length,
      lessonsWithGlossary: withGlossary,
      uniqueTerms: terms.length,
      verifiedTerms: terms.filter((term) => term.verificationStatus === 'verified').length,
      enCoverage: pct(terms.filter((term) => term.definitionEn.trim()).length, terms.length),
      viCoverage: pct(terms.filter((term) => term.definitionVi?.trim()).length, terms.length),
      sourceCoverage: pct(terms.filter((term) => term.sourceIds.length > 0).length, terms.length),
      gaps,
    };
  });

  const table = [
    '| Industry | Sub-industry | Lessons | Lessons With Glossary | Verified Terms | EN Coverage | VI Coverage | Gaps |',
    '|---|---|---|---|---|---|---|---|',
    ...rows.map((row) => `| ${row.industry} | ${row.subIndustry} | ${row.lessons} | ${row.lessonsWithGlossary} | ${row.uniqueTerms ? `${row.verifiedTerms}/${row.uniqueTerms}` : '0'} | ${row.uniqueTerms ? `${row.enCoverage}%` : '—'} | ${row.uniqueTerms ? `${row.viCoverage}%` : '—'} | ${row.gaps.join('; ')} |`),
  ].join('\n');

  return {
    curriculaInspected: catalog.subIndustries.length,
    lessonsInspected,
    lessonsWithGlossary,
    lessonsWithoutGlossary: lessonsInspected - lessonsWithGlossary,
    uniqueTerms: globalTerms.size,
    rows,
    termsNeedingVerification,
    conflictingIds,
    duplicateDefinitions,
    ambiguousAcronyms,
    invalidMappings,
    unusedEntries,
    mappingsNotInText,
    unknownAbbreviations: unknownAbbreviations.sort((left, right) => right.chapters - left.chapters),
    structuralProblems: structural,
    structurallyValid: structural.length === 0 && invalidMappings.length === 0 && conflictingIds.length === 0,
    table,
  };
}

/** Loads every indexed curriculum glossary (for the coverage script; the reader loads one lesson at a time). */
export function loadAllGlossaries(index: ReadonlyArray<CurriculumGlossaryIndexEntry> = GLOSSARY_INDEX): Promise<CurriculumGlossaryData[]> {
  return Promise.all(index.map((entry) => entry.load()));
}
