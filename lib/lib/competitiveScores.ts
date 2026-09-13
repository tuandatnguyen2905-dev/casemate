/**
 * competitiveScores.ts — Competitive Score (0–100) config for the
 * founder-verified MT/consulting programs: how DIFFICULT / COMPETITIVE each
 * program is to get into, independent of how well a candidate fits.
 *
 * ── EDIT SCORES HERE ────────────────────────────────────────────────────
 * This file is the SINGLE SOURCE OF TRUTH for competitive scores — they are
 * never hardcoded anywhere else. To adjust a program, edit its entry in
 * `COMPETITIVE_SCORES` below:
 *   - `score`  — the 0–100 headline number shown on the results card
 *   - `tier`   — its label band (see TIER_THRESHOLDS / TIER_LABELS_VI)
 *   - `pillars`— how the score decomposes:
 *       employerAttractiveness (max 30) · selectivity (max 35)
 *       screeningStringency (max 25)    · postProgramCareerValue (max 10)
 *
 * Keys are the canonical program score IDs. Some dataset IDs in
 * data/mt-programs.json carry a year/edition suffix (e.g.
 * `carlsberg-gtp-2026`) — PROGRAM_ID_ALIASES below maps those dataset IDs
 * onto the canonical keys, so a renamed edition keeps its score.
 *
 * A program with NO entry here (currently abbott-internship-2025) shows
 * "N/A" on the results card and is EXCLUDED from the appetite-based
 * reordering — never a guessed number, never a crash.
 *
 * The score never feeds the fit/match % itself. The DISPLAY ORDER of the
 * matched list, however, is tuned by the candidate's competitive appetite
 * (the “Competitive ambition” questionnaire section) — see
 * sortProgramsByAppetite at the bottom of this file.
 */

export type CompetitiveTier =
  | 'extreme'
  | 'very-high'
  | 'high'
  | 'medium-high'
  | 'medium'
  | 'moderate'
  | 'lower';

export interface CompetitiveScore {
  score: number; // 0–100
  tier: CompetitiveTier;
  pillars: {
    employerAttractiveness: number; // max 30
    selectivity: number; // max 35
    screeningStringency: number; // max 25
    postProgramCareerValue: number; // max 10
  };
}

/** Lower bound of each tier band — modify here to recalibrate globally. */
export const TIER_THRESHOLDS = {
  extreme: 85,
  'very-high': 75,
  high: 63,
  'medium-high': 55,
  medium: 47,
  moderate: 38,
  lower: 0,
};

