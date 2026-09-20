import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { MBTI_ITEMS, scoreMbti } from '../../components/CultureFitSection';
import mtProgramsData from '../../data/mt-programs.json';
import { PROGRAM_FIT_RUBRIC_DRAFTS } from '../../lib/programFitRubrics';
import { industryLabel } from '../../lib/programIndustries';
import { deadlineStatus, findProgramTimeline } from '../../lib/programTimelines';
import { generateAndSaveRoadmap } from '../../lib/prepRoadmap';
import type { PreparationRecommendation } from '../../lib/prepRoadmap';
import ExplorationFlow from './App';

const STRUCTURED_HOOK = '/api/hooks/execute/workspace-539150/casemate-structured-fit-v1';
const FUNCTION_HOOK = '/api/hooks/execute/workspace-539150/casemate-function-fit-v1';
const PROGRAM_FIT_HOOK = '/api/hooks/execute/workspace-539150/casemate-program-fit-analysis-v1';
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';
const GENERIC_FUNCTIONS = ['Marketing', 'Sales', 'Finance', 'Supply Chain', 'HR', 'Operations', 'General Management', 'Technology', 'Consulting', 'Other'];
const STAGES = ['Target', 'CV', 'Motivation', 'Work Style', 'Results', 'Roadmap'];
const OCP_ITEMS = [
  ['innovation', 'Innovation', 'Stable routines', 'New ideas and change'],
  ['detail', 'Attention to detail', 'Big picture', 'Precision and accuracy'],
  ['results', 'Outcome orientation', 'Process first', 'Measurable outcomes'],
  ['competitive', 'Competitiveness', 'Low-pressure collaboration', 'Compete to be the best'],
  ['supportive', 'People support', 'Independent environment', 'People-first support'],
  ['teamwork', 'Teamwork', 'Work independently', 'Close collaboration'],
  ['reward_development', 'Learning & development', 'Growth is secondary', 'Learning is essential'],
  ['reward_compensation', 'Compensation', 'Salary is secondary', 'High compensation matters'],
  ['work_life_balance', 'Work-life balance', 'Career takes priority', 'Balance is non-negotiable'],
] as const;

type Journey = 'validation' | 'exploration' | null;
type OcpKey = (typeof OCP_ITEMS)[number][0];
type OcpScores = Record<OcpKey, number>;
type Experience = { company: string; role: string; duration: string; description: string; source?: 'extracted' | 'user' };
type CvProfile = {
  name: string;
  university: string;
  faculty: string;
  graduation_year: string;
  gpa: string;
  experiences: Experience[];
  skills: string[];
  certifications: string[];
  activities: string[];
  standout_points: string[];
  languages: string[];
  quantified_impact: string[];
  [key: string]: unknown;
};
type TargetProgram = {
  id: string;
  company: string;
  program: string;
  industry: string;
  functions: string[];
  recruitmentCycle: string;
  applicationStatus: string;
  verifiedData: boolean;
};
type Motivation = {
  commitment: string;
  companyReasons: string[];
  programReasons: string[];
  functionReasons: string[];
  roleUnderstanding: string;
  familiarity: string;
  longTerm: string;
  rotation: string;
  relocation: string;
  travel: string;
  acceptance: string;
  priorityRanking: string[];
  notes: string;
};
type FitAnalysis = Record<string, any> & { criteria?: Array<Record<string, any>> };
type AddedEvidence = { id: string; criterionId: string; type: string; name: string; role: string; date: string; responsibilities: string; achievement: string; skills: string };

type SavedAssessment = {
  journey?: Journey;
  stage?: number;
  target?: TargetProgram | null;
  selectedFunction?: string;
  search?: string;
  profile?: CvProfile;
  originalProfile?: CvProfile | null;
  cvReviewConfirmed?: boolean;
  cvFileName?: string;
  cvFileDate?: string;
  motivation?: Motivation;
  ocp?: OcpScores;
  mbtiAnswers?: Record<string, 'A' | 'B'>;
  mbtiType?: string;
  ocpResultReused?: boolean;
  workingStyleResultReused?: boolean;
  fitAnalysis?: FitAnalysis | null;
  assessmentResultId?: number | null;
  userAddedEvidence?: AddedEvidence[];
};

const EMPTY_PROFILE: CvProfile = { name: '', university: '', faculty: '', graduation_year: '', gpa: '', experiences: [], skills: [], certifications: [], activities: [], standout_points: [], languages: [], quantified_impact: [] };
const DEFAULT_OCP: OcpScores = { innovation: 3, detail: 3, results: 3, competitive: 3, supportive: 3, teamwork: 3, reward_development: 3, reward_compensation: 3, work_life_balance: 3 };
const EMPTY_MOTIVATION: Motivation = { commitment: '', companyReasons: [], programReasons: [], functionReasons: [], roleUnderstanding: '', familiarity: '', longTerm: '', rotation: '', relocation: '', travel: '', acceptance: '', priorityRanking: [], notes: '' };

const COMPANY_REASONS = ['Brand & reputation', 'Industry & products', 'Company culture', 'Learning opportunities', 'Career progression', 'International exposure', 'Social impact', 'Compensation', 'Recommendation', 'Other'];
const PROGRAM_REASONS = ['Leadership development', 'Functional specialization', 'Cross-functional rotation', 'Accelerated career', 'Mentoring & training', 'International exposure', 'Business ownership', 'Company reputation', 'Other'];
const FUNCTION_REASONS = ['Matches experience', 'Matches skills', 'Enjoy responsibilities', 'Supports long-term goal', 'Want to develop expertise', 'Advised to pursue', 'Still exploring', 'Other'];
const PRIORITIES = ['Learning opportunities', 'Career progression', 'Company culture', 'Compensation', 'International exposure'];

function rowsOf(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}

function parseJson(value: unknown): any {
  if (value && typeof value === 'object') return value;
  try { return JSON.parse(String(value || '')); } catch { return null; }
}

function readSessionEmail(spaceId: string): string | null {
  try {
    const value = JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
    return typeof value.email === 'string' ? value.email.toLowerCase().trim() : null;
  } catch { return null; }
}

function normalizeProfile(raw: any): CvProfile {
  const value = raw && typeof raw === 'object' ? raw : {};
  const experiences = Array.isArray(value.experiences) ? value.experiences : Array.isArray(value.internship_history)
    ? value.internship_history.map((item: any) => ({ company: item.company || item.organization || '', role: item.role || '', duration: item.duration || '', description: item.description || '', source: 'extracted' })) : [];
  return {
    ...EMPTY_PROFILE,
    ...value,
    name: String(value.name || ''),
    university: String(value.university || ''),
    faculty: String(value.faculty || value.major || ''),
    graduation_year: String(value.graduation_year || ''),
    gpa: String(value.gpa || ''),
    experiences: experiences.map((item: any) => ({ company: String(item.company || item.organization || ''), role: String(item.role || ''), duration: String(item.duration || ''), description: String(item.description || ''), source: item.source === 'user' ? 'user' : 'extracted' })),
    skills: Array.isArray(value.skills) ? value.skills.map(String) : [],
    certifications: Array.isArray(value.certifications) ? value.certifications.map(String) : Array.isArray(value.english_certificates) ? value.english_certificates.map(String) : [],
    activities: Array.isArray(value.activities) ? value.activities.map(String) : [],
    standout_points: Array.isArray(value.standout_points) ? value.standout_points.map(String) : [],
    languages: Array.isArray(value.languages) ? value.languages.map(String) : [],
    quantified_impact: Array.isArray(value.quantified_impact) ? value.quantified_impact.map(String) : [],
  };
}

function profileHasContent(profile: CvProfile) {
  return !!(profile.name || profile.university || profile.faculty || profile.skills.length || profile.experiences.length);
}

const VERIFIED_PROGRAMS = ((mtProgramsData as any).verified_programs || []) as any[];
const VERIFIED_BY_ID = new Map(VERIFIED_PROGRAMS.map((item) => [String(item.id), item]));

