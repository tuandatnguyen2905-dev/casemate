/**
 * casePoolLinks.ts - links from other apps (My Roadmap) into Case Pool.
 *
 * A named case opens only when it resolves to a stable Case Pool id in the library data: an exact case id,
 * an exact source case id (e.g. CM-CRE-PD06) or the case's exact full title. Titles are never matched
 * partially, so a recommendation cannot land on a similar-looking case. A retired case is reported as
 * unavailable, never swapped for another one.
 *
 * A group of cases opens the library with filters built only from labels the library already shows
 * (industry, exercise type, business problem, difficulty). A label the library does not carry is dropped,
 * never approximated.
 */

import { CASE_POOL_LIBRARY, DRILL_FULL_CASE_LINK_AUDIT, SELECTABLE_CASE_POOL_LIBRARY } from './casePoolLibrary';
import type { FullCase } from './casePoolLibrary';
import { continueCaseCandidates } from './casePoolContinue';
import type { ContinueCase } from './casePoolContinue';
import type { PracticeSession } from './roadmapProgress';
import type { CaseDifficulty } from './caseLibraryShared';
import { poolCaseIdentity } from './caseIdentity';
import { CREATIVITY_CATEGORY_LABELS } from './creativityCycle2';
import { MARKET_SIZING_FORMAT_LABELS } from './marketSizingCycle3';
import {
  BUSINESS_PROBLEMS,
  DEFAULT_POOL_FILTERS,
  filterPoolCases,
  normalizeSearchText,
  type PoolFilters,
} from './casePoolBusinessProblems';
import { CASE_POOL_REQUEST_KEY, casePoolCaseIdFromHash, openCasePoolCase } from '../components/SolveFullCaseCta';

const CASE_POOL_APP_ID = 'case-drill-log';

/** A browse request shares Case Pool's one-shot request key; this prefix tells it apart from a case id. */
export const CASE_POOL_BROWSE_PREFIX = 'browse:';

const DIFFICULTIES: CaseDifficulty[] = ['easy', 'medium', 'hard', 'expert'];

/** Lower case, no diacritics, punctuation as spaces: "PD06 · Rova apartment" -> "pd06 rova apartment". */
function phrase(value: unknown): string {
  return normalizeSearchText(String(value ?? '')).replace(/[^a-z0-9%]+/g, ' ').trim();
}

/** The case title without a leading code ("PD06 · Rova apartment parcel handoff" -> "Rova apartment parcel handoff"). */
export function casePoolCoreTitle(title: string): string {
  return String(title || '').replace(/^[A-Z][A-Z0-9-]*\d[A-Z0-9-]*\s+·\s+/, '').trim();
}

/* ------------------------------------------------------------------ named cases */

export interface ResolvedPoolCase {
  /** 'retired' = the id exists in the data but the case is no longer offered. */
  status: 'available' | 'retired';
  item: FullCase;
  matchedBy: 'case-id' | 'source-id' | 'title';
}

export interface PoolCaseRef {
  caseId?: string | null;
  sourceCaseId?: string | null;
  title?: string | null;
}

function single<T>(items: T[]): T | null {
  return items.length === 1 ? items[0] : null;
}

function statusOf(item: FullCase): ResolvedPoolCase['status'] {
  return SELECTABLE_CASE_POOL_LIBRARY.some((entry) => entry.id === item.id) ? 'available' : 'retired';
}

function resolved(item: FullCase | null, matchedBy: ResolvedPoolCase['matchedBy']): ResolvedPoolCase | null {
  return item ? { status: statusOf(item), item, matchedBy } : null;
}

function byCaseId(id: string): FullCase | null {
  const wanted = id.trim().toLowerCase();
  return wanted ? CASE_POOL_LIBRARY.find((item) => item.id.toLowerCase() === wanted) || null : null;
}

function bySourceId(sourceId: string): FullCase | null {
  const wanted = sourceId.trim().toUpperCase();
  if (!wanted) return null;
  const matches = (list: FullCase[]) => list.filter((item) => String(item.source_case_id || '').toUpperCase() === wanted);
  return single(matches(SELECTABLE_CASE_POOL_LIBRARY)) || single(matches(CASE_POOL_LIBRARY));
}

function byTitle(title: string): FullCase | null {
  const wanted = phrase(title);
  if (!wanted) return null;
  const matches = (list: FullCase[]) => list.filter((item) => phrase(item.title) === wanted || phrase(casePoolCoreTitle(item.title)) === wanted);
  return single(matches(SELECTABLE_CASE_POOL_LIBRARY)) || single(matches(CASE_POOL_LIBRARY));
}