export const COMPETITIVE_SCORES: Record<string, CompetitiveScore> = {
  'unilever-uflp':           { score: 87, tier: 'extreme',     pillars: { employerAttractiveness: 29, selectivity: 25, screeningStringency: 23, postProgramCareerValue: 10 } },
  'loreal-seedz':            { score: 79, tier: 'very-high',   pillars: { employerAttractiveness: 27, selectivity: 26, screeningStringency: 18, postProgramCareerValue: 8 } },
  'pg-leadgen':              { score: 77, tier: 'very-high',   pillars: { employerAttractiveness: 27, selectivity: 27, screeningStringency: 16, postProgramCareerValue: 7 } },
  'nestle-sparkmenext':      { score: 72, tier: 'high',        pillars: { employerAttractiveness: 25, selectivity: 22, screeningStringency: 17, postProgramCareerValue: 8 } },
  'deloitte-passport':       { score: 71, tier: 'high',        pillars: { employerAttractiveness: 22, selectivity: 24, screeningStringency: 18, postProgramCareerValue: 7 } },
  'abinbev-dreamship':       { score: 69, tier: 'high',        pillars: { employerAttractiveness: 22, selectivity: 22, screeningStringency: 18, postProgramCareerValue: 7 } },
  'ey-tax-internship':       { score: 67, tier: 'high',        pillars: { employerAttractiveness: 21, selectivity: 23, screeningStringency: 17, postProgramCareerValue: 6 } },
  'suntory-pepsico':         { score: 65, tier: 'high',        pillars: { employerAttractiveness: 20, selectivity: 21, screeningStringency: 17, postProgramCareerValue: 7 } },
  'techcombank-futuregen':   { score: 60, tier: 'medium-high', pillars: { employerAttractiveness: 18, selectivity: 20, screeningStringency: 16, postProgramCareerValue: 6 } },
  'momo-talent':             { score: 58, tier: 'medium-high', pillars: { employerAttractiveness: 17, selectivity: 19, screeningStringency: 16, postProgramCareerValue: 6 } },
  'shopee-gdp':              { score: 57, tier: 'medium-high', pillars: { employerAttractiveness: 18, selectivity: 18, screeningStringency: 15, postProgramCareerValue: 6 } },
  'carlsberg-gtp':           { score: 56, tier: 'medium-high', pillars: { employerAttractiveness: 16, selectivity: 18, screeningStringency: 16, postProgramCareerValue: 6 } },
  'vng-mt':                  { score: 53, tier: 'medium',      pillars: { employerAttractiveness: 15, selectivity: 18, screeningStringency: 14, postProgramCareerValue: 6 } },
  'viettel-changemakers':    { score: 51, tier: 'medium',      pillars: { employerAttractiveness: 14, selectivity: 18, screeningStringency: 14, postProgramCareerValue: 5 } },
  'uob-vietnam-ma':          { score: 51, tier: 'medium',      pillars: { employerAttractiveness: 14, selectivity: 17, screeningStringency: 15, postProgramCareerValue: 5 } },
  'vpbank-youngtalents':     { score: 49, tier: 'medium',      pillars: { employerAttractiveness: 13, selectivity: 17, screeningStringency: 14, postProgramCareerValue: 5 } },
  'central-retail-ma':       { score: 49, tier: 'medium',      pillars: { employerAttractiveness: 14, selectivity: 15, screeningStringency: 14, postProgramCareerValue: 6 } },
  'prudential-strivers':     { score: 47, tier: 'moderate',    pillars: { employerAttractiveness: 13, selectivity: 16, screeningStringency: 13, postProgramCareerValue: 5 } },
  'expeditors-mt':           { score: 43, tier: 'moderate',    pillars: { employerAttractiveness: 10, selectivity: 15, screeningStringency: 13, postProgramCareerValue: 5 } },
  'homecredit-homeracer':    { score: 41, tier: 'moderate',    pillars: { employerAttractiveness: 10, selectivity: 14, screeningStringency: 13, postProgramCareerValue: 4 } },
  'propertyguru-prodig':     { score: 39, tier: 'moderate',    pillars: { employerAttractiveness: 9,  selectivity: 13, screeningStringency: 13, postProgramCareerValue: 4 } },
  'avery-dennison-gold':     { score: 36, tier: 'lower',       pillars: { employerAttractiveness: 8,  selectivity: 12, screeningStringency: 12, postProgramCareerValue: 4 } },
};

/**
 * Pill label per tier band for the customer-facing results card; "Extreme" stays English on purpose — it reads as a
 * badge for the very top band (85+).
 */
export const TIER_LABELS_VI: Record<CompetitiveTier, string> = {
  extreme: 'Extreme',
  'very-high': 'Very High',
  high: 'High',
  'medium-high': 'Medium-High',
  medium: 'Medium',
  moderate: 'Moderate',
  lower: 'Low',
};

export function tierLabelVI(tier: CompetitiveTier): string {
  return TIER_LABELS_VI[tier] || TIER_LABELS_VI.medium;
}

/**
 * Progress-bar / badge background color for a competitive score — red →
 * green spectrum (hotter = harder to get in), one band per tier threshold.
 */
export function competitiveBarColor(score: number): string {
  if (score >= TIER_THRESHOLDS.extreme) return '#DC2626'; // red — Extreme
  if (score >= TIER_THRESHOLDS['very-high']) return '#EA580C'; // orange-red — Very High
  if (score >= TIER_THRESHOLDS.high) return '#F97316'; // orange — High
  if (score >= TIER_THRESHOLDS['medium-high']) return '#F59E0B'; // yellow-orange — Medium-High
  if (score >= TIER_THRESHOLDS.medium) return '#EAB308'; // yellow — Medium
  if (score >= TIER_THRESHOLDS.moderate) return '#84CC16'; // green-yellow — Moderate
  return '#22C55E'; // green — Low
}

