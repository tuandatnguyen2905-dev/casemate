/**
 * CultureFitSection — Casemate culture-fit layer (v1.2, unified in v1.3).
 *
 * v1.3: the two questionnaires are MERGED into the single initial floating
 * question popup (see CultureFitQuestionGroups below, rendered by
 * AgentChatView between the required gap-fill questions and the one "Send my
 * answers" button). This section — rendered directly UNDER the fit-assessment
 * direction card — remains as the REVIEW / fill-in-later / redo surface: it
 * shows the saved results in full and lets a candidate who skipped the groups
 * answer them after the fact. It must never feel like a second, duplicate
 * questionnaire flow. Two independent, skippable parts:
 *
 *   1. Corporate-fit — 11 preference statements over 8 culture dimensions
 *      (rewards split into development vs compensation, plus the
 *      Work-life balance / flexibility axis added
 *      per the 2026-08 corporate-fit model review = up to 9 scored axes,
 *      1–5 each). The user's preference vector is matched by normalized
 *      Euclidean distance against FOUNDER-LOCKED company culture vectors
 *      read from WorkspaceDB `culture_company_profiles` (Unilever, Maersk,
 *      Techcombank). Output: ranked fit % + a plain-language "why" per
 *      company grounded in the most aligned / most divergent dimensions,
 *      plus the Maersk function-split caveat always visible on its card.
 *
 *   2. Job-fit — a PURE MBTI questionnaire (20 forced-choice items, 5 per
 *      dichotomy). Output: the 4-letter type + a friendly description of
 *      how it tends to show up at work. Self-discovery flavored — NEVER a
 *      "you can't do job X" verdict, and no per-job matching in this
 *      version (founder decision).
 *
 * Results persist per user in WorkspaceDB `culture_fit_results`, keyed to
 * the v1.1 account identity (user_key = 'email:<sign-in email>' when signed
 * in, else 'device:<visitor id>' — same convention as usage_events), so a
 * returning user sees their saved result and can redo either part.
 *
 * This layer is FREE (part of the matching layer) — no paywall checks here.
 * Skipping it never affects the core fit assessment.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronDown,
  Compass,
  Loader2,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { tw } from '../lib/colors';

// --- Identity (same convention as Desktop.tsx usage_events) ----------------

function readSignInEmail(): string | null {
  try {
    const w = window as any;
    const candidates: string[] = [];
    const sid = w.__APP_ID__ || w.__SPACE_ID__;
    if (typeof sid === 'string' && sid) candidates.push(`space_session_${sid}`);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.indexOf('space_session_') === 0 && candidates.indexOf(key) < 0) {
        candidates.push(key);
      }
    }
    for (const key of candidates) {
      const stored = localStorage.getItem(key);
      if (!stored) continue;
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
          return parsed.email.toLowerCase().trim();
        }
      } catch (e) {
        // Not JSON — skip.
      }
    }
  } catch (e) {
    // Storage unavailable — fall back to the device key.
  }
  return null;
}

function readVisitorId(): string {
  try {
    const match = document.cookie.match(/(?:^|;\s*)audos_vid=([^;]+)/);
    if (match && match[1]) return match[1];
  } catch (e) {
    // No cookie access.
  }
  // Stable per-device fallback so results still persist locally.
  try {
    const KEY = 'casemate-culture-device-id';
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = 'local-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch (e) {
    return 'anonymous';
  }
}

function readIdentity(): { userKey: string; email: string | null } {
  const email = readSignInEmail();
  if (email) return { userKey: `email:${email}`, email };
  return { userKey: `device:${readVisitorId()}`, email: null };
}

// --- Corporate-fit: dimensions, items, locked company vectors --------------

type AxisKey =
  | 'innovation'
  | 'detail'
  | 'results'
  | 'competitive'
  | 'supportive'
  | 'teamwork'
  | 'reward_development'
  | 'reward_compensation'
  | 'work_life_balance';

export const AXES: Array<{ key: AxisKey; label: string }> = [
  { key: 'innovation', label: 'Innovation / risk-taking' },
  { key: 'detail', label: 'Precision / attention to detail' },
  { key: 'results', label: 'Results orientation' },
  { key: 'competitive', label: 'Competitiveness' },
  { key: 'supportive', label: 'Supportive / people-first' },
  { key: 'teamwork', label: 'Teamwork' },
  { key: 'reward_development', label: 'Rewards: growth & development' },
  { key: 'reward_compensation', label: 'Rewards: pay & benefits' },
  { key: 'work_life_balance', label: 'Work-life balance & flexibility' },
];

export const AXIS_LABEL: Record<AxisKey, string> = AXES.reduce(
  (acc, a) => {
    acc[a.key] = a.label;
    return acc;
  },
  {} as Record<AxisKey, string>,
);

// 11 tight preference statements (1–2 per dimension), rated 1–5.
export const OCP_ITEMS: Array<{ id: string; axis: AxisKey; text: string }> = [
  {
    id: 'innovation_1',
    axis: 'innovation',
    text: 'I want to work in an environment that encourages new approaches and thoughtful risk-taking.',
  },
  {
    id: 'innovation_2',
    axis: 'innovation',
    text: 'I am willing to take on an unprecedented task and work out how to deliver it.',
  },
  {
    id: 'detail_1',
    axis: 'detail',
    text: 'I enjoy work that requires precision, even in the smallest details.',
  },
  {
    id: 'results_1',
    axis: 'results',
    text: 'I want my performance measured by clear goals and final outcomes.',
  },
  {
    id: 'competitive_1',
    axis: 'competitive',
    text: 'Performance rankings and comparisons motivate me to push harder.',
  },
  {
    id: 'supportive_1',
    axis: 'supportive',
    text: 'I need a workplace where managers and colleagues genuinely care and support one another.',
  },
  {
    id: 'teamwork_1',
    axis: 'teamwork',
    text: 'I do my best work in collaboration with a team rather than handling everything alone.',
  },
  {
    id: 'reward_dev_1',
    axis: 'reward_development',
    text: 'At this stage, fast learning and development opportunities strongly shape where I want to work.',
  },
  {
    id: 'reward_comp_1',
    axis: 'reward_compensation',
    text: 'Competitive pay and strong benefits are important when I choose a workplace.',
  },
  // Work-life balance and flexibility — added per the
  // 2026-08 corporate-fit model review: the axis Gen Z VN weighs heavily that
  // the original 8 didn't measure explicitly. Both statements force a
  // preference between flexibility / sustainable workload and "always-on"
  // intensity, so a high rating = high balance preference.
  {
    id: 'wlb_1',
    axis: 'work_life_balance',
    text: 'I prefer flexible hours and a sustainable workload over a job that expects me to be always on.',
  },
  {
    id: 'wlb_2',
    axis: 'work_life_balance',
    text: 'Being able to genuinely disconnect outside working hours matters when I choose a workplace.',
  },
];

const OCP_ANCHORS: Record<AxisKey, { low: string; high: string }> = {
  innovation: {
    low: 'Prefer stability and low risk',
    high: 'Prefer innovation and experimentation',
  },
  detail: {
    low: 'Focus on the big picture',
    high: 'Value detail and precision',
  },
  results: {
    low: 'Prioritize process and people',
    high: 'Drive toward clear results',
  },
  competitive: {
    low: 'Prefer collaboration over competition',
    high: 'Thrive in a competitive environment',
  },
  supportive: {
    low: 'Prioritize individual performance',
    high: 'Prioritize supporting teammates',
  },
  teamwork: {
    low: 'Work better independently',
    high: 'Prefer working with a team',
  },
  reward_development: {
    low: 'Development is less important',
    high: 'Learning and advancement matter a lot',
  },
  reward_compensation: {
    low: 'Pay is less important',
    high: 'Pay and benefits matter a lot',
  },
  work_life_balance: {
    low: 'Comfortable sacrificing personal time',
    high: 'Need a clear work-life balance',
  },
};

export interface CompanyProfile {
  slug: string;
  company: string;
  /**
   * 1–5 per axis. `work_life_balance` is null until the founder scores it
   * (its DB column is nullable) — the fit % then computes over that
   * company's remaining scored axes, so pre-existing 8-axis rows keep
   * computing exactly as before.
   */
  vector: Record<AxisKey, number | null>;
  note: string | null;
  displayOrder: number;
}