function cycleFor(program: string, verified: any): string {
  const year = String(program).match(/20\d{2}/)?.[0];
  if (year) return year;
  const window = verified?.application_window;
  if (window?.open_text) return String(window.open_text);
  return 'Cycle not published';
}

function statusFor(company: string, program: string): string {
  const status = deadlineStatus(findProgramTimeline(company, program));
  if (status.kind === 'countdown') return status.label || 'Applications open';
  if (status.kind === 'closed') return 'Applications closed for the recorded cycle';
  if (status.kind === 'estimated') return status.label || 'Estimated annual cycle';
  return 'Status not available';
}

const PROGRAM_CATALOG: TargetProgram[] = PROGRAM_FIT_RUBRIC_DRAFTS.map((draft) => {
  const verified = VERIFIED_BY_ID.get(draft.program_id);
  return {
    id: draft.program_id,
    company: draft.company,
    program: draft.program,
    industry: verified?.industry || industryLabel(draft.industry),
    functions: Array.isArray(verified?.functions) && verified.functions.length ? verified.functions.map(String) : GENERIC_FUNCTIONS,
    recruitmentCycle: cycleFor(draft.program, verified),
    applicationStatus: statusFor(draft.company, draft.program),
    verifiedData: true,
  };
}).sort((a, b) => a.company.localeCompare(b.company) || a.program.localeCompare(b.program));

function answersForType(type: string): Record<string, 'A' | 'B'> {
  const letters = new Set(type.toUpperCase().split(''));
  return MBTI_ITEMS.reduce<Record<string, 'A' | 'B'>>((all, item) => {
    all[item.id] = letters.has(item.a.letter) ? 'A' : 'B';
    return all;
  }, {});
}

function legacyMotivation(motivation: Motivation, selectedFunction: string) {
  const text = `${selectedFunction} ${motivation.functionReasons.join(' ')}`.toLowerCase();
  const companyText = motivation.companyReasons.join(' ').toLowerCase();
  return {
    job_priority: companyText.includes('compensation') ? 'High income' : companyText.includes('social impact') ? 'Impact on people' : companyText.includes('culture') ? 'Stability & structure' : 'Learning & growth',
    work_preference: /finance|data|technology|analytics/.test(text) ? 'With data & analysis' : /sales|hr|people/.test(text) ? 'With people & relationships' : /supply|operation/.test(text) ? 'With systems & processes' : 'With ideas & strategy',
    strength: /finance|data|technology|analytics/.test(text) ? 'Numbers & logical thinking' : /sales|marketing/.test(text) ? 'Communication & persuasion' : /operation|supply/.test(text) ? 'Organizing & executing' : 'Leading & motivating',
    energizing_problem: /consult|strategy|finance|data|technology/.test(text) ? 'Solving complex analytical problems' : /sales/.test(text) ? 'Persuading and influencing others' : /operation|supply/.test(text) ? 'Designing systems and processes' : 'Building and launching new things',
  };
}

function openApp(appId: string) {
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
}