/** Resolves an explicit reference to one Case Pool case by exact id, source id or full title. */
export function resolvePoolCaseRef(ref: PoolCaseRef): ResolvedPoolCase | null {
  if (ref.caseId) {
    const hit = resolved(byCaseId(ref.caseId), 'case-id');
    if (hit) return hit;
  }
  if (ref.sourceCaseId) {
    const hit = resolved(bySourceId(ref.sourceCaseId), 'source-id');
    if (hit) return hit;
  }
  return ref.title ? resolved(byTitle(ref.title), 'title') : null;
}

let titleIndex: Array<{ title: string; item: FullCase }> | null = null;

function uniqueTitles(list: FullCase[]): Map<string, FullCase> {
  const counts = new Map<string, number>();
  const entries = list.map((item) => ({ title: phrase(casePoolCoreTitle(item.title)), item }));
  entries.forEach((entry) => counts.set(entry.title, (counts.get(entry.title) || 0) + 1));
  // A title shared by two records cannot name one case; very short titles are too generic to count as a name.
  return new Map(entries.filter((entry) => entry.title.split(' ').length >= 3 && counts.get(entry.title) === 1).map((entry) => [entry.title, entry.item]));
}

function namedTitles(): Array<{ title: string; item: FullCase }> {
  if (titleIndex) return titleIndex;
  const selectableIds = new Set(SELECTABLE_CASE_POOL_LIBRARY.map((item) => item.id));
  const selectableTitles = new Set(SELECTABLE_CASE_POOL_LIBRARY.map((item) => phrase(casePoolCoreTitle(item.title))));
  const index = uniqueTitles(SELECTABLE_CASE_POOL_LIBRARY);
  // A retired record counts only when no offered case carries the same title.
  uniqueTitles(CASE_POOL_LIBRARY.filter((item) => !selectableIds.has(item.id))).forEach((item, title) => {
    if (!selectableTitles.has(title)) index.set(title, item);
  });
  titleIndex = Array.from(index, ([title, item]) => ({ title, item }));
  return titleIndex;
}

/**
 * Cases a free-text recommendation names: an exact case id ("case-cm-cre-pd06"), an exact source id
 * ("CM-CRE-PD06") or a case's complete title as a whole phrase. Nothing shorter than a full title counts.
 */
export function findNamedPoolCases(text: string): ResolvedPoolCase[] {
  const raw = String(text || '');
  const found = new Map<string, ResolvedPoolCase>();
  const add = (hit: ResolvedPoolCase | null) => {
    if (hit && !found.has(hit.item.id)) found.set(hit.item.id, hit);
  };
  (raw.match(/\bcase-[a-z0-9]+(?:-[a-z0-9]+)*\b/gi) || []).forEach((id) => add(resolved(byCaseId(id), 'case-id')));
  (raw.match(/\b[A-Z]{1,4}(?:-[A-Z0-9]{1,6}){1,3}\b/g) || []).forEach((id) => add(resolved(bySourceId(id), 'source-id')));
  const padded = ` ${phrase(raw)} `;
  namedTitles().forEach((entry) => {
    if (padded.includes(` ${entry.title} `)) add(resolved(entry.item, 'title'));
  });
  return Array.from(found.values());
}

/* ------------------------------------------------------------------ filters */

let industryLabels: string[] | null = null;

/** Industry labels exactly as the Case Pool cards and filter show them. */
export function casePoolIndustryLabels(): string[] {
  industryLabels ??= Array.from(new Set(SELECTABLE_CASE_POOL_LIBRARY.map((item) => poolCaseIdentity(item).industry).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b));
  return industryLabels;
}

/**
 * Program industries (the `industry` column of the programs table) are broad; Case Pool industry labels are the
 * sector labels plus more specific ones read from the case itself ("Beverages", "Inland Freight"). A program
 * industry maps to a Case Pool label only where both name the same sector. Industries with no entry here
 * (Fashion & Apparel, Insurance, Hospitality & F&B, Telecommunications, ...) have no Case Pool sector of their
 * own and are never approximated.
 */
const SECTOR_EQUIVALENTS: Array<{ program: string[]; pool: string[] }> = [
  { program: ['FMCG', 'FMCG & Consumer Goods'], pool: ['FMCG', 'FMCG & Consumer Goods', 'Fast-Moving Consumer Goods'] },
  { program: ['Banking & Financial Services', 'Banking & Finance'], pool: ['Banking', 'Banking & Finance', 'Banking & Financial Services', 'Banking / Finance'] },
  { program: ['Retail'], pool: ['Retail'] },
  { program: ['Technology', 'E-commerce & Technology'], pool: ['Tech', 'Technology', 'Tech & E-commerce', 'Technology & E-commerce', 'E-commerce & Technology'] },
  { program: ['Healthcare & Pharma', 'Healthcare & Pharmaceuticals'], pool: ['Healthcare', 'Healthcare & Pharma', 'Healthcare & Pharmaceuticals'] },
  { program: ['Logistics & Supply Chain'], pool: ['Logistics', 'Logistics & Supply Chain'] },
  { program: ['Real Estate & Construction', 'Real Estate'], pool: ['Real Estate', 'Real Estate & Construction'] },
  { program: ['Professional Services', 'Consulting & Professional Services'], pool: ['Consulting', 'Professional Services', 'Consulting & Professional Services', 'Consulting / Big 4', 'Consulting & Big 4'] },
];