const MAERSK_NOTE =
  'Department caveat: Maersk’s culture differs SHARPLY by division. Office / Customer Service teams tend to be gentle — supportive, steady workload, little overtime. Operations / freight / trucking / customs run “always ready” — fast-paced and on call almost 20/7. The % above is a company-wide average; the real experience depends heavily on which department you join.';

// FOUNDER-LOCKED culture vectors. These seed WorkspaceDB
// `culture_company_profiles` exactly once; after that the DB rows are the
// source of truth (highest id per slug wins, so the founder can correct a
// company without touching code). Do NOT re-derive or tweak these values.
export const LOCKED_COMPANY_PROFILES: CompanyProfile[] = [
  {
    slug: 'unilever',
    company: 'Unilever',
    vector: {
      innovation: 4,
      detail: 4,
      results: 5,
      competitive: 4,
      supportive: 4,
      teamwork: 4,
      reward_development: 5,
      reward_compensation: 2,
      work_life_balance: null, // founder score pending — never invented
    },
    note: null,
    displayOrder: 1,
  },
  {
    slug: 'maersk',
    company: 'Maersk',
    vector: {
      innovation: 3,
      detail: 4,
      results: 4,
      competitive: 2,
      supportive: 4,
      teamwork: 4,
      reward_development: 4,
      reward_compensation: 2,
      work_life_balance: null, // founder score pending — never invented
    },
    note: MAERSK_NOTE,
    displayOrder: 2,
  },
  {
    slug: 'techcombank',
    company: 'Techcombank',
    vector: {
      innovation: 5,
      detail: 4,
      results: 5,
      competitive: 4,
      supportive: 3,
      teamwork: 3,
      reward_development: 4,
      reward_compensation: 3,
      work_life_balance: null, // founder score pending — never invented
    },
    note: null,
    displayOrder: 3,
  },
];

// --- Corporate-fit scoring ---------------------------------------------------