/** Darker companion color for badge/label TEXT so it stays readable. */
export function competitiveTextColor(score: number): string {
  if (score >= TIER_THRESHOLDS.extreme) return '#991B1B';
  if (score >= TIER_THRESHOLDS['very-high']) return '#9A3412';
  if (score >= TIER_THRESHOLDS.high) return '#C2410C';
  if (score >= TIER_THRESHOLDS['medium-high']) return '#B45309';
  if (score >= TIER_THRESHOLDS.medium) return '#854D0E';
  if (score >= TIER_THRESHOLDS.moderate) return '#4D7C0F';
  return '#15803D';
}

/**
 * Quadrant read — fit × competition in one line. Auto-generated from both
 * scores: fit boundary at 70%, competition boundary at 55 (≤54 = wider door).
 */
export function getQuadrantLabel(
  fitScore: number,
  competitiveScore: number,
): {
  label: string;
  emoji: string;
  description: string;
} {
  const highFit = fitScore >= 70;
  const highCompetition = competitiveScore >= 55;

  if (highFit && !highCompetition)
    return { label: 'Sweet Spot', emoji: '🎯', description: 'strong fit with a wider door' };
  if (highFit && highCompetition)
    return { label: 'Stretch Target', emoji: '🔥', description: 'strong fit with a narrow door' };
  if (!highFit && !highCompetition)
    return { label: 'Reconsider', emoji: '⚠️', description: 'accessible, but your fit needs work' };
  return { label: 'Lower Priority', emoji: '❌', description: 'lower fit and high competition' };
}

// ─── Program-ID resolution (internal plumbing — no need to edit below) ────

/**
 * Dataset IDs (data/mt-programs.json `verified_programs[*].id`) → canonical
 * score keys above. Needed because dataset IDs carry year/edition suffixes.
 */
const PROGRAM_ID_ALIASES: Record<string, string> = {
  'suntory-pepsico-mt': 'suntory-pepsico',
  'carlsberg-gtp-2026': 'carlsberg-gtp',
  'central-retail-ma-2026': 'central-retail-ma',
  'abinbev-dreamship-2026': 'abinbev-dreamship',
  'homecredit-homeracer-2026': 'homecredit-homeracer',
  'shopee-monee-gdp': 'shopee-gdp',
  'nestle-sparkthenext-2026': 'nestle-sparkmenext',
  'momo-talent-2026': 'momo-talent',
  'techcombank-futuregen-2027': 'techcombank-futuregen',
  'viettel-future-changemakers': 'viettel-changemakers',
  'prudential-strivers-2025': 'prudential-strivers',
  'propertyguru-prodig-2025': 'propertyguru-prodig',
  'pg-leadgen-2026': 'pg-leadgen',
  'deloitte-passport-fy26': 'deloitte-passport',
  'ey-tax-internship-2027': 'ey-tax-internship',
};

/** Display names from data/mt-programs.json — keep in sync when a program is renamed there. */
const PROGRAM_NAMES: Record<string, { company: string; program: string }> = {
  'unilever-uflp': { company: 'Unilever Vietnam', program: 'Unilever Future Leaders Programme (UFLP)' },
  'loreal-seedz': { company: "L'Oréal Vietnam", program: "L'Oréal SEEDZ (Management Trainee)" },
  'suntory-pepsico-mt': { company: 'Suntory PepsiCo Vietnam', program: 'Suntory PepsiCo Management Trainee' },
  'carlsberg-gtp-2026': { company: 'Carlsberg Vietnam', program: 'Carlsberg Asia Graduate Trainee Programme (GTP) 2026' },
  'central-retail-ma-2026': { company: 'Central Retail Vietnam', program: 'Central Retail Management Associate (MA) 2026' },
  'abinbev-dreamship-2026': { company: 'AB InBev Vietnam', program: 'AB InBev Dreamship Internship 2026' },
  'homecredit-homeracer-2026': { company: 'Home Credit Vietnam', program: 'Home Credit Home Racer 2026' },
  'shopee-monee-gdp': { company: 'Shopee & Monee (SeaMoney)', program: 'Shopee & Monee (SeaMoney) Global Development Program (GDP)' },
  'nestle-sparkthenext-2026': { company: 'Nestlé Vietnam', program: 'Nestlé #SparkTheNext Leaders Management Trainee 2026' },
  'momo-talent-2026': { company: 'MoMo', program: 'MoMo Talent 2026' },
  'techcombank-futuregen-2027': { company: 'Techcombank', program: 'Techcombank Future Gen 2027' },
  'viettel-future-changemakers': { company: 'Viettel', program: 'Viettel Future Changemakers' },
  'uob-vietnam-ma': { company: 'UOB Vietnam', program: 'UOB Vietnam Management Associate' },
  'prudential-strivers-2025': { company: 'Prudential Vietnam', program: 'Prudential The Strivers 2025' },
  'expeditors-mt': { company: 'Expeditors Vietnam', program: 'Expeditors Management Trainee' },
  'propertyguru-prodig-2025': { company: 'PropertyGuru Vietnam', program: 'PropertyGuru Prodi-G Internship 2025' },
  'pg-leadgen-2026': { company: 'P&G Vietnam', program: 'P&G LEAD GEN 2026 (Internship)' },
  'deloitte-passport-fy26': { company: 'Deloitte Vietnam', program: 'Deloitte Passport FY26 (Internship)' },
  'ey-tax-internship-2027': { company: 'EY Vietnam', program: 'EY Tax Services Internship 2027' },
  'abbott-internship-2025': { company: 'Abbott Vietnam', program: 'Abbott Internship Program 2025' },
};

