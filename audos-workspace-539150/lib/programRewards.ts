/**
 * programRewards.ts — per-program "Đãi ngộ & lộ trình phát triển" (rewards &
 * development path) facts for the direction card's matched-program rows.
 *
 * WHY THIS EXISTS (2026-08 corporate-fit model review): VN evidence (Hanoi
 * 2022 employer-brand study) puts đãi ngộ (14.6%) and career development
 * (14.2%) ahead of culture (10.6%) for application intention — so the program
 * row leads with rewards/development info and shows the culture-fit % as a
 * supporting 'Hợp văn hoá' signal inside the same block, never alone.
 *
 * SOURCE OF TRUTH: data/mt-programs.json (the founder-verified dataset). The
 * space compiler cannot import JSON data files at runtime, so — exactly like
 * lib/programTimelines.ts — the verified `duration` field is mirrored here as
 * `developmentPath`. When the founder verifies new program data, update BOTH
 * data/mt-programs.json and PROGRAM_REWARDS below.
 *
 * HARD RULE (founder-locked): NEVER invent a salary, allowance, or benefits
 * figure. `compensation` stays null until the founder verifies concrete
 * compensation/benefits data for a program — the UI then renders an honest
 * "being verified" line. Programs with no verified fields at all are simply
 * absent (lookup returns null → the whole block falls back honestly).
 */

export interface ProgramRewardsRecord {
  id: string;
  company: string;
  program: string;
  /** Verified development-path summary (program length / rotations / track), mirrored from the dataset's `duration`. */
  developmentPath: string | null;
  /** Verified compensation & benefits summary. null = not founder-verified yet — NEVER guessed. */
  compensation: string | null;
}

export const PROGRAM_REWARDS: ProgramRewardsRecord[] = [
  {
    id: 'unilever-uflp',
    company: 'Unilever Vietnam',
    program: 'Unilever Future Leaders Programme (UFLP)',
    developmentPath: '2 years to Manager',
    compensation: null,
  },
  {
    id: 'loreal-seedz',
    company: 'L\'Oréal Vietnam',
    program: 'L\'Oréal SEEDZ (Management Trainee)',
    developmentPath: '18 months',
    compensation: null,
  },
  {
    id: 'suntory-pepsico-mt',
    company: 'Suntory PepsiCo Vietnam',
    program: 'Suntory PepsiCo Management Trainee',
    developmentPath: '36 months (first 18mo cross-functional rotations ~3mo each; final 18mo home-function specialization)',
    compensation: null,
  },
  {
    id: 'carlsberg-gtp-2026',
    company: 'Carlsberg Vietnam',
    program: 'Carlsberg Asia Graduate Trainee Programme (GTP) 2026',
    developmentPath: '2 years',
    compensation: null,
  },
  {
    id: 'central-retail-ma-2026',
    company: 'Central Retail Vietnam',
    program: 'Central Retail Management Associate (MA) 2026',
    developmentPath: '2 years, incl. a 6-month international assignment in Thailand',
    compensation: null,
  },
  {
    id: 'abinbev-dreamship-2026',
    company: 'AB InBev Vietnam',
    program: 'AB InBev Dreamship Internship 2026',
    developmentPath: '6 months (through March 2027)',
    compensation: null,
  },
  {
    id: 'homecredit-homeracer-2026',
    company: 'Home Credit Vietnam',
    program: 'Home Credit Home Racer 2026',
    developmentPath: '6 months',
    compensation: null,
  },
  {
    id: 'shopee-monee-gdp',
    company: 'Shopee & Monee (SeaMoney)',
    program: 'Shopee & Monee (SeaMoney) Global Development Program (GDP)',
    developmentPath: '2 years — 4 rotations of 6 months each; Vietnam Management Associate track (formerly GDP) or Global Management Associate track (starts in Singapore)',
    compensation: null,
  },
  {
    id: 'nestle-sparkthenext-2026',
    company: 'Nestlé Vietnam',
    program: 'Nestlé #SparkTheNext Leaders Management Trainee 2026',
    developmentPath: 'Fast-track development programme; start full-time May 2026',
    compensation: null,
  },
  {
    id: 'momo-talent-2026',
    company: 'MoMo',
    program: 'MoMo Talent 2026',
    developmentPath: '8 months',
    compensation: null,
  },
  {
    id: 'viettel-future-changemakers',
    company: 'Viettel',
    program: 'Viettel Future Changemakers',
    developmentPath: '9 months (2 phases: 3-month centralized bootcamp/rotation + 6-month project placement)',
    compensation: null,
  },
  {
    id: 'prudential-strivers-2025',
    company: 'Prudential Vietnam',
    program: 'Prudential The Strivers 2025',
    developmentPath: 'Fast-track to manager in 2.5 years (Management Trainee & HR Functional Trainee) or 4–4.5 years (Actuarial Functional Trainee)',
    compensation: null,
  },
  {
    id: 'expeditors-mt',
    company: 'Expeditors Vietnam',
    program: 'Expeditors Management Trainee',
    developmentPath: '1 year, rotating across Expeditors\' systems, products and services company-wide',
    compensation: null,
  },
  {
    id: 'propertyguru-prodig-2025',
    company: 'PropertyGuru Vietnam',
    program: 'PropertyGuru Prodi-G Internship 2025',
    developmentPath: '12 weeks',
    compensation: null,
  },
  {
    id: 'pg-leadgen-2026',
    company: 'P&G Vietnam',
    program: 'P&G LEAD GEN 2026 (Internship)',
    developmentPath: '6 months',
    compensation: null,
  },
  {
    id: 'ey-tax-internship-2027',
    company: 'EY Vietnam',
    program: 'EY Tax Services Internship 2027',
    developmentPath: '3–4 months, from November/December 2026',
    compensation: null,
  },
];

function rewardsKey(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Find the verified rewards/development record for a program shown on the
 * direction card. Same normalized-name matching as findProgramTimeline:
 * program name is exact (both come from the founder dataset), company is the
 * fallback. Returns null when nothing is verified (honest fallback).
 */
export function findProgramRewards(company: string, program: string): ProgramRewardsRecord | null {
  const wantedProgram = rewardsKey(program);
  const wantedCompany = rewardsKey(company);
  if (wantedProgram) {
    const byProgram = PROGRAM_REWARDS.find((r) => rewardsKey(r.program) === wantedProgram);
    if (byProgram) return byProgram;
  }
  if (wantedCompany) {
    const byCompany = PROGRAM_REWARDS.find((r) => rewardsKey(r.company) === wantedCompany);
    if (byCompany) return byCompany;
  }
  return null;
}
