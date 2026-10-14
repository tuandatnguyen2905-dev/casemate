import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'https://esm.sh/pdfjs-dist@6.3.289/build/pdf.mjs';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardPaste,
  GraduationCap,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Trophy,
  UploadCloud,
  Users,
} from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import { FitBrandTag, FitStepIndicator } from '../../components/FitAssessmentUI';
import CvSubmitStep from '../../components/CvSubmitStep';
import SaveProgressButton from '../../components/SaveProgressButton';
import type { ProgressSaveStatus } from '../../components/SaveProgressButton';
import WorkStyleAssessment from '../../components/WorkStyleAssessment';
import FitResultsSummary from '../../components/FitResultsSummary';
import { MBTI_ITEMS, scoreMbti } from '../../components/CultureFitSection';
import mtProgramsData from '../../data/mt-programs.json';
import { PROGRAM_FIT_RUBRIC_DRAFTS } from '../../lib/programFitRubrics';
import { industryLabel } from '../../lib/programIndustries';
import { deadlineStatus, findProgramTimeline } from '../../lib/programTimelines';
import { generateAndSaveRoadmap } from '../../lib/prepRoadmap';
import type { PreparationRecommendation } from '../../lib/prepRoadmap';
import { describeTables, ensureReferenceData } from '../../utils/seedReferenceData';
import type { ReferenceSeedStatus } from '../../utils/seedReferenceData';
import ExplorationFlow, { AchievementTimePicker, CompanyCombo, DEGREE_OPTIONS, ExperienceDurationEditor, ExperienceIndustrySelect, MajorCombo, mergeEducationCoursework, MonthPicker, normalizeDegree, normalizeIndustrySector, normalizeMajorName, SkillsSelector, UniversityCombo } from './App';

GlobalWorkerOptions.workerSrc = 'https://esm.sh/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs';
const FIT_ENGINE_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-engine-v3';
const STRUCTURED_FIT_HOOK = '/api/hooks/execute/workspace-539150/casemate-structured-fit-v1';
const CV_PROFILE_HOOK = '/api/hooks/execute/workspace-539150/casemate-cv-profile-v1';
const FIT_TRACKING_HOOK = '/api/hooks/execute/workspace-539150/casemate-fit-tracking-v1';
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';
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
type Experience = { company: string; role: string; duration: string; description: string; sector?: string; sectorSource?: 'auto' | 'user' | 'extracted'; source?: 'extracted' | 'user' };
type Education = { institution: string; field: string; degree: string; graduationYear: string; gpa: string; coursework: string; universityTier?: number; source?: 'extracted' | 'user' };
type ExtracurricularActivity = { organization: string; role: string; duration: string; description: string; source?: 'extracted' | 'user' };
type HonorAchievement = { competition: string; title: string; time: string; description: string; category?: string; sourceRowId?: string; source?: 'extracted' | 'user' };
type CvProfile = {
  name: string;
  university: string;
  university_tier?: number;
  faculty: string;
  graduation_year: string;
  gpa: string;
  coursework: string;
  education: Education[];
  experiences: Experience[];
  extracurricular_activities: ExtracurricularActivity[];
  honors_achievements: HonorAchievement[];
  skills: string[];
  certifications: string[];
  other_skills: string;
  other_skills_selected: boolean;
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
  companyReasons: string[];
  programReasons: string[];
  functionReasons: string[];
  familiarity: string;
  problemApproach: string;
  energizingWork: string;
  contributionStyle: string;
  rotation: string;
  relocation: string;
  travel: string;
  priorityRanking: string[];
  notes: string;
  /** Legacy fields remain readable so an in-progress pre-redesign draft can recover safely. */
  commitment?: string;
  roleUnderstanding?: string;
  longTerm?: string;
  acceptance?: string;
};
type SubroleRecommendation = { function: string; subroles: string[]; traits: string[]; evidence: string[]; version: number };
type FitAnalysis = Record<string, any> & { criteria?: Array<Record<string, any>>; recommended_subroles?: SubroleRecommendation | null };
type AddedEvidence = { id: string; criterionId: string; type: string; name: string; role: string; date: string; responsibilities: string; achievement: string; skills: string };

type SaveStatus = ProgressSaveStatus;

type SavedAssessment = {
  skillsInputVersion?: number;
  journey?: Journey;
  stage?: number;
  target?: TargetProgram | null;
  selectedFunction?: string;
  search?: string;
  manualMode?: boolean;
  manualCompany?: string;
  manualProgram?: string;
  manualIndustry?: string;
  manualCycle?: string;
  profile?: CvProfile;
  originalProfile?: CvProfile | null;
  cvReviewConfirmed?: boolean;
  cvFileName?: string;
  cvFileDate?: string;
  cvEntryMode?: 'upload' | 'saved' | 'manual' | null;
  motivation?: Motivation;
  ocp?: OcpScores;
  mbtiAnswers?: Record<string, 'A' | 'B'>;
  mbtiType?: string;
  ocpResultReused?: boolean;
  workingStyleResultReused?: boolean;
  fitAnalysis?: FitAnalysis | null;
  assessmentResultId?: number | null;
  userAddedEvidence?: AddedEvidence[];
  /** Set once the candidate deliberately leaves a recovered result, so recovery does not pull them back. */
  recoveryDismissed?: boolean;
};

const EMPTY_PROFILE: CvProfile = { name: '', university: '', faculty: '', graduation_year: '', gpa: '', coursework: '', education: [], experiences: [], extracurricular_activities: [], honors_achievements: [], skills: [], certifications: [], other_skills: '', other_skills_selected: false, languages: [], quantified_impact: [] };
const GPA_OPTIONS = [
  { label: '4.0+', value: 'Valedictorian' },
  { label: '3.6 – 4.0', value: 'High Distinction' },
  { label: '3.2 – 3.59', value: 'Distinction' },
  { label: '2.5 – 3.29', value: 'Good' },
  { label: '2.0 – 2.49', value: 'Ordinary' },
] as const;
const DEFAULT_OCP: OcpScores = { innovation: 3, detail: 3, results: 3, competitive: 3, supportive: 3, teamwork: 3, reward_development: 3, reward_compensation: 3, work_life_balance: 3 };
const EMPTY_MOTIVATION: Motivation = { companyReasons: [], programReasons: [], functionReasons: [], familiarity: '', problemApproach: '', energizingWork: '', contributionStyle: '', rotation: '', relocation: '', travel: '', priorityRanking: [], notes: '' };

const COMPANY_REASONS = ['Culture matches how I work', 'Products or customers I understand', 'Learning environment fits my needs', 'Leadership principles match my values', 'International or cross-market exposure', 'Meaningful social or customer impact', 'Performance expectations motivate me', 'Career progression fits my plan', 'Other'];
const PROGRAM_REASONS = ['Structured leadership development', 'Deep functional specialization', 'Cross-functional rotation', 'Early ownership and accountability', 'Mentoring and coached practice', 'International exposure', 'Real business projects', 'Other'];
const FUNCTION_REASONS = ['Relevant internship or project evidence', 'Relevant skills or coursework', 'Repeated success in similar tasks', 'I enjoy the core responsibilities', 'The work matches my strongest contribution style', 'I am still building direct evidence'];
const PROBLEM_APPROACH_OPTIONS = ['Numbers & data', 'Talking to people', 'Frameworks & structure', 'Creative experimentation'];
const ENERGIZING_WORK_OPTIONS = ['Building systems & processes', 'Influencing & persuading', 'Analyzing & interpreting data', 'Creating & storytelling'];
const CONTRIBUTION_STYLE_OPTIONS = ['Optimizing performance and measurable ROI', 'Shaping ideas and customer experiences', 'Running rapid channel and funnel experiments', 'Coordinating people to execute reliably', 'Negotiating and building long-term partnerships', 'Managing risk and protecting reliable processes', 'Coaching and facilitating other people’s growth'];
const PRIORITIES = ['Learning opportunities', 'Career progression', 'Company culture', 'Compensation & international exposure'];
const COMPANY_REASON_GROUPS = [COMPANY_REASONS.slice(0, 4), COMPANY_REASONS.slice(4, 8), COMPANY_REASONS.slice(8)];
const PROGRAM_REASON_GROUPS = [PROGRAM_REASONS.slice(0, 4), PROGRAM_REASONS.slice(4, 8)];
const FUNCTION_REASON_GROUPS = [FUNCTION_REASONS.slice(0, 3), FUNCTION_REASONS.slice(3, 6)];
const CONTRIBUTION_STYLE_GROUPS = [CONTRIBUTION_STYLE_OPTIONS.slice(0, 4), CONTRIBUTION_STYLE_OPTIONS.slice(4, 7)];
const MOTIVATION_OPTION_LABELS: Record<string, string> = {
  'Culture matches how I work': 'Culture match',
  'Products or customers I understand': 'Familiar customers',
  'Learning environment fits my needs': 'Learning fit',
  'Leadership principles match my values': 'Leadership values',
  'International or cross-market exposure': 'Cross-market exposure',
  'Meaningful social or customer impact': 'Customer impact',
  'Performance expectations motivate me': 'High expectations',
  'Career progression fits my plan': 'Career growth',
  'Structured leadership development': 'Leadership development',
  'Deep functional specialization': 'Functional depth',
  'Cross-functional rotation': 'Cross-functional rotation',
  'Early ownership and accountability': 'Early ownership',
  'Mentoring and coached practice': 'Coaching',
  'International exposure': 'International exposure',
  'Real business projects': 'Real projects',
  'Relevant internship or project evidence': 'Internship or project',
  'Relevant skills or coursework': 'Skills or coursework',
  'Repeated success in similar tasks': 'Similar-task results',
  'I enjoy the core responsibilities': 'Enjoy the work',
  'The work matches my strongest contribution style': 'Matches my strengths',
  'I am still building direct evidence': 'Still building evidence',
  'No target-specific preparation yet': 'Not started yet',
  'Read official role and program information': 'Read official information',
  'Spoken with current or former participants': 'Spoke with participants',
  'Completed a target-relevant project, case, or course': 'Completed relevant practice',
  'Optimizing performance and measurable ROI': 'Improve measurable results',
  'Shaping ideas and customer experiences': 'Shape customer experiences',
  'Running rapid channel and funnel experiments': 'Run fast experiments',
  'Coordinating people to execute reliably': 'Coordinate execution',
  'Negotiating and building long-term partnerships': 'Build partnerships',
  'Managing risk and protecting reliable processes': 'Protect reliable processes',
  'Coaching and facilitating other people’s growth': 'Help people grow',
};

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

function parseFunctionList(value: unknown): string[] {
  const parsed = typeof value === 'string' ? parseJson(value) : value;
  return Array.from(new Set((Array.isArray(parsed) ? parsed : []).map((item) => String(item || '').trim()).filter(Boolean)));
}

function isInternRole(value: unknown): boolean {
  return /(?:\bintern(?:ship)?\b|\btrainee\b|thực\s*tập(?:\s*sinh)?|thuc\s*tap(?:\s*sinh)?)/iu.test(String(value || ''));
}

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

function normalizeExperienceDuration(raw: unknown): string {
  const value = String(raw || '').trim();
  if (!value) return '';
  const current = /(?:present|current(?:ly)?|now|ongoing|today|to date|till date|until now|hiện tại|hien tai|đến nay|den nay|nay)$/iu;
  if (!current.test(value)) return value;
  const start = value.replace(current, '').replace(/\s*(?:[-–—]|to|đến|den)\s*$/iu, '').trim();
  return start ? `${start} – Present` : 'Present';
}

