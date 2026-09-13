import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as mammoth from 'https://esm.sh/mammoth@1.12.1?bundle';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { MBTI_ITEMS, scoreMbti } from '../../components/CultureFitSection';
import { applicationWindowDisplay, findProgramTimeline } from '../../lib/programTimelines';

const STRUCTURED_HOOK = '/api/hooks/execute/workspace-539150/casemate-structured-fit-v1';
const FUNCTION_HOOK = '/api/hooks/execute/workspace-539150/casemate-function-fit-v1';
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';

type Experience = { company: string; role: string; duration: string; description: string; sector?: string };
type CvProfile = {
  name: string;
  university: string;
  faculty: string;
  major?: string;
  graduation_year: string;
  year_of_study?: string;
  gpa: string;
  experiences: Experience[];
  internship_history?: any[];
  skills: string[];
  certifications: string[];
  english_certificates?: string[];
  target_company: string;
  target_industry: string;
  activities?: string[];
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
  matched_functions: string[];
  function: string;
  function_fit_score: number;
  corporate_fit_percent: number;
  corporate_data_sufficient: boolean;
  program_fit_percent: number;
  why: string;
};

const EMPTY_PROFILE: CvProfile = {
  name: '', university: '', faculty: '', graduation_year: '', gpa: '', experiences: [], skills: [], certifications: [],
  target_company: '', target_industry: '', activities: [], inferred_interests: [], cities_mentioned: [], standout_points: [],
};
const DEFAULT_OCP: OcpScores = {
  innovation: 3, detail: 3, results: 3, competitive: 3, supportive: 3, teamwork: 3,
  reward_development: 3, reward_compensation: 3, work_life_balance: 3,
};
const EMPTY_MOTIVATION: MotivationAnswers = { job_priority: '', work_preference: '', strength: '', energizing_problem: '' };
const STEP_LABELS = ['CV', 'Motivation', 'Work style', 'MBTI', 'Function fit', 'Programs'];
const MEDALS = ['🥇', '🥈', '🥉'];

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

function openApp(appId: string) { window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } })); }
function readSessionEmail(spaceId: string): string | null {
  try {
    const value = JSON.parse(localStorage.getItem(`space_session_${spaceId}`) || '{}');
    return typeof value.email === 'string' ? value.email.toLowerCase().trim() : null;
  } catch { return null; }
}
function normalizeProfile(raw: any): CvProfile {
  const value = raw && typeof raw === 'object' ? raw : {};
  const experiences = Array.isArray(value.experiences) ? value.experiences : Array.isArray(value.internship_history)
    ? value.internship_history.map((item: any) => ({ company: item.company || item.organization || '', role: item.role || '', duration: item.duration || '', description: item.description || '', sector: item.sector || '' })) : [];
  return {
    ...EMPTY_PROFILE, ...value,
    name: value.name || '', university: value.university || '', faculty: value.faculty || value.major || '', graduation_year: value.graduation_year || '', gpa: value.gpa || '',
    experiences, skills: Array.isArray(value.skills) ? value.skills : [], certifications: Array.isArray(value.certifications) ? value.certifications : Array.isArray(value.english_certificates) ? value.english_certificates : [],
  };
}
function profileHasContent(profile: CvProfile) {
  return !!(profile.name || profile.university || profile.faculty || profile.gpa || profile.skills.length || profile.experiences.some((item) => item.company || item.role));
}

