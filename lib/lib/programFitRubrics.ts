// Casemate — program fit rubrics ("ideal candidate profile" per program).
//
// Implements the core upgrade recommended in data/job-fit-model-review.md
// (job-fit model review for the Vietnamese market, 2026-08): every founder-
// verified program is encoded as a STRUCTURED RUBRIC — 6–8 weighted criteria
// (weights sum to 100), each with three level descriptors
// (not met / met / standout) — plus a short "hypothetical ideal candidate
// resume" paragraph (the HyRe technique from CONFIT v2). The scoring hook
// grades each criterion against the CV + gap answers WITH mandatory verbatim
// CV evidence and computes the program match % as the weighted sum, so match
// scores are stable across runs, comparable across candidates, and fully
// evidence-backed. The LLM never invents criteria per session.
//
// STORAGE: WorkspaceDB table `program_fit_rubrics` — one row per program per
// rubric VERSION; the NEWEST active row per program_id wins. Rows seeded from
// this module are founder-supplied and locked (verified=true, source='founder').
// A verified row must NEVER be overwritten: to change one, insert a new row
// with version+1 (same founder-moat mechanism as industry_brief_overrides and
// culture_company_profiles).
//
// FALLBACK GUARANTEE (no regression): a program with no active rubric row
// keeps the current free-form matching path — the rubric layer only ADDS
// structure where a rubric exists.
//
// Existing program ids retain their data/mt-programs.json values; workbook-only
// programs use stable slugs derived from Corporation + Program.

import rubricPart01 from '../data/program-fit-rubrics-01.json';
import rubricPart02 from '../data/program-fit-rubrics-02.json';
import rubricPart03 from '../data/program-fit-rubrics-03.json';
import rubricPart04 from '../data/program-fit-rubrics-04.json';
import rubricPart05 from '../data/program-fit-rubrics-05.json';
import rubricPart06 from '../data/program-fit-rubrics-06.json';
import rubricPart07 from '../data/program-fit-rubrics-07.json';
import rubricPart08 from '../data/program-fit-rubrics-08.json';
import rubricPart09 from '../data/program-fit-rubrics-09.json';
import rubricPart10 from '../data/program-fit-rubrics-10.json';
import rubricPart11a from '../data/program-fit-rubrics-11a.json';
import rubricPart11b from '../data/program-fit-rubrics-11b.json';
import rubricPart11c from '../data/program-fit-rubrics-11c.json';
import rubricPart12a from '../data/program-fit-rubrics-12a.json';
import rubricPart12b from '../data/program-fit-rubrics-12b.json';
import rubricPart12c from '../data/program-fit-rubrics-12c.json';
import rubricPart13a from '../data/program-fit-rubrics-13a.json';
import rubricPart13b from '../data/program-fit-rubrics-13b.json';
import rubricPart13c from '../data/program-fit-rubrics-13c.json';
import rubricPart14a from '../data/program-fit-rubrics-14a.json';
import rubricPart14b from '../data/program-fit-rubrics-14b.json';
import rubricPart14c from '../data/program-fit-rubrics-14c.json';
import rubricPart15a from '../data/program-fit-rubrics-15a.json';
import rubricPart15b from '../data/program-fit-rubrics-15b.json';
import rubricPart15c from '../data/program-fit-rubrics-15c.json';
import rubricPart16a from '../data/program-fit-rubrics-16a.json';
import rubricPart16b from '../data/program-fit-rubrics-16b.json';
import rubricPart16c from '../data/program-fit-rubrics-16c.json';
import rubricPart17a from '../data/program-fit-rubrics-17a.json';
import rubricPart17b from '../data/program-fit-rubrics-17b.json';
import rubricPart17c from '../data/program-fit-rubrics-17c.json';
import rubricPart18a from '../data/program-fit-rubrics-18a.json';
import rubricPart18b from '../data/program-fit-rubrics-18b.json';
import rubricPart18c from '../data/program-fit-rubrics-18c.json';
import rubricPart19a from '../data/program-fit-rubrics-19a.json';
import rubricPart19b from '../data/program-fit-rubrics-19b.json';
import { classifyProgramCompany, type ProgramIndustryId } from './programIndustries';