export interface CompanyFitResult {
  slug: string;
  company: string;
  fit: number;
  aligned: Array<{ axis: AxisKey; user: number; company: number }>;
  gaps: Array<{ axis: AxisKey; user: number; company: number }>;
  why: string;
  note: string | null;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function computePreferences(answers: Record<string, number>): Record<AxisKey, number> {
  const prefs = {} as Record<AxisKey, number>;
  AXES.forEach(({ key }) => {
    const items = OCP_ITEMS.filter((i) => i.axis === key);
    const values = items.map((i) => answers[i.id]).filter((v) => typeof v === 'number');
    prefs[key] = values.length > 0 ? round1(values.reduce((s, v) => s + v, 0) / values.length) : 3;
  });
  return prefs;
}

// Axes that actually carry a founder score for THIS company. The 8 core OCP
// axes are always scored (NOT NULL in the DB); 'work_life_balance' only
// joins once the founder has scored it (nullable column) — so older 8-axis
// rows keep computing exactly as before: no crash, and the missing score is
// never treated as a silent 0.
export function scoredAxes(company: CompanyProfile): AxisKey[] {
  return AXES.map((a) => a.key).filter((key) => {
    const v = company.vector[key];
    return typeof v === 'number' && Number.isFinite(v);
  });
}

// Normalized Euclidean distance → fit %. Max per-axis distance is 4
// (1 vs 5), so d/4 ∈ [0,1]; closer = higher %. Distance is averaged over the
// company's SCORED axes only (8 or 9), so 8-axis and 9-axis companies stay
// comparable on the same 0–100 scale.
function computeFitPercent(prefs: Record<AxisKey, number>, company: CompanyProfile): number {
  const axes = scoredAxes(company);
  if (axes.length === 0) return 0;
  const sumSq = axes.reduce((s, key) => {
    const d = (prefs[key] || 3) - (company.vector[key] as number);
    return s + d * d;
  }, 0);
  const d = Math.sqrt(sumSq / axes.length);
  return Math.max(0, Math.min(100, Math.round(100 * (1 - d / 4))));
}

function buildWhy(prefs: Record<AxisKey, number>, company: CompanyProfile): {
  aligned: CompanyFitResult['aligned'];
  gaps: CompanyFitResult['gaps'];
  why: string;
} {
  // Only the company's scored axes join the "why" — so the work-life-balance
  // axis can surface as a top aligned driver (or gap) exactly like any other
  // axis once the founder scores it, and never appears for companies still on
  // an 8-axis profile.
  const diffs = scoredAxes(company).map((key) => {
    const u = prefs[key] || 3;
    const c = company.vector[key] as number;
    return { axis: key, user: u, company: c, delta: c - u, abs: Math.abs(c - u) };
  });
  const aligned = diffs
    .filter((d) => d.abs <= 0.75)
    .sort((a, b) => b.user + b.company - (a.user + a.company))
    .slice(0, 2)
    .map(({ axis, user, company: c }) => ({ axis, user, company: c }));
  const gaps = diffs
    .filter((d) => d.abs >= 1.5)
    .sort((a, b) => b.abs - a.abs)
    .slice(0, 2)
    .map(({ axis, user, company: c }) => ({ axis, user, company: c }));

  const parts: string[] = [];
  if (aligned.length > 0) {
    parts.push(
      `You and ${company.company} align most clearly on ${aligned
        .map((a) => AXIS_LABEL[a.axis])
        .join(' and ')} — what you want and the company’s culture are nearly identical there.`,
    );
  } else {
    parts.push(`Your similarity with ${company.company} is fairly even, but no single dimension stands out as a strong match.`);
  }
  gaps.forEach((g) => {
    if (g.company < g.user) {
      parts.push(
        `Note: ${AXIS_LABEL[g.axis]} here scores ${g.company}/5, lower than your expectation (${g.user}/5) — worth weighing.`,
      );
    } else {
      parts.push(
        `Note: ${AXIS_LABEL[g.axis]} here runs at ${g.company}/5, higher than what you’re used to (${g.user}/5) — you’ll need to adapt.`,
      );
    }
  });
  return { aligned, gaps, why: parts.join(' ') };
}

export function rankCompanies(prefs: Record<AxisKey, number>, companies: CompanyProfile[]): CompanyFitResult[] {
  return companies
    .map((c) => {
      const { aligned, gaps, why } = buildWhy(prefs, c);
      return { slug: c.slug, company: c.company, fit: computeFitPercent(prefs, c), aligned, gaps, why, note: c.note };
    })
    // Deterministic: fit % desc, then company name asc (stable tie-break).
    .sort((a, b) => b.fit - a.fit || a.company.localeCompare(b.company));
}

// --- MBTI: items, scoring, type descriptions --------------------------------

type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';
type MbtiLetter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

interface MbtiItem {
  id: string;
  dichotomy: Dichotomy;
  question: string;
  a: { text: string; letter: MbtiLetter };
  b: { text: string; letter: MbtiLetter };
}

const MBTI_DIMENSIONS: Record<Dichotomy, { label: string; intro: string; a: string; b: string }> = {
  EI: {
    label: 'E / I — Energy',
    intro: 'This section explores how you recharge and interact at work.',
    a: 'E — Extraversion: you gain energy from interacting with people and active teamwork.',
    b: 'I — Introversion: you recharge alone and prefer to think deeply before speaking.',
  },
  SN: {
    label: 'S / N — Taking in information',
    intro: 'This section explores how you take in, interpret, and use information.',
    a: 'S — Sensing: you trust concrete data, details, and practical experience.',
    b: 'N — Intuition: you look for the big picture, meaning, and hidden possibilities.',
  },
  TF: {
    label: 'T / F — Decision-making',
    intro: 'This section explores what you prioritize when weighing a decision.',
    a: 'T — Thinking: you decide through logic and objective analysis.',
    b: 'F — Feeling: you decide through personal values and the impact on people.',
  },
  JP: {
    label: 'J / P — Working style',
    intro: 'This section explores how you plan, finish work, and adapt to change.',
    a: 'J — Judging: you prefer a clear plan and finishing ahead of deadlines.',
    b: 'P — Perceiving: you prefer to adapt and keep your options open.',
  },
};

// Keep the same 20 ids, dichotomies, and A/B letters so clearer copy cannot
// change scoring. There are still 5 items per dichotomy (odd count = no ties).
export const MBTI_ITEMS: MbtiItem[] = [
  {
    id: 'ei_1',
    dichotomy: 'EI',
    question: 'After a day full of meetings and conversations, you would rather:',
    a: { text: 'Keep talking or meeting people because interaction gives you energy', letter: 'E' },
    b: { text: 'Have quiet time alone to recharge', letter: 'I' },
  },
  {
    id: 'ei_2',
    dichotomy: 'EI',
    question: 'In a group discussion, you usually:',
    a: { text: 'Talk through ideas to clarify your thinking as you go', letter: 'E' },
    b: { text: 'Organize your thoughts first, then share when you are ready', letter: 'I' },
  },
  {
    id: 'ei_3',
    dichotomy: 'EI',
    question: 'At an event where you do not know many people, you usually:',
    a: { text: 'Introduce yourself and start conversations with several people', letter: 'E' },
    b: { text: 'Observe first and have deeper conversations with a few people', letter: 'I' },
  },
  {
    id: 'ei_4',
    dichotomy: 'EI',
    question: 'When working through a difficult problem, what helps you think more clearly?',
    a: { text: 'Talk it through with someone until the idea takes shape', letter: 'E' },
    b: { text: 'Think or write it through alone before discussing it', letter: 'I' },
  },
  {
    id: 'ei_5',
    dichotomy: 'EI',
    question: 'Your ideal workday includes:',
    a: { text: 'Plenty of discussion, team meetings, and live interaction', letter: 'E' },
    b: { text: 'Long stretches of focused work with few interruptions', letter: 'I' },
  },
  {
    id: 'sn_1',
    dichotomy: 'SN',
    question: 'When learning a new skill, you prefer to begin with:',
    a: { text: 'Concrete examples, step-by-step guidance, and immediate practice', letter: 'S' },
    b: { text: 'The big picture, core principles, and the possibilities they open up', letter: 'N' },
  },
  {
    id: 'sn_2',
    dichotomy: 'SN',
    question: 'When evaluating a proposal, you trust:',
    a: { text: 'Specific data and practical experience that has been tested', letter: 'S' },
    b: { text: 'Patterns, trends, and possibilities that have not been tried yet', letter: 'N' },
  },
  {
    id: 'sn_3',
    dichotomy: 'SN',
    question: 'When a request is still vague, you usually:',
    a: { text: 'Ask for specific criteria, facts, and expected outputs', letter: 'S' },
    b: { text: 'Infer the larger goal and explore several possible approaches', letter: 'N' },
  },
  {
    id: 'sn_4',
    dichotomy: 'SN',
    question: 'When improving a process, you prefer to:',
    a: { text: 'Refine each step using methods that have already proved effective', letter: 'S' },
    b: { text: 'Try a new approach that could reshape the whole process', letter: 'N' },
  },
  {
    id: 'sn_5',
    dichotomy: 'SN',
    question: 'When presenting an idea, you tend to emphasize:',
    a: { text: 'Practical examples, numbers, and concrete execution', letter: 'S' },
    b: { text: 'Long-term vision, meaning, and future possibilities', letter: 'N' },
  },
  {
    id: 'tf_1',
    dichotomy: 'TF',
    question: 'When choosing between two important options, you usually:',
    a: { text: 'Compare criteria, data, and consequences to find the most logical choice', letter: 'T' },
    b: { text: 'Consider your values and how each option affects people', letter: 'F' },
  },
  {
    id: 'tf_2',
    dichotomy: 'TF',
    question: 'When a teammate makes a mistake that affects progress, you usually:',
    a: { text: 'Address the issue directly and agree on corrective action', letter: 'T' },
    b: { text: 'Understand their situation first and give feedback in a way that preserves trust', letter: 'F' },
  },
  {
    id: 'tf_3',
    dichotomy: 'TF',
    question: 'When the team disagrees, you prioritize:',
    a: { text: 'Testing the arguments to find the most sound and consistent answer', letter: 'T' },
    b: { text: 'Making sure everyone is heard so the team can support the decision', letter: 'F' },
  },
  {
    id: 'tf_4',
    dichotomy: 'TF',
    question: 'When giving feedback, you usually:',
    a: { text: 'Point out the gap against expectations and suggest a specific fix', letter: 'T' },
    b: { text: 'Acknowledge the effort first and adapt your wording to the listener', letter: 'F' },
  },
  {
    id: 'tf_5',
    dichotomy: 'TF',
    question: 'When a general rule leaves someone on the team unhappy, you usually:',
    a: { text: 'Keep the rule consistent when it is the most rational and fair choice', letter: 'T' },
    b: { text: 'Adapt the approach when it protects the relationship and human needs', letter: 'F' },
  },
  {
    id: 'jp_1',
    dichotomy: 'JP',
    question: 'For a task due in two weeks, you usually:',
    a: { text: 'Break it down, set milestones, and start early', letter: 'J' },
    b: { text: 'Keep the schedule flexible and focus intensely closer to the deadline', letter: 'P' },
  },
  {
    id: 'jp_2',
    dichotomy: 'JP',
    question: 'When planning your workweek, you prefer to:',
    a: { text: 'Set a clear schedule and daily outputs at the start of the week', letter: 'J' },
    b: { text: 'Set the main priorities and adjust the schedule as things change', letter: 'P' },
  },
  {
    id: 'jp_3',
    dichotomy: 'JP',
    question: 'When a plan changes at the last minute, you usually:',
    a: { text: 'Want a clear revised plan before continuing', letter: 'J' },
    b: { text: 'Shift quickly and work from the new information', letter: 'P' },
  },
  {
    id: 'jp_4',
    dichotomy: 'JP',
    question: 'Once a task meets the requirements, you usually:',
    a: { text: 'Finalize it, mark it complete, and move to the next task', letter: 'J' },
    b: { text: 'Keep it open in case new ideas or information appear', letter: 'P' },
  },
  {
    id: 'jp_5',
    dichotomy: 'JP',
    question: 'When preparing for a trip or new project, you prefer to:',
    a: { text: 'Book key milestones and prepare early wherever possible', letter: 'J' },
    b: { text: 'Decide closer to the date so you keep more options open', letter: 'P' },
  },
];

interface MbtiTypeInfo {
  nickname: string;
  summary: string;
  atWork: string[];
}

export const MBTI_TYPES: Record<string, MbtiTypeInfo> = {
  ISTJ: {
    nickname: 'The Logistician',
    summary:
      'Reliable, systematic, and true to your word. You like clarity, respect the rules, and see assigned work through to the end.',
    atWork: [
      'Precise with processes, numbers, and deadlines — a deadline is a commitment to you',
      'The team’s steady anchor during busy stretches',
      'Often a fit for operations, quality control, and analysis',
    ],
  },
  ISFJ: {
    nickname: 'The Defender',
    summary:
      'Thoughtful, persistent, and attentive to both the details of the work and the feelings of the people around you. You quietly keep everything running smoothly.',
    atWork: [
      'Remembers every detail — the team’s dependable backbone',
      'Devoted to customers and colleagues alike',
      'Often a fit for customer service, HR, and operations coordination',
    ],
  },
  INFJ: {
    nickname: 'The Advocate',
    summary:
      'Insightful, far-sighted, and purpose-driven. You connect the big picture to real people, and want your work to mean something.',
    atWork: [
      'Sees the long-term direction and persuades others to come along',
      'A great listener — people trust you with what matters',
      'Often a fit for strategy, consumer insight, and people development',
    ],
  },
  INTJ: {
    nickname: 'The Architect',
    summary:
      'Independent, systems-minded, and always working to a long-term plan. You like improving everything to run more efficiently, even when it means going against the crowd.',
    atWork: [
      'Strong at building frameworks and optimizing systems',
      'Sets a high bar for yourself and for the solution',
      'Often a fit for strategy, analysis, and process improvement',
    ],
  },
  ISTP: {
    nickname: 'The Virtuoso',
    summary:
      'Calm, pragmatic, and great in a crisis. You learn fastest by getting hands-on and dissecting problems down to the root.',
    atWork: [
      'Reacts fast and stays clear-headed when things break',
      'Prefers autonomy — no need for close supervision',
      'Often a fit for operations, technical roles, and troubleshooting',
    ],
  },
  ISFP: {
    nickname: 'The Adventurer',
    summary:
      'Gentle, refined, and guided by your own values. You notice the small details that make experiences beautiful for other people.',
    atWork: [
      'Sensitive to aesthetics and user experience',
      'Easy-going and collaborative in small teams',
      'Often a fit for design, brand, and customer care',
    ],
  },
  INFP: {
    nickname: 'The Mediator',
    summary:
      'Full of inspiration and loyal to your personal values. You do your best work when it touches something you truly believe in.',
    atWork: [
      'Writes and tells stories with real depth',
      'Persistent on meaningful projects, even when they get hard',
      'Often a fit for content, brand, and community / CSR projects',
    ],
  },
  INTP: {
    nickname: 'The Logician',
    summary:
      'Curious, logical, and driven to understand things down to the roots. You ask the "why" questions everyone else skips.',
    atWork: [
      'Sharp analysis — spots logical gaps fast',
      'Loves hard problems and room to dig deep independently',
      'Often a fit for data, research, and product',
    ],
  },
  ESTP: {
    nickname: 'The Entrepreneur',
    summary:
      'Quick, practical, and great at seizing opportunities. You think on your feet and don’t flinch under direct pressure.',
    atWork: [
      'Strong negotiator — handles situations on the spot',
      'Brings “do it now” energy to the team',
      'Often a fit for sales, field work, and fast-paced operations',
    ],
  },
  ESFP: {
    nickname: 'The Entertainer',
    summary:
      'Enthusiastic, sociable, and radiating positive energy. You make teamwork more fun and customers feel welcome.',
    atWork: [
      'Connects naturally with customers and colleagues',
      'Learns fast through real-world experience',
      'Often a fit for events, sales, and field marketing',
    ],
  },
  ENFP: {
    nickname: 'The Campaigner',
    summary:
      'Creative, idea-rich, and a natural connector of people. You see potential in everything — and in everyone.',
    atWork: [
      'Powerful brainstormer and project starter',
      'Re-energizes the team when ideas run dry',
      'Often a fit for marketing, brand, and kicking off new projects',
    ],
  },
  ENTP: {
    nickname: 'The Debater',
    summary:
      'Quick-witted, eager to challenge the status quo, and unafraid to think differently. You genuinely enjoy turning a problem over and over.',
    atWork: [
      'Sharp counter-arguments — sees the angle no one else saw',
      'Thrives on innovation, allergic to repetition',
      'Often a fit for strategy, growth, and innovation',
    ],
  },
  ESTJ: {
    nickname: 'The Executive',
    summary:
      'Decisive, well-organized, and efficiency-minded. You naturally step up to set the pace when the group needs a leader.',
    atWork: [
      'Plans and delegates clearly, tracks progress closely',
      'Makes fast, fact-based decisions',
      'Often a fit for operations management, project lead, and commercial roles',
    ],
  },
  ESFJ: {
    nickname: 'The Consul',
    summary:
      'Warm, attentive, and the glue that keeps a group together. You sense what others need and love creating an environment where everyone belongs.',
    atWork: [
      'Smooth internal coordination, skilful customer care',
      'Keeps team morale steady',
      'Often a fit for HR, customer service, and account roles',
    ],
  },
  ENFJ: {
    nickname: 'The Protagonist',
    summary:
      'Inspiring, people-smart, and able to pull everyone in the same direction. Developing others comes naturally to you.',
    atWork: [
      'Leads through inspiration and trust',
      'Strong presenter and group facilitator',
      'Often a fit for team lead, training, and client-facing roles',
    ],
  },
  ENTJ: {
    nickname: 'The Commander',
    summary:
      'Driven, strategic, and built to carry big goals. You see the most efficient path and organize the resources to get there.',
    atWork: [
      'Sets ambitious targets and pulls the whole team into your rhythm',
      'Makes firm decisions under pressure',
      'Often a fit for leadership tracks, consulting, and commercial roles',
    ],
  },
};

export function scoreMbti(answers: Record<string, 'A' | 'B'>): {
  type: string;
  counts: Record<MbtiLetter, number>;
} {
  const counts: Record<MbtiLetter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  MBTI_ITEMS.forEach((item) => {
    const pick = answers[item.id];
    if (pick === 'A') counts[item.a.letter] += 1;
    else if (pick === 'B') counts[item.b.letter] += 1;
  });
  // 5 items per dichotomy = no ties possible; >= keeps it deterministic anyway.
  const type =
    (counts.E >= counts.I ? 'E' : 'I') +
    (counts.S >= counts.N ? 'S' : 'N') +
    (counts.T >= counts.F ? 'T' : 'F') +
    (counts.J >= counts.P ? 'J' : 'P');
  return { type, counts };
}

// --- Persistence helpers -----------------------------------------------------

function parseJsonValue(value: any): any {
  if (value == null) return null;
  if (typeof value === 'object') return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
  return null;
}

export interface CorporatePayload {
  version: number;
  answers: Record<string, number>;
  preferences: Record<AxisKey, number>;
  results: CompanyFitResult[];
  computed_at: string;
}

export interface MbtiPayload {
  version: number;
  answers: Record<string, 'A' | 'B'>;
  counts: Record<MbtiLetter, number>;
  type: string;
  computed_at: string;
}

const DISMISSED_KEY = 'casemate-culturefit-dismissed-v1';

// DB rows → company profiles (highest id per slug wins so the founder can
// supersede a vector by adding a newer row). Falls back to the locked
// constants while the table is still empty/loading, so matching is never
// blocked. Shared by this section AND the v1.3 popup save path in
// AgentChatView — one derivation, one behavior.
export function companiesFromDbRows(rows: any[] | null | undefined): CompanyProfile[] {
  const list = Array.isArray(rows) ? rows : [];
  const bySlug: Record<string, any> = {};
  list.forEach((r) => {
    const slug = String((r && r.slug) || '');
    if (!slug || bySlug[slug]) return; // rows arrive id desc — first wins
    bySlug[slug] = r;
  });
  const fromDb = Object.keys(bySlug).map((slug) => {
    const r = bySlug[slug];
    const num = (v: any, fallback: number) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : fallback;
    };
    return {
      slug,
      company: String(r.company || slug),
      vector: {
        innovation: num(r.innovation, 3),
        detail: num(r.detail, 3),
        results: num(r.results, 3),
        competitive: num(r.competitive, 3),
        supportive: num(r.supportive, 3),
        teamwork: num(r.teamwork, 3),
        reward_development: num(r.reward_development, 3),
        reward_compensation: num(r.reward_compensation, 3),
        // Nullable 9th axis: NULL (or anything non-numeric) stays null so the
        // fit % computes over the 8 core axes — never a silent 0.
        work_life_balance:
          r.work_life_balance == null || !Number.isFinite(Number(r.work_life_balance))
            ? null
            : Number(r.work_life_balance),
      },
      note: r.note ? String(r.note) : null,
      displayOrder: num(r.display_order, 99),
    } as CompanyProfile;
  });
  return fromDb.length > 0 ? fromDb : LOCKED_COMPANY_PROFILES;
}