function extractExperienceDuration(rawText: unknown, company: unknown, role: unknown, evidence: unknown): string {
  const source = String(rawText || '');
  const lower = source.toLowerCase();
  const positions = [company, role]
    .map((value) => String(value || '').trim().toLowerCase())
    .filter(Boolean)
    .map((value) => lower.indexOf(value))
    .filter((position) => position >= 0);
  const position = positions.length ? Math.min(...positions) : -1;
  const context = position >= 0 ? source.slice(Math.max(0, position - 180), position + 600) : '';
  const candidate = `${String(evidence || '')} ${context}`;
  const month = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
  const point = `(?:${month}\\s+\\d{4}|(?:Tháng|Thang)\\s*\\d{1,2}\\s*[,/]?\\s*\\d{4}|\\d{1,2}[/.]\\d{4}|\\b\\d{4}\\b)`;
  const current = '(?:Present|Current(?:ly)?|Now|Ongoing|Today|To date|Till date|Until now|Hiện tại|Hien tai|Đến nay|Den nay|Nay)';
  const match = candidate.match(new RegExp(`${point}\\s*(?:[-–—]|to|đến|den)\\s*(?:${point}|${current})`, 'iu'));
  return normalizeExperienceDuration(match?.[0] || '');
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
  const directExperiences = Array.isArray(value.experiences) ? value.experiences : [];
  const internships = Array.isArray(value.internship_history) ? value.internship_history : [];
  const experiences = [...directExperiences, ...internships].filter((item, index, all) => {
    const key = `${item?.company || item?.organization || ''}|${item?.role || ''}|${item?.duration || ''}|${item?.description || ''}`;
    return all.findIndex((candidate) => `${candidate?.company || candidate?.organization || ''}|${candidate?.role || ''}|${candidate?.duration || ''}|${candidate?.description || ''}` === key) === index;
  });
  const parsedEducation = Array.isArray(value.parsed_cv?.education)
    ? value.parsed_cv.education
    : value.parsed_cv?.education && typeof value.parsed_cv.education === 'object' ? [value.parsed_cv.education] : [];
  const rawEducation = Array.isArray(value.education) && value.education.length ? value.education : parsedEducation;
  const hasExplicitEducationCoursework = rawEducation.some((item: any) => item && typeof item === 'object' && Object.prototype.hasOwnProperty.call(item, 'coursework'));
  const education = rawEducation.length ? rawEducation.map((item: any, index: number) => typeof item === 'string'
    ? { institution: item, field: '', degree: '', graduationYear: '', gpa: '', coursework: index === 0 ? String(value.coursework || '') : '', source: 'extracted' as const }
    : { institution: String(item.institution || item.university || item.universityRaw || item.school || ''), field: normalizeMajorName(item.field || item.major || item.majorRaw || item.faculty || ''), degree: normalizeDegree(item.degree || item.degreeRaw || ''), graduationYear: String(item.graduationYear || item.graduation_year || ''), gpa: normalizeGpaBand(item.gpa || item.gpaBand || item.gpaRaw), coursework: String(Object.prototype.hasOwnProperty.call(item, 'coursework') ? item.coursework || '' : (Array.isArray(item.courses) ? item.courses.join(', ') : index === 0 ? value.coursework || '' : '')), universityTier: Number(item.universityTier ?? item.university_tier ?? item.tier) || undefined, source: item.source === 'user' ? 'user' as const : 'extracted' as const })
    : [value.university, value.faculty || value.major, value.degree, value.graduation_year, value.gpa, value.coursework].some(Boolean)
      ? [{ institution: String(value.university || ''), field: normalizeMajorName(value.faculty || value.major || ''), degree: normalizeDegree(value.degree || ''), graduationYear: String(value.graduation_year || ''), gpa: normalizeGpaBand(value.gpa), coursework: String(value.coursework || ''), universityTier: Number(value.university_tier) || undefined, source: 'extracted' as const }]
      : [];
  const legacyActivities = [...(Array.isArray(value.activities) ? value.activities : []), ...(Array.isArray(value.leadership) ? value.leadership : [])];
  const activitySource = Array.isArray(value.extracurricular_activities) ? value.extracurricular_activities : Array.isArray(value.parsed_cv?.extracurricular) ? value.parsed_cv.extracurricular : legacyActivities;
  const achievementSource = Array.isArray(value.honors_achievements) ? value.honors_achievements : Array.isArray(value.parsed_cv?.competitions) ? value.parsed_cv.competitions : Array.isArray(value.standout_points) ? value.standout_points : Array.isArray(value.awards) ? value.awards : [];
  return {
    ...EMPTY_PROFILE,
    ...value,
    name: String(value.name || ''),
    university: String(value.university || education[0]?.institution || ''),
    university_tier: education[0]?.universityTier || Number(value.university_tier) || undefined,
    faculty: normalizeMajorName(value.faculty || value.major || education[0]?.field || ''),
    graduation_year: String(value.graduation_year || education[0]?.graduationYear || ''),
    gpa: normalizeGpaBand(value.gpa || value.parsed_cv?.education?.gpaBand || value.parsed_cv?.education?.gpa || education[0]?.gpa),
    coursework: mergeEducationCoursework(education) || (hasExplicitEducationCoursework ? '' : String(value.coursework || '')),
    education,
    experiences: experiences.map((item: any) => {
      const company = String(item.company || item.organization || '');
      const role = String(item.role || '');
      const parsedExperience = Array.isArray(value.parsed_cv?.experience) ? value.parsed_cv.experience.find((candidate: any) => String(candidate?.company || '') === company && String(candidate?.role || '') === role) : null;
      const duration = normalizeExperienceDuration(item.duration || parsedExperience?.duration) || extractExperienceDuration(value.raw_cv_text || value.parsed_cv?.raw_cv_text, company, role, item.evidenceText || parsedExperience?.evidenceText);
      return { company, role, duration, description: formatExperienceDescription(item.description), sector: String(item.sector || ''), sectorSource: item.sectorSource || item.sector_source || (item.sector ? 'extracted' : undefined), source: item.source === 'user' ? 'user' : 'extracted' };
    }),
    extracurricular_activities: activitySource.map((item: any) => typeof item === 'string'
      ? { organization: item, role: '', duration: '', description: '', source: 'extracted' as const }
      : { organization: String(item.organization || item.club || item.company || ''), role: String(item.role || ''), duration: normalizeExperienceDuration(item.duration), description: formatExperienceDescription(item.description || item.evidenceText || item.impact), source: item.source === 'user' ? 'user' as const : 'extracted' as const }),
    honors_achievements: achievementSource.map((item: any) => typeof item === 'string'
      ? { competition: item, title: '', time: '', description: '', source: 'extracted' as const }
      : { competition: String(item.competition || item.name || item.nameRaw || item.nameNormalized || ''), title: String(item.title || item.award || item.result || ''), time: String(item.time || item.date || ''), description: formatExperienceDescription(item.description || item.evidenceText || item.context), category: String(item.category || ''), sourceRowId: String(item.sourceRowId || ''), source: item.source === 'user' ? 'user' as const : 'extracted' as const }),
    skills: (Array.isArray(value.skills) ? value.skills : Array.isArray(value.parsed_cv?.rawSkills) ? value.parsed_cv.rawSkills : []).map((item: unknown) => String(item) === 'Advanced Excel' ? 'Excel' : String(item)).filter((item: string, index: number, all: string[]) => all.indexOf(item) === index),
    certifications: [...(Array.isArray(value.certifications) ? value.certifications : []), ...(Array.isArray(value.english_certificates) ? value.english_certificates : []), ...(Array.isArray(value.parsed_cv?.certifications) ? value.parsed_cv.certifications.map((item: any) => item?.name || item) : [])].map((item: unknown) => String(item) === 'MOS' ? 'MOS (PowerPoint, Word, Excel)' : String(item)).filter((item: string, index: number, all: string[]) => all.indexOf(item) === index),
    other_skills: String(value.other_skills || ''),
    other_skills_selected: value.other_skills_selected === true,
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
    functions: [],
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

const SUBROLE_PROFILES: Array<{ match: RegExp; roles: Array<{ name: string; tags: string[] }> }> = [
  { match: /marketing|brand|growth|communication/, roles: [
    { name: 'Performance Marketing / Growth Marketing', tags: ['analytical', 'roi', 'experiment'] },
    { name: 'Brand Marketing', tags: ['creative', 'consumer', 'storytelling'] },
    { name: 'User Acquisition / Digital', tags: ['channel', 'experiment', 'analytical'] },
    { name: 'Trade / Commercial Marketing', tags: ['relationship', 'execution', 'negotiation'] },
  ] },
  { match: /finance|accounting|investment|banking/, roles: [
    { name: 'FP&A', tags: ['analytical', 'structured', 'modelling'] },
    { name: 'Corporate Finance / M&A', tags: ['strategic', 'relationship', 'negotiation'] },
    { name: 'Treasury', tags: ['risk', 'process', 'structured'] },
  ] },
  { match: /supply|logistics|procurement|operations?/, roles: [
    { name: 'Planning', tags: ['analytical', 'systems', 'structured'] },
    { name: 'Logistics / Operations', tags: ['execution', 'process', 'coordination'] },
    { name: 'Procurement', tags: ['negotiation', 'relationship', 'risk'] },
  ] },
  { match: /human resources|\bhr\b|people|talent/, roles: [
    { name: 'Talent Acquisition', tags: ['people', 'relationship', 'persuasion'] },
    { name: 'Learning & Development', tags: ['people', 'creative', 'facilitation'] },
    { name: 'HR Business Partner', tags: ['relationship', 'strategic', 'structured'] },
  ] },
  { match: /sales|commercial|business development|account/, roles: [
    { name: 'Key Account Management', tags: ['relationship', 'negotiation', 'strategic'] },
    { name: 'Field Sales', tags: ['persuasion', 'execution', 'roi'] },
    { name: 'Commercial Excellence', tags: ['analytical', 'process', 'structured'] },
  ] },
  { match: /strategy|consult/, roles: [
    { name: 'Strategy & Planning', tags: ['analytical', 'structured', 'strategic'] },
    { name: 'Management Consulting', tags: ['structured', 'relationship', 'analytical'] },
    { name: 'Business Development', tags: ['persuasion', 'relationship', 'experiment'] },
  ] },
  { match: /product/, roles: [
    { name: 'Product Management', tags: ['consumer', 'structured', 'coordination'] },
    { name: 'Product Analytics', tags: ['analytical', 'roi', 'experiment'] },
    { name: 'Product Operations', tags: ['process', 'execution', 'systems'] },
  ] },
  { match: /manufacturing|production|quality/, roles: [
    { name: 'Process Engineering / Continuous Improvement', tags: ['systems', 'analytical', 'process'] },
    { name: 'Production / Plant Operations', tags: ['execution', 'coordination', 'process'] },
    { name: 'Quality Management', tags: ['risk', 'structured', 'analytical'] },
  ] },
  { match: /legal|compliance|governance|risk/, roles: [
    { name: 'Commercial Legal', tags: ['structured', 'negotiation', 'strategic'] },
    { name: 'Compliance & Governance', tags: ['risk', 'process', 'structured'] },
    { name: 'Risk Advisory', tags: ['risk', 'analytical', 'relationship'] },
  ] },
  { match: /customer experience|customer service|service/, roles: [
    { name: 'Customer Experience Strategy', tags: ['consumer', 'analytical', 'strategic'] },
    { name: 'Service Operations', tags: ['process', 'execution', 'coordination'] },
    { name: 'Customer Success', tags: ['people', 'relationship', 'persuasion'] },
  ] },
  { match: /technology|engineering|data|analytics|digital/, roles: [
    { name: 'Data Analytics', tags: ['analytical', 'structured', 'modelling'] },
    { name: 'Engineering / Technical Delivery', tags: ['systems', 'process', 'experiment'] },
    { name: 'Solutions / Implementation', tags: ['relationship', 'execution', 'coordination'] },
  ] },
];

const ANSWER_TRAITS: Record<string, string[]> = {
  'Numbers & data': ['analytical', 'modelling'],
  'Talking to people': ['people', 'relationship'],
  'Frameworks & structure': ['structured', 'strategic'],
  'Creative experimentation': ['creative', 'experiment'],
  'Building systems & processes': ['systems', 'process'],
  'Influencing & persuading': ['persuasion', 'relationship'],
  'Analyzing & interpreting data': ['analytical', 'risk'],
  'Creating & storytelling': ['creative', 'storytelling'],
  'Optimizing performance and measurable ROI': ['roi', 'analytical'],
  'Shaping ideas and customer experiences': ['consumer', 'creative'],
  'Running rapid channel and funnel experiments': ['channel', 'experiment'],
  'Coordinating people to execute reliably': ['coordination', 'execution'],
  'Negotiating and building long-term partnerships': ['negotiation', 'relationship'],
  'Managing risk and protecting reliable processes': ['risk', 'process'],
  'Coaching and facilitating other people’s growth': ['facilitation', 'people'],
};

function recommendSubroles(selectedFunction: string, motivation: Motivation): SubroleRecommendation | null {
  const evidence = [motivation.problemApproach, motivation.energizingWork, motivation.contributionStyle].filter(Boolean);
  if (evidence.length < 3) return null;
  const traits = Array.from(new Set(evidence.flatMap((answer) => ANSWER_TRAITS[answer] || [])));
  const profile = SUBROLE_PROFILES.find((entry) => entry.match.test(selectedFunction.toLowerCase()));
  const roles = profile?.roles || [
    { name: 'Analytical & Planning', tags: ['analytical', 'structured', 'strategic'] },
    { name: 'People & Partnership', tags: ['people', 'relationship', 'negotiation'] },
    { name: 'Operations & Delivery', tags: ['process', 'execution', 'coordination'] },
    { name: 'Creative & Innovation', tags: ['creative', 'consumer', 'experiment'] },
  ];
  const ranked = roles
    .map((role, index) => ({ ...role, index, score: role.tags.reduce((sum, tag) => sum + (traits.includes(tag) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  return { function: selectedFunction || 'your target path', subroles: ranked.slice(0, 2).map((role) => role.name), traits, evidence, version: 1 };
}

function legacyMotivation(motivation: Motivation, selectedFunction: string) {
  const companyText = motivation.companyReasons.join(' ').toLowerCase();
  return {
    job_priority: companyText.includes('compensation') ? 'High income' : companyText.includes('impact') ? 'Impact on people' : companyText.includes('culture') ? 'Stability & structure' : 'Learning & growth',
    work_preference: motivation.problemApproach || selectedFunction,
    strength: motivation.energizingWork || motivation.functionReasons[0] || selectedFunction,
    energizing_problem: motivation.contributionStyle || motivation.programReasons[0] || selectedFunction,
  };
}

function openApp(appId: string) {
  window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
}

function sourcePill(source: 'extracted' | 'user' = 'extracted') {
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${source === 'user' ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{source === 'user' ? 'Added by user' : 'Extracted'}</span>;
}

function recommendationsFromFit(fit: FitAnalysis | null): PreparationRecommendation[] {
  if (Array.isArray(fit?.roadmap_actions) && fit.roadmap_actions.length) {
    return fit.roadmap_actions.map((action: any, index: number) => ({
      id: String(action.id || `target-gap-${index + 1}`),
      category: action.category || 'CV & interview',
      gap: String(action.gap || 'Measured fit gap'),
      reason: String(action.reason || 'This action comes from a scored evidence gap.'),
      recommendedAction: String(action.recommendedAction || action.action || ''),
      timeline: String(action.timeline || 'Next preparation cycle'),
      impactPct: Number.isFinite(Number(action.impactPct)) ? Number(action.impactPct) : 0,
      impactOnProgram: String(action.impactOnProgram || fit?.top_programs?.[0]?.program || 'target program'),
      sourceRowId: String(action.sourceRowId || ''),
      priority: action.priority || (index === 0 ? 'Critical' : 'High'),
      casemateFunction: action.casemateFunction || 'My Roadmap',
      order: Number(action.order) || index + 1,
    }));
  }
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

// Returning-user results must come from the same assessment_results payload
// that powered the first result view. Newer rows store the engine response
// directly; older compatible rows may contain the cleaned camelCase shape.
function analysisFromSavedAssessmentResult(saved: any): FitAnalysis | null {
  const fit = saved?.analysis && typeof saved.analysis === 'object' ? saved.analysis : saved;
  if (!fit || typeof fit !== 'object') return null;
  if (
    fit.matching_ratio != null ||
    Array.isArray(fit.criteria) ||
    Array.isArray(fit.top_programs) ||
    Array.isArray(fit.roadmap_actions)
  ) return fit;
  if (fit.overallFit == null && !fit.topProgram && !Array.isArray(fit.topPrograms)) return null;
  const list = (value: unknown) => (Array.isArray(value) ? value : []);
  return {
    engine_version: fit.engineVersion || null,
    matching_ratio: fit.overallFit,
    band: fit.topProgram?.band || null,
    eligibility_status: fit.eligibilityStatus || null,
    cv_profile_fit_score: fit.profileExperienceFit,
    function_fit_score: fit.functionFit,
    motivation_fit_score: fit.motivationFit,
    work_style_fit_score: fit.workStyleFit,
    data_confidence: fit.dataConfidence || null,
    dimension_scores: fit.dimensionScores && typeof fit.dimensionScores === 'object' ? fit.dimensionScores : null,
    dimension_weights: fit.dimensionWeights || null,
    criteria: [],
    strengths: list(fit.strengths),
    gaps: list(fit.gaps),
    potential_concerns: list(fit.potentialConcerns),
    recommended_next_steps: list(fit.recommendedNextSteps),
    preparation_actions: list(fit.preparationActions),
    roadmap_actions: list(fit.roadmapActions),
    top_programs: list(fit.topPrograms),
    evidence_citations: list(fit.evidenceCitations),
    keyword_match: fit.keywordMatch || null,
    mbti_type: fit.mbtiType || null,
    restored_from_assessment_results: true,
  };
}

function ScoreCard({ label, value }: { label: string; value: unknown }) {
  const available = Number.isFinite(Number(value));
  return <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-[var(--space-text-muted)]">{label}</p><p className="mt-1 text-lg font-extrabold text-[var(--space-text-primary)]">{available ? `${Math.round(Number(value))}%` : 'Not available'}</p></div>;
}

function MultiChoice({ options, value, onChange, max = 3 }: { options: string[]; value: string[]; onChange: (next: string[]) => void; max?: number }) {
  return <div className="grid gap-2 sm:grid-cols-2">{options.map((option) => { const selected = value.includes(option); return <button key={option} type="button" aria-pressed={selected} onClick={() => onChange(selected ? value.filter((item) => item !== option) : value.length < max ? [...value, option] : value)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${selected ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}>{selected && <Check className="mr-1.5 inline h-4 w-4 text-[var(--space-text-brand)]" />}{MOTIVATION_OPTION_LABELS[option] || option}</button>; })}</div>;
}

function SingleChoice({ options, value, onChange }: { options: string[]; value: string; onChange: (next: string) => void }) {
  return <div className="grid gap-2 sm:grid-cols-2">{options.map((option) => <button key={option} type="button" aria-pressed={value === option} onClick={() => onChange(option)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${value === option ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}>{value === option && <Check className="mr-1.5 inline h-4 w-4 text-[var(--space-text-brand)]" />}{MOTIVATION_OPTION_LABELS[option] || option}</button>)}</div>;
}

type ReviewListKey = 'skills' | 'certifications' | 'languages' | 'quantified_impact';
function EditableListSection({ sectionKey, label, items, placeholder, onChange }: { sectionKey: ReviewListKey; label: string; items: string[]; placeholder: string; onChange: (items: string[]) => void }) {
  const addItem = () => {
    const index = items.length;
    onChange([...items, '']);
    window.setTimeout(() => document.getElementById(`cv-${sectionKey}-${index}`)?.focus(), 0);
  };
  return <section className="rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex items-center justify-between gap-3"><h4 className="font-extrabold">{label}</h4><button type="button" onClick={addItem} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>{items.length === 0 && <p className="mt-2 text-xs text-[var(--space-text-muted)]">No confirmed entries. Add one if relevant.</p>}<div className="mt-3 space-y-2">{items.map((item, index) => <div key={`${sectionKey}-${index}`} className="flex items-start gap-2"><textarea id={`cv-${sectionKey}-${index}`} rows={2} value={item} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? event.target.value : current))} placeholder={placeholder} className="min-w-0 flex-1 rounded-xl border border-[var(--space-border-default)] p-3 text-sm focus:border-[var(--space-brand-primary)] focus:outline-none" /><button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Delete ${label} entry ${index + 1}`} className="rounded-lg p-2 text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div>)}</div></section>;
}

export default function TargetFitOnboarding() {
  const { sessionId, visitorId, spaceId, trackEvent, userEmail } = useSpaceRuntime();
  const email = useMemo(() => userEmail || readSessionEmail(spaceId), [userEmail, spaceId, sessionId]);
  const userKey = useMemo(() => email ? `email:${email}` : `device:${visitorId || 'anonymous'}`, [email, visitorId]);
  const storageKey = `casemate-validation-v3:${sessionId || visitorId || 'preview'}`;
  const restoredRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastCvFileRef = useRef<File | null>(null);

  const [journey, setJourney] = useState<Journey>(null);
  const [stage, setStage] = useState(1);
  const [search, setSearch] = useState('');
  const [programSearchFocused, setProgramSearchFocused] = useState(false);
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
  const [cvEntryMode, setCvEntryMode] = useState<'upload' | 'saved' | 'manual' | null>(null);
  const [functionListStatus, setFunctionListStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
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
  const [referenceStatus, setReferenceStatus] = useState<ReferenceSeedStatus | null>(null);
  const referenceCheckedRef = useRef(false);
  const [hydrated, setHydrated] = useState(false);
  const [recoveryDismissed, setRecoveryDismissed] = useState(false);
  const [recoveryAttempt, setRecoveryAttempt] = useState(0);
  const [recovering, setRecovering] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') as SavedAssessment;
      if (saved.journey || saved.target || saved.fitAnalysis || saved.recoveryDismissed) return false;
    } catch {
      return false;
    }
    return !!readSessionEmail(spaceId);
  });
  const recoveryKeyRef = useRef<string | null>(null);
  const autosaveSequenceRef = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const previousStageRef = useRef(1);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const track = useCallback((name: string, properties: Record<string, unknown> = {}) => {
    void trackEvent(name, { journey: 'validation_first', ...properties });
  }, [trackEvent]);

  // The scoring engine only produces numbers it can trace to a reference-table
  // row, so the tables are checked (and seeded if empty) before the flow runs.
  useEffect(() => {
    if (referenceCheckedRef.current) return;
    referenceCheckedRef.current = true;
    void ensureReferenceData(sessionId)
      .then(setReferenceStatus)
      .catch(() => setReferenceStatus({
        ready: false,
        checkedAt: new Date().toISOString(),
        tables: [],
        blockingMissing: ['programs', 'fa_major_courses', 'fa_role_jd', 'fa_skills', 'fa_university_ranking'],
        degraded: [],
        error: 'Casemate could not verify its scoring reference data.',
      }));
  }, [sessionId]);

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
      if (saved.manualMode) setManualMode(true);
      if (saved.manualCompany) setManualCompany(saved.manualCompany);
      if (saved.manualProgram) setManualProgram(saved.manualProgram);
      if (saved.manualIndustry) setManualIndustry(saved.manualIndustry);
      if (saved.manualCycle) setManualCycle(saved.manualCycle);
      if (saved.profile) {
        const restoredProfile = normalizeProfile(saved.profile);
        setProfile(restoredProfile);
      }
      if (saved.originalProfile) {
        const restoredOriginal = normalizeProfile(saved.originalProfile);
        setOriginalProfile(restoredOriginal);
      }
      if (saved.cvReviewConfirmed) setCvReviewConfirmed(true);
      if (saved.cvFileName) setCvFileName(saved.cvFileName);
      if (saved.cvFileDate) setCvFileDate(saved.cvFileDate);
      if (saved.cvEntryMode) setCvEntryMode(saved.cvEntryMode);
      if (saved.motivation) setMotivation({ ...EMPTY_MOTIVATION, ...saved.motivation });
      if (saved.ocp) setOcp({ ...DEFAULT_OCP, ...saved.ocp });
      if (saved.mbtiAnswers) setMbtiAnswers(saved.mbtiAnswers);
      if (saved.mbtiType) setMbtiType(saved.mbtiType);
      if (saved.ocpResultReused) setOcpResultReused(true);
      if (saved.workingStyleResultReused) setWorkingStyleResultReused(true);
      if (saved.fitAnalysis) setFitAnalysis(saved.fitAnalysis);
      if (saved.assessmentResultId) setAssessmentResultId(saved.assessmentResultId);
      if (saved.userAddedEvidence) setUserAddedEvidence(saved.userAddedEvidence);
      if (saved.recoveryDismissed) setRecoveryDismissed(true);
    } catch { /* A corrupt draft never blocks a fresh assessment. */ }
    finally { setHydrated(true); }
  }, [storageKey]);

  // Gated on `hydrated` state rather than the ref above: the ref flips
  // synchronously inside the restore effect, so this effect would run in the
  // same commit and write the pre-restore defaults over the draft just read.
  useEffect(() => {
    if (!hydrated) return;
    const saved: SavedAssessment = { skillsInputVersion: 1, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, mbtiAnswers, mbtiType, ocpResultReused, workingStyleResultReused, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed };
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch { /* Current state remains usable. */ }
  }, [hydrated, storageKey, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, mbtiAnswers, mbtiType, ocpResultReused, workingStyleResultReused, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed]);

  const progressRef = useRef<SavedAssessment | null>(null);
  const autosaveTimerRef = useRef<number | null>(null);

  const persistProgress = useCallback(async (progress: SavedAssessment, sequence: number) => {
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
        body: JSON.stringify({ action: 'progress_autosave', flow: 'validation', progress }),
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
    if (!hydrated) return;
    setSaveStatus('idle');
    const progress: SavedAssessment = { skillsInputVersion: 1, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, mbtiAnswers, mbtiType, ocpResultReused, workingStyleResultReused, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed };
    progressRef.current = progress;
    if (!email || !sessionId || journey !== 'validation') return;
    const sequence = ++autosaveSequenceRef.current;
    const timer = window.setTimeout(() => { void persistProgress(progress, sequence); }, 1000);
    autosaveTimerRef.current = timer;
    return () => window.clearTimeout(timer);
  }, [persistProgress, hydrated, email, sessionId, journey, stage, target, selectedFunction, search, manualMode, manualCompany, manualProgram, manualIndustry, manualCycle, profile, originalProfile, cvReviewConfirmed, cvFileName, cvFileDate, cvEntryMode, motivation, ocp, mbtiAnswers, mbtiType, ocpResultReused, workingStyleResultReused, fitAnalysis, assessmentResultId, userAddedEvidence, recoveryDismissed]);

  useEffect(() => {
    if (previousStageRef.current === stage) return;
    previousStageRef.current = stage;
    const frame = window.requestAnimationFrame(() => {
      let node: HTMLElement | null = rootRef.current;
      while (node) {
        const overflowY = window.getComputedStyle(node).overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) node.scrollTop = 0;
        node = node.parentElement;
      }
      window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  // Signing out and back in issues a new workspace session id, which empties
  // the local draft above. The account's own work is still in WorkspaceDB keyed
  // by sign-in email, so read it back instead of dropping a returning candidate
  // onto an empty start screen. Read-only: nothing here writes or resets a row.
  useEffect(() => {
    if (!email) {
      if (sessionId) {
        console.warn('[Fit Assessment] The active workspace session exposes no sign-in email, so a saved assessment cannot be recovered for this account.');
      }
      setRecovering(false);
      return;
    }
    if (recoveryKeyRef.current === email) return;

    let draft: SavedAssessment = {};
    try {
      draft = JSON.parse(localStorage.getItem(storageKey) || '{}') as SavedAssessment;
    } catch {
      draft = {};
    }
    // Live progress in this session always wins over anything stored earlier.
    if (draft.journey || draft.target || draft.fitAnalysis || draft.recoveryDismissed) {
      recoveryKeyRef.current = email;
      setRecovering(false);
      return;
    }

    const db = (window as any).__workspaceDb;
    if (!db?.from) {
      if (recoveryAttempt < 6) {
        const retry = window.setTimeout(() => setRecoveryAttempt((count) => count + 1), 500);
        return () => window.clearTimeout(retry);
      }
      setRecovering(false);
      return;
    }

    recoveryKeyRef.current = email;
    let cancelled = false;
    setRecovering(true);
    // assessment_results is canonical for the result content. A matching
    // roadmap row is read only for target labels that are not duplicated in
    // older assessment payloads; it can never create a result by itself.
    void Promise.all([
      db.from('assessment_results', { shared: true }).eq('user_email', email).orderBy('id', 'desc').limit(5).get().catch(() => null),
      db.from('prep_roadmaps', { shared: true }).eq('user_key', `email:${email}`).orderBy('id', 'desc').limit(5).get().catch(() => null),
    ]).then(([assessmentResponse, roadmapResponse]) => {
      if (cancelled) return;
      const assessmentRows = rowsOf(assessmentResponse);
      const assessmentRow = assessmentRows.find((row) => !!parseJson(row?.result_json)) || null;
      if (!assessmentRow) return;
      const savedResult = parseJson(assessmentRow.result_json);

      // Function-first assessments own their full program-match result view in
      // ExplorationFlow, which recovers this same email-keyed row.
      if (Array.isArray(savedResult?.function_fit_scores) && savedResult.function_fit_scores.length) {
        setJourney('exploration');
        return;
      }

      const savedAnalysis = analysisFromSavedAssessmentResult(savedResult);
      if (!savedAnalysis) return;
      const savedSubroles = parseJson(assessmentRow.recommended_subroles);
      if (savedSubroles?.subroles?.length) savedAnalysis.recommended_subroles = savedSubroles;
      const resultReference = `assessment_results:${assessmentRow.id}`;
      const roadmapRow = rowsOf(roadmapResponse).find((row) => String(row?.fit_result_reference || '') === resultReference) || null;
      const context = savedResult?.validation_target || savedResult?.target_context || savedAnalysis?.validation_target || savedAnalysis?.target_context || {};
      const contextTarget = context.selectedTargetProgram || context.target || {};
      const topProgram = Array.isArray(savedAnalysis.top_programs) ? savedAnalysis.top_programs[0] || {} : {};
      const targetId = String(context.selectedTargetProgramId || contextTarget.id || contextTarget.program_id || roadmapRow?.target_program_id || topProgram.program_id || '');
      const targetProgram = String(contextTarget.program || context.program || roadmapRow?.target_program || topProgram.program || '');
      const targetCompany = String(contextTarget.company || context.company || roadmapRow?.target_company || topProgram.company || '');
      if (!targetProgram) return;
      const catalogTarget = PROGRAM_CATALOG.find((program) => program.id === targetId);
      setTarget(catalogTarget || {
        id: targetId || `saved-${assessmentRow.id}`,
        company: targetCompany,
        program: targetProgram,
        industry: String(contextTarget.industry || topProgram.industry || 'Not verified'),
        functions: [],
        recruitmentCycle: String(contextTarget.recruitmentCycle || roadmapRow?.recruitment_cycle || 'Not verified'),
        applicationStatus: String(contextTarget.applicationStatus || roadmapRow?.window_label || 'Status not available'),
        verifiedData: false,
      });
      setSelectedFunction(String(context.selectedFunction || roadmapRow?.target_function || savedResult?.topFunction || ''));
      setFitAnalysis(savedAnalysis);
      setAssessmentResultId(Number(assessmentRow.id));
      setJourney('validation');
      setStage(6);
    }).catch(() => undefined).finally(() => {
      if (!cancelled) setRecovering(false);
    });

    return () => { cancelled = true; };
  }, [email, sessionId, storageKey, recoveryAttempt]);

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
    const response = await fetch(`${url}?action=${action}`,  { method: 'POST', headers: { 'Content-Type': 'application/json', ...(sessionId ? { 'X-Session-Id': sessionId } : {}) }, body: JSON.stringify({ ...payload, user_key: userKey, email }) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) throw Object.assign(new Error(data.error || 'Casemate could not process this request.'), { code: data.code, status: response.status });
    return data;
  }, [sessionId, userKey, email]);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return PROGRAM_CATALOG.slice(0, 8);
    return PROGRAM_CATALOG.filter((program) => `${program.program} ${program.company} ${program.industry}`.toLowerCase().includes(query)).slice(0, 12);
  }, [search]);

  useEffect(() => {
    if (!target) { setFunctionListStatus('idle'); return; }
    if (!target.verifiedData || target.id.startsWith('manual-')) { setFunctionListStatus('loaded'); return; }
    const db = (window as any).__workspaceDb;
    if (!db?.from) { setFunctionListStatus('error'); return; }
    let cancelled = false;
    setFunctionListStatus('loading');
    void db.from('programs', { shared: true }).eq('program_id', target.id).limit(1).get()
      .then((response: any) => {
        if (cancelled) return;
        const row = rowsOf(response)[0];
        if (!row) throw new Error('Program row not found.');
        const functions = parseFunctionList(row.function_list);
        setTarget((current) => current?.id === target.id ? { ...current, functions } : current);
        setSelectedFunction((current) => functions.includes(current) ? current : '');
        setFunctionListStatus('loaded');
      })
      .catch(() => { if (!cancelled) setFunctionListStatus('error'); });
    return () => { cancelled = true; };
  }, [target?.id, target?.verifiedData]);

  const chooseTarget = (program: TargetProgram) => {
    setTarget({ ...program, functions: [] });
    setSelectedFunction('');
    setSearch('');
    setProgramSearchFocused(false);
    setFunctionListStatus(program.verifiedData ? 'loading' : 'loaded');
    setManualMode(false);
    track('target_program_selected', { program_id: program.id, company: program.company });
  };

  const continueManualTarget = () => {
    if (!manualCompany.trim() || !manualProgram.trim()) return;
    setTarget({ id: `manual-${Date.now()}`, company: manualCompany.trim(), program: manualProgram.trim(), industry: manualIndustry.trim() || 'Not verified', functions: [], recruitmentCycle: manualCycle.trim() || 'Not verified', applicationStatus: 'Program data not verified', verifiedData: false });
    setSearch('');
    setProgramSearchFocused(false);
    setFunctionListStatus('loaded');
    setManualMode(false);
  };

  const extractPdfText = async (file: File) => {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const loadingTask = getDocument({ data: bytes });
    try {
      const pdf = await loadingTask.promise;
      const pages: string[] = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const line = content.items.map((item: any) => String(item.str || '')).join(' ').replace(/\s+/g, ' ').trim();
        if (line) pages.push(line);
      }
      return pages.join('\n').trim();
    } finally {
      await loadingTask.destroy();
    }
  };

  const uploadPdfForServerParsing = async (file: File) => {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('workspaceId', WORKSPACE_ID);
    form.append('folder', 'cv-parser-temp');
    const appId = (window as any).__APP_ID__;
    const response = await fetch('/api/upload/file', {
      method: 'POST',
      headers: appId ? { 'X-App-Id': appId } : undefined,
      body: form,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false || !data.url) throw new Error(data.error || 'The PDF could not be uploaded for server parsing.');
    return { url: String(data.url), key: String(data.key || data.url) };
  };

  const deleteTemporaryCvUpload = async (key: string) => {
    if (!key) return;
    const appId = (window as any).__APP_ID__;
    const response = await fetch('/api/upload/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(appId ? { 'X-App-Id': appId } : {}) },
      body: JSON.stringify(/^https?:\/\//.test(key) ? { url: key } : { key }),
    });
    if (!response.ok) console.warn('[Fit Assessment] Temporary CV upload cleanup failed with status', response.status);
  };

  const parseCvFile = async (file: File) => {
    setError(''); setNotice(''); setParseFailure(false);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf || file.size === 0 || file.size > 10 * 1024 * 1024) {
      setParseFailure(true);
      setError("We couldn't read this CV accurately. Please upload another file or fill in the CV details manually.");
      track('cv_parse_failed', { reason: !isPdf ? 'unsupported_type' : file.size === 0 ? 'empty_file' : 'file_too_large' });
      return;
    }
    lastCvFileRef.current = file;
    setParsing(true); setParsePhase(0); track('cv_uploaded', { file_type: 'pdf', file_size_band: file.size > 5 * 1024 * 1024 ? '5-10mb' : 'under-5mb' }); track('cv_parse_started');
    const timer = window.setInterval(() => setParsePhase((current) => Math.min(3, current + 1)), 900);
    try {
      let normalized: CvProfile | null = null;
      try {
        const cvText = await extractPdfText(file);
        if (cvText.length < 40) throw new Error('The PDF does not contain readable text.');
        const data = await callHook(FIT_ENGINE_HOOK, 'parse_cv', { cv_text: cvText, assessment_session_id: sessionId });
        const candidate = normalizeProfile(data.profile);
        if (!profileHasContent(candidate)) throw new Error('The text parser returned no extractable profile data.');
        normalized = candidate;
      } catch (localError) {
        console.warn('[Fit Assessment] Browser PDF parsing failed; retrying with server document analysis.', localError);
        let temporaryUpload: { url: string; key: string } | null = null;
        try {
          temporaryUpload = await uploadPdfForServerParsing(file);
          const data = await callHook(STRUCTURED_FIT_HOOK, 'parse_cv', { document_url: temporaryUpload.url, assessment_session_id: sessionId });
          const candidate = normalizeProfile(data.profile);
          if (!profileHasContent(candidate)) throw new Error('The server document parser returned no extractable profile data.');
          normalized = candidate;
        } finally {
          if (temporaryUpload) await deleteTemporaryCvUpload(temporaryUpload.key).catch((cleanupError) => console.warn('[Fit Assessment] Temporary CV cleanup failed.', cleanupError));
        }
      }
      if (!normalized) throw new Error('No extractable profile data.');
      const reviewProfile = { ...normalized, education: normalized.education.length ? normalized.education : [{ institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'extracted' as const }] };
      await persistCvProfile(reviewProfile, 'parsed');
      setSavedCv({ profile: reviewProfile, date: new Date().toISOString() });
      setOriginalProfile(reviewProfile); setProfile(reviewProfile); setCvReviewConfirmed(false); setCvFileName(file.name); setCvFileDate(new Date().toISOString()); setCvEntryMode('upload');
    } catch (parseError) {
      console.error('[Fit Assessment] Both PDF parsing paths failed.', parseError);
      setParseFailure(true);
      setError("We couldn't read this CV accurately. Please upload another file or fill in the CV details manually.");
      track('cv_parse_failed', { reason: 'local_and_server_parser_failure' });
    } finally {
      window.clearInterval(timer); setParsing(false);
    }
  };

  const useSavedCv = () => {
    if (!savedCv) return;
    setProfile(savedCv.profile); setOriginalProfile(savedCv.profile); setCvReviewConfirmed(false); setCvFileName('Latest saved CV profile'); setCvFileDate(savedCv.date); setCvEntryMode('saved'); setParseFailure(false); setError('');
    track('saved_cv_reused');
  };

  useEffect(() => {
    if (!savedCv || stage !== 2 || profileHasContent(profile) || cvEntryMode) return;
    setProfile(savedCv.profile); setOriginalProfile(savedCv.profile); setCvReviewConfirmed(false); setCvFileName('Latest saved CV profile'); setCvFileDate(savedCv.date); setCvEntryMode('saved');
  }, [savedCv, stage]);

  const confirmCvProfile = async () => {
    setError('');
    try {
      await persistCvProfile(profile, 'confirmed');
      setSavedCv({ profile, date: new Date().toISOString() });
      setCvReviewConfirmed(true);
      track('cv_review_completed', { corrected: JSON.stringify(profile) !== JSON.stringify(originalProfile) });
      setStage(3);
      track('motivation_assessment_started');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Mate could not save your confirmed CV.');
    }
  };

  const startManualCv = () => {
    const manualProfile: CvProfile = { ...EMPTY_PROFILE, education: [{ institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'user' }] };
    setProfile(manualProfile); setOriginalProfile(manualProfile); setCvReviewConfirmed(false); setCvFileName('Manual CV entry'); setCvFileDate(new Date().toISOString()); setCvEntryMode('manual'); setParseFailure(false); setError('');
    track('manual_cv_started');
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

  const hasFunctionTracks = !!target?.functions.length;
  const functionSelectionReady = !!target && functionListStatus === 'loaded' && (!hasFunctionTracks || !!selectedFunction);
  const motivationComplete = !!(motivation.companyReasons.length && motivation.programReasons.length && (!hasFunctionTracks || motivation.functionReasons.length) && motivation.familiarity && motivation.problemApproach && motivation.energizingWork && motivation.contributionStyle && motivation.rotation && motivation.relocation && motivation.travel && motivation.priorityRanking.length === 3);

  const runAssessment = async () => {
    if (!target || !functionSelectionReady || !cvReviewConfirmed || !motivationComplete) return;
    if (referenceStatus && !referenceStatus.ready) {
      setError('Casemate\u2019s scoring reference data is unavailable, so no evidence-backed score can be produced right now. Please reopen Fit Assessment in a moment.');
      return;
    }
    setBusy(true); setError(''); setFitPending(false);
    try {
      const finalAnswers = Object.keys(mbtiAnswers).length === 20 ? mbtiAnswers : /^[EI][SN][TF][JP]$/.test(mbtiType) ? answersForType(mbtiType) : {};
      if (Object.keys(finalAnswers).length !== 20) throw new Error('Complete or select your Personality & Working Style result first.');
      const scored = scoreMbti(finalAnswers);
      const recommendedSubroles = recommendSubroles(selectedFunction, motivation);
      const diagnosticMotivation = { ...motivation, commitment: 'Primary target', roleUnderstanding: '', longTerm: '' };
      const calculated = await callHook(FIT_ENGINE_HOOK, 'calculate', {
        cv_profile: {
          ...profile,
          university_tier: profile.education[0]?.universityTier || profile.university_tier,
          education: profile.education.map((education) => ({ ...education, university_tier: education.universityTier, tier: education.universityTier })),
        },
        selected_certifications: profile.certifications,
        other_skills: profile.other_skills_selected ? profile.other_skills : '',
        motivation_answers: diagnosticMotivation,
        ocp_scores: ocp,
        mbti_answers: finalAnswers,
        mbti_type: mbtiType || scored.type,
        mbti_counts: scored.counts,
        assessment_session_id: `validation_${Date.now()}`,
        target_context: { selectedTargetProgramId: target.id, selectedTargetProgram: target, selectedCompany: target.company, selectedFunction, recruitmentCycle: target.recruitmentCycle, activeTargetStatus: 'assessing', cvReviewConfirmed, motivationAssessmentResponses: diagnosticMotivation, recommendedSubroles, ocpResultReused, workingStyleResultReused, userAddedEvidence },
      });
      const resultId = Number(calculated.assessment_result_id);
      const analysis = calculated.analysis || null;
      if (Number.isFinite(resultId) && resultId > 0 && recommendedSubroles) {
        const db = (window as any).__workspaceDb;
        if (!db?.from) throw new Error('Mate could not save your sub-role recommendation. Please try again.');
        await db.from('assessment_results').update(resultId, { recommended_subroles: recommendedSubroles });
      }
      const enrichedAnalysis = analysis ? { ...analysis, recommended_subroles: recommendedSubroles } : null;
      setAssessmentResultId(Number.isFinite(resultId) && resultId > 0 ? resultId : null);
      setFitAnalysis(enrichedAnalysis);
      setFitPending(!analysis);
      setStage(5);
      track('target_fit_viewed', { program_id: target.id, result_available: !!analysis });
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
        strengths: fitAnalysis?.strengths || [], gaps: fitAnalysis?.gaps || [], potentialConcerns: fitAnalysis?.potential_concerns || [], recommendedNextSteps: fitAnalysis?.recommended_next_steps || [], preparationActions: fitAnalysis?.preparation_actions || [], evidenceFound: fitAnalysis?.evidence_found || [], missingEvidence: fitAnalysis?.missing_evidence || [],
      };
      // Engine output for My Roadmap (2H). Additive only — My Roadmap renders
      // the same fields it always did and simply carries these through.
      const engineFit = {
        ...cleanFit,
        engineVersion: fitAnalysis?.engine_version || null,
        topProgram: fitAnalysis ? {
          company: target.company,
          program: target.program,
          matchPercent: cleanFit.overallFit,
          band: fitAnalysis.band || null,
        } : null,
        topPrograms: fitAnalysis?.top_programs || [],
        roadmapActions: fitAnalysis?.roadmap_actions || [],
        topFunction: selectedFunction || null,
        recommendedSubroles: fitAnalysis?.recommended_subroles || recommendSubroles(selectedFunction, motivation),
        dimensionScores: fitAnalysis?.dimension_scores || null,
        dimensionWeights: fitAnalysis?.dimension_weights || null,
        gapList: fitAnalysis?.dimension_scores
          ? Object.entries(fitAnalysis.dimension_scores as Record<string, number>)
              .filter(([, score]) => Number(score) < 60)
              .map(([dimension, score]) => ({ dimension, score: Number(score), gap: 60 - Number(score) }))
              .sort((a, b) => b.gap - a.gap)
          : [],
        evidenceCitations: (fitAnalysis?.evidence_citations || []).slice(0, 3),
        keywordMatch: fitAnalysis?.keyword_match || null,
        mbtiType: fitAnalysis?.mbti_type || mbtiType || null,
        engineFlags: fitAnalysis?.engine_flags || [],
        referenceDegraded: fitAnalysis?.reference_degraded || [],
      };
      await generateAndSaveRoadmap({ targetProgram: target.program, targetCompany: target.company, targetProgramId: target.id, targetFunction: selectedFunction, recruitmentCycle: target.recruitmentCycle, activeTargetStatus: 'active', fitResultReference: assessmentResultId ? `assessment_results:${assessmentResultId}` : null, targetFit: engineFit, preparationRecommendations: recommendations, roadmapTaskStatus: Object.fromEntries(recommendations.map((item) => [item.id, 'pending'])), matchPercent: cleanFit.overallFit, sessionId, accountEmail: email });
      try { localStorage.setItem(`casemate-roadmap-target:${sessionId || 'preview'}`, JSON.stringify({ program: target.program, company: target.company, programId: target.id, function: selectedFunction, matchPercent: cleanFit.overallFit })); } catch { /* Roadmap is already persisted. */ }
      setStage(6); track('target_confirmed', { program_id: target.id, function: selectedFunction }); track('preparation_plan_generated', { program_id: target.id, recommendation_count: recommendations.length }); track('roadmap_opened', { source: 'validation_first' }); openApp('my-roadmap');
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'The preparation plan could not be generated.'); }
    finally { setBusy(false); }
  };

  const changeTarget = () => {
    setTarget(null); setSelectedFunction(''); setSearch(''); setFunctionListStatus('idle'); setFitAnalysis(null); setFitPending(false); setAssessmentResultId(null); setStage(1); setJourney('validation');
  };

  // A mis-tapped branch has to be undone, not just hidden: the selector reopens
  // with neither option pre-selected and nothing entered in the wrong flow.
  const returnToSelector = () => {
    setJourney(null); setStage(1); setTarget(null); setSelectedFunction(''); setSearch(''); setFunctionListStatus('idle');
    setManualMode(false); setManualCompany(''); setManualProgram(''); setManualIndustry(''); setManualCycle('');
    setFitAnalysis(null); setFitPending(false); setAssessmentResultId(null); setError(''); setNotice('');
    // Leaving a recovered result is deliberate, so stop pulling it back in.
    recoveryKeyRef.current = email;
    setRecovering(false);
    setRecoveryDismissed(true);
    track('flow_selector_reopened');
  };

  // Precondition gate: a blocking reference table is empty, so nothing the
  // engine returned could be traced to real data. Say so instead of rendering
  // a flow that would end in an unexplainable score.
  if (referenceStatus && !referenceStatus.ready) {
    return (
      <div className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11">
        <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6">
          <div className="rounded-3xl border border-[color-mix(in_srgb,var(--space-semantic-warning)_40%,transparent)] bg-[var(--space-surface-card)] p-6 sm:p-8">
            <AlertTriangle className="h-8 w-8 text-[var(--space-semantic-warning)]" />
            <h1 className="mt-3 text-xl font-extrabold">Fit Assessment is temporarily unavailable</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">
              Casemate scores every result against its reference data, and part of that data could not be loaded just now.
              Rather than show you a number we cannot explain, the assessment is paused.
            </p>
            <p className="mt-3 text-xs font-semibold text-[var(--space-text-muted)]">
              Waiting on: {describeTables(referenceStatus.blockingMissing)}
            </p>
            {referenceStatus.error && <p className="mt-1 text-xs text-[var(--space-text-muted)]">{referenceStatus.error}</p>}
            <button
              type="button"
              onClick={() => { referenceCheckedRef.current = false; setReferenceStatus(null); void ensureReferenceData(sessionId).then(setReferenceStatus); }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3"
            >
              <RefreshCw className="h-4 w-4" />Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recovering) {
    return (
      <div className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)]">
        <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6">
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center sm:p-8">
            <Loader2 className="mx-auto h-7 w-7 animate-spin text-[var(--space-text-brand)]" />
            <h1 className="mt-3 text-lg font-extrabold">Restoring your saved assessment…</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">Checking your Casemate account for a target and fit result you already completed.</p>
          </div>
        </div>
      </div>
    );
  }

  if (journey === 'exploration') return <ExplorationFlow onBackToSelector={returnToSelector} />;

  const rankingChoice = (index: number, value: string) => setMotivation((current) => {
    const next = current.priorityRanking.slice(); next[index] = value;
    return { ...current, priorityRanking: next.filter(Boolean) };
  });
  const subroleRecommendation = recommendSubroles(selectedFunction, motivation);
  const displayedSubroleRecommendation = fitAnalysis?.recommended_subroles || subroleRecommendation;
  const currentMbti = MBTI_ITEMS[Math.min(mbtiIndex, MBTI_ITEMS.length - 1)];
  const foundPrior = false; // Questionnaire state is session-bound; never reuse a previous session's answers.
  const resultCriteria = fitAnalysis?.criteria || [];
  const strengths = resultCriteria.filter((criterion: any) => criterion.status === 'met').slice(0, 3);
  const gaps = resultCriteria.filter((criterion: any) => criterion.status === 'not_met').slice(0, 4);
  const cleanResultText = (value: unknown) => String(value || '')
    .replace(/\s*\[[^\]]+\]/g, '')
    .replace(/\b(?:fa_[a-z_]+|questionnaire|cv):[^\s|]+/gi, '')
    .replace(/\s*\|\s*/g, '; ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;])/g, '$1')
    .trim();
  const criterionCopy = (criterion: any) => {
    const key = String(criterion?.id || criterion?.label_en || '').toLowerCase().replace(/[^a-z]+/g, '_');
    const targetName = target?.program || 'your target program';
    const targetFunction = selectedFunction || 'your target function';
    const education = profile.education[0];
    const experienceNames = profile.experiences.slice(0, 2).map((item) => [item.role, item.company].filter(Boolean).join(' at ')).filter(Boolean);
    const activityNames = profile.extracurricular_activities.slice(0, 2).map((item) => [item.role, item.organization].filter(Boolean).join(' at ')).filter(Boolean);
    const achievementNames = profile.honors_achievements.slice(0, 2).map((item) => [item.title, item.competition].filter(Boolean).join(' in ')).filter(Boolean);
    const courseNames = profile.education.reduce<string[]>((all, item) => all.concat(String(item.coursework || '').split(/[,\n]+/).map((course) => course.trim()).filter(Boolean)), []).slice(0, 3);
    const workPreferences = OCP_ITEMS.slice().sort((a, b) => Number(ocp[b[0]]) - Number(ocp[a[0]])).slice(0, 2).map((item) => item[1].toLowerCase());
    const met = criterion?.status === 'met';
    if (key.includes('professional')) {
      const showcased = experienceNames.length ? experienceNames.join(' and ') : courseNames.length ? `coursework in ${courseNames.join(', ')}` : 'your current academic and project background';
      return { label: 'Professional Evidence', summary: `You showcased ${showcased}. Mate sees this as ${met ? `relevant evidence for ${targetFunction}` : `a useful starting point, although the link to ${targetFunction} could be more direct`}.`, impact: met ? `This makes your fit for ${targetName} easier to understand.` : `This is not a rejection — Mate simply needs a clearer example of you applying ${targetFunction} skills.`, next: met ? 'Mate recommends keeping these examples specific and measurable.' : `Mate recommends adding one concrete ${targetFunction} internship, project, certification, or skill example with a measurable outcome.` };
    }
    if (key.includes('motivation')) {
      const direction = motivation.functionReasons[0] || motivation.programReasons[0] || motivation.companyReasons[0] || 'your evidence for this direction';
      return { label: 'Motivation', summary: `You shared ${direction.toLowerCase()}. Mate sees ${met ? 'a clear connection between your goals and this target' : 'interest in this path, but your reasons can become more specific to the role and company'}.`, impact: met ? `Your answers support a credible reason for pursuing ${targetName}.` : `A more specific why-this-role story would make your fit feel more intentional.`, next: met ? 'Mate recommends keeping one personal example ready for interviews.' : `Mate recommends naming one responsibility you want to own, one reason this company matters to you, and one experience that proves the connection.` };
    }
    if (key.includes('work_style')) {
      return { label: 'Work Style', summary: `Your answers showcased a preference for ${workPreferences.join(' and ')}. Mate sees this as ${met ? 'a strong match with the working environment behind this target' : 'partly aligned, with a few areas worth testing through real projects'}.`, impact: met ? `This supports how comfortably you may operate in ${targetFunction}.` : 'Work-style fit is a preference signal, not a pass-or-fail decision.', next: met ? 'Mate recommends using examples that show how you work with others and deliver results.' : 'Mate recommends testing this environment through a team project, internship, or informational interview.' };
    }
    if (key.includes('cognitive')) {
      const academic = [education?.institution, education?.gpa].filter(Boolean).join(' with ');
      return { label: 'Academic Foundation', summary: `You showcased ${academic || 'an academic foundation that Mate could assess'}${courseNames.length ? `, supported by ${courseNames.join(', ')}` : ''}. Mate sees ${met ? 'solid learning evidence for this target' : 'room to strengthen the academic or analytical proof in your profile'}.`, impact: met ? `This supports your readiness to learn and handle structured problem solving in ${targetName}.` : 'One stronger analytical example would make this dimension easier to validate.', next: met ? 'Mate recommends connecting your academic results to a real decision, project, or business problem.' : 'Mate recommends adding a project, case, test result, or quantified academic achievement that demonstrates analytical thinking.' };
    }
    if (key.includes('leadership')) {
      const showcased = activityNames.concat(achievementNames).join(' and ') || 'your extracurricular and achievement record';
      return { label: 'Leadership', summary: `You showcased ${showcased}. Mate sees ${met ? 'clear evidence that you take initiative, whether by leading a team or by actively joining activities and competitions' : 'promising initiative that would benefit from a clearer outcome or scope'}.`, impact: met ? `This supports the ownership expected in ${targetName}.` : 'The experience is valuable; Mate just needs a more concrete result to understand its full strength.', next: met ? 'Mate recommends leading with the action you took and the result you achieved.' : 'Mate recommends adding what you personally did, the decision or task you owned, and one measurable result such as an award, ranking, or team outcome.' };
    }
    if (key.includes('mbti')) {
      const type = mbtiType || fitAnalysis?.mbti_type || 'personality';
      return { label: 'Personality & Working Style', summary: `Your ${type} responses showcased a working style that Mate uses as supporting context. Mate sees this as ${met ? 'compatible with the target environment' : 'an area to explore rather than a limitation'}.`, impact: 'Personality never decides your suitability on its own; it is only a small context signal.', next: 'Mate recommends focusing on demonstrated behaviors and results rather than the personality label itself.' };
    }
    const fallback = cleanResultText(criterion?.evidence);
    return { label: cleanResultText(criterion?.label_en || criterion?.label_vi || 'Fit evidence'), summary: fallback ? `You showcased ${fallback.charAt(0).toLowerCase()}${fallback.slice(1)}.` : 'Mate reviewed this area but did not find a clear example in your confirmed profile.', impact: met ? 'This evidence supports your target fit.' : 'A clearer example would make your fit easier to understand.', next: cleanResultText(criterion?.improvement_tip) || 'Mate recommends adding one specific, measurable example.' };
  };
  const friendlyConcern = (value: unknown) => {
    const cleaned = cleanResultText(value).replace(/^Missing evidence for\s+/i, 'clear evidence of ');
    return cleaned ? `Mate noticed that your profile does not yet show ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}.` : 'Mate noticed an area where one more concrete example would strengthen your profile.';
  };
  const parseLabels = ['Reading your CV', 'Structuring your experience', 'Identifying target-relevant evidence', 'Preparing your profile for review'];
  const cvFormVisible = profileHasContent(profile) || cvEntryMode === 'manual';
  const isSearchingToSwap = !!target && !!search.trim();
  const missingAfterUpload = (value: unknown) => cvEntryMode === 'upload' && !String(value || '').trim();
  const missingInputClass = 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))]';

  return (
    <div ref={rootRef} className="min-h-full bg-[var(--space-surface-page)] text-[var(--space-text-primary)] [&_button]:min-h-11">
      <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-7">
        <div className="h-6" aria-hidden="true" />
        <SaveProgressButton status={saveStatus} onSave={saveNow} />
        {!(journey === 'validation' && stage === 2) && <header className="mb-5">
          <FitBrandTag />
          <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-3xl">Validate your target before you prepare</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--space-text-secondary)]">See how your confirmed profile fits one MT or consulting target, where evidence is missing, and what to do next.</p>
        </header>}

        {journey === 'validation' && stage !== 2 && <FitStepIndicator steps={STAGES} current={stage} />}

        {notice && <div className="mb-4 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-success-500)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-success-500)_9%,transparent)] p-3 text-sm text-[var(--space-text-primary)]">{notice}</div>}
        {error && <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-[color-mix(in_srgb,var(--space-semantic-danger)_35%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_8%,transparent)] p-3 text-sm font-semibold text-[var(--space-semantic-danger)]"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}

        {(journey === null || (journey === 'validation' && stage === 1)) && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <h2 className="text-lg font-extrabold sm:text-xl">Do you already have a specific MT program in mind?</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <button type="button" onClick={() => { setJourney('validation'); setStage(1); track('validation_started'); track('target_status_selected', { has_target: true }); }} className={`rounded-2xl border p-5 text-left ${journey === 'validation' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)] hover:border-[var(--space-brand-primary-500)]'}`}><p className="font-extrabold">Yes, I have a target</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Compare your current profile with one selected program and function.</p></button>
            <button type="button" onClick={() => { setJourney('exploration'); track('target_status_selected', { has_target: false }); }} className="rounded-2xl border border-[var(--space-border-default)] p-5 text-left hover:border-[var(--space-brand-primary-500)]"><p className="font-extrabold">Not yet, help me explore</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">Continue to the existing function-first Exploration flow.</p></button>
          </div>

          {journey === 'validation' && <div className="mt-7 border-t border-[var(--space-border-default)] pt-6">
            <button type="button" onClick={returnToSelector} className="mb-4 flex w-fit items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Go Back</button>
            <label className="text-sm font-bold">Search Target Program<div className="relative mt-2"><Search className="absolute left-3 top-3.5 h-4 w-4 text-[var(--space-text-muted)]" /><input value={search} onFocus={() => setProgramSearchFocused(true)} onBlur={() => window.setTimeout(() => setProgramSearchFocused(false), 150)} onChange={(event) => { setSearch(event.target.value); track('target_program_searched', { query_length: event.target.value.length }); }} placeholder="Search by program or company" className="w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-page-alt)] py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--space-brand-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--space-brand-primary-500)_20%,transparent)]" /></div></label>
            {(!target || isSearchingToSwap) && !manualMode && <div className="mt-3 max-h-[28rem] space-y-2 overflow-y-auto pr-1">{searchResults.map((program) => <button key={program.id} type="button" onClick={() => chooseTarget(program)} className="w-full rounded-2xl border border-[var(--space-border-default)] p-4 text-left hover:border-[var(--space-brand-primary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--space-brand-primary-200)]"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="text-xs font-bold text-[var(--space-text-muted)]">{program.company}</p><p className="mt-0.5 font-extrabold">{program.program}</p></div><span className="rounded-full bg-[var(--space-surface-muted)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-secondary)]">{program.applicationStatus}</span></div><p className="mt-2 text-xs text-[var(--space-text-secondary)]">{program.industry} · Recruitment cycle: {program.recruitmentCycle}</p></button>)}</div>}
            {(!target || isSearchingToSwap) && search.trim() && searchResults.length === 0 && !manualMode && <div className="mt-4 rounded-2xl bg-[var(--space-surface-muted)] p-4"><p className="font-bold">Can't find your target program?</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => { setNotice('Your program request has been recorded for review.'); track('manual_program_requested', { search_query: search.trim() }); }} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Request This Program</button><button type="button" onClick={() => setManualMode(true)} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Enter Program Manually</button><button type="button" onClick={() => setSearch('')} className="rounded-xl px-3 py-2 text-xs font-bold text-[var(--space-text-muted)]">Return to Search</button></div></div>}
            {manualMode && <div className="mt-4 rounded-2xl border border-[var(--space-border-default)] p-4"><p className="font-extrabold">Enter Program Manually</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{[['Company', manualCompany, setManualCompany], ['Program', manualProgram, setManualProgram], ['Industry', manualIndustry, setManualIndustry], ['Recruitment cycle', manualCycle, setManualCycle]].map(([label, value, setter]: any) => <label key={label} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={value} onChange={(event) => setter(event.target.value)} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm" /></label>)}</div><p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_10%,transparent)] p-3 text-xs leading-5 text-[var(--space-text-secondary)]">Casemate can provide a general function-level assessment, but program-specific fit may be limited until this program is added to our database.</p><button type="button" onClick={continueManualTarget} disabled={!manualCompany.trim() || !manualProgram.trim()} className="mt-3 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Use Manual Program</button></div>}
            {target && !isSearchingToSwap && <div className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold text-[var(--space-text-muted)]">{target.company} · {target.industry}</p><h3 className="mt-1 text-lg font-extrabold">{target.program}</h3><p className="mt-1 text-xs text-[var(--space-text-secondary)]">Recruitment cycle: {target.recruitmentCycle} · {target.applicationStatus}</p></div><button type="button" onClick={() => { setTarget(null); setSelectedFunction(''); setFunctionListStatus('idle'); }} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Choose Another Program</button></div>{functionListStatus === 'loading' && <p className="mt-4 text-xs font-semibold text-[var(--space-text-muted)]">Loading function tracks…</p>}{functionListStatus === 'error' && <p className="mt-4 text-xs font-semibold text-[var(--space-semantic-danger)]">Function tracks could not be loaded. Choose the program again to retry.</p>}{functionListStatus === 'loaded' && target.functions.length > 0 && <label className="mt-4 block text-sm font-bold">Target function / track<select value={selectedFunction} onChange={(event) => { setSelectedFunction(event.target.value); track('target_function_selected', { function: event.target.value, program_id: target.id }); }} className="mt-2 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-3 text-sm outline-none focus:border-[var(--space-brand-primary)]"><option value="">Select a function or track</option>{target.functions.map((fn) => <option key={fn} value={fn}>{fn}</option>)}</select></label>}{functionListStatus === 'loaded' && target.functions.length === 0 && <p className="mt-4 text-xs font-semibold text-[var(--space-text-muted)]">No specific function track for this program.</p>}{!target.verifiedData && <button type="button" onClick={continueManualTarget} className="sr-only">Continue manual target</button>}</div>}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end"><button type="button" disabled={!functionSelectionReady} onClick={() => setStage(2)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Continue with This Target <ArrowRight className="h-4 w-4" /></button></div>
          </div>}
        </section>}

        {journey === 'validation' && stage === 2 && <section className={`${cvFormVisible ? 'mx-auto max-w-5xl rounded-3xl sm:p-7' : 'rounded-3xl sm:p-7'} border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 [&_input]:font-normal [&_select]:font-normal [&_textarea]:font-normal`}>
          {!cvFormVisible && <CvSubmitStep variant="validation" parsing={parsing} parsePhase={parsePhase} parseLabels={parseLabels} hasSavedCv={!!savedCv} savedCvDate={savedCv?.date} parseFailure={parseFailure} onFile={(file) => void parseCvFile(file)} onUseSaved={useSavedCv} onManual={startManualCv} onRetry={() => { const file = lastCvFileRef.current; if (!file) return false; void parseCvFile(file); return true; }} onBack={() => { setError(''); setParseFailure(false); setStage(1); }} />}
          {cvFormVisible && <div><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Stage 1 · CV confirmation</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Review what Mate found</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Correct anything that is incomplete. Your CV is evidence, not a gate — no experience is okay.</p></div><button type="button" onClick={() => { setProfile(EMPTY_PROFILE); setOriginalProfile(null); setCvReviewConfirmed(false); setCvEntryMode(null); }} className="shrink-0 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">Replace CV</button></div>
            <label className="mt-6 block text-xs font-bold text-[var(--space-text-secondary)]">Full name<input value={profile.name} aria-invalid={missingAfterUpload(profile.name) || undefined} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(profile.name) ? missingInputClass : 'border-[var(--space-border-default)]'}`} />{missingAfterUpload(profile.name) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}</label>
            <div className="mt-6"><div className="flex items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-sm font-extrabold"><GraduationCap className="h-4 w-4 text-[var(--space-text-brand)]" />Education</h3><button type="button" onClick={() => { const index = profile.education.length; setProfile((current) => ({ ...current, education: [...current.education, { institution: '', field: '', degree: '', graduationYear: '', gpa: '', coursework: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-education-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-xl bg-[var(--space-surface-accent-soft)] px-3 py-2 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add Education</button></div>{profile.education.length === 0 && <p className="mt-2 text-xs text-[var(--space-text-muted)]">No confirmed education. Add an entry if relevant.</p>}<div className="mt-3 space-y-3">{profile.education.map((education, index) => <div key={`education-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Education {index + 1}</span><button type="button" onClick={() => setProfile((current) => { const educationEntries = current.education.filter((_, itemIndex) => itemIndex !== index); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} aria-label={`Delete education entry ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2"><UniversityCombo id={`cv-education-${index}`} label="University name" value={education.institution} missing={missingAfterUpload(education.institution)} onChange={(institution, universityTier) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, institution, universityTier } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', university_tier: primary?.universityTier, faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /><MajorCombo id={`cv-major-${index}`} label="Major" value={education.field} missing={missingAfterUpload(education.field)} onChange={(field) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, field } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} /></div><div className="grid gap-3 sm:grid-cols-3"><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`cv-degree-${index}`} className="block">Degree <span className="text-[var(--space-semantic-danger)]">*</span></label><div className="relative mt-1.5"><select id={`cv-degree-${index}`} value={education.degree} required aria-required="true" aria-invalid={!education.degree || undefined} onChange={(event) => setProfile((current) => ({ ...current, education: current.education.map((item, itemIndex) => itemIndex === index ? { ...item, degree: event.target.value } : item) }))} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${education.degree ? 'border-[var(--space-border-default)]' : missingInputClass}`}> <option value="">Select degree</option>{DEGREE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{!education.degree && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select a degree.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label htmlFor={`cv-gpa-${index}`} className="block">GPA</label><div className="relative mt-1.5"><select id={`cv-gpa-${index}`} value={education.gpa} aria-label="GPA" aria-invalid={missingAfterUpload(education.gpa) || undefined} onChange={(event) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, gpa: event.target.value } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, gpa: primary?.gpa || '' }; })} className={`w-full appearance-none rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 pr-9 text-sm font-normal outline-none focus:border-[var(--space-brand-primary)] ${missingAfterUpload(education.gpa) ? missingInputClass : 'border-[var(--space-border-default)]'}`}> <option value="">Select your GPA range</option>{GPA_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown strokeWidth={1.5} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--space-text-muted)]" /></div>{missingAfterUpload(education.gpa) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your GPA range.</span>}</div><div className="text-xs font-bold text-[var(--space-text-secondary)]"><label className="block">Graduation</label><div className="mt-1.5"><MonthPicker value={education.graduationYear} placeholder="Graduation month" missing={missingAfterUpload(education.graduationYear)} onChange={(graduationYear) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, graduationYear } : item); const primary = educationEntries[0]; return { ...current, education: educationEntries, university: primary?.institution || '', faculty: primary?.field || '', graduation_year: primary?.graduationYear || '', gpa: primary?.gpa || '', coursework: mergeEducationCoursework(educationEntries) }; })} />{missingAfterUpload(education.graduationYear) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please select your graduation month.</span>}</div></div></div><label className="block text-xs font-bold text-[var(--space-text-secondary)]">Relevant Coursework <span className="text-[var(--space-semantic-danger)]">*</span><textarea rows={3} value={education.coursework} required aria-required="true" aria-invalid={!education.coursework.trim() || undefined} onChange={(event) => setProfile((current) => { const educationEntries = current.education.map((item, itemIndex) => itemIndex === index ? { ...item, coursework: event.target.value } : item); return { ...current, education: educationEntries, coursework: mergeEducationCoursework(educationEntries) }; })} placeholder="List subjects or courses for this education (e.g. Marketing Management, Financial Accounting, Data Analytics...)" className={`mt-1.5 w-full rounded-xl border p-3 text-sm outline-none focus:border-[var(--space-brand-primary)] ${education.coursework.trim() ? 'border-[var(--space-border-default)]' : missingInputClass}`} />{!education.coursework.trim() && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please add relevant coursework.</span>}</label></div></div>)}</div></div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><BriefcaseBusiness className="h-4 w-4 text-[var(--space-text-brand)]" />Work Experiences</h3><button type="button" onClick={() => { const index = profile.experiences.length; setProfile((current) => ({ ...current, experiences: [...current.experiences, { company: '', role: '', duration: '', description: '', sector: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-experience-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>{profile.experiences.length === 0 && <p className={`mt-2 rounded-xl border p-3 text-xs ${cvEntryMode === 'upload' ? 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))] font-semibold text-[var(--space-semantic-danger)]' : 'border-transparent bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'}`}>{cvEntryMode === 'upload' ? "We couldn't read any work experience. Add an entry if your CV includes one." : 'No confirmed work experiences. Add an entry if relevant.'}</p>}<div className="mt-3 space-y-3">{profile.experiences.map((experience, index) => <div key={`experience-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-xs font-bold text-[var(--space-text-secondary)]">Work Experience {index + 1}{isInternRole(experience.role) && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-brand-primary-500)_12%,transparent)] px-2 py-0.5 text-[10px] text-[var(--space-text-brand)]">Internship</span>}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, experiences: current.experiences.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete experience entry ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><CompanyCombo id={`cv-experience-${index}`} value={experience.company} missing={missingAfterUpload(experience.company)} onChange={(company) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, company } : item) }))} /><label className="text-xs font-bold text-[var(--space-text-secondary)]">Role<input value={experience.role} aria-invalid={missingAfterUpload(experience.role) || undefined} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, role: event.target.value } : item) }))} className={`mt-1.5 w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] ${missingAfterUpload(experience.role) ? missingInputClass : 'border-[var(--space-border-default)]'}`} />{missingAfterUpload(experience.role) && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">We couldn't read this — please fill it in.</span>}</label></div><div className="mt-3"><ExperienceIndustrySelect company={experience.company} description={experience.description} value={experience.sector} source={experience.sectorSource} onChange={(sector, sectorSource) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, sector, sectorSource } : item) }))} /></div><div className="mt-3"><ExperienceDurationEditor value={experience.duration} missing={cvEntryMode === 'upload'} onChange={(duration) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /></div><label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(experience.description).split('\n').length)} value={experience.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, experiences: current.experiences.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder="Responsibilities, achievements and quantified impact" className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div>)}</div></div>
            <SkillsSelector skills={profile.skills} certifications={profile.certifications} otherSkills={profile.other_skills} otherSelected={profile.other_skills_selected} onChange={(value) => setProfile((current) => ({ ...current, skills: value.skills, certifications: value.certifications, other_skills: value.otherSkills, other_skills_selected: value.otherSelected }))} />
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Users className="h-4 w-4 text-[var(--space-text-brand)]" />Extracurricular Activities</h3><button type="button" onClick={() => { const index = profile.extracurricular_activities.length; setProfile((current) => ({ ...current, extracurricular_activities: [...current.extracurricular_activities, { organization: '', role: '', duration: '', description: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-activity-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>{profile.extracurricular_activities.length === 0 && <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No confirmed extracurricular activities. Add clubs, volunteer work, student organizations, or team projects if relevant.</p>}<div className="mt-3 space-y-3">{profile.extracurricular_activities.map((activity, index) => <div key={`activity-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Extracurricular Activity {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete extracurricular activity ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 space-y-3"><div className="grid gap-3 sm:grid-cols-2">{([['Organization', 'organization'], ['Role', 'role']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input id={key === 'organization' ? `cv-activity-${index}` : undefined} value={activity[key]} placeholder={label} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}</div><ExperienceDurationEditor value={activity.duration} onChange={(duration) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, duration } : item) }))} /></div><label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Description<textarea rows={Math.max(3, formatExperienceDescription(activity.description).split('\n').length)} value={activity.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, extracurricular_activities: current.extracurricular_activities.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder={'One responsibility, contribution, or result per line'} className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div>)}</div></div>
            <div className="mt-6"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-extrabold"><Trophy className="h-4 w-4 text-[var(--space-text-brand)]" />Honors &amp; Achievements</h3><button type="button" onClick={() => { const index = profile.honors_achievements.length; setProfile((current) => ({ ...current, honors_achievements: [...current.honors_achievements, { competition: '', title: '', time: '', description: '', source: 'user' }] })); window.setTimeout(() => document.getElementById(`cv-achievement-${index}`)?.focus(), 0); }} className="inline-flex items-center gap-1 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-brand)]"><Plus className="h-3.5 w-3.5" />Add</button></div>{profile.honors_achievements.length === 0 && <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-muted)]">No confirmed honors or achievements. Add competition results, awards, or academic honors if relevant.</p>}<div className="mt-3 space-y-3">{profile.honors_achievements.map((achievement, index) => <div key={`achievement-${index}`} className="rounded-xl bg-[var(--space-surface-muted)] px-3 pb-3 pt-2"><div className="flex items-center justify-between gap-2"><span className="text-xs font-bold text-[var(--space-text-secondary)]">Honor &amp; Achievement {index + 1}</span><button type="button" onClick={() => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.filter((_, itemIndex) => itemIndex !== index) }))} aria-label={`Delete honor or achievement ${index + 1}`} className="text-[var(--space-semantic-danger)]"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 grid gap-3 sm:grid-cols-3">{([['Competition', 'competition'], ['Title', 'title']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input id={key === 'competition' ? `cv-achievement-${index}` : undefined} value={achievement[key]} placeholder={label} onChange={(event) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: event.target.value } : item) }))} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label>)}<div className="text-xs font-bold text-[var(--space-text-secondary)]"><span className="block">Time</span><div className="mt-1.5"><AchievementTimePicker value={achievement.time} onChange={(time) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, time } : item) }))} /></div></div></div><label className="mt-3 block text-xs font-bold text-[var(--space-text-secondary)]">Description <span className="font-normal">(optional)</span><textarea rows={Math.max(3, formatExperienceDescription(achievement.description).split('\n').length)} value={achievement.description} onBlur={(event) => { const description = formatExperienceDescription(event.target.value); setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, description } : item) })); }} onChange={(event) => setProfile((current) => ({ ...current, honors_achievements: current.honors_achievements.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item) }))} placeholder={'Optional context — one point per line'} className="mt-1.5 w-full whitespace-pre-wrap rounded-xl border border-[var(--space-border-default)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)]" /></label></div>)}</div></div>
            <div className="mt-5 flex items-center justify-between gap-3 sm:mt-6"><button type="button" onClick={() => { setProfile(EMPTY_PROFILE); setOriginalProfile(null); setCvReviewConfirmed(false); setCvEntryMode(null); }} className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={profile.education.some((education) => !education.degree || !education.coursework.trim()) || profile.experiences.some((experience) => !normalizeIndustrySector(experience.sector))} onClick={() => void confirmCvProfile()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] disabled:opacity-45 sm:py-3">Next <ArrowRight className="h-4 w-4" /></button></div>
          </div>}
        </section>}

        {journey === 'validation' && stage === 3 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Target Motivation Assessment</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Quick choices, no mandatory essays</h2><p className="mt-2 text-sm text-[var(--space-text-secondary)]">Your responses save after every question.</p>
          <div className="mt-6 space-y-7">
            <div><p className="mb-1 font-bold">Picture a workday that feels right. What is present?</p><p className="mb-3 text-xs text-[var(--space-text-muted)]">Choose up to 3 across these short scenarios.</p><div className="space-y-3">{COMPANY_REASON_GROUPS.map((options, index) => <div key={`company-reasons-${index}`}><p className="mb-2 text-sm font-semibold text-[var(--space-text-secondary)]">{index === 0 ? 'In the team around you…' : index === 1 ? 'In the opportunities ahead…' : 'If something else matters…'}</p><MultiChoice value={motivation.companyReasons} onChange={(value) => setMotivation((current) => ({ ...current, companyReasons: value }))} options={options} /></div>)}</div></div>
            <div><p className="mb-1 font-bold">Imagine your first months in the program. What would help most?</p><p className="mb-3 text-xs text-[var(--space-text-muted)]">Choose up to 3 across both moments.</p><div className="space-y-3">{PROGRAM_REASON_GROUPS.map((options, index) => <div key={`program-reasons-${index}`}><p className="mb-2 text-sm font-semibold text-[var(--space-text-secondary)]">{index === 0 ? 'While learning the role…' : 'While taking on real work…'}</p><MultiChoice value={motivation.programReasons} onChange={(value) => setMotivation((current) => ({ ...current, programReasons: value }))} options={options} /></div>)}</div></div>
            {hasFunctionTracks && <div><p className="mb-1 font-bold">If a teammate asked why this path caught your attention, what would you point to?</p><p className="mb-3 text-xs text-[var(--space-text-muted)]">Choose up to 3 across experience and interest.</p><div className="space-y-3">{FUNCTION_REASON_GROUPS.map((options, index) => <div key={`function-reasons-${index}`}><p className="mb-2 text-sm font-semibold text-[var(--space-text-secondary)]">{index === 0 ? 'From what you have done…' : 'From how the work feels…'}</p><MultiChoice value={motivation.functionReasons} onChange={(value) => setMotivation((current) => ({ ...current, functionReasons: value }))} options={options} /></div>)}</div></div>} 
            <div><p className="mb-3 font-bold">A friend asks what you already know about this target. What can you draw on?</p><SingleChoice value={motivation.familiarity} onChange={(value) => setMotivation((current) => ({ ...current, familiarity: value }))} options={['No target-specific preparation yet', 'Read official role and program information', 'Spoken with current or former participants', 'Completed a target-relevant project, case, or course']} /></div>
            <div className="rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4 sm:p-5"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Strengths → sub-role fit</p><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]">These three diagnostics identify the kinds of work you naturally lean toward. Mate maps the pattern to sub-roles inside {selectedFunction || 'your target function'}.</p>
              <div className="mt-5 space-y-6">
                <div><p className="mb-3 font-bold">A messy problem lands on your desk. What do you reach for first?</p><SingleChoice value={motivation.problemApproach} onChange={(value) => setMotivation((current) => ({ ...current, problemApproach: value }))} options={PROBLEM_APPROACH_OPTIONS} /></div>
                <div><p className="mb-3 font-bold">At the end of a good day, which work left you energized?</p><SingleChoice value={motivation.energizingWork} onChange={(value) => setMotivation((current) => ({ ...current, energizingWork: value }))} options={ENERGIZING_WORK_OPTIONS} /></div>
                <div><p className="mb-3 font-bold">A project succeeds. Which contribution feels most like yours?</p><div className="space-y-3">{CONTRIBUTION_STYLE_GROUPS.map((options, index) => <div key={`contribution-${index}`}><p className="mb-2 text-sm font-semibold text-[var(--space-text-secondary)]">{index === 0 ? 'In the work itself…' : 'In how the team moves…'}</p><SingleChoice value={motivation.contributionStyle} onChange={(value) => setMotivation((current) => ({ ...current, contributionStyle: value }))} options={options} /></div>)}</div></div>
              </div>
            </div>
            {[['The program moves you through different teams. How does that feel?', 'rotation'], ['A strong opportunity is based in another city. What fits you?', 'relocation'], ['The role includes regular business trips. What fits you?', 'travel']] .map(([question, key]) => <div key={key}><p className="mb-3 font-bold">{question}</p><SingleChoice value={(motivation as any)[key]} onChange={(value) => setMotivation((current) => ({ ...current, [key]: value }))} options={['Yes', 'Depends on arrangement', 'No']} /></div>)}
            <div><p className="mb-3 font-bold">Two offers arrive together. Rank the three signals you would compare first.</p><div className="grid gap-2 sm:grid-cols-3">{[0, 1, 2].map((index) => <label key={index} className="text-xs font-bold text-[var(--space-text-secondary)]">#{index + 1}<select value={motivation.priorityRanking[index] || ''} onChange={(event) => rankingChoice(index, event.target.value)} className="mt-1.5 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-3 text-sm"><option value="">Select priority</option>{PRIORITIES.filter((item) => !motivation.priorityRanking.includes(item) || motivation.priorityRanking[index] === item).map((item) => <option key={item}>{item}</option>)}</select></label>)}</div></div>
          </div>
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(2)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={!motivationComplete} onClick={() => { setStage(4); track('motivation_assessment_completed'); }} className="rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Continue to Work Style</button></div>
        </section>}

        {journey === 'validation' && stage === 4 && <section className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Work Style</p><h2 className="mt-2 text-lg font-extrabold sm:text-xl">Reuse valid results or review them</h2>
          {foundPrior && assessmentReuseChoice === null && <div className="mt-4 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><p className="font-extrabold">We found information from your previous assessment.</p><p className="mt-1 text-sm text-[var(--space-text-secondary)]">You do not need to retake OCP or MBTI for a new target.</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => applyReuse('use')} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Use Existing Results</button><button type="button" onClick={() => applyReuse('review')} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Review and Update</button><button type="button" onClick={() => applyReuse('retake')} className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-xs font-bold">Retake Assessment</button></div></div>}
          <WorkStyleAssessment scores={ocp} onScoreChange={(key, value) => { setOcp((current) => ({ ...current, [key]: value })); setOcpResultReused(false); }} answers={mbtiAnswers} personalityType={mbtiType} mode={mbtiMode === 'known' ? 'known' : 'assessment'} questionIndex={mbtiIndex} onModeChange={(mode) => { setMbtiMode(mode); if (mode === 'assessment' && mbtiMode === 'known') { setMbtiAnswers({}); setMbtiType(''); setMbtiIndex(0); } }} onTypeChange={(type) => { setMbtiType(type); setMbtiAnswers(type ? answersForType(type) : {}); setWorkingStyleResultReused(false); }} onAnswer={(itemId, choice) => { const next = { ...mbtiAnswers, [itemId]: choice }; setMbtiAnswers(next); setWorkingStyleResultReused(false); if (mbtiIndex < MBTI_ITEMS.length - 1) setMbtiIndex((current) => current + 1); else setMbtiType(scoreMbti(next).type); }} onQuestionIndexChange={setMbtiIndex} />
          {false && <>
            <div className="mt-6"><div className="flex items-center justify-between gap-3"><div><h3 className="font-extrabold">OCP Work Style Assessment</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">When verified company culture data is unavailable, this is reported only as Work Environment Preference.</p></div>{ocpResultReused && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-semantic-success)]">Reused</span>}</div><div className="mt-3 grid gap-3 sm:grid-cols-2">{OCP_ITEMS.map(([key, label, low, high]) => <label key={key} className="rounded-2xl border border-[var(--space-border-default)] p-3"><span className="flex items-center justify-between text-sm font-bold">{label}<b className="rounded-lg bg-[var(--space-brand-primary)] px-2.5 py-1 text-[var(--space-text-on-primary)]">{ocp[key]}</b></span><input type="range" min={1} max={5} value={ocp[key]} onChange={(event) => { setOcp((current) => ({ ...current, [key]: Number(event.target.value) })); setOcpResultReused(false); }} className="mt-3 w-full accent-[var(--space-brand-primary)]" /><span className="mt-1 flex justify-between text-[10px] text-[var(--space-text-muted)]"><span>1 · {low}</span><span className="text-right">5 · {high}</span></span></label>)}</div></div>
            <div className="mt-7 border-t border-[var(--space-border-default)] pt-6"><div className="flex items-center justify-between gap-3"><div><h3 className="font-extrabold">Personality &amp; Working Style Assessment</h3><p className="mt-1 text-xs text-[var(--space-text-muted)]">A supporting working-style signal only — never an automatic suitability verdict.</p></div>{workingStyleResultReused && <span className="rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-semantic-success)]">Reused</span>}</div>
              {mbtiMode === 'existing' && priorMbti ? <div className="mt-3 rounded-2xl bg-[var(--space-surface-muted)] p-4"><p className="text-sm font-bold">Existing result: <span className="text-[var(--space-text-brand)]">{priorMbti.type}</span></p><button type="button" onClick={() => { setMbtiMode('assessment'); setMbtiAnswers({}); setMbtiType(''); setWorkingStyleResultReused(false); }} className="mt-2 text-xs font-bold text-[var(--space-text-brand)] underline">Retake instead</button></div> : <div className="mt-3"><p className="text-sm font-bold">Do you already know your MBTI type?</p><div className="mt-2 flex flex-wrap gap-2"><button type="button" onClick={() => setMbtiMode('known')} className={`rounded-xl border px-3 py-2 text-xs font-bold ${mbtiMode === 'known' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>Yes, Select My Type</button><button type="button" onClick={() => setMbtiMode('assessment')} className={`rounded-xl border px-3 py-2 text-xs font-bold ${mbtiMode === 'assessment' ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>No / I'm Not Sure, Take the Assessment</button></div>
                {mbtiMode === 'known' ? <select value={mbtiType} onChange={(event) => { setMbtiType(event.target.value); setMbtiAnswers(event.target.value ? answersForType(event.target.value) : {}); }} className="mt-3 w-full rounded-xl border border-[var(--space-border-default)] px-3 py-3 text-sm"><option value="">Select your type</option>{['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'].map((type) => <option key={type}>{type}</option>)}</select> : currentMbti && <div className="mt-4 rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex justify-between gap-2"><p className="font-bold">{currentMbti.question}</p><span className="text-xs font-bold text-[var(--space-text-muted)]">{mbtiIndex + 1}/20</span></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{([['A', currentMbti.a.text], ['B', currentMbti.b.text]] as const).map(([choice, text]) => <button key={choice} type="button" onClick={() => { const next = { ...mbtiAnswers, [currentMbti.id]: choice }; setMbtiAnswers(next); setWorkingStyleResultReused(false); if (mbtiIndex < 19) setMbtiIndex(mbtiIndex + 1); else setMbtiType(scoreMbti(next).type); }} className={`rounded-xl border p-3 text-left text-sm font-semibold ${mbtiAnswers[currentMbti.id] === choice ? 'border-[var(--space-brand-primary)] bg-[var(--space-surface-accent-soft)]' : 'border-[var(--space-border-default)]'}`}>{text}</button>)}</div><button type="button" disabled={mbtiIndex === 0} onClick={() => setMbtiIndex((current) => Math.max(0, current - 1))} className="mt-3 text-xs font-bold text-[var(--space-text-muted)] disabled:opacity-30">Previous question</button>{Object.keys(mbtiAnswers).length === 20 && <p className="mt-2 text-sm font-bold text-[var(--space-text-brand)]">Working-style result: {mbtiType || scoreMbti(mbtiAnswers).type}</p>}</div>}
              </div>}
            </div>
          </>}
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(3)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" disabled={busy || foundPrior && assessmentReuseChoice === null || !(Object.keys(mbtiAnswers).length === 20 || /^[EI][SN][TF][JP]$/.test(mbtiType))} onClick={() => void runAssessment()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{busy ? 'Preparing Target Fit…' : 'Continue to Results'}</button></div>
        </section>}

        {journey === 'validation' && (stage === 5 || stage === 6) && target && <section className="space-y-4">
          {false && <div className="rounded-3xl bg-[var(--space-brand-primary)] p-5 text-[var(--space-text-on-primary)] sm:p-7"><p className="text-xs font-bold uppercase tracking-widest opacity-80">Target Fit</p><h2 className="mt-1 text-2xl font-extrabold">{target.company} · {target.program}</h2><p className="mt-2 text-sm opacity-90">{selectedFunction ? `${selectedFunction} · ` : ''}{target.recruitmentCycle}</p></div>}
          {fitPending || !fitAnalysis ? <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-6 text-center"><Sparkles className="mx-auto h-8 w-8 text-[var(--space-text-brand)]" /><h3 className="mt-3 text-lg font-extrabold">Your assessment is complete. Your Target Fit result is being prepared.</h3><p className="mt-2 text-sm text-[var(--space-text-secondary)]">No program-specific score is shown because the selected program rubric or result is not currently available. Your confirmed function and profile can still anchor a general preparation plan.</p></div> : <><FitResultsSummary company={target.company} program={target.program} targetFunction={selectedFunction} recruitmentCycle={target.recruitmentCycle} analysis={fitAnalysis} rolePaths={displayedSubroleRecommendation?.subroles || []} />{false && <>
            <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">Mate’s view of your fit</h3><p className="mt-1 text-sm leading-6 text-[var(--space-text-muted)]">Mate connected your confirmed experiences, achievements, preferences, and working style to {target.program}. Here is what already stands out and what you can strengthen next.</p></div>
            {displayedSubroleRecommendation?.subroles?.length && <div className="rounded-3xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-5"><p className="text-xs font-bold uppercase tracking-widest text-[var(--space-text-brand)]">Your best-fit role paths</p><h3 className="mt-1 text-lg font-extrabold">Within {displayedSubroleRecommendation.function}, your profile suggests you’d thrive in: {displayedSubroleRecommendation.subroles.join(' or ')}</h3><p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">This direction comes from how you approach problems, what work energizes you, and the contribution you want to make. Use it as a role-exploration guide, not a hard limit.</p></div>}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><ScoreCard label="Overall Target Fit" value={fitAnalysis.matching_ratio} /><ScoreCard label="Profile & Experience Fit" value={fitAnalysis.cv_profile_fit_score} /><ScoreCard label="Function Fit" value={fitAnalysis.function_fit_score} /><ScoreCard label="Motivation Fit" value={fitAnalysis.motivation_fit_score} /><ScoreCard label="Work Style Fit" value={fitAnalysis.work_style_fit_score ?? fitAnalysis.culture_fit_percent} />{fitAnalysis.data_confidence && <div className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-3"><p className="text-[10px] font-bold uppercase text-[var(--space-text-muted)]">Data confidence</p><p className="mt-1 font-extrabold">{fitAnalysis.data_confidence}</p></div>}</div></>}
            <div className="grid gap-4 lg:grid-cols-2"><div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">What you already showcase</h3>{strengths.length ? <ul className="mt-3 space-y-3">{strengths.map((item: any) => { const copy = criterionCopy(item); return <li key={item.id} className="flex gap-2 text-sm leading-6"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--space-semantic-success)]" /><span><b>{copy.label}</b> — {copy.summary}</span></li>; })}</ul> : <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">Mate has a starting picture of your profile, but needs more specific examples before calling out a standout strength.</p>}</div><div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">Where you can become stronger</h3>{gaps.length ? <ul className="mt-3 space-y-3">{gaps.map((item: any) => { const copy = criterionCopy(item); return <li key={item.id} className="flex gap-2 text-sm leading-6"><AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-[var(--space-semantic-warning)]" /><span><b>{copy.label}</b> — {copy.summary} <span className="text-[var(--space-text-secondary)]">{copy.next}</span></span></li>; })}</ul> : <p className="mt-2 text-sm leading-6 text-[var(--space-text-muted)]">Mate did not identify a major evidence gap for this target. Keep your examples current and measurable.</p>}</div></div>
            <div className="grid gap-4 lg:grid-cols-2"><div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">What Mate wants you to watch</h3>{fitAnalysis.potential_concerns?.length ? <ul className="mt-3 space-y-2 text-sm leading-6">{fitAnalysis.potential_concerns.map((item: string, index: number) => <li key={index}>• {friendlyConcern(item)}</li>)}</ul> : <p className="mt-2 text-sm text-[var(--space-text-muted)]">Mate did not identify an additional concern beyond the growth areas above.</p>}</div><div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><h3 className="font-extrabold">What Mate recommends next</h3>{(fitAnalysis.preparation_actions?.length || fitAnalysis.roadmap_actions?.length) ? <ul className="mt-3 space-y-3">{(fitAnalysis.preparation_actions?.length ? fitAnalysis.preparation_actions : fitAnalysis.roadmap_actions || []).map((item: any, index: number) => <li key={item.id || index} className="rounded-xl bg-[var(--space-surface-muted)] p-3 text-sm"><b>{item.priority || 'Priority'} · {item.casemate_function || item.casemateFunction || item.category || 'Preparation'}</b><span className="mt-1 block leading-6 text-[var(--space-text-secondary)]">Mate recommends: {cleanResultText(item.action || item.recommendedAction || item.gap)}</span></li>)}</ul> : fitAnalysis.recommended_next_steps?.length ? <ul className="mt-3 space-y-2 text-sm">{fitAnalysis.recommended_next_steps.map((item: string, index: number) => <li key={index}>• Mate recommends: {cleanResultText(item)}</li>)}</ul> : <p className="mt-2 text-sm text-[var(--space-text-muted)]">Mate has no additional priority beyond keeping your evidence specific and measurable.</p>}</div></div>
          </>}
          <div className="rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-extrabold">Review My Fit</h3><p className="mt-1 text-sm text-[var(--space-text-muted)]">Optional detailed breakdown — it does not block target confirmation.</p></div><button type="button" disabled={!fitAnalysis} onClick={() => { setShowBreakdown((current) => !current); track('fit_breakdown_viewed', { program_id: target.id }); }} className="inline-flex items-center gap-1 rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold disabled:opacity-40">{showBreakdown ? 'Hide breakdown' : 'Review My Fit'} <ChevronDown className={`h-4 w-4 ${showBreakdown ? 'rotate-180' : ''}`} /></button></div>
            {showBreakdown && <div className="mt-4 space-y-3">{resultCriteria.map((criterion: any) => <article key={criterion.id} className="rounded-2xl border border-[var(--space-border-default)] p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><h4 className="font-extrabold">{criterionCopy(criterion).label}</h4><p className="mt-1 text-xs text-[var(--space-text-muted)]">Current score: {Number.isFinite(Number(criterion.score)) ? `${criterion.score}%` : 'Not available'} · Mate’s read: {criterion.status === 'met' ? 'You already show strong evidence here' : 'This is an opportunity to strengthen your story'}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${criterion.status === 'met' ? 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success)]' : 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] text-[var(--space-semantic-warning)]'}`}>{criterion.status === 'met' ? 'Strong evidence' : 'Opportunity to strengthen'}</span></div><p className="mt-3 text-sm leading-6 text-[var(--space-text-secondary)]"><b>What Mate noticed:</b> {criterionCopy(criterion).summary}</p><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]"><b>What this means for you:</b> {criterionCopy(criterion).impact}</p><p className="mt-1 text-sm leading-6 text-[var(--space-text-secondary)]"><b>Your next move:</b> {criterionCopy(criterion).next}</p>{criterion.status !== 'met' && !criterion.evidence && <div className="mt-3 rounded-xl bg-[var(--space-surface-muted)] p-3"><p className="text-sm font-bold">Mate could not find a clear {criterionCopy(criterion).label.toLowerCase()} example in your CV. Do you have one to add?</p><div className="mt-2 flex gap-2"><button type="button" onClick={() => { setEvidenceCriterion(criterion.id); track('missing_evidence_prompted', { criterion_id: criterion.id }); }} className="rounded-xl bg-[var(--space-brand-primary)] px-3 py-2 text-xs font-bold text-[var(--space-text-on-primary)]">Yes, Add Experience</button><button type="button" onClick={() => setEvidenceCriterion(null)} className="rounded-xl border border-[var(--space-border-default)] px-3 py-2 text-xs font-bold">No, Continue</button></div></div>}</article>)}
              {evidenceCriterion && <div className="rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"><h4 className="font-extrabold">Add structured evidence</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{([['Experience type','type'],['Name / organization','name'],['Role','role'],['Date','date'],['Responsibilities','responsibilities'],['Achievement','achievement'],['Skills demonstrated','skills']] as const).map(([label, key]) => <label key={key} className="text-xs font-bold text-[var(--space-text-secondary)]">{label}<input value={evidenceDraft[key]} onChange={(event) => setEvidenceDraft((current) => ({ ...current, [key]: event.target.value }))} className="mt-1 w-full rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-sm" /></label>)}</div><button type="button" disabled={!evidenceDraft.name.trim()} onClick={addEvidence} className="mt-3 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">Save Evidence</button></div>}
            </div>}
          </div>
          {stage === 6 ? (
            <div className="flex flex-col justify-end gap-2 sm:flex-row">
              <button type="button" onClick={() => openApp('my-roadmap')} className="rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3">Open My Roadmap</button>
              <button type="button" onClick={returnToSelector} className="rounded-xl border border-[var(--space-border-default)] px-5 py-2 text-sm font-bold">Start a new assessment</button>
            </div>
          ) : (
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => setStage(4)} className="inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><ArrowLeft className="h-4 w-4" />Back</button><div className="flex flex-col gap-2 sm:flex-row"><button type="button" onClick={changeTarget} className="rounded-xl border border-[var(--space-border-default)] px-4 py-2 text-sm font-bold">Change Target</button><button type="button" disabled={busy} onClick={() => void confirmTarget()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-2.5 text-sm font-extrabold text-[var(--space-text-on-primary)] sm:py-3 disabled:opacity-50">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}Confirm Target &amp; Generate Preparation Plan</button></div></div>
          )}
        </section>}
      </div>
    </div>
  );
}