export const RUBRIC_TABLE = 'program_fit_rubrics';

export type RubricLevelId = 'chua_dat' | 'dat' | 'noi_bat';

export const RUBRIC_LEVEL_LABELS_VI: Record<RubricLevelId, string> = {
  chua_dat: 'Not Met',
  dat: 'Met',
  noi_bat: 'Standout',
};

// Score band per level. The hook assigns a level per criterion plus a fine
// score inside that level's band; match % = Σ weight_i × score_i / 100.
// Out-of-band scores are clamped; a missing score uses the band midpoint.
export const RUBRIC_LEVEL_BANDS: Record<RubricLevelId, { min: number; max: number; mid: number }> = {
  chua_dat: { min: 0, max: 45, mid: 30 },
  dat: { min: 50, max: 80, mid: 65 },
  noi_bat: { min: 85, max: 100, mid: 92 },
};

export interface RubricCriterionLevels {
  chua_dat: string;
  dat: string;
  noi_bat: string;
}

export interface RubricCriterion {
  id: string;
  label_vi: string;
  label_en: string;
  /** 0–100; all weights in a rubric sum to exactly 100. */
  weight: number;
  levels: RubricCriterionLevels;
}

export interface ProgramFitRubric {
  program_id: string;
  program_name: string;
  company: string;
  program: string;
  industry: ProgramIndustryId;
  criteria: RubricCriterion[];
  /** Hypothetical ideal candidate resume paragraph (CONFIT v2 HyRe). */
  ideal_profile_text: string;
  /** Founder-supplied anonymized real-admit profile — null until provided. */
  example_admit_profile: string | null;
  version: number;
}

/* ----------------------------------------------------------------------------
 * Founder workbook database
 *
 * The source import is documented by data/program-fit-rubrics-manifest.json
 * and partitioned into adjacent JSON files. This module remains the stable
 * parser, resolver, seeding, and scoring contract while founder-owned data can
 * be replaced without changing matching behavior.
 * --------------------------------------------------------------------------*/

/** Every program record present in the founder-provided workbook. */
const RAW_PROGRAM_FIT_RUBRIC_DRAFTS: ProgramFitRubric[] = [
  ...(rubricPart01 as ProgramFitRubric[]),
  ...(rubricPart02 as ProgramFitRubric[]),
  ...(rubricPart03 as ProgramFitRubric[]),
  ...(rubricPart04 as ProgramFitRubric[]),
  ...(rubricPart05 as ProgramFitRubric[]),
  ...(rubricPart06 as ProgramFitRubric[]),
  ...(rubricPart07 as ProgramFitRubric[]),
  ...(rubricPart08 as ProgramFitRubric[]),
  ...(rubricPart09 as ProgramFitRubric[]),
  ...(rubricPart10 as ProgramFitRubric[]),
  ...(rubricPart11a as ProgramFitRubric[]),
  ...(rubricPart11b as ProgramFitRubric[]),
  ...(rubricPart11c as ProgramFitRubric[]),
  ...(rubricPart12a as ProgramFitRubric[]),
  ...(rubricPart12b as ProgramFitRubric[]),
  ...(rubricPart12c as ProgramFitRubric[]),
  ...(rubricPart13a as ProgramFitRubric[]),
  ...(rubricPart13b as ProgramFitRubric[]),
  ...(rubricPart13c as ProgramFitRubric[]),
  ...(rubricPart14a as ProgramFitRubric[]),
  ...(rubricPart14b as ProgramFitRubric[]),
  ...(rubricPart14c as ProgramFitRubric[]),
  ...(rubricPart15a as ProgramFitRubric[]),
  ...(rubricPart15b as ProgramFitRubric[]),
  ...(rubricPart15c as ProgramFitRubric[]),
  ...(rubricPart16a as ProgramFitRubric[]),
  ...(rubricPart16b as ProgramFitRubric[]),
  ...(rubricPart16c as ProgramFitRubric[]),
  ...(rubricPart17a as ProgramFitRubric[]),
  ...(rubricPart17b as ProgramFitRubric[]),
  ...(rubricPart17c as ProgramFitRubric[]),
  ...(rubricPart18a as ProgramFitRubric[]),
  ...(rubricPart18b as ProgramFitRubric[]),
  ...(rubricPart18c as ProgramFitRubric[]),
  ...(rubricPart19a as ProgramFitRubric[]),
  ...(rubricPart19b as ProgramFitRubric[]),
];

