/**
 * programTimelines.ts — structured application-timeline data for the
 * founder-verified MT/consulting program records, plus the render-time
 * date math for the "X days left" deadline countdown.
 *
 * SOURCE OF TRUTH: data/mt-programs.json (the founder-verified dataset the
 * scoring hook and Mate both read). This module is its client-side
 * projection — the space compiler cannot import JSON data files at runtime,
 * so the structured `application_window` / `rounds_detail` fields are
 * mirrored here. When the founder verifies new timeline data, update BOTH
 * data/mt-programs.json and PROGRAM_TIMELINES below.
 *
 * HARD RULE (founder-locked): never invent or infer a date. `closeDate` /
 * `openDate` stay null until the founder verifies a concrete current-cycle
 * date; estimated month-level windows from past cycles live in the *Text
 * fields and are always labelled "estimated". The countdown only ever runs
 * off a concrete, founder-verified `closeDate`.
 *
 * FOUNDER DIRECTIVE (2026-08-09): month-level estimated OPEN windows are
 * additionally anchored to a concrete display date — day 01 of the
 * estimated month by default, or the past cycle's estimated day when one
 * is known (e.g. L'Oréal ~25/04) — so candidates have a real date to
 * prepare toward. The anchor is display-only, always labelled "estimated",
 * and never touches openDate/closeDate or the verified countdown.
 *
 * v8 (2026-08-09): added 13 more records whose openDate/closeDate/rounds
 * come from agent web research explicitly authorized by the founder for
 * this ingestion pass (see data/mt-programs.json v8 note) — NOT founder-
 * pasted data. These sit alongside the founder-verified records above;
 * their `details_status` in the JSON stays 'coming_soon' pending explicit
 * founder confirmation, but the dates themselves are concrete and sourced
 * from official company career pages, so they render as real countdowns
 * (or, for already-closed cycles, as 'closed') rather than estimates.
 *
 * v9 (2026-08-10, founder feedback): a concrete closeDate in the past
 * permanently short-circuits deadlineStatus() to 'closed' — it never falls
 * through to the estimated-window projection below, even if
 * estimatedOpenMonth is also present. So once a v8 record's real cycle
 * expired, its card dead-ended on "Closed" with no forward guidance,
 * instead of projecting the likely next opening the way Unilever/L'Oréal/
 * Suntory already do. Fix: 12 records whose close date had already passed
 * were converted to the SAME estimated-annual-window shape as those three
 * (openDate/closeDate → null, openText/closeText reworded as "~DD/MM
 * estimated", estimatedOpenMonth/Day added from the real researched cycle) so
 * the app now projects next year's likely window instead of stopping at
 * closed. central-retail-ma-2026 and techcombank-futuregen-2027 were left
 * as concrete countdowns since their windows are still upcoming.
 */

export interface ProgramRoundStep {
  /** Round name straight from the verified record (e.g. "R2 Digital Interview"). */
  name: string;
  /** Optional verified/estimated period (e.g. "~Feb – Mar (estimated)"). */
  period?: string;
}

export interface ProgramApplicationWindow {
  /** Concrete founder-verified opening date, ISO 'YYYY-MM-DD'. Null until verified. */
  openDate?: string | null;
  /** Concrete founder-verified closing date, ISO 'YYYY-MM-DD'. Drives the countdown. */
  closeDate?: string | null;
  /** Verified textual/estimated opening info (shown when openDate is null). */
  openText?: string | null;
  /** Verified textual/estimated closing info (shown when closeDate is null). */
  closeText?: string | null;
  /** True while the window is an estimate from a past cycle, not this cycle's dates. */
  estimated?: boolean;
  /** Estimated opening month (1–12) from past cycles; anchors the displayed prep date. */
  estimatedOpenMonth?: number | null;
  /** Estimated opening day-of-month when the past cycle gave one; when absent, day 01 is assumed (founder directive 2026-08-09). */
  estimatedOpenDay?: number | null;
  /** Estimated closing month (1–12) from a known past cycle. */
  estimatedCloseMonth?: number | null;
  /** Estimated closing day-of-month from a known past cycle. */
  estimatedCloseDay?: number | null;
}