export default function FitAssessmentApp() {
  const { sessionId, visitorId, spaceId, trackEvent } = useSpaceRuntime();
  const email = useMemo(() => readSessionEmail(spaceId), [spaceId]);
  const userKey = useMemo(() => email ? `email:${email}` : `device:${visitorId || 'anonymous'}`, [email, visitorId]);
  const storageKey = `casemate-function-first-v1:${sessionId || 'preview'}`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const restoredRef = useRef(false);

  const [step, setStep] = useState(1);
  const [cvReady, setCvReady] = useState(false);
  const [profile, setProfile] = useState<CvProfile>(EMPTY_PROFILE);
  const [cvText, setCvText] = useState('');
  const [showPaste, setShowPaste] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [dragging, setDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<MotivationAnswers>(EMPTY_MOTIVATION);
  const [ocp, setOcp] = useState<OcpScores>(DEFAULT_OCP);
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<string, 'A' | 'B'>>({});
  const [mbtiIndex, setMbtiIndex] = useState(0);
  const [functionScores, setFunctionScores] = useState<FunctionScore[]>([]);
  const [assessmentResultId, setAssessmentResultId] = useState<number | null>(null);
  const [programs, setPrograms] = useState<ProgramMatch[]>([]);
  const [filterFunctions, setFilterFunctions] = useState<string[]>([]);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [busy, setBusy] = useState<'idle' | 'function' | 'programs'>('idle');
  const [assessmentSessionId, setAssessmentSessionId] = useState(() => `fit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      if (saved.profile) setProfile(normalizeProfile(saved.profile));
      if (saved.cvReady) setCvReady(true);
      if (saved.motivation) setMotivation({ ...EMPTY_MOTIVATION, ...saved.motivation });
      if (saved.ocp) setOcp({ ...DEFAULT_OCP, ...saved.ocp });
      if (saved.mbtiAnswers) { setMbtiAnswers(saved.mbtiAnswers); setMbtiIndex(Math.min(Object.keys(saved.mbtiAnswers).length, MBTI_ITEMS.length - 1)); }
      if (Array.isArray(saved.functionScores)) setFunctionScores(saved.functionScores);
      if (Number.isFinite(Number(saved.assessmentResultId))) setAssessmentResultId(Number(saved.assessmentResultId));
      if (Array.isArray(saved.programs)) setPrograms(saved.programs);
      if (Array.isArray(saved.filterFunctions)) setFilterFunctions(saved.filterFunctions);
      if (saved.filterExpanded) setFilterExpanded(true);
      if (typeof saved.selectedProgram === 'string') setSelectedProgram(saved.selectedProgram);
      if (saved.assessmentSessionId) setAssessmentSessionId(String(saved.assessmentSessionId));
      setStep(Math.max(1, Math.min(6, Number(saved.step) || 1)));
    } catch { /* A broken local draft should not block a fresh run. */ }
  }, [storageKey]);

  useEffect(() => {
    if (!restoredRef.current) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ step, cvReady, profile, motivation, ocp, mbtiAnswers, functionScores, assessmentResultId, programs, filterFunctions, filterExpanded, selectedProgram, assessmentSessionId }));
    } catch { /* The current tab still works when storage is unavailable. */ }
  }, [storageKey, step, cvReady, profile, motivation, ocp, mbtiAnswers, functionScores, assessmentResultId, programs, filterFunctions, filterExpanded, selectedProgram, assessmentSessionId]);

  const callHook = useCallback(async (url: string, action: string, payload: Record<string, any>) => {
    const response = await fetch(`${url}?action=${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(sessionId ? { 'X-Session-Id': sessionId } : {}) },
      body: JSON.stringify({ ...payload, user_key: userKey, email, assessment_session_id: assessmentSessionId }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) throw new Error(data.error || 'Casemate could not process this request. Please try again.');
    return data;
  }, [sessionId, userKey, email, assessmentSessionId]);

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
  const parseInput = async ({ file, text }: { file?: File; text?: string }) => {
    setError(null); setParsing(true); let uploadedKey = '';
    try {
      let data: any;
      if (file) {
        const extension = file.name.toLowerCase().split('.').pop();
        const isPdf = file.type === 'application/pdf' || extension === 'pdf';
        const isDocx = file.type.includes('wordprocessingml') || extension === 'docx';
        if (!isPdf && !isDocx) throw new Error('Only PDF and DOCX files are supported.');
        if (file.size > 32 * 1024 * 1024) throw new Error('This file is over 32 MB.');
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
      setProfile(normalizeProfile(data.profile)); setCvReady(true);
      void trackEvent('fit_assessment_cv_parsed', { source: file ? 'file' : 'text' });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not read your CV. Enter the details manually.');
      setProfile(EMPTY_PROFILE); setCvReady(true);
    } finally { if (uploadedKey) void deleteUploadedPdf(uploadedKey); setParsing(false); }
  };

  const calculateFunctions = async () => {
    if (Object.keys(mbtiAnswers).length !== MBTI_ITEMS.length) return;
    setBusy('function'); setError(null);
    try {
      const mbti = scoreMbti(mbtiAnswers);
      const data = await callHook(FUNCTION_HOOK, 'calculate', { cv_profile: profile, motivation_answers: motivation, ocp_scores: ocp, mbti_answers: mbtiAnswers, mbti_type: mbti.type, mbti_counts: mbti.counts });
      setFunctionScores(data.function_fit_scores || []); setAssessmentResultId(Number(data.assessment_result_id)); setStep(5);
      void trackEvent('function_fit_calculated', { topFunction: data.top_functions?.[0]?.name, topScore: data.top_functions?.[0]?.score });
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Mate could not calculate your function fit.'); }
    finally { setBusy('idle'); }
  };
  const loadPrograms = async () => {
    if (!assessmentResultId) return;
    setBusy('programs'); setError(null);
    try {
      const data = await callHook(FUNCTION_HOOK, 'programs', { assessment_result_id: assessmentResultId });
      setPrograms(data.programs || []); setFilterFunctions(data.filter_functions || []); setFilterExpanded(data.expanded_to_top_three === true); setSelectedProgram(null); setStep(6);
      void trackEvent('function_programs_filtered', { count: data.programs?.length || 0, functions: data.filter_functions || [] });
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Mate could not load your matched programs.'); }
    finally { setBusy('idle'); }
  };
  const resetAssessment = useCallback(() => {
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    setAssessmentSessionId(`fit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`);
    setStep(1); setCvReady(false); setProfile(EMPTY_PROFILE); setCvText(''); setSelectedFile(''); setError(null); setMotivation(EMPTY_MOTIVATION); setOcp(DEFAULT_OCP); setMbtiAnswers({}); setMbtiIndex(0); setFunctionScores([]); setAssessmentResultId(null); setPrograms([]); setFilterFunctions([]); setFilterExpanded(false); setSelectedProgram(null); setBusy('idle');
  }, [storageKey]);

  useEffect(() => {
    window.addEventListener('casemate:restart-fit-assessment', resetAssessment);
    return () => window.removeEventListener('casemate:restart-fit-assessment', resetAssessment);
  }, [resetAssessment]);

  const openRoadmap = () => {
    const program = programs.find((item) => item.program_id === selectedProgram);
    if (!program) return;
    try { localStorage.setItem(`casemate-roadmap-target:${sessionId || 'preview'}`, JSON.stringify({ program: program.program, company: program.company, programId: program.program_id, matchPercent: program.program_fit_percent })); } catch { /* roadmap can use the saved result */ }
    openApp('my-roadmap');
  };

  const motivationComplete = Object.values(motivation).every(Boolean);
  const mbtiComplete = Object.keys(mbtiAnswers).length === MBTI_ITEMS.length;
  const currentMbti = MBTI_ITEMS[mbtiIndex];
  const currentCopy = currentMbti ? MBTI_COPY[currentMbti.id] : null;
  const topFunctions = functionScores.slice(0, 3);

  return (
    <div className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11">
      <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-6 sm:py-8">
        <header className="mb-4 flex flex-col gap-3 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--space-surface-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--space-text-brand)]"><Sparkles className="h-3.5 w-3.5" /> Mate Fit Assessment</div>
            <h1 className="text-lg font-extrabold leading-snug tracking-tight md:text-3xl">Find your function first. Then find the right program.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--space-text-secondary)]">A focused two-stage assessment for Vietnamese Economics and STEM students preparing for MT and consulting applications.</p>
          </div>
          <button type="button" onClick={resetAssessment} className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-semibold text-[var(--space-text-secondary)] hover:bg-[var(--space-surface-muted)]"><RefreshCw className="h-3.5 w-3.5" /> Start Over</button>
        </header>

        <div className="mb-4 grid grid-cols-6 gap-1 sm:mb-6 sm:gap-1.5" aria-label={`Step ${step} of 6`}>
          {STEP_LABELS.map((label, index) => {
            const number = index + 1; const active = number === step; const complete = number < step;
            return <div key={label} className="min-w-0"><div className="mb-1.5 h-1 overflow-hidden rounded-full bg-[var(--space-surface-muted)] sm:mb-2 sm:h-1.5"><div className={`h-full rounded-full ${active || complete ? 'bg-[var(--space-brand-primary)]' : ''}`} style={{ width: complete ? '100%' : active ? '60%' : '0%' }} /></div><div className={`flex items-center justify-center gap-1 text-[10px] font-bold sm:justify-start sm:text-xs ${active || complete ? 'text-[var(--space-text-primary)]' : 'text-[var(--space-text-muted)]'}`}><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${active || complete ? 'bg-[var(--space-brand-primary)] text-[var(--space-text-on-primary)]' : 'bg-[var(--space-surface-muted)]'}`}>{complete ? <Check className="h-3 w-3" /> : number}</span><span className="hidden truncate sm:inline">{label}</span></div></div>;
          })}
        </div>

        {error && <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_8%,transparent)] p-3 text-xs font-semibold text-[var(--space-semantic-danger)]">{error}</div>}

        {step === 1 && !cvReady && (
          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 shadow-[0_18px_50px_color-mix(in_srgb,var(--space-shell-shadow)_20%,transparent)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · Step 1 of 4</p><h2 className="mt-2 text-lg font-extrabold sm:text-2xl">Upload your CV</h2><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">Mate extracts your education, experience, and skills. You review every field before it contributes to scoring.</p>
            <div onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); const file = event.dataTransfer.files?.[0]; if (file) void parseInput({ file }); }} className={`mt-4 rounded-2xl border-2 border-dashed p-4 text-center transition sm:mt-6 sm:p-8 ${dragging ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-strong)] bg-[var(--space-surface-muted)]'}`}>
              <UploadCloud className="mx-auto h-8 w-8 text-[var(--space-text-brand)] sm:h-10 sm:w-10" /><p className="mt-3 text-sm font-bold">Drop a PDF or DOCX here</p><p className="mt-1 text-xs text-[var(--space-text-muted)]">Up to 32 MB · temporary PDFs are removed after parsing</p>
              <input ref={fileInputRef} type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void parseInput({ file }); event.target.value = ''; }} />
              <button type="button" disabled={parsing} onClick={() => fileInputRef.current?.click()} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-60 sm:w-auto sm:px-5">{parsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}{parsing ? 'Mate is reading your CV…' : 'Upload CV'}</button>{selectedFile && <p className="mt-2 text-xs font-medium">{selectedFile}</p>}
            </div>
            <div className="my-5 flex items-center gap-3 text-xs text-[var(--space-text-muted)]"><span className="h-px flex-1 bg-[var(--space-border-default)]" />or<span className="h-px flex-1 bg-[var(--space-border-default)]" /></div>
            {!showPaste ? <button type="button" onClick={() => setShowPaste(true)} className="w-full rounded-xl border border-[var(--space-border-default)] px-4 py-3 text-sm font-bold text-[var(--space-text-brand)]">Paste CV text</button> : <div><textarea rows={10} value={cvText} onChange={(event) => setCvText(event.target.value)} placeholder="Paste your full CV text here…" className="w-full rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] p-4 text-sm outline-none focus:border-[var(--space-brand-primary)]" /><button type="button" disabled={parsing || cvText.trim().length < 40} onClick={() => void parseInput({ text: cvText })} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-4 py-2.5 text-sm font-bold text-[var(--space-text-on-primary)] disabled:opacity-50 sm:w-auto sm:px-5">Analyze CV Text</button></div>}
          </section>
        )}

        {step === 1 && cvReady && (
          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-8">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · CV confirmation</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Review what Mate found</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Correct anything that is incomplete. Your CV is evidence, not a gate — no experience is okay.</p></div><button type="button" onClick={() => setCvReady(false)} className="text-xs font-bold text-[var(--space-text-muted)]"><ArrowLeft className="mr-1 inline h-3.5 w-3.5" />Another CV</button></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">{([['Full name', 'name'], ['University', 'university'], ['Faculty / major', 'faculty'], ['Graduation year', 'graduation_year'], ['GPA', 'gpa']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={profile[key] || ''} onChange={(event) => setProfile((current) => ({ ...current, [key]: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm outline-none focus:border-[var(--space-brand-primary)]" /></label>)}</div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><BriefcaseBusiness className="h-4 w-4 text-[var(--space-text-brand)]" />Experience</h3><button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: [...current.experiences, { company: '', role: '', duration: '', description: '' }] }))} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>
              {profile.experiences.length === 0 ? <p className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No experience yet? That is normal. The model will use your other four dimensions and treat CV evidence as a fresh-graduate baseline.</p> : <div className="mt-3 space-y-3">{profile.experiences.map((experience, index) => <div key={index} className="rounded-2xl border border-[var(--space-border-default)] p-4"><div className="grid gap-3 sm:grid-cols-3">{(['company', 'role', 'duration'] as const).map((key) => <label key={key} className="text-[11px] font-bold text-[var(--space-text-muted)]">{key === 'company' ? 'Company' : key === 'role' ? 'Role' : 'Duration'}<input value={experience[key] || ''} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1 w-full rounded-lg border border-[var(--space-border-default)] px-3 py-2 text-sm" /></label>)}</div><textarea rows={3} value={experience.description} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder="Responsibilities, projects, and measurable results" className="mt-3 w-full rounded-lg border border-[var(--space-border-default)] px-3 py-2 text-sm" /><button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: current.experiences.filter((_, itemIndex) => itemIndex !== index) }))} className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[var(--space-semantic-danger)]"><Trash2 className="h-3 w-3" />Remove</button></div>)}</div>}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold text-[var(--space-text-secondary)]">Skills (comma-separated)<textarea rows={3} value={profile.skills.join(', ')} onChange={(event) => setProfile((current) => ({ ...current, skills: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] p-3 text-sm" /></label><label className="text-xs font-bold text-[var(--space-text-secondary)]">Clubs, competitions, and activities<textarea rows={3} value={(profile.activities || []).join(', ')} onChange={(event) => setProfile((current) => ({ ...current, activities: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] p-3 text-sm" /></label></div>
            <div className="mt-5 flex justify-end sm:mt-6"><button type="button" disabled={!profileHasContent(profile)} onClick={() => { setError(null); setStep(2); void trackEvent('fit_assessment_profile_confirmed', { hasExperience: profile.experiences.length > 0 }); }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-45 sm:w-auto sm:py-3">Confirm CV <ArrowRight className="h-4 w-4" /></button></div>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-8"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · Step 2 of 4</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">What motivates you?</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Four quick choices help separate functions that can look similar on a CV.</p>
            <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-6">{MOTIVATION_QUESTIONS.map((item, questionIndex) => <div key={item.key}><p className="text-sm font-extrabold">{questionIndex + 1}. {item.question}</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{item.options.map((option) => { const selected = motivation[item.key] === option; return <button key={option} type="button" onClick={() => setMotivation((current) => ({ ...current, [item.key]: option }))} className={`rounded-xl border p-3 text-left text-sm font-semibold transition ${selected ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-primary)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}>{selected && <Check className="mr-2 inline h-4 w-4 text-[var(--space-text-brand)]" />}{option}</button>; })}</div></div>)}</div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-7 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[var(--space-text-muted)] sm:justify-start"><ArrowLeft className="h-3.5 w-3.5" />Back to CV</button><button type="button" disabled={!motivationComplete} onClick={() => setStep(3)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-45 sm:w-auto sm:py-3">Continue to Work Style <ArrowRight className="h-4 w-4" /></button></div>
          </section>
        )}

        {step === 3 && (
          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-8"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · Step 3 of 4</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">OCP Work Style</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Rate your ideal work environment from 1 to 5. These nine dimensions are compared with each function’s benchmark vector.</p>
            <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-7">{OCP_GROUPS.map((group) => <div key={group}><h3 className="text-base font-extrabold">{group}</h3><div className="mt-3 space-y-3">{OCP_ITEMS.filter((item) => item.group === group).map((item) => <div key={item.key} className="rounded-2xl border border-[var(--space-border-default)] p-3 sm:p-4"><div className="flex items-center justify-between"><p className="text-sm font-extrabold">{item.label}</p><span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[var(--space-brand-primary)] text-sm font-extrabold text-[var(--space-text-on-primary)]">{ocp[item.key]}</span></div><div className="mt-4 flex items-center gap-3"><span className="text-[10px] font-bold">1</span><input type="range" min={1} max={5} value={ocp[item.key]} onChange={(event) => setOcp((current) => ({ ...current, [item.key]: Number(event.target.value) }))} className="h-2 flex-1 accent-[var(--space-brand-primary)]" /><span className="text-[10px] font-bold">5</span></div><div className="mt-2 grid grid-cols-2 gap-4 text-[11px] text-[var(--space-text-muted)]"><p>{item.low}</p><p className="text-right">{item.high}</p></div></div>)}</div></div>)}</div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-7 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStep(2)} className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[var(--space-text-muted)] sm:justify-start"><ArrowLeft className="h-3.5 w-3.5" />Back</button><button type="button" onClick={() => setStep(4)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:w-auto sm:py-3">Continue to MBTI <ArrowRight className="h-4 w-4" /></button></div>
          </section>
        )}

        {step === 4 && currentMbti && currentCopy && (
          <section className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-8"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · Step 4 of 4</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">MBTI Working Style</h2></div><span className="rounded-full bg-[var(--space-surface-muted)] px-3 py-1 text-xs font-bold">{mbtiIndex + 1} / 20</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--space-surface-muted)]"><div className="h-full rounded-full bg-[var(--space-brand-primary)]" style={{ width: `${((mbtiIndex + 1) / 20) * 100}%` }} /></div>
            <div className="mt-5 rounded-2xl border border-[var(--space-border-default)] p-4 sm:mt-6 sm:p-8"><p className="text-base font-extrabold leading-6 sm:text-lg sm:leading-8">{currentCopy.question}</p><div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2">{(['A', 'B'] as const).map((choice) => <button key={choice} type="button" onClick={() => { const next = { ...mbtiAnswers, [currentMbti.id]: choice }; setMbtiAnswers(next); setError(null); if (mbtiIndex < MBTI_ITEMS.length - 1) setMbtiIndex(mbtiIndex + 1); }} className={`rounded-2xl border p-4 text-left text-sm font-bold leading-5 sm:min-h-28 sm:p-5 sm:leading-6 ${mbtiAnswers[currentMbti.id] === choice ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}><span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--space-brand-primary)] text-xs text-[var(--space-text-on-primary)]">{choice}</span>{choice === 'A' ? currentCopy.a : currentCopy.b}</button>)}</div></div>
            <div className="mt-5 flex flex-col-reverse gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => { if (mbtiIndex > 0) setMbtiIndex(mbtiIndex - 1); else setStep(3); }} className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[var(--space-text-muted)] sm:justify-start"><ArrowLeft className="h-3.5 w-3.5" />Previous</button><button type="button" disabled={!mbtiComplete || busy !== 'idle'} onClick={() => void calculateFunctions()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-45 sm:w-auto sm:py-3">{busy === 'function' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{busy === 'function' ? 'Calculating…' : 'See My Function Fit'}</button></div>
          </section>
        )}

        {step === 5 && topFunctions.length > 0 && (
          <section><div className="overflow-hidden rounded-2xl bg-[var(--space-brand-primary)] p-4 text-[var(--space-text-on-primary)] sm:p-8"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Stage 1 complete</p><h2 className="mt-2 text-lg font-extrabold md:text-3xl">Your top function fits</h2><p className="mt-3 max-w-3xl text-sm leading-6 opacity-90">These scores combine MBTI 30%, OCP work style 25%, cognitive orientation 20%, motivation 15%, and CV evidence 10%. Review them before program matching.</p></div>
            <div className="mt-5 space-y-3">{topFunctions.map((fn, index) => <article key={fn.id} className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-5"><div className="flex items-start justify-between gap-3 sm:gap-4"><div className="flex min-w-0 items-start gap-3"><span className="shrink-0 text-xl sm:text-2xl">{MEDALS[index]}</span><div className="min-w-0"><h3 className="break-words text-base font-extrabold sm:text-lg">{fn.name} <span className="text-[var(--space-text-brand)]">— {fn.score}%</span></h3><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">{fn.explanation}</p></div></div><Target className="h-5 w-5 shrink-0 text-[var(--space-text-brand)]" /></div><div className="mt-4 grid gap-2 sm:grid-cols-5">{[
              ['MBTI', `${fn.breakdown.mbti.matches}/4 · ${fn.breakdown.mbti.score}%`], ['Work style', `${fn.breakdown.work_style.score}%`], ['Cognitive', `${fn.breakdown.cognitive.score}%`], ['Motivation', `${fn.breakdown.motivation.score}%`], ['CV', `${fn.breakdown.cv_evidence.score}%`],
            ].map(([label, value]) => <div key={label} className="rounded-xl bg-[var(--space-surface-muted)] p-2 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-sm font-extrabold">{value}</p></div>)}</div><p className="mt-3 text-xs font-semibold text-[var(--space-text-muted)]">CV: {fn.breakdown.cv_evidence.evidence}</p></article>)}</div>
            <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5 sm:flex-row sm:items-center"><div><p className="text-sm font-extrabold">Does this direction feel right?</p><p className="mt-1 text-xs leading-5 text-[var(--space-text-muted)]">Confirm to see only programs offering at least one of your strongest functions.</p></div><div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"><button type="button" onClick={() => setStep(2)} className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--space-border-default)] px-4 py-3 text-xs font-bold sm:w-auto">Review answers</button><button type="button" disabled={busy !== 'idle'} onClick={() => void loadPrograms()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-3 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-50 sm:w-auto">{busy === 'programs' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{busy === 'programs' ? 'Filtering programs…' : 'Confirm & Match Programs'}</button></div></div>
          </section>
        )}

        {step === 6 && (
          <section><div className="overflow-hidden rounded-2xl bg-[var(--space-brand-primary)] p-4 text-[var(--space-text-on-primary)] sm:p-8"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Stage 2 · Program matching</p><h2 className="mt-2 text-lg font-extrabold md:text-3xl">Programs matched to your function</h2><p className="mt-3 text-sm leading-6 opacity-90">Filtered by {filterFunctions.join(', ')}{filterExpanded ? ' because your top function had fewer than five programs.' : '.'} Program Fit = 60% function fit + 40% corporate fit.</p></div>
            <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Maximum 20 programs</p><h3 className="mt-1 text-lg font-extrabold sm:text-xl">{programs.length} relevant matches</h3></div><button type="button" onClick={() => setStep(5)} className="text-xs font-bold text-[var(--space-text-muted)]"><ArrowLeft className="mr-1 inline h-3.5 w-3.5" />Function results</button></div>
            <div className="mt-3 space-y-3">{programs.map((program, index) => { const selected = selectedProgram === program.program_id; const timeline = applicationWindowDisplay(findProgramTimeline(program.company, program.program)); return <button key={program.program_id} type="button" role="radio" aria-checked={selected} onClick={() => setSelectedProgram(program.program_id)} className={`w-full rounded-2xl border bg-[var(--space-surface-card)] p-4 text-left transition sm:p-5 ${selected ? 'border-[var(--space-brand-primary)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)]' : 'border-[var(--space-border-default)]'}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="flex min-w-0 items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-sm font-extrabold text-[var(--space-text-brand)]">{index + 1}</span><div className="min-w-0"><p className="break-words text-xs font-bold text-[var(--space-text-muted)]">{program.company}</p><h4 className="mt-0.5 break-words text-base font-extrabold">{program.program}</h4><p className="mt-1 text-[11px] text-[var(--space-text-muted)]">{program.industry} · {program.matched_functions.join(', ')}</p></div></div><div className="flex items-center gap-2"><span className="rounded-full bg-[var(--space-brand-primary)] px-3 py-1 text-sm font-extrabold text-[var(--space-text-on-primary)]">{program.program_fit_percent}% match</span><span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? 'border-[var(--space-brand-primary)]' : 'border-[var(--space-border-strong)]'}`}>{selected && <span className="h-2.5 w-2.5 rounded-full bg-[var(--space-brand-primary)]" />}</span></div></div><div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-xl bg-[var(--space-surface-muted)] p-3 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Function fit · 60%</p><p className="mt-1 text-base font-extrabold sm:text-lg">{program.function_fit_score}%</p></div><div className="rounded-xl bg-[var(--space-surface-muted)] p-3 text-center"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Corporate fit · 40%</p><p className="mt-1 text-base font-extrabold sm:text-lg">{program.corporate_fit_percent}%{!program.corporate_data_sufficient && <span className="ml-1 text-[10px] font-semibold text-[var(--space-text-muted)]">neutral estimate</span>}</p></div></div><div className="mt-4 grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_15rem]"><p className="min-w-0 text-sm leading-6 text-[var(--space-text-secondary)]">{program.why}</p><div className="rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs font-semibold text-[var(--space-text-secondary)]">{timeline.openLabel}{timeline.closeLabel && <span className="mt-1 block">{timeline.closeLabel}</span>}</div></div></button>; })}</div>
            {programs.length === 0 && <div className="mt-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 text-sm text-[var(--space-text-muted)]">No matching programs were found. Review your function answers and try again.</div>}
            {selectedProgram && <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5 sm:flex-row sm:items-center"><div><p className="text-sm font-extrabold">1 program selected</p><p className="mt-1 text-xs text-[var(--space-text-muted)]">This becomes the single target anchoring your preparation plan.</p></div><button type="button" onClick={openRoadmap} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:w-auto sm:py-3">View My Roadmap <ChevronRight className="h-4 w-4" /></button></div>}
          </section>
        )}
      </div>
    </div>
  );
}