// --- v1.3 unified questionnaire groups ---------------------------------------
// Rendered INSIDE the floating MCQ popup (AgentChatView), between the required
// gap-fill questions and the single "Send my answers" button, so corporate-fit
// and MBTI are answered in the SAME pass — one questionnaire, one send. Both
// groups are OPTIONAL: leaving a group untouched (or partially filled) never
// blocks the submit — the free matching runs either way, and unanswered groups
// simply show "not filled in" on the result card. Answer state lives in the PARENT
// so taps survive popup minimize/close, CV replacement, and form remounts.
export function CultureFitQuestionGroups({
  ocpAnswers,
  onOcpAnswer,
  mbtiAnswers,
  onMbtiAnswer,
  locked,
}: {
  ocpAnswers: Record<string, number>;
  onOcpAnswer: (id: string, value: number) => void;
  mbtiAnswers: Record<string, 'A' | 'B'>;
  onMbtiAnswer: (id: string, choice: 'A' | 'B') => void;
  locked: boolean;
}) {
  const [ocpOpen, setOcpOpen] = useState(true);
  const [mbtiOpen, setMbtiOpen] = useState(true);
  const ocpAnswered = OCP_ITEMS.filter((i) => typeof ocpAnswers[i.id] === 'number').length;
  const mbtiAnswered = MBTI_ITEMS.filter(
    (i) => mbtiAnswers[i.id] === 'A' || mbtiAnswers[i.id] === 'B',
  ).length;
  const ocpPartial = ocpAnswered > 0 && ocpAnswered < OCP_ITEMS.length;
  const mbtiPartial = mbtiAnswered > 0 && mbtiAnswered < MBTI_ITEMS.length;

  const groupHeader = (
    part: string,
    title: string,
    answered: number,
    total: number,
    open: boolean,
    onToggle: () => void,
    testId: string,
  ) => (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-2 rounded-xl px-1 py-1 text-left"
      data-testid={testId}
    >
      <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-brand)]">
        {part}
      </span>
      <span className="min-w-0 flex-1 text-xs font-semibold uppercase tracking-wide text-[var(--space-text-secondary)]">
        {title}
      </span>
      <span
        className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
          answered === total
            ? 'bg-[var(--space-semantic-success-50)] text-[var(--space-semantic-success-700)]'
            : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'
        }`}
      >
        {answered === total ? 'Done ✓' : `Optional · ${answered}/${total}`}
      </span>
      <ChevronDown
        className={`h-4 w-4 flex-shrink-0 text-[var(--space-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );

  return (
    <div className="space-y-3" data-testid="culture-question-groups">
      {/* --- Part 2 · Corporate fit (OCP self-rating) --- */}
      <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] px-3 py-2.5">
        {groupHeader(
          'Part 2',
          'Company culture fit',
          ocpAnswered,
          OCP_ITEMS.length,
          ocpOpen,
          () => setOcpOpen((v) => !v),
          'toggle-ocp-group',
        )}
        {ocpOpen && (
          <div className="mt-2">
            <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">
              OPTIONAL — choose a rating from 1 to 5 using the two descriptions below each statement.
              Complete all items to see your culture fit with <strong>Unilever, Maersk, and Techcombank</strong>;
              you will still receive your full main result if you skip this section.
            </p>
            <div className="mt-2 space-y-2">
              {OCP_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2.5"
                >
                  <p className="text-sm leading-5 text-[var(--space-text-primary)]">
                    <span className="mr-1 font-semibold text-[var(--space-text-brand)]">{idx + 1}.</span>
                    {item.text}
                  </p>
                  <div className="mt-2 flex justify-center">
                    <div className="flex w-full max-w-xs justify-between gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          type="button"
                          disabled={locked}
                          onClick={() => onOcpAnswer(item.id, v)}
                          aria-label={`${v}${v === 1 ? ` — ${OCP_ANCHORS[item.axis].low}` : v === 5 ? ` — ${OCP_ANCHORS[item.axis].high}` : ''}`}
                          aria-pressed={ocpAnswers[item.id] === v}
                          className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                            ocpAnswers[item.id] === v
                              ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                              : 'border-[var(--space-border-strong)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)]'
                          } ${locked ? 'cursor-default opacity-60' : ''}`}
                          data-testid={`ocp-rate-${item.id}-${v}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-3 text-[10px] font-medium leading-4 text-[var(--space-text-muted)]">
                    <p><strong className="text-[var(--space-text-brand)]">1 · </strong>{OCP_ANCHORS[item.axis].low}</p>
                    <p className="text-right"><strong className="text-[var(--space-text-brand)]">5 · </strong>{OCP_ANCHORS[item.axis].high}</p>
                  </div>
                </div>
              ))}
            </div>
            {ocpPartial && (
              <p className="mt-2 rounded-lg border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] px-2.5 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                Answer all {OCP_ITEMS.length}/{OCP_ITEMS.length} items to calculate your culture fit,
                or leave this whole section blank to skip it; your main result will not be affected.
              </p>
            )}
          </div>
        )}
      </div>

      {/* --- Part 3 · MBTI working style --- */}
      <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] px-3 py-2.5">
        {groupHeader(
          'Part 3',
          'Working style (MBTI)',
          mbtiAnswered,
          MBTI_ITEMS.length,
          mbtiOpen,
          () => setMbtiOpen((v) => !v),
          'toggle-mbti-group',
        )}
        {mbtiOpen && (
          <div className="mt-2">
            <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">
              OPTIONAL — {MBTI_ITEMS.length} questions; choose the behavior that sounds more like you each time.
              The result describes your working style in four letters. It is a self-discovery tool, not a
              test or career verdict.
            </p>
            <div className="mt-2 space-y-2">
              {MBTI_ITEMS.map((item, idx) => {
                const dimension = MBTI_DIMENSIONS[item.dichotomy];
                const startsDimension = idx === 0 || MBTI_ITEMS[idx - 1].dichotomy !== item.dichotomy;
                return (
                  <div key={item.id} className="space-y-2">
                    {startsDimension && (
                      <div className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
                        <p className="text-xs font-bold text-[var(--space-text-primary)]">{dimension.label}</p>
                        <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">{dimension.intro}</p>
                        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                          <p className="rounded-lg bg-[var(--space-surface-card)] p-2 text-[11px] leading-4 text-[var(--space-text-secondary)]">{dimension.a}</p>
                          <p className="rounded-lg bg-[var(--space-surface-card)] p-2 text-[11px] leading-4 text-[var(--space-text-secondary)]">{dimension.b}</p>
                        </div>
                      </div>
                    )}
                    <div className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2.5">
                      <p className="text-sm leading-5 text-[var(--space-text-primary)]">
                        <span className="mr-1 font-semibold text-[var(--space-text-brand)]">{idx + 1}.</span>
                        {item.question}
                      </p>
                      <div className="mt-2 space-y-1.5">
                        {(
                          [
                            ['A', item.a.text],
                            ['B', item.b.text],
                          ] as const
                        ).map(([choice, text]) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={locked}
                            onClick={() => onMbtiAnswer(item.id, choice)}
                            className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                              mbtiAnswers[item.id] === choice
                                ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-primary)]'
                                : 'border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)]'
                            } ${locked ? 'cursor-default opacity-60' : ''}`}
                            data-testid={`mbti-pick-${item.id}-${choice}`}
                          >
                            {text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {mbtiPartial && (
              <p className="mt-2 rounded-lg border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] px-2.5 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                Answer all {MBTI_ITEMS.length}/{MBTI_ITEMS.length} questions to receive your MBTI result, or leave
                this whole section blank to skip it; your main result will not be affected.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Small UI pieces ---------------------------------------------------------

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4">
      {children}
    </div>
  );
}

function FitBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
      <div
        className="h-full rounded-full bg-[var(--space-brand-primary)] transition-all"
        style={{ width: `${Math.max(4, Math.min(100, percent))}%` }}
      />
    </div>
  );
}

// --- Corporate-fit sub-views -------------------------------------------------

function CorporateQuiz({
  onSubmit,
  onCancel,
  saving,
}: {
  onSubmit: (answers: Record<string, number>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answered = OCP_ITEMS.filter((i) => answers[i.id]).length;
  const complete = answered === OCP_ITEMS.length;

  return (
    <div>
      <p className="text-xs text-[var(--space-text-muted)]">
        For each statement, choose a rating from 1 to 5 using the descriptions at either end of the scale.
        There is no right or wrong answer — choose what best reflects how you work.
      </p>
      <div className="mt-3 space-y-3">
        {OCP_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] p-3"
          >
            <p className="text-sm text-[var(--space-text-primary)]">
              <span className="mr-1 font-semibold text-[var(--space-text-brand)]">{idx + 1}.</span>
              {item.text}
            </p>
            <div className="mt-2 flex justify-center">
              <div className="flex w-full max-w-xs justify-between gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: v }))}
                    aria-label={`${v}${v === 1 ? ` — ${OCP_ANCHORS[item.axis].low}` : v === 5 ? ` — ${OCP_ANCHORS[item.axis].high}` : ''}`}
                    aria-pressed={answers[item.id] === v}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                      answers[item.id] === v
                        ? 'border-[var(--space-brand-primary)] bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]'
                        : 'border-[var(--space-border-strong)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-3 text-[10px] font-medium leading-4 text-[var(--space-text-muted)]">
              <p><strong className="text-[var(--space-text-brand)]">1 · </strong>{OCP_ANCHORS[item.axis].low}</p>
              <p className="text-right"><strong className="text-[var(--space-text-brand)]">5 · </strong>{OCP_ANCHORS[item.axis].high}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-2 text-xs font-medium text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]"
        >
          Maybe later
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--space-text-muted)]">
            {answered}/{OCP_ITEMS.length} answered
          </span>
          <button
            type="button"
            disabled={!complete || saving}
            onClick={() => onSubmit(answers)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            See my result
          </button>
        </div>
      </div>
    </div>
  );
}

function CorporateResults({ payload }: { payload: CorporatePayload }) {
  return (
    <div className="space-y-3">
      {payload.results.map((r, idx) => (
        <div
          key={r.slug}
          className="rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-xs font-bold text-[var(--space-text-brand)]">
                {idx + 1}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
                <Building2 className="h-4 w-4 text-[var(--space-text-brand)]" />
                {r.company}
              </span>
            </div>
            <span className="text-base font-bold text-[var(--space-text-brand)]">{r.fit}%</span>
          </div>
          <div className="mt-2">
            <FitBar percent={r.fit} />
          </div>
          {(r.aligned.length > 0 || r.gaps.length > 0) && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {r.aligned.map((a) => (
                <span
                  key={`a-${a.axis}`}
                  className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success)_12%,transparent)] px-2 py-0.5 text-[11px] font-medium text-[var(--space-semantic-success)]"
                >
                  Match: {AXIS_LABEL[a.axis]}
                </span>
              ))}
              {r.gaps.map((g) => (
                <span
                  key={`g-${g.axis}`}
                  className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-warning)_12%,transparent)] px-2 py-0.5 text-[11px] font-medium text-[var(--space-semantic-warning)]"
                >
                  Gap: {AXIS_LABEL[g.axis]}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]">{r.why}</p>
          {r.note && (
            <div className="mt-2 rounded-lg border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] p-2.5 text-[11px] leading-5 text-[var(--space-text-secondary)]">
            {r.note}
            </div>
          )}
        </div>
      ))}
      <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">
        The % shows how CLOSE your preferences sit to each company’s culture across up to 9 value
        dimensions — including work-life balance & flexibility where the Casemate team has verified that
        score for a company (companies without it are compared on their 8 verified dimensions). Use it to
        explore and ask questions, not as a verdict — and treat culture as the supporting signal: weigh a
        program’s compensation and development path first, then use this % as the tie-breaker
        between otherwise similar options.
      </p>
    </div>
  );
}

// --- MBTI sub-views ----------------------------------------------------------

function MbtiQuiz({
  onSubmit,
  onCancel,
  saving,
}: {
  onSubmit: (answers: Record<string, 'A' | 'B'>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B'>>({});
  const [idx, setIdx] = useState(0);
  const item = MBTI_ITEMS[idx];
  const total = MBTI_ITEMS.length;

  const pick = (choice: 'A' | 'B') => {
    const next = { ...answers, [item.id]: choice };
    setAnswers(next);
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else if (Object.keys(next).length === total) {
      onSubmit(next);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-[var(--space-text-muted)]">
          Question {idx + 1}/{total}
        </span>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-2 py-1 text-xs font-medium text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]"
        >
          Maybe later
        </button>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
        <div
          className="h-full rounded-full bg-[var(--space-brand-primary)] transition-all"
          style={{ width: `${Math.round(((idx + 1) / total) * 100)}%` }}
        />
      </div>
      <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3">
        <p className="text-xs font-bold text-[var(--space-text-primary)]">{MBTI_DIMENSIONS[item.dichotomy].label}</p>
        <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">{MBTI_DIMENSIONS[item.dichotomy].intro}</p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          <p className="rounded-lg bg-[var(--space-surface-card)] p-2 text-[11px] leading-4 text-[var(--space-text-secondary)]">{MBTI_DIMENSIONS[item.dichotomy].a}</p>
          <p className="rounded-lg bg-[var(--space-surface-card)] p-2 text-[11px] leading-4 text-[var(--space-text-secondary)]">{MBTI_DIMENSIONS[item.dichotomy].b}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-[var(--space-text-primary)]">{item.question}</p>
      <div className="mt-2 space-y-2">
        {(
          [
            ['A', item.a.text],
            ['B', item.b.text],
          ] as const
        ).map(([choice, text]) => (
          <button
            key={choice}
            type="button"
            disabled={saving}
            onClick={() => pick(choice)}
            className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm transition ${
              answers[item.id] === choice
                ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-primary)]'
                : 'border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)]'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      {idx > 0 && (
        <button
          type="button"
          onClick={() => setIdx(idx - 1)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--space-text-muted)] hover:text-[var(--space-text-secondary)]"
        >
          <ArrowLeft className="h-3 w-3" /> Previous question
        </button>
      )}
      {saving && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--space-text-muted)]">
          <Loader2 className="h-3 w-3 animate-spin" /> Working out your result…
        </p>
      )}
    </div>
  );
}

function MbtiResult({ payload }: { payload: MbtiPayload }) {
  const info = MBTI_TYPES[payload.type];
  const pairs: Array<[MbtiLetter, MbtiLetter]> = [
    ['E', 'I'],
    ['S', 'N'],
    ['T', 'F'],
    ['J', 'P'],
  ];
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-1.5 text-xl font-bold tracking-widest text-[var(--space-text-on-primary)]">
          {payload.type}
        </span>
        {info && (
          <span className="text-sm font-semibold text-[var(--space-text-primary)]">{info.nickname}</span>
        )}
      </div>
      {info && (
        <>
          <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{info.summary}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">
            At work
          </p>
          <ul className="mt-1 space-y-1">
            {info.atWork.map((line, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-[var(--space-text-secondary)]">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-semantic-success)]" />
                {line}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {pairs.map(([l, r]) => {
          const lc = payload.counts[l] || 0;
          const rc = payload.counts[r] || 0;
          const winner = lc >= rc ? l : r;
          return (
            <span
              key={l + r}
              className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--space-text-secondary)]"
            >
              <strong className="text-[var(--space-text-brand)]">{winner}</strong> {l} {lc} · {r} {rc}
            </span>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] leading-4 text-[var(--space-text-muted)]">
        MBTI is a SELF-DISCOVERY tool for your working style — the result suggests how you tend to
        recharge, decide, and organize work. It is never a verdict that "you can't do job X" — every
        type has people succeeding in every industry.
      </p>
    </div>
  );
}

// --- Main section -------------------------------------------------------------

export function CultureFitSection({
  canSend,
  onAskMate,
}: {
  canSend: boolean;
  onAskMate: (message: string) => void;
}) {
  const identity = useMemo(readIdentity, []);

  // v1.5 per-conversation isolation: this section renders under a specific
  // conversation's direction card, so its saved results are scoped to that
  // conversation via conversation_state_claims — the same mapping
  // AgentChatView uses. Rows without a claim (pre-v1.5 data) belong to the
  // primary conversation, so existing users keep their saved results there;
  // they just never leak into a NEW conversation.
  const [activeThreadId] = useState<string>(() => {
    try {
      const t = (window as any).__audosActiveThreadId;
      return typeof t === 'string' && t ? t : 'main';
    } catch (e) {
      return 'main';
    }
  });
  const claimsDb = (window as any).useWorkspaceDB('conversation_state_claims', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: identity.userKey }],
    orderBy: { column: 'id', direction: 'desc' },
    limit: 400,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };
  const [localClaims, setLocalClaims] = useState<Record<string, string>>({});
  const claimOwnerByRow = useMemo(() => {
    const map: Record<string, string> = {};
    const rows = Array.isArray(claimsDb.data) ? claimsDb.data : [];
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i];
      if (r && r.table_name && r.row_id != null && r.thread_id) {
        map[String(r.table_name) + ':' + Number(r.row_id)] = String(r.thread_id);
      }
    }
    Object.keys(localClaims).forEach((k) => {
      map[k] = localClaims[k];
    });
    return map;
  }, [claimsDb.data, localClaims]);
  const rowConversation = (id: unknown) =>
    claimOwnerByRow['culture_fit_results:' + Number(id)] || 'main';
  const claimCultureRowForConversation = (id: number | null | undefined) => {
    if (id == null || !Number.isFinite(Number(id))) return;
    const key = 'culture_fit_results:' + Number(id);
    if (claimOwnerByRow[key]) return;
    setLocalClaims((prev) => (prev[key] ? prev : { ...prev, [key]: activeThreadId }));
    try {
      void (window as any).__workspaceDb?.from('conversation_state_claims').insert({
        table_name: 'culture_fit_results',
        row_id: Number(id),
        thread_id: activeThreadId,
        user_key: identity.userKey,
      });
    } catch (e) {
      // The local claim still scopes this page view.
    }
  };

  // Saved results for THIS user (account-keyed, so they follow the email
  // across devices). Read shared + filtered by user_key — newest row per
  // kind wins, scoped to the active conversation (v1.5).
  const savedDb = (window as any).useWorkspaceDB('culture_fit_results', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: identity.userKey }],
    orderBy: { column: 'id', direction: 'desc' },
    limit: 20,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };

  // Founder-locked company vectors from WorkspaceDB (source of truth).
  const companiesDb = (window as any).useWorkspaceDB('culture_company_profiles', {
    shared: true,
    orderBy: { column: 'id', direction: 'desc' },
    limit: 30,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };

  // One-time idempotent seed of the locked vectors (only when the table is
  // confirmed empty). The unique slug constraint makes a concurrent double
  // seed harmless — the second insert simply fails.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    if (companiesDb.loading || !Array.isArray(companiesDb.data)) return;
    if (companiesDb.data.length > 0) return;
    seededRef.current = true;
    const db = (window as any).__workspaceDb;
    if (!db) return;
    (async () => {
      try {
        for (const c of LOCKED_COMPANY_PROFILES) {
          await db.from('culture_company_profiles').insert({
            slug: c.slug,
            company: c.company,
            innovation: c.vector.innovation,
            detail: c.vector.detail,
            results: c.vector.results,
            competitive: c.vector.competitive,
            supportive: c.vector.supportive,
            teamwork: c.vector.teamwork,
            reward_development: c.vector.reward_development,
            reward_compensation: c.vector.reward_compensation,
            work_life_balance: c.vector.work_life_balance,
            note: c.note,
            display_order: c.displayOrder,
          });
        }
      } catch (e) {
        // Another visitor seeded first (unique slug) — the read below wins.
      }
      try {
        companiesDb.refresh?.();
      } catch (e) {
        // Next natural refresh picks it up.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesDb.loading, companiesDb.data]);

  // DB rows → company profiles (shared derivation with the v1.3 popup save
  // path — see companiesFromDbRows above).
  const companies: CompanyProfile[] = useMemo(
    () => companiesFromDbRows(companiesDb.data),
    [companiesDb.data],
  );

  // Newest saved payload per kind (freshly saved local state wins so the
  // result shows instantly, before the read-back).
  const [localCorporate, setLocalCorporate] = useState<CorporatePayload | null>(null);
  const [localMbti, setLocalMbti] = useState<MbtiPayload | null>(null);
  const savedRows = Array.isArray(savedDb.data) ? savedDb.data : [];
  const savedCorporate = useMemo<CorporatePayload | null>(() => {
    const row = savedRows.find(
      (r) => r && r.kind === 'corporate' && rowConversation(r.id) === activeThreadId,
    );
    const payload = row ? parseJsonValue(row.payload_json) : null;
    return payload && Array.isArray(payload.results) && payload.results.length > 0 ? payload : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedDb.data, claimOwnerByRow, activeThreadId]);
  const savedMbti = useMemo<MbtiPayload | null>(() => {
    const row = savedRows.find(
      (r) => r && r.kind === 'mbti' && rowConversation(r.id) === activeThreadId,
    );
    const payload = row ? parseJsonValue(row.payload_json) : null;
    return payload && typeof payload.type === 'string' && payload.type.length === 4 ? payload : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedDb.data, claimOwnerByRow, activeThreadId]);
  const corporate = localCorporate || savedCorporate;
  const mbti = localMbti || savedMbti;

  // View state per part.
  const [corporateView, setCorporateView] = useState<'idle' | 'quiz'>('idle');
  const [mbtiView, setMbtiView] = useState<'idle' | 'quiz'>('idle');
  const [saving, setSaving] = useState<'corporate' | 'mbti' | null>(null);
  const [saveWarning, setSaveWarning] = useState<string | null>(null);

  // Optional/skippable: dismissing collapses the whole section to a slim
  // re-openable pill. Once any result exists, the section shows results
  // instead (never re-nags with the intro).
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(DISMISSED_KEY);
    } catch (e) {
      return false;
    }
  });
  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch (e) {
      // Private mode — collapse lasts for this page load only.
    }
  };
  const reopen = () => {
    setDismissed(false);
    try {
      localStorage.removeItem(DISMISSED_KEY);
    } catch (e) {
      // ignore
    }
  };

  const persist = async (kind: 'corporate' | 'mbti', payload: CorporatePayload | MbtiPayload) => {
    setSaveWarning(null);
    const db = (window as any).__workspaceDb;
    try {
      if (!db) throw new Error('workspace db unavailable');
      const res = await db.from('culture_fit_results').insert({
        user_key: identity.userKey,
        email: identity.email,
        kind,
        payload_json: payload,
        mbti_type: kind === 'mbti' ? (payload as MbtiPayload).type : null,
      });
      // v1.5: bind the saved result to THIS conversation.
      const row = res && ((Array.isArray(res.data) ? res.data[0] : res.data) || res.row || res);
      if (row && row.id != null) claimCultureRowForConversation(Number(row.id));
      try {
        savedDb.refresh?.();
      } catch (e) {
        // Read-back refresh is best-effort; local state already shows it.
      }
    } catch (e) {
      setSaveWarning(
        'Your result is showing here but could NOT be saved to your profile — check your connection and redo it to save.',
      );
    }
  };

  const submitCorporate = async (answers: Record<string, number>) => {
    setSaving('corporate');
    const preferences = computePreferences(answers);
    const payload: CorporatePayload = {
      version: 2, // v2 = 9-axis preference vector (adds work_life_balance)
      answers,
      preferences,
      results: rankCompanies(preferences, companies),
      computed_at: new Date().toISOString(),
    };
    setLocalCorporate(payload);
    setCorporateView('idle');
    await persist('corporate', payload);
    setSaving(null);
  };

  const submitMbti = async (answers: Record<string, 'A' | 'B'>) => {
    setSaving('mbti');
    const { type, counts } = scoreMbti(answers);
    const payload: MbtiPayload = {
      version: 1,
      answers,
      counts,
      type,
      computed_at: new Date().toISOString(),
    };
    setLocalMbti(payload);
    setMbtiView('idle');
    await persist('mbti', payload);
    setSaving(null);
  };

  const askMate = () => {
    const parts: string[] = [];
    if (corporate) {
      parts.push(
        'my company culture-fit results: ' +
          corporate.results.map((r) => `${r.company} ${r.fit}%`).join(' · '),
      );
    }
    if (mbti) parts.push(`my MBTI type is ${mbti.type}`);
    if (parts.length === 0) return;
    onAskMate(`I just did the culture-fit section — ${parts.join('; ')}. Could you analyze it further for me?`);
  };

  const hasAnyResult = !!corporate || !!mbti;
  const quizOpen = corporateView === 'quiz' || mbtiView === 'quiz';

  // Collapsed pill (skipped, nothing completed yet, no quiz mid-flight).
  if (dismissed && !hasAnyResult && !quizOpen) {
    return (
      <button
        type="button"
        onClick={reopen}
        className="mt-1 inline-flex items-center gap-2 rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3.5 py-1.5 text-xs font-medium text-[var(--space-text-secondary)] transition hover:border-[var(--space-brand-primary-500)] hover:text-[var(--space-text-brand)]"
        data-testid="culture-fit-reopen"
      >
        <Compass className="h-3.5 w-3.5" />
        Explore more: company culture fit & working style
      </button>
    );
  }

  return (
    <div data-testid="culture-fit-section">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
            <Compass className="h-4 w-4 text-[var(--space-text-brand)]" />
            Explore more: which company cultures fit you & your working style
          </p>
          <p className="mt-0.5 text-xs text-[var(--space-text-muted)]">
            Completely OPTIONAL and free — your direction result above doesn’t change whether you do or
            skip this. These two question groups are part of the initial questionnaire — this section is
            for reviewing the details, catching up if you skipped them, or redoing them.
          </p>
        </div>
        {!hasAnyResult && !quizOpen && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss the culture fit section"
            className="rounded-lg p-1 text-[var(--space-text-muted)] transition hover:text-[var(--space-text-secondary)]"
            data-testid="culture-fit-dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {saveWarning && (
        <p className="mt-2 rounded-lg border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] px-3 py-2 text-xs text-[var(--space-text-secondary)]">
          {saveWarning}
        </p>
      )}

      {/* Part 1 — Corporate fit */}
      <SectionCard>
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
            <Building2 className="h-4 w-4 text-[var(--space-text-brand)]" />
            Company culture fit
          </p>
          {corporate && corporateView === 'idle' && (
            <button
              type="button"
              onClick={() => setCorporateView('quiz')}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--space-text-brand)] hover:bg-[var(--space-surface-muted)]"
            >
              <RotateCcw className="h-3 w-3" /> Redo
            </button>
          )}
        </div>
        {corporateView === 'quiz' ? (
          <div className="mt-2">
            <CorporateQuiz
              onSubmit={(answers) => void submitCorporate(answers)}
              onCancel={() => setCorporateView('idle')}
              saving={saving === 'corporate'}
            />
          </div>
        ) : corporate ? (
          <div className="mt-2">
            <CorporateResults payload={corporate} />
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
              11 quick questions about the environment you prefer (innovation, precision, results,
              competitiveness, people, teamwork, the rewards you value, and work-life balance &
              flexibility) → matched against the real
              cultures of <strong>Unilever, Maersk, and Techcombank</strong> (profiles verified by the
              Casemate team) — with the reasons why you fit / don’t fit yet.
            </p>
            <button
              type="button"
              onClick={() => setCorporateView('quiz')}
              disabled={savedDb.loading}
              className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-60`}
              data-testid="culture-fit-start-corporate"
            >
              {savedDb.loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              Start (~2 min)
            </button>
          </div>
        )}
      </SectionCard>

      {/* Part 2 — MBTI job-fit */}
      <SectionCard>
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
            <Compass className="h-4 w-4 text-[var(--space-text-brand)]" />
            Your working style (MBTI)
          </p>
          {mbti && mbtiView === 'idle' && (
            <button
              type="button"
              onClick={() => setMbtiView('quiz')}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--space-text-brand)] hover:bg-[var(--space-surface-muted)]"
            >
              <RotateCcw className="h-3 w-3" /> Redo
            </button>
          )}
        </div>
        {mbtiView === 'quiz' ? (
          <div className="mt-2">
            <MbtiQuiz
              onSubmit={(answers) => void submitMbti(answers)}
              onCancel={() => setMbtiView('idle')}
              saving={saving === 'mbti'}
            />
          </div>
        ) : mbti ? (
          <div className="mt-2">
            <MbtiResult payload={mbti} />
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
              20 pick-one-of-two questions → your 4-letter type (ENTJ, INFP…) and how it usually shows
              up at work. A fun self-discovery exercise — not a test.
            </p>
            <button
              type="button"
              onClick={() => setMbtiView('quiz')}
              disabled={savedDb.loading}
              className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-60`}
              data-testid="culture-fit-start-mbti"
            >
              {savedDb.loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              Start (~3 min)
            </button>
          </div>
        )}
      </SectionCard>

      {hasAnyResult && (
        <button
          type="button"
          onClick={askMate}
          disabled={!canSend}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3.5 py-2 text-xs font-medium text-[var(--space-text-brand)] transition hover:border-[var(--space-brand-primary-500)] disabled:cursor-not-allowed disabled:opacity-50"
          data-testid="culture-fit-ask-mate"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Ask Mate about this result
        </button>
      )}
    </div>
  );
}

export default CultureFitSection;