export interface ProgramTimelineRecord {
  id: string;
  company: string;
  program: string;
  /** Official program page, when the founder has verified one. Never guessed. */
  programUrl?: string | null;
  applicationWindow?: ProgramApplicationWindow | null;
  rounds?: ProgramRoundStep[];
}

// Mirrors data/mt-programs.json `verified_programs[*].application_window` /
// `rounds_detail` — every program whose record carries structured timeline
// data appears here, regardless of `details_status` (as of v8, several
// 'coming_soon' records carry agent-researched dates/rounds too). Programs
// with no confirmed timeline data at all are intentionally absent (lookup
// returns null).
export const PROGRAM_TIMELINES: ProgramTimelineRecord[] = [
  {
    id: 'unilever-uflp',
    company: 'Unilever Vietnam',
    program: 'Unilever Future Leaders Programme (UFLP)',
    programUrl: null,
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~December each year (estimated from the most recent cycle)',
      closeText: 'Closes ~late January (2025 cycle: 26/01 — estimated; check the exact date on Unilever\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 12,
    },
    rounds: [
      { name: 'R1 Online Application + Aptitude Test', period: '~Dec – Jan (estimated)' },
      { name: 'R2 Digital Interview', period: '~Feb – Mar (estimated)' },
      { name: 'R3 Discovery Center', period: '~Mar – Apr (estimated)' },
    ],
  },
  {
    id: 'loreal-seedz',
    company: "L'Oréal Vietnam",
    program: "L'Oréal SEEDZ (Management Trainee)",
    programUrl: null,
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~25/04 each year (estimated from the most recent cycle)',
      closeText: "Closes ~16/05 (estimated; check the exact date on L'Oréal's careers page)",
      estimated: true,
      estimatedOpenMonth: 4,
      estimatedOpenDay: 25,
    },
    rounds: [
      { name: 'Application', period: '~25/04 – 16/05 (estimated)' },
      { name: 'Online Assessment & Video Showcase', period: '~17/05 – 20/05 (estimated)' },
      { name: 'Initial Interview', period: '~21/05 – 05/06 (estimated)' },
      { name: 'Assessment Center & Final Interview', period: '~08/06 – 12/06 (estimated)' },
      { name: 'Onboarding', period: '~July (estimated)' },
    ],
  },
  {
    id: 'suntory-pepsico-mt',
    company: 'Suntory PepsiCo Vietnam',
    program: 'Suntory PepsiCo Management Trainee',
    programUrl: null,
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~October each year (estimated from the most recent cycle)',
      closeText: 'Closes ~30/11 (estimated; check the exact date on Suntory PepsiCo\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 10,
    },
    rounds: [
      { name: 'Application review' },
      { name: 'Cognitive test (English)' },
      { name: 'Initial interview (VN+EN)' },
      { name: 'Career Camp (games, business case, panel)' },
      { name: 'Onboarding', period: '~April (estimated)' },
    ],
  },
  {
    id: 'techcombank-futuregen-2027',
    company: 'Techcombank',
    program: 'Techcombank Future Gen 2027',
    programUrl: 'https://tuyendung.techcombankjobs.com/techcombank-future-gen',
    applicationWindow: {
      openDate: '2026-07-24',
      closeDate: '2026-09-30',
      openText: 'Opens 24/07/2026',
      closeText: 'Closes 30/09/2026',
      estimated: false,
    },
    rounds: [
      { name: 'Application', period: '24/07 – 30/09/2026' },
      { name: 'Remote Interview', period: 'Aug – Oct 2026' },
      { name: 'Aptitude Test', period: 'Aug – Oct 2026' },
      { name: 'Functional Test', period: 'Sep – Oct 2026' },
      { name: 'Assessment Center', period: 'Oct 2026' },
      { name: 'Panel Interview', period: 'Nov 2026' },
      { name: 'Offer', period: 'Nov – Dec 2026' },
      { name: 'Onboarding', period: 'Jan 2027' },
    ],
  },
  {
    id: 'carlsberg-gtp-2026',
    company: 'Carlsberg Vietnam',
    program: 'Carlsberg Asia Graduate Trainee Programme (GTP) 2026',
    programUrl: 'https://www.carlsbergvietnam.vn/vi/',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~08/07 each year (estimated from the 2026 cycle)',
      closeText: 'Closes ~02/08 (2026 cycle: 02/08 — estimated; check the exact date on Carlsberg\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 7,
      estimatedOpenDay: 8,
    },
    rounds: [
      { name: 'Application submission' },
      { name: 'Application screening' },
      { name: 'Online AI interview' },
      { name: 'Assessment center' },
      { name: 'Final interview' },
    ],
  },
  {
    id: 'central-retail-ma-2026',
    company: 'Central Retail Vietnam',
    program: 'Central Retail Management Associate (MA) 2026',
    programUrl: 'https://www.ma-centralretailvn.com/home',
    applicationWindow: {
      openDate: '2026-07-24',
      closeDate: '2026-08-24',
      openText: 'Opens 24/07/2026',
      closeText: 'Closes 24/08/2026',
      estimated: false,
    },
    rounds: [
      { name: 'Application', period: '24/07 – 24/08/2026' },
      { name: 'Cognitive Test', period: 'Early Sep 2026' },
      { name: 'HR Interview', period: 'Sep 2026' },
      { name: 'Offline Test', period: 'Late Sep 2026' },
      { name: 'Business Case Presentation', period: 'Oct – Nov 2026' },
      { name: 'Onboarding', period: 'Jan 2027' },
    ],
  },
  {
    id: 'abinbev-dreamship-2026',
    company: 'AB InBev Vietnam',
    program: 'AB InBev Dreamship Internship 2026',
    programUrl: 'https://www.ab-inbev.com/working-with-us',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~early July each year (estimated from the 2026 cycle)',
      closeText: 'Closes ~24/07 (2026 cycle: 24/07 — estimated; check the exact date on AB InBev\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 7,
      estimatedOpenDay: 1,
    },
    rounds: [
      { name: 'Online Application' },
      { name: 'Cognitive Test' },
      { name: 'Video Interview' },
      { name: 'Panel Interview' },
      { name: 'Final Interview' },
      { name: 'Onboarding', period: '~September (estimated)' },
    ],
  },
  {
    id: 'homecredit-homeracer-2026',
    company: 'Home Credit Vietnam',
    program: 'Home Credit Home Racer 2026',
    programUrl: 'https://homeracer.homecredit.vn',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~15/06 each year (estimated from the 2026 cycle)',
      closeText: 'Closes ~31/07 (2026 cycle: 31/07 — estimated; check the exact date on Home Credit\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 6,
      estimatedOpenDay: 15,
    },
    rounds: [
      { name: 'Application & Online Assessment', period: '~15/06 – 31/07 (estimated)' },
      { name: 'Online HR Interview', period: '~July (estimated)' },
      { name: 'Technical Assessment (Data Track)', period: '~July (estimated)' },
      { name: 'Assessment Center', period: '~August (estimated)' },
      { name: 'Department Interview', period: '~August (estimated)' },
      { name: 'Career Development Discussion with C-levels', period: '~August (estimated)' },
      { name: 'Welcome Onboard', period: '~September (estimated)' },
    ],
  },
  {
    id: 'shopee-monee-gdp',
    company: 'Shopee & Monee (SeaMoney)',
    program: 'Shopee & Monee (SeaMoney) Global Development Program (GDP)',
    programUrl: 'https://seagmap.sea.com/shopee-monee',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~August each year (estimated from the 2025 cycle)',
      closeText: 'Closes ~31/10 (2025 cycle: 31/10 — Global track — estimated; check the exact date on Sea/Shopee\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 8,
      estimatedOpenDay: null,
      estimatedCloseMonth: 10,
      estimatedCloseDay: 31,
    },
    rounds: [
      { name: 'Round 1: Application + Online Assessment' },
      { name: 'Round 2: HR Interview' },
      { name: 'Round 3: Senior Leadership Interview' },
      { name: 'Round 4: Interview with Shopee Vietnam Country Head & People Head' },
      { name: 'Round 5: Group Case Assessment (Singapore) — Global track only' },
    ],
  },
  {
    id: 'nestle-sparkthenext-2026',
    company: 'Nestlé Vietnam',
    program: 'Nestlé #SparkTheNext Leaders Management Trainee 2026',
    programUrl: 'https://nes.tl/NSLP2026',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~early December each year (estimated from the 2025 cycle)',
      closeText: 'Closes ~15/12 (2025 cycle: 15/12 — estimated; check the exact date on Nestlé\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 12,
      estimatedOpenDay: 2,
    },
    rounds: [
      { name: 'Online Assessment', period: 'Until 15/12/2025' },
      { name: 'Initial Interview' },
      { name: 'Nest Camp' },
      { name: 'Final Interview' },
      { name: 'Start of work', period: 'May 2026' },
    ],
  },
  {
    id: 'momo-talent-2026',
    company: 'MoMo',
    program: 'MoMo Talent 2026',
    programUrl: 'https://momo.careers/momo-talent',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~18/05 each year (estimated from the 2026 cycle)',
      closeText: 'Closes ~12/06 (2026 cycle: 12/06 — estimated; check the exact date on MoMo\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 5,
      estimatedOpenDay: 18,
    },
    rounds: [
      { name: 'Application & CV Screen', period: '~18/05 – 12/06 (estimated)' },
      { name: 'Cognitive Test', period: '~June (estimated)' },
      { name: 'Functional Assessment / Interview', period: '~Jun – Jul (estimated)' },
      { name: 'Leadership Interview', period: '~July (estimated)' },
      { name: 'Offer', period: '~July (estimated)' },
    ],
  },
  {
    id: 'viettel-future-changemakers',
    company: 'Viettel',
    program: 'Viettel Future Changemakers',
    programUrl: 'https://tuyendung.viettel.vn/viettel-talent-2026',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~12/02 each year (estimated from the 2026 cycle)',
      closeText: 'Closes ~15/03 (2026 cycle: 15/03 — estimated; check the exact date on Viettel\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 2,
      estimatedOpenDay: 12,
    },
    rounds: [
      { name: 'Round 1: IQ + TOEIC Test' },
      { name: 'Round 2: Online Test' },
      { name: 'Round 3: Panel Interview' },
      { name: 'Phase 1: Intensive training camp with rotations', period: '~3 months, expected to start in May (estimated)' },
      { name: 'Phase 2: Working on key strategic projects', period: '~6 months after that (estimated)' },
    ],
  },
  {
    id: 'uob-vietnam-ma',
    company: 'UOB Vietnam',
    program: 'UOB Vietnam Management Associate',
    programUrl: 'https://go.uob.com/4k1pfjc',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~24/01 each year (estimated from the 2026 cycle)',
      closeText: 'Closes ~13/03 (2026 cycle: 13/03 — estimated; check the exact date on UOB\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 1,
      estimatedOpenDay: 24,
    },
    rounds: [
      { name: 'Online Application' },
      { name: 'Online Assessments' },
      { name: 'Panel Interviews' },
      { name: 'Final Offer' },
      { name: 'Programme Commencement', period: '~July (estimated)' },
    ],
  },
  {
    id: 'prudential-strivers-2025',
    company: 'Prudential Vietnam',
    program: 'Prudential The Strivers 2025',
    programUrl: 'https://www.prudential.com.vn/vi/co-hoi-nghe-nghiep/',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~10/02 each year (estimated from the 2025 cycle)',
      closeText: 'Closes ~10/03 (2025 cycle: 10/03 — estimated; check the exact date on Prudential\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 2,
      estimatedOpenDay: 10,
    },
    rounds: [
      { name: 'Online Application', period: '~10/02 – 10/03 (estimated)' },
      { name: 'Online Test', period: '~March (estimated)' },
      { name: 'Interview', period: '~Mar – Apr (estimated)' },
      { name: 'Assessment Centre', period: '~Apr – May (estimated)' },
      { name: 'Start of full-time work', period: '~June (estimated)' },
    ],
  },
  {
    id: 'propertyguru-prodig-2025',
    company: 'PropertyGuru Vietnam',
    program: 'PropertyGuru Prodi-G Internship 2025',
    programUrl: 'https://sg.prosple.com/graduate-employers/propertyguru-group/jobs-internships/prodi-g-internship-program',
    rounds: [
      { name: 'Application' },
      { name: 'Interviews', period: 'Q1 2025' },
      { name: 'Internship', period: 'Jun – Sep 2025 (12 weeks)' },
    ],
  },
  {
    id: 'pg-leadgen-2026',
    company: 'P&G Vietnam',
    program: 'P&G LEAD GEN 2026 (Internship)',
    programUrl: 'https://www.pgcareers.com',
    rounds: [
      { name: 'Online Application (first come, first served)' },
      { name: 'Phone Interview' },
      { name: 'Online Assessment Tests' },
      { name: '3 Rounds of Interview with C-levels' },
    ],
  },
  {
    id: 'deloitte-passport-fy26',
    company: 'Deloitte Vietnam',
    program: 'Deloitte Passport FY26 (Internship)',
    programUrl: 'https://jobs.sea.deloitte.com/',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~09/07 each year (estimated from the FY26/2025 cycle)',
      closeText: 'Closes ~09/08 (FY26/2025 cycle: 09/08 — estimated; check the exact date on Deloitte\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 7,
      estimatedOpenDay: 9,
    },
    rounds: [
      { name: 'Online Application', period: '~09/07 – 09/08 (estimated)' },
    ],
  },
  {
    id: 'ey-tax-internship-2027',
    company: 'EY Vietnam',
    program: 'EY Tax Services Internship 2027',
    programUrl: 'https://go.ey.com/4a9XbGA',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~20/06 each year (estimated from the 2026 cycle)',
      closeText: 'Closes ~17/07 (2026 cycle: 17/07 — estimated; check the exact date on EY\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 6,
      estimatedOpenDay: 20,
    },
    rounds: [
      { name: 'Application Period', period: '~20/06 – 17/07 (estimated)' },
      { name: 'Assessment Test', period: '~Late July (estimated)' },
      { name: 'Interview Round', period: '~August (estimated)' },
    ],
  },
  {
    id: 'abbott-internship-2025',
    company: 'Abbott Vietnam',
    program: 'Abbott Internship Program 2025',
    programUrl: 'https://www.vn.abbott/',
    applicationWindow: {
      openDate: null,
      closeDate: null,
      openText: 'Opens ~17/03 each year (estimated from the 2025 cycle)',
      closeText: 'Closes ~07/04 (2025 cycle: 07/04 — estimated; check the exact date on Abbott\u2019s careers page)',
      estimated: true,
      estimatedOpenMonth: 3,
      estimatedOpenDay: 17,
    },
    rounds: [
      { name: 'Application', period: '~17/03 – 07/04 (estimated)' },
      { name: 'Onboarding', period: '~May (estimated)' },
    ],
  },
];

