import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as mammoth from 'https://esm.sh/mammoth@1.12.1?bundle';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  UploadCloud,
  Users,
  X,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { FitBrandTag, FitStepIndicator } from '../../components/FitAssessmentUI';
import CvSubmitStep from '../../components/CvSubmitStep';
import SaveProgressButton from '../../components/SaveProgressButton';
import type { ProgressSaveStatus } from '../../components/SaveProgressButton';
import WorkStyleAssessment from '../../components/WorkStyleAssessment';
import FitResultsSummary from '../../components/FitResultsSummary';
import { MBTI_ITEMS, scoreMbti } from '../../components/CultureFitSection';
import { generateAndSaveRoadmap } from '../../lib/prepRoadmap';

const STRUCTURED_HOOK = '/api/hooks/execute/workspace-539150/casemate-structured-fit-v1';
const FUNCTION_HOOK = '/api/hooks/execute/workspace-539150/casemate-function-fit-v1';
const FIT_ENGINE_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-engine-v3';
const CV_PROFILE_HOOK = '/api/hooks/execute/workspace-539150/casemate-cv-profile-v1';
const FIT_TRACKING_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-tracking-v1';
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';

type Education = { institution: string; field: string; degree: string; graduationYear: string; gpa: string; coursework: string; universityTier?: number; source?: 'extracted' | 'user' };
type Experience = { company: string; role: string; duration: string; description: string; sector?: string; sectorSource?: 'auto' | 'user' | 'extracted' };
type ExtracurricularActivity = { organization: string; role: string; duration: string; description: string };
type HonorAchievement = { competition: string; title: string; time: string; description: string; category?: string; sourceRowId?: string };
type CvProfile = {
  name: string;
  university: string;
  university_tier?: number;
  faculty: string;
  major?: string;
  graduation_year: string;
  year_of_study?: string;
  gpa: string;
  coursework: string;
  parsed_cv?: any;
  education: Education[];
  experiences: Experience[];
  internship_history?: any[];
  skills: string[];
  certifications: string[];
  other_skills: string;
  other_skills_selected: boolean;
  english_certificates?: string[];
  target_company: string;
  target_industry: string;
  extracurricular_activities: ExtracurricularActivity[];
  honors_achievements: HonorAchievement[];
  inferred_interests?: string[];
  cities_mentioned?: string[];
  standout_points?: string[];
};
type OcpKey = 'innovation' | 'detail' | 'results' | 'competitive' | 'supportive' | 'teamwork' | 'reward_development' | 'reward_compensation' | 'work_life_balance';
type OcpScores = Record<OcpKey, number>;
type MotivationAnswers = {
  job_priority: string;
  work_preference: string;
  strength: string;
  energizing_problem: string;
};
type FunctionScore = {
  id: string;
  name: string;
  short: string;
  score: number;
  explanation: string;
  breakdown: {
    mbti: { score: number; matches: number; total: number };
    work_style: { score: number };
    cognitive: { score: number; strengths?: Record<string, number> };
    motivation: { score: number };
    cv_evidence: { score: number; level: string; evidence: string };
  };
};
type ProgramMatch = {
  program_id: string;
  company: string;
  program: string;
  industry: string;
  sector?: string;
  matched_functions: string[];
  function: string;
  function_fit_score: number;
  corporate_fit_percent: number;
  corporate_data_sufficient: boolean;
  program_fit_percent: number;
  why: string;
};

const EMPTY_PROFILE: CvProfile = {
  name: '', university: '', faculty: '', graduation_year: '', gpa: '', coursework: '', education: [], experiences: [], skills: [], certifications: [], other_skills: '', other_skills_selected: false,
  target_company: '', target_industry: '', extracurricular_activities: [], honors_achievements: [], inferred_interests: [], cities_mentioned: [], standout_points: [],
};
const GPA_OPTIONS = [
  { label: '4.0+', value: 'Valedictorian' },
  { label: '3.6 – 4.0', value: 'High Distinction' },
  { label: '3.2 – 3.59', value: 'Distinction' },
  { label: '2.5 – 3.29', value: 'Good' },
  { label: '2.0 – 2.49', value: 'Ordinary' },
] as const;

export const DEGREE_OPTIONS = ["Bachelor's degree", "Master's degree", 'MBA', 'PhD', 'Other'] as const;
const DEFAULT_OCP: OcpScores = {
  innovation: 3, detail: 3, results: 3, competitive: 3, supportive: 3, teamwork: 3,
  reward_development: 3, reward_compensation: 3, work_life_balance: 3,
};
const EMPTY_MOTIVATION: MotivationAnswers = { job_priority: '', work_preference: '', strength: '', energizing_problem: '' };
const STEP_LABELS = ['CV', 'Motivation', 'Work style', 'Function fit', 'Programs'];
const MEDALS = ['🥇', '🥈', '🥉'];

function programSectorLabel(program: ProgramMatch): string {
  return program.sector === 'advertising' || /advertising/i.test(program.industry)
    ? 'Advertising & Marketing'
    : program.industry;
}

const MOTIVATION_QUESTIONS: Array<{ key: keyof MotivationAnswers; question: string; options: string[] }> = [
  { key: 'job_priority', question: 'What matters most to you in your first job?', options: ['Learning & growth', 'High income', 'Impact on people', 'Building something new', 'Stability & structure'] },
  { key: 'work_preference', question: 'How do you prefer to work?', options: ['With data & analysis', 'With people & relationships', 'With ideas & strategy', 'With systems & processes'] },
  { key: 'strength', question: 'Where do you see your biggest strength?', options: ['Numbers & logical thinking', 'Communication & persuasion', 'Creative thinking', 'Organizing & executing', 'Leading & motivating'] },
  { key: 'energizing_problem', question: 'What kind of problems energize you most?', options: ['Solving complex analytical problems', 'Persuading and influencing others', 'Designing systems and processes', 'Understanding people and culture', 'Building and launching new things'] },
];
const OCP_ITEMS: Array<{ key: OcpKey; group: string; label: string; low: string; high: string }> = [
  { key: 'innovation', group: 'Work approach', label: 'Innovation', low: 'Stable routines', high: 'New ideas and change' },
  { key: 'detail', group: 'Work approach', label: 'Attention to detail', low: 'Big picture', high: 'Precision and accuracy' },
  { key: 'results', group: 'Work approach', label: 'Results orientation', low: 'Process first', high: 'Measurable outcomes' },
  { key: 'competitive', group: 'Work approach', label: 'Competitiveness', low: 'Low-pressure collaboration', high: 'Compete to be the best' },
  { key: 'supportive', group: 'People & culture', label: 'Supportive culture', low: 'Independent work', high: 'People-first support' },
  { key: 'teamwork', group: 'People & culture', label: 'Teamwork', low: 'Work independently', high: 'Close collaboration' },
  { key: 'reward_development', group: 'Rewards & balance', label: 'Reward — Development', low: 'Growth is secondary', high: 'Learning is essential' },
  { key: 'reward_compensation', group: 'Rewards & balance', label: 'Reward — Compensation', low: 'Salary is secondary', high: 'High compensation matters' },
  { key: 'work_life_balance', group: 'Rewards & balance', label: 'Work-life balance', low: 'Career takes priority', high: 'Balance is non-negotiable' },
];
const OCP_GROUPS = ['Work approach', 'People & culture', 'Rewards & balance'];

const MBTI_COPY: Record<string, { question: string; a: string; b: string }> = {
  ei_1: { question: 'After a day full of meetings and conversations, you would rather:', a: 'Keep talking because interaction gives you energy', b: 'Have quiet time alone to recharge' },
  ei_2: { question: 'In a group discussion, you usually:', a: 'Talk through ideas as you go', b: 'Organize your thoughts before sharing' },
  ei_3: { question: 'At an event where you do not know many people, you usually:', a: 'Start conversations with several people', b: 'Observe first and talk deeply with a few people' },
  ei_4: { question: 'What helps you think through a difficult problem?', a: 'Talking it through with someone', b: 'Thinking or writing alone first' },
  ei_5: { question: 'Your ideal workday includes:', a: 'Plenty of live interaction', b: 'Long stretches of focused work' },
  sn_1: { question: 'When learning a new skill, you prefer to begin with:', a: 'Examples and step-by-step practice', b: 'The big picture and core principles' },
  sn_2: { question: 'When evaluating a proposal, you trust:', a: 'Specific data and tested experience', b: 'Patterns and future possibilities' },
  sn_3: { question: 'When a request is vague, you usually:', a: 'Ask for specific criteria and outputs', b: 'Infer the larger goal and explore possibilities' },
  sn_4: { question: 'When improving a process, you prefer to:', a: 'Refine proven steps', b: 'Try an approach that could reshape it' },
  sn_5: { question: 'When presenting an idea, you emphasize:', a: 'Practical examples and execution', b: 'Vision and future possibilities' },
  tf_1: { question: 'When choosing between two important options, you usually:', a: 'Compare criteria and consequences', b: 'Consider values and impact on people' },
  tf_2: { question: 'When a teammate makes a mistake, you usually:', a: 'Address it directly and agree on action', b: 'Understand their situation before giving feedback' },
  tf_3: { question: 'When the team disagrees, you prioritize:', a: 'Testing which argument is most sound', b: 'Making sure everyone is heard' },
  tf_4: { question: 'When giving feedback, you usually:', a: 'Name the gap and suggest a fix', b: 'Acknowledge effort and adapt your wording' },
  tf_5: { question: 'When a general rule leaves someone unhappy, you usually:', a: 'Keep the rule consistent when it is rational', b: 'Adapt when relationships and human needs matter' },
  jp_1: { question: 'For a task due in two weeks, you usually:', a: 'Set milestones and start early', b: 'Stay flexible and focus closer to the deadline' },
  jp_2: { question: 'When planning your workweek, you prefer to:', a: 'Set a clear schedule at the start', b: 'Set priorities and adjust as things change' },
  jp_3: { question: 'When a plan changes at the last minute, you usually:', a: 'Want a revised plan before continuing', b: 'Shift quickly using the new information' },
  jp_4: { question: 'Once a task meets the requirements, you usually:', a: 'Finalize it and move on', b: 'Keep it open for new ideas' },
  jp_5: { question: 'When preparing for a trip or project, you prefer to:', a: 'Book milestones and prepare early', b: 'Decide later to keep options open' },
};

type FitEventRole = 'open' | 'step' | 'activation' | 'core_action' | 'retention';
type SaveStatus = ProgressSaveStatus;

interface FitEventOptions {
  completionKey?: string | null;
}

function createFitEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

function openApp(appId: string) { window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } })); }
function readSessionEmail(spaceId: string): string | null {
  try {
    const value = JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
    return typeof value.email === 'string' ? value.email.toLowerCase().trim() : null;
  } catch { return null; }
}
function normalizeGpaBand(raw: unknown): string {
  const value = String(raw || '').trim();
  if (GPA_OPTIONS.some((option) => option.value === value)) return value;
  const numeric = Number(value.replace(',', '.').match(/\d+(?:\.\d+)?/)?.[0]);
  if (!Number.isFinite(numeric)) return '';
  const gpa = numeric > 4.5 ? numeric / 2.5 : numeric;
  return gpa >= 4 ? 'Valedictorian' : gpa >= 3.6 ? 'High Distinction' : gpa >= 3.2 ? 'Distinction' : gpa >= 2.5 ? 'Good' : gpa >= 2 ? 'Ordinary' : '';
}

export function normalizeDegree(raw: unknown): string {
  const value = String(raw || '').trim();
  if (!value) return '';
  if (DEGREE_OPTIONS.some((option) => option === value)) return value;
  const normalized = value.toLowerCase();
  if (/\bmba\b|master of business administration/.test(normalized)) return 'MBA';
  if (/\bph\.?d\.?\b|doctor of philosophy|doctoral/.test(normalized)) return 'PhD';
  if (/master|msc|m\.sc|ma\b|thạc sĩ|thac si/.test(normalized)) return "Master's degree";
  if (/bachelor|bsc|b\.sc|ba\b|cử nhân|cu nhan/.test(normalized)) return "Bachelor's degree";
  return 'Other';
}

function splitCoursework(raw: unknown): string[] {
  return String(raw || '').split(/[,\n]+/).map((item) => item.trim()).filter(Boolean);
}

export function mergeEducationCoursework(education: Education[]): string {
  const seen = new Set<string>();
  const merged: string[] = [];
  education.forEach((entry) => splitCoursework(entry.coursework).forEach((course) => {
    const key = course.toLowerCase();
    if (!seen.has(key)) { seen.add(key); merged.push(course); }
  }));
  return merged.join(', ');
}
function normalizeExperienceDuration(raw: unknown): string {
  const value = String(raw || '').trim();
  if (!value) return '';
  const current = /(?:present|current(?:ly)?|now|ongoing|today|to date|till date|until now|hiện tại|hien tai|đến nay|den nay|nay)$/iu;
  if (!current.test(value)) return value;
  const start = value.replace(current, '').replace(/\s*(?:[-–—]|to|đến|den)\s*$/iu, '').trim();
  return start ? `${start} – Present` : 'Present';
}
export function normalizeMajorName(raw: unknown): string {
  const value = String(raw || '').trim();
  if (!value) return '';
  const normalized = value.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const rules: Array<[string, string[]]> = [
    ['Marketing', ['marketing']],
    ['Accounting & Auditing', ['accounting', 'auditing', 'audit']],
    ['Business Analytics & Data', ['business analytics', 'data analytics', 'data science']],
    ['E-commerce', ['e-commerce', 'ecommerce', 'electronic commerce']],
    ['Human Resource Management', ['human resource', 'human resources', 'hr management']],
    ['Supply Chain & Logistics', ['supply chain', 'logistics']],
    ['International Business', ['international business']],
    ['International Economics', ['international economics']],
    ['Business Administration', ['business administration', 'business management']],
    ['Finance', ['finance', 'banking']],
    ['Economics', ['economics', 'economy']],
  ];
  for (const [major, terms] of rules) {
    if (terms.some((term) => normalized.includes(term))) return major;
  }
  return value;
}