/** Case Pool industry labels that name the same sector as a program industry (an identical label wins outright). */
export function casePoolIndustryMatches(programIndustry: string | null | undefined): string[] {
  const wanted = phrase(programIndustry);
  if (!wanted) return [];
  const labels = casePoolIndustryLabels();
  const exact = labels.filter((label) => phrase(label) === wanted);
  if (exact.length) return exact;
  const group = SECTOR_EQUIVALENTS.find((entry) => entry.program.some((name) => phrase(name) === wanted));
  if (!group) return [];
  const names = new Set(group.pool.map(phrase));
  return labels.filter((label) => names.has(phrase(label)));
}

/**
 * The Case Pool industry filter label for a program industry, or null. The filter holds one label, so the
 * industry is applied only when exactly one Case Pool label matches; otherwise it is left out.
 */
export function casePoolIndustryForProgram(programIndustry: string | null | undefined): string | null {
  const matches = casePoolIndustryMatches(programIndustry);
  return matches.length === 1 ? matches[0] : null;
}

/** Review aid: how each program industry resolves today (label applied, or the Case Pool labels it could not choose between). */
export function programIndustryMapping(programIndustries: string[]): Array<{ programIndustry: string; label: string | null; candidates: string[] }> {
  return Array.from(new Set(programIndustries.filter(Boolean))).map((programIndustry) => {
    const candidates = casePoolIndustryMatches(programIndustry);
    return { programIndustry, label: candidates.length === 1 ? candidates[0] : null, candidates };
  });
}

export interface CasePoolLabels {
  industry?: string | null;
  exerciseType?: string | null;
  businessProblem?: string | null;
  difficulty?: string | null;
}

export interface CasePoolFilterBuild {
  filters: Partial<PoolFilters>;
  /** Labels that became filters, in display order. */
  applied: Array<{ key: keyof CasePoolLabels; label: string }>;
}

function exerciseTypeFilter(label: string): Partial<PoolFilters> | null {
  const wanted = phrase(label);
  if (!wanted) return null;
  if (wanted === 'creativity') return { creativity: 'all' };
  if (wanted === 'market sizing') return { marketSizing: 'all' };
  const creativity = (Object.keys(CREATIVITY_CATEGORY_LABELS) as Array<keyof typeof CREATIVITY_CATEGORY_LABELS>)
    .find((key) => phrase(CREATIVITY_CATEGORY_LABELS[key]) === wanted);
  if (creativity) return { creativity: String(creativity) };
  const format = (Object.keys(MARKET_SIZING_FORMAT_LABELS) as Array<keyof typeof MARKET_SIZING_FORMAT_LABELS>)
    .find((key) => phrase(MARKET_SIZING_FORMAT_LABELS[key]) === wanted);
  return format ? { marketSizing: String(format) } : null;
}

/** Turns labels into Case Pool filters. Only labels the library already uses are kept. */
export function casePoolFiltersFromLabels(labels: CasePoolLabels): CasePoolFilterBuild {
  const filters: Partial<PoolFilters> = {};
  const applied: CasePoolFilterBuild['applied'] = [];
  if (labels.industry) {
    const industry = casePoolIndustryLabels().find((item) => phrase(item) === phrase(labels.industry));
    if (industry) {
      filters.industry = industry;
      applied.push({ key: 'industry', label: industry });
    }
  }
  if (labels.exerciseType) {
    const type = exerciseTypeFilter(labels.exerciseType);
    if (type) {
      Object.assign(filters, type);
      applied.push({ key: 'exerciseType', label: labels.exerciseType.trim() });
    }
  }
  if (labels.businessProblem) {
    const problem = BUSINESS_PROBLEMS.find((item) => phrase(item.label) === phrase(labels.businessProblem));
    if (problem) {
      filters.businessProblem = problem.id;
      applied.push({ key: 'businessProblem', label: problem.label });
    }
  }
  const level = String(labels.difficulty || '').trim().toLowerCase() as CaseDifficulty;
  // Creativity cases carry no difficulty, so the library never combines the two.
  if (DIFFICULTIES.includes(level) && !filters.creativity) {
    filters.difficulty = level;
    applied.push({ key: 'difficulty', label: level.charAt(0).toUpperCase() + level.slice(1) });
  }
  return { filters, applied };
}