function timelineKey(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Find the verified timeline record for a program shown on the direction
 * card. Program names in saved results come from the same founder dataset,
 * so normalized-name matching is exact; company match is the fallback.
 * Returns null when the record carries no timeline data (honest fallback).
 */
export function findProgramTimeline(company: string, program: string): ProgramTimelineRecord | null {
  const wantedProgram = timelineKey(program);
  const wantedCompany = timelineKey(company);
  if (wantedProgram) {
    const byProgram = PROGRAM_TIMELINES.find((r) => timelineKey(r.program) === wantedProgram);
    if (byProgram) return byProgram;
  }
  if (wantedCompany) {
    const byCompany = PROGRAM_TIMELINES.find((r) => timelineKey(r.company) === wantedCompany);
    if (byCompany) return byCompany;
  }
  return null;
}

export interface DeadlineStatus {
  /**
   * countdown — concrete verified closeDate in the future → "X days left"
   * closed    — concrete verified closeDate in the past   → "Applications closed"
   * estimated — only month-level estimated window text exists
   * unknown   — the record carries no deadline data at all
   */
  kind: 'countdown' | 'closed' | 'estimated' | 'unknown';
  daysRemaining?: number;
  /** Ready-to-render countdown label: "53 days left" / "Closes today". */
  label?: string;
  /** 'DD/MM/YYYY' of the concrete close date, when one exists. */
  closeDateLabel?: string;
  /** 'DD/MM/YYYY' of the concrete open date, when one exists. */
  openDateLabel?: string;
  openText?: string | null;
  closeText?: string | null;
  /** 'DD/MM/YYYY' estimated opening anchor (day 01 of the estimated month by default — founder directive 2026-08-09). */
  estimatedOpenDateLabel?: string;
  /** Days from today until the estimated opening anchor (prep runway), when it lies ahead. */
  daysToEstimatedOpen?: number;
}

const MS_PER_DAY = 86400000;

function parseIsoDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || '').trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** 'YYYY-MM-DD' → 'DD/MM/YYYY' (Vietnamese display format). */
export function formatDateVN(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '').trim());
  return m ? `${m[3]}/${m[2]}/${m[1]}` : String(iso || '');
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface MonthDay {
  month: number;
  day: number;
}