function formatExperienceDescription(raw: unknown): string {
  return String(raw || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[•●▪◦‣⁃]+\s*/gu, '\n')
    .replace(/(?:^|\n|\s)-\s+(?=\S)/g, '\n')
    .replace(/\.\s+(?=\S)/g, '.\n')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}
function normalizeProfile(raw: any): CvProfile {
  const value = raw && typeof raw === 'object' ? raw : {};
  const experienceSource = Array.isArray(value.experiences) ? value.experiences : Array.isArray(value.internship_history)
    ? value.internship_history : [];
  const experiences = experienceSource.map((item: any) => ({
    company: item.company || item.organization || '',
    role: item.role || '',
    duration: normalizeExperienceDuration(item.duration),
    description: formatExperienceDescription(item.description),
    sector: item.sector || '',
    sectorSource: item.sectorSource || item.sector_source || (item.sector ? 'extracted' : undefined),
  }));
  const parsedEducation = Array.isArray(value.parsed_cv?.education)
    ? value.parsed_cv.education
    : value.parsed_cv?.education && typeof value.parsed_cv.education === 'object' ? [value.parsed_cv.education] : [];
  const parsedCourses = parsedEducation.reduce((all: string[], item: any) => all.concat(Array.isArray(item?.courses) ? item.courses.map(String) : []), []);
  const rawEducation = Array.isArray(value.education) && value.education.length ? value.education : parsedEducation;
  const hasExplicitEducationCoursework = rawEducation.some((item: any) => item && typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'coursework'));
  const education: Education[] = rawEducation.length
    ? rawEducation.map((item: any, index: number) => ({
        institution: String(item.institution || item.university || item.universityRaw || item.school || ''),
        field: normalizeMajorName(item.field || item.major || item.majorRaw || item.faculty || ''),
        degree: normalizeDegree(item.degree || item.degreeRaw || ''),
        graduationYear: String(item.graduationYear || item.graduation_year || ''),
        gpa: normalizeGpaBand(item.gpa || item.gpaBand || item.gpaRaw || ''),
        coursework: String(Object.prototype.hasOwnProperty.call(item, 'coursework') ? item.coursework || '' : (Array.isArray(item.courses) ? item.courses.join(', ') : index === 0 ? value.coursework || '' : '')),
        universityTier: Number(item.universityTier ?? item.university_tier ?? item.tier) || undefined,
        source: item.source === 'user' ? 'user' : 'extracted',
      })).filter((item: Education) => item.institution || item.field || item.degree || item.graduationYear || item.gpa || item.coursework)
    : [value.university, value.faculty || value.major, value.degree, value.graduation_year, value.gpa, value.coursework].some(Boolean)
      ? [{ institution: String(value.university || ''), field: normalizeMajorName(value.faculty || value.major || ''), degree: normalizeDegree(value.degree || ''), graduationYear: String(value.graduation_year || ''), gpa: normalizeGpaBand(value.gpa || ''), coursework: String(value.coursework || ''), universityTier: Number(value.university_tier) || undefined, source: 'extracted' }]
      : [];
  const primaryEducation = education[0];
  const activitySource = Array.isArray(value.extracurricular_activities) ? value.extracurricular_activities : Array.isArray(value.parsed_cv?.extracurricular) ? value.parsed_cv.extracurricular : Array.isArray(value.activities) ? value.activities : [];
  const achievementSource = Array.isArray(value.honors_achievements) ? value.honors_achievements : Array.isArray(value.parsed_cv?.competitions) ? value.parsed_cv.competitions : Array.isArray(value.standout_points) ? value.standout_points : [];
  const extracurricular_activities = activitySource.map((item: any) => typeof item === 'string'
    ? { organization: item, role: '', duration: '', description: '' }
    : { organization: String(item.organization || item.club || ''), role: String(item.role || ''), duration: normalizeExperienceDuration(item.duration), description: formatExperienceDescription(item.description || item.evidenceText) });
  const honors_achievements = achievementSource.map((item: any) => typeof item === 'string'
    ? { competition: item, title: '', time: '', description: '' }
    : { competition: String(item.competition || item.name || item.nameRaw || item.nameNormalized || ''), title: String(item.title || item.award || item.result || ''), time: String(item.time || item.date || ''), description: formatExperienceDescription(item.description || item.evidenceText), category: item.category || '', sourceRowId: item.sourceRowId || '' });
  return {
    ...EMPTY_PROFILE, ...value,
    name: value.name || '',
    university: primaryEducation?.institution || value.university || '',
    university_tier: primaryEducation?.universityTier || Number(value.university_tier) || undefined,
    faculty: primaryEducation?.field || normalizeMajorName(value.faculty || value.major || ''),
    graduation_year: primaryEducation?.graduationYear || value.graduation_year || '',
    gpa: primaryEducation?.gpa || normalizeGpaBand(value.gpa || ''),
    coursework: mergeEducationCoursework(education) || (hasExplicitEducationCoursework ? '' : String(value.coursework || parsedCourses.join(', '))),
    education, experiences, extracurricular_activities, honors_achievements,
    skills: (Array.isArray(value.skills) ? value.skills : Array.isArray(value.parsed_cv?.rawSkills) ? value.parsed_cv.rawSkills : []).map((item: unknown) => String(item) === 'Advanced Excel' ? 'Excel' : String(item)).filter((item: string, index: number, all: string[]) => all.indexOf(item) === index),
    certifications: [...(Array.isArray(value.certifications) ? value.certifications : []), ...(Array.isArray(value.english_certificates) ? value.english_certificates : []), ...(Array.isArray(value.parsed_cv?.certifications) ? value.parsed_cv.certifications.map((item: any) => item?.name || item) : [])].map((item: unknown) => String(item) === 'MOS' ? 'MOS (PowerPoint, Word, Excel)' : String(item)).filter((item: string, index: number, all: string[]) => all.indexOf(item) === index),
    other_skills: String(value.other_skills || ''),
    other_skills_selected: value.other_skills_selected === true,
  };
}
function profileHasContent(profile: CvProfile) {
  return !!(profile.name || profile.university || profile.faculty || profile.gpa || profile.skills.length || profile.certifications.length || profile.other_skills_selected || profile.experiences.some((item) => item.company || item.role));
}

type SkillOption = {
  key: string;
  name: string;
  category: string;
  keywords?: string;
  kind: 'certification' | 'skill' | 'other';
};

type UniversityOption = {
  name: string;
  displayName: string;
  tier: number;
  location: string;
};

const UNIVERSITY_FULL_NAMES: Record<string, string> = {
  NEU: 'National Economics University',
  FTU: 'Foreign Trade University',
  UEB: 'VNU - University of Economics and Business',
  TMU: 'Thuongmai University',
  VinUni: 'VinUniversity',
  RMIT: 'RMIT University Vietnam',
  HUST: 'Hanoi University of Science and Technology',
  VNU: 'Vietnam National University, Hanoi',
  UEH: 'University of Economics Ho Chi Minh City',
  BAV: 'Banking Academy of Vietnam',
  DAV: 'Diplomatic Academy of Vietnam',
  AOF: 'Academy of Finance',
  HCMUT: 'Ho Chi Minh City University of Technology',
  UEL: 'University of Economics and Law',
  HCMUTE: 'Ho Chi Minh City University of Technology and Education',
  TDTU: 'Ton Duc Thang University',
  HSU: 'Hoa Sen University',
  WSU: 'Western Sydney University Vietnam',
  BUV: 'British University Vietnam',
  UDN: 'University of Danang',
  HLU: 'Hanoi Law University',
  AJC: 'Academy of Journalism and Communication',
  Swinburne: 'Swinburne University of Technology Vietnam',
};

function universityDisplayName(name: string): string {
  const trimmed = name.trim();
  const fullName = UNIVERSITY_FULL_NAMES[trimmed];
  if (fullName) return `${fullName} (${trimmed})`;
  const matchedEntry = Object.entries(UNIVERSITY_FULL_NAMES).find(([, candidate]) => candidate.toLowerCase() === trimmed.toLowerCase());
  return matchedEntry ? `${matchedEntry[1]} (${matchedEntry[0]})` : name;
}

type SkillsSelectorProps = {
  skills: string[];
  certifications: string[];
  otherSkills: string;
  otherSelected: boolean;
  onChange: (value: { skills: string[]; certifications: string[]; otherSkills: string; otherSelected: boolean }) => void;
};

function dbRows(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

let universityOptionsPromise: Promise<UniversityOption[]> | null = null;

function loadUniversityOptions(): Promise<UniversityOption[]> {
  if (universityOptionsPromise) return universityOptionsPromise;
  const db = (window as any).__workspaceDb;
  if (!db?.from) return Promise.reject(new Error('Workspace database is unavailable.'));
  universityOptionsPromise = db.from('fa_university_ranking', { shared: true })
    .orderBy('tier', 'asc')
    .limit(100)
    .get()
    .then((response: any) => dbRows(response)
      .map((row) => {
        const name = String(row.university_name || '').trim();
        return { name, displayName: universityDisplayName(name), tier: Number(row.tier), location: String(row.location || '').trim() };
      })
      .filter((option) => option.name && [1, 2, 3].includes(option.tier))
      .sort((a, b) => a.tier - b.tier || a.displayName.localeCompare(b.displayName)))
    .catch((error: unknown) => {
      universityOptionsPromise = null;
      throw error;
    });
  return universityOptionsPromise;
}

type UniversityComboProps = {
  value: string;
  onChange: (value: string, tier: number) => void;
  label?: string;
  id?: string;
  missing?: boolean;
};

export function UniversityCombo({ value, onChange, label = 'University name', id, missing = false }: UniversityComboProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<UniversityOption[]>([]);
  const [open, setOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [query, setQuery] = useState('');
  const [otherSelected, setOtherSelected] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const listId = `${id || 'university'}-options`;

  useEffect(() => {
    let cancelled = false;
    void loadUniversityOptions()
      .then((loaded) => { if (!cancelled) { setOptions(loaded); setLoadError(false); } })
      .catch(() => { if (!cancelled) setLoadError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, []);

  const visibleOptions = useMemo(() => {
    if (!filterActive) return options;
    const needle = query.trim().toLocaleLowerCase('vi');
    return options.filter((option) => !needle || `${option.displayName} ${option.name}`.toLocaleLowerCase('vi').includes(needle));
  }, [filterActive, options, query]);

  useEffect(() => { setActiveIndex(0); }, [filterActive, query, options.length]);

  const selectOption = (option: UniversityOption) => {
    onChange(option.name, option.tier);
    setOtherSelected(false);
    setQuery('');
    setFilterActive(false);
    setOpen(false);
  };

  const selectOther = () => {
    if (!otherSelected) onChange('', 3);
    setOtherSelected(true);
    setQuery('');
    setFilterActive(false);
    setOpen(false);
  };
  const optionCount = visibleOptions.length + 1;
  const displayValue = filterActive ? query : otherSelected ? 'Others' : universityDisplayName(value);

  return (
    <div ref={containerRef} className="relative block text-xs font-bold text-[var(--space-text-secondary)]">
      {label && <label htmlFor={id} className="block">{label}</label>}
      <div className={`relative ${label ? 'mt-1.5' : ''}`}>
        <input
          id={id}
          role="combobox"
          aria-label={label || 'University name'}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && activeIndex < optionCount ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          value={displayValue}
          onFocus={() => { setOpen(true); setFilterActive(false); setQuery(''); }}
          onClick={() => setOpen(true)}
          onChange={(event) => { setOtherSelected(false); setQuery(event.target.value); setFilterActive(true); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current + 1) % optionCount); }
            else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current - 1 + optionCount) % optionCount); }
            else if (event.key === 'Enter' && open) { event.preventDefault(); if (activeIndex === visibleOptions.length) selectOther(); else if (visibleOptions[activeIndex]) selectOption(visibleOptions[activeIndex]); }
            else if (event.key === 'Escape') setOpen(false);
          }}
          placeholder="Search for your university"
          aria-invalid={missing || undefined}
          className={`w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)] ${missing ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]'}`}
        />
        <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)] transition ${open ? 'rotate-180' : ''}`} />
      </div>
      {missing && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}
      {open && <div id={listId} role="listbox" className="absolute top-full z-40 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-1.5 shadow-xl">
        {loading ? <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">Loading universities…</p> : <>
          {loadError && <p className="p-3 text-sm font-normal text-[var(--space-semantic-danger)]">The verified list could not be loaded. Select Others to enter your university.</p>}
          {!loadError && visibleOptions.length === 0 && <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">No ranked university matches. Select Others to enter it manually.</p>}
          {!loadError && visibleOptions.map((option, index) => <button id={`${listId}-${index}`} key={option.name} type="button" role="option" aria-selected={!otherSelected && universityDisplayName(value) === option.displayName} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectOption(option)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold text-[var(--space-text-primary)] ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}>{option.displayName}</button>)}
          <button id={`${listId}-${visibleOptions.length}`} type="button" role="option" aria-selected={otherSelected} onMouseEnter={() => setActiveIndex(visibleOptions.length)} onClick={selectOther} className={`mt-1 flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-bold text-[var(--space-text-primary)] ${activeIndex === visibleOptions.length ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}><Plus className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />Others</button>
        </>}
      </div>}
      {otherSelected && <label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Enter university name<input value={value} onChange={(event) => onChange(event.target.value, 3)} placeholder="Enter your university name (English preferred)" className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]" /></label>}
    </div>
  );
}

type CompanyOption = { name: string };
let companyOptionsPromise: Promise<CompanyOption[]> | null = null;

function loadCompanyOptions(): Promise<CompanyOption[]> {
  if (companyOptionsPromise) return companyOptionsPromise;
  const db = (window as any).__workspaceDb;
  if (!db?.from) return Promise.reject(new Error('Workspace database is unavailable.'));
  companyOptionsPromise = db.from('programs', { shared: true })
    .orderBy('company', 'asc')
    .limit(200)
    .get()
    .then((response: any) => {
      const unique = new Map<string, CompanyOption>();
      dbRows(response).forEach((row) => {
        const name = String(row.company || '').trim();
        if (name && !unique.has(name.toLocaleLowerCase('vi'))) unique.set(name.toLocaleLowerCase('vi'), { name });
      });
      return Array.from(unique.values()).sort((a, b) => a.name.localeCompare(b.name));
    })
    .catch((error: unknown) => {
      companyOptionsPromise = null;
      throw error;
    });
  return companyOptionsPromise;
}

type CompanyComboProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  missing?: boolean;
};

export function CompanyCombo({ value, onChange, label = 'Company name', id, missing = false }: CompanyComboProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<CompanyOption[]>([]);
  const [open, setOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [query, setQuery] = useState('');
  const [otherSelected, setOtherSelected] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const listId = `${id || 'company'}-options`;

  useEffect(() => {
    let cancelled = false;
    void loadCompanyOptions()
      .then((loaded) => { if (!cancelled) { setOptions(loaded); setLoadError(false); } })
      .catch(() => { if (!cancelled) setLoadError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, []);

  const visibleOptions = useMemo(() => {
    if (!filterActive) return options;
    const needle = query.trim().toLocaleLowerCase('vi');
    return options.filter((option) => !needle || option.name.toLocaleLowerCase('vi').includes(needle));
  }, [filterActive, options, query]);

  useEffect(() => { setActiveIndex(0); }, [filterActive, query, options.length]);

  const selectOption = (option: CompanyOption) => {
    onChange(option.name);
    setOtherSelected(false);
    setQuery('');
    setFilterActive(false);
    setOpen(false);
  };

  const selectOther = () => {
    if (!otherSelected) onChange('');
    setOtherSelected(true);
    setQuery('');
    setFilterActive(false);
    setOpen(false);
  };
  const optionCount = visibleOptions.length + 1;
  const displayValue = filterActive ? query : otherSelected ? 'Others' : value;

  return (
    <div ref={containerRef} className="relative block text-xs font-bold text-[var(--space-text-secondary)]">
      {label && <label htmlFor={id} className="block">{label}</label>}
      <div className={`relative ${label ? 'mt-1.5' : ''}`}>
        <input
          id={id}
          role="combobox"
          aria-label={label || 'Company name'}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && activeIndex < optionCount ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          value={displayValue}
          onFocus={() => { setOpen(true); setFilterActive(false); setQuery(''); }}
          onClick={() => setOpen(true)}
          onChange={(event) => { setOtherSelected(false); setQuery(event.target.value); onChange(event.target.value); setFilterActive(true); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current + 1) % optionCount); }
            else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current - 1 + optionCount) % optionCount); }
            else if (event.key === 'Enter' && open) { event.preventDefault(); if (activeIndex === visibleOptions.length) selectOther(); else if (visibleOptions[activeIndex]) selectOption(visibleOptions[activeIndex]); }
            else if (event.key === 'Escape') setOpen(false);
          }}
          placeholder="Search for your company"
          aria-invalid={missing || undefined}
          className={`w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)] ${missing ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]'}`}
        />
        <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)] transition ${open ? 'rotate-180' : ''}`} />
      </div>
      {missing && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}
      {open && <div id={listId} role="listbox" className="absolute top-full z-40 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-1.5 shadow-xl">
        {loading ? <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">Loading companies…</p> : <>
          {loadError && <p className="p-3 text-sm font-normal text-[var(--space-semantic-danger)]">The verified company list could not be loaded. Select Others to enter your company.</p>}
          {!loadError && visibleOptions.length === 0 && <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">No company matches. Select Others to enter it manually.</p>}
          {!loadError && visibleOptions.map((option, index) => <button id={`${listId}-${index}`} key={option.name} type="button" role="option" aria-selected={!otherSelected && value === option.name} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectOption(option)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[var(--space-text-primary)] ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}>{option.name}</button>)}
          <button id={`${listId}-${visibleOptions.length}`} type="button" role="option" aria-selected={otherSelected} onMouseEnter={() => setActiveIndex(visibleOptions.length)} onClick={selectOther} className={`mt-1 flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-bold text-[var(--space-text-primary)] ${activeIndex === visibleOptions.length ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}><Plus className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />Others</button>
        </>}
      </div>}
      {otherSelected && <label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Enter company name<input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter your company name (English preferred)" className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]" /></label>}
    </div>
  );
}

export const EXPERIENCE_INDUSTRIES = [
  { value: 'fmcg', label: 'FMCG' },
  { value: 'banking', label: 'Banking & Finance' },
  { value: 'retail', label: 'Retail' },
  { value: 'technology', label: 'Technology' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'logistics', label: 'Logistics & Supply Chain' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'advertising', label: 'Advertising & Media' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare' },
] as const;

type IndustryKeyword = { keyword: string; sector: string };
type IndustrySource = 'auto' | 'user' | 'extracted';
let industryKeywordsPromise: Promise<IndustryKeyword[]> | null = null;

function normalizeIndustryText(raw: unknown): string {
  return String(raw || '')
    .toLocaleLowerCase('vi')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function normalizeIndustrySector(raw: unknown): string {
  const normalized = normalizeIndustryText(raw).replace(/\s+/g, '_');
  const option = EXPERIENCE_INDUSTRIES.find((item) => item.value === normalized || normalizeIndustryText(item.label).replace(/\s+/g, '_') === normalized);
  return option?.value || '';
}

function loadIndustryKeywords(): Promise<IndustryKeyword[]> {
  if (industryKeywordsPromise) return industryKeywordsPromise;
  const db = (window as any).__workspaceDb;
  if (!db?.from) return Promise.reject(new Error('Workspace database is unavailable.'));
  industryKeywordsPromise = db.from('company_industry_keywords', { shared: true })
    .orderBy('keyword', 'asc')
    .limit(500)
    .get()
    .then((response: any) => dbRows(response)
      .map((row) => ({ keyword: String(row.keyword || '').trim(), sector: normalizeIndustrySector(row.sector) }))
      .filter((row) => row.keyword && row.sector)
      .sort((a, b) => normalizeIndustryText(b.keyword).length - normalizeIndustryText(a.keyword).length))
    .catch((error: unknown) => {
      industryKeywordsPromise = null;
      throw error;
    });
  return industryKeywordsPromise;
}

function detectIndustrySector(text: string, keywords: IndustryKeyword[], allowPartial = false): string {
  const haystack = normalizeIndustryText(text);
  if (haystack.length < 2) return '';
  return keywords.find((row) => {
    const needle = normalizeIndustryText(row.keyword);
    if (needle.length < 2) return false;
    return allowPartial && needle.length > 2 ? haystack.includes(needle) : ` ${haystack} `.includes(` ${needle} `);
  })?.sector || '';
}

type ExperienceIndustrySelectProps = {
  company: string;
  description: string;
  value?: string;
  source?: IndustrySource;
  onChange: (sector: string, source?: IndustrySource) => void;
};

export function ExperienceIndustrySelect({ company, description, value = '', source, onChange }: ExperienceIndustrySelectProps) {
  const [keywords, setKeywords] = useState<IndustryKeyword[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [matchedFrom, setMatchedFrom] = useState<'company' | 'description' | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const normalizedValue = normalizeIndustrySector(value);

  useEffect(() => {
    let cancelled = false;
    void loadIndustryKeywords()
      .then((rows) => { if (!cancelled) { setKeywords(rows); setLoadError(false); } })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!keywords.length || source === 'user') return;
    const timer = window.setTimeout(() => {
      const companyMatch = detectIndustrySector(company, keywords, true);
      const descriptionMatch = companyMatch ? '' : detectIndustrySector(description, keywords);
      const nextSector = companyMatch || descriptionMatch;
      setMatchedFrom(companyMatch ? 'company' : descriptionMatch ? 'description' : null);
      if (nextSector !== normalizedValue || (!!nextSector && source !== 'auto')) {
        onChangeRef.current(nextSector, nextSector ? 'auto' : undefined);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [company, description, keywords, normalizedValue, source]);

  return (
    <label className="block text-xs font-bold text-[var(--space-text-secondary)]">
      Industry <span className="text-[var(--space-semantic-danger)]">*</span>
      <div className="relative mt-1.5">
        <select
          value={normalizedValue}
          required
          aria-required="true"
          aria-invalid={!normalizedValue || undefined}
          onChange={(event) => { setMatchedFrom(null); onChange(event.target.value, 'user'); }}
          className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] ${normalizedValue ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)]'}`}
        >
          <option value="">Select industry</option>
          {EXPERIENCE_INDUSTRIES.map((industry) => <option key={industry.value} value={industry.value}>{industry.label}</option>)}
        </select>
        <ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" />
      </div>
      {!normalizedValue && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select an industry.</span>}
      {source === 'auto' && matchedFrom && <span className="mt-1 block text-[11px] font-normal text-[var(--space-text-muted)]">Auto-detected from {matchedFrom === 'company' ? 'company name' : 'description'}. You can change it.</span>}
      {loadError && <span className="mt-1 block text-[11px] font-normal text-[var(--space-text-muted)]">Automatic detection is unavailable. You can still select an industry.</span>}
    </label>
  );
}

type MajorOption = { name: string; keywords: string };
let majorOptionsPromise: Promise<MajorOption[]> | null = null;

function loadMajorOptions(): Promise<MajorOption[]> {
  if (majorOptionsPromise) return majorOptionsPromise;
  const db = (window as any).__workspaceDb;
  if (!db?.from) return Promise.reject(new Error('Workspace database is unavailable.'));
  majorOptionsPromise = db.from('fa_major_courses', { shared: true })
    .orderBy('major', 'asc')
    .limit(200)
    .get()
    .then((response: any) => {
      const grouped = new Map<string, { name: string; courses: Set<string> }>();
      dbRows(response).forEach((row) => {
        const name = String(row.major || '').trim();
        if (!name || name.toLocaleLowerCase('vi') === 'general') return;
        const key = name.toLocaleLowerCase('vi');
        if (!grouped.has(key)) grouped.set(key, { name, courses: new Set<string>() });
        const course = String(row.course_name || '').trim();
        if (course) grouped.get(key)?.courses.add(course);
      });
      return Array.from(grouped.values())
        .map((entry) => ({ name: entry.name, keywords: Array.from(entry.courses).join(' ') }))
        .sort((a, b) => a.name.localeCompare(b.name));
    })
    .catch((error: unknown) => {
      majorOptionsPromise = null;
      throw error;
    });
  return majorOptionsPromise;
}

type MajorComboProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  missing?: boolean;
};

export function MajorCombo({ value, onChange, label = 'Faculty / major', id, missing = false }: MajorComboProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<MajorOption[]>([]);
  const [open, setOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const listId = `${id || 'major'}-options`;

  useEffect(() => {
    let cancelled = false;
    void loadMajorOptions()
      .then((loaded) => { if (!cancelled) { setOptions(loaded); setLoadError(false); } })
      .catch(() => { if (!cancelled) setLoadError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, []);

  const visibleOptions = useMemo(() => {
    if (!filterActive) return options;
    const needle = value.trim().toLocaleLowerCase('vi');
    return options.filter((option) => !needle || `${option.name} ${option.keywords}`.toLocaleLowerCase('vi').includes(needle));
  }, [filterActive, options, value]);

  useEffect(() => { setActiveIndex(0); }, [filterActive, value, options.length]);

  const selectOption = (option: MajorOption) => {
    onChange(option.name);
    setFilterActive(false);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative block text-xs font-bold text-[var(--space-text-secondary)]">
      {label && <label htmlFor={id} className="block">{label}</label>}
      <div className={`relative ${label ? 'mt-1.5' : ''}`}>
        <input
          id={id}
          role="combobox"
          aria-label={label || 'Faculty / major'}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && visibleOptions[activeIndex] ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          value={value}
          onFocus={() => { setOpen(true); setFilterActive(false); }}
          onClick={() => setOpen(true)}
          onChange={(event) => { onChange(event.target.value); setFilterActive(true); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current + 1) % Math.max(visibleOptions.length, 1)); }
            else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current - 1 + visibleOptions.length) % Math.max(visibleOptions.length, 1)); }
            else if (event.key === 'Enter' && open && visibleOptions[activeIndex]) { event.preventDefault(); selectOption(visibleOptions[activeIndex]); }
            else if (event.key === 'Escape') setOpen(false);
          }}
          placeholder="Search or enter your major"
          aria-invalid={missing || undefined}
          className={`w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)] ${missing ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]'}`}
        />
        <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)] transition ${open ? 'rotate-180' : ''}`} />
      </div>
      {missing && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}
      {open && <div id={listId} role="listbox" className="absolute top-full z-40 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-1.5 shadow-xl">
        {loading ? <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">Loading majors…</p> : loadError ? <p className="p-3 text-sm font-normal text-[var(--space-semantic-danger)]">The verified major list could not be loaded. You can still enter your major as free text.</p> : visibleOptions.length === 0 ? <p className="p-3 text-sm font-normal text-[var(--space-text-muted)]">No major matches. Your entry will be kept as free text.</p> : visibleOptions.map((option, index) => <button id={`${listId}-${index}`} key={option.name} type="button" role="option" aria-selected={value === option.name} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectOption(option)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[var(--space-text-primary)] ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}>{option.name}</button>)}
      </div>}
    </div>
  );
}

const MONTH_NUMBERS: Record<string, string> = {
  jan: '01', january: '01', feb: '02', february: '02', mar: '03', march: '03', apr: '04', april: '04', may: '05', jun: '06', june: '06', jul: '07', july: '07', aug: '08', august: '08', sep: '09', sept: '09', september: '09', oct: '10', october: '10', nov: '11', november: '11', dec: '12', december: '12',
};

function parseMonthPoint(raw: string): string {
  const value = raw.trim().replace(/,/g, ' ');
  let match = value.match(/\b(20\d{2}|19\d{2})[-/]([01]?\d)\b/);
  if (match) {
    const month = Number(match[2]);
    return month >= 1 && month <= 12 ? `${match[1]}-${String(month).padStart(2, '0')}` : '';
  }
  match = value.match(/\b([01]?\d)[/.](20\d{2}|19\d{2})\b/);
  if (match) {
    const month = Number(match[1]);
    return month >= 1 && month <= 12 ? `${match[2]}-${String(month).padStart(2, '0')}` : '';
  }
  match = value.match(/\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(20\d{2}|19\d{2})\b/i);
  if (match) return `${match[2]}-${MONTH_NUMBERS[match[1].toLowerCase()] || ''}`;
  return '';
}

function parseDurationRange(raw: string): { start: string; end: string; present: boolean; parsed: boolean } {
  const value = String(raw || '').trim();
  if (!value) return { start: '', end: '', present: false, parsed: true };
  const present = /(?:present|current(?:ly)?|now|ongoing|today|to date|till date|until now|hiện tại|hien tai|đến nay|den nay|nay)$/iu.test(value);
  const withoutPresent = present
    ? value.replace(/(?:present|current(?:ly)?|now|ongoing|today|to date|till date|until now|hiện tại|hien tai|đến nay|den nay|nay)$/iu, '').replace(/\s*(?:[-–—]|to|until|đến|den)\s*$/iu, '').trim()
    : value;
  const parts = withoutPresent.split(/\s+(?:[-–—]|to|until|đến|den)\s+/iu).filter(Boolean);
  const start = parseMonthPoint(parts[0] || '');
  const end = present ? '' : parseMonthPoint(parts[1] || '');
  return { start, end, present, parsed: !!start || !!end || present };
}

function formatDurationRange(start: string, end: string, present: boolean): string {
  const display = (month: string) => month ? `${month.slice(5, 7)}/${month.slice(0, 4)}` : '';
  const startText = display(start);
  if (present) return startText ? `${startText} – Present` : 'Present';
  const endText = display(end);
  return startText && endText ? `${startText} – ${endText}` : startText || endText;
}

const MONTH_CHOICES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type MonthPickerProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  allowPresent?: boolean;
  present?: boolean;
  onPresent?: () => void;
  missing?: boolean;
};

export function MonthPicker({ value, placeholder, onChange, allowPresent = false, present = false, onPresent, missing = false }: MonthPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueYear = Number(value.slice(0, 4));
  const valueMonth = Number(value.slice(5, 7));
  const [open, setOpen] = useState(false);
  const [displayYear, setDisplayYear] = useState(valueYear || new Date().getFullYear());

  useEffect(() => { if (valueYear) setDisplayYear(valueYear); }, [valueYear]);
  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, []);

  const displayValue = present ? 'Present' : valueYear ? (valueMonth ? `${MONTH_CHOICES[valueMonth - 1]} ${valueYear}` : String(valueYear)) : placeholder;

  return (
    <div ref={containerRef} className="relative">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} aria-invalid={missing || undefined} onClick={() => setOpen((current) => !current)} className={`flex w-full items-center justify-between rounded-lg border bg-[var(--space-surface-card)] px-3 py-2 text-left text-sm font-normal text-[var(--space-text-primary)] ${missing ? 'border-[var(--space-semantic-danger)]' : 'border-[var(--space-border-default)]'}`}>
        <span className={present || value ? '' : 'text-[var(--space-text-muted)]'}>{displayValue}</span><CalendarDays className="h-4 w-4 shrink-0 text-[var(--space-text-muted)]" />
      </button>
      {open && <div role="dialog" aria-label={`${placeholder} picker`} className="absolute top-full z-50 mt-2 w-full min-w-56 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-2 shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--space-border-default)] pb-2">
          <button type="button" aria-label="Previous year" onClick={() => setDisplayYear((year) => year - 1)} className="flex h-8 w-8 !min-h-0 items-center justify-center rounded-lg hover:bg-[var(--space-surface-muted)]"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm font-semibold text-[var(--space-text-primary)]">{displayYear}</span>
          <button type="button" aria-label="Next year" onClick={() => setDisplayYear((year) => year + 1)} className="flex h-8 w-8 !min-h-0 items-center justify-center rounded-lg hover:bg-[var(--space-surface-muted)]"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-3 gap-1 py-2">{MONTH_CHOICES.map((month, index) => { const monthNumber = index + 1; const selected = !present && valueYear === displayYear && valueMonth === monthNumber; return <button key={month} type="button" onClick={() => { onChange(`${displayYear}-${String(monthNumber).padStart(2, '0')}`); setOpen(false); }} className={`mx-1 flex !min-h-0 items-center justify-center rounded-lg px-2 py-2 text-center text-xs font-normal ${selected ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'}`}>{month.slice(0, 3)}</button>; })}</div>
        {allowPresent && <button type="button" onClick={() => { onPresent?.(); setOpen(false); }} className={`w-full !min-h-0 border-t border-[var(--space-border-default)] px-3 py-2 text-sm font-normal ${present ? 'text-[var(--space-text-brand)]' : 'text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]'}`}>Present</button>}
      </div>}
    </div>
  );
}