/** Selectable cases the library lists for these filters (same rules as the Case Pool list, ignoring progress). */
export function matchingCasePoolCases(filters: Partial<PoolFilters>): FullCase[] {
  const full: PoolFilters = { ...DEFAULT_POOL_FILTERS, ...filters };
  const base = filterPoolCases(SELECTABLE_CASE_POOL_LIBRARY, { ...full, industry: 'all' }, { completedIds: new Set(), openedIds: new Set() });
  return base.filter((item) => {
    const identity = poolCaseIdentity(item);
    if (full.industry !== 'all' && identity.industry !== full.industry) return false;
    if (full.difficulty !== 'all' && identity.difficulty !== full.difficulty) return false;
    return true;
  });
}

/**
 * Filters for "Browse related cases": the industry, exercise type and difficulty stored on a case.
 * The most specific combination that still lists at least one case wins; null when none does.
 */
export function relatedBrowseFor(labels: CasePoolLabels): (CasePoolFilterBuild & { count: number }) | null {
  const attempts: CasePoolLabels[] = [
    labels,
    { industry: labels.industry, exerciseType: labels.exerciseType },
    { exerciseType: labels.exerciseType, difficulty: labels.difficulty },
    { industry: labels.industry, difficulty: labels.difficulty },
    { exerciseType: labels.exerciseType },
    { industry: labels.industry },
  ];
  for (const attempt of attempts) {
    const build = casePoolFiltersFromLabels(attempt);
    // Difficulty alone does not make cases related.
    if (!build.applied.some((item) => item.key === 'industry' || item.key === 'exerciseType')) continue;
    const count = matchingCasePoolCases(build.filters).length;
    if (count > 0) return { ...build, count };
  }
  return null;
}

/** The verified industry, exercise type and difficulty labels of a Case Pool case. */
export function caseLabels(item: FullCase): CasePoolLabels {
  const identity = poolCaseIdentity(item);
  return { industry: identity.industry, exerciseType: identity.exerciseType, difficulty: identity.difficulty };
}

/* ------------------------------------------------------------------ continue the full case */

/**
 * Full cases to continue with: the source case of a completed Case Drill question that the learner has not
 * started in Case Pool, most recently drilled first. Only selectable cases that name the drill back are offered.
 */
export function continueFullCases(sessions: PracticeSession[], limit?: number): ContinueCase[] {
  return continueCaseCandidates({
    sessions,
    links: DRILL_FULL_CASE_LINK_AUDIT.linked,
    resolveCaseId: (ref) => resolvePoolCaseRef({ caseId: ref, sourceCaseId: ref })?.item.id ?? null,
    limit,
  });
}

/* ------------------------------------------------------------------ navigation */

export interface CasePoolBrowseRequest {
  filters: Partial<PoolFilters>;
  /** Why these cases are shown, e.g. "Recommended in My Roadmap: Market Sizing". */
  reason?: string;
}

const FILTER_KEYS = Object.keys(DEFAULT_POOL_FILTERS) as Array<keyof PoolFilters>;

function sanitizeFilters(value: unknown): Partial<PoolFilters> {
  const source = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const out: Partial<PoolFilters> = {};
  FILTER_KEYS.forEach((key) => {
    if (typeof source[key] === 'string') (out as Record<string, string>)[key] = source[key] as string;
  });
  return out;
}

export function readCasePoolBrowseRequest(stored: string | null | undefined): CasePoolBrowseRequest | null {
  const text = String(stored || '');
  if (!text.startsWith(CASE_POOL_BROWSE_PREFIX)) return null;
  try {
    const parsed = JSON.parse(text.slice(CASE_POOL_BROWSE_PREFIX.length));
    return { filters: sanitizeFilters(parsed?.filters), reason: typeof parsed?.reason === 'string' ? parsed.reason.slice(0, 200) : '' };
  } catch {
    return null;
  }
}

/** Opens the Case Pool library with these filters applied and shown. */
export function openCasePoolBrowse(request: CasePoolBrowseRequest): void {
  const payload = { filters: sanitizeFilters(request.filters), reason: request.reason || '' };
  try {
    sessionStorage.setItem(CASE_POOL_REQUEST_KEY, `${CASE_POOL_BROWSE_PREFIX}${JSON.stringify(payload)}`);
  } catch {
    // Case Pool still opens on its library.
  }
  // A case link left in the URL would reopen that case on refresh instead of this filtered list.
  if (casePoolCaseIdFromHash(window.location.hash)) {
    try {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${CASE_POOL_APP_ID}`);
    } catch {
      // The browse request above still wins over the old link.
    }
  }
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: CASE_POOL_APP_ID } }));
}

/** Opens one verified, selectable case directly (deep link #case-drill-log/case/<id>). */
export function openVerifiedPoolCase(caseId: string): boolean {
  if (!SELECTABLE_CASE_POOL_LIBRARY.some((item) => item.id === caseId)) return false;
  openCasePoolCase(caseId);
  return true;
}