function nameKey(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** A competitive score resolved for display. */
export interface ResolvedCompetitiveScore {
  score: number;
  tier: CompetitiveTier;
  pillars: CompetitiveScore['pillars'];
}

/** Score entry by program ID (dataset ID or canonical key) — null = N/A. */
export function getCompetitiveScoreById(programId: string): ResolvedCompetitiveScore | null {
  const entry = COMPETITIVE_SCORES[programId] || COMPETITIVE_SCORES[PROGRAM_ID_ALIASES[programId]];
  return entry ? { score: entry.score, tier: entry.tier, pillars: entry.pillars } : null;
}

/**
 * Resolve the competitive score for a program shown on the direction card.
 * The card's program rows carry display names (company + program), not
 * dataset IDs, so the lookup resolves names → ID with the same
 * normalized-name matching the deadline countdown already uses
 * (lib/programTimelines.findProgramTimeline). NEVER throws. Returns null
 * when the program has no entry — the card shows "N/A" and the program is
 * excluded from appetite-based reordering.
 */
export function findCompetitiveScore(company: string, program: string): ResolvedCompetitiveScore | null {
  const wantedProgram = nameKey(program);
  const wantedCompany = nameKey(company);
  let matchedId: string | null = null;
  if (wantedProgram) {
    for (const id of Object.keys(PROGRAM_NAMES)) {
      if (nameKey(PROGRAM_NAMES[id].program) === wantedProgram) {
        matchedId = id;
        break;
      }
    }
  }
  if (!matchedId && wantedCompany) {
    for (const id of Object.keys(PROGRAM_NAMES)) {
      if (nameKey(PROGRAM_NAMES[id].company) === wantedCompany) {
        matchedId = id;
        break;
      }
    }
  }
  return matchedId ? getCompetitiveScoreById(matchedId) : null;
}

// ─── Competitive ambition ───────────────────
//
// Six single-select MCQs appended to the questionnaire as its own section.
// Total raw score 0–12 → an appetite mode that tunes the ORDER the matched
// programs are displayed in (never the fit % itself). Skipped (or
// incomplete) → 'balanced'.

export type CompetitiveAppetite = 'pragmatic' | 'balanced' | 'ambitious';

export interface AppetiteOption {
  label: string;
  value: 0 | 1 | 2;
}

export interface AppetiteQuestion {
  id: string;
  question: string;
  options: AppetiteOption[];
}

export const APPETITE_QUESTIONS: AppetiteQuestion[] = [
  {
    id: 'appetite_gpa',
    question: 'What is your current GPA?',
    options: [
      { label: '≥ 3.5/4 or ≥ 8.7/10', value: 2 },
      { label: '3.2–3.5 / 8.0–8.7', value: 1 },
      { label: 'Below 3.2 / 8.0', value: 0 },
    ],
  },
  {
    id: 'appetite_english',
    question: 'How confident are you in English?',
    options: [
      { label: 'Confident communicating and working entirely in English', value: 2 },
      { label: 'Strong reading skills, but limited speaking confidence / TOEIC 550–700', value: 1 },
      { label: 'Still improving — TOEIC below 550', value: 0 },
    ],
  },
  {
    id: 'appetite_competition',
    question: 'Have you joined a business or case competition?',
    options: [
      { label: 'Yes — I reached a final or won an award', value: 2 },
      { label: 'Yes, but without a standout result yet', value: 1 },
      { label: 'Not yet', value: 0 },
    ],
  },
  {
    id: 'appetite_timeline',
    question: 'How long until you want to start applying?',
    options: [
      { label: 'More than 1 year — I am building my profile from the ground up', value: 2 },
      { label: '6–12 months — I am preparing actively', value: 1 },
      { label: 'Under 6 months — I need programs I can apply to soon', value: 0 },
    ],
  },
  {
    id: 'appetite_prep',
    question: 'How much time are you ready to invest in selection-round preparation?',
    options: [
      { label: '3–6 months of structured prep (aptitude tests, cases, group exercises)', value: 2 },
      { label: '1–3 months of moderate preparation', value: 1 },
      { label: 'I want to apply with my current profile', value: 0 },
    ],
  },
  {
    id: 'appetite_risk',
    question: 'If you had to choose:',
    options: [
      { label: 'A top-prestige program with ~5% odds — difficult, but extremely valuable if I get in', value: 2 },
      { label: 'A strong program with 20–30% odds — a good, realistic fit', value: 1 },
      { label: 'A more accessible program with >40% odds — a safer place to start', value: 0 },
    ],
  },
];

/** Total raw score (0–12) → appetite mode. */
export function scoreCompetitiveAppetite(totalRaw: number): CompetitiveAppetite {
  if (totalRaw >= 9) return 'ambitious';
  if (totalRaw >= 5) return 'balanced';
  return 'pragmatic';
}

export const APPETITE_LABELS_VI: Record<CompetitiveAppetite, string> = {
  ambitious: 'Ambitious',
  balanced: 'Balanced',
  pragmatic: 'Pragmatic',
};

/** Personalized one-liner shown above the matched-program list. */
export const APPETITE_SUMMARY_VI: Record<CompetitiveAppetite, string> = {
  ambitious:
    'Your current profile points toward highly competitive programs. Prepare thoroughly for aptitude tests and case rounds.',
  balanced: 'Your results balance personal fit with realistic odds.',
  pragmatic:
    'Your results prioritize strong-fit programs with a wider path in, aligned with your timeline.',
};

/** Payload saved per user (culture_fit_results row, kind='appetite'). */
export interface AppetitePayload {
  version: number;
  answers: Record<string, number>; // question id → selected value (0/1/2)
  total: number; // 0–12
  mode: CompetitiveAppetite;
  skipped: boolean; // true when the section was skipped/incomplete → 'balanced'
  computed_at: string;
}

/**
 * Appetite-aware display reorder — applied AFTER fit scoring and sector
 * filtering, to the ranked (non-pinned) programs only:
 *   - ambitious: fit DESC; among equal fits, HIGHER competitive score first
 *   - balanced:  fit DESC; competitive score as secondary sort among equal
 *                fits, but only when the two scores are within ±10 of each
 *                other — a far harder program never jumps ahead
 *   - pragmatic: fit DESC; among equal fits, LOWER competitive score first
 * Programs with no competitive score (N/A) keep their original relative
 * position — they are excluded from the reorder logic. Fit order itself is
 * NEVER violated: this only breaks ties.
 */
export function sortProgramsByAppetite<T>(
  programs: T[],
  appetite: CompetitiveAppetite,
  getFit: (p: T) => number,
  getCompetitive: (p: T) => number | null,
): T[] {
  const rows = programs.map((p, idx) => ({
    p,
    idx,
    fit: Number(getFit(p)) || 0,
    comp: getCompetitive(p),
  }));
  rows.sort((a, b) => {
    if (b.fit !== a.fit) return b.fit - a.fit;
    if (a.comp == null || b.comp == null) return a.idx - b.idx; // N/A → keep original order
    if (appetite === 'ambitious') return b.comp !== a.comp ? b.comp - a.comp : a.idx - b.idx;
    if (appetite === 'pragmatic') return a.comp !== b.comp ? a.comp - b.comp : a.idx - b.idx;
    // balanced — secondary sort only within a ±10 competitive range
    if (Math.abs(a.comp - b.comp) <= 10 && a.comp !== b.comp) return b.comp - a.comp;
    return a.idx - b.idx;
  });
  return rows.map((r) => r.p);
}