type AchievementTimePickerProps = { value: string; onChange: (value: string) => void };

export function AchievementTimePicker({ value, onChange }: AchievementTimePickerProps) {
  const month = parseMonthPoint(String(value || ''));
  return <MonthPicker value={month} placeholder="Time" onChange={(selectedMonth) => onChange(formatDurationRange(selectedMonth, '', false))} />;
}

type ExperienceDurationEditorProps = { value: string; onChange: (value: string) => void; missing?: boolean };

export function ExperienceDurationEditor({ value, onChange, missing = false }: ExperienceDurationEditorProps) {
  const range = parseDurationRange(value);
  const invalidOrder = !!(range.start && range.end && range.end < range.start);
  const missingStart = missing && !range.start;
  const missingEnd = missing && !range.end && !range.present;
  const incomplete = missingStart || missingEnd;
  return (
    <div>
      <p className="text-xs font-bold text-[var(--space-text-secondary)]">Duration</p>
      <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
        <MonthPicker value={range.start} placeholder="Start month" missing={missingStart} onChange={(start) => onChange(formatDurationRange(start, range.end, range.present))} />
        <MonthPicker value={range.end} placeholder="End month" present={range.present} missing={missingEnd} allowPresent onChange={(end) => onChange(formatDurationRange(range.start, end, false))} onPresent={() => onChange(formatDurationRange(range.start, '', true))} />
      </div>
      {incomplete && <p className="mt-1 text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read the {missingStart && missingEnd ? 'start and end dates' : missingStart ? 'start date' : 'end date'} — please fill it in.</p>}
      {invalidOrder && <p className="mt-1 text-[11px] font-semibold text-[var(--space-semantic-danger)]">End month must be the same as or later than the start month.</p>}
      {!range.parsed && value && <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Saved duration: {value}. Choose start and end months to update it.</p>}
    </div>
  );
}

export function CombinedSkillsSelector({ skills, certifications, otherSkills, otherSelected, onChange }: SkillsSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<SkillOption[]>([]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const db = (window as any).__workspaceDb;
    if (!db?.from) { setLoading(false); setLoadError(true); return; }
    void Promise.all([
      db.from('fa_certifications', { shared: true }).orderBy('cert_name', 'asc').limit(200).get(),
      db.from('fa_skills', { shared: true }).orderBy('skill_name', 'asc').limit(200).get(),
    ]).then(([certResponse, skillResponse]) => {
      if (cancelled) return;
      const certOptions = dbRows(certResponse).map((row) => ({
        key: `cert:${String(row.cert_name)}`,
        name: String(row.cert_name),
        category: String(row.industry || 'Certifications'),
        keywords: String(row.keywords || ''),
        kind: 'certification' as const,
      }));
      const skillOptions = dbRows(skillResponse).map((row) => ({
        key: `skill:${String(row.skill_name)}`,
        name: String(row.skill_name),
        category: String(row.skill_type || 'Skill') === 'Technical' ? 'Technical skills' : 'Soft skills',
        keywords: String(row.keywords || ''),
        kind: 'skill' as const,
      }));
      setOptions([...certOptions, ...skillOptions]);
      setLoadError(false);
    }).catch(() => { if (!cancelled) setLoadError(true); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, []);

  const selectedKeys = useMemo(() => new Set([
    ...skills.map((name) => `skill:${name}`),
    ...certifications.map((name) => `cert:${name}`),
    ...(otherSelected ? ['other'] : []),
  ]), [skills, certifications, otherSelected]);
  const selectedCount = selectedKeys.size;
  const visibleOptions = useMemo<SkillOption[]>(() => {
    const needle = query.trim().toLocaleLowerCase('vi');
    const filtered = options
      .filter((option) => !needle || `${option.name} ${option.category} ${option.keywords || ''}`.toLocaleLowerCase('vi').includes(needle))
      .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    return [...filtered, { key: 'other', name: 'Others', category: 'Khác', kind: 'other' as const }];
  }, [options, query]);

  useEffect(() => { setActiveIndex(0); }, [query, options.length]);
  useEffect(() => {
    if (!open || loading) return;
    document.getElementById(`fit-skill-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open, loading]);

  const updateOption = (option: SkillOption) => {
    const selected = selectedKeys.has(option.key);
    if (!selected && selectedCount >= 8) return;
    if (option.kind === 'other') {
      onChange({ skills, certifications, otherSkills: selected ? '' : otherSkills, otherSelected: !selected });
    } else if (option.kind === 'certification') {
      onChange({ skills, certifications: selected ? certifications.filter((name) => name !== option.name) : [...certifications, option.name], otherSkills, otherSelected });
    } else {
      onChange({ skills: selected ? skills.filter((name) => name !== option.name) : [...skills, option.name], certifications, otherSkills, otherSelected });
    }
    setQuery('');
    setOpen(true);
  };

  const selectedOptions = useMemo<SkillOption[]>(() => [
    ...certifications.map((name) => options.find((option) => option.key === `cert:${name}`) || { key: `cert:${name}`, name, category: 'Certification', kind: 'certification' as const }),
    ...skills.map((name) => options.find((option) => option.key === `skill:${name}`) || { key: `skill:${name}`, name, category: 'Skill', kind: 'skill' as const }),
    ...(otherSelected ? [{ key: 'other', name: 'Others', category: 'Khác', kind: 'other' as const }] : []),
  ], [certifications, skills, otherSelected, options]);

  return (
    <section className="mt-6 rounded-2xl border border-[var(--space-border-default)] p-4" ref={containerRef}>
      <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-extrabold">Skills</h3><span className="text-[11px] font-semibold text-[var(--space-text-muted)]">{selectedCount}/8</span></div>
      <div className="relative mt-3">
        {selectedOptions.length > 0 && <div className="mb-2 flex flex-wrap gap-2">{selectedOptions.map((option) => <span key={option.key} className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><span className="truncate">{option.name}</span><button type="button" onClick={() => updateOption(option)} aria-label={`Bỏ chọn ${option.name}`} className="flex h-5 min-h-0 w-5 shrink-0 items-center justify-center rounded-full hover:bg-[var(--space-surface-muted)]"><X className="h-3.5 w-3.5" /></button></span>)}</div>}
        <div className="relative">
          <input
            role="combobox"
            aria-label="Tìm kiếm kỹ năng"
            aria-expanded={open}
            aria-controls="fit-skill-options"
            aria-activedescendant={open && !loading ? `fit-skill-option-${activeIndex}` : undefined}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current + 1) % Math.max(visibleOptions.length, 1)); }
              else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current - 1 + visibleOptions.length) % Math.max(visibleOptions.length, 1)); }
              else if (event.key === 'Enter' && open && visibleOptions[activeIndex]) { event.preventDefault(); updateOption(visibleOptions[activeIndex]); }
              else if (event.key === 'Escape') { setOpen(false); }
              else if (event.key === 'Backspace' && !query && selectedOptions.length) { updateOption(selectedOptions[selectedOptions.length - 1]); }
            }}
            placeholder="Select up to 8 skills"
            className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-3 pr-10 text-sm outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]"
          />
          <ChevronDown className={`pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[var(--space-text-muted)] transition ${open ? 'rotate-180' : ''}`} />
        </div>
        {open && <div id="fit-skill-options" role="listbox" aria-multiselectable="true" className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-1.5 shadow-xl">
          {loading ? <p className="p-3 text-sm text-[var(--space-text-muted)]">Đang tải kỹ năng…</p> : <>{loadError && <p className="p-3 text-sm text-[var(--space-semantic-danger)]">Không thể tải danh sách kỹ năng. Bạn vẫn có thể chọn Others.</p>}{visibleOptions.map((option, index) => { const selected = selectedKeys.has(option.key); const disabled = !selected && selectedCount >= 8; return <button id={`fit-skill-option-${index}`} key={option.key} type="button" role="option" aria-selected={selected} aria-disabled={disabled} onMouseEnter={() => setActiveIndex(index)} onClick={() => updateOption(option)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : ''} ${disabled ? 'cursor-not-allowed opacity-45' : 'hover:bg-[var(--space-surface-muted)]'}`}><span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--space-text-brand)]">{selected && <Check className="h-4 w-4" />}</span><span className="min-w-0 flex-1 truncate text-sm font-bold">{option.name}</span></button>; })}</>}
        </div>}
      </div>
      {selectedCount >= 8 && <p className="mt-2 text-xs font-semibold text-[var(--space-text-muted)]">Bạn đã chọn tối đa 8 kỹ năng.</p>}
      {otherSelected && <label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Kỹ năng khác<textarea maxLength={100} rows={3} value={otherSkills} onChange={(event) => onChange({ skills, certifications, otherSkills: event.target.value, otherSelected })} placeholder="Các kỹ năng cần cách nhau bởi dấu phẩy (tối đa 100 ký tự)" className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] p-3 text-sm outline-none focus:border-[var(--space-brand-primary)]" /><span className="mt-1 block text-right text-[10px] font-semibold text-[var(--space-text-muted)]">{otherSkills.length}/100</span></label>}
    </section>
  );
}

type CatalogMultiSelectProps = {
  id: string;
  title: string;
  searchLabel: string;
  placeholder: string;
  loadingLabel: string;
  errorLabel: string;
  emptyLabel: string;
  customLabel: string;
  otherLabel: string;
  otherPlaceholder: string;
  showCategory?: boolean;
  options: SkillOption[];
  selected: string[];
  loading: boolean;
  loadError: boolean;
  onChange: (values: string[]) => void;
};

function CatalogMultiSelect({ id, title, searchLabel, placeholder, loadingLabel, errorLabel, emptyLabel, customLabel, otherLabel, otherPlaceholder, showCategory = false, options, selected, loading, loadError, onChange }: CatalogMultiSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');
  const listId = `${id}-options`;
  const normalizedSelected = useMemo(() => new Set(selected.map((name) => name.toLocaleLowerCase('vi'))), [selected]);
  const visibleOptions = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('vi');
    return options.filter((option) => !needle || `${option.name} ${option.category} ${option.keywords || ''}`.toLocaleLowerCase('vi').includes(needle));
  }, [options, query]);
  const customValue = query.trim();
  const canAddCustom = !!customValue && !options.some((option) => option.name.toLocaleLowerCase('vi') === customValue.toLocaleLowerCase('vi')) && !normalizedSelected.has(customValue.toLocaleLowerCase('vi'));
  const customOptionIndex = visibleOptions.length;
  const otherOptionIndex = visibleOptions.length + (canAddCustom ? 1 : 0);
  const optionCount = otherOptionIndex + 1;

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, []);
  useEffect(() => { setActiveIndex(0); }, [query, options.length]);
  useEffect(() => {
    if (!open || loading || optionCount === 0) return;
    document.getElementById(`${id}-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, id, loading, open, optionCount]);

  const addValue = (name: string) => {
    const value = name.trim();
    if (!value || normalizedSelected.has(value.toLocaleLowerCase('vi'))) return;
    onChange([...selected, value]);
    setQuery('');
    setOpen(true);
  };
  const removeValue = (name: string) => onChange(selected.filter((value) => value !== name));
  const openOtherInput = () => {
    setShowOtherInput(true);
    setOtherValue('');
    setQuery('');
    setOpen(false);
  };
  const addOtherValue = () => {
    const value = otherValue.trim();
    if (!value) return;
    addValue(value);
    setOtherValue('');
    setOpen(false);
  };
  const chooseActiveOption = () => {
    if (activeIndex < visibleOptions.length) addValue(visibleOptions[activeIndex].name);
    else if (canAddCustom && activeIndex === customOptionIndex) addValue(customValue);
    else if (activeIndex === otherOptionIndex) openOtherInput();
  };

  return (
    <section ref={containerRef} className="mt-5 rounded-2xl border border-[var(--space-border-default)] p-4">
      <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-extrabold">{title}</h3><span className="text-[11px] font-semibold text-[var(--space-text-muted)]">{selected.length} selected</span></div>
      {selected.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{selected.map((name) => <span key={name} className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><span className="truncate">{name}</span><button type="button" onClick={() => removeValue(name)} aria-label={`Remove ${name}`} className="flex h-5 min-h-0 w-5 shrink-0 items-center justify-center rounded-full hover:bg-[var(--space-surface-muted)]"><X className="h-3.5 w-3.5" /></button></span>)}</div>}
      <div className="relative mt-3">
        <div className="relative">
          <input
            role="combobox"
            aria-label={searchLabel}
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={open && optionCount > 0 ? `${id}-option-${activeIndex}` : undefined}
            autoComplete="off"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current + 1) % Math.max(optionCount, 1)); }
              else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActiveIndex((current) => (current - 1 + optionCount) % Math.max(optionCount, 1)); }
              else if (event.key === 'Enter' && open && optionCount > 0) { event.preventDefault(); chooseActiveOption(); }
              else if (event.key === 'Escape') setOpen(false);
              else if (event.key === 'Backspace' && !query && selected.length) removeValue(selected[selected.length - 1]);
            }}
            placeholder={placeholder}
            className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-3 pr-10 text-sm outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]"
          />
          <ChevronDown className={`pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[var(--space-text-muted)] transition ${open ? 'rotate-180' : ''}`} />
        </div>
        {open && <div id={listId} role="listbox" aria-multiselectable="true" className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-1.5 shadow-xl">
          {loading ? <p className="p-3 text-sm text-[var(--space-text-muted)]">{loadingLabel}</p> : <>
            {loadError && <p className="p-3 text-sm text-[var(--space-semantic-danger)]">{errorLabel}</p>}
            {!loadError && visibleOptions.length === 0 && !canAddCustom && <p className="p-3 text-sm text-[var(--space-text-muted)]">{emptyLabel}</p>}
            {!loadError && visibleOptions.map((option, index) => { const alreadySelected = normalizedSelected.has(option.name.toLocaleLowerCase('vi')); return <button id={`${id}-option-${index}`} key={option.key} type="button" role="option" aria-selected={alreadySelected} onMouseEnter={() => setActiveIndex(index)} onClick={() => alreadySelected ? removeValue(selected.find((name) => name.toLocaleLowerCase('vi') === option.name.toLocaleLowerCase('vi')) || option.name) : addValue(option.name)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${activeIndex === index ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}><span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--space-text-brand)]">{alreadySelected && <Check className="h-4 w-4" />}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{option.name}</span>{showCategory && <span className="block truncate text-[11px] text-[var(--space-text-muted)]">{option.category}</span>}</span></button>; })}
            {canAddCustom && <button id={`${id}-option-${customOptionIndex}`} type="button" role="option" aria-selected="false" onMouseEnter={() => setActiveIndex(customOptionIndex)} onClick={() => addValue(customValue)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${activeIndex === customOptionIndex ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}><Plus className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" /><span className="min-w-0 text-sm font-bold">{customLabel} “{customValue}”</span></button>}
            <button id={`${id}-option-${otherOptionIndex}`} type="button" role="option" aria-selected={showOtherInput} onMouseEnter={() => setActiveIndex(otherOptionIndex)} onClick={openOtherInput} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${activeIndex === otherOptionIndex ? 'bg-[var(--space-surface-muted)]' : 'hover:bg-[var(--space-surface-muted)]'}`}><Plus className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" /><span className="min-w-0 text-sm font-bold">Others</span></button>
          </>}
        </div>}
      </div>
      {showOtherInput && <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><label htmlFor={`${id}-other`} className="block text-xs font-bold text-[var(--space-text-secondary)]">{otherLabel}</label><div className="mt-2 flex flex-col gap-2 sm:flex-row"><input id={`${id}-other`} autoFocus value={otherValue} onChange={(event) => setOtherValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addOtherValue(); } }} placeholder={otherPlaceholder} className="min-w-0 flex-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]" /><div className="flex gap-2"><button type="button" disabled={!otherValue.trim()} onClick={addOtherValue} className="flex-1 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-45">Add</button><button type="button" onClick={() => { setShowOtherInput(false); setOtherValue(''); }} className="flex-1 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-secondary)]">Cancel</button></div></div></div>}
    </section>
  );
}