/**
 * Industry is attached at the canonical rubric projection so every one of the
 * 66 records has the same taxonomy field before it reaches scoring or UI.
 */
export const PROGRAM_FIT_RUBRIC_DRAFTS: ProgramFitRubric[] = RAW_PROGRAM_FIT_RUBRIC_DRAFTS.map((draft) => ({
  ...draft,
  industry: classifyProgramCompany(draft.company),
}));

export const UNMATCHED_PROGRAM_COMPANIES = Array.from(new Set(
  PROGRAM_FIT_RUBRIC_DRAFTS.filter((draft) => draft.industry === 'other').map((draft) => draft.company),
)).sort();

if (UNMATCHED_PROGRAM_COMPANIES.length > 0) {
  console.warn('[Casemate] Program companies assigned to industry="other":', UNMATCHED_PROGRAM_COMPANIES);
}

/* ----------------------------------------------------------------------------
 * Name matching (saved results carry company/program names, not ids)
 * --------------------------------------------------------------------------*/

function rubricKey(value: string): string {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Resolve a direction-card program (by names) to its rubric program_id. */
export function resolveRubricProgramId(company: string, program: string): string | null {
  const wantedProgram = rubricKey(program);
  const wantedCompany = rubricKey(company);
  if (wantedProgram) {
    const byProgram = PROGRAM_FIT_RUBRIC_DRAFTS.find((r) => rubricKey(r.program) === wantedProgram);
    if (byProgram) return byProgram.program_id;
  }
  if (wantedCompany) {
    const byCompany = PROGRAM_FIT_RUBRIC_DRAFTS.find((r) => rubricKey(r.company) === wantedCompany);
    if (byCompany) return byCompany.program_id;
  }
  return null;
}

export function findDraftRubric(programId: string): ProgramFitRubric | null {
  return PROGRAM_FIT_RUBRIC_DRAFTS.find((r) => r.program_id === programId) || null;
}

/* ----------------------------------------------------------------------------
 * WorkspaceDB rows: parsing + newest-active-wins selection
 * --------------------------------------------------------------------------*/

export interface ProgramFitRubricRow extends ProgramFitRubric {
  row_id: number;
  verified: boolean;
  active: boolean;
  source: string;
}

function parseCriteria(value: unknown): RubricCriterion[] {
  let parsed: any = value;
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch (e) {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((c: any) => c && typeof c === 'object' && typeof c.id === 'string' && c.levels && typeof c.levels === 'object')
    .map((c: any) => ({
      id: String(c.id),
      label_vi: String(c.label_vi || c.id),
      label_en: String(c.label_en || c.label_vi || c.id),
      weight: Math.max(0, Math.min(100, Number(c.weight) || 0)),
      levels: {
        chua_dat: String(c.levels.chua_dat || ''),
        dat: String(c.levels.dat || ''),
        noi_bat: String(c.levels.noi_bat || ''),
      },
    }));
}

export function parseRubricRow(row: any): ProgramFitRubricRow | null {
  if (!row || typeof row !== 'object') return null;
  const programId = String(row.program_id || '');
  const criteria = parseCriteria(row.criteria_json);
  if (!programId || criteria.length === 0) return null;
  const draft = findDraftRubric(programId);
  return {
    row_id: Number(row.id) || 0,
    program_id: programId,
    program_name: String(row.program_name || (draft ? draft.program_name : programId)),
    company: draft ? draft.company : String(row.program_name || '').split(' — ')[0] || programId,
    program: draft ? draft.program : String(row.program_name || programId),
    industry: (row.industry || (draft ? draft.industry : classifyProgramCompany(String(row.program_name || '').split(' — ')[0] || programId))) as ProgramIndustryId,
    criteria,
    ideal_profile_text: String(row.ideal_profile_text || ''),
    example_admit_profile: row.example_admit_profile ? String(row.example_admit_profile) : null,
    version: Number(row.version) || 1,
    verified: row.verified === true,
    active: row.active !== false,
    source: String(row.source || 'llm_draft'),
  };
}

/**
 * Newest ACTIVE rubric per program: highest version wins, then highest row id.
 * Verified rows beat draft rows at the same version (founder lock respected).
 */
export function selectActiveRubrics(rows: any[]): Map<string, ProgramFitRubricRow> {
  const byProgram = new Map<string, ProgramFitRubricRow>();
  for (const raw of rows || []) {
    const rubric = parseRubricRow(raw);
    if (!rubric || !rubric.active) continue;
    const current = byProgram.get(rubric.program_id);
    if (
      !current ||
      rubric.version > current.version ||
      (rubric.version === current.version && rubric.verified && !current.verified) ||
      (rubric.version === current.version && rubric.verified === current.verified && rubric.row_id > current.row_id)
    ) {
      byProgram.set(rubric.program_id, rubric);
    }
  }
  return byProgram;
}

/** Active rubric for a direction-card program (by names), or null. */
export function findActiveRubricForProgram(rows: any[], company: string, program: string): ProgramFitRubricRow | null {
  const programId = resolveRubricProgramId(company, program || company);
  if (!programId) return null;
  return selectActiveRubrics(rows).get(programId) || null;
}

/* ----------------------------------------------------------------------------
 * Runtime seeding — founder workbook rubrics for programs with no row yet.
 *
 * Runs opportunistically from the space UI (ProgramGuidePanel / direction
 * card). Inserts ONLY missing program_ids with verified=true — it can never
 * touch an existing row, so a founder-locked rubric is never overwritten.
 * Duplicate seeds from a rare concurrent first-visit race are harmless: the
 * newest-active-wins selection collapses them deterministically.
 * --------------------------------------------------------------------------*/

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

let seedAttempt: Promise<boolean> | null = null;

/**
 * Ensure every workbook program has at least one founder rubric row. Safe to call
 * from any surface; runs at most once per page load and never throws.
 * Returns true when the table is fully seeded (or already was).
 */
export function ensureProgramFitRubricSeeds(): Promise<boolean> {
  if (!seedAttempt) {
    seedAttempt = seedMissingDrafts().catch(() => {
      seedAttempt = null; // allow a retry on the next call after a failure
      return false;
    });
  }
  return seedAttempt;
}

async function seedMissingDrafts(): Promise<boolean> {
  const db = typeof window !== 'undefined' ? (window as any).__workspaceDb : null;
  if (!db?.from) return false;
  const res = await db.from(RUBRIC_TABLE, { shared: true }).limit(500).get();
  const existingRows = rowsOf(res);
  const existing = new Set(existingRows.map((row: any) => String(row.program_id || '')));
  const missing = PROGRAM_FIT_RUBRIC_DRAFTS.filter((draft) => !existing.has(draft.program_id));
  let allOk = true;
  for (const draft of missing) {
    try {
      await db.from(RUBRIC_TABLE).insert({
        program_id: draft.program_id,
        program_name: draft.program_name,
        industry: draft.industry,
        criteria_json: draft.criteria,
        ideal_profile_text: draft.ideal_profile_text,
        example_admit_profile: null,
        verified: true,
        active: true,
        version: draft.version,
        source: 'founder',
      });
    } catch (e) {
      // Insert can fail for unauthenticated sessions or a concurrent seeder —
      // seedAttempt resets on failure so a later authenticated visit retries.
      allOk = false;
    }
  }

  // Additive taxonomy migration for rows that predate the industry column.
  // Verified rubric content is untouched; only the new classification field is set.
  for (const row of existingRows.filter((item: any) => !item.industry)) {
    const draft = findDraftRubric(String(row.program_id || ''));
    const company = draft?.company || String(row.program_name || '').split(' — ')[0];
    try {
      await db.from(RUBRIC_TABLE, { shared: true }).update(Number(row.id), {
        industry: draft?.industry || classifyProgramCompany(company),
      });
    } catch (e) {
      allOk = false;
    }
  }
  return allOk;
}

/* ----------------------------------------------------------------------------
 * Rubric breakdown (scoring-hook output inside assessment_results
 * result_json.program_guides[i].rubric_breakdown) — panel-side normalization
 * --------------------------------------------------------------------------*/

export interface RubricCriterionScore {
  id: string;
  label_vi?: string;
  label_en?: string;
  weight: number;
  level: RubricLevelId;
  /** 0–100 inside the level's band. */
  score: number;
  /** Verbatim quote from the CV / gap answers, or null when nothing exists. */
  evidence: string | null;
  /** False when the hook could not verify the quote verbatim in the source. */
  evidence_verified?: boolean;
  /** What to improve to reach the next level (drives the personal plan). */
  improve?: string | null;
}

export interface RubricBreakdown {
  program_id: string;
  rubric_version: number;
  rubric_verified: boolean;
  criteria: RubricCriterionScore[];
  /** Σ weight_i × score_i / 100, rounded — this IS the program match %. */
  weighted_match_percent: number;
}

function normalizeLevel(value: unknown): RubricLevelId | null {
  const v = String(value || '').toLowerCase();
  if (v === 'chua_dat' || v === 'dat' || v === 'noi_bat') return v;
  return null;
}

export function clampScoreToLevel(level: RubricLevelId, score: number): number {
  const band = RUBRIC_LEVEL_BANDS[level];
  if (!Number.isFinite(score)) return band.mid;
  return Math.max(band.min, Math.min(band.max, Math.round(score)));
}

/** Weighted rubric match % — the single formula shared by hook and UI. */
export function weightedRubricPercent(criteria: Array<{ weight: number; score: number }>): number {
  const totalWeight = criteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
  if (totalWeight <= 0) return 0;
  const weighted = criteria.reduce((sum, c) => sum + (Number(c.weight) || 0) * (Number(c.score) || 0), 0);
  return Math.max(0, Math.min(100, Math.round(weighted / totalWeight)));
}

export function normalizeRubricBreakdown(value: unknown): RubricBreakdown | null {
  let parsed: any = value;
  if (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch (e) {
      return null;
    }
  }
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.criteria)) return null;
  const criteria: RubricCriterionScore[] = [];
  for (const c of parsed.criteria) {
    if (!c || typeof c !== 'object') continue;
    const level = normalizeLevel(c.level);
    if (!level) continue;
    criteria.push({
      id: String(c.id || ''),
      label_vi: c.label_vi ? String(c.label_vi) : undefined,
      label_en: c.label_en ? String(c.label_en) : undefined,
      weight: Math.max(0, Math.min(100, Number(c.weight) || 0)),
      level,
      score: clampScoreToLevel(level, Number(c.score)),
      evidence: typeof c.evidence === 'string' && c.evidence.trim() ? c.evidence.trim() : null,
      evidence_verified: c.evidence_verified !== false,
      improve: typeof c.improve === 'string' && c.improve.trim() ? c.improve.trim() : null,
    });
  }
  if (criteria.length === 0) return null;
  const computed = weightedRubricPercent(criteria);
  const reported = Number(parsed.weighted_match_percent);
  return {
    program_id: String(parsed.program_id || ''),
    rubric_version: Number(parsed.rubric_version) || 1,
    rubric_verified: parsed.rubric_verified === true,
    criteria,
    weighted_match_percent: Number.isFinite(reported) ? Math.max(0, Math.min(100, Math.round(reported))) : computed,
  };
}
