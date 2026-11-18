import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  UserCircle, Users, Target, GraduationCap, Dumbbell, Rocket,
  Route, Flag, Layers, Compass, Megaphone,
  Building2, Trophy, IdCard, Briefcase, Landmark, Clock, Globe2, TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart as RBarChart, Bar,
  PieChart as RPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  PageHeader, Grid, Stack, Card, StatCard, DataTable, Badge, Tabs, Button,
} from 'dashboard-blocks';

interface TemplateProps { workspaceId: string; }

// ---- Casemate brand palette (matches the Funnel Overview dashboard) ----
// Brand red leads interactive / primary emphasis; blue / green / amber / purple for series.
const BRAND = '#e5325b';       // Casemate red
const BLUE = '#0d69b3';
const GREEN = '#009f50';
const AMBER = '#ec8c22';
const PURPLE = '#9b6ba8';
const SLATE = '#64748b';
const COLORS = [BRAND, BLUE, GREEN, AMBER, PURPLE, '#5bb98a'];

// Test / internal accounts to exclude from every persona calculation
const EXCLUDED_EMAILS = [
  'nguyenphianh38@gmail.com',
  'anhntk.fiis@gmail.com',
  'huumanh.forwork@gmail.com',
  'anhduytran5454@gmail.com',
  'minhtriet0509@gmail.com',
  'tuandatnguyen2905@gmail.com',
];
const EXCL_SQL = EXCLUDED_EMAILS.map(e => `'email:${e.replace(/'/g, "''")}'`).join(',');

function num(v: any): number { const n = Number(v); return Number.isFinite(n) ? n : 0; }

function toYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(ymd: string, days: number): string {
  const d = new Date(ymd + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return toYMD(new Date(d.getTime() + d.getTimezoneOffset() * 60000));
}

function fmtDay(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch { return iso; }
}

const FEATURE_LABELS: Record<string, string> = {
  fit: 'Fit Assessment',
  drill_library: 'Case Drill Library',
  practice: 'Practice with Mate',
  domain: 'Domain Knowledge',
  case_pool: 'Case Pool',
  aptitude: 'Aptitude Test',
  platform: 'Platform',
  billing: 'Billing / Paywall',
  roadmap: 'My Roadmap',
};

// Seeded categories for columns that just started tracking (currently all NULL)
const ACQ_CATEGORIES = ['facebook', 'tiktok', 'google', 'friends', 'school_club', 'other'];
const ACQ_LABELS: Record<string, string> = {
  facebook: 'Facebook', tiktok: 'TikTok', google: 'Google', friends: 'Friends',
  school_club: 'School / Club', other: 'Other',
};
const PRIOR_CATEGORIES = ['0', '1-2', '3-5', '6+'];

// ---- Demographics (derived from cv_features, one latest CV per person) ----
const STAGE_ORDER = ['Early', 'Final_year', 'Graduated', 'Year+1', '(unknown)'];
const STAGE_LABELS: Record<string, string> = {
  Early: 'Early student (yr 1-2)',
  Final_year: 'Final-year student',
  Graduated: 'Graduated',
  'Year+1': '1+ yr post-grad',
  '(unknown)': 'Unknown',
};
const TIER_ORDER = ['1', '2', '3', '(unranked)'];
const TIER_LABELS: Record<string, string> = {
  '1': 'Tier 1 (top)', '2': 'Tier 2', '3': 'Tier 3', '(unranked)': 'Unranked',
};
const LEAD_ORDER = ['tier1', 'tier2', 'tier3', 'none'];
const LEAD_LABELS: Record<string, string> = {
  tier1: 'Strong leader', tier2: 'Mid leader', tier3: 'Some leadership', none: 'No leadership',
};
const GPA_ORDER = ['High Distinction', 'Distinction', 'Good', 'Ordinary', '(unknown)'];
const MAIN_CITIES = ['Hanoi', 'Ho Chi Minh City', 'Da Nang'];

// ---- Work & experience helpers ----
function industryFamily(raw: any): string | null {
  if (!raw) return null;
  const s = String(raw).toLowerCase();
  if (/financ|bank|insur|securit|invest|fintech|capital|brokerage/.test(s)) return 'Finance & Banking';
  if (/fmcg|consumer|retail|f&b|fnb|food|beverage|dairy|nutrition|grocery/.test(s)) return 'FMCG & Retail';
  if (/consult|audit|legal|advisor|professional_serv|professional serv/.test(s)) return 'Consulting & Professional';
  if (/tech|e-?commerce|ecommerce|software|\bit\b|information tech|digital|internet|platform|saas|data/.test(s)) return 'Technology & E-commerce';
  if (/real estate|construction|property|proptech|infrastructure/.test(s)) return 'Real Estate & Construction';
  if (/logistic|supply|transport|shipping|aviation|airline|freight/.test(s)) return 'Logistics & Transport';
  if (/pharma|health|medical|hospital|clinic|biotech/.test(s)) return 'Healthcare & Pharma';
  if (/media|entertain|advertis|marketing|\bpr\b|agency|content/.test(s)) return 'Media & Advertising';
  if (/energy|oil|gas|utilit|power|manufactur|industrial|automotive|chemical/.test(s)) return 'Energy & Manufacturing';
  if (/education|nonprofit|non-profit|government|academ|edtech|ngo/.test(s)) return 'Education & Public';
  if (/tourism|hospitality|hotel|travel|restaurant/.test(s)) return 'Tourism & Hospitality';
  if (/telecom|telco|mobile network/.test(s)) return 'Telecom';
  return null;
}

// ---- Canonical function taxonomy (the engine's 8 functions) ----
// Maps a program-specific position / role the user picked (declared_function)
// back to the system's canonical function family — "what function this position belongs to".
const CANONICAL_FUNCTIONS = [
  'Finance & Analytics', 'Marketing & Brand', 'Supply Chain & Operations',
  'Digital & Technology', 'People & HR', 'Strategy & Consulting',
  'Sales & Commercial', 'Retail Operations',
];
function functionFamily(raw: any): string | null {
  if (!raw) return null;
  const s = String(raw).toLowerCase();
  if (CANONICAL_FUNCTIONS.some(f => f.toLowerCase() === s)) {
    return CANONICAL_FUNCTIONS.find(f => f.toLowerCase() === s)!;
  }
  if (/market|brand|content|communicat|\bpr\b|media|advertis/.test(s)) return 'Marketing & Brand';
  if (/retail|store|merchand|modern trade/.test(s)) return 'Retail Operations';
  if (/financ|account|audit|credit|invest|treasur|bank|actuar/.test(s)) return 'Finance & Analytics';
  if (/\bhr\b|human resource|talent|recruit|people|hxm|human experience/.test(s)) return 'People & HR';
  if (/supply|logistic|procure|manufactur|warehouse|planning|operation|customer service|distribut/.test(s)) return 'Supply Chain & Operations';
  if (/data|analytic|\bit\b|software|tech|digital|developer|engineer|\bai\b|product manage/.test(s)) return 'Digital & Technology';
  if (/strateg|consult/.test(s)) return 'Strategy & Consulting';
  if (/sales|commercial|business develop|customer develop|\btrade\b|account manage|\bbusiness\b/.test(s)) return 'Sales & Commercial';
  return null;
}

// ---- Skills / certificates / extracurricular normalisers (from parsed CV JSON) ----
function parseJsonMaybe(v: any): any {
  if (v == null) return null;
  if (typeof v !== 'string') return v;
  try { return JSON.parse(v); } catch { return null; }
}
const LANGUAGE_WORDS = ['english', 'vietnamese', 'chinese', 'japanese', 'korean', 'french', 'german', 'spanish', 'mandarin', 'tiếng anh', 'tiếng việt', 'tiếng trung', 'tiếng nhật', 'tiếng hàn'];
// A skill string that is really a certificate (so we route it to the cert bucket instead)
function looksLikeCert(s: string): boolean {
  return /ielts|toeic|toefl|vstep|pte|duolingo|cambridge|\bmos\b|microsoft office specialist|chứng chỉ|chứng nhận|certificat|certified|\bcfa\b|\bacca\b|\bcpa\b|google .*certif|coursera|aws|scrum|pmp/i.test(s);
}
function normalizeSkill(raw: string): string | null {
  const s = raw.trim();
  if (!s || s.length > 60) return null;
  const l = s.toLowerCase();
  if (LANGUAGE_WORDS.some(w => l === w)) return null;      // languages handled elsewhere
  if (looksLikeCert(s)) return null;                        // route to certs
  if (/excel|spreadsheet/.test(l)) return 'Excel';
  if (/power ?point|slide|thuyết trình/.test(l)) return 'PowerPoint';
  if (/\bword\b|microsoft word/.test(l)) return 'Microsoft Word';
  if (/\bsql\b/.test(l)) return 'SQL';
  if (/python/.test(l)) return 'Python';
  if (/power ?bi|tableau|looker|data stud/.test(l)) return 'Data viz (Power BI / Tableau)';
  if (/canva/.test(l)) return 'Canva';
  if (/photoshop|illustrator|adobe|figma|design/.test(l)) return 'Design tools';
  if (/\bai\b|generative|chatgpt|gen ?ai/.test(l)) return 'AI tools';
  if (/communicat|giao tiếp/.test(l)) return 'Communication';
  if (/leadership|lãnh đạo|lead team/.test(l)) return 'Leadership';
  if (/teamwork|team work|làm việc nhóm|collaborat/.test(l)) return 'Teamwork';
  if (/problem.?solv|giải quyết vấn đề/.test(l)) return 'Problem-solving';
  if (/time manage|quản lý thời gian/.test(l)) return 'Time management';
  if (/analy|phân tích/.test(l)) return 'Analytical thinking';
  if (/research|nghiên cứu/.test(l)) return 'Research';
  if (/negotiat|đàm phán/.test(l)) return 'Negotiation';
  if (/project manage|quản lý dự án/.test(l)) return 'Project management';
  if (/\bsap\b|erp/.test(l)) return 'SAP / ERP';
  if (/ms office|microsoft office|office suite|tin học văn phòng/.test(l)) return 'MS Office';
  // Title-case the raw skill as a fallback, keep it short
  return s.length <= 32 ? s.replace(/\b\w/g, c => c.toUpperCase()) : null;
}
function normalizeCert(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  const l = s.toLowerCase();
  if (/ielts/.test(l)) return 'IELTS';
  if (/toeic/.test(l)) return 'TOEIC';
  if (/toefl/.test(l)) return 'TOEFL';
  if (/vstep/.test(l)) return 'VSTEP';
  if (/duolingo/.test(l)) return 'Duolingo';
  if (/\bpte\b/.test(l)) return 'PTE';
  if (/cambridge|\bfce\b|\bcae\b/.test(l)) return 'Cambridge';
  if (/\bmos\b|microsoft office specialist/.test(l)) return 'MOS (MS Office)';
  if (/\bcfa\b/.test(l)) return 'CFA';
  if (/\bacca\b/.test(l)) return 'ACCA';
  if (/\bcpa\b/.test(l)) return 'CPA';
  if (/google/.test(l)) return 'Google certificate';
  if (/aws|azure|cloud/.test(l)) return 'Cloud (AWS/Azure)';
  if (/scrum|pmp|agile/.test(l)) return 'PM (Scrum/PMP)';
  if (/coursera|udemy|edx/.test(l)) return 'MOOC (Coursera/Udemy)';
  if (/tin học|ứng dụng công nghệ thông tin/.test(l)) return 'IT literacy (VN)';
  if (/chứng chỉ|chứng nhận|certificat|certified/.test(l)) return 'Other certificate';
  return null;
}
// Classify an extracurricular entry (organization + role) into an activity TYPE
function activityType(org: string, role: string): string {
  const s = `${org} ${role}`.toLowerCase();
  if (/đoàn|hội sinh viên|youth union|đảng|advanced youth/.test(s)) return 'Youth Union / Student Assoc.';
  if (/aiesec|sife|enactus|global|international|exchange|model un|\bmun\b/.test(s)) return 'International org (AIESEC…)';
  if (/volunteer|charit|tình nguyện|ngo|community|thiện nguyện|mùa hè xanh/.test(s)) return 'Volunteering / NGO';
  if (/case competition|competition|cuộc thi|contest|challenge|hackathon|datathon/.test(s)) return 'Case / competition club';
  if (/media|truyền thông|content|communicat|\bpr\b|design|photo|film/.test(s)) return 'Media / Communications';
  if (/startup|entrepreneur|khởi nghiệp|founder/.test(s)) return 'Entrepreneurship';
  if (/research|nghiên cứu|academ|scientific|khoa học/.test(s)) return 'Academic / Research';
  if (/sport|thể thao|music|art|dance|nghệ thuật|âm nhạc|câu lạc bộ.*(nhạc|thể)/.test(s)) return 'Sports / Arts';
  if (/mentor|ambassador|đại sứ/.test(s)) return 'Mentorship / Ambassador';
  if (/club|câu lạc bộ|\bclb\b|society|organization|organizing|ban tổ chức/.test(s)) return 'Student club';
  return 'Other activity';
}

function ageFromGradYear(gradYear: number, curYear: number): number {
  return curYear - gradYear + 22;
}
const AGE_ORDER = ['≤19', '20–21', '22–23', '24–25', '26–27', '28+'];
function ageBucket(age: number): string {
  if (age < 20) return '≤19';
  if (age <= 21) return '20–21';
  if (age <= 23) return '22–23';
  if (age <= 25) return '24–25';
  if (age <= 27) return '26–27';
  return '28+';
}
const EXP_ORDER = ['none', 'u1', '1_2', '2_3', '3p'];
const EXP_LABELS: Record<string, string> = {
  none: 'Student · no work yet',
  u1: 'Under 1 year',
  '1_2': '1–2 years',
  '2_3': '2–3 years',
  '3p': '3+ years',
};
function expBucket(months: number): string {
  if (!months || months <= 0) return 'none';
  if (months < 12) return 'u1';
  if (months < 24) return '1_2';
  if (months < 36) return '2_3';
  return '3p';
}
const PROGRAM_TYPE_LABELS: Record<string, string> = {
  'Internship Program': 'Internship',
  'Graduate Program': 'Graduate',
  'Leadership Program': 'Leadership / MT',
  'Management Trainee': 'Leadership / MT',
  '(unmapped)': 'Other / unmapped',
};

const RANK_KEYS = ['1', '2', '3', '4', '5', 'out'];
const RANK_LABELS: Record<string, string> = {
  '1': '#1 pick', '2': '#2 pick', '3': '#3 pick', '4': '#4 pick', '5': '#5 pick',
  out: 'Outside top 5',
};

type Preset = 'mtd' | 'ytd' | 'all' | 'custom';

export function CustomerPersonaDashboard({ workspaceId }: TemplateProps) {
  const today = useMemo(() => toYMD(new Date()), []);
  const monthStart = useMemo(() => today.slice(0, 7) + '-01', [today]);
  const yearStart = useMemo(() => today.slice(0, 4) + '-01-01', [today]);

  const [preset, setPreset] = useState<Preset>('ytd');
  const [start, setStart] = useState(yearStart);
  const [end, setEnd] = useState(today);

  // Layer-1 filter: which journey track the whole cohort is scoped to
  const [track, setTrack] = useState<'validation' | 'discovery'>('validation');

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const [cohortSize, setCohortSize] = useState(0);
  const [resolvedUsers, setResolvedUsers] = useState(0);
  const [sessionUsers, setSessionUsers] = useState(0);

  // Validation track
  const [valCohort, setValCohort] = useState({ validationN: 0, withTarget: 0, withFunction: 0 });
  const [valCompanies, setValCompanies] = useState<any[]>([]);
  const [valPrograms, setValPrograms] = useState<any[]>([]);
  const [valFunctions, setValFunctions] = useState<any[]>([]);       // canonical target function (from chosen position)
  const [programTypes, setProgramTypes] = useState<any[]>([]);
  // CV function -> target function migration
  const [funcTransition, setFuncTransition] = useState({ both: 0, same: 0, changed: 0 });
  const [funcShifts, setFuncShifts] = useState<any[]>([]);

  // Discovery track
  const [disc, setDisc] = useState({ withRecs: 0, converted: 0, convertedInTop5: 0, typicalRank: '' });
  const [recFunctions, setRecFunctions] = useState<any[]>([]);
  const [recPrograms, setRecPrograms] = useState<any[]>([]);
  const [chosenPrograms, setChosenPrograms] = useState<any[]>([]);
  const [rankBands, setRankBands] = useState<any[]>([]);

  // Behaviour
  const [depth, setDepth] = useState<any[]>([]);
  const [loyalty, setLoyalty] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [dau, setDau] = useState<any[]>([]);
  const [acq, setAcq] = useState<any[]>([]);
  const [prior, setPrior] = useState<any[]>([]);

  // Demographics (from cv_features)
  const [demoCoverage, setDemoCoverage] = useState({ people: 0, graduated: 0, tier1: 0 });
  const [demoStage, setDemoStage] = useState<any[]>([]);
  const [demoTier, setDemoTier] = useState<any[]>([]);
  const [demoLead, setDemoLead] = useState<any[]>([]);
  const [demoGpa, setDemoGpa] = useState<any[]>([]);
  const [demoEnglish, setDemoEnglish] = useState<any[]>([]);
  const [demoCity, setDemoCity] = useState<any[]>([]);
  const [demoUni, setDemoUni] = useState<any[]>([]);
  const [demoMajor, setDemoMajor] = useState<any[]>([]);
  // Parsed-CV profile: skills, certificates, extracurricular activity types
  const [cvProfileN, setCvProfileN] = useState(0);
  const [topSkills, setTopSkills] = useState<any[]>([]);
  const [topCerts, setTopCerts] = useState<any[]>([]);
  const [activityTypes, setActivityTypes] = useState<any[]>([]);

  // Work & experience
  const [workCoverage, setWorkCoverage] = useState({ people: 0, avgMonths: 0, withMnc: 0, withTarget: 0 });
  const [expBands, setExpBands] = useState<any[]>([]);
  const [ageBands, setAgeBands] = useState<any[]>([]);
  const [cvFunctions, setCvFunctions] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [companyTypeMix, setCompanyTypeMix] = useState<any[]>([]);
  const [topCompanies, setTopCompanies] = useState<any[]>([]);
  const [mncCompanies, setMncCompanies] = useState<any[]>([]);
  const [industryMatch, setIndustryMatch] = useState<any[]>([]);

  const applyPreset = (p: Preset) => {
    setPreset(p);
    if (p === 'mtd') { setStart(monthStart); setEnd(today); }
    else if (p === 'ytd') { setStart(yearStart); setEnd(today); }
    else if (p === 'all') { setStart('2026-01-01'); setEnd(today); }
  };

  const runSql = useCallback(async (query: string, label: string): Promise<any[]> => {
    try {
      const token = (window as any).__DASHBOARD_AUTH_TOKEN__;
      const r = await fetch(`/api/workspaces/${workspaceId}/db/sql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ query, limit: 500 }),
      });
      if (!r.ok) {
        const t = await r.text();
        throw new Error(t || `HTTP ${r.status}`);
      }
      const json = await r.json();
      return json.rows || [];
    } catch (e: any) {
      setErrors(prev => [...prev, `${label}: ${e.message}`]);
      return [];
    }
  }, [workspaceId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErrors([]);

    const endEx = addDays(end, 1); // exclusive upper bound
    const sessWin = `date >= '${start}' AND date < '${endEx}' AND user_id NOT IN (${EXCL_SQL})`;
    const evtWin = `identity_status='resolved' AND occurred_at >= '${start}' AND occurred_at < '${endEx}' AND user_id NOT IN (${EXCL_SQL})`;
    // Layer-1 track filter: Validation = committed to a specific target (declared_program_id),
    // Discovery = received engine recommendations (rec_top5_programs). The two overlap — they are
    // two lenses on the journey, not mutually exclusive partitions.
    const trackPredicate = track === 'validation'
      ? 'declared_program_id IS NOT NULL'
      : 'rec_top5_programs IS NOT NULL';
    const trackFilter = `user_id IN (SELECT user_id FROM user_profile_features WHERE ${trackPredicate})`;
    // cohort = people active within the selected window (sessions OR events), scoped to the track
    const cohortCTE = `cohort AS (
      SELECT DISTINCT user_id FROM session_tracking WHERE ${sessWin} AND ${trackFilter}
      UNION
      SELECT DISTINCT user_id FROM feature_events WHERE ${evtWin} AND ${trackFilter}
    )`;
    // Demographics: one latest CV per person, restricted to the active cohort
    const demoCTE = `cvf AS (
        SELECT * FROM cv_features WHERE user_id IS NOT NULL AND user_id NOT IN (${EXCL_SQL})
      ), cv_ts AS (
        SELECT user_id, max(submitted_at) AS ts FROM cvf GROUP BY user_id
      ), demo AS (
        SELECT c.* FROM cvf c JOIN cv_ts t ON c.user_id = t.user_id AND c.submitted_at = t.ts
        WHERE c.user_id IN (SELECT user_id FROM cohort)
      )`;

    const Q = {
      cohort: `WITH ${cohortCTE} SELECT count(*) AS n FROM cohort`,
      resolved: `SELECT count(DISTINCT user_id) AS n FROM feature_events WHERE ${evtWin}`,
      sessionUsers: `SELECT count(DISTINCT user_id) AS n FROM session_tracking WHERE ${sessWin}`,
      // ---- Validation track ----
      valCohort: `WITH ${cohortCTE}
        SELECT
          count(*) FILTER (WHERE upf.track_declared='validation' OR upf.declared_program_id IS NOT NULL) AS validation_n,
          count(*) FILTER (WHERE upf.declared_program_id IS NOT NULL) AS with_target,
          count(*) FILTER (WHERE upf.declared_function IS NOT NULL) AS with_function
        FROM user_profile_features upf JOIN cohort c ON c.user_id = upf.user_id`,
      valTargets: `WITH ${cohortCTE}
        SELECT 'company' AS dim, pr.company AS val, count(*) AS n
        FROM user_profile_features upf JOIN cohort c ON c.user_id=upf.user_id
        JOIN programs pr ON pr.program_id=upf.declared_program_id
        WHERE upf.declared_program_id IS NOT NULL GROUP BY pr.company
        UNION ALL
        SELECT 'program', pr.company || ' — ' || pr.program_name, count(*)
        FROM user_profile_features upf JOIN cohort c ON c.user_id=upf.user_id
        JOIN programs pr ON pr.program_id=upf.declared_program_id
        WHERE upf.declared_program_id IS NOT NULL GROUP BY pr.company, pr.program_name
        UNION ALL
        SELECT 'function', upf.declared_function, count(*)
        FROM user_profile_features upf JOIN cohort c ON c.user_id=upf.user_id
        WHERE upf.declared_function IS NOT NULL GROUP BY upf.declared_function
        ORDER BY dim, n DESC`,
      programType: `WITH ${cohortCTE}
        SELECT COALESCE(pr.program_type,'(unmapped)') AS program_type, count(*) AS users
        FROM user_profile_features upf JOIN cohort c ON c.user_id = upf.user_id
        LEFT JOIN programs pr ON pr.program_id = upf.declared_program_id
        WHERE upf.declared_program_id IS NOT NULL
        GROUP BY pr.program_type ORDER BY users DESC`,
      // CV function (background) vs declared target position — for the migration analysis
      funcMigration: `WITH ${cohortCTE}, ${demoCTE}
        SELECT upf.user_id, upf.declared_function, d.function_top1
        FROM user_profile_features upf
        JOIN cohort c ON c.user_id = upf.user_id
        JOIN demo d ON d.user_id = upf.user_id
        WHERE upf.declared_function IS NOT NULL AND d.function_top1 IS NOT NULL`,
      // ---- Discovery track ----
      discRecs: `WITH ${cohortCTE}
        SELECT upf.user_id, upf.declared_program_id, upf.rec_top3_functions, upf.rec_top5_programs
        FROM user_profile_features upf JOIN cohort c ON c.user_id=upf.user_id
        WHERE upf.rec_top5_programs IS NOT NULL`,
      progMap: `SELECT program_id, company, program_name FROM programs`,
      // ---- Behaviour ----
      depth: `WITH per_user AS (SELECT user_id, sum(duration_seconds) AS dur FROM session_tracking WHERE ${sessWin} GROUP BY user_id)
        SELECT CASE WHEN dur < 120 THEN '1. Under 2 min' WHEN dur < 600 THEN '2. 2-10 min'
          WHEN dur < 1800 THEN '3. 10-30 min' WHEN dur < 3600 THEN '4. 30-60 min'
          ELSE '5. Over 60 min' END AS bucket, count(*) AS users
        FROM per_user GROUP BY bucket ORDER BY bucket`,
      loyalty: `WITH per_user AS (SELECT user_id, count(DISTINCT date) AS days FROM session_tracking WHERE ${sessWin} GROUP BY user_id)
        SELECT CASE WHEN days = 1 THEN '1 day' WHEN days <= 3 THEN '2-3 days'
          WHEN days <= 7 THEN '4-7 days' ELSE '8+ days' END AS bucket, count(*) AS users
        FROM per_user GROUP BY bucket ORDER BY bucket`,
      features: `SELECT feature_name, count(DISTINCT user_id) AS users, count(*) AS events
        FROM feature_events WHERE ${evtWin} GROUP BY feature_name ORDER BY users DESC`,
      dau: `SELECT date, count(DISTINCT user_id) AS dau, count(*) AS visits
        FROM session_tracking WHERE ${sessWin} GROUP BY date ORDER BY date`,
      acq: `WITH ${cohortCTE}
        SELECT acq_self_reported AS val, count(*) AS n FROM user_profile_features
        WHERE user_id IN (SELECT user_id FROM cohort) AND acq_self_reported IS NOT NULL
        GROUP BY acq_self_reported`,
      prior: `WITH ${cohortCTE}
        SELECT prior_applications_count AS val, count(*) AS n FROM user_profile_features
        WHERE user_id IN (SELECT user_id FROM cohort) AND prior_applications_count IS NOT NULL
        GROUP BY prior_applications_count`,
      // ---- Demographics ----
      demoCount: `WITH ${cohortCTE}, ${demoCTE}
        SELECT count(*) AS people,
          count(*) FILTER (WHERE stage = 'Graduated') AS graduated,
          count(*) FILTER (WHERE university_tier = 1) AS tier1
        FROM demo`,
      demoCats: `WITH ${cohortCTE}, ${demoCTE}
        SELECT 'stage' AS dim, COALESCE(stage,'(unknown)') AS val, count(*) AS n FROM demo GROUP BY stage
        UNION ALL SELECT 'tier', COALESCE(CAST(university_tier AS text),'(unranked)'), count(*) FROM demo GROUP BY university_tier
        UNION ALL SELECT 'lead', COALESCE(leadership_tier,'none'), count(*) FROM demo GROUP BY leadership_tier
        UNION ALL SELECT 'gpa', COALESCE(gpa_band,'(unknown)'), count(*) FROM demo GROUP BY gpa_band
        UNION ALL SELECT 'english', COALESCE(english_type,'(none)'), count(*) FROM demo GROUP BY english_type
        UNION ALL SELECT 'city', COALESCE(city,'(unknown)'), count(*) FROM demo GROUP BY city
        UNION ALL SELECT 'uni', university, count(*) FROM demo WHERE university IS NOT NULL GROUP BY university
        UNION ALL SELECT 'major', major_group, count(*) FROM demo WHERE major_group IS NOT NULL GROUP BY major_group`,
      workRows: `WITH ${cohortCTE}, ${demoCTE}
        SELECT d.user_id, d.exp_months_total, d.n_mnc_roles, d.grad_year, d.function_top1,
          uc.companies, upf.declared_program_id, pr.program_type, pr.industry AS prog_industry, pr.sector AS prog_sector
        FROM demo d
        JOIN user_cv_profiles uc ON uc.id = d.cv_profile_id
        LEFT JOIN user_profile_features upf ON upf.user_id = d.user_id
        LEFT JOIN programs pr ON pr.program_id = upf.declared_program_id`,
      // Parsed-CV payload for skills / certificates / extracurricular activity types
      cvRich: `WITH ${cohortCTE}, ${demoCTE}
        SELECT d.user_id, uc.skills, uc.raw_cv_text
        FROM demo d JOIN user_cv_profiles uc ON uc.id = d.cv_profile_id`,
    };

    (async () => {
      const [
        cohortRows, resolvedRows, sessRows,
        valCohortRows, valTargetRows, programTypeRows, funcMigrationRows,
        discRows, progMapRows,
        depthRows, loyaltyRows, featureRows, dauRows, acqRows, priorRows,
        demoCountRows, demoCatRows, workRows, cvRichRows,
      ] = await Promise.all([
        runSql(Q.cohort, 'cohort size'),
        runSql(Q.resolved, 'tracked users'),
        runSql(Q.sessionUsers, 'session users'),
        runSql(Q.valCohort, 'validation cohort'),
        runSql(Q.valTargets, 'validation targets'),
        runSql(Q.programType, 'program type'),
        runSql(Q.funcMigration, 'function migration'),
        runSql(Q.discRecs, 'discovery recommendations'),
        runSql(Q.progMap, 'program catalog'),
        runSql(Q.depth, 'engagement depth'),
        runSql(Q.loyalty, 'loyalty'),
        runSql(Q.features, 'feature affinity'),
        runSql(Q.dau, 'daily active users'),
        runSql(Q.acq, 'acquisition source'),
        runSql(Q.prior, 'prior attempts'),
        runSql(Q.demoCount, 'demographics coverage'),
        runSql(Q.demoCats, 'demographics breakdown'),
        runSql(Q.workRows, 'work & experience'),
        runSql(Q.cvRich, 'skills & activities'),
      ]);
      if (cancelled) return;

      setCohortSize(num(cohortRows[0]?.n));
      setResolvedUsers(num(resolvedRows[0]?.n));
      setSessionUsers(num(sessRows[0]?.n));

      // ---- Program label map ----
      const progLabel: Record<string, string> = {};
      progMapRows.forEach(r => { progLabel[r.program_id] = `${r.company} — ${r.program_name}`; });
      const prettyId = (id: string) => id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const labelFor = (id: string) => progLabel[id] || prettyId(id);

      // ---- Validation track ----
      setValCohort({
        validationN: num(valCohortRows[0]?.validation_n),
        withTarget: num(valCohortRows[0]?.with_target),
        withFunction: num(valCohortRows[0]?.with_function),
      });
      const vCompanies: any[] = [], vPrograms: any[] = [];
      const canonFuncCnt: Record<string, number> = {};  // position -> canonical function
      valTargetRows.forEach(r => {
        if (r.dim === 'company') vCompanies.push({ name: r.val, users: num(r.n) });
        else if (r.dim === 'program') vPrograms.push({ name: r.val, users: num(r.n) });
        else if (r.dim === 'function') {
          // Map each chosen position to its canonical function family ("what function this position belongs to")
          const fam = functionFamily(r.val) || 'Other / general';
          canonFuncCnt[fam] = (canonFuncCnt[fam] || 0) + num(r.n);
        }
      });
      setValCompanies(vCompanies.slice(0, 12));
      setValPrograms(vPrograms.slice(0, 12));
      setValFunctions(
        Object.entries(canonFuncCnt).map(([name, users]) => ({ name, users }))
          .sort((a, b) => b.users - a.users)
      );
      setProgramTypes(
        programTypeRows.map(r => ({
          name: PROGRAM_TYPE_LABELS[r.program_type] || r.program_type,
          users: num(r.users),
        }))
          .reduce((acc: any[], cur) => {
            const ex = acc.find(a => a.name === cur.name);
            if (ex) ex.users += cur.users; else acc.push(cur);
            return acc;
          }, [])
          .sort((a, b) => b.users - a.users)
      );

      // ---- CV function (background) -> declared target function migration ----
      let mBoth = 0, mSame = 0, mChanged = 0;
      const shiftCnt: Record<string, { from: string; to: string; n: number }> = {};
      funcMigrationRows.forEach(r => {
        const from = functionFamily(r.function_top1) || r.function_top1;
        const to = functionFamily(r.declared_function);
        if (!from || !to) return;
        mBoth++;
        if (from === to) { mSame++; }
        else {
          mChanged++;
          const key = `${from}→${to}`;
          if (!shiftCnt[key]) shiftCnt[key] = { from, to, n: 0 };
          shiftCnt[key].n++;
        }
      });
      setFuncTransition({ both: mBoth, same: mSame, changed: mChanged });
      setFuncShifts(
        Object.values(shiftCnt).map(s => ({ name: `${s.from} → ${s.to}`, users: s.n }))
          .sort((a, b) => b.users - a.users).slice(0, 8)
      );

      // ---- Discovery track (parse recommendation JSON client-side) ----
      const recFunc: Record<string, number> = {};
      const recProgFreq: Record<string, Set<string>> = {};
      const chosenInTop5: Record<string, number> = {};
      const rankCnt: Record<string, number> = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, out: 0 };
      let withRecs = 0, converted = 0, convertedInTop5 = 0;

      discRows.forEach(r => {
        withRecs++;
        const uid = r.user_id;
        let fns = r.rec_top3_functions;
        if (typeof fns === 'string') { try { fns = JSON.parse(fns); } catch { fns = null; } }
        if (Array.isArray(fns) && fns.length) {
          const t = fns.find((x: any) => x && (x.rank === 1 || x.rank === '1')) || fns[0];
          const nm = t?.name || t?.id;
          if (nm) recFunc[nm] = (recFunc[nm] || 0) + 1;
        }
        let ps = r.rec_top5_programs;
        if (typeof ps === 'string') { try { ps = JSON.parse(ps); } catch { ps = null; } }
        const declared = r.declared_program_id;
        let chosenRank: number | null = null;
        if (Array.isArray(ps)) {
          ps.forEach((it: any) => {
            const cid = it.catalog_id || it.id;
            if (cid) (recProgFreq[cid] = recProgFreq[cid] || new Set()).add(uid);
            if (declared && cid === declared) chosenRank = num(it.rank);
          });
        }
        if (declared) {
          converted++;
          if (chosenRank && chosenRank >= 1 && chosenRank <= 5) {
            rankCnt[String(chosenRank)]++;
            convertedInTop5++;
            chosenInTop5[declared] = (chosenInTop5[declared] || 0) + 1;
          } else {
            rankCnt.out++;
          }
        }
      });

      setRecFunctions(
        Object.entries(recFunc).map(([name, n]) => ({ name, users: n }))
          .sort((a, b) => b.users - a.users).slice(0, 10)
      );
      setRecPrograms(
        Object.entries(recProgFreq).map(([id, set]) => ({ name: labelFor(id), users: set.size }))
          .sort((a, b) => b.users - a.users).slice(0, 10)
      );
      setChosenPrograms(
        Object.entries(chosenInTop5).map(([id, n]) => ({ name: labelFor(id), users: n }))
          .sort((a, b) => b.users - a.users).slice(0, 10)
      );
      setRankBands(RANK_KEYS.map((k, i) => ({ name: RANK_LABELS[k], users: rankCnt[k] || 0, color: k === 'out' ? SLATE : COLORS[i % COLORS.length] })));
      // Modal rank among in-top-5 choices
      let topRankKey = '', topRankN = -1;
      ['1', '2', '3', '4', '5'].forEach(k => { if (rankCnt[k] > topRankN) { topRankN = rankCnt[k]; topRankKey = k; } });
      setDisc({ withRecs, converted, convertedInTop5, typicalRank: topRankN > 0 ? `#${topRankKey} pick` : '—' });

      // ---- Behaviour ----
      setDepth(depthRows.map(r => ({ name: r.bucket, users: num(r.users) })));
      setLoyalty(loyaltyRows.map((r, i) => ({ name: r.bucket, value: num(r.users), color: COLORS[i % COLORS.length] })));
      setFeatures(featureRows.map(r => ({
        feature: FEATURE_LABELS[r.feature_name] || r.feature_name,
        users: num(r.users), events: num(r.events),
      })));
      setDau(dauRows.map(r => ({ date: fmtDay(r.date), dau: num(r.dau), visits: num(r.visits) })));
      const acqMap: Record<string, number> = {};
      acqRows.forEach(r => { if (r.val) acqMap[r.val] = num(r.n); });
      setAcq(ACQ_CATEGORIES.map(c => ({ name: ACQ_LABELS[c] || c, users: acqMap[c] || 0 })));
      const priorMap: Record<string, number> = {};
      priorRows.forEach(r => { if (r.val) priorMap[r.val] = num(r.n); });
      setPrior(PRIOR_CATEGORIES.map(c => ({ name: c, users: priorMap[c] || 0 })));

      // ---- Demographics ----
      setDemoCoverage({
        people: num(demoCountRows[0]?.people),
        graduated: num(demoCountRows[0]?.graduated),
        tier1: num(demoCountRows[0]?.tier1),
      });
      const byDim: Record<string, { val: string; n: number }[]> = {};
      demoCatRows.forEach(r => {
        const d = r.dim as string;
        (byDim[d] = byDim[d] || []).push({ val: String(r.val), n: num(r.n) });
      });
      const ordered = (dim: string, order: string[], labels?: Record<string, string>) => {
        const map: Record<string, number> = {};
        (byDim[dim] || []).forEach(x => { map[x.val] = x.n; });
        return order
          .map((k, i) => ({ name: labels?.[k] || k, value: map[k] || 0, color: COLORS[i % COLORS.length] }))
          .filter(x => x.value > 0);
      };
      const topN = (dim: string, n: number) =>
        (byDim[dim] || []).slice().sort((a, b) => b.n - a.n).slice(0, n)
          .map(x => ({ name: x.val, users: x.n }));

      setDemoStage(ordered('stage', STAGE_ORDER, STAGE_LABELS));
      setDemoTier(ordered('tier', TIER_ORDER, TIER_LABELS));
      setDemoLead(ordered('lead', LEAD_ORDER, LEAD_LABELS));
      setDemoGpa(ordered('gpa', GPA_ORDER));
      setDemoEnglish(
        (byDim['english'] || []).slice().sort((a, b) => b.n - a.n)
          .map((x, i) => ({ name: x.val === '(none)' ? 'No test listed' : x.val, value: x.n, color: COLORS[i % COLORS.length] }))
          .filter(x => x.value > 0)
      );
      const cityRaw = byDim['city'] || [];
      const cityMain = MAIN_CITIES.map(c => ({ name: c, users: (cityRaw.find(x => x.val === c)?.n) || 0 }))
        .filter(x => x.users > 0);
      const otherN = cityRaw.filter(x => !MAIN_CITIES.includes(x.val) && x.val !== '(unknown)')
        .reduce((s, x) => s + x.n, 0);
      const unknownN = cityRaw.find(x => x.val === '(unknown)')?.n || 0;
      if (otherN > 0) cityMain.push({ name: 'Other cities', users: otherN });
      if (unknownN > 0) cityMain.push({ name: 'Not stated', users: unknownN });
      setDemoCity(cityMain);
      setDemoUni(topN('uni', 10));
      setDemoMajor(topN('major', 10));

      // ---- Skills / certificates / extracurricular activity types (parse CV JSON) ----
      const skillUsers: Record<string, Set<string>> = {};
      const certUsers: Record<string, Set<string>> = {};
      const actUsers: Record<string, Set<string>> = {};
      let profileCount = 0;
      cvRichRows.forEach(r => {
        const uid = r.user_id;
        profileCount++;
        // Skills column (array of strings) + parsed_cv skills; certifications + extracurricular from raw payload
        const parsed = parseJsonMaybe(r.raw_cv_text) || {};
        const pcv = parsed.parsed_cv || {};
        const skillList: string[] = [
          ...(Array.isArray(parseJsonMaybe(r.skills)) ? parseJsonMaybe(r.skills) : []),
          ...(Array.isArray(parsed.skills) ? parsed.skills : []),
          ...(Array.isArray(pcv.skills) ? pcv.skills : []),
        ];
        const seenSkill = new Set<string>();
        skillList.forEach(s => {
          if (typeof s !== 'string') return;
          const n = normalizeSkill(s);
          if (n && !seenSkill.has(n)) { seenSkill.add(n); (skillUsers[n] = skillUsers[n] || new Set()).add(uid); }
          // a skill string that is actually a cert → route into cert bucket too
          if (looksLikeCert(s)) { const c = normalizeCert(s); if (c) (certUsers[c] = certUsers[c] || new Set()).add(uid); }
        });
        // Certifications array(s)
        const certList: any[] = [
          ...(Array.isArray(parsed.certifications) ? parsed.certifications : []),
          ...(Array.isArray(pcv.certifications) ? pcv.certifications : []),
          ...(Array.isArray(parsed.certification_details) ? parsed.certification_details.map((c: any) => c?.name) : []),
          ...(Array.isArray(parsed.english_certificates) ? parsed.english_certificates : []),
        ];
        certList.forEach(c => {
          const str = typeof c === 'string' ? c : (c?.name || '');
          const n = normalizeCert(str);
          if (n) (certUsers[n] = certUsers[n] || new Set()).add(uid);
        });
        // Extracurricular activity types
        const acts: any[] = [
          ...(Array.isArray(parsed.extracurricular_activities) ? parsed.extracurricular_activities : []),
          ...(Array.isArray(pcv.extracurricular) ? pcv.extracurricular : []),
        ];
        const seenAct = new Set<string>();
        acts.forEach(a => {
          const org = String(a?.organization || ''); const role = String(a?.role || '');
          if (!org && !role) return;
          const t = activityType(org, role);
          if (!seenAct.has(t)) { seenAct.add(t); (actUsers[t] = actUsers[t] || new Set()).add(uid); }
        });
      });
      setCvProfileN(profileCount);
      const rankSet = (obj: Record<string, Set<string>>, n: number) =>
        Object.entries(obj).map(([name, set]) => ({ name, users: set.size }))
          .sort((a, b) => b.users - a.users).slice(0, n);
      setTopSkills(rankSet(skillUsers, 12));
      setTopCerts(rankSet(certUsers, 10));
      setActivityTypes(
        Object.entries(actUsers).map(([name, set], i) => ({ name, users: set.size, value: set.size, color: COLORS[i % COLORS.length] }))
          .sort((a, b) => b.users - a.users)
      );

      // ---- Work & experience (parse companies JSON client-side) ----
      const curYear = new Date().getFullYear();
      let sumMonths = 0, monthsCount = 0, withMnc = 0, withTarget = 0;
      const expCnt: Record<string, number> = {};
      const ageCnt: Record<string, number> = {};
      const funcCnt: Record<string, number> = {};
      const indUsers: Record<string, Set<string>> = {};
      let cMnc = 0, cLocal = 0;
      const compUsers: Record<string, Set<string>> = {};
      const mncCompUsers: Record<string, Set<string>> = {};
      let mAligned = 0, mDiff = 0, mUnknown = 0;

      workRows.forEach(r => {
        const uid = r.user_id;
        const m = r.exp_months_total;
        if (m != null) { sumMonths += num(m); monthsCount++; }
        const eb = expBucket(m == null ? 0 : num(m));
        expCnt[eb] = (expCnt[eb] || 0) + 1;
        if (num(r.n_mnc_roles) > 0) withMnc++;
        if (r.declared_program_id) withTarget++;
        if (r.grad_year) {
          const b = ageBucket(ageFromGradYear(num(r.grad_year), curYear));
          ageCnt[b] = (ageCnt[b] || 0) + 1;
        }
        if (r.function_top1) funcCnt[r.function_top1] = (funcCnt[r.function_top1] || 0) + 1;

        let comps = r.companies;
        if (typeof comps === 'string') { try { comps = JSON.parse(comps); } catch { comps = []; } }
        const famSet = new Set<string>();
        if (Array.isArray(comps)) {
          comps.forEach((co: any) => {
            const t = String(co?.type || '').toUpperCase();
            if (t === 'MNC') cMnc++; else cLocal++;
            const cn = String(co?.company_name || '').trim();
            if (cn && cn.toLowerCase() !== 'freelance' && cn.toLowerCase() !== 'unknown') {
              (compUsers[cn] = compUsers[cn] || new Set()).add(uid);
              if (t === 'MNC') (mncCompUsers[cn] = mncCompUsers[cn] || new Set()).add(uid);
            }
            const fam = industryFamily(co?.major_industry) || industryFamily(co?.sector);
            if (fam) famSet.add(fam);
          });
        }
        famSet.forEach(f => (indUsers[f] = indUsers[f] || new Set()).add(uid));

        if (r.declared_program_id) {
          const targetFam = industryFamily(r.prog_industry) || industryFamily(r.prog_sector);
          if (!targetFam || famSet.size === 0) mUnknown++;
          else if (famSet.has(targetFam)) mAligned++;
          else mDiff++;
        }
      });

      setWorkCoverage({
        people: workRows.length,
        avgMonths: monthsCount ? sumMonths / monthsCount : 0,
        withMnc, withTarget,
      });
      setExpBands(EXP_ORDER.map((k, i) => ({ name: EXP_LABELS[k], users: expCnt[k] || 0, color: COLORS[i % COLORS.length] })));
      setAgeBands(AGE_ORDER.map((k, i) => ({ name: k, users: ageCnt[k] || 0, color: COLORS[i % COLORS.length] })).filter(b => b.users > 0));
      setCvFunctions(
        Object.entries(funcCnt).map(([name, n]) => ({ name, users: n }))
          .sort((a, b) => b.users - a.users).slice(0, 10)
      );
      setIndustries(
        Object.entries(indUsers).map(([name, set]) => ({ name, users: set.size }))
          .sort((a, b) => b.users - a.users)
      );
      setCompanyTypeMix([
        { name: 'MNC / big brand', value: cMnc, color: BRAND },
        { name: 'Local / SME ("No Fame")', value: cLocal, color: AMBER },
      ]);
      setTopCompanies(
        Object.entries(compUsers).map(([name, set]) => ({ name, users: set.size }))
          .sort((a, b) => b.users - a.users).slice(0, 12)
      );
      setMncCompanies(
        Object.entries(mncCompUsers).map(([name, set]) => ({ name, users: set.size }))
          .sort((a, b) => b.users - a.users).slice(0, 12)
      );
      setIndustryMatch([
        { name: 'Target in same industry', value: mAligned, color: GREEN },
        { name: 'Target in a new industry', value: mDiff, color: AMBER },
        { name: 'Can’t tell', value: mUnknown, color: SLATE },
      ]);

      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [runSql, start, end, track]);

  const rangeLabel = `${start} → ${end}`;
  const acqHasData = acq.some(a => a.users > 0);
  const priorHasData = prior.some(p => p.users > 0);
  const convPct = disc.withRecs ? Math.round((disc.converted / disc.withRecs) * 100) : 0;
  const switchPct = funcTransition.both ? Math.round((funcTransition.changed / funcTransition.both) * 100) : 0;

  // ---- Shared date-range control strip ----
  const presetBtn = (p: Preset, label: string) => (
    <Button size="sm" variant={preset === p ? 'primary' : 'secondary'} onClick={() => applyPreset(p)}>{label}</Button>
  );

  const Controls = (
    <Card title="Date range">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex gap-2">
          {presetBtn('mtd', 'Month to date')}
          {presetBtn('ytd', 'Year to date')}
          {presetBtn('all', 'All time')}
        </div>
        <div className="flex items-end gap-2">
          <label className="text-xs text-gray-500">
            <div className="mb-1">From</div>
            <input type="date" value={start} max={end}
              onChange={e => { setStart(e.target.value); setPreset('custom'); }}
              className="border border-gray-300 rounded px-2 py-1 text-sm" />
          </label>
          <label className="text-xs text-gray-500">
            <div className="mb-1">To</div>
            <input type="date" value={end} min={start} max={today}
              onChange={e => { setEnd(e.target.value); setPreset('custom'); }}
              className="border border-gray-300 rounded px-2 py-1 text-sm" />
          </label>
        </div>
        <div className="text-xs text-gray-500 ml-auto">
          Window: <span className="font-medium text-gray-700">{rangeLabel}</span>
          <span className="mx-1">·</span>
          {EXCLUDED_EMAILS.length} test accounts excluded
        </div>
      </div>
    </Card>
  );

  // ======================= Tab 1: Validation track =======================
  const validationTab = (
    <Stack gap="lg">
      <div className="rounded-md px-3 py-2 text-xs" style={{ backgroundColor: BRAND + '14', color: '#9f1239', border: `1px solid ${BRAND}40` }}>
        <span className="font-semibold">Validation track</span> — people who have committed to a specific target
        (declared a program or picked the Validation path). This tab answers: which
        <span className="font-medium"> programs, functions and companies</span> do they target most. Active in <span className="font-medium">{rangeLabel}</span>.
      </div>

      <Grid cols={4}>
        <StatCard title="In Validation Track" value={cohortSize} subtitle={`${valCohort.withTarget} have a locked target`} icon={<Flag className="w-4 h-4" />} loading={loading} />
        <StatCard title="Top Target Company" value={valCompanies[0] ? valCompanies[0].name : '—'} subtitle={valCompanies[0] ? `${valCompanies[0].users} people target it` : 'no targets yet'} icon={<Building2 className="w-4 h-4" />} loading={loading} />
        <StatCard title="Top Target Function" value={valFunctions[0] ? valFunctions[0].name : '—'} subtitle={valFunctions[0] ? `${valFunctions[0].users} aim here (from their position)` : 'no declared function'} icon={<Target className="w-4 h-4" />} loading={loading} />
        <StatCard title="Switch Function vs CV" value={`${switchPct}%`} subtitle={`${funcTransition.changed} of ${funcTransition.both} target a new function`} icon={<TrendingUp className="w-4 h-4" />} loading={loading} />
      </Grid>

      <Grid cols={2}>
        <Card title="Most-targeted programs">
          <div className="text-xs text-gray-500 mb-2">Programs people have locked in as their target</div>
          <ResponsiveContainer width="100%" height={340}>
            <RBarChart data={valPrograms} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={190} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BRAND} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Most-targeted companies">
          <div className="text-xs text-gray-500 mb-2">Employer brand behind each person's target program</div>
          <ResponsiveContainer width="100%" height={340}>
            <RBarChart data={valCompanies} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={150} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BLUE} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="Most-targeted functions (from chosen position)">
          <div className="text-xs text-gray-500 mb-2">The position each person picked, mapped to its canonical function family in the Casemate taxonomy ({valCohort.withFunction} stated a position)</div>
          <ResponsiveContainer width="100%" height={300}>
            <RBarChart data={valFunctions} layout="vertical" margin={{ top: 8, right: 24, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={GREEN} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Program type targeted — internship vs graduate vs leadership">
          <div className="text-xs text-gray-500 mb-2">Program type of each person's declared target (from the Casemate catalog)</div>
          <ResponsiveContainer width="100%" height={300}>
            <RBarChart data={programTypes} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={PURPLE} radius={[4, 4, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="CV function → target function — do they switch lane?">
          <div className="text-xs text-gray-500 mb-2">
            For {funcTransition.both} people with both a CV and a chosen position: does the function they target match
            the function their CV already points to? <span className="font-medium">{switchPct}% switch to a new function.</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RPieChart>
              <Pie
                data={[
                  { name: 'Stays in same function', value: funcTransition.same, color: GREEN },
                  { name: 'Switches function', value: funcTransition.changed, color: AMBER },
                ]}
                dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={2}
                label={(e: any) => `${e.value}`} labelLine={false}
              >
                <Cell fill={GREEN} /><Cell fill={AMBER} />
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RPieChart>
          </ResponsiveContainer>
          <div className="mt-2">
            <div className="text-[11px] font-medium text-gray-600 mb-1">Most common lane switches (CV → target)</div>
            {funcShifts.length === 0
              ? <div className="text-[11px] text-gray-400">No lane switches recorded in this window.</div>
              : funcShifts.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] py-0.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700">{s.name}</span>
                  <Badge variant="warning">{s.users}</Badge>
                </div>
              ))}
          </div>
        </Card>

        <Card title="Target programs — detail">
          <DataTable
            data={valPrograms}
            loading={loading}
            pageSize={8}
            emptyMessage="No declared targets in this window"
            columns={[
              { key: 'name', header: 'Program', render: (v: any) => <span className="text-sm">{v}</span> },
              { key: 'users', header: 'People', width: '80px', sortable: true, render: (v: any) => <Badge variant="info">{v}</Badge> },
            ]}
          />
        </Card>
      </Grid>
    </Stack>
  );

  // ======================= Tab 2: Discovery track =======================
  const discoveryTab = (
    <Stack gap="lg">
      <div className="rounded-md px-3 py-2 text-xs" style={{ backgroundColor: BLUE + '12', color: '#0b4a7e', border: `1px solid ${BLUE}40` }}>
        <span className="font-semibold">Discovery track</span> — people who received Fit recommendations and are still
        exploring. This tab answers: which <span className="font-medium">functions &amp; programs the engine recommends</span>,
        which recommended program they end up choosing, and <span className="font-medium">which rank</span> they usually pick.
        Based on {disc.withRecs} people with recommendations active in <span className="font-medium">{rangeLabel}</span>.
      </div>

      <Grid cols={4}>
        <StatCard title="Received Fit Recs" value={disc.withRecs} subtitle={`of ${cohortSize} active in window`} icon={<Compass className="w-4 h-4" />} loading={loading} />
        <StatCard title="Converted to a Target" value={disc.converted} subtitle={`${convPct}% picked a program`} icon={<TrendingUp className="w-4 h-4" />} loading={loading} />
        <StatCard title="Top Recommended Function" value={recFunctions[0] ? recFunctions[0].name : '—'} subtitle={recFunctions[0] ? `${recFunctions[0].users} got it at #1` : 'no data'} icon={<Target className="w-4 h-4" />} loading={loading} />
        <StatCard title="Usually Pick Their" value={disc.typicalRank} subtitle={`${disc.convertedInTop5} chose a recommended program`} icon={<Trophy className="w-4 h-4" />} loading={loading} />
      </Grid>

      <Grid cols={2}>
        <Card title="Top recommended functions (engine rank #1)">
          <div className="text-xs text-gray-500 mb-2">The #1 function the Fit engine matched each person to — their suggested career lane</div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={recFunctions} layout="vertical" margin={{ top: 8, right: 24, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={150} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BRAND} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Top recommended programs (appear in users' top 5)">
          <div className="text-xs text-gray-500 mb-2">Programs the engine surfaces most often across everyone's top-5 recommendations</div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={recPrograms} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={190} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BLUE} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="Which recommended program they actually choose">
          <div className="text-xs text-gray-500 mb-2">
            Among people who picked a target that was in their top-5 recommendations, which program wins most
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={chosenPrograms} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={190} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={GREEN} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Which rank do they pick? — recommendation position chosen">
          <div className="text-xs text-gray-500 mb-2">
            Of people who declared a target, the rank that target held in their own recommendation list. "Outside top 5" = they chose something not recommended.
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={rankBands} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="users" name="People" radius={[4, 4, 0, 0]}>
                {rankBands.map((b, i) => <Cell key={i} fill={b.color} />)}
              </Bar>
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
    </Stack>
  );

  // ======================= Tab 3: Demographics =======================
  const gradPct = demoCoverage.people ? Math.round((demoCoverage.graduated / demoCoverage.people) * 100) : 0;
  const tier1Pct = demoCoverage.people ? Math.round((demoCoverage.tier1 / demoCoverage.people) * 100) : 0;
  const demographicsTab = (
    <Stack gap="lg">
      <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
        Demographics are read from each person's parsed CV (<span className="font-medium">cv_features</span>), one latest CV per person,
        restricted to people active in <span className="font-medium">{rangeLabel}</span>. {demoCoverage.people} of {cohortSize} in the cohort have a CV on file.
      </div>

      <Grid cols={4}>
        <StatCard title="Profiles with CV" value={demoCoverage.people} subtitle={`of ${cohortSize} active · demographic base`} icon={<IdCard className="w-4 h-4" />} loading={loading} />
        <StatCard title="Already Graduated" value={`${gradPct}%`} subtitle={`${demoCoverage.graduated} grads · rest are students`} icon={<GraduationCap className="w-4 h-4" />} loading={loading} />
        <StatCard title="Tier-1 University" value={`${tier1Pct}%`} subtitle={`${demoCoverage.tier1} from top-tier schools`} icon={<Building2 className="w-4 h-4" />} loading={loading} />
        <StatCard title="Top School" value={demoUni[0] ? demoUni[0].name : '—'} subtitle={demoUni[0] ? `${demoUni[0].users} people` : 'no data'} icon={<Trophy className="w-4 h-4" />} loading={loading} />
      </Grid>

      <Grid cols={2}>
        <Card title="Academic stage — student vs graduate">
          <div className="text-xs text-gray-500 mb-2">Where each person is in their studies at CV submission (seniority)</div>
          <ResponsiveContainer width="100%" height={260}>
            <RPieChart>
              <Pie data={demoStage} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={95} paddingAngle={2} label={(e: any) => `${e.value}`} labelLine={false}>
                {demoStage.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RPieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Location — where they are based">
          <div className="text-xs text-gray-500 mb-2">First recognised city on the CV</div>
          <ResponsiveContainer width="100%" height={260}>
            <RBarChart data={demoCity} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={GREEN} radius={[4, 4, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="Universities — top schools">
          <div className="text-xs text-gray-500 mb-2">Most common universities among the cohort</div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={demoUni} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={180} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BRAND} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Fields of study — top majors">
          <div className="text-xs text-gray-500 mb-2">Major / field of study grouped into canonical families</div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={demoMajor} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={170} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={PURPLE} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="University tier">
          <div className="text-xs text-gray-500 mb-2">Casemate ranking tier of the school (Tier 1 = top)</div>
          <ResponsiveContainer width="100%" height={240}>
            <RBarChart data={demoTier} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" name="People" fill={BLUE} radius={[4, 4, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="GPA band">
          <div className="text-xs text-gray-500 mb-2">Academic standing from GPA (where stated on the CV)</div>
          <ResponsiveContainer width="100%" height={240}>
            <RBarChart data={demoGpa} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" name="People" fill={GREEN} radius={[4, 4, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="English proficiency — test taken">
          <div className="text-xs text-gray-500 mb-2">Best English certification listed on the CV</div>
          <ResponsiveContainer width="100%" height={240}>
            <RPieChart>
              <Pie data={demoEnglish} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e: any) => `${e.name}: ${e.value}`} labelLine={false}>
                {demoEnglish.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </RPieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Leadership experience">
          <div className="text-xs text-gray-500 mb-2">Leadership depth from roles & extracurriculars on the CV</div>
          <ResponsiveContainer width="100%" height={240}>
            <RBarChart data={demoLead} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" name="People" fill={AMBER} radius={[4, 4, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
        Skills, certificates and extracurricular activities are parsed from each person's CV
        ({cvProfileN} CVs in this view). Bars count <span className="font-medium">distinct people</span> who list each item.
      </div>

      <Grid cols={2}>
        <Card title="Skills they commonly have">
          <div className="text-xs text-gray-500 mb-2">Most frequent skills on users' CVs (languages & certificates shown separately)</div>
          <ResponsiveContainer width="100%" height={340}>
            <RBarChart data={topSkills} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={160} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BLUE} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Certificates they commonly hold">
          <div className="text-xs text-gray-500 mb-2">English tests and professional certifications listed on the CV</div>
          <ResponsiveContainer width="100%" height={340}>
            <RBarChart data={topCerts} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={150} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={GREEN} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Card title="Extracurricular activity types — what they get involved in">
        <div className="text-xs text-gray-500 mb-2">Each person's extracurricular entries, grouped into activity types (a person can appear in several)</div>
        <ResponsiveContainer width="100%" height={300}>
          <RBarChart data={activityTypes} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={190} />
            <Tooltip />
            <Bar dataKey="users" name="People" fill={PURPLE} radius={[0, 4, 4, 0]} />
          </RBarChart>
        </ResponsiveContainer>
      </Card>
    </Stack>
  );

  // ======================= Tab 4: Work & Experience =======================
  const avgYears = workCoverage.avgMonths ? (workCoverage.avgMonths / 12) : 0;
  const mncPct = workCoverage.people ? Math.round((workCoverage.withMnc / workCoverage.people) * 100) : 0;
  const matchDenom = industryMatch.reduce((s, x) => s + num(x.value), 0);
  const matchAlignedPct = matchDenom ? Math.round((num(industryMatch.find(x => x.name.includes('same'))?.value) / matchDenom) * 100) : 0;
  const workTab = (
    <Stack gap="lg">
      <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
        Work background is read from each person's parsed CV work history (<span className="font-medium">cv_features</span> + employer list),
        one latest CV per person, limited to people active in <span className="font-medium">{rangeLabel}</span>.
        {' '}{workCoverage.people} of {cohortSize} in the cohort have a CV with work history on file.
        Company type (MNC vs local/SME) and industry come straight from the CV employer records.
      </div>

      <Grid cols={4}>
        <StatCard title="Typical Experience" value={`${avgYears.toFixed(1)} yrs`} subtitle={`avg across ${workCoverage.people} CVs`} icon={<Clock className="w-4 h-4" />} loading={loading} />
        <StatCard title="Worked at an MNC" value={`${mncPct}%`} subtitle={`${workCoverage.withMnc} have MNC experience`} icon={<Landmark className="w-4 h-4" />} loading={loading} />
        <StatCard title="Top Industry Background" value={industries[0] ? industries[0].name : '—'} subtitle={industries[0] ? `${industries[0].users} people from here` : 'no data'} icon={<Globe2 className="w-4 h-4" />} loading={loading} />
        <StatCard title="Right-Industry Targets" value={`${matchAlignedPct}%`} subtitle="target stays in a known industry" icon={<Briefcase className="w-4 h-4" />} loading={loading} />
      </Grid>

      <Grid cols={2}>
        <Card title="Years of work experience">
          <div className="text-xs text-gray-500 mb-2">Total internship + full-time months on the CV, bucketed per person</div>
          <ResponsiveContainer width="100%" height={260}>
            <RBarChart data={expBands} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="users" name="People" radius={[4, 4, 0, 0]}>
                {expBands.map((b, i) => <Cell key={i} fill={b.color} />)}
              </Bar>
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Estimated age range">
          <div className="text-xs text-gray-500 mb-2">
            Approximate — derived from graduation year (typical VN bachelor graduates at ~22), bucketed in 2-year steps
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RBarChart data={ageBands} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="users" name="People" radius={[4, 4, 0, 0]}>
                {ageBands.map((b, i) => <Cell key={i} fill={b.color} />)}
              </Bar>
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="Company pedigree — MNC vs local / SME">
          <div className="text-xs text-gray-500 mb-2">Every employer entry across all CVs, tagged by the engine as a multinational (MNC) or a local / SME ("No Fame") firm</div>
          <ResponsiveContainer width="100%" height={260}>
            <RPieChart>
              <Pie data={companyTypeMix} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={2} label={(e: any) => `${e.value}`} labelLine={false}>
                {companyTypeMix.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RPieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Right-industry fit — do targets match their background?">
          <div className="text-xs text-gray-500 mb-2">
            For people with a declared target: is the program's industry the same as an industry they already have CV experience in? (approximate industry mapping)
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RPieChart>
              <Pie data={industryMatch} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label={(e: any) => `${e.value}`} labelLine={false}>
                {industryMatch.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RPieChart>
          </ResponsiveContainer>
          <div className="text-[11px] text-gray-400 mt-1">{matchAlignedPct}% of declared targets stay within an industry the person already worked in.</div>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="Industries they come from">
          <div className="text-xs text-gray-500 mb-2">Distinct people with CV work experience in each industry family</div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={industries} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={170} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BLUE} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Function they work in (from CV)">
          <div className="text-xs text-gray-500 mb-2">Engine's top function match from each person's CV — the career lane their experience points to</div>
          <ResponsiveContainer width="100%" height={320}>
            <RBarChart data={cvFunctions} layout="vertical" margin={{ top: 8, right: 24, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={150} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={GREEN} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2}>
        <Card title="MNC companies our users come from — most represented">
          <div className="text-xs text-gray-500 mb-2">Multinational employers appearing most on users' CVs (distinct people). These brands' alumni use Casemate most.</div>
          <ResponsiveContainer width="100%" height={340}>
            <RBarChart data={mncCompanies} layout="vertical" margin={{ top: 8, right: 28, left: 10, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={190} />
              <Tooltip />
              <Bar dataKey="users" name="People" fill={BRAND} radius={[0, 4, 4, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="All companies — most common on CVs">
          <DataTable
            data={topCompanies}
            loading={loading}
            pageSize={12}
            emptyMessage="No employer data in this window"
            columns={[
              { key: 'name', header: 'Company', render: (v: any) => <span className="text-sm">{v}</span> },
              { key: 'users', header: 'People', width: '90px', sortable: true, render: (v: any) => <Badge variant="info">{v}</Badge> },
            ]}
          />
        </Card>
      </Grid>
    </Stack>
  );

  // ======================= Tab 5: Behaviour & Signals =======================
  const newTrackingNote = (label: string) => (
    <div className="mb-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
      Tracking for <span className="font-medium">{label}</span> has just gone live — the chart is wired and will fill in as new sessions report this field. Currently 0 captured.
    </div>
  );

  const behaviourTab = (
    <Stack gap="lg">
      <Grid cols={4}>
        <StatCard title="Active People" value={sessionUsers} subtitle={`${resolvedUsers} fired tracked events`} icon={<Users className="w-4 h-4" />} loading={loading} />
        <StatCard title="Deep Engagers" value={num(depth.find(d => d.name === '5. Over 60 min')?.users)} subtitle="60+ min total on-site" icon={<Dumbbell className="w-4 h-4" />} loading={loading} />
        <StatCard title="Habitual Returners" value={num(loyalty.find(l => l.name === '8+ days')?.value)} subtitle="active on 8+ distinct days" icon={<Route className="w-4 h-4" />} loading={loading} />
        <StatCard title="Top Feature" value={features[0] ? features[0].feature : '—'} subtitle={features[0] ? `${features[0].users} users` : 'no data'} icon={<Layers className="w-4 h-4" />} loading={loading} />
      </Grid>

      <Grid cols={2}>
        <Card title="Engagement depth — total time per person">
          <div className="text-xs text-gray-500 mb-2">Sum of visit duration across all sessions, per unique user</div>
          <ResponsiveContainer width="100%" height={240}>
            <RBarChart data={depth} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="users" name="Users" fill={BRAND} radius={[4, 4, 0, 0]} />
            </RBarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Loyalty — distinct days active">
          <div className="text-xs text-gray-500 mb-2">How many separate days each person showed up in the window</div>
          <ResponsiveContainer width="100%" height={240}>
            <RPieChart>
              <Pie data={loyalty} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={(e: any) => `${e.name}: ${e.value}`} labelLine={false}>
                {loyalty.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </RPieChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Card title="Feature affinity — what they actually use">
        <div className="text-xs text-gray-500 mb-2">Unique users touching each feature</div>
        <ResponsiveContainer width="100%" height={240}>
          <RBarChart data={features} layout="vertical" margin={{ top: 8, right: 24, left: 10, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
            <YAxis type="category" dataKey="feature" tick={{ fontSize: 11 }} width={130} />
            <Tooltip />
            <Bar dataKey="users" name="Users" fill={GREEN} radius={[0, 4, 4, 0]} />
          </RBarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Daily active people">
        <div className="text-xs text-gray-500 mb-2">Distinct users per day from session_tracking · {rangeLabel}</div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={dau} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <defs>
              <linearGradient id="dauFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={BRAND} stopOpacity={0.3} />
                <stop offset="95%" stopColor={BRAND} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} interval="preserveStartEnd" minTickGap={24} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip />
            <Area type="monotone" dataKey="dau" name="Active people" stroke={BRAND} strokeWidth={2} fill="url(#dauFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div>
        <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-gray-400" /> Newly-instrumented persona signals
        </div>
        <Grid cols={2}>
          <Card title="Acquisition source — where they heard about Casemate">
            {!acqHasData && newTrackingNote('acquisition source')}
            <ResponsiveContainer width="100%" height={230}>
              <RBarChart data={acq} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="users" name="People" fill={AMBER} radius={[4, 4, 0, 0]} />
              </RBarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Prior applications — recruiting experience">
            {!priorHasData && newTrackingNote('prior applications')}
            <ResponsiveContainer width="100%" height={230}>
              <RBarChart data={prior} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="users" name="People" fill={PURPLE} radius={[4, 4, 0, 0]} />
              </RBarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </div>
    </Stack>
  );

  // ---- Layer 1: journey-track selector (Validation vs Discovery) ----
  const trackBtn = (id: 'validation' | 'discovery', label: string, Icon: typeof Flag) => {
    const active = track === id;
    return (
      <button
        onClick={() => setTrack(id)}
        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition"
        style={active
          ? { backgroundColor: BRAND, color: '#fff' }
          : { backgroundColor: 'transparent', color: '#475569' }}
      >
        <Icon className="w-4 h-4" /> {label}
      </button>
    );
  };

  const trackSelector = (
    <Card title="Journey track — who are you looking at?">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          {trackBtn('validation', 'Validation track', Flag)}
          {trackBtn('discovery', 'Discovery track', Compass)}
        </div>
        <div className="text-xs text-gray-500">
          {track === 'validation'
            ? 'People who committed to a specific target (declared a program).'
            : 'People still exploring — those who received Fit recommendations.'}
          <span className="mx-1">·</span>
          <span className="font-medium text-gray-700">{num(cohortSize)} people</span> in {rangeLabel}
        </div>
      </div>
    </Card>
  );

  return (
    <div
      style={{
        // Fit within the platform's content area and keep the host's side
        // gutters (white margins). No viewport breakout — width tracks the
        // parent container and stays centered.
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <Stack gap="lg">
        <PageHeader
          title="Customer Persona"
          subtitle="Who Casemate's users are. Layer 1 — pick a journey track (Validation = committed to a target · Discovery = still exploring). Layer 2 — view that cohort through Target choices, Demographics, Work & Experience and Behaviour. Filter by date (MTD / YTD / custom)."
          icon={<UserCircle className="w-5 h-5" />}
        />

        {Controls}

        {errors.length > 0 && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            <div className="font-semibold mb-1">Some queries failed:</div>
            <ul className="list-disc pl-5 space-y-0.5">
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        {/* Layer 1 — journey track */}
        {trackSelector}

        {/* Layer 2 — lenses on the selected track */}
        <Tabs
          defaultTab="overview"
          tabs={[
            {
              id: 'overview',
              label: track === 'validation' ? 'Target choices' : 'Recommendations',
              content: track === 'validation' ? validationTab : discoveryTab,
            },
            { id: 'demographics', label: 'Demographics', content: demographicsTab },
            { id: 'work', label: 'Work & Experience', content: workTab },
            { id: 'behaviour', label: 'Behaviour & Signals', content: behaviourTab },
          ]}
        />
      </Stack>
    </div>
  );
}

export default CustomerPersonaDashboard;