function canonicalCertificationName(name: string): string {
  const value = name.trim();
  if (/^JLPT\b/i.test(value)) return 'JLPT';
  if (/^HSK\b/i.test(value)) return 'HSK';
  return value;
}

export function SkillsSelector({ skills, certifications, otherSkills, otherSelected, onChange }: SkillsSelectorProps) {
  const [options, setOptions] = useState<SkillOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const db = (window as any).__workspaceDb;
    if (!db?.from) { setLoading(false); setLoadError(true); return; }
    void Promise.all([
      db.from('fa_skills', { shared: true }).orderBy('skill_name', 'asc').limit(200).get(),
      db.from('fa_certifications', { shared: true }).orderBy('cert_name', 'asc').limit(200).get(),
    ]).then(([skillResponse, certResponse]) => {
      if (cancelled) return;
      const skillOptions = dbRows(skillResponse).map((row) => ({
        key: `skill:${String(row.skill_name)}`,
        name: String(row.skill_name),
        category: String(row.skill_type || 'Skill') === 'Technical' ? 'Technical skills' : 'Soft skills',
        keywords: String(row.keywords || ''),
        kind: 'skill' as const,
      }));
      const groupedCertifications = new Map<string, SkillOption>();
      dbRows(certResponse).forEach((row) => {
        const sourceName = String(row.cert_name || '').trim();
        const name = canonicalCertificationName(sourceName);
        const key = name.toLocaleLowerCase('vi');
        const existing = groupedCertifications.get(key);
        const keywords = [existing?.keywords, sourceName, String(row.keywords || '')].filter(Boolean).join(' ');
        groupedCertifications.set(key, {
          key: `cert:${name}`,
          name,
          category: existing?.category || String(row.industry || 'Certification'),
          keywords,
          kind: 'certification',
        });
      });
      const certOptions = Array.from(groupedCertifications.values()).sort((a, b) => a.name.localeCompare(b.name));
      setOptions([...skillOptions, ...certOptions]);
      setLoadError(false);
    }).catch(() => { if (!cancelled) setLoadError(true); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const skillOptions = useMemo(() => options.filter((option) => option.kind === 'skill'), [options]);
  const certificationOptions = useMemo(() => options.filter((option) => option.kind === 'certification'), [options]);
  const canonicalCertifications = useMemo(() => Array.from(new Map(certifications.map((name) => {
    const canonical = canonicalCertificationName(name);
    return [canonical.toLocaleLowerCase('vi'), canonical] as const;
  })).values()), [certifications]);

  return (
    <>
      <CatalogMultiSelect
        id="fit-skills"
        title="Skills"
        searchLabel="Search skills"
        placeholder="Search skills (e.g. finance, Excel, Python, marketing)"
        loadingLabel="Loading skills…"
        errorLabel="The skills list could not be loaded. You can still add a skill as free text."
        emptyLabel="No matching skill. Type a name and add it as a custom skill."
        customLabel="Add skill"
        otherLabel="Enter another skill"
        otherPlaceholder="Enter a skill not listed above"
        options={skillOptions}
        selected={skills}
        loading={loading}
        loadError={loadError}
        onChange={(values) => onChange({ skills: values, certifications, otherSkills, otherSelected })}
      />
      {otherSelected && <div className="mt-3 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><div className="flex items-center justify-between gap-3"><label className="text-xs font-bold text-[var(--space-text-secondary)]" htmlFor="fit-legacy-other-skills">Additional saved skills</label><button type="button" onClick={() => onChange({ skills, certifications, otherSkills: '', otherSelected: false })} className="text-xs font-bold text-[var(--space-semantic-danger)]">Remove</button></div><textarea id="fit-legacy-other-skills" maxLength={100} rows={2} value={otherSkills} onChange={(event) => onChange({ skills, certifications, otherSkills: event.target.value, otherSelected })} placeholder="Additional skills saved in your earlier assessment" className="mt-2 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-3 text-sm outline-none focus:border-[var(--space-brand-primary)]" /></div>}
      <CatalogMultiSelect
        id="fit-certifications"
        title="Certifications"
        searchLabel="Search certifications"
        placeholder="Search certifications (e.g. CFA, Google, data, project management)"
        loadingLabel="Loading certifications…"
        errorLabel="The certifications list could not be loaded. You can still add one as free text."
        emptyLabel="No matching certification. Type a name and add it as a custom certification."
        customLabel="Add certification"
        otherLabel="Enter another certification"
        otherPlaceholder="Enter a certification not listed above"
        showCategory
        options={certificationOptions}
        selected={canonicalCertifications}
        loading={loading}
        loadError={loadError}
        onChange={(values) => onChange({ skills, certifications: values, otherSkills, otherSelected })}
      />
    </>
  );
}

const PARSE_LABELS = ['Reading your CV', 'Structuring your experience', 'Identifying relevant evidence', 'Preparing your profile for review'];
const MISSING_INPUT_CLASS = 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))]';
function isInternRole(value: unknown): boolean {
  return /(?:\bintern(?:ship)?\b|\btrainee\b|thực\s*tập(?:\s*sinh)?|thuc\s*tap(?:\s*sinh)?)/iu.test(String(value || ''));
}