function validMonthDay(month: number, day: number): MonthDay | null {
  if (!Number.isInteger(month) || !Number.isInteger(day) || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const probe = new Date(2024, month - 1, day);
  return probe.getMonth() === month - 1 && probe.getDate() === day ? { month, day } : null;
}

function monthDayFromIso(value?: string | null): MonthDay | null {
  const match = /^\d{4}-(\d{2})-(\d{2})$/.exec(String(value || '').trim());
  return match ? validMonthDay(Number(match[1]), Number(match[2])) : null;
}

function monthDayFromText(value?: string | null): MonthDay | null {
  const match = /(?:^|\D)(\d{1,2})\/(\d{1,2})(?:\D|$)/.exec(String(value || ''));
  return match ? validMonthDay(Number(match[2]), Number(match[1])) : null;
}

function rollMonthDay(parts: MonthDay | null, now: Date): Date | null {
  if (!parts) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let date = new Date(now.getFullYear(), parts.month - 1, parts.day);
  // Equality is intentionally not rolled: a window opening today belongs to
  // the current year. Only a strictly earlier day/month moves to next year.
  if (date.getTime() < today.getTime()) date = new Date(now.getFullYear() + 1, parts.month - 1, parts.day);
  return date;
}

function longDateLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export interface ApplicationWindowDisplay {
  openDate: Date | null;
  closeDate: Date | null;
  openLabel: string;
  closeLabel: string | null;
}

/**
 * Resolve application day/month values against the current calendar year.
 * Stored years are deliberately ignored: a date that has already passed this
 * year rolls to next year, while today and future dates stay in this year.
 */
export function applicationWindowDisplay(
  record: ProgramTimelineRecord | null | undefined,
  now: Date = new Date(),
): ApplicationWindowDisplay {
  const win = record?.applicationWindow || null;
  const openParts = win?.openDate
    ? monthDayFromIso(win.openDate)
    : win?.estimatedOpenMonth
      ? validMonthDay(Number(win.estimatedOpenMonth), Number(win.estimatedOpenDay || 1))
      : monthDayFromText(win?.openText);
  const closeParts = win?.closeDate
    ? monthDayFromIso(win.closeDate)
    : win?.estimatedCloseMonth
      ? validMonthDay(Number(win.estimatedCloseMonth), Number(win.estimatedCloseDay || 1))
      : monthDayFromText(win?.closeText);
  const openDate = rollMonthDay(openParts, now);
  const closeDate = rollMonthDay(closeParts, now);
  return {
    openDate,
    closeDate,
    openLabel: openDate
      ? `Estimated open: ${longDateLabel(openDate)}`
      : "Check the company's careers page for the latest application window",
    closeLabel: closeDate ? `Closes: ${longDateLabel(closeDate)}` : null,
  };
}

/**
 * Compute the deadline status for a program AT RENDER TIME (days remaining
 * refresh with today's date — nothing is precomputed or stored). Only a
 * concrete founder-verified closeDate ever produces a countdown.
 */
export function deadlineStatus(
  record: ProgramTimelineRecord | null | undefined,
  now: Date = new Date(),
): DeadlineStatus {
  const win = (record && record.applicationWindow) || null;
  if (win && win.closeDate) {
    const close = parseIsoDate(win.closeDate);
    if (close) {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const days = Math.round((close.getTime() - today.getTime()) / MS_PER_DAY);
      const closeDateLabel = formatDateVN(win.closeDate);
      const openDateLabel = win.openDate ? formatDateVN(win.openDate) : undefined;
      if (days < 0) return { kind: 'closed', closeDateLabel, openDateLabel };
      return {
        kind: 'countdown',
        daysRemaining: days,
        label: days === 0 ? 'Closes today' : `${days} days left`,
        closeDateLabel,
        openDateLabel,
      };
    }
  }
  if (win && (win.closeText || win.openText)) {
    const status: DeadlineStatus = {
      kind: 'estimated',
      openText: win.openText || null,
      closeText: win.closeText || null,
    };
    // Founder directive (2026-08-09): anchor month-level estimated open
    // windows to a concrete display date (day 01 unless the past cycle gave
    // a day) so candidates can plan their prep. Display-only, labelled
    // "estimated" — the verified countdown above is untouched.
    const month = Number(win.estimatedOpenMonth || 0);
    if (month >= 1 && month <= 12) {
      const day = Math.min(31, Math.max(1, Number(win.estimatedOpenDay || 1)));
      const dayDefaulted = !win.estimatedOpenDay;
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let anchor = new Date(now.getFullYear(), month - 1, day);
      if (anchor.getTime() < today.getTime()) anchor = new Date(now.getFullYear() + 1, month - 1, day);
      const iso = `${anchor.getFullYear()}-${String(anchor.getMonth() + 1).padStart(2, '0')}-${String(anchor.getDate()).padStart(2, '0')}`;
      const dateLabel = formatDateVN(iso);
      const daysToOpen = Math.round((anchor.getTime() - today.getTime()) / MS_PER_DAY);
      status.estimatedOpenDateLabel = dateLabel;
      status.daysToEstimatedOpen = daysToOpen;
      status.label = `Expected to open ${dateLabel} (estimated)`;
      status.openText =
        `Expected to open ${dateLabel} (estimated${dayDefaulted ? ' — day 01 assumed since only the month is known' : ' from the most recent cycle'})` +
        (daysToOpen > 0 ? ` · ~${daysToOpen} days left to prepare` : '');
    }
    return status;
  }
  return { kind: 'unknown' };
}

/**
 * Parse a verified rounds string ("R1 … → R2 … → R3 …") into timeline steps.
 * "Details coming soon" boilerplate is never treated as data.
 */
export function parseRoundsString(value?: string | null): ProgramRoundStep[] {
  const text = String(value || '').trim();
  if (!text || /coming soon/i.test(text)) return [];
  return text
    .split(/\s*(?:→|->)\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => ({ name }));
}

/**
 * The rounds timeline for a program: the structured founder-verified steps
 * when the record has them, else the verified rounds string parsed into
 * steps, else empty (caller shows the website fallback).
 */
export function roundStepsFor(
  record: ProgramTimelineRecord | null | undefined,
  roundsString?: string | null,
): ProgramRoundStep[] {
  if (record && Array.isArray(record.rounds) && record.rounds.length > 0) return record.rounds;
  return parseRoundsString(roundsString);
}