function sourcePill(source: 'extracted' | 'user' = 'extracted') {
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${source === 'user' ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{source === 'user' ? 'Added by user' : 'Extracted'}</span>;
}

function recommendationsFromFit(fit: FitAnalysis | null): PreparationRecommendation[] {
  const missing = (fit?.criteria || []).filter((criterion) => criterion.status === 'not_met' || !criterion.evidence);
  return missing.slice(0, 8).map((criterion, index) => {
    const label = String(criterion.label_en || criterion.label_vi || criterion.id || 'Missing evidence');
    const text = `${label} ${criterion.improvement_tip || ''}`.toLowerCase();
    let category: PreparationRecommendation['category'] = 'Soft skills';
    let casemateFunction: PreparationRecommendation['casemateFunction'] = 'My Roadmap';
    if (/industry|market|commercial knowledge|business acumen/.test(text)) { category = 'Domain knowledge'; casemateFunction = 'Domain Knowledge'; }
    else if (/numer|analyt|logic|test/.test(text)) { category = 'Aptitude preparation'; casemateFunction = 'Aptitude Test'; }
    else if (/case|strategy|problem.solv/.test(text)) { category = 'Case practice'; casemateFunction = index === 0 ? 'Case Pool' : 'Case Drill'; }
    else if (/cv|experience|project|achievement|evidence/.test(text)) { category = 'CV & interview'; casemateFunction = 'Update Profile / CV'; }
    return {
      id: `target-gap-${index + 1}`,
      category,
      gap: label,
      reason: criterion.evidence ? 'Current evidence does not yet meet the available target rubric.' : 'No supporting evidence was found in the confirmed profile.',
      recommendedAction: String(criterion.improvement_tip || `Add verified evidence for ${label} to your profile before recalculating.`),
      priority: index === 0 ? 'Critical' : index < 3 ? 'High' : index < 6 ? 'Medium' : 'Optional',
      casemateFunction,
      order: index + 1,
    };
  });
}

function ScoreCard({ label, value }: { label: string; value: unknown }) {
  const available = Number.isFinite(Number(value));
  return <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-lg font-extrabold text-[var(--space-text-primary)]">{available ? `${Math.round(Number(value))}%` : 'Not available'}</p></div>;
}

function MultiChoice({ options, value, onChange, max = 3 }: { options: string[]; value: string[]; onChange: (next: string[]) => void; max?: number }) {
  return <div className="grid gap-2 sm:grid-cols-2">{options.map((option) => { const selected = value.includes(option); return <button key={option} type="button" aria-pressed={selected} onClick={() => onChange(selected ? value.filter((item) => item !== option) : value.length < max ? [...value, option] : value)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${selected ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}>{selected && <Check className="mr-1.5 inline h-4 w-4 text-[var(--space-text-brand)]" />}{option}</button>; })}</div>;
}

function SingleChoice({ options, value, onChange }: { options: string[]; value: string; onChange: (next: string) => void }) {
  return <div className="grid gap-2 sm:grid-cols-2">{options.map((option) => <button key={option} type="button" aria-pressed={value === option} onClick={() => onChange(option)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${value === option ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}>{value === option && <Check className="mr-1.5 inline h-4 w-4 text-[var(--space-text-brand)]" />}{option}</button>)}</div>;
}

export default function TargetFitOnboarding() {
  const { sessionId, visitorId, spaceId, trackEvent } = useSpaceRuntime();
  const email = useMemo(() => readSessionEmail(spaceId), [spaceId]);
  const userKey = useMemo(() => email ? `email:${email}` : `device:${visitorId || 'anonymous'}`, [email, visitorId]);
  const storageKey = `casemate-validation-first-v1:${userKey}`;
  const restoredRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [journey, setJourney] = useState<Journey>(null);
  const [stage, setStage] = useState(1);
  const [search, setSearch] = useState('');
  const [target, setTarget] = useState<TargetProgram | null>(null);
  const [selectedFunction, setSelectedFunction] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [manualCompany, setManualCompany] = useState('');
  const [manualProgram, setManualProgram] = useState('');
  const [manualIndustry, setManualIndustry] = useState('');
  const [manualCycle, setManualCycle] = useState('');
  const [profile, setProfile] = useState<CvProfile>(EMPTY_PROFILE);
  const [originalProfile, setOriginalProfile] = useState<CvProfile | null>(null);
  const [cvReviewConfirmed, setCvReviewConfirmed] = useState(false);
  const [cvFileName, setCvFileName] = useState('');
  const [cvFileDate, setCvFileDate] = useState('');
  const [savedCv, setSavedCv] = useState<{ profile: CvProfile; date: string } | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsePhase, setParsePhase] = useState(0);
  const [parseFailure, setParseFailure] = useState(false);
  const [motivation, setMotivation] = useState<Motivation>(EMPTY_MOTIVATION);
  const [ocp, setOcp] = useState<OcpScores>(DEFAULT_OCP);
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<string, 'A' | 'B'>>({});
  const [mbtiType, setMbtiType] = useState('');
  const [mbtiMode, setMbtiMode] = useState<'existing' | 'known' | 'assessment'>('assessment');
  const [mbtiIndex, setMbtiIndex] = useState(0);
  const [priorOcp, setPriorOcp] = useState<OcpScores | null>(null);
  const [priorMbti, setPriorMbti] = useState<{ type: string; answers: Record<string, 'A' | 'B'> } | null>(null);
  const [assessmentReuseChoice, setAssessmentReuseChoice] = useState<'use' | 'review' | 'retake' | null>(null);
  const [ocpResultReused, setOcpResultReused] = useState(false);
  const [workingStyleResultReused, setWorkingStyleResultReused] = useState(false);
  const [fitAnalysis, setFitAnalysis] = useState<FitAnalysis | null>(null);
  const [fitPending, setFitPending] = useState(false);
  const [assessmentResultId, setAssessmentResultId] = useState<number | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [userAddedEvidence, setUserAddedEvidence] = useState<AddedEvidence[]>([]);
  const [evidenceCriterion, setEvidenceCriterion] = useState<string | null>(null);
  const [evidenceDraft, setEvidenceDraft] = useState<Omit<AddedEvidence, 'id' | 'criterionId'>>({ type: '', name: '', role: '', date: '', responsibilities: '', achievement: '', skills: '' });

  const track = useCallback((name: string, properties: Record<string, unknown> = {}) => {
    void trackEvent(name, { journey: 'validation_first', ...properties });
  }, [trackEvent]);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') as SavedAssessment;
      if (saved.journey) setJourney(saved.journey);
      if (saved.stage) setStage(Math.max(1, Math.min(6, saved.stage)));
      if (saved.target) setTarget(saved.target);
      if (saved.selectedFunction) setSelectedFunction(saved.selectedFunction);
      if (saved.search) setSearch(saved.search);
      if (saved.profile) setProfile(normalizeProfile(saved.profile));
      if (saved.originalProfile) setOriginalProfile(normalizeProfile(saved.originalProfile));
      if (saved.cvReviewConfirmed) setCvReviewConfirmed(true);
      if (saved.cvFileName) setCvFileName(saved.cvFileName);
      if (saved.cvFileDate) setCvFileDate(saved.cvFileDate);
      if (saved.motivation) setMotivation({ ...EMPTY_MOTIVATION, ...saved.motivation });
      if (saved.ocp) setOcp({ ...DEFAULT_OCP, ...saved.ocp });
      if (saved.mbtiAnswers) setMbtiAnswers(saved.mbtiAnswers);
      if (saved.mbtiType) setMbtiType(saved.mbtiType);
      if (saved.ocpResultReused) setOcpResultReused(true);
      if (saved.workingStyleResultReused) setWorkingStyleResultReused(true);
      if (saved.fitAnalysis) setFitAnalysis(saved.fitAnalysis);
      if (saved.assessmentResultId) setAssessmentResultId(saved.assessmentResultId);
      if (saved.userAddedEvidence) setUserAddedEvidence(saved.userAddedEvidence);
    } catch { /* A corrupt draft never blocks a fresh assessment. */ }
  }, [storageKey]);

  useEffect(() => {
    if (!restoredRef.current) return;
    const saved: SavedAssessment = { journey, stage, target, selectedFunction, search, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, motivation, ocp, mbtiAnswers, mbtiType, ocpResultReused, workingStyleResultReused, fitAnalysis, assessmentResultId, userAddedEvidence };
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch { /* Current state remains usable. */ }
  }, [storageKey, journey, stage, target, selectedFunction, search, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, motivation, ocp, mbtiAnswers, mbtiType, ocpResultReused, workingStyleResultReused, fitAnalysis, assessmentResultId, userAddedEvidence]);

  useEffect(() => {
    if (!email) return;
    const db = (window as any).__workspaceDb;
    if (!db?.from) return;
    void Promise.all([
      db.from('user_cv_profiles', { shared: true }).eq('user_email', email).orderBy('id', 'desc').limit(1).get().catch(() => []),
      db.from('culture_fit_results', { shared: true }).eq('user_key', userKey).orderBy('id', 'desc').limit(30).get().catch(() => []),
    ]).then(([cvResponse, cultureResponse]) => {
      const cvRow = rowsOf(cvResponse)[0];
      if (cvRow) {
        const parsed = parseJson(cvRow.raw_cv_text);
        if (parsed) setSavedCv({ profile: normalizeProfile(parsed), date: String(cvRow.updated_at || cvRow.created_at || '') });
      }
      const cultureRows = rowsOf(cultureResponse);
      const corporate = cultureRows.find((row) => row.kind === 'corporate');
      const mbti = cultureRows.find((row) => row.kind === 'mbti');
      const corporatePayload = parseJson(corporate?.payload_json) || {};
      const preferences = corporatePayload.preferences || corporatePayload.answers;
      if (preferences && OCP_ITEMS.every(([key]) => Number(preferences[key]) >= 1 && Number(preferences[key]) <= 5)) setPriorOcp({ ...DEFAULT_OCP, ...preferences });
      const mbtiPayload = parseJson(mbti?.payload_json) || {};
      const priorType = String(mbti?.mbti_type || mbtiPayload.type || '');
      if (/^[EI][SN][TF][JP]$/.test(priorType)) setPriorMbti({ type: priorType, answers: Object.keys(mbtiPayload.answers || {}).length === 20 ? mbtiPayload.answers : answersForType(priorType) });
    });
  }, [email, userKey]);

  const callHook = useCallback(async (url: string, action: string, payload: Record<string, any>) => {
    const response = await fetch(`${url}?action=${action}`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(sessionId ? { 'X-Session-Id': sessionId } : {}) }, body: JSON.stringify({ ...payload, user_key: userKey, email }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) throw Object.assign(new Error(data.error || 'Casemate could not process this request.'), { code: data.code, status: response.status });
    return data;
  }, [sessionId, userKey, email]);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return PROGRAM_CATALOG.slice(0, 8);
    return PROGRAM_CATALOG.filter((program) => `${program.program} ${program.company} ${program.industry}`.toLowerCase().includes(query)).slice(0, 12);
  }, [search]);

  const saveAndExit = () => {
    setNotice('Your progress is saved. You can return to continue from this step.');
    window.dispatchEvent(new CustomEvent('closeApp', { detail: { appId: 'fit-assessment' } }));
  };

  const chooseTarget = (program: TargetProgram) => {
    setTarget(program);
    setSelectedFunction('');
    setManualMode(false);
    track('target_program_selected', { program_id: program.id, company: program.company });
  };

  const continueManualTarget = () => {
    if (!manualCompany.trim() || !manualProgram.trim() || !selectedFunction) return;
    setTarget({ id: `manual-${Date.now()}`, company: manualCompany.trim(), program: manualProgram.trim(), industry: manualIndustry.trim() || 'Not verified', functions: GENERIC_FUNCTIONS, recruitmentCycle: manualCycle.trim() || 'Not verified', applicationStatus: 'Program data not verified', verifiedData: false });
    setManualMode(false);
  };

  const uploadPdf = async (file: File) => {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('workspaceId', WORKSPACE_ID);
    form.append('folder', 'assessment-cv');
    const response = await fetch('/api/upload/file', { method: 'POST', headers: { 'X-App-Id': (window as any).__APP_ID__ || 'workspace-539150' }, body: form });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success || !data.url) throw new Error(data.error || 'Upload failed.');
    return data as { url: string; key: string };
  };

  const parseCvFile = async (file: File) => {
    setError(''); setNotice(''); setParseFailure(false);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf || file.size === 0 || file.size > 10 * 1024 * 1024) {
      setParseFailure(true);
      setError("We couldn't read this CV accurately. Please upload another file or use the recommended template.");
      track('cv_parse_failed', { reason: !isPdf ? 'unsupported_type' : file.size === 0 ? 'empty_file' : 'file_too_large' });
      return;
    }
    setParsing(true); setParsePhase(0); track('cv_uploaded', { file_type: 'pdf', file_size_band: file.size > 5 * 1024 * 1024 ? '5-10mb' : 'under-5mb' }); track('cv_parse_started');
    const timer = window.setInterval(() => setParsePhase((current) => Math.min(3, current + 1)), 900);
    let uploadedKey = '';
    try {
      const uploaded = await uploadPdf(file); uploadedKey = uploaded.key;
      const data = await callHook(STRUCTURED_HOOK, 'parse_cv', { document_url: uploaded.url, assessment_session_id: `validation_${Date.now()}` });
      const normalized = normalizeProfile(data.profile);
      if (!profileHasContent(normalized)) throw new Error('No extractable profile data.');
      setOriginalProfile(normalized); setProfile(normalized); setCvReviewConfirmed(false); setCvFileName(file.name); setCvFileDate(new Date().toISOString());
    } catch {
      setParseFailure(true);
      setError("We couldn't read this CV accurately. Please upload another file or use the recommended template.");
      track('cv_parse_failed', { reason: 'protected_empty_or_parser_failure' });
    } finally {
      window.clearInterval(timer); setParsing(false);
      if (uploadedKey) void fetch('/api/upload/delete', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-App-Id': (window as any).__APP_ID__ || 'workspace-539150' }, body: JSON.stringify({ key: uploadedKey }) }).catch(() => undefined);
    }
  };

  const useSavedCv = () => {
    if (!savedCv) return;
    setProfile(savedCv.profile); setOriginalProfile(savedCv.profile); setCvReviewConfirmed(false); setCvFileName('Latest saved CV profile'); setCvFileDate(savedCv.date); setParseFailure(false); setError('');
    track('saved_cv_reused');
  };

  const downloadTemplate = () => {
    const content = ['FULL NAME', 'University | Major | Graduation year | GPA', '', 'WORK EXPERIENCE', 'Company | Role | Dates', 'Responsibilities and quantified achievements', '', 'LEADERSHIP & EXTRACURRICULAR', 'Organization | Role | Dates | Impact', '', 'AWARDS & ACHIEVEMENTS', '', 'SKILLS, CERTIFICATIONS & LANGUAGES'].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'casemate-cv-template.txt'; anchor.click(); URL.revokeObjectURL(url);
  };

  const updateList = (key: 'skills' | 'certifications' | 'activities' | 'standout_points' | 'languages' | 'quantified_impact', value: string) => {
    setProfile((current) => ({ ...current, [key]: value.split('\n').map((item) => item.trim()).filter(Boolean) }));
  };

  const applyReuse = (choice: 'use' | 'review' | 'retake') => {
    setAssessmentReuseChoice(choice);
    if (choice !== 'retake') {
      if (priorOcp) { setOcp(priorOcp); setOcpResultReused(choice === 'use'); if (choice === 'use') track('ocp_result_reused'); }
      if (priorMbti) { setMbtiType(priorMbti.type); setMbtiAnswers(priorMbti.answers); setMbtiMode('existing'); setWorkingStyleResultReused(choice === 'use'); if (choice === 'use') track('working_style_result_reused'); }
    } else {
      setOcp(DEFAULT_OCP); setMbtiAnswers({}); setMbtiType(''); setMbtiMode('assessment'); setOcpResultReused(false); setWorkingStyleResultReused(false);
    }
  };

  const motivationComplete = !!(motivation.commitment && motivation.companyReasons.length && motivation.programReasons.length && motivation.functionReasons.length && motivation.roleUnderstanding && motivation.familiarity && motivation.longTerm && motivation.rotation && motivation.relocation && motivation.travel && motivation.acceptance && motivation.priorityRanking.length === 3);

  const runAssessment = async () => {
    if (!target || !selectedFunction || !cvReviewConfirmed || !motivationComplete) return;
    setBusy(true); setError(''); setFitPending(false);
    try {
      const finalAnswers = Object.keys(mbtiAnswers).length === 20 ? mbtiAnswers : /^[EI][SN][TF][JP]$/.test(mbtiType) ? answersForType(mbtiType) : {};
      if (Object.keys(finalAnswers).length !== 20) throw new Error('Complete or select your Personality & Working Style result first.');
      const scored = scoreMbti(finalAnswers);
      const calculated = await callHook(FUNCTION_HOOK, 'calculate', {
        cv_profile: profile,
        motivation_answers: legacyMotivation(motivation, selectedFunction),
        ocp_scores: ocp,
        mbti_answers: finalAnswers,
        mbti_type: mbtiType || scored.type,
        mbti_counts: scored.counts,
        assessment_session_id: `validation_${Date.now()}`,
        target_context: { selectedTargetProgramId: target.id, selectedFunction, recruitmentCycle: target.recruitmentCycle, activeTargetStatus: 'assessing', cvReviewConfirmed, motivationAssessmentResponses: motivation, ocpResultReused, workingStyleResultReused, userAddedEvidence },
      });
      const resultId = Number(calculated.assessment_result_id);
      setAssessmentResultId(resultId);
      await callHook(FUNCTION_HOOK, 'programs', { assessment_result_id: resultId }).catch(() => null);
      if (!target.verifiedData) {
        setFitAnalysis(null); setFitPending(true); setStage(5); track('target_fit_viewed', { program_id: target.id, result_available: false }); return;
      }
      try {
        const response = await callHook(PROGRAM_FIT_HOOK, 'analyze', { program_id: target.id, selected_function: selectedFunction });
        setFitAnalysis(response.analysis || null); setFitPending(!response.analysis); setStage(5);
        track('target_fit_viewed', { program_id: target.id, result_available: !!response.analysis });
      } catch (caught: any) {
        if (caught?.code === 'rubric_unavailable' || caught?.status === 404 || caught?.status === 409) { setFitAnalysis(null); setFitPending(true); setStage(5); track('target_fit_viewed', { program_id: target.id, result_available: false }); }
        else throw caught;
      }
      track('working_style_assessment_completed', { reused: workingStyleResultReused });
      track('ocp_assessment_completed', { reused: ocpResultReused });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not prepare your Target Fit result.');
    } finally { setBusy(false); }
  };

  const addEvidence = () => {
    if (!evidenceCriterion || !evidenceDraft.name.trim()) return;
    const added: AddedEvidence = { id: `evidence-${Date.now()}`, criterionId: evidenceCriterion, ...evidenceDraft };
    setUserAddedEvidence((current) => [...current, added]);
    setProfile((current) => ({ ...current, experiences: [...current.experiences, { company: evidenceDraft.name, role: evidenceDraft.role || evidenceDraft.type, duration: evidenceDraft.date, description: [evidenceDraft.responsibilities, evidenceDraft.achievement, evidenceDraft.skills].filter(Boolean).join(' · '), source: 'user' }] }));
    setEvidenceCriterion(null); setEvidenceDraft({ type: '', name: '', role: '', date: '', responsibilities: '', achievement: '', skills: '' });
    track('evidence_added', { criterion_id: added.criterionId, evidence_type: added.type || 'experience' });
  };

  const confirmTarget = async () => {
    if (!target) return;
    setBusy(true); setError('');
    try {
      const recommendations = recommendationsFromFit(fitAnalysis);
      const cleanFit = {
        overallFit: Number.isFinite(Number(fitAnalysis?.matching_ratio)) ? Number(fitAnalysis?.matching_ratio) : null,
        eligibilityStatus: fitAnalysis?.eligibility_status || null,
        profileExperienceFit: Number.isFinite(Number(fitAnalysis?.cv_profile_fit_score)) ? Number(fitAnalysis?.cv_profile_fit_score) : null,
        functionFit: Number.isFinite(Number(fitAnalysis?.function_fit_score)) ? Number(fitAnalysis?.function_fit_score) : null,
        motivationFit: Number.isFinite(Number(fitAnalysis?.motivation_fit_score)) ? Number(fitAnalysis?.motivation_fit_score) : null,
        workStyleFit: Number.isFinite(Number(fitAnalysis?.work_style_fit_score ?? fitAnalysis?.culture_fit_percent)) ? Number(fitAnalysis?.work_style_fit_score ?? fitAnalysis?.culture_fit_percent) : null,
        dataConfidence: fitAnalysis?.data_confidence || null,
        strengths: fitAnalysis?.strengths || [], gaps: fitAnalysis?.gaps || [], potentialConcerns: fitAnalysis?.potential_concerns || [], recommendedNextSteps: fitAnalysis?.recommended_next_steps || [], evidenceFound: fitAnalysis?.evidence_found || [], missingEvidence: fitAnalysis?.missing_evidence || [],
      };
      await generateAndSaveRoadmap({ targetProgram: target.program, targetCompany: target.company, targetProgramId: target.id, targetFunction: selectedFunction, recruitmentCycle: target.recruitmentCycle, activeTargetStatus: 'active', fitResultReference: assessmentResultId ? `assessment_results:${assessmentResultId}` : null, targetFit: cleanFit, preparationRecommendations: recommendations, roadmapTaskStatus: Object.fromEntries(recommendations.map((item) => [item.id, 'pending'])), matchPercent: cleanFit.overallFit, sessionId });
      try { localStorage.setItem(`casemate-roadmap-target:${sessionId || 'preview'}`, JSON.stringify({ program: target.program, company: target.company, programId: target.id, function: selectedFunction, matchPercent: cleanFit.overallFit })); } catch { /* Roadmap is already persisted. */ }
      setStage(6); track('target_confirmed', { program_id: target.id, function: selectedFunction }); track('preparation_plan_generated', { program_id: target.id, recommendation_count: recommendations.length }); track('roadmap_opened', { source: 'validation_first' }); openApp('my-roadmap');
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'The preparation plan could not be generated.'); }
    finally { setBusy(false); }
  };

  const changeTarget = () => {
    setTarget(null); setSelectedFunction(''); setSearch(''); setFitAnalysis(null); setFitPending(false); setAssessmentResultId(null); setStage(1); setJourney('validation');
  };

  if (journey === 'exploration') return <ExplorationFlow />;

  const rankingChoice = (index: number, value: string) => setMotivation((current) => {
    const next = current.priorityRanking.slice(); next[index] = value;
    return { ...current, priorityRanking: next.filter(Boolean) };
  });
  const currentMbti = MBTI_ITEMS[Math.min(mbtiIndex, MBTI_ITEMS.length - 1)];
  const foundPrior = !!priorOcp || !!priorMbti;
  const resultCriteria = fitAnalysis?.criteria || [];
  const strengths = resultCriteria.filter((criterion: any) => criterion.status === 'met').slice(0, 3);
  const gaps = resultCriteria.filter((criterion: any) => criterion.status === 'not_met').slice(0, 4);
  const parseLabels = ['Reading your CV', 'Structuring your experience', 'Identifying target-relevant evidence', 'Preparing your profile for review'];

  return (
    <div className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11">
      <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-7">
        <header className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--space-text-brand)]"><Target className="h-3.5 w-3.5" /> Mate Target Fit</div>
          <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-3xl">Validate your target before you prepare</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">See how your confirmed profile fits one MT or consulting target, where evidence is missing, and what to do next.</p>
        </header>

        {journey === 'validation' && <div className="mb-5 grid grid-cols-6 gap-1" aria-label={`Stage ${stage} of 6`}>{STAGES.map((label, index) => { const number = index + 1; const active = number === stage; const done = number < stage; return <div key={label} className="min-w-0"><div className="h-1.5 rounded-full bg-[var(--space-surface-muted)]"><div className={`h-full rounded-full ${active || done ? 'bg-[var(--space-brand-primary)]' : ''}`} style={{ width: done ? '100%' : active ? '65%' : 0 }} /></div><p className={`mt-1 truncate text-center text-[9px] font-bold sm:text-xs ${active || done ? 'text-[var(--space-text-primary)]' : 'text-[var(--space-text-muted)]'}`}>{number}. {label}</p></div>; })}</div>}

        {notice && <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-success-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_9%,transparent)] p-3 text-sm text-[var(--space-text-primary)]">{notice}</div>}
        {error && <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_8%,transparent)] p-3 text-sm font-semibold text-[var(--space-semantic-danger)]"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}

        {(journey === null || (journey === 'validation' && stage === 1)) && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-sm sm:p-7">
          <h2 className="text-lg font-extrabold sm:text-2xl">Do you already have a specific MT program in mind?</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <button type="button" onClick={() => { setJourney('validation'); setStage(1); track('validation_started'); track('target_status_selected', { has_target: true }); }} className={`rounded-2xl border p-5 text-left ${journey === 'validation' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}><p className="font-extrabold">Yes, I have a target</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Compare your current profile with one selected program and function.</p></button>
            <button type="button" onClick={() => { setJourney('exploration'); track('target_status_selected', { has_target: false }); }} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-left hover:border-[var(--space-brand-primary-500)]"><p className="font-extrabold">Not yet, help me explore</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Continue to the existing function-first Exploration flow.</p></button>
          </div>

          {journey === 'validation' && <div className="mt-7 border-t border-[var(--space-border-default)] pt-6">
            <label className="text-sm font-bold">Search Target Program<div className="relative mt-2"><Search className="absolute left-3 top-3.5 h-4 w-4 text-[var(--space-text-muted)]" /><input value={search} onChange={(event) => { setSearch(event.target.value); track('target_program_searched', { query_length: event.target.value.length }); }} placeholder="Search by program or company" className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]" /></div></label>
            {!target && !manualMode && <div className="mt-3 max-h-[28rem] space-y-2 overflow-y-auto pr-1">{searchResults.map((program) => <button key={program.id} type="button" onClick={() => chooseTarget(program)} className="w-full rounded-2xl border border-[var(--space-border-default)] p-4 text-left hover:border-[var(--space-brand-primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary-200)]"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-bold text-[var(--space-text-muted)]">{program.company}</p><p className="mt-0.5 font-extrabold">{program.program}</p></div><span className="rounded-full bg-[var(--space-surface-muted)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-secondary)]">{program.applicationStatus}</span></div><p className="mt-2 text-xs text-[var(--space-text-secondary)]">{program.industry} · Recruitment cycle: {program.recruitmentCycle}</p></button>)}</div>}
            {!target && search.trim() && searchResults.length === 0 && !manualMode && <div className="mt-4 rounded-2xl bg-[var(--space-surface-muted)] p-4"><p className="font-bold">Can't find your target program?</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => { setNotice('Your program request has been recorded for review.'); track('manual_program_requested', { search_query: search.trim() }); }} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Request This Program</button><button type="button" onClick={() => setManualMode(true)} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Enter Program Manually</button><button type="button" onClick={() => setSearch('')} className="rounded-xl px-3 py-2 text-xs font-bold text-[var(--space-text-muted)]">Return to Search</button></div></div>}
            {manualMode && <div className="mt-4 rounded-2xl border border-[var(--space-border-default)] p-4"><p className="font-extrabold">Enter Program Manually</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{[['Company', manualCompany, setManualCompany], ['Program', manualProgram, setManualProgram], ['Industry', manualIndustry, setManualIndustry], ['Recruitment cycle', manualCycle, setManualCycle]].map(([label, value, setter]: any) => <label key={label} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={value} onChange={(event) => setter(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm" /></label>)}</div><p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]">Casemate can provide a general function-level assessment, but program-specific fit may be limited until this program is added to our database.</p><button type="button" onClick={() => setTarget({ id: `manual-${Date.now()}`, company: manualCompany.trim(), program: manualProgram.trim(), industry: manualIndustry.trim() || 'Not verified', functions: GENERIC_FUNCTIONS, recruitmentCycle: manualCycle.trim() || 'Not verified', applicationStatus: 'Program data not verified', verifiedData: false })} disabled={!manualCompany.trim() || !manualProgram.trim()} className="mt-3 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-50">Use Manual Program</button></div>}
            {target && <div className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold text-[var(--space-text-muted)]">{target.company} · {target.industry}</p><h3 className="mt-1 text-lg font-extrabold">{target.program}</h3><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Recruitment cycle: {target.recruitmentCycle} · {target.applicationStatus}</p></div><button type="button" onClick={() => { setTarget(null); setSelectedFunction(''); }} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Choose Another Program</button></div><label className="mt-4 block text-sm font-bold">Target function / track<select value={selectedFunction} onChange={(event) => { setSelectedFunction(event.target.value); track('target_function_selected', { function: event.target.value, program_id: target.id }); }} className="mt-2 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-3 text-sm outline-none focus:border-[var(--space-brand-primary)]"><option value="">Select a function or track</option>{Array.from(new Set([...target.functions, 'Other'])).map((fn) => <option key={fn} value={fn}>{fn}</option>)}</select></label>{!target.verifiedData && <button type="button" onClick={continueManualTarget} className="sr-only">Continue manual target</button>}</div>}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => { setJourney(null); setTarget(null); }} className="inline-flex items-center justify-center gap-1 text-sm font-bold text-[var(--space-text-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={saveAndExit} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Save and Exit</button><button type="button" disabled={!target || !selectedFunction} onClick={() => setStage(2)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-50">Continue with This Target <ArrowRight className="h-4 w-4" /></button></div></div>
          </div>}
        </section>}

        {journey === 'validation' && stage === 2 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <h2 className="text-xl font-extrabold">Upload Your CV</h2><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">Upload your latest CV so Mate can identify the experience, skills and evidence relevant to your selected target.</p><p className="mt-2 text-xs font-semibold text-[var(--space-text-muted)]">PDF · max 10 MB · English preferred · text-based PDF preferred</p>
          {parsing ? <div className="mt-5 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-6 text-center"><Loader2 className="mx-auto h-7 w-7 animate-spin text-[var(--space-text-brand)]" /><p className="mt-3 font-bold">{parseLabels[parsePhase]}</p><div className="mx-auto mt-3 h-2 max-w-md overflow-hidden rounded-full bg-[var(--space-surface-card)]"><div className="h-full rounded-full bg-[var(--space-brand-primary)]" style={{ width: `${(parsePhase + 1) * 25}%` }} /></div></div> : !profileHasContent(profile) ? <>
            <div className="mt-5 grid gap-3 md:grid-cols-3"><button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-2xl border-2 border-dashed border-[var(--space-border-strong)] p-5 text-center hover:border-[var(--space-brand-primary-500)]"><UploadCloud className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" /><p className="mt-2 font-bold">Upload a New CV</p></button><button type="button" disabled={!savedCv} onClick={useSavedCv} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-center disabled:opacity-45"><RefreshCw className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" /><p className="mt-2 font-bold">Use My Latest CV</p>{savedCv && <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">Saved {new Date(savedCv.date).toLocaleDateString()}</p>}</button><button type="button" onClick={downloadTemplate} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-center"><FileText className="mx-auto h-7 w-7 text-[var(--space-text-brand)]" /><p className="mt-2 font-bold">Download CV Template</p></button></div><input ref={fileInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void parseCvFile(file); event.target.value = ''; }} />
            {parseFailure && <div className="mt-4 rounded-2xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_40%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_9%,transparent)] p-4"><p className="font-bold">We couldn't read this CV accurately.</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Please upload another file or use the recommended template.</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Replace CV</button><button type="button" onClick={downloadTemplate} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Download CV Template</button><button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Try Again</button></div></div>}
          </> : <div className="mt-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Review Your CV Information</p><h3 className="mt-1 text-lg font-extrabold">Confirm extracted evidence before fit calculation</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">{cvFileName || 'Saved CV'}{cvFileDate ? ` · ${new Date(cvFileDate).toLocaleDateString()}` : ''}</p></div><button type="button" onClick={() => { setProfile(EMPTY_PROFILE); setOriginalProfile(null); setCvReviewConfirmed(false); }} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Upload Another CV</button></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">{([['Full name', 'name'], ['University', 'university'], ['Major / faculty', 'faculty'], ['Graduation year', 'graduation_year'], ['GPA', 'gpa']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label} {!profile[key] && <span className="text-[var(--space-semantic-warning)]">· Needs confirmation</span>}<input value={String(profile[key] || '')} onChange={(event) => setProfile((current) => ({ ...current, [key]: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm focus:border-[var(--space-brand-primary)] focus:outline-none" /></label>)}</div>
            <div className="mt-5"><div className="flex items-center justify-between"><h4 className="font-extrabold">Work & Leadership Experience</h4><button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: [...current.experiences, { company: '', role: '', duration: '', description: '', source: 'user' }] }))} className="inline-flex items-center gap-1 rounded-xl bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add Information</button></div>{profile.experiences.length === 0 && <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-semantic-warning)]">Needs confirmation — no experience was extracted.</p>}<div className="mt-2 space-y-3">{profile.experiences.map((experience, index) => <div key={`${experience.company}-${index}`} className="rounded-2xl border border-[var(--space-border-default)] p-3"><div className="flex justify-between gap-2">{sourcePill(experience.source)}<button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: current.experiences.filter((_, itemIndex) => itemIndex !== index) }))} aria-label="Remove information" className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-2 grid gap-2 sm:grid-cols-3">{(['company', 'role', 'duration'] as const).map((key) => <input key={key} value={experience[key]} placeholder={key} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-sm" />)}</div><textarea rows={3} value={experience.description} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder="Responsibilities, achievements and quantified impact" className="mt-2 w-full rounded-xl border border-[var(--space-border-default)] p-3 text-sm" /></div>)}</div></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">{([['Extracurricular Activities', 'activities'], ['Awards & Achievements', 'standout_points'], ['Skills', 'skills'], ['Certifications', 'certifications'], ['Languages', 'languages'], ['Quantified Impact', 'quantified_impact']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]"><span className="flex items-center gap-2">{label} {sourcePill()}</span><textarea rows={3} value={profile[key].join('\n')} onChange={(event) => updateList(key, event.target.value)} placeholder={`One ${label.toLowerCase()} item per line`} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] p-3 text-sm" /></label>)}</div>
            <p className="mt-5 text-sm font-bold">Does this information accurately represent your profile?</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => { setCvReviewConfirmed(true); track('cv_review_completed', { corrected: JSON.stringify(profile) !== JSON.stringify(originalProfile) }); setStage(3); track('motivation_assessment_started'); }} className="rounded-xl bg-[var(--space-brand-primary)] px-4 py-2 text-sm font-bold text-[var(--space-text-on-primary)]">Yes, Continue</button><button type="button" onClick={() => setNotice('Edit any field above, then confirm when the profile is accurate.')} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">No, Edit Information</button><button type="button" onClick={() => { setProfile(EMPTY_PROFILE); setOriginalProfile(null); }} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Upload Another CV</button></div>
          </div>}
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(1)} className="inline-flex items-center justify-center gap-1 text-sm font-bold text-[var(--space-text-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" onClick={saveAndExit} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Save and Exit</button></div>
        </section>}

        {journey === 'validation' && stage === 3 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Target Motivation Assessment</p><h2 className="mt-1 text-xl font-extrabold">Quick choices, no mandatory essays</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Your responses save after every question.</p>
          <div className="mt-6 space-y-7">
            <div><p className="mb-3 font-bold">1. How important is this program to you?</p><SingleChoice value={motivation.commitment} onChange={(value) => setMotivation((current) => ({ ...current, commitment: value }))} options={['Primary target', 'One of top targets', 'Currently considering', 'Mainly exploring']} /></div>
            <div><p className="mb-3 font-bold">2. Why this company? <span className="text-xs font-normal text-[var(--space-text-muted)]">Choose up to 3</span></p><MultiChoice value={motivation.companyReasons} onChange={(value) => setMotivation((current) => ({ ...current, companyReasons: value }))} options={COMPANY_REASONS} /></div>
            <div><p className="mb-3 font-bold">3. Why this program? <span className="text-xs font-normal text-[var(--space-text-muted)]">Choose up to 3</span></p><MultiChoice value={motivation.programReasons} onChange={(value) => setMotivation((current) => ({ ...current, programReasons: value }))} options={PROGRAM_REASONS} /></div>
            <div><p className="mb-3 font-bold">4. Why this function? <span className="text-xs font-normal text-[var(--space-text-muted)]">Choose up to 3</span></p><MultiChoice value={motivation.functionReasons} onChange={(value) => setMotivation((current) => ({ ...current, functionReasons: value }))} options={FUNCTION_REASONS} /></div>
            <div><p className="mb-3 font-bold">5. Which description best matches your understanding of {selectedFunction}?</p><SingleChoice value={motivation.roleUnderstanding} onChange={(value) => setMotivation((current) => ({ ...current, roleUnderstanding: value }))} options={[`Deliver measurable outcomes within ${selectedFunction}`, `Learn the function through rotations and coached projects`, `Coordinate stakeholders and solve target-relevant problems`, 'I am still clarifying the day-to-day responsibilities']} /></div>
            <div><p className="mb-3 font-bold">6. How familiar are you with this program?</p><SingleChoice value={motivation.familiarity} onChange={(value) => setMotivation((current) => ({ ...current, familiarity: value }))} options={['1 — Not familiar', '2 — Slightly familiar', '3 — Moderately familiar', '4 — Very familiar', '5 — Highly familiar']} /></div>
            <div><p className="mb-3 font-bold">7. What is your long-term direction?</p><SingleChoice value={motivation.longTerm} onChange={(value) => setMotivation((current) => ({ ...current, longTerm: value }))} options={['Functional specialist', 'Business or people manager', 'General management', 'Strategy or consulting', 'Entrepreneurship', 'Still exploring']} /></div>
            {[['8. Are you open to rotation?', 'rotation'], ['9. Are you open to relocation?', 'relocation'], ['10. Are you open to business travel?', 'travel']] .map(([question, key]) => <div key={key}><p className="mb-3 font-bold">{question}</p><SingleChoice value={(motivation as any)[key]} onChange={(value) => setMotivation((current) => ({ ...current, [key]: value }))} options={['Yes', 'Depends on arrangement', 'No']} /></div>)}
            <div><p className="mb-3 font-bold">11. If selected, how likely are you to accept an offer?</p><SingleChoice value={motivation.acceptance} onChange={(value) => setMotivation((current) => ({ ...current, acceptance: value }))} options={['1 — Very unlikely', '2', '3 — Unsure', '4', '5 — Very likely']} /></div>
            <div><p className="mb-3 font-bold">12. Rank your top three decision priorities</p><div className="grid gap-2 sm:grid-cols-3">{[0, 1, 2].map((index) => <label key={index} className="text-xs font-bold text-[var(--space-text-secondary)]">#{index + 1}<select value={motivation.priorityRanking[index] || ''} onChange={(event) => rankingChoice(index, event.target.value)} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-3 text-sm"><option value="">Select priority</option>{PRIORITIES.filter((item) => !motivation.priorityRanking.includes(item) || motivation.priorityRanking[index] === item).map((item) => <option key={item}>{item}</option>)}</select></label>)}</div></div>
            <label className="block font-bold">Anything else you want Mate to know? <span className="text-xs font-normal text-[var(--space-text-muted)]">Optional</span><textarea rows={3} value={motivation.notes} onChange={(event) => setMotivation((current) => ({ ...current, notes: event.target.value }))} className="mt-2 w-full rounded-xl border border-[var(--space-border-default)] p-3 text-sm" /></label>
          </div>
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(2)} className="inline-flex items-center justify-center gap-1 text-sm font-bold text-[var(--space-text-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={saveAndExit} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Save and Exit</button><button type="button" disabled={!motivationComplete} onClick={() => { setStage(4); track('motivation_assessment_completed'); }} className="rounded-xl bg-[var(--space-brand-primary)] px-5 py-2 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-50">Continue to Work Style</button></div></div>
        </section>}

        {journey === 'validation' && stage === 4 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Work Style</p><h2 className="mt-1 text-xl font-extrabold">Reuse valid results or review them</h2>
          {foundPrior && assessmentReuseChoice === null && <div className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><p className="font-extrabold">We found information from your previous assessment.</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">You do not need to retake OCP or MBTI for a new target.</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => applyReuse('use')} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Use Existing Results</button><button type="button" onClick={() => applyReuse('review')} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Review and Update</button><button type="button" onClick={() => applyReuse('retake')} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Retake Assessment</button></div></div>}
          {(!foundPrior || assessmentReuseChoice !== null) && <>
            <div className="mt-6"><div className="flex items-center justify-between gap-3"><div><h3 className="font-extrabold">OCP Work Style Assessment</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">When verified company culture data is unavailable, this is reported only as Work Environment Preference.</p></div>{ocpResultReused && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-semantic-success)]">Reused</span>}</div><div className="mt-3 grid gap-3 sm:grid-cols-2">{OCP_ITEMS.map(([key, label, low, high]) => <label key={key} className="rounded-2xl border border-[var(--space-border-default)] p-3"><span className="flex items-center justify-between text-sm font-bold">{label}<b className="rounded-lg bg-[var(--space-brand-primary)] px-2.5 py-1 text-[var(--space-text-on-primary)]">{ocp[key]}</b></span><input type="range" min={1} max={5} value={ocp[key]} onChange={(event) => { setOcp((current) => ({ ...current, [key]: Number(event.target.value) })); setOcpResultReused(false); }} className="mt-3 w-full accent-[var(--space-brand-primary)]" /><span className="mt-1 flex justify-between text-[10px] text-[var(--space-text-muted)]"><span>1 · {low}</span><span className="text-right">5 · {high}</span></span></label>)}</div></div>
            <div className="mt-7 border-t border-[var(--space-border-default)] pt-6"><div className="flex items-center justify-between gap-3"><div><h3 className="font-extrabold">Personality &amp; Working Style Assessment</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">A supporting working-style signal only — never an automatic suitability verdict.</p></div>{workingStyleResultReused && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-semantic-success)]">Reused</span>}</div>
              {mbtiMode === 'existing' && priorMbti ? <div className="mt-3 rounded-2xl bg-[var(--space-surface-muted)] p-4"><p className="text-sm font-bold">Existing result: <span className="text-[var(--space-text-brand)]">{priorMbti.type}</span></p><button type="button" onClick={() => { setMbtiMode('assessment'); setMbtiAnswers({}); setMbtiType(''); setWorkingStyleResultReused(false); }} className="mt-2 text-xs font-bold text-[var(--space-text-brand)] underline">Retake instead</button></div> : <div className="mt-3"><p className="text-sm font-bold">Do you already know your MBTI type?</p><div className="mt-2 flex flex-wrap gap-2"><button type="button" onClick={() => setMbtiMode('known')} className={`rounded-xl border px-3 py-2 text-xs font-bold ${mbtiMode === 'known' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>Yes, Select My Type</button><button type="button" onClick={() => setMbtiMode('assessment')} className={`rounded-xl border px-3 py-2 text-xs font-bold ${mbtiMode === 'assessment' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>No / I'm Not Sure, Take the Assessment</button></div>
                {mbtiMode === 'known' ? <select value={mbtiType} onChange={(event) => { setMbtiType(event.target.value); setMbtiAnswers(event.target.value ? answersForType(event.target.value) : {}); }} className="mt-3 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-3 text-sm"><option value="">Select your type</option>{['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'].map((type) => <option key={type}>{type}</option>)}</select> : currentMbti && <div className="mt-4 rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex justify-between gap-2"><p className="font-bold">{currentMbti.question}</p><span className="text-xs font-bold text-[var(--space-text-muted)]">{mbtiIndex + 1}/20</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{([['A', currentMbti.a.text], ['B', currentMbti.b.text]] as const).map(([choice, text]) => <button key={choice} type="button" onClick={() => { const next = { ...mbtiAnswers, [currentMbti.id]: choice }; setMbtiAnswers(next); setWorkingStyleResultReused(false); if (mbtiIndex < 19) setMbtiIndex(mbtiIndex + 1); else setMbtiType(scoreMbti(next).type); }} className={`rounded-xl border p-3 text-left text-sm font-semibold ${mbtiAnswers[currentMbti.id] === choice ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>{text}</button>)}</div><button type="button" disabled={mbtiIndex === 0} onClick={() => setMbtiIndex((current) => Math.max(0, current - 1))} className="mt-3 text-xs font-bold text-[var(--space-text-muted)] disabled:opacity-30">Previous question</button>{Object.keys(mbtiAnswers).length === 20 && <p className="mt-2 text-sm font-bold text-[var(--space-text-brand)]">Working-style result: {mbtiType || scoreMbti(mbtiAnswers).type}</p>}</div>}
              </div>}
            </div>
          </>}
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(3)} className="inline-flex items-center justify-center gap-1 text-sm font-bold text-[var(--space-text-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={saveAndExit} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Save and Exit</button><button type="button" disabled={busy || foundPrior && assessmentReuseChoice === null || !(Object.keys(mbtiAnswers).length === 20 || /^[EI][SN][TF][JP]$/.test(mbtiType))} onClick={() => void runAssessment()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{busy ? 'Preparing Target Fit…' : 'Continue to Results'}</button></div></div>
        </section>}

        {journey === 'validation' && stage === 5 && target && <section className="space-y-4">
          <div className="rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-wider opacity-80">Target Fit</p><h2 className="mt-1 text-2xl font-extrabold">{target.company} · {target.program}</h2><p className="mt-2 text-sm opacity-90">{selectedFunction} · {target.recruitmentCycle}</p></div>
          {fitPending || !fitAnalysis ? <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center"><Sparkles className="mx-auto h-8 w-8 text-[var(--space-text-brand)]" /><h3 className="mt-3 text-lg font-extrabold">Your assessment is complete. Your Target Fit result is being prepared.</h3><p className="mt-2 text-sm text-[var(--space-text-secondary)]">No program-specific score is shown because the selected program rubric or result is not currently available. Your confirmed function and profile can still anchor a general preparation plan.</p></div> : <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><ScoreCard label="Overall Target Fit" value={fitAnalysis.matching_ratio} /><div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">Eligibility status</p><p className="mt-1 text-sm font-extrabold">{fitAnalysis.eligibility_status || 'Not supplied by fit model'}</p></div><ScoreCard label="Profile & Experience Fit" value={fitAnalysis.cv_profile_fit_score} /><ScoreCard label="Function Fit" value={fitAnalysis.function_fit_score} /><ScoreCard label="Motivation Fit" value={fitAnalysis.motivation_fit_score} /><ScoreCard label="Work Style Fit" value={fitAnalysis.work_style_fit_score ?? fitAnalysis.culture_fit_percent} />{fitAnalysis.data_confidence && <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Data confidence</p><p className="mt-1 font-extrabold">{fitAnalysis.data_confidence}</p></div>}</div>
            <div className="grid gap-4 lg:grid-cols-2"><div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">Top strengths</h3>{strengths.length ? <ul className="mt-3 space-y-2">{strengths.map((item: any) => <li key={item.id} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" /><span><b>{item.label_en || item.label_vi}</b>{item.evidence ? ` — ${item.evidence}` : ''}</span></li>)}</ul> : <p className="mt-2 text-sm text-[var(--space-text-muted)]">No strengths were supplied by the current fit result.</p>}</div><div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">Key gaps & potential concerns</h3>{gaps.length ? <ul className="mt-3 space-y-2">{gaps.map((item: any) => <li key={item.id} className="flex gap-2 text-sm"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--space-semantic-warning)]" /><span><b>{item.label_en || item.label_vi}</b>{item.improvement_tip ? ` — ${item.improvement_tip}` : ''}</span></li>)}</ul> : <p className="mt-2 text-sm text-[var(--space-text-muted)]">No program-specific gaps were supplied.</p>}</div></div>
          </>}
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-extrabold">Review My Fit</h3><p className="mt-1 text-sm text-[var(--space-text-muted)]">Optional detailed breakdown — it does not block target confirmation.</p></div><button type="button" disabled={!fitAnalysis} onClick={() => { setShowBreakdown((current) => !current); track('fit_breakdown_viewed', { program_id: target.id }); }} className="inline-flex items-center gap-1 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold disabled:opacity-40">{showBreakdown ? 'Hide breakdown' : 'Review My Fit'} <ChevronDown className={`h-4 w-4 ${showBreakdown ? 'rotate-180' : ''}`} /></button></div>
            {showBreakdown && <div className="mt-4 space-y-3">{resultCriteria.map((criterion: any) => <article key={criterion.id} className="rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><h4 className="font-extrabold">{criterion.label_en || criterion.label_vi || criterion.id}</h4><p className="mt-1 text-xs text-[var(--space-text-muted)]">Current score: {Number.isFinite(Number(criterion.score)) ? `${criterion.score}%` : 'Not available'} · Target expectation: {criterion.status === 'met' ? 'Evidence meets the available rubric level' : 'Additional verified evidence needed'}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${criterion.status === 'met' ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] text-[var(--space-semantic-warning)]'}`}>{criterion.status === 'met' ? 'Evidence found' : 'Missing evidence'}</span></div><p className="mt-3 text-sm text-[var(--space-text-secondary)]"><b>Evidence found:</b> {criterion.evidence || 'None in the confirmed profile'}</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]"><b>How this affected the result:</b> {criterion.status === 'met' ? 'Verified evidence supported this dimension.' : 'The dimension remains a gap because supporting evidence was not verified.'}</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]"><b>Recommended improvement:</b> {criterion.improvement_tip || 'No recommendation was supplied.'}</p>{criterion.status !== 'met' && !criterion.evidence && <div className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3"><p className="text-sm font-bold">We couldn't find relevant {String(criterion.label_en || criterion.label_vi || 'experience').toLowerCase()} in your CV. Do you have any to add?</p><div className="mt-2 flex gap-2"><button type="button" onClick={() => { setEvidenceCriterion(criterion.id); track('missing_evidence_prompted', { criterion_id: criterion.id }); }} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Yes, Add Experience</button><button type="button" onClick={() => setEvidenceCriterion(null)} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">No, Continue</button></div></div>}</article>)}
              {evidenceCriterion && <div className="rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><h4 className="font-extrabold">Add structured evidence</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{([['Experience type','type'],['Name / organization','name'],['Role','role'],['Date','date'],['Responsibilities','responsibilities'],['Achievement','achievement'],['Skills demonstrated','skills']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={evidenceDraft[key]} onChange={(event) => setEvidenceDraft((current) => ({ ...current, [key]: event.target.value }))} className="mt-1 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-sm" /></label>)}</div><button type="button" disabled={!evidenceDraft.name.trim()} onClick={addEvidence} className="mt-3 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-50">Save Evidence</button></div>}
              <div className="flex flex-wrap gap-2"><button type="button" onClick={() => setStage(3)} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Review My Answers</button><button type="button" onClick={() => setStage(2)} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Update My Information</button><button type="button" disabled={busy} onClick={() => { track('fit_recalculated', { evidence_count: userAddedEvidence.length }); void runAssessment(); }} className="inline-flex items-center gap-1 rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)] disabled:opacity-50">{busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}Recalculate My Fit</button></div>
            </div>}
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(4)} className="inline-flex items-center justify-center gap-1 text-sm font-bold text-[var(--space-text-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={saveAndExit} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Save and Exit</button><button type="button" onClick={changeTarget} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Change Target</button><button type="button" disabled={busy} onClick={() => void confirmTarget()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}Confirm Target &amp; Generate Preparation Plan</button></div></div>
        </section>}

        {journey === 'validation' && stage === 6 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-7 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-[var(--space-semantic-success)]" /><h2 className="mt-3 text-xl font-extrabold">Your target is active and your preparation plan is ready.</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Open My Roadmap to see priority gaps, the recommended next action, weekly goals and practice progress.</p><button type="button" onClick={() => openApp('my-roadmap')} className="mt-4 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2 text-sm font-bold text-[var(--space-text-on-primary)]">Open My Roadmap</button></section>}
      </div>
    </div>
  );
}