export default function FitAssessmentApp({ onBackToSelector }: { onBackToSelector?: () => void } = {}) {
  const { sessionId, visitorId, spaceId, userEmail } = useSpaceRuntime();
  const email = useMemo(() => userEmail || readSessionEmail(spaceId), [userEmail, spaceId]);
  const userKey = useMemo(() => email ? `email:${email}` : `device:${visitorId || 'anonymous'}`, [email, visitorId]);
  const storageKey = `casemate-function-first-v1:${sessionId || 'preview'}`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const restoredStorageKeyRef = useRef<string | null>(null);
  const localProgressRef = useRef(false);
  const recoverySessionRef = useRef<string | null>(null);
  const autosaveSequenceRef = useRef(0);
  const autosaveTimerRef = useRef<number | null>(null);
  const progressRef = useRef<Record<string, unknown> | null>(null);
  const [hydratedStorageKey, setHydratedStorageKey] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const [step, setStep] = useState(1);
  const [cvReady, setCvReady] = useState(false);
  const [cvEntryMode, setCvEntryMode] = useState<'upload' | 'saved' | 'manual' | null>(null);
  const [parsePhase, setParsePhase] = useState(0);
  const missingAfterUpload = (value: unknown) => cvEntryMode === 'upload' && !String(value || '').trim();
  const [profile, setProfile] = useState<CvProfile>(EMPTY_PROFILE);
  const [cvText, setCvText] = useState('');
  const [showPaste, setShowPaste] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [dragging, setDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [savedCv, setSavedCv] = useState<{ profile: CvProfile; date: string } | null>(null);
  useEffect(() => {
    if (!email) return;
    const db = (window as any).__workspaceDb;
    if (!db?.from) return;
    let cancelled = false;
    void Promise.resolve(db.from('user_cv_profiles', { shared: true }).eq('user_email', email).orderBy('id', 'desc').limit(1).get()).catch(() => []).then((response: any) => {
      const rows = Array.isArray(response) ? response : Array.isArray(response?.data) ? response.data : Array.isArray(response?.rows) ? response.rows : [];
      const row = rows[0];
      if (cancelled || !row) return;
      let parsed: any = row.raw_cv_text;
      if (typeof parsed === 'string') { try { parsed = JSON.parse(parsed); } catch { parsed = null; } }
      if (parsed && typeof parsed === 'object') setSavedCv({ profile: normalizeProfile(parsed), date: String(row.updated_at || row.created_at || '') });
    });
    return () => { cancelled = true; };
  }, [email]);
  const [error, setError] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<MotivationAnswers>(EMPTY_MOTIVATION);
  const [ocp, setOcp] = useState<OcpScores>(DEFAULT_OCP);
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<string, 'A' | 'B'>>({});
  const [mbtiIndex, setMbtiIndex] = useState(0);
  const [mbtiMode, setMbtiMode] = useState<'known' | 'assessment' | null>(null);
  const [mbtiType, setMbtiType] = useState('');
  const [functionScores, setFunctionScores] = useState<FunctionScore[]>([]);
  const [assessmentResultId, setAssessmentResultId] = useState<number | null>(null);
  const [programs, setPrograms] = useState<ProgramMatch[]>([]);
  const [fitAnalysis, setFitAnalysis] = useState<Record<string, any> | null>(null);
  const [filterFunctions, setFilterFunctions] = useState<string[]>([]);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [busy, setBusy] = useState<'idle' | 'function' | 'programs'>('idle');
  const [roadmapBusy, setRoadmapBusy] = useState(false);
  const [assessmentSessionId, setAssessmentSessionId] = useState(() => `fit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`);
  const fitStartedTrackedRef = useRef(false);
  const hasLiveProgress = cvReady
    || step > 1
    || cvText.trim().length > 0
    || profileHasContent(profile)
    || Object.values(motivation).some(Boolean)
    || Object.keys(mbtiAnswers).length > 0
    || functionScores.length > 0;
  if (hydratedStorageKey === storageKey && hasLiveProgress) localProgressRef.current = true;

  const emitFitEvent = useCallback(async (
    eventName: string,
    eventRole: FitEventRole,
    properties: Record<string, unknown>,
    options: FitEventOptions = {},
  ) => {
    if (!sessionId) return;
    const eventId = createFitEventId();
    try {
      const response = await fetch(FIT_TRACKING_HOOK, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify({
          event: {
            event_key: eventId,
            event_name: eventName,
            event_role: eventRole,
            completion_key: options.completionKey ?? null,
            occurred_at: new Date().toISOString(),
            properties_json: properties,
          },
        }),
      });
      if (!response.ok) throw new Error(`tracking_http_${response.status}`);
      const payload = await response.json().catch(() => ({}));
      if (payload.success === false) throw new Error(payload.error || 'tracking_write_failed');
    } catch (error) {
      // Tracking is best-effort and must never interrupt assessment progress.
      console.warn('[Fit Assessment] authenticated feature event write failed:', eventName, error);
    }
  }, [sessionId]);

  const trackEvent = useCallback(async (eventName: string, properties: Record<string, unknown> = {}) => {
    await emitFitEvent(eventName, 'diagnostic', properties);
  }, [emitFitEvent]);

  useEffect(() => {
    if (!sessionId || fitStartedTrackedRef.current) return;
    fitStartedTrackedRef.current = true;
    void emitFitEvent('fit_started', 'open', {});
  }, [sessionId, emitFitEvent]);

  useEffect(() => {
    if (restoredStorageKeyRef.current === storageKey) return;
    const sessionChanged = restoredStorageKeyRef.current !== null;
    restoredStorageKeyRef.current = storageKey;
    localProgressRef.current = false;
    recoverySessionRef.current = null;
    if (sessionChanged) {
      setStep(1); setCvReady(false); setProfile(EMPTY_PROFILE); setCvText(''); setShowPaste(false); setSelectedFile(''); setError(null);
      setMotivation(EMPTY_MOTIVATION); setOcp(DEFAULT_OCP); setMbtiAnswers({}); setMbtiIndex(0); setMbtiMode(null); setMbtiType(''); setFunctionScores([]); setAssessmentResultId(null);
      setPrograms([]); setFitAnalysis(null); setFilterFunctions([]); setFilterExpanded(false); setSelectedProgram(null); setBusy('idle');
      setAssessmentSessionId(`fit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`);
    }
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      if (typeof saved.cvText === 'string') setCvText(saved.cvText);
      if (saved.showPaste) setShowPaste(true);
      if (saved.profile) {
        const restoredProfile = normalizeProfile(saved.profile);
        setProfile(restoredProfile);
      }
      if (saved.cvReady) setCvReady(true);
      if (saved.motivation) setMotivation({ ...EMPTY_MOTIVATION, ...saved.motivation });
      if (saved.ocp) setOcp({ ...DEFAULT_OCP, ...saved.ocp });
      if (saved.mbtiAnswers) { setMbtiAnswers(saved.mbtiAnswers); setMbtiIndex(Math.min(Object.keys(saved.mbtiAnswers).length, MBTI_ITEMS.length - 1)); }
      if (Array.isArray(saved.functionScores)) setFunctionScores(saved.functionScores);
      if (Number.isFinite(Number(saved.assessmentResultId))) setAssessmentResultId(Number(saved.assessmentResultId));
      if (Array.isArray(saved.programs)) setPrograms(saved.programs);
      if (saved.fitAnalysis && typeof saved.fitAnalysis === 'object') setFitAnalysis(saved.fitAnalysis);
      if (Array.isArray(saved.filterFunctions)) setFilterFunctions(saved.filterFunctions);
      if (saved.filterExpanded) setFilterExpanded(true);
      if (typeof saved.selectedProgram === 'string') setSelectedProgram(saved.selectedProgram);
      if (saved.assessmentSessionId) setAssessmentSessionId(String(saved.assessmentSessionId));
      { const restoredStep = Math.max(1, Math.min(7, Number(saved.step) || 1)); setStep(restoredStep === 4 ? 3 : restoredStep); }
      localProgressRef.current = saved.cvReady === true
        || Number(saved.step) > 1
        || (saved.profile && profileHasContent(normalizeProfile(saved.profile)))
        || Object.values(saved.motivation || {}).some(Boolean)
        || Object.keys(saved.mbtiAnswers || {}).length > 0
        || (Array.isArray(saved.functionScores) && saved.functionScores.length > 0);
    } catch { /* A broken local draft should not block a fresh run. */ }
    finally { setHydratedStorageKey(storageKey); }
  }, [storageKey]);

  useEffect(() => {
    if (hydratedStorageKey !== storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ skillsInputVersion: 1, step, cvReady, cvText, showPaste, profile, motivation, ocp, mbtiAnswers, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, assessmentSessionId }));
    } catch { /* The current tab still works when storage is unavailable. */ }
  }, [hydratedStorageKey, storageKey, step, cvReady, cvText, showPaste, profile, motivation, ocp, mbtiAnswers, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, assessmentSessionId]);

  const persistProgress = useCallback(async (progress: Record<string, unknown>, sequence: number) => {
    setSaveStatus('saving');
    if (!email || !sessionId) {
      if (autosaveSequenceRef.current === sequence) setSaveStatus('error');
      return;
    }
    try {
      const response = await fetch(FIT_TRACKING_HOOK, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
        body: JSON.stringify({ action: 'progress_autosave', flow: 'exploration', progress }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.success === false) throw new Error(payload.error || 'progress_save_failed');
      if (autosaveSequenceRef.current === sequence) setSaveStatus('saved');
    } catch {
      if (autosaveSequenceRef.current === sequence) setSaveStatus('error');
    }
  }, [email, sessionId]);

  const saveNow = useCallback(() => {
    const progress = progressRef.current;
    if (!progress) return;
    if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
    const sequence = ++autosaveSequenceRef.current;
    void persistProgress(progress, sequence);
  }, [persistProgress]);

  useEffect(() => {
    if (hydratedStorageKey !== storageKey) return;
    setSaveStatus('idle');
    const progress = { skillsInputVersion: 1, step, cvReady, cvText, showPaste, profile, motivation, ocp, mbtiAnswers, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, assessmentSessionId };
    progressRef.current = progress;
    if (!email || !sessionId || !hasLiveProgress) return;
    const sequence = ++autosaveSequenceRef.current;
    const timer = window.setTimeout(() => { void persistProgress(progress, sequence); }, 1000);
    autosaveTimerRef.current = timer;
    return () => window.clearTimeout(timer);
  }, [persistProgress, hydratedStorageKey, storageKey, email, sessionId, hasLiveProgress, step, cvReady, cvText, showPaste, profile, motivation, ocp, mbtiAnswers, functionScores, assessmentResultId, programs, fitAnalysis, filterFunctions, filterExpanded, selectedProgram, assessmentSessionId]);

  const persistCvProfile = useCallback(async (cvProfile: CvProfile, stage: 'parsed' | 'confirmed') => {
    if (!sessionId || !email) throw new Error('Sign in with email so Mate can save your CV across both tracks.');
    const response = await fetch(CV_PROFILE_HOOK, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
      body: JSON.stringify({ profile: cvProfile, stage }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) throw new Error(data.error || 'Mate could not save your CV.');
  }, [sessionId, email]);

  const callHook = useCallback(async (url: string, action: string, payload: Record<string, any>) => {
    const response = await fetch(`${url}?action=${action}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(sessionId ? { 'X-Session-Id': sessionId } : {}) },
      body: JSON.stringify({ ...payload, user_key: userKey, email, assessment_session_id: assessmentSessionId }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) throw new Error(data.error || 'Casemate could not process this request. Please try again.');
    return data;
  }, [sessionId, userKey, email, assessmentSessionId]);

  useEffect(() => {
    // Keyed on session + sign-in email, so a sign-in email that resolves after
    // mount retries recovery. Live local progress still blocks it either way.
    const recoveryKey = `${sessionId || ''}:${email || ''}`;
    if (!sessionId || hydratedStorageKey !== storageKey || localProgressRef.current || recoverySessionRef.current === recoveryKey) return;
    recoverySessionRef.current = recoveryKey;
    let cancelled = false;
    void callHook(FUNCTION_HOOK, 'recover', {}).then((data) => {
      if (cancelled || localProgressRef.current || !data.found) return;
      const result = data.result && typeof data.result === 'object' ? data.result : {};
      const assessment = data.assessment && typeof data.assessment === 'object' ? data.assessment : {};
      if (!Array.isArray(result.function_fit_scores) || !result.function_fit_scores.length) return;
      const recoveredProfile = normalizeProfile(result.cv_profile);
      setProfile(recoveredProfile);
      setCvReady(true);
      setMotivation({ ...EMPTY_MOTIVATION, ...(result.motivation_answers || {}) });
      setOcp({ ...DEFAULT_OCP, ...(assessment.culture_preferences || {}) });
      const recoveredMbtiAnswers = result.mbti?.answers && typeof result.mbti.answers === 'object' ? result.mbti.answers : {};
      setMbtiAnswers(recoveredMbtiAnswers);
      setMbtiIndex(Math.min(Object.keys(recoveredMbtiAnswers).length, MBTI_ITEMS.length - 1));
      setFunctionScores(result.function_fit_scores);
      setAssessmentResultId(Number(data.assessment_result_id));
      if (result.stage === 'program_matching' && Array.isArray(result.programs)) {
        setPrograms(result.programs);
        setFilterFunctions(Array.isArray(result.program_filter_functions) ? result.program_filter_functions : []);
        setFilterExpanded(result.program_filter_expanded_to_top_three === true);
        setStep(6);
      } else {
        setStep(5);
      }
    }).catch((caught) => {
      console.warn('[Fit Assessment] saved result recovery failed:', caught);
    });
    return () => { cancelled = true; };
  }, [sessionId, email, hydratedStorageKey, storageKey, callHook]);

  const uploadPdf = async (file: File) => {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('workspaceId', WORKSPACE_ID);
    form.append('folder', 'assessment-cv');
    const response = await fetch('/api/upload/file', { method: 'POST', headers: { 'X-App-Id': (window as any).__APP_ID__ || 'workspace-539150' }, body: form });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success || !data.url) throw new Error(data.error || 'Could not upload the PDF.');
    return data as { url: string; key: string };
  };
  const deleteUploadedPdf = async (key: string) => {
    if (!key) return;
    try { await fetch('/api/upload/delete', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-App-Id': (window as any).__APP_ID__ || 'workspace-539150' }, body: JSON.stringify({ key }) }); } catch { /* best effort */ }
  };
  useEffect(() => {
    if (!savedCv || cvReady || profileHasContent(profile)) return;
    setProfile(savedCv.profile);
    setCvEntryMode('saved');
    setCvReady(true);
  }, [savedCv]);

  const applySavedCv = () => {
    if (!savedCv) return;
    setError(null);
    setProfile(savedCv.profile);
    setCvEntryMode('saved');
    setCvReady(true);
    void trackEvent('fit_assessment_saved_cv_reused', {});
  };

  const startManualCv = () => {
    setError(null);
    setProfile({ ...EMPTY_PROFILE, education: [{ institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'user' }] });
    setCvEntryMode('manual');
    setCvReady(true);
    void trackEvent('fit_assessment_manual_cv_started', {});
  };

  const parseInput = async ({ file, text }: { file?: File; text?: string }) => {
    setError(null); setParsing(true); setParsePhase(0); const phaseTimer = window.setInterval(() => setParsePhase((current) => Math.min(3, current + 1)), 900); let uploadedKey = '';
    try {
      let data: any;
      if (file) {
        const extension = file.name.toLowerCase().split('.').pop();
        const isPdf = file.type === 'application/pdf' || extension === 'pdf';
        const isDocx = file.type.includes('wordprocessingml') || extension === 'docx';
        if (!isPdf && !isDocx) throw new Error('Only PDF and DOCX files are supported.');
        if (file.size > 10 * 1024 * 1024) throw new Error('This file is over 10 MB.');
        setSelectedFile(file.name);
        if (isDocx) {
          const extracted = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
          if (String(extracted.value || '').trim().length < 40) throw new Error('This DOCX does not contain enough text.');
          data = await callHook(STRUCTURED_HOOK, 'parse_cv', { cv_text: extracted.value });
        } else {
          const uploaded = await uploadPdf(file); uploadedKey = uploaded.key;
          data = await callHook(STRUCTURED_HOOK, 'parse_cv', { document_url: uploaded.url });
        }
      } else {
        if (String(text || '').trim().length < 40) throw new Error('Paste at least 40 characters from your CV.');
        data = await callHook(STRUCTURED_HOOK, 'parse_cv', { cv_text: text });
      }
      const extractedProfile = normalizeProfile(data.profile);
      await persistCvProfile(extractedProfile, 'parsed');
      setProfile(extractedProfile); setSavedCv({ profile: extractedProfile, date: new Date().toISOString() }); setCvEntryMode(file ? 'upload' : 'manual'); setCvReady(true);
      void emitFitEvent('fit_cv_uploaded', 'step', {
        source: file ? 'file' : 'text',
        file_type: file ? (file.name.toLowerCase().split('.').pop() || null) : null,
        duration_sec: null,
      });
      void trackEvent('fit_assessment_cv_parsed', { source: file ? 'file' : 'text' });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not read your CV. Enter the details manually.');
      setProfile(EMPTY_PROFILE); setCvEntryMode('manual'); setCvReady(true);
    } finally { window.clearInterval(phaseTimer); if (uploadedKey) void deleteUploadedPdf(uploadedKey); setParsing(false); }
  };

  const confirmCvProfile = async () => {
    setError(null);
    try {
      await persistCvProfile(profile, 'confirmed');
      setSavedCv({ profile, date: new Date().toISOString() });
      setStep(2);
      void emitFitEvent('fit_cv_reviewed', 'step', { has_experience: profile.experiences.length > 0 });
      void emitFitEvent('fit_step_completed', 'step', { step: 1, step_name: 'cv', duration_sec: null });
      void trackEvent('fit_assessment_profile_confirmed', { hasExperience: profile.experiences.length > 0 });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not save your confirmed CV.');
    }
  };

  const calculateFunctions = async () => {
    if (Object.keys(mbtiAnswers).length !== MBTI_ITEMS.length) return;
    setBusy('function'); setError(null);
    try {
      const mbti = scoreMbti(mbtiAnswers);
      const data = await callHook(FUNCTION_HOOK, 'calculate', {
        cv_profile: {
          ...profile,
          parsed_cv: {
            ...(profile.parsed_cv || {}),
            education: profile.education.map((education, index) => {
              const parsedEducation = Array.isArray(profile.parsed_cv?.education) ? profile.parsed_cv.education[index] || {} : index === 0 ? profile.parsed_cv?.education || {} : {};
              return {
                ...parsedEducation,
                university: education.institution,
                major: education.field,
                degree: education.degree,
                gpa: undefined,
                gpaBand: education.gpa,
                universityTier: education.universityTier,
                university_tier: education.universityTier,
                tier: education.universityTier,
                courses: splitCoursework(education.coursework),
                graduationYear: parseInt(education.graduationYear, 10) || null,
              };
            }),
          },
        },
        selected_certifications: profile.certifications,
        other_skills: profile.other_skills_selected ? profile.other_skills : '',
        motivation_answers: motivation,
        ocp_scores: ocp,
        mbti_answers: mbtiAnswers,
        mbti_type: mbti.type,
        mbti_counts: mbti.counts,
      });
      setFunctionScores(data.function_fit_scores || []); setAssessmentResultId(Number(data.assessment_result_id)); setStep(5);
      void emitFitEvent('fit_step_completed', 'step', { step: 3, step_name: 'work_style', duration_sec: null });
      void emitFitEvent('fit_function_viewed', 'activation', {
        top_function: data.top_functions?.[0]?.name || null,
        top_score: data.top_functions?.[0]?.score ?? null,
      });
      void trackEvent('function_fit_calculated', { topFunction: data.top_functions?.[0]?.name, topScore: data.top_functions?.[0]?.score });
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Mate could not calculate your function fit.'); }
    finally { setBusy('idle'); }
  };
  const loadPrograms = async () => {
    if (!assessmentResultId) return;
    setBusy('programs'); setError(null);
    try {
      const data = await callHook(FUNCTION_HOOK, 'programs', { assessment_result_id: assessmentResultId });
      setPrograms(data.programs || []); setFitAnalysis(null); setFilterFunctions(data.filter_functions || []); setFilterExpanded(data.expanded_to_top_three === true); setSelectedProgram(null); setStep(6);
      void emitFitEvent('fit_step_completed', 'step', { step: 5, step_name: 'function_fit', duration_sec: null });
      void trackEvent('function_programs_filtered', { count: data.programs?.length || 0, functions: data.filter_functions || [] });
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Mate could not load your matched programs.'); }
    finally { setBusy('idle'); }
  };
  const resetAssessment = useCallback(() => {
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    setAssessmentSessionId(`fit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`);
    setStep(1); setCvReady(false); setProfile(EMPTY_PROFILE); setCvText(''); setSelectedFile(''); setError(null); setMotivation(EMPTY_MOTIVATION); setOcp(DEFAULT_OCP); setMbtiAnswers({}); setMbtiIndex(0); setMbtiMode(null); setMbtiType(''); setFunctionScores([]); setAssessmentResultId(null); setPrograms([]); setFitAnalysis(null); setFilterFunctions([]); setFilterExpanded(false); setSelectedProgram(null); setBusy('idle');
  }, [storageKey]);

  useEffect(() => {
    window.addEventListener('casemate:restart-fit-assessment', resetAssessment);
    return () => window.removeEventListener('casemate:restart-fit-assessment', resetAssessment);
  }, [resetAssessment]);

  // Offered only while this flow is still on its entry screen, so a mis-tapped
  // branch is fully discarded before the selector reopens.
  const returnToFlowSelector = () => { resetAssessment(); onBackToSelector?.(); };

  const evaluateSelectedProgram = async () => {
    const program = programs.find((item) => item.program_id === selectedProgram);
    if (!program || busy !== 'idle') return;
    setBusy('programs'); setError(null);
    try {
      const mbti = scoreMbti(mbtiAnswers);
      const data = await callHook(FIT_ENGINE_HOOK, 'calculate', {
        cv_profile: profile,
        selected_certifications: profile.certifications,
        other_skills: profile.other_skills_selected ? profile.other_skills : '',
        motivation_answers: motivation,
        ocp_scores: ocp,
        mbti_answers: mbtiAnswers,
        mbti_type: mbti.type,
        mbti_counts: mbti.counts,
        target_context: {
          selectedTargetProgramId: program.program_id,
          selectedTargetProgram: { id: program.program_id, program: program.program, company: program.company, industry: program.industry, functions: program.matched_functions },
          selectedCompany: program.company,
          selectedFunction: program.function || program.matched_functions[0] || '',
          activeTargetStatus: 'assessing',
        },
      });
      setFitAnalysis(data.analysis || { matching_ratio: program.program_fit_percent, function_fit_score: program.function_fit_score, work_style_fit_score: program.corporate_fit_percent });
      if (Number.isFinite(Number(data.assessment_result_id))) setAssessmentResultId(Number(data.assessment_result_id));
      setStep(7);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not prepare your Target Fit result.');
    } finally { setBusy('idle'); }
  };

  const openRoadmap = async () => {
    const program = programs.find((item) => item.program_id === selectedProgram);
    if (!program || roadmapBusy) return;
    setRoadmapBusy(true);
    setError(null);
    try {
      await generateAndSaveRoadmap({
        targetProgram: program.program,
        targetCompany: program.company,
        targetProgramId: program.program_id,
        activeTargetStatus: 'active',
        fitResultReference: assessmentResultId ? `assessment_results:${assessmentResultId}` : null,
        matchPercent: Number(fitAnalysis?.matching_ratio ?? program.program_fit_percent),
        sessionId,
        accountEmail: email,
      });
      try { localStorage.setItem(`casemate-roadmap-target:${sessionId || 'preview'}`, JSON.stringify({ program: program.program, company: program.company, programId: program.program_id, matchPercent: Number(fitAnalysis?.matching_ratio ?? program.program_fit_percent) })); } catch { /* The roadmap is already persisted. */ }
      void emitFitEvent('fit_step_completed', 'step', { step: 6, step_name: 'program_selection', duration_sec: null });
      void emitFitEvent('fit_program_selected', 'core_action', {
        program_id: program.program_id,
        program: program.program,
        company: program.company,
        match_percent: Number(fitAnalysis?.matching_ratio ?? program.program_fit_percent),
      }, { completionKey: `fit:${sessionId || 'unresolved'}:${assessmentSessionId}` });
      void emitFitEvent('fit_roadmap_created', 'retention', {
        program_id: program.program_id,
        program: program.program,
        company: program.company,
      });
      openApp('my-roadmap');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Your roadmap could not be saved. Please try again.');
    } finally {
      setRoadmapBusy(false);
    }
  };

  const motivationComplete = Object.values(motivation).every(Boolean);
  const mbtiComplete = Object.keys(mbtiAnswers).length === MBTI_ITEMS.length;
  const currentMbti = MBTI_ITEMS[mbtiIndex];
  const currentCopy = currentMbti ? MBTI_COPY[currentMbti.id] : null;
  const topFunctions = functionScores.slice(0, 3);

  return (
    <div className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11">
      <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-7">
        <div className="h-6" aria-hidden="true" />
        <SaveProgressButton status={saveStatus} onSave={saveNow} />
        {step !== 1 && <header className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <FitBrandTag />
            <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-3xl">Find your function first. Then find the right program.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">A focused two-stage assessment for Vietnamese Economics and STEM students preparing for MT and consulting applications.</p>
          </div>
          {step >= 6 && <button type="button" onClick={resetAssessment} className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"><RefreshCw className="h-3.5 w-3.5" /> Start Over</button>}
        </header>}

        {step !== 1 && <FitStepIndicator steps={STEP_LABELS} current={Math.min(STEP_LABELS.length, step > 4 ? step - 1 : Math.min(step, 3))} />}

        {error && <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_8%,transparent)] p-3 text-xs font-semibold text-[var(--space-semantic-danger)]">{error}</div>}

        {step === 1 && !cvReady && (
          <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
            <CvSubmitStep variant="discovery" parsing={parsing} parsePhase={parsePhase} parseLabels={PARSE_LABELS} hasSavedCv={!!savedCv} savedCvDate={savedCv?.date} selectedFileName={selectedFile} onFile={(file) => void parseInput({ file })} onUseSaved={applySavedCv} onManual={startManualCv} onBack={onBackToSelector ? returnToFlowSelector : undefined} />
          </section>
        )}

        {step === 1 && cvReady && (
          <section className="mx-auto max-w-5xl rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 [&_input]:font-normal [&_select]:font-normal [&_textarea]:font-normal sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · CV confirmation</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Review what Mate found</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Correct anything that is incomplete. Your CV is evidence, not a gate — no experience is okay.</p></div><button type="button" onClick={() => { setProfile(EMPTY_PROFILE); setCvEntryMode(null); setCvReady(false); }} className="shrink-0 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Replace CV</button></div>
            <label className="mt-6 block text-xs font-bold text-[var(--space-text-secondary)]">Full name<input value={profile.name} aria-invalid={missingAfterUpload(profile.name) || undefined} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(profile.name) ? MISSING_INPUT_CLASS : 'border-[var(--space-border-default)]'}`} />{missingAfterUpload(profile.name) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}</label>
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-sm font-extrabold"><GraduationCap className="h-4 w-4 text-[var(--space-text-brand)]" />Education</h3><button type="button" onClick={() => { const index = profile.education.length; setProfile((current) => ({ ...current, education: [...current.education, { institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`fit-education-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-xl bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add Education</button></div>
              {profile.education.length === 0 && <p className="mt-2 text-xs text-[var(--space-text-muted)]">No confirmed education. Add an entry if relevant.</p>}
              <div className="mt-3 space-y-3">{profile.education.map((education, index) => <div key={`education-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Education {index + 1}</span><button type="button" onClick={() => setProfile((current) => { const educationEntries = current.education.filter((_, itemIndex) => itemIndex !== index); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} aria-label={`Delete education entry ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><UniversityCombo id={`fit-education-${index}`} label="University name" value={education.institution} missing={missingAfterUpload(education.institution)} onChange={(institution, universityTier) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, institution, universityTier } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /><MajorCombo id={`fit-major-${index}`} label="Major" value={education.field} missing={missingAfterUpload(education.field)} onChange={(field) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, field } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /></div><div className="grid gap-3 sm:grid-cols-3"><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`fit-degree-${index}`} className="block">Degree <span className="text-[var(--space-semantic-danger)]">*</span></label><div className="relative mt-1.5"><select id={`fit-degree-${index}`} value={education.degree} required aria-required="true" aria-invalid={!education.degree || undefined} onChange={(event) => setProfile((current) => ({ ...current, education: current.education.map((item, itemIndex) => itemIndex === index ? { ...item, degree: event.target.value } : item) }))} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${education.degree ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)]'}`}><option value="">Select degree</option>{DEGREE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{!education.degree && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select a degree.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`fit-gpa-${index}`} className="block">GPA</label><div className="relative mt-1.5"><select id={`fit-gpa-${index}`} value={education.gpa} aria-invalid={missingAfterUpload(education.gpa) || undefined} onChange={(event) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, gpa: event.target.value } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, gpa: primary?.gpa || '' }; })} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(education.gpa) ? MISSING_INPUT_CLASS : 'border-[var(--space-border-default)]'}`}><option value="">Select your GPA range</option>{GPA_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{missingAfterUpload(education.gpa) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your GPA range.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label className="block">Graduation</label><div className="mt-1.5"><MonthPicker value={education.graduationYear} placeholder="Graduation month" missing={missingAfterUpload(education.graduationYear)} onChange={(graduationYear) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, graduationYear } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} />{missingAfterUpload(education.graduationYear) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your graduation month.</span>}</div></div></div><label className="block text-xs font-bold text-[var(--space-text-secondary)]">Relevant Coursework <span className="text-[var(--space-semantic-danger)]">*</span><textarea rows={3} value={education.coursework} required aria-required="true" aria-invalid={!education.coursework.trim() || undefined} onChange={(event) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, coursework: event.target.value } : item); return { ...current, education: educationEntries, coursework: mergeEducationCoursework(educationEntries) }; })} placeholder="List subjects or courses for this education (e.g. Marketing Management, Financial Accounting, Data Analytics...)" className={`mt-1.5 w-full rounded-xl border p-3 text-sm outline-none focus:border-[var(--space-brand-primary)] ${education.coursework.trim() ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)]'}`} />{!education.coursework.trim() && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please add relevant coursework.</span>}</label></div></div>)}</div>
            </div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><BriefcaseBusiness className="h-4 w-4 text-[var(--space-text-brand)]" />Work Experiences</h3><button type="button" onClick={() => { const index = profile.experiences.length; setProfile((current) => ({ ...current, experiences: [...current.experiences, { company: '', role: '', duration: '', description: '', sector: '' }] })); window.setTimeout(() => document.getElementById(`fit-company-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>
              {profile.experiences.length === 0 ? <p className={`mt-3 rounded-xl p-3 text-xs ${cvEntryMode === 'upload' ? 'border border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))] font-semibold text-[var(--space-semantic-danger)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{cvEntryMode === 'upload' ? "We couldn't read any work experience. Add an entry if your CV includes one." : 'No work experience yet? That is normal. The model will use your other four dimensions and treat CV evidence as a fresh-graduate baseline.'}</p> : <div className="mt-3 space-y-3">{profile.experiences.map((experience, index) => <div key={`experience-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-xs font-bold text-[var(--space-text-secondary)]">Work Experience {index + 1}{isInternRole(experience.role) && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)] px-2 py-0.5 text-[10px] text-[var(--space-text-brand)]">Internship</span>}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: current.experiences.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete work experience ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><CompanyCombo id={`fit-company-${index}`} value={experience.company || ''} missing={missingAfterUpload(experience.company)} onChange={(company) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, company } : item) }))} /><label className="text-xs font-bold text-[var(--space-text-secondary)]">Role<input value={experience.role || ''} aria-invalid={missingAfterUpload(experience.role) || undefined} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, role: event.target.value } : item) }))} className={`mt-1.5 w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] ${missingAfterUpload(experience.role) ? MISSING_INPUT_CLASS : 'border-[var(--space-border-default)]'}`} /></label></div><ExperienceIndustrySelect company={experience.company || ''} description={experience.description || ''} value={experience.sector} source={experience.sectorSource} onChange={(sector, sectorSource) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, sector, sectorSource } : item) }))} /><ExperienceDurationEditor value={experience.duration || ''} missing={cvEntryMode === 'upload'} onChange={(duration) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /><label className="block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(experience.description).split('\n').length)} value={experience.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder="Responsibilities, projects, and measurable results" className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div></div>)}</div>}
            </div>
            <SkillsSelector skills={profile.skills} certifications={profile.certifications} otherSkills={profile.other_skills} otherSelected={profile.other_skills_selected} onChange={(value) => setProfile((current) => ({ ...current, skills: value.skills, certifications: value.certifications, other_skills: value.otherSkills, other_skills_selected: value.otherSelected }))} />
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Users className="h-4 w-4 text-[var(--space-text-brand)]" />Extracurricular Activities</h3><button type="button" onClick={() => setProfile((current) => ({ ...current, extracurricular_activities: [...current.extracurricular_activities, { organization: '', role: '', duration: '', description: '' }] }))} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>
              {profile.extracurricular_activities.length === 0 ? <p className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No extracurricular activities confirmed. Add clubs, volunteer work, student organizations, or team projects if relevant.</p> : <div className="mt-3 space-y-3">{profile.extracurricular_activities.map((activity, index) => <div key={`activity-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Extracurricular Activity {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete extracurricular activity ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2">{([['Organization', 'organization'], ['Role', 'role']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={activity[key] || ''} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}</div><ExperienceDurationEditor value={activity.duration || ''} onChange={(duration) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /><label className="block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(activity.description).split('\n').length)} value={activity.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder={'One responsibility, contribution, or result per line'} className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div></div>)}</div>}
            </div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Trophy className="h-4 w-4 text-[var(--space-text-brand)]" />Honors &amp; Achievements</h3><button type="button" onClick={() => setProfile((current) => ({ ...current, honors_achievements: [...current.honors_achievements, { competition: '', title: '', time: '', description: '' }] }))} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>
              {profile.honors_achievements.length === 0 ? <p className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No honors or achievements confirmed. Add competition results, awards, or academic honors if relevant.</p> : <div className="mt-3 space-y-3">{profile.honors_achievements.map((achievement, index) => <div key={`achievement-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Honor &amp; Achievement {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete honor or achievement ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-3">{([['Competition', 'competition'], ['Title', 'title']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={achievement[key] || ''} onChange={(event) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}<div className="text-xs font-bold text-[var(--space-text-secondary)]"><span className="block">Time</span><div className="mt-1.5"><AchievementTimePicker value={achievement.time || ''} onChange={(time) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, time } : item) }))} /></div></div></div><label className="block text-xs font-bold text-[var(--space-text-secondary)]">Description <span className="font-normal">(optional)</span><textarea rows={Math.max(3, formatExperienceDescription(achievement.description).split('\n').length)} value={achievement.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder={'Context, scope, or contribution — one point per line'} className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div></div>)}</div>}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 sm:mt-6"><button type="button" onClick={() => { setProfile(EMPTY_PROFILE); setCvEntryMode(null); setCvReady(false); }} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={!profileHasContent(profile) || profile.education.some((education) => !education.degree || !education.coursework.trim()) || profile.experiences.some((experience) => !normalizeIndustrySector(experience.sector))} onClick={() => void confirmCvProfile()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-45 sm:py-3">Next <ArrowRight className="h-4 w-4" /></button></div>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · Step 2 of 3</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">What motivates you?</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Four quick choices help separate functions that can look similar on a CV.</p>
            <div className="mt-6 space-y-7">{MOTIVATION_QUESTIONS.map((item, questionIndex) => <div key={item.key}><p className="mb-3 font-bold">{questionIndex + 1}. {item.question}</p><div className="grid gap-2 sm:grid-cols-2">{item.options.map((option) => { const selected = motivation[item.key] === option; return <button key={option} type="button" aria-pressed={selected} onClick={() => setMotivation((current) => ({ ...current, [item.key]: option }))} className={`rounded-xl border p-3 text-left text-sm font-semibold ${selected ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}>{selected && <Check className="mr-1.5 inline h-4 w-4 text-[var(--space-text-brand)]" />}{option}</button>; })}</div></div>)}</div>
            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={!motivationComplete} onClick={() => { setStep(3); void emitFitEvent('fit_step_completed', 'step', { step: 2, step_name: 'motivation', duration_sec: null }); }} className="rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Continue to Work Style</button></div>
          </section>
        )}

        {step === 3 && currentMbti && currentCopy && (
          <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · Step 3 of 3</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Work Style</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Rate your ideal work environment from 1 to 5. These nine dimensions are compared with each function’s benchmark vector.</p>
            <WorkStyleAssessment scores={ocp} onScoreChange={(key, value) => setOcp((current) => ({ ...current, [key]: value }))} answers={mbtiAnswers} personalityType={mbtiType} mode={mbtiMode === 'known' ? 'known' : 'assessment'} questionIndex={mbtiIndex} onModeChange={(mode) => { if (mode === 'assessment' && mbtiMode === 'known') { setMbtiAnswers({}); setMbtiType(''); setMbtiIndex(0); } setMbtiMode(mode); }} onTypeChange={(type) => { setMbtiType(type); const letters = new Set(type.toUpperCase().split('')); setMbtiAnswers(type ? MBTI_ITEMS.reduce<Record<string, 'A' | 'B'>>((all, item) => { all[item.id] = letters.has(item.a.letter) ? 'A' : 'B'; return all; }, {}) : {}); }} onAnswer={(itemId, choice) => { setMbtiAnswers((current) => ({ ...current, [itemId]: choice })); if (mbtiIndex < MBTI_ITEMS.length - 1) setMbtiIndex((current) => current + 1); }} onQuestionIndexChange={setMbtiIndex} />
            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(2)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={!mbtiComplete || busy !== 'idle'} onClick={() => void calculateFunctions()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy === 'function' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{busy === 'function' ? 'Calculating…' : 'See My Function Fit'}</button></div>
          </section>
        )}

        {step === 5 && topFunctions.length > 0 && (
          <section className="space-y-4"><div className="overflow-hidden rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Stage 1 complete</p><h2 className="mt-1 text-2xl font-extrabold">Your top function fits</h2></div>
            <div className="space-y-4">{topFunctions.map((fn, index) => <article key={fn.id} className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex items-start justify-between gap-3 sm:gap-4"><div className="flex min-w-0 items-start gap-3"><span className="shrink-0 text-xl sm:text-2xl">{MEDALS[index]}</span><div className="min-w-0"><h3 className="break-words text-base font-extrabold sm:text-lg">{fn.name} <span className="text-[var(--space-text-brand)]">— {fn.score}%</span></h3><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{fn.explanation}</p></div></div><Target className="h-5 w-5 shrink-0 text-[var(--space-text-brand)]" /></div><div className="mt-4 grid gap-2 sm:grid-cols-5">{[
              ['MBTI', `${fn.breakdown.mbti.matches}/4 · ${fn.breakdown.mbti.score}%`], ['Work style', `${fn.breakdown.work_style.score}%`], ['Cognitive', `${fn.breakdown.cognitive.score}%`], ['Motivation', `${fn.breakdown.motivation.score}%`], ['CV', `${fn.breakdown.cv_evidence.score}%`],
            ].map(([label, value]) => <div key={label} className="rounded-xl bg-[var(--space-surface-muted)] p-2 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-sm font-extrabold">{value}</p></div>)}</div></article>)}</div>
            <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5"><p className="font-extrabold">Does this direction feel right?</p><p className="mt-1 text-sm text-[var(--space-text-muted)]">Confirm to see only programs offering at least one of your strongest functions.</p></div><div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(3)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={() => setStep(2)} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Review answers</button><button type="button" disabled={busy !== 'idle'} onClick={() => void loadPrograms()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy === 'programs' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{busy === 'programs' ? 'Filtering programs…' : 'Confirm & Match Programs'}</button></div></div>
          </section>
        )}

        {step === 6 && (
          <section className="space-y-4"><div className="overflow-hidden rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Stage 2 · Program matching</p><h2 className="mt-1 text-2xl font-extrabold">Programs matched to your function</h2></div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Maximum 20 programs</p><h3 className="mt-1 text-lg font-extrabold sm:text-xl">{programs.length} relevant matches</h3></div></div>
            <div className="space-y-4">{programs.map((program, index) => { const selected = selectedProgram === program.program_id; return <button key={program.program_id} type="button" role="radio" aria-checked={selected} onClick={() => setSelectedProgram(program.program_id)} className={`w-full rounded-3xl border bg-[var(--space-surface-card)] p-5 text-left transition ${selected ? 'border-[var(--space-brand-primary)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)]' : 'border-[var(--space-border-default)]'}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="flex min-w-0 items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-sm font-extrabold text-[var(--space-text-brand)]">{index + 1}</span><div className="min-w-0"><p className="break-words text-xs font-bold text-[var(--space-text-muted)]">{program.company}</p><h4 className="mt-0.5 break-words text-base font-extrabold">{program.program}</h4><p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{programSectorLabel(program)} · {program.matched_functions.join(', ')}</p></div></div><div className="flex items-center gap-2"><span className="rounded-full bg-[var(--space-brand-primary)] px-3 py-1 text-sm font-extrabold text-[var(--space-text-on-primary)]">{program.program_fit_percent}% match</span><span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? 'border-[var(--space-brand-primary)]' : 'border-[var(--space-border-strong)]'}`}>{selected && <span className="h-2.5 w-2.5 rounded-full bg-[var(--space-brand-primary)]" />}</span></div></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-[var(--space-surface-muted)] p-4 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Function fit · 60%</p><p className="mt-1 text-base font-extrabold sm:text-lg">{program.function_fit_score}%</p></div><div className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-[var(--space-surface-muted)] p-4 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Corporate fit · 40%</p><p className="mt-1 text-base font-extrabold sm:text-lg">{program.corporate_fit_percent}%{!program.corporate_data_sufficient && <span className="ml-1 text-[10px] font-semibold text-[var(--space-text-muted)]">neutral estimate</span>}</p></div></div></button>; })}</div>
            {programs.length === 0 && <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 text-sm text-[var(--space-text-muted)]">No matching programs were found. Review your function answers and try again.</div>}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(5)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button>{selectedProgram && <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5 sm:flex-row sm:items-center"><div><p className="text-sm font-extrabold">1 program selected</p><p className="mt-1 text-xs text-[var(--space-text-muted)]">Review your full Target Fit before creating a roadmap.</p></div><button type="button" disabled={busy !== 'idle'} onClick={() => void evaluateSelectedProgram()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-60 sm:w-auto sm:py-3">{busy === 'programs' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}{busy === 'programs' ? 'Evaluating fit…' : 'Review My Target Fit'}</button></div>}</div>
          </section>
        )}

        {step === 7 && selectedProgram && (() => { const program = programs.find((item) => item.program_id === selectedProgram); return program ? <section className="space-y-4"><FitResultsSummary company={program.company} program={program.program} targetFunction={program.function || program.matched_functions[0]} analysis={fitAnalysis || { matching_ratio: program.program_fit_percent, function_fit_score: program.function_fit_score, work_style_fit_score: program.corporate_fit_percent }} rolePaths={program.matched_functions} showDetails /><div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(6)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={roadmapBusy} onClick={() => void openRoadmap()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-60 sm:py-3">{roadmapBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}{roadmapBusy ? 'Saving roadmap…' : 'Generate My Roadmap'}</button></div></section> : null; })()}
      </div>
    </div>
  );
}
